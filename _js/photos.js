$(document).ready(function () {
    
//Declarations
    
    var photosImageFrame                = $(".image-frame"),
        photosImageFrameImage           = $(".image-frame-image"),
        photosImageFrameOGImage         = $(".image-frame-og-image"),
        photosMoreinfoContainer         = $(".image-moreinfo-container"),
        photosMoreinfoButtonWrapper     = $(".moreinfo-button-wrapper"),
        photosMoreinfoButton            = $(".moreinfo-button"),
        photosMoreinfoTextWrapper       = $(".moreinfo-text-wrapper"),
        photosOGNavButton               = $('.og-nav-button'),
        photosOGButton                  = $(".photos-og-button");
        
        
//Functions
    
    function toggleTextWrapper() {
        if (photosMoreinfoTextWrapper.is(':animated')) {
            return false;
        }
        
        if ($(this).css("background-image").indexOf("_images/info-button.png") >= 0) {
            $(this).css("background-image", "url(_images/info-button-close.png)");
            $(this).parent().find(photosMoreinfoTextWrapper).css("opacity", "0").slideDown(350).animate({ opacity : 1 }, { queue : false }, 500);

        } else {
            $(this).css("background-image", "url(_images/info-button.png)");
            $(this).parent().find(photosMoreinfoTextWrapper).slideUp(350).animate({ opacity : 0 }, { queue : false }, 500);
        }
    }
    
    function switchImages(bool) {
        var image = $(this).closest(photosImageFrame).find('.image-frame-image'),
            imageOG = $(this).closest(photosImageFrame).find('.image-frame-og-image');
        
        if (bool === true) {
            $(image).css('opacity', 0);
            $(imageOG).css('opacity', 1);
        } else {
            $(image).css('opacity', 1);
            $(imageOG).css('opacity', 0);
        }
    }
    
//Events
    
    photosMoreinfoButtonWrapper.click(function () {
        toggleTextWrapper.apply(this);
    });
    
    photosOGButton.click(function (e) {
        var next = $(this).closest(photosMoreinfoContainer).find('.next-button'),
            prev = $(this).closest(photosMoreinfoContainer).find('.prev-button');
        
        e.preventDefault();
        if ($(this).hasClass('selected')) {
            next.show();
            prev.hide();
            $(this).removeClass('selected');
            $(this).text('Unaltered');
            switchImages.apply(this, [false]);
        } else {
            next.hide();
            prev.show();
            $(this).addClass('selected');
            $(this).text('Altered');
            switchImages.apply(this, [true]);
        }
        $(this).blur();
    });
    
    photosOGNavButton.click(function () {
        var next = $(this).closest(photosMoreinfoContainer).find('.next-button'),
            prev = $(this).closest(photosMoreinfoContainer).find('.prev-button');
        $(this).closest(photosMoreinfoContainer).find(photosOGButton).click();
        
        if ($(this).hasClass('prev-button')) {
            prev.hide();
            next.show();
        } else {
            prev.show();
            next.hide();
        }
    });
    
    photosMoreinfoButtonWrapper.show();
    photosMoreinfoTextWrapper.css("margin-top", "0");
    photosMoreinfoTextWrapper.hide();
    
    photosImageFrameImage.Lazy();
    photosImageFrameOGImage.Lazy();
    
    //Preload images
    preload([
        "_images/prev-picture.png",
        "_images/info-button-close.png"
    ]);
    
}); //End ready