/* main.js — мінімум: мобільне меню, фільтри, кількість товару, перемикання вигляду */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const desktop = window.matchMedia('(min-width: 56.01rem)'); // збігається з @media (max-width: 56rem) у CSS

  /* 1. Мобільне меню: CSS реагує на aria-expanded через :has() */
  const toggle = $('.menu-toggle');
  if (toggle) {
    const setMenu = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    };
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    toggle.addEventListener('click', () => setMenu(!isOpen()));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) { setMenu(false); toggle.focus(); }
    });
    $$('#site-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    desktop.addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* 2. Фільтри: на десктопі завжди відкриті, на мобільних згорнуті */
  const panel = $('.filters__panel');
  if (panel) {
    const syncPanel = () => { panel.open = desktop.matches; };
    syncPanel();
    desktop.addEventListener('change', syncPanel);

    // Кнопка Reset лежить усередині <summary>: не даємо їй згортати панель
    $('.filters__reset')?.addEventListener('click', (e) => e.stopPropagation());
  }

  /* 3. Кількість товару + ціна на кнопці «Add to bag» */
  const qty = $('.qty');
  if (qty) {
    const output = $('.qty__value', qty);
    const submit = $('.buy .btn');
    const unit = parseFloat($('.product__price')?.textContent.replace(/[^\d.]/g, '')) || 0;
    let value = 1;

    const render = () => {
      output.textContent = value;
      if (submit) submit.textContent = `Add to bag — $${(unit * value).toLocaleString('en-US')}`;
    };

    qty.addEventListener('click', (e) => {
      const btn = e.target.closest('.qty__btn');
      if (!btn) return;
      value = Math.min(10, Math.max(1, value + (btn.getAttribute('aria-label').startsWith('Increase') ? 1 : -1)));
      render();
    });
  }

  /* 4. Перемикання вигляду каталогу: сітка / список.
        У списку картки стають широкими, тому спрацьовує @container card (min-width: 28rem) */
  const grid = $('.grid-cards--catalog');
  const viewButtons = $$('[data-view]');
  if (grid && viewButtons.length) {
    const KEY = 'catalog-view';
    const apply = (view) => {
      grid.classList.toggle('is-list', view === 'list');
      viewButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    };

    let saved = 'grid';
    try { saved = localStorage.getItem(KEY) || 'grid'; } catch { /* storage недоступний */ }
    apply(saved);

    viewButtons.forEach((b) => b.addEventListener('click', () => {
      apply(b.dataset.view);
      try { localStorage.setItem(KEY, b.dataset.view); } catch { /* ігноруємо */ }
    }));
  }

  /* 5. Демо-форми: без бекенду просто показуємо підтвердження */
  $$('.newsletter__form, .form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = $('button[type="submit"]', form);
      if (btn) { btn.textContent = 'Done — thank you!'; btn.disabled = true; }
      form.reset();
    });
  });
})();
