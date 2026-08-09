// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep in sync with src/config/site.ts (astro.config cannot import TS path aliases).
const SITE_URL = 'https://nicolasrnemeth.github.io';

export default defineConfig({
  site: SITE_URL,
  // Static output: every route is pre-rendered to HTML at build time.
  output: 'static',
  // One canonical form for every URL: with a trailing slash, matching the
  // directory build output and the generated sitemap.
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      // English lives at `/`, German at `/de/`. Cleanest canonical structure
      // for a .com domain with an English-primary audience.
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          de: 'de-AT',
        },
      },
      // The 404 page should not appear in the sitemap.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
  build: {
    // Emit `about/index.html` rather than `about.html` for clean URLs.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
