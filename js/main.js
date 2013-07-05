var IS24 = {};

YUI().use([
    "node", "array-extras", "gallery-scrollintoview", "anim", 
    "is24-search", "is24-list", "is24-markers"
], function (Y) {
    var map,
        centerPoint = new google.maps.LatLng(52.524220046211134, 13.411027828464853),
        markerManager,
        resultList = Y.one("#resultList");

    function createMap() {
        map = new google.maps.Map(Y.one("#map").getDOMNode(), {
            zoom: 15,
            center: centerPoint,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            }
        });
    }

    function createMarkerManager(markers) {
        markerManager = new MarkerManager(map);
        google.maps.event.addListener(markerManager, 'loaded', function () {
            markerManager.addMarkers(markers, 12);
            markerManager.refresh();
        });
    }


    Y.is24.search(function (model) {
        var entries = model["resultlist.resultlist"].resultlistEntries[0].resultlistEntry;

        createMap();
        Y.is24.list(entries, resultList, map);
        createMarkerManager(Y.is24.markers(entries, map));
    });

});