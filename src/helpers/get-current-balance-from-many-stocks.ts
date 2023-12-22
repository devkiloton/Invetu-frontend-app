import { Stock } from '~/clients/firebase-client/models/Investments';
import { Result } from '~/clients/firebase-client/models/history-stock-br';

export const getCurrentBalanceFromManyStocks = (
  stocks: Array<Stock>,
  results: Array<Result>,
): number => {
  return stocks.reduce((acc, stock) => {
    const currentPrice = results.find(
      stockResponse => stockResponse.symbol === stock.ticker,
    )?.regularMarketPrice;
    return acc + (currentPrice as number) * stock.amount;
  }, 0);
};
