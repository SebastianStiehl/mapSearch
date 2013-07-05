YUI.add("is24-markers", function (Y) {
    "use strict";

    var markers = [],
        lastRealEstateId,
        map;

    function createIcon() {
        return new google.maps.MarkerImage('img/house.png');
    }

    function handleHighlighting(marker) {
        return function () {
            Y.is24.doubleClick("is24-markers", marker.realEstateId);
            lastRealEstateId = marker.realEstateId;
            Y.is24.highlight.reset();
            Y.is24.highlight.marker(marker);
            Y.fire('highlight:list', marker.realEstateId);
        };
    }

    function attachListener() {
        Y.on("highlight:marker", function (realEstateIdString) {
            var marker, 
                realEstateId = parseInt(realEstateIdString, 10);
            
            marker = Y.Array.find(markers, function (m) {
                return m.realEstateId === realEstateId;
            });
            
            if (marker) {
                Y.is24.highlight.marker(marker);
                map.panTo(marker.position);
            }
        });
    }

    Y.namespace("is24.search");
    Y.is24.markers = function (model, gmap) {
        map = gmap;

        Y.Array.each(model, function (modelEntry) {
            var marker, coordinates;

            coordinates = modelEntry["resultlist.realEstate"].address.wgs84Coordinate;
            if (coordinates) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
                    icon: createIcon(),
                    title: modelEntry["resultlist.realEstate"].title,
                    realEstateId: modelEntry.realEstateId
                });
    
                google.maps.event.addListener(marker, "click", handleHighlighting(marker));
    
                markers.push(marker);
            }
        });

        attachListener();

        return markers;
    }

}, '0.0.1', { requires: ["array-extras", "event-custom", "is24-highlight", , "is24-doubleClick"]});