<?php  /*
    |
    direct.php
    public/direct.php
    |
*/
/* Imports */
require($Import_Func);
/*|
|*/
/* Control: Root */
$links = [
    "main" => [
        "label" => "Main",
        "description" => "Projek utama.",
        "url" => "main"
    ],
    //
    "images" => [
        "label" => "Images (PHP)",
        "description" => "{PHP} - Simpenan file gambar-gambar.",
        "url" => "images"
    ],
];
/*  "img-js" => [
    "label" => "Images (JS)",
    "description" => "{JS} - Simpenan file gambar-gambar.",
    "url" => "img-js"
],  // */
/**
 **/
/* Control: Root */
$Title = ("Sample Memory - Data Center");
//
$AddHead = ($empty);
//
$API = fetchApi("git-data/user");
$GitUser = (($API["GITUSER_NAME"]) ?? ("Git-Username"));
/**
 **/
/* Customs */
$BodyCls = ($empty);
$Link_ClsDir = autoClass([ "block",
    "w-full", "p-4",
    "transition-colors", "duration-200",
    //
    "rounded-lg",
    // "border", "border-slate-200", "bg-slate-50",
    //
    "hover:border-sky-300",
    "hover:bg-sky-50",
]);
/**
 **/
/* End */
ob_start();
/* -- */  ?>

<!-- Body (As Secion) -->
<section
 class="flex items-center justify-center w-full min-h-screen px-4 py-10 "
id=""><div id="dir-container"
 class="w-full max-w-full p-5 mx-auto shadow-sm rounded-xl md:max-w-2xl">
<!--!-->
<header id="header-idx" class="pb-4 mb-6 border-b"><p class="text-sm font-medium">
    Navigation</p><h1 class="mt-1 text-2xl font-bold">
    Display</h1>
</header><main id="main-idx"
 class=""><ul class="space-y-3" id="dir-lists"><?php
foreach ($links as $link): ?><li><a
    href="<?= ($link["url"]); ?>" class="<?= ($Link_ClsDir); ?>"><div
 class="text-lg font-semibold break-words"><?=
    ($link["label"]); ?></div><p
 class="mt-1 text-sm leading-6 break-words"><?=
    ($link["description"]); ?></p><div
 class="mt-3 text-sm font-medium text-sky-600">
    Go to the Page</div></a></li><?php
endforeach; ?></ul><div class="mt-4"
    id=""><a href="test"
 class="flex items-center justify-center font-bold"
    id="">For Testing...
</a></div>
</main><footer id="footer-idx" class="mt-4 text-center">
    <hr class="mb-1"><p class="font-semibold">By:<span class="ml-1"
    id="github-username"><?php echo (htmlspecialchars(
        ($GitUser), (ENT_QUOTES), ("UTF-8"))
); ?></span></p>
</footer>
<!--!-->
</div></section>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
