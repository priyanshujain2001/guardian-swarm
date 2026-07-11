const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const outputDir = path.join(repoRoot, 'docs', 'generated');
const guardianDir = path.join(repoRoot, '.guardian');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(fileName, data) {
  ensureDir(outputDir);
  fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(data, null, 2) + '\n');
}

function writeText(fileName, content) {
  const targetPath = path.isAbsolute(fileName) ? fileName : path.join(outputDir, fileName);
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, content);
}

function getTopLevelEntries() {
  return fs.readdirSync(repoRoot, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.') || entry.name === '.claude' || entry.name === '.cloudplugin' || entry.name === '.guardian')
    .map((entry) => ({ name: entry.name, type: entry.isDirectory() ? 'directory' : 'file' }));
}

function buildRepoMap() {
  return {
    repo: path.basename(repoRoot),
    generatedAt: new Date().toISOString(),
    topLevelEntries: getTopLevelEntries(),
    keyFolders: ['commands', 'skills', 'subagents', 'workflows', 'tests', 'docs'],
  };
}

function buildDependencyGraph() {
  const packageJsonPath = path.join(repoRoot, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return { note: 'No package.json found', dependencies: {} };
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return {
    name: packageJson.name || 'guardian-swarm',
    dependencies: packageJson.dependencies || {},
    devDependencies: packageJson.devDependencies || {},
  };
}

function buildArchitectureDoc() {
  return [
    '# Repository architecture',
    '',
    '## Overview',
    '- This repository acts as a portable review-and-instruction package for coding agents.',
    '- It exposes command definitions, skills, subagent roles, and host-specific integration files.',
    '',
    '## Main areas',
    '- commands/: slash-command workflow definitions',
    '- skills/: reusable review skills for security, architecture, QA, and AST analysis',
    '- subagents/: role-specific instructions for specialist agents',
    '- workflows/: memory-bank and state-machine guidance',
    '- docs/: documentation and benchmark artifacts',
    '',
    '## Intended usage',
    '- Agents load AGENTS.md and use the matching command protocol before reviewing a repository.',
    '- The generated context artifacts help the agent understand the repository shape before it begins a review.',
  ].join('\n');
}

function buildCallGraph() {
  return {
    nodes: [
      { id: 'AGENTS.md', type: 'instructions' },
      { id: 'commands/guardian-audit.md', type: 'command' },
      { id: 'skills/guardian-security/SKILL.md', type: 'skill' },
      { id: 'subagents/01_security_agent.md', type: 'subagent' },
    ],
    edges: [
      { from: 'AGENTS.md', to: 'commands/guardian-audit.md' },
      { from: 'commands/guardian-audit.md', to: 'skills/guardian-security/SKILL.md' },
      { from: 'skills/guardian-security/SKILL.md', to: 'subagents/01_security_agent.md' },
    ],
  };
}

function main() {
  ensureDir(outputDir);
  ensureDir(guardianDir);
  writeJson('repo-map.json', buildRepoMap());
  writeJson('dependency-graph.json', buildDependencyGraph());
  writeText('architecture.md', buildArchitectureDoc());
  writeJson('callgraph.json', buildCallGraph());
  writeText(path.join(guardianDir, 'README.md'), '# Guardian context artifacts\n\nThese files are generated before a review begins to provide the agent with a lightweight repository map and working context.\n');
  console.log('Generated context artifacts in', outputDir);
}

main();
