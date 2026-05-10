'use strict';
console.log('main.js');

import { calculate } from './calculator.js';
import { render } from './render.js';

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const results = calculate();
  render(results);

  const resultsSection = document.querySelector('#goToResults');

  resultsSection.scrollIntoView({
    behavior: 'smooth',
  });

  // RESULTS
  console.log('BMR: ', results.bmr);
  console.log('TDEE: ', Math.round(results.tdee));
  console.log(`Calories: ${Math.round(results.calories)}kcal`);
  console.log(`Deficyt: ${Math.round(results.deficitCalories)}kcal`);
  console.log(`Utrzymanie: ${Math.round(results.maintainCalories)}kcal`);
  console.log(`Wzrost: ${Math.round(results.gainCalories)}kcal`);
  // MAKRO
  console.log(`Białko: ${Math.round(results.proteinGrams)} g`);
  console.log(
    `Kcal: ${Math.round(results.proteinKcal)}, ${results.proteinPct}%`,
  );

  console.log(`Węgle: ${Math.round(results.carbsGrams)} g`);
  console.log(`Kcal: ${Math.round(results.carbsKcal)}, ${results.carbsPct}%`);

  console.log(`Tłuszcze: ${Math.round(results.fatsGrams)} g`);
  console.log(`Kcal: ${Math.round(results.fatsKcal)}, ${results.fatsPct}%`);
});
