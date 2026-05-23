import { DATACENTER_IDS } from '@/constants/datacenters';
import { PRICELIST_FUNC } from '@/constants/api';
import type { PricelistElem, PricelistResponse } from '@/types/api';
import type { DatacenterId, TariffPlan } from '@/types/tariff';
import { apiPost } from './client';
import { toArray, unwrap } from './normalize';

function parseElem(elem: PricelistElem): TariffPlan | null {
  const pricelistId = unwrap(elem.pricelist) ?? unwrap(elem.id);
  const datacenterRaw = unwrap(elem.datacenter?.id);
  if (!pricelistId || !datacenterRaw) return null;

  const datacenterId = Number(datacenterRaw) as DatacenterId;
  const tags = toArray(elem.flabel?.tag).map((t) => unwrap(t) ?? '');
  const soldOut = tags.some((t) => t.includes('soldout%3ATrue'));

  const prices = toArray(elem.prices?.price).map((p) => ({
    period: unwrap(p.period) ?? '',
    cost: unwrap(p.cost) ?? '0',
    currency: unwrap(p.currency) ?? 'EUR',
  }));

  const availablePeriods = toArray(elem.fperiod?.tag)
    .map((t) => unwrap(t) ?? '')
    .filter((p) => p !== 'any');

  return {
    id: `${pricelistId}_${datacenterId}`,
    pricelistId,
    title: unwrap(elem.title) ?? '',
    datacenterId,
    datacenterName: unwrap(elem.datacenter?.value) ?? '',
    details: toArray(elem.detail).map((d) => ({
      name: unwrap(d.name) ?? '',
      value: unwrap(d.value) ?? '',
    })),
    prices,
    availablePeriods,
    soldOut,
  };
}

export function parsePricelistResponse(data: PricelistResponse): TariffPlan[] {
  const list = data.doc?.list;
  if (!list?.length) return [];

  const elems = toArray(list[0]?.elem);
  return elems.map(parseElem).filter((t): t is TariffPlan => t !== null);
}

export async function fetchPricelist(): Promise<TariffPlan[]> {
  const data = await apiPost<PricelistResponse>({
    func: PRICELIST_FUNC,
    out: 'json',
    lang: 'en',
    page: '1',
    page_size: '999',
    datacenter: DATACENTER_IDS.join(','),
  });

  return parsePricelistResponse(data);
}
