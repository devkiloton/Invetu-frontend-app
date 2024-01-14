import { isNil } from 'lodash-es';
import { Stock } from '~/clients/firebase-client/models/Investments';

/**
 *  Join stocks with the same ticker and currency
 * @param stocks - An array of stocks
 * @returns The stocks with the same ticker and currency joined and other stocks that don't have repeated ticker and currency
 */
export const joinStockData = (stocks: Array<Stock>): Array<Stock> => {
  const stockMap: Record<string, Stock> = {};

  stocks.forEach(stock => {
    const { ticker, price, amount, startDate, currency, type } = stock;
    const stockKey = `${ticker}_${currency}`;

    if (!stockMap[stockKey]) {
      stockMap[stockKey] = {
        ticker,
        price,
        amount,
        startDate,
        currency,
        type,
      };
    } else {
      // calculate the new average price considering the new amount
      const stock = stockMap[stockKey];
      if (isNil(stock)) return;
      const newAveragePrice =
        (stock.price * stock.amount + price * amount) / (stock.amount + amount);
      stock.price = newAveragePrice;

      stock.amount += amount;
      stock.startDate = new Date(
        Math.min(
          new Date(stock.startDate).getTime(),
          new Date(startDate).getTime(),
        ),
      ).toISOString();
    }
  });

  const stockAnalysis: Array<Stock> = [];

  for (const key in stockMap) {
    const stock = stockMap[key];
    if (!isNil(stock)) {
      stockAnalysis.push(stock);
    }
  }

  return stockAnalysis;
};
