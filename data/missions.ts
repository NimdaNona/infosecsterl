import type { MissionKey } from '@/lib/store';

export type MissionDossier = {
  id: MissionKey;
  title: string;
  headline: string;
  summary: string;
  previewMetric: string;
  previewValue: string;
  orbitRadius: number;
  orbitSpeed: number;
};

export const missionDossiers: MissionDossier[] = [
  {
    id: 'regions',
    title: 'Regions Bank Ops Theater',
    headline: 'Incident Command & Attack Surface Intelligence',
    summary:
      'Lead cross-functional response, deploy countermeasures, and institutionalize continuous improvement.',
    previewMetric: 'Critical Incidents',
    previewValue: '5 orchestrated',
    orbitRadius: 3.2,
    orbitSpeed: 0.35
  },
  {
    id: 'duke',
    title: 'Duke Energy Defense Lab',
    headline: 'Threat Hunts, EDR Tuning, Automation Impact',
    summary:
      'Launch hunts on outbound RDP/SSH, harden detections, and automate case handling at scale.',
    previewMetric: 'Targeted Hunts',
    previewValue: '6 deployed',
    orbitRadius: 3.6,
    orbitSpeed: 0.28
  },
  {
    id: 'impact',
    title: 'Impact Command Center',
    headline: 'Mission Metrics & Executive Dossiers',
    summary:
      'Quantify the measurable outcomes tied to each mission and share curated intelligence packets.',
    previewMetric: 'Risk Reduction',
    previewValue: '38% MTTR drop',
    orbitRadius: 4,
    orbitSpeed: 0.24
  },
  {
    id: 'deploy',
    title: 'Deploy Sterling Console',
    headline: 'Recruiter Operations Terminal',
    summary:
      'Schedule briefings, export battle cards, and launch contextual Q&A workflows.',
    previewMetric: 'Engagements',
    previewValue: 'Live',
    orbitRadius: 4.2,
    orbitSpeed: 0.22
  }
];
