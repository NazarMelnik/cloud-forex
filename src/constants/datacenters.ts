import type { DatacenterId, DatacenterOption } from '@/types/tariff';

export const DATACENTERS: DatacenterOption[] = [
  { id: 12, label: 'Poland', code: 'pl' },
  { id: 17, label: 'Netherlands', code: 'nl' },
  { id: 19, label: 'Germany', code: 'de' }
];

export const DATACENTER_IDS: DatacenterId[] = [12, 17, 19];

export const DEFAULT_DATACENTER: DatacenterId = 12;
