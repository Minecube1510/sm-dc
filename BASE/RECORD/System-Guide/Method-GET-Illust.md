<!--
---

Doc_Article: Record

---
-->

---

# "GET" Illustration Method

<!--
  Cek Size:
  api.github.com/repos/Minecube1510/s4mpl3_m3m0ry
-->

Apa? Ngirim gambar selalu kayak:

> - Buka Github, ke repo
> - Cari-cari ke folder, yang mana itu *nambah-nambahin langkah-langkah histori browser web*
> - Lalu "**Add file**" manual, yang mana gak enaknya, *nambah-nambah Commit yang nanti jadi gak penting-penting ajah*

```txt
Oh, tentu saja. ITU SEMUA NYEBELIN BANGET!

Oleh sebab itu, Guide ini hadir untuk menolong ke-efisiensi-an yang mudah untuk mendapatkan file-file PNG yang gak mungkin dibuat semasa nge-repo disini.
```

---

## Berbagai cara telah ditemukan sebagai berikut

Kita kenali dulu. Kita tuh ingin banget, mendapatkan gambar-gambar berdasarkan pada *online-online-an*, dari *lokal* nge-"*file manager*" lah, atau bahkan dari *storage cloud* dong...

> **Ya kan!**

Tapi masalahnya, gak semudah itu kalo mau efisiensi dengan mudah.
Untungnya, repo selalu dibekali sebuah manajamen yang selalu diandalkan karena *overpower*-nya. Yakni alat itu adalah, disebut sebagai "**Terminal**".

- **Online**

```txt
- Gunakan commanding "curl" untuk terminal.
- Pake rumus yang ada di bawah.
- Ganti pada [""] ini dengan "link gambar web-kamu".
- Dan juga ganti pada setelah "-o"-nya, dengan "path file untuk namain file-nya" (alias ini tuh namainnya dengan nge-path langsung file-nya).
```

```js
curl -L "https://web.kom/gambar.png" -o path/nge/gambar.png
```

> Peringatan

```txt
- Tolong untuk diperhatikan juga linking-nya. Karena beberapa web, linking-nya mengalami banyak kendala.
```

Kendala-kendala yang dimaksud

```txt
- Linking Wiki (SANGAT TIDAK DISARANKAN, BUTUH PENGAKALAN)
Dengan menggunakan curl saja, menghasilkan file gambar yang rusak.
Karena mengambil dengan curl, dianggap Cloudflare bisa mengancam server. Maka dikasihkan bentukan rusak-nya, yakni teks yang di-save secara "PNG" (dengan modal rename)

- Wordpress (TIDAK DISARANKAN, BUTUH PENGAKALAN)
Sebetulnya dia bisa-bisa normal aja, kecuali satu hal.
Masalah utamanya adalah, dia gak cepat. Itu adalah hal yang gak normal (karna meski gambar kecil pun, lama delay. Internet udah cepet, tapi kok puluhan detik lebih masih belum kelar).

- "Coming Soon"
Menunggu hasil kendala...
```

- **Local**

```txt
- Buka "File Manager".
- Pilih file gambar-nya.
- Lakukan teknik *Drag and Drop*, taruh ke "Sidebar" (taruh-nya di baris folder-nya)
```

- **Storage Clouds**

Catatan utama pendahuluan

```txt
Kalo mau lebih real-nya, harus nge-"rcloud".
Namun karena itu adalah cara yang sangat susah, maka hal ini sangat tidak direkomendasikan.

Saat ini, cara yang paling mendekati adalah, dengan sama aja kayak metode "Online" atas tadi.

* Tapi perlu diingat, selama Cloud-nya itu ada sistem web-nya.

Untuk nge-link nya sendiri, adalah dengan cara cari aja opsi yang bisa nge-share link.

* Perlu dihimbau, untuk jangan asal cuma asal langsung linking. Karena linking ujung-ujungnya wajib harus mendapati format yang jelas. Seperti harus dalam bentuk berakhir ".fmt" gini.
```

> Metode Storage Cloud: Google Drive

```txt
- Pilih gambar yang mau di-link curl
- Cari opsi yang nge-link (pokoknya bisa "Salin Link" aja dulu)

- Berikut format yang perlu diperhatikan
https://
drive.google.com/file/d/[SALIN_TIKET_PANJANG_INI]/view

- Lalu gunakan linking ini
https://drive.google.com/uc?export=download&id=[TARO_TIKET_PANJANG_TERSALIN_TADI_DISINI]

- Command curl-nya sedikit berbeda
curl -L -o path/nge/gambar.png "LINK_TADI_TARO.DISINI"
```

- **Cara paling mudah**

```txt
- Ke web-nya, laly cari gambar-nya
- Klik kanan, dan pilih "Copy image"
|
- Kembali ke VSCode/Codespace, cari tab pada direktori (cari folder-nya lah)
- Paste disitu (CTRL+V)

Maka dia akan kasih gambar, dengan nama auto-nya "image.png".
```

Kenapa bisa gitu?

```txt
- Karena sudah ada extenstion "Paste Image", yang dibuat oleh "mushan".

Jadi tinggal "CTRL+V", dia pun kasih "image.png" pada direktori yang tengah di tab-nya.
```

---

## Shortcut Temping

```py
curl -L "https://link.com/gambar.png" -o BASE/ASSETS/Assets-Storages/[PNG].png
```

---
