import { ApexOptions } from 'apexcharts';
import { Range } from '~/types/range';

export const INVESTMENT_CARD_CHART_OPTIONS = (
  dates: Array<string>,
  range: Range,
): ApexOptions => ({
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
      format: range === '1d' ? 'dd/MM/yy HH:mm' : 'dd/MM/yy',
    },
  },
});
