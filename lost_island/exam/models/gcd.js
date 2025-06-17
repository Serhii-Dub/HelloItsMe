export function visualizeGCD(scene, a = 48, b = 18) {
  const steps = [];
  while (b !== 0) {
    steps.push(`gcd(${a}, ${b}) → gcd(${b}, ${a % b})`);
    [a, b] = [b, a % b];
  }
  
  // Відображення кроків
  steps.forEach((step, i) => {
    const textGeometry = new THREE.TextGeometry(step, { size: 0.1, height: 0.01 });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(0, -i*0.3, 0);
    scene.add(textMesh);
  });
}