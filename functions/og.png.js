// functions/og.png.js
//
// Generates the 1200x630 share-card image referenced by og:image/
// twitter:image (see _middleware.js). Same mechanism as ChromaX's
// functions/og.png.js (@cloudflare/pages-plugin-vercel-og's ImageResponse,
// a satori-based renderer), but instead of drawing a color swatch, it
// mirrors this site's own .post-card layout: a small seal + "TESLA
// ARCHIVE" wordmark on top, then the author row / title / description of
// whatever's actually being shared — all left-aligned on a flat dark card,
// so a shared link's preview looks like a screenshot of the post itself
// rather than a generic site icon.
//
// ?cat=snaps|scrolls|posts   which section (required)
// ?id=<token>                 the shared item's URL token (optional — a
//                              bare category share, e.g. the /posts grid
//                              itself, renders the category-level card)

import { ImageResponse } from '@cloudflare/pages-plugin-vercel-og/api';
import {
  CATEGORY_META,
  loadData,
  findItemChunk,
  extractField,
  excerpt,
  formatDate,
  fetchAsDataUri,
} from './_shared/content.js';

const WIDTH = 1200;
const HEIGHT = 630;
const CARD_BG = '#1c1626'; // --bg-elevated in dark theme (index.css)
const TEXT_COLOR = '#f3f0f8'; // --text (dark theme)
const SUB_COLOR = 'rgba(243, 240, 248, 0.6)'; // --text-soft equivalent
const BRAND_COLOR = 'rgba(255, 255, 255, 0.55)';
const PAD = 68;

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  try {
    return await renderCard(url);
  } catch {
    // Never let a broken parse/render 500 a link preview — fall back to
    // the plain static seal for the category (or the site seal itself).
    const category = url.searchParams.get('cat');
    const fallback = CATEGORY_META[category] ? `/assets/icons/${CATEGORY_META[category].seal}` : '/assets/seal.png';
    // Built by hand (not Response.redirect(), which takes no headers
    // argument) so we can mark it no-store: a redirect here means
    // something failed to parse or render — a one-off hiccup, not a
    // fact about this item — so it shouldn't get cached and outlive the
    // retry that would have succeeded.
    return new Response(null, {
      status: 302,
      headers: { Location: `${url.origin}${fallback}`, 'Cache-Control': 'no-store' },
    });
  }
}

async function renderCard(url) {
  const category = url.searchParams.get('cat');
  const token = url.searchParams.get('id');
  const meta = CATEGORY_META[category];
  if (!meta) throw new Error('unknown category');

  const data = token ? await loadData(url.origin) : null;
  const chunk = data ? findItemChunk(data.text, category, token) : null;

  const sealUri = await fetchAsDataUri(`${url.origin}/assets/seal.png`);

  let headerRow = null;
  let title = meta.label;
  let description = meta.desc;
  let dateLine = null;

  if (category === 'posts') {
    if (chunk) {
      const postTitle = extractField(chunk, 'title');
      const postDesc = extractField(chunk, 'description');
      const tag = extractField(chunk, 'tag');
      const authorId = extractField(chunk, 'author');
      const date = extractField(chunk, 'date');
      const postAvatar = extractField(chunk, 'avatar');

      const author = (data.authors && data.authors[authorId]) || {};
      const authorName = author.name || authorId || 'Tesla Archive';
      const avatarPath = postAvatar || author.avatar || '/assets/seal.png';
      const avatarUri = (await fetchAsDataUri(`${url.origin}${avatarPath}`)) || sealUri;
      const tagColor = (data.postTags && data.postTags[tag]) || '#4a0868';

      title = postTitle || meta.label;
      description = postDesc ? excerpt(postDesc, 170) : meta.desc;

      headerRow = {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center' },
          children: [
            avatarUri && {
              type: 'img',
              props: { src: avatarUri, width: '56', height: '56', style: { borderRadius: '28px', objectFit: 'cover' } },
            },
            {
              type: 'div',
              props: {
                style: { display: 'flex', flexDirection: 'column', marginLeft: avatarUri ? '18px' : '0' },
                children: [
                  { type: 'div', props: { style: { fontSize: '26px', fontWeight: 700, color: TEXT_COLOR }, children: authorName } },
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', alignItems: 'center', marginTop: '6px' },
                      children: [
                        tag && {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              background: hexToRgba(tagColor, 0.18),
                              color: tagColor,
                              fontSize: '19px',
                              fontWeight: 700,
                              padding: '5px 16px',
                              borderRadius: '999px',
                            },
                            children: tag,
                          },
                        },
                        date && {
                          type: 'div',
                          props: { style: { fontSize: '20px', color: SUB_COLOR, marginLeft: '12px' }, children: `· ${formatDate(date)}` },
                        },
                      ].filter(Boolean),
                    },
                  },
                ],
              },
            },
          ].filter(Boolean),
        },
      };
    } else {
      title = meta.label;
      description = meta.desc;
    }
  } else {
    // Snaps / Scrolls — no author/tag, just a caption + date.
    const caption = chunk ? extractField(chunk, 'caption') : null;
    const date = chunk ? extractField(chunk, 'date') : null;
    title = meta.label;
    description = caption || meta.desc;
    if (date) {
      dateLine = { type: 'div', props: { style: { fontSize: '20px', color: SUB_COLOR, marginTop: '16px' }, children: formatDate(date) } };
    }
  }

  const el = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        background: CARD_BG,
        padding: `${PAD}px`,
      },
      children: [
        // Brand row — small seal + wordmark, top-left, same spot as
        // ChromaX's own logo+wordmark row.
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center' },
            children: [
              sealUri && { type: 'img', props: { src: sealUri, width: '40', height: '40' } },
              {
                type: 'div',
                props: {
                  style: { fontSize: '24px', letterSpacing: '3px', color: BRAND_COLOR, marginLeft: sealUri ? '14px' : '0' },
                  children: 'TESLA ARCHIVE',
                },
              },
            ].filter(Boolean),
          },
        },
        // Content block — author row (posts only), title, description.
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', marginTop: '44px' },
            children: [
              headerRow,
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '52px',
                    fontWeight: 700,
                    color: TEXT_COLOR,
                    lineHeight: 1.15,
                    marginTop: headerRow ? '30px' : '0',
                  },
                  children: titleExcerpt(title),
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: '28px', color: SUB_COLOR, lineHeight: 1.4, marginTop: '20px' },
                  children: description,
                },
              },
              dateLine,
            ].filter(Boolean),
          },
        },
      ],
    },
  };

  return new ImageResponse(el, {
    width: WIDTH,
    height: HEIGHT,
    // @cloudflare/pages-plugin-vercel-og defaults to
    // `public, immutable, no-transform, max-age=31536000` (1 year) in
    // production. That's correct for a *content-addressed* image, but
    // this one isn't — the URL is keyed off the item's token, which
    // never changes even when its title/caption/tag color is edited in
    // data.js. Left at the default, a crawler or browser that fetched
    // the card once would keep serving that stale snapshot for a full
    // year after the content changed. A short max-age here means an
    // edit is reflected the next time anything re-fetches the card,
    // while still saving repeat requests within the same few minutes
    // (e.g. a platform's crawler re-verifying the link).
    headers: { 'Cache-Control': 'public, max-age=300, must-revalidate' },
  });
}

function titleExcerpt(str, max = 78) {
  if (!str) return '';
  if (str.length <= max) return str;
  const cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function hexToRgba(hex, alpha) {
  const clean = (hex || '').replace('#', '');
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return `rgba(74, 8, 104, ${alpha})`; // --primary fallback
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}