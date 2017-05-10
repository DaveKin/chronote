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
    this.saveButton = document.querySelector('.button_save');

    this.getData();

    this.writeButton.addEventListener('click', () => {
      this.setMode('write');
    });

    this.reviewButton.addEventListener('click', () => {
      this.setMode('review');
    });

    this.saveButton.addEventListener('click', () => {
      this.saveNote();
    });

    this.renderList()
  }

  getData() {
    this.notes = JSON.parse(localStorage.getItem('chronotes'));
    if(this.notes===null){
      this.notes = [];
      this.setData();
    }
  }
  setData() {
    localStorage.setItem('chronotes', JSON.stringify(this.notes));
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

  urlLoaded(url) {
    this.url = url;
    //this.reviewSection.innerText = this.url;
  }

  // get the url for the current tab
  getURL(callback) {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      this.urlLoaded(tabs[0].url);
    });
  }

  saveNote() {
    var note = {
      timestamp: Date.now(),
      url: this.url,
      note: this.writeInput.value
    }
    this.notes.push(note);
    this.renderList()
    this.setData();
  }

  renderList(){
    this.reviewSection.innerHTML = '';
    for (var i = this.notes.length - 1; i >= 0; i--) {
      let itemdate = new Date(this.notes[i].timestamp);
      this.reviewSection.insertAdjacentHTML(
        'beforeend',
        `<div class="list_item">
        <span class="list_date">${itemdate.toLocaleDateString()}</span>
        <span class="list_note">${this.notes[i].note}</span>
        <span class="list_url">${this.notes[i].url}</span>
        <span class="list_close">close</span>
        <span class="list_delete">delete</span>
        </div>`
      );  
    };
  }

}