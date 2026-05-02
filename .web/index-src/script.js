/*
/
    index-src/script.js
/
*/

/* Imports */
import * as jsFunc
    from "./scripts/func.js";
import * as jsVar
    from "./scripts/var.js";
//
import * as get_MD
    from "./scripts/get-md.js";


/* Setup */
    // Isi Konten MD //
const content_MD = ((jsFunc).js_GetId("check-md"));
//
    // Section Link MD //
const mdc_Input = ((jsFunc).js_GetId("mdc-to-search"));  // Input
const mdc_Btn = ((jsFunc).js_GetId("mdc-to-check"));  // Button
//
const mdc_Ceklink = ((jsFunc).js_GetId("mdc-ceklink"));  // Ngecek link-nya


/* Execute */
function check_File_MD () {
    /* Act: Check */
    const file_md = ((mdc_Input).value.trim());
    if (!(file_md)) {
        //console.log("Nor the MarkDown file...");
        return;
    }
    //
    const warn_formatting = (`Should not used formatted.`);
    const formatted_MD = (
        ((file_md).includes(jsVar.js_Spot)) &&
        (((file_md).split(jsVar.js_Spot).pop().length) > (0))
    )
    //
    const getFile = ((get_MD).thisGet_MD(file_md));
    if (
        (!(getFile)) ||
        (getFile) === (jsVar.js_Blank)
    ) {
        console.log("File is Empty OR Not-Valid.");
        return;
    }

    /* Act: Execute */
    const err_2 = (`Markdown File is Not-Found 404`);
    //
    fetch(getFile)
    .then(res => {
        if (!((res).ok)) {
            throw new Error(err_2);
        }
        return ((res).text());
    })
    .then(md => {
        (mdc_Ceklink).innerHTML = ((jsFunc)
        .draw_Html(("a"), [(`target::_blank`), (`draggable::false`),
            (`class::mdc-link`), (`href::${getFile}`),
        ], (`${file_md}.md`)));
        //
        (content_MD).innerHTML = ((marked).parse(md));
        if ((window).MathJax) {
            MathJax.typesetPromise().catch(
                err => console.error(err)
            );
        }
    })
    .catch(err => {
        //console.error(err);
        //
        /* text-red-600 */
        (mdc_Ceklink).style.color = ("var(--tw-red-600)");
        //
        const msg_Forming = ((formatted_MD)
            ? (`${warn_formatting}`)
            : (`${err_2}`));
        (mdc_Ceklink).innerHTML = (msg_Forming);
        //
        (content_MD).innerHTML = (jsFunc)
            .draw_Html(("p"), [
                (`class::mdc-err`),
            ], ((formatted_MD)
            ? (`${warn_formatting}`)
            : (`${err.message}`)));
    });
}


/* Execute */
function exc_Check_MD () {
    (mdc_Btn).addEventListener(("click"), (check_File_MD));
    (mdc_Input).addEventListener(("keydown"), (e) => {
        if (((e).key) === ("Enter")) {
            check_File_MD();
        }
    });
}


/* Uji Coba */
//check_Address_MD ();
//
exc_Check_MD ();


//-//