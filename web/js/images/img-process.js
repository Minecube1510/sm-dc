#!/usr/bin/env js
/* web/js/images/img-process.js */

/* Imports */
import { jsVar,
    jsTx, jsCs,
    //
    dirSafe,
    } from "../basis.js";
    //
import * as iGit from '../init-github.js';
//
/**/


/* Helpers & Variables */
const format_exts = ([ `png`,
    `jpg`,`jpeg`, `webp`,
    //
    `gif`,
].map((ext) => (`.${(jsTx).lower(ext)}`)));
//
/**/


/* Gets - Localize */
    /** [Async] Fetching All-Images
     * @param {string} pathFetch
     * @param {Boolean} fetchMethod
     * @returns {Promise<string[]>}
     */
export async function srcLink_Fetcher (
    pathFetch = (jsVar.empty),
    fetchMethod = (true),
) {
    //(jsCs).log((`Fetcher:`), (fetchMethod));
    //
    const reqFetch = (await (fetch(pathFetch)));
    //
    if (!(reqFetch.ok)) {
        (jsCs).log(reqFetch);
        (iGit).gitWarn_RateLimit(reqFetch);
        //
        return [];
    }
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
            pathFetch = (await ((reqFetch).json()));
            //
            return (await (pathFetch));
        default:
            return [];
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
export async function srcPrefix_Scanner (
    pathGet = (jsVar.empty),
    scanMethod = (true),
) {
    //(jsCs).log((`Scanner:`), (scanMethod));
    //
    let items = [],
        links;
    //
    switch (scanMethod) {
        case (true):  /* Local */
            links = (await (srcLink_Fetcher(
                pathGet, true)));
            //
            items = ((links).map((arr) => ((arr).map(
                (v) => (`/${v}`)
            ))));
            return (items);
        //
        case (false):  /* Github */
            links = (await (srcLink_Fetcher(pathGet, false)
                .then((result) => ((result).filter(
                    (href) => ((href) !== (jsVar.linkBack)
            ))))));
            //
            for (const item of links) {
                (items).push({
                    type: (item.type),
                    path: (`/${item.path}`),
                });
                if ((item.type) === (`dir`)) {
                    const sub = (await (srcPrefix_Scanner(
                        ((iGit).ghApi_getLink(item.path)),
                        (false),
                    )));
                    (items).push(...sub);
            }}
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
export async function alImages_Processor (
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
        case (true):  /* Local */
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
        case (false):  /* Github */
            prefixes = (await (srcPrefix_Scanner(
                linkImgSrc, false)));
            //
            for (const item of prefixes) {
                if (((item.type) === (`file`)) && ((format_exts)
                    .some((ext) => ((jsTx).lower(item.path)
                    .endsWith(ext)))
                )) { addImage(item.path); }
            }
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
    let gaterhing;
    //
    switch (gatherMethod) {
        case (true):  /* Local */
            gaterhing = (await (alImages_Processor(
                getImgSrc, true)));
            //
            return (await ((gaterhing).flat()));
        case (false):  /* Github */
            await ((iGit).git_Config());
            //
            gaterhing = (await (alImages_Processor(
                getImgSrc, false)));
            //
            return (await ((gaterhing)));
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
