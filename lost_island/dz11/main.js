window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector("#container");

  const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: container,
  });

  const {renderer, scene, camera} = mindarThree;

  // Освітлюємо фон сцени (тут світло-сірий, можна зробити білим: 0xffffff)
  scene.background = new THREE.Color(0xf4e7cd);

  // Створення Face Mesh з кольоровою маскою (наприклад, зеленою)
  const faceMesh = mindarThree.addFaceMesh();
  faceMesh.material = new THREE.MeshBasicMaterial({
    color: 0x1aab20,   // будь-який колір, наприклад, зелений
    transparent: true,
    opacity: 0.85
  });
  scene.add(faceMesh);

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
