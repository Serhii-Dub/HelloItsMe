# Dubrovіn AR — Візуалізація виконання програм

**Мета:**  
Навчальна AR-платформа для покрокового вивчення алгоритмів.  
Маркерна AR (MindAR), інтеграція ML для оптимізації.

## Як користуватись

1. **Роздрукувати або показати маркер-алгоритм** (QR/зображення) із папки `assets/markers` або `qr-codes`.
2. **Відкрити [index.html]** на мобільному чи комп’ютері.
3. **Навести камеру** — побачити 3D-об’єкт, код, step-by-step виконання та поради ML.
4. Переключати кроки кнопками “Далі” та “Назад”.
5. У вкладці "ML-аналіз" — рекомендації щодо оптимізації цього алгоритму.

## Структура проекту
exam/
│
├── index.html
├── style.css
├── app.js
├── ml_optimizer.js
├── README.md
│
├── assets/
│ ├── targets.mind
│ └── markers/
│ ├── bubble_sort.png
│ ├── fibonacci.png
│ ├── factorial.png
│ ├── linear_search.png
│ └── evklid_algoritm.png
│
└── qr-codes/
├── bubble_sort_qr.png
├── fibonacci_qr.png
├── factorial_qr.png
├── linear_search_qr.png
└── evklid_algoritm_qr.png

## Технології

- [MindAR.js](https://github.com/MindAR-js/), [A-Frame](https://aframe.io/)
- [TensorFlow.js](https://www.tensorflow.org/js) — ML модуль

## Освітня цінність

- Покрокова візуалізація виконання класичних алгоритмів.
- Інтерактивні підказки та ML-аналіз.
- Дерево викликів функцій.
- Можливість роботи з кількома маркерами одночасно.

## Як додати новий алгоритм

1. Додати маркер (QR або зображення) до папки `assets/markers`
2. Додати опис у масив `algorithms` у файлі `app.js`
3. Додати відповідь у ML-модуль (файл `ml_optimizer.js`)
4. Згенерувати новий targets.mind для MindAR (дивись [MindAR Docs](https://hiukim.github.io/mind-ar-js-doc/tools/compile/))

## Контакти

Автор: Дубровін Сергій  
Email: x1092x.mail@gmail.com
