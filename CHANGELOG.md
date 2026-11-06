# Changelog — Nihongo Study Deck V19.0 Foundation Build

## Dari V18.7 ke V19.0 Foundation

### Ditambahkan
- Source template dan hasil runtime build dipisahkan.
- Dua belas script JavaScript legacy dieksternalisasi dengan urutan pemanggilan yang dipertahankan.
- Dataset vocabulary, Reading inti, dan Reading legacy dipisahkan ke `data/*.json` sebagai source of truth.
- Metadata audit vocabulary ditambahkan tanpa mengubah ejaan, bacaan, arti, atau contoh sumber.
- Exact-match link antara referensi vocabulary Reader dan database vocabulary.
- Antrean referensi yang belum dapat dipastikan dicatat dalam JSON/CSV.
- Indeks karakter kanji dan indeks grammar dibentuk dari materi yang sudah ada; seluruh entri tetap berstatus perlu review.
- Tombol simpan kosakata ke daftar review V13 untuk referensi Reader yang sudah terhubung secara pasti.
- Mesin SRS V19 deterministik yang terhubung dengan sesi Advanced Flashcard V18.6, disertai fallback.
- Panel audit Data & Progress dan unduhan laporan.
- Pre-cache service worker untuk script eksternal dan modul V19.
- Test suite Node.js dan validator paket yang lebih lengkap.

### Dipertahankan
- Data vocabulary, reading, dan legacy reading yang sudah ada.
- Fitur-fitur V18.7 yang dipanggil oleh source lama.
- Urutan eksekusi script legacy.
- Nama key LocalStorage yang dipakai versi lama.
- Format data progres dan state lama; build ini tidak memaksa migrasi destruktif.
- Karakter desain, aset, manifest PWA, dan kemampuan inti offline.

### Batasan yang diketahui
- Ini adalah **Foundation Build**, bukan penyelesaian penuh seluruh roadmap dalam master prompt.
- 979 referensi Reader belum dapat dipasangkan dengan kepastian exact headword.
- Materi bahasa Jepang belum diverifikasi oleh penelaah manusia.
- Indeks kanji belum dilengkapi onyomi, kunyomi, makna tervalidasi, stroke count, atau radical.
- Grammar index masih memerlukan pemeriksaan kualitas dan kelengkapan.
- Writing Practice khusus, Knowledge Graph visual, dictation/audio lokal, dan AI semantic correction belum diimplementasikan sebagai modul baru.
- Pengujian browser nyata, Android fisik, instalasi PWA, dan perilaku offline setelah instalasi belum dilakukan di lingkungan build ini.
