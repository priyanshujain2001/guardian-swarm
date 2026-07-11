# Swarm Quickstart

## 1. Load the rules
Ensure your coding agent reads [AGENTS.md](AGENTS.md) at startup. For host-specific support, copy the matching instruction file from the integration set in [README.md](README.md).

For Claude Code, the repository now includes command files under [.claude/commands/](.claude/commands/). If your Claude setup does not auto-load those commands, place the repo root or the [.claude/](.claude/) folder in the workspace that Claude is using.

If your host prefers a plugin-like install, use [plugin.json](plugin.json) as a simple manifest for the repository’s commands and instructions.

## Plugin-style install

1. Open this repository in the host that supports package or plugin manifests.
2. Register [plugin.json](plugin.json) as the manifest entry point.
3. Allow the host to load [AGENTS.md](AGENTS.md) and the command files in [commands/](commands/).
4. Start with /guardian-audit or /guardian-secure.

For Claude marketplace-style usage, also ensure [.cloudplugin/marketplace.json](.cloudplugin/marketplace.json) is present in the public repository root so the host can discover the plugin metadata.

## 2. Trigger the swarm
Use the commands in [commands/](commands/):
- /guardian-audit: full multi-agent review.
- /guardian-secure: security-focused audit.
- /guardian-clean: smell cleanup and dead-code reduction.
- /guardian-deep-scan: AST and call-graph investigation.

## 3. How the workflow behaves
When you invoke /guardian-audit:
1. The orchestrator initializes the memory bank.
2. The Security Agent inspects secrets and dependency risks.
3. The Architect Agent checks complexity and API architecture.
4. The AST Agent studies structural clones and orphaned subgraphs.
5. The QA Agent reviews smells, dead code, and test coverage.
6. The orchestrator synthesizes the final report with evidence and priorities.