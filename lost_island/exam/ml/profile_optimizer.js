// Простий аналізатор продуктивності коду
function optimizeCode(code) {
  console.log("[ML] Аналіз коду...");

  const warnings = [];
  if (code.includes("for(let i=0") || code.includes("for (let i = 0")) {
    warnings.push("🔍 Замініть 'for' на 'forEach' або 'map' для масивів");
  }
  if (code.includes("==")) {
    warnings.push("🔍 Використовуйте '===' замість '==' для строгого порівняння");
  }

  const mlResults = document.createElement("div");
  mlResults.innerHTML = `<h3>🤖 Оптимізаційні поради:</h3><ul>${
    warnings.map(w => `<li>${w}</li>`).join("")
  }</ul>`;
  document.getElementById("variables-panel").appendChild(mlResults);
}
