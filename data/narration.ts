export type NarrationCue = {
  id: string;
  label: string;
  transcript: string;
};

export const narrationCues: NarrationCue[] = [
  {
    id: 'landing-init',
    label: 'Landing Boot Sequence',
    transcript: 'Mission control link established. Calibrating telemetry feeds and preparing dossiers.'
  },
  {
    id: 'regions-brief',
    label: 'Regions Command Brief',
    transcript: 'Command bridge engaged. Stakeholder cadence synchronized; containment play in motion.'
  },
  {
    id: 'duke-hunt',
    label: 'Threat Hunt Activation',
    transcript: 'Hunt deck online. Baselines locked, anomalies pulsing—reviewing pivot chains now.'
  },
  {
    id: 'impact-brief',
    label: 'Impact Analytics',
    transcript: 'Impact constellation lit. Gauges updated with the latest mission outcomes and executive dossiers.'
  },
  {
    id: 'deploy-console',
    label: 'Deploy Console',
    transcript: 'Deployment console primed. Issue commands to coordinate the next Sterling engagement.'
  }
];
