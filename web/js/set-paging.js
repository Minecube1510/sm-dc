#!/usr/bin/env js
/* web/js/set-paging.js */

/* Imports */
import * as bsc from "./basis.js";
//
/**/


/* Automate */
if (location.search) {
    const locate_Pn = (location.pathname);
    //
    (location).replace(locate_Pn);
    (history).replaceState((null),
        (bsc.jsV.empty), (locate_Pn));
    (history).back(-1);
}
//
/**/


/* Auto-Struct - Paging */
export function draw_Title (title) {
    const ph_Title = (bsc.jsDoc.getId(`title`).innerHTML);
    //
    (bsc).jsDoc.getId("title").innerHTML = ((bsc)
        .jsTx.arr2Str([ title, ph_Title, ], (` | `)));
};
//
export function reBrand_UserGit (uname) {
    const git_Uname = ((bsc).jsDoc.getId(`github-username`));
    if (git_Uname) { (git_Uname).textContent = (uname); }
}
//
/**/


/* END */
/**/
