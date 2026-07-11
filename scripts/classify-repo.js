#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

function classifyRepository(rootDir = process.cwd()) {
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = fs.existsSync(packageJsonPath)
    ? JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    : { name: 'unknown' };

  const files = [];
  const fileNames = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'build') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
        fileNames.push(entry.name.toLowerCase());
      }
    }
  }

  walk(rootDir);

  const text = files.join('\n');
  const lowerText = text.toLowerCase();

  const signals = {
    api: /router|route|controller|handler|endpoint/i.test(lowerText),
    cli: /argparse|commander|click|yargs|inquirer|cobra/i.test(lowerText),
    sdk: /client|sdk|api_client|restclient/i.test(lowerText),
    ai: /openai|anthropic|langchain|transformers|llm|vectorstore/i.test(lowerText),
    ml: /pytorch|tensorflow|sklearn|numpy|keras|xgboost/i.test(lowerText),
    data: /pandas|jupyter|notebook|spark|duckdb|polars/i.test(lowerText),
    package: /package.json|pyproject.toml|setup.py|cargo.toml|go.mod|requirements.txt|pom.xml|build.gradle/i.test(lowerText),
    microservice: /docker-compose|k8s|helm|service|gateway/i.test(lowerText),
    monolith: /src\//i.test(lowerText) || /app\//i.test(lowerText) || /controllers/i.test(lowerText),
    tests: /test|spec|__tests__/i.test(lowerText),
    web: /express|fastify|next|vite|react|svelte|vue|flask|django|fastapi/i.test(lowerText),
  };

  const classifications = Object.entries(signals)
    .filter(([, matched]) => matched)
    .map(([name]) => name);

  if (!classifications.includes('tests') && fileNames.some((name) => name.includes('test') || name.includes('spec'))) {
    classifications.push('tests');
  }

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
