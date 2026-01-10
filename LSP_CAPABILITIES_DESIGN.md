# LSP Capabilities Section - Scalable Design Documentation

## Background

The "Repository-Scale Intelligence" section on the homepage needs to showcase LSP tool capabilities. Currently, there are 8 core capabilities, but as the project evolves, this could expand to 15-20+ capabilities including:

- Type Hierarchy
- Call Hierarchy
- Impact Analysis
- Code Lens
- Inlay Hints
- Document Links
- And more...

**Challenge**: How to display a growing list of capabilities without overwhelming the user or breaking the visual layout?

## Design Solution

### 1. Hierarchical Categorization

Instead of displaying all capabilities in a flat grid, we organize them into **semantic categories**:

```typescript
const capabilities = {
  Navigation: [
    { cmd: "Definition", desc: "...", icon: Code2 },
    { cmd: "Reference", desc: "...", icon: GitGraph },
    { cmd: "Hover", desc: "...", icon: MousePointerClick },
  ],
  Analysis: [
    { cmd: "Outline", desc: "...", icon: ListTree },
    { cmd: "Search", desc: "...", icon: Globe },
    { cmd: "Symbol", desc: "...", icon: Search },
  ],
  Refactoring: [
    { cmd: "Rename", desc: "...", icon: PenLine },
    { cmd: "Locate", desc: "...", icon: FileSearch },
  ],
};
```

**Benefits**:
- Users can quickly locate capabilities by purpose
- Logical grouping reduces cognitive load
- Easy to add new categories as the tool evolves

### 2. Visual Hierarchy

#### Category Headers
Each category has a distinct header with horizontal divider lines:

```tsx
<h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
  <span className="w-8 h-px bg-border" />
  {category}
  <span className="flex-1 h-px bg-border" />
</h4>
```

#### Compact Cards
- Smaller icons (4×4 vs 5×5)
- Horizontal icon+title layout (saves vertical space)
- Reduced padding (`pb-3` instead of default)
- Smaller font sizes (`text-base` for title, `text-xs` for description)

### 3. Responsive Grid Layout

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
```

- **Mobile**: Single column
- **Tablet**: 2 columns
- **Desktop**: 3 columns
- **Consistent spacing**: 4-unit gap

### 4. Scalability Strategy

#### Current: 3 Categories, 8 Capabilities
```
Navigation (3)
Analysis (3)
Refactoring (2)
```

#### Future: 5+ Categories, 20+ Capabilities
```
Navigation (3)
Analysis (5)
Refactoring (3)
Type Analysis (4)    // New category
Advanced (5)         // New category
```

**Key Principle**: Keep 2-5 items per category for visual balance.

### 5. Progressive Disclosure

Bottom section hints at future expansion:

```tsx
<div className="mt-12 text-center">
  <p className="text-sm text-muted-foreground">
    More capabilities coming soon: Type Hierarchy, Call Hierarchy,
    Impact Analysis...
  </p>
</div>
```

This sets user expectations and maintains excitement about the roadmap.

## Technical Implementation

### File Structure

```
src/components/sections/
├── lsp-capabilities.tsx    // New standalone component
└── agent-workflow.tsx       // Existing demo component
```

### Component Architecture

```tsx
export function LSPCapabilities() {
  return (
    <div className="max-w-6xl mx-auto mt-24">
      {/* Header */}
      <div className="text-center mb-16">...</div>
      
      {/* Category Loop */}
      <div className="space-y-12">
        {Object.entries(capabilities).map(([category, items]) => (
          <div key={category}>
            <h4>...</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(item => <Card>...</Card>)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-12 text-center">...</div>
    </div>
  );
}
```

### Integration

Added to `src/pages/index.astro`:

```astro
<Layout>
  <Hero client:load latestPostSlug={latestPost?.slug} />
  <AgentWorkflow client:visible />
  <LSPCapabilities client:visible />  <!-- New section -->
  <Installation client:visible />
  ...
</Layout>
```

## How to Extend

### Adding a New Capability to Existing Category

1. Import the icon (from `lucide-react`)
2. Add to the category array:

```typescript
Analysis: [
  // ... existing items
  {
    cmd: "CodeLens",
    desc: "Display actionable contextual information inline with your code.",
    icon: Eye,
  },
],
```

### Adding a New Category

```typescript
const capabilities = {
  // ... existing categories
  "Type System": [
    {
      cmd: "Type Hierarchy",
      desc: "Visualize inheritance and interface implementation relationships.",
      icon: Network,
    },
  ],
};
```

### Icon Selection Guide

Choose icons that are:
- **Semantically relevant** (Search icon for search functionality)
- **Visually distinct** (avoid too many similar icons)
- **From lucide-react** (maintains consistency)

## Design Principles

### 1. **Information Density**
Balance between showing enough detail and avoiding clutter. Current sweet spot:
- Title: Capability name
- Description: One sentence (max 100 characters)
- Icon: Visual anchor

### 2. **Consistency**
Match the design language of other sections:
- Use same Card components as Architecture/Extensibility sections
- Same color scheme (`border-border/50`, `bg-muted/50`)
- Same hover effects (`hover:border-primary/20`)

### 3. **Scannability**
- Category headers create visual breaks
- Icons aid quick recognition
- Consistent card heights enable grid scanning

### 4. **Future-Proof**
- No hardcoded limits
- Easy to add/remove/reorganize
- Data-driven rendering

## Visual Comparison

### Before (Simple Grid)
```
[Card] [Card] [Card]
[Card] [Card] [Card]
[Card] [Card]
```
**Problem**: At 20 items, becomes a long wall of cards.

### After (Categorized)
```
─── Navigation ───
[Card] [Card] [Card]

─── Analysis ───
[Card] [Card] [Card]

─── Refactoring ───
[Card] [Card]

─── Type System ───
[Card] [Card] [Card]
```
**Solution**: Natural sections that grow vertically with clear boundaries.

## Performance Considerations

- **Lazy Loading**: `client:visible` directive loads component only when scrolled into view
- **Static Rendering**: Capability list is static, rendered at build time
- **Small Bundle**: Minimal JavaScript (~6KB gzipped)

## Accessibility

- Semantic HTML structure (`<h3>`, `<h4>`)
- Proper heading hierarchy (h3 → h4)
- Icon decorations only (text labels provide full context)
- Sufficient color contrast (WCAG AA compliant)

## Future Enhancements

### Phase 2: Interactive Filtering
Add category tabs to show/hide sections:

```tsx
<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="navigation">Navigation</TabsTrigger>
    <TabsTrigger value="analysis">Analysis</TabsTrigger>
  </TabsList>
</Tabs>
```

### Phase 3: Search/Filter
Add a search box to filter capabilities by name/description.

### Phase 4: Detailed Modal
Click a card to open a modal with:
- Full documentation
- Code examples
- Live demo

## Conclusion

This design gracefully scales from 8 to 20+ capabilities by:
1. **Categorizing** capabilities into logical groups
2. **Compacting** visual design for information density
3. **Structuring** data for easy maintenance
4. **Maintaining** consistency with existing design system

The solution is production-ready and requires zero changes to the existing `AgentWorkflow` component.
