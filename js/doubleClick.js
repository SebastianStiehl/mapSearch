YUI.add("is24-doubleClick", function (Y) {
    "use strict";
    
    var state = {};

    Y.namespace("is24.search");
    Y.is24.doubleClick = function (name, lastRealEstateId) {
        if (state[name] === lastRealEstateId) {
            window.location = "http://www.immobilienscout24.de/expose/" + lastRealEstateId;
        } else {
            state[name] = lastRealEstateId;
        }
    };

}, '0.0.1', { requires: [] });