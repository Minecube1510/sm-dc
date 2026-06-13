#!/usr/bin/env js
/* web/js/basis.js */

/* Imports */
//?
//
/**/


/* Fetchings */
// /*
const files = [(`vars`),
    (`git-data`), (`glink`),
];
const data = await ((Promise)
    .all(files.map(file => fetch
        (`call/json/${file}.json`)
        .then(r => r.json())
)));
export const [jsV,
    gitD, gLink,
] = (data);
// */
/**/


/* Vars */
const DOC = (document);
const CNSL = (console);
//
//?
//
/**/


/* Func: Basic */
export const jsTx = {
    arr2Str: (arr, sep) => ((arr).join(sep)),
    upper: (txt) => (txt.toUpperCase()),
    lower: (txt) => (txt.toLowerCase()),
};
/**/


/* Func: Logs */
export const jsCs = {
    log: ((CNSL).log),
    warn: ((CNSL).warn),
    error: ((CNSL).error),
    //
    grBgn: ((CNSL).group),
    table: ((CNSL).table),
    grEnd: ((CNSL).groupEnd),
    //
};
//
/**/


/* Func: Docs */
export const jsDoc = {
    getId: (id, doc = DOC) =>
        ((doc).getElementById(id)),
    createElm: (tag, doc = DOC) =>
        ((doc).createElement(tag)),
    //
    appEnd_Ch: (el, doc = DOC) =>
        ((doc).body.appendChild(el)),
    prepEnd: (el, doc = DOC) =>
        ((doc).body.prepend(el)),
    //
};
//
/**/


/* Func: Asyncs */
export async function jsA_GetFetch (pathlink) {
    return await fetch(pathlink);
}
//
/**/


/* Func: Customs */
export function js_StRept (str, times) {
    let result = (jsV.empty);
    for (let i = 0; i < times; i++) {
        result += str; }
    return (result);
}
//
export const jsHt = {
    classer: (classes) => (
        (jsTx).arr2Str((classes), (jsV.space))),
    linker: (paths) => (
        (jsTx).arr2Str((paths), (jsV.slash))),
    //
};
//
/**/


/* Func: Linker */
export function to_Ltp (tp, link) {
    const linkLmt = (jsV.linkLmt);
    const linking = ((jsTx)
        .lower((jsTx).arr2Str([
        (tp), (link), ], (linkLmt))));
    return (linking);
}
//
/**/


/* END */
/**/
