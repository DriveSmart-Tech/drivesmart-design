# DriveSmart — Brand & Design Reference

Plain-language design spec for **non-developers** — marketing, designers, artists.
Every colour, font and size you need to recreate the DriveSmart look in Figma, Canva,
slides, social, or print. No code required. (Developers: see `DESIGN.md` + the live gallery.)

The feel: **dark, glassy, modern.** Deep near-black surfaces, soft translucent panels,
one calm sky-blue accent, generous space. Premium fintech, not flashy.

---

## 1 · Colours

Copy the hex codes straight into your design tool.

### Brand accent — DriveSmart Blue
| Swatch | Hex | Use |
|---|---|---|
| 🟦 Sky blue | `#9ECAFF` | **The** brand colour — highlights, buttons, links, active states |
| 🟦 Deep blue | `#2196F3` | Gradient partner (pair with sky blue for button gradients) |
| Ink on blue | `#003258` | Text/icons placed *on top of* a solid blue fill |

> **One accent only.** Don't introduce a second brand colour. Blue carries everything.

### Surfaces (backgrounds, darkest → lightest)
| Hex | Use |
|---|---|
| `#0A0E14` | Page background (near-black) |
| `#0F1419` | Base panels |
| `#181C22` | Cards |
| `#1C2026` | Raised cards |
| `#262A30` | Highest / hover |

### Status colours (one harmonised family)
| Swatch | Hex | Meaning |
|---|---|---|
| 🟢 Green | `#2EE08F` | Paid · positive · success |
| 🔴 Coral | `#FF7B86` | Unpaid · error · negative |
| 🟡 Amber | `#F5B84E` | Pending · warning |
| 🟣 Violet | `#A9A4F5` | Dead deal · draft · idle |

### Text (on dark backgrounds)
| Hex | Use |
|---|---|
| `#DFE2EA` | Primary text (headlines, body) |
| `#BFC7D4` | Secondary text |
| `#89919D` | Labels, captions, muted |
| `#404752` | Faint / disabled / hairlines |

### Light mode (for white backgrounds — print, light decks)
Same family, deepened so it reads on white: Blue `#1E7FE0` · Green `#0A9E5C` ·
Coral `#D6455F` · Amber `#B27A12` · Violet `#6D63D6` · Text `#1F2A38`.

---

## 2 · Type

Three free Google Fonts. Download from [fonts.google.com](https://fonts.google.com).

| Role | Font | Where to use |
|---|---|---|
| **Display** | **Hanken Grotesk** (Semibold/Bold) | Big numbers, headlines |
| **Body** | **Inter** (Regular/Medium) | Paragraphs, UI text |
| **Mono / labels** | **Geist** (Semibold) | ALL-CAPS labels, data, code-like text |

**Type scale** (px):
- Display metric — **40**, bold, tight spacing (big KPI numbers)
- Headline L — **28** semibold
- Headline M — **20** semibold
- Body — **14** regular
- Mono data — **13**
- **Label caps — 11, UPPERCASE, letter-spaced** ← the signature DriveSmart eyebrow

> The little **UPPERCASE letter-spaced labels** are the brand's fingerprint. Use them
> for category labels and metric captions.

---

## 3 · Spacing & corners

- **Spacing rhythm:** multiples of 4px — 4, 8, 12, 16, 20, 24, 32. Card padding 20–24px.
- **Corner radius:** small 4px · medium 12px · cards 24px · pills/round 999px. Cards are
  noticeably rounded (24px).
- Lean generous — whitespace is part of the premium feel.

---

## 4 · The "glass" look (how to fake it in a design tool)

A DriveSmart card =
1. Fill: very dark, **~40% opacity** (translucent) over the page.
2. Background blur behind it (Figma: Layer Blur / Background Blur ~20px).
3. A **0.5px hairline border**, white at ~8% opacity.
4. A soft drop shadow below + a 1px white **top highlight** (lit from above).
5. Optional: a faint colour glow in one corner (blue/green/etc. at ~12%).

Cards lift slightly on hover. Behind everything: a slow **aurora** glow (blurry blue +
green blobs) on the near-black page.

---

## 5 · Logo & icon

- App mark: a rounded-square blue gradient tile with a white `directions_car` icon.
- Icons: Google **Material Symbols** (Outlined). Free, consistent line weight.

---

## 6 · Do / Don't

**Do** — one blue accent · lots of dark space · UPPERCASE mono labels · soft glass cards ·
status colours only for status.
**Don't** — add a second brand colour · use pure black `#000` (use `#0A0E14`) · use heavy
drop shadows or neon glows everywhere · stretch/recolour the logo · put light-mode colours
on dark backgrounds (use the dark set).

---

Questions or a new asset need? The living source of truth is the gallery (`index.html`) and
`DESIGN.md`. This file is the plain-language extract.
