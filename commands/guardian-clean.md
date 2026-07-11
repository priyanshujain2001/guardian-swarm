---
command: /guardian-clean
description: Auto-fixes code smells and dead code.
---

# Trigger: `/guardian-clean`

When the user types `/guardian-clean`:
1. Delegate to **QA Agent** and **Architect Agent**.
2. Run `ruff check --fix .` and `ruff format .`.
3. Run `vulture` to identify and carefully remove dead code.
4. Provide a summary of lines removed and files formatted.