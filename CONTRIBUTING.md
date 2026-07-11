# Contributing

To contribute a new skill, copy the template from [templates/SKILL.md](templates/SKILL.md) into a new directory under [skills/](skills/) (for example [skills/guardian-new-skill/SKILL.md](skills/guardian-new-skill/SKILL.md)) and fill in the required executable steps.

## Maintenance checklist
- Keep [AGENTS.md](AGENTS.md) and the command protocols in [commands/](commands/) aligned with any new workflow.
- Add host-specific instructions if the new workflow should work in other agent hosts.
- Run `npm test` before opening a pull request.
- Update [CHANGELOG.md](CHANGELOG.md) and the roadmap when behavior changes.
