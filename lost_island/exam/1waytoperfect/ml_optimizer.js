window.lastMlAnalysis = "";

const AR_ANIM_DURATION = 600;
window.arVisualState = window.arVisualState || {};

// Простий sleep для async/await
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Скасування анімацій, коли таргет втрачається
window.cancelArVisualization = function(arIdx) {
  const st = window.arVisualState[arIdx];
  if (st) st.cancelled = true;
};

// Створюємо / оновлюємо стан для конкретного маркера
function createState(arIdx) {
  const container = document.getElementById(`algo-content-${arIdx}`);
  if (!container) return null;

  container.innerHTML = "";
  const state = {
    cancelled: false,
    container,
    items: [],
    spacing: 0.35,
    baseHeight: 0.08,
    maxExtraHeight: 0.6,
    maxVal: 1
  };
  window.arVisualState[arIdx] = state;
  return state;
}

// Будуємо стовпчики для масиву значень (для більшості алгоритмів)
function buildBars(arIdx, values, color = "#39f") {
  const state = createState(arIdx);
  if (!state || !values || !values.length) return null;

  const maxVal = Math.max(...values.map(v => Math.abs(v))) || 1;
  state.maxVal = maxVal;

  const offset = ((values.length - 1) * state.spacing) / 2;
  const items = [];

  values.forEach((val, i) => {
    const h = state.baseHeight + (Math.abs(val) / maxVal) * state.maxExtraHeight;
    const x = i * state.spacing - offset;
    const y = h / 2;

    const bar = document.createElement("a-box");
    bar.setAttribute("width", "0.12");
    bar.setAttribute("depth", "0.12");
    bar.setAttribute("height", h.toFixed(3));
    bar.setAttribute("position", `${x.toFixed(3)} ${y.toFixed(3)} 0`);
    bar.setAttribute("color", color);

    const label = document.createElement("a-text");
    label.setAttribute("value", String(val));
    label.setAttribute("align", "center");
    label.setAttribute("color", "#fff");
    label.setAttribute("position", `0 ${(h / 2 + 0.08).toFixed(3)} 0`);
    label.setAttribute("scale", "0.35 0.35 0.35");
    label.setAttribute("side", "double");
    label.setAttribute("shader", "msdf");
    label.setAttribute("font", "https://cdn.jsdelivr.net/npm/aframe-fonts/roboto-msdf.json");

    bar.appendChild(label);
    state.container.appendChild(bar);
    items.push({ val, el: bar, label });
  });

  state.items = items;
  return state;
}

// Оновлення позицій (коли вже поміняли порядок items у стані)
function updateBarPositions(arIdx) {
  const state = window.arVisualState[arIdx];
  if (!state) return;
  const { items, spacing, baseHeight, maxExtraHeight, maxVal } = state;
  const offset = ((items.length - 1) * spacing) / 2;

  items.forEach((item, i) => {
    const val = item.val;
    const h = baseHeight + (Math.abs(val) / maxVal) * maxExtraHeight;
    const x = i * spacing - offset;
    const y = h / 2;

    item.el.setAttribute("height", h.toFixed(3));
    item.el.setAttribute("position", `${x.toFixed(3)} ${y.toFixed(3)} 0`);
    item.label.setAttribute("position", `0 ${(h / 2 + 0.08).toFixed(3)} 0`);
  });
}

// Анімація обміну двох стовпчиків (для Bubble Sort, Quick Sort тощо)
function animateSwap(arIdx, i, j, color = "#FFD700") {
  return new Promise(resolve => {
    const state = window.arVisualState[arIdx];
    if (!state || state.cancelled) {
      return resolve();
    }

    const items = state.items;
    const item1 = items[i];
    const item2 = items[j];
    if (!item1 || !item2) return resolve();

    const el1 = item1.el;
    const el2 = item2.el;
    const pos1 = el1.getAttribute("position");
    const pos2 = el2.getAttribute("position");

    el1.setAttribute("color", color);
    el2.setAttribute("color", color);

    el1.setAttribute("animation__move", {
      property: "position",
      to: `${pos2.x} ${pos1.y} ${pos1.z}`,
      dur: AR_ANIM_DURATION
    });
    el2.setAttribute("animation__move", {
      property: "position",
      to: `${pos1.x} ${pos2.y} ${pos2.z}`,
      dur: AR_ANIM_DURATION
    });

    setTimeout(() => {
      if (state.cancelled) return resolve();

      // міняємо місцями в стані
      [items[i], items[j]] = [items[j], items[i]];
      updateBarPositions(arIdx);

      el1.setAttribute("color", "#39f");
      el2.setAttribute("color", "#39f");
      resolve();
    }, AR_ANIM_DURATION + 60);
  });
}

// ====== Чисті алгоритми (для виміру часу і тексту) ======

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

function gcdWithPairs(a, b) {
  let steps = [];
  let pairs = [];
  let origA = a, origB = b;
  let count = 0;
  while (b !== 0) {
    steps.push(`Крок ${count+1}: a = ${a}, b = ${b} ⇒ a, b = b, a % b = ${b}, ${a % b}`);
    pairs.push({ a, b });
    [a, b] = [b, a % b];
    count++;
  }
  pairs.push({ a, b }); // останній стан
  return { gcd: a, steps, origA, origB, totalSteps: count, pairs };
}

// ====== Анімації для кожного алгоритму ======

// Bubble Sort – повна анімація обмінів
async function startBubbleSortAnimation(arIdx, values) {
  const state = buildBars(arIdx, values, "#39f");
  if (!state) return;
  const n = state.items.length;

  for (let i = 0; i < n; i++) {
    if (state.cancelled) return;
    for (let j = 0; j < n - 1 - i; j++) {
      if (state.cancelled) return;
      if (state.items[j].val > state.items[j + 1].val) {
        await animateSwap(arIdx, j, j + 1);
      }
    }
  }

  if (state.cancelled) return;
  state.items.forEach(item => item.el.setAttribute("color", "#4CAF50"));
}

// Fibonacci – додаємо стовпчики один за одним
async function startFibonacciAnimation(arIdx, seq) {
  const state = createState(arIdx);
  if (!state) return;

  const maxVal = Math.max(...seq.map(v => Math.abs(v))) || 1;
  state.maxVal = maxVal;
  const offset = ((seq.length - 1) * state.spacing) / 2;

  for (let i = 0; i < seq.length; i++) {
    if (state.cancelled) return;

    const val = seq[i];
    const h = state.baseHeight + (Math.abs(val) / maxVal) * state.maxExtraHeight;
    const x = i * state.spacing - offset;
    const y = h / 2;

    const bar = document.createElement("a-box");
    bar.setAttribute("width", "0.12");
    bar.setAttribute("depth", "0.12");
    bar.setAttribute("height", h.toFixed(3));
    bar.setAttribute("position", `${x.toFixed(3)} ${y.toFixed(3)} 0`);
    bar.setAttribute("color", i === seq.length - 1 ? "#ff6b6b" : "#ffa726");

    const label = document.createElement("a-text");
    label.setAttribute("value", String(val));
    label.setAttribute("align", "center");
    label.setAttribute("color", "#fff");
    label.setAttribute("position", `0 ${(h / 2 + 0.08).toFixed(3)} 0`);
    label.setAttribute("scale", "0.35 0.35 0.35");
    label.setAttribute("side", "double");
    label.setAttribute("shader", "msdf");
    label.setAttribute("font", "https://cdn.jsdelivr.net/npm/aframe-fonts/roboto-msdf.json");

    bar.appendChild(label);
    state.container.appendChild(bar);
    state.items.push({ val, el: bar, label });

    await sleep(250);
  }
}

// Factorial – підсвічуємо множники 1..n
async function startFactorialAnimation(arIdx, n) {
  const values = Array.from({ length: n }, (_, i) => i + 1);
  const state = buildBars(arIdx, values, "#ffce56");
  if (!state) return;

  for (let i = 0; i < state.items.length; i++) {
    if (state.cancelled) return;
    const item = state.items[i];
    item.el.setAttribute("color", "#FFD700");
    await sleep(300);
    if (state.cancelled) return;
    item.el.setAttribute("color", "#ffce56");
  }

  if (state.cancelled) return;
  state.items.forEach(item => item.el.setAttribute("color", "#4CAF50"));
}

// Linear Search – поелементне підсвічування, знайдений – зелений
async function startLinearSearchAnimation(arIdx, values, idxFound) {
  const state = buildBars(arIdx, values, "#36A2EB");
  if (!state) return;

  for (let i = 0; i < state.items.length; i++) {
    if (state.cancelled) return;
    const item = state.items[i];
    item.el.setAttribute("color", "#FFD700");
    await sleep(300);
    if (state.cancelled) return;

    if (i === idxFound) {
      item.el.setAttribute("color", "#7cf870");
      break;
    } else {
      item.el.setAttribute("color", "#36A2EB");
    }
  }
}

// GCD (Евклід) – два стовпчика, що змінюють висоту
async function startGcdAnimation(arIdx, pairs) {
  if (!pairs || !pairs.length) return;

  const first = pairs[0];
  const a0 = first.a;
  const b0 = first.b;
  const state = createState(arIdx);
  if (!state) return;

  const maxVal = Math.max(...pairs.map(p => Math.max(Math.abs(p.a), Math.abs(p.b)))) || 1;
  state.maxVal = maxVal;

  // Створюємо два стовпчики A та B
  const makeBar = (val, x, color) => {
    const h = state.baseHeight + (Math.abs(val) / maxVal) * state.maxExtraHeight;
    const y = h / 2;
    const bar = document.createElement("a-box");
    bar.setAttribute("width", "0.18");
    bar.setAttribute("depth", "0.18");
    bar.setAttribute("height", h.toFixed(3));
    bar.setAttribute("position", `${x.toFixed(3)} ${y.toFixed(3)} 0`);
    bar.setAttribute("color", color);

    const label = document.createElement("a-text");
    label.setAttribute("value", String(val));
    label.setAttribute("align", "center");
    label.setAttribute("color", "#fff");
    label.setAttribute("position", `0 ${(h / 2 + 0.08).toFixed(3)} 0`);
    label.setAttribute("scale", "0.4 0.4 0.4");
    label.setAttribute("side", "double");
    label.setAttribute("shader", "msdf");
    label.setAttribute("font", "https://cdn.jsdelivr.net/npm/aframe-fonts/roboto-msdf.json");

    bar.appendChild(label);
    state.container.appendChild(bar);
    return { val, el: bar, label };
  };

  const barA = makeBar(a0, -0.22, "#8BC34A");
  const barB = makeBar(b0,  0.22, "#03A9F4");
  state.items = [barA, barB];

  // Кроки алгоритму – змінюємо висоту обох стовпчиків
  for (let i = 0; i < pairs.length; i++) {
    if (state.cancelled) return;
    const { a, b } = pairs[i];

    const hA = state.baseHeight + (Math.abs(a) / maxVal) * state.maxExtraHeight;
    const hB = state.baseHeight + (Math.abs(b) / maxVal) * state.maxExtraHeight;

    barA.el.setAttribute("animation__h", {
      property: "height",
      to: hA.toFixed(3),
      dur: AR_ANIM_DURATION
    });
    barB.el.setAttribute("animation__h", {
      property: "height",
      to: hB.toFixed(3),
      dur: AR_ANIM_DURATION
    });

    barA.el.setAttribute("animation__pos", {
      property: "position",
      to: `-0.22 ${(hA / 2).toFixed(3)} 0`,
      dur: AR_ANIM_DURATION
    });
    barB.el.setAttribute("animation__pos", {
      property: "position",
      to: `0.22 ${(hB / 2).toFixed(3)} 0`,
      dur: AR_ANIM_DURATION
    });

    barA.label.setAttribute("value", String(a));
    barB.label.setAttribute("value", String(b));

    await sleep(AR_ANIM_DURATION + 80);
  }

  if (state.cancelled) return;
  barA.el.setAttribute("color", "#4CAF50");
  barB.el.setAttribute("color", "#4CAF50");
}

// ====== Головна функція аналізу, яку викликає app.js ======

window.analyzeAlgorithm = function(name, arIdx, cb) {
  let result = "";

  if (name === "bubble_sort") {
    const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    const before = arr.join(', ');
    const { result: sorted, ms } = timeIt(bubbleSort, [...arr]);
    const after = sorted.join(', ');

    // Запускаємо анімацію (асинхронно, не блокуємо текст)
    startBubbleSortAnimation(arIdx, arr);

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

    // Послідовність для візуалізації
    const seq = [];
    let a = 0, b = 1;
    for (let i = 0; i <= n; i++) {
      seq.push(a);
      [a, b] = [b, a + b];
    }
    startFibonacciAnimation(arIdx, seq);

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

    startFactorialAnimation(arIdx, n);

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

    startLinearSearchAnimation(arIdx, arr, idx);

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
    const { gcd, steps, origA, origB, totalSteps, pairs } = gcdWithPairs(a, b);
    const t1 = performance.now();

    startGcdAnimation(arIdx, pairs);

    result = `GCD (алгоритм Евкліда)<br>
      <b>Знаходження найбільшого спільного дільника (НСД)</b> для чисел <b>${origA}</b> та <b>${origB}</b>.<br>
      <b>Пояснення:</b> НСД — це найбільше число, на яке діляться обидва заданих числа.<br>
      <b>Алгоритм Евкліда:</b> поки b ≠ 0, a та b замінюються на b і a % b.<br>
      Кроки:<br>
      <pre style="font-size:0.95em;">${steps.join('\n')}</pre>
      Всього кроків: <b>${totalSteps}</b>.<br>
      НСД: <b>${gcd}</b>.<br>
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
