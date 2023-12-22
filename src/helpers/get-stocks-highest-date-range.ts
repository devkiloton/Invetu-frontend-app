import { Stock } from '~/clients/firebase-client/models/Investments';
import { Range } from '~/types/range';

/**
 * Returns the highest range from the given array of stocks, if there's max range, return 10y and an array of stocks with max range
 */
export default function getStocksHighestDateRange(stocks: Array<Stock>): {
  stocksMaxRangeTickers: Array<string>;
  highestRange: Range;
} {
  const stocksMaxRangeTickers: Array<string> = [];
  let highestRange: Range = '1d';

  const sortedStocksDateDesc = stocks.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  sortedStocksDateDesc.forEach(stock => {
    const { startDate } = stock;
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 3650) {
      stocksMaxRangeTickers.push(stock.ticker);
      highestRange = '10y';
    } else if (diffDays > 730) {
      highestRange = '10y';
    } else if (diffDays > 365) {
      highestRange = '2y';
    } else if (diffDays > 180) {
      highestRange = '1y';
    } else if (diffDays > 90) {
      highestRange = '6mo';
    } else if (diffDays > 30) {
      highestRange = '3mo';
    } else if (diffDays > 5) {
      highestRange = '1mo';
    } else {
      highestRange = '5d';
    }
  });

  return { stocksMaxRangeTickers, highestRange };
}
