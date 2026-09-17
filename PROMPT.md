# Daily content-engine run — instructions for the scheduled agent

You are running unattended as a scheduled daily task, in a checkout of this repo at its root
(no `content-engine/` subdirectory — this repo IS the content engine). Do the following, in
order, without asking the user anything (this prompt IS the authorization for today's run):

1. Read `config.js` for the niche.
2. Use WebSearch to find one genuinely current, specific angle in that niche — a real trend,
   a real product category, a real seasonal moment. Do NOT reuse an angle already covered in
   `posts/*.json` (check existing filenames/titles first).
3. Write a new post as `posts/<YYYY-MM-DD>-<slug>.json`, matching the exact schema used by
   existing posts (slug, date, title, intro, sections[] with heading/body/products[],
   conclusion). Products use `searchQuery` (a real, specific product/brand name from your
   research), never a fabricated ASIN.
   - Content must be genuinely useful and specific (real product names, real tradeoffs) —
     not generic filler. This is a hard requirement, not a style preference.
   - Every claim must come from what you actually found this run. Do not invent statistics,
     prices, or product specs.
4. Run `node build.js` from the repo root to regenerate the static site into `docs/`.
5. Commit and push: `git add posts/ docs/ && git commit -m "content-engine: daily post
   <date>" && git push`.
6. Report back in one short message: the post title, the topic angle, and confirmation it's
   pushed live.

If WebSearch turns up nothing genuinely new/specific for this niche today, it is OK to skip
publishing rather than force a thin post — say so and stop.
