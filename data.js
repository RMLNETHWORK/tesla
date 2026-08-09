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
    avatar: '/assets/anon.png',
  },
  'Your Name chaar': {
    name: 'Your Name chaar',
    avatar: '/assets/anon.png',
  },
  'Daniel': {
    name: 'Daniel',
    avatar: '/assets/anon.png',
  },
  'Shan': {
    name: 'Shan',
    avatar: '/assets/anon.png',
  },
  'Sky Penguin': {
    name: 'Sky Penguin',
    avatar: '/assets/anon.png',
  },
    'Grey': {
      name: 'Grey',
      avatar: '/assets/anon.png',
    },
  'CK': {
    name: 'CK',
    avatar: '/assets/anon.png',
  },
  'Miko Aguilar': {
    name: 'Miko Aguilar',
    avatar: '/assets/anon.png',
  },
  'Andrewiee': {
    name: 'Andrewiee',
    avatar: '/assets/anon.png',
  },
  'YOU\'RE ON YOUR OWN, KID': {
    name: 'YOU\'RE ON YOUR OWN, KID',
    avatar: '/assets/anon.png',
  },
  'dro': {
    name: 'dro',
    avatar: '/assets/anon.png',
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
    title: "When They Left for 5 Days",
    description: 'My stepdad just got home from abroad.\nI was happy. 4 days later, that happiness turned into “oh...”\n\nBecause after those 4 days, he and my mom started packing. They had to go to Tagaytay to attend my stepdad’s sibling’s wedding.\n\nI knew about it. Mom told me even before my stepdad arrived. “5 days lang kami dun,” she said.\nAnd it wasn’t like I was completely alone, ate and our cousin were with us too. So in my head, “Kaya namin ‘to. Hindi naman mahirap.”\n\nThe first few days were actually fine.\nIt was just me and my 3 siblings at home. Quiet, but manageable.\nFunny thing is, I even learned how to cook because of it. Adobo. Pork afritada. Sinigang. Gulay.\nI was kinda proud of myself. “Look at me, adulting.”\n\nBut then reality hit.\n\nIt stopped being “okay” when everything started piling up at the same time.\nCook. Wash dishes. Clean the house.\nThen drop everything and get my sibling ready for school.\nBack to back. No pause button.\n\nThat’s when I realized it:\nMahirap pala talaga mag-isa.\nEven when you’re not technically alone, the responsibility makes you feel like you’re carrying everything by yourself.\n\nI don’t regret learning. I don’t regret stepping up.\nBut I also didn’t expect how heavy 5 days could feel.',
    tag: 'PT - EffCom',
    author: 'Shan',
    date: '2026-08-08',
    time: '10:55 AM',
  },
  {
    id: 'effcom/post5',
    title: "3 Ways To Avoid Sudden Emotional Crashouts",
    description: "There are lots of thing that can trigger emotional overload for us, that might cause unexpected sudden crashouts.\n\nFrom playing sports, losing games, triggering words, and a lot more. Overload of emotion isn't easy to control nor avoid, I can say it from my experiences, but there are ways to control how you handle it.\n\nHere are steps how I handle myself and my actions when facing a sudden trigger, you can reflect on this:\n\n1. Always Think Advance\n\nPersonally, most of the time that this happens to me, I always ask my self this question, \"What would be the consequences of my actions to my self and to others?\" Simply answering this, we can avoid acting uncontrollably. Knowing what our action will do cause to others, will help us identify if it will benefit us or destroy us.\n\n2. Talk To Yourself\n\nAfter calming down a bit, I choose to talk to my self. Reliving my past memories to limit my brain of thinking positively. Not fighting back from situations doesn't mean you are weak, it simply states how you're strong and wise enough to know how you handle it right. Talking to yourself also doesn't mean you're not mentally well, like every stereotypes. It is one way to think right on situations and reflect on it.\n\n3. Reflect Through Words or Writing\n\nAfter fully calming down, the next best action is to distance your self to those who triggered your emotions. Then, try putting out your phone, or get your self a pen or paper, and even getting someone to talk to. Using either one of those, write or tell them how the experience was. Reflecting after every kinds of this situation will help us learn from possible mistakes, and will make controlling ourselves much easier in the future.\n\nThat's simply it, try these things out and tell me how you grow and learn to control yourselves.\n\nAnd also, you can share your own ways of handling it down below↓ I'll read and I might even try it out.",
    tag: 'PT - EffCom',
    author: 'Sky Penguin',
    date: '2026-08-08',
    time: '05:44 PM',
  },
  {
    id: 'effcom/post6',
    title: "The Role I Never Asked For",
    description: "Have you found yourself in a situation that you never intended to? There are times when life places us in situations we never expected. That is exactly what happened to me when I was unexpectedly appointed as a youth officer in our barangay. Since I hadn't been present at the election, I had assumed that I would have no connection with it. However, when I got home, I discovered that my name had been included in the group chat and my father informed me about it. At first, I was confused and doubtful, and to be honest, I wasn't certain whether I wanted to accept the position.\n\nYet I chose to remain, particularly due to the people I was with. It was thanks to them that I gradually came to the realization that \"Ahhh, masaya naman pala\". I began to enjoy the experience and felt more at ease when taking part in activities and spending time with others. I'm not really a sociable person; as my mother always says, \"Palagi ka na lang nasa kwarto\", and in fact she's correct. I usually prefer to stay in my room rather than go to places that are crowded. But being a part of the group made me see that going out and spending time with other people isn't something I should always avoid.\n\nAs a result of this experience I believe that I have changed, even if only a little, and that I have become more inclined to take part, to communicate and to spend time with other people. I might still be the sort of person who likes to stay in his room, but I have noticed that there is a difference about me now. I have realised that going outside one's comfort zone doesn't have to be uncomfortable or scary, since at times it can result in experiences which I never thought I would enjoy.\n\nIf you look back on it, you will see that there are situations in which we end up taking on roles that we never expected. Although it might at first seem like a burden, you can't know what such a role might offer you unless you give it a try. I had no intention of becoming an officer, but I decided to remain, and I'm thankful that I did. It is often the experiences we never expected that enable us to find a different aspect of ourselves.",
    tag: 'PT - EffCom',
    author: 'Grey',
    date: '2026-08-08',
    time: '07:00 PM',
  },
  {
    id: 'effcom/post7',
    title: "My Rubik’s Cube Journey",
    description: "A Scrambled Challenge,\nAt first, solving a Rubik’s Cube seemed impossible. The mixed colors looked like a confusing maze, and every turn I made seemed to make the cube even more disorganized. Still, I decided to try instead of giving up immediately.\n\nI began by learning the basic notation and the beginner’s layer-by-layer method. The letters represented different sides of the cube, while an apostrophe meant turning a side in the opposite direction. The first goal was to create a white cross, followed by completing the corners and middle layer.\n\nMy first attempts were frustrating. I often forgot the sequence of movements or turned the wrong side of the cube. Sometimes, I was almost finished, but one careless move ruined my progress. I had to scramble the cube again and start over.\n\nInstead of seeing my mistakes as failures, I slowly began treating them as part of the learning process. I practiced the same algorithms repeatedly until my hands became more familiar with the movements. The cube taught me that solving a problem is not always about immediately knowing the answer. Sometimes, it is about following a process patiently, one step at a time.\n\nThere were moments when I wanted to stop, but I reminded myself that confusion is normal when learning something new. Every unsuccessful attempt helped me remember what not to do. Gradually, the colors began to align, and I became more confident.\n\nWhen I finally solved the Rubik’s Cube, I felt proud not only because all the colors matched, but because I had stayed patient through the difficult parts. The solved cube represented the effort, mistakes, and persistence that came before it.\n\nThis experience made me realize that many problems in life are like a scrambled cube. They may look complicated at first, but they become manageable when divided into smaller steps. I learned that progress does not always happen quickly, and making mistakes does not mean I am incapable. Sometimes, success comes from continuing to turn the pieces until everything eventually falls into place.",
    tag: 'PT - EffCom',
    author: 'CK',
    date: '2026-08-08',
    time: '08:33 PM',
  },
  {
    id: 'effcom/post8',
    title: "A Friend, A Memory, A Lesson",
    description: "When I Felt Like I Couldn't\nWhen I was a kid, I often felt like I couldn't do the things I wanted because my mother would get mad at me. I wanted to play outside, spend time with my friends, and enjoy the simple things that other kids enjoyed. However, I was always worried that my mother might get angry if I did something she did not like. There were times when I would just stay at home, sit quietly, and cry because I felt like I had no choice. I was still young, so I did not really understand why I felt that way. I only knew that I wanted to enjoy my childhood, but I was scared of doing something wrong.\n\nThe Friend Who Was Always There\nWhenever I was feeling sad or crying, my friend would always come to my house and ask me to play. Sometimes, I did not want to play because I was still upset, but my friend would stay and try to make me laugh. We would play together, talk about random things, and forget about what was bothering me. Even though my friend probably did not realize it, those simple visits meant a lot to me. They gave me something to look forward to whenever I was having a difficult day.\n\nAs time passed, I started to appreciate those moments more. My friend showed me that being at home did not always have to mean being sad or afraid. There were still people who cared about me and wanted to see me happy. Slowly, I became more comfortable expressing myself and doing things that made me happy. I also started understanding that I could not control how other people reacted, but I could control how I faced my own fears.\n\nLooking back now, I realize that my childhood experiences taught me something I will always remember: I need to be brave even when I am afraid. I learned that being brave does not mean that I never feel scared, sad, or unsure. It means that I continue moving forward despite those feelings. My friend helped me experience happiness during a time when I often felt restricted and afraid, but those experience helped me become brave person I am still trying to be today.",
    tag: 'PT - EffCom',
    author: 'Miko Aguilar',
    date: '2026-08-09',
    time: '12:39 AM',
  },
  {
    id: 'effcom/post9',
    title: "New hobby, New friends, Be Consistent",
    description: "Starting a new hobby opens doors we never expected, leading us to meet people who share our interests and bring fresh energy into our lives. Whether it’s painting, playing a sport, learning an instrument, or exploring something creative, this new activity connects us with like-minded friends who encourage us, celebrate our small wins, and stay beside us as we improve. These bonds grow naturally—rooted in shared effort, curiosity, and the joy of discovering something wonderful together\n\nWhat makes this journey truly meaningful is choosing to be consistent. Showing up regularly even when progress feels slow turns our new hobby into a beloved habit, and casual acquaintances into trusted friends. Consistency builds skill, strengthens relationships, and teaches us that great things don’t happen overnight—they grow steadily, one step, one practice, and one shared moment at a time.",
    tag: 'PT - EffCom',
    author: 'Andrewiee',
    date: '2026-08-09',
    time: '10:25 AM',
  },
  {
    id: 'effcom/post10',
    title: "FINDING MY REAL CIRCLE",
    description: "When I entered a new stage in my life, I thought that having many friends was important. I enjoyed having people around me because I always had someone to talk to, laugh with, and spend time with. I thought that as long as we had fun together, we were already true friends. However, as I grew older, I realized that friendship is more meaningful than I first thought.\n\nAs time passed, I became closer to some of my friends. We shared stories, helped each other with problems, and created memories together. There were also times when we had misunderstandings and disagreements. These experiences taught me that friendship is not always perfect. It requires patience, understanding, and communication. I also realized that some people may come into our lives for only a short time, while others will stay and continue to support us.\n\nMy friends have helped me understand myself better. They taught me to be more confident, to accept my mistakes, and to learn from my experiences. They also reminded me that I do not need to change myself just to be accepted by others. Being surrounded by people who respect and support me gives me the confidence to become a better version of myself.\n\nNow, I understand that having a real circle is not about having many friends. It is about having genuine people who care about you and support you even during difficult times. As I grew older, I am learning that growing up also means choosing the people who bring good influence into my life. I am thankful for the friends who stayed, accepted me, and helped me grow. In the end, true friendship is not measured by the number of people around you, but by the trust, respect, support, and memories that you share with them.",
    tag: 'PT - EffCom',
    author: 'YOU\'RE ON YOUR OWN, KID',
    date: '2026-08-09',
    time: '12:01 PM',
  },
  {
    id: 'effcom/post11',
    title: "First Day, First Rep, First Lesson",
    description: "Stepping into the gym for the first time was a mix of excitement, nervousness, and “Okay… what am I supposed to do now?” I came with some of my friends, so I wasn’t completely alone, but I still felt shy and clueless. Everywhere I looked, people seemed to know exactly what they were doing while I was standing there trying to figure out where to begin. The equipment looked unfamiliar, the exercises seemed confusing, and I was worried about doing something wrong. But little did I know, that awkward first step would become the beginning of something I would eventually enjoy.\n\nLuckily, my friend was there to help me. He guided me and showed me which exercises I should do first. He also taught me about having a proper workout schedule and what kind of program I could follow throughout the week. Because of his help, I slowly became more comfortable and started enjoying the experience. I realized that I didn't need to know everything on my first day because learning is part of starting something new.\n\nAs I kept showing up to the gym, I also started meeting and getting to know more people there. Some of them eventually became my friends, and having familiar faces around made the gym feel less intimidating. Instead of feeling like a stranger every time I walked in, I started feeling more comfortable because I knew there were people I could talk to, train with, and even laugh with. Their presence became another reason why I felt more encouraged to go to the gym. What started as a place where I felt shy and lost slowly became a place where I felt like I belonged.\n\nOver time, I became more familiar with the exercises and equipment. I also learned that working out isn't just about lifting weights or building muscles. It's also about patience, discipline, and consistency. There were days when I felt tired or didn't feel like working out, but I reminded myself why I started in the first place. Having friends and people I had met at the gym also helped me stay motivated and made each workout more enjoyable.\n\nLooking back, I'm really glad that I went to the gym with my friends that day. If I had been alone, I probably would have felt even more lost. Their support helped me take that first step and gave me the confidence to continue. Meeting new people and making friends along the way made the experience even better. My first day at the gym taught me that it's okay not to know everything when you're starting. Sometimes, all you need is the courage to try, the willingness to learn, and people who are willing to help you along the way. 😉",
    tag: 'PT - EffCom',
    author: 'dro',
    date: '2026-08-09',
    time: '12:33 PM',
  },
];