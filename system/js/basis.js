#!/usr/bin/env js
/* .system/js/basis.js */

/* Vars */
export const jsV = {
    empty: "",
    space: " ",
    minus: "-",
    point: ".",
    slash: "/",
    uscor: "_",
    //
    bSlash: "\\",
    jsEnt: "\n",
    jsTab: "\t",
};
//
/**/


/* Funcs */
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
export function js_GetId (id) {
    return ((document).getElementById(id));
}
export function js_CreateELm (elm) {
    return ((document).createElement(elm));
}
//
/**/


/* END */
/**/
