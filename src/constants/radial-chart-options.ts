import { ApexOptions } from 'apexcharts';

export const RADIAL_CHART_OPTIONS: ApexOptions = {
  chart: {
    height: 400,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      offsetY: -2,
      startAngle: 0,
      endAngle: 293,
      track: {
        background: '#8f8f8fc8',
        opacity: 0.2,
      },
      hollow: {
        margin: 0,
        size: '40%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        },
      },
    },
  },
  colors: ['#0084ff', '#1ab7ea', '#5361dd'],

  stroke: {
    lineCap: 'round',
  },
  legend: {
    show: true,
    floating: true,
    fontSize: '12px',
    position: 'left',
    labels: {
      useSeriesColors: true,
    },
    fontWeight: 500,
    fontFamily: 'Poppins, sans-serif',
    markers: {
      width: 20,
      height: 10,
    },
    itemMargin: {
      vertical: 0,
    },
    containerMargin: {
      left: 0,
      top: 0,
    },
  },
};
