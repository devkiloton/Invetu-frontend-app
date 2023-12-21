import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { useAuth } from '~/lib/firebase';
import DropdownInput from '../shared/DropdownInput';
import { useDispatch } from 'react-redux';
import { addStock } from '~/features/investments/investments-slice';
import getNearestDateRange from '~/helpers/get-nearest-date-range';
import getBestInterval from '~/helpers/get-best-interval';
import { addStockData } from '~/features/investments-data/investments-data-slice';

export default function AddStocksForm() {
  const [ticker, setTicker] = useState('');
  const priceInput = useRef<any>();
  const amountInput = useRef<any>();
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [activeTab, setActiveTab] = useState<HTMLAnchorElement>();
  const defaultTab = useRef<HTMLAnchorElement>(null);
  const auth = useAuth();

  const dispatch = useDispatch();

  function handleTabChange(event: MouseEvent<HTMLAnchorElement>) {
    if (event.currentTarget.classList.contains('disabled')) return;
    activeTab?.classList.remove('tab-active');
    setActiveTab(event.currentTarget);
    event.currentTarget.classList.add('tab-active');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ticker === '') return alert('Ticker is required');
    if (priceInput.current?.value === 0) return alert('Price is required');
    if (amountInput.current?.value === 0) return alert('Amount is required');

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
      firebaseClient().firestore.investments.stocks.add(data);
      const nearestRnage = getNearestDateRange(data.startDate);
      firebaseClient()
        .functions.findHistoryStocksBR(
          [data.ticker],
          nearestRnage,
          getBestInterval(nearestRnage),
        )
        .then(res => {
          dispatch(addStockData(res[0].results[0]));
          dispatch(addStock(data));
        });
      setTicker('');
      priceInput.current!.value = '';
      amountInput.current!.value = '';
      setStartDate(new Date().toISOString());
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
            <a
              className="tab"
              ref={defaultTab}
              onClick={event => handleTabChange(event)}>
              Renda variável
            </a>
            <a
              className="tab disabled"
              onClick={event => handleTabChange(event)}>
              Renda fixa
            </a>
            <a
              className="tab disabled"
              onClick={event => handleTabChange(event)}>
              Cripto
            </a>
            <a
              className="tab disabled"
              onClick={event => handleTabChange(event)}>
              EUA
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
              <span className="label-text">Preço que você pagou</span>
            </label>
            <label className="input-group">
              <input
                ref={priceInput}
                type="number"
                min={0.01}
                step={0.01}
                required
                placeholder="10,98"
                className="input input-bordered w-full"
              />
              <span>R$</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantidade</span>
            </label>
            <label className="input-group">
              <input
                ref={amountInput}
                min={1}
                type="number"
                required
                placeholder="ex. 134"
                className="input input-bordered w-full"
              />
              <span>Unidades</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Data de compra</span>
            </label>
            <label className="input-group">
              <input
                onChange={event =>
                  setStartDate(new Date(event.target.value).toISOString())
                }
                value={new Date(startDate).toISOString().split('T')[0]}
                type="date"
                placeholder="ex. 134"
                required
                className="input input-bordered w-full"
              />
              <span>Data</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
