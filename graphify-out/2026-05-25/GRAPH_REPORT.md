# Graph Report - .  (2026-05-24)

## Corpus Check
- Corpus is ~1,574 words - fits in a single context window. You may not need a graph.

## Summary
- 101 nodes · 91 edges · 19 communities (9 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 2,200 input · 700 output

## Community Hubs (Navigation)
- [[_COMMUNITY_TypeScript Compiler Options|TypeScript Compiler Options]]
- [[_COMMUNITY_Project Frontend Dependencies|Project Frontend Dependencies]]
- [[_COMMUNITY_UI Components and Utilities|UI Components and Utilities]]
- [[_COMMUNITY_Shadcn Component Configuration|Shadcn Component Configuration]]
- [[_COMMUNITY_Development Build Dependencies|Development Build Dependencies]]
- [[_COMMUNITY_Project Metadata and Scripts|Project Metadata and Scripts]]
- [[_COMMUNITY_Path Import Aliases|Path Import Aliases]]
- [[_COMMUNITY_Tailwind Theme Configurations|Tailwind Theme Configurations]]
- [[_COMMUNITY_Storefront Landing Page Assets|Storefront Landing Page Assets]]
- [[_COMMUNITY_Agent Configuration Rules|Agent Configuration Rules]]
- [[_COMMUNITY_Next.js Framework Config|Next.js Framework Config]]
- [[_COMMUNITY_PostCSS Tooling Config|PostCSS Tooling Config]]
- [[_COMMUNITY_ESLint Quality Rules|ESLint Quality Rules]]
- [[_COMMUNITY_Graphify Knowledge Graph Rules|Graphify Knowledge Graph Rules]]
- [[_COMMUNITY_Getting Started Documentation|Getting Started Documentation]]
- [[_COMMUNITY_Vercel Deployment Documentation|Vercel Deployment Documentation]]
- [[_COMMUNITY_Generic File Asset|Generic File Asset]]
- [[_COMMUNITY_Globe Icon Asset|Globe Icon Asset]]
- [[_COMMUNITY_Browser Window Asset|Browser Window Asset]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `tailwind` - 6 edges
3. `aliases` - 6 edges
4. `scripts` - 5 edges
5. `cn()` - 5 edges
6. `Home()` - 3 edges
7. `Button()` - 3 edges
8. `paths` - 2 edges
9. `RootLayout()` - 2 edges
10. `buttonVariants` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --references--> `Next.js Brand Logo`  [EXTRACTED]
  src/app/page.tsx → public/next.svg
- `Home()` --references--> `Vercel Brand Logo`  [EXTRACTED]
  src/app/page.tsx → public/vercel.svg
- `CLAUDE.md Reference Link` --references--> `Next.js Custom Agent Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/layout.tsx → src/lib/utils.ts
- `Graphify Workflow` --conceptually_related_to--> `Graphify Rules`  [INFERRED]
  .agents/workflows/graphify.md → .agents/rules/graphify.md

## Communities (19 total, 10 thin omitted)

### Community 0 - "TypeScript Compiler Options"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 1 - "Project Frontend Dependencies"
Cohesion: 0.18
Nodes (11): dependencies, class-variance-authority, clsx, lucide-react, next, radix-ui, react, react-dom (+3 more)

### Community 2 - "UI Components and Utilities"
Cohesion: 0.27
Nodes (8): geistMono, geistSans, inter, metadata, RootLayout(), cn(), Button(), buttonVariants

### Community 3 - "Shadcn Component Configuration"
Cohesion: 0.20
Nodes (9): iconLibrary, menuAccent, menuColor, registries, rsc, rtl, $schema, style (+1 more)

### Community 4 - "Development Build Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 5 - "Project Metadata and Scripts"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 6 - "Path Import Aliases"
Cohesion: 0.33
Nodes (6): aliases, components, hooks, lib, ui, utils

### Community 7 - "Tailwind Theme Configurations"
Cohesion: 0.33
Nodes (6): tailwind, baseColor, config, css, cssVariables, prefix

### Community 8 - "Storefront Landing Page Assets"
Cohesion: 0.50
Nodes (3): Home(), Next.js Brand Logo, Vercel Brand Logo

## Knowledge Gaps
- **76 isolated node(s):** `name`, `version`, `private`, `dev`, `build` (+71 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Project Frontend Dependencies` to `Project Metadata and Scripts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Build Dependencies` to `Project Metadata and Scripts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._