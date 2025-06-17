import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.18.0/dist/tf.min.js';

// Аналіз часу виконання bubble sort vs quick sort
function benchmark(algo, inputSize) {
  const arr = Array.from({length: inputSize}, () => Math.random());
  const start = performance.now();
  algo(arr);
  return performance.now() - start;
}

const results = {
  bubble: benchmark(bubble_sort, 100),
  quick: benchmark(quick_sort, 100),  // Додайте інші алгоритми
};

// Візуалізація результатів у AR (наприклад, стовпчаста діаграма)