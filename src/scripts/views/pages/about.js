/* eslint-disable no-irregular-whitespace */
// TODO 3 tampilan About Page

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
      
              <div class="box-container">
              <div class="box shadow">
              <div class="student">
                <img src="../team/Leo.jpeg" alt="" />
                <div>
                  <h4>Leonardo Denavito Jounanda Prishamora</h4>
                  <div class="logo-ref-team">
                    <a href=' https://www.linkedin.com/in/leonardo-denavito/' target='_blank' rel='noreferrer'>
                      <i class='fa-brands fa-linkedin fs-1'></i>
                    </a>
                    <a href='https://github.com/SoLiDinity' target='_blank' rel='noreferrer'>
                      <i class='fa-brands fa-github fs-1' style={{ color: 'black' }}></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
      
            <div class="box shadow">
              <div class="student">
                <img
                src="../team/Novita.jpg" alt="" />
                  <div>
                    <h4>Novita Kristiana</h4>
                    <div class="logo-ref-team">
                    <a href='https://www.linkedin.com/in/novita-kristiana-9b0679298/' target='_blank' rel='noreferrer'>
                      <i class='fa-brands fa-linkedin fs-1'></i>
                    </a>
                    <a href='https://github.com/KrsNovita2717' target='_blank' rel='noreferrer'>
                      <i class='fa-brands fa-github fs-1' style={{ color: 'black' }}></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
  
          <div class="box shadow">
              <div class="student">
                <img
                  src="../team/Arif.jpg" alt="" />
                <div>
                  <h4>Muhammad Arif Rahman</h4>
                <div class="logo-ref-team">
                  <a href='https://www.linkedin.com/in/muhammad-arif-rahman-8422552a3/' target='_blank' rel='noreferrer'>
                    <i class='fa-brands fa-linkedin fs-1'></i>
                  </a>
                  <a href='https://github.com/MuhammadArifRahman' target='_blank' rel='noreferrer'>
                    <i class='fa-brands fa-github fs-1' style={{ color: 'black' }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
  
            <div class="box shadow">
              <div class="student">
                <img
                  src="../team/Bella.jpg" alt="" />
                <div>
                  <h4>Andi Nabila Fadiya</h4>
                  <div class="logo-ref-team">
                  <a href='https://www.linkedin.com/in/andi-nabila-fadiya-41b317232/' target='_blank' rel='noreferrer'>
                    <i class='fa-brands fa-linkedin fs-1'></i>
                  </a>
                  <a href='https://github.com/andinabilafdy' target='_blank' rel='noreferrer'>
                    <i class='fa-brands fa-github fs-1' style={{ color: 'black' }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
            <div class="box shadow">
              <div class="student">
                <img
                  src="../team/Chary.jpg" alt="" />
                <div>
                  <h4>Chary Yedija Adcharisto Sembel</h4>
                  <div class="logo-ref-team">
                  <a href='https://www.linkedin.com/in/chary-sembel-18364a29a/' target='_blank' rel='noreferrer'>
                    <i class='fa-brands fa-linkedin fs-1'></i>
                  </a>
                  <a href='https://github.com/Adkrsto' target='_blank' rel='noreferrer'>
                    <i class='fa-brands fa-github fs-1' style={{ color: 'black' }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
            `;
  },

  async afterRender() {
    // after render mainpage
  },
};

export default About;
