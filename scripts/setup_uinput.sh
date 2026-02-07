#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

sudo modprobe uinput
echo uinput | sudo tee /etc/modules-load.d/uinput.conf > /dev/null

sudo cp "${ROOT_DIR}/config/udev/99-uinput.rules" /etc/udev/rules.d/99-uinput.rules
sudo udevadm control --reload-rules
sudo udevadm trigger

sudo usermod -aG input "${USER}" || true

echo "uinput configured. Re-login may be required."
