#!/usr/bin/env js
/* web/js/index/idx-system-setup.js */

/* Imports */
import { jsVar,
    jsTx, jsDoc, jsCs,
    } from "../basis.js";
//
import * as idxStrg from './idx-storage.js';
    import { idxMc,
        } from "./idx-storage.js";
//
import { render_ViewMd,
    } from "./idx-render.js";
import { toggle_ResultList,
    } from "./idx-render-config.js";
import {
    limit_Fetch_Files,
    validate_Fuzzerch_Files,
    autoRank_Fuzzerch_Files,
    } from "./idx-system-fetch.js";
import {
    srcSt,
    kit_Refresh_ResLists,
    kit_Update_RestSel,
    } from "./idx-process.js";
import { idCo_UliRes,
    init_RcSrc_List,
    } from "./idx-render-src-kit.js";
//
/**/


/* System.Setup - Config */
let
comp_UliRes
;
/**/


/* Search Setup - Features */
    /** Event Feature: Search-Button - Click
     * @param {() => {}} ft_Func1
     * @returns {void}
     */
export function init_SearchButton (
    ft_Func1,
) {
    (idxMc.src_Btn).addEventListener(
    (`click`), (() => { ft_Func1(); }));
}
//
    /** Event Feature: Input-Path - Input
     * @param {HTMLInputElement} srcIn_CompKey
     * @returns {void}
     */
export function init_SearchInput (
    srcIn_CompKey,
) {
    const inputKey = ((jsTx).trm(
        (srcIn_CompKey).value));
    //
    comp_UliRes = ((jsDoc).getId(idCo_UliRes));
    //
    switch (inputKey) {
        case (jsVar.empty):
            (idxMc.viewBase).replaceChildren();
            //
            render_ViewMd();
            //
            init_RcSrc_List();
            toggle_ResultList(true);
            //
            break;
        default:
            const
            /*|*/
            kResults = (
                validate_Fuzzerch_Files(inputKey)),
            scanFiles = (autoRank_Fuzzerch_Files(
                kResults, inputKey)),
                //
            mit_LFiles = (
                limit_Fetch_Files(scanFiles))
                ;
            //
            init_RcSrc_List(mit_LFiles);
            //
            break;
    }
}
    //
    /** Event Feature: Input-Path - Keydown
     * @param {KeyboardEvent} kdEvent
     * @param {() => {}} kdFunc1
     * @returns {void}
     */
export function init_SearchKeyDown (
    kdEvent, kdFunc1,
) {
    //
    switch (kdEvent.key) {
        case (`Enter`):
            kit_Refresh_ResLists();
            //
            if (((srcSt.selectIndex) >= (0)) && ((srcSt
                .selectIndex) < (srcSt.currentRes.length)
            )) {
                (srcSt.currentRes[srcSt
                .selectIndex]).click();
            } else {
                kdFunc1();
            }
            //
            break;
        case (`Escape`):
            toggle_ResultList(false);
            (idxMc.srcPath).blur();
            //
            break;
        case (`ArrowUp`):
            (kdEvent).preventDefault();
            //
            kit_Refresh_ResLists();
                if (!(srcSt.currentRes.length)) break;
                //
            (srcSt).srControl = (idxStrg.str_Kb);
            (srcSt).selectIndex--;
            //
            if ((srcSt.selectIndex) < (0)) { (srcSt)
                .selectIndex = ((srcSt.currentRes
                .length) - (1));
            }
            //
            kit_Update_RestSel();
            //
        break;
        case (`ArrowDown`):
            (kdEvent).preventDefault();
            //
            kit_Refresh_ResLists();
                if (!(srcSt.currentRes.length)) break;
                //
            (srcSt).srControl = (idxStrg.str_Kb);
            (srcSt).selectIndex++;
            //
            if ((srcSt.selectIndex) >= (srcSt
                .currentRes.length)) {
                (srcSt).selectIndex = (0);
            }
            //
            kit_Update_RestSel();
            //
            break;
        default:
            break;
    }
}
//
(window).addEventListener(
    (`idx-search-limit-change`), (() => {
        init_SearchInput(idxMc.srcPath);
}));
//
(window).addEventListener(
    (`idx-rawpath-default-change`), (() => {
        init_SearchInput(idxMc.srcPath);
}));
//
/**/


/* END */
/**/
