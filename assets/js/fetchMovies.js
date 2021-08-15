monStockage = sessionStorage;
let adresseServeur = "http://193.26.22.227:8000/"

function addBestMovie(urlBestMovie) {
  fetch(urlBestMovie)
  .then(function(res) {
    if(res.ok){
      return res.json()
    }
  })
  .then(function(value) {
    let section_the_movie_div_title = document.querySelector("#best_movie0 .title_movie");
    let section_the_movie_div_resume = document.querySelector("#best_movie0 .movie .resume");
    let section_the_movie_div_button_movie = document.querySelector("#best_movie0 .movie button");
    let section_the_movie_div_note = document.querySelector("#best_movie0 p.note");
    let section_the_movie_img = document.querySelector("#best_movie0 div");
    section_the_movie_img.setAttribute("id", "best_movieimg_movie0")
    section_the_movie_img.innerHTML = "<img src=" + value.image_url + " alt="+ String(value.title) + " title="+String(value.title) + "/>"
    section_the_movie_div_title.innerHTML = value.title;
    section_the_movie_div_button_movie.classList.remove("hidden");
    section_the_movie_div_resume.innerHTML = "Résume du film : "
    section_the_movie_div_note.innerHTML = "Note du film : " + value.imdb_score
    let section_the_movie_div_description_p = document.querySelector("#best_movie0 p.long_description");
    section_the_movie_div_description_p.innerHTML = "<p> "+ String(value.long_description) + "</p>"; 
  })
}

async function extract_8_best_movies(url) {
  fetch(url)
  .then(function(res) {if(res.ok){return res.json()}})
  .then(function(value) {
    let myList=[]
    myList.push(value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
    myList.push(value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
    myList.push(value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
    myList.push(value.results[3].url+"####"+value.results[3].imdb_score+"####"+value.results[3].votes);
    myList.push(value.results[4].url+"####"+value.results[4].imdb_score+"####"+value.results[4].votes);
    fetch(value.next)
    .then(function(res) {if(res.ok){return res.json()}})
    .then(function(value) {
      myList.push(value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
      myList.push(value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
      myList.push(value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
    })
    .then(function(value){
      let url_best_movie = search_best_movie_score_vote(myList);
      addBestMovie(url_best_movie)
      let listbest_movies_url = remove_the_best_movie_from_list(myList, url_best_movie);
      addMovieIntoIdDiv("#best_movie", url_best_movie,0)
      return listbest_movies_url
    })
    .then(function(value){
      moviesIntoCarrousel("#best_movies", value);
    })
  });
  
  return true
};

function extract_7_movies(url, categorie) {
  fetch(url)
  .then(function(res) {if(res.ok){return res.json()}})
  .then(function(value) {
    monStockage.setItem("1_"+categorie, value.results[0].url);
    monStockage.setItem("2_"+categorie, value.results[1].url);
    monStockage.setItem("3_"+categorie, value.results[2].url);
    monStockage.setItem("4_"+categorie, value.results[3].url);
    monStockage.setItem("5_"+categorie, value.results[4].url);
    fetch(value.next)
    .then(function(res) {if(res.ok){return res.json()}})
    .then(function(value) {
      monStockage.setItem("6_"+categorie, value.results[0].url);
      monStockage.setItem("7_"+categorie, value.results[1].url);
  });
  });

  let cat1_movies = [monStockage.getItem("1_"+categorie),
  monStockage.getItem("2_"+categorie),
  monStockage.getItem("3_"+categorie),
  monStockage.getItem("4_"+categorie),
  monStockage.getItem("5_"+categorie),
  monStockage.getItem("6_"+categorie),
  monStockage.getItem("7_"+categorie),];
  return cat1_movies
};

function addMovieIntoIdDiv(idDivCarrousel, urlMovie, indexMovie){
  fetch(String(urlMovie))
  .then(function(res) {
    if (res.ok) {return res.json();}})
  .then(function(value) {
    let divMovie = document.querySelector(idDivCarrousel+String(indexMovie))
    let movieImg = document.querySelector(idDivCarrousel+String(indexMovie)+" div");
    movieImg.innerHTML = "<img src="+value.image_url+ " alt="+ value.title + " title="+ value.title + "/>";
    movieImg.setAttribute("id", idDivCarrousel.replace("#","")+"img_movie"+String(indexMovie))
    divMovie.appendChild(movieImg);
    let newDivMovieMainModal = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal");
    let newDivMovieMainModalContent = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal-content");
    let newDivMovieMainModalContentH2 = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal-content h2");
    let newDivMovieMainModalContentInclude = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal-content .include-modal");
    
    let btnExit = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal-content .btn_close")
    
    let div_modal_left = document.createElement("div");
    div_modal_left.classList.add(idDivCarrousel+"modalLeftMovie"+String(indexMovie))
    let div_modal_right= document.createElement("div");
    div_modal_right.classList.add(idDivCarrousel+"modalRightMovie"+String(indexMovie))
    console.log(value.title)
    newDivMovieMainModalContentH2.innerHTML = value.title;
    newDivMovieMainModalContentInclude.appendChild(div_modal_left);
    let actors_movie = "";
    for (let actor of value.actors) {actors_movie += actor + ", "};
    let info_left = "<ul><li>Genres : " + value.genres +
                  "</li>" + "<li>Date published : " + value.date_published + "</li>"
                  + "<li>Rated : " + value.rated + "</li>"
                  + "<li>Score Imdb : " + value.imdb + "</li>"
                  + "<li>Directors : " + value.directors + "</li>"
                  + "<li>Actors : " + actors_movie +"</li>"
                  + "<li>Duration : " + value.duration +"</li>"
                  + "<li>Countries : " + value.countries +"</li>"
                  + "<li>Reviews from critics : " + value.reviews_from_critics +"</li>"
                  + "<li>Description : " + value.long_description + "</li>"
                  +"</ul>";
    div_modal_left.innerHTML = info_left;
    newDivMovieMainModalContentInclude.appendChild(div_modal_right);
    img_movie = document.createElement('div');
    img_movie.innerHTML = "<img src="+value.image_url+"/>";
    div_modal_right.appendChild(img_movie);
    let btnModal = document.querySelector(idDivCarrousel+"img_movie"+String(indexMovie))
    btnModal.addEventListener('click', function() {
      newDivMovieMainModal.style.display = "block"
      });
    btnExit.addEventListener('click', function() {
      newDivMovieMainModal.style.display = "none"
    });
    window.addEventListener('click', function(event) {
      if (event.target == newDivMovieMainModal) {
        newDivMovieMainModal.style.display = "none";}
    });
  });  
};

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
};
function remove_the_best_movie_from_list (best_movies_url, url_best_movie) {
  i=0
  for (let element of best_movies_url) {
    if ((element.split("####")[0]) == url_best_movie) {
      best_movies_url.splice(i, 1)
    } else {
      i +=1
    }
  }
  return best_movies_url
};
function moviesIntoCarrousel(idDivCarrousel, MoviesList) {
  i=1
  for (movieUrl of MoviesList ) {
    addMovieIntoIdDiv(idDivCarrousel, movieUrl, i)
    i++
  }
};

function addActionModalMovie (divModal, btnModal, btnExit, url_movie) {
  fetch(url_movie)
  .then(function(res) {
    if(res.ok){
      return res.json();
    }
  })
  .then(function(value) {
    let myDivModal = document.querySelector(divModal);
    let div_modal_left = document.createElement("div");
    let div_modal_right= document.createElement("div");
    let title_best_movie = document.querySelector("#the_movie .container .modal .modal-content h2");
    title_best_movie.innerHTML = value.title;
    myDivModal.appendChild(div_modal_left);
    let actors_movie = "";
    for (let actor of value.actors) {actors_movie += actor + ", "};
    let info_left = "<ul><li>Genres : " + value.genres +
                  "</li>" + "<li>Date published : " + value.date_published + "</li>"
                  + "<li>Rated : " + value.rated + "</li>"
                  + "<li>Score Imdb : " + value.imdb + "</li>"
                  + "<li>Directors : " + value.directors + "</li>"
                  + "<li>Actors : " + actors_movie +"</li>"
                  + "<li>Duration : " + value.duration +"</li>"
                  + "<li>Countries : " + value.countries +"</li>"
                  + "<li>Reviews from critics : " + value.reviews_from_critics +"</li>"
                  + "<li>Description : " + value.long_description + "</li>"
                  +"</ul>";
    div_modal_left.innerHTML = info_left;
    myDivModal.appendChild(div_modal_right);
    img_movie = document.createElement('div');
    img_movie.innerHTML = "<img src="+value.image_url+"/>";
    div_modal_right.appendChild(img_movie);
    });
  let myDivMain = document.querySelector((monStockage.getItem("myDivModal")).replace(".modal-content .include-modal",".modal"))
  btnModal = document.querySelector("#the_movie .movie button");
  document.querySelector("#the_movie .movie button").addEventListener('click', function() {
    myDivMain.style.display = "block"
  });
  btnExit.addEventListener('click', function() {
    myDivMain.style.display = "none"
  });
  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function(event) {
    if (event.target == myDivMain) {
      myDivMain.style.display = "none";}
  });

};


async function manageCat1Movie () {
  let cat1_movies = await extract_7_movies(adresseServeur+"api/v1/titles/?sort_by=-imdb_score&genre=Fantasy", "cat1")
  moviesIntoCarrousel("#cat1_movies", cat1_movies);
}

async function manageCat2Movie () {
  let cat2_movies = await extract_7_movies(adresseServeur+"api/v1/titles/?sort_by=-imdb_score&genre=Western", "cat2")
  moviesIntoCarrousel("#cat2_movies", cat2_movies);
}

async function manageCat3Movie () {
  let cat3_movies = await extract_7_movies(adresseServeur+"api/v1/titles/?sort_by=-imdb_score&genre=Comedy", "cat3")
  moviesIntoCarrousel("#cat3_movies", cat3_movies);
}


async function main () {
  extract_8_best_movies(adresseServeur+"api/v1/titles/?sort_by=-imdb_score")
  manageCat1Movie();
  manageCat2Movie();
  manageCat3Movie();
}

main()