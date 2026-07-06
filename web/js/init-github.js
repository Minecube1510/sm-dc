#!/usr/bin/env js
/* web/js/index/init-github.js */

/* Imports */
import { jsVar, inGit,
    jsTx, jsCs, jsDoc, jsHt,
    toLink_txtPro,
    } from "./basis.js";
//
/**/


/* Configs - Github */
const ghCfg = ((tick) => ({
    bsc: (inGit.link.ltp.bsc),
    scr: (inGit.link.ltp.scr),
    //
    raw: (inGit.link.gh.base.raw),
    api: (inGit.link.gh.base.api),
    // 
    repo: (inGit.link.gh.path.repo),
})[tick]);
export const htWeb = {
    lnk: (window.location.href),
    dom: (window.location.origin),
    lcl: (location.hostname),
    //
    path: (window.location.pathname),
};
//
export let is_Local = (
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
    const get_repo = ((is_Local)
        ? ((await (await (fetch
            (`./package.json`))).json()).name)
        : (ghCfg(`repo`).slice((0), (-1)))
    );
    (inGit).data.repo = ((is_Local)
        ? (get_repo) : (((htWeb.path).split(
            jsVar.slash).filter(Boolean)
        .at(0)) ?? (get_repo))
    );
    return (inGit.data.name);
}
    /** Get linking to Github API
     * @param {string} [path=jsVar.empty]
     * @returns {string}
     */
export function ghApi_getLink (
    path = (jsVar.empty),
) {
    path = ((path.startsWith(jsVar.slash))
        ? (path.slice(1)) : (path));
    let ghApi_Base = ((jsHt).linker([
        (toLink_txtPro(ghCfg(`scr`), ghCfg(`api`))),
        ghCfg(`repo`), (inGit.data.name),
        (inGit.data.repo), (`contents`),
    ]));
    return (`${(jsHt).linker([
        (ghApi_Base), (path),
    ])}?ref=${inGit.data.branch}`);
}
//
/**/


/* END */
/**/
