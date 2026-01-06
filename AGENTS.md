# AGENTS.md

## Development Commands

```bash
# Install dependencies
bun install

# Start development server with HMR
bun dev

# Build for production
bun run build.ts

# Run production server
bun start

# Lint and check formatting
bun run lint

# Auto-fix lint and formatting issues
bun run lint:fix
```

### Build Options

```bash
bun run build.ts --outdir=dist --minify --sourcemap=linked
bun run build.ts --help  # See all available options
```

## Code Style Guidelines

### TypeScript & Linting

- **Linter/Formatter**: We use [Biome](https://biomejs.dev/) for linting, formatting, and import sorting.
- Strict mode is enabled in `tsconfig.json`
- Use `noUncheckedIndexedAccess: true` for safer array/object access
- Use absolute imports with `@/*` alias pointing to `./src/*`
- Prefer explicit types over `any`; use `unknown` for truly unknown types

### React

- Use function components with TypeScript props interfaces
- Import React only when needed (JSX transform handles most cases)
- Use `.tsx` extension for components, `.ts` for utilities

### Imports

```typescript
// Absolute imports for src
import { Button } from "@/components/ui/button";

// Relative imports for sibling files
import { cn } from "@/lib/utils";

// CSS imports
import "./index.css";
```

### Naming Conventions

- **Components**: PascalCase (`CardHeader`, `APITester`)
- **Variables/functions**: camelCase (`isLoading`, `formatFileSize`)
- **Constants**: SCREAMING_SNAKE_CASE for config constants
- **Files**: kebab-case for non-component files (`api-tester.tsx`)
- **CSS classes**: Use `cn()` utility for conditional classes

### Error Handling

- Use try/catch with specific error types
- Log errors with context before throwing
- Avoid silent failures; provide user feedback

### Tailwind CSS

- Use `cn()` utility for conditional classes (combines clsx + tailwind-merge)
- Follow existing color scheme using CSS variables
- Use `shadcn/ui` component patterns (variants, slots)

### Component Patterns

```typescript
// Standard UI component structure
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function Component({ className }: Props) {
  return <Button className={cn(className)} />;
}
```

### File Structure

```
src/
├── components/ui/     # shadcn/ui components
├── lib/               # Utilities (utils.ts, API calls)
├── App.tsx            # Main app component
├── index.ts           # Entry point
└── index.css          # Global styles
```
