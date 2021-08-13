function modifVisibleSlide (idDiv, indexFirstMovie, numberMovies, slidesVisible ) {
    let childrenCarrouselDiv = document.querySelectorAll("."+idDiv.replace("#","")+"__carrouselItem")
    let slidesToScroll = numberMovies
    let range = Array.from(Array(numberMovies).keys())
    let myListMovies = Array.from(Array(numberMovies).keys())
    console.log(myListMovies)
    let position = indexFirstMovie
    
    i=0
    while (i < slidesToScroll) {
        childrenCarrouselDiv = document.querySelectorAll("."+idDiv.replace("#","")+"__carrouselItem")
        childrenCarrouselDiv[myListMovies[position+i]].style.display = 'inline';
        if (slidesVisible > 0) {
            childrenCarrouselDiv[myListMovies[position+i]].style.display = "block";
            slidesVisible--
            console.log("block")
        } else {
            childrenCarrouselDiv[myListMovies[position+i]].style.display = "none";
            console.log("none")
        };
        i++;
    }
}


function addSliderIntoDiv (idDiv) {
    document.addEventListener ('DOMContentLoaded', function() {
    
    
    let btnLeft = document.querySelectorAll(idDiv + " .btn_carrousel")[0]
    let btnRight = document.querySelectorAll(idDiv + " .btn_carrousel")[1]
    let position = 0
    modifVisibleSlide(idDiv, position, 7, 4)

    btnLeft.addEventListener('click', function() {
        position--
        modifVisibleSlide(idDiv, position, 7, 4)
      });
    btnRight.addEventListener('click', function() {
        position++
        modifVisibleSlide(idDiv, position, 7, 4)
      }); 
    })
}

addSliderIntoDiv("#best_movies", 7, 3)