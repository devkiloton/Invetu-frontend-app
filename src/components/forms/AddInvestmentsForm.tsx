import { MouseEvent, useEffect, useRef, useState } from 'react';
import AddFixedIncomeForm from './AddFixedIncomeForm';
import AddStockForm from './AddStockForm';
import AddCryptoForm from './AddCryptoForm';
import AddStockUSAForm from './AddStockUSAForm';

export default function AddInvestmentsForm() {
  const [activeTab, setActiveTab] = useState<HTMLAnchorElement>();
  const defaultTab = useRef<HTMLAnchorElement>(null);
  const [kind, setKind] = useState<'stock' | 'fixed-income' | 'crypto' | 'usa'>(
    'stock',
  );

  function handleTabChange(
    event: MouseEvent<HTMLAnchorElement>,
    kind: 'stock' | 'fixed-income' | 'crypto' | 'usa' = 'stock',
  ) {
    if (event.currentTarget.classList.contains('disabled')) return;
    activeTab?.classList.remove('tab-active');
    setActiveTab(event.currentTarget);
    event.currentTarget.classList.add('tab-active');
    setKind(kind);
  }

  useEffect(() => {
    defaultTab.current?.classList.add('tab-active');
    setActiveTab(defaultTab.current as HTMLAnchorElement);
  }, []);

  return (
    <div className="w-full relative">
      <div className="card flex-shrink-0 w-full bg-base-100 shadow-xl glassy-border">
        <div className="card-body">
          <div className="tabs tabs-boxed w-fit">
            <a
              className="tab"
              ref={defaultTab}
              onClick={event => handleTabChange(event, 'stock')}>
              Renda variável
            </a>
            <a
              className="tab"
              onClick={event => handleTabChange(event, 'fixed-income')}>
              Renda fixa
            </a>
            <a
              className="tab"
              onClick={event => handleTabChange(event, 'crypto')}>
              Cripto
            </a>
            <a className="tab" onClick={event => handleTabChange(event, 'usa')}>
              EUA
            </a>
          </div>
          {kind === 'stock' ? <AddStockForm /> : <></>}
          {kind === 'crypto' ? <AddCryptoForm /> : <></>}
          {kind === 'fixed-income' ? <AddFixedIncomeForm /> : <></>}
          {kind === 'usa' ? <AddStockUSAForm /> : <></>}
        </div>
      </div>
    </div>
  );
}
