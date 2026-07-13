#!/usr/bin/env js
/* web/js/set-paging.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    sysGit,
    } from "./basis.js";
//
import * as tw from './tw-css-cls.js';
//
/**/


/* Automate - Web Page */
if (location.search) {
    let locate_Pn = (location.pathname);
    //
    (location).replace(locate_Pn);
    (history).replaceState((null),
        (jsVar.empty), (locate_Pn));
    (history).back(-1);
}
//
/**/


/* Initialize - LDM and Paging System */
/** LDM-Theme Colorize Configs
 * @typedef {Object} LdmColorTheme
 * @property {string} bg [Background - Main]
 * @property {string} text [Text - Main]
 * @property {string} border [Border - Main]
 * |
 * @property {string} hover [Hover - Main]
 * @property {string} active [Active - Main]
 * |
 * @property {string} ldmbtn [Background - LDM-Button]
 */
//
/** Light/Dark Mode Color Configurates
 * @type {Object} light: LdmColorTheme,
 * @type {Object} dark: LdmColorTheme,
 */
//
export const
/*|*/
N4 = (4),
strButton = (`button`),
//
ldm_Event = (new EventTarget()),
//
spDom = {
    rMod: (document.documentElement),
    body: (document.body),
},
/*|
|*/
hidden = (tw.layout.hidden),
//
opacity0 = ((tw).tcRegulate((tw
    .effects.opacity), (0))),
//
animatePulse = ((tw).tcRegulate((tw
.transition.animate), (`pulse`))),
//
translateY6 = ((tw).tcRegulate((tw
.transform.translate), (`y`), (6))),
/*|
|*/
ldm_BICons_Cls = ((bicon) => { return [
    (`bi`), (`bi-${bicon}-fill`), ]}),
    //
ldm_StatBtn_Cls = [ (`z-[999]`),
    (`hover:${animatePulse}`),
    (`active:${animatePulse}`),
],
/*|
|*/
ldm_Color = {
    light: {
        bg: (`gray-100`),
        text: (`gray-900`),
        border: (`gray-800`),
        //
        hover: (`gray-500`),
        active: (`gray-600`),
        //
        ldmbtn: (`mist-200`),
    },
    dark: {
        bg: (`gray-900`),
        text: (`gray-100`),
        border: (`gray-200`),
        //
        hover: (`gray-600`),
        active: (`gray-500`),
        //
        ldmbtn: (`mist-800`),
    },
},
//
ldm_Data = {
    modeBtn: (`${strButton}-ldm`),
    btnClass: [
        (`fixed`),(`flex`), (`cursor-pointer`),
        (`items-center`), (`justify-center`),
        //
        (`rounded-full`), (`shadow-lg`),
        (`into-smooth`),
        //
        (`size-${(N4)*(3)}`),
        (`bottom-${N4}`),(`right-${N4}`),
        //
        (`border-${N4}`),
    ],
    logoClass: [
        (hidden), (`absolute`), (`ease-out`),
        //
        (`transition-all`),
        (`duration-300`),
    ],
    //
    setLight: ((jsTx).lower(`light`)),
    lightCls: [
        `bg-${ldm_Color.light.bg}`,
        `text-${ldm_Color.light.text}`,
        `border-${ldm_Color.light.border}`,
    ],
    //
    setDark: ((jsTx).lower(`dark`)),
    darkCls: [
        `bg-${ldm_Color.dark.bg}`,
        `text-${ldm_Color.dark.text}`,
        `border-${ldm_Color.dark.border}`,
    ],
};
//
    /** Set-Paging ID
     * @param {"pagingTitle"|"gitUserName"} pagId
     * @returns {HTMLElement|null}
     */
function pager_DataId (
    pagId,
) {
    return ((jsDoc).getId({
        pagingTitle: (`title`),
        gitUserName: (`github-username`),
    }[pagId]));
}
//
/**/


/* Automate - LDM and Paging System */
    /** Updating Theme Classing
     * @returns {void}
     */
function update_ThmCls () {
    switch (spDom.rMod.dataset.theme) {
        case (ldm_Data.setDark):
            (ldm_Data.lightCls).forEach((cls, i) => {
                (spDom.body).classList.replace(
                    (cls), (ldm_Data.darkCls[i]));
            });
            break;
        case (ldm_Data.setLight):
        default:
            (ldm_Data.darkCls).forEach((cls, i) => {
                (spDom.body).classList.replace(
                    (cls), (ldm_Data.lightCls[i]));
            });
            break;
    }
}
    /** Rendering "Light-Dark Mode" Button
     * @param {string[]} ldmIcon
     * @param {(
     *  compBtn: HTMLElement,
     *  compBIs: HTMLElement[],
     * ) => void} ldmTranser
     * @returns {void}
     */
function render_LdmBtn (
    ldmIcon = [],
    ldmTranser = (() => {}),
) {
    const
    /*|*/
ldmButton = ((jsMod).setElm(((jsDoc)
    .createElm(strButton)), {
        id: (ldm_Data.modeBtn),
        type: (strButton),
        className: ((jsHt).classer(
            ldm_Data.btnClass)),
})),
//
ldmIcons = []
    ;
    (ldmIcon).forEach((icon, idx) => {
        const elmCon = ((jsMod).setElm(
            ((jsDoc).createElm(`span`)), {
                id: (`mode-ldm-${idx}`),
                className: ((jsHt).classer(
                    ldm_Data.logoClass)),
        }));
        //
        (elmCon).classList.add(...
        (ldm_BICons_Cls(icon)));
        //
        (ldmButton).append(elmCon);
        (ldmIcons).push(elmCon);
    });
    //
    (ldmButton).classList.add(
        ...(ldm_StatBtn_Cls));
    setLDm_ThemeClass((ldmButton),
        (`bg-${ldm_Color.light.ldmbtn}`),
        (`bg-${ldm_Color.dark.ldmbtn}`),
    );
    //
    ldmTranser({ compBtn: (ldmButton), compBIs: (ldmIcons), });
    //
    (spDom.body).appendChild(ldmButton);
}
//
    /** Updating Theme Classing - Dynamic Elemented
     * @param {HTMLElement} eLDMode
     * @param {string[]} cLight "Light-mode class list"
     * @param {string[]} cDark "Dark-mode class list"
     * @returns {void}
     */
export function setLDm_ThemeClass (
    eLDMode = (jsVar.empty),
    cLight = (ldm_Data.lightCls),
    cDark = (ldm_Data.darkCls),
) {
    cLight = (((Array).isArray(cLight)) ? (cLight) : [cLight]);
    cDark = (((Array).isArray(cDark)) ? (cDark) : [cDark]);
    //
    let [ from, into, ] = (((spDom.rMod.dataset
        .theme) === (ldm_Data.setDark)) ? [
        cLight, cDark, ] : [ cDark, cLight,
    ]);
    //
    (from).forEach((cls, i) => { if (!((eLDMode)
        .classList.replace((cls), (into[i]))
    )) { (eLDMode).classList.add(into[i]); }});
}
//
/**/


/* Automate - Paging */
setLDm_ThemeClass((spDom.body),
    (ldm_Data.lightCls),
    (ldm_Data.darkCls),
);
//
    /** Drawing "Dynamic-Title" for every Page
     * @param {string} pageMethod
     * @param {string} pagerValue
     * @returns {void}
     */
function page_Setter (
    pageMethod, pagerValue,
) {
    const pagElm = pager_DataId(pageMethod);
        if (!(pagElm)) return;
    switch (pageMethod) {
        case (`pagingTitle`):
            (jsMod).setElm((pagElm), {
                textContent: (`${pagerValue
                    } | ${pagElm.textContent}`),
            });
            break;
        case (`gitUserName`):
            (jsMod).setElm((pagElm), {
                textContent: (pagerValue),
            });
            break;
        //
        // case (`?`):
        // case (`?`):
        // case (`?`):
        //
        default:
            break;
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
    let sp_Data = {
        web_title: ((jsTx).trm(comPage_Title)),
        git_name: (sysGit.data.name),
    };
    //
    page_Setter((`pagingTitle`), (sp_Data.web_title));
    page_Setter((`gitUserName`), (sp_Data.git_name));
}
//
    /** Rendering Light-Dark-Mode Features
     * @returns {void}
     */
function rendering_Ldm () {
    const
    /*|*/
ldmChange = {
    inCame: [ (`translate-y-0`),
        (`opacity-100`), ],
    outTop: [ (translateY6),
        (opacity0), ],
    outBot: [ (translateY6),
        (opacity0), ],
},
    ldmSec = (150),
    hLdmSec = (500)
    ;
    let
        isAnimating = (false);
    //
    render_LdmBtn([ (`sun`), (`moon`),
    ],
    ({ compBtn, compBIs, }) => {
        const update_LdmBtn = ((animate = (true)) => {
            //
            let
                isDark = ((1) - +((spDom.rMod.dataset
                    .theme) === (ldm_Data.setDark))),
                //
                show = (compBIs[isDark]),
                hide = (compBIs[(1) - (isDark)]),
                //
                swap = ((icon, from, to) => ((from)
                    .forEach((cls, i) => ((icon)
                    .classList.replace(cls, to[i])))
                ))
                ;
            (compBIs).forEach((icon) => ((icon)
                .classList.remove(`hidden`)));
            //
            if (!(animate)) {[
                    [ (show), (`inCame`), ],
                    [ (hide), (`outTop`), ],
                ].forEach(([ icon, state, ]) => ((icon)
                    .classList.add(...(ldmChange[state]))
                ));
                //
                return;
            }
            //
            (show).classList.add(...(ldmChange.outBot));
            //
            requestAnimationFrame(() => {
                swap((hide), (ldmChange.inCame),
                    (ldmChange.outTop));
                //
                setTimeout(() => { swap((show),
                    (ldmChange.outBot), (ldmChange.inCame));
                }, (ldmSec));
            });
        });
        //
        (compBtn).onclick = (() => {
            let mode = (((spDom.rMod.dataset
                .theme) === (ldm_Data.setDark))
                    ? (ldm_Data.setLight)
                    : (ldm_Data.setDark)
            );
                if (isAnimating) return;
                //
            isAnimating = (true);
            //
            (spDom.rMod).dataset.theme = (mode);
            (localStorage).theme = (mode);
            //
            (ldm_Event).dispatchEvent(new
                Event(`themechange`));
            //
            setTimeout(() => {
                isAnimating = (false);
            }, (hLdmSec));
        });
        //
        update_LdmBtn(false);
        //
        (ldm_Event).addEventListener(
            (`themechange`), (() => {
                setLDm_ThemeClass((compBtn),
                    (`bg-${ldm_Color.light.ldmbtn}`),
                    (`bg-${ldm_Color.dark.ldmbtn}`),
                );
                //
                update_ThmCls();
                update_LdmBtn(true);
        }));
    });
    //
}
//
rendering_Ldm();
//
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
