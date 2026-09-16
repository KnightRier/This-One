// content-engine config — one place for the things that change per-run or per-deploy.
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  niche: {
    name: 'Apartment & Small-Space Gardening',
    slug: 'apartment-gardening',
    description:
      'Practical, genuinely-researched gear picks for growing plants, herbs, and vegetables in apartments and small spaces — hydroponics, grow lights, self-watering kits, vertical setups.',
  },

  // Set via env so the affiliate ID never gets committed to a public repo.
  // export AMAZON_ASSOCIATE_TAG=yourtag-20
  amazonAssociateTag: process.env.AMAZON_ASSOCIATE_TAG || null,

  site: {
    title: 'Small Space Grow',
    description: 'Real gear picks for apartment and small-space gardening, researched fresh daily.',
    baseUrl: process.env.SITE_BASE_URL || '', // e.g. https://<user>.github.io/<repo>
  },

  paths: {
    posts: path.join(__dirname, 'posts'),
    site: path.join(__dirname, 'docs'),
  },
};
