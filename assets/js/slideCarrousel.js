function modifVisibleSlide (idDiv, indexFirstMovie, numberMovies, slidesVisible ) {
    let childrenCarrouselDiv = document.querySelectorAll("."+idDiv.replace("#","")+"__carrouselItem")
    let slidesToScroll = numberMovies
    let myListMovies = Array.from(Array(numberMovies).keys())
    let position = indexFirstMovie
    while (Math.abs(position)>numberMovies) {
        if (Math.abs(position) % numberMovies == 0) {position = 0}
        else {position = Math.abs(position) % numberMovies}
    }
    i=0
    while (i < slidesToScroll) {
        
        if (slidesVisible > 0) {
            if ((position+i)<0) {
                childrenCarrouselDiv[myListMovies.length - Math.abs(position+i)].style.display = "block"
                slidesVisible--
            } else if ((position+i)>=slidesToScroll) {
                childrenCarrouselDiv[myListMovies[(position+i-slidesToScroll)]].style.display = "block"
                slidesVisible--
            } else {
                childrenCarrouselDiv[myListMovies[position+i]].style.display = "block"
                slidesVisible--
            }
        }
        i++;
    }
}

function eraseVisibleSlide (idDiv, numberMovies) {
    let childrenCarrouselDiv = document.querySelectorAll("."+idDiv.replace("#","")+"__carrouselItem")
    let slidesToScroll = numberMovies
    let range = Array.from(Array(numberMovies).keys())
    
    for (let movie of range) {
        childrenCarrouselDiv[movie].style.display = "none"
    }   
}

function addSliderIntoDiv (idDiv) {
    document.addEventListener ('DOMContentLoaded', function() {
    
    
    let btnLeft = document.querySelectorAll(idDiv + " .btn_carrousel")[0]
    let btnRight = document.querySelectorAll(idDiv + " .btn_carrousel")[1]
    let position = 0
    eraseVisibleSlide(idDiv, 7)
    modifVisibleSlide(idDiv, position, 7, 4)

    btnLeft.addEventListener('click', function() {
        eraseVisibleSlide(idDiv, 7)
        position--
        modifVisibleSlide(idDiv, position, 7, 4)
      });
    btnRight.addEventListener('click', function() {
        eraseVisibleSlide(idDiv, 7)
        position++
        modifVisibleSlide(idDiv, position, 7, 4)
      }); 
    })
}

addSliderIntoDiv("#best_movies", 7, 3);
addSliderIntoDiv("#cat1", 7, 3);
