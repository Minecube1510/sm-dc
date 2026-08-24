<?php  /*
|
images.php
public/images.php
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
        "name-file" => ("images.html"),
    ]) .
    //
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
//
$API = fetchApi("git-data/user");
$GitUser = (($API["GITUSER_NAME"]) ?? ("Git-Username"));
/**
 **/
/* Control: Root */
$Title = ("SM-DC - Main Project");
//
$AddHead = ($CompHead);
/**
 **/
/* Customs */
$BodyCls = autoClass([ "flex",
    "container", "flex-col",
    //
    "min-h-screen",
    "p-3", "mx-auto",
    //
    "select-none",
]);
/**
 **/
/* Customs */
$ImgBox = [
    "w-full", "max-w-full", "h-auto", "rounded-xl",
    "transition-all", "ease-in-out",
    "duration-200",
    //
    "cursor-pointer",
    //
    "hover:scale-105",
    "hover:[filter:drop-shadow(0_0_8px_white)]",
    //
    "active:scale-95",
    "active:[filter:drop-shadow(0_0_8px_gray)]",
];
$GridImgs = [ "grid", "grid-cols-1",
    "gap-2",
    //
    "px-2","py-4", "mx-auto",
    //
    "size-full",
    "border-4","border-solid","border-inherit", "rounded-xl",
    "bg-taupe-950",
    //
    "place-items-center",
    //
    "sm:grid-cols-3",
    "md:px-4", "md:gap-4",
    "lg:grid-cols-5",
];
/**
 **/
/* Process */
$RootImg = ("img");
$PathImg = autoPath([
    ($RootImg),
], ($empty));
$IntoFiles = auto_ScanDir($PathImg);
//
function getFolders (
    array $GetFolders,
): array {
    global $empty, $RootImg
        ;
    $output = [];
    $imageExtensions = [
        "png", "jpg", "jpeg", "gif", "webp", "bmp", "svg",
    ];
    //
    foreach ($GetFolders as $File) {
        $ToFile = autoPath([ ($RootImg), ($File),
            ], ($empty));
                //
            if (is_dir($File)) continue;
            //
        $images = array_filter((auto_ScanDir($ToFile)),
        static function ($item) use ($imageExtensions) {
            return (in_array(strtolower(pathinfo(($item),
                (PATHINFO_EXTENSION))), ($imageExtensions)));
        });
        $output[$File] = array_values($images);
    }
    //
    return ($output);
}
function getFiles (
    array $GetFiles,
) {
    global $empty,
        $RootImg, $IntoFiles
        ;
    $FileRes = [];
    $GetFiles = getFolders($IntoFiles);
    //
    foreach ($GetFiles as $Key => $PFs) { foreach ($PFs as $File) {
        $FileRes[] = autoPath([ ($RootImg),
            ($Key), ($File)], $empty, false);
    }}
    //
    return ($FileRes);
}
//
$GetFiles = getFiles($IntoFiles);
/**
 **/
    /* Final - Compound */
$CompImg = (function ($Src) use ($ImgBox) {
    global $RootImg
        ;
    return (buildHtml(("a"), [
        "href" => ($Src),
        //"target" => ("_blank"),
    ], buildHtml(($RootImg), [
            "src" => ($Src),
            "draggable" => ("false"),
            "class" => autoClass($ImgBox),
    ])));
});
/**
 **/
/* End */
ob_start();
/* -- */ ?>

<!-- Body: Contents -->
<header id="header-img" class="w-full">
    <h1 class="py-5 text-2xl font-bold text-center md:text-5xl lg:text-5xl">
        Ateiler that viewing Images</h1>
</header><main id="main-img"
 class="flex flex-col flex-1 w-full shadow-lg border-inherit">
    <div class="w-full text-center rounded-3xl"
    id="main-img-box"><div class="<?= autoClass($GridImgs); ?>"
    id="main-img-content"><?php
foreach ($GetFiles as $Src) {
    echo ($CompImg($Src));
} ?></div></div>
</main><footer
id="footer-idx" class="w-full mt-4 text-center">
<p class="font-semibold">By:<span class="ml-1"
id="github-username"><?php  
    echo (htmlspecialchars(($GitUser),
        (ENT_QUOTES), ("UTF-8"))
); ?></span></p>
</footer>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
