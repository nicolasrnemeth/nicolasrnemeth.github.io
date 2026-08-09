import type { Locale } from '@/config/site';

/** Every user-facing string that is not CV content. */
export const ui = {
  en: {
    'lang.name': 'English',
    'lang.switch': 'Zur deutschen Version wechseln',
    'lang.switchShort': 'DE',

    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'nav.skipToContent': 'Skip to content',

    'theme.toggle': 'Toggle colour theme',

    'hero.eyebrow': 'Vienna, Austria',
    'hero.role': 'Senior Software Engineer, AI & Cloud',
    'hero.lead':
      'I work on AI, software and cloud systems, usually from the first concept through to running them in production.',
    'hero.ctaProjects': 'View projects',
    'hero.ctaContact': 'Get in touch',
    'hero.portraitAlt': 'Portrait of Nicolas R. Nemeth',


    'about.title': 'About',
    'about.kicker': 'A short background',
    'about.p1':
      'I started out in molecular biology and moved into computational science. That route shaped how I work: read the system carefully, form a hypothesis, then build the smallest thing that tests it.',
    'about.p2':
      'At PwC Austria the work spans AI engineering, backend systems and cloud architecture, and which of those I am doing depends on the project. What stays constant is the contact with product owners and with the people who end up using what I build.',
    'about.p3':
      'Before that I spent a year and a half on a transport and warehouse management system, where I built the first machine learning features to ship in the product.',
    'about.p4':
      'I work in English and German.',

    'experience.title': 'Experience',
    'experience.kicker': 'Roles and positions',
    'experience.present': 'Present',
    'range.to': 'to',
    'experience.research': 'Research & internships',
    'experience.stack': 'Stack',

    'projects.title': 'Projects',
    'projects.kicker': 'Selected projects',
    'projects.all': 'All projects',
    'projects.readMore': 'Read more',
    'projects.back': 'All projects',
    'projects.context': 'Context',
    'projects.outcomes': 'Outcomes',
    'projects.stack': 'Stack',
    'projects.year': 'Year',
    'projects.note':
      'Commercial project work is described without product, client or internal tool names. Academic and research work is named in full.',
    'projects.filter.all': 'All',
    'projects.filter.ai': 'AI & ML',
    'projects.filter.engineering': 'Engineering',
    'projects.filter.research': 'Research',
    'projects.metaTitle': 'Projects',
    'projects.seoTitle': 'Projects in AI, Software and Research',
    'projects.metaDescription':
      'Software, AI and research projects by Nicolas R. Nemeth: regulatory tax reporting, invoice automation, document understanding and computational biology.',

    'education.title': 'Education',
    'education.kicker': 'Degrees and certificates',
    'education.certifications': 'Certifications',
    'education.skills': 'Skills',

    'contact.title': 'Contact',
    'contact.kicker': 'Get in touch',
    'contact.lead':
      'The quickest way to reach me is by email. I am also on LinkedIn.',
    'contact.emailLabel': 'Email',
    'contact.location': 'Based in Vienna, Austria.',

    'footer.built': 'Built with Astro. No trackers.',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top',

    '404.title': 'Page not found',
    '404.lead': 'That page does not exist, or it has moved. Head back to the home page to find what you were looking for.',
    '404.cta': 'Return home',
  },

  de: {
    'lang.name': 'Deutsch',
    'lang.switch': 'Switch to the English version',
    'lang.switchShort': 'EN',

    'nav.about': 'Über mich',
    'nav.experience': 'Erfahrung',
    'nav.projects': 'Projekte',
    'nav.education': 'Ausbildung',
    'nav.contact': 'Kontakt',
    'nav.home': 'Startseite',
    'nav.menu': 'Menü',
    'nav.close': 'Menü schließen',
    'nav.skipToContent': 'Zum Inhalt springen',

    'theme.toggle': 'Farbschema umschalten',

    'hero.eyebrow': 'Wien, Österreich',
    'hero.role': 'Senior Software Engineer, AI & Cloud',
    'hero.lead':
      'Ich arbeite an AI-, Software- und Cloud-Systemen, meist vom ersten Konzept bis zum Betrieb.',
    'hero.ctaProjects': 'Projekte ansehen',
    'hero.ctaContact': 'Kontakt aufnehmen',
    'hero.portraitAlt': 'Porträt von Nicolas R. Nemeth',


    'about.title': 'Über mich',
    'about.kicker': 'Kurz zum Hintergrund',
    'about.p1':
      'Ich habe in der Molekularbiologie begonnen und bin danach in die Computational Science gewechselt. Dieser Weg prägt meine Arbeitsweise: das System genau lesen, eine Hypothese bilden und dann das Kleinste bauen, das sie überprüft.',
    'about.p2':
      'Bei PwC Austria reicht die Arbeit von AI Engineering über Backend-Systeme bis zur Cloud-Architektur, und was davon gerade ansteht, hängt vom Projekt ab. Gleich bleibt der enge Kontakt zu Product Ownern und zu den Menschen, die am Ende damit arbeiten.',
    'about.p3':
      'Davor war ich eineinhalb Jahre bei einem Transport- und Lagerverwaltungssystem und habe dort die ersten Machine-Learning-Funktionen gebaut, die es ins Produkt geschafft haben.',
    'about.p4':
      'Ich arbeite auf Deutsch und Englisch.',

    'experience.title': 'Erfahrung',
    'experience.kicker': 'Stationen und Positionen',
    'experience.present': 'heute',
    'range.to': 'bis',
    'experience.research': 'Forschung & Praktika',
    'experience.stack': 'Technologien',

    'projects.title': 'Projekte',
    'projects.kicker': 'Ausgewählte Projekte',
    'projects.all': 'Alle Projekte',
    'projects.readMore': 'Mehr lesen',
    'projects.back': 'Alle Projekte',
    'projects.context': 'Kontext',
    'projects.outcomes': 'Ergebnisse',
    'projects.stack': 'Technologien',
    'projects.year': 'Jahr',
    'projects.note':
      'Kommerzielle Projektarbeit wird ohne Produkt-, Kunden- oder interne Werkzeugnamen beschrieben. Wissenschaftliche Arbeiten sind vollständig benannt.',
    'projects.filter.all': 'Alle',
    'projects.filter.ai': 'AI & ML',
    'projects.filter.engineering': 'Engineering',
    'projects.filter.research': 'Forschung',
    'projects.metaTitle': 'Projekte',
    'projects.seoTitle': 'Projekte aus AI, Software und Forschung',
    'projects.metaDescription':
      'Software-, AI- und Forschungsprojekte von Nicolas R. Nemeth: regulatorisches Steuerreporting, Rechnungsautomatisierung, Datenextraktion aus Dokumenten und Computational Biology.',

    'education.title': 'Ausbildung',
    'education.kicker': 'Abschlüsse und Zertifikate',
    'education.certifications': 'Zertifikate',
    'education.skills': 'Kompetenzen',

    'contact.title': 'Kontakt',
    'contact.kicker': 'Kontakt aufnehmen',
    'contact.lead':
      'Am schnellsten erreichen Sie mich per E-Mail. Sie finden mich außerdem auf LinkedIn.',
    'contact.emailLabel': 'E-Mail',
    'contact.location': 'Ansässig in Wien, Österreich.',

    'footer.built': 'Gebaut mit Astro. Keine Tracker.',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.backToTop': 'Nach oben',

    '404.title': 'Seite nicht gefunden',
    '404.lead': 'Diese Seite existiert nicht oder wurde verschoben. Zurück zur Startseite, um weiterzukommen.',
    '404.cta': 'Zur Startseite',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

/** Returns a translation function bound to a locale, falling back to English. */
export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return (ui[locale] as Record<string, string>)[key] ?? ui.en[key];
  };
}
