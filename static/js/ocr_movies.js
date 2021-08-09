monStockage = sessionStorage;


function extract_best_movie() {
  url_movie = fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
  .then(function(res) {
    if(res.ok){
      return res.json();
    }
  })
  .then(function(value) {
    let section_the_movie_div_title = document.querySelector("#the_movie .movie h3");
    let section_the_movie_div_resume = document.querySelector("#the_movie .movie h4");
    let section_the_movie_div_button_movie = document.querySelector("#the_movie .movie button");
    let section_the_movie_div_note = document.querySelector("#the_movie p.note");
    let section_the_movie_img= document.querySelector("#the_movie div.img_movie p");
    let url_movie = value.results[0].url;
    let url_image = value.results[0].image_url;
    section_the_movie_img.innerHTML = "<img src=" + url_image + " alt="+ String(value.results[0].title) + " title="+String(value.results[0].title) + "/> <br/> "
    let section_the_movie = document.querySelector("section#the_movie")
    section_the_movie_div_title.innerHTML = value.results[0].title;
    section_the_movie_div_button_movie.classList.remove("hidden");
    section_the_movie_div_resume.innerHTML = "Résume du film : "
    section_the_movie_div_note.innerHTML = "Note du film : " + value.results[0].imdb_score
    extract_movie(url_movie)
  })
}
function extract_movie (url_movie){
  fetch(String(url_movie))
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      let section_the_movie_div_description_p = document.querySelector("#the_movie p.long_description");
      section_the_movie_div_description_p.innerHTML = "<p> "+ String(value.long_description) + "</p>";
  })
}  

function add_movie_into_carroussel(carroussel, url_movie){
  fetch(String(url_movie))
  .then(function(res) {
    if (res.ok) {return res.json();}})
  .then(function(value) {
    let movie = document.createElement("div");
    let movie_img = document.createElement("div");
    movie_img.innerHTML = "<img src="+value.image_url+"/>";
    let movie_title = document.createElement("h3");
    movie_title.innerHTML = value.title;
    movie.appendChild(movie_title);
    movie.appendChild(movie_img);
    carroussel.appendChild(movie);
  })
}  

function remove_movies_into_carroussel(carroussel) {
  let movie1 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie1)
  let movie2 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie2)
  let movie3 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie3)
  let movie4 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie4)
}


extract_best_movie()

function extract_7_best_movies() {
  fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
  .then(function(res) {if(res.ok){return res.json()}})
  .then(function(value) {
    monStockage.setItem("1_best_movies", value.results[0].url);
    monStockage.setItem("2_best_movies", value.results[1].url);
    monStockage.setItem("3_best_movies", value.results[2].url);
    monStockage.setItem("4_best_movies", value.results[3].url);
    monStockage.setItem("5_best_movies", value.results[4].url);
    fetch(value.next)
    .then(function(res) {if(res.ok){return res.json()}})
    .then(function(value) {
      //console.log(value.results[0]);
      monStockage.setItem("6_best_movies", value.results[0].url);
      monStockage.setItem("7_best_movies", value.results[1].url);
  });
  });
};
function add_best_movie(best_movies_url, i) {
  let carroussel_best_movies = document.querySelector("section#best_movies .carroussel");
  carroussel_best_movies.classList.add("row");
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i])
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i+1])
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i+2])
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i+3]) 
};

function carroussel_7_elements() {
  extract_7_best_movies()
  i=0
  let carroussel_best_movies = document.querySelector("section#best_movies .carroussel");
  best_movies_url = [monStockage.getItem("1_best_movies"),
                     monStockage.getItem("2_best_movies"),
                     monStockage.getItem("3_best_movies"),
                     monStockage.getItem("4_best_movies"),
                     monStockage.getItem("5_best_movies"),
                     monStockage.getItem("6_best_movies"),
                     monStockage.getItem("7_best_movies")]
  add_best_movie(best_movies_url, i)
  let left_carroussel_best_movies = document.querySelector("section#best_movies svg.btn_carroussel_left")
  left_carroussel_best_movies.addEventListener("click", function(event){
    i-1
    remove_movies_into_carroussel(carroussel_best_movies)
    add_best_movie(best_movies_url, i)
  } )
  let right_carroussel_best_movies = document.querySelector("section#best_movies svg.btn_carroussel_right")
  right_carroussel_best_movies.addEventListener("click", function(event){
    i+1
    remove_movies_into_carroussel(carroussel_best_movies)
    add_best_movie(best_movies_url, i)
  } )
};
carroussel_7_elements()

