<?php  /* Start */
/* web/php/api.php */

/* Vars */
$Github = ("Github");
//
/**/


/* Data Generator */
function git_LinkData () : array {
    global $empty,
        $Root, $JSON
        ;
    $gitLinkFile = (
        ($Root) . (DIRECTORY_SEPARATOR)
        . ("call") . (DIRECTORY_SEPARATOR)
        . ($JSON) . (DIRECTORY_SEPARATOR)
        . autoFormat(("git-link"), ($JSON))
    );
    $gitLinkJson = @file_get_contents(($gitLinkFile));
    $gitLinkData = json_decode((($gitLinkJson)
        ?: ($empty)), (true));
    //
    return ((is_array($gitLinkData))
        ? ($gitLinkData) : []);
}
//
/**/


/* Funcs - Method GET */
function git_UserBio () : never {
    global $ProBsc, $ProScr,
        $Github
        ;
    $data = gitEnvData(); $link = git_LinkData();
        //
    $user = (($data["GITUSER_NAME"]) ?? (strtolower($Github)));
    $repo = (($data["GITUSER_REPO"]) ?? ($Github));
    $host = (($link["github"]["host"]["api"]) ?? (null));
    //
    if (!($host)) { apiJson([
        "error" => ("Konfigurasi GitHub API tidak ditemukan"),
    ], (500)); }
    //
    $bio = @file_get_contents(
        (sprintf(("%s://%s/users/%s"), (($link["pro"]["scr"])
            ?? ($ProScr)), ($host), (rawurlencode($user)))),
        (false), stream_context_create([ ($ProBsc) => [
            "header" => ("User-Agent: $repo\r\n"),
            "timeout" => (5),
    ]]));
    //
    if (($bio) === (false)) { apiJson([
        "error" => ("GitHub API tidak dapat diakses"),
        "user" => ($user),
    ], (502)); }
    //
    header("Content-Type: application/json; charset=utf-8");
    echo ($bio);
    //
    exit;
}
//
/**/


/** Route - API
 * Link API in here
 **/
switch ($apiPath) {
    case ("git-data/user"):
        apiJson(gitEnvData());
        break;
    //
    case ("git-bio/user"):
        git_UserBio();
    /*|
    |*/
    case ("doxlye"):
        apiJson([
            "link" => getDocs(),
            "type" => ("local"),
        ]);
        break;
    /*|
    |*/
    default:
        apiJson([
            "error" => ("API tidak ditemukan"),
            "path" => ($apiPath),
        ], (404));
        break;
}
//
/**/


/* END */
