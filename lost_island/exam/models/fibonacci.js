export function visualizeFibonacci(scene, n = 5) {
  const root = new THREE.Group();
  scene.add(root);

  const buildTree = (n, x, y, depth) => {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.1),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    node.position.set(x, y, 0);
    root.add(node);

    if (n <= 1) return;
    
    const leftX = x - 1/depth;
    const rightX = x + 1/depth;
    const newY = y - 0.5;

    buildTree(n-1, leftX, newY, depth+1);
    buildTree(n-2, rightX, newY, depth+1);

    // Лінії між вузлами
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const leftLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, 0),
        new THREE.Vector3(leftX, newY, 0)
      ]),
      lineMaterial
    );
    root.add(leftLine);
  };

  buildTree(n, 0, 0, 1);
}