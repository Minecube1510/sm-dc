#!/usr/bin/env js
/* web/js/index/idx-blueprint-2c.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as idxStrg from './idx-storage.js';
    import { 
        idxGT_CompId as iGt_cId,
        //
        gtComponter as gtComSel,
        //
    } from "./idx-storage.js";
    /*|
  //
|*/
import { 
    //
    } from "./idx-blueprint-0a.js";
    import { 
        //
    } from "./idx-blueprint-0b.js";
//
import { 
    //
    } from "./idx-blueprint-2.js";
    import { 
        //
    } from "./idx-blueprint-2a.js";
/*|
|*/
import { ldm_Color, ldm_Data, ldm_Event,
    //
    setLDm_ThemeClass as ldmClasser,
} from "../set-paging.js";
//
/**/


/* Helper and Configs */
//
/**/


/* Comp Geartool - Select */
    /** Select-Option, Option is made-in.
     * @param {array} gtSl_Options
     * @returns {void}
     */
function compGt_SelectOpting (
    gtSl_Options,
) {
    const gtSelect = ((jsMod).setElm(
        (jsDoc).createElm(`select`), {
            className: ((jsHt).classer(
            idxStrg.gt_SelectOpting_Cls)),
            //
            id: (gtComSel.cElmSe),
    })),
        lSelOptCls = (`bg-${ldm_Color.light.bg}`),
        dSelOptCls = (`bg-${ldm_Color.dark.bg}`)
        ;
    //
    (jsMod).setElm((gtSelect), {
        name: (gtSelect.id),
    });
    //
    (gtSl_Options).forEach((text) => {
        let selOpt = ((jsMod).setElm(((jsDoc)
            .createElm(`option`)), {
                className: (jsVar.empty),
                value: ((jsTx).lower(text)),
                textContent: (text),
        }));
        //
        ldmClasser((selOpt), (lSelOptCls), (dSelOptCls));
        //
    (ldm_Event).addEventListener((`themechange`), (() => {
        ldmClasser((selOpt), (lSelOptCls), (dSelOptCls));
    }));
        //
        (gtSelect).append(selOpt);
    });
    //
    return (gtSelect);
}
    /** Builds Geartool select component elements.
     * @param {Object} opting
     * @param {string} opting.optId
     * @param {string} opting.optLbl
     * @param {string} opting.sRowId
     * @param {string} opting.optRow
     * @returns {Object}
     */
function idxGtElm_Select ({
    optId, optLbl, sRowId,
    optRow = (`caret-down-fill`),
}) {
    let gtElm_Select = ((Object).fromEntries(
        (Object).entries({ noLabel: (`label`),
            comWrap: (`div`), cosArrow: (`span`),
    }).map(([ key, tag, ]) => [ (key),
        ((jsDoc).createElm(tag)), ]))),
        //
        opened = (false),
        gtSelect = ((jsDoc).getId(gtComSel.cElmSe))
        ;
    //
    (jsMod).setElm((gtElm_Select.noLabel), {
        htmlFor: (optId),
        className: (`hidden`),
        textContent: (optLbl),
    });
    (jsMod).setElm((gtElm_Select.comWrap), {
        className: (
            `relative flex items-center`),
    });
    (jsMod).setElm((gtElm_Select.cosArrow), {
        className: ((jsHt).classer(
            idxStrg.gt_SelectCarrow_Cls)),
        id: (`idx-gt-select-arrow`),
    });
    (gtElm_Select).cosArrow
        .dataset.value = (optRow);
    (gtElm_Select).cosArrow
        .id = (sRowId);
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
        optId: (gtComSel.cElmSe),
        optLbl: (jsVar.empty),
        sRowId: (gtComSel.cRow),
    });
    (gtElCom).comWrap.append(compGt_SelectOpting(
        gtSelect_Modes), (gtElCom.cosArrow));
    (iGt_cId).gtSelect.append(
        (gtElCom.noLabel),
        (gtElCom.comWrap)
    );
}
//
/**/


/* ? */
//
/**/


/* END */
//
/**/


/* END */
/**/
