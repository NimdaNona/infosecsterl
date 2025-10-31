'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { tuningScenarios } from '@/data/duke';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function DukeTuning() {
  const [scenario, setScenario] = useState(tuningScenarios[0]);

  return (
    <section id="duke-tuning" className="mt-28 scroll-mt-28">
      <SectionHeader
        eyebrow="Duke Energy"
        title="EDR content tuning"
        subtitle="Dial into the before-and-after telemetry that transformed detection fidelity."
      />
      <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
        <motion.div
          className="rounded-3xl border border-white/10 bg-black/50 p-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white">Scenario Controls</h3>
          <div className="mt-6 space-y-4">
            {tuningScenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScenario(item)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  item.id === scenario.id
                    ? 'border-neon/60 bg-neon/10 text-white shadow-glow'
                    : 'border-white/10 bg-black/40 text-slate-200 hover:border-neon/30'
                }`}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-neon/80">{item.title}</p>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="rounded-3xl border border-neon/30 bg-black/60 p-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-white">Signal Transformation</h3>
          <div className="mt-5 grid gap-4 text-sm text-slate-200">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
              <p>False Positive Volume</p>
              <p className="font-mono text-lg text-amber">
                {scenario.afterFalsePositive} <span className="text-xs text-slate-400">/ {scenario.beforeFalsePositive}</span>
              </p>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
              <p>Detection Coverage</p>
              <p className="font-mono text-lg text-neon">
                {scenario.coverageAfter}% <span className="text-xs text-slate-400">/ {scenario.coverageBefore}%</span>
              </p>
            </div>
            <p className="rounded-2xl border border-neon/30 bg-black/40 p-4 text-slate-200">{scenario.highlight}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
