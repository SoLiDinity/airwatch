import DataSource from '../../data/data-source';
import aqi from '../../globals/aqi-arrays';
import {
  creatAverageAqiIdn,
  createBlogsListCardTemplate,
  createErrorPage,
  createTableRankAqi,
} from '../templates/template-creator';
import datas from '../../data/data.json';

const Main = {
  async render() {
    return `
    <div class="main">
      <div class="hero" style="flex-grow: 1">
        <div class="content-hero">
          <p>Aplikasi Pemantau Kualitas Udara Indonesia</p>
          <h2>AirWatchID</h2>
          <p>Memantau kualitas udara secara cepat dan tepat</p>
        </div>

        <div class="image-hero">
          <img src="./images/heros/main-hero.png" alt="" />
        </div>
      </div>

      <section class="summary">
        <h1 class="section-title">Ringkasan Kualitas Udara Indonesia</h1>
        <div class="summary-section">
          <div class="card" id="average-aqi">
          </div>
          <div class="map-section shadow">
            <div class="map-section__image">
              <img src="https://img.freepik.com/free-photo/from-pins-map_23-2147793520.jpg" alt="Ilustrasi peta">
            </div>
            <div class="inner">
              <p>Peta Kualitas Udara</p>
              <a href="#/maps">Lihat Peta</a>
            </div>
          </div>
        </div>

        <div class="rank-section">
          <div class="topAqi-section shadow">
            <h1>10 Daerah Paling Banyak Terpolusi Indonesia</h1>
            <div class="table" id="top-aqi-rank">
            </div>
          </div>

          <div class="bottomAqi-section shadow">
            <h1>10 Daerah Paling Sedikit Terpolusi Indonesia</h1>
            <div class="table" id="bottom-aqi-rank">
            </div>
          </div>
        </div>
      </section>

      <div class="fun-fact">
        <h1 class="section-title">Tahukah kamu?</h1>
        <div class="card-contain">
          <div class="card">
            <div class="card-header">
              <p>Bagaimana dampak risiko lingkungan terhadap beban penyakit global?</p>
            </div>
            <div class="card-body">
              <div class="line"></div>
              <p><span>12%</span> Dari beban penyakit global disebabkan oleh risiko lingkungan, dengan polusi udara menempati peringkat pertama.</p>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <p>Berapa banyak nyawa yang hilang akibat dampak polusi udara?</p>
            </div>
            <div class="card-body">
              <div class="line"></div>
              <p><span>7 Juta</span> Kematian setiap tahun sebagai akibat dari paparan terhadap partikel halus dalam udara yang tercemar.</p>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <p>Berapa banyak individu yang terpapar udara tidak sehat?</p>
            </div>
            <div class="card-body">
              <div class="line"></div>
              <p><span>91%</span> Dari populasi global tinggal di wilayah di mana kualitas udara melebihi batas panduan WHO.</p>
            </div>
          </div>
        </div>
        <div class="fun-fact__footer">
          <p>Sumber: <a href="https://www.who.int/">Organisasi Kesehatan Dunia (WHO)</a></p>
        </div>
      </div>

      <div class="articles">
        <h1 class="section-title">Baca Juga</h1>
        <div class="main-recommended-articles"></div>
        </div>
      </div>
    </div>
    <div class="main-page-error"></div>
    `;
  },

  // async render() {
  //   return `
  //   <div class="main">
  //     <div class="hero" style="flex-grow: 1">
  //       <div class="content-hero">
  //         <p>Aplikasi Pemantau Kualitas Udara Indonesia</p>
  //         <h2>AirWatchID</h2>
  //         <p>Memantau kualitas udara secara cepat dan tepat</p>
  //       </div>

  //       <div class="image">
  //       </div>
  //     </div>

  //     <div class="fitur">
  //       <h1>Fitur</h1>
  //       <div class="card-contain">
  //         <div class="card">
  //           <div class="card-header">
  //             <h1>Data Real-time</h1>
  //             <img src="https://s3-alpha-sig.figma.com/img/d903/8fd3/9c40804c8a43da4150503113c1597d4c?Expires=1701648000&Signature=mwQRONMRKR5G5VKjFM2lStvHVRp0t9t4YsFsSKlRwWeE3UZgbTP6m9d5scz7gcja8Dx806qL9K-4JJ3NHBUaTqjd3dtEvZx2tx0wrbtuTW2N5l3JAEEDMcPmoAtC37200~vQ9XfTSD7NFqr~bHvtm77bDchO8OKoWkTJupd8Za~WBo3n1JYnqPrl-SaXWyTOcBSpMm6NNzVWYYlJXhpI15fNTbGKpewYYf-S~orG16uF9lh6FoFjiTs9T-44xYoixGqmfgN28z0KoLo1liPLZ3FMASLGOM3hAoPwJ1~yjmR7YYBw-qSgH-fC1GnbUKXlzw9yhGZo3ANuDcx1tIbFGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
  //           </div>
  //           <div class="card-body">
  //             <p>Integrasi sistem informasi kualitas udara guna mendapatkan data kualitas udara secara langsung.</p>
  //           </div>
  //         </div>
  //         <div class="card">
  //           <div class="card-header">
  //             <h1>Data Real-time</h1>
  //             <img src="https://s3-alpha-sig.figma.com/img/0b44/d285/1112560652fd2fdf7b0c22885d49384e?Expires=1701648000&Signature=VbXLFyeTkRXvyuqtCWfrwBT8a9UXTOMEIv~UJ9VuH0fuTUYLMvYtUsAJMf7QtKkcJxRfMU~NSH6LIwXz3BKZ9WvybmbYQgahrfv2nLBJ7DePeBfywZjgQjd0ZqyKd3LgHR355XM7KdAS9bV~ltnc8FvnxiVuqpMFFeG21MnRD9OxXP9NYQeTAYKGf~IFpYF-8TdlX1gIZYIPLcyxHz~WX2PF0xHFLH96NzZETOq9p1VmRJJtYahrcgwBXnRK2MvJwqXRRQh5Z1Lx-qOcuFTxL1iaebIlH0fI005zhZ-a729MprSzAvdefN2M1qwjbFkD4M40~ZL1iZMxNuhHJIo7jg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
  //           </div>
  //           <div class="card-body">
  //             <p>Integrasi sistem informasi kualitas udara guna mendapatkan data kualitas udara secara langsung.</p>
  //           </div>
  //         </div>
  //         <div class="card">
  //           <div class="card-header">
  //             <h1>Data Real-time</h1>
  //             <img src="https://s3-alpha-sig.figma.com/img/9eb2/7181/2c47d001e24455941aaa18513096a080?Expires=1701648000&Signature=pwxasz-Z8Iq8RAJsuPcFjL9tK1XqDbVLWhgzV9S12kDKCy81~aYd~vAeCGRhRhYVgOF53gsq7chLa6Lu2UsOM1Dvb8p0XZTcQ89hnsr57a0OCZ20cR8lK~~mwBqZ082SEPntl2cK1IJJ1fCvG5QaFQWOtZdPD2QyAmQvmAwGwL6RScqyXlMbuVtSHR20QG3XC0zF79KrtRC4kW2qBuKK5j3hQivJc2m6e2ZFolQmCqjdQCwskn-8DH28GUIIrS6RPbsYNf2Lmg5MwIEOXSih~JthQy9smgJ1-LqnilVM4ekBLuc45aHHkes~5kGq2cWL6zKhrJ2BOqH344or4HbBvw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
  //           </div>
  //           <div class="card-body">
  //             <p>Integrasi sistem informasi kualitas udara guna mendapatkan data kualitas udara secara langsung.</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div class="use">
  //       <h1>Cara Penggunaan <span>AirWatchID</span></h1>
  //       <div class="btn-container">
  //         <div class="btn">
  //           <h2>Bagaimana</h2>
  //           <button><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
  //         </div>
  //         <div class="btn">
  //           <h2>Bagaimana</h2>
  //           <button><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
  //         </div>
  //         <div class="btn">
  //           <h2>Bagaimana</h2>
  //           <button><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
  //         </div>
  //         <div class="btn">
  //           <h2>Bagaimana</h2>
  //           <button><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
  //         </div>
  //         <div class="btn">
  //           <h2>Bagaimana</h2>
  //           <button><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
  //         </div>
  //         <div class="btn">
  //           <h2>Bagaimana</h2>
  //           <button><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  //   `;
  // },

  async afterRender() {
    try {
      const { topAqi, bottomAqi, averageAqi, latestUpdate, hoursDifference, minutesDifference } =
        await DataSource.summaryIdnAqi();

      const topAqiTable = createTableRankAqi(topAqi, aqi.colors);
      const bottomAqiTable = createTableRankAqi(bottomAqi, aqi.colors);
      const averageAqiCard = creatAverageAqiIdn(
        averageAqi,
        latestUpdate,
        hoursDifference,
        minutesDifference,
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

      const articles = (await DataSource.allBlogsArticles(false)).articles;

      const shuffledArticles = articles.sort(() => Math.random() - 0.5);
      const randomArticles = shuffledArticles.slice(0, 3);

      randomArticles.forEach(article => {
        recomendedArticles.innerHTML += createBlogsListCardTemplate(article, 30);
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
