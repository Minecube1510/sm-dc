#!/usr/bin/env js
/* web/js/index/idx-blueprint-1.js */

/* Imports */
import { jsVar, jsMod,
  jsTx, jsCs, jsDoc, jsHt,
  } from "../basis.js";
//
import * as idxStrg from "./idx-storage.js";
  import {
    reaState,
    //
    idx_RcLang as rcLn,
    //
    idxSearchMD_CompId as iScMd,
    gtComponter as comperGt,
    //
  } from "./idx-storage.js";
//
import { mdVi_Searching as mdSrc } from "./idx-process.js";
//
/**/

/* Initialize - Helpers */
export const
  idx_CompText = ((tick) => {
    //
  let map_ComTrim = {
    md_Err: (`404 - Markdown Not Found`),
    md_Plh: (`Preview-ing the Markdown-Document-File`),
  };
  return (
    tick in map_ComTrim
    ? ((jsTx).trm(map_ComTrim[tick]))
    : (undefined)
  );
}),
  idx_MdStator = ((tick, val) => {
    //
  let map_State = {
    iS: (`isSearching`),
    lST: (`lastSearchText`),
    lLR: (`lastLoggedReason`),
  };
  tick = ((map_State[tick]) ?? (tick));
  //
  if ((val) !== (undefined)) {
    mdCond_State[tick] = (val);
  }
  return (
    tick in mdCond_State
      ? (mdCond_State[tick])
      : (mdCond_State)
  );
});
//
let mdCond_State = {
  isSearching: (false),
  lastSearchText: (jsVar.empty),
  lastLoggedReason: (jsVar.empty),
};
//
/**/

/* Comp-Struct - View */
/** Basically MD-Placeholder
 * @param {string} ph_Texting
 * @returns {void}
 */
export function mdVi_PlaceHolder (
  ph_Texting,
) {
  let placeHolder = ((jsMod).setElm(
    (jsDoc).createElm(`div`), {
      className: ((jsHt).classer(
        idxStrg.mdVi_Ph_Cls)),
      textContent: (ph_Texting),
    },
  ));
  //
  (iScMd).content
    .replaceChildren(placeHolder);
}
/** MD-Placeholder as Error-404
 * @param {string} ph
 * @returns {void}
 */
export function mdViPh_404 (
  placeholder_404
) {
  mdVi_PlaceHolder((jsTx)
    .trm(placeholder_404));
}
//
/**/

/* Comp-Struct - Search */
  /** [Async] MD-Viewer Config for Searchs
   * @returns {Promise<boolean>}
   */
async function cfg_mdVi_Search () {
  const getInput = ((jsDoc).getId(comperGt.cElmIn));
    // { ((jsDoc).getId(comperGt.cElmIn)) } OR { (iScMd.ftSrch.value) }
  const srcText = ((getInput.value) || (jsVar.empty));
  //
  switch (true) {
    case (!(srcText)):
    case (idx_MdStator(`iS`)):
    case ((srcText) === (idx_MdStator(`lST`))):
      return (false);
  }
  idx_MdStator((`iS`), (true));
  idx_MdStator((`lST`), (srcText));
  //
  return (true);
}
  /** [Async] MD-Viewer Features: Searching
   * @returns {Promise<void>}
   */
export async function mdView_Search () {
    if (!(await cfg_mdVi_Search())) return;
  try {
    const get_ReSrc = (await mdSrc(
      idx_CompText(`md_Plh`)));
    if (!((get_ReSrc)?.ok)) {
      const msg = ((get_ReSrc)?.reason?.msg);
      switch (msg) {
        case (reaState.md_n_fnd.msg):
          mdViPh_404(idx_CompText(`md_Err`));
          //
          (jsCs).log(get_ReSrc);
          return;
        case (reaState.chc_n_fnd.msg):
          mdViPh_404(idx_CompText(`md_Err`));
          //
          (jsCs).log(get_ReSrc);
          //
          return;
        case (reaState.error.msg):
          mdViPh_404(idx_CompText(`md_Err`));
          return;
        case (reaState.pndg.msg):
          return;
        default:
          mdViPh_404(idx_CompText(`md_Err`));
          //
          (jsCs).log(get_ReSrc);
          //
          return;
      }
    }
    (jsCs).log(get_ReSrc);
  } finally {
    idx_MdStator((`iS`), (false));
  }
}
//
/**/

/* Activate */
  /** Markdown-Viewer Classingers
   * @returns {void}
   */
function mdVi_Classing () {[
  //
    [ (iScMd.idxView), (idxStrg.idxView_Cls), ],
    [ (iScMd.idxSrch), (idxStrg.mdVi_InputPls_Cls), ],
    [ (iScMd.inRoot), (idxStrg.mdVi_InputRoot_Cls), ],
    [ (iScMd.ftSrch), (idxStrg.mdVi_InputDef_Cls), ],
    [ (iScMd.srChip), (idxStrg.mdSrch_Sacker_Cls), ],
  //
  ].forEach(([elm, cls,]) => ((elm)
    .classList.add(...cls)));
}
mdVi_Classing();
//
/**/

/* END */
/**/
