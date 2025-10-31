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
        for (var k in this.byId) this.byName[this.byId[k].name.toLowerCase()] = this.byId[k];
      }
      resolveFromEl(el) {
        var sku = el.dataset.sku;
        var name = el.dataset.name;
        var price = el.dataset.price;
        var category = el.dataset.category;
        var p = null;
        if (sku && this.byId[sku]) p = this.byId[sku];
        else if (name && this.byName[name.trim().toLowerCase()]) p = this.byName[name.trim().toLowerCase()];
        // Fallback 1: try headings inside the nearest container
        if (!p) {
          var scope = el.closest('[data-card="product"], .card, section, article, div') || el;
          var heading = scope.querySelector('h1,h2,h3,h4,[data-name]');
          if (heading) {
            var hText = (heading.textContent || '').trim().toLowerCase();
            if (hText && this.byName[hText]) p = this.byName[hText];
          }
        }
        // Fallback 2: scan container text for any known product name
        if (!p) {
          var container = el.closest('[data-card="product"], .card, section, article, div') || el;
          var text = (container.innerText || '').toLowerCase();
          for (var key in this.byId) {
            var nm = this.byId[key].name.toLowerCase();
            if (nm && text.indexOf(nm) !== -1) { p = this.byId[key]; break; }
          }
        }
        if (!p) return null;
        var out = Object.assign({}, p);
        if (price) out.price = Number(String(price).replace(/[^\d.]/g,''));
        if (category) out.category = category;
        return out;
      }
    }
  
  
    class EcomTracker {
      push(obj) { window.dataLayer.push({ ecommerce: Object.assign({ currencyCode: CURRENCY }, obj) }); }
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
        var cards = document.querySelectorAll('[data-sku], [data-card="product"], .card');
        var seen = new WeakSet();
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
        document.addEventListener('click', (ev)=>{
          var card = ev.target.closest('[data-sku], [data-card="product"], .card');
          if(!card) return;
          var product = this.catalog.resolveFromEl(card);
          if(!product) return;
          var pos = Array.prototype.indexOf.call(cards, card) + 1;
          this.tracker.click(list, product, pos);
        });
      }
      bindAddButtons() {
        var self = this;
        document.addEventListener('click', function(ev){
          var btn = ev.target.closest('button, a');
          if(!btn) return;
          var text = (btn.textContent||'').replace(/\s+/g,' ').trim().toUpperCase();
          var triggers = ['ОСТАВИТЬ ЗАЯВКУ','ВЫБРАТЬ','ЗАПИСАТЬСЯ'];
          if(triggers.indexOf(text) === -1) return;
          var host = btn.closest('[data-sku], [data-card="product"], .card, section, article, div') || btn;
          var product = self.catalog.resolveFromEl(host);
          if(!product) return;
          sessionStorage.setItem('lastProduct', JSON.stringify(product));
          self.tracker.add(product, 1);
          self.tracker.detail(product);
        });
      }
      bindPurchaseOnThanks() {
        var thanks = document.querySelector('[data-thanks="1"]');
        if (!thanks) return;
        var saved = sessionStorage.getItem('lastProduct');
        if (!saved) return;
        try {
          var product = JSON.parse(saved);
          var orderId = 'L' + Date.now();
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
            // Fallback: try map builder buttons by visible text
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
  