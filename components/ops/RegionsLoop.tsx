'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { loopPhases } from '@/data/regions';
import { motion } from 'framer-motion';

export function RegionsLoop() {
  return (
    <section id="regions-loop" className="mt-28 scroll-mt-28">
      <SectionHeader
        eyebrow="Regions Bank"
        title="Continuous improvement loop"
        subtitle="Trace the institutionalized improvements that closed the loop after each major incident."
      />
      <motion.div
        className="grid gap-6 rounded-3xl border border-white/10 bg-black/50 p-8 lg:grid-cols-5"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {loopPhases.map((phase, index) => (
          <motion.div
            key={phase.id}
            className="relative flex flex-col gap-4 rounded-2xl border border-neon/20 bg-white/5 p-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-neon/80">{phase.title}</span>
            <p className="text-sm text-slate-200">{phase.description}</p>
            <p className="text-xs text-amber">{phase.achievement}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
