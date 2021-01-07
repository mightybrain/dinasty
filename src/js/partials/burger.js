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