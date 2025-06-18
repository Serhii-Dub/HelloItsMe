window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector("#container");

  const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: container,
  });

  const {renderer, scene, camera} = mindarThree;

  // Створення Face Mesh з ТВОЄЮ текстурою
  const loader = new THREE.TextureLoader();
  loader.load("mask_uv.png", (maskTexture) => {
    const faceMesh = mindarThree.addFaceMesh();
    faceMesh.material.map = maskTexture;
    faceMesh.material.transparent = true;
    faceMesh.material.opacity = 0.95; // можна змінити
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
