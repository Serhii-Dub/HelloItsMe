// Простий ML-модуль (імітація): аналізує код, дає підказки щодо оптимізації
window.lastMlAnalysis = "";
window.analyzeAlgorithm = function(name, cb) {
  // Демо-логіка — можна замінити на власну модель з tf.js
  let result = "";
  switch (name) {
    case "bubble_sort":
      result = "Рекомендація: Bubble Sort має складність O(n²). Для великих масивів використовуйте QuickSort або MergeSort.";
      break;
    case "fibonacci":
      result = "Рекомендація: Рекурсивний Fibonacci має експоненційну складність. Оптимізуйте за допомогою мемоізації або циклу.";
      break;
    case "factorial":
      result = "Рекурсія для обчислення факторіалу ефективна для малих n. Для великих значень краще ітеративний підхід.";
      break;
    case "linear_search":
      result = "Лінійний пошук ефективний для коротких списків. Для відсортованих — використовуйте бінарний пошук.";
      break;
    case "evklid_algoritm":
      result = "Алгоритм Евкліда — оптимальний для знаходження НСД. Можливе прискорення через побітові операції.";
      break;
    default:
      result = "Оптимізація не потрібна.";
  }
  setTimeout(() => {
    window.lastMlAnalysis = result;
    cb && cb();
  }, 800); // для імітації обробки ML
};
