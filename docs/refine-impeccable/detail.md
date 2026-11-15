# Change log: Impeccable refine of `/` and `/teaching`

Branch `refine/impeccable`, branched from `main` at `234608b` on 2026-11-15. Reference: the [Impeccable](https://impeccable.style/) design guidance and its anti-pattern catalog (impeccable.style/slop). The working guide for future sessions is [claude.md](claude.md).

## Summary

| Commit | Scope | Files | Lines |
|---|---|---|---|
| `4fa8c6b` | Shared tokens and primitives; main portfolio `/` | 13 | +742 / -631 |
| `3bee946` | `/teaching` components and copy | 15 | +229 / -397 |
| `4649804` | `PRODUCT.md`, `DESIGN.md`; contrast and mobile fixes found in testing | 7 | +131 / -8 |
| This commit | Button font regression fix; these two documents | 3 | see `git show` |

Agreed scope (set with the owner before work began): "polish + quieter". Keep layout and color identity, fix what the Impeccable catalog flags, move styles onto shared tokens. Keep the custom cursor, aurora, typewriter, tilt and hover scale. Copy edits allowed.

---

## Commit `4fa8c6b`: shared foundation and main portfolio

### `app/globals.css`

- Removed the unused legacy root palette (`--purple*`, `--navy*`, `--text-*`, `--border`) and the Arial/navy `body` rule. Impeccable flags purple on dark as the stock "AI color palette".
- Removed the purple global scrollbar colors. Each route already themes its own scrollbar.
- Added shared scales on `:root`:
  - type: `--fs-caption` 12px, `--fs-label` 14px, `--fs-small` 15px, `--fs-body` 17px, `--fs-lead`, `--fs-h3`, `--fs-h2`, `--fs-display`;
  - radius: `--r-sm` 6, `--r-md` 12, `--r-lg` 20, `--r-pill`;
  - spacing: `--sp-1` to `--sp-8`;
  - easing: `--ease-out`.
- Added global reading rules: `text-wrap: balance` on h1 to h4, `text-wrap: pretty` on p, li and blockquote, body line-height 1.6.
- Added `--c-*` role tokens mapped from `--pf-*` (on `.pf-body`) and `--teach-*` (on `.teaching-body`), so one set of primitives serves both routes and follows dark mode.
- Added primitives:
  - `.btn`, `.btn--primary`, `.btn--secondary` (44px minimum height, pill);
  - `.tag` (6px radius, 14px);
  - `.card` (1px border, 12px radius);
  - `.meta-label`.
- Section titles and subtitles now use `--fs-h2` and `--fs-lead`.
- Nav "Teaching" link: sentence case, 14px, 40px tall, no hover jump.
- Stats strip: two cells instead of three, ruled top and bottom instead of a boxed card, smaller numbers, sentence-case labels with context.
- Activity panels:
  - border only (dropped the extra shadow);
  - stat tiles flattened into a ruled row with the icon beside the label (were cards inside a card);
  - sub-panels lost their own boxes;
  - removed the decorative gradient from the practice panel;
  - practice breakdown separated by a divider;
  - CTA is now a normal pill button;
  - all small text raised to the 14px label step;
  - heatmap axis labels use the 12px caption step.
- Blog: card radius, category pill and tags moved to tokens; the uppercase date and category styling were removed.
- New classes for the restructured hero, education and contact blocks (see `page.js` below). `.pf-section` now carries `position: relative; z-index: var(--z-content)`, replacing repeated inline styles.

### `app/(portfolio)/page.js`

- Hero:
  - removed the "Open to opportunities" pill above the name (Impeccable: badge above headline);
  - the status now sits under the buttons as a plain line with a static dot;
  - order: name, typewriter role, lead paragraph, buttons, status + social icons;
  - buttons use `.btn` and keep the framer-motion hover scale;
  - social icons are 44px targets without card boxes;
  - the halo moved into a CSS class with an ignore marker.
- `useReducedMotion()`: turns off hover scale and replaces the typewriter with static text.
- Stats: dropped "GitHub Projects" (a subset of Projects). Labels now say what the number covers; the certification issuers are computed from the data.
- Education:
  - cards use `.card` and new classes;
  - the "Minor: International Finance" badge was removed because the degree line already says it;
  - badges use `.tag`; degree is an `h3`.
- Contact: removed the wave emoji and the inner `h2` that sat under the section `h2`. The section heading is now "Let's work together" with the availability sentence as its subtitle, and the buttons sit directly in the section (no card).

### Components

- `Projects.js`:
  - entrance easing changed from the overshooting `(0.34, 1.56, 0.64, 1)` to ease-out;
  - card radius from token;
  - title 18px, description 15px;
  - new `ToolTag` component shared by card and modal;
  - cards show at most 3 tool tags plus "+N";
  - filter tabs 40px tall with exact transitions, count shown as plain text;
  - modal radius `--r-lg`, uppercase "KEY HIGHLIGHTS" and "TECH STACK" became sentence-case `h4`s, buttons use `.btn`, "View Project" became "View project".
- `SiteChrome.js` / `NavLink.js`:
  - nav labels shortened and sentence-cased (Work, Activity, Timeline, Education, Certifications, Contact, Blog);
  - links 15px without uppercase tracking;
  - the scroll progress bar is a solid accent instead of a gradient.
- `Footer.js`: headings sentence case at 14px (were 12px uppercase with 0.12em tracking), links 15px, social buttons 44px, same nav labels as the header.
- `Certifications.js`:
  - heading "Certifications" with a factual subtitle;
  - card radius from token, border only;
  - name is an `h3`, issuer and date share one 14px line;
  - pagination dots got a 32px hit area.
- `Timeline.js`: new subtitle, sizes from tokens, the location pill became plain text with an icon, image border only.
- `BlogList.js`: filter tabs match Projects.
- `MobileDrawer.js`: radius from token, exact transitions.
- `TiltCard.js`, `Cursor.js`: skip under `prefers-reduced-motion`. `TiltCard` and `HeroAurora` got `data-impeccable-ignore` markers.

---

## Commit `3bee946`: `/teaching`

### Token sweep (all `app/components/teaching/*.js`)

- Removed the repeated inline `fontFamily` from every style object.
- Mapped font sizes 10.5 to 13px to `--fs-label`, and 13.5 to 14px to `--fs-small`.
- Section titles use `--fs-h2`; weight 800 became 700.
- Removed uppercase and letter-spacing.
- Mapped radii 1 to 1.25rem to `--r-md`, and 1.5 to 2rem to `--r-lg`.

### Sections

- `HeroSection.js`: lead text uses `--fs-lead`, the CTA uses `.btn--primary` (hover lift kept, disabled under reduced motion), and unused badge styles were removed.
- `AboutSection.js`:
  - removed the dark gradient overlay and the frosted-glass badge with a trophy emoji that sat on the photo;
  - the photo is now a `figure` with a plain `figcaption` below it;
  - paragraphs 17px, capped at 68ch;
  - credentials use `.tag`;
  - IELTS 7.5 and TOEIC 980 no longer appear in three places (badge, tags, stats).
- `CoursesSection.js`:
  - the 32px emoji that sat above each title (Impeccable: icon tile above heading) is now a small icon beside the category label;
  - "Phổ biến nhất" is a filled `.tag`;
  - meta labels are sentence case and grey;
  - the highlighted card uses a 1px border and no resting shadow;
  - hover lift 6px (was 10px);
  - tabs 40px tall;
  - title 20px.
- `TestimonialsSection.js`:
  - removed the decorative Georgia quote mark;
  - the quote is a `blockquote` at 16px, no italics;
  - the result is a `.tag` without the party emoji;
  - stars have an `aria-label`;
  - page buttons 44px, dots have a 32px hit area.
- `ClassMomentsSection.js`: the caption lost its orange side stripe and uses body size; dots have a 32px hit area; the arrow SVG is `aria-hidden`.
- `CTASection.js`:
  - removed the envelope emoji and the card frame (it was a card inside a section);
  - heading uses `--fs-h2`;
  - buttons are `.btn` with mail and chat icons instead of emoji;
  - the note uses a clock icon.
- `CourseDetailModal.js`:
  - removed the "✷ Pricing" label above the pricing heading (label above heading);
  - "Bảng Giá Khóa Học" became "Bảng giá khóa học";
  - reading text 17px;
  - badges use a 6px radius;
  - removed the quote glyph and party emoji in the student block;
  - `transition: all` replaced with exact properties.
- `TeachingFooter.js`: headings without tracking, mail and chat icons instead of emoji, clock emoji removed.

### Copy changes (`data/teaching/*.js`, `app/(teaching)/layout.js`)

"[em-dash]" marks where the old copy used one.

| Where | Before | After |
|---|---|---|
| Hero subtext | Lộ trình tiếng Anh cá nhân hóa [em-dash] từ giao tiếp tự tin đến luyện thi học thuật, phù hợp với mục tiêu của riêng bạn. | Lộ trình tiếng Anh cá nhân hóa, từ giao tiếp tự tin đến luyện thi IELTS và TOEIC, xây theo mục tiêu của riêng bạn. |
| About headline | Không chỉ dạy tiếng Anh [em-dash] tôi dạy cách tư duy bằng tiếng Anh | Vui nhất là thấy học viên tiến bộ sau mỗi buổi học |
| About photo | Badge: 🏆 "IELTS 7.5 · 3+ năm kinh nghiệm" / "Cử nhân Kinh doanh quốc tế, Đại học Ngoại Thương" | Caption: "Hơn 3 năm kinh nghiệm dạy kèm · Cử nhân Kinh doanh quốc tế, Đại học Ngoại Thương" |
| About credentials | IELTS 7.5, TOEIC L&R 980, Chứng chỉ TOEIC Teaching (ALAP), Chuyên Anh [em-dash] THPT Nguyễn Tất Thành, Quảng Ngãi | IELTS 7.5, Chứng chỉ TOEIC Teaching (ALAP), Chuyên Anh, THPT Chuyên Nguyễn Tất Thành (Quảng Ngãi). TOEIC 980 stays in the stats row. |
| Course tab | Giao Tiếp | Giao tiếp |
| CTA headline | Bắt đầu với một buổi học thử [em-dash] hoàn toàn miễn phí | Bắt đầu với một buổi học thử miễn phí |
| Testimonials subtext | Không phải lời hứa [em-dash] đây là những gì học viên đã đạt được. | Kết quả học viên đạt được sau khi học cùng tôi. |
| Page description | Hành trình giảng dạy Tiếng Anh [em-dash] lộ trình cá nhân hóa … | Hành trình giảng dạy tiếng Anh: lộ trình cá nhân hóa … |

Main portfolio copy (in `4fa8c6b`):

| Where | Before | After |
|---|---|---|
| Hero lead | A data-driven International Business student leveraging Python, SQL, and statistical modeling to optimize workflows and provide data-driven solutions. | An International Business student who uses Python, SQL, and statistical modeling to streamline workflows and back business decisions with data. |
| Hero status | Open to opportunities (pill above the name) | Open to internships and graduate roles (line under the buttons) |
| Resume button | Download Resume | Download resume |
| Stats | 13 PROJECTS / 13 GITHUB PROJECTS / 19 CERTIFICATIONS | "13 Projects in investment analysis, market research, and data" / "19 Certifications from Claude Academy, Google, Xóm Data Academy, and DataCamp" |
| Timeline subtitle | A quick recap of proud moments | Recent roles in data analysis, research, and marketing |
| Education subtitle | Where I experienced my academic journey | Two International Business degrees, in Vietnam and Taiwan |
| Certifications title / subtitle | My Certifications / Professional certifications that validate my expertise | Certifications / Courses and credentials from Google, DataCamp, Xóm Data Academy, and Claude Academy |
| Contact | Contact / Where you can reach out to me, then a card with 👋 "Let's work together" | Let's work together / Open to internships, graduate roles, and freelance projects in finance, data analysis, and business strategy. |

---

## Commit `4649804`: docs and fixes from testing

- `PRODUCT.md`: audience, job, primary action, tone and language for each route; shared writing rules.
- `DESIGN.md`: type, color role map, shape, spacing, primitives, touch targets, motion, and the table of effects kept on purpose.
- Fixes for problems the browser audit found (see Testing):
  - `Projects.js`: tool tag text darkened with `color-mix(in srgb, <brand> 72%, #000)` to pass 4.5:1 on the pastel tag backgrounds.
  - `page.js`: the `//` before the typewriter uses `--pf-link` instead of `--pf-accent` (was 4.12:1). The issuer list gained a serial comma.
  - `globals.css`: `.tag` can wrap (`max-width: 100%`, no `nowrap`); stats stack to one column at 480px and below.
  - `HeroSection.js`: the headline breaks between the two data parts only above 600px; inline on phones.
  - `TeachingFooter.js`: bottom strip text 14px (was 12px), radius from token.

## This commit: font regression fix and documentation

- `app/globals.css`: added `:where(button, input, select, textarea) { font: inherit; }`.
  - Cause: removing inline `fontFamily` in `3bee946` left every `<button>` that does not use `.btn` on the browser default (Arial). That covered nav links, course tabs, "Xem chi tiết khóa học", FAQ questions and the modal CTA.
  - The Impeccable critique's design review caught it.
  - Verified in the browser: the first six buttons on `/teaching` now compute to "Source Sans 3".
- `docs/refine-impeccable/claude.md` and `docs/refine-impeccable/detail.md` (this file).

Not committed on purpose:
- `.impeccable/`: Impeccable's local config, hook cache, critique snapshot, and the `side-tab` ignore for blog blockquotes.
- `.claude/skills/impeccable/` and `.claude/agents/impeccable-*`: the installed plugin files.

---

## Testing

### Build and lint

- `npm run lint`: passes with no output after each commit.
- `npm run build` (Next.js 16.2.6, Turbopack): "Compiled successfully". All 10 static pages were generated: `/`, `/blog`, three `/blog/[slug]` posts, `/teaching`, two icon routes, and `/_not-found`.

### Browser checks

Run in the in-app browser against the `portfolio-dev` server (`.claude/launch.json`):
- `/` and `/teaching` at 1440x900 and at the mobile preset (375x812);
- light and dark mode for both.

Audit script (it is in [claude.md](claude.md), "Verification checklist"). After scrolling the whole page, it lists visible text under 14px, text under WCAG AA contrast, and horizontal overflow.

| Run | Finding | Fix |
|---|---|---|
| `/teaching`, dark, 1440 | Footer strip "© 2026 Tuan (Tom) Tran" and "Built with Next.js & framer-motion" at 12px | Raised to `--fs-label` |
| `/`, light, 1440 | Tool tags under 4.5:1: Looker Studio 3.11, Powerpoint 3.84, Python 4.47 | `color-mix` darkening in `ToolTag` |
| `/`, light, 1440 | `//` typewriter prefix at 4.12:1 | `--pf-link` |
| `/`, light, 1440, rerun | No text under 14px, no horizontal scroll | n/a |
| `/teaching`, 375 | About paragraphs ran past the viewport edge, caused by a `nowrap` tag widening the grid column | `.tag` wraps; paragraph right edge measured at 355px on a 375px viewport |
| `/teaching`, 375 | Hero headline forced into three lines with "giúp bạn" alone | Line break only above 600px |
| `/teaching`, 1440 | About headline split "tiến / bộ" under `text-wrap: balance` | Shorter headline |
| `/`, 1440 | GitHub stat links underlined after the tile styles were flattened | `text-decoration: none` and a hover color |
| `/`, 375 | Stats labels uneven in two narrow columns | Stack at 480px and below |
| Both, 375 | `scrollWidth` equals `innerWidth` (no horizontal scroll) | n/a |

### Interaction checks

- Course modal: focused "Xem chi tiết khóa học" and pressed Enter. A `[role=dialog]` labelled "IELTS Basic" opened with focus inside it. A JavaScript `keydown` Escape closed it. The pane's own Escape key did not reach the hidden page, which is a tool limitation, not a page bug.
- Console: two `Failed to load resource: 400 (Bad Request)` errors. Their URL was not identified; they did not appear in the last 80 network requests, where every `_next` chunk, image and font returned 200 or 304. Worth checking (likely an external request such as the GitHub stats or contribution chart).

### Impeccable

- **Design hook:** ran after each CSS edit with Impeccable installed. One finding: `side-tab` on the blog blockquote. It was judged a false positive (a quote rule, not a card accent) and suppressed for `app/globals.css` only.
- **Detector on source** (`app/(teaching)`, `app/components/teaching`, `data/teaching`): 0 findings, exit 0. This pass is regex-only for `.js` files.
- **Detector on the rendered page** (`http://localhost:3000/teaching`):
  - `dark-glow` on `body` in dark mode: a false positive, because the detector reads the light-mode value of `--teach-shadow-hover`;
  - `unbalanced-heading` on the hero `h1` at 390px: advisory only.
- **In-page overlay (`detect.js`):** "No anti-patterns found" in light mode at 1440 and 375. Dark mode showed only `dark-glow`.
- **Critique of `/teaching`:** 21/32 (Acceptable), with heuristics 7 and 9 scored n/a. 0 P0, 3 P1, 2 P2. Saved in `.impeccable/critique/2026-11-15T06-57-02Z__app-teaching-teaching-page-js.md`.

### Not verified

- Reduced-motion paths (cursor off, tilt off, static typewriter, no hover scale) were written but not exercised with reduced motion emulated in a browser.
- No before/after `/impeccable audit` comparison. The plugin was installed after the refine, so there is no baseline run from before the changes.
- `/blog` and `/blog/[slug]` were built but only spot-checked visually.
- Screenshots from the in-app browser were sometimes stale. Results above rely on DOM measurements where the image and the DOM disagreed.

## Known remaining issues

From the `/teaching` critique:

- **[P1] Hero leads with a stock illustration and a generic headline ("chinh phục mọi kì thi").** The owner chose to keep the illustration, so the fix is the headline and a proof line.
- **[P1] Conversion end-point.**
  - The primary CTA is a Gmail web-compose link labelled with the address.
  - The Zalo button shows only a phone number.
  - There is no CTA on mobile after the hero.
- **[P1] Results are demoted.**
  - Quotes come first and results are small tags.
  - 4.9/5 has no source.
  - The 3/3/1 carousel leaves one card on the last page.
  - The IELTS modal shows a TOEIC review.
- **[P2] Course cards hide price and fit.**
  - Every card has the same "Thời lượng" row.
  - Two cards are marked "Phổ biến nhất".
  - The modal puts its CTA before the explanation.
- **[P2] Consistency.**
  - Brand and theme toggle collide on mobile.
  - Billing labels wrap.
  - The orange hover shadow in the dark modal stays orange.
- **Minor.**
  - Meet chrome is visible in the class photo.
  - Testimonial typos ("đuọc", "nhìều").
  - The testimonial subtitle restates its heading.
  - The English `<title>` sits on a Vietnamese page.
  - "Built with Next.js" appears in the teaching footer.
  - The custom cursor is on `/teaching`.
  - `PRODUCT.md` needs `/impeccable init` to match the current Impeccable schema.

The plan for these, in the owner's chosen order, is in [claude.md](claude.md) under "Open roadmap".


---

## Third pass: redesign of `/teaching` with live variants (2026-11-15)

Owner asked for a big change of design language and to roll variants to choose from. Scope: `/teaching` only, keep copy and prices. Everything else open.

### Process
1. Followed the Impeccable `new-work` flow. `concept-seed` dealt a direction; the owner's steer pinned the world in their own words (blackboard, name tag, notebook for course detail, palette 3 from their reference image, "traditional teaching plus AI-era UI"). Decision page options before the pin: boarding pass (assigned), exercise notebook (pick), deep dive, glass wall, plus declined terminal and angura poster (declined for a named reason: its rising-sun ray burst is a loaded symbol).
2. No image generation was available, so the build was code-led with HTML sketches. The direction contract is in `.impeccable/surfaces/app-teaching-teaching-page-js.md`.
3. Each section was rolled in live mode: three variants, owner picked, variant merged by hand into semantic classes in `globals.css`. The footer was rolled twice at the owner's request.

### Commits
| Commit | Change |
|---|---|
| `7244baa` | Zalo primary CTA, sticky Zalo bar (before the redesign) |
| `fe2e2f5`, `8532483`, `b812c1d` | course cards with art/level bar/price, hero copy, polish (before the redesign) |
| `c026dcf` | tokens to navy board, hero name card and chalk list, notebook modal |
| `deec4ca` | hero: notebook-page variant |
| `4b04f16` | course cards: featured paper card plus compact cards |
| `9f5fa38` | testimonials: featured story plus six compact |
| `7dd951a` | About: profile board with polaroid |
| `72cdcec` | CTA: paper slip; fixed the email button colour (secondary button took the board navy as background) |
| `049e09d` | footer: lanyard badge |
| `3e69092` | mobile pass |

### Verification
- Lint, build (Next.js 16.2.6) and the detector on source (0 findings) after each merge.
- Per section at 1440px: no text under 14px, no AA contrast failures, no horizontal overflow (DOM measurement).
- Mobile pass at 375 and 320px, dark mode: found and fixed (a) the sticky Zalo bar observed `document.querySelector("footer")`, which matched a `<footer>` inside a testimonial card, (b) 320px overflow from a long monospace email in the footer badge, (c) touch targets under 44px (footer badge links, back and burger buttons, open-details button), (d) "IELTS 7.5" wrapping in the name card, (e) oversized featured price and card art on phones.
- Course filter, level chooser, hero goal event and course modal checked by script.

### Known remaining issues
- **About stat "4.9★ Đánh giá trung bình"** and **testimonials #4 and #5 with identical result text** are unsourced or duplicated; owner has not decided.
- Two students in grade 8 and 9 are shown with photo, school and city; consent not confirmed.
- Compact course cards no longer show the description (only the featured card does).
- Card price is the group price while the format line can say 1-1; the 1-1 price is only inside the modal. Also still not stated on the page that lessons are online.
- Reduced-motion paths are written but were not exercised in a browser (the pane cannot emulate it).
- The `PRODUCT.md` schema still predates the current Impeccable (`/impeccable init` interviews the owner).
- `.impeccable/mocks/` (decision sketches) is gitignored.

### After the independent review (`567b48c`, next commit)
- Fixed: peach focus ring on paper (now navy), modal checkbox `color-scheme`, "từ X/tháng" in the hero list, mid-token wraps, monospace modal prices, 44px footer links, navy level-bar goal on the peach card.
- Owner decision: the footer badge no longer repeats the contact line and the 2-hour note; they live only on the CTA slip. Zalo and email links stay in both.
- Still open: the "Những buổi học thật" block (Class Moments) keeps the generic dark Meet screenshot and brown arrows; not yet rolled.
