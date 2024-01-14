import { CashDividend } from '~/clients/firebase-client/models/history-stock-br';

// type guard function to check if the object is a StockDividend
export const isCashDividend = (item: any): item is CashDividend => {
  return 'rate' in item;
};
