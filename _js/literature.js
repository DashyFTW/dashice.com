/*globals $:false*/
$(document).ready(function () {
//Declarations
    var globalBody                      = $("body"),
    
        headerWrapper                   = $("#header-wrapper"),
        
        contactWrapper                  = $("#contact-wrapper"),
        contactStates                   = {
            CLOSED  : 0,
            OPEN    : 1
        },
        contactState                    = contactStates.CLOSED,
        
        globalContent                   = $("#content"),
    
        literatureMain                  = $("main"),
        literatureArticle               = $("article"),
        literatureTitle                 = $(".title"),
        literatureAdultButton           = $(".adult-button"),
        literatureFeaturedButton        = $(".featured-button"),
        literatureTagWrapper            = $(".tag-wrapper"),
        literatureFormButton            = $(".form-tag"),
        literatureCategoryButton        = $(".category-tag"),
        literatureSelectedButton        = $(".selected-tag"),
        literatureReadButton            = $(".read-button"),
        literatureText                  = $(".text-paragraph"),
        
        literatureArticleCount          = literatureArticle.length,
        
        literatureFilterWrapper         = $("#filter-bar-wrapper"),
        literatureFilterItemsWrapper    = $("#filter-bar-items-wrapper"),
        literatureFilterClearButton     = $("#filter-bar-clear-button"),
        literatureFilterItem            = $(".filter-bar-item"),
        literatureFilterItemLabel       = $(".filter-bar-item-label"),
        literatureFilterlistSortButton  = $('#literature-sort-button'),
        literatureFilterlist            = $('#literature-filterlist'),
        
        literatureFilterWrapperStates   = {
            HIDDEN      : 0,
            VISIBLE     : 1
        },
        literatureFilterWrapperState    = literatureFilterWrapperStates.HIDDEN,
        literatureFilterItemsCount      = 0,
        literatureFilterItemID          = 0,
        literatureFilterItemsArray      = [],
        
        literatureReaderWrapper         = $("#reader-wrapper"),
        literatureReaderToolbar         = $("#reader-toolbar-wrapper"),
        literatureReaderHeader          = $("#reader-header"),
        literatureReaderHeading         = $("#reader-heading"),
        literatureReaderHeadingFSize    = parseFloat($("#reader-heading").css("font-size")),
        literatureReaderHeadingFSizeEm  = parseFloat($(literatureReaderHeadingFSize).toEm()),
        literatureReaderMain            = $("#reader-main"),
        literatureReaderBody            = $("#reader-body"),
        literatureReaderBgColor         = "255, 255, 255",
        literatureReaderBdColor         = "200, 200, 200",
        
        literatureReaderPrevButton      = $("#toolbar-prev"),
        literatureReaderNextButton      = $("#toolbar-next"),
        literatureReaderLightButton     = $("#toolbar-light"),
        literatureReaderDarkButton      = $("#toolbar-dark"),
        literatureReaderSepiaButton     = $("#toolbar-sepia"),
        literatureReaderSmallerButton   = $("#toolbar-smaller"),
        literatureReaderLargerButton    = $("#toolbar-larger"),
        literatureReaderPrintButton     = $("#toolbar-print"),
        literatureReaderCloseButton     = $("#toolbar-close"),
        
        stringToClassRegex              = new RegExp(/[\s&!?"']/g),
        persistentScrollPosition        = 0,
        distanceFromTop                 = 0,
        navigationIndex                 = null,
        articleArray                    = [];
    
//Functions
    function readerColorMode() {
        function updateReaderTopColor() {
            literatureReaderToolbar.css({
                'backgroundColor' : "rgba(" + literatureReaderBgColor + ", " + distanceFromTop / 5 + ")"
            });

            literatureReaderHeader.css({
                'backgroundColor' : "rgba(" + literatureReaderBgColor + ", " + distanceFromTop / 5 + ")",
                'borderBottom' : "0.1em solid rgba(" + literatureReaderBdColor + ", " + distanceFromTop / 5 + ")"
            });
        }
        
        if (document.cookie.indexOf("reader-light") >= 0) {
            literatureReaderLightButton.attr("disabled", "true");
            literatureReaderDarkButton.removeAttr("disabled");
            literatureReaderSepiaButton.removeAttr("disabled");
            
            $("#reader-dark, #reader-sepia").remove();
            literatureReaderBgColor = "255, 255, 255";
            literatureReaderBdColor = "200, 200, 200";
            
            updateReaderTopColor();
            return;
        } else if (document.cookie.indexOf("reader-sepia") >= 0) {
            literatureReaderLightButton.removeAttr("disabled");
            literatureReaderDarkButton.removeAttr("disabled");
            literatureReaderSepiaButton.attr("disabled", "true");
            
            $("#reader-dark").remove();
            globalBody.append('<link rel="stylesheet" href="_css/_includes/_literature/readersepia.css" type="text/css" id="reader-sepia"/>');
            literatureReaderBgColor = "247, 238, 218";
            literatureReaderBdColor = "165, 155, 147";
            
            updateReaderTopColor();
            return;
        } else if ((document.cookie.indexOf("nightmode") >= 0) || (document.cookie.indexOf("reader-dark") >= 0)) {
            literatureReaderLightButton.removeAttr("disabled");
            literatureReaderDarkButton.attr("disabled", "true");
            literatureReaderSepiaButton.removeAttr("disabled");
            
            globalBody.append('<link rel="stylesheet" href="_css/_includes/_nightmode/_literature/reader.css" type="text/css" id="reader-dark"/>');
            literatureReaderBgColor = "34, 34, 34";
            literatureReaderBdColor = "120, 120, 120";
            
            updateReaderTopColor();
        } else {
            createCookie("reader-light", "reader-light", 14);
            readerColorMode();
        }
    }
    
    function enterReaderMode() {
        readerColorMode();
        persistentScrollPosition = $(window).scrollTop();
        
        if (readCookie("readerLargeText")) {
            literatureReaderLargerButton.click();
        } else {
            literatureReaderSmallerButton.click();
        }
        
        if (contactWrapper.css("display") !== "none") {
            contactState = contactStates.OPEN;
            headerWrapper.animate({ 'opacity': '0', 'top': '-4.25em'}, 500);
        } else {
            contactState = contactStates.CLOSED;
            headerWrapper.animate({ 'opacity': '0', 'top': '-3em'}, 500);
        }
        contactWrapper.animate({ 'opacity': '0', 'top': '-1.75em'}, 500);
        literatureFilterWrapper.animate({ 'opacity': '0', 'bottom': '-3em'}, 500);
        globalBody.addClass("body-reader-bgcolor");
        globalContent.fadeOut(500);
        
        setTimeout(function () {
            headerWrapper.hide();
            contactWrapper.hide();
            
            literatureReaderWrapper.fadeIn(250);
            globalBody.addClass("body-reader-transition");
            globalBody.scrollTop(100);
            globalBody.animate({ 'scrollTop' : 0}, 500);
        }, 500);
    }
    
    function exitReaderMode() {
        headerWrapper.show();
        
        if (contactState === contactStates.OPEN) {
            contactWrapper.show();
        }
        
        literatureReaderWrapper.fadeOut(250);
        globalBody.removeClass("body-reader-bgcolor");
        
        headerWrapper.animate({ 'opacity': '1', 'top': '0em'}, 500);
        contactWrapper.animate({ 'opacity': '1', 'top': '2.5em'}, 500);
        if ($(document).width() > 490) {
            literatureFilterWrapper.animate({ 'opacity': '1', 'bottom': '1em'}, 500);
        } else {
            literatureFilterWrapper.animate({ 'opacity': '1', 'bottom': '0em'}, 500);
        }
        
        setTimeout(function () {
            $("#reader-light, #reader-dark, #reader-sepia").remove();
            globalContent.fadeIn(250);
            globalBody.removeClass("body-reader-transition");
            $("html, body").scrollTop(persistentScrollPosition);
        }, 250);
    }
    
    function showFilterWrapper() {
        if (literatureFilterItemsCount === 0) {
            literatureMain.css("margin-bottom", "+3.25em");
            
            literatureFilterWrapper.fadeIn(200);
            literatureFilterWrapper.css("display", "flex");
            literatureFilterWrapperState = literatureFilterWrapperStates.VISIBLE;
            
            literatureFilterlistSortButton.hide();
            if (literatureFilterlistSortButton.hasClass('selected')) {
                literatureFilterlist.hide();
            }
        }
    }
    
    function hideFilterWrapper() {
        if (literatureFilterItemsCount === 0) {
            literatureMain.css("margin-bottom", "-3.25em");
            
            literatureFilterWrapper.fadeOut(200);
            literatureFilterWrapperState = literatureFilterWrapperStates.HIDDEN;
            
            literatureFilterlistSortButton.show();
            if (literatureFilterlistSortButton.hasClass('selected')) {
                literatureFilterlistSortButton.removeClass('selected');
            }
        }
    }
    
    function updateArticleVisibility() {
        var visibleWorks = 0;
        
        literatureArticle.each(function () {
            var matchCounter = 0;
            
            $(this).find(literatureAdultButton).each(function (tagIndex, input) {
                literatureFilterItemsArray.forEach(function (item, arrayIndex) {
                    if ($(input).val() === item) {
                        matchCounter += 1;
                    }
                });
            });
            
            $(this).find(literatureFeaturedButton).each(function (tagIndex, input) {
                literatureFilterItemsArray.forEach(function (item, arrayIndex) {
                    if ($(input).val() === item) {
                        matchCounter += 1;
                    }
                });
            });
            
            $(this).find(literatureFormButton).each(function (tagIndex, input) {
                literatureFilterItemsArray.forEach(function (item, arrayIndex) {
                    if ($(input).val() === item) {
                        matchCounter += 1;
                    }
                });
            });
            
            $(this).find(literatureCategoryButton).each(function (tagIndex, input) {
                literatureFilterItemsArray.forEach(function (item, arrayIndex) {
                    if ($(input).val() === item) {
                        matchCounter += 1;
                    }
                });
            });
            
            if (literatureFilterItemsCount !== matchCounter) {
                $(this).addClass("filtered-article");
            } else {
                $(this).removeClass("filtered-article");
            }
        });
        
        literatureArticle.each(function () {
            if ($(this).css("display") !== "none") {
                visibleWorks = visibleWorks + 1;
            }
        });
        
        if (visibleWorks > 1) {
            visibleWorks = visibleWorks + " Works";
        } else {
            visibleWorks = visibleWorks + " Work";
        }
        
        switch (literatureFilterItemsCount) {
        case 0:
            popnotify("_images/_popnotify/popnotify-filter-clear.png", "Showing All Works");
            break;
        case 1:
            popnotify("_images/_popnotify/popnotify-filter-single.png", "Showing " + visibleWorks);
            break;
        default:
            popnotify("_images/_popnotify/popnotify-filter-multiple.png", "Showing " + visibleWorks);
        }
    }
    
    function addTagToFilterWrapper(tag, tagType) {
        var tagClass;
        tagClass = tag.replace(stringToClassRegex, '');
        
        if (!literatureFilterItemsArray.includes(tag)) {
            $("." + tagType + "-value-" + tagClass).css("color", "crimson");
            $("." + tagType + "-value-" + tagClass).attr("disabled", "true");
            
            literatureFilterItemsWrapper.prepend("<div class='filter-bar-item filter-value-" + tagClass + "'><input type='button' class='filter-bar-item-label' value='" + tag + "' data-tagType='" + tagType + "'></div>");
            literatureFilterItemsCount += 1;
            literatureFilterItemsArray.push(tag);
            
            updateArticleVisibility();
        }
    }

    function removeTagFromFilterWrapper(filterItem, filterItemClass, tagType) {
        literatureFilterItemsArray.forEach(function (item, index) {
            if (item === filterItem) {
                $("." + tagType + "-value-" + filterItemClass).css("color", "rgb(120, 120, 120)");
                $("." + tagType + "-value-" + filterItemClass).removeAttr("disabled");
                literatureFilterItemsArray.splice(index, 1);
                literatureFilterItemsCount -= 1;
                
                updateArticleVisibility();
            }
        });
    }
    
    function removeAllTagsFromFilterWrapper() {
        literatureFilterItemsArray.forEach(function (item, index) {
            var itemClass       = item.replace(stringToClassRegex, ''),
                tagType         = $(".filter-bar-item-label[value='" + item + "']").attr("data-tagType");
            
            $("." + tagType + "-value-" + itemClass).css("color", "rgb(120, 120, 120)");
            $("." + tagType + "-value-" + itemClass).removeAttr("disabled");
            literatureFilterItemsArray = [];
            literatureFilterItemsCount = 0;
        });
        
        updateArticleVisibility();
    }
    
    //Reader Functions
    function determineNavigationButtonStates() {
        if (navigationIndex === 0) {
            literatureReaderPrevButton.attr("disabled", "true");
        } else {
            literatureReaderPrevButton.removeAttr("disabled");
        }

        if (navigationIndex === articleArray.length - 1) {
            literatureReaderNextButton.attr("disabled", "true");
        } else {
            literatureReaderNextButton.removeAttr("disabled");
        }
        
        if (navigationIndex === null) {
            literatureReaderPrevButton.removeAttr("disabled");
            literatureReaderNextButton.removeAttr("disabled");
        }
    }
    
    function switchArticle(forward) {
        function transitionArticle() {
            if (forward) {
                literatureReaderHeading.animate({
                    'left' : "-0.4em",
                    'opacity' : 0
                }, 400);
                literatureReaderBody.animate({
                    'left' : "-0.5em",
                    'opacity' : 0
                }, 400);
            } else {
                literatureReaderHeading.animate({
                    'left' : "0.4em",
                    'opacity' : 0
                }, 400);
                literatureReaderBody.animate({
                    'left' : "0.5em",
                    'opacity' : 0
                }, 400);
            }
            
            setTimeout(function () {
                literatureReaderHeading.text(articleArray[navigationIndex][0]);
                literatureReaderBody.html(articleArray[navigationIndex][1]);
                
                if (forward) {
                    literatureReaderHeading.css("left", "0.4em");
                    literatureReaderHeading.animate({
                        'left' : "0em",
                        'opacity' : 1
                    }, 250);
                    literatureReaderBody.css("left", "0.5em");
                    literatureReaderBody.animate({
                        'left' : "0em",
                        'opacity' : 1
                    }, 250);
                } else {
                    literatureReaderHeading.css("left", "-0.4em");
                    literatureReaderHeading.animate({
                        'left' : "0em",
                        'opacity' : 1
                    }, 250);
                    literatureReaderBody.css("left", "-0.5em");
                    literatureReaderBody.animate({
                        'left' : "0em",
                        'opacity' : 1
                    }, 250);
                }
            }, 500);
        }
        
        if ($(document).scrollTop() > 0) {
            $('html, body').animate({ 'scrollTop' : 0}, 500);
            
            setTimeout(function () {
                transitionArticle();
            }, 550);
        } else {
            transitionArticle();
        }
    }
    
    function loadReaderContents() {
        var title   = $(this).closest("article").find(".title").val(),
            text    = $(this).closest("article").find(".text-paragraph").html();
        
        literatureArticle.not(".filtered-article").each(function (index) {
            var currentArticleValuePairs = [
                $(this).find(".title").val(),
                $(this).find(".text-paragraph").html()
            ];

            articleArray.push(currentArticleValuePairs);

            if (title === $(this).find(".title").val()) {
                navigationIndex = index;

                literatureReaderHeading.text(articleArray[navigationIndex][0]);
                literatureReaderBody.html(articleArray[navigationIndex][1]);
            }
        });
        
        determineNavigationButtonStates();
    }
    
    function unloadReaderContents() {
        literatureReaderHeading.text("");
        literatureReaderBody.html("");
        articleArray = [];
        navigationIndex = null;
    }
    
    function changeReaderTextSize(enlarge) {
        //Passed argument is in bool, true makes the text bigger.
        
        if (enlarge) {
            literatureReaderMain.css({
                'paddingLeft' : "4em",
                'paddingRight' : "4em"
            });
            
            literatureReaderBody.css({
                'fontSize' : "1.25em",
                'marginTop' : "8.35em"
            });
            
            $(".biggest").css("fontSize", "1.65em");
            
            $(".bigger").css("fontSize", "1.45em");
            
            $(".smaller").css("fontSize", "1.05em");
            
            $(".smallest").css("fontSize", "0.85em");
        } else {
            literatureReaderMain.css({
                'paddingLeft' : "1em",
                'paddingRight' : "1em"
            });
            
            literatureReaderBody.css({
                'fontSize' : "1em",
                'marginTop' : "10.5em"
            });
            
            $(".biggest").css("fontSize", "1.4em");
            
            $(".bigger").css("fontSize", "1.2em");
            
            $(".smaller").css("fontSize", "0.8em");
            
            $(".smallest").css("fontSize", "1.6em");
        }
    }

//Events
    literatureTitle.click(function () {
        loadReaderContents.apply(this);
        enterReaderMode();
    });
    
    literatureReadButton.click(function () {
        loadReaderContents.apply(this);
        enterReaderMode();
    });
    
    literatureFeaturedButton.click(function () {
        showFilterWrapper();
        addTagToFilterWrapper("featured");
    });
    
    literatureAdultButton.click(function () {
        showFilterWrapper();
        addTagToFilterWrapper("mature");
    });
    
    literatureFormButton.click(function () {
        var pressedTag, tagType;
        tagType = "form";
        pressedTag = $(this).val();
        
        showFilterWrapper();
        addTagToFilterWrapper(pressedTag, tagType);
        $("html, body").scrollTop($(this).offset().top);
    });
    
    literatureCategoryButton.click(function () {
        var pressedTag, tagType;
        tagType = "category";
        pressedTag = $(this).val();
        
        showFilterWrapper();
        addTagToFilterWrapper(pressedTag, tagType);
    });
    
    literatureFilterlistSortButton.click(function () {
        if (!$(this).hasClass('selected')) {
            $(this).addClass('selected');
            literatureFilterlist.css('display', 'flex');
        } else {
            $(this).removeClass('selected');
            literatureFilterlist.hide();
        }
    });
    
    literatureFilterItemsWrapper.on("click", ".filter-bar-item-label", function () {
        var pressedFilterItem, pressedFilterItemClass, tagType;
        pressedFilterItem = $(this).val();
        pressedFilterItemClass = pressedFilterItem.replace(stringToClassRegex, '');
        tagType = $(this).attr("data-tagType");
        
        removeTagFromFilterWrapper(pressedFilterItem, pressedFilterItemClass, tagType);
        $(this).parent().remove();
        hideFilterWrapper();
    });
    
    literatureFilterClearButton.click(function () {
        removeAllTagsFromFilterWrapper();
        literatureFilterItemsWrapper.text('');
        hideFilterWrapper();
    });
    
    $(document).resize(function () {
        if ($(document).width() > 490) {
            literatureMain.css("marginBottom", "3.25em");
            literatureFilterWrapper.css("bottom", "1em");
        } else {
            literatureMain.css("marginBottom", "2.25em");
            literatureFilterWrapper.css("bottom", "0em");
        }
    });
    
    //Reader Events
    literatureReaderPrevButton.click(function () {
        if (globalBody.is("animated") || literatureReaderHeading.css("opacity") < 1) {
            return false;
        }
        
        navigationIndex = navigationIndex - 1;
        determineNavigationButtonStates();
        switchArticle(false);
    });
    
    literatureReaderNextButton.click(function () {
        if (globalBody.is("animated") || literatureReaderHeading.css("opacity") < 1) {
            return false;
        }
        
        navigationIndex = navigationIndex + 1;
        determineNavigationButtonStates();
        switchArticle(true);
    });
    
    literatureReaderLightButton.click(function () {
        createCookie("reader-light", "reader-light", 14);
        deleteCookie("reader-dark");
        deleteCookie("reader-sepia");
        
        readerColorMode();
    });
    
    literatureReaderDarkButton.click(function () {
        createCookie("reader-dark", "reader-dark", 14);
        deleteCookie("reader-light");
        deleteCookie("reader-sepia");
        
        readerColorMode();
    });
    
    literatureReaderSepiaButton.click(function () {
        createCookie("reader-sepia", "reader-sepia", 14);
        deleteCookie("reader-light");
        deleteCookie("reader-dark");
        
        readerColorMode();
    });
    
    literatureReaderSmallerButton.click(function () {
        changeReaderTextSize(false);
        literatureReaderSmallerButton.attr("disabled", "true");
        literatureReaderLargerButton.removeAttr("disabled");
        deleteCookie("readerLargeText");
    });
    
    literatureReaderLargerButton.click(function () {
        changeReaderTextSize(true);
        literatureReaderSmallerButton.removeAttr("disabled");
        literatureReaderLargerButton.attr("disabled", "true");
        createCookie("readerLargeText", true, 14);
    });
    
    literatureReaderPrintButton.click(function () {
        window.print();
    });
    
    literatureReaderCloseButton.click(function () {
        exitReaderMode();
        setTimeout(function () {
            unloadReaderContents();
        }, 250);
    });
    
    $(document).scroll($.throttle(16, function () {
        if (literatureReaderWrapper.css("display") !== "none") {
            var currentMargin       = 2.5 / literatureReaderHeadingFSizeEm,
                currentDecay        = 2 * literatureReaderHeadingFSizeEm;

            distanceFromTop = $(window).scrollTop();
            distanceFromTop = parseFloat($(distanceFromTop).toEm()) || 0;
            currentMargin = currentMargin - (distanceFromTop / currentDecay);

            if (distanceFromTop < 5) {
                literatureReaderToolbar.css({
                    'backgroundColor' : "rgba(" + literatureReaderBgColor + ", " + distanceFromTop / 5 + ")"
                });
                
                literatureReaderHeader.css({
                    'backgroundColor' : "rgba(" + literatureReaderBgColor + ", " + distanceFromTop / 5 + ")",
                    'borderBottom' : "0.1em solid rgba(" + literatureReaderBdColor + ", " + distanceFromTop / 5 + ")"
                });
                
                literatureReaderHeading.css({
                    'marginTop' : currentMargin + "em",
                    'marginBottom' : currentMargin + "em"
                });
            } else if (distanceFromTop > 5) {
                literatureReaderToolbar.css({
                    'backgroundColor' : "rgba(" + literatureReaderBgColor + ", 1)"
                });
                
                literatureReaderHeader.css({
                    'backgroundColor' : "rgba(" + literatureReaderBgColor + ", 1)",
                    'borderBottom' : "0.1em solid rgba(" + literatureReaderBdColor + ", 1)"
                });
                
                literatureReaderHeading.css({
                    'marginTop' : "0",
                    'marginBottom' : "0"
                });
            }
        }
    }));

    literatureText.hide();
    literatureTagWrapper.show();
    literatureReadButton.show();
    literatureFilterlistSortButton.css('display', 'flex');
    
    //Preload popnotify images
    preload([
        "_images/_popnotify/popnotify-filter-single.png",
        "_images/_popnotify/popnotify-filter-multiple.png",
        "_images/_popnotify/popnotify-filter-clear.png",
        "_images/_reader/toolbar-back.png",
        "_images/_reader/toolbar-bigtext.png",
        "_images/_reader/toolbar-close.png",
        "_images/_reader/toolbar-darktheme.png",
        "_images/_reader/toolbar-forward.png",
        "_images/_reader/toolbar-lighttheme.png",
        "_images/_reader/toolbar-print.png",
        "_images/_reader/toolbar-sepiatheme.png",
        "_images/_reader/toolbar-smalltext.png"
    ]);
    
}); //End ready