YUI.add("is24-remember", function (Y) {
    "use strict";

    Y.namespace("is24.search");
    Y.is24.remember = {
        init: function () {
            var rememberButtons = Y.all(".remember");

            rememberButtons.on("click", function (event) {

            });

            rememberButtons.each(function (el) {

            });
        },
        id: function (id) {
            Y.Cookie.set("remember", id);
        }

    };

}, '0.0.1', { requires: ["node", "event", "cookie"] });