import { FormEvent, useState } from "react";
import { firebaseClient } from "~/clients/firebase-client/firebase-client";
import { useAuth } from "~/lib/firebase";

export default function AddStocksForm() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(Date.now());
  const auth = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (auth.currentUser?.uid !== undefined) {
      
      const data = {
        ticker,
        price,
        amount,
        date,
        currency: 'BRL',
        userID: auth.currentUser.uid,
      };
  
      firebaseClient().firestore.stocks.add(data);
    }
    event.preventDefault();
  }
  return (
    <div className="hero-content  max-w-120">
      <div className="card flex-shrink-0 w-full bg-base-100">
        <form className="card-body" onSubmit={(event) =>handleSubmit(event)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ticker</span>
            </label>
            <input onChange={(event) => setTicker(event.target.value)} type="text" placeholder="PETR4, SANB3..." className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter price</span>
            </label>
            <label className="input-group">
              <input onChange={(event) => setPrice(Number(event.target.value))} type="text" placeholder="10" className="input input-bordered w-full" />
              <span>BRL</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter amount</span>
            </label>
            <label className="input-group">
              <input onChange={(event) => setAmount(Number(event.target.value))} type="number" placeholder="ex. 134" className="input input-bordered w-full" />
              <span>Stocks</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter date</span>
            </label>
            <label className="input-group">
              <input onChange={(event) => setDate(new Date(event.target.value).getTime())} type="date" placeholder="ex. 134" className="input input-bordered w-full" />
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
