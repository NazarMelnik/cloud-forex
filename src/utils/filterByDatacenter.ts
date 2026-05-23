// Types
import type { DatacenterId, TariffPlan } from '@/types/tariff';

export function filterByDatacenter(
  tariffs: TariffPlan[],
  datacenterId: DatacenterId,
): TariffPlan[] {
  return tariffs.filter((t) => t.datacenterId === datacenterId);
}
