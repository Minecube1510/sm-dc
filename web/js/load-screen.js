#!/usr/bin/env js
/* web/js/load-screen.js */

/* Imports */
//Importing...
//
import { jsVar, jsMod,
    jsTx, jsDoc, jsHt,
    } from "./basis.js";
//
/**/


/* Loading Init */
const coLoadScreen = ((jsDoc)
    .getId(`loading-screen`)),
    //
    transing = (750)
    ;
//
if (coLoadScreen) {
    (coLoadScreen).classList.add(
        `ease-out`, `transition-opacity`,
        `duration-500`, `opacity-100`,
    );
}
//
/**/


/* Struct - Loading */
    /** Showing Loading-Screen
     * @returns {HTMLElement|null}
     */
function show_Waiting () {
        if (!(coLoadScreen)) return (null);
        //
    let loadScreenCls = [
        `fixed`, `inset-0`, `z-[9999]`,
        `flex`, `flex-col`,
        `items-center`, `justify-center`,
        `bg-neutral-950`, `text-white`,
        `transition-all`, `duration-${transing}`,
        `ease-out`, `opacity-100`, `scale-100`,
    ];
    //
    (jsMod).setElm((coLoadScreen), {
        className: ((jsHt).classer(loadScreenCls)),
        textContent: ((jsTx).trm(jsVar.empty)),
    });
    //
    const spinElm = ((jsMod).setElm(
        ((jsDoc).createElm(`div`)), {
        //
className: ((jsHt).classer([
    `rounded-full`, `animate-spin`,
    `w-16`, `h-16`, `mb-4`,
    `border-4`, `border-neutral-700`,
    `border-t-white`,
])),
    })),
        //
    textElm = ((jsMod).setElm(
        ((jsDoc).createElm(`p`)), {
            //
className: ((jsHt).classer([
    `text-xl`, `font-semibold`,
    `transition-opacity`,
    `duration-${transing}`,
    `ease-out`, `opacity-100`,
    `animate-pulse`,
])),
textContent: (`Loading the Page...`),
        //
    }))
        ;
    (coLoadScreen).append(spinElm, textElm);
    //
    return (coLoadScreen);
}
    /** Hiding Loading-Screen
     * @returns {void}
     */
function hide_Waiting () {
        if (!(coLoadScreen)) return;
    //
    [
        [ `opacity-100`, `opacity-0`, ],
        [ `scale-100`, `scale-105`, ],
//
[ `pointer-events-auto`, `pointer-events-none`, ],
//
    ].forEach(([from, to]) => { (coLoadScreen)
        .classList.replace(from, to); });
    //
    const textElm = ((coLoadScreen)
        .querySelector(`p`));
    //
    if (textElm) { (textElm).classList.replace(
        `opacity-100`, `opacity-0`); }
    //
    setTimeout(() => { (coLoadScreen)
        .remove(); }, (transing));
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
        let textElm = ((ls_Wait).querySelector(`p`));
        //
        (ls_Wait).classList.replace(`opacity-0`, `opacity-100`);
        (ls_Wait).classList.replace(`scale-95`, `scale-100`);
        (ls_Wait).classList.remove(`pointer-events-none`);
        //
        if (textElm) { (textElm).classList
            .replace(`opacity-0`, `opacity-100`);
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
