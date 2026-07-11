#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

function classifyRepository(rootDir = process.cwd()) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  const files = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  walk(rootDir);

  const text = files.join('\n');
  const signals = {
    fastapi: /fastapi|APIRouter|@router/i.test(text),
    django: /django|urlpatterns|settings.py/i.test(text),
    cli: /commander|argparse|click|yargs/i.test(text),
    sdk: /client|sdk|api_client/i.test(text),
    ai: /openai|anthropic|langchain|transformers/i.test(text),
    ml: /pytorch|tensorflow|sklearn|numpy/i.test(text),
    data: /pandas|jupyter|notebook/i.test(text),
    package: /setup.py|pyproject.toml|package.json/i.test(text),
    microservice: /docker-compose|k8s|service/i.test(text),
    monolith: /src\/|app\/|server\/|controllers/i.test(text),
  };

  const classifications = Object.entries(signals)
    .filter(([, matched]) => matched)
    .map(([name]) => name);

  return {
    repository: packageJson.name || 'unknown',
    classifications,
    recommended_skills: [
      'guardian-security',
      'guardian-dependency',
      'guardian-architecture',
      'guardian-testing',
    ],
  };
}

if (require.main === module) {
  const result = classifyRepository();
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { classifyRepository };
