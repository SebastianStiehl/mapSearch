YUI.add("is24-list", function (Y) {
    "use strict";
    
    var containerNode,
        resultListTemplate;

    function attachListener() {
        containerNode.delegate("click", function (event) {
            var link = event.currentTarget,
                remember = false,
                target = event.target,
                realEstateId;

            realEstateId =  link.getData("id");

            Y.is24.highlight.reset();

            if (target.hasClass("remember")) {
                if (!target.hasClass("remembered")) {
                    target.addClass("remembered");
                    Y.is24.remember.id(realEstateId);
                    remember = true;
                } else {
                    target.removeClass("remembered");
                }
            } else {
                Y.is24.doubleClick("is24-list", realEstateId);
            }

            Y.is24.highlight.listing(link);
            Y.fire("highlight:list", {id: realEstateId, remember: remember});

            event.preventDefault();
        }, "a");
        
        Y.on("highlight:marker", function (realEstateId) {
            var listing = containerNode.one("[data-id='" + realEstateId + "']");
            
            if (listing) {
                listing.scrollIntoView({anim: false});
                Y.is24.highlight.listing(listing);
            }
        });
    }
    
    function createHtml(entries) {
        var html = "",
            listEntry = Y.Template.Micro.compile(resultListTemplate);

        Y.Array.each(entries, function (entryModel) {
            html += listEntry(entryModel);
        });
        return html;
    }

    Y.namespace("is24.search");
    Y.is24.list = function (entries) {
        containerNode = Y.one("#resultList");
        resultListTemplate = Y.one("#resultListTemplate").getHTML();

        containerNode.append(createHtml(entries));
        attachListener();
    };

}, '0.0.1', { requires: ["node", "array-extras", "is24-highlight", "is24-doubleClick", "event-custom", "template-micro", "gallery-scrollintoview", "is24-remember"]});
