/* eslint-disable import/no-unresolved */
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

class FunFactSlider extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = `
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div class="card shadow swiper-slide">
            <div class="card-header">
              <p>Bagaimana dampak risiko lingkungan terhadap beban penyakit global?</p>
            </div>
            <div class="card-body">
              <div class="line"></div>
              <p><span>12%</span> Dari beban penyakit global disebabkan oleh risiko lingkungan, dengan polusi udara menempati peringkat pertama.</p>
            </div>
          </div>

          <div class="card shadow swiper-slide">
            <div class="card-header">
              <p>Berapa banyak nyawa yang hilang akibat dampak polusi udara?</p>
            </div>
            <div class="card-body">
              <div class="line"></div>
              <p><span>7 Juta</span> Kematian setiap tahun sebagai akibat dari paparan terhadap partikel halus dalam udara yang tercemar.</p>
            </div>
          </div>

          <div class="card shadow swiper-slide">
            <div class="card-header">
              <p>Berapa banyak individu yang terpapar udara tidak sehat?</p>
            </div>
            <div class="card-body">
              <div class="line"></div>
              <p><span>91%</span> Dari populasi global tinggal di wilayah di mana kualitas udara melebihi batas panduan WHO.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      const swiper = new Swiper('.mySwiper', {
        effect: 'card',
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      });
    });
  }
}

customElements.define('fun-fact__slider', FunFactSlider);