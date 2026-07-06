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
export const gt_Rooter_Cls = [
    `cursor-pointer`, `active:cursor-default`,
];
export const gt_SrcRes_Cls = [
    `absolute`, `top-full`, `w-full`,
    `left-0`, `z-50`, `shadow`,
    `border-2`, `rounded-b-md`,
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
export const mdv_LsComp_Cls = [ `flex`,
    `pointer-events-none`, `absolute`,
    `items-center`, `justify-center`,
    //
    `font-semibold`,
    //
    `transition-all`, `ease-in-out`,
    //
    `inset-0`, `z-50`,
    `bg-white/70`, `backdrop-blur-sm`,
    `duration-300`,
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
export const mdCosL_Comp_Cls = [
    `bg-gray-50`, `text-zinc-800`,
    `border-zinc-800`,
];
export const mdCosD_Comp_Cls = [
    `bg-zinc-900`, `text-zinc-100`,
    `border-zinc-100`,
];
//
export const mdSrch_AutoCm_Cls = [
    `cursor-pointer`,
    `py-1`,`px-2`,
    `hover:bg-blue-300`, `active:bg-blue-400`,
];
export const mdSrch_Sacker_Cls = [
    `absolute`, `items-center`,
    `flex`,
];
//
export const mdSrch_AddChips_Cls = [
    `inline-flex`, `items-center`,
    "gap-1", `px-2`,`py-1`,
    `text-sm`,`font-medium`, `border`,
    `rounded-md`, `select-none`,
    `bg-blue-100`,`text-blue-800`,`border-blue-300`,
    `hover:bg-blue-200`,
];
export const mdSrch_PfChipy_Cls = [
    `text-transparent`, `caret-current`,
];
export const mdSrch_CrackChip_Cls = [ `bi`,
    `bi-x-circle`, `relative`, `top-px`,
    `cursor-pointer`,
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
export const idxGtWait_Comps = (() => (
    (jsMod).getEl_Map({
    gtcSwitch: (`idx-gt-switch-comp`),
    gtcInput: (`idx-gt-input-comp`),
})));
/*|
|*/
//export const idxSResLi = (`src-res-lister`);
export const idxSearchMD_CompId = (
    (jsMod).getEl_Map({
    idxView: (`idx-view`),
    idxSrch: (`idx-search`),
        //
    content: (`content`),
    madoLs: (`md-loading-idx`),
    //
    inRoot: (`article-md-root`),
    ftSrch: (`article-md-search`),
    srcBtn: (`article-md-src-logo`),
        //
    srcRes: (`src-md-res`),
    srChip: (`src-md-chips`),
}));
export const idxCompChip = {
    kitChip: (`md-kit-chip`),
    resChip: (`md-res-chip`),
};
//
/**/


/* Storage - Data */
export const md_Data = {
    srcPath: ((jsTx).trm(idxSearchMD_CompId
        .ftSrch.value)),
    altPath: (jsVar.empty),
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
