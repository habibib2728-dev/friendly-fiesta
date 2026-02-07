#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

bash "${SCRIPT_DIR}/install_gpu_drivers.sh"
bash "${SCRIPT_DIR}/setup_docker.sh"
bash "${SCRIPT_DIR}/setup_uinput.sh"
bash "${SCRIPT_DIR}/open_ports.sh" mvp

if [[ ! -f "${ROOT_DIR}/.env" ]]; then
  cp "${ROOT_DIR}/config/env.example" "${ROOT_DIR}/.env"
  echo "Created .env. Update DOMAIN and ACME_EMAIL."
fi

echo "MVP bootstrap complete."
echo "Next steps:"
echo "  1) Edit ${ROOT_DIR}/.env"
echo "  2) bash ${SCRIPT_DIR}/download_moonlight_web.sh"
echo "  3) docker compose up -d"
