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
  'Chan': {
    name: 'Chan',
    avatar: '/assets/anon.png',
  },
  'Ito_po_si_pare_05': {
    name: 'Ito_po_si_pare_05',
    avatar: '/assets/anon.png',
  },
  'Kvaratskhelia': {
    name: 'Kvaratskhelia',
    avatar: '/assets/anon.png',
  },
  'Romcom': {
    name: 'Romcom',
    avatar: '/assets/anon.png',
  },
  'SofiaTheFirst': {
    name: 'SofiaTheFirst',
    avatar: '/assets/anon.png',
  },
  'Kim Dokja': {
    name: 'Kim Dokja',
    avatar: '/assets/anon.png',
  },
  'Punò': {
    name: 'Punò',
    avatar: '/assets/anon.png',
  },
  'Neophyte': {
    name: 'Neophyte',
    avatar: '/assets/anon.png',
  },
  'Da': {
    name: 'Da',
    avatar: '/assets/anon.png',
  },
  'bitterbuttercup': {
    name: 'bitterbuttercup',
    avatar: '/assets/anon.png',
  },
  'Yco': {
    name: 'Yco',
    avatar: '/assets/anon.png',
  },
  'Pogi si Lowiee': {
    name: 'Pogi si Lowiee',
    avatar: '/assets/anon.png',
  },
  'Juan': {
    name: 'Juan',
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
  {
    id: 'effcom/post12',
    title: "I Was Lazy and My Grades Showed It",
    description: "I still remember when I was in Grade 5 at Gogon Elementary School during the pandemic. Honestly? I got really lazy. I studied through modules at home and I rushed through my work just to get it done. I spent way more time doing other things instead of studying. Back then I never really stopped to think what this would do to my grades.\n\nDays went by and my laziness only got worse. I kept putting off my work telling myself I could do it later. I chose to rest and play instead of sitting down to learn. Who would have guessed this small habit would change so much.\n\nThen it happened. My grades started dropping. That is when it hit me. Was laziness the exact reason I was not doing well? It sure looked like it. My attitude showed clearly in every score. It was the wake up call I needed.\n\nSo I decided to change. I started putting real effort into my modules and studying each day. I managed my time better and finished tasks right away instead of always pushing them aside. And guess what? Little by little my grades climbed back up.\n\nThis is one of the most memorable things that happened to me. Is responsibility really that important? It turns out yes it is. Even our smallest habits shape the results we get good or bad. Simple choices matter more than we think.\n\nMost of all I learned things will not fix themselves on their own. Do you just wait and hope for the best or do you make it happen? I choose to make it happen.",
    tag: 'PT - EffCom',
    author: 'Chan',
    date: '2026-08-09',
    time: '1:44 PM',
  },
  {
    id: 'effcom/post13',
    title: "Why We Sing",
    description: "It was in mid-October, 2025. I was a 10th Grader, in Catanduanes National High School, minding my own business and enjoying the last year of my junior high school journey. When all of a sudden, I've heard exciting news from our conductor in the chorale. We're going to have a friendly chorale exchange with a choir from Guam, called The Magnifico, and another choir in Baras, Catanduanes, called the Majestic Singing Ambassadors, also led by our conductor. They are coming to the happy island next February. And the best part, I was one of the selected choristers to participate in the event. I was ecstatic, but nervous. I'm really not that good at socializing, and I'm mostly an introvert. But it's still a long way, and a lot of time to prepare for the event. So I comforted myself, reminded myself that I have more time to prepare, and It's going to be ok.\n\nAll throughout the ber months were tiring rehearsals, long practices, and a lot of clashes with academics, other organizations I'm in, and the preparation for the chorale exchange. I was exhausted, yet determined. I also found out that we are assigned to have a buddy system, which means that all of us each will have a member from The Magnifico and a member of the choir in Baras as buddies all throughout the event. This gave me a realization that I need to get out of my comfort zone. In short, to socialize with my buddies and other people throughout the event. Because our conductor told us that we need to always do the first step for them, because we need to make them feel like home in the island. \n\nI learned a lot of songs, lessons, and more throughout the whole preparation. I also learned a lot of hardships, struggles, and challenges. One of the songs we practiced titled \"Why We Sing\" stood out to me the most. It makes me wonder, why do I truly sing? I'll eventually learn it later on, all throughout the event.\n\nThe day came, we waited at the airport, preparing ourselves for the 4-day event. We saw them arrive with happy spirits, and the first day ended with me and my buddies enjoying lunch at Virac Town Center, and a get-together held at Capitol Dome, Virac.\n\nI've had a lot of memorable moments, like when we rode a big tall military truck thingy as transportation to Baras for numerous outreach programs with them. We experienced them singing a lot of beautiful and amazing songs. We had a lot of bonding together as a whole.\n\nAt the last day of the event, we did a late-night concert held at Baras with all the choirs. All of us sang our own music pieces and I tell you, it's heavenly beautiful. The Magnifico sang a very beautiful rendition of Magnolia by Laufey, and it made me shed a tear listening to it. And as I didn't see it coming, our last song for the concert is Why We Sing. All of us sang it, and we are all singing it with heart, body and soul. For a moment, I thought I was singing with the heavens.\n\nThose 4 days, felt like a whole month. We all bonded together, we both inspired each other with our talents, and we really enjoyed our company. This experience is truly remarkable and unforgettable.\n\nThe journey home, made me realize that I sing because it feels good. I sing because it's my own way of expressing myself. I sing because it's my passion. This is why I sing.\n\nAs said by wise words of Björk, \"Singing is like a celebration of oxygen.\". Ahh, it really feels good to be alive.\n\nThanks for reading!",
    tag: 'PT - EffCom',
    author: 'Ito_po_si_pare_05',
    date: '2026-08-09',
    time: '03:08 PM',
  },
  {
    id: 'effcom/post14',
    title: "What a Real Friend Actually Means",
    description: "Honestly, it’s super easy to call almost anyone a friend these days. We have group chats, people we hang out with at school or like at sports club, and hundreds of followers online. But when you really think about it, having a real friend is completely different. A true friend isn't just someone who shows up for the fun stuff or when things are easy. They’re the person who stays around when life gets stressful, weird, or just exhausting.\n\nThe best thing about a real friend is that you don't have to put on a front around them. You don't have to pretend you have it all together or dress up who you are just so they’ll like you. You can just be yourself messy thoughts, bad days, ugly laughs, and all. And if you’re making a mistake, they’ll actually call you out on it. Not to be mean or put you down, but because they genuinely care about you.\n\nAt the end of the day, people like that don't come around very often. You might only end up with one or two real ones in your entire life, and honestly, that’s more than enough. They’re the ones who get hyped for your wins and make the hard days feel a little less heavy just by being there.",
    tag: 'PT - EffCom',
    author: 'Kvaratskhelia',
    date: '2026-08-09',
    time: '04:31 PM',
  },
  {
    id: 'effcom/post15',
    title: "Death Dive",
    description: "The day I went to Hinagasan Falls was supposed to be a fun and unforgettable adventure. I was excited to try something new, especially the famous dive. I thought to myself, “YOLO,” so I decided to go for it without thinking too much about what could happen.\n\nWhen I jumped, everything happened so quickly. For a moment, I realized that the dive was more dangerous than I expected. My excitement suddenly turned into fear, and I understood that one wrong decision could have changed everything. That experience made me realize that saying “YOLO” can sometimes be dangerous when we use it as an excuse to ignore the risks.\n\nAfter that day, I learned that adventures are fun, but safety should always come first. Hinagasan Falls gave me a memory I will never forget, not because of how exciting the dive was, but because it taught me to think before taking risks. Sometimes, YOLO shouldn't mean “you only live once, so do anything.” It should remind us that we only have one life, so we should take care of it.",
    tag: 'PT - EffCom',
    author: 'Romcom',
    date: '2026-08-09',
    time: '04:34 PM',
  },
  {
    id: 'effcom/post16',
    title: "Camporal",
    description: "On December 1, 2023, I joined our School Camporal for the second time, excited for new challenges, lessons, and memories. Being part of the Boy Scouts of the Philippines was a big deal for me, so I was eager to join again. The activities were challenging, both physically and mentally, but they helped me learn new skills, gain confidence, and push myself beyond my limits.\n\nWhat made the Camporal even more special was experiencing everything with my friends. We helped each other, worked as a team, laughed through the struggles, and faced every challenge together. The activities were memorable on their own, but sharing those moments with my friends made the whole experience even more meaningful.\n\nThen came the campfire. After two days of activities and exhaustion, we gathered together, performed our talents, laughed, and simply enjoyed our last moments of the Camporal. Somehow, all the tiredness disappeared. Looking at the campfire that night, I realized how quickly everything had gone by. It was a simple moment, but it felt special because we were all there together.\n\nThe photos I took that night captures more than just a campfire. Whenever I look at it, I remember the laughter, the people I was with, the challenges we went through, and the memories we created. The fire eventually went out and the Camporal came to an end, but that moment stayed with me. And that is what makes this Camporal the most memorable one I have experienced so far.",
    tag: 'PT - EffCom',
    author: 'SofiaTheFirst',
    date: '2026-08-09',
    time: '05:32 PM',
  },
  {
    id: 'effcom/post17',
    title: "On the Things We Cannot Keep and the Moments We Should",
    description: "I had rehearsed the words so many times that I thought I could say them even with my eyes closed. Then I saw her, and every word I had ever practiced disappeared. My heart began pounding before I even reached her. The sentence I had repeated in my head was suddenly nowhere to be found. I had imagined tapping her shoulder, smiling, saying the right words, and somehow looking calm while doing it. Instead, I stood there trying to convince myself to take another step. The night continued as if nothing had changed, but for a moment, everything felt strangely distant. There was only her. She looked exactly like the person I had spent so much time thinking about, yet somehow even more beautiful now that she was standing right in front of me. She was real, she was there and for some reasons that was enough to make me forget everything. All I could do was smile.\n\nThe night had already given me more moments with her than I thought I would have. We talked while waiting for our turn, laughed about how we would enter, and tried to make everything look right even though neither of us really knew what we were doing. I kept stealing little glances at her whenever I thought she wouldn't notice. Every time I looked, there was another detail I wanted to remember. The way she smiled. The way she sway. The way she could make an ordinary moment feel like something beautiful. Even the smallest moments stayed with me. I remember all of them because they were moments I never wanted to rush through. I wasn't thinking about what would happen tomorrow. I was simply there, beside her, trying to cherish the moment that I knew would eventually end.\n\nThe music changed, and my friends encouraged me to go to her. I was terrified. I had already forgotten the things I had practiced saying, and every step toward her felt like I was walking straight into the unknown. Still, I asked her “???, gusto mo ba mag dance?” She looked at me and said “Sure” with a bright smile. I almost couldn't believe she had actually said yes. I had spent so much time preparing myself for rejection that I didn't know what to do with a moment that was actually happening. I looked back at my friends as if I needed them to confirm that she had actually said yes. She smiled, and I couldn't help but smile too. We found a place to dance, and I showed her how we could hold each other. Her hand rested in mine, her other hand on my shoulder, and we slowly began to move with the music. It wasn't some perfect dance. We weren't performing for anyone. We were just two people moving to a song, talking quietly while the rest of the room seemed to fade into the background.\n\nFor some reasons those few minutes meant more to me than I could explain. It was only a dance. Maybe three minutes, maybe a little more. A tiny portion of one night compared to all the time I had spent knowing her. I could hear the music around us, but I wasn't really listening to it anymore. I was too busy trying to remember everything, the feeling of her hand in mine, the rhythm of our steps, the small conversations between movements, and the fact that she was there with me. I didn't need the music to keep playing. I didn't even need her to feel what I felt. I was simply grateful that, for those few minutes, I got to experience something I had wanted for so long.\n\nBut even while I was happy, there was a small part of me that worried about her. I kept wondering if she was enjoying herself too. I didn't want to be selfish. I didn't want the dance to mean something only to me. I wanted her to be happy too. I wanted her to feel comfortable. I wanted the memory to belong to her too, even if it meant something completely different to her than it did to me. That was when I realized that caring about someone isn't always about wanting something from them. Sometimes, it is simply wanting them to have a good time, even when you don't know what place you have in their life.\n\nAnd maybe that's when I understood why those three minutes meant so much. I had spent so much time thinking about what I wanted from her that I almost forgot to appreciate what she had already given me, a moment, not a promise, not a relationship, and not a future. Just a moment where the person I cared about stood beside me, held my hand, and danced with me under the same lights. It didn't last long enough to become a lifetime, but it lasted long enough to become a memory I knew I would carry for a lifetime. Maybe that is what makes certain moments precious, not how long they stay, but how much we enjoyed them.\n\nEventually, the music ended. We let go of each other's hands, and the night continued. People kept talking, laughing, dancing, and moving around us, but something inside me had already accepted it. I knew that the dance couldn't change everything. It couldn't turn my feelings into something mutual, and it couldn't make her mine. There was a part of me that still wished it could have been different. I wished the circumstances were different. But I know that wanting something badly doesn't make it yours.\n\nSo I think I have finally learned to be grateful without asking for more. She may never know how much those few minutes meant to me. She may remember them as nothing more than a dance at prom, while I will remember the way my heart raced before I even reached her, the way every word I practiced disappeared when she looked at me, and the feeling of finally standing beside the person I had spent so long wanting to be close to. And maybe that's enough. I don't need to be hers to be thankful that, for a moment, she let me be beside her. I don't need to turn those three minutes into something they were never meant to be. I can let them remain exactly that they were three beautiful minutes of my life that I was lucky enough to experience with her. She was never mine to keep, and perhaps she was never meant to be. But for one song, under those lights, she was there. I held her hand, we moved together, and for those few minutes, I got to live a moment I had once only imagined. When I look back, I don't want to be sad that it ended. I want to be thankful that it happened at all. Thank you for letting me experience that. Thank you for being my yellow flower.",
    tag: 'PT - EffCom',
    author: 'Kim Dokja',
    date: '2026-08-09',
    time: '05:41 PM',
  },
  {
    id: 'effcom/post18',
    title: "The Silence After the Story",
    description: "When I was still a kid, around 5–10 years old, I used to be very optimistic and always think about the positive outcomes of situations. I would always make decisions expecting good things to happen, but then an event happened in my life that changed my way of thinking a little.\n\nIt was when my grandmother was sick. She was very old and could no longer walk on her own. She lived in our house, and we used to talk to her a lot. My friends and I were always getting scolded for playing too much. We really loved our grandma, and she always told us stories about how they survived the invasion of the Japanese. We enjoyed her stories even after hearing them many times.\n\nFast forward to the time when we moved to Virac and continued living there. We were having a rough time and were short on budget. Sometimes, we could not afford our grandmother's medication, but even then, I still thought that we could overcome the problem and that everything would be alright.\n\nThat was when, one morning, my auntie, who was visiting our house, rushed to tell us, crying, that our grandmother might be dead because she was no longer waking up or breathing. So, we rushed her to the hospital, and after a while, she was announced dead. That caught me off guard, and I was not ready. I never thought it would happen so suddenly.\n\nThen came her funeral. Her funeral was held in our house, and each of my dad's siblings was invited along with their families. We were mourning her death and cherishing her memories by telling her stories. Just when I thought that my grandmother was finally having a peaceful farewell, a fight between my father and my uncle broke out. They were fighting over their past, shouting and kicking the table. It got so bad that even my brother became fed up and shouted at them to stop. My mother told us to hide and told some of my siblings to hide the kitchen knives and other objects that could be dangerous. It was devastating for me. I never thought I would see them that angry, especially at someone's funeral. I knew that my dad and my uncle had a conflict in the past, but I never predicted that things could happen and escalate so quickly.\n\nAfter that, I finally realized that expecting things to always be fine and good can make you weak and unprepared for things. Now, when I make decisions, I always expect the worst things that could happen and prepare myself for them. I still sometimes think of the good things and wish for them to happen, but deep inside, I always prepare myself for the worst. Besides, it protects me from the pain when the worst or bad thing finally happens.",
    tag: 'PT - EffCom',
    author: 'Punò',
    date: '2026-08-09',
    time: '05:49 PM',
  },
  {
    id: 'effcom/post19',
    title: "Life in third person POV",
    description: "Education is something that is needed by everyone. Which is why everyone goes to school, although school is not only a place to gain knowledge, but a place to socialize, build relationships and generally better yourself because other people can show you the way.\n\nThroughout the entire month, I have met new people, in a new and unfamiliar environment. It is what made me be able to adapt and learn new things. Instead of shutting myself in my comfort zone. I have made new friends, made new relationships and learned from past mistakes. Moreover, I have also gained new skills that will help me in my life that I normally wouldn't be able to learn if I wasn’t “pushed” to do so. These experiences have collectively broadened my perspective, allowing me to see things I normally couldn’t. This really took a turn because even if I had no idea what was in store for me it gave me a lot of benefits in a new and unfamiliar environment. It is what made me be able to adapt and learn new things.\n\nInstead of staying in my comfort zone. I have made new friends, new relationships, and learned from past mistakes. Moreover, I have also learned new skills that will benefit me in my life that I otherwise would not have been able to learn if I wasn't \"pushed\" to do so. These experiences have all together broadened my mind and made me able to see things that otherwise I would not have been able to see.",
    tag: 'PT - EffCom',
    author: 'Neophyte',
    date: '2026-08-09',
    time: '06:22 PM',
  },
  {
    id: 'effcom/post20',
    title: "Why We Shouldn't Hold Back Our Love",
    description: "We all have that one reputation we subconsciously protect. For me, it’s being the \"steady one.\" The one who stays calm under pressure, keeps things light, and rarely—if ever—shows cracks in the armor. I don’t usually get emotional, especially not in front of a crowd.\n\nBut during our Senior Send-Off, the armor completely shattered.\n\nWhen it was my turn to give a message to Am, one of my closest friends, the words caught in my throat. Before I could even finish my first sentence, the tears just came. And I didn't just tear up—I cried. Hard.\n\nLooking around, I could see the shock on everyone's faces. For many of them, seeing me break down was completely out of character. It surprised a lot of people because they had never seen that side of me before. To be honest, it even surprised me a little.\n\nBut as I stood there, letting the tears fall while trying to speak from the heart, a wave of clarity hit me.\n\nWhy do we spend so much time hiding how deeply we care? Why do we wait until someone is leaving to let our walls down?\n\nI realized that keeping a \"cool\" or unemotional exterior is highly overrated. Tears aren't a sign of weakness; they are the ultimate proof of connection. Crying for Am wasn't something to feel embarrassed about—it was a reflection of how deeply she impacted my life and how much our friendship truly means to me.\n\nThe biggest takeaway from that emotional afternoon is simple: We shouldn't hold back our love for the people we care about.\n\nLife is too short, and genuine connections are too rare to keep bottled up. If you love your friends, tell them. If you are grateful for them, show them. And if the thought of them leaving makes you cry, let the tears flow. Loudly and proudly.\n\nTo Am, thank you for being a friend worth crying for. And to everyone else—don't wait for a send-off to show your people how much they matter. Hold onto them, value them, and never apologize for caring \"too much.\"",
    tag: 'PT - EffCom',
    author: 'Da',
    date: '2026-08-09',
    time: '06:25 PM',
  },
  {
    id: 'effcom/post21',
    title: "Memories are meant to be kept",
    description: "Ever since I was a child, my family and I have been going to a lot of different places. When I mean a lot, I mean A LOT of places. I enjoy every single moment my family and I spend, every laugh we share, every story we talk about during our trips. I always thought that we only go to places just to see the beautiful spots that tons of people go to, meet and be friends with others, and even just to try different foods.\n\nNot until I realized that it’s not for forever, that my family and I will not have a lot of time to be with each other as we grow older. We’ll all have our different paths. My older sister getting busier in her college life, and my brother going out of town for college. They are slowly drifting away, and I am also growing. It’s sad to think that someday, we’ll all have our different paths.\n\nBut even though we’re slowly drifting, we still make time to bond with each other. I am happy that we had a lot of great memories with each other, and happy that we’re still making and adding more memories with each other. I can say that there’s no wasted time making memories with my family. Even though they’re sometimes busy with something, they still try to make time. Here, I learned that no matter how busy life gets, we must still lend some time with our family. We are getting older and older, so we must cherish every moment with them.",
    tag: 'PT - EffCom',
    author: 'bitterbuttercup',
    date: '2026-08-09',
    time: '06:39 PM',
  },
  {
    id: 'effcom/post22',
    title: "Came Alone. Left With a Brochacho",
    description: "When I first began working out in a gym, I did not know anything. i would go to the gym by myself, examine all of the machines and other equipments, and attempt to determine how they worked. While I knew many of the machines functions, I did not understand the correct form of each exercise. I essentially tried to do everything on my own. The isolation of being at the gym alone made it slightly intimidating, however, I gradually grew accustomed to spending time at the gym.\n\nI first met a guy named Rafael or Rafa for short, while I was at the gym. He saw that I was performing several of my workouts using improper technique. Rather than ignoring me, he walked over to where I was and taught me how to perform those same exercises using proper technique. He also informed me of the risks associated with improperly executing these exercises. This conversation about my workout techniques eventually evolved into conversations and laughter. Eventually this casual exchange led to our developing a genuine friendship.\n\nLooking back, I never expected that meeting a friend through going to the gym would be one of the outcomes. Originally, when I initially decided to begin attending the gym, I assumed that I would be forced to figure everything out on my own. However, having someone who is willing to assist you and genuinely cares about your progress will make the overall experience so much better. I am very thankful for meeting Rafa. Not only has he assisted me in becoming efficient at working out in a gym setting. However, he has demonstrated to me how a small act of kindness can develop into a long lasting and meaningful relationship.\n\nMany times, we obtain the most valuable items from attempting something new or stepping outside of our comfort zone are not always the items we sought after when we attempted the activity. My initial intentions for attending the gym were to become knowledgeable about training in general. However, I discovered that finding a true friend during the process made the entire experience far more enjoyable.",
    tag: 'PT - EffCom',
    author: 'Yco',
    date: '2026-08-09',
    time: '06:50 PM',
  },
  {
    id: 'effcom/post23',
    title: "When Time Was Running Out, God Made a Way",
    description: "The Paglaom Youth Camp 2026 was an experience I really wanted to be part of but getting there became a challenge I never expected. At that time I was already dealing with academic pressure, schoolwork, and different responsibilities. On top of everything I was assigned to be the first sharer at the camp. As the time got closer I started questioning whether I could still make it. I felt pressured because I knew that people were expecting me to be there, but I also had responsibilities that I could not simply ignore. The more I thought about everything that could go wrong, the more impossible the situation seemed. I realized something about myself during that moment when I feel overwhelmed I tend to focus more on everything that might prevent me from succeeding than on the possibility that things could still work out.\n\nEven with all the pressure and uncertainty I decided to try. Time was running out and I honestly didn't know if I would arrive before my turn to share. There were so many things that could have stopped me from going, and I had already accepted the possibility that I might not make it.\nBut I kept going.\nThen somehow I arrived at the camp just minutes before I was supposed to share. I was tired and overwhelmed but at that moment I realized that I had made it despite everything that had been weighing on me. It made me reflect on how often I allow my circumstances to convince me that something is impossible before I even try. Sometimes I become so focused on controlling the outcome that I forget to trust God with the things I cannot control.\n\nThat experience taught me more than just the importance of perseverance It taught me something deeper about faith and trust.\nI learned that trusting God does not mean that all our problems will suddenly disappear It means continuing to move forward even when we don't know exactly how everything will turn out.\nI may have responsibilities, pressure and moments when I feel like I cannot do everything but I don't have to carry the uncertainty alone. I can do what I can and entrust the things beyond my control to God.\nThe experience also reminded me that God's timing and plans may not always look the way I expect them to. What I thought was already impossible still had a way forward.\nThis became a personal reminder for me when life feels overwhelming and time seems to be running out I should not immediately assume that there is no way I should take the next step do my part and trust him with the rest.\nBecause sometimes the greatest lesson is not that everything went according to our plan but that we learned to trust God even when it didn't.",
    tag: 'PT - EffCom',
    author: 'Pogi si Lowiee',
    date: '2026-08-09',
    time: '07:08 PM',
  },
  {
    id: 'effcom/post24',
    title: "6 Colors : Different patterns",
    description: "At first, I thought solving a Rubik’s Cube was impossible. Whenever I tried to turn its colorful sides, I only made it look more confusing. I would mix the colors even more and sometimes felt frustrated because I did not know where to start. However, I became curious and trying my best to understand how to solve it.\n\nAs I continued practicing, I learned that solving a Rubik’s Cube requires patience, focus, and determination to solve it. I started by learning the basic steps, like making the flower or the first pattern. At first, it was difficult to remember the moves, and I often made mistakes. But through practice, I slowly understood how each move affected the pieces of the cube. Every time I learn a pattern I must memories it , I felt motivated to continue until I finally solved the entire cube.\n\nSolving a Rubik’s Cube taught me an, not every problem can be solved immediately. Sometimes, we need to be patient, learn from our mistakes, and try again. The Rubik’s Cube may only be a small puzzle, but for me, it represents determination and problem-solving. Every solved cube reminds me that with enough practice and patience, even something that once seemed impossible can eventually be accomplished.",
    tag: 'PT - EffCom',
    author: 'Juan',
    date: '2026-08-09',
    time: '07:14 PM',
  },
];