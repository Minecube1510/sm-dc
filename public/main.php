<?php  /*
  |
  body.php
  stack/build/body.php
  |
*/
/* Imports */
require($Import_Func);
/**
 **/
  /* Auto - Compound */
$CompHead = (
  buildHtml(("meta"), [
    "charset" => ("UTF-8"),
    "name-file" => ("index.html"),
  ]) .
  //
  buildHtml(("link"), [
    "rel" => ("stylesheet"),
    "href" => ("web/css/main-style.css"),
  ]) .
  buildHtml(("link"), [
    "rel" => ("stylesheet"),
    "href" => ("https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown.min.css"),
  ]) .
  //
  buildHtml(("script"), [
    "type" => ("module"),
    "src" => ("web/js/index/scripting-index.js"),
    "defer" => (true),
  ])
);
/**
 **/
  /* Control: Root */
$Title = ("SM-DC - Main Project");
//
$AddHead = ($CompHead);
//
$API = fetchApi("git-data/user");
$GitUser = (($API["GITUSER_NAME"]) ?? ("Git-Username"));
/**
 **/
  /* Customs */
$BodyCls = autoClass([ ("flex"),
  ("container"), ("flex-col"),
  //
  ("min-h-screen"),
  ("p-3"), ("mx-auto"),
  //
  ("select-none"),
]);
/**
 **/
$ChipperCls = autoClass([ ("flex"),
  ("absolute"), ("items-center"),
  ("ease-in-out"),
  //
  ("inset-0"), ("gap-1"), ("opacity-0"),
  ("duration-200"),
  //
  ("pointer-events-none"),
]);
/**
 **/
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
  id="idx-rc-geartool" class="transition-colors duration-200"><div
 class="relative flex items-center justify-center gap-2 p-2 text-center rounded-lg size-full comp-smooth"
  id="idx-rcgt-lever">
    RP | PF</div><div
  id="idx-rcgt-linav"
 class="flex-none w-full col-span-2 row-start-2 rounded-lg comp-smooth">
  <input type="text" value="" data-value="" placeholder="Path/Folder/File.formatted"
 class="px-3 py-2 font-semibold size-full text-start focus:outline-none" id="idx-rcgt-linav-comp"
  readonly></div><div
 class="relative flex items-center justify-center p-2 text-center rounded-lg size-full group comp-smooth"
  id="idx-rcgt-select">
    Select \V/</div>
  </div><div id="idx-rc-search"
 class="relative flex items-center py-2 rounded-lg comp-smooth"><span
 class="inline-flex items-center px-3 font-black" data-path-root="/" id="idx-rcsc-root">/</span><div
 class="relative flex-1 h-full"
  id="idx-rcsc-editor"><div
 class="<?php echo ($ChipperCls); ?>"
  id="idx-rcsc-chips" aria-label="Path segments"></div><input
 class="duration-200 ease-in-out comp-smooth focus:outline-none size-full" autocomplete="off" aria-label="View"
  spellcheck="false" type="text" id="idx-rcsc-input" value="" data-value=""
  placeholder="Type the MD document name at here"><div
 class="absolute inset-x-0 flex items-center max-w-full gap-1 p-2 mx-auto my-2 rounded-lg z-999 theme-smooth"
  id="idx-rcsc-result"></div></div><button type="button" aria-label="Search"
 class="flex items-center justify-center mx-2 border cursor-pointer size-6" id="idx-rcsc-btn" value="">
  </button></div><div class="flex items-center gap-2"
  id=""><input id="test-searcher"
  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  type="checkbox"><label for="test-searcher"
 class="font-semibold italic">Use for can testing the search
  </label></div></div><hr class="border-2"><div
 class="relative flex flex-1 my-4 overflow-hidden border-2 rounded-lg bg-gray-950 comp-smooth"
  id="idx-view"><div class="" id="idx-view-loading"></div><article
 class="flex-1 p-4 m-0 bg-transparent rounded-lg min-w-0 min-h-0 overflow-auto markdown-body"
  id="idx-view-content"></article></div><hr class="border-2">
</main><footer id="footer-idx" class="mt-4 text-center">
  <p class="font-semibold">By:<span class="ml-1"
  id="github-username"><?php echo (htmlspecialchars(
    ($GitUser), (ENT_QUOTES), ("UTF-8"))
); ?></span></p>
</footer>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
