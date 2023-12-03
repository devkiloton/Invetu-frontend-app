import { isNil } from 'lodash-es';
import { Result } from '~/clients/invetu-client/models/HistoryAPI';

export function getDataStocksThisMonth(
  history: Array<Result & { date: number }>,
) {
  // takes the percent variation between the first value of the current month and the last value
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const timestampFirstDayMonth = new Date(y, m, 1).getTime();
  const validData = history[0].historicalDataPrice.filter(
    h => h.date * 1000 >= timestampFirstDayMonth,
  );
  const dataFromFirstDay = {
    ...history[0].historicalDataPrice[
      history[0].historicalDataPrice.length - validData.length - 1
    ],
    date: timestampFirstDayMonth,
  };
  const dataFromLastDay = {
    ...(isNil(validData[validData.length - 1].close)
      ? validData[validData.length - 2]
      : validData[validData.length - 1]),
    date:
      validData[validData.length - 1].date ??
      validData[validData.length - 2].date,
  };

  return {
    firstDay: dataFromFirstDay,
    lastDay: dataFromLastDay,
  };
}
