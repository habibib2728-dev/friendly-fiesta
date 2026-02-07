#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

bash "${SCRIPT_DIR}/bootstrap_mvp.sh"
bash "${SCRIPT_DIR}/apply_network_tuning.sh"
bash "${SCRIPT_DIR}/open_ports.sh" full

echo "Full bootstrap complete."
