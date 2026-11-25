# E2E Testing SIAKAD POLINEMA

Project ini menggunakan Playwright Test dengan JavaScript/CommonJS. Seluruh skenario dirancang read-only; tidak ada test yang menyimpan atau mengubah data akademik.

## Instalasi

```powershell
npm install
npx playwright install chromium
```

## Konfigurasi

Salin `.env.example` menjadi `.env`, lalu isi `SIAKAD_USER` dan `SIAKAD_PASS` secara lokal. Jangan commit atau membagikan `.env`. Kredensial tidak disimpan di source code.

Setelah login melalui browser yang berwenang, isi nilai opsional di `.env` berdasarkan halaman yang benar-benar terlihat:

- `SIAKAD_DASHBOARD_PATH`: path relatif dashboard (diawali `/`).
- `SIAKAD_DASHBOARD_MARKER`: teks unik yang terlihat di dashboard.
- `SIAKAD_NAV_MENU_LABEL` dan `SIAKAD_NAV_PAGE_MARKER`: label menu read-only dan teks penanda halaman tujuan (mis. Jadwal atau KHS).
- `SIAKAD_LOGOUT_LABEL`: label kontrol logout.

Setup menyimpan sesi ke `.auth/user.json` agar login valid tidak diulang untuk setiap test. Folder sesi diabaikan Git. Jika CAPTCHA terdeteksi, skenario terkait dilewati; CAPTCHA tidak dibypass. TC03 mengirim satu percobaan dengan username acak yang tidak terkait akun nyata dan tidak di-retry.

## Menjalankan test

```powershell
npm test
```

Playwright berjalan headless secara default. Untuk mode headed:

```powershell
npm run test:headed
```

Untuk UI mode:

```powershell
npm run test:ui
```

Skenario dashboard/navigasi/protected memerlukan `.env` yang lengkap. Tanpa kredensial atau detail halaman yang diverifikasi, skenario terkait akan dilewati dengan alasan yang ditampilkan pada hasil test.

## Laporan

```powershell
npx playwright show-report
```
