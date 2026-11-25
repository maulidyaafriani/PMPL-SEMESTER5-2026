# Ringkasan Test Case

Hasil verifikasi pada 24 November 2026. TC01 dan TC02 lulus. TC03 dicoba satu kali, tetapi input uji pertama ditolak validasi format email (`*.polinema.ac.id`) sebelum server memeriksa kredensial. Format input dalam test sudah diperbaiki, namun tidak dikirim ulang agar tidak melampaui batas satu percobaan. TC04–TC07 dilewati karena `.env` dan detail dashboard/menu belum tersedia. Tidak ada CAPTCHA yang terdeteksi pada halaman login saat inspeksi. Setelah perbaikan, suite selain TC03 lulus dengan 2 passed/4 skipped; test discovery menemukan seluruh 7 test.

| ID | Skenario | Hasil yang diharapkan | Status |
|---|---|---|---|
| TC01 | Halaman login ditampilkan | Username, password, dan tombol Login terlihat | PASS |
| TC02 | Submit form kosong | Tetap di halaman login atau validasi browser tampil | PASS |
| TC03 | Login dengan kredensial salah (satu kali) | Pesan error tampil dan tetap di halaman login | FAIL (input ditolak validasi; versi diperbaiki tidak dijalankan demi batas satu percobaan) |
| TC04 | Login valid | Sesi login berhasil dan penanda dashboard terlihat | SKIP (belum ada `.env`) |
| TC05 | Navigasi menu read-only (Jadwal/KHS/menu tersedia) | Halaman tujuan menampilkan penanda yang dikonfigurasi | SKIP (detail halaman belum dikonfigurasi) |
| TC06 | Logout | Kembali ke halaman login | SKIP (detail halaman belum dikonfigurasi) |
| TC07 | Akses path terproteksi tanpa sesi | Dialihkan/menampilkan halaman login | SKIP (path dashboard belum dikonfigurasi) |
