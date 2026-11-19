# 🌌 ASTRONOVA — Eksplorasi Tata Surya 3D Scrollytelling

Aplikasi visualisasi 3D interaktif Tata Surya dengan konsep **Scrollytelling sinematik** dan **Mode Inspeksi Bebas 360°**, kini direfaktor ke dalam modern tech stack: **React 18 + TypeScript + Vite + Tailwind CSS + Three.js**.

---

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/) (Instant HMR)
- **3D Engine**: [Three.js](https://threejs.org/) (WebGL, Procedural Textures tanpa aset eksternal)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Glassmorphism UI
- **Typography**: Google Fonts (_Sora_ & _Plus Jakarta Sans_)

---

## 📁 Struktur Proyek Modular

Sebelumnya seluruh kode (~1400 baris) berada dalam 1 file HTML tunggal. Sekarang telah dipecah secara rapi dan modular:

```text
JelajahTataSurya3D/
├── index.html                    # Entry point HTML & font link
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build configuration
├── tailwind.config.js            # Tailwind theme & color setup
├── postcss.config.js             # PostCSS plugins
│
├── src/
│   ├── main.tsx                  # React DOM root render
│   ├── App.tsx                   # Main layout & state orchestrator
│   │
│   ├── types/
│   │   └── index.ts              # Interface & Type definition lengkap
│   │
│   ├── data/
│   │   ├── celestialStops.ts     # Metadata & konfigurasi waypoint 3D
│   │   └── sectionsData.ts       # Konten narasi editorial & data sains planet
│   │
│   ├── utils/
│   │   └── proceduralTextures.ts # Generator tekstur prosedural Canvas 2D -> WebGL
│   │
│   ├── components/
│   │   ├── ThreeCanvas.tsx       # WebGL 3D Scene, Starfield, Camera lerp, Orbit 360°
│   │   ├── Header.tsx            # Top Brand, HUD status aktif & Toggle 360°
│   │   ├── ExploreBanner.tsx     # Floating control dock saat mode inspeksi 360°
│   │   ├── SideNav.tsx           # Vertical quick-jump rail (Desktop)
│   │   ├── MobileNav.tsx         # Bottom quick-jump rail (Mobile)
│   │   └── SectionCard.tsx       # Kartu scrollytelling glassmorphism & statistik
│   │
│   └── styles/
│       └── index.css             # Tailwind imports, custom scrollbar & animations
```

---

## ✨ Fitur Utama

1. **Scrollytelling Sinematik**: Kamera 3D bergerak halus mengikuti posisi scroll halaman, bergantian menyorot planet dari sudut terbaik.
2. **Mode Inspeksi Bebas 360°**: Tekan tombol _Eksplorasi 360°_ untuk memutar kamera bebas menggunakan mouse/touch drag dan zoom in/out dengan scroll wheel.
3. **Tekstur Prosedural Otomatis**: Semua tekstur permukaan planet (badai Jupiter, benua Bumi, cincin Saturnus, dll.) di-render secara prosedural langsung via kode kanvas (tidak membutuhkan download gambar eksternal sehingga tidak akan pernah broken link).
4. **Navigasi Multi-Perangkat**: Dilengkapi desktop side rail dan mobile bottom bar dengan auto-scroll center pada planet yang sedang aktif.
