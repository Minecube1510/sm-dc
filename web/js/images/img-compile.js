#!/usr/bin/env js
/* web/js/images/img-compile.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    dirSafe, sysGit,
    } from "../basis.js";
    //
import * as iGit from '../init-github.js';
//
import { ldm_Color, ldm_Data, ldm_Event,
    //
    setPage_Comping,
    //
    } from "../set-paging.js";
    /*|
  //
|*/
import * as imgStrg from './img-storage.js';
/*|
|*/
import * as imgPro from './img-process.js';
//
/**/


/* Establize - Component */
/** Ateiler Images-Displayer Componentor Config
 * @typedef {Object} ViewImagesComp
 * @property {HTMLElement|null} mbox
 * @property {HTMLElement|null} imgs
 * @property {HTMLParagraphElement} text
 */
//
const gitConfig = (iGit.gh_Config),
    //
    isDeployed = (!(iGit.isLocal));
let imgConfig = {
    Lcl: {
        source: ((jsTx).arr2Str([
            (iGit.htWeb.dom),
            ...((isDeployed) ? [sysGit.data.repo]
            : []), (dirSafe.countimgs),
        ], (jsVar.slash))),
        method: (true),
    },
    Git: {
        source: ((iGit).ghApi_getLink(`img`)),
        method: (false),
}, };
//
    /** View-Images - Component Building
     * @param {string} phAteiler
     * @returns {ViewImagesComp}
     */
function buildComp_ViewImg (
    phAteiler,
) {
        /* Varings */
    const
        imgAteiler = {
        //
    mbox: ((imgStrg).img_CompId(`atlrC_MainBox`)),
    imgs: ((imgStrg).img_CompId(`atlrC_ImageCon`)),
    text: ((jsMod).setElm(((jsDoc).creatElm(`p`)), {
    //
className: ((jsHt).classer(imgStrg.atlr_PhTxt_Cls)),
textContent: (phAteiler),
    //
    }))}
        ;
    //
    if ((!(imgAteiler.mbox)) || (!(imgAteiler
        .imgs))) return (imgAteiler);
    //
    [[
        (imgAteiler.text), [`col-span-full`]
    ], [
        (imgAteiler.imgs), (imgStrg.atlr_ImageCon_Cls),
    //
    ]].forEach(([ elm, cls, ]) => (
        (elm).classList.add(...cls)));
    //
    (imgAteiler.imgs).append(imgAteiler.text);
    //
    return (imgAteiler);
}
//
/**/


/* Establize - Rendering */
let reSource_Images = (async (mode) => {
    let { source, method } = (imgConfig[mode]);
    //
    return (await ((imgPro)
        .alImages_Ascertains(source, method)));
});
reSource_Images = (await (
    reSource_Images(`Lcl`)));
//
    /** Images-Report of Console-Log
     * @returns {void}
     */
function loggeReport_ViewImg () {
        /*| First - View Linkings
    |*/
    (jsCs).grBgn(`Check Linking - Webpage`);
        (jsCs).log((jsTx).arr2Str([
            (`Now in Linking:`),
            (`\n[-] `), (iGit.htWeb.dom),
            (`\n[=] `), (iGit.htWeb.lnk),
            (`\n[>] `), ((sysGit.data.repo) ||
                (sysGit.link.gh.path.repo)),
            (`\n[$] `), (iGit.htWeb.path),
        ], (jsVar.empty)));
            /* Middle-12 - Warn */
        if (!(reSource_Images.length)) {
            (jsCs).warn(
                `⚠️ There's no Images in here`);
            //
            return;
        }
    (jsCs).grEnd();
    //-|-//
        /*| Second - Success as Table
    |*/
    (jsCs).grBgn((jsTx).arr2Str([
        (`Check Images`), ((iGit.isLocal)
            ? (`Local`) : (`Github API`))
    ], (` - `)));
        (jsCs).log((jsTx).arr2Str([
            (`Get from`), (`:\n`), ((iGit)
                .ghApi_getLink(`img`)),
        ], (jsVar.empty)));
        (jsCs).table((reSource_Images).map((item) => {
            const pather = ((item).slice(1));
            //
            return {
                    /* Img-Name */
                Image_Name: ((item).split(jsVar.slash)
                    .at(-1)),
                //
                    /* Img-Relative-Path */
                Relative_Path: (pather),
                    /* Img-Raw-Github-Path */
                Gitraw_Path: ((iGit)
                    .ghRaw_inLink(pather)),
                //
                    /* API-Src */
                API_Src: ((iGit).ghApi_getLink(item)),
                    /* Link-Src */
                Link_Src: (jsTx.arr2Str([ (iGit.htWeb
                    .dom), (item),], (jsVar.empty))),
            }
        }));
    (jsCs).grEnd();
}
//
    /** [Async] Auto-Building Images Ateiler
     * @returns {Promise<ViewImagesComp>}
     */
async function autoBuild_Ateiler () {
    const atlrCom = ((imgStrg)
        .img_CompId(`atlrC_ImageCon`)),
        //
        atlrBox = buildComp_ViewImg(
            `Images Ateilers has been here`);
    //
    switch (true) {
        case ((!(atlrCom)) || (!(atlrBox.imgs))):
            return (atlrBox);
        case (!(reSource_Images.length)):
            (jsCs).warn(`⚠️ Tidak ada gambar ditemukan!`);
            //
            return (atlrBox);
    }
    //
    (atlrBox.imgs).replaceChildren();
    (reSource_Images).forEach((item) => {
        let src = ((iGit.isLocal) ? (item) : (`/${
            sysGit.data.repo}/${item.slice(1)}`));
        //
        const imgComp = ((jsMod).setElm(((jsDoc)
            .creatElm(`img`)), { src,
                draggable: (false),
                className: ((jsHt).classer(
                    imgStrg.atlr_ElImg_Cls)),
                onclick: (() => {
                    (location).href = (src);
            })},
        ));
        //
        (atlrBox.imgs).append(imgComp);
    });
    //
    return (atlrBox);
}
//
/**/


/* Finalize - DOM */
    /** Presenting as "Test" | Images Ateiler
     * @returns {void}
     */
export function test () {
    /*
        Test */
    //*
    // Testing for waiting...
    // */
    //(jsCs).warn(`Under Development...`);
    //
}
    /** [Async] Presenting as "Struct" | | Images Ateiler
     * @returns {Promise<void>}
     */
export async function struct () {
    /*
        Head */
    setPage_Comping(
        `Images Ateilers`);
    //
    /*
        Logs */
    loggeReport_ViewImg();
    //
    /*
        Body */
    await (autoBuild_Ateiler());
    //
}
//
/**/


/* Uji Coba */
//Testing...
//
/**/


/* END */
/**/
