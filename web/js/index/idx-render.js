#!/usr/bin/env js
/* web/js/index/idx-render.js */

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
    webComp,
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
        idx_MComp as cIdx,
        gtLang_Ids as gt_LangId,
        rscs_Comps as src_ComId,
        //
    } from "./idx-storage.js";
//
import * as cfg from './idx-render-config.js';
import * as kit from './idx-render-kit.js';
    import { idxGtSel_Comps, idxGtLvr_Comps,
        //
        autoRender_Ldm, gtSel_AutoSeld,
    } from "./idx-render-config.js";
//
/**/


/* Renderer - Configs */
const
/*|*/
idCo_UliRes = (src_ComId.result.list)
;
//
let
comp_UliRes
;
//
export let
/*|*/
comps_GtSel = (cfg.idxGtSel_Comps),
comps_GtLvr = (cfg.idxGtLvr_Comps)
;
/**/


/* Renderer - Gathers */
    /** Main-Comp-Render: Section Remocon-Geartool
     * @returns {void}
     */
export function render_Rmcn_Gts () {
    (comps_GtSel).opts = (
        (kit).build_RcGt_SelOpts());
    //
    const
    /*|*/
    gtSelComp_Opts = (comps_GtSel.opts),
    //
    gtLvrComps = ((kit).build_RcGt_Lever()),
        //
    { gtSelCom_Choose, gtSelCom_OptBox, } = (
        (kit).build_RcGt_Select(gtSelComp_Opts))
        ;
    (cfg.idxComp.gtLvr).replaceChildren(
        (gtLvrComps.activate),
        //
        (gtLvrComps.left),
        (gtLvrComps.right),
    );
    (kit).init_RcGt_LeverSides(
        gtLvrComps.activate);
    //
    (kit).paint_RcGt_Selects(gtSelCom_OptBox);
    (kit).init_RcGt_Selects(
        gtSelCom_Choose, gtSelComp_Opts);
}
    /** Main-Comp-Render: Section Remocon-Search
     * @returns {void}
     */
export function render_RcSrc () {
    const
    /*|*/
    btnIcon = ((jsMod).setElm(((jsDoc).creatElm(
    `span`)), { className: (`bi bi-search`), }))
        ;
    (kit).paint_RcSrc_Path();
    (kit).init_RcSrc_Path(btnIcon);
    //
    (kit).build_RcSrc_List();
    (kit).paint_RcSrc_List();
    //
}
    /** Main-Comp-Render: Display Markdown-View
     * @returns {void}
     */
export function render_ViewMd () {
    const
    /*|*/
    phViewMd = ((jsMod).makElm((`span`), {
        id: (idxMc.mvPhText),
        className: ((jsHt).classer(
            idxCls.mdView_MdPh_Cls)),
        textContent: (cfg.mdView_PhTitle),
    }))
        ;
    (jsMod).setElm((idxMc.vieWaitM), {
        className: ((jsHt).classer(
            idxCls.mdView_WaiLoad_Cls)),
    });
    //
    (cfg.idxComp.mvMain).classList.add(...
        (idxCls.idx_MdViewer_Cls));
    //
    (idxMc.viewBase).append(phViewMd);
}
/*|
|*/
    /** Index Auto Renderer - Main Components
     * @returns {void}
     */
function idxRender_MainCom () {
    autoRender_Ldm(cfg.idxComp);
    //
    render_Rmcn_Gts();
    render_RcSrc();
    render_ViewMd();
    //
}
//
/**/


/* Renderer - System */
    /** Index Auto Renderer - Paging System
     * @returns {void}
     */
function idxRender_SysPage () {
    autoRender_Ldm(webComp);
    //
    (Object).values(webComp).forEach((comp) => {
        (comp).classList.add(`comp-smooth`);
    });
    //
}
//
/**/


/* Renderer - Finalize */
    /** Index Renderer - Auto RenDraw (Rendering and Draw).
     * @returns {void}
     */
export function idxRender_AutoDraw () {
    const
    /*|*/
    comp_UliRes = ((jsDoc).getId(idCo_UliRes)),
    //
    ldmSyncs = [
    [ (gt_LangId.selCo),
        (cfg.gtSel_LdmOpt_ConCls.lights),
        (cfg.gtSel_LdmOpt_ConCls.darks),
    ],
    [ (comps_GtLvr.active),
        (cfg.ldmClr_BgLight),
        (cfg.ldmClr_BgDark),
    ],
    [ (idxMc.src_Res),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.lights)),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.darks)),
    ], ]
        ;
    idxRender_MainCom();
    idxRender_SysPage();
    //
    (ldm_Event).addEventListener((`themechange`), (() => {
        const
        /*|*/
        lastFocus = (document.activeElement)
            ;
        [ (webComp), (cfg.idxComp),
        ].forEach(autoRender_Ldm);
        //
(Object).values(cfg.idx_Remocons).forEach((group) => {
    (Object).values(group).forEach((elm) => { ldmClasser((elm),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.lights)),
        ((Object).values(cfg.idx_ldmCustom_ColorCls.darks)),
    ); });
});
        //
        (comps_GtSel.opts).forEach((btn) => {
                gtSel_AutoSeld(btn);
        });
        (ldmSyncs).forEach(([ id, light, dark, ]) => {
            ldmClasser(((id instanceof Element) ? (id)
                : (jsDoc.getId(id))), (light), (dark));
        });
        //
        [ ...((idxMc.src_Res).querySelectorAll
            (`li`)), ].forEach((list) => {
                //
            ldmClasser((list),
                (cfg.srcList_LiClick_LdmCls.lights),
                (cfg.srcList_LiClick_LdmCls.darks),
            );
            //
            if ((list.ariaSelected) === (`true`)) {
                ldmClasser((list),
                    (cfg.srcList_LiRowed_LdmCls.lights),
                    (cfg.srcList_LiRowed_LdmCls.darks),
                );
            }
        });
        //
        if (lastFocus instanceof HTMLElement) {
            (lastFocus).focus();
        }
    }));
    //
}
//
(window).addEventListener((`resize`), (() => {
    let
    /*|*/
    inSize, inCls
        ;
    const
    /*|*/
    webH = (window.innerHeight)
        ;
    comp_UliRes = ((jsDoc).getId(idCo_UliRes));
        if (!(comp_UliRes)) return;
        //
    [ ...(comp_UliRes.classList) ]
        .filter((cls) => ((cls)
            .startsWith(`max-h-`)))
        .forEach((cls) => ((comp_UliRes)
            .classList.remove(cls)));
    //
    inCls = ((num) => ((tw).tcRegulate(
        (idxStrg.h_MaxY), (num))));
    inSize = ((webH) - (830) - ((40) - (4)));
    //
    if ((inSize) < (0)) {
        (comp_UliRes).classList
            .add(inCls(80));
    } else {
        (comp_UliRes).classList
            .add(inCls(inSize));
    }
}));
//
/**/


/* Uji Coba */
//Test...
//
/**/


/* END */
/**/
