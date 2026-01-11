---
slug: locate-semantic-positioning
title: "Locate: Bridging the Gap Between Semantics and Precision"
description: "Why LLM agents struggle with line numbers, and how our 'Two-Stage Positioning' system gives them IDE-level accuracy."
publishedAt: 2026-01-11
tags:
  - LSP
  - Agents
  - Design
readingMinutes: 10
---

# Locate: Bridging the Gap Between Semantics and Precision

If you've ever tried to build a coding agent that interacts with an LSP (Language Server Protocol) server, you've likely hit a wall: **The "Positioning" Problem.**

LSP speaks the language of the compiler. It wants precise `line: 42, character: 15`.
LLMs, on the other hand, speak the language of semantics. They think in terms of "the return statement in the `save_user` function" or "where we initialize the database connection."

Asking an LLM to count characters to find an offset is a recipe for hallucinations. But asking it to just "find the function" isn't precise enough for features like code completion or rename.

Today, we're sharing the design of the **Locate** module—our solution for giving agents character-level precision without the character-counting headache.

## The Problem: Why Line Numbers Fail Agents

When we started, we looked at two obvious options:

1.  **Direct Line/Column Specification**: Asking the agent for raw coordinates.
    - **The Failure**: LLMs are notoriously bad at counting. Even worse, if a single line is added at the top of the file, every single position in the agent's memory becomes invalid. It lacks "structural stability."
2.  **Symbol Path Only**: Telling the agent to just use `["MyClass", "my_method"]`.
    - **The Failure**: This is great for finding the _start_ of a function, but what if the agent needs to hover over a specific variable _inside_ that function? Symbol paths alone are too coarse.

## Our Solution: Two-Stage Positioning

We realized that positioning for agents needs to match how humans describe code. We don't say "Go to line 100." We say "In `my_function`, look for the line where we call `api.send()`."

This led to our **Two-Stage Positioning** model:
`Position = Scope (Narrowing down) + Find (Precise locating)`

First, we narrow the search area to a **Scope** (like a class or method). Then, the agent provides a **Find** pattern with a secret weapon: **The Marker (`<|>`)**.

```python
# The agent wants to trigger completion after 'self.'
find = "self.<|>"
```

The system automatically resolves this to the precise character offset. This decoupling of _intent_ from _physical offset_ makes agents significantly more reliable.

---

# Appendix: Full Design Specification

This section contains the complete technical rules and decision records for the Locate module.

## Core Concept Rules

### Stage 1: Scope Types

| Scope Type    | Description               | Typical Scenario                          |
| ------------- | ------------------------- | ----------------------------------------- |
| `SymbolScope` | Code range of a symbol    | Locating inside a specific function/class |
| `LineScope`   | Line number or line range | Locating based on diagnostic information  |
| `None`        | Entire file               | Global search for a text pattern          |

### Stage 2: Automatic Marker Detection

- Markers use nested bracket notation: `<|>`, `<<|>>`, `<<<|>>>`, etc.
- The system automatically detects the marker with the deepest nesting level that appears exactly once.
- **With marker**: Locates at the marker position.
- **Without marker**: Locates at the start of the matched text.
- **`find` is `None`**: Uses the "natural position" of the Scope.

## String Syntax

**Format:** `<file_path>:[scope]@[find]`

- **Line scope**: `foo.py:42`, `foo.py:10,20`, `foo.py:10-20`
- **Symbol scope**: `foo.py:MyClass.my_method`
- **With find**: `foo.py:MyClass@return <|>result`

## Position Resolution Matrix

| Scope         | Find           | Resolution Result                            |
| ------------- | -------------- | -------------------------------------------- |
| `SymbolScope` | `None`         | Position of the symbol's declared name       |
| `SymbolScope` | With marker    | Marked position within the symbol body       |
| `SymbolScope` | Without marker | Start of matched text within the symbol body |
| `LineScope`   | `None`         | First non-whitespace character of the line   |
| `LineScope`   | With marker    | Marked position within the line              |
| `LineScope`   | Without marker | Start of matched text within the line        |
| `None`        | With marker    | Global search, marked position               |
| `None`        | Without marker | Global search, start of matched text         |

## Whitespace Handling (Token-Aware)

1.  **Identifiers are atomic**: `int` will not match `i n t`.
2.  **Flexible operator spacing**: `a+b` matches `a + b` (using `\s*`).
3.  **Mandatory explicit whitespace**: Pattern spaces require at least one space in source (`\s+`).

| Input       | Matching Logic                           | Matches                   | Rejects   |
| ----------- | ---------------------------------------- | ------------------------- | --------- |
| `int a`     | Requires space between tokens            | `int a`, `int  a`         | `inta`    |
| `a+b`       | Allows flexible spacing around operators | `a+b`, `a + b`            | `ab`      |
| `foo.bar`   | Allows flexible spacing around dot       | `foo.bar`, `foo . bar`    | `foobar`  |
| `foo(x, y)` | Allows flexible spacing; preserves comma | `foo(x, y)`, `foo( x,y )` | `foo(xy)` |

## LSP Capability Mapping

| LSP Capability               | Positioning Need    | Locate Usage                     |
| :--------------------------- | :------------------ | :------------------------------- | ------------- |
| `textDocument/definition`    | Identifier position | `find="<                         | >identifier"` |
| `textDocument/references`    | Symbol declaration  | `SymbolScope(symbol_path=[...])` |
| `textDocument/hover`         | Any identifier      | `find="<                         | >target"`     |
| `textDocument/completion`    | Trigger point       | `find="obj.<                     | >"`           |
| `textDocument/signatureHelp` | Inside parentheses  | `find="func(<                    | >"`           |
| `textDocument/codeAction`    | Selected range      | `LocateRange(scope=...)`         |

## Design Decision Record (DDR)

- **Q: Why is Scope optional?** To enable file-wide searching when the agent knows a code snippet but not its containing symbol.
- **Q: Why is the marker optional?** To reduce cognitive load; often the start of matched text is sufficient.
- **Q: Why does SymbolScope without Find locate the declaration?** Because LSP `references` and `rename` operations specifically require the declared name position, not the function body start.
- **Q: Why a separate LocateRange?** Position (point) and Range (interval) represent different semantic operations in LSP.
- **Q: Why automatic nested marker detection?** To allow agents to resolve conflicts (e.g., if code contains `<|>`, they can use `<<|>>`) without complex configuration.

## Future Considerations

- **Multiple Matches**: Adding `find_index` for disambiguation.
- **Fuzzy Matching**: Improving tolerance for refactored code.
- **Reverse Positioning**: Explaining raw offsets back to the agent in "Locate" terms.
