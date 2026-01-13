---
slug: designing-lsap
title: "Designing LSAP: Building a Cognitive Interface for Coding Agents"
description: "Why raw LSP isn't enough: A deep dive into the design philosophy behind LSAP, from semantic anchoring to Markdown-first protocols."
publishedAt: 2026-01-13
tags:
  - LSAP
  - Design
  - Architecture
  - Protocol
readingMinutes: 10
---

In our [previous post](/blog/why-lsp-for-agents), we discussed why the Language Server Protocol (LSP) is the necessary "source of truth" for coding agents. But recognizing the need for LSP is only step one. The immediate next challenge is: **How do we make LSP usable for LLMs?**

If you've ever tried to feed raw LSP JSON responses to an LLM, you know the pain. The responses are verbose, fragmented, and rely on precise line/column integers that drift the moment a single character changes.

This "Impedance Mismatch" led us to design **LSAP (Language Server Agent Protocol)**. LSAP isn't just a wrapper; it's a *translation layer* that converts the atomic, rigid world of compilers into the semantic, flexible world of Agents.

Here is the inside story of the three key design decisions that shape LSAP.

## 1. Cognitive vs. Atomic Capabilities

LSP was designed for IDEs. An IDE is an event-loop that reacts to milliseconds of user latency. It needs "atomic" operations:
*   `textDocument/definition`: Jump to this file, this line.
*   `textDocument/hover`: Show this tooltip string.

Agents, however, operate on "cognitive" intents. They don't want to "jump"; they want to "understand usage."

If an agent wants to "Find all references of `User`" using raw LSP, it has to:
1.  Call `textDocument/definition` to find the symbol.
2.  Call `textDocument/references` to get a list of 50 locations.
3.  **For each location**:
    *   Open the file.
    *   Read the file content.
    *   Extract the surrounding 10 lines of code.
    *   Identify the enclosing function (to know *where* it's being used).

This sequence might take 50+ HTTP round-trips and burn thousands of tokens just passing file content back and forth.

**The LSAP Solution: Orchestration**
LSAP moves this complexity to the server. A single LSAP request:

```json
{
  "mode": "references",
  "locate": { "file_path": "models.py", "find": "class <|>User" }
}
```

Triggers all those steps internally. The protocol returns a single, synthesized report. We call this a **Cognitive Capability**: a tool that maps 1:1 with an agent's unit of work.

## 2. Markdown-First Protocol

Most API protocols return structured JSON. While precise for machines, JSON can be verbose for LLMs—especially when escaping code snippets. LSAP adopts a **Markdown-First** approach to present code context in its most natural form.

Crucially, our Markdown templates follow a design philosophy similar to **TOML**: we avoid deep visual nesting in favor of explicit, flattened paths.

Instead of burying information under five levels of headers:

```markdown
# src
## auth
### login.py
#### User
##### validate
```

We use flattened identifiers to represent hierarchy, keeping the document structure clean and token-efficient:

```markdown
### src/auth/login.py > User.validate

... context ...
```

By flattening the nesting structure, we ensure the agent maintains context without getting lost in indentation hell, similar to how TOML uses `[server.database]` headers to define deep config sections clearly.

## 3. The "Locate" Problem: Semantic Anchoring

Perhaps the hardest problem in coding agents is **Positioning**.

LSP relies on `Line: 42, Character: 15`.
LLMs are notoriously bad at counting characters. Worse, if the agent writes a line of code at the top of the file, *every single line number below it changes*. Using integers for positioning is like trying to point at a moving target.

LSAP introduces a **Semantic Locator** system designed for resilience. Instead of coordinates, we use **Anchors**.

```python
# The LSAP "Locate" Object
{
  "file_path": "src/models.py",
  "scope": { "symbol_path": ["User", "validate"] },
  "find": "return <|>result"
}
```

This instruction says: *"Go to `src/models.py`, find the `User` class, find the `validate` method inside it, and then locate the text 'return result', placing the cursor before 'result'."*

This approach is:
*   **Robust**: If lines move, the symbol path still finds the class.
*   **Unique**: The `scope` narrows down the context so the `find` pattern doesn't need to be globally unique.
*   **Natural**: It mimics how humans describe locations ("It's in the `validate` function, near the return statement").

## Conclusion

We built LSAP because we realized that **LSP is the engine, but Agents need a steering wheel.**

By wrapping the raw power of compiler analysis into a protocol designed for *Cognition* (high-level intent), *Perception* (Markdown reports), and *Stability* (Semantic Anchors), we can build agents that don't just "edit text," but truly understand the structure they are working with.
