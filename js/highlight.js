YUI.add("is24-highlight", function (Y) {
    "use strict";

    var lastListEntry,
        lastMarker;



    Y.namespace("is24.search");
    Y.is24.highlight = {
        reset: function () {
            var icon;

            if (lastMarker) {
                this.markerState(lastMarker);
            }

            if (lastListEntry) {
                lastListEntry.removeClass("highlight");
            }
        },
        marker: function (marker) {
            var icon;

            if (Y.is24.state.contains("remembered", marker.realEstateId)) {
                icon = "img/marker-hover-remembered.png";
            } else {
                icon = "img/marker-hover.png";
            }

            marker.setIcon(icon);
            lastMarker = marker;
        },
        markerState: function (marker) {
            var icon;

            if (Y.is24.state.contains("remembered", marker.realEstateId) && Y.is24.state.contains("seen", marker.realEstateId)) {
                icon = "img/marker-seen-remembered.png";
            } else if (Y.is24.state.contains("remembered", marker.realEstateId)) {
                icon = "img/marker-remembered.png";
            } else if (Y.is24.state.contains("seen", marker.realEstateId)) {
                icon = "img/marker-seen.png";
            } else {
                icon = "img/marker.png";
            }

            marker.setIcon(icon);
        },
        listing: function (listEntry) {
            listEntry.addClass("highlight");
            lastListEntry = listEntry;
        }
    };

}, '0.0.1');