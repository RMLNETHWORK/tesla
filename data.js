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
    image: '/assets/snaps/snap1.jpg',
    caption: 'Lakas ni Salamatin guys',
    date: '2026-08-06',
  },
  {
    id: 'snap2',
    image: '/assets/snaps/snap2.jpg',
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

const AUTHORS = {
  'admin': {
    name: 'Tesla Archive',
  },
  'Ash': {
    name: 'Ash',
    avatar: '/assets/anon.webp',
  },
  'Your Name chaar': {
    name: 'Your Name chaar',
    avatar: '/assets/anon.webp',
  },
  'Daniel': {
    name: 'Daniel',
    avatar: '/assets/anon.webp',
  },
  'Shan': {
    name: 'Shan',
    avatar: '/assets/anon.webp',
  },
};

// ---------------------------------------------------------------------------
// POSTS — title + description + tag + author, with one photo OR one video
// ---------------------------------------------------------------------------

const POST_TAGS = {
  'Feels': '#fed700',
  'PT - EffCom': '#4a90e2',
};

const POSTS = [
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
  {
    id: 'effcom/post2',
    title: '🌟 Finding Joy in the Little Things',
    description: 'Life is a journey filled with lessons, challenges, and memorable experiences. Every day gives me a chance to learn something new, improve myself, and appreciate the people around me.\n\nAs a student, I work hard to balance my studies and personal life. I attend my classes, complete my assignments, and spend time with my family and friends. During my free time, I enjoy playing basketball, riding my bike, and playing mobile games. These simple activities help me relax and stay motivated. Although there are days when I face difficulties, I remind myself that every challenge is an opportunity to grow stronger.\n\nLooking back on my experiences, I realize that every success and every mistake has helped shape who I am today. I am grateful for the support of my family, friends, and teachers who encourage me to keep moving forward. As I continue my journey, I will work hard, stay positive, and never stop believing in my    dreams. Every day is a new chance to become a better version of myself.\n\n"Believe in yourself, work hard, and great things will happen."\n\n❤️ Thank you for reading!',
    tag: 'PT - EffCom',
    author: 'Your Name chaar',
    date: '2026-08-07',
    time: '01:17 PM',
  },
  {
    id: 'effcom/post3',
    title: "Flat Tires and Fast Friends: A Commuter's Lesson on the Way to Catanduanes National High School",
    description: 'I was rushing to get to school on a tricycle one busy Monday morning on my way to Catanduanes National High School. My anxiety spiked as the minutes ticked away, knowing that a single traffic delay could compromise my punctuality for my first period. The morning rush hour surrounded me with a chaotic blur of engines, pedestrians, and the pressing weight of academic expectations.\n\nMidway through the trip, the vehicle sputtered and ground to an abrupt halt due to a flat tire, creating an immediate obstacle that threatened to derail my schedule completely. The driver turned around, a look of exhaustion on his face, and hesitantly asked if we could step out and help push the heavy vehicle toward the nearest vulcanizing shop. Instead of irritation taking over, a collective, silent understanding passed among us strangers trapped in the same predicament.\n\nAs I planted my hands against the back of the tricycle and pushed alongside my fellow passengers, a profound shift in perspective occurred within me. I realized that even small acts of teamwork can turn a frustrating delay into a moment of genuine kindness, teaching me that human connection often emerges precisely when our structured plans fall apart.',
    tag: 'PT - EffCom',
    author: 'Daniel',
    date: '2026-08-07',
    time: '10:02 PM',
  },
  {
    id: 'effcom/post4',
    title: "When They Left for 5 Days ",
    description: 'My stepdad just got home from abroad.\nI was happy. 4 days later, that happiness turned into “oh...”\n\nBecause after those 4 days, he and my mom started packing. They had to go to Tagaytay to attend my stepdad’s sibling’s wedding.\n\nI knew about it. Mom told me even before my stepdad arrived. “5 days lang kami dun,” she said.\nAnd it wasn’t like I was completely alone, ate and our cousin were with us too. So in my head, “Kaya namin ‘to. Hindi naman mahirap.”\n\nThe first few days were actually fine.\nIt was just me and my 3 siblings at home. Quiet, but manageable.\nFunny thing is, I even learned how to cook because of it. Adobo. Pork afritada. Sinigang. Gulay.\nI was kinda proud of myself. “Look at me, adulting.”\n\nBut then reality hit.\n\nIt stopped being “okay” when everything started piling up at the same time.\nCook. Wash dishes. Clean the house.\nThen drop everything and get my sibling ready for school.\nBack to back. No pause button.\n\nThat’s when I realized it:\nMahirap pala talaga mag-isa.\nEven when you’re not technically alone, the responsibility makes you feel like you’re carrying everything by yourself.\n\nI don’t regret learning. I don’t regret stepping up.\nBut I also didn’t expect how heavy 5 days could feel.',
    tag: 'PT - EffCom',
    author: 'Shan',
    date: '2026-08-08',
    time: '10:55 AM',
  },
];