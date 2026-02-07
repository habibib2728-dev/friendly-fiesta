#!/usr/bin/env bash
set -euo pipefail

sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository ppa:lizardbyte/sunshine -y
sudo apt-get update
sudo apt-get install -y sunshine

mkdir -p "${HOME}/.config/sunshine"

echo "Sunshine installed."
echo "Run 'sunshine' once to generate config, then configure via Web UI."
