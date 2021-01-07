// Инициализация карты Яндекс
if(document.getElementById("map")){
    ymaps.ready(mapInit);
}

function mapInit(){ 
    let locationMap = new ymaps.Map("map", {
        center: [56.831886, 60.620480],
        zoom: 15,
        controls: [],
    })

    locationMap.geoObjects.add(
        new ymaps.Placemark([56.831886, 60.620480], {
            hintContent:"",
            balloonContent:""
        }, {
            iconLayout: "default#image",
            iconImageHref: "../images/pin.png",
            iconImageSize: [32, 37],
            iconImageOffset: [-16, -37]
        })
    )
}   