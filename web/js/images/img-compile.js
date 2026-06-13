#!/usr/bin/env js
/* web/js/images/img-compile.js */

/* Imports */
import * as bsc from "../basis.js";
import * as drpg from "../set-paging.js";
//
import * as pro from "./img-process.js";
//
/**/


/* Vars */
const ht_Lnk = (pro.htWeb.lnk);
const ht_Dom = (pro.htWeb.dom);
const ht_Lcl = (pro.htWeb.lcl);
//
const allImgs = (await (pro.all_Images()));
const is_Lcl = (pro.is_Local);
const g_AL = (await (pro.ghApi_getLink(`img`)));
//
const gRepo = (bsc.gLink.gh.path.repo);
//
/**/


/* Funcs - Customs */
//?
//
/**/


/* Struct - Comping */

//
function view_Images (content) {
    /* Varings */
    const vImg = {
        base: (bsc).jsDoc.getId(`view-images`),
        atlr: (bsc).jsDoc.getId(`vimg-content`),
        text: (bsc).jsDoc.createElm(`p`),
    };
    //
    /* Classings */
    const vImg_Classes = {
        box_fill: [ `vimg-fill`, `mx-auto`,
            `place-items-center`, `grid`,
            //
            `px-2`,`py-4`, `gap-2`, `grid-cols-2`,
            `md:px-4`, `md:gap-4`,
            `sm:grid-cols-3`, `lg:grid-cols-5`, ],
        def_text: [ `font-semibold`,
            `text-3xl`, `text-white`,
            `py-8`, ],
    };
    (vImg.atlr).classList.add(
        ...vImg_Classes.box_fill );
    (vImg.text).className = ((bsc).jsHt.classer([
        ...vImg_Classes.def_text, ]));
    //
    /* Gabung */
    (vImg).base.appendChild(vImg.atlr);
    (vImg).atlr.appendChild(vImg.text);
    (vImg).text.innerHTML = content;
    //
    return (vImg);
}
//
/**/


/* Construct */
function first_Annouce () {
    const fA_EntList = (`\n- `);
    const fA_EntCode = (`\n> `);
    const fix_EmpRepo = ((bsc.gitD.repo) || (gRepo));
    //
    (bsc).jsCs.log((bsc).jsTx.arr2Str([(`Now in Linking:`),
        (fA_EntList), (ht_Dom), (fA_EntList), (ht_Lnk),
        (fA_EntCode), (fix_EmpRepo), ],
        (bsc.jsV.empty)));
}
//
function check_Imgs () {
    if (!(allImgs.length)) {
        return ((bsc).jsCs.Warn
        (`⚠️ There's no Images in here`)); }
    //
    (bsc).jsCs.grBgn((bsc).jsTx.arr2Str([(`Check Images`),
        ((is_Lcl) ? (`Local`) : (`Github API`))
    ], (` - `)));
    (bsc).jsCs.log((`Get from`) + (`:\n`) + (g_AL));
    (bsc).jsCs.table((allImgs).map((item) => ({
        name: ((item.name) ?? ((item).split(bsc.
                jsV.slash).at(-1))),
        path: ((item.path) ?? ((item).slice(1))),
        src: ((item.src) ?? (pro.ghApi_getLink(item))),
    })));
    (bsc).jsCs.grEnd();
}
//
async function struct_Imgs () {
    const imgs = (allImgs);
    const phV_Box = (`Images Ateilers has been here`);
    const vBox = view_Images(phV_Box);
    //
    //console.log(imgs);
    //
    const vAteiler = ((bsc).jsDoc.getId(`vimg-content`));
    const is_ImgsEmpty = ((imgs.length) < (1));
    if (is_ImgsEmpty) {
        //(bsc).jsCs.warn(`⚠️ Tidak ada gambar ditemukan!`);
        //
        (vAteiler).classList.remove(`grid`,
            //`justify-start`,
            `grid-col-2`,
            `sm:grid-cols-3`, `lg:grid-cols-5`);
        (vAteiler).classList.add(`flex`,
            `justify-center`, `items-center`);
        return (vBox); }
    (vBox).atlr.innerHTML = (bsc.jsV.empty);
    (imgs).forEach((item) => {
        const img = ((bsc).jsDoc.createElm("img"));
        const linkImg = (item.path);
            /* (item.path) | (item.src) */
        //
        const img_Class = ((bsc).jsHt.classer([
            `cursor-pointer`,
            `transition-all`, `ease-in-out`,
            `rounded-xl`,
            //
            `w-[200px]`,
            `duration-200`,
            //
            `hover:scale-95`,
            `active:scale-105`, ]));
        (img).src = ((linkImg) ?? (item));
        (img).draggable = (false);
        (img).className = (img_Class);
        //
        (img).onclick = () => {
            (location).href = (img.src);
        };
        //
        (vBox).atlr.appendChild(img);
    });
    return (vBox);
}
//
/**/


/* Final */
export function test () {
    /*
        Test */ //*
    //?
    // */
    //
}
export async function struct () {
    /*
        Head */
    (drpg).draw_Title(`Images Ateilers`);
    (drpg).reBrand_UserGit(bsc.gitD.name);
    //
    /*
        Logs */
    first_Annouce();
    check_Imgs();
    //
    /*
        Body */
    await struct_Imgs();
    //
}
//
/**/


/* Uji Coba */
//?
//
/**/


/* END */
/**/
