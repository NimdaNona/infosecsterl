'use client';

import { incidentDecisions } from '@/data/regions';
import { SectionHeader } from '@/components/common/SectionHeader';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMissionStore } from '@/lib/store';

export function RegionsIncident() {
  const [selection, setSelection] = useState<Record<string, string>>({});
  const unlockTimeline = useMissionStore((state) => state.unlockTimeline);

  const handleSelect = (decisionId: string, optionId: string) => {
    setSelection((state) => ({ ...state, [decisionId]: optionId }));
    unlockTimeline('regions-incident');
  };

  return (
    <section id="regions-incident" className="mt-28 scroll-mt-28">
      <SectionHeader
        eyebrow="Regions Bank"
        title="Real-time incident orchestration"
        subtitle="Replay the critical choices that stabilized an escalating fraud-adjacent intrusion."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          className="rounded-3xl border border-neon/30 bg-black/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white">Command Bridge Decisions</h3>
          <p className="mt-3 text-sm text-slate-300">
            Select the responses that best maintain stakeholder trust and minimize customer impact. Each
            choice reveals the resulting executive briefing notes.
          </p>
          <div className="mt-6 space-y-6">
            {incidentDecisions.map((decision) => (
              <div key={decision.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="text-lg font-semibold text-white">{decision.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{decision.description}</p>
                <div className="mt-4 grid gap-3">
                  {decision.options.map((option) => {
                    const selected = selection[decision.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelect(decision.id, option.id)}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          selected
                            ? 'border-neon/60 bg-neon/10 text-white shadow-glow'
                            : 'border-white/10 bg-black/40 text-slate-200 hover:border-neon/40'
                        }`}
                      >
                        <p className="text-sm font-semibold text-white">{option.label}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">Impact</p>
                        <p className="text-sm text-slate-300">{option.impact}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">Outcome</p>
                        <p className="text-sm text-slate-300">{option.outcome}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-black/40 to-black/80 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-white">Executive briefing stream</h3>
          <p className="mt-2 text-sm text-slate-300">
            Hover over the briefing cards to inspect the intelligence fed to executives in near real-time.
          </p>
          <div className="mt-6 space-y-4">
            {Object.entries(selection).map(([decisionId, optionId]) => {
              const decision = incidentDecisions.find((d) => d.id === decisionId);
              const option = decision?.options.find((opt) => opt.id === optionId);
              if (!decision || !option) return null;
              return (
                <div key={option.id} className="rounded-2xl border border-neon/40 bg-black/60 p-5 shadow-glow">
                  <p className="text-xs uppercase tracking-[0.35em] text-neon">{decision.title}</p>
                  <p className="mt-2 text-sm text-white">{option.impact}</p>
                  <p className="mt-1 text-xs text-slate-400">{option.outcome}</p>
                </div>
              );
            })}
            {Object.keys(selection).length === 0 ? (
              <p className="text-sm text-slate-400">
                Engage a decision to populate the briefing timeline. Countermeasure queue standing by.
              </p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
