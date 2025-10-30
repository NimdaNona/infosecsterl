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
  },
];

export const incidentAlerts = [
  { id: 1, x: 18, y: 24, delay: 300 },
  { id: 2, x: 62, y: 34, delay: 600 },
  { id: 3, x: 45, y: 58, delay: 900 },
  { id: 4, x: 78, y: 22, delay: 1200 },
  { id: 5, x: 32, y: 70, delay: 1800 },
  { id: 6, x: 14, y: 56, delay: 2200 },
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
    intel: {
      baseline: "Legacy middleware with elevated attack surface across 214 services.",
      action: "Introduced adaptive segmentation, prioritized 14 services for code hardening, and implemented continuous scanning cadence.",
      outcome: "Exposure window dropped 31% and change failure rate improved to 2.1%.",
    },
  },
  {
    id: "loan-ops",
    label: "Loan Ops",
    risk: "medium",
    intel: {
      baseline: "Fragmented detection mapping for loan origination endpoints.",
      action: "Merged telemetry sources, built coverage heatmap, and orchestrated 3 net-new detections.",
      outcome: "Playbook adoption raised coverage to 94% of privileged systems.",
    },
  },
  {
    id: "cloud-infra",
    label: "Cloud Infra",
    risk: "medium",
    intel: {
      baseline: "Drift in least privilege policies and stale firewall constructs.",
      action: "Conducted IAM entitlements review, introduced just-in-time elevation, and hardened firewall baselines.",
      outcome: "Critical misconfigurations reduced by 47%; anomaly time-to-detect trimmed to 11 minutes.",
    },
  },
  {
    id: "treasury",
    label: "Treasury",
    risk: "high",
    intel: {
      baseline: "Manual recovery runbooks extended MTTR and left communication blind spots.",
      action: "Automated notification matrix, digitized recovery runbooks, and aligned tabletop exercises.",
      outcome: "Stakeholder satisfaction +22 NPS; compliance audit cycle shortened by 16 days.",
    },
  },
  {
    id: "branch-network",
    label: "Branch Net",
    risk: "low",
    intel: {
      baseline: "Endpoint visibility gaps across retail branches due to aging infrastructure.",
      action: "Deployed lightweight sensors, normalized telemetry, and pushed remote remediation scripts.",
      outcome: "Endpoint fidelity climbed to 98% with automated isolation protocols."
    },
  },
  {
    id: "api-gateway",
    label: "API Gateway",
    risk: "high",
    intel: {
      baseline: "Elevated anonymous traffic during fraud campaigns.",
      action: "Implemented dynamic rate limiting, anomaly scoring, and cross-team threat intel pipelines.",
      outcome: "Blocked 3 fraud clusters and preserved customer availability metrics.",
    },
  },
  {
    id: "data-warehouse",
    label: "Data Warehouse",
    risk: "medium",
    intel: {
      baseline: "Slow incident handoff between data stewards and security analysts.",
      action: "Stood up federated communication workspace and rapid classification workflows.",
      outcome: "Handoff cycle compressed by 41%, elevating response agility.",
    },
  },
  {
    id: "mobile-platform",
    label: "Mobile",
    risk: "medium",
    intel: {
      baseline: "Visibility gaps in customer auth telemetry across mobile stack.",
      action: "Instrumented telemetry ingestion, baseline analysis, and detection tuning for anomalous access.",
      outcome: "Flagged 9 credential stuffing events and reinforced fraud controls.",
    },
  },
  {
    id: "fin-intel",
    label: "Fin Intel",
    risk: "low",
    intel: {
      baseline: "Intelligence insights siloed from incident response teams.",
      action: "Built intelligence briefs, integrated cross-team Slack automation, and scheduled mission syncs.",
      outcome: "Reduced duplication in analysis by 33%, enabling quicker strategic alignment.",
    },
  },
  {
    id: "reg-reporting",
    label: "Reg Ops",
    risk: "medium",
    intel: {
      baseline: "Manual regulatory notifications causing inconsistent messaging.",
      action: "Crafted standardized briefs, automation triggers, and approval workflows.",
      outcome: "Regulatory confidence score improved to 4.7/5 from 3.9/5.",
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
      detections: "2 net-new detections",
      firewall: "7 firewall policy updates",
      visibility: "RDP telemetry completeness from 72% ➝ 98%",
    },
    mitre: [
      "T1021.001 | Remote Services: Remote Desktop Protocol",
      "T1021.004 | Remote Services: SSH",
      "T1078 | Valid Accounts",
    ],
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
      detections: "1 hunt → 3 real-time detections",
      firewall: "Tightened east-west ACLs across data centers",
      visibility: "Credential misuse signal-to-noise improved 2.6x",
    },
    mitre: [
      "T1105 | Ingress Tool Transfer",
      "T1569.002 | System Services: Service Execution",
      "T1136.001 | Create Account: Local Account",
    ],
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
      detections: "Added 2 correlation rules",
      firewall: "Dynamic egress filters to sanctioned pools",
      visibility: "Anomaly detection latency reduced to 3 minutes",
    },
    mitre: [
      "T1071.004 | Application Layer Protocol: NTP",
      "T1041 | Exfiltration Over C2 Channel",
      "T1568.002 | Dynamic Resolution: Domain Generation Algorithms",
    ],
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
      detections: "Introduced behavioral signature coverage",
      firewall: "Network isolation triggers for suspicious hosts",
      visibility: "Regsvr32 misuse detection from 35% ➝ 92%",
    },
    mitre: [
      "T1218.010 | Signed Binary Proxy Execution: Regsvr32",
      "T1105 | Ingress Tool Transfer",
      "T1547.001 | Boot or Logon Autostart Execution: Registry Run Keys",
    ],
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
      detections: "Coverage expanded to 95% of certutil executions",
      firewall: "Policy hardened for outbound data staging",
      visibility: "Certutil misuse dwell time collapsed to <6 minutes",
    },
    mitre: [
      "T1105 | Ingress Tool Transfer",
      "T1567.002 | Exfiltration Over Web Service: Exfiltration to Cloud Storage",
      "T1140 | Deobfuscate/Decode Files or Information",
    ],
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
      "Available commands: schedule_debrief, download_brief, launch_qna, systems_check, battle_card, help",
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
      "Download available: /assets/sterling-battle-card.pdf (placeholder link for recruiter delivery).",
    ],
  },
};
