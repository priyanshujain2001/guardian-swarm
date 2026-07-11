---
name: guardian-complexity
description: >
  Evaluates cyclomatic complexity and maintainability indices. Identifies overly
  complex, unmaintainable, or convoluted code structures. Use during refactoring,
  technical debt evaluation, or large PR reviews.
---

# Guardian Complexity Analysis

You are an expert software architect executing the **guardian-complexity** skill.

## Objective & Scope
Identify overly complex code (Spaghetti code, God classes, Long methods) in all `.py` files containing application logic.

## Prerequisites
- Accessible source code.

## Required Packages & Installation
```bash
pip install radon xenon
```

## Commands to Execute
```bash
radon cc -j -a . > cc_report.json
radon mi -j . > mi_report.json
```

## Output Parsing & False Positives
**Cyclomatic Complexity (CC):**
- Rank **D, E, F (CC > 20):** HIGH severity.
- Rank **C (CC 11-20):** MEDIUM severity.
- Ignore A and B.

**Maintainability Index (MI):**
- **MI < 20 (Rank C):** HIGH severity.
- **MI 20 - 49 (Rank B):** MEDIUM severity.
- Ignore MI >= 50.

- Ignore high complexity in auto-generated files (migrations, protobufs) and tests.

## Output Schema & Reporting
```json
{
  "category": "Architecture",
  "finding": "Function 'process_data' has Cyclomatic Complexity of 25 (Rank F)",
  "severity": "HIGH",
  "confidence": "HIGH",
  "evidence": "def process_data(payload): ...",
  "file": "src/processor.py",
  "line_number": 150,
  "tool_used": "radon",
  "recommendation": "Extract inner loops into smaller helper functions.",
  "priority": "P2",
  "risk": "High maintenance cost, bug-prone",
  "estimated_fix_effort": "4 hours"
}
```

## References
- Cyclomatic Complexity
- Halstead Metrics
- Maintainability Index
