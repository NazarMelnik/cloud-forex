import {
  useEffect,
  useId,
  useRef,
  useState
} from 'react';

// Constants
import { PERIOD_LABELS } from '@/constants/periods';

// Styles
import './PeriodSwitcher.css';

interface IProps {
  value: string;
  availablePeriods?: string[];
  onChange: (period: string) => void;
}

function getLabel(key: string): string {
  return PERIOD_LABELS[key] ?? key;
}

export function PeriodSwitcher(props: IProps) {
  const { value, availablePeriods, onChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const periods = availablePeriods?.length ? availablePeriods : Object.keys(PERIOD_LABELS);

  const selectedLabel = getLabel(value);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function selectPeriod(key: string) {
    onChange(key);
    setIsOpen(false);
  }

  return (
    <div className={`period-select ${isOpen ? 'open' : ''}`} ref={containerRef}>
      <button
        type="button"
        className={`period-select__trigger ${isOpen ? 'period-select__trigger--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="period-select__value">{selectedLabel}</span>
        <img src="/icons/arrow.svg" className="period-select__icon" />
      </button>
      <ul
        id={listboxId}
        className="period-select__dropdown"
        role="listbox"
        aria-label="Billing period"
      >
        {periods.map((key) => {
          const isSelected = value === key;

          return (
            <li key={key} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`period-select__option ${isSelected ? 'period-select__option--selected' : ''}`}
                onClick={() => selectPeriod(key)}
              >
                {getLabel(key)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
