'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { impactGauges, impactSignals, milestoneDossiers } from '@/data/impact';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function ImpactCommand() {
  const [missionFilter, setMissionFilter] = useState<'regions' | 'duke' | 'all'>('all');

  const signals = impactSignals.filter((signal) => missionFilter === 'all' || signal.mission === missionFilter);

  return (
    <section id="impact" className="mt-32 scroll-mt-28">
      <SectionHeader
        eyebrow="Impact Command"
        title="Outcome telemetry & dossiers"
        subtitle="Quantify mission impact with live gauges, trend constellations, and executive-ready dossiers."
      >
        <div className="flex flex-wrap items-center gap-3">
          {(['all', 'regions', 'duke'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setMissionFilter(filter)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                missionFilter === filter
                  ? 'border-neon/60 bg-neon/10 text-neon'
                  : 'border-white/10 bg-black/40 text-slate-300 hover:border-neon/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </SectionHeader>
      <motion.div
        className="grid gap-6 rounded-3xl border border-white/10 bg-black/50 p-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {impactGauges.map((gauge) => (
            <motion.div
              key={gauge.id}
              className="rounded-2xl border border-neon/30 bg-black/60 p-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-neon/80">{gauge.title}</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {gauge.value}
                <span className="ml-1 text-base text-slate-400">{gauge.unit}</span>
              </p>
              <p className="mt-3 text-sm text-slate-300">{gauge.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {signals.map((signal) => (
            <motion.div
              key={signal.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{signal.label}</p>
              <div className="mt-4 flex h-24 items-end gap-2">
                {signal.trend.map((value, index) => (
                  <div key={index} className="flex h-full w-full items-end">
                    <div className="w-full rounded-t-md bg-neon/80" style={{ height: `${value * 1.8}px` }} aria-hidden />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-300">{signal.narrative}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {milestoneDossiers.map((milestone) => (
            <motion.div
              key={milestone.id}
              className="flex flex-col gap-3 rounded-2xl border border-neon/20 bg-black/60 p-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-neon/80">{milestone.title}</p>
              <p className="text-sm text-slate-300">{milestone.summary}</p>
              <p className="text-xs text-amber">{milestone.evidence}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
