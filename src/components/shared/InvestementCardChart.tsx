/* eslint-disable no-undef */
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { INVESTMENT_CARD_CHART_OPTIONS } from '~/constants/investment-card-chart-options';
import { Range } from '~/types/range';

export default function InvestementCardChart({
  dates,
  prices,
  range,
}: {
  dates: string[];
  prices: number[];
  range: Range;
}) {
  const [options] = useState<ApexOptions>(
    INVESTMENT_CARD_CHART_OPTIONS(dates, range),
  );
  const [series] = useState<ApexAxisChartSeries>([
    {
      name: 'Preço',
      data: prices || [],
    },
  ]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </div>
  );
}
