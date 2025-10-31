'use client';

import { motion } from 'framer-motion';
import { missionDossiers } from '@/data/missions';
import { useMissionStore } from '@/lib/store';

export function MissionPanel() {
  const { activeMission, setActiveMission } = useMissionStore();

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[2fr,1fr]">
      <motion.div
        className="rounded-3xl border border-white/10 bg-white/5 p-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-white">Mission dossier</h3>
        <p className="mt-3 text-sm text-slate-300">
          Rotate the command orbit or select a dossier below to enter the mission theater. Keyboard access is
          supported via Tab/Shift+Tab and Enter.
        </p>
        <ul className="mt-6 grid gap-4">
          {missionDossiers.map((mission) => (
            <li key={mission.id}>
              <button
                type="button"
                onClick={() => setActiveMission(mission.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  mission.id === activeMission
                    ? 'border-neon/60 bg-neon/10 text-white shadow-glow'
                    : 'border-white/10 bg-black/40 text-slate-200 hover:border-neon/40'
                }`}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-neon/80">{mission.headline}</p>
                <p className="mt-2 text-xl font-semibold text-white">{mission.title}</p>
                <p className="mt-2 text-sm text-slate-300">{mission.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                  {mission.previewMetric}: {mission.previewValue}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="rounded-3xl border border-neon/30 bg-black/60 p-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-lg uppercase tracking-[0.3em] text-neon">Telemetry Feed</h3>
        <div className="mt-6 space-y-5 text-sm text-slate-300">
          <p>
            Active Mission: <span className="text-white">{activeMission.toUpperCase()}</span>
          </p>
          <p>Atmospheric integrity stable. Countermeasure queue ready.</p>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Hold spacebar for wireframe view.</p>
        </div>
      </motion.div>
    </div>
  );
}
