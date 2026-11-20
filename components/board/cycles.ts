// Topic 2: the PURCHASE cycle (the home buys) and the SALES cycle (the grocery sells),
// told as a story: one board per paper — the scene, what is written on the paper, and who writes it.
// One example all the way: one 5 kg bag of rice for ₹350.

import { B, F, G, O, R, arrow, bag, bubble, hl, house, line, person, rect, scooter, shop, text, title, type Board, type Item, type Step } from './kit';

function board(id: string, label: string, page: string, build: (st: (say: string, ...g: Item[][]) => void) => void): Board {
  const steps: Step[] = [];
  build((say, ...g) => steps.push({ say, items: g.flat() }));
  return { id, label, page, steps };
}

/* ---------- small drawings ---------- */
function jar(cx: number, by: number): Item[] {
  return [
    ...rect(cx - 60, by - 170, 120, 170, { fill: F.sky }),
    ...rect(cx - 72, by - 196, 144, 28, { fill: F.brown }),
    ...text(cx, by - 74, 'RICE', { size: 32, anchor: 'middle' }),
  ];
}
function bill(cx: number, by: number): Item[] {
  return [
    ...rect(cx - 80, by - 200, 160, 200, { fill: F.white }),
    ...text(cx, by - 158, 'BILL', { size: 34, color: R, anchor: 'middle' }),
    ...[0, 1].map((k) => line(cx - 54, by - 122 + k * 30, cx + 54, by - 122 + k * 30, { w: 3, color: '#7a8594' })).flat(),
    ...text(cx, by - 26, '₹350', { size: 36, anchor: 'middle' }),
  ];
}
function cash(cx: number, cy: number): Item[] {
  return [
    ...rect(cx - 120, cy - 56, 240, 112, { fill: F.green }),
    ...rect(cx - 98, cy - 36, 196, 72, { fill: '#d3f9d8', w: 3 }),
    ...text(cx, cy + 16, '₹350', { size: 46, anchor: 'middle' }),
  ];
}

/* =========================================================== THE STORIES (one board per paper) */
// Buying story = the home's side (Mom). Selling story = the grocery's side (Ravi).
// Left: the scene. Right: the paper that gets written.

const GROUND = 740;
const mom = (cx: number) => person(cx, GROUND, 0.95, F.pink);
const boy = (cx: number) => person(cx, GROUND, 0.95, F.green);
const ravi = (cx: number) => [...person(cx, GROUND, 0.95, F.blue), ...rect(cx - 130, 650, 260, 92, { fill: F.brown })];
const say = (x: number, y: number, w: number, tx: number, str: string, size = 32): Item[] => [
  ...bubble(x, y, w, 96, tx, 500),
  ...text(x + w / 2, y + 62, str, { size, anchor: 'middle' }),
];

type Story = {
  code: string;
  full: string;
  time: string;
  intro: string;
  sceneSay: string;
  scene: Item[];
  rows: string[];
  paperSay: string;
  lesson: string;
  lessonSay: string;
};

function storyBoards(prefix: string, page: string, side: 'home' | 'shop', list: Story[]): Board[] {
  const fill = side === 'home' ? F.orange : F.blue;
  const ink = side === 'home' ? O : B;
  const who = side === 'home' ? 'Written by: Mom (at home)' : 'Written by: Ravi (at the grocery)';
  return list.map((s, k) =>
    board(`${prefix}-${s.code.toLowerCase()}`, `${page} ${k + 1}: ${s.code}`, page, (st) => {
      st(
        s.intro,
        title(`${k + 1}. ${s.code} — ${s.full}`, page),
        text(70, 190, s.time, { size: 32, color: ink }),
        line(60, GROUND + 2, 920, GROUND + 2, { w: 4, color: '#5f6b7a' }),
      );
      st(s.sceneSay, s.scene);
      st(
        s.paperSay,
        rect(960, 150, 580, 440, { fill: F.paper }),
        rect(960, 150, 580, 84, { fill }),
        text(990, 205, `${s.code} · ${s.full}`, { size: 34 }),
        ...s.rows.map((r, i) => text(990, 290 + i * 58, r, { size: 32 })),
        text(990, 560, who, { size: 28, color: ink }),
      );
      st(s.lessonSay, hl(960, 626, 580, 76, F.yellow), text(1250, 678, s.lesson, { size: 34, anchor: 'middle' }));
    }),
  );
}

/* ---------- the buying story: Mom at home ---------- */
const BUY_STORY = storyBoards('buy', 'Buying story', 'home', [
  {
    code: 'PR',
    full: 'Purchase Requisition',
    time: 'Morning · at HOME',
    intro: 'The buying story, step 1 of 6. It is morning at home.',
    sceneSay: 'Mom opens the rice jar. It is empty! The home needs rice.',
    scene: [...mom(230), ...jar(580, GROUND), ...text(700, 600, 'empty!', { size: 40, color: R }), ...say(90, 220, 600, 230, 'Oh no, the rice jar is empty!', 34)],
    rows: ['Item: Rice 5 kg', 'Qty: 1 bag', 'Why: the jar is empty', 'Need by: today'],
    paperSay: 'Mom writes down what the home needs: 5 kg rice, 1 bag. This note is the Purchase Requisition (PR).',
    lesson: 'PR = we NEED something',
    lessonSay: 'A PR means: we NEED something. Nothing is bought yet.',
  },
  {
    code: 'PQ',
    full: 'Purchase Quotation',
    time: 'Morning · phone call',
    intro: 'Step 2 of 6. Before buying, Mom wants to know the price.',
    sceneSay: 'She calls the grocery: “How much is 5 kg rice?” Ravi says: “₹350, valid this week.”',
    scene: [
      ...mom(200),
      ...shop(740, GROUND, 0.8),
      ...arrow([[310, 620], [600, 620]], { color: B, both: true, dash: true }),
      ...text(455, 600, 'phone call', { size: 30, color: B, anchor: 'middle' }),
      ...say(80, 220, 420, 200, 'How much is 5 kg rice?'),
      ...bubble(500, 330, 410, 96, 740, 570),
      ...text(705, 392, '₹350 — valid this week', { size: 32, anchor: 'middle' }),
    ],
    rows: ['From: the grocery', 'Rice 5 kg = ₹350', 'Valid: this week'],
    paperSay: 'Mom writes down the price she was given. This is the Purchase Quotation (PQ).',
    lesson: 'PQ = the PRICE we are given',
    lessonSay: 'A PQ means: the PRICE the seller gives us.',
  },
  {
    code: 'PO',
    full: 'Purchase Order',
    time: 'Morning · decision',
    intro: 'Step 3 of 6. The price is good. Mom decides to buy.',
    sceneSay: 'Mom says: “Yes! Please send one bag by 6 PM.” The order goes to the grocery.',
    scene: [
      ...mom(200),
      ...shop(740, GROUND, 0.8),
      ...arrow([[310, 620], [600, 620]], { color: O, w: 7 }),
      ...text(455, 600, 'ORDER', { size: 32, color: O, anchor: 'middle' }),
      ...say(80, 220, 520, 200, 'Yes! Please send one bag.', 34),
    ],
    rows: ['To: the grocery', 'Rice 5 kg × 1 bag', 'Price: ₹350', 'Deliver: today 6 PM'],
    paperSay: 'The order is written down: what, how many, what price, and when. This is the Purchase Order (PO).',
    lesson: 'PO = our ORDER: please send',
    lessonSay: 'A PO means: our firm ORDER — please send it.',
  },
  {
    code: 'GRN',
    full: 'Goods Receipt Note',
    time: '6 PM · at HOME',
    intro: 'Step 4 of 6. It is 6 PM. Someone is at the door.',
    sceneSay: 'The delivery boy brings the bag. Mom checks it: 5 kg, sealed, good!',
    scene: [
      ...mom(170),
      ...bag(330, GROUND, 0.8),
      ...boy(520),
      ...scooter(760, GROUND, 0.9),
      ...say(60, 210, 480, 170, '5 kg, sealed — all good ✓'),
      ...say(560, 330, 340, 520, 'Your rice is here!'),
    ],
    rows: ['Received: Rice 5 kg × 1', 'Condition: good ✓', 'Date: today, 6 PM', 'Against: our PO'],
    paperSay: 'Mom notes what arrived, and that it is fine. This is the Goods Receipt Note (GRN).',
    lesson: 'GRN = goods RECEIVED',
    lessonSay: 'A GRN means: the goods are RECEIVED and checked.',
  },
  {
    code: 'PI',
    full: 'Purchase Invoice',
    time: '6 PM · at HOME',
    intro: 'Step 5 of 6. The bill comes with the bag.',
    sceneSay: 'The delivery boy gives Mom the grocery’s bill: Bill no. 101, ₹350.',
    scene: [
      ...mom(170),
      ...bill(380, 720),
      ...text(380, 505, 'Bill no. 101', { size: 30, color: R, anchor: 'middle' }),
      ...boy(640),
      ...say(440, 220, 470, 640, 'Here is your bill: ₹350'),
    ],
    rows: ['From: the grocery', 'Their bill no.: 101', 'Rice 5 kg = ₹350', 'To pay: ₹350'],
    paperSay: 'Mom records the grocery’s bill. This is the Purchase Invoice (PI).',
    lesson: 'PI = the BILL we must pay',
    lessonSay: 'A PI means: the BILL we have to pay.',
  },
  {
    code: 'PV',
    full: 'Payment Voucher',
    time: '6 PM · at HOME',
    intro: 'Step 6 of 6. Time to pay.',
    sceneSay: 'Mom pays ₹350. “Thank you!” Now the bag is fully paid for.',
    scene: [
      ...mom(170),
      ...cash(430, 600),
      ...arrow([[560, 600], [650, 600]], { color: G, w: 7 }),
      ...boy(760),
      ...say(60, 220, 460, 170, 'Here is ₹350. Thank you!'),
      ...say(580, 340, 330, 760, 'Thank you!'),
    ],
    rows: ['Paid to: the grocery', 'Amount: ₹350', 'For bill no.: 101', 'Mode: cash'],
    paperSay: 'Mom writes down the payment. This is the Payment Voucher (PV). The buying story is complete!',
    lesson: 'PV = proof that we PAID',
    lessonSay: 'A PV means: proof that we PAID.',
  },
]);

/* ---------- the selling story: Ravi at the grocery ---------- */
const SELL_STORY = storyBoards('sell', 'Selling story', 'shop', [
  {
    code: 'SE',
    full: 'Sales Enquiry',
    time: 'Morning · at the GROCERY',
    intro: 'Now the SAME story from the grocery’s side. Step 1 of 6: morning at the shop.',
    sceneSay: 'The phone rings. The home asks: “Do you have 5 kg rice?”',
    scene: [
      ...ravi(220),
      ...house(740, GROUND, 0.8),
      ...arrow([[380, 620], [610, 620]], { color: B, both: true, dash: true }),
      ...text(495, 600, 'phone call', { size: 30, color: B, anchor: 'middle' }),
      ...bubble(420, 230, 480, 96, 740, 525),
      ...text(660, 292, 'Do you have 5 kg rice?', { size: 32, anchor: 'middle' }),
    ],
    rows: ['Customer: the home', 'Asks for: Rice 5 kg', 'Date: today'],
    paperSay: 'Ravi notes the question: who asked, and for what. This is the Sales Enquiry (SE).',
    lesson: 'SE = a customer ASKS',
    lessonSay: 'An SE means: a customer ASKS.',
  },
  {
    code: 'SQ',
    full: 'Sales Quotation',
    time: 'Morning · at the GROCERY',
    intro: 'Step 2 of 6. Ravi checks his price list.',
    sceneSay: 'Ravi answers: “Yes! 5 kg rice is ₹350. The price is valid this week.”',
    scene: [
      ...ravi(220),
      ...house(740, GROUND, 0.8),
      ...arrow([[380, 620], [610, 620]], { color: B, w: 7 }),
      ...text(495, 600, 'price', { size: 30, color: B, anchor: 'middle' }),
      ...say(60, 220, 520, 220, 'Yes! 5 kg rice is ₹350.'),
    ],
    rows: ['To: the home', 'Rice 5 kg = ₹350', 'Valid: this week'],
    paperSay: 'He writes down the price he gave. This is the Sales Quotation (SQ).',
    lesson: 'SQ = we GIVE our price',
    lessonSay: 'An SQ means: we GIVE our price.',
  },
  {
    code: 'SO',
    full: 'Sales Order',
    time: 'Morning · at the GROCERY',
    intro: 'Step 3 of 6. The home calls back.',
    sceneSay: 'The home says: “OK, please send one bag!” Ravi keeps one bag aside for them.',
    scene: [
      ...ravi(220),
      ...house(740, GROUND, 0.8),
      ...bag(470, GROUND, 0.8),
      ...text(470, 625, 'for HOME', { size: 28, color: B, anchor: 'middle' }),
      ...bubble(420, 230, 480, 96, 740, 525),
      ...text(660, 292, 'OK, please send one bag!', { size: 32, anchor: 'middle' }),
    ],
    rows: ['Customer: the home', 'Rice 5 kg × 1 bag', 'Price: ₹350', 'Deliver: today 6 PM'],
    paperSay: 'Ravi writes down the confirmed order. This is the Sales Order (SO).',
    lesson: 'SO = the customer CONFIRMS',
    lessonSay: 'An SO means: the customer CONFIRMED the order.',
  },
  {
    code: 'DO',
    full: 'Delivery Order',
    time: 'Evening · at the GROCERY',
    intro: 'Step 4 of 6. Evening: time to deliver.',
    sceneSay: 'The delivery boy takes the bag on the scooter to the home. The shop now has one bag less.',
    scene: [
      ...ravi(170),
      ...boy(420),
      ...scooter(650, GROUND, 1),
      ...bag(584, 624, 0.5),
      ...arrow([[760, 560], [900, 560]], { color: B, w: 7 }),
      ...text(830, 540, 'to HOME', { size: 30, color: B, anchor: 'middle' }),
      ...say(60, 220, 420, 170, 'Stock: 1 bag less'),
    ],
    rows: ['To: the home', 'Rice 5 kg × 1 bag', 'Stock: 1 bag less', 'Against: our SO'],
    paperSay: 'Ravi writes down what left the shop. This is the Delivery Order (DO).',
    lesson: 'DO = goods LEAVE the shop',
    lessonSay: 'A DO means: the goods LEAVE the shop.',
  },
  {
    code: 'SI',
    full: 'Sales Invoice',
    time: 'Evening · at the GROCERY',
    intro: 'Step 5 of 6. The bill.',
    sceneSay: 'Ravi makes the bill — Bill no. 101, ₹350 — and sends it with the bag.',
    scene: [
      ...ravi(220),
      ...bill(520, 720),
      ...text(520, 505, 'Bill no. 101', { size: 30, color: R, anchor: 'middle' }),
      ...arrow([[620, 620], [880, 620]], { color: B, w: 7 }),
      ...text(750, 600, 'with the bag', { size: 28, color: B, anchor: 'middle' }),
      ...say(60, 220, 500, 220, 'Bill no. 101 — ₹350'),
    ],
    rows: ['Bill no.: 101', 'Customer: the home', 'Rice 5 kg = ₹350', 'Total: ₹350'],
    paperSay: 'This bill is the Sales Invoice (SI). It tells the home how much to pay.',
    lesson: 'SI = we SEND the bill',
    lessonSay: 'An SI means: we SEND the bill.',
  },
  {
    code: 'RV',
    full: 'Receipt Voucher',
    time: 'Night · at the GROCERY',
    intro: 'Step 6 of 6. The money comes back.',
    sceneSay: 'The delivery boy comes back with ₹350 from the home. Ravi puts it in the cash box.',
    scene: [
      ...ravi(220),
      ...cash(520, 600),
      ...arrow([[790, 600], [660, 600]], { color: G, w: 7 }),
      ...boy(840),
      ...say(60, 240, 380, 220, '₹350 received ✓'),
      ...say(560, 230, 350, 840, '₹350 from the home', 30),
    ],
    rows: ['Received from: the home', 'Amount: ₹350', 'For bill no.: 101', 'Mode: cash'],
    paperSay: 'Ravi writes down the money received. This is the Receipt Voucher (RV). The selling story is complete!',
    lesson: 'RV = proof we GOT the money',
    lessonSay: 'An RV means: proof that we GOT the money.',
  },
]);

/* =========================================================== CYCLE AT A GLANCE (one page, drawn once) */
// The 6 papers sit around a loop; the last paper leads back to the first (next time we need rice).
const LOOP: [number, number][] = [
  [800, 195],
  [1290, 350],
  [1290, 650],
  [800, 805],
  [310, 650],
  [310, 350],
];
const LINKS: [[number, number], [number, number]][] = [
  [[970, 215], [1180, 295]],
  [[1290, 404], [1290, 596]],
  [[1180, 705], [970, 785]],
  [[630, 785], [420, 705]],
  [[310, 596], [310, 404]],
  [[420, 295], [630, 215]],
];
function cycleBoard(id: string, label: string, side: 'home' | 'shop', papers: [string, string][], say: string): Board {
  const fill = side === 'home' ? F.orange : F.blue;
  const ink = side === 'home' ? O : B;
  return board(id, label, 'Book p.6', (st) => {
    st(
      say,
      title(side === 'home' ? 'Purchase cycle — the home BUYS' : 'Sales cycle — the grocery SELLS', 'Book p.6', 70, 92, 1000),
      ...LINKS.map(([a, b], i) => arrow([a, b], { color: i === 5 ? G : ink, w: 6, dash: i === 5 })),
      ...papers.map(([code, full], i) => {
        const [x, y] = LOOP[i];
        return [...rect(x - 165, y - 50, 330, 100, { fill }), ...text(x, y - 4, `${i + 1}. ${code}`, { size: 42, anchor: 'middle' }), ...text(x, y + 34, full, { size: 26, anchor: 'middle' })];
      }),
      side === 'home' ? house(800, 470, 0.7) : shop(800, 470, 0.7),
      text(800, 548, side === 'home' ? 'HOME buys' : 'GROCERY sells', { size: 44, color: ink, anchor: 'middle' }),
      text(800, 598, '1 bag rice · ₹350', { size: 34, anchor: 'middle' }),
      text(470, 232, 'next time', { size: 26, color: G, anchor: 'middle' }),
    );
  });
}
const BUY_CYCLE = cycleBoard(
  'buy-cycle',
  'Purchase cycle (all 6 papers)',
  'home',
  [
    ['PR', 'Purchase Requisition'],
    ['PQ', 'Purchase Quotation'],
    ['PO', 'Purchase Order'],
    ['GRN', 'Goods Receipt Note'],
    ['PI', 'Purchase Invoice'],
    ['PV', 'Payment Voucher'],
  ],
  'The whole PURCHASE cycle on one page: need, price, order, receive, bill, pay — PR, PQ, PO, GRN, PI, PV. When the jar is empty again, it starts again.',
);
const SELL_CYCLE = cycleBoard(
  'sell-cycle',
  'Sales cycle (all 6 papers)',
  'shop',
  [
    ['SE', 'Sales Enquiry'],
    ['SQ', 'Sales Quotation'],
    ['SO', 'Sales Order'],
    ['DO', 'Delivery Order'],
    ['SI', 'Sales Invoice'],
    ['RV', 'Receipt Voucher'],
  ],
  'The whole SALES cycle on one page: question, price, order, deliver, bill, collect — SE, SQ, SO, DO, SI, RV. The next customer starts it again.',
);

export const CYCLE_BOARDS = { BUY_STORY, SELL_STORY, BUY_CYCLE, SELL_CYCLE };
