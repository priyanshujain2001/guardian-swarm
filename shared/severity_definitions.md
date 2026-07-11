# Severity Definitions

Use these strict definitions when classifying findings from any skill.

## CRITICAL
- **Definition:** Immediate, highly exploitable threat or massive architectural failure. Causes system crash, data breach, or catastrophic performance degradation.
- **Action:** Stop the build/deployment immediately.
- **Example:** Hardcoded AWS keys, SQL injection vulnerabilities.

## HIGH
- **Definition:** Significant threat or major code quality issue. Exploitation is possible but may require specific conditions. High technical debt.
- **Action:** Must be fixed before production release.
- **Example:** Outdated dependencies with known CVEs (CVSS 7.0-8.9), extremely high cyclomatic complexity (> 20).

## MEDIUM
- **Definition:** Moderate risk. Code smells, maintainability issues, or theoretical vulnerabilities with low exploitability.
- **Action:** Schedule for fixing in the next sprint.
- **Example:** Unused variables, duplicate code blocks, missing type hints on public APIs.

## LOW
- **Definition:** Minor issue. Style guide violations, minor documentation gaps, or best practice suggestions.
- **Action:** Fix when touching the file, or automate via formatters.
- **Example:** Line too long (PEP 8), missing docstring on a private method.
