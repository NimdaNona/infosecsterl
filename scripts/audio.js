import { clamp } from "./utils.js";

function createAmbienceBuffer(context) {
  const durationSeconds = 24;
  const frameCount = context.sampleRate * durationSeconds;
  const buffer = context.createBuffer(2, frameCount, context.sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    let phase = 0;
    let drift = Math.random() * Math.PI * 2;
    for (let i = 0; i < frameCount; i += 1) {
      const progress = i / frameCount;
      phase += 0.0009 + Math.sin(progress * Math.PI * 2) * 0.00015;
      drift += 0.0003;
      const slowPulse = Math.sin(phase);
      const shimmer = Math.sin(drift) * 0.2;
      const noise = (Math.random() * 2 - 1) * 0.05;
      data[i] = slowPulse * 0.4 + shimmer * 0.3 + noise;
    }
  }

  return buffer;
}

function createEffectBuffer(context) {
  const durationSeconds = 0.8;
  const frameCount = Math.floor(context.sampleRate * durationSeconds);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    const t = i / frameCount;
    const envelope = Math.exp(-6 * t);
    const chirp = Math.sin((350 + 250 * t) * 2 * Math.PI * t);
    data[i] = envelope * chirp;
  }

  return buffer;
}

function createVoiceBuffer(context) {
  const durationSeconds = 1.6;
  const frameCount = Math.floor(context.sampleRate * durationSeconds);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    const t = i / context.sampleRate;
    const envelope = Math.min(1, t * 4) * Math.exp(-2.2 * t);
    const harmonic = Math.sin(2 * Math.PI * 220 * t) * 0.6;
    const fifth = Math.sin(2 * Math.PI * 330 * t) * 0.3;
    const twinkle = Math.sin(2 * Math.PI * (880 + Math.sin(t * 2) * 40) * t) * 0.15;
    data[i] = envelope * (harmonic + fifth + twinkle);
  }

  return buffer;
}

const STORAGE_KEY = "sterling-audio-preferences";

function loadPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || !parsed) return null;
    return parsed;
  } catch (error) {
    console.warn("Failed to load audio preferences", error);
    return null;
  }
}

function savePreferences(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.warn("Failed to persist audio preferences", error);
  }
}

export function createAudioManager({ onStateChange } = {}) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const masterGain = context.createGain();
  masterGain.gain.value = 0.8;
  masterGain.connect(context.destination);

  const channelGains = {
    ambience: context.createGain(),
    effects: context.createGain(),
    voice: context.createGain(),
  };

  channelGains.ambience.gain.value = 0.6;
  channelGains.effects.gain.value = 0.9;
  channelGains.voice.gain.value = 0.8;

  Object.values(channelGains).forEach((gain) => gain.connect(masterGain));

  const buffers = new Map([
    ["ambience", createAmbienceBuffer(context)],
    ["effects", createEffectBuffer(context)],
    ["voice", createVoiceBuffer(context)],
  ]);
  let ambienceSource = null;
  let initialized = false;
  const channelStates = {
    ambience: false,
    effects: false,
    voice: false,
  };

  const readyPromise = Promise.resolve();

  const persisted = loadPreferences();
  if (persisted) {
    Object.keys(channelStates).forEach((channel) => {
      if (typeof persisted[channel] === "boolean") {
        channelStates[channel] = persisted[channel];
      }
    });
  }

  function resumeContext() {
    if (initialized) return;
    initialized = true;
    if (context.state === "suspended") {
      context.resume().catch((error) => console.error("Audio context resume failed", error));
    }
  }

  function emitState(channel) {
    if (typeof onStateChange === "function") {
      onStateChange(channel, channelStates[channel]);
    }
    savePreferences(channelStates);
  }

  function stopAmbience() {
    if (ambienceSource) {
      try {
        ambienceSource.stop();
      } catch (error) {
        console.warn("Failed to stop ambience", error);
      }
    }
    ambienceSource = null;
  }

  async function startAmbience() {
    await readyPromise;
    stopAmbience();
    const buffer = buffers.get("ambience");
    if (!buffer) return;
    ambienceSource = context.createBufferSource();
    ambienceSource.buffer = buffer;
    ambienceSource.loop = true;
    ambienceSource.connect(channelGains.ambience);
    ambienceSource.start(0);
  }

  function scheduleHit(buffer, destination, playbackRate = 1) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = clamp(playbackRate, 0.5, 2.5);
    source.connect(destination);
    source.start();
    return source;
  }

  async function enableChannel(channel, enabled) {
    if (!(channel in channelStates)) return;
    channelStates[channel] = Boolean(enabled);

    if (!initialized && enabled) {
      resumeContext();
    }

    if (!enabled) {
      if (channel === "ambience") {
        stopAmbience();
      }
      emitState(channel);
      return;
    }

    await readyPromise;

    if (channel === "ambience") {
      startAmbience();
    }

    emitState(channel);
  }

  async function triggerEffect(effect = "effects") {
    if (!channelStates.effects) return;
    await readyPromise;
    const buffer = buffers.get("effects");
    if (!buffer) return;
    resumeContext();
    scheduleHit(buffer, channelGains.effects, effect === "focus" ? 1.2 : 1);
  }

  async function triggerVoice(type = "mission") {
    if (!channelStates.voice) return;
    await readyPromise;
    const buffer = buffers.get("voice");
    if (!buffer) return;
    resumeContext();
    scheduleHit(buffer, channelGains.voice, type === "brief" ? 0.8 : 1);
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mediaQuery.matches && !persisted) {
    // Respect reduced motion preference by leaving channels muted until explicit opt-in
    Object.keys(channelStates).forEach((channel) => {
      channelStates[channel] = false;
    });
  }

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        stopAmbience();
      } else if (channelStates.ambience) {
        startAmbience();
      }
    },
    { passive: true }
  );

  return {
    ready: () => readyPromise,
    isEnabled: (channel) => channelStates[channel],
    setChannel: (channel, enabled) => enableChannel(channel, enabled),
    toggleChannel: (channel) => enableChannel(channel, !channelStates[channel]),
    playEffect: (type) => triggerEffect(type),
    playVoice: (type) => triggerVoice(type),
    resume: resumeContext,
    currentState: () => ({ ...channelStates }),
  };
}
