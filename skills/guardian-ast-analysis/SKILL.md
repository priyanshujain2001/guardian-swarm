---
name: guardian-ast-analysis
description: >
  Deep AST (Abstract Syntax Tree) and Call-Graph analysis for advanced dead code,
  unused exports, and unreachable execution paths.
---

# Guardian AST & Call-Graph Analysis

You are the **AST & Graph Subagent**.

## Prerequisites
- Accessible source code.

## Required Packages & Installation
```bash
pip install pycg vulture pydeps
```

## Commands to Execute
```bash
# 1. Generate a Call Graph (Python Call Graph generator)
pycg $(find . -name "*.py" -not -path "*/venv/*" -not -path "*/tests/*") -o callgraph.json

# 2. Vulture with 100% confidence for absolute dead code
vulture . --min-confidence 100 > absolute_deadcode.txt
```

## Output Parsing & False Positives
- Parse `callgraph.json` to find functions that have 0 inbound edges (no callers) and are NOT standard entry points (e.g., `main`, routes, CLI commands).
- These are "Orphaned Subgraphs".
- Classify unreachable complex logic as HIGH severity Technical Debt.
- Ignore Django/Flask/FastAPI route handlers which are called by the framework dynamically.

## Output Schema
Provide a Graph Summary showing the disconnected nodes, and list the exact functions/classes to be deleted.