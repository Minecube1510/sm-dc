#!/usr/bin/env js
/* web/js/index/idx-system-crud.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsDoc, jsHt,
    } from "../basis.js";
//
import { setLDm_ThemeClass as ldmClasser,
    } from "../set-paging.js";
import { toggle_ResultList,
    } from "./idx-render-config.js";
//
import * as idxStrg from './idx-storage.js';
import * as idxCls from './idx-storage-class.js';
    import { idxMc, idx_FirSearch,
        } from "./idx-storage.js";
import { crudChip_Delete,
    crudChip_DeleteAll,
    } from "./idx-system-crud-rm.js";
import { init_RcSrc_List,
    } from "./idx-render-src-kit.js";
//
/**/


/* System.Feature - Config */
let
activeChipPath = []
;
//
const
pad_Y2 = (`py-2`),
pad_Y3 = (`py-3`),
/*|
|*/
rcChip_Chiplost_Cls = [ (`bi`),
    (`bi-x-circle`),
    //
    (`translate-y-0.25`),
    ...((idxStrg).tCls_AutoSet({
        hover: [ (`scale-110`), ],
        active: [ (`scale-95`), ],
    })),
],
/*|
|*/
chipName_Reg = (/^[A-Za-z0-9]+$/),
//
srcTester = (idxMc.srcTester),
defaultSearchEvent = (`idx-rawpath-default-change`),
//
chip_CrudMethod = {
    create: (crudChip_Create),
    update: (crudChip_Update),
    edit: (crudChip_Update),
    delete: (crudChip_Delete),
},
/*|
|*/
refreshChips = (pathFile) => {
    (idxMc.srcPath).value = ((jsTx).arr2Str(
        (pathFile), (jsVar.slash)));
    (idxMc.srcChip).replaceChildren();
    //
    gtLvr_AutoChip_Setup((pathFile), (idxMc.srcChip));
}
;
//
/**/


/* Chip - Features */
    /** Comp Feature: Chip-Editor
     * @param {string[]} chipTotal
     * @returns {void}
     */
export function ediChip_Fits (
    chipTotal = [],
) {
    const
        chipBox = (idxMc.srcChip),
        chipEdit = (idxMc.chipEdit)
            ;
    if ((!(chipBox)) || (!(chipEdit)) ||
        (!(chipBox.children.length)) ||
        (!((Array).isArray(chipTotal))) ||
        (!(chipTotal.length))) return;
    //
    (chipEdit).classList.remove(
        (pad_Y2), (pad_Y3));
    (chipEdit).classList.add(((chipBox.scrollWidth) > (
    (chipBox.clientWidth) + (1))) ? (pad_Y3) : (pad_Y2));
}
/*|
|*/
    /** Event Feature: CRUD Chip (C - Add)
     * @param {string/string[]} pathFile
     * @returns {void}
     */
export function crudChip_Create (
    pathFile,
) {
    const
        chipName = ((window).prompt(
            `Add for next directing:`)),
        newChip = ((jsTx).trm(chipName ?? jsVar.empty)),
        chipList = (((Array).isArray(pathFile))
            ? ([ ...(pathFile), ])
            : ((jsTx).trm((pathFile) ?? (jsVar.empty))
                .split(jsVar.slash).filter(Boolean))
        );
    if (!(chipName_Reg.test(newChip)) ||
        !((window).confirm(
            `Add "${newChip}"?`))) return;
    //
    (chipList).push(newChip);
    refreshChips(chipList);
}
    /** Event Feature: CRUD Chip (U - Edit)
     * @param {string[]} pathFile
     * @param {number} chipIndex
     * @param {HTMLElement} elChip
     * @returns {void}
     */
export function crudChip_Update (
    pathFile, chipIndex, elChip,
) {
        if ((!((Array).isArray(pathFile))) || (!(elChip))) return;
    let isDone = (false);
    const
        chipLabel = ((elChip).firstElementChild),
        chipInput = ((jsMod).makElm((`input`), {
            value: (pathFile[chipIndex]),
            className: ((jsHt).classer([ (`min-w-0.5`),
            (`outline-none`), (`bg-transparent`), ])),
        })),
        fitChipInput = () => { (chipInput).style.width = (`${
            (Math).max((((chipInput.value.length) * (0.9)) + (1)),
            (8), )}ch`);
        },
        finishEdit = ((saveEdit) => { if (isDone) return;
            isDone = (true);
            //
            const newName = ((jsTx).trm((chipInput).value));
            //
            if ((saveEdit) && ((chipName_Reg).test(newName))) {
                (pathFile[chipIndex]) = (newName);
                refreshChips(pathFile);
                return;
            }
            //
            (idxMc.srcChip).replaceChildren();
            gtLvr_AutoChip_Setup((pathFile), (idxMc.srcChip));
        })
        ;
    if (!(chipLabel)) return;
    //
    fitChipInput();
    //
    (chipInput).addEventListener((`input`), (fitChipInput));
    //
    (chipInput).addEventListener((`keydown`), ((event) => {
        if ((!((`Enter`) === (event.key))) && (!(
            (`Escape`) === (event.key)))) return;
            //
        (event).preventDefault();
        finishEdit((`Enter`) === (event.key));
    }));
    //
    (chipInput).addEventListener((`blur`), (() => finishEdit(true)));
    //
    (elChip).replaceChild((chipInput), (chipLabel));
    //
    (chipInput).focus(); (chipInput).select();
}
//
/**/


/* Chip - Renderers */
    /** GT-Lever Feature - CRUD Chip (Full)
     * @param {string/string[]} cPath
     * @param {string} crudMode
     * @returns {void}
     */
export function gtLvr_CrudChip (
    cPath, crudMode,
) {
    const mode = ((jsTx).lower((jsTx).trm(((typeof
        crudMode) === (`string`)) ? (crudMode) :
        ((crudMode)?.value) ?? ((crudMode)?.textContent)
    )));
    //
    return (chip_CrudMethod[mode]?.(cPath));
}
//
    /** GT-Lever Feature - CRUD Chip (Full)
     * @param {string[]} liSearchs
     * @param {HTMLDivElement} boxChips
     * @param {boolean} [fitChip=true]
     * @returns {void}
     */
export function gtLvr_AutoChip_Setup (
    liSearchs, boxChips, fitChip = (true),
) {
    activeChipPath = (liSearchs);
    const
        chipLdm = [ [
            [ (`bg-gray-100`), (`text-gray-900`), ],
            [ (`bg-gray-800`), (`text-gray-100`), ],
        ], [
            [ (`bg-blue-100`), (`text-blue-900`), ],
            [ (`bg-blue-900`), (`text-blue-100`), ],
        ], ],
        chipAnim = [
            [ (`opacity-0`), (`translate-y-1`), (`scale-95`), ],
            [ (`opacity-100`), (`translate-y-0`), (`scale-100`), ],
        ],
        //
        stopEvent = ((action) => ((event) => { (event)
            .stopPropagation(); action(event); }))
            ;
    if ((!((Array).isArray(liSearchs))) || (!(liSearchs.length))) {
        (boxChips).append((jsMod).makElm((`span`), {
            className: ((jsHt).classer([ (`italic`), (`opacity-60`),
                (`text-gray-400`), (`pointer-events-none`), ])),
            textContent: (`Please add the directory chips`),
        }));
        return;
    }
    //
    for (const [i, part] of liSearchs.entries()) {
        const chip = ((jsMod).makElm((`div`), { className: (
            (jsHt).classer(idxCls.rcChips_Chipper_Cls)), }));
        //
        ldmClasser((chip), ...(chipLdm[0]));
        //
        (chip).append(
            (jsMod).makElm((`span`), { textContent: (part), }),
            (jsMod).makElm((`span`), { className: ((jsHt)
                .classer(rcChip_Chiplost_Cls)), }),
        );
        (boxChips).append(chip);
        //
        (chip.lastElementChild).addEventListener((`click`), (
            stopEvent(() => (crudChip_Delete((liSearchs),
                (i))))));
        (chip).addEventListener((`dblclick`), (
            stopEvent(() => (crudChip_Update((liSearchs),
                (i), (chip))))));
        //
        requestAnimationFrame(() => {
            (chip).classList.remove(...(chipAnim[0]));
            (chip).classList.add(...(chipAnim[1]));
            //
            ldmClasser((chip), ...(chipLdm[1]));
            //
            setTimeout(() => { (chip).classList.remove(
                (idxStrg.transiteAll), (idxStrg.gen_Durate));
            }, ((200) + ((i) * (35))));
        });
    }
    //
    if (fitChip) { requestAnimationFrame(() =>
        ediChip_Fits(liSearchs)); }
}
//
/**/


/* Chip - Controls */
    /** Adds some string for once testing search.
     * @returns {void}
     */
function init_TeSearChannel () {
        if (!(srcTester)) return;
    (srcTester).addEventListener((`change`), (() => {
        (idxMc.srcPath).value = ((srcTester).checked
            ? (idx_FirSearch) : (jsVar.empty));
        if ((srcTester).checked) {
            toggle_ResultList(false);
            (idxMc.srcPath).blur();
            //
            (window).dispatchEvent((new CustomEvent(
                defaultSearchEvent)));
            //
            return;
        }
        //
        init_RcSrc_List();
        toggle_ResultList(true);
    }));
}
//
    /** Synchrons the test search value for RP-Mode.
     * @param {string} pathValue
     * @returns {void}
     */
export function sync_TeSearChannel (
    pathValue,
) {
        if (!(srcTester)) return;
    (srcTester).checked = ((pathValue) === (idx_FirSearch));
    toggle_ResultList((srcTester).checked);
    //
    if (!((srcTester).checked)) {
        (idxMc.srcPath).blur(); }
}
//
init_TeSearChannel();
//
(window).addEventListener(
    (`idx-chip-refresh`), ((event) => {
        const pathFile = (event.detail?.pathFile);
            if (!((Array).isArray(pathFile))) return;
            //
        gtLvr_AutoChip_Setup((pathFile), (idxMc.srcChip));
}));
//
/**/


/* END */
/**/
