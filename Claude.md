# Local instructions for Claude

Project: static website for CASA MIA Coffee & Brunch.
Location: `SITIO_WEB`.

## Context

This project is a static website built with:
- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5 via CDN

It is not a modern JavaScript framework application and does not require Node.js to run. The design relies on separate CSS files for utilities, components, and responsive styles.
The main HTML file is `index.html`, and the site is completed by the static pages in `pages/`.

## Important structure

- `index.html` (main landing page)
- `pages/menu.html`
- `pages/nosotros.html`
- `pages/contacto.html`
- `css/main.css`
- `css/components.css`
- `css/responsive.css`
- `js/main.js`
- `js/animations.js`
- `js/components.js`
- `assets/images/`
- `assets/icons/`

## Project-specific notes

- `js/main.js` handles header scroll state, mobile navigation toggling, and footer year injection.
- `js/animations.js` handles scroll reveal animations and drag-scroll behavior for horizontal carousel sections.
- `js/components.js` handles accordion toggles, local contact form validation, and the gallery lightbox (`pages/nosotros.html` only).
- The contact form is not connected to a backend; the current behavior is client-side only.
- The page uses `lang="es-MX"` and brand copy in Spanish. Keep content and tone consistent with the site voice.
- The site includes a mobile menu with accessible aria-expanded handling and a skip-link for keyboard users.
- Display font is `Instrument Serif` (via Google Fonts, `--font-display` in `css/main.css`); body font is `Jost` (`--font-body`). Instrument Serif only ships weight 400, so headings use `font-weight: 400`.
- The homepage location section uses a static photo (`assets/images/fachada-letrero.jpg`) with an "Abrir en Google Maps" link instead of an embedded map; the Google Maps iframe embed is only used in `pages/contacto.html`.
- Horizontal scroll carousels (`.menu-scroll`, `.social-scroll`) use CSS scroll-snap; they need `scroll-padding-inline` matching their side padding, or the first card loads partially scrolled out of view.
- `.menu-scroll`/`.social-scroll` are NOT nested inside a `.container` (they're direct children of `.menu-board`/`.social-wall`, siblings to the `.container` divs). Do not add `margin-inline: calc(var(--gutter) * -1)` to them — that trick only makes sense to cancel out an ancestor `.container`'s padding; without one, it just pulls the first card flush to the viewport edge instead of aligning it with the rest of the site's gutter (this was a real bug, already removed). The existing `padding-inline: clamp(1.25rem, 4vw, 3rem)` alone is what keeps them aligned with `--gutter`.
- Both carousels have more cards than fit in one viewport, so at rest the right edge always cuts into a card mid-way — that's inherent to any horizontal scroll with overflow content, not something padding/margin can fix (the "Desliza para ver más" hint exists because of it). `.menu-scroll`/`.social-scroll` use a `mask-image`/`-webkit-mask-image` linear-gradient to fade that cut-off edge into the background instead of a hard stop. Keep the fade's right-side stop (`calc(100% - 4.5rem)`) roughly matched between both carousels; the left-side stop just covers the padding zone and never touches the first card.
- Do not leave `*-audit-temp.html` or similar throwaway copies committed in `pages/` or the project root — these are only for local screenshot verification and must be deleted afterward.
- `.mobile-nav` needs `padding-top` large enough to clear the fixed header (currently `6.5rem`) plus `overflow-y: auto`, otherwise the first nav item renders clipped behind the header.
- The map pin (`.map-pin`, reused in `index.html`'s location photo and `pages/contacto.html`'s map iframe) is a CSS/SVG teardrop overlay in `--cm-terracotta`, not a Google Maps custom marker — the contacto.html map is a plain `output=embed` iframe with no JS API access.
- The `.timeline` component (`pages/nosotros.html`, "Momentos que nos definen") lives inside `.menu-board`, a dark-background section. Its `h4`/`p`/connector-line colors are explicitly overridden to light values in `css/components.css` — do not remove those overrides or copy the base `h1,h2,h3,h4{color:var(--cm-walnut-dark)}` rule onto it, since that dark color is invisible against the dark background (this caused a real contrast bug, already fixed).
- Full responsive pass (desktop/tablet/mobile) completed on all 4 pages with no other layout bugs found; browser console is clean of real JS errors on all pages.
- `body.nav-open .site-header.is-scrolled` is overridden in `css/components.css` to force the transparent/light-icon "unscrolled" look while the mobile menu is open — without it, opening the menu after scrolling left a light frosted header bar with a dark (invisible) close icon floating over the dark `.mobile-nav` overlay. Keep this rule if `.site-header`'s scrolled styles ever change.
- `js/main.js`'s mobile nav closes on Escape (returns focus to the toggle button) in addition to closing on link click and re-clicking the toggle.
- The header/footer/hero-badge brand mark is `assets/icons/logo-mascota.png` (class `.brand-mark`), generated from the client's real logo (`recursos/logo.jpg`, outside `SITIO_WEB`) with the white background knocked out to transparency and recolored to `--cm-terracotta`, so it reads on both the dark unscrolled header and the light scrolled header. Do not confuse this with `.mascot-mark` — that's a separate, still-in-use class for unrelated stroke-based functional icons (pin, clock, camera, checkmarks). If the source logo ever changes, regenerate this PNG the same way (luminance-based alpha, not a plain image swap) rather than dropping in a flat JPG.
- Font sizes across `main.css`/`components.css` were bumped ~8-12% site-wide for legibility (body copy was previously .82-.95rem at font-weight 300). Keep new text additions in line with the current scale rather than the old smaller values.
- The "Un vistazo a CASA MIA" gallery (`pages/nosotros.html`) opens a lightbox on click: each photo is a `<button class="gallery-item g-X">` (not a bare `<img>`, needed for native keyboard/click support) wrapping the `<img>`; the grid span classes (`g-a`...`g-f`) moved from the `<img>` to the `<button>`. The lightbox markup (`#galleryLightbox`, `.lightbox`) lives once as a top-level sibling of `<footer>`, styled in `components.css` and driven by `js/components.js` (`[data-lightbox-gallery]` on `.gallery-mosaic`). Supports close button / Escape / backdrop click, prev/next buttons and arrow keys (wraps around), locks body scroll via `body.lightbox-open`, and returns focus to the clicked thumbnail on close. No external library. If more photos are added to the gallery, no JS changes are needed — it reads `.gallery-item` elements dynamically.
- `pages/nosotros.html`'s gallery section must use `class="moments"` (not `class="experience"`, which has no CSS rule and silently collapses to zero vertical padding — this previously made the CTA section below look like it was overlapping the gallery). `.gallery-mosaic` needs `grid-auto-flow: dense` on desktop/tablet-4col layouts with mixed image spans, or sparse auto-placement leaves visible gaps; at the 900px breakpoint all 6 photos are full-width (single column) rather than pairing the 3 half-width ones, since an odd count of half-width items always leaves one dangling with an empty gap next to it.

## Working rules

- Keep the focus on HTML, CSS, and vanilla JavaScript.
- Respect the existing architecture; do not rewrite the project in a new framework.
- Do not add new dependencies without a clear and explicit reason.
- Preserve visual consistency and the file structure.
- Prioritize accessibility, semantics, and best practices.
- Avoid unnecessary design changes when making code improvements.

## What to avoid

- Do not convert the site to React, Vue, Svelte, or another framework.
- Do not move files outside the current structure without reason.
- Do not use external libraries if the functionality can be achieved with native JavaScript.
- Do not remove or replace the `data-reveal` and `data-drag-scroll` behavior unless a better native solution is required.

## Known pending content

- Menu prices and details may still require client confirmation.
- Exact business hours should be verified; the current site may reference the brand's Instagram as the live source.
- Phone or WhatsApp contact information is not present in the original resources.

## How to preview

The site can be opened directly in the browser or served with a static server.

```bash
npx serve .
```
