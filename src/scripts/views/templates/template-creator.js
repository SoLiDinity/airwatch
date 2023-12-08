import getAqiInfo from '../../utils/get-aqi-info';

const createAQIDetailTemplate = (data, aqiStatus, aqiClassUrl, aqiColors, aqiInfo, screenWidth = 0) => `
    <div class="detail-content shadow ${getAqiInfo((data.aqi === '-' ? 0 : data.aqi), aqiClassUrl)}">
        <p class="aqi-label" style="color: white; font-weight: bold;">Index Kualitas Udara</p>
        <div class="aqi-index-detail" style="background-color: ${getAqiInfo((data.aqi === '-' ? 0 : data.aqi), aqiColors)};">
            <h1>${data.aqi === '-' ? 0 : data.aqi}</h1>
        </div>
        <div class="aqi-detail-container">
            <h1>${data.city.name}</h1>
            <p>Status: <span style="color: ${getAqiInfo((data.aqi === '-' ? 0 : data.aqi), aqiColors)}; font-weight: bold;">${getAqiInfo(data.aqi, aqiStatus)}</span></p>
            <div class="current-aqi-info">
              <h3>💡 Info Kualitas Udara</h3>
              <p>${getAqiInfo((data.aqi === '-' ? 0 : data.aqi), aqiInfo)}</p>
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
    ${articleData.content.sections.map((section) => `
        ${section.title ? `<br><h3>${section.title}</h3>` : ''}
        ${section.image_url ? `<img style="width: 100%;" src="${section.image_url}"><span class="image-source">Sumber: ${section.image_url}</span>` : ''}
        ${section.paragraph ? `<p>${section.paragraph}</p>` : ''}
        ${section.list ? `<div style="margin: .5rem 0">${section.list.map((item) => `<li>${item}</li>`).join('')}</div>` : ''}
    `).join('')}
    </article>
`;

const createErrorPage = () => `
  <article class="error-page">
    <section class="error-page__info">
        <h1>Oops!<i class="fa-solid fa-gear fa-spin"></i></h1>
        <h2>Something went wrong.</h2>
        <p>We're sorry, but an error occurred while fetching data.</p>
    </section>
    <section class="error-page__hero">
        <picture>
            <img src='./images/heros/error-page-hero.png' alt="Error Logo">
        </picture>
    </section>
  </article>
`;

const createBlogsListCardTemplate = (data, overviewWordsLimit) => {
  const limitWords = (text, limit) => {
    const words = text.split(' ');
    const limitedText = words.slice(0, limit).join(' ');
    return `${limitedText}... `;
  };

  return `
    <div class="blog-card shadow">
      <img src="${data.image_url}">
      <div class="text">
        <div class="title-overview">
          <h5 class="title">${data.title}</h5>
          <p class="overview">${limitWords(data.overview, overviewWordsLimit)}</p>
        </div>
        <a href="#/blog/${data.id}/">Selanjutnya<i class="fa-solid fa-arrow-right"></i></a>
      <div>
    </div>
  `;
};

export {
  createAQIDetailTemplate,
  createBlogArticleTemplate,
  createErrorPage,
  createBlogsListCardTemplate,
};
