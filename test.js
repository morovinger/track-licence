// Глобальный скрипт для всех страниц (Craftum: общий HTML/футер)
(function () {
  'use strict';

  const CURRENCY = 'RUB';
  const LAST_PRODUCT_KEY = 'track-licence:last-product';
  const PRODUCT_NODE_SELECTOR = '[data-sku],[data-product],[data-card="product"],[data-course],.card,.tariff-block';
  const CTA_TEXTS = [
    'ОСТАВИТЬ ЗАЯВКУ',
    'ВЫБРАТЬ',
    'ЗАПИСАТЬСЯ',
    'ЗАПИСАТЬСЯ НА КУРС',
    'ЗАПИСАТЬСЯ СЕЙЧАС',
    'ЗАПИСАТЬСЯ НА ОБУЧЕНИЕ'
  ];
  const CTA_PREFIXES = ['ЗАПИСАТЬСЯ'];

  const PRODUCT_DEFINITIONS = [
    { id: 'course_tractor_b_c_d_e', name: 'Тракторист - В, С, D, E', price: 7000, category: 'Курсы/Комплекс', aliases: ['тракторист bcde', 'тракторист в с d e', 'обучение на тракторист - в, с, d, e'] },
    { id: 'course_tractor_b', name: 'Тракторист B', price: 7000, category: 'Курсы/Тракторист', aliases: ['тракторист b', 'категория b'] },
    { id: 'course_tractor_c', name: 'Тракторист C', price: 7000, category: 'Курсы/Тракторист', aliases: ['тракторист c', 'категория c'] },
    { id: 'course_tractor_d', name: 'Тракторист D', price: 7000, category: 'Курсы/Тракторист', aliases: ['тракторист d', 'категория d'] },
    { id: 'course_tractor_e', name: 'Тракторист E', price: 7000, category: 'Курсы/Тракторист', aliases: ['тракторист e', 'категория e'] },
    { id: 'course_category_f', name: 'Категория - F', price: 7000, category: 'Курсы/Категории', aliases: ['категория f', 'комбайн', 'категория - f (комбайн)'] },
    { id: 'course_a1', name: 'Категория А1', price: 7000, category: 'Курсы/Категории', aliases: ['категория а1', 'мототранспорт', 'а i'] },
    { id: 'course_a2', name: 'Категория А2', price: 8000, category: 'Курсы/Категории', aliases: ['категория а2', 'вездеходы', 'a ii'] },
    { id: 'course_loader_driver', name: 'Водитель погрузчика', price: 7000, category: 'Курсы/Погрузчик', aliases: ['погрузчик', 'водитель погрузчика'] },
    { id: 'course_excavator_driver', name: 'Машинист экскаватора', price: 7000, category: 'Курсы/Экскаватор', aliases: ['экскаваторщик', 'машинист экскаватора'] },
    { id: 'course_bulldozer_driver', name: 'Машинист бульдозера', price: 7000, category: 'Курсы/Бульдозер', aliases: ['бульдозерист'] },
    { id: 'course_roller_driver', name: 'Машинист катка', price: 7000, category: 'Курсы/Каток', aliases: ['каток', 'машинист катка'] },
    { id: 'course_grader_operator', name: 'Машинист автогрейдера', price: 7000, category: 'Курсы/Автогрейдер', aliases: ['автогрейдер'] },
    { id: 'course_road_milling_operator', name: 'Машинист фрезы дорожной', price: 7000, category: 'Курсы/Дорфреза', aliases: ['фреза дорожная'] },
    { id: 'course_drilling_rig_operator', name: 'Машинист буровой установки', price: 7000, category: 'Курсы/Буровая', aliases: ['буровая установка'] },
    { id: 'course_skidder_operator', name: 'Машинист трелевочной машины', price: 7000, category: 'Курсы/Трелевочная', aliases: ['трелевочной машины', 'трелевочная машина'] },
    { id: 'course_piledriver_operator', name: 'Машинист копра', price: 7000, category: 'Курсы/Копер', aliases: ['копра'] },
    { id: 'course_reloader_operator', name: 'Машинист перегружателя', price: 7000, category: 'Курсы/Перегружатель', aliases: ['перегружателя'] },
    { id: 'course_crane_operator', name: 'Машинист крана (крановщик)', price: 7000, category: 'Курсы/Кран', aliases: ['машинист крана', 'крановщик'] },
    { id: 'pack_universal', name: 'Универсал', price: 40000, category: 'Пакеты', aliases: ['пакет универсал', 'тариф универсал'] },
    { id: 'pack_specialist', name: 'Специалист', price: 52000, category: 'Пакеты', aliases: ['пакет специалист', 'тариф специалист'] },
    { id: 'pack_professional', name: 'Профессионал', price: 59000, category: 'Пакеты', aliases: ['пакет профессионал', 'тариф профессионал'] },
    { id: 'pack_master', name: 'Мастер', price: 73000, category: 'Пакеты', aliases: ['пакет мастер', 'тариф мастер'] }
  ];

  window.dataLayer = window.dataLayer || [];

  class Catalog {
    constructor(definitions) {
      this.byId = {};
      this.aliasToId = new Map();
      definitions.forEach((product) => this.register(product));
      // Sort aliases once for deterministic substring search.
      this.aliasEntries = Array.from(this.aliasToId.entries()).sort((a, b) => b[0].length - a[0].length);
    }

    register(product) {
      var clone = Object.assign({}, product);
      this.byId[clone.id] = clone;
      this.addAlias(clone.name, clone.id);
      (clone.aliases || []).forEach((alias) => this.addAlias(alias, clone.id));
    }

    addAlias(label, id) {
      var key = normalizeName(label);
      if (!key) return;
      this.aliasToId.set(key, id);
    }

    resolveLabel(label) {
      if (!label) return null;
      var direct = this.aliasToId.get(normalizeName(label));
      if (direct) return this.cloneProduct(direct);
      var normalized = normalizeName(label);
      if (!normalized) return null;
      for (var i = 0; i < this.aliasEntries.length; i++) {
        var alias = this.aliasEntries[i][0];
        var id = this.aliasEntries[i][1];
        if (normalized.includes(alias)) return this.cloneProduct(id);
      }
      return null;
    }

    resolveFromElement(el) {
      var host = el && el.closest && el.closest(PRODUCT_NODE_SELECTOR);
      if (!host) return null;

      var descriptor = this.extractDescriptor(host);
      var product = null;

      if (descriptor.sku) product = this.cloneProduct(descriptor.sku);
      if (!product && descriptor.course) product = this.resolveLabel(descriptor.course);
      if (!product && descriptor.name) product = this.resolveLabel(descriptor.name);
      if (!product && descriptor.title) product = this.resolveLabel(descriptor.title);
      if (!product && descriptor.text) product = this.resolveLabel(descriptor.text);

      if (!product) return null;

      if (typeof descriptor.price === 'number' && !Number.isNaN(descriptor.price) && descriptor.price > 0) {
        product.price = descriptor.price;
      }
      if (descriptor.category) {
        product.category = descriptor.category;
      }
      return product;
    }

    extractDescriptor(host) {
      var dataset = host.dataset || {};
      return {
        sku: dataset.sku || null,
        course: dataset.course || null,
        name: dataset.name || null,
        price: parsePrice(dataset.price),
        category: dataset.category || null,
        title: this.lookupTitle(host),
        text: truncateText(host.textContent, 160)
      };
    }

    lookupTitle(host) {
      var selectors = ['[data-name]', '.tariff-title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      for (var i = 0; i < selectors.length; i++) {
        var node = host.querySelector(selectors[i]);
        if (node && node.textContent) return node.textContent;
      }
      if (host.getAttribute && host.getAttribute('aria-label')) {
        return host.getAttribute('aria-label');
      }
      return null;
    }

    cloneProduct(id) {
      var base = this.byId[id];
      return base ? Object.assign({}, base) : null;
    }
  }

  class EcommerceTracker {
    push(payload) {
      window.dataLayer.push({ ecommerce: Object.assign({ currencyCode: CURRENCY }, payload) });
    }
    detail(product) {
      this.push({ detail: { products: [product] } });
    }
    add(product, qty) {
      this.push({ add: { products: [Object.assign({}, product, { quantity: qty || 1 })] } });
    }
    remove(product, qty) {
      this.push({ remove: { products: [Object.assign({}, product, { quantity: qty || 1 })] } });
    }
    impressions(listItems) {
      this.push({ impressions: listItems });
    }
    click(list, product, position) {
      this.push({ click: { actionField: { list: list }, products: [{ id: product.id, name: product.name, position: position }] } });
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

    init() {
      this.bindImpressions();
      this.bindAddButtons();
      this.bindRemoveInBuilder();
      this.bindPurchaseOnThanks();
    }

    getListName() {
      var pathname = location.pathname || '/';
      if (pathname.indexOf('/page2') === 0 || pathname === '/') return 'Главная/Курсы';
      if (pathname.indexOf('/vse-kursy') === 0) return 'Все курсы';
      if (pathname.indexOf('/tarif') === 0) return 'Тарифы';
      return 'Каталог';
    }

    bindImpressions() {
      var list = this.getListName();
      var nodes = Array.prototype.slice.call(document.querySelectorAll(PRODUCT_NODE_SELECTOR));
      if (!nodes.length) return;

      var seen = new WeakSet();
      var handleImpression = (node) => {
        if (seen.has(node)) return;
        var product = this.catalog.resolveFromElement(node);
        if (!product) return;
        seen.add(node);
        var position = nodes.indexOf(node) + 1;
        this.tracker.impressions([{ id: product.id, name: product.name, price: product.price, category: product.category, list: list, position: position }]);
      };

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || seen.has(entry.target)) return;
            handleImpression(entry.target);
          });
        }, { threshold: 0.5 });
        nodes.forEach((node) => io.observe(node));
      } else {
        nodes.forEach(handleImpression);
      }

      document.addEventListener('click', (event) => {
        var card = event.target.closest(PRODUCT_NODE_SELECTOR);
        if (!card) return;
        if (event.target.closest('button, a')) return;
        var product = this.catalog.resolveFromElement(card);
        if (!product) return;
        var position = nodes.indexOf(card) + 1;
        this.tracker.click(list, product, position);
        this.tracker.detail(product);
      });
    }

    bindAddButtons() {
      document.addEventListener('click', (event) => {
        var btn = event.target.closest('button, a, [data-ecom-action]');
        if (!btn || !this.shouldHandleAdd(btn)) return;
        var product = this.catalog.resolveFromElement(btn);
        if (!product) return;
        this.persistLastProduct(product);
        this.tracker.detail(product);
        this.tracker.add(product, 1);
      });
    }

    shouldHandleAdd(btn) {
      var actionAttr = (btn.getAttribute('data-ecom-action') || '').toLowerCase();
      if (actionAttr === 'add' || actionAttr === 'cta') return true;
      var text = normalizeText(btn.textContent);
      if (!text) return false;
      if (CTA_TEXTS.indexOf(text) !== -1) return true;
      return CTA_PREFIXES.some((prefix) => text.indexOf(prefix) === 0);
    }

    bindRemoveInBuilder() {
      document.addEventListener('click', (event) => {
        var toggler = event.target.closest('[data-toggle-sku]');
        if (!toggler) return;
        var sku = toggler.getAttribute('data-toggle-sku');
        var host = document.querySelector('[data-sku="' + sku + '"]') || toggler;
        var product = this.catalog.resolveFromElement(host);
        if (!product) return;
        var isActive = toggler.getAttribute('aria-pressed') === 'true' || toggler.classList.contains('is-active');
        if (isActive) this.tracker.remove(product, 1);
        else this.tracker.add(product, 1);
      });
    }

    bindPurchaseOnThanks() {
      var hasThanksMarker = document.querySelector('[data-thanks="1"]');
      if (location.pathname.indexOf('/spasibo') === -1 && !hasThanksMarker) return;
      var product = this.popLastProduct();
      if (!product) return;
      var revenue = typeof product.price === 'number' ? product.price : 0;
      var orderId = 'L' + Date.now();
      this.tracker.purchase(orderId, revenue, [Object.assign({}, product, { quantity: 1 })]);
    }

    persistLastProduct(product) {
      try {
        sessionStorage.setItem(LAST_PRODUCT_KEY, JSON.stringify(product));
      } catch (_) { /* storage unavailable */ }
    }

    popLastProduct() {
      try {
        var saved = sessionStorage.getItem(LAST_PRODUCT_KEY);
        if (!saved) return null;
        sessionStorage.removeItem(LAST_PRODUCT_KEY);
        return JSON.parse(saved);
      } catch (_) {
        return null;
      }
    }
  }

  function normalizeName(input) {
    return (input || '')
      .toString()
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^a-z0-9а-я\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeText(input) {
    return (input || '').toString().replace(/\s+/g, ' ').trim().toUpperCase();
  }

  function truncateText(value, limit) {
    if (!value) return '';
    var text = value.replace(/\s+/g, ' ').trim();
    return text.length > limit ? text.slice(0, limit) : text;
  }

  function parsePrice(value) {
    if (value == null) return null;
    var numeric = String(value).replace(/[^0-9.,]/g, '').replace(',', '.');
    if (!numeric) return null;
    var parsed = Number(numeric);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function start() {
    var catalog = new Catalog(PRODUCT_DEFINITIONS);
    var tracker = new EcommerceTracker();
    new Binder(catalog, tracker).init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();