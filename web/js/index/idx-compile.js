#!/usr/bin/env js
/* web/js/index/idx-compile.js */

/* Imports */
import { jsVar,
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
        idxGt_Input as gtInput,
        //
        idxSearchMD_CompId as iScMd,
    } from "./idx-storage.js";
/*|
|*/
import * as idxBP1 from './idx-blueprint-1.js';
    //
import * as idxBP2 from './idx-blueprint-2.js';
    import {
        idxGtComp_Switch as gtC_Switch,
        idxGtComp_Select as gtC_Select,
    } from "./idx-blueprint-2.js";
/*|
|*/
import { setPage_Comping
} from "../set-paging.js";
/*|
|*/
import { mdVi_Clear,
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
//
    //
gtC_Select((Object)
    .values(rcLn.select));
//
/**/


/* Connect, Config, Control */
//Under building...
//
    /** GT-Switch Feature Working
     * @param {?} ?
     * @param {HTMLElement} compGt
     * @returns {void}
     */
function gtSwitch_Sys (
    //
    compGt = (iGt_cId.gtSwitch),
) {
    //
    //
}
    //
    /** GT-Input Feature-Config Working
     * @param {HTMLElement} compGt
     * @returns {void}
     */
function gtInput_Config (
    compGt,
) {
    const gtIn_Fix = {
        file0: ((jsTx).upper(`README`)),
        suFix: ((iMd).fpMado),
    };
    const gtIn_Fmt = ((v) => {
        v = ((jsTx).trm(v));
        //
        switch (true) {
            case (!(v)):
                return (jsVar.empty);
            case ((v).endsWith(gtIn_Fix.suFix)):
                return (v);
            default:
                return (`${v}${gtIn_Fix.suFix}`);
        }
    });
    //
    let gtIn_Slash = (v) => ((v).replace(
        (/\\/g), (jsVar.slash)));
    let gtIn_Paint = (v) => ((v)? (`${jsVar
        .slash}${v}`) : (jsVar.empty));
    //
    return {
        gtIn_Fix, gtIn_Fmt,
        gtIn_Slash, gtIn_Paint,
    };
}
    /** GT-Input Feature-System Working
     * @param {HTMLElement} compGt
     * @returns {void}
     */
function gtInput_Sys (
    compGt = (iGt_cId.gtInput)
) {
    const cfg = gtInput_Config(compGt);
    const gtInElm = (iScMd.ftSrch);
    const {
        gtIn_Fix, gtIn_Fmt,
        gtIn_Slash, gtIn_Paint,
    } = (cfg);
    const render = ((v) => (gtIn_Paint(
        gtIn_Slash(gtIn_Fmt(v)))));
    //
    let sync = (() => {
        let v = (gtInElm.value);
        (iMd).mdpath = (v);
        (gtInput).value = (render(v));
    });
    //
    (gtInElm).value = (gtIn_Fix.file0);
    (gtInput).readOnly = (true);
    (gtInput).value = render(gtIn_Fix.file0);
    (iMd).mdpath = (gtIn_Fix.file0);
    //
    (gtInElm).addEventListener((`input`), (sync));
    (gtInElm).addEventListener(
        (`beforeinput`), ((e) => {
            if ((e.data) !== (jsVar.bSlash)) return;
        e.preventDefault();
        let {
            selectionStart: s,
            selectionEnd: e2, value,
        } = (e.target);
        //
        (e).target.value = (`${value.slice(0,
            s)}/${value.slice(e2)}`);
        (e).target.setSelectionRange(
            ((s) + (1)), ((s) + (1)));
    }));
    (gtInElm).addEventListener(
        (`paste`), ((e) => {
        (e).preventDefault();
        let text = (((e.clipboardData) || (window.clipboardData))
            .getData(`text`).replace((/\\/g), (jsVar.slash)));
        let {
            selectionStart: s,
            selectionEnd: e2, value,
        } = (e.target);
        //
        (e).target.value = (`${value.slice((0),
            (s))}${text}${value.slice(e2)}`);
        (e).target.setSelectionRange(
            ((s) + (text.length)), ((s) + (text.length)));
    }));
}
    //
    /** GT-Select Feature Working
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
function gtMd_Config () {
    gtSwitch_Sys();
    gtInput_Sys();
    gtSelect_Sys();
}
//
//(jsCs).log(gtRc);
gtMd_Config();
//
/**/


/* Activate */
    /** MD-Viewer Activating Settings
     * @returns {void}
     */
function mdVi_ActivatiOn () {
    (iScMd.ftSrch).addEventListener(
        (`keydown`), async (event) => {
            switch (true) {
                case ((event.key) !== (`Enter`)):
                case (event.repeat):
                    return;
            }
            (event).preventDefault();
            await ((idxBP1).mdView_Search());
    });
    (iScMd.srcBtn).addEventListener(
        (`click`), async () => {
            await ((idxBP1).mdView_Search());
    });
    //
    (iScMd.ftSrch).addEventListener(
        (`input`), () => {
            (idxBP1).mdSt((`lST`), (jsVar.empty));
            (idxBP1).mdSt((`lLR`), (jsVar.empty));
                if ((jsTx).trm(iScMd.ftSrch.value)) return;
            mdVi_Clear();
            (idxBP1).mdVi_PlaceHolder((idxBP1)
                .idx_CompText(`md_Plh`));
    });
}
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
    mdVi_FinActivate();
}
//
/**/


/* Uji Coba */
//Later...
//
/**/


/* END */
/**/
