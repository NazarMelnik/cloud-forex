import type { PeriodOption } from '@/types/tariff';

/** Мапінг period key з API → підпис у UI (уточни за Figma) */
export const PERIOD_LABELS: Record<string, string> = {
  '-50': 'Day',
  '1': '1 month',
  '3': '3 months',
  '6': '6 months',
  '12': '12 months',
};

export const DEFAULT_PERIOD = '1';

export const PERIOD_OPTIONS: PeriodOption[] = [
  { key: '-50', label: PERIOD_LABELS['-50'] },
  { key: '1', label: PERIOD_LABELS['1'] },
  { key: '3', label: PERIOD_LABELS['3'] },
  { key: '6', label: PERIOD_LABELS['6'] },
  { key: '12', label: PERIOD_LABELS['12'] },
];
