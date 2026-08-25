<?php  /* Start */
/* web/php/page.php */

/* Vars */
//Later...
//
/**/


/* Func */
//TODO: Minifyzing all CSS and JS...
//
/**/


/* Route */
switch ($path) {
    /* Display mau ke halaman mana */
    case ($empty):
    case ("direct"):
        require(shortLink("public/direct"));
        break;
    //
    case ("test"):
        require(shortLink("public/test"));
        break;
    /*|
    |*/
    case ("main"):  /* Halaman: Project Utama */
        require(shortLink("public/main"));
        break;
    /*|
    |*/
    case ("api"):
        //?
        break;
    /*|
    |*/
    case ("images"):  /* Halaman: Gudangan file Gambar-Gambar */
        require(shortLink("public/images"));
        break;
}
//
/**/


/**
 *
case ("img-js"):  /|* Halaman: Gudangan file Gambar-Gambar *|/
    require(shortLink("public/img-js"));
    break;
 *
 */


/* END */
