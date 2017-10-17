function popnotify(figureSrc, figureCaption, figureImageAlt, lifespan) {
    figureSrc       = figureSrc || void 0;
    figureCaption   = figureCaption || "No caption";
    figureImageAlt  = figureImageAlt || figureCaption || void 0;
    lifespan        = lifespan || 1000;
    
    function postAjaxCall() {
        var popnotifyContainer  = $("#popnotify-container"),
            popnotifyImage      = $("#popnotify-image"),
            popnotifyCaption    = $("#popnotify-caption");
        
        popnotifyImage.attr("src", figureSrc);
        popnotifyImage.attr("alt", figureImageAlt);
        popnotifyCaption.text(figureCaption);
        popnotifyContainer.css("display", "block");
        
        setTimeout(function () {
            popnotifyContainer.fadeOut(500);
            setTimeout(function () {
                popnotifyContainer.remove();
            }, 500);
        }, lifespan);
    }

    $.ajax({
        async: false,
        url: '_includes/popnotify.php',
        success: function (html) {
            if ($("#popnotify-container").css("display") === "block") {
                $("#popnotify-container").remove();
            }
            $("body").prepend(html);
            postAjaxCall();
        }
    });
}