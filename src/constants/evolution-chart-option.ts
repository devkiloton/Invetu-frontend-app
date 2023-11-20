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
  grid: {
    borderColor: '#4093ff4b',
  },
  legend: {
    show: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: 'transparent',
    },
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z',
    ],
    labels: {
      style: {
        cssClass: 'fill-base-content',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        cssClass: 'fill-base-content',
      },
    },
  },
  tooltip: {
    cssClass: 'text-gray-500',

    x: {
      format: 'dd/MM/yy',
    },
  },
};
