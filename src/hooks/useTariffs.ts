import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchPricelist } from '@/api/pricelist';
import { DEFAULT_DATACENTER } from '@/constants/datacenters';
import { DEFAULT_PERIOD } from '@/constants/periods';
import type { DatacenterId, TariffPlan } from '@/types/tariff';
import { filterByDatacenter } from '@/utils/filterByDatacenter';
import { filterForexTariffs } from '@/utils/filterForex';

interface UseTariffsResult {
  tariffs: TariffPlan[];
  allForexTariffs: TariffPlan[];
  datacenter: DatacenterId;
  period: string;
  loading: boolean;
  error: string | null;
  setDatacenter: (id: DatacenterId) => void;
  setPeriod: (period: string) => void;
  reload: () => void;
}

export function useTariffs(): UseTariffsResult {
  const [allForexTariffs, setAllForexTariffs] = useState<TariffPlan[]>([]);
  const [datacenter, setDatacenter] = useState<DatacenterId>(DEFAULT_DATACENTER);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPricelist();
      setAllForexTariffs(filterForexTariffs(data));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load tariffs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const tariffs = useMemo(
    () => filterByDatacenter(allForexTariffs, datacenter),
    [allForexTariffs, datacenter],
  );

  return {
    tariffs,
    allForexTariffs,
    datacenter,
    period,
    loading,
    error,
    setDatacenter,
    setPeriod,
    reload: load,
  };
}
