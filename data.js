/*
  TESLA ARCHIVE — CONTENT DATA
  =========================
  This is the only file you need to touch to publish new content. There's no
  build step — add an object to the right array below, save, push. The page
  re-sorts and re-renders everything from this file automatically.

  SNAPS   — 1 photo + a short caption.            Instagram-style grid, newest first.
  SCROLLS — 1 video + a short caption.             TikTok-style vertical feed, newest first.
  POSTS   — 1 photo OR video + title + description + tag. Filterable feed, newest first.

  Rules that keep things from breaking:
  - `date` must be "YYYY-MM-DD" so sorting works correctly.
  - `id` must be unique within its own array (snap ids only need to be unique among snaps, etc).
  - File paths are relative to the site root, e.g. "assets/snaps/rocket-launch.jpg".
  - For POSTS, set exactly one of `image` or `video` (not both).
  - Video files: .mp4 is the safest bet for browser support. Keep clips short/compressed —
    these are served as plain static files, nothing transcodes them for you.
*/

// ---------------------------------------------------------------------------
// SNAPS — one photo + short caption each
// ---------------------------------------------------------------------------
const SNAPS = [
  {
    id: 'snap1',
    image: 'assets/snaps/snap1.jpg',
    caption: 'Lakas ni Salamatin guys',
    date: '2026-08-06',
  },
  {
    id: 'snap2',
    image: 'assets/snaps/snap2.jpg',
    caption: 'Pogi is Al',
    date: '2026-08-06',
  },
];

// ---------------------------------------------------------------------------
// SCROLLS — one video + short caption each
// ---------------------------------------------------------------------------
const SCROLLS = [
  /* {
    id: 'scroll-demo-1',
    video: 'assets/demo/video.mp4',
    caption: 'Demo scroll #1 — swap in a real vertical video.',
    date: '2026-08-02',
  }, */
];

// ---------------------------------------------------------------------------
// AUTHORS — the people who post, not the org account. Every POSTS entry
// below must reference one of these by `id` in its own `author` field —
// Posts are no longer attributed to "Tesla Archive" itself.
// ---------------------------------------------------------------------------
// `avatar` is this author's DEFAULT profile picture — used on their own
// author page, and on any of their posts that don't set their own `avatar`
// (see POSTS below). Optional — omit it and the default seal icon is used
// instead. Add a new { id, name, avatar? } object here, then reference its
// `id` from any POSTS entry's `author` field. Clicking an author's name/
// avatar on a post opens that author's own page, showing only their posts.
const AUTHORS = {
  'admin': {
    name: 'Tesla Archive',
  },
  'Ash': {
    name: 'Ash',
    avatar: '/assets/anon.webp',
  },
};

// ---------------------------------------------------------------------------
// POSTS — title + description + tag + author, with one photo OR one video
// ---------------------------------------------------------------------------
// Tags in use so far, each mapped to its own color (any valid CSS color —
// hex, rgb(), etc). Add a new "Tag Name": "#color" pair to introduce a new
// filter pill — it shows up on the Posts page automatically, colored the
// way you set it here. The tag on each POSTS entry below must match a key
// in this object exactly.
const POST_TAGS = {
  'Feels': '#fed700',
  'PT - EffCom': '#4a90e2',
};

// `avatar` on a POST is optional and manually set per post — a specific
// file path, picked by hand, just for that entry. Set it when this
// particular post should show a different picture than the author's usual
// one (e.g. a guest post, an in-costume photo, a picture tied to the post's
// topic). Leave it out and the post falls back to that author's `avatar`
// from AUTHORS above, then to the default seal icon if neither is set.
const POSTS = [
  /* {
    id: 'post-demo-1',
    title: 'Demo Announcement',
    description: 'This is placeholder body text for a Post. Posts are the long-form option — a title, a short description, and one tag to sort by.',
    tag: 'Feels',
    author: 'author-demo-1',
    avatar: 'assets/anon.webp', // manually picked for this post — overrides author-demo-1's usual avatar
    image: 'assets/demo/post-photo-1.jpg',
    date: '2026-08-03',
  }, */
  {
    id: 'effcom/postA',
    title: 'EffCom Performance Task Update',
    description: 'Submissions for the Performance Task 1 in Effective Communication is now open, you can now send them to Rolance Labayog.\nPlease submit your work before the deadline [DL: 08-09-2026 @ 09:30 PM].',
    tag: 'PT - EffCom',
    author: 'admin',
    date: '2026-08-06',
  },
  {
    id: 'effcom/post1',
    title: 'Bittersweet Lessons',
    description: 'There are moments in life when we expect things to work out, only to realize that reality has different plans. Recently, I experienced a situation that taught me an unexpected lesson about acceptance and growth. I entered a connection hoping it would become something meaningful, believing that effort and sincerity would be enough.\n\nAs time passed, I realized that our feelings were not completely aligned. Although it hurt, we chose honesty and respect over forcing something that was not meant to be. That moment became a turning point for me. I learned that not every meaningful connection is meant to last forever, and sometimes people enter our lives to teach us lessons rather than stay permanently.\n\nLooking back, I understand that letting go is not a sign of failure. It is a sign of maturity and self-respect. While the experience was bittersweet, it helped me grow stronger, become more self-aware, and appreciate the value of acceptance. Sometimes, the endings we never wanted become the lessons we need the most.',
    tag: 'PT - EffCom',
    author: 'Ash',
    date: '2026-08-07',
    time: '07:59 AM',
  },
];