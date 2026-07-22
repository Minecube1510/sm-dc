#!/usr/bin/env js
/* web/js/index/idx-system-fetch.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    dirSafe,
    } from "../basis.js";
//
//?
//
/**/


/* Fetching - Process */
const MAX_LIST_FILES = ((15) + (3));
//
    /** [Async] Fetches every JSON file and Compress for the array.
     * @returns {Promise<Array>}
     */
async function system_Fetch_AllFiles () {
    return (
        (await ((Promise).all(((Array).from({length: (Number(
            await (await (fetch(dirSafe.countfile))).text())),
        }, ((_, i) => (fetch(`${dirSafe.getfiles}/${(i) + (1)
            }.json`).then((r) => ((r).json()))))))))).flat()
    );
}
//
/**/


/* Fetching - Manipulates */
    /** Limiting for get fetches.
     * @param {Array} files
     * @param {number} max
     * @returns {Array}
     */
export function limit_Fetch_Files (
    files, max = (MAX_LIST_FILES),
) {
    return ((files).slice((0), (max)));
}
//
    /** Returns a shuffled copy of an array.
     * @param {Array} arrLists
     * @returns {Array}
     */
export function shuffle_Random_Files (
    arrLists,
) {
    return ([ ...(arrLists), ].sort(() => (
        ((Math).random()) - (0.5))));
}
    /** Returns a shuffled copy of an array.
     * @param {number} maxLists
     * @returns {array}
     */
export function random_LiSeeder_Files (
    maxLists = (MAX_LIST_FILES),
) {
    return (limit_Fetch_Files(
        shuffle_Random_Files(
            idx_MainLists), (maxLists))
    );
}
//
    /** Easy-Fuzzy Searcher Files
     * @param {array} liFiles
     * @returns {?}
     */
export function autoRank_Fuzzerch_Files (
    liFiles,
) {
    //
    //
}
//
/**/


/* Exports */
export const
/*|*/
idx_MainLists = (await (
    system_Fetch_AllFiles())),
idx_RandomLists = (await (
    shuffle_Random_Files(idx_MainLists))),
//
idx_10TriaLists = (random_LiSeeder_Files())
    ;
//
/**/


/* Testing */
//Test...
//(jsCs).log(idx_MainLists);
//
/**/


/* END */
/**/
