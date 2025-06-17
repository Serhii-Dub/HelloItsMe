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
      "Генеруємо випадковий масив для сортування.",
      "Визначаємо довжину масиву n.",
      "Запускаємо зовнішній цикл по i.",
      "Запускаємо внутрішній цикл по j.",
      "Порівнюємо сусідні елементи та міняємо місцями, якщо треба.",
      "Коли не відбувається жодної заміни — масив відсортований.",
      "Повертаємо відсортований масив."
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
      "Генеруємо випадкове n для обчислення n-го числа Фібоначчі.",
      "Якщо n ≤ 1, повертаємо n.",
      "Інакше викликаємо рекурсивно fibonacci(n-1) + fibonacci(n-2).",
      "Збираємо результат з рекурсії.",
      "Повертаємо n-те число Фібоначчі."
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
      "Генеруємо випадкове n для обчислення n!.",
      "Якщо n = 0, повертаємо 1.",
      "Інакше рекурсивно множимо n на factorial(n-1).",
      "Збираємо добуток з усіх рекурсивних викликів.",
      "Повертаємо n!."
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
      "Генеруємо випадковий масив та випадковий елемент для пошуку.",
      "Перебираємо масив по черзі.",
      "Якщо знайдено елемент — повертаємо його індекс.",
      "Якщо не знайдено — повертаємо -1."
    ]
  },
  {
    name: "evklid_algoritm",
    code: `def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a`,
    steps: [
      "Генеруємо два випадкових числа для знаходження НСД.",
      "Поки b ≠ 0, виконуємо a, b = b, a % b.",
      "Повторюємо цикл до b = 0.",
      "Повертаємо a — це і є НСД."
    ]
  }
];

function renderCallTree(algoIdx) {
  const trees = [
    `<b>Дерево викликів:</b><br>
    <pre>
bubble_sort
  ↳ for i
    ↳ for j
      ↳ if arr[j] > arr[j+1]</pre>
    `,
    `<b>Дерево викликів:</b><br>
    <pre>
fibonacci(n)
  ↳ fibonacci(n-1)
    ↳ fibonacci(n-2)
      ↳ ...</pre>`,
    `<b>Дерево викликів:</b><br>
    <pre>
factorial(n)
  ↳ factorial(n-1)
    ↳ factorial(n-2)
      ↳ ...</pre>`,
    `<b>Дерево викликів:</b><br>
    <pre>
linear_search
  ↳ for i
    ↳ if arr[i] == target
    </pre>
    `,
    `<b>Дерево викликів:</b><br>
    <pre>
gcd(a, b)
  ↳ while b != 0
    ↳ a, b = b, a % b
    </pre>
    `
  ];
  return trees[algoIdx] || "";
}

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

  for (let i = 0; i < 5; ++i) {
    const ent = document.querySelector(`#algo-content-${i}`).parentElement;
    ent.addEventListener("targetFound", () => showAlgorithm(i));
    ent.addEventListener("targetLost", () => {
      stepper.classList.remove("active");
      mlResult.classList.remove("active");
    });
  }
});
