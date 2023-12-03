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
          align-items: end;
          line-height: 20px;
          margin: 20px;
        }
        
        .footer__info {
          display: grid;
          margin: 20px;
          grid-template-rows: repeat(2, auto);
          gap: 20px;
        }
        
        .footer__info-subscribe p{
          text-align: left;
        }
        
        .footer__info-subscribe p a {
          color: #666;
          text-decoration: underline;
          display: inline;
        }
        
        .footer__info-input {
          display: inline;
        }
        
        .footer__info-input input {
          padding: 8px;
          margin-bottom: 10px;
          border-radius: 13px;
          width: 100%;
          min-height: 44px;
        }
        
        .button-subscribe {
          background-color: #6566C0;
          border-radius: 13px;
          padding: 10px;
          color: #fff;
          border: none;
          cursor: pointer;
          justify-content: center;
          transition: background-color 0.3s;
        }
        
        .button-subscribe:hover {
          background-color: #47507d;
        }
        
        .footer__info p {
          margin-top: 10px;
          line-height: 24px;
        }
        
        .footer__info-social_media ul {
          list-style-type: none;
          display: inline;
        }
        
        .footer__info-social_media li {
          margin: 0 10px;
        }
        
        .footer__info-social_media li a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: black;
          font-weight: 500;
          font-size: 16px;
          justify-content: left;
        }
        
        .footer__info-social_media li i {
          margin-right: 5px;
          font-weight: 600;
          font-size: 20px;
        }
        
        .footer__info-social_media li a:hover {
          text-decoration: underline;
          color: #6566C0;
        }
        
        .footer__bottom {
          grid-column-start: auto;
          color: #666;
          text-align: center;
        }
        
        hr {
          border: 0;
          height: 1px;
          background-color: black;
          margin: 0 20px;
        }  
        @media screen and (min-width: 650px) {
          .footer__info {
            grid-template-columns: repeat(2, auto);
            margin-bottom: 0;
          }
              
          .footer__info-subscribe {
            margin-right: 20px;
          }

          .footer__info-subscribe p a {
            color: #666;
            text-decoration: underline;
            display: inline;
          }
          
          .footer__info-input {
            display: flex;
          }
          
          .footer__info-input input {
            margin-right: 10px;
            width: 50%;
            margin-bottom: 0;
          }
        }    
      </style>
      <div class="footer__info">
        <div class="footer__info-subscribe">
          <p>Gabung info harian dari</p>
          <div class="footer__info-input">
              <input type="email" name="email" id="email" placeholder="Masukan Email Kamu">
              <button type="submit" class="button-subscribe">Berlangganan</button>
          </div>
          <p>
            Dengan berlangganan, Anda setuju dengan
            <span><a href="#">Kebijakan Privasi</a></span>
            kami dan memberikan izin untuk menerima pembaruan dari perusahaan kami.
          </p>
        </div>
        <div class="footer__info-social_media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#"><i class="fa-brands fa-facebook-f"></i>Facebook</a></li>
            <li><a href="#"><i class="fa-brands fa-instagram"></i>Instagram</a></li>
            <li><a href="#"><i class="fa-brands fa-x-twitter"></i>Twitter X</a></li>      
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
