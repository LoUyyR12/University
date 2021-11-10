// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/cart.js":[function(require,module,exports) {
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else ready();

function ready() {
  UpdateCardCounter();
  console.log(sessionStorage);

  for (var i = 0; i < sessionStorage.length; i++) {
    var title = sessionStorage.key(i);
    var price = JSON.parse(sessionStorage.getItem(title)).price;
    var image = JSON.parse(sessionStorage.getItem(title)).image;
    addItemToCart(title, price, image);
  }

  UpdateCardTotal();
  var removeCartButtons = document.getElementsByClassName('btn-danger');

  for (var _i = 0; _i < removeCartButtons.length; _i++) {
    var button = removeCartButtons[_i];
    button.addEventListener('click', RemoveCartItem);
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input');

  for (var _i2 = 0; _i2 < quantityInputs.length; _i2++) {
    var input = quantityInputs[_i2];
    input.addEventListener('change', quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button');

  for (var _i3 = 0; _i3 < addToCartButtons.length; _i3++) {
    var _button = addToCartButtons[_i3];

    _button.addEventListener('click', addToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked(event) {
  if (!sessionStorage.length) {
    alert('Ви ще не вибрали жодного товару для здійснення покупки!');
    return;
  }

  alert("\n    Thank you for purchasing our handmade for ".concat(document.getElementsByClassName('cart-total-price')[0].innerText, "!\n    "));
  var cartItems = document.getElementsByClassName('cart-items')[0];

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  sessionStorage.clear();
  UpdateCardTotal();
  UpdateCardCounter();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var image = shopItem.getElementsByClassName('shop-item-image')[0].src;
  var key = 0;
  if (sessionStorage.length) key = sessionStorage.length + 1;
  var item = {
    title: title,
    price: price,
    image: image
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}

function addItemToCart(title, price, imageSrc, sessionKey) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  var cartRowContent = "\n    <div class=\"cart-item cart-column\">\n        <img class=\"cart-item-image\" src=\"".concat(imageSrc, "\" width=\"100\" height=\"100\">\n        <span class=\"cart-item-title\">").concat(title, "</span>\n    </div>\n    <span class=\"cart-price cart-column\">").concat(price, "</span>\n    <div class=\"cart-quantity cart-column\">\n        <input class=\"cart-quantity-input\" type=\"number\" value=\"1\">\n        <button class=\"btn btn-danger\" type=\"button\">REMOVE</button>\n    </div>\n    ");
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', RemoveCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', RemoveCartItem);
}

function RemoveCartItem(event) {
  var buttonClicked = event.target;
  var item = buttonClicked.parentElement.parentElement;
  var title = item.getElementsByClassName('cart-item-title')[0].innerText;
  item.remove();
  sessionStorage.removeItem(title);
  UpdateCardTotal();
  UpdateCardCounter();
}

function quantityChanged(event) {
  var input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  UpdateCardTotal();
}

function UpdateCardTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElevent = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElevent.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

function UpdateCardCounter() {
  document.getElementsByClassName('cart-counter')[0].innerText = sessionStorage.length;
}
},{}]