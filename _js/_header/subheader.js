$(document).ready(function () {
    $('#heart').click(function () {
        event.preventDefault();
        $('#featured-button').click();
    });
    
    //Allows touch devices to dismiss #older on tap
    $('#wrapper').click(function () {
        $('#older').blur();
    });
});