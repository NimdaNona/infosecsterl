export const missionDossiers = [
  {
    id: "regions",
    label: "Regions Bank",
    subtitle: "Command Center Response",
    summary:
      "Cross-functional incident command, attack surface analytics, and continuous improvement loops safeguarding financial operations.",
    metrics: ["MTTR -38%", "Playbooks Launched: 6", "Exec Brief Cadence: 12m"],
    target: "#regions-bank",
    orbit: { angle: 18, radius: 46 },
  },
  {
    id: "duke",
    label: "Duke Energy",
    subtitle: "Threat Hunting & Automation",
    summary:
      "Tier-0 hunts, EDR tuning, and automation pipelines rewiring response velocity across the critical infrastructure estate.",
    metrics: ["Hunts Activated: 5", "Noise Reduction: 28%", "Automation Hours Saved: 240"],
    target: "#duke-energy",
    orbit: { angle: 160, radius: 54 },
  },
  {
    id: "impact",
    label: "Impact Command",
    subtitle: "Outcomes & Signals",
    summary:
      "Aggregated performance telemetry revealing Sterling's measurable impact across missions and capabilities.",
    metrics: ["MTTR Delta: -38%", "Analyst Hours Freed: 180", "Stakeholder NPS: +22"],
    target: "#impact",
    orbit: { angle: 260, radius: 40 },
  },
];

export const timelineSegments = [
  {
    id: "landing",
    title: "Initiate Mission",
    description: "Boot sequence and telemetry bring Sterling's command center online.",
  },
  {
    id: "mission-control",
    title: "Mission Control",
    description: "Select dossiers and review live intelligence feeds.",
  },
  {
    id: "regions-bank",
    title: "Regions Ops",
    description: "Commanded escalations, surface intelligence, and improvement loops.",
  },
  {
    id: "duke-energy",
    title: "Duke Ops",
    description: "Advanced hunts, tuned detections, and automation pipelines.",
  },
  {
    id: "skills",
    title: "Skill Gallery",
    description: "Orbit core competencies and supporting artifacts.",
  },
  {
    id: "impact",
    title: "Impact Signals",
    description: "Quantified outcomes across the mission landscape.",
  },
  {
    id: "deploy",
    title: "Deploy Sterling",
    description: "Engage the console to schedule debriefs and download mission briefs.",
  },
];

export const incidentAssets = [
  { id: "edge-gateway", label: "Edge Gateway", x: 18, y: 28, zone: "perimeter" },
  { id: "digital-bank", label: "Digital Banking", x: 10, y: 54, zone: "customer" },
  { id: "soc-bridge", label: "SOC Bridge", x: 36, y: 18, zone: "command" },
  { id: "iam-hub", label: "IAM Hub", x: 44, y: 46, zone: "identity" },
  { id: "core-banking", label: "Core Banking", x: 64, y: 36, zone: "crown" },
  { id: "payments-mesh", label: "Payments Mesh", x: 80, y: 58, zone: "crown" },
  { id: "legal-ops", label: "Legal Ops", x: 26, y: 74, zone: "support" },
  { id: "exec-bridge", label: "Executive Bridge", x: 54, y: 84, zone: "executive" },
];

export const incidentScenes = {
  stabilize: {
    label: "Stabilize Signal",
    timeline: [
      {
        time: "00:02",
        label: "Alert surge throttled",
        detail: "Surge protocol isolates high-fidelity alerts for immediate triage.",
        type: "alert",
      },
      {
        time: "00:04",
        label: "Bridge activated",
        detail: "Executive bridge assembled with Legal and Communications observers.",
        type: "brief",
      },
    ],
    flows: [
      { from: "digital-bank", to: "edge-gateway", type: "alert" },
      { from: "edge-gateway", to: "soc-bridge", type: "analysis" },
      { from: "soc-bridge", to: "iam-hub", type: "command" },
    ],
    shields: [{ center: "digital-bank", radius: 11, type: "monitor" }],
  },
  contain: {
    label: "Contain Blast Radius",
    timeline: [
      {
        time: "00:12",
        label: "Segmentation enforced",
        detail: "Network segmentation severs lateral movement within critical banking systems.",
        type: "contain",
      },
      {
        time: "00:18",
        label: "Privileged reset",
        detail: "18 elevated tokens revoked with automated credential hygiene.",
        type: "identity",
      },
    ],
    flows: [
      { from: "iam-hub", to: "core-banking", type: "contain" },
      { from: "core-banking", to: "payments-mesh", type: "contain" },
      { from: "soc-bridge", to: "core-banking", type: "command" },
    ],
    shields: [
      { center: "core-banking", radius: 16, type: "contain" },
      { center: "payments-mesh", radius: 13, type: "contain" },
    ],
  },
  brief: {
    label: "Brief Stakeholders",
    timeline: [
      {
        time: "00:24",
        label: "Containment validated",
        detail: "Segmentation, revocations, and automation telemetry published to leadership.",
        type: "brief",
      },
      {
        time: "00:36",
        label: "Recovery trajectory",
        detail: "Restoration roadmap, after-action items, and regulatory posture confirmed.",
        type: "outcome",
      },
    ],
    flows: [
      { from: "soc-bridge", to: "exec-bridge", type: "brief" },
      { from: "legal-ops", to: "exec-bridge", type: "brief" },
      { from: "exec-bridge", to: "payments-mesh", type: "outcome" },
    ],
    shields: [{ center: "exec-bridge", radius: 12, type: "brief" }],
  },
};

export const incidentDecisionTree = [
  {
    id: "stabilize",
    label: "Stabilize Signal",
    narrative:
      "Sterling throttles alert ingestion, isolates high-severity indicators, and aligns SOC leads for triage sequencing.",
    actions: [
      "Triggered surge protocol and tagged 11 correlated alerts as primary.",
      "Spawned executive bridge with Legal and Communications observers.",
      "Allocated forensic pods to endpoints exhibiting credential pivot attempts."
    ],
    scene: "stabilize",
  },
  {
    id: "contain",
    label: "Contain Blast Radius",
    narrative:
      "Containment plan executed with network segmentation, privilege reviews, and countermeasure deployment across core banking services.",
    actions: [
      "Issued network segmentation request closing lateral movement corridors within 6 minutes.",
      "Coordinated IAM to revoke elevated tokens for 18 privileged accounts.",
      "Pushed emergency detection rules to isolate anomalous PowerShell orchestration."
    ],
    scene: "contain",
  },
  {
    id: "brief",
    label: "Brief Stakeholders",
    narrative:
      "High cadence briefings delivered to executives, quantifying exposure, response velocity, and next-step commitments.",
    actions: [
      "Synthesized 12-minute cadence executive briefs covering scope, actions, and risk posture shift.",
      "Enabled treasury leadership to forecast potential customer impact scenarios.",
      "Documented follow-on improvements for regulatory reporting readiness."
    ],
    scene: "brief",
  },
];

export const briefingTimeline = [
  {
    id: "activation",
    time: "00:05",
    title: "Mission Activation",
    summary:
      "Alert surge acknowledged; command structure activated with executive observers looped in.",
    highlights: [
      "Declared severity level within 5 minutes and aligned response pods.",
      "Directed SOC to initiate containment playbooks for credential abuse.",
      "Logged regulatory notification prep in anticipation of potential disclosure.",
    ],
  },
  {
    id: "cadence",
    time: "00:12",
    title: "Briefing Cadence",
    summary:
      "Delivered first executive summary detailing blast radius, containment levers, and client exposure outlook.",
    highlights: [
      "Clarified affected payment systems and active mitigations.",
      "Secured communications alignment with Legal and Communications.",
      "Captured follow-up asks for finance leadership to model client impact.",
    ],
  },
  {
    id: "containment",
    time: "00:24",
    title: "Containment Validation",
    summary:
      "Reported segmentation results, privilege revocations, and automation outputs curbing lateral movement.",
    highlights: [
      "Confirmed 18 privileged tokens revoked and isolation scripts executed.",
      "Shared telemetry graphs demonstrating alert volume stabilization.",
      "Outlined pending forensic actions with estimated completion times.",
    ],
  },
  {
    id: "recovery",
    time: "00:36",
    title: "Recovery Trajectory",
    summary:
      "Mapped restoration checkpoints, after-action insights, and regulatory reporting plan for leadership sign-off.",
    highlights: [
      "Scheduled readiness brief for audit stakeholders within 24 hours.",
      "Identified process uplift backlog seeded from after-action review.",
      "Affirmed customer impact remained theoretical with mitigations holding.",
    ],
  },
];

export const surfaceNodes = [
  {
    id: "payments-core",
    label: "Payments Core",
    risk: "high",
    position: { x: 48, y: 16 },
    connections: ["loan-ops", "api-gateway", "treasury"],
    intel: {
      baseline: "Legacy middleware with elevated attack surface across 214 services.",
      action: "Introduced adaptive segmentation, prioritized 14 services for code hardening, and implemented continuous scanning cadence.",
      outcome: "Exposure window dropped 31% and change failure rate improved to 2.1%.",
    },
    countermeasure: {
      label: "Dynamic Segmentation Push",
      effect: "Segments deployed across card rails and fraud analytics stack. Residual risk lowered to medium.",
      residualRisk: "medium",
    },
  },
  {
    id: "loan-ops",
    label: "Loan Ops",
    risk: "medium",
    position: { x: 68, y: 28 },
    connections: ["payments-core", "cloud-infra", "data-warehouse"],
    intel: {
      baseline: "Fragmented detection mapping for loan origination endpoints.",
      action: "Merged telemetry sources, built coverage heatmap, and orchestrated 3 net-new detections.",
      outcome: "Playbook adoption raised coverage to 94% of privileged systems.",
    },
    countermeasure: {
      label: "Telemetry Mesh",
      effect: "Federated monitoring blueprint deployed, raising signal fidelity and granting tiered visibility.",
      residualRisk: "low",
    },
  },
  {
    id: "cloud-infra",
    label: "Cloud Infra",
    risk: "medium",
    position: { x: 82, y: 44 },
    connections: ["loan-ops", "api-gateway", "mobile-platform"],
    intel: {
      baseline: "Drift in least privilege policies and stale firewall constructs.",
      action: "Conducted IAM entitlements review, introduced just-in-time elevation, and hardened firewall baselines.",
      outcome: "Critical misconfigurations reduced by 47%; anomaly time-to-detect trimmed to 11 minutes.",
    },
    countermeasure: {
      label: "Adaptive IAM Sweep",
      effect: "Just-in-time elevation active. Firewall misconfigurations retired and anomaly windows minimized.",
      residualRisk: "low",
    },
  },
  {
    id: "treasury",
    label: "Treasury",
    risk: "high",
    position: { x: 32, y: 30 },
    connections: ["payments-core", "data-warehouse", "fin-intel"],
    intel: {
      baseline: "Manual recovery runbooks extended MTTR and left communication blind spots.",
      action: "Automated notification matrix, digitized recovery runbooks, and aligned tabletop exercises.",
      outcome: "Stakeholder satisfaction +22 NPS; compliance audit cycle shortened by 16 days.",
    },
    countermeasure: {
      label: "Runbook Automation",
      effect: "Digitized playbooks in force. Treasury communications synchronized with command bridge.",
      residualRisk: "medium",
    },
  },
  {
    id: "branch-network",
    label: "Branch Net",
    risk: "low",
    position: { x: 20, y: 52 },
    connections: ["treasury", "mobile-platform"],
    intel: {
      baseline: "Endpoint visibility gaps across retail branches due to aging infrastructure.",
      action: "Deployed lightweight sensors, normalized telemetry, and pushed remote remediation scripts.",
      outcome: "Endpoint fidelity climbed to 98% with automated isolation protocols."
    },
    countermeasure: {
      label: "Branch Telemetry Push",
      effect: "Remote remediation wave deployed. Isolation guardrails raised to gold standard.",
      residualRisk: "low",
    },
  },
  {
    id: "api-gateway",
    label: "API Gateway",
    risk: "high",
    position: { x: 58, y: 42 },
    connections: ["payments-core", "cloud-infra", "mobile-platform"],
    intel: {
      baseline: "Elevated anonymous traffic during fraud campaigns.",
      action: "Implemented dynamic rate limiting, anomaly scoring, and cross-team threat intel pipelines.",
      outcome: "Blocked 3 fraud clusters and preserved customer availability metrics.",
    },
    countermeasure: {
      label: "Dynamic Rate Shield",
      effect: "Anomaly scoring fused with fraud intel. Fraud clusters throttled at the edge.",
      residualRisk: "medium",
    },
  },
  {
    id: "data-warehouse",
    label: "Data Warehouse",
    risk: "medium",
    position: { x: 40, y: 46 },
    connections: ["treasury", "loan-ops", "fin-intel"],
    intel: {
      baseline: "Slow incident handoff between data stewards and security analysts.",
      action: "Stood up federated communication workspace and rapid classification workflows.",
      outcome: "Handoff cycle compressed by 41%, elevating response agility.",
    },
    countermeasure: {
      label: "Rapid Handoff Workflow",
      effect: "Federated workspace activated; escalation lattice accelerated for data custodians.",
      residualRisk: "low",
    },
  },
  {
    id: "mobile-platform",
    label: "Mobile",
    risk: "medium",
    position: { x: 74, y: 58 },
    connections: ["api-gateway", "cloud-infra", "branch-network"],
    intel: {
      baseline: "Visibility gaps in customer auth telemetry across mobile stack.",
      action: "Instrumented telemetry ingestion, baseline analysis, and detection tuning for anomalous access.",
      outcome: "Flagged 9 credential stuffing events and reinforced fraud controls.",
    },
    countermeasure: {
      label: "Auth Telemetry Bloom",
      effect: "Credential stuffing heuristics online. Session risk scoring broadcasting across SOC lanes.",
      residualRisk: "low",
    },
  },
  {
    id: "fin-intel",
    label: "Fin Intel",
    risk: "low",
    position: { x: 30, y: 62 },
    connections: ["treasury", "data-warehouse", "reg-reporting"],
    intel: {
      baseline: "Intelligence insights siloed from incident response teams.",
      action: "Built intelligence briefs, integrated cross-team Slack automation, and scheduled mission syncs.",
      outcome: "Reduced duplication in analysis by 33%, enabling quicker strategic alignment.",
    },
    countermeasure: {
      label: "Intel Sync Mesh",
      effect: "Automation bridged intel to IR. Insight duplication retired and strategy cycles compressed.",
      residualRisk: "low",
    },
  },
  {
    id: "reg-reporting",
    label: "Reg Reporting",
    risk: "low",
    position: { x: 12, y: 36 },
    connections: ["treasury", "fin-intel"],
    intel: {
      baseline: "Regulatory attestations queued manually with minimal observability.",
      action: "Automated evidence collection, deployed dashboards, and established continuous compliance reviews.",
      outcome: "Prep time dropped 44% and audit readiness scored 4.7/5.",
    },
    countermeasure: {
      label: "Continuous Compliance",
      effect: "Evidence harvesting scripted. Regulators receive live dashboards with compliance posture.",
      residualRisk: "low",
    },
  },
];

export const loopIntel = {
  detect: {
    title: "Detect",
    summary:
      "Continuous tuning of detection stack aligned MITRE coverage against top risk scenarios.",
    artifacts: [
      "Calibrated SIEM correlation pack covering credential misuse chains.",
      "Implemented streaming analytics to collapse alert duplication by 19%.",
      "Initiated purple-team validation ensuring threat realism."
    ],
  },
  investigate: {
    title: "Investigate",
    summary:
      "Mobilized investigative pods, codified evidence capture, and introduced guided triage canvases.",
    artifacts: [
      "Created decision matrix for cross-functional evidence requests.",
      "Documented forensic pivot catalog enabling analysts to accelerate inquiry.",
      "Automated artifact tagging with retention compliance baked in."
    ],
  },
  respond: {
    title: "Respond",
    summary:
      "Response wavefront orchestrated with automated containment actions and leadership ready comms.",
    artifacts: [
      "Launched isolation scripts and quarantine automations across high-risk segments.",
      "Authored executive briefs translating technical signal into business impact.",
      "Mapped resilience posture shifts post-response for board reporting."
    ],
  },
  review: {
    title: "Review",
    summary:
      "Designed after-action rituals capturing lessons, measuring response health, and seeding experiments.",
    artifacts: [
      "Rolled out retrospective scorecards blending qualitative and quantitative analysis.",
      "Established backlog triage converting insights into funded initiatives.",
      "Published communication cadences to ensure transparency and accountability."
    ],
  },
  improve: {
    title: "Improve",
    summary:
      "Converted lessons into systemic upgrades spanning tooling, process, and human readiness.",
    artifacts: [
      "Launched leadership-ready dashboards reflecting improvement trajectory.",
      "Automated recurring scenario drills with escalating complexity.",
      "Partnered with risk teams to align control enhancements with business priorities."
    ],
  },
};

export const loopAchievements = [
  {
    id: "playbook-codex",
    title: "Playbook Codex Expanded",
    detail:
      "Converted retrospectives into six cross-domain playbooks with executive-traceable decision logs.",
  },
  {
    id: "automation-loop",
    title: "Automation Loop Fueled",
    detail:
      "Fed improvement backlog into orchestration sprints, trimming preparation cycles by 35% and amplifying reuse.",
  },
  {
    id: "readiness-drills",
    title: "Readiness Drills Elevated",
    detail:
      "Scaled simulation cadence and coaching to lift analyst readiness scores 24 points quarter-over-quarter.",
  },
];

export const narrationEntries = [
  {
    id: "mission.boot",
    label: "Boot Sequence",
    text: "Telemetry arrays calibrating. Mission control online.",
  },
  {
    id: "mission.select",
    label: "Mission Control",
    text: "Dossier focus shifted to {{label}}. Deploying scenario overlays and stakeholder telemetry.",
  },
  {
    id: "regions.scene",
    label: "Regions Ops",
    text: "Incident phase engaged: {{label}}. Command bridge briefing synchronized.",
  },
  {
    id: "regions.deploy",
    label: "Countermeasures",
    text: "Countermeasure executed on {{label}}. {{effect}}",
  },
  {
    id: "loop.segment",
    label: "Improvement Loop",
    text: "Loop vector engaged: {{label}}. Surface artifacts to capture institutional learning.",
  },
  {
    id: "loop.complete",
    label: "Improvement Loop",
    text: "Continuous improvement loop traversed end-to-end. Achievements ready for recruiter review.",
  },
  {
    id: "hunt.activate",
    label: "Threat Hunt",
    text: "Threat hunt {{label}} executing. Query playback and telemetry overlays online.",
  },
  {
    id: "hunt.view",
    label: "Threat Hunt",
    text: "Context toggled to {{view}} signals for {{label}}.",
  },
  {
    id: "automation.update",
    label: "Automation",
    text: "Automation modules active: {{count}}. Projected MTTR {{mttr}}h with {{hours}} analyst hours reclaimed.",
  },
  {
    id: "timeline.complete",
    label: "Mission Timeline",
    text: "All mission checkpoints verified. Recommend executing 'battle_card' from the deploy console.",
  },
  {
    id: "deploy.command",
    label: "Deploy Console",
    text: "Command acknowledged: {{command}}. Delivering mission response package.",
  },
  {
    id: "deploy.unknown",
    label: "Deploy Console",
    text: "Command channel received '{{command}}'. No matching routine available.",
  },
  {
    id: "skills.jump",
    label: "Skill Gallery",
    text: "Routing to mission evidence for {{label}} competency.",
  },
];

export const hunts = [
  {
    id: "outbound-rdp",
    name: "Outbound RDP/SSH",
    query: `index=network_traffic dest_port IN (3389,22) action=ALLOW | stats count by src_ip dest_ip user` ,
    analysis:
      "Correlated remote access spikes against maintenance windows, uncovering unauthorized bastion pivots.",
    outcome:
      "Implemented geo-velocity rule, blocked 3 rogue jump hosts, and codified privileged access approvals.",
    baselines: [
      {
        label: "Change Windows",
        detail:
          "Legitimate RDP/SSH traffic concentrated during approved maintenance windows with known jump hosts.",
      },
      {
        label: "Privileged Approvals",
        detail: "Approved sessions include dual-operator sign off and service account annotations in ticketing.",
      },
    ],
    anomalies: [
      {
        label: "Rogue Hosts",
        detail: "Access attempted from three unmanaged jump servers pivoting between finance and OT segments.",
      },
      {
        label: "Velocity Mismatch",
        detail: "User geo-velocity variance exceeded 800 miles in under 2 minutes across consecutive logins.",
      },
    ],
    coverage: {
      detections: {
        label: "2 net-new detections",
        target: "#regions-bank",
      },
      firewall: {
        label: "7 firewall policy updates",
        target: "#duke-energy",
      },
      visibility: {
        label: "RDP telemetry completeness from 72% ➝ 98%",
        target: "#impact",
      },
    },
    mitre: [
      "T1021.001 | Remote Services: Remote Desktop Protocol",
      "T1021.004 | Remote Services: SSH",
      "T1078 | Valid Accounts",
    ],
    telemetry: {
      baseline: {
        timeline: [
          { label: "00:00", value: 5 },
          { label: "00:05", value: 6 },
          { label: "00:10", value: 5 },
          { label: "00:15", value: 7 },
          { label: "00:20", value: 6 },
        ],
        matrix: [
          { source: "Jump Hosts", target: "Finance", weight: 4 },
          { source: "Jump Hosts", target: "Operations", weight: 3 },
          { source: "Operations", target: "OT", weight: 2 },
        ],
        heatmap: [
          { label: "Finance Jump Hosts", value: 4, detail: "Sanctioned bastions during maintenance" },
          { label: "Operations Jump Hosts", value: 3, detail: "Approved OT remote checks" },
          { label: "Privileged Access", value: 5, detail: "Dual-operator approvals in effect" },
          { label: "Identity Services", value: 2, detail: "Token refresh keep-alives" },
        ],
        packets: [
          {
            label: "Maint-Bastion ➝ Treasury",
            bytes: "1.8 MB",
            detail: "Change window patch validation",
          },
          {
            label: "Ops-Jump ➝ OT",
            bytes: "1.1 MB",
            detail: "Supervisory control integrity check",
          },
        ],
        volume: 48,
      },
      anomaly: {
        timeline: [
          { label: "00:00", value: 6 },
          { label: "00:05", value: 12 },
          { label: "00:10", value: 18 },
          { label: "00:15", value: 21 },
          { label: "00:20", value: 17 },
        ],
        matrix: [
          { source: "Rogue Hosts", target: "Finance", weight: 6 },
          { source: "Rogue Hosts", target: "OT", weight: 4 },
          { source: "Operations", target: "OT", weight: 3 },
        ],
        heatmap: [
          { label: "Rogue Host 12", value: 8, detail: "Finance lateral attempts" },
          { label: "Rogue Host 42", value: 7, detail: "OT pivot reconnaissance" },
          { label: "Velocity Spike", value: 6, detail: "Unrealistic geo movement" },
          { label: "Privileged Abuse", value: 5, detail: "Service account reused outside policy" },
        ],
        packets: [
          {
            label: "Rogue-12 ➝ Core Banking",
            bytes: "8.6 MB",
            detail: "Unauthorized backup harvesting attempt",
          },
          {
            label: "Rogue-42 ➝ OT",
            bytes: "6.4 MB",
            detail: "Command channel enumeration",
          },
        ],
        volume: 132,
      },
      notes: [
        "Geo-velocity variance exceeded 800 miles between sequential logins.",
        "Jump host inventory mismatch uncovered unmanaged pivots in shared services.",
      ],
    },
  },
  {
    id: "uncommon-rat",
    name: "Uncommon Remote Tools",
    query: `sourcetype=edr_process parent_image=explorer.exe image IN (\"psexec.exe\", \"wmic.exe\", \"ammyy_admin.exe\") | stats values(command_line) by host` ,
    analysis:
      "Baseline legitimate admin tooling usage, isolating unauthorized remote admin stacks in shared services.",
    outcome:
      "Deployed rapid response workflow and auto-removal script for unauthorized binaries.",
    baselines: [
      {
        label: "Admin Tool Inventory",
        detail: "Documented sanctioned remote tools mapped to service owners and CMDB records.",
      },
      {
        label: "EDR Process Chains",
        detail: "Expected child processes spawn from SCCM orchestrations with signed binaries and ticket references.",
      },
    ],
    anomalies: [
      {
        label: "Shadow Stacks",
        detail: "Explorer.exe launching portable admin suites from temp directories without associated tickets.",
      },
      {
        label: "Credential Sharing",
        detail: "Same service account reused across OT and corporate segments outside maintenance approvals.",
      },
    ],
    coverage: {
      detections: {
        label: "1 hunt → 3 real-time detections",
        target: "#duke-energy",
      },
      firewall: {
        label: "Tightened east-west ACLs across data centers",
        target: "#regions-bank",
      },
      visibility: {
        label: "Credential misuse signal-to-noise improved 2.6x",
        target: "#impact",
      },
    },
    mitre: [
      "T1105 | Ingress Tool Transfer",
      "T1569.002 | System Services: Service Execution",
      "T1136.001 | Create Account: Local Account",
    ],
    telemetry: {
      baseline: {
        timeline: [
          { label: "Sprint 1", value: 3 },
          { label: "Sprint 2", value: 4 },
          { label: "Sprint 3", value: 5 },
          { label: "Sprint 4", value: 4 },
        ],
        matrix: [
          { source: "SCCM", target: "Workstations", weight: 5 },
          { source: "Service Accounts", target: "Servers", weight: 3 },
        ],
        heatmap: [
          { label: "SCCM Deployments", value: 3, detail: "Signed packages with CMDB trace" },
          { label: "Helpdesk Tools", value: 2, detail: "Approved remote assistance" },
          { label: "Service Accounts", value: 4, detail: "Scoped to single domain" },
          { label: "Audit Trails", value: 3, detail: "Ticket-linked execution" },
        ],
        packets: [
          {
            label: "SCCM ➝ Finance",
            bytes: "640 KB",
            detail: "Patch verification handshake",
          },
          {
            label: "Helpdesk ➝ Corp",
            bytes: "420 KB",
            detail: "User-requested remote session",
          },
        ],
        volume: 22,
      },
      anomaly: {
        timeline: [
          { label: "Sprint 1", value: 4 },
          { label: "Sprint 2", value: 7 },
          { label: "Sprint 3", value: 11 },
          { label: "Sprint 4", value: 13 },
        ],
        matrix: [
          { source: "Shadow Stacks", target: "Shared Services", weight: 6 },
          { source: "Shadow Stacks", target: "OT", weight: 4 },
        ],
        heatmap: [
          { label: "Portable Suites", value: 6, detail: "Unsigned executables" },
          { label: "Credential Reuse", value: 5, detail: "Service accounts across domains" },
          { label: "Temp Directories", value: 4, detail: "Dropper staging" },
          { label: "Unapproved Hosts", value: 5, detail: "Shadow IT endpoints" },
        ],
        packets: [
          {
            label: "ShadowStack ➝ Shared",
            bytes: "2.9 MB",
            detail: "Remote admin tool lateral move",
          },
          {
            label: "ShadowStack ➝ OT",
            bytes: "2.1 MB",
            detail: "Credential stuffing attempts",
          },
        ],
        volume: 68,
      },
      notes: [
        "Portable remote suites surfaced in temp directories lacking ticket references.",
        "Credential sharing flagged across OT and corporate segments within 24h.",
      ],
    },
  },
  {
    id: "c2-ntp",
    name: "C2 over NTP",
    query: `index=network_traffic protocol=NTP | stats count by src_ip dest_ip dest_port | where count > 120` ,
    analysis:
      "Detected beaconing cadence mismatched with known NTP pools, revealing stealthy command channels.",
    outcome:
      "Pushed detection-as-code to SIEM and blocked malicious pool, preventing exfiltration attempts.",
    baselines: [
      {
        label: "Approved Pools",
        detail: "Authoritative list of corporate NTP pools cross-referenced with DNS telemetry and CMDB.",
      },
      {
        label: "Cadence Signature",
        detail: "Standardized polling intervals at 15-minute cadence with ±2 second jitter across fleets.",
      },
    ],
    anomalies: [
      {
        label: "High-Frequency Beacons",
        detail: "Source hosts beaconing every 30 seconds to dynamic destinations outside sanctioned pools.",
      },
      {
        label: "Payload Indicators",
        detail: "NTP payload bytes exceeded baseline thresholds, signaling data stuffing attempts.",
      },
    ],
    coverage: {
      detections: {
        label: "Added 2 correlation rules",
        target: "#duke-energy",
      },
      firewall: {
        label: "Dynamic egress filters to sanctioned pools",
        target: "#regions-bank",
      },
      visibility: {
        label: "Anomaly detection latency reduced to 3 minutes",
        target: "#impact",
      },
    },
    mitre: [
      "T1071.004 | Application Layer Protocol: NTP",
      "T1041 | Exfiltration Over C2 Channel",
      "T1568.002 | Dynamic Resolution: Domain Generation Algorithms",
    ],
    telemetry: {
      baseline: {
        timeline: [
          { label: "00:00", value: 9 },
          { label: "00:05", value: 8 },
          { label: "00:10", value: 9 },
          { label: "00:15", value: 8 },
        ],
        matrix: [
          { source: "Corporate Hosts", target: "Sanctioned Pools", weight: 8 },
          { source: "OT Hosts", target: "Sanctioned Pools", weight: 5 },
        ],
        heatmap: [
          { label: "Corporate Pools", value: 5, detail: "15-minute cadence" },
          { label: "OT Pools", value: 4, detail: "Industrial controllers" },
          { label: "DMZ", value: 3, detail: "Forwarding proxies" },
          { label: "Timekeepers", value: 2, detail: "Authoritative stratum servers" },
        ],
        packets: [
          {
            label: "Plant-01 ➝ CorpPool",
            bytes: "220 B",
            detail: "Routine sync",
          },
          {
            label: "RetailPOS ➝ CorpPool",
            bytes: "260 B",
            detail: "POS jitter allowance",
          },
        ],
        volume: 72,
      },
      anomaly: {
        timeline: [
          { label: "00:00", value: 12 },
          { label: "00:05", value: 18 },
          { label: "00:10", value: 24 },
          { label: "00:15", value: 27 },
        ],
        matrix: [
          { source: "Compromised Hosts", target: "Dynamic Pools", weight: 9 },
          { source: "Compromised Hosts", target: "Unknown Destinations", weight: 6 },
        ],
        heatmap: [
          { label: "Dynamic Pools", value: 7, detail: "30s beacon cadence" },
          { label: "Unknown Destinations", value: 6, detail: "DGAs rotating" },
          { label: "Payload Size", value: 5, detail: "Above baseline thresholds" },
          { label: "Beacon Burst", value: 6, detail: "Multi-host synchronization" },
        ],
        packets: [
          {
            label: "Host-44 ➝ RoguePool",
            bytes: "880 B",
            detail: "Stuffed payload detection",
          },
          {
            label: "Host-61 ➝ Unknown",
            bytes: "910 B",
            detail: "Exfil attempt blocked",
          },
        ],
        volume: 144,
      },
      notes: [
        "Beacon cadence at 30-second intervals deviated from approved jitter windows.",
        "Payload size anomalies signalled stuffed command channel attempts.",
      ],
    },
  },
  {
    id: "regsvr32",
    name: "Regsvr32 Proxy Execution",
    query: `sourcetype=edr_process image=regsvr32.exe | stats values(command_line) by host signed_module` ,
    analysis:
      "Hunted for LOLBin abuse patterns delivering payloads via remote servers to bypass controls.",
    outcome:
      "Created YARA signatures for suspicious COM payloads and automation to quarantine impacted hosts.",
    baselines: [
      {
        label: "Signed Modules",
        detail: "Legitimate regsvr32 executions reference signed DLLs stored on managed file shares.",
      },
      {
        label: "Installer Windows",
        detail: "Expected executions align with scheduled software deployments captured in change tickets.",
      },
    ],
    anomalies: [
      {
        label: "Remote Payloads",
        detail: "Unsigned DLLs downloaded over HTTP(S) prior to registration indicating proxy execution.",
      },
      {
        label: "Pivot Attempt",
        detail: "COM registration spawning script hosts spawning credential dumping utilities within 90 seconds.",
      },
    ],
    coverage: {
      detections: {
        label: "Introduced behavioral signature coverage",
        target: "#regions-bank",
      },
      firewall: {
        label: "Network isolation triggers for suspicious hosts",
        target: "#duke-energy",
      },
      visibility: {
        label: "Regsvr32 misuse detection from 35% ➝ 92%",
        target: "#impact",
      },
    },
    mitre: [
      "T1218.010 | Signed Binary Proxy Execution: Regsvr32",
      "T1105 | Ingress Tool Transfer",
      "T1547.001 | Boot or Logon Autostart Execution: Registry Run Keys",
    ],
    telemetry: {
      baseline: {
        timeline: [
          { label: "Week 1", value: 2 },
          { label: "Week 2", value: 3 },
          { label: "Week 3", value: 3 },
          { label: "Week 4", value: 2 },
        ],
        matrix: [
          { source: "Signed Modules", target: "Managed Shares", weight: 4 },
        ],
        heatmap: [
          { label: "Signed DLLs", value: 3, detail: "Managed file shares" },
          { label: "Installer Windows", value: 2, detail: "Change-controlled deployments" },
          { label: "CMDB Trace", value: 3, detail: "Asset mapped" },
          { label: "Forensic Tags", value: 2, detail: "EDR baseline" },
        ],
        packets: [
          {
            label: "Installer ➝ Managed Share",
            bytes: "520 KB",
            detail: "Scheduled deployment",
          },
        ],
        volume: 12,
      },
      anomaly: {
        timeline: [
          { label: "Week 1", value: 5 },
          { label: "Week 2", value: 9 },
          { label: "Week 3", value: 12 },
          { label: "Week 4", value: 15 },
        ],
        matrix: [
          { source: "Unsigned DLLs", target: "Remote Hosts", weight: 7 },
          { source: "Unsigned DLLs", target: "Credential Dumping", weight: 5 },
        ],
        heatmap: [
          { label: "HTTP Payloads", value: 6, detail: "Remote fetch prior to registration" },
          { label: "Credential Dump", value: 5, detail: "Lsass access attempts" },
          { label: "Persistence", value: 4, detail: "Registry autoruns" },
          { label: "Isolation", value: 5, detail: "Automatic quarantine triggers" },
        ],
        packets: [
          {
            label: "Compromised Host ➝ Remote",
            bytes: "3.4 MB",
            detail: "DLL staging from malicious server",
          },
          {
            label: "Compromised Host ➝ Internal",
            bytes: "2.2 MB",
            detail: "Credential dumping exfil blocked",
          },
        ],
        volume: 84,
      },
      notes: [
        "Proxy execution detected launching credential theft utilities within 90 seconds.",
        "Isolation automation quarantined affected endpoints for forensic capture.",
      ],
    },
  },
  {
    id: "certutil",
    name: "Certutil Exfil",
    query: `sourcetype=edr_process image=certutil.exe | stats values(command_line) by host dest_ip` ,
    analysis:
      "Baseline certificate utility usage across PKI operations to pinpoint suspicious download/exfil attempts.",
    outcome:
      "Automated revocation workflow and blocked unapproved certificate endpoints.",
    baselines: [
      {
        label: "PKI Operations",
        detail: "Legitimate certutil usage tagged with CA maintenance tasks and approved destinations.",
      },
      {
        label: "Bandwidth Profile",
        detail: "Standard transfers below 5MB with predictable repetition across certificate renewals.",
      },
    ],
    anomalies: [
      {
        label: "Data Staging",
        detail: "Certutil fetching binaries from raw IP addresses followed by outbound transfers to cloud storage.",
      },
      {
        label: "Compression Artifacts",
        detail: "Base64 encoded payloads written to temp directories outside certificate workflows.",
      },
    ],
    coverage: {
      detections: {
        label: "Coverage expanded to 95% of certutil executions",
        target: "#duke-energy",
      },
      firewall: {
        label: "Policy hardened for outbound data staging",
        target: "#regions-bank",
      },
      visibility: {
        label: "Certutil misuse dwell time collapsed to <6 minutes",
        target: "#impact",
      },
    },
    mitre: [
      "T1105 | Ingress Tool Transfer",
      "T1567.002 | Exfiltration Over Web Service: Exfiltration to Cloud Storage",
      "T1140 | Deobfuscate/Decode Files or Information",
    ],
    telemetry: {
      baseline: {
        timeline: [
          { label: "Cycle 1", value: 4 },
          { label: "Cycle 2", value: 5 },
          { label: "Cycle 3", value: 4 },
          { label: "Cycle 4", value: 5 },
        ],
        matrix: [
          { source: "PKI Ops", target: "Trusted Destinations", weight: 6 },
          { source: "PKI Ops", target: "Internal Stores", weight: 3 },
        ],
        heatmap: [
          { label: "PKI Renewals", value: 4, detail: "Scheduled CA tasks" },
          { label: "Trust Anchors", value: 3, detail: "Approved IP ranges" },
          { label: "Bandwidth", value: 2, detail: "Under 5MB transfers" },
          { label: "Audit Trails", value: 3, detail: "Ticket mapped" },
        ],
        packets: [
          {
            label: "CA-Primary ➝ Trusted",
            bytes: "3.4 MB",
            detail: "Certificate renewal bundle",
          },
        ],
        volume: 36,
      },
      anomaly: {
        timeline: [
          { label: "Cycle 1", value: 8 },
          { label: "Cycle 2", value: 12 },
          { label: "Cycle 3", value: 18 },
          { label: "Cycle 4", value: 22 },
        ],
        matrix: [
          { source: "Unmanaged Hosts", target: "Cloud Storage", weight: 7 },
          { source: "Unmanaged Hosts", target: "Raw IP", weight: 6 },
        ],
        heatmap: [
          { label: "Raw IP", value: 6, detail: "Bypassed trusted anchors" },
          { label: "Cloud Storage", value: 7, detail: "Exfil endpoints" },
          { label: "Payload Size", value: 5, detail: "Base64 staging detected" },
          { label: "Compression", value: 4, detail: "Large encoded blobs" },
        ],
        packets: [
          {
            label: "Host-220 ➝ Cloud",
            bytes: "14.2 MB",
            detail: "Encoded payload blocked",
          },
          {
            label: "Host-220 ➝ RawIP",
            bytes: "9.8 MB",
            detail: "Data staging attempt",
          },
        ],
        volume: 128,
      },
      notes: [
        "Certutil observed fetching binaries from raw IP addresses with base64 staging.",
        "Automation enforced revocation workflow and blocked unsanctioned destinations.",
      ],
    },
  },
];

export const skills = [
  {
    id: "incident-command",
    name: "Incident Command & Strategy",
    signal: "Regions Bank",
    target: "#regions-bank",
    description:
      "Directed enterprise-wide command structure for high-impact incidents with live executive telemetry and decision frameworks.",
    artifacts: [
      "Executive briefing templates used during financial services incident.",
      "Command deck timeline with playbook injection points.",
      "Metrics instrumentation bridging operations and leadership impact."
    ],
    strength: 5,
  },
  {
    id: "threat-hunting",
    name: "Threat Hunting & Analytics",
    signal: "Duke Energy",
    target: "#duke-energy",
    description:
      "Engineered hypothesis-driven hunts across outbound protocols, LOLBins, and stealth C2 traffic to reveal hidden adversaries.",
    artifacts: [
      "Splunk queries with anomaly overlays and machine context baselines.",
      "EDR pivot workbook aligning MITRE ATT&CK tactics.",
      "Remediation runbooks linking hunts to firewall and detection updates."
    ],
    strength: 5,
  },
  {
    id: "automation",
    name: "Automation & Orchestration",
    signal: "Duke Energy",
    target: "#duke-energy",
    description:
      "Built automation pipelines for case enrichment, routing, and collaboration that accelerated MTTR and reduced analyst toil.",
    artifacts: [
      "Workflow diagrams covering enrichment to resolution.",
      "Automation policy deck securing leadership funding.",
      "Adoption metrics illustrating stakeholder satisfaction."
    ],
    strength: 4,
  },
  {
    id: "attack-surface",
    name: "Attack Surface Management",
    signal: "Regions Bank",
    target: "#regions-bank",
    description:
      "Unified asset intelligence, prioritized remediation, and aligned risk heatmaps to critical banking services.",
    artifacts: [
      "Remediation prioritization matrix for crown jewel applications.",
      "Stakeholder communication plan coordinating risk squads.",
      "Coverage dashboards demonstrating exposure reduction."
    ],
    strength: 4,
  },
  {
    id: "stakeholder-communication",
    name: "Stakeholder Communication",
    signal: "Cross-Mission",
    target: "#impact",
    description:
      "Crafted mission-ready comms bridging technical depth and executive clarity under high pressure.",
    artifacts: [
      "Briefing cadence script with 12-minute updates.",
      "Regulatory reporting templates ensuring compliance accuracy.",
      "Leadership retrospectives aligning investments with risk appetite."
    ],
    strength: 5,
  },
];

export const impactSignals = [
  {
    id: "impact-mttr",
    title: "Critical Incident MTTR",
    value: "-38%",
    context: "Regions Bank",
    description: "Command orchestration and automation collapsed incident closure times from 76 to 47 minutes.",
    tags: ["regions"],
  },
  {
    id: "impact-hunts",
    title: "Hunts Operationalized",
    value: "5",
    context: "Duke Energy",
    description: "Tier-0 hunts codified into repeatable detections and firewall actions covering outbound abuse and LOLBins.",
    tags: ["duke"],
  },
  {
    id: "impact-automation",
    title: "Automation Coverage",
    value: "60%",
    context: "Duke Energy",
    description: "Automation conveyor enriched and routed majority of priority incidents with zero data loss.",
    tags: ["automation", "duke"],
  },
  {
    id: "impact-exec",
    title: "Executive Confidence",
    value: "+19 NPS",
    context: "Regions Bank",
    description: "High-cadence briefings and transparent telemetry amplified executive trust during escalations.",
    tags: ["regions"],
  },
  {
    id: "impact-visibility",
    title: "Visibility Uplift",
    value: "+26%",
    context: "Duke Energy",
    description: "EDR tuning and sensor deployment raised endpoint fidelity across critical infrastructure.",
    tags: ["duke"],
  },
  {
    id: "impact-compliance",
    title: "Compliance Cycle",
    value: "-16 days",
    context: "Regions Bank",
    description: "Digitized regulatory workflows accelerated reporting and reduced audit friction.",
    tags: ["regions", "automation"],
  },
];

export const automationTickets = [
  {
    id: "enrichment",
    title: "Enrichment",
    description: "Auto-attached intelligence context, asset criticality, and MITRE mapping to each case.",
  },
  {
    id: "routing",
    title: "Adaptive Routing",
    description: "Directed tickets to optimal resolver groups using dynamic workload balancing.",
  },
  {
    id: "collab",
    title: "Collaboration",
    description: "Activated live war-room threads and executive dashboards with status beacons.",
  },
];

export const deployCommands = {
  help: {
    response: [
      "Available commands: schedule_debrief, download_brief, launch_qna, systems_check, battle_card, download_battle_card, help",
      "Use schedule_debrief --slot=<timeframe> to propose mission sync windows.",
    ],
  },
  schedule_debrief: {
    response: [
      "Debrief scheduler engaged. Provide preferred windows (e.g., --slot=Next Wed 1400 ET).",
      "Sterling will respond with confirmation within 4 business hours.",
    ],
  },
  download_brief: {
    response: [
      "Generating executive-ready mission brief…",
      "Download link dispatched to your channel of choice (email or secure transfer).",
    ],
  },
  launch_qna: {
    response: [
      "Bootstrapping tactical Q&A module trained on mission dossiers.",
      "Pilot experience available Q4 – register interest via schedule_debrief.",
    ],
  },
  systems_check: {
    response: [
      "Running systems integrity checks across mission telemetry…",
      "All modules operational. Latency stabilized at 42ms; uptime 99.98%.",
    ],
  },
  battle_card: {
    response: [
      "Decrypting Sterling's battle card with scenario quick hits and escalation protocols…",
      "Intel overlay deployed. Use on-screen controls to export or dismiss.",
    ],
  },
  download_battle_card: {
    response: [
      "Generating interactive battle card snapshot…",
      "Download initiated. Shareable HTML brief prepared for your records.",
    ],
  },
};

export const battleCardIntel = {
  header: {
    title: "Sterling Mission Battle Card",
    subtitle: "Executive quick-brief for mission deployers",
    meta: [
      { label: "Role", value: "Security Operations Strategist" },
      { label: "Base", value: "Charlotte, NC" },
      { label: "Clearance", value: "Public Trust Eligible" },
    ],
  },
  summary: [
    {
      label: "Mission Focus",
      detail:
        "High-severity incident command, adversary pursuit, and automation programs linking SOC, engineering, and leadership.",
    },
    {
      label: "Signature Impact",
      detail: "38% MTTR reduction, 5 operationalized hunts, 60% automation coverage across critical response flows.",
    },
    {
      label: "Core Toolchains",
      detail: "Splunk, CrowdStrike, Azure, ServiceNow, Elastic, custom Python automation, executive briefing frameworks.",
    },
  ],
  engagements: [
    {
      organization: "Regions Bank",
      timeframe: "2021 – Present",
      objective: "Stabilize digital banking during coordinated intrusion attempts.",
      highlights: [
        "Coordinated legal, comms, and SOC stakeholders through live command bridge playbooks.",
        "Mapped attack surface telemetry to remediation waves, prioritizing high-risk assets within hours.",
        "Embedded continuous improvement loops that codified evidence, retros, and automation requirements.",
      ],
      outcomes: [
        "38% reduction in critical-incident MTTR",
        "6 cross-team playbooks activated",
        "Executive confidence cadence established at 12-minute intervals",
      ],
    },
    {
      organization: "Duke Energy",
      timeframe: "2018 – 2021",
      objective: "Expose stealthy outbound movement and tune detections for critical infrastructure estates.",
      highlights: [
        "Executed hunts on outbound RDP/SSH, uncommon remote tools, C2 over NTP, regsvr32 proxy execution, and certutil misuse.",
        "Partnered with engineering to operationalize detections and firewall guardrails based on hunt findings.",
        "Rewired incident case flows with enrichment, routing, and collaboration automation.",
      ],
      outcomes: [
        "5 high-fidelity hunts promoted into continuous monitoring",
        "Alert noise trimmed by 28% post tuning",
        "Automation saved 120 analyst hours per quarter",
      ],
    },
  ],
  hunts: [
    {
      title: "Outbound RDP / SSH sweeps",
      insight: "Correlated Splunk baseline deviations with endpoint telemetry to flag unsanctioned lateral pivots.",
      impact: "Drove adaptive firewall hardening and privileged session reviews within the same maintenance window.",
    },
    {
      title: "Uncommon remote access tools",
      insight: "Stacked rare parent-child process trees to uncover misused administration suites masquerading as support activity.",
      impact: "Resulted in rapid EDR detection logic updates and enterprise-wide credential hygiene push.",
    },
    {
      title: "C2 over NTP",
      insight: "Analyzed jitter, payload size, and host clustering to isolate covert channels without disrupting legitimate synchronization.",
      impact: "Surfaced bespoke detections and network policy adjustments covering industrial zones.",
    },
    {
      title: "Regsvr32 proxy execution",
      insight: "Reverse engineered LOLBin invocation chains to separate scripted deployments from adversarial living-off-the-land activity.",
      impact: "Enabled responsive SOAR actions with automated isolation and leadership notifications.",
    },
    {
      title: "Certutil misuse",
      insight: "Trended certificate and binary fetch patterns to expose staging behaviors ahead of payload execution.",
      impact: "Institutionalized detection-as-code contributions and tightened outbound inspection guardrails.",
    },
  ],
  callToAction: {
    headline: "Ready to deploy?",
    detail:
      "Engage schedule_debrief to coordinate a mission sync or download_brief for the executive slide-ready package.",
  },
};
