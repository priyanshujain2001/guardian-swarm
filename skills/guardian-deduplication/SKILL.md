---
name: guardian-deduplication
description: >
  Deep structural clone detection (Type-1 and Type-2 clones) to identify duplicated logic.
  Uses AST-aware tools to find copy-pasted code even if variables are renamed.
---

# Guardian Deduplication Analysis

You are the **AST & Graph Subagent**.

## Prerequisites
- Accessible source code.
- Node.js installed (for jscpd) OR Python (for pylint duplicates).

## Required Packages & Installation
```bash
# Option 1: AST-aware Python duplicated code detection
pip install pylint
# Option 2: Multi-language token-based duplicate detection (if npm is available)
npm install -g jscpd
```

## Commands to Execute
```bash
# Run Pylint's duplicate code checker
pylint --disable=all --enable=duplicate-code $(find . -name "*.py" -not -path "*/venv/*") > duplicates_report.txt

# Run jscpd (if installed)
npx jscpd . --pattern "**/*.py" --ignore "**/.venv/**,**/node_modules/**" --reporters json --output jscpd_report/
```

## Output Parsing & False Positives
- **Type-1 Clones:** Exact copy-pastes. HIGH severity if > 20 lines.
- **Type-2 Clones:** Structurally identical, renamed variables. MEDIUM severity.
- Ignore duplicates in `/tests/` or boilerplate configuration files.

## Output Schema
Save findings to the Orchestrator's state file using standard Guardian JSON schema. Recommend creating shared utility functions or base classes to DRY the code.