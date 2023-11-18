import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import bacenClient from '~/clients/bacen-client';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import { HistoryAPI, Result } from '~/clients/foxbat-client/models/HistoryAPI';
import getProfit from '~/helpers/get-profit';
import getStockAllocation from '~/helpers/get-stock-allocation';
import { joinStockData } from '~/helpers/join-stock-data';

function valueToPercent(value: Array<number>): Array<number> {
  // find the max value in the array
  const max = Math.max(...value);
  return value.map(v => (max !== 0 ? (v / max) * 100 : 0));
}

const RadialChart = ({
  investments,
  stocksHistory,
}: {
  investments: Array<Stock>;
  stocksHistory: Array<HistoryAPI>;
}) => {
  const [series, setSeries] = useState<Array<number>>([]);
  const [apexOptions, setApexOptions] = useState<ApexOptions>({});

  async function getSeries() {
    const cdi = bacenClient().cdi.findAccumulatedCurrentMonth();
    const ibov = getIbov();
    const portfolio = investments
      .map(stock => {
        const result = stocksHistory[0].results.find(
          stockHistory => stockHistory.symbol === stock.ticker,
        );
        const dataStockThisMonth = getDataStocksThisMonth([result as Result]);
        // take all the investements before this month
        const investimentsBeforeThisMonth = investments.filter(
          value =>
            new Date(value.startDate).getTime() <
            dataStockThisMonth.firstDay.date * 1000,
        );
        // join  them
        const joinedStockData = joinStockData(investimentsBeforeThisMonth);
        // take the value of each one
        const investimentsBeforeThisMonthValue = joinedStockData
          .map(value => dataStockThisMonth.firstDay.close * value.amount)
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        // take the allocation of the current stock in the past month as a percent as string and convert to number
        const allocation = Number(
          getStockAllocation(
            stock.amount,
            dataStockThisMonth.firstDay.close,
            investimentsBeforeThisMonthValue,
          ),
        );
        // multiply by the percent variation
        const variation = Number(
          getProfit(
            dataStockThisMonth.firstDay.close,
            dataStockThisMonth.lastDay.close,
          ),
        );

        return (allocation * variation) / 100;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return await Promise.all([ibov, cdi]).then(values => {
      return [portfolio, Number(values[0]), Number(values[1][0].valor)];
    });
  }

  function getDataStocksThisMonth(history: Array<Result>) {
    // takes the percent variation between the first value of the current month and the last value
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const timestampFirstDayMonth = new Date(y, m, 1).getTime();
    const validData = history[0].historicalDataPrice.filter(
      h => h.date * 1000 >= timestampFirstDayMonth,
    );
    const dataFromFirstDay =
      history[0].historicalDataPrice[validData.length - 1];
    const dataFromLastDay = validData[validData.length - 1];
    return {
      firstDay: dataFromFirstDay,
      lastDay: dataFromLastDay,
    };
  }

  async function getIbov() {
    const ibov = await foxbatClient().stocks.findHistory({
      ticker: ['^BVSP'],
      range: '1mo',
      interval: '1d',
    });
    // takes the percent variation between the first value of the current month and the last value
    const { firstDay, lastDay } = getDataStocksThisMonth(ibov[0].results);
    const result = getProfit(firstDay.close, lastDay.close);
    return result;
  }

  useEffect(() => {
    // be careful case the user don't have any stock
    getSeries().then(s => {
      setSeries(valueToPercent(s));
      setApexOptions({
        ...options,
        labels: [
          `Você: ${s[0].toFixed(2)}%`,
          `IBOV: ${s[1].toFixed(2)}%`,
          `CDI: ${s[2].toFixed(2)}%`,
        ],
      });
    });
  }, [stocksHistory]);
  const options: ApexOptions = {
    chart: {
      height: 400,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: -2,
        startAngle: 0,
        endAngle: 270,
        track: {
          background: '#8f8f8fc8',
          opacity: 0.2,
        },
        hollow: {
          margin: 0,
          size: '40%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ['#0084ff', '#1ab7ea', '#5361dd'],

    stroke: {
      lineCap: 'round',
    },
    legend: {
      show: true,
      floating: true,
      fontSize: '12px',
      position: 'left',
      labels: {
        useSeriesColors: true,
      },
      fontWeight: 500,
      fontFamily: 'Poppins, sans-serif',
      markers: {
        size: 2,
        width: 20,
        height: 10,
      },
      itemMargin: {
        vertical: 0,
      },
      containerMargin: {
        left: 0,
        top: 0,
      },
    },
  };

  return (
    <div className="w-[265px] h-[300px]" id="chart">
      {series.length > 0 && (
        <ReactApexChart
          options={apexOptions}
          series={series}
          type="radialBar"
          height={350}
        />
      )}
    </div>
  );
};

export default RadialChart;
