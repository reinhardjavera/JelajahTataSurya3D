import * as THREE from 'three';

export function createNoiseHelper(seed = 1) {
  let s = seed;
  return function rand() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generatePlanetTexture(type: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;

  if (type === 'sun') {
    const rand = createNoiseHelper(101);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ff9d00');
    grad.addColorStop(0.5, '#ff5500');
    grad.addColorStop(1, '#ffae00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Granulasi & suar plasma
    for (let i = 0; i < 4200; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const r = 2 + rand() * 16;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = rand() > 0.45
        ? `rgba(255, 240, 140, ${0.06 + rand() * 0.14})`
        : `rgba(210, 45, 0, ${0.06 + rand() * 0.14})`;
      ctx.fill();
    }
  }

  else if (type === 'mercury') {
    const rand = createNoiseHelper(202);
    ctx.fillStyle = '#8e8a84';
    ctx.fillRect(0, 0, w, h);

    // Variasi dataran berbatu
    for (let i = 0; i < 1500; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const r = 4 + rand() * 25;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = rand() > 0.5 ? 'rgba(170,165,158,0.12)' : 'rgba(90,86,82,0.14)';
      ctx.fill();
    }
    // Kawah-kawah ikonik
    for (let i = 0; i < 180; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const r = 3 + rand() * 22;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(65, 62, 58, 0.45)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(205, 200, 192, 0.35)';
      ctx.stroke();
    }
  }

  else if (type === 'venus') {
    const rand = createNoiseHelper(303);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#d6a449');
    grad.addColorStop(0.35, '#f2cf7e');
    grad.addColorStop(0.65, '#dfa84c');
    grad.addColorStop(1, '#c48d35');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Pusaran atmosfer sulfur tebal
    for (let i = 0; i < 240; i++) {
      const y = rand() * h;
      const bandH = 4 + rand() * 18;
      ctx.fillStyle = rand() > 0.5
        ? `rgba(255, 243, 196, ${0.07 + rand() * 0.12})`
        : `rgba(175, 110, 28, ${0.07 + rand() * 0.12})`;
      ctx.beginPath();
      ctx.ellipse(w * 0.5, y, w * 0.65, bandH, (rand() - 0.5) * 0.08, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  else if (type === 'earth') {
    const rand = createNoiseHelper(404);
    // Samudra dalam
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
    oceanGrad.addColorStop(0, '#0a2e5c');
    oceanGrad.addColorStop(0.5, '#0e4d92');
    oceanGrad.addColorStop(1, '#0a2e5c');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);

    // Benua-benua prosedural
    const continents = [
      { x: 220, y: 175, rx: 85, ry: 55 },
      { x: 290, y: 310, rx: 55, ry: 85 },
      { x: 520, y: 165, rx: 95, ry: 50 },
      { x: 545, y: 280, rx: 65, ry: 85 },
      { x: 720, y: 190, rx: 120, ry: 65 },
      { x: 820, y: 345, rx: 55, ry: 40 },
    ];

    continents.forEach(c => {
      for (let j = 0; j < 42; j++) {
        const ox = c.x + (rand() - 0.5) * c.rx * 1.4;
        const oy = c.y + (rand() - 0.5) * c.ry * 1.3;
        const rad = 14 + rand() * 32;
        ctx.beginPath();
        ctx.arc(ox, oy, rad, 0, Math.PI * 2);
        ctx.fillStyle = rand() > 0.32 ? '#2e7d43' : '#8c7a48';
        ctx.fill();
      }
    });

    // Tutupan es kutub
    ctx.fillStyle = 'rgba(245, 250, 255, 0.9)';
    ctx.fillRect(0, 0, w, 24);
    ctx.fillRect(0, h - 24, w, 24);

    // Lapisan awan tipis
    for (let i = 0; i < 260; i++) {
      const x = rand() * w;
      const y = 30 + rand() * (h - 60);
      ctx.beginPath();
      ctx.ellipse(x, y, 18 + rand() * 55, 4 + rand() * 10, (rand() - 0.5) * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.14 + rand() * 0.22})`;
      ctx.fill();
    }
  }

  else if (type === 'moon') {
    const rand = createNoiseHelper(450);
    ctx.fillStyle = '#b4b7bd';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 140; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const r = 4 + rand() * 24;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(115, 118, 125, 0.45)';
      ctx.fill();
    }
  }

  else if (type === 'mars') {
    const rand = createNoiseHelper(505);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#c95b36');
    grad.addColorStop(0.5, '#b84221');
    grad.addColorStop(1, '#9c3317');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dataran basalt gelap & debu karat
    for (let i = 0; i < 420; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const r = 8 + rand() * 45;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = rand() > 0.45
        ? 'rgba(72, 24, 12, 0.22)'
        : 'rgba(232, 122, 74, 0.16)';
      ctx.fill();
    }
    // Tudung es kutub Mars
    ctx.fillStyle = 'rgba(255, 248, 244, 0.85)';
    ctx.fillRect(0, 0, w, 16);
    ctx.fillRect(0, h - 16, w, 16);
  }

  else if (type === 'jupiter') {
    const rand = createNoiseHelper(606);
    const palette = ['#d8c5a8', '#b87b4b', '#e6dac5', '#9c5a32', '#cfa378', '#ede3d3', '#a6633c'];
    let y = 0;
    let idx = 0;
    while (y < h) {
      const bandHeight = 14 + rand() * 28;
      ctx.fillStyle = palette[idx % palette.length];
      ctx.fillRect(0, y, w, bandHeight + 2);
      y += bandHeight;
      idx++;
    }

    // Turbulensi awan
    for (let i = 0; i < 400; i++) {
      const wx = rand() * w;
      const wy = rand() * h;
      ctx.beginPath();
      ctx.ellipse(wx, wy, 15 + rand() * 40, 2 + rand() * 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 245, 230, ${0.06 + rand() * 0.1})`;
      ctx.fill();
    }

    // Bintik Merah Raksasa (Great Red Spot)
    const grsX = w * 0.62;
    const grsY = h * 0.64;
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 54, 30, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#c44527';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 36, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#df6543';
    ctx.fill();
  }

  else if (type === 'saturn') {
    const rand = createNoiseHelper(707);
    const palette = ['#ead6a6', '#d8be84', '#f2e3bc', '#c9ab6e', '#e3cb96'];
    let y = 0;
    let idx = 0;
    while (y < h) {
      const bandHeight = 12 + rand() * 24;
      ctx.fillStyle = palette[idx % palette.length];
      ctx.fillRect(0, y, w, bandHeight + 2);
      y += bandHeight;
      idx++;
    }
  }

  else if (type === 'uranus') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#7de3f2');
    grad.addColorStop(0.5, '#59cbe0');
    grad.addColorStop(1, '#46b3cc');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Pita atmosfer metana lembut
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(20,110,135,0.06)';
      ctx.fillRect(0, (h / 20) * i, w, h / 20);
    }
  }

  else if (type === 'neptune') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#2747b0');
    grad.addColorStop(0.5, '#3461eb');
    grad.addColorStop(1, '#1e378f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Pita angin supersonik & Bintik Gelap Besar
    for (let i = 0; i < 32; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(120, 165, 255, 0.12)' : 'rgba(15, 28, 82, 0.16)';
      ctx.fillRect(0, (h / 32) * i, w, h / 32);
    }
    ctx.beginPath();
    ctx.ellipse(w * 0.42, h * 0.56, 44, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14, 24, 74, 0.65)';
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function generateRingTexture(isSaturn = true): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  for (let x = 0; x < canvas.width; x++) {
    const u = x / canvas.width; // 0 = dalam, 1 = luar
    let alpha = 0;
    let color = '235, 215, 175';

    if (isSaturn) {
      // Divisi Cassini di u ~ 0.68
      if (u < 0.12) alpha = u * 2.5;
      else if (u > 0.66 && u < 0.72) alpha = 0.06;
      else if (u > 0.92) alpha = (1 - u) * 8;
      else alpha = 0.55 + 0.3 * Math.sin(u * 95) + 0.15 * Math.cos(u * 210);
      color = u > 0.72 ? '218, 198, 162' : '242, 224, 186';
    } else {
      // Cincin tipis Uranus
      if (u > 0.45 && u < 0.52) alpha = 0.22;
      else if (u > 0.78 && u < 0.84) alpha = 0.32;
      else alpha = 0.03;
      color = '155, 232, 245';
    }

    ctx.fillStyle = `rgba(${color}, ${Math.max(0, Math.min(0.92, alpha))})`;
    ctx.fillRect(x, 0, 1, canvas.height);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function createGlowSprite(colorHex: number, scale: number, opacity = 0.65): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    const c = new THREE.Color(colorHex);
    const r = Math.round(c.r * 255);
    const g = Math.round(c.g * 255);
    const b = Math.round(c.b * 255);

    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
    grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${opacity * 0.42})`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }

  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(scale, scale, 1);
  return sprite;
}
