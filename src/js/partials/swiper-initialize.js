(function(){

    // Основной слайдер на главной странице
    if(document.querySelector(".js-main-slider")){

        let mainSwiper = new Swiper(".js-main-slider", {
            init: true,
            //centeredSlides: true,
            speed: 1200,
            slidesPerView: 1,
            loop: false,
            parallax: true,
            autoHeight: true,
            direction: "horizontal",
            watchOverflow: true,
            pagination: {
                el: ".js-main-slider-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".js-main-slider-arrow-right",
                prevEl: ".js-main-slider-arrow-left",
            },
        });
    
        /*if(mainSwiper.wrapperEl.children.length > 1){
            mainSwiper.params.loop = true;
            mainSwiper.init();
        }else{
            mainSwiper.init();
        };*/

    };

    // Основной слайдер на главной странице
    if(document.querySelector(".js-reviews-slider")){

        let reviewsSwiper = new Swiper(".js-reviews-slider", {
            breakpoints: {
                320: {
                    spaceBetween: 32
                },
                1480: {
                    spaceBetween: 36,
                },
            },
            speed: 1200,
            slidesPerView: "auto",
            loop: false,
            parallax: true,
            direction: "horizontal",
            watchOverflow: true,
            navigation: {
                nextEl: ".js-reviews-slider-arrow-right",
                prevEl: ".js-reviews-slider-arrow-left",
            },
        });

    };
    
})();