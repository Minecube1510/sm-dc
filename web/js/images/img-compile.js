#!/usr/bin/env js
/* web/js/images/img-compile.js */

/* Imports */
import { jsVar, inGit, dirSafe,
    jsTx, jsCs, jsDoc, jsHt,
    //
    } from "../basis.js";
    //
import * as imgStrg from './img-storage.js';
    //
import * as iGit from '../init-github.js';
//
import { setPage_Comping
} from "../set-paging.js";
//
import * as imgPro from './img-process.js';
//
/**/


/* Formalize - Componentor */
const gitConfig = (iGit.gh_Config),
    //
    isDeployed = (!(iGit.isLocal));
let imgConfig = {
    Lcl: {
        source: ((jsTx).arr2Str([(iGit.htWeb.dom),
            ...((isDeployed) ? [iGit.data.repo]
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
    const vImg = {
        base: ((imgStrg).img_CompId(`vimg_Base`)),
        atlr: ((imgStrg).img_CompId(`vimg_Content`)),
        text: ((jsDoc).createElm(`p`)),
    };
    switch (true) {
        case (!(vImg.base)): return (vImg);
        case (!(vImg.atlr)): return (vImg);
    }
        /* Classings */
    (vImg).atlr.classList.add(...imgStrg.vImg_Atlr_Cls);
    (vImg.text).className = ((jsHt)
        .classer(imgStrg.vImg_PhTxt_Cls));
        /* Gabung */
    (vImg).atlr.appendChild(vImg.text);
    (vImg).text.textContent = (phAteiler);
    //
    return (vImg);
}
//
/**/


/* Formalize - Building */
let reSource_Images = (async (mode) => {
    const { source, method } = (imgConfig[mode]);
    return (await ((imgPro)
        .alImages_Ascertains(source, method)));
});
reSource_Images = (await (
    reSource_Images(`Lcl`)));
//
    /** Images-Report of Console-Log
     * @returns {void}
     */
function loggeReport_ViewImg (
    //
) {
        /* First - View Linkings */
    (jsCs).log((jsTx).arr2Str([
        (`Now in Linking:`),
        (`\n[-] `), (iGit.htWeb.dom),
        (`\n[=] `), (iGit.htWeb.lnk),
        (`\n[>] `), ((inGit.data.repo) ||
            (inGit.link.gh.path.repo)),
        (`\n[$] `), (iGit.htWeb.path),
    ], (jsVar.empty)));
        /* Middle-12 - Warn */
    if (!(reSource_Images.length)) {
        (jsCs).warn(`⚠️ There's no Images in here`);
        //
        return;
    }
        /* Second - Success as Table */
    (jsCs).grBgn((jsTx).arr2Str([
        (`Check Images`), ((iGit.isLocal)
            ? (`Local`) : (`Github API`))
    ], (` - `)));
        (jsCs).log((jsTx).arr2Str([
            (`Get from`), (`:\n`), ((iGit)
                .ghApi_getLink(`img`)),
        ], (jsVar.empty)));
        (jsCs).table((reSource_Images).map((item) => ({
                /* Img-Name */
            Image_Name: ((item).split(jsVar.slash)
                .at(-1)),
            //
                /* Img-Relative-Path */
            Relative_Path: ((item).slice(1)),
                /* Img-Raw-Github-Path */
            Gitraw_Path: ((iGit).ghRaw_inLink((item)
                .slice(1))),
            //
                /* API-Src */
            API_Src: ((iGit).ghApi_getLink(item)),
                /* Link-Src */
            Link_Src: (jsTx.arr2Str([ (iGit.htWeb
                .dom), (item),], (jsVar.empty))),
        })));
    (jsCs).grEnd();
}
//
    /** [Async] Auto-Building Images Ateiler
     * @returns {Promise<ViewImagesComp>}
     */
async function autoBuild_Ateiler (
    //
) {
    let vAteiler = ((imgStrg).img_CompId(`vimg_Content`)),
        vBox = buildComp_ViewImg(`Images Ateilers has been here`);
    //
    switch (true) {
        case ((!(vAteiler)) || (!(vBox.atlr))):
            //
            return (vBox);
        case ((reSource_Images.length) < (1)):
            (jsCs).warn(`⚠️ Tidak ada gambar ditemukan!`);
            //
            (vAteiler).classList.remove(...imgStrg
                .vImgAtlr_Rm_Cls);
            (vAteiler).classList.add(...imgStrg
                .vImgAtlr_Add_Cls);
            //
            return (vBox);
    }
    (vBox).atlr.innerHTML = (jsVar.empty);
    (reSource_Images).forEach((item) => {
        let imgComp = ((jsDoc).createElm(`img`));
        //
        (imgComp).src = ((iGit.isLocal) ? (item)
            : (`/${inGit.data.repo}/${(item)
                .slice(1)}`));
            //
        (imgComp).draggable = (false);
        (imgComp).className = ((jsHt)
            .classer(imgStrg.vImger_Cls));
        (imgComp).onclick = (() => { (location)
            .href = (imgComp.src); });
        (vBox).atlr.appendChild(imgComp);
    });
    return (vBox);
}
//
/**/


/* Final */
    /** Presenting as "Test" | Images Ateiler
     * @returns {void}
     */
export function test () {
    /*
        Test */
    //*
    // Testing for waiting...
    // */
    (jsCs).warn(`Images in Under Development...`);
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
/*
(jsCs).log(iGit.htWeb.lcl);
//
(jsCs).log((`(iGit.isLocal) :`), (iGit.isLocal));
(jsCs).log((`(!(iGit.isLocal)) :`), (!(iGit.isLocal)));
//
(jsCs).log(await (reSource_Images));
// */
//
jsCs.log(imgConfig.Lcl.source);
/**/


/* END */
/**/
