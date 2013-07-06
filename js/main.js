var IS24 = {};

YUI().use([
    "is24-search", "is24-list", "is24-markers", "is24-remember", "is24-map", "is24-markerManager"
], function (Y) {
    Y.is24.search(function (model) {
        var entries = model["resultlist.resultlist"].resultlistEntries[0].resultlistEntry;

        //the api returns a single object instead of an array if only there is only one hit. damn :*( fufufufu
        if (!entries.length && entries.realEstateId) {
            entries = [entries];
        }

        Y.is24.list(entries);
        Y.is24.map.create(entries);
        Y.is24.markerManager.create(Y.is24.markers(entries));
        Y.is24.remember.init();
    });

});