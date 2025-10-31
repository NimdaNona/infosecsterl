'use client';

import { motion } from 'framer-motion';
import { useMissionStore } from '@/lib/store';

export function LandingHero() {
  const setActiveMission = useMissionStore((state) => state.setActiveMission);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,247,255,0.2),_rgba(5,6,11,0.9))]" />
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_120%,_rgba(255,77,216,0.08),_transparent_55%)]" />
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6">
        <motion.span
          className="text-sm uppercase tracking-[0.5em] text-neon"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sterling Thompson // Cyber Mission Commander
        </motion.span>
        <motion.h1
          className="text-5xl font-semibold text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Guiding high-stakes response, hunts, and automation that shield critical enterprises.
        </motion.h1>
        <motion.p
          className="max-w-3xl text-lg text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Step into mission control to replay the critical incidents at Regions Bank and Duke Energy. Explore
          the telemetry, decisions, and automation that transformed cyber operations.
        </motion.p>
        <div className="flex flex-wrap items-center gap-6">
          <motion.button
            type="button"
            onClick={() => setActiveMission('regions')}
            className="rounded-full border border-neon/60 bg-neon/10 px-6 py-3 text-sm uppercase tracking-[0.4em] text-neon shadow-glow transition hover:bg-neon/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Begin Mission
          </motion.button>
          <motion.div
            className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-black/40 p-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {[
              { label: 'Critical Incidents Led', value: '5' },
              { label: 'Targeted Hunts', value: '6' },
              { label: 'Automation Hours Returned', value: '280' }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col text-left">
                <span className="text-3xl font-semibold text-white">{stat.value}</span>
                <span className="text-xs uppercase tracking-[0.25em] text-slate-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
