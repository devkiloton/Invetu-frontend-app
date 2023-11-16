/* eslint-disable no-undef */
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function InvestementCardChart() {
    const [options, setOptions] = useState<ApexOptions>({
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
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        })
    const [series, setSeries] = useState<ApexAxisChartSeries>(
        [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          }],
)
  

    
      return (<div id="chart">
<ReactApexChart options={options} series={series} type="area" height={250}  />
</div>)
  }