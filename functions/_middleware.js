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

  const rewritten = new HTMLRewriter()
    .on('link[rel="stylesheet"]', new QueryVersioner('href', version))
    .on('script[src]', new QueryVersioner('src', version))
    .on('head', new VersionMetaInjector(version))
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
