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
  //
import { 
  init_SearchButton,
  init_SearchInput,
  init_SearchKeyDown,
  //
  } from "./idx-system-config.js";
  //
import * as idxSysF from './idx-system-fetch.js';
import {
  limit_Fetch_Files,
  shuffle_Random_Files,
    //
  random_LiSeeder_Files,
  //
  idx_RpList as rp_Lists,
    //
  idx_10TriaLists as triaLists,
  //
  } from "./idx-system-fetch.js";
//
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
//
export const
/*|*/
srcSt = {
  selectIndex: (-1),
  hoverIndex: (-1),
    //
  srControl: (idxStrg.str_Kb),
  //
  currentRes: [],
};
;
/**/


/* Features - Function */
  /** [Async] Rendering Markdown Files
   * @returns {void}
   */
export async function ft_Render_MdFile () {
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
export function kit_Get_ResLists () {
  const proLists = [ ...((src_Res)
    .querySelectorAll(`li`)), ];
  return (proLists);
}
  //
  /** Refreshes the cached search result list.
   * @returns {void}
   */
export function kit_Refresh_ResLists () {
  (srcSt).currentRes = kit_Get_ResLists();
}
  /** Updates the highlighted index.
   * @returns {void}
   */
export function kit_Update_RestSel () {
  const
    actIndex = (((srcSt.srControl
      ) === (idxStrg.str_Ms))
      ? (srcSt.hoverIndex)
      : (srcSt.selectIndex)
    ),
    //
    resLi_Items = (srcSt.currentRes),
    resLi_Activate = (resLi_Items[actIndex]),
      //
    resLi_MainText = ((resLi_Activate)?.textContent),
    //
    phComp_ResLi = (idxMc.srcPath.placeholder),
    linav_GtPath = (idxMc.gtNavC.value)
    ;
  //
  (resLi_Items).forEach((li, i) => {
    const
      isSelected = ((i) === (
        srcSt.selectIndex))
      ;
    ldmClasser((li),
      (srcList_LiClick_LdmCls.lights),
      (srcList_LiClick_LdmCls.darks),
    );
    //
    (li).setAttribute(
      (`aria-selected`), (`false`));
    //
    (li).classList.remove(
      ...(srcList_LiRowed_LdmCls.lights),
      ...(srcList_LiRowed_LdmCls.darks),
    );
    //
    if (
      ((srcSt.srControl) === (idxStrg.str_Kb)) ||
      (!((srcSt.srControl) === (idxStrg.str_Ms)))
    ) {
      (li).classList.remove(
        ...(srcList_LiClick_LdmCls.lights),
        ...(srcList_LiClick_LdmCls.darks),
      );
    }
    //
    if (isSelected) { ldmClasser((li),
      (srcList_LiRowed_LdmCls.lights),
      (srcList_LiRowed_LdmCls.darks),
    ); }
  });
  //
  if (resLi_Activate) {
    (resLi_Activate).setAttribute(
      (`aria-selected`), (`true`));
    //
    (resLi_Activate).scrollIntoView({
      behavior: (`smooth`),
      block: (`nearest`),
    });
  }
  //
  [
    [ (idxMc.srcPath), { placeholder: (
      (resLi_MainText) ?? (phComp_ResLi)), },
    ], [ (idxMc.gtNavC), { value: (
      (resLi_MainText) ?? (linav_GtPath)), },
    ],].forEach(([el, props,]) => {
      //
      (jsMod).setElm(el, props);
  });
}
//
  /** Select methods a search result item.
   * @param {boolean} tCoolDown
   * @param {HTMLLIElement} seList
   * @returns {void}
   */
export function unit_Select_ResItem (
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
  (srcSt).selectIndex = (-1);
  (srcSt).currentRes = [];
  //
  linkPath_GtSrc_LiNav();
  mdView_SearchList_Cooldown((tCoolDown),
    ((v) => (tCoolDown = (v))),
    (ft_Render_MdFile), (noSpam_SrcTime),
  );
}
//
/**/


/* Feature - Gathering */
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
      init_SearchInput(idxMc.srcPath);
  }));
}
//
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
        (ft_Render_MdFile), (noSpam_SrcTime));
    })
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
