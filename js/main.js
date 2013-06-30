YUI().use(["node", "array-extras", "gallery-scrollintoview", "anim"], function (Y) {
    var map,
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
        var id = listEntry.get("id");
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

    function highlight(marker, listEntry) {
        marker.setIcon("img/houseL.png");
        listEntry.addClass("highlight");
    }

    function rememberActuallyHighlight(marker, listEntry) {
        lastMarker = marker;
        lastListEntry = listEntry;
    }

    function handleHighlighting(marker, listEntry) {
        return function (event) {
            listEntry.scrollIntoView({anim: false});
            resetHighlighting();
            highlight(marker, listEntry);
            rememberActuallyHighlight(marker, listEntry);
            event.preventDefault();
        };
    }

    function getMarkers() {
        var batch = [], modelEntry;

        resultList.all("> li").each(function (listEntry) {
            var marker;

            modelEntry = getEntryFrom(window.model, getId(listEntry));

            if (modelEntry) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(modelEntry.lat, modelEntry.lng),
                    icon: createIcon(),
                    title: modelEntry.id.toString()
                });

                google.maps.event.addListener(marker, "click", handleHighlighting(marker, listEntry));
                listEntry.on("click", handleHighlighting(marker, listEntry));

                batch.push(marker);
            }
        });

        return batch;
    }


    map = new google.maps.Map(Y.one("#map").getDOMNode(), {
        zoom: 15,
        center: new google.maps.LatLng(52.524220046211134, 13.411027828464853),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        }
    });

    var markerManager = new MarkerManager(map);


    google.maps.event.addListener(markerManager, 'loaded', function () {
        markerManager.addMarkers(getMarkers(), 13);
        markerManager.refresh();
    });

});