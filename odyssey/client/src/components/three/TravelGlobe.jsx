import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DESTINATIONS = [
  { name: "Amalfi Coast, Italy", lat: 40.63, lon: 14.60, color: "#f59e0b" },
  { name: "Kyoto, Japan", lat: 35.01, lon: 135.76, color: "#38bdf8" },
  { name: "Jaipur, India", lat: 26.91, lon: 75.78, color: "#f59e0b" },
  { name: "Swiss Alps, Switzerland", lat: 45.97, lon: 7.74, color: "#10b981" },
  { name: "Bali, Indonesia", lat: -8.40, lon: 115.18, color: "#06b6d4" },
  { name: "Ladakh, India", lat: 34.15, lon: 77.57, color: "#f59e0b" },
  { name: "Santorini, Greece", lat: 36.39, lon: 25.46, color: "#38bdf8" }
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export const TravelGlobe = ({ className = "" }) => {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 80;

    // 1. Core Sphere (Deep Navy)
    const sphereGeo = new THREE.SphereGeometry(radius - 0.5, 48, 48);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x07152b,
      emissive: 0x050f1f,
      shininess: 25,
      transparent: true,
      opacity: 0.95
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // 2. Wireframe / Latitude-Longitude Grid
    const wireGeo = new THREE.SphereGeometry(radius, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a5f,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireSphere);

    // 3. Particle Dots on Sphere Surface
    const dotCount = 1200;
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius + 0.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      size: 1.6,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65
    });
    const dotsMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotsMesh);

    // 4. Glowing Destination Pins
    const pinGroup = new THREE.Group();
    DESTINATIONS.forEach((dest) => {
      const pos = latLonToVector3(dest.lat, dest.lon, radius + 1.5);

      // Pin base sphere
      const pinGeo = new THREE.SphereGeometry(2.4, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: dest.color });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinGroup.add(pinMesh);

      // Outer pulsing ring
      const ringGeo = new THREE.RingGeometry(2.8, 4.2, 20);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dest.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      pinGroup.add(ringMesh);
    });
    globeGroup.add(pinGroup);

    // 5. Flight Arcs
    const createArc = (p1, p2, color) => {
      const v1 = latLonToVector3(p1.lat, p1.lon, radius + 1);
      const v2 = latLonToVector3(p2.lat, p2.lon, radius + 1);

      // Midpoint elevated away from core
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      const distance = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(radius + distance * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6
      });
      return new THREE.Line(arcGeo, arcMat);
    };

    const arc1 = createArc(DESTINATIONS[0], DESTINATIONS[1], 0xf59e0b); // Amalfi to Kyoto
    const arc2 = createArc(DESTINATIONS[2], DESTINATIONS[3], 0x38bdf8); // Jaipur to Swiss Alps
    const arc3 = createArc(DESTINATIONS[4], DESTINATIONS[5], 0x10b981); // Bali to Ladakh
    globeGroup.add(arc1);
    globeGroup.add(arc2);
    globeGroup.add(arc3);

    // 6. Orbital Rings
    const orbitGeo = new THREE.TorusGeometry(radius + 18, 0.4, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.25
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 2.5;
    globeGroup.add(orbitMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    dirLight.position.set(100, 150, 100);
    scene.add(dirLight);

    // Initial tilt
    globeGroup.rotation.x = 0.35;
    globeGroup.rotation.y = -0.5;

    // Mouse Controls
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDraggingRef.current) {
        globeGroup.rotation.y += 0.003;
      }
      orbitMesh.rotation.z = elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-[460px] md:h-[540px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md text-xs text-amber-300 font-medium flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
        Interactive 3D Globe • Drag to explore destinations
      </div>
    </div>
  );
};
