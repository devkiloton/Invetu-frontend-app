import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { useAuth } from '~/lib/firebase';
import DropdownInput from '../shared/DropdownInput';

export default function AddStocksForm() {
  const [ticker, setTicker] = useState('');
  const priceInput = useRef<HTMLInputElement>();
  const amountInput = useRef<HTMLInputElement>();
  const [startDate, setStartDate] = useState(Date.now());
  const [activeTab, setActiveTab] = useState<HTMLAnchorElement>();
  const defaultTab = useRef<HTMLAnchorElement>(null);
  const auth = useAuth();

  function handleTabChange(event: MouseEvent<HTMLAnchorElement>) {
    if (event.currentTarget.classList.contains('disabled')) return;
    activeTab?.classList.remove('tab-active');
    setActiveTab(event.currentTarget);
    event.currentTarget.classList.add('tab-active');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ticker === '') return alert('Ticker is required');
    const price = priceInput.current?.valueAsNumber as number;
    const amount = amountInput.current?.valueAsNumber as number;
    if (auth.currentUser?.uid !== undefined) {
      const data: Stock = {
        ticker,
        price,
        amount,
        startDate,
        currency: 'BRL',
        userID: auth.currentUser.uid,
        type: 'stock',
      };
      firebaseClient()
        .firestore.investments.stocks.add(data)
        .then(() => {
          setTicker('');
          priceInput.current!.value = '';
          amountInput.current!.value = '';
          setStartDate(Date.now());
        });
    }
  }

  useEffect(() => {
    defaultTab.current?.classList.add('tab-active');
    setActiveTab(defaultTab.current as HTMLAnchorElement);
  }, []);
  return (
    <div className="w-full relative">
      <div className="card flex-shrink-0 w-full bg-base-100 shadow-xl glassy-border">
        <form className="card-body" onSubmit={event => handleSubmit(event)}>
          <div className="tabs tabs-boxed w-fit">
            <a className="tab" ref={defaultTab} onClick={event => handleTabChange(event)}>
              Renda variável
            </a>
            <a className="tab disabled" onClick={event => handleTabChange(event)}>
              Renda fixa
            </a>
            <a className="tab disabled" onClick={event => handleTabChange(event)}>
              Cripto
            </a>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ticker</span>
            </label>
            <DropdownInput setTicker={setTicker} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter price</span>
            </label>
            <label className="input-group">
              <input
                ref={priceInput}
                type="number"
                min={0.01}
                placeholder="10.98"
                className="input input-bordered w-full"
              />
              <span>BRL</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter amount</span>
            </label>
            <label className="input-group">
              <input
                ref={amountInput}
                min={1}
                type="number"
                placeholder="ex. 134"
                className="input input-bordered w-full"
              />
              <span>Stocks</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter date</span>
            </label>
            <label className="input-group">
              <input
                onChange={event => setStartDate(new Date(event.target.value).getTime())}
                value={new Date(startDate).toISOString().split('T')[0]}
                type="date"
                placeholder="ex. 134"
                className="input input-bordered w-full"
              />
              <span>Date</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
