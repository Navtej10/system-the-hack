import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 20;
const BOX_SIZE = 0.1;

interface FloatingBlocksProps {
    mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export const FloatingBlocks = React.memo<FloatingBlocksProps>(({ mouseRef }) => {
    const instancedRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const instances = useMemo(() => {
        return Array.from({ length: COUNT }).map((_, i) => {
            const depthFactor = 0.25 + (i / COUNT) * 0.75;
            return {
                x: (Math.random() - 0.5) * 26,
                y: (Math.random() - 0.5) * 14,
                z: (Math.random() - 0.5) * 10 - 5,
                speedX: (Math.random() - 0.5) * 0.012 * depthFactor,
                speedY: (Math.random() - 0.5) * 0.01 * depthFactor,
                speedZ: (Math.random() - 0.5) * 0.006 * depthFactor,
                offset: Math.random() * Math.PI * 2,
                phase: Math.random() * Math.PI * 2,
                scale: 0.55 + Math.random() * 0.7,
                depthFactor,
            };
        });
    }, []);

    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: '#3b82f6',
                emissive: '#3b82f6',
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.45,
                metalness: 0.6,
                roughness: 0.5,
            }),
        []
    );

    const geometry = useMemo(() => new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE), []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (!instancedRef.current) return;
        const mouse = mouseRef.current;
        const cursorMag = Math.min(Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y), 1);
        const proximity = 1 - cursorMag;

        instances.forEach((inst, i) => {
            const speedBoost = 1 + proximity * 0.4;

            const baseX = inst.x + Math.sin(t * 0.25 + inst.offset) * 1.8;
            const baseY = inst.y + Math.cos(t * 0.2 + inst.phase) * 1.2;
            const baseZ = inst.z + Math.sin(t * 0.18 + inst.offset * 0.5) * 0.8;

            const driftX = (t * inst.speedX * 50 + inst.offset * 1.5) * speedBoost;
            const driftY = (t * inst.speedY * 50 + inst.phase) * speedBoost;
            const driftZ = (t * inst.speedZ * 50 * 0.4) * speedBoost;

            const x = baseX + driftX;
            const y = baseY + driftY * 0.5;
            const z = baseZ + driftZ;

            const parallaxX = mouse.x * 1.2 * inst.depthFactor;
            const parallaxY = mouse.y * 1 * inst.depthFactor;

            const repelStrength = proximity * 0.5 * inst.depthFactor;
            const repelX = -mouse.x * repelStrength;
            const repelY = -mouse.y * repelStrength;

            dummy.position.set(x + parallaxX + repelX, y + parallaxY + repelY, z);
            dummy.scale.setScalar(inst.scale * (0.92 + Math.sin(t * 0.6 + i * 0.4) * 0.08));
            dummy.rotation.set(t * 0.015 + i * 0.1, t * 0.012 + i * 0.08, t * 0.008);
            dummy.updateMatrix();
            instancedRef.current!.setMatrixAt(i, dummy.matrix);
        });
        instancedRef.current.instanceMatrix.needsUpdate = true;
    });

    return <instancedMesh ref={instancedRef} args={[geometry, material, COUNT]} frustumCulled={false} raycast={() => null} />;
});
