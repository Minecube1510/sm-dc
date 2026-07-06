#!/usr/bin/env js
/* web/js/index/idx-blueprint-0b.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as idxStrg from './idx-storage.js';
    import {
        idx_RcLang as rcLn,
        //
        idxGT_CompId as iGt_S,
        idxGtWait_Comps as iGtComp,
        idxSearchMD_CompId as iScMd,
        //
        mdSrch_AddChips_Cls as addChipCls,
        mdSrch_CrackChip_Cls, idxCompChip,
        //
    } from "./idx-storage.js";
    /*|
  //
|*/
import { get_DocFiles, init_SrcList,
    render_SrcReList,
    } from "./idx-blueprint-0a.js";
    //
import { randomizeSrc,
    //
    } from "./idx-blueprint-2.js";
    //
import { spaRender_SrList,
    //
    } from "./idx-blueprint-2a.js";
import { mdSrc_ChipCrud, mdSrcAuto_Chipper,
    //
    } from "./idx-blueprint-2b.js";
//
/**/


/* Configs */
let comFolders = (new Set());
//
/**/


/* Helper - Inputters * /
    * (GearTool-Switch, GearTool-Input)
*/
    /** Rawpath and Posfile Moder Action
     * @param {() => void} onRawPath
     * @param {() => void} onPosFile
     * @param {() => void} forDefault
     * @param {string} gtS_Mode
     * @returns {void}
     */
export function rppf_Moderact (
    onRawPath, onPosFile, forDefault,
    gtS_Mode = (iGtComp().gtcSwitch.value),
) {
    let rp = (rcLn.switch.rp),
        pf = (rcLn.switch.pf);
    //
    switch (gtS_Mode) {
        case ((jsTx).lower(rp)):
            (onRawPath)?.();
            break;
        case ((jsTx).lower(pf)):
            (onPosFile)?.();
            break;
        default:
            (forDefault)?.();
            break;
    }
}
//
    /** Builds GearTool-switch main element.
     * @param {string} tag
     * @param {string} id
     * @returns {HTMLElement}
     */
export function idxGt_SwtcElm (
    tag, id,
) {
    const elm = ((jsDoc).createElm(tag));
    switch (tag) {
        case (`input`):
            (elm).id = (id);
            (elm).type = (`checkbox`);
            (elm).className = (
                `peer sr-only`);
            break;
        case (`label`):
            (elm).htmlFor = (id);
            (elm).className = (id.className);
            break;
        case (`span`):
            (elm).className = (id.className);
            (elm).textContent = (id.textContent);
            break;
    }
    return (elm);
}
//
/**/


/* Render - Switcher Rawpath-Posfile */
    /** Builds a GearTool-switch element (text).
     * @param {string} textSwtc
     * @param {string} sideSwtc
     * @returns {HTMLSpanElement}
     */
function idxGtComp_SwitchTxt (
    textSwtc, sideSwtc,
) {
    return idxGt_SwtcElm((`span`), {
        className: ((jsHt).classer([
            ...(idxStrg.gt_SwitchText_Cls),
            (`switch-${sideSwtc}`),
        ])),
        textContent: (textSwtc),
    });
}
    /** Builds a GearTool-switch element (background).
     * @param {Object} side
     * @param {string} side.leftSide
     * @param {string} side.rightSide
     * @param {string} side.leftId
     * @param {string} side.rightId
     * @returns {HTMLSpanElement}
     */
export function idxGtComp_Bekgron ({
    leftSide, rightSide,
    leftId = jsVar.empty,
    rightId = jsVar.empty,
}) {
    const bg = idxGt_SwtcElm((`span`), {
        className: ((jsHt).classer(
            idxStrg.gt_SwitchBg_Cls
    ))});
    let txtSides = {
        leftTxt: idxGtComp_SwitchTxt(
            (leftSide), (`left`)),
        rightTxt: idxGtComp_SwitchTxt(
            (rightSide), (`right`)),
    };
    //
    (txtSides).leftTxt.id = (leftId);
    (txtSides).leftTxt.classList.add(`selected`);
        //
    (txtSides).rightTxt.id = (rightId);
    (txtSides).rightTxt.classList.add(`cursor-pointer`);
    //
    (bg).append(
        (txtSides.leftTxt),
        (txtSides.rightTxt)
    );
    return (bg);
}
//
/**/


/* Render - Chipping-Widget Posfile */
    /** Making and Rendering Chips by Get-Data.
     * @param {string[]} forChips
     * @returns {pfChipRes}
     */
export function mdSrc_ScanChips (
    forChips = [],
) {
    const rawVal = ((jsTx).trm(
        iScMd.ftSrch.value)),
        regex = (/[\\/]/);
    let pfChipRes = (((regex)
        .test(rawVal)) ? ((rawVal)
        .split(regex).map((item) => (
            (jsTx).trm(item)))
        .filter((item) => ((item) !== (
            jsVar.empty)))) : (rawVal));
    //
    return (pfChipRes);
}
//
    /** Creating the Chip
     * @param {string} chipLabel
     * @param {string[]} chipText
     * @param {number} chipIdx
     * @returns {HTMLDivElement}
     */
export function mdSrc_CreateChip (
    chipLabel, chipText, chipIdx,
) {
    const { elChip, label, close,
    } = ((jsMod).createEl_Map({
        elChip: (`div`),
        label: (`span`),
        close: (`button`),
    })),
        chippingId = ((prefix) => (
        `${prefix}-${(chipIdx) + (1)}`));
    //
    (elChip).id = chippingId(
        idxCompChip.kitChip);
    (label).id = chippingId(
        idxCompChip.resChip);
    //
    (label).textContent = (chipLabel);
        //
    (close).classList.add(...
        mdSrch_CrackChip_Cls);
    (elChip).className = ((jsHt)
        .classer(addChipCls));
    //
    (elChip).append(label, close);
    //
    //
    (close).onclick = ((e) => {
        mdSrc_ChipCrud((`splitter`),
            (chipText), (chipIdx));
    });
    (label).onclick = (() => {
        mdSrc_ChipCrud((`editting`),
            (chipText), (chipIdx),
            (jsVar.empty), (label));
    });
    //
    return (elChip);
}
    /** Updating the Chip
     * @param {string[]} chipText
     * @param {number} chipIdx
     * @param {HTMLElement} chipElm
     * @returns {void}
     */
export function mdSrc_UpdateChip (
    chipText, chipIdx, chipElm,
) {
    let donEditted = (false);
    const ftSrch = (iScMd.ftSrch),
        syncEdit = (() => {
            chipText[chipIdx] = ((jsTx).trm(
                chipElm.textContent));
            (ftSrch).value = ((jsTx).arr2Str(
                (chipText), (jsVar.slash)));
            //
            spaRender_SrList((true), (false),
                (chipElm.textContent),
                ((value) => { (chipElm)
                    .textContent = (value);
                    //
                    donEditted = (true);
                    finsEdit();
            }));
        }),
        //
        finsEdit = (() => {
            (chipElm).contentEditable = (false);
            //
            if (donEditted) {
                syncEdit();
                mdSrc_RefreshChip(chipText);
            }
            //
            (chipElm).onblur =
            (chipElm).oninput =
            (chipElm).onkeydown = (null);
        });
    //
    (chipElm).contentEditable = (true);
    (chipElm).focus();
    //
    syncEdit();
    //
    (chipElm).oninput = (syncEdit);
    (chipElm).onblur = (finsEdit);
    (chipElm).onkeydown = ((e) => {
        if ((e.key) === (`Enter`)) {
            (e).preventDefault();
            //
            donEditted = (true);
            //
            finsEdit();
        }
    });
}
//
    /** Refreshing Chip and Input
     * @param {string[]} chipText
     * @returns {void}
     */
export function mdSrc_RefreshChip (
    chipText,
) {
    let ftSrch = (iScMd.ftSrch);
    //
    (ftSrch).dispatchEvent(new Event(
        (`input`), { bubbles: (true) },
    ));
    //
    mdSrcAuto_Chipper(chipText);
}
//
/**/


/* Complex AutoCom-fy Posfile-Input Systemic */
/** Get For Complexity-Data
 * @typedef {Object<string, string[]>} DocFiles
 */
//
    /** Special Random Search-Res Listed - Posfile.
     * @param {string[]} getResult
     * @returns {string[]}
     */
export function randomPf_SrcReList (
    getResult,
) {
    return [
        ...randomizeSrc((getResult).filter(
            (v) => ((comFolders).has(v)))),
        ...randomizeSrc((getResult).filter(
            (v) => (!((comFolders).has(v))))),
    ];
}
    /** [Async] Get Data, Processing Data,
     * as Complex-Techinque.
     * @param {DocFiles |
     * Promise<DocFiles>} [getData]
     * @returns {resPressed}
     */
export async function auto_RecievePress (
    getData = (null),
) {
    getData = (await ((getData) ??
        (get_DocFiles())));
    const paths = ((Object)
        .values(getData).flat());
    //
    (comFolders).clear();
    //
    let resPressed = [ ...(new Set(
        (paths).flatMap((path) => {
            const parts = ((path)
                .split(jsVar.slash));
            (parts).slice((0), (-1)).forEach(
                (part) => ((comFolders)
                    .add(part)
            ));
            return (parts);
        })
    )), ];
    (resPressed).sort((a, b) => ((
        (Number((comFolders).has(b)))
        - (Number((comFolders).has(a))))
        || ((a).localeCompare(b))
    ));
    //
    return (resPressed);
}
//
/**/


/* END */
/**/
