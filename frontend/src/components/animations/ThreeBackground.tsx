"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Ambient hero backdrop: a small cluster of brushed-brass rings drifting
 * slowly, evoking hardware/joinery details rather than a literal 3D room.
 *
 * Performance/lifecycle guarantees:
 * - skipped entirely for prefers-reduced-motion and when WebGL is unavailable
 *   (the CSS gradient in .hero-section remains as the fallback backdrop)
 * - device pixel ratio capped, geometry/material count reduced on narrow
 *   viewports
 * - the render loop pauses when the tab is hidden or the canvas scrolls out
 *   of view, and resumes when it returns
 * - all Three.js resources (geometries, materials, renderer) are disposed on
 *   unmount; no RAF survives past cleanup
 */
export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reducedMotion) return;
    if (!window.WebGLRenderingContext) return;

    const isCompact = window.matchMedia("(max-width: 768px)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.25 : 1.75));
    mount.appendChild(renderer.domElement);

    const brass = new THREE.Color("#d2b176");
    const ringCount = isCompact ? 3 : 5;
    const rings: THREE.Mesh[] = [];
    const group = new THREE.Group();

    for (let i = 0; i < ringCount; i += 1) {
      const radius = 1.1 + i * 0.35;
      const geometry = new THREE.TorusGeometry(radius, 0.02, 16, isCompact ? 48 : 96);
      const material = new THREE.MeshStandardMaterial({
        color: brass,
        metalness: 0.85,
        roughness: 0.35,
        transparent: true,
        opacity: 0.35 - i * 0.04,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.position.set((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5);
      rings.push(ring);
      group.add(ring);
    }
    group.position.set(2.4, 0.4, 0);
    scene.add(group);

    const key = new THREE.PointLight(0xf3d8ae, 12, 30);
    key.position.set(4, 3, 6);
    scene.add(key);
    scene.add(new THREE.AmbientLight(0x50412c, 1.2));

    let frameId = 0;
    let running = true;
    const clock = new THREE.Clock();

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    resize();

    const animate = () => {
      if (!running) return;
      const elapsed = clock.getElapsedTime();
      rings.forEach((ring, index) => {
        ring.rotation.x += 0.0009 + index * 0.00008;
        ring.rotation.y += 0.0012;
      });
      group.position.y = Math.sin(elapsed * 0.25) * 0.25;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting ?? false;
        if (running) {
          frameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(mount);

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameId);
      } else if (mount.getBoundingClientRect().top < window.innerHeight) {
        running = true;
        frameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return <div ref={mountRef} className="three-canvas-wrap" aria-hidden="true" />;
}
