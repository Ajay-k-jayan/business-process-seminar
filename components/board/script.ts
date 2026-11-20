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
  ship: ['Shipment', 1075, 620, 180, F.orange],
  invoice: ['Invoice', 1300, 460, 150, F.green],
  stock: ['Stock a/c', 1480, 300, 160, F.yellow],
  ar: ['Receivable', 1480, 460, 160, F.yellow],
};
const CTIP: Record<string, [string, string]> = {
  contract: ['Contract', 'A long-term deal agreed before orders come in.'],
  contact: ['Contact', 'The first touch with a customer.'],
  inquiry: ['Inquiry', 'The customer asks: “do you have rice?”'],
  quotation: ['Quotation', 'The shop offers a price.'],
  sched: ['Scheduling agreement', 'An agreement to deliver regularly on fixed dates.'],
  so: ['Sales order', 'The confirmed order. Everything before feeds it; everything after follows it.'],
  delivery: ['Delivery', 'The goods leave for the customer.'],
  goods: ['Goods issue', 'Stock goes out of the store — it updates the stock account.'],
  transfer: ['Transfer order', 'Moves goods between stores or locations.'],
  ship: ['Shipment', 'The goods are transported to the customer.'],
  invoice: ['Invoice', 'The bill to the customer.'],
  stock: ['Stock account', 'The accounting record of how much stock is worth.'],
  ar: ['Accounts receivable', 'What customers still owe the shop.'],
};
const node = (k: string) => {
  const [t, x, y, w, f] = CH[k];
  return tip(CTIP[k][0], CTIP[k][1], rect(x - w / 2, y - 36, w, 72, { fill: f, w: 4 }), text(x, y + 11, t, { size: 30, anchor: 'middle' }));
};
const right = (k: string): [number, number] => [CH[k][1] + CH[k][3] / 2, CH[k][2]];
const left = (k: string): [number, number] => [CH[k][1] - CH[k][3] / 2, CH[k][2]];
const link = (a: string, b: string) => arrow([right(a), left(b)], { w: 5 });

const chain = board('chain', 'The sales chain', 'Book p.5', (st) => {
  st(
    'Now: how the papers LINK to each other. This is the whole sales chain from page 5, in four parts.',
    title('The sales chain', 'Book p.5'),
    tip('Pre-sales', 'Getting in touch and giving a price, before any order exists.', text(270, 200, 'Pre-sales', { size: 40, anchor: 'middle' })),
    tip('Order processing', 'The order is confirmed.', text(665, 200, 'Order', { size: 40, anchor: 'middle' })),
    tip('Order fulfilment', 'Moving the goods to the customer.', text(975, 200, 'Fulfilment', { size: 40, anchor: 'middle' })),
    tip('Billing', 'Billing the customer and updating the accounts.', text(1390, 200, 'Billing', { size: 40, anchor: 'middle' })),
    dashed(
      [
        [560, 170],
        [560, 850],
      ],
      { color: '#5f6b7a', w: 4 },
    ),
    dashed(
      [
        [770, 170],
        [770, 850],
      ],
      { color: '#5f6b7a', w: 4 },
    ),
    dashed(
      [
        [1190, 170],
        [1190, 850],
      ],
      { color: '#5f6b7a', w: 4 },
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
        [1090, 880],
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
    tip('Separate links', 'Each link is stored on its own, so a step can happen late or out of order without breaking anything.', hl(470, 795, 660, 66, F.yellow), text(800, 842, 'Links bend — they never break', { size: 46, anchor: 'middle' })),
  );
});

/* =========================================================== 6 · RULES 1–4 (p.5) */
const rules1 = board('rules1', 'Linking rules 1–4', 'Book p.5', (st) => {
  st('FactsERP links papers as a separate step, so a busy shop never has to stop. Here are the 7 reasons.', title('Why link separately? (1 – 4)', 'Book p.5'));
  st(
    'Rule 1 — The bag arrives while you are busy cooking. Save the delivery now, link it to the order later.',
    tip(
      'Rule 1 · Works without a link',
      'Linking never blocks normal data entry. The program works without the link; you can link later.',
      panel(60, 140, 720, 350),
      text(85, 195, '1. Works without a link', { size: 40, color: R }),
      house(170, 440, 0.55),
      bag(285, 440, 0.5),
      chip(360, 235, 390, 76, 'GRN', 'saved ✓', F.green, 36),
      rect(360, 345, 390, 76, { fill: F.white }),
      text(555, 395, 'PO · link later', { size: 36, color: O, anchor: 'middle' }),
      dashed(
        [
          [555, 311],
          [555, 345],
        ],
        { color: O, w: 5, dash: 8, gap: 8 },
      ),
    ),
  );
  st(
    'Rule 2 — Linking can wait, but the stock check cannot. You can’t sell rice you don’t have.',
    tip(
      'Rule 2 · Regularise later, check stock now',
      'Links can be fixed later, but enough data is captured at once — and the negative-stock check happens immediately.',
      panel(820, 140, 720, 350),
      text(845, 195, '2. Link later, check stock now', { size: 40, color: R }),
      rect(860, 240, 240, 170, { fill: F.white }),
      line(860, 297, 1100, 297, { w: 4 }),
      line(860, 354, 1100, 354, { w: 4 }),
      text(980, 460, 'shelf: 0 kg', { size: 36, color: R, anchor: 'middle' }),
      text(1150, 290, 'Sell 5 kg?', { size: 40 }),
      cross(1240, 370, 44),
      text(1310, 390, 'BLOCKED', { size: 42, color: R }),
    ),
  );
  st(
    'Rule 3 — Two orders and two deliveries can be linked in any mix.',
    tip(
      'Rule 3 · Many-to-many',
      'Many orders can link to many deliveries. Separate linking handles this best.',
      panel(60, 520, 720, 350),
      text(85, 575, '3. Many-to-many', { size: 40, color: R }),
      chip(100, 620, 200, 70, 'PO 1', '', F.orange, 38),
      chip(100, 760, 200, 70, 'PO 2', '', F.orange, 38),
      chip(520, 620, 220, 70, 'GRN 1', '', F.green, 38),
      chip(520, 760, 220, 70, 'GRN 2', '', F.green, 38),
      arrow([
        [305, 655],
        [512, 655],
      ]),
      arrow([
        [305, 665],
        [512, 785],
      ]),
      arrow([
        [305, 785],
        [512, 665],
      ]),
      arrow([
        [305, 795],
        [512, 795],
      ]),
    ),
  );
  st(
    'Rule 4 — Linked the wrong delivery? Just reset the link. The bill itself is never changed.',
    tip(
      'Rule 4 · Reset anytime',
      'A link can be reset at any time without editing the original document.',
      panel(820, 520, 720, 350),
      text(845, 575, '4. Reset anytime', { size: 40, color: R }),
      chip(860, 680, 200, 72, 'PI', 'bill', F.orange, 38),
      chip(1290, 610, 220, 70, 'GRN', 'Mon', F.green, 36),
      chip(1290, 760, 220, 70, 'GRN', 'Tue', F.green, 36),
      line(1065, 725, 1282, 790, { color: R, w: 6 }),
      cross(1175, 757, 24),
      arrow(
        [
          [1065, 705],
          [1282, 645],
        ],
        { color: G, w: 7 },
      ),
      text(860, 840, 'bill not edited ✓', { size: 34, color: G }),
    ),
  );
});

/* =========================================================== 7 · RULES 5–7 (p.5) */
const rules2 = board('rules2', 'Linking rules 5–7', 'Book p.5', (st) => {
  st('Three more reasons from page 5.', title('Why link separately? (5 – 7)', 'Book p.5'));
  st(
    'Rule 5 — FactsERP links papers by itself when the party and the item match. You can also lock a link so it never moves.',
    tip(
      'Rule 5 · Automatic linking + lock',
      'Documents are linked automatically by party and stock code. Any automatic link can be locked.',
      panel(50, 140, 480, 730),
      text(70, 195, '5. Auto-link + lock', { size: 40, color: R }),
      rect(75, 240, 200, 190, { fill: F.green }),
      text(175, 290, 'GRN', { size: 42, anchor: 'middle' }),
      text(175, 345, 'FreshMart', { size: 30, anchor: 'middle' }),
      text(175, 395, '5 kg rice', { size: 30, anchor: 'middle' }),
      rect(305, 240, 200, 190, { fill: F.orange }),
      text(405, 290, 'PI', { size: 42, anchor: 'middle' }),
      text(405, 345, 'FreshMart', { size: 30, anchor: 'middle' }),
      text(405, 395, '5 kg rice', { size: 30, anchor: 'middle' }),
      text(290, 490, 'match → auto-link ✓', { size: 34, color: G, anchor: 'middle' }),
      lock(290, 600, 1.3),
      text(290, 770, 'locked link', { size: 36, anchor: 'middle' }),
      text(290, 815, 'never auto-moved', { size: 32, anchor: 'middle' }),
    ),
  );
  st(
    'Rule 6 — You ordered 5 kg but only 3 kg came. The system warns you at once.',
    tip(
      'Rule 6 · Exceptions are notified',
      'When something does not match — like a short delivery — FactsERP flags it.',
      panel(560, 140, 480, 730),
      text(580, 195, '6. Exceptions flagged', { size: 40, color: R }),
      text(600, 290, 'Ordered: 5 kg', { size: 42 }),
      text(600, 360, 'Received: 3 kg', { size: 42 }),
      poly(
        [
          [800, 440],
          [900, 620],
          [700, 620],
        ],
        { fill: F.yellow, w: 6 },
      ),
      text(800, 600, '!', { size: 90, anchor: 'middle' }),
      text(800, 710, '2 kg short!', { size: 54, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'Rule 7 — The sugar never comes. Force-close the order so it doesn’t stay open forever.',
    tip(
      'Rule 7 · Easy force closing',
      'Close an order that will never be completed by allocating the document to itself.',
      panel(1070, 140, 480, 730),
      text(1090, 195, '7. Easy force close', { size: 40, color: R }),
      text(1110, 290, 'Order #12', { size: 42, color: B }),
      text(1110, 365, '5 kg rice ✓', { size: 40, color: G }),
      text(1110, 435, '2 kg sugar …', { size: 40 }),
      line(1100, 422, 1420, 422, { color: R, w: 6 }),
      rect(1120, 520, 380, 110, { color: R, w: 7, fill: '#ffe3e3' }),
      text(1310, 595, 'CLOSED', { size: 64, color: R, anchor: 'middle' }),
      text(1310, 700, 'linked to itself', { size: 34, anchor: 'middle' }),
    ),
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
  st('Three more rules from page 6.', title('Rules 8 – 10', 'Book p.6'));
  st(
    'Rule 8 — A walk-in customer pays cash and takes the bag at once, so we skip the DO. Allowed — but not recommended.',
    tip(
      'Rule 8 · Skipping a step',
      'Jumping over a step (here the DO) is not recommended, but may be allowed for convenience.',
      panel(50, 140, 480, 730),
      text(70, 195, '8. Skipping a step', { size: 40, color: R }),
      chip(70, 470, 130, 76, 'SO', '', F.blue, 40),
      chip(225, 470, 130, 76, 'DO', '', F.grey, 40),
      chip(380, 470, 130, 76, 'SI', '', F.blue, 40),
      cross(290, 508, 30),
      arrow(
        [
          [135, 462],
          [290, 300],
          [445, 462],
        ],
        { color: G, w: 7 },
      ),
      text(290, 290, 'walk-in, cash', { size: 34, anchor: 'middle' }),
      text(290, 640, 'allowed …', { size: 38, anchor: 'middle' }),
      text(290, 700, 'not recommended', { size: 38, color: R, anchor: 'middle' }),
    ),
  );
  st(
    'Rule 9 — Extra charges, like a ₹20 rickshaw fare, are linked to the bill. Now we know the TRUE cost: ₹370.',
    tip(
      'Rule 9 · Landed cost',
      'Accounts documents can be linked too: an extra-charge voucher linked to the purchase invoice gives the precise (landed) cost.',
      panel(560, 140, 480, 730),
      text(580, 195, '9. True (landed) cost', { size: 40, color: R }),
      text(600, 300, 'Rice bill', { size: 40 }),
      text(1010, 300, '₹350', { size: 40, anchor: 'end' }),
      text(600, 380, '+ rickshaw', { size: 40, color: O }),
      text(1010, 380, '₹20', { size: 40, color: O, anchor: 'end' }),
      line(600, 410, 1010, 410, { w: 5 }),
      hl(590, 440, 430, 70, F.green),
      text(600, 490, 'true cost', { size: 42 }),
      text(1010, 490, '₹370', { size: 46, anchor: 'end' }),
      bag(800, 720, 1),
    ),
  );
  st(
    'Rule 10 — A cost can still be corrected (like an exchange gain) — but ONLY while the month is still open.',
    tip(
      'Rule 10 · Cost changes while the period is open',
      'For consignments the cost can change; e.g. an exchange gain can be allocated to the purchase invoice — only if the reporting period is not closed.',
      panel(1070, 140, 480, 730),
      text(1090, 195, '10. Fix cost while open', { size: 40, color: R }),
      rect(1170, 250, 280, 230, { fill: F.white }),
      rect(1170, 250, 280, 64, { fill: R }),
      text(1310, 297, 'NOVEMBER', { size: 36, color: '#ffffff', anchor: 'middle' }),
      text(1310, 410, 'OPEN', { size: 60, color: G, anchor: 'middle' }),
      text(1310, 560, '−₹5 adjustment ✓', { size: 36, anchor: 'middle' }),
      lock(1180, 700, 0.9),
      text(1240, 735, 'closed = no change', { size: 32 }),
    ),
  );
});

/* =========================================================== 10 · ONE-TO-ONE TAG (p.6) */
const tag = board('tag', 'Cardinality 1 : 1 (One-to-One)', 'Book p.6', (st) => {
  st('Cardinality One-to-One (1 : 1): one delivery becomes exactly one bill. But how does the bill remember its delivery?', title('Cardinality 1 : 1 — One-to-One', 'Book p.6'));
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

/* =========================================================== 10a · THE 4 KINDS OF LINKS (p.6–8) */
/** mini diagram: every left box links to every right box */
function mini(x: number, nl: number, nr: number): Item[] {
  const ys = (n: number) => (n === 1 ? [345] : [305, 385]);
  const out: Item[] = [];
  ys(nl).forEach((y) => out.push(...rect(x + 25, y - 26, 110, 52, { fill: F.green, w: 4 }), ...text(x + 80, y + 9, 'GRN', { size: 26, anchor: 'middle' })));
  ys(nr).forEach((y) => out.push(...rect(x + 215, y - 26, 110, 52, { fill: F.orange, w: 4 }), ...text(x + 270, y + 9, 'PI', { size: 26, anchor: 'middle' })));
  ys(nl).forEach((a) => ys(nr).forEach((b) => out.push(...arrow([[x + 139, a], [x + 209, b]], { w: 4, color: B }))));
  return out;
}
const KINDS: [string, string, number, number, string, string, string, string][] = [
  ['1 : 1', 'One-to-One', 1, 1, 'one delivery →', 'exactly one bill', 'GRN 1 → PI 1', 'One-to-one: one delivery becomes exactly one bill. The simplest case.'],
  ['1 : N', 'One-to-Many', 1, 2, 'one delivery →', 'many bills', 'rice + sugar → 2 bills', 'One-to-many: ONE delivery is billed in MANY bills.'],
  ['N : 1', 'Many-to-One', 2, 1, 'many deliveries →', 'one bill', 'Mon + Thu → 1 weekly bill', 'Many-to-one: MANY deliveries are put into ONE bill.'],
  ['M : N', 'Many-to-Many', 2, 2, 'any delivery →', 'any bill', '2 × 2 = 4 links', 'Many-to-many: any delivery can go into any bill — every pair. This is called a Cartesian link.'],
];
const links = board('links', 'Cardinality: 4 kinds of links', 'Book p.6–8', (st) => {
  st('A delivery and its bill must be linked. CARDINALITY means: how many papers on one side link to how many on the other. There are 4 kinds.', title('Cardinality — 4 kinds of links', 'Book p.6–8'));
  KINDS.forEach(([code, name, nl, nr, m1, m2, ex, say], i) => {
    const x = 60 + i * 375;
    st(
      say,
      rect(x, 150, 350, 500, { fill: F.white }),
      text(x + 175, 222, code, { size: 60, color: P, anchor: 'middle' }),
      text(x + 175, 268, name, { size: 34, anchor: 'middle' }),
      mini(x, nl, nr),
      text(x + 175, 490, m1, { size: 30, anchor: 'middle' }),
      text(x + 175, 532, m2, { size: 30, anchor: 'middle' }),
      text(x + 175, 610, ex, { size: 26, color: B, anchor: 'middle' }),
    );
  });
  st(
    'In every kind, each bill line keeps a tag that points back to its delivery line.',
    hl(200, 700, 1200, 80, F.yellow),
    text(800, 756, 'Every bill line keeps a tag back to its delivery line', { size: 40, anchor: 'middle' }),
    text(800, 840, 'Cardinality = how many papers link to how many papers', { size: 34, color: B, anchor: 'middle' }),
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
  st('Cardinality Many-to-Many (M : N), also called Cartesian: many deliveries and many bills, all linked to each other.', title('Cardinality M : N — Many-to-Many (Cartesian)', undefined, 70, 92, 1250));
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
  ['Purchase cycle: PR → PQ → PO → GRN → PI → PV', 'Boards 4–11 · The buying story: the 6 papers the home (buyer) writes.'],
  ['Sales cycle: SE → SQ → SO → DO → SI → RV', 'Boards 12–19 · The selling story: the 6 papers the grocery (seller) writes.'],
  ['Every home paper has a reciprocal grocery paper', 'Boards 20–21 · Reciprocal papers and the full cycle: both books match.'],
  ['Link later, but check stock now', 'Boards 22–30 · How papers link, and the linking rules (p.5–8).'],
];
const recap = board('recap', 'Remember', 'Summary', (st) => {
  st('Five things to remember from this topic.', title('Remember', 'Summary', 70, 92, 330));
  RECAP.forEach(([r, where], i) => st(r + '.', tip(r, where, tick(100, 225 + i * 115, 1.1), text(180, 240 + i * 115, `${i + 1}. ${r}`, { size: 46 }))));
  st('Thank you! Any questions?', bag(1370, 870, 1.2), hl(560, 800, 520, 76, F.yellow), text(820, 860, 'Thank you!', { size: 72, color: R, anchor: 'middle' }));
});

const { purchase1, purchase2, sales1, sales2, BUY_STORY, SELL_STORY } = CYCLE_BOARDS;
const ERP_BOARDS: Board[] = [cover, mould, copy, ...BUY_STORY, purchase1, purchase2, ...SELL_STORY, sales1, sales2, twins, cycle, chain, rules1, rules2, rules3, links, tag, one2many, many2one, many, recap].map((x) => ({ ...x, topic: 2 }));

/** the two separate topics of the seminar */
export const TOPICS = [
  { n: 1, name: 'Ignorance of the Law' },
  { n: 2, name: 'Business Process' },
];
export const BOARDS: Board[] = [...LAW_BOARDS, ...ERP_BOARDS];
