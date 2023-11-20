/* eslint-disable no-undef */
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { EVOLUTION_CHART_OPTIONS } from '~/constants/evolution-chart-option';

export default function EvolutionChart() {
  const [options] = useState<{
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
    options: EVOLUTION_CHART_OPTIONS,
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
