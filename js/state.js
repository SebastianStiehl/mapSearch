YUI.add("is24-state", function (Y) {
    "use strict";

    var id = "userState", dataCache = null;

    Y.namespace("is24.search");
    Y.is24.state = {
        add: function (name, data) {
            var entry, currentState = this.getAll();

            entry = currentState[name];

            if (entry) {
                entry.push(data);
            } else {
                currentState[name] = [data];
            }

            dataCache = currentState;
            Y.Cookie.set(id, JSON.stringify(currentState));
        },

        remove: function (name, data) {
            var entry,
                currentState = this.getAll();

            entry = currentState[name];

            if (entry) {
                entry = Y.Array.filter(entry, function (el) {
                    return el !== data;
                });

                currentState[name] = entry;

                dataCache = currentState;
                Y.Cookie.set(id, JSON.stringify(currentState));
            }
        },

        contains: function (name, data) {
            var entry = this.get(name) || [];
            return (entry.indexOf(data) != -1);
        },

        wasRemembered: function (realEstateId) {
            return this.contains("remembered", realEstateId);
        },

        wasSeen: function (realEstateId) {
            return this.contains("seen", realEstateId);
        },

        getAll: function () {
            var data = dataCache || JSON.parse(Y.Cookie.get(id)) || {};
            dataCache = data;
            return data;
        },

        get: function (name) {
            var data = dataCache || JSON.parse(Y.Cookie.get(id)) || {};
            dataCache = data;
            return data[name];
        }
    };

}, '0.0.1', { requires: ["cookie", "array-extras"] });