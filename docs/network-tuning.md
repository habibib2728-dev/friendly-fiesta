# Network Tuning

These settings improve latency and stability on lossy networks. Use the script
to apply kernel sysctl values tuned for UDP/WebRTC.

## Apply once
```
./scripts/apply_network_tuning.sh
```

## What it changes
- Enable BBR + FQ for smoother pacing
- Increase UDP receive/send buffers
- Allow TCP MTU probing (helps with VPN and mobile)

## Verify
```
sysctl net.ipv4.tcp_congestion_control
sysctl net.core.default_qdisc
```

If you want to revert:
```
sudo rm -f /etc/sysctl.d/99-cloud-gaming.conf
sudo sysctl --system
```

