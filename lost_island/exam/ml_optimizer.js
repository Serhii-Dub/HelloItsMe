window.lastMlAnalysis = "";

function timeIt(fn, ...args) {
  const t0 = performance.now();
  const result = fn(...args);
  const t1 = performance.now();
  return { result, ms: (t1 - t0) };
}

// Bubble sort
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  return arr;
}

// Fibonacci (recursion)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Factorial (recursion)
function factorial(n) {
  if (n == 0) return 1;
  return n * factorial(n - 1);
}

// Linear search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;
  return -1;
}
// Binary search (for comparison)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// GCD (Euclid algorithm)
function gcd(a, b) {
  let count = 0;
  while (b !== 0) {
    [a, b] = [b, a % b];
    count++;
  }
  return { gcd: a, steps: count };
}

window.analyzeAlgorithm = function(name, cb) {
  let result = "";
  if (name === "bubble_sort") {
    const len = Math.floor(Math.random() * 1000) + 100;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 10000));
    const { ms } = timeIt(bubbleSort, [...arr]);
    result = `Bubble Sort<br>
      Масив із <b>${len}</b> випадкових чисел.<br>
      Час сортування: <b>${ms.toFixed(2)} мс</b>.<br>
      Для великих масивів час зростає дуже швидко! Спробуй QuickSort або MergeSort.<br>
      <i>Дані та результат — реальні та рандомізовані.</i>`;
  }
  else if (name === "fibonacci") {
    const n = Math.floor(Math.random() * 8) + 23; // 23..30
    const { ms, result: val } = timeIt(fibonacci, n);
    result = `Fibonacci<br>
      n = <b>${n}</b> (випадково).<br>
      ${n}-те число Фібоначчі = <b>${val}</b>.<br>
      Час обчислення: <b>${ms.toFixed(2)} мс</b>.<br>
      <b>Рекомендація:</b> Для великих n краще мемоізація/ітер. підхід.<br>
      <i>Обчислено реально на ваших даних.</i>`;
  }
  else if (name === "factorial") {
    const n = Math.floor(Math.random() * 500) + 1000;
    const { ms, result: val } = timeIt(factorial, n);
    result = `Factorial<br>
      n = <b>${n}</b> (випадково).<br>
      Значення n! дуже велике (див. у коді).<br>
      Час обчислення: <b>${ms.toFixed(2)} мс</b>.<br>
      <b>Рекомендація:</b> Для великих n ітеративний підхід безпечніше.<br>
      <i>Реальні дані, реальний час.</i>`;
  }
  else if (name === "linear_search") {
    const len = Math.floor(Math.random() * 20000) + 30000;
    const arr = Array.from({ length: len }, (_, i) => i);
    const target = Math.floor(Math.random() * len);
    const { ms: linTime } = timeIt(linearSearch, arr, target);
    const { ms: binTime } = timeIt(binarySearch, arr, target);
    result = `Linear Search<br>
      Масив із <b>${len}</b> елементів, target = <b>${target}</b> (випадково).<br>
      Linear: <b>${linTime.toFixed(2)} мс</b>. Binary: <b>${binTime.toFixed(2)} мс</b>.<br>
      Бінарний пошук швидше у ${(linTime / binTime).toFixed(1)} раз(и).<br>
      <b>Рекомендація:</b> Для відсортованих масивів — binary search!<br>
      <i>Тест проведено на випадкових даних.</i>`;
  }
  else if (name === "evklid_algoritm") {
    const a = Math.floor(Math.random() * 1e9) + 1e8;
    const b = Math.floor(Math.random() * 1e9) + 1e8;
    const t0 = performance.now();
    const { gcd: val, steps } = gcd(a, b);
    const t1 = performance.now();
    result = `GCD (Евклід)<br>
      a = <b>${a}</b>, b = <b>${b}</b> (обидва випадкові).<br>
      НСД: <b>${val}</b>, кроків: ${steps}, час: <b>${(t1-t0).toFixed(2)} мс</b>.<br>
      <b>Рекомендація:</b> Евклід — один з найефективніших алгоритмів для НСД.<br>
      <i>Усе зроблено на реальних даних.</i>`;
  }
  else {
    result = "Алгоритм не розпізнано.";
  }

  setTimeout(() => {
    window.lastMlAnalysis = result;
    cb && cb();
  }, 350);
};
