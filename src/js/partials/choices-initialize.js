if(document.querySelector(".js-choices")){
    document.querySelectorAll(".js-choices").forEach(function(item){
        new Choices(item, {})
    })
}