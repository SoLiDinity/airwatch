import Chart from 'chart.js/auto';
import getAqiInfo from './get-aqi-info';
import aqi from '../globals/aqi-arrays';

const aqiColors = aqi.colors;
const aqiStatus = aqi.status;

const progressBar = {
  id: 'progressBar',
  beforeDatasetDraw(chart) {
    const {
      ctx,
      data,
      chartArea: { left, right, width },
      scales: { x, y },
    } = chart;

    ctx.save();
    const barHeight = 15;

    data.datasets[0].data.forEach((datapoint, index) => {
      const fontSizeLabel = 12;
      ctx.font = `bolder ${fontSizeLabel}px sans-serif`;
      ctx.fillStyle = 'black';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 7);

      const fontSizeDataPoint = fontSizeLabel;
      ctx.font = `${fontSizeDataPoint}px sans-serif`;
      ctx.fillStyle = `${getAqiInfo(datapoint, aqiColors)}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `${getAqiInfo(datapoint, aqiStatus)} | ${datapoint || '-'}`,
        right,
        y.getPixelForValue(index) - fontSizeDataPoint - 7,
      );

      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.075)';
      ctx.fillRect(left, y.getPixelForValue(index) - barHeight / 2, width, barHeight);
    });
  },
};

/* eslint-disable max-len */
const createBarChart = (ctx, labels, values) =>
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: context => getAqiInfo(values[context.dataIndex], aqiColors),
          borderRadius: 50,
          barThickness: 10,
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      scales: {
        y: {
          max: 300,
          beginAtZero: true,
          grid: {
            display: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
        x: {
          max: 300,
          grid: {
            display: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: context =>
              `Status: ${getAqiInfo(values[context.dataIndex], aqiStatus)} (${
                values[context.dataIndex]
              })`,
          },
        },
      },
    },
    plugins: [progressBar],
  });

const createLineChart = (ctx, labels, datasets, maxY) =>
  new Chart(ctx, {
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

export { createBarChart, createLineChart };
