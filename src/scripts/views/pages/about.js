import { createProfileCardTemplate } from '../templates/template-creator';
import datas from '../../data/team-data.json';
import Loader from '../../utils/loader-performer';

const About = {
  async render() {
    return `
      <div class="main">
        <div class="hero" style="flex-grow: 1">
          <div class="content-hero" data-aos="fade-right" data-aos-duration="1000">
            <p>Aplikasi Pemantau Kualitas Udara Indonesia</p>
            <h2>Tentang <br> AirWatchID</h2>
          </div>

          <div class="image-hero" data-aos="fade-left" data-aos-duration="1000">
            <img src="./images/heros/about-hero.png" alt="About Page Hero" />
          </div>
        </div>

        <section class="reviews">
          <h1 class="heading">Tentang Kami</h1>
          <div class="box-container"></div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    Loader.performLoader();

    setTimeout(() => {
      Loader.finishLoader();
    }, 500);

    const teamData = datas.team;
    const boxContainerElement = document.querySelector('.box-container');

    teamData.forEach((person) => {
      boxContainerElement.innerHTML += createProfileCardTemplate(person);
    });

    const boxs = document.querySelectorAll('.box');
    boxs.forEach(box => {
      box.setAttribute('data-aos', 'fade-up');
    });
  },
};

export default About;
