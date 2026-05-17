'use strict';

import { calculate } from './calculator.js';
import { render } from './render.js';

const form = document.querySelector('form');
const themeToggle = document.getElementById('theme-toggle');
const toggleText = document.getElementById('toggle-text');

// ─── Synchronizacja checkboxa z aktualnym motywem ───
const currentTheme = document.documentElement.getAttribute('data-theme');
themeToggle.checked = currentTheme === 'dark';

// ─── Zmiana motywu ───
themeToggle.addEventListener('change', () => {
  const next = themeToggle.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ─── Zmiana języka ───
document.getElementById('polishBtn').addEventListener('click', () => {
  window.location.href = '/PL/index.html';
});

document.getElementById('englishBtn').addEventListener('click', () => {
  window.location.href = '/ENG/index.html';
});

// ─── Formularz ───
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const results = calculate();
  render(results);
  document.querySelector('#goToResults').scrollIntoView({ behavior: 'smooth' });
});
