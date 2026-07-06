#!/usr/bin/env js
/* web/js/index/idx-system.js */

/* Imports */
import { jsVar, dirSafe,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as iGit from '../init-github.js';
//
import * as idxStrg from './idx-storage.js';
    import {
        md_Data as iMd,
        //
        idx_RcLang as rcLn,
        //
        idxGT_CompId as iGt_cId,
        idxGtWait_Comps as iGtComp,
        idxSearchMD_CompId as iScMd,
        //
        mdCosL_Comp_Cls as lRootCls,
        mdCosD_Comp_Cls as dRootCls,
        //
        mdSrch_AutoCm_Cls as srcACls,
        //
        mdSrch_PfChipy_Cls as pfChipCls,
    } from "./idx-storage.js";
    /*|
  //
|*/
import { srcFilter_Visible,
    cek_GetPath,
    //
    init_SrcList,
    } from "./idx-blueprint-0a.js";
    //
import { rppf_Moderact,
    //
    } from "./idx-blueprint-0b.js";
//
import { feature_RawPath, spaRender_SrList,
    compiling_Inputters as finSys_Inputters,
    } from "./idx-blueprint-2a.js";
//
import { feature_PosFile, 
    //
    } from "./idx-blueprint-2b.js";
/*|
|*/

//
/**/


/* Initialize - Variablings */
const drFs = (dirSafe.filename),
    gtInDefPlh = (iScMd.ftSrch.placeholder);
//
let rootPf = [],
    pfLister = (jsVar.empty),
    //
    gtFile_LastLoad,
    gitFile_ClickHandler = (null),
    //
    load_RtPf,
    gtMode_Now = (null),
    //
    rp = (rcLn.switch.rp),
    pf = (rcLn.switch.pf);;
//
/**/


/* Helpers */
export const blockingEvent = ((e) => {
    (e).preventDefault();
});
//
    /** GearTool-Switch Blocking System In-Mode
     * @param {Boolean} forMode
     * @returns {void}
     */
function artMdSrc_toggleBlocking (
    forMode,
) {
    let method = ((forMode)
        ? (`addEventListener`)
        : (`removeEventListener`)
    );
    //
    (iScMd).ftSrch[method](
        (`selectstart`),
        (blockingEvent));
}
//
/**/


/* GearTool - Connect, Config, Control */
/** Component: Geartool Input Configs
 * @typedef {Object} GearToolInputConfig
 * @property {{file0:string, suFix:string}} gtIn_Fix
 * @property {(v:string)=>string} gtIn_Fmt
 * @property {(v:string)=>string} gtIn_Slash
 * @property {(v:string)=>string} gtIn_Paint
 * 
 * @typedef {Object} GearToolInputComp
 * @property {HTMLInputElement} ftSrch
 * @property {HTMLInputElement} gtcInput
 */
//
    /** GearTool-Switch Feature-Config Working
     * @param {string} gtSwtcMode
     * @returns {void}
     */
function gtSwitch_Change (
    gtSwtcMode,
) {
    const tellGtMode = ((v) => (
        `Changing Writing-Mode: ${v}`)),
        isPf = ((gtSwtcMode) === ((jsTx)
            .lower(pf)));
    gtMode_Now = (gtSwtcMode);
    //
    artMdSrc_toggleBlocking(isPf);
    rppf_Moderact(
        (() => {
            gtFile_LastLoad = (null);
            //
            (jsCs).log(tellGtMode(rp));
            (iScMd.ftSrch)
                .placeholder = (gtInDefPlh);
            //
            (iScMd.ftSrch).removeAttribute(`style`);
            (iScMd.ftSrch).classList
                .remove(...pfChipCls);
            (iScMd.srChip).innerHTML = (jsVar.empty);
            //
            feature_RawPath();
        }),
        (() => {
            (jsCs).log(tellGtMode(pf));
            (iScMd.ftSrch)
                .placeholder = (drFs);
            //
            spaRender_SrList(false);
            feature_PosFile();
        }),
    );
}
    /** GearTool-Switch Feature Working
     * @param {HTMLElement} compGt
     * @returns {void}
     */
function gtSwitch_Sys (
    compGt = (iGtComp().gtcSwitch),
) {
    let lastMode = (null),
        conSwtcMod = (compGt.value);
    //
    if ((conSwtcMod) === ((jsTx).lower(rp))) {
        (jsCs).log((`First Writing-Mode:`),
            (rp));
    } else {
        (jsCs).log((`Unknown Get-Mode:`),
            (conSwtcMod));
    }
    //
    const syncSwitch = (() => {
        let sIsMode = ((jsTx).lower(compGt.value));
            if ((sIsMode) === (lastMode)) return;
        lastMode = (sIsMode);
        //
        gtSwitch_Change(sIsMode);
    });
    (compGt).addEventListener(
        (`change`), (syncSwitch));
}
//
    /** GearTool-Select Feature Working
     * @param {?} ?
     * @param {HTMLElement} compGt
     * @returns {void}
     */
function gtSelect_Sys (
    //
    compGt = (iGt_cId.gtSelect),
) {
    //
    //
}
//
await init_SrcList();
export function gtMd_Config () {
    gtSwitch_Sys();
    //
    finSys_Inputters();
    //
    gtSelect_Sys();
}
//
/**/


/* END */
/**/
