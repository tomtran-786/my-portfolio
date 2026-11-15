# Working guide: Impeccable refine (`/` and `/teaching`)

This file is for Claude sessions (or people) continuing the UI refine done on branch `refine/impeccable`. Unlike the root `CLAUDE.md`, it is not loaded at the start of every session (Claude Code only picks it up when working on files in this folder), so read it when you pick this work up. The full change log and test evidence are in [detail.md](detail.md).

## Scope and branch

- Work lives on `refine/impeccable`, branched from `main` at `234608b`. `main` is untouched.
- Do not push, merge, or open a PR without the owner saying so.
- `main` keeps receiving automatic "Sync Chinese learning progress data" commits (they only touch `data/chinese-progress.json`). Rebase before a PR if needed.
- The root `CLAUDE.md` stays as `@AGENTS.md`. Do not edit it for this work.

## Read first

1. `AGENTS.md`: this is Next.js 16; read the relevant guide in `node_modules/next/dist/docs/` before touching layouts, metadata or routing.
2. `PRODUCT.md`: audience, primary action and tone for each route.
3. `DESIGN.md`: type, color, shape, spacing, primitives, motion, and the list of effects kept on purpose.
4. `app/globals.css`: the actual tokens. DESIGN.md describes them; the CSS is the source of truth.

## Design system in one screen

| Kind | Tokens | Notes |
|---|---|---|
| Type | `--fs-caption` 12, `--fs-label` 14, `--fs-small` 15, `--fs-body` 17, `--fs-lead`, `--fs-h3` 20, `--fs-h2`, `--fs-display` | 14px is the floor. 12px only for chart axes (heatmap). |
| Radius | `--r-sm` 6, `--r-md` 12, `--r-lg` 20, `--r-pill` | Pill is for buttons and filter tabs only. |
| Space | `--sp-1` … `--sp-8` = 4, 8, 12, 16, 24, 32, 48, 72px | |
| Color roles | `--c-ink`, `--c-text`, `--c-text-2`, `--c-brand`, `--c-brand-hover`, `--c-brand-deep`, `--c-brand-soft`, `--c-on-brand`, `--c-surface`, `--c-border`, `--c-border-strong` | Mapped from `--pf-*` on `.pf-body` and `--teach-*` on `.teaching-body`. Dark mode works automatically. |
| Primitives | `.btn`, `.btn--primary`, `.btn--secondary`, `.tag`, `.card`, `.meta-label` | Defined in `globals.css`. Use them before writing inline styles. |

## Rules when editing UI

- Take every size, radius and gap from the tokens above. If a step is missing, add it to `globals.css` and `DESIGN.md` first.
- Do not set `fontFamily` inline. Body sets the font, and `:where(button, input, select, textarea) { font: inherit; }` makes form controls inherit it. Removing inline `fontFamily` without that rule is what made buttons render in Arial once.
- One edge treatment per card: 1px border at rest, shadow only on hover. No cards inside cards; use dividers and spacing.
- Sentence case for nav, buttons, labels and headings. No uppercase with letter-spacing.
- `.tag` must be allowed to wrap. A `nowrap` tag inside a `1fr` grid column widens the column past the phone width.
- Keep one primary button per block.
- Touch targets: 44px for buttons and icon links, 32px for carousel and pagination dots (small visible dot inside a bigger button).
- Transitions list exact properties (`background-color 0.2s`), never `all`.
- Entrance easing is `cubic-bezier(0.22, 1, 0.36, 1)`, no overshoot or bounce.

## Copy rules

- No em-dashes in user-facing copy. Use commas, colons or full stops.
- No "not X, but Y" slogans. State the useful fact.
- Section subtitles must say something specific, never filler.
- Do not invent facts (dates, reply times, cities, topics). If a sentence needs a fact you do not have, ask the owner.
- `/teaching` copy is Vietnamese, first person ("tôi"). Testimonials are students' own words: ask before fixing their typos.
- Vietnamese strings in `data/teaching/*.js` may be stored in NFD form, so an exact-string find and replace can silently miss. Match with a regex on the surrounding ASCII (for example `headline: "[^"]*"`) and assert the match count.

## Effects kept on purpose

The owner chose to keep these. Do not remove them in a "quieter" pass.

| Effect | File | Marker / guard |
|---|---|---|
| Custom cursor | `app/components/Cursor.js` | Returns null on touch devices and under `prefers-reduced-motion` |
| Aurora blobs and hero halo | `app/components/HeroAurora.js`, `.pf-hero-halo` | `data-impeccable-ignore`, animation stops under reduced motion |
| Typewriter role line | `app/(portfolio)/page.js` | `data-impeccable-ignore="decorative-blinking-cursor"`, static text under reduced motion |
| 3D tilt with glare | `app/components/TiltCard.js` | Skipped under reduced motion |
| Hover scale and lift | `page.js`, teaching CTAs | Disabled under reduced motion |

## Impeccable workflow

- Skill files: `.claude/skills/impeccable/`. Launcher: `.claude/skills/impeccable/scripts/impeccable` (run from the repo root).
- Load context once per session: `.claude/skills/impeccable/scripts/impeccable context --target "app/(teaching)/teaching/page.js"`.
- Detector:
  - Source: `impeccable detect --json "app/(teaching)" app/components/teaching data/teaching`. It is regex-only for `.js`, so element rules (tiny text, contrast) do not run here.
  - Rendered page: `impeccable detect --json http://localhost:3000/teaching`, optionally with `--viewport 390x844`.
- A design hook runs the detector after UI edits. Triage every finding: fix real problems, add the narrowest `hooks ignore-value` for confirmed false positives, and state who decided.
- Existing ignore: `side-tab` in `app/globals.css` (the left rule on `.pf-blog-prose blockquote` is a quote convention, not a card accent). It lives in `.impeccable/config.json`, which is not committed.
- Known false positive: `dark-glow` on `/teaching` in dark mode. `--teach-shadow-hover` resolves to black in dark mode, but the detector reads the light value.
- Critique snapshots: `.impeccable/critique/`. The first `/teaching` run scored 21/32.
- `/impeccable doctor` reports that `PRODUCT.md` predates the current schema. Fixing it means running `/impeccable init`, which interviews the owner. Do not rewrite it from inference.

## Verification checklist

Run all of these before saying a UI change is done.

1. `npm run lint` and `npm run build` (both must pass).
2. Start the dev server with the `portfolio-dev` entry in `.claude/launch.json` (`preview_start`), never with a raw `npm run dev` in Bash.
3. Check `/`, `/teaching`, `/blog` at 1440x900 and at the mobile preset (375x812), in light and dark mode. To switch theme, set `localStorage['tomtran-color-mode']` to `'light'` or `'dark'` and reload.
4. Sections animate in with `whileInView`. Scroll the whole page before auditing, or hidden content is skipped.
5. Paste this audit into the page (browser `javascript_tool`) after scrolling. It lists visible text under 14px, text below WCAG AA contrast, and horizontal overflow:

```js
for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
await new Promise(r => setTimeout(r, 1500));
function lum(c){const m=c.match(/[\d.]+/g); if(!m) return null; const [r,g,b]=m.slice(0,3).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}); return {L:0.2126*r+0.7152*g+0.0722*b, a: m[3]!==undefined?+m[3]:1};}
function bgOf(el){while(el){const l=lum(getComputedStyle(el).backgroundColor); if(l && l.a>0.9) return l.L; el=el.parentElement;} return 1;}
const small=[], low=[];
document.querySelectorAll('body *').forEach(el=>{
  const txt=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('');
  if(!txt || el.getBoundingClientRect().width===0) return;
  const cs=getComputedStyle(el), fs=parseFloat(cs.fontSize);
  if(fs<14 && !el.closest('.pf-cn-heatmap-wrap,.pf-cn-heatmap-legend')) small.push(fs+'px '+txt.slice(0,30));
  const fg=lum(cs.color); if(!fg) return; const bg=bgOf(el);
  const ratio=(Math.max(fg.L,bg)+0.05)/(Math.min(fg.L,bg)+0.05);
  const large=fs>=24||(fs>=18.66&&+cs.fontWeight>=700);
  if(fg.a>0.9 && ratio<(large?3:4.5)) low.push(ratio.toFixed(2)+' '+fs+'px '+txt.slice(0,30));
});
({mode:document.documentElement.dataset.colorMode, small:[...new Set(small)], low:[...new Set(low)], hscroll: document.documentElement.scrollWidth>innerWidth})
```

6. Keyboard check: focus a "Xem chi tiết khóa học" button and press Enter. A `[role=dialog]` with the course title must open with focus inside, and Escape must close it. Do the same for a project card on `/`.
7. Check the browser console for errors.

## Gotchas found in this work

- The in-app browser pane often returns a stale screenshot when it is hidden or in the background. Confirm state through the DOM (`javascript_tool`, `read_page`) rather than trusting the image.
- Key presses sent through the pane may not reach a hidden page. Dispatching a `keydown` event from JavaScript does reach it.
- Changing the theme mid-scan can leave CSS color transitions stalled in a background tab, which produces fake low-contrast hits. Call `.finish()` on `document.getAnimations()` before re-scanning.
- `html` has `scroll-behavior: smooth`. Use `window.scrollTo({ top, behavior: 'instant' })` in scripts that need the position to change right away.
- `text-wrap: balance` can split Vietnamese compound words across lines in short headings. Prefer shorter copy or explicit line parts (see `.hero-headline-part` in `HeroSection.js`).

## Open roadmap

Owner's choices after the `/teaching` critique: direction **English Quest**, first priority **Zalo CTA and mobile**, audience **students and working adults**. Keep the **course modal content** and the **hero illustration** as they are.

1. `/impeccable clarify` + `/impeccable adapt`: Zalo becomes the primary CTA ("Nhắn Zalo cho tôi"), email becomes a `mailto:` secondary, labels say what happens, add a short "what the 30-minute trial covers" list and a sticky Zalo bar on mobile.
2. `/impeccable shape`: define English Quest. Each course is a character class using the existing pixel-RPG course art, a level bar from entry band to target band, and a two-question path picker. Type stays plain, and prices and credentials stay explicit.
3. `/impeccable layout`: course cards with the RPG art, "from …/month" price and level bar; testimonials as result-first "player stories" showing all 7.
4. `/impeccable clarify`: factual hero headline (keep the SVG) plus a proof line (TOEIC 980, IELTS 7.5, Chuyên Anh).
5. `/impeccable polish`: mobile brand and toggle collision, wrapped billing labels, orange hover shadow in the dark modal (`CourseDetailModal.js`, `.course-modal-syllabus-link:hover`), English `<title>` on the Vietnamese page, "Built with Next.js" in the teaching footer.
