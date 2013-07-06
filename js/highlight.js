YUI.add("is24-highlight", function (Y) {
    "use strict";

    var state = Y.is24.state,
        lastListEntry,
        lastMarker;

    Y.namespace("is24.search");
    Y.is24.highlight = {
        reset: function () {
            if (lastMarker) {
                this.markerState(lastMarker);
            }

            if (lastListEntry) {
                lastListEntry.removeClass("highlight");
            }
        },

        marker: function (marker) {
            var icon;

            if (state.wasRemembered(marker.realEstateId)) {
                icon = "img/marker-hover-remembered.png";
            } else {
                icon = "img/marker-hover.png";
            }

            marker.setIcon(icon);
            lastMarker = marker;
        },

        markerState: function (marker) {
            var icon,
                id = marker.realEstateId;

            if (state.wasRemembered(id) && state.wasSeen(id)) {
                icon = "img/marker-seen-remembered.png";
            } else if (state.wasRemembered(id)) {
                icon = "img/marker-remembered.png";
            } else if (state.wasSeen(id)) {
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

}, '0.0.1', {requires: ["is24-state"]});