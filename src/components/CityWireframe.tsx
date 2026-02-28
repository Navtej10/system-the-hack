import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const CityWireframe = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x050814, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050814);
    scene.fog = new THREE.FogExp2(0x050814, 0.004);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.5,
      3000,
    );
    camera.position.set(-130, 180, 200);
    camera.lookAt(30, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(30, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.update();

    const EDGE_COLOR = 0xe2f0f8;
    const FACE_COLOR = 0x0b1828;

    const edgeMat = (opa = 0.95) =>
      new THREE.LineBasicMaterial({
        color: EDGE_COLOR,
        transparent: true,
        opacity: opa,
      });

    const faceMat = (opa = 0.92) =>
      new THREE.MeshBasicMaterial({
        color: FACE_COLOR,
        transparent: true,
        opacity: opa,
        side: THREE.DoubleSide,
      });

    const building = (
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      edgeOpa = 0.95,
    ) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, faceMat());
      mesh.position.set(x, y + h / 2, z);
      scene.add(mesh);
      const edges = new THREE.EdgesGeometry(geo);
      const lines = new THREE.LineSegments(edges, edgeMat(edgeOpa));
      lines.position.copy(mesh.position);
      scene.add(lines);
    };

    const H_SCALE = 0.6;

    // High-rise core (One Canada Sq + HSBC + Citi + neighbors)
    building(14, 110 * H_SCALE, 14, 20, 0, -5, 1.0);
    {
      const ph = 110 * H_SCALE;
      const pts = [new THREE.Vector3(20, ph, -5), new THREE.Vector3(20, ph + 20, -5)];
      scene.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          edgeMat(0.7),
        ),
      );
    }
    building(22, 72 * H_SCALE, 26, 48, 0, -15, 0.95);
    building(18, 80 * H_SCALE, 18, -10, 0, -20, 0.95);
    building(20, 68 * H_SCALE, 24, 75, 0, -18, 0.9);
    building(16, 68 * H_SCALE, 16, -28, 0, -12, 0.9);
    building(24, 52 * H_SCALE, 30, 100, 0, -10, 0.85);

    // Expanded North Quay cluster
    [
      [14, 42, 12, -55, 0, -35],
      [12, 36, 14, -70, 0, -28],
      [16, 28, 12, -40, 0, -30],
      [14, 46, 14, -85, 0, -15],
      [12, 30, 12, -65, 0, -45],
      [18, 22, 16, -100, 0, -20],
      [10, 50, 10, -115, 0, -10],
      [16, 20, 14, -130, 0, -5],
      [12, 28, 12, -35, 0, -45],
      [14, 18, 14, -20, 0, -35],
    ].forEach(([w, h, d, x, y, z]) =>
      building(
        w as number,
        (h as number) * H_SCALE,
        d as number,
        x as number,
        y as number,
        z as number,
        0.75,
      ),
    );

    // Expanded South Quay cluster
    [
      [18, 40, 16, 115, 0, 25],
      [14, 52, 14, 130, 0, 15],
      [14, 46, 14, 145, 0, 8],
      [18, 22, 16, 135, 0, -15],
      [20, 28, 18, 160, 0, 20],
      [14, 34, 14, 175, 0, 10],
      [12, 40, 12, 190, 0, 0],
      [16, 24, 16, 155, 0, 35],
      [14, 18, 14, 180, 0, 30],
      [18, 12, 18, 205, 0, 15],
    ].forEach(([w, h, d, x, y, z]) =>
      building(
        w as number,
        (h as number) * H_SCALE,
        d as number,
        x as number,
        y as number,
        z as number,
        0.78,
      ),
    );

    // Expansion / infill tiers
    [
      [20, 12, 14, -35, 0, 50],
      [18, 10, 16, -10, 0, 55],
      [14, 16, 12, 80, 0, 45],
      [12, 20, 12, 90, 0, 55],
      [16, 14, 14, 65, 0, 52],
      [10, 24, 10, 105, 0, 35],
      [12, 12, 12, 125, 0, 55],
      [15, 18, 15, 40, 0, 60],
      [14, 14, 12, 5, 0, 62],
      [18, 10, 16, 25, 0, 68],
      [12, 28, 12, 150, 0, 45],
      [10, 22, 10, 165, 0, 35],
      [40, 6, 16, -100, 0, 62],
      [30, 8, 12, -75, 0, 70],
      [20, 12, 14, -55, 0, 68],
      [18, 10, 16, -30, 0, 70],
      [22, 18, 18, -110, 0, 35],
      [18, 14, 14, -125, 0, 45],
      [14, 22, 12, -135, 0, 55],
      [26, 12, 22, -145, 0, 15],
      [20, 16, 18, -90, 0, 55],
      [18, 20, 14, -105, 0, 60],
      [30, 8, 20, -125, 0, 65],
      [12, 30, 12, 140, 0, -40],
    ].forEach(([w, h, d, x, y, z]) =>
      building(
        w as number,
        (h as number) * H_SCALE,
        d as number,
        x as number,
        y as number,
        z as number,
        0.65,
      ),
    );

    // Arena and surrounds (rings)
    const arena = (cx: number, cz: number, R: number, rings: number, y = 0) => {
      for (let i = 0; i < rings; i++) {
        const rad = R - i * 5;
        const pts: THREE.Vector3[] = [];
        for (let j = 0; j <= 64; j++) {
          const a = (j / 64) * Math.PI * 2;
          pts.push(
            new THREE.Vector3(
              cx + Math.cos(a) * rad,
              y + i * 1.5,
              cz + Math.sin(a) * rad,
            ),
          );
        }
        scene.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({
              color: EDGE_COLOR,
              transparent: true,
              opacity: 0.5 - i * 0.06,
            }),
          ),
        );
      }
    };
    arena(-95, 50, 24, 4, 0.3);

    // Detail towers (main cluster only)
    [
      [4, 8, 4, 20, 110, -5],
      [3, 6, 3, 48, 72, -15],
      [3, 6, 3, -10, 80, -20],
    ].forEach(([w, h, d, x, y, z]) =>
      building(
        w as number,
        (h as number) * H_SCALE,
        d as number,
        x as number,
        y as number,
        z as number,
        0.6,
      ),
    );

    let frameId: number;
    const tick = () => {
      frameId = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    const handleResize = () => {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight || 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

