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
            realEstateId =  parseInt(realEstateId, 10);

            Y.is24.highlight.reset();

            if (target.hasClass("remember")) {
                if (!target.hasClass("remembered")) {
                    target.addClass("remembered");
                    Y.is24.state.add("remembered", realEstateId);
                    remember = true;
                } else {
                    target.removeClass("remembered");
                    Y.is24.state.remove("remembered", realEstateId);
                }
            } else {
                Y.is24.doubleClick("is24-list", realEstateId);
            }

            Y.is24.highlight.listing(link);
            Y.fire("highlight:list", realEstateId);

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

    function setRememberedState(entryModel, rememberedIds) {
        entryModel.remembered = (rememberedIds.indexOf(entryModel.realEstateId) !== -1);
    }

    function createHtml(entries) {
        var rememberedIds,
            html = "",
            listEntry = Y.Template.Micro.compile(resultListTemplate);

        rememberedIds = Y.is24.state.get("remembered") || [];

        Y.Array.each(entries, function (entryModel) {
            setRememberedState(entryModel, rememberedIds);
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

}, '0.0.1', { requires: ["node", "array-extras", "is24-highlight", "is24-doubleClick", "event-custom", "template-micro", "gallery-scrollintoview", "is24-state"]});
