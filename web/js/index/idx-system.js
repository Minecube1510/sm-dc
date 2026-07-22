#!/usr/bin/env js
/* web/js/index/idx-system.js */

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
        idx_FirSearch, autoFile_Md,
        //
        idx_MComp as cIdx,
        //
    } from "./idx-storage.js";
//
import { 
    comps_GtSel as gtSelC,
    comps_GtLvr as gtLvrC,
} from "./idx-render.js";
//
    import { gtSel_AutoSeld,
        //
        srcList_LiClick_LdmCls,
        srcList_LiRowed_LdmCls,
    } from './idx-render-config.js';
    import {
        init_RcGt_LeverSides,
    } from './idx-render-kit.js';
//
import * as sysF from "./idx-system-fetch.js";
import {
    idx_MainLists as getLists,
    idx_10TriaLists as triaLists,
    //
    } from "./idx-system-fetch.js";
//
/**/


/* Systemate Core - Storage */
const
/*|*/
vieWaitM = (idxMc.vieWaitM),
/*|
|*/
opacity = (tw.effects.opacity),
//
opacity0 = ((tw).tcRegulate((opacity), (0))),
/*|
|*/
mdView_Transer_Cls = [
    (`bg-white/70`), (`opacity-100`),
    (`backdrop-blur-sm`),
]
;
/*|
|*/
export const
/*|*/
delay_MdvWait = ((ms) => (new Promise(
(res) => (setTimeout(res, ms))))),
noSpam_SrcTime = (5000)
;
//
/**/


/* Syncronize - Elements */
    /** Syncronizing - [Index-GT-Lever]=[Index-Rc-Search]
     *
     * Rawpath-Posfile Switch-Mode Chips Configs.
     *
     * @returns {void}
     */
export function valChips_GtSrc_Lever () {
    for (const [ key, elm, ] of ((Object).entries(
        gtLvrC))) { if (!(elm)) return; }
    //
    let
    /*|*/
    firstActive = (null),
    currentMode = (null)
        ;
    //
    (Object).values(gtLvrC.sides).forEach((id) => {
        const btn = ((jsDoc).getId(id));
            if (!(btn)) return;
        //
        (btn).addEventListener((`click`), (() => {
            init_RcGt_LeverSides(btn);
            //
            if ((currentMode) !== (btn.textContent)) {
                currentMode = (btn.textContent);
                //
                (jsCs).log(`Change to Mode: ${
                    currentMode}`);
            }
        }));
        //
        if (((firstActive) === (null)) && (((btn)
            .getAttribute(`aria-selected`)
        ) === (`true`))) {
            firstActive = (btn);
            currentMode = (firstActive.textContent);
            //
            (jsCs).log(`First in Mode: ${
                currentMode}`);
        }
    });
    //
    // Later...
    //
}
    /** Syncroning - [Index-Gt-Linav]=[Index-Rc-Search]
     *
     * Full-Path Searcher for Linking Navigation.
     *
     * @returns {void}
     */
export function linkPath_GtSrc_LiNav () {
    let srcPath = ((jsTx).trm(
        idxMc.srcPath.value));
    //
    (jsMod).setElm((idxMc.gtNavC), {
        value: ((srcPath)
            ? (autoFile_Md(srcPath))
            : (jsVar.slash)),
    });
}
    /** Syncronize Mode - [Index-Gt-Select]=[MD-Viewer-Article]
     *
     * Select Viewing Modes for MD-Viewer-Article.
     *
     * @returns {void}
     */
export function viewMode_GtArtic_Select () {
        if ((!(gtSelC.choose)) || (!(gtSelC.optBox))) return;
        //
    (gtSelC.opts).forEach((opt) => {
        (opt).addEventListener((`click`), (() => {
            (jsMod).setElm((gtSelC.choose), {
                textContent: (opt.textContent),
                value: ((jsTx).lower(opt.value)),
            })
            //
            (gtSelC.opts).forEach((btn) => {
                (btn).setAttribute(
                    (`aria-selected`), (`false`));
                //
                (btn).classList.remove(`selected`);
                gtSel_AutoSeld(btn);
            });
            //
            (opt).setAttribute((`aria-selected`), (`true`));
            //
            (opt).classList.add(`selected`);
            gtSel_AutoSeld(opt);
            //
            // Sinkronisasi dengan sistem lain
            // Later...
        }));
    });
}
//
    /** Markdown Loading Autofy
     * @param {string} mdlwMode
     * @param {string} mdvPhText
     * @returns {void}
     */
export function loadWait_Markdown_Viewer (
    mdlwMode, mdvPhText = (jsVar.empty),
) {
    const
        mdv_WaiText = ((jsMod).makElm((`span`), {
textContent: (mdvPhText),
className: (`animate-pulse`),
    }))
    ;
    switch (mdlwMode) {
        case (`show`):
            (vieWaitM).classList.remove(opacity0);
            (vieWaitM).classList.add(
                ...(mdView_Transer_Cls));
            //
            setTimeout(() => {
                (vieWaitM).append(mdv_WaiText);
            }, (100))
            //
            break;
        case (`hide`):
            (vieWaitM).classList.remove(
                ...(mdView_Transer_Cls));
            (vieWaitM).classList.add(opacity0);
            //
            (jsMod).setElm((vieWaitM), {
                textContent: (jsVar.empty),
            });
            //
            break;
        default:
            throw (new TypeError(
                `Unknown mdWait mode: "${mode}".`));
    }
}
//
    /** Delay Waiting for Anti-Spam.
     * @param {boolean} is_LetSetle
     * @param {(state: boolean) => void} idx_Settler
     * @param {() => void} idx_ActDoes
     * @param {number} idx_HolDate
     * @returns {void}
     */
export function mdView_SearchList_Cooldown (
    is_LetSetle = (false),
    idx_Settler = (() => (true)),
    idx_ActDoes = (() => {}),
    idx_HolDate = (0),
) {
        if (is_LetSetle) return;
    idx_Settler(true);
    idx_ActDoes();
    //
    setTimeout(() => {
        idx_Settler(false);
    }, (idx_HolDate));
}
//
/**/


/* Syncronize - Finalize */
    /** Index System - Finals Syncronizing (Render and Process)
     * @returns {void}
     */
export function idxSyncron_System () {
    valChips_GtSrc_Lever();
    linkPath_GtSrc_LiNav();
    viewMode_GtArtic_Select();
}
//
/**/


/* Uji Coba */
//Testing...
//
/**/


/* END */
/**/
