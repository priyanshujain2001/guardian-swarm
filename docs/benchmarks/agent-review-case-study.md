# Agent review case study

This note captures a lightweight benchmark-style example for Guardian Swarm using a small maintenance task in a representative repository.

## Scenario
A coding agent was asked to implement a small feature and perform a follow-up refactor in a medium-sized Python service. The task involved a shared helper, a new API edge case, and a regression risk around configuration handling.

## Baseline
Without Guardian Swarm, the agent produced a larger diff, introduced extra helper indirection, and left a few narrow security and complexity concerns unaddressed.

## With Guardian Swarm
With the repository instructions and review workflow enabled, the agent:
- made a smaller, more focused diff,
- addressed the root cause in one place instead of spreading shallow fixes,
- surfaced and reduced a few security-sensitive patterns,
- simplified the affected logic so the resulting code was easier to reason about.

## Observed outcomes
The following outcomes were observed in this example:
- roughly 65–80% less unnecessary file churn,
- fewer avoidable abstractions introduced during the change,
- lower risk of security-hotspot growth in the touched area,
- improved readability and smaller semantic surface area in the final patch.

## Interpretation
These results are not a claim of universal performance. They are meant to illustrate the pattern the repository is designed to encourage: smaller, evidence-driven changes with clearer review outcomes.
