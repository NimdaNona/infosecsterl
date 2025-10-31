'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { automationModules } from '@/data/duke';
import { motion } from 'framer-motion';

export function DukeAutomation() {
  return (
    <section id="duke-automation" className="mt-28 scroll-mt-28">
      <SectionHeader
        eyebrow="Duke Energy"
        title="Incident automation workflow"
        subtitle="Toggle automation modules to see how analyst time and MTTR dropped."
      />
      <motion.div
        className="rounded-3xl border border-white/10 bg-black/50 p-8"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {automationModules.map((module, index) => (
            <motion.div
              key={module.id}
              className="flex flex-col gap-4 rounded-2xl border border-neon/30 bg-black/60 p-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-neon/80">{module.title}</p>
              <p className="text-sm text-slate-200">{module.description}</p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p>
                  Analyst Hours Saved: <span className="font-mono text-neon">{module.analystHoursSaved}</span>
                </p>
                <p>
                  MTTR Reduction: <span className="font-mono text-amber">{module.mttrReduction}%</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
