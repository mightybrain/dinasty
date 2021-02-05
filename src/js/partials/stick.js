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

