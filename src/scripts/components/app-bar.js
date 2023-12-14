class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setActiveNavigation();

    window.addEventListener('hashchange', () => {
      this.setActiveNavigation();
    });
  }

  render() {
    this.innerHTML = `
      <style>    
        app-bar {
          padding: 0 20px;
          align-items: center;
          background-color: white;
          display: flex;
          gap: 20px;
          justify-content: space-between;
          width: 100%;
          height: 80px;
          box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.25);
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
          position: fixed;
          top: 80px;
          right: -180px;
          width: 150px;
          height: 100vh;
          transition: all 0.3s;
          padding: 8px;
          background-color: white;
          overflow: hidden;
        }

        .app-bar__navigation.open {
          right: 0;
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

        .app-bar__navigation ul li.active a {
          background-color: var(--secondary);
          color: white;
          font-weight: 700;
          border-radius: 10px;
        }

        @media screen and (min-width: 650px) {
          .app-bar__menu {
            display: none;
          }

          .app-bar__navigation {
            position: relative;
            width: 100%;
            height: 80px;
            top: 0;
            right: 0;
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
            color: var(--secondary);
            text-decoration: underline;
          }

          .app-bar__navigation ul li.active a {
            color: var(--secondary);
            background-color: transparent;
            text-decoration: underline;
            border-radius: 5px;
          }
        }
      </style>
      <div class="app-bar__logo">
          <a href="./" title="AirWatchID Logo">
            <picture>
              <source media="(min-width: 600px)" srcset="./images/logos/Logo-long-blue.png">
              <img src='./images/logos/Logo-blue.png' 
                  alt="AirwatchID Logo">
            </picture>
          </a>
      </div>
      <div class="app-bar__menu">
        <button id="menu-button" title="Tombol Menu" aria-label="Tombol Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
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

  setActiveNavigation() {
    let currentPath = window.location.hash || '#/';
    const navItems = this.querySelectorAll('.nav_list_item');

    navItems.forEach(item => {
      const link = item.querySelector('a');
      const href = link.getAttribute('href');

      if (currentPath.includes('detail')) {
        currentPath = '#/maps';
      }

      if (currentPath.includes('blog')) {
        currentPath = '#/blog';
      }

      if (currentPath === href) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    localStorage.setItem('activeNavigation', currentPath);
  }
}

customElements.define('app-bar', AppBar);
