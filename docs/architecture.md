# Architecture

This stack is built for ephemeral GPU VMs that can be created and destroyed
quickly. It prioritizes low latency and resilience on unstable networks.

## MVP flow

```
Browser (Moonlight Web)
  -> HTTPS (Caddy) -> Signaling (Node.js)
  -> WebRTC -> Sunshine (GPU VM)
```

### Components
- **Sunshine**: Game streaming server (GameStream compatible)
- **Node.js Signaling**: WebRTC signaling + reconnect support
- **Moonlight Web Client**: Browser-based client
- **Caddy**: HTTPS termination + reverse proxy

## Improved flow (after MVP)

```
Browser (Moonlight Web)
  -> HTTPS (Caddy) -> Signaling (Node.js)
  -> WebRTC (TURN optional) -> Sunshine
```

### Improvements
- **TURN (coturn)**: Stable media relay for NAT changes
- **Network tuning**: BBR + larger UDP buffers
- **Reconnect**: Cached offers/answers and resume tokens

## Ports
See `docs/security.md` and `scripts/open_ports.sh`.

