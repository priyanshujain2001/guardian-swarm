const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const { validateRepository } = require('../scripts/validate-repo');

const repoRoot = path.resolve(__dirname, '..');

test('repository validation finds the expected core files', () => {
  const result = validateRepository();
  assert.equal(result.ok, true);
  assert.ok(result.checked.includes('README.md'));
  assert.ok(result.checked.includes('AGENTS.md'));
  assert.ok(result.checked.includes('commands/guardian-audit.md'));
});

test('marketplace manifest exists and exposes the expected commands', () => {
  const manifestPath = path.join(repoRoot, '.cloudplugin', 'marketplace.json');
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(raw);

  assert.equal(manifest.name, 'guardian-swarn');
  assert.ok(Array.isArray(manifest.commands));
  assert.deepEqual(
    manifest.commands.map((command) => command.name),
    ['guardian-audit', 'guardian-secure', 'guardian-clean', 'guardian-deep-scan']
  );
});

test('Claude command files exist for every main command', () => {
  const expectedFiles = [
    '.claude/commands/guardian-audit.md',
    '.claude/commands/guardian-secure.md',
    '.claude/commands/guardian-clean.md',
    '.claude/commands/guardian-deep-scan.md',
  ];

  expectedFiles.forEach((relativePath) => {
    assert.equal(fs.existsSync(path.join(repoRoot, relativePath)), true, `Missing ${relativePath}`);
  });
});

test('root instructions and command docs stay wired together', () => {
  const rootInstructions = fs.readFileSync(path.join(repoRoot, 'AGENTS.md'), 'utf8');
  const auditCommand = fs.readFileSync(path.join(repoRoot, 'commands/guardian-audit.md'), 'utf8');
  const secureCommand = fs.readFileSync(path.join(repoRoot, 'commands/guardian-secure.md'), 'utf8');

  assert.match(rootInstructions, /commands\/\)/);
  assert.match(auditCommand, /guardian-audit/);
  assert.match(secureCommand, /guardian-secure/);
});

test('skills expose machine-readable manifests and platform scaffolding exists', () => {
  const skillsDir = path.join(repoRoot, 'skills');
  const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  skillDirs.forEach((skillName) => {
    const manifestPath = path.join(skillsDir, skillName, 'skill.yaml');
    assert.equal(fs.existsSync(manifestPath), true, `Missing ${skillName}/skill.yaml`);
  });

  const requiredPlatformFiles = [
    'registry/packages/bandit.yaml',
    'registry/packages/ruff.yaml',
    'registry/packages/radon.yaml',
    'registry/packages/semgrep.yaml',
    'standards/owasp/README.md',
    'standards/pep8/README.md',
    'rules/enterprise/README.md',
    'memory/README.md',
    'agents/handoff-schema.json',
    'scripts/classify-repo.js',
  ];

  requiredPlatformFiles.forEach((relativePath) => {
    assert.equal(fs.existsSync(path.join(repoRoot, relativePath)), true, `Missing ${relativePath}`);
  });
});

test('repository classification script returns structured recommendations', () => {
  const { classifyRepository } = require('../scripts/classify-repo');
  const result = classifyRepository(repoRoot);

  assert.ok(Array.isArray(result.classifications));
  assert.ok(result.recommended_skills.includes('guardian-security'));
  assert.equal(typeof result.repository, 'string');
});
