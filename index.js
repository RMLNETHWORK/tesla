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
    if (SECTION_RENDERERS[pageId]) SECTION_RENDERERS[pageId]();
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

    // pause any playing scroll videos when navigating away from Scrolls
    if (target !== 'scrolls') pauseAllScrollVideos();

    if (window.innerWidth <= 850) closeSidebar();
  });
});

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
// SCROLLS — TikTok-style vertical snap feed, autoplay on view
// ---------------------------------------------------------------------------
let scrollObserver = null;

function pauseAllScrollVideos() {
  document.querySelectorAll('.scroll-item video').forEach(v => v.pause());
}

function renderScrolls() {
  const container = document.getElementById('scrollsContainer');
  const empty = document.getElementById('scrollsEmpty');
  if (!container) return;

  const items = [...SCROLLS].sort(byNewestFirst);

  if (items.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  container.innerHTML = items.map((scroll, i) => `
    <div class="scroll-item" data-index="${i}">
      <video src="${escapeHtml(scroll.video)}" loop muted playsinline preload="metadata"></video>
      <span class="scroll-play-icon">&#9654;</span>
      <div class="scroll-caption">
        <p>${escapeHtml(scroll.caption)}</p>
        <span class="gallery-date">${formatDate(scroll.date)}</span>
      </div>
    </div>
  `).join('');

  // tap to play/pause
  container.querySelectorAll('.scroll-item').forEach(item => {
    const video = item.querySelector('video');
    item.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        item.classList.remove('paused');
      } else {
        video.pause();
        item.classList.add('paused');
      }
    });
  });

  // autoplay whichever scroll is in view, pause the rest
  if (scrollObserver) scrollObserver.disconnect();
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video');
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        video.play().catch(() => {});
        entry.target.classList.remove('paused');
      } else {
        video.pause();
      }
    });
  }, { root: container, threshold: [0, 0.6, 1] });

  container.querySelectorAll('.scroll-item').forEach(item => scrollObserver.observe(item));
}

// ---------------------------------------------------------------------------
// POSTS — filterable feed, sorted by date
// ---------------------------------------------------------------------------
let activePostTag = 'All';

function renderPosts() {
  const filterBar = document.getElementById('postsTagFilter');
  const feed = document.getElementById('postsFeed');
  const empty = document.getElementById('postsEmpty');
  if (!feed) return;

  const tags = ['All', ...POST_TAGS];
  filterBar.innerHTML = tags.map(tag => `
    <button class="tag-pill ${tag === activePostTag ? 'active' : ''}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>
  `).join('');

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

  feed.innerHTML = items.map(post => {
    const media = post.video
      ? `<video class="post-media" src="${escapeHtml(post.video)}" controls playsinline preload="metadata"></video>`
      : post.image
        ? `<img class="post-media" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy" />`
        : '';

    return `
      <article class="post-card">
        ${media}
        <div class="post-body">
          <div class="post-tag-row">
            <span class="post-tag">${escapeHtml(post.tag)}</span>
            <span class="post-date">${formatDate(post.date)}</span>
          </div>
          <h3 class="post-title">${escapeHtml(post.title)}</h3>
          <p class="post-description">${escapeHtml(post.description)}</p>
        </div>
      </article>
    `;
  }).join('');
}
