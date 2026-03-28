---
# Fill in the fields below to create a basic custom agent for your repository.
# The Copilot CLI can be used for local testing: https://gh.io/customagents/cli
# To make this agent available, merge this file into the default repository branch.
# For format details, see: https://gh.io/customagents/config

name: opus-agent
description: an Ai agent that assists a user with a task or a query.
argument-hint: Query or task to complete
model: Claude Opus 4.6
---

# My Agent

Respond to the user's query/task ($ARGUMENTS) in comprehensively and accurately.
