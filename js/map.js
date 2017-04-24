function init() {
    var e = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      , o = e > 480
      , n = {
        zoom: 8,
        scrollwheel: !1,
        mapTypeControl: !1,
        streetViewControl: !1,
        draggable: o,
        zoomControl: !1,
        center: new google.maps.LatLng(35.1607546,-111.6383224)
    }
      , t = document.getElementById("map_canvas")
      , i = new google.maps.Map(t,n);
    new google.maps.Marker({
        position: new google.maps.LatLng(34.94021,-111.6899626),
        map: i,
        title: "Sedona",
        icon: "img/icons/icon-map-marker.svg"
    });
    i.addListener("click", function() {
        i.setOptions({
            scrollwheel: !0
        })
    }),
    i.addListener("drag", function() {
        i.setOptions({
            scrollwheel: !0
        })
    }),
    i.addListener("mouseout", function() {
        i.setOptions({
            scrollwheel: !1
        })
    });
    var a = i.getCenter();
    google.maps.event.addDomListener(window, "resize", function() {
        i.setCenter(a)
    })
}
google.maps.event.addDomListener(window, "load", init);
