---
name: guardian-dependency
description: >
  Analyzes the Python dependency tree for known vulnerabilities, outdated packages,
  and licensing issues (SCA). Use for routine monthly maintenance or before a
  production release to ensure supply chain security.
---

# Guardian Dependency Analysis

You are an expert security engineer executing the **guardian-dependency** skill.

## Objective & Scope
Ensure the project's software supply chain is secure. Scope includes `requirements.txt`, `Pipfile`, `pyproject.toml`, or `poetry.lock`.

## Prerequisites
- Project dependencies must be resolvable (e.g., standard requirement files exist).

## Required Packages & Installation
```bash
pip install pip-audit pipdeptree
```

## Commands to Execute
```bash
pip-audit -f json -r requirements.txt > audit_report.json || true
pipdeptree --json-tree > deptree.json
```

## Output Parsing & False Positives
- Read `audit_report.json`. If a dependency has `vulns`, record it.
- Use `deptree.json` to map transitive vulnerabilities back to the root package.
- Ignore vulnerabilities explicitly marked as "disputed" in the OSV database.

## Severity Classification
- CVSS >= 9.0: **CRITICAL**
- CVSS 7.0 - 8.9: **HIGH**
- CVSS 4.0 - 6.9: **MEDIUM**
- CVSS < 4.0: **LOW**
- No CVSS: **HIGH**

## Output Schema & Reporting
```json
{
  "category": "SCA",
  "finding": "Vulnerability CVE-2023-XXXXX in requests<2.31.0",
  "severity": "CRITICAL",
  "confidence": "HIGH",
  "evidence": "Path: my-app -> some-lib -> requests",
  "file": "requirements.txt",
  "line_number": 0,
  "tool_used": "pip-audit",
  "recommendation": "Upgrade 'requests' to >=2.31.0.",
  "priority": "P0",
  "risk": "RCE vulnerability",
  "estimated_fix_effort": "15 minutes"
}
```

## References
- NIST National Vulnerability Database (NVD)
- OSV Scanner
