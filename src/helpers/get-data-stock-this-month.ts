import { Result } from '~/clients/foxbat-client/models/HistoryAPI';

export function getDataStocksThisMonth(history: Array<Result>) {
  // takes the percent variation between the first value of the current month and the last value
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const timestampFirstDayMonth = new Date(y, m, 1).getTime();
  const validData = history[0].historicalDataPrice.filter(
    h => h.date * 1000 >= timestampFirstDayMonth,
  );
  const dataFromFirstDay =
    history[0].historicalDataPrice[
      history[0].historicalDataPrice.length - validData.length - 1
    ];
  const dataFromLastDay = validData[validData.length - 1];
  return {
    firstDay: dataFromFirstDay,
    lastDay: dataFromLastDay,
  };
}
