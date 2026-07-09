#!/usr/bin/env js
/* web/js/index/idx-process.js */

/* Imports */
import { jsVar, jsMod,
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
},
mdWaitLoad = ((ms) => {
    return (new Promise((r) => (
        setTimeout((r), (ms)))));
});
//
    /** Loading Screen Preview Maker
     * @param {Boolean} stLoad
     * @param {?HTMLElement} loadElm
     * @returns {void}
     */
export async function loadScreen_MaDo (
    stLoad = (true),
    loadElm = (iScMd.madoLs),
) {
        if (!loadElm) return;
    (jsMod).setElm((loadElm), {
        className: ((loadElm.classList.length)
            ? (loadElm.className) : ((jsHt)
            .classer(idxStrg.mdVi_LsComp_Cls))
        ),
    });
    (loadElm).replaceChildren((stLoad)
        ? ((jsMod).setElm(((jsDoc)
            .createElm(`span`)), {
            //
    className: (`animate-pulse`),
    textContent: (`Loading the Markdown...`),
            //
        }))
        : (null)
    );
    //
    (Object).entries({
        "opacity-100": (stLoad),
        "opacity-0": (!(stLoad)),
    }).forEach(([ cls, cond, ]) => ((loadElm)
        .classList.toggle(cls, cond)
    ));
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
    (jsMod).setElm((iScMd.content), {
        innerHTML: marked(file_MarkDown),
    });
    //
    (jsDoc).qSelectAll(`img`).forEach(
        (img) => ((jsMod).setElm((img), {
            draggable: (false),
    })));
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
    const md_Cache = ((mdProc_State)
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
                ok: (true),
                f_markdown: (md_Cache),
            };
        case ((mdProc_State).time_pend
            .has(path_Loader)):
            return {
                ok: false,
                reason: reaState.pndg,
            };
    }
    //
    (mdProc_State).time_pend.add(path_Loader);
    //
    try {
        let fileMd = (await (fetch(path_Loader)));
        //
        if (!(fileMd.ok)) {
            (mdProc_State).cache.set(path_Loader, false);
            return {
                ok: false,
                reason: (reaState.md_n_fnd),
            };
        }
        fileMd = (await ((fileMd).text()));
        (mdProc_State).cache
            .set(path_Loader, fileMd);
        //
        return {
            ok: (true),
            f_markdown: (fileMd),
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
        .values((toMd)), (jsVar.empty))),
        //
        md_StateSrc = ((!(toMd.mdPath))
        ? (`empty`) : (
            ((toMd.mdPath).endsWith(jsVar.point)) ||
            ((toMd.mdPath).endsWith(toMd.fpMado))
        ) ? (`invalid`) : (`valid`)
        );
    //
    switch (md_StateSrc) {
        case (`empty`):
            return {
                ok: (false),
                reason: (reaState.empty),
            };
        case (`invalid`):
            alert((`Didn't need to be formatted usual`)
                + (`:\n`) + (md_PathSrc));
            //
            return {
                ok: false,
                reason: (reaState.iv_fm),
            };
        case (`valid`):
            let hasCache = ((mdProc_State)
                .cache.has(md_PathSrc)),
                waitload = (1500);
            const loadScreen = (async (st) => ((hasCache)
                || (await loadScreen_MaDo(st))));
            //
            await loadScreen_MaDo(true);
            //
            const [mdRes] = (await (Promise).all([
                mdVi_Loader(md_PathSrc),
                mdWaitLoad(waitload),
            ]));
            //
            await loadScreen_MaDo(false);
            //
            if (mdRes.ok) { (mdRes)
                .f_markdown = (mdVi_Renderer(
                    mdRes.f_markdown));
            }
            //
            return (mdRes);
    }
}
//
    /** Clearing Wipe-out MD that viewed
     * @returns {void}
     */
export function mdVi_Clear () {
    (jsMod).setElm((iScMd.content), {
        innerHTML: (jsVar.empty),
    });
}
//
/**/


/* Uji Coba */
//Later...
//
/**/


/* END */
/**/
