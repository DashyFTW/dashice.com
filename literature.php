<?php
//Connect to database
require '_includes/connect.php';
//Add construct php
require '_includes/literatureconstruct.php';
?>

<!doctype html>
<html lang="en">
<head>
    <!--PAGE SPECIFIC-->
    <title>DASH - Literature</title>
    <link rel="stylesheet" type="text/css" href="_css/literature.css"/>
    <link rel="stylesheet" type="text/css" href="_css/_includes/_literature/reader.css"/>
    
    <?php include '_includes/meta.php'?>
</head>
<body>
    <!--CONTENT-->
    <script src="_js/literature.js"></script>
    <div id="reader-wrapper">
        
        <div id="reader-toolbar-wrapper">
            <div class="toolbar-container">
                <div class="toolbar-buttons-group" id="buttons-group-navigation">
                    <button class="toolbar-button" id="toolbar-prev" title="Previous"><span></span></button>
                    <button class="toolbar-button" id="toolbar-next" title="Next"><span></span></button>
                </div>
                
                <div class="toolbar-buttons-group" id="buttons-group-themes">
                    <button class="toolbar-button" id="toolbar-light" title="Light theme"><span></span></button>
                    <button class="toolbar-button" id="toolbar-dark" title="Dark theme"><span></span></button>
                    <button class="toolbar-button" id="toolbar-sepia" title="Sepia theme"><span></span></button>
                </div>
                
                <div class="toolbar-buttons-group" id="buttons-group-fontsizes">
                    <button class="toolbar-button" id="toolbar-smaller" title="Smaller font size"><span></span></button>
                    <button class="toolbar-button" id="toolbar-larger" title="Larger font size"><span></span></button>
                </div>
                
                <div class="toolbar-buttons-group" id="buttons-group-print">
                    <button class="toolbar-button" id="toolbar-print" title="Print"><span></span></button>
                </div>
                
            </div>
            
            <div class="toolbar-container">
                <div class="toolbar-buttons-group" id="buttons-group-close">
                    <button class="toolbar-button" id="toolbar-close" title="Close"><span></span></button>
                </div>
            </div>
        </div>
        
        <div id="reader-content">
            <header id="reader-header">
                <h1 id="reader-heading"></h1>
            </header>
            <main id="reader-main">
                <p id="reader-body"></p>
            </main>
        </div>
    </div>
    <div id="wrapper">        
        <div id="content">
            <?php echo fetchLibrary();?>
        </div>
        <div id="filter-bar-wrapper">
            <div id="filter-bar-items-wrapper"></div>
            <input type="button" id="filter-bar-clear-button" value="Clear">
        </div>
    </div>
    <!--END CONTENT-->
</body>
</html>