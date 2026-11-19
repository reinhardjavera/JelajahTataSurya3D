import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ duration = 1100 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Smooth progress simulation
    const pTimer1 = setTimeout(() => setProgress(65), 300);
    const pTimer2 = setTimeout(() => setProgress(100), 750);

    // Start fading out after duration
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration);

    // Remove from DOM after fade animation completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration + 700);

    return () => {
      clearTimeout(pTimer1);
      clearTimeout(pTimer2);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#03050a] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient cosmic glow */}
      <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>

      <div className="relative flex flex-col items-center gap-6 z-10">
        {/* Animated 3D Planet & Orbital Ring Loader */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer glowing orbital ring */}
          <div className="absolute inset-0 rounded-full border border-amber-400/20 border-t-amber-400 animate-spin [animation-duration:2.5s] shadow-[0_0_15px_rgba(251,191,36,0.25)]"></div>
          {/* Secondary counter-rotating ring */}
          <div className="absolute inset-2 rounded-full border border-cyan-400/20 border-b-cyan-400 animate-spin [animation-duration:3.8s] [animation-direction:reverse]"></div>

          {/* Glowing Nova Star Core */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-200 animate-pulse [animation-duration:1.8s] shadow-[0_0_24px_#fbbf24] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></div>
          </div>
        </div>

        {/* Brand & Loading Label */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="font-display font-bold tracking-wider text-xl sm:text-2xl text-white">
            ASTRO<span className="text-amber-400">NOVA</span>
          </div>
          <span className="font-mono text-[11px] tracking-widest text-amber-300/80 uppercase">
            MEMPERSIAPKAN TATA SURYA 3D...
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-44 h-1 bg-white/10 rounded-full overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_#fbbf24]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
