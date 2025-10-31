'use client';

import { useMemo, useState } from 'react';
import { narrationCues } from '@/data/narration';
import { useMissionStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function NarrationConsole() {
  const activeMission = useMissionStore((state) => state.activeMission);
  const [visible, setVisible] = useState(true);

  const activeCue = useMemo(() => {
    switch (activeMission) {
      case 'regions':
        return narrationCues.find((cue) => cue.id === 'regions-brief');
      case 'duke':
        return narrationCues.find((cue) => cue.id === 'duke-hunt');
      case 'impact':
        return narrationCues.find((cue) => cue.id === 'impact-brief');
      case 'deploy':
        return narrationCues.find((cue) => cue.id === 'deploy-console');
      default:
        return narrationCues.find((cue) => cue.id === 'landing-init');
    }
  }, [activeMission]);

  if (!activeCue) {
    return null;
  }

  return (
    <div className="fixed right-6 top-24 z-40 w-[320px]">
      <button
        type="button"
        onClick={() => setVisible((state) => !state)}
        className="mb-2 w-full rounded-t-lg border border-white/20 bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 hover:border-neon hover:text-neon"
      >
        Narration Console
      </button>
      <AnimatePresence>
        {visible ? (
          <motion.div
            key={activeCue.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 rounded-b-lg border border-white/20 bg-black/70 p-4 text-sm text-slate-200"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neon/80">{activeCue.label}</p>
            <p className="leading-relaxed text-slate-200">{activeCue.transcript}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
