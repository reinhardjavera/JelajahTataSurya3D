import React from 'react';
import { CELESTIAL_STOPS } from '../data/celestialStops';

interface ExploreBannerProps {
  activeStopIndex: number;
  isExploreMode: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export const ExploreBanner: React.FC<ExploreBannerProps> = ({
  activeStopIndex,
  isExploreMode,
  onPrev,
  onNext,
  onSelect,
}) => {
  if (!isExploreMode) return null;

  const currentStop = CELESTIAL_STOPS[activeStopIndex] || CELESTIAL_STOPS[0];

  return (
    <div
      id="explore-banner"
      className="fixed bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 glass-pill px-4 py-3 rounded-2xl max-w-xl w-[94%] border-amber-400/40 shadow-2xl"
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-display font-semibold text-white transition flex items-center gap-1"
          >
            <span>‹</span>
            <span>Sebelumnya</span>
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
              {currentStop.category}
            </span>
            <select
              aria-label="Pilih Objek Tata Surya"
              value={activeStopIndex}
              onChange={(e) => onSelect(Number(e.target.value))}
              className="bg-transparent font-display font-bold text-sm sm:text-base text-white focus:outline-none cursor-pointer text-center"
            >
              {CELESTIAL_STOPS.map((stop, idx) => (
                <option key={stop.id} value={idx} className="bg-slate-950 text-white">
                  {stop.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-display font-semibold text-white transition flex items-center gap-1"
          >
            <span>Berikutnya</span>
            <span>›</span>
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 text-center leading-snug border-t border-white/10 pt-2">
          {currentStop.desc}
          <span className="block text-slate-400 mt-1">
            Seret layar untuk memutar kamera 360°, gulir roda mouse / cubit untuk zoom.
          </span>
        </p>
      </div>
    </div>
  );
};
