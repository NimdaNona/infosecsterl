'use client';

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export type SectionHeaderProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  subtitle?: string;
}>;

export function SectionHeader({ eyebrow, title, subtitle, children }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-4">
      <motion.span
        className="text-sm uppercase tracking-[0.3em] text-neon"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        className="text-4xl font-semibold text-white sm:text-5xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          className="max-w-3xl text-lg text-slate-300"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}
