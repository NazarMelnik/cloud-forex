import type { TariffPlan, TariffPrice } from '@/types/tariff';

export function getPriceForPeriod(
  tariff: TariffPlan,
  period: string,
): TariffPrice | undefined {
  return tariff.prices.find((p) => p.period === period);
}
