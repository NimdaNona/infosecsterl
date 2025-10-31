'use client';

import { useMemo } from 'react';
import { useMissionStore } from '@/lib/store';
import { motion } from 'framer-motion';

export function MissionTimeline() {
  const { timeline, setActiveMission } = useMissionStore();
  const orderedTimeline = useMemo(
    () =>
      timeline.map((entry, index) => ({
        ...entry,
        position: index
      })),
    [timeline]
  );

  return (
    <div className="sticky bottom-0 z-40 border-t border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-6 py-4">
        {orderedTimeline.map((entry) => (
          <motion.button
            key={entry.id}
            type="button"
            onClick={() => setActiveMission(entry.mission)}
            disabled={!entry.unlocked}
            className={`flex min-w-[220px] flex-col rounded-lg border px-4 py-3 text-left transition ${
              entry.unlocked
                ? 'border-neon/40 bg-white/5 text-white shadow-glow'
                : 'border-white/10 bg-black/20 text-slate-500'
            }`}
            whileHover={{ y: entry.unlocked ? -4 : 0 }}
            whileTap={{ scale: entry.unlocked ? 0.98 : 1 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-neon/80">
              {entry.label}
            </span>
            <span className="mt-2 text-sm text-slate-300">{entry.description}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
