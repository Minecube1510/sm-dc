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
export async function get_GhData () {
    const req = await fetch(`/package.json`);
    const pkg = await req.json();
    const repo = (pkg.name);
    //
    return {
        user: (`Minecube1510`),
        repo,
        branch: (`work-dev`),
    };
}
//
/**/


/* Vars - Data */
export const github = await get_GhData();
const ghLink_Api = ((bsc).to_Https(`api.github.com`));
const ghApi_Repo = (ht_Linker([ (ghLink_Api),
    (`repos`), ]));
//
const ghApi_AutoLink = ht_Linker([ (ghApi_Repo),
    (github.user), (github.repo), (`contents`), ]);
const fghL_Api = ((bsc).js_Arr2Str([ (ghApi_AutoLink),
    (`?ref=${github.branch}`),], (empty)));
//
//console.log(github);
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


/* Gets - Localize */
async function in_Fetching (path) {
    const req = (await bsc.jsA_GetFetch(path));
    if (!req.ok) { return []; }
    const html = (await (req.text()));
    const doc = (new DOMParser()
        .parseFromString(html, "text/html"));
    return [ ...doc.querySelectorAll("a") ]
        .map(a => a.getAttribute("href"))
        .filter(Boolean);
}
//
async function fetch_Prefix (path) {
    return (await in_Fetching(path))
        .filter(href => ((href) !== ("../")));
}
async function fetch_Imgs (pf_Item, exts,
    path = (`${pf_Item}/`),
) {
    return ((await in_Fetching(path)).filter((href) =>
        exts.some((ext) => href?.endsWith(ext)),
    ));
}
//
async function get_Prefixes (path = (`./${for_bd}`)) {
    /* Async Configs */
    const results = [];
    const links = await fetch_Prefix(path);
    //
    const pf_Link = ((is_Local) ?
        (htWeb.dom) : (`${htWeb.dom}`));
    const getLink = (new URL(path, pf_Link));
    //
    for (const href of links) {
        if ([ (slash), (`./`), (`../`), ]
            .includes(href)) { continue; }
        const full = (new URL(href, getLink).pathname);
        const isDir = ((href).endsWith(slash));
        //
        (results).push({
            type: ((isDir) ? (`dir`) : (`file`)),
            path: (full),
        });
        if (isDir) { (results).push(
            ...(await get_Prefixes(full))); }
    }
    return (results);
}
async function get_Imgs (api = g_AL) {
    /* Local */
    if (is_Local) {
        const pf_Res = (await get_Prefixes(for_bd));
        return ((await Promise.all((pf_Res).map(
            (item) => fetch_Imgs((item.path),
                (format_exts))))).flat()
            .filter((href) => (format_exts)
                .some((ext) => href?.endsWith(ext)
        )));
    }
    /* Github Pages */
    if (!(is_GitPg)) { return []; }
    /* In Process */
    const req = (await fetch(api));
        if (!(req.ok)) { return []; }
    const data = (await req.json());
    //
    return (await Promise.all(data.map(
        async (item) => {
            /* Folder */
            if ((item.type) === (`dir`)) { return (
                await get_Imgs(item.url));
            }
            /* File */
            const is_Img = ((item.type) === (`file`)) &&
                (format_exts).some((ext) => ((bsc)
                    .js_Lower(item.name)).endsWith(ext));
            return ((is_Img) ? ({
                name: (item.name),
                path: (item.path),
                src: (item.download_url),
            }) : ([]));
        })
    )).flat();
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
