<?php  /*
    |
    img-js.php
    public/img-js.php
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
        "name-file" => ("images.html"),
    ]) .
    buildHtml(("link"), [
        "rel" => ("stylesheet"),
        "href" => ("web/css/main-style.css"),
    ]) .
    buildHtml(("script"), [
        "type" => ("module"),
        "src" => ("web/js/images/scripting-images.js"),
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
<header
    id="header-img" class=""><h1
 class="py-5 text-2xl font-bold text-center md:text-5xl lg:text-5xl">
    Ateiler that viewing Images</h1>
</header><main id="main-img" class="flex flex-1 shadow-lg border-inherit">
    <div class="w-full text-center rounded-3xl" id="main-img-box"><div
 class="border-4 border-solid size-full border-inherit rounded-xl bg-taupe-950"
    id="main-img-content"></div></div>
</main><footer id="footer-img" class="mt-4 text-center">
    <p class="font-semibold">By:<span id="github-username">
        Git-Username</span></p>
</footer>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
