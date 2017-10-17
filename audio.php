<?php
//Connect to database
require '_includes/connect.php';
//Add construct php
require '_includes/audioconstruct.php';
?>

<!doctype html>
<html lang="en">
<head>
    <!--PAGE SPECIFIC-->
    <title>DASH - Audio</title>
    <link rel="stylesheet" type="text/css" href="_css/_includes/_audio/player.css"/>
    <link rel="stylesheet" type="text/css" href="_css/audio.css"/>
    
    <?php include '_includes/meta.php'?>
</head>
<body>
    <!--CONTENT-->
    <script src="_js/audio.js"></script>
    <div id="wrapper">
        <noscript>
            <div id="no_js-wrapper">
                <h2 id="no_js-header">JavaScript seems to be disabled.</h2>
                <p id="no_js-paragraph">Return to start or reload this page with JavaScript enabled.</p>
                <a href="index.php"><img id="no_js-image" src="_images/back-to-home.png" alt="Back to frontpage"></a>
            </div>
        </noscript>
        
        <div id="content">
            <div id="sidebar-space">
                <div id="lyrics-wrapper">
                    <input type="button" id="lyrics-close-button" value="Dismiss">
                    <h3 id="lyrics-title" class="unselectable"></h3>
                    <p id="lyrics" class="unselectable"></p>
                </div>
            </div>
            <?php fetchLibrary();?>
        </div>
        
        <?php include '_includes/player.php'?>
    </div>
    <!--END CONTENT-->
</body>
</html>