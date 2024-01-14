export type HistoryCryptoUS = {
  id: string;
  /**
   * Index 0 of subarray is the timestamp, index 1 is the price
   */
  results: number[][];
};

export type DataCryptos = HistoryCryptoUS[];
