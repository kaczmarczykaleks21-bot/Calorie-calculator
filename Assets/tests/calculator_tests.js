/**
 * Selenium WebDriver – Kalkulator kalorii
 * =========================================
 * Wymagania (w terminalu VS Code):
 *   npm init -y
 *   npm install selenium-webdriver chromedriver
 *
 * Uruchomienie:
 *   node Assets\tests\calculator_tests.js
 */

const { Builder, By, Select, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = 'http://localhost:8080/PL/index.html';
const HEADLESS = false;
const DELAY_MS = 400;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wyniki testów
let passed = 0;
let failed = 0;
const results = [];

async function assert(name, condition, detail = '') {
  if (condition) {
    passed++;
    results.push(`  ✅ PASS – ${name}`);
  } else {
    failed++;
    results.push(`  ❌ FAIL – ${name}${detail ? ': ' + detail : ''}`);
  }
}

async function fillForm(driver, options = {}) {
  const {
    gender = 'male',
    age = '28',
    height = '180',
    weight = '82',
    activity = 'moderate',
    goal = 'lose_weight',
  } = options;

  await driver.wait(until.elementLocated(By.id('gender')), 8000);

  // Płeć
  const genderEl = await driver.findElement(By.id('gender'));
  await new Select(genderEl).selectByValue(gender);
  await sleep(DELAY_MS);

  // Wiek
  const ageEl = await driver.findElement(By.id('age'));
  await ageEl.clear();
  await ageEl.sendKeys(age);
  await sleep(DELAY_MS);

  // Wzrost
  const heightEl = await driver.findElement(By.id('height'));
  await heightEl.clear();
  await heightEl.sendKeys(height);
  await sleep(DELAY_MS);

  // Waga
  const weightEl = await driver.findElement(By.id('weight'));
  await weightEl.clear();
  await weightEl.sendKeys(weight);
  await sleep(DELAY_MS);

  // Aktywność
  const activityEl = await driver.findElement(By.id('activity'));
  await new Select(activityEl).selectByValue(activity);
  await sleep(DELAY_MS);

  // Cel
  const goalEl = await driver.findElement(By.id('goal'));
  await new Select(goalEl).selectByValue(goal);
  await sleep(DELAY_MS);

  // Kliknij Oblicz
  await driver.findElement(By.id('calculateBtn')).click();
  await sleep(DELAY_MS);
}

async function getNumber(driver, id) {
  const text = await driver.findElement(By.id(id)).getText();
  const digits = text.replace(/\s/g, '').replace(/[^\d]/g, '');
  return parseInt(digits, 10);
}

// ── Testy ─────────────────────────────────────────────────────

async function testStruktura(driver) {
  console.log('\n📋 Testy struktury DOM:');

  const title = await driver.getTitle();
  await assert('Tytuł strony nie jest pusty', title.length > 0);

  try {
    await driver.findElement(By.tagName('form'));
    await assert('Formularz <form> istnieje', true);
  } catch {
    await assert('Formularz <form> istnieje', false);
  }

  for (const fieldId of [
    'gender',
    'age',
    'height',
    'weight',
    'activity',
    'goal',
  ]) {
    try {
      await driver.findElement(By.id(fieldId));
      await assert(`Pole formularza: #${fieldId}`, true);
    } catch {
      await assert(`Pole formularza: #${fieldId}`, false, 'nie znaleziono');
    }
  }

  try {
    await driver.findElement(By.id('calculateBtn'));
    await assert('Przycisk #calculateBtn istnieje', true);
  } catch {
    await assert('Przycisk #calculateBtn istnieje', false);
  }

  for (const cardId of ['deficit', 'maintain', 'gain']) {
    try {
      await driver.findElement(By.id(cardId));
      await assert(`Karta wyników: #${cardId}`, true);
    } catch {
      await assert(`Karta wyników: #${cardId}`, false);
    }
  }

  for (const elId of ['proteinGrams', 'carbGrams', 'fatGrams']) {
    try {
      await driver.findElement(By.id(elId));
      await assert(`Makroskładnik: #${elId}`, true);
    } catch {
      await assert(`Makroskładnik: #${elId}`, false);
    }
  }

  try {
    await driver.findElement(By.tagName('header'));
    await driver.findElement(By.tagName('footer'));
    await assert('Header i footer istnieją', true);
  } catch {
    await assert('Header i footer istnieją', false);
  }

  try {
    await driver.findElement(By.id('polishBtn'));
    await driver.findElement(By.id('englishBtn'));
    await assert('Przyciski języka PL/ENG istnieją', true);
  } catch {
    await assert('Przyciski języka PL/ENG istnieją', false);
  }
}

async function testObliczenia(driver) {
  console.log('\n🧮 Testy obliczeń:');

  await driver.get(BASE_URL);
  await sleep(500);

  await fillForm(driver, {
    gender: 'male',
    age: '28',
    height: '180',
    weight: '82',
    activity: 'moderate',
    goal: 'lose_weight',
  });

  const deficit = await getNumber(driver, 'deficit');
  const maintain = await getNumber(driver, 'maintain');
  const gain = await getNumber(driver, 'gain');

  await assert('Deficyt > 1500 kcal', deficit > 1500, `było: ${deficit}`);
  await assert('Deficyt < 2800 kcal', deficit < 2800, `było: ${deficit}`);
  await assert(
    'Utrzymanie > Deficyt',
    maintain > deficit,
    `${maintain} > ${deficit}`,
  );
  await assert('Wzrost > Utrzymanie', gain > maintain, `${gain} > ${maintain}`);

  const bmr = await getNumber(driver, 'bmr');
  const tdee = await getNumber(driver, 'tdee');
  await assert('BMR > 0', bmr > 0, `było: ${bmr}`);
  await assert('TDEE > 0', tdee > 0, `było: ${tdee}`);
  await assert('TDEE > BMR', tdee > bmr, `${tdee} > ${bmr}`);

  const goalText = await driver.findElement(By.id('goal-text')).getText();
  await assert(
    "Tekst celu nie jest '(brak celu)'",
    goalText.trim() !== '(brak celu)',
    `było: "${goalText}"`,
  );

  await driver.get(BASE_URL);
  await sleep(500);
  await fillForm(driver, {
    gender: 'female',
    age: '25',
    height: '165',
    weight: '60',
    activity: 'light',
    goal: 'lose_weight',
  });

  const deficitF = await getNumber(driver, 'deficit');
  const maintainF = await getNumber(driver, 'maintain');
  await assert('Kobieta: Deficyt > 1000', deficitF > 1000, `było: ${deficitF}`);
  await assert('Kobieta: Utrzymanie > Deficyt', maintainF > deficitF);
}

async function testMotywIJezyk(driver) {
  console.log('\n🎨 Testy motywu i języka:');

  await driver.get(BASE_URL);
  await sleep(500);

  const htmlEl = await driver.findElement(By.tagName('html'));
  const themeBefore = await htmlEl.getAttribute('data-theme');
  await driver.findElement(By.id('changeThemeBtn')).click();
  await sleep(500);
  const themeAfter = await htmlEl.getAttribute('data-theme');
  await assert(
    'Motyw zmienia się po kliknięciu',
    themeBefore !== themeAfter,
    `przed: ${themeBefore}, po: ${themeAfter}`,
  );

  await driver.findElement(By.id('englishBtn')).click();
  await sleep(1000);
  const url = await driver.getCurrentUrl();
  await assert(
    'Kliknięcie ENG przekierowuje na /ENG/',
    url.includes('ENG'),
    `aktualny URL: ${url}`,
  );
}

async function testWalidacja(driver) {
  console.log('\n🛡️  Testy walidacji:');

  await driver.get(BASE_URL);
  await sleep(500);

  const deficitBefore = await driver.findElement(By.id('deficit')).getText();
  await driver.findElement(By.id('calculateBtn')).click();
  await sleep(500);
  const deficitAfter = await driver.findElement(By.id('deficit')).getText();
  await assert(
    'Pusty formularz nie zmienia wyników',
    deficitBefore === deficitAfter,
    `przed: "${deficitBefore}", po: "${deficitAfter}"`,
  );
}

async function run() {
  console.log('🚀 Selenium WebDriver – Kalkulator kalorii');
  console.log('===========================================');
  console.log(`URL: ${BASE_URL}`);

  const opts = new chrome.Options();
  if (HEADLESS) opts.addArguments('--headless=new');
  opts.addArguments('--no-sandbox', '--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(opts)
    .build();

  try {
    await driver.get(BASE_URL);
    await sleep(500);

    await testStruktura(driver);
    await testObliczenia(driver);
    await testMotywIJezyk(driver);
    await testWalidacja(driver);
  } catch (err) {
    console.error('\n💥 Nieoczekiwany błąd:', err.message);
  } finally {
    await driver.quit();
  }

  // ── Podsumowanie ──
  console.log('\n===========================================');
  console.log('📊 Wyniki:');
  results.forEach((r) => console.log(r));
  console.log('===========================================');
  console.log(`✅ Zaliczone: ${passed}`);
  console.log(`❌ Niezaliczone: ${failed}`);
  console.log(`📝 Łącznie: ${passed + failed}`);

  if (failed === 0) {
    console.log('\n🎉 Wszystkie testy zaliczone!');
  } else {
    console.log(`\n⚠️  ${failed} test(y) wymaga poprawki.`);
    process.exit(1);
  }
}

run();
