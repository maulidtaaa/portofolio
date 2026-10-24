# ORBITA | My Universe Portfolio

Website portofolio personal untuk Maulidta Yuwanda Fronika. Front-end dibuat ulang dari nol menggunakan HTML5, CSS3, dan JavaScript Vanilla. File proyek portofolio lama dipakai sebagai sumber data dan aset, bukan sebagai dasar layout atau stylesheet.

## Menjalankan website

1. Ekstrak folder `portofolio-main`.
2. Buka folder di VS Code.
3. Jalankan `index.html` dengan ekstensi Live Server, atau gunakan server statis lokal.
4. Buka alamat lokal yang disediakan browser.

Website tidak membutuhkan framework, package manager, backend, atau database untuk menampilkan konten utamanya.

## Struktur folder

```text
portofolio-main/
├── index.html           # Struktur website ORBITA yang baru
├── mldta.css            # Design system, tata letak, tema, responsive dan motion
├── mldta.js             # Interaksi, render data, navigasi, canvas dan galeri
├── portfolio-data.js    # Satu sumber data profil, planet, proyek, pengalaman, sertifikat
├── README.md            # Panduan proyek
└── *.jpeg / *.jpg / *.png  # Aset asli yang disediakan
```

Struktur flat utama dan nama file aset dari ZIP sumber dipertahankan. HTML, CSS, dan JavaScript yang membentuk tampilan utama ditulis ulang dengan konsep ORBITA.

## Lokasi untuk mengubah data

Edit `portfolio-data.js` untuk mengganti profil, daftar planet, keterampilan, riwayat pendidikan, proyek, lima pengalaman, dan sertifikat. Pengalaman wajib berjumlah tepat lima objek. Jangan gunakan data contoh sebagai fakta.

Tautan sosial/email dan URL proyek yang tersedia telah diambil dari proyek sumber. Placeholder proyek 04 dan 05 sengaja belum berisi URL karena data proyek berikutnya belum disediakan.

## Interaksi utama

- Intro singkat yang dapat dilewati.
- Delapan planet sebagai portal menuju bagian portofolio.
- Alternatif navigasi teks yang selalu tersedia.
- Tema Night Galaxy dan Morning Earth, dengan preferensi tersimpan apabila browser mengizinkan localStorage.
- Starfield canvas ringan, parallax lembut pada perangkat pointer, dan scroll reveal.
- Galeri sertifikat dengan lightbox, tombol sebelumnya/berikutnya, tombol panah keyboard, dan Escape.
- Dialog detail proyek, menu mobile, indikator progress halaman, dan tombol salin email.
- Menghormati `prefers-reduced-motion` dan memiliki fallback saat API browser tidak tersedia.

## Catatan

Website merupakan front-end statis. Form kontak tidak mengirim ke server; website menggunakan tautan email. Sebelum publikasi, tinjau kembali fakta, tautan, ejaan nama penghargaan, dan data pribadi yang ingin ditampilkan publik. Gambar yang gagal dimuat tidak akan memblokir bagian lain dari website.
