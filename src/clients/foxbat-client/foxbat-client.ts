import { FuzzyAPI } from './models/FuzzyAPI';
import { RawStocksAPI, StocksAPI } from './models/StocksAPI';

export const foxbatClient = () => {
  const API_URL = import.meta.env.VITE_API_ORIGIN;
  const client = {
    stocks: {
      fuzzy: async (ticker: string): Promise<Array<string>> => {
        const stocks = await fetch(`${API_URL}/stocks/fuzzy/${ticker}`);
        const stocksJson = (await stocks.json()) as FuzzyAPI;
        return stocksJson.stocks;
      },
      tickerInfo: async (ticker: string) => {
        const stock = await fetch(`${API_URL}/stocks/${ticker}`).then(res =>
          res.json(),
        );
        return stock[0];
      },
      findMany: async (tickers: string[]): Promise<StocksAPI> => {
        const tickersString = tickers.join(',');
        const stocks: RawStocksAPI = await fetch(
          `${API_URL}/stocks/${tickersString}`,
        ).then(res => res.json());
        return stocks[0];
      },
    },
  };
  return client;
};
