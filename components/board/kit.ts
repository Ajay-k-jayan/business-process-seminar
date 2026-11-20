// Whiteboard drawing kit: hand-drawn (rough.js) shapes with bright fills, handwriting text, arrows.
// Every helper returns a list of Items that the board draws one after another.

import rough from 'roughjs';

const gen = rough.generator();
let seed = 11;

export type Stroke = { kind: 'path'; d: string; color: string; w: number };
export type Fill = { kind: 'fill'; d: string; color: string };
export type Txt = {
  kind: 'text';
  x: number;
  y: number;
  text: string;
  size: number;
  color: string;
  anchor: 'start' | 'middle' | 'end';
  rotate?: number;
};
/** hover explanation attached to a group of drawn items */
export type Tip = { title: string; text: string };
export type Item = (Stroke | Fill | Txt) & { tip?: Tip };
export type Step = { say: string; items: Item[] };

/** attach a hover explanation to everything drawn by the given helpers */
export function tip(title: string, textStr: string, ...groups: Item[][]): Item[] {
  const t: Tip = { title, text: textStr };
  return groups.flat().map((it) => ({ ...it, tip: t }));
}
export type Board = { id: string; label: string; page: string; steps: Step[]; topic?: number };

/** marker colours: dark and saturated so they survive a projector */
export const K = '#16191d'; // black marker
export const B = '#1554d1'; // blue marker
export const R = '#d91c1c'; // red marker
export const G = '#0b8a4c'; // green marker
export const O = '#e8590c'; // orange marker
export const P = '#7b2fd0'; // purple marker

/** bright fills (Canva-like) */
export const F = {
  yellow: '#ffe14d',
  orange: '#ffb066',
  blue: '#8cc8ff',
  green: '#95e8a4',
  pink: '#ffa8c9',
  purple: '#cdb6ff',
  paper: '#fff4d6',
  white: '#ffffff',
  brown: '#c98c55',
  sky: '#d6ecff',
  grey: '#e3e7ec',
};

type Opt = { color?: string; w?: number; fill?: string; rough?: number };

function o(color: string, w: number, fill?: string, roughness = 0.3) {
  return {
    stroke: color,
    strokeWidth: w,
    roughness,
    bowing: 0.15,
    disableMultiStroke: true,
    disableMultiStrokeFill: true,
    preserveVertices: true,
    seed: seed++,
    ...(fill ? { fill, fillStyle: 'solid' as const } : {}),
  };
}

type Drawable = ReturnType<typeof gen.rectangle>;

/** outlines first (drawn by the marker), then the colour fills in */
function items(dr: Drawable): Item[] {
  const out: Item[] = [];
  const fills: Item[] = [];
  for (const p of gen.toPaths(dr)) {
    if (p.stroke && p.stroke !== 'none') out.push({ kind: 'path', d: p.d, color: p.stroke, w: p.strokeWidth });
    else if (p.fill && p.fill !== 'none') fills.push({ kind: 'fill', d: p.d, color: p.fill });
  }
  return [...out, ...fills];
}

export const rect = (x: number, y: number, w: number, h: number, { color = K, w: sw = 5, fill, rough: r }: Opt = {}) =>
  items(gen.rectangle(x, y, w, h, o(color, sw, fill, r)));

export const ellipse = (cx: number, cy: number, w: number, h: number, { color = K, w: sw = 5, fill, rough: r }: Opt = {}) =>
  items(gen.ellipse(cx, cy, w, h, o(color, sw, fill, r)));

export const line = (x1: number, y1: number, x2: number, y2: number, { color = K, w = 5, rough: r }: Opt = {}) =>
  items(gen.line(x1, y1, x2, y2, o(color, w, undefined, r)));

export const poly = (pts: [number, number][], { color = K, w = 5, fill, rough: r }: Opt = {}) =>
  items(gen.polygon(pts, o(color, w, fill, r)));

export const path = (d: string, { color = K, w = 5, fill, rough: r }: Opt = {}) => items(gen.path(d, o(color, w, fill, r)));

export const text = (
  x: number,
  y: number,
  str: string,
  { size = 40, color = K, anchor = 'start', rotate }: { size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; rotate?: number } = {},
): Item[] => [{ kind: 'text', x, y, text: str, size, color, anchor, rotate }];

/** highlighter swash behind a word (fill only) */
export const hl = (x: number, y: number, w: number, h: number, color = F.yellow): Item[] => {
  const dr = gen.rectangle(x, y, w, h, { ...o('none', 0, color, 1.6), stroke: 'none' });
  return items(dr);
};

/** clean (non-rough) dashed path through points, drawn as one stroke */
export function dashed(pts: [number, number][], { color = K, w = 5, dash = 18, gap = 14 } = {}): Item[] {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const L = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / L;
    const uy = (y2 - y1) / L;
    for (let t = 0; t < L; t += dash + gap) {
      const e = Math.min(L, t + dash);
      d += `M ${(x1 + ux * t).toFixed(1)} ${(y1 + uy * t).toFixed(1)} L ${(x1 + ux * e).toFixed(1)} ${(y1 + uy * e).toFixed(1)} `;
    }
  }
  return [{ kind: 'path', d, color, w }];
}

function head(from: [number, number], to: [number, number], color: string, w: number, size = 26): Item {
  const a = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const s = 0.5;
  const p1: [number, number] = [to[0] - size * Math.cos(a - s), to[1] - size * Math.sin(a - s)];
  const p2: [number, number] = [to[0] - size * Math.cos(a + s), to[1] - size * Math.sin(a + s)];
  const d1 = gen.toPaths(gen.line(p1[0], p1[1], to[0], to[1], o(color, w, undefined, 0.5)))[0].d;
  const d2 = gen.toPaths(gen.line(to[0], to[1], p2[0], p2[1], o(color, w, undefined, 0.5)))[0].d;
  return { kind: 'path', d: `${d1} ${d2}`, color, w };
}

/** arrow along points (2 points = straight, 3+ = smooth curve). both = heads at both ends */
export function arrow(pts: [number, number][], { color = K, w = 6, both = false, dash = false }: { color?: string; w?: number; both?: boolean; dash?: boolean } = {}): Item[] {
  let body: Item[];
  if (dash) {
    // sample a quadratic through the 3 points, or straight segments
    const sm: [number, number][] = [];
    if (pts.length === 3) {
      const [a, c, b] = pts;
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        const u = 1 - t;
        sm.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]);
      }
    } else sm.push(...pts);
    body = dashed(sm, { color, w, dash: 14, gap: 12 });
  } else if (pts.length === 2) body = line(pts[0][0], pts[0][1], pts[1][0], pts[1][1], { color, w, rough: 0.6 });
  else if (pts.length === 3) {
    const [a, c, b] = pts;
    body = path(`M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`, { color, w, rough: 0.6 });
  } else body = items(gen.curve(pts, o(color, w, undefined, 0.6)));
  const n = pts.length;
  const out = [...body, head(pts[n - 2], pts[n - 1], color, w)];
  if (both) out.push(head(pts[1], pts[0], color, w));
  return out;
}

/* ---------------- composite drawings ---------------- */

export function house(cx: number, by: number, s = 1, label?: string): Item[] {
  const X = (v: number) => cx + v * s;
  const Y = (v: number) => by + v * s;
  return [
    ...rect(X(-110), Y(-150), 220 * s, 150 * s, { fill: '#fff3bf' }),
    ...poly(
      [
        [X(-135), Y(-148)],
        [X(0), Y(-262)],
        [X(135), Y(-148)],
      ],
      { fill: F.orange },
    ),
    ...rect(X(-80), Y(-120), 66 * s, 56 * s, { fill: F.sky }),
    ...rect(X(22), Y(-98), 58 * s, 98 * s, { fill: F.brown }),
    ...(label ? text(cx, by + 50 * s + 10, label, { size: 50 * Math.max(s, 0.7), color: O, anchor: 'middle' }) : []),
  ];
}

export function shop(cx: number, by: number, s = 1, label?: string): Item[] {
  const X = (v: number) => cx + v * s;
  const Y = (v: number) => by + v * s;
  return [
    ...rect(X(-130), Y(-170), 260 * s, 170 * s, { fill: F.white }),
    ...poly(
      [
        [X(-150), Y(-170)],
        [X(150), Y(-170)],
        [X(126), Y(-214)],
        [X(-126), Y(-214)],
      ],
      { fill: F.blue },
    ),
    ...rect(X(-100), Y(-130), 104 * s, 76 * s, { fill: F.sky }),
    ...rect(X(36), Y(-112), 62 * s, 112 * s, { fill: F.brown }),
    ...(label ? text(cx, by + 50 * s + 10, label, { size: 50 * Math.max(s, 0.7), color: B, anchor: 'middle' }) : []),
  ];
}

/** 5 kg rice bag, bottom centre (cx, by) */
export function bag(cx: number, by: number, s = 1, label = '5 kg'): Item[] {
  const X = (v: number) => (cx + v * s).toFixed(1);
  const Y = (v: number) => (by + v * s).toFixed(1);
  return [
    ...path(`M ${X(-58)} ${Y(0)} C ${X(-74)} ${Y(-52)} ${X(-64)} ${Y(-96)} ${X(-44)} ${Y(-118)} L ${X(44)} ${Y(-118)} C ${X(64)} ${Y(-96)} ${X(74)} ${Y(-52)} ${X(58)} ${Y(0)} Z`, {
      fill: F.paper,
    }),
    ...poly(
      [
        [cx - 44 * s, by - 118 * s],
        [cx - 34 * s, by - 146 * s],
        [cx + 34 * s, by - 146 * s],
        [cx + 44 * s, by - 118 * s],
      ],
      { fill: '#f1d9a8' },
    ),
    ...rect(cx - 40 * s, by - 96 * s, 80 * s, 56 * s, { fill: F.white, w: 4 }),
    ...(s >= 0.6 ? text(cx, by - 58 * s, label, { size: 28 * s, anchor: 'middle' }) : []),
  ];
}

/** a paper / document box with a code and a name */
export function doc(x: number, y: number, w: number, h: number, code: string, name: string, fill: string, codeColor = K, nameSize = 32): Item[] {
  return [
    ...rect(x, y, w, h, { fill }),
    ...text(x + 22, y + h / 2 + (name ? -4 : 16), code, { size: 46, color: codeColor }),
    ...(name ? text(x + 22, y + h / 2 + 38, name, { size: nameSize }) : []),
  ];
}

/** single-line box: big code + name on one line */
export function chip(x: number, y: number, w: number, h: number, code: string, name: string, fill: string, size = 40): Item[] {
  return [...rect(x, y, w, h, { fill }), ...text(x + w / 2, y + h / 2 + size * 0.36, name ? `${code}  ${name}` : code, { size, anchor: 'middle' })];
}

export function tick(x: number, y: number, s = 1, color = G): Item[] {
  return path(`M ${x} ${y} L ${x + 16 * s} ${y + 18 * s} L ${x + 46 * s} ${y - 22 * s}`, { color, w: 7, rough: 0.5 });
}

export function cross(cx: number, cy: number, r: number, color = R, w = 8): Item[] {
  return [...line(cx - r, cy - r, cx + r, cy + r, { color, w }), ...line(cx + r, cy - r, cx - r, cy + r, { color, w })];
}

export function lock(cx: number, cy: number, s = 1): Item[] {
  return [
    ...path(`M ${cx - 24 * s} ${cy} L ${cx - 24 * s} ${cy - 30 * s} Q ${cx - 24 * s} ${cy - 62 * s} ${cx} ${cy - 62 * s} Q ${cx + 24 * s} ${cy - 62 * s} ${cx + 24 * s} ${cy - 30 * s} L ${cx + 24 * s} ${cy}`, {
      w: 7,
    }),
    ...rect(cx - 40 * s, cy, 80 * s, 64 * s, { fill: F.yellow }),
    ...ellipse(cx, cy + 28 * s, 16 * s, 16 * s, { fill: K, w: 3 }),
  ];
}

/** manila luggage tag with a hole, top-left (x, y) */
export function luggage(x: number, y: number, w: number, h: number): Item[] {
  return [
    ...poly(
      [
        [x + 40, y],
        [x + w, y],
        [x + w, y + h],
        [x + 40, y + h],
        [x, y + h - 40],
        [x, y + 40],
      ],
      { fill: '#ffe7a3' },
    ),
    ...ellipse(x + 26, y + h / 2, 22, 22, { fill: F.white, w: 4 }),
  ];
}

/** panel frame for rules */
export const panel = (x: number, y: number, w: number, h: number) => rect(x, y, w, h, { color: '#5f6b7a', w: 3, fill: '#fbfcfd', rough: 0.6 });

/** title with yellow highlighter + book page tag */
export function title(str: string, page?: string, x = 70, y = 92, w?: number): Item[] {
  const tw = w ?? str.length * 30 + 36;
  return [
    ...hl(x - 12, y - 52, tw, 66),
    ...text(x, y, str, { size: 64 }),
    ...(page ? text(1530, y - 6, page, { size: 34, color: R, anchor: 'end' }) : []),
  ];
}

/** simple person, feet at (cx, by), about 260 tall at s = 1 */
export function person(cx: number, by: number, s = 1, shirt: string = F.blue): Item[] {
  return [
    ...rect(cx - 34 * s, by - 178 * s, 68 * s, 100 * s, { fill: shirt }),
    ...ellipse(cx, by - 214 * s, 64 * s, 64 * s, { fill: '#ffd9b3' }),
    ...line(cx - 34 * s, by - 160 * s, cx - 70 * s, by - 95 * s, { w: 6 }),
    ...line(cx + 34 * s, by - 160 * s, cx + 70 * s, by - 95 * s, { w: 6 }),
    ...line(cx - 16 * s, by - 78 * s, cx - 30 * s, by, { w: 7 }),
    ...line(cx + 16 * s, by - 78 * s, cx + 30 * s, by, { w: 7 }),
  ];
}

/** speech bubble with a tail pointing at (tx, ty) */
export function bubble(x: number, y: number, w: number, h: number, tx: number, ty: number, fill: string = F.white): Item[] {
  const bx = Math.min(Math.max(tx, x + 50), x + w - 50);
  const down = ty > y + h;
  const by = down ? y + h - 3 : y + 3;
  return [...rect(x, y, w, h, { fill }), ...poly([[bx - 24, by], [bx + 24, by], [tx, ty]], { fill })];
}

/** official gazette / newspaper */
export function gazette(x: number, y: number, w: number, h: number, head = 'GAZETTE'): Item[] {
  return [
    ...rect(x, y, w, h, { fill: F.white }),
    ...text(x + w / 2, y + 48, head, { size: 34, color: R, anchor: 'middle' }),
    ...line(x + 18, y + 64, x + w - 18, y + 64, { w: 4 }),
    ...[0, 1, 2, 3].map((i) => line(x + 24, y + 98 + i * 30, x + w - 24 - (i % 2) * 40, y + 98 + i * 30, { w: 3, color: '#7a8594' })).flat(),
  ];
}

/** closed book with a spine */
export function book(x: number, y: number, w: number, h: number, label: string, fill: string = F.purple): Item[] {
  return [
    ...rect(x, y, w, h, { fill }),
    ...line(x + 24, y, x + 24, y + h, { w: 5 }),
    ...text(x + w / 2 + 12, y + h / 2 + 14, label, { size: 36, anchor: 'middle' }),
  ];
}

/** cover board that opens a topic: big topic name, then "What we will learn" ticked one by one */
export function coverBoard(id: string, n: number, name: string, sub: string, intro: string, learn: [string, string][], sub2?: string): Board {
  const dy = sub2 ? 40 : 0;
  const steps: Step[] = [
    {
      say: intro,
      items: [
        ...rect(650, 50, 300, 72, { fill: n === 1 ? F.pink : F.blue, color: n === 1 ? R : B }),
        ...text(800, 102, `TOPIC ${n}`, { size: 46, color: n === 1 ? R : B, anchor: 'middle' }),
        ...hl(800 - name.length * 24 - 30, 160, name.length * 48 + 60, 110),
        ...text(800, 245, name, { size: 92, anchor: 'middle' }),
        ...text(800, 320, sub, { size: 36, color: B, anchor: 'middle' }),
        ...(sub2 ? text(800, 372, sub2, { size: 34, color: O, anchor: 'middle' }) : []),
      ],
    },
  ];
  learn.forEach(([item, say], i) => {
    steps.push({
      say,
      items: [
        ...(i === 0 ? text(260, 410 + dy, 'What we will learn:', { size: 44, color: R }) : []),
        ...tick(280, 478 + dy + i * 92, 1),
        ...text(350, 492 + dy + i * 92, item, { size: 46 }),
      ],
    });
  });
  return { id, label: 'Start: what we will learn', page: 'Topic ' + n, steps, topic: n };
}

/** scooter, bottom centre (cx, by) */
export function scooter(cx: number, by: number, s = 1): Item[] {
  const P = (x: number, y: number): [number, number] => [cx + x * s, by + y * s];
  return [
    ...poly([P(-112, -40), P(-20, -40), P(-30, -92), P(-102, -102)], { fill: F.blue }),
    ...rect(cx - 108 * s, by - 116 * s, 84 * s, 16 * s, { fill: '#3a4250', w: 4 }),
    ...line(cx - 20 * s, by - 40 * s, cx + 44 * s, by - 40 * s, { w: 7 }),
    ...poly([P(38, -40), P(60, -40), P(50, -142), P(32, -142)], { fill: F.blue }),
    ...line(cx + 8 * s, by - 146 * s, cx + 78 * s, by - 146 * s, { w: 7 }),
    ...ellipse(cx - 76 * s, by - 24 * s, 48 * s, 48 * s, { fill: F.grey }),
    ...ellipse(cx + 66 * s, by - 24 * s, 48 * s, 48 * s, { fill: F.grey }),
  ];
}
