#!/usr/bin/env js
/* .system/js/compile.js */

/* Imports */
import * as bsc from "./basis.js";
import * as pro from "./process.js";
/**/


/* Vars */
const empty = (bsc.jsV.empty);
const space = (bsc.jsV.space);
const slash = (bsc.jsV.slash);
const colon = (bsc.jsV.colon);
//
const ht_Lnk = (pro.htWeb.lnk);
const ht_Dom = (pro.htWeb.dom);
const ht_Lcl = (pro.htWeb.lcl);
//
const allImgs = (pro.all_Images);
const is_Lcl = (pro.is_Local);
const g_AL = (pro.g_AL);
//
/**/


/* Funcs - Customs */
function ht_Classer (classes) {
    return ((bsc).js_Arr2Str(classes, space));
}
//
/**/


/* Struct */
function draw_Title (title) {
    const ph_Title = (bsc.js_GetId(`title`).innerHTML);
    //
    (bsc).js_GetId("title").innerHTML = ((bsc)
        .js_Arr2Str([ title, ph_Title, ], (` | `)));
};
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
        transition: [``,
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
        def_text: [`font-semibold`,
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
function show_Waiting () {
    let inLoading = bsc.js_GetId(`loading-screen`);
        if (!(inLoading)) { return null; }
    //
    const inLoad_Spin = ((bsc).js_CreateELm(`div`));
    const inLoad_Wrap = ((bsc).js_CreateELm(`div`));
    const inLoad_Text = ((bsc).js_CreateELm(`p`));
    //
    (inLoading).id = (`loading-screen`);
    (inLoad_Text).textContent = (`Loading Images...`);
    //
    (inLoad_Wrap).className = ht_Classer([
        `flex`,`flex-col`, `items-center`,
        //
        `text-center`, `gap-4`,
    ]);
    (inLoad_Spin).className = ht_Classer([
        `rounded-full`, `animate-spin`,
        `w-16`, `h-16`,
        //
        `border-4`, `border-neutral-700`,
        `border-t-white`,
    ]);
    (inLoad_Text).className = ht_Classer([
        `text-xl`, `text-white`,
        `font-semibold`,
    ]);
    /* Construct */
    (inLoad_Wrap).appendChild(inLoad_Spin);
    (inLoad_Wrap).appendChild(inLoad_Text);
    (inLoading).appendChild(inLoad_Wrap);
    //
    return (inLoading);
}
function hide_Loading () {
    const loading = ((bsc).js_GetId(`loading-screen`));
        if (!(loading)) { return; }
    (loading).classList.remove(`opacity-100`,
        `scale-100`, `blur-0`);
    (loading).classList.add(`opacity-0`,
        `scale-105`, `blur-sm`,
        `pointer-events-none`);
    //
    setTimeout(() => {
        (loading).remove();
    }, (500));
}
//
const comp_SLoading = show_Waiting();
/**/


/* Construct */
//
//
function first_Annouce () {
    (bsc).c_Log((bsc).js_Arr2Str([
        (`Now in Linking:`), (`\n- `),
        (ht_Dom), ], (empty)));
}
function check_Imgs () {
    if (!(allImgs.length)) {return ((bsc).c_Warn
        (`⚠️ There's no Images in here`));
    }
    (bsc).c_GrBgn((bsc).js_Arr2Str([(`Check Images`),
        ((is_Lcl) ? (`Local`) : (`Github API`))
    ], (` - `)));
    (bsc).c_Log((`Get from`) + (`:\n`) + (g_AL));
    (bsc).c_Table((allImgs).map((item) => ({
        name: ((item.name) ?? ((item).split(slash)
            .at(-1))),
        path: ((item.path) ?? ((item).slice(1))),
        src: ((item.src) ?? (pro.ghApi_getLink(item))),
    })));
    (bsc).c_GrEnd();
}
//
async function struct_Imgs () {
    const imgs = (allImgs);
    const phV_Box = (`Images Ateilers has been here`);
    const vBox = view_Img(phV_Box);
    //
    //console.log(imgs);
    //
    const vAteiler = ((bsc).js_GetId(`vimg-content`));
    const is_ImgsEmpty = ((imgs.length) < (1));
    if (is_ImgsEmpty) {
        //(bsc).c_Warn(`⚠️ Tidak ada gambar ditemukan!`);
        //
        (vAteiler).classList.remove((`justify-start`),
            (`grid-cols-3`), (`lg:grid-cols-5`));
        (vAteiler).classList.add(`justify-center`);
        return (vBox);
    }
    (vBox).atlr.innerHTML = (bsc.jsV.empty);
    (imgs).forEach((item) => {
        const img = (bsc.js_CreateELm("img"));
        (img).src = ((item.src) ?? (item));
        (img).draggable = (false);
        (img).className = ht_Classer([ (`rounded-xl`),
            (`w-[200px]`), ]);
        (vBox).atlr.appendChild(img);
    });
    return (vBox);
}
//
/**/


/* Final */
export function test() {
    /* Wait */ //*
    document.body.appendChild(comp_SLoading);
    requestAnimationFrame(() => {
        (comp_SLoading).classList.remove(`opacity-0`,
            `pointer-events-none`);
        (comp_SLoading).classList.add(`opacity-100`);
    });

    // */
    //
    /* Test */ //*
    //
    // */
    //
}
export async function struct () {
    /* Head */
    draw_Title (`Images Ateilers`);
    //

    /* Logs */
    first_Annouce();
    check_Imgs();
    //

    /* Body */
    await struct_Imgs();
    //

    /* End */
    hide_Loading();
    //
}
//
/**/


/* Uji Coba */
//?
//
/**/


/* END */
/**/
