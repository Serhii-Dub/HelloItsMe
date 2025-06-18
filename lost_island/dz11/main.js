window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector("#container");

  // MindAR FACE (перевірена версія!)
  const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: container,
  });

  const {renderer, scene, camera} = mindarThree;

  // Завантаження текстури маски
  const loader = new THREE.TextureLoader();
  loader.load("mask_uv.png", (maskTexture) => {
    const faceMesh = mindarThree.addFaceMesh();
    faceMesh.material.map = maskTexture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    mindarThree.start().then(() => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    });
  }, undefined, (err) => {
    alert("Не вдалося завантажити маску!");
  });
});
