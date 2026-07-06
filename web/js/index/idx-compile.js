#!/usr/bin/env js
/* web/js/index/idx-compile.js */

/* Imports */
import { jsVar, dirSafe,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as idxStrg from './idx-storage.js';
    import {
        md_Data as iMd,
        //
        idx_RemoCon as gtRc,
        idx_RcLang as rcLn,
        //
        idxGT_CompId as iGt_cId,
            //
        idxGT_Switch as gtSwSide,
        idxGtWait_Comps as iGtComp,
        //
        idxSearchMD_CompId as iScMd,
        //
        mdCosL_Comp_Cls as lCompCls,
        mdCosD_Comp_Cls as dCompCls,
    } from "./idx-storage.js";
    /*|
  //
|*/
import { rppf_Moderact,
    //
    } from "./idx-blueprint-0b.js";
//
import * as idxBP1 from './idx-blueprint-1.js';
    import {
        mdView_Search,
    } from "./idx-blueprint-1.js";
//
    import {
        idxGtComp_Select as gtC_Select,
    } from "./idx-blueprint-2.js";
    //
    import { display_SrcList,
        //
    } from "./idx-blueprint-2a.js";
    //
    import { 
        idxGtc_CompSwitch as gtC_Switch,
    } from "./idx-blueprint-2b.js";
//
import { gtMd_Config, blockingEvent,
    //
    } from "./idx-system.js";
/*|
|*/
import {
    setPage_Comping,
    ldm_Data, ldm_Event,
    setLDm_ThemeClass as ldmClasser,
} from "../set-paging.js";
/*|
|*/
import { mdVi_Clear,
    //
    mdVi_Searching as mdSrc,
} from "./idx-process.js";
//
/**/


/* Render */
gtC_Switch({
    id: (`idx-gt-switch-comp`),
    //
    left: (rcLn.switch.rp),
    lid: (gtSwSide.rawpath),
    //
    right: (rcLn.switch.pf),
    rid: (gtSwSide.posfile),
});
    //
gtC_Select((Object)
    .values(rcLn.select));
/*|
|*/
    /** LDM-Render - For more than 1 Elements
     * @param {Array} elms
     * @returns {void}
     */
function ldmTheme_Render (
    elms
) {
    (elms).forEach(((elm) => { if ((elm)?.isConnected
        ) { ldmClasser(elm, lCompCls, dCompCls); }
    }));
}
//
const ldmComponents = [ (iGt_cId.gtSwitch),
    (iGt_cId.gtInput), (iGt_cId.gtSelect),
    //
    (iScMd.inRoot), (iScMd.ftSrch),
];
//
ldmTheme_Render(ldmComponents);
(ldm_Event).addEventListener((`themechange`),
    (() => { ldmTheme_Render(ldmComponents);
}));
//
/**/


/* Activate */
    /** MD-Viewer Activating Settings
     * @returns {void}
     */
function mdVi_ActivatiOn () {
    const mdSrc_Event = (display_SrcList()),
        gtMode_Switch = (iGtComp().gtcSwitch
        .value);
    //
    (iScMd.ftSrch).addEventListener(
        (`keydown`), (async (event) => {
            const autoSrc = ((mdSrc_Event)
                .onKeyDown_MdSrc(event));
                //
                if ((event.key) !== (`Enter`)
                    || (event.repeat)) return;
            //
            rppf_Moderact(
                (() => {
                    (event).preventDefault();
                    //
                    if (!(autoSrc)) {
                        mdView_Search();
                    } else {
                        (autoSrc).click();
                        mdView_Search();
                    }
                }),
                (() => {
                    (event).preventDefault();
                    //
                    if (!(autoSrc)) {
                        mdView_Search();
                    } else {
                        (autoSrc).click();
                    }
                }),
            );
    }));
    (iScMd.srcBtn).addEventListener(
        (`click`), (async () => {
            await mdView_Search();
            //
    }));
    //
    (iScMd.ftSrch).addEventListener(
        (`input`), (() => {
            (mdSrc_Event).onInput_MdSrc();
            //
            (idxBP1).mdSt((`lST`), (jsVar.empty));
            (idxBP1).mdSt((`lLR`), (jsVar.empty));
                if ((jsTx).trm(iScMd.ftSrch.value)) return;
            mdVi_Clear();
            (idxBP1).mdVi_PlaceHolder((idxBP1)
                .idx_CompText(`md_Plh`));
    }));
    //
    (iScMd.ftSrch).addEventListener(
        (`dragstart`), (blockingEvent));
    //
}
//
    /** MD-Viewer Finalize Activating
     * @returns {void}
     */
function mdVi_FinActivate () {
    (idxBP1).mdVi_PlaceHolder(
        (idxBP1).idx_CompText(`md_Plh`));
    //
    mdVi_ActivatiOn();
}
//
/**/


/* Final */
    /** Presenting as "Test" | Index Page
     * @returns {void}
     */
export function test () {
    /*
        Test */ //*
    // Testing for waiting...
    // */
    //
}
    /** [Async] Presenting as "Struct" | | Index Page
     * @returns {Promise<void>}
     */
export async function struct () {
    /*
        Head */
    setPage_Comping(
        `Index Page (Under Development)`);
    //
    /*
        Body */
    gtMd_Config();
    mdVi_FinActivate();
}
//
/**/


/* Uji Coba */
//
/**/


/* END */
/**/
