YUI.add("is24-highlight", function (Y) {
    "use strict";

    var lastListEntry,
        lastMarker;

    function reset() {
        if (lastMarker) {
            lastMarker.setIcon("img/marker.png");
        }

        if (lastListEntry) {
            lastListEntry.removeClass("highlight");
        }
    }

    Y.namespace("is24.search");
    Y.is24.highlight = {
        reset: reset,
        marker: function (marker, remember) {
            var icon = (remember ? "img/marker-hover-remembered.png" : "img/marker-hover.png");


            marker.setIcon(icon);
            lastMarker = marker;
        },
        listing: function (listEntry) {
            listEntry.addClass("highlight");
            lastListEntry = listEntry;
        }
    };

}, '0.0.1');