import { HistoryIPCA } from '~/clients/bacen-client/models/history-ipca';
import { isWorkDayBr } from './is-work-day-br';
import { range } from 'lodash-es';
import { getPreviousMonthDate } from './get-previous-month-date';

export const getprofitIpca = (
  startDate: Date,
  endDate: Date,
  amount: number,
  tax: number,
  historyIpca: HistoryIPCA,
) => {
  // Get all years between start and end
  const years = range(startDate.getFullYear(), endDate.getFullYear() + 1);
  // Create an record for each year with all the days for that year
  const days = years.reduce((acc, curr) => {
    const daysInYear = range(0, 365).map(day => {
      return new Date(curr, 0, day);
    });
    return [...acc, ...daysInYear];
  }, [] as Array<Date>);
  // Filter only work days for each year
  const workDays = days.filter(day => isWorkDayBr(day));
  // Create a record for each year
  const yearsRecord = years.reduce(
    (acc, curr) => {
      return {
        ...acc,
        [curr]: workDays.filter(day => day.getFullYear() === curr),
      };
    },
    {} as Record<number, Array<Date>>,
  );
  // Takes the daily profit for each year
  const dailyProfitWithYear = Object.keys(yearsRecord).map(year => {
    const yearDays = yearsRecord[Number(year)].length;
    const dailyProfit = Math.pow(1 + tax / 100, 1 / yearDays) - 1;
    return {
      year: Number(year),
      profit: dailyProfit,
    };
  });
  // Filter the dates between start and end of the investment
  const dates = workDays.filter(day => day >= startDate && day <= endDate);

  // Creates an array of numbers using investmentDates to reduce the dates to the actual amount of money for that day
  const prices = dates.reduce(
    (acc, curr) => {
      const year = curr.getFullYear();
      const dailyProfit = dailyProfitWithYear.find(
        dailyProfit => dailyProfit.year === year,
      )?.profit;
      if (!dailyProfit) throw new Error('Daily profit not found');

      // Find the ipca for the current date
      const ipca = historyIpca
        .slice(historyIpca.length - dates.length / 12, historyIpca.length)
        .find(
          result =>
            result.data ===
            `01/${getPreviousMonthDate(
              curr.toLocaleDateString('pt-BR').split(',')[0],
            ).slice(3, 10)}`,
        );
      if (!ipca) return [...acc];
      // Get the work days for that month
      const workDaysMonth = yearsRecord[year].filter(
        day => day.getMonth() === curr.getMonth(),
      );
      // Calculate the ipca's daily profit for that month
      const ipcaDailyProfit =
        Math.pow(1 + Number(ipca.valor) / 100, 1 / workDaysMonth.length) - 1;

      const profit = acc[acc.length - 1] * (1 + dailyProfit + ipcaDailyProfit);
      return [...acc, profit];
    },
    [amount],
  );
  const totalProfit = prices[prices.length - 1];
  return { dates, prices, totalProfit };
};
