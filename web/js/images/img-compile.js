#!/usr/bin/env js
/* web/js/images/img-compile.js */

/* Imports */
import * as imgStrg from './img-storage.js';
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
    isDeployed = (!(iGit.isLocal)),
        //
    isGithub = (iGit.isGitLink);
    ;
let imgConfig = {
    Lcl: {
        source: ((jsTx).arr2Str([
            (iGit.htWeb.dom),
            ...((isDeployed) ? ((isGithub) ??
                [sysGit.data.repo]) : []),
            (dirSafe.countimgs),
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
function enhance_ViewImg () {
    const imageBox = ((imgStrg).img_CompId(`atlrC_ImageCon`));
    //
    if (!(imageBox)) return;
    //
    (imageBox).classList.add(...(imgStrg.atlr_ImageCon_Cls));
    (imageBox).querySelectorAll(`img`).forEach((image) => {
        (image).classList.add(...(imgStrg.atlr_ElImg_Cls));
    });
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
    //`Images Ateilers`
    //
    /*
        Logs */
    loggeReport_ViewImg();
    //
    /*
        Body */
    enhance_ViewImg();
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
