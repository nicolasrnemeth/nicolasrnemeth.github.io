/**
 * JSON-LD builders. Structured data is the single highest-leverage SEO asset
 * for a personal site: it is what makes Google treat "Nicolas R. Nemeth" as an
 * entity rather than a string, and what feeds knowledge-panel style results.
 */

import { SITE, CONTACT, type Locale } from '@/config/site';
import { absoluteUrl, localePath, LOCALE_TAGS } from '@/i18n/routing';
import { positions, education, projects, skillGroups, type Project } from '@/data/cv';

const PERSON_ID = `${SITE.url}/#person`;
const SITE_ID = `${SITE.url}/#website`;

export function personSchema(locale: Locale) {
  const knowsAbout = skillGroups.flatMap((group) => group.items);

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    givenName: 'Nicolas',
    additionalName: 'R.',
    familyName: 'Nemeth',
    alternateName: 'Nicolas Nemeth',
    url: absoluteUrl(localePath('', locale)),
    jobTitle: SITE.jobTitle,
    description:
      locale === 'de'
        ? 'Senior Software Engineer in Wien, tätig in AI Engineering, Cloud-Architektur und Full-Stack-Entwicklung.'
        : 'Senior Software Engineer in Vienna, working in AI engineering, cloud architecture and full-stack development.',
    email: `mailto:${CONTACT.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'de' ? SITE.location.cityDe : SITE.location.city,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.country,
    },
    nationality: { '@type': 'Country', name: SITE.location.countryName },
    knowsLanguage: [
      { '@type': 'Language', name: 'German', alternateName: 'de' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    knowsAbout,
    sameAs: [CONTACT.linkedin, CONTACT.github],
    worksFor: {
      '@type': 'Organization',
      name: 'PwC Austria',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vienna',
        addressCountry: 'AT',
      },
    },
    hasOccupation: positions
      .filter((p) => p.kind === 'work')
      .map((p) => ({
        '@type': 'Occupation',
        name: p.title[locale],
        occupationLocation: {
          '@type': 'City',
          name: locale === 'de' ? SITE.location.cityDe : SITE.location.city,
        },
      })),
    alumniOf: education.map((e) => ({
      '@type': 'CollegeOrUniversity',
      name: e.institution,
      sameAs: 'https://www.univie.ac.at/',
    })),
    hasCredential: education.map((e) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: e.degree[locale],
      about: e.field[locale],
      recognizedBy: { '@type': 'CollegeOrUniversity', name: e.institution },
    })),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: `${SITE.name}, ${SITE.jobTitle}`,
    inLanguage: LOCALE_TAGS[locale],
    publisher: { '@id': PERSON_ID },
    copyrightHolder: { '@id': PERSON_ID },
  };
}

export function profilePageSchema(locale: Locale, url: string) {
  return {
    '@type': 'ProfilePage',
    '@id': `${url}#profilepage`,
    url,
    name: `${SITE.name}, ${SITE.jobTitle}`,
    inLanguage: LOCALE_TAGS[locale],
    isPartOf: { '@id': SITE_ID },
    about: { '@id': PERSON_ID },
    mainEntity: { '@id': PERSON_ID },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function projectSchema(project: Project, locale: Locale, url: string) {
  const isSoftware = project.category !== 'research';
  return {
    '@type': isSoftware ? 'SoftwareSourceCode' : 'ScholarlyArticle',
    '@id': `${url}#project`,
    name: project.title[locale],
    headline: project.title[locale],
    url,
    abstract: project.tagline[locale],
    description: project.tagline[locale],
    inLanguage: LOCALE_TAGS[locale],
    dateCreated: project.year,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    isPartOf: { '@id': SITE_ID },
    keywords: project.stack.join(', '),
    ...(isSoftware ? { programmingLanguage: project.stack.filter((s) => /python|c#|typescript|sql/i.test(s)) } : {}),
  };
}

export function collectionPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  locale: Locale;
}) {
  return {
    '@type': 'CollectionPage',
    '@id': `${opts.url}#collection`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: LOCALE_TAGS[opts.locale],
    isPartOf: { '@id': SITE_ID },
    about: { '@id': PERSON_ID },
  };
}

export function itemListSchema(urls: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: urls.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      url: entry.url,
    })),
  };
}

/** Wraps nodes into a single @graph document, one script tag per page. */
export function graph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export { PERSON_ID, SITE_ID };

/** Convenience: the project index used by ItemList on the projects page. */
export function allProjectEntries(locale: Locale, basePath: string) {
  return projects.map((p) => ({
    name: p.title[locale],
    url: absoluteUrl(`${basePath}${locale === 'de' ? p.slugDe : p.slug}/`),
  }));
}
