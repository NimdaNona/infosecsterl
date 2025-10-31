export type SkillNode = {
  id: string;
  title: string;
  category: 'Incident Command' | 'Threat Hunting' | 'Automation' | 'Stakeholder Comms' | 'Toolsmithing';
  heat: number;
  description: string;
  missionAnchors: string[];
};

export const skillNodes: SkillNode[] = [
  {
    id: 'crisis-leadership',
    title: 'Crisis Leadership',
    category: 'Incident Command',
    heat: 0.94,
    description: 'Guided multi-team response bridges and synchronized executive decisions under pressure.',
    missionAnchors: ['regions-incident', 'deploy-battle-card']
  },
  {
    id: 'splunk',
    title: 'Splunk Huntcraft',
    category: 'Threat Hunting',
    heat: 0.88,
    description: 'Designed multi-stage hunts pairing Splunk queries with endpoint forensics.',
    missionAnchors: ['duke-hunt-outbound-rdp', 'duke-hunt-certutil']
  },
  {
    id: 'automation',
    title: 'Automation Architecture',
    category: 'Automation',
    heat: 0.82,
    description: 'Automated enrichment, routing, and closure validation across SOAR + case systems.',
    missionAnchors: ['duke-automation-routing', 'regions-loop-improve']
  },
  {
    id: 'executive-briefing',
    title: 'Executive Briefings',
    category: 'Stakeholder Comms',
    heat: 0.9,
    description: 'Delivered rapid, decision-oriented updates to executives and regulators.',
    missionAnchors: ['regions-briefing-stream', 'deploy-schedule']
  },
  {
    id: 'edr-engineering',
    title: 'EDR Content Engineering',
    category: 'Toolsmithing',
    heat: 0.8,
    description: 'Built custom detection packages that increase fidelity and lower false positive rates.',
    missionAnchors: ['duke-tuning-privileged-access']
  }
];
