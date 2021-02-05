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
