'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { missionDossiers } from '@/data/missions';
import { useMissionStore, type MissionKey } from '@/lib/store';

function MissionSatellite({
  index,
  radius,
  speed,
  title,
  summary,
  missionId
}: {
  index: number;
  radius: number;
  speed: number;
  title: string;
  summary: string;
  missionId: MissionKey;
}) {
  const setActiveMission = useMissionStore((state) => state.setActiveMission);
  const angle = useMemo(() => (Math.PI * 2 * index) / missionDossiers.length, [index]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    const x = Math.cos(angle + time) * radius;
    const z = Math.sin(angle + time) * radius;
    const group = state.scene.getObjectByName(`mission-satellite-${missionId}`);
    if (group) {
      group.position.set(x, 0.2, z);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.9}>
      <group
        name={`mission-satellite-${missionId}`}
        onClick={() => setActiveMission(missionId)}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh scale={0.28}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#63f7ff" emissive="#63f7ff" emissiveIntensity={0.35} metalness={0.4} roughness={0.1} />
        </mesh>
        <Html distanceFactor={12} center>
          <div className="w-48 rounded-lg border border-neon/40 bg-black/70 p-3 text-center text-xs uppercase text-slate-200 shadow-glow">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-300">{summary}</p>
            <p className="mt-3 text-[10px] tracking-[0.3em] text-neon">Engage</p>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function MissionScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6.5, 64]} />
        <meshStandardMaterial
          color="#0c1018"
          emissive="#1a2a40"
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      {missionDossiers.map((mission, index) => (
        <MissionSatellite
          key={mission.id}
          index={index}
          radius={mission.orbitRadius}
          speed={mission.orbitSpeed}
          title={mission.title}
          summary={mission.headline}
          missionId={mission.id}
        />
      ))}
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </>
  );
}

export function MissionOrbit() {
  return (
    <div className="relative h-[520px] w-full rounded-3xl border border-white/10 bg-black/60">
      <Canvas camera={{ position: [0, 4, 8], fov: 55 }}>
        <Suspense fallback={null}>
          <MissionScene />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-neon/20" />
    </div>
  );
}
