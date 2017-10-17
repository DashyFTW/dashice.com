$(document).ready(function () {
    var rotation = 0, visible = false;
    
    function openCloseDropdown() {
        //Prevent multiple clicks resulting in an animation queue
        if ($('#dropdown-wrapper').is(':animated')) {
            return false;
        }
        
        //Change status of dropdown
        if (visible === false) {
            visible = true;
            
            if ($(window).width() > 414) {
                $('.player-options').velocity('fadeOut', { duration : 400, display : 'flex'});
            }
            
            $('#dropdown-dismiss').velocity('fadeIn', { duration : 400});
            
            //Disable scrolling
            $('body').css({
                overflow: 'hidden',
                height: '100%'
            });
            
            $('body').get(0).ontouchmove = function (e) {
                e.preventDefault();
            };
        } else {
            visible = false;
            
            if ($(window).width() > 414) {
                $('.player-options').velocity('fadeIn', { duration : 400, display : 'flex'});
            }
            
            $('#dropdown-dismiss').velocity('fadeOut', { duration : 400});
            
            //Enable scrolling
            $('body').css({
                overflow: 'auto',
                height: 'auto'
            });
            
            $('body').get(0).ontouchmove = function (e) {
                return true;
            };
        }
        
        $('#dropdown-wrapper').slideToggle(400);
        
        //Rotate the menu button back and forth
        if (rotation === 0) {
            $('#dropdown-button').rotate({
                animateTo: 90,
                duration: 550
            });
            rotation = 90;
        } else {
            $('#dropdown-button').rotate({
                animateTo: 0,
                duration: 550
            });
            rotation = 0;
        }
    }
    
    $('#header-dropdown-button-wrapper').on('click', function () {
        openCloseDropdown();
        $('#header-dropdown-button-wrapper').blur();
    });
    
    $('.header-flexspace').click(function () {
        if ($(window).scrollTop() === 0) {
            openCloseDropdown();
        }
    });
    
    //Dismiss dropdown menu when pressing outside of dropdown menu
    $('#dropdown-dismiss').click(function () {
        openCloseDropdown();
    }); //End click on dismiss
    
    $('#header-compose-button-wrapper').click(function () {
        if ($('#dropdown-wrapper').css('display') !== 'none') {
            openCloseDropdown();
        }
    });
    
    $(document).on('keydown', function (e) {
        if (e.which === 27) {
            if ($('#dropdown-wrapper').css('display') !== 'none') {
                e.preventDefault();
                openCloseDropdown();
            }
        }
    });
    
    $(window).on('orientationchange', function (event) {
        if ($(window).width() <= 414) {
            $('.player-options').hide();
        } else {
            if ($('#dropdown-dismiss').css('display') !== 'none') {
                $('.player-options').hide();
            } else {
                $('.player-options').show();
            }
        }
    });
}); //End ready