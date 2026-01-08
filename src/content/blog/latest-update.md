---
slug: announcing-lsp-analysis-skill
title: Announcing LSP Analysis Skill
description: "Equipping AI agents with compiler-accurate code understanding via LSAP."
publishedAt: 2026-01-09
tags:
  - Release
  - Skills
  - LSAP
readingMinutes: 4
---

We are excited to introduce the **LSP Analysis Skill** (v1.0.0-alpha), a new capability designed to bridge the gap between AI agents and professional-grade code intelligence.

This skill equips agents with the [Language Server Agent Protocol (LSAP)](/references/LSAP), enabling them to navigate, understand, and analyze codebases with the same fidelity as a human developer using an IDE.

## IntelliSense for Agents

Most current agents rely on text search (grep) or file reading to understand code. This is error-prone and lacks context. The LSP Analysis Skill changes this by giving agents access to **compiler-accurate** information.

Instead of guessing, agents can now:
- **Jump to Definition**: Precisely locate where symbols are defined.
- **Find References**: See exactly where functions and classes are used across the entire workspace.
- **Inspect Types**: Understand data structures without needing to read the full implementation.

## Key Capabilities

The skill provides a set of "Cognitive Capabilities" that wrap standard LSP operations:

-   **🔍 Semantic Navigation**: Understands code structure (Classes, Functions, Variables) rather than just text patterns.
-   **🏷️ Language-Awareness**: Eliminates false positives by distinguishing between identically named symbols in different scopes.
-   **🔗 Cross-File Intelligence**: Safely refactor and trace dependencies across multiple files.
-   **🗺️ Symbol Outlines**: Generate high-level maps of files to grasp architecture quickly.

## Extensible Design

We built this skill to grow with the ecosystem. It features a three-tier extensibility design:

-   **Foundation**: Built on `lsp-client`, supporting a wide range of languages (Python, Rust, TypeScript, Go, etc.).
-   **Protocol**: Powered by **LSAP**, which continuously adds new composed capabilities like Relation API and Impact Analysis.
-   **Best Practices**: A modular system allowing community contributions for domain-specific workflows (e.g., `bp_frontend.md`, `bp_django.md`).

## Getting Started

The skill wraps the `lsp` command line tool and manages the lifecycle of language servers automatically. When an agent invokes it, the skill converts fuzzy intents into precise file coordinates and returns optimized Markdown snapshots.

Check out the [Skill Documentation](/references/lsp-skill/README) to learn more about how to integrate this into your agent workflow.
