#!/usr/bin/env js
/* web/js/index/idx-blueprint-2.js */

/* Imports */
import { jsVar,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as idxStrg from './idx-storage.js';
    import {
        idxGT_CompId as iGt_cId,
        idxSearchMD_CompId as iScMd,
        //
    } from "./idx-storage.js";
//
/**/


/* Helper */
    /** Randomize Shuffle Methoder.
     * @param {array} getSrcRes
     * @returns {getSrcRes}
     */
export function randomizeSrc (
    getSrcRes,
) {
    return ([ ...getSrcRes, ].sort(
        () => (((Math).random()) - (0.5))
    ));
}
//
/**/


/* ? */
//
/**/


/* Activate */
    /** Index-Geartools Classingers
     * @returns {void}
     */
function idxGt_Classing () {[
    //
        [ (iGt_cId.gtSwitch), (idxStrg.gt_MainSwitch_Cls), ],
        //
        [ (iGt_cId.gtSwitch), (idxStrg.gt_SynComp_Cls), ],
        [ (iGt_cId.gtInput), (idxStrg.gt_SynComp_Cls), ],
        [ (iGt_cId.gtSelect), (idxStrg.gt_SynComp_Cls), ],
    //
    ].forEach(([ elm, cls, ]) => ((elm)
        .classList.add(...cls)));
    //
}
idxGt_Classing();
//
/**/


/* END */
/**/
