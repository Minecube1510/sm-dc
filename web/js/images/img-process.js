#!/usr/bin/env js
/* web/js/images/img-process.js */

/* Imports */
import { jsVar, inGit, dirSafe,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
//
import * as iGit from '../init-github.js';
//
/**/


/* Helpers & Variables */
const format_exts = ([
    `png`, `jpg`,`jpeg`, `webp`,
    //
    `gif`,
].map(ext => (`.${(jsTx).lower(ext)}`))),
    //
srcGetImg = (() => { return (`${(jsTx).arr2Str([
        //(`guide`),
        (`img`),
    ], (jsVar.slash))}/`);
})();
//
/**/


/* Gets - Localize */
//
    /** [Async] Fetching All-Images
     * @param {string} pathFetch
     * @param {Boolean} fetchMethod
     * @returns {Promise<string[]>}
     */
async function srcLink_Fetcher (
    pathFetch = (jsVar.empty),
    fetchMethod = (true),
) {
    //(jsCs).log((`Fetcher:`), (fetchMethod));
    //
    const reqFetch = (await (fetch(pathFetch)));
        if (!(reqFetch.ok)) return [];
    //
    switch (fetchMethod) {
        case (true):  /* Local */
            const imgCount = (parseInt(await (
                (reqFetch).text()), (10)));
            //
            return ((Promise).all((Array).from({ length:
                imgCount, }, (async (_, i) => ((await
                fetch(`${dirSafe.getimages}/${(i) +
                    (1)}.json`)).json()))))
            );
        case (false):  /* Github */
            return ([ ...(new DOMParser().parseFromString(
                await ((reqFetch).text()), (`text/html`))
                .querySelectorAll(`a`)), ].map(a => ((a)
                .getAttribute(`href`))).filter(Boolean)
            );
        default:
            return;
}}
//
    /** [Async] Scanning Images-Path Prefix
     * @param {string} pathGet
     * @param {Boolean} scanMethod
        *
     * @typedef {Object} GitImgPrefix
     * @property {"dir"|"file"} type
     * @property {string} path
     */
async function srcPrefix_Scanner (
    pathGet = (jsVar.empty),
    scanMethod = (true),
) {
    //(jsCs).log((`Scanner:`), (scanMethod));
    //
    let items = [],
        links, getDom;
    //
    switch (scanMethod) {
        case (true):  /* Local */
            links = (await (srcLink_Fetcher(
                pathGet, true)));
            getDom = (jsVar.slash);
            //
            items = ((links).map((arr) => ((arr).map(
                (v) => ((jsTx).arr2Str([ (getDom),
                    (v), ], (jsVar.empty)))
            ))));
            return (items);
        //
        case (false):  /* Github */
            pathGet = (`./${srcGetImg}`);
                //
            links = (await (srcLink_Fetcher(pathGet, false)
                .then((result) => ((result).filter(
                    (href) => ((href) !== (jsVar.linkBack)
            ))))));
            getDom = (new URL((pathGet), (iGit.htWeb.dom)));
            //
            for (let href of links) {
                let full = ((new URL(href, getDom)).pathname),
                    isDir = ((href).endsWith(jsVar.slash));
                //
                switch (true) {
                    case ([ (jsVar.slash), (jsVar.linkRoot),
                        (jsVar.linkBack), ].includes(href)):
                        continue;
                    case (((full) === (jsVar.slash2s)) ||
                        ((full) === (jsVar.slash)) ||
                        ((href).includes(jsVar.dot2s))):
                        continue;
                }
                //
                (items).push({
                    type: ((isDir) ? (`dir`) : (`file`)),
                    path: (full),
                });
                //
                if (isDir) {
                    let sub = (await srcPrefix_Scanner(
                        full, scanMethod));
                    //
                    items = ((items).concat(sub));
                }
            }
            //
            return (items);
        default:
            return [];
    }
}
    /** [Async] For All-Images Processor Methods
     * @param {string} linkImgSrc
     * @param {Boolean} lisMethod
     * @returns {Promise<string[]>}
     */
async function alImages_Processor (
    linkImgSrc = (jsVar.empty),
    lisMethod = (true),
) {
    //(jsCs).log((`Processor:`), (lisMethod));
    //
    const isGitLink = ((iGit.htWeb
        .lcl).endsWith(`github.io`)),
        seen = (new Set());
    let addImage = ((img) => ((seen).add(img))),
        prefixes;
    //
    switch ((lisMethod) && (!(isGitLink))) {
        case (true):
            prefixes = (await (srcPrefix_Scanner(
                linkImgSrc, true)));
            //
            for (const [ i, group, ]
                of prefixes.entries()) {
                (seen).clear();
                (group).forEach((href) => (((format_exts)
                    .some((ext) => ((href).toLowerCase()
                    .endsWith(ext)))) && (addImage(href))
                ));
                //
                prefixes[i] = [...seen];
            }
            return (prefixes);
        case (false):
            prefixes = (await (srcPrefix_Scanner(
                srcGetImg, false)));
            //
            for (const item of prefixes) {
                let links = (await (srcLink_Fetcher(
                    (item.path), (false))));
                //
                for (const href of links) {
                    if ((format_exts).some((ext) => (
                        (href)?.endsWith(ext)
                    ))) { addImage(href);
            }}}
            //
            return [ ...(seen), ];
        default:
            return [];
}}
//
    /** [Async] Gathering that all Images
     * @param {string} getImgSrc
     * @param {Boolean} gatherMethod
     * @returns {void}
     */
export async function alImages_Ascertains(
    getImgSrc = (jsVar.empty),
    gatherMethod = (true),
) {
    //(jsCs).log((`Gathering:`), (gatherMethod));
    //
    switch (gatherMethod) {
        case (true):
            let gaterhing = (await (alImages_Processor(
                getImgSrc, true)));
            //
            return (await ((gaterhing).flat()));
        case (false):
            await ((iGit).git_Config());
            //
            return (await (alImages_Processor(
                getImgSrc, false)));
        default:
            return [];
}}
//
/**/


/* Uji Coba */
//
/**/


/* END */
/**/
