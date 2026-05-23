export interface ApiValue<T = string> {
  $?: T;
  [key: string]: unknown;
}

export interface PricelistResponse {
  doc?: {
    list?: Array<{
      elem?: PricelistElem | PricelistElem[];
    }>;
  };
}

export interface PricelistElem {
  id?: ApiValue;
  pricelist?: ApiValue;
  title?: ApiValue;
  datacenter?: {
    id?: ApiValue;
    value?: ApiValue;
  };
  detail?: Array<{
    name?: ApiValue;
    value?: ApiValue;
  }>;
  prices?: {
    price?: ApiPrice | ApiPrice[];
  };
  fperiod?: {
    tag?: ApiValue | ApiValue[];
  };
  flabel?: {
    tag?: ApiValue | ApiValue[];
  };
  title_tag?: ApiValue;
}

export interface ApiPrice {
  cost?: ApiValue;
  currency?: ApiValue;
  period?: ApiValue;
}

export interface ParamResponse {
  doc?: {
    slist?: Array<{
      $name?: string;
      val?: ParamVal | ParamVal[];
    }>;
  };
}

export interface ParamVal {
  $key?: string;
  $?: string;
}
