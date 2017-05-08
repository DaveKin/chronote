'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chronote = function () {
  function Chronote() {
    _classCallCheck(this, Chronote);

    this.bind();
    this.getURL(this.urlLoaded);
  }

  _createClass(Chronote, [{
    key: 'bind',
    value: function bind() {
      this.container = document.querySelector('div');
    }
  }, {
    key: 'urlLoaded',
    value: function urlLoaded(url) {
      this.url = url;
      this.container.innerText = 'Loaded from: ' + this.url;
    }

    // get the url for the current tab

  }, {
    key: 'getURL',
    value: function getURL(callback) {
      var _this = this;

      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        _this.urlLoaded(tabs[0].url);
      });
    }
  }]);

  return Chronote;
}();