#!/usr/bin/env js
/* .system/js/process.js */

/* Imports */
import * as bsc from "./basis.js";
/**/


/* Vars */
//
/**/


/* Funcs */
function ht_Classer (classes) {
    const space = (bsc.jsV.space);
    return bsc.js_Arr2Str(classes, space);
}
//
/**/


/* Structings */
function draw_Title (title) {
    const ph_Title = (bsc.js_GetId(`title`).innerHTML);
    //
    (bsc).js_GetId("title").innerHTML = bsc.js_Arr2Str([title,
        ph_Title, ], (" | "));
}
function view_Img (content) {
    /* Varings */
    const vImg = {
        base: bsc.js_GetId("view-images"),
        atlr: bsc.js_CreateELm("div"),
        text: bsc.js_CreateELm("p"),
    };
    (vImg).atlr.id = (`vimg-content`);
    //
    /* Classings */
    const vImg_Classes = {
        fixed: [ `w-full`, `h-full`, ],
        transition: [
            `transition-all`, `duration-300`,
            `ease-[cubic-bezier(0,0,0,1)]`, ],
        //
        box_base: [`vimg-base`,
            `w-full`, `text-center`,
            //
            `rounded-3xl`,
        ],
        box_fill: [`vimg-fill`, `flex`, `grid`,
            `flex-wrap`, `items-center`, `justify-start`,
            `place-items-center`,
            //
            `gap-x-4`, `gap-y-2`,
            //
            `grid-cols-3`, `mx-auto`,
            `rounded-xl`, `bg-neutral-900`,
            `border-4`,`border-solid`,`border-stone-500`,
            //
            `hover:border-0`,
            //
            `md:gap-4`, `md:gap-y-6`,
            `lg:grid-cols-5`, `lg:gap-y-6`,
        ],
        def_text: [``,
            `font-semibold`,
            `text-white`, `text-3xl`,
            `py-8`,
        ],
    };
    (vImg.base).className = ht_Classer([
        ...vImg_Classes.transition,
        ...vImg_Classes.box_base, ]);
    (vImg.atlr).className = ht_Classer([
        ...vImg_Classes.fixed,
        ...vImg_Classes.transition,
        ...vImg_Classes.box_fill, ]);
    (vImg.text).className = ht_Classer([
        ...vImg_Classes.def_text,]);
    //
    /* Gabung */
    (vImg).base.appendChild(vImg.atlr);
    (vImg).atlr.appendChild(vImg.text);
    (vImg).text.innerHTML = content;
    //
    return (vImg);
}
//


/* Construct */
async function get_Imgs () {
    /* Varings */
    const get_bd = bsc.js_Arr2Str([
        //(`guide`),
        (`img`), (`btc`),
    ], (bsc.jsV.slash));
    //
    /* Asyncs */
    const req = await fetch(`/${get_bd}/`);
    const html = await req.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(
        html, `text/html`);
    const links = [...doc.querySelectorAll("a")];
    //
    /* Results */
    const results = [];
    const exts = ([
        "png", "jpg","jpeg",
        "webp",
        //
        "gif",
    ].map(ext => (`.${bsc.js_Lower(ext)}`)));
    //
    return ((links)
        .map(link => (link.getAttribute("href")))
        .filter(href => ((exts).some(ext => (href.endsWith(ext))))
    ));
}
async function struct_Imgs() {
    const imgs = await get_Imgs();
    const phV_Box = (`Images Ateilers has been here`);
    const vBox = view_Img(phV_Box);
    //
    if ((imgs.length) === (0)) {
        const vAteiler = (bsc.js_GetId(`vimg-content`));
        (vBox).atlr.appendChild(vBox.text);
        //
        (vAteiler).classList.remove(`justify-start`,
            `grid-cols-3`);
        (vAteiler).classList.add(`justify-center`);
        //
        return (vBox);
    }
    //
    (vBox).atlr.innerHTML = (bsc.jsV.empty);
    (imgs).forEach((src) => {
        const img = (bsc.js_CreateELm("img"));
        (img).src = (src);
        (img).draggable = (false);
        (img).className = ht_Classer([`rounded-xl`,
            `w-[200px]`,
        ]);
        (vBox).atlr.appendChild(img);
    });
    return (vBox);
}
//


/* Final */
//?
//
export function test () {
    /* Test */
    //?
    //
}
export function struct () {
    /* Head */
    draw_Title (`Images Ateilers`);
    //

    /* Body */
    struct_Imgs();
    //
}
//
/**/


/* Uji Coba */
//?
/**/


/* END */
/**/
