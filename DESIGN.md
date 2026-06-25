# DriveSmart Design System

The canonical spec for the DriveSmart UI: **dark glassmorphism, DriveSmart-blue accent,
zero build, zero framework.** One `drivesmart.css` — link it and write HTML. No React, no
shadcn, no Tailwind, no Node. Every colour routes through a `:root` variable and ghosts/borders
derive via `color-mix`, so the whole look re-themes from a handful of base hexes.

Live gallery + copy-paste reference: open `index.html`. Non-code brand spec: `BRAND.md`.

---

## 1 · Principles

- **One token source.** Every colour/size is a CSS variable in `:root`. Status ghosts, borders,
  glows and tints are **derived** from the base hue with `color-mix` — change one hex, it flows everywhere.
- **Glass, lit from above.** Surfaces are translucent (`backdrop-filter: blur`) with a hairline
  border and an inset top highlight; cards lift on hover. Never flat.
- **Blue is the one accent.** A single DriveSmart blue for actions, active, focus, links. No second accent.
- **Composition over bespoke parts.** A KPI is *just a card* (`glass-card` + `card-mesh-*` + `metric` + `label-caps`).
  Indicators are soft gradient tints, never hard coloured bars.
- **Mono caps for labels + data.** Geist, uppercase, letter-spaced — the signature eyebrow. Numerals tabular.
- **Motion is ambient.** Aurora pulse, hover lift, reveal-on-scroll, count-up — all `prefers-reduced-motion` safe.

---

## 2 · Files

| File | Role |
|---|---|
| `drivesmart.css` | the whole system — tokens, utilities, components. **Link this.** |
| `print.css` | light report/PDF theme (`<body class="report">`) |
| `chart-theme.js` | Chart.js theme — load after chart.js → `DS_CHART` (palette + `statusColor`) |
| `count-up.js` | animates `[data-count]` numbers on scroll-into-view |
| `index.html` | live gallery / copy-paste reference |
| `BRAND.md` | non-code brand spec (marketing / designers) |

```html
<link rel="stylesheet" href="drivesmart.css">
<!-- icons (optional): -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```
Text fonts (Hanken Grotesk / Inter / Geist) are `@import`ed inside `drivesmart.css`.

---

## 3 · Theming

- **Light** = `<html data-theme="light">`. Only the base hexes are overridden; ghost/border/glow
  tokens re-derive automatically via `color-mix`, so light "just works".
- **Roundness** = `<html data-radius="sharp">` or `"round"` — re-rounds the entire UI (every
  component reads the radius tokens). Default is medium.

---

## 4 · Colour

### Accent — DriveSmart blue
`--primary #9ecaff` · `--primary-container #2196f3` (gradient end) · `--primary-fixed #d1e4ff` · `--on-primary #003258` (ink on blue).

### Surfaces — elevation ladder
`--surface-lowest #0a0e14` (page) · `--surface #0f1419` · `--surface-low #181c22` · `--surface-container #1c2026` · `--surface-high #262a30` · `--surface-variant #31353b`.

### Status — one harmonised family
| Token | Dark | Light | Meaning |
|---|---|---|---|
| `--success` | `#2ee08f` | `#0a9e5c` | paid / positive |
| `--danger` | `#ff7b86` | `#d6455f` | unpaid / error |
| `--warning` | `#f5b84e` | `#b27a12` | pending |
| `--idle` | `#a9a4f5` | `#6d63d6` | dead deal / draft |
| `--neutral` | = `--outline` | — | cancelled |

### Text
`--on-surface #dfe2ea` (`--text-1`) · `--on-surface-variant #bfc7d4` (`--text-2`) · `--outline #89919d` (`--text-3`) · `--outline-variant #404752` (`--text-4`).

### Derived (don't set by hand — they `color-mix` off the base)
Per hue: `--*-ghost` (≈12–15% fill), `--*-line` (≈32% border), plus `--primary-ghost-2`, `--primary-glow`.
Fills/chrome: `--fill-1/-2`, `--input-bg`, `--nav-bg`, `--sidebar-bg`, `--float-bg/-2`, `--grid-line`, glass `--glass-bg/-border/-blur`, `--hairline`.

---

## 5 · Typography

| Role | Variable | Family | Utility |
|---|---|---|---|
| Display | `--f-display` | Hanken Grotesk | `.text-display` (40) · `.text-headline-lg` (28) · `.text-headline-md` (20) · `.metric` |
| Body | `--f-body` | Inter | `.text-body` (14) · `.text-sm` · `.text-xs` |
| Mono / data | `--f-mono` | Geist | `.text-mono` (13) · `.label-caps` (11, caps) · `.num` (tabular) |

Colour utilities: `.text-{primary,success,danger,warning,idle,1,2,3,4}`, `.muted`, `.muted3`.

---

## 6 · Radius & sizes

Radius tokens: `--r-sm 4` · `--r-lg 12` · `--r-xl 16` · `--r-2xl 24` (cards) · `--r-full`. Utilities `.rounded`, `.rounded-lg/xl/2xl/full`.

Component sizes:
- Buttons: `.btn--xs · .btn--sm · (default) · .btn--lg` (+ icon-button sizes).
- Inputs/selects: `.input--sm · (default) · .input--lg` (same for `.select--*`).

---

## 7 · Elevation

`.glass-card` — translucent, blurred, hairline border, lit top edge, lifts on hover. `.is-static`
disables the lift. Shadows `--sh-card` (resting) / `--sh-card-hi` (hover, blue glow) / `--sh-inner` (fields).
`.card-mesh-{primary,success,danger,warning,idle,neutral}` adds a soft corner tint. Chrome: `.glass-nav`, `.glass-sidebar`.

---

## 8 · Components

| Group | Classes |
|---|---|
| **Surfaces** | `glass-card` (+`card-mesh-*`, `.is-static`), `glass-nav`, `glass-sidebar`; backdrops `bg-grid-pattern`, `aurora-bg` |
| **Metric** | `metric` (big number) — compose a KPI from `glass-card` + `card-mesh-*` + `metric` + `label-caps` |
| **Buttons** | `btn` + `--primary` / `--soft` / `--ghost` / `--icon`; sizes `--xs/--sm/--lg` |
| **Forms** | `input`, `select`, `textarea` (+`--sm/--lg`); `field` (`field-label`/`field-hint`/`field-error`, `aria-invalid`); `input-group`+`input-affix`; `switch`, `checkbox`, `radio`, `range`; `search` wrapper |
| **Data display** | `status-chip--{paid,unpaid,pending,cancelled,dead}`; `badge`(+`--success/--danger/--neutral`); `tag`; `dealer-pill`; `avatar`(+`--sm/--lg`, tones `--blue/green/violet/amber/gray`, `avatar-group`); `kv` list; `data-table` (+`sortable`, `num`, `row-detail`) |
| **Data viz** | `delta--up/--down`; `progress`+`progress-bar`(+`--success/--danger`); charts via `DS_CHART` |
| **Navigation** | `sidenav-link` / `topnav-link` / `tabs`+`tab` / `segmented`+`seg` / `pagination`+`page-btn` / `breadcrumbs` |
| **Overlays** | `menu`(+`menu-item/label/sep`) / `modal`(+`modal-head`, `modal-overlay`) / `drawer`(+`--left`, `drawer-overlay`, `drawer-head`) / `accordion` (native `<details>`) / `popover` / `tooltip` (`has-tip data-tip`) / `kbd` |
| **Feedback** | `alert--{info,success,warning,danger}` / `toast--{success,info,danger}`(+`toast-stack`) / `skeleton`(+`--text`) / `spinner` / `empty-state` / `banner`(+`--warning`) |
| **Misc** | `dot--live/--primary`, `icon-badge`, `eyebrow`, `panel-head`, `divider`(+`--v`), `drop-zone` |

**One loud CTA:** only `.btn--primary` carries the blue gradient. Active states + status are soft gradient tints, never hard bars.

---

## 9 · Utilities

Curated (not full Tailwind): layout `.flex .grid .block .hidden .relative .absolute .fixed`,
`.flex-col .items-* .justify-* .flex-1 .flex-wrap .mx-auto .ml-auto .w-full`; grids `.grid-2/3/4/6`,
`.grid-auto`; gaps `.gap-1`…`.gap-6`, `.gap-card`; spacing `.mt-* .mb-* .p-* .px-* .py-*`,
`.mb-section`, `.pad-page`; radius `.rounded-*`; type + colour (§5). Need something niche? inline `style=""` — it's plain CSS.

---

## 10 · Motion

`reveal` (fade+rise, add on mount or scroll-into-view) · `[data-count]` count-up (load `count-up.js`)
· `skeleton` shimmer · `aurora-bg` pulse · hover lift · `dot` ping (`animate-pulse`). All reduced-motion safe.

---

## 11 · Print / report theme

`print.css`, scoped under `.report` (light, page-break-safe). `<body class="report">` + `.kpi-grid`,
`.kpi`, `.status` + `.s-*`. Never collides with the dark dashboard.

---

## 12 · Adding a new tool / pattern

1. Copy `drivesmart.css` (+ helpers as needed). `<body class="bg-grid-pattern">` + `<div class="aurora-bg">`.
2. Build with the component classes; reach for utilities for layout. Sidebar is the primary nav.
3. Keep the rules: one accent · one CTA · mono-caps labels · never hardcode hex · light = `data-theme="light"`.
4. New shared pattern? Add it here + to `index.html` so the next tool inherits it.
