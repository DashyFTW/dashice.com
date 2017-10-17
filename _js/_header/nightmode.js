
///////////////////////////////////////////////////////
//JUST FUNCTIONS
function createCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function deleteCookie(name) {
    createCookie(name, "", -1);
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
//Pre-document.ready
//Use page title to define alternative css file
var fileName = document.title.substring(document.title.lastIndexOf(' ') + 1).toLowerCase();

//Check for cookie's existence
if (document.cookie.indexOf("nightmode") >= 0) {
    $isEnabled = true;

    $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/header.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/subheader.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/headercontact.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/popnotify.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="_css/_nightmode/' + fileName + '.css" type="text/css" />');
} else {
    $isEnabled = false;
}
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
//document.ready
$(document).ready(function () {
    $('#header-nightmode-button-wrapper').click(function () {
        if ($isEnabled === true) {
            $isEnabled = false;

            //Delete previously set cookie
            deleteCookie('nightmode');
            //Delete previously set stylesheets
            $('link[rel="stylesheet"][href~="_css/_includes/_nightmode/header.css"]').remove();
            $('link[rel="stylesheet"][href~="_css/_includes/_nightmode/subheader.css"]').remove();
            $('link[rel="stylesheet"][href~="_css/_includes/_nightmode/headercontact.css"]').remove();
            $('link[rel="stylesheet"][href~="_css/_includes/_nightmode/popnotify.css"]').remove();
            $('link[rel="stylesheet"][href~="_css/_nightmode/' + fileName + '.css"]').remove();
            popnotify("_images/_popnotify/popnotify-nightmode.png", "Nightmode Disabled");
        } else {
            $isEnabled = true;

            //Set cookie
            createCookie('nightmode', 'nightmode', 30);

            //Add appropriate stylesheets
            $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/header.css" type="text/css" />');
            $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/subheader.css" type="text/css" />');
            $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/headercontact.css" type="text/css" />');
            $('head').append('<link rel="stylesheet" href="_css/_includes/_nightmode/popnotify.css" type="text/css" />');
            $('head').append('<link rel="stylesheet" href="_css/_nightmode/' + fileName + '.css" type="text/css" />');
            popnotify("_images/_popnotify/popnotify-nightmode.png", "Nightmode Enabled");
        }
        $('#header-nightmode-button-wrapper').blur();
    }); //End click
}); //End ready
///////////////////////////////////////////////////////