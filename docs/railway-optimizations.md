# Railway and Mobile Network Optimizations

Unstable mobile links introduce packet loss, jitter, and frequent IP changes.
This checklist focuses on keeping sessions alive during handoffs.

## Client-side settings (Moonlight Web)
- Resolution: **1280x720**
- FPS: **30**
- Codec: **H.264**
- Bitrate: **2-12 Mbps** (adaptive)
- Prefer low-latency mode

## Signaling reconnect
The signaling server supports resume tokens and cached offers/answers.
If your client supports a resume token, set it and reuse it after reconnect.

Recommended env values:
- `RESUME_TTL_MS=120000`
- `PING_INTERVAL_MS=15000`

## TURN for NAT changes
Mobile networks often change NAT mappings mid-session. TURN adds stability:
```
docker compose --profile turn up -d
```

## Packet loss mitigation
- Use smaller MTU if you see fragmentation:
  `sudo ip link set dev <iface> mtu 1200`
- Keep bitrate conservative during movement

## Hand-off strategy
1) Keep sessions short
2) Allow quick reconnect with cached SDP
3) Use TURN if handoffs are frequent

