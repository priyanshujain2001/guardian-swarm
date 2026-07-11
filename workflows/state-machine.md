# Guardian State Machine (No-Forget Protocol)

To ensure the AI agent never hallucinates or skips steps during long audits, it must use this explicit State Machine Checklist. 

Before every tool execution, the agent must output its current state:

`[STATE: 01-INIT] Analyzing repository structure...`
`[STATE: 02-INSTALL] Installing required pip packages for active skills...`
`[STATE: 03-EXECUTE-SECURITY] Running bandit and detect-secrets...`
`[STATE: 04-EXECUTE-SCA] Running pip-audit...`
`[STATE: 05-EXECUTE-ARCH] Running radon and vulture...`
`[STATE: 06-EXECUTE-QA] Running ruff and pytest...`
`[STATE: 07-PARSE] Consolidating JSON outputs...`
`[STATE: 08-REPORT] Generating final Engineering Report.`

If a step fails, the agent MUST NOT skip to 08. It must retry or log the exact error in the report.