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
