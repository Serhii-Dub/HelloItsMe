document.addEventListener('DOMContentLoaded', async () => {
    // Ініціалізація MindAR
    const mindar = new MindARThree.MindARThree({
        container: document.getElementById("ar-container"),
        imageTargetSrc: "lib/targets.mind",
    });
    const { renderer, scene, camera } = mindar;

    // Додаємо обробник для маркерів
    mindar.onTargetFound = (targetIdx) => {
        const programCode = getProgramCode(targetIdx); // Отримуємо код програми за маркером
        visualizeCodeExecution(programCode); // Запускаємо візуалізацію
    };

    await mindar.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    // Функція для імітації виконання коду
    function visualizeCodeExecution(code) {
        const lines = code.split('\n');
        let lineIdx = 0;
        const interval = setInterval(() => {
            if (lineIdx >= lines.length) {
                clearInterval(interval);
                optimizeCode(code); // Викликаємо ML-оптимізатор
                return;
            }
            highlightLine(lineIdx);
            updateVariablesPanel(lineIdx);
            lineIdx++;
        }, 1000);
    }

    function highlightLine(lineNumber) {
        const codeDisplay = document.getElementById("code-display");
        codeDisplay.innerHTML = code.split('\n').map((line, idx) => {
            return `<div class="${idx === lineNumber ? 'highlight-line' : ''}">${line}</div>`;
        }).join('\n');
    }
});

// Приклад коду для маркерів (можна розширити)
function getProgramCode(markerId) {
    const programs = [
        `// Програма 1: Сума чисел
        let sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += i;
        }
        console.log(sum);`,
        `// Програма 2: Факторіал
        function factorial(n) {
            if (n <= 1) return 1;
            return n * factorial(n - 1);
        }
        factorial(5);`
    ];
    return programs[markerId] || "// Код не знайдено";
}