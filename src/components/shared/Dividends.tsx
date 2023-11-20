import { useEffect, useState } from 'react';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import {
  CashDividend,
  StockDividend,
  Subscription,
} from '~/clients/foxbat-client/models/DividendsAPI';
import { handlePresentation } from '~/helpers/handle-presentation';
import { joinStockData } from '~/helpers/join-stock-data';
import { isCashDividend } from '~/type-guards/is-cash-dividend';
import { isStockDividend } from '~/type-guards/is-stock-dividend';

export default function Dividends({ stocks }: { stocks: Array<Stock> }) {
  const [advices, setAdvices] = useState<
    Array<
      (StockDividend | CashDividend | Subscription) & {
        amount: number;
        ticker: string;
      }
    >
  >([]);

  async function getValidAdvices() {
    // fetching all the dividends and subscriptions
    const advices = await foxbatClient().stocks.findDividends(
      joinStockData(stocks).map(stock => stock.ticker),
    );

    // takes the cash dividends that will happen after today
    const cashDividendsAfterToday = advices.results
      .filter(obj => Object.keys(obj.dividendsData).length > 0)
      .flatMap(investment => {
        const { cashDividends } = investment.dividendsData;
        return cashDividends.map(data => ({
          ...data,
          ticker: investment.symbol,
        }));
      })
      .filter(
        advice => new Date(advice.paymentDate).getTime() > new Date().getTime(),
      );

    // takes the stock dividends that will happen after today
    const stockDividendsAfterToday = advices.results
      .filter(obj => Object.keys(obj.dividendsData).length > 0)
      .flatMap(investment => {
        const { stockDividends } = investment.dividendsData;
        return stockDividends.map(data => ({
          ...data,
          ticker: investment.symbol,
        }));
      })
      .filter(
        advice =>
          new Date(advice.lastDatePrior).getTime() > new Date().getTime(),
      );

    // takes the subscriptions that will happen after today
    const subscriptionsAfterToday = advices.results
      .filter(obj => Object.keys(obj.dividendsData).length > 0)
      .flatMap(investment => {
        const { subscriptions } = investment.dividendsData;
        return subscriptions.map(data => ({
          ...data,
          ticker: investment.symbol,
        }));
      })
      .filter(
        advice =>
          new Date(advice.lastDatePrior).getTime() > new Date().getTime(),
      );
    // Join all the arrays of dividends and subscriptions and other stuff
    return [
      ...cashDividendsAfterToday,
      ...stockDividendsAfterToday,
      ...subscriptionsAfterToday,
    ];
  }

  useEffect(() => {
    getValidAdvices().then(result => {
      // Join the stocks with the advices
      const presentation = stocks.flatMap(stock => {
        const findStock = result
          .filter(
            advice =>
              advice.ticker === stock.ticker &&
              stock.startDate < advice.lastDatePrior,
          )
          .map(advice => ({ ...advice, amount: stock.amount }));
        return findStock;
      });

      // Elements with the same rate will be grouped together and the amount will be summed
      const grouped = presentation.reduce(
        (acc, curr) => {
          function getSpecificProp(
            item: CashDividend | StockDividend | Subscription,
          ): number {
            if (isCashDividend(item)) {
              return Number(item.rate.toFixed(2));
            } else if (isStockDividend(item)) {
              return item.factor;
            } else {
              return item.priceUnit;
            }
          }

          const find = acc.find(
            obj => getSpecificProp(obj) === getSpecificProp(curr),
          );
          if (find) {
            find.amount += curr.amount;
            return acc;
          }
          return [...acc, curr];
        },
        [] as Array<
          (StockDividend | CashDividend | Subscription) & {
            amount: number;
            ticker: string;
          }
        >,
      );
      setAdvices(grouped);
    });
  }, [stocks]);
  return (
    <div className="flex flex-col gap-y-4 w-full border-opacity-50">
      {advices.map(value => {
        const presentation = handlePresentation(value);
        return (
          <div
            key={crypto.randomUUID()}
            className="grid card bg-base-300 rounded-xl py-2 px-4">
            <div className="flex justify-between">
              <h3 className="font-semibold text-xs">{presentation.title}</h3>
              <span className="text-xs">{presentation.label}</span>
            </div>
            <span className="text-xs">{presentation.description}</span>
            <span className="text-xs">{presentation.date}</span>
          </div>
        );
      })}
    </div>
  );
}
