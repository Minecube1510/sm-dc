#!/usr/bin/env js
/* .system/js/process.js */

/* Imports */
import * as bsc from "./basis.js";
/**/


/* Vars */
const repo = (`s4mpl3_m3m0ry`);
const get_bd = ((bsc).js_Arr2Str([
    (repo),
    //
    //(`guide`),
    (`img`),
], (bsc.jsV.slash)));
const for_bd = (`/${get_bd}/`);
/**/
//(bsc).c_Log(get_bd);


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
    (bsc).js_GetId("title").innerHTML = ((bsc)
        .js_Arr2Str([ title, ph_Title, ], (" | ")));
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
/**/


/* Gets */
async function get_Prefixes (path = `/${get_bd}/`) {
    const results = [];
    const req = await fetch(path);
    if (!((req).ok)) {
        console.warn("Failed:", path);
        return [];
    }
    const html = await req.text();
    //
    const doc = (new DOMParser()
        .parseFromString((html), ("text/html")));
    const links = [ ...doc.querySelectorAll("a") ]
        .map((a) => a.getAttribute("href"))
        .filter(Boolean)
            // skip parent dir
        .filter((href) => href !== "../");
    //
    for (const href of links) {
        const skipHrefs = [ (bsc.jsV.slash), (`./`), (`../`),
            ];
        if ((skipHrefs).includes(href)) { continue; }
        //
        const full = (new URL((href), ((window.location.origin)
            + (path))).pathname);
        //
        // folder
        if ((href).endsWith("/")) {
            results.push({
                type: "dir",
                path: full,
            });
                // recursive
            const sub = await get_Prefixes(full);
            results.push(...sub);
        } else {
                // file
            results.push({
                type: "file",
                path: full,
            });
        }
    }
    return (results);
}
async function get_Imgs () {
    /* Varings */
    const results = [];
    const exts = ([ "png",
        "jpg", "jpeg",
        "webp",
        //
        "gif",
    ].map(ext => (`.${bsc.js_Lower(ext)}`)));
        //
    const pf_Res = await get_Prefixes(for_bd);
    //
    /* Looping Asyncs */
    for (const item of pf_Res) {
        const pf_Item = item.path;
            //
        //console.log(pf_Item);
        //
        const req = await fetch(`${pf_Item}/`);
        const parser = new DOMParser();
            //
        const html = await req.text();
        const doc = parser.parseFromString((html),
            ("text/html"));
            //
        const links = [...doc.querySelectorAll("a")];
        const imgs = links
            .map(link => link.getAttribute("href"))
            .filter(href =>
                exts.some(ext => href?.endsWith(ext))
            );
        results.push(...imgs);
    }
    return (results);
    //
}
//
const all_Images = (await get_Imgs());
/**/


/* Construct */
function check_Imgs () {
    const slash = (bsc.jsV.slash);
    //
    (all_Images).forEach((fn) => {
        const filepath = (fn);
        const filename = ((fn)
            .split(slash).at(-1));
        //
        (bsc).c_Log((bsc).js_Arr2Str([
            `Name: "${filename}"`,
            `At: "${filepath}"`
        ], (`\n`)));
    });
}
//
async function struct_Imgs () {
    const imgs = (all_Images);
    const phV_Box = (`Images Ateilers has been here`);
    const vBox = view_Img(phV_Box);
    //
    //console.log(imgs);
    //
    if ((imgs.length) === (0)) {
        console.warn(`⚠️ Tidak ada gambar ditemukan!`);
        //
        const vAteiler = (bsc.js_GetId(`vimg-content`));
        //
        (vAteiler).classList.remove(`justify-start`,
            `grid-cols-3`, `lg:grid-cols-5`);
        (vAteiler).classList.add(`justify-center`);
        //
        return (vBox);
    }
    //
    (vBox).atlr.innerHTML = (bsc.jsV.empty);
    (imgs).forEach((src) => {
        //bsc.c_Log(src);
        //
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
/**/


/* Final */
//?
//
export function test () {
    /* Test */
    //?
    //
}
export async function struct () {
    /* Head */
    draw_Title (`Images Ateilers`);
    //

    /* Body */
    check_Imgs();
    await struct_Imgs();
    //
}
//
/**/


/* Uji Coba */
//?
//
//?
/**/


/* END */
/**/
