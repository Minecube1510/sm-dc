#!/usr/bin/env js
/* web/js/index/idx-render-src-kit.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsDoc, jsHt,
    } from "../basis.js";
//
import { setLDm_ThemeClass as ldmClasser,
    } from "../set-paging.js";
//
import * as idxStrg from './idx-storage.js';
import * as idxCls from './idx-storage-class.js';
    import { idxMc, idx_FirSearch,
        rscs_Comps as src_ComId,
        } from "./idx-storage.js";
//
import * as cfg from './idx-render-config.js';
import { random_LiSeeder_Files,
    } from "./idx-system-fetch.js";
//
import { srcSt,
    unit_Select_ResItem,
    kit_Update_RestSel,
    } from "./idx-process.js";
//
/**/


/* Renderer - Configs */
export const
/*|*/
idCo_UliRes = (src_ComId.result.list)
;
//
let
comp_UliRes,
src_Cooldown = (false)
;
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
        const li = ((e.target.closest(`li`)));
            if (!(li)) return;
            //
        unit_Select_ResItem((src_Cooldown), (li));
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
    (idxMc.src_Btn).append(
        srcPathBtnIcon);
}
    /** Init-Search-Comp: Search List
     * @param {string[]} proLists
     * @returns {void}
     */
export function init_RcSrc_List (
    proLists,
) {
    const
    /*|*/
    comp_UliRes = ((jsDoc).getId(idCo_UliRes))
        ;
    if (!(proLists)) {
        proLists = (random_LiSeeder_Files());
    }
    //
    (jsMod).setElm((comp_UliRes), {
        textContent: (jsVar.empty),
    });
    //
    if ((proLists.length) === (0)) {
        (comp_UliRes).append(
            (jsMod).makElm((`span`), {
className: ((jsHt).classer([ ...(idxCls.rcSrc_ResLists_Cls),
    (`pointer-events-none`), (`italic`), (`animate-pulse`),
    (`text-center`), (`opacity-70`),
])),
textContent: (
    `Sorry, the search is not availiable here...`),
//
role: (`presentation`),
            }),
        );
        //
        return;
    }
    //
    (proLists).forEach((item, i) => {
        const
        /*|*/
        liComp = ((jsMod).makElm((`li`), {
            id: (``),
            className: ((jsHt).classer(
                idxCls.rcSrc_ResLists_Cls)),
            //
            textContent: (item),
            //
            role: (`option`),
            ariaSelected: (`false`),
        }));
        //
        (liComp).addEventListener((`mouseenter`), (() => {
            (srcSt).srControl = (idxStrg.str_Ms);
            //
            (srcSt).selectIndex = (i);
            (srcSt).hoverIndex = (i);
            //
            kit_Update_RestSel();
        }));
        (liComp).addEventListener((`mouseleave`), (() => {
            (srcSt).srControl = (idxStrg.str_Kb);
            //
            kit_Update_RestSel();
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
//
/**/


/* END */
/**/
