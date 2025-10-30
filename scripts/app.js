import {
  missionDossiers,
  timelineSegments,
  incidentDecisionTree,
  incidentAssets,
  incidentScenes,
  briefingTimeline,
  surfaceNodes,
  loopIntel,
  hunts,
  skills,
  impactSignals,
  automationTickets,
  deployCommands,
  battleCardIntel,
} from "./data.js";
import { MissionOrbit } from "./orbit.js";
import { createAudioManager } from "./audio.js";
import { clamp } from "./utils.js";

const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const heroCanvas = select("#hero-canvas");
const audioButtons = selectAll("[data-audio-channel]");
const deployOutput = select("#deploy-output");
const deployInput = select("#deploy-command");
const deploySubmit = select("#deploy-submit");
const missionOrbit = select("#mission-orbit");
const missionOrbitCanvas = select("#mission-orbit-canvas");
const missionOrbitOverlay = select("#mission-orbit-overlay");
const missionOrbitFallback = select("#mission-orbit-fallback");
const missionPanel = select("#mission-panel");
const missionMetrics = select("#mission-metrics");
const missionList = select("#mission-list");
const timelineList = select("#timeline-list");
const timelineIntel = select("#timeline-intel");
const cursorEl = select("#cursor");
const battleCardOverlay = select("#battle-card");
const battleCardPanel = select("#battle-card-panel");
const battleCardBody = select("#battle-card-body");
const battleCardDownload = select("#battle-card-download");
const battleCardDismissButtons = selectAll("[data-battle-card-dismiss]");
const battleCardTitle = select("#battle-card-title");
const battleCardSubtitle = select("#battle-card-subtitle");
const battleCardMeta = select("#battle-card-meta");

let audioManager;
let missionOrbitInstance;
let battleCardPreviouslyFocused;

function initStarfield(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let animationId;
  const stars = [];

  function resize() {
    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;
  }

  function seedStars() {
    stars.length = 0;
    const count = motionQuery.matches ? 160 : 320;
    for (let index = 0; index < count; index += 1) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        z: 0.2 + Math.random() * 0.8,
        velocity: 0.0005 + Math.random() * 0.0015,
      });
    }
  }

  function paint(staticFrame = false) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(4,5,16,0.85)";
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    stars.forEach((star) => {
      if (!staticFrame) {
        star.z -= star.velocity;
        if (star.z <= 0) star.z = 1;
      }

      const perspective = 100 / star.z;
      const x = (star.x - 0.5) * width * perspective + centerX;
      const y = (star.y - 0.5) * height * perspective + centerY;
      const size = Math.max(0.5, (1 - star.z) * 3 * devicePixelRatio);
      const alpha = 0.35 + (1 - star.z) * 0.65;

      ctx.fillStyle = `rgba(126,255,245,${Math.min(alpha, 0.95)})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function render() {
    if (motionQuery.matches) return;
    paint(false);
    animationId = requestAnimationFrame(render);
  }

  function start() {
    cancelAnimationFrame(animationId);
    resize();
    seedStars();
    if (motionQuery.matches) {
      paint(true);
    } else {
      render();
    }
  }

  start();

  window.addEventListener("resize", () => {
    resize();
    if (motionQuery.matches) {
      paint(true);
    }
  });

  motionQuery.addEventListener("change", start);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(animationId));
}

function initSmoothScroll() {
  document.addEventListener("click", (event) => {
    const activator = event.target.closest("[data-scroll]");
    if (!activator) return;
    const target = select(activator.dataset.scroll);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderMissionControl() {
  if (
    !missionOrbit ||
    !missionOrbitCanvas ||
    !missionOrbitOverlay ||
    !missionPanel ||
    !missionMetrics ||
    !missionList
  ) {
    return;
  }

  const panelTitle = missionPanel.querySelector("h3");
  const panelDescription = missionPanel.querySelector("p");
  const panelStatus = missionPanel.querySelector("[data-panel-status]");
  const defaultHint =
    panelStatus?.textContent.trim() ||
    "Focus the orbit and press space to toggle wireframe schematics. Use arrow keys to adjust rotation speed.";
  const wireframeHint =
    "Wireframe schematics engaged. Press space to restore the full mission overlay.";
  const dragHint = "Manual spin engaged. Drag to reorient the dossiers.";
  let wireframeEnabled = false;
  let hintTimeout;

  const restoreHint = (message) => {
    if (!panelStatus) return;
    panelStatus.textContent = message || (wireframeEnabled ? wireframeHint : defaultHint);
  };

  const pulseHint = (message, persist = false) => {
    if (!panelStatus) return;
    panelStatus.textContent = message;
    clearTimeout(hintTimeout);
    if (!persist) {
      hintTimeout = window.setTimeout(() => restoreHint(), 1600);
    }
  };

  const updatePanel = (dossier) => {
    if (!dossier) return;
    panelTitle.textContent = dossier.label;
    panelDescription.textContent = dossier.summary;
    missionMetrics.innerHTML = dossier.metrics
      .map((metric) => `<div class="mission-control__metric">${metric}</div>`)
      .join("");
  };

  missionList.innerHTML = "";
  missionDossiers.forEach((dossier) => {
    const listCard = document.createElement("article");
    listCard.className = "dossier";
    listCard.role = "listitem";
    listCard.dataset.scroll = dossier.target;
    listCard.tabIndex = 0;
    listCard.innerHTML = `
      <header class="dossier__header">
        <h3>${dossier.label}</h3>
        <p>${dossier.subtitle}</p>
      </header>
      <div class="dossier__preview">
        <p>${dossier.summary}</p>
      </div>
      <footer class="dossier__footer">
        ${dossier.metrics.map((metric) => `<span class="dossier__metric">${metric}</span>`).join("")}
      </footer>
    `;
    listCard.addEventListener("focus", () => {
      missionOrbitInstance?.focusDossier(dossier.id);
      updatePanel(dossier);
    });
    listCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const target = select(dossier.target);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        audioManager?.playVoice("mission");
      }
    });
    missionList.appendChild(listCard);
  });

  if (missionOrbitFallback) {
    missionOrbitFallback.innerHTML = "";
    missionDossiers.forEach((dossier) => {
      const button = document.createElement("button");
      button.className = "orbit-fallback";
      button.type = "button";
      button.dataset.dossierId = dossier.id;
      button.dataset.scroll = dossier.target;
      button.setAttribute("role", "listitem");
      button.textContent = dossier.label;
      missionOrbitFallback.appendChild(button);
      button.addEventListener("focus", () => {
        missionOrbitInstance?.focusDossier(dossier.id);
        updatePanel(dossier);
      });
      button.addEventListener("click", () => {
        const target = select(dossier.target);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        audioManager?.playVoice("mission");
      });
      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const target = select(dossier.target);
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
          audioManager?.playVoice("mission");
        }
      });
    });
  }

  missionOrbitInstance?.dispose();
  missionOrbitOverlay.innerHTML = "";
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  missionOrbitInstance = new MissionOrbit({
    canvas: missionOrbitCanvas,
    overlay: missionOrbitOverlay,
    dossiers: missionDossiers,
    reducedMotion: reduceMotionQuery.matches,
    onHover: (dossier) => {
      updatePanel(dossier);
      pulseHint(`Tracking ${dossier.label}.`, true);
      audioManager?.playEffect("focus");
    },
    onSelect: (dossier) => {
      const target = select(dossier.target);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      audioManager?.playVoice("mission");
    },
    onWireframeChange: (enabled) => {
      wireframeEnabled = enabled;
      restoreHint();
    },
  });

  missionOrbitInstance.focusDossier(missionDossiers[0].id);

  missionOrbit.addEventListener("pointerdown", () => {
    missionOrbit.classList.add("mission-control__orbital--engaged");
    pulseHint(dragHint, true);
  });
  missionOrbit.addEventListener("pointerup", () => {
    missionOrbit.classList.remove("mission-control__orbital--engaged");
    restoreHint();
  });
  missionOrbit.addEventListener("mouseleave", () => {
    missionOrbit.classList.remove("mission-control__orbital--engaged");
    restoreHint();
  });

  missionOrbit.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      missionOrbitInstance?.toggleWireframe();
      return;
    }

    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
      event.preventDefault();
      missionOrbitInstance?.adjustVelocity(event.code === "ArrowRight" ? 0.6 : -0.6);
      pulseHint("Orbit velocity recalibrated.");
      return;
    }

    if (event.code === "ArrowUp") {
      event.preventDefault();
      missionOrbitInstance?.boostVelocity(1.3);
      pulseHint("Orbit boost engaged.");
      return;
    }

    if (event.code === "ArrowDown") {
      event.preventDefault();
      missionOrbitInstance?.boostVelocity(0.6);
      pulseHint("Orbit damping engaged.");
    }
  });

  missionOrbit.addEventListener("focus", () => restoreHint());
  missionOrbit.addEventListener("blur", () => restoreHint());

  reduceMotionQuery.addEventListener("change", (event) => {
    if (missionOrbitInstance) {
      missionOrbitInstance.reducedMotion = event.matches;
    }
  });

  updatePanel(missionDossiers[0]);
  restoreHint();

  window.addEventListener("beforeunload", () => clearTimeout(hintTimeout));
}

function animateCounters() {
  const counters = selectAll("[data-counter]");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setFinalValue = (el) => {
    const target = Number(el.dataset.counter);
    const isPercent = el.dataset.counterType === "percent" || el.textContent?.includes("%");
    el.textContent = isPercent ? `${target}%` : `${target}`;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.dataset.counter);
          const isPercent = el.dataset.counterType === "percent" || el.textContent?.includes("%");
          let current = 0;
          const duration = 1800;
          const start = performance.now();

          if (motionQuery.matches) {
            setFinalValue(el);
            observer.unobserve(el);
            return;
          }

          function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            current = Math.floor(progress * target);
            el.textContent = isPercent ? `${current}%` : `${current}`;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));

  if (motionQuery.matches) {
    counters.forEach(setFinalValue);
  }

  motionQuery.addEventListener("change", (event) => {
    if (event.matches) {
      counters.forEach(setFinalValue);
    }
  });
}

function renderIncidentMap() {
  const svg = select("#incident-map-canvas");
  const timeline = select("#incident-timeline");
  const decisionContainer = select("#incident-decisions");
  const panel = select("#incident-panel");
  const playButton = select("#incident-play");
  const scrubber = select("#incident-scrub");
  if (!svg || !timeline || !decisionContainer || !panel || !playButton || !scrubber) return;

  const ns = "http://www.w3.org/2000/svg";
  svg.innerHTML = "";
  timeline.innerHTML = "";
  decisionContainer.innerHTML = "";

  const nodeMap = new Map();
  const shieldMap = new Map();
  const flowMap = new Map();

  const playback = {
    sceneId: null,
    entries: [],
    index: 0,
    playing: false,
    lastTick: 0,
    delay: 4200,
  };
  let playbackFrame;

  const cleanupPlayback = () => {
    cancelAnimationFrame(playbackFrame);
    playback.playing = false;
    playButton.setAttribute("aria-pressed", "false");
    playButton.classList.remove("chip--active");
    playButton.textContent = "Auto-Play Timeline";
  };

  const setActiveEntry = (index, announce = true) => {
    if (!playback.entries.length) return;
    playback.index = clamp(index, 0, playback.entries.length - 1);
    scrubber.value = String(playback.index);
    selectAll("[data-timeline-index]", timeline).forEach((item) => {
      const active = Number(item.dataset.timelineIndex) === playback.index;
      item.classList.toggle("incident-timeline__item--active", active);
      if (active) {
        item.setAttribute("aria-current", "true");
        if (typeof item.scrollIntoView === "function") {
          item.scrollIntoView({ behavior: announce ? "smooth" : "auto", inline: "center", block: "nearest" });
        }
        if (announce) {
          timeline.setAttribute(
            "aria-label",
            `${playback.entries[playback.index].label} at ${playback.entries[playback.index].time}`
          );
        }
      } else {
        item.removeAttribute("aria-current");
      }
    });

    const entry = playback.entries[playback.index];
    if (!entry) return;
    if (entry.type === "brief") {
      audioManager?.playVoice("brief");
    } else {
      audioManager?.playEffect("focus");
    }
  };

  const playLoop = (timestamp) => {
    if (!playback.playing) return;
    if (!playback.lastTick) playback.lastTick = timestamp;
    const elapsed = timestamp - playback.lastTick;
    if (elapsed >= playback.delay) {
      playback.lastTick = timestamp;
      if (playback.index < playback.entries.length - 1) {
        setActiveEntry(playback.index + 1);
      } else {
        cleanupPlayback();
        playback.lastTick = 0;
        return;
      }
    }
    playbackFrame = requestAnimationFrame(playLoop);
  };

  const setPlaying = (state) => {
    cancelAnimationFrame(playbackFrame);
    if (!playback.entries.length) {
      playback.playing = false;
      playButton.classList.remove("chip--active");
      playButton.setAttribute("aria-pressed", "false");
      playButton.textContent = "Auto-Play Timeline";
      return;
    }
    playback.playing = state;
    playButton.classList.toggle("chip--active", state);
    playButton.setAttribute("aria-pressed", String(state));
    playButton.textContent = state ? "Pause Auto-Play" : "Auto-Play Timeline";
    if (state) {
      playback.lastTick = 0;
      audioManager?.playEffect("effects");
      playbackFrame = requestAnimationFrame(playLoop);
    }
  };

  playButton.addEventListener("click", () => {
    if (!playback.entries.length) return;
    if (playback.playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  });

  scrubber.addEventListener("input", (event) => {
    const nextIndex = Number(event.target.value);
    setPlaying(false);
    setActiveEntry(nextIndex, false);
  });

  timeline.addEventListener("click", (event) => {
    const item = event.target.closest("[data-timeline-index]");
    if (!item) return;
    setPlaying(false);
    setActiveEntry(Number(item.dataset.timelineIndex));
  });

  timeline.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const item = event.target.closest("[data-timeline-index]");
    if (!item) return;
    event.preventDefault();
    setPlaying(false);
    setActiveEntry(Number(item.dataset.timelineIndex));
  });

  incidentAssets.forEach((asset) => {
    const shield = document.createElementNS(ns, "circle");
    shield.setAttribute("cx", asset.x);
    shield.setAttribute("cy", asset.y);
    shield.setAttribute("r", "0");
    shield.classList.add("incident-shield");
    shield.dataset.assetId = asset.id;
    svg.appendChild(shield);
    shieldMap.set(asset.id, shield);

    const node = document.createElementNS(ns, "circle");
    node.setAttribute("cx", asset.x);
    node.setAttribute("cy", asset.y);
    node.setAttribute("r", "3.2");
    node.classList.add("incident-node", `incident-node--${asset.zone}`);
    node.dataset.assetId = asset.id;
    svg.appendChild(node);
    nodeMap.set(asset.id, node);

    const label = document.createElementNS(ns, "text");
    label.setAttribute("x", String(asset.x + 2.4));
    label.setAttribute("y", String(asset.y - 2.4));
    label.classList.add("incident-label");
    label.textContent = asset.label;
    svg.appendChild(label);
  });

  Object.values(incidentScenes).forEach((scene) => {
    scene.flows.forEach((flow) => {
      const key = `${flow.from}:${flow.to}`;
      if (flowMap.has(key)) return;
      const from = incidentAssets.find((asset) => asset.id === flow.from);
      const to = incidentAssets.find((asset) => asset.id === flow.to);
      if (!from || !to) return;
      const path = document.createElementNS(ns, "path");
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2 - 6;
      path.setAttribute("d", `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`);
      path.classList.add("incident-link");
      path.dataset.flowKey = key;
      svg.insertBefore(path, svg.firstChild);
      flowMap.set(key, path);
    });
  });

  const decisionButtons = () => selectAll(".decision-btn", decisionContainer);

  const updateScene = (sceneId) => {
    const scene = incidentScenes[sceneId];
    timeline.innerHTML = "";
    delete timeline.dataset.scene;
    timeline.removeAttribute("aria-label");
    nodeMap.forEach((node) => node.classList.remove("incident-node--active"));
    flowMap.forEach((flow) => {
      flow.classList.remove(
        "incident-link--active",
        "incident-link--alert",
        "incident-link--analysis",
        "incident-link--command",
        "incident-link--contain",
        "incident-link--brief",
        "incident-link--outcome"
      );
    });
    shieldMap.forEach((shield) => {
      shield.classList.remove(
        "incident-shield--active",
        "incident-shield--monitor",
        "incident-shield--contain",
        "incident-shield--brief"
      );
      shield.setAttribute("r", "0");
    });

    if (!scene) return;

    const activeAssets = new Set();
    scene.flows.forEach((flow) => {
      const key = `${flow.from}:${flow.to}`;
      const element = flowMap.get(key);
      if (element) {
        element.classList.add("incident-link--active", `incident-link--${flow.type}`);
      }
      activeAssets.add(flow.from);
      activeAssets.add(flow.to);
    });

    scene.shields?.forEach((shield) => {
      const shieldEl = shieldMap.get(shield.center);
      if (shieldEl) {
        shieldEl.classList.add("incident-shield--active", `incident-shield--${shield.type}`);
        shieldEl.setAttribute("r", String(shield.radius));
      }
      activeAssets.add(shield.center);
    });

    activeAssets.forEach((assetId) => {
      const node = nodeMap.get(assetId);
      if (node) {
        node.classList.add("incident-node--active");
      }
    });

    timeline.innerHTML = scene.timeline
      .map(
        (entry, index) => `
        <article
          class="incident-timeline__item incident-timeline__item--${entry.type}"
          data-timeline-index="${index}"
          tabindex="0"
        >
          <header>
            <span>${entry.time}</span>
            <h5>${entry.label}</h5>
          </header>
          <p>${entry.detail}</p>
        </article>
      `
      )
      .join("");

    timeline.dataset.scene = sceneId;
    timeline.setAttribute("aria-label", `${scene.label} timeline updates`);

    playback.sceneId = sceneId;
    playback.entries = scene.timeline;
    playback.index = 0;
    scrubber.max = Math.max(playback.entries.length - 1, 0);
    scrubber.value = "0";
    setPlaying(false);
    if (playback.entries.length > 0) {
      setActiveEntry(0, false);
    }
  };

  function updateDecision(decisionId) {
    const data = incidentDecisionTree.find((item) => item.id === decisionId);
    if (!data) return;
    decisionButtons().forEach((button) => button.classList.remove("active"));
    const active = decisionContainer.querySelector(`[data-decision="${decisionId}"]`);
    active?.classList.add("active");
    panel.innerHTML = `
      <div>
        <strong>${data.label}</strong>
        <p>${data.narrative}</p>
      </div>
      <ul>
        ${data.actions.map((action) => `<li>${action}</li>`).join("")}
      </ul>
    `;
    updateScene(data.scene);
  }

  incidentDecisionTree.forEach((decision, index) => {
    const btn = document.createElement("button");
    btn.className = "decision-btn";
    btn.type = "button";
    btn.dataset.decision = decision.id;
    btn.dataset.scene = decision.scene;
    btn.textContent = decision.label;
    if (index === 0) btn.classList.add("active");
    decisionContainer.appendChild(btn);
  });

  decisionContainer.addEventListener("click", (event) => {
    const target = event.target.closest(".decision-btn");
    if (!target) return;
    updateDecision(target.dataset.decision);
  });

  decisionContainer.addEventListener("keydown", (event) => {
    const navigationKeys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!navigationKeys.includes(event.key)) return;
    const buttons = decisionButtons();
    const currentIndex = buttons.findIndex((button) => button === document.activeElement);
    if (currentIndex === -1) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
    buttons[nextIndex].focus();
    updateDecision(buttons[nextIndex].dataset.decision);
  });

  updateDecision(incidentDecisionTree[0].id);

  window.addEventListener("beforeunload", cleanupPlayback);
}

function renderBriefingLog() {
  const list = select("#briefing-list");
  if (!list) return;

  briefingTimeline.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = "briefing-item";
    item.innerHTML = `
      <button class="briefing-item__header" type="button" aria-expanded="${index === 0}" data-briefing="${entry.id}">
        <span class="briefing-item__time">${entry.time}</span>
        <div class="briefing-item__meta">
          <span class="briefing-item__title">${entry.title}</span>
          <span class="briefing-item__summary">${entry.summary}</span>
        </div>
        <span class="briefing-item__icon" aria-hidden="true"></span>
      </button>
      <div class="briefing-item__details" ${index === 0 ? "" : "hidden"}>
        <ul>
          ${entry.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
        </ul>
      </div>
    `;
    list.appendChild(item);
  });

  list.addEventListener("click", (event) => {
    const header = event.target.closest(".briefing-item__header");
    if (!header) return;
    const expanded = header.getAttribute("aria-expanded") === "true";
    header.setAttribute("aria-expanded", String(!expanded));
    const details = header.nextElementSibling;
    if (details) {
      if (expanded) {
        details.setAttribute("hidden", "");
      } else {
        details.removeAttribute("hidden");
      }
    }
  });
}

function renderSurfaceGrid() {
  const grid = select(".surface-grid");
  const details = select("#surface-details");

  surfaceNodes.forEach((node) => {
    const button = document.createElement("button");
    button.className = "surface-node";
    button.type = "button";
    button.dataset.risk = node.risk;
    button.dataset.nodeId = node.id;
    button.innerHTML = `<span>${node.label}</span>`;
    grid.appendChild(button);
  });

  function updateDetails(nodeId) {
    const node = surfaceNodes.find((item) => item.id === nodeId);
    if (!node) return;
    selectAll(".surface-node", grid).forEach((button) => {
      button.classList.toggle("surface-node--active", button.dataset.nodeId === nodeId);
    });
    details.innerHTML = `
      <h4>${node.label}</h4>
      <p><strong>Risk Level:</strong> ${node.risk.toUpperCase()}</p>
      <p><strong>Baseline:</strong> ${node.intel.baseline}</p>
      <p><strong>Action:</strong> ${node.intel.action}</p>
      <p><strong>Outcome:</strong> ${node.intel.outcome}</p>
    `;
  }

  grid.addEventListener("click", (event) => {
    const node = event.target.closest(".surface-node");
    if (!node) return;
    updateDetails(node.dataset.nodeId);
  });

  updateDetails(surfaceNodes[0].id);
}

function renderLoop() {
  const buttons = selectAll(".loop__segment");
  const details = select("#loop-details");

  function update(loopKey) {
    const intel = loopIntel[loopKey];
    if (!intel) return;
    buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.loop === loopKey));
    details.innerHTML = `
      <h4>${intel.title}</h4>
      <p>${intel.summary}</p>
      <ul>${intel.artifacts.map((artifact) => `<li>${artifact}</li>`).join("")}</ul>
    `;
  }

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      update(btn.dataset.loop);
    })
  );

  update("detect");
}

function renderHunts() {
  const queue = select("#hunt-queue");
  const terminal = select("#hunt-terminal");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let typewriterFrame;

  const runTypewriter = (element, text) => {
    if (!element) return;
    cancelAnimationFrame(typewriterFrame);
    const content = text.trim();
    element.textContent = "";
    element.classList.remove("typewriter--complete");

    if (!content) {
      element.classList.add("typewriter--complete");
      return;
    }

    if (motionQuery.matches) {
      element.textContent = content;
      element.classList.add("typewriter--complete");
      return;
    }

    let index = 0;
    const step = () => {
      element.textContent = content.slice(0, index);
      if (index < content.length) {
        index += 1;
        typewriterFrame = requestAnimationFrame(step);
      } else {
        element.classList.add("typewriter--complete");
      }
    };

    typewriterFrame = requestAnimationFrame(step);
  };

  const drawChart = (svg, series) => {
    if (!svg || !series || series.length === 0) {
      if (svg) svg.innerHTML = "";
      return;
    }
    const width = 120;
    const height = 60;
    const padding = 8;
    const values = series.map((point) => point.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = Math.max(max - min, 1);
    const step = series.length > 1 ? (width - padding * 2) / (series.length - 1) : width / 2;
    let path = "";
    series.forEach((point, index) => {
      const x = padding + index * step;
      const normalized = (point.value - min) / range;
      const y = height - padding - normalized * (height - padding * 2);
      path += `${index === 0 ? "M" : "L"} ${x} ${y} `;
    });
    const markers = series
      .map((point, index) => {
        const x = padding + index * step;
        const normalized = (point.value - min) / range;
        const y = height - padding - normalized * (height - padding * 2);
        return `<circle cx="${x}" cy="${y}" r="2" class="hunt-chart__marker" />`;
      })
      .join("");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.innerHTML = `
      <path d="${path.trim()}" class="hunt-chart__path" />
      ${markers}
    `;
  };

  const drawMatrix = (container, matrix) => {
    if (!container) return;
    if (!matrix || matrix.length === 0) {
      container.innerHTML = "<p>No relationships observed.</p>";
      return;
    }
    const maxWeight = Math.max(...matrix.map((entry) => entry.weight));
    container.innerHTML = matrix
      .map((entry) => {
        const width = Math.round((entry.weight / Math.max(maxWeight, 1)) * 100);
        return `
          <div class="hunt-matrix__row">
            <div class="hunt-matrix__label">
              <span>${entry.source}</span>
              <span>➝</span>
              <span>${entry.target}</span>
            </div>
            <div class="hunt-matrix__bar"><span style="width:${width}%"></span></div>
          </div>
        `;
      })
      .join("");
  };

  const drawHeatmap = (container, cells) => {
    if (!container) return;
    container.setAttribute("role", "list");
    if (!cells || cells.length === 0) {
      container.innerHTML = "<p class=\"hunt-heatmap__empty\">No concentration shifts detected.</p>";
      return;
    }
    const maxValue = Math.max(...cells.map((cell) => cell.value));
    container.innerHTML = cells
      .map((cell) => {
        const intensity = maxValue ? Math.round((cell.value / maxValue) * 100) : 0;
        return `
          <div class="hunt-heatmap__cell" role="listitem" style="--cell-intensity:${intensity}">
            <span class="hunt-heatmap__value">${cell.value}</span>
            <span class="hunt-heatmap__label">${cell.label}</span>
            <span class="hunt-heatmap__detail">${cell.detail}</span>
          </div>
        `;
      })
      .join("");
  };

  const renderPackets = (container, packets) => {
    if (!container) return;
    if (!packets || packets.length === 0) {
      container.innerHTML = "<p class=\"hunt-packets__empty\">No notable packets captured.</p>";
      return;
    }
    container.innerHTML = `
      <ul class="hunt-packets__list">
        ${packets
          .map(
            (packet) => `
              <li>
                <div class="hunt-packets__route">${packet.label}</div>
                <div class="hunt-packets__bytes">${packet.bytes}</div>
                <p>${packet.detail}</p>
              </li>
            `
          )
          .join("")}
      </ul>
    `;
  };

  hunts.forEach((hunt, index) => {
    const button = document.createElement("button");
    button.className = "hunt-btn";
    button.type = "button";
    button.dataset.huntId = hunt.id;
    button.setAttribute("role", "tab");
    button.textContent = hunt.name;
    if (index === 0) button.setAttribute("aria-selected", "true");
    queue.appendChild(button);
  });

  function update(huntId) {
    const hunt = hunts.find((item) => item.id === huntId);
    if (!hunt) return;
    selectAll(".hunt-btn", queue).forEach((btn) =>
      btn.setAttribute("aria-selected", btn.dataset.huntId === huntId ? "true" : "false")
    );
    terminal.innerHTML = `
      <div class="hunt-terminal__layout">
        <div class="hunt-terminal__query">
          <pre class="typewriter" aria-live="polite"></pre>
          <div class="hunt-telemetry" aria-hidden="false">
            <svg class="hunt-chart" data-hunt-chart></svg>
            <div class="hunt-matrix" data-hunt-matrix></div>
          </div>
          <div class="hunt-signals">
            <section>
              <h5>Signal Concentration</h5>
              <div class="hunt-heatmap" data-hunt-heatmap></div>
            </section>
            <section>
              <h5>Packet Synopsis</h5>
              <div class="hunt-packets" data-hunt-packets></div>
            </section>
          </div>
        </div>
        <section class="hunt-intel" aria-label="Context differentials">
          <div class="hunt-intel__toggle" role="tablist" aria-label="Toggle hunt context">
            <button class="chip chip--small chip--active" type="button" data-intel-toggle="baseline" role="tab" aria-selected="true">Baseline</button>
            <button class="chip chip--small" type="button" data-intel-toggle="anomaly" role="tab" aria-selected="false">Suspicious</button>
          </div>
          <div class="hunt-intel__panel" data-hunt-intel></div>
        </section>
      </div>
      <section class="hunt-notes">
        <h4>Operational Notes</h4>
        <ul data-hunt-notes>
          ${hunt.telemetry?.notes?.map((note) => `<li>${note}</li>`).join("") || ""}
        </ul>
      </section>
      <div class="analysis">
        <h4>Analysis</h4>
        <p>${hunt.analysis}</p>
      </div>
      <div class="analysis">
        <h4>Outcome</h4>
        <p>${hunt.outcome}</p>
        <div class="hunt-outcomes">
          ${Object.values(hunt.coverage)
            .map(
              (item) => `
                <button type="button" class="outcome-badge" data-scroll="${item.target}">
                  ${item.label}
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="analysis">
        <h4>MITRE ATT&CK Alignment</h4>
        <ul class="mitre-list">
          ${hunt.mitre.map((item) => `<li class="mitre-tag">${item}</li>`).join("")}
        </ul>
      </div>
    `;
    const queryElement = terminal.querySelector(".typewriter");
    runTypewriter(queryElement, hunt.query);

    const intelPanel = terminal.querySelector("[data-hunt-intel]");
    const toggles = selectAll("[data-intel-toggle]", terminal);
    const chart = terminal.querySelector("[data-hunt-chart]");
    const matrix = terminal.querySelector("[data-hunt-matrix]");
    const heatmap = terminal.querySelector("[data-hunt-heatmap]");
    const packetsPanel = terminal.querySelector("[data-hunt-packets]");

    const renderIntel = (view) => {
      const context = view === "baseline" ? hunt.baselines : hunt.anomalies;
      if (intelPanel) {
        intelPanel.innerHTML = `
          <ul>
            ${context.map((item) => `<li><strong>${item.label}:</strong> ${item.detail}</li>`).join("")}
          </ul>
        `;
      }
      toggles.forEach((toggle) => {
        const active = toggle.dataset.intelToggle === view;
        toggle.classList.toggle("chip--active", active);
        toggle.setAttribute("aria-selected", String(active));
      });
      const telemetry = hunt.telemetry?.[view];
      drawChart(chart, telemetry?.timeline);
      drawMatrix(matrix, telemetry?.matrix);
      drawHeatmap(heatmap, telemetry?.heatmap);
      renderPackets(packetsPanel, telemetry?.packets);
    };

    toggles.forEach((toggle) =>
      toggle.addEventListener("click", () => {
        renderIntel(toggle.dataset.intelToggle);
        audioManager?.playEffect("focus");
      })
    );

    selectAll(".outcome-badge", terminal).forEach((badge) => {
      badge.addEventListener("click", () => {
        const target = select(badge.dataset.scroll);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        audioManager?.playVoice("mission");
      });
    });

    renderIntel("baseline");
    audioManager?.playEffect("effects");
  }

  queue.addEventListener("click", (event) => {
    const button = event.target.closest(".hunt-btn");
    if (!button) return;
    update(button.dataset.huntId);
  });

  update(hunts[0].id);

  motionQuery.addEventListener("change", () => {
    const activeButton = queue.querySelector('[aria-selected="true"]');
    if (!activeButton) return;
    const activeHunt = hunts.find((item) => item.id === activeButton.dataset.huntId);
    if (!activeHunt) return;
    const queryElement = terminal.querySelector(".typewriter");
    runTypewriter(queryElement, activeHunt.query);
  });

  window.addEventListener("beforeunload", () => cancelAnimationFrame(typewriterFrame));
}

function renderEDRLab() {
  const slider = select("#edr-slider");
  const needle = select("#edr-needle");
  const stats = select("#edr-stats");

  function update(value) {
    const angle = -60 + (Number(value) / 100) * 120;
    needle.style.transform = `rotate(${angle}deg)`;
    const fp = Math.round(62 - (value / 100) * 34);
    const coverage = Math.round(68 + (value / 100) * 24);
    const focus = Math.round(12 + (value / 100) * 12);
    stats.innerHTML = `
      <p><strong>False Positives:</strong> 62 ➝ ${fp} per week</p>
      <p><strong>Detection Coverage:</strong> 68% ➝ ${coverage}%</p>
      <p><strong>Analyst Focus Time Gained:</strong> +${focus} hrs/week</p>
    `;
  }

  slider.addEventListener("input", (event) => update(event.target.value));
  update(slider.value);
}

function renderAutomation() {
  const track = select("#automation-track");
  const stats = select("#automation-stats");
  const toggles = selectAll("[data-automation]");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let animationFrame;
  const tickets = automationTickets.map((ticket, index) => {
    const div = document.createElement("div");
    div.className = "automation-ticket ticket-pulse";
    div.dataset.ticketId = ticket.id;
    div.style.top = `${10 + index * 30}%`;
    div.innerHTML = `
      <span>${ticket.title}</span>
      <span>${ticket.description}</span>
    `;
    track.appendChild(div);
    return div;
  });

  function animateTickets(time = 0) {
    tickets.forEach((ticket, index) => {
      const base = index * 0.0002;
      const offset = ((time * (0.02 + base)) % 1000) / 1000;
      ticket.style.transform = `translateY(${Math.sin(offset * Math.PI * 2) * 12}px)`;
    });
    animationFrame = requestAnimationFrame(animateTickets);
  }

  function startAutomationAnimation() {
    cancelAnimationFrame(animationFrame);
    if (motionQuery.matches) {
      tickets.forEach((ticket) => {
        ticket.style.transform = "translateY(0)";
      });
      return;
    }
    animationFrame = requestAnimationFrame(animateTickets);
  }

  startAutomationAnimation();

  function updateStats() {
    const activeModules = toggles.filter((toggle) => toggle.checked).map((toggle) => toggle.dataset.automation);
    const mttr = 4.5 - activeModules.length * 0.5;
    const hoursSaved = 60 + activeModules.length * 20;
    const nps = 8 + activeModules.length * 4;
    stats.innerHTML = `
      <p><strong>MTTR:</strong> 4.5h ➝ ${mttr.toFixed(1)}h</p>
      <p><strong>Analyst Hours Saved:</strong> ${hoursSaved} per quarter</p>
      <p><strong>Stakeholder Satisfaction:</strong> +${nps} NPS</p>
    `;
  }

  toggles.forEach((toggle) => toggle.addEventListener("change", updateStats));
  updateStats();

  motionQuery.addEventListener("change", startAutomationAnimation);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(animationFrame));
}

function renderSkills() {
  const carousel = select(".skills__carousel");
  skills.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";
    card.tabIndex = 0;
    if (skill.target) {
      card.dataset.scroll = skill.target;
    }
    card.innerHTML = `
      <div class="skill-card__badge">${skill.signal}</div>
      <h3 class="skill-card__title">${skill.name}</h3>
      <p>${skill.description}</p>
      <div class="skill-card__heatmap">
        ${Array.from({ length: 5 })
          .map((_, index) => `<div class="heatmap-bar"><span style="opacity:${index < skill.strength ? 1 : 0.2}"></span></div>`)
          .join("")}
      </div>
      <div class="skill-card__links">
        ${skill.artifacts.map((artifact) => `<span>• ${artifact}</span>`).join("")}
      </div>
    `;
    if (skill.target) {
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        const destination = select(skill.target);
        destination?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    carousel.appendChild(card);
  });
}

function renderImpact() {
  const grid = select("#impact-grid");
  const chips = selectAll("[data-impact-filter]");

  function update(filter) {
    grid.innerHTML = "";
    impactSignals
      .filter((signal) => filter === "all" || signal.tags.includes(filter))
      .forEach((signal) => {
        const card = document.createElement("article");
        card.className = "impact-card";
        card.innerHTML = `
          <div class="impact-card__value">${signal.value}</div>
          <div>
            <h3>${signal.title}</h3>
            <p>${signal.description}</p>
          </div>
          <span class="impact-card__context">${signal.context}</span>
        `;
        grid.appendChild(card);
      });
  }

  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      chips.forEach((btn) => btn.classList.toggle("chip--active", btn === chip));
      chips.forEach((btn) => btn.setAttribute("aria-selected", btn === chip ? "true" : "false"));
      update(chip.dataset.impactFilter);
    })
  );

  update("all");
}

function renderBattleCard() {
  if (!battleCardBody || !battleCardOverlay) return;
  const { header, summary, engagements, hunts: huntIntel, callToAction } = battleCardIntel;

  if (battleCardTitle) battleCardTitle.textContent = header.title;
  if (battleCardSubtitle) battleCardSubtitle.textContent = header.subtitle;
  if (battleCardMeta) {
    battleCardMeta.innerHTML = header.meta
      .map((item) => `
        <div class="battle-card__meta-item">
          <dt>${item.label}</dt>
          <dd>${item.value}</dd>
        </div>
      `)
      .join("");
  }

  const summaryHtml = summary
    .map(
      (item) => `
        <li>
          <h4>${item.label}</h4>
          <p>${item.detail}</p>
        </li>
      `
    )
    .join("");

  const engagementHtml = engagements
    .map((engagement) => `
      <article class="battle-card__engagement">
        <header>
          <h4>${engagement.organization}</h4>
          <p class="battle-card__engagement-meta">${engagement.timeframe} • ${engagement.objective}</p>
        </header>
        <div class="battle-card__columns">
          <div>
            <h5>Operational Moves</h5>
            <ul>${engagement.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>
          </div>
          <div>
            <h5>Documented Impact</h5>
            <ul>${engagement.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}</ul>
          </div>
        </div>
      </article>
    `)
    .join("");

  const huntsHtml = huntIntel
    .map(
      (hunt) => `
        <li>
          <h5>${hunt.title}</h5>
          <p class="battle-card__insight">${hunt.insight}</p>
          <p class="battle-card__impact">${hunt.impact}</p>
        </li>
      `
    )
    .join("");

  const sections = `
    <section class="battle-card__section">
      <h3>Mission Snapshot</h3>
      <ul class="battle-card__list">${summaryHtml}</ul>
    </section>
    <section class="battle-card__section">
      <h3>Engagement Theaters</h3>
      ${engagementHtml}
    </section>
    <section class="battle-card__section">
      <h3>Threat Hunt Arsenal</h3>
      <ul class="battle-card__list battle-card__list--grid">${huntsHtml}</ul>
    </section>
    <section class="battle-card__section battle-card__section--cta">
      <h3>${callToAction.headline}</h3>
      <p>${callToAction.detail}</p>
    </section>
  `;

  battleCardBody.innerHTML = sections;
}

function openBattleCard() {
  if (!battleCardOverlay || !battleCardPanel) return;
  renderBattleCard();
  battleCardPreviouslyFocused = document.activeElement;
  battleCardOverlay.hidden = false;
  battleCardOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("body--no-scroll");
  battleCardPanel.setAttribute("tabindex", "-1");
  battleCardPanel.focus({ preventScroll: true });
}

function closeBattleCard() {
  if (!battleCardOverlay) return;
  battleCardOverlay.hidden = true;
  battleCardOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("body--no-scroll");
  battleCardPanel?.removeAttribute("tabindex");
  if (battleCardPreviouslyFocused && typeof battleCardPreviouslyFocused.focus === "function") {
    battleCardPreviouslyFocused.focus();
  }
}

function downloadBattleCard() {
  const documentTitle = battleCardIntel.header.title;
  const markup = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${documentTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          :root {
            color-scheme: dark;
            font-family: 'Space Grotesk', 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: #05080f;
            color: #e6f9ff;
          }
          body { margin: 0; padding: 2.5rem; background: radial-gradient(circle at top left, #0f1b38, #05080f 60%); }
          h1, h2, h3, h4, h5 { margin: 0 0 0.75rem 0; }
          h1 { font-size: 2rem; letter-spacing: 0.08em; text-transform: uppercase; }
          section { margin-bottom: 2rem; border: 1px solid rgba(120, 255, 255, 0.22); border-radius: 18px; padding: 1.5rem; background: rgba(8, 16, 32, 0.78); box-shadow: 0 18px 40px rgba(5, 12, 24, 0.45); }
          dl { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem; margin: 0; }
          dt { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: #7fffee; }
          dd { margin: 0; font-weight: 500; }
          ul { padding-left: 1.15rem; margin: 0.5rem 0 0 0; }
          li { margin-bottom: 0.5rem; line-height: 1.5; }
          .grid { display: grid; gap: 1.25rem; }
          .grid--two { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
          .section-title { font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.14em; color: #7fffee; }
          .eyebrow { text-transform: uppercase; letter-spacing: 0.2em; color: #56d6ff; font-size: 0.75rem; margin-bottom: 0.5rem; }
          .headline { margin-bottom: 2rem; }
          .engagement { border-top: 1px solid rgba(127, 255, 238, 0.16); padding-top: 1.25rem; margin-top: 1.25rem; }
        </style>
      </head>
      <body>
        <header class="headline">
          <p class="eyebrow">Rapid deployment brief</p>
          <h1>${documentTitle}</h1>
          <p>${battleCardIntel.header.subtitle}</p>
          <dl>
            ${battleCardIntel.header.meta
              .map((item) => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`)
              .join("")}
          </dl>
        </header>
        <section>
          <h2 class="section-title">Mission Snapshot</h2>
          <div class="grid grid--two">
            ${battleCardIntel.summary
              .map(
                (item) => `
                  <div>
                    <h3>${item.label}</h3>
                    <p>${item.detail}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>
        <section>
          <h2 class="section-title">Engagement Theaters</h2>
          ${battleCardIntel.engagements
            .map(
              (engagement) => `
                <article class="engagement">
                  <h3>${engagement.organization}</h3>
                  <p><strong>${engagement.timeframe}</strong> — ${engagement.objective}</p>
                  <h4>Operational Moves</h4>
                  <ul>${engagement.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>
                  <h4>Documented Impact</h4>
                  <ul>${engagement.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}</ul>
                </article>
              `
            )
            .join("")}
        </section>
        <section>
          <h2 class="section-title">Threat Hunt Arsenal</h2>
          <div class="grid grid--two">
            ${battleCardIntel.hunts
              .map(
                (hunt) => `
                  <div>
                    <h3>${hunt.title}</h3>
                    <p><em>${hunt.insight}</em></p>
                    <p>${hunt.impact}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>
        <section>
          <h2 class="section-title">Next Actions</h2>
          <p>${battleCardIntel.callToAction.detail}</p>
        </section>
      </body>
    </html>`;

  const blob = new Blob([markup], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sterling-battle-card.html";
  document.body.appendChild(anchor);
  anchor.click();
  requestAnimationFrame(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  });
}

function initBattleCard() {
  if (!battleCardOverlay) return;
  battleCardOverlay.hidden = true;
  battleCardOverlay.setAttribute("aria-hidden", "true");

  battleCardDismissButtons.forEach((button) =>
    button.addEventListener("click", () => {
      closeBattleCard();
    })
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !battleCardOverlay.hidden) {
      closeBattleCard();
    }
  });

  battleCardOverlay.addEventListener("click", (event) => {
    if (event.target === battleCardOverlay) {
      closeBattleCard();
    }
  });

  if (battleCardPanel) {
    battleCardPanel.addEventListener("keydown", (event) => {
      if (event.key !== "Tab" || battleCardOverlay.hidden) return;
      const focusableElements = selectAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        battleCardPanel
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusableElements.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  if (battleCardDownload) {
    battleCardDownload.addEventListener("click", () => {
      downloadBattleCard();
    });
  }
}

function initTimeline() {
  if (!timelineList) return;
  const sections = timelineSegments.map((segment) => {
    const li = document.createElement("li");
    li.className = "timeline__item";
    li.dataset.target = segment.id;
    li.innerHTML = `
      <button type="button" data-scroll="#${segment.id}">
        <span class="timeline__label">${segment.title}</span>
      </button>
    `;
    timelineList.appendChild(li);
    const button = li.querySelector("button");
    return { segment, element: li, button };
  });

  if (timelineIntel && timelineSegments.length) {
    timelineIntel.textContent = timelineSegments[0].description;
  }

  sections[0]?.button?.setAttribute("aria-current", "step");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = sections.find((section) => section.segment.id === entry.target.id);
        if (!item) return;
        item.element.classList.toggle("timeline__item--active", entry.isIntersecting);
        if (entry.isIntersecting) {
          timelineIntel.textContent = item.segment.description;
          item.element.classList.add("timeline__item--visited");
          item.button?.setAttribute("aria-current", "step");
        } else {
          item.button?.removeAttribute("aria-current");
        }
      });

      const allVisited = sections.every((section) => section.element.classList.contains("timeline__item--visited"));
      if (allVisited) {
        timelineIntel.textContent =
          "All dossiers explored. Bonus intel unlocked: run 'battle_card' in the deploy console to open Sterling's battle brief, then 'download_battle_card' to export it.";
        timelineIntel.classList.add("timeline__intel--unlocked");
      }
    },
    { threshold: 0.6 }
  );

  sections.forEach(({ segment }) => {
    const target = select(`#${segment.id}`);
    if (target) observer.observe(target);
  });
}

function initCursor() {
  if (!cursorEl) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const render = () => {
    if (reduceMotion) {
      cursorEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    } else {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      cursorEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
    raf = requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (reduceMotion) {
      cursorEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    }
  });

  window.addEventListener("pointerdown", () => cursorEl.classList.add("mission-cursor--active"));
  window.addEventListener("pointerup", () => cursorEl.classList.remove("mission-cursor--active"));

  raf = requestAnimationFrame(render);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
}

function initDeployConsole() {
  function printResponse(lines) {
    lines.forEach((line) => {
      const row = document.createElement("div");
      row.className = "deploy-line";
      row.innerHTML = `<span class="prompt">➜</span><span class="response">${line}</span>`;
      deployOutput.appendChild(row);
    });
    deployOutput.scrollTo({ top: deployOutput.scrollHeight, behavior: "smooth" });
  }

  function executeCommand(raw) {
    const [command] = raw.split(" ");
    const key = command.toLowerCase();
    const entry = deployCommands[key];
    if (entry) {
      printResponse(entry.response);
      if (key === "battle_card") {
        openBattleCard();
      }
      if (key === "download_battle_card") {
        renderBattleCard();
        downloadBattleCard();
      }
    } else {
      printResponse([`Command '${command}' not recognized. Type 'help' for options.`]);
    }
  }

  deploySubmit.addEventListener("click", () => {
    const value = deployInput.value.trim();
    if (!value) return;
    printResponse([`Executing: ${value}`]);
    executeCommand(value.split(" ")[0]);
    deployInput.value = "";
  });

  deployInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      deploySubmit.click();
    }
  });

  printResponse([
    "Mission console ready. Type 'help' to explore deployment options.",
    "Telemetry link established."
  ]);
}

function initTelemetry() {
  const metrics = {
    years: { base: 6, variance: 0.2 },
    missions: { base: 12, variance: 0.5 },
    hours: { base: 480, variance: 2 },
  };
  const values = Object.entries(metrics).reduce((acc, [key, data]) => {
    const el = select(`[data-metric="${key}"]`);
    acc[key] = { el, ...data };
    return acc;
  }, {});

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let intervalId;

  function tick() {
    Object.values(values).forEach(({ el, base, variance }) => {
      if (!el) return;
      const delta = (Math.random() - 0.5) * variance;
      const current = Number(el.textContent);
      const next = Math.max(base - variance, Math.min(base + variance, current + delta));
      el.textContent = next.toFixed(1).replace(/\.0$/, "");
    });
  }

  function resetTelemetry() {
    Object.values(values).forEach(({ el, base }) => {
      if (!el) return;
      el.textContent = String(base);
    });
  }

  const start = () => {
    clearInterval(intervalId);
    if (motionQuery.matches) {
      resetTelemetry();
      return;
    }
    intervalId = window.setInterval(tick, 4200);
  };

  start();
  motionQuery.addEventListener("change", start);
}

function initAudio() {
  audioManager = createAudioManager({
    onStateChange: (channel, enabled) => {
      audioButtons
        .filter((button) => button.dataset.audioChannel === channel)
        .forEach((button) => {
          button.setAttribute("aria-pressed", String(enabled));
          button.classList.toggle("hud__audio--active", enabled);
        });
    },
  });

  const currentState = audioManager.currentState();
  audioButtons.forEach((button) => {
    const channel = button.dataset.audioChannel;
    const enabled = currentState[channel];
    button.setAttribute("aria-pressed", String(enabled));
    if (enabled) {
      button.classList.add("hud__audio--active");
    }
    button.addEventListener("click", () => {
      audioManager.toggleChannel(channel);
    });
  });
}

function initFooter() {
  const year = new Date().getFullYear();
  select("#footer-year").textContent = year;
}

function initApp() {
  initStarfield(heroCanvas);
  renderMissionControl();
  initSmoothScroll();
  animateCounters();
  renderIncidentMap();
  renderBriefingLog();
  renderSurfaceGrid();
  renderLoop();
  renderHunts();
  renderEDRLab();
  renderAutomation();
  renderSkills();
  renderImpact();
  initTimeline();
  initBattleCard();
  initDeployConsole();
  initTelemetry();
  initAudio();
  initFooter();
  initCursor();
}

document.addEventListener("DOMContentLoaded", initApp);
