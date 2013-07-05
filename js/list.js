YUI.add("is24-list", function (Y) {
    "use strict";
    
    var containerNode, 
        map;

    function attachListener() {
        containerNode.delegate("click", function (event) {
            var link = event.currentTarget, realEstateId;

            realEstateId =  link.getData("id");
            Y.is24.doubleClick("is24-list", realEstateId);
            Y.is24.highlight.reset();
            Y.is24.highlight.listing(link);
            Y.fire("highlight:marker", realEstateId);

            event.preventDefault();
        }, "a");
        
        Y.on("highlight:list", function (realEstateId) {
            var listing = containerNode.one("[data-id='" + realEstateId + "']");
            
            if (listing) {
                listing.scrollIntoView({anim: true});
                Y.is24.highlight.listing(listing);
            }
        });
    }

    
    function createHtml(entries) {
        var html = "";
        Y.Array.each(entries, function (entry) {
            html += '<li><a href="#" data-id="' + entry.realEstateId + '">' + entry.realEstateId + '</a></li>';
        });
        return html;
    }

    Y.namespace("is24.search");
    Y.is24.list = function (entries, container, gmap) {
        map = gmap;
        containerNode = container;
        containerNode.append(createHtml(entries));
        attachListener();
    };

}, '0.0.1', { requires: ["array-extras", "is24-highlight", "is24-doubleClick", "event-custom"]});
