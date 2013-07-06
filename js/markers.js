YUI.add("is24-markers", function (Y) {
    "use strict";

    var markers = [],
        messageBox,
        lastRealEstateId;

    function createIcon() {
        return new google.maps.MarkerImage('img/marker.png');
    }

    function handleHighlighting(marker) {
        return function () {
            lastRealEstateId = marker.realEstateId;
            Y.is24.doubleClick("is24-markers", lastRealEstateId);
            Y.is24.highlight.reset();
            Y.fire('highlight:marker', lastRealEstateId);
            Y.is24.highlight.marker(marker);
        };
    }

    function attachListener() {
        Y.on("highlight:list", function (realEstateId) {
            var marker;

            realEstateId = parseInt(realEstateId, 10);
            
            marker = Y.Array.find(markers, function (m) {
                return m.realEstateId === realEstateId;
            });

            if (marker) {
                messageBox.hide();
                Y.is24.highlight.marker(marker);
                Y.is24.map.panTo(marker.position);
            } else {
                messageBox.show();
            }
        });
    }

    Y.namespace("is24.search");
    Y.is24.markers = function (model) {
        messageBox = Y.one(".message");

        messageBox.on("click", function () {
            this.hide();
        });

        Y.Array.each(model, function (modelEntry) {
            var marker, coordinates;

            coordinates = modelEntry["resultlist.realEstate"].address.wgs84Coordinate;
            if (coordinates) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
                    icon: createIcon(modelEntry.realEstateId),
                    title: modelEntry["resultlist.realEstate"].title,
                    realEstateId: modelEntry.realEstateId
                });

                Y.is24.highlight.markerState(marker);
                google.maps.event.addListener(marker, "click", handleHighlighting(marker));
    
                markers.push(marker);
            }
        });

        attachListener();

        return markers;
    }

}, '0.0.1', {requires: ["array-extras", "event-custom", "is24-highlight", "is24-doubleClick", "is24-map", "is24-state"]});