import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import bacenClient from '~/clients/bacen-client';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import getProfit from '~/helpers/get-profit';

function valueToPercent(value: Array<number>): Array<number> {
  // find the max value in the array
  const max = Math.max(...value);
  return value.map(v => (max !== 0 ? (v / max) * 100 : 0));
}

const RadialChart = () => {
  const [series, setSeries] = useState<Array<number>>([0, 0, 0]);
  const [apexOptions, setApexOptions] = useState<ApexOptions>({});

  async function getSeries() {
    const cdi = bacenClient().cdi.findAccumulatedCurrentMonth();
    const ibov = getIbov();

    return await Promise.all([ibov, cdi]).then(values => { 
      return [0, Number(values[0]), Number(values[1][0].valor)]
    })
  }

  async function getIbov() {
    const ibov = await foxbatClient().stocks.findHistory({
      ticker: ['^BVSP'],
      range: '1mo',
      interval: '1d',
    })
    // takes the percent variation between the first value of the current month and the last value
    const date = new Date(); const y = date.getFullYear(); const m = date.getMonth();
    const timestampFirstDayMonth = new Date(y, m, 1).getTime();
    const validData = ibov.results[0].historicalDataPrice.filter(h => h.date * 1000 >= timestampFirstDayMonth);
    const dataFromFirstDay = ibov.results[0].historicalDataPrice[validData.length - 1].close
    const dataFromLastDay = validData[validData.length - 1].close
    const result = getProfit(dataFromFirstDay, dataFromLastDay)
    return result
    
  }

  useEffect(() => {
    getSeries().then(s => {
      setSeries(valueToPercent(s));
      setApexOptions({
        ...options, legend: {
          ...options.legend, formatter: function (seriesName, opts) { 
            console.log(opts)
            return `${s[opts.seriesIndex]}% - ${seriesName}`;
          }
      } })
    });

  }, []);
  const options: ApexOptions ={
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
      
    labels: ['Você', 'IBOV', 'CDI'],
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
        formatter: function (seriesName, opts) {
          return `${series[opts.seriesIndex]}% - ${seriesName}`;
        },
        itemMargin: {
          vertical: 0,
        },
        containerMargin: {
          left: 0,
          top: 0,
        },
      },
    }

  return (
    <div className="w-[265px] h-[300px]" id="chart">
      {apexOptions && <ReactApexChart
        options={apexOptions}
        series={series}
        type="radialBar"
        height={350}
      />}
      
    </div>
  );
};

export default RadialChart;
