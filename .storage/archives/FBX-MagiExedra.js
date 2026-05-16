/*
    Name:
    FBX-MagiExedra.js 
*/

/*
|
Kronologi:
    Ada orang (haojiezhe12345) sudah bikin penampil 3D, "Magi3Dviewer".
    Dia membuat ini langsung kepada web-nya.
.
    Tetapi untuk saat ini (04/03/2026), tidak ditemukan-nya fitur yang
    mana memungkinkan untuk melakukan ngambil model secara transparan
    PNG-nya.
.
    Namun untung-nya, web ini masih bisa di-Inspect. Artinya masih ada
    cara untuk melakukan hal tersebut, tanpa perlu ngerengek atau galau
    untuk mendapatkannya.
    |
    Dengan kata lain, "kita bisa pake teknik kita sendiri".
.
    Oleh karena itu, berikut Hack pada Console, yang bisa dipake untuk
    ngambil model 3D secara transparan PNG, dan tentu saja, ini bisa
    sampe variatif. Tinggal kopas-in aja section-nya, dan gunakan pada
    tab Console di Inspect.
.
    Web Repo:
    https://github.com/haojiezhe12345/Magi3Dviewer
    |
    App Demo:
    https://magi3dviewer.haojiezhe12345.top
|
*/

/*
    Sebelum mulai, alangkah baiknya, ini dulu gak sih...
*/
console.clear();


/*
    [#] Donlot gambar transparan-PNG - Basic
    > Dasaran-nya, kurang lebih seperti ini.

    [++] Dasar yang mudah, dan gak panjang-panjang.
    Segini udah bisa bahkan ngambil versi lined-nya, serta juga
    nge-ignore BG-nya. Itu karna dia cuma ngambil model-nya aja.
    |
    [--] Gak ada metode nge-shader-nya.
*/
    /* COPY-BEGIN */
// Setup - Canvas //
const m3dv_Canvas_Bsc = ((document).querySelector("canvas"));
//
requestAnimationFrame(() => {
    // Setup - Linking nge-donlot //
    const m3dv_Link = ((document).createElement("a"));
    //
    // Namain [GANTI AJA] //
    (m3dv_Link).download = ("model.png");
    //
    // Formatting pada Canvas untuk di-donlot-kan //
    (m3dv_Link).href = ((m3dv_Canvas_Bsc).toDataURL("image/png"));
    (m3dv_Link).click();
});
    /* COPY-END */


/*
    [#] ~Donlot gambar~ Teknik edit skrinsut-an transparan-PNG - Rendered
    Gak ada cara koding yang nge-pas. Maka caranya adalah, manualis.
    Yakni:
        > Pergi ke App-Demo nya, lalu atur warna-nya (BgColor).
            $
            Default-nya (444444), ubahin aja!
            |
            [::] Contoh ngubah:
            R[0], G[200], B[0]
            Bahasanya: 00C800
            |
            G-nya bebas sih. Asal 'R' ama 'B' harus "0" aja.
            Mata sakit pake Red atau Blue, njir!
            |
            Btw, ini tuh opsional, di-himbau untuk menyesuaikannya
            dengan tekstur dari si model-nya. Agar pas ngedit untuk
            hilangin BG-nya, hasil model-nya juga gak kenak ke-edit
            sekian demikian.
            $
        > Bentar! Jangan lupa matiin animasi-nya, dan reset-in aja "ke [0]"
            alias dari awal
        > Kemudian, alihkan ke Fullscreen. Lalu skrinsut (SS).
        > Maka bukalah editor-nya (Rekomendasi: "paint.net", "PhotoShop").
        > Edit-edit dah tuh BG-nya

    [++] Teknik ini bekerja sesuai mencapai tujuan.
    |
    [--] Manualis, ambil gambar-nya menuhin storage doang, sedikit ribet lagi.

    [!] Skrip JS berikut, telah ditolak. Karena tidak
    bisa menghasilkan seperti pada tujuan-nya.
*/
    /* COPY-BEGIN (REJECTED) */
// Setup - Canvas Rendering //
import { WebGLRenderer } from "three";
//
// 1. Paksa clear alpha 0
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
const renderer = new WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
  preserveDrawingBuffer: true,
});
//
gl.clearColor(0, 0, 0, 0);
renderer.setClearColor(0x000000, 0);
//
// 2. Tunggu 2 frame supaya composer selesai render
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    //
    // 3. Capture tepat setelah render
    const link = document.createElement("a");
    link.download = "model-transparent.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
    /* COPY-END (REJECTED) */


/*
    [#] Menanti...
    > ?.

    [++] ?.
    |
    [--] ?.
*/
    /* COPY-BEGIN */
//...
    /* COPY-END */

//.
