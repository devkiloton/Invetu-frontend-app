import { useEffect, useState } from 'react';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import { useAuth } from '~/lib/firebase';

export default function AccountStats() {
  const auth = useAuth();
  const [investedAmount, setInvestedAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    firebaseClient()
      .firestore.investments.get(auth.currentUser?.uid as string)
      .then(response => {
        setInvestedAmount(response.investedAmount);
        const stocks = response.stocks;
        const tickers = stocks.map(stock => stock.ticker);
        foxbatClient()
          .stocks.findMany(tickers)
          .then(response => {
            // take the current price of each stock and multiply by the amount
            const currentBalance = stocks.reduce((acc, stock) => {
              const currentPrice = response.results.find(stockResponse => stockResponse.symbol === stock.ticker)
                ?.regularMarketPrice;
              return acc + (currentPrice as number) * stock.amount;
            }, 0);
            setCurrentBalance(currentBalance);
          });
      });
  }, []);

  return (
    <div className="w-full">
      <div className="stats bg-primary text-primary-content w-full bordered">
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Total invested</div>
          <div className="stat-value">R$ {investedAmount.toFixed(2)}</div>
        </div>

        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Current balance</div>
          <div className="stat-value">R$ {currentBalance.toFixed(2)}</div>
        </div>
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Profit</div>
          <div className="stat-value">
            % {((currentBalance / (investedAmount === 0 ? 1 : investedAmount)) * 100).toFixed(2)}
          </div>
        </div>
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Profit this month</div>
          <div className="stat-value">% TBI</div>
        </div>
      </div>
    </div>
  );
}
