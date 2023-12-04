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
    padding: { left: -5, right: 0, top: 0, bottom: 0 },
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
      '2018-01-19T00:00:00.000Z',
      '2018-02-19T01:30:00.000Z',
      '2018-03-19T02:30:00.000Z',
      '2018-04-19T03:30:00.000Z',
      '2018-05-19T04:30:00.000Z',
      '2018-06-19T05:30:00.000Z',
      '2018-07-19T06:30:00.000Z',
    ],
    labels: {
      style: {
        cssClass: 'fill-base-content',
      },
    },
  },
  yaxis: {
    labels: {
      offsetX: -15,
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
