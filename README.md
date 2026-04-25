# Digital Entrepreneurship — 3D Asset Portfolio

Personal portfolio website untuk memamerkan karya 3D secara interaktif langsung di browser. Dibangun untuk kebutuhan 3D artist yang ingin menampilkan aset-asetnya secara profesional kepada rekruter, klien, dan sesama artist.

## Fitur

- **3D Viewer Interaktif** — eksplorasi model `.glb` langsung di browser (rotate, zoom, pan)
- **Portfolio Grid** — galeri karya dengan kategori (Animal, Building, Equipment, Item, dan lainnya)
- **Project Detail** — informasi teknis tiap aset (software, polycount, deskripsi)
- **About & Contact** — profil kreator dan form kontak
- **Responsive** — tampilan optimal di desktop dan mobile

## Kategori Aset 3D

| Kategori | Contoh |
|----------|--------|
| Animal / Sea | Ikan, makhluk laut, sea creatures |
| Building | Rumah jamur, arsitektur fantasy |
| Equipment | Pedang, perisai, armor, aksesori |
| Item | Potion, useable items |

## Tech Stack

- **Framework** — [Next.js](https://nextjs.org/) (App Router)
- **Styling** — [Tailwind CSS](https://tailwindcss.com/)
- **UI Components** — [shadcn/ui](https://ui.shadcn.com/)
- **3D Rendering** — Three.js / React Three Fiber
- **Language** — TypeScript

## Struktur Folder

```
├── src/
│   ├── app/              # Next.js App Router (pages & API routes)
│   ├── components/       # Komponen UI (navbar, viewer, portfolio, dll)
│   └── lib/              # Data project & helper functions
├── 3D-ASSET/             # File .glb aset 3D (lokal, tidak di-push ke repo)
├── public/               # Static assets
└── prd-portfolio-3d.md   # Product Requirements Document
```

## Menjalankan Lokal

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Build & Deploy

```bash
npm run build
npm run start
```

## Catatan

File `.glb` aset 3D berukuran besar (beberapa hingga 100MB+) disimpan lokal dan tidak dimasukkan ke repository. Untuk deployment production, aset 3D direkomendasikan di-host via CDN seperti Cloudflare R2 atau layanan storage sejenis.

---

*Dibuat dengan Next.js + Three.js | 3D assets dibuat di Blender*
