#!/usr/bin/env js
/* web/js/index/idx-blueprint-2b.js */

/* Imports */
import { jsVar,
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
        mdSrch_PfChipy_Cls as pfChipCls,
        //
    } from "./idx-storage.js";
    /*|
  //
|*/
import { get_DocFiles, init_SrcList,
    //
    } from "./idx-blueprint-0a.js";
    //
import { mdSrc_ScanChips,
    //
    idxGt_SwtcElm, idxGtComp_Bekgron,
    //
    mdSrc_CreateChip, mdSrc_UpdateChip,
    mdSrc_RefreshChip,
    //
    auto_RecievePress,
    //
    } from "./idx-blueprint-0b.js";
//
import { randomizeSrc,
    //
    } from "./idx-blueprint-2.js";
//
import { spaRender_SrList,
    //
    } from "./idx-blueprint-2a.js";
//
/**/


/* Helper and Configs */
export let
    rootClicker = (null);
//
/**/


/* Comp Geartool - Switch */
    /** Controller of GearTool-Switch.
     * @param {Object} ctrlSwitch
     * @param {HTMLInputElement} ctrlSwitch.input
     * @param {HTMLSpanElement} ctrlSwitch.bg
     * @returns {void}
     */
function idxGtCtrl_Switch ({
    input, bg,
}) {
    const sides = [{
        elm: bg.querySelector(`.switch-left`),
        value: false,
    }, {
        elm: bg.querySelector(`.switch-right`),
        value: true,
    }, ];
    let syncSides = (() => {(sides)
        .forEach(({ elm, value }) => {
            let inSelected = (
                (input.checked) === (value)
            );
            (elm).classList.toggle(
                (`selected`), (inSelected));
            (elm).classList.toggle(
                (`cursor-pointer`), (!(inSelected)));
            //
            if (inSelected) {
                (input).value = ((jsTx).lower(
                    (jsTx).trm(elm.textContent)
                ));
            }
        });
    });
    //
    (sides).forEach(({ elm, value }) => {
        (elm).addEventListener((`click`), ((ev) => {
            (ev).preventDefault();
            (ev).stopPropagation();
                if ((input.checked) === (value)) return;
            (input).checked = (value);
            (input).dispatchEvent(new Event(`change`));
        }));
    });
    //
    (input).addEventListener(
        (`change`), (syncSides));
    syncSides();
}
    /** Comping a "toggle switch-texted" comp.
     * @param {Object} compSwitch
     * @param {string} compSwitch.id
     * @param {string} compSwitch.left
     * @param {string} compSwitch.right
     * @param {string} lid
     * @param {string} rid
     * @returns {HTMLDivElement}
     */
export function idxGtc_CompSwitch ({
    id, left, right,
    lid = jsVar.empty,
    rid = jsVar.empty,
}) {
    const box = (iGt_S.gtSwitch),
        input = idxGt_SwtcElm((`input`), (id)),
        label = idxGt_SwtcElm((`label`), (id)),
        bg = idxGtComp_Bekgron({
            leftSide: (left),
            leftId: (lid),
            rightSide: (right),
            rightId: (rid),
        });
    //
    (label).className = (`relative inline-block`);
    (label).append(bg);
    (box).replaceChildren(input, label);
    //
    idxGtCtrl_Switch({ input, bg, });
}
//
/**/


/* Chipping-Widget Posfile Systemics */
    /** Chip CRUD System
     * @param {
     * `generate`|
     * `editting`|
     * `splitter`} chipMethod
        *
     * [C = Generate], [U = Editting], [D = Splitter]
        *
     * @param {string[]} chipText
     * @param {number} chipIdx
     * @param {string} chipVal
     * @param {HTMLElement} chipElm
     * @returns {void}
     */
export function mdSrc_ChipCrud (
    chipMethod, chipText,
    chipIdx = (-1),
    chipVal = (jsVar.empty),
    chipElm = (null),
) {
    const ftSrch = (iScMd.ftSrch);
    //
    switch (chipMethod) {
        case (`generate`):
            (chipText).push(chipVal);
            //
            break;
        case (`editting`):
            mdSrc_UpdateChip(chipText,
                chipIdx, chipElm);
            //
            return;
        case (`splitter`):
            const rawVal = ((jsTx).trm(ftSrch.value));
            let onlyChip = ((rawVal).endsWith(jsVar.slash));
                (chipText).splice((chipIdx), (1));
            (ftSrch).value = ((!(chipText.length))
                ? (((onlyChip) ? ((jsTx).trm((rawVal)
                    .slice((0), (-1)))) : (jsVar.empty)))
                : (((chipText.length) === (1)) ? ((jsTx)
                    .trm(chipText[0])) : ((jsTx).arr2Str(
                        (chipText), (jsVar.slash)))));
            //
            break;
    }
    if ((chipMethod) !== (`splitter`)) {
        ftSrch.value = ((jsTx).arr2Str(
            (chipText), (jsVar.slash)));
    }
    //
    mdSrc_RefreshChip(chipText);
}
    /** Chips-Adder for Pf-Search-Result.
     * @param {string[]} chipText
     * @returns {void}
     */
export function mdSrcAuto_Chipper (
    chipText = (mdSrc_ScanChips()),
) {
    const srChip = (iScMd.srChip),
        ftSrch = (iScMd.ftSrch);
    //
    (srChip).innerHTML = (jsVar.empty);
    (ftSrch).readOnly = (false);
    //
    if (!(Array).isArray(chipText)) {
        (ftSrch).classList.remove(...pfChipCls);
        (ftSrch).removeAttribute(`style`);
        //
        (idxStrg.gt_Rooter_Cls).forEach(
            (cls) => { (iScMd.inRoot)
                .classList.remove(cls);
        });
        //
        return;
    }
    //
    (chipText).forEach((textVal, idxVal) => {
            if ((textVal) === (jsVar.empty)) return;
        (srChip).appendChild(mdSrc_CreateChip(
            textVal, chipText, idxVal));
    });
    //
    let hasChip = (((srChip).childElementCount) > (0));
    //
    //(ftSrch).classList.toggle((pfChipCls[0]), (hasChip));
    (pfChipCls).forEach((cls) => { (ftSrch)
        .classList.toggle(cls, hasChip);
    });
    //
    switch (hasChip) {
        case (true):
            (ftSrch).style.color = (`transparent`);
            (ftSrch).style.caretColor = (`currentColor`);
            (ftSrch).readOnly = (true);
            //
            break;
        default:
            (ftSrch).removeAttribute(`style`);
            (ftSrch).readOnly = (false);
            //
            break;
    }
    //
    (idxStrg.gt_Rooter_Cls).forEach(
        (cls) => { (iScMd.inRoot)
            .classList.toggle(
            (cls), (hasChip));
    });
    //
}
//
/**/


/* END */
    /** Feature for Posfile
     * @returns {void}
     */
export async function feature_PosFile (
    //
) {
    let aRP_Res = (await (auto_RecievePress()));
    //
    await (init_SrcList(aRP_Res));
    //
    if (!(rootClicker)) {
        rootClicker = ((e) => {
            const chipText = (mdSrc_ScanChips());
                if (!((Array).isArray(chipText))) return;
                //
            let chipVal = ((jsTx).trm((prompt(
                `Add for new chip:`)) ?? (jsVar.empty)));
                //
                if (!(chipVal)) return;
                //
            mdSrc_ChipCrud((`generate`),
                (chipText), (-1),
                (chipVal));
        });
    }
    (iScMd.inRoot).addEventListener(
        (`click`), (rootClicker));
    //
}
//
/**/


/* END */
/**/
