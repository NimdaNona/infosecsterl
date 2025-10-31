import * as THREE from "https://cdn.skypack.dev/three@0.160.0";
import { clamp, easeInOutCubic, projectToScreen } from "./utils.js";

export class MissionOrbit {
  constructor({
    canvas,
    overlay,
    dossiers,
    reducedMotion = false,
    onHover,
    onSelect,
    onWireframeChange,
  }) {
    this.canvas = canvas;
    this.overlay = overlay;
    this.dossiers = dossiers;
    this.reducedMotion = reducedMotion;
    this.onHover = onHover;
    this.onSelect = onSelect;
    this.onWireframeChange = onWireframeChange;

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 400);
    this.camera.position.set(0, 0, 130);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.spin = 0;
    this.velocity = reducedMotion ? 0 : 0.25;
    this.dragging = false;
    this.hovered = null;
    this.wireframe = false;
    this.labels = new Map();
    this.nodes = [];

    this.initScene();
    this.bindEvents();
    this.resize();
    this.renderer.setAnimationLoop(this.animate.bind(this));
  }

  initScene() {
    const ambient = new THREE.AmbientLight(0x6677aa, 1.1);
    this.scene.add(ambient);

    const keyLight = new THREE.PointLight(0x66f9ff, 1.4, 260);
    keyLight.position.set(70, 40, 120);
    this.scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x222244, 1.2, 240);
    rimLight.position.set(-90, -20, -120);
    this.scene.add(rimLight);

    const coreGeometry = new THREE.SphereGeometry(26, 48, 48);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x0a1426,
      emissive: 0x112244,
      shininess: 40,
      transparent: true,
      opacity: 0.92,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    this.scene.add(core);

    const haloGeometry = new THREE.RingGeometry(32, 36, 64);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x44c0ff,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2;
    this.scene.add(halo);

    this.dossiers.forEach((dossier, index) => {
      const geometry = new THREE.SphereGeometry(6, 40, 40);
      const material = new THREE.MeshStandardMaterial({
        color: index % 2 === 0 ? 0x6ffff3 : 0xff7acb,
        emissive: index % 2 === 0 ? 0x164655 : 0x54163e,
        metalness: 0.4,
        roughness: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const radius = 60 + dossier.orbit.radius;
      const angle = THREE.MathUtils.degToRad(dossier.orbit.angle);
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * (radius * 0.7),
        index % 2 === 0 ? 8 : -6
      );
      mesh.userData = { dossier };
      this.group.add(mesh);
      this.nodes.push(mesh);

      if (this.overlay) {
        const label = document.createElement("button");
        label.className = "orbit-label";
        label.type = "button";
        label.dataset.id = dossier.id;
        label.innerHTML = `
          <span class="orbit-label__name">${dossier.label}</span>
          <span class="orbit-label__subtitle">${dossier.subtitle}</span>
        `;
        label.addEventListener("click", () => {
          this.onSelect?.(dossier);
        });
        label.addEventListener("mouseenter", () => {
          this.setHovered(mesh);
          this.onHover?.(dossier);
        });
        this.overlay.appendChild(label);
        this.labels.set(mesh, label);
      }
    });
  }

  bindEvents() {
    this.onPointerMove = this.handlePointerMove.bind(this);
    this.onPointerDown = this.handlePointerDown.bind(this);
    this.onPointerUp = this.handlePointerUp.bind(this);
    this.onResize = this.resize.bind(this);

    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("resize", this.onResize);
  }

  handlePointerMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    if (this.dragging) {
      const delta = event.movementX || 0;
      this.velocity = clamp(this.velocity + delta * 0.01, -1.6, 1.6);
      return;
    }

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const [intersection] = this.raycaster.intersectObjects(this.nodes);
    if (intersection) {
      const { dossier } = intersection.object.userData;
      this.setHovered(intersection.object);
      this.onHover?.(dossier);
    } else {
      this.setHovered(null);
    }
  }

  handlePointerDown(event) {
    this.dragging = true;
    this.canvas.setPointerCapture?.(event.pointerId);
  }

  handlePointerUp(event) {
    if (this.canvas.hasPointerCapture?.(event.pointerId)) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
    if (this.dragging) {
      this.dragging = false;
      if (this.hovered) {
        this.onSelect?.(this.hovered.userData.dossier);
      }
    }
  }

  setHovered(node) {
    if (this.hovered === node) return;
    if (this.hovered) {
      this.hovered.scale.set(1, 1, 1);
      const label = this.labels.get(this.hovered);
      if (label) {
        label.classList.remove("orbit-label--active");
      }
    }
    this.hovered = node;
    if (this.hovered) {
      this.hovered.scale.set(1.1, 1.1, 1.1);
      const label = this.labels.get(this.hovered);
      if (label) {
        label.classList.add("orbit-label--active");
      }
    }
  }

  resize() {
    const width = this.canvas.clientWidth || this.canvas.offsetWidth || 400;
    const height = this.canvas.clientHeight || this.canvas.offsetHeight || 400;
    const ratio = width / height;
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  animate() {
    const delta = this.clock.getDelta();
    if (!this.dragging && !this.reducedMotion) {
      this.velocity = THREE.MathUtils.damp(this.velocity, 0.22, 3.4, delta);
    }
    this.spin += this.velocity;
    this.group.rotation.y = THREE.MathUtils.degToRad(this.spin);

    this.renderer.render(this.scene, this.camera);
    this.updateLabels();
  }

  updateLabels() {
    if (!this.overlay) return;
    const { width, height } = this.renderer.getSize(new THREE.Vector2());
    this.labels.forEach((label, mesh) => {
      const position = projectToScreen(mesh.position.clone(), this.camera, width, height);
      label.style.transform = `translate(${position.x - label.offsetWidth / 2}px, ${position.y - label.offsetHeight / 2}px)`;
      label.style.opacity = easeInOutCubic(clamp(1 - mesh.position.distanceTo(this.camera.position) / 220, 0.2, 1));
    });
  }

  toggleWireframe() {
    this.wireframe = !this.wireframe;
    this.nodes.forEach((node) => {
      if (node.material) {
        node.material.wireframe = this.wireframe;
      }
    });
    this.onWireframeChange?.(this.wireframe);
  }

  adjustVelocity(delta) {
    this.velocity = clamp(this.velocity + delta, -3, 3);
  }

  boostVelocity(multiplier) {
    this.velocity = clamp(this.velocity * multiplier, -4, 4);
  }

  focusDossier(id) {
    const node = this.nodes.find((mesh) => mesh.userData.dossier.id === id);
    if (!node) return;
    this.setHovered(node);
    this.onHover?.(node.userData.dossier);
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("resize", this.onResize);
    this.nodes.forEach((node) => {
      node.geometry.dispose();
      if (node.material?.dispose) {
        node.material.dispose();
      }
    });
    this.nodes.length = 0;
    this.labels.clear();
  }
}
