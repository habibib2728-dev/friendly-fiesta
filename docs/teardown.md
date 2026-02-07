# Teardown (avoid charges)

Use this checklist before your free credits expire.

## 1) Stop containers and remove volumes
```
docker compose down -v
```

## 2) Delete VM resources
Use the provider script:
```
./scripts/teardown_vm.sh --provider runpod
```

## 3) Verify cleanup
- VM is terminated
- Public IP released
- Disks removed
- No running pods/instances

