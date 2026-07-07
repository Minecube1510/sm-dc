#!/usr/bin/env js
/* web/js/index/init-github.js */

/* Imports */
import { jsVar, inGit, dirSafe,
    jsTx, jsCs, jsDoc, jsHt,
    //
    toLink_txtPro,
    } from "./basis.js";
//
/**/


/* Configs - Github */
export const
    gh_Config = ((tick) => ({
        bsc: (inGit.link.ltp.bsc),
        scr: (inGit.link.ltp.scr),
        //
        raw: (inGit.link.gh.base.raw),
        api: (inGit.link.gh.base.api),
        // 
        repo: (inGit.link.gh.path.repo),
})[tick]),
    //
    htWeb = {
        lnk: (window.location.href),  /*
            Full Domain Link */
        dom: (window.location.origin),  /*
            The Domain Name */
        lcl: (location.hostname),  /*
            This if for Local */
        //
        path: (window.location.pathname),  /*
            Domain's Canal/Continue */
};
//
export let
    isLocal = (
        ((htWeb.lcl) === (`127.0.0.1`)) ||
        ((htWeb.lcl) === (`localhost`))
);
//
/**/


/* Initialize - Github */
    /** [Async] Config to Github for early
     * @returns {Promise<typeof inGit.data>}
     */
export async function git_Config () {
    const get_repo = ((isLocal)
        ? ((await (await (fetch
            (`./package.json`))).json()).name)
        : (gh_Config(`repo`).slice((0), (-1)))
    );
    (inGit).data.repo = ((isLocal)
        ? (get_repo) : (((htWeb.path).split(
            jsVar.slash).filter(Boolean)
        .at(0)) ?? (get_repo))
    );
    return (inGit.data.name);
}
//
    /** Get linking to Github Raw
     * @param {string} gitPath
     * @returns {string}
     */
export function ghRaw_inLink (
    gitPath,
) {
    return ((jsHt).linker([ toLink_txtPro(
        gh_Config(`scr`), gh_Config(`raw`)),
        (inGit.data.name), (inGit.data.repo),
        (inGit.data.branch), (gitPath),
    ]));
}
    /** Get linking to Github API
     * @param {string} gitPath
     * @returns {string}
     */
export function ghApi_getLink (
    gitPath = (jsVar.empty),
) {
    gitPath = ((gitPath.startsWith(jsVar.slash))
        ? (gitPath.slice(1)) : (gitPath));
    let ghApi_Base = ((jsHt).linker([ (toLink_txtPro(
        gh_Config(`scr`), gh_Config(`api`))),
        gh_Config(`repo`), (inGit.data.name),
        (inGit.data.repo), (`contents`),
    ]));
    //
    return (`${(jsHt).linker([
        (ghApi_Base), (gitPath),
    ])}?ref=${inGit.data.branch}`);
}
//
/**/


/* END */
/**/
