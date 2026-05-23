// Types
import type { TariffPlan } from '@/types/tariff';

export function isForexTariff(tariff: TariffPlan): boolean {
  const title = tariff.title.toLowerCase();
  return title.includes('cloud forex') || title.includes('forex');
}

export function filterForexTariffs(tariffs: TariffPlan[]): TariffPlan[] {
  return tariffs.filter(isForexTariff);
}
