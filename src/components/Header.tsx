import React from 'react';
import { CELESTIAL_STOPS } from '../data/celestialStops';

interface HeaderProps {
  activeStopIndex: number;
  scrollPct: number;
  isExploreMode: boolean;
  onToggleExplore: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeStopIndex,
  scrollPct,
  isExploreMode,
  onToggleExplore,
}) => {
  const currentStop = CELESTIAL_STOPS[activeStopIndex] || CELESTIAL_STOPS[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-none">
      {/* Brand */}
      <a
        href="#section-overview"
        className="pointer-events-auto glass-pill px-4 py-2 rounded-full flex items-center gap-2.5 hover:border-white/25 transition"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]"></span>
        <span className="font-display font-bold tracking-wider text-sm sm:text-base text-white">
          ASTRO<span className="text-amber-400">NOVA</span>
        </span>
      </a>

      {/* Center HUD Status */}
      <div className="pointer-events-auto glass-pill px-4 py-2 rounded-full hidden md:flex items-center gap-3 text-xs font-mono">
        <span className="text-slate-400">OBJEK AKTIF:</span>
        <span className="text-amber-300 font-semibold">{currentStop.label}</span>
        <span className="text-white/20">|</span>
        <span className="text-slate-300">{scrollPct}%</span>
      </div>

      {/* Interactive Mode Toggle */}
      <button
        type="button"
        onClick={onToggleExplore}
        className="pointer-events-auto glass-pill px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-200 hover:text-white hover:border-amber-400/50 transition flex items-center gap-2"
      >
        <span className="text-amber-400">◎</span>
        <span>{isExploreMode ? 'Kembali ke Scrollytelling' : 'Eksplorasi 360°'}</span>
      </button>
    </header>
  );
};
