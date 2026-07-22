#!/usr/bin/env js
/* web/js/index/idx-process.js */

/* Imports */
import { jsVar, jsMod,
  jsTx, jsCs, jsDoc, jsHt,
  //
  dirSafe,
  } from "../basis.js";
//
import { ldm_Color, ldm_Data, ldm_Event,
  setPage_Comping,
  //
  setLDm_ThemeClass as ldmClasser,
  } from "../set-paging.js";
  /*|
|*/
import { marked,
  } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
  /*|
|*/
import * as idxStrg from './idx-storage.js';
  import { idxMc, idx_FirSearch,
    //
    idx_MComp as cIdx,
    //rscs_Comps as src_ComId,
    //
  } from "./idx-storage.js";
//
import { noSpam_SrcTime,
  linkPath_GtSrc_LiNav,
  //
  delay_MdvWait,
  loadWait_Markdown_Viewer,
  //
  mdView_SearchList_Cooldown,
  //
  } from "./idx-system.js";
import * as idxSysF from "./idx-system-fetch.js";
import {
  limit_Fetch_Files,
  shuffle_Random_Files,
  //
  idx_MainLists as getLists,
  idx_10TriaLists as triaLists,
  random_LiSeeder_Files,
  //
  } from "./idx-system-fetch.js";
//
import { 
  render_ViewMd,
  //
  } from "./idx-render.js";
import { toggle_ResultList,
  //
  srcList_LiClick_LdmCls,
  srcList_LiRowed_LdmCls,
  //
  } from "./idx-render-config.js";
import { idCo_UliRes,
  init_RcSrc_List,
  //
  } from "./idx-render-kit.js";
//
/**/


/* Main Processes - Storage */
const
/*|*/
src_Res = (idxMc.src_Res)
;
let
/*|*/
selectIndex = (-1),
currentRes = []
;
//
/**/


/* Features - Function */
  /** [Async] Rendering Markdown Files
   * @returns {void}
   */
export async function render_MdFile () {
  let path = ((jsTx).trm(idxMc.srcPath.value));
    if (!(path)) return;
    //
  switch (true) {
    case ((path).endsWith(idxStrg.format_Md)):
      return (alert(`Didn't need to do that!`));
    default:
      break;
  }
  //
  loadWait_Markdown_Viewer((`show`),
    (`Loading the Markdown...`));
  //
  try {
    path = (await fetch(`${path}.md`));
    //
    switch ((path).status) {
      case (404):
(jsMod).setElm(((jsDoc).getId(idxMc.mvPhText)), {
  textContent: (`404 - Markdown Not Found`),
});
        return;
      default:
        break;
    }
    //
    await delay_MdvWait(2500);
    //
    (jsMod).setElm((idxMc.viewBase), {
      innerHTML: ((marked).parse(
        await ((path).text()))),
    });
  }
  finally {
    loadWait_Markdown_Viewer(`hide`);
}}
//
  /** Gets list (li) of Files.
   * @returns {HTMLLIElement[]}
   */
function get_ResultLists () {
  const proLists = [ ...((src_Res)
    .querySelectorAll(`li`)), ];
  return (proLists);
}
  /** Refreshes the cached search result list.
   * @returns {void}
   */
function refresh_ResultLists () {
  currentRes = (get_ResultLists());
}
//
  /** Updates the highlighted search result based on `selectIndex`.
   * @returns {void}
   */
function update_ResultSelect () {
  const
    items = (currentRes),
    active = (items[selectIndex])
    ;
  //
  (items).forEach((li, i) => {
    ldmClasser((li),
      (srcList_LiClick_LdmCls.lights),
      (srcList_LiClick_LdmCls.darks),
    );
    //
    (li).classList.remove(
      ...(srcList_LiRowed_LdmCls.lights),
      ...(srcList_LiRowed_LdmCls.darks),
    );
    //
    if ((i) === (selectIndex)) {
      ldmClasser((li),
        (srcList_LiRowed_LdmCls.lights),
        (srcList_LiRowed_LdmCls.darks),
      );
    } else {
      //
    }
  });
  //
  if (active) {
    (active).scrollIntoView({
      behavior: (`smooth`),
      block: (`nearest`),
    });
  }
}
  /** Select methods a search result item.
   * @param {boolean} tCoolDown
   * @param {HTMLLIElement} seList
   * @returns {void}
   */
export function select_ResultItem (
  tCoolDown, seList,
) {
    if (!(seList)) return;
    //
  (jsMod).setElm((idxMc.srcPath), {
    value: (seList.textContent),
  });
  //
  toggle_ResultList(false);
  //
  selectIndex = (-1);
  currentRes = [];
  //
  linkPath_GtSrc_LiNav();
  mdView_SearchList_Cooldown((tCoolDown),
    ((v) => (tCoolDown = (v))),
    (render_MdFile), (noSpam_SrcTime),
  );
}
//
/**/


/* Feature - Gathering */
  /** Event Feature: Search-Button - Click
   * @param {() => {}} ft_Func1
   * @returns {void}
   */
function init_SearchButton (
  ft_Func1,
) {
  (idxMc.src_Btn).addEventListener(
    (`click`), (() => { ft_Func1();
  }));
}
  //
  /** Event Feature: Input-Path - Input
   * @param {string} srcIn_Keying
   * @returns {void}
   */
function init_SearchInput (
  srcIn_Keying,
) {
  srcIn_Keying = ((jsTx).trm(
    idxMc.srcPath.value));
  //
  switch (srcIn_Keying) {
    case (jsVar.empty):
      (idxMc.viewBase).replaceChildren();
      //
      render_ViewMd();
      //
      init_RcSrc_List();
      toggle_ResultList(true);
      //
      break;
    default:
      //
      break;
  }
}
  /** Event Feature: Input-Path - Keydown
   * @param {?} kdEvent
   * @param {() => {}} kdFunc1
   * @returns {void}
   */
function init_SearchKeyDown (
  kdEvent, kdFunc1,
) {
  const comp_UliRes = (
    (jsDoc).getId(idCo_UliRes));
  //
  switch (kdEvent.key) {
    case (`Enter`):
      refresh_ResultLists();
      //
      if (((selectIndex) >= (0)) && (
        (selectIndex) < (currentRes.length)
      )) { (currentRes[selectIndex]).click();
      } else {
        kdFunc1();
      }
      //
      break;
    case (`Escape`):
      toggle_ResultList(false);
      (idxMc.srcPath).blur();
      //
      break;
    case (`ArrowUp`):
      (kdEvent).preventDefault();
      refresh_ResultLists();
        if (!((currentRes).length)) break;
        //
      selectIndex--;
      //
      if ((selectIndex) < (0)) {
        selectIndex = ((currentRes
          .length) - (1));
      }
      //
      update_ResultSelect();
      //
      break;
    case (`ArrowDown`):
      (kdEvent).preventDefault();
      refresh_ResultLists();
        if (!((currentRes).length)) break;
        //
      selectIndex++;
      //
      if ((selectIndex) >= (currentRes.length)) {
        selectIndex = (0);
      }
      //
      update_ResultSelect();
      //
      break;
    default:
      break;
  }
}
//
  /** Finalize Processors the Features
   * @param {() => {}} iM_SrcBx_Func1
   * @returns {void}
   */
function initMix_SearchBox (
  iM_SrcBx_Func1,
) {
  const srcPath = (idxMc.srcPath);
  //
  init_SearchButton(iM_SrcBx_Func1);
    //
  (srcPath).addEventListener(
    (`keydown`), ((e) => (
      init_SearchKeyDown((e),
      (iM_SrcBx_Func1))
  )));
  (srcPath).addEventListener(
    (`input`), (() => {
      linkPath_GtSrc_LiNav();
      init_SearchInput();
  }));
}
  /** [Async] Finalize Processors the Features
   * @returns {void}
   */
export async function idxFeature_Process () {
  let
  /*|*/
    enterCooldown = (false)
    ;
  const
  /*|*/
    srcWith_Cooldown = (() => {
      mdView_SearchList_Cooldown((enterCooldown),
        ((v) => (enterCooldown = (v))),
        (render_MdFile), (noSpam_SrcTime)
    ); })
    ;
  //
  initMix_SearchBox(srcWith_Cooldown);
}
//
/**/


/* Uji Coba */
//Testing...
//
/**/


/* END */
/**/
