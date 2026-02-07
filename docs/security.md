# Security Notes

This stack is designed for fast setup on temporary VMs. Use these safeguards
to reduce exposure while keeping it zero-cost.

## Minimum recommended
- **SSH keys only** (disable password auth).
- **Use HTTPS** via Caddy (ACME). Avoid plain HTTP.
- **Pair Sunshine once**, then block its UI port.
- **Firewall allowlist**: only required ports.

## Sunshine UI exposure
Sunshine Web UI typically runs on `:47990`. Expose it only during setup:

```
sudo ufw delete allow 47990/tcp
```

Alternatively, SSH tunnel it:
```
ssh -L 47990:127.0.0.1:47990 ubuntu@<vm-ip>
```

## Signaling server
- Use a **random room ID**.
- Set short resume TTLs for mobile reconnect.
- Keep Caddy in front of signaling for TLS.

## TURN credentials
- Use a **strong shared secret**.
- Rotate the secret when recreating the VM.

## VM hardening (optional)
- Enable `fail2ban`
- Disable unused services
- Keep the VM lifetime short

