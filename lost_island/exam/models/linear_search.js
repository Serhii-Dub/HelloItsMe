export function visualizeLinearSearch(scene) {
  const arr = [10, 20, 30, 40, 50];
  const target = 30;
  const boxes = [];
  
  // Створення елементів масиву
  for (let i = 0; i < arr.length; i++) {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.MeshBasicMaterial({ color: arr[i] === target ? 0xff0000 : 0x00ff00 })
    );
    box.position.set(i - arr.length/2, 0, 0);
    scene.add(box);
    boxes.push(box);
  }
}