class Chronote {

  constructor() {
    this.bind();
    this.getURL();
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

    this.reviewSection.addEventListener('click', (e) => {
      this.listHandler(e);
    })

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
    if(mode==='review'){
      this.renderList();
    }
  }

  // get the url for the current tab
  getURL() {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      this.url = tabs[0].url;
    });
  }

  saveNote() {
    //using unshift to list data most recent first (until sort added)
    this.notes.unshift({
      timestamp: Date.now(),
      url: this.url,
      note: this.writeInput.value
    });
    this.setData();
    this.renderList()
    this.setMode('review');
    this.writeInput.value = '';
  }

  renderList(){
    this.reviewSection.innerHTML = '';
    for (let note of this.notes) {
      let index = 0;
      let itemdate = new Date(note.timestamp);
      this.reviewSection.insertAdjacentHTML(
        'beforeend',
        `<div class="list_item" data-tstamp="${note.timestamp}">
        <span class="list_date">${itemdate.toLocaleDateString()}</span>
        <span class="list_note">${note.note}</span>
        <span class="list_url" title="${note.url}" data-link="${note.url}">&#x1f517;</span>
        <span class="list_delete">&#x2716;</span>
        </div>`
      );  
      index ++;
    };
  }

  listHandler(e){
    let src = e.srcElement;
    let item = src;
    while(item.className != 'list_item'){
      item = item.parentElement;
    }
    // delete click
    if(src.className === 'list_delete'){
      let i = this.notes.findIndex((note) => {
        return note.timestamp.toString() === item.dataset['tstamp'];
      });
      if(i > -1){
        this.notes.splice(i, 1);
      }
      this.setData();
      this.renderList();
    }
    // link click
    if(src.className === 'list_url'){
      chrome.tabs.create({url: src.dataset.link});
    }
  }

}