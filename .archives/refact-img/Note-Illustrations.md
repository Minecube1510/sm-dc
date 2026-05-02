<!--
---

Doc_Article: Assets

---
-->

---

# Catatan Ilustrasi

Seperti namanya (nama folder dan nama dari nota MD ini), bahwa folder ini adalah isi dari sekitar atau lebih dari **5.616** Sampel yang tersimpan disini.

---

Terdapat 2 standar wajib yang dapat menjadi panduan untuk menentukan aset-aset yang berkualitas terhadap perdataan.

- **Standar Hierarki**
- **Standar Format**

## Standar Hierarki dari hasil file per-aset-an

Standar Hierarki adalah, standar untuk file aset yang sudah lolos dari sekian selurruh poin-poin persyaratan.  
Poin-poin persyaratan dari Standar Hierarki adalah:

### A. File gambar merupakan "transparan dari latar belakang" secara *clear*

```txt
Artinya, gambar mesti "No-Background" sama sekali.
Untuk kasus ini, format PNG adalah yang paling dapat melakukannya.

Maka, default format-an Standar Hierarki adalah file "PNG".
```

```txt
Dengan menggunakan Metadata:
WebP Flags : XMP, Alpha

Tekniknya:
- Cek Alpha untuk mencari yang merupakan kemungkinan sudah transparent-background.
```

### B. File gambar juga gak pecah-pecah gambarnya entah pada ini dan itu

```txt
Dijelasin, gambar-nya itu harus sekelas kayak "HQ 4K-an" lah.
```

```txt
Dengan menggunakan Metadata:
[Tidak diketahui]

Jangan mengandalkan "Image Height", bahkan "Image Width".
```

### C. File gambar yang memiliki "objek" (karakter, entitas, makhluk, atau apa lah itu) merupakan sesuai tampakan penuh-nya

```txt
Dalam artian, gambar-nya merupakan karakter yang "full body". 
Si "objek", itu gak cuma atas se-torso, ataupun cuman kepala doang kayak foto KTP-an.
```

```txt
Dengan menggunakan Metadata:
[Tidak diketahui]

Tapi yang pasti, standar pertama default-nya:
- "height >> width"
|
Alasan: Karna standar full body, diterapkan dalam bentuk Portrait.
```

Setelah mengenali poin-poin tersebut, berikut kelas-kelasnya, yang terbagi atas meliputi hal-hal berikut:

> - *Ini terutama untuk aset-aset yang berupa bentuk default-nya, yakni seperti gambar-gambar*.  
> - Jika file merupakan sebuah GIF (gambar animasi bergerak), maka skip saja Standar Hierarki ini untuk itu.

- **Perfect**: File Aset telah memenuhi semua poin-poin di atas.
- **Great**: File Aset telah memenuhi sekiranya hanya 2 dari poin-poin di atas.
- **Common**: File Aset telah memenuhi setidaknya hanya 1 saja poin-poin di atas.
- **Burik**: File Aset tidak dapat memenuhi seluruh poin-poin di atas.

> Pada tingkat **Perfect**, metadata gambar sepertinya secara tidak langsung, harus wajib merupakan ***Extended WEBP***.

## Standar Format File per-aset-an

Dari berbagai percobaan ini dan itu, maka standar ini dibentuk sebagai bentuk dari pembelajaran, dari berbagai percobaan-percobaan demikian, yang mana semoga tidak terjadi akan hal yang tidak diinginkan.

Maka dari itu, plis banget deh! Untuk tiap dari aset-aset ini semua, harus mengikuti standar sebagai berikut.

### Format File sebagai berikut

```txt
Penetapan Final:
[Nomor_ID_Sampel]-[Index_BTC]-[Deskripsi_Nama_Wujud_Sampel]

Peletakan Sementara:
[Index_BTC, ada kasih "X"/"?" bilamana belum dipastikan]-[Deskripsi_Nama_Wujud_Sampel]
```

### Ketetapan Syaratan File

- Seluruh file disini, wajib default-nya tipe WEBP.

```txt
Format Default (Wajib):
.[format_file_gambar, "PNG"]
.[format_file_gambar, "GIF"]

Tipe-nya:
- WEBP: PNG, GIF
```

- Tiap WEBP itu berbeda-beda. Gambar-nya bisa gerak/ter-animate, ada yang cuma diem gambar aja.

> Yang cuma diem gitu aja, itu udah pasti ngarah ke PNG.  
> Kalo dia ternyata gak diem (yakni ke-animate), dia ngarah-nya ke GIF.

### Larangan menamai file

Karena sudah melalu berbagai percobaan ini dan itu, berikut adalah larangan dari tiap-tiap yang telah diketahui:

{-} Nama file tidak boleh ada ***"!"***. Soalnya nanti pas proses di-cek sama terminal, dapat berpotensi akan error.
{-} Nama file dilarang ada ***" "***, nanti juga bisa error pas di-cek ama terminal.
{=} Maka, nama file jika ada pembatasan, bisa menggunakan seperti ***"_"*** atau ***"-"***.

## Penutpan

Jangan lupa pula, tolong...  
**Deskripsiin namanya yang bener!**

---

Yaudah, gitu aja sih.

---
