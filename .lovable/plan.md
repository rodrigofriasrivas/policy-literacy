
Root cause identified: your Mac is not resolving the domain to Lovable’s IP. It is being intercepted and rewritten to `securityblock.durham.ac.uk -> 10.0.0.57`, then timing out. This is a DNS/security-policy block on your device/network path, not a Lovable deployment issue.

Implementation plan (no code changes):

1) Confirm interception source on your Mac
- Run:
  - `scutil --dns | grep -E "nameserver|resolver"`
  - `networksetup -getdnsservers "Wi-Fi"`
  - `networksetup -getdnsservers "USB 10/100/1000 LAN"` (if applicable)
- Goal: identify which resolver/profile is forcing the block.

2) Remove policy/agent DNS control
- Disable any active VPN/security DNS agents (commonly Cisco Secure Client/Umbrella, Zscaler, Cloudflare Zero Trust/WARP, NextDNS profiles).
- macOS: System Settings → Privacy & Security → Profiles (remove org DNS/security profile if present and allowed).
- Browser: disable Secure DNS override temporarily in Chrome and retry.

3) Reset local network state
- Set DNS manually to `1.1.1.1` and `8.8.8.8` on active adapter (if profile allows).
- Flush caches:
  - `sudo dscacheutil -flushcache`
  - `sudo killall -HUP mDNSResponder`
- Re-test:
  - `dig policyliteracy.enterprises A +short`
  - `dig www.policyliteracy.enterprises A +short`
  - `curl -Iv --connect-timeout 10 https://policyliteracy.enterprises`

4) Branch by outcome
- If it now resolves to `185.158.133.1`: issue fixed.
- If it still resolves to `10.0.0.57` or Cloudflare/Google DNS remain unreachable: enforcement is upstream (managed policy/firewall), not local cache.

5) Escalate with exact evidence
- Send this to Durham IT/security admin:
  - Domain(s): `policyliteracy.enterprises`, `www.policyliteracy.enterprises`
  - Expected A record: `185.158.133.1`
  - Current forced resolution: `securityblock.durham.ac.uk / 10.0.0.57`
  - Request: remove block / allowlist both hostnames.
- This is the definitive fix if policy is centrally enforced.

Technical details:
- `dig @1.1.1.1` and `dig @8.8.8.8` timing out indicates outbound DNS is blocked/redirected.
- `curl` resolving to `10.0.0.57` confirms DNS sinkholing before TLS.
- `/etc/hosts` is clean, so override is not from hosts file.
