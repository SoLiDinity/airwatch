const CustomAlert = {
  async init({ message, backgroundColor, textColor }) {
    this._message = message;

    await this._renderAlert(backgroundColor, textColor);
  },

  async _renderAlert(backgroundColor, textColor) {
    const message = this._message;
    document.body.appendChild(document.createElement('div')).id = 'customAlert';
    const customALertContainer = document.querySelector('#customAlert');
    customALertContainer.style.backgroundColor = backgroundColor;
    customALertContainer.style.color = textColor;
    customALertContainer.innerHTML = `<p>${message}<p>`;

    this._performALert(customALertContainer);
  },

  _performALert(customALertContainer) {
    setTimeout(() => {
      customALertContainer.style.top = '20px';
      customALertContainer.style.opacity = '100%';
    }, 300);
    setTimeout(() => {
      customALertContainer.style.top = '-40px';
      customALertContainer.style.opacity = '0%';
    }, 3000);
    setTimeout(() => {
      customALertContainer.remove();
    }, 3300);
  },
};

export default CustomAlert;
