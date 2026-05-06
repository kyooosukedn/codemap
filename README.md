# ◆ CodeMap

**Understand any codebase in 5 minutes.**

CodeMap scans your project and produces an interactive, animated, step-by-step architecture walkthrough. Not a static diagram. Not a dependency graph. A living guided tour.

![dark mode](design-preview.html)

## Quick Start

```bash
# Scan your project and open the visualizer
npx codemap ./path/to/your/project

# Or scan the current directory
npx codemap
```

## How It Works

```
You run: npx codemap ./my-project
         ↓
Scanner reads your codebase (AST parsing, import analysis, route detection)
         ↓
Generates codemap.json (the blueprint — pure data, no code)
         ↓
Opens browser → interactive React app loads the blueprint
         ↓
Guided animated tour walks you through the architecture step by step
         ↓
Free explore mode when you're done with the tour
```

## Guided Tour

The killer feature. Press "Start Tour" and CodeMap walks you through:

1. **Welcome** — project overview, tech stack, purpose
2. **Entry Points** — where everything starts
3. **Auth Flow** — login → session → protected routes
4. **API Layer** — endpoints, handlers, what they call
5. **Data Model** — tables, relations, migrations
6. **Core Logic** — business logic, data processing
7. **External Services** — AI providers, payments, storage
8. **Component Tree** — UI component hierarchy
9. **Data Flow** — full request lifecycle animation
10. **You Made It** — summary, stats, celebration 🎉

Each step animates. Nodes light up. Connections flow. You see the architecture breathe.

## Views

| View | Shows |
|------|-------|
| System Overview | High-level boxes with animated connections |
| Route Map | Every API endpoint + page route |
| Data Flow | Animated request lifecycle |
| Database Schema | ER diagram from migrations/ORM |
| Component Tree | React/Vue/Svelte hierarchy |
| Service Map | External services and when they're called |
| File Explorer | Interactive tree with metadata |

## Architecture

CodeMap is a monorepo with three packages:

- **`@codemap/scanner`** — analyzes codebases, outputs `codemap.json`
- **`@codemap/visualizer`** — React app that renders the blueprint
- **`@codemap/cli`** — `npx codemap` entry point

The `codemap.json` is the entire contract between scanner and visualizer. They never speak directly. This means:

- The scanner can be used in CI pipelines without the visualizer
- The visualizer can load hand-written or modified blueprints
- Both can be versioned independently

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full design.

## Status

**Pre-alpha.** Architecture and design are locked. Implementation starting.

- [x] PRD
- [x] Design system
- [x] Architecture
- [ ] Scanner (Phase 1: file tree, imports, Next.js routes)
- [ ] Visualizer (Phase 1: system overview, tour engine)
- [ ] CLI
- [ ] Community analyzer plugin system
- [ ] Framework support beyond Next.js

## Contributing

Not yet — but soon. Star the repo and watch for updates.

## License

MIT
