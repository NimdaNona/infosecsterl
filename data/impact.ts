export type ImpactGauge = {
  id: string;
  title: string;
  value: number;
  unit: string;
  description: string;
};

export const impactGauges: ImpactGauge[] = [
  {
    id: 'mttr',
    title: 'Critical Incident MTTR',
    value: 38,
    unit: '% drop',
    description: 'Region-wide command processes collapsed remediation time to under an hour.'
  },
  {
    id: 'hunts',
    title: 'Targeted Hunts Operationalized',
    value: 6,
    unit: 'hunts',
    description: 'Signature hunts deployed across OT and enterprise footprints.'
  },
  {
    id: 'automation',
    title: 'Analyst Hours Returned',
    value: 280,
    unit: 'hrs/qtr',
    description: 'Automation across enrichment, routing, and closure freed senior analysts for proactive coverage.'
  }
];

export type ImpactSignal = {
  id: string;
  label: string;
  trend: number[];
  narrative: string;
  mission: 'regions' | 'duke';
};

export const impactSignals: ImpactSignal[] = [
  {
    id: 'containment-time',
    label: 'Containment Time (mins)',
    trend: [68, 63, 58, 55, 49, 43],
    narrative: 'Incident orchestration tightened stakeholder loops and automated containment actions.',
    mission: 'regions'
  },
  {
    id: 'hunt-coverage',
    label: 'Threat Coverage %',
    trend: [42, 47, 53, 61, 68, 74],
    narrative: 'Hunt modernization surfaced stealthy adversary behaviors and turned them into detections.',
    mission: 'duke'
  },
  {
    id: 'automation-lift',
    label: 'Automation Lift',
    trend: [18, 24, 32, 37, 41, 45],
    narrative: 'EDR + SOAR integration removed manual toil and improved cross-team collaboration.',
    mission: 'duke'
  }
];

export type MilestoneDossier = {
  id: string;
  title: string;
  summary: string;
  evidence: string;
};

export const milestoneDossiers: MilestoneDossier[] = [
  {
    id: 'regions-tabletop',
    title: 'Regions Cross-Domain Tabletop',
    summary: 'Ran a board-observed tabletop translating incident lessons into strategic investment.',
    evidence: 'Resulted in modernization roadmap for fraud analytics telemetry sharing.'
  },
  {
    id: 'duke-automation',
    title: 'Duke Automation Rollout',
    summary: 'Launched automated case management upgrades across SOC pods.',
    evidence: 'Cut warm-hand-off delays from 27 minutes to 6 minutes.'
  },
  {
    id: 'executive-brief',
    title: 'Executive Briefing Cadence',
    summary: 'Established ongoing executive briefing program for cyber operations.',
    evidence: 'Increased leadership confidence and budget approvals for detection engineering.'
  }
];
