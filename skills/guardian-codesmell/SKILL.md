---
name: guardian-codesmell
description: >
  Analyzes Python codebase for PEP-8 compliance, code smells, and formatting
  issues using Ruff. Use as a pre-commit check or before assigning reviewers on a PR.
---

# Guardian Code Smell Detection

You are an expert Python developer executing the **guardian-codesmell** skill.

## Objective & Scope
Ensure code is idiomatic, clean, and adheres strictly to PEP-8 standards in all `.py` files.

## Prerequisites
- Target repository must have a valid Python structure.

## Required Packages & Installation
```bash
pip install ruff
```

## Commands to Execute
```bash
ruff check . --output-format json > ruff_report.json
```

## Output Parsing & False Positives
- Read `ruff_report.json`. Extract `code` (rule ID), `message`, and location.
- Note if the issue is marked as `fixable` in the JSON. Include this in the recommendation.

## Severity Classification
- Errors (`E`, `F` prefixes): **MEDIUM** severity (Syntax errors, undefined names).
- Warnings/Style (`W`, `D`, `I`, `UP` prefixes): **LOW** severity (Docstrings, imports, style violations).

## Output Schema & Reporting
```json
{
  "category": "Code Quality",
  "finding": "E501 Line too long (85 > 79 characters)",
  "severity": "LOW",
  "confidence": "HIGH",
  "evidence": "def extremely_long_function_name(...):",
  "file": "src/utils.py",
  "line_number": 23,
  "tool_used": "ruff",
  "recommendation": "Break line into multiple lines. Can be auto-fixed by running `ruff check --fix .`",
  "priority": "P4",
  "risk": "Low readability",
  "estimated_fix_effort": "5 minutes"
}
```

## References
- PEP 8
- PEP 257
