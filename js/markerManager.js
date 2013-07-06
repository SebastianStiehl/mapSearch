YUI.add("is24-markerManager", function (Y) {
    "use strict";

    Y.namespace("is24.search");
    Y.is24.markerManager = {
        create: function (markers) {
            var markerManager = new MarkerManager(Y.is24.map.getInstance());
            google.maps.event.addListener(markerManager, 'loaded', function () {
                markerManager.addMarkers(markers, 14);
                markerManager.refresh();
            });
        }
    };

}, '0.0.1', { requires: [] });