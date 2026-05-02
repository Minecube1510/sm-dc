/*
/
    index-src/scripts/func.js
/
*/

/* Imports */
import * as jsVar
    from "./var.js";


/* Functions */
export function js_GetId (id) {
    return ((document).getElementById(id));
}
//
export function draw_Html (elName,
    attr = [], content = null
) {
    /* Set Element */
    const splitter = ("::");
    //
    const get_Elm = ((elName).trim().toLowerCase());
    const get_Attr = ((attr).map(item => {
        if (!((item).includes(splitter))) {
            throw new Error(`Attr "${item}" should be "name::value"`);
        }
        const [key, value] = ((item).split(splitter));
        //
        if ((!(key)) || (!(value))) {
            throw new Error(`Wrong Formatted: "${item}"`);
        }
        //
        return (`${key}="${value}"`);
        }).join(jsVar.js_Space));
    //
    return ((((get_Attr).length) > (0))
        ? (`<${get_Elm} ${get_Attr}>${content}</${get_Elm}>`)
        : (`<${get_Elm}>${content}</${get_Elm}>`)
    );
}


/* Uji Coba */
//.


//-//
