/* eslint-disable no-undef */
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function EvolutionChart() {
  const [options, setOptions] = useState<{
    series: ApexAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [
      {
        name: 'Investido',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Valor bruto',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
          //   tools: {
          //     zoom: false,
          //     pan: false,
          //     reset: false,
          //     zoomin: false,
          //     zoomout: false,
          //     download: false,
          //   },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  });
  return (
    <ReactApexChart
      options={options.options}
      series={options.series}
      type="area"
      height={270}
    />
  );
}
