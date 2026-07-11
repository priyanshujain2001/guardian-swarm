const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const repoRoot = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('plugin manifest exposes the same command names that the repo ships', () => {
  const manifest = JSON.parse(read('.cloudplugin/marketplace.json'));
  const commandNames = manifest.commands.map((command) => command.name).sort();
  const shippedCommands = fs
    .readdirSync(path.join(repoRoot, '.claude/commands'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort();

  assert.deepEqual(commandNames, shippedCommands.map((name) => name.replace(/^guardian-/, 'guardian-')));
});

test('root AGENTS instructions mention the command workflow entry points', () => {
  const agents = read('AGENTS.md');
  const commandsDir = fs.readdirSync(path.join(repoRoot, 'commands'));

  const expected = commandsDir.filter((file) => file.endsWith('.md'));

  expected.forEach((file) => {
    assert.match(agents, new RegExp(file.replace(/\.md$/, '')));
  });
});

test('package metadata and plugin manifest agree on the repository identity', () => {
  const packageJson = JSON.parse(read('package.json'));
  const manifest = JSON.parse(read('.cloudplugin/marketplace.json'));

  const normalizeRepository = (value) => value.replace(/^git\+/, '').replace(/\.git$/, '');

  assert.equal(normalizeRepository(packageJson.repository.url), normalizeRepository(manifest.repository));
  assert.equal(packageJson.homepage, manifest.homepage);
});

test('README documents the main install and plugin paths', () => {
  const readme = read('README.md');
  const quickstart = read('QUICKSTART.md');

  assert.match(readme, /plugin-style package/i);
  assert.match(readme, /\.cloudplugin\/marketplace\.json/);
  assert.match(quickstart, /Plugin-style install/i);
});

test('manifest metadata is complete and references the expected entry points', () => {
  const manifest = JSON.parse(read('.cloudplugin/marketplace.json'));

  assert.ok(manifest.displayName);
  assert.ok(manifest.description);
  assert.ok(manifest.repository);
  assert.ok(manifest.homepage);
  assert.equal(manifest.entrypoints.instructions, 'AGENTS.md');
  assert.equal(manifest.entrypoints.commandsDir, '.claude/commands');
});

test('command files and manifest names stay aligned', () => {
  const manifest = JSON.parse(read('.cloudplugin/marketplace.json'));
  const commandNames = manifest.commands.map((command) => command.name);

  commandNames.forEach((name) => {
    const filePath = path.join(repoRoot, '.claude/commands', `${name}.md`);
    assert.equal(fs.existsSync(filePath), true, `Expected command file for ${name}`);
  });
});

test('plugin.json exists and exposes the same core instructions and commands', () => {
  const plugin = JSON.parse(read('plugin.json'));

  assert.equal(plugin.name, 'guardian-swarm');
  assert.deepEqual(plugin.commands, ['guardian-audit', 'guardian-secure', 'guardian-clean', 'guardian-deep-scan']);
  assert.deepEqual(plugin.instructions.slice(0, 2), ['AGENTS.md', 'commands/guardian-audit.md']);
});

test('package scripts run the validation and test workflow', () => {
  const packageJson = JSON.parse(read('package.json'));

  assert.match(packageJson.scripts.test, /node --test tests\/\*\.test\.js/);
  assert.match(packageJson.scripts.test, /node scripts\/validate-repo\.js/);
});

test('command docs contain their own command names and trigger markers', () => {
  const commandNames = ['guardian-audit', 'guardian-secure', 'guardian-clean', 'guardian-deep-scan'];

  commandNames.forEach((name) => {
    const content = read(`commands/${name}.md`);
    assert.match(content, new RegExp(name));
    assert.match(content, /Trigger/i);
  });
});

test('metadata.json carries the expected portable agent tags', () => {
  const metadata = JSON.parse(read('metadata.json'));

  assert.equal(metadata.name, 'Guardian Swarm');
  assert.ok(metadata.description);
  assert.ok(metadata.tags.includes('agents'));
  assert.ok(metadata.tags.includes('skills'));
});
