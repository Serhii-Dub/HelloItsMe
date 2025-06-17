// Коротко: при розпізнанні маркера — показує код, стан змінних, дає step-by-step виконання та дерево викликів.

const algorithms = [
  {
    name: "bubble_sort",
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    steps: [
      "Стартуємо: arr = [5, 2, 4, 3]",
      "Встановити n = 4",
      "Перше коло зовнішнього циклу (i=0): проходимо внутрішній цикл",
      "Порівнюємо arr[0]=5 та arr[1]=2 → міняємо місцями",
      "Порівнюємо arr[1]=5 та arr[2]=4 → міняємо місцями",
      "Порівнюємо arr[2]=5 та arr[3]=3 → міняємо місцями",
      "Кінець першого проходу: arr = [2, 4, 3, 5]",
      "Наступні кола поки не відсортовано...",
      "Кінець: arr = [2, 3, 4, 5]"
    ]
  },
  {
    name: "fibonacci",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)`,
    steps: [
      "Введено n = 5",
      "fibonacci(5) → fibonacci(4) + fibonacci(3)",
      "fibonacci(4) → fibonacci(3) + fibonacci(2)",
      "fibonacci(3) → fibonacci(2) + fibonacci(1)",
      "fibonacci(2) → fibonacci(1) + fibonacci(0)",
      "Рекурсія спускається до n=1, n=0, повертає 1 або 0",
      "Повертаємо результат"
    ]
  },
  {
    name: "factorial",
    code: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)`,
    steps: [
      "Введено n = 4",
      "factorial(4) → 4 * factorial(3)",
      "factorial(3) → 3 * factorial(2)",
      "factorial(2) → 2 * factorial(1)",
      "factorial(1) → 1 * factorial(0)",
      "factorial(0) = 1",
      "Повертаємо результат 24"
    ]
  },
  {
    name: "linear_search",
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    steps: [
      "Масив arr = [3, 7, 9, 2], шукаємо target = 9",
      "Перевірка arr[0]=3 — не співпадає",
      "Перевірка arr[1]=7 — не співпадає",
      "Перевірка arr[2]=9 — співпадає, повертаємо i=2"
    ]
  },
  {
    name: "evklid_algoritm",
    code: `def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a`,
    steps: [
      "Знаходимо НСД для a=48, b=18",
      "b ≠ 0, переходимо в цикл",
      "a, b = 18, 48 % 18 = 12",
      "a, b = 12, 18 % 12 = 6",
      "a, b = 6, 12 % 6 = 0",
      "b = 0, вихід з циклу, повертаємо a = 6"
    ]
  }
];

// Коротке відображення дерева викликів
function renderCallTree(algoIdx) {
  const trees = [
    `
    <b>Дерево викликів:</b><br>
    <pre>
bubble_sort
  ↳ for i
    ↳ for j
      ↳ if arr[j] > arr[j+1]</pre>
    `,
    `
    <b>Дерево викликів:</b><br>
    <pre>
fibonacci(5)
  ↳ fibonacci(4)
    ↳ fibonacci(3)
      ↳ ...
    </pre>
    `,
    `
    <b>Дерево викликів:</b><br>
    <pre>
factorial(4)
  ↳ factorial(3)
    ↳ factorial(2)
      ↳ factorial(1)
        ↳ factorial(0)
    </pre>
    `,
    `
    <b>Дерево викликів:</b><br>
    <pre>
linear_search
  ↳ for i
    ↳ if arr[i] == target
    </pre>
    `,
    `
    <b>Дерево викликів:</b><br>
    <pre>
gcd(a, b)
  ↳ while b != 0
    ↳ a, b = b, a % b
    </pre>
    `
  ];
  return trees[algoIdx] || "";
}

// Підключаємо stepper і ml-аналітику до маркерів
window.addEventListener("DOMContentLoaded", () => {
  const stepper = document.getElementById("stepper");
  const mlResult = document.getElementById("ml-result");
  let activeIndex = null;
  let currentStep = 0;

  function showAlgorithm(idx) {
    activeIndex = idx;
    currentStep = 0;
    const algo = algorithms[idx];

    stepper.innerHTML = `
      <div class="code-block">${algo.code}</div>
      <div id="steps-block"></div>
      <button class="step-btn" id="prev-step">Назад</button>
      <button class="step-btn" id="next-step">Далі</button>
      <div id="call-tree">${renderCallTree(idx)}</div>
    `;
    stepper.classList.add("active");
    showStep();

    document.getElementById("prev-step").onclick = () => {
      if (currentStep > 0) { currentStep--; showStep(); }
    };
    document.getElementById("next-step").onclick = () => {
      if (currentStep < algo.steps.length - 1) { currentStep++; showStep(); }
    };

    // ML-аналітика — підключаємо
    mlResult.innerHTML = `<b>ML-аналіз...</b>`;
    mlResult.classList.add("active");
    window.analyzeAlgorithm(algo.name, () => {
      mlResult.innerHTML = window.lastMlAnalysis || "Аналіз завершено!";
    });
  }

  function showStep() {
    if (activeIndex == null) return;
    const algo = algorithms[activeIndex];
    document.getElementById("steps-block").innerHTML = `<b>Крок ${currentStep+1}:</b> ${algo.steps[currentStep]}`;
  }

  // AR розпізнавання: показує stepper при появі маркера
  for (let i = 0; i < 5; ++i) {
    const ent = document.querySelector(`#algo-content-${i}`).parentElement;
    ent.addEventListener("targetFound", () => showAlgorithm(i));
    ent.addEventListener("targetLost", () => {
      stepper.classList.remove("active");
      mlResult.classList.remove("active");
    });
  }
});
