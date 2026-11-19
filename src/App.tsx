import React, { useState, useEffect, useCallback } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Header } from './components/Header';
import { ExploreBanner } from './components/ExploreBanner';
import { SideNav } from './components/SideNav';
import { MobileNav } from './components/MobileNav';
import { SectionCard } from './components/SectionCard';
import { SECTIONS_DATA } from './data/sectionsData';
import { CELESTIAL_STOPS } from './data/celestialStops';

export const App: React.FC = () => {
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [isExploreMode, setIsExploreMode] = useState(false);

  // Always reset scroll to the beginning (Overview) on page load/refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.scrollTo(0, 0);
      }
    };

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Sync explore-active class to body
  useEffect(() => {
    document.body.classList.toggle('explore-active', isExploreMode);
  }, [isExploreMode]);

  const syncBackgroundScrollToSection = useCallback((index: number) => {
    const targetSec = document.querySelector<HTMLElement>(`section[data-index="${index}"]`);
    if (!targetSec) return;
    const targetScrollY =
      targetSec.offsetTop + Math.max(0, (targetSec.offsetHeight - window.innerHeight) * 0.5);
    window.scrollTo({ top: targetScrollY, behavior: 'auto' });
  }, []);

  const switchExplorePlanet = useCallback(
    (newIndex: number) => {
      const total = CELESTIAL_STOPS.length;
      const wrappedIndex = (newIndex + total) % total;
      setActiveStopIndex(wrappedIndex);
      syncBackgroundScrollToSection(wrappedIndex);
    },
    [syncBackgroundScrollToSection]
  );

  const scrollToSection = useCallback(
    (newIndex: number) => {
      const total = CELESTIAL_STOPS.length;
      const wrappedIndex = (newIndex + total) % total;
      setActiveStopIndex(wrappedIndex);

      if (isExploreMode) {
        syncBackgroundScrollToSection(wrappedIndex);
      } else {
        const targetSec = document.querySelector<HTMLElement>(`section[data-index="${wrappedIndex}"]`);
        if (!targetSec) return;
        const targetScrollY =
          targetSec.offsetTop + Math.max(0, (targetSec.offsetHeight - window.innerHeight) * 0.5);
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    },
    [isExploreMode, syncBackgroundScrollToSection]
  );

  const handleToggleExplore = useCallback(() => {
    setIsExploreMode((prev) => {
      const nextMode = !prev;
      if (nextMode) {
        switchExplorePlanet(activeStopIndex);
      } else {
        syncBackgroundScrollToSection(activeStopIndex);
      }
      return nextMode;
    });
  }, [activeStopIndex, switchExplorePlanet, syncBackgroundScrollToSection]);

  return (
    <>
      {/* Initial Page Load / Refresh Cosmic Loader */}
      <LoadingScreen duration={1000} />

      {/* 3D WebGL Canvas */}
      <ThreeCanvas
        activeStopIndex={activeStopIndex}
        isExploreMode={isExploreMode}
        onUpdateActiveStop={setActiveStopIndex}
        onUpdateScrollPct={setScrollPct}
      />

      {/* Top Header */}
      <Header
        activeStopIndex={activeStopIndex}
        scrollPct={scrollPct}
        isExploreMode={isExploreMode}
        onToggleExplore={handleToggleExplore}
        onSelectPlanet={scrollToSection}
      />

      {/* Explore Mode Bottom Floating Dock */}
      <ExploreBanner
        activeStopIndex={activeStopIndex}
        isExploreMode={isExploreMode}
        onPrev={() => switchExplorePlanet(activeStopIndex - 1)}
        onNext={() => switchExplorePlanet(activeStopIndex + 1)}
        onSelect={switchExplorePlanet}
      />

      {/* Desktop Side Navigation Rail */}
      <SideNav
        activeStopIndex={activeStopIndex}
        onSelectPlanet={scrollToSection}
      />

      {/* Mobile Bottom Navigation Rail */}
      <MobileNav
        activeStopIndex={activeStopIndex}
        onSelectPlanet={scrollToSection}
      />

      {/* Scrollytelling Editorial Overlay */}
      <main id="scroll-content" className="relative z-10">
        {SECTIONS_DATA.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            isActive={section.index === activeStopIndex}
            onNavigate={scrollToSection}
          />
        ))}
      </main>
    </>
  );
};

export default App;
