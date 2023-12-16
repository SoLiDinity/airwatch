import DataSource from '../../data/data-source';
import aqi from '../../globals/aqi-arrays';
import {
  creatAverageAqiIdn,
  createBlogsListCardTemplate,
  createErrorPage,
  createTableRankAqi,
} from '../templates/template-creator';
import '../../components/fun-fact-slider';

const Main = {
  async render() {
    return `
      <div class="main">
        <div class="hero" style="flex-grow: 1">
          <div class="content-hero" data-aos="fade-right" data-aos-duration="2000">
            <p>Aplikasi Pemantau Kualitas Udara Indonesia</p>
            <h2>AirWatchID</h2>
            <p>Memantau kualitas udara secara cepat dan tepat</p>
            <a class="next-btn" href="#summary">Selanjutnya</a>
          </div>

          <div class="image-hero" data-aos="fade-left" data-aos-duration="2000">
            <img src="./images/heros/main-hero.png" alt="Main Page Hero" />
          </div>
        </div>

        <div class="fitur" id="fitur">
          <h1 class="section-title" data-aos="fade-up">Fitur AirWatchID</h1>
          <div class="card-contain">
            <div class="card shadow" data-aos="flip-right">
              <div class="card-header">
                <h1>Data Real-time</h1>
                <img src="images/features/features-1.png">
              </div>
              <div class="card-body">
                <p>Integrasi sistem informasi kualitas udara guna mendapatkan data kualitas udara secara langsung.</p>
              </div>
            </div>
            <div class="card shadow" data-aos="flip-right">
              <div class="card-header">
                <h1>Informasi Tingkat Polusi</h1>
                <img src="images/features/features-2.png">
              </div>
              <div class="card-body">
                <p>Dapatkan informasi lebih lanjut mengenai bahaya pencemaran terhadap kualitas udara.</p>
              </div>
            </div>
            <div class="card shadow" data-aos="flip-right">
              <div class="card-header">
                <h1>Rekomendasi Tindakan</h1>
                <img src="images/features/features-3.png">
              </div>
              <div class="card-body">
                <p>Rekomendasi tindakan yang bisa diambil oleh pengguna dalam menghadapi kondisi udara.</p>
              </div>
            </div>
          </div>
        </div>

        <section class="summary" id="summary">
          <h1 class="section-title" data-aos="fade-up">Ringkasan Kualitas Udara Indonesia</h1>
          <div class="summary-section">
            <div class="card" id="average-aqi" data-aos="fade-up">
            </div>
            <aside class="summary-side">
              <div class="map-section shadow" data-aos="fade-up">
                <div class="map-section__image">
                  <img src="https://cdn.pixabay.com/photo/2023/06/17/01/27/space-8069027_640.png" alt="Ilustrasi peta">
                </div>
                <div class="inner">
                  <p>Peta Kualitas Udara</p>
                  <a href="#/maps" class="maps-btn">Lihat Peta</a>
                </div>
              </div>
              <div class="fun-fact shadow" data-aos="fade-up">
                <h1 class="section-title">Tahukah kamu?</h1>
                <div class="card-contain">
                  <fun-fact__slider></fun-fact__slider>
                </div>
              </div>
            </aside>
          </div>

          <div class="rank-section">
            <div class="topAqi-section shadow" data-aos="fade-up">
              <h2>10 Daerah Paling Banyak Terpolusi Indonesia</h2>
              <div class="table" id="top-aqi-rank">
              </div>
            </div>

            <div class="bottomAqi-section shadow" data-aos="fade-up">
              <h2>10 Daerah Paling Sedikit Terpolusi Indonesia</h2>
              <div class="table" id="bottom-aqi-rank">
              </div>
            </div>
          </div>
        </section>

        <div class="articles">
          <h1 class="section-title" data-aos="fade-up">Baca Juga</h1>
          <div class="main-recommended-articles"></div>
        </div>
      </div>
      <div class="main-page-error"></div>
    `;
  },

  async afterRender() {
    try {
      const nextButtonElement = document.querySelector('.next-btn');
      nextButtonElement.addEventListener('click', e => {
        e.preventDefault();

        const nextContentSection = document.querySelector('#fitur');
        nextContentSection.scrollIntoView({ behavior: 'smooth' });
      });

      const { topAqi, bottomAqi, averageAqi, latestUpdate, hoursDifference, minutesDifference } =
        await DataSource.summaryIdnAqi();

      const topAqiTable = createTableRankAqi(topAqi, aqi.colors);
      const bottomAqiTable = createTableRankAqi(bottomAqi, aqi.colors);
      const averageAqiCard = creatAverageAqiIdn(
        averageAqi,
        latestUpdate,
        aqi.status,
        aqi.classUrl,
        aqi.colors,
        aqi.info,
        window.innerWidth,
      );

      document.getElementById('top-aqi-rank').innerHTML = topAqiTable;
      document.getElementById('bottom-aqi-rank').innerHTML = bottomAqiTable;
      document.getElementById('average-aqi').innerHTML = averageAqiCard;

      const recomendedArticles = document.querySelector('.main-recommended-articles');

      const { articles } = await DataSource.allBlogsArticles(false);

      const shuffledArticles = articles.sort(() => Math.random() - 0.5);
      const randomArticles = shuffledArticles.slice(0, 3);

      randomArticles.forEach(article => {
        recomendedArticles.innerHTML += createBlogsListCardTemplate(article, 30);
      });
      const blogCards = document.querySelectorAll('.blog-card');
      blogCards.forEach(blogCard => {
        blogCard.setAttribute('data-aos', 'fade-up');
      });
    } catch (error) {
      const errorContainer = document.querySelector('.main-page-error');
      const mainContainer = document.querySelector('.main');

      mainContainer.innerHTML = '';

      errorContainer.innerHTML += createErrorPage();
    }
  },
};

export default Main;
