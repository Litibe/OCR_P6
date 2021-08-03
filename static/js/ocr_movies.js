fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    let api_imdb_score_best_movie = value;
    let section_the_movie = document.getElementById(the_movie);
    let section_the_movie_div_h3 = document.querySelector("#the_movie div div h3");
    console.log(section_the_movie_div_h3);
    console.log(api_imdb_score_best_movie.results[0].image_url);
    //section_the_movie.style.backgroundImage = api_imdb_score_best_movie.results[0].image_url;
    section_the_movie_div_h3.innerHTML = api_imdb_score_best_movie.results[0].title;
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
