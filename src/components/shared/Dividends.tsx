import { useEffect, useState } from 'react';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import {
  CashDividend,
  CashDividendLabel,
  StockDividend,
  StockDividendLabel,
  Subscription,
} from '~/clients/foxbat-client/models/DividendsAPI';
import { joinStockData } from '~/helpers/join-stock-data';

// type guard function to check if the object is a StockDividend
function isStockDividend(item: any): item is StockDividend {
  return 'factor' in item;
}

function isCashDividend(item: any): item is CashDividend {
  return 'rate' in item;
}

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
    const advices = await foxbatClient().stocks.findDividends(
      joinStockData(stocks).map(stock => stock.ticker),
    );

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
    return [
      ...cashDividendsAfterToday,
      ...stockDividendsAfterToday,
      ...subscriptionsAfterToday,
    ];
  }

  useEffect(() => {
    getValidAdvices().then(result => {
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
      console.log(grouped);
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

export const formatDateBr = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export function handlePresentation(
  item: (StockDividend | CashDividend | Subscription) & {
    amount: number;
    ticker: string;
  },
): {
  title: string;
  label: string;
  description: string;
  date: string;
  datePrior: string;
} {
  if (isCashDividend(item)) {
    switch (item.label) {
      case CashDividendLabel.dividendo:
        return {
          title: item.ticker,
          label: 'Dividendo',
          description: `${Number(item.rate.toFixed(2))} x ${
            item.amount
          } = R$ ${(Number(item.rate.toFixed(2)) * item.amount).toFixed(2)}`,
          date: `Pagamento: ${formatDateBr(item.paymentDate)}`,
          datePrior: `Data com: ${formatDateBr(item.lastDatePrior)}`,
        };
      case CashDividendLabel.jrsCapProprio:
        return {
          title: item.ticker,
          label: 'JCP',
          description: `${Number(item.rate.toFixed(2))} x ${
            item.amount
          } = R$ ${(Number(item.rate.toFixed(2)) * item.amount).toFixed(2)}`,
          date: `Pagamento: ${formatDateBr(item.paymentDate)}`,
          datePrior: `Data com: ${formatDateBr(item.lastDatePrior)}`,
        };
      case CashDividendLabel.rendimento:
        return {
          title: item.ticker,
          label: 'Rendimento',
          description: `${Number(item.rate.toFixed(2))} x ${
            item.amount
          } = R$ ${(Number(item.rate.toFixed(2)) * item.amount).toFixed(2)}`,
          date: `Pagamento: ${formatDateBr(item.paymentDate)}`,
          datePrior: `Data com: ${formatDateBr(item.lastDatePrior)}`,
        };
    }
  } else if (isStockDividend(item)) {
    switch (item.label) {
      case StockDividendLabel.desdobramento:
        return {
          title: item.ticker,
          label: 'Desdobramento',
          description: `Voce terá ${item.factor} x ${item.amount} = ${(
            item.factor * item.amount
          ).toFixed(2)} unidades`,
          date: formatDateBr(item.lastDatePrior),
          datePrior: formatDateBr(item.lastDatePrior),
        };
      case StockDividendLabel.grupamento:
        return {
          title: item.ticker,
          label: 'Grupamento',
          description: `Voce terá ${item.amount} ÷ ${item.factor} = ${(
            item.amount / item.factor
          ).toFixed(2)} unidades`,
          date: `Data: ${formatDateBr(item.lastDatePrior)}`,
          datePrior: formatDateBr(item.lastDatePrior),
        };
      case StockDividendLabel.bonificacao:
        return {
          title: item.ticker,
          label: 'Bonificação',
          description: `Voce terá mais ${item.factor / 100} x ${
            item.amount
          } = ${(item.factor * item.amount).toFixed(2)}`,
          date: formatDateBr(item.lastDatePrior),
          datePrior: formatDateBr(item.lastDatePrior),
        };
      case StockDividendLabel.cisRedCap:
        return {
          title: item.ticker,
          label: 'Cisão com redução de capital',
          description: `Voce terá ${item.factor} x ${item.amount} = ${(
            item.factor * item.amount
          ).toFixed(2)} unidades`,
          date: formatDateBr(item.lastDatePrior),
          datePrior: formatDateBr(item.lastDatePrior),
        };
    }
  } else {
    return {
      title: item.ticker,
      label: 'Subscrição',
      description: `Preço unitário: ${item.priceUnit.toFixed(2)}`,
      date: `Encerramento: ${formatDateBr(item.lastDatePrior)}`,
      datePrior: `Encerramento: ${formatDateBr(item.lastDatePrior)}`,
    };
  }
}
