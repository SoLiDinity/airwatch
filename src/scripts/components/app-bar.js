class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>    
        app-bar {
          padding: 0 16px;
          align-items: center;
          background-color: white;
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin: 20px;
          z-index: 99;
        }

        .app-bar__menu {
          display: flex;
          align-items: center;
        }

        .app-bar__menu button {
          background-color: transparent;
          border: none;
          font-size: 32px;
          padding: 8px;
          cursor: pointer;
          font-weight: 700;
          line-height: 58px;
        }

        .app-bar__logo img{
          max-width: 100%;
          height: 44px;
          object-fit: contain;
        }

        .app-bar__navigation {
          position: absolute;
          top: 90px;
          left: -180px;
          width: 150px;
          transition: all 0.3s;
          padding: 8px;
          background-color: white;
          overflow: hidden;
        }

        .app-bar__navigation.active {
          left: 0;
        }

        .app-bar__navigation ul li {
          list-style-type: none;
        }

        .app-bar__navigation ul li a {
          display: inline-block;
          text-decoration: none;
          color: black;
          padding: 8px;
          margin-bottom: 5px;
          width: 100%;
        }

        @media screen and (min-width: 650px) {
          .app-bar__logo img {
            content: url('./AirWatchID/Logo-long-blue.png');
          }

          .app-bar__menu {
            display: none;
          }

          .app-bar__navigation {
            position: relative;
            width: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: end;
            line-height: 28px;
          }

          .app-bar__navigation ul {
            display: flex;
          }

          .app-bar__navigation ul li {
            margin: auto 20px;
            font-weight: 500;
            font-size: 18px;
          }

          .app-bar__navigation ul li a {
            color: black;
            margin-bottom: 0;
          }

          .app-bar__navigation ul li a:hover {
            color: #6566C0;
            text-decoration: underline;
          }
        }
      </style>
      <div class="app-bar__menu">
        <button id="menu-button" title="Tombol Menu" aria-label="Tombol Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
      <div class="app-bar__logo">
          <a href="./" title="AirWatch Logo">
            <img src="./AirWatchID/Logo-blue.png" alt="AirWatch Logo">
          </a>
      </div>
      <nav class="app-bar__navigation">
        <ul class="nav_list">
          <li class="nav_list_item"><a href="#/">Home</a></li>
          <li class="nav_list_item"><a href="#/maps">Maps</a></li>
          <li class="nav_list_item"><a href="#/about">About</a></li>
          <li class="nav_list_item"><a href="#/blog">Blog</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
