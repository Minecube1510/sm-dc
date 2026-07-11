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
const format_exts = ([`png`,
    `jpg`, `jpeg`, `webp`,
    //
    `gif`,
].map((ext) => (`.${(jsTx).lower(ext)}`))),
    inScan = (new Set());
    ;
//
    /** Autofy Integ-Parser
     * @param {number} intRes
     * @returns {number}
     */
function auto_IntParser (
    intRes,
) {
    return (parseInt((intRes), (10)));
}
//
/**/


/* GET - Localize */
    /** [Async] Fetching All-Images
     * @param {string} pathFetch
     * @param {Boolean} fetchMethod
     * @param {Boolean} slf_Once
     * @returns {Promise<any>}
     */
export async function srcLink_Fetcher (
    pathFetch = (jsVar.empty),
    fetchMethod = (true),
    slf_Once = (true),
) {
    if (slf_Once) {
        (jsCs).log((`Fetcher:`), (fetchMethod));
    }
    //
    let slF_Result = (await fetch(pathFetch))
        ;
    //
    if (!(slF_Result.ok)) {
        (jsCs).log(slF_Result);
        (iGit).gitWarn_RateLimit(slF_Result);
        //
        return [];
    }
    //
    switch (fetchMethod) {
        case (true):  /* Local */
            slF_Result = (await ((Promise).all((Array).from({
                length: auto_IntParser(await ((slF_Result)
                .text())), }, (async (_, i) => (await (fetch(
                `${dirSafe.getimages}/${i + 1}.json`))).json())
            ))));
            //
            break;
        case (false):  /* Github */
            slF_Result = (await ((slF_Result).json()));
            //
            break;
        default:
            slF_Result = [];
            //
            break;
    }
    //
    if (slf_Once) {
        (jsCs).log(slF_Result);
    }
    //
    return (slF_Result);
}
//
    /** [Async] Scanning Images-Path Prefix
     * @param {string} setPaths
     * @param {Boolean} scanMethod
     * @param {Boolean} sps_Once
     * @returns {Promise<any>}
     */
export async function srcPrefix_Scanner (
    setPaths = (jsVar.empty),
    scanMethod = (true),
    sps_Once = (true),
) {
    if (sps_Once) {
        (jsCs).log((`Scanner:`), (scanMethod));
    }
    //
    let spS_Items = [],
        spS_Result = (setPaths)
        ;
        //
    //
    switch (scanMethod) {
        case (true):  /* Local */
            spS_Result = (await (srcLink_Fetcher(setPaths, true, true)));
            spS_Items = ((spS_Result).map((arr) => ((arr).map((v) =>
                (`/${v}`)))));
            //
            break;
        case (false):  /* Github */
            spS_Result = (await (srcLink_Fetcher(setPaths, false, true)));
            spS_Result = ((spS_Result).filter((item) => (
                (item.path) !== (jsVar.linkBack))));
            //
            (spS_Items).push(...((spS_Result).map((item) => ({
                type: (item.type), path: (`/${item.path}`), }))));
            for (const item of (spS_Result)) {
                    if ((item.type) !== (`dir`)) continue;
                    //
                (spS_Items).push(...(await (srcPrefix_Scanner(((iGit)
                    .ghApi_getLink(item.path)), (false), (false)))));
            }
            //
            break;
        default:
            spS_Items = [];
            //
            break;
    }
    //
    if (sps_Once) { 
        (jsCs).log(spS_Items);
    }
    //
    return (spS_Items);
}
    /** [Async] For All-Images Processor Methods
     * @param {string} collectSets
     * @param {Boolean} procMethod
     * @param {Boolean} aip_Once
     * @returns {Promise<any>}
     */
export async function alImages_Processor (
    collectSets = (jsVar.empty),
    procMethod = (true),
    aip_Once = (true),    
) {
    if (aip_Once) {
        (jsCs).log((`Processor:`), (procMethod));
    }
    //
    const isGitLink = ((iGit.htWeb
        .lcl).endsWith(`github.io`)),
        proGetImgs = (new Set())
        ;
    let addImage = ((img) => ((proGetImgs).add(img))),
        aiP_Result = (collectSets)
        ;
    //
    switch ((procMethod) || (!(isGitLink))) {
        case (true):  /* Local */
            aiP_Result = (await (srcPrefix_Scanner(collectSets, true, true)));
            //
            for (const [ i, group, ] of aiP_Result.entries()) {
                (proGetImgs).clear();
                (group).forEach((href) => (((format_exts)
                    .some((ext) => ((href).toLowerCase()
                    .endsWith(ext)))) && (addImage(href))
                ));
                //
                aiP_Result[i] = [ ...(proGetImgs) ];
            }
            //
            break;
        case (false):  /* Github */
            aiP_Result = await srcPrefix_Scanner(collectSets, false, true);
            //
            for (const item of aiP_Result) {
                if (((item.type) === (`file`)) && ((format_exts).some(
                (ext) => ((jsTx).lower(item.path).endsWith(ext))))) {
                    addImage(item.path); }
            }
            //
            aiP_Result = [ ...(proGetImgs), ];
            //
            break;
        default:
            aiP_Result = [];
            //
            break;
    }
    //
    if (aip_Once) {
        (jsCs).log(aiP_Result);
    }
    //
    return (aiP_Result);
}
//
    /** [Async] Gathering that all Images
     * @param {string} pickCollects
     * @param {Boolean} gatherMethod
     * @param {Boolean} aia_Once
     * @returns {Promise<any>}
     */
export async function alImages_Ascertains (
    pickCollects = (jsVar.empty),
    gatherMethod = (true),
    aia_Once = (true),
) {
    if (aia_Once) {
        (jsCs).log((`Gathering:`), (gatherMethod));
    }
    //
    let aiA_Result = (pickCollects)
        ;
    //
    switch (gatherMethod) {
        case (true):  /* Local */
            aiA_Result = (await alImages_Processor(pickCollects, true, true)).flat();
            //
            break;
        case (false):  /* Github */
            await ((iGit).git_Config());
            //
            aiA_Result = (await (alImages_Processor(pickCollects, false, true)));
            //
            break;
        default:
            aiA_Result = [];
            //
            break;
    }
    //
    if (aia_Once) {
        (jsCs).log(aiA_Result);
    }
    //
    return (aiA_Result);
}
//
/**/


/* Uji Coba */
//console.count(`alImages_Ascertains`);
//
/**/


/* END */
/**/
