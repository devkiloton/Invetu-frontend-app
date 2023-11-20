import {
  CashDividend,
  CashDividendLabel,
  StockDividend,
  StockDividendLabel,
  Subscription,
} from '~/clients/foxbat-client/models/DividendsAPI';
import { formatDateBr } from './format-date-br';
import { isStockDividend } from '~/type-guards/is-stock-dividend';
import { isCashDividend } from '~/type-guards/is-cash-dividend';

export function handlePresentation(
  item: (StockDividend | CashDividend | Subscription) & {
    amount: number;
    ticker: string;
  },
): {
  title: string;
  label: string;
  description: string;
  date: string;
  datePrior: string;
} {
  if (isCashDividend(item)) {
    switch (item.label) {
      case CashDividendLabel.dividendo:
        return {
          title: item.ticker,
          label: 'Dividendo',
          description: `${Number(item.rate.toFixed(2))} x ${
            item.amount
          } = R$ ${(Number(item.rate.toFixed(2)) * item.amount).toFixed(2)}`,
          date: `Pagamento: ${formatDateBr(item.paymentDate)}`,
          datePrior: `Data com: ${formatDateBr(item.lastDatePrior)}`,
        };
      case CashDividendLabel.jrsCapProprio:
        return {
          title: item.ticker,
          label: 'JCP',
          description: `${Number(item.rate.toFixed(2))} x ${
            item.amount
          } = R$ ${(Number(item.rate.toFixed(2)) * item.amount).toFixed(2)}`,
          date: `Pagamento: ${formatDateBr(item.paymentDate)}`,
          datePrior: `Data com: ${formatDateBr(item.lastDatePrior)}`,
        };
      case CashDividendLabel.rendimento:
        return {
          title: item.ticker,
          label: 'Rendimento',
          description: `${Number(item.rate.toFixed(2))} x ${
            item.amount
          } = R$ ${(Number(item.rate.toFixed(2)) * item.amount).toFixed(2)}`,
          date: `Pagamento: ${formatDateBr(item.paymentDate)}`,
          datePrior: `Data com: ${formatDateBr(item.lastDatePrior)}`,
        };
    }
  } else if (isStockDividend(item)) {
    switch (item.label) {
      case StockDividendLabel.desdobramento:
        return {
          title: item.ticker,
          label: 'Desdobramento',
          description: `Voce terá ${item.factor} x ${item.amount} = ${(
            item.factor * item.amount
          ).toFixed(2)} unidades`,
          date: formatDateBr(item.lastDatePrior),
          datePrior: formatDateBr(item.lastDatePrior),
        };
      case StockDividendLabel.grupamento:
        return {
          title: item.ticker,
          label: 'Grupamento',
          description: `Voce terá ${item.amount} ÷ ${item.factor} = ${(
            item.amount / item.factor
          ).toFixed(2)} unidades`,
          date: `Data: ${formatDateBr(item.lastDatePrior)}`,
          datePrior: formatDateBr(item.lastDatePrior),
        };
      case StockDividendLabel.bonificacao:
        return {
          title: item.ticker,
          label: 'Bonificação',
          description: `Voce terá mais ${item.factor / 100} x ${
            item.amount
          } = ${(item.factor * item.amount).toFixed(2)}`,
          date: formatDateBr(item.lastDatePrior),
          datePrior: formatDateBr(item.lastDatePrior),
        };
      case StockDividendLabel.cisRedCap:
        return {
          title: item.ticker,
          label: 'Cisão com redução de capital',
          description: `Voce terá ${item.factor} x ${item.amount} = ${(
            item.factor * item.amount
          ).toFixed(2)} unidades`,
          date: formatDateBr(item.lastDatePrior),
          datePrior: formatDateBr(item.lastDatePrior),
        };
    }
  } else {
    return {
      title: item.ticker,
      label: 'Subscrição',
      description: `Preço unitário: ${item.priceUnit.toFixed(2)}`,
      date: `Encerramento: ${formatDateBr(item.lastDatePrior)}`,
      datePrior: `Encerramento: ${formatDateBr(item.lastDatePrior)}`,
    };
  }
}
