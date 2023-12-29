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
      const newAveragePrice =
        (stockMap[stockKey].price * stockMap[stockKey].amount +
          price * amount) /
        (stockMap[stockKey].amount + amount);
      stockMap[stockKey].price = newAveragePrice;

      stockMap[stockKey].amount += amount;
      stockMap[stockKey].startDate = new Date(
        Math.min(
          new Date(stockMap[stockKey].startDate).getTime(),
          new Date(startDate).getTime(),
        ),
      ).toISOString();
    }
  });

  const stockAnalysis = [];

  for (const key in stockMap) {
    stockAnalysis.push(stockMap[key]);
  }

  return stockAnalysis;
};
