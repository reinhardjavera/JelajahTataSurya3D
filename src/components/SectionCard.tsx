import React from 'react';
import { SectionContent } from '../types';

interface SectionCardProps {
  section: SectionContent;
  isActive: boolean;
  onNavigate?: (index: number) => void;
}

const BADGE_COLOR_MAP: Record<number, string> = {
  1: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
  2: 'bg-stone-400/15 border-stone-400/30 text-stone-300',
  3: 'bg-yellow-500/15 border-yellow-400/30 text-yellow-200',
  4: 'bg-sky-500/15 border-sky-400/30 text-sky-300',
  5: 'bg-orange-500/15 border-orange-400/30 text-orange-300',
  6: 'bg-amber-600/20 border-amber-500/35 text-amber-200',
  7: 'bg-yellow-300/15 border-yellow-300/30 text-yellow-200',
  8: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
  9: 'bg-indigo-500/20 border-indigo-400/35 text-indigo-300',
};

export const SectionCard: React.FC<SectionCardProps> = ({ section, isActive, onNavigate }) => {
  const isOverview = section.index === 0;

  if (isOverview) {
    return (
      <section
        id={section.id}
        data-index={section.index}
        className={`flex items-center px-5 sm:px-12 sm:pr-40 lg:px-20 lg:pr-52 ${section.minHeightClass}`}
      >
        <div
          className={`max-w-2xl planet-card glass-card rounded-3xl p-7 sm:p-10 ${
            isActive ? 'is-active' : ''
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono font-semibold text-xs mb-5">
            <span>{section.badge}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-5">
            {section.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-300">
              Tata Surya
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-7">
            {section.descriptionHtml}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#section-sun"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(1);
                }
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-display font-bold text-sm sm:text-base hover:brightness-110 transition shadow-lg shadow-amber-500/25"
            >
              Mulai Perjalanan ↓
            </a>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 animate-float">
              <span>SCROLL KE BAWAH</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const badgeColor =
    BADGE_COLOR_MAP[section.index] || 'bg-amber-500/15 border-amber-400/30 text-amber-300';

  return (
    <section
      id={section.id}
      data-index={section.index}
      className={`flex items-center ${
        section.align === 'right' ? 'justify-end' : 'justify-start'
      } px-5 sm:px-10 sm:pr-36 lg:px-20 lg:pr-52 ${section.minHeightClass}`}
    >
      <div
        className={`max-w-lg lg:max-w-xl w-full planet-card glass-card rounded-3xl p-7 sm:p-9 ${
          isActive ? 'is-active' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`font-mono font-semibold text-xs px-3 py-1 rounded-full border ${badgeColor}`}>
            {section.badge}
          </span>
          {section.subBadge && (
            <span className="font-mono font-medium text-xs text-slate-400">
              {section.subBadge}
            </span>
          )}
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
          {section.title}
        </h2>

        <p
          className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: section.descriptionHtml }}
        />

        {section.stats && (
          <div className={`grid grid-cols-2 gap-3 pt-4 border-t border-white/10 ${section.isEnd ? 'mb-6' : ''}`}>
            {section.stats.map((stat, sIdx) => (
              <div key={sIdx} className="bg-white/[0.03] rounded-2xl p-3.5">
                <div className="text-[11px] font-mono font-medium text-slate-400 uppercase">
                  {stat.label}
                </div>
                <div
                  className={`font-display font-semibold text-base sm:text-lg mt-0.5 ${
                    stat.valueColor || 'text-white'
                  }`}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {section.isEnd && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono font-medium text-slate-400">
              AKHIR EKSPEDISI TATA SURYA
            </span>
            <a
              href="#section-overview"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(0);
                }
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-display font-semibold text-white transition cursor-pointer"
            >
              ↑ Kembali ke Awal
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
