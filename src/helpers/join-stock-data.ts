import { Stock } from '~/clients/firebase-client/models/Investments';

export const joinStockData = (stocks: Array<Stock>) => {
  const stockMap = {} as any;

  stocks.forEach(stock => {
    const { userID, ticker, price, amount, startDate, currency } = stock;
    const stockKey = `${userID}_${ticker}_${currency}`;

    if (!stockMap[stockKey]) {
      stockMap[stockKey] = {
        userID,
        ticker,
        price,
        amount,
        startDate,
        currency,
      };
    } else {
      stockMap[stockKey].amount += amount;
      stockMap[stockKey].startDate = Math.min(stockMap[stockKey].startDate, startDate);
    }
  });

  const stockAnalysis = [];

  for (const key in stockMap) {
    stockAnalysis.push(stockMap[key]);
  }

  return stockAnalysis;
};
