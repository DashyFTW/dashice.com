<div id="header-wrapper">
    <button id="header-dropdown-button-wrapper" class="header-corner-buttons" tabindex="1">
        <img src="_images/_header/dropdown-button.png" id="dropdown-button" class="unselectable">
    </button>

    <button id="header-unused-button-wrapper" class="header-corner-buttons" tabindex="-1">
        <!--Unused-->
    </button>

    <div class="header-flexspace"></div>

    <div id="header-logo-wrapper" tabindex="-1">
        <a href="index.php"><img src="_images/_header/logo.png" id="logo" class="unselectable"></a>
    </div>

    <div class="header-flexspace"></div>

    <noscript>
        <div id="header-unused-button-wrapper" class="header-corner-buttons">
            <!--Unused-->
        </div>
    </noscript>

    <button id="header-compose-button-wrapper" class="header-corner-buttons" title="Compose" tabindex="8">
        <img src="_images/_header/compose-button.png" id="compose-button" class="unselectable">
    </button>

    <button id="header-nightmode-button-wrapper" class="header-corner-buttons" title="Nightmode" tabindex="9">
        <img src="_images/_header/nightmode-button.png" id="nightmode-button" class="unselectable">
    </button>

    <div id="dropdown-wrapper" class="no_js-dropdown-display">
        <div class="dropdown-button-wrapper" class="no_js-dropdown-display">
            <div>
                <a href="index.php"><img src="_images/_header/start-icon.png"></a>
            </div>
            <div>
                <form action="index.php"><input type="submit" value="start" tabindex="2"></form>
            </div>
        </div>
        <div class="dropdown-button-wrapper dropdown-contact-slot">
            <div>
                <a href="contact.php"><img src="_images/_header/contact-icon.png"></a>
            </div>
            <div>
                <form action="contact.php"><input type="submit" value="contact" tabindex="3"></form>
            </div>
        </div>
        <div class="dropdown-button-wrapper">
            <div>
                <a href="photos.php"><img src="_images/_header/photos-icon.png"></a>
            </div>
            <div>
                <form action="photos.php"><input type="submit" value="photos" tabindex="4"></form>
            </div>
        </div>
        <div class="dropdown-button-wrapper">
            <div>
                <a href="literature.php"><img src="_images/_header/literature-icon.png"></a>
            </div>
            <div>
                <form action="literature.php"><input type="submit" value="literature" tabindex="5"></form>
            </div>
        </div>
        <div class="dropdown-button-wrapper" id="dropdown-audio-button-wrapper">
            <div>
                <a href="audio.php"><img src="_images/_header/audio-icon.png"></a>
            </div>
            <div>
                <form action="audio.php"><input type="submit" value="audio" tabindex="6"></form>
            </div>
        </div>
    </div>
</div>
<div id="dropdown-dismiss"></div>

<noscript>
    <div id="no_js-banner">
        <a href="http://www.enable-javascript.com" target="_blank">JavaScript is <strong>disabled</strong>. Some features and content is not accessible.</a>
    </div>
</noscript>
<script type="text/javascript">
    $(document).ready(function () {
        $('#wrapper').css('padding-bottom', '0'); 
    });
</script>