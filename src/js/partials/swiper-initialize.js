if(document.querySelector(".js-main-slider")){

    new Swiper(".js-main-slider", {
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
    })

}

if(document.querySelector(".js-reviews-slider")){

    new Swiper(".js-reviews-slider", {
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
        direction: "horizontal",
        watchOverflow: true,
        navigation: {
            nextEl: ".js-reviews-slider-arrow-right",
            prevEl: ".js-reviews-slider-arrow-left",
        },
    })

}