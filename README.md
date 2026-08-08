# Tesla Archive

Plain HTML/CSS/JS site for XI-TESLA — Snaps, Scrolls, and Posts. No build step,
no framework, no server. Open `index.html` in a browser (via a local server,
not `file://`) or deploy the folder as-is to any static host.

## Running locally

You need a local server because sections and content load via `fetch()`, which
browsers block on `file://` URLs.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, VS Code's Live Server, etc).

## How content works

Unlike a framework-based site with one file per article, this site keeps all
content in a single file — **`data.js`** — as three plain arrays: `SNAPS`,
`SCROLLS`, `POSTS`. There's nothing to build; the page reads that file
directly in the browser and renders cards from it. This fits a static,
no-build-tool site much better than a folder-per-post setup would.

**To publish something new: open `data.js`, add an object to the right array,
save, and push.** Everything re-sorts (newest first) and re-renders itself —
no other file needs to change.

### Snaps — 1 photo + short caption
```js
{
  id: 'snap-unique-id',
  image: 'assets/snaps/your-photo.jpg',
  caption: 'One line about the photo.',
  date: '2026-08-05',
}
```
Shown as an Instagram-style grid on the Snaps page. Click a tile to open the
full-size lightbox (arrow keys / on-screen arrows to move between photos).

### Scrolls — 1 video + short caption
```js
{
  id: 'scroll-unique-id',
  video: 'assets/scrolls/your-video.mp4',
  caption: 'One line about the video.',
  date: '2026-08-05',
}
```
Shown as a TikTok-style vertical feed on the Scrolls page — one video fills
the frame, scroll to snap to the next. The video centered in view autoplays
(muted) automatically; tap a video to pause/play it manually. Use vertical
(9:16) video and keep file sizes reasonable — nothing compresses these for
you at build time, since there is no build step.

### Posts — title + description + tag, with 1 photo OR 1 video
```js
{
  id: 'post-unique-id',
  title: 'Headline goes here',
  description: 'A sentence or two of body text.',
  tag: 'Post',            // or 'PT - EffCom', or a new tag you add below
  image: 'assets/posts/your-photo.jpg',   // use this OR `video`, not both
  date: '2026-08-05',
}
```
Shown as a filterable feed on the Posts page. Filter pills at the top of the
page are generated from the `POST_TAGS` array in `data.js` — add a new tag
string there and a filter pill for it appears automatically.

Long `description` text is automatically shortened to a ~220-character
excerpt on the feed card (cut at the last whole word, never mid-sentence),
with a "Read more" link that opens the same fullscreen post view used
everywhere else — which always shows the full, untruncated text. This is
`getExcerpt()` in `index.js`; nothing to configure in `data.js`, it just
happens for anything over that length.

## Adding media files

Drop the actual image/video files anywhere under `assets/` (subfolders like
`assets/snaps/`, `assets/scrolls/`, `assets/posts/` keep things tidy) and
point the `image` / `video` field in `data.js` at that path. Everything in
`assets/` is served as-is.

The `assets/demo/` files are placeholder content so the site has something to
show out of the box — delete those entries from `data.js` (and the files,
if you like) once real content is in.

## Project structure

```
index.html            page shell — navbar, sidebar, home content, modal markup
index.css             all styling (design tokens at the top)
index.js              theme/nav logic + rendering for Snaps/Scrolls/Posts
data.js               ALL content — the only file you edit to publish
sections/
  snaps.html           empty grid container, filled in by index.js
  scrolls.html          empty feed container, filled in by index.js
  posts.html            empty feed + filter container, filled in by index.js
assets/                images, fonts, icons, and your media files
functions/
  _middleware.js        Cloudflare Pages Function — see "Cache-busting" below
_headers               Cache-Control rules for Cloudflare Pages
```

### How a page navigation works

Sidebar/home links carry a `data-page` attribute. Clicking one calls
`showPage()` in `index.js`, which:
1. Fetches `sections/<page>.html` once (cached after first load) and injects it.
2. Calls that page's renderer (`renderSnaps`, `renderScrolls`, or `renderPosts`
   in `index.js`), which reads from `data.js`, sorts newest-first (or filtered
   for Posts), and builds the DOM.
3. Swaps the `.active` page, highlights the matching sidebar link, and
   updates the address bar (see "URL scheme" below).

### URL scheme

The site is still a single `index.html` — there's no per-route file on
disk — but every page and every individual Snap/Scroll/Post gets its own
real, shareable, refresh-safe URL:

| Page          | URL                          |
|---------------|-------------------------------|
| Home          | `/` (or `/#`)                 |
| Tesla Snaps   | `/snaps`                      |
| Tesla Scrolls | `/scrolls`                    |
| Tesla Posts   | `/posts`                      |
| One Snap      | `/snaps/?snap=<token>`           |
| One Scroll    | `/scrolls/?scroll=<token>`       |
| One Post      | `/post/?post=<token>` *(singular "post", unlike the plural "/posts" grid)* |
| An author's page | `/author/?author=<token>` *(no grid of its own — only reached from a post)* |

`<token>` is **not** the `id` you set in data.js — it's a short opaque
string derived from it (`index.js` → `hashToken()`), so a shared link looks
like `?post=k2m84zh1r0a` instead of `?post=post2`. This keeps data.js
authoring simple (still just plain, readable ids like `'post1'`) while
keeping sequential/guessable ids out of anything a visitor actually sees —
no info leaks about how many items exist or their order just from poking
at the address bar. See the comment above `hashToken()` in `index.js` for
the honest limits of this (short version: it stops casual scraping, not a
determined attacker who reads the source — that's a static-site ceiling,
not something a hash can fix without a backend).

How it works, end to end:

1. **In-app navigation** — clicking a sidebar link, a grid thumbnail, or
   stepping prev/next through a lightbox calls `history.pushState()` (for
   opening something new) or `history.replaceState()` (for stepping
   through an already-open item), so the address bar always matches
   what's on screen. `window.addEventListener('popstate', ...)` re-syncs
   the DOM when the user hits the browser's Back/Forward buttons.
2. **Direct loads, refreshes, and shared links** — `index.js`'s
   `syncFromLocation()` runs once on boot, reads `location.pathname` and
   `location.search`, and puts the app straight into the matching state
   (e.g. Posts feed with the linked post already open). This is exactly
   what runs after a `popstate` too — one router, two triggers.
3. **The server side of clean URLs** — this project has no top-level
   `404.html`, which makes Cloudflare Pages treat it as a single-page app
   by default: any request path that isn't a real file (`/snaps`,
   `/post/?post=xyz`, etc.) transparently gets served this same
   `index.html`, with the URL in the browser's address bar left
   untouched. **Don't add a `404.html` to this project** unless you also
   add a `_redirects` rule (`/* /index.html 200`) to replace this default
   behavior — otherwise every clean URL above will 404 on a direct
   load/refresh, even though in-app clicks would still work fine.
4. `functions/_middleware.js` (see "Cache-busting" below) recognizes these
   same clean routes as "the app shell" so they get version-stamped and
   `no-cache`d exactly like `/` and `/index.html` already were.

Snaps/Scrolls/Posts author pages (reached by tapping an author on a post)
are intentionally left out of this scheme — they're not a sidebar
destination and don't get their own URL, same as before.

### Theme

Dark/light toggle lives in the top navbar. Preference is saved in
`localStorage` per visitor; defaults to light on first visit.

## Sharing previews (Open Graph / Twitter Card)

When a link to this site is pasted into Slack/Discord/iMessage/Twitter/etc,
the preview image isn't a flat icon — it's a **generated card** styled
after this site's own `.post-card` UI: a small seal + "TESLA ARCHIVE"
wordmark on top, then (for a specific shared item) the same author row /
title / description you'd see in the app itself, all left-aligned on a
dark card. Same mechanism as ChromaX's `?c=HEX` → generated-PNG preview,
adapted from "one color, one generated card" to "one shared Snap/Scroll/
Post, one generated card":

- `functions/og.png.js` — renders the 1200×630 card via
  `@cloudflare/pages-plugin-vercel-og`'s `ImageResponse` (a satori-based
  renderer — same package ChromaX uses). Takes `?cat=snaps|scrolls|posts`
  and an optional `?id=<token>`.
- `functions/_middleware.js` — rewrites `og:image`/`twitter:image` to
  point at `/og.png?cat=...&id=...` (and `og:title`/`og:description`/
  `<title>`/canonical to match) whenever the requested URL is a Snaps,
  Scrolls, or Posts page or permalink. `/` and anything unrecognized keep
  the static default tags in `index.html`'s `<head>` (falls back to
  `assets/seal.png`).
- `functions/_shared/content.js` — parsing helpers both of the above
  import. `data.js` is plain hand-authored JS, not JSON, and Workers won't
  `eval()` strings — so this walks the text by hand (strip comments,
  bracket-match the array/object blocks, pull quoted fields out with
  small regexes) instead. The same `hashToken()` used client-side in
  `index.js` re-hashes every id here too, so a shared link's opaque token
  (`?post=k2m84zh1r0a`) can be matched back to the actual entry.

| URL you shared | Card shows |
|---|---|
| `/` (home) | static seal, default title |
| `/snaps`, `/snaps/?snap=<token>` | "Tesla Snaps" + that snap's caption, if the token resolves |
| `/scrolls`, `/scrolls/?scroll=<token>` | "Tesla Scrolls" + that scroll's caption |
| `/posts`, `/post/?post=<token>` | that post's own author avatar/name, colored tag pill, date, title, and a trimmed excerpt — or the "Tesla Posts" default if no token/it doesn't resolve |

If `og.png.js` ever fails to parse `data.js` or render (any exception, not
just a bad token), it 302-redirects to the flat static seal in
`assets/icons/` instead of 500ing — a broken parse never breaks a link
preview, it just falls back to a plainer image.

**Adding a fourth category:** add an entry to `CATEGORY_META` in
`functions/_shared/content.js` (label, description, seal filename, query
param, and the `data.js` array name), update `detectCategory()`'s path
check, and add a branch in `og.png.js`'s `renderCard()` for how that
category's card should look.

## Cache-busting

The site is a handful of files with no build step, so a browser can easily
end up holding onto a stale `index.js` or `index.css` from a previous visit
— especially on repeat visitors, since browsers cache aggressively by
default. `functions/_middleware.js` fixes this with no manual steps:

1. Cloudflare Pages sets `CF_PAGES_COMMIT_SHA` automatically on every
   deploy — the current build's git commit hash. No config, nothing to
   remember to bump.
2. The middleware intercepts requests for the page shell (`/` and
   `/index.html`) and rewrites the `<link href="index.css">` and
   `<script src="...">` tags to append `?v=<commit-sha>`, and drops a
   `<meta name="asset-version">` tag into `<head>` carrying the same value.
3. `index.js` reads that meta tag (`withVersion()` near the top of the
   file) and appends the same `?v=` to its own `fetch()` calls for
   `sections/*.html`.
4. `_headers` tells the browser to cache everything (`/*`) essentially
   forever (`max-age=31536000, immutable`) — safe, because a new deploy
   means a new `?v=` and therefore a *new URL*, which can never collide
   with something already in cache. Only the shell itself (`/`,
   `/index.html`) and `/sections/*` stay `no-cache`, since those are the
   small entry points that need to always be revalidated.

Net effect: push a change, and every visitor gets it on their very next
load — no hard-refreshing, no cache-clearing, no version numbers to bump
by hand.

**Media files** (`assets/snaps/*`, `assets/scrolls/*`, `assets/posts/*`,
etc.) are deliberately *not* versioned this way — per the workflow above,
a new post always points at a new filename, so each file's URL is already
unique and safe to cache forever. If you ever reuse a filename to replace
existing media, rename it instead so viewers aren't served the old cached
copy.

**Portability note:** this mechanism is Cloudflare Pages–specific (it
relies on Pages Functions and `CF_PAGES_COMMIT_SHA`). Deployed elsewhere
(Netlify, GitHub Pages, a plain static host), `functions/` is simply
ignored, `asset-version` is never set, and the site works exactly as
before — you just lose the automatic cache-busting on that host.

## Deploying

Any static host works (Cloudflare Pages, Netlify, GitHub Pages). No build
command needed — just point the host at this folder as the publish
directory. The cache-busting described above only activates on Cloudflare
Pages; other hosts serve the same files without it.