<?php  /* Start */
/* web/php/doxlye.php */

/* Vars */
//?
//
/**/


/* Funcs */
function getDocs (
    string $Dir = "docent",
) {
    global $empty, $slash
        ;
    //
    $Docs = [];
    $CekD = auto_ScanDir($Dir);
    //
    foreach ($CekD as $cek) {
        $Path = (($Dir) . ($slash) . ($cek));
        //
        if (is_dir($Path)) {
            $Docs = array_merge(($Docs),
                getDocs($Path));
        } else {
            $Docs[] = preg_replace(('/\.[^.]+$/'),
                ($empty), ($Path)
            );
        }
    }
    //
    return ($Docs);
}
//
/**/


/* END */
