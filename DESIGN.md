# CodeMap — Design System

**Version:** 1.0
**Last updated:** 2026-05-06
**Memorable thing:** The architecture breathes.

---

## Design Philosophy

CodeMap visualizes code. Code is abstract. The design makes it tangible.

Three principles:
1. **Alive** — everything breathes, flows, moves. Static = dead. The architecture is alive.
2. **Guided** — the user is never lost. Every view has a clear hierarchy. The tour is a teacher.
3. **Deep** — surface beauty, real power underneath. Click anything, learn everything.

---

## Color System

### Dark Mode (Default)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0A0A0F` | Page background. Near-black with blue tint. Not pure black. |
| `--bg` | `#12121A` | Canvas background. Where the graph lives. |
| `--bg-elevated` | `#1A1A25` | Panels, sidebar, cards. One step up. |
| `--bg-hover` | `#222233` | Hover state on elevated surfaces. |
| `--text` | `#E8E8F0` | Primary text. Off-white, slightly blue. |
| `--text-muted` | `#6B6B80` | Secondary text, descriptions, labels. |
| `--text-dim` | `#3D3D50` | Disabled, hints, watermarks. |
| `--border` | `#2A2A3A` | Borders, dividers. Subtle. |
| `--border-active` | `#3A3A55` | Active/focused borders. |

### Accent Colors (Semantic)

| Token | Value | Usage |
|-------|-------|-------|
| `--accent-primary` | `#6C5CE7` | Primary accent. Electric purple. CTAs, active states, highlights. |
| `--accent-glow` | `#6C5CE733` | Glow around primary elements. Same hue, low alpha. |
| `--accent-secondary` | `#00D4AA` | Secondary accent. Mint/teal. Success, data flow, connections. |
| `--accent-route` | `#FF6B6B` | Route endpoints. Coral red. API routes, pages. |
| `--accent-data` | `#FFD93D` | Data layer. Warm yellow. Database, migrations, models. |
| `--accent-service` | `#4ECDC4` | External services. Teal. Stripe, AI providers, auth. |
| `--accent-component` | `#A8E6CF` | UI components. Soft green. React/Vue/Svelte. |
| `--accent-flow` | `#FF8A5C` | Data flow animation. Orange. Particles, animated paths. |

### Node Type Colors

Each architecture element type gets a distinct color so you can spot patterns at a glance:

| Type | Color | Example |
|------|-------|---------|
| Page / Entry | `#FF6B6B` | `page.tsx`, `index.ts` |
| API Route | `#FF8A5C` | `route.ts` |
| Component | `#A8E6CF` | `ProjectView.tsx` |
| Library / Util | `#74B9FF` | `generate-steps.ts` |
| Database Table | `#FFD93D` | `projects`, `steps` |
| External Service | `#4ECDC4` | `OpenAI`, `Supabase` |
| Config | `#A29BFE` | `next.config.ts` |
| Middleware | `#FD79A8` | `middleware.ts` |

### Light Mode

| Token | Value |
|-------|-------|
| `--bg-deep` | `#F8F8FC` |
| `--bg` | `#FFFFFF` |
| `--bg-elevated` | `#F0F0F8` |
| `--bg-hover` | `#E8E8F0` |
| `--text` | `#1A1A2E` |
| `--text-muted` | `#6B6B80` |
| `--border` | `#E0E0EA` |

Light mode uses the same accent colors but slightly desaturated for contrast balance.

---

## Typography

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| Display / Hero | Space Grotesk | system-ui, sans-serif | 700 |
| Headings | Space Grotesk | system-ui, sans-serif | 600 |
| Body | Inter | -apple-system, sans-serif | 400, 500 |
| Code / Mono | JetBrains Mono | monospace | 400 |
| Labels | Inter | sans-serif | 600, uppercase tracking |

### Scale

| Element | Size | Weight |
|---------|------|--------|
| Hero (welcome screen) | 3rem (48px) | 700, Space Grotesk |
| View title | 1.5rem (24px) | 600, Space Grotesk |
| Node label | 0.8rem (13px) | 500, Inter |
| Body text | 0.9rem (14px) | 400, Inter |
| Code preview | 0.8rem (13px) | 400, JetBrains Mono |
| Badge / tag | 0.65rem (11px) | 600, Inter, uppercase |
| Tour narration | 1rem (16px) | 400, Inter |

---

## Spacing

Base unit: **4px**. All spacing is a multiple of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Inline spacing, icon gaps |
| `--space-3` | 12px | Small padding |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 24px | Section gaps |
| `--space-6` | 32px | Panel padding |
| `--space-7` | 48px | Major sections |
| `--space-8` | 64px | Hero spacing |

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│  LOGO    [Views: Overview|Routes|Flow|DB|...]  ⚙️ 🔍 │  ← Top bar
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│  Tour    │                                          │
│  Steps   │         GRAPH CANVAS                     │
│  List    │    (React Flow — interactive graph)       │
│          │                                          │
│  or      │                                          │
│          │                                          │
│  Detail  │                                          │
│  Panel   │                                          │
│          ├──────────────────────────────────────────┤
│          │  Tour Narration / Code Preview / Info     │  ← Bottom panel
└──────────┴──────────────────────────────────────────┘
```

- **Left sidebar** (280px): Tour steps list OR detail panel for selected node
- **Center canvas**: React Flow graph. Takes all remaining space.
- **Bottom panel** (collapsible, 200px): Tour narration text, code preview, context info
- **Top bar** (48px): Logo, view tabs, search, settings

### Responsive
- Desktop (1200px+): Full layout as above
- Tablet (768-1199px): Sidebar collapses to overlay, bottom panel stacks
- Mobile (<768px): Full-screen canvas, tabs at bottom, tap to inspect

---

## Components

### Node (on canvas)

```
┌─────────────────────────┐
│ 🔴 Page: Landing        │  ← Type icon + label
│ src/app/page.tsx         │  ← File path (muted)
│ routes: /                │  ← Context line
└─────────────────────────┘
```

States: default, selected (glow), active-in-tour (pulse + glow), dimmed, hover (connected nodes glow)

Size: ~200x80px default, scales with zoom

### Edge (on canvas)

- **Default**: thin line, `--border` color, subtle
- **Active in tour**: animated dashed line with `--accent-flow` color, particles moving along it
- **Hover**: connected edges glow, direction arrows appear
- **Data flow view**: thick animated gradient showing data direction

### Tour Step Card (left sidebar)

```
┌─────────────────────────┐
│ 3. API Layer     ← DONE  │
│ All endpoints & methods  │
├─────────────────────────┤
│ 4. Data Model   ← ACTIVE│  ← Highlighted
│ Tables, relations...     │
├─────────────────────────┤
│ 5. Core Logic            │
│ Business logic...        │
└─────────────────────────┘
```

### Narration Panel (bottom)

```
┌─────────────────────────────────────────────────────┐
│ Step 4 of 11: Data Model                            │
│                                                     │
│ Stepwise uses 3 core tables: projects, steps, and   │
│ step_conversations. Profiles track user metadata.   │
│                                                     │
│ [code snippet preview]                              │
│                                                     │
│ ← Previous          Next →                          │
└─────────────────────────────────────────────────────┘
```

### Welcome Screen (before tour starts)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                   ◆ CodeMap                         │
│                                                     │
│            Understand any codebase                  │
│            in 5 minutes.                            │
│                                                     │
│         [▶ Start Guided Tour]                       │
│         [🔍 Explore Freely]                         │
│                                                     │
│     137 files • 22 routes • 8 tables • 3 services  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Animation

### Principles
- **Everything animates, nothing jumps.** Position, opacity, scale — always transition.
- **Physics-based when possible.** Spring animations for nodes, not linear.
- **Respect prefers-reduced-motion.** All animations disable gracefully.

### Specifics

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Node appear | Scale 0 → 1 + fade in | 300ms | spring |
| Node selected | Glow pulse (scale 1 → 1.02 → 1) | 2000ms loop | ease-in-out |
| Edge active | Dashed line offset animation | continuous | linear |
| Data flow particle | Circle traveling along edge path | 1.5s per edge | ease-in-out |
| Tour step transition | Camera pan + zoom + nodes highlight | 600ms | cubic-bezier |
| Panel open/close | Slide + fade | 200ms | ease-out |
| Tour narration text | Typewriter effect (optional) | varies | linear |
| Welcome screen | Staggered fade in (logo → text → buttons → stats) | 800ms total | ease-out |
| Celebration | Particle burst from center | 2000ms | gravity |

### The "Breathing" Effect

All visible nodes have a very subtle scale oscillation (1.0 → 1.005 → 1.0, 4s loop). This makes the graph feel alive even when idle. Only active when not in reduced-motion mode.

---

## Icons

Use Lucide React (already React-compatible, consistent, MIT license).

| Use | Icon |
|-----|------|
| Page | `FileCode` |
| API Route | `Route` |
| Component | `Component` |
| Database | `Database` |
| Service | `Cloud` |
| Config | `Settings` |
| Middleware | `Shield` |
| File | `File` |
| Tour play | `Play` |
| Tour pause | `Pause` |
| Next step | `ChevronRight` |
| Previous step | `ChevronLeft` |
| Search | `Search` |
| Settings | `Sliders` |
| Explore | `Compass` |

---

## Sound Design (Optional, Off By Default)

| Event | Sound | Style |
|-------|-------|-------|
| Tour step advance | Soft click | Minimal, not annoying |
| Node select | Subtle pop | Satisfying, quick |
| Tour complete | Chime | Short celebration |
| View switch | Whoosh | Soft transition |
| Error | Low tone | Brief, not alarming |

Use Web Audio API. No external audio files. Generate tones programmatically.

---

## Motion Tokens

```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 600ms;
--duration-breathing: 4000ms;

--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

---

## Copy & Voice

### Tone
Direct, educational, encouraging. A friendly senior dev explaining the architecture over coffee.

### Micro-copy

| Element | Copy |
|---------|------|
| Welcome heading | Understand any codebase in 5 minutes. |
| Tour CTA | Start Guided Tour |
| Explore CTA | Explore Freely |
| Tour step format | "Step N: Title" |
| Tour complete | You now understand this codebase. 🎉 |
| Empty state | Drop a folder or run `npx codemap` to begin. |
| Loading | Mapping your architecture... |
| Node count | "137 nodes • 42 connections" |

---

## Files & Assets

### Fonts
- Google Fonts: Space Grotesk, Inter, JetBrains Mono
- Load via `<link>` in index.html with `display=swap`
- Preconnect to fonts.googleapis.com and fonts.gstatic.com

### Logo
- ◆ (diamond) + "CodeMap" in Space Grotesk
- SVG, works at any size
- Animated version for loading: diamond rotates slowly

---

*This document is the source of truth for all UI implementation. If code deviates from this doc, the doc wins.*
