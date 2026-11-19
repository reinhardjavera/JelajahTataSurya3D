import React from 'react';
import { CELESTIAL_STOPS } from '../data/celestialStops';

interface SideNavProps {
  activeStopIndex: number;
  onSelectPlanet: (index: number) => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  activeStopIndex,
  onSelectPlanet,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    onSelectPlanet(index);
  };

  return (
    <nav
      aria-label="Navigasi Planet"
      className="fixed right-4 lg:right-7 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-end gap-2"
    >
      <div id="side-nav-list" className="glass-pill py-3 px-2.5 rounded-2xl flex flex-col gap-1.5">
        {CELESTIAL_STOPS.map((stop, idx) => {
          const isCurrent = idx === activeStopIndex;
          return (
            <a
              key={stop.id}
              href={`#${stop.id}`}
              onClick={(e) => handleClick(e, idx)}
              className={`group flex items-center justify-end gap-2.5 py-1 px-2 rounded-lg text-xs transition ${
                isCurrent ? 'text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span
                className={`font-medium transition ${
                  isCurrent ? 'opacity-100 font-semibold' : 'opacity-75 group-hover:opacity-100'
                }`}
              >
                {stop.label}
              </span>
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-amber-400 scale-125 shadow-[0_0_8px_#fbbf24]'
                    : 'bg-white/25 group-hover:bg-amber-400'
                }`}
              ></span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
