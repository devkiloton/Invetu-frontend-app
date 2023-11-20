import { StockDividend } from '~/clients/foxbat-client/models/DividendsAPI';

// type guard function to check if the object is a StockDividend
export const isStockDividend = (item: any): item is StockDividend => {
  return 'factor' in item;
};
