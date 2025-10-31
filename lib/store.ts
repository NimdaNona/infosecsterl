import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type MissionKey = 'landing' | 'regions' | 'duke' | 'impact' | 'deploy';

export type TimelineEntry = {
  id: string;
  label: string;
  description: string;
  mission: MissionKey;
  unlocked: boolean;
};

type AudioChannels = {
  ambience: boolean;
  effects: boolean;
  narration: boolean;
};

type MissionState = {
  activeMission: MissionKey;
  timeline: TimelineEntry[];
  setActiveMission: (mission: MissionKey) => void;
  unlockTimeline: (entryId: string) => void;
  audio: AudioChannels;
  toggleAudio: (channel: keyof AudioChannels) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
};

const initialTimeline: TimelineEntry[] = [
  {
    id: 'boot',
    label: 'Initialize Link',
    description: 'Landing sequence engaged with telemetry calibration.',
    mission: 'landing',
    unlocked: true
  },
  {
    id: 'regions-incident',
    label: 'Regions Bank Incident Command',
    description: 'Command bridge simulation and executive briefing replay.',
    mission: 'regions',
    unlocked: false
  },
  {
    id: 'regions-surface',
    label: 'Attack Surface Countermeasures',
    description: 'Deploy containment pulses and audit residual risk.',
    mission: 'regions',
    unlocked: false
  },
  {
    id: 'duke-hunts',
    label: 'Threat Hunt Telemetry',
    description: 'Hunt deck baseline versus anomaly playback.',
    mission: 'duke',
    unlocked: false
  },
  {
    id: 'impact-command',
    label: 'Impact Signal Constellation',
    description: 'Mission metrics, milestones, and executive dossiers.',
    mission: 'impact',
    unlocked: false
  },
  {
    id: 'deploy-console',
    label: 'Deploy Sterling Console',
    description: 'Launch recruiter workflows and battle card export.',
    mission: 'deploy',
    unlocked: false
  }
];

export const useMissionStore = create<MissionState>()(
  devtools((set) => ({
    activeMission: 'landing',
    timeline: initialTimeline,
    audio: {
      ambience: true,
      effects: true,
      narration: true
    },
    reducedMotion: false,
    setActiveMission: (mission) =>
      set((state) => ({
        activeMission: mission,
        timeline: state.timeline.map((entry) =>
          entry.mission === mission ? { ...entry, unlocked: true } : entry
        )
      })),
    unlockTimeline: (entryId) =>
      set((state) => ({
        timeline: state.timeline.map((entry) =>
          entry.id === entryId ? { ...entry, unlocked: true } : entry
        )
      })),
    toggleAudio: (channel) =>
      set((state) => ({
        audio: { ...state.audio, [channel]: !state.audio[channel] }
      })),
    setReducedMotion: (value) => set(() => ({ reducedMotion: value }))
  }))
);
