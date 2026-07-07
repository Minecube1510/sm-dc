#!/usr/bin/env js
/* web/js/index/idx-blueprint-0a.js */

/* Imports */
import { jsVar, dirSafe,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as iGit from "../init-github.js";
//
import * as idxStrg from './idx-storage.js';
    import {
        idxGT_CompId as iGt_S,
        //
        idxSearchMD_CompId as iScMd,
        //
        mdCosL_Comp_Cls as lRootCls,
        mdCosD_Comp_Cls as dRootCls,
        //
        mdSrch_AutoCm_Cls as srcAutoCls,
        gt_SrcRes_Cls as srcResCls,
        //
    } from "./idx-storage.js";
    /*|
  //
|*/
import { rppf_Moderact,
    //
    } from "./idx-blueprint-0b.js";
//
import { mdView_Search,
    //
    } from "./idx-blueprint-1.js";
//
import { randomizeSrc,
    //
    } from "./idx-blueprint-2.js";
    //
import { 
    //
    } from "./idx-blueprint-2a.js";
    //
import { 
    //
    } from "./idx-blueprint-2b.js";
/*|
|*/
import { ldm_Data, ldm_Event,
    setLDm_ThemeClass as ldmClasser,
} from "../set-paging.js";
//
/**/


/* Configs */
const drFs = (dirSafe.filename),
    loadedFile = (new Map());
//
export
    let docFiles = [],
    srcSelected = (-1),
    srcCurrent = [];
//
    /** Set - Searching Selected
     * @param {Number} v
     * @returns {void}
     */
export function set_SrcSelected (v) {
    srcSelected = (v);
}
/**/


/* Helper - Inputters * /
    * (GearTool-Input & MD-Search)
*/
//
    /** MD-Searcher - FS-Config Lister
     * @param {HTMLElement} htElm
     * @param {boolean} elState
     * @returns {void}
     */
export function srcFilter_Visible (
    htElm, elState,
) {
    (htElm).classList.toggle(
        (`overflow-visible`),
        (elState));
    (htElm).classList.toggle(
        (`overflow-hidden`),
        (!(elState)));
}
//
    /** MD-Searcher - FS-Checker
     * @param {string} gFileBase
     * @param {string} gFilePath
     * @returns {string}
     */
export function cek_GetPath (
    gFileBase = (jsVar.empty),
    gFilePath = (jsVar.empty),
) {
    const clean = ((v, r) => ((v) || (jsVar
        .empty)).replace((r), (jsVar.empty)));
    const normalize = ((v) => {
        let value = ((String((v) ?? (jsVar.empty)))
            .trim());
        value = (clean((value), (/^\/+|\/+$/g)));
        return ((value).replace((/\/+/g), (jsVar.slash)));
    });
    let fBase = normalize(gFileBase);
    let fPath = normalize(gFilePath);
    //
    switch (true) {
        case ((!(fBase)) && (!(fPath))):
            return (jsVar.empty);
        case ((!(fBase)) && (fPath)):
            return (fPath);
        case ((fBase) && (!(fPath))):
            return (fBase);
        case ((fBase) && (fPath) && ((fPath) === (fBase))):
            return (fBase);
        case ((fBase) && (fPath) && ((fPath)
            .startsWith((fBase) + (jsVar.slash)))):
            return (fPath);
        default:
            return (`${fBase}/${fPath}`);
    }
}
    /** Check Fetching-Result Status
     * @param {Response} resStat
     * @returns {Response}
     */
function cek_FetchRes (
    resStat,
) {
    if (!(resStat.ok)) {
        throw new Error(
            `Fetch Error: ${resStat.status}`);
    }
    return (resStat);
}
//
/**/


/* Get-File Fetcher System-Configs */
    /** Github API - Know Rate Limit
     * @param {string} gitProb
     * @returns {void}
     */
function gitWarn_RateLimit (
    gitProb,
) {
    const reset = Number((gitProb).headers
        .get(`X-RateLimit-Reset`));
    const remain = ((Math).max((0), ((Math)
        .floor((((reset) * (1000)) - ((Date)
            .now())) / (1000))
    )));
    const gTimer = [
        Math.floor(remain / (3600)),
        Math.floor((remain % (3600)) / (60)),
        remain % (60),
    ];
    (jsCs).warn((jsTx).trm((jsTx).arr2Str([
        (`GitHub API - Rate limit reached.${jsVar.enter}`),
        (`Reset:${jsVar.enter}> ${new Date((reset)
            * (1000))}${jsVar.enter}`), (`Retry:${jsVar
        .enter}> ${gTimer[0]}h ${gTimer[1]}m ${gTimer[2]}s`),
    ], (jsVar.enter))));
}
//
    /** [Async] Get All Files (Source: API or Local)
     * @param {string} fileFrom
     * @param {string} filePath
     * @param {Boolean} forceReload
     * @returns {void}
     */
export async function get_DocFiles (
    fileFrom = (`local`),
    filePath = (jsVar.empty),
    forceReload = (false),
) {
    const path = cek_GetPath((drFs), (filePath));
    //
    if (!(forceReload) && ((loadedFile).has(path))) {
        return ((loadedFile).get(path));
    }
    //
    let urlPromise, promParser, getPromise;
    //
    switch (fileFrom) {
        case (`github`):
            urlPromise = ((iGit).ghApi_getLink(path));
            promParser = ((res) => ((res).json()));
            getPromise = (fetch(urlPromise)
                .then(async (res) => {
                    switch (res.status) {
                        case (403):
                            gitWarn_RateLimit(res);
                            throw new Error(`Rate limit hit!`);
                        case (404):
                            throw new Error(`Path not found: ${path}`);
                    }
                    cek_FetchRes(res);
                    return promParser(res);
                }).catch((err) => {
                    (loadedFile).delete(path);
                    throw (err);
            }));
            break;
        case (`local`):
            urlPromise = (dirSafe.countfile);
            promParser = ((res) => ((res).text().then(
                (v) => (parseInt((v), (10))))));
            getPromise = (fetch(dirSafe.countfile)
                .then((res) => {
                    cek_FetchRes(res);
                    //
                    return (promParser(res));
                }).then(async (count) => {
                    let files = [];
                    for (let i = 1; i <= count; i++) {
                        const res = (await fetch(`${
                            dirSafe.getfiles}/${i}.json`));
                        cek_FetchRes(res);
                        (files).push(await ((res).json()));
                    }
                    return (files);
                }));
            break;
        default:
            throw new Error(`Unknown source: ${fileFrom}`);
    }
    (loadedFile).set((path), (getPromise));
    return (getPromise);
}
    /** [Async] Comping File System Managing
     * @param {Object<string, string[]> |
     * Promise<Object<string, string[]>>} [getData]
     * @returns {Promise<void>}
     */
export async function init_SrcList (
    getData = (null),
) {
    getData ??= (get_DocFiles());
    docFiles = (((Object)
        .values(await (getData)))
        .flat(Infinity)
    );
}
//
/**/


/* Get-File Searcher Render-Configs */
    /** Searcher in Up-Down Selecting.
     * @returns {void}
     */
export function gtIn_SrcUpDown () {
    ((iScMd.srcRes).querySelectorAll
        (`li`)).forEach((elm, idx) => {
        (elm).classList.toggle(
            (`bg-blue-400`),
            ((idx) === (srcSelected)));
    });
}
//
    /** Search-Result Getter
     * @param {string} inSrc
     * @returns {string[]}
     */
export function shuffle_SrcReList (
    inSrc
) {
    const MAX_SRC_RES = (11);
        if (!(inSrc.length)) return [];
    inSrc = ((jsTx).lower(inSrc));
    //
    return (((Array).isArray(docFiles)
        ? (docFiles) : []).filter((v) => (
            (jsTx).lower(v).includes(inSrc)))
        .slice((0), (MAX_SRC_RES)));
}
    /** Search-Result Renderer
     * @param {string[]} knowRes
     * @param {(
     * value:string, index:number, item:HTMLLIElement,
     * ) => void} [onSelect]
     * @return {void}
     */
export function render_SrcReList (
    knowRes,
    onSelect = (null),
) {
    srcCurrent = (knowRes);
    set_SrcSelected(-1);
    //
    switch (knowRes.length) {
        case (0):
            srcFilter_Visible((iScMd
                .idxSrch), (false));
            (iScMd.srcRes)
                .replaceChildren();
            return;
    }
    //
    const dirBox = ((jsDoc).createElm(`ul`));
    ldmClasser((dirBox), (lRootCls), (dRootCls));
    //
    (knowRes).forEach((list, idx) => {
        let srcList = ((jsDoc).createElm(`li`));
        //
        (srcList).dataset.index = (idx);
        (srcList).textContent = (list);
        (srcList).className = ((jsHt)
            .classer(srcAutoCls));
        //
        (srcList).onclick = (() => {
            if (onSelect) {
                onSelect(list, idx, srcList);
                return;
            }
            //
            (iScMd.ftSrch).value = (list);
            (iScMd.ftSrch).dispatchEvent(
                new Event((`input`), {
                    bubbles: (true),
            }));
            //
            srcFilter_Visible((iScMd
                .idxSrch), (false));
            (iScMd.srcRes).replaceChildren();
            //
            rppf_Moderact(
                (() => {
                    mdView_Search();
                }),
                (() => { }),
            );
        });
        //
        (dirBox).appendChild(srcList);
    });
    //
    (iScMd.srcRes).replaceChildren(dirBox);
}
//
/**/


/* END */
/**/
