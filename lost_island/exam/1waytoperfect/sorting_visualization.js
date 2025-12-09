// Глобальна змінна для швидкості анімації
window.ANIMATION_DURATION = 600;

// Глобальні змінні для поточного стану
let currentAlgorithm = null;
let values = [];
let spheres = [];
let chart = null;
let isAnimating = false;

// Конфігурації для кожного алгоритму
const algorithmConfigs = {
    bubble_sort: {
        name: "Bubble Sort",
        color: "#EF2D5E",
        description: "Бульбашкове сортування порівнює сусідні елементи та міняє їх місцями, якщо вони у неправильному порядку. Найбільші елементи 'спливають' вгору.",
        icon: "🫧"
    },
    fibonacci: {
        name: "Fibonacci Sequence",
        color: "#4CC3D9",
        description: "Послідовність Фібоначчі: кожне число є сумою двох попередніх. Класичний приклад рекурсії в програмуванні.",
        icon: "🌀"
    },
    factorial: {
        name: "Factorial",
        color: "#FFC65D",
        description: "Факторіал числа n (позначається n!) - добуток всіх натуральних чисел від 1 до n. Використовується в комбінаториці.",
        icon: "📊"
    },
    linear_search: {
        name: "Linear Search",
        color: "#7BC8A4",
        description: "Лінійний пошук - простий алгоритм, який перевіряє кожен елемент масиву по черзі, поки не знайде шукане значення.",
        icon: "🔍"
    },
    evklid_algoritm: {
        name: "GCD Algorithm",
        color: "#A9A9F5",
        description: "Алгоритм Евкліда для знаходження найбільшого спільного дільника (НСД) двох чисел. Один з найдавніших алгоритмів.",
        icon: "📐"
    }
};

// Генерація унікальних рандомних значень для кожного сканування
function generateRandomValues(algoName) {
    const uniqueSeed = Date.now() % 10000; // Унікальне насіння для кожного сканування
    
    switch(algoName) {
        case 'bubble_sort':
            // Для сортування - 10 унікальних рандомних чисел
            const numbers = new Set();
            while (numbers.size < 10) {
                numbers.add(Math.floor(Math.random() * 20) + 1);
            }
            return Array.from(numbers);
            
        case 'fibonacci':
            // Для Фібоначчі - перші 10 чисел з випадкового початку
            const start = (uniqueSeed % 5) + 1;
            const fib = [start, start];
            for (let i = 2; i < 10; i++) {
                fib.push(fib[i-1] + fib[i-2]);
            }
            return fib.map(n => n / 2); // Масштабуємо для кращої візуалізації
            
        case 'factorial':
            // Для факторіалів - логарифмічне представлення
            return Array.from({ length: 10 }, (_, i) => {
                const n = i + 1 + (uniqueSeed % 3);
                let fact = 1;
                for (let j = 1; j <= n; j++) fact *= j;
                return Math.log(fact) * 0.8; // Логарифмічна шкала
            });
            
        case 'linear_search':
            // Для лінійного пошуку - 10 рандомних чисел
            const searchValues = [];
            for (let i = 0; i < 10; i++) {
                searchValues.push(Math.floor(Math.random() * 25) + 1);
            }
            return searchValues;
            
        case 'evklid_algoritm':
            // Для алгоритму Евкліда - числа, кратні випадковому дільнику
            const divisor = (uniqueSeed % 7) + 2;
            return Array.from({ length: 10 }, (_, i) => (i + 1) * divisor);
            
        default:
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
}

// Ініціалізація графіка
function initChart(algoName) {
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");
    
    if (chart) {
        chart.destroy();
    }
    
    const config = algorithmConfigs[algoName];
    const currentValues = [...values].slice(0, 3); // Беремо перші 3 значення для графіка
    
    // Створюємо порівняльні дані
    let labels, dataValues;
    
    if (algoName === 'bubble_sort') {
        labels = ["Несортовано", "Частково", "Відсортовано"];
        dataValues = [currentValues[0], currentValues[1], currentValues[2]];
    } else {
        labels = ["Значення 1", "Значення 2", "Значення 3"];
        dataValues = currentValues;
    }
    
    chart = new Chart(ctx, {
        type: algoName === 'fibonacci' || algoName === 'factorial' ? 'line' : 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: config.name,
                data: dataValues,
                backgroundColor: algoName === 'bubble_sort' ? [
                    config.color,
                    config.color + 'CC',
                    config.color + '99'
                ] : config.color,
                borderColor: config.color,
                borderWidth: 2,
                fill: algoName === 'fibonacci' || algoName === 'factorial'
            }]
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: "#f2f2f2" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                },
                x: {
                    ticks: { color: "#f2f2f2" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                }
            },
            plugins: {
                legend: { 
                    labels: { color: "#f2f2f2", font: { size: 12 } }
                },
                title: {
                    display: true,
                    text: `${config.icon} ${config.name} - Графік значень`,
                    color: config.color,
                    font: { size: 14 }
                }
            }
        }
    });
}

// Створення 3D стовпців
function createBars(algoName) {
    const scene = document.querySelector("#balls");
    if (!scene) return;
    
    scene.innerHTML = '';
    spheres = [];

    const config = algorithmConfigs[algoName];
    const spacing = 0.7;
    const offset = ((values.length - 1) * spacing) / 2;

    values.forEach((val, i) => {
        // Створюємо стовпець
        const bar = document.createElement("a-box");
        bar.setAttribute("color", config.color);
        bar.setAttribute("width", 0.3);
        bar.setAttribute("depth", 0.3);
        bar.setAttribute("height", val * 0.25);
        bar.setAttribute("class", "sort-bar");
        bar.setAttribute("id", `bar-${i}`);
        bar.setAttribute("opacity", "0.9");
        bar.setAttribute("roughness", "0.8");

        const x = i * spacing - offset;
        const y = (val * 0.25) / 2;
        bar.setAttribute("position", `${x} ${y} 0`);

        // Додаємо текст зі значенням
        const text = document.createElement("a-text");
        const displayValue = algoName === 'factorial' ? val.toFixed(1) : Math.round(val);
        text.setAttribute("value", displayValue.toString());
        text.setAttribute("align", "center");
        text.setAttribute("color", "white");
        text.setAttribute("position", `0 ${(val * 0.25) / 2 + 0.25} 0`);
        text.setAttribute("scale", "0.8 0.8 0.8");
        text.setAttribute("width", "3");
        bar.appendChild(text);

        // Додаємо індекс
        const indexText = document.createElement("a-text");
        indexText.setAttribute("value", `[${i}]`);
        indexText.setAttribute("align", "center");
        indexText.setAttribute("color", "#aaa");
        indexText.setAttribute("position", `0 ${(val * 0.25) / 2 - 0.3} 0`);
        indexText.setAttribute("scale", "0.6 0.6 0.6");
        bar.appendChild(indexText);

        scene.appendChild(bar);
        spheres.push({ 
            val, 
            el: bar, 
            text: text,
            indexText: indexText,
            originalIndex: i,
            color: config.color
        });
    });
}

// Оновлення позицій
function updatePositions() {
    const spacing = 0.7;
    const offset = ((spheres.length - 1) * spacing) / 2;
    
    spheres.forEach((s, i) => {
        const x = i * spacing - offset;
        const y = (s.val * 0.25) / 2;
        
        s.el.removeAttribute("animation__move");
        s.el.setAttribute("position", `${x} ${y} 0`);
        
        // Оновлюємо позицію тексту
        s.text.setAttribute("position", `0 ${(s.val * 0.25) / 2 + 0.25} 0`);
        s.indexText.setAttribute("position", `0 ${(s.val * 0.25) / 2 - 0.3} 0`);
    });
}

// Анімація обміну
function animateSwap(i, j, highlightColor = "#FFD700") {
    return new Promise((resolve) => {
        if (i < 0 || j < 0 || i >= spheres.length || j >= spheres.length) {
            resolve();
            return;
        }

        const el1 = spheres[i].el;
        const el2 = spheres[j].el;
        const pos1 = el1.getAttribute("position");
        const pos2 = el2.getAttribute("position");

        // Підсвічування під час обміну
        el1.setAttribute("color", highlightColor);
        el2.setAttribute("color", highlightColor);

        // Анімація переміщення
        el1.setAttribute("animation__move", {
            property: "position",
            to: `${pos2.x} ${pos1.y} ${pos1.z}`,
            dur: window.ANIMATION_DURATION,
            easing: "easeInOutQuad"
        });

        el2.setAttribute("animation__move", {
            property: "position",
            to: `${pos1.x} ${pos2.y} ${pos2.z}`,
            dur: window.ANIMATION_DURATION,
            easing: "easeInOutQuad"
        });

        setTimeout(() => {
            // Обмін значеннями
            const temp = spheres[i];
            spheres[i] = spheres[j];
            spheres[j] = temp;

            updatePositions();

            // Повернення кольору
            el1.setAttribute("color", spheres[i].color);
            el2.setAttribute("color", spheres[j].color);

            resolve();
        }, window.ANIMATION_DURATION + 50);
    });
}

// Bubble Sort з анімацією
async function bubbleSortAnimated() {
    const startTime = performance.now();
    let len = spheres.length;
    let swaps = 0;
    let comparisons = 0;
    
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            comparisons++;
            if (spheres[j].val > spheres[j + 1].val) {
                await animateSwap(j, j + 1, "#FF6347");
                swaps++;
            }
        }
    }
    
    const endTime = performance.now();
    const elapsed = Math.round(endTime - startTime);
    
    // Підсвічування відсортованих елементів зеленим
    spheres.forEach(s => s.el.setAttribute("color", "#4CAF50"));
    
    return { 
        elapsed, 
        swaps, 
        comparisons,
        algorithm: "Bubble Sort" 
    };
}

// Анімація для Фібоначчі
async function animateFibonacci() {
    const startTime = performance.now();
    
    // Показуємо зв'язки між числами Фібоначчі
    for (let i = 2; i < spheres.length; i++) {
        const prev1 = spheres[i-1].el;
        const prev2 = spheres[i-2].el;
        const current = spheres[i].el;
        
        // Підсвічуємо числа, що додаються
        prev1.setAttribute("color", "#FFD700");
        prev2.setAttribute("color", "#FFD700");
        current.setAttribute("color", "#32CD32");
        
        // Додаємо анімацію "пульсації"
        current.setAttribute("animation__pulse", {
            property: "scale",
            from: "1 1 1",
            to: "1.1 1.1 1.1",
            dur: window.ANIMATION_DURATION / 2,
            dir: "alternate",
            loop: 2
        });
        
        await new Promise(r => setTimeout(r, window.ANIMATION_DURATION));
        
        prev1.setAttribute("color", spheres[i-1].color);
        prev2.setAttribute("color", spheres[i-2].color);
        current.removeAttribute("animation__pulse");
        
        if (i < spheres.length - 1) {
            current.setAttribute("color", spheres[i].color);
        }
    }
    
    const endTime = performance.now();
    return { 
        elapsed: Math.round(endTime - startTime),
        steps: spheres.length - 2,
        algorithm: "Fibonacci Sequence"
    };
}

// Анімація для факторіалів
async function animateFactorial() {
    const startTime = performance.now();
    
    // Показуємо множення послідовних чисел
    let product = 1;
    for (let i = 0; i < spheres.length; i++) {
        const current = spheres[i].el;
        const n = i + 1;
        
        // Підсвічуємо поточне число
        current.setAttribute("color", "#FFD700");
        
        if (i > 0) {
            product *= n;
            // Показуємо зв'язок з попереднім результатом
            const prev = spheres[i-1].el;
            prev.setAttribute("color", "#9370DB");
            
            // Лінія зв'язку
            const line = document.createElement("a-entity");
            line.setAttribute("line", {
                start: `${prev.getAttribute("position").x} ${prev.getAttribute("position").y + 0.5} 0`,
                end: `${current.getAttribute("position").x} ${current.getAttribute("position").y + 0.5} 0`,
                color: "#FFD700"
            });
            line.setAttribute("opacity", "0.6");
            document.querySelector("#balls").appendChild(line);
            
            // Видаляємо лінію через деякий час
            setTimeout(() => line.parentNode.removeChild(line), window.ANIMATION_DURATION);
        }
        
        await new Promise(r => setTimeout(r, window.ANIMATION_DURATION / 2));
        
        if (i > 0) {
            spheres[i-1].el.setAttribute("color", spheres[i-1].color);
        }
        current.setAttribute("color", spheres[i].color);
    }
    
    const endTime = performance.now();
    return { 
        elapsed: Math.round(endTime - startTime),
        product: product,
        algorithm: "Factorial Progression"
    };
}

// Анімація для лінійного пошуку
async function animateLinearSearch() {
    const startTime = performance.now();
    const targetIndex = Math.floor(Math.random() * spheres.length);
    const targetValue = spheres[targetIndex].val;
    
    document.getElementById("timer").innerHTML = 
        `Шукаємо значення: <b>${Math.round(targetValue)}</b>`;
    
    let foundAt = -1;
    let checks = 0;
    
    // Знаходимо та підсвічуємо цільовий елемент
    for (let i = 0; i < spheres.length; i++) {
        checks++;
        const current = spheres[i].el;
        
        // Підсвічуємо поточний перевіряємий елемент
        current.setAttribute("color", "#FFD700");
        
        await new Promise(r => setTimeout(r, window.ANIMATION_DURATION / 3));
        
        if (Math.round(spheres[i].val) === Math.round(targetValue)) {
            // Знайшли! Підсвічуємо зеленим
            current.setAttribute("color", "#32CD32");
            foundAt = i;
            
            // Анімація знахідки
            current.setAttribute("animation__found", {
                property: "scale",
                from: "1 1 1",
                to: "1.2 1.2 1.2",
                dur: 300,
                dir: "alternate",
                loop: 3
            });
            break;
        } else {
            // Не знайшли - сірий
            current.setAttribute("color", "#A9A9A9");
        }
    }
    
    const endTime = performance.now();
    return { 
        elapsed: Math.round(endTime - startTime),
        foundAt: foundAt,
        checks: checks,
        targetValue: Math.round(targetValue),
        algorithm: "Linear Search"
    };
}

// Анімація для алгоритму Евкліда
async function animateGCD() {
    const startTime = performance.now();
    
    if (spheres.length >= 2) {
        // Беремо перші два числа для демонстрації
        const a = Math.round(spheres[0].val);
        const b = Math.round(spheres[1].val);
        
        document.getElementById("timer").innerHTML = 
            `Знаходимо НСД для: <b>${a}</b> та <b>${b}</b>`;
        
        // Підсвічуємо початкові числа
        spheres[0].el.setAttribute("color", "#FFD700");
        spheres[1].el.setAttribute("color", "#FFD700");
        
        await new Promise(r => setTimeout(r, window.ANIMATION_DURATION));
        
        // Імітуємо кроки алгоритму Евкліда
        let x = a, y = b;
        let steps = 0;
        
        while (y !== 0 && steps < 4) {
            steps++;
            const remainder = x % y;
            
            // Оновлюємо інформацію
            document.getElementById("timer").innerHTML += 
                `<br>Крок ${steps}: ${x} % ${y} = ${remainder}`;
            
            // Підсвічуємо нові значення
            spheres[0].el.setAttribute("color", "#9370DB");
            spheres[1].el.setAttribute("color", "#9370DB");
            
            await new Promise(r => setTimeout(r, window.ANIMATION_DURATION));
            
            [x, y] = [y, remainder];
        }
        
        // Підсвічуємо результат (НСД)
        spheres[0].el.setAttribute("color", "#32CD32");
        spheres[1].el.setAttribute("color", "#32CD32");
        
        const gcd = x;
        
        const endTime = performance.now();
        return { 
            elapsed: Math.round(endTime - startTime),
            a: a,
            b: b,
            gcd: gcd,
            steps: steps,
            algorithm: "Euclidean Algorithm"
        };
    }
    
    const endTime = performance.now();
    return { 
        elapsed: Math.round(endTime - startTime),
        algorithm: "GCD Algorithm"
    };
}

// Головна функція запуску анімації
async function runAlgorithmAnimation(algoName) {
    if (isAnimating) return;
    isAnimating = true;
    
    const btn = document.getElementById("startSortBtn");
    const timer = document.getElementById("timer");
    const originalBtnText = btn.textContent;
    
    btn.disabled = true;
    btn.textContent = "Виконується...";
    timer.innerHTML = `<b>Анімація запущена...</b>`;
    
    let result = {};
    
    try {
        switch(algoName) {
            case 'bubble_sort':
                result = await bubbleSortAnimated();
                timer.innerHTML = 
                    `<b>Bubble Sort завершено!</b><br>
                     Час: ${result.elapsed} мс<br>
                     Обмінів: ${result.swaps}<br>
                     Порівнянь: ${result.comparisons}<br>
                     <span style="color: #4CAF50">✓ Масив відсортовано</span>`;
                break;
                
            case 'fibonacci':
                result = await animateFibonacci();
                timer.innerHTML = 
                    `<b>Послідовність Фібоначчі!</b><br>
                     Час: ${result.elapsed} мс<br>
                     Кроків: ${result.steps}<br>
                     <span style="color: #4CC3D9">🌀 Рекурсивна структура</span>`;
                break;
                
            case 'factorial':
                result = await animateFactorial();
                timer.innerHTML = 
                    `<b>Факторіальна прогресія!</b><br>
                     Час: ${result.elapsed} мс<br>
                     Добуток: ~${result.product.toExponential(2)}<br>
                     <span style="color: #FFC65D">📊 Логарифмічне представлення</span>`;
                break;
                
            case 'linear_search':
                result = await animateLinearSearch();
                if (result.foundAt >= 0) {
                    timer.innerHTML = 
                        `<b>Знайдено!</b><br>
                         Час: ${result.elapsed} мс<br>
                         Значення: ${result.targetValue}<br>
                         Позиція: ${result.foundAt + 1}<br>
                         Перевірок: ${result.checks}<br>
                         <span style="color: #32CD32">✓ Успішний пошук</span>`;
                } else {
                    timer.innerHTML = 
                        `<b>Не знайдено!</b><br>
                         Час: ${result.elapsed} мс<br>
                         Перевірок: ${result.checks}<br>
                         <span style="color: #FF6347">✗ Значення не знайдено</span>`;
                }
                break;
                
            case 'evklid_algoritm':
                result = await animateGCD();
                if (result.gcd) {
                    timer.innerHTML = 
                        `<b>НСД знайдено!</b><br>
                         Час: ${result.elapsed} мс<br>
                         Для чисел: ${result.a} та ${result.b}<br>
                         НСД: ${result.gcd}<br>
                         Кроків: ${result.steps}<br>
                         <span style="color: #A9A9F5">📐 Алгоритм Евкліда</span>`;
                }
                break;
                
            default:
                await new Promise(r => setTimeout(r, 1000));
                spheres.forEach(s => s.el.setAttribute("color", "#4CAF50"));
                result.elapsed = 1000;
                timer.innerHTML = `<b>Анімація завершена!</b><br>Час: ${result.elapsed} мс`;
                break;
        }
        
        // Оновлюємо графік
        initChart(algoName);
        
    } catch (error) {
        console.error("Помилка анімації:", error);
        timer.innerHTML = `<b style="color: #FF6347">Помилка анімації!</b>`;
    } finally {
        btn.disabled = false;
        btn.textContent = originalBtnText;
        isAnimating = false;
    }
    
    return result;
}

// Показ візуалізації для алгоритму
function showSortingForAlgorithm(algoName) {
    const visualization = document.getElementById("sorting-visualization");
    if (!visualization) return;
    
    // Оновлюємо інтерфейс
    const config = algorithmConfigs[algoName];
    document.getElementById("viz-title").innerHTML = 
        `${config.icon} <b>${config.name}</b> - 3D Візуалізація`;
    document.getElementById("viz-description").innerHTML = 
        `${config.description}<br><small>🔄 Кожне сканування генерує нові випадкові дані!</small>`;
    
    // Генеруємо НОВІ рандомні значення для кожного сканування
    currentAlgorithm = algoName;
    values = generateRandomValues(algoName);
    
    // Створюємо стовпці
    createBars(algoName);
    
    // Ініціалізуємо графік
    initChart(algoName);
    
    // Оновлюємо UI
    const timer = document.getElementById("timer");
    timer.innerHTML = `<b>Готово до анімації!</b><br>Натисніть "Запустити анімацію"`;
    timer.style.color = config.color;
    
    // Оновлюємо кнопки
    document.querySelectorAll(".sort-btn").forEach(btn => {
        btn.style.background = `linear-gradient(135deg, ${config.color} 0%, ${config.color}80 100%)`;
    });
}

// Скидання з новими рандомними значеннями
function resetVisualization() {
    if (!currentAlgorithm || isAnimating) return;
    
    // Генеруємо НОВІ рандомні значення
    values = generateRandomValues(currentAlgorithm);
    
    // Перестворюємо стовпці
    createBars(currentAlgorithm);
    
    // Скидаємо таймер
    const config = algorithmConfigs[currentAlgorithm];
    document.getElementById("timer").innerHTML = 
        `<b>Дані оновлено!</b><br>Нові випадкові значення згенеровано`;
    document.getElementById("timer").style.color = config.color;
    
    // Оновлюємо графік
    initChart(currentAlgorithm);
}

// Ініціалізація подій
function initSortingVisualization() {
    // Кнопка старту анімації
    const startBtn = document.getElementById("startSortBtn");
    if (startBtn) {
        startBtn.addEventListener("click", async () => {
            if (!currentAlgorithm || isAnimating) return;
            await runAlgorithmAnimation(currentAlgorithm);
        });
    }
    
    // Кнопка скидання
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetVisualization);
    }
    
    // Слайдер швидкості
    const speedSlider = document.getElementById("speedSlider");
    const speedValue = document.getElementById("speedValue");
    
    if (speedSlider && speedValue) {
        speedSlider.addEventListener("input", function() {
            window.ANIMATION_DURATION = parseInt(this.value);
            speedValue.textContent = `${this.value} мс`;
            speedValue.style.color = "#ffd966";
        });
    }
}

// Експортуємо функції
window.showSortingVisualization = showSortingForAlgorithm;
window.initSortingViz = initSortingVisualization;
window.getCurrentAlgorithm = () => currentAlgorithm;
window.resetViz = resetVisualization;

// Ініціалізація при завантаженні
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSortingVisualization);
} else {
    initSortingVisualization();
}