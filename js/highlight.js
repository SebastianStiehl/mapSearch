YUI.add("is24-highlight", function (Y) {
    "use strict";

    var lastListEntry,
        lastMarker;

    function reset() {
        if (lastMarker) {
            lastMarker.setIcon("img/house.png");
        }

        if (lastListEntry) {
            lastListEntry.removeClass("highlight");
        }
    }

    Y.namespace("is24.search");
    Y.is24.highlight = {
        reset: reset,
        marker: function (marker) {
            marker.setIcon("img/houseL.png");
            lastMarker = marker;
        },
        listing: function (listEntry) {
            listEntry.addClass("highlight");
            lastListEntry = listEntry;
        }
    };

}, '0.0.1', { requires: [] });