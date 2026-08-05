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
    id: 'snap-demo-1',
    image: 'assets/demo/snap-1.jpg',
    caption: 'Demo snap — replace with a real photo in data.js.',
    date: '2026-08-01',
  },
  {
    id: 'snap-demo-2',
    image: 'assets/demo/snap-2.jpg',
    caption: 'Another demo snap. Delete these once real content is in.',
    date: '2026-07-28',
  },
  {
    id: 'snap-demo-3',
    image: 'assets/demo/snap-3.jpg',
    caption: 'Third demo snap, just to show the grid with more than two items.',
    date: '2026-07-20',
  },
];

// ---------------------------------------------------------------------------
// SCROLLS — one video + short caption each
// ---------------------------------------------------------------------------
const SCROLLS = [
  {
    id: 'scroll-demo-1',
    video: 'assets/demo/scroll-1.mp4',
    caption: 'Demo scroll #1 — swap in a real vertical video.',
    date: '2026-08-02',
  },
  {
    id: 'scroll-demo-2',
    video: 'assets/demo/scroll-2.mp4',
    caption: 'Demo scroll #2 — scroll snaps one video at a time, like TikTok.',
    date: '2026-07-25',
  },
];

// ---------------------------------------------------------------------------
// POSTS — title + description + tag, with one photo OR one video
// ---------------------------------------------------------------------------
// Tags in use so far. Add a new string here to introduce a new filter pill —
// it shows up on the Posts page automatically.
const POST_TAGS = ['Feels', 'PT - EffCom'];

const POSTS = [
  {
    id: 'post-demo-1',
    title: 'Demo Announcement',
    description: 'This is placeholder body text for a Post. Posts are the long-form option — a title, a short description, and one tag to sort by.',
    tag: 'Feels',
    image: 'assets/demo/post-photo-1.jpg',
    date: '2026-08-03',
  },
  {
    id: 'post-demo-2',
    title: 'Demo EffCom Update',
    description: 'Second demo post, this one tagged under "PT - EffCom" and using a video instead of a photo.',
    tag: 'PT - EffCom',
    video: 'assets/demo/post-video-1.mp4',
    date: '2026-07-30',
  },
];
