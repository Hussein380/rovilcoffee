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
    targetY: -0.95,
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
    targetY: -0.75,
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
    targetY: 0.45,
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
    targetY: -2.75,
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
    targetY: -1.25,
    leadTime: '10–14 Days',
  },
];

// Kenya Center (Equator, East Africa)
const KENYA = { lat: -0.2, lon: 36.8 };
const GLOBE_RADIUS = 6.6;
const DOTS_COUNT = 14; // Chain of connected dots in the active cargo train

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createArcCurve(start: THREE.Vector3, end: THREE.Vector3, elevation = 0.28): THREE.CubicBezierCurve3 {
  const distance = start.distanceTo(end);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize().multiplyScalar(midLength + distance * elevation);

  const c1 = start.clone().lerp(mid, 0.5).normalize().multiplyScalar(midLength + distance * elevation * 0.85);
  const c2 = end.clone().lerp(mid, 0.5).normalize().multiplyScalar(midLength + distance * elevation * 0.85);

  return new THREE.CubicBezierCurve3(start, c1, c2, end);
}

export default function Real3DGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<TradeRoute>(TRADE_ROUTES[0]);
  const activeRouteIdRef = useRef<string>(TRADE_ROUTES[0].id);
  const targetRotationYRef = useRef<number>(TRADE_ROUTES[0].targetY);
  const routeSelectTimeRef = useRef<number>(0);

  const handleSelectRoute = (route: TradeRoute) => {
    setSelectedRoute(route);
    activeRouteIdRef.current = route.id;
    targetRotationYRef.current = route.targetY;
    routeSelectTimeRef.current = performance.now() / 1000;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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

    // Earth Map
    const loader = new THREE.TextureLoader();
    const earthMap = loader.load('/textures/earth_atmos_2048.jpg');
    earthMap.colorSpace = THREE.SRGBColorSpace;

    const earthGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      roughness: 0.75,
      metalness: 0.02,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Clouds
    const cloudsMap = loader.load('/textures/earth_clouds_1024.png');
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

    // Kenya Origin Pin (Equator, East Africa)
    const kenyaPos = latLonToVector3(KENYA.lat, KENYA.lon, GLOBE_RADIUS);

    const originCoreGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const originCoreMat = new THREE.MeshBasicMaterial({ color: 0xd92d20 });
    const originCore = new THREE.Mesh(originCoreGeo, originCoreMat);
    originCore.position.copy(kenyaPos);
    globeGroup.add(originCore);

    const kenyaHaloGeo = new THREE.RingGeometry(0.26, 0.58, 32);
    const kenyaHaloMat = new THREE.MeshBasicMaterial({
      color: 0xb57a44,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const kenyaHaloMesh = new THREE.Mesh(kenyaHaloGeo, kenyaHaloMat);
    kenyaHaloMesh.position.copy(kenyaPos);
    kenyaHaloMesh.lookAt(0, 0, 0);
    globeGroup.add(kenyaHaloMesh);

    // Data structures for connected dot stream on each trade corridor
    interface StreamDot {
      mesh: THREE.Mesh;
      offset: number;
    }

    interface RouteStream {
      id: string;
      curve: THREE.CubicBezierCurve3;
      speed: number;
      cycleOffset: number;
      dots: StreamDot[];
      connectLine: THREE.Line;
      connectLineGeo: THREE.BufferGeometry;
      baseLine: THREE.Line;
      baseLineMat: THREE.LineDashedMaterial;
      destPin: THREE.Mesh;
      destHalo: THREE.Mesh;
      destHaloMat: THREE.MeshBasicMaterial;
    }

    const streams: RouteStream[] = [];

    // Dot Geometries
    const dotSmallGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const dotLeadGeo = new THREE.SphereGeometry(0.20, 16, 16);

    TRADE_ROUTES.forEach((route, routeIdx) => {
      const destPos = latLonToVector3(route.lat, route.lon, GLOBE_RADIUS);

      // Destination Pin
      const pinGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x23150c });
      const destPin = new THREE.Mesh(pinGeo, pinMat);
      destPin.position.copy(destPos);
      globeGroup.add(destPin);

      // Destination Ping Halo (Pulses when corridor is active)
      const destHaloGeo = new THREE.RingGeometry(0.26, 0.60, 32);
      const destHaloMat = new THREE.MeshBasicMaterial({
        color: 0xd4a373,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const destHalo = new THREE.Mesh(destHaloGeo, destHaloMat);
      destHalo.position.copy(destPos);
      destHalo.lookAt(0, 0, 0);
      globeGroup.add(destHalo);

      // 3D Arc Curve from Kenya directly to destination
      const curve = createArcCurve(kenyaPos, destPos, 0.28);
      const points = curve.getPoints(60);
      const baseLineGeo = new THREE.BufferGeometry().setFromPoints(points);

      const baseLineMat = new THREE.LineDashedMaterial({
        color: 0x7a4727,
        dashSize: 0.35,
        gapSize: 0.22,
        transparent: true,
        opacity: 0.3,
      });
      const baseLine = new THREE.Line(baseLineGeo, baseLineMat);
      baseLine.computeLineDistances();
      globeGroup.add(baseLine);

      // Connecting line connecting the chain of small dots
      const connectPositions = new Float32Array(DOTS_COUNT * 3);
      const connectLineGeo = new THREE.BufferGeometry();
      connectLineGeo.setAttribute('position', new THREE.BufferAttribute(connectPositions, 3));
      const connectLineMat = new THREE.LineBasicMaterial({
        color: 0xffe8cc,
        transparent: true,
        opacity: 0.85,
        linewidth: 2,
      });
      const connectLine = new THREE.Line(connectLineGeo, connectLineMat);
      globeGroup.add(connectLine);

      // Train of CONNECTED DOTS moving like cargo beads
      const streamDots: StreamDot[] = [];

      for (let d = 0; d < DOTS_COUNT; d++) {
        const isLead = d === 0;
        const dotMat = new THREE.MeshBasicMaterial({
          color: isLead ? 0xfffaed : 0xd4a373,
          transparent: true,
          opacity: 1.0 - d * 0.08,
        });

        const dotMesh = new THREE.Mesh(isLead ? dotLeadGeo : dotSmallGeo, dotMat);
        dotMesh.position.copy(kenyaPos);
        globeGroup.add(dotMesh);

        streamDots.push({
          mesh: dotMesh,
          offset: -d * 0.022, // tightly spaced connected dots
        });
      }

      streams.push({
        id: route.id,
        curve,
        speed: 0.32,
        cycleOffset: (routeIdx * 0.2) % 1,
        dots: streamDots,
        connectLine,
        connectLineGeo,
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
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

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
          st.baseLineMat.opacity = 0.85;
          st.baseLineMat.color.setHex(0xd4a373);
          (st.connectLine.material as THREE.LineBasicMaterial).opacity = 1.0;
          (st.connectLine.material as THREE.LineBasicMaterial).color.setHex(0xfffaed);

          // Pulse destination pin halo
          const destScale = 1 + Math.sin(elapsed * 4.5) * 0.28;
          st.destHalo.scale.set(destScale, destScale, 1);
          st.destHaloMat.opacity = 0.7 + Math.sin(elapsed * 4.5) * 0.3;
          (st.destPin.material as THREE.MeshBasicMaterial).color.setHex(0xb57a44);
        } else {
          st.baseLineMat.opacity = 0.2;
          st.baseLineMat.color.setHex(0x553822);
          (st.connectLine.material as THREE.LineBasicMaterial).opacity = 0.2;
          (st.connectLine.material as THREE.LineBasicMaterial).color.setHex(0x8a5d3b);
          st.destHaloMat.opacity = 0;
          (st.destPin.material as THREE.MeshBasicMaterial).color.setHex(0x3e2211);
        }

        // Advance position along curve from Kenya (0) to Destination (1)
        const speed = isActive ? 0.35 : 0.22;
        const headProgress = (elapsed * speed + st.cycleOffset) % 1;

        const posAttr = st.connectLineGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        st.dots.forEach((dotItem, idx) => {
          let p = headProgress + dotItem.offset;
          if (p < 0) p += 1;
          p = Math.max(0.001, Math.min(0.999, p));

          const pos = st.curve.getPointAt(p);
          dotItem.mesh.position.copy(pos);

          // Update connecting line vertices between dots
          posArray[idx * 3] = pos.x;
          posArray[idx * 3 + 1] = pos.y;
          posArray[idx * 3 + 2] = pos.z;

          // Scale & opacity of dots
          const scaleMultiplier = isActive ? (idx === 0 ? 1.3 : 1.1) : 0.8;
          dotItem.mesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);

          const mat = dotItem.mesh.material as THREE.MeshBasicMaterial;
          if (isActive) {
            mat.opacity = Math.max(0.2, 1.0 - idx * 0.08);
            mat.color.setHex(idx === 0 ? 0xffffff : 0xffd8a8);
          } else {
            mat.opacity = 0.25;
            mat.color.setHex(0xa67c52);
          }
        });

        posAttr.needsUpdate = true;
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

      {/* Hirola-Inspired Clean Corridor Selector with Real-World Flags */}
      <div className="w-full max-w-lg pt-1 flex flex-col items-center gap-3">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#7a4727] font-semibold flex items-center gap-2">
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
        <div className="px-3.5 py-1.5 rounded-lg bg-[#fbf9f6] border border-[#ece3db] text-[11px] text-[#574c43] text-center font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
          <span>
            Port of Mombasa ➔ <strong className="text-[#23150c] font-semibold">{selectedRoute.port}</strong> • Transit: <strong className="text-[#7a4727] font-semibold">{selectedRoute.leadTime}</strong>
          </span>
        </div>
      </div>

    </div>
  );
}
