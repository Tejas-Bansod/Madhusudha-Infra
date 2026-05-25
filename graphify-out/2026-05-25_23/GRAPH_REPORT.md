# Graph Report - Realestate  (2026-05-25)

## Corpus Check
- 84 files · ~22,901 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 566 nodes · 1004 edges · 51 communities (34 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_TypeScript Compiler Options|TypeScript Compiler Options]]
- [[_COMMUNITY_Project Frontend Dependencies|Project Frontend Dependencies]]
- [[_COMMUNITY_UI Components and Utilities|UI Components and Utilities]]
- [[_COMMUNITY_Shadcn Component Configuration|Shadcn Component Configuration]]
- [[_COMMUNITY_Development Build Dependencies|Development Build Dependencies]]
- [[_COMMUNITY_Project Metadata and Scripts|Project Metadata and Scripts]]
- [[_COMMUNITY_Community 6|Community 6]]
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
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 51|Community 51]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 251 edges
2. `Button()` - 20 edges
3. `compilerOptions` - 17 edges
4. `compilerOptions` - 16 edges
5. `tailwind` - 7 edges
6. `aliases` - 7 edges
7. `Input()` - 7 edges
8. `ScrollArea()` - 7 edges
9. `scripts` - 6 edges
10. `useTheme()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/layout.tsx → crm/src/lib/utils.ts
- `Home()` --references--> `Next.js Brand Logo`  [EXTRACTED]
  src/app/page.tsx → public/next.svg
- `Home()` --references--> `Vercel Brand Logo`  [EXTRACTED]
  src/app/page.tsx → public/vercel.svg
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  crm/src/app/layout.tsx → crm/src/lib/utils.ts
- `TasksPage()` --calls--> `cn()`  [EXTRACTED]
  crm/src/app/dashboard/tasks/page.tsx → crm/src/lib/utils.ts

## Communities (51 total, 17 thin omitted)

### Community 0 - "TypeScript Compiler Options"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 1 - "Project Frontend Dependencies"
Cohesion: 0.05
Nodes (42): dependencies, @base-ui/react, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable (+34 more)

### Community 2 - "UI Components and Utilities"
Cohesion: 0.11
Nodes (13): geistMono, geistSans, inter, metadata, plusJakartaSans, RootLayout(), geistMono, geistSans (+5 more)

### Community 3 - "Shadcn Component Configuration"
Cohesion: 0.13
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "Development Build Dependencies"
Cohesion: 0.15
Nodes (9): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogMedia(), AlertDialogOverlay() (+1 more)

### Community 5 - "Project Metadata and Scripts"
Cohesion: 0.07
Nodes (41): priorityColorMap, typeColorMap, typeIconMap, featuredListings, overviewData, recentLeads, revenueData, Task (+33 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (25): Column(), columns, dropAnimation, measuring, SortableTask(), TaskBoard(), TaskCard(), TaskTable() (+17 more)

### Community 7 - "Tailwind Theme Configurations"
Cohesion: 0.18
Nodes (8): SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 8 - "Storefront Landing Page Assets"
Cohesion: 0.50
Nodes (3): Home(), Next.js Brand Logo, Vercel Brand Logo

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (21): dependencies, next, react, react-dom, devDependencies, eslint, eslint-config-next, tailwindcss (+13 more)

### Community 21 - "Community 21"
Cohesion: 0.09
Nodes (23): Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator() (+15 more)

### Community 22 - "Community 22"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (23): cn(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), ComboboxChip(), ComboboxChips(), ComboboxChipsInput() (+15 more)

### Community 24 - "Community 24"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 25 - "Community 25"
Cohesion: 0.12
Nodes (10): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.19
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 27 - "Community 27"
Cohesion: 0.25
Nodes (7): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (10): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (7): Pagination(), PaginationContent(), PaginationEllipsis(), PaginationLink(), PaginationLinkProps, PaginationNext(), PaginationPrevious()

### Community 30 - "Community 30"
Cohesion: 0.05
Nodes (35): appsItems, Sidebar(), SidebarProps, upperNavItems, Theme, ThemeContext, ThemeContextType, ThemeProvider() (+27 more)

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (4): PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (5): Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants

### Community 34 - "Community 34"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 35 - "Community 35"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 36 - "Community 36"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 51 - "Community 51"
Cohesion: 0.40
Nodes (3): InputOTP(), InputOTPGroup(), InputOTPSlot()

## Knowledge Gaps
- **157 isolated node(s):** `name`, `version`, `private`, `dev`, `build` (+152 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 23` to `UI Components and Utilities`, `Development Build Dependencies`, `Project Metadata and Scripts`, `Community 6`, `Tailwind Theme Configurations`, `Community 19`, `Community 21`, `Community 24`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 35`, `Community 51`?**
  _High betweenness centrality (0.377) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 6` to `Development Build Dependencies`, `Project Metadata and Scripts`, `Community 21`, `Community 23`, `Community 26`, `Community 29`, `Community 30`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _160 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.10476190476190476 - nodes in this community are weakly interconnected._
- **Should `Project Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0507399577167019 - nodes in this community are weakly interconnected._
- **Should `UI Components and Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Shadcn Component Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._