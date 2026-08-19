<?php  /*
    |
    "page.php"
    "stack/build/page.php"
    |
*/
    /* Setup - Headers */
foreach ([
    "Cache-Control" => ("no-store, no-cache, must-revalidate, max-age=0"),
    "Pragma" => ("no-cache"),
    "Expires" => ("0"),
] as $Key => $Val) { header( "$Key: $Val"); }
/*|
|*/
    /* Quick - Varing */
foreach ([ "Page_Head" => ("head"), "Page_Body" => ("body"),
] as $Key => $Val) { $$Key ??= rootPath([ ($Val), ]); }
/*|
|*/
    /* Auto - Func */
//Later
/*|
|*/
    /* Auto - Compound */
foreach ([ ("Head"), ("Body"),
] as $var) { $$var ??= ($empty); }
/* -- */  ?>

<!DOCTYPE html>
<html lang="id" class=""
data-theme="">
<head><?php  /* -- */
require ($Page_Head);
echo ($Head); ?></head>


<?php  /* -- */
require ($Page_Body);
?></html>
