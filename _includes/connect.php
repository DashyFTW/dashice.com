<?php
//Login credentials & connect command
$sql_host = 'localhost';
$sql_user = 'root';
$sql_pass = '';
$sql_datb = 'DASH';

if (!mysql_connect($sql_host, $sql_user, $sql_pass) || !mysql_select_db($sql_datb)) {
    die('Could not connect to MySQL server or database');
}
