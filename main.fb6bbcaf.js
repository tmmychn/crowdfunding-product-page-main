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
})({"js/func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleMobileNav = toggleMobileNav;
exports.toggleModal = toggleModal;
exports.selectProduct = selectProduct;
exports.toggleBookmark = toggleBookmark;
exports.makePledge = makePledge;
exports.calculateProgress = calculateProgress;
exports.updateUnitsLeft = updateUnitsLeft;
var goal = 100000;
var current = 89914;
var backers = 5007;
var bambooStock = 101;
var blackStock = 64;
var mahoganyStock = 1;

function toggleMobileNav() {
  $(".mobile-menu-btn").find("img").toggle(); // $(".nav").toggle();
  // $('.nav-bg').css('visibility', $('.nav-bg').css('visibility') == 'hidden' ? 'visible' : 'hidden');
  // $('.nav-bg').css('opacity', $('.nav-bg').css('opacity') == '0' ? '1' : '0');

  if ($(".menu-open").length > 0) {
    $(".nav").removeClass("menu-open");
    $(".nav").addClass("menu-close");
  } else {
    $(".nav").removeClass("menu-close");
    $(".nav").addClass("menu-open");
  }
}

function toggleModal(modal) {
  modal.toggle();
  $(".selected:eq(0)").removeClass("selected");
}

function selectProduct() {
  // Highlight checkbox when selected
  for (var i = 0; i < $(".selection-modal-card").length; i++) {
    $(".selection-modal-card:eq(" + i + ")").on("click", function () {
      if ($(".selected").length > 0) {
        $(".selected:eq(0)").removeClass("selected");
        $(this).addClass("selected");
      } else {
        $(this).addClass("selected");
      }
    });
  }
}

$.fn.toggleText = function (t1, t2) {
  if ($(this).html() == t1) {
    $(this).html(t2);
  } else {
    $(this).html(t1);
  }

  return $(this);
};

function toggleBookmark() {
  $("#bookmark-btn").on("click", function () {
    $("#bookmark-btn").toggleClass("bookmarked");
    $("#bookmark-text").toggleText("Bookmarked", "Bookmark");
    $("#bookmark-btn").find("img").toggle();
  });
}

function makePledge(index) {
  var pledge = $(".selected").find("input").val();
  var minimumPledge;
  var minimumPledgeWarning;

  switch (index) {
    case 0:
      minimumPledge = 0;
      break;

    case 1:
      minimumPledge = 25;
      minimumPledgeWarning = "Please pledge $25 or more";
      break;

    case 2:
      minimumPledge = 75;
      minimumPledgeWarning = "Please pledge $75 or more";
      break;

    case 3:
      minimumPledge = 200;
      minimumPledgeWarning = "Please pledge $200 or more";
      break;

    default:
      minimumPledge = 0;
  }

  if (pledge >= minimumPledge) {
    current += parseInt(pledge);
    backers += parseInt(1);
    calculateProgress();
    console.log(backers);

    switch (index) {
      case 1:
        bambooStock--;
        break;

      case 2:
        blackStock--;
        break;

      case 3:
        mahoganyStock--;
        break;
    }

    updateUnitsLeft();
    return 1;
  } else {
    console.log(minimumPledgeWarning);
    return 0;
  }
}

function calculateProgress() {
  var thisGoal = parseInt(goal);
  var thisCurrent = parseInt(current);
  var percentage = (thisCurrent / thisGoal * 100).toFixed(2);
  displayProgress(percentage);
}

function displayProgress(percentage) {
  $("#progress").css("width", percentage + "%");
  $("#total-pledge").html(current.toLocaleString());
  $("#total-backers").html(backers.toLocaleString());
} // Updates units left and disables card if units is 0


function updateUnitsLeft() {
  $(".normal-units").children(".figure-text").html(bambooStock);
  $(".black-units").children(".figure-text").html(blackStock);
  $(".mohagony-units").children(".figure-text").html(mahoganyStock); // If units-left is 0, add class "out-of-stock" to the product card and selection modal card
  // Change button to out of stock

  for (var i = 0; i < $(".units-left").length; i++) {
    if ($(".units-left:eq(" + i + ")").children(".figure-text").html() === "0") {
      $(".units-left:eq(" + i + ")").parents(".product-card").addClass("out-of-stock");
      $(".units-left:eq(" + i + ")").parents(".selection-modal-card").addClass("out-of-stock");
      $(".out-of-stock").find("button").html("Out of Stock");
    } else {
      $(".units-left:eq(" + i + ")").parents(".product-card").removeClass("out-of-stock");
      $(".units-left:eq(" + i + ")").parents(".selection-modal-card").removeClass("out-of-stock");
      $(".out-of-stock").find("button").html("Select Reward");
    }
  }
}
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _func = require("./func");

var selectionModal = $("#selection-modal");
var successModal = $("#success-modal");
$(".mobile-menu-btn").click(function () {
  (0, _func.toggleMobileNav)();
}); // SELECTION MODAL

$("#back-project-btn").click(function () {
  $('html, body').animate({
    scrollTop: 0
  }, 'fast');
  (0, _func.toggleModal)(selectionModal);
});
$("#modal-close-icon").click(function () {
  (0, _func.toggleModal)(selectionModal);
});

for (var i = 0; i < $(".product-card-bottom").children("button").length; i++) {
  $(".product-card-bottom:eq(" + i + ")").on("click", function () {
    $('html, body').animate({
      scrollTop: 0
    }, 'fast');
    (0, _func.toggleModal)(selectionModal);
  });
} // SUBMIT PLEDGE


for (var i = 0; i < $(".pledge-amount").length; i++) {
  $(".pledge-amount:eq(" + i + ")").children("button").on("click", function () {
    var index = $(".pledge-amount").children("button").index(this);

    if ((0, _func.makePledge)(index)) {
      (0, _func.toggleModal)(selectionModal);
      (0, _func.toggleModal)(successModal);
    }
  });
}

successModal.find("button").click(function () {
  (0, _func.toggleModal)(successModal);
});
(0, _func.toggleBookmark)();
(0, _func.selectProduct)();
(0, _func.calculateProgress)();
(0, _func.updateUnitsLeft)();
},{"./func":"js/func.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53764" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map