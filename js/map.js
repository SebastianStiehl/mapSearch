YUI.add("is24-map", function (Y) {
    "use strict";

    var map,
        init = false,
        northEast = null,
        southWest = null;

    function initBounds(coordinate) {
        if (!init) {
            init = true;
            northEast = {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
            };
            southWest = {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
            };
        }
    }

    function checkMax(coordinate) {
        if (coordinate.latitude > northEast.latitude) {
            northEast.latitude = coordinate.latitude;
        }
        if (coordinate.longitude > northEast.longitude) {
            northEast.longitude = coordinate.longitude;
        }
    }

    function checkMin(coordinate) {
        if (coordinate.latitude < southWest.latitude) {
            southWest.latitude = coordinate.latitude;
        }
        if (coordinate.longitude < southWest.longitude) {
            southWest.longitude = coordinate.longitude;
        }
    }

    function findBoundingBox(entries) {
        var latLngBounds;

        Y.Array.each(entries, function (entry) {
            var coordinate = entry["resultlist.realEstate"].address.wgs84Coordinate;

            if (coordinate) {
                initBounds(coordinate);
                checkMax(coordinate);
                checkMin(coordinate);
            }
        });

        if (northEast && southWest) {
            northEast.latLng = new google.maps.LatLng(northEast.latitude, northEast.longitude);
            southWest.latLng = new google.maps.LatLng(southWest.latitude, southWest.longitude);
            latLngBounds = new google.maps.LatLngBounds(southWest.latLng, northEast.latLng);
        }

        return latLngBounds;
    }

    Y.namespace("is24.search");
    Y.is24.map = {
        create: function (entries) {
            var bounds,
                centerOfGermany = new google.maps.LatLng(51.41, 10.28);

            map = new google.maps.Map(Y.one("#map").getDOMNode(), {
                zoom: 6,
                center: centerOfGermany,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                }
            });

            bounds = findBoundingBox(entries);
            if (bounds) {
                map.fitBounds(bounds);
            }
        },
        panTo: function (position) {
            map.panTo(position);
        },
        getInstance: function () {
            return map;
        }
    };

}, '0.0.1', { requires: ["array-extras"] });
