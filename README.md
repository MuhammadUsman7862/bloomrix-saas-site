# Bloomrix – Tailwind CSS SaaS site

Setup: `npm install` then `npm run build` (or `npm run watch` while editing).
Open `index.html` in a browser. Pages: index, pricing, dashboard, profile.

- `src/input.css` – Tailwind input + reusable components (buttons, cards, forms, badges, alerts, nav links, pricing cards, stat cards)
- `tailwind.config.js` – custom colors, fonts, spacing, shadows, radius, dark mode (class)
- `src/js/app.js` – theme toggle (localStorage), shared header/sidebar/footer, pricing toggle, table search/filter/pagination, profile forms
- `dist/output.css` – generated CSS
- `test.py` – Playwright checks + screenshots (`screenshots/`)
