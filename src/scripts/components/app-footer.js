class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>    
        app-footer {
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 20px;
          padding: 20px;
          color: white;
        }
        
        .footer__top {
          display: grid;
          margin: 20px;
          grid-template-rows: repeat(3, auto);
          gap: 20px;
        }

        .footer__top h3{
          color: white;
        }

        .footer__top ul li {
          list-style-type: none;
          margin: .5rem 0;
        }

        .footer__top ul li a {
          text-decoration: none;
          color: white;
          width: 100%;
        }
        
        .footer__top-logo {
          width: 90%;
          display: grid;
        }

        .footer__top-logo img {
          max-width: 100%;
          height: 44px;
          object-fit: contain;
        }

        .footer__top-logo p {
          margin: 1em 0;
        }

        .footer__bottom {
          grid-column-start: auto;
          text-align: center;
        }
        
        hr {
          height: 2px;
          background-color: white;
          border: none;
          margin: 0 20px;
        }  

        @media screen and (min-width: 650px) {
          .footer__top-logo {
            grid-column-start: 1;
            grid-column-end: 3;
            width: 100%;
            justify-items: center;
          }
        }    

        @media screen and (min-width: 900px) {
          .footer__top {
            grid-template-columns: repeat(3, auto);
          }

          .footer__top-logo {
            grid-column-end: 1;
            justify-items: flex-start;
          }
        }    
      </style>
      <div class="footer__top">
        <div class="footer__top-logo">
          <picture>
            <img src='./images/logos/Logo-long.png' alt="AirwatchID Logo">
          </picture>
          <p>help@airwatchid.com</p>
          <p>+62 811 1234 5678</p>
          <p>AirWatchID, Indonesia</p>
        </div>
        <div class="footer__top-teams">
          <h3>
            <i class="fa-solid fa-people-group"></i>
            Our Teams
          </h3>
          <ul class="team-list">
            <li class="team-list_item">
              <a href="https://www.linkedin.com/in/leonardo-denavito/">
                Leonardo Denavito Jounanda Prishamora
              </a>
            </li>
            <li class="team-list_item">
              <a href="https://www.linkedin.com/in/andi-nabila-fadiya-41b317232/">
                Andi Nabila Fadiya
              </a>
            </li>
            <li class="team-list_item">
              <a href="https://www.linkedin.com/in/novita-kristiana-9b0679298/">
                Novita Kristiana
              </a>
            </li>
            <li class="team-list_item">
              <a href="https://www.linkedin.com/in/muhammad-arif-rahman-8422552a3/">
                Muhammad Arif Rahman
              </a>
            </li>
            <li class="team-list_item">
              <a href="https://www.linkedin.com/in/chary-sembel-18364a29a/">
                Chary Yedija Adcharisto Sembel
              </a>
            </li>
          </ul>
        </div>
        <div class="footer__top-navigation">
          <h3>
            <i class="fa-solid fa-location-arrow"></i>
            Navigasi
          </h3>
          <ul class="nav_list">
            <li class="nav_list_item"><a href="#/">Home</a></li>
            <li class="nav_list_item"><a href="#/maps">Maps</a></li>
            <li class="nav_list_item"><a href="#/about">About</a></li>
            <li class="nav_list_item"><a href="#/blog">Blog</a></li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="footer__bottom">
        <p>Copyright &copy; 2023 AirWatchID. All rights reserved</p>
      </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);
