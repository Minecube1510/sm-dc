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


/* Method: Minify - Booster */
ob_start(function ( $buffer, ) {
    global $empty, $space,
        $angleL, $angleR
        ;
    return preg_replace([
//
    /* Newline / Tab */
('/\r\n|\r|\n/'), ('/\t/'),
    /* Whitespace antar-element */
('/>[ \t]+</'),
    /* Whitespace sebelum / sesudah tag */
('/>\s+</'),
    /* Whitespace setelah opening tag */
('/<([a-zA-Z][^>]*?)\s+>/'),
    /* Multiple whitespace */
('/[ ]{2,}/'),
], [
($space), ($space),
("><"), ("><"),
('<$1>'),
($space),
//
], ($buffer));
});
//
/**/


/* Method: Var - Rooting */
function autoFormat (
    string $File,
    string $Format,
) {
    global $point
        ;
    return implode(($point), [
        ($File), ($Format),
    ]);
}
//
/**/


/* Method: Var - Rooting */
$Root = (__DIR__);
//
$requestUri = ($_SERVER["REQUEST_URI"]);
$path = trim(
    parse_url(($requestUri),
        (PHP_URL_PATH)), ($slash));
//
function shortLink (
    string $link,
) {
    global $slash, $PHP,
        $Root
        ;
    return autoFormat(implode(
        ($slash), [ ($Root), ($link),
    ]), ($PHP));
}
//
function autoStat (
    string $lStat,  // Link Status
    int $coStat,  // Code Status
) {
    global $slash
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
        $PHP
        ;
    $caller = (debug_backtrace(
        (DEBUG_BACKTRACE_IGNORE_ARGS),
    (1))[0]["file"]);
        //
    $base = (dirname($caller));
    //
    $toPath = (($base) . ($slash) . (autoFormat(
        implode(($slash), ($arrPath)),
        ($PHP))));
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


/* Test */
// later...


/* Method: Process - Rooting */
require (rootPath([ ("web"),
    ($PHP), ("route"),
]));
//
/**/


/* END */
