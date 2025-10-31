'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { surfaceNodes } from '@/data/regions';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMissionStore } from '@/lib/store';

export function RegionsSurface() {
  const [deployedNode, setDeployedNode] = useState<string | null>(null);
  const unlockTimeline = useMissionStore((state) => state.unlockTimeline);

  const handleDeploy = (nodeId: string) => {
    setDeployedNode(nodeId);
    unlockTimeline('regions-surface');
  };

  return (
    <section id="regions-surface" className="mt-28 scroll-mt-28">
      <SectionHeader
        eyebrow="Regions Bank"
        title="Attack surface intelligence"
        subtitle="Deploy countermeasures across critical assets and watch residual risk drop in real time."
      />
      <motion.div
        className="grid gap-8 lg:grid-cols-[1.2fr,1fr]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative min-h-[360px] rounded-3xl border border-neon/30 bg-black/60 p-6">
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <svg viewBox="0 0 600 400" className="h-full w-full">
              <defs>
                <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(99,247,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(99,247,255,0)" />
                </radialGradient>
              </defs>
              {surfaceNodes.map((node) => {
                const x = 300 + Math.cos(surfaceNodes.indexOf(node) * 1.6) * 180;
                const y = 200 + Math.sin(surfaceNodes.indexOf(node) * 1.6) * 120;
                return surfaceNodes
                  .filter((relationship) => node.relationships.includes(relationship.id))
                  .map((target) => {
                    const tx = 300 + Math.cos(surfaceNodes.indexOf(target) * 1.6) * 180;
                    const ty = 200 + Math.sin(surfaceNodes.indexOf(target) * 1.6) * 120;
                    return (
                      <line
                        key={`${node.id}-${target.id}`}
                        x1={x}
                        y1={y}
                        x2={tx}
                        y2={ty}
                        stroke="rgba(99,247,255,0.25)"
                        strokeWidth={1.2}
                      />
                    );
                  });
              })}
              {surfaceNodes.map((node) => {
                const x = 300 + Math.cos(surfaceNodes.indexOf(node) * 1.6) * 180;
                const y = 200 + Math.sin(surfaceNodes.indexOf(node) * 1.6) * 120;
                const active = deployedNode === node.id;
                return (
                  <g key={node.id}>
                    <circle cx={x} cy={y} r={active ? 32 : 26} fill="url(#pulse)" opacity={active ? 0.7 : 0.35}>
                      <animate attributeName="opacity" values={active ? '0.2;0.7;0.2' : '0.2;0.35;0.2'} dur="6s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={x} cy={y} r={20} fill="rgba(5,6,11,0.9)" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fontSize={10}
                      fill="white"
                      style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                    >
                      {node.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
        <div className="space-y-4">
          {surfaceNodes.map((node) => {
            const active = deployedNode === node.id;
            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => handleDeploy(node.id)}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                  active
                    ? 'border-neon/60 bg-neon/10 text-white shadow-glow'
                    : 'border-white/10 bg-black/40 text-slate-200 hover:border-neon/30'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-neon/80">{node.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Residual Risk: {(node.risk * 100).toFixed(0)}%
                </p>
                <p className="mt-2 text-sm text-slate-300">{node.countermeasure}</p>
                {active ? (
                  <p className="mt-3 text-xs text-neon">{node.resultMetric}</p>
                ) : (
                  <p className="mt-3 text-xs text-slate-400">Deploy countermeasure to view results.</p>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
