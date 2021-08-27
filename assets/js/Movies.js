let adresseServeur = "http://localhost:8000/";

carrousselSlidesVisible = 4;
carrouselNumberMoviesPerCategories = 7;
myCategorie1 = "Fantasy";
myCategorie2 = "Comedy";
myCategorie3 = "Western";

async function main(myCategorie1, myCategorie2, myCategorie3) {
  extract_8_best_movies(adresseServeur + "api/v1/titles/?sort_by=-imdb_score");
  manageCategoryMovie(myCategorie1, "cat1");
  manageCategoryMovie(myCategorie2, "cat2");
  manageCategoryMovie(myCategorie3, "cat3");
}

main(myCategorie1, myCategorie2, myCategorie3);

/* _________________________ FETCH _________________________ */

function addInfoBestMovie(urlBestMovie) {
  fetch(urlBestMovie)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      let movieTitle = document.querySelector("#best_movie .title_movie");
      let movieResume = document.querySelector(
        "#best_movie .movieDetails .resume"
      );
      let movieScoreImdb = document.querySelector(
        "#best_movie .movieDetails p.note"
      );
      movieTitle.innerHTML = value.title;
      movieResume.innerHTML = "Résume du film : ";
      movieScoreImdb.innerHTML = "Note du film : " + value.imdb_score;
      let movieLongDescription = document.querySelector(
        "#best_movie .movieDetails p.long_description"
      );
      movieLongDescription.innerHTML =
        "<p> " + String(value.long_description) + "</p>";
    });
}

function extract_8_best_movies(url) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      let myList = [];
      myList.push(
        value.results[0].url +
          "####" +
          value.results[0].imdb_score +
          "####" +
          value.results[0].votes
      );
      myList.push(
        value.results[1].url +
          "####" +
          value.results[1].imdb_score +
          "####" +
          value.results[1].votes
      );
      myList.push(
        value.results[2].url +
          "####" +
          value.results[2].imdb_score +
          "####" +
          value.results[2].votes
      );
      myList.push(
        value.results[3].url +
          "####" +
          value.results[3].imdb_score +
          "####" +
          value.results[3].votes
      );
      myList.push(
        value.results[4].url +
          "####" +
          value.results[4].imdb_score +
          "####" +
          value.results[4].votes
      );
      fetch(value.next)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          myList.push(
            value.results[0].url +
              "####" +
              value.results[0].imdb_score +
              "####" +
              value.results[0].votes
          );
          myList.push(
            value.results[1].url +
              "####" +
              value.results[1].imdb_score +
              "####" +
              value.results[1].votes
          );
          myList.push(
            value.results[2].url +
              "####" +
              value.results[2].imdb_score +
              "####" +
              value.results[2].votes
          );
        })
        .then(function (value) {
          let urlBestMovie = searchTheBestMovie(myList);
          let ArrayBestMoviesUrl = removeTheBestMovieUrlIntoArray(
            myList,
            urlBestMovie
          );
          addMovieIntoIdDiv("#best_movie", urlBestMovie, 0);
          addInfoBestMovie(urlBestMovie);
          return ArrayBestMoviesUrl;
        })
        .then(function (value) {
          moviesIntoCarrousel("#best_movies", value);
        })
        .then(function (value) {
          addSliderIntoDiv("#best_movies");
        });
    });
}

function extract_7_movies(url, categorie) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      let myList = [];
      myList.push(value.results[0].url);
      myList.push(value.results[1].url);
      myList.push(value.results[2].url);
      myList.push(value.results[3].url);
      myList.push(value.results[4].url);
      fetch(value.next)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          myList.push(value.results[0].url);
          myList.push(value.results[1].url);
        })
        .then(function (value) {
          moviesIntoCarrousel("#" + categorie + "_movies", myList);
        })
        .then(function (value) {
          addSliderIntoDiv("#" + categorie + "_movies");
        });
    });
}

function addMovieIntoIdDiv(idDivCarrousel, urlMovie, indexMovie) {
  fetch(String(urlMovie))
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      let divMovie = document.getElementById(
        idDivCarrousel.replace("#", "") + String(indexMovie)
      );

      let movieImg = document.createElement("div");
      divMovie.appendChild(movieImg);
      let divModal = document.createElement("div");
      divModal.classList.add("modal");
      divMovie.appendChild(divModal);
      divModalContent = document.createElement("div");
      divModalContent.classList.add("modal-content");
      spanBtn = document.createElement("span");
      spanBtn.innerHTML = "&times;";
      spanBtn.classList.add("btn_close");
      divModalContent.appendChild(spanBtn);
      let elementH2Modal = document.createElement("h2");
      divModalContent.appendChild(elementH2Modal);
      let divIncludeModal = document.createElement("div");
      divIncludeModal.classList.add("include-modal");
      divModalContent.appendChild(divIncludeModal);
      divModal.appendChild(divModalContent);

      let titleImg = String(value["title"]);
      titleImg = titleImg.replace(" ", "");
      movieImg.innerHTML =
        "<img src=" + value.image_url + " alt=" + titleImg + "/>";
      movieImg.setAttribute(
        "id",
        idDivCarrousel.replace("#", "") + "img_movie" + String(indexMovie)
      );
      divMovie.appendChild(movieImg);
      let DivModalLeft = document.createElement("div");
      DivModalLeft.classList.add(
        idDivCarrousel + "modalLeftMovie" + String(indexMovie)
      );
      let DivModalRight = document.createElement("div");
      DivModalRight.classList.add(
        idDivCarrousel + "modalRightMovie" + String(indexMovie)
      );
      elementH2Modal.innerHTML = value.title;
      divIncludeModal.appendChild(DivModalLeft);
      let ActorsMovie = "";
      for (let actor of value.actors) {
        ActorsMovie += actor + ", ";
      }
      let InfosDivModalLeft =
        "<ul><li>Genres : " +
        value.genres +
        "</li>" +
        "<li>Date published : " +
        value.date_published +
        "</li>" +
        "<li>Rated : " +
        value.rated +
        "</li>" +
        "<li>Score Imdb : " +
        value.imdb_score +
        "</li>" +
        "<li>Directors : " +
        value.directors +
        "</li>" +
        "<li>Actors : " +
        ActorsMovie +
        "</li>" +
        "<li>Duration : " +
        value.duration +
        "</li>" +
        "<li>Countries : " +
        value.countries +
        "</li>" +
        "<li>Reviews from critics : " +
        value.reviews_from_critics +
        "</li>" +
        "<li>Description : " +
        value.long_description +
        "</li>" +
        "</ul>";
      DivModalLeft.innerHTML = InfosDivModalLeft;
      divIncludeModal.appendChild(DivModalRight);
      imgMovie = document.createElement("div");
      imgMovie.innerHTML = "<img src=" + value.image_url + "/>";
      DivModalRight.appendChild(imgMovie);
      let btnModal = document.querySelector(
        idDivCarrousel + "img_movie" + String(indexMovie)
      );
      btnModal.addEventListener("click", function () {
        divModal.style.display = "block";
      });
      spanBtn.addEventListener("click", function () {
        divModal.style.display = "none";
      });
      window.addEventListener("click", function (event) {
        if (event.target == divModal) {
          divModal.style.display = "none";
        }
      });
      try {
        let btnInfoMovie = document.querySelector(
          idDivCarrousel + " .movieDetails button"
        );
        btnInfoMovie.style.display = "block";

        btnInfoMovie.addEventListener("click", function () {
          divModal.style.display = "block";
        });
      } catch (error) {}
    });
}

function searchTheBestMovie(ArrayBestMoviesUrl) {
  let moviesScore = new Map();
  let moviesVote = new Map();
  moviesScore.set(
    ArrayBestMoviesUrl[0].split("####")[0],
    ArrayBestMoviesUrl[0].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[0].split("####")[0],
    ArrayBestMoviesUrl[0].split("####")[2]
  );
  moviesScore.set(
    ArrayBestMoviesUrl[1].split("####")[0],
    ArrayBestMoviesUrl[1].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[1].split("####")[0],
    ArrayBestMoviesUrl[1].split("####")[2]
  );
  moviesScore.set(
    ArrayBestMoviesUrl[2].split("####")[0],
    ArrayBestMoviesUrl[2].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[2].split("####")[0],
    ArrayBestMoviesUrl[2].split("####")[2]
  );
  moviesScore.set(
    ArrayBestMoviesUrl[3].split("####")[0],
    ArrayBestMoviesUrl[3].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[3].split("####")[0],
    ArrayBestMoviesUrl[3].split("####")[2]
  );
  moviesScore.set(
    ArrayBestMoviesUrl[4].split("####")[0],
    ArrayBestMoviesUrl[4].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[4].split("####")[0],
    ArrayBestMoviesUrl[4].split("####")[2]
  );
  moviesScore.set(
    ArrayBestMoviesUrl[5].split("####")[0],
    ArrayBestMoviesUrl[5].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[5].split("####")[0],
    ArrayBestMoviesUrl[5].split("####")[2]
  );
  moviesScore.set(
    ArrayBestMoviesUrl[6].split("####")[0],
    ArrayBestMoviesUrl[6].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[6].split("####")[0],
    ArrayBestMoviesUrl[6].split("####")[2]
  );
  moviesScore.set(
    ArrayBestMoviesUrl[7].split("####")[0],
    ArrayBestMoviesUrl[7].split("####")[1]
  );
  moviesVote.set(
    ArrayBestMoviesUrl[7].split("####")[0],
    ArrayBestMoviesUrl[7].split("####")[2]
  );

  let listeScore = [];
  for (let [key, value] of moviesScore) {
    listeScore.push(value);
  }
  listeScore.sort();
  let bestScore = listeScore[listeScore.length - 1];
  let arrayBestMovies = [];
  for (let [key, value] of moviesScore) {
    if (value == bestScore) {
      arrayBestMovies.push(key);
    }
  }
  let arrayVoteMovies = [];
  for (let movie of arrayBestMovies) {
    for (let [key, value] of moviesScore) {
      if (movie == key) {
        arrayVoteMovies.push(value);
      }
    }
  }
  arrayVoteMovies.sort();
  let urlBestMovie;
  let best_vote = arrayVoteMovies[arrayVoteMovies.length - 1];
  for (let [key, value] of moviesScore) {
    if (value == best_vote) {
      urlBestMovie = key;
    }
  }
  return urlBestMovie;
}
function removeTheBestMovieUrlIntoArray(ArrayBestMoviesUrl, urlBestMovie) {
  i = 0;
  for (let element of ArrayBestMoviesUrl) {
    if (element.split("####")[0] == urlBestMovie) {
      ArrayBestMoviesUrl.splice(i, 1);
    } else {
      i += 1;
    }
  }
  return ArrayBestMoviesUrl;
}
function moviesIntoCarrousel(idDivCarrousel, MoviesList) {
  i = 1;
  for (movieUrl of MoviesList) {
    addMovieIntoIdDiv(idDivCarrousel, movieUrl, i);
    i++;
  }
}

async function manageCategoryMovie(genreMovie, idSection) {
  extract_7_movies(
    adresseServeur +
      "api/v1/titles/?sort_by=-imdb_score&genre=" +
      String(genreMovie),
    String(idSection)
  );
  let titleCategory = document.querySelector(
    "#" + String(idSection) + "_movies h2"
  );
  titleCategory.innerHTML =
    titleCategory.firstChild.data + " - Catégorie " + String(genreMovie);
}

/*_________________________ CARROUSEL _________________________________*/
function modifVisibleSlide(
  idDiv,
  indexFirstMovie,
  numberMovies,
  slidesVisible
) {
  let childrenCarrouselDiv = document.querySelectorAll(
    "." + idDiv.replace("#", "") + "__carrouselItem"
  );
  let slidesToScroll = numberMovies;
  let myListMovies = Array.from(Array(numberMovies).keys());
  let position = indexFirstMovie;
  while (Math.abs(position) > numberMovies) {
    if (Math.abs(position) % numberMovies == 0) {
      position = 0;
    } else {
      position = Math.abs(position) % numberMovies;
    }
  }
  i = 0;
  while (i < slidesToScroll) {
    if (slidesVisible > 0) {
      if (position + i < 0) {
        childrenCarrouselDiv[
          myListMovies.length - Math.abs(position + i)
        ].style.display = "block";
        slidesVisible--;
      } else if (position + i >= slidesToScroll) {
        childrenCarrouselDiv[
          myListMovies[position + i - slidesToScroll]
        ].style.display = "block";
        slidesVisible--;
      } else {
        childrenCarrouselDiv[myListMovies[position + i]].style.display =
          "block";
        slidesVisible--;
      }
    }
    i++;
  }
}

function eraseVisibleSlide(idDiv, numberMovies) {
  let childrenCarrouselDiv = document.querySelectorAll(
    "." + idDiv.replace("#", "") + "__carrouselItem"
  );
  let slidesToScroll = numberMovies;
  let range = Array.from(Array(numberMovies).keys());

  for (let movie of range) {
    childrenCarrouselDiv[movie].style.display = "none";
  }
}

function addSliderIntoDiv(
  idDiv,
  numberMovies = carrouselNumberMoviesPerCategories,
  slidesVisible = carrousselSlidesVisible
) {
  let btnLeft = document.querySelectorAll(idDiv + " .btn_carrousel")[0];
  let btnRight = document.querySelectorAll(idDiv + " .btn_carrousel")[1];
  let position = 0;
  eraseVisibleSlide(idDiv, numberMovies);
  modifVisibleSlide(idDiv, position, numberMovies, slidesVisible);

  btnLeft.addEventListener("click", function () {
    eraseVisibleSlide(idDiv, numberMovies);
    position--;
    modifVisibleSlide(idDiv, position, numberMovies, slidesVisible);
  });
  btnRight.addEventListener("click", function () {
    eraseVisibleSlide(idDiv, numberMovies);
    position++;
    modifVisibleSlide(idDiv, position, numberMovies, slidesVisible);
  });
}
