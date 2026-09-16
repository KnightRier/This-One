# content-engine

An automated daily content pipeline in the "Apartment & Small-Space Gardening" niche,
monetized via Amazon Associates. Runs as a scheduled Claude task: research a real current
angle, write a genuinely useful post, rebuild the static site, commit, push.

## Status

- Niche picked, pipeline built, first real post written and verified (`posts/2026-09-16-*.json`).
- **Not yet publishing publicly** — needs a GitHub repo to push to (see below).
- **Not yet earning anything** — needs an Amazon Associates affiliate tag (see below).

## What you need to do (one-time, a few minutes)

1. **GitHub repo**: create an empty public repo (e.g. `small-space-grow`). Tell me the repo
   URL and I'll wire up the remote, push, and enable GitHub Pages — after that it's fully
   automatic.
2. **Amazon Associates**: sign up at [affiliate-program.amazon.com](https://affiliate-program.amazon.com)
   (free, takes ~10 min, Amazon reviews the application). Once approved you get an affiliate
   tag like `yourname-20`. Set it as an environment variable before builds:
   ```bash
   export AMAZON_ASSOCIATE_TAG=yourname-20
   ```
   Until this is set, product links still work (they go to real Amazon search results) —
   they just don't earn commission yet.

## How it runs day to day

A scheduled task fires daily and gives a fresh Claude session `PROMPT.md` as its instructions.
It researches one real, current angle in the niche (not filler), writes a new post, rebuilds
the site, and pushes — no input needed from you once it's wired up.

## Honesty constraints (non-negotiable, baked into `PROMPT.md` and `build.js`)

- Every post must contain a clear affiliate disclosure (`build.js` adds this automatically —
  it isn't something the daily prompt can skip).
- Product links point to live Amazon search results for real product/brand names, never a
  fabricated product ID.
- Content must reflect that day's actual research, not invented specs or generic filler.
- If a day's research doesn't turn up anything genuinely worth publishing, the run skips
  rather than forcing a thin post.

## Realistic expectations

This is SEO/content-driven, not paid traffic — realistically weeks to months before it sees
meaningful search traffic or income, and there's no guarantee it ever converts into
significant money. What it does guarantee: it runs itself daily without you touching it,
and everything it publishes is genuinely researched, not spam.

## Commands

```bash
node content-engine/build.js   # rebuild docs/ from posts/ (docs/ is what GitHub Pages serves)
```
