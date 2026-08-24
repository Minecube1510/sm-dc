<?php  /* Start */
/* web/php/git.php */

/* Vars */
$gitKeys = [
    "GITUSER_NAME",
    "GITUSER_REPO",
    "GITREPO_BRANCH",
];
//
/**/


/* Funcs */
function gitEnvData () : array {
    global $empty,
        $Root, $ENV,
        $gitKeys
        ;
    $gitData = array_filter(array_combine(($gitKeys),
        array_map(("getenv"), ($gitKeys))),
        (static fn($value) => (
            (($value) !== (false)) && (($value) !== ($empty))
    )));
    $envFile = autoFormat((($Root)
        . (DIRECTORY_SEPARATOR)), ($ENV));
    //
    if (is_readable($envFile)) {
        $envData = parse_ini_file(($envFile),
            (false), (INI_SCANNER_RAW));
        $gitData = array_replace(($gitData), (array_intersect_key(
            (($envData) ?: []), array_flip($gitKeys))));
    }
    return ($gitData);
}
//
/**/


/* END */
