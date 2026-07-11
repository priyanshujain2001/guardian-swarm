# Repository architecture

## Overview
- This repository acts as a portable review-and-instruction package for coding agents.
- It exposes command definitions, skills, subagent roles, and host-specific integration files.

## Main areas
- commands/: slash-command workflow definitions
- skills/: reusable review skills for security, architecture, QA, and AST analysis
- subagents/: role-specific instructions for specialist agents
- workflows/: memory-bank and state-machine guidance
- docs/: documentation and benchmark artifacts

## Intended usage
- Agents load AGENTS.md and use the matching command protocol before reviewing a repository.
- The generated context artifacts help the agent understand the repository shape before it begins a review.