YUI.add("is24-state", function (Y) {
    "use strict";

    var id = "userState";

    Y.namespace("is24.search");
    Y.is24.state = {
        add: function (name, data) {
            var entry, currentState = this.getAll() || {};

            entry = currentState[name];

            if (entry) {
                entry.push(data);
            } else {
                currentState[name] = [data];
            }

            Y.Cookie.set(id, JSON.stringify(currentState));
        },

        remove: function (name, data) {
            var entry,
                currentState = this.getAll() || {};

            entry = currentState[name];


            if (entry) {
                entry = Y.Array.filter(entry, function (el) {
                    return el !== data;
                });

                currentState[name] = entry;

                Y.Cookie.set(id, JSON.stringify(currentState));
            }
        },

        contains: function (name, data) {
            var entry = this.get(name) || [];
            return (entry.indexOf(data) != -1);
        },

        getAll: function () {
            return JSON.parse(Y.Cookie.get(id)) || {};
        },

        get: function (name) {
            var data = JSON.parse(Y.Cookie.get(id)) || {};
            return data[name];
        }
    };

}, '0.0.1', { requires: ["cookie", "array-extras"] });