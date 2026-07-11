# Agent portability

This repository is designed to work with instruction-driven hosts that read repository-level guidance.

## Host mapping
- GitHub Copilot / VS Code: [.github/copilot-instructions.md](../.github/copilot-instructions.md)
- Cursor: [.cursor/rules/guardian-swarm.mdc](../.cursor/rules/guardian-swarm.mdc)
- Windsurf: [.windsurf/rules/guardian-swarm.md](../.windsurf/rules/guardian-swarm.md)
- Cline: [.clinerules](../.clinerules)
- Kiro: [.kiro/steering/guardian-swarm.md](../.kiro/steering/guardian-swarm.md)
- Qoder: [.qoder/rules/guardian-swarm.md](../.qoder/rules/guardian-swarm.md)
- OpenCode: [.opencode.json](../.opencode.json)

## How to use it
1. Open the repo in your preferred agent host.
2. Ensure the host loads the repository instructions automatically.
3. Invoke one of the slash commands defined in [commands/](../commands/).
