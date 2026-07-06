#!/usr/bin/env js
/* web/js/index/idx-process.js */

/* Imports */
import { jsVar,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
    //
import * as idxStrg from './idx-storage.js';
    import { reaState,
        md_Data as iMd,
        idxSearchMD_CompId as iScMd,
    } from "./idx-storage.js";
//
import { marked,
    } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
/**/


/* Struct - Comping */
const mdProc_State = {
    cache: new Map(),
    failed: new Set(),
    time_pend: new Set(),
};
//
    /** Loading Screen Preview Maker
     * @param {Boolean} stLoad
     * @returns {void}
     */
export function loadScreen_MaDo (
    stLoad = (true),
) {
    //
}
//
/**/


/* Struct - Functing */
    /** Render Markdown into Viewered
     * @param {string} file_MarkDown
     * @returns {string}
     */
function mdVi_Renderer (
    file_MarkDown,
) {
    (iScMd.content).innerHTML = marked(file_MarkDown);
    //
    (jsDoc).qSelectAll(`img`).forEach(
        (img) => { (img)
            .draggable = (false);
    });
    //
    return (file_MarkDown);
}
    /** [Async] Loaded Markdown Files
     * @param {string} path_Loader
     * @returns {Promise<Object>}
     */
async function mdVi_Loader (
    path_Loader,
) {
    const md_Cache = (mdProc_State
        .cache.get(path_Loader));
    //
    switch (true) {
        case ((md_Cache) === (false)):
            return {
                ok: false,
                reason: (reaState.chc_n_fnd),
            };
        case ((md_Cache) !== (undefined)):
            return {
                ok: true,
                f_markdown: mdVi_Renderer(md_Cache),
            };
        case (mdProc_State.time_pend
            .has(path_Loader)):
            return {
                ok: false,
                reason: reaState.pndg,
            };
    }
    //
    (mdProc_State).time_pend
        .add(path_Loader);
    //
    try {
        let f_Md = (await (fetch(path_Loader)));
        //
        if (!(f_Md.ok)) {
            (mdProc_State).cache.set(path_Loader, false);
            return {
                ok: false,
                reason: (reaState.md_n_fnd),
            };
        }
        f_Md = (await ((f_Md).text()));
        (mdProc_State).cache
            .set(path_Loader, f_Md);
        //
        return { ok: true,
            f_markdown: mdVi_Renderer(f_Md),
        };
    } catch {
        (mdProc_State).cache.set(path_Loader, false);
        //
        return {
            ok: false,
            reason: (reaState.error),
        };
    } finally {
        (mdProc_State).time_pend.delete(path_Loader);
    }
}
//
    /** [Async] Search Markdown File
     * @param {?string} src_Ph
     * @returns {Promise<Object>}
     */
export async function mdVi_Searching (
    src_Ph,
) {
    const toMd = {
        mdPath: (iMd.srcPath),
        fpMado: (iMd.fpMado),
    };
    let md_PathSrc = ((jsTx).arr2Str(Object
        .values((toMd)), (jsVar.empty))
    );
    let md_StSrc = ((!(toMd.mdPath))
        ? (`empty`) : (
            ((toMd.mdPath).endsWith(jsVar.point)) ||
            ((toMd.mdPath).endsWith(toMd.fpMado))
        ) ? (`invalid`) : (`valid`)
    );
    //
    switch (md_StSrc) {
        case (`empty`):
            return {
                ok: false,
                reason: (reaState.empty),
            };
        case (`invalid`):
            alert((`Didn't need to be formatted usual`)
                + (`:\n`) + (md_PathSrc));
            return {
                ok: false,
                reason: (reaState.iv_fm),
            };
        case (`valid`):
            const hasCache = ((mdProc_State)
                .cache.has(md_PathSrc));
            //
            if (!(hasCache)) {
                loadScreen_MaDo(true);
            }
            //
            try {
                return (await mdVi_Loader(
                    md_PathSrc));
            } finally {
                if (!(hasCache)) {
                    loadScreen_MaDo(false);
                }
            }
    }
}
    /** Clearing Wipe-out MD that viewed
     * @returns {void}
     */
export function mdVi_Clear () {
    (iScMd).content.innerHTML = (jsVar.empty);
}
//
/**/


/* Uji Coba */
//Later...
//
/**/


/* END */
/**/
