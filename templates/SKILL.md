---
name: guardian-template
description: >
  A boilerplate template for creating new Guardian skills. Replace this text
  with a detailed description of what the skill does and when to use it.
---

# Guardian [Skill Name]

You are an expert engineer executing the **[Skill Name]** skill.

## Objective & Scope
[Define the goal and what files are analyzed]

## Prerequisites
- [List prerequisites]

## Required Packages & Installation
```bash
pip install [package1] [package2]
```

## Commands to Execute
```bash
[command 1]
[command 2]
```

## Output Parsing & False Positives
- [Explain how to read the output]
- [List false positives to ignore]

## Severity Classification
- [Explain how to map tool outputs to CRITICAL, HIGH, MEDIUM, LOW]

## Output Schema & Reporting
Format the results using this schema:
```json
{
  "category": "[Category]",
  "finding": "[Finding Description]",
  "severity": "[Severity]",
  "confidence": "[Confidence]",
  "evidence": "[Snippet/Path]",
  "file": "[File Path]",
  "line_number": 0,
  "tool_used": "[Tool]",
  "recommendation": "[How to fix]",
  "priority": "[Priority]",
  "risk": "[Risk]",
  "estimated_fix_effort": "[Time]"
}
```

## References
- [Link or reference]
