// Ховер на кнопки и плашки
class BubbleCreator{

    constructor(element){
        this.element = element;
        this.bubbleSize;
        this.isHovered = false;
        this.calcBubbleSize();
        this.init();
    }

    calcBubbleSize(){
        this.bubbleSize = this.element.offsetWidth;
        if(this.element.offsetWidth > this.element.offsetHeight){
            this.bubbleSize = this.element.offsetHeight;
        }
    }

    init(){
        let _this = this;

        this.element.addEventListener("mouseenter", function(){
            if(_this.isHovered){
                return;
            }
            _this.isHovered = true;

            let bubbleContainer = document.createElement("div");
            bubbleContainer.className = "bubble-container";
            bubbleContainer.style.width = _this.bubbleSize + "px";
            bubbleContainer.style.height = _this.bubbleSize + "px";
            bubbleContainer.style.left = event.clientX - _this.element.getBoundingClientRect().left - _this.bubbleSize / 2 + "px";
            bubbleContainer.style.top = event.clientY - _this.element.getBoundingClientRect().top - _this.bubbleSize / 2 + "px";
        
            let bubble = document.createElement("div");
            bubble.className = "bubble";
        
            bubbleContainer.append(bubble);
            _this.element.prepend(bubbleContainer);
            setTimeout(function(){
                bubbleContainer.remove();
            }, 1000);
        })

        this.element.addEventListener("mouseleave", function(){
            _this.isHovered = false;
        })
    }

}

if(document.querySelector(".js-bubble-hover")){

    let bubbleCreators = [];
    document.querySelectorAll(".js-bubble-hover").forEach(function(item){
        bubbleCreators.push(new BubbleCreator(item));
    })

    window.addEventListener("resize", function(){

        bubbleCreators.forEach(function(item){
            item.calcBubbleSize();
        })

    })
}


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
function showPopup(){

    let targetPopup = document.querySelector("[data-popup=" + this.getAttribute("data-popup-for") + "]");

    if(targetPopup){
        document.body.classList.add("js-popup-is-open");
        targetPopup.classList.add("js-active-popup");
    };
}

function hidePopup(){
    document.querySelector(".js-active-popup").classList.remove("js-active-popup");
    document.body.classList.remove("js-popup-is-open");
}

if(document.querySelector(".js-popup-button") && document.querySelector(".js-close-popup-button")){

    document.querySelectorAll(".js-popup-button").forEach(function(item){
        item.addEventListener("click", showPopup);
    });
    document.querySelectorAll(".js-close-popup-button").forEach(function(item){
        item.addEventListener("click", hidePopup);
    });
}


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
let maps = [];

function updateMaps() {
    maps.forEach(function(map){
        map.container.fitToViewport();
    })
}

let branches = {
    mamsib: [56.831886, 60.620480],
    akshv: [56.795475, 60.624631]
}

if(document.querySelector(".js-branch-map")){
    ymaps.ready(function(){

        document.querySelectorAll(".js-branch-map").forEach(function(item){
            if(branches[item.getAttribute("data-branch")]){  
                mapInit(branches[item.getAttribute("data-branch")], item)
            }
        })

        // Observer
        const target = document.querySelector("[data-tabs=branches]");
        const config = {
            attributes: true,
        }

        if(target){
            const observer = new MutationObserver(updateMaps);
            observer.observe(target, config);
        }
        
    })
}

function mapInit(arr, elem){ 

    let map = new ymaps.Map(elem, {
        center: arr,
        zoom: 15,
        controls: [],     
    })

    map.geoObjects.add(
        new ymaps.Placemark(arr, {
            hintContent:"",
            balloonContent:""
        }, {
            iconLayout: "default#image",
            iconImageHref: "../images/pin.png",
            iconImageSize: [32, 37],
            iconImageOffset: [-16, -37]
        })
    )

    maps.push(map);
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

        this.container.setAttribute("active-tab", activeTab.getAttribute("data-tab"));
    }
}

if(document.querySelector(".js-tabs")){
    document.querySelectorAll(".js-tabs").forEach(function(item){
        new Tabs(item);
    })
}


// Фильтр в виде селекта
class SelectFilter{
    constructor(elem){
        this.elem = elem;
        this.filteredContent = document.querySelector("[data-filtered-content=" + elem.getAttribute("data-filter") + "]");
        this.init();
    }

    init(){
        let _this = this;

        this.filter();
        this.elem.addEventListener("change", function(){
            _this.filter();
        })
        /*this.elem.addEventListener("change", () => {
            this.filter(); 
        })*/
    }

    filter(){
        let filterValue = this.elem.value;

        this.filteredContent.querySelectorAll("[data-filtered-item]").forEach(function(item){

            if(item.getAttribute("data-filtered-item").includes(filterValue)){
                if(item.classList.contains("js-content-is-hidden")){
                    item.classList.remove("js-content-is-hidden");
                }
            }else{
                if(!item.classList.contains("js-content-is-hidden")){
                    item.classList.add("js-content-is-hidden");
                }
            }
    
        })
    }

}

if(document.querySelector(".js-select-filter")){
    document.querySelectorAll(".js-select-filter").forEach(function(item){
        new SelectFilter(item);
    })
}


// Инициализация кастомных селектов
if(document.querySelector(".js-choices")){
    document.querySelectorAll(".js-choices").forEach(function(item){
        new Choices(item, {})
    })
}


// Якорные ссылки
class ScrollButton{

    constructor(button){
        this.button = button;
        this.target = document.querySelector("[data-anchor=" + button.getAttribute("data-target") + "]");
        this.init();
    }

    init(){
        let _this = this;

        this.button.addEventListener("click", function(){
            if(!inScrollNow){
                inScrollNow = true;
                let scrollHeight = Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                );

                nedScrollPosition = window.pageYOffset + _this.target.getBoundingClientRect().top;
    
                scrollTo(scrollHeight);
            }

        })
    }
}

function scrollTo(totalScroll){
    
    curScrollPosition = window.pageYOffset;

    if(curScrollPosition > nedScrollPosition){
        if(curScrollPosition - nedScrollPosition < 40){
            window.scroll(0, nedScrollPosition);
            inScrollNow = false;
            return;
        }
        window.scroll(0, window.pageYOffset - 40);
        
    }else if(curScrollPosition < nedScrollPosition){
        if(nedScrollPosition - curScrollPosition < 40){
            window.scroll(0, nedScrollPosition);
            inScrollNow = false;
            return;
        }
        window.scroll(0, window.pageYOffset + 40);
    }

    if(curScrollPosition === window.pageYOffset){
        inScrollNow = false;
        return;  
    }

    curScrollPosition = window.pageYOffset;

    setTimeout(function(){
        scrollTo(totalScroll);
    }, 15);

}

if(document.querySelector(".js-scroll-button")){

    document.querySelectorAll(".js-scroll-button").forEach(function(item){
        new ScrollButton(item);
    })

    window.inScrollNow = false;
    window.curScrollPosition = 0;
    window.nedScrollPosition = 0;

}


// Прилипающее меню
if(document.querySelector(".js-sticky")){

    const stickyElem = document.querySelector(".js-sticky");
    const stickyContainer = document.querySelector(".js-sticky-container")
    
    window.addEventListener("scroll", function(){
        stick(stickyElem, stickyContainer);
    })
    
    window.addEventListener("load", function(){
        stick(stickyElem, stickyContainer);
    })

    window.addEventListener("resize", function(){
        stick(stickyElem, stickyContainer);
        if(stickyElem.offsetHeight != stickyContainer.offsetHeight){
            stickyContainer.style.height = stickyElem.offsetHeight + "px";
        }
    })

}

function stick(elem, container){
    const isStick = elem.classList.contains("js-is-stick") ? true : false;

    if(container.getBoundingClientRect().top < 20 && !isStick){
        container.style.height = elem.offsetHeight + "px";
        elem.classList.add("js-is-stick");

    }else if(container.getBoundingClientRect().top > 20 && isStick){
        elem.classList.remove("js-is-stick");
        container.removeAttribute("style");
    }
}


// Разворачивающиеся блоки вопросов
class DropDownQuestion {
    constructor(elem){
        this.elem = elem;
        this.calcPaddings();
        this.questionText = elem.querySelector(".js-question-text");
        this.answer = elem.querySelector(".js-question-answer");
        this.init();
    }

    init(){
        let _this = this;
        
        this.elem.style.height = this.questionText.offsetHeight + this.paddingTop + this.paddingBottom + 5 + "px";

        this.elem.querySelectorAll(".js-question-state-button").forEach(function(button){
            button.addEventListener("click", function(){

                if(!_this.elem.classList.contains("question--opened")){
                    _this.elem.style.height = _this.questionText.offsetHeight + _this.answer.offsetHeight + _this.paddingTop + _this.paddingBottom + "px";
                    _this.elem.classList.add("question--opened");
                }else{
                    _this.elem.classList.remove("question--opened");
                    _this.elem.style.height = _this.questionText.offsetHeight + _this.paddingTop + _this.paddingBottom + 5 + "px";
                }
                
            })
        })
    }

    calcPaddings(){
        this.paddingTop = parseInt(getComputedStyle(this.elem).getPropertyValue("padding-top"));
        this.paddingBottom = parseInt(getComputedStyle(this.elem).getPropertyValue("padding-bottom"));
    }

    update(){
        this.calcPaddings();

        if(this.elem.classList.contains("question--opened")){
            this.elem.style.height = this.questionText.offsetHeight + this.answer.offsetHeight + this.paddingTop + this.paddingBottom + "px";
        }else{
            this.elem.style.height = this.questionText.offsetHeight + this.paddingTop + this.paddingBottom + 5 + "px";
        }
        
    }
}

if(document.querySelector(".js-drop-down-question")){
    window.questions = [];

    document.querySelectorAll(".js-drop-down-question").forEach(function(item){
        questions.push(new DropDownQuestion(item));
    })

    window.addEventListener("resize", function(){
        questions.forEach(function(item){
            item.update();
        })
    })
}


// Валидация
if(document.querySelector("form")){
    document.querySelectorAll("form").forEach(function(item){
        item.addEventListener("submit", validationCheck);
    })
}

function validationCheck(event){

    let elems = this.querySelectorAll("input, select, textarea");
    let errors = [];

    elems.forEach(function(item){
        let type;

        if(item.hasAttribute("type")){
            type = item.getAttribute("type");
        }else{
            type = item.getAttribute("data-type");
        }

        switch(type){

            case "text":
                if(item.value == ""){ 
                    reqCheck(item);
                }else{
                    let pattern;

                    switch(item.getAttribute("data-content")){
                        case "surname":
                        case "name":
                            pattern = new RegExp("^[a-zа-яё -]{1,}$","i");
                            contentCheck(item, item.value, pattern);
                            break;
                        case "phone":   
                            pattern = new RegExp("^[0-9 ]{7,}$");
                            contentCheck(item, item.value, pattern);
                            break;
                        case "date":   
                            pattern = new RegExp("^[0-9]{1,4}[.]{1}[0-9]{1,4}[.]{1}[0-9]{1,4}$");
                            contentCheck(item, item.value, pattern);
                            break;
                        case "mail":
                            pattern = new RegExp("^[a-z0-9_-]{1,}@{1}[a-z]{1,}[.]{1}[a-z]{2,3}$","i");
                            contentCheck(item, item.value, pattern);
                            break;
                    }
                }
                break;

            case "select":
                if(item.options[item.options.selectedIndex].innerText == ""){
                    reqCheck(item);
                }else{
                    removeErrorMarks(item);
                }
                break;
                
            case "textarea":
                if(item.value == ""){ 
                    reqCheck(item);
                }else{
                    removeErrorMarks(item);
                }
                break;

            case "checkbox":
                if(!item.checked){
                    reqCheck(item);
                }else{
                    removeErrorMarks(item);
                }
                break;
        }
    })

    function reqCheck(elem){
        if(elem.hasAttribute("data-req")){
            errors.push(elem);
        }
    }

    function removeErrorMarks(elem){
        let elemParent = elem.parentElement;
        while(!elemParent.classList.contains("form__group")){
            elemParent = elemParent.parentElement;
        }
        if(elemParent.classList.contains("js-valid-error")){
            elemParent.classList.remove("js-valid-error");
        }
    }

    function contentCheck(elem, content, patrn){
        if(!patrn.test(content)){
            errors.push(elem); 
        }else{
            removeErrorMarks(elem);
        }
    }

    if(errors.length){
        event.preventDefault();

        errors.forEach(function(item){
            let elemParent = item.parentElement;
            while(!elemParent.classList.contains("form__group")){
                elemParent = elemParent.parentElement;
            }
            if(!elemParent.classList.contains("js-valid-error")){
                elemParent.classList.add("js-valid-error");
            }
        })
    }
}