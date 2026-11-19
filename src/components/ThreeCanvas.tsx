import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CELESTIAL_STOPS, PLANET_CONFIGS } from '../data/celestialStops';
import {
  generatePlanetTexture,
  generateRingTexture,
  createGlowSprite,
} from '../utils/proceduralTextures';

interface ThreeCanvasProps {
  activeStopIndex: number;
  isExploreMode: boolean;
  onUpdateActiveStop: (index: number) => void;
  onUpdateScrollPct: (pct: number) => void;
}

interface BodyItem {
  group: THREE.Group;
  mesh: THREE.Mesh;
  radius: number;
  rotSpeed: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  activeStopIndex,
  isExploreMode,
  onUpdateActiveStop,
  onUpdateScrollPct,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References to keep state across renders
  const isExploreRef = useRef(isExploreMode);
  isExploreRef.current = isExploreMode;

  const activeIndexRef = useRef(activeStopIndex);
  activeIndexRef.current = activeStopIndex;

  const onUpdateActiveStopRef = useRef(onUpdateActiveStop);
  onUpdateActiveStopRef.current = onUpdateActiveStop;

  const onUpdateScrollPctRef = useRef(onUpdateScrollPct);
  onUpdateScrollPctRef.current = onUpdateScrollPct;

  // Explore orbit parameters ref
  const exploreOrbitRef = useRef({
    theta: 0.35,
    phi: Math.PI * 0.44,
    radius: 75,
    isDragging: false,
    prevPointer: { x: 0, y: 0 },
  });

  // When activeStopIndex or isExploreMode changes in explore mode, update orbit radius
  useEffect(() => {
    if (isExploreMode) {
      const kf = getCameraKeyframe(activeStopIndex);
      exploreOrbitRef.current.radius = kf.inspectDist;
      exploreOrbitRef.current.theta = 0.35;
      exploreOrbitRef.current.phi = Math.PI * 0.44;
    }
  }, [activeStopIndex, isExploreMode]);

  // Keyframe calculator
  const bodiesRef = useRef<Record<string, BodyItem>>({});

  function getCameraKeyframe(index: number) {
    const isMobile = window.innerWidth < 768;

    if (index === 0) {
      // Overview Tata Surya
      return {
        pos: new THREE.Vector3(0, isMobile ? 42 : 28, isMobile ? 92 : 68),
        target: new THREE.Vector3(0, -2, -55),
        focusCenter: new THREE.Vector3(0, 0, -40),
        inspectDist: 75,
      };
    }

    if (index === 1) {
      // Matahari (Kartu di Kiri -> Matahari di Kanan dengan jarak napas lega)
      return {
        pos: new THREE.Vector3(isMobile ? 0 : -14.5, isMobile ? 5 : 2.5, isMobile ? 40 : 35),
        target: new THREE.Vector3(isMobile ? 0 : -8.5, isMobile ? -2.5 : 0, 0),
        focusCenter: new THREE.Vector3(0, 0, 0),
        inspectDist: 32,
      };
    }

    const stop = CELESTIAL_STOPS[index];
    const body = bodiesRef.current[stop.bodyKey];
    const c = body ? body.group.position.clone() : new THREE.Vector3();
    const r = body ? body.radius : 3;

    // Kalibrasi presisi jarak kamera (dist), offset posisi (posOffset) dan target (tgtOffset)
    // agar setiap planet:
    // 1) Berada di tengah ruang pandang yang nyaman (jarak lega ~120-180px dari kotak informasi)
    // 2) Aman dan berjarak lega dari navbar/progress bar di kanan
    // 3) Bulat sempurna (rasio W/H ~ 1.01, tanpa distorsi gepeng/oval)
    let dist = Math.max(r * 4.0, 8.5);
    let posOffset = 4.0;
    let tgtOffset = 2.0;

    if (index === 2) {
      // Merkurius (kartu di kanan -> Merkurius di kiri)
      dist = isMobile ? 10.0 : 10.2;
      posOffset = isMobile ? 0 : 4.0;
      tgtOffset = isMobile ? 0 : 2.0;
    } else if (index === 3) {
      // Venus (kartu di kiri -> Venus di kanan, seimbang di tengah area pandang kanan)
      dist = isMobile ? 11.5 : 10.8;
      posOffset = isMobile ? 0 : -4.2;
      tgtOffset = isMobile ? 0 : -2.2;
    } else if (index === 4) {
      // Bumi & Bulan (kartu di kanan -> Bumi di kiri dengan ruang bebas untuk orbit Bulan)
      dist = isMobile ? 13.0 : 12.2;
      posOffset = isMobile ? 0 : 5.4;
      tgtOffset = isMobile ? 0 : 2.6;
    } else if (index === 5) {
      // Mars (kartu di kiri -> Mars di kanan, seimbang di 64% layar & aman dari navbar)
      dist = isMobile ? 10.5 : 9.5;
      posOffset = isMobile ? 0 : -3.5;
      tgtOffset = isMobile ? 0 : -2.0;
    } else if (index === 6) {
      // Jupiter (raksasa gas terbesar, kartu di kanan -> Jupiter di kiri)
      dist = isMobile ? 29.0 : 26.0;
      posOffset = isMobile ? 0 : 9.6;
      tgtOffset = isMobile ? 0 : 4.6;
    } else if (index === 7) {
      // Saturnus (sistem cincin lebar hingga r=12.6, kartu di kiri -> Saturnus di kanan)
      dist = isMobile ? 32.0 : 30.0;
      posOffset = isMobile ? 0 : -7.5;
      tgtOffset = isMobile ? 0 : -3.8;
    } else if (index === 8) {
      // Uranus (raksasa es bercincin, kartu di kanan -> Uranus di kiri)
      dist = isMobile ? 18.0 : 16.0;
      posOffset = isMobile ? 0 : 6.2;
      tgtOffset = isMobile ? 0 : 3.0;
    } else if (index === 9) {
      // Neptunus (planet terluar, kartu di kiri -> Neptunus di kanan)
      dist = isMobile ? 16.5 : 14.5;
      posOffset = isMobile ? 0 : -4.8;
      tgtOffset = isMobile ? 0 : -2.5;
    }

    const yOffset = isMobile ? -r * 0.85 : 0;

    return {
      pos: new THREE.Vector3(c.x + posOffset, c.y + r * 0.45, c.z + dist),
      target: new THREE.Vector3(c.x + tgtOffset, c.y + yOffset, c.z),
      focusCenter: c,
      inspectDist: Math.max(r * 3.8, 8.0),
    };
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03050a, 0.0014);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. LIGHTING
    const ambientLight = new THREE.AmbientLight(0x283556, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xfff4dc, 2.4, 900, 0.35);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x88b4ff, 0.45);
    rimLight.position.set(20, 30, 40);
    scene.add(rimLight);

    // 4. STARFIELD
    const starCount = 4500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xffe9c4),
      new THREE.Color(0xcce4ff),
      new THREE.Color(0xffd2a1),
    ];

    for (let i = 0; i < starCount; i++) {
      const r = 180 + Math.random() * 650;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. SUN & PLANETS
    const bodies: Record<string, BodyItem> = {};

    // Sun at (0, 0, 0)
    const sunGroup = new THREE.Group();
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(9.5, 64, 64),
      new THREE.MeshBasicMaterial({ map: generatePlanetTexture('sun') })
    );
    sunGroup.add(sunMesh);
    sunGroup.add(createGlowSprite(0xff9911, 34, 0.85));
    sunGroup.add(createGlowSprite(0xff5500, 52, 0.35));
    scene.add(sunGroup);
    bodies.sun = { group: sunGroup, mesh: sunMesh, radius: 9.5, rotSpeed: 0.0018 };

    // Eight Planets
    PLANET_CONFIGS.forEach((cfg) => {
      const group = new THREE.Group();
      group.position.set(...cfg.pos);

      const geo = new THREE.SphereGeometry(cfg.radius, 64, 64);
      const mat = new THREE.MeshStandardMaterial({
        map: generatePlanetTexture(cfg.key),
        roughness: cfg.key === 'earth' ? 0.55 : 0.82,
        metalness: 0.06,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = cfg.tilt;
      group.add(mesh);

      // Atmospheric glow
      if (cfg.glow) {
        group.add(createGlowSprite(cfg.glow, cfg.radius * 2.95, 0.28));
      }

      // Rings (Saturn & Uranus)
      if (cfg.ring) {
        const ringGeo = new THREE.RingGeometry(cfg.ring.inner, cfg.ring.outer, 96);
        const posAttr = ringGeo.attributes.position;
        const uvAttr = ringGeo.attributes.uv;
        const v3 = new THREE.Vector3();
        for (let i = 0; i < posAttr.count; i++) {
          v3.fromBufferAttribute(posAttr, i);
          const dist = v3.length();
          const u = (dist - cfg.ring.inner) / (cfg.ring.outer - cfg.ring.inner);
          uvAttr.setXY(i, u, 0.5);
        }

        const ringMat = new THREE.MeshStandardMaterial({
          map: generateRingTexture(cfg.ring.saturn),
          side: THREE.DoubleSide,
          transparent: true,
          roughness: 0.75,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.rotation.y = cfg.tilt;
        group.add(ringMesh);
      }

      // Orbit line
      const orbitDist = Math.hypot(cfg.pos[0], cfg.pos[2]);
      const orbitCurve = new THREE.EllipseCurve(0, 0, orbitDist, orbitDist, 0, Math.PI * 2, false, 0);
      const orbitPoints = orbitCurve
        .getPoints(160)
        .map((p) => new THREE.Vector3(p.x, cfg.pos[1] * 0.25, p.y));
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08,
      });
      scene.add(new THREE.Line(orbitGeo, orbitMat));

      scene.add(group);
      bodies[cfg.key] = { group, mesh, radius: cfg.radius, rotSpeed: cfg.rotSpeed };
    });

    // Moon orbiting Earth
    const moonPivot = new THREE.Group();
    bodies.earth.group.add(moonPivot);
    const moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.68, 32, 32),
      new THREE.MeshStandardMaterial({ map: generatePlanetTexture('moon'), roughness: 0.9 })
    );
    moonMesh.position.set(4.8, 0.5, 0);
    moonPivot.add(moonMesh);

    bodiesRef.current = bodies;

    // 6. CAMERA POSITIONING & LERP
    const currentCamPos = new THREE.Vector3();
    const currentCamTarget = new THREE.Vector3();
    const desiredCamPos = new THREE.Vector3();
    const desiredCamTarget = new THREE.Vector3();

    const initKf = getCameraKeyframe(0);
    currentCamPos.copy(initKf.pos);
    currentCamTarget.copy(initKf.target);
    desiredCamPos.copy(initKf.pos);
    desiredCamTarget.copy(initKf.target);

    // 7. MOUSE PARALLAX & POINTER EVENTS
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handlePointerDown = (e: PointerEvent) => {
      if (!isExploreRef.current) return;
      exploreOrbitRef.current.isDragging = true;
      exploreOrbitRef.current.prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isExploreRef.current || !exploreOrbitRef.current.isDragging) return;
      const dx = e.clientX - exploreOrbitRef.current.prevPointer.x;
      const dy = e.clientY - exploreOrbitRef.current.prevPointer.y;
      exploreOrbitRef.current.prevPointer = { x: e.clientX, y: e.clientY };

      exploreOrbitRef.current.theta -= dx * 0.0075;
      exploreOrbitRef.current.phi = Math.max(
        0.15,
        Math.min(Math.PI - 0.15, exploreOrbitRef.current.phi - dy * 0.0075)
      );
    };

    const handlePointerUp = () => {
      exploreOrbitRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isExploreRef.current) return;
      e.preventDefault();
      exploreOrbitRef.current.radius = Math.max(
        3.5,
        Math.min(130, exploreOrbitRef.current.radius + e.deltaY * 0.025)
      );
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 8. RESIZE LISTENER
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP
    let animId: number;

    const updateCameraTargets = () => {
      const scrollY = window.scrollY;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)));
      onUpdateScrollPctRef.current(pct);

      if (isExploreRef.current) {
        const kf = getCameraKeyframe(activeIndexRef.current);
        const center = kf.focusCenter;
        const { theta, phi, radius } = exploreOrbitRef.current;
        desiredCamTarget.copy(center);
        desiredCamPos.set(
          center.x + radius * Math.sin(phi) * Math.sin(theta),
          center.y + radius * Math.cos(phi),
          center.z + radius * Math.sin(phi) * Math.cos(theta)
        );
        return;
      }

      // Scrollytelling calculation
      const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-index]'));
      if (sections.length === 0) return;

      const viewCenter = scrollY + window.innerHeight * 0.5;
      let idxA = 0;
      let idxB = 0;
      let blend = 0;

      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].offsetTop;
        const height = sections[i].offsetHeight;
        const mid = top + height * 0.5;

        if (i < sections.length - 1) {
          const nextMid = sections[i + 1].offsetTop + sections[i + 1].offsetHeight * 0.5;
          if (viewCenter >= mid && viewCenter <= nextMid) {
            idxA = i;
            idxB = i + 1;
            const rawT = (viewCenter - mid) / Math.max(1, nextMid - mid);
            // Smoothstep
            blend = rawT * rawT * (3 - 2 * rawT);
            break;
          }
        }
        if (viewCenter < sections[0].offsetTop + sections[0].offsetHeight * 0.5) {
          idxA = 0;
          idxB = 0;
          blend = 0;
        } else if (i === sections.length - 1 && viewCenter >= mid) {
          idxA = sections.length - 1;
          idxB = sections.length - 1;
          blend = 0;
        }
      }

      const nearestIdx = blend > 0.5 ? idxB : idxA;
      if (nearestIdx !== activeIndexRef.current) {
        onUpdateActiveStopRef.current(nearestIdx);
      }

      const kfA = getCameraKeyframe(idxA);
      const kfB = getCameraKeyframe(idxB);

      desiredCamPos.lerpVectors(kfA.pos, kfB.pos, blend);
      desiredCamTarget.lerpVectors(kfA.target, kfB.target, blend);

      // Micro-parallax
      desiredCamPos.x += mouseX * 0.9;
      desiredCamPos.y -= mouseY * 0.65;
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotations
      Object.values(bodies).forEach((b) => {
        b.mesh.rotation.y += b.rotSpeed;
      });
      moonPivot.rotation.y += 0.015;
      starField.rotation.y += 0.00012;

      // Camera interpolation
      updateCameraTargets();
      currentCamPos.lerp(desiredCamPos, 0.075);
      currentCamTarget.lerp(desiredCamTarget, 0.085);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamTarget);

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="webgl-container" ref={containerRef}></div>;
};
