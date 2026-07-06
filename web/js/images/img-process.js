#!/usr/bin/env js
/* web/js/images/img-process.js */

/* Imports */
import { jsVar,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
//
import * as iGit from '../init-github.js';
//
/**/


/* Variables - Images */
const format_exts = ([
    `png`, `jpg`,`jpeg`, `webp`,
    //
    `gif`,
].map(ext => (`.${(jsTx).lower(ext)}`)));
//
const for_bd = (() => { return (
    `${(jsTx).arr2Str([
        //(`guide`),
        (`img`),
], (jsVar.slash))}/`);
})();
//
/**/


/* Gets - Localize */
    /** [Async] Fetching all Images method
     * @param {string} pathFetch
     * @returns {Promise<string[]>}
     */
async function images_Fetchings (
    pathFetch,
) {
    const fetch_req = await (fetch(pathFetch));
        if (!(fetch_req.ok)) return [];
    return [ ...(new DOMParser().parseFromString(
        await ((fetch_req).text()), (`text/html`)
      ).querySelectorAll(`a`)), ].map(a => ((a)
        .getAttribute(`href`))).filter(Boolean);
}
    /** [Async] Get Images Path-Prefix
     * @typedef {Object} ImgPrefix
     * @property {"dir"|"file"} type
     * @property {string} path
     */
async function getImg_Prefixes (
    pathGet = (`./${for_bd}`),
) {
    let links = ((await images_Fetchings(pathGet)).filter(
        href => ((href) !== (jsVar.linkBack))));
    let getDom = (new URL((pathGet), (iGit.htWeb.dom)));
    //
    let items = [];
    for (let href of links) {
        let full = (new URL(href, getDom).pathname);
        switch (true) {
            case ([(jsVar.slash), (jsVar.linkRoot),
                (jsVar.linkBack), ].includes(href)
            ):
                continue;
            case (((full) === (jsVar.slash2s)) ||
                ((full) === (jsVar.slash)) ||
                ((href).includes(jsVar.dot2s))
            ):
                continue;
        }
        let isDir = ((href).endsWith(jsVar.slash));
        //
        (items).push({
            type: ((isDir) ? (`dir`) : (`file`)),
            path: (full),
        });
        if (isDir) {
            let sub = (await (getImg_Prefixes(full)));
            items = ((items).concat(sub));
        }
    }
    return (items);
}
    /** [Async] Final getting all Images
     * @param {string} [api=iGit.ghApi_getLink("img")]
     * @returns {Promise<string[]>}
     */
async function getAll_Images (
    api = ((iGit).ghApi_getLink(`img`)),
) {
    const seen = (new Set());
    const addImage = ((img) => ((seen).add(img)));
    //
    switch (true) {
        case (iGit.is_Local): {
            let prefixes = (await (getImg_Prefixes(for_bd)));
            for (const item of prefixes) {
                let links = (await (images_Fetchings(item.path)));
                for (const href of links) {
                    if ((format_exts).some(ext => (
                        (href)?.endsWith(ext)
                    ))) {
                        addImage(href);
                    }
                }
            }
            return [...seen];
        }
        case (!((iGit).htWeb.lcl.endsWith(`github.io`))):
            return [];
        default:
            break;
    }
    const req = await (fetch(api));
        if (!(req.ok)) return [];
    const data = (await (req.json()));
    //
    for (const item of data) {
        switch (item.type) {
            case (`dir`):
                let sub = (await (getAll_Images(item.url)));
                (sub).forEach(addImage);
                break;
            case (`file`):
                if ((format_exts).some(ext => ((jsTx)
                    .lower(item.name).endsWith(ext)))
                ) {
                    addImage(item.download_url);
                }
                break;
            default:
                break;
        }
    }
    return [...seen];
}
    /** [Async] Gathering that all Images
     * @returns {void}
     */
export async function gather_AlImages () {
    await ((iGit).git_Config());
    return (await (getAll_Images()));
}
//
/**/


/* Uji Coba */
//
/**/


/* END */
/**/
