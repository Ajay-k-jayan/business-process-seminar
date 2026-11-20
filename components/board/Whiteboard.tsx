'use client';

// The whiteboard: every click draws the next part with a moving marker; the subtitle explains it.

import { ChevronLeft, ChevronRight, Expand, List, RotateCcw, X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Item } from './kit';
import { BOARDS, TOPICS } from './script';

const HAND = 'var(--font-kalam), "Segoe Print", "Comic Sans MS", cursive';
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function ItemEl({ it, cur, cid }: { it: Item; cur?: number; cid: string }) {
  const live = cur !== undefined;
  const data = live ? { 'data-cur': cur, 'data-kind': it.kind, 'data-color': it.color } : {};
  const style = live ? { visibility: 'hidden' as const } : undefined;
  if (it.kind === 'path')
    return <path d={it.d} fill="none" stroke={it.color} strokeWidth={it.w} strokeLinecap="round" strokeLinejoin="round" style={style} {...data} />;
  if (it.kind === 'fill') return <path d={it.d} fill={it.color} stroke="none" style={style} {...data} />;
  const t = (
    <text
      x={it.x}
      y={it.y}
      fontSize={it.size}
      fill={it.color}
      textAnchor={it.anchor}
      fontWeight={700}
      transform={it.rotate ? `rotate(${it.rotate} ${it.x} ${it.y})` : undefined}
      style={{ fontFamily: HAND }}
    >
      {it.text}
    </text>
  );
  if (!live) return t;
  return (
    <g style={style} {...data}>
      <clipPath id={cid}>
        <rect x={0} y={0} width={0} height={0} />
      </clipPath>
      <g clipPath={`url(#${cid})`}>{t}</g>
    </g>
  );
}

type Anim = { el: SVGElement; kind: string; L: number; dur: number; color: string };

export default function Whiteboard() {
  const [b, setB] = useState(0);
  const [s, setS] = useState(0);
  const [take, setTake] = useState(0);
  const [wipe, setWipe] = useState(false);
  const [menu, setMenu] = useState(false);
  const [busy, setBusy] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const penRef = useRef<SVGGElement>(null);
  const capRef = useRef<SVGRectElement>(null);
  const drawing = useRef(false);
  const finishRef = useRef<() => void>(() => {});
  const pos = useRef({ b: 0, s: 0 });
  pos.current = { b, s };

  const board = BOARDS[b];
  const step = board.steps[s];

  /* ---------- draw the current step, item by item ---------- */
  useLayoutEffect(() => {
    const svg = svgRef.current;
    const pen = penRef.current;
    if (!svg || !pen) return;
    const els = Array.from(svg.querySelectorAll<SVGElement>('[data-cur]')).sort((x, y) => Number(x.dataset.cur) - Number(y.dataset.cur));
    const anims: Anim[] = els.map((el) => {
      const kind = el.dataset.kind ?? 'path';
      const color = el.dataset.color ?? '#000';
      if (kind === 'path') {
        const p = el as SVGPathElement;
        const L = p.getTotalLength();
        p.style.strokeDasharray = `${L} ${L}`;
        p.style.strokeDashoffset = `${L}`;
        return { el, kind, L, dur: clamp(L / 1500, 0.14, 1.1), color };
      }
      if (kind === 'fill') return { el, kind, L: 0, dur: 0.22, color };
      const len = el.querySelector('text')?.textContent?.length ?? 4;
      return { el, kind, L: 0, dur: clamp(len * 0.045, 0.28, 1.5), color };
    });

    const setText = (a: Anim, p: number) => {
      const t = a.el.querySelector('text') as SVGTextElement | null;
      const r = a.el.querySelector('clipPath rect') as SVGRectElement | null;
      if (!t || !r) return null;
      const bb = t.getBBox();
      r.setAttribute('x', String(bb.x - 12));
      r.setAttribute('y', String(bb.y - 16));
      r.setAttribute('height', String(bb.height + 32));
      r.setAttribute('width', String((bb.width + 24) * p));
      return bb;
    };
    const show = (a: Anim, p: number) => {
      a.el.style.visibility = 'visible';
      if (a.kind === 'path') {
        a.el.style.strokeDashoffset = `${a.L * (1 - p)}`;
        if (p >= 1) {
          a.el.style.strokeDasharray = '';
          a.el.style.strokeDashoffset = '';
        }
      } else if (a.kind === 'fill') a.el.style.opacity = String(p);
      else {
        setText(a, p);
        if (p >= 1) a.el.querySelector('g')?.removeAttribute('clip-path');
      }
    };
    const movePen = (a: Anim, p: number) => {
      let x = 0;
      let y = 0;
      if (a.kind === 'path') {
        const pt = (a.el as SVGPathElement).getPointAtLength(a.L * p);
        x = pt.x;
        y = pt.y;
      } else if (a.kind === 'text') {
        const bb = setText(a, p);
        if (!bb) return;
        x = bb.x + bb.width * p;
        y = bb.y + bb.height * 0.78;
      } else return;
      pen.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      pen.style.opacity = '1';
      if (capRef.current) capRef.current.setAttribute('fill', a.color);
    };

    let raf = 0;
    let done = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
      cancelAnimationFrame(raf);
      anims.forEach((a) => show(a, 1));
      pen.style.opacity = '0';
      drawing.current = false;
      setBusy(false);
    };
    finishRef.current = finish;
    if (!anims.length || reduce) {
      finish();
      return () => cancelAnimationFrame(raf);
    }
    drawing.current = true;
    setBusy(true);
    const start = performance.now() + 120;
    // `done` counts finished items; time is measured from the start each frame
    const loop = (now: number) => {
      let t = (now - start) / 1000;
      let i = 0;
      for (; i < anims.length; i++) {
        const span = anims[i].dur + 0.06;
        if (t < span) break;
        t -= span;
      }
      for (let k = done; k < i; k++) show(anims[k], 1);
      done = Math.max(done, i);
      if (i >= anims.length) {
        finish();
        return;
      }
      if (t >= 0) {
        const a = anims[i];
        const p = clamp(t / a.dur, 0, 1);
        show(a, p);
        movePen(a, p);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [b, s, take]);

  /* ---------- navigation ---------- */
  const goBoard = useCallback((nb: number, ns = 0) => {
    setMenu(false);
    setWipe(true);
    window.setTimeout(() => {
      setB(nb);
      setS(ns);
      setTake((t) => t + 1);
    }, 520);
    window.setTimeout(() => setWipe(false), 820);
  }, []);

  const next = useCallback(() => {
    if (drawing.current) {
      finishRef.current();
      return;
    }
    const { b: cb, s: cs } = pos.current;
    if (cs < BOARDS[cb].steps.length - 1) setS(cs + 1);
    else if (cb < BOARDS.length - 1) goBoard(cb + 1);
  }, [goBoard]);

  const prev = useCallback(() => {
    if (drawing.current) finishRef.current();
    const { b: cb, s: cs } = pos.current;
    if (cs > 0) setS(cs - 1);
    else if (cb > 0) {
      setB(cb - 1);
      setS(BOARDS[cb - 1].steps.length - 1);
    }
  }, []);

  const replay = useCallback(() => setTake((t) => t + 1), []);
  const fullscreen = useCallback(() => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen();
      else void document.documentElement.requestFullscreen?.().catch(() => {});
    } catch {
      /* not available */
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === ' ' || k === 'ArrowRight' || k === 'PageDown' || k === 'Enter' || k === 'ArrowDown') {
        e.preventDefault();
        next();
      } else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace' || k === 'ArrowUp') {
        e.preventDefault();
        prev();
      } else if (k === 'r' || k === 'R') replay();
      else if (k === 'f' || k === 'F') fullscreen();
      else if (k === 'c' || k === 'C' || k === 'm' || k === 'M') setMenu((v) => !v);
      else if (k === 'Escape') setMenu(false);
      else if (k === 'Home') goBoard(0);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, replay, fullscreen, goBoard]);

  // deep link #3 = board 3
  useEffect(() => {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(window.location.hash);
    const n = m ? Number(m[1]) : 0;
    if (n > 0 && n <= BOARDS.length) {
      setB(n - 1);
      setS(Math.min(Math.max(Number(m?.[2] ?? 1) - 1, 0), BOARDS[n - 1].steps.length - 1));
    }
  }, []);
  useEffect(() => {
    try {
      history.replaceState(null, '', `#${b + 1}`);
    } catch {
      /* ignore */
    }
  }, [b]);

  /* ---------- render ---------- */
  const fills: React.ReactNode[] = [];
  const strokes: React.ReactNode[] = [];
  board.steps.slice(0, s + 1).forEach((stp, si) => {
    stp.items.forEach((it, ii) => {
      const key = `${b}-${si}-${ii}-${si === s ? take : 0}`;
      const el = <ItemEl key={key} it={it} cur={si === s ? ii : undefined} cid={`c${b}-${si}-${ii}-${take}`} />;
      if (it.kind === 'fill') fills.push(el);
      else strokes.push(el);
    });
  });

  // the two topics are separate: progress and numbering count inside the current topic only
  const topicBoards = BOARDS.filter((x) => x.topic === board.topic);
  const tIdx = topicBoards.indexOf(board);
  const total = topicBoards.reduce((n, x) => n + x.steps.length, 0);
  const doneSteps = topicBoards.slice(0, tIdx).reduce((n, x) => n + x.steps.length, 0) + s + 1;
  const last = b === BOARDS.length - 1 && s === board.steps.length - 1;

  return (
    <div className="wb fixed inset-0 flex select-none flex-col overflow-hidden">
      {/* board */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pt-4 md:px-6">
        <div ref={frameRef} className="wb-frame relative" style={{ width: 'min(calc(100vw - 40px), calc((100dvh - 150px) * 1.7778))', aspectRatio: '16 / 9' }} onClick={next}>
          <div className="absolute inset-0 overflow-hidden rounded-md bg-[#fdfdfb]">
            <svg ref={svgRef} viewBox="0 0 1600 900" className="block h-full w-full" role="img" aria-label={`${board.label}: ${step.say}`}>
              <g>{fills}</g>
              <g>{strokes}</g>
              {/* the marker pen */}
              <g ref={penRef} style={{ opacity: 0, transition: 'opacity .15s' }} pointerEvents="none">
                <g transform="rotate(28)">
                  <path d="M 0 0 L -9 -24 L 9 -24 Z" fill="#343a40" />
                  <rect x={-14} y={-150} width={28} height={128} rx={6} fill="#f8f9fa" stroke="#343a40" strokeWidth={3} />
                  <rect ref={capRef} x={-15} y={-196} width={30} height={54} rx={7} fill="#16191d" stroke="#343a40" strokeWidth={3} />
                  <rect x={-14} y={-118} width={28} height={10} fill="#ced4da" />
                </g>
              </g>
            </svg>
            {/* board wipe between topics */}
            <div className={`wb-wipe pointer-events-none absolute inset-0 ${wipe ? 'on' : ''}`}>
              <div className="wb-eraser" />
            </div>
          </div>
          <div className="wb-tray" />
        </div>
      </div>

      {/* subtitle bar */}
      <div className="relative z-10 mt-3 bg-[#0f1729] text-white" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-x-0 top-0 h-1.5 bg-white/10">
          <div className="h-full bg-[#ffd43b] transition-all duration-500" style={{ width: `${(doneSteps / total) * 100}%` }} />
        </div>
        <div className="mx-auto flex max-w-[1800px] items-center gap-4 px-4 py-3 md:gap-6 md:px-8">
          <div className="hidden shrink-0 flex-col items-start gap-1 md:flex">
            <span className={`rounded-md px-2.5 py-1 text-[15px] font-extrabold uppercase tracking-wide text-[#0f1729] ${board.topic === 1 ? 'bg-[#ffa8c9]' : 'bg-[#8cc8ff]'}`}>
              Topic {board.topic} · {board.topic === 1 ? 'Law' : 'Business'}
            </span>
            <span className="max-w-[220px] truncate text-[15px] font-bold text-white/70">{board.label}</span>
          </div>
          <p key={`${b}-${s}`} className="wb-sub min-h-[2.6em] flex-1 font-semibold leading-snug" style={{ fontSize: 'clamp(17px, 1.8vw, 30px)' }}>
            {step.say}
          </p>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <div className="wb-ctrl">
              <button type="button" onClick={prev} className="wb-btn" aria-label="Back (←)" title="Back (←)">
                <ChevronLeft size={19} />
              </button>
              <button type="button" onClick={replay} className="wb-btn hidden sm:grid" aria-label="Draw again (R)" title="Draw again (R)">
                <RotateCcw size={16} />
              </button>
              <button type="button" onClick={() => setMenu((v) => !v)} className="wb-btn" aria-label="Contents (C)" title="Contents (C)">
                <List size={18} />
              </button>
              <button type="button" onClick={fullscreen} className="wb-btn hidden sm:grid" aria-label="Full screen (F)" title="Full screen (F)">
                <Expand size={16} />
              </button>
              <button type="button" onClick={next} disabled={last && !busy} className="wb-next" title="Next (Space / click the board)">
                {busy ? 'Finish' : 'Next'} <ChevronRight size={17} />
              </button>
            </div>
            <span className="hidden pr-1 text-[12px] font-semibold tabular-nums text-white/50 lg:inline">
              Board {tIdx + 1} of {topicBoards.length} · step {s + 1} of {board.steps.length}
            </span>
          </div>
        </div>
      </div>

      {/* contents */}
      {menu && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/40 p-4" onClick={() => setMenu(false)}>
          <div className="max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 text-[#0f1729] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">Contents</h2>
              <button type="button" onClick={() => setMenu(false)} className="grid h-10 w-10 place-items-center rounded-lg hover:bg-black/5" aria-label="Close">
                <X size={22} />
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {TOPICS.map((t) => (
                <section key={t.n}>
                  <h3 className={`mb-2 rounded-lg px-3 py-2 text-lg font-extrabold ${t.n === 1 ? 'bg-[#ffa8c9]' : 'bg-[#8cc8ff]'}`}>
                    Topic {t.n} · {t.name}
                  </h3>
                  <ol className="grid gap-1.5">
                    {BOARDS.map((x, i) => ({ x, i }))
                      .filter(({ x }) => x.topic === t.n)
                      .map(({ x, i }, k) => (
                        <li key={x.id}>
                          <button
                            type="button"
                            onClick={() => goBoard(i)}
                            className={`flex w-full items-center gap-3 rounded-xl border-2 px-3 py-2 text-left text-base font-bold transition ${i === b ? 'border-[#0f1729] bg-[#ffd43b]' : 'border-black/10 hover:border-black/30'}`}
                          >
                            <span className="w-6 text-right tabular-nums text-black/50">{k + 1}</span>
                            <span className="flex-1">{x.label}</span>
                          </button>
                        </li>
                      ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
