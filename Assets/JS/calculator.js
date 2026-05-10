'use strict';

function calculate() {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const gender = document.querySelector('#gender').value;
  const age = document.querySelector('#age').value;
  const height = document.querySelector('#height').value;
  const weight = document.querySelector('#weight').value;
  const activity = document.querySelector('#activity').value;
  const goal = document.querySelector('#goal').value;

  console.log(`Płeć: ${gender}`);
  console.log(`Wiek: ${age}lat`);
  console.log(`Wysokość: ${height}cm`);
  console.log(`Waga: ${weight}kg`);
  console.log(`Aktywność: ${activity}`);
  console.log(`Cel: ${goal}`);

  // BMR
  let bmr;

  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // TDEE
  const tdee = bmr * activityMultipliers[activity];

  // CALORIES
  let calories;
  if (goal == 'lose_weight') {
    calories = tdee - 300;
  }
  if (goal == 'maintain_weight') {
    calories = tdee;
  }
  if (goal == 'gain_weight') {
    calories = tdee + 300;
  }
  if (goal == 'recomposition') {
    calories = tdee - 100;
  }
  const deficitCalories = tdee - 300;
  const maintainCalories = tdee;
  const gainCalories = tdee + 300;

  // MACRO ELEMENTS

  let proteinPct, carbsPct, fatsPct, yourGoal;

  if (goal === 'lose_weight') {
    proteinPct = 0.35;
    fatsPct = 0.25;
    carbsPct = 0.4;
    yourGoal = 'redukcja (deficyt kaloryczny)';
  }

  if (goal === 'maintain_weight') {
    proteinPct = 0.3;
    fatsPct = 0.3;
    carbsPct = 0.4;
    yourGoal = 'utrzymanie wagi';
  }

  if (goal === 'gain_weight') {
    proteinPct = 0.25;
    fatsPct = 0.25;
    carbsPct = 0.5;
    yourGoal = 'masa (przyrost wagi)';
  }

  if (goal === 'recomposition') {
    proteinPct = 0.3;
    fatsPct = 0.25;
    carbsPct = 0.45;
    yourGoal = 'rekompozycja (spalanie tłuszczu + budowa mięśni)';
  }

  const proteinGrams = (calories * proteinPct) / 4;
  const carbsGrams = (calories * carbsPct) / 4;
  const fatsGrams = (calories * fatsPct) / 9;

  const proteinKcal = proteinGrams * 4;
  const carbsKcal = carbsGrams * 4;
  const fatsKcal = fatsGrams * 4;

  proteinPct = proteinPct * 100;
  carbsPct = carbsPct * 100;
  fatsPct = fatsPct * 100;

  return {
    yourGoal,
    bmr,
    tdee,
    calories,
    deficitCalories,
    maintainCalories,
    gainCalories,

    proteinGrams,
    carbsGrams,
    fatsGrams,

    proteinKcal,
    carbsKcal,
    fatsKcal,

    proteinPct,
    carbsPct,
    fatsPct,
  };
}

export { calculate };
