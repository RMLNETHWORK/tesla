// ---- Helpers ----

// Reads the version stamp that functions/_middleware.js injects into
// <head> on every deploy (the current git commit SHA). Returns null when
// running somewhere that stamp isn't present — a plain static host, or a
// local `python3 -m http.server` with no Pages Functions running — in
// which case withVersion() below is a harmless no-op and the site behaves
// exactly as it did before this change.
function assetVersion() {
  const meta = document.querySelector('meta[name="asset-version"]');
  return meta ? meta.content : null;
}

// Appends the current deploy's version stamp to a same-origin URL, so a
// fetch always targets the exact bytes that shipped with today's deploy —
// never a copy the browser cached from a previous one.
function withVersion(path) {
  const v = assetVersion();
  if (!v) return path;
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${v}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Converts a "7:59 AM" / "07:59 AM" style time-of-day into 24-hour
// "HH:MM" so it can be spliced into an ISO datetime string below.
function parseTimeOfDay(timeStr) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(String(timeStr).trim());
  if (!match) return '00:00';
  let [, hours, minutes, meridiem] = match;
  hours = parseInt(hours, 10);
  if (/PM/i.test(meridiem) && hours !== 12) hours += 12;
  if (/AM/i.test(meridiem) && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

// Snaps/Scrolls only carry a date; Posts also carry a time-of-day string
// (e.g. '07:59 AM'). Sorting by date alone ties everything published on
// the same day and falls back to array order, which can put an earlier
// post above a later one from the same day. Folding in the time (when
// present) breaks that tie correctly; items without one just sort as
// midnight, i.e. unchanged relative to each other.
function getTimestamp(item) {
  const time = item.time ? parseTimeOfDay(item.time) : '00:00';
  return new Date(`${item.date}T${time}`).getTime();
}

function byNewestFirst(a, b) {
  return getTimestamp(b) - getTimestamp(a);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Picks readable text (black or white) for a given background color, so
// tag colors set in data.js always stay legible.
function getContrastText(color) {
  const probe = document.createElement('div');
  probe.style.color = color;
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  const match = computed.match(/\d+/g);
  if (!match) return '#ffffff';
  const [r, g, b] = match.map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#1a1a1a' : '#ffffff';
}

function tagColor(tag) {
  return (typeof POST_TAGS === 'object' && POST_TAGS[tag]) ? POST_TAGS[tag] : 'var(--primary)';
}

// ---- Theme handling ----
const themeSwitch = document.getElementById('themeSwitch');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeSwitch.textContent = '☀️';
  } else {
    root.removeAttribute('data-theme');
    themeSwitch.textContent = '🌙';
  }
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeSwitch.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// ---- Sidebar toggle (mobile) ----
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('overlay');

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', closeSidebar);

// ---------------------------------------------------------------------------
// PAGE NAVIGATION & ROUTING — every page and every shareable item gets a
// real, clean URL (see README → "URL scheme"). This works for direct
// loads/refreshes/shared links too, not just in-app clicks: Cloudflare
// Pages' default single-page-app behavior (this project has no top-level
// 404.html) serves this same index.html for any path that isn't a real
// file, so the router just needs to read location on boot and re-derive
// the right view — see syncFromLocation() near the end of this file.
// ---------------------------------------------------------------------------
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const loadedSections = new Set(['home']); // home is inline, already loaded

const SECTION_RENDERERS = {
  snaps: renderSnaps,
  scrolls: renderScrolls,
  posts: renderPosts,
};

// Grid path for each page, and — for the pages with a permalink-able
// individual item — the item's own path and the query param it reads.
// NOTE: posts' item path is deliberately the singular "/post/", distinct
// from the plural "/posts" grid path. Authors have no grid of their own
// (no `path`) — only ever reached as an item, from a post.
const ROUTES = {
  home: { path: '/' },
  snaps: { path: '/snaps', itemPath: '/snaps/', itemParam: 'snap' },
  scrolls: { path: '/scrolls', itemPath: '/scrolls/', itemParam: 'scroll' },
  posts: { path: '/posts', itemPath: '/post/', itemParam: 'post' },
  author: { itemPath: '/author/', itemParam: 'author' },
};

// ---------------------------------------------------------------------------
// URL TOKENS — the `id` in data.js stays a plain, easy-to-type slug
// ('post1', 'snap-2') for whoever's editing data.js; the value that
// actually appears in a shared URL is a short opaque token derived from
// it instead — YouTube-style ("?post=k2m84zh1r") rather than
// ("?post=post2"), so a link doesn't advertise a sequential/guessable id
// or how many items exist.
//
// Honest caveat, since "hashed" can sound stronger than it is: this is
// obfuscation, not real security. hashToken() below ships in plain text
// in this same file to every visitor's browser, so it's not a secret —
// anyone can open devtools and compute hashToken('post2') themselves in
// one line, no "cracking" required. What it DOES meaningfully stop is
// casual enumeration/scraping: nobody idly typing ?post=2, ?post=3 into
// the address bar, and no info leaking about ordering or total count from
// the URL alone. If an id genuinely needs to be unguessable even by
// someone willing to read this file, set that item's `id` in data.js to a
// long random string instead of a short word+number — hashing a random
// id is exactly as unguessable as the random id already was.
function hashToken(str) {
  // cyrb53 (public domain) — small, dependency-free, well-distributed.
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const combined = 4294967296 * (2097151 & h2) + (h1 >>> 0); // 53-bit int
  return combined.toString(36).padStart(11, '0');
}

// One { toToken, fromToken } pair per id-space (ids only need to be
// unique within their own collection — see data.js — so each collection
// gets its own map rather than one shared one).
function buildTokenMap(ids) {
  const toToken = new Map();
  const fromToken = new Map();
  ids.forEach(id => {
    const token = hashToken(id);
    if (fromToken.has(token)) {
      // astronomically unlikely at this id count, but fail loud rather
      // than silently pointing two items at the same shared link
      console.warn(`hashToken collision between "${fromToken.get(token)}" and "${id}" — rename one id in data.js`);
    }
    toToken.set(id, token);
    fromToken.set(token, id);
  });
  return { toToken, fromToken };
}

const TOKEN_MAPS = {
  snaps: buildTokenMap(SNAPS.map(s => s.id)),
  scrolls: buildTokenMap(SCROLLS.map(s => s.id)),
  posts: buildTokenMap(POSTS.map(p => p.id)),
  author: buildTokenMap(Object.keys(AUTHORS)),
};

function gridUrl(pageId) {
  return (ROUTES[pageId] && ROUTES[pageId].path) || '/';
}

// Builds the shareable URL for one item, using its token rather than its
// raw data.js id (see TOKEN_MAPS above). Falls back to the raw id if it's
// somehow not in the map (e.g. called with a stale/unknown id) so a share
// action never just silently fails.
function itemUrl(pageId, id) {
  const route = ROUTES[pageId];
  if (!route || !route.itemPath) return gridUrl(pageId);
  const map = TOKEN_MAPS[pageId];
  const token = (map && map.toToken.get(id)) || id;
  return `${route.itemPath}?${route.itemParam}=${encodeURIComponent(token)}`;
}

// Reverses a URL token back to the real data.js id for a given
// collection. Returns null for an unrecognized token (deep link to a
// removed item, a typo, someone poking at the URL) rather than throwing.
function idFromToken(pageId, token) {
  const map = TOKEN_MAPS[pageId];
  return (token && map && map.fromToken.get(token)) || null;
}

async function loadSection(pageId) {
  if (loadedSections.has(pageId)) return;

  const section = document.getElementById(pageId);
  if (!section || pageId === 'home') return; // home content is inline

  try {
    const response = await fetch(withVersion(`sections/${pageId}.html`));

    if (!response.ok) throw new Error(`Failed to load ${pageId}`);

    const html = await response.text();
    section.innerHTML = html;
    loadedSections.add(pageId);

    if (SECTION_RENDERERS[pageId]) {
      SECTION_RENDERERS[pageId]();
    }
  } catch (error) {
    console.error(error);
    section.innerHTML = '<p>Failed to load content.</p>';
  }
}

// Shows a grid page (home/snaps/scrolls/posts). `push: false` is used when
// the caller is just syncing the DOM to a URL that's already correct
// (initial load, popstate, closing an item's modal) so it doesn't create a
// duplicate/incorrect history entry.
async function showPage(pageId, { push = true } = {}) {
  await loadSection(pageId);

  pages.forEach(p => p.classList.remove('active'));
  const section = document.getElementById(pageId);
  if (section) section.classList.add('active');

  navLinks.forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.nav-link[data-page="${pageId}"]`).forEach(l => l.classList.add('active'));

  // leaving Scrolls entirely closes the fullscreen viewer and resets it
  if (pageId !== 'scrolls') closeScrollsViewer({ silent: true });

  if (push) history.pushState({ pageId }, '', gridUrl(pageId));

  if (window.innerWidth <= 850) closeSidebar();
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(link.getAttribute('data-page'));
  });
});

// ---- Home shortcut thumbnails — latest Snap / latest Scroll as background ----
// (Posts intentionally excluded — its shortcut keeps the plain icon card.)
function renderHomeShortcutThumbnails() {
  const latestSnap = [...SNAPS].sort(byNewestFirst)[0];
  const snapMedia = document.getElementById('homeShortcutSnapsMedia');
  if (latestSnap && snapMedia) {
    snapMedia.innerHTML = `<img src="${escapeHtml(latestSnap.image)}" alt="" />`;
  }

  const latestScroll = [...SCROLLS].sort(byNewestFirst)[0];
  const scrollMedia = document.getElementById('homeShortcutScrollsMedia');
  if (latestScroll && scrollMedia) {
    scrollMedia.innerHTML = `<video src="${escapeHtml(latestScroll.video)}" muted loop playsinline preload="metadata"></video>`;
    const video = scrollMedia.querySelector('video');
    forcePosterFrame(video);
    video.play().catch(() => {}); // muted autoplay as a subtle looping preview; harmless if blocked
  }
}

renderHomeShortcutThumbnails();

// ---------------------------------------------------------------------------
// SNAPS — Instagram-style grid + lightbox
// ---------------------------------------------------------------------------
let snapItems = [];
let snapModalIndex = 0;

function renderSnaps() {
  const grid = document.getElementById('snapsGrid');
  const empty = document.getElementById('snapsEmpty');
  if (!grid) return;

  snapItems = [...SNAPS].sort(byNewestFirst);

  if (snapItems.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = snapItems.map((snap, i) => `
    <div class="gallery-item" data-index="${i}">
      <div class="gallery-image-wrapper">
        <img src="${escapeHtml(snap.image)}" alt="${escapeHtml(snap.caption)}" loading="lazy" />
      </div>
      <div class="gallery-caption">
        ${escapeHtml(snap.caption)}
        <span class="gallery-date">${formatDate(snap.date)}</span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openSnapModal(Number(item.dataset.index)));
  });
}

const snapModal = document.getElementById('snapModal');
const snapModalImg = document.getElementById('snapModalImg');
const snapModalCaption = document.getElementById('snapModalCaption');

// Tracks whether the currently-open snap got there via our own pushState
// (a grid tap) — if so, its close button can call history.back() to
// unwind that entry cleanly. A direct load / shared link has nothing of
// ours to go back to, so close falls back to replacing the URL with the
// grid's instead. See the identical pattern on Scrolls/Posts below.
let snapOpenedViaPush = false;

function openSnapModal(index, { push = true } = {}) {
  snapModalIndex = index;

  const snap = snapItems[index];
  if (push && snap) {
    history.pushState({ modal: 'snap', id: snap.id }, '', itemUrl('snaps', snap.id));
    snapOpenedViaPush = true;
  } else {
    snapOpenedViaPush = false;
  }

  updateSnapModal();
  snapModal.classList.add('active');
}

function updateSnapModal() {
  const snap = snapItems[snapModalIndex];
  if (!snap) return;
  snapModalImg.src = snap.image;
  snapModalImg.alt = snap.caption;
  snapModalCaption.textContent = `${snap.caption} — ${formatDate(snap.date)}`;
  // keep the address bar pointed at whichever snap is showing, same as
  // stepping prev/next through the Posts modal does
  history.replaceState({ modal: 'snap', id: snap.id }, '', itemUrl('snaps', snap.id));
}

// `silent: true` is used when something else already owns the URL change
// (leaving the Snaps page entirely, the router syncing to a new location)
// — it just hides the modal without touching history.
function closeSnapModal({ silent = false } = {}) {
  if (!snapModal.classList.contains('active')) return;
  snapModal.classList.remove('active');

  if (!silent) {
    if (snapOpenedViaPush) history.back();
    else history.replaceState(null, '', gridUrl('snaps'));
  }
  snapOpenedViaPush = false;
}

document.getElementById('snapModalClose').addEventListener('click', closeSnapModal);
document.getElementById('snapModalPrev').addEventListener('click', () => {
  snapModalIndex = (snapModalIndex - 1 + snapItems.length) % snapItems.length;
  updateSnapModal();
});
document.getElementById('snapModalNext').addEventListener('click', () => {
  snapModalIndex = (snapModalIndex + 1) % snapItems.length;
  updateSnapModal();
});
snapModal.addEventListener('click', (e) => {
  if (e.target === snapModal) closeSnapModal();
});
document.addEventListener('keydown', (e) => {
  if (!snapModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeSnapModal();
  if (e.key === 'ArrowLeft') document.getElementById('snapModalPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('snapModalNext').click();
});

// ---------------------------------------------------------------------------
// SCROLLS — grid of tiles (like Snaps) that opens a fullscreen vertical
// viewer, TikTok/Reels/Shorts-style: one video fills the screen at a time,
// autoplays while centered, and resets to frame 0 the moment you scroll
// past it or close the viewer.
// ---------------------------------------------------------------------------
let scrollDataItems = [];

function forcePosterFrame(video) {
  // Some browsers won't paint a frame for preload="metadata" video until
  // it's nudged forward a hair — this makes the grid tile show something
  // other than a black box.
  const showFrame = () => {
    try { video.currentTime = 0.05; } catch (_) {}
  };
  if (video.readyState >= 1) showFrame();
  else video.addEventListener('loadedmetadata', showFrame, { once: true });
}

function renderScrolls() {
  const grid = document.getElementById('scrollsGrid');
  const empty = document.getElementById('scrollsEmpty');
  if (!grid) return;

  scrollDataItems = [...SCROLLS].sort(byNewestFirst);

  if (scrollDataItems.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = scrollDataItems.map((scroll, i) => `
    <div class="scroll-tile" data-index="${i}">
      <div class="scroll-tile-media">
        <video src="${escapeHtml(scroll.video)}" muted playsinline preload="metadata"></video>
        <span class="scroll-tile-play">&#9654;</span>
      </div>
      <div class="scroll-tile-caption">
        ${escapeHtml(scroll.caption)}
        <span class="gallery-date">${formatDate(scroll.date)}</span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.scroll-tile video').forEach(forcePosterFrame);

  grid.querySelectorAll('.scroll-tile').forEach(tile => {
    tile.addEventListener('click', () => openScrollsViewer(Number(tile.dataset.index)));
  });
}

// --- fullscreen vertical viewer ---
const scrollsModal = document.getElementById('scrollsModal');
const scrollsViewerContainer = document.getElementById('scrollsViewerContainer');
let scrollsViewerObserver = null;

function resetScrollItem(item) {
  const video = item.querySelector('video');
  if (!video) return;
  video.pause();
  video.currentTime = 0;
  item.classList.add('paused');
}

// Same "did we push this ourselves" tracking as Snaps — see there for why.
let scrollsOpenedViaPush = false;

function openScrollsViewer(index, { push = true } = {}) {
  scrollsViewerContainer.innerHTML = scrollDataItems.map((scroll, i) => `
    <div class="scroll-item" data-index="${i}">
      <video src="${escapeHtml(scroll.video)}" loop muted playsinline controls preload="metadata"></video>
      <span class="scroll-play-icon">&#9654;</span>
      <span class="scroll-counter">${i + 1} / ${scrollDataItems.length}</span>
      <div class="scroll-caption">
        <p>${escapeHtml(scroll.caption)}</p>
        <span class="gallery-date">${formatDate(scroll.date)}</span>
      </div>
    </div>
  `).join('');

  const items = [...scrollsViewerContainer.querySelectorAll('.scroll-item')];

  // native controls handle play/pause directly on the video element;
  // this just keeps the big center icon in sync for a tap-to-pause feel
  // outside of the control bar.
  items.forEach(item => {
    const video = item.querySelector('video');
    video.addEventListener('play', () => item.classList.remove('paused'));
    video.addEventListener('pause', () => item.classList.add('paused'));
  });

  if (scrollsViewerObserver) scrollsViewerObserver.disconnect();
  scrollsViewerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video');
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        video.play().catch(() => {});
        // keep the address bar in sync with whichever scroll is currently
        // centered — same idea as stepping through the Posts/Snaps modals
        const i = Number(entry.target.dataset.index);
        const scroll = scrollDataItems[i];
        if (scroll) history.replaceState({ modal: 'scroll', id: scroll.id }, '', itemUrl('scrolls', scroll.id));
      } else {
        // scrolled away — reset to the first frame, like TikTok/Shorts/Reels
        resetScrollItem(entry.target);
      }
    });
  }, { root: scrollsViewerContainer, threshold: [0, 0.6, 1] });

  items.forEach(item => scrollsViewerObserver.observe(item));

  scrollsModal.classList.add('active');

  // jump straight to the tapped video, no smooth-scroll animation
  const target = items[index];
  if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });

  const scroll = scrollDataItems[index];
  if (push && scroll) {
    history.pushState({ modal: 'scroll', id: scroll.id }, '', itemUrl('scrolls', scroll.id));
    scrollsOpenedViaPush = true;
  } else {
    scrollsOpenedViaPush = false;
  }
}

function closeScrollsViewer({ silent = false } = {}) {
  if (!scrollsModal.classList.contains('active')) return;
  scrollsViewerContainer.querySelectorAll('.scroll-item').forEach(resetScrollItem);
  if (scrollsViewerObserver) scrollsViewerObserver.disconnect();
  scrollsModal.classList.remove('active');

  if (!silent) {
    if (scrollsOpenedViaPush) history.back();
    else history.replaceState(null, '', gridUrl('scrolls'));
  }
  scrollsOpenedViaPush = false;
}

document.getElementById('scrollsModalClose').addEventListener('click', closeScrollsViewer);
scrollsModal.addEventListener('click', (e) => {
  if (e.target === scrollsModal) closeScrollsViewer();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && scrollsModal.classList.contains('active')) closeScrollsViewer();
});

// ---------------------------------------------------------------------------
// POSTS — filterable feed, card-style with colors set per-tag in data.js
// ---------------------------------------------------------------------------
let activePostTag = 'All';

const SHARE_ICON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/></svg>';

function getAuthor(id) {
  return (typeof AUTHORS === 'object' && AUTHORS[id]) || { name: 'Unknown Author', avatar: 'assets/seal.png' };
}

// Profile picture shown on a post: a post's own `avatar` (set manually per
// post in data.js) always wins over the author's default avatar, so the
// same author can show a different picture on different posts. Falls back
// to the author's avatar, then the default seal, if the post has none set.
function postAvatar(post, author) {
  return post.avatar || author.avatar || 'assets/seal.png';
}

// ---- Share link helpers — Posts only; Snaps/Scrolls have no share UI ----

// Builds an absolute, shareable permalink to one specific post, e.g.
// https://tesla.lynxzora.online/post/?post=<id> — see ROUTES/itemUrl above
// for the URL scheme. Built from `location.origin`, not a hardcoded
// domain, so it resolves correctly wherever the site is actually deployed.
function getPostShareUrl(post) {
  return new URL(itemUrl('posts', post.id), location.origin).toString();
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('shareToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // fall through to the legacy path below
    }
  }
  // Legacy fallback for browsers/contexts without the async Clipboard API
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
  document.body.removeChild(textarea);
  return ok;
}

// Native share sheet on mobile (Web Share API); falls back to copying the
// link to the clipboard everywhere else, with a toast confirming it.
//
// Deliberately does NOT hand over the post's full description as share
// text — that's the whole article body, and most share targets (Messages,
// X, etc.) paste "text" straight into the message, dumping the entire
// post where a short blurb belongs. Instead we build one friendly line
// naming the author and the title.
function getShareText(post) {
  const author = getAuthor(post.author);
  return `${author.name} on TeslaArchive: "${post.title}"`;
}

async function sharePost(post) {
  const url = getPostShareUrl(post);
  const text = getShareText(post);

  if (navigator.share) {
    try {
      await navigator.share({ title: post.title, text, url });
    } catch (err) {
      if (err && err.name === 'AbortError') return; // user closed the share sheet — not an error
      const copied = await copyToClipboard(`${text}\n${url}`);
      showToast(copied ? 'Link copied!' : 'Could not copy link');
    }
    return;
  }

  const copied = await copyToClipboard(`${text}\n${url}`);
  showToast(copied ? 'Link copied!' : 'Could not copy link');
}

// Feed cards show a short excerpt instead of the full article so the Posts
// page doesn't turn into a wall of text; "Read more" opens the same
// fullscreen post modal used everywhere else (tapping the image or body
// already does this — see bindPostCardEvents), which still shows the full,
// untruncated description. This function only ever touches feed/card markup.
const EXCERPT_LENGTH = 220; // characters — roughly 2–3 lines at the feed's font size

function getExcerpt(text, maxLength = EXCERPT_LENGTH) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return { text: clean, truncated: false };

  // Cut at the last whole word before the limit so the excerpt doesn't end
  // mid-word.
  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  const excerpt = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim();
  return { text: excerpt, truncated: true };
}

// Shared markup for a single post card — used on both the Posts feed and an
// author's own page. Media sits above the title/description; the author row
// is its own clickable control, separate from the media/body click targets.
function postCardHtml(post) {
  const color = tagColor(post.tag);
  const author = getAuthor(post.author);
  const media = post.video
    ? `<video class="post-media" src="${escapeHtml(post.video)}" controls playsinline preload="metadata"></video>`
    : post.image
      ? `<img class="post-media" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy" />`
      : '';

  const { text: excerptText, truncated } = getExcerpt(post.description);
  // The button is just a visual cue — it sits inside .post-body, which
  // already opens the post modal on click (see bindPostCardEvents), so the
  // click naturally bubbles there with no extra wiring needed.
  const readMore = truncated ? '&hellip; <button class="read-more" type="button">Read more</button>' : '';

  return `
    <article class="post-card">
      <div class="post-header">
        <button class="post-author" type="button" data-author="${escapeHtml((TOKEN_MAPS.author.toToken.get(post.author)) || '')}">
          <img class="post-avatar" src="${escapeHtml(postAvatar(post, author))}" alt="" />
          <div class="post-header-text">
            <span class="post-org">${escapeHtml(author.name)}</span>
            <span class="post-meta">
              <span class="post-tag" style="--tag-color:${color}">${escapeHtml(post.tag)}</span>
              · <span>${formatDate(post.date)}</span>
            </span>
          </div>
        </button>
        <button class="post-share" type="button" aria-label="Share this post" title="Share this post">${SHARE_ICON_SVG}</button>
      </div>
      ${media ? `<div class="post-media-wrap">${media}</div>` : ''}
      <div class="post-body">
        <h3 class="post-title">${escapeHtml(post.title)}</h3>
        <p class="post-description">${escapeHtml(excerptText)}${readMore}</p>
      </div>
    </article>
  `;
}

// Wires up one rendered batch of .post-card elements: author row navigates
// to that author's page; clicking the image or the text body pops the post
// up fullscreen (same pattern as the Snaps lightbox). Video posts keep their
// native controls, so only the image/text open the modal, not the video.
function bindPostCardEvents(container, items) {
  container.querySelectorAll('.post-author').forEach(btn => {
    btn.addEventListener('click', () => {
      const authorId = idFromToken('author', btn.dataset.author);
      if (authorId) goToAuthorPage(authorId);
    });
  });
  container.querySelectorAll('.post-card').forEach((card, i) => {
    const img = card.querySelector('.post-media-wrap img');
    if (img) img.addEventListener('click', () => openPostModal(items, i));
    const body = card.querySelector('.post-body');
    if (body) body.addEventListener('click', () => openPostModal(items, i));
    const shareBtn = card.querySelector('.post-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // don't let the click bubble to anything else on the card
        sharePost(items[i]);
      });
    }
  });
}

function renderPosts() {
  const filterBar = document.getElementById('postsTagFilter');
  const feed = document.getElementById('postsFeed');
  const empty = document.getElementById('postsEmpty');
  if (!feed) return;

  const tagNames = Object.keys(POST_TAGS);
  const allTags = ['All', ...tagNames];

  filterBar.innerHTML = allTags.map(tag => {
    const color = tag === 'All' ? null : tagColor(tag);
    const style = color
      ? `--tag-color:${color};--tag-contrast:${getContrastText(color)};`
      : '';
    return `<button class="tag-pill ${tag === activePostTag ? 'active' : ''}" style="${style}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`;
  }).join('');

  filterBar.querySelectorAll('.tag-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activePostTag = btn.dataset.tag;
      renderPosts();
    });
  });

  const items = [...POSTS]
    .filter(p => activePostTag === 'All' || p.tag === activePostTag)
    .sort(byNewestFirst);

  if (items.length === 0) {
    feed.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  feed.innerHTML = items.map(postCardHtml).join('');
  bindPostCardEvents(feed, items);
}

// ---------------------------------------------------------------------------
// POST MODAL — fullscreen single-post view, opened from the image or the
// text of a post card. Same prev/next-arrow pattern as the Snaps lightbox,
// scoped to whichever list of posts it was opened from (the filtered Posts
// feed, or a single author's page).
// ---------------------------------------------------------------------------
let postModalItems = [];
let postModalIndex = 0;

const postModal = document.getElementById('postModal');
const postModalMedia = document.getElementById('postModalMedia');
const postModalAvatar = document.getElementById('postModalAvatar');
const postModalAuthorName = document.getElementById('postModalAuthorName');
const postModalTag = document.getElementById('postModalTag');
const postModalDate = document.getElementById('postModalDate');
const postModalTime = document.getElementById('postModalTime');
const postModalTitle = document.getElementById('postModalTitle');
const postModalDescription = document.getElementById('postModalDescription');
const postModalAuthorBtn = document.getElementById('postModalAuthor');

// Same "did we push this ourselves" tracking as Snaps/Scrolls — see there.
let postOpenedViaPush = false;

function openPostModal(items, index, { push = true } = {}) {
  postModalItems = items;
  postModalIndex = index;

  const post = items[index];
  if (push && post) {
    history.pushState({ modal: 'post', id: post.id }, '', itemUrl('posts', post.id));
    postOpenedViaPush = true;
  } else {
    postOpenedViaPush = false;
  }

  updatePostModal();
  postModal.classList.add('active');
}

function updatePostModal() {
  const post = postModalItems[postModalIndex];
  if (!post) return;
  const author = getAuthor(post.author);
  const color = tagColor(post.tag);

  postModalMedia.innerHTML = post.video
    ? `<video src="${escapeHtml(post.video)}" controls playsinline preload="metadata"></video>`
    : post.image
      ? `<img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" />`
      : '';

  postModalAvatar.src = postAvatar(post, author);
  postModalAuthorName.textContent = author.name;
  postModalTag.textContent = post.tag;
  postModalTag.style.setProperty('--tag-color', color);
  postModalDate.textContent = formatDate(post.date);
  postModalTime.textContent = post.time;
  postModalTitle.textContent = post.title;
  postModalDescription.textContent = post.description;
  postModalAuthorBtn.dataset.author = TOKEN_MAPS.author.toToken.get(post.author) || '';

  // keep the address bar pointed at whichever post is currently showing —
  // covers stepping prev/next through it — so copying the URL bar directly
  // also works, not just the share button
  history.replaceState({ modal: 'post', id: post.id }, '', itemUrl('posts', post.id));
}

// `silent: true` is used when something else already owns the URL change
// (the router syncing to a new location, or handing off to the author
// page — see goToAuthorPage) — it just hides the modal without touching
// history.
function closePostModal({ silent = false } = {}) {
  if (!postModal.classList.contains('active')) return;
  postModal.classList.remove('active');
  postModalMedia.innerHTML = ''; // stop any playing video

  if (!silent) {
    if (postOpenedViaPush) history.back();
    else history.replaceState(null, '', gridUrl('posts'));
  }
  postOpenedViaPush = false;
}

document.getElementById('postModalClose').addEventListener('click', closePostModal);
document.getElementById('postModalShare').addEventListener('click', () => {
  const post = postModalItems[postModalIndex];
  if (post) sharePost(post);
});
document.getElementById('postModalPrev').addEventListener('click', () => {
  postModalIndex = (postModalIndex - 1 + postModalItems.length) % postModalItems.length;
  updatePostModal();
});
document.getElementById('postModalNext').addEventListener('click', () => {
  postModalIndex = (postModalIndex + 1) % postModalItems.length;
  updatePostModal();
});
postModal.addEventListener('click', (e) => {
  if (e.target === postModal) closePostModal();
});
document.addEventListener('keydown', (e) => {
  if (!postModal.classList.contains('active')) return;
  if (e.key === 'Escape') closePostModal();
  if (e.key === 'ArrowLeft') document.getElementById('postModalPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('postModalNext').click();
});
postModalAuthorBtn.addEventListener('click', () => {
  const authorId = idFromToken('author', postModalAuthorBtn.dataset.author);
  if (!authorId) return;
  // silent — goToAuthorPage() sets the URL itself right after; letting
  // closePostModal do its own history.back() here would race it
  closePostModal({ silent: true });
  goToAuthorPage(authorId);
});

// ---------------------------------------------------------------------------
// AUTHOR PAGE — reached only by clicking an author on a post (not a sidebar
// destination). Shows that author's own posts, newest first.
// ---------------------------------------------------------------------------
// Same "did we push this ourselves" tracking as Snaps/Scrolls/Posts — see
// Snaps above for why it matters (skipping it is what caused the Snaps
// double-close bug).
let authorOpenedViaPush = false;

function goToAuthorPage(authorId, { push = true } = {}) {
  const author = getAuthor(authorId);
  const authorPosts = [...POSTS].filter(p => p.author === authorId).sort(byNewestFirst);

  document.getElementById('authorPageAvatar').src = author.avatar || 'assets/seal.png';
  document.getElementById('authorPageName').textContent = author.name;
  document.getElementById('authorPageCount').textContent =
    `${authorPosts.length} post${authorPosts.length === 1 ? '' : 's'}`;

  const feed = document.getElementById('authorFeed');
  if (authorPosts.length === 0) {
    feed.innerHTML = '<p class="empty-state">No posts from this author yet.</p>';
  } else {
    feed.innerHTML = authorPosts.map(postCardHtml).join('');
    bindPostCardEvents(feed, authorPosts);
  }

  // silent — this function owns the URL change below, so the individual
  // modals shouldn't also try to touch history on their way out
  closeScrollsViewer({ silent: true });
  closeSnapModal({ silent: true });
  closePostModal({ silent: true });

  pages.forEach(p => p.classList.remove('active'));
  document.getElementById('author').classList.add('active');
  navLinks.forEach(l => l.classList.remove('active')); // not a sidebar destination

  // real, shareable/bookmarkable link — same push-first-then-done pattern
  // as openPostModal/openSnapModal, so closing (authorBack) can unwind it
  // with a single history.back() instead of stacking a second entry
  if (push) {
    history.pushState({ page: 'author', id: authorId }, '', itemUrl('author', authorId));
    authorOpenedViaPush = true;
  } else {
    history.replaceState({ page: 'author', id: authorId }, '', itemUrl('author', authorId));
    authorOpenedViaPush = false;
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
  if (window.innerWidth <= 850) closeSidebar();
}

document.getElementById('authorBack').addEventListener('click', () => {
  if (authorOpenedViaPush) {
    history.back();
  } else {
    // reached this author page directly (a shared link, a refresh) — there's
    // nothing of ours to go back to, so just navigate to Posts normally
    showPage('posts');
  }
  authorOpenedViaPush = false;
});

// ---------------------------------------------------------------------------
// ROUTER — reads location.pathname/search and puts the app in the matching
// state. Runs once on boot (covers a direct load, a refresh, and a shared
// link alike — all three land here the same way, since Cloudflare Pages
// serves this same index.html for any of these paths) and again on every
// `popstate` (browser back/forward). Always called with push:false on the
// individual open*() calls below: the URL here is already correct, so
// there's nothing new to push — only the DOM needs to catch up to it.
// ---------------------------------------------------------------------------
async function syncFromLocation() {
  const path = location.pathname;
  const params = new URLSearchParams(location.search);

  if (path === ROUTES.snaps.path || path === ROUTES.snaps.itemPath) {
    await showPage('snaps', { push: false });
    const id = idFromToken('snaps', params.get(ROUTES.snaps.itemParam));
    const index = id ? snapItems.findIndex(s => s.id === id) : -1;
    if (index !== -1) openSnapModal(index, { push: false });
    else closeSnapModal({ silent: true });
    return;
  }

  if (path === ROUTES.scrolls.path || path === ROUTES.scrolls.itemPath) {
    await showPage('scrolls', { push: false });
    const id = idFromToken('scrolls', params.get(ROUTES.scrolls.itemParam));
    const index = id ? scrollDataItems.findIndex(s => s.id === id) : -1;
    if (index !== -1) openScrollsViewer(index, { push: false });
    else closeScrollsViewer({ silent: true });
    return;
  }

  if (path === ROUTES.posts.path) {
    await showPage('posts', { push: false });
    closePostModal({ silent: true });
    return;
  }

  if (path === ROUTES.posts.itemPath) {
    // The singular "/post/" path only ever means "show one post" — with
    // no id (or a token that no longer resolves to one), fall back to the
    // Posts grid and straighten out the address bar to match what's shown.
    const id = idFromToken('posts', params.get(ROUTES.posts.itemParam));
    const post = id && POSTS.find(p => p.id === id);
    if (!post) {
      await showPage('posts', { push: false });
      history.replaceState(null, '', gridUrl('posts'));
      return;
    }

    activePostTag = 'All'; // guarantee the linked post is actually in the feed
    await showPage('posts', { push: false });
    renderPosts(); // showPage() only renders on a section's first load — if the
                    // Posts feed was already showing a filtered view, this
                    // forces it back to "All" so it actually matches activePostTag
    const items = [...POSTS].sort(byNewestFirst);
    const index = items.findIndex(p => p.id === id);
    if (index !== -1) openPostModal(items, index, { push: false });
    return;
  }

  if (path === ROUTES.author.itemPath) {
    // Same "no id, or a token that doesn't resolve" fallback as Posts
    // above — land cleanly on the Posts grid instead of an empty page.
    const id = idFromToken('author', params.get(ROUTES.author.itemParam));
    if (!id || !(typeof AUTHORS === 'object' && AUTHORS[id])) {
      await showPage('posts', { push: false });
      history.replaceState(null, '', gridUrl('posts'));
      return;
    }

    goToAuthorPage(id, { push: false });
    return;
  }

  // Home ("/") and anything unrecognized both land on Home — Cloudflare's
  // SPA fallback already served this same shell for an unrecognized path,
  // so this just avoids showing a blank page for a typo'd URL.
  await showPage('home', { push: false });
}

window.addEventListener('popstate', syncFromLocation);

syncFromLocation();