/**
 * Structured CV content, bilingual (en / de).
 *
 * ANONYMISATION POLICY
 * --------------------
 * - Employers and job titles are named (experience timeline).
 * - Commercial project work is described generically: no product names,
 *   no client names, no internal tool names.
 * - Academic and research work (university, CUBE, Max Perutz Labs, GMI) is
 *   named in full, since it is published or publicly attributable work.
 * - One exception, explicitly requested: the 2023 hackathon project keeps its
 *   public press link.
 *
 * TONE
 * ----
 * Plain and factual. Describe what the work was and what came of it. No
 * superlatives, no selling, and only as much technical detail as a reader
 * needs to understand the shape of the problem.
 */

import type { Locale } from '@/config/site';

export type I18nText = Record<Locale, string>;
export type I18nList = Record<Locale, string[]>;

export interface Position {
  slug: string;
  org: string;
  orgNote?: I18nText;
  title: I18nText;
  kind: 'work' | 'research' | 'education';
  start: string; // ISO yyyy-mm
  end: string | null; // null = present
  location: I18nText;
  summary: I18nText;
  highlights: I18nList;
  stack?: string[];
}

export interface Project {
  slug: string;
  /** German slug so the /de/ routes read naturally and rank for German queries. */
  slugDe: string;
  title: I18nText;
  /** One line for cards and meta descriptions. */
  tagline: I18nText;
  /** Body of the project page. Each string is a paragraph. */
  body: I18nList;
  context: I18nText;
  year: string;
  category: 'ai' | 'engineering' | 'research';
  stack: string[];
  outcomes: I18nList;
  link?: { href: string; label: I18nText };
  featured: boolean;
}

export interface Education {
  slug: string;
  degree: I18nText;
  field: I18nText;
  institution: string;
  start: string;
  end: string;
  detail: I18nList;
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const positions: Position[] = [
  {
    slug: 'pwc-austria',
    org: 'PwC Austria',
    kind: 'work',
    title: {
      en: 'Senior Software Engineer, AI & Cloud',
      de: 'Senior Software Engineer, AI & Cloud',
    },
    start: '2024-05',
    end: null,
    location: { en: 'Vienna, Austria', de: 'Wien, Österreich' },
    summary: {
      en: 'I work across AI engineering, software engineering and cloud architecture, taking on whichever role a project needs. Most of my work runs from the first technical concept through to deployment on Azure.',
      de: 'Ich arbeite an der Schnittstelle von AI Engineering, Software Engineering und Cloud-Architektur und übernehme jeweils die Rolle, die ein Projekt gerade braucht. Meist reicht die Arbeit vom ersten technischen Konzept bis zum Deployment auf Azure.',
    },
    highlights: {
      en: [
        'Took technical responsibility for a client project through to its production rollout.',
        'Led the development of an internal web application for master data governance and access rights management, including integrations with several external systems and a set of background services.',
        'Advise product owners and internal stakeholders on technical decisions, and translate business requirements into specifications.',
      ],
      de: [
        'Technische Verantwortung für ein Kundenprojekt bis in den Produktivbetrieb.',
        'Leitung der Entwicklung einer internen Webanwendung für Stammdaten-Governance und Berechtigungsverwaltung, inklusive Anbindung mehrerer externer Systeme und einiger Hintergrunddienste.',
        'Beratung von Product Ownern und internen Stakeholdern bei technischen Entscheidungen sowie Übersetzung fachlicher Anforderungen in Spezifikationen.',
      ],
    },
    stack: ['Azure', 'C#/.NET', 'Python', 'TypeScript', 'React', 'Angular', 'SQL', 'LLM/RAG', 'CI/CD'],
  },
  {
    slug: 'translogica',
    org: 'Translogica GmbH',
    kind: 'work',
    title: {
      en: 'Software Engineer & AI Engineer',
      de: 'Software Engineer & AI Engineer',
    },
    start: '2022-11',
    end: '2024-04',
    location: { en: 'Vienna, Austria', de: 'Wien, Österreich' },
    summary: {
      en: 'Feature lead on a transport and warehouse management system, responsible for delivering features end to end and coordinating with customers and stakeholders. I also built the first machine learning features in the product.',
      de: 'Feature Lead für ein Transport- und Lagerverwaltungssystem, verantwortlich für die Umsetzung von Features von Anfang bis Ende und für die Abstimmung mit Kundinnen, Kunden und Stakeholdern. Außerdem habe ich die ersten Machine-Learning-Funktionen im Produkt gebaut.',
    },
    highlights: {
      en: [
        'Developed features, API integrations and telematics integrations for the transport and warehouse management system, working in C#, T-SQL, WCF and WinForms.',
        'Developed features for a mobile hand scanner application in TypeScript, Angular and Ionic.',
        'Wrote a Visual Studio extension for centralised file locking on top of Git LFS. It prevented concurrent edits to designer files, which was a prerequisite for moving the organisation from TFS to Git.',
        'Built a tool that extracts data from transport order documents using a fine-tuned model combined with OCR, with the results written to the database (early 2023).',
        'Worked on two AI projects that were shown at logistics trade fairs. One of them won the company hackathon in 2023.',
      ],
      de: [
        'Umsetzung von Features, API-Integrationen und Telematik-Anbindungen für das Transport- und Lagerverwaltungssystem, in C#, T-SQL, WCF und WinForms.',
        'Umsetzung von Features für eine mobile Handscanner-Anwendung in TypeScript, Angular und Ionic.',
        'Entwicklung einer Visual-Studio-Extension für zentrales File-Locking auf Basis von Git LFS. Sie verhinderte gleichzeitige Änderungen an Designer-Dateien, was Voraussetzung für die Umstellung von TFS auf Git war.',
        'Entwicklung eines Werkzeugs, das Daten aus Transportauftragsdokumenten ausliest, mit einem nachtrainierten Modell in Kombination mit OCR und automatischer Speicherung in der Datenbank (Anfang 2023).',
        'Mitarbeit an zwei AI-Projekten, die auf Logistikmessen gezeigt wurden. Eines davon gewann den Firmen-Hackathon 2023.',
      ],
    },
    stack: ['C#', 'T-SQL', 'WCF', 'WinForms', 'TypeScript', 'Angular', 'Ionic', 'Python', 'OCR'],
  },
  {
    slug: 'cube-university-of-vienna',
    org: 'CUBE, Division of Computational Systems Biology, University of Vienna',
    kind: 'research',
    title: { en: 'Project Internship', de: 'Projektpraktikum' },
    start: '2022-06',
    end: '2022-10',
    location: { en: 'Vienna, Austria', de: 'Wien, Österreich' },
    summary: {
      en: 'Rebuilt Effective T3, a tool for predicting type 3 secretion system effector proteins, and packaged it as a pip-installable Python project.',
      de: 'Neuentwicklung von Effective T3, einem Werkzeug zur Vorhersage von Effektorproteinen des Typ-3-Sekretionssystems, ausgeliefert als pip-installierbares Python-Projekt.',
    },
    highlights: {
      en: [
        'Reached prediction quality comparable to the existing tool Bastion3, with shorter computation time and better generalisation to unseen data.',
        'Packaged so that other research groups can install and run it directly.',
      ],
      de: [
        'Erreichte eine Vorhersagegüte vergleichbar mit dem bestehenden Werkzeug Bastion3, bei kürzerer Rechenzeit und besserer Generalisierung auf ungesehene Daten.',
        'So verpackt, dass andere Forschungsgruppen es direkt installieren und nutzen können.',
      ],
    },
    stack: ['Python', 'scikit-learn', 'Bioinformatics'],
  },
  {
    slug: 'gregor-mendel-institute',
    org: 'Gregor Mendel Institute',
    kind: 'research',
    title: { en: 'Summer Internship', de: 'Sommerpraktikum' },
    start: '2020-08',
    end: '2020-09',
    location: { en: 'Vienna, Austria', de: 'Wien, Österreich' },
    summary: {
      en: 'Protein harvesting and batch purification of His- and Strep-tagged histones.',
      de: 'Proteingewinnung und Batch-Aufreinigung His- und Strep-getaggter Histone.',
    },
    highlights: { en: [], de: [] },
  },
  {
    slug: 'max-perutz-labs',
    org: 'Max Perutz Labs Vienna',
    kind: 'research',
    title: { en: 'Research Internship', de: 'Forschungspraktikum' },
    start: '2019-07',
    end: '2019-11',
    location: { en: 'Vienna, Austria', de: 'Wien, Österreich' },
    summary: {
      en: 'Studied the interaction between the proteins IRE1 and BiP, which are involved in the Unfolded Protein Response, a quality control pathway of the endoplasmic reticulum.',
      de: 'Untersuchung der Interaktion zwischen den Proteinen IRE1 und BiP, die an der Unfolded Protein Response beteiligt sind, einem Qualitätskontrollmechanismus des endoplasmatischen Retikulums.',
    },
    highlights: { en: [], de: [] },
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    slug: 'regulatory-tax-reporting',
    slugDe: 'regulatorisches-steuerreporting',
    year: '2024',
    category: 'engineering',
    featured: true,
    title: {
      en: 'Regulatory tax reporting for banks',
      de: 'Regulatorisches Steuerreporting für Banken',
    },
    tagline: {
      en: 'A system that turns raw account data from banks into a recurring statutory tax filing, submitted directly to the tax authority. In production for over two years.',
      de: 'Ein System, das Rohdaten von Banken in eine wiederkehrende gesetzliche Steuermeldung überführt und direkt an die Finanzverwaltung übermittelt. Seit über zwei Jahren im Produktivbetrieb.',
    },
    context: {
      en: 'Client project at PwC Austria, from the first concept through to production',
      de: 'Kundenprojekt bei PwC Österreich, vom ersten Konzept bis in den Produktivbetrieb',
    },
    body: {
      en: [
        'Banks have to file a recurring tax declaration covering large volumes of account data. Each institution keeps that data in its own format, so preparing a filing meant reformatting and cross-checking by hand. It is slow work, and an error is not just inconvenient: it is a regulatory problem.',
        'The system takes each institution\'s files as they are, checks them against the rules that apply, produces the official submission format and files it with the tax authority. Every change to a declaration is recorded, so a submission can still be explained months later during an audit.',
        'Across that time and several institutions, it has filed with 100% reporting accuracy. The clients have been notably satisfied with it.',
      ],
      de: [
        'Banken müssen eine wiederkehrende Steuermeldung über große Mengen an Kontodaten abgeben. Jedes Institut hält diese Daten in einem eigenen Format, weshalb eine Meldung von Hand aufbereitet und gegengeprüft werden musste. Das ist langsam, und ein Fehler ist nicht bloß lästig, sondern ein regulatorisches Problem.',
        'Das System übernimmt die Dateien jedes Instituts so, wie sie vorliegen, prüft sie gegen die geltenden Regeln, erzeugt das offizielle Übermittlungsformat und reicht es bei der Finanzverwaltung ein. Jede Änderung an einer Meldung wird protokolliert, sodass eine Übermittlung auch Monate später in einer Prüfung noch nachvollziehbar ist.',
        'In dieser Zeit hat es bei mehreren Instituten mit 100 % Meldegenauigkeit gemeldet. Die Kunden sind damit ausgesprochen zufrieden.',
      ],
    },
    stack: ['C#', '.NET', 'ASP.NET Core', 'PostgreSQL', 'Azure', 'SOAP', 'Docker'],
    outcomes: {
      en: [
        'Over two years in production at several institutions with 100% reporting accuracy.',
        'Each institution keeps its own data format; no manual reformatting.',
        'Every change stays traceable for later audits.',
      ],
      de: [
        'Über zwei Jahre im Produktivbetrieb bei mehreren Instituten, mit 100 % Meldegenauigkeit.',
        'Jedes Institut behält sein eigenes Datenformat, ohne manuelle Aufbereitung.',
        'Jede Änderung bleibt für spätere Prüfungen nachvollziehbar.',
      ],
    },
  },
  {
    slug: 'engagement-and-access-management',
    slugDe: 'auftrags-und-berechtigungsverwaltung',
    year: '2025',
    category: 'engineering',
    featured: true,
    title: {
      en: 'Engagement and access management platform',
      de: 'Plattform für Auftrags- und Berechtigungsverwaltung',
    },
    tagline: {
      en: 'A firm-wide internal platform for setting up client engagements and managing who may access what, replacing an older system.',
      de: 'Eine unternehmensweite interne Plattform, um Kundenaufträge anzulegen und Zugriffsrechte zu verwalten, als Ablöse eines älteren Systems.',
    },
    context: {
      en: 'Internal product at PwC Austria, used across the firm',
      de: 'Internes Produkt bei PwC Österreich, unternehmensweit im Einsatz',
    },
    body: {
      en: [
        'Setting up a client engagement used to touch several systems in turn: create the engagement, request access for the people on it, set up a workspace for the documents, and repeat much of that whenever someone joined or left. The steps were well understood but spread out, which made them easy to get wrong and hard to audit afterwards.',
        'The platform puts all of it in one place. An engagement is created once, access is requested and approved in a defined workflow, and the document workspace is provisioned automatically. Behind that, background services pull continuously from source systems such as SAP and Salesforce, so staff changes and permissions stay current without anyone maintaining them by hand.',
        'It is in use across the whole firm, by several hundred people. I built both sides of it, the backend services and the web frontend.',
      ],
      de: [
        'Einen Kundenauftrag anzulegen betraf bisher mehrere Systeme nacheinander: Auftrag anlegen, Zugriffe für die beteiligten Personen beantragen, einen Arbeitsbereich für die Dokumente einrichten und vieles davon wiederholen, sobald jemand dazukam oder ausschied. Die Schritte waren bekannt, aber verteilt, dadurch fehleranfällig und im Nachhinein schwer prüfbar.',
        'Die Plattform führt das an einer Stelle zusammen. Ein Auftrag wird einmal angelegt, Zugriffe werden in einem definierten Workflow beantragt und freigegeben, der Dokumenten-Arbeitsbereich entsteht automatisch. Dahinter beziehen Hintergrunddienste laufend Daten aus Quellsystemen wie SAP und Salesforce, sodass Personalwechsel und Berechtigungen aktuell bleiben, ohne dass sie jemand von Hand pflegt.',
        'Die Plattform ist im gesamten Unternehmen im Einsatz und wird von mehreren hundert Personen genutzt. Ich habe beide Seiten umgesetzt, die Backend-Dienste und das Web-Frontend.',
      ],
    },
    stack: ['C#', '.NET', 'PostgreSQL', 'Angular', 'TypeScript', 'Azure', 'SAP', 'Salesforce', 'Docker'],
    outcomes: {
      en: [
        'In use across the whole firm, by several hundred people.',
        'One workflow in place of steps previously spread across several systems.',
        'Data from source systems such as SAP and Salesforce is ingested continuously, so permissions and staff changes stay current.',
        'Access decisions are recorded and can be reviewed later.',
      ],
      de: [
        'Im gesamten Unternehmen im Einsatz, genutzt von mehreren hundert Personen.',
        'Ein Workflow statt Schritten, die zuvor über mehrere Systeme verteilt waren.',
        'Daten aus Quellsystemen wie SAP und Salesforce werden laufend übernommen, sodass Berechtigungen und Personalwechsel aktuell bleiben.',
        'Zugriffsentscheidungen werden protokolliert und sind später nachvollziehbar.',
      ],
    },
  },
  {
    slug: 'invoice-booking-suggestions',
    slugDe: 'buchungsvorschlaege-fuer-eingangsrechnungen',
    year: '2026',
    category: 'ai',
    featured: true,
    title: {
      en: 'Booking suggestions for incoming invoices',
      de: 'Buchungsvorschläge für Eingangsrechnungen',
    },
    tagline: {
      en: 'A system that reads an incoming invoice and proposes the accounting fields for it, so an accountant confirms a suggestion instead of looking each one up.',
      de: 'Ein System, das eine Eingangsrechnung liest und die Buchungsfelder dazu vorschlägt, sodass ein Vorschlag bestätigt statt jedes Feld einzeln herausgesucht wird.',
    },
    context: {
      en: 'Client project at PwC Austria',
      de: 'Kundenprojekt bei PwC Österreich',
    },
    body: {
      en: [
        'Every incoming invoice needs accounts and cost centres assigned before it can be booked. Most of them closely resemble something booked before, but finding that earlier invoice takes longer than the booking itself, so the work stays manual and repetitive.',
        'The system reads each invoice, summarises what it is for, and compares it against invoices that were booked in the past. When the match is clear enough it proposes the fields; when it is not, it stays quiet rather than guessing, because a wrong suggestion that gets confirmed costs more than no suggestion at all.',
        'It also checks its own work: each night it compares what it proposed against what was actually booked, so accuracy is measured rather than assumed. On that measure, more than 85 percent of top-ranked suggestions are accepted as they are, and more than 90 percent once the alternatives below them are counted. Booking an invoice now takes about half the time it did before.',
      ],
      de: [
        'Jede Eingangsrechnung braucht Konten und Kostenstellen, bevor sie gebucht werden kann. Die meisten ähneln stark einer früher gebuchten Rechnung, aber diese frühere Rechnung zu finden dauert länger als die Buchung selbst. Die Arbeit bleibt dadurch manuell und repetitiv.',
        'Das System liest jede Rechnung, fasst zusammen, worum es geht, und vergleicht sie mit früher gebuchten Rechnungen. Ist die Übereinstimmung deutlich genug, schlägt es die Felder vor; ist sie es nicht, bleibt es lieber still, statt zu raten, denn ein falscher Vorschlag, der bestätigt wird, kostet mehr als gar kein Vorschlag.',
        'Es prüft außerdem seine eigene Arbeit: Jede Nacht vergleicht es die Vorschläge mit dem, was tatsächlich gebucht wurde, sodass die Treffergenauigkeit gemessen und nicht angenommen wird. Nach dieser Messung werden mehr als 85 Prozent der erstgereihten Vorschläge unverändert übernommen und mehr als 90 Prozent, wenn die nachgereihten Alternativen mitgezählt werden. Eine Rechnung zu buchen dauert heute etwa halb so lange wie zuvor.',
      ],
    },
    stack: ['Python', 'FastAPI', 'Azure OpenAI', 'Embeddings', 'pgvector', 'PostgreSQL', 'OCR', 'Terraform'],
    outcomes: {
      en: [
        'Over 85 percent of top-ranked suggestions accepted as they are, over 90 percent including the alternatives below them.',
        'Roughly half the time per invoice compared with assigning the fields by hand.',
        'Suggestions are checked nightly against what was actually booked.',
        'No suggestion is made when the match is not clear enough.',
      ],
      de: [
        'Über 85 Prozent der erstgereihten Vorschläge werden unverändert übernommen, über 90 Prozent samt nachgereihter Alternativen.',
        'Etwa die Hälfte der Zeit je Rechnung gegenüber der händischen Zuordnung.',
        'Vorschläge werden jede Nacht mit den tatsächlichen Buchungen abgeglichen.',
        'Ist die Übereinstimmung nicht deutlich genug, wird kein Vorschlag gemacht.',
      ],
    },
  },
  {
    slug: 'contract-metadata-extraction',
    slugDe: 'metadatenextraktion-aus-vertragsdokumenten',
    year: '2026',
    category: 'ai',
    featured: true,
    title: {
      en: 'Metadata extraction from contract documents',
      de: 'Metadatenextraktion aus Vertragsdokumenten',
    },
    tagline: {
      en: 'A pipeline that reads contract documents and pulls out around forty structured fields, turning a folder of PDFs into something you can search and filter.',
      de: 'Eine Verarbeitungsstrecke, die Vertragsdokumente liest und rund vierzig strukturierte Felder ausliest, sodass aus einem Ordner voller PDFs eine durchsuchbare Liste wird.',
    },
    context: {
      en: 'Internal product at PwC Austria',
      de: 'Internes Produkt bei PwC Österreich',
    },
    body: {
      en: [
        'The contracts existed as PDFs in a document store. Answering a question like which agreements contain a particular clause or run past a certain date meant opening them one at a time, so in practice those questions went unasked.',
        'The pipeline reads each document, extracts around forty fields into a structured record, and hands them to a search interface where the collection can be filtered. Documents run from one to a hundred pages and are processed in well under a minute; measured against manual checks, field accuracy sits above 95 percent.',
        'Documents that cannot be read are set aside for a person to look at rather than silently dropped, which matters when the source of truth is a contract.',
      ],
      de: [
        'Die Verträge lagen als PDFs in einer Dokumentenablage. Eine Frage wie, welche Vereinbarungen eine bestimmte Klausel enthalten oder über ein bestimmtes Datum hinauslaufen, hätte bedeutet, sie einzeln zu öffnen. In der Praxis wurden solche Fragen deshalb gar nicht gestellt.',
        'Die Verarbeitungsstrecke liest jedes Dokument, extrahiert rund vierzig Felder in einen strukturierten Datensatz und übergibt sie an eine Suchoberfläche, in der sich der Bestand filtern lässt. Die Dokumente umfassen eine bis hundert Seiten und werden in deutlich unter einer Minute verarbeitet; gegen manuelle Kontrollen gemessen liegt die Feldgenauigkeit über 95 Prozent.',
        'Dokumente, die nicht gelesen werden können, werden zur manuellen Prüfung zurückgelegt statt stillschweigend verworfen, was wichtig ist, wenn ein Vertrag die maßgebliche Quelle ist.',
      ],
    },
    stack: ['Python', 'Azure Functions', 'Azure OpenAI', 'OCR', 'Azure SQL', 'Terraform'],
    outcomes: {
      en: [
        'Around forty fields per document, above 95 percent accuracy against manual checks.',
        'Documents of one to a hundred pages processed in under a minute.',
        'Unreadable documents go to a person instead of being dropped.',
      ],
      de: [
        'Rund vierzig Felder je Dokument, über 95 Prozent Genauigkeit gegenüber manuellen Kontrollen.',
        'Dokumente von einer bis hundert Seiten in unter einer Minute verarbeitet.',
        'Nicht lesbare Dokumente gehen zur Prüfung an eine Person, statt verworfen zu werden.',
      ],
    },
  },
  {
    slug: 'tax-knowledge-assistant',
    slugDe: 'assistent-fuer-steuerliches-fachwissen',
    year: '2025',
    category: 'ai',
    featured: true,
    title: {
      en: 'Assistant for tax knowledge sources',
      de: 'Assistent für steuerliches Fachwissen',
    },
    tagline: {
      en: 'A question-answering assistant over a large body of tax material that cites its sources, so every answer can be checked before it is used.',
      de: 'Ein Frage-Antwort-Assistent für einen großen Bestand an Steuerfachinformationen, der seine Quellen angibt, sodass jede Antwort vor der Verwendung überprüfbar ist.',
    },
    context: {
      en: 'Internal product at PwC Austria',
      de: 'Internes Produkt bei PwC Österreich',
    },
    body: {
      en: [
        'Tax guidance is spread across many jurisdictions and publications. Finding the passage that actually applies to a question takes time, and an answer that cannot be traced back to a source is of no use in advisory work, however well phrased it is.',
        'The assistant answers questions in plain language and shows the passages it used, linking back to the original publication. Retrieval combines a map of tax concepts and jurisdictions with semantic search, which is what makes it possible to keep an answer inside the right jurisdiction instead of returning something that reads plausibly but applies elsewhere.',
        'The citations are the point of it. An advisor checks the source before relying on the answer, which is the same thing they would do with a colleague.',
      ],
      de: [
        'Steuerliches Fachwissen verteilt sich über viele Länder und Publikationen. Die Passage zu finden, die auf eine Frage tatsächlich zutrifft, kostet Zeit, und eine Antwort, die sich nicht auf eine Quelle zurückführen lässt, ist in der Beratung wertlos, wie gut sie auch formuliert sein mag.',
        'Der Assistent beantwortet Fragen in natürlicher Sprache und zeigt die verwendeten Passagen mit Verweis auf die ursprüngliche Publikation. Die Suche verbindet eine Landkarte steuerlicher Begriffe und Jurisdiktionen mit semantischer Suche. Genau das hält eine Antwort in der richtigen Jurisdiktion, statt etwas zurückzugeben, das plausibel klingt, aber woanders gilt.',
        'Die Quellenangaben sind der eigentliche Zweck. Beratende prüfen die Quelle, bevor sie sich auf die Antwort stützen, so wie sie es auch bei einer Kollegin oder einem Kollegen täten.',
      ],
    },
    stack: ['Python', 'LLM', 'RAG', 'Neo4j', 'Vector search', 'Azure OpenAI', 'Vue'],
    outcomes: {
      en: [
        'Every answer links to the passage it came from.',
        'Questions can be kept to a specific jurisdiction or topic.',
        'Sources open next to the answer, so checking one does not mean leaving the page.',
      ],
      de: [
        'Jede Antwort verweist auf die Passage, aus der sie stammt.',
        'Fragen lassen sich auf eine bestimmte Jurisdiktion oder ein Thema eingrenzen.',
        'Quellen öffnen sich neben der Antwort, eine Prüfung erfordert keinen Seitenwechsel.',
      ],
    },
  },
  {
    slug: 'document-data-extraction',
    slugDe: 'datenextraktion-aus-dokumenten',
    year: '2023',
    category: 'ai',
    featured: true,
    title: {
      en: 'Data extraction from transport documents',
      de: 'Datenextraktion aus Transportdokumenten',
    },
    tagline: {
      en: 'A tool that reads scanned transport orders and writes the extracted data into the database, built at a time when ready-made services were not yet good enough for these documents.',
      de: 'Ein Werkzeug, das eingescannte Transportaufträge ausliest und die erkannten Daten in die Datenbank schreibt, entstanden zu einer Zeit, als fertige Dienste für diese Dokumente noch nicht gut genug waren.',
    },
    context: {
      en: 'Product work at a logistics software vendor',
      de: 'Produktentwicklung bei einem Logistik-Softwareanbieter',
    },
    body: {
      en: [
        'Transport orders arrive as scans and faxes in many different layouts, roughly one per sender. Typing them in by hand was a routine part of order intake, so the goal was to have the system do the reading.',
        'It combines an OCR service with a model that takes the position of text on the page into account, not just the text itself, which is what makes it possible to tell similar-sounding fields apart. I set up a labelling workflow and trained it on around 400 documents until it also handled layouts it had not seen before. Extracted fields are checked and written into the database.',
      ],
      de: [
        'Transportaufträge kommen als Scans und Faxe in sehr unterschiedlichen Layouts an, meist eines je Absender. Sie von Hand abzutippen war Teil der Auftragsannahme, deshalb sollte das System das Auslesen übernehmen.',
        'Es kombiniert einen OCR-Dienst mit einem Modell, das nicht nur den Text berücksichtigt, sondern auch dessen Position auf der Seite. Genau das erlaubt es, ähnlich benannte Felder zu unterscheiden. Ich habe einen Labelling-Workflow aufgesetzt und das Modell auf rund 400 Dokumenten trainiert, bis es auch mit zuvor ungesehenen Layouts zurechtkam. Die erkannten Felder werden geprüft und in die Datenbank geschrieben.',
      ],
    },
    stack: ['Python', 'OCR', 'Model fine-tuning', 'SQL'],
    outcomes: {
      en: [
        'Removed a manual typing step from order intake.',
        'Handles layouts from different senders without a separate rule set for each one.',
      ],
      de: [
        'Ein manueller Abtippschritt in der Auftragsannahme entfiel.',
        'Kommt mit Layouts verschiedener Absender zurecht, ohne eigenes Regelwerk je Absender.',
      ],
    },
  },
  {
    slug: 'natural-language-data-queries',
    slugDe: 'datenabfragen-in-natuerlicher-sprache',
    year: '2024',
    category: 'ai',
    featured: true,
    title: {
      en: 'Data queries in plain language',
      de: 'Datenabfragen in natürlicher Sprache',
    },
    tagline: {
      en: 'An assistant that turns a question in plain language into a query and shows the result as a table or chart, retrying by itself when a query does not run.',
      de: 'Ein Assistent, der eine Frage in natürlicher Sprache in eine Abfrage übersetzt und das Ergebnis als Tabelle oder Diagramm anzeigt, mit automatischem neuem Versuch, wenn eine Abfrage nicht läuft.',
    },
    context: {
      en: 'Hackathon prototype at a logistics software vendor, March 2024, later shown at logistics events',
      de: 'Hackathon-Prototyp bei einem Logistik-Softwareanbieter, März 2024, später auf Logistikveranstaltungen gezeigt',
    },
    body: {
      en: [
        'People usually know what they want to see in their data but not which tables it sits in. The assistant takes a question in plain language, generates the query behind it and shows the result in a table that is built automatically, with a chart if the data suits one.',
        'Generated queries do not always run the first time. Instead of showing an error, the assistant passes the database message back to the model together with the query that failed and tries again, up to a small number of attempts. From the outside, the question simply gets answered.',
      ],
      de: [
        'Meist ist klar, welche Auswertung man sehen möchte, aber nicht, in welchen Tabellen die Daten liegen. Der Assistent nimmt eine Frage in natürlicher Sprache entgegen, erzeugt die passende Abfrage und zeigt das Ergebnis in einer automatisch aufgebauten Tabelle an, bei passenden Daten auch als Diagramm.',
        'Erzeugte Abfragen laufen nicht immer auf Anhieb. Statt einen Fehler anzuzeigen, gibt der Assistent die Meldung der Datenbank gemeinsam mit der fehlgeschlagenen Abfrage an das Modell zurück und versucht es erneut, begrenzt auf wenige Versuche. Von außen wird die Frage einfach beantwortet.',
      ],
    },
    stack: ['LLM', 'SQL', 'TypeScript', 'Charts'],
    outcomes: {
      en: [
        'Failed queries are retried automatically, without the user rephrasing the question.',
        'Table and chart follow from the result rather than being configured per question.',
      ],
      de: [
        'Fehlgeschlagene Abfragen werden automatisch wiederholt, ohne dass die Frage neu formuliert werden muss.',
        'Tabelle und Diagramm ergeben sich aus dem Ergebnis und sind nicht je Frage konfiguriert.',
      ],
    },
  },
  {
    slug: 'assistant-for-product-documentation',
    slugDe: 'assistent-fuer-produktdokumentation',
    year: '2023',
    category: 'ai',
    featured: true,
    title: {
      en: 'Assistant for product documentation',
      de: 'Assistent für die Produktdokumentation',
    },
    tagline: {
      en: 'A chat panel inside a transport management system that answers questions from a 750-page manual. Built in two days for a company hackathon, where it came first.',
      de: 'Ein Chat-Panel innerhalb eines Transportmanagementsystems, das Fragen aus einem 750-seitigen Handbuch beantwortet. In zwei Tagen für einen Firmen-Hackathon gebaut, wo es den ersten Platz belegte.',
    },
    context: {
      en: 'Hackathon project at a logistics software vendor, March 2023, two days, first place',
      de: 'Hackathon-Projekt bei einem Logistik-Softwareanbieter, März 2023, zwei Tage, erster Platz',
    },
    body: {
      en: [
        'The manual for the system runs to about 750 pages. It contains the answer to most questions users have, and it is rarely read. The idea was to make it answerable by asking.',
        'The assistant sits as a panel inside the application rather than as a separate tool, so a question can be asked without leaving the screen. Answers appear word by word while they are being written, which makes the wait easier to sit through.',
      ],
      de: [
        'Das Handbuch zum System umfasst rund 750 Seiten. Es enthält die Antwort auf die meisten Fragen der Anwenderinnen und Anwender und wird selten gelesen. Die Idee war, es durch Nachfragen zugänglich zu machen.',
        'Der Assistent sitzt als Panel innerhalb der Anwendung und nicht als eigenes Werkzeug, sodass eine Frage gestellt werden kann, ohne den Bildschirm zu verlassen. Antworten erscheinen Wort für Wort, während sie entstehen, was die Wartezeit angenehmer macht.',
      ],
    },
    stack: ['LLM', 'Retrieval', 'C#', 'WinForms'],
    outcomes: {
      en: [
        'First place at the company hackathon in 2023.',
        'Built in two days and later shown at logistics events.',
      ],
      de: [
        'Erster Platz beim Firmen-Hackathon 2023.',
        'In zwei Tagen gebaut und später auf Logistikveranstaltungen gezeigt.',
      ],
    },
    link: {
      href: 'https://translogica.net/ueber-uns/aktuelles/detail/chatgpt-im-tdms-translogica-dotiga',
      label: { en: 'Press article', de: 'Pressebericht' },
    },
  },
  {
    slug: 'effective-t3-effector-prediction',
    slugDe: 'effective-t3-effektorvorhersage',
    year: '2022',
    category: 'research',
    featured: true,
    title: {
      en: 'Effective T3: predicting effector proteins',
      de: 'Effective T3: Effektorvorhersage',
    },
    tagline: {
      en: 'A rebuilt version of a prediction tool for type 3 secretion system effector proteins, delivered as a pip-installable Python package.',
      de: 'Eine neu gebaute Version eines Vorhersagewerkzeugs für Effektorproteine des Typ-3-Sekretionssystems, ausgeliefert als pip-installierbares Python-Paket.',
    },
    context: {
      en: 'Project internship at CUBE, Division of Computational Systems Biology, University of Vienna',
      de: 'Projektpraktikum am CUBE, Department für Computational Systems Biology, Universität Wien',
    },
    body: {
      en: [
        'Many Gram-negative bacteria use type 3 secretion systems to move effector proteins into host cells. Identifying those proteins computationally is useful for studying how these bacteria cause disease.',
        'I developed a new version of Effective T3, a tool that predicts them. Compared with Bastion3, the tool commonly used at the time, it reached similar prediction quality while running faster and generalising better to data it had not seen.',
        'It is distributed as a pip-installable Python package, so other groups can install and run it without setting up the original code.',
      ],
      de: [
        'Viele gramnegative Bakterien nutzen Typ-3-Sekretionssysteme, um Effektorproteine in Wirtszellen einzubringen. Diese Proteine rechnerisch zu identifizieren hilft dabei, die Entstehung von Erkrankungen zu untersuchen.',
        'Ich habe eine neue Version von Effective T3 entwickelt, einem Werkzeug für diese Vorhersage. Im Vergleich zu Bastion3, dem damals üblichen Werkzeug, erreichte sie eine ähnliche Vorhersagegüte bei kürzerer Laufzeit und besserer Generalisierung auf ungesehene Daten.',
        'Die Auslieferung erfolgt als pip-installierbares Python-Paket, sodass andere Gruppen es ohne Aufsetzen des ursprünglichen Codes installieren und nutzen können.',
      ],
    },
    stack: ['Python', 'scikit-learn', 'Bioinformatics'],
    outcomes: {
      en: [
        'Similar prediction quality to Bastion3 at a shorter runtime.',
        'Better generalisation to data outside the training set.',
        'Installable as a package for reuse by other groups.',
      ],
      de: [
        'Vergleichbare Vorhersagegüte wie Bastion3 bei kürzerer Laufzeit.',
        'Bessere Generalisierung auf Daten außerhalb des Trainingssatzes.',
        'Als Paket installierbar und damit für andere Gruppen nachnutzbar.',
      ],
    },
  },
  {
    slug: 'inferring-chemical-reaction-rules',
    slugDe: 'ableitung-chemischer-reaktionsregeln',
    year: '2023',
    category: 'research',
    featured: true,
    title: {
      en: 'Inferring chemical reaction rules',
      de: 'Ableitung chemischer Reaktionsregeln',
    },
    tagline: {
      en: "Master's thesis in computational chemistry, applying graph transformations and reinforcement learning to automatically infer chemical reaction rules.",
      de: 'Masterarbeit in Computerchemie: Graphtransformationen und Reinforcement Learning zur automatisierten Ableitung chemischer Reaktionsregeln.',
    },
    context: {
      en: "Master's thesis, MSc Computational Science, University of Vienna",
      de: 'Masterarbeit, MSc Computational Science, Universität Wien',
    },
    body: {
      en: [
        'A chemical reaction can be described as a change to a molecular graph: bonds break, bonds form, atoms change. The general pattern behind a family of such changes is a reaction rule, and writing those rules by hand takes expert effort and does not scale.',
        'The thesis looks at deriving them automatically instead. The space of possible rules is large, so the work combines a graph transformation view of reactions with reinforcement learning to guide the search towards rules worth considering.',
        'Candidate rules were evaluated on how well they reproduce known reaction data.',
      ],
      de: [
        'Eine chemische Reaktion lässt sich als Veränderung eines Molekülgraphen beschreiben: Bindungen brechen, Bindungen entstehen, Atome ändern sich. Das allgemeine Muster hinter einer Familie solcher Veränderungen ist eine Reaktionsregel, und solche Regeln von Hand zu schreiben ist aufwendig und skaliert nicht.',
        'Die Arbeit untersucht, wie sich diese Regeln stattdessen automatisiert ableiten lassen. Der Raum möglicher Regeln ist groß, daher verbindet die Arbeit eine graphbasierte Sicht auf Reaktionen mit Reinforcement Learning, um die Suche auf sinnvolle Kandidaten zu lenken.',
        'Die Kandidatenregeln wurden daran gemessen, wie gut sie bekannte Reaktionsdaten reproduzieren.',
      ],
    },
    stack: ['Reinforcement learning', 'Graph transformation', 'Python'],
    outcomes: {
      en: [
        'Reactions represented as graph transformations.',
        'Reinforcement learning used to search a large space of candidate rules.',
      ],
      de: [
        'Darstellung von Reaktionen als Graphtransformationen.',
        'Einsatz von Reinforcement Learning zur Suche in einem großen Raum möglicher Regeln.',
      ],
    },
  },
  {
    slug: 'naproxen-sars-cov-2-study',
    slugDe: 'naproxen-sars-cov-2-studie',
    year: '2020',
    category: 'research',
    featured: false,
    title: {
      en: 'Naproxen as a possible drug against COVID-19',
      de: 'Naproxen als Wirkstoff gegen COVID-19',
    },
    tagline: {
      en: 'A course project from early in the pandemic, using a molecular dynamics simulation to look at how naproxen binding might affect the RNA binding site of the SARS-CoV-2 nucleocapsid protein.',
      de: 'Ein Projekt aus einer Lehrveranstaltung zu Beginn der Pandemie, das mit einer Molekulardynamiksimulation untersucht, wie sich die Bindung von Naproxen auf die RNA-Bindestelle des SARS-CoV-2-Nukleokapsidproteins auswirken könnte.',
    },
    context: {
      en: 'Unpublished structural biology course project, University of Vienna',
      de: 'Unveröffentlichtes Projekt aus einer Lehrveranstaltung zur Strukturbiologie, Universität Wien',
    },
    body: {
      en: [
        'Written at the start of the COVID-19 outbreak, the project asked whether naproxen binding away from the main site of the SARS-CoV-2 nucleocapsid protein could reduce how accessible its RNA binding site is.',
        'We ran a 100 ns molecular dynamics simulation of the N-terminal domain with naproxen and GMP. During the simulation naproxen bound away from the main site, largely through an interaction with arginine 28, and the accessibility of the RNA binding region changed afterwards.',
        'The work is unpublished and was done as coursework. It is included here as an example of computational structural biology, not as a clinical statement.',
      ],
      de: [
        'Die Arbeit entstand zu Beginn des COVID-19-Ausbruchs und ging der Frage nach, ob eine Bindung von Naproxen abseits der Hauptbindestelle des SARS-CoV-2-Nukleokapsidproteins die Zugänglichkeit seiner RNA-Bindestelle verringern kann.',
        'Wir haben eine 100-ns-Molekulardynamiksimulation der N-terminalen Domäne mit Naproxen und GMP durchgeführt. Im Verlauf band Naproxen abseits der Hauptbindestelle, überwiegend über eine Interaktion mit Arginin 28, und die Zugänglichkeit der RNA-Bindungsregion veränderte sich danach.',
        'Die Arbeit ist unveröffentlicht und entstand im Rahmen einer Lehrveranstaltung. Sie steht hier als Beispiel für computergestützte Strukturbiologie, nicht als klinische Aussage.',
      ],
    },
    stack: ['Molecular dynamics', 'Structural biology'],
    outcomes: {
      en: [
        '100 ns simulation of the N-terminal domain with naproxen and GMP.',
        'Described a possible indirect effect of binding away from the main site.',
      ],
      de: [
        '100-ns-Simulation der N-terminalen Domäne mit Naproxen und GMP.',
        'Beschreibung eines möglichen indirekten Effekts der Bindung abseits der Hauptbindestelle.',
      ],
    },
  },
  {
    slug: 'ire1-bip-interaction',
    slugDe: 'ire1-bip-interaktion',
    year: '2019',
    category: 'research',
    featured: false,
    title: {
      en: 'The interaction between IRE1 and BiP',
      de: 'Die Interaktion zwischen IRE1 und BiP',
    },
    tagline: {
      en: "Bachelor's thesis and research internship on two proteins involved in the quality control pathway of the endoplasmic reticulum, studied with a FRET assay.",
      de: 'Bachelorarbeit und Forschungspraktikum zu zwei Proteinen des Qualitätskontrollmechanismus des endoplasmatischen Retikulums, untersucht mit einem FRET-Assay.',
    },
    context: {
      en: "Research internship at Max Perutz Labs Vienna and Bachelor's thesis, University of Vienna",
      de: 'Forschungspraktikum an den Max Perutz Labs Wien und Bachelorarbeit, Universität Wien',
    },
    body: {
      en: [
        'The Unfolded Protein Response is how the endoplasmic reticulum reacts when misfolded proteins build up: it detects the situation and starts a response that restores the balance.',
        'IRE1 is one of the sensors in that pathway and BiP is a chaperone thought to help regulate it. The project looked at how the two interact, using a FRET assay, and formed the basis of my Bachelor’s thesis in molecular biology.',
      ],
      de: [
        'Die Unfolded Protein Response beschreibt, wie das endoplasmatische Retikulum reagiert, wenn sich fehlgefaltete Proteine ansammeln: Es erkennt die Situation und leitet eine Antwort ein, die das Gleichgewicht wiederherstellt.',
        'IRE1 ist einer der Sensoren dieses Signalwegs, BiP ein Chaperon, dem eine Rolle bei dessen Regulation zugeschrieben wird. Das Projekt untersuchte mit einem FRET-Assay, wie beide zusammenwirken, und bildete die Grundlage meiner Bachelorarbeit in Molekularbiologie.',
      ],
    },
    stack: ['Biochemistry', 'FRET assay', 'Protein purification'],
    outcomes: {
      en: ['Formed the basis of the Bachelor’s thesis in molecular biology.'],
      de: ['Bildete die Grundlage der Bachelorarbeit in Molekularbiologie.'],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Education & certifications                                          */
/* ------------------------------------------------------------------ */

export const education: Education[] = [
  {
    slug: 'msc-computational-science',
    degree: { en: 'Master of Science (MSc)', de: 'Master of Science (MSc)' },
    field: { en: 'Computational Science', de: 'Computational Science' },
    institution: 'University of Vienna',
    start: '2020',
    end: '2023',
    detail: {
      en: [
        'Grade average 1.04 (Austrian scale, 1.0 is the best possible grade).',
        'Thesis in computational chemistry, applying graph transformations and reinforcement learning to automatically infer chemical reaction rules.',
      ],
      de: [
        'Notendurchschnitt 1,04 (österreichische Skala, 1,0 ist die Bestnote).',
        'Masterarbeit in Computerchemie: Graphtransformationen und Reinforcement Learning zur automatisierten Ableitung chemischer Reaktionsregeln.',
      ],
    },
  },
  {
    slug: 'bsc-molecular-biology',
    degree: { en: 'Bachelor of Science (BSc)', de: 'Bachelor of Science (BSc)' },
    field: { en: 'Molecular Biology', de: 'Molekularbiologie' },
    institution: 'University of Vienna',
    start: '2016',
    end: '2020',
    detail: {
      en: ['Thesis on the interaction between the proteins IRE1 and BiP using a FRET assay.'],
      de: ['Bachelorarbeit zur Interaktion zwischen den Proteinen IRE1 und BiP mittels FRET-Assay.'],
    },
  },
];

export const certifications: { name: I18nText }[] = [
  {
    name: {
      en: 'Cambridge English Level 2 Certificate in ESOL International (Advanced)',
      de: 'Cambridge English Level 2 Certificate in ESOL International (Advanced)',
    },
  },
  { name: { en: 'Systems Design, Certificate of Completion', de: 'Systems Design, Abschlusszertifikat' } },
  { name: { en: 'Frontend Development, Certificate of Completion', de: 'Frontend-Entwicklung, Abschlusszertifikat' } },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups: { label: I18nText; items: string[] }[] = [
  {
    label: { en: 'AI & machine learning', de: 'AI & Machine Learning' },
    items: [
      'LLM applications',
      'RAG & retrieval',
      'Model fine-tuning',
      'Document data extraction',
      'PyTorch',
      'scikit-learn',
    ],
  },
  {
    label: { en: 'Backend & architecture', de: 'Backend & Architektur' },
    items: ['C# / .NET', 'Python', 'REST APIs', 'System design', 'Background services', 'Security'],
  },
  {
    label: { en: 'Frontend', de: 'Frontend' },
    items: ['TypeScript', 'Angular', 'React', 'HTML & CSS', 'Accessibility', 'Ionic'],
  },
  {
    label: { en: 'Cloud & data', de: 'Cloud & Daten' },
    items: ['Microsoft Azure', 'CI/CD', 'SQL Server / T-SQL', 'Data modelling', 'Monitoring'],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function projectSlug(project: Project, locale: Locale): string {
  return locale === 'de' ? project.slugDe : project.slug;
}

export function getProjectBySlug(slug: string, locale: Locale): Project | undefined {
  return projects.find((p) => projectSlug(p, locale) === slug);
}

/** Sorted newest first, featured work first. */
export const sortedProjects = [...projects].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return Number(b.year) - Number(a.year);
});
