// Topic 2: the PURCHASE cycle (the home buys) and the SALES cycle (the grocery sells),
// each step shown as a big card: a drawing, what is written on the paper, and who writes it.
// One example all the way: one 5 kg bag of rice for ₹350.

import { B, F, G, O, R, arrow, bag, bubble, hl, house, line, luggage, person, rect, scooter, shop, text, tip, title, type Board, type Item, type Step } from './kit';

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
function phone(cx: number, by: number): Item[] {
  return [
    ...rect(cx - 55, by - 200, 110, 200, { fill: '#3a4250' }),
    ...rect(cx - 42, by - 180, 84, 146, { fill: F.sky, w: 3 }),
    ...text(cx, by - 96, '₹350', { size: 26, color: B, anchor: 'middle' }),
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

/* ---------- one step card ---------- */
type Card = {
  code: string;
  full: string;
  say: string;
  tipText: string;
  draw: (cx: number) => Item[];
  lines: [string, string, string];
};
const CW = 460;
const cardX = (i: number) => 60 + i * 510;

function card(c: Card, n: number, i: number, side: 'home' | 'shop'): Item[][] {
  const x = cardX(i);
  const cx = x + CW / 2;
  const fill = side === 'home' ? F.orange : F.blue;
  const ink = side === 'home' ? O : B;
  return [
    tip(
      `${c.code} · ${c.full}`,
      c.tipText,
      rect(x, 140, CW, 96, { fill }),
      text(x + 20, 184, `${n}. ${c.code}`, { size: 44 }),
      text(x + 20, 224, c.full, { size: 30 }),
      c.draw(cx),
      rect(x + 30, 500, 400, 190, { fill: F.paper }),
      text(x + 55, 550, c.lines[0], { size: 32 }),
      text(x + 55, 602, c.lines[1], { size: 32 }),
      text(x + 55, 654, c.lines[2], { size: 32 }),
      text(cx, 740, side === 'home' ? 'written at HOME (buyer)' : 'written at GROCERY (seller)', { size: 30, color: ink, anchor: 'middle' }),
    ),
    ...(i > 0 ? [arrow([[x - 46, 360], [x - 6, 360]], { w: 6 })] : []),
  ];
}

/* =========================================================== PURCHASE CYCLE (home buys) */
const BUY: Card[] = [
  {
    code: 'PR',
    full: 'Purchase Requisition',
    say: 'Step 1 · Purchase Requisition (PR): the rice jar is empty. The home writes down: “we need 5 kg rice.”',
    tipText: 'A requisition is a request: “we need this”. Nothing is ordered yet — it only records the need.',
    draw: (cx) => [...jar(cx - 50, 470), ...text(cx + 120, 340, 'empty!', { size: 40, color: R, anchor: 'middle' })],
    lines: ['Item: rice, 5 kg', 'Qty: 1 bag', 'Why: jar is empty'],
  },
  {
    code: 'PQ',
    full: 'Purchase Quotation',
    say: 'Step 2 · Purchase Quotation (PQ): the home asks the price. The grocery says ₹350, and the home notes it.',
    tipText: 'A quotation is a price offer. The home writes down the price the grocery gave, so it can decide.',
    draw: (cx) => [...phone(cx - 90, 470), ...text(cx + 70, 340, 'Shop says:', { size: 32, anchor: 'middle' }), ...text(cx + 70, 400, '₹350', { size: 52, color: B, anchor: 'middle' })],
    lines: ['From: grocery', 'Rice 5 kg = ₹350', 'Valid: this week'],
  },
  {
    code: 'PO',
    full: 'Purchase Order',
    say: 'Step 3 · Purchase Order (PO): the home says “yes, please send one bag”. The order goes to the grocery.',
    tipText: 'An order is a firm “yes, I will buy”. It tells the grocery what to send and at what price.',
    draw: (cx) => [...house(cx - 120, 470, 0.55), ...shop(cx + 120, 470, 0.55), ...arrow([[cx - 60, 300], [cx + 60, 300]], { color: O, w: 6 }), ...text(cx, 280, 'order', { size: 32, color: O, anchor: 'middle' })],
    lines: ['To: grocery', 'Send: 1 bag rice', 'Price: ₹350'],
  },
];
const BUY2: Card[] = [
  {
    code: 'GRN',
    full: 'Goods Receipt Note',
    say: 'Step 4 · Goods Receipt Note (GRN): the bag arrives. The home checks it — 5 kg, good — and notes it.',
    tipText: 'The GRN records what really arrived. If only part of the goods comes, the GRN shows only that part.',
    draw: (cx) => [...house(cx - 100, 470, 0.6), ...bag(cx + 110, 470, 0.85), ...text(cx + 110, 300, 'arrived ✓', { size: 34, color: G, anchor: 'middle' })],
    lines: ['Got: 1 bag rice', 'Checked: 5 kg ✓', 'From: grocery'],
  },
  {
    code: 'PI',
    full: 'Purchase Invoice',
    say: 'Step 5 · Purchase Invoice (PI): the grocery’s bill comes. The home records it: ₹350 to pay.',
    tipText: 'The invoice is the bill. At home it is called a Purchase Invoice: money we must pay.',
    draw: (cx) => [...bill(cx - 100, 470), ...text(cx + 105, 360, 'bill from', { size: 32, anchor: 'middle' }), ...text(cx + 105, 405, 'the grocery', { size: 32, color: B, anchor: 'middle' })],
    lines: ['Bill from: grocery', 'Rice 5 kg: ₹350', 'To pay: ₹350'],
  },
  {
    code: 'PV',
    full: 'Payment Voucher',
    say: 'Step 6 · Payment Voucher (PV): the home pays ₹350 and writes it down. The purchase is complete!',
    tipText: 'A payment voucher records money going out: how much, to whom, and how (cash or UPI).',
    draw: (cx) => [...cash(cx, 350), ...text(cx, 455, 'paid to the grocery ✓', { size: 32, color: G, anchor: 'middle' })],
    lines: ['Paid to: grocery', 'Amount: ₹350', 'By: cash / UPI'],
  },
];

const purchase1 = board('buy1', 'Purchase cycle (1 of 2)', 'Book p.6', (st) => {
  st('The PURCHASE cycle: the 6 papers a buyer writes. Our buyer is the home, buying one 5 kg bag of rice.', title('Purchase cycle — the home BUYS (1/2)', 'Book p.6', 70, 92, 1190));
  BUY.forEach((c, i) => st(c.say, ...card(c, i + 1, i, 'home')));
  st('So far: need → price → order. Next: the bag arrives, the bill comes, and the home pays.', hl(300, 785, 1000, 72, F.yellow), text(800, 836, 'PR → PQ → PO → …', { size: 46, anchor: 'middle' }));
});
const purchase2 = board('buy2', 'Purchase cycle (2 of 2)', 'Book p.6', (st) => {
  st('The purchase cycle continues: the bag arrives, the bill comes, and the home pays.', title('Purchase cycle — the home BUYS (2/2)', 'Book p.6', 70, 92, 1190));
  BUY2.forEach((c, i) => st(c.say, ...card(c, i + 4, i, 'home')));
  st(
    'The whole purchase cycle: PR, PQ, PO, GRN, PI, PV — six papers, all for one bag of rice.',
    tip('The purchase cycle', 'Requisition → Quotation → Order → Goods Receipt → Invoice → Payment. Written by the buyer (orange).', hl(150, 785, 1300, 72, F.orange), text(800, 836, 'PR → PQ → PO → GRN → PI → PV  ✓', { size: 46, anchor: 'middle' })),
  );
});

/* =========================================================== SALES CYCLE (grocery sells) */
const SELL: Card[] = [
  {
    code: 'SE',
    full: 'Sales Enquiry',
    say: 'Step 1 · Sales Enquiry (SE): a customer — the home — asks: “Do you have 5 kg rice?” The grocery notes it.',
    tipText: 'An enquiry is a question from a customer. The shop writes it down so no customer is forgotten.',
    draw: (cx) => [...person(cx - 130, 480, 0.7, F.orange), ...bubble(cx - 50, 246, 270, 62, cx - 112, 314), ...text(cx + 85, 289, 'Rice 5 kg?', { size: 34, anchor: 'middle' })],
    lines: ['From: home', 'Asks: rice 5 kg?', 'Date: today'],
  },
  {
    code: 'SQ',
    full: 'Sales Quotation',
    say: 'Step 2 · Sales Quotation (SQ): the grocery gives its price: ₹350 for the 5 kg bag.',
    tipText: 'The quotation is the shop’s price offer to the customer. It is the reciprocal of the home’s Purchase Quotation.',
    draw: (cx) => [...luggage(cx - 190, 320, 210, 110), ...text(cx - 70, 392, '₹350', { size: 48, anchor: 'middle' }), ...bag(cx + 130, 470, 0.85)],
    lines: ['To: home', 'Rice 5 kg = ₹350', 'Valid: this week'],
  },
  {
    code: 'SO',
    full: 'Sales Order',
    say: 'Step 3 · Sales Order (SO): the home says yes. The grocery confirms the order and keeps one bag aside.',
    tipText: 'The Sales Order confirms what will be sold, to whom, and at what price. It is the reciprocal of the home’s Purchase Order.',
    draw: (cx) => [...bag(cx - 80, 470, 0.9), ...rect(cx + 20, 320, 190, 70, { fill: F.yellow }), ...text(cx + 115, 367, 'for HOME', { size: 32, anchor: 'middle' }), ...text(cx + 115, 440, 'kept aside ✓', { size: 32, color: G, anchor: 'middle' })],
    lines: ['Customer: home', 'Rice 5 kg × 1', 'Price: ₹350'],
  },
];
const SELL2: Card[] = [
  {
    code: 'DO',
    full: 'Delivery Order',
    say: 'Step 4 · Delivery Order (DO): the bag goes out to the home. The grocery now has one bag less in stock.',
    tipText: 'The Delivery Order records goods leaving the shop. It is the reciprocal of the home’s Goods Receipt Note.',
    draw: (cx) => [...scooter(cx - 50, 470, 1), ...bag(cx - 100, 354, 0.55), ...arrow([[cx + 70, 420], [cx + 200, 420]], { color: B, w: 6 }), ...text(cx + 140, 395, 'to HOME', { size: 30, color: B, anchor: 'middle' })],
    lines: ['Deliver to: home', 'Rice 5 kg × 1', 'Stock: 1 bag less'],
  },
  {
    code: 'SI',
    full: 'Sales Invoice',
    say: 'Step 5 · Sales Invoice (SI): the grocery writes the bill: ₹350 for the home.',
    tipText: 'The Sales Invoice is the bill the shop sends. At the home, the same bill is the Purchase Invoice.',
    draw: (cx) => [...bill(cx - 100, 470), ...text(cx + 105, 360, 'bill to', { size: 32, anchor: 'middle' }), ...text(cx + 105, 405, 'the home', { size: 32, color: O, anchor: 'middle' })],
    lines: ['Bill to: home', 'Rice 5 kg: ₹350', 'Bill no.: 101'],
  },
  {
    code: 'RV',
    full: 'Receipt Voucher',
    say: 'Step 6 · Receipt Voucher (RV): the grocery receives ₹350 and writes it down. The sale is complete!',
    tipText: 'A receipt voucher records money coming in: how much, from whom, and how. It is the reciprocal of the home’s Payment Voucher.',
    draw: (cx) => [...cash(cx, 350), ...text(cx, 455, 'received from home ✓', { size: 32, color: G, anchor: 'middle' })],
    lines: ['From: home', 'Amount: ₹350', 'By: cash / UPI'],
  },
];

const sales1 = board('sell1', 'Sales cycle (1 of 2)', 'Book p.6', (st) => {
  st('Now the other side — the SALES cycle: the 6 papers a seller writes. Our seller is the grocery.', title('Sales cycle — the grocery SELLS (1/2)', 'Book p.6', 70, 92, 1150));
  SELL.forEach((c, i) => st(c.say, ...card(c, i + 1, i, 'shop')));
  st('So far: question → price → order. Next: deliver the bag, write the bill, and collect the money.', hl(300, 785, 1000, 72, F.yellow), text(800, 836, 'SE → SQ → SO → …', { size: 46, anchor: 'middle' }));
});
const sales2 = board('sell2', 'Sales cycle (2 of 2)', 'Book p.6', (st) => {
  st('The sales cycle continues: the bag is delivered, the bill is written, and the money comes in.', title('Sales cycle — the grocery SELLS (2/2)', 'Book p.6', 70, 92, 1150));
  SELL2.forEach((c, i) => st(c.say, ...card(c, i + 4, i, 'shop')));
  st(
    'The whole sales cycle: SE, SQ, SO, DO, SI, RV — six papers, all for the same bag of rice.',
    tip('The sales cycle', 'Enquiry → Quotation → Order → Delivery → Invoice → Receipt. Written by the seller (blue).', hl(150, 785, 1300, 72, F.blue), text(800, 836, 'SE → SQ → SO → DO → SI → RV  ✓', { size: 46, anchor: 'middle' })),
  );
});


/* =========================================================== THE STORIES (one board per paper) */
// Buying story = the home's side (Mom). Selling story = the grocery's side (Ravi).
// Left: the scene. Right: the paper that gets written. Bottom: where we are in the 6 steps.

const GROUND = 740;
const mom = (cx: number) => person(cx, GROUND, 0.95, F.pink);
const boy = (cx: number) => person(cx, GROUND, 0.95, F.green);
const ravi = (cx: number) => [...person(cx, GROUND, 0.95, F.blue), ...rect(cx - 130, 650, 260, 92, { fill: F.brown })];
const say = (x: number, y: number, w: number, tx: number, str: string, size = 32): Item[] => [
  ...bubble(x, y, w, 96, tx, 500),
  ...text(x + w / 2, y + 62, str, { size, anchor: 'middle' }),
];

function strip(codes: string[], cur: number, fill: string): Item[] {
  const out: Item[] = [];
  codes.forEach((c, k) => {
    const x = 60 + k * 250;
    out.push(...rect(x, 796, 225, 64, { fill: k === cur ? fill : k < cur ? '#e9ecef' : F.white, w: k === cur ? 6 : 3 }));
    out.push(...text(x + 112, 840, k < cur ? `${c} ✓` : c, { size: 34, anchor: 'middle', ...(k < cur ? { color: '#5c6672' } : {}) }));
    if (k > 0) out.push(...text(x - 12, 838, '→', { size: 26, anchor: 'middle' }));
  });
  return out;
}

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
  const codes = list.map((s) => s.code);
  const who = side === 'home' ? 'Written by: Mom (at home)' : 'Written by: Ravi (at the grocery)';
  return list.map((s, k) =>
    board(`${prefix}-${s.code.toLowerCase()}`, `${page} ${k + 1}: ${s.code}`, page, (st) => {
      st(
        s.intro,
        title(`${k + 1}. ${s.code} — ${s.full}`, page),
        text(70, 190, s.time, { size: 32, color: ink }),
        line(60, GROUND + 2, 920, GROUND + 2, { w: 4, color: '#9aa4b1' }),
        strip(codes, k, fill),
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

export const CYCLE_BOARDS = { purchase1, purchase2, sales1, sales2, BUY_STORY, SELL_STORY };
