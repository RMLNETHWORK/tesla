// ---- Helpers ----
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function byNewestFirst(a, b) {
  return new Date(b.date) - new Date(a.date);
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

// ---- Page navigation ----
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const loadedSections = new Set(['home']); // home is inline, already loaded

const SECTION_RENDERERS = {
  snaps: renderSnaps,
  scrolls: renderScrolls,
  posts: renderPosts,
};

async function loadSection(pageId) {
  if (loadedSections.has(pageId)) return;

  const section = document.getElementById(pageId);
  if (!section || pageId === 'home') return; // home content is inline

  try {
    const response = await fetch(`sections/${pageId}.html`);

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

navLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const target = link.getAttribute('data-page');

    await loadSection(target);

    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(target).classList.add('active');

    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelectorAll(`.nav-link[data-page="${target}"]`).forEach(l => l.classList.add('active'));

    // leaving Scrolls entirely closes the fullscreen viewer and resets it
    if (target !== 'scrolls') closeScrollsViewer();

    if (window.innerWidth <= 850) closeSidebar();
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

function openSnapModal(index) {
  snapModalIndex = index;
  updateSnapModal();
  snapModal.classList.add('active');
}

function updateSnapModal() {
  const snap = snapItems[snapModalIndex];
  if (!snap) return;
  snapModalImg.src = snap.image;
  snapModalImg.alt = snap.caption;
  snapModalCaption.textContent = `${snap.caption} — ${formatDate(snap.date)}`;
}

function closeSnapModal() {
  snapModal.classList.remove('active');
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

function openScrollsViewer(index) {
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
}

function closeScrollsViewer() {
  if (!scrollsModal.classList.contains('active')) return;
  scrollsViewerContainer.querySelectorAll('.scroll-item').forEach(resetScrollItem);
  if (scrollsViewerObserver) scrollsViewerObserver.disconnect();
  scrollsModal.classList.remove('active');
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

// Builds an absolute, shareable link to one specific post as `?post=<id>`
// on the current page. Built from `location`, not a hardcoded origin, so it
// resolves correctly whether the site lives at a domain root or a subpath
// (e.g. a GitHub Pages project site).
function getPostShareUrl(post) {
  const url = new URL(location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('post', post.id);
  return url.toString();
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
async function sharePost(post) {
  const url = getPostShareUrl(post);

  if (navigator.share) {
    try {
      await navigator.share({ title: post.title, text: post.description, url });
    } catch (err) {
      if (err && err.name === 'AbortError') return; // user closed the share sheet — not an error
      const copied = await copyToClipboard(url);
      showToast(copied ? 'Link copied!' : 'Could not copy link');
    }
    return;
  }

  const copied = await copyToClipboard(url);
  showToast(copied ? 'Link copied!' : 'Could not copy link');
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

  return `
    <article class="post-card" data-id="${escapeHtml(post.id)}">
      <div class="post-header">
        <button class="post-author" type="button" data-author="${escapeHtml(post.author || '')}">
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
        <p class="post-description">${escapeHtml(post.description)}</p>
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
    btn.addEventListener('click', () => goToAuthorPage(btn.dataset.author));
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
const postModalTitle = document.getElementById('postModalTitle');
const postModalDescription = document.getElementById('postModalDescription');
const postModalAuthorBtn = document.getElementById('postModalAuthor');

function openPostModal(items, index) {
  postModalItems = items;
  postModalIndex = index;
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
  postModalTitle.textContent = post.title;
  postModalDescription.textContent = post.description;
  postModalAuthorBtn.dataset.author = post.author || '';

  // keep the address bar pointed at whichever post is currently showing —
  // covers opening the modal and stepping prev/next through it — so
  // copying the URL bar directly also works, not just the share button
  history.replaceState(null, '', getPostShareUrl(post));
}

function closePostModal() {
  if (!postModal.classList.contains('active')) return;
  postModal.classList.remove('active');
  postModalMedia.innerHTML = ''; // stop any playing video

  const clean = new URL(location.href);
  clean.search = '';
  history.replaceState(null, '', clean.toString());
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
  const authorId = postModalAuthorBtn.dataset.author;
  closePostModal();
  goToAuthorPage(authorId);
});

// ---------------------------------------------------------------------------
// AUTHOR PAGE — reached only by clicking an author on a post (not a sidebar
// destination). Shows that author's own posts, newest first.
// ---------------------------------------------------------------------------
function goToAuthorPage(authorId) {
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

  closeScrollsViewer();
  closeSnapModal();
  closePostModal();

  pages.forEach(p => p.classList.remove('active'));
  document.getElementById('author').classList.add('active');
  navLinks.forEach(l => l.classList.remove('active')); // not a sidebar destination

  window.scrollTo({ top: 0, behavior: 'auto' });
  if (window.innerWidth <= 850) closeSidebar();
}

document.getElementById('authorBack').addEventListener('click', () => {
  document.querySelector('.nav-link[data-page="posts"]').click();
});

// ---------------------------------------------------------------------------
// SHARED POST LINKS — if the page was opened via a `?post=<id>` URL (see
// sharePost() above), land straight on the Posts page with that post open,
// instead of the usual Home. Unknown/removed ids are ignored quietly.
// ---------------------------------------------------------------------------
async function openSharedPostFromUrl() {
  const sharedId = new URLSearchParams(location.search).get('post');
  if (!sharedId) return;

  const post = POSTS.find(p => p.id === sharedId);
  if (!post) return;

  activePostTag = 'All'; // guarantee the shared post is actually in the feed
  await loadSection('posts');
  renderPosts();

  pages.forEach(p => p.classList.remove('active'));
  document.getElementById('posts').classList.add('active');
  navLinks.forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.nav-link[data-page="posts"]').forEach(l => l.classList.add('active'));

  const items = [...POSTS].sort(byNewestFirst);
  const index = items.findIndex(p => p.id === sharedId);
  if (index !== -1) openPostModal(items, index);
}

openSharedPostFromUrl();