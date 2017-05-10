document.addEventListener('DOMContentLoaded', () => {
  var cn = new Chronote();
  // timeout required to allow input to be focused
  window.setTimeout(() => {
    cn.focusInput();    
  }, 100);
});
