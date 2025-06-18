// main.js — працює прямо з CDN, без імпортів

window.addEventListener('DOMContentLoaded', async () => {
  // Перевіримо доступність об'єкта FACE у MINDAR
  if (!window.MINDAR || !window.MINDAR.FACE) {
    alert("MindAR FACE модуль не завантажився!");
    return;
  }
  // 1. Контейнер для рендеру (div у index.html)
  const container = document.querySelector("#container");

  // 2. Запускаємо MindAR для FACE
  const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: container,
  });

  const {renderer, scene, camera} = mindarThree;

  // 3. Завантажуємо текстуру маски (наприклад, luchador)
  const loader = new THREE.TextureLoader();
  loader.load("mask_uv.png", (maskTexture) => {
    // 4. FaceMesh + текстура
    const faceMesh = mindarThree.addFaceMesh();
    faceMesh.material.map = maskTexture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    // 5. Старт
    mindarThree.start().then(() => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    });
  }, undefined, (err) => {
    alert("Не вдалося завантажити маску!");
  });
});
