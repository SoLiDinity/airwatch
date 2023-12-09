import { createProfileCardTemplate } from '../templates/template-creator';
import datas from '../../data/team-data.json';

const About = {
  async render() {
    return `
    <div class="main">
      <div class="hero" style="flex-grow: 1">
        <div class="content-hero">
          <p>Aplikasi Pemantau Kualitas Udara Indonesia</p>
          <h2>Tentang <br> AirWatchID</h2>
        </div>

        <div class="image2">
        </div>
      </div>

      <section class="reviews">
        <h1 class="heading">Tentang Kami</h1>
        <div class="box-container"></div>
      <section>
            `;
  },

  async afterRender() {
    const teamData = datas.team;
    const boxContainerElement = document.querySelector('.box-container');

    teamData.forEach((person) => {
      boxContainerElement.innerHTML += createProfileCardTemplate(person);
    });
  },
};

export default About;
