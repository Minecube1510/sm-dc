<?php  /*
    |
    "img-php.php"
    "public/img-php.php"
    |
*/
    /* Imports */
require($Import_Func);
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
    /* Customs */
$ImgBox = [ "w-[200px]", "rounded-xl",
    "transition-all", "ease-in-out", "duration-200",
    //
    "cursor-pointer",
    //
    "hover:scale-105",
    "hover:[filter:drop-shadow(0_0_8px_white)]",
    //
    "active:scale-95",
    "active:[filter:drop-shadow(0_0_8px_gray)]",
];
$GridImgs = [ "grid","grid-cols-2", "gap-2",
    "px-2","py-4", "mx-auto",
    "border-4","border-solid", "size-full",
    "border-inherit","rounded-xl", "bg-taupe-950",
    //
    "place-items-center",
    //
    "sm:grid-cols-3",
    "md:px-4", "md:gap-4",
    "lg:grid-cols-5",
];

/*|
|*/
    /* Process */
$RootImg = ("img");
$PathImg = autoPath([ ($RootImg),
    ], ($empty));
$IntoFiles = scandir($PathImg);
//
function getFolders (
    array $Get,
): array {
    global $empty, $point, $dot2s,
        $RootImg
        ;
    $output = [];
    $imageExtensions = [ "png", "jpg", "jpeg",
        "gif", "webp", "bmp", "svg", ];
    //
    foreach ($Get as $File) {
        if ((($File) === ($point)) ||
            (($File) === ($dot2s))) {
            continue;
        }
        $ToFile = autoPath([
            ($RootImg), ($File),
        ], ($empty));
        //
        if ((is_dir($File))) {
            continue; }
        //
        $ScanImg = scandir($ToFile);
        //
        $images = array_filter(($ScanImg), (function ($item) use (
            $point, $dot2s, $imageExtensions
        ) {
            if ((($item) === ($point)) ||
                (($item) === ($dot2s))) {
                return false;
            }
            $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
            return in_array($ext, $imageExtensions);
        }));
        //
        $output[$File] = array_values($images);
    }
    //
    return ($output);
}
function getFiles(
    array $GetFiles,
) {
    global $empty, $IntoFiles;
    //
    $GetFiles = getFolders($IntoFiles);
    $FileRes = [];
    //
    foreach ($GetFiles as $Key => $PFs) {
        foreach ($PFs as $File) {
            $Pathed = autoPath([
                ("img"), ($Key), ($File),
            ], ($empty), (false));
            //
            $FileRes[] = ($Pathed);
    }}
    //
    return ($FileRes);
}

$GetFiles = getFiles($IntoFiles);
//var_dump ($GetFiles);
/*|
|*/
    /* Compound */
$CompImg = (function ($Src) use ($ImgBox) {
    return (buildHtml(("a"), [
            "href" => ($Src),
            //"target" => ("_blank"),
        ], buildHtml(("img"), [
            "src" => ($Src),
            "draggable" => ("false"),
            "class" => autoClass($ImgBox),
        ])
    ));
});
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
 class="<?= autoClass($GridImgs); ?>"
    id="main-img-content"><?php
    //
foreach ($GetFiles as $Src) {
    echo ($CompImg($Src));
}
?></div></div>
</main><footer id="footer-img" class="mt-4 text-center">
    <p class="font-semibold">By:<span id="github-username">
        Git-Username</span></p>
</footer>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
