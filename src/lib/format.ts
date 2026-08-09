import type { Locale } from '@/config/site';
import { LOCALE_TAGS } from '@/i18n/routing';

/** "2024-05" -> "May 2024" / "Mai 2024" */
export function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month ?? 1) - 1, 1);
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/** Machine-readable range for <time datetime>. */
export function isoRange(start: string, end: string | null): string {
  return end ? `${start}/${end}` : `${start}/`;
}
