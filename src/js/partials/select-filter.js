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