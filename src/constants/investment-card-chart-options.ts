import { ApexOptions } from 'apexcharts';
import { Range } from '~/types/range';

export const INVESTMENT_CARD_CHART_OPTIONS = (
  dates: Array<string>,
  range?: Range,
  currency?: 'BRL' | 'USD',
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
    locales: [
      {
        name: 'pt-BR',
        options: {
          months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezemnbro',
          ],
          shortMonths: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          days: [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
          ],
          shortDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          toolbar: {
            exportToSVG: 'Baixar SVG',
            exportToPNG: 'Baixar PNG',
            exportToCSV: 'Baixar CSV',
            selection: 'Seleção',
            selectionZoom: 'Seleção de Zoom',
            zoomIn: 'Zoom In',
            zoomOut: 'Zoom Out',
            pan: 'Panning',
            reset: 'Resetar Zoom',
          },
        },
      },
    ],
    defaultLocale: 'pt-BR',
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
      formatter: (value: number) =>
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency,
        }).format(value),
    },
  },
  tooltip: {
    cssClass: 'text-gray-500',

    x: {
      format: range === '1d' ? 'dd/MM/yy HH:mm' : 'dd/MM/yy',
    },
  },
});
