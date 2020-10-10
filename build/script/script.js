// Инициализация свайпера
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


// Валидация форм
// partials/validation.js


// Показывает и скрывает попапы
// partials/popup.js


// Показывает и скрывает главное меню
(function(){

    const burgerButton = document.querySelector(".burger");
    if(burgerButton){
        burgerButton.addEventListener("click", changeMenuState);
    };

    function changeMenuState(){
        document.body.classList.toggle("js-burger-menu-is-open");

        /*if(!burgerButton.classList.contains("js-burger-is-open")){
            burgerButton.classList.add("js-burger-is-open");
        }else if(burgerButton.classList.contains("js-burger-is-open")){
            burgerButton.classList.remove("js-burger-is-open");
        };*/
    };
    
})();


// Инициализация Яндекс-карты
// Инициализация карты Яндекс
if(document.getElementById("map")){
    ymaps.ready(init);
    function init(){ 
        let locationMap = new ymaps.Map("map", {
            center: [56.831886, 60.620480],
            zoom: 15,
            controls: [],
        }),
        
        mainPin = new ymaps.Placemark([56.831886, 60.620480], {
            hintContent:"",
            balloonContent:""
        }, {
            iconLayout: "default#image",
            iconImageHref: "../images/pin.png",
            iconImageSize: [32, 37],
            iconImageOffset: [-16, -37]
        });
 
        locationMap.geoObjects
            .add(mainPin)
    };    
};


// Переключение табов
(function () {

    let tabsContainers = document.querySelectorAll(".js-tabs");
    if(tabsContainers){
        for(let i = 0; i < tabsContainers.length; i++){
            let tabs = new TabsInit(tabsContainers[i]);
        };
    };

    // Инициализирует табы
    function TabsInit(tabsContainer){

        let tabButtons = tabsContainer.querySelectorAll("[data-tab]");
        if(tabButtons){
            for(let i = 0; i < tabButtons.length; i++){
                tabButtons[i].addEventListener("click", changeTabState.bind(null, tabsContainer, tabButtons[i]));
            };
        };

        // Находим кнопку активного таба
        let activeTabButton = tabsContainer.querySelector(".tabs__item--active").firstElementChild;

        // Выводим контент активного таба
        changeContent(activeTabButton, tabsContainer);
    };

    // Меняет активный таб
    function changeTabState(tabsContainer, tabButton){

        // Находим в корневой группе текущий активный таб и переназначаем
        tabsContainer.querySelector(".tabs__item--active").classList.remove("tabs__item--active");
        tabButton.parentElement.classList.add("tabs__item--active");
        

        // Выводим контент активного таба
        changeContent(tabButton, tabsContainer)
    };

    // Выводит контент активного таба
    function changeContent(tabButton, tabsContainer){

        // Находим контент для текущей группы табов
        let tabsContent = document.querySelector("[data-tabs-content=" + tabsContainer.getAttribute("data-tabs") + "]");
        
        // Если контент найден
        if(tabsContent){

            // Находим все группы или элементы контента
            let tabsContentItems = tabsContent.querySelectorAll("[data-tab-content]");

            if(tabButton.getAttribute("data-tab") == "all"){
                for(let i = 0; i < tabsContentItems.length; i++){
                    if(tabsContentItems[i].classList.contains("js-content-is-hidden")){
                        tabsContentItems[i].classList.remove("js-content-is-hidden");
                    };  
                };
            }else{
                // Проверяем принадлежность каждого элемента к текущему активному табу
                for(let i = 0; i < tabsContentItems.length; i++){

                    // Если элемент относится к текущему табу, делаем его видимым
                    if(tabsContentItems[i].getAttribute("data-tab-content").includes(tabButton.getAttribute("data-tab"))){
                        if(tabsContentItems[i].classList.contains("js-content-is-hidden")){
                            tabsContentItems[i].classList.remove("js-content-is-hidden");
                        };
                    // Если элемент не относится к текущему табу, скрываем
                    }else{
                        if(!tabsContentItems[i].classList.contains("js-content-is-hidden")){
                            tabsContentItems[i].classList.add("js-content-is-hidden");
                        };
                    };
                    
                };
            };

        };
    };

})();