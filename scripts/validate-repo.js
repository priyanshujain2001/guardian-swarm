const fs = require('fs');
const path = require('path');

function validateRepository(rootDir = process.cwd()) {
  const requiredFiles = [
    'README.md',
    'AGENTS.md',
    'package.json',
    'metadata.json',
    'plugin.json',
    'mcp/server.json',
    'commands/guardian-audit.md',
    'commands/guardian-secure.md',
    'commands/guardian-clean.md',
    'commands/guardian-deep-scan.md',
    'skills/guardian-security/SKILL.md',
    'skills/guardian-testing/SKILL.md',
    '.github/copilot-instructions.md',
    '.cursor/rules/guardian-swarm.mdc',
    '.windsurf/rules/guardian-swarm.md',
    '.kiro/steering/guardian-swarm.md',
    '.qoder/rules/guardian-swarm.md',
    '.opencode.json',
    '.clinerules',
    'docs/agent-portability.md',
    'docs/generated/repo-map.json',
    'docs/generated/dependency-graph.json',
    'docs/generated/architecture.md',
    'docs/generated/callgraph.json',
    'registry/packages/bandit.yaml',
    'registry/packages/ruff.yaml',
    'registry/packages/radon.yaml',
    'registry/packages/semgrep.yaml',
    'standards/owasp/README.md',
    'standards/pep8/README.md',
    'rules/enterprise/README.md',
    'memory/README.md',
    'agents/handoff-schema.json',
    'scripts/classify-repo.js'
  ];

  const missing = requiredFiles.filter((relativePath) => !fs.existsSync(path.join(rootDir, relativePath)));

  return {
    ok: missing.length === 0,
    checked: requiredFiles,
    missing,
  };
}

if (require.main === module) {
  const result = validateRepository();
  if (!result.ok) {
    console.error('Repository validation failed. Missing files:', result.missing.join(', '));
    process.exit(1);
  }
  console.log('Repository validation passed.');
}

module.exports = { validateRepository };
