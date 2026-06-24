# DriveSmart Design System

Dark glassmorphism UI kit for DriveSmart tools. **One CSS file, no build, no framework.**
Link it, write HTML. No React / shadcn / Tailwind / Node.

**▶ Live gallery:** https://drivesmart-tech.github.io/drivesmart-design/ — every component,
copy-paste snippets, light/dark + roundness toggles, "Copy full CSS".

```html
<link rel="stylesheet" href="drivesmart.css">
<!-- icons (optional): -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

<body class="bg-grid-pattern">
  <div class="aurora-bg"></div>
  <div class="glass-card card-mesh-success p-5">
    <div class="metric text-success">12,847</div>
    <div class="label-caps text-2 mt-2">Paid</div>
  </div>
</body>
```

Fonts (Hanken Grotesk / Inter / Geist) are `@import`ed inside `drivesmart.css`.

## Files

- **`drivesmart.css`** — the system (tokens + utilities + components). Link this.
- **`print.css`** — light report/PDF theme (`<body class="report">`).
- **`chart-theme.js`** — Chart.js theme → `DS_CHART` (load after chart.js).
- **`count-up.js`** — animates `[data-count]` numbers.
- **`index.html`** — the live gallery (served via GitHub Pages above).
- **[`DESIGN.md`](DESIGN.md)** — full spec: every token, class, rule.
- **[`BRAND.md`](BRAND.md)** — non-code brand spec for designers / marketing.

## What's in it

Glass cards · KPI-as-composition · buttons (4 variants × 4 sizes) · forms (input/select/textarea/field/
input-group/switch/checkbox/radio/range) · status chips · badges · tags · dealer pills · avatars · key-value
lists · sortable glass tables · delta · progress · nav (side/top/tabs/segmented/pagination/breadcrumbs) ·
overlays (menu/modal/drawer/accordion/popover/tooltip/kbd) · feedback (alert/toast/skeleton/spinner/empty/banner) ·
aurora + grid backdrops · motion (reveal, count-up, shimmer) · light theme + roundness scale · curated utilities.

## Themes

- Light: `<html data-theme="light">` — base hexes flip, everything else re-derives via `color-mix`.
- Roundness: `<html data-radius="sharp|round">` — re-rounds the whole UI.

## Use it with Claude Code (the skill)

This system ships as a **Claude Code skill** — `/drivesmart-design` — distributed through the
DriveSmart marketplace ([`DriveSmart-Tech/drivesmart-marketplace`](https://github.com/DriveSmart-Tech/drivesmart-marketplace)).
In any Claude Code session:

```
/plugin marketplace add DriveSmart-Tech/drivesmart-marketplace
/plugin install drivesmart-design@drivesmart
```

Then:

| Command | What it does |
|---|---|
| `/drivesmart-design` (or `install`) | Drop the system into the current project + scaffold an app-shell. |
| `/drivesmart-design audit` | **Read-only** audit of an existing UI vs the system → `DRIVESMART-REVIEW.md`. |
| `/drivesmart-design migrate` | Audit, then migrate the UI onto the system surface-by-surface. |
| `/drivesmart-design reference` | Answer "what class / token do I use for X". |

The skill source lives in [`skill/drivesmart-design/`](skill/drivesmart-design/) and is mirrored
into the marketplace repo. To install without the marketplace:
`cp -r skill/drivesmart-design ~/.claude/skills/`.

---

Extracted from the DriveSmart Dealer Sales Payment Dashboard.
