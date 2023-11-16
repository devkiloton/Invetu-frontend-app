/* eslint-disable no-undef */
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function InvestementCardChart({
  dates,
  prices,
}: {
  dates: string[];
  prices: number[];
}) {
  const [options] = useState<ApexOptions>({
    chart: {
      height: 250,
      type: 'area',
      toolbar: {
        tools: {
          zoomout: false,
          zoomin: false,
        },
      },
      
    },
    grid: {
      borderColor: '#4093ff4b',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
         color: 'transparent',
      },
      categories: dates || [],
      labels: {
        style: {
          cssClass: 'fill-base-content',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          cssClass: 'fill-base-content',
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy',
      },
      
    },
  });
  const [series] = useState<ApexAxisChartSeries>([
    {
      name: 'Preço',
      data: prices || [],
    },
  ]);

  return (
    <div className="fill-r" id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </div>
  );
}
