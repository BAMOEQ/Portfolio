# Projects Page Redesign — Design

**Date:** 2026-06-10
**Branch:** ui-redesign
**File(s) touched:** `src/pages/Projects.jsx`, `src/styles/Projects.css`, new `src/components/ProjectCarousel.jsx` (+ styles), `package.json`, `.gitignore`

## Goal

Replace the current two-stacked-section Projects page with a single split section: Interactive Tools on the left, an interactive single-card carousel of portfolio projects on the right. Technologies render as brand-colored logo chips instead of plain text.

## Current State

`src/pages/Projects.jsx` renders three blocks:
1. `.Interactive-Projects` — heading + tab nav + active tool (CSVReader / PasswordDashboard). Full width.
2. `.regular-projects-section` — a `.projects-grid` of 5 project cards (video/image, title, description, tech text badges, status badge, GitHub link).
3. `.projects-footer` — "More projects coming soon" + View All on GitHub link.

Notes:
- `react-icons` is **not** installed.
- `src/components/ProjectCard.jsx` is a minimal stub (no video/array handling, references a `styles/components/ProjectCard.css`) and is **not** used by Projects.jsx. It will be left untouched; the carousel uses its own card markup.
- Styling uses CSS variables (`--brand`, `--surface`, `--text`, etc.), glassmorphism (`backdrop-filter`), and existing keyframes (`fadeInUp`, `shimmer`).

## Target Layout

```
┌─────────────────────────────────────────────────────────────┐
│  (page heading / intro — kept)                               │
├───────────────────────────────┬─────────────────────────────┤
│  🛠️ Interactive Tools  (~60%) │  💼 Portfolio  (~40%)        │
│  [📊 CSV] [🔐 Password] tabs   │  Portfolio · 1 / 5           │
│  ┌───────────────────────────┐ │  ┌─────────────────────────┐│
│  │  active tool renders here │ │  │ video/image  [Completed]││
│  │  (CSVReader / Password)   │ │  │ Title                   ││
│  └───────────────────────────┘ │  │ description             ││
│                                │  │ [logo][logo][logo] tech ││
│                                │  │ 📂 View Code            ││
│                                │  │ ‹  • • • • •  ›          ││
│                                │  └─────────────────────────┘│
├───────────────────────────────┴─────────────────────────────┤
│  More projects coming soon!  ·  View All on GitHub →         │
└─────────────────────────────────────────────────────────────┘
```

- Split via CSS grid `grid-template-columns: 1.5fr 1fr` (~60/40), `align-items: stretch` so both panels share height.
- The old `.regular-projects-section` grid is **removed**.
- Footer kept as-is.

## Components

### `Projects.jsx` (modified)
- Keeps `interactiveProjects` data + `activeTab` state + tab/tool rendering (left panel). The tool-display logic is unchanged; it just moves into the left column of the split.
- Keeps the `projects` array (5 projects) and `getStatusBadge`, but instead of mapping into a grid, passes the array to `<ProjectCarousel projects={projects} />` in the right column.
- Removes the `.regular-projects-section` grid markup.

### `ProjectCarousel.jsx` (new)
- **Props:** `projects` (array of the existing project objects).
- **State:** `currentIndex` (0-based).
- **Renders one project at a time:**
  - Media: reuse the existing video/image/array logic (Array → first element; `.mp4` → `<video controls>`; else `<img>`; else placeholder). Status badge overlaid top-right.
  - Title, description.
  - Tech chips via `<TechBadge tech={...} />` (see below).
  - GitHub link (and live link if present).
  - Counter "Portfolio · {index+1} / {length}".
  - Nav row: prev `‹` arrow, clickable dot indicators (active dot elongated), next `›` arrow.
- **Navigation methods:** arrow buttons, clickable dots, touch swipe (track `touchstart`/`touchend` X delta), and `←`/`→` keys (keydown listener active while the carousel is focused/mounted).
- **No auto-advance** — cards contain videos; auto-rotation would interrupt playback. Wrapping at ends (last → first) is allowed.

### `TechBadge.jsx` (new, small — or inline helper in carousel)
- Maps a tech name → a react-icons component via a lookup table, rendered in **brand colors** + the tech name.
- **Lookup** (Simple Icons `Si*` / Devicons `Di*` from `react-icons`):
  - React → `SiReact`, TypeScript → `SiTypescript`, MongoDB → `SiMongodb`, Flask → `SiFlask`, FastAPI → `SiFastapi`, Docker → `SiDocker`, Python → `SiPython`, Pandas → `SiPandas`, scikit-learn → `SiScikitlearn`, Java → `DiJava` (or `FaJava`), JWT → `SiJsonwebtokens`.
  - **Fallback** (bcrypt, Machine Learning, OOP, UML, and any unmapped tech): a generic icon (e.g. `FiTag` / `FiCpu`) tinted with `--brand`, still shown with the tech name.
- Each chip: `display:inline-flex`, icon + label, themed chip background consistent with current `.tech-badge` shape.

## Dependencies

- Add `react-icons` to `package.json` (`npm install react-icons`).

## Styling

- New classes in `Projects.css` (or a dedicated `ProjectCarousel.css`): `.projects-split`, `.tools-panel`, `.carousel-panel`, `.carousel-media`, `.carousel-nav`, `.carousel-arrow`, `.carousel-dots`, `.carousel-dot(.active)`, `.tech-chip`.
- Reuse existing tokens (`--brand`, `--surface`, `--border`, `--shadow`, gradients) and existing `fadeInUp` for slide transitions.
- Tech logos render in brand colors (each `Si*` icon accepts a `color`/`style` prop; React's official cyan, Docker blue, etc.). Fallback icons use `var(--brand)`.

## Responsive

- `@media (max-width: 768px)`: `.projects-split` collapses to a single column — tools panel on top, carousel below. Matches how other sections already stack. Carousel arrows/dots remain; swipe is the primary mobile interaction.

## Out of Scope

- No changes to CSVReader / PasswordDashboard internals.
- No changes to the unused `ProjectCard.jsx` stub.
- No new project data; same 5 projects.
- No auto-play, no light/dark per-logo recoloring (brand colors used in both themes).

## Housekeeping

- Add `.superpowers/` to `.gitignore` (brainstorm mockup artifacts).
