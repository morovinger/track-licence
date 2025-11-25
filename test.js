// Глобальный скрипт для всех страниц (Craftum: общий HTML/футер)
(function () {
  'use strict';

  const CURRENCY = 'RUB';
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

  // Product definitions with comprehensive aliases matching data-course values
  const PRODUCT_DEFINITIONS = [
    { 
      id: 'course_tractor_b_c_d_e', 
      name: 'Тракторист - В, С, D, E', 
      price: 7000, 
      category: 'Курсы/Комплекс', 
      aliases: [
        'тракторист bcde', 
        'тракторист в с d e',
        'тракторист в с d e',
        'обучение на тракторист в с d e',     // Matches: "Обучение на Тракторист - В,С,D,E"
        'обучение на тракторист в с d e',
        'тракторист'
      ] 
    },
    { 
      id: 'course_tractor_b', 
      name: 'Тракторист B', 
      price: 7000, 
      category: 'Курсы/Тракторист', 
      aliases: ['тракторист b', 'категория b', 'traktorist b'] 
    },
    { 
      id: 'course_tractor_c', 
      name: 'Тракторист C', 
      price: 7000, 
      category: 'Курсы/Тракторист', 
      aliases: ['тракторист c', 'категория c', 'traktorist c'] 
    },
    { 
      id: 'course_tractor_d', 
      name: 'Тракторист D', 
      price: 7000, 
      category: 'Курсы/Тракторист', 
      aliases: ['тракторист d', 'категория d', 'traktorist d'] 
    },
    { 
      id: 'course_tractor_e', 
      name: 'Тракторист E', 
      price: 7000, 
      category: 'Курсы/Тракторист', 
      aliases: ['тракторист e', 'категория e', 'traktorist e'] 
    },
    { 
      id: 'course_category_f', 
      name: 'Категория F', 
      price: 7000, 
      category: 'Курсы/Категории', 
      aliases: ['категория f', 'комбайн', 'комбайнер', 'категория f комбайн'] 
    },
    { 
      id: 'course_a1', 
      name: 'Категория А1', 
      price: 7000, 
      category: 'Курсы/Категории', 
      aliases: ['категория а1', 'категория a1', 'мототранспорт', 'а1', 'a1', 'квадроцикл', 'снегоход'] 
    },
    { 
      id: 'course_a2', 
      name: 'Категория А2', 
      price: 8000, 
      category: 'Курсы/Категории', 
      aliases: ['категория а2', 'категория a2', 'вездеходы', 'а2', 'a2', 'багги', 'трэкол'] 
    },
    { 
      id: 'course_loader_driver', 
      name: 'Водитель погрузчика', 
      price: 7000, 
      category: 'Курсы/Погрузчик', 
      aliases: ['погрузчик', 'водитель погрузчика', 'погрузчика'] 
    },
    { 
      id: 'course_excavator_driver', 
      name: 'Машинист экскаватора', 
      price: 7000, 
      category: 'Курсы/Экскаватор', 
      aliases: ['экскаваторщик', 'машинист экскаватора', 'экскаватор', 'экскаватора'] 
    },
    { 
      id: 'course_bulldozer_driver', 
      name: 'Машинист бульдозера', 
      price: 7000, 
      category: 'Курсы/Бульдозер', 
      aliases: ['бульдозерист', 'машинист бульдозера', 'бульдозер', 'бульдозера'] 
    },
    { 
      id: 'course_roller_driver', 
      name: 'Машинист катка', 
      price: 7000, 
      category: 'Курсы/Каток', 
      aliases: ['каток', 'машинист катка', 'катка'] 
    },
    { 
      id: 'course_grader_operator', 
      name: 'Машинист автогрейдера', 
      price: 7000, 
      category: 'Курсы/Автогрейдер', 
      aliases: ['автогрейдер', 'машинист автогрейдера', 'автогрейдера', 'грейдер'] 
    },
    { 
      id: 'course_road_milling_operator', 
      name: 'Машинист фрезы дорожной', 
      price: 7000, 
      category: 'Курсы/Дорфреза', 
      aliases: ['фреза дорожная', 'машинист фрезы дорожной', 'фрезы дорожной', 'дорожная фреза'] 
    },
    { 
      id: 'course_drilling_rig_operator', 
      name: 'Машинист буровой установки', 
      price: 7000, 
      category: 'Курсы/Буровая', 
      aliases: ['буровая установка', 'машинист буровой установки', 'буровой установки', 'бурильщик'] 
    },
    { 
      id: 'course_skidder_operator', 
      name: 'Машинист трелевочной машины', 
      price: 7000, 
      category: 'Курсы/Трелевочная', 
      aliases: ['трелевочной машины', 'трелевочная машина', 'машинист трелевочной машины', 'трелевка'] 
    },
    { 
      id: 'course_piledriver_operator', 
      name: 'Машинист копра', 
      price: 7000, 
      category: 'Курсы/Копер', 
      aliases: ['копра', 'машинист копра', 'копер'] 
    },
    { 
      id: 'course_reloader_operator', 
      name: 'Машинист перегружателя', 
      price: 7000, 
      category: 'Курсы/Перегружатель', 
      aliases: ['перегружателя', 'машинист перегружателя', 'перегружатель'] 
    },
    { 
      id: 'course_crane_operator', 
      name: 'Машинист крана', 
      price: 7000, 
      category: 'Курсы/Кран', 
      aliases: ['машинист крана', 'крановщик', 'крана', 'кран', 'машинист крана крановщик'] 
    },
    { 
      id: 'pack_universal', 
      name: 'Универсал', 
      price: 40000, 
      category: 'Пакеты', 
      aliases: ['пакет универсал', 'тариф универсал', 'универсал'] 
    },
    { 
      id: 'pack_specialist', 
      name: 'Специалист', 
      price: 52000, 
      category: 'Пакеты', 
      aliases: ['пакет специалист', 'тариф специалист', 'специалист'] 
    },
    { 
      id: 'pack_professional', 
      name: 'Профессионал', 
      price: 59000, 
      category: 'Пакеты', 
      aliases: ['пакет профессионал', 'тариф профессионал', 'профессионал'] 
    },
    { 
      id: 'pack_master', 
      name: 'Мастер', 
      price: 73000, 
      category: 'Пакеты', 
      aliases: ['пакет мастер', 'тариф мастер', 'мастер'] 
    }
  ];

  window.dataLayer = window.dataLayer || [];

  class Catalog {
    constructor(definitions) {
      this.byId = {};
      this.aliasToId = new Map();
      definitions.forEach((product) => this.register(product));
      // Sort aliases by length (longest first) for deterministic substring search
      this.aliasEntries = Array.from(this.aliasToId.entries()).sort((a, b) => b[0].length - a[0].length);
      console.log('🔧 Catalog initialized with', definitions.length, 'products and', this.aliasEntries.length, 'aliases');
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
      if (!label) {
        console.log('⚠️ resolveLabel: empty label');
        return null;
      }
      
      var normalized = normalizeName(label);
      console.log('🔍 resolveLabel:', { original: label, normalized: normalized });
      
      // Direct match
      var direct = this.aliasToId.get(normalized);
      if (direct) {
        console.log('✅ Direct match found:', direct);
        return this.cloneProduct(direct);
      }
      
      // Substring match (longest alias first)
      for (var i = 0; i < this.aliasEntries.length; i++) {
        var alias = this.aliasEntries[i][0];
        var id = this.aliasEntries[i][1];
        if (normalized.includes(alias)) {
          console.log('✅ Substring match found:', { alias: alias, id: id });
          return this.cloneProduct(id);
        }
      }
      
      console.log('❌ No match found for:', normalized);
      return null;
    }

    resolveFromElement(el) {
      var host = el && el.closest && el.closest(PRODUCT_NODE_SELECTOR);
      if (!host) {
        console.log('⚠️ No product container found for element');
        return null;
      }

      console.log('🎯 Found product container:', host.className || host.tagName);
      var descriptor = this.extractDescriptor(host);
      console.log('📋 Extracted descriptor:', descriptor);
      
      var product = null;

      if (descriptor.sku) product = this.cloneProduct(descriptor.sku);
      if (!product && descriptor.course) product = this.resolveLabel(descriptor.course);
      if (!product && descriptor.name) product = this.resolveLabel(descriptor.name);
      if (!product && descriptor.title) product = this.resolveLabel(descriptor.title);
      if (!product && descriptor.text) product = this.resolveLabel(descriptor.text);

      if (!product) {
        console.log('❌ Could not resolve product from element');
        return null;
      }

      // Override price from data attribute if available
      if (typeof descriptor.price === 'number' && !Number.isNaN(descriptor.price) && descriptor.price > 0) {
        product.price = descriptor.price;
      }
      if (descriptor.category) {
        product.category = descriptor.category;
      }
      
      console.log('✅ Resolved product:', product);
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
      var selectors = ['[data-name]', '.tariff-title', '.new-price', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      for (var i = 0; i < selectors.length; i++) {
        var node = host.querySelector(selectors[i]);
        if (node && node.textContent) return node.textContent;
      }
      // Try parent card's h3
      var parentCard = host.closest('.card, .tariff-block');
      if (parentCard) {
        var h3 = parentCard.querySelector('h3');
        if (h3) return h3.textContent;
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
    push(payload, label) {
      var packet = { ecommerce: Object.assign({ currencyCode: CURRENCY }, payload) };
      console.log('📊 Yandex.Metrika Ecommerce:', label || 'event', packet);
      window.dataLayer.push(packet);
    }
    detail(product) {
      this.push({ detail: { products: [product] } }, 'detail');
    }
  }

  class Binder {
    constructor(catalog, tracker) {
      this.catalog = catalog;
      this.tracker = tracker;
    }

    init() {
      this.bindCtaClicks();
      console.log('🚀 EcommerceTracker initialized and listening for clicks');
    }

    bindCtaClicks() {
      var self = this;
      document.addEventListener('click', function(event) {
        var btn = event.target.closest('button, a, [data-ecom-action]');
        if (!btn) return;
        
        var isCta = self.isCta(btn);
        console.log('👆 Click detected on:', btn.textContent.trim().substring(0, 30), '| isCTA:', isCta);
        
        if (!isCta) return;
        
        var product = self.catalog.resolveFromElement(btn);
        if (!product) {
          console.log('⚠️ No product resolved for this CTA');
          return;
        }
        
        self.tracker.detail(product);
      });
    }

    isCta(btn) {
      var actionAttr = (btn.getAttribute('data-ecom-action') || '').toLowerCase();
      if (actionAttr === 'add' || actionAttr === 'cta') return true;
      
      // Check for btn-order class (specific to this site)
      if (btn.classList.contains('btn-order')) return true;
      
      // Check for tariff buttons
      if (btn.classList.contains('tariff-btn') && btn.classList.contains('primary-btn')) return true;
      
      var text = normalizeText(btn.textContent);
      if (!text) return false;
      if (CTA_TEXTS.indexOf(text) !== -1) return true;
      return CTA_PREFIXES.some(function(prefix) { 
        return text.indexOf(prefix) === 0; 
      });
    }
  }

  function normalizeName(input) {
    return (input || '')
      .toString()
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^a-z0-9а-яa-z\s]/g, ' ')  // Keep both latin and cyrillic
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
    console.log('🏁 Starting EcommerceTracker...');
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
