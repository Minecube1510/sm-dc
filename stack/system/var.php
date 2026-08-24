<?php
/* Quick Varing */
//$__ = ("");
//
$SLS = ("/");
$lB = (($SLS) . ("..") . ($SLS));
//
/**/


/* Process */
$vGet = file_get_contents(
    (__DIR__) . ($lB) . ($lB)
    . ("call/json/vars.json"));
//
$vPhp = json_decode(($vGet), (true));
/*|
|*/
extract(($vPhp), (EXTR_SKIP));
//
/**/


/* Additionals - 1 */
$HTML = ("html");
$PHP = ("php");
//
$CSS = ("css");
$JS = ("js");
//
$JSON = ("json");
$ENV = ("env");
//
/**/


/* Additionals - 2 */
$ProBsc = ("http");
$ProScr = ("https");
//
/**/


/* Test */
//print_r($vPhp);
//
/**/


/* END */
