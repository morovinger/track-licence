// Глобальный скрипт для всех страниц (Craftum: общий HTML/футер)
(function(){
    'use strict';
    var CURRENCY = 'RUB';
    window.dataLayer = window.dataLayer || [];
  
    class Catalog {
      constructor() {
        this.byId = {
          course_tractor_b_c_d_e: {id:'course_tractor_b_c_d_e', name:'Тракторист - В, С, D, E', price:7000, category:'Курсы/Тракторист'},
          course_category_f:      {id:'course_category_f',      name:'Категория - F', price:7000, category:'Курсы/Категории'},
          course_loader_driver:   {id:'course_loader_driver',   name:'Водитель погрузчика', price:7000, category:'Курсы/Погрузчик'},
          course_excavator_driver:{id:'course_excavator_driver',name:'Машинист экскаватора', price:7000, category:'Курсы/Экскаватор'},
          course_bulldozer_driver:{id:'course_bulldozer_driver',name:'Машинист бульдозера', price:7000, category:'Курсы/Бульдозер'},
          course_roller_driver:   {id:'course_roller_driver',   name:'Машинист катка', price:7000, category:'Курсы/Каток'},
          course_a1:              {id:'course_a1',              name:'Категория А1', price:7000, category:'Курсы/Категории'},
          course_a2:              {id:'course_a2',              name:'Категория А2', price:8000, category:'Курсы/Категории'},
          // Пакеты
          pack_universal:         {id:'pack_universal',         name:'Универсал', price:40000, category:'Пакеты'},
          pack_specialist:        {id:'pack_specialist',        name:'Специалист', price:52000, category:'Пакеты'},
          pack_professional:      {id:'pack_professional',      name:'Профессионал', price:59000, category:'Пакеты'},
          pack_master:            {id:'pack_master',            name:'Мастер', price:73000, category:'Пакеты'}
        };
        this.byName = {};
        // Создаем карту имен для поиска (lowercase)
        for (var k in this.byId) {
            var p = this.byId[k];
            this.byName[this.normalize(p.name)] = p;
            
            // Добавляем вариации имен, если нужно
            if (k === 'course_tractor_b_c_d_e') {
                this.byName['тракторист - в,с,d,e'] = p; // Без пробелов
                this.byName['обучение на тракторист - в,с,d,e'] = p;
            }
        }
      }

      normalize(str) {
          return (str || '').toLowerCase().trim().replace(/\s+/g, ' ');
      }

      resolveFromEl(el) {
        if (!el) return null;

        // 1. Check explicit data attributes on the element itself
        var sku = el.dataset.sku;
        var course = el.dataset.course; // From index.html buttons
        
        if (sku && this.byId[sku]) return this.byId[sku];
        
        // Check data-course (loose match)
        if (course) {
            var raw = this.normalize(course);
            
            // 1. Try exact match
            if (this.byName[raw]) return this.byName[raw];

            // 2. Clean prefixes ("Обучение на", "Пакет")
            var clean = raw
                .replace(/^обучение на\s+/i, '')
                .replace(/^пакет\s+/i, '');
            
            if (this.byName[clean]) return this.byName[clean];
            
            // 3. Try finding known product name inside the data-course value
            for (var k in this.byName) {
                if (clean.indexOf(k) !== -1 || k.indexOf(clean) !== -1) {
                    return this.byName[k];
                }
            }
        }

        var name = el.dataset.name;
        if (name && this.byName[this.normalize(name)]) return this.byName[this.normalize(name)];

        // 2. Fallback: try headings inside the nearest container
        var scope = el.closest('[data-card="product"], .card, .tariff-block, section, article, div') || el;
        
        // If scope itself has data attributes (e.g. .tariff-block)
        if (scope !== el) {
            if (scope.dataset.sku && this.byId[scope.dataset.sku]) return this.byId[scope.dataset.sku];
            if (scope.dataset.name && this.byName[this.normalize(scope.dataset.name)]) return this.byName[this.normalize(scope.dataset.name)];
        }

        var heading = scope.querySelector('h1,h2,h3,h4,[data-name], .tariff-title');
        if (heading) {
          var hText = this.normalize(heading.textContent);
          if (hText && this.byName[hText]) return this.byName[hText];
          
          // Fuzzy match for heading (e.g. "Категория - F" in "Категория - F ...")
          for (var k in this.byName) {
              if (hText.indexOf(k) !== -1) return this.byName[k];
          }
        }

        // 3. Fallback: scan container text for any known product name
        var container = el.closest('[data-card="product"], .card, .tariff-block, section, article, div') || el;
        var text = this.normalize(container.innerText);
        for (var key in this.byId) {
          var nm = this.normalize(this.byId[key].name);
          if (nm && text.indexOf(nm) !== -1) { return this.byId[key]; }
        }
        
        return null;
      }
    }
  
    class EcomTracker {
      push(obj) { 
          console.log("📊 [EcomTracker] Pushing to dataLayer:", obj);
          window.dataLayer.push({ ecommerce: Object.assign({ currencyCode: CURRENCY }, obj) }); 
      }
      detail(product)  { this.push({ detail:  { products: [product] }}); }
      add(product,q)   { this.push({ add:     { products: [Object.assign({}, product, { quantity: q||1 })] }}); }
      remove(product,q){ this.push({ remove:  { products: [Object.assign({}, product, { quantity: q||1 })] }}); }
      impressions(listItems) { this.push({ impressions: listItems }); }
      click(list, product, pos){ this.push({ click: { actionField: { list: list }, products: [{ id: product.id, name: product.name, position: pos }] } }); }
      purchase(orderId, revenue, products) { this.push({ purchase: { actionField: { id: orderId, revenue: revenue, affiliation: 'Craftum' }, products: products } }); }
    }
  
    class Binder {
      constructor(catalog, tracker) { this.catalog = catalog; this.tracker = tracker; }
      listName() {
        var p = location.pathname;
        if (p.indexOf('/page2') === 0) return 'Главная/Курсы';
        if (p.indexOf('/vse-kursy') === 0) return 'Все курсы';
        if (p.indexOf('/tarif') === 0) return 'Тарифы';
        return 'Каталог';
      }
      bindImpressions() {
        var list = this.listName();
        var cards = document.querySelectorAll('[data-sku], [data-card="product"], .card, .tariff-block');
        var seen = new WeakSet();
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver((entries)=>{
            entries.forEach((e)=>{
                if(!e.isIntersecting || seen.has(e.target)) return;
                var product = this.catalog.resolveFromEl(e.target);
                if(!product) return;
                seen.add(e.target);
                var pos = Array.prototype.indexOf.call(cards, e.target) + 1;
                this.tracker.impressions([{ id: product.id, name: product.name, price: product.price, category: product.category, list: list, position: pos }]);
            });
            }, { threshold: 0.5 });
            cards.forEach(c=>io.observe(c));
        }

        document.addEventListener('click', (ev)=>{
          var card = ev.target.closest('[data-sku], [data-card="product"], .card, .tariff-block');
          if(!card) return;
          // Avoid double tracking if clicking the add button inside the card
          if (ev.target.closest('button, a, .btn-order')) return;

          var product = this.catalog.resolveFromEl(card);
          if(!product) return;
          var pos = Array.prototype.indexOf.call(cards, card) + 1;
          this.tracker.click(list, product, pos);
        });
      }
      bindAddButtons() {
        var self = this;
        document.addEventListener('click', function(ev){
          var btn = ev.target.closest('button, a, .btn-order');
          if(!btn) return;
          
          var text = (btn.textContent||'').replace(/\s+/g,' ').trim().toUpperCase();
          var triggers = ['ОСТАВИТЬ ЗАЯВКУ','ВЫБРАТЬ','ЗАПИСАТЬСЯ'];
          
          // Check if text matches OR class indicates it's an order button
          if(triggers.indexOf(text) === -1 && !btn.classList.contains('btn-order')) return;

          console.log("🛒 [Binder] Click detected on:", btn);

          // Resolve product from the button itself or its container
          var product = self.catalog.resolveFromEl(btn);
          
          if(!product) {
              console.warn("⚠️ [Binder] Could not resolve product for button:", btn);
              return;
          }
          
          console.log("✅ [Binder] Resolved product:", product);

          sessionStorage.setItem('lastProduct', JSON.stringify(product));
          // We use a delay to ensure event propagates if needed, but mostly direct push
          self.tracker.add(product, 1);
          // Optional: detail view on add
          // self.tracker.detail(product); 
        });
      }
      bindPurchaseOnThanks() {
        // Check URL or specific element for thanks page
        if (location.pathname.indexOf('/spasibo') === -1 && !document.querySelector('[data-thanks="1"]')) return;
        
        var saved = sessionStorage.getItem('lastProduct');
        if (!saved) return;
        try {
          var product = JSON.parse(saved);
          var orderId = 'L' + Date.now();
          console.log("💰 [Binder] Tracking purchase:", orderId, product);
          this.tracker.purchase(orderId, product.price, [Object.assign({}, product, { quantity: 1 })]);
          sessionStorage.removeItem('lastProduct');
        } catch(_) {}
      }
      bindRemoveInBuilder() {
        document.addEventListener('click', (e)=>{
          var toggler = e.target.closest('[data-toggle-sku]');
          var product = null;
          if (toggler) {
            var sku = toggler.getAttribute('data-toggle-sku');
            var host = document.querySelector('[data-sku="'+sku+'"]') || toggler;
            product = this.catalog.resolveFromEl(host);
          } else {
            var btn = e.target.closest('button');
            if (btn) {
              var t = (btn.textContent||'').trim().toLowerCase();
              if (t && this.catalog.byName[t]) product = this.catalog.byName[t];
            }
          }
          if(!product) return;
          var isSelected = toggler ? (toggler.getAttribute('aria-pressed') === 'true' || toggler.classList.contains('is-active')) : false;
          if (isSelected) this.tracker.remove(product, 1);
          else this.tracker.add(product, 1);
        });
      }
      init() {
        this.bindImpressions();
        this.bindAddButtons();
        this.bindPurchaseOnThanks();
        this.bindRemoveInBuilder();
        console.log("🚀 [Binder] Tracking initialized");
      }
    }
  
    function start(){
      var catalog = new Catalog();
      var tracker = new EcomTracker();
      new Binder(catalog, tracker).init();
    }
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
  })();