#!/usr/bin/env js
/* web/js/set-paging.js */

/* Imports */
import { jsVar, jsMod,
    jsTx, jsCs, jsDoc, jsHt,
    //
    sysGit,
    } from "./basis.js";
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
 * @property {string} hover [Hover - Mouse Control]
 * @property {string} active [Active - Mouse Control]
 *      |
 * @property {string} selected [Background - Keyboard Sele-Controlled]
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
resDisplay = {
    w: (window.innerWidth),
    h: (window.innerHeight)
},
spDom = {
    rMod: (document.documentElement),
    body: (document.body),
},
    //
webComp = ({
    coHeader: ((jsDoc).qSelect(`header`)),
    compMain: ((jsDoc).qSelect(`main`)),
    coFooter: ((jsDoc).qSelect(`footer`)),
}),
frameComp = (() => {
    const
        pageMain = ((jsDoc).qSelect(`main`)),
        dirList = ((pageMain)?.querySelector(`ul`))
        ;
    return {
        dirContainer: ((dirList) ? (pageMain.parentElement) : (null)),
        dirLists: [ ...((pageMain)?.querySelectorAll(`ul > li`)
            ?? []), ],
    };
})(),
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
//
durate_250 = ((tw).tcRegulate((tw
.transition.duration), (`250`))),
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
        selected: (`blue-700`),
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
        selected: (`blue-300`),
        //
        ldmbtn: (`mist-800`),
    },
},
//
ldm_Data = {
    modeBtn: (`${strButton}-ldm`),  /* "button-ldm" */
    btnClass: [
        (`fixed`),(`flex`), (`cursor-pointer`),
        (`items-center`), (`justify-center`),
        //
        (`rounded-full`), (`shadow-lg`),
        //
        (`size-${(N4)*(3)}`),
        (`bottom-${N4}`),(`right-${N4}`),
        //
        (`border-${N4}`),
        //
        (`transition`), (durate_250),
        //
        (`into-smooth`),
    ],
    logoClass: [
        (hidden), (`absolute`), (`ease-out`),
        //
        (`transition-all`), (durate_250),
    ],
    //
    setLight: ((jsTx).lower(`light`)),
    lightCls: [
        (`bg-${ldm_Color.light.bg}`),
        (`text-${ldm_Color.light.text}`),
        (`border-${ldm_Color.light.border}`),
    ],
    //
    setDark: ((jsTx).lower(`dark`)),
    darkCls: [
        (`bg-${ldm_Color.dark.bg}`),
        (`text-${ldm_Color.dark.text}`),
        (`border-${ldm_Color.dark.border}`),
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
    .creatElm(strButton)), {
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
            ((jsDoc).creatElm(`span`)), {
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
    (ldmButton).classList.add(...(ldm_StatBtn_Cls));
    setLDm_ThemeClass((ldmButton),
        (`bg-${ldm_Color.light.ldmbtn}`),
        (`bg-${ldm_Color.dark.ldmbtn}`),
    );
    //
    ldmTranser({
        compBtn: (ldmButton),
        compBIs: (ldmIcons),
    });
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
/**/


/* Final - Paging */
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
ldmMainColors = {
    lights: [
        (`bg-${ldm_Color.light.ldmbtn}`),
        (`text-${ldm_Color.light.text}`),
        (`border-${ldm_Color.light.border}`),
    ],
    darks: [
        (`bg-${ldm_Color.dark.ldmbtn}`),
        (`text-${ldm_Color.dark.text}`),
        (`border-${ldm_Color.dark.border}`),
    ],
},
//
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
        (compBtn).addEventListener((`mousedown`), ((e) => {
            (e).preventDefault();
        }));
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
                (ldmMainColors.lights).forEach((light, i) => {
                    setLDm_ThemeClass((compBtn), (light),
                        ((ldmMainColors).darks[i]));
                });
                //
                update_ThmCls();
                update_LdmBtn(true);
        }));
    });
    //
}
//
    /** Displaying Updater (For Width)
     * @returns {void}
     */
export function wDisplay_Settler () {
    const
        webW = (window.innerWidth),
        webH = (window.innerHeight),
        //
        modeBtn = ((jsDoc).getId(
            ldm_Data.modeBtn)),
        //
        x_HideWeb = ((webW) <= (400)),
        x_HideLdm = ((webW) <= (360)),
            //
        y_HideWeb = ((webH) <= (400)),
        y_HideLdm = ((webH) <= (100)),
        //
        for_HideWeb = ((x_HideWeb) || (y_HideWeb)),
        for_HideLdm = ((x_HideLdm) || (y_HideLdm)),
        //
        toggle_Displayer = ((elm, hidden) => {
                if (!(elm)) return;
                //
            (elm).classList.toggle(
                (opacity0), (hidden));
            (elm).classList.toggle(
                (`pointer-events-none`), (hidden));
        })
        ;
    (Object).values(webComp).forEach((el) => {
        toggle_Displayer((el), (for_HideWeb));
    });
    [ (frameComp.dirContainer), ...(frameComp.dirLists),
    ].forEach((el) => {
        if (!(el)) return;
    [
        (`border`), (`rounded-lg`),
        (`shadow-sm`),
    ].forEach((cls) => {
            (el).classList.toggle((cls), (!(for_HideWeb)));
        });
    });
    toggle_Displayer((modeBtn), (for_HideLdm));
}
//
    /** Finalizing Functing (Setting Page)
     * @returns {void}
     */
function finalSetPage () {
    rendering_Ldm();
    //
    wDisplay_Settler();
        //
    (window).addEventListener(
        (`resize`), (wDisplay_Settler));
}
//
finalSetPage();
//
/**/


/* Testing */
//Test...
//
/**/


/* END */
/**/
