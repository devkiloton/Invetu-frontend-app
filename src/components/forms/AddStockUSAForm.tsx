import React, { FormEvent, useCallback, useRef, useState } from 'react';
import DropdownStocksInput from '../shared/DropdownStocksInput';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { useAuth } from '~/lib/firebase';
import useAddStock from '~/hooks/use-add-stock';
import { getIsoDate } from '~/helpers/get-iso-date';

function AddStockUSAForm() {
  const amountInput = useRef<any>();
  const priceInput = useRef<any>();
  const [ticker, setTicker] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString());

  const auth = useAuth();
  const addStock = useAddStock();

  const handleSubmitStock = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
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
          currency: 'USD',
          type: 'stock',
        };

        addStock(data);
        setTicker('');
        priceInput.current!.value = '';
        amountInput.current!.value = '';
        setStartDate(new Date().toISOString());
      }
    },
    [ticker, auth.currentUser?.uid, startDate, addStock],
  );
  return (
    <form onSubmit={handleSubmitStock}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Ticker</span>
        </label>
        <DropdownStocksInput country="USA" setTicker={setTicker} />
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
          <span>U$</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Quantidade</span>
        </label>
        <label className="input-group">
          <input
            ref={amountInput}
            min={0.00000001}
            step={0.00000001}
            type="number"
            required
            placeholder="ex. 1.559"
            className="input input-bordered w-full"
          />
          <span>Unidades</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          {/* #TODO: limit the date range */}
          <span className="label-text">Data de compra</span>
        </label>
        <label className="input-group">
          <input
            onChange={event =>
              setStartDate(new Date(event.target.value).toISOString())
            }
            value={getIsoDate(startDate)}
            type="date"
            placeholder="ex. 134"
            max={new Date().toISOString().split('T')[0]}
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
  );
}

export default React.memo(AddStockUSAForm);
