<!--
---

Doc_Article: Record

---
-->

---

# {{ Nge-EXIF MD-an }}

Menanti...

```py
- [REJECTED]
exiftool -config .sys/exif-md_basis.config -overwrite_original \
-XMP-Doc_Basis:Article="Assets / Entry_Doc / Record" \
FILE_NAME.md

# python .sys/md-check.py
```

<!--
    "XMP:Doc_Basis"
    Article
    (Assets/Entry_Doc/Record)

    ?
-->
<!--
    "XMP:Entry_Doc"

    [1]
    Doc_Topic
    (Generic/Report/Sample)

    [2]
    For_Bunch
    For_Type
    For_Cattegory

    [3 (Sample)]
    Syndicate
-->

---

> *Jangan lupa juga, setiap pertama kali file text (terutama MD), harus ada di taruh dulu di tempat yang telah disediakan.*
>
> - "*/.storage*"

---

## Pengakhiran

/Menanti.../

Selain itu, jangan lupa pula...

**SETIAP FILE, WAJIB PERMISSION-NYA BUKAN "666"!**  

- **WAJIB**:

> - ***File***: (*644*) - (*-rw-r--r-*)-//-(*1*)
> - ***Folder***: (*755*) - (*drwxr-xr-x+*)-//-(*4*)

Jadi, dimohon untuk menggunakan ini!  
Harus setiap-nya seperti itu.

```txt
  [#] Eksekusi: Cek apakah {masih ada 666} atau {ada yg tidak 644/755}
find . -path "./.git" -prune -o
|
find . -path "./.git" -prune -o -perm 0666
|
find . -path "./.git" -prune -o -type f -perm 0666 -ls
find . -path "./.git" -prune -o -type f ! -perm 0644
find . -path "./.git" -prune -o -type d -perm 0666 -ls
find . -path "./.git" -prune -o -type d ! -perm 0755
find . -path "./.git" -prune -o -perm 0666 -ls
|
find . \( -type f -perm 0666 -ls -o -type f ! -perm 0644 -o -type d -perm 0666 -ls -o -type d ! -perm 0755 \)

  [#] Eksekusi: Mengubah semuanya
find . -path "./.git" -prune -o -exec chmod u=rwX,go=rX {} +
```

---

Sepertinya dalam penanganan ini, emang perlu sedikit mikir secara kerja keras ya...

*GANBATTE~, AAYANK!*

<!--
  [BEGIN]
  Disemangatin tuh, SEMANGAT
-->
<img draggable="false" title=""
src="/BASE/ASSETS/Assets-Main/BTC-Sign/a1a_GFB.png"
alt="BTC.GFB - Kafuu Chino" width="100">
<img draggable="false" title=""
src="/BASE/ASSETS/Assets-Main/BTC-Sign/b2b_SJL.png"
alt="BTC.SJL - Jouga Maya" width="100">
<img draggable="false" title=""
src="/BASE/ASSETS/Assets-Main/BTC-Sign/c3c_AVD.png"
alt="BTC.AVD - Natsu Megumi" width="100">
<img draggable="false" title=""
src="/BASE/ASSETS/Assets-Main/BTC-Sign/d04_MiRaKa.png"
alt="BTC.MiRaKa - Jinja Eru" width="100">
<img draggable="false" title=""
src="/BASE/ASSETS/Assets-Main/BTC-Sign/e05_HuPaWi.png"
alt="BTC.HuPaWi - Jinja Natsume" width="100">
<img draggable="false" title=""
src="/BASE/ASSETS/Assets-Main/BTC-Sign/ff6_CloTriEld.png"
alt="BTC.CloTriEld - Fuiba Fuyu" width="100">
<!--
  [END]
  Disemangatin tuh, SEMANGAT
-->

> *Ciaoo...*

---

<!--
    ?
-->
