#!/usr/bin/env js
/* web/js/index/idx-system-config.js */

/* Imports */
import { jsVar,
    jsTx, jsCs,
    //
    dirSafe,
    } from "../basis.js";
//
import * as tw from '../tw-css-cls.js';
//
import * as idxStrg from './idx-storage.js';
import * as idxCls from './idx-storage-class.js';
    import { idxMc, idx_FirSearch,
        //
        idxGt_Lang as gt_LangCo,
            //
        idx_MComp as cIdx,
        //rscs_Comps as src_ComId,
        //
    } from "./idx-storage.js";
/*|
|*/
import * as idxSysF from './idx-system-fetch.js';
import {
    limit_Fetch_Files,
        //
    validate_Fuzzerch_Files,
    autoRank_Fuzzerch_Files,
        //
    random_LiSeeder_Files,
    //
    idx_RpList as rp_Lists,
        //
    idx_10TriaLists as triaLists,
    //
    } from "./idx-system-fetch.js";
//
import { init_RcGt_LeverSides,
    //
    } from "./idx-render-gt-kit.js";
import { ediChip_Fits,
    gtLvr_AutoChip_Setup,
    gtLvr_CrudChip,
    sync_TeSearChannel,
    } from "./idx-system-crud.js";
//
/**/


/* System.Feature - Config */
let
gtLvr_ChipCruder
;
//
const
pad_Y2 = (`py-2`),
pad_Y3 = (`py-3`),
//
opacity_0 = ((tw).tcRegulate((
    idxStrg.opacity), (0))),
    //
pointer_EvNon = (idxStrg.pointer_EvNon),
cursorPoint = (idxStrg.cursorPoint)
;
//
/**/


/* Geartool.Feature - Config */
    /** Handling GT-Lever Mode Changes.
     * @param {HTMLElement} compBtn
     * @param {string} leverMode
     * @returns {string}
     */
export function cfg_GtLever_Confirm (
    compBtn, leverMode,
) {
    init_RcGt_LeverSides(compBtn);
        if ((leverMode) === (compBtn.textContent
            )) return (leverMode);
        //
    leverMode = (compBtn.textContent);
    //
    (jsCs).log(`Change to Mode: ${leverMode}`);
    //
    return (leverMode);
}
//
    /** Handling GT-Lever Mode Changes.
     * @param {string} gtLvrMode
     * @returns {void}
     */
export function cfg_GtLever_Change (
    gtLvrMode,
) {
        if (!(gtLvrMode)) return;
    const
        srcRoot = (idxMc.srcRoot), srcPath = (idxMc.srcPath),
        chipEdit = (idxMc.chipEdit), srcChip = (idxMc.srcChip),
        //
        lever = ((jsTx).lower(gtLvrMode)),
        //
        nDefMode = (lever === ((jsTx).lower(gt_LangCo.lvr.rp))),
        //
        pathList = (((Array).isArray(srcPath.value)) ? ([
            ...(srcPath.value) ]) : ((jsTx).trm(srcPath.value)
                .split(jsVar.slash).filter(Boolean))),
        //
        classMap = [
            { elm: (srcPath), state: (!(nDefMode)), },
            { elm: (srcChip), state: (nDefMode), },
        ]
            ;
    (chipEdit).classList.remove((pad_Y2), (pad_Y3));
    //
    if (nDefMode) { [
        (srcChip), ...((srcChip).querySelectorAll(`*`)),
    ].forEach((elm) => { (elm).classList.remove((idxStrg
            .transiteAll), (idxStrg.gen_Durate));
        (elm).classList.add(`transition-none`); });
    } else {
        (srcChip).classList.remove(`transition-none`);
        (srcChip).classList.add(...idxCls.rcChips_Container_Cls,);
        (srcChip).classList.toggle((`pf-mode-chip`), ((lever
            ) === ((jsTx).lower(gt_LangCo.lvr.pf))));
        requestAnimationFrame(() => (ediChip_Fits(pathList)));
    }
    //
    for (const { elm, state } of classMap) { [
        (opacity_0), (pointer_EvNon) ].forEach((cls) => {
        (elm).classList.toggle((cls), (state));
    }); }
    //
    (srcRoot).classList.toggle((cursorPoint), (!(nDefMode)));
    //
    (srcChip).replaceChildren();
    sync_TeSearChannel((srcPath.value));
    gtLvr_AutoChip_Setup((pathList),
        (srcChip), (!(nDefMode)));
    //
    (jsCs).warn(`Still under development...`);
    //
    if (gtLvr_ChipCruder) { (srcRoot)
        .removeEventListener(
            (`click`), (gtLvr_ChipCruder));
        gtLvr_ChipCruder = (null);
    }
    //
    if ((lever) === ((jsTx).lower(gt_LangCo.lvr.pf))) {
        gtLvr_ChipCruder = (() => { gtLvr_CrudChip(
            (pathList), (`create`));
        });
        (srcRoot).addEventListener(
            (`click`), (gtLvr_ChipCruder));
    }
}
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
