#!/usr/bin/env js
/* web/js/images/img-storage.js */

/* Imports */
import { jsVar,
    jsTx, jsDoc, jsCs,
    } from "../basis.js";
//
import * as tw from '../tw-css-cls.js';
//
/**/


/* Classes - Auto Tailwind */
const
ease = (tw.transition.ease),
duration = (tw.transition.duration),
/*|
|*/
easeInOut = ((tw).tcRegulate(
    (ease), (`in`), (`out`))),
gen_Durate = ((tw).tcRegulate(
    (duration), (200)))
;
/**/


/* Classes - Main Components */
export const
/*|*/
img_Internimate = [
    (easeInOut), (gen_Durate),
],
/*|
|*/
atlr_ImageCon_Cls = [  /* Ateiler: Container */
    (`grid`), (`grid-cols-2`), (`place-items-center`),
    //
    (`mx-auto`), (`gap-2`), (`px-2`),(`py-4`),
    //
    ...((tw).tcPlugnite((`sm`), [ (`grid-cols-3`), ])),
    ...((tw).tcPlugnite((`md`), [ (`px-4`), (`gap-4`), ])),
    ...((tw).tcPlugnite((`lg`), [ (`grid-cols-5`), ])),
],
atlr_PhTxt_Cls = [  /* Ateiler: Text Placeholder (If:No-Images) */
    (`py-8`), (`text-white`), (`text-3xl`), (`font-semibold`),
],
atlr_ElImg_Cls = [  /* Ateiler: Image Element (If:Has-Images) */
    (`w-[200px]`), (`rounded-xl`),
    //
    (`transition-all`), ...(img_Internimate),
    //
    (`cursor-pointer`),
    //
    ...((tw).tcPlugnite((`hover`), [ (`scale-105`),
        (`[filter:drop-shadow(0_0_8px_white)]`), ])),
    ...((tw).tcPlugnite((`active`), [ (`scale-95`),
        (`[filter:drop-shadow(0_0_8px_gray)]`), ])),
]
;
/**/


/* Storage - Comping */
    /** Images Ateiler - Component IDs
     * @typedef {Object} ViewImagesComp
     * @property {string} atlrC_MainBox
     * @property {string} atlrC_ImageCon
     */
export const img_CompId = ((id) => {
    return ((jsDoc).getId({
        atlrC_MainBox: (`main-img-box`),
        atlrC_ImageCon: (`main-img-content`),
    }[id]));
})
;
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
