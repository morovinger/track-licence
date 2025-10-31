'use strict';

// Global container for Yandex.Metrika Enhanced Ecommerce
window.dataLayer = window.dataLayer || [];

(function () {
  var CURRENCY = 'RUB';

  class Catalog {
    constructor() {
      this.byId = {
        // Курсы
        course_tractor_b_c_d_e: { id: 'course_tractor_b_c_d_e', name: 'Тракторист - В, С, D, E', price: 7000, category: 'Курсы/Тракторист' },
        course_category_f: { id: 'course_category_f', name: 'Категория - F', price: 7000, category: 'Курсы/Категории' },
        course_loader_driver: { id: 'course_loader_driver', name: 'Водитель погрузчика', price: 7000, category: 'Курсы/Погрузчик' },
        course_excavator_driver: { id: 'course_excavator_driver', name: 'Машинист экскаватора', price: 7000, category: 'Курсы/Экскаватор' },
        course_bulldozer_driver: { id: 'course_bulldozer_driver', name: 'Машинист бульдозера', price: 7000, category: 'Курсы/Бульдозер' },
        course_roller_driver: { id: 'course_roller_driver', name: 'Машинист катка', price: 7000, category: 'Курсы/Каток' },
        course_a1: { id: 'course_a1', name: 'Категория А1', price: 7000, category: 'Курсы/Категории' },
        course_a2: { id: 'course_a2', name: 'Категория А2', price: 8000, category: 'Курсы/Категории' },
        // Пакеты (на случай использования на страницах тарифов)
        pack_universal: { id: 'pack_universal', name: 'Универсал', price: 40000, category: 'Пакеты' },
        pack_specialist: { id: 'pack_specialist', name: 'Специалист', price: 52000, category: 'Пакеты' },
        pack_professional: { id: 'pack_professional', name: 'Профессионал', price: 59000, category: 'Пакеты' },
        pack_master: { id: 'pack_master', name: 'Мастер', price: 73000, category: 'Пакеты' }
      };
      this.byName = {};
      for (var k in this.byId) {
        if (Object.prototype.hasOwnProperty.call(this.byId, k)) {
          this.byName[this.byId[k].name.toLowerCase()] = this.byId[k];
        }
      }
    }

    resolveFromEl(el) {
      if (!el) return null;
      var sku = el.dataset && el.dataset.sku;
      var name = el.dataset && el.dataset.name;
      var price = el.dataset && el.dataset.price;
      var category = el.dataset && el.dataset.category;

      var p = null;
      if (sku && this.byId[sku]) p = this.byId[sku];
      else if (name && this.byName[String(name).trim().toLowerCase()]) p = this.byName[String(name).trim().toLowerCase()];
      if (!p) return null;

      var out = Object.assign({}, p);
      if (price != null) out.price = Number(String(price).replace(/[^\d.]/g, ''));
      if (category) out.category = category;
      return out;
    }
  }

  class EcomTracker {
    push(obj) {
      window.dataLayer.push({ ecommerce: Object.assign({ currencyCode: CURRENCY }, obj) });
    }
    detail(product) {
      this.push({ detail: { products: [product] } });
    }
    add(product, q) {
      this.push({ add: { products: [Object.assign({}, product, { quantity: q || 1 })] } });
    }
    remove(product, q) {
      this.push({ remove: { products: [Object.assign({}, product, { quantity: q || 1 })] } });
    }
    impressions(listItems) {
      this.push({ impressions: listItems });
    }
    click(list, product, pos) {
      this.push({ click: { actionField: { list: list }, products: [{ id: product.id, name: product.name, position: pos }] } });
    }
    purchase(orderId, revenue, products) {
      this.push({ purchase: { actionField: { id: orderId, revenue: revenue, affiliation: 'Craftum' }, products: products } });
    }
  }

  class Binder {
    constructor(catalog, tracker) {
      this.catalog = catalog;
      this.tracker = tracker;
    }

    listName() {
      var p = location.pathname || '/';
      if (p === '/' || p.indexOf('/page2') === 0) return 'Главная/Курсы';
      if (p.indexOf('/vse-kursy') === 0) return 'Все курсы';
      if (p.indexOf('/tarif') === 0) return 'Тарифы';
      return 'Каталог';
    }

    bindImpressions() {
      var list = this.listName();
      var cards = Array.prototype.slice.call(document.querySelectorAll('[data-card="product"], [data-sku]'));
      if (!cards.length || typeof IntersectionObserver === 'undefined') return;

      var seen = new WeakSet();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting || seen.has(e.target)) return;
          var product = this.catalog.resolveFromEl(e.target);
          if (!product) return;
          seen.add(e.target);
          var pos = cards.indexOf(e.target) + 1;
          this.tracker.impressions([{ id: product.id, name: product.name, price: product.price, category: product.category, list: list, position: pos }]);
        }.bind(this));
      }.bind(this), { threshold: 0.5 });

      cards.forEach(function (c) { io.observe(c); });

      document.addEventListener('click', function (ev) {
        var card = ev.target && ev.target.closest && ev.target.closest('[data-card="product"], [data-sku]');
        if (!card) return;
        var product = this.catalog.resolveFromEl(card);
        if (!product) return;
        var pos = cards.indexOf(card) + 1;
        this.tracker.click(list, product, pos);
      }.bind(this));
    }

    bindAddButtons() {
      var ADD_TEXTS = ['ОСТАВИТЬ ЗАЯВКУ', 'ВЫБРАТЬ', 'ЗАПИСАТЬСЯ'];
      var buttons = document.querySelectorAll('button, a');
      Array.prototype.forEach.call(buttons, function (btn) {
        var text = (btn.textContent || '').trim().toUpperCase();
        if (ADD_TEXTS.indexOf(text) === -1) return;
        btn.addEventListener('click', function () {
          var host = btn.closest('[data-card="product"], [data-sku]') || btn;
          var product = this.catalog.resolveFromEl(host);
          if (!product) return;
          try { sessionStorage.setItem('lastProduct', JSON.stringify(product)); } catch (_) {}
          this.tracker.add(product, 1);
          this.tracker.detail(product);
        }.bind(this));
      }.bind(this));
    }

    bindPurchaseOnThanks() {
      var thanks = document.querySelector('[data-thanks="1"]');
      if (!thanks) return;
      var saved = null;
      try { saved = sessionStorage.getItem('lastProduct'); } catch (_) { saved = null; }
      if (!saved) return;
      try {
        var product = JSON.parse(saved);
        var orderId = 'L' + Date.now();
        var revenue = Number(product && product.price ? product.price : 0);
        this.tracker.purchase(orderId, revenue, [Object.assign({}, product, { quantity: 1 })]);
        sessionStorage.removeItem('lastProduct');
      } catch (_) {}
    }

    bindRemoveInBuilder() {
      document.addEventListener('click', function (e) {
        var toggler = e.target && e.target.closest && e.target.closest('[data-toggle-sku]');
        if (!toggler) return;
        var sku = toggler.getAttribute('data-toggle-sku');
        var host = document.querySelector('[data-sku="' + sku + '"]') || toggler;
        var product = this.catalog.resolveFromEl(host);
        if (!product) return;
        var selected = toggler.getAttribute('aria-pressed') === 'true' || toggler.classList.contains('is-active');
        if (selected) this.tracker.remove(product, 1);
        else this.tracker.add(product, 1);
      }.bind(this));
    }

    init() {
      this.bindImpressions();
      this.bindAddButtons();
      this.bindPurchaseOnThanks();
      this.bindRemoveInBuilder();
    }
  }

  function start() {
    try {
      var catalog = new Catalog();
      var tracker = new EcomTracker();
      new Binder(catalog, tracker).init();
    } catch (_) { /* no-op */ }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();


