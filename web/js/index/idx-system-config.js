#!/usr/bin/env js
/* web/js/index/idx-system-config.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    dirSafe,
    } from "../basis.js";
//
import * as tw from '../tw-css-cls.js';
//
import * as idxStrg from './idx-storage.js';
import * as idxCls from './idx-storage-class.js';
    import { idxMc, idx_FirSearch,
        //
        idxGt_Lang as gt_LangCo,
            //
        idx_MComp as cIdx,
        //rscs_Comps as src_ComId,
        //
    } from "./idx-storage.js";
/*|
|*/
import * as idxSysF from './idx-system-fetch.js';
import {
    limit_Fetch_Files,
        //
    validate_Fuzzerch_Files,
    autoRank_Fuzzerch_Files,
        //
    random_LiSeeder_Files,
    //
    idx_RpList as rp_Lists,
        //
    idx_10TriaLists as triaLists,
    //
    } from "./idx-system-fetch.js";
//
import { render_ViewMd,
    //
    } from "./idx-render.js";
import { setLDm_ThemeClass as ldmClasser,
    //
    } from "../set-paging.js";
import { toggle_ResultList,
    //
    } from "./idx-render-config.js";
import { idCo_UliRes,
    init_RcSrc_List,
    //
    init_RcGt_LeverSides,
    //
    } from "./idx-render-kit.js";
//
import {
    srcSt,
    //
    kit_Get_ResLists,
    kit_Refresh_ResLists,
    kit_Update_RestSel,
        //
    unit_Select_ResItem,
    //
    } from "./idx-process.js";
//
/**/


/* System.Feature - Config */
let
comp_UliRes
;
//
const
opacity_0 = ((tw).tcRegulate((
    idxStrg.opacity), (0))),
    //
pointer_EvNon = (idxStrg.pointer_EvNon),
cursorPoint = (idxStrg.cursorPoint),
//
rcChip_Chiplost_Cls = [ (`bi`),
    (`bi-x-circle`),
    //
    // (idxStrg.transiteTransform),
    // ...(idxCls.idx_Internimate),
    //
    (`translate-y-0.25`),
    //
    ...((idxStrg).tCls_AutoSet({
        hover: [ (`scale-110`), ],
        active: [ (`scale-95`), ],
    })),
]
;
let gtLvr_CrudChipHandler;
/*|
|*/
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
            if ((srcSt.selectIndex) >= (
                srcSt.currentRes.length)) {
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
(window).addEventListener((`idx-search-limit-change`), (() => {
    init_SearchInput(idxMc.srcPath);
}));
//
/**/


/* GT-Lever.Feature - Config */
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
        validName = ((/^[A-Za-z0-9]+$/).test(newChip)),
        chipList = (((Array).isArray(pathFile))
            ? ([ ...(pathFile), ])
            : ((jsTx).trm((pathFile) ?? (jsVar.empty))
                .split(jsVar.slash).filter(Boolean)))
            ;
        if (!(validName)) return;
        if (!((window).confirm
            (`Add "${newChip}"?`))) return;
    //
    (chipList).push(newChip);
    //
    (idxMc.srcPath).value = ((jsTx).arr2Str(
        chipList, jsVar.slash));
    (idxMc.srcChip).replaceChildren();
    //
    gtLvr_AutoChip_Setup((chipList), (idxMc.srcChip));
}
    /** Event Feature: CRUD Chip (U - Edit)
     * @param {string/string[]} pathFile
     * @returns {void}
     */
export function crudChip_Update (
    pathFile, chipIndex, chip,
) {
    let isDone = (false)
        ;
    if ((!((Array).isArray
        (pathFile))) || !(chip)) return;
    //
    const chipLabel = ((chip).firstElementChild);
        if (!(chipLabel)) return;
    const chipInput = ((jsMod).makElm((`input`), {
        value: (pathFile[chipIndex]),
        className: ((jsHt).classer([
            (`min-w-0.5`), (`bg-transparent`),
            (`outline-none`), ])),
    }));
    //
    const fitChipInput = (() => { const
        valen_Chip = (chipInput.value.length),
        autoVlc = (((valen_Chip) * (0.9)) + (1))
                ;
        (chipInput).style.width = (`${(Math)
            .max((autoVlc), (8))}ch`);
    });
    //
    fitChipInput();
    (chipInput).addEventListener(
        (`input`), (fitChipInput));
    //
    const finishEdit = ((saveEdit) => {
        if (isDone) return;
        //
        isDone = (true);
        //
        const newName = ((jsTx).trm((chipInput).value));
        if (saveEdit && ((/^[A-Za-z0-9]+$/).test(newName))) {
            pathFile[chipIndex] = (newName);
            (idxMc.srcPath).value = ((jsTx).arr2Str(
                (pathFile), (jsVar.slash)));
        }
        //
        (idxMc.srcChip).replaceChildren();
        gtLvr_AutoChip_Setup((pathFile), (idxMc.srcChip));
    });
    //
    (chipInput).addEventListener(
        (`keydown`), ((event) => {
        switch (event.key) {
            case (`Enter`):
                (event).preventDefault();
                finishEdit(true);
                break;
            case (`Escape`):
                (event).preventDefault();
                finishEdit(false);
                break;
            default:
                break;
        }
    }));
    (chipInput).addEventListener((`blur`),
        (() => { finishEdit(true);
    }));
    (chip).replaceChild((chipInput), (chipLabel));
    //
    (chipInput).focus();
    (chipInput).select();
}
    /** Event Feature: CRUD Chip (D - Remove)
     * @param {string/string[]} pathFile
     * @returns {void}
     */
export function crudChip_Delete (
    pathFile, chipIndex,
) {
    if (!((Array).isArray(pathFile)) ||
        ((chipIndex) < (0)) ||
        ((chipIndex) >= (pathFile.length))) return;
    //
    const shouldCrack = ((window).confirm(
        `Close chip "${pathFile[chipIndex]}"?\n\n` +
        `OK = Crack (delete)\nCancel = Letting (keep)`));
        if (!(shouldCrack)) return;
    //
    (pathFile).splice((chipIndex), (1));
    (idxMc.srcPath).value = ((jsTx).arr2Str(
        (pathFile), (jsVar.slash)));
    (idxMc.srcChip).replaceChildren();
    gtLvr_AutoChip_Setup((pathFile), (idxMc.srcChip));
}
//
    /** GT-Lever Feature - CRUD Chip (Full)
     * @param {string/string[]} cPath
     * @param {string} crudMode
     * @returns {void}
     */
export function gtLvr_CrudChip (
    cPath, crudMode,
) {
    const mode = ((typeof crudMode === (`string`))
        ? (crudMode)
        : ((crudMode)?.value ?? (crudMode)?.textContent)
    );
    if (!(mode)) return;
    //
    switch ((jsTx).lower((jsTx).trm(mode))) {
        case (`create`):
            return (crudChip_Create(cPath));
        case (`update`):
        case (`edit`):
            return (crudChip_Update(cPath));
        case (`delete`):
            return (crudChip_Delete(cPath));
        default:
            return;
    }
}
//
/**/


/* Geartool.Feature - Config */
    /** Handling GT-Lever Mode Changes.
     * @param {HTMLElement} compBtn
     * @param {string} leverMode
     * @returns {string}
     */
export function cfg_GtLever_Confirm (
    compBtn, leverMode,
) {
    init_RcGt_LeverSides(compBtn);
        if ((leverMode) === (compBtn
        .textContent)) return (leverMode);
        //
    leverMode = (compBtn.textContent);
    //
    (jsCs).log(`Change to Mode: ${leverMode}`);
    //
    return (leverMode);
}
//
    /** Auto-Chipper for GT-Lever Mode:Posfile
     * @param {string[] || array} liSearchs
     * @param {HTMLDivElement} boxChips
     * @returns {void}
     */
export function gtLvr_AutoChip_Setup (
    liSearchs, boxChips,
) {
    if (!((Array).isArray(liSearchs)) ||
        ((liSearchs.length) === (0))) {
        (boxChips).append((jsMod).makElm((`span`), {
            className: ((jsHt).classer([ (`italic`),
                (`pointer-events-none`),
                (`text-gray-400`), (`opacity-60`),
            ])),
            textContent: (`Please add the directory chips`),
        }));
        return;
    }
    //
    for (const [i, part] of liSearchs.entries()) {
        const chip = ((jsMod).makElm((`div`), {
id: (``),
className: ((jsHt).classer(
    idxCls.rcChips_Chipper_Cls)),
//
        }));
        //
        ldmClasser((chip),
            [ (`bg-gray-100`), (`text-gray-900`), ],
            [ (`bg-gray-800`), (`text-gray-100`), ],
        );
        //
        (chip).append((jsMod)
            .makElm((`span`), {
id: (``),
textContent: (part),
//
            }),
            //
            (jsMod).makElm((`span`), {
className: ((jsHt).classer(
    rcChip_Chiplost_Cls)),
//
            }),
        );
        //
        (boxChips).append(chip);
        const chipClose = (chip).lastElementChild;
        (chipClose).addEventListener((`click`), ((event) => {
            (event).stopPropagation();
            crudChip_Delete(liSearchs, i);
        }));
        (chip).addEventListener((`dblclick`), ((event) => {
            (event).stopPropagation();
            crudChip_Update(liSearchs, i, chip);
        }));
        //
        requestAnimationFrame(() => {
            (chip).classList.remove(
                (`opacity-0`), (`translate-y-1`), (`scale-95`),
            );
            (chip).classList.add(
                (`opacity-100`), (`translate-y-0`), (`scale-100`),
            );
            ldmClasser((chip),
                [ (`bg-blue-100`), (`text-blue-900`), ],
                [ (`bg-blue-900`), (`text-blue-100`), ],
            );
            setTimeout(() => {
                (chip).classList.remove(
                    (idxStrg.transiteAll), (idxStrg.gen_Durate),
                );
            }, ((200) + ((i) * (35))));
        });
    }
}
    /** Handling GT-Lever Mode Changes.
     * @param {string} gtLvrMode
     * @returns {void}
     */
export function cfg_GtLever_Change (
    gtLvrMode,
) {
    let
        lever = (jsVar.empty),
        //
        get_SrcPath = [],
        ph_SrcChip = (jsVar.empty)
        //
        ;
    const
        delay_Change = (200),
        //
        srcRoot = (idxMc.srcRoot),
        srcPath = (idxMc.srcPath),
        //
        srcChip = (idxMc.srcChip),
        //
        nDefMode = ((
            (jsTx).lower(gtLvrMode)) === (
                (jsTx).lower(gt_LangCo.lvr.rp)
        )),
        //
        classMap = [ {
            elm: (srcPath),
            state: (!(nDefMode)),
        }, {
            elm: (srcChip),
            state: (nDefMode),
        }, ]
        ;
        if (!(gtLvrMode)) return;
    //
    lever = ((jsTx).lower(gtLvrMode));
        //
    ph_SrcChip = ((jsTx).trm(`Posfile Chips`));
    get_SrcPath = (srcPath.value);
    //
    if (nDefMode) {
        [ (srcChip), ...((srcChip).querySelectorAll(`*`)),
        ].forEach((elm) => {
            (elm).classList.remove(
                (idxStrg.transiteAll), (idxStrg.gen_Durate),
            );
            (elm).classList.add(`transition-none`);
        });
    } else {
        (srcChip).classList.remove(`transition-none`);
    }
    //
    for (const { elm, state } of classMap) {
        [ (opacity_0), (pointer_EvNon),
        ].forEach((cls) => { (elm).classList
            .toggle((cls), (state)); });
    }
    //
    (srcRoot).classList.toggle(
        (cursorPoint), (!(nDefMode)));
    //
    get_SrcPath = (
        ((Array).isArray(get_SrcPath)) ? (get_SrcPath) : ((jsTx)
        .trm(get_SrcPath) .split(jsVar.slash).filter(Boolean))
    );
    //
    (srcChip).replaceChildren();
    gtLvr_AutoChip_Setup(
        (get_SrcPath), (srcChip));
    //
    (jsCs).warn(`Still under development...`);
    //
    if (gtLvr_CrudChipHandler) {
        (srcRoot).removeEventListener(
            (`click`), (gtLvr_CrudChipHandler));
        gtLvr_CrudChipHandler = (null);
    }
    //
    switch (lever) {
        case ((jsTx).lower(gt_LangCo.lvr.rp)):  /* Rawpath */
            get_SrcPath = (
                ((Array).isArray(get_SrcPath))
                ? ((jsTx).arr2Str((get_SrcPath),
                (jsVar.slash))) : (get_SrcPath)
            );
            //
            break;
        case ((jsTx).lower(gt_LangCo.lvr.pf)):  /* Posfile */
            get_SrcPath = (
                ((Array).isArray(get_SrcPath)) ? (get_SrcPath)
                : ((jsTx).trm(get_SrcPath).split(jsVar.slash)
                .filter(Boolean))
            );
            //
            gtLvr_CrudChipHandler = (() => {
                (gtLvr_CrudChip(get_SrcPath, (`create`)));
            });
            (srcRoot).addEventListener(
                (`click`), (gtLvr_CrudChipHandler));
            break;
        default:
            break;
    }
    //
    //(jsCs).log(get_SrcPath);
}
//
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
