window.lastMlAnalysis = "";

function timeIt(fn, ...args) {
  const t0 = performance.now();
  const result = fn(...args);
  const t1 = performance.now();
  return { result, ms: (t1 - t0) };
}

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n - i - 1; j++)
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  return arr;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function factorial(n) {
  if (n == 0) return 1;
  return n * factorial(n - 1);
}

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;
  return -1;
}

function gcd(a, b) {
  let steps = [];
  let origA = a, origB = b;
  let count = 0;
  while (b !== 0) {
    steps.push(`Крок ${count+1}: a = ${a}, b = ${b} ⇒ a, b = b, a % b = ${b}, ${a % b}`);
    [a, b] = [b, a % b];
    count++;
  }
  return { gcd: a, steps, origA, origB, totalSteps: count };
}

window.analyzeAlgorithm = function(name, cb) {
  let result = "";
  if (name === "bubble_sort") {
    const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    const before = arr.join(', ');
    const { result: sorted, ms } = timeIt(bubbleSort, [...arr]);
    const after = sorted.join(', ');
    result = `Bubble Sort (бульбашкове сортування)<br>
      Масив із 10 випадкових чисел: <b>[${before}]</b><br>
      Після сортування: <b>[${after}]</b><br>
      Час сортування: <b>${ms.toFixed(2)} мс</b>.<br>
      <b>Пояснення:</b> "Бульбашка" порівнює сусідні елементи та поступово "спливає" найбільше число в кінець.<br>
      <i>Дані та результат — реальні та рандомізовані.</i>`;
  }
  else if (name === "fibonacci") {
    const n = Math.floor(Math.random() * 8) + 8; // 8–15
    const { ms, result: val } = timeIt(fibonacci, n);
    result = `Fibonacci<br>
      n = <b>${n}</b> (випадково).<br>
      ${n}-те число Фібоначчі = <b>${val}</b>.<br>
      Час обчислення: <b>${ms.toFixed(2)} мс</b>.<br>
      <b>Пояснення:</b> Числа Фібоначчі — це послідовність, у якій кожен елемент дорівнює сумі двох попередніх.<br>
      <i>Результат для випадкового n.</i>`;
  }
  else if (name === "factorial") {
    const n = Math.floor(Math.random() * 6) + 4; // 4–9
    const { ms, result: val } = timeIt(factorial, n);
    result = `Factorial<br>
      Обчислюємо <b>${n}!</b> (тобто ${n} × ${n-1} × ... × 1).<br>
      Результат: <b>${val}</b>.<br>
      Час обчислення: <b>${ms.toFixed(2)} мс</b>.<br>
      <b>Пояснення:</b> Факторіал — добуток всіх натуральних чисел від 1 до n.<br>
      <i>n вибрано випадково у межах 4–9.</i>`;
  }
  else if (name === "linear_search") {
    const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 40));
    const before = arr.join(', ');
    const target = arr[Math.floor(Math.random() * arr.length)];
    const { ms: linTime, result: idx } = timeIt(linearSearch, arr, target);
    let visualArr = arr.map((x,i) =>
      (x === target && i === idx)
        ? `<b style="color:#7cf870;">${x}</b>`
        : x
    ).join(', ');
    result = `Linear Search (лінійний пошук)<br>
      Масив: [${visualArr}]<br>
      Шуканий елемент: <b>${target}</b> (випадково обраний із масиву)<br>
      <b>Результат:</b> Знайдено на позиції ${idx+1} (рахуючи з 1), за <b>${linTime.toFixed(2)} мс</b>.<br>
      <b>Пояснення:</b> Лінійний пошук перебирає масив по черзі, поки не знайде потрібний елемент.<br>
      <i>Всі числа та target — випадкові.</i>`;
  }
  else if (name === "evklid_algoritm") {
    const a = Math.floor(Math.random() * 800) + 200;
    const b = Math.floor(Math.random() * 800) + 100;
    const t0 = performance.now();
    const { gcd: res, steps, origA, origB, totalSteps } = gcd(a, b);
    const t1 = performance.now();
    result = `GCD (алгоритм Евкліда)<br>
      <b>Знаходження найбільшого спільного дільника (НСД)</b> для чисел <b>${origA}</b> та <b>${origB}</b>.<br>
      <b>Пояснення:</b> НСД — це найбільше число, на яке діляться обидва заданих числа.<br>
      <b>Алгоритм Евкліда:</b> поки b ≠ 0, a та b замінюються на b і a % b.<br>
      Кроки:<br>
      <pre style="font-size:0.95em;">${steps.join('\n')}</pre>
      Всього кроків: <b>${totalSteps}</b>.<br>
      НСД: <b>${res}</b>.<br>
      Час: <b>${(t1-t0).toFixed(2)} мс</b>.<br>
      <i>Всі числа — випадкові.</i>`;
  }
  else {
    result = "Алгоритм не розпізнано.";
  }

  setTimeout(() => {
    window.lastMlAnalysis = result;
    cb && cb();
  }, 350);
};
