import { useEffect, useRef } from 'react';
import { useMissionStore } from './store';

const createOscillator = (
  context: AudioContext,
  type: OscillatorType,
  frequency: number,
  gain: number
) => {
  const osc = context.createOscillator();
  const gainNode = context.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gainNode.gain.value = gain;
  osc.connect(gainNode);
  gainNode.connect(context.destination);
  return { osc, gainNode, baseGain: gain };
};

export const useAudioEngine = () => {
  const audioState = useMissionStore((state) => state.audio);
  const reducedMotion = useMissionStore((state) => state.reducedMotion);
  const contextRef = useRef<AudioContext | null>(null);
  const ambienceRef = useRef<ReturnType<typeof createOscillator> | null>(null);
  const pulseRef = useRef<ReturnType<typeof createOscillator> | null>(null);
  const narrationRef = useRef<ReturnType<typeof createOscillator> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reducedMotion) return;
    if (!contextRef.current) {
      contextRef.current = new AudioContext();
      ambienceRef.current = createOscillator(contextRef.current, 'sine', 42, 0.03);
      ambienceRef.current.osc.start();
      pulseRef.current = createOscillator(contextRef.current, 'triangle', 128, 0.015);
      pulseRef.current.osc.start();
      narrationRef.current = createOscillator(contextRef.current, 'sawtooth', 256, 0.0);
      narrationRef.current.osc.start();
    }

    return () => {
      contextRef.current?.close();
      contextRef.current = null;
      ambienceRef.current = null;
      pulseRef.current = null;
      narrationRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const updateChannel = (node: ReturnType<typeof createOscillator> | null, enabled: boolean) => {
      if (!node) return;
      node.gainNode.gain.value = enabled ? node.baseGain : 0;
    };

    updateChannel(ambienceRef.current, audioState.ambience);
    updateChannel(pulseRef.current, audioState.effects);
    updateChannel(narrationRef.current, audioState.narration);
  }, [audioState]);
};
