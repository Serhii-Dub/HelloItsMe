// main.js
document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    // 1. MindAR для обличчя
    const mindarThree = new window.MINDAR.FACE.MindARThree({
      container: document.body,
    });
    const {renderer, scene, camera} = mindarThree;

    // 2. Face Mesh + власна текстура (маска)
    const textureLoader = new window.THREE.TextureLoader();
    // Використай свою текстуру, створену на UV-шаблоні
    const maskTexture = await textureLoader.loadAsync("mask_uv.png");
    const faceMesh = mindarThree.addFaceMesh();
    faceMesh.material.map = maskTexture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    // 3. Запускаємо!
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});
