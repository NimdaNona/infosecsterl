'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { huntScenarios } from '@/data/duke';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMissionStore } from '@/lib/store';

export function DukeHunts() {
  const [activeHunt, setActiveHunt] = useState(huntScenarios[0]);
  const unlockTimeline = useMissionStore((state) => state.unlockTimeline);

  const handleSelect = (huntId: string) => {
    const hunt = huntScenarios.find((scenario) => scenario.id === huntId);
    if (!hunt) return;
    setActiveHunt(hunt);
    unlockTimeline('duke-hunts');
  };

  return (
    <section id="duke-hunts" className="mt-32 scroll-mt-28">
      <SectionHeader
        eyebrow="Duke Energy"
        title="Threat hunting command deck"
        subtitle="Launch the hunts executed across outbound RDP/SSH, uncommon remote tools, and covert C2 behaviors."
      />
      <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {huntScenarios.map((hunt) => {
            const active = hunt.id === activeHunt.id;
            return (
              <button
                key={hunt.id}
                type="button"
                onClick={() => handleSelect(hunt.id)}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                  active
                    ? 'border-neon/60 bg-neon/10 text-white shadow-glow'
                    : 'border-white/10 bg-black/40 text-slate-300 hover:border-neon/30'
                }`}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-neon/80">{hunt.title}</p>
                <p className="mt-2 text-sm text-slate-300">{hunt.description}</p>
                <p className="mt-3 text-xs text-amber">Techniques: {hunt.mitreTechniques.join(', ')}</p>
              </button>
            );
          })}
        </motion.div>
        <motion.div
          className="rounded-3xl border border-white/10 bg-black/60 p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-white">Telemetry Playback</h3>
          <p className="mt-2 text-sm text-slate-300">
            Baseline versus anomaly traces visualize the hunt trajectory.
          </p>
          <div className="mt-6 grid gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Baseline vs Anomaly</p>
              <div className="mt-3 flex h-40 items-end gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                {activeHunt.baselines.map((baseline, index) => {
                  const anomaly = activeHunt.anomalies[index];
                  return (
                    <div key={index} className="flex h-full w-full flex-col justify-end">
                      <div
                        className="w-full rounded-t-md bg-magenta"
                        style={{ height: `${anomaly * 6}px` }}
                        aria-hidden
                      />
                      <div
                        className="mt-1 w-full rounded-t-md bg-neon/80"
                        style={{ height: `${baseline * 6}px` }}
                        aria-hidden
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-200">
              {activeHunt.insights.map((insight) => (
                <p key={insight} className="rounded-2xl border border-neon/30 bg-black/40 p-4 text-slate-200">
                  {insight}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
