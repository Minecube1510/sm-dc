#!/usr/bin/env js
/* web/js/index/img-storage.js */

/* Imports */
import {
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
//
/**/


/* Storage - Classes */
export const vImg_PhTxt_Cls = [ `py-8`,
    `font-semibold`, `text-3xl`, `text-white`,
];
export const vImg_Atlr_Cls = [ `vimg-fill`,
    `mx-auto`, `place-items-center`, `grid`,
    `px-2`,`py-4`, `gap-2`, `grid-cols-2`,
    `md:px-4`, `md:gap-4`,
    `sm:grid-cols-3`, `lg:grid-cols-5`
];
//
export const vImgAtlr_Add_Cls = [ `flex`,
    `justify-center`, `items-center`,
];
export const vImgAtlr_Rm_Cls = [ `grid`,
    //`justify-start`,
    `grid-cols-2`,
    `sm:grid-cols-3`, `lg:grid-cols-5`,
];
//
export const vImger_Cls = [ `cursor-pointer`,
    `transition-all`, `ease-in-out`,
    `rounded-xl`,
    //
    `w-[200px]`,
    `duration-200`,
    //
    `hover:scale-95`,
    `active:scale-105`,
];
//
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
        vimg_Base: "view-images",
        vimg_Content: "vimg-content",
    }[id]));
});
//
/**/


/* Later */
//
/**/


/* END */
/**/
