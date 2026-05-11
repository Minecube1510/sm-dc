#!/usr/bin/env js
/* .system/js/process.js */

/* Imports */
import * as bsc from "./basis.js";
/**/


/* Vars - Basic */
const empty = (bsc.jsV.empty);
const space = (bsc.jsV.space);
const slash = (bsc.jsV.slash);
const colon = (bsc.jsV.colon);
//
const now_link = (window.location.origin);
const local = (location.hostname);
//
/**/


/* Funcs - Customs */
function ht_Classer (classes) {
    return ((bsc).js_Arr2Str(classes, space));
}
//
function ht_Linker (paths) {
    return ((bsc).js_Arr2Str(paths, slash));
}
/**/


/* Vars - Data */
const github = {
    user: (`Minecube1510`),
    repo: (`s4mpl3_m3m0ry`),
    branch: (`work-dev`),
};
const ghLink_Api = ((bsc)
    .to_Https(`api.github.com`));
const ghApi_Repo = (ht_Linker([
    (ghLink_Api), (`repos`),
]));
//
const ghApi_AutoLink = ht_Linker([
    (ghApi_Repo), (github.user),
    (github.repo), (`contents`),
]);
const fghL_Api = ((bsc).js_Arr2Str([
    (ghApi_AutoLink),
    (`?ref=${github.branch}`),
], (empty)));
/**/


/* Funcs - Data */
function ghApi_getLink (path) {
    path = (((path).startsWith(slash))
        ? ((path).slice(1)) : (path));
    const getlink = ht_Linker([
        (ghApi_AutoLink), (path),
    ]);
    return ((bsc).js_Arr2Str([(getlink),
        (`?ref=${github.branch}`),
], (empty)));
}
//
const get_ApiLink = ghApi_getLink(`img`);
const g_AL = (get_ApiLink);
/**/


/* Vars - Switch */
const format_exts = ([ "png",
    "jpg","jpeg", "webp",
    //
    "gif",
].map(ext => (`.${bsc.js_Lower(ext)}`)));
//
const get_bd = ((bsc).js_Arr2Str([
    //(`guide`),
    (`img`),
], (slash)));
const for_bd = (`${get_bd}/`);
//
const is_Local = (
    ((local) === (`127.0.0.1`)) ||
    ((local) === (`localhost`))
);
const is_GitPg = ((local).endsWith(`github.io`));
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
/**/


/* Gets - Localize */
async function in_Fetching (path) {
    const req = (await bsc.jsA_GetFetch(path));
    if (!req.ok) { return []; }
    const html = (await (req.text()));
    const doc = (new DOMParser()
        .parseFromString(html, "text/html"));
    return [ ...doc.querySelectorAll("a") ]
        .map(a => a.getAttribute("href"))
        .filter(Boolean);
}
//
async function fetch_Prefix (path) {
    return (await in_Fetching(path))
        .filter(href => ((href) !== ("../")));
}
async function fetch_Imgs (pf_Item, exts,
    path = (`${pf_Item}/`),
) {
    return ((await in_Fetching(path)).filter((href) =>
        exts.some((ext) => href?.endsWith(ext)),
    ));
}
//
async function get_Prefixes (path = (`./${for_bd}`)) {
    /* Async Configs */
    const results = [];
    const links = await fetch_Prefix(path);
    //
    const pf_Link = ((is_Local) ?
        (now_link) : (`${now_link}`));
    const getLink = (new URL(path, pf_Link));
    //
    for (const href of links) {
        if ([ (slash), (`./`), (`../`), ]
            .includes(href)) { continue; }
        const full = (new URL(href, getLink).pathname);
        const isDir = ((href).endsWith(slash));
        //
        (results).push({
            type: ((isDir) ? (`dir`) : (`file`)),
            path: (full),
        });
        if (isDir) { (results).push(
            ...(await get_Prefixes(full))); }
    }
    return (results);
}
async function get_Imgs (api = g_AL) {
    /* Local */
    if (is_Local) {
        const pf_Res = (await get_Prefixes(for_bd));
        return ((await Promise.all((pf_Res).map(
            (item) => fetch_Imgs((item.path),
                (format_exts))))).flat()
            .filter((href) => (format_exts)
                .some((ext) => href?.endsWith(ext)
        )));
    }
    /* Github Pages */
    if (!(is_GitPg)) { return []; }
    /* In Process */
    const req = (await fetch(api));
        if (!(req.ok)) { return []; }
    const data = (await req.json());
    //
    return (await Promise.all(data.map(
        async (item) => {
            /* Folder */
            if ((item.type) === (`dir`)) { return (
                await get_Imgs(item.url));
            }
            /* File */
            const is_Img = ((item.type) === (`file`)) &&
                (format_exts).some((ext) => ((bsc)
                    .js_Lower(item.name)).endsWith(ext));
            return ((is_Img) ? ({
                name: (item.name),
                path: (item.path),
                src: (item.download_url),
            }) : ([]));
        })
    )).flat();
}
//
const all_Images = ((await get_Imgs()));
/**/


/* Construct */
function first_Annouce () {
    (bsc).c_Log((`Now in Linking:`)
        + (`\n- `) + (now_link));
}
function check_Imgs () {
    if (!(all_Images.length)) {return ((bsc).c_Warn
        (`⚠️ There's no Images in here`));
    }
    (bsc).c_GrBgn((bsc).js_Arr2Str([(`Check Images`),
        ((is_Local) ? (`Local`) : (`Github API`))
    ], (` - `)));
    (bsc).c_Log((`Get from`) + (`:\n`) + (g_AL));
    (bsc).c_Table((all_Images).map((item) => ({
        name: ((item.name) ?? ((item).split(slash)
            .at(-1))),
        path: ((item.path) ?? ((item).slice(1))),
        src: ((item.src) ?? (ghApi_getLink(item))),
    })));
    (bsc).c_GrEnd();
}
//
async function struct_Imgs () {
    const imgs = (all_Images);
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

    /* Logs */
    first_Annouce();
    check_Imgs();
    //

    /* Body */
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
