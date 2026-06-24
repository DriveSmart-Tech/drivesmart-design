# drivesmart-design

The DriveSmart design system, packaged as a Claude Code skill. Dark glassmorphism, vanilla CSS,
**no React / Tailwind / build / Node** — link one stylesheet and write HTML.

Trigger: `/drivesmart-design`

## Modes

- **install** *(default)* — drop `drivesmart.css` (+ optional `print.css`, `chart-theme.js`,
  `count-up.js`) into the project, wire the `<head>`, and start building from the system.
- **audit** — read-only scan of the current UI vs the system (hardcoded colors → tokens, ad-hoc
  components → system classes, off-system fonts). Writes `DRIVESMART-REVIEW.md`. Changes nothing.
- **migrate** — audit, then move the UI onto the system surface-by-surface.
- **reference** — "what class / token do I use for X" answered from the spec.

## Core model

- One token source: every color/size is a `:root` CSS variable; ghosts/borders/tints derive via
  `color-mix`, so the whole look re-themes from a few hexes.
- Themes are attributes: light = `<html data-theme="light">`, roundness = `data-radius`.
- Composition over bespoke parts: a KPI is just `glass-card` + `card-mesh-*` + `metric` + `label-caps`.
- Curated utilities replace Tailwind for layout; one blue accent; one loud CTA per view; never hardcode hex.

## Assets

| File | Role |
|---|---|
| `assets/drivesmart.css` | the whole system — tokens, utilities, components |
| `assets/print.css` | light report/PDF theme (`<body class="report">`) |
| `assets/chart-theme.js` | Chart.js theme from the tokens → `DS_CHART` |
| `assets/count-up.js` | animates `[data-count]` numbers |
| `assets/starter.html` | minimal app-shell to build from |
| `assets/DESIGN.md` | full dev spec (tokens + every class) |
| `assets/BRAND.md` | non-code brand spec |
