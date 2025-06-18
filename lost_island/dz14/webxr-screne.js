import * as THREE from 'three';
import { ARButton } from 'ARButton';

let scene, camera, renderer;
let earth, moon, moonOrbit;
let reticle, controller;
let modelPlaced = false;

// --- Параметри для обертання ---
const TIME_SCALE = 1/17000;      // 1:17 000 (1 сек = 4.72 години)
const EARTH_ROT_PERIOD = 1000;   // Земля: 1 доба = 1000 мс (анімовано швидше)
const MOON_ORBIT_PERIOD = 28000; // Місяць: 28 діб = 28000 мс

init();
animate();

function init() {
  // Сцена
  scene = new THREE.Scene();

  // Камера
  camera = new THREE.PerspectiveCamera();

  // Освітлення: джерело на відстані 30 000 км (в масштабі)
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(30, 20, 0); // 30 метрів (умовно 30 000 км)
  scene.add(sun);

  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);

  // Рендерер
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // ARButton
  document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

  // Reticle (кільце для вказання площини)
  reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.1, 0.13, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x5fff5f, side: THREE.DoubleSide })
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  // Контролер (для tap)
  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let hitTestSource = null;
let hitTestSourceRequested = false;

function animate() {
  renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
  // --- HIT TEST LOGIC ---
  if (frame) {
    const referenceSpace = renderer.xr.getReferenceSpace();
    const session = renderer.xr.getSession();

    if (!hitTestSourceRequested) {
      session.requestReferenceSpace('viewer').then((refSpace) => {
        session.requestHitTestSource({ space: refSpace }).then((source) => {
          hitTestSource = source;
        });
      });
      session.addEventListener('end', () => {
        hitTestSourceRequested = false;
        hitTestSource = null;
      });
      hitTestSourceRequested = true;
    }

    if (hitTestSource) {
      const hitTestResults = frame.getHitTestResults(hitTestSource);
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        reticle.visible = true;
        reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
      } else {
        reticle.visible = false;
      }
    }
  }

  // --- Анімація ---
  if (earth && moonOrbit) {
    // Обертання Землі
    earth.rotation.y += (2 * Math.PI) / EARTH_ROT_PERIOD * renderer.xr.isPresenting ? renderer.xr.getFrame().deltaTime : 16;

    // Обертання Місяця навколо Землі
    const t = performance.now() * TIME_SCALE;
    moonOrbit.rotation.y = (t / MOON_ORBIT_PERIOD) * 2 * Math.PI;
  }

  renderer.render(scene, camera);
}

// --- Tap на екран — розміщення моделі ---
function onSelect() {
  if (modelPlaced || !reticle.visible) return;

  // --- Створюємо групу Земля-Місяць ---
  const solarGroup = new THREE.Group();

  // --- Земля ---
  const earthGeometry = new THREE.SphereGeometry(0.064, 48, 32); // 6.4 см = 6400 км, segments-height = 32, segments-width = 48
  const earthTexture = new THREE.TextureLoader().load('./textures/earth.jpg');
  const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earth.castShadow = true;
  earth.receiveShadow = true;
  solarGroup.add(earth);

  // --- Місяць ---
  // Відстань Місяця = 0.179 м (17.9 см) від центру Землі
  moonOrbit = new THREE.Group();
  moonOrbit.position.set(0, 0, 0);

  const moonGeometry = new THREE.SphereGeometry(0.0174, 32, 24); // 1.74 см = 1740 км
  const moonTexture = new THREE.TextureLoader().load('./textures/moon.jpg');
  const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);

  // Місяць на відстані від Землі
  moon.position.set(0.179, 0, 0);
  moon.castShadow = true;
  moonOrbit.add(moon);
  solarGroup.add(moonOrbit);

  // Розміщення всієї сцени за reticle
  solarGroup.position.setFromMatrixPosition(reticle.matrix);
  solarGroup.quaternion.setFromRotationMatrix(reticle.matrix);
  scene.add(solarGroup);

  modelPlaced = true;
}
