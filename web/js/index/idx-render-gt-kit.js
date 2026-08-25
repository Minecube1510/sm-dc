#!/usr/bin/env js
/* web/js/index/idx-render-gt-kit.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsDoc, jsHt,
    } from "../basis.js";
//
import { setLDm_ThemeClass as ldmClasser,
    } from "../set-paging.js";
//
import * as idxCls from './idx-storage-class.js';
    import { idxMc,
        idxGt_Lang as gt_LangCo,
        gtLang_Ids as gt_LangId,
        tCls_AutoSet,
    } from "./idx-storage.js";
//
import * as cfg from './idx-render-config.js';
    import { idxGtSel_Comps,
        idxGtLvr_Comps,
        autoMap_GtElm, gtSel_AutoSeld,
    } from "./idx-render-config.js";
//
/**/


/* Renderer - Configs */
export let
/*|*/
comps_GtSel = (idxGtSel_Comps),
comps_GtLvr = (idxGtLvr_Comps)
;
/**/


/* Index Generate - Main Setups (GT Parts) */
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
        "aria-selected": (jsVar.empty),
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
    (cfg.idxComp.gtSel).classList.add(...(tCls_AutoSet({
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
    sides = (comps_GtLvr.sides)
        ;
    let
    /*|*/
    isActive = (false),
    isFirstBtn = (false),
    isFirstComp = (false),
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


/* END */
/**/
