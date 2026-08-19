<?php  /* Start */
/* index.php */

/* Development error reporting */
error_reporting(E_ALL);
ini_set(("display_errors"), (1));
ini_set(("display_startup_errors"), (1));
//
/**/


/* Get: Imports */
require("stack/system/var.php");
//
/**/


/* Test */
// later...


/* Method: Var - Rooting */
$Root = (__DIR__);
//
$requestUri = ($_SERVER["REQUEST_URI"]);
$path = trim(
    parse_url(($requestUri),
        (PHP_URL_PATH)), ($slash));
//
$php = (".php");
//
function shortLink (
    string $link,
) {
    global $slash,
        $Root,
        $php
        ;
    //
    return (
        ($Root) . ($slash)
        . ($link) . ($php));
}
//
function autoStat (
    string $lStat,  // Link Status
    int $coStat,  // Code Status
) {
    global
        $slash
        ;
    http_response_code(404);
    //
    $autoLink = (($lStat) 
        . ($slash));
    //
    require(shortLink(($autoLink)
        . ($coStat)));
}
//
function rootPath (
    array $arrPath,  // Array Path
): string {
    global $slash, $bSlash,
        $php
        ;
    $caller = (debug_backtrace(
        (DEBUG_BACKTRACE_IGNORE_ARGS),
    (1))[0]["file"]);
        //
    $base = (dirname($caller));
    //
    $toPath = (($base) . ($slash) . (implode(
        ($slash), ($arrPath))) . ($php));
    $pathFix = (str_replace(($bSlash),
        ($slash), ($toPath)));
    //
    return ($pathFix);
}
function autoPath (
    array $arrPath,  // Array Path
    string $format,  // Back Format
    bool $withRoot = true  // Rooted or Not
) {
    global $point, $slash, $bSlash,
        $Root
        ;
    $basePath = (($withRoot)
        ? (($Root) . ($slash) . implode(
            ($slash), ($arrPath)))
        : (implode(($slash), ($arrPath))));
    $comPath = (($format)
        ? (implode(($point), [ ($basePath),
            ($format), ])) : ($basePath));
        //
    $pathFix = (str_replace(($bSlash),
        ($slash), ($comPath)));
    //
    return ($pathFix);
}
//
/**/


/* Method: Minify - Booster */
ob_start(function ( $buffer, ) {
    global $empty, $space,
        $angleL, $angleR
        ;
    return preg_replace([
('/\r\n|\r|\n/'), ('/\t/'),
//
('/> +/'), ('/ +</'), ('/>[ \t]+</'),
    ], [
($empty), ($empty),  # ($space),
($angleR), ($angleL), ("><"),
    ], ($buffer));
});
//
/**/


/* Method: Process - Rooting */
$Link_Direct = rootPath([
    ("stack"), ("build"), ("page"),
]);
$Import_Func = rootPath([
    ("stack"), ("system"), ("func"),
]);
//
switch ($path) {
        /* Display mau ke halaman mana */
    case ($empty):
    case ("direct"):
        require(shortLink("public/direct"));
        break;
    /*|
    |*/
    case ("main"):  /* Halaman: Project Utama */
        require(shortLink("public/main"));
        break;
        //
    case ("img-php"):  /* Halaman: Gudangan file Gambar-Gambar */
        require(shortLink("public/img-php"));
        break;
    case ("img-js"):  /* Halaman: Gudangan file Gambar-Gambar */
        require(shortLink("public/img-js"));
        break;
    /*|
    |*/
        /* Halaman: Fallback Error (Auto) */
    default:
        autoStat(("public/error"), (404));
        break;
    //
}
//
/**/


/* END */
