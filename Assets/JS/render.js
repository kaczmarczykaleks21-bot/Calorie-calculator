'use strict';

function render(results) {
  document.querySelector('#deficit').textContent = Math.round(
    results.deficitCalories,
  );

  document.querySelector('#maintain').textContent = Math.round(
    results.maintainCalories,
  );

  document.querySelector('#gain').textContent = Math.round(
    results.gainCalories,
  );

  document.querySelector('#goal-text').textContent = results.yourGoal;

  // MAKRO

  document.querySelector('#proteinGrams').textContent =
    `${Math.round(results.proteinGrams)}g`;

  document.querySelector('#proteinKcalPerc').textContent =
    `${Math.round(results.proteinKcal)} kcal · ${Math.round(results.proteinPct)}%`;

  // CARBS

  document.querySelector('#carbGrams').textContent =
    `${Math.round(results.carbsGrams)}g`;

  document.querySelector('#carbKcalPerc').textContent =
    `${Math.round(results.carbsKcal)} kcal · ${Math.round(results.carbsPct)}%`;

  // FATS

  document.querySelector('#fatGrams').textContent =
    `${Math.round(results.fatsGrams)}g`;

  document.querySelector('#fatKcalPerc').textContent =
    `${Math.round(results.fatsKcal)} kcal · ${Math.round(results.fatsPct)}%`;

  // FOOTER

  document.querySelector('#bmr').textContent = Math.round(results.bmr);

  document.querySelector('#tdee').textContent = Math.round(results.tdee);
}

export { render };
