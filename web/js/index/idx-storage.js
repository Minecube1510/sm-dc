#!/usr/bin/env js
/* web/js/index/idx-storage.js */

/* Imports */
import { jsVar,
    jsTx, jsDoc, jsMod,
    } from "../basis.js";
//
/**/


/* Storage - Main-Comping Classes */
export const idxView_Cls = [ `flex`,
    `overflow-hidden`, `relative`,
    `flex-col`, `flex-1`,
    `mt-4`, `rounded-sm`,
    `border-4`,
];
//
/**/


/* Storage - Geartool Classes */
export const gt_Lined_Cls = [
    `border`, `rounded-lg`,
    `focus-within:ring-1`
];
//
export const gt_MainSwitch_Cls = [
    `border`, `rounded-lg`,
    `px-3`,`py-2`,
    `focus-within:ring-1`,
];
export const gt_SwitchSelect_Cls = [ `shadow`,
    `row-start-1`, `col-start-1`,
];
export const gt_SwitchBg_Cls = [
    `relative`, `grid`, `grid-cols-2`,
];
export const gt_SwitchText_Cls = [
    `relative`, `z-10`, `px-2`,
    `font-semibold`,
];
//
export const gt_SelectOpting_Cls = [
    `appearance-none`, `focus:outline-none`,
    `w-full`, `px-3`,`py-2`, `pr-8`,
];
export const gt_SelectCarrow_Cls = [
    `absolute`, `pointer-events-none`,
    `bi`,`bi-caret-down-fill`, `right-3`,
];
//
/**/


/* Storage - Search-Feature Classes */
export const mdv_Ph_Cls = [
    `flex`, `absolute`, `rounded-lg`,
    `items-center`,`justify-center`,
    `text-center`,`font-semibold`,
    `inset-0`,
    `text-stone-500`,
];
//
export const mdVi_InputPls_Cls = [ `rounded-lg`,
    //`shadow-xs`,
    `focus-within:ring-1`,
];
export const mdVi_InputRoot_Cls = [
    `border`, `border-r`, `rounded-l-lg`
];
export const mdVi_InputDef_Cls = [ 
    `focus:outline-none`,
    `focus:relative`, `focus:z-10`,
    `focus:ring-1`,
    //
    `border`, `border-l`, `rounded-r-lg`,
];
//
/**/


/* Storage - Comping */
export const idx_RemoCon = (
    (jsDoc).getId(`idx-remocon`));
export const idx_RcLang = {
    "switch": {
        "rp": (`Rawpath`),
        "pf": (`Posfile`),
    },
    "select": {
        "s": (`Single`),
        "c": (`Compose`),
        "t": (`Testing`),
    },
};
/*|
|*/
export const idxGT_CompId = (
    (jsMod).getEl_Map({
    gtSwitch: (`idx-gt-switch`),
    gtInput: (`idx-gt-input`),
    gtSelect: (`idx-gt-select`),
}));
export const idxGT_Switch = {
    rawpath: (`gt-switch-l`),
    posfile: (`gt-switch-r`),
};
export const idxGt_Comps = (() => (
    (jsMod).getEl_Map({
    gtcSwitch: (`idx-gt-switch-comp`),
    gtcInput: (`idx-gt-input-comp`),
})));
/*|
|*/
export const idxSearchMD_CompId = (
    (jsMod).getEl_Map({
    idxView: (`idx-view`),
    idxSrch: (`idx-search`),
        //
    content: (`content`),
    //
    inRoot: (`article-md-root`),
    ftSrch: (`article-md-search`),
    srcBtn: (`article-md-src-logo`),
}));
//
/**/


/* Storage - Data */
export const md_Data = {
    mdpath: ((jsTx).trm(idxSearchMD_CompId
        .ftSrch.value)),
    fpMado: (`${jsVar.point}md`),
};
//
export const reaState = {
    success: {  // {{Clear}} and {{Success}}
        type: `success`,
        msg: `success`,
        text: `Markdown Loaded`,
    },
    //
    pndg: {  // Pending
        type: `loading`,
        msg: `pending`,
        text: `Markdown Loading`,
    },
    //
    empty: {  // Empty
        type: `warning`,
        msg: `empty`,
        text: `Input is Empty`,
    },
    iv_fm: {  // Invalid Format
        type: `warning`,
        msg: `invalid_format`,
        text: `Invalid Markdown Format`,
    },
    //
    md_n_fnd: {  // Err-404 MD File
        type: `error`,
        msg: `md_GetFile_404`,
        text: `Markdown Not Found (MD File)`,
    },
    chc_n_fnd: {  // Err-404 MD Cache
        type: `error`,
        msg: `md_GetCache_404`,
        text: `Markdown Not Found (Cache)`,
    },
    error: {  // Err (Internal, maybe...)
        type: `error`,
        msg: `error_500_internal`,
        text: `Loading Failed`,
    }
};
//
/**/


/* END */
/**/
