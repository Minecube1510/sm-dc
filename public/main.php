<?php  /*
|
"body.php"
"stack/build/body.php"
|
*/
/* Imports */
require($Import_Func);
/*|
|*/
/* Auto - Compound */
/*|
|*/
/* Control: Root */
$Title = ("SM-DC - Main Project");
//
$CompHead = (
   buildHtml(("meta"), [
      "charset" => ("UTF-8"),
      "name-file" => ("index.html"),
   ]) .
   buildHtml(("link"), [
      "rel" => ("stylesheet"),
      "href" => ("web/css/main-style.css"),
   ]) .
   buildHtml(("script"), [
      "type" => ("module"),
      "src" => ("web/js/index/scripting-index.js"),
      "defer" => (true),
   ])
);
$AddHead = ($CompHead);
/*|
|*/
/* Customs */
$BodyCls = autoClass([
   "container", "flex", "flex-col",
    //
   "min-h-screen",
   "p-3", "mx-auto",
    //
   "select-none",
]);
/*|
|*/
/* End */
ob_start();
/* -- */  ?>

<!-- Body: Contents -->
<header class=""
id="header-idx"><h1 class="py-5 text-2xl font-bold text-center md:text-5xl lg:text-5xl">
   MD Previewer<br>
   (Under Development)</h1>
</header><main id="main-idx" class="flex flex-col flex-1">
   <hr class="border-2"><div class="grid my-4 gap-y-4"
   id="idx-remocon"><div class="grid grid-cols-2 gap-4 text-sm font-semibold"
   id="idx-rc-geartool"><div
 class="relative flex items-center justify-center gap-2 p-2 text-center rounded-lg size-full into-smooth"
   id="idx-rcgt-lever">
      RP | PF</div>
   <div id="idx-rcgt-linav"
 class="flex-none w-full col-span-2 row-start-2 rounded-lg into-smooth">
   <input type="text" value="" data-value="" placeholder="Path/Folder/File.formatted"
 class="px-3 py-2 font-semibold size-full text-start focus:outline-none" id="idx-rcgt-linav-comp"
   readonly></div><div
 class="relative flex items-center justify-center p-2 text-center rounded-lg size-full group into-smooth"
   id="idx-rcgt-select">
      Select \V/</div>
   </div><div id="idx-rc-search"
 class="relative flex items-center py-2 rounded-lg into-smooth"><span
 class="inline-flex items-center px-3 font-black" data-path-root="/" id="idx-rcsc-root">/</span><div
 class="relative flex-1 h-full" id="idx-rcsc-editor"><div
 class="absolute inset-0 flex items-center gap-1 duration-200 ease-in-out opacity-0 pointer-events-none"
   id="idx-rcsc-chips"></div><input
 class="duration-200 ease-in-out focus:outline-none size-full" autocomplete="off" aria-label="View"
   spellcheck="false" type="text" id="idx-rcsc-input" value="" data-value=""
   placeholder="Type the MD document name at here"><div
 class="absolute inset-x-0 flex items-center max-w-full gap-1 p-2 mx-auto my-2 rounded-lg z-999 theme-smooth"
   id="idx-rcsc-result"></div></div><button type="button" aria-label="Search"
 class="flex items-center justify-center mx-2 border cursor-pointer size-6" id="idx-rcsc-btn" value="">
   </button></div></div><hr class="border-2"><div
 class="relative flex flex-1 my-4 overflow-hidden border-2 rounded-lg bg-gray-950 into-smooth"
   id="idx-view"><div class="" id="idx-view-loading"></div><article
 class="flex-1 p-4 m-0 bg-transparent rounded-lg markdown-body"
   id="idx-view-content"></article></div><hr class="border-2">
</main><footer id="footer-idx" class="mt-4 text-center">
   <p class="font-semibold">By:<span id="github-username">
      Git-Username</span></p>
</footer>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
