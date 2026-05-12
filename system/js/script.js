#!/usr/bin/env js
/* .system/js/script.js */

/* Imports */
import * as comp from "./compile.js";
/**/


/* Automate */
(window).addEventListener((`pageshow`), (event) => {
    if (event.persisted) { (location).reload(); }
});
//
/**/


/* Compound */
function main() {
    (comp).test();
    (comp).struct();
}
/**/


/* Display */
main();
/**/


/* END */
/**/
