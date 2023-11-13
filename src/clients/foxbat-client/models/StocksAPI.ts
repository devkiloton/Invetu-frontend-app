export type RawStocksAPI = StocksAPI[];

export interface StocksAPI {
  results: Result[];
  requestedAt: string;
  took: string;
}

export interface Result {
  symbol: string;
  currency: string;
  twoHundredDayAverage?: number;
  twoHundredDayAverageChange?: number;
  twoHundredDayAverageChangePercent?: number;
  marketCap?: number;
  shortName: string;
  longName?: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  averageDailyVolume3Month?: number;
  averageDailyVolume10Day?: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: any;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent?: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  priceEarnings?: number;
  earningsPerShare?: number;
  logourl: string;
  updatedAt: string;
}
