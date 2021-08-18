let adresseServeur = "http://193.26.22.227:8000/";

async function main () {
  extract_8_best_movies(adresseServeur+"api/v1/titles/?sort_by=-imdb_score")
  manageCategoryMovie("Fantasy", "cat1");
  manageCategoryMovie("Western", "cat2");
  manageCategoryMovie("Comedy", "cat3");
}

main()


function addInfoBestMovie(urlBestMovie) {
  fetch(urlBestMovie)
  .then(function(res) {if(res.ok){return res.json()};})
  .then(function(value) {
    let movieTitle = document.querySelector(
      "#best_movie0 .title_movie");
    let movieResume = document.querySelector(
      "#best_movie0 .movieDetails .resume");
    let movieBtnInfo = document.querySelector(
      "#best_movie0 .movieDetails button");
    let movieScoreImdb = document.querySelector(
      "#best_movie0 .movieDetails p.note");
    movieTitle.innerHTML = value.title;
    movieBtnInfo.classList.remove("hidden");
    movieResume.innerHTML = "Résume du film : ";
    movieScoreImdb.innerHTML = "Note du film : "+value.imdb_score;
    let movieLongDescription = document.querySelector(
      "#best_movie0 .movieDetails p.long_description");
    movieLongDescription.innerHTML = "<p> "+String(value.long_description)+"</p>"; 
    let newDivMovieMainModal = document.querySelector("#best_movie0 .modal");
    movieBtnInfo.addEventListener("click", function() {
      newDivMovieMainModal.style.display = "block";});
  });
}

function extract_8_best_movies(url) {
  fetch(url)
  .then(function(res) {if(res.ok){return res.json();}})
  .then(function(value) {
    let myList=[];
    myList.push(value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
    myList.push(value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
    myList.push(value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
    myList.push(value.results[3].url+"####"+value.results[3].imdb_score+"####"+value.results[3].votes);
    myList.push(value.results[4].url+"####"+value.results[4].imdb_score+"####"+value.results[4].votes);
    fetch(value.next)
    .then(function(res) {if(res.ok){return res.json();}})
    .then(function(value) {
      myList.push(value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
      myList.push(value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
      myList.push(value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
    })
    .then(function(value){
      let urlBestMovie = searchTheBestMovie(myList);
      let ArrayBestMoviesUrl = removeTheBestMovieUrlIntoArray(myList, urlBestMovie);
      addMovieIntoIdDiv("#best_movie", urlBestMovie,0)
      addInfoBestMovie(urlBestMovie)
      return ArrayBestMoviesUrl
    })
    .then(function(value){
      moviesIntoCarrousel("#best_movies", value);
    })
  });
};

function extract_7_movies(url, categorie) {
  fetch(url)
  .then(function(res) {if(res.ok){return res.json()}})
  .then(function(value) {
    let myList=[]
    myList.push(value.results[0].url);
    myList.push(value.results[1].url);
    myList.push(value.results[2].url);
    myList.push(value.results[3].url);
    myList.push(value.results[4].url);
    fetch(value.next)
    .then(function(res) {if(res.ok){return res.json()}})
    .then(function(value) {
      myList.push(value.results[0].url);
      myList.push(value.results[1].url);
    })
    .then(function(value) {
      moviesIntoCarrousel("#"+categorie+"_movies", myList);
    })
  });
};

function addMovieIntoIdDiv(idDivCarrousel, urlMovie, indexMovie){
  fetch(String(urlMovie))
  .then(function(res) {
    if (res.ok) {return res.json();}})
  .then(function(value) {
    let divMovie = document.querySelector(idDivCarrousel+String(indexMovie));
    let movieImg = document.querySelector(idDivCarrousel+String(indexMovie)+" div");
    let titleImg = String(value.title);
    movieImg.innerHTML = "<img src="+value.image_url+ " alt="+ titleImg + " title="+ titleImg + "/>";
    movieImg.setAttribute("id", idDivCarrousel.replace("#","")+"img_movie"+String(indexMovie));
    divMovie.appendChild(movieImg);
    let newDivMovieMainModal = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal");
    let newDivMovieMainModalContentH2 = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal-content h2");
    let newDivMovieMainModalContentInclude = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal-content .include-modal");
    let btnExit = document.querySelector(idDivCarrousel+String(indexMovie)+" .modal-content .btn_close");
    let DivModalLeft = document.createElement("div");
    DivModalLeft.classList.add(idDivCarrousel+"modalLeftMovie"+String(indexMovie));
    let DivModalRight = document.createElement("div");
    DivModalRight.classList.add(idDivCarrousel+"modalRightMovie"+String(indexMovie));
    newDivMovieMainModalContentH2.innerHTML = value.title;
    newDivMovieMainModalContentInclude.appendChild(DivModalLeft);
    let ActorsMovie = "";
    for (let actor of value.actors) {ActorsMovie += actor + ", "};
    let InfosDivModalLeft = "<ul><li>Genres : " + value.genres +
                  "</li>" + "<li>Date published : " + value.date_published + "</li>"
                  + "<li>Rated : " + value.rated + "</li>"
                  + "<li>Score Imdb : " + value.imdb + "</li>"
                  + "<li>Directors : " + value.directors + "</li>"
                  + "<li>Actors : " + ActorsMovie +"</li>"
                  + "<li>Duration : " + value.duration +"</li>"
                  + "<li>Countries : " + value.countries +"</li>"
                  + "<li>Reviews from critics : " + value.reviews_from_critics +"</li>"
                  + "<li>Description : " + value.long_description + "</li>"
                  +"</ul>";
    DivModalLeft.innerHTML = InfosDivModalLeft;
    newDivMovieMainModalContentInclude.appendChild(DivModalRight);
    imgMovie = document.createElement('div');
    imgMovie.innerHTML = "<img src="+value.image_url+"/>";
    DivModalRight.appendChild(imgMovie);
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

function searchTheBestMovie (ArrayBestMoviesUrl) {
  let moviesScore = new Map();
  let moviesVote = new Map();
  moviesScore.set(ArrayBestMoviesUrl[0].split("####")[0], ArrayBestMoviesUrl[0].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[0].split("####")[0], ArrayBestMoviesUrl[0].split("####")[2]);
  moviesScore.set(ArrayBestMoviesUrl[1].split("####")[0], ArrayBestMoviesUrl[1].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[1].split("####")[0], ArrayBestMoviesUrl[1].split("####")[2]);
  moviesScore.set(ArrayBestMoviesUrl[2].split("####")[0], ArrayBestMoviesUrl[2].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[2].split("####")[0], ArrayBestMoviesUrl[2].split("####")[2]);
  moviesScore.set(ArrayBestMoviesUrl[3].split("####")[0], ArrayBestMoviesUrl[3].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[3].split("####")[0], ArrayBestMoviesUrl[3].split("####")[2]);
  moviesScore.set(ArrayBestMoviesUrl[4].split("####")[0], ArrayBestMoviesUrl[4].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[4].split("####")[0], ArrayBestMoviesUrl[4].split("####")[2]);
  moviesScore.set(ArrayBestMoviesUrl[5].split("####")[0], ArrayBestMoviesUrl[5].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[5].split("####")[0], ArrayBestMoviesUrl[5].split("####")[2]);
  moviesScore.set(ArrayBestMoviesUrl[6].split("####")[0], ArrayBestMoviesUrl[6].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[6].split("####")[0],ArrayBestMoviesUrl[6].split("####")[2]);
  moviesScore.set(ArrayBestMoviesUrl[7].split("####")[0],ArrayBestMoviesUrl[7].split("####")[1]);
  moviesVote.set(ArrayBestMoviesUrl[7].split("####")[0],ArrayBestMoviesUrl[7].split("####")[2]);
    
  let listeScore = []
  for (let [key, value] of moviesScore) {
    listeScore.push(value);
  }
  listeScore.sort()
  let bestScore = listeScore[listeScore.length-1]
  let arrayBestMovies = []
  for (let [key, value] of moviesScore) {
    if (value == bestScore) {
      arrayBestMovies.push(key);}
  }
  let arrayVoteMovies = []
  for (let movie of arrayBestMovies) {
    for (let [key, value] of moviesScore) {
      if (movie == key) {
        arrayVoteMovies.push(value);
      }
    }
  }
  arrayVoteMovies.sort()
  let urlBestMovie
  let best_vote = arrayVoteMovies[arrayVoteMovies.length-1]
  for (let [key, value] of moviesScore) {
    if (value == best_vote) {
      urlBestMovie = key;
    }
  }
  return urlBestMovie
};
function removeTheBestMovieUrlIntoArray (ArrayBestMoviesUrl, urlBestMovie) {
  i=0
  for (let element of ArrayBestMoviesUrl) {
    if ((element.split("####")[0]) == urlBestMovie) {
      ArrayBestMoviesUrl.splice(i, 1)
    } else {
      i +=1
    }
  }
  return ArrayBestMoviesUrl
};
function moviesIntoCarrousel(idDivCarrousel, MoviesList) {
  i=1
  for (movieUrl of MoviesList ) {
    addMovieIntoIdDiv(idDivCarrousel, movieUrl, i)
    i++
  }
};

async function manageCategoryMovie (genreMovie, idSection) {
  extract_7_movies(adresseServeur+"api/v1/titles/?sort_by=-imdb_score&genre="+String(genreMovie), String(idSection));
  let titleCategory = document.querySelector("#"+String(idSection)+ " h2");
  titleCategory.innerHTML = titleCategory.firstChild.data+" - Catégorie "+String(genreMovie);
}

