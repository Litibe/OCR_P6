monStockage = sessionStorage;


function add_best_movie(url_best_movie) {
  url_movie = fetch(url_best_movie)
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
    let url_movie = value.url;
    let url_image = value.image_url;
    section_the_movie_img.innerHTML = "<img src=" + url_image + " alt="+ String(value.title) + " title="+String(value.title) + "/> <br/> "
    let section_the_movie = document.querySelector("section#the_movie")
    section_the_movie_div_title.innerHTML = value.title;
    section_the_movie_div_button_movie.classList.remove("hidden");
    section_the_movie_div_resume.innerHTML = "Résume du film : "
    section_the_movie_div_note.innerHTML = "Note du film : " + value.imdb_score
    let section_the_movie_div_description_p = document.querySelector("#the_movie p.long_description");
    section_the_movie_div_description_p.innerHTML = "<p> "+ String(value.long_description) + "</p>";
   
  })
}

function extract_8_best_movies() {
  fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
  .then(function(res) {if(res.ok){return res.json()}})
  .then(function(value) {
    monStockage.setItem("1_best_movies", value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
    monStockage.setItem("2_best_movies", value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
    monStockage.setItem("3_best_movies", value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
    monStockage.setItem("4_best_movies", value.results[3].url+"####"+value.results[3].imdb_score+"####"+value.results[3].votes);
    monStockage.setItem("5_best_movies", value.results[4].url+"####"+value.results[4].imdb_score+"####"+value.results[4].votes);
    fetch(value.next)
    .then(function(res) {if(res.ok){return res.json()}})
    .then(function(value) {
      monStockage.setItem("6_best_movies", value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
      monStockage.setItem("7_best_movies", value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
      monStockage.setItem("8_best_movies", value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
  });
  });
};

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

function add_best__other_movies(best_movies_url, i) {
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
//carroussel_7_elements()

extract_8_best_movies()
let best_movies_url = [monStockage.getItem("1_best_movies"),
                     monStockage.getItem("2_best_movies"),
                     monStockage.getItem("3_best_movies"),
                     monStockage.getItem("4_best_movies"),
                     monStockage.getItem("5_best_movies"),
                     monStockage.getItem("6_best_movies"),
                     monStockage.getItem("7_best_movies"),
                     monStockage.getItem("8_best_movies")
                    ]

function search_best_movie_score_vote (best_movies_url) {
  let movies_score = new Map();
  let movies_vote = new Map();
  movies_score.set(best_movies_url[0].split("####")[0], best_movies_url[0].split("####")[1]);
  movies_vote.set(best_movies_url[0].split("####")[0], best_movies_url[0].split("####")[2]);
  movies_score.set(best_movies_url[1].split("####")[0], best_movies_url[1].split("####")[1]);
  movies_vote.set(best_movies_url[1].split("####")[0], best_movies_url[1].split("####")[2]);
  movies_score.set(best_movies_url[2].split("####")[0], best_movies_url[2].split("####")[1]);
  movies_vote.set(best_movies_url[2].split("####")[0], best_movies_url[2].split("####")[2]);
  movies_score.set(best_movies_url[3].split("####")[0], best_movies_url[3].split("####")[1]);
  movies_vote.set(best_movies_url[3].split("####")[0], best_movies_url[3].split("####")[2]);
  movies_score.set(best_movies_url[4].split("####")[0], best_movies_url[4].split("####")[1]);
  movies_vote.set(best_movies_url[4].split("####")[0], best_movies_url[4].split("####")[2]);
  movies_score.set(best_movies_url[5].split("####")[0], best_movies_url[5].split("####")[1]);
  movies_vote.set(best_movies_url[5].split("####")[0], best_movies_url[5].split("####")[2]);
  movies_score.set(best_movies_url[6].split("####")[0], best_movies_url[6].split("####")[1]);
  movies_vote.set(best_movies_url[6].split("####")[0],best_movies_url[6].split("####")[2]);
  movies_score.set(best_movies_url[7].split("####")[0],best_movies_url[7].split("####")[1]);
  movies_vote.set(best_movies_url[7].split("####")[0],best_movies_url[7].split("####")[2]);
    
  let liste_score = []
  for (let [key, value] of movies_score) {
    liste_score.push(value);
  }
  liste_score.sort()
  let best_score = liste_score[liste_score.length-1]
  let liste_best_movies = []
  for (let [key, value] of movies_score) {
    if (value == best_score) {
      liste_best_movies.push(key)}
  }
  let liste_votes_movies = []
  for (let movie of liste_best_movies) {
    for (let [key, value] of movies_vote) {
      if (movie == key) {
        liste_votes_movies.push(value)
      }
    }
  }
  liste_votes_movies.sort()
  let url_best_movie
  let best_vote = liste_votes_movies[liste_votes_movies.length-1]
  for (let [key, value] of movies_vote) {
    if (value == best_vote) {
      url_best_movie = key
    }
  }
  return url_best_movie
}
url_best_movie = search_best_movie_score_vote(best_movies_url)
add_best_movie(url_best_movie)
best_movies_url.splice(best_movies_url.indexOf(url_best_movie));
i=0
add_best__other_movies(best_movies_url, i)