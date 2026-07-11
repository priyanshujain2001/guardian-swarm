# MCP support for Guardian Swarm

This directory provides a minimal MCP-oriented manifest for hosts that want to expose Guardian Swarm as a tool or skills package over an MCP-style interface.

## What is included
- a lightweight server manifest in server.json
- a pointer to the repository instructions and Claude command files

## How to use it
1. Point an MCP-compatible host at this repository root.
2. Load the commands and instructions exposed by the manifest.
3. Use the Guardian Swarm workflow through the host's MCP integration.
