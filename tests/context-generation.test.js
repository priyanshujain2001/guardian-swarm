const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const repoRoot = path.join(__dirname, '..');
const outputDir = path.join(repoRoot, 'docs', 'generated');

function runGenerator() {
  execFileSync(process.execPath, [path.join(repoRoot, 'scripts', 'generate-context.js')], { cwd: repoRoot, stdio: 'pipe' });
}

test('context generator writes requested artifacts', () => {
  runGenerator();

  const requiredFiles = ['repo-map.json', 'dependency-graph.json', 'architecture.md', 'callgraph.json'];
  for (const file of requiredFiles) {
    assert.ok(fs.existsSync(path.join(outputDir, file)), `${file} should be generated`);
  }

  const repoMap = JSON.parse(fs.readFileSync(path.join(outputDir, 'repo-map.json'), 'utf8'));
  assert.ok(repoMap.repo);
  assert.ok(Array.isArray(repoMap.topLevelEntries));
});
