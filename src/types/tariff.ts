export type DatacenterId = 12 | 17 | 19;

export interface DatacenterOption {
  id: DatacenterId;
  label: string;
  code: string;
}

export interface TariffDetail {
  name: string;
  value: string;
}

export interface TariffPrice {
  period: string;
  cost: string;
  currency: string;
}

export interface TariffPlan {
  id: string;
  pricelistId: string;
  title: string;
  datacenterId: DatacenterId;
  datacenterName: string;
  details: TariffDetail[];
  prices: TariffPrice[];
  availablePeriods: string[];
  soldOut: boolean;
}

export interface PeriodOption {
  key: string;
  label: string;
}
