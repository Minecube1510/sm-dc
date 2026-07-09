#!/usr/bin/env js
/* web/js/index/img-storage.js */

/* Imports */
import {
    jsTx, jsDoc,
    } from "../basis.js";
//
/**/


/* Storage - Classes */
export const
/*|*/
atlr_ImageCon_Cls = [  /* Ateiler: Container */
    `grid`, `mx-auto`, `place-items-center`,
    `px-2`,`py-4`, `gap-2`, `grid-cols-2`,
    //
    `sm:grid-cols-3`,
    `md:px-4`, `md:gap-4`,
    `lg:grid-cols-5`
],
atlr_PhTxt_Cls = [  /* Ateiler: Text Placeholder (If:No-Images) */
    `font-semibold`, `text-white`,
    `text-3xl`, `py-8`,
],
atlr_ElImg_Cls = [  /* Ateiler: Image Element (If:Has-Images) */
    `cursor-pointer`, `transition-all`,
    `ease-in-out`, `rounded-xl`,
    //
    `w-[200px]`,
    `duration-200`,
    //
    `hover:scale-95`,
    `active:scale-105`,
]
;
/**/


/* Storage - Comping */
    /** Images Ateiler - Component IDs
     * @typedef {Object} ViewImagesComp
     * @property {HTMLElement|null} base
     * @property {HTMLElement|null} atlr
     * @property {HTMLParagraphElement} text
     */
export const img_CompId = ((id) => {
    return ((jsDoc).getId({
        atlrC_MainBox: (`main-img-box`),
        atlrC_ImageCon: (`main-img-content`),
    }[id]));
})
;
/**/


/* END */
/**/
