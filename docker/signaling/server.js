const http = require("http");
const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");

const PORT = parseInt(process.env.PORT || "8080", 10);
const WS_PATH = process.env.WS_PATH || "/ws";
const ROOM_TTL_MS = parseInt(process.env.ROOM_TTL_MS || "600000", 10);
const RESUME_TTL_MS = parseInt(process.env.RESUME_TTL_MS || "120000", 10);
const MAX_PEERS = parseInt(process.env.MAX_PEERS || "2", 10);
const PING_INTERVAL_MS = parseInt(process.env.PING_INTERVAL_MS || "15000", 10);
const ICE_CACHE_LIMIT = 64;

const rooms = new Map();

function now() {
  return Date.now();
}

function getRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      clients: new Map(),
      cache: { offer: null, answer: null, ice: [] },
      updatedAt: now(),
    });
  }
  return rooms.get(roomId);
}

function cleanupRooms() {
  const cutoff = now() - ROOM_TTL_MS;
  for (const [roomId, room] of rooms.entries()) {
    if (room.clients.size === 0 && room.updatedAt < cutoff) {
      rooms.delete(roomId);
    }
  }
}

function sendCached(client, room) {
  const payloads = [];
  if (room.cache.offer) payloads.push(room.cache.offer);
  if (room.cache.answer) payloads.push(room.cache.answer);
  payloads.push(...room.cache.ice);
  payloads.forEach((payload) => {
    try {
      client.ws.send(payload);
    } catch (err) {
      // ignore send errors for resume
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith("/healthz")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ server, path: WS_PATH });

wss.on("connection", (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("room") || "default";
  const clientId = url.searchParams.get("clientId") || uuidv4();
  const role = url.searchParams.get("role") || "peer";
  const resumeToken = url.searchParams.get("resume");

  const room = getRoom(roomId);
  if (room.clients.size >= MAX_PEERS) {
    ws.close(1008, "room full");
    return;
  }

  for (const [key, peer] of room.clients.entries()) {
    if (peer.clientId === clientId) {
      try {
        peer.ws.close(4000, "replaced");
      } catch (err) {
        // ignore
      }
      room.clients.delete(key);
    }
  }

  const connectionId = uuidv4();
  const assignedResumeToken = resumeToken || uuidv4();
  const client = {
    id: connectionId,
    clientId,
    role,
    ws,
    resumeToken: assignedResumeToken,
    resumeExpiresAt: now() + RESUME_TTL_MS,
    lastSeen: now(),
  };

  room.clients.set(connectionId, client);
  room.updatedAt = now();

  ws.isAlive = true;
  ws.on("pong", () => {
    ws.isAlive = true;
    client.lastSeen = now();
  });

  ws.send(
    JSON.stringify({
      type: "hello",
      roomId,
      clientId,
      resumeToken: assignedResumeToken,
    })
  );

  if (resumeToken) {
    sendCached(client, room);
  }

  ws.on("message", (data) => {
    const message = Buffer.isBuffer(data) ? data.toString() : data;
    client.lastSeen = now();
    room.updatedAt = now();

    let parsed = null;
    try {
      parsed = JSON.parse(message);
    } catch (err) {
      parsed = null;
    }

    if (parsed && typeof parsed === "object") {
      if (parsed.type === "resume") {
        sendCached(client, room);
        return;
      }
      if (parsed.type === "offer") room.cache.offer = message;
      if (parsed.type === "answer") room.cache.answer = message;
      if (parsed.type === "ice" || parsed.type === "candidate") {
        room.cache.ice.push(message);
        if (room.cache.ice.length > ICE_CACHE_LIMIT) {
          room.cache.ice.shift();
        }
      }
    }

    for (const peer of room.clients.values()) {
      if (peer.id !== connectionId) {
        try {
          peer.ws.send(message);
        } catch (err) {
          // ignore
        }
      }
    }
  });

  ws.on("close", () => {
    room.clients.delete(connectionId);
    room.updatedAt = now();
  });
});

setInterval(() => {
  for (const room of rooms.values()) {
    for (const client of room.clients.values()) {
      if (!client.ws.isAlive) {
        try {
          client.ws.terminate();
        } catch (err) {
          // ignore
        }
        room.clients.delete(client.id);
        continue;
      }
      client.ws.isAlive = false;
      try {
        client.ws.ping();
      } catch (err) {
        // ignore
      }
    }
  }
}, PING_INTERVAL_MS);

setInterval(cleanupRooms, 60000);

server.listen(PORT, () => {
  console.log(`Signaling server listening on :${PORT}${WS_PATH}`);
});
