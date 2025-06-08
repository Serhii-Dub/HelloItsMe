document.addEventListener('DOMContentLoaded', () => {
    const mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: './targets.mind',
    });
    
    const { renderer, scene, camera } = mindarThree;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
    
    // Textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/earth-atmos.jpg');
    const moonTexture = textureLoader.load('https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/moon.jpg');
    
    // Earth
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ 
        map: earthTexture,
        bumpScale: 0.05,
        specular: new THREE.Color('grey')
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    
    // Moon
    const moonGeometry = new THREE.SphereGeometry(0.14, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(1.5, 0, 0);
    
    // Group
    const group = new THREE.Group();
    group.add(earth);
    group.add(moon);
    group.scale.set(0.5, 0.5, 0.5);
    
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(group);
    
    // Animation
    const earthRotationSpeed = (2 * Math.PI) / (24 * 60 * 60 * 17000); // 1 day in scaled time
    const moonOrbitSpeed = (2 * Math.PI) / (28 * 24 * 60 * 60 * 17000); // 28 days in scaled time
    
    const start = async () => {
        await mindarThree.start();
        document.querySelector('.arjs-loader').style.display = 'none';
        
        renderer.setAnimationLoop(() => {
            // Earth rotation
            earth.rotation.y += earthRotationSpeed;
            
            // Moon orbit and rotation
            moon.position.x = 1.5 * Math.cos(moonOrbitSpeed * Date.now());
            moon.position.z = 1.5 * Math.sin(moonOrbitSpeed * Date.now());
            moon.rotation.y += earthRotationSpeed * 28; // Moon rotation
            
            renderer.render(scene, camera);
        });
    };
    
    start();
});
