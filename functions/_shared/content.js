// functions/_shared/content.js
//
// Shared by _middleware.js (meta tag rewriting) and og.png.js (generated
// share-card image). Both need the same thing: turn a shared link's
// opaque token back into the matching entry in data.js, without eval
// (Workers disallow code-gen from strings) and without breaking a page
// load if data.js ever fails to fetch or parse — every function here
// degrades to returning null/defaults rather than throwing.

// Mirrors hashToken() in index.js exactly — this is how a token in a
// shared URL (e.g. ?post=k2m84zh1r0a) gets matched back to a data.js id:
// hash every candidate id the same way and compare.
export function hashToken(str) {
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

export const CATEGORY_META = {
  snaps: { label: 'Tesla Snaps', desc: 'Photo snaps from Tesla Archive.', seal: 'snaps.png', param: 'snap', array: 'SNAPS' },
  scrolls: { label: 'Tesla Scrolls', desc: 'Video scrolls from Tesla Archive.', seal: 'scrolls.png', param: 'scroll', array: 'SCROLLS' },
  posts: { label: 'Tesla Posts', desc: 'Latest posts from Tesla Archive.', seal: 'posts.png', param: 'post', array: 'POSTS' },
};

export function detectCategory(pathname) {
  if (pathname === '/snaps' || pathname === '/snaps/') return 'snaps';
  if (pathname === '/scrolls' || pathname === '/scrolls/') return 'scrolls';
  if (pathname === '/posts' || pathname === '/post/') return 'posts';
  return null;
}

// ---------------------------------------------------------------------------
// data.js parsing — it's plain hand-authored JS, not JSON, and Workers
// won't eval() strings, so this walks the text by hand: strip comments,
// isolate a "const NAME = [...]" or "const NAME = {...}" block by bracket
// depth, then pull quoted fields out with small regexes. Every entry point
// below is wrapped in try/catch by its caller — a parse failure just means
// a generated card falls back to category-level defaults, never a broken
// page.
// ---------------------------------------------------------------------------
export function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\/\/.*$/, ''))
    .join('\n');
}

function bracketMatch(text, startIdx, openCh, closeCh) {
  let depth = 0, i = startIdx;
  for (; i < text.length; i++) {
    if (text[i] === openCh) depth++;
    else if (text[i] === closeCh) { depth--; if (depth === 0) break; }
  }
  return i; // index of the matching close bracket
}

export function extractArrayBlock(text, varName) {
  const idx = text.indexOf(`const ${varName}`);
  if (idx === -1) return '';
  const start = text.indexOf('[', idx);
  if (start === -1) return '';
  const end = bracketMatch(text, start, '[', ']');
  return text.slice(start + 1, end);
}

export function extractObjectBlock(text, varName) {
  const idx = text.indexOf(`const ${varName}`);
  if (idx === -1) return '';
  const start = text.indexOf('{', idx);
  if (start === -1) return '';
  const end = bracketMatch(text, start, '{', '}');
  return text.slice(start + 1, end);
}

// Splits the inside of an array block into its top-level {...} object
// literals, respecting string boundaries (so a "}" or "{" inside a
// description string never confuses the depth count).
export function splitObjects(block) {
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

export function extractField(chunk, key) {
  const re = new RegExp(`(?:^|[,{\\s])${key}\\s*:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`);
  const m = re.exec(chunk);
  if (!m) return null;
  const raw = m[1] !== undefined ? m[1] : m[2];
  return raw.replace(/\\n/g, ' ').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
}

// AUTHORS is `{ 'id': { name: '...', avatar: '...' }, ... }` — a map of
// nested objects, so it needs its own key-then-bracket-match walk rather
// than the flat-array splitObjects() above.
export function parseAuthorMap(block) {
  const authors = {};
  let i = 0;
  while (i < block.length) {
    const qm = /['"]/.exec(block.slice(i));
    if (!qm) break;
    const quoteCh = block[i + qm.index];
    const keyStart = i + qm.index + 1;
    let j = keyStart;
    while (j < block.length && block[j] !== quoteCh) { if (block[j] === '\\') j++; j++; }
    const key = block.slice(keyStart, j);

    const braceStart = block.indexOf('{', j);
    if (braceStart === -1) break;
    const braceEnd = bracketMatch(block, braceStart, '{', '}');
    const chunk = block.slice(braceStart, braceEnd + 1);

    authors[key] = { name: extractField(chunk, 'name'), avatar: extractField(chunk, 'avatar') };
    i = braceEnd + 1;
  }
  return authors;
}

// POST_TAGS is `{ 'Tag Name': '#color', ... }` — flat string:string pairs,
// no nesting, so a single global regex is enough.
export function parseFlatStringMap(block) {
  const map = {};
  const re = /(['"])((?:[^\\]|\\.)*?)\1\s*:\s*(['"])((?:[^\\]|\\.)*?)\3/g;
  let m;
  while ((m = re.exec(block))) {
    map[m[2]] = m[4];
  }
  return map;
}

export function excerpt(str, max = 200) {
  if (!str) return '';
  const clean = str.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function formatDate(dateStr) {
  try {
    const d = new Date(`${dateStr}T00:00:00`);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr || '';
  }
}

// Fetches data.js once and hands back everything a caller might need,
// pre-parsed. Returns null on any failure.
export async function loadData(origin) {
  try {
    const res = await fetch(`${origin}/data.js`);
    if (!res.ok) return null;
    const text = stripComments(await res.text());
    return {
      text,
      authors: parseAuthorMap(extractObjectBlock(text, 'AUTHORS')),
      postTags: parseFlatStringMap(extractObjectBlock(text, 'POST_TAGS')),
    };
  } catch {
    return null;
  }
}

// Finds the data.js entry (in the given category's array) whose id hashes
// to `token`. Returns the raw matched chunk plus its parsed id so callers
// can pull whatever fields they need out of it with extractField().
export function findItemChunk(dataText, category, token) {
  if (!token) return null;
  const meta = CATEGORY_META[category];
  if (!meta) return null;
  const block = extractArrayBlock(dataText, meta.array);
  for (const chunk of splitObjects(block)) {
    const id = extractField(chunk, 'id');
    if (id && hashToken(id) === token) return chunk;
  }
  return null;
}

export async function fetchAsDataUri(assetUrl) {
  try {
    const res = await fetch(assetUrl);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || 'image/png';
    const buf = await res.arrayBuffer();
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return `data:${contentType};base64,${btoa(binary)}`;
  } catch {
    return null;
  }
}
