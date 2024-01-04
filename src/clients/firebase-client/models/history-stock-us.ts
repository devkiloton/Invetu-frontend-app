export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}
export type DailyValue = {
  '1. open': '161.1000';
  '2. high': '162.4100';
  '3. low': '161.0000';
  '4. close': '162.1400';
  '5. volume': '2442715';
};

export type TimeSeriesDaily = Record<string, DailyValue>;

export interface HistoryStockUS {
  'Meta Data': MetaData;
  'Time Series (Daily)': TimeSeriesDaily;
}
