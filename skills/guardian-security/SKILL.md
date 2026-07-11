---
name: guardian-security
description: >
  Comprehensive SAST and secrets scanning for Python projects. Detects
  vulnerabilities, hardcoded secrets, and unsafe code patterns. Use before
  production release, during security audits, or when merging significant
  architectural changes.
---

# Guardian Security Review

You are an expert security engineer executing the **guardian-security** skill.

## Objective & Scope
Detect vulnerabilities, hardcoded secrets, and unsafe code patterns in all `.py` files and configuration files (`.env`, `.yml`, `.json`).

## Prerequisites
- Accessible source code.

## Required Packages & Installation
Install the following via pip:
```bash
pip install bandit detect-secrets safety
```

## Commands to Execute
Run the following commands exactly as specified to generate machine-readable output:
```bash
bandit -r . -x "tests,test" -f json -o bandit_report.json
detect-secrets scan > secrets_report.json
```

## Output Parsing & False Positives
**Bandit (`bandit_report.json`):**
- Ignore `B101` (assert_used) unless the code is specifically a security gateway.
- Ignore `B322` (input_used) if the project is confirmed Python 3 only.

**Detect-Secrets (`secrets_report.json`):**
- Every finding is considered **CRITICAL** unless it is explicitly inside a `tests/` directory or named `example.env`.

**Consolidation:**
- If Bandit flags a hardcoded password (B105, B106, B107) AND detect-secrets flags it, merge them into a single finding.

## Severity Classification
- **Bandit High:** CRITICAL or HIGH.
- **Bandit Medium:** MEDIUM.
- **Bandit Low:** LOW.
- **detect-secrets:** CRITICAL.

## Output Schema & Reporting
Format the results using this schema and present them as a final Engineering Report.

```json
{
  "category": "Security",
  "finding": "Description of vulnerability",
  "severity": "CRITICAL",
  "confidence": "HIGH",
  "evidence": "Snippet of code",
  "file": "path/to/file.py",
  "line_number": 10,
  "tool_used": "bandit",
  "recommendation": "How to fix it",
  "priority": "P0",
  "risk": "High risk of data breach",
  "estimated_fix_effort": "1 hour"
}
```

## References
- OWASP Top 10
- Python Security Best Practices
