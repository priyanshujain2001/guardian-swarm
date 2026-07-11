const test = require('node:test');
const assert = require('node:assert/strict');
const { validateRepository } = require('../scripts/validate-repo');

test('repository validation finds the expected core files', () => {
  const result = validateRepository();
  assert.equal(result.ok, true);
  assert.ok(result.checked.includes('README.md'));
  assert.ok(result.checked.includes('AGENTS.md'));
  assert.ok(result.checked.includes('commands/guardian-audit.md'));
});
