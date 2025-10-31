'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { deployCommands } from '@/data/deploy';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function DeployConsole() {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    const command = input.trim();
    const entry = deployCommands.find((item) => item.command === command);
    if (entry) {
      setHistory((prev) => [
        ...prev,
        `$ ${command}`,
        entry.requiresForm
          ? '→ Opening scheduling workflow (placeholder integration).'
          : entry.id === 'battle-card'
          ? '→ Generating executive battle card export (download prompt forthcoming).'
          : '→ Q&A module is staged for future activation.'
      ]);
    } else {
      setHistory((prev) => [...prev, `$ ${command}`, '→ Command not recognized. Type schedule_debrief, download_battle_card, launch_qna.']);
    }
    setInput('');
  };

  return (
    <section id="deploy" className="mt-32 scroll-mt-28">
      <SectionHeader
        eyebrow="Deployment Console"
        title="Deploy Sterling"
        subtitle="Issue recruiter-grade commands to coordinate the next engagement."
      />
      <motion.div
        className="rounded-3xl border border-white/10 bg-black/60 p-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <span className="font-mono text-slate-400">sterling@mission-control:</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-1 rounded-xl border border-white/20 bg-black/60 px-4 py-2 font-mono text-sm text-white focus:border-neon focus:outline-none"
            placeholder="schedule_debrief"
            aria-label="Deploy console command"
          />
          <button
            type="submit"
            className="rounded-xl border border-neon/40 bg-neon/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-neon hover:bg-neon/20"
          >
            Execute
          </button>
        </form>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-sm text-slate-200">
          {history.length === 0 ? (
            <p className="text-slate-500">
              Awaiting command. Try <code className="text-neon">schedule_debrief</code> or{' '}
              <code className="text-neon">download_battle_card</code>.
            </p>
          ) : (
            <ul className="space-y-2">
              {history.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {deployCommands.map((command) => (
            <div key={command.id} className="rounded-2xl border border-neon/30 bg-black/60 p-5 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/80">{command.command}</p>
              <p className="mt-2">{command.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
