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
  'Koric ifykyk': {
    name: 'Koric ifykyk',
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
  'LEBRON JAMES': {
    name: 'LEBRON JAMES',
    avatar: '/assets/anon.png',
  },
  'CT': {
    name: 'CT',
    avatar: '/assets/anon.png',
  },
  'Dwight Ramos': {
    name: 'Dwight Ramos',
    avatar: '/assets/anon.png',
  },
  'Nikos Fotiadis': {
    name: 'Nikos Fotiadis',
    avatar: '/assets/anon.png',
  },
  'Adem.': {
    name: 'Adem.',
    avatar: '/assets/anon.png',
  },
  'WOW': {
    name: 'WOW',
    avatar: '/assets/anon.png',
  },
  'Birdbrain': {
    name: 'Birdbrain',
    avatar: '/assets/anon.png',
  },
  'Master Manipulator 6767': {
    name: 'Master Manipulator 6767',
    avatar: '/assets/anon.png',
  },
  'Baduya': {
    name: 'Baduya',
    avatar: '/assets/anon.png',
  },
  'Jom': {
    name: 'Jom',
    avatar: '/assets/anon.png',
  },
  'unknown': {
    name: 'unknown',
    avatar: '/assets/anon.png',
  },
  'Dr. Padampadam': {
    name: 'Dr. Padampadam',
    avatar: '/assets/anon.png',
  },
  'idkplsignorethis': {
    name: 'idkplsignorethis',
    avatar: '/assets/anon.png',
  },
  'Ildefonso Jose T. Vargas (Ij)': {
    name: 'Ildefonso Jose T. Vargas (Ij)',
    avatar: '/assets/anon.png',
  },
  'SailedWhisper': {
    name: 'SailedWhisper',
    avatar: '/assets/anon.png',
  },
  'Nzkeei': {
    name: 'Nzkeei',
    avatar: '/assets/anon.png',
  },
  'Jon Rafael Caballar (Rafii)': {
    name: 'Jon Rafael Caballar (Rafii)',
    avatar: '/assets/anon.png',
  },
  'Adamn': {
    name: 'Adamn',
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
    title: "Lessons written In Sweat",
    description: "When I was a kid, many people expected me to play basketball or football, and well I never met their expectations, when I was in elementary I tried different types of sports, like basketball, track and field, and badminton. Not a single one of those sports really compelled me. It felt like I was forcing myself in those sports that I did not want to do. Growing up I did not have a single sport that stuck with me, I tried taekwondo, for a couple of days before leaving. I tried Brazillian Jiu Jitsu in 2020, but before I can fully commit to the sport, the pandemic hit.\n\nIt’s such a shame that it didn’t worked out because of covid, I stayed in my house for so long that I completely forgot on how to stay physically active in my life. But before Grade 8 started, I asked my dad that I wanna do martial arts, but for real this time, and how serious I am with it now.\n\nMy father of course supported me because he never had the privilege to do martial arts when he was my age because they were not financially stable, now that he can give me the chance, he supported me. I first started out in Calatagan Buffalo Gym, I was intimidated at first, because I was afraid I might get judged by people there, especially its been a long time I’ve been in the gym for a while now.\n\nI met my first coach there, he taught me about muay thai, and well I was awkward and I had no idea on what the hell on what I was doing with my body, I was out of breath, I have no balance, and I felt exhausted. But I kept coming back because I wanted to, even in days I was tired and lazy I kept coming back. Eventually after a year I started to train boxing in the same gym with a different coach. He helped with my footwork and helped me develop my striking ability, im still sloppy but I noticed some improvements.\n\nOn the same year, I went to a different gym, in iron house Valencia, for context it’s been months since I’ve been working out, and my friend told me that to come work out with him so I did. After working out, I found a punching bag on the corner and started to practice my bagwork on boxing on it, until the coach of the gym came to me and ask if I want to join a seminar later this afternoon, I said yes because why not? I joined the seminar and there’s loads of people there. There they gave free training session to everyone and I did a spar for the first time, and I got humbled by everyone there. I kept getting out-striked, and punched in the face by my sparring partner even the coach there. It was almost felt like I never done this before.\n\nBut I was eager to learn more from them, and I decided to switch gyms and train under them, I started to train with them for at least a couple of months in boxing and muay thai, I was improving my craft and training to get better. There they started to offer jiu jitsu again and well I wanted to learn jiu jitsu again, on the first session I was completely humbled and destroyed, and been put into painful positions. It was very tiring and I felt like I wanna vomit.\n\nEach day in doing jiu jitsu is uncomfortable, pressuring, and exhausting. There are times I wanted to quit and leave the sport completely, but I didn’t leave the sport, because I knew this is what I wanted to do, I wanted to be good with my craft, so be it if I’m getting smothered by grown men heavier than me.\n\nEventually with time, I learned and improved with my skills In jiu jitsu, I became more advance and started to think more properly while under pressure, and I started to get more confident with my skills, and yes, I had the false sense of security phase, I mean other martial artist would relate, imagine you have been training for years on how to takedown another person, surely you’ll have an ego on it.\n\nBecause I did, I had this quite ego knowing I had the means and skills to fight anyone, and I feel very confident with it, in-fact, I wanted to fight someone on the streets to show them I know how to fight, that is until it changed on what I think, not all fights are worth fighting for, I’ve looked at martial artists who had to fight someone in the streets, and I noticed one clear pattern; it’s unpredictable. Of course the martial artists would always win, but there are factors that can caused to make it dangerous.\n\nAnd another reason as to why I started to humble myself, is that when I met my professor in black belt, I asked him why did he commit to the sport in the first place? He told me during his time, many people were fighting against each other, and he watched the first Ultimate Fighting Championship (UFC) event, of Royce gracie submitting bigger and larger men than him and winning the match. He wanted to do jiu jitsu so he joined. But overtime the art taught him patience, control, and clear thinking. He realized he could just channel that energy to competitions rather than fighting someone on the streets.\n\nThat mindset really opened my mind, so I started to focus more on my training, rather than focusing to fight someone, it really taught me that not all fights are worth fighting for, most fights would cost something a lot from you, and I’m still young and learning, and I know I have a lot of dreams to complete and achieve and I’m going to risk myself getting into trouble.\n\n“𝙄𝙩 𝙞𝙨 𝙩𝙤 𝙤𝙣𝙚’𝙨 𝙝𝙤𝙣𝙤𝙧 𝙩𝙤 𝙖𝙫𝙤𝙞𝙙 𝙨𝙩𝙧𝙞𝙛𝙚, 𝙗𝙪𝙩 𝙚𝙫𝙚𝙧𝙮 𝙛𝙤𝙤𝙡 𝙞𝙨 𝙦𝙪𝙞𝙘𝙠 𝙩𝙤 𝙦𝙪𝙖𝙧𝙧𝙚𝙡”\n\n– 𝘗𝘳𝘰𝘷𝘦𝘳𝘣𝘴 20:3",
    tag: 'PT - EffCom',
    author: 'Koric ifykyk',
    date: '2026-08-09',
    time: '10:05 AM',
  },
  {
    id: 'effcom/post10',
    title: "New hobby, New friends, Be Consistent",
    description: "Starting a new hobby opens doors we never expected, leading us to meet people who share our interests and bring fresh energy into our lives. Whether it’s painting, playing a sport, learning an instrument, or exploring something creative, this new activity connects us with like-minded friends who encourage us, celebrate our small wins, and stay beside us as we improve. These bonds grow naturally—rooted in shared effort, curiosity, and the joy of discovering something wonderful together\n\nWhat makes this journey truly meaningful is choosing to be consistent. Showing up regularly even when progress feels slow turns our new hobby into a beloved habit, and casual acquaintances into trusted friends. Consistency builds skill, strengthens relationships, and teaches us that great things don’t happen overnight—they grow steadily, one step, one practice, and one shared moment at a time.",
    tag: 'PT - EffCom',
    author: 'Andrewiee',
    date: '2026-08-09',
    time: '10:25 AM',
  },
  {
    id: 'effcom/post11',
    title: "FINDING MY REAL CIRCLE",
    description: "When I entered a new stage in my life, I thought that having many friends was important. I enjoyed having people around me because I always had someone to talk to, laugh with, and spend time with. I thought that as long as we had fun together, we were already true friends. However, as I grew older, I realized that friendship is more meaningful than I first thought.\n\nAs time passed, I became closer to some of my friends. We shared stories, helped each other with problems, and created memories together. There were also times when we had misunderstandings and disagreements. These experiences taught me that friendship is not always perfect. It requires patience, understanding, and communication. I also realized that some people may come into our lives for only a short time, while others will stay and continue to support us.\n\nMy friends have helped me understand myself better. They taught me to be more confident, to accept my mistakes, and to learn from my experiences. They also reminded me that I do not need to change myself just to be accepted by others. Being surrounded by people who respect and support me gives me the confidence to become a better version of myself.\n\nNow, I understand that having a real circle is not about having many friends. It is about having genuine people who care about you and support you even during difficult times. As I grew older, I am learning that growing up also means choosing the people who bring good influence into my life. I am thankful for the friends who stayed, accepted me, and helped me grow. In the end, true friendship is not measured by the number of people around you, but by the trust, respect, support, and memories that you share with them.",
    tag: 'PT - EffCom',
    author: 'YOU\'RE ON YOUR OWN, KID',
    date: '2026-08-09',
    time: '12:01 PM',
  },
  {
    id: 'effcom/post12',
    title: "First Day, First Rep, First Lesson",
    description: "Stepping into the gym for the first time was a mix of excitement, nervousness, and “Okay… what am I supposed to do now?” I came with some of my friends, so I wasn’t completely alone, but I still felt shy and clueless. Everywhere I looked, people seemed to know exactly what they were doing while I was standing there trying to figure out where to begin. The equipment looked unfamiliar, the exercises seemed confusing, and I was worried about doing something wrong. But little did I know, that awkward first step would become the beginning of something I would eventually enjoy.\n\nLuckily, my friend was there to help me. He guided me and showed me which exercises I should do first. He also taught me about having a proper workout schedule and what kind of program I could follow throughout the week. Because of his help, I slowly became more comfortable and started enjoying the experience. I realized that I didn't need to know everything on my first day because learning is part of starting something new.\n\nAs I kept showing up to the gym, I also started meeting and getting to know more people there. Some of them eventually became my friends, and having familiar faces around made the gym feel less intimidating. Instead of feeling like a stranger every time I walked in, I started feeling more comfortable because I knew there were people I could talk to, train with, and even laugh with. Their presence became another reason why I felt more encouraged to go to the gym. What started as a place where I felt shy and lost slowly became a place where I felt like I belonged.\n\nOver time, I became more familiar with the exercises and equipment. I also learned that working out isn't just about lifting weights or building muscles. It's also about patience, discipline, and consistency. There were days when I felt tired or didn't feel like working out, but I reminded myself why I started in the first place. Having friends and people I had met at the gym also helped me stay motivated and made each workout more enjoyable.\n\nLooking back, I'm really glad that I went to the gym with my friends that day. If I had been alone, I probably would have felt even more lost. Their support helped me take that first step and gave me the confidence to continue. Meeting new people and making friends along the way made the experience even better. My first day at the gym taught me that it's okay not to know everything when you're starting. Sometimes, all you need is the courage to try, the willingness to learn, and people who are willing to help you along the way. 😉",
    tag: 'PT - EffCom',
    author: 'dro',
    date: '2026-08-09',
    time: '12:33 PM',
  },
  {
    id: 'effcom/post13',
    title: "I Was Lazy and My Grades Showed It",
    description: "I still remember when I was in Grade 5 at Gogon Elementary School during the pandemic. Honestly? I got really lazy. I studied through modules at home and I rushed through my work just to get it done. I spent way more time doing other things instead of studying. Back then I never really stopped to think what this would do to my grades.\n\nDays went by and my laziness only got worse. I kept putting off my work telling myself I could do it later. I chose to rest and play instead of sitting down to learn. Who would have guessed this small habit would change so much.\n\nThen it happened. My grades started dropping. That is when it hit me. Was laziness the exact reason I was not doing well? It sure looked like it. My attitude showed clearly in every score. It was the wake up call I needed.\n\nSo I decided to change. I started putting real effort into my modules and studying each day. I managed my time better and finished tasks right away instead of always pushing them aside. And guess what? Little by little my grades climbed back up.\n\nThis is one of the most memorable things that happened to me. Is responsibility really that important? It turns out yes it is. Even our smallest habits shape the results we get good or bad. Simple choices matter more than we think.\n\nMost of all I learned things will not fix themselves on their own. Do you just wait and hope for the best or do you make it happen? I choose to make it happen.",
    tag: 'PT - EffCom',
    author: 'Chan',
    date: '2026-08-09',
    time: '01:44 PM',
  },
  {
    id: 'effcom/post14',
    title: "Why We Sing",
    description: "It was in mid-October, 2025. I was a 10th Grader, in Catanduanes National High School, minding my own business and enjoying the last year of my junior high school journey. When all of a sudden, I've heard exciting news from our conductor in the chorale. We're going to have a friendly chorale exchange with a choir from Guam, called The Magnifico, and another choir in Baras, Catanduanes, called the Majestic Singing Ambassadors, also led by our conductor. They are coming to the happy island next February. And the best part, I was one of the selected choristers to participate in the event. I was ecstatic, but nervous. I'm really not that good at socializing, and I'm mostly an introvert. But it's still a long way, and a lot of time to prepare for the event. So I comforted myself, reminded myself that I have more time to prepare, and It's going to be ok.\n\nAll throughout the ber months were tiring rehearsals, long practices, and a lot of clashes with academics, other organizations I'm in, and the preparation for the chorale exchange. I was exhausted, yet determined. I also found out that we are assigned to have a buddy system, which means that all of us each will have a member from The Magnifico and a member of the choir in Baras as buddies all throughout the event. This gave me a realization that I need to get out of my comfort zone. In short, to socialize with my buddies and other people throughout the event. Because our conductor told us that we need to always do the first step for them, because we need to make them feel like home in the island. \n\nI learned a lot of songs, lessons, and more throughout the whole preparation. I also learned a lot of hardships, struggles, and challenges. One of the songs we practiced titled \"Why We Sing\" stood out to me the most. It makes me wonder, why do I truly sing? I'll eventually learn it later on, all throughout the event.\n\nThe day came, we waited at the airport, preparing ourselves for the 4-day event. We saw them arrive with happy spirits, and the first day ended with me and my buddies enjoying lunch at Virac Town Center, and a get-together held at Capitol Dome, Virac.\n\nI've had a lot of memorable moments, like when we rode a big tall military truck thingy as transportation to Baras for numerous outreach programs with them. We experienced them singing a lot of beautiful and amazing songs. We had a lot of bonding together as a whole.\n\nAt the last day of the event, we did a late-night concert held at Baras with all the choirs. All of us sang our own music pieces and I tell you, it's heavenly beautiful. The Magnifico sang a very beautiful rendition of Magnolia by Laufey, and it made me shed a tear listening to it. And as I didn't see it coming, our last song for the concert is Why We Sing. All of us sang it, and we are all singing it with heart, body and soul. For a moment, I thought I was singing with the heavens.\n\nThose 4 days, felt like a whole month. We all bonded together, we both inspired each other with our talents, and we really enjoyed our company. This experience is truly remarkable and unforgettable.\n\nThe journey home, made me realize that I sing because it feels good. I sing because it's my own way of expressing myself. I sing because it's my passion. This is why I sing.\n\nAs said by wise words of Björk, \"Singing is like a celebration of oxygen.\". Ahh, it really feels good to be alive.\n\nThanks for reading!",
    tag: 'PT - EffCom',
    author: 'Ito_po_si_pare_05',
    date: '2026-08-09',
    time: '03:08 PM',
  },
  {
    id: 'effcom/post15',
    title: "What a Real Friend Actually Means",
    description: "Honestly, it’s super easy to call almost anyone a friend these days. We have group chats, people we hang out with at school or like at sports club, and hundreds of followers online. But when you really think about it, having a real friend is completely different. A true friend isn't just someone who shows up for the fun stuff or when things are easy. They’re the person who stays around when life gets stressful, weird, or just exhausting.\n\nThe best thing about a real friend is that you don't have to put on a front around them. You don't have to pretend you have it all together or dress up who you are just so they’ll like you. You can just be yourself messy thoughts, bad days, ugly laughs, and all. And if you’re making a mistake, they’ll actually call you out on it. Not to be mean or put you down, but because they genuinely care about you.\n\nAt the end of the day, people like that don't come around very often. You might only end up with one or two real ones in your entire life, and honestly, that’s more than enough. They’re the ones who get hyped for your wins and make the hard days feel a little less heavy just by being there.",
    tag: 'PT - EffCom',
    author: 'Kvaratskhelia',
    date: '2026-08-09',
    time: '04:31 PM',
  },
  {
    id: 'effcom/post16',
    title: "Death Dive",
    description: "The day I went to Hinagasan Falls was supposed to be a fun and unforgettable adventure. I was excited to try something new, especially the famous dive. I thought to myself, “YOLO,” so I decided to go for it without thinking too much about what could happen.\n\nWhen I jumped, everything happened so quickly. For a moment, I realized that the dive was more dangerous than I expected. My excitement suddenly turned into fear, and I understood that one wrong decision could have changed everything. That experience made me realize that saying “YOLO” can sometimes be dangerous when we use it as an excuse to ignore the risks.\n\nAfter that day, I learned that adventures are fun, but safety should always come first. Hinagasan Falls gave me a memory I will never forget, not because of how exciting the dive was, but because it taught me to think before taking risks. Sometimes, YOLO shouldn't mean “you only live once, so do anything.” It should remind us that we only have one life, so we should take care of it.",
    tag: 'PT - EffCom',
    author: 'Romcom',
    date: '2026-08-09',
    time: '04:34 PM',
  },
  {
    id: 'effcom/post17',
    title: "Camporal",
    description: "On December 1, 2023, I joined our School Camporal for the second time, excited for new challenges, lessons, and memories. Being part of the Boy Scouts of the Philippines was a big deal for me, so I was eager to join again. The activities were challenging, both physically and mentally, but they helped me learn new skills, gain confidence, and push myself beyond my limits.\n\nWhat made the Camporal even more special was experiencing everything with my friends. We helped each other, worked as a team, laughed through the struggles, and faced every challenge together. The activities were memorable on their own, but sharing those moments with my friends made the whole experience even more meaningful.\n\nThen came the campfire. After two days of activities and exhaustion, we gathered together, performed our talents, laughed, and simply enjoyed our last moments of the Camporal. Somehow, all the tiredness disappeared. Looking at the campfire that night, I realized how quickly everything had gone by. It was a simple moment, but it felt special because we were all there together.\n\nThe photos I took that night captures more than just a campfire. Whenever I look at it, I remember the laughter, the people I was with, the challenges we went through, and the memories we created. The fire eventually went out and the Camporal came to an end, but that moment stayed with me. And that is what makes this Camporal the most memorable one I have experienced so far.",
    tag: 'PT - EffCom',
    author: 'SofiaTheFirst',
    date: '2026-08-09',
    time: '05:32 PM',
  },
  {
    id: 'effcom/post18',
    title: "On the Things We Cannot Keep and the Moments We Should",
    description: "I had rehearsed the words so many times that I thought I could say them even with my eyes closed. Then I saw her, and every word I had ever practiced disappeared. My heart began pounding before I even reached her. The sentence I had repeated in my head was suddenly nowhere to be found. I had imagined tapping her shoulder, smiling, saying the right words, and somehow looking calm while doing it. Instead, I stood there trying to convince myself to take another step. The night continued as if nothing had changed, but for a moment, everything felt strangely distant. There was only her. She looked exactly like the person I had spent so much time thinking about, yet somehow even more beautiful now that she was standing right in front of me. She was real, she was there and for some reasons that was enough to make me forget everything. All I could do was smile.\n\nThe night had already given me more moments with her than I thought I would have. We talked while waiting for our turn, laughed about how we would enter, and tried to make everything look right even though neither of us really knew what we were doing. I kept stealing little glances at her whenever I thought she wouldn't notice. Every time I looked, there was another detail I wanted to remember. The way she smiled. The way she sway. The way she could make an ordinary moment feel like something beautiful. Even the smallest moments stayed with me. I remember all of them because they were moments I never wanted to rush through. I wasn't thinking about what would happen tomorrow. I was simply there, beside her, trying to cherish the moment that I knew would eventually end.\n\nThe music changed, and my friends encouraged me to go to her. I was terrified. I had already forgotten the things I had practiced saying, and every step toward her felt like I was walking straight into the unknown. Still, I asked her “???, gusto mo ba mag dance?” She looked at me and said “Sure” with a bright smile. I almost couldn't believe she had actually said yes. I had spent so much time preparing myself for rejection that I didn't know what to do with a moment that was actually happening. I looked back at my friends as if I needed them to confirm that she had actually said yes. She smiled, and I couldn't help but smile too. We found a place to dance, and I showed her how we could hold each other. Her hand rested in mine, her other hand on my shoulder, and we slowly began to move with the music. It wasn't some perfect dance. We weren't performing for anyone. We were just two people moving to a song, talking quietly while the rest of the room seemed to fade into the background.\n\nFor some reasons those few minutes meant more to me than I could explain. It was only a dance. Maybe three minutes, maybe a little more. A tiny portion of one night compared to all the time I had spent knowing her. I could hear the music around us, but I wasn't really listening to it anymore. I was too busy trying to remember everything, the feeling of her hand in mine, the rhythm of our steps, the small conversations between movements, and the fact that she was there with me. I didn't need the music to keep playing. I didn't even need her to feel what I felt. I was simply grateful that, for those few minutes, I got to experience something I had wanted for so long.\n\nBut even while I was happy, there was a small part of me that worried about her. I kept wondering if she was enjoying herself too. I didn't want to be selfish. I didn't want the dance to mean something only to me. I wanted her to be happy too. I wanted her to feel comfortable. I wanted the memory to belong to her too, even if it meant something completely different to her than it did to me. That was when I realized that caring about someone isn't always about wanting something from them. Sometimes, it is simply wanting them to have a good time, even when you don't know what place you have in their life.\n\nAnd maybe that's when I understood why those three minutes meant so much. I had spent so much time thinking about what I wanted from her that I almost forgot to appreciate what she had already given me, a moment, not a promise, not a relationship, and not a future. Just a moment where the person I cared about stood beside me, held my hand, and danced with me under the same lights. It didn't last long enough to become a lifetime, but it lasted long enough to become a memory I knew I would carry for a lifetime. Maybe that is what makes certain moments precious, not how long they stay, but how much we enjoyed them.\n\nEventually, the music ended. We let go of each other's hands, and the night continued. People kept talking, laughing, dancing, and moving around us, but something inside me had already accepted it. I knew that the dance couldn't change everything. It couldn't turn my feelings into something mutual, and it couldn't make her mine. There was a part of me that still wished it could have been different. I wished the circumstances were different. But I know that wanting something badly doesn't make it yours.\n\nSo I think I have finally learned to be grateful without asking for more. She may never know how much those few minutes meant to me. She may remember them as nothing more than a dance at prom, while I will remember the way my heart raced before I even reached her, the way every word I practiced disappeared when she looked at me, and the feeling of finally standing beside the person I had spent so long wanting to be close to. And maybe that's enough. I don't need to be hers to be thankful that, for a moment, she let me be beside her. I don't need to turn those three minutes into something they were never meant to be. I can let them remain exactly that they were three beautiful minutes of my life that I was lucky enough to experience with her. She was never mine to keep, and perhaps she was never meant to be. But for one song, under those lights, she was there. I held her hand, we moved together, and for those few minutes, I got to live a moment I had once only imagined. When I look back, I don't want to be sad that it ended. I want to be thankful that it happened at all. Thank you for letting me experience that. Thank you for being my yellow flower.",
    tag: 'PT - EffCom',
    author: 'Kim Dokja',
    date: '2026-08-09',
    time: '05:41 PM',
  },
  {
    id: 'effcom/post19',
    title: "The Silence After the Story",
    description: "When I was still a kid, around 5–10 years old, I used to be very optimistic and always think about the positive outcomes of situations. I would always make decisions expecting good things to happen, but then an event happened in my life that changed my way of thinking a little.\n\nIt was when my grandmother was sick. She was very old and could no longer walk on her own. She lived in our house, and we used to talk to her a lot. My friends and I were always getting scolded for playing too much. We really loved our grandma, and she always told us stories about how they survived the invasion of the Japanese. We enjoyed her stories even after hearing them many times.\n\nFast forward to the time when we moved to Virac and continued living there. We were having a rough time and were short on budget. Sometimes, we could not afford our grandmother's medication, but even then, I still thought that we could overcome the problem and that everything would be alright.\n\nThat was when, one morning, my auntie, who was visiting our house, rushed to tell us, crying, that our grandmother might be dead because she was no longer waking up or breathing. So, we rushed her to the hospital, and after a while, she was announced dead. That caught me off guard, and I was not ready. I never thought it would happen so suddenly.\n\nThen came her funeral. Her funeral was held in our house, and each of my dad's siblings was invited along with their families. We were mourning her death and cherishing her memories by telling her stories. Just when I thought that my grandmother was finally having a peaceful farewell, a fight between my father and my uncle broke out. They were fighting over their past, shouting and kicking the table. It got so bad that even my brother became fed up and shouted at them to stop. My mother told us to hide and told some of my siblings to hide the kitchen knives and other objects that could be dangerous. It was devastating for me. I never thought I would see them that angry, especially at someone's funeral. I knew that my dad and my uncle had a conflict in the past, but I never predicted that things could happen and escalate so quickly.\n\nAfter that, I finally realized that expecting things to always be fine and good can make you weak and unprepared for things. Now, when I make decisions, I always expect the worst things that could happen and prepare myself for them. I still sometimes think of the good things and wish for them to happen, but deep inside, I always prepare myself for the worst. Besides, it protects me from the pain when the worst or bad thing finally happens.",
    tag: 'PT - EffCom',
    author: 'Punò',
    date: '2026-08-09',
    time: '05:49 PM',
  },
  {
    id: 'effcom/post20',
    title: "Life in third person POV",
    description: "Education is something that is needed by everyone. Which is why everyone goes to school, although school is not only a place to gain knowledge, but a place to socialize, build relationships and generally better yourself because other people can show you the way.\n\nThroughout the entire month, I have met new people, in a new and unfamiliar environment. It is what made me be able to adapt and learn new things. Instead of shutting myself in my comfort zone. I have made new friends, made new relationships and learned from past mistakes. Moreover, I have also gained new skills that will help me in my life that I normally wouldn't be able to learn if I wasn’t “pushed” to do so. These experiences have collectively broadened my perspective, allowing me to see things I normally couldn’t. This really took a turn because even if I had no idea what was in store for me it gave me a lot of benefits in a new and unfamiliar environment. It is what made me be able to adapt and learn new things.\n\nInstead of staying in my comfort zone. I have made new friends, new relationships, and learned from past mistakes. Moreover, I have also learned new skills that will benefit me in my life that I otherwise would not have been able to learn if I wasn't \"pushed\" to do so. These experiences have all together broadened my mind and made me able to see things that otherwise I would not have been able to see.",
    tag: 'PT - EffCom',
    author: 'Neophyte',
    date: '2026-08-09',
    time: '06:22 PM',
  },
  {
    id: 'effcom/post21',
    title: "Why We Shouldn't Hold Back Our Love",
    description: "We all have that one reputation we subconsciously protect. For me, it’s being the \"steady one.\" The one who stays calm under pressure, keeps things light, and rarely—if ever—shows cracks in the armor. I don’t usually get emotional, especially not in front of a crowd.\n\nBut during our Senior Send-Off, the armor completely shattered.\n\nWhen it was my turn to give a message to Am, one of my closest friends, the words caught in my throat. Before I could even finish my first sentence, the tears just came. And I didn't just tear up—I cried. Hard.\n\nLooking around, I could see the shock on everyone's faces. For many of them, seeing me break down was completely out of character. It surprised a lot of people because they had never seen that side of me before. To be honest, it even surprised me a little.\n\nBut as I stood there, letting the tears fall while trying to speak from the heart, a wave of clarity hit me.\n\nWhy do we spend so much time hiding how deeply we care? Why do we wait until someone is leaving to let our walls down?\n\nI realized that keeping a \"cool\" or unemotional exterior is highly overrated. Tears aren't a sign of weakness; they are the ultimate proof of connection. Crying for Am wasn't something to feel embarrassed about—it was a reflection of how deeply she impacted my life and how much our friendship truly means to me.\n\nThe biggest takeaway from that emotional afternoon is simple: We shouldn't hold back our love for the people we care about.\n\nLife is too short, and genuine connections are too rare to keep bottled up. If you love your friends, tell them. If you are grateful for them, show them. And if the thought of them leaving makes you cry, let the tears flow. Loudly and proudly.\n\nTo Am, thank you for being a friend worth crying for. And to everyone else—don't wait for a send-off to show your people how much they matter. Hold onto them, value them, and never apologize for caring \"too much.\"",
    tag: 'PT - EffCom',
    author: 'Da',
    date: '2026-08-09',
    time: '06:25 PM',
  },
  {
    id: 'effcom/post22',
    title: "Memories are meant to be kept",
    description: "Ever since I was a child, my family and I have been going to a lot of different places. When I mean a lot, I mean A LOT of places. I enjoy every single moment my family and I spend, every laugh we share, every story we talk about during our trips. I always thought that we only go to places just to see the beautiful spots that tons of people go to, meet and be friends with others, and even just to try different foods.\n\nNot until I realized that it’s not for forever, that my family and I will not have a lot of time to be with each other as we grow older. We’ll all have our different paths. My older sister getting busier in her college life, and my brother going out of town for college. They are slowly drifting away, and I am also growing. It’s sad to think that someday, we’ll all have our different paths.\n\nBut even though we’re slowly drifting, we still make time to bond with each other. I am happy that we had a lot of great memories with each other, and happy that we’re still making and adding more memories with each other. I can say that there’s no wasted time making memories with my family. Even though they’re sometimes busy with something, they still try to make time. Here, I learned that no matter how busy life gets, we must still lend some time with our family. We are getting older and older, so we must cherish every moment with them.",
    tag: 'PT - EffCom',
    author: 'bitterbuttercup',
    date: '2026-08-09',
    time: '06:39 PM',
  },
  {
    id: 'effcom/post23',
    title: "Came Alone. Left With a Brochacho",
    description: "When I first began working out in a gym, I did not know anything. i would go to the gym by myself, examine all of the machines and other equipments, and attempt to determine how they worked. While I knew many of the machines functions, I did not understand the correct form of each exercise. I essentially tried to do everything on my own. The isolation of being at the gym alone made it slightly intimidating, however, I gradually grew accustomed to spending time at the gym.\n\nI first met a guy named Rafael or Rafa for short, while I was at the gym. He saw that I was performing several of my workouts using improper technique. Rather than ignoring me, he walked over to where I was and taught me how to perform those same exercises using proper technique. He also informed me of the risks associated with improperly executing these exercises. This conversation about my workout techniques eventually evolved into conversations and laughter. Eventually this casual exchange led to our developing a genuine friendship.\n\nLooking back, I never expected that meeting a friend through going to the gym would be one of the outcomes. Originally, when I initially decided to begin attending the gym, I assumed that I would be forced to figure everything out on my own. However, having someone who is willing to assist you and genuinely cares about your progress will make the overall experience so much better. I am very thankful for meeting Rafa. Not only has he assisted me in becoming efficient at working out in a gym setting. However, he has demonstrated to me how a small act of kindness can develop into a long lasting and meaningful relationship.\n\nMany times, we obtain the most valuable items from attempting something new or stepping outside of our comfort zone are not always the items we sought after when we attempted the activity. My initial intentions for attending the gym were to become knowledgeable about training in general. However, I discovered that finding a true friend during the process made the entire experience far more enjoyable.",
    tag: 'PT - EffCom',
    author: 'Yco',
    date: '2026-08-09',
    time: '06:50 PM',
  },
  {
    id: 'effcom/post24',
    title: "When Time Was Running Out, God Made a Way",
    description: "The Paglaom Youth Camp 2026 was an experience I really wanted to be part of but getting there became a challenge I never expected. At that time I was already dealing with academic pressure, schoolwork, and different responsibilities. On top of everything I was assigned to be the first sharer at the camp. As the time got closer I started questioning whether I could still make it. I felt pressured because I knew that people were expecting me to be there, but I also had responsibilities that I could not simply ignore. The more I thought about everything that could go wrong, the more impossible the situation seemed. I realized something about myself during that moment when I feel overwhelmed I tend to focus more on everything that might prevent me from succeeding than on the possibility that things could still work out.\n\nEven with all the pressure and uncertainty I decided to try. Time was running out and I honestly didn't know if I would arrive before my turn to share. There were so many things that could have stopped me from going, and I had already accepted the possibility that I might not make it.\nBut I kept going.\nThen somehow I arrived at the camp just minutes before I was supposed to share. I was tired and overwhelmed but at that moment I realized that I had made it despite everything that had been weighing on me. It made me reflect on how often I allow my circumstances to convince me that something is impossible before I even try. Sometimes I become so focused on controlling the outcome that I forget to trust God with the things I cannot control.\n\nThat experience taught me more than just the importance of perseverance It taught me something deeper about faith and trust.\nI learned that trusting God does not mean that all our problems will suddenly disappear It means continuing to move forward even when we don't know exactly how everything will turn out.\nI may have responsibilities, pressure and moments when I feel like I cannot do everything but I don't have to carry the uncertainty alone. I can do what I can and entrust the things beyond my control to God.\nThe experience also reminded me that God's timing and plans may not always look the way I expect them to. What I thought was already impossible still had a way forward.\nThis became a personal reminder for me when life feels overwhelming and time seems to be running out I should not immediately assume that there is no way I should take the next step do my part and trust him with the rest.\nBecause sometimes the greatest lesson is not that everything went according to our plan but that we learned to trust God even when it didn't.",
    tag: 'PT - EffCom',
    author: 'Pogi si Lowiee',
    date: '2026-08-09',
    time: '07:08 PM',
  },
  {
    id: 'effcom/post25',
    title: "6 Colors : Different patterns",
    description: "At first, I thought solving a Rubik’s Cube was impossible. Whenever I tried to turn its colorful sides, I only made it look more confusing. I would mix the colors even more and sometimes felt frustrated because I did not know where to start. However, I became curious and trying my best to understand how to solve it.\n\nAs I continued practicing, I learned that solving a Rubik’s Cube requires patience, focus, and determination to solve it. I started by learning the basic steps, like making the flower or the first pattern. At first, it was difficult to remember the moves, and I often made mistakes. But through practice, I slowly understood how each move affected the pieces of the cube. Every time I learn a pattern I must memories it , I felt motivated to continue until I finally solved the entire cube.\n\nSolving a Rubik’s Cube taught me an, not every problem can be solved immediately. Sometimes, we need to be patient, learn from our mistakes, and try again. The Rubik’s Cube may only be a small puzzle, but for me, it represents determination and problem-solving. Every solved cube reminds me that with enough practice and patience, even something that once seemed impossible can eventually be accomplished.",
    tag: 'PT - EffCom',
    author: 'Juan',
    date: '2026-08-09',
    time: '07:14 PM',
  },
  {
    id: 'effcom/post26',
    title: "RUBIK'S CUBE THOUGHT ME",
    description: "At first, I thought the Rubik's cube was just a colorful toy that was difficult to play with, but I became interested in it because I had wanted to learn how to solve it for a long time. In the beginning, it was exhausting and frustrating.the kind of experience where you’d just finish solving one side, only to mess everything up while trying to work on the other.still Kept trying \n\nAs I practice, I learned that the Rubik's cube is not about being smart or being fast, it requires focus, patience and determination. when I make a mistake, I go back, I find out where I went wrong and I try again,\n\nThe Rubik's cube taught me that a problem becomes easier when you take it one step at a time, rather than trying to solve it all at once.\n\nSolving a Rubik’s Cube gives me a sense of accomplishment because I know that every successful solve comes from practice and perseverance. It reminds me that life can sometimes feel like a scrambled puzzle, but being patient and refusing to give up can help me find a way forward.\nA Rubik’s Cube may be small, but the lessons it teaches me are much bigger",
    tag: 'PT - EffCom',
    author: 'LEBRON JAMES',
    date: '2026-08-09',
    time: '07:30 PM',
  },
  {
    id: 'effcom/post27',
    title: "Buried in Schoolwork",
    description: "Im pretty sure everyone has procrastinated at least once in their life, so im sure that many of you can relate. Today, I want to share one of the worst hardships I faced because of procrastinating.\n\nDuring the 2nd half of 9th grade, I really did not focus that much on school. School had also become fast-paced because DepEd wanted to revert back to the old schedule. This meant that there was less time between deadlines, making it harder for me to keep up with my schoolwork. Because of that, the activities, assignments and the projects kept piling up on me. Since I was also trying to complete those missed activities, it made me miss some of the following activities. It put me through some kind of inescapable cycle. I only managed to pass that year because I managed to rush those activities and projects in a few days, along with the patience and kindness my teachers had.\n\nAlthough I still have this kind of ongoing battle with procrastination. This experience serves as a reminder of how much harder things can become when I continue to put them off.",
    tag: 'PT - EffCom',
    author: 'CT',
    date: '2026-08-09',
    time: '07:37 PM',
  },
  {
    id: 'effcom/post28',
    title: "Δανεικό Ψάρι",
    description: "He asked me for money. I gave it to him without thinking — and only realized afterward that I'd handed over something I never actually owned.\n\nNothing dramatic happened, not on the surface. A kid, a hand held out, eyes that already knew how strangers usually react. I reached into my pocket, gave him what I had, and kept walking, the way you do. But a phrase followed me for the rest of the day, one I hadn't gone looking for: borrowed fish. Not given. Borrowed.\n\nIn Greek, δανεικός doesn't just mean borrowed. It's the word behind δανεικός χρόνος — borrowed time, the kind you're living on that was never really yours, and that eventually gets called back. That's closer to what I'd actually handed him. Not something he got to keep. A loan against a debt that isn't even his.\n\nI'm not saying don't give. If someone's hungry, feed them — that part isn't up for debate. What bothered me was smaller, and harder to explain. I'd handed over a few coins and felt like I'd done something, when really I'd just pushed the question back by a day.\n\nHe'd be hungry again tomorrow. And the day after that. The money wasn't an answer. It just bought a little time — and time you borrow always comes due.\n\nHere's the part I don't love admitting. Some of this landed the way it did because I know what quiet hunger feels like. There were stretches growing up where dinner just didn't happen, and I got good — too good — at not letting it show. Nobody taught me that. You figure it out on your own, the same way you figure out which smile buys you a little more time before someone starts asking questions.\n\nSo when I looked at that kid, I wasn't looking at a stranger. Not exactly. Something closer to home looked back.\n\nWhat stuck with me afterward wasn't guilt. Or not only that. It was the thought that everything I'd been given as a kid — a meal somebody quietly covered, help that showed up right when I needed it and never asked to be thanked — was borrowed too. Somebody lent it to me without ever expecting it back directly.\n\nMaybe that's the whole point of the word. Borrowed help doesn't disappear once you use it. It just changes hands, and waits for you to be able to pass it on.\n\nWe tend to treat problems like a leak in a roof — something's dripping, so we grab a bucket. Another program. Another donation drive. Another good deed for the day. Sometimes a bucket really is enough.\n\nBut I keep noticing how much time we spend emptying buckets, and how little we spend asking why the roof keeps failing in the same spot. You can hand out fish for the rest of your life and never once wonder why the pond keeps running dry on that side of town.\n\nReal help has to hold two things at once, and neither one lets you off the hook for the other. You can't tell a hungry person to wait around for the system to get fixed before they're allowed to eat — that's its own kind of cruelty. But you can't let the relief of the moment convince you the debt's settled either. It isn't. It's just been passed further down the line — still borrowed, still waiting on somebody to actually deal with where it started.\n\nWhat actually breaks a cycle like that isn't one more transaction. It's whatever lets someone stop needing to ask in the first place. School that's actually within reach. Work that pays enough to live on. Neighbors who notice before things get to the corner of the street.\n\nNone of that fits in a pocket. And none of it feels as good in the moment as watching someone's face change when you hand them money. It's slower. It asks more of you. But it's the only kind of help that isn't just borrowed time.\n\nI don't know what happened to that kid after he ran off. I gave him something small and walked away carrying something bigger — a phrase I still haven't set down. Δανεικό ψάρι. Borrowed fish. Not because what I gave wasn't real, or wasn't worth giving. But because none of it was ever mine to give away for good.\n\nIt was only ever mine to pass along. Which means, in a way, so is this.",
    tag: 'PT - EffCom',
    author: 'Nikos Fotiadis',
    date: '2026-08-09',
    time: '08:00 PM',
  },
  {
    id: 'effcom/post29',
    title: "My High School Journey",
    description: "Walking through the school doors on my first day is something I will never forget. I was so nervous because everything was new, from fixing my schedule to making friends. Learning how to move around the new school helped me figure out what I like, and I quickly saw that growing up outside the classroom matters just as much as getting good grades.\n\nNobody gets through these years alone, and my family, friends, and teachers became my safety net. This was very true when I moved into Senior High School, which let me study things I want to use for my future. Having people to talk to helped me handle the stress of big tests and taught me how to work well with others.\n\nNow that graduation is here, I am looking ahead to college and my future goals. The best part of my diploma isn't the paper, but the fact that I learned how to stand up for myself and try again when I failed. Senior high school gave me the confidence I need, and I am excited to start the next part of my life.",
    tag: 'PT - EffCom',
    author: 'Dwight Ramos',
    date: '2026-08-09',
    time: '08:12 PM',
  },
  {
    id: 'effcom/post30',
    title: "A Lovely Moment with Life's Juliet",
    description: "As my Junior High journey started with a bliss of hope in my section, I was elected as class president. I truly appreciated their trust in my ability to lead. As the president, I was given a task by the Supreme Student Government (SSG) to fill out the attendance sheet for every subject teacher we had. These tasks were given to me by a beautiful girl who looked like Juliet. The moment our eyes met, I knew she was the one, she is the love of my life.\n\nMy life turned into a love story from that single interaction. I began researching who she was and how I could be with her. Then, a lifesaver arrived, a classmate of hers who told me her name. That was the official beginning of our story. After I found her social media accounts, I messaged her with the intention of becoming her boyfriend. Everything went well, and she accepted me. The girl of my dreams was finally my girlfriend.\n\nAs life continued, we faced hardships, academic pressure, and heavy responsibilities, all while trying to support our relationship. Though it wasn't smooth sailing, we made it through with good communication. There were nights when I thought we were drifting apart, and times when I feared we would break up, but fate had other plans. Fate gave us the hope to stay strong and the willpower to push through everything successfully. It allowed us to grow closer through every challenge we faced.\n\nThree years in the making, and I am hoping for many more years to come. Loving my \"Juliet\" was never a smooth road; it was a path filled with side quests and life lessons. She was never a distraction, but an inspiration to be better. To life's Juliet, my light in every situation: you have never led me into darkness, but always toward success.",
    tag: 'PT - EffCom',
    author: 'Adem.',
    date: '2026-08-09',
    time: '08:25 PM',
  },
  {
    id: 'effcom/post31',
    title: "NOT JUST A GAME",
    description: "At first, I thought solving a Rubik’s Cube would be easy, I’d seen others do it quickly. But when I tried myself, I got confused by all the patterns and moves. I kept making mistakes and couldn’t even finish one side. I felt frustrated, but I really wanted to learn, so I asked my classmates to teach me.\n\nEven with help, I still struggled. Sometimes I’d mess up the colors I’d already fixed, and I felt like giving up, I thought I just wasn’t good enough. But my classmates explained things slowly and showed me the right steps. I practiced the same moves over and over until they started to feel familiar. I learned that making mistakes is just part of learning. Instead of getting upset, I’d figure out what went wrong and try again. I didn’t give up.\n\nFinally, after so many tries, I solved it! I felt so happy and proud, all my effort truly paid off. It might look small to others, but to me, it meant so much. This taught me that struggling doesn’t mean I can’t do it. I just need patience, practice, and the courage to ask for help. Success rarely happens on the first try, what matters is keeping going, learning from mistakes, and never quitting.",
    tag: 'PT - EffCom',
    author: 'WOW',
    date: '2026-08-09',
    time: '08:43 PM',
  },
  {
    id: 'effcom/post32',
    title: "Wait... BIRDBRAINs exists?!?!",
    description: "Have you ever seen or heard about a birdbrain?\n, I'm a birdbrain. Why do i call myself that?\nWe're gonna talk about that.\n\nOn the outside, I probably look calm, or maybe just quiet, but underneath the surface, my brain is full of unsure-ness. I stress a lot. I'm constantly anxious about what people think of me or what they'll say to me. I've become too afraid of what others will say. And I'm somewhat incompetent of myself, anything that I say will be wrong, or mess something up.\n\nI'm an introvert, and sometimes it hurts to be one. Being alone hurts, but trying to be more outgoing and making friends makes me start to question if I even deserve friends, so I don't bother. I barely had any success with socializing, so I stay \"out of line,\" as in staying the way I am. Change isn't that bad, but I like and don't like it where I am right now at the same time.\n\nI have this feeling that I'm built wrong. I believe that my introverted nature is the result of that. There's so much passion, but more I'm lacking. I have so many passions to do things I want, but I feel like I completely lack skills.\n\nSometimes, I chicken out on ideas that I want to do, faltering on the forethought.\n\nWhen I'm in a state of mind as being too unsure of myself to do anything, I scurry around aimlessly like a chicken with its head cut off.\n\nI struggle when I'm in a conversation that seems to go better than I expected. I dont know what to do. Do i stop? Do i keep talking? Will it be too much? Will it be too little? Did i ruin it?\n\nSometimes, I run my mouth when I'm nervous, and it can sound like annoying or dumb. What's worse is that I'm all aware of it.\n\nSince I'm so unsure of myself, I dont know where im supposed to be. I feel like I'm constantly invalidated. Maybe I'm being disliked by people without even realizing it. Even with support, my relationships feel unsalvageable because I don't even know what I’d do if someone actually decided to stick around.\n\nI'm so damn selfish. I really don't want to stay stuck like this. Even though I feel completely broken and pathetic sometimes. I'll try to force a positive outcome. I wanna hear what people think about me\n\nI'm tired of the same routine: trying to improve myself and still make the same mistakes. I'm not confident with my decision-making abilities, so i ask someone to validate my decisions.\n\nIs it all for a show? \nIs my suffering real?\nAm i just making it worse in my head?\nWhy do others seem to handle life better?\nIs something truly wrong with me?\n\nThose questions spiral in my head constantly. Im starting to doubt myself, even my own feelings, like i can't trust myself anymore. Is my ignorance actually real, or is it an excuse?\n\nI have a feeling that the real me is what pushes other people away.\n\nA Counterfeited crooning cosmonaut.\n\nAnd maybe that's what makes me truly a birdbrain.\n\nNot because I'm stupid.\n\nNot because I don't care.\n\nBut because my brain just won't stop flying.\n\nNote: This is heavily inspired by BIRDBRAIN by Jamie Paige. 😛",
    tag: 'PT - EffCom',
    author: 'Birdbrain',
    date: '2026-08-09',
    time: '08:46 PM',
  },
  {
    id: 'effcom/post33',
    title: "The Christmas That Made Me See Differently",
    description: "Have you ever cried on Christmas, not happy tears but sad? I once did when me and my family were celebrating Christmas last year in a hotel. I was walking on the empty streets of ARDCI Hotel, when I saw a little boy playing with his toy. The boy look malnourished and messy with ripped up orange shirt and no slippers. He was running around somewhat happy with his toy in his hand running around.\n\nThen when it starts— tears started falling. I didn't know why. I didn't understand why I was crying. Only that I felt sad for the little boy because he was spending his Christmas on the street all alone while I was celebrating at the top floor Hotel with my family, full of gifts and food. I felt a ache in my chest, was it guilt or something else?\n\nThen I realized that what I felt was sympathy or somewhere along the line. I also then felt grateful for what I have. I felt our differences. I had a warm place to stay, a family beside me, food to eat, and gifts waiting for me, while he had only the street and his toy. Yet, despite having so little, he still looked happy while playing. That moment made me realize that happiness is not always about how much we have. Sometimes, it comes from the simplest things, even a small toy or a moment of joy.\n\nI also realized that I often take the things I have for granted. I was so used to having food, shelter, and people around me that I never stopped to think about how fortunate I was. Seeing that little boy made me look at my life differently. It reminded me that there are people who are going through struggles that I may never fully understand. I never talked to the boy, and I never knew his story.\n\nThat little boy may not remember me, and he may not even know that I saw him that night. But for me, that moment became more than just a memory from Christmas. It became a reminder to be more grateful, more aware, and more compassionate. Sometimes, we don't need a big event to change the way we see life. Sometimes, all it takes is seeing someone else's world for a few minutes to realize how different our own world can be.",
    tag: 'PT - EffCom',
    author: 'Master Manipulator 6767',
    date: '2026-08-09',
    time: '08:56 PM',
  },
  {
    id: 'effcom/post34',
    title: "Beyond My Comfort Zone",
    description: "I used to think that my classmates were judging me every time I spoke. When I was in Grade 7, I was very anxious around people, especially my classmates. I often stayed quiet because I was afraid of making mistakes or embarrassing myself in front of others. Even simple conversations felt difficult, so I preferred to keep to myself whenever I could.\n\nOne day, I had no choice but to ask for help because of an assignment. I was nervous before approaching my classmates, and I expected the interaction to be awkward. I kept thinking that they might ignore me or think I was bothering them. However, when I finally asked for help, they responded kindly and willingly explained what I needed to understand.\n\nThat experience changed the way I viewed the people around me. I realized that my classmates were not as scary as I had imagined. Most of the fear came from the assumptions I had created in my own mind. A simple act of asking for help showed me that people can be more understanding and supportive than I expected.\n\nLooking back, that assignment became more than just a school task. It became a lesson that helped me grow. I learned that stepping outside my comfort zone, even in a small way, can lead to positive experiences. Although I still get nervous sometimes, I am now more willing to talk to others and ask for help when I need it. That moment taught me that courage often begins with one small step.",
    tag: 'PT - EffCom',
    author: 'Baduya',
    date: '2026-08-09',
    time: '09:10 PM',
  },
  {
    id: 'effcom/post35',
    title: "𝑻𝑹𝒀𝑰𝑵𝑮 𝑪𝒀𝑪𝑳𝑰𝑵𝑮 𝑺𝑷𝑶𝑹𝑻",
    description: "I decided to try cycling sport because I wanted to experience something new and it's because my bestfriend has a bike and I want to go ride with him. At first, I was just interested in riding my bicycle around my area. As I spent more time in riding my bike, I started to enjoy it more. It became fun activity where I could explore places, improve my riding skills, spend time outdoors, and also improve my physical fitness or endurance.\n\nOne of the most memorable things was meeting more friends. I met other cyclists who also loved riding bicycles. We talked about our bikes, shared our experiences, and sometimes ride together.\n\nMeeting new people made cycling more enjoyable for me. It showed me that cycling is a very fun sport... and also tiring sport. Because of cycling, I gained not only a hobby or sport but also new friendships and memories.\n\nMy cycling experience also taught me an important lesson about road safety. Sometimes, other cyclists can become too confident, careless or what we called \"𝘒𝘢𝘮𝘰𝘵𝘦\" while riding. I learned that being reckless on the road can cause injuries, accidents, or worse, it can make you vanish in this world.\n\nWe should always be careful, follow traffic rules, watch the road, and respect other road users, no matter how experienced we become, safety should always be our priority.\n\nI hope I can continue cycling, explore more places, and make more memories with friends.\n\n𝙎𝙏𝘼𝙔 𝙎𝘼𝙁𝙀🫶",
    tag: 'PT - EffCom',
    author: 'Jom',
    date: '2026-08-09',
    time: '09:18 PM',
  },
  {
    id: 'effcom/post36',
    title: "Breaking the Cycle: Losing and Finding Myself",
    description: "Every day feels like the same thing on repeat. Wake up, rush around, deal with whatever's waiting for me, then crash into bed just to do it all again tomorrow. That's basically my life right now. Between school, family stuff, and all the little promises I make to myself that I never actually keep, my to-do list just keeps growing instead of shrinking.\n\nAnd here's the weird part, even though I'm always \"busy,\" I still feel completely unfocused. My hands are full but my brain is all over the place, jumping between a bunch of half-finished things instead of actually being present for any of them. It's kind of ironic, honestly, being exhausted from doing so much but still feeling like none of it actually mattered.\n\nThis is basically the story of how I started noticing that and what it ended up teaching me.\n\nIt didn't hit me all at once. It started small, missing deadlines, forgetting stuff I said I'd do, and this guilty feeling I couldn't really explain. At first I blamed everything else. Too much homework, not enough time, everyone expecting too much from me. It was way easier to blame outside stuff than admit anything about myself.\n\nBut eventually I had to be real with myself. It wasn't just my situation, it was how I was dealing with it. I was just reacting to everything instead of actually thinking things through. I kept packing my schedule without asking if any of it even mattered to me. I said yes to stuff because I felt like I had to, or because I didn't want to disappoint people, and said no to the things I actually needed, rest, or just time to think straight.\n\nThat was a hard thing to admit. It's one thing to feel stressed because of everything going on around you, but it's another to realize some of that stress you're putting on yourself. I started noticing the pattern: procrastinating on stuff that actually mattered, then getting mad at myself for procrastinating. Comparing myself to other people and feeling like I was behind. Letting one small mess-up turn into this whole story in my head about how I \"just wasn't good enough.\"\n\nThat's when the negative thoughts started creeping in. Not because my life was actually that much harder than anyone else's, but because I kept looking at normal, everyday struggles as if they meant something was wrong with me. Every missed assignment felt like proof I couldn't handle things. Every tired night felt like more evidence that I was failing at something everyone else seemed to just get. I wasn't just tired, I was disappointed in myself, and that disappointment just kept feeding the same cycle I was trying to get out of.\n\nOnce I actually saw the pattern for what it was, I couldn't keep telling myself it was just bad luck or not enough hours in the day. So I started small. Stopped saying yes to everything. Started actually asking myself if something mattered before agreeing to it. I left space in my schedule, even if it was just twenty minutes to sit there and not do anything, instead of jumping straight to the next task. And when I messed something up, I tried to catch myself before it turned into \"I'm just not good enough\" again, and just called it what it actually was. One mistake. Not proof of anything.\n\nIt didn't fix everything overnight, I still get overwhelmed all the time honestly. But I stopped mixing up being busy with being okay, and that changed how the whole cycle felt, even if it's still kind of messy.",
    tag: 'PT - EffCom',
    author: 'unknown',
    date: '2026-08-09',
    time: '09:23 PM',
  },
  {
    id: 'effcom/post37',
    title: "From Reluctant Older Sibling to Devoted Protector",
    description: "Growing up as the youngest in the family, I was comfortable in my role until I turned 11 years old and suddenly found out I was getting a baby brother. The massive 11-year age gap came as a total shock, and at first, I really wasn't sure how to feel about losing my spot as the baby of the family. However, a single moment changed everything and made me realize just how deeply I cared for him. One day while holding my little brother, I tripped and lost my balance. In a fraction of a second, instinct completely took over I hugged him tightly against me and used my own arm to break our fall against the floor, ensuring his head stayed completely safe from impact.\n\nTaking that hard fall to protect him made me realize how much love I actually had for my little brother, regardless of our age difference. Taking care of younger siblings can definitely be challenging at times, but that quick instinct proved that family bond goes far deeper than any initial hesitation. I learned that day that I will always protect my little brother, no matter what it takes or what sacrifices I have to make. Replacing my role as the youngest didn't mean losing my place in the family; it just gave me a new, incredibly rewarding job as his devoted big sibling and protector.",
    tag: 'PT - EffCom',
    author: 'Dr. Padampadam',
    date: '2026-08-09',
    time: '09:24 PM',
  },
  {
    id: 'effcom/post38',
    title: "First Step of Healing",
    description: "These past few months, I feel so lost and disconnected. The feeling of losing yourself slowly, day by day. The feeling where you don't know where to go anymore—‘cause everywhere feels so heavy and overwhelming. The feeling when you’re conflicted about what you truly feel, because you always tend to project positivity, even during your lowest point in life. But despite all of this—despite feeling so exhausted and having the desire to give up—there are people who have saved my life by simply easing my burdens and making my days lighter.\n\nNovember to December 2025, the worst time in my life so far. It was one of the most hard moments in my life—I was physically, mentally, and emotionally sick. School activities kept piling up, my missed quizzes and lessons, the pressure, relationship and family problems, health problems, and insecurities— all at once. It was really too much to carry all these. Every single day, I would always bring this heavy feeling in my chest. But even if I feel really drained, I don't actually show that I'm actually struggling.\n\nI'm the type of person who's really loud and energetic, making sure that everyone is having a great time. The type of person who keeps on smiling and laughs at everything. The type of person who can light up a room's mood. That's why I'm really struggling to open up—because for others, they see me as someone who's really carefree. But in reality, it's just my way of coping. Yes, it is truly my personality where I'm all excited and talkative. It's just, whenever I'm surrounded with positive people, it makes me forget all my problems completely.\n\nI needed help, but of course, I didn't want to burden others with my struggles. Also, I really don’t like asking for help because I grew up doing things all by myself.\n\nI can do this alone, right..?\n\nWrong. I absolutely cannot do this all by myself. Bottling up emotions is not a good idea—it would just make things worse.\n\nFinally, that one day came. I broke down the wall. I did not hold back my emotions. I told my friends everything I went through—hoping that finally opening up would end this miserable cycle. It felt really amazing to cry after holding back for so long. I'm actually really grateful they were there during that time, it genuinely melts my soul. I've never felt this vulnerable, even with my own family.\n\nBut when I'm alone, the heaviness rushes back. I thought I was doing better. I thought I was healed. But it never left—I was just distracted. I was really frustrated and overwhelmed of how things are for me.\n\nHowever, realization hit me. Although the miserable cycle doesn't seem to end, one thing I realized for sure is that healing isn't a straight line, and acknowledging my pain is the first step toward actually processing it instead of just hiding from it. It doesn't magically disappear, but rather it disappears really slowly. I just need to understand further why I feel this way so that I am finally ready to share my struggles with the people who can do the same as well.\n\nThank you so much for reading!;) I wrote this while crying lolol",
    tag: 'PT - EffCom',
    author: 'idkplsignorethis',
    date: '2026-08-09',
    time: '09:50 PM',
  },
  {
    id: 'effcom/post39',
    title: "How an Indie Game shaped me",
    description: "We often associate our biggest life-changing lessons with older individuals or life altering failures. Yet the source of my redefined perspective came through an unconventional outlet- a video game titled Undertale. It completely altered the way that I perceive the way that I operate in this world and the way that I interact with others.\n\nMy entire worldview was irrevocably changed as I developed a comprehensive understanding that kindness is a difficult but incredibly worthwhile choice.\n\nIt is remarkably easy for someone to be selfish or lashing in trying circumstances. However, real strength isn’t in the way that an argument is concluded or a battle is won- it’s in the empathy and perseverance to acknowledge that every individual we come into contact with is fighting an internal war. This fact instilled genuine responsibility: every single choice we create in a vacuum, in reality leaves its marks, indelible and irremovable on everyone around us. Now, I carry the same mission every day: embrace empathetic endeavors despite how incredibly taxing it may be.",
    tag: 'PT - EffCom',
    author: 'SailedWhisper',
    date: '2026-08-09',
    time: '10:34 PM',
  },
  {
    id: 'effcom/post40',
    title: "Realizations become our lessons",
    description: "I remember when the enrollment for senior high in national had just recently been announced, \"oh it's almost time to enroll na pala\" I said to myself, at that time, I thought that senior high would just be like junior high. It was a little easy, you have plenty of time to hangout with friends and you had just the right amount of school projects or activities.\n\nThen enrollment came, I thought that it would also be the same as junior high enrollment, quick and easy, but when I arrived at school and went to the enrollment room, it was the opposite of that. We needed to attend an orientation about the importance of choosing the best career path for ourselves, at first I was stunned because I was so used to the past enrollments, but it did made sense after a short while since it's the beginning of senior high. After the orientation, we were told that we needed to be interviewed so that they could guide us to the necessary track to help us in our career path.\n\nFast forward to the second and the third weeks of classes, It was pretty tame, and i thought that they would give us plenty more assignments or activities, little did I know that they would answer that thought. Activities after activities, assignments after assignments kept piling up as we go through the week, I felt exhausted at those days when we had so many things to do and while feeling that, I come to remember what I said before enrollment, \"it would just be like junior high\". I was totally wrong, and I underestimated that it would actually be this hard. And with that thought, I learned that, junior high and senior high are two distinct stages in your academic life, you shouldn't underestimate one thing and assume that it would be the same as the last thing because it would make things harder. So before you think that it would be easy, look at it thoroughly if you can even do it, and if you can't, then learn about it.If you can learn one thing, you can learn a lot more things just because of that one thing.",
    tag: 'PT - EffCom',
    author: 'Ildefonso Jose T. Vargas (Ij)',
    date: '2026-08-09',
    time: '10:39 PM',
  },
  {
    id: 'effcom/post41',
    title: "The Cooler Brother",
    description: "Growing up, I've received plenty of comments saying that growing up with older siblings is a privilege. And to be honest, they were damn right. It was always an amazing feeling to be recognized based on who you're related to. And in this case, it was my cooler older brother.\n\nIf you've known me for a while, you'll know that most of the things I do are solely because my brother did them. But has it ever occurred to you exactly why I did them? In order for me to answer that, we need to take a trip down memory lane.\n\nBack when I was a kid, me and my brother would usually play around and do some rough housing from time to time. Sure, we'd get into fights every week or so, but we'd always make up to each other. Why you may ask? Simple. Because we're brothers. No matter what kind of rabbit hole you get yourself into, older brothers are always there to lend a hand.\n\nAs I progress through elementary, my older brother entered highschool. And ever since then, he'd stay at our grandparents house so he could save on the tricycle fare. We'd only fetch him there every friday, So I only got to see him during weekends. But that was merely enough to break our bond. Because as a brother, It is important to maintain your relationship with your sibling not simply because you are related, but because they were there for you when you weren't feeling like yourself. It's only right to be there for them when they were there for you.\n\nWhen my older brother hit a growth spurt, Young me thought he was the biggest and coolest guy in the world now that he's a giant. He'd also frequently tell me stories about the fights he's been in. He was the coolest teenager back then in his time.\n\nAs I grow older, I seem to realise that I'm following in my brother's footsteps. Because growing up, he was my role model. I mean, who wouldn't wanna be someone as cool as him? I'll never be half the man my brother is. Which is why I need to keep on striving. Not for me to become like my brother. But to become better than him. Just like he once said \"Me, Daws, and Ate have a younger brother na magiging mas maurag pa samo.\" And with that, I conclude.",
    tag: 'PT - EffCom',
    author: 'Adamn',
    date: '2026-08-09',
    time: '10:41 PM',
  },
  {
    id: 'effcom/post42',
    title: "The Biggest Lesson I Learned From My Mom",
    description: "My mom.\nShe always compares me to other people.\n_\"Why can’t you be like your sister?\"_\n_\"Look at her, she's good, What about you?\"_\n\nEven though we all have different strengths, different dreams, different timelines...\nShe doesn’t appreciate the things she should understand.\nMy effort. My silent battles. The small progress that means so much to me.\n\nAnd the hardest part?\nIt’s my own mom who brings me down.\n\nBecause of what they said, I learned to become a different person.\nI proved them right.\nI started drinking. I hung out anywhere.\nI went from place to place just to distract myself and forget.\n\nBut I realized... *I was wrong.*\nThere was a better way.\nThere was something better to prove.\n\nI still accept the hurtful words.\nIt still hurts. It’s still heavy when that’s how they react and treat me.\nBut it’s okay now.\n\n*Because I’m using it as motivation.*\nJust because they said bad things doesn’t mean you give up.\nYou have to get up.\nYou have to prove them wrong.\n\nNot to get back at them. For myself.\nTo prove that I’m not who they say I am when they’re angry.\nThat I’m not \"a failure.\"\nThat I have my own time. My own story. And I deserve to be valued too.\n\nTo every Nzkeei out there who’s also hurting at home:\nI see you. I know you’re tired. You want to give up.\nBut please don’t.\n\nYou will fall. You will cry. But you will rise again.\nOne day, the people who compared you will be the ones surprised by who you’ve become.",
    tag: 'PT - EffCom',
    author: 'Nzkeei',
    date: '2026-08-09',
    time: '10:46 PM',
  },
  {
    id: 'effcom/post43',
    title: "Beyond the Weights: How Discipline and the Gym Completely Transformed My Life",
    description: "For a long time, I thought \"discipline\" was just a buzzword people threw around to make waking up at 5:00 AM sound appealing. I used to rely entirely on motivation. If I felt like working out, I wouldn’t tired, stressed, or just lazy, I’d stay on the couch. Unsurprisingly, that approach got me nowhere not in fitness, and certainly not in life.\n\nEverything shifted the moment I stopped waiting for motivation and started building discipline. Walking through the gym doors consistently especially on the days I least wanted to became the catalyst for a total life transformation.\n\nHere is how committing to the gym rewritten my daily life:\n\nDiscipline Over Motivation, Motivation is fleeting, but discipline is a muscle you build. Learning to show up and execute a workout when I had zero energy taught me how to handle tough assignments, work deadlines, and personal hurdles without making excuses.\n\n𝗠𝗲𝗻𝘁𝗮𝗹 𝗖𝗹𝗮𝗿𝗶𝘁𝘆 𝗮𝗻𝗱 𝗥𝗲𝘀𝗶𝗹𝗶𝗲𝗻𝗰𝗲, The gym became my mental reset button. Pushing through heavy sets taught me how to stay calm under pressure. The physical grit I developed directly translated into mental toughness in my everyday life.\n\n𝗧𝗵𝗲 𝗣𝗼𝘄𝗲𝗿 𝗼𝗳 𝗖𝗼𝗺𝗽𝗼𝘂𝗻𝗱𝗶𝗻𝗴 𝗦𝗺𝗮𝗹𝗹 𝗪𝗶𝗻𝘀, You don't build a better physique or a better life in one day. Progress comes from small, repeatable choices one repetition, one meal, and one workout at a time. Seeing physical results over months proved to me that consistent effort always pays off.\n\n𝗖𝗼𝗻𝗳𝗶𝗱𝗲𝗻𝗰𝗲 𝗥𝗼𝗼𝘁𝗲𝗱 𝗶𝗻 𝗘𝗳𝗳𝗼𝗿𝘁, True confidence doesn't come from compliments it comes from keeping the promises you make to yourself. Knowing that I set a goal and followed through built an authentic sense of self respect that no one can take away.",
    tag: 'PT - EffCom',
    author: 'Jon Rafael Caballar (Rafii)',
    date: '2026-08-09',
    time: '10:47 PM',
  },
];