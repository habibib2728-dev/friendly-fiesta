#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-mvp}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -f "${ROOT_DIR}/.env" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ROOT_DIR}/.env"
  set +a
fi

if ! command -v ufw >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y ufw
fi

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw allow 47990/tcp
sudo ufw allow 47984/tcp
sudo ufw allow 47989/tcp
sudo ufw allow 48010/tcp
sudo ufw allow 47998:48000/udp

if [[ "${MODE}" == "full" ]]; then
  sudo ufw allow 3478/udp
  sudo ufw allow 5349/tcp
  TURN_MIN_PORT="${TURN_MIN_PORT:-49160}"
  TURN_MAX_PORT="${TURN_MAX_PORT:-49200}"
  sudo ufw allow "${TURN_MIN_PORT}:${TURN_MAX_PORT}"/udp
fi

sudo ufw --force enable
sudo ufw status verbose
