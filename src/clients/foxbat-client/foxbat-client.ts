import { DividendsAPI } from './models/DividendsAPI';
import { FuzzyAPI } from './models/FuzzyAPI';
import { HistoryAPI } from './models/HistoryAPI';
import { RawStocksAPI, StocksAPI } from './models/StocksAPI';
import { FindHistoryParams } from './types/find-history-params';

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
      findHistory: async (
        info: FindHistoryParams,
      ): Promise<Array<HistoryAPI>> => {
        const data: Array<HistoryAPI> = await fetch(
          `${API_URL}/stocks/history/${info.ticker}?range=${info.range}&interval=${info.interval}`,
        ).then(res => res.json());
        const joinResults = data.flatMap((item: HistoryAPI) => item.results);
        // Case when the API returns 2 arrays(it happens when the stocks requested are more than 10) we'll join them
        // PS: We should apply this to all the other methods
        data[0].results = joinResults;
        if (data.length > 1) {
          for (let i = 1; i < data.length; i++) {
            delete data[i];
          }
        }
        return data;
      },
      findMany: async (tickers: string[]): Promise<StocksAPI> => {
        const tickersString = tickers.join(',');
        const stocks: RawStocksAPI = await fetch(
          `${API_URL}/stocks/${tickersString}`,
        ).then(res => res.json());
        return stocks[0];
      },
      findDividends: async (tickers: Array<string>): Promise<DividendsAPI> => {
        const tickersString = tickers.join(',');
        const dividends = await fetch(
          `${API_URL}/stocks/dividends/${tickersString}`,
        ).then(res => res.json());
        return dividends[0];
      },
    },
  };
  return client;
};
