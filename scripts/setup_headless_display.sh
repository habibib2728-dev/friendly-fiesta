#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

sudo apt-get update
sudo apt-get install -y xserver-xorg-video-dummy
sudo cp "${ROOT_DIR}/config/xorg/xorg.conf" /etc/X11/xorg.conf

echo "Headless Xorg configured. Reboot recommended."
