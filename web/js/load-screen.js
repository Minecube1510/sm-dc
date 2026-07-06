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


/* Loading Init */
const ls_CompId = ((jsDoc)
    .getId(`loading-screen`)),
    transing = (750);
//
if (ls_CompId) {
    (ls_CompId).classList.add(
        `transition-opacity`, `duration-500`,
        `ease-out`, `opacity-100`);
}
//
/**/


/* Struct - Loading */
    /** Showing Loading-Screen
     * @returns {HTMLElement|null}
     */
function show_Waiting () {
    if (!(ls_CompId)) return (null);
    //
    (ls_CompId).textContent = (``);
    (ls_CompId).className = ((jsHt).classer([
        `fixed`, `inset-0`, `z-[9999]`, `flex`,
        `flex-col`, `items-center`, `justify-center`,
        `bg-neutral-950`, `text-white`,
        `transition-all`, `duration-${transing}`,
        `ease-out`, `opacity-100`, `scale-100`,
    ]));
    //
    const spinElm = ((jsDoc).createElm(`div`)),
        textElm = ((jsDoc).createElm(`p`));
    //
    (spinElm).className = ((jsHt).classer([
        `rounded-full`, `animate-spin`,
        `w-16`, `h-16`, `mb-4`,
        `border-4`, `border-neutral-700`,
        `border-t-white`,
    ]));
    (textElm).className = ((jsHt).classer([
        `text-xl`, `font-semibold`,
        `transition-opacity`, `duration-${transing}`,
        `ease-out`, `opacity-100`,
    ]));
    (textElm).textContent = (`Loading the Page...`);
    //
    (ls_CompId).appendChild(spinElm);
    (ls_CompId).appendChild(textElm);
    //
    return (ls_CompId);
}
    /** Hiding Loading-Screen
     * @returns {void}
     */
function hide_Waiting () {
    if (!(ls_CompId)) return;
    //
    (ls_CompId).classList.remove(
        `opacity-100`, `scale-100`);
    (ls_CompId).classList.add(`pointer-events-none`,
        `opacity-0`, `scale-105`);
    //
    const textElm = ((ls_CompId).querySelector(`p`));
    if (textElm) {
        (textElm).classList
            .remove(`opacity-100`);
        (textElm).classList
            .add(`opacity-0`);
    }
    //
    setTimeout(() => {
        (ls_CompId).remove();
    }, (transing));
    //
}
//
/**/


/* Final */
    /** Finalize Loading-Screen
     * @returns {void}
     */
function final_LoadScreen () {
    let ls_Wait = (show_Waiting());
    //
    requestAnimationFrame(() => {
        if (!(ls_Wait)) return;
        (ls_Wait).classList.remove(`opacity-0`, `pointer-events-none`);
        (ls_Wait).classList.add(`opacity-100`, `scale-100`);
        let textElm = ((ls_Wait).querySelector(`p`));
        if (textElm) {
            (textElm).classList.remove(`opacity-0`);
            (textElm).classList.add(`opacity-100`);
        }
    });
}
//
    /** [Async] Activating Loading Screen-Workflows
     * @returns {void}
     */
async function on_LoadScreen () {
    final_LoadScreen();
    //
    await new Promise((r) => {
        setTimeout((r), (1250));
    });
    //
    hide_Waiting();
}
//
await on_LoadScreen();
//
/**/


/* END */
/**/
