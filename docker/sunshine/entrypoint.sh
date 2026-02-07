#!/usr/bin/env bash
set -euo pipefail

DISPLAY="${DISPLAY:-:99}"
VIRTUAL_RESOLUTION="${VIRTUAL_RESOLUTION:-1280x720}"
SUNSHINE_CONFIG="${SUNSHINE_CONFIG:-/config/sunshine.conf}"

WIDTH="${VIRTUAL_RESOLUTION%x*}"
HEIGHT="${VIRTUAL_RESOLUTION#*x}"

mkdir -p /config
export XDG_RUNTIME_DIR=/tmp/runtime
mkdir -p "${XDG_RUNTIME_DIR}"

dbus-daemon --system --fork || true
pulseaudio --start || true

Xvfb "${DISPLAY}" -screen 0 "${WIDTH}x${HEIGHT}x24" +extension GLX +render -noreset &

exec sunshine --config "${SUNSHINE_CONFIG}"
