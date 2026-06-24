#!/usr/bin/env js
/* web/js/set-paging.js */

/* Imports */
import { jsVar, inGit,
    jsTx, jsCs, jsDoc, jsHt,
    } from "./basis.js";
//
/**/


/* Automate - Web Page */
if (location.search) {
    const locate_Pn = (location.pathname);
    //
    (location).replace(locate_Pn);
    (history).replaceState((null),
        (jsVar.empty), (locate_Pn));
    (history).back(-1);
}
//
/**/


/* Initialize */
const ldm_Data = {
    modeBtn: ("button-ldm"),
    btnClass: [ `cursor-pointer`,
        `fixed`, `flex`,
        //
        `bottom-5`,`right-5`,
        `w-12`, `h-12`,
        //
        `items-center`, `justify-center`,
        //
        `border-4`, `rounded-full`,
        //
        //`transition-all`, `ease-in-out`,
        //`duration-300`,
        `shadow-lg`,
    ],
    //
    setLight: ((jsTx).lower(`light`)),
    lightCls: [
        `bg-gray-100`, `text-gray-800`,
        `border-gray-800`,
        //
    ],
    setDark: ((jsTx).lower(`dark`)),
    darkCls: [
        `bg-gray-900`, `text-gray-100`,
        `border-gray-100`,
        //
    ],
};
//
    /** Set-Paging ID
     * @param {"sp_Title"|"git_UN"} id
     * @returns {HTMLElement|null}
     */
const sP_DataId = ((id) => {
    return ((jsDoc).getId({
        sp_Title: (`title`),
        git_UN: (`github-username`),
    }[id]));
});
//
/**/


/* Automate - Page Mode */
const pageDom = {
    rMod: (document.documentElement),
    body: (document.body),
};
(pageDom).body.classList.add(
    ...ldm_Data.lightCls);
//
    /** Updating Theme Classing
     * @returns {void}
     */
function update_ThmCls () {
    switch (pageDom.rMod.dataset.theme) {
        case (ldm_Data.setDark):
            (pageDom).body.classList.remove(
                ...ldm_Data.lightCls
            );
            (pageDom).body.classList.add(
                ...ldm_Data.darkCls
            );
            break;
        case (ldm_Data.setLight):
        default:
            (pageDom).body.classList.remove(
                ...ldm_Data.darkCls
            );
            (pageDom).body.classList.add(
                ...ldm_Data.lightCls
            );
            break;
    }
}
    /** Rendering "Light-Dark Mode" Button
     * @returns {void}
     */
function render_LdmBtn () {
    let btn = ((jsDoc).createElm(`button`));
    //
    (btn).id = (ldm_Data.modeBtn);
    (btn).className = ((jsHt).classer(ldm_Data.btnClass));
    //
    let icon = ((jsDoc).createElm(`span`)),
        update_RenderBtn = (() => (
            (icon).className = (`bi bi-${((pageDom.rMod
                .dataset.theme) === (ldm_Data.setDark))
                ? (`sun-fill`) : (`moon-fill`)}`)
        ));
    //
    (btn).appendChild(icon);
    (btn).onclick = () => {
        let mode = (((pageDom.rMod.dataset
            .theme) === (ldm_Data.setDark))
            ? (ldm_Data.setLight) : (ldm_Data
                .setDark));
        (pageDom).rMod.dataset.theme = (mode);
        (localStorage).theme = (mode);
        //
        update_ThmCls();
        update_RenderBtn();
    };
    update_RenderBtn();
    //
    (document).body.appendChild(btn);
}
//
/**/


/* Automate - Paging */
    /** Drawing "Dynamic-Title" for every Page
     * @param {string} page_DyTitle
     * @returns {void}
     */
function page_DynamicTitle (
    page_DyTitle,
) {
    let ph_Title = (sP_DataId(`sp_Title`));
    //
    if (ph_Title) {
        (ph_Title).textContent = ((jsTx).arr2Str([
            (page_DyTitle), (ph_Title.textContent),
        ], (` | `)));
    }
};
//
    /** Signed as Potraying Github Username of Web Owner
     * @param {string} git_UserName
     * @returns {void}
     */
function page_SignUserGit (
    git_UserName,
) {
    let git_UN = sP_DataId(`git_UN`);
    //
    if (git_UserName) { (git_UN)
        .textContent = (git_UserName);
    }
}
//
/**/


/* Final - Paging */
    /** Componentor for Setting Paging
     * @param {string} comPage_Title
     * @returns {void}
     */
export function setPage_Comping (
    comPage_Title,
) {
    const sp_Data = {
        web_title: ((jsTx).trm(comPage_Title)),
        git_name: (inGit.data.name),
    };
    //
    page_DynamicTitle(sp_Data.web_title);
    page_SignUserGit(sp_Data.git_name);
}
    /** Rendering Light-Dark-Mode Features
     * @returns {void}
     */
function rendering_Ldm () {
    render_LdmBtn();
    //
}
rendering_Ldm();
//
/**/


/* END */
/**/
