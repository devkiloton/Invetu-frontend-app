import { FuzzyAPI } from './models/FuzzyAPI';
import { RawStocksAPI, StocksAPI } from './models/StocksAPI';

export const foxbatClient = () => {
  const client = {
    stocks: {
      fuzzy: async (ticker: string): Promise<Array<string>> => {
        const stocks = await fetch(`${process.env.API_URL}/stocks/fuzzy/${ticker}`);
        const stocksJson = (await stocks.json()) as FuzzyAPI;
        return stocksJson.stocks;
      },
      tickerInfo: async (ticker: string) => {
        return fetch(`${process.env.API_URL}/${ticker}`).then(res => res.json());
      },
      findMany: async (tickers: string[]): Promise<StocksAPI> => {
        const tickersString = tickers.join(',');
        const stocks: RawStocksAPI = await fetch(`${process.env.API_URL}/stocks/${tickersString}`).then(res =>
          res.json(),
        );
        return stocks[0];
      },
    },
  };
  return client;
};
