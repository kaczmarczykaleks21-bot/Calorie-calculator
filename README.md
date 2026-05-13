# 🔥 Kalkulator Kalorii

Prosty, szybki kalkulator kalorii jako **one-page** — bez logowania, bez rejestracji, bez backendu. Użytkownik wpisuje dane i natychmiast dostaje wyniki.

---

## ✨ Funkcje

- 📊 Obliczanie **BMR** (podstawowej przemiany materii) wzorem Mifflin-St Jeor
- ⚡ Obliczanie **TDEE** (całkowitego zapotrzebowania kalorycznego)
- 🎯 Trzy cele kaloryczne: **deficyt** (−500 kcal), **utrzymanie**, **masa** (+300 kcal)
- 🥩 Rozkład **makroskładników** (białko, węglowodany, tłuszcze) dopasowany do celu
- 🌙 **Dark / Light mode** — automatyczne wykrycie preferencji systemu + ręczny przełącznik
- 🌍 **PL / EN** — automatyczne wykrycie języka przeglądarki + ręczny przełącznik
- 💾 Zapamiętywanie preferencji w `localStorage`
- 📱 W pełni responsywny (mobile-first)

---

## 🗂️ Struktura projektu

```
Calorie-calculator/
├── PL/
│   └── index.html          ← wersja polska
├── ENG/
│   └── index.html          ← wersja angielska
├── Assets/
│   ├── CSS/
│   │   └── style.css       ← style + CSS variables + dark mode
│   ├── JS/
│   │   ├── main.js         ← punkt wejścia, łączy moduły
│   │   ├── calculator.js   ← logika obliczeń (BMR, TDEE, makro)
│   │   ├── render.js         ← obsługa DOM, renderowanie wyników
│   │   ├── theme.js        ← dark/light mode
│   │   └── i18n.js         ← obsługa języków PL/EN
│   └── IMG/                ← ikonki SVG, obrazki
└── mockup/                 ← pliki projektowe
```

---

## 🧮 Wzory obliczeniowe

**BMR — Mifflin-St Jeor:**

```
Mężczyzna:  BMR = 88.36 + (13.4 × waga) + (4.8 × wzrost) − (5.7 × wiek)
Kobieta:    BMR = 447.6 + (9.25 × waga) + (3.1 × wzrost) − (4.33 × wiek)
```

**TDEE:**

```
TDEE = BMR × współczynnik aktywności
```

| Aktywność                           | Współczynnik |
| ----------------------------------- | ------------ |
| Siedzący                            | 1.2          |
| Lekko aktywny (1–3 dni/tyg.)        | 1.375        |
| Umiarkowanie aktywny (3–5 dni/tyg.) | 1.55         |
| Bardzo aktywny (6–7 dni/tyg.)       | 1.725        |
| Ekstremalnie aktywny                | 1.9          |

**Cele kaloryczne:**

```
Deficyt    = TDEE − 500 kcal
Utrzymanie = TDEE
Masa       = TDEE + 300 kcal
```

**Makroskładniki:**

| Cel        | Białko    | Tłuszcze | Węgle  |
| ---------- | --------- | -------- | ------ |
| Deficyt    | 2.2g / kg | 25% kcal | reszta |
| Utrzymanie | 1.8g / kg | 30% kcal | reszta |
| Masa       | 2.0g / kg | 25% kcal | reszta |

---

## 🎨 Design

**Paleta kolorów — Energia (granat + bursztyn):**

```css
--color-accent: #185fa5;
--color-page-bg: #f0f7fe;
--color-deficyt: #e24b4a;
--color-utrzymanie: #185fa5;
--color-masa: #ba7517;
```

**Font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — Google Fonts

---

## ⚙️ Architektura JS

Projekt używa natywnych **ES Modules** (`type="module"`) bez żadnych bundlerów ani frameworków.

Każdy moduł ma jedną odpowiedzialność:

| Moduł           | Odpowiedzialność                                        |
| --------------- | ------------------------------------------------------- |
| `calculator.js` | Czysta logika — liczy liczby, zero DOM                  |
| `render.js`     | Obsługa DOM — wszystkie ID i selektory w jednym miejscu |
| `theme.js`      | Dark / Light mode                                       |
| `i18n.js`       | Tłumaczenia PL / EN                                     |
| `main.js`       | Łączy moduły, zero własnej logiki                       |

```html
<!-- W HTML ładujesz tylko jeden plik -->
<script type="module" src="/Assets/JS/main.js"></script>
```

---

## 🌍 Wielojęzyczność

Strona automatycznie wykrywa język przeglądarki:

```javascript
const lang = navigator.language.startsWith('pl') ? 'pl' : 'en';
```

Wybór użytkownika zapisywany w `localStorage` i respektowany przy kolejnych wizytach. Wersje językowe to osobne pliki HTML (`/PL/` i `/ENG/`) z tagami `hreflang` dla SEO.

---

## 🌙 Dark Mode

Automatyczne wykrycie preferencji systemu:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-page-bg: #0a1929;
  }
}
```

Ręczny przełącznik zapisuje wybór w `localStorage`. Skrypt inicjalizujący wstawiany jako **pierwszy element `<head>`** — eliminuje migotanie przy ładowaniu strony.

---

## 🚀 Uruchomienie

Projekt nie wymaga żadnych dependencji ani build stepów — to czysty HTML/CSS/JS.

```bash
# sklonuj repozytorium
git clone https://github.com/twoj-nick/Calorie-calculator.git
cd Calorie-calculator

# uruchom lokalny serwer (wymagany dla ES Modules)
npx serve .
# lub
python -m http.server 8080
```

Otwórz `http://localhost:8080/PL/` w przeglądarce.

> ⚠️ ES Modules nie działają po otwarciu pliku bezpośrednio (`file://`). Wymagany jest lokalny serwer HTTP.

---

## 📈 SEO

- Semantyczny HTML5 (`<main>`, `<section>`, `<article>`)
- Meta tagi `og:` dla social sharing
- `hreflang` dla wersji językowych
- Schema markup `FAQPage` + `WebApplication` (JSON-LD)
- Core Web Vitals — SVG zamiast PNG, `display=swap` dla fontów, `defer` dla JS

---

## 📄 Licencja

MIT — możesz używać, modyfikować i dystrybuować.
