#!/usr/bin/env js
/* web/js/images/img-compile.js */

/* Imports */
import { jsVar, inGit,
    jsTx, jsCs, jsDoc, jsHt,
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
    /** Componentor for Images Viewing - Content Comping
     * @param {string} conComp
     * @returns {ViewImagesComp}
     */
function comp_ViewImages (
    conComp
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
    (vImg).text.textContent = (conComp);
    //
    return (vImg);
}
//
/**/


/* Formalize - Building */
const getAll_Images = (await (
    (imgPro).gather_AlImages()));
//
    /** Componentor for Images Viewing - Log Consoles
     * @returns {void}
     */
function comp_LoggerImages () {
        /* First - View Linkings */
    (jsCs).log((jsTx).arr2Str([
        (`Now in Linking:`),
        (`\n- `), (iGit.htWeb.dom),
        (`\n- `), (iGit.htWeb.lnk),
        (`\n> `), ((inGit.data.repo) ||
            (inGit.link.gh.path.repo)),
    ], (jsVar.empty)));
        /* Middle-12 - Warn */
    if (!(getAll_Images.length)) {
        (jsCs).warn(
            `⚠️ There's no Images in here`);
        return;
    }
        /* Second - Success as Table */
    (jsCs).grBgn((jsTx).arr2Str([
        (`Check Images`), ((iGit.is_Local)
            ? (`Local`) : (`Github API`))
    ], (` - `)));
        (jsCs).log((jsTx).arr2Str([
            (`Get from`), (`:\n`), ((iGit)
                .ghApi_getLink(`img`)),
        ], (jsVar.empty)));
        (jsCs).table((getAll_Images).map((item) => ({
            name: ((item.name) ?? ((item)
                .split(jsVar.slash).at(-1))),
            path: ((item.path) ?? ((item).slice(1))),
            src: ((item.src) ?? ((iGit).ghApi_getLink(item))),
        })));
    (jsCs).grEnd();
}
    /** [Async] In-Building Images Componentor
     * @returns {Promise<ViewImagesComp>}
     */
async function buildStruct_Images () {
    let vAteiler = ((imgStrg).img_CompId(`vimg_Content`));
    let vBox = comp_ViewImages(
        `Images Ateilers has been here`);
    //
    switch (true) {
        case ((!(vAteiler))
        || (!(vBox.atlr))):
            return (vBox);
        case ((getAll_Images.length) < (1)):
            //(jsCs).warn(`⚠️ Tidak ada gambar ditemukan!`);
            //
            (vAteiler).classList.remove(...imgStrg
                .vImgAtlr_Rm_Cls);
            (vAteiler).classList.add(...imgStrg
                .vImgAtlr_Add_Cls);
            //
            return (vBox);
    }
    (vBox).atlr.innerHTML = (jsVar.empty);
    (getAll_Images).forEach((item) => {
        let imgComp = ((jsDoc).createElm(`img`));
        //
        (imgComp).src = ((item.path) ?? (item));
            /* (item.path) | (item.src) */
        (imgComp).draggable = (false);
        (imgComp).className = ((jsHt)
            .classer(imgStrg.vImger_Cls));
        (imgComp).onclick = () => { (location)
            .href = (imgComp.src); };
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
    comp_LoggerImages();
    //
    /*
        Body */
    await (buildStruct_Images());
    //
}
//
/**/


/* Uji Coba */
//Later...
//
/**/


/* END */
/**/
