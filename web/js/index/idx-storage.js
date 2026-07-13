#!/usr/bin/env js
/* web/js/index/idx-storage.js */

/* Imports */
import { jsVar,
    jsTx, jsDoc, jsMod,
    } from "../basis.js";
//
import { ldm_Data,
    //
    } from "../set-paging.js";
//
import * as tw from '../tw-css-cls.js';
//
/**/


/* Storage - WIP Classes */
export const
/*|*/
idxView_Cls = [
    `flex`, `relative`,
    `overflow-hidden`,
    //
    `flex-col`, `rounded-sm`,
    //
    `flex-1`, `mt-4`,
    //
    `border-4`,
],
idx_ColorChain_Cls = [
    `bg-inherit`,
    `text-inherit`,
    `border-inherit`,
    ],
idx_LdmEff_cChain_Cls = [
    `transition-colors`,
    `ease-out`,
],
gt_SynComp_Cls = [
    `border-2`, `rounded-lg`,
    //
    `md:border-4`,
],
gt_InvoComp_Cls = [
    `into-smooth`, `rounded-lg`,
    `focus:outline-none`,
],
gt_MainSwitch_Cls = [
    `border`, `rounded-lg`,
    `px-3`,`py-2`,
    `focus-within:ring-1`,
],
gt_SwitchSelect_Cls = [
    `shadow`,
    `row-start-1`, `col-start-1`,
],
gt_SwitchBg_Cls = [
    `relative`, `grid`, `grid-cols-2`,
],
gt_SwitchText_Cls = [
    `relative`, `z-10`, `px-2`,
    `font-semibold`,
],
gt_SelectOpting_Cls = [
    `appearance-none`, `cursor-pointer`,
    `font-semibold`,
    //
    `w-full`, `px-3`,`py-2`, `pr-8`,
],
gt_SelectCarrow_Cls = [
    `absolute`, `pointer-events-none`,
    `bi`,`bi-caret-down-fill`, 
    `transition-transform`, `ease-in-out`,
    //
    `right-2.5`,
    //
    `duration-200`,
],
gt_Rooter_Cls = [
    `cursor-pointer`, `active:cursor-default`,
],
gt_SrcRes_Cls = [
    `absolute`,
    `top-full`, `w-full`,
    //
    `inset-shadow-md`, `shadow-xl/30`,
    `rounded-xl`,
    //
    `left-0`, `z-50`,
    //
    `translate-y-10.25`,
],
mdVi_Ph_Cls = [
    `flex`, `absolute`, `rounded-lg`,
    `items-center`,`justify-center`,
    `text-center`,`font-semibold`,
    `inset-0`,
    `text-stone-500`,
],
mdVi_LsComp_Cls = [
    `absolute`, `flex`,
    `pointer-events-none`,
    `items-center`, `justify-center`,
    //
    `font-semibold`,
    //
    `transition-all`, `ease-in-out`,
    //
    `inset-0`, `z-50`,
    `bg-white/70`, `backdrop-blur-sm`,
    `duration-300`,
],
mdVi_InputPls_Cls = [
    //
],
mdVi_InputRoot_Cls = [
    `border-transparent`,
    `-translate-y-0.25`,
],
mdVi_InputDef_Cls = [ 
    `border-transparent`,
    `into-smooth`,
],
mdVi_SrcLogo_Cls = [ 
    `transition-transform`,
    `ease-in-out`,
    //
    `duration-200`,
    //
    `hover:scale-120`,
    `active:scale-90`,
],
//
mdCosL_Comp_Cls = (
    ldm_Data.lightCls),
mdCosD_Comp_Cls = (
    ldm_Data.darkCls),
//
mdSrch_AutoCm_Cls = [
    `cursor-pointer`, `into-smooth`,
    `py-1`,`px-2`,
    //
    `transition-all`,
    `duration-300`,
    //
    `rounded-md`,
    //
    `hover:font-semibold`,
],
mdSrch_Sacker_Cls = [
    `absolute`, `items-center`,
    `flex`,
],
mdSrch_AddChips_Cls = [
    `inline-flex`, `items-center`,
    `gap-1`, `px-2`,`py-1`,
    `text-sm`,`font-medium`, `border`,
    `rounded-md`, `select-none`,
    `bg-blue-100`,`text-blue-800`,`border-blue-300`,
    `hover:bg-blue-200`,
],
mdSrch_PfChipy_Cls = [
    `text-transparent`, `caret-current`,
],
mdSrch_CrackChip_Cls = [
    `bi`,`bi-x-circle`, `relative`,
    `top-px`, `cursor-pointer`,
]
;
/**/


/* Storage - Comping */
export const
/*|*/
idx_RemoCon = ((jsDoc)
.getId(`idx-remocon`));
//
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
export const gtComponter = {
    cElmSw: (`idx-gt-switch-comp`),
    cElmIn: (`idx-gt-input-comp`),
    cElmSe: (`idx-gt-select-comp`),
    cRow: (`arrow-gt-selector`),
};
export const idxGT_CompId = (
    (jsMod).getEl_Map({
    gtSwitch: (`idx-gt-switch`),
    gtInput: (`idx-gt-input`),
    gtSelect: (`idx-gt-select`),
}));
//
export const idxGT_Switch = {
    rawpath: (`gt-switch-l`),
    posfile: (`gt-switch-r`),
};
/*|
|*/
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
    srcBtn: (`article-md-src-btn`),
    srcIcon: (`article-md-src-icon`),
        //
    srcRes: (`src-md-res`),
    srChip: (`src-md-chips`),
    //
    ldmBtn: (ldm_Data.modeBtn),
    //
}));
export const idxCompChip = {
    kitChip: (`md-kit-chip`),
    resChip: (`md-res-chip`),
}
;
/**/


/* Storage - Data */
export const
/*|*/
md_Data = {
    srcPath: ((jsTx).trm(idxSearchMD_CompId
        .ftSrch.value)),
    altPath: (jsVar.empty),
    fpMado: (`${jsVar.point}md`),
},
reaState = {
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
}
;
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
