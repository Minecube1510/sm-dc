<?php
/* Quick Varing */
//Later...
//
/**/


/* Compound */
function autoClass (
    array $arrCls,  // Array Classes
) {
    global $space
        ;
    //
    
    //
    return implode(
        ($space), ($arrCls));
}
//
/**/


/* Build */
function buildHtml (
    string $Tag,
    array|string $Attrs = [],
    ?string $HtContent = null,
) {
    global $empty, $space, $quote
        ;
    $Attribute = ($empty);
    $Void = [
        "area", "base", "br", "col", "embed",
        "hr", "img", "input", "link", "meta",
        "param", "source", "track", "wbr"
    ];
    //
    if (is_string($Attrs)) {
        $HtContent = $Attrs;
        $Attrs = [];
    }
    //
    foreach ($Attrs as $HtKey => $HtVal) {
        if ((($HtVal) === (null)) || ($HtVal) === (false)) {
            continue;
        }
        if (($HtVal) === (true)) {
            $Attribute .= (($space) . ("$HtKey"));
        } else {
            $Attribute .= (($HtKey) . ('="') . (htmlspecialchars(
                (string) ($HtVal), (ENT_QUOTES))) . ($quote));
        }
    }
    //
    $Build_BscHt = ("<$Tag $Attribute>");
    $Build_ConHt = (($Build_BscHt) . (($HtContent)
        ?? ($empty)) . ("</$Tag>"));
    //
    if (in_array((strtolower($Tag)), ($Void), (true))) {
        //echo ($Build_BscHt);
        return ($Build_BscHt);
    }
    //
    //echo ($Build_ConHt);
    return ($Build_ConHt);
}
//
function ht_Meta (
    //
) {
    //
}
//
/**/


/* Test */
//print_r($vPhp);
//
/**/


/* END */
