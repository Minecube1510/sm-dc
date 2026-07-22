#!/usr/bin/env js
/* web/js/load-screen.js */

/* Imports */
//Importing...
//
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    } from "./basis.js";
import {
    wDisplay_Settler,
} from "./set-paging.js";
//
import * as tw from './tw-css-cls.js';
//
/**/


/* Loading Screen - Storage */
export const
comp_LoadScreen = ((jsDoc)
.getId(`loading-screen`))
;
/*|
|*/
const
/*|*/
transing = (750),
N4 = (4),
/*|
|*/
opacity0 = ((tw).tcRegulate((tw
    .effects.opacity), (0))),
opacity100 = ((tw).tcRegulate((tw
    .effects.opacity), (100))),
//
easeOut = ((tw).tcRegulate((tw
    .transition.ease), (`out`))),
    //
transite_Opacity = ((tw).tcRegulate((tw
    .transition.transition), (`opacity`))),
    //
durate_TimeTran = ((tw).tcRegulate((tw
    .transition.duration), (transing))),
durate_MultiGen = ((tw).tcRegulate((tw
    .transition.duration), (500))),
//
scale95 = ((tw).tcRegulate((tw
    .transform.scale), (95))),
scale100 = ((tw).tcRegulate((tw
    .transform.scale), (100))),
scale105 = ((tw).tcRegulate((tw
    .transform.scale), (105))),
//
tw_PoEvAuto = ((tw).tcRegulate((tw.interaction
    .pointer), (`events`), (`auto`))),
tw_PoEvNon = ((tw).tcRegulate((tw.interaction
    .pointer), (`events`), (`none`))),
/*|
|*/
loadScreen_CoreCls = [ (opacity100),
    (transite_Opacity), (easeOut),
    (durate_MultiGen),
],
loadScreen_LayerCls = [ (`flex`), (`fixed`),
    (`inset-0`), (`z-[9999]`),
    //
    (`flex-col`), (`items-center`),(`justify-center`),
    (`text-white`),(`bg-neutral-950`), (opacity0),
    //
    (`transition-all`), (durate_TimeTran),
    (easeOut), (scale95), (tw_PoEvNon),
],
//
loadScreen_SpinCls = [
    (`size-${(N4)**(2)}`), (`m-${N4}`),
    //
    (`rounded-full`), (`border-${N4}`),
    (`border-neutral-700`),(`border-t-white`),
    //
    (`animate-spin`),
],
loadScreen_TextCls = [ (`text-xl`), (`font-semibold`),
    (opacity0), (transite_Opacity), (durate_TimeTran),
    (easeOut), (`animate-pulse`),
]
;
export const
/*|*/
classReplace = ((elm, mappings) => {
    (mappings).forEach(([ from, to, ]) => {
        (elm).classList.replace(from, to);
    });
})
;
/**/


/* Build - Loading */
if (comp_LoadScreen) { (comp_LoadScreen)
.classList.add(...loadScreen_CoreCls); }
//
    /** Showing Loading-Screen
     * @returns {HTMLElement|null}
     */
function show_Waiting () {
        if (!(comp_LoadScreen)) return (null);
        //
    (jsMod).setElm((comp_LoadScreen), {
        className: ((jsHt).classer(loadScreen_LayerCls)),
        textContent: ((jsTx).trm(jsVar.empty)),
    });
    //
    const
spinElm = ((jsMod).setElm((
    (jsDoc).creatElm(`div`)), {
        className: ((jsHt).classer(
            loadScreen_SpinCls)),
    })),
textElm = ((jsMod).setElm((
    (jsDoc).creatElm(`p`)), {
        className: ((jsHt).classer(
            loadScreen_TextCls)),
        textContent: (`Loading the Page...`),
    })),
    //
    web_WX = ((window
        .innerWidth) <= (400)),
    web_HY = ((window
        .innerHeight) <= (200))
        ;
    if ((!(web_WX)) && (!(web_HY))) {
        (comp_LoadScreen).append(
            (spinElm), (textElm));
    }
    //
    return (comp_LoadScreen);
}
    /** Hiding Loading-Screen
     * @returns {void}
     */
function hide_Waiting () {
        if (!(comp_LoadScreen)) return;
    //
    let textElm = ((comp_LoadScreen)
        .querySelector(`p`))
        ;
    classReplace((comp_LoadScreen), [
        [ opacity100, opacity0, ],
        [ scale100, scale105, ],
        [ tw_PoEvAuto, tw_PoEvNon, ],
    ]);
    //
    if (textElm) { classReplace((textElm), [
        [ opacity100, opacity0, ]]); }
    //
    setTimeout(() => { (comp_LoadScreen)
        .remove(); }, (transing));
}
//
/**/


/* Final */
    /** Finalize Loading-Screen
     * @returns {void}
     */
function final_LoadScreen () {
    let ls_Wait = (show_Waiting())
        ;
    requestAnimationFrame(() => {
            if (!(ls_Wait)) return;
        let textElm = (ls_Wait).querySelector(`p`);
        //
        classReplace((ls_Wait), [[
            opacity0, opacity100, ],[
            scale95, scale100, ],[
            tw_PoEvNon, tw_PoEvAuto,
        ]]);
        //
        if (textElm) { classReplace((textElm),
            [[ opacity0, opacity100, ]]); }
    });
}
//
    /** [Async] Activating Loading Screen-Workflows
     * @returns {void}
     */
async function on_LoadScreen () {
    //wDisplay_Settler();
    //
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


/* Testing */
//Test...
//
/**/


/* END */
/**/
