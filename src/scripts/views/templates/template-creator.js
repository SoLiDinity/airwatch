import getAqiInfo from '../../utils/get-aqi-info';
import limitWords from '../../utils/limit-words';

const createAQIDetailTemplate = (
  data,
  aqiStatus,
  aqiClassUrl,
  aqiColors,
  aqiInfo,
  screenWidth = 0,
) => `
  <div class="detail-content shadow ${getAqiInfo(data.aqi === '-' ? 0 : data.aqi, aqiClassUrl)}">
    <p class="aqi-label" style="color: white; font-weight: bold;">Indeks Kualitas Udara</p>
    <div class="aqi-index-detail" style="background-color: ${getAqiInfo(
      data.aqi === '-' ? 0 : data.aqi,
      aqiColors,
    )};">
      <h1>${data.aqi === '-' ? 0 : data.aqi}</h1>
    </div>
    <div class="aqi-detail-container">
      <h1>${data.city.name}</h1>
      <p>Status: <span style="color: ${getAqiInfo(
        data.aqi === '-' ? 0 : data.aqi,
        aqiColors,
      )}; font-weight: bold;">${getAqiInfo(data.aqi, aqiStatus)}</span></p>
      <div class="current-aqi-info">
        <h3>💡 Info Kualitas Udara</h3>
        <p>${getAqiInfo(data.aqi === '-' ? 0 : data.aqi, aqiInfo)}</p>
      </div>
      <div class="attributions">
        <p class="data-source">Data by: <a href="${data.attributions[0].url}" target="_blank">${data.attributions[0].name}</a></p>
        <p class="data-source">Provided by: <a href="${data.attributions[1].url}" target="_blank">${data.attributions[1].name}</a></p>
      </div>
    </div>
  </div>
  <div class="charts">
    <div class="aqi-chart-card general-aqi-chart shadow">
      <h3>Polutan Dominan</h3>
      <canvas id="aqisChart" width="${screenWidth < 700 ? 1 : screenWidth <= 900 ? 2 : 3}" height="${screenWidth >= 1150 ? 1 : screenWidth > 900 ? 2 : 1}"></canvas>
      <canvas id="aqiChart"></canvas>
    </div>
    <div class="aqi-chart-card forecast-aqi-chart shadow">
      <h3>Perkiraan Indeks Pencemaran</h3>
      <canvas id="aqiChartForecast" width="3" height="2"></canvas>
    </div>
  </div>
`;

const createProfileCardTemplate = (teamData) => `
  <div class="box shadow">
    <div class="student">
      <img src="${teamData.image_path}" alt="" />
      <div class="details">
        <h3>${teamData.name}</h3>
        <p class="role">${teamData.role ? teamData.role : ''}</p>
        <div class="logo-ref-team">
          <a href='${teamData.linkedin_url}' target='_blank' rel='noreferrer'>
            <i class='fa-brands fa-linkedin fs-1'></i>
          </a>
          <a href='${teamData.github_url}' target='_blank' rel='noreferrer'>
            <i class='fa-brands fa-github fs-1' style={{ color: 'black' }}></i>
          </a>
        </div>
      </div>
    </div>
  </div>
`;

const createBlogArticleTemplate = (articleData, currentBlogUrlToShare) => `
  <h1>${articleData.title}</h1>
  <div class="share-links">
    <a class="share-link-button copy-to-clipboard" href="${window.location.href}" id="copyToClipboard"><i class="fa-regular fa-copy"></i></a>
    <a class="share-link-button whatsapp" href="${currentBlogUrlToShare.wa}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
    <a class="share-link-button facebook" href="${currentBlogUrlToShare.fb}" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
    <a class="share-link-button x-twitter" href="${currentBlogUrlToShare.tw}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
  </div>
  <img style="width: 100%;" src="${articleData.image_url}">
  <span class="image-source">Sumber: ${articleData.image_url}</span>
  <article>
    <p class="overview">${articleData.overview}</p>
    ${articleData.content.sections
    .map(
      section => `
        ${section.title ? `<br><h3>${section.title}</h3>` : ''}
        ${
        section.image_url
          ? `<img style="width: 100%;" src="${section.image_url}"><span class="image-source">Sumber: ${section.image_url}</span>`
          : ''
      }
        ${section.paragraph ? `<p>${section.paragraph}</p>` : ''}
        ${
        section.list
          ? `<div style="margin: .5rem 0">${section.list
              .map(item => `<li>${item}</li>`)
              .join('')}</div>`
          : ''
      }
    `,
    )
    .join('')}
  </article>
  <div class="divider"></div>
`;

const createErrorPage = () => `
  <article class="error-page">
    <section class="error-page__info">
      <h1>Oops!<i class="fa-solid fa-gear fa-spin"></i></h1>
      <h2>Something went wrong.</h2>
      <p>We're sorry, but an error occurred while fetching data.</p>
    </section>
  </article>
`;

const createBlogsListCardTemplate = (data, overviewWordsLimit = null) => `
  <div class="blog-card shadow">
    <img data-src="${data.image_url}" class="lazyload">
    <div class="text">
      <div class="title-overview">
        <h5 class="title">${data.title}</h5>
        <p class="overview">${limitWords(data.overview, overviewWordsLimit)}</p>
      </div>
      <a href="#/blog/${data.id}/">Selanjutnya<i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
`;

const createTableRankAqi = (dataList, aqiColors) => `
  <table>
    <thead>
      <th>No</th>
      <th>Nama Daerah</th>
      <th>AQI</th>
    </thead>
    <tbody>
      ${dataList
    .map((data, index) => {
      const cityName = data.city.name.replace(/, Indonesia$/, '');

      return `
        <tr>
          <td>${index + 1}</td>
          <td><a class="city-detail-link" href="/#/detail/${data.idx}">${cityName}</a></td>
          <td>
            <span style="color: ${getAqiInfo(
              data.aqi === '-' ? 0 : data.aqi,
              aqiColors,
            )}; font-weight: bold;">
              ${data.aqi}
            </span>
          </td>
        </tr>
      `;
    })
    .join('')}
    </tbody>
  </table>
`;

const creatAverageAqiIdn = (
  data,
  latestUpdate,
  aqiStatus,
  aqiClassUrl,
  aqiColors,
  aqiInfo,
) => `
  <div class="summary-content shadow ${getAqiInfo(data === '-' ? 0 : data, aqiClassUrl)}">
    <p class="aqi-label" style="color: white; font-weight: bold;">Indeks Kualitas Udara Rata-Rata Indonesia</p>
    <div class="aqi-index-detail" style="background-color: ${getAqiInfo(
      data === '-' ? 0 : data,
      aqiColors,
    )};">
      <h1>${data === '-' ? 0 : data}</h1>
    </div>
    <div class="aqi-detail-container">
      <h1>Rata-Rata di Indonesia</h1>
      <p>Status: <span style="color: ${getAqiInfo(
        data === '-' ? 0 : data,
        aqiColors,
      )}; font-weight: bold;">${getAqiInfo(data, aqiStatus)}</span></p>
      <div class="current-aqi-info">
        <h3>💡 Info Kualitas Udara</h3>
        <p>${getAqiInfo(data === '-' ? 0 : data, aqiInfo)}</p>
      </div>
      <div class="attributions">
        <p class="data-source">Data by: <a href="https://www.bmkg.go.id/" target="_blank">BMKG | Badan Meteorologi, Klimatologi dan Geofisika</a></p>
        <p class="data-source">Provided by: <a href="https://waqi.info/" target="_blank">World Air Quality Index Project</a></p>
        <p class="latest-update">
          Latest Update: ${latestUpdate}
        </p>
      </div>
    </div>
  </div>
`;

export {
  createAQIDetailTemplate,
  createProfileCardTemplate,
  createBlogArticleTemplate,
  createErrorPage,
  createBlogsListCardTemplate,
  createTableRankAqi,
  creatAverageAqiIdn,
};
