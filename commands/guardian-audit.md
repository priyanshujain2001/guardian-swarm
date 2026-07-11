---
command: /guardian-audit
description: Full repository multi-agent swarm audit with Memory Bank persistence.
---

# Trigger: `/guardian-audit`

When the user types `/guardian-audit`, the Orchestrator MUST execute this exact workflow:

1. **Preflight Context:** Run `npm run preflight` (or `node scripts/generate-context.js`) to create `docs/generated/repo-map.json`, `docs/generated/dependency-graph.json`, `docs/generated/architecture.md`, and `docs/generated/callgraph.json` before the audit begins.
2. **Init Memory Bank:** Create `GUARDIAN_STATE.md` based on `workflows/memory-bank.md`.
3. **Phase 1 (Security):** `[SYSTEM: Switch Context -> SecurityAgent]` -> Run `guardian-security`, `guardian-dependency` & `guardian-supply-chain`. Append results to state.
4. **Phase 2 (Architecture):** `[SYSTEM: Switch Context -> ArchitectAgent]` -> Run `guardian-complexity` & `guardian-api-design`. Append results to state.
5. **Phase 3 (AST & Graphs):** `[SYSTEM: Switch Context -> ASTAgent]` -> Run `guardian-deduplication` & `guardian-ast-analysis`. Append results to state.
6. **Phase 4 (Quality):** `[SYSTEM: Switch Context -> QAAgent]` -> Run `guardian-codesmell` & `guardian-testing`. Append results to state.
7. **Phase 5 (Synthesis):** Orchestrator reads `GUARDIAN_STATE.md`, calculates total Technical Debt, generates the final report, and cleans up the state file.\n
