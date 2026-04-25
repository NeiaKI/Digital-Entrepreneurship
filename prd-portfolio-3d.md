# PRD — Personal Website 3D Asset Portfolio

## 1. Overview
Website ini adalah personal portfolio untuk memamerkan dan (jika diinginkan) menjual/menyewakan aset 3D milik kreator secara profesional. Website akan menjadi pusat identitas digital kreator, menampilkan karya terbaik, profil, dan cara kontak/kerja sama dalam satu tempat yang rapi dan mudah diakses.

Fokus utama website adalah pengalaman eksplorasi aset 3D yang interaktif langsung di browser, dengan dukungan format file `.glb` (web-ready) dan `.blend` (source file Blender) sebagai aset yang dapat ditampilkan dan/atau diunduh sesuai kebutuhan.

## 2. Goals & Success Criteria

### 2.1 Business & Personal Goals
- Menjadi portfolio utama untuk melamar kerja (3D artist, 3D generalist, game/VR artist, environment artist, dsb.).
- Menjadi landing page yang bisa dibagikan ke klien potensial (freelance/commission) untuk melihat kualitas karya dan gaya visual kreator.
- Meningkatkan kredibilitas dan profesionalisme brand personal kreator (nama, logo, signature style, story).

### 2.2 User Goals
- Pengunjung dapat dengan cepat memahami kemampuan dan spesialisasi kreator (jenis aset 3D: props, environment, karakter, vehicles, dsb.).
- Pengunjung dapat menginspeksi aset 3D secara interaktif (rotate, pan, zoom, beberapa material/lighting view).
- Rekruter/klien dapat dengan mudah menemukan informasi kontak (email, LinkedIn, ArtStation, Behance, dll.) dan menghubungi kreator.

### 2.3 Success Metrics (Indicative)
- Jumlah kunjungan bulanan dan durasi rata-rata waktu di halaman portfolio meningkat dari waktu ke waktu.
- Minimal 1–3 kontak kerja sama/pekerjaan per bulan yang datang melalui website (form contact atau link kontak di website).
- Rasio klik ke profil eksternal (ArtStation, Behance, LinkedIn) dari halaman utama meningkat.

## 3. Target Users & Scenarios

### 3.1 Target Users
- Rekruter perusahaan game/animation/3D studio yang ingin mengevaluasi skill teknis & artistic sense kreator.
- Klien individu atau agensi yang mencari 3D artist untuk proyek tertentu (game, AR/VR, iklan, archviz, dll.).
- Sesama artist/creator yang ingin berjejaring (networking) atau kolaborasi.

### 3.2 User Scenarios
1. Rekruter membuka link portfolio dari CV, ingin melihat beberapa karya terbaik dalam 1–3 menit dan mengecek kualitas teknis topologi, material, lighting melalui viewer 3D interaktif.
2. Klien ingin tahu apakah kreator pernah mengerjakan jenis aset tertentu (misalnya props sci-fi atau interior archviz), dan butuh filter/kategori yang jelas.
3. Artist lain ingin melihat breakdown aset (wireframe, UV, texture maps) untuk referensi atau inspirasi workflow.

## 4. High-Level Requirements
- Website harus dapat diakses lewat browser modern (Chrome, Edge, Firefox, Safari) di desktop dan mobile, dengan fokus utama pengalaman terbaik di desktop/laptop untuk inspeksi 3D.
- Website harus ringan dan cepat di-load, meskipun menampilkan beberapa viewer 3D, dengan optimasi ukuran file `.glb` dan penggunaan lazy loading.
- Konten harus mudah di-update (menambah aset baru, edit deskripsi, update link sosial) tanpa perlu perubahan arsitektur besar.

## 5. Core Features (MVP)

### 5.1 Homepage / Hero Section
- Menampilkan nama kreator, role utama (misal: "3D Environment Artist"), tagline singkat, dan 1–3 highlight project (featured projects) dengan thumbnail besar.
- Tombol CTA utama: "View Portfolio" dan tombol sekunder "Contact" atau "Download CV".

### 5.2 Portfolio Grid (Gallery)
- Grid/list card project dengan gambar thumbnail (render still) dan label singkat (judul project, kategori, tahun).
- Filter/sort sederhana berdasarkan kategori, misalnya: `All, Props, Environment, Character, Vehicle, Others`.
- Klik pada card membuka halaman detail project atau modal detail dengan viewer 3D dan informasi lengkap.

### 5.3 Project Detail Page
Untuk setiap aset/proyek 3D, halaman detail minimal berisi:
- Judul proyek dan kategori (misal: "Sci-Fi Crate — Prop" atau "Modern Living Room — Environment").
- 1 image header (beauty render) resolusi cukup tinggi.
- Viewer 3D interaktif yang memuat file `.glb`.
- Deskripsi singkat tentang tujuan dan konteks proyek (personal work, freelance, game asset, dsb.).
- Informasi teknis: software yang digunakan (Blender, Substance Painter, ZBrush, dsb.), polycount, texture size (misal: 2K/4K), dan pipeline ringkas.
- Optional: beberapa gambar tambahan (wireframe, clay render, UV layout, texture maps) sebagai carousel atau grid image.

### 5.4 3D Asset Viewer (Interactive)
Viewer 3D adalah fitur inti yang memungkinkan user berinteraksi dengan aset `.glb` secara langsung di browser.

Minimum requirement:
- Bisa **rotate** (orbit camera), **zoom** (scroll), dan **pan**.
- Control sederhana dan familiar (drag untuk orbit, scroll untuk zoom, klik tengah/kanan untuk pan atau kombinasi tombol keyboard + mouse).
- UI minimalis dengan beberapa control penting:
  - Reset camera view ke posisi default.
  - Toggle antara beberapa preset lighting/environment (misal: studio light, HDRI outdoor).
  - Optional: toggle wireframe overlay.
- Viewer harus memuat file `.glb` yang sudah dioptimasi, misalnya menggunakan three.js, react-three-fiber, Babylon.js, atau library sejenis.

Terkait format `.blend`:
- `.blend` **tidak** perlu dimuat langsung di browser (karena bukan format web-ready), tetapi:
  - Dapat disimpan sebagai file downloadable (jika kreator ingin berbagi/source open untuk aset tertentu).
  - Ditampilkan sebagai informasi bahwa source file dibuat dengan Blender, dengan link download jika applicable.

### 5.5 About Page / Section
- Menjelaskan profil kreator (background, skillset, software yang dikuasai, pengalaman kerja/proyek relevan).
- Bisa berisi foto profil, statement singkat tentang style atau fokus utama (mis: stylized, realistic, hard-surface, organic).
- List software/tools utama (Blender, Maya, Unity/Unreal, Substance, dsb.).

### 5.6 Contact Section
- Form kontak sederhana: nama, email, subject, message.
- Alternatif: link langsung menuju email (mailto), LinkedIn, ArtStation, Instagram, Behance, dsb.
- Informasi timezone (mis: Jakarta, GMT+7) untuk memudahkan klien internasional mengatur jadwal meeting.

### 5.7 Responsive Layout (Basic)
- Layout yang tetap rapi di tablet dan mobile: grid portfolio berubah menjadi 1 kolom, viewer 3D tetap usable di layar kecil (minimal rotate & zoom).
- Navigasi yang mudah: sticky navbar sederhana dengan anchor ke section utama (Home, Portfolio, About, Contact).

## 6. Nice-to-Have Features (Non-MVP)
- **Dark/Light Theme Toggle** untuk menyesuaikan preferensi visual user.
- **Localization/Language Toggle** (misalnya Bahasa Indonesia dan Inggris) untuk menjangkau rekruter global.
- **Download Pack / Store** sederhana, jika kreator ingin menjual aset `.glb` / `.blend` (integrasi dengan Gumroad, Ko-fi, itch.io, atau payment gateway lainnya lewat link eksternal).
- **Blog/Devlog** singkat berisi breakdown proses pembuatan aset atau studi kasus project tertentu.
- **Analytics integration** (Google Analytics/umami/plausible) untuk tracking kunjungan dan perilaku user.

## 7. User Flow

### 7.1 First-Time Visitor (Recruiter)
1. Masuk ke Homepage dari link di CV/LinkedIn.
2. Melihat hero section dengan nama, role, dan 2–3 featured projects.
3. Scroll ke Portfolio Grid, klik 1–2 project yang paling menarik.
4. Di halaman project detail, bermain dengan 3D viewer, melihat beberapa angle, lalu baca info teknis singkat.
5. Pergi ke About/Contact untuk melihat background dan menghubungi kreator jika tertarik.

### 7.2 Client Looking for Specific Asset Type
1. Buka website dari hasil search atau referensi.
2. Langsung ke bagian Portfolio dan gunakan filter (misal pilih `Environment`).
3. Buka 1–3 project yang relevan, lihat 3D viewer dan gambar render.
4. Jika cocok dengan style/quality, klik Contact untuk kirim brief atau pertanyaan.

## 8. Architecture (High-Level)

### 8.1 Frontend
- Framework: **Next.js** (React + file-based routing, dukungan SSR/SSG untuk SEO dan performa).
- Styling: **Tailwind CSS** untuk utility-first styling.
- Komponen UI: **shadcn/ui** sebagai basis komponen yang konsisten (Button, Card, Dialog, Navbar, Tabs, dsb.).
- 3D Viewer: integrasi three.js atau react-three-fiber di dalam halaman Next.js untuk memuat `.glb`.

### 8.2 3D Viewer Module
- Menggunakan three.js / react-three-fiber.
- Dibungkus dalam komponen React, misalnya `<ModelViewer src="/models/xxx.glb" />`.
- Mendukung props untuk mengatur initial camera, environment, dan opsi kontrol.

### 8.3 Assets Storage
- File `.glb` dan gambar di-host sebagai static assets di `public/` atau via CDN/storage bucket.
- File `.blend` di-host serupa jika disediakan sebagai download.

### 8.4 Backend / APIs (Optional)
- API route Next.js untuk form contact (kirim email atau simpan ke service eksternal).
- Jika butuh CMS, bisa gunakan file-based (JSON/YAML/Markdown) atau service headless CMS eksternal.

Sequence sederhana untuk load halaman project detail:
1. User membuka URL `/projects/[slug]`.
2. Next.js melakukan fetch metadata project (bisa dari file markdown/JSON atau CMS).
3. Komponen React untuk 3D viewer di-mount dan memuat file `.glb` dari storage.
4. Setelah model ter-load, user bisa berinteraksi (orbit, zoom, pan) dan mengganti beberapa preset lighting.

## 9. Content Model / Data Schema (Simplified)

### 9.1 Entity: Project
- `id`
- `slug` (untuk URL)
- `title`
- `category` (enum: `props`, `environment`, `character`, `vehicle`, `other`)
- `year`
- `description_short`
- `description_long`
- `thumbnail_image_url`
- `hero_image_url`
- `glb_file_url` (opsional jika project tidak membutuhkan viewer 3D)
- `blend_file_url` (opsional, jika ingin menyediakan file .blend untuk download)
- `software_used` (array string)
- `polycount`
- `texture_resolution`
- `gallery_images` (array of image URLs)
- `is_featured` (boolean)

### 9.2 Entity: Profile
- `name`
- `role_title`
- `bio_short`
- `bio_long`
- `profile_image_url`
- `location`
- `skills` (array string)
- `software_list` (array string)
- `social_links` (object: { type, url })

## 10. Design & UX Guidelines
- Visual style bersih dan fokus pada karya, gunakan background netral (gelap atau abu-abu) yang membuat render 3D terlihat menonjol.
- Hindari animasi berlebihan yang mengganggu fokus ke aset 3D; gunakan animasi halus untuk hover, transition section, dan loading viewer.
- Pastikan teks kontras dan mudah dibaca, terutama di atas background gelap atau di sekitar viewer 3D.
- Navbar sederhana dengan highlight pada section aktif.

Typography:
- Gunakan kombinasi font sans dan mono (bisa memanfaatkan konfigurasi Tailwind + shadcn) untuk memisahkan teks biasa dan info teknis.

## 11. Technical Constraints & Considerations
- File `.glb` harus dioptimasi sebelum di-upload (pengurangan polycount jika perlu, compress texture, gunakan Draco/meshopt compression jika didukung stack).
- Batasi jumlah viewer 3D aktif dalam satu halaman (misal hanya 1 viewer aktif di project detail; di halaman grid cukup gunakan gambar render statis untuk performa).
- Pastikan fallback: jika browser/device tidak mendukung WebGL atau gagal memuat model, tampilkan pesan error yang ramah dan tetap tunjukkan beberapa gambar render statis.
- Pastikan website tetap fungsional sebatas konten statis utama (judul, gambar, deskripsi) meskipun JavaScript non-aktif; viewer 3D adalah progressive enhancement.

## 12. Out of Scope (Versi Pertama)
- Sistem akun user (login, register) untuk pengunjung.
- Fitur komunitas (komentar, like, rating aset, dsb.).
- Marketplace full (cart, checkout, payment gateway langsung di website).
- Editor 3D di browser (edit geometry/material langsung di web).
