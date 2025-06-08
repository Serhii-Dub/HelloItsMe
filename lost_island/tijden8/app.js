// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 30, 30);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/earth-atmos.jpg');
const moonTexture = textureLoader.load('https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/moon.jpg');

// Earth
const earthGeometry = new THREE.SphereGeometry(6.4, 64, 64);
const earthMaterial = new THREE.MeshPhongMaterial({ 
    map: earthTexture,
    bumpScale: 0.05,
    specular: new THREE.Color('grey')
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.castShadow = true;
earth.receiveShadow = true;
scene.add(earth);

// Moon
const moonGeometry = new THREE.SphereGeometry(1.74, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.castShadow = true;
moon.receiveShadow = true;
moon.position.set(20, 0, 0);
scene.add(moon);

// Animation
const earthRotationSpeed = (2 * Math.PI) / (24 * 60 * 60 * 17000); // 1 day in scaled time
const moonOrbitSpeed = (2 * Math.PI) / (28 * 24 * 60 * 60 * 17000); // 28 days in scaled time

function animate() {
    requestAnimationFrame(animate);
    
    // Earth rotation
    earth.rotation.y += earthRotationSpeed;
    
    // Moon orbit and rotation
    moon.position.x = 20 * Math.cos(moonOrbitSpeed * Date.now());
    moon.position.z = 20 * Math.sin(moonOrbitSpeed * Date.now());
    moon.rotation.y += earthRotationSpeed * 28; // Moon rotation
    
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
