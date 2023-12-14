import '../../font-awesome/font-awesome';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';

import './components/app-bar';
import './components/app-footer';
import './components/load-spinner';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#menu-button'),
  drawer: document.querySelector('.app-bar__navigation'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('load', () => {
  app.renderPage();
});
