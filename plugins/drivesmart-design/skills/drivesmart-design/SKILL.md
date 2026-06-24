---
name: drivesmart-design
description: Install, reference, or audit/migrate the DriveSmart design system — dark glassmorphism, vanilla CSS, NO React / Tailwind / build / Node. Spin it into a new project, build UI with its classes, or audit an existing project's UI and migrate it onto the system. Also the reference for "what class/token do I use for X". Trigger: /drivesmart-design.
---

# DriveSmart Design System — install · reference · audit/migrate

A framework-free **dark glassmorphism** design system. One stylesheet (`drivesmart.css`)
carries the `:root` tokens, layout utilities, and every component; optional helpers add a
print theme, Chart.js theming, and count-up. **No React, no Tailwind, no build, no Node** —
link the CSS and write HTML.

Bundled reference lives in this skill's `assets/` — `DESIGN.md` (full spec) and `BRAND.md`
(non-code brand spec). The live copy-paste gallery is `index.html` in the `drivesmart-design` repo.

**Pick the mode** from the user's intent (or the argument after `/drivesmart-design`):
- *(default)* / `install` / `new` → **Install** the system into the current project.
- `audit` → **read-only** audit of existing UI vs the system → writes `DRIVESMART-REVIEW.md`.
- `migrate` → audit **then apply** the migration (only after the user confirms the plan).
- `reference` / any "what class for X" question → answer from the **Reference** section below.

---

## Core model (know this first)
- **One token source.** Every colour/size is a `:root` CSS variable. Ghosts/borders/tints
  derive from the base hue via `color-mix`, so the whole look re-themes from a few hexes.
- **Themes are attributes.** Light = `<html data-theme="light">`. Roundness =
  `<html data-radius="sharp|round">`. Both re-skin the entire UI with zero per-component work.
- **Composition over bespoke components.** A KPI is *just a card*:
  `glass-card` + `card-mesh-*` tint + `metric` number + `label-caps`. No `.kpi` component.
- **Curated utilities replace Tailwind** for layout: `.flex .grid .gap-* .p-* .text-* .rounded-*`.
- **Rules:** one blue accent · exactly one loud CTA per view (`.btn--primary`, blue gradient) ·
  mono-UPPERCASE labels are the signature · never hardcode hex — use tokens/utilities.

## Files (this skill's `assets/`)
| File | Drop into project | Role |
|---|---|---|
| `drivesmart.css` | root or `/static/css` | **the whole system** — link this |
| `print.css` | optional | light report/PDF theme (`<body class="report">`) |
| `chart-theme.js` | optional | Chart.js theme (load *after* chart.js) → `DS_CHART` |
| `count-up.js` | optional | animates `[data-count]` numbers on view |
| `starter.html` | new projects | minimal app-shell (sidebar + topbar + content) to build from |
| `DESIGN.md` | docs | full dev spec (tokens + every class) |
| `BRAND.md` | docs | non-code brand spec for designers/marketing |

---

# Mode: INSTALL (new or existing project)

### 0 · Detect (read, change nothing)
Inspect the tree + entry HTML/templates. Note: a CSS pipeline? Tailwind/Bootstrap? a
framework (React/Vue/etc.)? If a CSS framework is already styling the UI, this system is meant
to **replace** ad-hoc styling — don't layer it on top and fight specificity. Flag the overlap
and offer Audit/Migrate instead of a blind drop-in.

### 1 · Drop the stylesheet
- Copy `assets/drivesmart.css` into the project (e.g. `./drivesmart.css` or `/static/css/`).
- Copy optional helpers only as needed: reports → `print.css`; charts → `chart-theme.js`;
  animated metrics → `count-up.js`.

### 2 · Wire the document `<head>`
```html
<link rel="stylesheet" href="drivesmart.css">
<!-- icons (optional, only if you use Material Symbols): -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```
Text fonts (Hanken Grotesk / Inter / Geist) are `@import`ed inside `drivesmart.css` — nothing else to add.

### 3 · Page shell
- `<body class="bg-grid-pattern">` with `<div class="aurora-bg"></div>` as the first child →
  the signature backdrop.
- For a dashboard, copy `assets/starter.html` as the starting point — a fixed `.glass-sidebar`
  primary nav + sticky `.glass-nav` topbar + content area. **Sidebar is the primary nav.**

### 4 · Build with the system (don't reinvent)
- Surfaces: `.glass-card` (+ `.card-mesh-{primary,success,danger,warning,idle,neutral}` tint;
  `.is-static` to disable hover-lift).
- Metrics: `glass-card` + `.metric` + `.label-caps`. Status: `.status-chip--*`. Tables:
  `.data-table` (+`.sortable`, `.num`). Forms: `.input`/`.select`/`.textarea` + `.field`.
- One loud CTA only (`.btn--primary`). Everything else `.btn` / `.btn--soft` / `.btn--ghost`.
- Never hardcode a hex — reach for a token (`var(--primary)`) or a utility (`.text-primary`).

### 5 · Verify
Open the page: dark glass renders, fonts + icons load. Flip `<html data-theme="light">` to
sanity-check light mode. Confirm one primary CTA per view.

---

# Mode: AUDIT + MIGRATE (existing project)

Goal: move an existing UI off ad-hoc CSS / inline styles / a CSS framework onto DriveSmart.

## A · Audit (READ-ONLY) → write `DRIVESMART-REVIEW.md`
Scan HTML / CSS / templates and report, each as **BLOCK** (clash/broken) · **WARN** (off-system)
· **INFO** (nice-to-have), with `file:line`:
1. **Hardcoded colours** (hex/rgb in markup or CSS) → map each to the nearest token
   (`#9ecaff`→`--primary`; greens→`--success`; reds→`--danger`; ambers→`--warning`).
2. **Ad-hoc components with a system equivalent** → buttons→`.btn`, cards/panels→`.glass-card`,
   pills/status→`.status-chip`/`.badge`, tables→`.data-table`, inputs→`.input`/`.select`/`.field`,
   modals/menus/toasts/drawers→the overlay set, tabs/breadcrumbs/pagination→the nav set.
3. **Inline styles / utility soup** replaceable by system utilities or component classes.
4. **Fonts** not Hanken Grotesk / Inter / Geist.
5. **Migration plan** — ordered, lowest-risk first: (i) add `drivesmart.css` + head wiring;
   (ii) swap the app shell; (iii) swap components surface-by-surface; (iv) delete dead CSS.
Make NO edits in audit mode.

## B · Migrate (only after the user confirms the plan)
- Add `drivesmart.css` + head wiring first; verify nothing breaks.
- Migrate **one surface/page at a time**: replace markup with system classes, delete the
  now-dead bespoke CSS for that surface, verify visually, then move on. Keep diffs small and
  reviewable. Re-run the audit at the end to confirm offenders are gone.

---

# Reference (what class / token for X)
Full list: `assets/DESIGN.md`. Brand/colour spec: `assets/BRAND.md`. Live previews: the gallery.

- **Surfaces** — page `bg-grid-pattern` + `aurora-bg`; cards `glass-card`
  (+`card-mesh-{primary,success,danger,warning,idle,neutral}`, `.is-static`); chrome
  `glass-nav` / `glass-sidebar`.
- **Buttons** — `btn` + `{--primary,--soft,--ghost,--icon}` × sizes `{--xs,--sm,--lg}`.
- **Forms** — `input` / `select` / `textarea` (+`{--sm,--lg}`); `field` (label/hint/error,
  `aria-invalid`); `input-group` + `input-affix`; `switch` / `checkbox` / `radio` / `range`.
- **Data display** — `status-chip--{paid,unpaid,pending,cancelled,dead}`; `badge`(+tones),
  `tag`, `dealer-pill`, `avatar`(+`--{sm,lg}`,tones,`avatar-group`), `kv` list, `data-table`.
- **Data viz** — `delta--{up,down}`, `progress`(+`--success/--danger`), Chart.js via `DS_CHART`.
- **Navigation** — `sidenav-link` / `topnav-link` / `tabs`+`tab` / `segmented`+`seg` /
  `pagination`+`page-btn` / `breadcrumbs`.
- **Overlays** — `menu` / `modal` / `drawer`(+`--left`) / `accordion` / `popover` / `tooltip`
  (`has-tip data-tip`) / `kbd`.
- **Feedback** — `alert--{info,success,warning,danger}` / `toast--*` / `skeleton` / `spinner`
  / `empty-state` / `banner`(+`--warning`).
- **Type** — `text-{display,headline-lg,headline-md,body,mono}` + `label-caps` + `metric`;
  colour `text-{primary,success,danger,warning,idle,1,2,3,4}` / `muted`.
- **Motion** — `reveal` (fade+rise), `[data-count]` (count-up.js), `skeleton` shimmer.

When generating new UI: compose from these; never restyle a stock component with bespoke CSS;
keep one accent + one CTA; light is `data-theme="light"`. If a genuinely new pattern is needed,
build it from tokens/utilities and add it to the `drivesmart-design` repo (CSS + gallery) so the
next project inherits it.
