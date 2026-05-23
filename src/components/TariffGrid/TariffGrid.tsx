// Components
import { TariffCard } from '@/components/TariffCard/TariffCard';

// Types
import type { TariffPlan } from '@/types/tariff';

// Styles
import './TariffGrid.css';

interface IProps {
  tariffs: TariffPlan[];
  period: string;
}

export function TariffGrid(props: IProps) {
  const {
    tariffs = [],
    period = '',
  } = props;

  if (!tariffs || !tariffs?.length) {
    return <p className="tariff-grid__empty">No Forex tariffs for this datacenter.</p>;
  }

  return (
    <div className="tariff-grid">
      {tariffs?.map((tariff, index) => (
        <TariffCard
          index={index}
          key={tariff.id}
          tariff={tariff}
          period={period}
        />
      ))}
    </div>
  );
}
