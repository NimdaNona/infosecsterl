# Sterling Mission Command 

Immersive, Next.js-powered command center showcasing Sterling Thompson's incident leadership, threat hunting, and automation impact across Regions Bank and Duke Energy.

## Tech stack
- [Next.js 14](https://nextjs.org/) with the app router
- TypeScript, Tailwind CSS, Framer Motion
- react-three-fiber + drei for real-time mission orbit rendering
- Zustand for telemetry, audio, and mission state

## Getting started

```bash
pnpm install
pnpm dev
```

The site boots at `http://localhost:3000`.

### Useful scripts
- `pnpm build` – production build
- `pnpm start` – run built app
- `pnpm lint` – lint with ESLint
- `pnpm test` – execute Vitest unit tests (placeholder)
- `pnpm test:ui` – run Playwright journey tests (placeholder)

## Project structure
- `app/` – layout + page composition
- `components/` – HUD, mission, operations, impact, and console components
- `data/` – typed narrative + telemetry datasets powering interactions
- `lib/` – global Zustand store and audio hooks

## Accessibility & reduced motion
The HUD honors `prefers-reduced-motion` and disables the procedural audio bed when visitors opt out. Mission selections unlock the timeline and narration console with ARIA-friendly copy.

## Deployment
The project targets Vercel. Build with `pnpm build` and deploy the `.next` output. Analytics instrumentation hooks can be layered via Vercel Analytics or PostHog.
