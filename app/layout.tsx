import type { Metadata } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display'
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Sterling Thompson // Mission Command',
  description:
    'Immersive cybersecurity mission control showcasing incident command, threat hunting, and automation impact.',
  metadataBase: new URL('https://sterling-mission-command.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body className="bg-night text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
