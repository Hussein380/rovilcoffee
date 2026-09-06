'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FlagIcon from './FlagIcon';

interface TradeRoute {
  id: string;
  name: string;
  country: string;
  countryCode: 'EU' | 'GB' | 'US' | 'JP' | 'AE';
  lat: number;
  lon: number;
  port: string;
  targetY: number; // Y rotation to face this corridor
  leadTime: string;
}

const TRADE_ROUTES: TradeRoute[] = [
  {
    id: 'europe',
    name: 'Europe',
    country: 'Germany / EU',
    countryCode: 'EU',
    lat: 51.2,
    lon: 8.5,
    port: 'Rotterdam / Hamburg',
    targetY: -2.02,
    leadTime: '21–26 Days',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    country: 'UK',
    countryCode: 'GB',
    lat: 51.5,
    lon: -0.1,
    port: 'London Gateway',
    targetY: -1.97,
    leadTime: '22–28 Days',
  },
  {
    id: 'usa',
    name: 'United States',
    country: 'USA',
    countryCode: 'US',
    lat: 40.7,
    lon: -74.0,
    port: 'New York Port',
    targetY: -1.44,
    leadTime: '28–35 Days',
  },
  {
    id: 'japan',
    name: 'Japan & East Asia',
    country: 'Japan',
    countryCode: 'JP',
    lat: 35.7,
    lon: 139.7,
    port: 'Yokohama Port',
    targetY: -2.98,
    leadTime: '24–30 Days',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    country: 'UAE',
    countryCode: 'AE',
    lat: 25.2,
    lon: 55.3,
    port: 'Jebel Ali, Dubai',
    targetY: -2.37,
    leadTime: '10–14 Days',
  },
];

// Kenya Center (Equator, East Africa)
const KENYA = { lat: -0.2, lon: 36.8 };
const GLOBE_RADIUS = 6.6;

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Great circle 3D spherical arc that NEVER dips inside the earth
function createGreatCircleArc(start: THREE.Vector3, end: THREE.Vector3, radius: number, maxAltitude = 1.35): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const segments = 60;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = new THREE.Vector3().copy(start).lerp(end, t).normalize();
    const altitude = Math.sin(t * Math.PI) * maxAltitude;
    pt.multiplyScalar(radius + altitude);
    points.push(pt);
  }
  return new THREE.CatmullRomCurve3(points);
}

// Module-level texture cache to prevent re-fetching/re-decoding on navigation
let cachedEarthTexture: THREE.Texture | null = null;
let cachedCloudsTexture: THREE.Texture | null = null;

function getSharedTextures() {
  const loader = new THREE.TextureLoader();
  if (!cachedEarthTexture) {
    cachedEarthTexture = loader.load('/textures/earth_atmos_2048.jpg');
    cachedEarthTexture.colorSpace = THREE.SRGBColorSpace;
  }
  if (!cachedCloudsTexture) {
    cachedCloudsTexture = loader.load('/textures/earth_clouds_1024.png');
  }
  return { earthMap: cachedEarthTexture, cloudsMap: cachedCloudsTexture };
}

export default function Real3DGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<TradeRoute>(TRADE_ROUTES[0]);
  const activeRouteIdRef = useRef<string>(TRADE_ROUTES[0].id);
  const targetRotationYRef = useRef<number>(TRADE_ROUTES[0].targetY);

  const handleSelectRoute = (route: TradeRoute) => {
    setSelectedRoute(route);
    activeRouteIdRef.current = route.id;
    targetRotationYRef.current = route.targetY;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ee, 2.4);
    sunLight.position.set(16, 14, 20);
    scene.add(sunLight);

    const softFill = new THREE.DirectionalLight(0xe8dcd0, 1.0);
    softFill.position.set(-14, -8, -12);
    scene.add(softFill);

    // Earth Map with cached textures & instant base tone
    const { earthMap, cloudsMap } = getSharedTextures();

    const earthGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      color: new THREE.Color(0xf5ede4),
      roughness: 0.75,
      metalness: 0.02,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Clouds
    const cloudsGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.012, 48, 48);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    globeGroup.add(cloudsMesh);

    // Atmospheric rim
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.035, 32, 32);
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
          float intensity = pow(0.55 - dot(vNormal, vec3(0, 0, 1.0)), 2.8);
          gl_FragColor = vec4(0.65, 0.45, 0.28, 1.0) * intensity * 0.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // Kenya Origin Pin (Equator, East Africa) elevated above clouds
    const SURFACE_RADIUS = GLOBE_RADIUS * 1.025;
    const kenyaPos = latLonToVector3(KENYA.lat, KENYA.lon, SURFACE_RADIUS);

    const originCoreGeo = new THREE.SphereGeometry(0.26, 16, 16);
    const originCoreMat = new THREE.MeshBasicMaterial({ color: 0xd92d20 });
    const originCore = new THREE.Mesh(originCoreGeo, originCoreMat);
    originCore.position.copy(kenyaPos);
    originCore.renderOrder = 10;
    globeGroup.add(originCore);

    const kenyaHaloGeo = new THREE.RingGeometry(0.30, 0.70, 32);
    const kenyaHaloMat = new THREE.MeshBasicMaterial({
      color: 0xffa200,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const kenyaHaloMesh = new THREE.Mesh(kenyaHaloGeo, kenyaHaloMat);
    kenyaHaloMesh.position.copy(kenyaPos);
    kenyaHaloMesh.lookAt(0, 0, 0);
    kenyaHaloMesh.renderOrder = 9;
    globeGroup.add(kenyaHaloMesh);

    // Data structures for moving arrow and connected dot stream on each corridor
    interface StreamDot {
      mesh: THREE.Mesh;
      offset: number;
    }

    interface RouteStream {
      id: string;
      curve: THREE.Curve<THREE.Vector3>;
      speed: number;
      cycleOffset: number;
      dots: StreamDot[];
      arrowMesh: THREE.Mesh;
      arrowMat: THREE.MeshBasicMaterial;
      baseLine: THREE.Line;
      baseLineMat: THREE.LineDashedMaterial;
      destPin: THREE.Mesh;
      destHalo: THREE.Mesh;
      destHaloMat: THREE.MeshBasicMaterial;
    }

    const streams: RouteStream[] = [];

    // Dot and Arrow Geometries (Enlarged for high visibility)
    const dotSmallGeo = new THREE.SphereGeometry(0.18, 14, 14);
    const dotLeadGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const arrowGeo = new THREE.ConeGeometry(0.32, 0.75, 16);
    // Rotate cone geometry so its tip points along +Z for easy lookAt/quaternion alignment
    arrowGeo.rotateX(Math.PI / 2);

    TRADE_ROUTES.forEach((route, routeIdx) => {
      const destPos = latLonToVector3(route.lat, route.lon, SURFACE_RADIUS);

      // Destination Pin
      const pinGeo = new THREE.SphereGeometry(0.25, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x23150c });
      const destPin = new THREE.Mesh(pinGeo, pinMat);
      destPin.position.copy(destPos);
      destPin.renderOrder = 10;
      globeGroup.add(destPin);

      // Destination Ping Halo (Pulses when corridor is active)
      const destHaloGeo = new THREE.RingGeometry(0.30, 0.75, 32);
      const destHaloMat = new THREE.MeshBasicMaterial({
        color: 0xffd166,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const destHalo = new THREE.Mesh(destHaloGeo, destHaloMat);
      destHalo.position.copy(destPos);
      destHalo.lookAt(0, 0, 0);
      destHalo.renderOrder = 9;
      globeGroup.add(destHalo);

      // 3D Spherical Arc Curve from Kenya directly to destination (Elevated into clear airspace)
      const curve = createGreatCircleArc(kenyaPos, destPos, SURFACE_RADIUS, 1.45);
      const points = curve.getPoints(80);
      const baseLineGeo = new THREE.BufferGeometry().setFromPoints(points);

      const baseLineMat = new THREE.LineDashedMaterial({
        color: 0x7a4727,
        dashSize: 0.40,
        gapSize: 0.20,
        transparent: true,
        opacity: 0.35,
      });
      const baseLine = new THREE.Line(baseLineGeo, baseLineMat);
      baseLine.computeLineDistances();
      baseLine.renderOrder = 5;
      globeGroup.add(baseLine);

      // 3D MOVING DIRECTIONAL ARROW HEAD
      const arrowMat = new THREE.MeshBasicMaterial({
        color: 0xffe600,
        transparent: true,
        opacity: 0.95,
      });
      const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
      arrowMesh.position.copy(kenyaPos);
      arrowMesh.renderOrder = 20;
      globeGroup.add(arrowMesh);

      // Train of CONNECTED GLOWING BEADS trailing behind the arrow
      const streamDots: StreamDot[] = [];

      for (let d = 0; d < 8; d++) {
        const isLead = d === 0;
        const dotMat = new THREE.MeshBasicMaterial({
          color: isLead ? 0xffffff : 0xffbe0b,
          transparent: true,
          opacity: 1.0 - d * 0.1,
        });

        const dotMesh = new THREE.Mesh(isLead ? dotLeadGeo : dotSmallGeo, dotMat);
        dotMesh.position.copy(kenyaPos);
        dotMesh.renderOrder = 15;
        globeGroup.add(dotMesh);

        streamDots.push({
          mesh: dotMesh,
          offset: -d * 0.035, // tightly spaced connected dots trailing the arrow
        });
      }

      streams.push({
        id: route.id,
        curve,
        speed: 0.32,
        cycleOffset: (routeIdx * 0.2) % 1,
        dots: streamDots,
        arrowMesh,
        arrowMat,
        baseLine,
        baseLineMat,
        destPin,
        destHalo,
        destHaloMat,
      });
    });

    // Initial orientation
    globeGroup.rotation.y = TRADE_ROUTES[0].targetY;
    globeGroup.rotation.x = 0.14;

    // Interactive Drag
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;
      globeGroup.rotation.x = Math.max(-0.35, Math.min(0.35, globeGroup.rotation.x));
      targetRotationYRef.current = globeGroup.rotation.y;

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = (now: number = performance.now()) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Smooth camera interpolation toward selected corridor
      if (!isDragging) {
        const currentY = globeGroup.rotation.y;
        const targetY = targetRotationYRef.current;
        const subtleBreathing = Math.sin(elapsed * 0.6) * 0.02;
        globeGroup.rotation.y += (targetY + subtleBreathing - currentY) * (delta * 3.8);
      }

      cloudsMesh.rotation.y += delta * 0.035;

      // Pulse Kenya origin ring
      const kenyaScale = 1 + Math.sin(elapsed * 4.5) * 0.22;
      kenyaHaloMesh.scale.set(kenyaScale, kenyaScale, 1);
      kenyaHaloMat.opacity = 0.5 + Math.sin(elapsed * 4.5) * 0.35;

      // Animate streams of connected dots along the curves
      const activeId = activeRouteIdRef.current;

      streams.forEach((st) => {
        const isActive = st.id === activeId;

        // Visual prominence based on active selection
        if (isActive) {
          st.baseLineMat.opacity = 0.95;
          st.baseLineMat.color.setHex(0xe09f3e);
          st.arrowMat.opacity = 1.0;
          st.arrowMat.color.setHex(0xffea00);
          st.arrowMesh.scale.set(1.25, 1.25, 1.25);
          st.arrowMesh.visible = true;

          // Pulse destination pin halo
          const destScale = 1 + Math.sin(elapsed * 5) * 0.35;
          st.destHalo.scale.set(destScale, destScale, 1);
          st.destHaloMat.opacity = 0.85 + Math.sin(elapsed * 5) * 0.15;
          (st.destPin.material as THREE.MeshBasicMaterial).color.setHex(0xffd166);
        } else {
          st.baseLineMat.opacity = 0.15;
          st.baseLineMat.color.setHex(0x5c351c);
          st.arrowMat.opacity = 0;
          st.arrowMesh.visible = false;
          st.destHaloMat.opacity = 0;
          (st.destPin.material as THREE.MeshBasicMaterial).color.setHex(0x3e2211);
        }

        // Advance position along curve from Kenya (0) to Destination (1)
        const speed = isActive ? 0.36 : 0.18;
        const rawProgress = (elapsed * speed + st.cycleOffset) % 1;
        const headProgress = Math.max(0.002, Math.min(0.998, (rawProgress + 1) % 1));

        // Position and orient the moving 3D arrow head forward along the curve
        if (isActive) {
          const arrowPos = st.curve.getPointAt(headProgress);
          if (arrowPos) {
            st.arrowMesh.position.copy(arrowPos);
            const tangent = st.curve.getTangentAt(headProgress);
            if (tangent) {
              tangent.normalize();
              const targetLook = arrowPos.clone().add(tangent);
              st.arrowMesh.lookAt(targetLook);
            }
          }
        }

        // Position trailing connected glowing cargo beads
        st.dots.forEach((dotItem, idx) => {
          let p = (headProgress + dotItem.offset) % 1;
          if (p < 0) p += 1;
          p = Math.max(0.002, Math.min(0.998, p));

          const pos = st.curve.getPointAt(p);
          if (pos) {
            dotItem.mesh.position.copy(pos);
            const scaleMultiplier = isActive ? (1.35 - idx * 0.08) : 0.3;
            dotItem.mesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
            dotItem.mesh.visible = isActive;
          }

          const mat = dotItem.mesh.material as THREE.MeshBasicMaterial;
          if (isActive) {
            mat.opacity = Math.max(0.4, 1.0 - idx * 0.08);
            mat.color.setHex(idx === 0 ? 0xffffff : (idx < 3 ? 0xffea00 : 0xffa200));
          } else {
            mat.opacity = 0.08;
          }
        });
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container && dom.parentNode === container) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      
      {/* 3D Canvas with Origin & Destination Indicator */}
      <div className="relative w-full h-[340px] sm:h-[390px] flex items-center justify-center">
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
          title="Drag to explore shipping corridors or click corridors below"
        />

        {/* Soft Ambient Depth Shadow */}
        <div className="absolute bottom-1 w-[60%] h-6 bg-[#23150c]/8 rounded-full filter blur-lg pointer-events-none -z-10" />
      </div>

      {/* Corridor Selector with Real-World Flags */}
      <div className="w-full max-w-lg pt-1 flex flex-col items-center gap-3">
        <div className="text-xs font-semibold text-[#7a4727] flex items-center gap-2">
          <span>Active Export Trade Corridor</span>
        </div>

        {/* Connected Corridor Nodes: Real Kenya Flag -> Selected Destination Real Flag */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {/* Kenya Origin Pill with Real Kenyan Flag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4ece4] border border-[#d8c2b0] text-xs font-bold text-[#23150c] shadow-2xs">
            <FlagIcon countryCode="KE" size={18} />
            <span>Kenya</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          </div>

          <span className="text-[#b57a44] font-bold text-sm hidden sm:inline">➔</span>

          {/* Destination Nodes with Real-World Flags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {TRADE_ROUTES.map((route) => {
              const isSelected = selectedRoute.id === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => handleSelectRoute(route)}
                  title={`Track shipment lane to ${route.name} (${route.port})`}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#23150c] text-white border-[#23150c] shadow-sm font-semibold scale-105 ring-2 ring-[#7a4727]/30'
                      : 'bg-white text-[#44382e] border-[#e2d5c8] hover:border-[#b57a44] hover:bg-[#fbf9f6]'
                  }`}
                >
                  <FlagIcon countryCode={route.countryCode} size={18} />
                  <span className="text-xs font-medium">{route.country}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Cargo Route Lead Time & Port Callout */}
        <div className="px-3.5 py-1.5 rounded-lg bg-[#fbf9f6] border border-[#ece3db] text-xs text-[#574c43] text-center flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
          <span>
            Port of Mombasa ➔ <strong className="text-[#23150c] font-semibold">{selectedRoute.port}</strong> • Transit: <strong className="text-[#7a4727] font-semibold">{selectedRoute.leadTime}</strong>
          </span>
        </div>
      </div>

    </div>
  );
}
