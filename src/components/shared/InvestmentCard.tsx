import { isNull } from 'lodash-es';
import { useEffect, useState } from 'react';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import { StockAPI } from '~/clients/foxbat-client/models/StockAPI';

export default function InvestmentCard(props: Stock & { investedAmount: number, currentBalance: number }) {
  const [stockInfo, setStockInfo] = useState<StockAPI | null>(null);
  useEffect(() => {
    foxbatClient().stocks.tickerInfo(props.ticker).then(response => { 
      setStockInfo(response)
    })
  
  }, [])

  function getProfit(basePrice: number, currentPrice: number) { 
    const percentProfit = ((currentPrice / basePrice) - 1) * 100
    return percentProfit.toFixed(2)
  }

  function getStockAllocation(amount: number, price:number, investedAmount: number)  { 
    const percent = ((amount * price) / investedAmount) * 100
    return percent.toFixed(2)
  }

  function getBalance(price: number, amount: number) { 
    const balance = price * amount
    return balance.toFixed(2)
  }
  
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl glassy-border z-0">
        <div className="card-body">
          <div className="flex justify-between">

          <h2 className="card-title">{props.ticker}</h2>
          
            <details className="dropdown dropdown-end">
  <summary className="m-1 btn btn-ghost btn-circle"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 20 20" >
                <circle cx="10" cy="4" r="2" fill="currentColor"/>
            <circle cx="10" cy="10" r="2" fill="currentColor"/>
            <circle cx="10" cy="16" r="2" fill="currentColor"/>
              </svg></summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 glassy-border">
                <li ><a>Deletar</a></li>
    <li className="disabled"><a>Atualizar</a></li>
    <li className="disabled"><a>Informar erro</a></li>
  </ul>
</details>
          </div>
          {
            !isNull(stockInfo) &&
          <div className="flex flex-col gap-x-2">
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Amount:</span> {props.amount}
            </span>
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Avg price:</span> R$ {props.price.toFixed(2)}
            </span>
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Result:</span> % {getProfit(props.price,stockInfo!.results[0].regularMarketPrice )}
            </span>
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Wallet:</span> % {getStockAllocation(props.amount, stockInfo!.results[0].regularMarketPrice, props.currentBalance)}
            </span>
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Current Balance:</span> R$ {getBalance(stockInfo!.results[0].regularMarketPrice, props.amount)}
            </span>
          </div>
            }
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
