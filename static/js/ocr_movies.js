

function add_video_movie(index_movie){
  let div_video_movie = document.querySelector("#the_movie .descriptions .video_movie");
  let http_imbd = "https://www.imdb.com/video/vi3935614489?playlistId=tt1508669&ref_=tt_ov_vi"
}

url_movie = fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    let section_the_movie_div_title = document.querySelector("#the_movie .movie h3");
    console.log(section_the_movie_div_title)
    let section_the_movie_div_note = document.querySelector("#the_movie p.note");
    let section_the_movie_img= document.querySelector("#the_movie div.img_movie p");
    let url_movie = value.results[0].url;
    let url_image = value.results[0].image_url
    section_the_movie_img.innerHTML = "<img src=" + url_image + " alt="+ String(value.results[0].title) + " title="+String(value.results[0].title) + "/> <br/> "
    section_the_movie_div_title.innerHTML = value.results[0].title;
    section_the_movie_div_note.innerHTML = "Note du film : " + value.results[0].imdb_score
    extract_movie(url_movie)
  })

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