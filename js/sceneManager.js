import * as THREE from "three";

export class SceneManager {
  constructor(container = document.body) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xc0c0c0);

    this.initCamera();
    this.initRenderer();
    this.initLights();
    this.initResize();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    light.position.set(0, 20, 0);
    this.scene.add(light);
  }

  initResize() {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  update(targetX, targetY) {
    this.camera.position.x += (targetX - this.camera.position.x) * 0.05;
    this.camera.position.y += (targetY - this.camera.position.y) * 0.05;

    this.camera.lookAt(0, -0.5, 0);
    this.renderer.render(this.scene, this.camera);
  }
}
