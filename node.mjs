#!/usr/bin/env js
/* node.mjs */

/** Do:
 * node node.mjs
 */

/* Imports */
import fs from "node:fs";
import path from "node:path";
//
import jsVar
    from "./call/json/vars.json" with { type: "json" };
import dirSafe
    from "./call/json/dir-safe.json" with { type: "json" };
    //
//import * as bsc from "./web/js/basis.js";
//
/**/


/* Methoders */
    /** Write JSON File Method
     * @param {string} jsonPath
     * @param {*} jsonData
     * @returns {void}
     */
function write_Json (
    jsonPath, jsonData,
) {
    (fs).writeFileSync((jsonPath), ((JSON)
        .stringify((jsonData), (null), (4))));
}
//
/**/


/* Noders */
    /*
const fs = require(`fs`);
const path = require(`path`);
    */
//
    /** Scan Directory for Expanded Methods
     * @param {string} dir
     * @param {"short"|"full"} mode
     * @param {Boolean} keepExt
     * @returns {Array}
     */
function scanDir (
    dir, mode = (`short`),
    keepExt = (false),
) {
    //
    return ((fs).readdirSync(dir)
        .flatMap((file) => {
            const realPath = ((path).join(dir, file)),
                isDir = ((fs).statSync(realPath)
                    .isDirectory());
            let fullPath = ((realPath).replaceAll(
                (path.sep), (jsVar.slash)));
            //
            if (!(keepExt)) {
                fullPath = ((fullPath).replace((/\.[^.]+$/),
                    (jsVar.empty)));
            }
            //
            switch (mode) {
            case (`short`):
                return ((isDir) ? scanDir((realPath),
                    (mode)) : (fullPath));
            case (`full`):
                return {
                    type: ((isDir) ? (`folder`)
                        : (`file`)),
                    name: (file),
                    path: (fullPath),
                    ...((isDir) && { children: scanDir(
                        (realPath), (mode)), }),
                };
            default:
                throw new Error(
                    `Unknown scan mode: ${mode}`);
        }
    }));
}
/**/


/* Compiler */
    /** Compiling 1 Folder to JSON
     * @param {string} foldPath
     * @param {string} forPath
     * @param {Boolean} keepExt
     * @param {string} compMode
     * @returns {{
     *  files:number,
     *  size:number,
     * }}
     */
function foldScan_Json (
    foldPath, forPath, keepExt,
    compMode = (`short`),
) {
    const files = scanDir((foldPath),
        (compMode), (keepExt)),
        //
        size = ((Buffer).byteLength(
            (JSON).stringify(files)));
    //
    write_Json((forPath), (files));
    //
    return {
        files: (files.length),
        size, };
}
    /** Scan Directory - Executing
     * @param {string} inMethod
     * @param {string} directer
     * @param {string} filePath
     * @param {Boolean} keepExt
     * @returns {totalJson}
     */
function excing_ScanDir (
    inMethod = (`short`),
    directer = (dirSafe.getfiles),
    filePath = (jsVar.empty),
    keepExt,
) {
    const rPath = (`./${directer}`),
        dirFd = ((fs).readdirSync(rPath)
            .filter((folder) => ((fs).statSync(
                (path).join((rPath), folder)))
                .isDirectory())
            .sort());
    let totalFile = (0),
        totalSize = (0),
        totalJson = (0);
    //
    (console).log(jsVar.empty);
    //
    (console).time(`In-Scan`);
    (console).log(`Starting to Scan...`);
    //
    for (const [ fIdx, folder, ] of dirFd.entries()) {
        const plus_Fidx = ((fIdx) + (1)),
            full_Sdp = ((path).join(
                (rPath), (folder)));
            //
            if (!((fs).statSync(full_Sdp)
                .isDirectory())) continue;
        const getPath = ((path).join(
            (filePath), (`${plus_Fidx}.json`))),
            //
            result = foldScan_Json((full_Sdp),
                (getPath), (keepExt), (inMethod));
        //
        totalJson++;
        totalFile += result.files;
        totalSize += result.size;
        //
        (console).log([
            (`├─ #${plus_Fidx} → ${folder}`),
            (`(${result.files} files`), (`${((
                result.size) / (1024)).toFixed(
                2)} KB)`)
        ].join((`, `)));
    }
    (console).log(`\nResult of the Scanning:`);
    (console).timeEnd(`In-Scan`);
    //
    (console).log([ (`✔ Compiled, Done!`),
        (`Mode : ${inMethod}`),
        (`Path : ${rPath}`),
        (`JSON : ${(totalJson)}`),
        (`File : ${(totalFile)}`),
        (`Size : ${((totalSize) / (
            1024)).toFixed(2)} KB`)
    ].join(jsVar.enter));
    //
    (console).log(jsVar.empty);
    //
    return (totalJson);
}
//
/**/


/* Compiler */
//
    /** Node True Final Executing
     * @returns {void}
     */
function final_Excing () {
    (console).log(jsVar.empty);
    //
    const
        totalFolder = excing_ScanDir((`short`),
            (dirSafe.filename), (dirSafe.getfiles),
            (false)),
        totalImages = excing_ScanDir((`short`),
            (dirSafe.imageset), (dirSafe.getimages),
            (true));
        //
    write_Json((dirSafe.countfile), (totalFolder));
    write_Json((dirSafe.countimgs), (totalImages));
    //
    (console).log(jsVar.empty);
}
final_Excing();
//
/**/


/* END */
/**/
