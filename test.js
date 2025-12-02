// Yandex E-commerce Tracker with Cart Flow
// add → purchase flow for proper funnel tracking
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  // Cart state - stores product pending purchase
  let cartProduct = null;

  // Product catalog - maps normalized names to product data
  const PRODUCTS = {
    'тракторист в с d e': { id: 'course_tractor_b_c_d_e', name: 'Тракторист - В, С, D, E', price: 7000, category: 'Курсы' },
    'обучение на тракторист в с d e': { id: 'course_tractor_b_c_d_e', name: 'Тракторист - В, С, D, E', price: 7000, category: 'Курсы' },
    'категория f': { id: 'course_category_f', name: 'Категория F', price: 7000, category: 'Курсы' },
    'водитель погрузчика': { id: 'course_loader_driver', name: 'Водитель погрузчика', price: 7000, category: 'Курсы' },
    'машинист экскаватора': { id: 'course_excavator_driver', name: 'Машинист экскаватора', price: 7000, category: 'Курсы' },
    'машинист бульдозера': { id: 'course_bulldozer_driver', name: 'Машинист бульдозера', price: 7000, category: 'Курсы' },
    'машинист катка': { id: 'course_roller_driver', name: 'Машинист катка', price: 7000, category: 'Курсы' },
    'категория а1': { id: 'course_a1', name: 'Категория А1', price: 7000, category: 'Курсы' },
    'категория а2': { id: 'course_a2', name: 'Категория А2', price: 8000, category: 'Курсы' },
    'пакет универсал': { id: 'pack_universal', name: 'Универсал', price: 40000, category: 'Пакеты' },
    'универсал': { id: 'pack_universal', name: 'Универсал', price: 40000, category: 'Пакеты' },
    'пакет специалист': { id: 'pack_specialist', name: 'Специалист', price: 52000, category: 'Пакеты' },
    'специалист': { id: 'pack_specialist', name: 'Специалист', price: 52000, category: 'Пакеты' },
    'пакет профессионал': { id: 'pack_professional', name: 'Профессионал', price: 59000, category: 'Пакеты' },
    'профессионал': { id: 'pack_professional', name: 'Профессионал', price: 59000, category: 'Пакеты' },
    'пакет мастер': { id: 'pack_master', name: 'Мастер', price: 73000, category: 'Пакеты' },
    'мастер': { id: 'pack_master', name: 'Мастер', price: 73000, category: 'Пакеты' },
  };

  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^a-zа-я0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findProduct(label) {
    const norm = normalize(label);
    console.log('🔍 Looking for product:', { original: label, normalized: norm });
    
    // Direct match
    if (PRODUCTS[norm]) {
      console.log('✅ Direct match:', PRODUCTS[norm].id);
      return { ...PRODUCTS[norm] };
    }
    
    // Substring match
    for (const [key, product] of Object.entries(PRODUCTS)) {
      if (norm.includes(key) || key.includes(norm)) {
        console.log('✅ Substring match:', product.id);
        return { ...product };
      }
    }
    
    console.log('❌ No match found');
    return null;
  }

  function parsePrice(value) {
    if (!value) return null;
    const num = parseInt(String(value).replace(/\D/g, ''), 10);
    return isNaN(num) ? null : num;
  }

  // Generate unique order ID
  function generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  // Generic push function with logging
  function pushEcommerce(actionType, payload) {
    const ecomPayload = {
      ecommerce: {
        currencyCode: 'RUB',
        ...payload
      }
    };
    
    console.log(`📊 PUSHING [${actionType}] TO DATALAYER:`, ecomPayload);
    
    const newLength = window.dataLayer.push(ecomPayload);
    console.log('📥 dataLayer.push() returned:', newLength, '(new array length)');
    console.log('📋 Current dataLayer contents:', window.dataLayer);
    
    if (typeof window.ym === 'function') {
      console.log('✅ Yandex Metrika (ym) is available');
      console.log('🎯 Metrika counter ID: 99544990');
    } else {
      console.warn('⚠️ Yandex Metrika (ym) not found!');
    }
    
    console.log(`%c✅ ${actionType.toUpperCase()} EVENT SENT`, 'background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px;');
  }

  // detail - просмотр товара
  function pushDetail(product) {
    pushEcommerce('detail', {
      detail: {
        products: [product]
      }
    });
  }

  // add - добавление в корзину
  function pushAdd(product, quantity = 1) {
    pushEcommerce('add', {
      add: {
        products: [{ ...product, quantity }]
      }
    });
  }

  // purchase - покупка (требует actionField.id)
  function pushPurchase(product, quantity = 1) {
    const orderId = generateOrderId();
    const revenue = product.price * quantity;
    
    pushEcommerce('purchase', {
      purchase: {
        actionField: {
          id: orderId,
          revenue: revenue,
          affiliation: 'тракторные-права.рф'
        },
        products: [{ ...product, quantity }]
      }
    });
    
    console.log('🧾 Order ID:', orderId);
    console.log('💰 Revenue:', revenue, 'RUB');
  }

  // Main function - sends ADD event and stores product for later purchase
  function pushToDataLayer(product) {
    // Store product in cart for later purchase on form submit
    cartProduct = { ...product };
    console.log('🛒 Product added to cart:', cartProduct.name);
    
    // Push "add" event (add to cart)
    pushAdd(product, 1);
  }

  // Called when popup form is submitted
  function completePurchase() {
    if (!cartProduct) {
      console.warn('⚠️ No product in cart to purchase');
      return;
    }
    
    console.log('💳 Completing purchase for:', cartProduct.name);
    pushPurchase(cartProduct, 1);
    
    // Clear cart after purchase
    cartProduct = null;
  }

  function handleClick(event) {
    // Find the clicked button/link
    const btn = event.target.closest('a, button');
    if (!btn) return;

    // Check if it's a CTA button we care about
    const isBtnOrder = btn.classList.contains('btn-order');
    const isTariffBtn = btn.classList.contains('tariff-btn') && btn.classList.contains('primary-btn');
    const isRecordBtn = btn.textContent.trim().toUpperCase().includes('ЗАПИСАТЬСЯ');
    
    console.log('👆 CLICK:', {
      text: btn.textContent.trim().substring(0, 30),
      isBtnOrder,
      isTariffBtn,
      isRecordBtn,
      dataCourse: btn.getAttribute('data-course'),
      dataPrice: btn.getAttribute('data-price')
    });

    if (!isBtnOrder && !isTariffBtn && !isRecordBtn) {
      console.log('⏭️ Not a CTA button, skipping');
      return;
    }

    // Get product info from data attributes
    const dataCourse = btn.getAttribute('data-course');
    const dataPrice = btn.getAttribute('data-price');

    if (!dataCourse) {
      // Try to find product from parent card/tariff block
      const card = btn.closest('.card, .tariff-block');
      if (card) {
        const h3 = card.querySelector('h3');
        const title = card.querySelector('.tariff-title');
        const label = h3?.textContent || title?.textContent;
        if (label) {
          const product = findProduct(label);
          if (product) {
            pushToDataLayer(product);
          }
        }
      }
      return;
    }

    // Find product by data-course
    const product = findProduct(dataCourse);
    if (product) {
      // Override price if specified
      const price = parsePrice(dataPrice);
      if (price) product.price = price;
      pushToDataLayer(product);
    }
  }

  function init() {
    console.log('🚀 E-commerce Tracker INITIALIZED');
    console.log('📋 Products in catalog:', Object.keys(PRODUCTS).length);
    
    // Check Yandex Metrika status
    if (typeof window.ym === 'function') {
      console.log('✅ Yandex Metrika is loaded');
    } else {
      console.warn('⚠️ Yandex Metrika not loaded yet (might load async)');
    }
    
    // Check dataLayer
    console.log('📊 dataLayer exists:', !!window.dataLayer, '| items:', window.dataLayer.length);
    
    // Use capture phase to ensure we get the event first
    document.addEventListener('click', handleClick, true);
    
    // Also bind directly to all btn-order elements as backup
    document.querySelectorAll('.btn-order, .tariff-btn.primary-btn').forEach((btn, idx) => {
      console.log('📌 Found CTA button #' + idx + ':', btn.getAttribute('data-course') || btn.textContent.trim().substring(0, 30));
      
      btn.addEventListener('click', function(e) {
        console.log('🎯 DIRECT CLICK on:', this.getAttribute('data-course') || this.textContent.trim());
        // handleClick will be called by the capture listener too
      });
    });
    
    console.log('✅ Click handlers attached');
    
    // Setup observer for popup form submit button
    setupPopupObserver();
  }

  // Watch for popup form appearance and attach purchase handler
  function setupPopupObserver() {
    // Selectors for the popup submit button (Tilda uses various structures)
    const submitButtonSelectors = [
      'button[data-tilda-event-name="click"]',
      '.t-submit',
      'button:not([disabled])[type="submit"]',
      '.t-form__submit',
      '.t-btn[type="submit"]'
    ];
    
    // Check if submit button matches "Оставить заявку"
    function isSubmitButton(el) {
      const text = el.textContent?.trim() || '';
      return text.includes('Оставить заявку') || 
             text.includes('Отправить заявку') ||
             text.includes('Отправить');
    }
    
    // Attach click handler to submit button
    function attachSubmitHandler(button) {
      if (button._purchaseHandlerAttached) return;
      button._purchaseHandlerAttached = true;
      
      console.log('📝 Found popup submit button:', button.textContent?.trim().substring(0, 30));
      
      button.addEventListener('click', function(e) {
        // Only trigger purchase if button is enabled and we have a cart product
        if (button.disabled) {
          console.log('⏸️ Submit button is disabled, waiting for form fill');
          return;
        }
        
        console.log('📤 Form submit button clicked!');
        completePurchase();
      });
    }
    
    // Scan DOM for submit buttons
    function scanForSubmitButtons() {
      // Look for buttons with "Оставить заявку" text
      document.querySelectorAll('button, .t-submit, .t-btn').forEach(btn => {
        if (isSubmitButton(btn)) {
          attachSubmitHandler(btn);
        }
      });
    }
    
    // Initial scan
    scanForSubmitButtons();
    
    // Watch for dynamically added popup elements
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if this node or its children contain submit buttons
              if (node.matches && (node.matches('button') || node.matches('.t-submit'))) {
                if (isSubmitButton(node)) {
                  attachSubmitHandler(node);
                }
              }
              // Check children
              node.querySelectorAll?.('button, .t-submit, .t-btn').forEach(btn => {
                if (isSubmitButton(btn)) {
                  attachSubmitHandler(btn);
                }
              });
            }
          });
        }
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('👀 Popup observer active');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
