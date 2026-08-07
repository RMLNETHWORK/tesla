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

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const isShell = url.pathname === '/' || url.pathname === '/index.html';

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
