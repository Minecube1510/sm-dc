#!/usr/bin/env js
/* web/js/index/idx-system.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    dirSafe,
    } from "../basis.js";
    //
import * as twCls from "../tw-css-cls.js";
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
        //
        gtComponter as comperGt,
        idxGT_Switch as gtSwSide,
        idxSearchMD_CompId as iScMd,
        //
        mdCosL_Comp_Cls as lCompCls,
        mdCosD_Comp_Cls as dCompCls,
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
    idxGtc_CompSwitch as gtC_Switch,
    //
    } from "./idx-blueprint-2b.js";
    //
    import {
        idxGtComp_Select as gtC_Select,
    } from "./idx-blueprint-2c.js";
/*|
|*/
import { ldm_Color, ldm_Data, ldm_Event,
    setLDm_ThemeClass as ldmClasser,
} from "../set-paging.js";
//
/**/


/* Initialize - Variablings */
const drFs = (dirSafe.filename),
    gtInDefPlh = (iScMd.ftSrch
        .placeholder);
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
    pf = (rcLn.switch.pf);
//
/**/


/* Helpers */
export const
    blockingEvent = ((e) => {
    //
    (e).preventDefault();
}),
    liresClsL = [ ...(ldm_FilterCls((lCompCls),
        (`bg`))), (`bg-${ldm_Color.light.bg}`),
],
    liresClsD = [ ...(ldm_FilterCls((dCompCls),
        (`bg`))), (`bg-${ldm_Color.dark.bg}`),
]
    ;
//
    /** GearTool-Switch Blocking System In-Mode
     * @param {Boolean} forMode
     * @returns {void}
     */
function artMdSrc_toggleBlocking (
    forMode,
) {
    forMode = ((forMode)
        ? (`addEventListener`)
        : (`removeEventListener`)
    );
    //
    (iScMd).ftSrch[forMode](
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
        //
        isPf = ((gtSwtcMode) === (
            (jsTx).lower(pf))),
        //
        { ftSrch, srChip } = (iScMd)
        ;
    //
    gtMode_Now = (gtSwtcMode);
    //
    artMdSrc_toggleBlocking(isPf);
        //
    rppf_Moderact(
        () => {
            gtFile_LastLoad = (null);
            //
            (jsCs).log(tellGtMode(rp));
            //
            (jsMod).setElm((ftSrch), {
                placeholder: (gtInDefPlh),
            });
            //
            (ftSrch).removeAttribute(`style`);
            (ftSrch).classList.remove(...pfChipCls);
            //
            (jsMod).setElm((srChip), {
                innerHTML: (jsVar.empty),
            });
            //
            feature_RawPath();
        },
        () => {
            (jsCs).log(tellGtMode(pf));
            //
            (jsMod).setElm((ftSrch), {
                placeholder: (drFs),
            });
            //
            spaRender_SrList(false);
            feature_PosFile();
        },
    );
}
    /** GearTool-Switch Feature Working
     * @param {HTMLElement} compGt
     * @returns {void}
     */
function gtSwitch_Sys (
    compGt = ((jsDoc).getId(comperGt.cElmSw)),
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
     * @param {HTMLElement} compGt
     * @param {HTMLElement} selRow
     * @returns {void}
     */
function gtSelect_Sys (
    compGt = ((jsDoc).getId(comperGt.cElmSe)),
    selRow = ((jsDoc).getId(comperGt.cRow)),
) {
    let opened = (false);
    //
    (compGt).addEventListener((`mousedown`), (() => {
        //*
        opened = (!(opened));
        //
        (selRow).classList.toggle(
            (`rotate-180`), (opened));
        // */
    }));
    (compGt).addEventListener((`blur`), (() => {
        //*
        opened = (false);
        //
        (selRow).classList.remove(`rotate-180`);
        // */
    }));
    //
}
//
gtC_Switch({
    id: (comperGt.cElmSw),
    //
    left: (rcLn.switch.rp),
    lid: (gtSwSide.rawpath),
    //
    right: (rcLn.switch.pf),
    rid: (gtSwSide.posfile),
});
gtC_Select((Object)
    .values(rcLn.select));
//
/**/


/* Finalize */
    /** [Async] GearTool-Markdown Config
     * @returns {void}
     */
export async function gtMd_Config () {
    await init_SrcList();
    /*|
    |*/
    gtSwitch_Sys();
    //
    finSys_Inputters();
    //
    gtSelect_Sys();
}
//
    /** LDM Classing Filterer
     * @param {string[]} ldmCls
     * @param {string|string[]} ldmPrefix
     * @returns {string[]}
     */
export function ldm_FilterCls (
    ldmCls, ldmPrefix,
) {
    ldmPrefix = ((((Array).isArray(ldmPrefix)) ?
    (ldmPrefix) : [ldmPrefix]).map((p) => (`${p}-`)));
    //
    return ((ldmCls).filter((c) => (!(ldmPrefix)
        .some((p) => ((c).startsWith(p))))));
}
//
    /** Remocon Designing, with Tailwind Classes
     * @returns {void}
     */
export function remocon_Designier() {
    const
        comps = [
        //
        ((jsDoc).getId(comperGt
        .cElmSe)), (iScMd.idxSrch),
    ],
        apply = (() => { [
            [ [iScMd.ftSrch], (`border`), ],
            [ (comps), (`ring`), ],
        ].forEach(([ list, cls, ]) =>
            (list).forEach((e) => (ldmClasser((e),
                (`${cls}-${ldm_Color.light.border}`),
                (`${cls}-${ldm_Color.dark.border}`),
        ))));
    });
    //
    (iScMd.ftSrch).classList.add(`focus:outline-none`);
    (comps).forEach((e) => ((e).classList.add(...
        (idxStrg.gt_InvoComp_Cls))));
    //
    apply();
    (ldm_Event).addEventListener((`themechange`),
        (apply));
}
//
/**/


/* END */
/**/
