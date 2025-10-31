'use client';

import { useEffect } from 'react';
import { useMissionStore } from '@/lib/store';
import { missionDossiers } from '@/data/missions';
import { useAudioEngine } from '@/lib/audio';

export function HudTelemetry() {
  const { activeMission, audio, toggleAudio, setReducedMotion } = useMissionStore();
  useAudioEngine();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const listener = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [setReducedMotion]);

  const active = missionDossiers.find((mission) => mission.id === activeMission);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Mission</p>
          <p className="text-lg font-semibold text-white">
            {active ? active.title : 'Landing Sequence'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {(['ambience', 'effects', 'narration'] as const).map((channel) => (
            <button
              key={channel}
              type="button"
              onClick={() => toggleAudio(channel)}
              className={`rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-wider transition hover:border-neon hover:text-neon ${
                audio[channel] ? 'bg-white/10 text-white' : 'bg-black/40 text-slate-400'
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
