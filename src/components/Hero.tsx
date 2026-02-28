import { useState, useCallback, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { SystemCore } from './SystemCore';
import { FloatingBlocks } from './FloatingBlocks';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface HeroProps {
  onStartSimulation: () => void;
}

const STATS = [
  { value: '40%', label: 'Jobs Displaced by 2035' },
  { value: '2.3B', label: 'Citizens at Risk' },
  { value: '10', label: 'Turns to Stabilize' },
  { value: '5', label: 'Policy Mechanisms' },
];

export const Hero = (_props: HeroProps) => {
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const [isSimulationStarting] = useState<boolean>(false);
  const [isCubeHovered, setIsCubeHovered] = useState<boolean>(false);
  const [isCubeDragging, setIsCubeDragging] = useState<boolean>(false);

  const mouseRef = useRef({ x: 0, y: 0 });
  const isMouseInHeroRef = useRef(true);
  const innerGlowRef = useRef<THREE.Group | null>(null);

  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    pendingRef.current = { x, y };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (pendingRef.current) {
        mouseRef.current.x = pendingRef.current.x;
        mouseRef.current.y = pendingRef.current.y;
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    isMouseInHeroRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isMouseInHeroRef.current = false;
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  const handleStartSimulation = () => {
    window.location.href = '/scenario-page/index.html';
  };

  return (
    <section
      id="overview"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      <Canvas
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          cursor: isCubeDragging ? 'grabbing' : 'grab',
        }}
        gl={{ antialias: true, powerPreference: 'high-performance', stencil: false }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={40} />
        <SceneContent
          isButtonHovered={isButtonHovered}
          isSimulationStarting={isSimulationStarting}
          mouseRef={mouseRef}
          isMouseInHero={isMouseInHeroRef}
          setIsCubeHovered={setIsCubeHovered}
          setIsCubeDragging={setIsCubeDragging}
          innerGlowRef={innerGlowRef}
        />
        <SceneLighting isCubeHovered={isCubeHovered} />
        <Environment preset="night" />
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.7} luminanceSmoothing={0.3} radius={0.3} />
        </EffectComposer>
      </Canvas>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          className="container-fluid flex flex-col lg:flex-row items-center justify-between"
          style={{ position: 'relative', zIndex: 1, gap: '2rem', height: '100%', width: '100%' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] flex flex-col justify-center py-10 lg:py-0 pl-4 lg:pl-12"
            style={{ pointerEvents: 'auto' }}
          >
            <h1 className="font-display" style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#f3f4f6', marginBottom: 8 }}>
              Hack-the-<br />
              <span className="gradient-text" style={{ color: '#8b5cf6' }}>System</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', lineHeight: 1.7, color: '#6b7280', maxWidth: 520, marginBottom: 40 }}>
              You are a policymaker navigating an AI-driven automation crisis.
              Every decision triggers systemic ripple effects. Ten turns to prevent societal collapse.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
              <button
                className="btn-primary"
                style={{
                  padding: '14px 32px',
                  fontSize: 16,
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={handleStartSimulation}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Start Simulation
                  <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>→</motion.span>
                </span>
              </button>
              <button
                className="btn-ghost"
                style={{ padding: '14px 28px', fontSize: 16, color: '#6b7280' }}
                onClick={() => document.querySelector('#simulation')?.scrollIntoView({ behavior: 'smooth' })}
              >
                How It Works ↓
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, paddingTop: 32, borderTop: '1px solid rgba(139,92,246,0.12)' }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.04em', marginBottom: 4 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="w-full lg:w-[55%] h-full relative flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px 20px',
                borderRadius: 999,
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.15)',
                fontSize: 10,
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(59,130,246,0.6)',
                letterSpacing: '0.2em',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              System Core · Strategic Access: Online
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SceneLighting = ({ isCubeHovered }: { isCubeHovered: boolean }) => (
  <>
    <ambientLight intensity={0.4} color="#0f172a" />
    <directionalLight position={[14, 10, 18]} intensity={2.0} color="#f9fafb" castShadow={false} />
      <directionalLight position={[0, 18, 0]} intensity={1.35} color="#e5e7eb" castShadow={false} />
      <directionalLight position={[3, 4, -22]} intensity={1.75} color="#60a5fa" castShadow={false} />
    <pointLight position={[6, 0, 0]} intensity={isCubeHovered ? 5 : 4} distance={25} decay={2} color="#8b5cf6" />
  </>
);

interface SceneContentProps {
  isButtonHovered: boolean;
  isSimulationStarting: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  isMouseInHero: React.MutableRefObject<boolean>;
  setIsCubeHovered: (v: boolean) => void;
  setIsCubeDragging: (v: boolean) => void;
  innerGlowRef: React.MutableRefObject<THREE.Group | null>;
}

const SceneContent = ({ isButtonHovered, isSimulationStarting, mouseRef, isMouseInHero, setIsCubeHovered, setIsCubeDragging, innerGlowRef }: SceneContentProps) => {
  const camRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const responsiveScale = useMemo(() => {
    const base = 0.92;
    const widthFactor = Math.min(1.1, viewport.width / 11);
    return base * widthFactor;
  }, [viewport.width]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const microPush = Math.sin(t * 0.2) * 0.3;
    const targetZ = isSimulationStarting ? 16.2 : 18;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + microPush, 0.035);
  });

  return (
    <group ref={camRef} scale={responsiveScale}>
      <FloatingBlocks mouseRef={mouseRef} />
      <group position={[6, 0, 0]}>
        <SystemCore
          isButtonHovered={isButtonHovered}
          isSimulationStarting={isSimulationStarting}
          mouseRef={mouseRef}
          isMouseInHero={isMouseInHero}
          onCubeHover={setIsCubeHovered}
          onCubeDragging={setIsCubeDragging}
          innerGlowRef={innerGlowRef}
        />
      </group>
    </group>
  );
};
