import getAqiInfo from '../../utils/get-aqi-info';

const createAQIDetailTemplate = (data, aqiStatus) => `
    <div class="detail-content">
        <p>${data.city.name}</p>
        <p>Aqi: ${data.aqi}</p>
        <p>Status: ${getAqiInfo(data.aqi, aqiStatus)}</p>
        <div class="attributions">
            <p class="data-source">Data by: <a href="${data.attributions[0].url}" target="_blank">${data.attributions[0].name}</a></p>
            <p class="data-source">Provided by: <a href="${data.attributions[1].url}" target="_blank">${data.attributions[1].name}</a></p>
        </div>
    </div>
    <div class="charts">
    <div class="aqi-chart-card general-aqi-chart">
        <h3>Polutan Dominan</h3>
        <canvas id="aqisChart" width="1" height="1"></canvas>
        <canvas id="aqiChart"></canvas>
    </div>
    <div class="aqi-chart-card forecast-aqi-chart">
        <h3>Perkiraan Indeks Pencemaran</h3>
        <canvas id="aqiChartForecast" width="1" height="1"></canvas>
    </div>
    </div>
`;

export {
  // eslint-disable-next-line import/prefer-default-export
  createAQIDetailTemplate,
};
