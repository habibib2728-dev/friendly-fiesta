#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

sudo cp "${ROOT_DIR}/config/sysctl/99-cloud-gaming.conf" /etc/sysctl.d/99-cloud-gaming.conf
sudo sysctl --system

echo "Network tuning applied."
