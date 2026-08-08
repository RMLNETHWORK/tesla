// Runs on every request to this Pages project, in front of the static
// asset server. Its only job: make the browser's HTTP cache "immune" to
// stale deploys without introducing a build step or any manual version
// bump. See README.md → "Cache-busting" for the full explanation.
//
// How it works, in one sentence: every deploy gets a free, automatic
// version stamp (the git commit SHA, provided by Cloudflare Pages), and
// that stamp gets baked into the URLs of index.css/index.js/data.js as a
// `?v=` query string — so a new deploy is a *new URL*, which a browser can
// never confuse with something it already has cached.

class QueryVersioner {
  constructor(attr, version) {
    this.attr = attr;
    this.version = version;
  }

  element(el) {
    const value = el.getAttribute(this.attr);
    if (!value) return;
    // Only version same-origin, relative paths — never touch the Google
    // Fonts stylesheet link or any other absolute/external URL.
    if (/^([a-z]+:)?\/\//i.test(value) || value.startsWith('data:')) return;

    const separator = value.includes('?') ? '&' : '?';
    el.setAttribute(this.attr, `${value}${separator}v=${this.version}`);
  }
}

class VersionMetaInjector {
  constructor(version) {
    this.version = version;
  }

  element(head) {
    // Client-side JS (index.js) reads this to version its own fetch()
    // calls for sections/*.html the same way.
    head.append(`<meta name="asset-version" content="${this.version}">`, { html: true });
  }
}

// Cloudflare Pages' default single-page-app fallback (this project has no
// top-level 404.html) serves this same index.html for any request path
// that isn't a real static file — that's what makes clean URLs like
// /snaps, /snaps/?snap=<id>, /post/?post=<id> work on a direct load or
// refresh, not just an in-app click (see index.js's router). This
// function still only sees the ORIGINAL requested path (e.g. "/snaps"),
// not "/index.html", even though that's the content it's about to get
// back from next() — so "is this the app shell" has to be judged the same
// way Cloudflare itself judges it: no file extension on the last path
// segment. /sections/*.html is excluded on purpose — those are real,
// separate fragment files, not the shell.
function isShellPath(pathname) {
  if (pathname === '/index.html') return true;
  if (pathname.startsWith('/sections/')) return false;
  const lastSegment = pathname.split('/').pop();
  return !lastSegment.includes('.');
}

// ---------------------------------------------------------------------------
// SHARING PREVIEWS (Open Graph / Twitter Card) — same pattern as ChromaX's
// functions/_middleware.js: rewrite the meta tags in-flight so a shared
// link's preview reflects what's actually being shared, without touching
// index.html/index.js. ChromaX keys this off a ?c=HEX query param and a
// generated image; this site has no per-item generated image, so it keys
// off the route (which of Snaps/Scrolls/Posts is being viewed) and uses
// the matching static seal from assets/icons/ instead. When an item
// permalink resolves to an actual entry in data.js, its title/caption is
// pulled in too, so e.g. sharing a specific post shows that post's own
// title rather than just "Tesla Posts".
// ---------------------------------------------------------------------------

// Mirrors hashToken() in index.js exactly — needed so this Function can
// turn a shared link's opaque token (e.g. ?post=k2m84zh1r0a) back into the
// data.js id it came from, by hashing each candidate id and comparing.
function hashToken(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const combined = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return combined.toString(36).padStart(11, '0');
}

const CATEGORY_META = {
  snaps: { label: 'Tesla Snaps', desc: 'Photo snaps from Tesla Archive.', seal: 'snaps.png', param: 'snap', array: 'SNAPS' },
  scrolls: { label: 'Tesla Scrolls', desc: 'Video scrolls from Tesla Archive.', seal: 'scrolls.png', param: 'scroll', array: 'SCROLLS' },
  posts: { label: 'Tesla Posts', desc: 'Latest posts from Tesla Archive.', seal: 'posts.png', param: 'post', array: 'POSTS' },
};

function detectCategory(pathname) {
  if (pathname === '/snaps' || pathname === '/snaps/') return 'snaps';
  if (pathname === '/scrolls' || pathname === '/scrolls/') return 'scrolls';
  if (pathname === '/posts' || pathname === '/post/') return 'posts';
  return null;
}

// data.js is plain JS (not JSON), authored for a human editing it by hand —
// not eval'd here (Workers disallow code-gen from strings anyway). Instead:
// strip comments, isolate the "const NAME = [ ... ]" block by bracket
// depth, split that into top-level {...} object chunks the same way, then
// pull individual quoted fields out of each chunk with a small regex. Any
// failure anywhere in this just falls back to the category-level default
// below — a shared link never breaks, it just loses the per-item title.
function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\/\/.*$/, ''))
    .join('\n');
}

function extractArrayBlock(text, varName) {
  const idx = text.indexOf(`const ${varName}`);
  if (idx === -1) return '';
  const bracketStart = text.indexOf('[', idx);
  if (bracketStart === -1) return '';
  let depth = 0, i = bracketStart;
  for (; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) break; }
  }
  return text.slice(bracketStart + 1, i);
}

function splitObjects(block) {
  const objects = [];
  let depth = 0, start = -1, inStr = null;
  for (let i = 0; i < block.length; i++) {
    const c = block[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"') { inStr = c; continue; }
    if (c === '{') { if (depth === 0) start = i; depth++; }
    else if (c === '}') { depth--; if (depth === 0 && start !== -1) { objects.push(block.slice(start, i + 1)); start = -1; } }
  }
  return objects;
}

function extractField(chunk, key) {
  const re = new RegExp(`${key}\\s*:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`);
  const m = re.exec(chunk);
  if (!m) return null;
  const raw = m[1] !== undefined ? m[1] : m[2];
  return raw.replace(/\\n/g, ' ').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
}

function excerpt(str, max = 200) {
  if (!str) return '';
  if (str.length <= max) return str;
  const cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}

async function findSharedItem(origin, meta, token) {
  if (!token) return null;
  try {
    const res = await fetch(`${origin}/data.js`);
    if (!res.ok) return null;
    const text = stripComments(await res.text());
    const block = extractArrayBlock(text, meta.array);
    for (const chunk of splitObjects(block)) {
      const id = extractField(chunk, 'id');
      if (id && hashToken(id) === token) {
        return {
          title: extractField(chunk, 'title'),
          caption: extractField(chunk, 'caption'),
          description: extractField(chunk, 'description'),
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

async function buildOgOverride(url) {
  const category = detectCategory(url.pathname);
  const seal = category ? CATEGORY_META[category].seal : 'seal.png';
  const ogImage = `${url.origin}/assets/icons/${seal}`;
  const pageUrl = `${url.origin}${url.pathname}${url.search}`;

  let title = null;
  let description = null;

  if (category) {
    const meta = CATEGORY_META[category];
    title = `${meta.label} — Tesla Archive`;
    description = meta.desc;

    const token = url.searchParams.get(meta.param);
    const item = await findSharedItem(url.origin, meta, token);
    if (item) {
      if (category === 'posts' && item.title) {
        title = `${item.title} — Tesla Archive`;
        if (item.description) description = excerpt(item.description);
      } else if (item.caption) {
        description = item.caption;
      }
    }
  }

  return { ogImage, pageUrl, title, description };
}

class OgAttrRewriter {
  constructor(og) { this.og = og; }
  element(el) {
    const prop = el.getAttribute('property');
    const name = el.getAttribute('name');

    // Image and canonical URL are always normalized to an absolute,
    // current-origin value — the static defaults in index.html are
    // root-relative and can't be trusted as-is for a crawler.
    if (prop === 'og:image' || name === 'twitter:image') el.setAttribute('content', this.og.ogImage);
    if (prop === 'og:url') el.setAttribute('content', this.og.pageUrl);

    if (!this.og.title) return; // no category matched — keep the static title/description
    if (prop === 'og:title' || name === 'twitter:title') el.setAttribute('content', this.og.title);
    if (prop === 'og:description' || name === 'twitter:description') el.setAttribute('content', this.og.description);
    if (name === 'description') el.setAttribute('content', this.og.description);
  }
}

class OgTitleRewriter {
  constructor(og) { this.og = og; }
  element(el) { if (this.og.title) el.setInnerContent(this.og.title); }
}

class OgCanonicalRewriter {
  constructor(og) { this.og = og; }
  element(el) { el.setAttribute('href', this.og.pageUrl); }
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const isShell = isShellPath(url.pathname);

  const response = await next();

  if (!isShell) return response;

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  // CF_PAGES_COMMIT_SHA is set automatically by Cloudflare Pages on every
  // build — no config, no manual bump. Falls back to a timestamp for local
  // `wrangler pages dev` previews where that env var isn't set.
  const version = (env.CF_PAGES_COMMIT_SHA || String(Date.now())).slice(0, 10);
  const og = await buildOgOverride(url);

  const rewritten = new HTMLRewriter()
    .on('link[rel="stylesheet"]', new QueryVersioner('href', version))
    .on('script[src]', new QueryVersioner('src', version))
    .on('head', new VersionMetaInjector(version))
    .on('meta[property], meta[name]', new OgAttrRewriter(og))
    .on('title', new OgTitleRewriter(og))
    .on('link[rel="canonical"]', new OgCanonicalRewriter(og))
    .transform(response);

  const headers = new Headers(rewritten.headers);
  // The shell itself must always be revalidated — it's the one file that
  // carries the version stamp, so it can never be left stale in cache.
  headers.set('Cache-Control', 'no-cache');

  return new Response(rewritten.body, {
    status: rewritten.status,
    statusText: rewritten.statusText,
    headers,
  });
}
