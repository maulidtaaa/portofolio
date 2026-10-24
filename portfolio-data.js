/*
 * ORBITA portfolio content.
 * Ubah teks/link di file ini untuk memperbarui konten tanpa mengubah layout.
 * Jangan mengisi informasi yang belum terverifikasi seolah-olah fakta.
 */
window.ORBITA_DATA = {
  profile: {
    name: "Maulidta Yuwanda Fronika",
    shortName: "Maulidta",
    role: "Siswa Rekayasa Perangkat Lunak",
    school: "SMK Krian 1 Sidoarjo",
    location: "Sidoarjo, Indonesia",
    email: "maulidtayuwandafronika@gmail.com",
    socials: [
      { name: "Instagram", label: "@wfrnika", url: "https://instagram.com/wfrnika" },
      { name: "TikTok", label: "@frnikael", url: "https://www.tiktok.com/@frnikael" }
    ]
  },
  planets: [
    { id: "mercury", name: "Merkurius", category: "IDENTITY", summary: "Mulai dari mengenal orang di balik ide, minat, dan cara berpikirnya.", section: "about", number: "01" },
    { id: "venus", name: "Venus", category: "CAPABILITIES", summary: "Tempat melihat tools, kemampuan, dan hal yang sedang dipelajari.", section: "skills", number: "02" },
    { id: "earth", name: "Bumi", category: "LEARNING JOURNEY", summary: "Jejak pendidikan yang membentuk fondasi dan arah belajar.", section: "education", number: "03" },
    { id: "mars", name: "Mars", category: "SELECTED WORK", summary: "Masuk ke laboratorium karya, proyek digital, dan studi kasus.", section: "projects", number: "04" },
    { id: "jupiter", name: "Jupiter", category: "EXPERIENCE LOG", summary: "Lima catatan pengalaman dari organisasi, kegiatan, dan praktik lapangan.", section: "experience", number: "05" },
    { id: "saturn", name: "Saturnus", category: "CERTIFICATES", summary: "Dokumen pembelajaran dan bukti pencapaian yang tersedia.", section: "certificates", number: "06" },
    { id: "uranus", name: "Uranus", category: "PERSONAL CONSTELLATION", summary: "Minat kreatif dan pencapaian yang memberi warna pada perjalanan.", section: "achievements", number: "07" },
    { id: "neptune", name: "Neptunus", category: "OPEN TRANSMISSION", summary: "Tempat memulai percakapan, membagikan ide, atau membuka kolaborasi.", section: "contact", number: "08" }
  ],
  skills: [
    { id: "code", number: "01", title: "Web Development", subtitle: "BUILD / THE WEB", description: "Dasar membangun halaman dan interaksi web.", skills: ["HTML5", "CSS3", "JavaScript", "MySQL"], icon: "</>" },
    { id: "data", number: "02", title: "Data & Office", subtitle: "STRUCTURE / INFORMATION", description: "Menyusun data, dokumen, dan kebutuhan administrasi.", skills: ["Excel", "Google Sheets", "Word", "Database"], icon: "▦" },
    { id: "visual", number: "03", title: "Visual Design", subtitle: "FORM / EXPERIENCE", description: "Merancang ide visual dan menyusun komposisi.", skills: ["Drawing", "Layout", "Digital Design"], icon: "✳" },
    { id: "logic", number: "04", title: "Logical Thinking", subtitle: "REASON / SOLVE", description: "Memahami masalah, memeriksa detail, dan mencoba solusi.", skills: ["Problem solving", "Critical thinking", "Accuracy"], icon: "∴" }
  ],
  education: [
    { period: "2024 — SEKARANG", stage: "CURRENT EDUCATION", title: "SMK Krian 1 Sidoarjo", program: "Rekayasa Perangkat Lunak", description: "Memperdalam coding, database, desain, dan pengembangan proyek digital.", status: "NOW" },
    { period: "2021 — 2024", stage: "PREVIOUS EDUCATION", title: "SMP Negeri 2 Krian", program: "Pendidikan menengah pertama", description: "Membangun pengalaman organisasi, literasi, dan aktivitas kreatif sejak jenjang SMP.", status: "COMPLETED" },
    { period: "2015 — 2021", stage: "ELEMENTARY EDUCATION", title: "SDN Watutulis 1", program: "Pendidikan dasar", description: "Menjadi fondasi awal perjalanan pendidikan sebelum melanjutkan ke jenjang SMP.", status: "COMPLETED" }
  ],
  experiences: [
    { id: "exp-01", type: "ORGANIZATION / LITERACY", title: "Gerakan Sekolah Menulis Buku", shortTitle: "GSMB", period: "2021", description: "Mengikuti Gerakan Sekolah Menulis Buku sebagai bagian dari perjalanan literasi.", image: "gambargsmb.jpeg", imageAlt: "Dokumentasi Gerakan Sekolah Menulis Buku", tags: ["Literasi", "Menulis"] },
    { id: "exp-02", type: "LEADERSHIP / ORGANIZATION", title: "Wakil Ketua PMR Madya", shortTitle: "PMR MADYA", period: "2022 / 2023", description: "Menjalankan peran sebagai Wakil Ketua PMR Madya SMPN 2 Krian.", image: "waketupmr.jpeg", imageAlt: "Dokumentasi kegiatan PMR Madya", tags: ["Organisasi", "Kepemimpinan"] },
    { id: "exp-03", type: "COMPETITION / WRITING", title: "Lomba Cerpen", shortTitle: "SHORT STORY", period: "Tingkat Kabupaten Sidoarjo", description: "Mengikuti lomba cerpen tingkat Kabupaten Sidoarjo.", image: "lombacerpen.jpeg", imageAlt: "Dokumentasi kegiatan lomba cerpen", tags: ["Menulis", "Kreativitas"] },
    { id: "exp-04", type: "INTERNATIONAL / INNOVATION", title: "Kompetisi Inovasi Internasional", shortTitle: "INTERNATIONAL PROJECT", period: "2025", description: "Mengikuti kompetisi inovasi dengan peserta dari Vietnam dan Kamboja.", image: "lombainter.jpeg", imageAlt: "Dokumentasi proyek inovasi internasional", tags: ["Inovasi", "Presentasi"] },
    { id: "exp-05", type: "FIELD EXPERIENCE / INDUSTRY", title: "Praktik Kerja Lapangan", shortTitle: "PKL", period: "CV. Elva Jaya Teknik", description: "Menjalani PKL di CV. Elva Jaya Teknik dan menerapkan kemampuan di lingkungan kerja.", image: "pkl.jpeg", imageAlt: "Dokumentasi praktik kerja lapangan", tags: ["Praktik", "Pengalaman kerja"] }
  ],
  projects: [
    { id: "project-01", number: "01", type: "INTERNATIONAL INNOVATION", title: "Recycled Product Presentation", year: "2025", description: "Proyek presentasi produk daur ulang yang ditampilkan dalam kegiatan inovasi internasional bersama peserta dari Vietnam dan Kamboja.", cardText: "Mengembangkan gagasan produk daur ulang dan mengomunikasikannya melalui presentasi visual.", role: "Proyek inovasi dan presentasi", stack: ["Product Innovation", "Presentation", "Visual Communication"], image: "coverlombainter.jpeg", imageAlt: "Materi visual Recycled Product Presentation", imageStyle: "project-art--recycled", url: "https://youtu.be/6fVTfo_S5B0?si=OOAH9s4y-Nhokeda", urlLabel: "Lihat presentasi", state: "available" },
    { id: "project-02", number: "02", type: "WEB DEVELOPMENT", title: "Personal Portfolio", year: "Web project", description: "Website portofolio personal untuk menyusun profil, keterampilan, pendidikan, pengalaman, pencapaian, dan proyek dalam satu pengalaman web.", cardText: "Proyek pengembangan web personal dengan HTML, CSS, dan JavaScript.", role: "Pengembangan website personal", stack: ["HTML", "CSS", "JavaScript"], image: "webprtfl.png", imageAlt: "Ilustrasi antarmuka web portofolio", imageStyle: "project-art--portfolio", url: "https://maulidtaaa.github.io/portofolio/", urlLabel: "Buka website", state: "available" },
    { id: "project-03", number: "03", type: "WEBSITE INVENTARIS", title: "LIBVENTORY", year: "Web project", description: "Proyek website inventaris perpustakaan untuk mendukung pengelolaan barang, data, dan informasi inventaris.", cardText: "Antarmuka inventaris dengan struktur informasi dan komponen pengelolaan data.", role: "Pengembangan proyek web", stack: ["HTML", "CSS", "JavaScript", "PWA"], image: "libventory.png", imageAlt: "Screenshot proyek website inventaris LIBVENTORY", imageStyle: "project-art--libventory", url: "https://maulidtaaa.github.io/libventory/", urlLabel: "Buka website", state: "available" },
    { id: "project-04", number: "04", type: "NEXT ORBIT / RESERVED", title: "Proyek Berikutnya", year: "Segera diisi", description: "Slot ini disiapkan untuk proyek baru. Ganti dengan judul, deskripsi, teknologi, peran, dan tautan setelah proyek siap dipublikasikan.", cardText: "Satu tempat untuk karya yang sedang tumbuh.", role: "Isi peran setelah proyek tersedia", stack: ["Tambahkan teknologi"], image: "", imageAlt: "Ilustrasi slot proyek mendatang", imageStyle: "project-art--future", url: "", urlLabel: "Belum tersedia", state: "placeholder" },
    { id: "project-05", number: "05", type: "NEXT ORBIT / RESERVED", title: "Eksperimen Digital", year: "Segera diisi", description: "Slot kedua untuk eksperimen atau karya baru. Perbarui konten ini dengan informasi faktual ketika sudah ada hasil yang dapat ditampilkan.", cardText: "Tempat untuk ide yang masih dalam proses.", role: "Isi peran setelah proyek tersedia", stack: ["Tambahkan teknologi"], image: "", imageAlt: "Ilustrasi slot eksperimen digital mendatang", imageStyle: "project-art--experiment", url: "", urlLabel: "Belum tersedia", state: "placeholder" }
  ],
  certificates: [
    { id: "cert-01", title: "Juara 2 Duta Literasi Sekolah", issuer: "Festival Literasi Sidoarjo", date: "2022", image: "juara2duta.jpeg", imageAlt: "Piagam Juara 2 Duta Literasi Sekolah", category: "Literasi" },
    { id: "cert-02", title: "Penulis Nasional", issuer: "Piagam penghargaan penulis", date: "2022", image: "piagampenulis.jpeg", imageAlt: "Piagam Penghargaan Penulis Nasional", category: "Literasi" },
    { id: "cert-03", title: "Sertifikat Webinar", issuer: "Nyalaakademi", date: "2021", image: "serfitikatwebinar.jpeg", imageAlt: "Sertifikat Webinar Nyalaakademi", category: "Webinar" },
    { id: "cert-04", title: "Sertifikat Penulis", issuer: "Nyalaakademi", date: "2022", image: "sertifikatpenulis.jpeg", imageAlt: "Sertifikat Penulis Nyalaakademi", category: "Literasi" },
    { id: "cert-05", title: "Peringkat 2 At-Tartil", issuer: "Kompetisi At-Tartil", date: "Januari–Juni 2021", image: "juara2attartil.jpeg", imageAlt: "Dokumentasi Peringkat 2 At-Tartil", category: "Kompetisi" },
    { id: "cert-06", title: "Orientasi Kepalangmerahan", issuer: "Palang Merah Indonesia", date: "24 November 2021", image: "piagamorientasi.jpeg", imageAlt: "Piagam Orientasi Kepalangmerahan", category: "Organisasi" },
    { id: "cert-07", title: "Juara 3 Ratu Luwes", issuer: "Kompetisi Ratu Luwes", date: "2016", image: "juara3ratu.jpeg", imageAlt: "Piala Juara 3 Ratu Luwes", category: "Kompetisi" },
    { id: "cert-08", title: "Kursus Bahasa Korea", issuer: "KOICA / Kursus Bahasa Korea", date: "2024–2025", image: "sertifikatkorea.jpeg", imageAlt: "Sertifikat Kursus Bahasa Korea", category: "Pelatihan" },
    { id: "cert-09", title: "Juara 1 Menulis Surat", issuer: "POSIND", date: "10 November 2025", image: "juara1pos.jpeg", imageAlt: "Dokumentasi Juara 1 Menulis Surat untuk Pahlawan", category: "Menulis" },
    { id: "cert-10", title: "Recycled Products Presentation", issuer: "International Student Innovation Competition", date: "2025", image: "sertifikatinter.jpg", imageAlt: "Sertifikat Juara 3 Recycled Products Presentation", category: "Inovasi" },
    { id: "cert-11", title: "Lomba Khot Al-Qur'an", issuer: "Kompetisi Khot Al-Qur'an", date: "2020", image: "khat.jpeg", imageAlt: "Dokumentasi karya Lomba Khot Al-Qur'an", category: "Karya visual" },
    { id: "cert-12", title: "International Science Olympiad 10th", issuer: "Score Table", date: "20 September 2026", image: "sertifikatscoreiso.jpeg", imageAlt: "Dokumen International Science Olympiad 10th Score Table", category: "Olimpiade" },
    { id: "cert-13", title: "International Science Olympiad 10th", issuer: "Top 100 Highest Score", date: "20 September 2026", image: "sertifikattopiso.jpeg", imageAlt: "Dokumen International Science Olympiad 10th Top 100 Highest Score", category: "Olimpiade" },
    { id: "cert-14", title: "Praktik Kerja Lapangan", issuer: "Data Entry Produksi", date: "Januari - Mei 2026", image: "sertifpkl.jpeg", imageAlt: "Dokumen Praktik Kerja Lapangan", category: "PKL" },
    { id: "cert-15", title: "Olimpiade Sains Akademik Nasional (SAVANA) 2026", issuer: "Top 10 Dari 377 Peserta", date: "8-9 September 2026", image: "sertifsvn.jpeg", imageAlt: "Dokumen SAVANA", category: "Olimpiade" },
    { id: "cert-16", title: "Belajar Dasar Manajemen Proyek", issuer: "Manajemen Proyek", date: "22 September 2026", image: "sertifmng.jpeg", imageAlt: "Dokumen Dicoding", category: "DIcoding" },
    { id: "cert-17", title: "Memulai Pemrograman Dengan Java", issuer: "Pemrograman Java", date: "22 September 2026", image: "sertifjv.jpeg", imageAlt: "Dokumen Dicoding", category: "DIcoding" },
    { id: "cert-18", title: "Kompetisi Sains Ruangguru (KSR) 2026", issuer: "Peserta Bidang Matematika", date: "22 September 2026", image: "sertifksr.jpeg", imageAlt: "Dokumen Kompetisi Sains Ruangguru", category: "Olimpiade" },
    { id: "cert-19", title: "Olimpiade Sains Pelajar Nasional (OSPIN) 2026", issuer: "Peserta Bidang Matematika", date: "13 September 2026", image: "sertifospn.jpeg", imageAlt: "Dokumen Olimpiade Sains Pelajar Nasional", category: "Olimpiade" },
  ]
};
