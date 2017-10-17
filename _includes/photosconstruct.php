<?php
//Convert bytes
function formatBytes($size, $precision = 2)
{
    $base = log($size, 1024);
    $suffixes = array('', 'KB', 'MB', 'GB', 'TB');

    return round(pow(1024, $base - floor($base)), $precision) .' '. $suffixes[floor($base)];
}

//Based on parameter value, requests different function
function requestByType($value)
{
    if ($value == "featured") {
        fetchByFeatured($value);
    } else {
        fetchByYear($value);
    }
}

//Fetches all images in the database marked true for the featured column
function fetchByFeatured($featured)
{
    $query =
        "SELECT * FROM photos WHERE `featured`=1 ORDER BY `date` DESC, `id` DESC";
    
    printQuery($query, $featured);
}

//Fetches all images in the database by year value
function fetchByYear($year)
{
    $query =
        "SELECT * FROM photos WHERE `date` BETWEEN '$year-01-01' AND '$year-12-31' ORDER BY `date` DESC, `id` DESC";
    
    printQuery($query, $year);
}

//Prints fetched content
function printQuery($query, $value)
{
    //Prints on top of page the current category page the user is on
    if ($value != "featured") {
        $value = "20".$value;
    }
    
    //Check to see if any rows can be printed, else display "no results" and die.
    if ($queryRun = mysql_query($query)) {
        if (mysql_num_rows($queryRun) == 0) {
            echo "<h1>No results</h1>";
            die();
        } else {
            echo "<main>";
            echo "<h1>$value</h1>";
            
            while ($queryRow = mysql_fetch_assoc($queryRun)) {
                //Check for hidden
                $hidden = $queryRow['hidden'];
                if ($hidden != 1) {

                    //Assign variables
                    $idnumber = $queryRow['id'];
                    $date = $queryRow['date'];
                    $year = substr($date, 0, 4);
                    $title = $queryRow['title'];
                    $description = $queryRow['description'];
                    $xres = $queryRow['x-res'];
                    $yres = $queryRow['y-res'];
                    $size = $queryRow['size'];
                    $fsize = formatBytes($size);
                    $png = $queryRow['transparent'];
                    $imageOG = $queryRow['og'];

                    //Image path handling
                    if ($imageOG == 1) {
                        $pathOG = 1;
                        
                        if ($xres <= 600 && $yres <= 640) {
                            
                            if ($png == 0) {
                                $pathOGFull = "_media/_photos/$year/og/full/$idnumber.jpg";
                                $pathOG1x = $pathOGFull;
                                $pathOG2x = $pathOGFull;
                            } else {
                                $pathOGFull = "_media/_photos/$year/og/full/$idnumber.png";
                                $pathOG1x = $pathOGFull;
                                $pathOG2x = $pathOGFull;
                            }
                            
                        } else if ($xres <= 1200 && $yres <= 1280) {
                        
                            if ($png == 0) {
                                $pathOGFull = "_media/_photos/$year/og/full/$idnumber.jpg";
                                $pathOG1x = "_media/_photos/$year/og/1x/$idnumber.jpg";
                                $pathOG2x = $pathOGFull;
                            } else {
                                $pathOGFull = "_media/_photos/$year/og/full/$idnumber.png";
                                $pathOG1x = "_media/_photos/$year/og/1x/$idnumber.png";
                                $pathOG2x = $pathOGFull;
                            }
                            
                        } else {

                            if ($png == 0) {
                                $pathOGFull = "_media/_photos/$year/og/full/$idnumber.jpg";
                                $pathOG1x = "_media/_photos/$year/og/1x/$idnumber.jpg";
                                $pathOG2x = "_media/_photos/$year/og/2x/$idnumber.jpg";
                            } else {
                                $pathOGFull = "_media/_photos/$year/og/full/$idnumber.png";
                                $pathOG1x = "_media/_photos/$year/og/1x/$idnumber.png";
                                $pathOG2x = "_media/_photos/$year/og/2x/$idnumber.png";
                            }

                        }
                    } else {
                        $pathOG = 0;
                    }

                    if ($xres <= 600 && $yres <= 640) {

                        if ($png == 0) {
                            $pathFull   = "_media/_photos/$year/full/$idnumber.jpg";
                            $path1x     = $pathFull;
                            $path2x     = $pathFull;
                        } else {
                            $pathFull   = "_media/_photos/$year/full/$idnumber.png";
                            $path1x     = $pathFull;
                            $path2x     = $pathFull; 
                        }

                    } else if ($xres <= 1200 && $yres <= 1280) {

                            if ($png == 0) {
                                $pathFull   = "_media/_photos/$year/full/$idnumber.jpg";
                                $path1x     = "_media/_photos/$year/1x/$idnumber.jpg";
                                $path2x     = $pathFull;
                            } else {
                                $pathFull   = "_media/_photos/$year/full/$idnumber.png";
                                $path1x     = "_media/_photos/$year/1x/$idnumber.png";
                                $path2x     = $pathFull; 
                            }

                    } else {

                            if ($png == 0) {
                                $pathFull   = "_media/_photos/$year/full/$idnumber.jpg";
                                $path1x     = "_media/_photos/$year/1x/$idnumber.jpg";
                                $path2x     = "_media/_photos/$year/2x/$idnumber.jpg";
                            } else {
                                $pathFull   = "_media/_photos/$year/full/$idnumber.png";
                                $path1x     = "_media/_photos/$year/1x/$idnumber.png";
                                $path2x     = "_media/_photos/$year/2x/$idnumber.png";
                            }

                    }

                    //Print image-frame
                    echo "<div class=\"image-frame\">";

                        echo "<div class=\"image-heading-wrapper\">";
                            echo "<h2>$title</h2>";
                        echo "</div>";

                        echo "<div class=\"image\">";

                    //echo images with different properties depending on image dimensions
                    if (($yres / $xres) > 1.3) {
                        echo "<img class=\"image-frame-image tall unselectable\" data-src=\"$path1x\" data-retina=\"$path2x\" alt=\"$title\">";
                        if ($pathOG == 1) {
                            echo "<img class=\"tall image-frame-og-image unselectable\" data-src=\"$pathOG1x\" data-retina=\"$pathOG2x\" alt=\"$title unaltered\">";
                        }
                    } else if ($xres < 600) {
                        echo "<img class=\"image-frame-image unselectable\" data-src=\"$path1x\" data-retina=\"$path2x\" alt=\"$title\" width=\"600\">";
                        if ($pathOG == 1) {
                            echo "<img class=\"image-frame-og-image unselectable\" data-src=\"$pathOG1x\" data-retina=\"$pathOG2x\" alt=\"$title unaltered\" width=\"600\">";
                        }
                    } else {
                        echo "<img class=\"image-frame-image unselectable\" data-src=\"$path1x\" data-retina=\"$path2x\" alt=\"$title\">";
                        if ($pathOG == 1) {
                            echo "<img class=\"image-frame-og-image unselectable\" data-src=\"$pathOG1x\" data-retina=\"$pathOG2x\" alt=\"$title unaltered\">";
                        }
                    }

                    echo "</div>";

                    echo "<div class=\"image-moreinfo-container\">";
                        if ($pathOG == 1) {
                            echo "<div class=\"og-nav-button prev-button\"></div>";
                            echo "<div class=\"og-nav-button next-button\"></div>";
                        }
                        echo "<button class=\"moreinfo-button-wrapper\"></button>";
                        echo "<div class=\"moreinfo-text-wrapper\">";
                            if (strlen($description) > 0) {
                                echo "<h3>Description</h3>";
                                echo "<p>$description</p>";
                                echo "<hr>";
                            }
                            echo "<div>";
                                echo "<a href=\"$pathFull\" target=\"_blank\" tabindex=\"0\">Full Size</a>";
                                if ($pathOG == 1) {
                                    echo "<a href=\"$pathOG\" target=\"_blank\" class=\"photos-og-button\" tabindex=\"0\">Unaltered</a>";
                                }
                            echo "</div>";
                            echo "<hr>";
                            echo "<p class=\"moreinfo-meta\">$date • {$xres}x{$yres} • $fsize</p>";
                        echo "</div>";
                    echo "</div>";

                    echo "</div>";
                } 
                }
        }
    } else {
        echo mysql_error();
    }
    echo "</main>";
}
