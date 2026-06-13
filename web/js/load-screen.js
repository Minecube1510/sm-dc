#!/usr/bin/env js
/* web/js/images/load-screen.js */

/* Imports */
//?
//
import * as bsc from "./basis.js";
//
/**/


/* Vars */
//?
//
/**/


/* Funcs - Customs */
//?
//
/**/


/* Struct - Loading */
const img_LoadScreen_Id = (`loading-screen`);
//
function show_Waiting () {
    let inLoading = ((bsc).jsDoc.getId(img_LoadScreen_Id));
        if (!(inLoading)) { return null; }
    //
    const inLoad_Spin = ((bsc).jsDoc.createElm(`div`));
    const inLoad_Wrap = ((bsc).jsDoc.createElm(`div`));
    const inLoad_Text = ((bsc).jsDoc.createElm(`p`));
    //
    inLoading.id = img_LoadScreen_Id;
    (inLoad_Text).textContent = (`Loading Images...`);
    //
    (inLoad_Wrap).className = ((bsc).jsHt.classer([
        `flex`,`flex-col`, `items-center`,
        //
        `text-center`, `gap-4`, ]));
    (inLoad_Spin).className = ((bsc).jsHt.classer([
        `rounded-full`, `animate-spin`,
        `w-16`, `h-16`,
        //
        `border-4`, `border-neutral-700`,
        `border-t-white`, ]));
    (inLoad_Text).className = ((bsc).jsHt.classer([
        `text-xl`, `text-white`,
        `font-semibold`, ]));
    /* Construct */
    (inLoad_Wrap).appendChild(inLoad_Spin);
    (inLoad_Wrap).appendChild(inLoad_Text);
    (inLoading).appendChild(inLoad_Wrap);
    //
    return (inLoading);
}
function hide_Loading () {
    const loading = ((bsc).jsDoc.getId(img_LoadScreen_Id));
        if (!(loading)) { return; }
    (loading).classList.remove(
        `opacity-100`, `scale-100`);
    (loading).classList.add(`opacity-0`,
        `scale-105`, `pointer-events-none`);
    //
    setTimeout(() => { (loading)
        .remove(); }, (500));
}
//
const comp_SLoading = show_Waiting();
/**/


/* Final */
function loaded_LoadScreen () {
    (bsc).jsDoc.appEnd_Ch(comp_SLoading);
    requestAnimationFrame(() => {
        (comp_SLoading).classList.remove((`opacity-0`),
            (`pointer-events-none`));
        (comp_SLoading).classList.add(`opacity-100`);
    });
    //
}
//
loaded_LoadScreen();
hide_Loading();
/**/


/* END */
/**/
