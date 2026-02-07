# Zero-Cost Cloud Gaming (Sunshine + WebRTC + Moonlight Web)

Build a browser-based cloud gaming stack on ephemeral GPU VMs using only free
cloud trials/credits. Designed for unstable railway/mobile networks: low
latency, adaptive bitrate, and fast teardown.

All steps can be performed from a provider web console or a browser-based SSH
terminal. No local PC is required.

Key constraints met:
- Linux GPU VM (Ubuntu)
- Browser client
- Ultra-low latency, adaptive bitrate
- Handles packet loss and network handoffs
- No paid services, no local PC required

---
## MVP Quickstart (minimal, working fast)

### 1) Provision a GPU VM (free credits)
Use a free-trial provider (RunPod, Vast.ai, Paperspace, AWS credits). You can
use the provider web UI or the guided script:

```
bash scripts/provision_vm.sh --provider runpod
```

Recommended VM:
- Ubuntu 22.04 LTS
- NVIDIA GPU (T4/RTX/A10)
- 30-50GB disk
- Public IP

### 2) Open required ports
Minimum for MVP:
- 22/tcp (SSH)
- 80/tcp, 443/tcp (HTTPS)
- 47990/tcp (Sunshine Web UI)
- 47984/tcp, 47989/tcp, 48010/tcp (Sunshine GameStream)
- 47998-48000/udp (Sunshine UDP)

Run:
```
bash scripts/open_ports.sh mvp
```

### 3) Install stack + dockerize
```
bash scripts/bootstrap_mvp.sh
cp config/env.example .env
```

Edit `.env` and set:
- `DOMAIN` (use `<public-ip>.nip.io` if you do not own a domain)
- `ACME_EMAIL`

Note: Gamepad input requires the `uinput` kernel module (handled by
`bootstrap_mvp.sh`).

Fetch a Moonlight Web client build:
```
bash scripts/download_moonlight_web.sh
```

Start the stack:
```
docker compose up -d
```

If you prefer a host install (no Sunshine container):
```
bash scripts/install_sunshine.sh
bash scripts/setup_headless_display.sh
```

### 4) Pair Sunshine
Open:
```
https://<DOMAIN>:47990
```

Create your Sunshine user, then add a "Desktop" app and pair your client.

### 5) Play in the browser
Open:
```
https://<DOMAIN>/
```

Use 720p @ 30fps, H.264, and adaptive bitrate in the Moonlight Web client.

---
## Stability + UX Improvements (after MVP)

1) Apply network tuning:
```
bash scripts/apply_network_tuning.sh
```

2) Enable TURN for mobile NAT changes:
- Update `config/turn/turnserver.conf` (realm, secret, external-ip)
- Start the TURN profile:
```
docker compose --profile turn up -d
```

3) Sunshine low-latency defaults (set in Sunshine UI):
- Codec: H.264
- Resolution: 1280x720
- FPS: 30
- Bitrate: 2-12 Mbps (adaptive)
- Enable low-latency presets

4) Reconnect logic:
The signaling server supports resume tokens and cached offers/answers.
See `docs/railway-optimizations.md` for client-side recommendations.

---
## Architecture (MVP)

Cloud GPU VM (Ubuntu):
- Sunshine (headless)
- WebRTC signaling (Node.js)
- Moonlight Web client (static)
- HTTPS reverse proxy (Caddy)
- Optional TURN (coturn)

All state lives in `./data` and `./config` for easy teardown and rebuild.

---
## Repository layout

```
./scripts/              # provisioning + setup
./docker/               # Dockerfiles + Caddy config
./config/               # sysctl, TURN, Sunshine templates
./client/dist/          # static web client build
./docs/                 # architecture, security, tuning notes
```

---
## Teardown (avoid charges)

1) Stop containers and remove data:
```
docker compose down -v
```

2) Destroy the VM:
```
bash scripts/teardown_vm.sh --provider runpod
```

See `docs/teardown.md` for provider checklists.

---
## Docs

- `docs/architecture.md`
- `docs/security.md`
- `docs/network-tuning.md`
- `docs/railway-optimizations.md`
- `docs/teardown.md`

