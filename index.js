// ---- Copy announcement ID ----
function copyAnnouncementId(btn, id) {
  navigator.clipboard.writeText(id).then(() => {
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1500);
  });
}

// ---- Theme handling ----
const themeSwitch = document.getElementById('themeSwitch');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeSwitch.textContent = '☀️ Light Mode';
  } else {
    root.removeAttribute('data-theme');
    themeSwitch.textContent = '🌙 Dark Mode';
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
    link.classList.add('active');

    if (window.innerWidth <= 850) closeSidebar();
  });
});