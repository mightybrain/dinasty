// Инициализация свайпера
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


// Показывает и скрывает попапы
// partials/popup.js


// Показывает и скрывает главное меню
class Burger{

    constructor(button){
        this.button = button;
        this.init();
    }

    init(){
        this.button.addEventListener("click", function(){
            document.body.classList.toggle("js-burger-menu-is-open");
        })
    }

}

if(document.querySelector(".js-burger")){
    new Burger(document.querySelector(".js-burger"));
};


// Инициализация Яндекс-карты
// Инициализация карты Яндекс
if(document.getElementById("map")){
    ymaps.ready(mapInit);
}

function mapInit(){ 
    let locationMap = new ymaps.Map("map", {
        center: [56.831886, 60.620480],
        zoom: 15,
        controls: [],
    })

    locationMap.geoObjects.add(
        new ymaps.Placemark([56.831886, 60.620480], {
            hintContent:"",
            balloonContent:""
        }, {
            iconLayout: "default#image",
            iconImageHref: "../images/pin.png",
            iconImageSize: [32, 37],
            iconImageOffset: [-16, -37]
        })
    )
}


// Переключение табов
class Tabs{
    constructor(container){
        this.container = container;
        this.content = document.querySelector("[data-tabs-content=" + container.getAttribute("data-tabs") + "]");
        this.init();
    }

    init(){
        let _this = this;

        this.container.querySelectorAll("[data-tab]").forEach(function(item){
            item.addEventListener("click", function(){
                if(!this.classList.contains("js-active-tab")){
                    _this.container.querySelector(".js-active-tab").classList.remove("js-active-tab");
                    this.classList.add("js-active-tab");
                    _this.changeState();
                }
            })
        })

        if(this.container.querySelector(".js-active-tab")){
            this.changeState();
        }else{
            this.container.querySelector("[data-tab]").classList.add("js-active-tab");
            this.changeState();
        }

    }

    changeState(){

        let activeTab = this.container.querySelector(".js-active-tab");

        this.content.querySelectorAll("[data-tab-content]").forEach(function(item){

            if(item.getAttribute("data-tab-content").includes(activeTab.getAttribute("data-tab"))){
                
                item.classList.remove("js-content-is-hidden");

            }else{

                item.classList.add("js-content-is-hidden");
            }
        })
    }
}

if(document.querySelector(".js-tabs")){
    document.querySelectorAll(".js-tabs").forEach(function(item){
        new Tabs(item);
    })
}