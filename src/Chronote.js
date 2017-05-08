class Chronote {

  constructor() {
    this.bind();
    this.getURL(this.urlLoaded);
  }

  bind() {
    this.container = document.querySelector('div');    
  }

  urlLoaded (url) {
    this.url = url;
    this.container.innerText = `Loaded from: ${this.url}`;
  }

  // get the url for the current tab
  getURL(callback) {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      this.urlLoaded(tabs[0].url);
    });
  }

}