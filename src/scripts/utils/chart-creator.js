import Chart from 'chart.js/auto';
import getAqiInfo from './get-aqi-info';

/* eslint-disable max-len */
const createBarChart = (ctx, labels, values, backgroundColor, status, barThickness = null) => new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: (context) => getAqiInfo(values[context.dataIndex], backgroundColor),
        barThickness,
      },
    ],
  },
  options: {
    scales: {
      y: {
        max: 300,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Status: ${getAqiInfo(values[context.dataIndex], status)} (${values[context.dataIndex]})`,
        },
      },
    },
  },
});

const createLineChart = (ctx, labels, datasets, maxY) => new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets,
  },
  options: {
    scales: {
      y: {
        max: maxY,
        beginAtZero: true,
      },
    },
  },
});

export {
  createBarChart,
  createLineChart,
};
