export type CelestialBodyKey =
  | 'overview'
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

export interface CelestialStop {
  id: string;
  label: string;
  short: string;
  bodyKey: CelestialBodyKey;
  category: string;
  desc: string;
}

export interface PlanetStat {
  label: string;
  value: string;
  valueColor?: string;
}

export interface SectionContent {
  id: string;
  index: number;
  badge: string;
  subBadge?: string;
  title: string;
  titleGradient?: boolean;
  descriptionHtml: string;
  stats?: PlanetStat[];
  ctaText?: string;
  ctaHref?: string;
  align: 'left' | 'right';
  minHeightClass: string;
  isEnd?: boolean;
}

export interface PlanetConfig {
  key: CelestialBodyKey;
  radius: number;
  pos: [number, number, number];
  rotSpeed: number;
  tilt: number;
  glow: number | null;
  ring?: {
    inner: number;
    outer: number;
    saturn: boolean;
  };
}

export interface KeyframeData {
  pos: [number, number, number];
  target: [number, number, number];
  focusCenter: [number, number, number];
  inspectDist: number;
}
