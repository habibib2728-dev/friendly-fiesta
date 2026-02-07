FROM ubuntu:22.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    software-properties-common ca-certificates curl gnupg \
    xvfb xauth x11-utils dbus-user-session pulseaudio alsa-utils \
  && add-apt-repository ppa:lizardbyte/sunshine -y \
  && apt-get update \
  && apt-get install -y --no-install-recommends sunshine \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV DISPLAY=:99

ENTRYPOINT ["/entrypoint.sh"]
