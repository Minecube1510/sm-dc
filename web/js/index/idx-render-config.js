#!/usr/bin/env js
/* web/js/index/idx-render-config.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    dirSafe,
    } from "../basis.js";
//
import * as tw from '../tw-css-cls.js';
//
import { ldm_Color, ldm_Data, ldm_Event,
    //
    setLDm_ThemeClass as ldmClasser,
    //
    } from "../set-paging.js";
    /*|
  //
|*/
import * as idxStrg from './idx-storage.js';
import * as idxCls from './idx-storage-class.js';
    import { idxMc,
        //
        gtLang_Ids as gt_LangId,
        //
    } from "./idx-storage.js";
//
/**/


/* Render Configs - Storage */
export const
/*|*/
half10 = (10.5),
translateX = (`translate-x`),
//
translateX_0 = (`${translateX}-0`),
translateX_half10 = (`${translateX}-${half10}`),
translateX_12 = (`${translateX}-12`),
    //
translate_FullX = (`${translateX}-full`),
//
stateLever_Cls = {
    left: [
        (`${translateX_0}`),
        //(`sm:-${translateX_half10}`),
        //(`md:-${translateX_half10}`),
    ],
    right: [
        (`${translate_FullX}`),
        //(`sm:${translateX_half10}`),
        //(`md:${translateX_half10}`),
    ],
},
//
mdView_PhTitle = (
    `Preview-ing the Markdown-Document-File`)
;
/*|
|*/
export const
/*|*/
renderState = {
    isLocked: (false),
    activeIdx: (0),
},
//
idxGtSel_Comps = {
    choose: (null),
    optBox: (null),
    //
    opts: [],
},
idxGtLvr_Comps = {
    active: (gt_LangId.lvrAct),
    sides: {
        left: (gt_LangId.lvrs.rp),
        right: (gt_LangId.lvrs.pf),
    },
}
;
/**/


/* Configs - Vars */
export const
/*|*/
ldmClr_ShadowLight = (`shadow-${ldm_Color.light.bg}`),
ldmClr_ShadowDark = (`shadow-${ldm_Color.dark.bg}`),
//
ldmClr_WhiteLight = (`bg-white`),
ldmClr_BlackDark = (`bg-black`),
//
ldmClr_BgLight = (`bg-${ldm_Color.light.bg}`),
ldmClr_BgDark = (`bg-${ldm_Color.dark.bg}`),
/*|
|*/
idX_LdmColors = {
    lights: {
        text: (`text-${ldm_Color.light.text}`),
        border: (`border-${ldm_Color.light.border}`),
    },
    darks: {
        text: (`text-${ldm_Color.dark.text}`),
        border: (`border-${ldm_Color.dark.border}`),
    },
},
idX_FullLdmColors = {
    lights: [
        ...((Object).values(idX_LdmColors.lights)),
        (ldmClr_BgLight),
    ],
    darks: [
        ...((Object).values(idX_LdmColors.darks)),
        (ldmClr_BgDark),
    ],
},
    //
idx_ldmCustom_ColorCls = {
    lights: {
        border: (`ring-${ldm_Color.light.border}`),
        bg: (ldmClr_WhiteLight),
        shadow: (ldmClr_ShadowDark),
    },
    darks: {
        border: (`ring-${ldm_Color.dark.border}`),
        bg: (ldmClr_BlackDark),
        shadow: (ldmClr_ShadowLight),
    },
},
/*|
|*/
gtSel_LdmOpt_ConCls = {
    lights: [
        ...(idX_FullLdmColors.lights),
        (ldmClr_ShadowDark),
    ],
    darks: [
        ...(idX_FullLdmColors.darks),
        (ldmClr_ShadowLight),
    ],
},
//
srcList_LiClick_LdmCls = {
    lights: [
        (`hover:bg-${ldm_Color.light.hover}`),
        (`hover:text-${ldm_Color.dark.text}`),
        //
        (`active:bg-${ldm_Color.light.active}`),
    ],
    darks: [
        (`hover:bg-${ldm_Color.dark.hover}`),
        (`hover:text-${ldm_Color.light.text}`),
        //
        (`active:bg-${ldm_Color.dark.active}`),
    ],
},
srcList_LiRowed_LdmCls = {
    lights: [
        (`bg-${ldm_Color.light.selected}`),
        (`text-${ldm_Color.dark.text}`),
    ],
    darks: [
        (`bg-${ldm_Color.dark.selected}`),
        (`text-${ldm_Color.light.text}`),
    ],
},
/*|
|*/
idxComp = {
    mGt: (idxMc.m_Gt),
    gtLvr: (idxMc.gtLvr),
    gtNav: (idxMc.gtNav),
    gtSel: (idxMc.gtSel),
    //
    mSrc: (idxMc.mSrc),
    //
    mvMain: (idxMc.mvMain),
},
idx_Remocons = {
    gt: {
        gtLvr: (idxComp.gtLvr),
        gtNav: (idxComp.gtNav),
        gtSel: (idxComp.gtSel),
    },
    src:{
        mSrc: (idxComp.mSrc)
    },
}
//
;
//
/**/


/* Configs - Functions */
    /** Main-Comp-Render: Section Remocon-Geartool
     * @param {Object} ldm_Lists
     * @returns {void}
     */
export function autoRender_Ldm (
    ldm_Lists = {},
) {
    const
    /*|*/
    lightCls = ((Object).values(idX_LdmColors.lights)),
    darkCls = ((Object).values(idX_LdmColors.darks))
        ;
    //
    (Object).values(ldm_Lists).forEach((comp) => {
        (lightCls).forEach((light, i) => {
            ldmClasser((comp), (light), (darkCls[i]));
        });
    });
}
//
    /** Helper Render: GT-Comps
     * @param {Object} gt_SlObj
     * @param {() => {}} gt_Build
     * @returns {Object}
     */
export function autoMap_GtElm (
    gt_SlObj, gt_Build,
) {
    return ((Object).entries(gt_SlObj).map(([ key,
    val, index, ]) => (gt_Build(key, val, index))));
}
//
    /** Helper Render: GT-Select (Option Selected)
     * @param {HTMLElement} gtSelOp
     * @returns {void}
     */
export function gtSel_AutoSeld (
    gtSelOp,
) {
    const
    /*|*/
    isSelected = (((gtSelOp).getAttribute(
        `aria-selected`)) === (`true`));
    //
    ldmClasser((gtSelOp),
        ((isSelected)
            ? (idX_FullLdmColors.darks)
            : (idX_FullLdmColors.lights)
        ), ((isSelected)
            ? (idX_FullLdmColors.lights)
            : (idX_FullLdmColors.darks)
    ));
}
//
    /** Result List Showing Toggler
     * @param {boolean} willing_SrcList
     * @returns {void}
     */
export function toggle_ResultList (
    willing_SrcList,
) {
    const
    /*|*/
    show_ResList_Cls = [
        [ (`translate-y-2`), (`translate-y-4`), ],
        [ (`opacity-0`), (`opacity-100`), ],
        [ (`scale-95`), (`scale-100`), ],
        [ (`pointer-events-none`), (`pointer-events-auto`), ],
    ]
        ;
    (show_ResList_Cls).forEach(([ hideCls, showCls, ]) => {
        (idxMc.src_Res).classList.toggle(
            (hideCls), (!(willing_SrcList)));
        (idxMc.src_Res).classList.toggle(
            (showCls), (willing_SrcList));
    });
}
//
/**/


/* Uji Coba */
//Test...
//
/**/


/* END */
/**/
