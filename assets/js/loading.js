/* -------------------------------- LOADING --------------------------------  */
function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.querySelector("#best_movie_img_movie0") !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 1000);
  }
  
  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
  }
  
  onReady(function() {
    setVisible('#loading', false);
  });
  /* -------------------------------- END LOADING --------------------------------  */