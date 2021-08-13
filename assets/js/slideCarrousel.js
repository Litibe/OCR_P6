class Carrousel {
    /**
     * @param (HTML element) element
     * @param (Object) option
     * @param (Object) option.slidesToScroll Nombre d'élément à scroller
     * @param (Objetc) option.slidesVisible 

     */
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1, 
            slidesVisible : 1
        }, options)
    }
}

document.addEventListener ('DOMContentLoaded', function() {
    
    new Carrousel (document.querySelector("#best_movies .carrousel"),{
        slidesToScroll: 7, 
        slidesVisible: 3
    })

})