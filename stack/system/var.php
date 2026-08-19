<?php
/* Quick Varing */
$__ = ("");
//
$SLS = ("/");
$lB = (($SLS) . ("..") . ($SLS));
//
/**/


/* Process */
$vGet = file_get_contents((__DIR__) .
    ($lB) . ($lB)
    . ("call/json/vars.json"));
//
$vPhp = json_decode(($vGet), (true));
/*|
|*/
extract($vPhp, EXTR_SKIP);
//
/**/


/* Test */
//print_r($vPhp);
//
/**/


/* END */
