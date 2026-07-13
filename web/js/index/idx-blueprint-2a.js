#!/usr/bin/env js
/* web/js/index/idx-blueprint-2a.js */

/* Imports */
import { jsVar, jsMod,
    //
    jsTx, jsCs, jsDoc, jsHt,
    //
    } from "../basis.js";
//
import * as idxStrg from './idx-storage.js';
    import {
        md_Data as iMd,
        //
        gtComponter as comperGt,
        //
        idxSearchMD_CompId as iScMd,
        //
        mdCosL_Comp_Cls as lCompCls,
        mdCosD_Comp_Cls as dCompCls,
        //
        gt_SrcRes_Cls as srcResCls,
    } from "./idx-storage.js";
    /*|
  //
|*/
import { srcFilter_Visible, init_SrcList,
    //
    srcSelected, set_SrcSelected,
    srcCurrent,
    //
    gtIn_SrcUpDown, shuffle_SrcReList,
    render_SrcReList,
    //
    } from "./idx-blueprint-0a.js";
    //
import { rppf_Moderact, randomPf_SrcReList,
    //
    } from "./idx-blueprint-0b.js";
//
import * as idxBP1 from './idx-blueprint-1.js';
//
import { randomizeSrc,
    //
    } from "./idx-blueprint-2.js";
    //
import { mdSrcAuto_Chipper,
    rootClicker,
    //
    } from "./idx-blueprint-2b.js";
//
/*|
|*/
import { ldm_Color, ldm_Data, ldm_Event,
    setLDm_ThemeClass as ldmClasser,
} from "../set-paging.js";
/*|
|*/
import { mdVi_Clear,
    //
} from "./idx-process.js";
//
/**/


/* Get-File Searcher Render-Configs */
    /** Spared Rendering Search-List
     * @param {Boolean} showRes
     * @param {Boolean} renderChip
     * @param {string} srcText
     * @param {(
     * value:string, index:number, item:HTMLLIElement,
     * ) => void} [onSelect]
     * @returns {void}
     */
export function spaRender_SrList (
    showRes = (true),
    renderChip = (true),
    srcText = (null),
    onSelect = (null),
) {
    let inSrc = ((jsTx).trm((srcText) ?? (
        iScMd.ftSrch.value)));
    let shiftRes = shuffle_SrcReList(inSrc);
    //
    rppf_Moderact(
        (() => {
            shiftRes = randomizeSrc(shiftRes);
        }),
        (() => {
            shiftRes = randomPf_SrcReList(shiftRes);
            //
            srcFilter_Visible((iScMd
                .idxSrch), (false));
            //
            if (renderChip) {
                mdSrcAuto_Chipper();
            }
        }),
        (() => {
            shiftRes = randomizeSrc(shiftRes);
        }),
    );
    if (!(showRes)) {
        (iScMd.srcRes).replaceChildren();
        return;
    }
    //
    srcFilter_Visible((iScMd.idxSrch),
        ((showRes) && ((inSrc
            .length) > (0)))
    );
    render_SrcReList((shiftRes).slice(
        (0), (11)), (onSelect));
}
    /** Displaying Autocomplete Searchers
     * @returns {
     *   onInput_MdSrc: (
     * event?: Event) => void,
     *   onKeyDown_MdSrc: (
     * event: KeyboardEvent) => void
     * }
     */
export function display_SrcList () {
    const onKeyDown_MdSrc = ((e) => {
        switch (e.key) {
            case (`ArrowDown`):
                (e).preventDefault();
                if ((srcSelected) < ((srcCurrent
                    .length) - (1))) {
                    set_SrcSelected(
                        (srcSelected) + (1));
                }
                gtIn_SrcUpDown();
                break;
            case (`ArrowUp`):
                (e).preventDefault();
                if ((srcSelected) > (0)) {
                    set_SrcSelected(
                        (srcSelected) - (1));
                }
                gtIn_SrcUpDown();
                break;
            //
            case (`Enter`):
        if ((srcSelected) >= (0)) {
            return ((iScMd.srcRes)
                .querySelectorAll(`li`)
                [srcSelected]);
        }
        return (null);
    }});
    const onInput_MdSrc = (() => {
        spaRender_SrList(true);
    });
    //
    return {
        onKeyDown_MdSrc,
        onInput_MdSrc,
    };
}
//
/**/


/* GearTool System - Input Section */
    /** GearTool-Input - Show as Inserted
     * @param {HTMLElement} elm
     * @param {string} text
     * @returns {void}
     */
function gtInput_Insert (
    elm, text,
) {
        (elm).preventDefault();
    let { value,
        selectionStart: slBegin,
        selectionEnd: slEnd,
    } = (elm.target);
    //
    (elm).target.value = (`${value.slice((0), (
        slBegin))}${text}${value.slice(slEnd)}`);
    (elm).target.dispatchEvent(
        new Event((`input`), { bubbles: (true) }));
    //
    (elm).target.setSelectionRange(
        ((slBegin) + (text.length)),
        ((slBegin) + (text.length))
    );
}
//
    /** GearTool-Input Feature-Config Working
     * @param {GearToolInputComp} compGt
     * @returns {GearToolInputConfig}
     */
function gtInput_Config (
    compGt,
) {
    const gtIn_Fix = {
        file0: ((jsTx).upper((compGt
            .defaultFile) ?? (`README`))),
        suFix: ((iMd).fpMado),
    };
    const render = ((v) => {
        v = ((jsTx).trm(v));
        switch (true) {
            case (!(v)):
                return (jsVar.empty);
            case (!(v).endsWith(gtIn_Fix.suFix)):
                v = (`${v}${gtIn_Fix.suFix}`);
        }
        v = (String((v) ?? (jsVar.empty))
            .replace((/\\/g), (jsVar.slash))
        );
        return (`${jsVar.slash}${v}`);
    });
    return { gtIn_Fix, render, };
}
    /** GearTool-Input Feature-System Working
     * @param {HTMLElement} compGt
     * @returns {void}
     */
function gtInput_Sys (
    compGt = {
    ftSrch: (iScMd.ftSrch),
    gtcInput: ((jsDoc).getId(comperGt.cElmIn)),
}) {
    const { gtIn_Fix, render,
    } = gtInput_Config(compGt),
        { ftSrch, gtcInput } = (compGt);
    //
    let sync = (() => {
        (iMd).srcPath = (ftSrch.value);
        (gtcInput).value = render(ftSrch.value);
    });
    //
    (ftSrch).value = (gtIn_Fix.file0);
    (gtcInput).readOnly = (true);
    //
    ldmClasser((ftSrch),
        (`text-${ldm_Color.light.text}`),
        (`text-${ldm_Color.dark.text}`),
    );
    //
    sync();
    //
    (ftSrch).addEventListener((`input`), (sync));
    (ftSrch).addEventListener((`beforeinput`), ((e) => {
            if ((e.data) !== (jsVar.bSlash)) return;
        //
        gtInput_Insert((e), (jsVar.slash));
    }));
    (ftSrch).addEventListener((`paste`), ((e) => {
        gtInput_Insert((e), (((e).clipboardData) || (
            (window).clipboardData)).getData(`text`)
            .replace((/\\/g), (jsVar.slash)));
    }));
}
//
/**/


/* END */
    /** Compiler the Inputters Process
     * @returns {void}
     */
export function compiling_Inputters () {
    gtInput_Sys();
    //
    (jsMod).setElm((iScMd.srcRes), {
        className: ((jsHt)
            .classer(srcResCls)),
    });
}
    /** [Async] Finalize - For RawPath Feature
     * @returns {void}
     */
export async function feature_RawPath () {
    await init_SrcList();
    //
    compiling_Inputters();
    //
    if (rootClicker) {
        (iScMd.inRoot).removeEventListener(
            (`click`), (rootClicker),
        );
    }
    //
}
//
/**/


/* END */
/**/
