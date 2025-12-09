const algorithms = [
  {
    name: "bubble_sort",
    displayName: "Bubble Sort",
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    codeVR: "Bubble Sort",
    steps: [
      "Крок 1: Генеруємо випадковий масив із 10 чисел для сортування.",
      "Крок 2: Визначаємо довжину масиву n.",
      "Крок 3: Запускаємо зовнішній цикл по i від 0 до n-1.",
      "Крок 4: Запускаємо внутрішній цикл по j від 0 до n-i-2.",
      "Крок 5: Порівнюємо сусідні елементи arr[j] та arr[j+1].",
      "Крок 6: Якщо arr[j] > arr[j+1], міняємо їх місцями.",
      "Крок 7: Повторюємо поки не відсортуємо весь масив.",
      "Крок 8: Повертаємо відсортований масив."
    ],
    color: "#EF2D5E"
  },
  {
    name: "fibonacci",
    displayName: "Fibonacci",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)`,
    codeVR: "Fibonacci",
    steps: [
      "Крок 1: Генеруємо випадкове n для обчислення n-го числа Фібоначчі.",
      "Крок 2: Перевіряємо базовий випадок: якщо n ≤ 1, повертаємо n.",
      "Крок 3: Інакше викликаємо рекурсивно fibonacci(n-1).",
      "Крок 4: Викликаємо рекурсивно fibonacci(n-2).",
      "Крок 5: Додаємо результати двох рекурсивних викликів.",
      "Крок 6: Повертаємо n-те число Фібоначчі."
    ],
    color: "#4CC3D9"
  },
  {
    name: "factorial",
    displayName: "Factorial",
    code: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)`,
    codeVR: "Factorial",
    steps: [
      "Крок 1: Генеруємо випадкове n для обчислення n!.",
      "Крок 2: Перевіряємо базовий випадок: якщо n = 0, повертаємо 1.",
      "Крок 3: Інакше множимо n на результат factorial(n-1).",
      "Крок 4: Рекурсивно зменшуємо n до базового випадку.",
      "Крок 5: Накопичуємо добуток всіх чисел від n до 1.",
      "Крок 6: Повертаємо значення факторіалу n!."
    ],
    color: "#FFC65D"
  },
  {
    name: "linear_search",
    displayName: "Linear Search",
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    codeVR: "Linear Search",
    steps: [
      "Крок 1: Генеруємо випадковий масив із 15 чисел.",
      "Крок 2: Вибираємо випадковий цільовий елемент для пошуку.",
      "Крок 3: Починаємо перебір масиву з першого елемента.",
      "Крок 4: Порівнюємо поточний елемент з цільовим.",
      "Крок 5: Якщо знайдено збіг — повертаємо індекс елемента.",
      "Крок 6: Якщо дійшли до кінця масиву без знахідки — повертаємо -1."
    ],
    color: "#7BC8A4"
  },
  {
    name: "evklid_algoritm",
    displayName: "GCD Algorithm",
    code: `def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a`,
    codeVR: "GCD Algorithm",
    steps: [
      "Крок 1: Генеруємо два випадкових числа a та b для знаходження НСД.",
      "Крок 2: Перевіряємо, чи b ≠ 0.",
      "Крок 3: Якщо b ≠ 0, виконуємо операцію: a, b = b, a % b.",
      "Крок 4: Повторюємо крок 2-3 до тих пір, поки b не стане 0.",
      "Крок 5: Коли b = 0, повертаємо a — це і є найбільший спільний дільник.",
      "Крок 6: Алгоритм гарантовано завершується, оскільки b зменшується."
    ],
    color: "#A9A9F5"
  }
];

function renderCallTree(algoIdx) {
  const trees = [
    `<div class="call-tree-container">
      <b>Дерево викликів Bubble Sort:</b><br>
      <pre>
bubble_sort(arr)
  ├── for i in range(n)
  │     ├── for j in range(0, n-i-1)
  │     │     └── if arr[j] > arr[j+1]
  │     │         └── swap(arr[j], arr[j+1])
  │     └── завершення внутрішнього циклу
  └── повернення відсортованого масиву
      </pre>
    </div>`,
    `<div class="call-tree-container">
      <b>Дерево рекурсії Fibonacci:</b><br>
      <pre>
fibonacci(n)
  ├── if n ≤ 1 → return n
  └── else
        ├── fibonacci(n-1)
        │     ├── fibonacci(n-2)
        │     └── fibonacci(n-3)
        └── fibonacci(n-2)
              └── fibonacci(n-3)
      </pre>
    </div>`,
    `<div class="call-tree-container">
      <b>Дерево рекурсії Factorial:</b><br>
      <pre>
factorial(n)
  ├── if n == 0 → return 1
  └── else
        ├── n * factorial(n-1)
        │     ├── (n-1) * factorial(n-2)
        │     └── ...
        └── базовий випадок: factorial(0) = 1
      </pre>
    </div>`,
    `<div class="call-tree-container">
      <b>Структура Linear Search:</b><br>
      <pre>
linear_search(arr, target)
  ├── for i in range(len(arr))
  │     ├── if arr[i] == target
  │     │     └── return i (знайдено)
  │     └── i++ (наступний елемент)
  └── return -1 (не знайдено)
      </pre>
    </div>`,
    `<div class="call-tree-container">
      <b>Процес GCD Algorithm:</b><br>
      <pre>
gcd(a, b)
  ├── while b != 0
  │     ├── a, b = b, a % b
  │     └── повтор перевірки
  └── return a (результат)
      </pre>
    </div>`
  ];
  return trees[algoIdx] || "";
}

function setARResultText(idx, text) {
  const container = document.getElementById(`algo-result-${idx}`);
  container.innerHTML = '';
  const txt = document.createElement('a-text');
  txt.setAttribute('value', text);
  txt.setAttribute('color', algorithms[idx].color);
  txt.setAttribute('align', 'center');
  txt.setAttribute('width', '3');
  txt.setAttribute('position', '0 0 0');
  txt.setAttribute('side', 'double');
  txt.setAttribute('shader', 'msdf');
  txt.setAttribute('font', 'https://cdn.jsdelivr.net/npm/aframe-fonts/roboto-msdf.json');
  container.appendChild(txt);
}

window.addEventListener("DOMContentLoaded", () => {
  const stepper = document.getElementById("stepper");
  const mlResult = document.getElementById("ml-result");
  const sortingViz = document.getElementById("sorting-visualization");
  let activeIndex = null;
  let currentStep = 0;

  function showAlgorithm(idx) {
    activeIndex = idx;
    currentStep = 0;
    const algo = algorithms[idx];

    // Оновлюємо заголовок візуалізації
    document.getElementById("viz-title").textContent = `🎮 ${algo.displayName} - 3D Візуалізація`;
    document.getElementById("viz-description").textContent = `Алгоритм: ${algo.displayName} | Кожне сканування генерує нові дані!`;

    // Оновлюємо колір кнопок
    document.querySelectorAll(".sort-btn").forEach(btn => {
      btn.style.background = `linear-gradient(135deg, ${algo.color} 0%, ${algo.color}80 100%)`;
    });

    // Оновлюємо кроки
    stepper.innerHTML = `
      <div class="algorithm-header" style="color: ${algo.color}; margin-bottom: 15px;">
        <h2>${algo.displayName}</h2>
      </div>
      <pre class="code-block">${algo.code}</pre>
      <div id="steps-block"></div>
      <div class="step-controls">
        <button class="step-btn" id="prev-step">◀ Назад</button>
        <button class="step-btn" id="next-step">Далі ▶</button>
        <span class="step-counter">Крок ${currentStep + 1} з ${algo.steps.length}</span>
      </div>
      <div id="call-tree">${renderCallTree(idx)}</div>
    `;
    stepper.classList.add("active");
    showStep();

    // Додаємо обробники для кнопок кроків
    document.getElementById("prev-step").onclick = () => {
      if (currentStep > 0) { 
        currentStep--; 
        showStep(); 
        updateStepCounter();
      }
    };
    
    document.getElementById("next-step").onclick = () => {
      if (currentStep < algo.steps.length - 1) { 
        currentStep++; 
        showStep(); 
        updateStepCounter();
      }
    };

    // Показуємо ML-аналіз
    mlResult.innerHTML = `<div style="text-align: center;">
      <b style="color: ${algo.color};">ML-аналіз виконується...</b><br>
      <small>Генеруються випадкові дані для цього сканування</small>
    </div>`;
    mlResult.classList.add("active");

    // Викликаємо ML-аналіз
    window.analyzeAlgorithm(algo.name, () => {
      mlResult.innerHTML = window.lastMlAnalysis || "Аналіз завершено!";
      setARResultText(idx, algo.codeVR);
      
      // ПОКАЗУЄМО 3D-ВІЗУАЛІЗАЦІЮ ДЛЯ ВСІХ АЛГОРИТМІВ!
      window.showSortingVisualization(algo.name);
      sortingViz.classList.add("active");
    });
  }

  function showStep() {
    if (activeIndex == null) return;
    const algo = algorithms[activeIndex];
    const stepsBlock = document.getElementById("steps-block");
    if (stepsBlock) {
      stepsBlock.innerHTML = `
        <div class="step-content">
          <h3 style="color: ${algo.color};">${algo.steps[currentStep]}</h3>
        </div>
      `;
    }
  }

  function updateStepCounter() {
    const counter = document.querySelector(".step-counter");
    if (counter && activeIndex !== null) {
      const algo = algorithms[activeIndex];
      counter.textContent = `Крок ${currentStep + 1} з ${algo.steps.length}`;
    }
  }

  // Додаємо обробники для всіх маркерів
  for (let i = 0; i < 5; ++i) {
    const ent = document.querySelector(`#algo-content-${i}`).parentElement;
    ent.addEventListener("targetFound", () => showAlgorithm(i));
    ent.addEventListener("targetLost", () => {
      stepper.classList.remove("active");
      mlResult.classList.remove("active");
      sortingViz.classList.remove("active");
      setARResultText(i, "");
    });
  }

  // Ініціалізуємо візуалізацію сортування
  if (window.initSortingViz) {
    window.initSortingViz();
  }
});

// Експортуємо алгоритми для використання в інших файлах
window.algorithms = algorithms;