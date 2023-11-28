import DataSource from '../../data/data-source';
import UrlParser from '../../routes/url-parser';
import { createBarChart, createLineChart } from '../../utils/chart-creator';

const Detail = {
  async render() {
    return `
        <div class="detail-container">
          <div class="detail-content"></div>
          <div class="chart">
            <canvas id="aqiChart" width="1" height="1"></canvas>
            <canvas id="aqiChartForecast" width="1" height="1"></canvas>
          </div>
        </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const station = await DataSource.stationDetail(url.id);

    const detailContainerElement = document.querySelector('.detail-content');

    detailContainerElement.innerHTML += `<p>${station.city.name}</p>`;
    detailContainerElement.innerHTML += `<p>Data by: <a href="${station.attributions[0].url}" target="_blank">${station.attributions[0].name}</a></p>`;
    detailContainerElement.innerHTML += `<p>Provided by: <a href="${station.attributions[1].url}" target="_blank">${station.attributions[1].name}</a></p>`;

    console.log(url.id);

    const stationName = station.attributions[0].name;
    const aqiChartElementId = 'aqiChart';
    const aqiChartForecastElementId = 'aqiChartForecast';
    const iaqiData = station.iaqi;

    if (stationName === 'Kementerian Lingkungan Hidup Dan Kehutanan') {
      const gaslabels = ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'];
      const aqiColors = ['#38d020', '#E7BE27', '#F28330', '#E9474A', '#923BC5', '#7B2D51', 'lightgray'];
      const aqiStatus = ['Baik', 'Sedang', 'Tidak sehat untuk kelompok sensitif', 'Tidak sehat', 'Sangat tidak sehat', 'Berbahaya', 'Data tidak ada'];
      const values = Object.values(iaqiData).map((item) => item.v);

      console.log(values);
      console.log(gaslabels);

      const ctx = document.getElementById(`${aqiChartElementId}`).getContext('2d');
      createBarChart(ctx, gaslabels, values, aqiColors, aqiStatus);
    }

    if (stationName === 'BMKG | Badan Meteorologi, Klimatologi dan Geofisika') {
      const aqiDailyForecast = station.forecast.daily;
      const value = Object.values(iaqiData.pm25);

      const ctx = document.getElementById(`${aqiChartElementId}`).getContext('2d');
      createBarChart(ctx, ['PM2.5'], value, aqiColors, aqiStatus, 200);

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

        const fctx = document.getElementById(`${aqiChartForecastElementId}`).getContext('2d');
        createLineChart(fctx, labels, datasets, 500);
      }
    }

    if (
      stationName === 'Balai Besar Standardisasi dan Pelayanan Jasa Pencegahan Pencemaran Industri (BBSPJPPI)'
      || stationName === 'Citizen Science project sensor.community') {
      const values = Object.values([iaqiData.pm25, iaqiData.pm10]).map((item) => item.v);

      const ctx = document.getElementById(`${aqiChartElementId}`).getContext('2d');
      createBarChart(ctx, ['PM2.5', 'PM10'], values, aqiColors, aqiStatus);
    }
  },
};

export default Detail;
