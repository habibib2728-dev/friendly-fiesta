#!/usr/bin/env bash
set -euo pipefail

if command -v nvidia-smi >/dev/null 2>&1; then
  echo "NVIDIA drivers already installed."
  exit 0
fi

sudo apt-get update
sudo apt-get install -y pciutils ubuntu-drivers-common

if lspci | grep -qi nvidia; then
  sudo ubuntu-drivers autoinstall
  echo "NVIDIA drivers installed. Reboot may be required."
  exit 0
fi

if lspci | grep -qi "AMD/ATI"; then
  echo "AMD GPU detected. Install amdgpu-pro drivers manually."
  exit 0
fi

echo "No supported GPU detected."
exit 1
