(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["amp"],{

/***/ "./node_modules/next/dist/client/dev/amp-dev.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/dev/amp-dev.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _regeneratorRuntime = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");

var _eventSourcePolyfill = _interopRequireDefault(__webpack_require__(/*! ./event-source-polyfill */ "./node_modules/next/dist/client/dev/event-source-polyfill.js"));

var _eventsource = __webpack_require__(/*! ./error-overlay/eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");

var _onDemandEntriesUtils = __webpack_require__(/*! ./on-demand-entries-utils */ "./node_modules/next/dist/client/dev/on-demand-entries-utils.js");

var _fouc = __webpack_require__(/*! ./fouc */ "./node_modules/next/dist/client/dev/fouc.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

if (!window.EventSource) {
  window.EventSource = _eventSourcePolyfill["default"];
}

var data = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
var assetPrefix = data.assetPrefix,
    page = data.page;
assetPrefix = assetPrefix || '';
var mostRecentHash = null;
/* eslint-disable-next-line */

var curHash = __webpack_require__.h();
var hotUpdatePath = assetPrefix + (assetPrefix.endsWith('/') ? '' : '/') + '_next/static/webpack/'; // Is there a newer version of this code available?

function isUpdateAvailable() {
  // __webpack_hash__ is the hash of the current compilation.
  // It's a global variable injected by Webpack.

  /* eslint-disable-next-line */
  return mostRecentHash !== __webpack_require__.h();
} // Webpack disallows updates in other states.


function canApplyUpdates() {
  return module.hot.status() === 'idle';
}

function _tryApplyUpdates() {
  _tryApplyUpdates = // This function reads code updates on the fly and hard
  // reloads the page when it has changed.
  _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var res, jsonData, curPage, pageUpdated;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!isUpdateAvailable() || !canApplyUpdates())) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return fetch(typeof __webpack_require__.j !== 'undefined' ? "".concat(hotUpdatePath).concat(curHash, ".").concat(__webpack_require__.j, ".hot-update.json") : "".concat(hotUpdatePath).concat(curHash, ".hot-update.json"));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.json();

          case 8:
            jsonData = _context.sent;
            curPage = page === '/' ? 'index' : page; // webpack 5 uses an array instead

            pageUpdated = (Array.isArray(jsonData.c) ? jsonData.c : Object.keys(jsonData.c)).some(function (mod) {
              return mod.indexOf("pages".concat(curPage.substr(0, 1) === '/' ? curPage : "/".concat(curPage))) !== -1 || mod.indexOf("pages".concat(curPage.substr(0, 1) === '/' ? curPage : "/".concat(curPage)).replace(/\//g, '\\')) !== -1;
            });

            if (pageUpdated) {
              document.location.reload(true);
            } else {
              curHash = mostRecentHash;
            }

            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            console.error('Error occurred checking for update', _context.t0);
            document.location.reload(true);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 14]]);
  }));
  return _tryApplyUpdates.apply(this, arguments);
}

function tryApplyUpdates() {
  return _tryApplyUpdates.apply(this, arguments);
}

(0, _eventsource).addMessageListener(function (event) {
  if (event.data === "\uD83D\uDC93") {
    return;
  }

  try {
    var message = JSON.parse(event.data);

    if (message.action === 'sync' || message.action === 'built') {
      if (!message.hash) {
        return;
      }

      mostRecentHash = message.hash;
      tryApplyUpdates();
    } else if (message.action === 'reloadPage') {
      document.location.reload(true);
    }
  } catch (ex) {
    console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
  }
});
(0, _onDemandEntriesUtils).setupPing(assetPrefix, function () {
  return page;
});
(0, _fouc).displayContent();

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js":
/*!************************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/error-overlay/eventsource.js ***!
  \************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addMessageListener = addMessageListener;
exports.getEventSourceWrapper = getEventSourceWrapper;
var eventCallbacks = [];

function EventSourceWrapper(options) {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  if (!options.timeout) {
    options.timeout = 20 * 1000;
  }

  init();
  var timer = setInterval(function () {
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log('[HMR] connected');
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }

    eventCallbacks.forEach(function (cb) {
      if (!cb.unfiltered && event.data.indexOf('action') === -1) return;
      cb(event);
    });
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    close: function close() {
      clearInterval(timer);
      source.close();
    },
    addMessageListener: function addMessageListener(fn) {
      listeners.push(fn);
    }
  };
}

_c = EventSourceWrapper;

function addMessageListener(cb) {
  eventCallbacks.push(cb);
}

function getEventSourceWrapper(options) {
  return EventSourceWrapper(options);
}

var _c;

$RefreshReg$(_c, "EventSourceWrapper");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/event-source-polyfill.js":
/*!********************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/event-source-polyfill.js ***!
  \********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;
/* eslint-disable */
// Improved version of https://github.com/Yaffle/EventSource/
// Available under MIT License (MIT)
// Only tries to support IE11 and nothing below

var document = window.document;
var Response1 = window.Response;
var TextDecoder1 = window.TextDecoder;
var TextEncoder1 = window.TextEncoder;
var AbortController1 = window.AbortController;

if (AbortController1 == undefined) {
  AbortController1 = function AbortController1() {
    this.signal = null;

    this.abort = function () {};
  };
}

function TextDecoderPolyfill() {
  this.bitsNeeded = 0;
  this.codePoint = 0;
}

_c = TextDecoderPolyfill;

TextDecoderPolyfill.prototype.decode = function (octets) {
  function valid(codePoint, shift, octetsCount) {
    if (octetsCount === 1) {
      return codePoint >= 128 >> shift && codePoint << shift <= 2047;
    }

    if (octetsCount === 2) {
      return codePoint >= 2048 >> shift && codePoint << shift <= 55295 || codePoint >= 57344 >> shift && codePoint << shift <= 65535;
    }

    if (octetsCount === 3) {
      return codePoint >= 65536 >> shift && codePoint << shift <= 1114111;
    }

    throw new Error();
  }

  function octetsCount(bitsNeeded, codePoint) {
    if (bitsNeeded === 6 * 1) {
      return codePoint >> 6 > 15 ? 3 : codePoint > 31 ? 2 : 1;
    }

    if (bitsNeeded === 6 * 2) {
      return codePoint > 15 ? 3 : 2;
    }

    if (bitsNeeded === 6 * 3) {
      return 3;
    }

    throw new Error();
  }

  var REPLACER = 65533;
  var string = '';
  var bitsNeeded = this.bitsNeeded;
  var codePoint = this.codePoint;

  for (var i = 0; i < octets.length; i += 1) {
    var octet = octets[i];

    if (bitsNeeded !== 0) {
      if (octet < 128 || octet > 191 || !valid(codePoint << 6 | octet & 63, bitsNeeded - 6, octetsCount(bitsNeeded, codePoint))) {
        bitsNeeded = 0;
        codePoint = REPLACER;
        string += String.fromCharCode(codePoint);
      }
    }

    if (bitsNeeded === 0) {
      if (octet >= 0 && octet <= 127) {
        bitsNeeded = 0;
        codePoint = octet;
      } else if (octet >= 192 && octet <= 223) {
        bitsNeeded = 6 * 1;
        codePoint = octet & 31;
      } else if (octet >= 224 && octet <= 239) {
        bitsNeeded = 6 * 2;
        codePoint = octet & 15;
      } else if (octet >= 240 && octet <= 247) {
        bitsNeeded = 6 * 3;
        codePoint = octet & 7;
      } else {
        bitsNeeded = 0;
        codePoint = REPLACER;
      }

      if (bitsNeeded !== 0 && !valid(codePoint, bitsNeeded, octetsCount(bitsNeeded, codePoint))) {
        bitsNeeded = 0;
        codePoint = REPLACER;
      }
    } else {
      bitsNeeded -= 6;
      codePoint = codePoint << 6 | octet & 63;
    }

    if (bitsNeeded === 0) {
      if (codePoint <= 65535) {
        string += String.fromCharCode(codePoint);
      } else {
        string += String.fromCharCode(55296 + (codePoint - 65535 - 1 >> 10));
        string += String.fromCharCode(56320 + (codePoint - 65535 - 1 & 1023));
      }
    }
  }

  this.bitsNeeded = bitsNeeded;
  this.codePoint = codePoint;
  return string;
}; // Firefox < 38 throws an error with stream option


var supportsStreamOption = function supportsStreamOption() {
  try {
    return new TextDecoder1().decode(new TextEncoder1().encode('test'), {
      stream: true
    }) === 'test';
  } catch (error) {
    console.log(error);
  }

  return false;
}; // IE, Edge


if (TextDecoder1 == undefined || TextEncoder1 == undefined || !supportsStreamOption()) {
  TextDecoder1 = TextDecoderPolyfill;
}

var k = function k() {};

function XHRWrapper(xhr) {
  this.withCredentials = false;
  this.responseType = '';
  this.readyState = 0;
  this.status = 0;
  this.statusText = '';
  this.responseText = '';
  this.onprogress = k;
  this.onreadystatechange = k;
  this._contentType = '';
  this._xhr = xhr;
  this._sendTimeout = 0;
  this._abort = k;
}

_c2 = XHRWrapper;

XHRWrapper.prototype.open = function (method, url) {
  this._abort(true);

  var that = this;
  var xhr = this._xhr;
  var state = 1;
  var timeout = 0;

  this._abort = function (silent) {
    if (that._sendTimeout !== 0) {
      clearTimeout(that._sendTimeout);
      that._sendTimeout = 0;
    }

    if (state === 1 || state === 2 || state === 3) {
      state = 4;
      xhr.onload = k;
      xhr.onerror = k;
      xhr.onabort = k;
      xhr.onprogress = k;
      xhr.onreadystatechange = k; // IE 8 - 9: XDomainRequest#abort() does not fire any event
      // Opera < 10: XMLHttpRequest#abort() does not fire any event

      xhr.abort();

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      if (!silent) {
        that.readyState = 4;
        that.onreadystatechange();
      }
    }

    state = 0;
  };

  var onStart = function onStart() {
    if (state === 1) {
      // state = 2;
      var status = 0;
      var statusText = '';
      var contentType = undefined;

      if (!('contentType' in xhr)) {
        try {
          status = xhr.status;
          statusText = xhr.statusText;
          contentType = xhr.getResponseHeader('Content-Type');
        } catch (error) {
          // IE < 10 throws exception for `xhr.status` when xhr.readyState === 2 || xhr.readyState === 3
          // Opera < 11 throws exception for `xhr.status` when xhr.readyState === 2
          // https://bugs.webkit.org/show_bug.cgi?id=29121
          status = 0;
          statusText = '';
          contentType = undefined; // Firefox < 14, Chrome ?, Safari ?
          // https://bugs.webkit.org/show_bug.cgi?id=29658
          // https://bugs.webkit.org/show_bug.cgi?id=77854
        }
      } else {
        status = 200;
        statusText = 'OK';
        contentType = xhr.contentType;
      }

      if (status !== 0) {
        state = 2;
        that.readyState = 2;
        that.status = status;
        that.statusText = statusText;
        that._contentType = contentType;
        that.onreadystatechange();
      }
    }
  };

  var onProgress = function onProgress() {
    onStart();

    if (state === 2 || state === 3) {
      state = 3;
      var responseText = '';

      try {
        responseText = xhr.responseText;
      } catch (error) {// IE 8 - 9 with XMLHttpRequest
      }

      that.readyState = 3;
      that.responseText = responseText;
      that.onprogress();
    }
  };

  var onFinish = function onFinish() {
    // Firefox 52 fires "readystatechange" (xhr.readyState === 4) without final "readystatechange" (xhr.readyState === 3)
    // IE 8 fires "onload" without "onprogress"
    onProgress();

    if (state === 1 || state === 2 || state === 3) {
      state = 4;

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      that.readyState = 4;
      that.onreadystatechange();
    }
  };

  var onReadyStateChange = function onReadyStateChange() {
    if (xhr != undefined) {
      // Opera 12
      if (xhr.readyState === 4) {
        onFinish();
      } else if (xhr.readyState === 3) {
        onProgress();
      } else if (xhr.readyState === 2) {
        onStart();
      }
    }
  };

  var onTimeout = function onTimeout() {
    timeout = setTimeout(function () {
      onTimeout();
    }, 500);

    if (xhr.readyState === 3) {
      onProgress();
    }
  }; // XDomainRequest#abort removes onprogress, onerror, onload


  xhr.onload = onFinish;
  xhr.onerror = onFinish; // improper fix to match Firefox behavior, but it is better than just ignore abort
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=768596
  // https://bugzilla.mozilla.org/show_bug.cgi?id=880200
  // https://code.google.com/p/chromium/issues/detail?id=153570
  // IE 8 fires "onload" without "onprogress

  xhr.onabort = onFinish; // https://bugzilla.mozilla.org/show_bug.cgi?id=736723

  if (!('sendAsBinary' in XMLHttpRequest.prototype) && !('mozAnon' in XMLHttpRequest.prototype)) {
    xhr.onprogress = onProgress;
  } // IE 8 - 9 (XMLHTTPRequest)
  // Opera < 12
  // Firefox < 3.5
  // Firefox 3.5 - 3.6 - ? < 9.0
  // onprogress is not fired sometimes or delayed
  // see also #64


  xhr.onreadystatechange = onReadyStateChange;

  if ('contentType' in xhr) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'padding=true';
  }

  xhr.open(method, url, true);

  if ('readyState' in xhr) {
    // workaround for Opera 12 issue with "progress" events
    // #91
    timeout = setTimeout(function () {
      onTimeout();
    }, 0);
  }
};

XHRWrapper.prototype.abort = function () {
  this._abort(false);
};

XHRWrapper.prototype.getResponseHeader = function (name) {
  return this._contentType;
};

XHRWrapper.prototype.setRequestHeader = function (name, value) {
  var xhr = this._xhr;

  if ('setRequestHeader' in xhr) {
    xhr.setRequestHeader(name, value);
  }
};

XHRWrapper.prototype.getAllResponseHeaders = function () {
  return this._xhr.getAllResponseHeaders != undefined ? this._xhr.getAllResponseHeaders() : '';
};

XHRWrapper.prototype.send = function () {
  // loading indicator in Safari < ? (6), Chrome < 14, Firefox
  if (!('ontimeout' in XMLHttpRequest.prototype) && document != undefined && document.readyState != undefined && document.readyState !== 'complete') {
    var that = this;
    that._sendTimeout = setTimeout(function () {
      that._sendTimeout = 0;
      that.send();
    }, 4);
    return;
  }

  var xhr = this._xhr; // withCredentials should be set after "open" for Safari and Chrome (< 19 ?)

  xhr.withCredentials = this.withCredentials;
  xhr.responseType = this.responseType;

  try {
    // xhr.send(); throws "Not enough arguments" in Firefox 3.0
    xhr.send(undefined);
  } catch (error1) {
    // Safari 5.1.7, Opera 12
    throw error1;
  }
};

function toLowerCase(name) {
  return name.replace(/[A-Z]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 32);
  });
}

function HeadersPolyfill(all) {
  // Get headers: implemented according to mozilla's example code: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders#Example
  var map = Object.create(null);
  var array = all.split('\r\n');

  for (var i = 0; i < array.length; i += 1) {
    var line = array[i];
    var parts = line.split(': ');
    var name = parts.shift();
    var value = parts.join(': ');
    map[toLowerCase(name)] = value;
  }

  this._map = map;
}

_c3 = HeadersPolyfill;

HeadersPolyfill.prototype.get = function (name) {
  return this._map[toLowerCase(name)];
};

function XHRTransport() {}

_c4 = XHRTransport;

XHRTransport.prototype.open = function (xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers) {
  xhr.open('GET', url);
  var offset = 0;

  xhr.onprogress = function () {
    var responseText = xhr.responseText;
    var chunk = responseText.slice(offset);
    offset += chunk.length;
    onProgressCallback(chunk);
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 2) {
      var status = xhr.status;
      var statusText = xhr.statusText;
      var contentType = xhr.getResponseHeader('Content-Type');
      var headers1 = xhr.getAllResponseHeaders();
      onStartCallback(status, statusText, contentType, new HeadersPolyfill(headers1), function () {
        xhr.abort();
      });
    } else if (xhr.readyState === 4) {
      onFinishCallback();
    }
  };

  xhr.withCredentials = withCredentials;
  xhr.responseType = 'text';

  for (var name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name)) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }

  xhr.send();
};

function HeadersWrapper(headers2) {
  this._headers = headers2;
}

_c5 = HeadersWrapper;

HeadersWrapper.prototype.get = function (name) {
  return this._headers.get(name);
};

function FetchTransport() {}

_c6 = FetchTransport;

FetchTransport.prototype.open = function (xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers2) {
  var controller = new AbortController1();
  var signal = controller.signal // see #120
  ;
  var textDecoder = new TextDecoder1();
  fetch(url, {
    headers: headers2,
    credentials: withCredentials ? 'include' : 'same-origin',
    signal: signal,
    cache: 'no-store'
  }).then(function (response) {
    var reader = response.body.getReader();
    onStartCallback(response.status, response.statusText, response.headers.get('Content-Type'), new HeadersWrapper(response.headers), function () {
      controller.abort();
      reader.cancel();
    });
    return new Promise(function (resolve, reject) {
      var readNextChunk = function readNextChunk() {
        reader.read().then(function (result) {
          if (result.done) {
            // Note: bytes in textDecoder are ignored
            resolve(undefined);
          } else {
            var chunk = textDecoder.decode(result.value, {
              stream: true
            });
            onProgressCallback(chunk);
            readNextChunk();
          }
        })['catch'](function (error) {
          reject(error);
        });
      };

      readNextChunk();
    });
  }).then(function (result) {
    onFinishCallback();
    return result;
  }, function (error) {
    onFinishCallback();
    return Promise.reject(error);
  });
};

function EventTarget1() {
  this._listeners = Object.create(null);
}

_c7 = EventTarget1;

function throwError(e) {
  setTimeout(function () {
    throw e;
  }, 0);
}

EventTarget1.prototype.dispatchEvent = function (event) {
  event.target = this;
  var typeListeners = this._listeners[event.type];

  if (typeListeners != undefined) {
    var length = typeListeners.length;

    for (var i = 0; i < length; i += 1) {
      var listener = typeListeners[i];

      try {
        if (typeof listener.handleEvent === 'function') {
          listener.handleEvent(event);
        } else {
          listener.call(this, event);
        }
      } catch (e) {
        throwError(e);
      }
    }
  }
};

EventTarget1.prototype.addEventListener = function (type, listener) {
  type = String(type);
  var listeners = this._listeners;
  var typeListeners = listeners[type];

  if (typeListeners == undefined) {
    typeListeners = [];
    listeners[type] = typeListeners;
  }

  var found = false;

  for (var i = 0; i < typeListeners.length; i += 1) {
    if (typeListeners[i] === listener) {
      found = true;
    }
  }

  if (!found) {
    typeListeners.push(listener);
  }
};

EventTarget1.prototype.removeEventListener = function (type, listener) {
  type = String(type);
  var listeners = this._listeners;
  var typeListeners = listeners[type];

  if (typeListeners != undefined) {
    var filtered = [];

    for (var i = 0; i < typeListeners.length; i += 1) {
      if (typeListeners[i] !== listener) {
        filtered.push(typeListeners[i]);
      }
    }

    if (filtered.length === 0) {
      delete listeners[type];
    } else {
      listeners[type] = filtered;
    }
  }
};

function Event1(type) {
  this.type = type;
  this.target = undefined;
}

_c8 = Event1;

function MessageEvent1(type, options) {
  Event1.call(this, type);
  this.data = options.data;
  this.lastEventId = options.lastEventId;
}

_c9 = MessageEvent1;
MessageEvent1.prototype = Object.create(Event1.prototype);

function ConnectionEvent(type, options) {
  Event1.call(this, type);
  this.status = options.status;
  this.statusText = options.statusText;
  this.headers = options.headers;
}

_c10 = ConnectionEvent;
ConnectionEvent.prototype = Object.create(Event1.prototype);
var WAITING = -1;
var CONNECTING = 0;
var OPEN = 1;
var CLOSED = 2;
var AFTER_CR = -1;
var FIELD_START = 0;
var FIELD = 1;
var VALUE_START = 2;
var VALUE = 3;
var contentTypeRegExp = /^text\/event\-stream;?(\s*charset\=utf\-8)?$/i;
var MINIMUM_DURATION = 1000;
var MAXIMUM_DURATION = 18000000;

var parseDuration = function parseDuration(value, def) {
  var n = parseInt(value, 10);

  if (n !== n) {
    n = def;
  }

  return clampDuration(n);
};

var clampDuration = function clampDuration(n) {
  return Math.min(Math.max(n, MINIMUM_DURATION), MAXIMUM_DURATION);
};

var fire = function fire(that, f, event) {
  try {
    if (typeof f === 'function') {
      f.call(that, event);
    }
  } catch (e) {
    throwError(e);
  }
};

function EventSourcePolyfill(url, options) {
  EventTarget1.call(this);
  this.onopen = undefined;
  this.onmessage = undefined;
  this.onerror = undefined;
  this.url = undefined;
  this.readyState = undefined;
  this.withCredentials = undefined;
  this._close = undefined;
  start(this, url, options);
}

_c11 = EventSourcePolyfill;
var isFetchSupported = fetch != undefined && Response1 != undefined && 'body' in Response1.prototype;

function start(es, url, options) {
  url = String(url);
  var withCredentials = options != undefined && Boolean(options.withCredentials);
  var initialRetry = clampDuration(1000);
  var heartbeatTimeout = options != undefined && options.heartbeatTimeout != undefined ? parseDuration(options.heartbeatTimeout, 45000) : clampDuration(45000);
  var lastEventId = '';
  var retry = initialRetry;
  var wasActivity = false;
  var headers2 = options != undefined && options.headers != undefined ? JSON.parse(JSON.stringify(options.headers)) : undefined;
  var CurrentTransport = options != undefined && options.Transport != undefined ? options.Transport : XMLHttpRequest;
  var xhr = isFetchSupported && !(options != undefined && options.Transport != undefined) ? undefined : new XHRWrapper(new CurrentTransport());
  var transport = xhr == undefined ? new FetchTransport() : new XHRTransport();
  var cancelFunction = undefined;
  var timeout = 0;
  var currentState = WAITING;
  var dataBuffer = '';
  var lastEventIdBuffer = '';
  var eventTypeBuffer = '';
  var textBuffer = '';
  var state = FIELD_START;
  var fieldStart = 0;
  var valueStart = 0;

  var onStart = function onStart(status, statusText, contentType, headers3, cancel) {
    if (currentState === CONNECTING) {
      cancelFunction = cancel;

      if (status === 200 && contentType != undefined && contentTypeRegExp.test(contentType)) {
        currentState = OPEN;
        wasActivity = true;
        retry = initialRetry;
        es.readyState = OPEN;
        var event = new ConnectionEvent('open', {
          status: status,
          statusText: statusText,
          headers: headers3
        });
        es.dispatchEvent(event);
        fire(es, es.onopen, event);
      } else {
        var message = '';

        if (status !== 200) {
          if (statusText) {
            statusText = statusText.replace(/\s+/g, ' ');
          }

          message = "EventSource's response has a status " + status + ' ' + statusText + ' that is not 200. Aborting the connection.';
        } else {
          message = "EventSource's response has a Content-Type specifying an unsupported type: " + (contentType == undefined ? '-' : contentType.replace(/\s+/g, ' ')) + '. Aborting the connection.';
        }

        throwError(new Error(message));
        close();
        var event = new ConnectionEvent('error', {
          status: status,
          statusText: statusText,
          headers: headers3
        });
        es.dispatchEvent(event);
        fire(es, es.onerror, event);
      }
    }
  };

  var onProgress = function onProgress(textChunk) {
    if (currentState === OPEN) {
      var n = -1;

      for (var i = 0; i < textChunk.length; i += 1) {
        var c = textChunk.charCodeAt(i);

        if (c === '\n'.charCodeAt(0) || c === '\r'.charCodeAt(0)) {
          n = i;
        }
      }

      var chunk = (n !== -1 ? textBuffer : '') + textChunk.slice(0, n + 1);
      textBuffer = (n === -1 ? textBuffer : '') + textChunk.slice(n + 1);

      if (chunk !== '') {
        wasActivity = true;
      }

      for (var position = 0; position < chunk.length; position += 1) {
        var c = chunk.charCodeAt(position);

        if (state === AFTER_CR && c === '\n'.charCodeAt(0)) {
          state = FIELD_START;
        } else {
          if (state === AFTER_CR) {
            state = FIELD_START;
          }

          if (c === '\r'.charCodeAt(0) || c === '\n'.charCodeAt(0)) {
            if (state !== FIELD_START) {
              if (state === FIELD) {
                valueStart = position + 1;
              }

              var field = chunk.slice(fieldStart, valueStart - 1);
              var value = chunk.slice(valueStart + (valueStart < position && chunk.charCodeAt(valueStart) === ' '.charCodeAt(0) ? 1 : 0), position);

              if (field === 'data') {
                dataBuffer += '\n';
                dataBuffer += value;
              } else if (field === 'id') {
                lastEventIdBuffer = value;
              } else if (field === 'event') {
                eventTypeBuffer = value;
              } else if (field === 'retry') {
                initialRetry = parseDuration(value, initialRetry);
                retry = initialRetry;
              } else if (field === 'heartbeatTimeout') {
                heartbeatTimeout = parseDuration(value, heartbeatTimeout);

                if (timeout !== 0) {
                  clearTimeout(timeout);
                  timeout = setTimeout(function () {
                    onTimeout();
                  }, heartbeatTimeout);
                }
              }
            }

            if (state === FIELD_START) {
              if (dataBuffer !== '') {
                lastEventId = lastEventIdBuffer;

                if (eventTypeBuffer === '') {
                  eventTypeBuffer = 'message';
                }

                var event = new MessageEvent1(eventTypeBuffer, {
                  data: dataBuffer.slice(1),
                  lastEventId: lastEventIdBuffer
                });
                es.dispatchEvent(event);

                if (eventTypeBuffer === 'message') {
                  fire(es, es.onmessage, event);
                }

                if (currentState === CLOSED) {
                  return;
                }
              }

              dataBuffer = '';
              eventTypeBuffer = '';
            }

            state = c === '\r'.charCodeAt(0) ? AFTER_CR : FIELD_START;
          } else {
            if (state === FIELD_START) {
              fieldStart = position;
              state = FIELD;
            }

            if (state === FIELD) {
              if (c === ':'.charCodeAt(0)) {
                valueStart = position + 1;
                state = VALUE_START;
              }
            } else if (state === VALUE_START) {
              state = VALUE;
            }
          }
        }
      }
    }
  };

  var onFinish = function onFinish() {
    if (currentState === OPEN || currentState === CONNECTING) {
      currentState = WAITING;

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      timeout = setTimeout(function () {
        onTimeout();
      }, retry);
      retry = clampDuration(Math.min(initialRetry * 16, retry * 2));
      es.readyState = CONNECTING;
      var event = new Event1('error');
      es.dispatchEvent(event);
      fire(es, es.onerror, event);
    }
  };

  var close = function close() {
    currentState = CLOSED;

    if (cancelFunction != undefined) {
      cancelFunction();
      cancelFunction = undefined;
    }

    if (timeout !== 0) {
      clearTimeout(timeout);
      timeout = 0;
    }

    es.readyState = CLOSED;
  };

  var onTimeout = function onTimeout() {
    timeout = 0;

    if (currentState !== WAITING) {
      if (!wasActivity && cancelFunction != undefined) {
        throwError(new Error('No activity within ' + heartbeatTimeout + ' milliseconds. Reconnecting.'));
        cancelFunction();
        cancelFunction = undefined;
      } else {
        wasActivity = false;
        timeout = setTimeout(function () {
          onTimeout();
        }, heartbeatTimeout);
      }

      return;
    }

    wasActivity = false;
    timeout = setTimeout(function () {
      onTimeout();
    }, heartbeatTimeout);
    currentState = CONNECTING;
    dataBuffer = '';
    eventTypeBuffer = '';
    lastEventIdBuffer = lastEventId;
    textBuffer = '';
    fieldStart = 0;
    valueStart = 0;
    state = FIELD_START; // https://bugzilla.mozilla.org/show_bug.cgi?id=428916
    // Request header field Last-Event-ID is not allowed by Access-Control-Allow-Headers.

    var requestURL = url;

    if (url.slice(0, 5) !== 'data:' && url.slice(0, 5) !== 'blob:') {
      if (lastEventId !== '') {
        requestURL += (url.indexOf('?') === -1 ? '?' : '&') + 'lastEventId=' + encodeURIComponent(lastEventId);
      }
    }

    var requestHeaders = {};
    requestHeaders['Accept'] = 'text/event-stream';

    if (headers2 != undefined) {
      for (var name in headers2) {
        if (Object.prototype.hasOwnProperty.call(headers2, name)) {
          requestHeaders[name] = headers2[name];
        }
      }
    }

    try {
      transport.open(xhr, onStart, onProgress, onFinish, requestURL, withCredentials, requestHeaders);
    } catch (error) {
      close();
      throw error;
    }
  };

  es.url = url;
  es.readyState = CONNECTING;
  es.withCredentials = withCredentials;
  es._close = close;
  onTimeout();
}

EventSourcePolyfill.prototype = Object.create(EventTarget1.prototype);
EventSourcePolyfill.prototype.CONNECTING = CONNECTING;
EventSourcePolyfill.prototype.OPEN = OPEN;
EventSourcePolyfill.prototype.CLOSED = CLOSED;

EventSourcePolyfill.prototype.close = function () {
  this._close();
};

EventSourcePolyfill.CONNECTING = CONNECTING;
EventSourcePolyfill.OPEN = OPEN;
EventSourcePolyfill.CLOSED = CLOSED;
EventSourcePolyfill.prototype.withCredentials = undefined;
var _default = EventSourcePolyfill;
exports.default = _default;

var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;

$RefreshReg$(_c, "TextDecoderPolyfill");
$RefreshReg$(_c2, "XHRWrapper");
$RefreshReg$(_c3, "HeadersPolyfill");
$RefreshReg$(_c4, "XHRTransport");
$RefreshReg$(_c5, "HeadersWrapper");
$RefreshReg$(_c6, "FetchTransport");
$RefreshReg$(_c7, "EventTarget1");
$RefreshReg$(_c8, "Event1");
$RefreshReg$(_c9, "MessageEvent1");
$RefreshReg$(_c10, "ConnectionEvent");
$RefreshReg$(_c11, "EventSourcePolyfill");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/fouc.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/client/dev/fouc.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.displayContent = displayContent;

function displayContent(callback) {
  (window.requestAnimationFrame || setTimeout)(function () {
    for (var x = document.querySelectorAll('[data-next-hide-fouc]'), i = x.length; i--;) {
      x[i].parentNode.removeChild(x[i]);
    }

    if (callback) {
      callback();
    }
  });
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/on-demand-entries-utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/on-demand-entries-utils.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.closePing = closePing;
exports.setupPing = setupPing;
exports.currentPage = void 0;

var _eventsource = __webpack_require__(/*! ./error-overlay/eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");

var evtSource;
var currentPage;
exports.currentPage = currentPage;

function closePing() {
  if (evtSource) evtSource.close();
  evtSource = null;
}

function setupPing(assetPrefix, pathnameFn, retry) {
  var pathname = pathnameFn(); // Make sure to only create new EventSource request if page has changed

  if (pathname === currentPage && !retry) return;
  exports.currentPage = currentPage = pathname; // close current EventSource connection

  closePing();
  evtSource = (0, _eventsource).getEventSourceWrapper({
    path: "".concat(assetPrefix, "/_next/webpack-hmr?page=").concat(encodeURIComponent(currentPage)),
    timeout: 5000
  });
  evtSource.addMessageListener(function (event) {
    if (event.data.indexOf('{') === -1) return;

    try {
      var payload = JSON.parse(event.data); // don't attempt fetching the page if we're already showing
      // the dev overlay as this can cause the error to be triggered
      // repeatedly

      if (payload.invalid && !self.__NEXT_DATA__.err) {
        // Payload can be invalid even if the page does not exist.
        // So, we need to make sure it exists before reloading.
        fetch(location.href, {
          credentials: 'same-origin'
        }).then(function (pageRes) {
          if (pageRes.status === 200) {
            location.reload();
          }
        });
      }
    } catch (err) {
      console.error('on-demand-entries failed to parse response', err);
    }
  });
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ (function(module) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./node_modules/next/dist/client/dev/amp-dev.js"));
/******/ _N_E = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljL2NodW5rcy9hbXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhOzs7O0FBQ2IsSUFBSUEsb0JBQW9CLEdBQUdDLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLDZGQUFELENBQVIsQ0FBakQ7O0FBQ0EsSUFBSUMsWUFBWSxHQUFHRCxtQkFBTyxDQUFDLHFHQUFELENBQTFCOztBQUNBLElBQUlFLHFCQUFxQixHQUFHRixtQkFBTyxDQUFDLGlHQUFELENBQW5DOztBQUNBLElBQUlHLEtBQUssR0FBR0gsbUJBQU8sQ0FBQywyREFBRCxDQUFuQjs7QUFDQSxTQUFTSSxrQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUNDLE9BQWpDLEVBQTBDQyxNQUExQyxFQUFrREMsS0FBbEQsRUFBeURDLE1BQXpELEVBQWlFQyxHQUFqRSxFQUFzRUMsR0FBdEUsRUFBMkU7QUFDdkUsTUFBSTtBQUNBLFFBQUlDLElBQUksR0FBR1AsR0FBRyxDQUFDSyxHQUFELENBQUgsQ0FBU0MsR0FBVCxDQUFYO0FBQ0EsUUFBSUUsS0FBSyxHQUFHRCxJQUFJLENBQUNDLEtBQWpCO0FBQ0gsR0FIRCxDQUdFLE9BQU9DLEtBQVAsRUFBYztBQUNaUCxJQUFBQSxNQUFNLENBQUNPLEtBQUQsQ0FBTjtBQUNBO0FBQ0g7O0FBQ0QsTUFBSUYsSUFBSSxDQUFDRyxJQUFULEVBQWU7QUFDWFQsSUFBQUEsT0FBTyxDQUFDTyxLQUFELENBQVA7QUFDSCxHQUZELE1BRU87QUFDSEcsSUFBQUEsT0FBTyxDQUFDVixPQUFSLENBQWdCTyxLQUFoQixFQUF1QkksSUFBdkIsQ0FBNEJULEtBQTVCLEVBQW1DQyxNQUFuQztBQUNIO0FBQ0o7O0FBQ0QsU0FBU1MsaUJBQVQsQ0FBMkJDLEVBQTNCLEVBQStCO0FBQzNCLFNBQU8sWUFBVztBQUNkLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQUEsUUFBaUJDLElBQUksR0FBR0MsU0FBeEI7QUFDQSxXQUFPLElBQUlOLE9BQUosQ0FBWSxVQUFTVixPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUN6QyxVQUFJRixHQUFHLEdBQUdjLEVBQUUsQ0FBQ0ksS0FBSCxDQUFTSCxJQUFULEVBQWVDLElBQWYsQ0FBVjs7QUFDQSxlQUFTYixLQUFULENBQWVLLEtBQWYsRUFBc0I7QUFDbEJULFFBQUFBLGtCQUFrQixDQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBZUMsTUFBZixFQUF1QkMsS0FBdkIsRUFBOEJDLE1BQTlCLEVBQXNDLE1BQXRDLEVBQThDSSxLQUE5QyxDQUFsQjtBQUNIOztBQUNELGVBQVNKLE1BQVQsQ0FBZ0JlLEdBQWhCLEVBQXFCO0FBQ2pCcEIsUUFBQUEsa0JBQWtCLENBQUNDLEdBQUQsRUFBTUMsT0FBTixFQUFlQyxNQUFmLEVBQXVCQyxLQUF2QixFQUE4QkMsTUFBOUIsRUFBc0MsT0FBdEMsRUFBK0NlLEdBQS9DLENBQWxCO0FBQ0g7O0FBQ0RoQixNQUFBQSxLQUFLLENBQUNpQixTQUFELENBQUw7QUFDSCxLQVRNLENBQVA7QUFVSCxHQVpEO0FBYUg7O0FBQ0QsU0FBUzFCLHNCQUFULENBQWdDMkIsR0FBaEMsRUFBcUM7QUFDakMsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0FBQ2pDLGVBQVNBO0FBRHdCLEdBQXJDO0FBR0g7O0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUNDLFdBQVosRUFBeUI7QUFDckJELEVBQUFBLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQi9CLG9CQUFvQixXQUF6QztBQUNIOztBQUNELElBQU1nQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUNDLFdBQXBELENBQWI7QUFDQSxJQUFNQyxXQUFOLEdBQThCTixJQUE5QixDQUFNTSxXQUFOO0FBQUEsSUFBb0JDLElBQXBCLEdBQThCUCxJQUE5QixDQUFvQk8sSUFBcEI7QUFDQUQsV0FBVyxHQUFHQSxXQUFXLElBQUksRUFBN0I7QUFDQSxJQUFJRSxjQUFjLEdBQUcsSUFBckI7QUFDQTs7QUFBK0IsSUFBSUMsT0FBTyxHQUFHQyx1QkFBZDtBQUMvQixJQUFNQyxhQUFhLEdBQUdMLFdBQVcsSUFBSUEsV0FBVyxDQUFDTSxRQUFaLENBQXFCLEdBQXJCLElBQTRCLEVBQTVCLEdBQWlDLEdBQXJDLENBQVgsR0FBdUQsdUJBQTdFLEVBQ0E7O0FBQ0EsU0FBU0MsaUJBQVQsR0FBNkI7QUFDekI7QUFDQTs7QUFDQTtBQUErQixTQUFPTCxjQUFjLEtBQUtFLHVCQUExQjtBQUNsQyxFQUNEOzs7QUFDQSxTQUFTSSxlQUFULEdBQTJCO0FBQ3ZCLFNBQU9DLFVBQUEsQ0FBV0UsTUFBWCxPQUF3QixNQUEvQjtBQUNIOztBQUNELFNBQVNDLGdCQUFULEdBQTRCO0FBQ3hCQSxFQUFBQSxnQkFBZ0IsR0FBRztBQUNuQjtBQUNBOUIsRUFBQUEsaUJBQWlCLHdDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNWLENBQUN5QixpQkFBaUIsRUFBbEIsSUFBd0IsQ0FBQ0MsZUFBZSxFQUQ5QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFLRSxtQkFBTUssS0FBSyxDQUFDLE9BQU9DLHFCQUFQLEtBQWtDLFdBQWxDLGFBQW1EVCxhQUFuRCxTQUFtRUYsT0FBbkUsY0FBOEVXLHFCQUE5RSxrQ0FBNEhULGFBQTVILFNBQTRJRixPQUE1SSxxQkFBRCxDQUFYOztBQUxGO0FBS0pZLFlBQUFBLEdBTEk7QUFBQTtBQU1PLG1CQUFNQSxHQUFHLENBQUNDLElBQUosRUFBTjs7QUFOUDtBQU1KQyxZQUFBQSxRQU5JO0FBT0pDLFlBQUFBLE9BUEksR0FPTWpCLElBQUksS0FBSyxHQUFULEdBQWUsT0FBZixHQUF5QkEsSUFQL0IsRUFRVjs7QUFDTWtCLFlBQUFBLFdBVEksR0FTVSxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0osUUFBUSxDQUFDSyxDQUF2QixJQUE0QkwsUUFBUSxDQUFDSyxDQUFyQyxHQUF5Q0MsTUFBTSxDQUFDQyxJQUFQLENBQVlQLFFBQVEsQ0FBQ0ssQ0FBckIsQ0FBMUMsRUFBbUVHLElBQW5FLENBQXdFLFVBQUNDLEdBQUQsRUFBTztBQUMvRixxQkFBT0EsR0FBRyxDQUFDQyxPQUFKLGdCQUFvQlQsT0FBTyxDQUFDVSxNQUFSLENBQWUsQ0FBZixFQUFrQixDQUFsQixNQUF5QixHQUF6QixHQUErQlYsT0FBL0IsY0FBNkNBLE9BQTdDLENBQXBCLE9BQWtGLENBQUMsQ0FBbkYsSUFBd0ZRLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLGVBQVFULE9BQU8sQ0FBQ1UsTUFBUixDQUFlLENBQWYsRUFBa0IsQ0FBbEIsTUFBeUIsR0FBekIsR0FBK0JWLE9BQS9CLGNBQTZDQSxPQUE3QyxDQUFSLEVBQWlFVyxPQUFqRSxDQUF5RSxLQUF6RSxFQUFnRixJQUFoRixDQUFaLE1BQXVHLENBQUMsQ0FBdk07QUFDSCxhQUZtQixDQVRWOztBQVlWLGdCQUFJVixXQUFKLEVBQWlCO0FBQ2J0QixjQUFBQSxRQUFRLENBQUNpQyxRQUFULENBQWtCQyxNQUFsQixDQUF5QixJQUF6QjtBQUNILGFBRkQsTUFFTztBQUNINUIsY0FBQUEsT0FBTyxHQUFHRCxjQUFWO0FBQ0g7O0FBaEJTO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBa0JWOEIsWUFBQUEsT0FBTyxDQUFDdEQsS0FBUixDQUFjLG9DQUFkO0FBQ0FtQixZQUFBQSxRQUFRLENBQUNpQyxRQUFULENBQWtCQyxNQUFsQixDQUF5QixJQUF6Qjs7QUFuQlU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBRCxFQUZqQjtBQXdCQSxTQUFPbkIsZ0JBQWdCLENBQUN6QixLQUFqQixDQUF1QixJQUF2QixFQUE2QkQsU0FBN0IsQ0FBUDtBQUNIOztBQUNELFNBQVMrQyxlQUFULEdBQTJCO0FBQ3ZCLFNBQU9yQixnQkFBZ0IsQ0FBQ3pCLEtBQWpCLENBQXVCLElBQXZCLEVBQTZCRCxTQUE3QixDQUFQO0FBQ0g7O0FBQ0QsQ0FBQyxHQUFHckIsWUFBSixFQUFrQnFFLGtCQUFsQixDQUFxQyxVQUFDQyxLQUFELEVBQVM7QUFDMUMsTUFBSUEsS0FBSyxDQUFDekMsSUFBTixLQUFlLGNBQW5CLEVBQW1DO0FBQy9CO0FBQ0g7O0FBQ0QsTUFBSTtBQUNBLFFBQU0wQyxPQUFPLEdBQUd6QyxJQUFJLENBQUNDLEtBQUwsQ0FBV3VDLEtBQUssQ0FBQ3pDLElBQWpCLENBQWhCOztBQUNBLFFBQUkwQyxPQUFPLENBQUNDLE1BQVIsS0FBbUIsTUFBbkIsSUFBNkJELE9BQU8sQ0FBQ0MsTUFBUixLQUFtQixPQUFwRCxFQUE2RDtBQUN6RCxVQUFJLENBQUNELE9BQU8sQ0FBQ0UsSUFBYixFQUFtQjtBQUNmO0FBQ0g7O0FBQ0RwQyxNQUFBQSxjQUFjLEdBQUdrQyxPQUFPLENBQUNFLElBQXpCO0FBQ0FMLE1BQUFBLGVBQWU7QUFDbEIsS0FORCxNQU1PLElBQUlHLE9BQU8sQ0FBQ0MsTUFBUixLQUFtQixZQUF2QixFQUFxQztBQUN4Q3hDLE1BQUFBLFFBQVEsQ0FBQ2lDLFFBQVQsQ0FBa0JDLE1BQWxCLENBQXlCLElBQXpCO0FBQ0g7QUFDSixHQVhELENBV0UsT0FBT1EsRUFBUCxFQUFXO0FBQ1RQLElBQUFBLE9BQU8sQ0FBQ1EsSUFBUixDQUFhLDBCQUEwQkwsS0FBSyxDQUFDekMsSUFBaEMsR0FBdUMsSUFBdkMsR0FBOEM2QyxFQUEzRDtBQUNIO0FBQ0osQ0FsQkQ7QUFtQkEsQ0FBQyxHQUFHekUscUJBQUosRUFBMkIyRSxTQUEzQixDQUFxQ3pDLFdBQXJDLEVBQWtEO0FBQUEsU0FBSUMsSUFBSjtBQUFBLENBQWxEO0FBRUEsQ0FBQyxHQUFHbEMsS0FBSixFQUFXMkUsY0FBWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3R2E7O0FBQ2JuQiw4Q0FBNkM7QUFDekM5QyxFQUFBQSxLQUFLLEVBQUU7QUFEa0MsQ0FBN0M7QUFHQW1FLDBCQUFBLEdBQTZCVixrQkFBN0I7QUFDQVUsNkJBQUEsR0FBZ0NDLHFCQUFoQztBQUNBLElBQU1DLGNBQWMsR0FBRyxFQUF2Qjs7QUFDQSxTQUFTQyxrQkFBVCxDQUE0QkMsT0FBNUIsRUFBcUM7QUFDakMsTUFBSUMsTUFBSjtBQUNBLE1BQUlDLFlBQVksR0FBRyxJQUFJQyxJQUFKLEVBQW5CO0FBQ0EsTUFBSUMsU0FBUyxHQUFHLEVBQWhCOztBQUNBLE1BQUksQ0FBQ0osT0FBTyxDQUFDSyxPQUFiLEVBQXNCO0FBQ2xCTCxJQUFBQSxPQUFPLENBQUNLLE9BQVIsR0FBa0IsS0FBSyxJQUF2QjtBQUNIOztBQUNEQyxFQUFBQSxJQUFJO0FBQ0osTUFBSUMsS0FBSyxHQUFHQyxXQUFXLENBQUMsWUFBVztBQUMvQixRQUFJLElBQUlMLElBQUosS0FBYUQsWUFBYixHQUE0QkYsT0FBTyxDQUFDSyxPQUF4QyxFQUFpRDtBQUM3Q0ksTUFBQUEsZ0JBQWdCO0FBQ25CO0FBQ0osR0FKc0IsRUFJcEJULE9BQU8sQ0FBQ0ssT0FBUixHQUFrQixDQUpFLENBQXZCOztBQUtBLFdBQVNDLElBQVQsR0FBZ0I7QUFDWkwsSUFBQUEsTUFBTSxHQUFHLElBQUl6RCxNQUFNLENBQUNDLFdBQVgsQ0FBdUJ1RCxPQUFPLENBQUNVLElBQS9CLENBQVQ7QUFDQVQsSUFBQUEsTUFBTSxDQUFDVSxNQUFQLEdBQWdCQyxZQUFoQjtBQUNBWCxJQUFBQSxNQUFNLENBQUNZLE9BQVAsR0FBaUJKLGdCQUFqQjtBQUNBUixJQUFBQSxNQUFNLENBQUNhLFNBQVAsR0FBbUJDLGFBQW5CO0FBQ0g7O0FBQ0QsV0FBU0gsWUFBVCxHQUF3QjtBQUNwQixRQUFJWixPQUFPLENBQUNnQixHQUFaLEVBQWlCaEMsT0FBTyxDQUFDZ0MsR0FBUixDQUFZLGlCQUFaO0FBQ2pCZCxJQUFBQSxZQUFZLEdBQUcsSUFBSUMsSUFBSixFQUFmO0FBQ0g7O0FBQ0QsV0FBU1ksYUFBVCxDQUF1QjVCLEtBQXZCLEVBQThCO0FBQzFCZSxJQUFBQSxZQUFZLEdBQUcsSUFBSUMsSUFBSixFQUFmOztBQUNBLFNBQUksSUFBSWMsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHYixTQUFTLENBQUNjLE1BQTdCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQXlDO0FBQ3JDYixNQUFBQSxTQUFTLENBQUNhLENBQUQsQ0FBVCxDQUFhOUIsS0FBYjtBQUNIOztBQUNEVyxJQUFBQSxjQUFjLENBQUNxQixPQUFmLENBQXVCLFVBQUNDLEVBQUQsRUFBTTtBQUN6QixVQUFJLENBQUNBLEVBQUUsQ0FBQ0MsVUFBSixJQUFrQmxDLEtBQUssQ0FBQ3pDLElBQU4sQ0FBV2lDLE9BQVgsQ0FBbUIsUUFBbkIsTUFBaUMsQ0FBQyxDQUF4RCxFQUEyRDtBQUMzRHlDLE1BQUFBLEVBQUUsQ0FBQ2pDLEtBQUQsQ0FBRjtBQUNILEtBSEQ7QUFJSDs7QUFDRCxXQUFTc0IsZ0JBQVQsR0FBNEI7QUFDeEJhLElBQUFBLGFBQWEsQ0FBQ2YsS0FBRCxDQUFiO0FBQ0FOLElBQUFBLE1BQU0sQ0FBQ3NCLEtBQVA7QUFDQUMsSUFBQUEsVUFBVSxDQUFDbEIsSUFBRCxFQUFPTixPQUFPLENBQUNLLE9BQWYsQ0FBVjtBQUNIOztBQUNELFNBQU87QUFDSGtCLElBQUFBLEtBQUssRUFBRSxpQkFBSTtBQUNQRCxNQUFBQSxhQUFhLENBQUNmLEtBQUQsQ0FBYjtBQUNBTixNQUFBQSxNQUFNLENBQUNzQixLQUFQO0FBQ0gsS0FKRTtBQUtIckMsSUFBQUEsa0JBQWtCLEVBQUUsNEJBQVNuRCxFQUFULEVBQWE7QUFDN0JxRSxNQUFBQSxTQUFTLENBQUNxQixJQUFWLENBQWUxRixFQUFmO0FBQ0g7QUFQRSxHQUFQO0FBU0g7O0tBL0NRZ0U7O0FBZ0RULFNBQVNiLGtCQUFULENBQTRCa0MsRUFBNUIsRUFBZ0M7QUFDNUJ0QixFQUFBQSxjQUFjLENBQUMyQixJQUFmLENBQW9CTCxFQUFwQjtBQUNIOztBQUNELFNBQVN2QixxQkFBVCxDQUErQkcsT0FBL0IsRUFBd0M7QUFDcEMsU0FBT0Qsa0JBQWtCLENBQUNDLE9BQUQsQ0FBekI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNURZOztBQUNiekIsOENBQTZDO0FBQ3pDOUMsRUFBQUEsS0FBSyxFQUFFO0FBRGtDLENBQTdDO0FBR0FtRSxlQUFBLEdBQWtCLEtBQUssQ0FBdkI7QUFDQTtBQUFxQjtBQUNyQjtBQUNBOztBQUNBLElBQUkvQyxRQUFRLEdBQUdMLE1BQU0sQ0FBQ0ssUUFBdEI7QUFDQSxJQUFJNkUsU0FBUyxHQUFHbEYsTUFBTSxDQUFDbUYsUUFBdkI7QUFDQSxJQUFJQyxZQUFZLEdBQUdwRixNQUFNLENBQUNxRixXQUExQjtBQUNBLElBQUlDLFlBQVksR0FBR3RGLE1BQU0sQ0FBQ3VGLFdBQTFCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUd4RixNQUFNLENBQUN5RixlQUE5Qjs7QUFDQSxJQUFJRCxnQkFBZ0IsSUFBSTNGLFNBQXhCLEVBQW1DO0FBQy9CMkYsRUFBQUEsZ0JBQWdCLEdBQUcsNEJBQVc7QUFDMUIsU0FBS0UsTUFBTCxHQUFjLElBQWQ7O0FBQ0EsU0FBS0MsS0FBTCxHQUFhLFlBQVcsQ0FDdkIsQ0FERDtBQUVILEdBSkQ7QUFLSDs7QUFDRCxTQUFTQyxtQkFBVCxHQUErQjtBQUMzQixPQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNIOztLQUhRRjs7QUFJVEEsbUJBQW1CLENBQUNHLFNBQXBCLENBQThCQyxNQUE5QixHQUF1QyxVQUFTQyxNQUFULEVBQWlCO0FBQ3BELFdBQVNDLEtBQVQsQ0FBZUosU0FBZixFQUEwQkssS0FBMUIsRUFBaUNDLFdBQWpDLEVBQThDO0FBQzFDLFFBQUlBLFdBQVcsS0FBSyxDQUFwQixFQUF1QjtBQUNuQixhQUFPTixTQUFTLElBQUksT0FBT0ssS0FBcEIsSUFBNkJMLFNBQVMsSUFBSUssS0FBYixJQUFzQixJQUExRDtBQUNIOztBQUNELFFBQUlDLFdBQVcsS0FBSyxDQUFwQixFQUF1QjtBQUNuQixhQUFPTixTQUFTLElBQUksUUFBUUssS0FBckIsSUFBOEJMLFNBQVMsSUFBSUssS0FBYixJQUFzQixLQUFwRCxJQUE2REwsU0FBUyxJQUFJLFNBQVNLLEtBQXRCLElBQStCTCxTQUFTLElBQUlLLEtBQWIsSUFBc0IsS0FBekg7QUFDSDs7QUFDRCxRQUFJQyxXQUFXLEtBQUssQ0FBcEIsRUFBdUI7QUFDbkIsYUFBT04sU0FBUyxJQUFJLFNBQVNLLEtBQXRCLElBQStCTCxTQUFTLElBQUlLLEtBQWIsSUFBc0IsT0FBNUQ7QUFDSDs7QUFDRCxVQUFNLElBQUlFLEtBQUosRUFBTjtBQUNIOztBQUNELFdBQVNELFdBQVQsQ0FBcUJQLFVBQXJCLEVBQWlDQyxTQUFqQyxFQUE0QztBQUN4QyxRQUFJRCxVQUFVLEtBQUssSUFBSSxDQUF2QixFQUEwQjtBQUN0QixhQUFPQyxTQUFTLElBQUksQ0FBYixHQUFpQixFQUFqQixHQUFzQixDQUF0QixHQUEwQkEsU0FBUyxHQUFHLEVBQVosR0FBaUIsQ0FBakIsR0FBcUIsQ0FBdEQ7QUFDSDs7QUFDRCxRQUFJRCxVQUFVLEtBQUssSUFBSSxDQUF2QixFQUEwQjtBQUN0QixhQUFPQyxTQUFTLEdBQUcsRUFBWixHQUFpQixDQUFqQixHQUFxQixDQUE1QjtBQUNIOztBQUNELFFBQUlELFVBQVUsS0FBSyxJQUFJLENBQXZCLEVBQTBCO0FBQ3RCLGFBQU8sQ0FBUDtBQUNIOztBQUNELFVBQU0sSUFBSVEsS0FBSixFQUFOO0FBQ0g7O0FBQ0QsTUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxNQUFJQyxNQUFNLEdBQUcsRUFBYjtBQUNBLE1BQUlWLFVBQVUsR0FBRyxLQUFLQSxVQUF0QjtBQUNBLE1BQUlDLFNBQVMsR0FBRyxLQUFLQSxTQUFyQjs7QUFDQSxPQUFJLElBQUlyQixDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUd3QixNQUFNLENBQUN2QixNQUExQixFQUFrQ0QsQ0FBQyxJQUFJLENBQXZDLEVBQXlDO0FBQ3JDLFFBQUkrQixLQUFLLEdBQUdQLE1BQU0sQ0FBQ3hCLENBQUQsQ0FBbEI7O0FBQ0EsUUFBSW9CLFVBQVUsS0FBSyxDQUFuQixFQUFzQjtBQUNsQixVQUFJVyxLQUFLLEdBQUcsR0FBUixJQUFlQSxLQUFLLEdBQUcsR0FBdkIsSUFBOEIsQ0FBQ04sS0FBSyxDQUFDSixTQUFTLElBQUksQ0FBYixHQUFpQlUsS0FBSyxHQUFHLEVBQTFCLEVBQThCWCxVQUFVLEdBQUcsQ0FBM0MsRUFBOENPLFdBQVcsQ0FBQ1AsVUFBRCxFQUFhQyxTQUFiLENBQXpELENBQXhDLEVBQTJIO0FBQ3ZIRCxRQUFBQSxVQUFVLEdBQUcsQ0FBYjtBQUNBQyxRQUFBQSxTQUFTLEdBQUdRLFFBQVo7QUFDQUMsUUFBQUEsTUFBTSxJQUFJRSxNQUFNLENBQUNDLFlBQVAsQ0FBb0JaLFNBQXBCLENBQVY7QUFDSDtBQUNKOztBQUNELFFBQUlELFVBQVUsS0FBSyxDQUFuQixFQUFzQjtBQUNsQixVQUFJVyxLQUFLLElBQUksQ0FBVCxJQUFjQSxLQUFLLElBQUksR0FBM0IsRUFBZ0M7QUFDNUJYLFFBQUFBLFVBQVUsR0FBRyxDQUFiO0FBQ0FDLFFBQUFBLFNBQVMsR0FBR1UsS0FBWjtBQUNILE9BSEQsTUFHTyxJQUFJQSxLQUFLLElBQUksR0FBVCxJQUFnQkEsS0FBSyxJQUFJLEdBQTdCLEVBQWtDO0FBQ3JDWCxRQUFBQSxVQUFVLEdBQUcsSUFBSSxDQUFqQjtBQUNBQyxRQUFBQSxTQUFTLEdBQUdVLEtBQUssR0FBRyxFQUFwQjtBQUNILE9BSE0sTUFHQSxJQUFJQSxLQUFLLElBQUksR0FBVCxJQUFnQkEsS0FBSyxJQUFJLEdBQTdCLEVBQWtDO0FBQ3JDWCxRQUFBQSxVQUFVLEdBQUcsSUFBSSxDQUFqQjtBQUNBQyxRQUFBQSxTQUFTLEdBQUdVLEtBQUssR0FBRyxFQUFwQjtBQUNILE9BSE0sTUFHQSxJQUFJQSxLQUFLLElBQUksR0FBVCxJQUFnQkEsS0FBSyxJQUFJLEdBQTdCLEVBQWtDO0FBQ3JDWCxRQUFBQSxVQUFVLEdBQUcsSUFBSSxDQUFqQjtBQUNBQyxRQUFBQSxTQUFTLEdBQUdVLEtBQUssR0FBRyxDQUFwQjtBQUNILE9BSE0sTUFHQTtBQUNIWCxRQUFBQSxVQUFVLEdBQUcsQ0FBYjtBQUNBQyxRQUFBQSxTQUFTLEdBQUdRLFFBQVo7QUFDSDs7QUFDRCxVQUFJVCxVQUFVLEtBQUssQ0FBZixJQUFvQixDQUFDSyxLQUFLLENBQUNKLFNBQUQsRUFBWUQsVUFBWixFQUF3Qk8sV0FBVyxDQUFDUCxVQUFELEVBQWFDLFNBQWIsQ0FBbkMsQ0FBOUIsRUFBMkY7QUFDdkZELFFBQUFBLFVBQVUsR0FBRyxDQUFiO0FBQ0FDLFFBQUFBLFNBQVMsR0FBR1EsUUFBWjtBQUNIO0FBQ0osS0FyQkQsTUFxQk87QUFDSFQsTUFBQUEsVUFBVSxJQUFJLENBQWQ7QUFDQUMsTUFBQUEsU0FBUyxHQUFHQSxTQUFTLElBQUksQ0FBYixHQUFpQlUsS0FBSyxHQUFHLEVBQXJDO0FBQ0g7O0FBQ0QsUUFBSVgsVUFBVSxLQUFLLENBQW5CLEVBQXNCO0FBQ2xCLFVBQUlDLFNBQVMsSUFBSSxLQUFqQixFQUF3QjtBQUNwQlMsUUFBQUEsTUFBTSxJQUFJRSxNQUFNLENBQUNDLFlBQVAsQ0FBb0JaLFNBQXBCLENBQVY7QUFDSCxPQUZELE1BRU87QUFDSFMsUUFBQUEsTUFBTSxJQUFJRSxNQUFNLENBQUNDLFlBQVAsQ0FBb0IsU0FBU1osU0FBUyxHQUFHLEtBQVosR0FBb0IsQ0FBcEIsSUFBeUIsRUFBbEMsQ0FBcEIsQ0FBVjtBQUNBUyxRQUFBQSxNQUFNLElBQUlFLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQixTQUFTWixTQUFTLEdBQUcsS0FBWixHQUFvQixDQUFwQixHQUF3QixJQUFqQyxDQUFwQixDQUFWO0FBQ0g7QUFDSjtBQUNKOztBQUNELE9BQUtELFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFPUyxNQUFQO0FBQ0gsQ0EzRUQsRUE0RUE7OztBQUNBLElBQUlJLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsR0FBVztBQUNsQyxNQUFJO0FBQ0EsV0FBTyxJQUFJdkIsWUFBSixHQUFtQlksTUFBbkIsQ0FBMEIsSUFBSVYsWUFBSixHQUFtQnNCLE1BQW5CLENBQTBCLE1BQTFCLENBQTFCLEVBQTZEO0FBQ2hFQyxNQUFBQSxNQUFNLEVBQUU7QUFEd0QsS0FBN0QsTUFFQSxNQUZQO0FBR0gsR0FKRCxDQUlFLE9BQU8zSCxLQUFQLEVBQWM7QUFDWnNELElBQUFBLE9BQU8sQ0FBQ2dDLEdBQVIsQ0FBWXRGLEtBQVo7QUFDSDs7QUFDRCxTQUFPLEtBQVA7QUFDSCxDQVRELEVBVUE7OztBQUNBLElBQUlrRyxZQUFZLElBQUl2RixTQUFoQixJQUE2QnlGLFlBQVksSUFBSXpGLFNBQTdDLElBQTBELENBQUM4RyxvQkFBb0IsRUFBbkYsRUFBdUY7QUFDbkZ2QixFQUFBQSxZQUFZLEdBQUdRLG1CQUFmO0FBQ0g7O0FBQ0QsSUFBSWtCLENBQUMsR0FBRyxTQUFKQSxDQUFJLEdBQVcsQ0FDbEIsQ0FERDs7QUFFQSxTQUFTQyxVQUFULENBQW9CQyxHQUFwQixFQUF5QjtBQUNyQixPQUFLQyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsT0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxPQUFLaEcsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLaUcsVUFBTCxHQUFrQixFQUFsQjtBQUNBLE9BQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCUixDQUFsQjtBQUNBLE9BQUtTLGtCQUFMLEdBQTBCVCxDQUExQjtBQUNBLE9BQUtVLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxPQUFLQyxJQUFMLEdBQVlULEdBQVo7QUFDQSxPQUFLVSxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsT0FBS0MsTUFBTCxHQUFjYixDQUFkO0FBQ0g7O01BYlFDOztBQWNUQSxVQUFVLENBQUNoQixTQUFYLENBQXFCNkIsSUFBckIsR0FBNEIsVUFBU0MsTUFBVCxFQUFpQkMsR0FBakIsRUFBc0I7QUFDOUMsT0FBS0gsTUFBTCxDQUFZLElBQVo7O0FBQ0EsTUFBSUksSUFBSSxHQUFHLElBQVg7QUFDQSxNQUFJZixHQUFHLEdBQUcsS0FBS1MsSUFBZjtBQUNBLE1BQUlPLEtBQUssR0FBRyxDQUFaO0FBQ0EsTUFBSW5FLE9BQU8sR0FBRyxDQUFkOztBQUNBLE9BQUs4RCxNQUFMLEdBQWMsVUFBU00sTUFBVCxFQUFpQjtBQUMzQixRQUFJRixJQUFJLENBQUNMLFlBQUwsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDekJRLE1BQUFBLFlBQVksQ0FBQ0gsSUFBSSxDQUFDTCxZQUFOLENBQVo7QUFDQUssTUFBQUEsSUFBSSxDQUFDTCxZQUFMLEdBQW9CLENBQXBCO0FBQ0g7O0FBQ0QsUUFBSU0sS0FBSyxLQUFLLENBQVYsSUFBZUEsS0FBSyxLQUFLLENBQXpCLElBQThCQSxLQUFLLEtBQUssQ0FBNUMsRUFBK0M7QUFDM0NBLE1BQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0FoQixNQUFBQSxHQUFHLENBQUNtQixNQUFKLEdBQWFyQixDQUFiO0FBQ0FFLE1BQUFBLEdBQUcsQ0FBQzNDLE9BQUosR0FBY3lDLENBQWQ7QUFDQUUsTUFBQUEsR0FBRyxDQUFDb0IsT0FBSixHQUFjdEIsQ0FBZDtBQUNBRSxNQUFBQSxHQUFHLENBQUNNLFVBQUosR0FBaUJSLENBQWpCO0FBQ0FFLE1BQUFBLEdBQUcsQ0FBQ08sa0JBQUosR0FBeUJULENBQXpCLENBTjJDLENBTzNDO0FBQ0E7O0FBQ0FFLE1BQUFBLEdBQUcsQ0FBQ3JCLEtBQUo7O0FBQ0EsVUFBSTlCLE9BQU8sS0FBSyxDQUFoQixFQUFtQjtBQUNmcUUsUUFBQUEsWUFBWSxDQUFDckUsT0FBRCxDQUFaO0FBQ0FBLFFBQUFBLE9BQU8sR0FBRyxDQUFWO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDb0UsTUFBTCxFQUFhO0FBQ1RGLFFBQUFBLElBQUksQ0FBQ1osVUFBTCxHQUFrQixDQUFsQjtBQUNBWSxRQUFBQSxJQUFJLENBQUNSLGtCQUFMO0FBQ0g7QUFDSjs7QUFDRFMsSUFBQUEsS0FBSyxHQUFHLENBQVI7QUFDSCxHQXpCRDs7QUEwQkEsTUFBSUssT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBVztBQUNyQixRQUFJTCxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNiO0FBQ0EsVUFBSTdHLE1BQU0sR0FBRyxDQUFiO0FBQ0EsVUFBSWlHLFVBQVUsR0FBRyxFQUFqQjtBQUNBLFVBQUlrQixXQUFXLEdBQUd6SSxTQUFsQjs7QUFDQSxVQUFJLEVBQUUsaUJBQWlCbUgsR0FBbkIsQ0FBSixFQUE2QjtBQUN6QixZQUFJO0FBQ0E3RixVQUFBQSxNQUFNLEdBQUc2RixHQUFHLENBQUM3RixNQUFiO0FBQ0FpRyxVQUFBQSxVQUFVLEdBQUdKLEdBQUcsQ0FBQ0ksVUFBakI7QUFDQWtCLFVBQUFBLFdBQVcsR0FBR3RCLEdBQUcsQ0FBQ3VCLGlCQUFKLENBQXNCLGNBQXRCLENBQWQ7QUFDSCxTQUpELENBSUUsT0FBT3JKLEtBQVAsRUFBYztBQUNaO0FBQ0E7QUFDQTtBQUNBaUMsVUFBQUEsTUFBTSxHQUFHLENBQVQ7QUFDQWlHLFVBQUFBLFVBQVUsR0FBRyxFQUFiO0FBQ0FrQixVQUFBQSxXQUFXLEdBQUd6SSxTQUFkLENBTlksQ0FPaEI7QUFDQTtBQUNBO0FBQ0M7QUFDSixPQWhCRCxNQWdCTztBQUNIc0IsUUFBQUEsTUFBTSxHQUFHLEdBQVQ7QUFDQWlHLFFBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0FrQixRQUFBQSxXQUFXLEdBQUd0QixHQUFHLENBQUNzQixXQUFsQjtBQUNIOztBQUNELFVBQUluSCxNQUFNLEtBQUssQ0FBZixFQUFrQjtBQUNkNkcsUUFBQUEsS0FBSyxHQUFHLENBQVI7QUFDQUQsUUFBQUEsSUFBSSxDQUFDWixVQUFMLEdBQWtCLENBQWxCO0FBQ0FZLFFBQUFBLElBQUksQ0FBQzVHLE1BQUwsR0FBY0EsTUFBZDtBQUNBNEcsUUFBQUEsSUFBSSxDQUFDWCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBVyxRQUFBQSxJQUFJLENBQUNQLFlBQUwsR0FBb0JjLFdBQXBCO0FBQ0FQLFFBQUFBLElBQUksQ0FBQ1Isa0JBQUw7QUFDSDtBQUNKO0FBQ0osR0FwQ0Q7O0FBcUNBLE1BQUlpQixVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFXO0FBQ3hCSCxJQUFBQSxPQUFPOztBQUNQLFFBQUlMLEtBQUssS0FBSyxDQUFWLElBQWVBLEtBQUssS0FBSyxDQUE3QixFQUFnQztBQUM1QkEsTUFBQUEsS0FBSyxHQUFHLENBQVI7QUFDQSxVQUFJWCxZQUFZLEdBQUcsRUFBbkI7O0FBQ0EsVUFBSTtBQUNBQSxRQUFBQSxZQUFZLEdBQUdMLEdBQUcsQ0FBQ0ssWUFBbkI7QUFDSCxPQUZELENBRUUsT0FBT25JLEtBQVAsRUFBYyxDQUNoQjtBQUNDOztBQUNENkksTUFBQUEsSUFBSSxDQUFDWixVQUFMLEdBQWtCLENBQWxCO0FBQ0FZLE1BQUFBLElBQUksQ0FBQ1YsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQVUsTUFBQUEsSUFBSSxDQUFDVCxVQUFMO0FBQ0g7QUFDSixHQWREOztBQWVBLE1BQUltQixRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFXO0FBQ3RCO0FBQ0E7QUFDQUQsSUFBQUEsVUFBVTs7QUFDVixRQUFJUixLQUFLLEtBQUssQ0FBVixJQUFlQSxLQUFLLEtBQUssQ0FBekIsSUFBOEJBLEtBQUssS0FBSyxDQUE1QyxFQUErQztBQUMzQ0EsTUFBQUEsS0FBSyxHQUFHLENBQVI7O0FBQ0EsVUFBSW5FLE9BQU8sS0FBSyxDQUFoQixFQUFtQjtBQUNmcUUsUUFBQUEsWUFBWSxDQUFDckUsT0FBRCxDQUFaO0FBQ0FBLFFBQUFBLE9BQU8sR0FBRyxDQUFWO0FBQ0g7O0FBQ0RrRSxNQUFBQSxJQUFJLENBQUNaLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQVksTUFBQUEsSUFBSSxDQUFDUixrQkFBTDtBQUNIO0FBQ0osR0FiRDs7QUFjQSxNQUFJbUIsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixHQUFXO0FBQ2hDLFFBQUkxQixHQUFHLElBQUluSCxTQUFYLEVBQXNCO0FBQ2xCO0FBQ0EsVUFBSW1ILEdBQUcsQ0FBQ0csVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUN0QnNCLFFBQUFBLFFBQVE7QUFDWCxPQUZELE1BRU8sSUFBSXpCLEdBQUcsQ0FBQ0csVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUM3QnFCLFFBQUFBLFVBQVU7QUFDYixPQUZNLE1BRUEsSUFBSXhCLEdBQUcsQ0FBQ0csVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUM3QmtCLFFBQUFBLE9BQU87QUFDVjtBQUNKO0FBQ0osR0FYRDs7QUFZQSxNQUFJTSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUFXO0FBQ3ZCOUUsSUFBQUEsT0FBTyxHQUFHbUIsVUFBVSxDQUFDLFlBQVc7QUFDNUIyRCxNQUFBQSxTQUFTO0FBQ1osS0FGbUIsRUFFakIsR0FGaUIsQ0FBcEI7O0FBR0EsUUFBSTNCLEdBQUcsQ0FBQ0csVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUN0QnFCLE1BQUFBLFVBQVU7QUFDYjtBQUNKLEdBUEQsQ0E5RzhDLENBc0g5Qzs7O0FBQ0F4QixFQUFBQSxHQUFHLENBQUNtQixNQUFKLEdBQWFNLFFBQWI7QUFDQXpCLEVBQUFBLEdBQUcsQ0FBQzNDLE9BQUosR0FBY29FLFFBQWQsQ0F4SDhDLENBeUg5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBekIsRUFBQUEsR0FBRyxDQUFDb0IsT0FBSixHQUFjSyxRQUFkLENBOUg4QyxDQStIOUM7O0FBQ0EsTUFBSSxFQUFFLGtCQUFrQkcsY0FBYyxDQUFDN0MsU0FBbkMsS0FBaUQsRUFBRSxhQUFhNkMsY0FBYyxDQUFDN0MsU0FBOUIsQ0FBckQsRUFBK0Y7QUFDM0ZpQixJQUFBQSxHQUFHLENBQUNNLFVBQUosR0FBaUJrQixVQUFqQjtBQUNILEdBbEk2QyxDQW1JOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQXhCLEVBQUFBLEdBQUcsQ0FBQ08sa0JBQUosR0FBeUJtQixrQkFBekI7O0FBQ0EsTUFBSSxpQkFBaUIxQixHQUFyQixFQUEwQjtBQUN0QmMsSUFBQUEsR0FBRyxJQUFJLENBQUNBLEdBQUcsQ0FBQzNGLE9BQUosQ0FBWSxHQUFaLE1BQXFCLENBQUMsQ0FBdEIsR0FBMEIsR0FBMUIsR0FBZ0MsR0FBakMsSUFBd0MsY0FBL0M7QUFDSDs7QUFDRDZFLEVBQUFBLEdBQUcsQ0FBQ1ksSUFBSixDQUFTQyxNQUFULEVBQWlCQyxHQUFqQixFQUFzQixJQUF0Qjs7QUFDQSxNQUFJLGdCQUFnQmQsR0FBcEIsRUFBeUI7QUFDckI7QUFDQTtBQUNBbkQsSUFBQUEsT0FBTyxHQUFHbUIsVUFBVSxDQUFDLFlBQVc7QUFDNUIyRCxNQUFBQSxTQUFTO0FBQ1osS0FGbUIsRUFFakIsQ0FGaUIsQ0FBcEI7QUFHSDtBQUNKLENBckpEOztBQXNKQTVCLFVBQVUsQ0FBQ2hCLFNBQVgsQ0FBcUJKLEtBQXJCLEdBQTZCLFlBQVc7QUFDcEMsT0FBS2dDLE1BQUwsQ0FBWSxLQUFaO0FBQ0gsQ0FGRDs7QUFHQVosVUFBVSxDQUFDaEIsU0FBWCxDQUFxQndDLGlCQUFyQixHQUF5QyxVQUFTTSxJQUFULEVBQWU7QUFDcEQsU0FBTyxLQUFLckIsWUFBWjtBQUNILENBRkQ7O0FBR0FULFVBQVUsQ0FBQ2hCLFNBQVgsQ0FBcUIrQyxnQkFBckIsR0FBd0MsVUFBU0QsSUFBVCxFQUFlNUosS0FBZixFQUFzQjtBQUMxRCxNQUFJK0gsR0FBRyxHQUFHLEtBQUtTLElBQWY7O0FBQ0EsTUFBSSxzQkFBc0JULEdBQTFCLEVBQStCO0FBQzNCQSxJQUFBQSxHQUFHLENBQUM4QixnQkFBSixDQUFxQkQsSUFBckIsRUFBMkI1SixLQUEzQjtBQUNIO0FBQ0osQ0FMRDs7QUFNQThILFVBQVUsQ0FBQ2hCLFNBQVgsQ0FBcUJnRCxxQkFBckIsR0FBNkMsWUFBVztBQUNwRCxTQUFPLEtBQUt0QixJQUFMLENBQVVzQixxQkFBVixJQUFtQ2xKLFNBQW5DLEdBQStDLEtBQUs0SCxJQUFMLENBQVVzQixxQkFBVixFQUEvQyxHQUFtRixFQUExRjtBQUNILENBRkQ7O0FBR0FoQyxVQUFVLENBQUNoQixTQUFYLENBQXFCaUQsSUFBckIsR0FBNEIsWUFBVztBQUNuQztBQUNBLE1BQUksRUFBRSxlQUFlSixjQUFjLENBQUM3QyxTQUFoQyxLQUE4QzFGLFFBQVEsSUFBSVIsU0FBMUQsSUFBdUVRLFFBQVEsQ0FBQzhHLFVBQVQsSUFBdUJ0SCxTQUE5RixJQUEyR1EsUUFBUSxDQUFDOEcsVUFBVCxLQUF3QixVQUF2SSxFQUFtSjtBQUMvSSxRQUFJWSxJQUFJLEdBQUcsSUFBWDtBQUNBQSxJQUFBQSxJQUFJLENBQUNMLFlBQUwsR0FBb0IxQyxVQUFVLENBQUMsWUFBVztBQUN0QytDLE1BQUFBLElBQUksQ0FBQ0wsWUFBTCxHQUFvQixDQUFwQjtBQUNBSyxNQUFBQSxJQUFJLENBQUNpQixJQUFMO0FBQ0gsS0FINkIsRUFHM0IsQ0FIMkIsQ0FBOUI7QUFJQTtBQUNIOztBQUNELE1BQUloQyxHQUFHLEdBQUcsS0FBS1MsSUFBZixDQVZtQyxDQVduQzs7QUFDQVQsRUFBQUEsR0FBRyxDQUFDQyxlQUFKLEdBQXNCLEtBQUtBLGVBQTNCO0FBQ0FELEVBQUFBLEdBQUcsQ0FBQ0UsWUFBSixHQUFtQixLQUFLQSxZQUF4Qjs7QUFDQSxNQUFJO0FBQ0E7QUFDQUYsSUFBQUEsR0FBRyxDQUFDZ0MsSUFBSixDQUFTbkosU0FBVDtBQUNILEdBSEQsQ0FHRSxPQUFPb0osTUFBUCxFQUFlO0FBQ2I7QUFDQSxVQUFNQSxNQUFOO0FBQ0g7QUFDSixDQXJCRDs7QUFzQkEsU0FBU0MsV0FBVCxDQUFxQkwsSUFBckIsRUFBMkI7QUFDdkIsU0FBT0EsSUFBSSxDQUFDeEcsT0FBTCxDQUFhLFFBQWIsRUFBdUIsVUFBU1AsQ0FBVCxFQUFZO0FBQ3RDLFdBQU8yRSxNQUFNLENBQUNDLFlBQVAsQ0FBb0I1RSxDQUFDLENBQUNxSCxVQUFGLENBQWEsQ0FBYixJQUFrQixFQUF0QyxDQUFQO0FBQ0gsR0FGTSxDQUFQO0FBR0g7O0FBQ0QsU0FBU0MsZUFBVCxDQUF5QkMsR0FBekIsRUFBOEI7QUFDMUI7QUFDQSxNQUFJQyxHQUFHLEdBQUd2SCxNQUFNLENBQUN3SCxNQUFQLENBQWMsSUFBZCxDQUFWO0FBQ0EsTUFBSUMsS0FBSyxHQUFHSCxHQUFHLENBQUNJLEtBQUosQ0FBVSxNQUFWLENBQVo7O0FBQ0EsT0FBSSxJQUFJaEYsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHK0UsS0FBSyxDQUFDOUUsTUFBekIsRUFBaUNELENBQUMsSUFBSSxDQUF0QyxFQUF3QztBQUNwQyxRQUFJaUYsSUFBSSxHQUFHRixLQUFLLENBQUMvRSxDQUFELENBQWhCO0FBQ0EsUUFBSWtGLEtBQUssR0FBR0QsSUFBSSxDQUFDRCxLQUFMLENBQVcsSUFBWCxDQUFaO0FBQ0EsUUFBSVosSUFBSSxHQUFHYyxLQUFLLENBQUN4RCxLQUFOLEVBQVg7QUFDQSxRQUFJbEgsS0FBSyxHQUFHMEssS0FBSyxDQUFDQyxJQUFOLENBQVcsSUFBWCxDQUFaO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ0osV0FBVyxDQUFDTCxJQUFELENBQVosQ0FBSCxHQUF5QjVKLEtBQXpCO0FBQ0g7O0FBQ0QsT0FBSzRLLElBQUwsR0FBWVAsR0FBWjtBQUNIOztNQVpRRjs7QUFhVEEsZUFBZSxDQUFDckQsU0FBaEIsQ0FBMEIrRCxHQUExQixHQUFnQyxVQUFTakIsSUFBVCxFQUFlO0FBQzNDLFNBQU8sS0FBS2dCLElBQUwsQ0FBVVgsV0FBVyxDQUFDTCxJQUFELENBQXJCLENBQVA7QUFDSCxDQUZEOztBQUdBLFNBQVNrQixZQUFULEdBQXdCLENBQ3ZCOztNQURRQTs7QUFFVEEsWUFBWSxDQUFDaEUsU0FBYixDQUF1QjZCLElBQXZCLEdBQThCLFVBQVNaLEdBQVQsRUFBY2dELGVBQWQsRUFBK0JDLGtCQUEvQixFQUFtREMsZ0JBQW5ELEVBQXFFcEMsR0FBckUsRUFBMEViLGVBQTFFLEVBQTJGa0QsT0FBM0YsRUFBb0c7QUFDOUhuRCxFQUFBQSxHQUFHLENBQUNZLElBQUosQ0FBUyxLQUFULEVBQWdCRSxHQUFoQjtBQUNBLE1BQUlzQyxNQUFNLEdBQUcsQ0FBYjs7QUFDQXBELEVBQUFBLEdBQUcsQ0FBQ00sVUFBSixHQUFpQixZQUFXO0FBQ3hCLFFBQUlELFlBQVksR0FBR0wsR0FBRyxDQUFDSyxZQUF2QjtBQUNBLFFBQUlnRCxLQUFLLEdBQUdoRCxZQUFZLENBQUNpRCxLQUFiLENBQW1CRixNQUFuQixDQUFaO0FBQ0FBLElBQUFBLE1BQU0sSUFBSUMsS0FBSyxDQUFDM0YsTUFBaEI7QUFDQXVGLElBQUFBLGtCQUFrQixDQUFDSSxLQUFELENBQWxCO0FBQ0gsR0FMRDs7QUFNQXJELEVBQUFBLEdBQUcsQ0FBQ08sa0JBQUosR0FBeUIsWUFBVztBQUNoQyxRQUFJUCxHQUFHLENBQUNHLFVBQUosS0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsVUFBSWhHLE1BQU0sR0FBRzZGLEdBQUcsQ0FBQzdGLE1BQWpCO0FBQ0EsVUFBSWlHLFVBQVUsR0FBR0osR0FBRyxDQUFDSSxVQUFyQjtBQUNBLFVBQUlrQixXQUFXLEdBQUd0QixHQUFHLENBQUN1QixpQkFBSixDQUFzQixjQUF0QixDQUFsQjtBQUNBLFVBQUlnQyxRQUFRLEdBQUd2RCxHQUFHLENBQUMrQixxQkFBSixFQUFmO0FBQ0FpQixNQUFBQSxlQUFlLENBQUM3SSxNQUFELEVBQVNpRyxVQUFULEVBQXFCa0IsV0FBckIsRUFBa0MsSUFBSWMsZUFBSixDQUFvQm1CLFFBQXBCLENBQWxDLEVBQWlFLFlBQVc7QUFDdkZ2RCxRQUFBQSxHQUFHLENBQUNyQixLQUFKO0FBQ0gsT0FGYyxDQUFmO0FBR0gsS0FSRCxNQVFPLElBQUlxQixHQUFHLENBQUNHLFVBQUosS0FBbUIsQ0FBdkIsRUFBMEI7QUFDN0IrQyxNQUFBQSxnQkFBZ0I7QUFDbkI7QUFDSixHQVpEOztBQWFBbEQsRUFBQUEsR0FBRyxDQUFDQyxlQUFKLEdBQXNCQSxlQUF0QjtBQUNBRCxFQUFBQSxHQUFHLENBQUNFLFlBQUosR0FBbUIsTUFBbkI7O0FBQ0EsT0FBSSxJQUFJMkIsSUFBUixJQUFnQnNCLE9BQWhCLEVBQXdCO0FBQ3BCLFFBQUlwSSxNQUFNLENBQUNnRSxTQUFQLENBQWlCeUUsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDTixPQUFyQyxFQUE4Q3RCLElBQTlDLENBQUosRUFBeUQ7QUFDckQ3QixNQUFBQSxHQUFHLENBQUM4QixnQkFBSixDQUFxQkQsSUFBckIsRUFBMkJzQixPQUFPLENBQUN0QixJQUFELENBQWxDO0FBQ0g7QUFDSjs7QUFDRDdCLEVBQUFBLEdBQUcsQ0FBQ2dDLElBQUo7QUFDSCxDQTlCRDs7QUErQkEsU0FBUzBCLGNBQVQsQ0FBd0JDLFFBQXhCLEVBQWtDO0FBQzlCLE9BQUtDLFFBQUwsR0FBZ0JELFFBQWhCO0FBQ0g7O01BRlFEOztBQUdUQSxjQUFjLENBQUMzRSxTQUFmLENBQXlCK0QsR0FBekIsR0FBK0IsVUFBU2pCLElBQVQsRUFBZTtBQUMxQyxTQUFPLEtBQUsrQixRQUFMLENBQWNkLEdBQWQsQ0FBa0JqQixJQUFsQixDQUFQO0FBQ0gsQ0FGRDs7QUFHQSxTQUFTZ0MsY0FBVCxHQUEwQixDQUN6Qjs7TUFEUUE7O0FBRVRBLGNBQWMsQ0FBQzlFLFNBQWYsQ0FBeUI2QixJQUF6QixHQUFnQyxVQUFTWixHQUFULEVBQWNnRCxlQUFkLEVBQStCQyxrQkFBL0IsRUFBbURDLGdCQUFuRCxFQUFxRXBDLEdBQXJFLEVBQTBFYixlQUExRSxFQUEyRjBELFFBQTNGLEVBQXFHO0FBQ2pJLE1BQUlHLFVBQVUsR0FBRyxJQUFJdEYsZ0JBQUosRUFBakI7QUFDQSxNQUFJRSxNQUFNLEdBQUdvRixVQUFVLENBQUNwRixNQUF4QixDQUErQjtBQUEvQjtBQUVBLE1BQUlxRixXQUFXLEdBQUcsSUFBSTNGLFlBQUosRUFBbEI7QUFDQS9ELEVBQUFBLEtBQUssQ0FBQ3lHLEdBQUQsRUFBTTtBQUNQcUMsSUFBQUEsT0FBTyxFQUFFUSxRQURGO0FBRVBLLElBQUFBLFdBQVcsRUFBRS9ELGVBQWUsR0FBRyxTQUFILEdBQWUsYUFGcEM7QUFHUHZCLElBQUFBLE1BQU0sRUFBRUEsTUFIRDtBQUlQdUYsSUFBQUEsS0FBSyxFQUFFO0FBSkEsR0FBTixDQUFMLENBS0c1TCxJQUxILENBS1EsVUFBUzZMLFFBQVQsRUFBbUI7QUFDdkIsUUFBSUMsTUFBTSxHQUFHRCxRQUFRLENBQUNFLElBQVQsQ0FBY0MsU0FBZCxFQUFiO0FBQ0FyQixJQUFBQSxlQUFlLENBQUNrQixRQUFRLENBQUMvSixNQUFWLEVBQWtCK0osUUFBUSxDQUFDOUQsVUFBM0IsRUFBdUM4RCxRQUFRLENBQUNmLE9BQVQsQ0FBaUJMLEdBQWpCLENBQXFCLGNBQXJCLENBQXZDLEVBQTZFLElBQUlZLGNBQUosQ0FBbUJRLFFBQVEsQ0FBQ2YsT0FBNUIsQ0FBN0UsRUFBbUgsWUFBVztBQUN6SVcsTUFBQUEsVUFBVSxDQUFDbkYsS0FBWDtBQUNBd0YsTUFBQUEsTUFBTSxDQUFDRyxNQUFQO0FBQ0gsS0FIYyxDQUFmO0FBSUEsV0FBTyxJQUFJbE0sT0FBSixDQUFZLFVBQVNWLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3pDLFVBQUk0TSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQVc7QUFDM0JKLFFBQUFBLE1BQU0sQ0FBQ0ssSUFBUCxHQUFjbk0sSUFBZCxDQUFtQixVQUFTb00sTUFBVCxFQUFpQjtBQUNoQyxjQUFJQSxNQUFNLENBQUN0TSxJQUFYLEVBQWlCO0FBQ2I7QUFDQVQsWUFBQUEsT0FBTyxDQUFDbUIsU0FBRCxDQUFQO0FBQ0gsV0FIRCxNQUdPO0FBQ0gsZ0JBQUl3SyxLQUFLLEdBQUdVLFdBQVcsQ0FBQy9FLE1BQVosQ0FBbUJ5RixNQUFNLENBQUN4TSxLQUExQixFQUFpQztBQUN6QzRILGNBQUFBLE1BQU0sRUFBRTtBQURpQyxhQUFqQyxDQUFaO0FBR0FvRCxZQUFBQSxrQkFBa0IsQ0FBQ0ksS0FBRCxDQUFsQjtBQUNBa0IsWUFBQUEsYUFBYTtBQUNoQjtBQUNKLFNBWEQsRUFXRyxPQVhILEVBV1ksVUFBU3JNLEtBQVQsRUFBZ0I7QUFDeEJQLFVBQUFBLE1BQU0sQ0FBQ08sS0FBRCxDQUFOO0FBQ0gsU0FiRDtBQWNILE9BZkQ7O0FBZ0JBcU0sTUFBQUEsYUFBYTtBQUNoQixLQWxCTSxDQUFQO0FBbUJILEdBOUJELEVBOEJHbE0sSUE5QkgsQ0E4QlEsVUFBU29NLE1BQVQsRUFBaUI7QUFDckJ2QixJQUFBQSxnQkFBZ0I7QUFDaEIsV0FBT3VCLE1BQVA7QUFDSCxHQWpDRCxFQWlDRyxVQUFTdk0sS0FBVCxFQUFnQjtBQUNmZ0wsSUFBQUEsZ0JBQWdCO0FBQ2hCLFdBQU85SyxPQUFPLENBQUNULE1BQVIsQ0FBZU8sS0FBZixDQUFQO0FBQ0gsR0FwQ0Q7QUFxQ0gsQ0ExQ0Q7O0FBMkNBLFNBQVN3TSxZQUFULEdBQXdCO0FBQ3BCLE9BQUtDLFVBQUwsR0FBa0I1SixNQUFNLENBQUN3SCxNQUFQLENBQWMsSUFBZCxDQUFsQjtBQUNIOztNQUZRbUM7O0FBR1QsU0FBU0UsVUFBVCxDQUFvQkMsQ0FBcEIsRUFBdUI7QUFDbkI3RyxFQUFBQSxVQUFVLENBQUMsWUFBVztBQUNsQixVQUFNNkcsQ0FBTjtBQUNILEdBRlMsRUFFUCxDQUZPLENBQVY7QUFHSDs7QUFDREgsWUFBWSxDQUFDM0YsU0FBYixDQUF1QitGLGFBQXZCLEdBQXVDLFVBQVNuSixLQUFULEVBQWdCO0FBQ25EQSxFQUFBQSxLQUFLLENBQUNvSixNQUFOLEdBQWUsSUFBZjtBQUNBLE1BQUlDLGFBQWEsR0FBRyxLQUFLTCxVQUFMLENBQWdCaEosS0FBSyxDQUFDc0osSUFBdEIsQ0FBcEI7O0FBQ0EsTUFBSUQsYUFBYSxJQUFJbk0sU0FBckIsRUFBZ0M7QUFDNUIsUUFBSTZFLE1BQU0sR0FBR3NILGFBQWEsQ0FBQ3RILE1BQTNCOztBQUNBLFNBQUksSUFBSUQsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHQyxNQUFuQixFQUEyQkQsQ0FBQyxJQUFJLENBQWhDLEVBQWtDO0FBQzlCLFVBQUl5SCxRQUFRLEdBQUdGLGFBQWEsQ0FBQ3ZILENBQUQsQ0FBNUI7O0FBQ0EsVUFBSTtBQUNBLFlBQUksT0FBT3lILFFBQVEsQ0FBQ0MsV0FBaEIsS0FBZ0MsVUFBcEMsRUFBZ0Q7QUFDNUNELFVBQUFBLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQnhKLEtBQXJCO0FBQ0gsU0FGRCxNQUVPO0FBQ0h1SixVQUFBQSxRQUFRLENBQUN6QixJQUFULENBQWMsSUFBZCxFQUFvQjlILEtBQXBCO0FBQ0g7QUFDSixPQU5ELENBTUUsT0FBT2tKLENBQVAsRUFBVTtBQUNSRCxRQUFBQSxVQUFVLENBQUNDLENBQUQsQ0FBVjtBQUNIO0FBQ0o7QUFDSjtBQUNKLENBbEJEOztBQW1CQUgsWUFBWSxDQUFDM0YsU0FBYixDQUF1QnFHLGdCQUF2QixHQUEwQyxVQUFTSCxJQUFULEVBQWVDLFFBQWYsRUFBeUI7QUFDL0RELEVBQUFBLElBQUksR0FBR3hGLE1BQU0sQ0FBQ3dGLElBQUQsQ0FBYjtBQUNBLE1BQUlySSxTQUFTLEdBQUcsS0FBSytILFVBQXJCO0FBQ0EsTUFBSUssYUFBYSxHQUFHcEksU0FBUyxDQUFDcUksSUFBRCxDQUE3Qjs7QUFDQSxNQUFJRCxhQUFhLElBQUluTSxTQUFyQixFQUFnQztBQUM1Qm1NLElBQUFBLGFBQWEsR0FBRyxFQUFoQjtBQUNBcEksSUFBQUEsU0FBUyxDQUFDcUksSUFBRCxDQUFULEdBQWtCRCxhQUFsQjtBQUNIOztBQUNELE1BQUlLLEtBQUssR0FBRyxLQUFaOztBQUNBLE9BQUksSUFBSTVILENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR3VILGFBQWEsQ0FBQ3RILE1BQWpDLEVBQXlDRCxDQUFDLElBQUksQ0FBOUMsRUFBZ0Q7QUFDNUMsUUFBSXVILGFBQWEsQ0FBQ3ZILENBQUQsQ0FBYixLQUFxQnlILFFBQXpCLEVBQW1DO0FBQy9CRyxNQUFBQSxLQUFLLEdBQUcsSUFBUjtBQUNIO0FBQ0o7O0FBQ0QsTUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDUkwsSUFBQUEsYUFBYSxDQUFDL0csSUFBZCxDQUFtQmlILFFBQW5CO0FBQ0g7QUFDSixDQWpCRDs7QUFrQkFSLFlBQVksQ0FBQzNGLFNBQWIsQ0FBdUJ1RyxtQkFBdkIsR0FBNkMsVUFBU0wsSUFBVCxFQUFlQyxRQUFmLEVBQXlCO0FBQ2xFRCxFQUFBQSxJQUFJLEdBQUd4RixNQUFNLENBQUN3RixJQUFELENBQWI7QUFDQSxNQUFJckksU0FBUyxHQUFHLEtBQUsrSCxVQUFyQjtBQUNBLE1BQUlLLGFBQWEsR0FBR3BJLFNBQVMsQ0FBQ3FJLElBQUQsQ0FBN0I7O0FBQ0EsTUFBSUQsYUFBYSxJQUFJbk0sU0FBckIsRUFBZ0M7QUFDNUIsUUFBSTBNLFFBQVEsR0FBRyxFQUFmOztBQUNBLFNBQUksSUFBSTlILENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR3VILGFBQWEsQ0FBQ3RILE1BQWpDLEVBQXlDRCxDQUFDLElBQUksQ0FBOUMsRUFBZ0Q7QUFDNUMsVUFBSXVILGFBQWEsQ0FBQ3ZILENBQUQsQ0FBYixLQUFxQnlILFFBQXpCLEVBQW1DO0FBQy9CSyxRQUFBQSxRQUFRLENBQUN0SCxJQUFULENBQWMrRyxhQUFhLENBQUN2SCxDQUFELENBQTNCO0FBQ0g7QUFDSjs7QUFDRCxRQUFJOEgsUUFBUSxDQUFDN0gsTUFBVCxLQUFvQixDQUF4QixFQUEyQjtBQUN2QixhQUFPZCxTQUFTLENBQUNxSSxJQUFELENBQWhCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hySSxNQUFBQSxTQUFTLENBQUNxSSxJQUFELENBQVQsR0FBa0JNLFFBQWxCO0FBQ0g7QUFDSjtBQUNKLENBakJEOztBQWtCQSxTQUFTQyxNQUFULENBQWdCUCxJQUFoQixFQUFzQjtBQUNsQixPQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLRixNQUFMLEdBQWNsTSxTQUFkO0FBQ0g7O01BSFEyTTs7QUFJVCxTQUFTQyxhQUFULENBQXVCUixJQUF2QixFQUE2QnpJLE9BQTdCLEVBQXNDO0FBQ2xDZ0osRUFBQUEsTUFBTSxDQUFDL0IsSUFBUCxDQUFZLElBQVosRUFBa0J3QixJQUFsQjtBQUNBLE9BQUsvTCxJQUFMLEdBQVlzRCxPQUFPLENBQUN0RCxJQUFwQjtBQUNBLE9BQUt3TSxXQUFMLEdBQW1CbEosT0FBTyxDQUFDa0osV0FBM0I7QUFDSDs7TUFKUUQ7QUFLVEEsYUFBYSxDQUFDMUcsU0FBZCxHQUEwQmhFLE1BQU0sQ0FBQ3dILE1BQVAsQ0FBY2lELE1BQU0sQ0FBQ3pHLFNBQXJCLENBQTFCOztBQUNBLFNBQVM0RyxlQUFULENBQXlCVixJQUF6QixFQUErQnpJLE9BQS9CLEVBQXdDO0FBQ3BDZ0osRUFBQUEsTUFBTSxDQUFDL0IsSUFBUCxDQUFZLElBQVosRUFBa0J3QixJQUFsQjtBQUNBLE9BQUs5SyxNQUFMLEdBQWNxQyxPQUFPLENBQUNyQyxNQUF0QjtBQUNBLE9BQUtpRyxVQUFMLEdBQWtCNUQsT0FBTyxDQUFDNEQsVUFBMUI7QUFDQSxPQUFLK0MsT0FBTCxHQUFlM0csT0FBTyxDQUFDMkcsT0FBdkI7QUFDSDs7T0FMUXdDO0FBTVRBLGVBQWUsQ0FBQzVHLFNBQWhCLEdBQTRCaEUsTUFBTSxDQUFDd0gsTUFBUCxDQUFjaUQsTUFBTSxDQUFDekcsU0FBckIsQ0FBNUI7QUFDQSxJQUFJNkcsT0FBTyxHQUFHLENBQUMsQ0FBZjtBQUNBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUNBLElBQUlDLElBQUksR0FBRyxDQUFYO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLENBQWI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBQyxDQUFoQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUNBLElBQUlDLEtBQUssR0FBRyxDQUFaO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLENBQVo7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRywrQ0FBeEI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxJQUF2QjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLFFBQXZCOztBQUNBLElBQUlDLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBU3ZPLEtBQVQsRUFBZ0J3TyxHQUFoQixFQUFxQjtBQUNyQyxNQUFJQyxDQUFDLEdBQUdDLFFBQVEsQ0FBQzFPLEtBQUQsRUFBUSxFQUFSLENBQWhCOztBQUNBLE1BQUl5TyxDQUFDLEtBQUtBLENBQVYsRUFBYTtBQUNUQSxJQUFBQSxDQUFDLEdBQUdELEdBQUo7QUFDSDs7QUFDRCxTQUFPRyxhQUFhLENBQUNGLENBQUQsQ0FBcEI7QUFDSCxDQU5EOztBQU9BLElBQUlFLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBU0YsQ0FBVCxFQUFZO0FBQzVCLFNBQU9HLElBQUksQ0FBQ0MsR0FBTCxDQUFTRCxJQUFJLENBQUNFLEdBQUwsQ0FBU0wsQ0FBVCxFQUFZSixnQkFBWixDQUFULEVBQXdDQyxnQkFBeEMsQ0FBUDtBQUNILENBRkQ7O0FBR0EsSUFBSVMsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBU2pHLElBQVQsRUFBZWtHLENBQWYsRUFBa0J0TCxLQUFsQixFQUF5QjtBQUNoQyxNQUFJO0FBQ0EsUUFBSSxPQUFPc0wsQ0FBUCxLQUFhLFVBQWpCLEVBQTZCO0FBQ3pCQSxNQUFBQSxDQUFDLENBQUN4RCxJQUFGLENBQU8xQyxJQUFQLEVBQWFwRixLQUFiO0FBQ0g7QUFDSixHQUpELENBSUUsT0FBT2tKLENBQVAsRUFBVTtBQUNSRCxJQUFBQSxVQUFVLENBQUNDLENBQUQsQ0FBVjtBQUNIO0FBQ0osQ0FSRDs7QUFTQSxTQUFTcUMsbUJBQVQsQ0FBNkJwRyxHQUE3QixFQUFrQ3RFLE9BQWxDLEVBQTJDO0FBQ3ZDa0ksRUFBQUEsWUFBWSxDQUFDakIsSUFBYixDQUFrQixJQUFsQjtBQUNBLE9BQUt0RyxNQUFMLEdBQWN0RSxTQUFkO0FBQ0EsT0FBS3lFLFNBQUwsR0FBaUJ6RSxTQUFqQjtBQUNBLE9BQUt3RSxPQUFMLEdBQWV4RSxTQUFmO0FBQ0EsT0FBS2lJLEdBQUwsR0FBV2pJLFNBQVg7QUFDQSxPQUFLc0gsVUFBTCxHQUFrQnRILFNBQWxCO0FBQ0EsT0FBS29ILGVBQUwsR0FBdUJwSCxTQUF2QjtBQUNBLE9BQUtzTyxNQUFMLEdBQWN0TyxTQUFkO0FBQ0F1TyxFQUFBQSxLQUFLLENBQUMsSUFBRCxFQUFPdEcsR0FBUCxFQUFZdEUsT0FBWixDQUFMO0FBQ0g7O09BVlEwSztBQVdULElBQUlHLGdCQUFnQixHQUFHaE4sS0FBSyxJQUFJeEIsU0FBVCxJQUFzQnFGLFNBQVMsSUFBSXJGLFNBQW5DLElBQWdELFVBQVVxRixTQUFTLENBQUNhLFNBQTNGOztBQUNBLFNBQVNxSSxLQUFULENBQWVFLEVBQWYsRUFBbUJ4RyxHQUFuQixFQUF3QnRFLE9BQXhCLEVBQWlDO0FBQzdCc0UsRUFBQUEsR0FBRyxHQUFHckIsTUFBTSxDQUFDcUIsR0FBRCxDQUFaO0FBQ0EsTUFBSWIsZUFBZSxHQUFHekQsT0FBTyxJQUFJM0QsU0FBWCxJQUF3QjBPLE9BQU8sQ0FBQy9LLE9BQU8sQ0FBQ3lELGVBQVQsQ0FBckQ7QUFDQSxNQUFJdUgsWUFBWSxHQUFHWixhQUFhLENBQUMsSUFBRCxDQUFoQztBQUNBLE1BQUlhLGdCQUFnQixHQUFHakwsT0FBTyxJQUFJM0QsU0FBWCxJQUF3QjJELE9BQU8sQ0FBQ2lMLGdCQUFSLElBQTRCNU8sU0FBcEQsR0FBZ0UyTixhQUFhLENBQUNoSyxPQUFPLENBQUNpTCxnQkFBVCxFQUEyQixLQUEzQixDQUE3RSxHQUFpSGIsYUFBYSxDQUFDLEtBQUQsQ0FBcko7QUFDQSxNQUFJbEIsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsTUFBSWdDLEtBQUssR0FBR0YsWUFBWjtBQUNBLE1BQUlHLFdBQVcsR0FBRyxLQUFsQjtBQUNBLE1BQUloRSxRQUFRLEdBQUduSCxPQUFPLElBQUkzRCxTQUFYLElBQXdCMkQsT0FBTyxDQUFDMkcsT0FBUixJQUFtQnRLLFNBQTNDLEdBQXVETSxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDeU8sU0FBTCxDQUFlcEwsT0FBTyxDQUFDMkcsT0FBdkIsQ0FBWCxDQUF2RCxHQUFxR3RLLFNBQXBIO0FBQ0EsTUFBSWdQLGdCQUFnQixHQUFHckwsT0FBTyxJQUFJM0QsU0FBWCxJQUF3QjJELE9BQU8sQ0FBQ3NMLFNBQVIsSUFBcUJqUCxTQUE3QyxHQUF5RDJELE9BQU8sQ0FBQ3NMLFNBQWpFLEdBQTZFbEcsY0FBcEc7QUFDQSxNQUFJNUIsR0FBRyxHQUFHcUgsZ0JBQWdCLElBQUksRUFBRTdLLE9BQU8sSUFBSTNELFNBQVgsSUFBd0IyRCxPQUFPLENBQUNzTCxTQUFSLElBQXFCalAsU0FBL0MsQ0FBcEIsR0FBZ0ZBLFNBQWhGLEdBQTRGLElBQUlrSCxVQUFKLENBQWUsSUFBSThILGdCQUFKLEVBQWYsQ0FBdEc7QUFDQSxNQUFJRSxTQUFTLEdBQUcvSCxHQUFHLElBQUluSCxTQUFQLEdBQW1CLElBQUlnTCxjQUFKLEVBQW5CLEdBQTBDLElBQUlkLFlBQUosRUFBMUQ7QUFDQSxNQUFJaUYsY0FBYyxHQUFHblAsU0FBckI7QUFDQSxNQUFJZ0UsT0FBTyxHQUFHLENBQWQ7QUFDQSxNQUFJb0wsWUFBWSxHQUFHckMsT0FBbkI7QUFDQSxNQUFJc0MsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsTUFBSUMsaUJBQWlCLEdBQUcsRUFBeEI7QUFDQSxNQUFJQyxlQUFlLEdBQUcsRUFBdEI7QUFDQSxNQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxNQUFJckgsS0FBSyxHQUFHaUYsV0FBWjtBQUNBLE1BQUlxQyxVQUFVLEdBQUcsQ0FBakI7QUFDQSxNQUFJQyxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsTUFBSWxILE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQVNsSCxNQUFULEVBQWlCaUcsVUFBakIsRUFBNkJrQixXQUE3QixFQUEwQ2tILFFBQTFDLEVBQW9EbEUsTUFBcEQsRUFBNEQ7QUFDdEUsUUFBSTJELFlBQVksS0FBS3BDLFVBQXJCLEVBQWlDO0FBQzdCbUMsTUFBQUEsY0FBYyxHQUFHMUQsTUFBakI7O0FBQ0EsVUFBSW5LLE1BQU0sS0FBSyxHQUFYLElBQWtCbUgsV0FBVyxJQUFJekksU0FBakMsSUFBOEN3TixpQkFBaUIsQ0FBQ29DLElBQWxCLENBQXVCbkgsV0FBdkIsQ0FBbEQsRUFBdUY7QUFDbkYyRyxRQUFBQSxZQUFZLEdBQUduQyxJQUFmO0FBQ0E2QixRQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNBRCxRQUFBQSxLQUFLLEdBQUdGLFlBQVI7QUFDQUYsUUFBQUEsRUFBRSxDQUFDbkgsVUFBSCxHQUFnQjJGLElBQWhCO0FBQ0EsWUFBSW5LLEtBQUssR0FBRyxJQUFJZ0ssZUFBSixDQUFvQixNQUFwQixFQUE0QjtBQUNwQ3hMLFVBQUFBLE1BQU0sRUFBRUEsTUFENEI7QUFFcENpRyxVQUFBQSxVQUFVLEVBQUVBLFVBRndCO0FBR3BDK0MsVUFBQUEsT0FBTyxFQUFFcUY7QUFIMkIsU0FBNUIsQ0FBWjtBQUtBbEIsUUFBQUEsRUFBRSxDQUFDeEMsYUFBSCxDQUFpQm5KLEtBQWpCO0FBQ0FxTCxRQUFBQSxJQUFJLENBQUNNLEVBQUQsRUFBS0EsRUFBRSxDQUFDbkssTUFBUixFQUFnQnhCLEtBQWhCLENBQUo7QUFDSCxPQVpELE1BWU87QUFDSCxZQUFJQyxPQUFPLEdBQUcsRUFBZDs7QUFDQSxZQUFJekIsTUFBTSxLQUFLLEdBQWYsRUFBb0I7QUFDaEIsY0FBSWlHLFVBQUosRUFBZ0I7QUFDWkEsWUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQUMvRSxPQUFYLENBQW1CLE1BQW5CLEVBQTJCLEdBQTNCLENBQWI7QUFDSDs7QUFDRE8sVUFBQUEsT0FBTyxHQUFHLHlDQUF5Q3pCLE1BQXpDLEdBQWtELEdBQWxELEdBQXdEaUcsVUFBeEQsR0FBcUUsNENBQS9FO0FBQ0gsU0FMRCxNQUtPO0FBQ0h4RSxVQUFBQSxPQUFPLEdBQUcsZ0ZBQWdGMEYsV0FBVyxJQUFJekksU0FBZixHQUEyQixHQUEzQixHQUFpQ3lJLFdBQVcsQ0FBQ2pHLE9BQVosQ0FBb0IsTUFBcEIsRUFBNEIsR0FBNUIsQ0FBakgsSUFBcUosNEJBQS9KO0FBQ0g7O0FBQ0R1SixRQUFBQSxVQUFVLENBQUMsSUFBSXZGLEtBQUosQ0FBVXpELE9BQVYsQ0FBRCxDQUFWO0FBQ0FtQyxRQUFBQSxLQUFLO0FBQ0wsWUFBSXBDLEtBQUssR0FBRyxJQUFJZ0ssZUFBSixDQUFvQixPQUFwQixFQUE2QjtBQUNyQ3hMLFVBQUFBLE1BQU0sRUFBRUEsTUFENkI7QUFFckNpRyxVQUFBQSxVQUFVLEVBQUVBLFVBRnlCO0FBR3JDK0MsVUFBQUEsT0FBTyxFQUFFcUY7QUFINEIsU0FBN0IsQ0FBWjtBQUtBbEIsUUFBQUEsRUFBRSxDQUFDeEMsYUFBSCxDQUFpQm5KLEtBQWpCO0FBQ0FxTCxRQUFBQSxJQUFJLENBQUNNLEVBQUQsRUFBS0EsRUFBRSxDQUFDakssT0FBUixFQUFpQjFCLEtBQWpCLENBQUo7QUFDSDtBQUNKO0FBQ0osR0FwQ0Q7O0FBcUNBLE1BQUk2RixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFTa0gsU0FBVCxFQUFvQjtBQUNqQyxRQUFJVCxZQUFZLEtBQUtuQyxJQUFyQixFQUEyQjtBQUN2QixVQUFJWSxDQUFDLEdBQUcsQ0FBQyxDQUFUOztBQUNBLFdBQUksSUFBSWpKLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR2lMLFNBQVMsQ0FBQ2hMLE1BQTdCLEVBQXFDRCxDQUFDLElBQUksQ0FBMUMsRUFBNEM7QUFDeEMsWUFBSTNDLENBQUMsR0FBRzROLFNBQVMsQ0FBQ3ZHLFVBQVYsQ0FBcUIxRSxDQUFyQixDQUFSOztBQUNBLFlBQUkzQyxDQUFDLEtBQUssS0FBS3FILFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBTixJQUE0QnJILENBQUMsS0FBSyxLQUFLcUgsVUFBTCxDQUFnQixDQUFoQixDQUF0QyxFQUEwRDtBQUN0RHVFLFVBQUFBLENBQUMsR0FBR2pKLENBQUo7QUFDSDtBQUNKOztBQUNELFVBQUk0RixLQUFLLEdBQUcsQ0FBQ3FELENBQUMsS0FBSyxDQUFDLENBQVAsR0FBVzJCLFVBQVgsR0FBd0IsRUFBekIsSUFBK0JLLFNBQVMsQ0FBQ3BGLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUJvRCxDQUFDLEdBQUcsQ0FBdkIsQ0FBM0M7QUFDQTJCLE1BQUFBLFVBQVUsR0FBRyxDQUFDM0IsQ0FBQyxLQUFLLENBQUMsQ0FBUCxHQUFXMkIsVUFBWCxHQUF3QixFQUF6QixJQUErQkssU0FBUyxDQUFDcEYsS0FBVixDQUFnQm9ELENBQUMsR0FBRyxDQUFwQixDQUE1Qzs7QUFDQSxVQUFJckQsS0FBSyxLQUFLLEVBQWQsRUFBa0I7QUFDZHNFLFFBQUFBLFdBQVcsR0FBRyxJQUFkO0FBQ0g7O0FBQ0QsV0FBSSxJQUFJZ0IsUUFBUSxHQUFHLENBQW5CLEVBQXNCQSxRQUFRLEdBQUd0RixLQUFLLENBQUMzRixNQUF2QyxFQUErQ2lMLFFBQVEsSUFBSSxDQUEzRCxFQUE2RDtBQUN6RCxZQUFJN04sQ0FBQyxHQUFHdUksS0FBSyxDQUFDbEIsVUFBTixDQUFpQndHLFFBQWpCLENBQVI7O0FBQ0EsWUFBSTNILEtBQUssS0FBS2dGLFFBQVYsSUFBc0JsTCxDQUFDLEtBQUssS0FBS3FILFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBaEMsRUFBb0Q7QUFDaERuQixVQUFBQSxLQUFLLEdBQUdpRixXQUFSO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsY0FBSWpGLEtBQUssS0FBS2dGLFFBQWQsRUFBd0I7QUFDcEJoRixZQUFBQSxLQUFLLEdBQUdpRixXQUFSO0FBQ0g7O0FBQ0QsY0FBSW5MLENBQUMsS0FBSyxLQUFLcUgsVUFBTCxDQUFnQixDQUFoQixDQUFOLElBQTRCckgsQ0FBQyxLQUFLLEtBQUtxSCxVQUFMLENBQWdCLENBQWhCLENBQXRDLEVBQTBEO0FBQ3RELGdCQUFJbkIsS0FBSyxLQUFLaUYsV0FBZCxFQUEyQjtBQUN2QixrQkFBSWpGLEtBQUssS0FBS2tGLEtBQWQsRUFBcUI7QUFDakJxQyxnQkFBQUEsVUFBVSxHQUFHSSxRQUFRLEdBQUcsQ0FBeEI7QUFDSDs7QUFDRCxrQkFBSUMsS0FBSyxHQUFHdkYsS0FBSyxDQUFDQyxLQUFOLENBQVlnRixVQUFaLEVBQXdCQyxVQUFVLEdBQUcsQ0FBckMsQ0FBWjtBQUNBLGtCQUFJdFEsS0FBSyxHQUFHb0wsS0FBSyxDQUFDQyxLQUFOLENBQVlpRixVQUFVLElBQUlBLFVBQVUsR0FBR0ksUUFBYixJQUF5QnRGLEtBQUssQ0FBQ2xCLFVBQU4sQ0FBaUJvRyxVQUFqQixNQUFpQyxJQUFJcEcsVUFBSixDQUFlLENBQWYsQ0FBMUQsR0FBOEUsQ0FBOUUsR0FBa0YsQ0FBdEYsQ0FBdEIsRUFBZ0h3RyxRQUFoSCxDQUFaOztBQUNBLGtCQUFJQyxLQUFLLEtBQUssTUFBZCxFQUFzQjtBQUNsQlYsZ0JBQUFBLFVBQVUsSUFBSSxJQUFkO0FBQ0FBLGdCQUFBQSxVQUFVLElBQUlqUSxLQUFkO0FBQ0gsZUFIRCxNQUdPLElBQUkyUSxLQUFLLEtBQUssSUFBZCxFQUFvQjtBQUN2QlQsZ0JBQUFBLGlCQUFpQixHQUFHbFEsS0FBcEI7QUFDSCxlQUZNLE1BRUEsSUFBSTJRLEtBQUssS0FBSyxPQUFkLEVBQXVCO0FBQzFCUixnQkFBQUEsZUFBZSxHQUFHblEsS0FBbEI7QUFDSCxlQUZNLE1BRUEsSUFBSTJRLEtBQUssS0FBSyxPQUFkLEVBQXVCO0FBQzFCcEIsZ0JBQUFBLFlBQVksR0FBR2hCLGFBQWEsQ0FBQ3ZPLEtBQUQsRUFBUXVQLFlBQVIsQ0FBNUI7QUFDQUUsZ0JBQUFBLEtBQUssR0FBR0YsWUFBUjtBQUNILGVBSE0sTUFHQSxJQUFJb0IsS0FBSyxLQUFLLGtCQUFkLEVBQWtDO0FBQ3JDbkIsZ0JBQUFBLGdCQUFnQixHQUFHakIsYUFBYSxDQUFDdk8sS0FBRCxFQUFRd1AsZ0JBQVIsQ0FBaEM7O0FBQ0Esb0JBQUk1SyxPQUFPLEtBQUssQ0FBaEIsRUFBbUI7QUFDZnFFLGtCQUFBQSxZQUFZLENBQUNyRSxPQUFELENBQVo7QUFDQUEsa0JBQUFBLE9BQU8sR0FBR21CLFVBQVUsQ0FBQyxZQUFXO0FBQzVCMkQsb0JBQUFBLFNBQVM7QUFDWixtQkFGbUIsRUFFakI4RixnQkFGaUIsQ0FBcEI7QUFHSDtBQUNKO0FBQ0o7O0FBQ0QsZ0JBQUl6RyxLQUFLLEtBQUtpRixXQUFkLEVBQTJCO0FBQ3ZCLGtCQUFJaUMsVUFBVSxLQUFLLEVBQW5CLEVBQXVCO0FBQ25CeEMsZ0JBQUFBLFdBQVcsR0FBR3lDLGlCQUFkOztBQUNBLG9CQUFJQyxlQUFlLEtBQUssRUFBeEIsRUFBNEI7QUFDeEJBLGtCQUFBQSxlQUFlLEdBQUcsU0FBbEI7QUFDSDs7QUFDRCxvQkFBSXpNLEtBQUssR0FBRyxJQUFJOEosYUFBSixDQUFrQjJDLGVBQWxCLEVBQW1DO0FBQzNDbFAsa0JBQUFBLElBQUksRUFBRWdQLFVBQVUsQ0FBQzVFLEtBQVgsQ0FBaUIsQ0FBakIsQ0FEcUM7QUFFM0NvQyxrQkFBQUEsV0FBVyxFQUFFeUM7QUFGOEIsaUJBQW5DLENBQVo7QUFJQWIsZ0JBQUFBLEVBQUUsQ0FBQ3hDLGFBQUgsQ0FBaUJuSixLQUFqQjs7QUFDQSxvQkFBSXlNLGVBQWUsS0FBSyxTQUF4QixFQUFtQztBQUMvQnBCLGtCQUFBQSxJQUFJLENBQUNNLEVBQUQsRUFBS0EsRUFBRSxDQUFDaEssU0FBUixFQUFtQjNCLEtBQW5CLENBQUo7QUFDSDs7QUFDRCxvQkFBSXNNLFlBQVksS0FBS2xDLE1BQXJCLEVBQTZCO0FBQ3pCO0FBQ0g7QUFDSjs7QUFDRG1DLGNBQUFBLFVBQVUsR0FBRyxFQUFiO0FBQ0FFLGNBQUFBLGVBQWUsR0FBRyxFQUFsQjtBQUNIOztBQUNEcEgsWUFBQUEsS0FBSyxHQUFHbEcsQ0FBQyxLQUFLLEtBQUtxSCxVQUFMLENBQWdCLENBQWhCLENBQU4sR0FBMkI2RCxRQUEzQixHQUFzQ0MsV0FBOUM7QUFDSCxXQWpERCxNQWlETztBQUNILGdCQUFJakYsS0FBSyxLQUFLaUYsV0FBZCxFQUEyQjtBQUN2QnFDLGNBQUFBLFVBQVUsR0FBR0ssUUFBYjtBQUNBM0gsY0FBQUEsS0FBSyxHQUFHa0YsS0FBUjtBQUNIOztBQUNELGdCQUFJbEYsS0FBSyxLQUFLa0YsS0FBZCxFQUFxQjtBQUNqQixrQkFBSXBMLENBQUMsS0FBSyxJQUFJcUgsVUFBSixDQUFlLENBQWYsQ0FBVixFQUE2QjtBQUN6Qm9HLGdCQUFBQSxVQUFVLEdBQUdJLFFBQVEsR0FBRyxDQUF4QjtBQUNBM0gsZ0JBQUFBLEtBQUssR0FBR21GLFdBQVI7QUFDSDtBQUNKLGFBTEQsTUFLTyxJQUFJbkYsS0FBSyxLQUFLbUYsV0FBZCxFQUEyQjtBQUM5Qm5GLGNBQUFBLEtBQUssR0FBR29GLEtBQVI7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBQ0osR0F4RkQ7O0FBeUZBLE1BQUkzRSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFXO0FBQ3RCLFFBQUl3RyxZQUFZLEtBQUtuQyxJQUFqQixJQUF5Qm1DLFlBQVksS0FBS3BDLFVBQTlDLEVBQTBEO0FBQ3REb0MsTUFBQUEsWUFBWSxHQUFHckMsT0FBZjs7QUFDQSxVQUFJL0ksT0FBTyxLQUFLLENBQWhCLEVBQW1CO0FBQ2ZxRSxRQUFBQSxZQUFZLENBQUNyRSxPQUFELENBQVo7QUFDQUEsUUFBQUEsT0FBTyxHQUFHLENBQVY7QUFDSDs7QUFDREEsTUFBQUEsT0FBTyxHQUFHbUIsVUFBVSxDQUFDLFlBQVc7QUFDNUIyRCxRQUFBQSxTQUFTO0FBQ1osT0FGbUIsRUFFakIrRixLQUZpQixDQUFwQjtBQUdBQSxNQUFBQSxLQUFLLEdBQUdkLGFBQWEsQ0FBQ0MsSUFBSSxDQUFDQyxHQUFMLENBQVNVLFlBQVksR0FBRyxFQUF4QixFQUE0QkUsS0FBSyxHQUFHLENBQXBDLENBQUQsQ0FBckI7QUFDQUosTUFBQUEsRUFBRSxDQUFDbkgsVUFBSCxHQUFnQjBGLFVBQWhCO0FBQ0EsVUFBSWxLLEtBQUssR0FBRyxJQUFJNkosTUFBSixDQUFXLE9BQVgsQ0FBWjtBQUNBOEIsTUFBQUEsRUFBRSxDQUFDeEMsYUFBSCxDQUFpQm5KLEtBQWpCO0FBQ0FxTCxNQUFBQSxJQUFJLENBQUNNLEVBQUQsRUFBS0EsRUFBRSxDQUFDakssT0FBUixFQUFpQjFCLEtBQWpCLENBQUo7QUFDSDtBQUNKLEdBaEJEOztBQWlCQSxNQUFJb0MsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBVztBQUNuQmtLLElBQUFBLFlBQVksR0FBR2xDLE1BQWY7O0FBQ0EsUUFBSWlDLGNBQWMsSUFBSW5QLFNBQXRCLEVBQWlDO0FBQzdCbVAsTUFBQUEsY0FBYztBQUNkQSxNQUFBQSxjQUFjLEdBQUduUCxTQUFqQjtBQUNIOztBQUNELFFBQUlnRSxPQUFPLEtBQUssQ0FBaEIsRUFBbUI7QUFDZnFFLE1BQUFBLFlBQVksQ0FBQ3JFLE9BQUQsQ0FBWjtBQUNBQSxNQUFBQSxPQUFPLEdBQUcsQ0FBVjtBQUNIOztBQUNEeUssSUFBQUEsRUFBRSxDQUFDbkgsVUFBSCxHQUFnQjRGLE1BQWhCO0FBQ0gsR0FYRDs7QUFZQSxNQUFJcEUsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBVztBQUN2QjlFLElBQUFBLE9BQU8sR0FBRyxDQUFWOztBQUNBLFFBQUlvTCxZQUFZLEtBQUtyQyxPQUFyQixFQUE4QjtBQUMxQixVQUFJLENBQUMrQixXQUFELElBQWdCSyxjQUFjLElBQUluUCxTQUF0QyxFQUFpRDtBQUM3QytMLFFBQUFBLFVBQVUsQ0FBQyxJQUFJdkYsS0FBSixDQUFVLHdCQUF3Qm9JLGdCQUF4QixHQUEyQyw4QkFBckQsQ0FBRCxDQUFWO0FBQ0FPLFFBQUFBLGNBQWM7QUFDZEEsUUFBQUEsY0FBYyxHQUFHblAsU0FBakI7QUFDSCxPQUpELE1BSU87QUFDSDhPLFFBQUFBLFdBQVcsR0FBRyxLQUFkO0FBQ0E5SyxRQUFBQSxPQUFPLEdBQUdtQixVQUFVLENBQUMsWUFBVztBQUM1QjJELFVBQUFBLFNBQVM7QUFDWixTQUZtQixFQUVqQjhGLGdCQUZpQixDQUFwQjtBQUdIOztBQUNEO0FBQ0g7O0FBQ0RFLElBQUFBLFdBQVcsR0FBRyxLQUFkO0FBQ0E5SyxJQUFBQSxPQUFPLEdBQUdtQixVQUFVLENBQUMsWUFBVztBQUM1QjJELE1BQUFBLFNBQVM7QUFDWixLQUZtQixFQUVqQjhGLGdCQUZpQixDQUFwQjtBQUdBUSxJQUFBQSxZQUFZLEdBQUdwQyxVQUFmO0FBQ0FxQyxJQUFBQSxVQUFVLEdBQUcsRUFBYjtBQUNBRSxJQUFBQSxlQUFlLEdBQUcsRUFBbEI7QUFDQUQsSUFBQUEsaUJBQWlCLEdBQUd6QyxXQUFwQjtBQUNBMkMsSUFBQUEsVUFBVSxHQUFHLEVBQWI7QUFDQUMsSUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQUMsSUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQXZILElBQUFBLEtBQUssR0FBR2lGLFdBQVIsQ0ExQnVCLENBMkJ2QjtBQUNBOztBQUNBLFFBQUk0QyxVQUFVLEdBQUcvSCxHQUFqQjs7QUFDQSxRQUFJQSxHQUFHLENBQUN3QyxLQUFKLENBQVUsQ0FBVixFQUFhLENBQWIsTUFBb0IsT0FBcEIsSUFBK0J4QyxHQUFHLENBQUN3QyxLQUFKLENBQVUsQ0FBVixFQUFhLENBQWIsTUFBb0IsT0FBdkQsRUFBZ0U7QUFDNUQsVUFBSW9DLFdBQVcsS0FBSyxFQUFwQixFQUF3QjtBQUNwQm1ELFFBQUFBLFVBQVUsSUFBSSxDQUFDL0gsR0FBRyxDQUFDM0YsT0FBSixDQUFZLEdBQVosTUFBcUIsQ0FBQyxDQUF0QixHQUEwQixHQUExQixHQUFnQyxHQUFqQyxJQUF3QyxjQUF4QyxHQUF5RDJOLGtCQUFrQixDQUFDcEQsV0FBRCxDQUF6RjtBQUNIO0FBQ0o7O0FBQ0QsUUFBSXFELGNBQWMsR0FBRyxFQUFyQjtBQUVBQSxJQUFBQSxjQUFjLENBQUMsUUFBRCxDQUFkLEdBQTJCLG1CQUEzQjs7QUFDQSxRQUFJcEYsUUFBUSxJQUFJOUssU0FBaEIsRUFBMkI7QUFDdkIsV0FBSSxJQUFJZ0osSUFBUixJQUFnQjhCLFFBQWhCLEVBQXlCO0FBQ3JCLFlBQUk1SSxNQUFNLENBQUNnRSxTQUFQLENBQWlCeUUsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDRSxRQUFyQyxFQUErQzlCLElBQS9DLENBQUosRUFBMEQ7QUFDdERrSCxVQUFBQSxjQUFjLENBQUNsSCxJQUFELENBQWQsR0FBdUI4QixRQUFRLENBQUM5QixJQUFELENBQS9CO0FBQ0g7QUFDSjtBQUNKOztBQUNELFFBQUk7QUFDQWtHLE1BQUFBLFNBQVMsQ0FBQ25ILElBQVYsQ0FBZVosR0FBZixFQUFvQnFCLE9BQXBCLEVBQTZCRyxVQUE3QixFQUF5Q0MsUUFBekMsRUFBbURvSCxVQUFuRCxFQUErRDVJLGVBQS9ELEVBQWdGOEksY0FBaEY7QUFDSCxLQUZELENBRUUsT0FBTzdRLEtBQVAsRUFBYztBQUNaNkYsTUFBQUEsS0FBSztBQUNMLFlBQU03RixLQUFOO0FBQ0g7QUFDSixHQW5ERDs7QUFvREFvUCxFQUFBQSxFQUFFLENBQUN4RyxHQUFILEdBQVNBLEdBQVQ7QUFDQXdHLEVBQUFBLEVBQUUsQ0FBQ25ILFVBQUgsR0FBZ0IwRixVQUFoQjtBQUNBeUIsRUFBQUEsRUFBRSxDQUFDckgsZUFBSCxHQUFxQkEsZUFBckI7QUFDQXFILEVBQUFBLEVBQUUsQ0FBQ0gsTUFBSCxHQUFZcEosS0FBWjtBQUNBNEQsRUFBQUEsU0FBUztBQUNaOztBQUNEdUYsbUJBQW1CLENBQUNuSSxTQUFwQixHQUFnQ2hFLE1BQU0sQ0FBQ3dILE1BQVAsQ0FBY21DLFlBQVksQ0FBQzNGLFNBQTNCLENBQWhDO0FBQ0FtSSxtQkFBbUIsQ0FBQ25JLFNBQXBCLENBQThCOEcsVUFBOUIsR0FBMkNBLFVBQTNDO0FBQ0FxQixtQkFBbUIsQ0FBQ25JLFNBQXBCLENBQThCK0csSUFBOUIsR0FBcUNBLElBQXJDO0FBQ0FvQixtQkFBbUIsQ0FBQ25JLFNBQXBCLENBQThCZ0gsTUFBOUIsR0FBdUNBLE1BQXZDOztBQUNBbUIsbUJBQW1CLENBQUNuSSxTQUFwQixDQUE4QmhCLEtBQTlCLEdBQXNDLFlBQVc7QUFDN0MsT0FBS29KLE1BQUw7QUFDSCxDQUZEOztBQUdBRCxtQkFBbUIsQ0FBQ3JCLFVBQXBCLEdBQWlDQSxVQUFqQztBQUNBcUIsbUJBQW1CLENBQUNwQixJQUFwQixHQUEyQkEsSUFBM0I7QUFDQW9CLG1CQUFtQixDQUFDbkIsTUFBcEIsR0FBNkJBLE1BQTdCO0FBQ0FtQixtQkFBbUIsQ0FBQ25JLFNBQXBCLENBQThCa0IsZUFBOUIsR0FBZ0RwSCxTQUFoRDtBQUNBLElBQUltUSxRQUFRLEdBQUc5QixtQkFBZjtBQUNBOUssZUFBQSxHQUFrQjRNLFFBQWxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDenhCYTs7QUFDYmpPLDhDQUE2QztBQUN6QzlDLEVBQUFBLEtBQUssRUFBRTtBQURrQyxDQUE3QztBQUdBbUUsc0JBQUEsR0FBeUJGLGNBQXpCOztBQUNBLFNBQVNBLGNBQVQsQ0FBd0IrTSxRQUF4QixFQUFrQztBQUM5QixHQUFDalEsTUFBTSxDQUFDa1EscUJBQVAsSUFBZ0NsTCxVQUFqQyxFQUE2QyxZQUFXO0FBQ3BELFNBQUksSUFBSW1MLENBQUMsR0FBRzlQLFFBQVEsQ0FBQytQLGdCQUFULENBQTBCLHVCQUExQixDQUFSLEVBQTREM0wsQ0FBQyxHQUFHMEwsQ0FBQyxDQUFDekwsTUFBdEUsRUFBOEVELENBQUMsRUFBL0UsR0FBbUY7QUFDL0UwTCxNQUFBQSxDQUFDLENBQUMxTCxDQUFELENBQUQsQ0FBSzRMLFVBQUwsQ0FBZ0JDLFdBQWhCLENBQTRCSCxDQUFDLENBQUMxTCxDQUFELENBQTdCO0FBQ0g7O0FBQ0QsUUFBSXdMLFFBQUosRUFBYztBQUNWQSxNQUFBQSxRQUFRO0FBQ1g7QUFDSixHQVBEO0FBUUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZFk7O0FBQ2JsTyw4Q0FBNkM7QUFDekM5QyxFQUFBQSxLQUFLLEVBQUU7QUFEa0MsQ0FBN0M7QUFHQW1FLGlCQUFBLEdBQW9CbU4sU0FBcEI7QUFDQW5OLGlCQUFBLEdBQW9CSCxTQUFwQjtBQUNBRyxtQkFBQSxHQUFzQixLQUFLLENBQTNCOztBQUNBLElBQUkvRSxZQUFZLEdBQUdELG1CQUFPLENBQUMscUdBQUQsQ0FBMUI7O0FBQ0EsSUFBSXFTLFNBQUo7QUFDQSxJQUFJRCxXQUFKO0FBQ0FwTixtQkFBQSxHQUFzQm9OLFdBQXRCOztBQUNBLFNBQVNELFNBQVQsR0FBcUI7QUFDakIsTUFBSUUsU0FBSixFQUFlQSxTQUFTLENBQUMxTCxLQUFWO0FBQ2YwTCxFQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNIOztBQUNELFNBQVN4TixTQUFULENBQW1CekMsV0FBbkIsRUFBZ0NrUSxVQUFoQyxFQUE0Q2hDLEtBQTVDLEVBQW1EO0FBQy9DLE1BQU1pQyxRQUFRLEdBQUdELFVBQVUsRUFBM0IsQ0FEK0MsQ0FFL0M7O0FBQ0EsTUFBSUMsUUFBUSxLQUFLSCxXQUFiLElBQTRCLENBQUM5QixLQUFqQyxFQUF3QztBQUN4Q3RMLEVBQUFBLG1CQUFBLEdBQXNCb04sV0FBVyxHQUFHRyxRQUFwQyxDQUorQyxDQUsvQzs7QUFDQUosRUFBQUEsU0FBUztBQUNURSxFQUFBQSxTQUFTLEdBQUcsQ0FBQyxHQUFHcFMsWUFBSixFQUFrQmdGLHFCQUFsQixDQUF3QztBQUNoRGEsSUFBQUEsSUFBSSxZQUFLMUQsV0FBTCxxQ0FBMkNzUCxrQkFBa0IsQ0FBQ1UsV0FBRCxDQUE3RCxDQUQ0QztBQUVoRDNNLElBQUFBLE9BQU8sRUFBRTtBQUZ1QyxHQUF4QyxDQUFaO0FBSUE0TSxFQUFBQSxTQUFTLENBQUMvTixrQkFBVixDQUE2QixVQUFDQyxLQUFELEVBQVM7QUFDbEMsUUFBSUEsS0FBSyxDQUFDekMsSUFBTixDQUFXaUMsT0FBWCxDQUFtQixHQUFuQixNQUE0QixDQUFDLENBQWpDLEVBQW9DOztBQUNwQyxRQUFJO0FBQ0EsVUFBTXlPLE9BQU8sR0FBR3pRLElBQUksQ0FBQ0MsS0FBTCxDQUFXdUMsS0FBSyxDQUFDekMsSUFBakIsQ0FBaEIsQ0FEQSxDQUVBO0FBQ0E7QUFDQTs7QUFDQSxVQUFJMFEsT0FBTyxDQUFDQyxPQUFSLElBQW1CLENBQUNyUixJQUFJLENBQUNzUixhQUFMLENBQW1CbFIsR0FBM0MsRUFBZ0Q7QUFDNUM7QUFDQTtBQUNBeUIsUUFBQUEsS0FBSyxDQUFDaUIsUUFBUSxDQUFDeU8sSUFBVixFQUFnQjtBQUNqQi9GLFVBQUFBLFdBQVcsRUFBRTtBQURJLFNBQWhCLENBQUwsQ0FFRzNMLElBRkgsQ0FFUSxVQUFDMlIsT0FBRCxFQUFXO0FBQ2YsY0FBSUEsT0FBTyxDQUFDN1AsTUFBUixLQUFtQixHQUF2QixFQUE0QjtBQUN4Qm1CLFlBQUFBLFFBQVEsQ0FBQ0MsTUFBVDtBQUNIO0FBQ0osU0FORDtBQU9IO0FBQ0osS0FoQkQsQ0FnQkUsT0FBTzNDLEdBQVAsRUFBWTtBQUNWNEMsTUFBQUEsT0FBTyxDQUFDdEQsS0FBUixDQUFjLDRDQUFkLEVBQTREVSxHQUE1RDtBQUNIO0FBQ0osR0FyQkQ7QUFzQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hERCxnSEFBK0M7Ozs7Ozs7Ozs7O0FDQS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLE1BQU07QUFDTixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFD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L25leHQvZGlzdC9jbGllbnQvZGV2L2FtcC1kZXYuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L2Rldi9lcnJvci1vdmVybGF5L2V2ZW50c291cmNlLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9kZXYvZXZlbnQtc291cmNlLXBvbHlmaWxsLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9kZXYvZm91Yy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvZGV2L29uLWRlbWFuZC1lbnRyaWVzLXV0aWxzLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2V2ZW50U291cmNlUG9seWZpbGwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2V2ZW50LXNvdXJjZS1wb2x5ZmlsbFwiKSk7XG52YXIgX2V2ZW50c291cmNlID0gcmVxdWlyZShcIi4vZXJyb3Itb3ZlcmxheS9ldmVudHNvdXJjZVwiKTtcbnZhciBfb25EZW1hbmRFbnRyaWVzVXRpbHMgPSByZXF1aXJlKFwiLi9vbi1kZW1hbmQtZW50cmllcy11dGlsc1wiKTtcbnZhciBfZm91YyA9IHJlcXVpcmUoXCIuL2ZvdWNcIik7XG5mdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgICAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxuaWYgKCF3aW5kb3cuRXZlbnRTb3VyY2UpIHtcbiAgICB3aW5kb3cuRXZlbnRTb3VyY2UgPSBfZXZlbnRTb3VyY2VQb2x5ZmlsbC5kZWZhdWx0O1xufVxuY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19fTkVYVF9EQVRBX18nKS50ZXh0Q29udGVudCk7XG5sZXQgeyBhc3NldFByZWZpeCAsIHBhZ2UgIH0gPSBkYXRhO1xuYXNzZXRQcmVmaXggPSBhc3NldFByZWZpeCB8fCAnJztcbmxldCBtb3N0UmVjZW50SGFzaCA9IG51bGw7XG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi8gbGV0IGN1ckhhc2ggPSBfX3dlYnBhY2tfaGFzaF9fO1xuY29uc3QgaG90VXBkYXRlUGF0aCA9IGFzc2V0UHJlZml4ICsgKGFzc2V0UHJlZml4LmVuZHNXaXRoKCcvJykgPyAnJyA6ICcvJykgKyAnX25leHQvc3RhdGljL3dlYnBhY2svJztcbi8vIElzIHRoZXJlIGEgbmV3ZXIgdmVyc2lvbiBvZiB0aGlzIGNvZGUgYXZhaWxhYmxlP1xuZnVuY3Rpb24gaXNVcGRhdGVBdmFpbGFibGUoKSB7XG4gICAgLy8gX193ZWJwYWNrX2hhc2hfXyBpcyB0aGUgaGFzaCBvZiB0aGUgY3VycmVudCBjb21waWxhdGlvbi5cbiAgICAvLyBJdCdzIGEgZ2xvYmFsIHZhcmlhYmxlIGluamVjdGVkIGJ5IFdlYnBhY2suXG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICovIHJldHVybiBtb3N0UmVjZW50SGFzaCAhPT0gX193ZWJwYWNrX2hhc2hfXztcbn1cbi8vIFdlYnBhY2sgZGlzYWxsb3dzIHVwZGF0ZXMgaW4gb3RoZXIgc3RhdGVzLlxuZnVuY3Rpb24gY2FuQXBwbHlVcGRhdGVzKCkge1xuICAgIHJldHVybiBtb2R1bGUuaG90LnN0YXR1cygpID09PSAnaWRsZSc7XG59XG5mdW5jdGlvbiBfdHJ5QXBwbHlVcGRhdGVzKCkge1xuICAgIF90cnlBcHBseVVwZGF0ZXMgPSAvLyBUaGlzIGZ1bmN0aW9uIHJlYWRzIGNvZGUgdXBkYXRlcyBvbiB0aGUgZmx5IGFuZCBoYXJkXG4gICAgLy8gcmVsb2FkcyB0aGUgcGFnZSB3aGVuIGl0IGhhcyBjaGFuZ2VkLlxuICAgIF9hc3luY1RvR2VuZXJhdG9yKGZ1bmN0aW9uKigpIHtcbiAgICAgICAgaWYgKCFpc1VwZGF0ZUF2YWlsYWJsZSgpIHx8ICFjYW5BcHBseVVwZGF0ZXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCBmZXRjaCh0eXBlb2YgX193ZWJwYWNrX3J1bnRpbWVfaWRfXyAhPT0gJ3VuZGVmaW5lZCcgPyBgJHtob3RVcGRhdGVQYXRofSR7Y3VySGFzaH0uJHtfX3dlYnBhY2tfcnVudGltZV9pZF9ffS5ob3QtdXBkYXRlLmpzb25gIDogYCR7aG90VXBkYXRlUGF0aH0ke2N1ckhhc2h9LmhvdC11cGRhdGUuanNvbmApO1xuICAgICAgICAgICAgY29uc3QganNvbkRhdGEgPSB5aWVsZCByZXMuanNvbigpO1xuICAgICAgICAgICAgY29uc3QgY3VyUGFnZSA9IHBhZ2UgPT09ICcvJyA/ICdpbmRleCcgOiBwYWdlO1xuICAgICAgICAgICAgLy8gd2VicGFjayA1IHVzZXMgYW4gYXJyYXkgaW5zdGVhZFxuICAgICAgICAgICAgY29uc3QgcGFnZVVwZGF0ZWQgPSAoQXJyYXkuaXNBcnJheShqc29uRGF0YS5jKSA/IGpzb25EYXRhLmMgOiBPYmplY3Qua2V5cyhqc29uRGF0YS5jKSkuc29tZSgobW9kKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2QuaW5kZXhPZihgcGFnZXMke2N1clBhZ2Uuc3Vic3RyKDAsIDEpID09PSAnLycgPyBjdXJQYWdlIDogYC8ke2N1clBhZ2V9YH1gKSAhPT0gLTEgfHwgbW9kLmluZGV4T2YoYHBhZ2VzJHtjdXJQYWdlLnN1YnN0cigwLCAxKSA9PT0gJy8nID8gY3VyUGFnZSA6IGAvJHtjdXJQYWdlfWB9YC5yZXBsYWNlKC9cXC8vZywgJ1xcXFwnKSkgIT09IC0xO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocGFnZVVwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1ckhhc2ggPSBtb3N0UmVjZW50SGFzaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBvY2N1cnJlZCBjaGVja2luZyBmb3IgdXBkYXRlJywgZXJyKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBfdHJ5QXBwbHlVcGRhdGVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5mdW5jdGlvbiB0cnlBcHBseVVwZGF0ZXMoKSB7XG4gICAgcmV0dXJuIF90cnlBcHBseVVwZGF0ZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbigwLCBfZXZlbnRzb3VyY2UpLmFkZE1lc3NhZ2VMaXN0ZW5lcigoZXZlbnQpPT57XG4gICAgaWYgKGV2ZW50LmRhdGEgPT09ICdcXHVEODNEXFx1REM5MycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnc3luYycgfHwgbWVzc2FnZS5hY3Rpb24gPT09ICdidWlsdCcpIHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9zdFJlY2VudEhhc2ggPSBtZXNzYWdlLmhhc2g7XG4gICAgICAgICAgICB0cnlBcHBseVVwZGF0ZXMoKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gJ3JlbG9hZFBhZ2UnKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgSE1SIG1lc3NhZ2U6ICcgKyBldmVudC5kYXRhICsgJ1xcbicgKyBleCk7XG4gICAgfVxufSk7XG4oMCwgX29uRGVtYW5kRW50cmllc1V0aWxzKS5zZXR1cFBpbmcoYXNzZXRQcmVmaXgsICgpPT5wYWdlXG4pO1xuKDAsIF9mb3VjKS5kaXNwbGF5Q29udGVudCgpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbXAtZGV2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hZGRNZXNzYWdlTGlzdGVuZXIgPSBhZGRNZXNzYWdlTGlzdGVuZXI7XG5leHBvcnRzLmdldEV2ZW50U291cmNlV3JhcHBlciA9IGdldEV2ZW50U291cmNlV3JhcHBlcjtcbmNvbnN0IGV2ZW50Q2FsbGJhY2tzID0gW107XG5mdW5jdGlvbiBFdmVudFNvdXJjZVdyYXBwZXIob3B0aW9ucykge1xuICAgIHZhciBzb3VyY2U7XG4gICAgdmFyIGxhc3RBY3Rpdml0eSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIGxpc3RlbmVycyA9IFtdO1xuICAgIGlmICghb3B0aW9ucy50aW1lb3V0KSB7XG4gICAgICAgIG9wdGlvbnMudGltZW91dCA9IDIwICogMTAwMDtcbiAgICB9XG4gICAgaW5pdCgpO1xuICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAobmV3IERhdGUoKSAtIGxhc3RBY3Rpdml0eSA+IG9wdGlvbnMudGltZW91dCkge1xuICAgICAgICAgICAgaGFuZGxlRGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfSwgb3B0aW9ucy50aW1lb3V0IC8gMik7XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgc291cmNlID0gbmV3IHdpbmRvdy5FdmVudFNvdXJjZShvcHRpb25zLnBhdGgpO1xuICAgICAgICBzb3VyY2Uub25vcGVuID0gaGFuZGxlT25saW5lO1xuICAgICAgICBzb3VyY2Uub25lcnJvciA9IGhhbmRsZURpc2Nvbm5lY3Q7XG4gICAgICAgIHNvdXJjZS5vbm1lc3NhZ2UgPSBoYW5kbGVNZXNzYWdlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVPbmxpbmUoKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmxvZykgY29uc29sZS5sb2coJ1tITVJdIGNvbm5lY3RlZCcpO1xuICAgICAgICBsYXN0QWN0aXZpdHkgPSBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XG4gICAgICAgIGxhc3RBY3Rpdml0eSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGlzdGVuZXJzW2ldKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudENhbGxiYWNrcy5mb3JFYWNoKChjYik9PntcbiAgICAgICAgICAgIGlmICghY2IudW5maWx0ZXJlZCAmJiBldmVudC5kYXRhLmluZGV4T2YoJ2FjdGlvbicpID09PSAtMSkgcmV0dXJuO1xuICAgICAgICAgICAgY2IoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlRGlzY29ubmVjdCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgIHNvdXJjZS5jbG9zZSgpO1xuICAgICAgICBzZXRUaW1lb3V0KGluaXQsIG9wdGlvbnMudGltZW91dCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNsb3NlOiAoKT0+e1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICBzb3VyY2UuY2xvc2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkTWVzc2FnZUxpc3RlbmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2goZm4pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZE1lc3NhZ2VMaXN0ZW5lcihjYikge1xuICAgIGV2ZW50Q2FsbGJhY2tzLnB1c2goY2IpO1xufVxuZnVuY3Rpb24gZ2V0RXZlbnRTb3VyY2VXcmFwcGVyKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gRXZlbnRTb3VyY2VXcmFwcGVyKG9wdGlvbnMpO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHNvdXJjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbi8qIGVzbGludC1kaXNhYmxlICovIC8vIEltcHJvdmVkIHZlcnNpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL1lhZmZsZS9FdmVudFNvdXJjZS9cbi8vIEF2YWlsYWJsZSB1bmRlciBNSVQgTGljZW5zZSAoTUlUKVxuLy8gT25seSB0cmllcyB0byBzdXBwb3J0IElFMTEgYW5kIG5vdGhpbmcgYmVsb3dcbnZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbnZhciBSZXNwb25zZTEgPSB3aW5kb3cuUmVzcG9uc2U7XG52YXIgVGV4dERlY29kZXIxID0gd2luZG93LlRleHREZWNvZGVyO1xudmFyIFRleHRFbmNvZGVyMSA9IHdpbmRvdy5UZXh0RW5jb2RlcjtcbnZhciBBYm9ydENvbnRyb2xsZXIxID0gd2luZG93LkFib3J0Q29udHJvbGxlcjtcbmlmIChBYm9ydENvbnRyb2xsZXIxID09IHVuZGVmaW5lZCkge1xuICAgIEFib3J0Q29udHJvbGxlcjEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaWduYWwgPSBudWxsO1xuICAgICAgICB0aGlzLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbmZ1bmN0aW9uIFRleHREZWNvZGVyUG9seWZpbGwoKSB7XG4gICAgdGhpcy5iaXRzTmVlZGVkID0gMDtcbiAgICB0aGlzLmNvZGVQb2ludCA9IDA7XG59XG5UZXh0RGVjb2RlclBvbHlmaWxsLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihvY3RldHMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZChjb2RlUG9pbnQsIHNoaWZ0LCBvY3RldHNDb3VudCkge1xuICAgICAgICBpZiAob2N0ZXRzQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2RlUG9pbnQgPj0gMTI4ID4+IHNoaWZ0ICYmIGNvZGVQb2ludCA8PCBzaGlmdCA8PSAyMDQ3O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvY3RldHNDb3VudCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIGNvZGVQb2ludCA+PSAyMDQ4ID4+IHNoaWZ0ICYmIGNvZGVQb2ludCA8PCBzaGlmdCA8PSA1NTI5NSB8fCBjb2RlUG9pbnQgPj0gNTczNDQgPj4gc2hpZnQgJiYgY29kZVBvaW50IDw8IHNoaWZ0IDw9IDY1NTM1O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvY3RldHNDb3VudCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIGNvZGVQb2ludCA+PSA2NTUzNiA+PiBzaGlmdCAmJiBjb2RlUG9pbnQgPDwgc2hpZnQgPD0gMTExNDExMTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb2N0ZXRzQ291bnQoYml0c05lZWRlZCwgY29kZVBvaW50KSB7XG4gICAgICAgIGlmIChiaXRzTmVlZGVkID09PSA2ICogMSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvZGVQb2ludCA+PiA2ID4gMTUgPyAzIDogY29kZVBvaW50ID4gMzEgPyAyIDogMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYml0c05lZWRlZCA9PT0gNiAqIDIpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2RlUG9pbnQgPiAxNSA/IDMgOiAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiaXRzTmVlZGVkID09PSA2ICogMykge1xuICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgfVxuICAgIHZhciBSRVBMQUNFUiA9IDY1NTMzO1xuICAgIHZhciBzdHJpbmcgPSAnJztcbiAgICB2YXIgYml0c05lZWRlZCA9IHRoaXMuYml0c05lZWRlZDtcbiAgICB2YXIgY29kZVBvaW50ID0gdGhpcy5jb2RlUG9pbnQ7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG9jdGV0cy5sZW5ndGg7IGkgKz0gMSl7XG4gICAgICAgIHZhciBvY3RldCA9IG9jdGV0c1tpXTtcbiAgICAgICAgaWYgKGJpdHNOZWVkZWQgIT09IDApIHtcbiAgICAgICAgICAgIGlmIChvY3RldCA8IDEyOCB8fCBvY3RldCA+IDE5MSB8fCAhdmFsaWQoY29kZVBvaW50IDw8IDYgfCBvY3RldCAmIDYzLCBiaXRzTmVlZGVkIC0gNiwgb2N0ZXRzQ291bnQoYml0c05lZWRlZCwgY29kZVBvaW50KSkpIHtcbiAgICAgICAgICAgICAgICBiaXRzTmVlZGVkID0gMDtcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPSBSRVBMQUNFUjtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiaXRzTmVlZGVkID09PSAwKSB7XG4gICAgICAgICAgICBpZiAob2N0ZXQgPj0gMCAmJiBvY3RldCA8PSAxMjcpIHtcbiAgICAgICAgICAgICAgICBiaXRzTmVlZGVkID0gMDtcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPSBvY3RldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2N0ZXQgPj0gMTkyICYmIG9jdGV0IDw9IDIyMykge1xuICAgICAgICAgICAgICAgIGJpdHNOZWVkZWQgPSA2ICogMTtcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPSBvY3RldCAmIDMxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvY3RldCA+PSAyMjQgJiYgb2N0ZXQgPD0gMjM5KSB7XG4gICAgICAgICAgICAgICAgYml0c05lZWRlZCA9IDYgKiAyO1xuICAgICAgICAgICAgICAgIGNvZGVQb2ludCA9IG9jdGV0ICYgMTU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9jdGV0ID49IDI0MCAmJiBvY3RldCA8PSAyNDcpIHtcbiAgICAgICAgICAgICAgICBiaXRzTmVlZGVkID0gNiAqIDM7XG4gICAgICAgICAgICAgICAgY29kZVBvaW50ID0gb2N0ZXQgJiA3O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaXRzTmVlZGVkID0gMDtcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPSBSRVBMQUNFUjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiaXRzTmVlZGVkICE9PSAwICYmICF2YWxpZChjb2RlUG9pbnQsIGJpdHNOZWVkZWQsIG9jdGV0c0NvdW50KGJpdHNOZWVkZWQsIGNvZGVQb2ludCkpKSB7XG4gICAgICAgICAgICAgICAgYml0c05lZWRlZCA9IDA7XG4gICAgICAgICAgICAgICAgY29kZVBvaW50ID0gUkVQTEFDRVI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiaXRzTmVlZGVkIC09IDY7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBjb2RlUG9pbnQgPDwgNiB8IG9jdGV0ICYgNjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJpdHNOZWVkZWQgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPD0gNjU1MzUpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NiArIChjb2RlUG9pbnQgLSA2NTUzNSAtIDEgPj4gMTApKTtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSg1NjMyMCArIChjb2RlUG9pbnQgLSA2NTUzNSAtIDEgJiAxMDIzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5iaXRzTmVlZGVkID0gYml0c05lZWRlZDtcbiAgICB0aGlzLmNvZGVQb2ludCA9IGNvZGVQb2ludDtcbiAgICByZXR1cm4gc3RyaW5nO1xufTtcbi8vIEZpcmVmb3ggPCAzOCB0aHJvd3MgYW4gZXJyb3Igd2l0aCBzdHJlYW0gb3B0aW9uXG52YXIgc3VwcG9ydHNTdHJlYW1PcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFRleHREZWNvZGVyMSgpLmRlY29kZShuZXcgVGV4dEVuY29kZXIxKCkuZW5jb2RlKCd0ZXN0JyksIHtcbiAgICAgICAgICAgIHN0cmVhbTogdHJ1ZVxuICAgICAgICB9KSA9PT0gJ3Rlc3QnO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbi8vIElFLCBFZGdlXG5pZiAoVGV4dERlY29kZXIxID09IHVuZGVmaW5lZCB8fCBUZXh0RW5jb2RlcjEgPT0gdW5kZWZpbmVkIHx8ICFzdXBwb3J0c1N0cmVhbU9wdGlvbigpKSB7XG4gICAgVGV4dERlY29kZXIxID0gVGV4dERlY29kZXJQb2x5ZmlsbDtcbn1cbnZhciBrID0gZnVuY3Rpb24oKSB7XG59O1xuZnVuY3Rpb24gWEhSV3JhcHBlcih4aHIpIHtcbiAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gJyc7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gMDtcbiAgICB0aGlzLnN0YXR1cyA9IDA7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJyc7XG4gICAgdGhpcy5yZXNwb25zZVRleHQgPSAnJztcbiAgICB0aGlzLm9ucHJvZ3Jlc3MgPSBrO1xuICAgIHRoaXMub25yZWFkeXN0YXRlY2hhbmdlID0gaztcbiAgICB0aGlzLl9jb250ZW50VHlwZSA9ICcnO1xuICAgIHRoaXMuX3hociA9IHhocjtcbiAgICB0aGlzLl9zZW5kVGltZW91dCA9IDA7XG4gICAgdGhpcy5fYWJvcnQgPSBrO1xufVxuWEhSV3JhcHBlci5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsKSB7XG4gICAgdGhpcy5fYWJvcnQodHJ1ZSk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciB4aHIgPSB0aGlzLl94aHI7XG4gICAgdmFyIHN0YXRlID0gMTtcbiAgICB2YXIgdGltZW91dCA9IDA7XG4gICAgdGhpcy5fYWJvcnQgPSBmdW5jdGlvbihzaWxlbnQpIHtcbiAgICAgICAgaWYgKHRoYXQuX3NlbmRUaW1lb3V0ICE9PSAwKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhhdC5fc2VuZFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhhdC5fc2VuZFRpbWVvdXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gMSB8fCBzdGF0ZSA9PT0gMiB8fCBzdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgc3RhdGUgPSA0O1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGs7XG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGs7XG4gICAgICAgICAgICB4aHIub25hYm9ydCA9IGs7XG4gICAgICAgICAgICB4aHIub25wcm9ncmVzcyA9IGs7XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaztcbiAgICAgICAgICAgIC8vIElFIDggLSA5OiBYRG9tYWluUmVxdWVzdCNhYm9ydCgpIGRvZXMgbm90IGZpcmUgYW55IGV2ZW50XG4gICAgICAgICAgICAvLyBPcGVyYSA8IDEwOiBYTUxIdHRwUmVxdWVzdCNhYm9ydCgpIGRvZXMgbm90IGZpcmUgYW55IGV2ZW50XG4gICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnJlYWR5U3RhdGUgPSA0O1xuICAgICAgICAgICAgICAgIHRoYXQub25yZWFkeXN0YXRlY2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSAwO1xuICAgIH07XG4gICAgdmFyIG9uU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICAvLyBzdGF0ZSA9IDI7XG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gMDtcbiAgICAgICAgICAgIHZhciBzdGF0dXNUZXh0ID0gJyc7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoISgnY29udGVudFR5cGUnIGluIHhocikpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBJRSA8IDEwIHRocm93cyBleGNlcHRpb24gZm9yIGB4aHIuc3RhdHVzYCB3aGVuIHhoci5yZWFkeVN0YXRlID09PSAyIHx8IHhoci5yZWFkeVN0YXRlID09PSAzXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhIDwgMTEgdGhyb3dzIGV4Y2VwdGlvbiBmb3IgYHhoci5zdGF0dXNgIHdoZW4geGhyLnJlYWR5U3RhdGUgPT09IDJcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MTIxXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveCA8IDE0LCBDaHJvbWUgPywgU2FmYXJpID9cbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Mjk2NThcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Nzc4NTRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwMDtcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gJ09LJztcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZSA9IHhoci5jb250ZW50VHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gMjtcbiAgICAgICAgICAgICAgICB0aGF0LnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgICAgICAgICB0aGF0LnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHRoYXQuX2NvbnRlbnRUeXBlID0gY29udGVudFR5cGU7XG4gICAgICAgICAgICAgICAgdGhhdC5vbnJlYWR5c3RhdGVjaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIG9uUHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgb25TdGFydCgpO1xuICAgICAgICBpZiAoc3RhdGUgPT09IDIgfHwgc3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgIHN0YXRlID0gMztcbiAgICAgICAgICAgIHZhciByZXNwb25zZVRleHQgPSAnJztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBJRSA4IC0gOSB3aXRoIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LnJlYWR5U3RhdGUgPSAzO1xuICAgICAgICAgICAgdGhhdC5yZXNwb25zZVRleHQgPSByZXNwb25zZVRleHQ7XG4gICAgICAgICAgICB0aGF0Lm9ucHJvZ3Jlc3MoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIG9uRmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEZpcmVmb3ggNTIgZmlyZXMgXCJyZWFkeXN0YXRlY2hhbmdlXCIgKHhoci5yZWFkeVN0YXRlID09PSA0KSB3aXRob3V0IGZpbmFsIFwicmVhZHlzdGF0ZWNoYW5nZVwiICh4aHIucmVhZHlTdGF0ZSA9PT0gMylcbiAgICAgICAgLy8gSUUgOCBmaXJlcyBcIm9ubG9hZFwiIHdpdGhvdXQgXCJvbnByb2dyZXNzXCJcbiAgICAgICAgb25Qcm9ncmVzcygpO1xuICAgICAgICBpZiAoc3RhdGUgPT09IDEgfHwgc3RhdGUgPT09IDIgfHwgc3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgIHN0YXRlID0gNDtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gNDtcbiAgICAgICAgICAgIHRoYXQub25yZWFkeXN0YXRlY2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvblJlYWR5U3RhdGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHhociAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIE9wZXJhIDEyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBvblN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvblRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBvblRpbWVvdXQoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAzKSB7XG4gICAgICAgICAgICBvblByb2dyZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFhEb21haW5SZXF1ZXN0I2Fib3J0IHJlbW92ZXMgb25wcm9ncmVzcywgb25lcnJvciwgb25sb2FkXG4gICAgeGhyLm9ubG9hZCA9IG9uRmluaXNoO1xuICAgIHhoci5vbmVycm9yID0gb25GaW5pc2g7XG4gICAgLy8gaW1wcm9wZXIgZml4IHRvIG1hdGNoIEZpcmVmb3ggYmVoYXZpb3IsIGJ1dCBpdCBpcyBiZXR0ZXIgdGhhbiBqdXN0IGlnbm9yZSBhYm9ydFxuICAgIC8vIHNlZSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03Njg1OTZcbiAgICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04ODAyMDBcbiAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTUzNTcwXG4gICAgLy8gSUUgOCBmaXJlcyBcIm9ubG9hZFwiIHdpdGhvdXQgXCJvbnByb2dyZXNzXG4gICAgeGhyLm9uYWJvcnQgPSBvbkZpbmlzaDtcbiAgICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03MzY3MjNcbiAgICBpZiAoISgnc2VuZEFzQmluYXJ5JyBpbiBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUpICYmICEoJ21vekFub24nIGluIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSkpIHtcbiAgICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBvblByb2dyZXNzO1xuICAgIH1cbiAgICAvLyBJRSA4IC0gOSAoWE1MSFRUUFJlcXVlc3QpXG4gICAgLy8gT3BlcmEgPCAxMlxuICAgIC8vIEZpcmVmb3ggPCAzLjVcbiAgICAvLyBGaXJlZm94IDMuNSAtIDMuNiAtID8gPCA5LjBcbiAgICAvLyBvbnByb2dyZXNzIGlzIG5vdCBmaXJlZCBzb21ldGltZXMgb3IgZGVsYXllZFxuICAgIC8vIHNlZSBhbHNvICM2NFxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBvblJlYWR5U3RhdGVDaGFuZ2U7XG4gICAgaWYgKCdjb250ZW50VHlwZScgaW4geGhyKSB7XG4gICAgICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgJ3BhZGRpbmc9dHJ1ZSc7XG4gICAgfVxuICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICBpZiAoJ3JlYWR5U3RhdGUnIGluIHhocikge1xuICAgICAgICAvLyB3b3JrYXJvdW5kIGZvciBPcGVyYSAxMiBpc3N1ZSB3aXRoIFwicHJvZ3Jlc3NcIiBldmVudHNcbiAgICAgICAgLy8gIzkxXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb25UaW1lb3V0KCk7XG4gICAgICAgIH0sIDApO1xuICAgIH1cbn07XG5YSFJXcmFwcGVyLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2Fib3J0KGZhbHNlKTtcbn07XG5YSFJXcmFwcGVyLnByb3RvdHlwZS5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFR5cGU7XG59O1xuWEhSV3JhcHBlci5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIHhociA9IHRoaXMuX3hocjtcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSk7XG4gICAgfVxufTtcblhIUldyYXBwZXIucHJvdG90eXBlLmdldEFsbFJlc3BvbnNlSGVhZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl94aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzICE9IHVuZGVmaW5lZCA/IHRoaXMuX3hoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSA6ICcnO1xufTtcblhIUldyYXBwZXIucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBsb2FkaW5nIGluZGljYXRvciBpbiBTYWZhcmkgPCA/ICg2KSwgQ2hyb21lIDwgMTQsIEZpcmVmb3hcbiAgICBpZiAoISgnb250aW1lb3V0JyBpbiBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUpICYmIGRvY3VtZW50ICE9IHVuZGVmaW5lZCAmJiBkb2N1bWVudC5yZWFkeVN0YXRlICE9IHVuZGVmaW5lZCAmJiBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnY29tcGxldGUnKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5fc2VuZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdC5fc2VuZFRpbWVvdXQgPSAwO1xuICAgICAgICAgICAgdGhhdC5zZW5kKCk7XG4gICAgICAgIH0sIDQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB4aHIgPSB0aGlzLl94aHI7XG4gICAgLy8gd2l0aENyZWRlbnRpYWxzIHNob3VsZCBiZSBzZXQgYWZ0ZXIgXCJvcGVuXCIgZm9yIFNhZmFyaSBhbmQgQ2hyb21lICg8IDE5ID8pXG4gICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRoaXMud2l0aENyZWRlbnRpYWxzO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcbiAgICB0cnkge1xuICAgICAgICAvLyB4aHIuc2VuZCgpOyB0aHJvd3MgXCJOb3QgZW5vdWdoIGFyZ3VtZW50c1wiIGluIEZpcmVmb3ggMy4wXG4gICAgICAgIHhoci5zZW5kKHVuZGVmaW5lZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IxKSB7XG4gICAgICAgIC8vIFNhZmFyaSA1LjEuNywgT3BlcmEgMTJcbiAgICAgICAgdGhyb3cgZXJyb3IxO1xuICAgIH1cbn07XG5mdW5jdGlvbiB0b0xvd2VyQ2FzZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjLmNoYXJDb2RlQXQoMCkgKyAzMik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBIZWFkZXJzUG9seWZpbGwoYWxsKSB7XG4gICAgLy8gR2V0IGhlYWRlcnM6IGltcGxlbWVudGVkIGFjY29yZGluZyB0byBtb3ppbGxhJ3MgZXhhbXBsZSBjb2RlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvZ2V0QWxsUmVzcG9uc2VIZWFkZXJzI0V4YW1wbGVcbiAgICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgYXJyYXkgPSBhbGwuc3BsaXQoJ1xcclxcbicpO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSl7XG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaV07XG4gICAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzogJyk7XG4gICAgICAgIHZhciBuYW1lID0gcGFydHMuc2hpZnQoKTtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOiAnKTtcbiAgICAgICAgbWFwW3RvTG93ZXJDYXNlKG5hbWUpXSA9IHZhbHVlO1xuICAgIH1cbiAgICB0aGlzLl9tYXAgPSBtYXA7XG59XG5IZWFkZXJzUG9seWZpbGwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwW3RvTG93ZXJDYXNlKG5hbWUpXTtcbn07XG5mdW5jdGlvbiBYSFJUcmFuc3BvcnQoKSB7XG59XG5YSFJUcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbih4aHIsIG9uU3RhcnRDYWxsYmFjaywgb25Qcm9ncmVzc0NhbGxiYWNrLCBvbkZpbmlzaENhbGxiYWNrLCB1cmwsIHdpdGhDcmVkZW50aWFscywgaGVhZGVycykge1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXNwb25zZVRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICB2YXIgY2h1bmsgPSByZXNwb25zZVRleHQuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IGNodW5rLmxlbmd0aDtcbiAgICAgICAgb25Qcm9ncmVzc0NhbGxiYWNrKGNodW5rKTtcbiAgICB9O1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICAgICAgICAgIHZhciBzdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgICAgICAgICAgdmFyIGhlYWRlcnMxID0geGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xuICAgICAgICAgICAgb25TdGFydENhbGxiYWNrKHN0YXR1cywgc3RhdHVzVGV4dCwgY29udGVudFR5cGUsIG5ldyBIZWFkZXJzUG9seWZpbGwoaGVhZGVyczEpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBvbkZpbmlzaENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHM7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICBmb3IodmFyIG5hbWUgaW4gaGVhZGVycyl7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGVhZGVycywgbmFtZSkpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHhoci5zZW5kKCk7XG59O1xuZnVuY3Rpb24gSGVhZGVyc1dyYXBwZXIoaGVhZGVyczIpIHtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVyczI7XG59XG5IZWFkZXJzV3JhcHBlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJzLmdldChuYW1lKTtcbn07XG5mdW5jdGlvbiBGZXRjaFRyYW5zcG9ydCgpIHtcbn1cbkZldGNoVHJhbnNwb3J0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oeGhyLCBvblN0YXJ0Q2FsbGJhY2ssIG9uUHJvZ3Jlc3NDYWxsYmFjaywgb25GaW5pc2hDYWxsYmFjaywgdXJsLCB3aXRoQ3JlZGVudGlhbHMsIGhlYWRlcnMyKSB7XG4gICAgdmFyIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyMSgpO1xuICAgIHZhciBzaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbCAvLyBzZWUgIzEyMFxuICAgIDtcbiAgICB2YXIgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIxKCk7XG4gICAgZmV0Y2godXJsLCB7XG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMyLFxuICAgICAgICBjcmVkZW50aWFsczogd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgc2lnbmFsOiBzaWduYWwsXG4gICAgICAgIGNhY2hlOiAnbm8tc3RvcmUnXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB2YXIgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgICAgb25TdGFydENhbGxiYWNrKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCwgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpLCBuZXcgSGVhZGVyc1dyYXBwZXIocmVzcG9uc2UuaGVhZGVycyksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgICAgcmVhZGVyLmNhbmNlbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHJlYWROZXh0Q2h1bmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90ZTogYnl0ZXMgaW4gdGV4dERlY29kZXIgYXJlIGlnbm9yZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaHVuayA9IHRleHREZWNvZGVyLmRlY29kZShyZXN1bHQudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW06IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25Qcm9ncmVzc0NhbGxiYWNrKGNodW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWROZXh0Q2h1bmsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pWydjYXRjaCddKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZE5leHRDaHVuaygpO1xuICAgICAgICB9KTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBvbkZpbmlzaENhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgb25GaW5pc2hDYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH0pO1xufTtcbmZ1bmN0aW9uIEV2ZW50VGFyZ2V0MSgpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xufVxuZnVuY3Rpb24gdGhyb3dFcnJvcihlKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICB9LCAwKTtcbn1cbkV2ZW50VGFyZ2V0MS5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICB2YXIgdHlwZUxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXTtcbiAgICBpZiAodHlwZUxpc3RlbmVycyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHR5cGVMaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpe1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gdHlwZUxpc3RlbmVyc1tpXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lci5oYW5kbGVFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93RXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuRXZlbnRUYXJnZXQxLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICB0eXBlID0gU3RyaW5nKHR5cGUpO1xuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgdmFyIHR5cGVMaXN0ZW5lcnMgPSBsaXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKHR5cGVMaXN0ZW5lcnMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHR5cGVMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgbGlzdGVuZXJzW3R5cGVdID0gdHlwZUxpc3RlbmVycztcbiAgICB9XG4gICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHR5cGVMaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpe1xuICAgICAgICBpZiAodHlwZUxpc3RlbmVyc1tpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHR5cGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxufTtcbkV2ZW50VGFyZ2V0MS5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgdHlwZSA9IFN0cmluZyh0eXBlKTtcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuICAgIHZhciB0eXBlTGlzdGVuZXJzID0gbGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmICh0eXBlTGlzdGVuZXJzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgZmlsdGVyZWQgPSBbXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHR5cGVMaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpe1xuICAgICAgICAgICAgaWYgKHR5cGVMaXN0ZW5lcnNbaV0gIT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWQucHVzaCh0eXBlTGlzdGVuZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkZWxldGUgbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdGVuZXJzW3R5cGVdID0gZmlsdGVyZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gRXZlbnQxKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudGFyZ2V0ID0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gTWVzc2FnZUV2ZW50MSh0eXBlLCBvcHRpb25zKSB7XG4gICAgRXZlbnQxLmNhbGwodGhpcywgdHlwZSk7XG4gICAgdGhpcy5kYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIHRoaXMubGFzdEV2ZW50SWQgPSBvcHRpb25zLmxhc3RFdmVudElkO1xufVxuTWVzc2FnZUV2ZW50MS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEV2ZW50MS5wcm90b3R5cGUpO1xuZnVuY3Rpb24gQ29ubmVjdGlvbkV2ZW50KHR5cGUsIG9wdGlvbnMpIHtcbiAgICBFdmVudDEuY2FsbCh0aGlzLCB0eXBlKTtcbiAgICB0aGlzLnN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzO1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9IG9wdGlvbnMuc3RhdHVzVGV4dDtcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG59XG5Db25uZWN0aW9uRXZlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFdmVudDEucHJvdG90eXBlKTtcbnZhciBXQUlUSU5HID0gLTE7XG52YXIgQ09OTkVDVElORyA9IDA7XG52YXIgT1BFTiA9IDE7XG52YXIgQ0xPU0VEID0gMjtcbnZhciBBRlRFUl9DUiA9IC0xO1xudmFyIEZJRUxEX1NUQVJUID0gMDtcbnZhciBGSUVMRCA9IDE7XG52YXIgVkFMVUVfU1RBUlQgPSAyO1xudmFyIFZBTFVFID0gMztcbnZhciBjb250ZW50VHlwZVJlZ0V4cCA9IC9edGV4dFxcL2V2ZW50XFwtc3RyZWFtOz8oXFxzKmNoYXJzZXRcXD11dGZcXC04KT8kL2k7XG52YXIgTUlOSU1VTV9EVVJBVElPTiA9IDEwMDA7XG52YXIgTUFYSU1VTV9EVVJBVElPTiA9IDE4MDAwMDAwO1xudmFyIHBhcnNlRHVyYXRpb24gPSBmdW5jdGlvbih2YWx1ZSwgZGVmKSB7XG4gICAgdmFyIG4gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIGlmIChuICE9PSBuKSB7XG4gICAgICAgIG4gPSBkZWY7XG4gICAgfVxuICAgIHJldHVybiBjbGFtcER1cmF0aW9uKG4pO1xufTtcbnZhciBjbGFtcER1cmF0aW9uID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChuLCBNSU5JTVVNX0RVUkFUSU9OKSwgTUFYSU1VTV9EVVJBVElPTik7XG59O1xudmFyIGZpcmUgPSBmdW5jdGlvbih0aGF0LCBmLCBldmVudCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZi5jYWxsKHRoYXQsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3dFcnJvcihlKTtcbiAgICB9XG59O1xuZnVuY3Rpb24gRXZlbnRTb3VyY2VQb2x5ZmlsbCh1cmwsIG9wdGlvbnMpIHtcbiAgICBFdmVudFRhcmdldDEuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm9ub3BlbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9ubWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy51cmwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Nsb3NlID0gdW5kZWZpbmVkO1xuICAgIHN0YXJ0KHRoaXMsIHVybCwgb3B0aW9ucyk7XG59XG52YXIgaXNGZXRjaFN1cHBvcnRlZCA9IGZldGNoICE9IHVuZGVmaW5lZCAmJiBSZXNwb25zZTEgIT0gdW5kZWZpbmVkICYmICdib2R5JyBpbiBSZXNwb25zZTEucHJvdG90eXBlO1xuZnVuY3Rpb24gc3RhcnQoZXMsIHVybCwgb3B0aW9ucykge1xuICAgIHVybCA9IFN0cmluZyh1cmwpO1xuICAgIHZhciB3aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zICE9IHVuZGVmaW5lZCAmJiBCb29sZWFuKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKTtcbiAgICB2YXIgaW5pdGlhbFJldHJ5ID0gY2xhbXBEdXJhdGlvbigxMDAwKTtcbiAgICB2YXIgaGVhcnRiZWF0VGltZW91dCA9IG9wdGlvbnMgIT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuaGVhcnRiZWF0VGltZW91dCAhPSB1bmRlZmluZWQgPyBwYXJzZUR1cmF0aW9uKG9wdGlvbnMuaGVhcnRiZWF0VGltZW91dCwgNDUwMDApIDogY2xhbXBEdXJhdGlvbig0NTAwMCk7XG4gICAgdmFyIGxhc3RFdmVudElkID0gJyc7XG4gICAgdmFyIHJldHJ5ID0gaW5pdGlhbFJldHJ5O1xuICAgIHZhciB3YXNBY3Rpdml0eSA9IGZhbHNlO1xuICAgIHZhciBoZWFkZXJzMiA9IG9wdGlvbnMgIT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuaGVhZGVycyAhPSB1bmRlZmluZWQgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuaGVhZGVycykpIDogdW5kZWZpbmVkO1xuICAgIHZhciBDdXJyZW50VHJhbnNwb3J0ID0gb3B0aW9ucyAhPSB1bmRlZmluZWQgJiYgb3B0aW9ucy5UcmFuc3BvcnQgIT0gdW5kZWZpbmVkID8gb3B0aW9ucy5UcmFuc3BvcnQgOiBYTUxIdHRwUmVxdWVzdDtcbiAgICB2YXIgeGhyID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAhKG9wdGlvbnMgIT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuVHJhbnNwb3J0ICE9IHVuZGVmaW5lZCkgPyB1bmRlZmluZWQgOiBuZXcgWEhSV3JhcHBlcihuZXcgQ3VycmVudFRyYW5zcG9ydCgpKTtcbiAgICB2YXIgdHJhbnNwb3J0ID0geGhyID09IHVuZGVmaW5lZCA/IG5ldyBGZXRjaFRyYW5zcG9ydCgpIDogbmV3IFhIUlRyYW5zcG9ydCgpO1xuICAgIHZhciBjYW5jZWxGdW5jdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdGltZW91dCA9IDA7XG4gICAgdmFyIGN1cnJlbnRTdGF0ZSA9IFdBSVRJTkc7XG4gICAgdmFyIGRhdGFCdWZmZXIgPSAnJztcbiAgICB2YXIgbGFzdEV2ZW50SWRCdWZmZXIgPSAnJztcbiAgICB2YXIgZXZlbnRUeXBlQnVmZmVyID0gJyc7XG4gICAgdmFyIHRleHRCdWZmZXIgPSAnJztcbiAgICB2YXIgc3RhdGUgPSBGSUVMRF9TVEFSVDtcbiAgICB2YXIgZmllbGRTdGFydCA9IDA7XG4gICAgdmFyIHZhbHVlU3RhcnQgPSAwO1xuICAgIHZhciBvblN0YXJ0ID0gZnVuY3Rpb24oc3RhdHVzLCBzdGF0dXNUZXh0LCBjb250ZW50VHlwZSwgaGVhZGVyczMsIGNhbmNlbCkge1xuICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBDT05ORUNUSU5HKSB7XG4gICAgICAgICAgICBjYW5jZWxGdW5jdGlvbiA9IGNhbmNlbDtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDIwMCAmJiBjb250ZW50VHlwZSAhPSB1bmRlZmluZWQgJiYgY29udGVudFR5cGVSZWdFeHAudGVzdChjb250ZW50VHlwZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGUgPSBPUEVOO1xuICAgICAgICAgICAgICAgIHdhc0FjdGl2aXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXRyeSA9IGluaXRpYWxSZXRyeTtcbiAgICAgICAgICAgICAgICBlcy5yZWFkeVN0YXRlID0gT1BFTjtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ29ubmVjdGlvbkV2ZW50KCdvcGVuJywge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogc3RhdHVzVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyczNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBmaXJlKGVzLCBlcy5vbm9wZW4sIGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSBzdGF0dXNUZXh0LnJlcGxhY2UoL1xccysvZywgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJFdmVudFNvdXJjZSdzIHJlc3BvbnNlIGhhcyBhIHN0YXR1cyBcIiArIHN0YXR1cyArICcgJyArIHN0YXR1c1RleHQgKyAnIHRoYXQgaXMgbm90IDIwMC4gQWJvcnRpbmcgdGhlIGNvbm5lY3Rpb24uJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJFdmVudFNvdXJjZSdzIHJlc3BvbnNlIGhhcyBhIENvbnRlbnQtVHlwZSBzcGVjaWZ5aW5nIGFuIHVuc3VwcG9ydGVkIHR5cGU6IFwiICsgKGNvbnRlbnRUeXBlID09IHVuZGVmaW5lZCA/ICctJyA6IGNvbnRlbnRUeXBlLnJlcGxhY2UoL1xccysvZywgJyAnKSkgKyAnLiBBYm9ydGluZyB0aGUgY29ubmVjdGlvbi4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ29ubmVjdGlvbkV2ZW50KCdlcnJvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHN0YXR1c1RleHQsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgZmlyZShlcywgZXMub25lcnJvciwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgb25Qcm9ncmVzcyA9IGZ1bmN0aW9uKHRleHRDaHVuaykge1xuICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBPUEVOKSB7XG4gICAgICAgICAgICB2YXIgbiA9IC0xO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRleHRDaHVuay5sZW5ndGg7IGkgKz0gMSl7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0ZXh0Q2h1bmsuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAoYyA9PT0gJ1xcbicuY2hhckNvZGVBdCgwKSB8fCBjID09PSAnXFxyJy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICAgICAgICAgIG4gPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjaHVuayA9IChuICE9PSAtMSA/IHRleHRCdWZmZXIgOiAnJykgKyB0ZXh0Q2h1bmsuc2xpY2UoMCwgbiArIDEpO1xuICAgICAgICAgICAgdGV4dEJ1ZmZlciA9IChuID09PSAtMSA/IHRleHRCdWZmZXIgOiAnJykgKyB0ZXh0Q2h1bmsuc2xpY2UobiArIDEpO1xuICAgICAgICAgICAgaWYgKGNodW5rICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHdhc0FjdGl2aXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcih2YXIgcG9zaXRpb24gPSAwOyBwb3NpdGlvbiA8IGNodW5rLmxlbmd0aDsgcG9zaXRpb24gKz0gMSl7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSBjaHVuay5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IEFGVEVSX0NSICYmIGMgPT09ICdcXG4nLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBGSUVMRF9TVEFSVDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IEFGVEVSX0NSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IEZJRUxEX1NUQVJUO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnXFxyJy5jaGFyQ29kZUF0KDApIHx8IGMgPT09ICdcXG4nLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gRklFTERfU1RBUlQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IEZJRUxEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU3RhcnQgPSBwb3NpdGlvbiArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGNodW5rLnNsaWNlKGZpZWxkU3RhcnQsIHZhbHVlU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjaHVuay5zbGljZSh2YWx1ZVN0YXJ0ICsgKHZhbHVlU3RhcnQgPCBwb3NpdGlvbiAmJiBjaHVuay5jaGFyQ29kZUF0KHZhbHVlU3RhcnQpID09PSAnICcuY2hhckNvZGVBdCgwKSA/IDEgOiAwKSwgcG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZCA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFCdWZmZXIgKz0gJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFCdWZmZXIgKz0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RXZlbnRJZEJ1ZmZlciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGQgPT09ICdldmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlQnVmZmVyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gJ3JldHJ5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsUmV0cnkgPSBwYXJzZUR1cmF0aW9uKHZhbHVlLCBpbml0aWFsUmV0cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRyeSA9IGluaXRpYWxSZXRyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAnaGVhcnRiZWF0VGltZW91dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhcnRiZWF0VGltZW91dCA9IHBhcnNlRHVyYXRpb24odmFsdWUsIGhlYXJ0YmVhdFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGltZW91dCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25UaW1lb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBoZWFydGJlYXRUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gRklFTERfU1RBUlQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUJ1ZmZlciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEV2ZW50SWQgPSBsYXN0RXZlbnRJZEJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZUJ1ZmZlciA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZUJ1ZmZlciA9ICdtZXNzYWdlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgTWVzc2FnZUV2ZW50MShldmVudFR5cGVCdWZmZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFCdWZmZXIuc2xpY2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RXZlbnRJZDogbGFzdEV2ZW50SWRCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlQnVmZmVyID09PSAnbWVzc2FnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUoZXMsIGVzLm9ubWVzc2FnZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IENMT1NFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFCdWZmZXIgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFR5cGVCdWZmZXIgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gYyA9PT0gJ1xccicuY2hhckNvZGVBdCgwKSA/IEFGVEVSX0NSIDogRklFTERfU1RBUlQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IEZJRUxEX1NUQVJUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRTdGFydCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gRklFTEQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IEZJRUxEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09ICc6Jy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU3RhcnQgPSBwb3NpdGlvbiArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gVkFMVUVfU1RBUlQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gVkFMVUVfU1RBUlQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IFZBTFVFO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgb25GaW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gT1BFTiB8fCBjdXJyZW50U3RhdGUgPT09IENPTk5FQ1RJTkcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IFdBSVRJTkc7XG4gICAgICAgICAgICBpZiAodGltZW91dCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG9uVGltZW91dCgpO1xuICAgICAgICAgICAgfSwgcmV0cnkpO1xuICAgICAgICAgICAgcmV0cnkgPSBjbGFtcER1cmF0aW9uKE1hdGgubWluKGluaXRpYWxSZXRyeSAqIDE2LCByZXRyeSAqIDIpKTtcbiAgICAgICAgICAgIGVzLnJlYWR5U3RhdGUgPSBDT05ORUNUSU5HO1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50MSgnZXJyb3InKTtcbiAgICAgICAgICAgIGVzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgZmlyZShlcywgZXMub25lcnJvciwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY3VycmVudFN0YXRlID0gQ0xPU0VEO1xuICAgICAgICBpZiAoY2FuY2VsRnVuY3Rpb24gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYW5jZWxGdW5jdGlvbigpO1xuICAgICAgICAgICAgY2FuY2VsRnVuY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWVvdXQgIT09IDApIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVzLnJlYWR5U3RhdGUgPSBDTE9TRUQ7XG4gICAgfTtcbiAgICB2YXIgb25UaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRpbWVvdXQgPSAwO1xuICAgICAgICBpZiAoY3VycmVudFN0YXRlICE9PSBXQUlUSU5HKSB7XG4gICAgICAgICAgICBpZiAoIXdhc0FjdGl2aXR5ICYmIGNhbmNlbEZ1bmN0aW9uICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93RXJyb3IobmV3IEVycm9yKCdObyBhY3Rpdml0eSB3aXRoaW4gJyArIGhlYXJ0YmVhdFRpbWVvdXQgKyAnIG1pbGxpc2Vjb25kcy4gUmVjb25uZWN0aW5nLicpKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxGdW5jdGlvbigpO1xuICAgICAgICAgICAgICAgIGNhbmNlbEZ1bmN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3YXNBY3Rpdml0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBvblRpbWVvdXQoKTtcbiAgICAgICAgICAgICAgICB9LCBoZWFydGJlYXRUaW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3YXNBY3Rpdml0eSA9IGZhbHNlO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG9uVGltZW91dCgpO1xuICAgICAgICB9LCBoZWFydGJlYXRUaW1lb3V0KTtcbiAgICAgICAgY3VycmVudFN0YXRlID0gQ09OTkVDVElORztcbiAgICAgICAgZGF0YUJ1ZmZlciA9ICcnO1xuICAgICAgICBldmVudFR5cGVCdWZmZXIgPSAnJztcbiAgICAgICAgbGFzdEV2ZW50SWRCdWZmZXIgPSBsYXN0RXZlbnRJZDtcbiAgICAgICAgdGV4dEJ1ZmZlciA9ICcnO1xuICAgICAgICBmaWVsZFN0YXJ0ID0gMDtcbiAgICAgICAgdmFsdWVTdGFydCA9IDA7XG4gICAgICAgIHN0YXRlID0gRklFTERfU1RBUlQ7XG4gICAgICAgIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQyODkxNlxuICAgICAgICAvLyBSZXF1ZXN0IGhlYWRlciBmaWVsZCBMYXN0LUV2ZW50LUlEIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMuXG4gICAgICAgIHZhciByZXF1ZXN0VVJMID0gdXJsO1xuICAgICAgICBpZiAodXJsLnNsaWNlKDAsIDUpICE9PSAnZGF0YTonICYmIHVybC5zbGljZSgwLCA1KSAhPT0gJ2Jsb2I6Jykge1xuICAgICAgICAgICAgaWYgKGxhc3RFdmVudElkICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RVUkwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArICdsYXN0RXZlbnRJZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxhc3RFdmVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSB7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzWydBY2NlcHQnXSA9ICd0ZXh0L2V2ZW50LXN0cmVhbSc7XG4gICAgICAgIGlmIChoZWFkZXJzMiAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvcih2YXIgbmFtZSBpbiBoZWFkZXJzMil7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzMiwgbmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnNbbmFtZV0gPSBoZWFkZXJzMltuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5vcGVuKHhociwgb25TdGFydCwgb25Qcm9ncmVzcywgb25GaW5pc2gsIHJlcXVlc3RVUkwsIHdpdGhDcmVkZW50aWFscywgcmVxdWVzdEhlYWRlcnMpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBlcy51cmwgPSB1cmw7XG4gICAgZXMucmVhZHlTdGF0ZSA9IENPTk5FQ1RJTkc7XG4gICAgZXMud2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzO1xuICAgIGVzLl9jbG9zZSA9IGNsb3NlO1xuICAgIG9uVGltZW91dCgpO1xufVxuRXZlbnRTb3VyY2VQb2x5ZmlsbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEV2ZW50VGFyZ2V0MS5wcm90b3R5cGUpO1xuRXZlbnRTb3VyY2VQb2x5ZmlsbC5wcm90b3R5cGUuQ09OTkVDVElORyA9IENPTk5FQ1RJTkc7XG5FdmVudFNvdXJjZVBvbHlmaWxsLnByb3RvdHlwZS5PUEVOID0gT1BFTjtcbkV2ZW50U291cmNlUG9seWZpbGwucHJvdG90eXBlLkNMT1NFRCA9IENMT1NFRDtcbkV2ZW50U291cmNlUG9seWZpbGwucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fY2xvc2UoKTtcbn07XG5FdmVudFNvdXJjZVBvbHlmaWxsLkNPTk5FQ1RJTkcgPSBDT05ORUNUSU5HO1xuRXZlbnRTb3VyY2VQb2x5ZmlsbC5PUEVOID0gT1BFTjtcbkV2ZW50U291cmNlUG9seWZpbGwuQ0xPU0VEID0gQ0xPU0VEO1xuRXZlbnRTb3VyY2VQb2x5ZmlsbC5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gdW5kZWZpbmVkO1xudmFyIF9kZWZhdWx0ID0gRXZlbnRTb3VyY2VQb2x5ZmlsbDtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudC1zb3VyY2UtcG9seWZpbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRpc3BsYXlDb250ZW50ID0gZGlzcGxheUNvbnRlbnQ7XG5mdW5jdGlvbiBkaXNwbGF5Q29udGVudChjYWxsYmFjaykge1xuICAgICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQpKGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IodmFyIHggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1uZXh0LWhpZGUtZm91Y10nKSwgaSA9IHgubGVuZ3RoOyBpLS07KXtcbiAgICAgICAgICAgIHhbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh4W2ldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91Yy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2xvc2VQaW5nID0gY2xvc2VQaW5nO1xuZXhwb3J0cy5zZXR1cFBpbmcgPSBzZXR1cFBpbmc7XG5leHBvcnRzLmN1cnJlbnRQYWdlID0gdm9pZCAwO1xudmFyIF9ldmVudHNvdXJjZSA9IHJlcXVpcmUoXCIuL2Vycm9yLW92ZXJsYXkvZXZlbnRzb3VyY2VcIik7XG5sZXQgZXZ0U291cmNlO1xubGV0IGN1cnJlbnRQYWdlO1xuZXhwb3J0cy5jdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlO1xuZnVuY3Rpb24gY2xvc2VQaW5nKCkge1xuICAgIGlmIChldnRTb3VyY2UpIGV2dFNvdXJjZS5jbG9zZSgpO1xuICAgIGV2dFNvdXJjZSA9IG51bGw7XG59XG5mdW5jdGlvbiBzZXR1cFBpbmcoYXNzZXRQcmVmaXgsIHBhdGhuYW1lRm4sIHJldHJ5KSB7XG4gICAgY29uc3QgcGF0aG5hbWUgPSBwYXRobmFtZUZuKCk7XG4gICAgLy8gTWFrZSBzdXJlIHRvIG9ubHkgY3JlYXRlIG5ldyBFdmVudFNvdXJjZSByZXF1ZXN0IGlmIHBhZ2UgaGFzIGNoYW5nZWRcbiAgICBpZiAocGF0aG5hbWUgPT09IGN1cnJlbnRQYWdlICYmICFyZXRyeSkgcmV0dXJuO1xuICAgIGV4cG9ydHMuY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZSA9IHBhdGhuYW1lO1xuICAgIC8vIGNsb3NlIGN1cnJlbnQgRXZlbnRTb3VyY2UgY29ubmVjdGlvblxuICAgIGNsb3NlUGluZygpO1xuICAgIGV2dFNvdXJjZSA9ICgwLCBfZXZlbnRzb3VyY2UpLmdldEV2ZW50U291cmNlV3JhcHBlcih7XG4gICAgICAgIHBhdGg6IGAke2Fzc2V0UHJlZml4fS9fbmV4dC93ZWJwYWNrLWhtcj9wYWdlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGN1cnJlbnRQYWdlKX1gLFxuICAgICAgICB0aW1lb3V0OiA1MDAwXG4gICAgfSk7XG4gICAgZXZ0U291cmNlLmFkZE1lc3NhZ2VMaXN0ZW5lcigoZXZlbnQpPT57XG4gICAgICAgIGlmIChldmVudC5kYXRhLmluZGV4T2YoJ3snKSA9PT0gLTEpIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgLy8gZG9uJ3QgYXR0ZW1wdCBmZXRjaGluZyB0aGUgcGFnZSBpZiB3ZSdyZSBhbHJlYWR5IHNob3dpbmdcbiAgICAgICAgICAgIC8vIHRoZSBkZXYgb3ZlcmxheSBhcyB0aGlzIGNhbiBjYXVzZSB0aGUgZXJyb3IgdG8gYmUgdHJpZ2dlcmVkXG4gICAgICAgICAgICAvLyByZXBlYXRlZGx5XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5pbnZhbGlkICYmICFzZWxmLl9fTkVYVF9EQVRBX18uZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gUGF5bG9hZCBjYW4gYmUgaW52YWxpZCBldmVuIGlmIHRoZSBwYWdlIGRvZXMgbm90IGV4aXN0LlxuICAgICAgICAgICAgICAgIC8vIFNvLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBleGlzdHMgYmVmb3JlIHJlbG9hZGluZy5cbiAgICAgICAgICAgICAgICBmZXRjaChsb2NhdGlvbi5ocmVmLCB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nXG4gICAgICAgICAgICAgICAgfSkudGhlbigocGFnZVJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VSZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignb24tZGVtYW5kLWVudHJpZXMgZmFpbGVkIHRvIHBhcnNlIHJlc3BvbnNlJywgZXJyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vbi1kZW1hbmQtZW50cmllcy11dGlscy5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIl9ldmVudFNvdXJjZVBvbHlmaWxsIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfZXZlbnRzb3VyY2UiLCJfb25EZW1hbmRFbnRyaWVzVXRpbHMiLCJfZm91YyIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsInJlc29sdmUiLCJyZWplY3QiLCJfbmV4dCIsIl90aHJvdyIsImtleSIsImFyZyIsImluZm8iLCJ2YWx1ZSIsImVycm9yIiwiZG9uZSIsIlByb21pc2UiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJmbiIsInNlbGYiLCJhcmdzIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJlcnIiLCJ1bmRlZmluZWQiLCJvYmoiLCJfX2VzTW9kdWxlIiwid2luZG93IiwiRXZlbnRTb3VyY2UiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRleHRDb250ZW50IiwiYXNzZXRQcmVmaXgiLCJwYWdlIiwibW9zdFJlY2VudEhhc2giLCJjdXJIYXNoIiwiX193ZWJwYWNrX2hhc2hfXyIsImhvdFVwZGF0ZVBhdGgiLCJlbmRzV2l0aCIsImlzVXBkYXRlQXZhaWxhYmxlIiwiY2FuQXBwbHlVcGRhdGVzIiwibW9kdWxlIiwiaG90Iiwic3RhdHVzIiwiX3RyeUFwcGx5VXBkYXRlcyIsImZldGNoIiwiX193ZWJwYWNrX3J1bnRpbWVfaWRfXyIsInJlcyIsImpzb24iLCJqc29uRGF0YSIsImN1clBhZ2UiLCJwYWdlVXBkYXRlZCIsIkFycmF5IiwiaXNBcnJheSIsImMiLCJPYmplY3QiLCJrZXlzIiwic29tZSIsIm1vZCIsImluZGV4T2YiLCJzdWJzdHIiLCJyZXBsYWNlIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjb25zb2xlIiwidHJ5QXBwbHlVcGRhdGVzIiwiYWRkTWVzc2FnZUxpc3RlbmVyIiwiZXZlbnQiLCJtZXNzYWdlIiwiYWN0aW9uIiwiaGFzaCIsImV4Iiwid2FybiIsInNldHVwUGluZyIsImRpc3BsYXlDb250ZW50IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwiZ2V0RXZlbnRTb3VyY2VXcmFwcGVyIiwiZXZlbnRDYWxsYmFja3MiLCJFdmVudFNvdXJjZVdyYXBwZXIiLCJvcHRpb25zIiwic291cmNlIiwibGFzdEFjdGl2aXR5IiwiRGF0ZSIsImxpc3RlbmVycyIsInRpbWVvdXQiLCJpbml0IiwidGltZXIiLCJzZXRJbnRlcnZhbCIsImhhbmRsZURpc2Nvbm5lY3QiLCJwYXRoIiwib25vcGVuIiwiaGFuZGxlT25saW5lIiwib25lcnJvciIsIm9ubWVzc2FnZSIsImhhbmRsZU1lc3NhZ2UiLCJsb2ciLCJpIiwibGVuZ3RoIiwiZm9yRWFjaCIsImNiIiwidW5maWx0ZXJlZCIsImNsZWFySW50ZXJ2YWwiLCJjbG9zZSIsInNldFRpbWVvdXQiLCJwdXNoIiwiUmVzcG9uc2UxIiwiUmVzcG9uc2UiLCJUZXh0RGVjb2RlcjEiLCJUZXh0RGVjb2RlciIsIlRleHRFbmNvZGVyMSIsIlRleHRFbmNvZGVyIiwiQWJvcnRDb250cm9sbGVyMSIsIkFib3J0Q29udHJvbGxlciIsInNpZ25hbCIsImFib3J0IiwiVGV4dERlY29kZXJQb2x5ZmlsbCIsImJpdHNOZWVkZWQiLCJjb2RlUG9pbnQiLCJwcm90b3R5cGUiLCJkZWNvZGUiLCJvY3RldHMiLCJ2YWxpZCIsInNoaWZ0Iiwib2N0ZXRzQ291bnQiLCJFcnJvciIsIlJFUExBQ0VSIiwic3RyaW5nIiwib2N0ZXQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJzdXBwb3J0c1N0cmVhbU9wdGlvbiIsImVuY29kZSIsInN0cmVhbSIsImsiLCJYSFJXcmFwcGVyIiwieGhyIiwid2l0aENyZWRlbnRpYWxzIiwicmVzcG9uc2VUeXBlIiwicmVhZHlTdGF0ZSIsInN0YXR1c1RleHQiLCJyZXNwb25zZVRleHQiLCJvbnByb2dyZXNzIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiX2NvbnRlbnRUeXBlIiwiX3hociIsIl9zZW5kVGltZW91dCIsIl9hYm9ydCIsIm9wZW4iLCJtZXRob2QiLCJ1cmwiLCJ0aGF0Iiwic3RhdGUiLCJzaWxlbnQiLCJjbGVhclRpbWVvdXQiLCJvbmxvYWQiLCJvbmFib3J0Iiwib25TdGFydCIsImNvbnRlbnRUeXBlIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJvblByb2dyZXNzIiwib25GaW5pc2giLCJvblJlYWR5U3RhdGVDaGFuZ2UiLCJvblRpbWVvdXQiLCJYTUxIdHRwUmVxdWVzdCIsIm5hbWUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwic2VuZCIsImVycm9yMSIsInRvTG93ZXJDYXNlIiwiY2hhckNvZGVBdCIsIkhlYWRlcnNQb2x5ZmlsbCIsImFsbCIsIm1hcCIsImNyZWF0ZSIsImFycmF5Iiwic3BsaXQiLCJsaW5lIiwicGFydHMiLCJqb2luIiwiX21hcCIsImdldCIsIlhIUlRyYW5zcG9ydCIsIm9uU3RhcnRDYWxsYmFjayIsIm9uUHJvZ3Jlc3NDYWxsYmFjayIsIm9uRmluaXNoQ2FsbGJhY2siLCJoZWFkZXJzIiwib2Zmc2V0IiwiY2h1bmsiLCJzbGljZSIsImhlYWRlcnMxIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiSGVhZGVyc1dyYXBwZXIiLCJoZWFkZXJzMiIsIl9oZWFkZXJzIiwiRmV0Y2hUcmFuc3BvcnQiLCJjb250cm9sbGVyIiwidGV4dERlY29kZXIiLCJjcmVkZW50aWFscyIsImNhY2hlIiwicmVzcG9uc2UiLCJyZWFkZXIiLCJib2R5IiwiZ2V0UmVhZGVyIiwiY2FuY2VsIiwicmVhZE5leHRDaHVuayIsInJlYWQiLCJyZXN1bHQiLCJFdmVudFRhcmdldDEiLCJfbGlzdGVuZXJzIiwidGhyb3dFcnJvciIsImUiLCJkaXNwYXRjaEV2ZW50IiwidGFyZ2V0IiwidHlwZUxpc3RlbmVycyIsInR5cGUiLCJsaXN0ZW5lciIsImhhbmRsZUV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvdW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImZpbHRlcmVkIiwiRXZlbnQxIiwiTWVzc2FnZUV2ZW50MSIsImxhc3RFdmVudElkIiwiQ29ubmVjdGlvbkV2ZW50IiwiV0FJVElORyIsIkNPTk5FQ1RJTkciLCJPUEVOIiwiQ0xPU0VEIiwiQUZURVJfQ1IiLCJGSUVMRF9TVEFSVCIsIkZJRUxEIiwiVkFMVUVfU1RBUlQiLCJWQUxVRSIsImNvbnRlbnRUeXBlUmVnRXhwIiwiTUlOSU1VTV9EVVJBVElPTiIsIk1BWElNVU1fRFVSQVRJT04iLCJwYXJzZUR1cmF0aW9uIiwiZGVmIiwibiIsInBhcnNlSW50IiwiY2xhbXBEdXJhdGlvbiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJmaXJlIiwiZiIsIkV2ZW50U291cmNlUG9seWZpbGwiLCJfY2xvc2UiLCJzdGFydCIsImlzRmV0Y2hTdXBwb3J0ZWQiLCJlcyIsIkJvb2xlYW4iLCJpbml0aWFsUmV0cnkiLCJoZWFydGJlYXRUaW1lb3V0IiwicmV0cnkiLCJ3YXNBY3Rpdml0eSIsInN0cmluZ2lmeSIsIkN1cnJlbnRUcmFuc3BvcnQiLCJUcmFuc3BvcnQiLCJ0cmFuc3BvcnQiLCJjYW5jZWxGdW5jdGlvbiIsImN1cnJlbnRTdGF0ZSIsImRhdGFCdWZmZXIiLCJsYXN0RXZlbnRJZEJ1ZmZlciIsImV2ZW50VHlwZUJ1ZmZlciIsInRleHRCdWZmZXIiLCJmaWVsZFN0YXJ0IiwidmFsdWVTdGFydCIsImhlYWRlcnMzIiwidGVzdCIsInRleHRDaHVuayIsInBvc2l0aW9uIiwiZmllbGQiLCJyZXF1ZXN0VVJMIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVxdWVzdEhlYWRlcnMiLCJfZGVmYXVsdCIsImNhbGxiYWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwieCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJjbG9zZVBpbmciLCJjdXJyZW50UGFnZSIsImV2dFNvdXJjZSIsInBhdGhuYW1lRm4iLCJwYXRobmFtZSIsInBheWxvYWQiLCJpbnZhbGlkIiwiX19ORVhUX0RBVEFfXyIsImhyZWYiLCJwYWdlUmVzIl0sInNvdXJjZVJvb3QiOiIifQ==