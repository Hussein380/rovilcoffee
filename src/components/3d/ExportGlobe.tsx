'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Geographical coordinates to spherical 3D points
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Great circle 3D curve with altitude arc
function createCurvedRoute(start: THREE.Vector3, end: THREE.Vector3, altitude: number): THREE.CubicBezierCurve3 {
  const distance = start.distanceTo(end);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize().multiplyScalar(midLength + distance * altitude);

  const control1 = start.clone().lerp(mid, 0.5).normalize().multiplyScalar(midLength + distance * altitude * 0.8);
  const control2 = end.clone().lerp(mid, 0.5).normalize().multiplyScalar(midLength + distance * altitude * 0.8);

  return new THREE.CubicBezierCurve3(start, control1, control2, end);
}

interface TradeDestination {
  name: string;
  flag: string;
  lat: number;
  lon: number;
  cargo: string;
}

const DESTINATIONS: TradeDestination[] = [
  { name: 'Rotterdam (Europe)', flag: '🇪🇺', lat: 51.92, lon: 4.47, cargo: 'Grade AA & AB FCL' },
  { name: 'London (UK)', flag: '🇬🇧', lat: 51.50, lon: -0.12, cargo: 'Black CTC & Purple Tea' },
  { name: 'New York (USA)', flag: '🇺🇸', lat: 40.71, lon: -74.00, cargo: 'Specialty Peaberry (PB)' },
  { name: 'Yokohama (Japan)', flag: '🇯🇵', lat: 35.67, lon: 139.65, cargo: 'Micro-lot Estate AA' },
  { name: 'Shanghai (Asia)', flag: '🇨🇳', lat: 31.23, lon: 121.47, cargo: 'Orthodox & Grade C' },
  { name: 'Dubai (GCC)', flag: '🇦🇪', lat: 25.20, lon: 55.27, cargo: 'Commercial Grade MH' },
  { name: 'Durban (Africa)', flag: '🇿🇦', lat: -29.85, lon: 31.02, cargo: 'Regional Bulk Parcels' },
];

const KENYA_COORD = { lat: -1.2921, lon: 36.8219 }; // Nairobi / Mt. Kenya Hub

export default function ExportGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDestination, setActiveDestination] = useState<TradeDestination | null>(DESTINATIONS[0]);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 7.5;

    // 1. Base dark sphere with subtle rim lighting
    const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x0c0907,
      transparent: true,
      opacity: 0.94,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // 2. Wireframe / Latitude Longitude grid lines for tech look
    const gridGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.002, 24, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x2e241c,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(gridMesh);

    // 3. Dot Matrix continents simulation for clean corporate look
    const dotsCount = 1200;
    const dotPositions: number[] = [];
    const dotColors: number[] = [];
    const colorGold = new THREE.Color(0xd4a373);
    const colorDim = new THREE.Color(0x382c22);

    for (let i = 0; i < dotsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotsCount);
      const theta = Math.sqrt(dotsCount * Math.PI) * phi;
      const r = GLOBE_RADIUS * 1.005;

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      dotPositions.push(x, y, z);

      // Give subtle brightness variations
      const c = Math.random() > 0.85 ? colorGold : colorDim;
      dotColors.push(c.r, c.g, c.b);
    }

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    dotsGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));
    const dotsMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const dotsMesh = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dotsMesh);

    // 4. Kenya Origin Marker
    const kenyaOrigin = latLonToVector3(KENYA_COORD.lat, KENYA_COORD.lon, GLOBE_RADIUS);

    // Origin glowing beacon
    const beaconGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffe2b8 });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.copy(kenyaOrigin);
    globeGroup.add(beaconMesh);

    // Origin pulsing halo ring
    const ringGeo = new THREE.RingGeometry(0.38, 0.65, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4a373,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(kenyaOrigin);
    ringMesh.lookAt(0, 0, 0);
    globeGroup.add(ringMesh);

    // 5. Destination markers & trade routes
    interface RouteData {
      curve: THREE.CubicBezierCurve3;
      pulseOffset: number;
      pulseMesh: THREE.Mesh;
    }
    const routesData: RouteData[] = [];

    DESTINATIONS.forEach((dest, idx) => {
      const destPos = latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS);

      // Small destination pin
      const destPinGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const destPinMat = new THREE.MeshBasicMaterial({ color: 0xe6ba88 });
      const destPin = new THREE.Mesh(destPinGeo, destPinMat);
      destPin.position.copy(destPos);
      globeGroup.add(destPin);

      // Arc curve
      const curve = createCurvedRoute(kenyaOrigin, destPos, 0.28);
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      // Dotted/semi-transparent curve line
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xd4a373,
        transparent: true,
        opacity: 0.35,
      });
      const curveLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(curveLine);

      // Glowing traveling cargo particle
      const pulseGeo = new THREE.SphereGeometry(0.16, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(kenyaOrigin);
      globeGroup.add(pulseMesh);

      routesData.push({
        curve,
        pulseOffset: (idx * 0.15) % 1,
        pulseMesh,
      });
    });

    // Outer atmospheric glow
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 32, 32);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.83, 0.64, 0.45, 1.0) * intensity * 0.55;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // Initial globe rotation to face Kenya toward user
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.25;

    // Interactive Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      // Clamp vertical tilt
      globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Subtle natural rotation when user is not dragging
      if (!isDragging) {
        globeGroup.rotation.y += delta * 0.06;
      }

      // Pulse beacon halo
      const scale = 1 + Math.sin(elapsedTime * 3) * 0.22;
      ringMesh.scale.set(scale, scale, 1);
      ringMat.opacity = 0.5 + Math.sin(elapsedTime * 3) * 0.3;

      // Animate trade cargo particles along curves
      routesData.forEach((route) => {
        const progress = (elapsedTime * 0.35 + route.pulseOffset) % 1;
        const pos = route.curve.getPointAt(progress);
        route.pulseMesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container && domElement.parentNode === container) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[600px] flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Click and drag to rotate the global export routes"
      />

      {/* Origin Legend Callout */}
      <div className="absolute top-4 left-4 z-20 glass-panel rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-xs border border-[#d4a373]/30">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a373] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e6ba88]"></span>
        </span>
        <div>
          <div className="font-semibold text-white tracking-wide">ORIGIN: KENYA (0°S, 37°E)</div>
          <div className="text-[#baa99e] text-[11px]">Nairobi Central Dry Port & Port of Mombasa</div>
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-4 z-20 text-[11px] text-[#baa99e]/80 flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] animate-pulse"></span>
        <span>Drag globe to inspect shipping lanes</span>
      </div>

      {/* Destination Quick Selector Buttons */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 max-w-[210px] hidden sm:flex">
        <div className="text-[10px] uppercase tracking-wider text-[#baa99e] font-medium text-right mb-0.5">
          Active Trade Corridors
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {DESTINATIONS.slice(0, 4).map((dest) => (
            <button
              key={dest.name}
              onClick={() => setActiveDestination(dest)}
              className={`px-2 py-1 rounded-md text-[11px] transition-all flex items-center gap-1 border ${
                activeDestination?.name === dest.name
                  ? 'bg-[#d4a373]/20 border-[#d4a373] text-white shadow-sm'
                  : 'bg-black/50 border-white/10 text-[#baa99e] hover:border-[#d4a373]/40'
              }`}
            >
              <span>{dest.flag}</span>
              <span className="truncate max-w-[80px]">{dest.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Destination Card Pill */}
      {activeDestination && (
        <div className="absolute top-4 right-4 z-20 glass-panel rounded-lg px-3 py-2 text-right border border-[#d4a373]/25 hidden md:block">
          <div className="text-[11px] text-[#baa99e]">Direct Ocean Trade Lane</div>
          <div className="text-xs font-semibold text-white flex items-center justify-end gap-1.5">
            <span>{activeDestination.flag}</span>
            <span>{activeDestination.name}</span>
          </div>
          <div className="text-[10px] text-[#d4a373] font-medium mt-0.5">
            Typical Cargo: {activeDestination.cargo}
          </div>
        </div>
      )}
    </div>
  );
}
