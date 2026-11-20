// The whole seminar as whiteboard boards.
// Each step = what the marker draws next + the subtitle. tip(...) adds a hover explanation to a drawing.

import {
  B,
  F,
  G,
  K,
  O,
  P,
  R,
  arrow,
  bag,
  chip,
  coverBoard,
  cross,
  dashed,
  doc,
  hl,
  house,
  line,
  lock,
  luggage,
  panel,
  poly,
  rect,
  text,
  tick,
  tip,
  info,
  type Tip,
  title,
  type Board,
  type Item,
  type Step,
} from './kit';
import { CYCLE_BOARDS } from './cycles';
import { LAW_BOARDS } from './law';

function board(id: string, label: string, page: string, build: (st: (say: string, ...g: Item[][]) => void) => void): Board {
  const steps: Step[] = [];
  build((say, ...g) => steps.push({ say, items: g.flat() }));
  return { id, label, page, steps };
}

/* =========================================================== 0 · TOPIC 2 COVER */
const cover = coverBoard(
  'erp-cover',
  2,
  'Business Process',
  'FactsERP · Book 2 · Documents, the building blocks',
  'Topic 2: Business Process — how FactsERP records every step of buying and selling as papers, called documents.',
  [
    ['What a document is — one form, many papers', 'First: everything a business does is written down as a document — and papers copy each other.'],
    ['The PURCHASE cycle — the home buys rice', 'Then the purchase cycle: the 6 papers the home writes when it buys one bag of rice.'],
    ['The SALES cycle — the grocery sells rice', 'Then the sales cycle: the 6 papers the grocery writes when it sells that same bag.'],
    ['Both cycles together — and how papers link', 'Finally: both cycles side by side, and the rules for linking the papers.'],
  ],
);

/* =========================================================== 1 · INTRO */

/* =========================================================== 2 · EVERYTHING IS A DOCUMENT (p.3) */

/* =========================================================== 3 · MOULD → BRICKS (p.4) */
const mould = board('mould', 'Mould → Bricks', 'Book p.4', (st) => {
  st('Book page 4: Source Documents and Documents. Let’s start with bricks.', title('Mould → Bricks', 'Book p.4'));
  st(
    'A brick-maker makes ONE wooden mould…',
    tip(
      'Mould = Source Document',
      'A blank template built once by the software team. In FactsERP this is the Source Document Master.',
      rect(110, 160, 280, 130, { fill: F.brown }),
      rect(130, 180, 110, 90, { fill: '#7a4a24' }),
      rect(260, 180, 110, 90, { fill: '#7a4a24' }),
      text(250, 340, 'MOULD', { size: 44, anchor: 'middle' }),
      text(250, 385, '= Source Document', { size: 32, color: B, anchor: 'middle' }),
    ),
  );
  st(
    '…and stamps out many bricks from it, every day.',
    arrow([
      [400, 225],
      [540, 225],
    ]),
    tip(
      'Bricks = Documents',
      'Real papers made from the template every day. In FactsERP they are set up in the Document Master.',
      rect(560, 180, 110, 64, { fill: '#e8705a' }),
      rect(690, 180, 110, 64, { fill: '#e8705a' }),
      rect(820, 180, 110, 64, { fill: '#e8705a' }),
      rect(625, 256, 110, 64, { fill: '#e8705a' }),
      rect(755, 256, 110, 64, { fill: '#e8705a' }),
      text(745, 375, 'BRICKS = Documents', { size: 40, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'In FactsERP the mould is a SOURCE DOCUMENT. SAL is a blank sales form: customer, item, qty, price.',
    tip(
      'SAL · Sales Source Document',
      'The blank sales form (screen frmSales01): customer, item, quantity and price. One form serves the quotation, the order and the invoice.',
      rect(90, 470, 400, 150, { fill: F.sky }),
      text(115, 528, 'SAL', { size: 50, color: B }),
      text(230, 526, 'blank form', { size: 34 }),
      text(115, 590, 'Customer · Item · Qty · Price', { size: 28 }),
    ),
  );
  st(
    'One SAL mould stamps out three real papers: the Quotation, the Sales Order and the Sales Invoice.',
    tip('SQ · Sales Quotation', 'The price offer to the customer: 5 kg rice for ₹350.', chip(800, 452, 480, 72, 'SQ', 'Quotation', F.yellow, 38)),
    tip('SO · Sales Order', 'The customer said yes — the confirmed order.', chip(800, 534, 480, 72, 'SO', 'Sales Order', F.yellow, 38)),
    tip('SI · Sales Invoice', 'The bill for ₹350.', chip(800, 616, 480, 72, 'SI', 'Sales Invoice', F.yellow, 38)),
    arrow([
      [495, 520],
      [790, 488],
    ]),
    arrow([
      [495, 540],
      [790, 570],
    ]),
    arrow([
      [495, 560],
      [790, 652],
    ]),
  );
  st(
    'The DO mould makes the Delivery Order. The RW mould makes the Bank Receipt Voucher.',
    tip('DO mould', 'Delivery Order source document (screen frmSales02) — the blank form for deliveries.', rect(90, 650, 400, 80, { fill: F.sky }), text(115, 703, 'DO mould', { size: 40, color: B })),
    tip('RW mould', 'Payment / Receipt with Allocation (screen frmPaymentWithAllocation) — the blank form for money in and out.', rect(90, 760, 400, 80, { fill: F.sky }), text(115, 813, 'RW mould', { size: 40, color: B })),
    tip('DO · Delivery Order', 'The paper that goes with the bag when it leaves the shop.', chip(800, 698, 480, 72, 'DO', 'Delivery Order', F.green, 38)),
    tip('BRV · Bank Receipt Voucher', 'Records the ₹350 arriving in the shop’s bank account.', chip(800, 780, 480, 72, 'BRV', 'Bank Receipt', F.green, 38)),
    arrow([
      [495, 690],
      [790, 734],
    ]),
    arrow([
      [495, 800],
      [790, 816],
    ]),
  );
  st(
    'Left of the red line: blank forms built ONCE by the software team. Right: real papers the shop uses EVERY DAY.',
    tip(
      'The red line',
      'Left side = templates, built once. Right side = real documents, made every day from those templates.',
      line(640, 430, 640, 875, { color: R, w: 8 }),
      text(1310, 520, 'built once ←', { size: 34, color: R }),
      text(1310, 570, '→ used daily', { size: 34, color: R }),
    ),
  );
});

/* =========================================================== 4 · INHERITANCE (p.5) */
const copy = board('copy', 'The magic copy', 'Book p.5', (st) => {
  st('A child inherits traits from its parents. In FactsERP, papers inherit too.', title('The magic copy (inheritance)', 'Book p.5'));
  st(
    'The grocery writes a quotation: customer, item and price.',
    tip(
      'Parent: the Quotation',
      'The first paper. It already holds the customer, the item and the price.',
      rect(90, 190, 560, 330, { fill: F.yellow }),
      text(120, 260, 'SQ · Quotation', { size: 48, color: B }),
      text(120, 335, 'Customer: Home', { size: 38 }),
      text(120, 400, 'Item: 5 kg rice', { size: 38 }),
      text(120, 465, 'Price: ₹350', { size: 38 }),
      text(370, 580, 'PARENT', { size: 44, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'You say YES. Now the shop needs a Sales Order — the child.',
    tip(
      'Child: the Sales Order',
      'The next paper, created from the quotation (its “previous document”).',
      rect(950, 190, 560, 420, { fill: F.white }),
      text(980, 260, 'SO · Sales Order', { size: 48, color: B }),
      text(980, 335, 'Customer:', { size: 38 }),
      text(980, 400, 'Item:', { size: 38 }),
      text(980, 465, 'Price:', { size: 38 }),
      text(1230, 670, 'CHILD', { size: 44, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'FactsERP copies the customer, the item and the price by itself. Nobody types them again.',
    tip(
      'Inheritance',
      'FactsERP copies the data from the previous document, so it is typed only once. Less typing, fewer mistakes.',
      arrow(
        [
          [660, 330],
          [800, 250],
          [940, 330],
        ],
        { color: G, w: 7 },
      ),
      text(800, 235, 'copies!', { size: 44, color: G, anchor: 'middle' }),
      text(1170, 335, 'Home', { size: 38, color: G }),
      text(1095, 400, '5 kg rice', { size: 38, color: G }),
      text(1110, 465, '₹350', { size: 38, color: G }),
    ),
  );
  st('The child only adds its OWN new detail — the delivery time.', tip('Its own new detail', 'A new document only adds what is new — here the delivery time.', hl(970, 505, 400, 62, F.green), text(980, 550, '+ Delivery: 6 PM', { size: 40, color: K })));
  st('Typed once, copied everywhere. That is inheritance.', hl(380, 735, 840, 74, F.yellow), text(800, 790, 'Typed once → copied everywhere', { size: 52, anchor: 'middle' }));
});

/* =========================================================== 5 · THE SALES CHAIN (p.5 diagram) */
// Point at any box (or a column name) to open a card: what it is, an example, and its cases.
type N = [string, number, number, number, string];
const CH: Record<string, N> = {
  contract: ['Contract', 400, 290, 170, F.grey],
  contact: ['Contact', 110, 460, 160, F.grey],
  inquiry: ['Inquiry', 270, 460, 140, F.grey],
  quotation: ['Quotation', 430, 460, 170, F.grey],
  sched: ['Schedule', 400, 640, 170, F.grey],
  so: ['Sales order', 665, 460, 170, F.blue],
  delivery: ['Delivery', 875, 460, 150, F.orange],
  goods: ['Goods issue', 1075, 300, 180, F.orange],
  transfer: ['Transfer', 1075, 460, 170, F.orange],
  ship: ['Shipment', 1075, 600, 180, F.orange],
  invoice: ['Invoice', 1300, 460, 150, F.green],
  stock: ['Stock a/c', 1480, 300, 160, F.yellow],
  ar: ['Receivable', 1480, 460, 160, F.yellow],
};
const CTIP: Record<string, Tip> = {
  contact: {
    title: 'Contact',
    text: 'The first touch with a customer — before they ask for anything.',
    ex: 'A new family moves in nearby and walks into the grocery.',
    cases: ['A walk-in visit', 'A phone call or WhatsApp message', 'A visit by the shop’s salesman'],
  },
  inquiry: {
    title: 'Inquiry (Sales Enquiry · SE)',
    text: 'The customer asks a question about an item. The shop writes it down so no customer is forgotten.',
    ex: '“Do you have 5 kg rice?”',
    cases: ['Is the item in stock?', 'What is the price?', 'When can you deliver?'],
  },
  quotation: {
    title: 'Quotation (Sales Quotation · SQ)',
    text: 'The shop offers a price in writing. The customer can say yes or no.',
    ex: '“5 kg rice = ₹350, valid this week.”',
    cases: ['Price for each item', 'Any discount offered', 'Valid until a date'],
  },
  contract: {
    title: 'Contract',
    text: 'A long-term deal agreed BEFORE the orders come. Each later order follows its price and terms.',
    ex: 'A hotel agrees to buy rice at ₹340 a bag for one full year.',
    cases: ['Fixed price for a period', 'Total quantity agreed', 'Orders are made under the contract'],
  },
  sched: {
    title: 'Scheduling agreement',
    text: 'An agreement to deliver again and again on fixed dates — no new order each time.',
    ex: 'One 5 kg bag every Monday for the office canteen.',
    cases: ['Fixed dates (weekly / monthly)', 'Fixed quantity each time', 'Runs until the agreement ends'],
  },
  so: {
    title: 'Sales Order (SO)',
    text: 'The confirmed order: what is sold, to whom, at what price. Everything before feeds it; everything after follows it.',
    ex: 'Home: 1 bag rice, ₹350, deliver today.',
    cases: ['Made from a quotation', 'Or made under a contract', 'Or made from a schedule'],
  },
  delivery: {
    title: 'Delivery (Delivery Order · DO)',
    text: 'The paper that says: these goods go out to this customer.',
    ex: '1 bag of rice goes out to the home.',
    cases: ['Full delivery', 'Part delivery — the rest comes later', 'Many deliveries for one order'],
  },
  goods: {
    title: 'Goods issue',
    text: 'The goods leave the store, so the stock goes DOWN — in quantity and in value.',
    ex: 'Rice on the shelf: 10 bags → 9 bags.',
    cases: ['Stock quantity goes down', 'Stock value goes down', 'The stock account is updated'],
  },
  transfer: {
    title: 'Transfer order',
    text: 'Moves goods between the shop’s OWN places — not to a customer. No sale happens.',
    ex: 'Move 5 bags from the godown to the shop shelf.',
    cases: ['Godown → shop', 'Branch → branch', 'One shelf → another shelf'],
  },
  ship: {
    title: 'Shipment',
    text: 'The goods are carried to the customer.',
    ex: 'The delivery boy takes the bag to the home on the scooter.',
    cases: ['Own delivery (scooter, van)', 'A courier or transporter', 'The customer picks it up'],
  },
  invoice: {
    title: 'Invoice (Sales Invoice · SI)',
    text: 'The bill the shop gives the customer: how much to pay.',
    ex: 'Bill no. 101: rice 5 kg = ₹350.',
    cases: ['One bill for one delivery', 'One bill for many deliveries', 'Tax added on the bill'],
  },
  stock: {
    title: 'Stock account',
    text: 'The accounts record of how much the goods in the shop are worth.',
    ex: 'One bag sold → the stock is worth one bag less.',
    cases: ['Updated by the goods issue', 'Shows the value of goods in hand'],
  },
  ar: {
    title: 'Receivable (Accounts receivable)',
    text: 'Money the customer still owes the shop.',
    ex: 'The home owes ₹350 until it pays.',
    cases: ['Goes UP when the bill is made', 'Goes DOWN when the money comes in (RV)', 'Old dues are followed up'],
  },
};
const COLS: [string, number, Tip][] = [
  ['Pre-sales', 270, { title: 'Pre-sales', text: 'Everything that happens BEFORE the customer orders.', cases: ['A customer gets in touch', 'Asks a question (inquiry)', 'Gets a price (quotation)', 'Or a long deal: contract / schedule'] }],
  ['Order', 665, { title: 'Order processing', text: 'The customer says YES — the order is confirmed in a Sales Order.', cases: ['Item, quantity and price fixed', 'Delivery date agreed'] }],
  ['Fulfilment', 975, { title: 'Order fulfilment', text: 'Getting the goods out of the shop and to the customer.', cases: ['Delivery paper made', 'Stock taken out (goods issue)', 'Goods moved (transfer) or carried (shipment)'] }],
  ['Billing', 1390, { title: 'Billing', text: 'Asking for the money and updating the accounts.', cases: ['The bill (invoice) is made', 'What the customer owes goes up', 'The stock value is updated'] }],
];
const node = (k: string) => {
  const [t, x, y, w, f] = CH[k];
  return info(CTIP[k], rect(x - w / 2, y - 36, w, 72, { fill: f, w: 4 }), text(x, y + 11, t, { size: 30, anchor: 'middle' }));
};
const right = (k: string): [number, number] => [CH[k][1] + CH[k][3] / 2, CH[k][2]];
const left = (k: string): [number, number] => [CH[k][1] - CH[k][3] / 2, CH[k][2]];
const link = (a: string, b: string) => arrow([right(a), left(b)], { w: 5 });
const DIV = [560, 770, 1190];

const chain = board('chain', 'The sales chain', 'Book p.5', (st) => {
  st(
    'Now: how the papers LINK to each other. This is the whole sales chain from page 5, in four parts. Point at any box to see what it means.',
    title('The sales chain', 'Book p.5'),
    ...COLS.map(([name, x, t]) => info(t, text(x, 200, name, { size: 40, anchor: 'middle' }))),
    ...DIV.map((x) =>
      dashed(
        [
          [x, 170],
          [x, 760],
        ],
        { color: '#5f6b7a', w: 4 },
      ),
    ),
  );
  st(
    'Before any order: a contact, an inquiry and a quotation — or a contract, or a scheduling agreement.',
    node('contact'),
    node('inquiry'),
    node('quotation'),
    node('contract'),
    node('sched'),
    link('contact', 'inquiry'),
    link('inquiry', 'quotation'),
  );
  st('Everything flows into the Sales Order.', node('so'), link('quotation', 'so'), link('contract', 'so'), link('sched', 'so'));
  st(
    'Then fulfilment: the delivery, the goods issue, a transfer order and the shipment.',
    node('delivery'),
    link('so', 'delivery'),
    node('goods'),
    node('transfer'),
    node('ship'),
    link('delivery', 'goods'),
    link('delivery', 'transfer'),
    link('delivery', 'ship'),
  );
  st(
    'Finally billing: the invoice updates the stock account and what the customer owes us (accounts receivable).',
    node('invoice'),
    arrow(
      [
        [875, 496],
        [1090, 950],
        [1300, 496],
      ],
      { w: 5 },
    ),
    node('stock'),
    node('ar'),
    link('goods', 'stock'),
    link('invoice', 'ar'),
  );
  st(
    'These links are stored separately, so when things happen out of order, the chain bends but never breaks.',
    info(
      { title: 'Links bend — they never break', text: 'Every link is stored on its own. Steps can come late or out of order, and nothing breaks.', cases: ['Bill made before the delivery? OK', 'A step skipped? OK', 'Link fixed later? OK'] },
      hl(470, 795, 660, 66, F.yellow),
      text(800, 842, 'Links bend — they never break', { size: 46, anchor: 'middle' }),
    ),
  );
});
chain.hover = true;

/* =========================================================== RULE CARDS: a drawing + the plain meaning */
/** the "in simple words" box at the bottom of a rule card */
const meaning = (x: number, y: number, w: number, lines: string[], size = 30, gap = 44): Item[] => [
  ...rect(x, y, w, lines.length * gap + 22, { fill: '#fff9db', w: 3 }),
  ...lines.flatMap((l, i) => text(x + 18, y + 10 + size + i * gap, l, { size })),
];

/* =========================================================== 6 · RULES 1–4 (p.5) */
const rules1 = board('rules1', 'Linking rules 1–4', 'Book p.5', (st) => {
  st('FactsERP links papers as a separate step, so a busy shop never has to stop. Here are the reasons — each card says it in simple words.', title('Why link separately? (1 – 4)', 'Book p.5'));
  st(
    'Rule 1 — The bag arrives while you are busy cooking. Save the delivery now, link it to the order later.',
    panel(60, 140, 720, 350),
    text(85, 195, '1. Works without a link', { size: 40, color: R }),
    house(150, 360, 0.5),
    bag(255, 360, 0.45),
    chip(340, 220, 410, 64, 'GRN', 'saved ✓', F.green, 34),
    dashed(
      [
        [545, 286],
        [545, 300],
      ],
      { color: O, w: 5, dash: 6, gap: 6 },
    ),
    rect(340, 300, 410, 64, { fill: F.white }),
    text(545, 344, 'PO · link later', { size: 34, color: O, anchor: 'middle' }),
    meaning(75, 378, 690, ['Busy? Save the delivery (GRN) now,', 'and link it to the order (PO) later.']),
  );
  st(
    'Rule 2 — Linking can wait, but the stock check cannot. You can’t sell rice you don’t have.',
    panel(820, 140, 720, 350),
    text(845, 195, '2. Link later, check stock now', { size: 40, color: R }),
    rect(860, 222, 200, 110, { fill: F.white }),
    line(860, 259, 1060, 259, { w: 4 }),
    line(860, 296, 1060, 296, { w: 4 }),
    text(960, 366, 'shelf: 0 kg', { size: 30, color: R, anchor: 'middle' }),
    text(1110, 262, 'Sell 5 kg?', { size: 38 }),
    cross(1150, 322, 26),
    text(1200, 338, 'BLOCKED', { size: 40, color: R }),
    meaning(835, 378, 690, ['Linking can wait — the stock check cannot.', 'No rice on the shelf? You can’t sell it.']),
  );
  st(
    'Rule 3 — Two orders and two deliveries can be linked in any mix.',
    panel(60, 520, 720, 350),
    text(85, 575, '3. Many-to-many', { size: 40, color: R }),
    chip(100, 600, 200, 64, 'PO 1', '', F.orange, 36),
    chip(100, 685, 200, 64, 'PO 2', '', F.orange, 36),
    chip(520, 600, 220, 64, 'GRN 1', '', F.green, 36),
    chip(520, 685, 220, 64, 'GRN 2', '', F.green, 36),
    arrow([
      [305, 627],
      [512, 627],
    ]),
    arrow([
      [305, 637],
      [512, 712],
    ]),
    arrow([
      [305, 712],
      [512, 637],
    ]),
    arrow([
      [305, 722],
      [512, 722],
    ]),
    meaning(75, 758, 690, ['Any order can link to any delivery —', 'in any mix (Cardinality M : N, later).']),
  );
  st(
    'Rule 4 — Linked the wrong delivery? Just reset the link. The bill itself is never changed.',
    panel(820, 520, 720, 350),
    text(845, 575, '4. Reset anytime', { size: 40, color: R }),
    chip(860, 640, 200, 72, 'PI', 'bill', F.orange, 38),
    chip(1290, 600, 220, 64, 'GRN', 'Mon', F.green, 34),
    chip(1290, 685, 220, 64, 'GRN', 'Tue', F.green, 34),
    line(1065, 690, 1282, 717, { color: R, w: 6 }),
    cross(1173, 703, 20),
    arrow(
      [
        [1065, 660],
        [1282, 632],
      ],
      { color: G, w: 7 },
    ),
    meaning(835, 758, 690, ['Linked the wrong delivery? Reset the link.', 'The bill itself is never changed.']),
  );
});

/* =========================================================== 7 · RULES 5–7 (p.5) */
const rules2 = board('rules2', 'Linking rules 5–7', 'Book p.5', (st) => {
  st('Three more reasons from page 5 — each card says it in simple words.', title('Why link separately? (5 – 7)', 'Book p.5'));
  st(
    'Rule 5 — FactsERP links papers by itself when the party and the item match. You can also lock a link so it never moves.',
    panel(50, 140, 480, 730),
    text(70, 195, '5. Auto-link + lock', { size: 40, color: R }),
    rect(75, 225, 200, 170, { fill: F.green }),
    text(175, 272, 'GRN', { size: 42, anchor: 'middle' }),
    text(175, 322, 'FreshMart', { size: 30, anchor: 'middle' }),
    text(175, 367, '5 kg rice', { size: 30, anchor: 'middle' }),
    rect(305, 225, 200, 170, { fill: F.orange }),
    text(405, 272, 'PI', { size: 42, anchor: 'middle' }),
    text(405, 322, 'FreshMart', { size: 30, anchor: 'middle' }),
    text(405, 367, '5 kg rice', { size: 30, anchor: 'middle' }),
    text(290, 450, 'match → auto-link ✓', { size: 34, color: G, anchor: 'middle' }),
    lock(140, 540, 0.85),
    text(200, 548, 'locked link =', { size: 32 }),
    text(200, 592, 'never moved', { size: 32 }),
    meaning(65, 640, 450, ['Same shop + same item?', 'FactsERP links the papers', 'by itself — no typing.', 'A locked link never moves.']),
  );
  st(
    'Rule 6 — You ordered 5 kg but only 3 kg came. The system warns you at once.',
    panel(560, 140, 480, 730),
    text(580, 195, '6. Exceptions flagged', { size: 40, color: R }),
    text(600, 275, 'Ordered: 5 kg', { size: 40 }),
    text(600, 335, 'Received: 3 kg', { size: 40 }),
    poly(
      [
        [800, 375],
        [880, 515],
        [720, 515],
      ],
      { fill: F.yellow, w: 6 },
    ),
    text(800, 500, '!', { size: 72, anchor: 'middle' }),
    text(800, 590, '2 kg short!', { size: 48, color: R, anchor: 'middle' }),
    meaning(575, 640, 450, ['Ordered 5 kg, got only 3?', 'FactsERP warns you at', 'once — so the mistake is', 'caught before you pay.']),
  );
  st(
    'Rule 7 — The sugar never comes. Force-close the order so it doesn’t stay open forever.',
    panel(1070, 140, 480, 730),
    text(1090, 195, '7. Easy force close', { size: 40, color: R }),
    text(1110, 275, 'Order #12', { size: 40, color: B }),
    text(1110, 335, '5 kg rice ✓', { size: 38, color: G }),
    text(1110, 395, '2 kg sugar …', { size: 38 }),
    line(1100, 383, 1420, 383, { color: R, w: 6 }),
    rect(1120, 430, 380, 100, { color: R, w: 7, fill: '#ffe3e3' }),
    text(1310, 500, 'CLOSED', { size: 60, color: R, anchor: 'middle' }),
    text(1310, 590, 'linked to itself', { size: 32, anchor: 'middle' }),
    meaning(1085, 640, 450, ['The sugar will never come?', 'Force-close the order.', 'It stops waiting, and the', 'open-order list stays clean.']),
  );
});

/* =========================================================== 8 · RECIPROCAL PAPERS (p.6) */
const TW = 210;
const twX = (i: number) => 80 + i * 250;
const BUY: [string, string, string, string][] = [
  ['PR', 'need', 'Purchase Requisition', 'Home notes: we need 5 kg rice.'],
  ['PQ', 'price', 'Purchase Quotation', 'Home notes the price the shop gave.'],
  ['PO', 'order', 'Purchase Order', 'Home orders the bag.'],
  ['GRN', 'receive', 'Goods Receipt Note', 'Home records the bag arriving.'],
  ['PI', 'bill', 'Purchase Invoice', 'Home records the shop’s bill.'],
  ['PV', 'pay', 'Payment Voucher', 'Home records paying ₹350.'],
];
const SELL: [string, string, string, string][] = [
  ['SE', 'ask', 'Sales Enquiry', 'The customer asks: do you have rice?'],
  ['SQ', 'quote', 'Sales Quotation', 'The shop gives a price: ₹350.'],
  ['SO', 'order', 'Sales Order', 'The shop confirms the order.'],
  ['DO', 'deliver', 'Delivery Order', 'The bag leaves the shop.'],
  ['SI', 'bill', 'Sales Invoice', 'The shop’s bill: ₹350.'],
  ['RV', 'collect', 'Receipt Voucher', 'The shop records the money received.'],
];
const twins = board('twins', 'Reciprocal papers', 'Book p.6', (st) => {
  st('Now put both cycles side by side. When the home BUYS, the grocery SELLS — every paper has a reciprocal paper.', title('Two sides — reciprocal papers', 'Book p.6'));
  st(
    'At HOME we write: Requisition, Quotation, Order, Goods Receipt, Invoice, Payment.',
    tip('The purchase cycle', 'The six papers the buyer (your home) writes, in order.', text(80, 205, 'HOME buys:', { size: 46, color: O })),
    ...BUY.map(([c, n, full, why], i) => tip(`${c} · ${full}`, why, doc(twX(i), 235, TW, 120, c, n, F.orange))),
    ...[0, 1, 2, 3, 4].map((i) =>
      arrow(
        [
          [twX(i) + TW + 4, 295],
          [twX(i + 1) - 4, 295],
        ],
        { w: 4 },
      ),
    ),
  );
  st(
    'At the GROCERY they write the reciprocal of each: Enquiry, Quotation, Order, Delivery, Invoice, Receipt.',
    tip('The sales cycle', 'The six papers the seller (the grocery) writes, in order.', text(80, 575, 'GROCERY sells:', { size: 46, color: B })),
    ...SELL.map(([c, n, full, why], i) => tip(`${c} · ${full}`, why, doc(twX(i), 605, TW, 120, c, n, F.blue))),
    ...[0, 1, 2, 3, 4].map((i) =>
      arrow(
        [
          [twX(i) + TW + 4, 665],
          [twX(i + 1) - 4, 665],
        ],
        { w: 4 },
      ),
    ),
  );
  st(
    'Every paper at home has a RECIPROCAL paper at the shop: the same event, seen from the other side. PO ↔ SO, GRN ↔ DO, PI ↔ SI, PV ↔ RV.',
    ...[0, 1, 2, 3, 4, 5].map((i) =>
      dashed(
        [
          [twX(i) + TW / 2, 362],
          [twX(i) + TW / 2, 528],
        ],
        { color: G, w: 5, dash: 12, gap: 10 },
      ),
    ),
    tip('Reciprocal', 'Each home paper has a matching grocery paper for the same event — e.g. PO (home orders) ↔ SO (shop confirms).', hl(705, 440, 210, 60, F.green), text(810, 482, 'reciprocal', { size: 38, anchor: 'middle' })),
  );
  st(
    'Real life: the order can change, a step can be skipped, and one order can come in many deliveries.',
    tip('Real life', 'The sequence can change per company, some steps may be missing (a DO is not needed for an SI), and there can be multiple deliveries.', text(80, 800, 'Order can change · steps can be skipped · many deliveries', { size: 38, color: R })),
  );
});

/* =========================================================== 9 · RULES 8–10 (p.6) */
const rules3 = board('rules3', 'Rules 8–10', 'Book p.6', (st) => {
  st('Three more rules from page 6 — each card says it in simple words.', title('Rules 8 – 10', 'Book p.6'));
  st(
    'Rule 8 — A walk-in customer pays cash and takes the bag at once, so we skip the DO. Allowed — but not recommended.',
    panel(50, 140, 480, 730),
    text(70, 195, '8. Skipping a step', { size: 40, color: R }),
    text(290, 335, 'walk-in, cash', { size: 34, anchor: 'middle' }),
    arrow(
      [
        [135, 432],
        [290, 290],
        [445, 432],
      ],
      { color: G, w: 7 },
    ),
    chip(70, 440, 130, 76, 'SO', '', F.blue, 40),
    chip(225, 440, 130, 76, 'DO', '', F.grey, 40),
    chip(380, 440, 130, 76, 'SI', '', F.blue, 40),
    cross(290, 478, 30),
    text(290, 590, 'allowed — not recommended', { size: 30, color: R, anchor: 'middle' }),
    meaning(65, 640, 450, ['Cash customer takes the bag', 'right away? Skip the DO and', 'go straight SO → SI.', 'Allowed, but not the best.']),
  );
  st(
    'Rule 9 — Extra charges, like a ₹20 rickshaw fare, are linked to the bill. Now we know the TRUE cost: ₹370.',
    panel(560, 140, 480, 730),
    text(580, 195, '9. True (landed) cost', { size: 40, color: R }),
    text(600, 275, 'Rice bill', { size: 38 }),
    text(1010, 275, '₹350', { size: 38, anchor: 'end' }),
    text(600, 340, '+ rickshaw', { size: 38, color: O }),
    text(1010, 340, '₹20', { size: 38, color: O, anchor: 'end' }),
    line(600, 366, 1010, 366, { w: 5 }),
    hl(590, 386, 430, 66, F.green),
    text(600, 432, 'true cost', { size: 40 }),
    text(1010, 432, '₹370', { size: 44, anchor: 'end' }),
    bag(800, 615, 0.75),
    meaning(575, 640, 450, ['Extra costs, like the', 'rickshaw fare, are linked', 'to the bill. Now we know', 'the TRUE cost: ₹370.']),
  );
  st(
    'Rule 10 — A cost can still be corrected (like an exchange gain) — but ONLY while the month is still open.',
    panel(1070, 140, 480, 730),
    text(1090, 195, '10. Fix cost while open', { size: 40, color: R }),
    rect(1170, 225, 280, 190, { fill: F.white }),
    rect(1170, 225, 280, 60, { fill: R }),
    text(1310, 268, 'NOVEMBER', { size: 34, color: '#ffffff', anchor: 'middle' }),
    text(1310, 375, 'OPEN', { size: 58, color: G, anchor: 'middle' }),
    text(1310, 470, '−₹5 adjustment ✓', { size: 34, anchor: 'middle' }),
    lock(1150, 540, 0.7),
    text(1200, 582, 'closed = no change', { size: 30 }),
    meaning(1085, 640, 450, ['A cost can still be fixed', '(like a ₹5 exchange gain)', 'only while the month is', 'OPEN. Closed = locked.']),
  );
});

/* =========================================================== 10 · ONE-TO-ONE TAG (p.6) */
const tag = board('tag', 'Cardinality 1 : 1 (One-to-One)', 'Book p.6', (st) => {
  st('CARDINALITY means: how many papers on one side link to how many on the other. There are 4 kinds: 1 : 1, 1 : N, N : 1 and M : N. First, One-to-One (1 : 1): one delivery becomes exactly one bill. But how does the bill remember its delivery?', title('Cardinality 1 : 1 — One-to-One', 'Book p.6'), text(1530, 170, 'Cardinality = how many papers link to how many papers', { size: 30, color: B, anchor: 'end' }));
  st(
    'One delivery arrives: Goods Receipt Note number 1.',
    tip('GRN 1 · Goods Receipt Note', 'Records one delivery: 1 bag of 5 kg rice arrived.', rect(90, 200, 420, 230, { fill: F.green }), text(120, 275, 'GRN 1', { size: 56 }), text(120, 345, 'delivery', { size: 38 }), text(120, 400, '1 bag · 5 kg rice', { size: 36 })),
  );
  st(
    'One bill matches it: Purchase Invoice number 1. One to one.',
    tip('PI 1 · Purchase Invoice', 'The bill for that delivery: ₹350.', rect(1090, 200, 420, 230, { fill: F.orange }), text(1120, 275, 'PI 1', { size: 56 }), text(1120, 345, 'bill', { size: 38 }), text(1120, 400, '5 kg rice · ₹350', { size: 36 })),
    tip(
      'One-to-one',
      'One GRN becomes exactly one PI.',
      arrow(
        [
          [520, 315],
          [1080, 315],
        ],
        { color: G, w: 8 },
      ),
      hl(735, 245, 130, 56, F.green),
      text(800, 288, '1 : 1', { size: 46, anchor: 'middle' }),
    ),
  );
  st(
    'The bill carries a little TAG in the PURCHASE_DETAILS table: the year, type, number and line of its delivery.',
    tip(
      'PURCHASE_DETAILS',
      'The table that stores each bill line. Its four PURDET_PREVIOUS_ fields point to the delivery line: financial year, document type, number and line number.',
      line(1300, 432, 1240, 500, { w: 4 }),
      luggage(840, 500, 700, 360),
      text(900, 560, 'PURCHASE_DETAILS', { size: 40, color: R }),
      text(900, 625, 'PURDET_PREVIOUS_FYCODE → 2026', { size: 32 }),
      text(900, 685, 'PURDET_PREVIOUS_DOCTYPE → GRN', { size: 32 }),
      text(900, 745, 'PURDET_PREVIOUS_DOCNO → 001', { size: 32 }),
      text(900, 805, 'PURDET_PREVIOUS_DOCSRNO → 01', { size: 32 }),
    ),
  );
  st(
    'So from any bill you can always find the exact delivery it belongs to.',
    tip(
      'Points back',
      'Because of the tag, every bill line can be traced back to its delivery line.',
      arrow(
        [
          [830, 690],
          [520, 640],
          [300, 440],
        ],
        { color: R, w: 7 },
      ),
      text(90, 640, 'points back', { size: 42, color: R }),
      text(90, 695, 'to GRN 1', { size: 42, color: R }),
    ),
  );
});

/* =========================================================== 11a · ONE-TO-MANY (p.7) */
const one2many = board('one2many', 'Cardinality 1 : N (One-to-Many)', 'Book p.7', (st) => {
  st('Cardinality One-to-Many (1 : N): ONE delivery is split into MANY bills.', title('Cardinality 1 : N — One-to-Many', 'Book p.7'));
  st(
    'One box arrives with rice AND sugar. That is one delivery: GRN 1.',
    rect(70, 250, 300, 220, { fill: F.green }),
    text(220, 325, 'GRN 1', { size: 52, anchor: 'middle' }),
    text(220, 380, '1 box:', { size: 32, anchor: 'middle' }),
    text(220, 425, 'rice + sugar', { size: 32, anchor: 'middle' }),
  );
  st(
    'But the shop sends TWO bills: one for the rice, one for the sugar.',
    rect(520, 180, 300, 150, { fill: F.orange }),
    text(670, 245, 'PI 1', { size: 46, anchor: 'middle' }),
    text(670, 295, 'rice ₹400', { size: 32, anchor: 'middle' }),
    rect(520, 400, 300, 150, { fill: F.orange }),
    text(670, 465, 'PI 2', { size: 46, anchor: 'middle' }),
    text(670, 515, 'sugar ₹50', { size: 32, anchor: 'middle' }),
    arrow([[375, 330], [512, 260]], { w: 6 }),
    arrow([[375, 400], [512, 470]], { w: 6 }),
  );
  st(
    'How is it linked? Each bill line carries a tag pointing back to the SAME delivery, GRN 1.',
    rect(900, 180, 640, 400, { fill: F.paper }),
    text(930, 240, 'How it is linked:', { size: 36, color: B }),
    text(930, 310, '• PI 1, rice line →', { size: 32 }),
    text(980, 355, 'tag: GRN 1, line 1', { size: 32, color: G }),
    text(930, 425, '• PI 2, sugar line →', { size: 32 }),
    text(980, 470, 'tag: GRN 1, line 2', { size: 32, color: G }),
    text(930, 540, '• Both bills → the same GRN', { size: 32 }),
  );
  st(
    'Remember: ONE delivery can be billed in MANY parts. Every part still points back to it.',
    hl(300, 650, 1000, 80, F.yellow),
    text(800, 706, 'ONE delivery → MANY bills', { size: 46, anchor: 'middle' }),
  );
});

/* =========================================================== 11b · MANY-TO-ONE (p.7) */
const many2one = board('many2one', 'Cardinality N : 1 (Many-to-One)', 'Book p.7', (st) => {
  st('Cardinality Many-to-One (N : 1): MANY deliveries are put into ONE bill.', title('Cardinality N : 1 — Many-to-One', 'Book p.7'));
  st(
    'The shop delivers rice twice: on Monday (GRN 1) and on Thursday (GRN 2).',
    rect(70, 180, 300, 150, { fill: F.green }),
    text(220, 245, 'GRN 1', { size: 46, anchor: 'middle' }),
    text(220, 295, 'Monday · ₹350', { size: 30, anchor: 'middle' }),
    rect(70, 400, 300, 150, { fill: F.green }),
    text(220, 465, 'GRN 2', { size: 46, anchor: 'middle' }),
    text(220, 515, 'Thursday · ₹350', { size: 30, anchor: 'middle' }),
  );
  st(
    'On Sunday it sends ONE weekly bill for both: ₹700.',
    rect(520, 250, 300, 220, { fill: F.orange }),
    text(670, 325, 'PI', { size: 52, anchor: 'middle' }),
    text(670, 380, 'Sunday', { size: 32, anchor: 'middle' }),
    text(670, 425, 'weekly ₹700', { size: 32, anchor: 'middle' }),
    arrow([[375, 260], [512, 330]], { w: 6 }),
    arrow([[375, 470], [512, 400]], { w: 6 }),
  );
  st(
    'How is it linked? The weekly bill has one line per delivery, and each line has its own tag.',
    rect(900, 180, 640, 400, { fill: F.paper }),
    text(930, 240, 'How it is linked:', { size: 36, color: B }),
    text(930, 310, '• Bill line 1 (Monday) →', { size: 32 }),
    text(980, 355, 'tag: GRN 1', { size: 32, color: G }),
    text(930, 425, '• Bill line 2 (Thursday) →', { size: 32 }),
    text(980, 470, 'tag: GRN 2', { size: 32, color: G }),
    text(930, 540, '• One bill, two tags', { size: 32 }),
  );
  st(
    'Remember: MANY deliveries can go into ONE bill. Each line still points to its own delivery.',
    hl(300, 650, 1000, 80, F.yellow),
    text(800, 706, 'MANY deliveries → ONE bill', { size: 46, anchor: 'middle' }),
  );
});

/* =========================================================== 12 · MANY-TO-MANY (p.8) */
const many = board('many', 'Cardinality M : N (Many-to-Many)', 'Book p.8', (st) => {
  st('Cardinality Many-to-Many (M : N), also called Cartesian: many deliveries and many bills, all linked to each other.', title('Cardinality M : N — Many-to-Many (Cartesian)', undefined, 70, 92, 1290));
  st(
    'Two deliveries of 10 bags each on the left. Two bills of 10 bags each on the right.',
    chip(120, 170, 380, 100, 'GRN 1 · 10 bags', '', F.green, 40),
    chip(120, 390, 380, 100, 'GRN 2 · 10 bags', '', F.green, 40),
    chip(1100, 170, 380, 100, 'PI 1 · 10 bags', '', F.orange, 40),
    chip(1100, 390, 380, 100, 'PI 2 · 10 bags', '', F.orange, 40),
  );
  st(
    'Each bill takes 5 bags from EACH delivery — so the links criss-cross.',
    arrow([[505, 220], [1092, 220]], { color: B }),
    arrow([[505, 235], [1092, 425]], { color: B }),
    arrow([[505, 425], [1092, 235]], { color: B }),
    arrow([[505, 440], [1092, 440]], { color: B }),
  );
  st(
    'Why “Cartesian”? Every delivery is paired with every bill: 2 deliveries × 2 bills = 4 links.',
    text(800, 572, 'Cartesian: 2 deliveries × 2 bills = 4 links', { size: 40, color: P, anchor: 'middle' }),
  );
  const CX = [420, 670, 920];
  st(
    'The grid shows all 4 links: each cell is one link, with how many bags it carries.',
    rect(420, 600, 250, 60, { fill: F.white, w: 3 }),
    rect(670, 600, 250, 60, { fill: F.orange, w: 3 }),
    rect(920, 600, 250, 60, { fill: F.orange, w: 3 }),
    text(795, 642, 'PI 1', { size: 32, anchor: 'middle' }),
    text(1045, 642, 'PI 2', { size: 32, anchor: 'middle' }),
    [0, 1].flatMap((r) => {
      const y = 660 + r * 60;
      return [
        ...rect(CX[0], y, 250, 60, { fill: F.green, w: 3 }),
        ...text(CX[0] + 125, y + 42, `GRN ${r + 1}`, { size: 32, anchor: 'middle' }),
        ...rect(CX[1], y, 250, 60, { fill: F.white, w: 3 }),
        ...text(CX[1] + 125, y + 42, '5 bags', { size: 32, anchor: 'middle' }),
        ...rect(CX[2], y, 250, 60, { fill: F.white, w: 3 }),
        ...text(CX[2] + 125, y + 42, '5 bags', { size: 32, anchor: 'middle' }),
      ];
    }),
  );
  st('Push or pull — every document needs to be linked!', hl(1200, 640, 340, 140, F.yellow), text(1370, 700, 'Every link', { size: 36, anchor: 'middle' }), text(1370, 750, 'is recorded!', { size: 36, anchor: 'middle' }));
});

/* =========================================================== 13 · FULL CYCLE (p.9) */
const S6: [string, string, 'L' | 'R', string, string, string][] = [
  ['PR', 'Need rice', 'L', 'jar is empty!', 'The rice jar is empty, so the home writes a Purchase Requisition.', 'Purchase Requisition'],
  ['SE', 'Rice?', 'R', '“do you have rice?”', 'You ask the shop: do you have 5 kg rice? That is the Sales Enquiry.', 'Sales Enquiry'],
  ['SQ', '5 kg = ₹350', 'R', '“₹350”', 'The shop answers with a Sales Quotation: ₹350.', 'Sales Quotation'],
  ['PQ', 'Price noted', 'L', 'noted ✓', 'At home you note that price as your Purchase Quotation.', 'Purchase Quotation'],
  ['PO', 'Send one bag', 'L', '“yes please!”', 'You say yes: the home sends a Purchase Order.', 'Purchase Order'],
  ['SO', 'Confirmed', 'R', '“OK!”', 'The shop turns it into its Sales Order.', 'Sales Order'],
  ['DO', 'Bag leaves', 'R', 'on its way', 'The delivery boy leaves with the bag: the Delivery Order.', 'Delivery Order'],
  ['GRN', 'Bag arrives', 'L', 'arrived ✓', 'The SAME bag arrives at your door: the Goods Receipt Note.', 'Goods Receipt Note'],
  ['SI', 'Bill ₹350', 'R', '“₹350 please”', 'The shop writes its Sales Invoice for ₹350.', 'Sales Invoice'],
  ['PI', 'Same bill', 'L', 'paid ✓', 'At home the same bill is your Purchase Invoice. Both books match.', 'Purchase Invoice'],
];
const NY = (i: number) => 196 + i * 67;
const NLX = 430;
const NRX = 830;
const NW = 340;
const cycle = board('cycle', 'The full cycle', 'Book p.9', (st) => {
  st(
    'Page 9: let’s follow the bag through all ten papers. Home on the left, the grocery on the right.',
    title('The full cycle — 10 papers', 'Book p.9'),
    tip('The green line', 'Left of the line: papers written at home (buying). Right: papers written at the grocery (selling).', line(800, 140, 800, 880, { color: G, w: 8 })),
    text(600, 170, 'HOME', { size: 42, color: O, anchor: 'middle' }),
    text(1000, 170, 'GROCERY', { size: 42, color: B, anchor: 'middle' }),
  );
  S6.forEach(([code, name, side, note, say, full], i) => {
    const x = side === 'L' ? NLX : NRX;
    const y = NY(i);
    const prev = S6[i - 1];
    const g: Item[][] = [tip(`${i + 1}. ${code} · ${full}`, say, chip(x, y, NW, 56, `${i + 1}. ${code}`, name, side === 'L' ? F.orange : F.blue, 30))];
    if (prev) {
      const py = NY(i - 1) + 28;
      if (prev[2] !== side) {
        const a = arrow([prev[2] === 'L' ? [NLX + NW + 2, py] : [NRX - 2, py], side === 'L' ? [NLX + NW + 6, y + 28] : [NRX - 6, y + 28]], { color: code === 'GRN' ? G : K, w: code === 'GRN' ? 7 : 4, dash: code === 'GRN' });
        g.push(code === 'GRN' ? tip('DO ⇢ GRN · the same bag', 'The bag the grocery sends (Delivery Order) is the bag your home receives (Goods Receipt Note).', a) : a);
      } else {
        const ex = side === 'L' ? NLX - 4 : NRX + NW + 4;
        const bx = side === 'L' ? NLX - 40 : NRX + NW + 40;
        g.push(
          arrow(
            [
              [ex, py],
              [bx, (py + y + 28) / 2],
              [ex, y + 28],
            ],
            { w: 4 },
          ),
        );
      }
    }
    g.push(text(side === 'L' ? 380 : 1220, y + 40, note, { size: 30, color: side === 'L' ? O : B, anchor: side === 'L' ? 'end' : 'start' }));
    st(say, ...g);
  });
  st(
    'The grocery records ₹350 sold. The home records ₹350 bought. Same bill, both books match!',
    tip('Both books match', 'The grocery’s Sales Invoice (₹350) and the home’s Purchase Invoice (₹350) are the same bill seen from two sides.', hl(1196, 806, 364, 62, F.green), text(1540, 852, '₹350 = ₹350 ✓', { size: 46, anchor: 'end' })),
  );
});

/* =========================================================== 14 · RECAP */
const RECAP: [string, string][] = [
  ['One form, many papers — papers copy each other', 'Boards 2–3 · Source Document vs Document (p.4) and inheritance (p.5).'],
  ['Purchase cycle: PR → PQ → PO → GRN → PI → PV', 'Boards 4–10 · The buying story and the purchase cycle: the 6 papers the home (buyer) writes.'],
  ['Sales cycle: SE → SQ → SO → DO → SI → RV', 'Boards 11–17 · The selling story and the sales cycle: the 6 papers the grocery (seller) writes.'],
  ['Every home paper has a reciprocal grocery paper', 'Boards 18–19 · Reciprocal papers and the full cycle: both books match.'],
  ['Link later, but check stock now', 'Boards 20–27 · The sales chain, the linking rules and cardinality (p.5–8).'],
];
const recap = board('recap', 'Remember', 'Summary', (st) => {
  st('Five things to remember from this topic.', title('Remember', 'Summary', 70, 92, 330));
  RECAP.forEach(([r, where], i) => st(r + '.', tip(r, where, tick(100, 225 + i * 115, 1.1), text(180, 240 + i * 115, `${i + 1}. ${r}`, { size: 46 }))));
  st('Thank you! Any questions?', bag(1370, 870, 1.2), hl(560, 800, 520, 76, F.yellow), text(820, 860, 'Thank you!', { size: 72, color: R, anchor: 'middle' }));
});

const { BUY_STORY, SELL_STORY, BUY_CYCLE, SELL_CYCLE } = CYCLE_BOARDS;
const ERP_BOARDS: Board[] = [cover, mould, copy, ...BUY_STORY, BUY_CYCLE, ...SELL_STORY, SELL_CYCLE, twins, cycle, chain, rules1, rules2, rules3, tag, one2many, many2one, many, recap].map((x) => ({ ...x, topic: 2 }));

/** the two separate topics of the seminar */
export const TOPICS = [
  { n: 1, name: 'Ignorance of the Law' },
  { n: 2, name: 'Business Process' },
];
export const BOARDS: Board[] = [...LAW_BOARDS, ...ERP_BOARDS];
