#!/usr/bin/env js
/* web/js/index/idx-render-kit.js */

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
    import { idxMc, idx_FirSearch,
        //
        idxGt_Lang as gt_LangCo,
        //
        idx_MComp as cIdx,
        gtLang_Ids as gt_LangId,
        rscs_Comps as src_ComId,
        //
        tCls_AutoSet,
    } from "./idx-storage.js";
//
import { noSpam_SrcTime,
    //
    linkPath_GtSrc_LiNav,
    mdView_SearchList_Cooldown,
    //
    } from "./idx-system.js";
import { 
    limit_Fetch_Files,
    shuffle_Random_Files,
    //
    idx_MainLists as getLists,
    idx_10TriaLists as triaLists,
    //
    random_LiSeeder_Files,
    //
    } from "./idx-system-fetch.js";
//
import * as cfg from './idx-render-config.js';
    import { idxGtSel_Comps, idxGtLvr_Comps,
        //
        autoMap_GtElm, gtSel_AutoSeld,
        //
        toggle_ResultList,
    } from "./idx-render-config.js";
//
import { render_MdFile,
    select_ResultItem,
    //
    } from "./idx-process.js";
//
/**/


/* Renderer - Configs */
export let
/*|*/
comps_GtSel = (cfg.idxGtSel_Comps),
comps_GtLvr = (cfg.idxGtLvr_Comps),
//
src_Cooldown = (false)
;
//
export const
idCo_UliRes = (src_ComId.result.list)
;
/**/


/* Index Generate - Main Setups (GT Parts) */
/** GT-Select Builder
 * @typedef {Object} GtSelectBuild
 * @property {HTMLButtonElement} gtSelCom_Choose
 * @property {HTMLDivElement} gtSelCom_OptBox
 */
//
    /** Build-GT-Comp: Geartool - Levers
     * @returns {HTMLButtonElement{}}
     */
export function build_RcGt_Lever () {
    const
    /*|*/
    slider = ((jsMod).makElm((`div`), {
        id: (gt_LangId.lvrAct),
        className: ((jsHt).classer(
            idxCls.gtLvr_BuildAct_Cls)),
        "aria-selected": (`jsVar.empty`),
    })),
    sides = (autoMap_GtElm((gt_LangCo.lvr), ((key,
        text, index) => ((jsMod).makElm((`button`), {
            id: ((gt_LangId).lvrs[key]),
            className: ((jsHt).classer(idxCls
                .gtLvr_BuildSides_Cls)),
            textContent: (text),
            value: ((jsTx).lower(text)),
            "aria-selected": (jsVar.empty),
    })))));
    //
    ldmClasser((slider), (cfg.ldmClr_BgLight),
        (cfg.ldmClr_BgDark));
    //
    return {
        activate: (slider),
        //
        left: (sides[0]),
        right: (sides[1]),
    };
}
//
    /** Build-GT-Comp: Geartool - Select's Options
     * @returns {HTMLButtonElement[]}
     */
export function build_RcGt_SelOpts () {
    return (autoMap_GtElm((gt_LangCo.sel), ((key,
        text, index) => ((jsMod).makElm((`button`), {
            id: ((gt_LangId).sels[key]),
            className: ((jsHt).classer(idxCls
                .gtSel_BuildOpt_Cls)),
            textContent: (text),
            value: ((jsTx).lower(text)),
        })))
    ));
}
    /** Build-GT-Comp: Geartool - Select's Core (Main and Cores)
     * @param {HTMLButtonElement[]} gtOpts
     * @returns {GtSelectBuild}
     */
export function build_RcGt_Select (
    gtOpts,
) {
    const
    /*|*/
    firstOption = (gtOpts[0]),
    gtSelChoose = ((jsMod).makElm((`button`), {
        id: (gt_LangId.selIt),
        className: ((jsHt).classer(idxCls.gtSel_BuildCor_Cls)),
        textContent: (((firstOption)?.textContent) ?? (jsVar.empty)),
        value: (((firstOption)?.value) ?? (jsVar.empty)),
    })),
    gtSelOptBox = ((jsMod).makElm((`div`), {
        id: (gt_LangId.selCo),
        className: ((jsHt).classer(idxCls.gtSel_BuildBox_Cls)),
        //
    }));
    //
    (gtSelOptBox).append(...(gtOpts));
    //
    (cfg.idxComp.gtSel).replaceChildren(
        gtSelChoose, gtSelOptBox);
    //
    (comps_GtSel).choose = (gtSelChoose);
    (comps_GtSel).optBox = (gtSelOptBox);
    //
    return {
        gtSelCom_Choose: (comps_GtSel.choose),
        gtSelCom_OptBox: (comps_GtSel.optBox),
    };
}
/*|
|*/
    /** Artist-GT-Comp: Geartool - Selects Painting Classings
     * @param {HTMLDivElement} gtSelCom_OptBox
     * @returns {void}
     */
export function paint_RcGt_Selects (
    gtSelCom_OptBox,
) {
    const
    /*|*/
    gt_AutofyCls = [
        [ (cfg.idxComp.gtLvr), (idxCls.idx_GtLever_Cls), ],
        [ (cfg.idxComp.gtNav), (idxCls.idx_GtLinav_Cls), ],
        [ (cfg.idxComp.gtSel), (idxCls.idx_GtSelect_Cls), ],
    ]
        ;
    (idxMc.m_Gt).classList.add(...(tCls_AutoSet({
        md: [ (`flex`), (`items-center`), ],
    })));
    (idxMc.gtSel).classList.add(...(tCls_AutoSet({
        md: [ (`w-28`), ],
    })));
        //
    (gt_AutofyCls).forEach(([ elm, cls, ]) => {
        (elm).classList.add(...cls);
    });
    (Object).values(cfg.idx_Remocons.gt).forEach((elm) => {
        ldmClasser((elm),
            ((Object).values(cfg.idx_ldmCustom_ColorCls.lights)),
            ((Object).values(cfg.idx_ldmCustom_ColorCls.darks))
        );
    });
    //
    ldmClasser((gtSelCom_OptBox), (cfg.gtSel_LdmOpt_ConCls
        .lights), (cfg.gtSel_LdmOpt_ConCls.darks));
}
/*|
|*/
    /** Init-GT-Comp: Geartool - Selects Initalizers
     * @param {HTMLDivElement} gtLvrActive
     * @returns {void}
     */
export function init_RcGt_LeverSides (
    gtLvrActive,
) {
    const
    /*|*/
    sides = (comps_GtLvr.sides),
    //
    leverMap = [ (`left`), (`right`), ]
        ;
    let
    /*|*/
    isActive = (false),
    //
    isFirstBtn = (false),  // Button Pertama (Pilihan Kiri)
    isFirstComp = (false),  // Komponen Pertama (Slider Btn)
    //
    activate = (comps_GtLvr.active)
        ;
    isFirstComp = ((gtLvrActive) === (
        cfg.idxComp.gtLvr.firstChild));
    //
    (Object).values(sides).forEach((id, idx) => {
        const getBtn = ((jsDoc).getId(id));
            if (!(getBtn)) return;
            //
        isFirstBtn = ((idx) === (cfg.renderState.activeIdx));
        isActive = ((isFirstComp) ? (isFirstBtn)
            : ((getBtn) === (gtLvrActive)));
        //
        if (isActive) { (cfg).renderState
            .activeIdx = (idx); }
        //
        (getBtn).setAttribute((`aria-selected`),
            (String(isActive)));
    });
    //
    activate = ((jsDoc).getId(activate));
        if (!(activate)) return;
    //
    (Object).entries(cfg.stateLever_Cls).forEach(
        ([ key, classes, ], idx) => {(classes).forEach(
            (cls) => { (activate).classList.toggle((cls),
            ((idx) === (cfg.renderState.activeIdx)));
        });
    });
}
//
    /** Init-GT-Comp: Geartool - Selects Initalizers
     * @param {HTMLDivElement} gtSelCompChoose
     * @param {HTMLButtonElement[]} gtSelCompOpts
     * @returns {void}
     */
export function init_RcGt_Selects (
    gtSelCompChoose, gtSelCompOpts,
) {
    (gtSelCompChoose).addEventListener((`click`),
        (() => { if (cfg.renderState.isLocked) return;
            (cfg).renderState.isLocked = (true);
            //
            setTimeout(() => {
                (cfg).renderState.isLocked = (false);
            }, (1500));
    }));
    //
    (gtSelCompOpts).forEach((btn, i) => {
        (btn).setAttribute((`aria-selected`), (
        ((i) === (0)) ? (`true`) : (`false`)));
        //
        gtSel_AutoSeld(btn);
    });
}
//
/**/


/* Index Generate - Main Setups (Searchs Parts) */
    /** Build-Search-Comp: Search List
     * @returns {void}
     */
export function build_RcSrc_List () {
    const
    /*|*/
    leadList = ((jsMod).makElm((`ul`), {
        id: (idCo_UliRes),
        className: ((jsHt).classer(
            idxCls.rcSrc_ResConbox_Cls)),
        //
        textContent: (`Ini konten-an Search Result`),
    }))
        ;
    //
    (leadList).addEventListener((`click`), ((e) => {
        const li = ((e).target.closest(`li`));
            if (!(li)) return;
            //
        select_ResultItem((src_Cooldown), (li));
    }));
    //
    (idxMc.src_Res).append(leadList);
}
/*|
|*/
    /** Artist-Search-Comp: Search Pather
     * @returns {void}
     */
export function paint_RcSrc_Path () {
    (idxMc.src_Btn).classList.add(...
        (idxCls.rcPath_SrcLogo_Cls));
    (cfg.idxComp.mSrc).classList.add(...
        (idxCls.idx_MainSearch_Cls));
    //
    (idxMc.src_Btn).classList.remove(`border`);
    //
    ldmClasser((cfg.idxComp.mSrc),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.lights)),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.darks)),
    );
}
    /** Artist-Search-Comp: Search List
     * @returns {void}
     */
export function paint_RcSrc_List () {
    (idxMc.src_Res).classList.add(...
        (idxCls.rcSrc_MainCompB_Cls));
    //
    ldmClasser((idxMc.src_Res),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.lights)),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.darks)),
    );
}
/*|
|*/
    /** Init-Search-Comp: Search Pather
     * @param {HTMLDivElement} srcPathBtnIcon
     * @returns {void}
     */
export function init_RcSrc_Path (
    srcPathBtnIcon,
) {
    (jsMod).setElm((idxMc.srcPath), {
        value: (idx_FirSearch),
    });
    (idxMc.src_Btn).append(
        srcPathBtnIcon);
}
    /** Init-Search-Comp: Search List
     * @returns {void}
     */
export function init_RcSrc_List () {
    const
    /*|*/
    proLists = (random_LiSeeder_Files()),
/*
    (getLists),
    (random_LiSeeder_Files()),
*/
    comp_UliRes = ((jsDoc).getId(idCo_UliRes))
        ;
    (jsMod).setElm((comp_UliRes), {
        textContent: (jsVar.empty),
    });
    //
    (shuffle_Random_Files(proLists)).forEach((item) => {
        const liComp = ((jsMod).makElm((`li`), {
            id: (``),
            className: ((jsHt).classer(
                idxCls.rcSrc_ResLists_Cls)),
            //
            textContent: (item),
        }));
        //
        ldmClasser((liComp),
            (cfg.srcList_LiClick_LdmCls.lights),
            (cfg.srcList_LiClick_LdmCls.darks),
        );
        //
        (comp_UliRes).append(liComp);
    });
    //
}
//
/**/


/* Uji Coba */
//Test...
//(jsCs).log(ldm_Color.light.border);
//
/**/


/* END */
/**/
