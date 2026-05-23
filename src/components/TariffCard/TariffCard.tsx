// Helpers
import { buildOrderUrl } from '@/utils/buildOrderUrl';
import { getPriceForPeriod } from '@/utils/getPriceForPeriod';

// Types
import type {
  TariffDetail,
  TariffPlan
} from '@/types/tariff';

// Styles
import './TariffCard.css';

interface IProps {
  best: boolean;
  tariff: TariffPlan;
  period: string;
}

const SPEC_MAPPINGS = [
  {
    sourceKey: 'CPU count',
    shortLabel: 'TRM',
  },
  {
    sourceKey: 'Memory',
    shortLabel: 'RAM',
  },
  {
    sourceKey: 'Disk space',
    shortLabel: 'NVMe',
  },
  {
    sourceKey: 'Port speed',
    shortLabel: 'Mbps',
  }
];

export function TariffCard(props: IProps) {
  const {
    best,
    tariff,
    period,
  } = props;

  const price = getPriceForPeriod(tariff, period);
  const orderUrl = buildOrderUrl(tariff.pricelistId, period);

  const detailsMap = Object.fromEntries(
    tariff?.details?.map((detail: TariffDetail) => [
      detail.name,
      detail.value,
    ]) || []
  );

  const trmValue = detailsMap['CPU count']?.match(/\d+/)?.[0];

  return (
    <article className={`tariff-card ${best ? 'tariff-card--best' : ''}`}>
      {best ? (
        <div className="tariff-card__best-label">
          Best Choice
        </div>
      ) : null}
      <header className="tariff-card__header">
        <h3 className="tariff-card__title font--500">{tariff?.title?.split?.('|')?.[0]}</h3>
        <p className="tariff-card__price">
          <span className='tariff-card__currency font--500'>€ {price?.cost}</span> <span className='tariff-card__period'>month</span>
        </p>
        <ul className="tariff-card__details">
          {SPEC_MAPPINGS?.map((mapping, index) => {
            const value = detailsMap[mapping.sourceKey];
            if (!value) return null
            return (
              <li
                key={`${mapping.sourceKey}-${index}`}
                className="tariff-card__details-item"
              >
                {value
                  ?.replace(/Gb/i, '')
                  ?.replace(/Mbps/i, '')
                  ?.trim()}{' '}{mapping.shortLabel} {index === SPEC_MAPPINGS.length - 1 ? '' : ' · '}
              </li>
            );
          })}
          <li className="tariff-card__details-tooltip-item">
            <div className="tariff-card__details-tooltip-wrapper">
              <img
                className="tariff-card__details-icon"
                src="/icons/details.svg"
                alt="details"
              />

              <div className="tariff-card__details-tooltip">
                <ul className="tariff-card__details-tooltip-list">
                  {tariff?.details?.map((detail: TariffDetail) => (
                    <li
                      key={detail.name}
                      className="tariff-card__details-list-item"
                    >
                      <p className='tariff-card__details-tooltip-name'>{detail?.name}:</p>
                      <p className='tariff-card__details-tooltip-value'>{detail?.value}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <img className='tariff-card__terminals-icon' src={`/icons/${trmValue}-terminals.svg`} alt="teminal-icon" />
      </header>
      <div className="tariff-card__terminal-wrapper">
        <div className='tariff-card__terminal-content'>
          <img className='tariff-card__terminal-icon' src="/icons/computer-monitor.svg" alt="monitor" />
          <p className='tariff-card__terminal-text'>Terminals</p>
        </div>
        <div className='tariff-card__terminal-content'>
          <p className='tariff-card__terminal-text'>{trmValue}</p>
          <svg className='tariff-card__terminal-icon tariff-card__terminal-icon--info' width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M7.99991 1.3335C11.6818 1.3335 14.6666 4.31825 14.6666 8.00015C14.6666 11.682 11.6818 14.6668 7.99991 14.6668C4.31803 14.6668 1.33325 11.6821 1.33325 8.00015C1.33325 4.31825 4.31803 1.3335 7.99991 1.3335ZM7.99991 10.1668C7.53963 10.1668 7.16653 10.5399 7.16653 11.0002C7.16653 11.4604 7.53966 11.8335 7.99988 11.8335C8.4601 11.8335 8.83322 11.4604 8.83322 11.0002C8.83322 10.5399 8.4601 10.1668 7.99988 10.1668M7.88863 4.25021C7.23972 4.25021 6.69431 4.427 6.25306 4.77959C5.73019 5.20196 5.46897 5.82572 5.46897 6.6514H6.88653V6.6419C6.88653 6.32687 6.95288 6.06846 7.08528 5.8669C7.26794 5.59596 7.56425 5.46034 7.97388 5.46034C8.22597 5.46034 8.44053 5.52653 8.61669 5.65865C8.83713 5.84171 8.94772 6.11881 8.94772 6.49065C8.94772 6.72387 8.89072 6.93171 8.77741 7.11459C8.68288 7.2784 8.53166 7.43897 8.32341 7.59662C7.88235 7.89909 7.59553 8.1985 7.46341 8.49484C7.34994 8.74059 7.29294 9.13131 7.29294 9.66684H8.62622C8.62622 9.31384 8.67313 9.04934 8.7681 8.87278C8.8436 8.72784 9.00132 8.57356 9.24082 8.40959C9.65691 8.10068 9.95285 7.81384 10.1294 7.54915C10.3436 7.23415 10.4509 6.86537 10.4509 6.443C10.4509 5.56768 10.0949 4.94681 9.38235 4.58112C8.95406 4.36059 8.45616 4.25015 7.88866 4.25015" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="tariff-card__actions">
        <a
          className="tariff-card__buy"
          href={orderUrl}
          aria-disabled={tariff.soldOut}
        >
          {tariff?.soldOut ? 'Нет в наличии' : 'Купить'}
        </a>
        <a
          className="tariff-card__buy-icon-wrapper"
          href={orderUrl}
          aria-label="Купить тариф"
          aria-disabled={tariff.soldOut}
        >
          <svg className='tariff-card__buy-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
