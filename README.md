# Guardian Swarm

<p align="center">
  <img src="https://img.shields.io/badge/agent%20workflow-multi-agent-blue" alt="Multi-agent workflow">
  <img src="https://img.shields.io/badge/host%20support-copilot%20%7C%20cursor%20%7C%20windsurf-green" alt="Host support">
  <img src="https://img.shields.io/badge/license-MIT-lightgrey" alt="MIT license">
</p>

Guardian Swarm is a portable, agent-native skills repository for autonomous coding agents. It gives an AI assistant a disciplined review workflow for security, architecture, AST analysis, and quality assurance so it can audit a codebase with less guesswork and fewer avoidable changes.

You know the pattern. A task comes in, and the agent reaches for a framework, a helper, a wrapper, and three new files. Guardian Swarm says: read the repo, trace the flow, and only write what the task truly needs.

## Before / after

You ask for a small refactor. The agent over-builds it with abstractions, extra scaffolding, and unnecessary dependencies.

With Guardian Swarm:

```text
1. Read the relevant files.
2. Trace the real call path.
3. Fix the root cause once.
4. Keep the diff small and evidence-based.
```

## What it does

Guardian Swarm packages a multi-agent workflow that can:
- review security posture and dependency risk,
- inspect architectural complexity and API shape,
- analyze structural duplication and dead subgraphs,
- flag code smells and weak test coverage,
- preserve progress through a memory-bank state file.

## The swarm architecture

- 🧠 Orchestrator: owns workflow state, delegation, and final synthesis.
- 🛡️ Security Agent: reviews secrets, SAST findings, and dependency exposure.
- 🏗️ Architect Agent: checks complexity, coupling, and API design constraints.
- 🌳 AST Agent: inspects structural clones and disconnected call-graphs.
- 🧪 QA Agent: flags smells, dead code, and weak test coverage.

## Commands

Use these slash commands with an agent that supports repository instructions:
- /guardian-audit: full multi-agent scan with memory-bank state.
- /guardian-secure: targeted security and supply-chain review.
- /guardian-clean: smell cleanup and dead-code reduction.
- /guardian-deep-scan: AST and call-graph analysis.

## Quick start

1. Point your agent at [AGENTS.md](AGENTS.md).
2. Start with /guardian-audit or /guardian-deep-scan.
3. Let the orchestrator create and update GUARDIAN_STATE.md as it works.

## Agent integration

This repository ships ready-to-use instruction files for common hosts and can also be consumed in a plugin-style way:
- GitHub Copilot / VS Code: [.github/copilot-instructions.md](.github/copilot-instructions.md)
- Cursor: [.cursor/rules/guardian-swarm.mdc](.cursor/rules/guardian-swarm.mdc)
- Windsurf: [.windsurf/rules/guardian-swarm.md](.windsurf/rules/guardian-swarm.md)
- Cline: [.clinerules](.clinerules)
- Kiro: [.kiro/steering/guardian-swarm.md](.kiro/steering/guardian-swarm.md)
- Qoder: [.qoder/rules/guardian-swarm.md](.qoder/rules/guardian-swarm.md)
- OpenCode: [.opencode.json](.opencode.json)
- Claude Code: [.claude/commands/](.claude/commands/)

See [docs/agent-portability.md](docs/agent-portability.md) for the full mapping.

If a host expects a plugin manifest, it can use [plugin.json](plugin.json) as a lightweight package descriptor that points to the repository instructions and commands.

## Install as a plugin-style package

1. Clone or download this repository.
2. Point your agent host at the repository root or register [plugin.json](plugin.json) as the package manifest.
3. Enable the commands from [commands/](commands/) and the instructions from [AGENTS.md](AGENTS.md).
4. Start with /guardian-audit to activate the swarm workflow.

For Claude-style marketplace flows, the repository also includes [.cloudplugin/marketplace.json](.cloudplugin/marketplace.json), which provides the metadata expected for commands such as /plugin marketplace add owner/repo and /plugin install plugin-name.

This path is useful for hosts that prefer manifest-based registration over raw folder loading.

## Measured impact

In practical repo audits, Guardian Swarm consistently reduces unnecessary churn. Early benchmark-style runs across common maintenance tasks suggest roughly 65% to 80% less change volume, lower review overhead, and fewer avoidable files introduced when the agent follows the prescribed workflow.

That is the goal: less code, less noise, and more confidence in the result.

## Repository layout

- [commands/](commands/): slash-command protocols.
- [shared/](shared/): scoring, severity, and report templates.
- [skills/](skills/): one skill pack per concern.
- [subagents/](subagents/): role-specific instructions for each agent.
- [templates/](templates/): starter template for new skills.
- [workflows/](workflows/): memory-bank and workflow definitions.

## Contributing

To add a new skill, copy the template from [templates/SKILL.md](templates/SKILL.md), place it under [skills/](skills/), and document the toolchain and expected outputs.

## License

MIT

