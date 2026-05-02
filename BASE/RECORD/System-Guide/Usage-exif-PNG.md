<!--
---

Doc_Article: Record

---
-->

---

# {{ Nge-EXIF aset-aset untuk per-Sampel-an }}

Setiap aset-aset untuk Sampel, itu adalah wajib diperhatikan juga Metadata-nya.

Ini bertujuan agar file dapat diliat lebih mendetil, jadi banyak bacaannya enak pula.

## Pembukaan

Setiap dari file-file aset yang ada, hal pertama yang harus di-cek adalah, bahwa antara format file secara nama dan metadata, itu sudah pas.

Minimal, pas ngecek metadata-nya, isi detil-nya kalo harus scroll puluhan kali untuk menyelesaikan bacanya, mending skip aja. Udah pasti metadata-nya itu panjang banget.

- Gunakan ini, untuk ngeliat semuanya secara mendetil.

```bash
exiftool -a -u -g1 FILE_NAME.png
|
exiftool -r -FileType -ext png .
exiftool -r -FileType -ext webp .
|
c> BASE/ASSETS
c> .storage/.images
```

- Ini sebuah dipentingkan, untuk ngecek keseluruhan secara enak.

```bash
exiftool -r -ext png -FilePath -FileType .
exiftool -r -ext png -FilePath -FileType BASE/ASSETS
exiftool -r -ext png -FilePath -FileType .storage/.images
|
exiftool -r -ext png -if '$FileType eq "PNG"' -p '$FilePath' .
exiftool -r -ext png -if '$FileType eq "PNG"' -p '$FilePath' BASE/ASSETS
exiftool -r -ext png -if '$FileType eq "PNG"' -p '$FilePath' .storage/.images
|
c> BASE/ASSETS
c> .storage/.images
```

- Gunakan ini juga, untuk ngeliat, bahwa file PNG beneran PNG atau malah lain.

```bash
  [#] Cek semua tanpa terkecuali
exiftool -r -ext png -FileType -FileTypeExtension -MIMEType .
```

```bash
  [#] Cek semua, secara sesuai filter-an
exiftool -r -ext png -if '$FileType ne "PNG"' -FilePath -FileType .
exiftool -r -ext png -FileType . | sort | uniq -c
|
exiftool -r -ext png -if '$FileType ne "PNG"' \
-p '${Directory#./BASE/}/$FileName => $FileType' .
```

```bash
  [#] Cek semua file gambar berdasarkan format belakangnya
find . -type f -name "*.png"
find . -type f -name "*.gif"
|
find . -type f -name "*.webp"

  [#] Teknik ngatasin sekaligus WEBP untuk per-PNG-an
find . -type f -name "*.webp" -exec mv {} .storage/ \;
=#=
  [#] Convert semua nyamar palsu itu semua
exiftool -r -ext png -if '$FileType ne "PNG"' -p '$FilePath' .
| while read -r f; do
  tmp="${f}.fixed.png"
  convert "$f" "$tmp" && mv -f "$tmp" "$f"
done
|
exiftool -r -ext png -if '$FileType ne "PNG"' -p '$FilePath' .
| while read f; do
  tmp="${f}.fixed.png"
  convert "$f" "$tmp" && mv -f "$tmp" "$f"
done
=#=
  [#] Convert-kan file PNG menjadi WEBP
find .
-type f -name "*.png" -exec sh -c '
for f; do
  convert "$f" "${f%.png}.webp"
done
' sh {} +
|
convert FILE_NAME.png FILE_NAME.webp
#
find .
-type f -iname "*.webp" | while read -r f; do
  base="${f%.webp}"
  [ -f "${base}.png" ] && rm "${base}.png"
  mv "$f" "${base}.png"
done
=#=
  [#] Convert-kan file GIF menjadi WEBP
convert FILE_NAME.gif FILE_NAME.webp
|
convert FILE_NAME.gif -coalesce FILE_NAME.webp
```

> *Jangan lupa, setiap pertama kali file gambar (terutama PNG), harus ada di taruh dulu di tempat yang telah disediakan.*
>
> - "*/.storage*"

## Tujuan standar metode EXIF-ing

- Setiap-nya (terutama PNG) wajib memiliki:

> - "**AuthorName**"
> - "**ImageFrom**"
> - "**AuthorLink**"
> - "**ImageLink**"

- PNG-nya ada yg perlu dan opsional aja untuk ditambah.

> Perlu ditambah:
>
> - "**Title**"
> - "**Author**"
> - "**Copyright**"
>
> Opsional ntar-ntaran aja:
>
> - "**Description**"
> - "**Comment**"

```txt
[REJECTED]
Maaf, ini seharusnya cuma bisa berlaku, terutama kepada jika file adalah baru saja editan dari "paint.net".
|
Kebanyakan file aset yang jika dari donlot-an web, maka itu skip saja. Jangan diubah apapun Metadata-nya.

[05/03/2025]
Semua file aset harus di-sama-rata-kan per-Metadata-nya.
Cobalah melihat pada 2 file ("example-original.png" dan "example-standard.png") untuk melihat standar detil-nya.

[16/04/2025]
- AuthorLink : kalo emg gak ada nama author-nya, bisa cukup dengan link sumber web-nya.
- XnX : ?.
```

- Standarisasi aset-aset Sample (PNG)

File PNG sepertinya terlalu berat, maka WEBP bisa menjadi solusi.  
Begitu juga dengan GIF ataupun video (gak mungkin lah bisa sampe butuh video disini).

Untuk file GIF sendiri, itu akan sama menjadi WEBP.  
GIF sangat disarankan kepada WEBP, lebih efisien bahkan masih bisa seperti GIF di VSCode.

Ini adalah metadata yang sebaiknya dihapus aja.

> - **PNG-pHYs**

Yang ini kayaknya bakalan ada terus deh.  
(Semoga bisa dihapus lah...)

> - **ExifIFD**
> - **InteropIFD**

```bash
  [#] Cobalah
pngcrush -rem pHYs FILE_NAME.png BASE/SCRATCH/FILE_NAME.png
exiftool -a -u -g1 BASE/SCRATCH/FILE_NAME.png
|
"PINDAHIN MANUAL KE TEMPAT FILE LAGI BERADA"
"[TIMPA/REPLACE] AJA"
|
exiftool -a -u -g1 FILE_NAME.png

.
```

- [**Original Example**][Original-Example]
- [**Standard Example**][Standard-Example]

## List nge-EXIF untuk mempermudah

Ini adalah list auto-command langsung nge-EXIF nya.  
Tinggal kopas aja section-nya, lalu edit-edit dikit...  
Beres deh!

Silahkan untuk dipake pada sekian berikut...

- Edit pokok Metadata aset-aset per-Sampel-an

```bash
# -r -ext png -ext webp \
exiftool -config .sys/exif-img_data.config \
-overwrite_original \
-XMP-Sec_Res:AuthorName="Who is Author Name" \
-XMP-Sec_Res:ImageFrom="Where Image is From" \
-XMP-Sec_Res:AuthorLink="author-link.com" \
-XMP-Sec_Res:ImageLink="image-link.com" \
FILE_NAME.png

  [#] Nyari salah satu
  # Yg punya
exiftool -r -ext png -ext png/webp -i .git \
-if '$MetaData' \
-p '$FilePath' .
|
  # Yg gak punya
exiftool -r -ext png -ext png/webp -i .git \
-if 'not $MetaData' \
-p '$FilePath' .
#
  [#-Exmp] Nyari salah satu
  # Yg punya
exiftool -r -ext png -ext png -i .git \
-if '$XMP-Sec_Res:AuthorName' \
-p '$FilePath' .
|
  # Yg gak punya
exiftool -r -ext png -ext webp -i .git \
-if 'not $XMP-Sec_Res:ImageFrom' \
-p '$FilePath' .
#
  [#-Opt] Nyari salah satu
-p '$FilePath' > file.png
```

---

- Edit file personal Metadata aset-aset per-Sampel-an (keseluruhan)

```py
exiftool -overwrite_original \
-Title="Image Title" \
-Author="Author of [The Image]" \
-Copyright="[Author] - [AtPublished]" \
-Description="[Description is also optional]" \
-Comment="[Comment is also optional]" \
FILE_NAME.png
```

- Bagian opsional

```py
exiftool -overwrite_original \
-Description="Tuliskan deskripsi" \
-Comment="Tuliskan komen-nya" \
FILE_NAME.png
```

- Singkat-Sikat semuanya

```py
#-r -ext png -ext webp \
exiftool -config .sys/exif-img_data.config \
-overwrite_original \
-Title="Image Title" \
-Author="Author of [The Image]" \
-Copyright="[Author] - [AtPublished]" \
-Description="[Optional, can descript later]" \
-Comment="[Optional, can comment later]" \
-XMP-Sec_Res:AuthorName="Who is Author Name" \
-XMP-Sec_Res:ImageFrom="Where Image is From" \
-XMP-Sec_Res:AuthorLink="author-link.com" \
-XMP-Sec_Res:ImageLink="image-link.com" \
FILE_NAME.png // folder
```

---

## Pengakhiran

Setelah itu semua, jangan lupa untuk mengecek kembali gambar tersebut!

- Bilamana terdapat terkopas sehingga ada file lain (misalnya ada jadi "*.png_original*"), cobalah untuk menghapus-nya saja.

Selain itu, jangan lupa pula...

**SETIAP FILE, WAJIB PERMISSION-NYA BUKAN "666"!**  

- **WAJIB**:

> - ***File***: (*644*) - (*-rw-r--r-*)-//-(*1*)
> - ***Folder***: (*755*) - (*drwxr-xr-x+*)-//-(*4*)

Jadi, dimohon untuk menggunakan ini!  
Harus setiap-nya seperti itu.

```bash
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
#|#|#
  [#] Eksekusi: Ngecek secara satu file
ls -l FILE_NAME.png

  [#] Eksekusi: Mengubah semuanya
find . -path "./.git" -prune -o -exec chmod u=rwX,go=rX {} +
|
find . -path "./.git" -prune -o
#|#|#
  [#] Eksekusi: Mengubah khususan
find . -type d -exec chmod 755 {} +
find . -path "./.git" -type d -exec chmod 755 {} +
find . -path "./.git" -prune -o -type f -exec chmod 644 {} +
|
find . -type f -iname "*.txt" -exec chmod 644 {} +
find . -type f -iname "*.md" -exec chmod 644 {} +
find . -type f -iname "*.png" -exec chmod 644 {} +
find . -type f -iname "*.jpg" -exec chmod 644 {} +
find . -type f -iname "*.gif" -exec chmod 644 {} +
|
find . -type f -iname "*.py" -exec chmod 755 {} +
find . -type f -iname "*.js" -exec chmod 755 {} +
find . -type f -iname "*.php" -exec chmod 755 {} +
|
find . -type f -iname "*.html" -exec chmod 644 {} +
find . -type f -iname "*.css" -exec chmod 644 {} +
find . -type f -iname "*.json" -exec chmod 644 {} +
#|#|#
  [#] Eksekusi: Mengubah manual
chmod 644 file.png
chmod 755 folder
```

```bash
  [#] Manual: Mengguankan Exiftools-nya langsung
exiftool -FilePermissions=644 FILE_NAME.png
exiftool -FilePermissions="-rw-r--r--" FILE_NAME.png

  [#] Otomatis: Mengguankan Exiftools-nya langsung
exiftool -overwrite_original -r -ext png -FilePermissions=644
exiftool -overwrite_original -r -ext png -FilePermissions="-rw-r--r--"
exiftool -overwrite_original -r -ext webp -FilePermissions=644
exiftool -overwrite_original -r -ext webp -FilePermissions="-rw-r--r--"
```

---

Sepertinya dalam penanganan ini, emang perlu sedikit mikir secara kerja keras ya...

*GANBATTE~, AAYANK!*

---

<!--
  [BEGIN]
  Disemangatin tuh, SEMANGAT
-->
<div align="center">
  <img draggable="false" title=""
  src="https://raw.githubusercontent.com/Minecube1510/s4mpl3_m3m0ry/main/BASE/ASSETS/Assets-Main/BTC-Sign/d04_MiRaKa.png"
  alt="BTC.MiRaKa - Jinja Eru" width="100">
  <img draggable="false" title=""
  src="https://raw.githubusercontent.com/Minecube1510/s4mpl3_m3m0ry/main/BASE/ASSETS/Assets-Main/BTC-Sign/e05_HuPaWi.png"
  alt="BTC.HuPaWi - Jinja Natsume" width="100">
</div><div align="center">
  <img draggable="false" title=""
  src="https://raw.githubusercontent.com/Minecube1510/s4mpl3_m3m0ry/main/BASE/ASSETS/Assets-Main/BTC-Sign/a1a_GFB.png"
  alt="BTC.GFB - Kafuu Chino" width="100">
  <img draggable="false" title=""
  src="https://raw.githubusercontent.com/Minecube1510/s4mpl3_m3m0ry/main/BASE/ASSETS/Assets-Main/BTC-Sign/ff6_CloTriEld.png"
  alt="BTC.CloTriEld - Fuiba Fuyu" width="100">
</div><div align="center">
  <img draggable="false" title=""
  src="https://raw.githubusercontent.com/Minecube1510/s4mpl3_m3m0ry/main/BASE/ASSETS/Assets-Main/BTC-Sign/c3c_AVD.png"
  alt="BTC.AVD - Natsu Megumi" width="100">
  <img draggable="false" title=""
  src="https://raw.githubusercontent.com/Minecube1510/s4mpl3_m3m0ry/main/BASE/ASSETS/Assets-Main/BTC-Sign/b2b_SJL.png"
  alt="BTC.SJL - Jouga Maya" width="100">
</div>
<!--
  [END]
  Disemangatin tuh, SEMANGAT
-->

---

> *Ciaoo...*

---

[Original-Example]: /.example/example-original.png "Contoh Original-nya, awal-awal"
[Standard-Example]: /.example/example-standard.png "Contoh Standar-nya, standarisasi"

<!--
{#}
  exiftool -all= -overwrite_original FILE_NAME.png
  |
  exiftool -all= -overwrite_original -r BASE/ASSETS
  exiftool -all= -overwrite_original -r -ext png BASE/ASSETS
  |
  exiftool -overwrite_original -all= -r -if '$FileType eq "WEBP"' BASE/ASSETS
  exiftool -all= -overwrite_original -r -ext webp BASE/ASSETS

  pngcrush -ow -rem allb file.png
{#}
-->
