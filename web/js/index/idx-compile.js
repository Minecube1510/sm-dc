#!/usr/bin/env js
/* web/js/index/idx-compile.js */

/* Imports */
import * as bsc from "../basis.js";
import * as drpg from "../set-paging.js";
//
import * as idxP from "./idx-process.js";
//
import { marked
    } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
/**/


/* Vars */
const mdV_PhText = ((
    `Preview-ing the Markdown-Document-File`).trim());
//
/**/


/* Struct - Comping */
function mdView_PlHd_Ing (texting) {
    const plHold = ((bsc).jsDoc.createElm(`div`));
    //
    (plHold).className = ((bsc).jsHt.classer([`flex`,
        `absolute`, `items-center`,`justify-center`,
        `text-center`,`font-semibold`,
        `inset-0`, `text-stone-500`, ]));
    (plHold).textContent = (texting);
    //
    (idxP.fMD.content).replaceChildren(plHold);
    //
}
//
function mdView_404 (ph) {
    mdView_PlHd_Ing(ph.trim());
}
const mdErr_404 = (`404 - Markdown Not Found`);
//
/**/


/* Activate */
function mdView_Activation () {
    (idxP.fMD.view).addEventListener(
        (`keydown`), async (event) => {
        if ((event.key) !== (`Enter`)) { return; }
        if (event.repeat) { return; }
        //
        (event).preventDefault();
        //
        const result = await (idxP.md_Searching());
        if (!(result?.ok)) { mdView_404(mdErr_404); }
    });
    (idxP.fMD.search).addEventListener(
        (`click`), async () => {
        const result = await (idxP.md_Searching());
        if (!(result?.ok)) { mdView_404(mdErr_404); }
    });
    //
    (idxP.fMD.view).addEventListener(
        (`input`), () => {
        if (idxP.fMD.view.value.trim()) {
            return; }
        (idxP).md_Clear();
        mdView_PlHd_Ing(mdV_PhText);
    });
}
//
//?
//
/**/


/* Final */
export function test () {
    /*
        Test */ //*
    //?
    // */
    //
}
export async function struct () {
    /*
        Head */
    (drpg).draw_Title(`Index (Under Construction)`);
    (drpg).reBrand_UserGit(bsc.gitD.name);
    //
    /*
        Logs */
    //
    //
    /*
        Body */
    //
    mdView_PlHd_Ing(mdV_PhText);
    mdView_Activation();
}
//
/**/


/* Uji Coba */
//?
//
/**/


/* END */
/**/
