# Graph Report - Realestate  (2026-05-28)

## Corpus Check
- 150 files · ~67,196 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 946 nodes · 2102 edges · 79 communities (56 shown, 23 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2dbf3e6b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_TypeScript Compiler Options|TypeScript Compiler Options]]
- [[_COMMUNITY_Project Frontend Dependencies|Project Frontend Dependencies]]
- [[_COMMUNITY_UI Components and Utilities|UI Components and Utilities]]
- [[_COMMUNITY_Shadcn Component Configuration|Shadcn Component Configuration]]
- [[_COMMUNITY_Development Build Dependencies|Development Build Dependencies]]
- [[_COMMUNITY_Project Metadata and Scripts|Project Metadata and Scripts]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
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
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 299 edges
2. `Button()` - 53 edges
3. `Badge()` - 33 edges
4. `Input()` - 20 edges
5. `Avatar()` - 19 edges
6. `AvatarImage()` - 19 edges
7. `AvatarFallback()` - 19 edges
8. `Card()` - 18 edges
9. `CardContent()` - 18 edges
10. `compilerOptions` - 17 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/layout.tsx → crm/src/lib/utils.ts
- `Home()` --references--> `Next.js Brand Logo`  [EXTRACTED]
  src/app/page.tsx → public/next.svg
- `Home()` --references--> `Vercel Brand Logo`  [EXTRACTED]
  src/app/page.tsx → public/vercel.svg
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  crm/src/app/layout.tsx → crm/src/lib/utils.ts
- `AgentsPage()` --calls--> `cn()`  [EXTRACTED]
  crm/src/app/dashboard/operations/agents/page.tsx → crm/src/lib/utils.ts

## Communities (79 total, 23 thin omitted)

### Community 0 - "TypeScript Compiler Options"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 1 - "Project Frontend Dependencies"
Cohesion: 0.05
Nodes (44): dependencies, @base-ui/react, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable (+36 more)

### Community 2 - "UI Components and Utilities"
Cohesion: 0.08
Nodes (17): geistMono, geistSans, inter, metadata, outfit, plusJakartaSans, RootLayout(), geistMono (+9 more)

### Community 3 - "Shadcn Component Configuration"
Cohesion: 0.13
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "Development Build Dependencies"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 5 - "Project Metadata and Scripts"
Cohesion: 0.14
Nodes (13): Column(), columns, dropAnimation, measuring, SortableTask(), TaskBoard(), TaskCard(), TaskTable() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (14): EmailComposer(), EmailLogEntry, EmailLogTable(), DEFAULT_EMAIL_STATS, EmailStats(), EmailStatsProps, Stat, maxSent (+6 more)

### Community 8 - "Storefront Landing Page Assets"
Cohesion: 0.50
Nodes (3): Home(), Next.js Brand Logo, Vercel Brand Logo

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (12): ListingCard(), ListingCardProps, ListingMapHudProps, COMMON_AMENITIES, PropertyForm(), PropertyFormProps, LISTING_STATUSES, ListingStatus (+4 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (21): dependencies, next, react, react-dom, devDependencies, eslint, eslint-config-next, tailwindcss (+13 more)

### Community 21 - "Community 21"
Cohesion: 0.16
Nodes (14): CustomerCard(), CustomerDrawer(), CustomersPage(), getProgressColor(), getProgressPercentage(), StatCard(), Customer, CUSTOMER_STATUSES (+6 more)

### Community 22 - "Community 22"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 23 - "Community 23"
Cohesion: 0.09
Nodes (22): ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup(), ComboboxInput() (+14 more)

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
Cohesion: 0.08
Nodes (30): LeadsPage(), StatCard(), cn(), PropertyListingsPage(), StatCard(), TemplatesPage(), Accordion(), AccordionContent() (+22 more)

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (10): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.18
Nodes (12): DocumentList(), DocumentListProps, FileItem, invoices, NotificationsDropdown(), TopbarProps, DropdownMenu(), DropdownMenuContent() (+4 more)

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (16): ListingMapHud(), Theme, ThemeContext, ThemeContextType, ThemeProvider(), useTheme(), Topbar(), DashboardContent() (+8 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 33 - "Community 33"
Cohesion: 0.06
Nodes (33): dependencies, class-variance-authority, clsx, embla-carousel-autoplay, embla-carousel-react, framer-motion, lucide-react, next (+25 more)

### Community 34 - "Community 34"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 35 - "Community 35"
Cohesion: 0.06
Nodes (29): AgentDetailsSheetProps, NavItem, navItems, SocialIcons, dropAnimation, KanbanColumn(), LeadCard(), LeadKanban (+21 more)

### Community 36 - "Community 36"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (7): Pagination(), PaginationContent(), PaginationEllipsis(), PaginationLink(), PaginationLinkProps, PaginationNext(), PaginationPrevious()

### Community 51 - "Community 51"
Cohesion: 0.08
Nodes (4): DropdownMenuRadioItem(), DropdownMenuShortcut(), DropdownMenuSubContent(), DropdownMenuSubTrigger()

### Community 52 - "Community 52"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (13): priorityColorMap, typeColorMap, typeIconMap, visits, Task, TaskPriority, TaskType, Avatar() (+5 more)

### Community 54 - "Community 54"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 55 - "Community 55"
Cohesion: 0.27
Nodes (11): AgentLeaderboardProps, ListingTable(), ListingTableProps, Table(), TableBody(), TableCaption(), TableCell(), TableFooter() (+3 more)

### Community 56 - "Community 56"
Cohesion: 0.18
Nodes (13): LeadTable(), priorityConfig, SortDir, SortField, StageBadge(), appsItems, Sidebar(), SidebarProps (+5 more)

### Community 57 - "Community 57"
Cohesion: 0.06
Nodes (54): Attachment, SUGGESTIONS, TEMPLATES, EmailLogTableProps, EmailStatus, STATUS_META, FileUploadModal(), InvoiceList() (+46 more)

### Community 58 - "Community 58"
Cohesion: 0.33
Nodes (7): DocumentStats(), Card(), CardAction(), CardContent(), CardDescription(), CardHeader(), CardTitle()

### Community 59 - "Community 59"
Cohesion: 0.40
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 60 - "Community 60"
Cohesion: 0.27
Nodes (8): AgentsPage(), AgentCard(), AgentCardProps, AgentDetailsSheet(), AgentLeaderboard(), Agent, mockAgents, CardFooter()

### Community 65 - "Community 65"
Cohesion: 0.13
Nodes (5): areas, VIDEOS, steps, stats, testimonials

### Community 67 - "Community 67"
Cohesion: 0.24
Nodes (7): DocumentGrid(), DocumentGridProps, FileItem, Badge(), badgeVariants, Badge(), badgeVariants

### Community 69 - "Community 69"
Cohesion: 0.22
Nodes (5): featuredListings, overviewData, recentLeads, revenueData, Progress()

### Community 70 - "Community 70"
Cohesion: 0.20
Nodes (9): Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator() (+1 more)

### Community 71 - "Community 71"
Cohesion: 0.25
Nodes (7): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 72 - "Community 72"
Cohesion: 0.40
Nodes (5): Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants

### Community 73 - "Community 73"
Cohesion: 0.29
Nodes (3): features, Button(), buttonVariants

### Community 74 - "Community 74"
Cohesion: 0.33
Nodes (4): propertyTypes, quickLinks, socials, SocialSVGs

### Community 75 - "Community 75"
Cohesion: 0.40
Nodes (3): filters, FilterType, properties

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (3): InputOTP(), InputOTPGroup(), InputOTPSlot()

## Knowledge Gaps
- **303 isolated node(s):** `name`, `version`, `private`, `dev`, `build` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 27` to `UI Components and Utilities`, `Development Build Dependencies`, `Project Metadata and Scripts`, `Community 6`, `Community 7`, `Community 19`, `Community 21`, `Community 23`, `Community 24`, `Community 25`, `Community 26`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 35`, `Community 37`, `Community 51`, `Community 53`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 60`, `Community 61`, `Community 67`, `Community 68`, `Community 69`, `Community 70`, `Community 71`, `Community 72`, `Community 73`, `Community 76`, `Community 77`, `Community 78`?**
  _High betweenness centrality (0.323) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 57` to `UI Components and Utilities`, `Project Metadata and Scripts`, `Community 7`, `Community 19`, `Community 21`, `Community 23`, `Community 26`, `Community 27`, `Community 29`, `Community 30`, `Community 35`, `Community 37`, `Community 53`, `Community 55`, `Community 56`, `Community 60`, `Community 67`, `Community 68`, `Community 69`, `Community 73`, `Community 75`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `Badge()` connect `Community 67` to `Community 35`, `Community 69`, `Community 7`, `Community 75`, `Community 19`, `Community 53`, `Community 21`, `Community 55`, `Community 56`, `Community 57`, `Community 27`, `Community 60`, `Community 29`, `Community 30`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _306 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.10476190476190476 - nodes in this community are weakly interconnected._
- **Should `Project Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04830917874396135 - nodes in this community are weakly interconnected._
- **Should `UI Components and Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._