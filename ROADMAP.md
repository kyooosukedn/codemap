# CodeMap — Roadmap

**Updated:** 2026-05-06
**Status:** Pre-alpha

---

## Mission

Build the tool we wished existed when we opened an unfamiliar codebase for the first time.

## Guiding Principle

Ship one feature at a time. Each feature is one GitHub issue, one PR, one thing you can see and touch. No "Phase 1" mega-PRs.

---

## Now (v0.1 — "It Scans")

The scanner reads a codebase and produces valid JSON. The visualizer shows anything.

| # | Feature | Status |
|---|---------|--------|
| 1 | Monorepo scaffold | 🔲 |
| 2 | Scanner types (the contract) | 🔲 |
| 3 | FileTreeAnalyzer | 🔲 |
| 4 | Scanner writes codemap.json | 🔲 |
| 5 | Visualizer scaffold (Vite + React) | 🔲 |
| 6 | GraphCanvas (React Flow wrapper) | 🔲 |
| 7 | DefaultNode component | 🔲 |
| 8 | DataLoader (reads codemap.json) | 🔲 |
| 9 | SystemOverview view | 🔲 |
| 10 | TopBar + Sidebar layout shell | 🔲 |
| 11 | CLI: `npx codemap` | 🔲 |

**Deliverable:** `npx codemap ./any-project` opens a browser showing a graph of files.

---

## Next (v0.2 — "It Teaches")

The guided tour walks you through architecture step by step.

| # | Feature | Status |
|---|---------|--------|
| 12 | TourEngine controller | 🔲 |
| 13 | Tour sidebar (step list) | 🔲 |
| 14 | Narration panel | 🔲 |
| 15 | Welcome screen | 🔲 |
| 16 | Tour step transitions (camera + highlights) | 🔲 |
| 17 | Animated edges (flowing dashes) | 🔲 |
| 18 | Breathing nodes (subtle pulse) | 🔲 |

**Deliverable:** Open CodeMap → click "Start Tour" → animated walkthrough of your codebase.

---

## Then (v0.3 — "It Knows More")

More analyzers, more views, more frameworks.

| # | Feature | Status |
|---|---------|--------|
| 19 | ImportGraphAnalyzer | 🔲 |
| 20 | NextJsRoutesAnalyzer | 🔲 |
| 21 | RouteMapView | 🔲 |
| 22 | SqlMigrationAnalyzer | 🔲 |
| 23 | DatabaseSchemaView (ER diagram) | 🔲 |
| 24 | ReactComponentAnalyzer | 🔲 |
| 25 | ComponentTreeView | 🔲 |
| 26 | ServiceDetectorAnalyzer | 🔲 |
| 27 | ServiceMapView | 🔲 |
| 28 | DataFlowView (animated request lifecycle) | 🔲 |
| 29 | TourGeneratorAnalyzer (auto-generate tour) | 🔲 |
| 30 | Search across all nodes | 🔲 |
| 31 | Keyboard shortcuts | 🔲 |

**Deliverable:** All 7 views working. Tour auto-generated from scanner output.

---

## Later (v0.4 — "It Delights")

Polish, sound, share, scale.

| # | Feature | Status |
|---|---------|--------|
| 32 | Celebration animation (tour complete) | 🔲 |
| 33 | Sound effects (optional) | 🔲 |
| 34 | Light mode | 🔲 |
| 35 | Export/share tour as URL | 🔲 |
| 36 | ExpressRoutesAnalyzer | 🔲 |
| 37 | FastApiRoutesAnalyzer | 🔲 |
| 38 | PrismaSchemaAnalyzer | 🔲 |
| 39 | VueComponentAnalyzer | 🔲 |
| 40 | FileExplorerView | 🔲 |
| 41 | Large codebase optimization (virtualization) | 🔲 |
| 42 | GitHub Action (scan on push) | 🔲 |

---

## Milestones

- **v0.1** — "It Scans" — scanner + visualizer + CLI working end to end
- **v0.2** — "It Teaches" — guided tour engine fully functional
- **v0.3** — "It Knows More" — all 7 views, all analyzers
- **v0.4** — "It Delights" — polish, sound, share, multi-framework
- **v1.0** — "It's Ready" — stable API, docs, community contribution guide
