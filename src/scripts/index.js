import '../../font-awesome/font-awesome';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';

// TODO 1 lengkapi sesuai tombol hamburger dan drawer pada appbar
const app = new App({
  button: document.querySelector(''),
  drawer: document.querySelector(''),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
