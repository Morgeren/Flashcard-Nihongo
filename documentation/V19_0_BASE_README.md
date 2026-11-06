# Nihongo Study Deck V19.0 — Foundation Build

V19.0 Foundation adalah peningkatan fondasi dari paket V18.7. Ini **bukan** klaim bahwa seluruh roadmap komprehensif sudah selesai. Tujuan build ini adalah membuat sumber kode dan dataset lebih mudah dipelihara, memperbaiki integritas hubungan Reader–Vocabulary, menambahkan audit yang dapat diperiksa, dan menghubungkan mesin SRS teruji sambil mempertahankan data lama.

## Struktur proyek

- `index.html`: runtime PWA yang sudah dibangun. Dataset JSON tetap disisipkan ke HTML agar modul V18.x yang membaca elemen JSON tidak rusak.
- `src/index.template.html`: template HTML sumber.
- `assets/js/legacy/`: 12 script JS V18.x yang dieksternalisasi. Urutan pemanggilan lama dipertahankan agar dependensi global tidak berubah mendadak.
- `assets/js/v19/`: modul baru untuk pencocokan kosakata, audit dataset, mesin SRS, dan panel audit.
- `data/vocabulary.json`: vocabulary sumber yang diperkaya metadata non-destruktif.
- `data/reading.json` dan `data/legacy-reading.json`: bacaan dengan status review dan hasil matching referensi vocabulary.
- `data/kanji-index.json`: indeks 801 karakter kanji yang terdeteksi pada headword; bacaan, makna, stroke count, dan radical belum diklaim valid.
- `data/grammar-index.json`: 49 pola grammar yang diekstrak dari sumber V10, V13, dan Reading; semuanya berstatus `needs_review`.
- `reports/`: laporan audit, antrean matching, laporan migrasi, serta laporan pengujian.
- `tools/build.py`: membangun `index.html` dari template dan dataset.
- `tools/validate.py`: pemeriksaan struktur dan referensi paket.
- `tests/`: pengujian data dan mesin SRS menggunakan Node.js.

## Build dan validasi

Memerlukan Python 3.10+ dan Node.js. Tidak ada dependency npm eksternal.

```bash
python tools/build.py
python tools/validate.py
node --test tests/*.test.mjs
```

Untuk pemeriksaan sintaks JavaScript:

```bash
for f in assets/js/legacy/*.js assets/js/v19/*.js service-worker.js; do node --check "$f"; done
```

## Menjalankan lokal

PWA dan ES modules perlu dijalankan melalui HTTP, bukan `file://` langsung.

```bash
python -m http.server 8000
```

Buka `http://localhost:8000`. Untuk instalasi PWA di perangkat, host seluruh isi paket melalui HTTPS.

## Perubahan V19 yang sudah diimplementasikan

1. Dua belas blok script JavaScript legacy dieksternalisasi dengan urutan eksekusi dipertahankan. Dataset utama dipindahkan menjadi file JSON terpisah sebagai source of truth. Hasil runtime tetap menyisipkan JSON untuk kompatibilitas modul lama.
2. Metadata vocabulary ditambahkan secara non-destruktif: canonical ID, schema version, audit contoh kalimat, status review, dan referensi karakter kanji. Ejaan, bacaan, arti, dan contoh sumber tidak diganti.
3. Referensi vocabulary dalam Reading dicocokkan menggunakan exact normalized Japanese headword. Sebanyak 2.351 dari 3.330 referensi terhubung; 979 sisanya tetap unmatched dan tersedia dalam antrean review. Tidak ada fuzzy/morphology auto-link karena berisiko salah pasang.
4. Pada Reader, referensi yang sudah terhubung dapat disimpan ke daftar review V13 yang telah ada. Referensi yang tidak pasti tidak diberi tombol simpan sebagai vocabulary canonical.
5. Mesin SRS V19 deterministik terhubung ke sesi Advanced Flashcard V18.6 untuk Again/Hard/Good/Easy, dengan fallback ke kalkulasi lama bila modul V19 tidak tersedia. Jadwal per arah (per-direction) yang sudah ada tetap dipertahankan.
6. Panel Data & Progress menampilkan jumlah vocabulary, contoh, bacaan, hasil matching, indeks kanji, indeks grammar, dan menyediakan unduhan laporan serta antrean matching.
7. Indeks kanji dan grammar dibentuk dari sumber yang memang tersedia. Seluruh entri tetap perlu review; build tidak mempromosikannya menjadi Verified.
8. Service worker mendapat cache version baru dan pre-cache file script eksternal serta modul V19.
9. Validator memeriksa JSON, ID unik, struktur soal, duplicate HTML ID, referensi script/asset lokal, manifest, precache service worker, dan destructive storage calls.

## Hasil audit sumber

- 1.205 vocabulary entries; tidak ditemukan duplicate ID atau core fields kosong.
- 178 vocabulary entries memiliki pasangan contoh bahasa Jepang dan terjemahan yang valid secara struktur; 1.027 belum punya pasangan contoh tersebut.
- 950 bacaan inti dan 6 bacaan legacy.
- 0 struktur soal Reading yang invalid pada pemeriksaan statis.
- 3.330 referensi vocabulary dari bacaan: 2.351 exact matched, 979 belum terhubung.
- 801 karakter kanji terindeks, tetapi detail linguistik belum diisi/verified.
- 49 pola grammar terindeks, seluruhnya perlu review.
- 500 bacaan berstatus `needs_language_review`; 456 berstatus `unreviewed`.

Lihat `reports/v19-audit-report.json` dan `reports/v19-test-report.json` untuk rincian.

## Kompatibilitas data pengguna

Build ini mempertahankan key LocalStorage dan bentuk state V18.7/V18.6/V13/V11. Tidak ada `localStorage.clear()`, penghapusan key lama, atau migrasi destruktif. V19 belum memindahkan data ke IndexedDB karena migrasi tersebut perlu uji kompatibilitas pada profil browser nyata.

Data diharapkan tetap tersedia ketika aplikasi diperbarui dari origin dan scope yang sama. Namun, migrasi pada browser profile nyata belum dites dalam lingkungan build. **Ekspor full backup sebelum update, jangan hapus data browser lama, dan pertahankan file backup sampai V19 diverifikasi.** Lihat `reports/v19-migration-report.json`.

## Yang belum selesai

- 979 referensi Reader belum dapat dihubungkan secara pasti. Perlu alias/morphology map yang ditinjau, bukan fuzzy matching otomatis.
- Audit struktur bukan verifikasi bahasa Jepang oleh penelaah manusia. Status `needs_language_review`, `unreviewed`, dan `needs_review` tetap dipertahankan.
- 1.027 kosakata belum mempunyai pasangan contoh Jepang + terjemahan yang valid.
- Kanji index belum dilengkapi onyomi, kunyomi, makna terverifikasi, stroke count, atau radical.
- Grammar index belum merupakan kurikulum grammar komprehensif yang telah ditinjau.
- Writing Practice khusus, Knowledge Graph visual, dictation/audio lokal, dan AI semantic correction belum ditambahkan sebagai modul baru.
- Belum ada sinkronisasi cloud. AI API tetap opsional dan tidak diwajibkan.
- Pengujian browser interaktif, Android fisik, instalasi/update PWA HTTPS, serta offline relaunch belum dilakukan di lingkungan build ini. Statusnya `NOT TESTED`, bukan PASS.

## Rilis dan offline

Upload seluruh isi folder proyek ke hosting HTTPS. Service worker memakai cache version V19 baru dan menyimpan 22 resource aplikasi. Setelah update, buka aplikasi kembali agar service worker baru dapat memasang cache. Uji secara manual alur Reading, flashcard/SRS, backup/restore, serta offline relaunch sebelum mengandalkan V19 sebagai satu-satunya salinan data.
