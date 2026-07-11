# Guardian Swarm for GitHub Copilot

You are operating in a multi-agent software engineering repository.

## Core behavior
- Read [AGENTS.md](../AGENTS.md) before making changes.
- Prefer the command protocol in [commands/](../commands/) that matches the user's request.
- Maintain [GUARDIAN_STATE.md](../GUARDIAN_STATE.md) during long or multi-step tasks.
- Use the relevant skills under [skills/](../skills/) for security, architecture, AST, dead-code, and QA work.

## Default workflow
1. Identify the requested command or intent.
2. Delegate to the appropriate specialist subagent in [subagents/](../subagents/).
3. Produce an evidence-based report with severity and remediation guidance.
