#!/usr/bin/env js
/* .system/js/basis.js */

/* Vars */
export const jsV = {
    empty: (``),
    space: (` `),
        //
    minus: (`-`),
    point: (`.`),
    slash: (`/`),
    uscor: (`_`),
    colon: (`:`),
    //
    bSlash: (`\\`),
    jsEnt: (`\n`),
    jsTab: (`\t`),
    //
    wRoot: (`./`),
    bcDir: (`../`),
};
//
/**/


/* Func: Basic */
export function js_Arr2Str (arrs, spare) {
    return ((arrs).join(spare));
}
export function js_Upper (text) {
    return ((text).toUpperCase());
}
export function js_Lower (text) {
    return ((text).toLowerCase());
}
//
/**/


/* Func: Logs */
export function c_Log (msg) {
    return ((console).log(msg));
}
export function c_Warn (msg) {
    return ((console).warn(msg));
}
export function c_Error (msg) {
    return ((console).error(msg));
}
//
export function c_GrBgn (msg) {
    return ((console).group(msg));
}
export function c_Table (msg) {
    return ((console).table(msg));
}
export function c_GrEnd () {
    return ((console).groupEnd());
}
/**/


/* Func: Logs */
export function js_GetId (id) {
    return ((document).getElementById(id));
}
export function js_CreateELm (elm) {
    return ((document).createElement(elm));
}
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
/**/


/* Func: Linker */
export function to_Https (link) {
    const empty = (jsV.empty);
    const slash = (jsV.slash);
    const colon = (jsV.colon);
    //
    const limiter = js_Arr2Str([ (colon),
        js_StRept((slash), (2)),
    ], (empty));
    return js_Arr2Str([
        js_Lower(`https`),
        (limiter), (link),
    ], (empty));
}


/* END */
/**/
