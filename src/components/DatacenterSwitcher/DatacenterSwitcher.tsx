// Constants
import { DATACENTERS } from '@/constants/datacenters';

// Types
import type { DatacenterId } from '@/types/tariff';

// Styles
import './DatacenterSwitcher.css';

interface IProps {
  value: DatacenterId;
  onChange: (id: DatacenterId) => void;
}

export function DatacenterSwitcher({ value, onChange }: IProps) {
  return (
    <div
      className="datacenter-switcher"
      role="tablist"
      aria-label="Datacenter"
    >
      {DATACENTERS?.map((el) => (
        <button
          key={el?.id}
          type="button"
          role="tab"
          aria-selected={value === el?.id}
          className={`datacenter-switcher__btn ${value === el?.id ? 'datacenter-switcher__btn--active' : ''}`}
          onClick={() => onChange(el?.id)}
        >
          <img
            src={`https://flagcdn.com/w40/${el.code}.png`}
            alt={el.label}
            width={20}
            height={20}
            className="datacenter-switcher__flag"
          />
          {el?.label}
        </button>
      ))}
    </div>
  );
}
