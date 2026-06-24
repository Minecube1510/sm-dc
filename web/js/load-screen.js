#!/usr/bin/env js
/* web/js/images/load-screen.js */

/* Imports */
//Importing...
//
import {
    jsTx, jsCs, jsDoc, jsHt,
    } from "./basis.js";
//
/**/


/* Initialize */
const ls_CompId = ((jsDoc).getId(`loading-screen`));
//
/**/


/* Struct - Loading */
    /** Showing Loading-Screen
     * @returns {HTMLElement|null}
     */
function show_Waiting () {
        if (!(ls_CompId)) return (null);
    const inLoad = (() => {
        let mkElm = ((jsDoc).createElm);
        return {
            wrap: mkElm(`div`),
            spin: mkElm(`div`),
            text: mkElm(`p`),
        };
    })();
    //
    /* Instruct */
    (inLoad).text.textContent = (
        `Loading Images...`);
    //
    (inLoad).wrap.className = ((jsHt).classer([
        `flex`,`flex-col`, `items-center`,
        //
        `text-center`, `gap-4`, ]));
    (inLoad).spin.className = ((jsHt).classer([
        `rounded-full`, `animate-spin`,
        `w-16`, `h-16`,
        //
        `border-4`, `border-neutral-700`,
        `border-t-white`, ]));
    (inLoad).text.className = ((jsHt).classer([
        `text-xl`, `text-white`,
        `font-semibold`, ]));
    //
    /* Structing Waiting-Load */
    (inLoad).wrap.appendChild(inLoad.spin);
    (inLoad).wrap.appendChild(inLoad.text);
    (ls_CompId).appendChild(inLoad.wrap);
    //
    return (ls_CompId);
}
    /** Hiding Loading-Screen
     * @returns {void}
     */
function hide_Waiting () {
        if (!(ls_CompId)) return;
    (ls_CompId).classList.remove(
        `opacity-100`, `scale-100`);
    (ls_CompId).classList.add(`opacity-0`,
        `scale-105`, `pointer-events-none`);
    //
    setTimeout(() => {
        (ls_CompId).remove();
    }, (500));
}
/**/


/* Final */
    /** Finalize Loading-Screen
     * @returns {void}
     */
function final_LoadScreen () {
    let ls_Wait = show_Waiting();
    //
    (jsDoc).appEnd_Ch(ls_Wait);
    //
    requestAnimationFrame(() => {
        (ls_Wait).classList.remove(`opacity-0`,
            `pointer-events-none`);
        (ls_Wait).classList.add(`opacity-100`);
    });
}
//
    /** Activating Loading Screen-Workflows
     * @returns {void}
     */
function on_LoadScreen () {
    final_LoadScreen();
    hide_Waiting();
}
//
on_LoadScreen();
/**/


/* END */
/**/
