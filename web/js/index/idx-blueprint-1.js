#!/usr/bin/env js
/* web/js/index/idx-blueprint-1.js */

/* Imports */
import { jsVar,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as idxStrg from './idx-storage.js';
    import { reaState,
        idxSearchMD_CompId as iScMd,
    } from "./idx-storage.js";
//
import {
    mdVi_Searching as mdSrc,
} from "./idx-process.js";
//
/**/


/* Vars (Compiled) */
export const idx_CompText = (tick) => {
    let map_ComTrim = {
        md_Err: (
            `404 - Markdown Not Found`),
        md_Plh: (
            `Preview-ing the Markdown-Document-File`),
    };
    return ((tick in map_ComTrim) ? ((jsTx).trm(
        map_ComTrim[tick])) : (undefined));
};
//
let mdCond_State = {
    isSearching: (false),
    lastSearchText: (jsVar.empty),
    lastLoggedReason: (jsVar.empty),
};
export const mdSt = ((tick, val) => {
    let map_State = {
        iS: (`isSearching`),
        lST: (`lastSearchText`),
        lLR: (`lastLoggedReason`),
    };
    tick = ((map_State[tick]) ?? (tick));
    //
    if ((val) !== (undefined)) {
        mdCond_State[tick] = (val);
    }
    return (
        (tick in mdCond_State)
        ? (mdCond_State[tick])
        : (mdCond_State)
    );
});
//
/**/


/* Comp-Struct - View */
    /** Basically MD-Placeholder
     * @param {string} ph_Texting
     * @returns {void}
     */
export function mdVi_PlaceHolder (
    ph_Texting,
) {
    let plHold = ((jsDoc).createElm(`div`));
    //
    (plHold).className = ((jsHt)
        .classer(idxStrg.mdv_Ph_Cls));
    (plHold).textContent = (ph_Texting);
    //
    (iScMd.content).replaceChildren(plHold);
    //
}
    /** MD-Placeholder as Error-404
     * @param {string} ph
     * @returns {void}
     */
export function mdViPh_404 (
    placeholder_404,
) {
    mdVi_PlaceHolder(jsTx.trm(placeholder_404));
}
//
/**/


/* Comp-Struct - Search */
    /** [Async] MD-Viewer Config for Searchs
     * @returns {Promise<boolean>}
     */
async function cfg_mdVi_Search () {
    let srcText = (
        (jsTx).trm(iScMd.ftSrch.value));
    switch (true) {
        case (!(srcText)):
        case (mdSt(`iS`)):
        case ((srcText) === (mdSt(`lST`))):
            return (false);
    }
    mdSt((`iS`), (true));
    mdSt((`lST`), (srcText));
    //
    return (true);
}
    /** [Async] MD-Viewer Features: Searching
     * @returns {Promise<void>}
     */
export async function mdView_Search () {
        if (!(await (cfg_mdVi_Search()))) return;
    try {
        const get_ReSrc = (await (
            mdSrc(idx_CompText(`md_Plh`))
        ));
        if (!((get_ReSrc)?.ok)) {
            const msg = ((get_ReSrc)?.reason?.msg);
            switch (msg) {
                case (reaState.md_n_fnd.msg):
                    mdViPh_404(idx_CompText(`md_Err`));
                    (jsCs).log(get_ReSrc);
                    return;
                case (reaState.chc_n_fnd.msg):
                    mdViPh_404(idx_CompText(`md_Err`));
                    (jsCs).log(get_ReSrc);
                    return;
                case (reaState.error.msg):
                    mdViPh_404(`Loading Failed`);
                    return;
                case (reaState.pndg.msg):
                    return;
                default:
                    mdViPh_404(`Loading Failed`);
                    (jsCs).log(get_ReSrc);
                    return;
            }
        }
        (jsCs).log(get_ReSrc);
    } finally {
        mdSt((`iS`), (false));
    }
}
//
/**/


/* Activate */
function mdVi_Classing () {
    (iScMd).idxView.classList.add(
        ...idxStrg.idxView_Cls);
    //
    (iScMd).idxSrch.classList.add(
        ...idxStrg.mdVi_InputPls_Cls);
    //
    (iScMd).inRoot.classList.add(
        ...idxStrg.mdVi_InputRoot_Cls);
    (iScMd).ftSrch.classList.add(
        ...idxStrg.mdVi_InputDef_Cls);
    //
}
mdVi_Classing();
//
/**/


/* END */
/**/
