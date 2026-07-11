# The Guardian Memory Bank Protocol

**CRITICAL:** AI Context windows drop information over long tasks. To guarantee ZERO missed steps, the Guardian Swarm uses a filesystem-backed Memory Bank.

## Protocol Rules
1. **Initialize:** When an audit starts, the Orchestrator MUST create a file named `GUARDIAN_STATE.md` in the root directory.
2. **Read/Write:** Before switching context to a Subagent, the Orchestrator writes the current task to `GUARDIAN_STATE.md`.
3. **Subagent Updates:** When a Subagent finishes a skill, it MUST append its JSON findings directly into `GUARDIAN_STATE.md` using file editing tools.
4. **Resumption:** If the chat session resets or the agent gets confused, it MUST read `GUARDIAN_STATE.md` to instantly remember where it was.

## GUARDIAN_STATE.md Template
```markdown
# Guardian Swarm State
- [x] Phase 1: Security (Completed)
- [ ] Phase 2: Architecture
- [ ] Phase 3: AST & Deduplication
- [ ] Phase 4: QA & Code Smells

## Stored Findings
(Append JSON findings here)
```