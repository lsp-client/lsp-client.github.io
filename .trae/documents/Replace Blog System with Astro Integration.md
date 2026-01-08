# Plan: Replace Blog System with Astro

This plan involves migrating the current custom React SPA (Single Page Application) structure to an Astro-based architecture. This will replace the existing manual routing and Velite content system with Astro's built-in file-based routing and Content Collections, providing a more robust and performant foundation for both the blog and the landing page.

## 1. Setup & Configuration
- [ ] **Install Dependencies**: Install `astro`, `@astrojs/react`, `@astrojs/tailwind` and remove incompatible/unused dependencies (like `velite`, `bun-plugin-tailwind` for build script).
- [ ] **Configure Astro**: Create `astro.config.mjs` to enable React and Tailwind integrations.
- [ ] **Setup TypeScript**: Update `tsconfig.json` to extend Astro's strict configuration.

## 2. Content Migration
- [ ] **Configure Content Collections**: Create `src/content/config.ts` to define the `blog` collection schema, replacing the `velite.config.ts`.
- [ ] **Verify Content**: Ensure existing markdown files in `src/content/blog` are compatible (Astro uses `frontmatter` which is standard).

## 3. Layout & Component Migration
- [ ] **Create Base Layout**: Create `src/layouts/Layout.astro` to handle the global HTML structure (`<head>`, `<body>`, `Header`, `Footer`), replacing `src/index.html` and `src/App.tsx` layout logic.
- [ ] **Refactor Navigation**: Update `Header` and `Footer` to use standard `<a>` tags (or Astro's `<ClientRouter />` for SPA-feel) instead of the custom `AppLink` / `useLocation` hook.

## 4. Page Creation
- [ ] **Migrate Landing Page**: Create `src/pages/index.astro`. Import and render existing React sections (`Hero`, `Installation`, etc.) using `client:load` or `client:visible` where interactivity is needed.
- [ ] **Migrate Blog Index**: Create `src/pages/blog/index.astro`. Use `getCollection('blog')` to fetch posts and render the list.
- [ ] **Migrate Blog Post**: Create `src/pages/blog/[...slug].astro`. Use `getCollection` for static paths and render individual posts using Astro's content rendering.

## 5. Cleanup & Verification
- [ ] **Remove Legacy Code**: Delete `src/App.tsx`, `src/frontend.tsx`, `src/index.html`, `src/lib/router.ts`, `build.ts`, and `velite.config.ts`.
- [ ] **Update Scripts**: Update `package.json` scripts to use `astro dev`, `astro build`, etc.
- [ ] **Verify**: Run the dev server and check that the landing page and blog work correctly.
