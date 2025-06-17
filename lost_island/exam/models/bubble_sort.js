export function visualizeBubbleSort(scene) {
  const arr = [5, 3, 8, 4, 2];
  const cubes = [];
  
  // Створення кубів
  for (let i = 0; i < arr.length; i++) {
    const geometry = new THREE.BoxGeometry(0.5, arr[i]/10, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(i - arr.length/2, 0, 0);
    scene.add(cube);
    cubes.push(cube);
  }

  // Анімація сортування (використовуйте GSAP для плавності)
  let i = 0, j = 0;
  const interval = setInterval(() => {
    if (i < arr.length) {
      if (j < arr.length - i - 1) {
        if (arr[j] > arr[j+1]) {
          // Підсвітка обміну
          cubes[j].material.color.set(0xff0000);
          cubes[j+1].material.color.set(0xff0000);
          // Анімація
          gsap.to(cubes[j].position, { x: cubes[j+1].position.x, duration: 0.5 });
          gsap.to(cubes[j+1].position, { x: cubes[j].position.x, duration: 0.5 });
          // Оновлення масиву
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
          [cubes[j], cubes[j+1]] = [cubes[j+1], cubes[j]];
        }
        j++;
      } else {
        i++;
        j = 0;
      }
    } else {
      clearInterval(interval);
    }
  }, 1000);
}