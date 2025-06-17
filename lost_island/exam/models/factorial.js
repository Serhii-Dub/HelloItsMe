export function visualizeFactorial(scene, n = 5) {
  const stack = [];
  const yStart = 2;
  
  for (let i = 0; i <= n; i++) {
    const text = `factorial(${i}) = ${i === 0 ? 1 : i + '!'}`;
    const textGeometry = new THREE.TextGeometry(text, { size: 0.1, height: 0.01 });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(0, yStart - i*0.3, 0);
    scene.add(textMesh);
    stack.push(textMesh);
  }
}