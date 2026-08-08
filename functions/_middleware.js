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
// functions/_middleware.js + og.png.js: rewrite the meta tags in-flight,
// and point og:image/twitter:image at a generated card (functions/og.png.js)
// styled after this site's own .post-card UI, instead of a flat static
// image. Falls back to the plain seal for "/" and anything unrecognized.
// ---------------------------------------------------------------------------
import { CATEGORY_META, detectCategory, findItemChunk, extractField, excerpt, stripComments } from './_shared/content.js';

async function buildOgOverride(url) {
  const category = detectCategory(url.pathname);
  const pageUrl = `${url.origin}${url.pathname}${url.search}`;

  if (!category) {
    return { ogImage: `${url.origin}/assets/seal.png`, pageUrl, title: null, description: null };
  }

  const meta = CATEGORY_META[category];
  const token = url.searchParams.get(meta.param);
  const ogImage = `${url.origin}/og.png?cat=${category}${token ? `&id=${token}` : ''}`;

  let title = `${meta.label} — Tesla Archive`;
  let description = meta.desc;

  try {
    const dataRes = token ? await fetch(`${url.origin}/data.js`) : null;
    if (dataRes && dataRes.ok) {
      const text = stripComments(await dataRes.text());
      const chunk = findItemChunk(text, category, token);
      if (chunk) {
        if (category === 'posts') {
          const postTitle = extractField(chunk, 'title');
          const postDesc = extractField(chunk, 'description');
          if (postTitle) title = `${postTitle} — Tesla Archive`;
          if (postDesc) description = excerpt(postDesc);
        } else {
          const caption = extractField(chunk, 'caption');
          if (caption) description = caption;
        }
      }
    }
  } catch {
    // keep the category-level title/description computed above
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
