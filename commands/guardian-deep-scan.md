---
command: /guardian-deep-scan
description: Focused AST, Call-Graph, and Deduplication scan.
---

# Trigger: `/guardian-deep-scan`

When the user types `/guardian-deep-scan`:
1. Orchestrator creates `GUARDIAN_STATE.md`.
2. Delegate to **ASTAgent**.
3. Run `guardian-deduplication` and `guardian-ast-analysis`.
4. Synthesize a report specifically targeting Type-2 clones and disconnected call-graphs.