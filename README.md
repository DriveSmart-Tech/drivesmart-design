# DriveSmart Claude Code Marketplace

Internal Claude Code marketplace for DriveSmart. Ships the **DriveSmart design system** as an
installable skill so any project — or any teammate's Claude Code session — can spin it up,
build against it, or migrate an existing UI onto it.

## What's inside

| Plugin | What it does |
|---|---|
| **drivesmart-design** | Install, reference, or audit/migrate the DriveSmart design system — dark glassmorphism, vanilla CSS, **zero framework** (no React / Tailwind / build / Node). Trigger: `/drivesmart-design`. |

## Install

In any Claude Code session:

```
/plugin marketplace add DriveSmart-Tech/drivesmart-marketplace
/plugin install drivesmart-design@drivesmart
```

Then the skill is available via `/drivesmart-design`:

- `/drivesmart-design` (or `install`) — drop the system into the current project.
- `/drivesmart-design audit` — read-only audit of an existing UI vs the system → `DRIVESMART-REVIEW.md`.
- `/drivesmart-design migrate` — audit, then migrate the UI onto the system surface-by-surface.
- `/drivesmart-design reference` — answer "what class / token do I use for X".

## The design system

One stylesheet (`drivesmart.css`) carries the `:root` tokens, layout utilities, and every
component. Optional helpers add a print theme (`print.css`), Chart.js theming (`chart-theme.js`),
and count-up (`count-up.js`). Link the CSS and write HTML — no build step, no framework.

Full spec: [`plugins/drivesmart-design/skills/drivesmart-design/assets/DESIGN.md`](plugins/drivesmart-design/skills/drivesmart-design/assets/DESIGN.md).
Brand spec: [`BRAND.md`](plugins/drivesmart-design/skills/drivesmart-design/assets/BRAND.md).

## Repo layout

```
.claude-plugin/marketplace.json        # marketplace manifest (lists plugins)
plugins/drivesmart-design/
  .claude-plugin/plugin.json           # plugin manifest
  skills/drivesmart-design/
    SKILL.md                           # the skill
    assets/                            # drivesmart.css + helpers + DESIGN.md / BRAND.md / starter.html
```
