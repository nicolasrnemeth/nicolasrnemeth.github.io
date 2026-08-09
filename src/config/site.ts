/**
 * Single source of truth for everything that is deployment- or identity-specific.
 * Change the domain here and every canonical URL, hreflang alternate, sitemap entry,
 * Open Graph tag and JSON-LD node follows automatically.
 */

export const SITE = {
  /**
   * No trailing slash. Used for canonical URLs, sitemap, OG tags and JSON-LD.
   * This is a GitHub Pages user site, so the host is fixed by the account name:
   * the repository must be named `nicolasrnemeth.github.io` to serve at the root.
   */
  url: 'https://nicolasrnemeth.github.io',
  name: 'Nicolas R. Nemeth',
  jobTitle: 'Senior Software Engineer, AI & Cloud',
  /** Shown in the footer and used for the copyright line. */
  since: 2026,
  locale: {
    default: 'en',
    supported: ['en', 'de'],
  },
  location: {
    city: 'Vienna',
    cityDe: 'Wien',
    region: 'Vienna',
    country: 'AT',
    countryName: 'Austria',
    countryNameDe: 'Österreich',
  },
} as const;

export const CONTACT = {
  /** Rendered obfuscated in markup and reassembled client-side to reduce scraping. */
  email: 'nicolas.r.nemeth@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nicolasrnemeth',
  github: 'https://github.com/nicolasrnemeth',
} as const;

/**
 * The portrait lives at `public/images/portrait.jpg`, square and 400x400.
 * Set to false to fall back to the CSS orbit mark in the hero.
 */
export const HAS_PORTRAIT = true;
export const PORTRAIT_SRC = '/images/portrait.jpg';

export type Locale = (typeof SITE.locale.supported)[number];
