# Business Process — whiteboard seminar

Topic 1 explains the legal rule *ignorantia juris non excusat*; topic 2 explains FactsERP documents.

FactsERP Book 2 (*Documents, the building blocks of FactsERP*, pages 3–9) explained on a bright whiteboard.
The story is one 5 kg bag of rice between **your home** (buyer, orange) and **the grocery** (seller, blue).
Every click draws the next part with a marker; the subtitle bar at the bottom explains what is being drawn, and pointing the mouse at any drawing shows a short explanation card.

## Present it (no internet needed)

Double-click **`Start seminar.cmd`**. The browser opens at http://localhost:3000. Keep the black window open while you present. Press **F** for full screen.

| Key / action | What it does |
|---|---|
| Click the board, Space, → or Enter | Draw the next part (if it is still drawing: finish it at once) |
| ← | Back one step |
| R | Draw this step again |
| C | Contents — jump to any board |
| F | Full screen |
| Home | Back to the start |
| Point the mouse at any drawing | It gets an orange frame and a card explains it in plain English |

## Two separate topics

Each topic has its own cover, its own examples, its own numbering and progress bar. The Contents menu (C) lists them side by side.

**Topic 1 — Ignorance of the Law** (*ignorantia juris non excusat*, from the Wikipedia article; everyday examples: a helmet rule, look-alike umbrellas):
1 Start · 2 The rule, word by word · 3 A story on the road · 4 What it means / does not mean · 5 Same idea, other words ·
6 Why the rule exists · 7 The law must be published · 8 Mistake of law vs fact · 9 When it still matters ·
10 Where the rule comes from · 11 Today’s laws · 12 Quick check · 13 Remember: 5 points · 14 In daily life

**Topic 2 — Business Process** (FactsERP Book 2, pages 3–9; one example: a home buys one 5 kg bag of rice for ₹350 from a grocery):
1 Start · 2 Our example · 3 Everything is a document · 4 Mould → Bricks · 5 The magic copy ·
6–7 **Purchase cycle** (home buys): PR → PQ → PO → GRN → PI → PV ·
8–9 **Sales cycle** (grocery sells): SE → SQ → SO → DO → SI → RV ·
10 Twin papers · 11 The full 10-paper cycle · 12 The sales chain · 13–14 Why link separately (rules 1–7) · 15 Rules 8–10 ·
16 One delivery → one bill · 17 Real deliveries · 18 Many-to-many · 19 Remember

A board can be opened directly by its overall number: `http://localhost:3000/#5` (board 5) or `#5.3` (board 5, step 3). Topic 2 starts at `#18`.

## Change the content

- `components/board/cycles.ts` — topic 2: the purchase cycle and the sales cycle, step by step
- `components/board/law.ts` — topic 1 (ignorantia juris non excusat): drawings, subtitles and hover explanations
- `components/board/script.ts` — every board: what is drawn on each step, its subtitle, and the hover explanations (`tip(...)`)
- `components/board/kit.ts` — the drawing pieces (boxes, arrows, house, shop, rice bag, tag, lock…) and the colours
- `components/board/Whiteboard.tsx` — the board, marker animation, subtitle bar and controls


After editing, rebuild (uses the portable Node in `%LOCALAPPDATA%\Programs\node-v22.11.0-win-x64`):

```
set PATH=%LOCALAPPDATA%\Programs\node-v22.11.0-win-x64;%PATH%
npm run build
```
