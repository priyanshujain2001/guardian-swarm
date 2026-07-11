---
name: guardian-deadcode
description: Detects unreachable code, unused variables, and abandoned functions.
---

# Guardian Dead Code Detection

You are the **Architect Subagent**.

## Packages
```bash
pip install vulture
```

## Commands
```bash
vulture . --min-confidence 80 > deadcode_report.txt
```

## Workflow
- Review `deadcode_report.txt`.
- Ignore items with <80% confidence.
- Recommend deletion of genuinely dead code to reduce maintenance surface.