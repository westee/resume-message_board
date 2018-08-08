! function () {
  let view = document.querySelector(".swiper-container")
  let controller = {
    view: null,
    swiper:null,
    swiperOption:{
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    },
    init: function(view){
      this.view = view 
      this.initSwiper()

    },
    initSwiper: function(){
      this.Swiper = new Swiper(this.view, this.swiperOption)
    }
  }
  controller.init(view)
}.call()