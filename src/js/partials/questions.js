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