export type IncidentDecision = {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    label: string;
    impact: string;
    outcome: string;
  }[];
};

export const incidentDecisions: IncidentDecision[] = [
  {
    id: 'stabilize-signal',
    title: 'Stabilize Alert Storm',
    description:
      'Multiple high-severity alerts are cascading from ATMs across the southeast footprint. Choose your first stabilization action.',
    options: [
      {
        id: 'triage-soc',
        label: 'Spin up rapid-response channel with SOC & fraud',
        impact: 'Centralizes signal triage and unlocks coordinated containment.',
        outcome: 'Executive briefing receives aligned view within 12 minutes.'
      },
      {
        id: 'isolate-network',
        label: 'Trigger segment isolation for affected regions',
        impact: 'Buys containment time but stalls ATM availability in two markets.',
        outcome: 'Leadership notified of customer impact; remediation clock accelerated.'
      }
    ]
  },
  {
    id: 'brief-leadership',
    title: 'Leadership Brief Synchronization',
    description:
      'Craft the executive bridge update summarizing risk posture, containment, and next steps.',
    options: [
      {
        id: 'dashboards',
        label: 'Visual telemetry deck',
        impact: 'Illustrates MTTR delta and attack surface coverage.',
        outcome: 'Board-level clarity on exposure and customer impact avoidance.'
      },
      {
        id: 'narrative',
        label: 'Narrative briefing with decision asks',
        impact: 'Highlights resource requirements and communications cadence.',
        outcome: 'Approvals granted for overnight containment windows.'
      }
    ]
  }
];

export type SurfaceNode = {
  id: string;
  label: string;
  risk: number;
  relationships: string[];
  countermeasure: string;
  resultMetric: string;
};

export const surfaceNodes: SurfaceNode[] = [
  {
    id: 'core-banking',
    label: 'Core Banking',
    risk: 0.72,
    relationships: ['fraud-analytics', 'atm-network'],
    countermeasure: 'Deploy segmentation policies & adaptive monitoring',
    resultMetric: 'Exposure band drops to 0.31 after rollout'
  },
  {
    id: 'atm-network',
    label: 'ATM Network',
    risk: 0.65,
    relationships: ['core-banking', 'mobile-banking'],
    countermeasure: 'Geo-fence admin interfaces & enforce MFA',
    resultMetric: 'Unauthorized pivot attempts blocked within 48 hours'
  },
  {
    id: 'mobile-banking',
    label: 'Mobile Banking',
    risk: 0.48,
    relationships: ['fraud-analytics'],
    countermeasure: 'Enhance anomaly detection signatures',
    resultMetric: 'False positives reduced 28% while increasing coverage'
  },
  {
    id: 'fraud-analytics',
    label: 'Fraud Analytics',
    risk: 0.53,
    relationships: ['core-banking', 'mobile-banking'],
    countermeasure: 'Integrate threat intel feeds & automated rule push',
    resultMetric: 'New detection pathways shorten dwell time to <30 mins'
  }
];

export type LoopPhase = {
  id: string;
  title: string;
  description: string;
  achievement: string;
};

export const loopPhases: LoopPhase[] = [
  {
    id: 'detect',
    title: 'Detect',
    description: 'Unified telemetry from fraud, SOC, and infrastructure surfaces the anomaly in near real time.',
    achievement: 'Integrated Splunk + EDR watchlists for shared visibility.'
  },
  {
    id: 'investigate',
    title: 'Investigate',
    description: 'Threat hunt pods map out the intrusion paths while communication sprints keep leadership aligned.',
    achievement: 'Root cause traced to credential stuffing via partner network.'
  },
  {
    id: 'respond',
    title: 'Respond',
    description: 'Countermeasures deploy automatically with manual validation checkpoints and service-owner sign off.',
    achievement: 'Containment achieved within 42 minutes; customer impact avoided.'
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Post-incident review codifies lessons learned, automation inserts, and future-state monitoring.',
    achievement: 'Cross-team playbooks ratified and codified into SOAR workflows.'
  },
  {
    id: 'improve',
    title: 'Improve',
    description: 'Follow-on tabletop and training ensures muscle memory; metrics feed into leadership scorecard.',
    achievement: 'Quarterly resilience drills measured 18% faster remediation.'
  }
];
