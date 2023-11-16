/* eslint-disable no-undef */
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function InvestementCardChart({ dates, prices }: { dates: string[], prices: number[] }) {
    const [options] = useState<ApexOptions>({
          chart: {
            height: 250,
            type: 'area',
            toolbar: {
                tools: {
                    zoomout: false,
                    zoomin: false,
                }
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: dates || [],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        })
    const [series] = useState<ApexAxisChartSeries>(
        [{
            name: 'series1',
            data: prices || []
          }],
)
  

    
      return (<div id="chart">
<ReactApexChart options={options} series={series} type="area" height={250}  />
</div>)
  }