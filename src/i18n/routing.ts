import { SITE, type Locale } from '@/config/site';
import { projects, projectSlug } from '@/data/cv';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALES: readonly Locale[] = SITE.locale.supported;

/** Full BCP 47 tags used for `lang`, hreflang and Open Graph locale. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en',
  de: 'de-AT',
};

export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_AT',
};

/** Derives the active locale from the current URL. */
export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return LOCALES.includes(first as Locale) ? (first as Locale) : DEFAULT_LOCALE;
}

/**
 * Builds a locale-aware absolute path.
 * `localePath('projects', 'de')` -> `/de/projekte`
 */
export function localePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const segment = clean === '' ? '' : `${translateSegments(clean, locale)}/`;
  const prefix = locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
  return `${prefix}${segment}`;
}

/** German URLs use German words, which reads better for German-language search queries. */
const SEGMENT_MAP: Record<string, Record<Locale, string>> = {
  projects: { en: 'projects', de: 'projekte' },
};

function translateSegments(path: string, locale: Locale): string {
  return path
    .split('/')
    .map((segment) => SEGMENT_MAP[segment]?.[locale] ?? segment)
    .join('/');
}

/**
 * Absolute URL for canonical tags, Open Graph and JSON-LD.
 * Always trailing-slashed so canonicals, hreflang and the generated sitemap
 * all agree on one form of every URL.
 */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (clean.endsWith('/')) return `${SITE.url}${clean}`;
  // File paths keep their exact form: appending a slash to /og/og-default.png
  // would produce a URL that 404s for every social share preview.
  const lastSegment = clean.split('/').pop() ?? '';
  return `${SITE.url}${lastSegment.includes('.') ? clean : `${clean}/`}`;
}

export interface AlternateLink {
  locale: Locale;
  hreflang: string;
  href: string;
}

/**
 * Every page declares which route it is, so hreflang alternates can be built
 * correctly rather than guessed from the URL.
 */
export type RouteId =
  | { kind: 'home' }
  | { kind: 'projects' }
  | { kind: 'project'; slug: string }
  | { kind: 'none' };

export function pathForRoute(route: RouteId, locale: Locale): string | null {
  switch (route.kind) {
    case 'home':
      return localePath('', locale);
    case 'projects':
      return localePath('projects', locale);
    case 'project': {
      const project = projects.find((p) => p.slug === route.slug);
      if (!project) return null;
      return `${localePath('projects', locale)}${projectSlug(project, locale)}/`;
    }
    default:
      return null;
  }
}

export function buildAlternates(route: RouteId): AlternateLink[] {
  if (route.kind === 'none') return [];
  const links: AlternateLink[] = [];
  for (const locale of LOCALES) {
    const path = pathForRoute(route, locale);
    if (!path) continue;
    links.push({ locale, hreflang: LOCALE_TAGS[locale], href: absoluteUrl(path) });
  }
  const defaultPath = pathForRoute(route, DEFAULT_LOCALE);
  if (defaultPath) {
    links.push({ locale: DEFAULT_LOCALE, hreflang: 'x-default', href: absoluteUrl(defaultPath) });
  }
  return links;
}
