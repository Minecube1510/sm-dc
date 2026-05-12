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
    //
    path: (window.location.pathname),
};
//
export const is_Local = (
    ((htWeb.lcl) === (`127.0.0.1`)) ||
    ((htWeb.lcl) === (`localhost`))
);
const is_GitPg = ((htWeb.lcl)
    .endsWith(`github.io`));
//
//
/**/


/* Funcs - Customs */
function ht_Linker (paths) {
    return ((bsc).js_Arr2Str(paths, slash));
}
//
/**/

/* Vars - Data */
const ghLink_Api = ((bsc).to_Https(`api.github.com`));
const ghApi_Repo = (ht_Linker([ (ghLink_Api),
    (`repos`), ]));
//
/**/


/* Init - Github */
const nameRepo = (`Repository`);
export const github = {
    user: (`Minecube1510`),
    repo: (nameRepo),
    branch: (`work-dev`),
};
//
export async function init_Github () {
    let repo = (nameRepo);
    //
    if (is_Local) {
        const req = (await fetch("./package.json"));
        const pkg = (await (req.json()));
        //
        repo = (pkg.name);
    } else {
        repo = ((htWeb.path).split(slash)
            .filter(Boolean).at(0));
    }
    (github).repo = (repo);
    return (github);
}
//
function ghApi_AutoLink () {
    return ht_Linker([ (ghApi_Repo),
        (github.user), (github.repo),
        (`contents`),
    ]);
}
const fghL_Api = ((bsc).js_Arr2Str([ (ghApi_AutoLink),
    (`?ref=${github.branch}`),], (empty)));
/**/


/* Funcs - Data */
export function ghApi_getLink (path) {
    path = (((path).startsWith(slash))
        ? ((path).slice(1)) : (path));
    const getlink = ht_Linker([
        (ghApi_AutoLink()), (path),
    ]);
    return ((bsc).js_Arr2Str([(getlink),
        (`?ref=${github.branch}`),
], (empty)));
}
export function get_ApiLink () {
    return ghApi_getLink(`img`);
}
//
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
async function get_Imgs (api = get_ApiLink()) {
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
export async function all_Images () {
    await init_Github();
    return await get_Imgs();
}
/**/


/* Uji Coba */
//?
//
/**/


/* END */
/**/
