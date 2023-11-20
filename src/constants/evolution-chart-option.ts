import { ApexOptions } from 'apexcharts';

export const EVOLUTION_CHART_OPTIONS: ApexOptions = {
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
};
