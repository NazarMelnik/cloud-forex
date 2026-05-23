// Hooks
import { useTariffs } from '@/hooks/useTariffs';

// Components
import { DatacenterSwitcher } from '@/components/DatacenterSwitcher/DatacenterSwitcher';
import { PeriodSwitcher } from '@/components/PeriodSwitcher/PeriodSwitcher';
import { TariffGrid } from '@/components/TariffGrid/TariffGrid';

// Styles
import './PricingPage.css';

export function PricingPage() {
  const {
    tariffs,
    datacenter,
    period,
    loading,
    error,
    setDatacenter,
    setPeriod,
    reload,
  } = useTariffs();

  const availablePeriods = tariffs[0]?.availablePeriods;

  return (
    <main className="pricing-page">
      <div className='container'>
        <header className="pricing-page__header">
          <h1 className="pricing-page__title">Buy Forex VPS plans</h1>
        </header>

        <section className="pricing-page__controls">
          <div className="pricing-page__control">
            <p className="pricing-page__label">Data center</p>
            <DatacenterSwitcher
              value={datacenter}
              onChange={setDatacenter}
            />
          </div>
          <div className="pricing-page__control">
            <span className="pricing-page__label">Billing period</span>
            <PeriodSwitcher
              value={period}
              availablePeriods={availablePeriods}
              onChange={setPeriod}
            />
          </div>
        </section>

        {loading && <p className="pricing-page__status">Loading tariffs…</p>}
        {error ? (
          <p className="pricing-page__status pricing-page__status--error">
            {error}{' '}
            <button type="button" onClick={reload}>
              Retry
            </button>
          </p>
        ) : null}

        {!loading && !error && <TariffGrid tariffs={tariffs} period={period} />}
      </div>
    </main>
  );
}
