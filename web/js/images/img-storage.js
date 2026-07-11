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
    //`bg-taupe-400`,
    //
    `w-[200px]`,
    `duration-200`,
    //
    `hover:scale-105`, `hover:[filter:drop-shadow(0_0_8px_white)]`,
    `active:scale-95`, `active:[filter:drop-shadow(0_0_8px_gray)]`,
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


/* Uji Coba */
//?
//
/**/


/* END */
/**/
