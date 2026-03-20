
Goal: isolate why `policyliteracy.enterprises` and `www.policyliteracy.enterprises` timeout on your device even though both domains resolve and load externally.

What I confirmed from outside your network:
- `https://policyliteracy.enterprises` loads successfully.
- `https://www.policyliteracy.enterprises` loads successfully.
- Public DNS currently returns:
  - `policyliteracy.enterprises -> 185.158.133.1`
  - `www.policyliteracy.enterprises -> 185.158.133.1`
- No AAAA records (IPv6), only A records.

Diagnosis plan (device/network focused, no code changes):

1) Run a strict DNS + connectivity check on your Mac
- In Terminal, run exactly:
  - `dig policyliteracy.enterprises A +short`
  - `dig www.policyliteracy.enterprises A +short`
  - `dig @1.1.1.1 policyliteracy.enterprises A +short`
  - `dig @8.8.8.8 policyliteracy.enterprises A +short`
  - `curl -Iv --connect-timeout 10 https://policyliteracy.enterprises`
  - `curl -Iv --connect-timeout 10 https://www.policyliteracy.enterprises`

2) Branch by result
- If `dig @1.1.1.1` / `@8.8.8.8` returns `185.158.133.1` but plain `dig` does not:
  - Your local resolver is stale/misconfigured.
  - Fix by setting DNS manually to `1.1.1.1` + `8.8.8.8`, then flush:
    - `sudo dscacheutil -flushcache`
    - `sudo killall -HUP mDNSResponder`
- If all `dig` commands return correct IP but `curl` times out:
  - DNS is fine; connection path is being blocked on your device.
  - Disable VPN/proxy, security web shields, adblock DNS clients (NextDNS/AdGuard), and test in Safari too.

3) Check device-level overrides (common root cause when Wi‑Fi and hotspot both fail)
- Inspect `/etc/hosts` for accidental entries:
  - `grep -n "policyliteracy\\.enterprises\\|185\\.158\\.133\\.1" /etc/hosts`
- In Chrome:
  - Turn Secure DNS OFF temporarily (or force Cloudflare provider).
  - Open `chrome://net-internals/#dns` and clear host cache.
- Fully quit/reopen Chrome after clearing cache.

4) Verify it is not browser-specific
- Test same URL in Safari.
- If Safari works but Chrome fails, reset Chrome networking state (extensions off, secure DNS provider changed, clear DNS cache).

5) Final registrar/Lovable consistency check (only if above still fails)
- Keep exactly:
  - `@ A 185.158.133.1`
  - `www A 185.158.133.1`
  - `_lovable TXT lovable_verify=...` (for apex)
  - `_lovable.www TXT lovable_verify=...` (for www, if Lovable requested separately)
- Remove conflicting forwarding/URL/CNAME records for `@` and `www`.

Technical details:
- Your symptom (timeout, not NXDOMAIN) means the browser cannot complete TCP/TLS to the target, not necessarily that DNS is missing.
- Because both Wi‑Fi and hotspot fail for you while public checks succeed, the highest-probability cause is device-level resolver/network interception (custom DNS client, security software, proxy, hosts override, or Chrome DNS state), not Lovable deployment.
