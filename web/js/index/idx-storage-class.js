#!/usr/bin/env js
/* web/js/index/idx-storage-class.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
//
import { ldm_Color, ldm_Data,
    //
    } from "../set-paging.js";
//
import * as tw from '../tw-css-cls.js';
//
import * as idx from './idx-storage.js';
//
/**/


/* Storage - Configs */
const
/*|*/
webH = (window.innerHeight)
;
/**/


/* Classes - Primary Components */
export const
/*|*/
idx_Internimate = [
    (idx.easeInOut), (idx.gen_Durate),
],
/*|
|*/
idx_GtLever_Cls = [
    (idx.shadow_MDx20),
    //
    ...((idx).tCls_AutoSet({
        sm: [ (idx.idxW_AutoX), ],
    })),
],
idx_GtLinav_Cls = [
    (idx.shadow_MDx20),
    //
    ...((idx).tCls_AutoSet({
        sm: [ (`order-last`), (idx.idxW_AutoX), ],
        md: [
            (idx.flex1), (`order-none`),
            (`size-full`),
        ],
    })),
],
idx_GtSelect_Cls = [
    (idx.shadow_MDx20),
    //
    ...((idx).tCls_AutoSet({
        sm: [ (idx.idxW_AutoX), ],
        md: [ (`col-start-3`), ],
    })),
],
/*|
|*/
idx_MainSearch_Cls = [
    (idx.shadow_MDx20),
    //
],
/*|
|*/
idx_MdViewer_Cls = [
    (idx.shadow_MDx20),
    //
    ...((idx).tCls_AutoSet({
        md: [ (idx.border4), ],
    })),
]
;
/**/


/* Classes - Secondary Components */
export const
/*|*/
gtLvr_BuildAct_Cls = [
    (idx.absolute), (idx.idx_z0),
    (`top-0`), (`left-0`),
    (`w-1/2`), (`h-full`),
    //
    (idx.border), (idx.roundedLG),
    (idx.transiteTransform), ...(idx_Internimate),
    //
    (`comp-smooth`),
],
gtLvr_BuildSides_Cls = [
    (idx.flex), (idx.flex1), (`relative`),
    (idx.idx_z10), (idx.itemsCenter), (idx.justifyCenter),
    //
    (`min-w-0`), (`px-3`),
    (idx.cursorPoint),
],
//
gtSel_BuildCor_Cls = [
    (`inline-block`),
    //
    (idx.transiteTransform),
    ...(idx_Internimate),
    //
    (idx.cursorPoint),
    //
    ...((idx).tCls_AutoSet({
        hover: [ (idx.scale120), ],
        active: [ (idx.scale95), ],
    })),
],
gtSel_BuildBox_Cls = [
    (idx.idx_z99), (idx.absolute),
    //
    (`left-1/2`), (`top-full`),
    (idx.idxW_MaxX), (`min-w-full`),
    //
    (`p-1`), (`mt-2`),
    (idx.border2), (idx.roundedLG),
    //
    (`shadow-lg`),
    //
    (idx.transiteAll), ...(idx_Internimate),
    //
    (`-translate-x-1/2`),
    (`scale-y-0`), (`origin-top`),
    //
    ...((idx).tCls_AutoSet({
        "group-focus-within": [
            (`scale-y-100`),
        ],
    })),
],
    //
gtSel_BuildOpt_Cls = [ (idx.flex),
    (idx.itemsCenter), (idx.justifyCenter),
    //
    (idx.idxW_FullX),
    (`px-4`),(`py-2`), (idx.roundedLG),
    //
    (`transition`),
    ...(idx_Internimate),
    //
    (idx.cursorPoint),
    //
    ...((idx).tCls_AutoSet({
        hover: [ (`scale-100`),
            ((tw).tcRegulate((idx
                .opacity), (90))),
            (`grayscale-25`),
        ],
        active: [ (idx.scale95),
            ((tw).tcRegulate((idx
                .opacity), (100))),
            (`grayscale-0`),
        ],
    })),
],
/*|
|*/
rcPath_SrcLogo_Cls = [
    (idx.transiteTransform),
    ...(idx_Internimate),
    //
    ...((idx).tCls_AutoSet({
        hover: [ (idx.scale120), ],
        active: [ (`scale-90`), ],
    })),
],
//
rcChips_Chipper_Cls = [ (idx.flex),
    (`items-center`), (`gap-1`),
    //
    (`px-2`), (`py-1`),
    //
    (idx.border), (idx.roundedLG),
    //
    (idx.transiteAll), (idx.gen_Durate),
    (`opacity-0`), (`translate-y-1`), (`scale-95`),
    //
    (idx.cursorPoint),
],
    //
rcSrc_MainCompB_Cls = [
    (idx.shadow_MDx20), ((tw).tcRegulate(
        (idx.opacity), (0))),
    (idx.transiteTransform), ...(idx_Internimate),
    //
    (`scale-95`), (`translate-y-6`),
    (idx.pointer_EvNon),
],
rcSrc_ResConbox_Cls = [
    (`flex`), (`flex-col`),
    //
    (`overflow-y-auto`),
    //
    (`w-full`),
    ((tw).tcRegulate((idx.h_MaxY), ((idx)
        .responSize(window.innerHeight))
    )),
    //
    (`no-scrollbar`),
    //
],
rcSrc_ResLists_Cls = [
    (`p-2`), (idx.roundedLG),
    //
    (idx.transiteTransform),
    ...(idx_Internimate),
    //
    (idx.cursorPoint),
    //
    (`theme-smooth`),
],
//
mdView_MdPh_Cls = [ (idx.flex),
    (idx.absolute), (idx.inset0),
    (idx.itemsCenter), (idx.justifyCenter),
    //
    (`text-center`), (idx.roundedLG),
    (idx.fontSemibold),
    //
    (`text-stone-500`),
],
mdView_WaiLoad_Cls = [ (idx.flex),
    (idx.absolute), (idx.inset0), (idx.idx_z99),
    //
    (idx.itemsCenter), (idx.justifyCenter),
    //
    (idx.fontSemibold), (idx.transiteAll),
    (idx.easeInOut), (idx.pointer_EvNon),
]
;
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
