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


/* Helper */
    /** Randomize Shuffle Methoder.
     * @param {array} getSrcRes
     * @returns {getSrcRes}
     */
export function randomizeSrc (
    getSrcRes,
) {
    return ([ ...getSrcRes, ].sort(
        () => (((Math).random()) - (0.5))
    ));
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
