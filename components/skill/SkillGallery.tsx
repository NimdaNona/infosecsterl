'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { skillNodes } from '@/data/skills';
import { motion } from 'framer-motion';
import { useMissionStore } from '@/lib/store';

export function SkillGallery() {
  const setActiveMission = useMissionStore((state) => state.setActiveMission);

  return (
    <section id="skills" className="mt-32 scroll-mt-28">
      <SectionHeader
        eyebrow="Skill Laboratory"
        title="Mission-calibrated skill holograms"
        subtitle="Each hologram links to the live mission moment where the capability delivered impact."
      />
      <motion.div
        className="grid gap-6 rounded-3xl border border-white/10 bg-black/50 p-8 lg:grid-cols-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {skillNodes.map((skill, index) => (
          <motion.div
            key={skill.id}
            className="flex flex-col gap-4 rounded-2xl border border-neon/30 bg-black/60 p-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-neon/80">{skill.category}</p>
            <p className="text-xl font-semibold text-white">{skill.title}</p>
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div className="h-full rounded-full bg-neon" style={{ width: `${skill.heat * 100}%` }} />
            </div>
            <p className="text-sm text-slate-300">{skill.description}</p>
            <div className="flex flex-wrap gap-2">
              {skill.missionAnchors.map((anchor) => (
                <button
                  key={anchor}
                  type="button"
                  onClick={() => setActiveMission(anchor.startsWith('duke') ? 'duke' : 'regions')}
                  className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-300 hover:border-neon hover:text-neon"
                >
                  {anchor.replaceAll('-', ' ')}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
