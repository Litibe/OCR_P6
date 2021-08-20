/* -------------------------------- LOADING --------------------------------  */
function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementById('best_movies7') !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 500);
  }
  
  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
  }
  
  onReady(function() {
    setVisible('#loading', false);
  });
  /* -------------------------------- END LOADING --------------------------------  */