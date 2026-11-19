import React, { useEffect, useRef } from 'react';
import { CELESTIAL_STOPS } from '../data/celestialStops';

interface MobileNavProps {
  activeStopIndex: number;
  onSelectPlanet: (index: number) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeStopIndex,
  onSelectPlanet,
}) => {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeEl = itemRefs.current[activeStopIndex];
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeStopIndex]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    onSelectPlanet(index);
  };

  return (
    <nav
      aria-label="Navigasi Planet Mobile"
      className="fixed bottom-3 left-3 right-3 z-30 sm:hidden glass-pill rounded-2xl p-1.5 overflow-x-auto"
    >
      <div id="mobile-nav-list" className="flex items-center gap-1 min-w-max">
        {CELESTIAL_STOPS.map((stop, idx) => {
          const isCurrent = idx === activeStopIndex;
          return (
            <a
              key={stop.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              href={`#${stop.id}`}
              onClick={(e) => handleClick(e, idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                isCurrent
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400'
              }`}
            >
              {stop.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
