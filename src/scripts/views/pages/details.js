import Chart from 'chart.js/auto';
import DataSource from '../../data/data-source';
import UrlParser from '../../routes/url-parser';
import getAqiInfo from '../../utils/get-aqi-info';

const Detail = {
  async render() {
    return `
        <div class="detail-container">Ini halaman Detail Station </div>
        <div class="chart">
          <canvas id="aqiChart" width="1" height="1"></canvas>
          <canvas id="aqiChartForecast" width="1" height="1"></canvas>
        </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const station = await DataSource.stationDetail(url.id);

    const detailContainerElement = document.querySelector('.detail-container');

    detailContainerElement.innerHTML += `${station.idx}`;
    detailContainerElement.innerHTML += `<p>${station.city.name}</p>`;
    detailContainerElement.innerHTML += `<p>Data by: <a href="${station.attributions[0].url}" target="_blank">${station.attributions[0].name}</a></p>`;
    detailContainerElement.innerHTML += `<p>Provided by: <a href="${station.attributions[1].url}" target="_blank">${station.attributions[1].name}</a></p>`;

    console.log(url.id);

    const aqiColors = ['#38d020', '#E7BE27', '#F28330', '#E9474A', '#923BC5', '#7B2D51', 'lightgray'];
    const aqiStatus = ['Baik', 'Sedang', 'Tidak sehat untuk kelompok sensitif', 'Tidak sehat', 'Sangat tidak sehat', 'Berbahaya', 'Data tidak ada'];

    if (station.attributions[0].name === 'Kementerian Lingkungan Hidup Dan Kehutanan') {
      const iaqiData = station.iaqi;

      const gaslabels = ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'];
      const values = Object.values(iaqiData).map((item) => item.v);

      console.log(values);
      console.log(gaslabels);

      const ctx = document.getElementById('aqiChart').getContext('2d');
      const aqiChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: gaslabels,
          datasets: [
            {
              data: values,
              backgroundColor: (context) => getAqiInfo(values[context.dataIndex], aqiColors),
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
                label: (context) => `Status: ${getAqiInfo(values[context.dataIndex], aqiStatus)} (${values[context.dataIndex]})`,
              },
            },
          },
        },
      });
    }

    if (station.attributions[0].name === 'BMKG | Badan Meteorologi, Klimatologi dan Geofisika') {
      const iaqiData = station.iaqi;
      const aqiDailyForecast = station.forecast.daily;
      const value = Object.values(iaqiData.pm25);

      const ctx = document.getElementById('aqiChart').getContext('2d');
      const aqiChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['PM2.5'],
          datasets: [
            {
              data: value,
              backgroundColor: (context) => getAqiInfo(value[context.dataIndex], aqiColors),
              barThickness: 200,
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
                label: (context) => `Status: ${getAqiInfo(value[context.dataIndex], aqiStatus)} (${value[context.dataIndex]})`,
              },
            },
          },
        },
      });

      if (aqiDailyForecast) {
        const labels = aqiDailyForecast.o3.map((entry) => entry.day);

        const datasets = [
          {
            label: 'O3',
            data: aqiDailyForecast.o3.map((entry) => entry.avg),
            backgroundColor: '#071952',
          },
          {
            label: 'PM10',
            data: aqiDailyForecast.pm10.map((entry) => entry.avg),
            backgroundColor: '#088395',
          },
          {
            label: 'PM2.5',
            data: aqiDailyForecast.pm25.map((entry) => entry.avg),
            backgroundColor: '#35A29F',
          },
        ];

        const fctx = document.getElementById('aqiChartForecast').getContext('2d');
        const aqiForecastChart = new Chart(fctx, {
          type: 'line',
          data: {
            labels,
            datasets,
          },
          options: {
            scales: {
              y: {
                max: 500,
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    if (station.attributions[0].name === 'Balai Besar Standardisasi dan Pelayanan Jasa Pencegahan Pencemaran Industri (BBSPJPPI)') {
      const iaqiData = station.iaqi;
      const values = Object.values([iaqiData.pm25, iaqiData.pm10]).map((item) => item.v);

      const ctx = document.getElementById('aqiChart').getContext('2d');
      const aqiChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['PM2.5', 'PM10'],
          datasets: [
            {
              data: values,
              backgroundColor: (context) => getAqiInfo(values[context.dataIndex], aqiColors),
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
                label: (context) => `Status: ${getAqiInfo(values[context.dataIndex], aqiStatus)} (${values[context.dataIndex]})`,
              },
            },
          },
        },
      });
    }
  },
};

export default Detail;
