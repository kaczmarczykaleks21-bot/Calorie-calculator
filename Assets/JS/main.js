'use strict';
console.log('main.js');

import { calculate } from './calculator.js';
import { render } from './render.js';

const form = document.querySelector('form');
const changeThemeBtn = document.getElementById('changeThemeBtn');
const lang = localStorage.getItem('lang');
let isDark;

function setNavbarBtns() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');

  if (lang === 'pl') {
    if (current === 'dark') {
      changeThemeBtn.textContent = 'Tryb jasny';
    }

    if (current === 'light') {
      changeThemeBtn.textContent = 'Tryb ciemny';
    }
  }

  if (lang === 'en') {
    if (current === 'dark') {
      changeThemeBtn.textContent = 'Light mode';
    }

    if (current === 'light') {
      changeThemeBtn.textContent = 'Dark mode';
    }
  }
}
setNavbarBtns();

// LANG
const polishBtn = document.getElementById('polishBtn');
const englishBtn = document.getElementById('englishBtn');

polishBtn.addEventListener('click', () => {
  window.location.href = '/PL/index.html';
});

englishBtn.addEventListener('click', () => {
  window.location.href = '/ENG/index.html';
});

changeThemeBtn.addEventListener('click', () => {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');

  const next = current === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  if (lang === 'pl') {
    if (next === 'dark') {
      changeThemeBtn.textContent = 'Tryb jasny';
    }

    if (next === 'light') {
      changeThemeBtn.textContent = 'Tryb ciemny';
    }
  }

  if (lang === 'en') {
    if (next === 'dark') {
      changeThemeBtn.textContent = 'Light mode';
    }

    if (next === 'light') {
      changeThemeBtn.textContent = 'Dark mode';
    }
  }
});

// CALCULATE
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const results = calculate();
  render(results);

  const resultsSection = document.querySelector('#goToResults');

  resultsSection.scrollIntoView({
    behavior: 'smooth',
  });
});

changeThemeBtn.addEventListener('click', () => {});
