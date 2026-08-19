<?php  /*
|
"direct.php"
"public/direct.php"
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
    "img-php" => [
        "label" => "Images (PHP)",
        "description" => "{PHP} - Simpenan file gambar-gambar.",
        "url" => "img-php"
    ],
    "img-js" => [
        "label" => "Images (JS)",
        "description" => "{JS} - Simpenan file gambar-gambar.",
        "url" => "img-js"
    ],
];
/**
 **/
/* Control: Root */
$Title = ("Sample Memory - Data Center");
//
$AddHead = ($empty);
/**
 **/
/* Customs */
$BodyCls = ($empty);
$Link_ClsDir = autoClass([ "block",
    "w-full", "p-4",
    "transition",
    //
    "border", "rounded-lg",
    // "border-slate-200", "bg-slate-50",
    //
    "hover:border-sky-300",
    "hover:bg-sky-50",
]);
/*|
|*/
/* End */
ob_start();
/* -- */  ?>

<!-- Body (As Secion) -->
<section
 class="flex items-center justify-center min-h-screen px-4 py-10"><div
 class="w-full max-w-2xl p-5 mx-auto border shadow-sm rounded-xl">
<!--!-->
<header class="pb-4 mb-6 border-b"><p class="text-sm font-medium">
    Navigation</p><h1 class="mt-1 text-2xl font-bold">
    Display</h1>
</header><main
 class="into-smooth"><ul class="space-y-3"><?php
foreach ($links as $link): ?><li><a
    href="<?= ($link["url"]); ?>" class="<?= ($Link_ClsDir); ?>"><div
 class="text-lg font-semibold break-words theme-smooth"><?=
    ($link["label"]); ?></div><p
 class="mt-1 text-sm leading-6 break-words theme-smooth"><?=
    ($link["description"]); ?></p><div
 class="mt-3 text-sm font-medium text-sky-600">
    Go to the Page</div></a></li><?php
endforeach; ?></ul>
</main>
<!--!-->
</div></section>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
