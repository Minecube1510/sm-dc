<?php  /*
|
test.php
public/test.php
|
*/
/* Imports */
require($Import_Func);
/**
 **/
    /* Auto - Compound */
$CompHead = ($empty);
//
$API = fetchApi("git-data/user");
$GitUser = (($API["GITUSER_NAME"]) ?? ("Git-Username"));
/**
 **/
    /* Control: Root */
$Title = ("SM-DC - Testing for Project");
//
$AddHead = ($CompHead);
/**
 **/
/* End */
ob_start();
/* -- */ ?>

<section
 class="m-4 min-h-[calc(100vh-2rem)] flex flex-col">
    <h1 class="mb-2 text-3xl font-bold text-center"
    id="">Testing...</h1>
<hr><!-->
<!--><?php
//*
echo ("Hello world");
//*/

//Later...

?><!-->
<!--><hr><footer id="footer-idx" class="mt-4 text-center"><p
 class="font-semibold">By:<span class="ml-1" id="github-username"><?php
    echo (htmlspecialchars(($GitUser), (ENT_QUOTES), ("UTF-8"))
); ?></span></p>
</footer></section>

<?php  /* -- */
$Body = (ob_get_clean());
//
require($Link_Direct);
