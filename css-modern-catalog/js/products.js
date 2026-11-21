/* products.js — дані товарів і рендер product.html?id=... */
(() => {
  'use strict';

  if (!document.body.classList.contains('page--product')) return;

  const PRODUCTS = {
    'sonic-pro': {
      name: 'Sonic Pro', category: 'Audio',
      eyebrow: 'Sound, without distractions',
      sub: 'Wireless noise-cancelling headphones',
      price: 249, rating: 4.9, reviews: 128,
      desc: 'Immersive sound. A little more quiet. Meet your everyday escape, from the first track to the last call.',
      colors: [{ name: 'Midnight', hex: '#1b2a4a' }],
      specs: [['Battery life', '40 hours'], ['Less noise, more focus', 'Adaptive ANC'], ['Effortlessly connected', 'Bluetooth 5.3']],
      notes: [
        ['You feel every note', 'Precision-tuned 40 mm drivers deliver rich lows and crisp, detailed highs.'],
        ['You find your focus', 'Adaptive noise cancellation helps you tune in and switch off.'],
        ['You go all day', 'Up to 40 hours of listening. A quick 10-minute charge gives 5 more.']
      ],
      box: 'Sonic Pro headphones, travel case, USB-C charging cable, 3.5 mm audio cable.'
    },
    'novabook-air-14': {
      name: 'NovaBook Air 14', category: 'Computing',
      eyebrow: 'Powerfully light',
      sub: '14-inch ultralight laptop',
      price: 1199, rating: 4.8, reviews: 86,
      desc: 'Powerfully light. Ready for anything. A laptop that keeps up with your day, wherever it takes you.',
      colors: [{ name: 'Silver', hex: '#cbd5e1' }, { name: 'Graphite', hex: '#334155' }],
      specs: [['Battery life', '18 hours'], ['Light enough to carry', '1.2 kg'], ['Sharp and bright', '14" 2.8K display']],
      notes: [
        ['You work anywhere', 'A full day of battery life means you can leave the charger at home.'],
        ['You stay in flow', 'Fast storage and a quiet, fanless design keep everything smooth.'],
        ['You take it everywhere', 'At just 1.2 kg and 12 mm thin, it disappears into your bag.']
      ],
      box: 'NovaBook Air 14, 65 W USB-C charger, USB-C cable, quick start guide.'
    },
    'pulse-watch': {
      name: 'Pulse Watch', category: 'Wearables',
      eyebrow: 'Your day, a little more connected',
      sub: 'Everyday smartwatch',
      price: 199, rating: 4.8, reviews: 64,
      desc: 'Your day, a little more connected. Track your health, stay on top of notifications, and keep moving.',
      colors: [{ name: 'Black', hex: '#111827' }, { name: 'Sand', hex: '#d6c7a8' }, { name: 'Blue', hex: '#2563eb' }],
      specs: [['Battery life', '7 days'], ['Ready for any weather', '5 ATM'], ['Know your body', 'Heart rate & SpO₂']],
      notes: [
        ['You stay in sync', 'Calls, messages, and reminders appear right on your wrist.'],
        ['You know your rhythm', 'Continuous heart rate, sleep, and activity tracking.'],
        ['You go for days', 'Up to 7 days on a single charge, with a full top-up in an hour.']
      ],
      box: 'Pulse Watch, magnetic charging cable, extra strap, quick start guide.'
    },
    'orbit-mini': {
      name: 'Orbit Mini', category: 'Audio',
      eyebrow: 'Big sound, small size',
      sub: 'Portable Bluetooth speaker',
      price: 89, rating: 4.9, reviews: 93,
      desc: 'Room-filling sound. Anywhere. Small enough for your bag, loud enough for the whole room.',
      colors: [{ name: 'Charcoal', hex: '#1f2937' }, { name: 'Sky', hex: '#7dd3fc' }],
      specs: [['Battery life', '12 hours'], ['Built for outdoors', 'IP67'], ['Effortlessly connected', 'Bluetooth 5.3']],
      notes: [
        ['You fill the room', 'A dual-driver design gives surprisingly full sound for its size.'],
        ['You take it anywhere', 'Dust-proof and waterproof, so rain and sand are no problem.'],
        ['You pair in seconds', 'Connect two Orbit Minis together for true stereo sound.']
      ],
      box: 'Orbit Mini speaker, USB-C charging cable, wrist strap.'
    }
  };

  const DEFAULT_ID = 'sonic-pro';
  const money = (n) => `$${n.toLocaleString('en-US')}`;
  const $ = (name) => document.querySelector(`[data-p="${name}"]`);
  const text = (name, value) => { const el = $(name); if (el) el.textContent = value; };

  /* Який товар показати: ?id=pulse-watch. Невідомий id → товар за замовчуванням */
  const id = new URLSearchParams(location.search).get('id');
  const key = Object.hasOwn(PRODUCTS, id) ? id : DEFAULT_ID;
  const p = PRODUCTS[key];

  /* <head> */
  document.title = `${p.name} — Techno Stan`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', `${p.desc}`);

  /* Прості текстові поля */
  text('crumb-cat', p.category);
  text('crumb-name', p.name);
  text('eyebrow', p.eyebrow);
  text('title', p.name);
  text('sub', p.sub);
  text('price', money(p.price));
  text('desc', p.desc);
  text('box', p.box);
  text('buy-label', `Add to bag — ${money(p.price)}`);
  text('color-name', p.colors[0].name);

  const rating = $('rating');
  if (rating) rating.innerHTML = `<span aria-hidden="true">★★★★★</span> ${p.rating} · ${p.reviews} reviews`;

  const img = $('image');
  if (img) { img.src = `assets/images/${key}.jpg`; img.alt = `${p.name} — ${p.sub}`; }

  /* Характеристики (Subgrid у .specs) */
  $('specs').innerHTML = p.specs
    .map(([label, value]) => `<div class="specs__item"><dt>${label}</dt><dd>${value}</dd></div>`)
    .join('');

  /* Нотатки (Subgrid у .notes) */
  $('notes').innerHTML = p.notes
    .map(([title, body]) => `<li class="note"><h3 class="note__title">${title}</h3><p>${body}</p></li>`)
    .join('');

  /* Кольори */
  const swatches = $('swatches');
  swatches.innerHTML = p.colors.map((c, i) => `
    <label class="swatch">
      <input type="radio" name="color" value="${c.name}" ${i === 0 ? 'checked' : ''}>
      <span class="swatch__dot" style="--swatch:${c.hex}"></span>
      <span class="visually-hidden">${c.name}</span>
    </label>`).join('');
  swatches.addEventListener('change', (e) => text('color-name', e.target.value));

  /* «Схожі товари»: усі, крім поточного (кожен <li> — container для Container Queries) */
  $('related').innerHTML = Object.entries(PRODUCTS)
    .filter(([k]) => k !== key)
    .map(([k, r]) => `
      <li>
        <article class="card">
          <a class="card__media" href="product.html?id=${k}"><img src="assets/images/${k}.jpg" alt="${r.name}" loading="lazy"></a>
          <div class="card__body">
            <p class="card__cat">${r.category}</p>
            <h3 class="card__title"><a href="product.html?id=${k}">${r.name}</a></h3>
            <p class="card__price">${money(r.price)}</p>
          </div>
        </article>
      </li>`).join('');
})();