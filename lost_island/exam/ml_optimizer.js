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
    const arr = Array.from({ length: 800 }, () => Math.floor(Math.random() * 5000));
    const { ms } = timeIt(bubbleSort, [...arr]);
    result = `Bubble Sort (800 елементів): <b>${ms.toFixed(2)} мс</b>.<br>
      Для великих масивів час зростає дуже швидко! Спробуй QuickSort або MergeSort — вони в 20-50 разів швидші.<br>
      <i>Справжнє профілювання виконання у браузері.</i>`;
  }
  else if (name === "fibonacci") {
    // Обираємо n=32, щоб не "зависнути"
    const n = 32;
    const { ms, result: val } = timeIt(fibonacci, n);
    result = `Рекурсивний Fibonacci (${n}): <b>${ms.toFixed(2)} мс</b>, значення: ${val}.<br>
      Глибина рекурсії: ${n}. Реальний час зростає експоненційно!<br>
      <b>Рекомендація:</b> Використовуй мемоізацію або ітеративний підхід для великих n.<br>
      <i>Результат отримано реально у вашому браузері!</i>`;
  }
  else if (name === "factorial") {
    const n = 5000;
    const { ms, result: val } = timeIt(factorial, n);
    result = `Рекурсивний Factorial (${n}): <b>${ms.toFixed(2)} мс</b>.<br>
      Для дуже великих n рекурсія може "завалити" стек.<br>
      <b>Рекомендація:</b> Ітеративний підхід безпечніше.<br>
      <i>Час обчислений у реальному часі.</i>`;
  }
  else if (name === "linear_search") {
    const arr = Array.from({ length: 50000 }, (_, i) => i);
    const target = 49999;
    const { ms: linTime } = timeIt(linearSearch, arr, target);
    // Для демонстрації — порівняємо із binary search
    const { ms: binTime } = timeIt(binarySearch, arr, target);
    result = `Linear Search (50 000 елементів): <b>${linTime.toFixed(2)} мс</b>.<br>
      Binary Search: <b>${binTime.toFixed(2)} мс</b>.<br>
      Binary швидше в ${(linTime / binTime).toFixed(1)} раз(и).<br>
      <b>Рекомендація:</b> Для великих, відсортованих масивів — лише бінарний пошук.<br>
      <i>Тест пройдено прямо у вашому браузері.</i>`;
  }
  else if (name === "evklid_algoritm") {
    const a = 1234567890, b = 987654321;
    const t0 = performance.now();
    const { gcd: val, steps } = gcd(a, b);
    const t1 = performance.now();
    result = `GCD (Евклід) для ${a} та ${b}:<br>
      Результат: <b>${val}</b>, кроків: ${steps}, <b>${(t1-t0).toFixed(2)} мс</b>.<br>
      <b>Рекомендація:</b> Евклід — один з найефективніших алгоритмів для НСД.<br>
      <i>Реально виконано у вашому браузері.</i>`;
  }
  else {
    result = "Алгоритм не розпізнано. Справжній аналіз не виконано.";
  }

  setTimeout(() => {
    window.lastMlAnalysis = result;
    cb && cb();
  }, 350); // трохи паузи для вигляду "обчислення"
};
