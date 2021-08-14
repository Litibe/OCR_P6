function modifVisibleSlide (idDiv, indexFirstMovie, numberMovies, slidesVisible ) {
    let childrenCarrouselDiv = document.querySelectorAll("."+idDiv.replace("#","")+"__carrouselItem")
    let slidesToScroll = numberMovies
    let range = Array.from(Array(numberMovies).keys())
    let myListMovies = Array.from(Array(numberMovies).keys())
    let position = indexFirstMovie
    console.log("inject position", position)
    while (Math.abs(position)>numberMovies) {
        if (Math.abs(position) % numberMovies == 0) {position = 0}
        else {position = Math.abs(position) % numberMovies}
    }
    console.log("position", position)
    i=0
    while (i < slidesToScroll) {
        
        if (slidesVisible > 0) {
            console.log("position +I", position+i)
            if ((position+i)<0) {
                childrenCarrouselDiv[myListMovies.length - Math.abs(position+i)].style.display = "block"
                slidesVisible--
                console.log("a", position+i)
            } else if ((position+i)>=slidesToScroll) {
                childrenCarrouselDiv[myListMovies[(position+i-slidesToScroll)]].style.display = "block"
                slidesVisible--
                console.log("b", position+i-slidesToScroll)
            } else {
                childrenCarrouselDiv[myListMovies[position+i]].style.display = "block"
                slidesVisible--
                console.log("c", position+i)
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

function odifVisibleSlide (idDiv, indexFirstMovie, numberMovies, slidesVisible ) {
    let childrenCarrouselDiv = document.querySelectorAll("."+idDiv.replace("#","")+"__carrouselItem")
    let slidesToScroll = numberMovies
    let range = Array.from(Array(numberMovies).keys())
    let myListMovies = Array.from(Array(numberMovies).keys())
    let position = indexFirstMovie
    i=0
    console.log("inject position", position)
    console.log("mat", (Math.abs(position+i)))


    if (Math.abs(position) == numberMovies) {position = 0};
    console.log("new position", position)
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

addSliderIntoDiv("#best_movies", 7, 3)