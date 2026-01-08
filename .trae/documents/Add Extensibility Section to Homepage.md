# Add Detailed "Extensibility" Section to Homepage

## 1. Create New Component: `src/components/sections/extensibility.tsx`
Create a React component with rich, descriptive content to explain the extensibility model clearly.
-   **Structure**: `section` with a 3-column grid layout.
-   **Content**:
    -   **Section Header**:
        -   **Title**: "Extensibility"
        -   **Subtitle**: "A three-tier design ensuring continuous growth and adaptation to new needs."
    -   **Detailed Cards**:
        1.  **Foundation Expansion (LSP Client)**
            -   **Icon**: `Blocks` (Lucide)
            -   **Description**: "The underlying library continuously expands support for more language ecosystems (Python, Rust, Go, etc.) and integrates new LSP 3.17 standard capabilities like Type Hierarchy and Call Hierarchy."
            -   **Key Points**: "Multi-Language Support", "LSP Standard Compliance"
        2.  **Capability Expansion (LSAP Protocol)**
            -   **Icon**: `Zap` (Lucide)
            -   **Description**: "Continuously designs composed capabilities like Relation API and Impact Analysis, while optimizing Markdown output formats based on Progressive Disclosure for better LLM reasoning."
            -   **Key Points**: "Composed Capabilities", "LLM-Optimized Output"
        3.  **Scenario Expansion (Best Practice System)**
            -   **Icon**: `BookOpen` (Lucide)
            -   **Description**: "A modular system enabling community contributions of domain-specific workflows (Frontend, Backend) and framework specializations (Django, React) to cover every development scenario."
            -   **Key Points**: "Domain Workflows", "Framework Specialization"

## 2. Update Homepage: `src/pages/index.astro`
-   Import `Extensibility` from `@/components/sections/extensibility`.
-   Insert `<Extensibility client:visible />` immediately after the `<Architecture />` section to provide context on how the architecture evolves.

## 3. Verification
-   Check that the text is legible and not truncated.
-   Verify the layout adapts gracefully to smaller screens (stacking cards).
