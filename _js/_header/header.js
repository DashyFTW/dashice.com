function preload(sources) {
    var images = [];
    for (i = 0, length = sources.length; i < length; i = i + 1) {
        images[i] = new Image();
        images[i].src = sources[i];
    }
}

$(document).ready(function () {
    //Remove no_js classes
    $('#dropdown-wrapper, #dropdown-button-wrapper').removeClass('no_js-dropdown-display');
    
    //Show/Hide Javascript elements
    $('#dropdown-wrapper').hide();
    $('#dropdown-audio-button-wrapper').show();
    $('#header-compose-button-wrapper').show();
    $('#header-nightmode-button-wrapper').show();
    $('#header-logo-wrapper').css("margin-right", "0");
    $(".dropdown-contact-slot").hide();
    
    //Initialization
    var width = window.innerWidth,
        height = window.innerHeight;
    //sizeSniffer(height, width);
    
    //Go to top of page when clicked on flexspace in the header
    $(".header-flexspace").click(function () {
        if ($(window).scrollTop() !== 0) {
            if (($('#dropdown-dismiss').css("display") === "none") && ($("#contact-dismiss").css("display") === "none")) {
                $("html, body").animate({ scrollTop: 0 }, { easing : 'linear'}, 500);
                popnotify("_images/_popnotify/popnotify-totop.png", "Back to Top", void 0, 650);
            }
        }
    }); //End click on header
    
    //Fixes IE and Edge clicks not working
    $('.dropdown-button-wrapper').click(function () {
        $(this).find('input').get(0).click();
    });
    
    //Preload popnotify images
    preload([
        "_images/_popnotify/popnotify-email-sent.png",
        "_images/_popnotify/popnotify-nightmode.png",
        "_images/_popnotify/popnotify-totop.png"
    ]);
}); //End ready