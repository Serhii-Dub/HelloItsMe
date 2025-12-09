window.lastMlAnalysis = "";

// Функція для вимірювання часу виконання
function timeIt(fn, ...args) {
  const t0 = performance.now();
  const result = fn(...args);
  const t1 = performance.now();
  return { result, ms: (t1 - t0) };
}

// Реалізації алгоритмів
function bubbleSort(arr) {
  let n = arr.length;
  let swaps = 0;
  let comparisons = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
      }
    }
  }
  return { sorted: arr, swaps, comparisons };
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
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return { index: i, checks: i + 1 };
  }
  return { index: -1, checks: arr.length };
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

// Генерація унікальних даних для кожного сканування
function generateUniqueData(algoName, seed) {
  const uniqueSeed = (Date.now() + seed) % 10000;
  
  switch(algoName) {
    case "bubble_sort":
      const arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
      }
      return arr;
      
    case "fibonacci":
      return Math.floor(Math.random() * 15) + 5;
      
    case "factorial":
      return Math.floor(Math.random() * 10) + 1;
      
    case "linear_search":
      const searchArr = [];
      for (let i = 0; i < 15; i++) {
        searchArr.push(Math.floor(Math.random() * 100) + 1);
      }
      return {
        arr: searchArr,
        target: searchArr[Math.floor(Math.random() * searchArr.length)]
      };
      
    case "evklid_algoritm":
      return {
        a: Math.floor(Math.random() * 500) + 100,
        b: Math.floor(Math.random() * 300) + 50
      };
      
    default:
      return null;
  }
}

// Головна функція аналізу
window.analyzeAlgorithm = function(name, cb) {
  const uniqueId = Date.now() % 10000;
  let result = "";
  
  // Генеруємо унікальні дані для цього сканування
  const data = generateUniqueData(name, uniqueId);
  
  if (name === "bubble_sort") {
    const arr = data;
    const before = arr.join(', ');
    const { sorted, ms } = timeIt(bubbleSort, [...arr]);
    const after = sorted.sorted.join(', ');
    
    result = `<div class="ml-analysis" style="border-left: 4px solid #EF2D5E; padding-left: 15px;">
      <h3 style="color: #EF2D5E; margin-top: 0;">🔬 ML-аналіз: Bubble Sort</h3>
      <div class="analysis-id" style="background: rgba(239, 45, 94, 0.1); padding: 5px 10px; border-radius: 5px; margin-bottom: 10px;">
        <b>Сканування #${uniqueId}</b> | Унікальні дані
      </div>
      <p><b>📊 Вхідні дані (випадкові):</b><br>
      Масив: <code>[${before}]</code></p>
      <p><b>✅ Результат сортування:</b><br>
      Відсортовано: <code>[${after}]</code></p>
      <p><b>⏱️ Продуктивність:</b><br>
      • Час виконання: <b style="color: #ffd966">${ms.toFixed(2)} мс</b><br>
      • Кількість обмінів: <b>${sorted.swaps}</b><br>
      • Кількість порівнянь: <b>${sorted.comparisons}</b></p>
      <p><b>📈 Складність алгоритму:</b><br>
      • Найгірший випадок: O(n²)<br>
      • Найкращий випадок: O(n)<br>
      • Середній випадок: O(n²)</p>
      <div class="viz-notice" style="background: linear-gradient(135deg, rgba(239, 45, 94, 0.2), rgba(239, 45, 94, 0.1)); padding: 10px; border-radius: 8px; margin-top: 15px;">
        <b>🎮 3D-візуалізація активована!</b><br>
        Натисніть "Запустити анімацію" для інтерактивної демонстрації
      </div>
    </div>`;
  }
  else if (name === "fibonacci") {
    const n = data;
    const { ms, result: val } = timeIt(fibonacci, n);
    const calls = Math.pow(2, n) - 1; // Приблизна кількість рекурсивних викликів
    
    result = `<div class="ml-analysis" style="border-left: 4px solid #4CC3D9; padding-left: 15px;">
      <h3 style="color: #4CC3D9; margin-top: 0;">🔬 ML-аналіз: Fibonacci Sequence</h3>
      <div class="analysis-id" style="background: rgba(76, 195, 217, 0.1); padding: 5px 10px; border-radius: 5px; margin-bottom: 10px;">
        <b>Сканування #${uniqueId}</b> | Унікальне n
      </div>
      <p><b>📊 Вхідні дані:</b><br>
      Обчислюємо F(${n}) - ${n}-те число Фібоначчі</p>
      <p><b>✅ Результат:</b><br>
      F(${n}) = <b style="color: #4CC3D9">${val}</b></p>
      <p><b>⏱️ Продуктивність:</b><br>
      • Час обчислення: <b style="color: #ffd966">${ms.toFixed(2)} мс</b><br>
      • Рекурсивних викликів: ~<b>${calls}</b></p>
      <p><b>📈 Складність алгоритму:</b><br>
      • Часова: O(2ⁿ) - експоненційна<br>
      • Просторова: O(n) - глибина рекурсії<br>
      • Можна оптимізувати до O(n) з динамічним програмуванням</p>
      <div class="viz-notice" style="background: linear-gradient(135deg, rgba(76, 195, 217, 0.2), rgba(76, 195, 217, 0.1)); padding: 10px; border-radius: 8px; margin-top: 15px;">
        <b>🌀 3D-візуалізація послідовності!</b><br>
        Побачте рекурсивну структуру чисел Фібоначчі
      </div>
    </div>`;
  }
  else if (name === "factorial") {
    const n = data;
    const { ms, result: val } = timeIt(factorial, n);
    
    result = `<div class="ml-analysis" style="border-left: 4px solid #FFC65D; padding-left: 15px;">
      <h3 style="color: #FFC65D; margin-top: 0;">🔬 ML-аналіз: Factorial</h3>
      <div class="analysis-id" style="background: rgba(255, 198, 93, 0.1); padding: 5px 10px; border-radius: 5px; margin-bottom: 10px;">
        <b>Сканування #${uniqueId}</b> | Унікальне n
      </div>
      <p><b>📊 Вхідні дані:</b><br>
      Обчислюємо ${n}! = ${n} × ${n-1} × ... × 1</p>
      <p><b>✅ Результат:</b><br>
      ${n}! = <b style="color: #FFC65D">${val}</b></p>
      <p><b>⏱️ Продуктивність:</b><br>
      • Час обчислення: <b style="color: #ffd966">${ms.toFixed(2)} мс</b><br>
      • Рекурсивних викликів: <b>${n}</b></p>
      <p><b>📈 Складність алгоритму:</b><br>
      • Часова: O(n) - лінійна<br>
      • Просторова: O(n) - глибина рекурсії<br>
      • Можна обчислити ітеративно для великих n</p>
      <div class="viz-notice" style="background: linear-gradient(135deg, rgba(255, 198, 93, 0.2), rgba(255, 198, 93, 0.1)); padding: 10px; border-radius: 8px; margin-top: 15px;">
        <b>📊 3D-візуалізація факторіалів!</b><br>
        Спостерігайте логарифмічне зростання значень
      </div>
    </div>`;
  }
  else if (name === "linear_search") {
    const { arr, target } = data;
    const before = arr.join(', ');
    const { ms: linTime, result: idx } = timeIt(linearSearch, arr, target);
    
    result = `<div class="ml-analysis" style="border-left: 4px solid #7BC8A4; padding-left: 15px;">
      <h3 style="color: #7BC8A4; margin-top: 0;">🔬 ML-аналіз: Linear Search</h3>
      <div class="analysis-id" style="background: rgba(123, 200, 164, 0.1); padding: 5px 10px; border-radius: 5px; margin-bottom: 10px;">
        <b>Сканування #${uniqueId}</b> | Унікальні дані
      </div>
      <p><b>📊 Вхідні дані:</b><br>
      Масив (15 ел.): <code>[${before}]</code><br>
      Шукаємо: <b style="color: #7BC8A4">${target}</b></p>
      <p><b>✅ Результат пошуку:</b><br>
      ${idx.index >= 0 
        ? `Знайдено на позиції <b style="color: #32CD32">${idx.index + 1}</b> (індекс ${idx.index})`
        : `<b style="color: #FF6347">Не знайдено</b> (-1)`}</p>
      <p><b>⏱️ Продуктивність:</b><br>
      • Час пошуку: <b style="color: #ffd966">${linTime.toFixed(2)} мс</b><br>
      • Перевірок: <b>${idx.checks}</b> з 15<br>
      • Ефективність: <b>${((idx.checks/15)*100).toFixed(1)}%</b> масиву перевірено</p>
      <p><b>📈 Складність алгоритму:</b><br>
      • Найгірший випадок: O(n)<br>
      • Найкращий випадок: O(1)<br>
      • Середній випадок: O(n/2)</p>
      <div class="viz-notice" style="background: linear-gradient(135deg, rgba(123, 200, 164, 0.2), rgba(123, 200, 164, 0.1)); padding: 10px; border-radius: 8px; margin-top: 15px;">
        <b>🔍 3D-візуалізація пошуку!</b><br>
        Спостерігайте процес лінійного пошуку в реальному часі
      </div>
    </div>`;
  }
  else if (name === "evklid_algoritm") {
    const { a, b } = data;
    const t0 = performance.now();
    const { gcd: res, steps, totalSteps } = gcd(a, b);
    const t1 = performance.now();
    
    result = `<div class="ml-analysis" style="border-left: 4px solid #A9A9F5; padding-left: 15px;">
      <h3 style="color: #A9A9F5; margin-top: 0;">🔬 ML-аналіз: Euclidean Algorithm</h3>
      <div class="analysis-id" style="background: rgba(169, 169, 245, 0.1); padding: 5px 10px; border-radius: 5px; margin-bottom: 10px;">
        <b>Сканування #${uniqueId}</b> | Унікальні числа
      </div>
      <p><b>📊 Вхідні дані:</b><br>
      Знаходимо НСД для чисел:<br>
      • a = <b style="color: #A9A9F5">${a}</b><br>
      • b = <b style="color: #A9A9F5">${b}</b></p>
      <p><b>✅ Результат:</b><br>
      НСД(${a}, ${b}) = <b style="color: #A9A9F5">${res}</b></p>
      <p><b>⏱️ Продуктивність:</b><br>
      • Час обчислення: <b style="color: #ffd966">${(t1-t0).toFixed(2)} мс</b><br>
      • Кількість кроків: <b>${totalSteps}</b></p>
      <p><b>📈 Кроки алгоритму:</b><br>
      <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; font-family: monospace; font-size: 0.9em;">
        ${steps.map(step => `<div>${step}</div>`).join('')}
      </div></p>
      <p><b>📈 Складність алгоритму:</b><br>
      • Часова: O(log(min(a, b)))<br>
      • Один з найефективніших алгоритмів<br>
      • Використовує операцію залишку від ділення</p>
      <div class="viz-notice" style="background: linear-gradient(135deg, rgba(169, 169, 245, 0.2), rgba(169, 169, 245, 0.1)); padding: 10px; border-radius: 8px; margin-top: 15px;">
        <b>📐 3D-візуалізація алгоритму!</b><br>
        Спостерігайте кроки алгоритму Евкліда в 3D
      </div>
    </div>`;
  }
  else {
    result = `<div style="color: #ff6347; text-align: center; padding: 20px;">
      <b>⚠️ Алгоритм не розпізнано</b><br>
      Спробуйте інший маркер
    </div>`;
  }

  setTimeout(() => {
    window.lastMlAnalysis = result;
    cb && cb();
  }, 400);
};