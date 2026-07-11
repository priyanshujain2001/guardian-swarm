---
command: /guardian-secure
description: Targeted security & supply chain audit.
---

# Trigger: `/guardian-secure`

When the user types `/guardian-secure`:
1. Orchestrator delegates immediately to the **Security Subagent**.
2. Run `guardian-security`, `guardian-dependency`, and `guardian-supply-chain`.
3. Report only critical/high CVEs, exposed secrets, and major supply chain hotspots. Stop the deployment if any are found.\n