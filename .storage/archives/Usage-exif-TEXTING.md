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
<div align="center">
  <img draggable="false" title=""
  src="https://minecube1510.github.io/sm-dc/img/btc/5HPW.png"
  alt="BTC.HuPaWi - Jinja Natsume" width="100">
  <img draggable="false" title=""
  src="https://minecube1510.github.io/sm-dc/img/btc/4MRK.png"
  alt="BTC.MiRaKa - Jinja Eru" width="100">
</div><div align="center">
  <img draggable="false" title=""
  src="https://minecube1510.github.io/sm-dc/img/btc/6CTE.png "
  alt="BTC.CloTriEld - Fuiba Fuyu" width="100">
  <img draggable="false" title=""
  src="https://minecube1510.github.io/sm-dc/img/btc/1GFB.png"
  alt="BTC.GFB - Kafuu Chino" width="100">
</div><div align="center">
  <img draggable="false" title=""
  src="https://minecube1510.github.io/sm-dc/img/btc/2SJL.png"
  alt="BTC.SJL - Jouga Maya" width="100">
  <img draggable="false" title=""
  src="https://minecube1510.github.io/sm-dc/img/btc/3AVD.png"
  alt="BTC.AVD - Natsu Megumi" width="100">
</div>
<!--
  [END]
  Disemangatin tuh, SEMANGAT
-->

> *Ciaoo...*

---

<!--
    ?
-->
