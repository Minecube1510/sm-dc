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
        gtComponter as comperGt,
            //
        idxGT_Switch as gtSwSide,
        idxSearchMD_CompId as iScMd,
        //
        mdCosL_Comp_Cls as lCompCls,
        mdCosD_Comp_Cls as dCompCls,
    } from "./idx-storage.js";
    /*|
  //
|*/
import { lisResId,
    //
    gtIn_SrcUpDown,
    clsLForLis, clsDForLis,
    //
    } from "./idx-blueprint-0a.js";
import { rppf_Moderact,
    //
    } from "./idx-blueprint-0b.js";
//
import * as idxBP1 from './idx-blueprint-1.js';
    import {
        mdView_Search,
    } from "./idx-blueprint-1.js";
//
import { display_SrcList,
    //
    } from "./idx-blueprint-2a.js";
//
import { gtMd_Config, blockingEvent,
    //
    remocon_Designier, ldm_FilterCls,
    //
    liresClsL, liresClsD,
    //
    } from "./idx-system.js";
/*|
|*/
import { ldm_Color,
    ldm_Data, ldm_Event,
    //
    setPage_Comping,
    //
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
const
    ldm_Sections = [
    //
    (`header`), (`main`), (`footer`),
    (iScMd.ldmBtn),
],
    //
    noBgL = ldm_FilterCls((lCompCls), (`bg`)),
    noBgD = ldm_FilterCls((dCompCls), (`bg`)),
    //
    ldm_GetComp = ((e) => ((typeof (e) === (
    `string`)) ? ((jsDoc).qSelect(e)) : (e)))
    //
    ;
//
/*|
|*/
    /** Index-Renderer Colorize
     * @returns {void}
     */
function idx_RenderColorize () {
    (iScMd.srcBtn).classList.add(...
        (idxStrg.mdVi_SrcLogo_Cls));
    //
    (ldm_Sections).map(ldm_GetComp).forEach(
        (e) => { (e).classList.add(...(
        idxStrg.idx_LdmEff_cChain_Cls));
        ldmClasser(e, noBgL, noBgD);
    });
}
    /** Index-Renderer Builder
     * @returns {void}
     */
function idx_RenderBuild () {
    let ldm_Gtcs = [
        ((jsDoc).getId(comperGt.cElmIn)),
        ((jsDoc).getId(comperGt.cElmSe)),
    ];
    //
    idx_RenderColorize();
    remocon_Designier();
    //
    (ldm_Event).addEventListener((`themechange`), (() => {
        const eLisRes = ((jsDoc).getId(lisResId));
        //
        if (eLisRes) {
            (eLisRes).classList.add(`into-smooth`);
            //
            ldmClasser(eLisRes, liresClsL, liresClsD);
        }
        //
        (ldm_Sections).forEach((e) => (ldmClasser(
            ldm_GetComp(e), noBgL, noBgD)));
        (ldm_Gtcs).forEach((e) => (ldmClasser(
            ldm_GetComp(e), noBgL, noBgD)));
        //
        gtIn_SrcUpDown();
    }));
}
//
/**/


/* Activate */
    /** MD-Viewer Activating Settings
     * @returns {void}
     */
function mdVi_ActivatiOn () {
    const mdSrc_Event = (display_SrcList()),
        gtMode_Switch = (((jsDoc).getId(
            comperGt.cElmSw).value));
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
            (idxBP1).idx_MdStator((`lST`), (jsVar.empty));
            (idxBP1).idx_MdStator((`lLR`), (jsVar.empty));
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
    (jsCs).warn(`Index in Under Development...`);
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
    idx_RenderBuild();
    //
    await gtMd_Config();
    mdVi_FinActivate();
}
//
/**/


/* Uji Coba */
//
/**/


/* END */
/**/
