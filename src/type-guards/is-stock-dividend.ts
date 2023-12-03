import { StockDividend } from '~/clients/invetu-client/models/DividendsAPI';

// type guard function to check if the object is a StockDividend
export const isStockDividend = (item: any): item is StockDividend => {
  return 'factor' in item;
};
