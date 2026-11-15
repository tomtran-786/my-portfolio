# Design system

Source of truth: `app/globals.css`. Anything not listed here should be added here (and to the CSS) before it is used in a component. Checked against the [Impeccable](https://impeccable.style/slop) catalog.

## Typography

One family for both routes: **Source Sans 3** (`--font-portfolio`, `app/fonts.js`), with the Vietnamese subset. Hierarchy comes from size and weight, not from a second family.

| Token | Size | Use |
|---|---|---|
| `--fs-caption` | 12px | Chart axis labels only (heatmap months, weekdays, legend) |
| `--fs-label` | 14px | Floor for anything a person reads: tags, meta, nav, footnotes |
| `--fs-small` | 15px | Secondary text in cards, nav links, descriptions |
| `--fs-body` | 17px | Paragraphs |
| `--fs-lead` | 17 to 20px | Hero and section lead text |
| `--fs-h3` | 20px | Card titles |
| `--fs-h2` | 32 to 48px | Section titles |
| `--fs-display` | 36 to 60px | Reserved for hero headlines |

Rules:
- Headings use weight 700 and `text-wrap: balance`; paragraphs use `text-wrap: pretty` (set globally).
- Body line-height 1.6 to 1.7. Paragraph measure capped near 68ch.
- Sentence case everywhere. Uppercase + letter-spacing is not used.
- Letter-spacing only on large headings (-0.02em).

## Color

Each route has its own palette, mapped to shared role tokens so primitives work on both.

| Role (`--c-*`) | `/` (`--pf-*`) | `/teaching` (`--teach-*`) |
|---|---|---|
| `--c-brand` | `--pf-brand` #0c498f | `--teach-brand` #f79747 |
| `--c-brand-deep` | `--pf-brand-deep` #003865 | `--teach-brand-deep` #8f4100 |
| `--c-ink` | `--pf-ink` #172636 | `--teach-ink` #2f2723 |
| `--c-text` | `--pf-text` #404040 | `--teach-text` #4a403b |
| `--c-text-2` | `--pf-text-secondary` | `--teach-text-secondary` |
| `--c-border` | `--pf-border` | `--teach-border` |

Both palettes have dark-mode overrides under `html[data-color-mode='dark']`. Bright orange is a fill color only; text on light surfaces uses `--teach-brand-deep`. No gradients on text, buttons, or backgrounds. The scroll progress bar is a solid accent.

## Shape

| Token | Value | Use |
|---|---|---|
| `--r-sm` | 6px | Tags, category labels, small chips |
| `--r-md` | 12px | Cards, panels, drawers, carousel on mobile |
| `--r-lg` | 20px | Large photos, modals, hero carousel |
| `--r-pill` | 999px | Buttons and filter tabs only |

Cards use one edge treatment: a 1px border at rest, shadow only on hover. No cards nested inside cards; inner groups use dividers and spacing.

## Spacing

`--sp-1` to `--sp-8` = 4, 8, 12, 16, 24, 32, 48, 72px. Section padding is 4rem (`/`) and 4.5rem (`/teaching`) on desktop, 2.5 to 3rem on mobile. Headings sit closer to their own content than to the section above.

## Primitives (`globals.css`)

- `.btn` + `.btn--primary` / `.btn--secondary`: min height 44px, pill radius. One primary per block.
- `.tag`: static label, `--r-sm`, 14px. Not a button.
- `.card`: surface + 1px border + `--r-md`.

Touch targets: at least 44px for buttons and icon links, at least 32px for carousel and pagination dots (the visible dot stays small inside a larger hit area).

## Motion

Entrances use ease-out `cubic-bezier(0.22, 1, 0.36, 1)`, 0.5 to 0.65s, no overshoot. Hover lifts are 3 to 8px.

### Effects kept on purpose

These are signature effects the owner chose to keep. They are marked with `data-impeccable-ignore` and all switch off under `prefers-reduced-motion: reduce`.

| Effect | Where | Ignore marker |
|---|---|---|
| Custom cursor (dot + follower) | `app/components/Cursor.js` | (component returns null under reduced motion) |
| Aurora blobs + hero halo | `HeroAurora.js`, `.pf-hero-halo` in `page.js` | `radial-gradient-halo soft-spotlight glassmorphism` |
| Typewriter role line | `app/(portfolio)/page.js` | `decorative-blinking-cursor` |
| 3D tilt with glare | `TiltCard.js` (Projects, Certifications) | `glassmorphism` |
| Hover scale on hero buttons | `page.js` (framer-motion) | none needed |

Modal backdrops keep a light `backdrop-filter: blur()` because it separates layers.
