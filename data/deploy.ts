export type DeployCommand = {
  id: string;
  command: string;
  description: string;
  requiresForm?: boolean;
  link?: string;
};

export const deployCommands: DeployCommand[] = [
  {
    id: 'schedule',
    command: 'schedule_debrief',
    description: 'Launch scheduling workflow to book a strategy debrief.',
    requiresForm: true
  },
  {
    id: 'battle-card',
    command: 'download_battle_card',
    description: 'Export executive-ready battle card with mission intel.'
  },
  {
    id: 'launch-qna',
    command: 'launch_qna',
    description: 'Spin up context-aware Q&A (coming soon).'
  }
];
