<?php
function createArrayFromString($string)
{
    $array = explode(", ", $string);
    sort($array);
    return $array;
}

//Prints fetched content
function printQuery($query)
{
    if ($queryRun = mysql_query($query)) {
        if (mysql_num_rows($queryRun) == 0) {
            echo "<h1>No results</h1>";
            die();
        } else {
            echo "<main>";
            echo "<h1>literature</h1>";
            echo "<button id='literature-sort-button'>Filter <img src='_images/dropdown-button.png' alt='Dropdown button'></button>";
 
            //Filterlist
            $filterlistForms = [
                "haiku", "analogy", "short story", "ballad", "renga", "senryu", "tanka", "one liner", "free verse", "palindrome", "erasure", "prose", "imagism", "anaphora", "ekphrastic", "sonnet", "monologue", "shape", "cinquain"];
            
            sort($filterlistForms);

            $filterlistCategories = ["living", "nature", "depression", "romance", "admiration", "cities & urban life", "decisions", "farewells", "holidays", "living", "work", "controversial", "economics", "politics", "sexuality", "spirituality", "family", "relationships", "thoughts", "technology", "youth", "conflict", "history", "arts", "motivation", "music", "failure", "science", "rant", "religion", "marriage"];

            sort($filterlistCategories);

            echo "<div id='literature-filterlist'>";
                echo "<div>";
                    echo "<h3>Forms</h3>";
                    foreach ($filterlistForms as $name) {
                        $className = str_replace(array(' ', '&', '"', "'", '?', '!'), '', $name);
                        echo "<input type='button' class='form-tag form-value-$className' value='$name' tabindex='0'>";
                    }
                echo "</div>";
                echo "<hr>";
                echo "<div>";
                    echo "<h3>Categories</h3>";
                    foreach ($filterlistCategories as $name) {
                        $className = str_replace(array(' ', '&', '"', "'", '?', '!'), '', $name);
                        echo "<input type='button' class='category-tag category-value-$className' value='$name' tabindex='0'>";
                    }
                echo "</div>";
            echo "</div>";
            
            while ($queryRow = mysql_fetch_assoc($queryRun)) {
                //Declarations
                $idNumber   = $queryRow['id'];
                $title      = $queryRow['title'];
                $coauthors  = $queryRow['coauthors'];
                $text       = $queryRow['text'];
                $forms      = $queryRow['forms'];
                $categories = $queryRow['categories'];
                $adult      = $queryRow['adult'];
                $featured   = $queryRow['featured'];
                
                $coauthorsArray =
                    array_filter(createArrayFromString($coauthors));

                $formsArray =
                    array_filter(createArrayFromString($forms));
                
                $categoriesArray = 
                    array_filter(createArrayFromString($categories));
 
                //Print frame
                if ($adult) {
                    echo "<article class='adult' id='article-number-$idNumber'>";
                } else {
                    echo "<article id='article-number-$idNumber'>";
                }
                    echo "<header>";
                        echo "<div class='title-bar'>";
                            echo "<div class='title-wrapper'>";
                                echo "<input type=\"button\" value=\"$title\" class='title'>";
                
                                if ($coauthors) {
                                    echo "<h3 class='title-coauthors'>Co-Authors: <span class='other-color'><em>";
                                    echo implode($coauthorsArray, ", ");
                                    echo "</em></span></h3>";
                                }
                            echo "</div>";
                            echo "<div class=\"special-tags\">";
                            if ($adult) {
                                echo "<input type='button' tabIndex='-1' value='mature' class='special-tag adult-button'>";
                            }
                            if ($featured) {
                                echo "<input type='button' tabIndex='-1' value='featured' class='special-tag featured-button'>";
                            }
                            echo "</div>";
                        echo "</div>";
                
                        echo "<div class='tag-wrapper'>";
                            if (count($formsArray) > 0) {
                                if (count($formsArray) > 1) {
                                    echo "<h3>Forms</h3>";
                                } else {
                                    echo "<h3>Form</h3>";
                                }
                                echo "<div class='forms-wrapper'>";
                                foreach ($formsArray as $value) {
                                    $valueNoSpace = str_replace(array(' ', '&', '"', "'", '?', '!'), '', $value);
                                    echo "<input type='button' tabIndex='-1' value='$value' class='form-tag form-value-$valueNoSpace'>";
                                }
                                echo "</div>";
                            }

                            if ((count($formsArray) > 0) && count($categoriesArray) > 0) {
                                echo "<hr>";
                            }
                
                            if (count($categoriesArray) > 0) {
                                if (count($categoriesArray) > 1) {
                                    echo "<h3>Categories</h3>";
                                } else {
                                    echo "<h3>Category</h3>";
                                }
                                echo "<div class='categories-wrapper'>";
                                foreach ($categoriesArray as $value) {
                                    $valueNoSpace = str_replace(array(' ', '&', '"', "'", '?', '!'), '', $value);
                                    
                                    echo "<input type='button' tabIndex='-1' value='$value' class='category-tag category-value-$valueNoSpace'>";
                                }
                                echo "</div>";
                            }
                        echo "</div>";
                
                        echo "<input type='button' class='read-button' tabIndex='-1' value='read'>";
                    echo "</header>";
                
                    echo "<p class='text-paragraph'>$text</p>";
                
                echo "</article>";
            }
            echo "</main>";
        }
    } else {
        echo mysql_error();
    }
}

//Fetches all entries in literature table and sorts the in ascending order
function fetchLibrary()
{
    $query =
        "SELECT * FROM literature ORDER BY `featured` DESC, `title` ASC, `id` ASC";
    
    printQuery($query);
}
