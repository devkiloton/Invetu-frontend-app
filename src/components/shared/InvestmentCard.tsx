import { isNull } from 'lodash-es';
import { useEffect, useState } from 'react';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import { StockAPI } from '~/clients/foxbat-client/models/StockAPI';
import { useAuth } from '~/lib/firebase';
import InvestementCardChart from './InvestementCardChart';

export default function InvestmentCard(
  props: Stock & { investedAmount: number; currentBalance: number },
) {
  const [stockInfo, setStockInfo] = useState<StockAPI | null>(null);
  const [chartData, setChartData] = useState<{ dates: string[], prices: number[] } | null>(null)
  const auth = useAuth();

  useEffect(() => {
    foxbatClient()
      .stocks.tickerInfo(props.ticker)
      .then(response => {
        setStockInfo(response);
      });
  }, []);

  useEffect(() => {
    const range = getNearestDateRange(new Date(props.startDate).toISOString());
    foxbatClient().stocks.findHistory({
      ticker: [props.ticker],
      range,
      interval: getBestInterval(range),
    }).then(response => {

      const dates = response.results[0].historicalDataPrice
        // removing 10800000 ms (3 hours) to adjust to the brazilian timezone
        .map(price => (price.date * 1000) - 10800000)
        .filter(value => value > Date.parse(props.startDate))
        .map(value => new Date(value).toISOString())
      setChartData({
        dates,
        prices: response.results[0].historicalDataPrice.slice(dates.length * -1).map(price => price.close)
      })
    })
   }, [stockInfo])

  function deleteStock() {
    if (auth.currentUser?.uid !== undefined)
      firebaseClient().firestore.investments.stocks.delete(
        auth.currentUser?.uid,
        props.ticker,
      );
  }

  function getProfit(basePrice: number, currentPrice: number) {
    const percentProfit = (currentPrice / basePrice - 1) * 100;
    return percentProfit.toFixed(2);
  }

  function getStockAllocation(
    amount: number,
    price: number,
    investedAmount: number,
  ) {
    const percent = ((amount * price) / investedAmount) * 100;
    return percent.toFixed(2);
  }

  function getBalance(price: number, amount: number) {
    const balance = price * amount;
    return balance.toFixed(2);
  }

  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl glassy-border z-0">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{props.ticker}</h2>

            <details className="dropdown dropdown-end">
              <summary className="m-1 btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 20 20">
                  <circle cx="10" cy="4" r="2" fill="currentColor" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                  <circle cx="10" cy="16" r="2" fill="currentColor" />
                </svg>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 glassy-border">
                <li>
                  <button onClick={() => deleteStock()}>Deletar</button>
                </li>
                <li className="disabled">
                  <button>Atualizar</button>
                </li>
                <li className="disabled">
                  <button>Informar erro</button>
                </li>
              </ul>
            </details>
          </div>
          {!isNull(stockInfo) && (
            <div className="flex flex-col min-[768px]:flex-row gap-x-2">
              <span className="text-sm  font-semibold">
                <span className="text-xs font-normal">Amount:</span>{' '}
                {props.amount}
              </span>
              <span className="text-sm  font-semibold">
                <span className="text-xs font-normal">Avg price:</span> R${' '}
                {props.price.toFixed(2)}
              </span>
              <span className="text-sm  font-semibold">
                <span className="text-xs font-normal">Result:</span> %{' '}
                {getProfit(
                  props.price,
                  stockInfo!.results[0].regularMarketPrice,
                )}
              </span>
              <span className="text-sm  font-semibold">
                <span className="text-xs font-normal">Wallet:</span> %{' '}
                {getStockAllocation(
                  props.amount,
                  stockInfo!.results[0].regularMarketPrice,
                  props.currentBalance,
                )}
              </span>
              <span className="text-sm  font-semibold">
                <span className="text-xs font-normal">Current Balance:</span> R${' '}
                {getBalance(
                  stockInfo!.results[0].regularMarketPrice,
                  props.amount,
                )}
              </span>
            </div>

          )}
          {!isNull(chartData) && (<InvestementCardChart dates={chartData.dates} prices={chartData.prices} />)}

          <div className="card-actions">
            <button disabled className="btn btn-primary w-full">
              Mais detalhes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


function getNearestDateRange(startDate: string): "1d" | "5d" | "1mo" | "3mo" | "6mo" | "1y" | "2y" | "5y" | "10y" | "ytd" | "max" {
  const today = new Date();
  const start = new Date(startDate);
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return "1d";
  else if (diffDays <= 5) return "5d";
  else if (diffDays <= 30) return "1mo";
  else if (diffDays <= 90) return "3mo";
  else if (diffDays <= 180) return "6mo";
  else if (diffDays <= 365) return "1y";
  else if (diffDays <= 730) return "2y";
  else if (diffDays <= 1825) return "5y";
  else if (diffDays <= 3650) return "10y";
  else return "max";
}

function getBestInterval(range: "1d" | "5d" | "1mo" | "3mo" | "6mo" | "1y" | "2y" | "5y" | "10y" | "ytd" | "max"):   '1m'
| '2m'
| '5m'
| '15m'
| '30m'
| '60m'
| '90m'
| '1h'
| '1d'
| '5d'
| '1wk'
| '1mo'
| '3mo' {

  switch (range) { 
    case "1d":
      return "5m";
    case "5d":
      return "1h"
    case "1mo":
      return "1d"
    case "3mo":
      return "1d"
    case "6mo":
      return "1d"
    case "1y":
      return "5d"
    case "2y":
      return "1wk"
    case "5y":
      return "1mo"
    case "10y":
      return "3mo"
    case "ytd":
      return "1d"
  }
}