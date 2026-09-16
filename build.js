// Renders content-engine/posts/*.json into a static site in content-engine/site/.
// No markdown dependency — posts are structured JSON so every post gets a consistent,
// legally-required affiliate disclosure and honest product formatting for free.
import fs from 'fs';
import path from 'path';
import config from './config.js';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Links to a live Amazon search rather than a specific /dp/<asin> — we don't fabricate
// product IDs we haven't verified, and search links don't break when a listing changes.
function amazonLink(searchQuery) {
  const tag = config.amazonAssociateTag;
  const params = new URLSearchParams({ k: searchQuery });
  if (tag) params.set('tag', tag);
  return `https://www.amazon.com/s?${params.toString()}`;
}

function loadPosts() {
  if (!fs.existsSync(config.paths.posts)) return [];
  return fs
    .readdirSync(config.paths.posts)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(config.paths.posts, f), 'utf8')))
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

const DISCLOSURE = `<p class="disclosure">Disclosure: this page contains affiliate links. If you buy
through them, ${config.site.title} may earn a small commission at no extra cost to you. We only
recommend products based on our own research.</p>`;

const STYLE = `
<style>
  body { font-family: -apple-system, system-ui, sans-serif; max-width: 720px; margin: 0 auto; padding: 24px 16px 64px; line-height: 1.55; color: #1a1a1a; }
  header h1 { margin-bottom: 4px; }
  header p { color: #555; margin-top: 0; }
  .disclosure { font-size: 0.85em; color: #666; background: #f6f6f6; padding: 10px 14px; border-radius: 6px; }
  .post-list a { display: block; padding: 10px 0; border-bottom: 1px solid #eee; text-decoration: none; color: #1a1a1a; font-weight: 600; }
  .post-list time { display: block; font-size: 0.8em; color: #888; font-weight: normal; }
  article h2 { margin-top: 2em; }
  .product { border: 1px solid #e2e2e2; border-radius: 8px; padding: 14px 16px; margin: 14px 0; }
  .product h3 { margin: 0 0 6px; }
  .product a.buy { display: inline-block; margin-top: 8px; font-weight: 600; }
  footer { margin-top: 48px; font-size: 0.8em; color: #888; }
</style>`;

function renderProduct(p) {
  return `<div class="product">
    <h3>${escapeHtml(p.name)}</h3>
    <p>${escapeHtml(p.blurb)}</p>
    ${p.priceNote ? `<p><em>${escapeHtml(p.priceNote)}</em></p>` : ''}
    <a class="buy" href="${amazonLink(p.searchQuery)}" target="_blank" rel="nofollow sponsored noopener">See current options →</a>
  </div>`;
}

function renderPost(post) {
  const sections = post.sections
    .map(
      (s) => `<h2>${escapeHtml(s.heading)}</h2>
      <p>${escapeHtml(s.body)}</p>
      ${(s.products || []).map(renderProduct).join('\n')}`
    )
    .join('\n');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(post.title)} — ${escapeHtml(config.site.title)}</title>
${STYLE}
</head><body>
<header><a href="../index.html">&larr; ${escapeHtml(config.site.title)}</a></header>
<article>
  <h1>${escapeHtml(post.title)}</h1>
  <time>${escapeHtml(post.date)}</time>
  ${DISCLOSURE}
  <p>${escapeHtml(post.intro)}</p>
  ${sections}
  <p>${escapeHtml(post.conclusion)}</p>
</article>
<footer>${escapeHtml(config.site.title)} — automated research &amp; picks, published daily.</footer>
</body></html>`;
}

function renderIndex(posts) {
  const items = posts
    .map(
      (p) =>
        `<a href="posts/${p.slug}.html">${escapeHtml(p.title)}<time>${escapeHtml(p.date)}</time></a>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(config.site.title)}</title>
<meta name="description" content="${escapeHtml(config.site.description)}">
${STYLE}
</head><body>
<header><h1>${escapeHtml(config.site.title)}</h1><p>${escapeHtml(config.site.description)}</p></header>
${DISCLOSURE}
<div class="post-list">
${items || '<p>No posts yet.</p>'}
</div>
<footer>${escapeHtml(config.site.title)} — automated research &amp; picks, published daily.</footer>
</body></html>`;
}

function build() {
  const posts = loadPosts();
  fs.mkdirSync(path.join(config.paths.site, 'posts'), { recursive: true });
  fs.writeFileSync(path.join(config.paths.site, 'index.html'), renderIndex(posts));
  for (const post of posts) {
    fs.writeFileSync(path.join(config.paths.site, 'posts', `${post.slug}.html`), renderPost(post));
  }
  console.log(`Built ${posts.length} post(s) into ${config.paths.site}`);
}

build();
