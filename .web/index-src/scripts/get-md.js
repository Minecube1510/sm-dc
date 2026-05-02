/*
/
    index-src/scripts/get-md.js
/
*/

/* Basic Formula */
const f_MD = ((`md`).toLowerCase())
//


/* MD: GET */
export function forming_MD (name) {
    return ([name, f_MD].join(`.`));
}
//
export function thisGet_MD (name) {
    const toGet_MD = (`../${forming_MD(name)}`);
    //
    return (toGet_MD);
}
export function indexGet_MD (name) {
    const toGet_MD = (`${forming_MD(name)}`);
    //
    return (toGet_MD);
}


/* Uji Coba */
//.


//-//
