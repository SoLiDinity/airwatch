const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', event => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', event => {
      this._closeDrawer(event, drawer);
    });

    const drawerItems = document.querySelectorAll('.nav_list_item');
    drawerItems.forEach(item => {
      item.addEventListener('click', e => {
        this._closeDrawer(e, drawer);
      });
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
