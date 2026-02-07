#!/usr/bin/env bash
set -euo pipefail

PROVIDER=""

usage() {
  echo "Usage: bash scripts/teardown_vm.sh --provider <runpod|vast|paperspace|aws>"
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

echo "Teardown guide for provider: ${PROVIDER}"
echo
echo "1) Stop containers and remove data:"
echo "   docker compose down -v"
echo
case "${PROVIDER}" in
  runpod)
    echo "2) Delete the RunPod pod and volume in the dashboard."
    ;;
  vast)
    echo "2) Destroy the Vast.ai instance and release the IP."
    ;;
  paperspace)
    echo "2) Delete the Paperspace machine and release the IP."
    ;;
  aws)
    echo "2) Terminate the EC2 instance and delete attached volumes."
    ;;
  *)
    usage
    ;;
esac

echo
echo "3) Verify no resources are running."
