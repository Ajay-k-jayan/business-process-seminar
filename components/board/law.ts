// First topic: "Ignorantia juris non excusat" — not knowing the law is no excuse.
// Facts follow the Wikipedia article "Ignorantia juris non excusat"; the road story, umbrellas and quiz cases are our own examples.
// Written in simple, plain English for the seminar audience.

import {
  B,
  F,
  G,
  K,
  O,
  R,
  arrow,
  book,
  bubble,
  coverBoard,
  cross,
  ellipse,
  gazette,
  hl,
  line,
  panel,
  path,
  person,
  poly,
  rect,
  scooter,
  text,
  tick,
  tip,
  title,
  type Board,
  type Item,
  type Step,
} from './kit';

function board(id: string, label: string, page: string, build: (st: (say: string, ...g: Item[][]) => void) => void): Board {
  const steps: Step[] = [];
  build((say, ...g) => steps.push({ say, items: g.flat() }));
  return { id, label, page, steps };
}
const SRC = 'Law basics';

/* ---- everyday drawings for this topic (no shop, no rice: those belong to topic 2) ---- */
/** motorbike helmet, bottom centre (cx, by) */
function helmet(cx: number, by: number, s = 1): Item[] {
  const X = (v: number) => (cx + v * s).toFixed(1);
  const Y = (v: number) => (by + v * s).toFixed(1);
  return [
    ...path(`M ${X(-44)} ${Y(0)} L ${X(-44)} ${Y(-14)} Q ${X(-44)} ${Y(-62)} ${X(0)} ${Y(-62)} Q ${X(44)} ${Y(-62)} ${X(44)} ${Y(-14)} L ${X(44)} ${Y(0)} Z`, { fill: F.orange }),
    ...rect(cx - 10 * s, by - 34 * s, 54 * s, 20 * s, { fill: F.sky, w: 4 }),
  ];
}
/** umbrella, bottom of the handle at (cx, by) */
function umbrella(cx: number, by: number, s = 1, fill: string = F.purple): Item[] {
  const X = (v: number) => (cx + v * s).toFixed(1);
  const Y = (v: number) => (by + v * s).toFixed(1);
  return [
    ...path(
      `M ${X(-72)} ${Y(-126)} Q ${X(-72)} ${Y(-196)} ${X(0)} ${Y(-196)} Q ${X(72)} ${Y(-196)} ${X(72)} ${Y(-126)} Q ${X(54)} ${Y(-140)} ${X(36)} ${Y(-126)} Q ${X(18)} ${Y(-140)} ${X(0)} ${Y(-126)} Q ${X(-18)} ${Y(-140)} ${X(-36)} ${Y(-126)} Q ${X(-54)} ${Y(-140)} ${X(-72)} ${Y(-126)} Z`,
      { fill },
    ),
    ...path(`M ${X(0)} ${Y(-128)} L ${X(0)} ${Y(-18)} Q ${X(0)} ${Y(0)} ${X(-14)} ${Y(0)} Q ${X(-26)} ${Y(0)} ${X(-26)} ${Y(-14)}`, { w: 6 }),
  ];
}

/* =========================================================== 0 · TOPIC 1 COVER */
const cover = coverBoard(
  'law-cover',
  1,
  'Ignorance of the Law',
  '“Ignorantia juris non excusat” — not knowing the law is no excuse',
  'Topic 1: an old rule of law — “ignorance of the law is no excuse”. We explain it in simple words.',
  [
    ['What the rule means, word by word', 'First, we learn what the rule means — word by word.'],
    ['The helmet story — and a real Kerala case', 'Then a simple story, and a real road case from Kerala, show how the rule works in real life.'],
    ['Why the rule exists — and when it bends', 'Next: why the rule exists, and the few times it bends.'],
    ['History, today’s laws and a quick quiz', 'Finally: its history, today’s laws, and a quick quiz to check what we learned.'],
  ],
);

/* =========================================================== 1 · THE RULE, WORD BY WORD */
const WORDS: [string, string, string, string, string][] = [
  ['Ignorantia', 'ignorance', '= not knowing', 'Word 1: “Ignorantia” means ignorance — simply, not knowing something.', 'Ignorance means not knowing. Here: not knowing a law.'],
  ['juris', 'of the law', '(also written “iuris”)', 'Word 2: “juris” means “of the law”.', '“Juris” means “of the law”. You will also see it written “iuris”. Both are the same word.'],
  ['non', 'not', '', 'Word 3: “non” means “not”.', '“Non” simply means “not”.'],
  ['excusat', 'excuses', '= lets you off', 'Word 4: “excusat” means “excuses” — it lets you off.', 'To excuse someone means to let them off, so they are not blamed.'],
];
const rule = board('law-rule', 'The rule, word by word', SRC, (st) => {
  st(
    'The rule is very old, so it is written in Latin: “Ignorantia juris non excusat”.',
    tip(
      'Ignorantia juris non excusat',
      'A very old rule of law. If you break a law, you cannot escape the blame just because you did not know that law.',
      hl(210, 50, 1180, 104),
      text(800, 128, 'Ignorantia juris non excusat', { size: 82, anchor: 'middle' }),
      text(800, 196, 'say it: ig-no-RAN-tee-a  YOO-ris  non  ex-KOO-sat', { size: 34, color: B, anchor: 'middle' }),
    ),
  );
  WORDS.forEach(([latin, eng, extra, say, tx], i) => {
    const x = 60 + i * 380;
    st(
      say,
      tip(
        latin,
        tx,
        rect(x, 240, 350, 190, { fill: [F.orange, F.green, F.pink, F.blue][i] }),
        text(x + 175, 306, latin, { size: 52, color: B, anchor: 'middle' }),
        text(x + 175, 362, eng, { size: 40, anchor: 'middle' }),
        ...(extra ? [text(x + 175, 410, extra, { size: 28, anchor: 'middle' })] : []),
      ),
    );
  });
  st(
    'Put together: “Ignorance of the law excuses not.” In simple words: not knowing a law is no excuse for breaking it.',
    arrow([[800, 448], [800, 520]], { w: 6 }),
    tip(
      'The full meaning',
      'Word by word: “ignorance of the law excuses not”. In everyday English: “Not knowing the law is no excuse.”',
      rect(200, 530, 1200, 180, { fill: F.yellow }),
      text(800, 605, '“Ignorance of the law excuses not”', { size: 54, anchor: 'middle' }),
      text(800, 672, '= Not knowing a law is NO excuse for breaking it', { size: 38, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'So you must follow the law — even a law you did not know about.',
    hl(200, 760, 1200, 84, F.green),
    text(800, 816, 'Follow the law — even if you did not know it', { size: 46, anchor: 'middle' }),
  );
});

/* =========================================================== 2 · A STORY ON THE ROAD */
const story = board('law-story', 'A story on the road', SRC, (st) => {
  st(
    'Let’s see the rule in a simple story on the road. This story is our own example.',
    title('A story on the road', SRC),
    text(700, 88, '(our own example)', { size: 32, color: B }),
  );
  st(
    'Step 1: The government makes a rule and publishes it: “Riders must wear a helmet.”',
    tip(
      'The rule is published',
      'Our example rule: “Riders must wear a helmet.” It is published, so anyone can find it and read it.',
      gazette(60, 150, 320, 250, 'NEW RULE'),
      text(220, 455, 'Rule: riders must', { size: 36, anchor: 'middle' }),
      text(220, 500, 'wear a helmet', { size: 36, anchor: 'middle' }),
      text(220, 552, 'published ✓', { size: 34, color: G, anchor: 'middle' }),
    ),
  );
  st(
    'Step 2: A rider goes out on a scooter — without a helmet.',
    line(420, 772, 1560, 772, { w: 4, color: '#9aa4b1' }),
    tip(
      'Riding with no helmet',
      'The rider uses the scooter but does not wear a helmet. This breaks the rule.',
      scooter(590, 760, 1.1),
      person(780, 760, 0.95, F.green),
      helmet(930, 720, 1),
      cross(930, 690, 40),
      text(930, 625, 'no helmet', { size: 32, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'Step 3: A police officer stops the rider: “Where is your helmet? A rule is broken!”',
    tip(
      'The police officer',
      'The officer checks that people follow the traffic rules. No helmet means the rule is broken.',
      person(1330, 760, 0.95, F.blue),
      rect(1296, 520, 68, 18, { fill: '#1b2a4a', w: 3 }),
      bubble(1080, 290, 460, 130, 1320, 505),
      text(1310, 345, 'Where is your helmet?', { size: 34, anchor: 'middle' }),
      text(1310, 397, 'Rule broken!', { size: 36, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'Step 4: The rider says: “I didn’t know that rule!” This is called ignorance of the law.',
    tip(
      '“I didn’t know!”',
      'This is ignorance of the law: the rider did not know the rule existed.',
      bubble(470, 300, 540, 100, 780, 505),
      text(740, 362, 'I didn’t know that rule!', { size: 36, anchor: 'middle' }),
    ),
  );
  st(
    'Step 5: The answer is simple: “I didn’t know” is NOT an excuse.',
    tip(
      'Not an excuse',
      'The rule was published, so the rider should have found out about it. Not knowing does not help.',
      rect(470, 790, 420, 84, { color: R, w: 6, fill: F.white }),
      text(680, 847, 'NOT AN EXCUSE', { size: 44, color: R, anchor: 'middle', rotate: -3 }),
    ),
  );
  st(
    'Step 6: The rider is still responsible: pay the fine, and wear a helmet from now on.',
    tip(
      'Still responsible',
      'The rider must face the result (for example a fine) and follow the rule from now on.',
      hl(960, 790, 590, 80, F.pink),
      text(1255, 845, 'Still responsible → pay the fine', { size: 36, anchor: 'middle' }),
    ),
  );
});

/* =========================================================== 2b · A REAL CASE FROM KERALA (news, Oct 2026) */
// Facts from news reports (The News Minute, 13 Oct 2026; PTI via The Hans India, 11 Oct 2026).
// No names are shown. The 218 km/h figure is only a claim the police were still checking.
/** small car, bottom centre (cx, by), facing right */
function car(cx: number, by: number, s = 1, fill = '#ff8f8f', dir = 1): Item[] {
  const P = (x: number, y: number): [number, number] => [cx + x * s * dir, by + y * s];
  return [
    ...poly([P(-130, -30), P(-130, -72), P(-82, -78), P(-52, -122), P(58, -122), P(96, -78), P(130, -68), P(130, -30)], { fill }),
    ...poly([P(-42, -112), P(-4, -112), P(-4, -82), P(-64, -82)], { fill: F.sky, w: 4 }),
    ...poly([P(8, -112), P(50, -112), P(76, -82), P(8, -82)], { fill: F.sky, w: 4 }),
    ...ellipse(cx - 76 * s, by - 26 * s, 54 * s, 54 * s, { fill: F.grey }),
    ...ellipse(cx + 76 * s, by - 26 * s, 54 * s, 54 * s, { fill: F.grey }),
  ];
}
const CASE: [string, string, string, string, string, string, string][] = [
  ['SPEED', 'Police say:', 'over-speeding', 'is confirmed', F.orange, 'The police said over-speeding is confirmed. Even India’s highest speed limit for cars is 120 km/h, on expressways.', 'What did the police find? First: over-speeding is confirmed.'],
  ['ALCOHOL?', 'Driver suspected', 'to be drunk —', 'blood test awaited', F.yellow, 'Police suspected the driver had been drinking. This was still waiting for blood test results.', 'Second: the driver was suspected to be drunk. The blood test result was still awaited.'],
  ['POLICE CASE', 'BNS Section 105', '= causing death, knowing', 'the act could kill', F.purple, 'Section 105 of the Bharatiya Nyaya Sanhita: culpable homicide not amounting to murder — no plan to kill, but doing something you know can kill.', 'Third: the driver was booked under BNS Section 105 — causing death while knowing the act could kill.'],
];
const kerala = board('law-kerala', 'Real case: Kerala road', 'Kerala news', (st) => {
  st(
    'Our helmet story was made up. Now a REAL case from Kerala, from the news in October 2026.',
    title('A real case from Kerala', 'Kerala news'),
    text(830, 88, '(real news, Oct 2026)', { size: 32, color: B }),
  );
  st(
    'It happened on 11 October 2026, at about 2 am, near Nedumbassery — on the road to Kochi airport.',
    tip(
      'When and where',
      'Sunday, 11 October 2026, around 2 am. Near Moozhiyal, close to the road to Kochi (CIAL) airport, Nedumbassery, Ernakulam district.',
      rect(60, 150, 580, 406, { fill: F.sky }),
      text(350, 210, 'WHEN & WHERE', { size: 36, color: B, anchor: 'middle' }),
      text(350, 285, '11 October 2026', { size: 40, anchor: 'middle' }),
      text(350, 340, 'about 2 am, at night', { size: 34, anchor: 'middle' }),
      text(350, 405, 'near Nedumbassery,', { size: 34, anchor: 'middle' }),
      text(350, 455, 'Kochi airport road', { size: 34, anchor: 'middle' }),
      text(350, 510, '(Ernakulam, Kerala)', { size: 30, color: B, anchor: 'middle' }),
    ),
  );
  st(
    'A car came at very high speed. Some reports said 218 km/h — the police were still checking that number.',
    line(680, 445, 1540, 445, { w: 4, color: '#9aa4b1' }),
    tip(
      'A car at very high speed',
      'CCTV showed the car coming very fast. A speed of 218 km/h was reported, but the police were still checking it.',
      line(700, 342, 752, 342, { w: 5, color: R }),
      line(690, 372, 752, 372, { w: 5, color: R }),
      line(705, 402, 752, 402, { w: 5, color: R }),
      car(910, 445, 1),
      text(910, 230, 'very high speed', { size: 40, color: R, anchor: 'middle' }),
      text(910, 276, 'reported: 218 km/h (police checking)', { size: 28, color: B, anchor: 'middle' }),
    ),
  );
  st(
    'Ahead of it, three young people were riding one scooter. They worked as salespersons in Kochi.',
    tip(
      'Three young people',
      'Three young salespersons who worked in Kochi were riding one scooter on the left side of the road.',
      arrow([[1065, 345], [1215, 345]], { color: R, w: 6 }),
      scooter(1380, 445, 1),
      text(1370, 232, '3 young people', { size: 34, anchor: 'middle' }),
      text(1370, 274, 'on one scooter', { size: 30, color: B, anchor: 'middle' }),
    ),
  );
  st(
    'The car hit the scooter from behind. All three young people died.',
    tip(
      'Three lives lost',
      'The car hit the scooter and dragged it a long way. Two young women and one young man died.',
      rect(680, 478, 860, 78, { color: R, w: 6, fill: F.white }),
      text(1110, 532, 'The car hit the scooter — all 3 died', { size: 38, color: R, anchor: 'middle' }),
    ),
  );
  CASE.forEach(([head, l1, l2, l3, fill, tx, say], i) => {
    const x = 60 + i * 505;
    st(
      say,
      tip(
        head,
        tx,
        rect(x, 595, 470, 235, { fill }),
        text(x + 235, 648, head, { size: 36, anchor: 'middle' }),
        text(x + 235, 702, l1, { size: 30, anchor: 'middle' }),
        text(x + 235, 748, l2, { size: 30, anchor: 'middle' }),
        text(x + 235, 794, l3, { size: 30, anchor: 'middle' }),
      ),
    );
  });
  st(
    'Important: this case is still in court. Only the court can decide who is guilty.',
    text(800, 878, 'Source: The News Minute & PTI, Oct 2026 · Still in court — only the court decides guilt.', { size: 28, color: B, anchor: 'middle' }),
  );
});

const EXCUSE: [string, string, string, string, string][] = [
  ['A driver says:', '“I didn’t know the speed limit.”', 'Speed limits are published', 'and shown on road signs.', 'Could a driver say “I didn’t know the speed limit”? No. Speed limits are published and shown on road signs.'],
  ['A driver says:', '“I didn’t know drink-driving is a crime.”', 'Motor Vehicles Act, Section 185:', 'every driver must know it.', 'Could a driver say “I didn’t know drink-driving is a crime”? No. It is in the Motor Vehicles Act, Section 185.'],
  ['A bar says:', '“We didn’t know the age rule.”', 'Kerala: no alcohol under 23.', '3 bars were booked (Abkari Act).', 'Could a bar say “we didn’t know the age rule”? No. In Kerala alcohol cannot be sold to anyone under 23 — three bars were booked.'],
];
const kerala2 = board('law-kerala2', 'Real case: the lesson', 'Kerala news', (st) => {
  st(
    'What if someone said “I didn’t know”? These are “what if” excuses — not what anyone in the case said.',
    title('Could anyone say “I didn’t know”?', 'Kerala news', 70, 92, 1030),
  );
  EXCUSE.forEach(([who, quote, a1, a2, say], i) => {
    const y = 150 + i * 185;
    st(
      say,
      rect(60, y, 800, 160, { fill: F.white }),
      text(90, y + 50, who, { size: 30, color: B }),
      text(90, y + 114, quote, { size: 36 }),
      arrow([[870, y + 80], [910, y + 80]], { w: 5 }),
      tip(
        'Not an excuse',
        a1 + ' ' + a2.charAt(0).toUpperCase() + a2.slice(1),
        rect(920, y, 620, 160, { fill: F.paper }),
        cross(962, y + 44, 16, R, 6),
        text(992, y + 56, 'NOT an excuse', { size: 36, color: R }),
        text(950, y + 102, a1, { size: 30 }),
        text(950, y + 142, a2, { size: 30 }),
      ),
    );
  });
  st(
    'So: when you get a driving licence, you promise to know the road rules. “I didn’t know” can never help.',
    tip(
      'A licence is a promise',
      'To get a driving licence you pass a test on the road rules. After that, the law treats you as knowing them.',
      hl(160, 712, 1280, 76, F.yellow),
      text(800, 768, 'A driving licence = a promise to know the road rules', { size: 40, anchor: 'middle' }),
    ),
  );
  st(
    'And remember: this real case is still in court. The court will decide.',
    text(800, 858, 'Remember: the case is still in court — the court will decide.', { size: 30, color: B, anchor: 'middle' }),
  );
});

/* =========================================================== 2c · WHY WE OBEY THE RULES */
const REASONS: [string, string, string, string, string][] = [
  ['Safety', 'rules keep', 'everyone alive', F.green, 'Reason 1, safety: rules like speed limits keep everyone alive.'],
  ['Fairness', 'the same rule', 'for everyone', F.blue, 'Reason 2, fairness: the same rule is for everyone — rich or poor, young or old.'],
  ['Trust', 'we know what', 'others will do', F.orange, 'Reason 3, trust: at a red light everyone stops, so we know what others will do.'],
  ['Order', 'life runs smoothly,', 'no fights', F.pink, 'Reason 4, order: when everyone follows the rules, life runs smoothly and there are no fights.'],
];
/** spiky crash star centred at (cx, cy) */
function crash(cx: number, cy: number, r = 44): Item[] {
  const pts: [number, number][] = [];
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    const rr = k % 2 ? r * 0.45 : r;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return poly(pts, { fill: '#ffd43b', color: R, w: 5 });
}
const obey = board('law-obey', 'Why we obey the rules', SRC, (st) => {
  st('Why do we obey the rules? Rules are not there to trouble us — they protect us.', title('Why do we obey the rules?', SRC));
  REASONS.forEach(([head, l1, l2, fill, say], i) => {
    const x = 60 + i * 375;
    st(
      say,
      tip(
        head,
        say.replace(/^Reason \d, \w+: /, '').replace(/^./, (c) => c.toUpperCase()),
        rect(x, 150, 350, 190, { fill }),
        text(x + 175, 208, head, { size: 42, anchor: 'middle' }),
        text(x + 175, 260, l1, { size: 30, anchor: 'middle' }),
        text(x + 175, 304, l2, { size: 30, anchor: 'middle' }),
      ),
    );
  });
  st(
    'If everyone obeys: red means stop, green means go. Everyone gets home safe.',
    panel(60, 370, 720, 430),
    text(90, 425, 'If we OBEY the rules', { size: 40, color: G }),
    tip(
      'Everyone obeys',
      'Cars stay in their lane, stop at red and go at green. Everyone reaches home safely.',
      rect(130, 450, 70, 170, { fill: '#343a40' }),
      ellipse(165, 486, 44, 44, { fill: '#ff6b6b', w: 3 }),
      ellipse(165, 535, 44, 44, { fill: '#ffd43b', w: 3 }),
      ellipse(165, 584, 44, 44, { fill: '#51cf66', w: 3 }),
      line(165, 620, 165, 640, { w: 6 }),
      line(110, 640, 760, 640, { w: 4, color: '#9aa4b1' }),
      car(380, 640, 0.7, F.blue),
      car(620, 640, 0.7, F.green),
      text(420, 712, 'stop at red, go at green', { size: 32, anchor: 'middle' }),
      tick(250, 748, 0.9),
      text(300, 762, 'everyone gets home safe', { size: 32, color: G }),
    ),
  );
  st(
    'If nobody obeys? Tomorrow our roads become a real-life GTA 6 — crashes everywhere, and nobody is safe.',
    panel(820, 370, 720, 430),
    text(850, 425, 'If we DON’T obey', { size: 40, color: R }),
    tip(
      'Nobody obeys',
      'Everyone drives the way they like — too fast, wrong side, no signals. The road becomes like a video game, but real people get hurt.',
      line(860, 640, 1500, 640, { w: 4, color: '#9aa4b1' }),
      car(1030, 640, 0.7),
      car(1330, 640, 0.7, F.yellow, -1),
      crash(1180, 580),
      text(1180, 712, 'Roads become real-life GTA 6!', { size: 36, color: R, anchor: 'middle' }),
      text(1180, 762, 'crashes · fights · nobody is safe', { size: 30, anchor: 'middle' }),
    ),
  );
  st(
    'But a game has a restart button. Real life does not. That is why we obey the rules.',
    tip(
      'No restart in real life',
      'In a game you can press restart. On a real road, one mistake can end a life — like the Kerala case. So we follow the rules.',
      hl(180, 822, 1240, 68, F.yellow),
      text(800, 872, 'A game has a RESTART button. Real life does not.', { size: 42, anchor: 'middle' }),
    ),
  );
});

/* =========================================================== 3 · WHAT IT MEANS — AND WHAT IT DOES NOT */
const MEANS: [string, string, string][] = [
  ['Follow every published law', 'big or small, old or new', 'It means: you must follow every published law — big or small, old or new.'],
  ['“I didn’t know” won’t free you', 'you are still responsible', 'Saying “I didn’t know” will not free you. You are still responsible.'],
  ['Finding the rules is YOUR job', 'ask, read, check before you act', 'Finding out the rules is your own job. Ask, read and check before you act.'],
  ['The same rule for everyone', 'nobody gets off with “I didn’t know”', 'The same rule is for everyone. Nobody gets off just by saying “I didn’t know”.'],
];
const NOTMEAN: [string, string, string][] = [
  ['Everyone knows every law', 'nobody can know them all', 'It does NOT mean that everyone really knows every law. Nobody can know them all.'],
  ['A secret law still counts', 'a law must be published first', 'It does not mean a secret law counts. A law must be published first.'],
  ['Mistakes of FACT never count', 'sometimes they can (board 11)', 'It does not mean honest mistakes about FACTS never count. Sometimes they can.'],
  ['Punishment is always the same', 'it can be lower (board 12)', 'And the punishment is not always the same. In some cases it can be lower.'],
];
const means = board('law-means', 'Means / does not mean', SRC, (st) => {
  st('What does this rule really mean — and what does it NOT mean?', title('What it means — and does not', SRC, 70, 92, 900));
  MEANS.forEach(([a, b, say], i) => {
    const y = 300 + i * 135;
    st(
      say,
      ...(i === 0 ? [panel(60, 140, 720, 720), text(90, 210, 'It MEANS…', { size: 50, color: G })] : []),
      tip(a, b.charAt(0).toUpperCase() + b.slice(1) + '.', tick(92, y - 12, 1), text(160, y, a, { size: 38 }), text(160, y + 44, b, { size: 30, color: B })),
    );
  });
  NOTMEAN.forEach(([a, b, say], i) => {
    const y = 300 + i * 135;
    st(
      say,
      ...(i === 0 ? [panel(820, 140, 720, 720), text(850, 210, 'It does NOT mean…', { size: 50, color: R })] : []),
      tip(a, b.charAt(0).toUpperCase() + b.slice(1) + '.', cross(880, y - 12, 18, R, 7), text(920, y, a, { size: 38 }), text(920, y + 44, b, { size: 30, color: B })),
    );
  });
});

/* =========================================================== 4 · OTHER WORDS */
const words = board('law-words', 'Same idea, other words', SRC, (st) => {
  st('The same idea is also said in other Latin words. Here are three of them.', title('Same idea, other words', SRC));
  const row = (y: number, latin: string, english: string, tag: string, tipTitle: string, tipText: string) =>
    tip(
      tipTitle,
      tipText,
      rect(100, y, 1400, 165, { fill: F.sky }),
      text(140, y + 66, latin, { size: 50, color: B }),
      text(140, y + 128, english, { size: 38 }),
      text(1470, y + 66, tag, { size: 32, color: R, anchor: 'end' }),
    );
  st(
    '“Ignorantia legis neminem excusat” — not knowing the law excuses nobody.',
    row(150, 'ignorantia legis neminem excusat', '“not knowing the law excuses nobody”', 'same rule', 'Ignorantia legis neminem excusat', 'Another way to say the same rule: not knowing the law excuses nobody.'),
  );
  st(
    '“Nemo censetur ignorare legem” — nobody is thought to be ignorant of the law. The idea goes back to the Greek thinker Aristotle.',
    row(345, 'nemo censetur ignorare legem', '“nobody is thought not to know the law”', 'from Aristotle', 'Nemo censetur ignorare legem', 'An idea from the Greek thinker Aristotle, put into Latin. It is used in countries whose laws come from old Roman law.'),
  );
  st(
    '“Ignorantia iuris nocet” — not knowing the law hurts you.',
    row(540, 'ignorantia iuris nocet', '“not knowing the law hurts you”', 'Roman-law countries', 'Ignorantia iuris nocet', 'Also used in countries whose laws come from old Roman law: not knowing the law can harm you.'),
  );
  st(
    'Different words — but all of them say the same thing: not knowing the law does not help you.',
    hl(170, 750, 1260, 80, F.yellow),
    text(800, 806, 'All say: not knowing the law does not help', { size: 46, anchor: 'middle' }),
  );
});

/* =========================================================== 5 · WHY THE RULE EXISTS */
const why = board('law-why', 'Why the rule exists', SRC, (st) => {
  st('Why does such a strict rule exist? There are simple reasons.', title('Why does this rule exist?', SRC));
  st(
    'Reason 1: if “I didn’t know” were an excuse, everyone would say it — even people who did know.',
    tip(
      'Everyone would say it',
      'The English lawyer John Selden said it well: the rule is not there because everyone knows the law, but because “I didn’t know” is an excuse every person would use.',
      person(200, 600, 0.75, F.green),
      person(380, 600, 0.75, F.orange),
      person(560, 600, 0.75, F.pink),
      bubble(90, 160, 600, 130, 380, 400),
      text(390, 240, '“I didn’t know!” × 3', { size: 46, anchor: 'middle' }),
      text(390, 680, 'If that worked,', { size: 40, anchor: 'middle' }),
      text(390, 730, 'EVERYONE would say it!', { size: 40, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'Reason 2: so the law treats every person in the country as if they know every law.',
    tip(
      'Everyone is treated as knowing',
      'The law treats every person in the country as knowing all the laws. Then nobody can hide behind “I didn’t know”.',
      book(880, 170, 300, 210, 'THE LAW'),
      text(1210, 250, 'treats everyone', { size: 40 }),
      text(1210, 305, 'as knowing it', { size: 40, color: B }),
    ),
  );
  st(
    'Reason 3: closing your eyes on purpose does not help. You cannot avoid a rule just to say “I didn’t know”.',
    tip(
      'Closing your eyes on purpose',
      'If you avoid learning a rule on purpose, so that you can say “I didn’t know”, it does not help you. Lawyers call this “wilful blindness”.',
      person(980, 700, 0.8, F.blue),
      rect(950, 520, 60, 15, { fill: K, w: 3 }),
      text(1210, 500, 'Closing your eyes', { size: 40 }),
      text(1210, 555, 'on purpose', { size: 40 }),
      text(1210, 615, 'does NOT help', { size: 40, color: R }),
    ),
  );
  st(
    'Doing something new — like driving in another country? Learn the rules for it first.',
    tip(
      'Something new? Learn first',
      'If you start an activity that is not part of normal daily life, you must learn its rules first. Otherwise you cannot complain about what happens.',
      hl(70, 790, 1460, 70, F.yellow),
      text(800, 840, 'Doing something new? Learn its rules first!', { size: 46, anchor: 'middle' }),
    ),
  );
});

/* =========================================================== 6 · THE LAW MUST BE PUBLISHED */
const publish = board('law-publish', 'The law must be published', SRC, (st) => {
  st('But there is one fair condition: the law must be made public first. Lawyers call this “promulgation”.', title('First, the law must be published', SRC));
  st(
    'A law is published in an official gazette, online, or in printed books — so people can find it.',
    tip('Official gazette', 'A government newspaper where new laws are printed.', gazette(80, 150, 320, 240, 'GAZETTE'), text(240, 450, 'official gazette', { size: 36, anchor: 'middle' })),
    tip(
      'Online',
      'Many laws can also be read on official websites.',
      rect(580, 160, 320, 200, { fill: F.sky }),
      rect(710, 360, 60, 36, { fill: F.grey, w: 4 }),
      line(640, 398, 840, 398, { w: 6 }),
      text(740, 275, 'www', { size: 48, color: B, anchor: 'middle' }),
      text(740, 450, 'online', { size: 36, anchor: 'middle' }),
    ),
    tip('Printed books', 'Laws are also collected in printed law books.', book(1080, 160, 320, 220, 'LAW BOOK'), text(1240, 450, 'printed books', { size: 36, anchor: 'middle' })),
  );
  st(
    'Many countries wait a set number of days before a new law starts — often 15 days — so people can find out about it.',
    tip(
      'Waiting time',
      'In many legal systems a new law only starts a fixed number of days after it is published — often 15 days.',
      arrow([[100, 610], [1500, 610]], { w: 6 }),
      ellipse(220, 610, 34, 34, { fill: F.orange, w: 4 }),
      ellipse(1380, 610, 34, 34, { fill: F.green, w: 4 }),
      text(220, 570, 'Day 0', { size: 38, color: O, anchor: 'middle' }),
      text(220, 670, 'law published', { size: 32, anchor: 'middle' }),
      text(800, 580, 'wait — often 15 days', { size: 38, color: B, anchor: 'middle' }),
      text(1380, 570, 'Day 15', { size: 38, color: G, anchor: 'middle' }),
      text(1380, 670, 'law starts', { size: 32, anchor: 'middle' }),
    ),
  );
  st(
    'An old saying from Gratian, a church lawyer: laws begin when they are published. A secret law is no law at all.',
    tip(
      'Gratian’s saying',
      '“Leges instituuntur cum promulgantur” — laws begin when they are published. If a law is kept secret, nobody can be blamed for not knowing it.',
      hl(120, 730, 1360, 130, F.yellow),
      text(800, 785, '“Leges instituuntur cum promulgantur”', { size: 42, color: B, anchor: 'middle' }),
      text(800, 838, '= laws begin when they are published · a secret law is no law', { size: 32, anchor: 'middle' }),
    ),
  );
});

/* =========================================================== 7 · MISTAKE OF LAW vs MISTAKE OF FACT */
const mistake = board('law-mistake', 'Mistake of law vs fact', SRC, (st) => {
  st('There are two kinds of mistakes, and the law treats them very differently.', title('Mistake of LAW vs mistake of FACT', SRC));
  st(
    'Mistake of LAW: you know what you did, but you are wrong about the rule. Example: “A helmet is not needed on short trips.” NOT an excuse.',
    tip(
      'Mistake of law',
      'You are wrong about what the law says. Like not knowing the law, this is not an excuse.',
      panel(60, 140, 720, 560),
      text(90, 200, 'Mistake of LAW', { size: 48, color: R }),
      text(90, 250, 'wrong about the RULE', { size: 32, color: B }),
      helmet(195, 440, 1.5),
      text(300, 340, 'Thinking:', { size: 34 }),
      text(300, 390, '“A helmet is not needed', { size: 34, color: B }),
      text(300, 435, 'on short trips.”', { size: 34, color: B }),
      rect(110, 540, 620, 120, { fill: '#ffe3e3', color: R }),
      text(420, 618, 'NOT an excuse ✗', { size: 48, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'Mistake of FACT: you honestly believe something wrong about what happened. Two umbrellas look the same and you take the wrong one. That CAN be an excuse.',
    tip(
      'Mistake of fact',
      'You honestly believe something wrong about the facts. If your belief were true, you would have done nothing wrong. Depending on the case, this can be an excuse.',
      panel(820, 140, 720, 560),
      text(850, 200, 'Mistake of FACT', { size: 48, color: G }),
      text(850, 250, 'wrong about what HAPPENED', { size: 32, color: B }),
      umbrella(925, 480, 0.75),
      umbrella(1045, 480, 0.75),
      text(1130, 340, 'Thinking:', { size: 34 }),
      text(1130, 390, '“This one is MINE”', { size: 34, color: B }),
      text(1130, 435, '(they look the same)', { size: 30 }),
      rect(870, 540, 620, 120, { fill: '#e3fbe8', color: G }),
      text(1180, 618, 'CAN be an excuse ✓', { size: 48, color: G, anchor: 'middle' }),
    ),
  );
  st(
    'Remember: not knowing the LAW never excuses you. An honest mistake about the FACTS sometimes can.',
    hl(130, 745, 1340, 74, F.yellow),
    text(800, 797, 'Law: no excuse · Facts: maybe an excuse', { size: 50, anchor: 'middle' }),
  );
});

/* =========================================================== 8 · WHEN IGNORANCE STILL MATTERS */
const limits = board('law-limits', 'When it still matters', SRC, (st) => {
  st('Still, not knowing the law can matter in a few special situations.', title('When “I didn’t know” still matters', SRC));
  st(
    'It can make the punishment smaller. In Canada, officials told a man an import was legal. He was found guilty, but not punished.',
    tip(
      'Smaller punishment',
      'Not knowing does not remove the guilt, but it can make the punishment smaller — mainly if the law was unclear or the person asked the officials first. Canada: R v Potter (1978).',
      panel(50, 140, 480, 730),
      text(70, 195, '1. Smaller punishment', { size: 38, color: R }),
      person(150, 520, 0.7, F.orange),
      bubble(190, 240, 320, 100, 170, 360),
      text(350, 302, '“It’s legal!”', { size: 38, anchor: 'middle' }),
      text(290, 600, 'officials said OK →', { size: 32, anchor: 'middle' }),
      text(290, 650, 'still guilty, but', { size: 34, anchor: 'middle' }),
      text(290, 700, 'no punishment', { size: 40, color: G, anchor: 'middle' }),
      text(290, 790, 'Canada · 1978', { size: 30, color: B, anchor: 'middle' }),
    ),
  );
  st(
    'The law changed while people were far away. Hunters in the forest were set free. A sailor at sea was forgiven.',
    tip(
      'Far away when the law changed',
      'Canada: four hunters were set free because the law changed while they were deep in the forest (Rex v. Ross, 1944). England: a sailor at sea, before radio, was found guilty but forgiven (pardoned) because the law changed while he was away (Rex v. Bailey, 1800).',
      panel(560, 140, 480, 730),
      text(580, 195, '2. Law changed away', { size: 38, color: R }),
      ...[0, 1, 2].map((i) => [
        ...rect(612 + i * 70, 300, 16, 70, { fill: F.brown, w: 3 }),
        ...ellipse(620 + i * 70, 290, 64, 90, { fill: F.green }),
      ]),
      text(830, 330, 'hunters', { size: 34 }),
      text(830, 375, '→ set free', { size: 34, color: G }),
      poly([[598, 490], [802, 490], [770, 540], [630, 540]], { fill: F.brown }),
      line(700, 490, 700, 400, { w: 5 }),
      poly([[704, 404], [704, 482], [770, 482]], { fill: F.white }),
      path('M 590 560 q 25 -14 50 0 t 50 0 t 50 0 t 50 0 t 50 0', { color: B, w: 4 }),
      text(830, 500, 'sailor', { size: 34 }),
      text(830, 545, '→ forgiven', { size: 34, color: G }),
      text(800, 650, 'No phones, no radio:', { size: 32, anchor: 'middle' }),
      text(800, 695, 'they could not know', { size: 32, anchor: 'middle' }),
      text(800, 790, '1944 · 1800', { size: 30, color: B, anchor: 'middle' }),
    ),
  );
  st(
    'Newer thinking: how hard a law is to learn, and what a person really knew, can be taken into account.',
    tip(
      'Newer thinking',
      'Some courts now ask: was this law very hard for a normal person to find out? In crime cases, what the person really knew can change how guilty they are (lawyers call this “mens rea” — a guilty mind).',
      panel(1070, 140, 480, 730),
      text(1090, 195, '3. Newer thinking', { size: 38, color: R }),
      text(1110, 290, 'Hard to learn', { size: 38 }),
      text(1110, 340, 'for normal people?', { size: 38 }),
      text(1110, 390, '→ may count', { size: 38, color: G }),
      line(1110, 440, 1510, 440, { w: 3, color: '#9aa4b1' }),
      text(1110, 510, 'What did they', { size: 38 }),
      text(1110, 560, 'really know?', { size: 38 }),
      text(1110, 610, '→ affects guilt', { size: 38, color: G }),
      text(1310, 700, '(“guilty mind”)', { size: 32, color: B, anchor: 'middle' }),
    ),
  );
});

/* =========================================================== 9 · HISTORY */
const EV: [string, string, string, string, string][] = [
  ['Bible', 'Leviticus 5:17', 'The Bible (Leviticus 5:17)', 'A person who breaks a rule “though he knew it not” is still guilty. Breaking a rule by accident still counts.', 'The idea is very old. It is already in the Bible: breaking a rule without knowing still counts.'],
  ['Greece & Rome', 'customs', 'Old Greece and Rome', 'People learned the law by living in the town. Roman law came from customs any sensible person would know. Some groups could still say “I didn’t know” for unusual rules: women, young men, soldiers and farmers.', 'In old Greece and Rome, law came from customs that everyone grew up with.'],
  ['Cicero', 'about 50 BC', 'Cicero', 'The Roman writer Cicero said “true law” is good sense that matches nature — the same everywhere and forever.', 'The Roman writer Cicero said true law is the same everywhere and never changes.'],
  ['1362', 'laws in English', 'England, 1362', 'A law said court cases should be in English, so every person could understand the law and avoid breaking it.', 'In 1362, England decided the law should be in English, so normal people could understand it.'],
  ['Coke 1628', '& Selden', 'Edward Coke and John Selden', 'Coke wrote: “Ignorance of the law excuseth not.” Selden explained: not because everyone knows the law, but because everyone would use the excuse.', 'Two English lawyers, Coke and Selden, wrote the rule down clearly.'],
  ['Blackstone', '1700s', 'William Blackstone', 'This famous English lawyer said the rule is part of English law, just as it was part of Roman law.', 'Blackstone, a famous English lawyer, said it is a firm rule of English law.'],
  ['Enlightenment', '1700s debate', 'The Enlightenment', 'People argued about the rule: many Europeans could not read, and there were so many laws that only lawyers could know them.', 'In the 1700s, people asked: is this fair when many people cannot read?'],
];
const EX = (i: number) => 150 + i * 216;
const history = board('law-history', 'Where the rule comes from', SRC, (st) => {
  st('Where does this rule come from? Let’s draw a timeline, from old to new.', title('Where does the rule come from?', SRC), arrow([[70, 470], [1540, 470]], { w: 7 }));
  EV.forEach(([head, sub, tt, tx, say], i) => {
    const up = i % 2 === 0;
    st(
      say,
      tip(
        tt,
        tx,
        ellipse(EX(i), 470, 34, 34, { fill: up ? F.orange : F.blue, w: 4 }),
        line(EX(i), up ? 452 : 488, EX(i), up ? 400 : 540, { w: 4 }),
        text(EX(i), up ? 330 : 600, head, { size: 38, color: up ? O : B, anchor: 'middle' }),
        text(EX(i), up ? 375 : 645, sub, { size: 30, anchor: 'middle' }),
      ),
    );
  });
  st('So the idea is thousands of years old — and it is still used today.', hl(380, 770, 840, 70, F.yellow), text(800, 820, 'Thousands of years old — still used today', { size: 46, anchor: 'middle' }));
});

/* =========================================================== 10 · TODAY'S LAWS */
const CO: [string, string, string, string][] = [
  ['Brazil', 'Law-Decree 4.657 art. 3', 'Penal Code art. 21', 'Written in Article 3 of Law-Decree 4.657 (the law about how Brazilian laws work) and Article 21 of the Penal Code.'],
  ['Canada', 'Criminal Code', 'section 19', 'Written in section 19 of the Criminal Code of Canada.'],
  ['Chile', 'Civil Code', 'articles 7 and 8', 'Written in articles 7 and 8 of the Civil Code of Chile.'],
  ['Philippines', 'Civil Code', 'article 3', 'Written in article 3 of the Civil Code of the Philippines.'],
];
const US: [string, string, string, string, string][] = [
  ['Cheek v. United States', 'Tax law is very hard: an honest', 'misunderstanding can excuse you', 'In tax crimes, the person must break a duty they knew about. An honest misunderstanding caused by hard tax law can excuse them.', 'Cheek v. United States: tax law is very hard, so an honest misunderstanding of it can excuse you.'],
  ['Lambert v. California · 1957', 'No real chance to know the law', '→ cannot be found guilty', 'If a person had no real chance to know about a law, and the act is wrong only because a law says so, they cannot be found guilty.', 'Lambert v. California, 1957: if you had no real chance to know a law, you cannot be found guilty.'],
  ['United States v. Freed · 1971', 'Not for things everyone expects', 'to be controlled: drugs, guns', 'The Lambert exception does not help with things any sensible person expects to be controlled, like drugs or dangerous weapons.', 'United States v. Freed, 1971: this does not cover drugs or guns — everyone expects rules there.'],
  ['Heien v. North Carolina · 2014', 'A police officer’s reasonable', 'mistake about the law', 'A police officer stopped a car because of an honest, reasonable mistake about the law. The court said the stop was still allowed.', 'Heien, 2014: a police officer’s reasonable mistake about the law did not make a car stop illegal.'],
];
const today = board('law-today', 'In today’s laws', SRC, (st) => {
  st('Many countries write this rule into their laws today.', title('The rule in today’s laws', SRC));
  st(
    'For example, Brazil, Canada, Chile and the Philippines write it into their main law books.',
    ...CO.map(([c, l1, l2, tx], i) =>
      tip(c, tx, rect(60 + i * 375, 150, 350, 200, { fill: [F.green, F.pink, F.orange, F.blue][i] }), text(235 + i * 375, 210, c, { size: 44, anchor: 'middle' }), text(235 + i * 375, 268, l1, { size: 28, anchor: 'middle' }), text(235 + i * 375, 315, l2, { size: 28, anchor: 'middle' })),
    ),
  );
  st('The United States has some exceptions. Here are four famous court cases.', text(60, 420, 'USA — exceptions:', { size: 44, color: R }));
  US.forEach(([c, l1, l2, tx, say], i) => {
    const x = 60 + (i % 2) * 750;
    const y = 450 + Math.floor(i / 2) * 215;
    st(say, tip(c, tx, rect(x, y, 730, 195, { fill: F.white }), text(x + 24, y + 58, c, { size: 36, color: B }), text(x + 24, y + 112, l1, { size: 30 }), text(x + 24, y + 160, l2, { size: 30 })));
  });
});

/* =========================================================== 11 · QUICK CHECK */
const QUIZ: [string, string, string, string, string, string, string, string][] = [
  ['1. A driver goes far over the limit, says:', '“I didn’t know the speed limit.”', 'NO excuse ✗', '#ffe3e3', R, 'Mistake of LAW: speed limits are published and on road signs. Not knowing them never excuses you (see the Kerala case).', 'Case 1, like the Kerala case: a driver goes far over the limit and says “I didn’t know the speed limit.”', 'No! That is a mistake of LAW. Speed limits are published — not knowing them is no excuse.'],
  ['2. Someone takes a look-alike umbrella,', 'honestly sure it is theirs.', 'Can be excused ✓', '#e3fbe8', G, 'Mistake of FACT: an honest, wrong belief about what happened can be an excuse.', 'Case 2: someone takes an umbrella that looks just like theirs, honestly sure it is theirs.', 'This can be excused. It is a mistake of FACT — an honest mix-up of umbrellas.'],
  ['3. A new rule is made, but kept', 'secret and never published.', 'Not a law yet', F.sky, B, 'A law must be published first. A secret law is no law at all.', 'Case 3: a new rule is made, but it is kept secret. Nobody published it.', 'Then it is not a law yet. A law must be published first.'],
  ['4. Officials said something was legal,', 'but the officials were wrong.', 'Smaller punishment', F.yellow, O, 'Like the Canada case (R v Potter, 1978): still guilty, but the punishment can be smaller.', 'Case 4: officials told a person something was legal — but the officials were wrong.', 'Still guilty — but the punishment can be smaller, like the Canada case from 1978.'],
];
const quiz = board('law-quiz', 'Quick check', SRC, (st) => {
  st('Quick check: when does “I didn’t know” help? Let’s test four short cases.', title('Quick check: excuse or not?', SRC));
  QUIZ.forEach(([q1, q2, ans, fill, col, tx, sayQ, sayA], i) => {
    const y = 150 + i * 175;
    st(sayQ, rect(60, y, 1480, 155, { fill: F.white }), text(90, y + 64, q1, { size: 38 }), text(90, y + 116, q2, { size: 34, color: B }));
    st(sayA, tip(ans.replace(/ [✗✓]$/, ''), tx, rect(1080, y + 22, 430, 112, { fill, color: col }), text(1295, y + 92, ans, { size: 36, color: col, anchor: 'middle' })));
  });
});

/* =========================================================== 12 · REMEMBER */
const POINTS: [string, string][] = [
  ['Not knowing the law is no excuse', 'Boards 2–6 · The helmet story, the real Kerala case, why we obey.'],
  ['A law must be published first', 'Board 10 · A secret law is no law at all.'],
  ['Finding out the rules is your job', 'Boards 7 and 9 · Ask, read and check before you act.'],
  ['An honest mistake about FACTS can be an excuse', 'Board 11 · Mistake of law vs mistake of fact.'],
  ['Not knowing can still make punishment smaller', 'Board 12 · Special situations.'],
];
const summary = board('law-summary', 'Remember: 5 points', 'Summary', (st) => {
  st('Let’s remember the five main points of this topic.', title('Remember: 5 points', 'Summary'));
  POINTS.forEach(([p, where], i) => st(p + '.', tip(p, where, tick(100, 225 + i * 115, 1.1), text(180, 240 + i * 115, `${i + 1}. ${p}`, { size: 46 }))));
});

/* =========================================================== 14 · IN DAILY LIFE */
const LIFE: [string, string, string, string, string][] = [
  ['Driving', 'licence, speed,', 'helmet, signals', F.orange, 'Driving? Learn the traffic rules first — licence, speed limits, helmet, signals.'],
  ['Travel abroad', 'that country has', 'its own rules', F.green, 'Going to another country? Its laws can be different from ours. Learn them before you go.'],
  ['New job', 'work rules and', 'safety rules', F.pink, 'Starting a new job? Learn the work rules and the safety rules.'],
  ['Own business', 'licence, tax,', 'bills, records', F.blue, 'Starting your own business? Learn the rules for licences, tax, bills and records.'],
];
const life = board('law-life', 'In daily life', 'Takeaway', (st) => {
  st('So what does this mean in daily life? Before you start something new, learn its rules.', title('What it means in daily life', 'Takeaway'));
  LIFE.forEach(([head, l1, l2, fill, say], i) => {
    const x = 60 + i * 375;
    st(
      say,
      tip(
        head,
        say,
        rect(x, 150, 350, 210, { fill }),
        text(x + 175, 214, head, { size: 44, anchor: 'middle' }),
        text(x + 175, 276, l1, { size: 32, anchor: 'middle' }),
        text(x + 175, 322, l2, { size: 32, anchor: 'middle' }),
      ),
    );
  });
  st(
    'Not sure if something is allowed? Ask an official or an expert before you act.',
    tip(
      'Ask before you act',
      'If a rule is not clear, ask the right office or an expert first. Asking first can also count in your favour if something goes wrong.',
      person(300, 740, 0.85, F.green),
      bubble(380, 360, 440, 100, 320, 522),
      text(600, 423, 'Is this allowed?', { size: 40, anchor: 'middle' }),
      arrow([[440, 650], [1140, 650]], { color: G, w: 7, both: true }),
      text(790, 630, 'ask first', { size: 36, color: G, anchor: 'middle' }),
      person(1280, 740, 0.85, F.purple),
      bubble(860, 360, 560, 100, 1270, 522),
      text(1140, 423, 'Let me check the law.', { size: 40, anchor: 'middle' }),
      text(1280, 784, 'official / expert', { size: 30, color: B, anchor: 'middle' }),
    ),
  );
  st(
    'That is the end of topic 1. Remember: not knowing the law is no excuse — so find out first!',
    hl(330, 812, 940, 70, F.yellow),
    text(800, 862, 'End of Topic 1 — find out the rules first!', { size: 44, anchor: 'middle' }),
  );
});

export const LAW_BOARDS: Board[] = [cover, rule, story, kerala, kerala2, obey, means, words, why, publish, mistake, limits, history, today, quiz, summary, life].map((x) => ({ ...x, topic: 1 }));
