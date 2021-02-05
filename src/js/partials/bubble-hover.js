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
