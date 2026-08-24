<?php  /* Start */
/* web/php/doxlye.php */

/* Vars */
$Auto_BackDir1 = [ ($dot2s), ($dot2s), ];
$Link_Direct = rootPath([ ...($Auto_BackDir1),
    ("stack"), ("build"), ("page"), ]);
$Import_Func = rootPath([ ...($Auto_BackDir1),
    ("stack"), ("system"), ("func"), ]);
//
/**/


/* Func - Automize */
function auto_ScanDir (
    string $Dir,
) {
    global $point, $dot2s
        ;
    return array_diff((scandir($Dir)), [
            ($point), ($dot2s), ]);
}
//
/**/


/* Rooting - API Funcs */
function apiJson (
    array $data,
    int $status = (200),
) {
    http_response_code($status);
    //
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    //
    exit;
}
//
require(autoFormat(("git"), ($PHP)));
require(autoFormat(("doxlye"), ($PHP)));
//
function apiRoute (string $apiPath) {
    global $PHP
        ;
    require(autoFormat(("api"), ($PHP)));
}

function fetchApi(string $endpoint): ?array
{
    global $slash, $linkLmt,
    $ProBsc, $ProScr
        ;
    $endpoint = trim(($endpoint), ($slash));
        if (!($endpoint)) return (null);
        //
    $localData = [
        "git-data/user" => (static fn () :
            array => gitEnvData()),
        "docent" => [
            "link" => ("/docent/"),
            "type" => ("local"),
    ]];
    //
    if (isset($localData[$endpoint])) return ((is_callable(
        $localData[$endpoint])) ? ($localData[$endpoint]())
        : ($localData[$endpoint]));
    if (!(function_exists("curl_init"))) return (null);
    //
    $PRO_SCR = strtoupper($ProScr);
    $base = ((!(empty($_SERVER[$PRO_SCR]))) && (
        ($_SERVER[$PRO_SCR]) !== ("off")) ? ($ProScr) : ($ProBsc));
    $host = ($_SERVER["HTTP_HOST"]) ?? $_SERVER["SERVER_NAME"] ?? null;
        if (!($host)) return (null);
        //
    $url = ((parse_url(($endpoint), (PHP_URL_SCHEME)))
        ? ($endpoint) : (("$base$linkLmt$host") . ("$slash$endpoint")));
    $ch = curl_init($url);
        if (!($ch)) return (null);
        //
    curl_setopt_array(($ch), [
        CURLOPT_RETURNTRANSFER => (true),
        CURLOPT_CONNECTTIMEOUT => (2),
        CURLOPT_TIMEOUT => (3),
    ]);
    $res = curl_exec($ch);
    $status = curl_getinfo(($ch),
        (CURLINFO_HTTP_CODE));
    //
    if ((($res) === (false)) || (($status)
        < (200)) || (($status) >= (300)))
        return (null);
    //
    $data = json_decode((string) ($res), (true));
    return ((is_array($data)) ? ($data) : (null));
}

if ((strncmp(($path), (implode(
        ($empty), [ ("api"),
    ($slash) ])), (4))) === (0)
) {
    apiRoute(substr(($path), (4)));
    //
    $gitLink = git_LinkData();
} else {
    global $PHP
    ;
    require(autoFormat(
        ("page"), ($PHP)));
}

/* END */
