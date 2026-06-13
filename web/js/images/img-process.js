#!/usr/bin/env js
/* web/js/images/img-process.js */

/* Imports */
//?
//
import * as bsc from "../basis.js";
//
/**/


/* Vars - Basic */
//?
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
const htBsc = (bsc.gLink.ltp.bsc);
const htScr = (bsc.gLink.ltp.scr);
const ghRaw = (bsc.gLink.gh.base.raw);
const ghApi = (bsc.gLink.gh.base.api);
//
/**/


/* Funcs - Customs */
//?
//
/**/

/* Vars - Data */
const gRepo = (bsc.gLink.gh.path.repo);
//
const ghLink_Api = ((bsc).to_Ltp(htScr, ghApi));
const ghApi_Repo = ((bsc).jsHt.linker([
    ghLink_Api, gRepo, ]));
//
/**/


/* Init - Github */
const nameRepo = gRepo.slice(0, -1);
const reffAtBr = (`?ref=${bsc.gitD.branch}`);
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
        repo = ((htWeb.path).split(bsc.jsV.slash)
            .filter(Boolean).at(0));
    }
    bsc.gitD.repo = repo;
    return (bsc.gitD);
}
//
function ghApi_AutoLink () {
    return ((bsc).jsHt.linker([ (ghApi_Repo),
        (bsc.gitD.name), (bsc.gitD.repo),
        (`contents`), ]));
}
const fghL_Api = ((bsc).jsTx.arr2Str([
    (ghApi_AutoLink), (reffAtBr),
], (bsc.jsV.empty)));
/**/


/* Funcs - Data */
export function ghApi_getLink (path) {
    path = (((path).startsWith(bsc.jsV.slash))
        ? ((path).slice(1)) : (path));
    const getlink = ((bsc).jsHt.linker([
        (ghApi_AutoLink()), (path),
    ]));
    return ((bsc).jsTx.arr2Str([
        (getlink), (reffAtBr),
], (bsc.jsV.empty)));
}
//
/**/


/* Vars - Switch */
const format_exts = ([ "png",
    "jpg","jpeg", "webp",
    //
    "gif",
].map(ext => (`.${bsc.jsTx.lower(ext)}`)));
//
const get_bd = ((bsc).jsTx.arr2Str([
    //(`guide`),
    (`img`),
], (bsc.jsV.slash)));
const for_bd = (`${get_bd}/`);
//
/**/


/* Gets - Localize */
async function in_Fetching (path) {
    const req = (await bsc.jsA_GetFetch(path));
    if (!req.ok) { return []; }
    const html = (await (req.text()));
    const doc = (new DOMParser()
        .parseFromString(html, (`text/html`)));
    const links = [ ...doc.querySelectorAll(`a`) ]
        .map(a => ((a).getAttribute(`href`)))
        .filter(Boolean);
    //
    //(console).table({ path, links, });
    return links;
}
//
async function fetch_Prefix (path) {
    return (await in_Fetching(path))
        .filter(href => (
            (href) !== (bsc.jsV.linkBack)));
}
async function fetch_Imgs (pf_Item, exts,
    path = (`${pf_Item}`),
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
        if ([ (bsc.jsV.slash), (bsc.jsV.linkRoot),
            (bsc.jsV.linkBack), ].includes(href)
        ) { continue; }
        //
        const full = (new URL(href, getLink).pathname);
        /*/
        const full = ((href)
            .replace((/^\/\//), (bsc.jsV.slash))
            .replace((/\/+$/), (bsc.jsV.slash)));
        // */
        if (((full) === (bsc.jsV.slash2s)) ||
            ((full) === (bsc.jsV.slash)) ||
            ((href).includes(bsc.jsV.dot2s))
            ) { continue; }
        const isDir = ((href).endsWith
            (bsc.jsV.slash));
        (results).push({
            type: ((isDir) ? (`dir`) : (`file`)),
            path: (full), });
        if (isDir) { (results).push(
            ...(await get_Prefixes(full))); }
    }
    return (results);
}
async function get_Imgs (api = ghApi_getLink(`img`)) {
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
                    .jsTx.lower(item.name)).endsWith(ext));
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
