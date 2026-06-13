#!/usr/bin/env js
/* web/js/index/idx-process.js */

/* Imports */
import * as bsc from "../basis.js";
import * as drpg from "../set-paging.js";
//
import { marked
    } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
/**/


/* Vars */
//?
//
/**/


/* Struct - Comping */
export const fMD = {
    content: ((bsc).jsDoc.getId('content')),
    view: ((bsc).jsDoc.getId('article-md-view')),
    search: ((bsc).jsDoc.getId('article-md-search')),
};
//
const mdState = {
    cache: new Map(),
    pending: new Set()
};
//
/**/


/* Struct - Functing */
export async function loadMD (
    path, placeholder = null) {
    const cache = (mdState.cache.get(path));
    //
    if ((cache) === (false)) {
        (fMD).content.innerHTML = (placeholder);
        return { ok: false, reason: "cached_not_found" }; }
    if (cache) {
        (fMD).content.innerHTML = marked(cache);
        return { ok: true, md: cache }; }
    if (mdState.pending.has(path)) {
        return { ok: false, reason: "pending" }; }
    (mdState).pending.add(path);
    //
    try {
        const res = await fetch(path);
        //
        if (!(res.ok)) {
            (mdState).cache.set(path, false);
            (fMD).content.innerHTML = (placeholder);
            return { ok: false, reason: "not_found" };
        }
        const md = await (res.text());
        //
        (mdState).cache.set(path, md);
        (fMD).content.innerHTML = marked(md);
        //
        return { ok: true, md };
    } catch {
        (mdState).cache.set(path, false);
        (fMD).content.innerHTML = (placeholder);
        //
        return { ok: false, reason: "error" };
    } finally {
        (mdState).pending.delete(path);
    }
}
export async function md_Searching (placeholder) {
    const path = (fMD.view.value.trim());
    const emdi = (`${bsc.jsV.point}md`);
    //
    if (!(path)) {
        return { ok: false, reason: "empty" };
    }
    if (((path).endsWith(bsc.jsV.point)) ||
        ((path).endsWith(emdi))
    ) {
        alert(`Didn't need to be formatted usual`);
        return { ok: false, reason: "invalid_format" };
    }
    const f_MD = ((bsc).jsTx.arr2Str([
        path, emdi, ], (bsc.jsV.empty)));
    return await loadMD(f_MD, placeholder);
}
//
export function md_Clear () {
    (fMD).content.innerHTML = (bsc.jsV.empty);
}
//
/**/


/* Uji Coba */
//?
//
/**/


/* END */
/**/
