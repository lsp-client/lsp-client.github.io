---
slug: why-lsp-for-agents
title: Why LSP is a Great Substrate for Coding Agents
description: "From symbol graphs to semantic navigation: what agents get “for free” with LSP."
publishedAt: 2026-01-05
tags:
  - LSP
  - Agents
  - Architecture
readingMinutes: 6
---

Coding agents need stable, structured signals. LSP already defines a battle-tested contract for “where things are” (definitions, references), “what things are” (hover/type), and “how to change them safely” (workspace edits).

> A good agent loop is just search → inspect → decide → edit → verify. LSP accelerates the first two steps with semantic primitives.

## What you get immediately

- Symbol navigation without brittle regexes
- Workspace-wide refactors via typed edits
- Incremental context: only fetch what you need

## A tiny example

```python
definitions = await client.request_definition_locations(
  file_path="app.py",
  position=Position(line=10, character=5),
)
```

This kind of API gives agents deterministic handles to code meaning, not just text shapes.
