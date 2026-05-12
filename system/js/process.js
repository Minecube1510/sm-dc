#!/usr/bin/env js
/* .system/js/process.js */

/* Imports */
import * as bsc from "./basis.js";
/**/


/* Vars - Basic */
const empty = (bsc.jsV.empty);
const space = (bsc.jsV.space);
const slash = (bsc.jsV.slash);
const colon = (bsc.jsV.colon);
//
export const htWeb = {
    lnk: (window.location.href),
    dom: (window.location.origin),
    lcl: (location.hostname),
};
//
/**/


/* Funcs - Customs */
function ht_Linker (paths) {
    return ((bsc).js_Arr2Str(paths, slash));
}
//
/**/


/* Vars - Data */
// TODO: Mengubah metode bagian repo. Yang tulis manual, menjadi mengambil dari link web-nya.
//
const github = {
    user: (`Minecube1510`),
    repo: ((htWeb).lnk.split(slash)
        .filter(Boolean)[0]),
    branch: (`work-dev`), };
const ghLink_Api = ((bsc).to_Https(`api.github.com`));
const ghApi_Repo = (ht_Linker([ (ghLink_Api),
    (`repos`), ]));
//
const ghApi_AutoLink = ht_Linker([ (ghApi_Repo),
    (github.user), (github.repo), (`contents`), ]);
const fghL_Api = ((bsc).js_Arr2Str([ (ghApi_AutoLink),
    (`?ref=${github.branch}`), ], (empty)));
/**/


/* Funcs - Data */
export function ghApi_getLink (path) {
    path = (((path).startsWith(slash))
        ? ((path).slice(1)) : (path));
    const getlink = ht_Linker([
        (ghApi_AutoLink), (path),
    ]);
    return ((bsc).js_Arr2Str([(getlink),
        (`?ref=${github.branch}`),
], (empty)));
}
//
const get_ApiLink = ghApi_getLink(`img`);
export const g_AL = (get_ApiLink);
/**/


/* Vars - Switch */
const format_exts = ([ "png",
    "jpg","jpeg", "webp",
    //
    "gif",
].map(ext => (`.${bsc.js_Lower(ext)}`)));
//
const get_bd = ((bsc).js_Arr2Str([
    (repo),
    //
    //(`guide`),
    (`img`),
], (slash)));
const for_bd = (`${get_bd}/`);
//
export const is_Local = (
    ((htWeb.lcl) === (`127.0.0.1`)) ||
    ((htWeb.lcl) === (`localhost`))
);
const is_GitPg = ((htWeb.lcl)
    .endsWith(`github.io`));
//
/**/


/* Gets */
async function get_Prefixes (path = `/${get_bd}/`) {
    const results = [];
    const links = await fetch_Prefix(path);
    //
    const pf_Link = ((is_Local) ?
        (htWeb.dom) : (`${htWeb.dom}`));
    const getLink = (new URL(path, pf_Link));
    //
    for (const href of links) {
        const skipHrefs = [ (bsc.jsV.slash), (`./`), (`../`),
            ];
        if ((skipHrefs).includes(href)) { continue; }
        //
        const full = (new URL((href), ((window.location.origin)
            + (path))).pathname);
        //
        // folder
        if ((href).endsWith("/")) {
            results.push({
                type: "dir",
                path: full,
            });
                // recursive
            const sub = await get_Prefixes(full);
            results.push(...sub);
        } else {
                // file
            results.push({
                type: "file",
                path: full,
            });
        }
    }
    return (results);
}
async function get_Imgs () {
    /* Varings */
    const results = [];
    const exts = ([ "png",
        "jpg", "jpeg",
        "webp",
        //
        "gif",
    ].map(ext => (`.${bsc.js_Lower(ext)}`)));
        //
    const pf_Res = await get_Prefixes(for_bd);
    //
    /* Looping Asyncs */
    for (const item of pf_Res) {
        const pf_Item = item.path;
            //
        //console.log(pf_Item);
        //
        const req = await fetch(`${pf_Item}/`);
        const parser = new DOMParser();
            //
        const html = await req.text();
        const doc = parser.parseFromString((html),
            ("text/html"));
            //
        const links = [...doc.querySelectorAll("a")];
        const imgs = links
            .map(link => link.getAttribute("href"))
            .filter(href =>
                exts.some(ext => href?.endsWith(ext))
            );
        results.push(...imgs);
    }
    return (results);
    //
}
//
export const all_Images = ((await get_Imgs()));
/**/


/* Uji Coba */
//?
//
/**/


/* END */
/**/
