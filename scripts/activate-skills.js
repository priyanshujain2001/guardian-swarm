#!/usr/bin/env node
const path = require('node:path');
const { classifyRepository } = require('./classify-repo');

function activateSkills(rootDir = process.cwd()) {
  const classification = classifyRepository(rootDir);
  const selectedSkills = ['guardian-security'];
  const selectedStandards = [];

  if (classification.classifications.includes('api') || classification.classifications.includes('web')) {
    selectedSkills.push('guardian-api-design');
  }

  if (classification.classifications.includes('cli')) {
    selectedSkills.push('guardian-architecture');
  }

  if (classification.classifications.includes('ai') || classification.classifications.includes('ml') || classification.classifications.includes('data')) {
    selectedSkills.push('guardian-dependency');
    selectedSkills.push('guardian-testing');
    selectedStandards.push('owasp');
  }

  if (classification.classifications.includes('microservice')) {
    selectedSkills.push('guardian-architecture');
    selectedStandards.push('owasp');
  }

  if (classification.classifications.includes('tests')) {
    selectedSkills.push('guardian-testing');
  }

  if (selectedSkills.length === 0) {
    selectedSkills.push(...classification.recommended_skills);
  }

  if (!selectedStandards.includes('owasp') && selectedSkills.includes('guardian-security')) {
    selectedStandards.push('owasp');
  }

  if (!selectedStandards.includes('pep8') && classification.classifications.includes('web')) {
    selectedStandards.push('pep8');
  }

  return {
    repository: classification.repository,
    classifications: classification.classifications,
    selectedSkills,
    selectedStandards,
  };
}

if (require.main === module) {
  const result = activateSkills();
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { activateSkills };
