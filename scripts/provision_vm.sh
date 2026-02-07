#!/usr/bin/env bash
set -euo pipefail

PROVIDER=""

usage() {
  echo "Usage: bash scripts/provision_vm.sh --provider <runpod|vast|paperspace|aws>"
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --provider)
      PROVIDER="$2"
      shift 2
      ;;
    *)
      usage
      ;;
  esac
done

if [[ -z "${PROVIDER}" ]]; then
  usage
fi

echo "Provisioning guide for provider: ${PROVIDER}"
echo
echo "Recommended VM:"
echo "  - Ubuntu 22.04 LTS"
echo "  - NVIDIA GPU (T4/RTX/A10)"
echo "  - 30-50GB disk"
echo "  - Public IP"
echo
echo "Required ports:"
echo "  - 22/tcp, 80/tcp, 443/tcp"
echo "  - 47990/tcp, 47984/tcp, 47989/tcp, 48010/tcp"
echo "  - 47998-48000/udp"
echo

case "${PROVIDER}" in
  runpod)
    echo "RunPod steps:"
    echo "  1) Create a Secure Cloud GPU pod"
    echo "  2) Image: Ubuntu 22.04"
    echo "  3) Enable public IP"
    echo "  4) Open required ports"
    ;;
  vast)
    echo "Vast.ai steps:"
    echo "  1) Create instance with Ubuntu 22.04"
    echo "  2) Enable public IP"
    echo "  3) Open required ports"
    ;;
  paperspace)
    echo "Paperspace steps:"
    echo "  1) Create a GPU machine (Ubuntu 22.04)"
    echo "  2) Assign a public IP"
    echo "  3) Open required ports"
    ;;
  aws)
    echo "AWS steps:"
    echo "  1) Launch an EC2 GPU instance (g4dn or g5)"
    echo "  2) Ubuntu 22.04 AMI"
    echo "  3) Security group: open required ports"
    ;;
  *)
    usage
    ;;
esac

echo
echo "After provisioning, SSH in and run:"
echo "  bash scripts/bootstrap_mvp.sh"
