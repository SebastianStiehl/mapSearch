YUI.add("is24-doubleClick", function (Y) {
    "use strict";
    
    var state = {};

    Y.namespace("is24.search");
    Y.is24.doubleClick = function (name, realEstateId) {
        if (state[name] === realEstateId) {
            Y.is24.state.add("seen", realEstateId);
            window.location = "http://www.immobilienscout24.de/expose/" + realEstateId;
        } else {
            state[name] = realEstateId;
        }
    };

}, '0.0.1');