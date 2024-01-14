import {
  CashDividend,
  StockDividend,
  Subscription,
} from '~/clients/firebase-client/models/history-stock-br';
import { isCashDividend } from '~/type-guards/is-cash-dividend';
import { isStockDividend } from '~/type-guards/is-stock-dividend';

export function getSpecificProp(
  item: CashDividend | StockDividend | Subscription,
): number {
  if (isCashDividend(item)) {
    return Number(item.rate.toFixed(2));
  } else if (isStockDividend(item)) {
    return item.factor;
  } else {
    return item.priceUnit;
  }
}
