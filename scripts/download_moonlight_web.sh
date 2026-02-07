#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="${ROOT_DIR}/client/dist"

mkdir -p "${DIST_DIR}"
rm -rf "${DIST_DIR:?}/"*

if [[ -n "${CLIENT_TARBALL_URL:-}" ]]; then
  if [[ "${CLIENT_TARBALL_URL}" == *.zip ]] && ! command -v unzip >/dev/null 2>&1; then
    echo "unzip not found. Install unzip or use a .tar.gz archive."
    exit 1
  fi
  TMP_DIR="$(mktemp -d)"
  ARCHIVE="${TMP_DIR}/client.tar"
  curl -L "${CLIENT_TARBALL_URL}" -o "${ARCHIVE}"
  if [[ "${CLIENT_TARBALL_URL}" == *.zip ]]; then
    unzip -q "${ARCHIVE}" -d "${TMP_DIR}/unpack"
  else
    tar -xf "${ARCHIVE}" -C "${TMP_DIR}/unpack"
  fi
  cp -r "${TMP_DIR}/unpack/"* "${DIST_DIR}/"
  echo "Client extracted to ${DIST_DIR}"
  exit 0
fi

CLIENT_REPO="${CLIENT_REPO:-MrCreativ3001/moonlight-web-stream}"
CLIENT_BRANCH="${CLIENT_BRANCH:-main}"

if ! command -v git >/dev/null 2>&1; then
  echo "git not found. Install git or set CLIENT_TARBALL_URL."
  exit 1
fi

TMP_DIR="$(mktemp -d)"
git clone --depth 1 --branch "${CLIENT_BRANCH}" "https://github.com/${CLIENT_REPO}.git" "${TMP_DIR}"

if [[ -f "${TMP_DIR}/package.json" ]]; then
  if ! command -v npm >/dev/null 2>&1; then
    echo "npm not found. Install Node.js or set CLIENT_TARBALL_URL."
    exit 1
  fi
  (cd "${TMP_DIR}" && npm install)
  if (cd "${TMP_DIR}" && npm run | grep -q " build"); then
    (cd "${TMP_DIR}" && npm run build)
  fi
fi

if [[ -d "${TMP_DIR}/dist" ]]; then
  cp -r "${TMP_DIR}/dist/"* "${DIST_DIR}/"
elif [[ -d "${TMP_DIR}/build" ]]; then
  cp -r "${TMP_DIR}/build/"* "${DIST_DIR}/"
elif [[ -d "${TMP_DIR}/public" ]]; then
  cp -r "${TMP_DIR}/public/"* "${DIST_DIR}/"
else
  echo "No build output found. Place your client files in ${DIST_DIR}."
  exit 1
fi

echo "Client installed to ${DIST_DIR}"
