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