import { CelestialStop, PlanetConfig } from '../types';

export const CELESTIAL_STOPS: CelestialStop[] = [
  { id: 'section-overview', label: 'Tata Surya', short: '00', bodyKey: 'overview', category: '00 • EKSPEDISI ANTARIKSA', desc: 'Tinjauan menyeluruh lintasan orbit Matahari dan delapan planet Tata Surya.' },
  { id: 'section-sun',      label: 'Matahari',   short: '01', bodyKey: 'sun',      category: '01 • BINTANG KATAK KUNING', desc: 'Pusat energi Tata Surya (99,86% total massa) dengan suhu inti 15 juta °C.' },
  { id: 'section-mercury',  label: 'Merkurius',  short: '02', bodyKey: 'mercury',  category: '02 • PLANET TERESTRIAL', desc: 'Planet terkecil & terdekat dari Matahari dengan permukaan penuh kawah purba.' },
  { id: 'section-venus',    label: 'Venus',      short: '03', bodyKey: 'venus',    category: '03 • PLANET TERESTRIAL', desc: 'Planet terpanas (465 °C) dengan atmosfer asam sulfat pekat & rotasi terbalik.' },
  { id: 'section-earth',    label: 'Bumi',       short: '04', bodyKey: 'earth',    category: '04 • ZONA LAYAK HUNI', desc: 'Satu-satunya dunia berair cair stabil dengan kehidupan, ditemani Bulan.' },
  { id: 'section-mars',     label: 'Mars',       short: '05', bodyKey: 'mars',     category: '05 • PLANET TERESTRIAL', desc: 'Planet Merah kaya oksida besi dengan gunung berapi raksasa Olympus Mons.' },
  { id: 'section-jupiter',  label: 'Jupiter',    short: '06', bodyKey: 'jupiter',  category: '06 • RAKSASA GAS', desc: 'Planet terbesar di Tata Surya dengan badai abadi Bintik Merah Raksasa.' },
  { id: 'section-saturn',   label: 'Saturnus',   short: '07', bodyKey: 'saturn',   category: '07 • RAKSASA GAS BERCINCIN', desc: 'Dikelilingi sistem cincin es & batuan kosmik selebar 282.000 km.' },
  { id: 'section-uranus',   label: 'Uranus',     short: '08', bodyKey: 'uranus',   category: '08 • RAKSASA ES', desc: 'Raksasa es biru kehijauan dengan kemiringan sumbu ekstrem 98 derajat.' },
  { id: 'section-neptune',  label: 'Neptunus',   short: '09', bodyKey: 'neptune',  category: '09 • RAKSASA ES TERLUAR', desc: 'Planet terjauh dengan badai angin supersonik hingga 2.100 km/jam.' },
];

export const PLANET_CONFIGS: PlanetConfig[] = [
  { key: 'mercury', radius: 1.45, pos: [24, 1.5, -14],   rotSpeed: 0.004,  tilt: 0.03, glow: null },
  { key: 'venus',   radius: 2.35, pos: [-38, -2.0, -34], rotSpeed: -0.002, tilt: 3.09, glow: 0xf7d07a },
  { key: 'earth',   radius: 2.55, pos: [48, 2.5, -60],   rotSpeed: 0.006,  tilt: 0.41, glow: 0x4da6ff },
  { key: 'mars',    radius: 1.85, pos: [-56, -1.5, -88], rotSpeed: 0.0055, tilt: 0.44, glow: 0xff6b42 },
  { key: 'jupiter', radius: 6.40, pos: [74, 3.0, -124],  rotSpeed: 0.011,  tilt: 0.05, glow: 0xe6b88a },
  { key: 'saturn',  radius: 5.30, pos: [-84, -2.5, -166],rotSpeed: 0.0095, tilt: 0.47, glow: 0xf0d799, ring: { inner: 6.8, outer: 12.6, saturn: true } },
  { key: 'uranus',  radius: 3.60, pos: [90, 2.0, -208],  rotSpeed: -0.007, tilt: 1.71, glow: 0x6be5f7, ring: { inner: 4.6, outer: 6.4, saturn: false } },
  { key: 'neptune', radius: 3.45, pos: [-92, -1.5, -248],rotSpeed: 0.0075, tilt: 0.49, glow: 0x3b6ef5 },
];
