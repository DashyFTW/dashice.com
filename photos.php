<?php
//Connect to database
require '_includes/connect.php';
//Add construct php
require '_includes/photosconstruct.php';

if (isset($_GET['category']) && !empty($_GET['category'])) {
    $value = $_GET['category'];
} else {
    $value = "featured";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <!--PAGE SPECIFIC-->
    <title>DASH - Photos</title>
    <link rel="stylesheet" type="text/css" href="_css/_includes/subheader.css"/>
    <link rel="stylesheet" type="text/css" href="_css/photos.css"/>
    
    <?php include '_includes/meta.php'?>
</head>
<body>
    <!--CONTENT-->
    <script type="text/javascript" src="_js/_header/subheader.js"></script>
    <script type="text/javascript" src="_js/photos.js"></script>
    <script type="text/javascript" src="_plugins/jquery.lazy.min.js"></script>
    <div id="wrapper">
        <?php require '_includes/subheader.php';?>
        <div id="content">
            <?php echo requestByType($value);?>
        </div>
    </div>
    <!--END CONTENT-->
</body>
</html>