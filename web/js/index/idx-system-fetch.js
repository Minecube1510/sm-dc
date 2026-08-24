#!/usr/bin/env js
/* web/js/index/idx-system-fetch.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    } from "../basis.js";
//
//?
//
/**/


/* Fetching - Process */
export let MAX_LIST_FILES = ((15) + (3));
const PER_DOKSLI_AN = (`/api/doxlye`);
const RESPONSIVE_LIMITS = {
    mobile: (3),
    tablet: (4),
    computer: ((15) + (3)),
};
//
function getResponsiveCategory () {
    switch (true) {
        case ((window.innerWidth) < (768)):
            return (`mobile`);
        case ((window.innerWidth) < (1024)):
            return (`tablet`);
        default:
            return (`computer`);
    }
}
//
function updateResponsiveLimit () {
    const nextLimit = (RESPONSIVE_LIMITS[
        getResponsiveCategory()]);
        if ((nextLimit) === (MAX_LIST_FILES)) return (false);
    MAX_LIST_FILES = (nextLimit);
    return (true);
}
//
updateResponsiveLimit();
//
window.addEventListener((`resize`), (() => {
    if (updateResponsiveLimit()) {
        window.dispatchEvent((new CustomEvent(
            `idx-search-limit-change`)));
    }
}));
//
    /** [Async] Fetches the document paths from the Doxlye API.
     * @returns {Promise<Array>}
     */
async function system_Fetch_AllFiles () {
    const response = (await (fetch(PER_DOKSLI_AN)));
        if (!(response.ok)) {
            throw (new Error(
                `Doxlye API request failed: ${response.status}`));
        }
    const data = (await (response.json()));
        if (!((Array).isArray(data.link))) {
            throw (new TypeError(
                `Doxlye API response has no document links.`));
        }
    return (data.link);
}
//
const rp_ResLists = (await (
    system_Fetch_AllFiles()));
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
/**/


/* Fetching - Exercise */
    /** [Async] Spliverter for Fuzzy-Search File Features
     * @returns {array}
     */
async function get_Fuzzies_KFiles () {
    return ([
        ...(new Set(((await (rp_ResLists)).flatMap(
        (path) => ((path).split(jsVar.slash))))
    )) ].sort());
}
    /** Validator of Fuzzy-Search File Features
     * @returns {array}
     */
function checker_Fuzzies_KFiles () {
    return ((rp_ResLists).map((file) => ({
        file: (file),
        keys: [ ...(new Set((file)
            .split(jsVar.slash))) ],
    })));
}
//
    /** Easy-Fuzzy Searcher Files - Validator
     * @param {string} kFuzziles
     * @returns {array}
     */
export function validate_Fuzzerch_Files (
    kFuzziles,
) {
    const
        inputKey = ((jsTx).lower(
        (jsTx).trm(kFuzziles))),
        //
        kFiles = (checker_Fuzzies_KFiles())
        ;
    //
    if (!(inputKey)) return ([]);
    //
    return ((kFiles)
        .filter(({ keys, }) => ((keys)
        .some((key) => ((jsTx).lower(key)
        .includes(inputKey)))))
    );
}
    /** Easy-Fuzzy Searcher Files - AutoRank
     * @param {array} liSearchs
     * @param {string} li_KaWord
     * @returns {array}
     */
export function autoRank_Fuzzerch_Files (
    liSearchs, li_KaWord,
) {
    const inputKey = ((jsTx).lower((jsTx).trm(li_KaWord)));
    //
    liSearchs = (shuffle_Random_Files(liSearchs));
    //
    return (liSearchs.map(({ file }) => {
        const text = ((jsTx).lower(file));
        let score = (0),
            streak = (0),
            idx = (0)
            ;
        switch (true) {
            case ((inputKey.length) <= (2)):
                score = ((text).includes(inputKey))
                    ? (0) : (-Infinity);
                //
                break;
            default:
                for (const ch of text) {
                        if ((idx) >= (inputKey.length)) break;
                    //
                    switch ((ch) === (inputKey[idx])) {
                        case (true):
                            score += (10) + ((++streak) * (5));
                            idx++;
                            //
                            break;
                        default:
                            streak = (0);
                            //
                            break;
                    }
                }
                switch (true) {
                    case ((idx) !== (inputKey.length)):
                        score = (-Infinity);
                        //
                        break;
                    case ((text) === (inputKey)):
                        score += (1000);
                        //
                        break;
                    case ((text).startsWith(inputKey)):
                        score += (300);
                        //
                        break;
                    case ((text).includes(inputKey)):
                        score += (100);
                        //
                        break;
                    default:
                        //
                        break;
                }
                score -= (Math.abs(((text
                    .length) - (inputKey.length))));
                //
                break;
        }
        return ({ file, score });
        //
    }).sort((a, b) => (
        (b.score) - (a.score)
    )).map(({ file }) => (file)));
}
//
/**/


/* Export Fetchers */
export const
/*|*/
idx_MainLists = (await (rp_ResLists)),
idx_RandomLists = (await (
    shuffle_Random_Files(idx_MainLists))),
//
idx_10TriaLists = (random_LiSeeder_Files()),
/*|
|*/
idx_Fuzzist = (await (get_Fuzzies_KFiles())),
/*|
|*/
idx_RpList = (await (idx_MainLists)),
idx_PfList = (await (idx_Fuzzist))
;
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
