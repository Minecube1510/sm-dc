#!/usr/bin/env js
/* web/js/index/idx-blueprint-2.js */

/* Imports */
import { jsVar,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as idxStrg from './idx-storage.js';
    import {
        idxGT_CompId as iGt_S,
    } from "./idx-storage.js";
//
/**/


/* Vars (Compiled) */
//Later...
//
/**/


/* Comp Geartool - Switch */
    /** Builds GT-switch main element.
     * @param {string} tag
     * @param {string} id
     * @returns {HTMLElement}
     */
function idxGt_SwtcElm (
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
    /** Builds a GT-switch element (text).
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
    /** Builds a GT-switch element (background).
     * @param {Object} side
     * @param {string} side.leftSide
     * @param {string} side.rightSide
     * @param {string} side.leftId
     * @param {string} side.rightId
     * @returns {HTMLSpanElement}
     */
function idxGtComp_Bekgron ({
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
    (txtSides).rightTxt.id = (rightId);
    (txtSides).rightTxt.classList.add(`cursor-pointer`);
    //
    (bg).append(
        txtSides.leftTxt,
        txtSides.rightTxt
    );
    return (bg);
}
//
    /** Comping a "toggle switch-texted" comp.
     * @param {Object} compSwitch
     * @param {string} compSwitch.id
     * @param {string} compSwitch.left
     * @param {string} compSwitch.right
     * @param {string} lid
     * @param {string} rid
     * @returns {HTMLDivElement}
     */
export function idxGtComp_Switch ({
    id, left, right,
    lid = jsVar.empty,
    rid = jsVar.empty,
}) {
    let box = (iGt_S.gtSwitch),
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
    /** Controller of GT-Switch.
     * @param {Object} ctrlSwitch
     * @param {HTMLInputElement} ctrlSwitch.input
     * @param {HTMLSpanElement} ctrlSwitch.bg
     * @returns {void}
     */
export function idxGtCtrl_Switch ({
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
    (input).addEventListener((`change`), (syncSides));
    syncSides();
}
//
/**/


/* Comp Geartool - Select */
    /** Select-Option, Option is made-in.
     * @param {array} gtSl_Options
     * @returns {void}
     */
function compGt_SelectOpting (
    gtSl_Options
) {
    const gtSelect = ((jsDoc).createElm(`select`));
    //
    (gtSelect).className = ((jsHt).classer(
        idxStrg.gt_SelectOpting_Cls));
    (gtSelect).id = (`idx-gt-select-comp`);
    (gtSelect).name = (gtSelect.id);
    //
    (gtSl_Options).forEach((text) => ((gtSelect).append(
        (Object).assign((jsDoc).createElm(`option`), {
            value: ((jsTx).lower(text)),
            textContent: (text),
        }))
    ));
    return (gtSelect);
}
    /** Builds Geartool select component elements.
     * @param {Object} opting
     * @param {string} opting.optId
     * @param {string} opting.optLbl
     * @param {string} opting.optRow
     * @returns {Object}
     */
function idxGtElm_Select ({
    optId, optLbl,
    optRow = `caret-down-fill`,
}) {
    let gtElm_Select = ((Object).fromEntries(
        (Object).entries({
            mainSelect: `div`, noLabel: `label`,
            comWrap: `div`, cosArrow: `span`,
    }).map(([key, tag]) => [ (key),
        ((jsDoc).createElm(tag)), ])));
    (gtElm_Select).mainSelect.id = (optId);
    //
    ((Object).assign((gtElm_Select.noLabel), {
        htmlFor: (optId),
        className: (`hidden`),
        textContent: (optLbl),
    }));
    //
    (gtElm_Select).comWrap.className = (
        `relative flex items-center`);
    //
    (Object).assign((gtElm_Select.cosArrow), {
        className: ((jsHt).classer(
            idxStrg.gt_SelectCarrow_Cls)),
        id: (`idx-gt-select-arrow`),
    });
    (gtElm_Select).cosArrow
        .dataset.value = (optRow);
    //
    return (gtElm_Select);
}
    /** Compacting Select-Option, costumize the Option.
     * @param {array} gtSelect_Modes
     * @returns {void}
     */
export function idxGtComp_Select (
    gtSelect_Modes,
) {
    const gtElCom = idxGtElm_Select({
        id: (`idx-gt-select-comp`),
        label: (`View Mode`),
    });
    (gtElCom).comWrap.append(compGt_SelectOpting(
        gtSelect_Modes), (gtElCom.cosArrow));
    (gtElCom).mainSelect.append(
        (gtElCom.noLabel),
        (gtElCom.comWrap)
    );
    (iGt_S).gtSelect.replaceChildren(
        gtElCom.mainSelect);
}
//
/**/


/* Activate */
function idxGt_Classing () {
    (iGt_S).gtSwitch.classList.add(
        ...idxStrg.gt_MainSwitch_Cls);
    //
    (iGt_S).gtInput.classList.add(
        ...idxStrg.gt_Lined_Cls);
    //
    (iGt_S).gtSelect.classList.add(
        ...idxStrg.gt_Lined_Cls);
}
idxGt_Classing();
//
/**/


/* END */
/**/
