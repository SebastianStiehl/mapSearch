YUI.add("is24-search", function (Y) {
    "use strict";

    var dataCallback, serviceUrl = "data.js?callback=IS24.handleData";
    
    IS24.handleData = function (data) {
        dataCallback(data);
    };

    Y.namespace("is24.search");
    Y.is24.search = function (callback) {
        dataCallback = callback;
        Y.jsonp(serviceUrl);
    };

}, '0.0.1', { requires: ["jsonp", "jsonp-url"] });