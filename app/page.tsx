import { LandingHero } from '@/components/landing/LandingHero';
import { MissionOrbit } from '@/components/mission/MissionOrbit';
import { MissionPanel } from '@/components/mission/MissionPanel';
import { RegionsIncident } from '@/components/ops/RegionsIncident';
import { RegionsSurface } from '@/components/ops/RegionsSurface';
import { RegionsLoop } from '@/components/ops/RegionsLoop';
import { DukeHunts } from '@/components/ops/DukeHunts';
import { DukeTuning } from '@/components/ops/DukeTuning';
import { DukeAutomation } from '@/components/ops/DukeAutomation';
import { SkillGallery } from '@/components/skill/SkillGallery';
import { ImpactCommand } from '@/components/impact/ImpactCommand';
import { DeployConsole } from '@/components/deploy/DeployConsole';
import { HudTelemetry } from '@/components/common/HudTelemetry';
import { MissionTimeline } from '@/components/common/MissionTimeline';
import { NarrationConsole } from '@/components/common/NarrationConsole';

export default function HomePage() {
  return (
    <main className="pb-32">
      <HudTelemetry />
      <NarrationConsole />
      <LandingHero />
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <MissionOrbit />
        <MissionPanel />
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <RegionsIncident />
        <RegionsSurface />
        <RegionsLoop />
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <DukeHunts />
        <DukeTuning />
        <DukeAutomation />
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <SkillGallery />
        <ImpactCommand />
        <DeployConsole />
      </section>
      <MissionTimeline />
    </main>
  );
}
