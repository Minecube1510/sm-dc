#!/usr/bin/env js
/* web/js/index/idx-compile.js */

/* Imports */
import { jsVar, dirSafe,
    jsTx, jsCs, jsDoc, jsHt,
    } from "../basis.js";
//
import { ldm_Color, ldm_Data, ldm_Event,
    setPage_Comping,
    //
    setLDm_ThemeClass as ldmClasser,
    } from "../set-paging.js";
    /*|
  //
|*/
import * as idxStrg from './idx-storage.js';
    import {
        //
    } from "./idx-storage.js";
//
import { 
    idxSyncron_System,
    //
    } from "./idx-system.js";
//
import { idxRender_AutoDraw,
    //
    } from "./idx-render.js";
//
import { idxFeature_Process,
    //
    } from "./idx-process.js";
    /*|
  //
|*/

//
/**/


/*
#
    (Easy)
//
|
    (Medium)
//
|
    (Hard)
TODO: [1] Bikinin {Search List} untuk Searcher-utama.
#
*/


/* Clusterizes */
//?
//
/**/


/* Activate */
//?
//
/**/


/* Final */
    /** Presenting as "Test" | Index Page
     * @returns {void}
     */
export function test () {
    /*
        Test */ //*
    // Testing for waiting...
    // */
    (jsCs).warn(`Under Development...`);
    //
}
    /** [Async] Presenting as "Struct" | | Index Page
     * @returns {Promise<void>}
     */
export async function struct () {
    /*
        Head */
    setPage_Comping(
        `Index Page (Under Development)`);
    //
    /*
        Body */
    const
        mainIdx = ((jsDoc).getId(`main-idx`)),
        cekM_Ids = ((mainIdx).querySelectorAll(`[id]`)),
        allIds = [ ...(cekM_Ids) ].map((e) => (e.id))
        ;
    //
    await idxFeature_Process();
    idxRender_AutoDraw();
    //
    idxSyncron_System();
}
//
/**/


/* Uji Coba */
//Testing...
//
/**/


/* END */
/**/
