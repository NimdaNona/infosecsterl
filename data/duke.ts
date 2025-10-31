export type HuntScenario = {
  id: string;
  title: string;
  description: string;
  mitreTechniques: string[];
  baselines: number[];
  anomalies: number[];
  insights: string[];
};

export const huntScenarios: HuntScenario[] = [
  {
    id: 'outbound-rdp',
    title: 'Outbound RDP & SSH Hunt',
    description:
      'Pivoted across Splunk and endpoint telemetry to differentiate legitimate remote ops from credential abuse.',
    mitreTechniques: ['T1021.001', 'T1078'],
    baselines: [4, 6, 5, 4, 5, 6, 5],
    anomalies: [4, 6, 9, 14, 11, 7, 5],
    insights: [
      'New detection deployed blocking privileged remote sessions from non-compliant hosts.',
      'Firewall rule hardening reduced cross-segment exposure by 22%.'
    ]
  },
  {
    id: 'uncommon-rats',
    title: 'Uncommon Remote Access Tools',
    description:
      'Enumerated unauthorized remote tooling across OT and enterprise segments to expose high-risk footholds.',
    mitreTechniques: ['T1219', 'T1106'],
    baselines: [2, 3, 2, 4, 3, 2, 2],
    anomalies: [2, 3, 5, 8, 6, 3, 2],
    insights: [
      'Automated SOAR workflow isolates flagged assets within 90 seconds.',
      'Playbook updates codified validation steps for plant operators.'
    ]
  },
  {
    id: 'c2-ntp',
    title: 'C2 over NTP & Living-off-the-Land',
    description:
      'Correlated network beaconing with LOLBins to uncover covert command channels.',
    mitreTechniques: ['T1095', 'T1105'],
    baselines: [5, 4, 4, 4, 5, 4, 4],
    anomalies: [5, 4, 7, 13, 9, 6, 4],
    insights: [
      'Custom detection content pushed to EDR halved dwell time for covert beacons.',
      'NTP traffic analytics uncovered rogue hosts with disabled logging.'
    ]
  },
  {
    id: 'regsvr32',
    title: 'Regsvr32 Proxy Execution',
    description:
      'Investigated regsvr32 misuse to deploy remote payloads via trusted binaries.',
    mitreTechniques: ['T1218.010'],
    baselines: [3, 3, 3, 2, 2, 3, 3],
    anomalies: [3, 3, 4, 7, 6, 4, 3],
    insights: [
      'Alert to automation pipeline builds case artifacts for IR in under 4 minutes.',
      'Visibility gap closed by enforcing script block logging on critical segments.'
    ]
  },
  {
    id: 'certutil',
    title: 'Certutil Abuse',
    description:
      'Tracked certutil usage for payload staging and certificate manipulation across critical infrastructure.',
    mitreTechniques: ['T1105', 'T1140'],
    baselines: [4, 4, 5, 4, 4, 5, 4],
    anomalies: [4, 4, 6, 10, 8, 6, 4],
    insights: [
      'Hunt closed credential misuse loop with adaptive alerts to privileged teams.',
      'Documented gap led to new certificate issuance policy & automation.'
    ]
  }
];

export type TuningScenario = {
  id: string;
  title: string;
  description: string;
  beforeFalsePositive: number;
  afterFalsePositive: number;
  coverageBefore: number;
  coverageAfter: number;
  highlight: string;
};

export const tuningScenarios: TuningScenario[] = [
  {
    id: 'privileged-access',
    title: 'Privileged Access Monitoring',
    description: 'Iteratively tuned detections to balance signal and noise for domain admin activity.',
    beforeFalsePositive: 62,
    afterFalsePositive: 27,
    coverageBefore: 48,
    coverageAfter: 82,
    highlight: 'Tiered analytics with contextual enrichment trimmed MTTR by 36%.'
  },
  {
    id: 'endpoint-lateral',
    title: 'Endpoint Lateral Movement',
    description: 'Expanded heuristics on SMB/WinRM pivoting to surface stealthy traversal.',
    beforeFalsePositive: 74,
    afterFalsePositive: 33,
    coverageBefore: 41,
    coverageAfter: 78,
    highlight: 'Collaboration with OT engineering aligned containment playbooks.'
  }
];

export type AutomationModule = {
  id: string;
  title: string;
  description: string;
  analystHoursSaved: number;
  mttrReduction: number;
};

export const automationModules: AutomationModule[] = [
  {
    id: 'enrichment',
    title: 'Contextual Enrichment',
    description: 'Auto-attaches asset criticality, user risk scoring, and playbook context.',
    analystHoursSaved: 120,
    mttrReduction: 22
  },
  {
    id: 'routing',
    title: 'Intelligent Routing',
    description: 'Routes incidents to the right pod with full context and escalation triggers.',
    analystHoursSaved: 96,
    mttrReduction: 18
  },
  {
    id: 'closure',
    title: 'Automated Closure Validation',
    description: 'Verifies remediation evidence and closes loop with leadership reporting.',
    analystHoursSaved: 64,
    mttrReduction: 14
  }
];
