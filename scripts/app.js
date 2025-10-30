import {
  missionDossiers,
  timelineSegments,
  incidentDecisionTree,
  incidentAlerts,
  briefingTimeline,
  surfaceNodes,
  loopIntel,
  hunts,
  skills,
  impactSignals,
  automationTickets,
  deployCommands,
} from "./data.js";

const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const heroCanvas = select("#hero-canvas");
const audioToggle = select("#audio-toggle");
const deployOutput = select("#deploy-output");
const deployInput = select("#deploy-command");
const deploySubmit = select("#deploy-submit");
const missionOrbit = select("#mission-orbit");
const missionPanel = select("#mission-panel");
const missionMetrics = select("#mission-metrics");
const missionList = select("#mission-list");
const timelineList = select("#timeline-list");
const timelineIntel = select("#timeline-intel");
const cursorEl = select("#cursor");

const ambientAudio = (() => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const gain = ctx.createGain();
  gain.gain.value = 0.15;
  gain.connect(ctx.destination);

  const oscillators = [110, 220, 440].map((freq, index) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const depth = ctx.createGain();
    depth.gain.value = 20 * (index + 1);
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.02 * (index + 1);
    lfo.connect(depth);
    depth.connect(osc.frequency);
    osc.connect(gain);
    osc.start();
    lfo.start();
    return { osc, lfo };
  });

  ctx.suspend();

  return {
    start: () => ctx.resume(),
    stop: () => ctx.suspend(),
  };
})();

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
  if (!missionOrbit || !missionPanel || !missionMetrics || !missionList) return;

  const panelTitle = missionPanel.querySelector("h3");
  const panelDescription = missionPanel.querySelector("p");
  const panelStatus = missionPanel.querySelector("[data-panel-status]");
  const defaultHint = panelStatus?.textContent.trim() ||
    "Focus the orbit and press space to toggle wireframe schematics. Use arrow keys to adjust rotation speed.";
  const wireframeHint =
    "Wireframe schematics engaged. Press space to restore the full mission overlay.";
  const dragHint = "Manual spin engaged. Drag to reorient the dossiers.";
  let wireframeEnabled = false;
  let hintTimeout;

  const restoreHint = () => {
    if (!panelStatus) return;
    panelStatus.textContent = wireframeEnabled ? wireframeHint : defaultHint;
  };

  const pulseHint = (message, persist = false) => {
    if (!panelStatus) return;
    panelStatus.textContent = message;
    clearTimeout(hintTimeout);
    if (!persist) {
      hintTimeout = window.setTimeout(restoreHint, 1600);
    }
  };

  restoreHint();

  const updatePanel = (dossier) => {
    panelTitle.textContent = dossier.label;
    panelDescription.textContent = dossier.summary;
    missionMetrics.innerHTML = dossier.metrics
      .map((metric) => `<div class="mission-control__metric">${metric}</div>`)
      .join("");
  };

  const nodes = [];

  missionDossiers.forEach((dossier, index) => {
    const node = document.createElement("button");
    node.className = "orbital-node";
    node.type = "button";
    node.dataset.scroll = dossier.target;
    node.dataset.index = String(index);
    node.setAttribute("aria-label", `${dossier.label} dossier`);
    node.style.setProperty("--orbit-radius", `${dossier.orbit.radius}%`);
    node.style.setProperty("--orbit-angle", `${dossier.orbit.angle}deg`);
    node.innerHTML = `
      <span class="orbital-node__label">${dossier.label}</span>
      <span class="orbital-node__subtitle">${dossier.subtitle}</span>
    `;
    missionOrbit.appendChild(node);
    nodes.push(node);

    node.addEventListener("mouseenter", () => updatePanel(dossier));
    node.addEventListener("focus", () => updatePanel(dossier));

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
    missionList.appendChild(listCard);

    listCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const target = select(dossier.target);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let dragging = false;
  let lastX = 0;
  let spin = 0;
  let velocity = reduceMotion ? 0 : 0.05;

  missionOrbit.addEventListener("pointerdown", (event) => {
    missionOrbit.classList.add("mission-control__orbital--engaged");
    dragging = true;
    lastX = event.clientX;
    missionOrbit.setPointerCapture?.(event.pointerId);
    pulseHint(dragHint, true);
  });

  missionOrbit.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientX - lastX;
    lastX = event.clientX;
    velocity = delta * 0.15;
  });

  window.addEventListener("pointerup", (event) => {
    if (dragging && missionOrbit.hasPointerCapture?.(event.pointerId)) {
      missionOrbit.releasePointerCapture(event.pointerId);
    }
    dragging = false;
    missionOrbit.classList.remove("mission-control__orbital--engaged");
    restoreHint();
  });

  missionOrbit.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      wireframeEnabled = !wireframeEnabled;
      missionOrbit.classList.toggle("mission-control__orbital--wireframe", wireframeEnabled);
      restoreHint();
      return;
    }

    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
      event.preventDefault();
      const delta = event.code === "ArrowRight" ? 0.6 : -0.6;
      velocity = Math.max(-6, Math.min(6, velocity + delta));
      pulseHint(`Orbit velocity recalibrated (${velocity.toFixed(1)}x).`);
      return;
    }

    if (event.code === "ArrowUp") {
      event.preventDefault();
      velocity = Math.max(-6, Math.min(6, velocity * 1.1 + 0.2));
      pulseHint(`Orbit boost engaged (${velocity.toFixed(1)}x).`);
      return;
    }

    if (event.code === "ArrowDown") {
      event.preventDefault();
      velocity *= 0.6;
      pulseHint(`Orbit damping engaged (${velocity.toFixed(1)}x).`);
    }
  });

  missionOrbit.addEventListener("focus", restoreHint);
  missionOrbit.addEventListener("blur", restoreHint);

  function orbit() {
    spin += velocity;
    velocity *= dragging ? 0.8 : 0.94;
    if (!dragging && !reduceMotion) {
      velocity += 0.02;
    }
    nodes.forEach((node) => node.style.setProperty("--orbit-spin", `${spin}deg`));
    requestAnimationFrame(orbit);
  }

  orbit();

  updatePanel(missionDossiers[0]);

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
  const alertContainer = select(".incident-map__alerts");
  incidentAlerts.forEach((alert) => {
    const node = document.createElement("div");
    node.className = "alert-node";
    node.style.left = `${alert.x}%`;
    node.style.top = `${alert.y}%`;
    node.style.animationDelay = `${alert.delay}ms`;
    alertContainer.appendChild(node);
  });

  const decisionContainer = select("#incident-decisions");
  const panel = select("#incident-panel");

  incidentDecisionTree.forEach((decision, index) => {
    const btn = document.createElement("button");
    btn.className = "decision-btn";
    btn.type = "button";
    btn.dataset.decision = decision.id;
    btn.textContent = decision.label;
    if (index === 0) btn.classList.add("active");
    decisionContainer.appendChild(btn);
  });

  const decisionButtons = () => selectAll(".decision-btn", decisionContainer);

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
  }

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
    selectAll(".hunt-btn", queue).forEach((btn) => btn.setAttribute("aria-selected", btn.dataset.huntId === huntId ? "true" : "false"));
    terminal.innerHTML = `
      <pre class="typewriter" aria-live="polite"></pre>
      <section class="hunt-intel" aria-label="Context differentials">
        <div class="hunt-intel__toggle" role="tablist" aria-label="Toggle hunt context">
          <button class="chip chip--small chip--active" type="button" data-intel-toggle="baseline" role="tab" aria-selected="true">Baseline</button>
          <button class="chip chip--small" type="button" data-intel-toggle="anomaly" role="tab" aria-selected="false">Suspicious</button>
        </div>
        <div class="hunt-intel__panel" data-hunt-intel></div>
      </section>
      <div class="analysis">
        <h4>Analysis</h4>
        <p>${hunt.analysis}</p>
      </div>
      <div class="analysis">
        <h4>Outcome</h4>
        <p>${hunt.outcome}</p>
        <ul>
          <li>${hunt.coverage.detections}</li>
          <li>${hunt.coverage.firewall}</li>
          <li>${hunt.coverage.visibility}</li>
        </ul>
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

    const panel = terminal.querySelector("[data-hunt-intel]");
    const toggles = selectAll("[data-intel-toggle]", terminal);
    if (!panel) return;

    function renderIntel(view) {
      const data = view === "baseline" ? hunt.baselines : hunt.anomalies;
      if (!panel) return;
      panel.innerHTML = `
        <ul>
          ${data.map((item) => `<li><strong>${item.label}:</strong> ${item.detail}</li>`).join("")}
        </ul>
      `;
      toggles.forEach((toggle) => {
        const active = toggle.dataset.intelToggle === view;
        toggle.classList.toggle("chip--active", active);
        toggle.setAttribute("aria-selected", String(active));
      });
    }

    toggles.forEach((toggle) =>
      toggle.addEventListener("click", () => {
        renderIntel(toggle.dataset.intelToggle);
      })
    );

    renderIntel("baseline");
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
          "All dossiers explored. Bonus intel unlocked: run 'battle_card' in the deploy console to pull Sterling's battle brief.";
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
  let enabled = false;
  audioToggle.addEventListener("click", () => {
    enabled = !enabled;
    audioToggle.setAttribute("aria-pressed", String(enabled));
    if (enabled) {
      ambientAudio.start();
    } else {
      ambientAudio.stop();
    }
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
  initDeployConsole();
  initTelemetry();
  initAudio();
  initFooter();
  initCursor();
}

document.addEventListener("DOMContentLoaded", initApp);
