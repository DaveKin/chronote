class Chronote {

  constructor() {
    this.bind();
    this.getURL(this.urlLoaded);
  }

  bind() {
    this.writeButton = document.querySelector('.button_write');
    this.reviewButton = document.querySelector('.button_review');
    this.writeInput = document.querySelector('.input_write');
    this.reviewSection = document.querySelector('.section_review');

    this.writeButton.addEventListener('click', () => {
      this.setMode('write');
    });
    this.reviewButton.addEventListener('click', () => {
      this.setMode('review');
    });
  }

  focusInput() {
    this.writeInput.focus();
  }

  setMode(mode) {
    document.body.className = mode;
    if(mode==='write'){
      this.focusInput();
    }
  }

  urlLoaded (url) {
    this.url = url;
    this.reviewSection.innerText = this.url;
  }

  // get the url for the current tab
  getURL(callback) {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      this.urlLoaded(tabs[0].url);
    });
  }

}