#!/usr/bin/env js
/* web/js/index/idx-system-crud-rm.js */

/* Imports */
import { jsVar,
    jsTx,
    } from "../basis.js";
//
import { idxMc,
    } from "./idx-storage.js";
//
/**/


/* Delete - Config */
let
activeChipPath = [];
//
const
ctrl_AutoErase = (500),
defaultSearchEvent = (`idx-rawpath-default-change`),
chipRefreshEvent = (`idx-chip-refresh`),
chipName_Reg = (/^[A-Za-z0-9]+$/)
;
//
/**/


/* Delete - Helpers */
function refreshChips (
    pathFile,
) {
    (idxMc.srcPath).value = ((jsTx).arr2Str(
        (pathFile), (jsVar.slash)));
    (idxMc.srcChip).replaceChildren();
    (window).dispatchEvent((new CustomEvent(
        chipRefreshEvent, { detail: { pathFile, }, })));
}
//
function getPathList (
    pathFile,
) {
    if ((Array).isArray(pathFile)) return (pathFile);
    return ((jsTx).trm((idxMc.srcPath?.value)
        ?? (jsVar.empty)).split(jsVar.slash).filter(Boolean));
}
/**/


/* Delete - Methods */
    /** Event Feature: CRUD Chip (D - Remove)
     * @param {string[]} pathFile
     * @param {number} chipIndex
     * @returns {void}
     */
export function crudChip_Delete (
    pathFile, chipIndex,
) {
    if ((!((Array).isArray(pathFile))) || ((chipIndex
        ) < (0)) || ((chipIndex) >= (pathFile.length))
    ) return;
    //
    if (!((window).confirm(
        (`Close chip "${pathFile[chipIndex]}"?\n\n`) +
        (`OK = Crack (delete)\nCancel = Letting (keep)`)
    ))) return;
    //
    (pathFile).splice((chipIndex), (1));
    activeChipPath = (pathFile);
    refreshChips(pathFile);
}
//
    /** Deletes every chip in the active path.
     * @param {string[]} pathFile
     * @returns {void}
     */
export function crudChip_DeleteAll (
    pathFile = activeChipPath,
) {
    pathFile = (getPathList(pathFile));
    if (!(pathFile.length)) return;
    //
    (pathFile).splice((0), (pathFile.length));
    activeChipPath = (pathFile);
    refreshChips(pathFile);
    (window).dispatchEvent((new CustomEvent(
        defaultSearchEvent)));
}
//
/**/


/* Delete - Controls */
let
lastCtrlPress = (0)
;
//
(document).addEventListener((`keydown`), ((event) => {
        if ((event.key) !== (`Control`) || (event.repeat)) return;
    const now = ((Date).now())
        ;
    if (((now) - (lastCtrlPress)) <= (ctrl_AutoErase)) {
        lastCtrlPress = (0);
        crudChip_DeleteAll();
        return;
    }
    lastCtrlPress = (now);
}));
//
/**/


/* END */
/**/
