import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.1/dist/mindar-image-three.prod.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { visualizeBubbleSort } from './models/bubble_sort.js';
import { visualizeFibonacci } from './models/fibonacci.js';
import { visualizeFactorial } from './models/factorial.js';
import { visualizeLinearSearch } from './models/linear_search.js';
import { visualizeGCD } from './models/gcd.js';

document.addEventListener('DOMContentLoaded', async () => {
  const mindarThree = new MindARThree({
    container: document.getElementById("container"),
    imageTargetSrc: "./targets.mind",
  });
  const { renderer, scene, camera } = mindarThree;

  // Додавання маркерів
  const markers = [
    { index: 0, name: "bubble_sort", onFound: () => visualizeBubbleSort(scene) },
    { index: 1, name: "fibonacci", onFound: () => visualizeFibonacci(scene) },
    { index: 2, name: "factorial", onFound: () => visualizeFactorial(scene) },
    { index: 3, name: "linear_search", onFound: () => visualizeLinearSearch(scene) },
    { index: 4, name: "gcd", onFound: () => visualizeGCD(scene) },
  ];

  markers.forEach(marker => {
    const anchor = mindarThree.addAnchor(marker.index);
    anchor.onTargetFound = marker.onFound;
  });

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});