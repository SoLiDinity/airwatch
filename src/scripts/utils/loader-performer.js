const Loader = {
  performLoader() {
    document.body.appendChild(document.createElement('div')).id = 'loader';

    const loaderContainer = document.querySelector('#loader');
    const loadSpinner = document.createElement('load-spinner');
    loaderContainer.appendChild(loadSpinner);

    document.body.addEventListener('load', event => {
      event.stopPropagation();
      document.body.style.overflow = 'hidden';
      loaderContainer.classList.remove('hidden');
    });
  },

  finishLoader() {
    const loaderContainer = document.querySelector('#loader');
    loaderContainer.classList.add('hidden');
    document.body.style.overflow = 'visible';
    setTimeout(() => {
      loaderContainer.remove();
    }, 300);
  },
};

export default Loader;
