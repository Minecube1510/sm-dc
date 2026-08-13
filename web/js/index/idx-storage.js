#!/usr/bin/env js
/* web/js/index/idx-storage.js */

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
/**/


/* Storage - Functions */
    /** Auto Shortcut Tailwind-Plugniter
     * @param {Object.<string, string[]>} twVariers
     * @returns {string[]}
     */
export function tCls_AutoSet (
    twVariers = {}
) {
    return ((Object).entries(twVariers)
        .flatMap(([ variant, cls, ]) => ((tw)
            .tcPlugnite(variant, cls))
    ));
}
//
    /** Auto Sizing by Number
     * @param {number} idx_WebH
     * @returns {number}
     */
export function responSize (
    idx_WebH,
) {
    return ((idx_WebH)
        - (550) - (30) - (8));
}
/**/


/* Storage - Auto Tailwind */
export const
flex = (tw.layout.flex),
//
absolute = (tw.position.absolute),
inset = (tw.position.inset),
z_Index = (tw.position.z),
//
items = (tw.flexGrid.items),
justify = (tw.flexGrid.justify),
//
w_SizeX = (tw.sizing.w),
h_SizeY = (tw.sizing.h),
    //
w_MaxX = ((tw).tcRegulate(
    (`max`), (w_SizeX))),
h_MaxY = ((tw).tcRegulate(
    (`max`), (h_SizeY))),
//
border = (tw.comp.border),
rounded = (tw.shape.rounded),
//
font = (tw.typograph.font),
//
shadow = (tw.effects.shadow),
opacity = (tw.effects.opacity),
//
transition = (tw.transition.transition),
ease = (tw.transition.ease),
duration = (tw.transition.duration),
//
scale = (tw.transform.scale),
//
pointer = (tw.interaction.pointer),
cursor = (tw.interaction.cursor),
/*|
|*/
flex1 = ((tw).tcRegulate((flex), (1))),
    //
inset0 = ((tw).tcRegulate((inset), (0))),
    //
idx_z0 = ((tw).tcRegulate((z_Index), (0))),
idx_z10 = ((tw).tcRegulate((z_Index), (10))),
idx_z99 = ((tw).tcRegulate((z_Index), (99))),
//
itemsCenter = ((tw).tcRegulate(
    (items), (`center`))),
justifyCenter = ((tw).tcRegulate(
    (justify), (`center`))),
//
idxW_AutoX = ((tw).tcRegulate((w_SizeX), (`auto`))),
idxW_FullX = ((tw).tcRegulate((w_SizeX), (`full`))),
idxW_MaxX = ((tw).tcRegulate((w_SizeX), (`max`))),
    //
idxH_AutoY = ((tw).tcRegulate((h_SizeY), (`auto`))),
idxH_FullY = ((tw).tcRegulate((h_SizeY), (`full`))),
idxH_MaxY = ((tw).tcRegulate((h_SizeY), (`max`))),
    //
max_HY_80 = ((tw).tcRegulate(
    (h_MaxY), (80))),
max_HY_160 = ((tw).tcRegulate(
    (h_MaxY), (160))),
max_HY_164 = ((tw).tcRegulate(
    (h_MaxY), (164))),
//
border2 = ((tw).tcRegulate((border), (2))),
border4 = ((tw).tcRegulate((border), (4))),
    //
roundedLG = ((tw).tcRegulate((rounded), (`lg`))),
//
fontSemibold = ((tw).tcRegulate((font), (`semibold`))),
//
shadow_MDx20 = ((tw).tcRegulate(
    (shadow), (`md/20`))),
//
transiteAll = ((tw).tcRegulate(
    (transition), (`all`))),
transiteColors = ((tw).tcRegulate(
    (transition), (`colors`))),
transiteTransform = ((tw).tcRegulate(
    (transition), (`transform`))),
    //
easeOut = ((tw).tcRegulate(
    (ease), (`out`))),
easeInOut = ((tw).tcRegulate(
    (ease), (`in`), (`out`))),
    //
gen_Durate = ((tw).tcRegulate(
    (duration), (200))),
durate_half1 = ((tw).tcRegulate(
    (duration), (150))),
//
scale95 = ((tw).tcRegulate(
    (scale), (95))),
scale120 = ((tw).tcRegulate(
    (scale), (120))),
//
pointer_EvNon = ((tw).tcRegulate(
    (pointer), (`events`), (`none`))),
cursorPoint = ((tw).tcRegulate(
    (cursor), (`pointer`)))
;
/**/


/* Storage - Component ID */
export const
/*|*/
idx_MComp = {
    rc: {  /* Remocon, Remote-Control */
        main: (`idx-remocon`),
        i_Gt: {  /*
            [mc]-OR-[C/c] = [Main Component] OR [Component]
                |
            Linav = "Link (Path) Navigation"
            */
            main: (`idx-rc-geartool`),
            sLever: (`idx-rcgt-lever`),
            c_Lever: (`idx-rcgt-lever-comp`),
            LinNav: (`idx-rcgt-linav`),
            c_Linav: (`idx-rcgt-linav-comp`),
            Select: (`idx-rcgt-select`),
            cSelect: (`idx-rcgt-select-comp`),
        },
        iSrc: {
            main: (`idx-rc-search`),
            R_t: (`idx-rcsc-root`),
            Chp: (`idx-rcsc-chips`),
            Pth: (`idx-rcsc-input`),
            Btn: (`idx-rcsc-btn`),
            Res: (`idx-rcsc-result`),
        },
    },
    mv: {  /* Markdown View */
        main: (`idx-view`),
        mWait: (`idx-view-loading`),
        mBase: (`idx-view-content`),
    },
},
idxMc = ({
    rcMain: ((jsDoc).getId(idx_MComp.rc.main)),
        //
    m_Gt: ((jsDoc).getId(idx_MComp.rc.i_Gt.main)),
            //
    gtLvr: ((jsDoc).getId(idx_MComp.rc.i_Gt.sLever)),
    gtLvrC: (idx_MComp.rc.i_Gt.c_Lever),
    gtNav: ((jsDoc).getId(idx_MComp.rc.i_Gt.LinNav)),
    gtNavC: ((jsDoc).getId(idx_MComp.rc.i_Gt.c_Linav)),
    gtSel: ((jsDoc).getId(idx_MComp.rc.i_Gt.Select)),
    gtSelC: (idx_MComp.rc.i_Gt.cSelect),
        //
    mSrc: ((jsDoc).getId(idx_MComp.rc.iSrc.main)),
            //
    srcRoot: ((jsDoc).getId(idx_MComp.rc.iSrc.R_t)),
    srcChip: ((jsDoc).getId(idx_MComp.rc.iSrc.Chp)),
    srcPath: ((jsDoc).getId(idx_MComp.rc.iSrc.Pth)),
    src_Btn: ((jsDoc).getId(idx_MComp.rc.iSrc.Btn)),
    src_Res: ((jsDoc).getId(idx_MComp.rc.iSrc.Res)),
    //
    mvMain: ((jsDoc).getId(idx_MComp.mv.main)),
        //
    vieWaitM: ((jsDoc).getId(idx_MComp.mv.mWait)),
    viewBase: ((jsDoc).getId(idx_MComp.mv.mBase)),
    /*|
    |*/
    mvPhText: (`idx-view-content-placeholder`),
}),
/*|
|*/
idxGt_Lang = {
    lvr: {
        rp: (`Rawpath`),
        pf: (`Posfile`),
    },
    sel: {
        s: (`Single`),
        c: (`Compose`),
        t: (`Testing`),
    },
},
gtLang_Ids = {
    lvrAct: (idxMc.gtLvrC),
        //
    lvrs: {
        rp: (`rcgt-lever-l`),
        pf: (`rcgt-lever-r`),
    },
    //
    selIt: (idxMc.gtSelC),
    selCo: (`idx-rcgt-select-option`),
        //
    sels:{
        s: (`rcgt-sel-opt-${(jsTx).lower(idxGt_Lang
            .sel.s).slice((0), (1))}`),
        c: (`rcgt-sel-opt-${(jsTx).lower(idxGt_Lang
            .sel.c).slice((0), (1))}`),
        t: (`rcgt-sel-opt-${(jsTx).lower(idxGt_Lang
            .sel.t).slice((0), (1))}`),
    },
},
/*|
|*/
rscs_Comps = {
    search: (idxMc.srcPath),
    result: {
        main: (idxMc.src_Res),
        list: (`rscs-result-lists-content`),
    }
}
;
/**/


/* Storage - Data */
export const
/*|*/
str_Kb = (`keyboard`),
str_Ms = (`mouse`),
//
idx_FirSearch = ((jsTx).upper(`ReadMe`)),
    //
format_Md = (`.md`),
//
autoFile_Md = ((fName) => ((jsTx).arr2Str([
    (fName), (format_Md),
], (jsVar.empty))))
;
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
