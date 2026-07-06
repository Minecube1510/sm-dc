#!/usr/bin/env js
/* web/js/basis.js */

/* Imports */
//Importing...
//
/**/


/* Func: Basic */
export const jsTx = {
    upper: ((txt) => ((txt).toUpperCase())),
    lower: ((txt) => ((txt).toLowerCase())),
    //
    trm: ((text) => ((text).trim())),
    //
    arr2Str: ((arr, sep) => ((arr).join(sep))),
};
/**/


/* Fetchings */
let data = ((Object).fromEntries(
    await ((Promise).all([
        `vars`, `dir-safe`,
        `git-data`, `git-link`,
    ].map(async (file) => {
        let json = (await (fetch(jsTx
            .lower(`call/json/${file}.json`
        ))));
        return [ (file), (await (
            json.json())), ];
    })))
));
//
export const jsVar = (data[`vars`]);
export const inGit = {
    data: (data[`git-data`]),
    link: (data[`git-link`]),
}
export const dirSafe = ((data
    [`dir-safe`]));
/**/


/* Func: Logs */
export const jsCs = {
    log: ((console).log),
    warn: ((console).warn),
    error: ((console).error),
    //
    grBgn: ((console).group),
    table: ((console).table),
    grEnd: ((console).groupEnd),
    //
    time: ((console).time),
    tmEnd: ((console).timeEnd),
};
//
/**/


/* Func: Docs */
export const jsDoc = {
    getId: (id, doc = document) =>
        ((doc).getElementById(id)),
    createElm: (tag, doc = document) =>
        ((doc).createElement(tag)),
    qSelectAll: (tag, doc = document) =>
        ((doc).querySelectorAll(tag)),
    //
    appEnd_Ch: (el, doc = document) =>
        ((doc).body.appendChild(el)),
    prepEnd: (el, doc = document) =>
        ((doc).body.prepend(el)),
    //
};
//
/**/


/* Func: Customs */
    /** Repeat the "String"
     * @param {string} strToRept
     * @param {number} repTimes
     * @returns {string}
     */
export function js_StRept (
    strToRept, repTimes,
) {
    let result = (jsVar.empty);
    for (let i = 0; i < repTimes; i++) {
        result += strToRept; }
    return (result);
}
//
let mapEl = ((mapping, fn) => ((Object)
    .fromEntries((Object).entries(mapping)
        .map(([key, id]) => [ (key), (fn(id)),
]))));
export let jsMod = {
    createEl_Map: ((mapping) =>
        mapEl((mapping), ((jsDoc).createElm))),
    getEl_Map: ((mapping) =>
        mapEl((mapping), ((jsDoc).getId))),
    //
};
//
export const jsHt = {
    classer: ((classes) => (
        (jsTx).arr2Str((classes), (jsVar.space)))),
    linker: ((paths) => (
        (jsTx).arr2Str((paths), (jsVar.slash)))),
    //
};
//
/**/


/* Func: Linker */
    /** Linking for "HTTP/HTTPS"
     * @param {string} text_Protocol
     * @param {string} link_txtPro
     * @returns {string}
     */
export function toLink_txtPro (
    text_Protocol, link_txtPro,
) {
    return ((jsTx).lower((jsTx).arr2Str([
        (text_Protocol), (link_txtPro),
    ], (jsVar.linkLmt))));
}
//
/**/


/* END */
/**/
