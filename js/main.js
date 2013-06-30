YUI().use(["node", "array-extras", "gallery-scrollintoview", "anim"], function (Y) {
    var map,
        markerManager,
        lastListEntry = null,
        lastMarker = null,
        resultList = Y.one("#resultList");

    function createIcon() {
        return new google.maps.MarkerImage('img/house.png');
    }

    function getEntryFrom(model, id) {
        return Y.Array.find(model, function (el) {
            return el.id === id;
        });
    }

    function getId(listEntry) {
        var id = listEntry.getData("id");
        return parseInt(id, 10);
    }

    function resetHighlighting() {
        if (lastMarker) {
            lastMarker.setIcon("img/house.png");
        }

        if (lastListEntry) {
            lastListEntry.removeClass("highlight");
        }
    }

    function highlight(listEntry) {
        listEntry.getData("marker").setIcon("img/houseL.png");
        listEntry.addClass("highlight");
    }

    function rememberActuallyHighlight(listEntry) {
        lastMarker = listEntry.getData("marker");
        lastListEntry = listEntry;
    }

    function handleHighlighting(entry) {
        return function () {
            entry.scrollIntoView({anim: true});
            resetHighlighting();
            highlight(entry);
            rememberActuallyHighlight(entry);
        };
    }

    function createMarkers() {
        var batch = [], modelEntry, listEntries;

        listEntries = resultList.all("li > a");
        listEntries.each(function (listEntry) {
            var marker;

            modelEntry = getEntryFrom(window.model, getId(listEntry));

            if (modelEntry) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(modelEntry.lat, modelEntry.lng),
                    icon: createIcon(),
                    title: modelEntry.id.toString()
                });

                listEntry.setData("marker", marker);
                google.maps.event.addListener(marker, "click", handleHighlighting(listEntry));

                batch.push(marker);
            }
        });

        return batch;
    }

    function attachListener() {
        resultList.delegate("click", function (event) {
            var link = event.currentTarget,
                markerPosition;

            markerPosition = link.getData("marker").getPosition();

            if (!map.getBounds().contains(markerPosition)) {
                map.setCenter(markerPosition);
            }

            resetHighlighting();
            highlight(link);
            rememberActuallyHighlight(link);

            event.preventDefault();
        }, "a");
    }


    function createMap() {
        map = new google.maps.Map(Y.one("#map").getDOMNode(), {
            zoom: 15,
            center: new google.maps.LatLng(52.524220046211134, 13.411027828464853),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            }
        });
    }

    function createMarkerManager(markers) {
        markerManager = new MarkerManager(map);
        google.maps.event.addListener(markerManager, 'loaded', function () {
            markerManager.addMarkers(markers, 12);
            markerManager.refresh();
        });
    }


    attachListener();
    createMap();
    createMarkerManager(createMarkers());
});