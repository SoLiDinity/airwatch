import DataSource from '../../data/data-source';
import UrlParser from '../../routes/url-parser';
import {
  createAQIDetailTemplate,
  createBlogsListCardTemplate,
  createErrorPage,
} from '../templates/template-creator';
import { createBarChart, createLineChart } from '../../utils/chart-creator';
import aqi from '../../globals/aqi-arrays';

const Detail = {
  async render() {
    return `
      <div class="detail-container" id="detailContainer">
        <div class="detail-content-container"></div>
        <div class="detail-recommended-articles-container">
          <h2>Artikel Rekomendasi</h2>
          <div class="detail-recommended-articles"></div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailContainerElement = document.querySelector('.detail-content-container');
    const detailRecommendedArticles = document.querySelector('.detail-recommended-articles');

    try {
      const station = await DataSource.stationDetail(url.id);
      detailContainerElement.innerHTML += createAQIDetailTemplate(
        station,
        aqi.status,
        aqi.classUrl,
        aqi.colors,
        aqi.info,
        window.innerWidth,
      );

      const stationName = station.attributions[0].name;
      const aqiChartElementId = 'aqiChart';
      const aqisChartElementId = 'aqisChart';
      const aqiChartForecastElementId = 'aqiChartForecast';
      const iaqiData = station.iaqi;

      if (stationName === 'Kementerian Lingkungan Hidup Dan Kehutanan') {
        const gaslabels = ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'];
        const values = Object.values(iaqiData).map(item => item.v);

        const ctx = document.getElementById(`${aqisChartElementId}`).getContext('2d');
        createBarChart(ctx, gaslabels, values);

        const aqiChartCanvas = document.getElementById('aqiChart');
        const aqiChartForecastCanvas = document.querySelector('.forecast-aqi-chart');

        aqiChartCanvas.remove();
        aqiChartForecastCanvas.remove();
      }

      if (stationName === 'BMKG | Badan Meteorologi, Klimatologi dan Geofisika') {
        const aqiDailyForecast = station.forecast.daily;
        const gasLabelsMap = {
          pm25: ['PM2.5'],
          pm10: ['PM10'],
        };
        const pollutantNames = ['pm25', 'pm10'];
        const gaslabels = pollutantNames.flatMap(pollutant => gasLabelsMap[pollutant] || []);
        const value = pollutantNames.map(pollutant => station.iaqi?.[pollutant]?.v);

        const ctx = document.getElementById(`${aqiChartElementId}`).getContext('2d');
        createBarChart(ctx, gaslabels, value);

        if (aqiDailyForecast) {
          const labels = aqiDailyForecast.o3.map(entry => entry.day);

          const datasets = [
            {
              label: 'O3',
              data: aqiDailyForecast.o3.map(entry => entry.avg),
              backgroundColor: '#071952',
            },
            {
              label: 'PM10',
              data: aqiDailyForecast.pm10.map(entry => entry.avg),
              backgroundColor: '#088395',
            },
            {
              label: 'PM2.5',
              data: aqiDailyForecast.pm25.map(entry => entry.avg),
              backgroundColor: '#35A29F',
            },
          ];

          const fctx = document.getElementById(`${aqiChartForecastElementId}`).getContext('2d');
          createLineChart(fctx, labels, datasets, 500);
        }

        const aqisChartCanvas = document.getElementById('aqisChart');
        aqisChartCanvas.remove();
      }

      if (
        stationName ===
          'Balai Besar Standardisasi dan Pelayanan Jasa Pencegahan Pencemaran Industri (BBSPJPPI)' ||
        stationName === 'Citizen Science project sensor.community' ||
        stationName === 'AirNet - aiqcn.org - waqi.info'
      ) {
        const gaslabels = ['PM2.5', 'PM10'];
        const values = Object.values([iaqiData.pm25, iaqiData.pm10]).map(item => item.v);

        const ctx = document.getElementById(`${aqiChartElementId}`).getContext('2d');
        createBarChart(ctx, gaslabels, values);

        const aqisChartCanvas = document.getElementById('aqisChart');
        const aqiChartForecastCanvas = document.querySelector('.forecast-aqi-chart');

        aqisChartCanvas.remove();
        aqiChartForecastCanvas.remove();
      }

      const { articles } = await DataSource.allBlogsArticles(false);

      const shuffledArticles = articles.sort(() => Math.random() - 0.5);
      const randomArticles = shuffledArticles.slice(0, 3);

      randomArticles.forEach(article => {
        detailRecommendedArticles.innerHTML += createBlogsListCardTemplate(article, 30);
      });
    } catch (error) {
      detailContainerElement.innerHTML = createErrorPage();

      const recommendedArticlesContainerElement = document.querySelector(
        '.detail-recommended-articles-container',
      );
      recommendedArticlesContainerElement.parentNode.removeChild(
        recommendedArticlesContainerElement,
      );
    }
  },
};

export default Detail;
