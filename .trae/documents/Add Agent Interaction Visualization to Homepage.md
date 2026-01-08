# Implement "Claude Code" Style Agent Workflow Simulation

I will create a highly faithful reproduction of the Claude Code terminal interface to visualize the LSAP workflow. This will use the specific aesthetic cues provided (Dark theme, Orange accents, "Simmering..." status).

## 1. Create Component `src/components/sections/agent-workflow.tsx`

I will build a React component that mimics the Claude Code CLI experience:

### Visual Design (Claude Code Aesthetic)
-   **Theme**: Deep dark background (`bg-[#1c1c1c]` or similar) with a subtle border.
-   **Typography**: Monospace font (Stack: `Menlo, Monaco, "Courier New", monospace`).
-   **Accents**: Use the signature "Claude Orange" (`text-[#D97757]` or similar) for special states and prompts.
-   **Layout**:
    -   **Header**: `* Welcome to Claude Code!` greeting.
    -   **Input Area**: A distinct, bordered input box at the bottom with a `>` prompt.
    -   **Status Indicators**: Use `* Simmering...` (or `* Thinking...`) to represent the Agent's processing state.

### Animation Sequence
1.  **Initialization**: Show the "Welcome" banner.
2.  **User Input**: Simulate typing in the bottom input box:
    `> refactor DateUtil.format_date`
3.  **Agent State**:
    -   Display `* Simmering...` (Thinking state) in Orange.
    -   Show internal thought process: *"I need to find usages of this function..."*
4.  **Tool Execution (LSAP)**:
    -   Display the tool call clearly:
        ```javascript
        call lsap.search({
          locate: "DateUtil.format_date",
          mode: "references"
        })
        ```
5.  **LSAP Response**:
    -   Show the **Structured Markdown** result appearing in the terminal stream, formatted as code blocks.

## 2. Update Homepage `src/pages/index.astro`
-   Import `AgentWorkflow` and place it immediately after the `Hero` section.
-   Ensure the section has a clear heading like "Repository-Scale Intelligence" to contextualize the demo.

## 3. Implementation Details
-   **State Management**: Use `useState` and `useEffect` to drive the timed animation sequence.
-   **Styling**: Use Tailwind CSS for layout and custom colors (e.g., `text-orange-500` for the specific Claude shade).
-   **Icons**: Minimal usage, relying mostly on text/terminal aesthetics as per the reference image.
