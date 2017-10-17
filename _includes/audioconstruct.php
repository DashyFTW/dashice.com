<?php
//Convert bytes
function formatBytes($size, $precision = 2)
{
    $base = log($size, 1024);
    $suffixes = array('', 'KB', 'MB', 'GB', 'TB');

    return round(pow(1024, $base - floor($base)), $precision) .' '. $suffixes[floor($base)];
}

//Fetches all entries in literature table and sorts the in ascending order
function fetchLibrary()
{
    $query = "SELECT * FROM audio ORDER BY `id` DESC";
    
    printQuery($query);
}

//Prints fetched content
function printQuery($query)
{    
    if ($queryRun = mysql_query($query)) {
        if (mysql_num_rows($queryRun) == 0) {
            echo "<h1>No results</h1>";
            die();
        } else {
            echo "<main id='audio-wrapper'>";
            echo "<h1>Audio</h1>";
            
            while ($queryRow = mysql_fetch_assoc($queryRun)) {
                //Assign variables
                $id = $queryRow['id'];
                $title = $queryRow['title'];
                $artist = $queryRow['artist'];
                $cover = $queryRow['cover'];
                $album = $queryRow['album'];
                $duration = $queryRow['duration'];
                $year = $queryRow['year'];
                $genre = $queryRow['genre'];
                $lyrics = $queryRow['lyrics'];
                $size = $queryRow['size'];
                $bpm = $queryRow['bpm'];
                $fileName = $queryRow['fileName'];
                $kind = $queryRow['kind'];
                $bitrate = $queryRow['bitrate'];
                $sampleRate = $queryRow['sampleRate'];
                $format = $queryRow['format'];
                $description = $queryRow['description'];
                
                $sizeFormatted = formatbytes($size);
                
                if (empty($title)) {
                    $title = "Untitled";
                }
                
                if (empty($artist)) {
                    $artist = "Unknown Artist";
                }
                
                if (empty($cover)) {
                    $cover = "_defaultcover.jpg";
                }
                
                if (empty($lyrics)) {
                    $noLyrics = true;
                    $lyricsProcessed = "There is no lyrics for this track.";
                } else {
                    $noLyrics = false;
                    $lyricsProcessed = $lyrics;
                }

                //Print track frame
                echo "<div class='track-frame'>";
                    echo "<div class='track-id'>$id</div>";
                    echo "<div class='track-frame-flexrow track-frame-flexrow-first'>";
                        echo "<div class='track-cover-wrapper'>";
                            echo "<img src='_media/_audio/_covers/$cover' alt='$title cover blurred' class='cover-blurred unselectable'>";
                            echo "<img src='_media/_audio/_covers/$cover' alt='$title cover' class='cover unselectable'>";
                        echo "</div>";

                        echo "<div class='track-info-wrapper'>";
                            echo "<div class='info-header'>";
                                echo "<h2 class='metaTitle'>$title</h2>";
                                echo "<h3 class='metaArtist'>$artist</h3>";
                            echo "</div>";

                            echo "<div class='info-header-extra'>";
                                echo "<p>$duration • $genre • $year</p>";
                                echo "<p class='track-lyrics'>$lyricsProcessed<p>";
                            echo "</div>";

                            echo "<div class='info-header-options'>";
                                echo "<input type='button' value='Play' class='header-option-button play-button'>";
                                if ($noLyrics == false) {
                                    echo "<input type='button' value='Lyrics' class='header-option-button lyrics-button'>";   
                                }
                                echo "<a href='_media/_audio/$fileName' download class='header-option-button download-button'>Download</a>";

                                echo "<audio class='track track$id' preload='meta'>";
                                    echo "<source src='_media/_audio/$fileName' type='audio/mp3' class='track-file'>";
                                echo "</audio>";  

                            echo "</div>";

                            echo "<div class='info-header-moreinfo'>";
                                echo "<input type='button' value='Show Information' class='header-moreinfo-button'>";
                            echo "</div>";
                        echo "</div>"; //End track-info-wrapper
                    echo "</div>"; //End FLEXROW

                    echo "<div class='track-frame-flexrow'>";
                        echo "<div class='track-cover-bottom'></div>";
                        echo "<div class='track-moreinfo-wrapper'>";
                            if (!empty($description)) {
                                echo "<div class='header-moreinfo-desc'>";
                                    echo "<h3>Description</h3>";

                                    echo "<p>$description</p>";
                                echo "</div>";
                                echo "<hr>";
                            }
                            echo "<h3>Metadata</h3>";
                            echo "<table>";

                                if (!empty($album)) {
                                    echo "<tr>";
                                        echo "<td>Album:</td>";
                                        echo "<td>$album</td>";
                                    echo "</tr>";
                                }

                                if (!empty($size) && $size > 0) {
                                    echo "<tr>";
                                        echo "<td>Size:</td>";
                                        echo "<td>$sizeFormatted</td>";
                                    echo "</tr>";
                                }

                                if (!empty($bpm) && $bpm !== 0) {
                                    echo "<tr>";
                                        echo "<td>BPM:</td>";
                                        echo "<td>$bpm</td>";
                                    echo "</tr>";
                                }

                                if (!empty($fileName)) {
                                    echo "<tr>";
                                        echo "<td>File Name:</td>";
                                        echo "<td>$fileName</td>";
                                    echo "</tr>";
                                }

                                if (!empty($kind)) {
                                    echo "<tr>";
                                        echo "<td>Kind:</td>";
                                        echo "<td>$kind</td>";
                                    echo "</tr>";
                                }

                                if (!empty($bitrate) && $bitrate !== 0) {
                                    echo "<tr>";
                                        echo "<td>Bitrate:</td>";
                                        echo "<td>$bitrate kbps</td>";
                                    echo "</tr>";
                                }

                                if (!empty($sampleRate) && $sampleRate !== 0) {
                                    echo "<tr>";
                                        echo "<td>Sample Rate:</td>";
                                        echo "<td>$sampleRate kHz</td>";
                                    echo "</tr>";
                                }
                            
                                if (!empty($format)) {
                                    echo "<tr>";
                                        echo "<td>Format:</td>";
                                        echo "<td>$format</td>";
                                    echo "</tr>";
                                }
                            echo "</table>";
                        echo "</div>"; //End header-moreinfo-wrapper
                    echo "</div>"; //End FLEXROW2
                echo "</div>"; //End track-frame
            }
            echo "</main>";
        }
    } else {
        echo mysql_error();
    }
}
