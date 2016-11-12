require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _typeof2 = __webpack_require__(2);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(5);
  
  var _path = __webpack_require__(6);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(7);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(8);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(9);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(11);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _Html = __webpack_require__(12);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _ErrorPage = __webpack_require__(14);
  
  var _ErrorPage2 = __webpack_require__(16);
  
  var _ErrorPage3 = _interopRequireDefault(_ErrorPage2);
  
  var _universalRouter = __webpack_require__(23);
  
  var _universalRouter2 = _interopRequireDefault(_universalRouter);
  
  var _prettyError = __webpack_require__(24);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _createHistory = __webpack_require__(25);
  
  var _createHistory2 = _interopRequireDefault(_createHistory);
  
  var _configureStore = __webpack_require__(29);
  
  var _configureStore2 = _interopRequireDefault(_configureStore);
  
  var _routes = __webpack_require__(44);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(226);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _runtime = __webpack_require__(227);
  
  var _users = __webpack_require__(212);
  
  var _toggleSidebar = __webpack_require__(59);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var port = process.env.PORT || 3000; // eslint-disable-line import/no-unresolved
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var history, sent, removeHistoryListener, _ret;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              history = (0, _createHistory2.default)(req.url);
              // let currentLocation = history.getCurrentLocation();
  
              sent = false;
              removeHistoryListener = history.listen(function (location) {
                var newUrl = '' + location.pathname + location.search;
                if (req.originalUrl !== newUrl) {
                  // console.log(`R ${req.originalUrl} -> ${newUrl}`); // eslint-disable-line no-console
                  if (!sent) {
                    res.redirect(303, newUrl);
                    sent = true;
                    next();
                  } else {
                    console.error(req.path + ': Already sent!'); // eslint-disable-line no-console
                  }
                }
              });
              _context2.prev = 3;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var store, token, css, statusCode, data, html;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        store = (0, _configureStore2.default)({}, {
                          isSidebarOpen: true,
                          cookie: req.cookies,
                          history: history
                        });
                        token = req.cookies["_at"];
  
                        if (!((!token || token == 'null') && req.path != '/login' && req.path != '/signUp')) {
                          _context.next = 5;
                          break;
                        }
  
                        res.redirect('/login');
                        return _context.abrupt('return', {
                          v: void 0
                        });
  
                      case 5:
                        store.dispatch((0, _runtime.setRuntimeVariable)({
                          name: 'initialNow',
                          value: Date.now()
                        }));
                        store.dispatch((0, _toggleSidebar.toggleSidebarAction)(req.cookies["isSidebarOpen"] == "true" || true));
                        store.dispatch((0, _toggleSidebar.onChangeSidebarActiveAction)(req.cookies["sidebarActive"] || "/"));
  
                        if (!token) {
                          _context.next = 11;
                          break;
                        }
  
                        _context.next = 11;
                        return store.dispatch((0, _users.fetchUserInfo)(token, ("production") == 'development'));
  
                      case 11:
                        css = [];
                        statusCode = 200;
                        data = { title: '', description: '', style: '', bootstrapCss: _assets2.default.main.css, script: _assets2.default.main.js, children: '' };
                        _context.next = 16;
                        return _universalRouter2.default.resolve(_routes2.default, {
                          path: req.path,
                          query: req.query,
                          context: {
                            store: store,
                            createHref: history.createHref,
                            insertCss: function insertCss() {
                              for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
                                styles[_key] = arguments[_key];
                              }
  
                              styles.forEach(function (style) {
                                return css.push(style._getCss());
                              }); // eslint-disable-line no-underscore-dangle, max-len
                            },
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            },
                            pathname: req.path
                          },
                          render: function render(component) {
                            var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  
                            css = [];
                            statusCode = status;
                            data.children = _server2.default.renderToString(component);
                            data.style = css.join('');
                            data.state = store.getState();
                            return true;
                          }
                        });
  
                      case 16:
                        if (!sent) {
                          html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, data));
  
                          res.status(statusCode);
                          res.send('<!doctype html>' + html);
                        }
  
                      case 17:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 5);
  
            case 5:
              _ret = _context2.t0;
  
              if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                _context2.next = 8;
                break;
              }
  
              return _context2.abrupt('return', _ret.v);
  
            case 8:
              _context2.next = 14;
              break;
  
            case 10:
              _context2.prev = 10;
              _context2.t1 = _context2['catch'](3);
  
              console.log(_context2.t1);
              next(_context2.t1);
  
            case 14:
              _context2.prev = 14;
  
              removeHistoryListener();
              return _context2.finish(14);
  
            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[3, 10, 14, 17]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var statusCode = err.status || 500;
    var html = _server2.default.renderToStaticMarkup((0, _jsx3.default)(_Html2.default, {
      title: 'Internal Server Error',
      description: err.message,
      style: _ErrorPage3.default._getCss()
    }, void 0, _server2.default.renderToString((0, _jsx3.default)(_ErrorPage.ErrorPage, {
      error: err
    }))));
    res.status(statusCode);
    res.send('<!doctype html>' + html);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  // models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, function () {
    console.log('The server is running at http://localhost:' + port + '/');
  });
  // });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/jsx");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import { analytics } from '../config';
  
  var _ref2 = (0, _jsx3.default)("meta", {
    charSet: "utf-8"
  });
  
  var _ref3 = (0, _jsx3.default)("meta", {
    httpEquiv: "x-ua-compatible",
    content: "ie=edge"
  });
  
  var _ref4 = (0, _jsx3.default)("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  });
  
  var _ref5 = (0, _jsx3.default)("link", {
    rel: "apple-touch-icon",
    href: "apple-touch-icon.png"
  });
  
  var _ref6 = (0, _jsx3.default)("link", {
    rel: "stylesheet",
    href: "/icomoon/style.css"
  });
  
  function Html(_ref) {
    var title = _ref.title,
        description = _ref.description,
        bootstrapCss = _ref.bootstrapCss,
        style = _ref.style,
        script = _ref.script,
        children = _ref.children,
        state = _ref.state;
  
    return (0, _jsx3.default)("html", {
      className: "no-js",
      lang: ""
    }, void 0, (0, _jsx3.default)("head", {}, void 0, _ref2, _ref3, (0, _jsx3.default)("title", {}, void 0, title), (0, _jsx3.default)("meta", {
      name: "description",
      content: description
    }), _ref4, _ref5, _ref6, (0, _jsx3.default)("link", {
      rel: "stylesheet",
      href: bootstrapCss
    }), (0, _jsx3.default)("style", {
      id: "css",
      dangerouslySetInnerHTML: { __html: style }
    })), (0, _jsx3.default)("body", {}, void 0, (0, _jsx3.default)("div", {
      id: "app",
      dangerouslySetInnerHTML: { __html: children }
    }), script && (0, _jsx3.default)("script", {
      id: "source",
      src: script,
      "data-initial-state": (0, _stringify2.default)(state)
    })));
  }
  
  exports.default = Html;

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  exports.ErrorPage = ErrorPage;
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import s from './ErrorPage.css';
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = '出错啦';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (false) {
      errorMessage = (0, _jsx3.default)('pre', {}, void 0, error.stack);
    }
  
    if (context.setTitle) {
      context.setTitle(title);
    }
  
    return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h1', {}, void 0, title), (0, _jsx3.default)('p', {}, void 0, content), errorMessage);
  }
  
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = ErrorPage;
  // export default withStyles(s)(ErrorPage);

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(17);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "*{line-height:1.2;margin:0}html{color:#888;display:table;font-family:sans-serif;height:100%;text-align:center;width:100%}body{display:table-cell;vertical-align:middle;margin:2em auto}h1{color:#555;font-size:2em;font-weight:400}p{margin:0 auto;width:280px}pre{text-align:left;margin-top:32px;margin-top:2rem}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 18 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(20);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(21);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(22);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(26);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(27);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(28);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default); /**
                                                                                                                                      * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                      *
                                                                                                                                      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                      *
                                                                                                                                      * This source code is licensed under the MIT license found in the
                                                                                                                                      * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                      */

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = configureStore;
  
  var _redux = __webpack_require__(30);
  
  var _reduxThunk = __webpack_require__(31);
  
  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
  
  var _logger = __webpack_require__(32);
  
  var _logger2 = _interopRequireDefault(_logger);
  
  var _reducers = __webpack_require__(34);
  
  var _reducers2 = _interopRequireDefault(_reducers);
  
  var _createHelpers = __webpack_require__(39);
  
  var _createHelpers2 = _interopRequireDefault(_createHelpers);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function configureStore(initialState, helpersConfig) {
    var helpers = (0, _createHelpers2.default)(helpersConfig);
    var middleware = [_reduxThunk2.default.withExtraArgument(helpers)];
  
    var enhancer = void 0;
  
    if (false) {
      middleware.push((0, _logger2.default)());
  
      // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
      var devToolsExtension = function devToolsExtension(f) {
        return f;
      };
      if (process.env.BROWSER && window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension();
      }
      enhancer = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), devToolsExtension);
    } else {
      enhancer = _redux.applyMiddleware.apply(undefined, middleware);
    }
  
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    var store = (0, _redux.createStore)(_reducers2.default, initialState, enhancer);
  
    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (false) {
      module.hot.accept('../reducers', function () {
        return store.replaceReducer(require('../reducers').default);
      } // eslint-disable-line global-require
      );
    }
  
    return store;
  }

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("redux");

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("redux-thunk");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createLogger;
  
  var _util = __webpack_require__(33);
  
  // Server side redux action logger
  function createLogger() {
    return function (store) {
      return function (next) {
        return function (action) {
          // eslint-disable-line no-unused-vars
          var formattedPayload = (0, _util.inspect)(action.payload, {
            colors: true
          });
          console.log(' * ' + action.type + ': ' + formattedPayload); // eslint-disable-line no-console
          return next(action);
        };
      };
    };
  }

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("util");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(20);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _redux = __webpack_require__(30);
  
  var _runtime = __webpack_require__(35);
  
  var _runtime2 = _interopRequireDefault(_runtime);
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var serviceData = {
    policy: 1,
    pods_num: 1,
    service_name: "",
    containerDeploy: 0,
    containerNum: 1,
    isUpdate: 1,
    container: [{ at: new Date().getTime() }],
    env: [{ at: new Date().getTime() }],
    volume: [{ at: new Date().getTime(), readonly: 0 }],
    auto_startup: 1
  };
  
  function isSidebarOpen() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.SIDEBAR_STATUS.OPEN;
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.TOGGLE_SIDEBAR:
        return action.status;
      default:
        return state;
    }
  }
  
  function sidebarActive() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.SIDEBAR_ACTIVE:
        return action.payload;
      default:
        return state;
    }
  }
  
  function serviceList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_ALL_SERVICES:
        return action.payload;
      case _constants.CLEAR_SERVICE_LIST:
        return [];
      case Const.REFRESH_LIST:
        return [0];
      default:
        return state;
    }
  }
  
  function podList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_POD_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function serviceDetail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : serviceData;
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_SERVICE_DETAIL:
        return action.payload;
      case _constants.ADD_PORT:
        var addPort = state.container;
        addPort.push({ at: new Date().getTime() });
        return (0, _assign2.default)({}, state, { container: addPort });
      case _constants.DEL_PORT:
        var delPort = state.container;
        if (delPort.length == 1) {} else {
          for (var j = 0; j < delPort.length; j++) {
            if (delPort[j].at == action.payload) {
              delPort.splice(j, 1);
            }
          }
        }
        return (0, _assign2.default)({}, state, { container: delPort });
      case _constants.ADD_SAVE:
        var addSave = state.volume;
        addSave.push({ at: new Date().getTime(), readonly: 1 });
        return (0, _assign2.default)({}, state, { volume: addSave });
      case _constants.DEL_SAVE:
        var delSave = state.volume;
        if (delSave.length == 1) {
          return (0, _assign2.default)({}, state, { volume: [{ at: new Date().getTime(), readonly: 1 }] });
        } else {
          for (var m = 0; m < delSave.length; m++) {
            if (delSave[m].at == action.payload) {
              delSave.splice(m, 1);
            }
          }
          return (0, _assign2.default)({}, state, { volume: delSave });
        }
      case _constants.ADD_ENV:
        var addEnv = state.env;
        addEnv.push({ at: new Date().getTime() });
        return (0, _assign2.default)({}, state, { env: addEnv });
      case _constants.DEL_ENV:
        var env = state.env;
        if (env.length == 1) {
          return (0, _assign2.default)({}, state, { env: [{ at: new Date().getTime() }] });
        } else {
          for (var i = 0; i < env.length; i++) {
            if (env[i].at == action.payload) {
              env.splice(i, 1);
            }
          }
          return (0, _assign2.default)({}, state, { env: env });
        }
      case Const.RECEIVE_ENDPOINTS:
        return (0, _assign2.default)({}, state, { endpoints: action.payload });
      case _constants.CLEAR_SERVICE_DETAIL:
        return serviceData;
      default:
        return state;
    }
  }
  
  function monitorData() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { memory: {}, network: {}, cpu: {} };
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_MONITOR_DATA:
        switch (action.flag) {
          case "memory":
            return (0, _assign2.default)({}, state, { memory: action.payload });
            break;
          case "network":
            return (0, _assign2.default)({}, state, { network: action.payload });
            break;
          case "cpu":
            return (0, _assign2.default)({}, state, { cpu: action.payload });
        }
        break;
      default:
        return state;
    }
  }
  
  function volumesList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.RECEIVE_VOLUMES_LIST:
        return action.payload.map(function (item) {
          item.disk_used = item.disk_used == 'yes' ? 0 : 1;
          return item;
        });
      case _constants.CLEAR_VOLUMES_LIST:
        return [];
      case Const.REFRESH_LIST:
        return [0];
      default:
        return state;
    }
  }
  
  function isBtnState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { deploy: true, building: true, volume: true, autoStateUp: true, reviseBuilding: true,
      port: true, storage: true, env: true, command: true, pods: true };
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.IS_BTN_STATE.deploy:
        state.deploy = action.payload;
        return (0, _assign2.default)({}, state);
      case _constants.IS_BTN_STATE.building:
        state.building = action.payload;
        return (0, _assign2.default)({}, state);
      case _constants.IS_BTN_STATE.createVolume:
        state.createVolume = action.payload;
        return (0, _assign2.default)({}, state);
      case Const.IS_BTN_STATE.autoStateUp:
        state.autoStateUp = action.payload;
        return (0, _assign2.default)({}, state);
      case Const.IS_BTN_STATE.reviseBuilding:
        state.reviseBuilding = action.payload;
        return (0, _assign2.default)({}, state);
      case Const.IS_BTN_STATE.port:
        state.port = action.payload;
        return (0, _assign2.default)({}, state);
      case Const.IS_BTN_STATE.storage:
        state.storage = action.payload;
        return (0, _assign2.default)({}, state);
      case Const.IS_BTN_STATE.env:
        state.env = action.payload;
        return (0, _assign2.default)({}, state);
      case Const.IS_BTN_STATE.command:
        state.command = action.payload;
        return (0, _assign2.default)({}, state);
      case Const.IS_BTN_STATE.pods:
        state.pods = action.payload;
        return (0, _assign2.default)({}, state);
      default:
        return state;
    }
  }
  
  function repos() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_REPO_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function isLoading() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.IS_LOADING:
        return action.payload;
      default:
        return state;
    }
  }
  
  function imageList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_IMAGE_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function imageDetail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_IMAGE_DETAIL:
        return action.payload;
      default:
        return state;
    }
  }
  
  function user_info() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.RECEIVE_USER_INFO:
        return action.payload;
      default:
        return state;
    }
  }
  
  function breadcrumbList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.BREADCRUMB_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function githubAuthURL() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_GITHUB_AUTH_URL:
        return action.payload;
      default:
        return state;
    }
  }
  
  function buildingImageList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_BUILDING_IMAGE_LIST:
        return action.payload;
      case _constants.CLEAR_IMAGE_LIST:
        return [];
      case Const.REFRESH_LIST:
        return [0];
      default:
        return state;
    }
  }
  function buildingDetail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_BUILDING_DETAIL:
        return action.payload;
      default:
        return state;
    }
  }
  
  function deployData() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : serviceData;
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.DEPLOY_SVC_IMAGE:
        return (0, _assign2.default)({}, state, {
          image_name: action.payload.image_name,
          image_id: action.payload.image_id
        });
      case _constants.DEPLOY_SVC_CONTAINER:
        return (0, _assign2.default)({}, state, action.payload);
      case _constants.DEPLOY_SVC_SENIOR:
        return (0, _assign2.default)({}, state, action.payload);
      case _constants.ADD_PORT:
        var addPort = state.container;
        addPort.push({ at: new Date().getTime() });
        return (0, _assign2.default)({}, state, { container: addPort });
      case _constants.DEL_PORT:
        var delPort = state.container;
        if (delPort.length <= 1) {
          return (0, _assign2.default)({}, state, { container: delPort });
        } else {
          for (var j = 0; j < delPort.length; j++) {
            if (delPort[j].at == action.payload) {
              delPort.splice(j, 1);
            }
          }
          return (0, _assign2.default)({}, state, { container: delPort });
        }
      case _constants.ADD_SAVE:
        var addSave = state.volume;
        addSave.push({ at: new Date().getTime(), readonly: 1 });
        return (0, _assign2.default)({}, state, { volume: addSave });
      case _constants.DEL_SAVE:
        var delSave = state.volume;
        if (delSave.length <= 1) {
          return (0, _assign2.default)({}, state, { volume: delSave });
        } else {
          for (var m = 0; m < delSave.length; m++) {
            if (delSave[m].at == action.payload) {
              delSave.splice(m, 1);
            }
          }
          return (0, _assign2.default)({}, state, { volume: delSave });
        }
      case _constants.ADD_ENV:
        var addEnv = state.env;
        addEnv.push({ at: new Date().getTime() });
        return (0, _assign2.default)({}, state, { env: addEnv });
      case _constants.DEL_ENV:
        var env = state.env;
        if (env.length <= 1) {
          return (0, _assign2.default)({}, state, { env: env });
        } else {
          for (var i = 0; i < env.length; i++) {
            if (env[i].at == action.payload) {
              env.splice(i, 1);
            }
          }
          return (0, _assign2.default)({}, state, { env: env });
        }
      case Const.CLEAR_DEPLOY_DATA:
        return serviceData;
      default:
        return state;
    }
  }
  
  function logs() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.RECEIVE_LOG:
        return [].concat(state).concat(action.payload);
      default:
        return state;
    }
  }
  
  function logs_xhr() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.OPEN_LOG_XHR:
        return action.payload;
      case _constants.ABORT_LOG_XHR:
        state.abort();
        return {};
      default:
        return state;
    }
  }
  
  function notifications() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.RECEIVE_NOTIFICATION:
        return action.payload;
      case _constants.CLEAR_NOTIFICATION:
        return {};
      default:
        return state;
    }
  }
  function organizeList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_ORGANIZE_LIST:
        return action.payload;
        break;
      default:
        return state;
    }
  }
  function organizeDetail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { creation_time: "" };
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_ORGANIZE_DETAIL:
        return action.payload;
        break;
      default:
        return (0, _assign2.default)({}, state);
    }
  }
  function organizeUserList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_ORGANIZE_USER_LIST:
        return action.payload;
        break;
      default:
        return state;
    }
  }
  function userList() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_USER_LIST:
        return action.payload;
        break;
      default:
        return state;
    }
  }
  
  var rootReducer = (0, _redux.combineReducers)({
    isSidebarOpen: isSidebarOpen,
    sidebarActive: sidebarActive,
    volumesList: volumesList,
    serviceList: serviceList,
    serviceDetail: serviceDetail,
    monitorData: monitorData,
    podList: podList,
    repos: repos,
    isLoading: isLoading,
    imageList: imageList,
    imageDetail: imageDetail,
    user_info: user_info,
    breadcrumbList: breadcrumbList,
    githubAuthURL: githubAuthURL,
    buildingImageList: buildingImageList,
    buildingDetail: buildingDetail,
    deployData: deployData,
    logs: logs,
    logs_xhr: logs_xhr,
    notifications: notifications,
    runtime: _runtime2.default,
    isBtnState: isBtnState,
    organizeList: organizeList,
    organizeDetail: organizeDetail,
    organizeUserList: organizeUserList,
    userList: userList
  });
  
  exports.default = rootReducer;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _defineProperty2 = __webpack_require__(36);
  
  var _defineProperty3 = _interopRequireDefault(_defineProperty2);
  
  var _extends3 = __webpack_require__(37);
  
  var _extends4 = _interopRequireDefault(_extends3);
  
  exports.default = runtime;
  
  var _constants = __webpack_require__(38);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function runtime() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.SET_RUNTIME_VARIABLE:
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, action.payload.name, action.payload.value));
      default:
        return state;
    }
  }

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 38 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var TOGGLE_SIDEBAR = exports.TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
  
  var SIDEBAR_STATUS = exports.SIDEBAR_STATUS = {
    OPEN: true,
    CLOSE: false
  };
  var SIDEBAR_ACTIVE = exports.SIDEBAR_ACTIVE = 'SIDEBAR_ACTIVE';
  var SET_RUNTIME_VARIABLE = exports.SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
  var RECEIVE_VOLUMES_LIST = exports.RECEIVE_VOLUMES_LIST = 'RECEIVE_VOLUMES_LIST';
  var CLEAR_VOLUMES_LIST = exports.CLEAR_VOLUMES_LIST = 'CLEAR_VOLUMES_LIST';
  // deploy service
  var DEPLOY_SVC_IMAGE = exports.DEPLOY_SVC_IMAGE = "DEPLOY_SVC_IMAGE";
  var DEPLOY_SVC_CONTAINER = exports.DEPLOY_SVC_CONTAINER = 'DEPLOY_SVC_CONTAINER';
  var DEPLOY_SVC_SENIOR = exports.DEPLOY_SVC_SENIOR = 'DEPLOY_SVC_SENIOR';
  var CLEAR_DEPLOY_DATA = exports.CLEAR_DEPLOY_DATA = 'CLEAR_DEPLOY_DATA';
  // service
  var GET_ALL_SERVICES = exports.GET_ALL_SERVICES = 'GET_ALL_SERVICES';
  var CLEAR_SERVICE_LIST = exports.CLEAR_SERVICE_LIST = 'CLEAR_SERVICE_LIST';
  var REFRESH_LIST = exports.REFRESH_LIST = 'REFRESH_LIST';
  var GET_SERVICE_DETAIL = exports.GET_SERVICE_DETAIL = 'GET_SERVICE_DETAIL';
  var ADD_PORT = exports.ADD_PORT = 'ADD_PORT';
  var DEL_PORT = exports.DEL_PORT = 'DEL_PORT';
  var ADD_SAVE = exports.ADD_SAVE = 'ADD_SAVE';
  var DEL_SAVE = exports.DEL_SAVE = 'DEL_SAVE';
  var ADD_ENV = exports.ADD_ENV = 'ADD_ENV';
  var DEL_ENV = exports.DEL_ENV = 'DEL_ENV';
  var CLEAR_SERVICE_DETAIL = exports.CLEAR_SERVICE_DETAIL = 'CLEAR_SERVICE_DETAIL';
  var GET_POD_LIST = exports.GET_POD_LIST = 'GET_POD_LIST';
  var SERVICE_STATE = exports.SERVICE_STATE = {
    Running: 'running',
    Pending: 'pending',
    Stopping: 'stopping'
  };
  var GET_MONITOR_DATA = exports.GET_MONITOR_DATA = 'GET_MONITOR_DATA';
  //image
  var GET_IMAGE_LIST = exports.GET_IMAGE_LIST = 'GET_IMAGE_LIST';
  var CLEAR_IMAGE_LIST = exports.CLEAR_IMAGE_LIST = 'CLEAR_IMAGE_LIST';
  var GET_IMAGE_DETAIL = exports.GET_IMAGE_DETAIL = 'GET_IMAGE_DETELE';
  var API_VOLUMES_URL = exports.API_VOLUMES_URL = "http://storage.boxlinker.com/api/v1.0/storage/volumes";
  var API_SERVICE_URL = exports.API_SERVICE_URL = "http://api.boxlinker.com/api/v1/application/service";
  var API_DELETE_SERVICE_URL = exports.API_DELETE_SERVICE_URL = "http://api.boxlinker.com/api/v1/application/remove/service";
  var API_IMAGE_URL = exports.API_IMAGE_URL = "http://auth.boxlinker.com/registry/v2";
  // building
  var GET_REPO_LIST = exports.GET_REPO_LIST = "GET_REPO_LIST";
  var IS_LOADING = exports.IS_LOADING = "IS_LOADING";
  var GET_GITHUB_AUTH_URL = exports.GET_GITHUB_AUTH_URL = "GET_GITHUB_AUTH_URL";
  var GET_BUILDING_IMAGE_LIST = exports.GET_BUILDING_IMAGE_LIST = "GET_BUILDING_IMAGE_LIST";
  var GET_BUILDING_DETAIL = exports.GET_BUILDING_DETAIL = 'GET_BUILDING_DETAIL';
  // userinfo
  var RECEIVE_USER_INFO = exports.RECEIVE_USER_INFO = "RECEIVE_USER_INFO";
  var GET_USER_LIST = exports.GET_USER_LIST = 'GET_USER_LIST';
  // organize
  var GET_ORGANIZE_LIST = exports.GET_ORGANIZE_LIST = 'GET_ORGANIZE_LIST';
  var GET_ORGANIZE_DETAIL = exports.GET_ORGANIZE_DETAIL = 'GET_ORGANIZE_DETAIL';
  var GET_ORGANIZE_USER_LIST = exports.GET_ORGANIZE_USER_LIST = 'GET_ORGANIZE_USER_LIST';
  // breadcrumb
  var BREADCRUMB_LIST = exports.BREADCRUMB_LIST = "BREADCRUMB_LIST";
  var BREADCRUMB = exports.BREADCRUMB = {
    CONSOLE: {
      title: '控制台',
      link: '/'
    },
    CHOSE_IMAGE: {
      title: "选择镜像",
      link: '/choseImage'
    },
    CONFIG_CONTAINER: {
      title: "容器配置",
      link: '/configContainer'
    },
    ADD_SERVICE: {
      title: '新建服务',
      link: 'javascript:;'
    },
    NEW_SERVICE: {
      title: '新建服务',
      link: '/addService'
    },
    SERVICE_LIST: {
      title: '服务列表',
      link: '/serviceList'
    },
    SERVICE_DETAIL: {
      title: '服务详情',
      link: '/serviceList'
    },
    VOLUMES: {
      title: '存储卷',
      link: '/volumes'
    },
    IMAGES_MY: {
      title: '我的镜像',
      link: '/imageForMy'
    },
    IMAGES_BOX_LINKER: {
      title: '平台镜像',
      link: '/imageForPlatform'
    },
    BUILD_IMAGE: {
      title: '构建镜像',
      link: '/building'
    },
    CREATE_IMAGE: {
      title: '新建镜像',
      link: 'createImage'
    },
    BUILD_CREATE: {
      title: '代码构建',
      link: '/create'
    },
    IMAGE_DETAIL: {
      title: '镜像详情',
      link: '/imageDetail'
    },
    USER_CONTAINER: {
      title: '个人中心',
      link: '/user'
    },
    ORGANIZE: {
      title: '组织中心',
      link: '/organize'
    }
  };
  
  // logs
  var RECEIVE_LOG = exports.RECEIVE_LOG = "RECEIVE_LOG";
  var STOP_RECEIVE_LOG = exports.STOP_RECEIVE_LOG = "STOP_RECEIVE_LOG";
  var OPEN_LOG_XHR = exports.OPEN_LOG_XHR = "OPEN_LOG_XHR";
  var ABORT_LOG_XHR = exports.ABORT_LOG_XHR = "ABORT_LOG_XHR";
  
  // websocket
  var WS_MSG_TYPES = exports.WS_MSG_TYPES = ["service"].reduce(function (accum, msg) {
    accum[msg] = msg;
    return accum;
  }, {});
  var WS_URL = exports.WS_URL = "http://boxlinker.com:30003";
  var RECEIVE_NOTIFICATION = exports.RECEIVE_NOTIFICATION = "RECEIVE_NOTIFICATION";
  var CLEAR_NOTIFICATION = exports.CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
  var RECEIVE_SERVICE_STATE = exports.RECEIVE_SERVICE_STATE = "RECEIVE_SERVICE_STATE";
  
  var URL = false;
  
  if (URL) {
    URL = 'http://www.livenowhy.com';
  } else {
    URL = 'http://auth.boxlinker.com';
  }
  
  var FETCH_URL = exports.FETCH_URL = {
    REPOS: URL + '/oauth/githubrepo',
    GITHUB_AUTH: URL + '/oauth/oauthurl',
    USER_INFO: URL + '/user/userinfo',
    REVISE_PASSWORD: URL + '/user/password',
    BUILDING: URL + '/oauth/githubbuild',
    USER: URL + '/api/v1.0/usercenter',
    IMAGE_LIST: URL + '/registry/image_repository',
    USER_INFO_INTERNAL: 'http://registry-api:8080/user/userinfo',
    LOGS: 'http://logs.boxlinker.com/api/v1.0/logs/polling/labels',
    SVC_ENDPOINTS: function SVC_ENDPOINTS(name) {
      return 'http://ci-api.boxlinker.com/api/v1/endpoints/' + name;
    },
    IMAGE: URL + '/registry/image_repository',
    BUILDING_REVISE: URL + '/api/v1.0/repository/repositorybuilds',
    GET_SERVICE_MONITOR: 'http://monitor.boxlinker.com/api/v1/model/namespaces',
  
    //new
    ORGANIZE: URL + '/api/v1.0/usercenter/orgs',
    TOKEN: URL + '/api/v1.0/usercenter/tokens'
  
  };
  // endpoints
  var RECEIVE_ENDPOINTS = exports.RECEIVE_ENDPOINTS = 'RECEIVE_ENDPOINTS';
  
  var INPUT_TIP = exports.INPUT_TIP = {
    service: {
      Null: "服务名称不能为空",
      Format: "必须为小写字母数字下划线组合,开头必须为字母"
    },
    image: {
      Null: "镜像名称不能为空",
      Format: "必须为小写字母数字下划线组合,开头必须为字母"
    },
    port: {
      Null: "端口不能为空",
      Format: "端口格式不正确",
      Repeat: "端口不能重复"
    },
    volumes: {
      Null: "容器路径不能为空",
      Format: "必须以/开头,后可加字母数字下划线",
      Repeat: "数据卷名称不能重复"
    },
    env: {
      Null: "环境变量值不能为空",
      Format: "环境变量只能为字母数字中划线,并以字母开头",
      Repeat: "环境变量键值不能重复"
    }
  
  };
  
  var CPU = exports.CPU = [{ x: 1, m: "128M" }, { x: 2, m: "256M" }, { x: 4, m: "512M" }, { x: 8, m: "1024M" }, { x: 16, m: "2048M" }];
  
  var IS_BTN_STATE = exports.IS_BTN_STATE = {
    deploy: 'IS_DEPLOY',
    building: 'IS_BUILDING',
    createVolume: 'IS_CREATE_VOLUME',
    autoStateUp: 'IS_AUTO_STATE_UP',
    reviseBuilding: "REVISE_BUILDING",
    port: 'IS_PORT',
    storage: 'STORAGE',
    env: 'ENV',
    command: 'COMMAND',
    pods: 'PODS'
  };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  exports.default = createHelpers;
  
  var _fetch = __webpack_require__(40);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function createGraphqlRequest(fetchKnowingCookie) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(query, variables) {
        var fetchConfig, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetchConfig = {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({ query: query, variables: variables }),
                  credentials: 'include'
                };
                _context.next = 3;
                return fetchKnowingCookie('/graphql', fetchConfig);
  
              case 3:
                resp = _context.sent;
  
                if (!(resp.status !== 200)) {
                  _context.next = 6;
                  break;
                }
  
                throw new Error(resp.statusText);
  
              case 6:
                _context.next = 8;
                return resp.json();
  
              case 8:
                return _context.abrupt('return', _context.sent);
  
              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
  
      function graphqlRequest(_x, _x2) {
        return _ref.apply(this, arguments);
      }
  
      return graphqlRequest;
    }();
  }
  
  function createFetchKnowingCookie(_ref2) {
    var cookie = _ref2.cookie;
  
    if (true) {
      return function (url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  
        var isLocalUrl = /^\/($|[^\/])/.test(url);
  
        // pass cookie only for itself.
        // We can't know cookies for other sites BTW
        if (isLocalUrl && options.credentials === 'include') {
          var headers = (0, _extends3.default)({}, options.headers, {
            cookie: cookie
          });
          return (0, _fetch2.default)(url, (0, _extends3.default)({}, options, { headers: headers }));
        }
  
        return (0, _fetch2.default)(url, options);
      };
    }
  
    return _fetch2.default;
  }
  
  function createHelpers(config) {
    var fetchKnowingCookie = createFetchKnowingCookie(config);
    var graphqlRequest = createGraphqlRequest(fetchKnowingCookie);
  
    return {
      fetch: fetchKnowingCookie,
      graphqlRequest: graphqlRequest,
      history: config.history
    };
  }

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(41);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(42);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(43);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default;
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 42 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 43 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || "localhost:" + port;
  
  // export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  
  // export const analytics = {
  //
  //   // https://analytics.google.com/
  //   google: {
  //     trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  //   },
  //
  // };
  
  // export const auth = {
  //
  //   jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  //
  //   // https://developers.facebook.com/
  //   facebook: {
  //     id: process.env.FACEBOOK_APP_ID || '186244551745631',
  //     secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  //   },
  //
  //   // https://cloud.google.com/console/project
  //   google: {
  //     id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
  //     secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  //   },
  //
  //   // https://apps.twitter.com/
  //   twitter: {
  //     key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
  //     secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  //   },
  //
  // };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _components = __webpack_require__(45);
  
  var _components2 = _interopRequireDefault(_components);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _dashboard = __webpack_require__(87);
  
  var _dashboard2 = _interopRequireDefault(_dashboard);
  
  var _imageCenter = __webpack_require__(100);
  
  var _imageCenter2 = _interopRequireDefault(_imageCenter);
  
  var _imageForPlatform = __webpack_require__(104);
  
  var _imageForPlatform2 = _interopRequireDefault(_imageForPlatform);
  
  var _imageForMy = __webpack_require__(109);
  
  var _imageForMy2 = _interopRequireDefault(_imageForMy);
  
  var _imageDetail = __webpack_require__(114);
  
  var _imageDetail2 = _interopRequireDefault(_imageDetail);
  
  var _createImage = __webpack_require__(126);
  
  var _createImage2 = _interopRequireDefault(_createImage);
  
  var _buildingDetail = __webpack_require__(134);
  
  var _buildingDetail2 = _interopRequireDefault(_buildingDetail);
  
  var _building = __webpack_require__(139);
  
  var _building2 = _interopRequireDefault(_building);
  
  var _buildingCreate = __webpack_require__(143);
  
  var _buildingCreate2 = _interopRequireDefault(_buildingCreate);
  
  var _error = __webpack_require__(147);
  
  var _error2 = _interopRequireDefault(_error);
  
  var _serviceList = __webpack_require__(148);
  
  var _serviceList2 = _interopRequireDefault(_serviceList);
  
  var _addService = __webpack_require__(151);
  
  var _addService2 = _interopRequireDefault(_addService);
  
  var _choseImage = __webpack_require__(159);
  
  var _choseImage2 = _interopRequireDefault(_choseImage);
  
  var _configContainer = __webpack_require__(164);
  
  var _configContainer2 = _interopRequireDefault(_configContainer);
  
  var _serviceDetail = __webpack_require__(174);
  
  var _serviceDetail2 = _interopRequireDefault(_serviceDetail);
  
  var _dataVolumeList = __webpack_require__(193);
  
  var _dataVolumeList2 = _interopRequireDefault(_dataVolumeList);
  
  var _login = __webpack_require__(198);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _signUp = __webpack_require__(200);
  
  var _signUp2 = _interopRequireDefault(_signUp);
  
  var _userCenter = __webpack_require__(203);
  
  var _userCenter2 = _interopRequireDefault(_userCenter);
  
  var _reviseImage = __webpack_require__(213);
  
  var _reviseImage2 = _interopRequireDefault(_reviseImage);
  
  var _organize = __webpack_require__(216);
  
  var _organize2 = _interopRequireDefault(_organize);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    // keep in mind, routes are evaluated in order
    children: [_dashboard2.default, _imageCenter2.default, _imageForPlatform2.default, _imageForMy2.default, _imageDetail2.default, _createImage2.default, _reviseImage2.default, _buildingCreate2.default, _buildingDetail2.default, _building2.default, _serviceList2.default, _serviceDetail2.default, _addService2.default, _dataVolumeList2.default, _login2.default, _signUp2.default, _userCenter2.default, _choseImage2.default, _configContainer2.default, _organize2.default,
  
    // place new routes before...
    _error2.default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next,
          render = _ref.render,
          context = _ref.context;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                if (!(component === undefined)) {
                  _context.next = 5;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 5:
                if (!(component === true)) {
                  _context.next = 7;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 7:
                return _context.abrupt('return', render((0, _jsx3.default)(_components2.default, {
                  context: context
                }, void 0, component)));
  
              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  // Child routes
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRedux = __webpack_require__(51);
  
  var _AppContainer = __webpack_require__(52);
  
  var _AppContainer2 = _interopRequireDefault(_AppContainer);
  
  var _emptyFunction = __webpack_require__(86);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Root = function (_Component) {
    (0, _inherits3.default)(Root, _Component);
  
    function Root() {
      (0, _classCallCheck3.default)(this, Root);
      return (0, _possibleConstructorReturn3.default)(this, (Root.__proto__ || (0, _getPrototypeOf2.default)(Root)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Root, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          createHref: context.createHref,
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default,
          pathname: ""
        };
      }
    }, {
      key: 'render',
      value: function render() {
        if (this.props.error) {
          return this.props.children;
        }
        var pathname = this.props.context.pathname;
        if (pathname == '/login' || pathname == '/signUp') {
          return this.props.children;
        }
  
        if (typeof localStorage != 'undefined' && !localStorage.getItem('_at')) {
          location.href = '/login';
          return;
        }
  
        var store = this.props.context.store;
        return (0, _jsx3.default)(_reactRedux.Provider, {
          store: store
        }, void 0, (0, _jsx3.default)(_AppContainer2.default, {}, void 0, this.props.children));
      }
    }]);
    return Root;
  }(_react.Component);
  
  Root.childContextTypes = {
    createHref: _react2.default.PropTypes.func.isRequired,
    insertCss: _react2.default.PropTypes.func.isRequired,
    setTitle: _react2.default.PropTypes.func.isRequired,
    setMeta: _react2.default.PropTypes.func.isRequired,
    pathname: _react2.default.PropTypes.any
  };
  exports.default = Root;

/***/ },
/* 46 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 49 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 50 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("react-redux");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(51);
  
  var _App = __webpack_require__(53);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _isSidebarOpenSelector = __webpack_require__(71);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _notificationsSelector = __webpack_require__(85);
  
  var _notificationsSelector2 = _interopRequireDefault(_notificationsSelector);
  
  var _notification = __webpack_require__(78);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var isSidebarOpenSelector = (0, _isSidebarOpenSelector2.default)();
    var notificationsSelector = (0, _notificationsSelector2.default)();
    return {
      isSidebarOpen: isSidebarOpenSelector(state),
      notifications: notificationsSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onInit: function onInit(username) {
        dispatch((0, _notification.init)(username));
      }
  
    };
  };
  
  var SidebarContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_App2.default);
  
  exports.default = SidebarContainer;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BreadcrumbContainer = __webpack_require__(54);
  
  var _BreadcrumbContainer2 = _interopRequireDefault(_BreadcrumbContainer);
  
  var _SidebarContainer = __webpack_require__(64);
  
  var _SidebarContainer2 = _interopRequireDefault(_SidebarContainer);
  
  var _HeaderContainer = __webpack_require__(73);
  
  var _HeaderContainer2 = _interopRequireDefault(_HeaderContainer);
  
  var _Notification = __webpack_require__(84);
  
  var _Notification2 = _interopRequireDefault(_Notification);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_HeaderContainer2.default, {});
  
  var _ref2 = (0, _jsx3.default)(_SidebarContainer2.default, {});
  
  var _ref3 = (0, _jsx3.default)(_BreadcrumbContainer2.default, {});
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        // const { insertCss } = this.props.context;
        // this.removeCss = insertCss(s);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // this.removeCss();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        // let username = this.context.store.getState().user_info.user_name;
        // this.props.onInit(username)
      }
    }, {
      key: 'render',
      value: function render() {
        var notification = this.props.notifications.message ? (0, _jsx3.default)(_Notification2.default, {
          show: true,
          obj: this.props.notifications
        }) : (0, _jsx3.default)(_Notification2.default, {
          show: false,
          obj: this.props.notifications
        });
        return (0, _jsx3.default)('div', {
          className: 'app ' + (this.props.isSidebarOpen ? "" : "sidebar-close")
        }, void 0, _ref, _ref2, (0, _jsx3.default)('div', {
          className: 'containerPack'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'containerInner'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'containerBody'
        }, void 0, this.props.children))), notification);
      }
    }]);
    return App;
  }(_react.Component);
  
  App.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  exports.default = App;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(51);
  
  var _Breadcrumb = __webpack_require__(55);
  
  var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
  
  var _breadcrumbSelector = __webpack_require__(62);
  
  var _breadcrumbSelector2 = _interopRequireDefault(_breadcrumbSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var isSidebarOpenSelector = (0, _breadcrumbSelector2.default)();
    return {
      breadcrumbList: isSidebarOpenSelector(state)
    };
  };
  
  var BreadcrumbContainer = (0, _reactRedux.connect)(mapStateToProps)(_Breadcrumb2.default);
  
  exports.default = BreadcrumbContainer;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Breadcrumb = __webpack_require__(60);
  
  var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Breadcrumb = function (_Component) {
    (0, _inherits3.default)(Breadcrumb, _Component);
  
    function Breadcrumb() {
      (0, _classCallCheck3.default)(this, Breadcrumb);
      return (0, _possibleConstructorReturn3.default)(this, (Breadcrumb.__proto__ || (0, _getPrototypeOf2.default)(Breadcrumb)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Breadcrumb, [{
      key: 'render',
      value: function render() {
        // console.log('breadcrumbList>>',this.props.breadcrumbList);
        var list = this.props.breadcrumbList,
            len = list.length;
        if (len <= 0) return (0, _jsx3.default)('ol', {
          className: _Breadcrumb2.default.root
        });
        if (len == 1) return (0, _jsx3.default)('li', {}, void 0, (0, _jsx3.default)('a', {
          className: _Breadcrumb2.default.selected
        }, void 0, list[0].title));
        var data = [];
        for (var i = 0; i < len - 1; i++) {
          var item = list[i];
          data.push((0, _jsx3.default)('li', {}, i, (0, _jsx3.default)(_Link2.default, {
            to: item.link
          }, void 0, i == 0 ? (0, _jsx3.default)('span', {
            className: 'icon-console',
            style: { marginRight: "5px" }
          }, void 0, ' ') : "", item.title)));
          data.push((0, _jsx3.default)('li', {
            className: _Breadcrumb2.default.split
          }, i + "1", '/'));
        }
        data.push((0, _jsx3.default)('li', {}, len - 1, (0, _jsx3.default)('a', {
          className: _Breadcrumb2.default.selected
        }, void 0, list[len - 1].title)));
        return (0, _jsx3.default)('ol', {
          className: _Breadcrumb2.default.root
        }, void 0, data);
      }
    }]);
    return Breadcrumb;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_Breadcrumb2.default)(Breadcrumb);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(57);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRedux = __webpack_require__(51);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
  
          if (_this.props.to == "javascript:void(0)" || _this.props.to == "javascript:;") return;
  
          if (_this.props.to) {
            _this.props.navigate(_this.props.to);
          } else {
            _this.props.navigate({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    } // eslint-disable-line react/prefer-stateless-function
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            to = _props.to,
            _ = _props.navigate,
            props = (0, _objectWithoutProperties3.default)(_props, ['to', 'navigate']); // eslint-disable-line no-unused-vars
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: this.context.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.contextTypes = {
    createHref: _react.PropTypes.func.isRequired
  };
  
  
  var mapState = null;
  
  var mapDispatch = {
    navigate: _route.navigate
  };
  
  exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(Link);

/***/ },
/* 57 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.redirect = redirect;
  exports.navigate = navigate;
  
  var _toggleSidebar = __webpack_require__(59);
  
  // Pseudo action. All is handled through history module
  function redirect(descriptor) {
    return function (dispatch, _, _ref) {
      var history = _ref.history;
      return history.replace(descriptor);
    };
  }
  
  function navigate(descriptor) {
    return function (dispatch, _, _ref2) {
      var history = _ref2.history;
  
      dispatch((0, _toggleSidebar.onChangeSidebarActiveAction)(descriptor));
      history.push(descriptor);
    };
  }

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toggleSidebarAction = toggleSidebarAction;
  exports.onChangeSidebarActiveAction = onChangeSidebarActiveAction;
  
  var _constants = __webpack_require__(38);
  
  function toggleSidebarAction(status) {
    return {
      type: _constants.TOGGLE_SIDEBAR,
      status: status
    };
  } // import fetch from 'isomorphic-fetch'
  function onChangeSidebarActiveAction(url) {
    return {
      type: _constants.SIDEBAR_ACTIVE,
      payload: url
    };
  }

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(61);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, ".oz8o{background-color:#fff;margin-bottom:15px;padding:10px 20px}.oz8o>li{display:inline-block;margin-right:10px}.oz8o>li>a{color:#333}.oz8o>li>a>span{color:#666;font-size:15px;font-weight:700;position:relative;top:1px}.oz8o>li>a._1EdZ,.oz8o>li>a._1EdZ:hover{color:#a7a7a7}", ""]);
  
  // exports
  exports.locals = {
  	"root": "oz8o",
  	"selected": "_1EdZ"
  };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getBreadcrumbList = function getBreadcrumbList(state) {
    return state.breadcrumbList;
  };
  
  var makeBreadcrumbSelector = function makeBreadcrumbSelector() {
    return (0, _reselect.createSelector)([getBreadcrumbList], function (breadcrumbList) {
      return breadcrumbList;
    });
  };
  
  exports.default = makeBreadcrumbSelector;

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("reselect");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(51);
  
  var _Sidebar = __webpack_require__(65);
  
  var _Sidebar2 = _interopRequireDefault(_Sidebar);
  
  var _isSidebarOpenSelector = __webpack_require__(71);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _sidebarActiveSelector = __webpack_require__(72);
  
  var _sidebarActiveSelector2 = _interopRequireDefault(_sidebarActiveSelector);
  
  var _toggleSidebar = __webpack_require__(59);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var isSidebarOpenSelector = (0, _isSidebarOpenSelector2.default)();
    var sidebarActive = (0, _sidebarActiveSelector2.default)();
    return {
      isSidebarOpen: isSidebarOpenSelector(state),
      sidebarActive: sidebarActive(state)
    };
  };
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onChangeSidebarActive: function onChangeSidebarActive(url) {
        dispatch((0, _toggleSidebar.onChangeSidebarActiveAction)(url));
      }
    };
  };
  
  var SidebarContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Sidebar2.default);
  
  exports.default = SidebarContainer;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Sidebar = __webpack_require__(67);
  
  var _Sidebar2 = _interopRequireDefault(_Sidebar);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _reactCookie = __webpack_require__(69);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _reactBootstrap = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function showIcon(className) {
    return (0, _jsx3.default)('i', {
      className: (0, _classnames2.default)(_Sidebar2.default.listFA, className)
    }, void 0, ' ');
  }
  
  var MenuListItem = function (_Component) {
    (0, _inherits3.default)(MenuListItem, _Component);
  
    function MenuListItem() {
      (0, _classCallCheck3.default)(this, MenuListItem);
      return (0, _possibleConstructorReturn3.default)(this, (MenuListItem.__proto__ || (0, _getPrototypeOf2.default)(MenuListItem)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(MenuListItem, [{
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Link2.default, {
          to: this.props.href,
          onClick: this.props.onClick
        }, void 0, this.props.icon, this.props.children, this.props.rightIcon);
      }
    }]);
    return MenuListItem;
  }(_react.Component);
  
  var MenuList = function (_Component2) {
    (0, _inherits3.default)(MenuList, _Component2);
  
    function MenuList() {
      var _ref;
  
      (0, _classCallCheck3.default)(this, MenuList);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuList.__proto__ || (0, _getPrototypeOf2.default)(MenuList)).call.apply(_ref, [this].concat(args)));
  
      _this2.state = {
        open: true
      };
      return _this2;
    }
  
    (0, _createClass3.default)(MenuList, [{
      key: 'handleClick',
      value: function handleClick() {
        this.setState({
          open: !this.state.open
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('ul', {
          className: _Sidebar2.default.list
        }, void 0, (0, _jsx3.default)('li', {}, void 0, (0, _jsx3.default)(MenuListItem, {
          href: 'javascript:void(0)',
          icon: this.props.icon,
          rightIcon: (0, _jsx3.default)('i', {
            className: (0, _classnames2.default)(_Sidebar2.default.toggler, this.state.open ? _Sidebar2.default.togglerOpen : '')
          }, void 0, ' '),
          onClick: this.handleClick.bind(this)
        }, void 0, this.props.title)), (0, _jsx3.default)('li', {}, void 0, (0, _jsx3.default)(_reactBootstrap.Collapse, {
          'in': this.state.open
        }, void 0, this.props.children)));
      }
    }]);
    return MenuList;
  }(_react.Component);
  
  var _ref2 = (0, _jsx3.default)(_reactBootstrap.Overlay, {
    placement: 'right'
  }, void 0, (0, _jsx3.default)(_reactBootstrap.Tooltip, {
    id: 'overload-right'
  }, void 0, 'Tooltip overload!'));
  
  var ThinItem = function (_Component3) {
    (0, _inherits3.default)(ThinItem, _Component3);
  
    function ThinItem(props) {
      (0, _classCallCheck3.default)(this, ThinItem);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (ThinItem.__proto__ || (0, _getPrototypeOf2.default)(ThinItem)).call(this, props));
  
      _this3.state = {
        tipShow: false
      };
      //menu-item
      return _this3;
    }
  
    (0, _createClass3.default)(ThinItem, [{
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_Link2.default, {
          to: this.props.href,
          onClick: this.props.onClick,
          className: this.props.href == "javascript:;" && this.props.open ? "menu-item menuItemAction" : 'menu-item ' + this.props.className
        }, void 0, this.props.icon), (0, _jsx3.default)('div', {
          className: 'thin-item-tip'
        }, void 0, this.props.tip), _ref2);
      }
    }]);
    return ThinItem;
  }(_react.Component);
  
  var ThinList = function (_Component4) {
    (0, _inherits3.default)(ThinList, _Component4);
  
    function ThinList(props) {
      (0, _classCallCheck3.default)(this, ThinList);
  
      var _this4 = (0, _possibleConstructorReturn3.default)(this, (ThinList.__proto__ || (0, _getPrototypeOf2.default)(ThinList)).call(this, props));
  
      _this4.state = {
        collapse: true
      };
      return _this4;
    }
  
    (0, _createClass3.default)(ThinList, [{
      key: 'handleClick',
      value: function handleClick() {
        this.props.onClick();
        this.setState({
          collapse: !this.state.collapse
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(ThinItem, {
          href: this.props.href != "javascript:;" ? this.props.href : "javascript:;",
          open: this.state.collapse,
          isOpen: this.props.isOpen,
          onClick: this.handleClick.bind(this),
          icon: this.props.icon,
          tip: this.props.title,
          className: this.props.className
        }), (0, _jsx3.default)(_reactBootstrap.Collapse, {
          'in': this.state.collapse
        }, void 0, (0, _jsx3.default)('div', {}, void 0, this.props.children)));
      }
    }]);
    return ThinList;
  }(_react.Component);
  
  var _ref3 = (0, _jsx3.default)('a', {
    href: '/'
  }, void 0, (0, _jsx3.default)('img', {
    src: '/logo.png'
  }));
  
  var _ref4 = (0, _jsx3.default)('a', {
    href: '/'
  }, void 0, (0, _jsx3.default)('img', {
    src: '/logo-small.png'
  }));
  
  var _ref5 = (0, _jsx3.default)('i', {
    className: 'icon-console'
  }, void 0, ' ');
  
  var _ref6 = (0, _jsx3.default)('i', {
    className: 'icon-sanjiaoright'
  }, void 0, ' ');
  
  var _ref7 = (0, _jsx3.default)('i', {
    className: 'icon-New-service'
  }, void 0, ' ');
  
  var _ref8 = (0, _jsx3.default)('i', {
    className: 'icon-servicelist'
  }, void 0, ' ');
  
  var _ref9 = (0, _jsx3.default)('i', {
    className: 'icon-storagemanag'
  }, void 0, ' ');
  
  var _ref10 = (0, _jsx3.default)('i', {
    className: 'icon-sanjiaoright'
  }, void 0, ' ');
  
  var _ref11 = (0, _jsx3.default)('i', {
    className: 'icon-mymirror'
  }, void 0, ' ');
  
  var _ref12 = (0, _jsx3.default)('i', {
    className: 'icon-formmirror'
  }, void 0, ' ');
  
  var _ref13 = (0, _jsx3.default)('i', {
    className: 'icon-codeconstruct'
  }, void 0, ' ');
  
  var _ref14 = (0, _jsx3.default)('i', {
    className: 'icon-login'
  }, void 0, ' ');
  
  var _ref15 = (0, _jsx3.default)('i', {
    className: 'icon-login'
  }, void 0, ' ');
  
  var Sidebar = function (_Component5) {
    (0, _inherits3.default)(Sidebar, _Component5);
  
    function Sidebar() {
      (0, _classCallCheck3.default)(this, Sidebar);
      return (0, _possibleConstructorReturn3.default)(this, (Sidebar.__proto__ || (0, _getPrototypeOf2.default)(Sidebar)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Sidebar, [{
      key: 'onChangeAction',
      value: function onChangeAction(url) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
        _reactCookie2.default.save('sidebarActive', url, { path: '/', expires: exp });
        this.props.onChangeSidebarActive(url);
      }
    }, {
      key: 'getLogo',
      value: function getLogo() {
        var open = this.props.isSidebarOpen;
        return open ? (0, _jsx3.default)('div', {
          className: _Sidebar2.default.logo
        }, void 0, _ref3) : (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_Sidebar2.default.logo, _Sidebar2.default.logoSmall)
        }, void 0, _ref4);
      }
    }, {
      key: 'getList',
      value: function getList() {
        var open = this.props.isSidebarOpen;
        var is_user = this.context.store.getState().user_info.is_user;
        return open ? (0, _jsx3.default)('div', {
          className: _Sidebar2.default.listPack
        }, void 0, (0, _jsx3.default)('div', {
          className: _Sidebar2.default.menuList
        }, void 0, (0, _jsx3.default)('ul', {
          className: (0, _classnames2.default)(_Sidebar2.default.list, "sidebar-menu-list")
        }, void 0, (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/"),
          className: this.props.sidebarActive == "/" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/',
          icon: showIcon("icon-console")
        }, void 0, '\u63A7\u5236\u53F0'))), (0, _jsx3.default)(MenuList, {
          title: '\u670D\u52A1\u4E2D\u5FC3',
          icon: showIcon("icon-servicecenter")
        }, void 0, (0, _jsx3.default)('ul', {
          className: _Sidebar2.default.subList
        }, void 0, (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/choseImage"),
          className: this.props.sidebarActive == "/choseImage" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/choseImage',
          icon: showIcon("icon-New-service")
        }, void 0, '\u65B0\u5EFA\u670D\u52A1')), (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/serviceList"),
          className: this.props.sidebarActive == "/serviceList" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/serviceList',
          icon: showIcon("icon-servicelist")
        }, void 0, '\u670D\u52A1\u5217\u8868')), (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/volumes"),
          className: this.props.sidebarActive == "/volumes" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/volumes',
          icon: showIcon("icon-storagemanag")
        }, void 0, '\u5B58\u50A8\u5377\u7BA1\u7406')))), (0, _jsx3.default)(MenuList, {
          title: '\u955C\u50CF\u4E2D\u5FC3',
          icon: showIcon("icon-mirrorceer")
        }, void 0, (0, _jsx3.default)('ul', {
          className: _Sidebar2.default.subList
        }, void 0, (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/createImage"),
          className: this.props.sidebarActive == "/createImage" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/createImage',
          icon: showIcon("icon-mirrorhouse")
        }, void 0, '\u65B0\u5EFA\u955C\u50CF')), (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/imageForMy"),
          className: this.props.sidebarActive == "/imageForMy" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/imageForMy',
          icon: showIcon("icon-mymirror")
        }, void 0, '\u6211\u7684\u955C\u50CF')), (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/imageForPlatform"),
          className: this.props.sidebarActive == "/imageForPlatform" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/imageForPlatform',
          icon: showIcon("icon-formmirror")
        }, void 0, '\u5E73\u53F0\u955C\u50CF')), (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/building"),
          className: this.props.sidebarActive == "/building" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/building',
          icon: showIcon("icon-codeconstruct")
        }, void 0, '\u4EE3\u7801\u6784\u5EFA')))), is_user == 1 ? (0, _jsx3.default)('ul', {
          className: (0, _classnames2.default)(_Sidebar2.default.list, "sidebar-menu-list")
        }, void 0, (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/user"),
          className: this.props.sidebarActive == "/user" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/user',
          icon: showIcon("icon-login")
        }, void 0, '\u7528\u6237\u4E2D\u5FC3'))) : (0, _jsx3.default)('ul', {
          className: (0, _classnames2.default)(_Sidebar2.default.list, "sidebar-menu-list")
        }, void 0, (0, _jsx3.default)('li', {
          onClick: this.onChangeAction.bind(this, "/organize"),
          className: this.props.sidebarActive == "/organize" ? "subListAction" : ""
        }, void 0, (0, _jsx3.default)(MenuListItem, {
          href: '/organize',
          icon: showIcon("icon-login")
        }, void 0, '\u7EC4\u7EC7\u4E2D\u5FC3'))))) : (0, _jsx3.default)('div', {
          className: 'sidebar-menu-thin'
        }, void 0, (0, _jsx3.default)(ThinList, {
          href: '/',
          title: '\u63A7\u5236\u53F0',
          isOpen: false,
          icon: _ref5,
          onClick: this.onChangeAction.bind(this, "/"),
          className: this.props.sidebarActive == "/" ? "menuListAction" : ""
        }, void 0), (0, _jsx3.default)(ThinList, {
          href: 'javascript:;',
          title: '\u670D\u52A1\u4E2D\u5FC3',
          isOpen: true,
          icon: _ref6,
          onClick: function onClick() {},
          className: ''
        }, void 0, (0, _jsx3.default)(ThinItem, {
          href: '/choseImage',
          icon: _ref7,
          tip: '\u65B0\u5EFA\u670D\u52A1',
          onClick: this.onChangeAction.bind(this, "/choseImage"),
          className: this.props.sidebarActive == "/choseImage" ? "menuListAction" : ""
        }), (0, _jsx3.default)(ThinItem, {
          href: '/serviceList',
          icon: _ref8,
          tip: '\u670D\u52A1\u5217\u8868',
          onClick: this.onChangeAction.bind(this, "/serviceList"),
          className: this.props.sidebarActive == "/serviceList" ? "menuListAction" : ""
        }), (0, _jsx3.default)(ThinItem, {
          href: '/volumes',
          icon: _ref9,
          tip: '\u5B58\u50A8\u5377\u7BA1\u7406',
          onClick: this.onChangeAction.bind(this, "/volumes"),
          className: this.props.sidebarActive == "/volumes" ? "menuListAction" : ""
        })), (0, _jsx3.default)(ThinList, {
          href: 'javascript:;',
          title: '\u955C\u50CF\u4E2D\u5FC3',
          isOpen: true,
          icon: _ref10,
          onClick: function onClick() {},
          className: ''
        }, void 0, (0, _jsx3.default)(ThinItem, {
          href: '/imageForMy',
          icon: _ref11,
          tip: '\u6211\u7684\u955C\u50CF',
          onClick: this.onChangeAction.bind(this, "/imageForMy"),
          className: this.props.sidebarActive == "/imageForMy" ? "menuListAction" : ""
        }), (0, _jsx3.default)(ThinItem, {
          href: '/imageForPlatform',
          icon: _ref12,
          tip: '\u5E73\u53F0\u955C\u50CF',
          onClick: this.onChangeAction.bind(this, "/imageForPlatform"),
          className: this.props.sidebarActive == "/imageForPlatform" ? "menuListAction" : ""
        }), (0, _jsx3.default)(ThinItem, {
          href: '/building',
          icon: _ref13,
          tip: '\u6784\u5EFA\u955C\u50CF',
          onClick: this.onChangeAction.bind(this, "/building"),
          className: this.props.sidebarActive == "/building" ? "menuListAction" : ""
        })), is_user == 1 ? (0, _jsx3.default)(ThinList, {
          href: '/user',
          isOpen: false,
          title: '\u7528\u6237\u4E2D\u5FC3',
          icon: _ref14,
          onClick: this.onChangeAction.bind(this, "/user"),
          className: this.props.sidebarActive == "/user" ? "menuListAction" : ""
        }, void 0) : (0, _jsx3.default)(ThinList, {
          href: '/organize',
          isOpen: false,
          title: '\u7EC4\u7EC7\u4E2D\u5FC3',
          icon: _ref15,
          onClick: this.onChangeAction.bind(this, "/organize"),
          className: this.props.sidebarActive == "/organize" ? "menuListAction" : ""
        }, void 0));
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_Sidebar2.default.root, "app-sidebar")
        }, void 0, this.getLogo(), this.getList());
      }
    }]);
    return Sidebar;
  }(_react.Component);
  
  // <li><a href="/">新建服务</a></li>
  // <li><a href="/serviceList">服务列表</a></li>
  //   <li><a href="/">存储卷管理</a></li>
  
  Sidebar.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  exports.default = (0, _withStyles2.default)(_Sidebar2.default)(Sidebar);

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(68);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "._2SEP{position:fixed;z-index:1;top:0;width:180px;background-color:#21314b}._2SEP,._3C3h{left:0;bottom:0}._3C3h{position:absolute;top:60px;right:0;overflow:auto}.Aika{margin-top:50px;margin-left:15px}._3IYu{float:right;padding:2px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:rotate(0deg);transform:rotate(0deg);display:block;width:14px;height:14px;background-color:#444e5b;margin-top:2px}._3IYu:before{width:2px;height:10px;left:6px}._3IYu:after,._3IYu:before{content:\" \";background-color:#fff;position:absolute}._3IYu:after{width:10px;height:2px;top:6px}._203M:before{display:none}._3AAl li a:hover ._3IYu:after,._3AAl li a:hover ._3IYu:before{background-color:#1ba4c6}._3AAl{margin-bottom:15px;border-top-left-radius:.4em;border-bottom-left-radius:.4em;background-color:#363f4e}._3AAl li a{display:block;padding:15px 15px 15px 50px;-webkit-transition:color .2s ease;transition:color .2s ease}._3AAl li a,._3AAl li a:active,._3AAl li a:visited{color:#fff;font-size:16px}._3AAl li a:hover{color:#09c8f4}._3AAl li:nth-child(2){font-size:0}.eCyD{float:left;width:20px;height:20px;font-size:1.4em;margin-left:-30px;color:#999;-webkit-transition:color .2s ease;transition:color .2s ease}._3AAl li a:hover .eCyD{color:#1ba4c6}._3shQ>li>a{padding-top:8px;padding-bottom:8px}._3shQ>li>a,._3shQ>li>a:active,._3shQ>li>a:visited{color:#afafaf;font-size:14px}._3shQ>li>a:hover{color:#09c8f4}._2cKZ{max-height:60px;min-height:60px;background-color:#fff;padding:16px 30px}._2cKZ>a{display:block}._2cKZ>a>img{width:100%}._1za2{padding:17px 13px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2SEP",
  	"listPack": "_3C3h",
  	"menuList": "Aika",
  	"toggler": "_3IYu",
  	"togglerOpen": "_203M",
  	"list": "_3AAl",
  	"listFA": "eCyD",
  	"subList": "_3shQ",
  	"logo": "_2cKZ",
  	"logoSmall": "_1za2"
  };

/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("react-cookie");

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap");

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getIsSidebarOpen = function getIsSidebarOpen(state) {
    return state.isSidebarOpen;
  };
  
  var makeIsSidebarOpenSelector = function makeIsSidebarOpenSelector() {
    return (0, _reselect.createSelector)([getIsSidebarOpen], function (isSidebarOpenFilter) {
      return isSidebarOpenFilter;
    });
  };
  
  exports.default = makeIsSidebarOpenSelector;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getSidebarActive = function getSidebarActive(state) {
    return state.sidebarActive;
  };
  
  var makeSidebarActiveSelector = function makeSidebarActiveSelector() {
    return (0, _reselect.createSelector)([getSidebarActive], function (sidebarActive) {
      return sidebarActive;
    });
  };
  
  exports.default = makeSidebarActiveSelector;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(51);
  
  var _toggleSidebar = __webpack_require__(59);
  
  var _Header = __webpack_require__(74);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _organize = __webpack_require__(76);
  
  var funOrganize = _interopRequireWildcard(_organize);
  
  var _isSidebarOpenSelector = __webpack_require__(71);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _isLoadingSelector = __webpack_require__(82);
  
  var _isLoadingSelector2 = _interopRequireDefault(_isLoadingSelector);
  
  var _organizeListSelector = __webpack_require__(83);
  
  var _organizeListSelector2 = _interopRequireDefault(_organizeListSelector);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var isSidebarOpenSelector = (0, _isSidebarOpenSelector2.default)();
    var isLoadingSelector = (0, _isLoadingSelector2.default)();
    var getOrganizeList = (0, _organizeListSelector2.default)();
    return {
      isSidebarOpen: isSidebarOpenSelector(state),
      isLoading: isLoadingSelector(state),
      organizeList: getOrganizeList(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onSidebarToggleClick: function onSidebarToggleClick(flag) {
        dispatch((0, _toggleSidebar.toggleSidebarAction)(flag));
      },
      getOrganizeList: function getOrganizeList() {
        dispatch(funOrganize.fetchGetOrganizeListAction());
      },
      changeAccount: function changeAccount(id) {
        dispatch(funOrganize.fetchChangeAccountAction(id));
      }
    };
  };
  
  var SidebarContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Header2.default);
  
  exports.default = SidebarContainer;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactLoading = __webpack_require__(75);
  
  var _reactLoading2 = _interopRequireDefault(_reactLoading);
  
  var _reactCookie = __webpack_require__(69);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _reactBootstrap = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('p', {}, void 0, '\u5207\u6362\u5230\u4E2A\u4EBA');
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '\u5207\u6362\u5230\u8BE5\u7EC4\u7EC7');
  
  var _ref3 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: 4.1
  }, void 0, '\u9000\u51FA');
  
  var _ref4 = (0, _jsx3.default)(_reactBootstrap.NavDropdown, {
    eventKey: 4.1,
    title: '\u9000\u51FA',
    id: 'header-nav-item-userinfo'
  }, void 0, ' ');
  
  var _ref5 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: 4.1
  }, void 0, '\u9000\u51FA');
  
  var _ref6 = (0, _jsx3.default)(_reactBootstrap.NavDropdown, {
    eventKey: 4.1,
    title: '\u9000\u51FA',
    id: 'header-nav-item-userinfo'
  }, void 0, ' ');
  
  var _ref7 = (0, _jsx3.default)(_reactLoading2.default, {
    type: 'bubbles',
    color: '#fff',
    height: '50px',
    width: '50px'
  });
  
  var _ref8 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: 2
  }, void 0, '\u521B\u5EFA\u7EC4\u7BA1\u7406');
  
  var _ref9 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: 3
  }, void 0, '\u7528\u6237\u4E2D\u5FC3');
  
  var _ref10 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: 4.1
  }, void 0, '\u9000\u51FA');
  
  var _ref11 = (0, _jsx3.default)(_reactBootstrap.NavDropdown, {
    eventKey: 4.1,
    title: '\u9000\u51FA',
    id: 'header-nav-item-userinfo'
  }, void 0);
  
  var _ref12 = (0, _jsx3.default)(_reactLoading2.default, {
    type: 'bubbles',
    color: '#fff',
    height: '50px',
    width: '50px'
  });
  
  var Header = function (_Component) {
    (0, _inherits3.default)(Header, _Component);
  
    function Header() {
      (0, _classCallCheck3.default)(this, Header);
      return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Header, [{
      key: 'handleSelect1',
      value: function handleSelect1(key) {
        console.log(key);
        switch (key) {
          case 1:
            this.props.onSidebarToggleClick(!this.props.isSidebarOpen);
            var exp = new Date();
            exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
            _reactCookie2.default.save('isSidebarOpen', !this.props.isSidebarOpen, { path: '/', expires: exp });
            break;
          case 3:
            break;
          case 4.1:
            _reactCookie2.default.remove('_at');
            localStorage.removeItem('_at');
            localStorage.removeItem('sidebarActive');
            location.href = '/login';
            break;
        }
      }
    }, {
      key: 'handleSelect',
      value: function handleSelect(key) {
        console.log(key);
        switch (key) {
          case 0.1:
            var orga_uuid = this.context.store.getState().user_info.orga_uuid;
            this.props.changeAccount(orga_uuid);
            break;
          case 1.1:
            this.props.onSidebarToggleClick(!this.props.isSidebarOpen);
            var exp = new Date();
            exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
            _reactCookie2.default.save('isSidebarOpen', !this.props.isSidebarOpen, { path: '/', expires: exp });
            break;
          case 4.1:
            _reactCookie2.default.remove('_at');
            localStorage.removeItem('_at');
            localStorage.removeItem('sidebarActive');
            location.href = '/login';
            break;
          default:
            var organizeList = this.props.organizeList;
            var org_id = organizeList[key].org_id;
            this.props.changeAccount(org_id);
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.getOrganizeList();
      }
    }, {
      key: 'render',
      value: function render() {
        var username = this.context.store.getState().user_info.user_name;
        var is_user = this.context.store.getState().user_info.is_user;
        var user_orga = this.context.store.getState().user_info.user_orga;
        var menuItem = this.props.organizeList.map(function (item, i) {
          if (item.orga_name == username && is_user == 0) {
            return (0, _jsx3.default)(_reactBootstrap.MenuItem, {
              eventKey: i
            }, i, (0, _jsx3.default)('div', {
              className: 'headerOrgList'
            }, void 0, (0, _jsx3.default)('p', {}, void 0, item.orga_name), _ref));
          } else if (item.orga_name == user_orga) {} else {
            return (0, _jsx3.default)(_reactBootstrap.MenuItem, {
              eventKey: i
            }, i, (0, _jsx3.default)('div', {
              className: 'headerOrgList'
            }, void 0, (0, _jsx3.default)('p', {}, void 0, item.orga_name), _ref2));
          }
        });
        var dropdown = null;
        if (is_user == 0) {
          dropdown = user_orga ? (0, _jsx3.default)(_reactBootstrap.NavDropdown, {
            eventKey: 4,
            title: user_orga,
            id: 'header-nav-item-userinfo'
          }, void 0, menuItem, _ref3) : _ref4;
        } else {
          dropdown = username ? (0, _jsx3.default)(_reactBootstrap.NavDropdown, {
            eventKey: 4,
            title: username,
            id: 'header-nav-item-userinfo'
          }, void 0, menuItem, _ref5) : _ref6;
        }
        return (0, _jsx3.default)(_reactBootstrap.Navbar, {
          fixedTop: true,
          className: 'app-navbar',
          style: { left: "180px" }
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Nav, {
          onSelect: this.handleSelect.bind(this)
        }, void 0, (0, _jsx3.default)(_reactBootstrap.NavItem, {
          eventKey: 1.1,
          href: 'javascript:void(0)'
        }, void 0, (0, _jsx3.default)('i', {
          className: this.props.isSidebarOpen ? "icon-withdraw" : "icon-back",
          'aria-hidden': 'true'
        }))), (0, _jsx3.default)(_reactBootstrap.Nav, {
          pullRight: true,
          onSelect: this.handleSelect.bind(this),
          style: { marginRight: "0" }
        }, void 0, (0, _jsx3.default)(_reactBootstrap.NavItem, {
          className: 'loading-animation'
        }, void 0, this.props.isLoading ? _ref7 : null), dropdown));
      }
    }, {
      key: 'render1',
      value: function render1() {
        var username = this.context.store.getState().user_info.user_name;
        var dropdown = username ? (0, _jsx3.default)(_reactBootstrap.NavDropdown, {
          eventKey: 4,
          title: username,
          id: 'header-nav-item-userinfo'
        }, void 0, _ref8, _ref9, _ref10) : _ref11;
        return (0, _jsx3.default)(_reactBootstrap.Navbar, {
          fixedTop: true,
          className: 'app-navbar',
          style: { left: "180px" }
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Nav, {
          onSelect: this.handleSelect.bind(this)
        }, void 0, (0, _jsx3.default)(_reactBootstrap.NavItem, {
          eventKey: 1,
          href: 'javascript:void(0)'
        }, void 0, (0, _jsx3.default)('i', {
          className: this.props.isSidebarOpen ? "icon-withdraw" : "icon-back",
          'aria-hidden': 'true'
        }))), (0, _jsx3.default)(_reactBootstrap.Nav, {
          pullRight: true,
          onSelect: this.handleSelect.bind(this),
          style: { marginRight: "0" }
        }, void 0, (0, _jsx3.default)(_reactBootstrap.NavItem, {
          className: 'loading-animation'
        }, void 0, this.props.isLoading ? _ref12 : null), dropdown));
      }
    }]);
    return Header;
  }(_react.Component);
  
  Header.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  exports.default = Header;
  // export default withStyles(s)(Header);

/***/ },
/* 75 */
/***/ function(module, exports) {

  module.exports = require("react-loading");

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchCreateOrganize = fetchCreateOrganize;
  exports.fetchGetOrganizeListAction = fetchGetOrganizeListAction;
  exports.fetchLeaveOrganize = fetchLeaveOrganize;
  exports.fetchDeleteOrganize = fetchDeleteOrganize;
  exports.fetchGetOrganizeDetailAction = fetchGetOrganizeDetailAction;
  exports.fetchSetOrganizeDetailAction = fetchSetOrganizeDetailAction;
  exports.fetchGetOrganizeUserListAction = fetchGetOrganizeUserListAction;
  exports.fetchChangeAccountAction = fetchChangeAccountAction;
  exports.fetchGetUserListAction = fetchGetUserListAction;
  exports.fetchInviteUser = fetchInviteUser;
  exports.fetchChangeUserRoleAction = fetchChangeUserRoleAction;
  exports.fetchChangeOrganizeOwnerAction = fetchChangeOrganizeOwnerAction;
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(78);
  
  var _reactCookie = __webpack_require__(69);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function fetchCreateOrganize(org_name) {
    var body = (0, _stringify2.default)({ orga_name: org_name });
    var myInit = {
      method: "POST",
      headers: { token: localStorage.getItem("_at") },
      body: body
    };
    var url = Const.FETCH_URL.ORGANIZE;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "新建组织返回值");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "创建成功", level: "success" }));
          dispatch(fetchGetOrganizeListAction());
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "创建失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function receiveOrganizeList(data) {
    return {
      type: Const.GET_ORGANIZE_LIST,
      payload: data
  
    };
  }
  
  function fetchGetOrganizeListAction() {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.ORGANIZE;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "组织列表");
        if (json.status == 0) {
          dispatch(receiveOrganizeList(json.result));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "获取组织列表失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function fetchLeaveOrganize(data) {
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + data.orgId;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          switch (data.keyList) {
            case "orgList":
              dispatch((0, _notification.receiveNotification)({ message: "退出成功", level: "success" }));
              dispatch(fetchGetOrganizeListAction());
              setTimeout(function () {
                dispatch((0, _notification.clearNotification)());
              }, 3000);
              break;
            case "userList":
              dispatch((0, _notification.receiveNotification)({ message: "退出成功,请重新登录", level: "success" }));
              setTimeout(function () {
                dispatch((0, _notification.clearNotification)());
                window.location.href = "/login";
              }, 3000);
              break;
  
          }
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "退出失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function fetchDeleteOrganize(data) {
    var myInit = {
      method: "DELETE",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + data.orgId;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "解散成功", level: "success" }));
          switch (data.keyList) {
            case "orgList":
              dispatch(fetchGetOrganizeListAction());
              break;
            case "userList":
              dispatch((0, _notification.receiveNotification)({ message: "解散成功,请重新登录", level: "success" }));
              setTimeout(function () {
                dispatch((0, _notification.clearNotification)());
                window.location.href = "/login";
              }, 3000);
              break;
  
          }
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "解散失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function receiveOrganizeDetail(data) {
    return {
      type: Const.GET_ORGANIZE_DETAIL,
      payload: data
    };
  }
  
  function fetchGetOrganizeDetailAction(id) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + id;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          dispatch(receiveOrganizeDetail(json.result));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "获取组织详情失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function fetchSetOrganizeDetailAction(data) {
    var body = (0, _stringify2.default)({
      org_name: data.org_name,
      orga_detail: data.orga_detail,
      is_public: data.is_public
    });
    console.log(body, "修改组织参数");
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: body
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + data.orga_id;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "修改组织返回值");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "修改成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "修改失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function receiveOrganizeUserList(data) {
    return {
      type: Const.GET_ORGANIZE_USER_LIST,
      payload: data
    };
  }
  function fetchGetOrganizeUserListAction(id) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + id + "/users";
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "组织用户列表");
        if (json.status == 0) {
          dispatch(receiveOrganizeUserList(json.result));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "获取组织用户列表失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function fetchChangeAccountAction(id) {
    var body = (0, _stringify2.default)({
      orga_uuid: id
    });
    console.log(body);
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: body
    };
    var url = Const.FETCH_URL.TOKEN;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "切换组织");
        if (json.status == 0) {
          var exp = new Date();
          exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
          _reactCookie2.default.save('_at', json.result.token, { path: '/', expires: exp });
          localStorage.setItem("_at", json.result.token);
          location.href = '/';
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "切换失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function receiveUserList(data) {
    return {
      type: Const.GET_USER_LIST,
      payload: data
    };
  }
  
  function fetchGetUserListAction(name) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.USER + "/users/list/" + name;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "用户列表");
        if (json.status == 0) {
          dispatch(receiveUserList(json.result));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "获取用户列表失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function fetchInviteUser(data) {
    var body = (0, _stringify2.default)({
      user_uuid: data.user_id
    });
    console.log(data);
    var myInit = {
      method: "POST",
      headers: { token: localStorage.getItem("_at") },
      body: body
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + data.orga_id + "/users";
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "邀请用户");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "邀请成功", level: "success" }));
          dispatch(fetchGetOrganizeUserListAction(data.orga_id));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "邀请失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function fetchChangeUserRoleAction(data) {
    console.log(data, "设置用户权限参数");
    var body = (0, _stringify2.default)({
      role_uuid: data.role_uuid
    });
    var myInit = {
      method: data.method,
      headers: { token: localStorage.getItem("_at") },
      body: body
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + data.orga_uuid + "/users/" + data.user_uuid;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "设置用户权限");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "设置成功", level: "success" }));
          dispatch(fetchGetOrganizeUserListAction(data.orga_uuid));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "操作失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }
  
  function fetchChangeOrganizeOwnerAction(data) {
    var myInit = {
      method: 'PUT',
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.ORGANIZE + "/" + data.orga_uuid + "/owner/" + data.user_uuid;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "委托组织创建者");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "设置成功请重新登录", level: "success" }));
          dispatch(fetchGetOrganizeUserListAction(data.orga_uuid));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
            window.location.href = "/login";
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "操作失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-fetch");

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.emit = exports.init = exports.clearNotification = exports.receiveNotification = undefined;
  
  var _constants = __webpack_require__(38);
  
  var _serviceDetail = __webpack_require__(79);
  
  var _socket = __webpack_require__(81);
  
  var _socket2 = _interopRequireDefault(_socket);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var receiveNotification = exports.receiveNotification = function receiveNotification(data) {
    return {
      type: _constants.RECEIVE_NOTIFICATION,
      payload: data
    };
  };
  
  var clearNotification = exports.clearNotification = function clearNotification() {
    return {
      type: _constants.CLEAR_NOTIFICATION
    };
  };
  
  var init = exports.init = function init(username) {
    var socket = _socket2.default.connect(_constants.WS_URL);
  
    socket.emit('init', { namespace: username });
  
    return function (dispatch) {
  
      socket.on('notification', function (message) {
        console.log(message, "oooooo");
        dispatch(receiveNotification(message));
        switch (message.type) {
          case "service":
            dispatch((0, _serviceDetail.fetchServiceDetailAction)(message.service_name));
            break;
          default:
            break;
        }
  
        setTimeout(function () {
          dispatch(clearNotification());
        }, 5000);
      });
    };
  };
  
  var emit = exports.emit = function emit(type, payload) {
    var socket = _socket2.default.connect(_constants.WS_URL);
    return function (dispatch) {
      socket.emit(type, payload);
    };
  };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.clearServiceDetail = clearServiceDetail;
  exports.fetchServiceDetailAction = fetchServiceDetailAction;
  exports.addPortAction = addPortAction;
  exports.delPortAction = delPortAction;
  exports.addSaveAction = addSaveAction;
  exports.delSaveAction = delSaveAction;
  exports.delEnvAction = delEnvAction;
  exports.addEnvAction = addEnvAction;
  exports.savePortAction = savePortAction;
  exports.saveStorageAction = saveStorageAction;
  exports.saveEnvAction = saveEnvAction;
  exports.saveCommandAction = saveCommandAction;
  exports.savePodsAction = savePodsAction;
  exports.fetchSavePortAction = fetchSavePortAction;
  exports.fetchSaveVolumeAction = fetchSaveVolumeAction;
  exports.fetchSaveEnvironmentAction = fetchSaveEnvironmentAction;
  exports.fetchSaveContainerDeployAction = fetchSaveContainerDeployAction;
  exports.onSavePodsAction = onSavePodsAction;
  exports.receivePodList = receivePodList;
  exports.fetchOnPodListLoadAction = fetchOnPodListLoadAction;
  exports.isAutoStateUp = isAutoStateUp;
  exports.fetchAutoStateUp = fetchAutoStateUp;
  exports.fetchGetMonitorDataAction = fetchGetMonitorDataAction;
  exports.fetchChangeReleaseAction = fetchChangeReleaseAction;
  exports.fetchSaveCommand = fetchSaveCommand;
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(80);
  
  var _notification = __webpack_require__(78);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveServiceDetail(data) {
    return {
      type: _constants.GET_SERVICE_DETAIL,
      payload: data
    };
  }
  
  function clearServiceDetail() {
    return {
      type: _constants.CLEAR_SERVICE_DETAIL,
      payload: {}
    };
  }
  
  function fetchServiceDetailAction(serviceName) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    },
        url = '' + _constants.API_SERVICE_URL + "/" + serviceName + "/details";
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>>servicerDetail");
        if (json.status == 0) {
          (function () {
            var containerDeploy = 0;
            var data = json.result[0];
            _constants.CPU.map(function (item, i) {
              if (item.x == data.limits_cpu) {
                containerDeploy = i;
              }
            });
            data.containerDeploy = containerDeploy;
            if (data.env.length == 0) {
              data.env.push({});
            }
            data.env.map(function (item, i) {
              item.at = new Date().getTime() + i;
            });
            data.container.map(function (item, i) {
              item.at = new Date().getTime() + i;
            });
            if (data.volume.length == 0) {
              data.volume.push({});
            }
            data.volume.map(function (item, i) {
              item.at = new Date().getTime() + i;
            });
            dispatch(receiveServiceDetail(data));
          })();
        } else {
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("serviceDetail is error", e);
      });
    };
  }
  
  function addPortAction() {
    return {
      type: _constants.ADD_PORT
    };
  }
  function delPortAction(item) {
    return {
      type: _constants.DEL_PORT,
      payload: item
    };
  }
  function addSaveAction() {
    return {
      type: _constants.ADD_SAVE
    };
  }
  function delSaveAction(item) {
    return {
      type: _constants.DEL_SAVE,
      payload: item
    };
  }
  function delEnvAction(item) {
    return {
      type: _constants.DEL_ENV,
      payload: item
    };
  }
  
  function addEnvAction() {
    return {
      type: _constants.ADD_ENV
    };
  }
  function savePortAction(flag) {
    return {
      type: Const.IS_BTN_STATE.port,
      payload: flag
    };
  }
  function saveStorageAction(flag) {
    return {
      type: Const.IS_BTN_STATE.storage,
      payload: flag
    };
  }
  function saveEnvAction(flag) {
    return {
      type: Const.IS_BTN_STATE.env,
      payload: flag
    };
  }
  function saveCommandAction(flag) {
    return {
      type: Const.IS_BTN_STATE.command,
      payload: flag
    };
  }
  function savePodsAction(flag) {
    return {
      type: Const.IS_BTN_STATE.pods,
      payload: flag
    };
  }
  
  function fetchSavePortAction(data) {
    var json = (0, _stringify2.default)({ container: data.container });
    console.log(json);
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: json
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(savePortAction(false));
      return (0, _isomorphicFetch2.default)(_constants.API_SERVICE_URL + '/' + data.serviceName + '/container', myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>>更新端口");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchServiceDetailAction(data.serviceName));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(savePortAction(true));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(savePortAction(true));
        console.error("SavePort is error", e);
      });
    };
  }
  
  function fetchSaveVolumeAction(data) {
    var json = (0, _stringify2.default)({ volume: data.volume });
    console.log(json);
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: json
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(saveStorageAction(false));
      return (0, _isomorphicFetch2.default)(_constants.API_SERVICE_URL + '/' + data.serviceName + '/volume', myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>>更新端口");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchServiceDetailAction(data.serviceName));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(saveStorageAction(true));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(saveStorageAction(true));
        console.error("SaveVolume is error", e);
      });
    };
  }
  
  function fetchSaveEnvironmentAction(data) {
    if (data.env[0].env_key == "") {
      data.env = "";
    }
    var json = (0, _stringify2.default)({ env: data.env });
    console.log(json);
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: json
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(saveEnvAction(false));
      return (0, _isomorphicFetch2.default)(_constants.API_SERVICE_URL + '/' + data.serviceName + '/env', myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, " >>>>>>>更新环境变量");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchServiceDetailAction(data.serviceName));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(saveEnvAction(true));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(saveEnvAction(true));
        console.error("serviceDetail is error", e);
      });
    };
  }
  
  function fetchSaveContainerDeployAction(data) {
    console.log(data);
    var container_cpu = _constants.CPU[data.containerDeploy].x,
        container_memory = _constants.CPU[data.containerDeploy].m;
    var json = (0, _stringify2.default)({
      container_cpu: container_cpu,
      container_memory: container_memory
    });
    console.log(json);
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: json
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.API_SERVICE_URL + '/' + data.serviceName + '/cm', myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, " >>>>>>>更新容器配置");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchServiceDetailAction(data.serviceName));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("serviceDetail is error", e);
      });
    };
  }
  
  function onSavePodsAction(data) {
    var json = (0, _stringify2.default)({ pods_num: data.n });
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: json
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(savePodsAction(false));
      return (0, _isomorphicFetch2.default)(_constants.API_SERVICE_URL + '/' + data.serviceName + '/telescopic', myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>>更新容器个数");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchServiceDetailAction(data.serviceName));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(savePodsAction(true));
      }).catch(function (e) {
        dispatch(savePodsAction(true));
        dispatch((0, _header.isLoadingAction)(false));
        console.error("pods_num is error", e);
      });
    };
  }
  
  function receivePodList(data) {
    return {
      type: _constants.GET_POD_LIST,
      payload: data
    };
  }
  
  function fetchOnPodListLoadAction(name) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    },
        url = '' + _constants.API_SERVICE_URL + "/" + name + "/pod/message";
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>>pod");
        if (json.status == 0) {
          dispatch(receivePodList(json.result));
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("pod is error", e);
      });
    };
  }
  
  function isAutoStateUp(flag) {
    return {
      type: Const.IS_BTN_STATE.autoStateUp,
      payload: flag
    };
  }
  
  function fetchAutoStateUp(data) {
    var obj = { auto_startup: data.auto_startup };
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: (0, _stringify2.default)(obj)
    },
        url = '' + _constants.API_SERVICE_URL + "/" + data.serviceName + "/autostartup";
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isAutoStateUp(false));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>>autostartup");
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isAutoStateUp(true));
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchServiceDetailAction(data.serviceName));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("pod is error", e);
      });
    };
  }
  
  function receiveMonitorData(data, flag) {
    return {
      type: Const.GET_MONITOR_DATA,
      payload: data,
      flag: flag
    };
  }
  function fetchGetMonitorDataAction(data) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.GET_SERVICE_MONITOR + "/" + data.userName + "/pods/" + data.pod_name + "/metrics/" + data.type + "?time_long=" + data.time_long; //+"&time_span="+data.time_span;
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        dispatch((0, _header.isLoadingAction)(false));
        if (json.status == 0) {
          dispatch(receiveMonitorData(json.result, data.type));
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("monitor is error", e);
      });
    };
  }
  
  function isChange(flag) {
    return {
      type: Const.IS_BTN_STATE.deploy,
      payload: flag
    };
  }
  
  function fetchChangeReleaseAction(data) {
    var obj = (0, _stringify2.default)({
      image_name: data.image_name,
      image_version: data.image_version,
      policy: data.policy
    });
    console.log(obj, "publish 参数");
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: obj
    };
    var url = Const.API_SERVICE_URL + "/" + data.serviceName + "/publish";
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isChange(false));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isChange(true));
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isChange(true));
        console.error("publish is error", e);
      });
    };
  }
  function fetchSaveCommand(data) {
    var obj = (0, _stringify2.default)({
      command: data.command
    });
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: obj
    };
    var url = Const.API_SERVICE_URL + "/" + data.serviceName + "/command";
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(saveCommandAction(false));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(saveCommandAction(true));
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "更新成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "更新失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(saveCommandAction(true));
        console.error("publish is error", e);
      });
    };
  }

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isLoadingAction = isLoadingAction;
  
  var _constants = __webpack_require__(38);
  
  var _route = __webpack_require__(58);
  
  function isLoadingAction(flag) {
    return {
      type: _constants.IS_LOADING,
      payload: flag
    };
  }

/***/ },
/* 81 */
/***/ function(module, exports) {

  module.exports = require("socket.io-client");

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getIsLoading = function getIsLoading(state) {
    return state.isLoading;
  };
  
  var makeIsLoadingSelector = function makeIsLoadingSelector() {
    return (0, _reselect.createSelector)([getIsLoading], function (isLoading) {
      return isLoading;
    });
  };
  
  exports.default = makeIsLoadingSelector;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getOrganizeList = function getOrganizeList(state) {
    return state.organizeList;
  };
  
  var makeGetOrganizeListSelector = function makeGetOrganizeListSelector() {
    return (0, _reselect.createSelector)([getOrganizeList], function (organizeList) {
      return organizeList;
    });
  };
  
  exports.default = makeGetOrganizeListSelector;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _class = function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
      return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(_class, [{
      key: 'render',
      value: function render() {
        var text = this.props.obj.message;
        return (0, _jsx3.default)(_reactBootstrap.Alert, {
          bsStyle: this.props.obj.level || "success",
          className: !this.props.show ? "notification" : "notification notificationShow"
        }, void 0, text);
      }
    }]);
    return _class;
  }(_react2.default.Component);
  
  exports.default = _class;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //logs
  var getLogs = function getLogs(state) {
    return state.notifications;
  };
  
  var makeGetNotificationsSelector = function makeGetNotificationsSelector() {
    return (0, _reselect.createSelector)([getLogs], function (notifications) {
      return notifications;
    });
  };
  
  exports.default = makeGetNotificationsSelector;

/***/ },
/* 86 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _DashboardContainer = __webpack_require__(88);
  
  var _DashboardContainer2 = _interopRequireDefault(_DashboardContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_DashboardContainer2.default, {});
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _Dashboard = __webpack_require__(89);
  
  var _Dashboard2 = _interopRequireDefault(_Dashboard);
  
  var _reactRedux = __webpack_require__(51);
  
  var _breadcumb = __webpack_require__(93);
  
  var _services = __webpack_require__(94);
  
  var _serviceListSelector = __webpack_require__(95);
  
  var _serviceListSelector2 = _interopRequireDefault(_serviceListSelector);
  
  var _imageList = __webpack_require__(96);
  
  var _imageListSelector = __webpack_require__(97);
  
  var _imageListSelector2 = _interopRequireDefault(_imageListSelector);
  
  var _volumes = __webpack_require__(98);
  
  var _volumesListSelector = __webpack_require__(99);
  
  var _volumesListSelector2 = _interopRequireDefault(_volumesListSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selectorServiceList = (0, _serviceListSelector2.default)();
    var selectorImage = (0, _imageListSelector2.default)();
    var selectorVolumesList = (0, _volumesListSelector2.default)();
    return {
      serviceList: selectorServiceList(state),
      imageList: selectorImage(state),
      volumesList: selectorVolumesList(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onServiceListLoad: function onServiceListLoad(txt) {
        dispatch((0, _services.fetchAllServicesAction)(txt));
      },
      onImageListLoad: function onImageListLoad() {
        dispatch((0, _imageList.fetchImageListAction)());
      },
      onVolumesListLoad: function onVolumesListLoad() {
        dispatch((0, _volumes.fetchVolumesListAction)());
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      }
    };
  };
  
  var DashboardContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Dashboard2.default);
  
  exports.default = DashboardContainer;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Dashboard = __webpack_require__(90);
  
  var _Dashboard2 = _interopRequireDefault(_Dashboard);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _constants = __webpack_require__(38);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ReactHighcharts = __webpack_require__(92);
  
  var _ref = (0, _jsx3.default)('span', {
    className: 'bg_hover bg_detail'
  }, void 0, '\u67E5\u770B\u8BE6\u60C5');
  
  var _ref2 = (0, _jsx3.default)('span', {
    className: 'bg_hover bg_detail'
  }, void 0, '\u67E5\u770B\u8BE6\u60C5');
  
  var Panel1Box = function (_Component) {
    (0, _inherits3.default)(Panel1Box, _Component);
  
    function Panel1Box() {
      (0, _classCallCheck3.default)(this, Panel1Box);
      return (0, _possibleConstructorReturn3.default)(this, (Panel1Box.__proto__ || (0, _getPrototypeOf2.default)(Panel1Box)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Panel1Box, [{
      key: 'render',
      value: function render() {
        var url = this.props.url;
        return url ? (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_Dashboard2.default.p1Box, this.props.theme)
        }, void 0, (0, _jsx3.default)(_Link2.default, {
          to: this.props.url
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_Dashboard2.default.p1BoxLeft, "p1box_left")
        }, void 0, (0, _jsx3.default)('i', {
          className: (0, _classnames2.default)("bg_dis", this.props.className)
        }, void 0, ' '), (0, _jsx3.default)('i', {
          className: (0, _classnames2.default)("bg_hover", 'icon-link')
        }, void 0, ' '), _ref)), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.p1BoxRight
        }, void 0, this.props.children)) : (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_Dashboard2.default.p1Box, this.props.theme)
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_Dashboard2.default.p1BoxLeft, "p1box_left")
        }, void 0, (0, _jsx3.default)('i', {
          className: (0, _classnames2.default)("bg_dis", this.props.className)
        }, void 0, ' '), (0, _jsx3.default)('i', {
          className: (0, _classnames2.default)("bg_hover", 'icon-link')
        }, void 0, ' '), _ref2), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.p1BoxRight
        }, void 0, this.props.children));
      }
    }]);
    return Panel1Box;
  }(_react.Component);
  
  var _ref3 = (0, _jsx3.default)('i', {}, void 0, 'services');
  
  var _ref4 = (0, _jsx3.default)('i', {}, void 0, 'images');
  
  var _ref5 = (0, _jsx3.default)('i', {}, void 0, 'volumes');
  
  var ResourceDetail = function (_Component2) {
    (0, _inherits3.default)(ResourceDetail, _Component2);
  
    function ResourceDetail() {
      (0, _classCallCheck3.default)(this, ResourceDetail);
      return (0, _possibleConstructorReturn3.default)(this, (ResourceDetail.__proto__ || (0, _getPrototypeOf2.default)(ResourceDetail)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ResourceDetail, [{
      key: 'render',
      value: function render() {
        var serviceLength = this.props.serviceList[0] == 1 ? 0 : this.props.serviceList.length;
        var imageLength = this.props.imageList[0] == 1 ? 0 : this.props.imageList.length;
        var volumesLength = this.props.volumesList[0] == 1 ? 0 : this.props.volumesList.length;
        return (0, _jsx3.default)(_reactBootstrap.Panel, {
          header: '\u8D44\u6E90\u8BE6\u7EC6'
        }, void 0, (0, _jsx3.default)('ul', {
          className: _Dashboard2.default.p1List
        }, void 0, (0, _jsx3.default)('li', {}, void 0, (0, _jsx3.default)(_Link2.default, {
          to: '/serviceList'
        }, void 0, (0, _jsx3.default)(Panel1Box, {
          theme: 'p1box_svc',
          className: 'icon-service'
        }, void 0, (0, _jsx3.default)('p', {
          className: _Dashboard2.default.p1BoxRightTxt
        }, void 0, '\u670D\u52A1', _ref3), (0, _jsx3.default)('span', {}, void 0, (0, _jsx3.default)('i', {
          className: _Dashboard2.default.p1BoxRightNum
        }, void 0, serviceLength), '\u4E2A')))), (0, _jsx3.default)('li', {}, void 0, (0, _jsx3.default)(_Link2.default, {
          to: '/imageForMy'
        }, void 0, (0, _jsx3.default)(Panel1Box, {
          theme: 'p1box_image',
          className: 'icon-mirrorceer'
        }, void 0, (0, _jsx3.default)('p', {
          className: _Dashboard2.default.p1BoxRightTxt
        }, void 0, '\u955C\u50CF', _ref4), (0, _jsx3.default)('span', {}, void 0, (0, _jsx3.default)('i', {
          className: _Dashboard2.default.p1BoxRightNum
        }, void 0, imageLength), '\u4E2A')))), (0, _jsx3.default)('li', {}, void 0, (0, _jsx3.default)(_Link2.default, {
          to: '/volumes'
        }, void 0, (0, _jsx3.default)(Panel1Box, {
          theme: 'p1box_pro',
          className: 'icon-project'
        }, void 0, (0, _jsx3.default)('p', {
          className: _Dashboard2.default.p1BoxRightTxt
        }, void 0, '\u6570\u636E\u5377', _ref5), (0, _jsx3.default)('span', {}, void 0, (0, _jsx3.default)('i', {
          className: _Dashboard2.default.p1BoxRightNum
        }, void 0, volumesLength), '\u4E2A')))), (0, _jsx3.default)('li', {}, void 0, (0, _jsx3.default)(Panel1Box, {
          theme: 'p1box_new',
          className: 'icon-new',
          url: '/choseImage'
        }, void 0, (0, _jsx3.default)(_Link2.default, {
          to: '/choseImage'
        }, void 0, (0, _jsx3.default)('p', {
          className: _Dashboard2.default.p1BoxRightTxt
        }, void 0, '\u65B0\u5EFA\u670D\u52A1', (0, _jsx3.default)('i', {
          className: _Dashboard2.default.p1BoxNewSvcTip
        }, void 0, 'new service'))), (0, _jsx3.default)('a', {
          className: _Dashboard2.default.p1BoxDescTxt
        }, void 0, '\u4EC0\u4E48\u662F\u5BB9\u5668\u4E91\u670D\u52A1?')))));
      }
    }]);
    return ResourceDetail;
  }(_react.Component);
  
  // Highcharts.getOptions().plotOptions.pie.colors=["red","blue"]
  
  
  var _ref6 = (0, _jsx3.default)('p', {}, void 0, 'CPU\u603B\u5269\u4F59\u91CF', (0, _jsx3.default)('br', {}), (0, _jsx3.default)('span', {}, void 0, '30%'));
  
  var _ref7 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, 'CPU'), '\uFF08\u6838\uFF09\u4F7F\u7528\u60C5\u51B5');
  
  var _ref8 = (0, _jsx3.default)('p', {}, void 0, '\u603B\u6570\u91CF');
  
  var _ref9 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '10'), '\u6838');
  
  var _ref10 = (0, _jsx3.default)('p', {}, void 0, '\u5DF2\u4F7F\u7528');
  
  var _ref11 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '7'), '\u6838');
  
  var _ref12 = (0, _jsx3.default)('p', {}, void 0, '\u5269\u4F59\u6570');
  
  var _ref13 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '3'), '\u6838');
  
  var _ref14 = (0, _jsx3.default)('p', {}, void 0, '\u5185\u5B58\u603B\u5269\u4F59\u91CF', (0, _jsx3.default)('br', {}), (0, _jsx3.default)('span', {}, void 0, '50%'));
  
  var _ref15 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '\u5185\u5B58'), '\uFF08MB\uFF09\u4F7F\u7528\u60C5\u51B5');
  
  var _ref16 = (0, _jsx3.default)('p', {}, void 0, '\u603B\u6570\u91CF');
  
  var _ref17 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '10'), 'MB');
  
  var _ref18 = (0, _jsx3.default)('p', {}, void 0, '\u5DF2\u4F7F\u7528');
  
  var _ref19 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '5'), 'MB');
  
  var _ref20 = (0, _jsx3.default)('p', {}, void 0, '\u5269\u4F59\u6570');
  
  var _ref21 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '5'), 'MB');
  
  var _ref22 = (0, _jsx3.default)('p', {}, void 0, '\u6570\u636E\u5377\u603B\u5269\u4F59\u91CF', (0, _jsx3.default)('br', {}), (0, _jsx3.default)('span', {}, void 0, '70%'));
  
  var _ref23 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '\u6570\u636E\u5377'), '\uFF08G\uFF09\u4F7F\u7528\u60C5\u51B5');
  
  var _ref24 = (0, _jsx3.default)('p', {}, void 0, '\u603B\u6570\u91CF');
  
  var _ref25 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '10'), 'G');
  
  var _ref26 = (0, _jsx3.default)('p', {}, void 0, '\u5DF2\u4F7F\u7528');
  
  var _ref27 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '3'), 'G');
  
  var _ref28 = (0, _jsx3.default)('p', {}, void 0, '\u5269\u4F59\u6570');
  
  var _ref29 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '7'), 'G');
  
  var Monitor = function (_Component3) {
    (0, _inherits3.default)(Monitor, _Component3);
  
    function Monitor() {
      (0, _classCallCheck3.default)(this, Monitor);
      return (0, _possibleConstructorReturn3.default)(this, (Monitor.__proto__ || (0, _getPrototypeOf2.default)(Monitor)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Monitor, [{
      key: 'render',
      value: function render() {
        var config1 = {
          chart: {
            height: 145,
            width: 145,
            margin: [0, 0, 0, 0]
          },
          title: {
            text: null, //'CPU总剩余量<br><span style="color:#56c8f2;font-size:20px;">30%</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: { "font-size": "14px", "color": "#333" }
          },
          tooltip: {
            enabled: false
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false
              },
              center: ['50%', '50%'],
              borderWidth: 0,
              colors: ["#56c8f2", "#7c7c7c"]
            }
          },
          series: [{
            type: 'pie',
            innerSize: '80%',
            color: "red",
            data: [['used', 70], ['unUsed', 30]],
            states: {
              hover: {
                enabled: false
              }
            }
          }],
          credits: { enabled: false }
        };
        var config2 = {
          chart: {
            height: 145,
            width: 145,
            margin: [0, 0, 0, 0]
          },
          title: {
            text: null, //'内存总剩余量<br><span style="color:#ff6c60;font-size:20px;">50%</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: { "font-size": "14px", "color": "#333" }
          },
          tooltip: {
            enabled: false
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false
              },
              center: ['50%', '50%'],
              borderWidth: 0,
              colors: ["#ff6c60", "#7c7c7c"]
            }
          },
          series: [{
            type: 'pie',
            innerSize: '80%',
            data: [['used', 50], ['unUsed', 50]],
            states: {
              hover: {
                enabled: false
              }
            }
          }],
          credits: { enabled: false }
  
        };
        var config3 = {
          chart: {
            height: 145,
            width: 145,
            margin: [0, 0, 0, 0]
          },
          title: {
            text: null, //'数据卷总剩余量<br><span style="color:#2ecc71;font-size:20px;">70%</span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: { "font-size": "14px", "color": "#333" }
          },
          tooltip: {
            enabled: false
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false
              },
              center: ['50%', '50%'],
              borderWidth: 0,
              colors: ["#2ecc71", "#7c7c7c"]
            }
          },
          series: [{
            type: 'pie',
            innerSize: '80%',
            data: [['used', 30], ['unUsed', 70]],
            states: {
              hover: {
                enabled: false
              }
            }
          }],
          credits: { enabled: false }
  
        };
        return (0, _jsx3.default)(_reactBootstrap.Panel, {
          header: '\u8D44\u6E90\u914D\u989D\u4F7F\u7528\u60C5\u51B5',
          className: _Dashboard2.default.monitor
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceBox
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceItem
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceLeft
        }, void 0, _ref6, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.hcItem
        }, void 0, (0, _jsx3.default)(ReactHighcharts, {
          config: config1
        }, void 0, ' '))), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceRight
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceHd
        }, void 0, _ref7), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceBd
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref8, _ref9), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref10, _ref11), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref12, _ref13)))), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceItem
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceLeft
        }, void 0, _ref14, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.hcItem
        }, void 0, (0, _jsx3.default)(ReactHighcharts, {
          config: config2
        }, void 0, ' '))), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceRight
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceHd
        }, void 0, _ref15), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceBd
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref16, _ref17), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref18, _ref19), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref20, _ref21)))), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceItem
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceLeft
        }, void 0, _ref22, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.hcItem
        }, void 0, (0, _jsx3.default)(ReactHighcharts, {
          config: config3
        }, void 0, ' '))), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceRight
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceHd
        }, void 0, _ref23), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceBd
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref24, _ref25), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref26, _ref27), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.resourceInfo
        }, void 0, _ref28, _ref29))))));
      }
    }]);
    return Monitor;
  }(_react.Component);
  
  var _ref30 = (0, _jsx3.default)(_reactBootstrap.Button, {
    bsStyle: 'primary'
  }, void 0, '\u5145\u503C');
  
  var _ref31 = (0, _jsx3.default)(_reactBootstrap.Button, {
    bsStyle: 'primary',
    className: 'pull-right'
  }, void 0, '\u67E5\u770B');
  
  var AccountInfo = function (_Component4) {
    (0, _inherits3.default)(AccountInfo, _Component4);
  
    function AccountInfo() {
      (0, _classCallCheck3.default)(this, AccountInfo);
      return (0, _possibleConstructorReturn3.default)(this, (AccountInfo.__proto__ || (0, _getPrototypeOf2.default)(AccountInfo)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(AccountInfo, [{
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_reactBootstrap.Panel, {
          header: '\u8D26\u6237\u4FE1\u606F',
          className: _Dashboard2.default.accountInfo
        }, void 0, (0, _jsx3.default)('div', {
          className: _Dashboard2.default.accountInfoBody
        }, void 0, (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {
          className: _Dashboard2.default.accountInfoSubT
        }, void 0, '\u8D26\u6237\u4F59\u989D')), (0, _jsx3.default)('p', {
          className: _Dashboard2.default.accountInfoBalance
        }, void 0, (0, _jsx3.default)('span', {
          className: _Dashboard2.default.accountInfoMoney
        }, void 0, '-123.07'), '\u5143', _ref30)), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.accountInfoBody
        }, void 0, (0, _jsx3.default)('p', {
          className: _Dashboard2.default.accountInfoBusiness
        }, void 0, '2016.8.19'), (0, _jsx3.default)('p', {
          style: { lineHeight: "34px" }
        }, void 0, (0, _jsx3.default)('span', {
          className: _Dashboard2.default.accountInfoSubT
        }, void 0, '\u6700\u8FD1\u4EA4\u6613'), _ref31)));
      }
    }]);
    return AccountInfo;
  }(_react.Component);
  
  var title = '控制台';
  
  var _ref32 = (0, _jsx3.default)(Monitor, {});
  
  var _ref33 = (0, _jsx3.default)(AccountInfo, {});
  
  var Dashboard = function (_Component5) {
    (0, _inherits3.default)(Dashboard, _Component5);
  
    function Dashboard() {
      (0, _classCallCheck3.default)(this, Dashboard);
      return (0, _possibleConstructorReturn3.default)(this, (Dashboard.__proto__ || (0, _getPrototypeOf2.default)(Dashboard)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Dashboard, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.CONSOLE);
        this.props.onServiceListLoad();
        this.props.onImageListLoad();
        this.props.onVolumesListLoad();
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle(title);
        var serviceList = this.props.serviceList;
        var imageList = this.props.imageList;
        var volumesList = this.props.volumesList;
        return (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_Dashboard2.default.root, "containerPadding")
        }, void 0, (0, _jsx3.default)(ResourceDetail, {
          serviceList: serviceList,
          imageList: imageList,
          volumesList: volumesList
        }), (0, _jsx3.default)('div', {
          className: _Dashboard2.default.row
        }, void 0, _ref32, _ref33));
      }
    }]);
    return Dashboard;
  }(_react.Component);
  
  Dashboard.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(_Dashboard2.default)(Dashboard);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(91);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "._3are>li{margin-right:15px}._3are>li,._NlT{display:inline-block}._NlT{background:#f3f4f9;border-radius:.4em;overflow:hidden;border-width:1px;border-style:solid;cursor:pointer}._3KSh{float:left;text-align:center;padding:30px 25px;height:115px;box-sizing:border-box}._3KSh>span{display:block;margin:15px auto;font-size:40px;color:#fff}._1C5Y{display:inline-block;padding:5px 20px;height:115px;box-sizing:border-box}._1C5Y>span{color:#333}._3iO5{font-style:normal;font-size:38px;margin-right:5px}.TzEs{margin:15px 0 10px;font-size:18px;color:#333}.TzEs>i{font-size:12px;color:#b5b5b5;margin-left:5px}._1hxx{color:#b5b5b5;font-style:italic;display:inline-block;margin-top:10px}._2ifQ{display:block;margin:0!important}._3yW6{position:relative}._2_K6{position:absolute;top:0;right:0;width:250px}._2Joa{border-bottom:1px dashed #ccc;padding:15px;margin:0 -15px -15px}._2Joa:first-child{margin-top:-15px}._2Joa:last-child{border-bottom:0}._3LgG{color:#ccc}._1JRR{margin-top:5px}.eCGu{font-size:16px;margin:20px 0 5px}._1JRR>button{float:right;margin-top:7px}._1JRR:after{clear:both}._1BwL{font-size:32px;color:#fe6137;margin-right:5px}._34J7{margin-right:260px}._1O7d{width:100%;height:300px}._3MBy{padding:0 20px 30px;margin-top:-15px}._2Iz7{position:relative;border-bottom:1px solid #e8e8e8;padding:15px 0}._2Iz7:last-child{border:0}._2Iz7:nth-child(2) ._1j18 p span{color:#ff6c60}._2Iz7:nth-child(3) ._1j18 p span{color:#2ecc71}._2Iz7:nth-child(1) ._1pun>p>span{color:#56c8f2}._2Iz7:nth-child(2) ._1pun>p>span{color:#ff6c60}._2Iz7:nth-child(3) ._1pun>p>span{color:#2ecc71}._1pun{width:240px;height:155px;position:absolute;top:10px;left:0;overflow:hidden}._1pun:after{content:\"\";width:1px;background:#e8e8e8;height:93px;right:0;top:25px}._1pun:after,._1pun>p{display:inline-block;position:absolute}._1pun>p{color:#333;z-index:2;top:80px;left:24px;text-align:center;min-width:98px}._1pun>p>span{font-size:20px}._1zhx{width:125px;height:125px;margin-top:20px}._2EVm{margin-left:240px;height:155px;padding-left:70px;padding-right:60px}._1j18{padding-bottom:10px;border-bottom:1px solid #e8e8e8}._1j18 p{color:#666;padding-top:7px}._1j18 p span{font-size:18px;color:#56c8f2}._1vFz{width:45%;display:inline-block;position:relative;padding-top:15px;text-align:center}._1vFz:after{content:'';width:1px;height:58px;position:absolute;top:14px;right:0;background:#e8e8e8}._1vFz:first-child{text-align:left;width:25%}._1vFz:last-child{width:30%}._1vFz:last-child:after{display:none}._1vFz p{color:#666}._1vFz p:last-child{color:#333}._1vFz p span{font-size:28px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "hHQa",
  	"p1List": "_3are",
  	"p1Box": "_NlT",
  	"p1BoxLeft": "_3KSh",
  	"p1BoxRight": "_1C5Y",
  	"p1BoxRightNum": "_3iO5",
  	"p1BoxRightTxt": "TzEs",
  	"p1BoxDescTxt": "_1hxx",
  	"p1BoxNewSvcTip": "_2ifQ",
  	"row": "_3yW6",
  	"accountInfo": "_2_K6",
  	"accountInfoBody": "_2Joa",
  	"accountInfoSubT": "_3LgG",
  	"accountInfoBalance": "_1JRR",
  	"accountInfoBusiness": "eCGu",
  	"accountInfoMoney": "_1BwL",
  	"monitor": "_34J7",
  	"chart": "_1O7d",
  	"resourceBox": "_3MBy",
  	"resourceItem": "_2Iz7",
  	"resourceHd": "_1j18",
  	"resourceLeft": "_1pun",
  	"hcItem": "_1zhx",
  	"resourceRight": "_2EVm",
  	"resourceBd": "_1XIm",
  	"resourceInfo": "_1vFz"
  };

/***/ },
/* 92 */
/***/ function(module, exports) {

  module.exports = require("react-highcharts");

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setBreadcrumbAction = setBreadcrumbAction;
  
  var _constants = __webpack_require__(38);
  
  function setBreadcrumbAction() {
    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }
  
    return {
      type: _constants.BREADCRUMB_LIST,
      payload: names
    };
  }

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchAllServicesAction = fetchAllServicesAction;
  exports.fetchDeleteServiceAction = fetchDeleteServiceAction;
  exports.fetchChangeStateAction = fetchChangeStateAction;
  exports.refreshServiceList = refreshServiceList;
  
  var _constants = __webpack_require__(38);
  
  var _header = __webpack_require__(80);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(78);
  
  var _serviceDetail = __webpack_require__(79);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveServices(data) {
    return {
      type: _constants.GET_ALL_SERVICES,
      payload: data
    };
  }
  
  function fetchAllServicesAction(txt) {
    var url = txt ? _constants.API_SERVICE_URL + '?&service_name=' + txt : '' + _constants.API_SERVICE_URL;
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          dispatch(receiveServices(json.result));
        } else {
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error('get all services error:', e);
      });
    };
  }
  
  function fetchDeleteServiceAction(data) {
    var url = '' + _constants.API_DELETE_SERVICE_URL + "/" + data.serviceName,
        myInit = {
      method: "DELETE",
      headers: { token: localStorage.getItem("_at") }
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "删除成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          if (data.type == "list") {
            dispatch(fetchAllServicesAction());
          } else {
            dispatch((0, _route.navigate)("/serviceList"));
          }
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "删除失败", level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _notification.receiveNotification)({ message: "程序错误", level: "danger" }));
        setTimeout(function () {
          dispatch((0, _notification.clearNotification)());
        }, 3000);
        dispatch((0, _header.isLoadingAction)(false));
        console.error('delete service error', e);
      });
    };
  }
  
  function fetchChangeStateAction(data) {
    console.log({ "operate": data.state });
    var url = '' + _constants.API_SERVICE_URL + "/" + data.serviceName + "/status",
        myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: (0, _stringify2.default)({ operate: data.state })
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "修改成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchAllServicesAction());
          dispatch((0, _serviceDetail.fetchServiceDetailAction)(data.serviceName));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "修改失败:" + json.msg, level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error('status service error', e);
      });
    };
  }
  
  function refreshServiceList() {
    return {
      type: _constants.REFRESH_LIST
    };
  }

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getServiceList
  var getServiceList = function getServiceList(state) {
    return state.serviceList;
  };
  
  var makeGetServiceListSelector = function makeGetServiceListSelector() {
    return (0, _reselect.createSelector)([getServiceList], function (serviceList) {
      return serviceList;
    });
  };
  
  exports.default = makeGetServiceListSelector;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.receiveImageList = receiveImageList;
  exports.fetchImageListAction = fetchImageListAction;
  
  var _constants = __webpack_require__(38);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(80);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveImageList(data) {
    return {
      type: _constants.GET_IMAGE_LIST,
      payload: data
    };
  }
  
  function fetchImageListAction(flag) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = flag ? _constants.FETCH_URL.IMAGE_LIST + "?is_public=true" : _constants.FETCH_URL.IMAGE_LIST;
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log('>>>>>images list', json);
        if (json.status == 0) {
          dispatch(receiveImageList(json.result));
        } else {
          console.error("images list error", json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("images list error", e);
      });
    };
  }

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getImageList
  var getImageList = function getImageList(state) {
    return state.imageList;
  };
  
  var makeGetImageListSelector = function makeGetImageListSelector() {
    return (0, _reselect.createSelector)([getImageList], function (imageList) {
      return imageList;
    });
  };
  
  exports.default = makeGetImageListSelector;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.receiveVolumes = receiveVolumes;
  exports.refreshVolumeList = refreshVolumeList;
  exports.createVolume = createVolume;
  exports.scaleVolume = scaleVolume;
  exports.deleteVolume = deleteVolume;
  exports.fetchVolumesListAction = fetchVolumesListAction;
  
  var _constants = __webpack_require__(38);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(80);
  
  var _notification = __webpack_require__(78);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveVolumes(volumes) {
    return {
      type: _constants.RECEIVE_VOLUMES_LIST,
      payload: volumes
    };
  }
  
  function refreshVolumeList() {
    return {
      type: _constants.REFRESH_LIST
    };
  }
  
  function isCreateVolume(state) {
    return {
      type: _constants.IS_BTN_STATE.createVolume,
      payload: state
    };
  }
  
  function createVolume(data) {
    console.log(data, ">>>>>>");
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isCreateVolume(false));
      return (0, _isomorphicFetch2.default)('' + _constants.API_VOLUMES_URL, {
        method: 'POST',
        headers: {
          token: localStorage.getItem('_at')
        },
        body: (0, _stringify2.default)(data)
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          var d = json.result;
          console.log('create volume ' + d.pool_name + '/' + d.disk_name + ' success!', d);
          dispatch((0, _notification.receiveNotification)({ message: "创建成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchVolumesListAction());
        } else {
          console.error('create volume error: ', json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isCreateVolume(true));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isCreateVolume(true));
        console.error('create volume error: ', e);
      });
    };
  }
  
  function scaleVolume(diskName, diskSize) {
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.API_VOLUMES_URL + '/' + diskName, {
        method: 'PUT',
        headers: {
          token: localStorage.getItem('_at')
        },
        body: (0, _stringify2.default)({ disk_size: diskSize })
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "扩容成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchVolumesListAction());
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "扩容失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error('scale volume ' + diskName + ' failed!', json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error('scale volume ' + diskName + ' error!', e);
      });
    };
  }
  
  function deleteVolume(diskName) {
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.API_VOLUMES_URL + '/' + diskName, {
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('_at')
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "删除成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(fetchVolumesListAction());
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "删除失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error('delete volume ' + diskName + ' failed!', json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _notification.receiveNotification)({ message: "程序错误", level: "danger" }));
        setTimeout(function () {
          dispatch((0, _notification.clearNotification)());
        }, 5000);
        dispatch((0, _header.isLoadingAction)(false));
        console.error('delete volume ' + diskName + ' error!', e);
      });
    };
  }
  
  function fetchVolumesListAction(currentPage, pageNum) {
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)('' + _constants.API_VOLUMES_URL, {
        headers: {
          token: localStorage.getItem("_at")
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          dispatch(receiveVolumes(json.result.volume_list));
        } else {
          console.error('get all volumes failed:', json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error('get all volumes error:', e);
      });
    };
  }

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getVolumesList = function getVolumesList(state) {
    return state.volumesList;
  };
  
  var makeGetVolumesListSelector = function makeGetVolumesListSelector() {
    return (0, _reselect.createSelector)([getVolumesList], function (volumesList) {
      return volumesList;
    });
  };
  
  exports.default = makeGetVolumesListSelector;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageCenterContainer = __webpack_require__(101);
  
  var _ImageCenterContainer2 = _interopRequireDefault(_ImageCenterContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_ImageCenterContainer2.default, {});
  
  exports.default = {
    path: '/imageCenter',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageCenter = __webpack_require__(102);
  
  var _ImageCenter2 = _interopRequireDefault(_ImageCenter);
  
  var _reactRedux = __webpack_require__(51);
  
  var _imageList = __webpack_require__(96);
  
  var _imageListSelector = __webpack_require__(97);
  
  var _imageListSelector2 = _interopRequireDefault(_imageListSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _imageListSelector2.default)();
    return {
      imageList: selector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onImageList: function onImageList() {
        dispatch((0, _imageList.fetchImageListAction)());
      }
    };
  };
  
  var ImageListContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ImageCenter2.default);
  
  exports.default = ImageListContainer;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _constants = __webpack_require__(38);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_reactBootstrap.Checkbox, {
    readOnly: true
  });
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, '\u955C\u50CF\u540D\u79F0');
  
  var _ref3 = (0, _jsx3.default)('span', {
    className: 'icon-collection'
  }, void 0, '\u6536\u85CF');
  
  var _ref4 = (0, _jsx3.default)(_reactBootstrap.Button, {
    bsStyle: 'primary',
    bsSize: 'small'
  }, void 0, '\u90E8\u7F72');
  
  var _ref5 = (0, _jsx3.default)('h1', {}, void 0, '\u955C\u50CF\u540D\u79F0');
  
  var _ref6 = (0, _jsx3.default)('div', {
    className: 'clearfix imgHd'
  }, void 0, (0, _jsx3.default)('span', {}, void 0, '\u955C\u50CF\u4ED3\u5E93'), (0, _jsx3.default)('a', {
    href: 'javascript:;'
  }, void 0, '\u4EC0\u4E48\u662F\u5BB9\u5668\u955C\u50CF\uFF1F'), (0, _jsx3.default)('div', {
    className: 'imgDropBox'
  }, void 0, (0, _jsx3.default)(_reactBootstrap.DropdownButton, {
    bsSize: 'xs',
    title: '\u64CD\u4F5C',
    id: 'dropDown',
    className: 'dropDownForOpt'
  }, void 0, (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '1'
  }, void 0, '\u5168\u9009'), (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '2'
  }, void 0, '\u5220\u9664'), (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '2'
  }, void 0, '\u7F6E\u9876'))));
  
  var _ref7 = (0, _jsx3.default)('a', {
    type: 'button',
    className: 'slSearchBtn icon-select'
  }, void 0, ' ');
  
  var ImageCenter = function (_React$Component) {
    (0, _inherits3.default)(ImageCenter, _React$Component);
  
    function ImageCenter() {
      (0, _classCallCheck3.default)(this, ImageCenter);
      return (0, _possibleConstructorReturn3.default)(this, (ImageCenter.__proto__ || (0, _getPrototypeOf2.default)(ImageCenter)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ImageCenter, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.SERVICE_LIST);
        this.props.onImageList();
      }
    }, {
      key: 'getImageList',
      value: function getImageList() {
        var data = this.props.imageList;
        return data.map(function (item, i) {
          return (0, _jsx3.default)('div', {
            className: 'imagesListItem'
          }, i, (0, _jsx3.default)('div', {
            className: 'hd'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'imagesListHd'
          }, void 0, _ref, (0, _jsx3.default)('img', {
            width: 40,
            height: 40,
            src: __webpack_require__(103),
            alt: 'img'
          })), (0, _jsx3.default)('div', {
            className: 'imagesListInfo'
          }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('a', {
            href: 'javascript:;'
          }, void 0, item)))), (0, _jsx3.default)('div', {
            className: 'bd clearfix'
          }, void 0, _ref3, _ref4));
        });
      }
    }, {
      key: 'getImageTopTen',
      value: function getImageTopTen(n) {
        var data = this.props.imageList;
        return data.map(function (item, i) {
          if (i >= n) {
            return false;
          } else {
            return (0, _jsx3.default)('div', {
              className: 'imagesListItem'
            }, i, (0, _jsx3.default)('div', {
              className: 'hd'
            }, void 0, (0, _jsx3.default)('div', {
              className: 'imagesListHd'
            }, void 0, (0, _jsx3.default)('img', {
              width: 40,
              height: 40,
              src: __webpack_require__(103),
              alt: 'img'
            })), (0, _jsx3.default)('div', {
              className: 'imagesListInfo'
            }, void 0, _ref5, (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('a', {
              href: 'javascript:;'
            }, void 0, item)))));
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('镜像中心');
        var panelHd = _ref6;
        return (0, _jsx3.default)('div', {
          className: 'images containerPadding'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Panel, {
          className: 'image-left',
          header: panelHd
        }, void 0, (0, _jsx3.default)('div', {
          className: 'imagesListBox'
        }, void 0, this.getImageList())), (0, _jsx3.default)('div', {
          className: 'image-right'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'imageSearch'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'search'
        }, void 0, _react2.default.createElement('input', { type: 'text', placeholder: '\u641C\u7D22\u955C\u50CF', ref: 'searchInput', className: 'slSearchInp' }), _ref7)), (0, _jsx3.default)(_reactBootstrap.Panel, {
          className: 'imagesRankingList',
          header: '\u6392\u884C\u699C'
        }, void 0, this.getImageTopTen(10))));
      }
    }]);
    return ImageCenter;
  }(_react2.default.Component);
  
  ImageCenter.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  exports.default = ImageCenter;

/***/ },
/* 103 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmIzYTA5MS1mZTUwLTRkOGMtOGQ1NS1kYTcxMDUyYjdkMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Q0OTkxN0E2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Q0OTkxNzk2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphOThjNzgzOS1kYWE3LTQ3ZjgtODAzOS1jMzc0ZmIzYmI1ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTZiM2EwOTEtZmU1MC00ZDhjLThkNTUtZGE3MTA1MmI3ZDI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QujMrwAAEShJREFUeNoklwlwW9d1hu/b38PDvpAgQJAgARLcRdGUSEvULtoj2+NFdSUnTpzVcTqx04xqx0mbpO2kiVuntptmJq63xHXqZOptbMmSFduSbUqyJEoiKYukxJ0ECBD79vD2rVcpBjPA4A3uufec/57/O4hpmqV0/B8effTCx59u6qyP9odeeumTNR384blHBpyOyeNnTZIcR0sffHT1W4ObhvcMapJiwclaMpPJVSRNRRHU5rQ7vQ4Uw6UaTyCApdnrawlRqp5b2njjagYA8N+//nY00pktg46QVcccgc59LrcXEbnc8Zd+duTI83fu7fF1ugRO2dzT72moy01N5T+dcfaGUYJ5dfzK9pHub23biaPoeialKEYqkayVeBtDYhimKKqpqHarRdK0hXQhGvQVKrVkoex3EZdWMq9dSu24JfjDxw9fnY+7rZTL7saopgN3fw2vxC9m19MNTqs/4vIG/Y3WoKvBd+HdY34V7/nyqI+xrYpXHefTYa5DUqW15LpY4RDUxFFDR6RSVbNZGYCiMoryGgAIYiXxM7OLODAZhlYUent7c7bInbySvHd+ZaivV+P1pUwi6Eme+uhFVOdz8ZV0uM3vaw70tXSUeP4XTz5tqahbDo5aFGXuwuUC8Ox75MskyybOX+AW1tR4lspxUo4zaiaBAVM3EcS0kDRBIjRBRJvqBlsaw/UNGADrhY10gfvy7sFGAJ5//RyOoSiGRgMh3TBZYOJA1+eXkwDVtar8yceXfvXKyVd/eF9XX++1sfHZU+eGnvm322+7DVHNZGrl8/96JtrThKOYmi83IuhGhccU1QJQXpQMUwMGShKUrmk1iadxgiUJ3WSz1bIOtK+PRE+tZhYT61VJ3BJul2S8UitgdoUb//zqnYe2yaLy5vHxfS3uA9u2TF2crKXWAw8e3H7wXm49IdWKGGNdWV7sbg51bepBGYuVZZ1WhkIMRREFUTPhCTCcwDCSpHNlbmY9meNLmqoF3V5eUVVENCuSNejx+N0UgrtsjumlWXzq4sxXH7vXHWmcPTvT3ujc0xFJrG2oKEojwOv0M4ylqmqMhZVV9fPTn9A3GvA9u1OZtFLlDNUgEFORDRxDdAOKFyEIJFeqMCTZ4mkoCTXT1DYqJStFaSilySLCcQxtX9lI9kXavC4v9rdH7mno6ipXax4L2+WwuRiqwokkhlM4lcrFiXBbpD1qGubrL7z07u9O9fUGM+sJXhKZeq/FabfQsMigVIExYK1NeHBZVVYz+Y1yRZB5WHaWosuCkOE4VeFJigj1dUmiAEsTCTTj7tZIqVjEUSTg82iFWiVfZAN+XRIkgNgr3AdPHDm/d//yF5NHXzv72O3t/YEQ6rBYaLq8lkzmK1WoLHjbaJIgMVXXVU0Puj11bmeFl/LF7MR6AjNxv92FYchCtTB1ebFzT9rh8RQLhfnkGnbn7VsIgpSFmjCzRAiauzvCBv2Spoc6mm0EETQBNznJyNKj33/g7sMHm4f66ttaAUlpiqIgmIwhNENSJMKLoiqrqKEpKpSKhhgGTVlkycARE8Ogbk2X3ZZYq3j8lkA0oiuiZhg4AcMS+NhHl25h7aDOKxqIx+HAVTU3s2jqiD3S1tzVXqzkZ+fmv5iZRmi0nONKhYrLTmmqIfN8rVrDEAoBgKZp1kJGmkOqrH8yPaNpGrw+KGoYnGkYIBpsDPk20sl0LzA1HVCwlqzVfvbYybHPro5++6Az6AckUVpZk/Mc5ferLHl5ZpI1gc1AbR6vq96JaBoVwkmLlU/na/lSY7iJtjskHeqKhMXGCZwrVRauL9dZQqYqybDgQFyppSs8PLxc1VS3CjdhwMzDHOCVVOrK+FxbU9DrdaMGJlf4Klcp6qqZLlokoQ21dsTabQ47zlgFQ5dkmEu+LFXzZrlg0/JCDlM3+HyWL3FQaA4rwtV42dBaeygG6qCkLcxJmAYoDFTFmiIC1BCBYaAIZgAdV8s1imZjPhdAiclr10xSozHKFOW2UNBTH+YkaSG1Id24YUiVEi/UcAMD8gtH52/b4xndGRAFhQRouNUa9Pk9dvZGsjx9w8xw4kpGMDCxO2p74Js9mcVyKS78x0eL1wpqzFlHEaCGoYim4zhGEdTNjpOt5stimeJhreyM1b1eFj6cnJ1JljZyvIaAO/cH77urOdIYQAi/J/LBxfF4vSs8tDNULolOC7mWL7/69vyrxxLTmXyQZrd0s6Kkv300v2cHf3hfIBxETEMF1nBs5Et8Yc7jcpc5DLv/wLZEKtPAss3+BhS1tfR2lg25YqSTXO7SQj7SYh3Y5KUJ8Keja/EVnSaxwc6mgd27OuqRsxdmdIB5bfhSNv+jZy/++uhCkwv93v2h+w74RobqRnfW793m++J6cTXBbW53XpjKrOWLodaWs+fmq6kbg1v7sW8c2kdRVHo9TeMYT2rJYuLtd4/b3Wi2aO2N2h86NLBnODa8uakzavlwbP75E/PrMzNb+1qaWgZwkNN1yWZhjp9dfedk7rZea6QZpPLKK2+tvXAs+c6x+K097Df+uifLi4SAXFutLRWlicuTiysb49NpLrWMHb5jRBTltURW1KRz4+eOnVwM1wHWE6t3UQ9/5ZZ0rvrSq5++/valXC6bylS2trmurqBqcXZk9x4NYR1oNs8by0nOAdRCsbQmeI+Pb3AqCHg8eVE8fqGwvcXS0+1Px7mz1/Mp+ODm62Z3nYtz6NWJ6yJX23/Xrt6RW8PhWCQAbA6XnSEePNi/Fi888fOPf/v+0pmZytgEl82DxfnCoQMuymHkizWcdEEBw2zHImyxmPOF65/+yVfpv6z93cPDpjH28P07H3l6Sq1KdfV0rQbtGliJm0/rPM6HHv4men58Zmjb1q39PXKNJzHE0EG+rG7e1CCIwtQc9/3HHmp3AR2A/3z27zLmzMDQpqMf3hgaaIGgYwIMGBiK45WCWE7JX7q7jZNE6S+BP/t8BiDM3u0DHhcxey2FmoYsy/CXWBRaM+CqNZ+LQUdvHx7Z3itL0okT52ysDScQXQcBv/fUqUs7YA6a6q+XAFxuamIKCMX2WFMkGlZlQOGIoinQkSicNHVsqKO+lEhRGD8UjgzbwJWp1RC+5Ze/+sNTP95LGoZQ1opwCYpsibTCwKKq/en53+Iet4sr8haWcTkZHdUdrN3qtmq6EQwH7QQH8EB/nbUraP/s5Fjklf3tfR3P/fR+vjxblWBUFL4RE1jrbaFO9+p0wd28/J2/GTr/HrjdCc5M5+872BJwa7KNgF5VhgExxOW0w8/uZhds6thQW9Dp80F4mLh81emgOY4PBpzN4XqGtWWyie5I2NfUklwvNPgCkgmOfO/W/haHpOIGwsJeptZWUYyu8AJlpzXOSK0lXW4+ELYAxtg67G0J2SVRxK32bKL259mC1eVscLM3FuJtrcHl5QyumEi1UoVSW1xaGdlxEFp6YnnBzToZCzq9XL409flALOL37knEVx54sK3Fx2zwdk0vmpqAai5NQywkhgKMZMnoraH8SqGSr1mcdGPAouu4JnK4zUk6mhPp6/CgfLF8+sSZaKvf53VVNIB6nc5ildc0w+e08YJEUAxENBPBW4PhehvDS8r1hVk7XrxtS0PQZZWIKGRN3Cj6Gjpo2qKbKuQNj9MmiIpi6t5WT0trwGv30KTdQWnQMQ33LjVXmFrIw8CmJnX0Re6688B7H13ubWTQvk09xUIxXygCAmNZi83mMglHhSupuC0S3RoLNjT5PKipcYrNdA1DrMytX5tOaqlUSlf45sgITtIzN1YXZtKqZGqaCXEAwaAJcDhjlwMPbExOx698dv5mXDA6HNt/xx1vvvT7He30z556BFd1I76caGoM1bncOEb6fHar3Te/EI/FqvZAO2bxwJ1CGWGUy0BQsTRX5/ZxSu6t15+1Opyxvq6ZL64X5oUdo1GH08JVBBhA1wSCwPT60dXxi+b0sSzik7Ry/6buAwfvfvKHTw2GsSP//Jgi6/iZz85CRsRwXJA0nMS4qmS3Mpev5qPRKzEoIV+zKNJAl9VqRuHjqswRCBJrcA5/7ztLefvTv/ydgmFL08VYF+8P2FUrI9UkzCii3tGlqdna+f8N9bY/+9o83M09e3ufeeZFFoCHvjEKELxYKqK5dIWiGRxHaRJnaIuv3ldXb19YzS4tZBOrE4X4NQbwmgAdd0GXKgj0adNs69uvM73//uujm7od//LjBwd27fzFi9PH35jFFZ1mAG4NFEpGZfLjUHfk3ExlidNxxrGeLCQzhaE92xTUCk0dohq6ZXufqWhAN2xum6GbmqFbaIvX7ZpbE9IVZGXli6X5y4QpM7TVRGmAmq2x4XfOJP2Dh4zyxHe+Ntpky/30u92PPbb/hVPlt/44TaMKoN1cOm+lzMW08vLZFDyujTLm1m5+EUUDtYZNqSitjaFut5sXeRUKw0AU3Shm8jiJW20MRRKTE/Ga7klmUovL1ykILMD0uhumV6pPPvFPTz3U+veP37O8kri2lNVqyUfuDb/83MH1ijWfEWGRsY050QT/M5aWYIfG6KADTSzdTPjYhQtnzl3neVkVK2ilVGVIJpvJYChs4bCpKqogwDnFU+dQRfHDk1c1vGlmKT2zNGelGYrAT7x/4ruHO3/0xKPuxpGGxlhba4ygnYVydXePZddIQ65okpBVCvm3J8pzBQli2K1D/dlsZS3//9YEDmyv27Rl0IDUWC3XcAzLpDasrAUBaKksorpEYRBVdZfLms0VT5+asNgbEYsXko+hCk0BNhoJVjWfo64tV1h74913ltdzNGFNF4reAKjzOfJr1Tcvpc/HZRhm347BjfkbWfFmyD09AX79va//4Kcsou7r8sAJDnF57KU8x/OC3WqrVAWCpZ1OplqtwavR0uxfnrvx0Xt/ljUP7o7kaurmDo/LiW4kV9wO/NqS9oPfTFU5sa7JLRtoV2udVBT/8eXpC6mbLtXZ0UnIxUS+TDHYEw/vPX3thCW47+P3/1i7+FpFo+CojZIUo5sGSyA4jthsDgyT/A2W+GqKQSEfSvU+F2bwz/3imbv+6p7O3k6tJoZ8rYGAH5jS+lqunXV9PLaQzacxgOVW8899sFwW4RQKHI2Nm3tDk8tX+u/dva+z5aknvwnt6fTx58wrr7hamz65IuKGoVSLQq4gC4JB4qjTabs+NdcaiznczlopBwEYBbo/4Bdk6eXfvN7d27T9ttGq5njz/TehRFYWEtuHWjfS/BsnL/MAQCXhQW+TzPFl2ULBrd9oiHYX8vKt3U2og07nEuXEtV2x0IUsgHiJbh7saukItEU8Dhuxtr4RagpilJUr5D0eN4ITqqKSBMELIklZBoZbBXHjzyfe27xzp7eh8f23PnXXuVRD83mYvgAerSdiIx1BG41rBrTMdCqBAJlgPXql1FJPV4tFoSy09Awf+f38ic9T4UYPyrgCBCHfMdoFXX/s1BU4dPj8/rX4eqVYJBkGlhknSA3ecw1AlrezVkM1VQx7/F9/cujQ7tWFJZpG+apQlTWmvd2Cs7qqGghgCQxOU3Z3ncPOpHM5UcYEAcRXE32b+/1dO4uZTGv3KBrZPGqYFCQev68Osv6lMxOhQENLNFLOFVEThWhDEagiyoyNLOULLMHghPXi2HmA+Qf37BpfLXVu7mUpM6mBxkhLoM5pofFcVYUznwlAoVhVahWZYs9NTahCOpmKz61kvvKle3u7OtoGD6EWm3v/A487GzrrPe6vfOs+BI7rU9OmgcF/CjyPEdjG+sbAts37Dx4ONwSGRrYObR84/ck5AEo+rxveGLw+0H9LDBIVnFlIknK5WEGHcAMirR6OpvOZAkoQL756+uL5yzB/Fy9etvkaH/35O6zd938CDAB5qvlrJja8DwAAAABJRU5ErkJggg=="

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageForPlatformContainer = __webpack_require__(105);
  
  var _ImageForPlatformContainer2 = _interopRequireDefault(_ImageForPlatformContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_ImageForPlatformContainer2.default, {});
  
  exports.default = {
    path: '/imageForPlatform',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageForPlatform = __webpack_require__(106);
  
  var _ImageForPlatform2 = _interopRequireDefault(_ImageForPlatform);
  
  var _reactRedux = __webpack_require__(51);
  
  var _imageList = __webpack_require__(96);
  
  var _breadcumb = __webpack_require__(93);
  
  var _deployService = __webpack_require__(108);
  
  var _imageListSelector = __webpack_require__(97);
  
  var _imageListSelector2 = _interopRequireDefault(_imageListSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _imageListSelector2.default)();
    return {
      imageList: selector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onImageList: function onImageList(flag) {
        dispatch((0, _imageList.fetchImageListAction)(flag));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      goToConfigContainer: function goToConfigContainer(obj) {
        dispatch((0, _deployService.goToConfigContainer)(obj));
      }
    };
  };
  
  var ImageForPlatformContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ImageForPlatform2.default);
  
  exports.default = ImageForPlatformContainer;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _constants = __webpack_require__(38);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('div', {}, void 0, '\u6682\u65E0\u6570\u636E~');
  
  var _ref2 = (0, _jsx3.default)('div', {
    className: 'text-center'
  }, void 0, (0, _jsx3.default)(_Loading2.default, {}));
  
  var _ref3 = (0, _jsx3.default)('span', {
    className: 'icon-collection'
  }, void 0, '\u6536\u85CF');
  
  var _ref4 = (0, _jsx3.default)('h1', {}, void 0, '\u955C\u50CF\u540D\u79F0');
  
  var _ref5 = (0, _jsx3.default)('div', {
    className: 'clearfix imgHd'
  }, void 0, (0, _jsx3.default)('span', {}, void 0, '\u955C\u50CF\u4ED3\u5E93'), (0, _jsx3.default)('a', {
    href: 'javascript:;'
  }, void 0, '\u4EC0\u4E48\u662F\u5BB9\u5668\u955C\u50CF\uFF1F'), (0, _jsx3.default)('div', {
    className: 'imgDropBox'
  }, void 0));
  
  var _ref6 = (0, _jsx3.default)('a', {
    type: 'button',
    className: 'slSearchBtn icon-select'
  }, void 0, ' ');
  
  var ImageForPlatform = function (_React$Component) {
    (0, _inherits3.default)(ImageForPlatform, _React$Component);
  
    function ImageForPlatform() {
      (0, _classCallCheck3.default)(this, ImageForPlatform);
      return (0, _possibleConstructorReturn3.default)(this, (ImageForPlatform.__proto__ || (0, _getPrototypeOf2.default)(ImageForPlatform)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ImageForPlatform, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.IMAGES_BOX_LINKER);
        this.props.onImageList(true);
      }
    }, {
      key: 'deployImage',
      value: function deployImage(ImageName, id) {
        var obj = {
          image_name: 'index.boxlinker.com/' + ImageName,
          image_id: id
        };
        this.props.goToConfigContainer(obj);
      }
    }, {
      key: 'getImageList',
      value: function getImageList() {
        var _this2 = this;
  
        var data = this.props.imageList;
        if (!data || !data.length) return _ref;
        if (data.length == 1 && data[0] == 1) return _ref2;
        var body = [];
        data.map(function (item, i) {
          body.push((0, _jsx3.default)('div', {
            className: 'imagesListItem'
          }, i, (0, _jsx3.default)('div', {
            className: 'hd'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'imagesListHd'
          }, void 0, (0, _jsx3.default)('img', {
            width: 40,
            height: 40,
            src: __webpack_require__(103),
            alt: 'img'
          })), (0, _jsx3.default)('div', {
            className: 'imagesListInfo'
          }, void 0, (0, _jsx3.default)('h1', {}, void 0, '\u955C\u50CF\u540D\u79F0 : ', (0, _jsx3.default)(_Link2.default, {
            to: '/imageDetail/' + item.uuid
          }, void 0, item.repository)), (0, _jsx3.default)('p', {}, void 0, '\u955C\u50CF\u7B80\u4ECB : ', item.detail))), (0, _jsx3.default)('div', {
            className: 'bd clearfix'
          }, void 0, _ref3, (0, _jsx3.default)(_Link2.default, {
            to: '/configContainer',
            className: 'btn btn-sm btn-primary',
            onClick: _this2.deployImage.bind(_this2, item.repository, item.uuid)
          }, void 0, '\u90E8\u7F72'))));
        });
        return body;
      }
    }, {
      key: 'getImageTopTen',
      value: function getImageTopTen(n) {
        var data = this.props.imageList;
        var body = [];
        data.map(function (item, i) {
          body.push((0, _jsx3.default)('div', {
            className: 'imagesListItem'
          }, i, (0, _jsx3.default)('div', {
            className: 'hd'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'imagesListHd'
          }, void 0, (0, _jsx3.default)('img', {
            width: 40,
            height: 40,
            src: __webpack_require__(103),
            alt: 'img'
          })), (0, _jsx3.default)('div', {
            className: 'imagesListInfo'
          }, void 0, _ref4, (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)(_Link2.default, {
            to: '/imageDetail/' + item.uuid
          }, void 0, item.repository))))));
        });
        return body.splice(0, n);
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('平台镜像');
        var panelHd = _ref5;
        return (0, _jsx3.default)('div', {
          className: 'images containerPadding'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Panel, {
          className: 'image-left',
          header: panelHd
        }, void 0, (0, _jsx3.default)('div', {
          className: 'imagesListBox'
        }, void 0, this.getImageList())), (0, _jsx3.default)('div', {
          className: 'image-right'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'imageSearch'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'search'
        }, void 0, _react2.default.createElement('input', { type: 'text', placeholder: '\u641C\u7D22\u955C\u50CF', ref: 'searchInput', className: 'slSearchInp' }), _ref6)), (0, _jsx3.default)(_reactBootstrap.Panel, {
          className: 'imagesRankingList',
          header: '\u6392\u884C\u699C'
        }, void 0, this.getImageTopTen(10))));
      }
    }]);
    return ImageForPlatform;
  }(_react2.default.Component);
  
  ImageForPlatform.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  exports.default = ImageForPlatform;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)("div", {
    className: "listRefresh icon-refresh"
  }, void 0);
  
  var Loading = function (_Component) {
    (0, _inherits3.default)(Loading, _Component);
  
    function Loading() {
      (0, _classCallCheck3.default)(this, Loading);
      return (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || (0, _getPrototypeOf2.default)(Loading)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Loading, [{
      key: "render",
      value: function render() {
        return _ref;
      }
    }]);
    return Loading;
  }(_react.Component);
  
  exports.default = Loading;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.deployImageNameAction = deployImageNameAction;
  exports.goToConfigContainer = goToConfigContainer;
  exports.deployContainerAction = deployContainerAction;
  exports.goToService = goToService;
  exports.deploySeniorAction = deploySeniorAction;
  exports.addPortAction = addPortAction;
  exports.delPortAction = delPortAction;
  exports.addSaveAction = addSaveAction;
  exports.delSaveAction = delSaveAction;
  exports.delEnvAction = delEnvAction;
  exports.addEnvAction = addEnvAction;
  exports.isDeploy = isDeploy;
  exports.clearDeployData = clearDeployData;
  exports.fetchDeployServiceAction = fetchDeployServiceAction;
  
  var _constants = __webpack_require__(38);
  
  var _route = __webpack_require__(58);
  
  var _header = __webpack_require__(80);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(78);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function deployImageNameAction(obj) {
    return {
      type: _constants.DEPLOY_SVC_IMAGE,
      payload: obj
    };
  }
  
  function goToConfigContainer(obj) {
    return function (dispatch) {
      dispatch(deployImageNameAction(obj));
      dispatch((0, _route.navigate)("/configContainer"));
    };
  }
  
  function deployContainerAction(data) {
    return {
      type: _constants.DEPLOY_SVC_CONTAINER,
      payload: data
    };
  }
  
  function goToService() {
    return function (dispatch) {
      dispatch((0, _route.navigate)('/addService'));
    };
  }
  
  function deploySeniorAction(data) {
    return {
      type: _constants.DEPLOY_SVC_SENIOR,
      payload: data
    };
  }
  
  function addPortAction() {
    return {
      type: _constants.ADD_PORT
    };
  }
  function delPortAction(item) {
    return {
      type: _constants.DEL_PORT,
      payload: item
    };
  }
  function addSaveAction() {
    return {
      type: _constants.ADD_SAVE
    };
  }
  function delSaveAction(item) {
    return {
      type: _constants.DEL_SAVE,
      payload: item
    };
  }
  function delEnvAction(item) {
    return {
      type: _constants.DEL_ENV,
      payload: item
    };
  }
  
  function addEnvAction() {
    return {
      type: _constants.ADD_ENV
    };
  }
  
  function isDeploy(state) {
    return {
      type: _constants.IS_BTN_STATE.deploy,
      payload: state
    };
  }
  
  function clearDeployData() {
    return {
      type: _constants.CLEAR_DEPLOY_DATA
    };
  }
  
  function fetchDeployServiceAction(data) {
    var container_cpu = _constants.CPU[data.containerDeploy].x,
        container_memory = _constants.CPU[data.containerDeploy].m;
    data.container_cpu = container_cpu;
    data.container_memory = container_memory;
    if (data.env[0].env_key == "") {
      data.env = "";
    }
    if (data.volume[0].disk_name == -1) {
      data.volume = "";
    }
    delete data.containerDeploy;
    var myInit = {
      method: "POST",
      headers: { token: localStorage.getItem("_at") },
      body: (0, _stringify2.default)(data)
    };
    console.log((0, _stringify2.default)(data));
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isDeploy(false));
      return (0, _isomorphicFetch2.default)(_constants.API_SERVICE_URL + '/' + data.service_name, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log('>>>>>', json);
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isDeploy(true));
        if (json.status == 0) {
          dispatch(clearDeployData());
          dispatch((0, _route.navigate)('/serviceList/' + data.service_name + '/3'));
        } else if (json.status == 301) {
          dispatch((0, _notification.receiveNotification)({ message: "部署失败:服务名称已存在", level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "部署失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error("部署失败", json);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isDeploy(true));
        console.error("部署失败", e);
      });
    };
  }

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageForMyContainer = __webpack_require__(110);
  
  var _ImageForMyContainer2 = _interopRequireDefault(_ImageForMyContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_ImageForMyContainer2.default, {});
  
  exports.default = {
    path: '/imageForMy',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageForMy = __webpack_require__(111);
  
  var _ImageForMy2 = _interopRequireDefault(_ImageForMy);
  
  var _reactRedux = __webpack_require__(51);
  
  var _imageList = __webpack_require__(96);
  
  var _imageListSelector = __webpack_require__(97);
  
  var _imageListSelector2 = _interopRequireDefault(_imageListSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _deployService = __webpack_require__(108);
  
  var _building = __webpack_require__(113);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _imageListSelector2.default)();
    return {
      imageList: selector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onImageList: function onImageList() {
        dispatch((0, _imageList.fetchImageListAction)());
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      goToConfigContainer: function goToConfigContainer(obj) {
        dispatch((0, _deployService.goToConfigContainer)(obj));
      },
      onDeleteImage: function onDeleteImage(name, keyList) {
        dispatch((0, _building.onDeleteImageAction)(name, keyList));
      }
    };
  };
  
  var ImageForMyContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ImageForMy2.default);
  
  exports.default = ImageForMyContainer;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _constants = __webpack_require__(38);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(112);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('div', {}, void 0, '\u6682\u65E0\u6570\u636E~');
  
  var _ref2 = (0, _jsx3.default)('div', {
    className: 'text-center'
  }, void 0, (0, _jsx3.default)(_Loading2.default, {}));
  
  var _ref3 = (0, _jsx3.default)('span', {
    className: 'icon-collection'
  }, void 0, '\u6536\u85CF');
  
  var _ref4 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '1'
  }, void 0, '\u7F16\u8F91');
  
  var _ref5 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '2'
  }, void 0, '\u5220\u9664');
  
  var _ref6 = (0, _jsx3.default)('h1', {}, void 0, '\u955C\u50CF\u540D\u79F0');
  
  var _ref7 = (0, _jsx3.default)('div', {
    className: 'clearfix imgHd'
  }, void 0, (0, _jsx3.default)('span', {}, void 0, '\u955C\u50CF\u4ED3\u5E93'), (0, _jsx3.default)('a', {
    href: 'javascript:;'
  }, void 0, '\u4EC0\u4E48\u662F\u5BB9\u5668\u955C\u50CF\uFF1F'), (0, _jsx3.default)('div', {
    className: 'imgDropBox'
  }));
  
  var _ref8 = (0, _jsx3.default)('a', {
    type: 'button',
    className: 'slSearchBtn icon-select'
  }, void 0, ' ');
  
  var ImageForMy = function (_React$Component) {
    (0, _inherits3.default)(ImageForMy, _React$Component);
  
    function ImageForMy() {
      (0, _classCallCheck3.default)(this, ImageForMy);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (ImageForMy.__proto__ || (0, _getPrototypeOf2.default)(ImageForMy)).call(this));
  
      _this.state = {
        delData: {}
      };
      return _this;
    }
  
    (0, _createClass3.default)(ImageForMy, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.IMAGES_MY);
        this.props.onImageList();
      }
    }, {
      key: 'deployImage',
      value: function deployImage(ImageName, id) {
        var obj = {
          image_name: 'index.boxlinker.com/' + ImageName,
          image_id: id
        };
        this.props.goToConfigContainer(obj);
      }
    }, {
      key: 'onSelectBtn',
      value: function onSelectBtn(name, uuid, key) {
        switch (key) {
          case "1":
            this.context.store.dispatch((0, _route.navigate)('/reviseImage/' + uuid));
            break;
          case "2":
            this.setState({
              delData: {
                name: name,
                keyList: "imageList"
              }
            });
            this.refs.confirmModal.open();
            break;
        }
      }
    }, {
      key: 'getImageList',
      value: function getImageList() {
        var _this2 = this;
  
        var data = this.props.imageList;
        if (!data || !data.length) return _ref;
        if (data.length == 1 && data[0] == 1) return _ref2;
        var body = [];
        data.map(function (item, i) {
          body.push((0, _jsx3.default)('div', {
            className: 'imagesListItem'
          }, i, (0, _jsx3.default)('div', {
            className: 'hd'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'imagesListHd'
          }, void 0, (0, _jsx3.default)('img', {
            width: 40,
            height: 40,
            src: __webpack_require__(103),
            alt: 'img'
          })), (0, _jsx3.default)('div', {
            className: 'imagesListInfo'
          }, void 0, (0, _jsx3.default)('h1', {}, void 0, '\u955C\u50CF\u540D\u79F0 : ', (0, _jsx3.default)(_Link2.default, {
            to: '/imageDetail/' + item.uuid
          }, void 0, item.repository)), (0, _jsx3.default)('p', {}, void 0, '\u955C\u50CF\u7B80\u4ECB : ', item.detail))), (0, _jsx3.default)('div', {
            className: 'bd clearfix'
          }, void 0, _ref3, (0, _jsx3.default)(_reactBootstrap.SplitButton, {
            title: '\u90E8\u7F72',
            bsStyle: 'primary',
            bsSize: 'small',
            onClick: _this2.deployImage.bind(_this2, item.repository, item.uuid),
            onSelect: _this2.onSelectBtn.bind(_this2, item.repository, item.uuid),
            id: 'deploy-' + i
          }, void 0, _ref4, _ref5))));
        });
        return body;
      }
    }, {
      key: 'getImageTopTen',
      value: function getImageTopTen(n) {
        var data = this.props.imageList;
        var body = [];
        data.map(function (item, i) {
          body.push((0, _jsx3.default)('div', {
            className: 'imagesListItem'
          }, i, (0, _jsx3.default)('div', {
            className: 'hd'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'imagesListHd'
          }, void 0, (0, _jsx3.default)('img', {
            width: 40,
            height: 40,
            src: __webpack_require__(103),
            alt: 'img'
          })), (0, _jsx3.default)('div', {
            className: 'imagesListInfo'
          }, void 0, _ref6, (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)(_Link2.default, {
            to: '/imageDetail/' + item.uuid
          }, void 0, item.repository))))));
        });
        return body.splice(0, n);
      }
    }, {
      key: 'tabSelect',
      value: function tabSelect() {}
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;
  
        this.context.setTitle('我的镜像');
        var panelHd = _ref7;
        return (0, _jsx3.default)('div', {
          className: 'images containerPadding'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Panel, {
          className: 'image-left',
          header: panelHd
        }, void 0, (0, _jsx3.default)('div', {
          className: 'imagesListBox asTabs'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tabs, {
          defaultActiveKey: 1,
          onSelect: this.tabSelect.bind(this),
          id: 'asTabs'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 1,
          title: '\u6211\u7684\u955C\u50CF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTableBox TableTextLeft'
        }, void 0, this.getImageList())), (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 2,
          title: '\u6211\u7684\u6536\u85CF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTableBox TableTextLeft'
        }, void 0, this.getImageList()))))), (0, _jsx3.default)('div', {
          className: 'image-right'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'imageSearch'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'search'
        }, void 0, _react2.default.createElement('input', { type: 'text', placeholder: '\u641C\u7D22\u955C\u50CF', ref: 'searchInput', className: 'slSearchInp' }), _ref8)), (0, _jsx3.default)(_reactBootstrap.Panel, {
          className: 'imagesRankingList',
          header: '\u6392\u884C\u699C'
        }, void 0, this.getImageTopTen(10))), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u786E\u5B9A\u8981\u5220\u9664\u6B64\u955C\u50CF\u5417?',
          func: function func() {
            _this3.props.onDeleteImage(_this3.state.delData);
          },
          ref: 'confirmModal'
        }));
      }
    }]);
    return ImageForMy;
  }(_react2.default.Component);
  
  ImageForMy.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object
  };
  exports.default = ImageForMy;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)("span", {
    "aria-hidden": "true"
  }, void 0, "\xD7");
  
  var Confirm = function (_Component) {
    (0, _inherits3.default)(Confirm, _Component);
  
    function Confirm(props) {
      (0, _classCallCheck3.default)(this, Confirm);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Confirm.__proto__ || (0, _getPrototypeOf2.default)(Confirm)).call(this, props));
  
      _this.state = {
        show: false
      };
      return _this;
    }
  
    (0, _createClass3.default)(Confirm, [{
      key: "open",
      value: function open() {
        this.setState({
          show: true
        });
      }
    }, {
      key: "hide",
      value: function hide() {
        this.setState({
          show: false
        });
      }
    }, {
      key: "isOk",
      value: function isOk() {
        this.props.func();
        this.setState({
          show: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          _reactBootstrap.Modal,
          (0, _extends3.default)({}, this.props, { show: this.state.show,
            onHide: this.hide.bind(this),
            bsSize: "sm", "aria-labelledby": "contained-modal-title-sm" }),
          (0, _jsx3.default)("div", {
            className: "modal-header"
          }, void 0, (0, _jsx3.default)("button", {
            type: "button",
            onClick: this.hide.bind(this),
            className: "close",
            "aria-label": "Close"
          }, void 0, _ref), (0, _jsx3.default)("h4", {
            className: "modal-title",
            id: "contained-modal-title-sm"
          }, void 0, this.props.title)),
          (0, _jsx3.default)("div", {
            className: "modal-body"
          }, void 0, (0, _jsx3.default)("div", {
            className: "modalItem"
          }, void 0, this.props.text)),
          (0, _jsx3.default)("div", {
            className: "modal-footer"
          }, void 0, (0, _jsx3.default)("button", {
            className: "btn btn-default",
            onClick: this.hide.bind(this)
          }, void 0, "\u53D6\u6D88"), (0, _jsx3.default)("button", {
            className: "btn btn-primary",
            onClick: this.isOk.bind(this)
          }, void 0, "\u786E\u5B9A"))
        );
      }
    }]);
    return Confirm;
  }(_react.Component);
  
  exports.default = Confirm;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchGithubAuthURLAction = fetchGithubAuthURLAction;
  exports.fetchRepoListAction = fetchRepoListAction;
  exports.fetchBuildingImageListAction = fetchBuildingImageListAction;
  exports.fetchFastBuildingAction = fetchFastBuildingAction;
  exports.fetchBuildingAction = fetchBuildingAction;
  exports.refreshBuildingList = refreshBuildingList;
  exports.onDeleteImageAction = onDeleteImageAction;
  exports.fetchBuildDetail = fetchBuildDetail;
  exports.fetchReviseBuilding = fetchReviseBuilding;
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _header = __webpack_require__(80);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _route = __webpack_require__(58);
  
  var _notification = __webpack_require__(78);
  
  var _imageList = __webpack_require__(96);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveRepoListAction(data) {
    return {
      type: _constants.GET_REPO_LIST,
      payload: data
    };
  }
  
  function isBuilding(state) {
    return {
      type: _constants.IS_BTN_STATE.building,
      payload: state
    };
  }
  
  function receiveBuildingImageListAction(data) {
    return {
      type: _constants.GET_BUILDING_IMAGE_LIST,
      payload: data
    };
  }
  
  function receiveGithubAuthURLAction(url) {
    return {
      type: _constants.GET_GITHUB_AUTH_URL,
      payload: url
    };
  }
  
  function fetchGithubAuthURLAction() {
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.GITHUB_AUTH, {
        method: 'GET',
        headers: {
          token: localStorage.getItem('_at')
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          dispatch(receiveGithubAuthURLAction(json.result.msg));
        } else {
          console.error('fetchGithubAuthURLAction error: ', json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error('fetchGithubAuthURLAction error:', e);
      });
    };
  }
  
  function fetchRepoListAction(key, refresh) {
    var parameter = refresh == true ? "?refresh=true" : "";
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.REPOS + parameter, {
        method: 'GET',
        headers: {
          token: localStorage.getItem('_at'),
          varbox: key
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          dispatch(receiveRepoListAction(json.result));
        } else {
          console.error('fetch repos error: ', json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        console.error('fetch reopos error:', e);
        dispatch((0, _header.isLoadingAction)(false));
      });
    };
  }
  
  function fetchBuildingImageListAction() {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.IMAGE + "?is_code=true", myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        dispatch((0, _header.isLoadingAction)(false));
        if (json.status == 0) {
          dispatch(receiveBuildingImageListAction(json.result));
        } else {
          console.error("buildingImageList error", json);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(true));
        console.error("buildingImageList error", e);
      });
    };
  }
  
  function fetchFastBuildingAction(obj) {
    var myInit = {
      method: "PUT",
      headers: {
        token: localStorage.getItem("_at"),
        varbox: obj.id
      }
  
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.BUILDING, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        dispatch((0, _header.isLoadingAction)(false));
        console.log("快速构建返回值", json);
        if (json.status == 0) {
          if (obj.flag == "list") {
            dispatch((0, _route.navigate)('/building/' + obj.id));
          } else {
            dispatch(fetchBuildDetail(obj.id));
          }
        } else {
          console.error("fast building error", json);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("fast building error", e);
      });
    };
  }
  
  function fetchBuildingAction(data) {
    var body = (0, _stringify2.default)(data);
    console.log(body, ">>>>>>>>构建镜像  参数");
    var myInit = {
      method: "POST",
      headers: { token: localStorage.getItem("_at") },
      body: body
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isBuilding(false));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.IMAGE, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>>>>>构建镜像接口");
        if (json.status == 0) {
          dispatch((0, _route.navigate)('/building/' + json.result.uuid));
        } else if (json.status == 706) {
          dispatch((0, _notification.receiveNotification)({ message: "创建失败:镜像名称已存在", level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "创建失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error("building error", json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isBuilding(true));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isBuilding(true));
        console.error("building error", e);
      });
    };
  }
  
  function refreshBuildingList() {
    return {
      type: _constants.REFRESH_LIST
    };
  }
  
  function onDeleteImageAction(data) {
    var myInit = {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("_at"),
        imagename: data.name
      }
    };
    var url = _constants.FETCH_URL.IMAGE_LIST + "?imagename=" + data.name;
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log("删除镜像返回值", json);
        dispatch((0, _header.isLoadingAction)(false));
        if (json.status == 0) {
          switch (data.keyList) {
            case "myList":
              dispatch((0, _route.navigate)("/imageForMy"));
              break;
            case "imageList":
              dispatch((0, _imageList.fetchImageListAction)(false));
              break;
            case "buildingList":
              dispatch(fetchBuildingImageListAction());
              break;
            case "detail":
              dispatch((0, _route.navigate)("/building"));
              break;
          }
          dispatch((0, _notification.receiveNotification)({ message: "删除成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "删除失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          console.error("fast building error", json);
        }
      }).catch(function (e) {
        dispatch((0, _notification.receiveNotification)({ message: "程序错误", level: "danger" }));
        setTimeout(function () {
          dispatch((0, _notification.clearNotification)());
        }, 3000);
        dispatch((0, _header.isLoadingAction)(false));
        console.error("fast building error", e);
      });
    };
  }
  
  function receiveBuildingDetail(data) {
    return {
      type: Const.GET_BUILDING_DETAIL,
      payload: data
    };
  }
  
  function fetchBuildDetail(id) {
    var myInit = {
      method: "GET",
      headers: {
        token: localStorage.getItem("_at")
      }
    };
    var url = _constants.FETCH_URL.IMAGE + "?only=true&repository_id=" + id;
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        dispatch((0, _header.isLoadingAction)(false));
        console.log(json, ">>>>>构建镜像详情");
        if (json.status == 0) {
          dispatch(receiveBuildingDetail(json.result));
        } else {
          console.error("获取构建详情失败", json);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("获取构建详情失败", e);
      });
    };
  }
  
  function isReviseBuilding(state) {
    return {
      type: _constants.IS_BTN_STATE.reviseBuilding,
      payload: state
    };
  }
  
  function fetchReviseBuilding(data) {
    var body = (0, _stringify2.default)({
      dockerfile_path: data.dockerfile_path,
      repo_branch: data.repo_branch,
      auto_build: data.auto_build
    });
    var myInit = {
      method: "PUT",
      headers: {
        token: localStorage.getItem("_at")
      },
      body: body
    };
    var url = _constants.FETCH_URL.BUILDING_REVISE + "/" + data.uuid;
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isReviseBuilding(false));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log("修改镜像返回值", json);
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isReviseBuilding(true));
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "修改成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "修改失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("修改失败", e);
      });
    };
  }

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageDetailContainer = __webpack_require__(115);
  
  var _ImageDetailContainer2 = _interopRequireDefault(_ImageDetailContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/imageDetail/:uuid',
  
    action: function action(ctx, params) {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _jsx3.default)(_ImageDetailContainer2.default, {
                  uuid: params.uuid
                }));
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageDetail = __webpack_require__(116);
  
  var _ImageDetail2 = _interopRequireDefault(_ImageDetail);
  
  var _reactRedux = __webpack_require__(51);
  
  var _imageDetail = __webpack_require__(122);
  
  var _imageDetailSelector = __webpack_require__(123);
  
  var _imageDetailSelector2 = _interopRequireDefault(_imageDetailSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _deployService = __webpack_require__(108);
  
  var _building = __webpack_require__(113);
  
  var _reviseImage = __webpack_require__(124);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _imageDetailSelector2.default)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      imageDetail: selector(state),
      isBtnState: isBtnStateSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      getImageDetail: function getImageDetail(id) {
        dispatch((0, _imageDetail.fetchImageDetailAction)(id));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      onDeleteImage: function onDeleteImage(name, keyList) {
        dispatch((0, _building.onDeleteImageAction)(name, keyList));
      },
      goToConfigContainer: function goToConfigContainer(obj) {
        dispatch((0, _deployService.goToConfigContainer)(obj));
      },
      onReviseImage: function onReviseImage(data) {
        dispatch((0, _reviseImage.fetchReviseImageAction)(data));
      }
    };
  };
  
  var ImageDetailContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ImageDetail2.default);
  
  exports.default = ImageDetailContainer;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _constants = __webpack_require__(38);
  
  var _utils = __webpack_require__(117);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _Confirm = __webpack_require__(112);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '镜像详情';
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (IsPublicToggle.__proto__ || (0, _getPrototypeOf2.default)(IsPublicToggle)).call(this, props));
  
      _this.state = {
        autoStart: _this.props.state
      };
      return _this;
    }
  
    (0, _createClass3.default)(IsPublicToggle, [{
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.props.getToggle(this.state.autoStart);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          disabled: this.props.disabled,
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
    colSpan: '3'
  }, void 0, '\u6682\u65E0\u6570\u636E~'));
  
  var _ref2 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '33%'
  }, void 0, '\u955C\u50CF\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '33%'
  }, void 0, '\u7248\u672C'), (0, _jsx3.default)('th', {
    width: '34%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref3 = (0, _jsx3.default)('div', {
    className: 'text-center'
  }, void 0, (0, _jsx3.default)(_Loading2.default, {}));
  
  var _ref4 = (0, _jsx3.default)('div', {
    className: 'sdImg'
  }, void 0, (0, _jsx3.default)('img', {}));
  
  var _ref5 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '1'
  }, void 0, '\u7F16\u8F91');
  
  var _ref6 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '2'
  }, void 0, '\u5220\u9664');
  
  var _ref7 = (0, _jsx3.default)('span', {
    className: 'sdPItemName'
  }, void 0, '\u955C\u50CF\u5730\u5740:');
  
  var _ref8 = (0, _jsx3.default)('span', {
    className: 'sdPItemName'
  }, void 0, '\u62C9\u53D6\u547D\u4EE4:');
  
  var _ref9 = (0, _jsx3.default)('span', {
    className: 'sdPItemName'
  }, void 0, '\u662F\u5426\u516C\u5F00:');
  
  var _ref10 = (0, _jsx3.default)('span', {
    'aria-hidden': 'true'
  }, void 0, '\xD7');
  
  var _ref11 = (0, _jsx3.default)('h4', {
    className: 'modal-title',
    id: 'contained-modal-title-sm'
  }, void 0, '\u62C9\u53D6\u7248\u672C: latest\u6269\u5BB9');
  
  var _ref12 = (0, _jsx3.default)('p', {
    className: 'idModalFirst'
  }, void 0, '\u62C9\u53D6\u547D\u4EE4:');
  
  var _ref13 = (0, _jsx3.default)(_reactBootstrap.FormControl, {
    type: 'text',
    placeholder: ''
  });
  
  var _ref14 = (0, _jsx3.default)('p', {
    className: 'idModalLast'
  }, void 0, '\u62C9\u53D6\u955C\u50CF\u524D\u8BF7\u5148\u767B\u5F55: docker login daocloud.io');
  
  var _ref15 = (0, _jsx3.default)(_reactBootstrap.Button, {
    bsStyle: 'primary'
  }, void 0, '\u590D\u5236');
  
  var ImageDetail = function (_Component2) {
    (0, _inherits3.default)(ImageDetail, _Component2);
  
    function ImageDetail(props) {
      (0, _classCallCheck3.default)(this, ImageDetail);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (ImageDetail.__proto__ || (0, _getPrototypeOf2.default)(ImageDetail)).call(this, props));
  
      _this2.state = {
        show: false,
        isPublic: 1,
        delData: {}
      };
      return _this2;
    }
  
    (0, _createClass3.default)(ImageDetail, [{
      key: 'showModal',
      value: function showModal() {
        this.setState({ show: true });
      }
    }, {
      key: 'hideModal',
      value: function hideModal() {
        this.setState({ show: false });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var uuid = this.props.uuid;
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.IMAGE_DETAIL);
        this.props.getImageDetail(uuid);
      }
    }, {
      key: 'deployImage',
      value: function deployImage(ImageName) {
        var obj = {
          image_name: 'index.boxlinker.com/' + ImageName,
          image_id: this.props.uuid
        };
        this.props.goToConfigContainer(obj);
      }
    }, {
      key: 'selectImage',
      value: function selectImage(name, uuid, key) {
        switch (key) {
          case "1":
            this.context.store.dispatch((0, _route.navigate)('/reviseImage/' + this.props.uuid));
            break;
          case "2":
            this.setState({
              delData: {
                name: name,
                keyList: "myList"
              }
            });
            this.refs.confirmModal.open();
            break;
        }
      }
    }, {
      key: 'getLines',
      value: function getLines() {
        var _this3 = this;
  
        var data = this.props.imageDetail;
        var tags = data.tags || [];
        if (!tags.length) return _ref;
        return tags.map(function (item, i) {
          return (0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, data.repository), (0, _jsx3.default)('td', {}, void 0, item.tag), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)(_reactBootstrap.SplitButton, {
            onClick: _this3.deployImage.bind(_this3, data.repository),
            bsStyle: 'primary',
            title: '\u90E8\u7F72',
            id: 'building-table-line-' + i
          }, void 0, (0, _jsx3.default)(_reactBootstrap.MenuItem, {
            eventKey: '1',
            onClick: _this3.showModal.bind(_this3)
          }, void 0, '\u62C9\u53D6'))));
        });
      }
    }, {
      key: 'getVersion',
      value: function getVersion() {
        return (0, _jsx3.default)('div', {
          className: 'building-table'
        }, void 0, (0, _jsx3.default)('table', {
          className: 'table table-hover table-bordered'
        }, void 0, _ref2, (0, _jsx3.default)('tbody', {}, void 0, this.getLines())));
      }
    }, {
      key: 'getToggleValue',
      value: function getToggleValue(obj, value) {
        console.log(value, obj);
        var flag = !value ? 1 : 0; //1 true  0 false
        this.setState({
          isPublic: flag
        });
        var repository = obj.repository,
            detail = obj.detail,
            short_description = obj.short_description,
            isPublic = String(flag);
        var data = {
          is_public: isPublic,
          short_description: short_description,
          detail: detail,
          repository: repository,
          is_code: "0",
          uuid: this.props.uuid
        };
        console.log(data);
        this.props.onReviseImage(data);
      }
    }, {
      key: 'building',
      value: function building() {}
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;
  
        this.context.setTitle(title);
        var data = this.props.imageDetail;
        if (!data.repository) return _ref3;
        var tag = data.image_tag ? ':' + data.image_tag : ":latest";
        return (0, _jsx3.default)('div', {
          className: 'containerBgF containerPadding'
        }, data.is_public, (0, _jsx3.default)('div', {
          className: 'sdHd'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'sdInfo'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'sdTitle'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'sdTitleItem'
        }, void 0, '\u955C\u50CF\u540D\u79F0:', (0, _jsx3.default)('span', {}, void 0, data.repository)), (0, _jsx3.default)('div', {
          className: 'sdTitleItem'
        }, void 0, '\u6700\u8FD1\u90E8\u7F72\u65F6\u95F4:', (0, _jsx3.default)('span', {
          className: 'color999'
        }, void 0, (0, _utils.timeRange)(new Date(data.update_time)))), (0, _jsx3.default)('div', {
          className: 'sdTitleItem imageDetail_lastItem'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.SplitButton, {
          onClick: this.deployImage.bind(this, data.repository, data.uuid),
          onSelect: this.selectImage.bind(this, data.repository, data.uuid),
          bsStyle: 'primary',
          title: '\u90E8\u7F72\u6700\u65B0\u7248\u672C',
          id: 'building-table-line'
        }, void 0, _ref5, _ref6))), (0, _jsx3.default)('div', {
          className: 'sdPBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'sdPItem'
        }, void 0, _ref7, (0, _jsx3.default)('a', {
          href: 'http://index.boxlinker.com/' + data.repository,
          target: '_blank',
          className: 'aLink'
        }, void 0, 'http://index.boxlinker.com/' + data.repository)), (0, _jsx3.default)('div', {
          className: 'sdPItem'
        }, void 0, _ref8, (0, _jsx3.default)('span', {
          className: 'aLink'
        }, void 0, 'docker pull index.boxlinker.com/' + data.repository + tag)), (0, _jsx3.default)('div', {
          className: 'sdPItem'
        }, void 0, _ref9, (0, _jsx3.default)('span', {}, void 0, (0, _jsx3.default)(IsPublicToggle, {
          disabled: !this.props.isBtnState.building,
          state: data.is_public == 1,
          getToggle: this.getToggleValue.bind(this, data)
        })))))), (0, _jsx3.default)('div', {
          className: 'sdBd'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tabs, {
          defaultActiveKey: 1,
          id: 'sdTabs'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 1,
          title: '\u6982\u89C8'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'idTableBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'idOverview'
        }, void 0, data.detail))), (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 2,
          title: '\u7248\u672C'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'idTableBox'
        }, void 0, this.getVersion(), _react2.default.createElement(
          _reactBootstrap.Modal,
          (0, _extends3.default)({}, this.props, { show: this.state.show, onHide: this.hideModal.bind(this), bsSize: 'sm', 'aria-labelledby': 'contained-modal-title-sm' }),
          (0, _jsx3.default)('div', {
            className: 'modal-header'
          }, void 0, (0, _jsx3.default)('button', {
            type: 'button',
            className: 'close',
            'aria-label': 'Close',
            onClick: this.hideModal.bind(this)
          }, void 0, _ref10), _ref11),
          (0, _jsx3.default)('div', {
            className: 'modal-body'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'idModalBox'
          }, void 0, _ref12, _ref13, _ref14, (0, _jsx3.default)('div', {
            className: 'idModalBtnBox'
          }, void 0, _ref15, (0, _jsx3.default)(_reactBootstrap.Button, {
            bsStyle: 'default',
            onClick: this.hideModal.bind(this)
          }, void 0, '\u53D6\u6D88'))))
        ))))), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u786E\u5B9A\u8981\u5220\u9664\u6B64\u955C\u50CF\u5417?',
          func: function func() {
            _this4.props.onDeleteImage(_this4.state.delData);
          },
          ref: 'confirmModal'
        }));
      }
    }]);
    return ImageDetail;
  }(_react.Component);
  
  ImageDetail.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  exports.default = ImageDetail;

/***/ },
/* 117 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.timeRange = timeRange;
  exports.timeFormat = timeFormat;
  
  var MIN = 60 * 1000;
  var HOUR = 60 * MIN;
  var DAY = 24 * HOUR;
  var MONTH = 31 * DAY;
  var YEAR = 365 * DAY;
  
  function timeRange(date) {
    if (!date || !date.getTime) return "N/A";
    var _t = new Date().getTime() - date.getTime();
    if (!_t) return "N/A";
    if (_t < MIN) return "1分钟内";
    if (_t < HOUR) {
      return Math.ceil(_t / MIN) + "分钟前";
    }
    if (_t < DAY) return Math.ceil(_t / HOUR) + "小时前";
    if (_t < MONTH) return Math.ceil(_t / DAY) + "天前";
    if (_t < YEAR) return Math.ceil(_t / MONTH) + "月前";
    if (_t >= YEAR) return Math.ceil(_t / YEAR) + "年前";
  }
  
  function timeFormat(times, flag) {
    var date = new Date(times);
    if (!date) return "N/A";
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var today = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    var hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    var minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    var seconds = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    switch (flag) {
      case "hh:mm:ss":
        return hours + ":" + minutes + ":" + seconds;
        break;
      default:
        return year + "-" + month + "-" + today + " " + hours + ":" + minutes + ":" + seconds;
    }
  }

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _assign = __webpack_require__(20);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _interopRequire = function _interopRequire(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
  
  var _extends = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };
  
  var React = _interopRequire(__webpack_require__(10));
  
  var classNames = _interopRequire(__webpack_require__(66));
  
  var Check = _interopRequire(__webpack_require__(119));
  
  var X = _interopRequire(__webpack_require__(120));
  
  var PureRenderMixin = _interopRequire(__webpack_require__(121));
  
  module.exports = React.createClass({
    mixins: [PureRenderMixin],
  
    displayName: "Toggle",
  
    getInitialState: function getInitialState() {
      var checked = false;
      if ("checked" in this.props) {
        checked = this.props.checked;
      } else if ("defaultChecked" in this.props) {
        checked = this.props.defaultChecked;
      }
      return {
        checked: !!checked,
        hasFocus: false
      };
    },
  
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ("checked" in nextProps) {
        this.setState({ checked: !!nextProps.checked });
      }
    },
  
    handleClick: function handleClick(event) {
      var checkbox = this.refs.input;
      if (event.target !== checkbox) {
        event.preventDefault();
        checkbox.focus();
        checkbox.click();
        return;
      }
  
      if (!("checked" in this.props)) {
        this.setState({ checked: checkbox.checked });
      }
    },
  
    handleFocus: function handleFocus() {
      this.setState({ hasFocus: true });
    },
  
    handleBlur: function handleBlur() {
      this.setState({ hasFocus: false });
    },
  
    render: function render() {
      var classes = classNames("react-toggle", {
        "react-toggle--checked": this.state.checked,
        "react-toggle--focus": this.state.hasFocus,
        "react-toggle--disabled": this.props.disabled
      });
  
      return React.createElement("div", { className: classes, onClick: this.handleClick }, React.createElement("div", { className: "react-toggle-track" }, React.createElement("div", { className: "react-toggle-track-check" }, React.createElement(Check, null)), React.createElement("div", { className: "react-toggle-track-x" }, React.createElement(X, null))), React.createElement("div", { className: "react-toggle-thumb" }), React.createElement("input", _extends({
        ref: "input",
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        className: "react-toggle-screenreader-only",
        type: "checkbox"
      }, this.props)));
    }
  });

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function _interopRequire(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
  
  var React = _interopRequire(__webpack_require__(10));
  
  module.exports = React.createClass({
    displayName: "check.es6",
  
    render: function render() {
      return React.createElement("span", null, 'on'
      // { width: "14", height: "11", viewBox: "0 0 14 11" },
      // React.createElement(
      //   "title",
      //   null,
      //   "switch-check"
      // ),
      // React.createElement("path", { d: "M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0", fill: "#fff", fillRule: "evenodd" })
      );
    }
  });

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function _interopRequire(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
  
  var React = _interopRequire(__webpack_require__(10));
  
  module.exports = React.createClass({
    displayName: "x.es6",
  
    render: function render() {
      return React.createElement("span", null, "off"
      // { width: "10", height: "10", viewBox: "0 0 10 10" },
      // React.createElement(
      //   "title",
      //   null,
      //   "switch-x"
      // ),
      // React.createElement("path", { d:
      //   "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12", fill: "#828890", fillRule: "evenodd" })
      );
    }
  });

/***/ },
/* 121 */
/***/ function(module, exports) {

  module.exports = require("react-addons-pure-render-mixin");

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fetchImageDetailAction = fetchImageDetailAction;
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(80);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function receiveImageDetail(data) {
    return {
      type: Const.GET_IMAGE_DETAIL,
      payload: data
    };
  }
  
  function fetchImageDetailAction(id) {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    },
        url = Const.FETCH_URL.IMAGE + "?only=true&repository_id=" + id;
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          dispatch(receiveImageDetail(json.result));
        } else {
          console.error(json);
        }
        dispatch((0, _header.isLoadingAction)(false));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        console.error("imageDetail is error", e);
      });
    };
  }

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getImageDetail
  var getImageDetail = function getImageDetail(state) {
    return state.imageDetail;
  };
  
  var makeGetImageDetail = function makeGetImageDetail() {
    return (0, _reselect.createSelector)([getImageDetail], function (imageDetail) {
      return imageDetail;
    });
  };
  
  exports.default = makeGetImageDetail;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchReviseImageAction = fetchReviseImageAction;
  
  var _constants = __webpack_require__(38);
  
  var _header = __webpack_require__(80);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(78);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isBuilding(state) {
    return {
      type: _constants.IS_BTN_STATE.building,
      payload: state
    };
  } /**
     * Created by zhangsai on 16/10/10.
     */
  function fetchReviseImageAction(data) {
    var body = (0, _stringify2.default)(data);
    console.log(body, ">>>>>>修改镜像  参数");
    var myInit = {
      method: "PUT",
      headers: {
        token: localStorage.getItem("_at")
      },
      body: body
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isBuilding(false));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.IMAGE, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          console.log(json, "修改镜像 返回值");
          dispatch((0, _notification.receiveNotification)({ message: "修改成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "修改失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error("createImage error", json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isBuilding(true));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isBuilding(true));
        console.error("createImage error", e);
      });
    };
  }

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getIsBtnState = function getIsBtnState(state) {
    return state.isBtnState;
  };
  
  var makeIsBtnStateSelector = function makeIsBtnStateSelector() {
    return (0, _reselect.createSelector)([getIsBtnState], function (isBtnState) {
      return isBtnState;
    });
  };
  
  exports.default = makeIsBtnStateSelector;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _CreateImageContainer = __webpack_require__(127);
  
  var _CreateImageContainer2 = _interopRequireDefault(_CreateImageContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_CreateImageContainer2.default, {});
  
  exports.default = {
    path: '/createImage',
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _CreateImage = __webpack_require__(128);
  
  var _CreateImage2 = _interopRequireDefault(_CreateImage);
  
  var _reactRedux = __webpack_require__(51);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _createImage = __webpack_require__(133);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      isBtnState: isBtnStateSelector(state)
    };
  }; /**
      * Created by zhangsai on 16/10/10.
      */
  
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      onCreateImage: function onCreateImage(data) {
        dispatch((0, _createImage.fetchCreateImageAction)(data));
      }
    };
  };
  
  var CreateImageContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_CreateImage2.default);
  
  exports.default = CreateImageContainer;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _constants = __webpack_require__(38);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (IsPublicToggle.__proto__ || (0, _getPrototypeOf2.default)(IsPublicToggle)).call(this, props));
  
      _this.state = {
        autoStart: _this.props.state
      };
      return _this;
    }
  
    (0, _createClass3.default)(IsPublicToggle, [{
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.props.getToggle(this.state.autoStart);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, '\u65B0\u5EFA\u955C\u50CF');
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '\u955C\u50CF\u662F\u670D\u52A1\u8FD0\u884C\u7684\u6A21\u677F, \u6765\u6E90\u4E8E\u4EE3\u7801, \u57FA\u4E8E Dockerfile \u6784\u5EFA, \u9ED8\u8BA4\u76EE\u5F55\u5728\u6839\'/\'\u4E0B, \u6587\u4EF6\u540D Dockerfile .');
  
  var _ref3 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u540D\u79F0',
    titleEnglish: 'IMAGE NAME',
    titleInfo: '\u9ED8\u8BA4\u4F1A\u4E0E\u60A8\u4E0B\u65B9\u4EE3\u7801\u6E90\u7684\u9879\u76EE\u540D\u79F0\u76F8\u540C'
  });
  
  var _ref4 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u7B80\u4ECB',
    titleEnglish: 'IMAGE SUMMARY',
    titleInfo: '\u7B80\u5355\u4ECB\u7ECD\u955C\u50CF\u7684\u4FE1\u606F'
  });
  
  var _ref5 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u8BE6\u7EC6\u63CF\u8FF0',
    titleEnglish: 'IMAGE DETAIL',
    titleInfo: '\u8BE6\u7EC6\u4ECB\u7ECD\u955C\u50CF\u7684\u4FE1\u606F'
  });
  
  var _ref6 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u662F\u5426\u516C\u5F00',
    titleEnglish: 'IS PUBLIC',
    titleInfo: '\u516C\u5F00\u540E\u90FD\u53EF\u4EE5\u8BBF\u95EE'
  });
  
  var CreateImage = function (_React$Component) {
    (0, _inherits3.default)(CreateImage, _React$Component);
  
    function CreateImage() {
      (0, _classCallCheck3.default)(this, CreateImage);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (CreateImage.__proto__ || (0, _getPrototypeOf2.default)(CreateImage)).call(this));
  
      _this2.state = {
        isImageName: false,
        isPublic: 1
      };
      return _this2;
    }
  
    (0, _createClass3.default)(CreateImage, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.CREATE_IMAGE);
      }
    }, {
      key: 'onImageNameChange',
      value: function onImageNameChange() {
        var imageName = _reactDom2.default.findDOMNode(this.refs.repository),
            imageTip = _reactDom2.default.findDOMNode(this.refs.image_name_tip),
            regExp = /^[a-z]+[a-z0-9_-]*$/;
        if (!regExp.test(imageName.value) && imageName.value != "") {
          this.setState({
            isImageName: true
          });
          imageTip.innerHTML = _constants.INPUT_TIP.image.Format;
        } else {
          this.setState({
            isImageName: false
          });
        }
      }
    }, {
      key: 'building',
      value: function building() {
        var imageName = _reactDom2.default.findDOMNode(this.refs.repository),
            imageTip = _reactDom2.default.findDOMNode(this.refs.image_name_tip);
        if (imageName.value == "") {
          this.setState({
            isImageName: true
          });
          imageName.focus();
          imageTip.innerHTML = _constants.INPUT_TIP.image.Null;
          return false;
        }
        if (!this.state.isImageName) {
          var repository = _reactDom2.default.findDOMNode(this.refs.repository).value,
              detail = _reactDom2.default.findDOMNode(this.refs.image_detail).value,
              short_description = _reactDom2.default.findDOMNode(this.refs.short_description).value,
              isPublic = String(this.state.isPublic);
          var data = {
            is_public: isPublic,
            short_description: short_description,
            detail: detail,
            repository: repository,
            is_code: "0"
          };
          this.props.onCreateImage(data);
        }
      }
    }, {
      key: 'getToggleValue',
      value: function getToggleValue(value) {
        var flag = !value ? 1 : 0; //1 true  0 false
        this.setState({
          isPublic: flag
        });
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('新建镜像');
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'acBox'
        }, void 0, _ref, _ref2, (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'assBox ' + (this.state.isImageName ? "has-error" : "")
        }, void 0, _react2.default.createElement('input', {
          type: 'text',
          placeholder: '',
          className: 'form-control',
          ref: 'repository',
          onChange: this.onImageNameChange.bind(this)
        }), _react2.default.createElement(
          'span',
          { className: 'inputTip', ref: 'image_name_tip' },
          '\u955C\u50CF\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A'
        ))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement('textarea', {
          placeholder: '\u955C\u50CF\u7B80\u4ECB',
          className: 'form-control',
          defaultValue: '',
          ref: 'image_detail'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref5, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement('textarea', {
          placeholder: '\u8BE6\u7EC6\u63CF\u8FF0',
          className: 'form-control',
          defaultValue: '',
          ref: 'short_description'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref6, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)(IsPublicToggle, {
          state: true,
          getToggle: this.getToggleValue.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'acBtn'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.building.bind(this),
          disabled: !this.props.isBtnState.building
        }, void 0, this.props.isBtnState.building ? "新建" : "新建中...")))));
      }
    }]);
    return CreateImage;
  }(_react2.default.Component);
  
  CreateImage.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object,
    setBreadcrumb: _react2.default.PropTypes.func
  };
  exports.default = CreateImage;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var HeadLine = _react2.default.createClass({
    displayName: 'HeadLine',
  
    getDefaultProps: function getDefaultProps() {
      return {
        title: "选择镜像",
        titleEnglish: "SELECT MIRROR",
        titleInfo: "这里里汇聚了构建产生的所有容器云镜像"
      };
    },
    render: function render() {
      return (0, _jsx3.default)('div', {
        className: _HeadLine2.default.hlBox
      }, void 0, (0, _jsx3.default)('h1', {
        className: _HeadLine2.default.hlHd
      }, void 0, (0, _jsx3.default)('span', {
        className: _HeadLine2.default.hlFirstTitle
      }, void 0, this.props.title), (0, _jsx3.default)('span', {
        className: _HeadLine2.default.hlSecondTitle
      }, void 0, this.props.titleEnglish)), (0, _jsx3.default)('p', {
        className: _HeadLine2.default.hlPresent
      }, void 0, this.props.titleInfo));
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = (0, _withStyles2.default)(_HeadLine2.default)(HeadLine);

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(131);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "._2bTQ{height:40px;padding-left:15px;position:relative}._2bTQ:before{content:\"\";display:inline-block;position:absolute;height:35px;width:5px;background:#2dafdf;left:0;top:2px}._2xxL{height:18px;line-height:18px}._2xxL span{vertical-align:top}._1GpL{font-size:16px;color:#333}._2l6l{margin-left:10px;color:#999}._2l6l,.n_83{font-size:12px}.n_83{margin-top:5px;color:#666}", ""]);
  
  // exports
  exports.locals = {
  	"hlBox": "_2bTQ",
  	"hlHd": "_2xxL",
  	"hlFirstTitle": "_1GpL",
  	"hlSecondTitle": "_2l6l",
  	"hlPresent": "n_83"
  };

/***/ },
/* 132 */
/***/ function(module, exports) {

  module.exports = require("react-dom");

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchCreateImageAction = fetchCreateImageAction;
  
  var _constants = __webpack_require__(38);
  
  var _header = __webpack_require__(80);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(78);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isBuilding(state) {
    return {
      type: _constants.IS_BTN_STATE.building,
      payload: state
    };
  } /**
     * Created by zhangsai on 16/10/10.
     */
  function fetchCreateImageAction(data) {
    var body = (0, _stringify2.default)(data);
    console.log(body, ">>>>>>新建镜像  参数");
    var myInit = {
      method: "POST",
      headers: {
        token: localStorage.getItem("_at")
      },
      body: body
    };
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      dispatch(isBuilding(false));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.IMAGE, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          console.log(json, "新建镜像 返回值");
          dispatch((0, _notification.receiveNotification)({ message: "创建成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch((0, _route.navigate)('/imageDetail/' + json.result.uuid));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "创建失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 5000);
          console.error("createImage error", json);
        }
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isBuilding(true));
      }).catch(function (e) {
        dispatch((0, _header.isLoadingAction)(false));
        dispatch(isBuilding(true));
        console.error("createImage error", e);
      });
    };
  }

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BuildingDetailContainer = __webpack_require__(135);
  
  var _BuildingDetailContainer2 = _interopRequireDefault(_BuildingDetailContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/building/:id',
  
    action: function action(c, params) {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _jsx3.default)(_BuildingDetailContainer2.default, {
                  projectId: params.id
                }));
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _BuildingDetail = __webpack_require__(136);
  
  var _BuildingDetail2 = _interopRequireDefault(_BuildingDetail);
  
  var _reactRedux = __webpack_require__(51);
  
  var _breadcumb = __webpack_require__(93);
  
  var _building = __webpack_require__(113);
  
  var _buildingDetailSelector = __webpack_require__(138);
  
  var _buildingDetailSelector2 = _interopRequireDefault(_buildingDetailSelector);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var buildingDetail = (0, _buildingDetailSelector2.default)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      buildingDetail: buildingDetail(state),
      isBtnState: isBtnStateSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onFastBuilding: function onFastBuilding(id) {
        dispatch((0, _building.fetchFastBuildingAction)(id));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      getBuildingDetail: function getBuildingDetail(id) {
        dispatch((0, _building.fetchBuildDetail)(id));
      },
      onDeleteImage: function onDeleteImage(name, keyList) {
        dispatch((0, _building.onDeleteImageAction)(name, keyList));
      },
      reviseBuilding: function reviseBuilding(data) {
        dispatch((0, _building.fetchReviseBuilding)(data));
      }
    };
  };
  
  var BuildingDetailContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_BuildingDetail2.default);
  
  exports.default = BuildingDetailContainer;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _Logs = __webpack_require__(137);
  
  var _Logs2 = _interopRequireDefault(_Logs);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _constants = __webpack_require__(38);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsAutoBuildToggle = function (_Component) {
    (0, _inherits3.default)(IsAutoBuildToggle, _Component);
  
    function IsAutoBuildToggle(props) {
      (0, _classCallCheck3.default)(this, IsAutoBuildToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (IsAutoBuildToggle.__proto__ || (0, _getPrototypeOf2.default)(IsAutoBuildToggle)).call(this, props));
  
      _this.state = {
        autoStart: _this.props.state
      };
      return _this;
    }
  
    (0, _createClass3.default)(IsAutoBuildToggle, [{
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.props.getToggle(this.state.autoStart);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsAutoBuildToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)(_reactBootstrap.Col, {
    sm: 2
  }, void 0, '\u955C\u50CF\u540D\u79F0');
  
  var _ref2 = (0, _jsx3.default)(_reactBootstrap.Col, {
    sm: 2
  }, void 0, 'Dockerfile\u4F4D\u7F6E');
  
  var _ref3 = (0, _jsx3.default)(_reactBootstrap.Col, {
    sm: 2
  }, void 0, '\u9ED8\u8BA4\u4EE3\u7801\u5206\u652F');
  
  var _ref4 = (0, _jsx3.default)(_reactBootstrap.Col, {
    sm: 2
  }, void 0, '\u81EA\u52A8\u6784\u5EFA');
  
  var _ref5 = (0, _jsx3.default)(_reactBootstrap.Col, {
    sm: 2
  }, void 0);
  
  var _ref6 = (0, _jsx3.default)('p', {}, void 0, '*\u5220\u9664\u9879\u76EE\u5C06\u6E05\u9664\u9879\u76EE\u76F8\u5173\u6570\u636E\uFF0C\u8BF7\u614E\u91CD\u9009\u62E9\uFF01 ');
  
  var _ref7 = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref8 = (0, _jsx3.default)('div', {
    className: 'media-left'
  }, void 0, (0, _jsx3.default)('img', {
    width: 65,
    height: 65,
    src: '/avatar.png',
    alt: 'Image'
  }));
  
  var BuildingDetail = function (_React$Component) {
    (0, _inherits3.default)(BuildingDetail, _React$Component);
  
    function BuildingDetail(props) {
      (0, _classCallCheck3.default)(this, BuildingDetail);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (BuildingDetail.__proto__ || (0, _getPrototypeOf2.default)(BuildingDetail)).call(this, props));
  
      _this2.state = {
        isAutoBuilding: 1
      };
      return _this2;
    }
  
    (0, _createClass3.default)(BuildingDetail, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.BUILD_IMAGE, _constants.BREADCRUMB.IMAGE_DETAIL);
        this.props.getBuildingDetail(this.props.projectId);
        var build_status = this.props.buildingDetail.build_status;
        var my = this;
        this.myTime = setInterval(function () {
          if (my.props.buildingDetail.build_status != 2) {
            clearInterval(my.myTime);
          } else {
            my.props.getBuildingDetail(my.props.projectId);
          }
        }, 5000);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.myTime);
      }
    }, {
      key: 'fastBuilding',
      value: function fastBuilding(id) {
        var obj = {
          id: id,
          flag: "detail"
        };
        this.props.onFastBuilding(obj);
        var my = this;
        this.myTime = setInterval(function () {
          if (my.props.buildingDetail.build_status != 2) {
            clearInterval(my.myTime);
          } else {
            my.props.getBuildingDetail(my.props.projectId);
          }
        }, 5000);
      }
    }, {
      key: 'onReviseBuilding',
      value: function onReviseBuilding() {
        var dockerfile_path = _reactDom2.default.findDOMNode(this.refs.dockerfile_path).value,
            repo_branch = _reactDom2.default.findDOMNode(this.refs.repo_branch).value;
        var data = {
          dockerfile_path: dockerfile_path,
          repo_branch: repo_branch,
          auto_build: String(this.state.isAutoBuilding),
          uuid: this.props.projectId
        };
        console.log(data);
        this.props.reviseBuilding(data);
      }
    }, {
      key: 'getToggleValue',
      value: function getToggleValue(value) {
        var flag = !value ? 1 : 0; //1 true  0 false
        this.setState({
          isAutoBuilding: flag
        });
      }
    }, {
      key: 'baseSeting',
      value: function baseSeting() {
        var _this3 = this;
  
        //基本设置
        var data = [this.props.buildingDetail];
        var body = data.map(function (item) {
          return (0, _jsx3.default)('div', {
            className: 'baseSet'
          }, new Date(item.creation_time).getTime(), (0, _jsx3.default)('div', {
            className: 'baseItem'
          }, void 0, (0, _jsx3.default)(_reactBootstrap.FormGroup, {
            controlId: 'form'
          }, void 0, _ref, (0, _jsx3.default)(_reactBootstrap.Col, {
            sm: 5
          }, void 0, (0, _jsx3.default)('p', {}, void 0, item.repository)))), (0, _jsx3.default)('div', {
            className: 'baseItem'
          }, void 0, (0, _jsx3.default)(_reactBootstrap.FormGroup, {
            controlId: 'form'
          }, void 0, _ref2, (0, _jsx3.default)(_reactBootstrap.Col, {
            sm: 5
          }, void 0, _react2.default.createElement('input', { className: 'form-control', type: 'text', ref: 'dockerfile_path', defaultValue: item.dockerfile_path })))), (0, _jsx3.default)('div', {
            className: 'baseItem'
          }, void 0, (0, _jsx3.default)(_reactBootstrap.FormGroup, {
            controlId: 'form'
          }, void 0, _ref3, (0, _jsx3.default)(_reactBootstrap.Col, {
            sm: 5
          }, void 0, _react2.default.createElement('input', { className: 'form-control', type: 'text', ref: 'repo_branch', defaultValue: item.repo_branch })))), (0, _jsx3.default)('div', {
            className: 'baseItem'
          }, void 0, (0, _jsx3.default)(_reactBootstrap.FormGroup, {
            controlId: 'form'
          }, void 0, _ref4, (0, _jsx3.default)(_reactBootstrap.Col, {
            sm: 5
          }, void 0, (0, _jsx3.default)(IsAutoBuildToggle, {
            state: item.auto_build == 1,
            getToggle: _this3.getToggleValue.bind(_this3)
          })))), (0, _jsx3.default)('div', {
            className: 'baseItem'
          }, void 0, (0, _jsx3.default)(_reactBootstrap.FormGroup, {
            controlId: 'form'
          }, void 0, _ref5, (0, _jsx3.default)(_reactBootstrap.Col, {
            sm: 5
          }, void 0, (0, _jsx3.default)('button', {
            className: 'btn btn-primary ' + (!_this3.props.isBtnState.reviseBuilding ? "btn-loading" : ""),
            onClick: _this3.onReviseBuilding.bind(_this3),
            disabled: !_this3.props.isBtnState.reviseBuilding
          }, void 0, '\u786E\u8BA4\u4FEE\u6539')))));
        });
        return body;
      }
    }, {
      key: 'onDeleteBuilding',
      value: function onDeleteBuilding(id) {
        confirm("确定删除?") ? this.props.onDeleteImage(id, "detail") : "";
      }
    }, {
      key: 'handle',
      value: function handle() {
        //操作
        return (0, _jsx3.default)('div', {
          className: 'handleBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-danger',
          onClick: this.onDeleteBuilding.bind(this, this.props.projectId)
        }, void 0, '\u5220\u9664\u9879\u76EE'), _ref6);
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('构建镜像');
        var username = this.context.store.getState().user_info.user_name;
        var buildDetail = this.props.buildingDetail;
        var uuid = this.props.projectId;
        var build_status = buildDetail.build_status;
        if (buildDetail && !build_status) {
          return (0, _jsx3.default)('div', {
            style: { "textAlign": "center" }
          }, void 0, _ref7);
        }
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'cdBd'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'cbCodeInfo'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Media, {}, void 0, _ref8, (0, _jsx3.default)('div', {
          className: 'media-body'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'media-heading'
        }, void 0, '\u955C\u50CF\u540D\u79F0 :', (0, _jsx3.default)('a', {
          href: 'javascript:;',
          target: '_blank',
          className: 'aLink'
        }, void 0, 'index.boxlinker.com/' + buildDetail.repository + ':' + buildDetail.image_tag)), (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary ' + (buildDetail.build_status == 2 ? "btn-loading" : ""),
          disabled: buildDetail.build_status == 2,
          onClick: this.fastBuilding.bind(this, uuid)
        }, void 0, buildDetail.build_status == 2 ? "构建中" : "构建"))))), (0, _jsx3.default)('div', {
          className: 'cbTabs'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tabs, {
          defaultActiveKey: 1,
          id: 'cbTabs'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 1,
          title: '\u6784\u5EFA\u65E5\u5FD7'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTableBox',
          style: { "paddingTop": "30px" }
        }, void 0, (0, _jsx3.default)(_Logs2.default, {
          logLabel: 'auto_build-' + username + '-' + this.props.projectId
        }))), (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 2,
          title: '\u57FA\u672C\u8BBE\u7F6E'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTableBox'
        }, void 0, this.baseSeting())), (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 3,
          title: '\u64CD\u4F5C'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTableBox'
        }, void 0, this.handle()))))));
      }
    }]);
    return BuildingDetail;
  }(_react2.default.Component);
  
  BuildingDetail.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object
  };
  exports.default = BuildingDetail;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _reactCookie = __webpack_require__(69);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _utils = __webpack_require__(117);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _class = function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this));
  
      _this.shutByHand = false;
      _this.xhr = null;
      _this.start_time = "None";
  
      _this.state = {
        items: []
      };
      return _this;
    }
  
    (0, _createClass3.default)(_class, [{
      key: 'fetchLogs',
      value: function fetchLogs(logLabel) {
        var me = this;
        if (!logLabel) return console.info('fetch log with null label');
        var xhr = this.xhr;
        if (!xhr) return console.error('fetch log with null xhr!');
        xhr.open("post", Const.FETCH_URL.LOGS + '/' + logLabel, true);
        xhr.setRequestHeader("token", _reactCookie2.default.load("_at"));
        var offset = 0;
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 2) {}
          if (xhr.readyState == 3 && xhr.responseText) {
            var s = xhr.responseText.substring(offset);
            // console.log('log string :> ',s);
            if (s == "\n" || !s) return;
            try {
              var json = JSON.parse(s);
              console.log('log :> ', json);
              me.start_time = json.end_time;
              offset = xhr.responseText.length;
              if (json.status == 0) {
                me.setState({
                  items: [].concat(me.state.items).concat(json.result.logs_list)
                });
              } else {
                xhr.abort();
                console.info('fetch logs error: ', json);
              }
            } catch (e) {
              // console.error('fetch logs error: ',e)
            }
          }
        };
        xhr.onabort = function () {
          console.info('fetch logs abort!!!!!!');
          if (!me.shutByHand) {
            console.info('fetch logs reconnect .');
            setTimeout(function () {
              me.fetchLogs(logLabel);
            }, 100);
          } else {
            console.info('fetch logs abort by hand .');
          }
        };
        xhr.send((0, _stringify2.default)({ start_time: me.start_time }));
        return xhr;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.xhr = new XMLHttpRequest();
        this.fetchLogs(this.props.logLabel);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.shutByHand = true;
        this.xhr.abort();
        this.xhr = null;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        _reactDom2.default.findDOMNode(this.refs.list).scrollTop = 1000000;
      }
    }, {
      key: 'render',
      value: function render() {
        this.state.items.sort(function (a, b) {
          var t1 = a.time; //new Date(a.time).getTime();
          var t2 = b.time; //new Date(b.time).getTime();
          if (t1 < t2) return -1;
          if (t1 == t2) return 0;
          if (t1 > t2) return 1;
        });
        var _items = this.state.items;
        var items = _items.slice(_items.length - 100).map(function (item, i) {
          return (0, _jsx3.default)('div', {}, i, (0, _utils.timeFormat)(item.log_time), ' ', item.log_info);
        });
        return _react2.default.createElement(
          'pre',
          { ref: 'list', className: 'darken' },
          items
        );
      }
    }]);
    return _class;
  }(_react2.default.Component);
  
  exports.default = _class;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getBuildingDetail
  var getBuildingDetail = function getBuildingDetail(state) {
    return state.buildingDetail;
  };
  
  var makeGetBuildingDetail = function makeGetBuildingDetail() {
    return (0, _reselect.createSelector)([getBuildingDetail], function (buildingDetail) {
      return buildingDetail;
    });
  };
  
  exports.default = makeGetBuildingDetail;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BuildingContainer = __webpack_require__(140);
  
  var _BuildingContainer2 = _interopRequireDefault(_BuildingContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_BuildingContainer2.default, {});
  
  // import CodeBuildList from './CodeBuildList'
  
  
  exports.default = {
    path: '/building',
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _Building = __webpack_require__(141);
  
  var _Building2 = _interopRequireDefault(_Building);
  
  var _reactRedux = __webpack_require__(51);
  
  var _building = __webpack_require__(113);
  
  var _buildingImageListSelector = __webpack_require__(142);
  
  var _buildingImageListSelector2 = _interopRequireDefault(_buildingImageListSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _buildingImageListSelector2.default)();
    return {
      buildingImageList: selector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onImageList: function onImageList() {
        dispatch((0, _building.fetchBuildingImageListAction)());
      },
      onFastBuilding: function onFastBuilding(obj) {
        dispatch((0, _building.fetchFastBuildingAction)(obj));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      onClearImageList: function onClearImageList() {
        dispatch((0, _building.refreshBuildingList)());
      },
      onDeleteImage: function onDeleteImage(data) {
        dispatch((0, _building.onDeleteImageAction)(data));
      }
    };
  };
  
  var BuildingContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Building2.default);
  
  exports.default = BuildingContainer;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(112);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _utils = __webpack_require__(117);
  
  var _constants = __webpack_require__(38);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('p', {
    className: "hbPName"
  }, void 0, '\u4EE3\u7801\u6784\u5EFA');
  
  var _ref2 = (0, _jsx3.default)('p', {
    className: "hbPInfo"
  }, void 0, 'Code Build');
  
  var _ref3 = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref4 = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref5 = (0, _jsx3.default)('img', {
    className: 'mediaImg',
    src: '/slImgJx.png'
  });
  
  var _ref6 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '1'
  }, void 0, '\u5220\u9664');
  
  var _ref7 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '30%'
  }, void 0, '\u955C\u50CF\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '30%'
  }, void 0, '\u4EE3\u7801\u6E90'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u6784\u5EFA\u72B6\u6001'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u4E0A\u6B21\u6784\u5EFA\u7528\u65F6'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u6700\u8FD1\u6784\u5EFA'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u64CD\u4F5C')));
  
  var Building = function (_Component) {
    (0, _inherits3.default)(Building, _Component);
  
    function Building() {
      (0, _classCallCheck3.default)(this, Building);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Building.__proto__ || (0, _getPrototypeOf2.default)(Building)).call(this));
  
      _this.state = {
        githubModalShow: false,
        delData: {}
      };
      return _this;
    }
  
    (0, _createClass3.default)(Building, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.BUILD_IMAGE);
        this.props.onImageList();
        this.myTime = setInterval(this.props.onImageList, 10000);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.myTime);
      }
    }, {
      key: 'getAddBtn',
      value: function getAddBtn() {
        return (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbAdd", "left")
        }, void 0, (0, _jsx3.default)(_Link2.default, {
          to: "/building/create",
          className: (0, _classnames2.default)("hbAddBtn", "clearfix")
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbPlus", "left")
        }), (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbPlusInfo", "left")
        }, void 0, _ref, _ref2)));
      }
    }, {
      key: 'deleteLine',
      value: function deleteLine(name) {
        this.setState({
          delData: {
            name: name,
            keyList: "buildingList"
          }
        });
        this.refs.confirmModal.open();
      }
    }, {
      key: 'getSourceName',
      value: function getSourceName(name) {
        var _name = void 0;
        if (_name = /^https\:\/\/github.com\/([0-9a-zA-Z_-]+\/[0-9a-zA-Z_-]+)\.git$/.exec(name)) {
          var style = {
            fontSize: '18px',
            verticalAlign: 'middle',
            marginRight: '5px'
          };
          return (0, _jsx3.default)('span', {}, void 0, (0, _jsx3.default)('i', {
            className: 'icon-console',
            style: style
          }), _name[1]);
        }
        return null;
      }
    }, {
      key: 'getLines',
      value: function getLines() {
        var _this2 = this;
  
        var data = this.props.buildingImageList;
        if (!data.length) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '6',
          style: { "textAlign": "center" }
        }, void 0, '\u6682\u65E0\u6570\u636E~'));
        if (data.length == 1 && data[0] == 1) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '6',
          style: { "textAlign": "center" }
        }, void 0, _ref3));
        if (data.length == 1 && data[0] == 0) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '6',
          style: { "textAlign": "center" }
        }, void 0, _ref4));
        var body = [];
        data.map(function (item, i) {
          var buildStatus = ["还未构建", "构建成功", "构建中", "构建失败"][item.build_status];
          var buildUserTime = buildStatus == "还未构建" ? "还未构建" : Math.floor(item.use_time) + "秒";
          var prevUserTime = buildStatus == "还未构建" ? "还未构建" : (0, _utils.timeRange)(new Date(item.last_build));
          body.push((0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'mediaItem'
          }, void 0, (0, _jsx3.default)(_Link2.default, {
            to: '/building/' + item.uuid
          }, void 0, _ref5, (0, _jsx3.default)('span', {
            className: 'mediaTxt'
          }, void 0, item.repository)))), (0, _jsx3.default)('td', {}, void 0, item.src_url), (0, _jsx3.default)('td', {}, void 0, buildStatus), (0, _jsx3.default)('td', {}, void 0, buildUserTime), (0, _jsx3.default)('td', {}, void 0, prevUserTime), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)(_reactBootstrap.SplitButton, {
            onClick: _this2.fastBuilding.bind(_this2, item.uuid),
            onSelect: _this2.deleteLine.bind(_this2, item.repository),
            bsStyle: 'primary',
            title: '\u6784\u5EFA',
            id: 'building-table-line-' + i
          }, void 0, _ref6))));
        });
        return body;
      }
    }, {
      key: 'fastBuilding',
      value: function fastBuilding(id) {
        var obj = {
          id: id,
          flag: "list"
        };
        this.props.onFastBuilding(obj);
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.props.onClearImageList();
        this.props.onImageList();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;
  
        this.context.setTitle('构建镜像');
        return (0, _jsx3.default)('div', {
          className: 'containerBgF building-list'
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbHd", "hbHdNoMb", "clearfix")
        }, void 0, this.getAddBtn(), (0, _jsx3.default)('div', {
          className: 'right slSearch'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-default icon-refresh',
          onClick: this.refresh.bind(this),
          title: '\u5237\u65B0'
        }, void 0, ' '))), (0, _jsx3.default)('div', {
          className: 'building-table TableTextLeft'
        }, void 0, (0, _jsx3.default)('table', {
          className: 'table table-hover table-bordered'
        }, void 0, _ref7, (0, _jsx3.default)('tbody', {}, void 0, this.getLines()))), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u786E\u5B9A\u8981\u5220\u9664\u6B64\u955C\u50CF\u5417?',
          func: function func() {
            _this3.props.onDeleteImage(_this3.state.delData);
          },
          ref: 'confirmModal'
        }));
      }
    }]);
    return Building;
  }(_react.Component);
  
  Building.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  exports.default = Building;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getImageList
  var getImageList = function getImageList(state) {
    return state.buildingImageList;
  };
  
  var buildingImageListSelector = function buildingImageListSelector() {
    return (0, _reselect.createSelector)([getImageList], function (buildingImageList) {
      return buildingImageList;
    });
  };
  
  exports.default = buildingImageListSelector;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BuildingCreateContainer = __webpack_require__(144);
  
  var _BuildingCreateContainer2 = _interopRequireDefault(_BuildingCreateContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_BuildingCreateContainer2.default, {});
  
  exports.default = {
    path: '/building/create',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(51);
  
  var _BuildingCreate = __webpack_require__(145);
  
  var _BuildingCreate2 = _interopRequireDefault(_BuildingCreate);
  
  var _building = __webpack_require__(113);
  
  var _BuildingCreateSelector = __webpack_require__(146);
  
  var _BuildingCreateSelector2 = _interopRequireDefault(_BuildingCreateSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _BuildingCreateSelector2.default)();
    var s1 = (0, _BuildingCreateSelector.makeGetGithubAuthURLSelector)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      repos: selector(state),
      githubAuthURL: s1(state),
      isBtnState: isBtnStateSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onReposLoad: function onReposLoad(key, refresh) {
        dispatch((0, _building.fetchRepoListAction)(key, refresh));
      },
      getGithubAuthURL: function getGithubAuthURL() {
        dispatch((0, _building.fetchGithubAuthURLAction)());
      },
      onBuilding: function onBuilding(data) {
        dispatch((0, _building.fetchBuildingAction)(data));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      }
    };
  };
  
  var BuildingCreateContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_BuildingCreate2.default);
  
  exports.default = BuildingCreateContainer;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(38);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var DropdownToggle = _reactBootstrap.Dropdown.Toggle,
      DropdownMenu = _reactBootstrap.Dropdown.Menu;
  
  var CodeStore = {
    "Default": (0, _jsx3.default)('span', {}, void 0, '\u9009\u62E9\u4EE3\u7801\u4ED3\u5E93'),
    "Github": (0, _jsx3.default)('span', {}, void 0, (0, _jsx3.default)('i', {
      className: 'icon-github'
    }, void 0, ' '), (0, _jsx3.default)('i', {}, void 0, 'Github'))
  };
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, '\u4EE3\u7801\u6784\u5EFA');
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '\u955C\u50CF\u662F\u670D\u52A1\u8FD0\u884C\u7684\u6A21\u677F, \u6765\u6E90\u4E8E\u4EE3\u7801, \u57FA\u4E8E Dockerfile \u6784\u5EFA, \u9ED8\u8BA4\u76EE\u5F55\u5728\u6839\'/\'\u4E0B, \u6587\u4EF6\u540D Dockerfile .');
  
  var _ref3 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u540D\u79F0',
    titleEnglish: 'IMAGE NAME',
    titleInfo: '\u9ED8\u8BA4\u4F1A\u4E0E\u60A8\u4E0B\u65B9\u4EE3\u7801\u6E90\u7684\u9879\u76EE\u540D\u79F0\u76F8\u540C'
  });
  
  var _ref4 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u6807\u7B7E',
    titleEnglish: 'IMAGE TAG',
    titleInfo: '\u9ED8\u8BA4\u4E3Alatest'
  });
  
  var _ref5 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u4EE3\u7801\u6E90',
    titleEnglish: 'CODE SOURCES',
    titleInfo: '\u4EE3\u7801\u6E90\u7684\u63CF\u8FF0\u7B49'
  });
  
  var _ref6 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: 0
  }, 0, '\u52A0\u8F7D\u4E2D...');
  
  var _ref7 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u6784\u5EFA\u4F4D\u7F6E',
    titleEnglish: 'CONSTRUCTION POSITION',
    titleInfo: 'Dockerfile\u662F\u6307\u5BFC\u955C\u50CF\u6784\u5EFA\u7684\u63CF\u8FF0\u6587\u4EF6\uFF0C\u7CFB\u7EDF\u4F1A\u6839\u636E\u60A8\u8BBE\u7F6E\u7684\u6784\u5EFA\u76EE\u5F55\u67E5\u627EDockerfile\u5E76\u5728\u8BE5\u76EE\u5F55\u4E0B\u6267\u884C\u955C\u50CF\u6784\u5EFA\u547D\u4EE4\u3002'
  });
  
  var _ref8 = (0, _jsx3.default)(_reactBootstrap.Col, {
    sm: 2
  }, void 0, '\u6784\u5EFA\u76EE\u5F55');
  
  var _ref9 = (0, _jsx3.default)(_reactBootstrap.Col, {
    sm: 2
  }, void 0, 'Dockerfile \u8DEF\u5F84');
  
  var _ref10 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u662F\u5426\u81EA\u52A8\u6784\u5EFA',
    titleEnglish: 'AUTO BUILDING',
    titleInfo: '\u5F53\u4EE3\u7801\u4ED3\u5E93\u4E2D\u7684\u9879\u76EE\u6709 push \u64CD\u4F5C\u7684\u65F6\u5019, \u8BE5\u955C\u50CF\u4E5F\u4F1A\u540C\u6B65\u81EA\u52A8\u91CD\u65B0\u6784\u5EFA'
  });
  
  var _ref11 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u662F\u5426\u516C\u5F00',
    titleEnglish: 'IS PUBLIC',
    titleInfo: '\u662F\u5426\u5BF9\u5916\u5F00\u653E\u60A8\u7684\u955C\u50CF'
  });
  
  var _ref12 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u7B80\u4ECB',
    titleEnglish: 'IMAGE SUMMARY',
    titleInfo: '\u7B80\u5355\u4ECB\u7ECD\u955C\u50CF\u7684\u4FE1\u606F'
  });
  
  var _ref13 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u8BE6\u7EC6\u63CF\u8FF0',
    titleEnglish: 'IMAGE DETAIL',
    titleInfo: '\u8BE6\u7EC6\u4ECB\u7ECD\u955C\u50CF\u7684\u4FE1\u606F'
  });
  
  var BuildingCreate = function (_React$Component) {
    (0, _inherits3.default)(BuildingCreate, _React$Component);
  
    function BuildingCreate() {
      (0, _classCallCheck3.default)(this, BuildingCreate);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (BuildingCreate.__proto__ || (0, _getPrototypeOf2.default)(BuildingCreate)).call(this));
  
      _this.state = {
        codeStoreKey: "Default",
        repoKey: null,
        repoId: null,
        isImageName: false,
        isAutoBuilding: 1,
        isPublic: 1
      };
      return _this;
    }
  
    (0, _createClass3.default)(BuildingCreate, [{
      key: 'selectCodeStore',
      value: function selectCodeStore(key, refresh) {
        console.log(key, refresh);
        var tip = _reactDom2.default.findDOMNode(this.refs.btn_group_tip);
        tip.style.display = "none";
        this.setState({ codeStoreKey: key });
        this.props.onReposLoad(key, refresh);
      }
    }, {
      key: 'selectRepo',
      value: function selectRepo(key, id) {
        var tip = _reactDom2.default.findDOMNode(this.refs.btn_group_tip);
        tip.style.display = "none";
        this.setState({ repoKey: key });
        this.setState({ repoId: id });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.BUILD_CREATE);
        if (this.state.codeStoreKey != 'Default') this.props.onReposLoad(this.state.codeStoreKey);
        this.props.getGithubAuthURL();
      }
    }, {
      key: 'onImageNameChange',
      value: function onImageNameChange() {
        var imageName = _reactDom2.default.findDOMNode(this.refs.image_name),
            imageTip = _reactDom2.default.findDOMNode(this.refs.image_name_tip),
            regExp = /^[a-z]+[a-z0-9_-]*$/;
        if (!regExp.test(imageName.value) && imageName.value != "") {
          this.setState({
            isImageName: true
          });
          imageTip.innerHTML = _constants.INPUT_TIP.image.Format;
        } else {
          this.setState({
            isImageName: false
          });
        }
      }
    }, {
      key: 'building',
      value: function building() {
        var imageName = _reactDom2.default.findDOMNode(this.refs.image_name),
            imageTip = _reactDom2.default.findDOMNode(this.refs.image_name_tip);
        if (imageName.value == "") {
          this.setState({
            isImageName: true
          });
          imageName.focus();
          imageTip.innerHTML = _constants.INPUT_TIP.image.Null;
          return false;
        }
        if (this.state.codeStoreKey == "Default") {
          var tip = _reactDom2.default.findDOMNode(this.refs.btn_group_tip);
          tip.style.display = "inline-block";
          tip.style.color = "red";
          tip.innerHTML = "代码仓库不能为空";
          return false;
        }
        if (!this.state.repoKey) {
          var _tip = _reactDom2.default.findDOMNode(this.refs.btn_group_tip);
          _tip.style.display = "inline-block";
          _tip.style.color = "red";
          _tip.innerHTML = "项目不能为空";
          return false;
        }
        if (!this.state.isImageName) {
          var repository = _reactDom2.default.findDOMNode(this.refs.image_name).value,
              image_tag = _reactDom2.default.findDOMNode(this.refs.image_tag).value,
              repo_name = this.state.repoKey,
              repo_branch = "master",
              dockerfile_path = _reactDom2.default.findDOMNode(this.refs.dockerfile_name).value,
              dockerfile_name = _reactDom2.default.findDOMNode(this.refs.dockerfile_path).value,
              auto_build = String(this.state.isAutoBuilding),
              is_public = String(this.state.isPublic),
              detail = _reactDom2.default.findDOMNode(this.refs.detail).value,
              short_description = _reactDom2.default.findDOMNode(this.refs.short_description).value;
          var data = {
            repository: repository,
            repo_name: repo_name,
            repo_branch: repo_branch,
            image_tag: image_tag,
            dockerfile_path: dockerfile_path,
            dockerfile_name: dockerfile_name,
            auto_build: auto_build,
            is_public: is_public,
            detail: detail,
            short_description: short_description,
            is_code: "1"
          };
          console.log(data);
          this.props.onBuilding(data);
        }
      }
    }, {
      key: 'getToggleValue',
      value: function getToggleValue() {
        this.setState({
          isAutoBuilding: this.state.isAutoBuilding ? 0 : 1
        });
      }
    }, {
      key: 'changePublicToggleValue',
      value: function changePublicToggleValue() {
        this.setState({
          isPublic: this.state.isPublic ? 0 : 1
        });
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('代码构建');
        var user = this.context.store.getState().user_info;
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'acBox'
        }, void 0, _ref, _ref2, (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'assBox ' + (this.state.isImageName ? "has-error" : "")
        }, void 0, _react2.default.createElement('input', {
          type: 'text',
          placeholder: '',
          className: 'form-control',
          ref: 'image_name',
          onChange: this.onImageNameChange.bind(this)
        }), _react2.default.createElement(
          'span',
          { className: 'inputTip', ref: 'image_name_tip' },
          '\u955C\u50CF\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A'
        ))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement('input', {
          type: 'text',
          placeholder: '',
          className: 'form-control',
          ref: 'image_tag',
          defaultValue: 'latest'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref5, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, !user.github ? (0, _jsx3.default)('a', {
          className: 'btn btn-primary',
          href: this.props.githubAuthURL
        }, void 0, 'Github \u6388\u6743') : (0, _jsx3.default)(_reactBootstrap.ButtonGroup, {}, void 0, _react2.default.createElement(
          _reactBootstrap.Dropdown,
          { bsStyle: 'default', ref: 'repo_name',
            onSelect: this.selectCodeStore.bind(this),
            id: 'building-create-source-codestore' },
          (0, _jsx3.default)(DropdownToggle, {}, void 0, CodeStore[this.state.codeStoreKey]),
          (0, _jsx3.default)(DropdownMenu, {}, void 0, (0, _jsx3.default)(_reactBootstrap.MenuItem, {
            eventKey: 'Github'
          }, void 0, CodeStore["Github"]), (0, _jsx3.default)(_reactBootstrap.MenuItem, {
            eventKey: 'Coding'
          }, void 0, CodeStore["Coding"]))
        ), (0, _jsx3.default)(_reactBootstrap.DropdownButton, {
          bsStyle: 'default',
          title: this.state.repoKey || "选择项目",
          onSelect: this.selectRepo.bind(this),
          id: 'building-create-source-repos'
        }, void 0, this.props.repos.length != 0 ? this.props.repos.map(function (item, i) {
          return (0, _jsx3.default)(_reactBootstrap.MenuItem, {
            eventKey: item.repo_name
          }, i, item.repo_name);
        }) : _ref6), (0, _jsx3.default)(_reactBootstrap.Button, {
          className: 'icon-refresh',
          onClick: this.selectCodeStore.bind(this, this.state.codeStoreKey, true)
        }, void 0, ' ')), _react2.default.createElement(
          'span',
          { className: 'inputTip', ref: 'btn_group_tip' },
          '\u4EE3\u7801\u4ED3\u5E93\u548C\u9879\u76EE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A'
        ))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref7, (0, _jsx3.default)('div', {
          className: 'assBox assBoxW100'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'assPosition'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.FormGroup, {
          controlId: 'form'
        }, void 0, _ref8, (0, _jsx3.default)(_reactBootstrap.Col, {
          sm: 5
        }, void 0, _react2.default.createElement('input', { className: 'form-control', defaultValue: '/', ref: 'dockerfile_name', type: 'text', placeholder: '/' })))), (0, _jsx3.default)('div', {
          className: 'assPosition'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.FormGroup, {
          controlId: 'form'
        }, void 0, _ref9, (0, _jsx3.default)(_reactBootstrap.Col, {
          sm: 5
        }, void 0, _react2.default.createElement('input', { className: 'form-control', defaultValue: 'Dockerfile', ref: 'dockerfile_path', type: 'text', placeholder: 'Dockerfile' })))))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref10, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.isAutoBuilding == 1,
          onChange: this.getToggleValue.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref11, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.isPublic == 1,
          onChange: this.changePublicToggleValue.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref12, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement('textarea', {
          placeholder: '\u955C\u50CF\u7B80\u4ECB',
          className: 'form-control',
          defaultValue: '',
          ref: 'detail'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref13, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement('textarea', {
          placeholder: '\u8BE6\u7EC6\u63CF\u8FF0',
          className: 'form-control',
          defaultValue: '',
          ref: 'short_description'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem assItemNoborder'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'acBtn'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary ' + (!this.props.isBtnState.building ? "btn-loading" : ""),
          onClick: this.building.bind(this),
          disabled: !this.props.isBtnState.building
        }, void 0, this.props.isBtnState.building ? "开始构建" : "构建中...")))));
      }
    }]);
    return BuildingCreate;
  }(_react2.default.Component);
  
  BuildingCreate.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object,
    setBreadcrumb: _react2.default.PropTypes.func
  };
  exports.default = BuildingCreate;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.makeGetGithubAuthURLSelector = undefined;
  
  var _reselect = __webpack_require__(63);
  
  var getRepos = function getRepos(state) {
    return state.repos;
  };
  
  var getGithubAuthURL = function getGithubAuthURL(state) {
    return state.githubAuthURL;
  };
  
  var makeGetReposSelector = function makeGetReposSelector() {
    return (0, _reselect.createSelector)([getRepos], function (repos) {
      return repos;
    });
  };
  
  var makeGetGithubAuthURLSelector = exports.makeGetGithubAuthURLSelector = function makeGetGithubAuthURLSelector() {
    return (0, _reselect.createSelector)([getGithubAuthURL], function (url) {
      return url;
    });
  };
  
  exports.default = makeGetReposSelector;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(53);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(14);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _reactRedux = __webpack_require__(51);
  
  var _ = __webpack_require__(44);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
    action: function action(_ref) {
      var render = _ref.render,
          context = _ref.context,
          error = _ref.error;
  
      return render((0, _jsx3.default)(_reactRedux.Provider, {
        store: _.store
      }, void 0, (0, _jsx3.default)(_App2.default, {
        context: context,
        error: error
      }, void 0, (0, _jsx3.default)(_ErrorPage2.default, {
        error: error
      }))), 500
      // error.status || 500
      );
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceListContainer = __webpack_require__(149);
  
  var _ServiceListContainer2 = _interopRequireDefault(_ServiceListContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_ServiceListContainer2.default, {});
  
  exports.default = {
  
    path: '/serviceList',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ServiceList = __webpack_require__(150);
  
  var _ServiceList2 = _interopRequireDefault(_ServiceList);
  
  var _reactRedux = __webpack_require__(51);
  
  var _services = __webpack_require__(94);
  
  var _serviceListSelector = __webpack_require__(95);
  
  var _serviceListSelector2 = _interopRequireDefault(_serviceListSelector);
  
  var _isLoadingSelector = __webpack_require__(82);
  
  var _isLoadingSelector2 = _interopRequireDefault(_isLoadingSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _serviceListSelector2.default)();
    var isLoadingSelector = (0, _isLoadingSelector2.default)();
    return {
      serviceList: selector(state),
      isLoading: isLoadingSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onServiceListLoad: function onServiceListLoad(txt) {
        dispatch((0, _services.fetchAllServicesAction)(txt));
      },
      onDeleteService: function onDeleteService(data) {
        dispatch((0, _services.fetchDeleteServiceAction)(data));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      onChangeState: function onChangeState(data) {
        dispatch((0, _services.fetchChangeStateAction)(data));
      },
      onClearServiceList: function onClearServiceList() {
        dispatch((0, _services.refreshServiceList)());
      }
    };
  };
  
  var ServiceListContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ServiceList2.default);
  
  exports.default = ServiceListContainer;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(112);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = '服务列表';
  
  var _ref = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref2 = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref3 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '1'
  }, void 0, '\u5220\u9664');
  
  var _ref4 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '1'
  }, void 0, '\u5220\u9664');
  
  var _ref5 = (0, _jsx3.default)('img', {
    className: 'mediaImg',
    src: '/slImgJx.png'
  });
  
  var _ref6 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u670D\u52A1\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u90E8\u7F72\u65F6\u95F4'), (0, _jsx3.default)('th', {
    width: '45%'
  }, void 0, '\u57DF\u540D'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u72B6\u6001'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref7 = (0, _jsx3.default)('div', {
    className: 'hbAddBtn clearfix'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'hbPlus left'
  }), (0, _jsx3.default)('div', {
    className: 'hbPlusInfo left'
  }, void 0, (0, _jsx3.default)('p', {
    className: 'hbPName'
  }, void 0, '\u65B0\u5EFA\u670D\u52A1'), (0, _jsx3.default)('p', {
    className: 'hbPInfo'
  }, void 0, 'Create Service')));
  
  var _ref8 = (0, _jsx3.default)('a', {
    href: 'javascript:;',
    className: 'hbAddExplain'
  }, void 0, '\u4EC0\u4E48\u662F\u5BB9\u5668\u4E91\u670D\u52A1\uFF1F');
  
  var ServiceList = function (_Component) {
    (0, _inherits3.default)(ServiceList, _Component);
  
    function ServiceList() {
      (0, _classCallCheck3.default)(this, ServiceList);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (ServiceList.__proto__ || (0, _getPrototypeOf2.default)(ServiceList)).call(this));
  
      _this.state = {
        isLoop: true,
        delData: {}
      };
      return _this;
    }
  
    (0, _createClass3.default)(ServiceList, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.SERVICE_LIST);
        this.props.onServiceListLoad();
        this.myTime = setInterval(this.props.onServiceListLoad, 10000);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.myTime);
      }
    }, {
      key: 'deleteService',
      value: function deleteService(serviceName) {
        var data = { serviceName: serviceName, type: "list" };
        this.setState({
          delData: data
        });
        this.refs.confirmModal.open();
      }
    }, {
      key: 'changeState',
      value: function changeState(serviceName, state) {
        var data = { serviceName: serviceName, state: state };
        console.log(data);
        this.props.onChangeState(data);
      }
    }, {
      key: 'getTableBody',
      value: function getTableBody() {
        var _this2 = this;
  
        var data = this.props.serviceList;
        if (!data.length) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '5',
          style: { "textAlign": "center" }
        }, void 0, '\u6682\u65E0\u6570\u636E~'));
        if (data.length == 1 && data[0] == 1) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '5',
          style: { "textAlign": "center" }
        }, void 0, _ref));
        if (data.length == 1 && data[0] == 0) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '5',
          style: { "textAlign": "center" }
        }, void 0, _ref2));
        var body = [];
        data.map(function (item, i) {
          var serviceState = "";
          var option = "";
          switch (item.fservice_status.toLowerCase()) {
            case Const.SERVICE_STATE.Running:
              serviceState = "运行";
              option = (0, _jsx3.default)(_reactBootstrap.SplitButton, {
                onClick: _this2.changeState.bind(_this2, item.fservice_name, "stop"),
                onSelect: _this2.deleteService.bind(_this2, item.fservice_name),
                bsStyle: "default",
                title: '\u5173\u95ED',
                id: 'volumes-table-line-' + i
              }, void 0, _ref3);
              break;
            case Const.SERVICE_STATE.Stopping:
              serviceState = "停止";
              option = (0, _jsx3.default)(_reactBootstrap.SplitButton, {
                onClick: _this2.changeState.bind(_this2, item.fservice_name, "start"),
                onSelect: _this2.deleteService.bind(_this2, item.fservice_name),
                bsStyle: "primary",
                title: '启动',
                id: 'volumes-table-line-' + i
              }, void 0, _ref4);
              break;
            case Const.SERVICE_STATE.Pending:
              serviceState = "创建中";
              option = (0, _jsx3.default)(_reactBootstrap.SplitButton, {
                onClick: _this2.deleteService.bind(_this2, item.fservice_name),
                bsStyle: "danger",
                title: '删除',
                id: 'volumes-table-line-' + i
              }, void 0);
              break;
            default:
              serviceState = "";
          }
          var domain = [];
          item.container.map(function (obj) {
            var url = obj.http_domain == null ? obj.tcp_domain : obj.http_domain;
            domain.push(url);
          });
          body.push((0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'mediaItem'
          }, void 0, (0, _jsx3.default)(_Link2.default, {
            to: '/serviceList/' + item.fservice_name + '/1'
          }, void 0, _ref5, (0, _jsx3.default)('span', {
            className: 'mediaTxt'
          }, void 0, item.fservice_name)))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('span', {
            className: 'color333'
          }, void 0, item.ltime)), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {}, void 0, domain.map(function (url, j) {
            return (0, _jsx3.default)('p', {}, j, (0, _jsx3.default)('a', {
              href: 'http://' + url,
              target: '_blank',
              className: 'clLink'
            }, void 0, url));
          }))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'mirror-state ' + (serviceState == "运行" ? "on" : "off") + ' tablePaddingLeft'
          }, void 0, serviceState)), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'btn-group'
          }, void 0, option))));
        });
        return body;
      }
    }, {
      key: 'getDemoTable',
      value: function getDemoTable() {
        return (0, _jsx3.default)('table', {
          className: 'table table-hover table-bordered services-table'
        }, void 0, _ref6, _react2.default.createElement(
          'tbody',
          { ref: 'tableBody' },
          this.getTableBody()
        ));
      }
    }, {
      key: 'searchService',
      value: function searchService() {
        var searchTxt = _reactDom2.default.findDOMNode(this.refs.searchInput).value;
        var my = this;
        my.props.onServiceListLoad(searchTxt);
        clearInterval(this.myTime);
        this.myTime = setInterval(function () {
          my.props.onServiceListLoad(searchTxt);
        }, 10000);
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        // refresh
        this.props.onClearServiceList();
        this.props.onServiceListLoad();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;
  
        this.context.setTitle(title);
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'hbHd clearfix'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'hbAdd left'
        }, void 0, (0, _jsx3.default)(_Link2.default, {
          to: '/choseImage'
        }, void 0, _ref7), _ref8), (0, _jsx3.default)('div', {
          className: 'slSearch right'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-default icon-refresh',
          onClick: this.refresh.bind(this),
          title: '\u5237\u65B0'
        }, void 0, ' '), (0, _jsx3.default)('div', {
          className: 'search'
        }, void 0, _react2.default.createElement('input', { type: 'text', placeholder: '\u641C\u7D22\u670D\u52A1', ref: 'searchInput', className: "slSearchInp" }), (0, _jsx3.default)('a', {
          type: 'button',
          className: 'slSearchBtn icon-select',
          onClick: this.searchService.bind(this)
        }, void 0, ' ')))), (0, _jsx3.default)('div', {
          className: 'sl-bd TableTextLeft'
        }, void 0, this.getDemoTable()), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6B64\u670D\u52A1\u5417?',
          ref: 'confirmModal',
          func: function func() {
            _this3.props.onDeleteService(_this3.state.delData);
          }
        }));
      }
    }]);
    return ServiceList;
  }(_react.Component);
  
  ServiceList.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  exports.default = ServiceList;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _DeployServiceContainer = __webpack_require__(152);
  
  var _DeployServiceContainer2 = _interopRequireDefault(_DeployServiceContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_DeployServiceContainer2.default, {});
  
  exports.default = {
  
    path: '/addService',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _DeployService = __webpack_require__(153);
  
  var _DeployService2 = _interopRequireDefault(_DeployService);
  
  var _reactRedux = __webpack_require__(51);
  
  var _deployService = __webpack_require__(108);
  
  var _volumes = __webpack_require__(98);
  
  var _volumesListSelector = __webpack_require__(99);
  
  var _volumesListSelector2 = _interopRequireDefault(_volumesListSelector);
  
  var _deployDataSelector = __webpack_require__(158);
  
  var _deployDataSelector2 = _interopRequireDefault(_deployDataSelector);
  
  var _isSidebarOpenSelector = __webpack_require__(71);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selectorVolume = (0, _volumesListSelector2.default)();
    var deployData = (0, _deployDataSelector2.default)();
    var isSidebarOpenSelector = (0, _isSidebarOpenSelector2.default)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      volumeList: selectorVolume(state),
      deployData: deployData(state),
      isSidebarOpen: isSidebarOpenSelector(state),
      isBtnState: isBtnStateSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onDeployService: function onDeployService(data) {
        dispatch((0, _deployService.fetchDeployServiceAction)(data));
      },
      onDeploySenior: function onDeploySenior(data) {
        dispatch((0, _deployService.deploySeniorAction)(data));
      },
      onVolumeListLoad: function onVolumeListLoad() {
        dispatch((0, _volumes.fetchVolumesListAction)());
      },
      onAddPort: function onAddPort() {
        dispatch((0, _deployService.addPortAction)());
      },
      onDelPort: function onDelPort(item) {
        dispatch((0, _deployService.delPortAction)(item));
      },
      onAddSave: function onAddSave() {
        dispatch((0, _deployService.addSaveAction)());
      },
      onDelSave: function onDelSave(item) {
        dispatch((0, _deployService.delSaveAction)(item));
      },
      onAddEnv: function onAddEnv() {
        dispatch((0, _deployService.addEnvAction)());
      },
      onDelEnv: function onDelEnv(item) {
        dispatch((0, _deployService.delEnvAction)(item));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      }
  
    };
  };
  
  var DeployServiceContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DeployService2.default);
  
  exports.default = DeployServiceContainer;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(20);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceStep = __webpack_require__(154);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _constants = __webpack_require__(38);
  
  var _route = __webpack_require__(58);
  
  var _notification = __webpack_require__(78);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '新建服务'; /**
                       * React Starter Kit (https://www.reactstarterkit.com/)
                       *
                       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                       *
                       * This source code is licensed under the MIT license found in the
                       * LICENSE.txt file in the root directory of this source tree.
                       */
  
  var AutoStartUpToggle = function (_Component) {
    (0, _inherits3.default)(AutoStartUpToggle, _Component);
  
    function AutoStartUpToggle(props) {
      (0, _classCallCheck3.default)(this, AutoStartUpToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (AutoStartUpToggle.__proto__ || (0, _getPrototypeOf2.default)(AutoStartUpToggle)).call(this, props));
  
      _this.state = {
        autoStart: true
      };
      return _this;
    }
  
    (0, _createClass3.default)(AutoStartUpToggle, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({
          autoStart: this.props.isState
        });
      }
    }, {
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.props.getToggle(this.state.autoStart);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return AutoStartUpToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('option', {
    value: 'TCP'
  }, void 0, 'TCP');
  
  var _ref2 = (0, _jsx3.default)('option', {
    value: 'UDP'
  }, void 0, 'UDP');
  
  var _ref3 = (0, _jsx3.default)('option', {
    value: 'HTTP'
  }, void 0, 'HTTP');
  
  var _ref4 = (0, _jsx3.default)('option', {
    value: 'TCP'
  }, void 0, 'TCP');
  
  var _ref5 = (0, _jsx3.default)('option', {
    value: 'no'
  }, void 0, '\u4E0D\u53EF\u8BBF\u95EE');
  
  var _ref6 = (0, _jsx3.default)('option', {
    value: 'outsisde'
  }, void 0, '\u5916\u90E8\u8303\u56F4');
  
  var _ref7 = (0, _jsx3.default)('option', {
    value: 'inside'
  }, void 0, '\u5185\u90E8\u8303\u56F4');
  
  var _ref8 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u5BB9\u5668\u7AEF\u53E3'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u534F\u8BAE'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u8BBF\u95EE\u65B9\u5F0F'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u8BBF\u95EE\u8303\u56F4'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref9 = (0, _jsx3.default)('option', {
    value: '-1'
  }, '-1', '\u8BF7\u9009\u62E9\u6570\u636E\u5377');
  
  var _ref10 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u6570\u636E\u5377\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u5BB9\u5668\u8DEF\u5F84'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u662F\u5426\u53EA\u8BFB'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref11 = (0, _jsx3.default)('div', {
    className: 'astLine'
  });
  
  var _ref12 = (0, _jsx3.default)(_ServiceStep2.default, {
    dataActive: 'third'
  });
  
  var _ref13 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7AEF\u53E3',
    titleEnglish: 'PORT',
    titleInfo: '\u5BB9\u5668\u7AEF\u53E3\u4F1A\u6620\u5C04\u5230\u4E3B\u673A\u7AEF\u53E3\u4E0A'
  });
  
  var _ref14 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u73AF\u5883\u53D8\u91CF',
    titleEnglish: 'ENVIRONMENT VARIABLE',
    titleInfo: ''
  });
  
  var _ref15 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u542F\u52A8\u547D\u4EE4',
    titleEnglish: 'JRE',
    titleInfo: '\u542F\u52A8\u547D\u4EE4\u89E3\u91CA\u8BF4\u660E '
  });
  
  var _ref16 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u81EA\u52A8\u542F\u52A8',
    titleEnglish: 'AUTO UPDATE SETTING',
    titleInfo: '\u81EA\u52A8\u542F\u52A8\u8BBE\u7F6E'
  });
  
  var AddService = function (_Component2) {
    (0, _inherits3.default)(AddService, _Component2);
  
    function AddService(props) {
      (0, _classCallCheck3.default)(this, AddService);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (AddService.__proto__ || (0, _getPrototypeOf2.default)(AddService)).call(this, props));
  
      _this2.state = {
        isPort: false,
        isPortShow: false,
        isStateUp: 1,
        port: false,
        volume: false,
        env: false
      };
      return _this2;
    }
  
    (0, _createClass3.default)(AddService, [{
      key: 'delVal',
      value: function delVal(index) {
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
        var input = containerTr[index].getElementsByTagName("input")[0];
        input.focus();
        input.value = "";
      }
    }, {
      key: 'focusVal',
      value: function focusVal(index) {
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
        var input = containerTr[index].getElementsByTagName("input")[0];
        input.focus();
      }
    }, {
      key: 'isPortRepeat',
      value: function isPortRepeat(index, e) {
        var _this3 = this;
  
        var container = [];
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
        var value = e.target.value;
        for (var i = 0; i < containerTr.length; i++) {
          var containerObj = {};
          containerObj.container_port = containerTr[i].getElementsByTagName("input")[0].value;
          container.push(containerObj);
        }
        this.setState({
          port: false
        });
        e.target.className = "form-control form-control-sm";
        if (value <= 10 && value.length != 0) {
          this.setState({
            port: true
          });
          e.target.className = "form-control form-control-sm inputError";
          this.refs.portTip.innerHTML = _constants.INPUT_TIP.port.Format;
          return false;
        }
        container.splice(index, 1);
        container.map(function (item) {
          if (item.container_port == value && value != "") {
            _this3.setState({
              port: true
            });
            e.target.className = "form-control form-control-sm inputError";
            _this3.refs.portTip.innerHTML = _constants.INPUT_TIP.port.Repeat;
            e.target.focus();
            return false;
          }
        });
      }
    }, {
      key: 'isSaveRepeat',
      value: function isSaveRepeat(index, e) {
        var _this4 = this;
  
        var save = [];
        var saveTr = _reactDom2.default.findDOMNode(this.refs.tab_save_box).children;
        var key = e.target.value;
        this.setState({
          volume: false
        });
        for (var i = 0; i < saveTr.length; i++) {
          var saveObj = {};
          saveObj.value = saveTr[i].getElementsByTagName("select")[0].value;
          save.push(saveObj);
        }
        save.splice(index, 1);
        save.map(function (item) {
          if (item.value == key && key != "") {
            _this4.setState({
              volume: true
            });
            _this4.refs.volumeTip.innerHTML = _constants.INPUT_TIP.volumes.Repeat;
            e.target.value = "-1";
            e.target.focus();
            return false;
          }
        });
      }
    }, {
      key: 'isEnvKey',
      value: function isEnvKey(index, e) {
        var _this5 = this;
  
        var env = [];
        var regExp = /^[a-zA-Z]+[a-zA-Z0-9-]*$/;
        var envTr = _reactDom2.default.findDOMNode(this.refs.tab_env_box).children;
        var key = e.target.value;
        this.setState({
          env: false
        });
        e.target.className = "form-control";
        if (!regExp.test(key)) {
          this.setState({
            env: true
          });
          this.refs.envTip.innerHTML = _constants.INPUT_TIP.env.Format;
          e.target.className = "form-control inputError";
          e.target.focus();
          return false;
        }
        for (var i = 0; i < envTr.length; i++) {
          var envObj = {};
          envObj.env_key = envTr[i].getElementsByTagName("input")[0].value;
          env.push(envObj);
        }
        env.splice(index, 1);
        env.map(function (item) {
          if (item.env_key == key && key != "") {
            _this5.setState({
              env: true
            });
            _this5.refs.envTip.innerHTML = _constants.INPUT_TIP.env.Repeat;
            e.target.className = "form-control inputError";
            e.target.focus();
          }
        });
      }
    }, {
      key: 'isEnvValue',
      value: function isEnvValue(e) {
        this.setState({
          env: false
        });
        e.target.className = "form-control";
      }
    }, {
      key: 'isPathValidata',
      value: function isPathValidata(e) {
        var regExp = /^\/[a-zA-Z]+[a-zA-Z0-9_]*$/;
        var value = e.target.value;
        if (!regExp.test(value) && value.length != 0) {
          this.setState({
            volume: true
          });
          e.target.className = "form-control inputError";
          this.refs.volumeTip.innerHTML = _constants.INPUT_TIP.volumes.Format;
        } else {
          this.setState({
            volume: false
          });
          e.target.className = "form-control";
        }
      }
    }, {
      key: 'getPortTableBody',
      value: function getPortTableBody() {
        var _this6 = this;
  
        //端口
        var data = [],
            sd = this.props.deployData;
        if (sd && sd.container && sd.container.length) data = this.props.deployData.container;
        var tr = data.map(function (item, i) {
          return (0, _jsx3.default)('tr', {}, item.at, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'iaBox'
          }, void 0, _react2.default.createElement('input', { type: 'number', ref: 'container_port', onBlur: _this6.isPortRepeat.bind(_this6, i), className: 'form-control form-control-sm', defaultValue: item.container_port }), (0, _jsx3.default)('span', {
            className: 'iaOk icon-right',
            onClick: _this6.focusVal.bind(_this6, i)
          }, void 0, ' '), (0, _jsx3.default)('span', {
            className: 'iaDel icon-delete',
            onClick: _this6.delVal.bind(_this6, i)
          }, void 0, ' ')))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'protocol', selected: item.protocol },
            _ref,
            _ref2
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'access_mode', selected: item.access_mode },
            _ref3,
            _ref4,
            _ref5
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'access_scope', selected: item.access_scope },
            _ref6,
            _ref7
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('a', {
            href: 'javascript:;',
            className: 'delBtn',
            onClick: _this6.delPortTr.bind(_this6, item.at)
          }, void 0, ' ')));
        });
        return tr;
      }
    }, {
      key: 'getPortTable',
      value: function getPortTable() {
        return (0, _jsx3.default)('table', {
          className: 'table table-bordered'
        }, void 0, _ref8, _react2.default.createElement(
          'tbody',
          { ref: 'tab_container_body' },
          this.getPortTableBody()
        ));
      }
    }, {
      key: 'addPortTr',
      value: function addPortTr() {
        this.props.onAddPort();
      }
    }, {
      key: 'delPortTr',
      value: function delPortTr(item) {
        this.props.onDelPort(item);
      }
    }, {
      key: 'getSaveTableBody',
      value: function getSaveTableBody() {
        var _this7 = this;
  
        //存储
        var volumeList = this.props.volumeList;
        var options = volumeList.map(function (item, i) {
          if (item.disk_status == "unused") {
            return (0, _jsx3.default)('option', {
              value: item.disk_name
            }, i, item.disk_name, ' ');
          } else {
            return;
          }
        });
        var data = [],
            sd = this.props.deployData;
        if (sd && sd.volume && sd.volume.length) data = this.props.deployData.volume;
        var tr = data.map(function (item, i) {
          return (0, _jsx3.default)('tr', {}, item.at, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'volumn_name', defaultValue: item.disk_name,
              onChange: _this7.isSaveRepeat.bind(_this7, i)
            },
            _ref9,
            options
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement('input', { type: 'text', defaultValue: item.disk_path, className: 'form-control',
            onBlur: _this7.isPathValidata.bind(_this7), ref: 'container_path' }))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('input', {
            type: 'checkbox',
            defaultChecked: item.readonly == 1
          }), ' \u662F\u5426\u53EA\u8BFB'))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('a', {
            href: 'javascript:;',
            className: 'delBtn',
            onClick: _this7.delSaveTr.bind(_this7, item.at)
          }, void 0, ' ')));
        });
  
        return tr;
      }
    }, {
      key: 'getSaveTable',
      value: function getSaveTable() {
        return (0, _jsx3.default)('table', {
          className: 'table table-bordered'
        }, void 0, _ref10, _react2.default.createElement(
          'tbody',
          { ref: 'tab_storage_body' },
          this.getSaveTableBody()
        ));
      }
    }, {
      key: 'addSaveTr',
      value: function addSaveTr() {
        this.props.onAddSave();
      }
    }, {
      key: 'delSaveTr',
      value: function delSaveTr(item) {
        this.props.onDelSave(item);
      }
    }, {
      key: 'getEnvironment',
      value: function getEnvironment() {
        var _this8 = this;
  
        var data = [],
            sd = this.props.deployData;
        if (sd && sd.env && sd.env.length) data = this.props.deployData.env;
        var keyBox = data.map(function (item, i) {
          return (0, _jsx3.default)('div', {
            className: 'astKeyItem'
          }, item.at, (0, _jsx3.default)('div', {
            className: 'astInp'
          }, void 0, _react2.default.createElement('input', { type: 'text', className: 'form-control', onBlur: _this8.isEnvKey.bind(_this8, i), ref: 'env_key', placeholder: '\u952E', defaultValue: item.env_key })), _ref11, (0, _jsx3.default)('div', {
            className: 'astInp'
          }, void 0, _react2.default.createElement('input', { type: 'text', className: 'form-control', onBlur: _this8.isEnvValue.bind(_this8), ref: 'env_value', placeholder: '\u503C', defaultValue: item.env_value })), (0, _jsx3.default)('div', {
            className: 'astDel'
          }, void 0, (0, _jsx3.default)('a', {
            href: 'javascript:;',
            className: 'delBtn',
            onClick: _this8.delEnvironmentData.bind(_this8, item.at)
          }, void 0, ' ')));
        });
        return keyBox;
      }
    }, {
      key: 'addEnvironmentData',
      value: function addEnvironmentData() {
        this.props.onAddEnv();
      }
    }, {
      key: 'delEnvironmentData',
      value: function delEnvironmentData(item) {
        this.props.onDelEnv(item);
      }
    }, {
      key: 'onChangeStep',
      value: function onChangeStep() {
        var container = [],
            save = [],
            env = [];
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr"),
            saveTr = _reactDom2.default.findDOMNode(this.refs.tab_storage_body).getElementsByTagName("tr"),
            envTr = _reactDom2.default.findDOMNode(this.refs.tab_env_box).children;
        for (var i = 0; i < containerTr.length; i++) {
          var containerObj = {};
          containerObj.container_port = containerTr[i].getElementsByTagName("input")[0].value;
          containerObj.protocol = containerTr[i].getElementsByTagName("select")[0].value;
          containerObj.access_mode = containerTr[i].getElementsByTagName("select")[1].value;
          containerObj.access_scope = containerTr[i].getElementsByTagName("select")[2].value;
          containerObj.at = new Date().getTime() + i;
          container.push(containerObj);
        }
        for (var _i = 0; _i < saveTr.length; _i++) {
          var saveObj = {};
          saveObj.disk_name = saveTr[_i].getElementsByTagName("select")[0].value;
          saveObj.disk_path = saveTr[_i].getElementsByTagName("input")[0].value;
          saveObj.readonly = saveTr[_i].getElementsByTagName("input")[1].checked;
          saveObj.at = new Date().getTime() + _i;
          save.push(saveObj);
        }
        for (var _i2 = 0; _i2 < envTr.length; _i2++) {
          var envObj = {};
          envObj.env_key = envTr[_i2].getElementsByTagName("input")[0].value;
          envObj.env_value = envTr[_i2].getElementsByTagName("input")[1].value;
          envObj.at = new Date().getTime() + _i2;
          env.push(envObj);
        }
        var data = {
          container: container,
          env: env,
          volume: save,
          auto_startup: this.state.isStateUp,
          command: this.refs.command.value
        };
        console.log(data);
        this.props.onDeploySenior(data);
      }
    }, {
      key: 'deployService',
      value: function deployService() {
        var container = [],
            save = [],
            env = [];
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr"),
            saveTr = _reactDom2.default.findDOMNode(this.refs.tab_storage_body).getElementsByTagName("tr"),
            envTr = _reactDom2.default.findDOMNode(this.refs.tab_env_box).children;
        for (var i = 0; i < containerTr.length; i++) {
          var containerObj = {};
          var container_port = containerTr[i].getElementsByTagName("input")[0];
          if (container_port.value == "") {
            this.setState({
              port: true
            });
            container_port.className = "form-control form-control-sm inputError";
            container_port.focus();
            this.refs.portTip.innerHTML = _constants.INPUT_TIP.port.Null;
            return false;
          }
          containerObj.container_port = container_port.value;
          containerObj.protocol = containerTr[i].getElementsByTagName("select")[0].value;
          containerObj.access_mode = containerTr[i].getElementsByTagName("select")[1].value;
          containerObj.access_scope = containerTr[i].getElementsByTagName("select")[2].value;
          container.push(containerObj);
        }
        for (var _i3 = 0; _i3 < saveTr.length; _i3++) {
          var saveObj = {};
          var disk_name = saveTr[_i3].getElementsByTagName("select")[0];
          var disk_path = saveTr[_i3].getElementsByTagName("input")[0];
          var readonly = saveTr[_i3].getElementsByTagName("input")[1].checked ? "True" : "False";
          if (disk_name.value != -1 && disk_path.value == "") {
            this.setState({
              volume: true
            });
            disk_path.className = "form-control inputError";
            this.refs.volumeTip.innerHTML = _constants.INPUT_TIP.volumes.Null;
            disk_path.focus();
            return false;
          }
          saveObj.disk_name = disk_name.value;
          saveObj.disk_path = disk_path.value;
          saveObj.readonly = readonly;
          save.push(saveObj);
        }
        for (var _i4 = 0; _i4 < envTr.length; _i4++) {
          var envObj = {};
          var env_key = envTr[_i4].getElementsByTagName("input")[0];
          var env_value = envTr[_i4].getElementsByTagName("input")[1];
          if (env_key.value && env_value.value == "") {
            this.setState({
              env: true
            });
            this.refs.envTip.innerHTML = _constants.INPUT_TIP.env.Null;
            env_value.className = "form-control inputError";
            env_value.focus();
            return false;
          }
          envObj.env_key = env_key.value;
          envObj.env_value = env_value.value;
          env.push(envObj);
        }
        var third = {
          container: container,
          env: env,
          volume: save,
          auto_startup: this.state.isStateUp,
          command: this.refs.command.value
        };
        if (this.state.env || this.state.port || this.state.volume) {
          return false;
        }
        var data = (0, _assign2.default)({}, this.props.deployData, third);
        console.log(data);
        this.props.onDeployService(data);
      }
    }, {
      key: 'getIsStartUp',
      value: function getIsStartUp(value) {
        this.setState({
          isStateUp: !value ? 1 : 0
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.onVolumeListLoad();
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.NEW_SERVICE);
        var my = this;
        if (!my.props.deployData.image_id) {
          my.context.store.dispatch((0, _notification.receiveNotification)({ message: "请先选择要部署的镜像", level: "danger" }));
          my.context.store.dispatch((0, _route.navigate)("/choseImage"));
          setTimeout(function () {
            my.context.store.dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          this.props.onVolumeListLoad();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle(title);
        var data = this.props.deployData;
        var n = 0;
        this.props.volumeList.map(function (item) {
          if (item.disk_status == "unused") {
            n++;
          }
        });
        var volumeLength = n == 0 ? "暂时没有数据卷" : '\u76EE\u524D\u6709' + n + '\u4E2A\u6570\u636E\u5377';
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTab'
        }, void 0, _ref12, (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref13, (0, _jsx3.default)('div', {
          className: 'astBox'
        }, void 0, this.getPortTable()), (0, _jsx3.default)('div', {
          className: 'assBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.addPortTr.bind(this)
        }, void 0, '\u6DFB\u52A0'), _react2.default.createElement('span', { className: this.state.port ? "inputTip inputTipShow" : "inputTip", ref: 'portTip' }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
          title: '\u5B58\u50A8\u8BBE\u7F6E',
          titleEnglish: 'SAVE SETTING',
          titleInfo: volumeLength
        }), _react2.default.createElement(
          'div',
          { className: 'astBox', ref: 'tab_save_box' },
          this.getSaveTable()
        ), (0, _jsx3.default)('div', {
          className: 'assBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.addSaveTr.bind(this)
        }, void 0, '\u6DFB\u52A0'), _react2.default.createElement('span', { className: this.state.volume ? "inputTip inputTipShow" : "inputTip", ref: 'volumeTip' }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref14, _react2.default.createElement(
          'div',
          { className: 'astBox', ref: 'tab_env_box' },
          this.getEnvironment()
        ), (0, _jsx3.default)('div', {
          className: 'assBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.addEnvironmentData.bind(this)
        }, void 0, '\u6DFB\u52A0'), _react2.default.createElement('span', { className: this.state.env ? "inputTip inputTipShow" : "inputTip", ref: 'envTip' }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref15, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement('input', { className: 'form-control',
          type: 'text',
          ref: 'command',
          placeholder: '\u5982\u679C\u8F93\u5165\uFF0C\u4F1A\u8986\u76D6\u955C\u50CF\u7684\u9ED8\u8BA4\u542F\u52A8\u547D\u4EE4'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem assItemNoborder'
        }, void 0, _ref16, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)(AutoStartUpToggle, {
          isState: data.auto_startup == 1,
          getToggle: this.getIsStartUp.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'fixedBottom'
        }, void 0, (0, _jsx3.default)('div', {
          style: { "marginLeft": this.props.isSidebarOpen ? "209px" : "79px" }
        }, void 0, (0, _jsx3.default)(_Link2.default, {
          className: 'btn btn-primary',
          to: '/configContainer',
          onClick: this.onChangeStep.bind(this)
        }, void 0, '\u4E0A\u4E00\u6B65'), (0, _jsx3.default)('button', {
          className: 'btn btn-primary ' + (!this.props.isBtnState.deploy ? "btn-loading" : ""),
          onClick: this.deployService.bind(this),
          disabled: !this.props.isBtnState.deploy
        }, void 0, this.props.isBtnState.deploy ? "部署" : "部署中...")))));
      }
    }]);
    return AddService;
  }(_react.Component);
  
  AddService.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  exports.default = AddService;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ServiceStep = __webpack_require__(155);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '1'), '\u955C\u50CF\u6765\u6E90');
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, 'MIRRIR SOURCE');
  
  var _ref3 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '2'), '\u5BB9\u5668\u914D\u7F6E');
  
  var _ref4 = (0, _jsx3.default)('p', {}, void 0, 'CONFIGURATION');
  
  var _ref5 = (0, _jsx3.default)('p', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '3'), '\u9AD8\u7EA7\u8BBE\u7F6E');
  
  var _ref6 = (0, _jsx3.default)('p', {}, void 0, 'ADVANCED SETUP');
  
  var ServiceStep = _react2.default.createClass({
    displayName: 'ServiceStep',
  
    getDefaultProps: function getDefaultProps() {
      return {
        dataActive: "first"
      };
    },
    render: function render() {
      var activeFirst = [_ServiceStep2.default.ssHdBox, _ServiceStep2.default.ssHdFirst];
      var activeSecond = [_ServiceStep2.default.ssHdBox, _ServiceStep2.default.ssHdSecond];
      var activeThird = [_ServiceStep2.default.ssHdBox, _ServiceStep2.default.ssHdThird];
      switch (this.props.dataActive) {
        case "first":
          activeFirst = activeFirst.concat([_ServiceStep2.default.ssActive]);
          break;
        case "second":
          activeSecond = activeSecond.concat([_ServiceStep2.default.ssActive]);
          break;
        case "third":
          activeThird = activeThird.concat([_ServiceStep2.default.ssActive]);
          break;
      }
  
      return (0, _jsx3.default)('div', {
        className: _ServiceStep2.default.ssHd
      }, void 0, (0, _jsx3.default)('div', {
        className: (0, _classnames2.default)(activeFirst)
      }, void 0, (0, _jsx3.default)('div', {
        className: (0, _classnames2.default)(_ServiceStep2.default.ssHdIcon, "icon-mirrorceer")
      }), (0, _jsx3.default)('div', {
        className: _ServiceStep2.default.ssHdName
      }, void 0, _ref, _ref2), (0, _jsx3.default)('div', {
        className: _ServiceStep2.default.ssActiveIcon
      })), (0, _jsx3.default)('div', {
        className: (0, _classnames2.default)(activeSecond)
      }, void 0, (0, _jsx3.default)('div', {
        className: (0, _classnames2.default)(_ServiceStep2.default.ssHdIcon, "icon-containerconfig")
      }), (0, _jsx3.default)('div', {
        className: _ServiceStep2.default.ssHdName
      }, void 0, _ref3, _ref4), (0, _jsx3.default)('div', {
        className: _ServiceStep2.default.ssActiveIcon
      })), (0, _jsx3.default)('div', {
        className: (0, _classnames2.default)(activeThird)
      }, void 0, (0, _jsx3.default)('div', {
        className: (0, _classnames2.default)(_ServiceStep2.default.ssHdIcon, "icon-advancedset")
      }), (0, _jsx3.default)('div', {
        className: _ServiceStep2.default.ssHdName
      }, void 0, _ref5, _ref6), (0, _jsx3.default)('div', {
        className: _ServiceStep2.default.ssActiveIcon
      })));
    }
  });
  
  exports.default = (0, _withStyles2.default)(_ServiceStep2.default)(ServiceStep);

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(156);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "._2b75{height:80px;border-bottom:1px solid #e0e0e0;padding:25px 0 0 80px}.pGlS{width:30%;height:55px}._1W1I,.pGlS{display:inline-block;position:relative}._1W1I{width:45px;height:43px}._1W1I:before{display:inline-block;font-size:45px;position:absolute;color:#afafaf}._1W4-{display:inline-block;margin-left:4px;vertical-align:top;margin-top:5px}._1W4- p{color:#afafaf;font-size:16px;line-height:16px}._1W4- p:last-child{font-size:10px;margin-top:3px}._1W4- span{display:inline-block;font-size:20px;position:relative;top:2px;margin-right:4px}.jSIi{position:absolute;height:20px;width:160px;background:url(" + __webpack_require__(157) + ") 0 -137px no-repeat;top:53px;left:-12px;display:none}._1jIQ._1cJ9 ._1W1I:before,._3Ppd._1cJ9 ._1W1I:before,._12TS._1cJ9 ._1W1I:before,.pGlS._1cJ9 ._1W4- p{color:#2dafdf}._1cJ9 .jSIi{display:block}", ""]);
  
  // exports
  exports.locals = {
  	"ssHd": "_2b75",
  	"ssHdBox": "pGlS",
  	"ssHdIcon": "_1W1I",
  	"ssHdName": "_1W4-",
  	"ssActiveIcon": "jSIi",
  	"ssActive": "_1cJ9",
  	"ssHdFirst": "_1jIQ",
  	"ssHdSecond": "_12TS",
  	"ssHdThird": "_3Ppd"
  };

/***/ },
/* 157 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACcCAYAAAD4d6D7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphMjM4ZTVhYy1lMzYyLTQwYjctOTQzMy00ZTQ5ZjBlNWNiZjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mjc1QzIwQUQ1NkNBMTFFNjhGRjdDNUQzQTNENEZENUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjc1QzIwQUM1NkNBMTFFNjhGRjdDNUQzQTNENEZENUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphMjM4ZTVhYy1lMzYyLTQwYjctOTQzMy00ZTQ5ZjBlNWNiZjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTIzOGU1YWMtZTM2Mi00MGI3LTk0MzMtNGU0OWYwZTVjYmYxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fMcl2gAAFK9JREFUeNrsXQmYVMURruUSUAQEREXx4oon3oJE0cQjmigSNWq8gLhGjSaCeCDxJoKCZ8SwGm/FaIwYc5h4ABEPPKKCGhCUQ+UQcEXOZVk2/e/7+9vex9vZmdk3s7P1ur6vvp3tee/1VPf/uqurqquL9n5unsREPzZ8jeHdDY83fIfhlfV96IwBu6R9bUlJSUHLUlxcLJ5qUpMYnnG84bcNv2D4UMOdDF9neB47sU0jag9NsqgH4HGG3zL8d8MHsexbDFr83N7wzYY/N3yl4a0KuB00yaIegOisNwz/0/AhLMP0dIPhXQ33NjzA8If8rqPh0YY/MzzUcKsCA54WWdQD8Bins/qw7DvDN7GzrueoUWn4ecP7GT7F8Ee8dlvD4ziKXGq4ZQPKrUkW9QD8oeFphv/ldNYqw6PYWdcaLo24D533rOF9DZ9heBbLtzN8l+G5hi8y3CKP8mqSRT0AjzL8muGXDB/GstWGb2FnjTT8TRp1bDL8lOE9DZ9j+FOWdzF8L//H8rB5DuXUJIt6APY3PNXwK4b7OZ01hp01wvCKLOpC5z3GzhvElSVoZ8MTDM9mebMY5dMki3oAHm54Mvlwlq0xfJvh3QxfZXh5DHVuNPyw4Z4cLRawHIB40PAnhs823LQedWiSRT0A9+IIMZUjhu2sseysKwwvy0Hd5YbvN9yD+tOXLO9u+FEq/Mdl+ExNsiQGgGOoI1l6ip013PDXefgNGwzfx866jgo/qJfhpzN8liZZEgPAFziVWDrJ8OWG2+Xxd7TgyHGJ4SKnfGKGz9EkS2IA+AfDexh+jm9sK44YMC0My7FpoQl1pDkS2NU6shxeiSMMX5Dh8zTJkqhFCBptoOG+hl9nWQfqTjAtnCHx+I1dgk70X+pIXVk2y/kd/8nyuZpkSZwZ5i2aK9Bw/3NMC08aftfwD2KoE77WVyXwQuzLssUcIfZ2Rq/6kiZZEgNAS2i4fQz/kg0KgjvqZTZ27yzq6mb4T4anGz6SZXB3jeR3JSH9LS7SJEsiANiZf9GAE2hagItqtTPdvCeB/atrGnXAXQUvAWxip1Exx2rxDq4W4QZby2vj9qlqkkU9APeg2WJRaGRAZ93EN3s8OxP3nUs959ZaVpkIWbqBOhlWhXBPwYPwOIGAaJLlztQI/QleiTvZ0fUhTbKoB2A36kUzDf+MZXDa/1pqhhstNXyx4e8Z/kuKVSb4VxJEilwr1bFzLxo+gCvFBc5zWxu+m+WtWe/nXDRsk8XUqEWWxADwP6GVoevjXBdxDzrop1zdTQutMjFCfGz4HgmiiUHvSGAc/pHhDyKet5b2OgQJTGZZK4JgQobyaJIlMQCcGyrbLc23FavM7xs+mTqRUI/q5nTu6RIEek5O43fsRnZpQYbyaJIlMQDEFHW5o8Pg7X2DU1OPNJ4xiSaIC6hzLeH0tidXinWZIexC4DHqT64NbXiG8miSJTEAxCpuHFdxt3KqKuJo8DFXfXUp0htpetjJ8I5U8DdkYEPrHZMNTZMsiVsFw46FDTdwnD/EVV4zrvrmhJTw2gj3VBSADU2TLImzAy40PFgCY+2LITMEXFkXSnaBlpnY0OIiTbIkBoDt+XcGV3twWb3Psu05Jc3ktJYOZWJD6xizfJpkUQ3AJlSU36DiPdZpwFdp8zpTqkPPe1Gxh7O/Ty3PzsSGBn3rj6wbppSj6ymTFlkSAcATJXDWP8sOaEG72SDnOijQE9lZw5y3vK+zyuzJsiLa4tK1oeF6eCKw7bEpzSH/5nP3y1AeTbIkBoCPOyYKdM6NtIHdVssq83bqOWOk2riLKQxh5whLR6TJkyEb2s9S2NBQJ7IO7Co1gzb7cPTKhDTJkhgAljgmArzBl9L21aqOVeZVEavMXxjen9dYGxr8sk/XYYaAPoYtkqc6ZQDEwxnKo0mWxADwcr7RU1jWjiMCDKjnSergTbvK7O2sMuHwv44jC5T88hT3t+OIgZGlmB2/iUAAIB7LUB5NsiRqEfIO7VgnSE1XFBoPkb517eiaSX2oF++7UapDnmpT6i/jahJZp1qz/G8SxO4NJiCyIU2yJM4M8w8JLPdDDH/FMrimYOF/JQ1FGhuyS+uo7yza4G6XzfdN/IQKfxykSZZE2QExbTzIaWckdSThqu89KuW7ZFFXlJ90tuR234QmWRIDQFdxHsXOu5urRmuWmB2yr6Wi2vykCJHHRvJ8+Ek1yZIYAFqCnQyBlXvStFBJvWcY9Z4ralllRvlJV3IkAhAQH5dvP6kmWRIDQHFsYGemscqszU96JzsSI9GaBpZbkyyJAWA6q8wZsrmf9AkJPAuXSTwJgeIkTbIkBoCpVpmY2lw/6YFcKc4v8HbQJEtiABi1yvyaZghEncCW9n4jagtNsjQaKqqs9Is2Tx6AnjwAPXnyAPTkAejJkwegJw9AT57yAMAYj2tFCBLsZwdLsMEHUcGvxfHgTI5snTRpUsHLM2DAAI88UhypahHahGMRpkiQGmNrCQy3CElC5Ej/RtYm2uRRC0Ac+IeMUgjuPNwpd8/hgJ91Mjv0qAJvC23yqAUgRgNsM8SBf4c55XBbwamPrKSIBn7H+e5wduw0dnQhkTZ51AIQznrEw8Fx727gRucdxzJ8h1XN36g7ncCOtHQYOxo61Z4NLLs2eVQDEFEh/2YnWIJCfrTTCVFkO9ceDG0JYeuIMGmoA5+1yaMegFC8bVqz16n/YBp6Oc377fSG6epNlu3IlWZDkDZ51ANwa+czdv3vk8Xb3prTnps5tKHyJmuTJ1GLkB0kCEmHAXGoVO+DTTXdXc7rx0n10QmFQtrkSYwZpjM7AB0xXDZP+NhGgpQXyCiF3CzbsrxQN+9ok0c9AC2hI25lx6CDcHz9NexIeA9sRils5sFhggcWeJtok6egKc4j5Tuxg24Jla+XIF/eaAkOcm7bSNpGmzzqARgmbAYv4XT1lYK20iaPagBiS+OxEqQ100Da5FGlA0bRF8o66wsPvoYF4I4x1uk+q0sDya1NHrUAhKUfLqoxMdS1uwT7bt2cylhtTpH8RZZok0ctAK2vEy6nfvWsAxu9H5Yg58qgCL0T7qtXCIxcRZZok0ctAG20B9KPhSNE8B1yoixK89nIoYJzc5Fz5Vyno2C6QO5mhDhNd67vR4DYaJQ4SJs8agGIFR7i3RB2dIjzvRshgkiQOzn1XMqGr41wPAGyg57tdBTS1CLRN7JK3cO6DpXNI0v6EDDTJfszNrTJoxqAyAZvk+9YshG/UREi69ng3dgBUfmP4exvys/zJUjgaBN9l4WutZElR0vNPRcH87vBGcqkTR71ABwZmpqgw/SXus/FLWMHdGeHLA19v5hgwLkdSOBY14mTLxMgR0l10Cfy8V2doUza5FEPwJ2d/3GEPfY9tMtQKUcHdwqVb8tndcvgWdvwnu85ZbtlKJM2eRK1CMHhftdzmrlRUse3IRbuGQm8BKdHPAtT1s8lOHUI6XBThax3kCDbKBz+v5Wa/tX6GMu1yZMYM0xbNtw8NmQH5zsk58Z5ah9KcCaafcY8iU7e2IQdOoMdvLfznXX4474RUh0oulpqbgKqL2mTRz0AXeV7BBsUTvjnJTjs5WTqM6DPqFj3lNTnYjRhB3/IDrexdwh5srF3q9iBmKYeyoG82uRp9JRuMIKNAnYJxxv8ToKzNjIJyiySzc/nXcmVKA58/iYPcmuTRz0AXcJxqDgTDccWVNSzfpxEdJcEZ3eUNlAbaJNHPQCxBfHbmOq/RILM8w1J2uRRpQNGUZzptAohNZc2edQD0JOnWAFYHtOz4AfdK6Zn4dDnE/i5LMN7tcmjHoBvxdC40Hvg9tq5ns/CuW1XSnAEqu2waRk+Q5s86gGIo6jmZ3EvMglcw8Y9U6rtaPOz/C0wZcDuht1m1o42l4p9JqRNHvUAhGtpDwmc+KszaNxZNF+4jYvzcnfl37lpPgt1w3EPY671s67m79mHZpJMSJs8iViE2PN00XgT61jNvcjG7cr/Ye2HURe+0edY9hz1p7pAgIBQeBJ+4KwiH5Eg4mQUf1c2pE2exKyCv+D0A9vY2ymUc5A9Ww0uK7ihwuFJZWz0HrwuCgSI2Wvm6G6o9zwJQp/iIG3yJMYMg8ZDJO+QWhrvTTb2kDQadzGv61vLAgHfn5Xi+zhImzzqAeiOCHjj4SMtpf6CEQURv+9nAYK+vB+K/grqXD246sy1EVebPCrInxPiyQPQkwegJ08egJ48AD158gD05AHoyZMHoKcEADCG41qx1xYhR6dKkB8P6Wv/LEEUSL025GRyTKulkpKSgpWnuLjYIy5E9U3Ri+SMUyRI8GMJ0SM45gARJP0lddKfQiNt8hQ81Tck/yGnsxAxcpVUR5DYBI6NibTJoxqAiBr5IT/fwhFiDP/aow2QIapXI2kLbfI0+ikYEcKI6jiCn2dwhLDpy9yUFOGRAedoXO1cN4ufEXOHrKIIzERsHNKmPS75iZPTJo9qAOItf0FqZoIayE443/BjUnO/xLLQ/cudzzbQ8xwJ0pq1dL5Dsp8rJMguOiuHcmqTR/UUjAb9q9NZCzlaIGvAFhJE+CKMaWyadYzl9Q/z2RV8nh15urG+ljmSUZs86gGIN7s7P2P1B1vIvhIEdCLYssjRg9axscNbDctYvs4ZgYp4fx8+bxeOFsL6zsmRjNrkUQ9Ae+jyLL7t1lKN9GJHstHnS7D7DIc+nyRBmluX1rN8O163kPcdKdVpyvDc25ypKleHPWuTR70OaKeOKKMrMkgdRB1pQxrP/87wfVTikTsv6oy1b0L15mIK1iSP+hHwI/5FUu2oo0i/SrOzXNpQS2cdyHrceuMmbfKoB+CD1HkwOj5P+1guqCf1qmasL1dGXm3yqAfgAgl2fUGnwXH2yC7fpY6Gx3bFlwy/y7+j6uhoPO9VCdJgVLK+BTmSUZs86gEIeoL6kZ1ulkdcAxPGeE41SHsLL8IB/DuC5eN5XZjwvHJncZDrnHra5FG7COlBk0JPxzQxOsIsgaQ7SD9hz11D42Nv7SKOMjBNNDd8oQSeA5xctDZk1hjDDsURBiMJEGQV+DRG+bTJo3YExBTyLzba04ZvcswPUW/zHU5nTaINDGaHM/h3F+pbwuvGRTzjccfccRPrnc3fsUM95dImj2oAIv5tikSf7IjGWxWhI13Az+iUgbL5gX/4/2Qq5aDzI3SoVXx+mPA7pkrqMz1SkTZ51AMQIUfdnJGgOxtrG44AYcIZGU05TV0ktWcAqOSUVc7rT4+45gynru6sX/h7rspSJm3yqAfgKfyMuLehEqQhKyVHRXXY0yfflLqPOl3E68Sxj7m0zqlrLuufxO9OzVImbfKoB6A1SUzPYIoDpRsZbK/rkOb1NqFPtnqTNnnUA/Cr0EhQF1lX044ZAmJFmtcf4ow22ZA2edQD8M/8DCX7dglCz9uTW0XcY/Ps9Unjrcb3fUP3udTKqWt31m9PHXomS5m0yaMegKOlOv3sZfz8DXlixD0oq6Bd7F6pzqUcpiLaxZrz+qcirnnSqWsu6xd+Hp2lTNrkUQ9ANFZ/CVxOYYLBtU2oDLatCfw8QIL0ttuHrtme5Sfx//ul2hNhqQ2fH6aX+Huy3QKpTR7V1MzRm46hbas3TQgwpiKkCGHmfwjdhzcb+yD6sdOO5+pwMTsL01kLXotjCYZF1P1zZ0q8VgKPwQcRHZutHqhJHrWUamP6JxK4lRawI8Puq5a0c/1CouMKceLkA4Z/E3HvFuwY7MNAePseUT8g5o3pDS6P35he+wgY9TZb3yne/I6yefwb3E4wzN5p+FzaxdpJcPAfFPRHUrz9HZ0RpRfry6UDX5s8qgG4M990u+fhSIkOvnR1qBFZTJF47mROcQ9wastFCJM2edQtQsI0mNMRppwTc6jDzObzN7K+wTmqR5s86gG4l2Pnejfi+y7OdJMutZDoINB3HXvaXjmSUZs86gFoQ4qiojd6soFnU19qU8fz2/C62bwvKqp4m1C9cZM2edQDcKqjTA+TasMsdo8h7BzeACxPYZRdKoGzvWXEinISvx/P6204/EF2BS7BkVi9QvXGTdrkUW+GQWNjp7/dzI09sDCiIhIYYUiVHAHcJD1YLa50/m/L1aOlWRwt0EnwIszkSGHTXMyRwA63PgdmmIKRx5th0p+CoUxbdxYatTc7q4wmCtjThqdZx3Befx6f3ZTPs501l/XlcgrWJI96M4x9w/EG22xSW0pg1XezSc13ru8UGjE6Op+tKeJRCSKVB7HD1kj+sklpk0c9AIWNeD85imaGTB2u7WxILdehs29oIFm1yaMegOnYvbCTDNsWr3ZWlPAgDOQ1L0vjSVOmTR71ABROP5iGdmcnDXS++4zfNybSJk+jXIRkQl9yhBhLHWoD/45leWNL6K1NnsI3w/hzQjx5AHryAPTkyQPQU/JWwftMmp9YBJ67Q5EMPairFBUV5aU+vOwLFy6UiUtEnlzsX/w4VsGNmh5dVFnlyM3bdGOA/o91bT34QlNwIlvjmfmr5OYPVggGv1H7d5ITdtoy53XeN+vbKm5i6hx9YCc5rsuWHoCVCVYCH5qzUu74uFSaG0SMO7iT9N+utQefB2B+6e5PSuWBT1dKy6ZF8vtDO8vBnVp68HkA5pdu/nCFPD1vlWzVvIlM6NtZ9m6/hQefB2D+CA0w4r1l8vcv1kj7LZrKA4d1lu5bt/Dg8wDMH1WYZrhs+jKZsmStdG7VTP7Yr7N03bK5B58HYP6orKJSLn5rqby9bH0V+ABCgLE+4BtjwHesB58HYLq0ZuMmKX59qcwsLauahjEdY1r24PMAzBt9u2GTDJm2ROZ8t6FqQYKFCRYoHnwegHmjZesrZNBrS2ThmvIq0wxMNDDVePB5AOaNvlyzUQaZkXDpuo1VRmoYq2G09uDzAMwbfbaqXAYbEJaWVVS56+C2czHowecBmHP6yCxIit9YKqvLN8lpu7aRa/btULUj3YPPAzBv9M7y9XLxm0tlfUWlDOnRVloY1HnweQDmlaYuWStD314m5ZuCJvPg8wDMO/3zyzVy9XvLqj578HkANgghlrBN8ybevRYD/V+AAQAbI/LsTYfpDAAAAABJRU5ErkJggg=="

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getServiceDetail
  var getDeployData = function getDeployData(state) {
    return state.deployData;
  };
  
  var makeGetDeployData = function makeGetDeployData() {
    return (0, _reselect.createSelector)([getDeployData], function (deployData) {
      return deployData;
    });
  };
  
  exports.default = makeGetDeployData;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ChoseImageContainer = __webpack_require__(160);
  
  var _ChoseImageContainer2 = _interopRequireDefault(_ChoseImageContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_ChoseImageContainer2.default, {});
  
  exports.default = {
  
    path: '/choseImage',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ChoseImage = __webpack_require__(161);
  
  var _ChoseImage2 = _interopRequireDefault(_ChoseImage);
  
  var _reactRedux = __webpack_require__(51);
  
  var _deployService = __webpack_require__(108);
  
  var _imageList = __webpack_require__(96);
  
  var _imageListSelector = __webpack_require__(97);
  
  var _imageListSelector2 = _interopRequireDefault(_imageListSelector);
  
  var _deployDataSelector = __webpack_require__(158);
  
  var _deployDataSelector2 = _interopRequireDefault(_deployDataSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selectorImage = (0, _imageListSelector2.default)();
    var deployData = (0, _deployDataSelector2.default)();
    return {
      imageList: selectorImage(state),
      deployData: deployData(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onImageListLoad: function onImageListLoad(flag) {
        dispatch((0, _imageList.fetchImageListAction)(flag));
      },
      goToConfigContainer: function goToConfigContainer(obj) {
        dispatch((0, _deployService.goToConfigContainer)(obj));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      }
    };
  };
  
  var ChoseImageContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ChoseImage2.default);
  
  exports.default = ChoseImageContainer;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceStep = __webpack_require__(154);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Tabs = __webpack_require__(162);
  
  var _Tabs2 = _interopRequireDefault(_Tabs);
  
  var _Tab = __webpack_require__(163);
  
  var _Tab2 = _interopRequireDefault(_Tab);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _constants = __webpack_require__(38);
  
  var _utils = __webpack_require__(117);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '新建服务'; /**
                       * Created by zhangsai on 16/9/18.
                       */
  
  var _ref = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref2 = (0, _jsx3.default)('img', {
    className: 'mediaImg',
    src: '/slImgJx.png'
  });
  
  var _ref3 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u955C\u50CF\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u6700\u8FD1\u66F4\u65B0'), (0, _jsx3.default)('th', {
    width: '35%'
  }, void 0, '\u62C9\u53D6\u547D\u4EE4'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u955C\u50CF\u63CF\u8FF0'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref4 = (0, _jsx3.default)(_ServiceStep2.default, {
    dataActive: 'first'
  });
  
  var _ref5 = (0, _jsx3.default)('div', {
    className: 'left'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u9009\u62E9\u955C\u50CF',
    titleEnglish: 'SELECT MIRROR',
    titleInfo: '\u8FD9\u91CC\u91CC\u6C47\u805A\u4E86\u6784\u5EFA\u4EA7\u751F\u7684\u6240\u6709\u5BB9\u5668\u4E91\u955C\u50CF'
  }));
  
  var _ref6 = (0, _jsx3.default)('a', {
    type: 'button',
    className: 'slSearchBtn icon-select'
  }, void 0, ' ');
  
  var ChooseImage = function (_Component) {
    (0, _inherits3.default)(ChooseImage, _Component);
  
    function ChooseImage() {
      (0, _classCallCheck3.default)(this, ChooseImage);
      return (0, _possibleConstructorReturn3.default)(this, (ChooseImage.__proto__ || (0, _getPrototypeOf2.default)(ChooseImage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ChooseImage, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.ADD_SERVICE, _constants.BREADCRUMB.CHOSE_IMAGE);
        this.props.onImageListLoad(false);
      }
    }, {
      key: 'deployImage',
      value: function deployImage(ImageName, id) {
        var data = {
          image_name: 'index.boxlinker.com/' + ImageName,
          image_id: id
        };
        this.props.goToConfigContainer(data);
      }
    }, {
      key: 'tabSelect',
      value: function tabSelect(key) {
        switch (key) {
          case 1:
            this.props.onImageListLoad(false);
            break;
          case 3:
            this.props.onImageListLoad(true);
          default:
            break;
        }
      }
    }, {
      key: 'getTableBody',
      value: function getTableBody() {
        var _this2 = this;
  
        var data = this.props.imageList;
        if (!data.length) {
          return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
            colSpan: '5',
            style: { "textAlign": "center" }
          }, void 0, '\u6682\u65E0\u6570\u636E~'));
        }
        if (data.length == 1 && data[0] == 1) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '5',
          style: { "textAlign": "center" }
        }, void 0, _ref));
        var body = [];
        data.map(function (item, i) {
          body.push((0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'mediaItem'
          }, void 0, (0, _jsx3.default)(_Link2.default, {
            to: '/imageDetail/' + item.uuid
          }, void 0, _ref2, (0, _jsx3.default)('span', {
            className: 'mediaTxt'
          }, void 0, item.repository)))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('span', {
            className: 'cl6'
          }, void 0, (0, _utils.timeRange)(new Date(item.update_time)))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('span', {
            className: 'cl6'
          }, void 0, 'docker pull index.boxlinker.com/' + item.repository)), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('span', {
            className: 'cl3'
          }, void 0, item.short_description)), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('button', {
            className: 'btn btn-sm btn-primary',
            onClick: _this2.deployImage.bind(_this2, item.repository, item.uuid)
          }, void 0, '\u90E8\u7F72'))));
        });
        return body;
      }
    }, {
      key: 'getDemoTable',
      value: function getDemoTable() {
        return (0, _jsx3.default)('table', {
          className: 'table table-hover table-bordered'
        }, void 0, _ref3, (0, _jsx3.default)('tbody', {}, void 0, this.getTableBody()));
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle(title);
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTab'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'asHd clearfix'
        }, void 0, _ref5, (0, _jsx3.default)('div', {
          className: 'right'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'search'
        }, void 0, _react2.default.createElement('input', { type: 'text', placeholder: '\u641C\u7D22\u955C\u50CF', ref: 'searchInput', className: 'slSearchInp' }), _ref6))), (0, _jsx3.default)('div', {
          className: 'asTabs'
        }, void 0, (0, _jsx3.default)(_Tabs2.default, {
          defaultActiveKey: 1,
          onSelect: this.tabSelect.bind(this),
          id: 'asTabs'
        }, void 0, (0, _jsx3.default)(_Tab2.default, {
          eventKey: 1,
          title: '\u6211\u7684\u955C\u50CF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTableBox TableTextLeft'
        }, void 0, this.getDemoTable())), (0, _jsx3.default)(_Tab2.default, {
          eventKey: 3,
          title: '\u5E73\u53F0\u955C\u50CF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTableBox TableTextLeft'
        }, void 0, this.getDemoTable()))))));
      }
    }]);
    return ChooseImage;
  }(_react.Component);
  
  ChooseImage.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react2.default.PropTypes.object
  };
  exports.default = ChooseImage;

/***/ },
/* 162 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap/lib/Tabs");

/***/ },
/* 163 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap/lib/Tab");

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ConfigContainer = __webpack_require__(165);
  
  var _ConfigContainer2 = _interopRequireDefault(_ConfigContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_ConfigContainer2.default, {});
  
  exports.default = {
  
    path: '/configContainer',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ConfigContainer = __webpack_require__(166);
  
  var _ConfigContainer2 = _interopRequireDefault(_ConfigContainer);
  
  var _reactRedux = __webpack_require__(51);
  
  var _deployService = __webpack_require__(108);
  
  var _deployDataSelector = __webpack_require__(158);
  
  var _deployDataSelector2 = _interopRequireDefault(_deployDataSelector);
  
  var _isSidebarOpenSelector = __webpack_require__(71);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _building = __webpack_require__(113);
  
  var _buildingDetailSelector = __webpack_require__(138);
  
  var _buildingDetailSelector2 = _interopRequireDefault(_buildingDetailSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var deployData = (0, _deployDataSelector2.default)();
    var isSidebarOpenSelector = (0, _isSidebarOpenSelector2.default)();
    var buildingDetail = (0, _buildingDetailSelector2.default)();
    return {
      deployData: deployData(state),
      isSidebarOpen: isSidebarOpenSelector(state),
      buildingDetail: buildingDetail(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      deployContainer: function deployContainer(data) {
        dispatch((0, _deployService.deployContainerAction)(data));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      onGoToService: function onGoToService() {
        dispatch((0, _deployService.goToService)());
      },
      getBuildingDetail: function getBuildingDetail(id) {
        dispatch((0, _building.fetchBuildDetail)(id));
      }
    };
  };
  
  var ConfigContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ConfigContainer2.default);
  
  exports.default = ConfigContainer;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceStep = __webpack_require__(154);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _ContainerBox = __webpack_require__(167);
  
  var _ContainerBox2 = _interopRequireDefault(_ContainerBox);
  
  var _reactInputRange = __webpack_require__(173);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _index = __webpack_require__(38);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _constants = __webpack_require__(38);
  
  var _route = __webpack_require__(58);
  
  var _notification = __webpack_require__(78);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = '新建服务';
  
  var InputRangesBox = function (_Component) {
    (0, _inherits3.default)(InputRangesBox, _Component);
  
    function InputRangesBox(props) {
      (0, _classCallCheck3.default)(this, InputRangesBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (InputRangesBox.__proto__ || (0, _getPrototypeOf2.default)(InputRangesBox)).call(this, props));
  
      _this.state = {
        value: _this.props.number
      };
      return _this;
    } //input滑块
  
  
    (0, _createClass3.default)(InputRangesBox, [{
      key: 'handleValueChange',
      value: function handleValueChange(component, value) {
        this.setState({
          value: value
        });
        this.props.getContianerNum(value);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: 'formField'
        }, void 0, (0, _jsx3.default)(_reactInputRange2.default, {
          className: 'formField',
          maxValue: 10,
          minValue: 0,
          labelSuffix: '\u4E2A',
          value: this.state.value,
          onChange: this.handleValueChange.bind(this)
        }));
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  var UpdateStartToggle = function (_Component2) {
    (0, _inherits3.default)(UpdateStartToggle, _Component2);
  
    function UpdateStartToggle(props) {
      (0, _classCallCheck3.default)(this, UpdateStartToggle);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (UpdateStartToggle.__proto__ || (0, _getPrototypeOf2.default)(UpdateStartToggle)).call(this, props));
  
      _this2.state = {
        autoStart: _this2.props.state
      };
      return _this2;
    }
  
    (0, _createClass3.default)(UpdateStartToggle, [{
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.props.getToggle(this.state.autoStart);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return UpdateStartToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('option', {
    value: 'latest'
  }, 'latest', 'latest');
  
  var _ref2 = (0, _jsx3.default)(_ServiceStep2.default, {
    dataActive: 'second'
  });
  
  var _ref3 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u670D\u52A1\u540D\u79F0',
    titleEnglish: 'SERVICE NAME',
    titleInfo: '\u89C4\u5219\u540E\u5B9A'
  });
  
  var _ref4 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u540D\u79F0',
    titleEnglish: 'IMAGE NAME',
    titleInfo: '\u63CF\u8FF0'
  });
  
  var _ref5 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u7248\u672C',
    titleEnglish: 'MIRROR VERSION',
    titleInfo: '\u66F4\u65B0\u4E8E\u4E24\u4E2A\u6708\u524D'
  });
  
  var _ref6 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u5BB9\u5668\u914D\u7F6E',
    titleEnglish: 'CONTAINER CONFIGURATION',
    titleInfo: '\u89C4\u5219\u540E\u5B9A'
  });
  
  var _ref7 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u5BB9\u5668\u4E2A\u6570',
    titleEnglish: 'CONTAINER NUMBER',
    titleInfo: '\u89C4\u5219\u540E\u5B9A'
  });
  
  var _ref8 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u81EA\u52A8\u66F4\u65B0\u8BBE\u7F6E',
    titleEnglish: 'AUTO UPDATE SETTINGS',
    titleInfo: '\u5F53\u955C\u50CF\u6709\u66F4\u65B0\u65F6\u5BB9\u5668\u662F\u5426\u81EA\u52A8\u66F4\u65B0'
  });
  
  var ConfigContainer = function (_Component3) {
    (0, _inherits3.default)(ConfigContainer, _Component3);
  
    function ConfigContainer() {
      (0, _classCallCheck3.default)(this, ConfigContainer);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (ConfigContainer.__proto__ || (0, _getPrototypeOf2.default)(ConfigContainer)).call(this));
  
      _this3.state = {
        containerDeploy: 0,
        containerNum: 1,
        isUpdate: 1, //1 是   0   否
        isServiceName: false
      };
      return _this3;
    }
  
    (0, _createClass3.default)(ConfigContainer, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.ADD_SERVICE, _constants.BREADCRUMB.CONFIG_CONTAINER);
        var my = this;
        if (!my.props.deployData.image_id) {
          my.context.store.dispatch((0, _notification.receiveNotification)({ message: "请先选择要部署的镜像", level: "danger" }));
          my.context.store.dispatch((0, _route.navigate)("/choseImage"));
          setTimeout(function () {
            my.context.store.dispatch((0, _notification.clearNotification)());
          }, 3000);
        } else {
          this.props.getBuildingDetail(this.props.deployData.image_id);
        }
      }
    }, {
      key: 'onServiceNameChange',
      value: function onServiceNameChange() {
        var serviceName = _reactDom2.default.findDOMNode(this.refs.serviceName),
            serviceTip = _reactDom2.default.findDOMNode(this.refs.serviceNameTip),
            regExp = /^[a-z]+[a-z0-9_-]*$/;
        if (!regExp.test(serviceName.value) && serviceName.value != "") {
          this.setState({
            isServiceName: true
          });
          serviceTip.innerHTML = _index.INPUT_TIP.service.Format;
        } else {
          this.setState({
            isServiceName: false
          });
        }
      }
    }, {
      key: 'onNextStep',
      value: function onNextStep() {
        var serviceName = _reactDom2.default.findDOMNode(this.refs.serviceName),
            serviceTip = _reactDom2.default.findDOMNode(this.refs.serviceNameTip);
        if (serviceName.value == "") {
          this.setState({
            isServiceName: true
          });
          serviceName.focus();
          serviceTip.innerHTML = _index.INPUT_TIP.service.Null;
          return false;
        }
        if (!this.state.isServiceName) {
          var data = {
            image_version: _reactDom2.default.findDOMNode(this.refs.imageVersion).value,
            service_name: serviceName.value,
            containerDeploy: this.state.containerDeploy,
            pods_num: this.state.containerNum,
            policy: this.state.isUpdate
          };
          console.log(data);
          this.props.deployContainer(data);
          this.props.onGoToService();
        }
      }
    }, {
      key: 'getContainer',
      value: function getContainer(index) {
        this.setState({
          containerDeploy: index
        });
      }
    }, {
      key: 'getContainerNum',
      value: function getContainerNum(value) {
        this.setState({
          containerNum: value
        });
      }
    }, {
      key: 'getToggleValue',
      value: function getToggleValue(value) {
        var flag = !value ? 1 : 0; //1 true  0 false
        this.setState({
          isUpdate: flag
        });
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle(title);
        var data = this.props.deployData;
        var tags = this.props.buildingDetail.tags;
        var option = [];
        if (!tags || !tags.length) {
          option.push(_ref);
        } else {
          tags.map(function (item, i) {
            option.push((0, _jsx3.default)('option', {
              value: item.tag
            }, i, item.tag));
          });
        }
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'asTab'
        }, void 0, _ref2, (0, _jsx3.default)('div', {
          className: 'assHd'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'assBox ' + (this.state.isServiceName ? "has-error" : "")
        }, void 0, _react2.default.createElement('input', {
          className: 'form-control',
          ref: 'serviceName',
          type: 'text',
          placeholder: '',
          defaultValue: data.service_name,
          onChange: this.onServiceNameChange.bind(this)
        }), _react2.default.createElement(
          'span',
          { className: 'inputTip', ref: 'serviceNameTip' },
          ' '
        ))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)('p', {}, void 0, data.image_name))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref5, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement(
          'select',
          { className: 'form-control', ref: 'imageVersion', defaultValue: data.image_version },
          option
        ))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref6, (0, _jsx3.default)('div', {
          className: 'assBox assBoxAuto'
        }, void 0, (0, _jsx3.default)(_ContainerBox2.default, {
          number: data.containerDeploy,
          getContainer: this.getContainer.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref7, (0, _jsx3.default)('div', {
          className: 'assBox formField'
        }, void 0, (0, _jsx3.default)(InputRangesBox, {
          number: data.pods_num,
          getContianerNum: this.getContainerNum.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'assItem assItemNoborder'
        }, void 0, _ref8, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)(UpdateStartToggle, {
          state: data.policy == 1,
          getToggle: this.getToggleValue.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'fixedBottom'
        }, void 0, (0, _jsx3.default)('div', {
          style: { "marginLeft": this.props.isSidebarOpen ? "209px" : "79px" }
        }, void 0, (0, _jsx3.default)(_Link2.default, {
          className: 'btn btn-primary',
          to: '/choseImage'
        }, void 0, '\u4E0A\u4E00\u6B65'), (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.onNextStep.bind(this)
        }, void 0, '\u4E0B\u4E00\u6B65'))))));
      }
    }]);
    return ConfigContainer;
  }(_react.Component);
  
  ConfigContainer.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  exports.default = ConfigContainer;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContainerBox = __webpack_require__(168);
  
  var _ContainerBox2 = _interopRequireDefault(_ContainerBox);
  
  var _ContainerItem = __webpack_require__(170);
  
  var _ContainerItem2 = _interopRequireDefault(_ContainerItem);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)('span', {}, void 0, 'x');
  
  var ContainerBox = function (_Component) {
    (0, _inherits3.default)(ContainerBox, _Component);
  
    function ContainerBox(props) {
      (0, _classCallCheck3.default)(this, ContainerBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (ContainerBox.__proto__ || (0, _getPrototypeOf2.default)(ContainerBox)).call(this, props));
  
      _this.state = {
        index: _this.props.number
      };
      return _this;
    } //input滑块
  
  
    (0, _createClass3.default)(ContainerBox, [{
      key: 'handleClick',
      value: function handleClick(component, index) {
        this.setState({
          index: index
        });
        this.props.getContainer(index);
      }
    }, {
      key: 'render',
      value: function render() {
        var me = this,
            index = this.state.index;
        var data = [{ x: 1, m: "128M" }, { x: 2, m: "256M" }, { x: 4, m: "512M" }, { x: 8, m: "1024M" }, { x: 16, m: "2048M" }];
        var children = data.map(function (item, i) {
          return (0, _jsx3.default)(_ContainerItem2.default, {
            index: i,
            active: i == index,
            onClick: me.handleClick.bind(me, i)
          }, i, (0, _jsx3.default)('span', {}, void 0, item.x), _ref, (0, _jsx3.default)('span', {}, void 0, item.m));
        });
  
        return (0, _jsx3.default)('div', {}, void 0, children);
      }
    }]);
    return ContainerBox;
  }(_react.Component);
  
  // var ContainerBox = React.createClass({
  //   getDefaultProps:function(){
  //     return{
  //       getContainer:function(){},
  //       number:0
  //     }
  //   },
  //   getInitialState:function(){
  //     console.log(this.props.number);
  //     return{
  //       index: this.props.number
  //     }
  //   },
  //   handleClick:function(index){
  //     this.setState({
  //       index: index
  //     });
  //     this.props.getContainer(index);
  //   },
  //   render:function() {
  //     let me = this, index = this.state.index;
  //     let data = [
  //       {x:1,m:"128M"},
  //       {x:2,m:"256M"},
  //       {x:4,m:"512M"},
  //       {x:5,m:"1024M"},
  //       {x:16,m:"2048M"},
  //     ];
  //
  //     let children = data.map(function(item,i){
  //       return (
  //         <ContainerItem key={i} index={i} active={i == index} onClick={me.handleClick}>
  //           <span>{item.x}</span>
  //           <span>x</span>
  //           <span>{item.m}</span>
  //         </ContainerItem>
  //       );
  //     });
  //
  //     return (
  //       <div>
  //         {children}
  //       </div>
  //     )
  //   }
  // })
  
  exports.default = (0, _withStyles2.default)(_ContainerBox2.default)(ContainerBox);

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(169);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "", ""]);
  
  // exports


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContainerItem = __webpack_require__(171);
  
  var _ContainerItem2 = _interopRequireDefault(_ContainerItem);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var ContainerItem = _react2.default.createClass({
    displayName: 'ContainerItem',
    getDefaultProps: function getDefaultProps() {
      return {
        index: 0,
        onClick: function onClick() {},
        classNumber: 0
      };
    },
    handleClick: function handleClick() {
      this.props.onClick(this.props.index);
    },
  
    render: function render() {
      var sp1 = this.props.children[0].props.children;
      var sp2 = this.props.children[1].props.children;
      var sp3 = this.props.children[2].props.children;
      var style = this.props.active ? [_ContainerItem2.default.csItem, _ContainerItem2.default.csActive] : [_ContainerItem2.default.csItem];
      return (0, _jsx3.default)('div', {
        className: (0, _classnames2.default)(style),
        onClick: this.handleClick
      }, void 0, (0, _jsx3.default)('p', {
        className: _ContainerItem2.default.csSize
      }, void 0, sp1, (0, _jsx3.default)('span', {}, void 0, sp2)), (0, _jsx3.default)('p', {
        className: _ContainerItem2.default.csUnit
      }, void 0, sp3));
    }
  });
  
  exports.default = (0, _withStyles2.default)(_ContainerItem2.default)(ContainerItem);

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(172);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Tti{width:100px;height:103px;background:#f2f4f8;border-radius:4px 4px 7px 7px;border-top:3px solid #f2f4f8;border-bottom:3px solid #d7c698;display:inline-block;margin-right:42px;cursor:pointer}._3Tti:hover{box-shadow:0 3px 5px hsla(44,44%,72%,.35)}._1vCB{height:59px;line-height:59px;border-bottom:1px solid #ccc;margin:0 22px;text-align:center;font-size:35px}._1vCB span{font-size:30px}._3IGg{margin-top:10px;text-align:center;color:#666}._3Tti:nth-child(2){border-bottom-color:#5eafce}._3Tti:nth-child(2):hover{box-shadow:0 3px 5px rgba(39,154,197,.35)}._3Tti:nth-child(3){border-bottom-color:#a8ce6b}._3Tti:nth-child(3):hover{box-shadow:0 3px 5px rgba(130,165,75,.35)}._3Tti:nth-child(4){border-bottom-color:#889bcb}._3Tti:nth-child(4):hover{box-shadow:0 3px 5px rgba(94,117,174,.35)}._3Tti:nth-child(5){border-bottom-color:#ef6256}._3Tti:nth-child(5):hover{box-shadow:0 3px 5px rgba(168,91,85,.35)}._1e8q{background:#c8b88f;border-top:3px solid #a4873e;border-bottom:0}._1e8q,._1e8q ._3IGg{color:#fff}._1e8q ._1vCB{border-color:#fff}._3Tti:nth-child(2)._1e8q{border-color:#439ec1;background:#5eafce}._3Tti:nth-child(3)._1e8q{border-color:#80a643;background:#a8ce6b}._3Tti:nth-child(4)._1e8q{border-color:#4666b7;background:#889bcb}._3Tti:nth-child(5)._1e8q{border-color:#c34439;background:#ef6256}", ""]);
  
  // exports
  exports.locals = {
  	"csItem": "_3Tti",
  	"csSize": "_1vCB",
  	"csUnit": "_3IGg",
  	"csActive": "_1e8q"
  };

/***/ },
/* 173 */
/***/ function(module, exports) {

  module.exports = require("react-input-range");

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceDeatilContainer = __webpack_require__(175);
  
  var _ServiceDeatilContainer2 = _interopRequireDefault(_ServiceDeatilContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/serviceList/:serviceName/:tabs',
  
    action: function action(ctx, params) {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _jsx3.default)(_ServiceDeatilContainer2.default, {
                  serviceName: params.serviceName,
                  tabs: params.tabs
                }));
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ServiceDetail = __webpack_require__(176);
  
  var _ServiceDetail2 = _interopRequireDefault(_ServiceDetail);
  
  var _reactRedux = __webpack_require__(51);
  
  var _serviceDetail = __webpack_require__(79);
  
  var actions = _interopRequireWildcard(_serviceDetail);
  
  var _services = __webpack_require__(94);
  
  var _volumes = __webpack_require__(98);
  
  var _serviceDetailSelector = __webpack_require__(188);
  
  var _serviceDetailSelector2 = _interopRequireDefault(_serviceDetailSelector);
  
  var _volumesListSelector = __webpack_require__(99);
  
  var _volumesListSelector2 = _interopRequireDefault(_volumesListSelector);
  
  var _logsSelector = __webpack_require__(189);
  
  var _logsSelector2 = _interopRequireDefault(_logsSelector);
  
  var _logs_shrSelector = __webpack_require__(190);
  
  var _logs_shrSelector2 = _interopRequireDefault(_logs_shrSelector);
  
  var _notificationsSelector = __webpack_require__(85);
  
  var _notificationsSelector2 = _interopRequireDefault(_notificationsSelector);
  
  var _podListSelector = __webpack_require__(191);
  
  var _podListSelector2 = _interopRequireDefault(_podListSelector);
  
  var _buildingDetailSelector = __webpack_require__(138);
  
  var _buildingDetailSelector2 = _interopRequireDefault(_buildingDetailSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  var _monitorDataSelector = __webpack_require__(192);
  
  var _monitorDataSelector2 = _interopRequireDefault(_monitorDataSelector);
  
  var _building = __webpack_require__(113);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var makeMapStateToProps = function makeMapStateToProps() {
    var selector = (0, _serviceDetailSelector2.default)();
    var selectorVolume = (0, _volumesListSelector2.default)();
    var selectorLogs = (0, _logsSelector2.default)();
    var selectorLogs_xhrSelector = (0, _logs_shrSelector2.default)();
    var notificationsSelector = (0, _notificationsSelector2.default)();
    var selectorPodList = (0, _podListSelector2.default)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    var getMonitorData = (0, _monitorDataSelector2.default)();
    var buildingDetail = (0, _buildingDetailSelector2.default)();
    var mapStateToProps = function mapStateToProps(state) {
      return {
        serviceDetail: selector(state),
        volumeList: selectorVolume(state),
        logs: selectorLogs(state),
        logs_xhr: selectorLogs_xhrSelector(state),
        notifications: notificationsSelector(state),
        podList: selectorPodList(state),
        isBtnState: isBtnStateSelector(state),
        monitorData: getMonitorData(state),
        buildingDetail: buildingDetail(state)
      };
    };
    return mapStateToProps;
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onServiceDetailLoad: function onServiceDetailLoad(serviceName) {
        dispatch((0, _serviceDetail.fetchServiceDetailAction)(serviceName));
      },
      onSavePort: function onSavePort(data) {
        dispatch((0, _serviceDetail.fetchSavePortAction)(data));
      },
      onSaveVolume: function onSaveVolume(data) {
        dispatch((0, _serviceDetail.fetchSaveVolumeAction)(data));
      },
      onSaveEnvironment: function onSaveEnvironment(data) {
        dispatch((0, _serviceDetail.fetchSaveEnvironmentAction)(data));
      },
      onVolumeListLoad: function onVolumeListLoad() {
        dispatch((0, _volumes.fetchVolumesListAction)());
      },
      onSaveContainerDeploy: function onSaveContainerDeploy(data) {
        dispatch((0, _serviceDetail.fetchSaveContainerDeployAction)(data));
      },
      onAddPort: function onAddPort() {
        dispatch((0, _serviceDetail.addPortAction)());
      },
      onDelPort: function onDelPort(item) {
        dispatch((0, _serviceDetail.delPortAction)(item));
      },
      onAddSave: function onAddSave() {
        dispatch((0, _serviceDetail.addSaveAction)());
      },
      onDelSave: function onDelSave(item) {
        dispatch((0, _serviceDetail.delSaveAction)(item));
      },
      onAddEnv: function onAddEnv() {
        dispatch((0, _serviceDetail.addEnvAction)());
      },
      onDelEnv: function onDelEnv(item) {
        dispatch((0, _serviceDetail.delEnvAction)(item));
      },
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      onClearServiceDetail: function onClearServiceDetail() {
        dispatch((0, _serviceDetail.clearServiceDetail)());
      },
      onSavePods: function onSavePods(data) {
        dispatch((0, _serviceDetail.onSavePodsAction)(data));
      },
      onPodListLoad: function onPodListLoad(name) {
        dispatch((0, _serviceDetail.fetchOnPodListLoadAction)(name));
      },
      onChangeState: function onChangeState(data) {
        dispatch((0, _services.fetchChangeStateAction)(data));
      },
      onAutoStateUp: function onAutoStateUp(data) {
        dispatch((0, _serviceDetail.fetchAutoStateUp)(data));
      },
      getMonitorData: function getMonitorData(data) {
        dispatch((0, _serviceDetail.fetchGetMonitorDataAction)(data));
      },
      getBuildingDetail: function getBuildingDetail(id) {
        dispatch((0, _building.fetchBuildDetail)(id));
      },
      onChangeRelease: function onChangeRelease(data) {
        dispatch(actions.fetchChangeReleaseAction(data));
      },
      onSaveCommand: function onSaveCommand(data) {
        dispatch(actions.fetchSaveCommand(data));
      },
      onDeleteService: function onDeleteService(data) {
        dispatch((0, _services.fetchDeleteServiceAction)(data));
      }
    };
  };
  
  var ServiceDetailContainer = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps)(_ServiceDetail2.default);
  
  exports.default = ServiceDetailContainer;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(15);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ServiceDetail = __webpack_require__(177);
  
  var _ServiceDetail2 = _interopRequireDefault(_ServiceDetail);
  
  var _Tabs = __webpack_require__(162);
  
  var _Tabs2 = _interopRequireDefault(_Tabs);
  
  var _Tab = __webpack_require__(163);
  
  var _Tab2 = _interopRequireDefault(_Tab);
  
  var _reactInputRange = __webpack_require__(173);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  var _GetDisposedTabs = __webpack_require__(179);
  
  var _GetDisposedTabs2 = _interopRequireDefault(_GetDisposedTabs);
  
  var _GetMonitorTabs = __webpack_require__(181);
  
  var _GetMonitorTabs2 = _interopRequireDefault(_GetMonitorTabs);
  
  var _GetReleaseTabs = __webpack_require__(183);
  
  var _GetReleaseTabs2 = _interopRequireDefault(_GetReleaseTabs);
  
  var _GetRealmNameTabs = __webpack_require__(185);
  
  var _GetRealmNameTabs2 = _interopRequireDefault(_GetRealmNameTabs);
  
  var _GetContainerTabs = __webpack_require__(186);
  
  var _GetContainerTabs2 = _interopRequireDefault(_GetContainerTabs);
  
  var _GetOptTabs = __webpack_require__(187);
  
  var _GetOptTabs2 = _interopRequireDefault(_GetOptTabs);
  
  var _Logs = __webpack_require__(137);
  
  var _Logs2 = _interopRequireDefault(_Logs);
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _Link = __webpack_require__(56);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  var InputRangesBox = function (_Component) {
    (0, _inherits3.default)(InputRangesBox, _Component);
  
    function InputRangesBox(props) {
      (0, _classCallCheck3.default)(this, InputRangesBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (InputRangesBox.__proto__ || (0, _getPrototypeOf2.default)(InputRangesBox)).call(this, props));
  
      _this.state = {
        value: _this.props.number
      };
      return _this;
    } //滑块组件
  
  
    (0, _createClass3.default)(InputRangesBox, [{
      key: 'handleValueChange',
      value: function handleValueChange(component, value) {
        this.setState({
          value: value
        });
        this.props.getContianerNum(value);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: 'formField'
        }, void 0, (0, _jsx3.default)(_reactInputRange2.default, {
          className: 'formField',
          maxValue: 10,
          minValue: 0,
          labelSuffix: '\u4E2A',
          value: this.state.value || this.props.number,
          onChange: this.handleValueChange.bind(this)
        }));
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  var title = '服务详情';
  
  var _ref = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref2 = (0, _jsx3.default)('span', {
    className: 'text-success'
  }, void 0, '\u8FD0\u884C');
  
  var _ref3 = (0, _jsx3.default)('span', {
    className: 'text-info'
  }, void 0, '\u521B\u5EFA\u4E2D');
  
  var _ref4 = (0, _jsx3.default)('span', {
    className: 'text-danger'
  }, void 0, '\u5173\u95ED');
  
  var _ref5 = (0, _jsx3.default)('span', {
    className: 'text-danger'
  }, void 0, '\u8FD0\u884C\u5931\u8D25');
  
  var _ref6 = (0, _jsx3.default)('div', {
    className: 'assItem'
  }, void 0, '\u8BE5\u670D\u52A1\u56E0\u6CA1\u6709\u542F\u52A8\uFF0C\u5C1A\u672A\u5360\u7528\u8D44\u6E90\uFF0C\u6682\u65E0\u5BB9\u5668\u5B9E\u4F8B\u3002');
  
  var _ref7 = (0, _jsx3.default)('div', {
    className: 'assItem'
  }, void 0, '\u8BE5\u670D\u52A1\u56E0\u6CA1\u6709\u542F\u52A8\uFF0C\u5C1A\u672A\u5360\u7528\u8D44\u6E90\uFF0C\u6682\u65E0\u5BB9\u5668\u5B9E\u4F8B\u3002');
  
  var _ref8 = (0, _jsx3.default)('img', {});
  
  var _ref9 = (0, _jsx3.default)('a', {
    href: 'javascript:;'
  }, void 0, '\u7F6E\u4E8E\u9996\u9875');
  
  var _ref10 = (0, _jsx3.default)(_Link2.default, {
    to: "/",
    className: 'btn btn-default'
  }, void 0, '\u8FDB\u5165\u63A7\u5236\u53F0');
  
  var ServiceDetail = function (_Component2) {
    (0, _inherits3.default)(ServiceDetail, _Component2);
  
    function ServiceDetail(props) {
      (0, _classCallCheck3.default)(this, ServiceDetail);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (ServiceDetail.__proto__ || (0, _getPrototypeOf2.default)(ServiceDetail)).call(this, props));
  
      _this2.state = {
        containerNum: 1,
        tabSelect: _this2.props.tabs
      };
      return _this2;
    }
  
    (0, _createClass3.default)(ServiceDetail, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.SERVICE_LIST, _constants.BREADCRUMB.SERVICE_DETAIL);
        this.props.onServiceDetailLoad(this.props.serviceName);
        this.props.onVolumeListLoad();
        this.props.onPodListLoad(this.props.serviceName);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.props.onClearServiceDetail();
      }
    }, {
      key: 'tabSelect',
      value: function tabSelect(key) {
        switch (Number(key)) {
          case 1:
            this.setState({
              tabSelect: 1
            });
            break;
          case 2:
            this.setState({
              tabSelect: 2
            });
            break;
          case 3:
            this.setState({
              tabSelect: 3
            });
            break;
          case 4:
            this.setState({
              tabSelect: 4
            });
            break;
          case 5:
            this.setState({
              tabSelect: 5
            });
            break;
          case 6:
            this.props.onPodListLoad(this.props.serviceName);
            this.setState({
              tabSelect: 6
            });
            break;
          case 7:
            this.setState({
              tabSelect: 7
            });
            break;
          default:
            break;
        }
      }
    }, {
      key: 'getContainerNum',
      value: function getContainerNum(value) {
        this.setState({
          containerNum: value
        });
      }
    }, {
      key: 'onSavePods',
      value: function onSavePods() {
        var data = {
          serviceName: this.props.serviceDetail.service_name,
          n: this.state.containerNum
  
        };
        this.props.onSavePods(data);
      }
    }, {
      key: 'changeState',
      value: function changeState(serviceName, state) {
        var data = { serviceName: serviceName, state: state ? "stop" : "start" };
        this.props.onChangeState(data);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;
  
        this.context.setTitle(title);
        var data = this.props.serviceDetail;
        if (data && !data.uuid) {
          return (0, _jsx3.default)('div', {
            style: { "textAlign": "center" }
          }, void 0, _ref);
        }
        var serviceState = data.fservice_status.toLowerCase();
        var serviceStateTxt = "";
        var domain = [];
        switch (serviceState) {
          case Const.SERVICE_STATE.Running:
            serviceStateTxt = _ref2;
            break;
          case Const.SERVICE_STATE.Pending:
            serviceStateTxt = _ref3;
            break;
          case Const.SERVICE_STATE.Stopping:
            serviceStateTxt = _ref4;
            break;
          default:
            serviceStateTxt = _ref5;
            break;
        }
        data.container.map(function (item) {
          var txt = item.http_domain == null ? item.tcp_domain : item.http_domain;
          domain.push(txt);
        });
        var tab = null;
        switch (Number(this.state.tabSelect)) {
          case 1:
            tab = (0, _jsx3.default)(_GetDisposedTabs2.default, {
              volumeList: this.props.volumeList,
              serviceDetail: this.props.serviceDetail,
              onSavePort: function onSavePort(data) {
                return _this3.props.onSavePort(data);
              },
              onSaveVolume: function onSaveVolume(data) {
                return _this3.props.onSaveVolume(data);
              },
              onSaveEnvironment: function onSaveEnvironment(data) {
                return _this3.props.onSaveEnvironment(data);
              },
              onSaveContainerDeploy: function onSaveContainerDeploy(data) {
                return _this3.props.onSaveContainerDeploy(data);
              },
              onAddPort: function onAddPort() {
                return _this3.props.onAddPort();
              },
              onDelPort: function onDelPort(item) {
                return _this3.props.onDelPort(item);
              },
              onAddSave: function onAddSave() {
                return _this3.props.onAddSave();
              },
              onDelSave: function onDelSave(item) {
                return _this3.props.onDelSave(item);
              },
              onAddEnv: function onAddEnv() {
                return _this3.props.onAddEnv();
              },
              onDelEnv: function onDelEnv(item) {
                return _this3.props.onDelEnv(item);
              },
              onSaveCommand: function onSaveCommand(txt) {
                return _this3.props.onSaveCommand(txt);
              },
              onAutoStateUp: function onAutoStateUp(data) {
                return _this3.props.onAutoStateUp(data);
              },
              isBtnState: this.props.isBtnState
            });
            break;
          case 2:
            tab = this.props.podList.length == 0 ? _ref6 : (0, _jsx3.default)(_GetMonitorTabs2.default, {
              serviceDetail: this.props.serviceDetail,
              podList: this.props.podList,
              getMonitorData: function getMonitorData(data) {
                return _this3.props.getMonitorData(data);
              },
              monitorData: this.props.monitorData
            });
            break;
          case 3:
            tab = (0, _jsx3.default)('div', {
              className: 'log',
              style: { paddingBottom: "100px" }
            }, void 0, (0, _jsx3.default)(_Logs2.default, {
              logLabel: data.logs_labels
            }));
            break;
          case 4:
            tab = (0, _jsx3.default)(_GetReleaseTabs2.default, {
              serviceName: this.props.serviceName,
              serviceDetail: this.props.serviceDetail,
              buildingDetail: this.props.buildingDetail,
              getBuildingDetail: function getBuildingDetail(id) {
                return _this3.props.getBuildingDetail(id);
              },
              isBtnState: this.props.isBtnState,
              onChangeRelease: function onChangeRelease(data) {
                return _this3.props.onChangeRelease(data);
              }
            });
            break;
          case 5:
            tab = (0, _jsx3.default)(_GetRealmNameTabs2.default, {
              serviceDetail: this.props.serviceDetail
            });
            break;
          case 6:
            tab = this.props.podList.length == 0 ? _ref7 : (0, _jsx3.default)(_GetContainerTabs2.default, {
              podList: this.props.podList
            });
            break;
          case 7:
            tab = (0, _jsx3.default)(_GetOptTabs2.default, {
              serviceName: this.props.serviceName,
              onDeleteService: function onDeleteService(name) {
                _this3.props.onDeleteService(name);
              }
            });
            break;
  
        }
        return (0, _jsx3.default)('div', {
          className: 'containerBgF containerPadding'
        }, void 0, (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdHd
        }, void 0, (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdImg
        }, void 0, _ref8, _ref9), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdInfo
        }, void 0, (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdTitle
        }, void 0, (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdTitleItem
        }, void 0, '\u670D\u52A1\u540D\u79F0:', (0, _jsx3.default)('span', {}, void 0, data.service_name)), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdTitleItem
        }, void 0, '\u90E8\u7F72\u65F6\u95F4:', (0, _jsx3.default)('span', {
          className: 'cl9'
        }, void 0, data.ltime)), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdTitleItem
        }, void 0, '\u72B6\u6001:', serviceStateTxt), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdTitleItem
        }, void 0, _ref10, _react2.default.createElement(
          'button',
          {
            onClick: this.changeState.bind(this, data.fservice_name, serviceState == Const.SERVICE_STATE.Running),
            className: serviceState == Const.SERVICE_STATE.Running ? "btn btn-default" : "btn btn-primary", ref: 'startUpBtn',
            disabled: serviceState == Const.SERVICE_STATE.Pending
          },
          serviceState == Const.SERVICE_STATE.Running ? "关闭" : "启动"
        ))), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdPBox
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)(_ServiceDetail2.default.sdPItem, _ServiceDetail2.default.sdDomain)
        }, void 0, (0, _jsx3.default)('span', {
          className: _ServiceDetail2.default.sdPItemName
        }, void 0, '\u57DF\u540D:'), domain.map(function (item, i) {
          return (0, _jsx3.default)('a', {
            href: 'http://' + item,
            target: '_blank',
            className: 'clLink'
          }, i, item);
        })), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdPItem
        }, void 0, (0, _jsx3.default)('span', {
          className: _ServiceDetail2.default.sdPItemName
        }, void 0, '\u6240\u5C5E\u955C\u50CF:'), (0, _jsx3.default)('a', {
          href: 'javascript:;',
          className: 'clLink'
        }, void 0, data.image_name)), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdPItem
        }, void 0, (0, _jsx3.default)('span', {
          className: _ServiceDetail2.default.sdPItemName
        }, void 0, '\u5BB9\u5668\u4E2A\u6570:'), (0, _jsx3.default)('div', {
          className: _ServiceDetail2.default.sdInputRanges
        }, void 0, (0, _jsx3.default)(InputRangesBox, {
          number: data.spec_replicas,
          getContianerNum: this.getContainerNum.bind(this)
        })), (0, _jsx3.default)('button', {
          className: 'btn btn-default ' + (!this.props.isBtnState.pods ? "btn-loading" : ""),
          disabled: !this.props.isBtnState.pods,
          onClick: this.onSavePods.bind(this)
        }, void 0, '\u4FDD\u5B58'))))), (0, _jsx3.default)('div', {
          className: 'sdDetail'
        }, void 0, (0, _jsx3.default)(_Tabs2.default, {
          defaultActiveKey: Number(this.props.tabs),
          onSelect: this.tabSelect.bind(this),
          id: 'sdTabs'
        }, void 0, (0, _jsx3.default)(_Tab2.default, {
          eventKey: 1,
          title: '\u914D\u7F6E'
        }, void 0, this.state.tabSelect == 1 ? tab : null), (0, _jsx3.default)(_Tab2.default, {
          eventKey: 2,
          title: '\u76D1\u63A7'
        }, void 0, this.state.tabSelect == 2 ? tab : null), (0, _jsx3.default)(_Tab2.default, {
          eventKey: 3,
          title: '\u65E5\u5FD7'
        }, void 0, this.state.tabSelect == 3 ? tab : null), (0, _jsx3.default)(_Tab2.default, {
          eventKey: 4,
          title: '\u53D1\u5E03'
        }, void 0, this.state.tabSelect == 4 ? tab : null), (0, _jsx3.default)(_Tab2.default, {
          eventKey: 5,
          title: '\u57DF\u540D'
        }, void 0, this.state.tabSelect == 5 ? tab : null), (0, _jsx3.default)(_Tab2.default, {
          eventKey: 6,
          title: '\u5BB9\u5668\u5B9E\u4F8B'
        }, void 0, this.state.tabSelect == 6 ? tab : null), (0, _jsx3.default)(_Tab2.default, {
          eventKey: 7,
          title: '\u64CD\u4F5C'
        }, void 0, this.state.tabSelect == 7 ? tab : null))));
      }
    }]);
    return ServiceDetail;
  }(_react.Component);
  
  ServiceDetail.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react2.default.PropTypes.object
  };
  exports.default = (0, _withStyles2.default)(_ServiceDetail2.default)(ServiceDetail);

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(178);
      var insertCss = __webpack_require__(19);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(18)();
  // imports
  
  
  // module
  exports.push([module.id, "._1XRt{margin:35px 25px 0;padding-bottom:35px;border-bottom:1px solid #ececec}._3Dp7{width:90%;margin-top:25px}._36zY{width:auto}._1XRt>button{margin-right:50px}._1REZ{border-bottom:0}._37FG{margin-top:10px}._2TqT{margin-top:30px}._2TqT table{margin-bottom:0}._1EQ1{padding:0 20px}._1EQ1>div{margin:10px 0}.hR2k{margin-top:25px}.hR2k button{margin-right:35px}.BqRJ{margin-bottom:5px}._2CgZ{display:inline-block;width:42.5%}.eZ8F{width:8%;margin-left:2%}._2f4m,.eZ8F{display:inline-block;vertical-align:middle}._2f4m{margin:0 1%;width:3%;border-top:1px solid #999}._2Ter{position:relative;padding-top:30px}._2LNi{width:120px;position:absolute;text-align:center}._2LNi img{width:66px;height:66px;border-radius:4px}._2LNi a{display:inline-block;font-size:12px;color:#333;padding-left:18px;margin-top:13px;-webkit-transition:color .3s ease;transition:color .3s ease;position:relative}._2LNi a:before{font-family:icomoon;display:inline-block;position:absolute;content:\"\\E913\";font-size:14px;color:#767676;left:0;top:-2px}._2LNi a:hover{color:#09c8f4}._2LNi a:focus,._2LNi a:hover{text-decoration:none}._1k6T{margin:-7px 20px 0 120px}._3itp{border-bottom:1px solid #e8e8e8;padding-bottom:20px}._157J{text-align:center;position:relative;color:#333}._157J,._157J:after{display:inline-block}._157J:after{content:\" \";height:15px;width:1px;background:#ced3dd;vertical-align:middle;position:absolute;right:0;top:4px}._157J:nth-child(4):after{display:none}._157J:first-child{width:26%;text-align:left;padding-left:10px}._157J:first-child span{color:#24a8d9}._157J:nth-child(2){width:23%}._157J:nth-child(3){width:21%}._157J:nth-child(4){width:30%;text-align:right;padding-right:0}._157J button{margin-left:27px}._157J span{margin-left:10px}._2_Ij{border-top:17px solid #f2f4f8;padding-top:30px;min-height:300px}._3c9o{padding:24px 0 30px}._1eGt{padding:10px 0}._1eGt:nth-child(3){margin-top:20px}._1weR{width:70px;text-align:right;color:#333;margin-right:10px}._1W7b,._1weR{display:inline-block}._1W7b{width:33%;height:23px;vertical-align:middle;margin-right:80px}._2_Ij>div>ul>li>a:after{font-family:icomoon;color:#999;content:\"\\E918\";display:inline-block;position:absolute;top:12px;left:16px;font-size:18px}._2_Ij>div>ul>li:nth-child(1)>a:after{content:\"\\E918\"}._2_Ij>div>ul>li:nth-child(2)>a:after{content:\"\\E911\"}._2_Ij>div>ul>li:nth-child(3)>a:after{content:\"\\E917\"}._2_Ij>div>ul>li:nth-child(4)>a:after{content:\"\\E90D\"}._2_Ij>div>ul>li:nth-child(5)>a:after{content:\"\\E914\"}._2_Ij>div>ul>li:nth-child(6)>a:after{content:\"\\E915\"}._2_Ij>div>ul>li:nth-child(7)>a:after{content:\"\\E91C\"}._2UdE{margin-top:30px}.Rcba input{border-radius:0;border:0;box-shadow:none;background:transparent;border-bottom:1px solid #b6b6b6;font-size:12px;outline:none}._3HEx{margin:-10px 0 15px 15px}._15zE{width:100px;height:103px;border:1px solid #f2f4f8;background:#f2f4f8;border-radius:4px 4px 7px 7px;border-bottom:3px solid #d7c698;display:inline-block;margin-right:42px;cursor:pointer}._15zE:hover{box-shadow:0 3px 5px hsla(44,44%,72%,.35)}._36Or{height:59px;line-height:59px;border-bottom:1px solid #ccc;margin:0 22px;text-align:center;font-size:35px}._36Or span{font-size:30px}.OETX{margin-top:10px;text-align:center;color:#666}._2D0-{background:#ebebea;border:1px solid #c8b88f;border-top:3px solid #c8b88f}._3c-z{border-color:#5eafce}._3c-z:hover{box-shadow:0 3px 5px rgba(39,154,197,.35)}._3doo{border-color:#a8ce6b}._3doo:hover{box-shadow:0 3px 5px rgba(130,165,75,.35)}._3MRU{border-color:#889bcb}._3MRU:hover{box-shadow:0 3px 5px rgba(94,117,174,.35)}.mAb1{border-color:#ef6256}.mAb1:hover{box-shadow:0 3px 5px rgba(168,91,85,.35)}._2qkh{display:inline-block;color:#1da1d2;position:relative;vertical-align:bottom;margin-bottom:3px;padding-left:20px;cursor:pointer}._2qkh:before{position:absolute;font-size:18px;left:-3px;top:-1px}._2P1K{padding:20px 0 0 30px;vertical-align:top}._2P1K>div>div{margin-bottom:27px;margin-right:40px}.selR{text-align:center;padding-bottom:20px}.selR button{padding:5px 15px}.selR button:last-child{margin-left:60px}._1-8R{padding:46px 0 40px 32px}._1-8R button{width:350px;box-shadow:none;background:#fff;color:#c00;border:1px solid #c00;height:37px}._1-8R button:active,._1-8R button:active:focus,._1-8R button:focus{background:#bf0a0a;border-color:#bf0a0a;box-shadow:none}._1-8R p{font-size:12px;color:#c00;margin:13px 6px}.Rcba a{margin-right:10px}", ""]);
  
  // exports
  exports.locals = {
  	"assItem": "_1XRt",
  	"assBox": "_3Dp7",
  	"assBoxAuto": "_36zY",
  	"assItemNoborder": "_1REZ",
  	"assItemLast": "_37FG",
  	"asTabThird": "_3szN",
  	"astBox": "_2TqT",
  	"astTdBox": "_1EQ1",
  	"assBtnBox": "hR2k",
  	"astKeyItem": "BqRJ",
  	"astInp": "_2CgZ",
  	"astDel": "eZ8F",
  	"astLine": "_2f4m",
  	"sdHd": "_2Ter",
  	"sdImg": "_2LNi",
  	"sdInfo": "_1k6T",
  	"sdTitle": "_3itp",
  	"sdTitleItem": "_157J",
  	"sdBd": "_2_Ij",
  	"sdPBox": "_3c9o",
  	"sdPItem": "_1eGt",
  	"sdPItemName": "_1weR",
  	"sdInputRanges": "_1W7b",
  	"sdLastBtn": "_2UdE",
  	"sdDomain": "Rcba",
  	"btnChoose": "_3HEx",
  	"containerItem": "_15zE",
  	"containerSize": "_36Or",
  	"containerUnit": "OETX",
  	"containerActive": "_2D0-",
  	"containerItem2": "_3c-z",
  	"containerItem3": "_3doo",
  	"containerItem4": "_3MRU",
  	"containerItem5": "mAb1",
  	"chooseContainer": "_2qkh",
  	"modalItem": "_2P1K",
  	"modalBtn": "selR",
  	"handleBox": "_1-8R"
  };

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _ContainerBox = __webpack_require__(167);
  
  var _ContainerBox2 = _interopRequireDefault(_ContainerBox);
  
  var _ContainerItem = __webpack_require__(170);
  
  var _ContainerItem2 = _interopRequireDefault(_ContainerItem);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _lib = __webpack_require__(180);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(38);
  
  var _deployService = __webpack_require__(108);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var AutoStartUpToggle = function (_Component) {
    (0, _inherits3.default)(AutoStartUpToggle, _Component);
  
    function AutoStartUpToggle(props) {
      (0, _classCallCheck3.default)(this, AutoStartUpToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (AutoStartUpToggle.__proto__ || (0, _getPrototypeOf2.default)(AutoStartUpToggle)).call(this, props));
  
      _this.state = {
        autoStart: true
      };
      return _this;
    }
  
    (0, _createClass3.default)(AutoStartUpToggle, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({
          autoStart: this.props.isState
        });
      }
    }, {
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.props.getToggle(this.state.autoStart);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          disabled: this.props.disabled,
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return AutoStartUpToggle;
  }(_react.Component); /**
                        * Created by zhangsai on 16/9/2.
                        */
  
  
  var _ref = (0, _jsx3.default)('span', {}, void 0, '\u66F4\u6539');
  
  var _ref2 = (0, _jsx3.default)('span', {
    'aria-hidden': 'true'
  }, void 0, '\xD7');
  
  var _ref3 = (0, _jsx3.default)('h4', {
    className: 'modal-title',
    id: 'contained-modal-title-sm'
  }, void 0, '\u5BB9\u5668\u914D\u7F6E');
  
  var ChooseContainerBtn = function (_Component2) {
    (0, _inherits3.default)(ChooseContainerBtn, _Component2);
  
    function ChooseContainerBtn(props) {
      (0, _classCallCheck3.default)(this, ChooseContainerBtn);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (ChooseContainerBtn.__proto__ || (0, _getPrototypeOf2.default)(ChooseContainerBtn)).call(this, props));
  
      _this2.state = {
        modalShow: false,
        containerDeploy: 0
      };
      return _this2;
    } //选择容器 按钮
  
  
    (0, _createClass3.default)(ChooseContainerBtn, [{
      key: 'showModal',
      value: function showModal() {
        this.setState({ show: true });
      }
    }, {
      key: 'hideModal',
      value: function hideModal() {
        this.setState({ show: false });
      }
    }, {
      key: 'getContainer',
      value: function getContainer(index) {
        this.setState({
          containerDeploy: index
        });
      }
    }, {
      key: 'saveContainerDeploy',
      value: function saveContainerDeploy() {
        var data = {
          containerDeploy: this.state.containerDeploy,
          serviceName: this.props.serviceName
        };
        this.props.onSaveContainerDeploy(data);
        this.hideModal();
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: 'chooseContainer icon-operation',
          onClick: this.showModal.bind(this)
        }, void 0, _ref, _react2.default.createElement(
          _lib.Modal,
          (0, _extends3.default)({}, this.props, { show: this.state.show, onHide: this.hideModal.bind(this), bsSize: 'sm', 'aria-labelledby': 'contained-modal-title-sm' }),
          (0, _jsx3.default)('div', {
            className: 'modal-header'
          }, void 0, (0, _jsx3.default)('button', {
            type: 'button',
            onClick: this.hideModal.bind(this),
            className: 'close',
            'aria-label': 'Close'
          }, void 0, _ref2), _ref3),
          (0, _jsx3.default)('div', {
            className: 'modal-body'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'modalItem'
          }, void 0, (0, _jsx3.default)(_ContainerBox2.default, {
            getContainer: this.getContainer.bind(this)
          })), (0, _jsx3.default)('div', {
            className: 'modalBtn'
          }, void 0, (0, _jsx3.default)(_lib.Button, {
            bsStyle: 'primary',
            onClick: this.saveContainerDeploy.bind(this)
          }, void 0, '\u4FDD\u5B58'), (0, _jsx3.default)(_lib.Button, {
            bsStyle: 'default',
            onClick: this.hideModal.bind(this)
          }, void 0, '\u53D6\u6D88')))
        ));
      }
    }]);
    return ChooseContainerBtn;
  }(_react.Component);
  
  var _ref4 = (0, _jsx3.default)('option', {
    value: 'TCP'
  }, void 0, 'TCP');
  
  var _ref5 = (0, _jsx3.default)('option', {
    value: 'UDP'
  }, void 0, 'UDP');
  
  var _ref6 = (0, _jsx3.default)('option', {
    value: 'HTTP'
  }, void 0, 'HTTP');
  
  var _ref7 = (0, _jsx3.default)('option', {
    value: 'TCP'
  }, void 0, 'TCP');
  
  var _ref8 = (0, _jsx3.default)('option', {
    value: 'no'
  }, void 0, '\u4E0D\u53EF\u8BBF\u95EE');
  
  var _ref9 = (0, _jsx3.default)('option', {
    value: 'outsisde'
  }, void 0, '\u5916\u90E8\u8303\u56F4');
  
  var _ref10 = (0, _jsx3.default)('option', {
    value: 'inside'
  }, void 0, '\u5185\u90E8\u8303\u56F4');
  
  var _ref11 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u5BB9\u5668\u7AEF\u53E3'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u534F\u8BAE'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u8BBF\u95EE\u65B9\u5F0F'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u8BBF\u95EE\u8303\u56F4'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref12 = (0, _jsx3.default)('option', {
    value: '-1'
  }, void 0, '\u8BF7\u9009\u62E9\u6570\u636E\u5377');
  
  var _ref13 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u6570\u636E\u5377\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u5BB9\u5668\u8DEF\u5F84'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u662F\u5426\u53EA\u8BFB'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref14 = (0, _jsx3.default)('div', {
    className: 'astLine'
  });
  
  var _ref15 = (0, _jsx3.default)('span', {}, void 0, 'x');
  
  var _ref16 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7AEF\u53E3',
    titleEnglish: 'PORT',
    titleInfo: '\u5BB9\u5668\u7AEF\u53E3\u4F1A\u6620\u5C04\u5230\u4E3B\u673A\u7AEF\u53E3\u4E0A'
  });
  
  var _ref17 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u73AF\u5883\u53D8\u91CF',
    titleEnglish: 'ENVIRONMENT VARIABLE',
    titleInfo: ''
  });
  
  var _ref18 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u5BB9\u5668\u914D\u7F6E',
    titleEnglish: 'CONTAINER CONFIGURATION',
    titleInfo: '\u5BB9\u5668\u914D\u7F6E\u8BF4\u660E'
  });
  
  var _ref19 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u542F\u52A8\u547D\u4EE4',
    titleEnglish: 'JRE',
    titleInfo: '\u542F\u52A8\u547D\u4EE4\u89E3\u91CA\u8BF4\u660E '
  });
  
  var _ref20 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u81EA\u52A8\u542F\u52A8',
    titleEnglish: 'AUTO UPDATE SETTING',
    titleInfo: '\u81EA\u52A8\u542F\u52A8\u8BBE\u7F6E'
  });
  
  var GetDisposedTabs = function (_Component3) {
    (0, _inherits3.default)(GetDisposedTabs, _Component3);
  
    function GetDisposedTabs(props) {
      (0, _classCallCheck3.default)(this, GetDisposedTabs);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (GetDisposedTabs.__proto__ || (0, _getPrototypeOf2.default)(GetDisposedTabs)).call(this, props));
  
      _this3.state = {
        isStateUp: 1,
        port: false,
        volume: false,
        env: false
      };
      return _this3;
    }
  
    (0, _createClass3.default)(GetDisposedTabs, [{
      key: 'delVal',
      value: function delVal(index) {
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
        var input = containerTr[index].getElementsByTagName("input")[0];
        input.focus();
        input.value = "";
      }
    }, {
      key: 'focusVal',
      value: function focusVal(index) {
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
        var input = containerTr[index].getElementsByTagName("input")[0];
        input.focus();
      }
    }, {
      key: 'isPortRepeat',
      value: function isPortRepeat(index, e) {
        var _this4 = this;
  
        var container = [];
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
        var value = e.target.value;
        for (var i = 0; i < containerTr.length; i++) {
          var containerObj = {};
          containerObj.container_port = containerTr[i].getElementsByTagName("input")[0].value;
          container.push(containerObj);
        }
        this.setState({
          port: false
        });
        e.target.className = "form-control form-control-sm";
        if (value <= 10 && value.length != 0) {
          this.setState({
            port: true
          });
          e.target.className = "form-control form-control-sm inputError";
          this.refs.portTip.innerHTML = _constants.INPUT_TIP.port.Format;
          return false;
        }
        container.splice(index, 1);
        container.map(function (item, i) {
          if (item.container_port == value && value != "") {
            _this4.setState({
              port: true
            });
            e.target.className = "form-control form-control-sm inputError";
            _this4.refs.portTip.innerHTML = _constants.INPUT_TIP.port.Repeat;
            e.target.focus();
            return false;
          }
        });
      }
    }, {
      key: 'isSaveRepeat',
      value: function isSaveRepeat(index, e) {
        var _this5 = this;
  
        var save = [];
        var saveTr = _reactDom2.default.findDOMNode(this.refs.tab_save_box).children;
        var key = e.target.value;
        this.setState({
          volume: false
        });
        for (var i = 0; i < saveTr.length; i++) {
          var saveObj = {};
          saveObj.value = saveTr[i].getElementsByTagName("select")[0].value;
          save.push(saveObj);
        }
        save.splice(index, 1);
        save.map(function (item) {
          if (item.value == key && key != "") {
            _this5.setState({
              volume: true
            });
            _this5.refs.volumeTip.innerHTML = _constants.INPUT_TIP.volumes.Repeat;
            e.target.value = "-1";
            e.target.focus();
            return false;
          }
        });
      }
    }, {
      key: 'isEnvKeyRepeat',
      value: function isEnvKeyRepeat(index, e) {
        var _this6 = this;
  
        var env = [];
        var regExp = /^[a-zA-Z]+[a-zA-Z0-9-]*$/;
        var envTr = _reactDom2.default.findDOMNode(this.refs.tab_env_box).children;
        var key = e.target.value;
        this.setState({
          env: false
        });
        e.target.className = "form-control";
        if (!regExp.test(key)) {
          this.setState({
            env: true
          });
          this.refs.envTip.innerHTML = _constants.INPUT_TIP.env.Format;
          e.target.className = "form-control inputError";
          e.target.focus();
          return false;
        }
        for (var i = 0; i < envTr.length; i++) {
          var envObj = {};
          envObj.env_key = envTr[i].getElementsByTagName("input")[0].value;
          env.push(envObj);
        }
        env.splice(index, 1);
        env.map(function (item) {
          if (item.env_key == key && key != "") {
            _this6.setState({
              env: true
            });
            _this6.refs.envTip.innerHTML = _constants.INPUT_TIP.volumes.Repeat;
            e.target.className = "form-control inputError";
            e.target.focus();
          }
        });
      }
    }, {
      key: 'isEnvValue',
      value: function isEnvValue(e) {
        this.setState({
          env: false
        });
        e.target.className = "form-control";
      }
    }, {
      key: 'isPathValidata',
      value: function isPathValidata(e) {
        var regExp = /^\/[a-zA-Z0-9]+[a-zA-Z0-9_]*$/;
        var value = e.target.value;
        if (!regExp.test(value) && value.length != 0) {
          this.setState({
            volume: true
          });
          e.target.className = "form-control inputError";
          this.refs.volumeTip.innerHTML = _constants.INPUT_TIP.volumes.Format;
        } else {
          this.setState({
            volume: false
          });
          e.target.className = "form-control";
        }
      }
    }, {
      key: 'getPortTableBody',
      value: function getPortTableBody() {
        var _this7 = this;
  
        //端口
        var data = [],
            sd = this.props.serviceDetail;
        if (sd && sd.container && sd.container.length) data = this.props.serviceDetail.container;
        var tr = data.map(function (item, i) {
          return (0, _jsx3.default)('tr', {}, item.at, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, (0, _jsx3.default)('div', {
            className: "iaBox"
          }, void 0, _react2.default.createElement('input', { type: 'number', ref: 'container_port', onBlur: _this7.isPortRepeat.bind(_this7, i), className: 'form-control form-control-sm', defaultValue: item.container_port }), (0, _jsx3.default)('span', {
            className: 'iaOk icon-right',
            onClick: _this7.focusVal.bind(_this7, i)
          }, void 0, ' '), (0, _jsx3.default)('span', {
            className: 'iaDel icon-delete',
            onClick: _this7.delVal.bind(_this7, i)
          }, void 0, ' ')))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'protocol', defaultValue: item.protocol },
            _ref4,
            _ref5
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'access_mode', defaultValue: item.access_mode },
            _ref6,
            _ref7,
            _ref8
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'access_scope', defaultValue: item.access_scope },
            _ref9,
            _ref10
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('a', {
            href: 'javascript:;',
            className: 'delBtn',
            onClick: _this7.delPortTr.bind(_this7, item.at)
          }, void 0, ' ')));
        });
        return tr;
      }
    }, {
      key: 'getPortTable',
      value: function getPortTable() {
        return (0, _jsx3.default)('table', {
          className: 'table table-bordered'
        }, void 0, _ref11, _react2.default.createElement(
          'tbody',
          { ref: 'tab_container_body' },
          this.getPortTableBody()
        ));
      }
    }, {
      key: 'addPortTr',
      value: function addPortTr() {
        this.props.onAddPort();
      }
    }, {
      key: 'delPortTr',
      value: function delPortTr(item) {
        this.props.onDelPort(item);
      }
    }, {
      key: 'savePort',
      value: function savePort() {
        var container = [];
        var containerTr = _reactDom2.default.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
        for (var i = 0; i < containerTr.length; i++) {
          var containerObj = {};
          var container_port = containerTr[i].getElementsByTagName("input")[0];
          if (container_port.value == "") {
            this.setState({
              port: true
            });
            container_port.className = "form-control form-control-sm inputError";
            container_port.focus();
            this.refs.portTip.innerHTML = _constants.INPUT_TIP.port.Null;
            return false;
          }
          containerObj.container_port = container_port.value;
          containerObj.protocol = containerTr[i].getElementsByTagName("select")[0].value;
          containerObj.access_mode = containerTr[i].getElementsByTagName("select")[1].value;
          containerObj.access_scope = containerTr[i].getElementsByTagName("select")[2].value;
          container.push(containerObj);
        }
        var data = {
          serviceName: this.props.serviceDetail.fservice_name,
          container: container
        };
        console.log(data, "+++++++");
        this.props.onSavePort(data);
      }
    }, {
      key: 'getSaveTableBody',
      value: function getSaveTableBody() {
        var _this8 = this;
  
        //存储
        var data = [],
            sd = this.props.serviceDetail;
        var my = this;
        if (sd && sd.volume && sd.volume.length) data = this.props.serviceDetail.volume;
        var tr = data.map(function (item, i) {
          var options = my.props.volumeList.map(function (obj, i) {
            if (item.disk_name == obj.disk_name || obj.disk_status == "unused") {
              return (0, _jsx3.default)('option', {
                value: obj.disk_name
              }, i, obj.disk_name, ' ');
            } else {
              return false;
            }
          });
          return (0, _jsx3.default)('tr', {}, item.at, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement(
            'select',
            { className: 'form-control', ref: 'volumnName', defaultValue: item.disk_name,
              onChange: _this8.isSaveRepeat.bind(_this8, i)
            },
            _ref12,
            options
          ))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: 'container_path', defaultValue: item.disk_path,
            onBlur: _this8.isPathValidata.bind(_this8)
          }))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'astTdBox'
          }, void 0, (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('input', {
            type: 'checkbox',
            defaultChecked: item.readonly == "True"
          }), ' \u662F\u5426\u53EA\u8BFB'))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('a', {
            href: 'javascript:;',
            className: 'delBtn',
            onClick: _this8.delSaveTr.bind(_this8, item.at)
          }, void 0, ' ')));
        });
  
        return tr;
      }
    }, {
      key: 'getSaveTable',
      value: function getSaveTable() {
        return (0, _jsx3.default)('table', {
          className: 'table table-bordered'
        }, void 0, _ref13, _react2.default.createElement(
          'tbody',
          { ref: 'tab_storage_body' },
          this.getSaveTableBody()
        ));
      }
    }, {
      key: 'addSaveTr',
      value: function addSaveTr() {
        this.props.onAddSave();
      }
    }, {
      key: 'delSaveTr',
      value: function delSaveTr(item) {
        this.props.onDelSave(item);
      }
    }, {
      key: 'saveStorage',
      value: function saveStorage() {
        var save = [];
        var saveTr = _reactDom2.default.findDOMNode(this.refs.tab_storage_body).children;
        for (var i = 0; i < saveTr.length; i++) {
          var saveObj = {};
          var disk_name = saveTr[i].getElementsByTagName("select")[0];
          var disk_path = saveTr[i].getElementsByTagName("input")[0];
          var readonly = saveTr[i].getElementsByTagName("input")[1].checked ? "True" : "False";
          if (disk_name.value != -1 && disk_path.value == "") {
            this.setState({
              volume: true
            });
            disk_path.className = "form-control inputError";
            this.refs.volumeTip.innerHTML = _constants.INPUT_TIP.volumes.Null;
            disk_path.focus();
            return false;
          }
          if (disk_name.value == -1) {} else {
            saveObj.disk_name = disk_name.value;
            saveObj.disk_path = disk_path.value;
            saveObj.readonly = readonly;
            save.push(saveObj);
          }
        }
        console.log(save);
        var data = {
          serviceName: this.props.serviceDetail.fservice_name,
          volume: save
        };
        this.props.onSaveVolume(data);
      }
    }, {
      key: 'getEnvironment',
      value: function getEnvironment() {
        var _this9 = this;
  
        var data = [],
            sd = this.props.serviceDetail;
        if (sd && sd.env && sd.env.length) data = this.props.serviceDetail.env;
        var keyBox = data.map(function (item, i) {
          return (0, _jsx3.default)('div', {
            className: 'astKeyItem'
          }, item.at, (0, _jsx3.default)('div', {
            className: 'astInp'
          }, void 0, (0, _jsx3.default)('input', {
            type: 'text',
            className: 'form-control',
            onBlur: _this9.isEnvKeyRepeat.bind(_this9, i),
            placeholder: '\u952E',
            defaultValue: item.env_key
          })), _ref14, (0, _jsx3.default)('div', {
            className: 'astInp'
          }, void 0, (0, _jsx3.default)('input', {
            type: 'text',
            className: 'form-control',
            onBlur: _this9.isEnvValue.bind(_this9),
            placeholder: '\u503C',
            defaultValue: item.env_value
          })), (0, _jsx3.default)('div', {
            className: 'astDel'
          }, void 0, (0, _jsx3.default)('a', {
            href: 'javascript:;',
            className: 'delBtn',
            onClick: _this9.delEnvironmentData.bind(_this9, item.at)
          }, void 0, ' ')));
        });
        return keyBox;
      }
    }, {
      key: 'addEnvironmentData',
      value: function addEnvironmentData() {
        this.props.onAddEnv();
      }
    }, {
      key: 'delEnvironmentData',
      value: function delEnvironmentData(item) {
        this.props.onDelEnv(item);
      }
    }, {
      key: 'saveEnvironment',
      value: function saveEnvironment() {
        var env = [];
        var envTr = _reactDom2.default.findDOMNode(this.refs.tab_env_box).children;
        for (var i = 0; i < envTr.length; i++) {
          var envObj = {};
          var env_key = envTr[i].getElementsByTagName("input")[0];
          var env_value = envTr[i].getElementsByTagName("input")[1];
          if (env_key.value && env_value.value == "") {
            this.setState({
              env: true
            });
            this.refs.envTip.innerHTML = _constants.INPUT_TIP.env.Null;
            env_value.className = "form-control inputError";
            env_value.focus();
            return false;
          }
          envObj.env_key = env_key.value;
          envObj.env_value = env_value.value;
          env.push(envObj);
        }
        var data = {
          serviceName: this.props.serviceDetail.fservice_name,
          env: env
        };
        this.props.onSaveEnvironment(data);
      }
    }, {
      key: 'getContainerBox',
      value: function getContainerBox(n) {
        if (!n) {
          n = 0;
        }
        var styleArr = ["containerBoxStyle_0 containerBoxStyle", "containerBoxStyle_1 containerBoxStyle", "containerBoxStyle_2 containerBoxStyle", "containerBoxStyle_3 containerBoxStyle", "containerBoxStyle_4 containerBoxStyle"],
            newData = [],
            style = styleArr[n];
        newData.push(_constants.CPU[n]);
        var children = newData.map(function (item, i) {
          return (0, _jsx3.default)('div', {
            className: style
          }, i, (0, _jsx3.default)(_ContainerItem2.default, {
            classNumber: i
          }, i, (0, _jsx3.default)('span', {}, void 0, item.x), _ref15, (0, _jsx3.default)('span', {}, void 0, item.m)));
        });
        return children;
      }
    }, {
      key: 'getIsStartUp',
      value: function getIsStartUp(value) {
        this.setState({
          isStateUp: !value ? 1 : 0
        });
        var data = {
          serviceName: this.props.serviceDetail.fservice_name,
          auto_startup: !value ? 1 : 0
        };
        console.log(data);
        this.props.onAutoStateUp(data);
      }
    }, {
      key: 'saveCommand',
      value: function saveCommand() {
        var txt = this.refs.command.value;
        console.log(txt);
        var data = {
          command: txt,
          serviceName: this.props.serviceDetail.fservice_name
        };
        this.props.onSaveCommand(data);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.context.store.dispatch((0, _deployService.clearDeployData)());
      }
    }, {
      key: 'render',
      value: function render() {
        var _this10 = this;
  
        var data = this.props.serviceDetail;
        var n = 0;
        this.props.volumeList.map(function (item) {
          if (item.disk_status == "unused") {
            n++;
          }
        });
        var volumeLength = n == 0 ? "暂时没有数据卷" : '\u76EE\u524D\u6709' + n + '\u4E2A\u6570\u636E\u5377';
        return (0, _jsx3.default)('div', {
          className: 'asTabThird'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref16, (0, _jsx3.default)('div', {
          className: 'astBox'
        }, void 0, this.getPortTable()), (0, _jsx3.default)('div', {
          className: 'assBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.addPortTr.bind(this)
        }, void 0, '\u6DFB\u52A0'), (0, _jsx3.default)('button', {
          className: 'btn btn-default ' + (!this.props.isBtnState.port ? "btn-loading" : ""),
          disabled: !this.props.isBtnState.port,
          onClick: this.savePort.bind(this)
        }, void 0, '\u4FDD\u5B58'), _react2.default.createElement('span', { className: this.state.port ? "inputTip inputTipShow" : "inputTip", ref: 'portTip' }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
          title: '\u5B58\u50A8\u8BBE\u7F6E',
          titleEnglish: 'SAVE SETTING',
          titleInfo: volumeLength
        }), _react2.default.createElement(
          'div',
          { className: 'astBox', ref: 'tab_save_box' },
          this.getSaveTable()
        ), (0, _jsx3.default)('div', {
          className: 'assBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.addSaveTr.bind(this)
        }, void 0, '\u6DFB\u52A0'), (0, _jsx3.default)('button', {
          className: 'btn btn-default ' + (!this.props.isBtnState.storage ? "btn-loading" : ""),
          disabled: !this.props.isBtnState.storage,
          onClick: this.saveStorage.bind(this)
        }, void 0, '\u4FDD\u5B58'), _react2.default.createElement('span', { className: this.state.volume ? "inputTip inputTipShow" : "inputTip", ref: 'volumeTip' }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref17, _react2.default.createElement(
          'div',
          { className: 'astBox', ref: 'tab_env_box' },
          this.getEnvironment()
        ), (0, _jsx3.default)('div', {
          className: 'assBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.addEnvironmentData.bind(this)
        }, void 0, '\u6DFB\u52A0'), (0, _jsx3.default)('button', {
          className: 'btn btn-default ' + (!this.props.isBtnState.env ? "btn-loading" : ""),
          disabled: !this.props.isBtnState.env,
          onClick: this.saveEnvironment.bind(this)
        }, void 0, '\u4FDD\u5B58'), _react2.default.createElement('span', { className: this.state.env ? "inputTip inputTipShow" : "inputTip", ref: 'envTip' }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref18, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, this.getContainerBox(data.containerDeploy), (0, _jsx3.default)(ChooseContainerBtn, {
          serviceName: this.props.serviceDetail.fservice_name,
          onSaveContainerDeploy: function onSaveContainerDeploy(data) {
            _this10.props.onSaveContainerDeploy(data);
          }
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref19, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement('input', { className: 'form-control',
          type: 'text',
          placeholder: '',
          ref: 'command',
          defaultValue: data.command
        })), (0, _jsx3.default)('div', {
          className: 'assBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-default ' + (!this.props.isBtnState.command ? "btn-loading" : ""),
          disabled: !this.props.isBtnState.command,
          onClick: this.saveCommand.bind(this)
        }, void 0, '\u4FDD\u5B58'))), (0, _jsx3.default)('div', {
          className: 'assItem assItemNoborder'
        }, void 0, _ref20, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)(AutoStartUpToggle, {
          disabled: !this.props.isBtnState.autoStateUp,
          isState: data.auto_startup == 1,
          getToggle: this.getIsStartUp.bind(this)
        }))));
      }
    }]);
    return GetDisposedTabs;
  }(_react.Component);
  
  GetDisposedTabs.contextTypes = {
    store: _react.PropTypes.object
  };
  exports.default = GetDisposedTabs;

/***/ },
/* 180 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap/lib");

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Monitor = __webpack_require__(182);
  
  var _Monitor2 = _interopRequireDefault(_Monitor);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by zhangsai on 16/9/2.
   */
  var _ref = (0, _jsx3.default)('div', {
    className: 'text-center'
  }, void 0, (0, _jsx3.default)(_Loading2.default, {}, void 0, ' '));
  
  var _ref2 = (0, _jsx3.default)('label', {}, void 0, '\u8BF7\u9009\u62E9\u5BB9\u5668\u5B9E\u4F8B:');
  
  var _ref3 = (0, _jsx3.default)(_HeadLine2.default, {
    title: 'CPU\u76D1\u63A7',
    titleEnglish: 'CPU MONITOR',
    titleInfo: '24\u5C0F\u65F6'
  });
  
  var _ref4 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u5185\u5B58\u76D1\u63A7',
    titleEnglish: 'MEMORY MONITOR',
    titleInfo: '24\u5C0F\u65F6'
  });
  
  var _ref5 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7F51\u7EDC\u76D1\u63A7',
    titleEnglish: 'NETWORK MONITOR',
    titleInfo: '24\u5C0F\u65F6'
  });
  
  var GetMonitorTabs = function (_Component) {
    (0, _inherits3.default)(GetMonitorTabs, _Component);
  
    function GetMonitorTabs(props) {
      (0, _classCallCheck3.default)(this, GetMonitorTabs);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (GetMonitorTabs.__proto__ || (0, _getPrototypeOf2.default)(GetMonitorTabs)).call(this, props));
  
      _this.state = {
        pod_name: _this.props.podList[0].pod_name
      };
      return _this;
    }
  
    (0, _createClass3.default)(GetMonitorTabs, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'changePods',
      value: function changePods(e) {
        this.setState({
          pod_name: e.target.value
        });
        var my = this;
        setTimeout(function () {
          my.refs.cpu.componentDidMount();
          my.refs.memory.componentDidMount();
          my.refs.network.componentDidMount();
        }, 200);
      }
    }, {
      key: 'render',
      value: function render() {
        if (!this.state.pod_name || !this.props.serviceDetail) return _ref;
        var limits_cpu = this.props.serviceDetail.limits_cpu;
        switch (Number(limits_cpu)) {
          case 8:
            limits_cpu = 1000;
            break;
          case 16:
            limits_cpu = 2000;
            break;
          default:
            limits_cpu = 200;
            break;
        }
        var userName = this.context.store.getState().user_info.user_name;
        var pod_name = this.state.pod_name;
        var cpu = {
          userName: userName,
          pod_name: pod_name,
          type: "cpu",
          time_span: "1m"
        };
        var memory = {
          userName: userName,
          pod_name: pod_name,
          type: "memory",
          time_span: "1m"
        };
        var network = {
          userName: userName,
          pod_name: pod_name,
          type: "network",
          time_span: "1m"
        };
        var option = this.props.podList.map(function (item, i) {
          return (0, _jsx3.default)('option', {
            value: item.pod_name
          }, i, item.pod_name);
        });
        return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {
          className: 'choosePods'
        }, void 0, _ref2, (0, _jsx3.default)('select', {
          className: 'form-control',
          onChange: this.changePods.bind(this)
        }, void 0, option)), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement(_Monitor2.default, {
          ref: 'cpu',
          payload: cpu,
          color: ["#7ed9fc"],
          legend: false,
          divisor: limits_cpu,
          valueSuffix: '%'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement(_Monitor2.default, {
          ref: 'memory',
          payload: memory,
          color: ["#b7e769"],
          legend: false,
          divisor: '1000000',
          valueSuffix: 'M'
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref5, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement(_Monitor2.default, {
          ref: 'network',
          payload: network,
          color: ["#f7a397", "#b7e769"],
          legend: true,
          divisor: '1000',
          valueSuffix: 'kBps'
        }))));
      }
    }]);
    return GetMonitorTabs;
  }(_react.Component);
  
  GetMonitorTabs.contextTypes = {
    store: _react.PropTypes.object
  };
  exports.default = GetMonitorTabs;

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _utils = __webpack_require__(117);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var BtnGroup = function (_Component) {
    (0, _inherits3.default)(BtnGroup, _Component);
  
    function BtnGroup(props) {
      (0, _classCallCheck3.default)(this, BtnGroup);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (BtnGroup.__proto__ || (0, _getPrototypeOf2.default)(BtnGroup)).call(this, props));
  
      _this.state = {
        active: _this.props.activeKey
      };
      return _this;
    }
  
    (0, _createClass3.default)(BtnGroup, [{
      key: 'handelSelect',
      value: function handelSelect(i) {
        this.setState({
          active: i
        });
        var time = "";
        switch (i) {
          case 0:
            time = "60m";
            break;
          case 1:
            time = "360m";
            break;
          case 2:
            time = "1440m";
            break;
          default:
            time = "60m";
        }
        this.props.onSelect(time);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        var html = this.props.prop.map(function (item, i) {
          return (0, _jsx3.default)('button', {
            className: 'btn btn-default btn-xs ' + (_this2.state.active == i ? "btn-primary" : ""),
            onClick: _this2.handelSelect.bind(_this2, i)
          }, i, item);
        });
        return (0, _jsx3.default)('div', {
          className: 'btnGroup'
        }, void 0, html);
      }
    }]);
    return BtnGroup;
  }(_react.Component);
  
  var ReactHighcharts = __webpack_require__(92);
  
  var _class = function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);
  
    function _class(props) {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));
  
      _this3.state = {
        data: { xAxis: [], series: [] },
        payload: _this3.props.payload,
        time: "60m"
      };
      return _this3;
    }
  
    (0, _createClass3.default)(_class, [{
      key: 'fetchGetMonitorDataAction',
      value: function fetchGetMonitorDataAction(data, time_long) {
        var myInit = {
          method: "GET",
          headers: { token: localStorage.getItem("_at") }
        };
        var my = this;
        var url = Const.FETCH_URL.GET_SERVICE_MONITOR + "/" + data.userName + "/pods/" + data.pod_name + "/metrics/" + data.type + "?time_long=" + time_long;
        (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
          return response.json();
        }).then(function (json) {
          console.log(json, data.type);
          if (json.status == 0) {
            (function () {
              var monitor = {};
              var xAxis = [];
              var seriesName = [];
              var seriesValue = [];
              json.result.map(function (item, i) {
                if (!item.name) {
                  return false;
                } else {
                  if (data.type == "memory") {
                    if (i == 2) {
                      seriesName.push(item.name.split("/")[1]);
                      seriesValue.push(item.value);
                    }
                  } else if (data.type == "cpu") {
                    if (i == 1) {
                      seriesName.push(item.name.split("/")[1]);
                      seriesValue.push(item.value);
                    }
                  } else {
                    seriesName.push(item.name.split("/")[1]);
                    seriesValue.push(item.value);
                  }
                }
              });
              var series = seriesValue.map(function (item, i) {
                var newSeries = {};
                var arr = [];
                seriesValue[i].map(function (obj, j) {
                  xAxis.push((0, _utils.timeFormat)(obj[0], "hh:mm:ss"));
                  if (j != 0) {
                    var number = obj[1] ? obj[1] / my.props.divisor : 0;
                    arr.push(Number(number.toFixed(2)));
                  }
                });
                if (data.type == "network") {
                  newSeries.name = seriesName[i] == "rx_rate" ? "入网" : "出网";
                } else {
                  newSeries.name = seriesName[i];
                }
  
                newSeries.data = arr;
                return newSeries;
              });
              monitor.xAxis = xAxis;
              monitor.series = series;
              my.setState({
                data: monitor
              });
            })();
          }
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var data = this.props.payload;
        this.fetchGetMonitorDataAction(data, this.state.time);
        var my = this;
        this.myTime = setInterval(function () {
          my.fetchGetMonitorDataAction(data, my.state.time);
        }, 60000);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.myTime);
      }
    }, {
      key: 'changeTime',
      value: function changeTime(time) {
        var data = this.props.payload;
        this.setState({
          time: time
        });
        var my = this;
        setTimeout(function () {
          my.fetchGetMonitorDataAction(data, my.state.time);
        }, 200);
      }
    }, {
      key: 'render',
      value: function render() {
        var my = this;
        var config = {
          chart: {
            type: 'area',
            animation: false
          },
          credits: {
            enable: false
          },
          xAxis: {
            categories: my.state.data.xAxis
          },
          yAxis: {
            title: { //纵轴标题
              text: ''
            },
            labels: {
              formatter: function formatter() {
                return this.value + my.props.valueSuffix;
              }
            }
  
          },
          legend: {
            enabled: my.props.legend
          },
          colors: my.props.color,
          title: {
            text: null
          },
          plotOptions: {
            series: {
              animation: false
            },
            area: {
              marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                  hover: {
                    enabled: true
                  }
                }
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              }
            }
          },
          tooltip: {
            valueSuffix: my.props.valueSuffix
          },
          series: my.state.data.series
  
        };
        return (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'btnChoose'
        }, void 0, (0, _jsx3.default)(BtnGroup, {
          activeKey: 0,
          prop: ["1小时", "6小时", "1天"],
          type: 'memory',
          onSelect: this.changeTime.bind(this)
        }, void 0)), (0, _jsx3.default)('div', {
          className: 'monitorBox'
        }, void 0, !this.state.data.xAxis.length ? "监控信息传输中,请稍后再试" : (0, _jsx3.default)(ReactHighcharts, {
          config: config
        })));
      }
    }]);
    return _class;
  }(_react2.default.Component);
  
  exports.default = _class;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactToggle = __webpack_require__(184);
  
  var _reactToggle2 = _interopRequireDefault(_reactToggle);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by zhangsai on 16/9/2.
   */
  var UpdateStartToggle = function (_Component) {
    (0, _inherits3.default)(UpdateStartToggle, _Component);
  
    function UpdateStartToggle(props) {
      (0, _classCallCheck3.default)(this, UpdateStartToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (UpdateStartToggle.__proto__ || (0, _getPrototypeOf2.default)(UpdateStartToggle)).call(this, props));
  
      _this.state = {
        autoStart: _this.props.state
      };
      return _this;
    }
  
    (0, _createClass3.default)(UpdateStartToggle, [{
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          autoStart: !this.state.autoStart
        });
        this.props.getToggle(this.state.autoStart);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_reactToggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return UpdateStartToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('option', {
    value: 'latest'
  }, 'latest', 'latest');
  
  var _ref2 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u81EA\u52A8\u53D1\u5E03',
    titleEnglish: 'AUTOMATIC SENDING',
    titleInfo: '\u5F53\u955C\u50CF\u6709\u66F4\u65B0\u65F6\u5BB9\u5668\u662F\u5426\u81EA\u52A8\u66F4\u65B0,\u5F00\u542F\u81EA\u52A8\u66F4\u65B0\u65F6\u4F1A\u8986\u76D6\u624B\u52A8\u9009\u62E9\u7684\u7248\u672C'
  });
  
  var _ref3 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u624B\u52A8\u53D1\u5E03',
    titleEnglish: 'MANUAL RELEASE',
    titleInfo: '\u5C06\u670D\u52A1\u66F4\u65B0\u5230\u6307\u5B9A\u7684\u955C\u50CF\u7248\u672C'
  });
  
  var GetReleaseTabs = function (_Component2) {
    (0, _inherits3.default)(GetReleaseTabs, _Component2);
  
    function GetReleaseTabs(props) {
      (0, _classCallCheck3.default)(this, GetReleaseTabs);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (GetReleaseTabs.__proto__ || (0, _getPrototypeOf2.default)(GetReleaseTabs)).call(this, props));
  
      _this2.state = {
        isUpdate: _this2.props.serviceDetail.policy
      };
      return _this2;
    }
  
    (0, _createClass3.default)(GetReleaseTabs, [{
      key: 'getToggleValue',
      value: function getToggleValue(value) {
        var flag = !value ? 1 : 0; //1 true  0 false
        this.setState({
          isUpdate: flag
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.getBuildingDetail(this.props.serviceDetail.image_id);
      }
    }, {
      key: 'changeRelease',
      value: function changeRelease() {
        var image_name = this.props.serviceDetail.image_name,
            image_version = _reactDom2.default.findDOMNode(this.refs.imageVersion).value,
            policy = this.state.isUpdate;
        var data = {
          image_name: image_name,
          image_version: image_version,
          policy: String(policy),
          serviceName: this.props.serviceName
        };
        this.props.onChangeRelease(data);
      }
    }, {
      key: 'render',
      value: function render() {
        var data = this.props.serviceDetail;
        var tags = this.props.buildingDetail.tags;
        var option = [];
        if (!tags || !tags.length) {
          option.push(_ref);
        } else {
          tags.map(function (item, i) {
            option.push((0, _jsx3.default)('option', {
              value: item.tag
            }, i, item.tag));
          });
        }
        return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref2, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, (0, _jsx3.default)(UpdateStartToggle, {
          state: this.state.isUpdate == 1,
          getToggle: this.getToggleValue.bind(this)
        }))), (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'assBox'
        }, void 0, _react2.default.createElement(
          'select',
          { className: 'form-control', ref: 'imageVersion', defaultValue: data.image_version },
          option
        )), (0, _jsx3.default)('div', {
          className: 'assBox sdLastBtn'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary ' + (!this.props.isBtnState.deploy ? "btn-loading" : ""),
          disabled: !this.props.isBtnState.deploy,
          onClick: this.changeRelease.bind(this)
        }, void 0, '\u66F4\u65B0\u53D1\u5E03'))));
      }
    }]);
    return GetReleaseTabs;
  }(_react.Component);
  
  exports.default = GetReleaseTabs;

/***/ },
/* 184 */
/***/ function(module, exports) {

  module.exports = require("react-toggle");

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by zhangsai on 16/9/2.
   */
  var _ref = (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
    className: 'astTdBox sdDomain'
  }, void 0, (0, _jsx3.default)('input', {
    type: 'text',
    placeholder: '\u8BF7\u8F93\u5165\u65B0\u57DF\u540D'
  }))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
    className: 'astTdBox'
  })), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
    className: 'astTdBox'
  }, void 0, (0, _jsx3.default)('span', {
    className: 'color999'
  }, void 0, '\u662F'))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('button', {
    className: 'btn btn-primary'
  }, void 0, '\u6DFB\u52A0')));
  
  var _ref2 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u81EA\u6709\u57DF\u540D'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, 'CNAME\u5730\u5740'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u57DF\u540D\u9A8C\u8BC1'), (0, _jsx3.default)('th', {
    width: '25%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref3 = (0, _jsx3.default)('div', {
    className: 'assItem'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7ED1\u5B9A\u81EA\u6709\u57DF\u540D',
    titleEnglish: 'BIND OWN DOMAIN',
    titleInfo: '\u57DF\u540D\u7ED1\u5B9A\u8BF4\u660E'
  }));
  
  var GetRealmNameTabs = function (_Component) {
    (0, _inherits3.default)(GetRealmNameTabs, _Component);
  
    function GetRealmNameTabs() {
      (0, _classCallCheck3.default)(this, GetRealmNameTabs);
      return (0, _possibleConstructorReturn3.default)(this, (GetRealmNameTabs.__proto__ || (0, _getPrototypeOf2.default)(GetRealmNameTabs)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetRealmNameTabs, [{
      key: 'getRealmNameTableBody',
      value: function getRealmNameTableBody() {
        return _ref;
      }
    }, {
      key: 'getRealmNameTable',
      value: function getRealmNameTable() {
        return (0, _jsx3.default)('table', {
          className: 'table table-hover table-bordered'
        }, void 0, _ref2, (0, _jsx3.default)('tbody', {}, void 0, this.getRealmNameTableBody()));
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {}, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'assItem'
        }, void 0, this.getRealmNameTable()));
      }
    }]);
    return GetRealmNameTabs;
  }(_react.Component);
  
  exports.default = GetRealmNameTabs;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)("tr", {}, void 0, (0, _jsx3.default)("td", {
    colSpan: "4"
  }, void 0, "\u6682\u65E0\u6570\u636E~"));
  
  var _ref2 = (0, _jsx3.default)("thead", {}, void 0, (0, _jsx3.default)("tr", {}, void 0, (0, _jsx3.default)("th", {}, void 0, "\u540D\u79F0"), (0, _jsx3.default)("th", {}, void 0, "IP"), (0, _jsx3.default)("th", {}, void 0, "\u7AEF\u53E3"), (0, _jsx3.default)("th", {}, void 0, "\u72B6\u6001")));
  
  var GetContainerTabs = function (_React$Component) {
    (0, _inherits3.default)(GetContainerTabs, _React$Component);
  
    function GetContainerTabs() {
      (0, _classCallCheck3.default)(this, GetContainerTabs);
      return (0, _possibleConstructorReturn3.default)(this, (GetContainerTabs.__proto__ || (0, _getPrototypeOf2.default)(GetContainerTabs)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetContainerTabs, [{
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "getTableLine",
      value: function getTableLine() {
        var podList = this.props.podList;
        if (!podList || !podList.length) return _ref;
        var body = [];
        podList.map(function (item, i) {
          var n = item.containers.length;
          var port = item.containers.map(function (obj, j) {
            var d = n == j + 1 ? "" : ",";
            return obj.container_port + "/" + obj.access_mode + d;
          });
          body.push((0, _jsx3.default)("tr", {}, i, (0, _jsx3.default)("td", {}, void 0, item.pod_name), (0, _jsx3.default)("td", {}, void 0, item.pod_ip), (0, _jsx3.default)("td", {}, void 0, port), (0, _jsx3.default)("td", {}, void 0, (0, _jsx3.default)("div", {
            className: "mirror-state " + (item.pod_phase == "Running" ? "on" : "off") + " tablePaddingLeft"
          }, void 0, item.pod_phase == "Running" ? '运行中' : '已停止'))));
        });
        return body;
      }
    }, {
      key: "render",
      value: function render() {
        return (0, _jsx3.default)("div", {
          style: { padding: "15px" }
        }, void 0, (0, _jsx3.default)("table", {
          className: "table table-hover table-bordered volumes-table"
        }, void 0, _ref2, (0, _jsx3.default)("tbody", {}, void 0, this.getTableLine())));
      }
    }]);
    return GetContainerTabs;
  }(_react2.default.Component);
  
  exports.default = GetContainerTabs;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)("p", {}, void 0, "*\u5220\u9664\u5E94\u7528\u5C06\u6E05\u9664\u8BE5\u5E94\u7528\u7684\u6240\u6709\u6570\u636E\uFF0C\u4E14\u8BE5\u64CD\u4F5C\u4E0D\u80FD\u88AB\u6062\u590D\uFF0C\u8BF7\u614E\u91CD\u9009\u62E9\uFF01 "); /**
                                                                                                                                                                                                                                                         * Created by zhangsai on 16/9/2.
                                                                                                                                                                                                                                                         */
  
  
  var GetOptTabs = function (_Component) {
      (0, _inherits3.default)(GetOptTabs, _Component);
  
      function GetOptTabs() {
          (0, _classCallCheck3.default)(this, GetOptTabs);
          return (0, _possibleConstructorReturn3.default)(this, (GetOptTabs.__proto__ || (0, _getPrototypeOf2.default)(GetOptTabs)).apply(this, arguments));
      }
  
      (0, _createClass3.default)(GetOptTabs, [{
          key: "deleteService",
          value: function deleteService() {
              var serviceName = this.props.serviceName;
              var data = { serviceName: serviceName, type: "detail" };
              confirm("是否删除?") ? this.props.onDeleteService(data) : "";
          }
      }, {
          key: "render",
          value: function render() {
              return (0, _jsx3.default)("div", {
                  className: "handleBox"
              }, void 0, (0, _jsx3.default)("button", {
                  className: "btn btn-danger",
                  onClick: this.deleteService.bind(this)
              }, void 0, "\u5220\u9664\u5E94\u7528"), _ref);
          }
      }]);
      return GetOptTabs;
  }(_react.Component);
  
  exports.default = GetOptTabs;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getServiceDetail
  var getServiceDetail = function getServiceDetail(state) {
    return state.serviceDetail;
  };
  
  var makeGetServiceDetail = function makeGetServiceDetail() {
    return (0, _reselect.createSelector)([getServiceDetail], function (serviceDetail) {
      return serviceDetail;
    });
  };
  
  exports.default = makeGetServiceDetail;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //logs
  var getLogs = function getLogs(state) {
    return state.logs;
  };
  
  var makeGetLogsSelector = function makeGetLogsSelector() {
    return (0, _reselect.createSelector)([getLogs], function (logs) {
      return logs;
    });
  };
  
  exports.default = makeGetLogsSelector;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //logs_xhr
  var getLogs_xhr = function getLogs_xhr(state) {
    return state.logs_xhr;
  };
  
  var maleLogs_xhrSelector = function maleLogs_xhrSelector() {
    return (0, _reselect.createSelector)([getLogs_xhr], function (logs_xhr) {
      return logs_xhr;
    });
  };
  
  exports.default = maleLogs_xhrSelector;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getPodList = function getPodList(state) {
    return state.podList;
  };
  
  var makeGetPodListSelector = function makeGetPodListSelector() {
    return (0, _reselect.createSelector)([getPodList], function (podList) {
      return podList;
    });
  };
  
  exports.default = makeGetPodListSelector;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getMonitorData
  var getMonitorData = function getMonitorData(state) {
    return state.monitorData;
  };
  
  var makeGetMonitorDataSelector = function makeGetMonitorDataSelector() {
    return (0, _reselect.createSelector)([getMonitorData], function (monitorData) {
      return monitorData;
    });
  };
  
  exports.default = makeGetMonitorDataSelector;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _VolumeListContainer = __webpack_require__(194);
  
  var _VolumeListContainer2 = _interopRequireDefault(_VolumeListContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_VolumeListContainer2.default, {});
  
  exports.default = {
  
    path: '/volumes',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(51);
  
  var _VolumeList = __webpack_require__(195);
  
  var _VolumeList2 = _interopRequireDefault(_VolumeList);
  
  var _volumes = __webpack_require__(98);
  
  var _breadcumb = __webpack_require__(93);
  
  var _volumesListSelector = __webpack_require__(99);
  
  var _volumesListSelector2 = _interopRequireDefault(_volumesListSelector);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _volumesListSelector2.default)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      volumesList: selector(state),
      isBtnState: isBtnStateSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      onVolumesListLoad: function onVolumesListLoad() {
        dispatch((0, _volumes.fetchVolumesListAction)());
      },
      onVolumeCreate: function onVolumeCreate(data) {
        dispatch((0, _volumes.createVolume)(data));
      },
      onVolumeDelete: function onVolumeDelete(diskName) {
        dispatch((0, _volumes.deleteVolume)(diskName));
      },
      onVolumeScale: function onVolumeScale(diskName, diskSize) {
        dispatch((0, _volumes.scaleVolume)(diskName, diskSize));
      },
      onClearVolumesList: function onClearVolumesList() {
        dispatch((0, _volumes.refreshVolumeList)());
      }
  
    };
  };
  
  var VolumeTableContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_VolumeList2.default);
  
  exports.default = VolumeTableContainer;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _VolumeCreateModal = __webpack_require__(196);
  
  var _VolumeCreateModal2 = _interopRequireDefault(_VolumeCreateModal);
  
  var _VolumeScaleModal = __webpack_require__(197);
  
  var _VolumeScaleModal2 = _interopRequireDefault(_VolumeScaleModal);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _constants = __webpack_require__(38);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(112);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = '数据卷列表';
  
  var _ref = (0, _jsx3.default)('p', {
    className: "hbPName"
  }, void 0, '\u521B\u5EFA\u5B58\u50A8\u5377');
  
  var _ref2 = (0, _jsx3.default)('p', {
    className: "hbPInfo"
  }, void 0, 'Create a volume');
  
  var _ref3 = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref4 = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref5 = (0, _jsx3.default)('img', {
    className: 'mediaImg',
    src: '/slImgJx.png'
  });
  
  var _ref6 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '1'
  }, void 0, '\u5220\u9664');
  
  var _ref7 = (0, _jsx3.default)('a', {
    href: 'javascript:;',
    className: "hbAddExplain"
  }, void 0, '\u4EC0\u4E48\u662F\u5B58\u50A8\u5377\uFF1F');
  
  var _ref8 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u5B58\u50A8\u5377\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '20%'
  }, void 0, '\u521B\u5EFA\u65F6\u95F4'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u5B58\u50A8\u683C\u5F0F'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u72B6\u6001'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u5BB9\u91CF'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u64CD\u4F5C')));
  
  var VolumeList = function (_Component) {
    (0, _inherits3.default)(VolumeList, _Component);
  
    function VolumeList() {
      (0, _classCallCheck3.default)(this, VolumeList);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (VolumeList.__proto__ || (0, _getPrototypeOf2.default)(VolumeList)).call(this));
  
      _this.state = {
        diskName: ""
      };
      return _this;
    }
  
    (0, _createClass3.default)(VolumeList, [{
      key: 'getCreateBtn',
      value: function getCreateBtn() {
        var _this2 = this;
  
        return (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbAddBtn", "clearfix"),
          onClick: function onClick() {
            _this2.refs.createModal.open();
          }
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbPlus", "left")
        }), (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbPlusInfo", "left")
        }, void 0, _ref, _ref2));
      }
    }, {
      key: 'deleteLine',
      value: function deleteLine(diskName) {
        this.setState({
          diskName: diskName
        });
        this.refs.confirmModal.open();
      }
    }, {
      key: 'createVolume',
      value: function createVolume(data) {
        this.props.onVolumeCreate(data);
        this.refs.createModal.hide();
      }
    }, {
      key: 'scaleVolume',
      value: function scaleVolume(diskName, diskSize) {
        this.props.onVolumeScale(diskName, diskSize);
        this.refs.scaleModal.hide();
      }
    }, {
      key: 'getDiskSize',
      value: function getDiskSize(size) {
        return parseInt(size) / 1024 + 'G';
      }
    }, {
      key: 'getTableLine',
      value: function getTableLine() {
        var _this3 = this;
  
        var data = this.props.volumesList;
        if (!data.length) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '6',
          style: { "textAlign": "center" }
        }, void 0, '\u6682\u65E0\u6570\u636E~'));
        if (data.length == 1 && data[0] == 1) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '6',
          style: { "textAlign": "center" }
        }, void 0, _ref3));
        if (data.length == 1 && data[0] == 0) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '6',
          style: { "textAlign": "center" }
        }, void 0, _ref4));
        var body = [];
        data.map(function (item, i) {
          body.push((0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'mediaItem'
          }, void 0, _ref5, (0, _jsx3.default)('span', {
            className: 'mediaTxt'
          }, void 0, item.disk_name))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('span', {
            className: 'cl3'
          }, void 0, item.create_time)), (0, _jsx3.default)('td', {}, void 0, item.fs_type), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: (0, _classnames2.default)("mirror-state", item.disk_status == "unused" ? "off" : "on")
          }, void 0, item.disk_status == "unused" ? '未使用' : '使用中')), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('span', {
            className: 'cl3'
          }, void 0, _this3.getDiskSize(item.disk_size))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'btn-group'
          }, void 0, (0, _jsx3.default)(_reactBootstrap.SplitButton, {
            onClick: function onClick() {
              _this3.refs.scaleModal.open(item);
            },
            onSelect: _this3.deleteLine.bind(_this3, item.disk_name),
            bsStyle: 'primary',
            title: '\u6269\u5BB9',
            id: 'volumes-table-line-' + i
          }, void 0, _ref6)))));
        });
        return body;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.VOLUMES);
        this.props.onVolumesListLoad();
        this.myTime = setInterval(this.props.onVolumesListLoad, 10000);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.myTime);
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.props.onClearVolumesList();
        this.props.onVolumesListLoad();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;
  
        this.context.setTitle(title);
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbHd", "clearfix")
        }, void 0, (0, _jsx3.default)('div', {
          className: (0, _classnames2.default)("hbAdd", "left")
        }, void 0, this.getCreateBtn(), _ref7), (0, _jsx3.default)('div', {
          className: 'right slSearch'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-default icon-refresh',
          onClick: this.refresh.bind(this),
          title: '\u5237\u65B0'
        }, void 0, ' '))), (0, _jsx3.default)('div', {
          className: 'TableTextLeft',
          style: { padding: "15px" }
        }, void 0, (0, _jsx3.default)('table', {
          className: 'table table-hover table-bordered volumes-table'
        }, void 0, _ref8, (0, _jsx3.default)('tbody', {}, void 0, this.getTableLine()))), _react2.default.createElement(_VolumeScaleModal2.default, { ref: 'scaleModal', onSave: this.scaleVolume.bind(this) }), _react2.default.createElement(_VolumeCreateModal2.default, { ref: 'createModal', isBtnState: this.props.isBtnState, onVolumeCreate: this.createVolume.bind(this) }), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6B64\u6570\u636E\u5377\u5417?',
          ref: 'confirmModal',
          func: function func() {
            _this4.props.onVolumeDelete(_this4.state.diskName);
          }
        }));
      }
    }]);
    return VolumeList;
  }(_react.Component);
  
  VolumeList.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  exports.default = VolumeList;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactInputRange = __webpack_require__(173);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var InputRangesBox = function (_Component) {
    (0, _inherits3.default)(InputRangesBox, _Component);
  
    //input滑块
    function InputRangesBox(props) {
      (0, _classCallCheck3.default)(this, InputRangesBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (InputRangesBox.__proto__ || (0, _getPrototypeOf2.default)(InputRangesBox)).call(this, props));
  
      _this.state = {
        value: 10
      };
      return _this;
    }
  
    (0, _createClass3.default)(InputRangesBox, [{
      key: 'handleValueChange',
      value: function handleValueChange(component, value) {
        this.setState({
          value: value
        });
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        return this.state.value;
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: 'formField'
        }, void 0, (0, _jsx3.default)(_reactInputRange2.default, {
          className: 'formField',
          maxValue: 100,
          minValue: 10,
          step: 10,
          labelPrefix: '',
          labelSuffix: 'G',
          value: this.state.value,
          onChange: this.handleValueChange.bind(this)
        }));
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('span', {
    'aria-hidden': 'true'
  }, void 0, '\xD7');
  
  var _ref2 = (0, _jsx3.default)('h4', {
    className: 'modal-title',
    id: 'contained-modal-title-sm'
  }, void 0, '\u521B\u5EFA\u5B58\u50A8\u5377');
  
  var _ref3 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '\u540D\u79F0'));
  
  var _ref4 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '\u5927\u5C0F'));
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, '\u5145\u503C\u7528\u6237\u53EF\u4EE5\u521B\u5EFA\u66F4\u5927\u5B58\u50A8\u5377');
  
  var _ref6 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '\u683C\u5F0F'));
  
  var _ref7 = (0, _jsx3.default)('option', {
    value: 'xfs'
  }, void 0, 'xfs');
  
  var _ref8 = (0, _jsx3.default)('option', {
    value: 'ext4'
  }, void 0, 'ext4');
  
  var _ref9 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, ' '));
  
  var _class = function (_Component2) {
    (0, _inherits3.default)(_class, _Component2);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this));
  
      _this2.state = {
        show: false
      };
      return _this2;
    }
  
    (0, _createClass3.default)(_class, [{
      key: 'open',
      value: function open() {
        this.setState({
          show: true,
          isName: false
        });
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.setState({ show: false });
      }
    }, {
      key: 'createVolume',
      value: function createVolume() {
        var data = {
          disk_name: this.refs.disk_name.value,
          disk_size: this.refs.disk_size.getValue() * 1024 + "",
          fs_type: this.refs.fs_type.value
        };
        if (!/^[a-z]{1}[a-z0-9_]{5,}$/.test(data.disk_name)) {
          this.setState({
            isName: true
          });
          this.refs.disk_name.focus();
          return false;
        }
        this.props.onVolumeCreate(data);
      }
    }, {
      key: 'changeName',
      value: function changeName() {
        this.setState({
          isName: false
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _reactBootstrap.Modal,
          (0, _extends3.default)({}, this.props, { show: this.state.show,
            onHide: this.hide.bind(this),
            bsSize: 'sm', 'aria-labelledby': 'contained-modal-title-sm' }),
          (0, _jsx3.default)('div', {
            className: 'modal-header'
          }, void 0, (0, _jsx3.default)('button', {
            type: 'button',
            onClick: this.hide.bind(this),
            className: 'close',
            'aria-label': 'Close'
          }, void 0, _ref), _ref2),
          (0, _jsx3.default)('div', {
            className: 'modal-body'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'modalItem'
          }, void 0, _ref3, (0, _jsx3.default)('label', {}, void 0, _react2.default.createElement('input', { onChange: this.changeName.bind(this), className: 'form-control form-control-sm', type: 'input', placeholder: '\u8BF7\u8F93\u5165\u540D\u79F0', ref: 'disk_name' }))), (0, _jsx3.default)('div', {
            className: 'modalItem'
          }, void 0, _ref4, (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('div', {
            className: 'modelInputRange'
          }, void 0, _react2.default.createElement(InputRangesBox, { ref: 'disk_size' }), _ref5))), (0, _jsx3.default)('div', {
            className: 'modalItem'
          }, void 0, _ref6, (0, _jsx3.default)('label', {}, void 0, _react2.default.createElement(
            'select',
            { ref: 'fs_type', className: 'form-control' },
            _ref7,
            _ref8
          ))), (0, _jsx3.default)('div', {
            className: this.state.isName ? "volumeTip volumeTipShow" : "volumeTip"
          }, void 0, '\u6570\u636E\u5377\u540D\u79F0\u683C\u5F0F\u4E0D\u6B63\u786E'), (0, _jsx3.default)('div', {
            className: 'modalItem modelItemLast'
          }, void 0, _ref9, (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)(_reactBootstrap.Button, {
            bsStyle: 'primary',
            disabled: !this.props.isBtnState.volume,
            onClick: this.createVolume.bind(this)
          }, void 0, '\u521B\u5EFA\u5B58\u50A8\u5377'))))
        );
      }
    }]);
    return _class;
  }(_react.Component);

  exports.default = _class;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactInputRange = __webpack_require__(173);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var InputRangesBox = function (_Component) {
    (0, _inherits3.default)(InputRangesBox, _Component);
  
    function InputRangesBox(props) {
      (0, _classCallCheck3.default)(this, InputRangesBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (InputRangesBox.__proto__ || (0, _getPrototypeOf2.default)(InputRangesBox)).call(this, props));
  
      _this.state = {
        value: _this.props.value
      };
      return _this;
    } //input滑块
  
  
    (0, _createClass3.default)(InputRangesBox, [{
      key: 'getValue',
      value: function getValue() {
        return this.state.value;
      }
    }, {
      key: 'handleValueChange',
      value: function handleValueChange(component, value) {
        this.setState({
          value: value
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: 'formField'
        }, void 0, (0, _jsx3.default)(_reactInputRange2.default, {
          className: 'formField',
          maxValue: 100,
          minValue: this.props.value || 10,
          step: 10,
          labelPrefix: '',
          labelSuffix: 'G',
          value: this.state.value,
          onChange: this.handleValueChange.bind(this)
        }));
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('span', {
    'aria-hidden': 'true'
  }, void 0, '\xD7');
  
  var _ref2 = (0, _jsx3.default)('h4', {
    className: 'modal-title',
    id: 'contained-modal-title-sm'
  }, void 0, '\u6269\u5BB9');
  
  var _ref3 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '\u5927\u5C0F'));
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, '\u5145\u503C\u7528\u6237\u53EF\u4EE5\u521B\u5EFA\u66F4\u5927\u5B58\u50A8\u5377');
  
  var _ref5 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, ' '));
  
  var _class = function (_Component2) {
    (0, _inherits3.default)(_class, _Component2);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this));
  
      _this2.state = {
        show: false,
        data: {}
      };
      return _this2;
    }
  
    (0, _createClass3.default)(_class, [{
      key: 'open',
      value: function open(item) {
        this.setState({
          show: true,
          data: item
        });
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.setState({ show: false });
      }
    }, {
      key: 'save',
      value: function save() {
        this.props.onSave(this.state.data.disk_name, String(this.refs.diskSize.getValue() * 1024));
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _reactBootstrap.Modal,
          (0, _extends3.default)({}, this.props, { show: this.state.show, onHide: this.hide.bind(this),
            bsSize: 'sm', 'aria-labelledby': 'contained-modal-title-sm' }),
          (0, _jsx3.default)('div', {
            className: 'modal-header'
          }, void 0, (0, _jsx3.default)('button', {
            type: 'button',
            onClick: this.hide.bind(this),
            className: 'close',
            'aria-label': 'Close'
          }, void 0, _ref), _ref2),
          (0, _jsx3.default)('div', {
            className: 'modal-body'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'modalItem dilatationModalItem'
          }, void 0, _ref3, (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('div', {
            className: 'modelInputRange'
          }, void 0, _react2.default.createElement(InputRangesBox, { ref: 'diskSize', value: this.state.data.disk_size / 1024 << 0 }), _ref4))), (0, _jsx3.default)('div', {
            className: 'modalItem modelItemLast dilatationModalItem'
          }, void 0, _ref5, (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('button', {
            className: 'btn btn-primary',
            onClick: this.save.bind(this)
          }, void 0, '\u4FDD\u5B58'))))
        );
      }
    }]);
    return _class;
  }(_react.Component);

  exports.default = _class;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(199);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Login2.default, {});
  
  exports.default = {
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactCookie = __webpack_require__(69);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _constants = __webpack_require__(38);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Notification = __webpack_require__(84);
  
  var _Notification2 = _interopRequireDefault(_Notification);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('a', {
    href: 'javascript:;',
    className: 'entryLogo'
  }, void 0, (0, _jsx3.default)('image', {
    src: '/logo.png'
  }));
  
  var _ref2 = (0, _jsx3.default)('div', {
    className: 'entryHdBtn'
  }, void 0, (0, _jsx3.default)('a', {
    href: '/signUp'
  }, void 0, '\u6CE8\u518C'), (0, _jsx3.default)('a', {
    href: '/login'
  }, void 0, '\u767B\u5F55'));
  
  var _ref3 = (0, _jsx3.default)('div', {
    className: 'entryModelBg'
  }, void 0, 'Make it simple   make it fast');
  
  var _ref4 = (0, _jsx3.default)('div', {
    className: 'title'
  }, void 0, '\u7528\u6237\u767B\u5F55');
  
  var _ref5 = (0, _jsx3.default)('div', {
    className: 'entryFromFt'
  }, void 0, (0, _jsx3.default)('a', {
    href: '/signUp'
  }, void 0, '\u7ACB\u5373\u6CE8\u518C'), (0, _jsx3.default)('a', {
    href: 'javascript:;'
  }, void 0, '\u5FD8\u8BB0\u5BC6\u7801'));
  
  var _ref6 = (0, _jsx3.default)('div', {
    className: 'entryBg'
  });
  
  var _ref7 = (0, _jsx3.default)('a', {
    href: 'javascript:;',
    className: 'entryLogo'
  }, void 0, (0, _jsx3.default)('image', {
    src: '/logo.png'
  }));
  
  var _ref8 = (0, _jsx3.default)('div', {
    className: 'entryHdBtn'
  }, void 0, (0, _jsx3.default)('a', {
    href: '/signUp'
  }, void 0, '\u6CE8\u518C'), (0, _jsx3.default)('a', {
    href: '/login'
  }, void 0, '\u767B\u5F55'));
  
  var _ref9 = (0, _jsx3.default)('div', {
    className: 'title'
  }, void 0, '\u7528\u6237\u767B\u5F55');
  
  var _ref10 = (0, _jsx3.default)('div', {
    className: 'entryFromFt'
  }, void 0, '\u6CA1\u6709\u8D26\u6237? ', (0, _jsx3.default)('a', {
    href: '/signUp'
  }, void 0, '\u6CE8\u518C'), (0, _jsx3.default)('a', {
    href: 'javascript:;'
  }, void 0, '\u5FD8\u8BB0\u5BC6\u7801'));
  
  var _ref11 = (0, _jsx3.default)('div', {
    className: 'entryBg'
  });
  
  var Login = function (_React$Component) {
    (0, _inherits3.default)(Login, _React$Component);
  
    function Login(props) {
      (0, _classCallCheck3.default)(this, Login);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call(this, props));
  
      _this.state = {
        uName: false,
        uPassword: false,
        isLogin: true,
        notifications: { message: "" }
      };
      return _this;
    }
  
    (0, _createClass3.default)(Login, [{
      key: 'login',
      value: function login() {
        var data = {},
            uName = _reactDom2.default.findDOMNode(this.refs.username).value,
            uPassword = _reactDom2.default.findDOMNode(this.refs.password).value,
            userTip = _reactDom2.default.findDOMNode(this.refs.userTip),
            passwordTip = _reactDom2.default.findDOMNode(this.refs.passwordTip),
            my = this,
            myInit = void 0;
        if (uName == "") {
          userTip.innerHTML = "用户名不能为空";
          this.setState({
            uName: true
          });
          return false;
        }
        if (uPassword == "") {
          passwordTip.innerHTML = "密码不能为空";
          this.setState({
            uPassword: true
          });
          return false;
        }
        my.setState({
          isLogin: false
        });
        data = {
          user_name: uName,
          pass_word: uPassword
        };
        console.log(data, "登录参数isok");
        myInit = {
          method: "POST",
          body: (0, _stringify2.default)(data)
        };
        fetch(_constants.FETCH_URL.USER + "/tokens", myInit).then(function (res) {
          if (res.ok) {
            return res.json().then(function (data) {
              console.log(data);
              if (data.status == 0) {
                localStorage.setItem('_at', data.result.token);
                var exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
                _reactCookie2.default.save('_at', data.result.token, { path: '/', expires: exp });
                _reactCookie2.default.save('sidebarActive', "/", { path: '/', expires: exp });
                _reactCookie2.default.save('isSidebarOpen', true, { path: '/', expires: exp });
                my.setState({
                  notifications: {
                    message: "登录成功",
                    level: "success"
                  }
                });
                setTimeout(function () {
                  my.setState({
                    notifications: {
                      message: "",
                      level: ""
                    }
                  });
                  window.location.href = "/";
                }, 2000);
              } else if (data.status == 705) {
                userTip.innerHTML = "用户名或者密码错误";
                my.setState({
                  uName: true,
                  isLogin: true
                });
              } else {
                my.setState({
                  notifications: {
                    message: "登录失败:" + data.msg,
                    level: "danger"
                  },
                  isLogin: true
                });
                setTimeout(function () {
                  my.setState({
                    notifications: {
                      message: "",
                      level: ""
                    }
                  });
                }, 5000);
              }
            });
          } else {
            my.setState({
              isLogin: true
            });
            console.log("is xxx");
          }
        });
      }
    }, {
      key: 'changeUserName',
      value: function changeUserName(e) {
        if (e.target.value) {
          this.setState({
            uName: false
          });
        }
      }
    }, {
      key: 'changePassword',
      value: function changePassword(e) {
        if (e.target.value) {
          this.setState({
            uPassword: false
          });
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var me = this;
        document.onkeydown = function (e) {
          if (e.keyCode == 13) {
            me.login();
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var notification = this.state.notifications.message ? (0, _jsx3.default)(_Notification2.default, {
          show: true,
          obj: this.state.notifications
        }) : (0, _jsx3.default)(_Notification2.default, {
          show: false,
          obj: this.state.notifications
        });
        this.context.setTitle("登录");
        return (0, _jsx3.default)('div', {
          className: 'entryBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryHd'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'w1200 clearfix'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryHdLogo'
        }, void 0, _ref), _ref2)), (0, _jsx3.default)('div', {
          className: 'entryBd'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryModel'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'entryFrom'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'entryItemBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryItem ' + (this.state.uName ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox icon-username'
        }, void 0, _react2.default.createElement('input', { onInput: this.changeUserName.bind(this), className: 'entryInput', ref: 'username', type: 'text', placeholder: '\u7528\u6237\u540D\u6216\u90AE\u7BB1' })), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'userTip' },
          '\u7528\u6237\u540D\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryItem ' + (this.state.uPassword ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox icon-mima'
        }, void 0, _react2.default.createElement('input', { onInput: this.changePassword.bind(this), className: 'entryInput', ref: 'password', type: 'password', placeholder: '\u5BC6\u7801' })), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'passwordTip' },
          '\u5BC6\u7801\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary entryBtn ' + (!this.state.isLogin ? "btn-loading" : ""),
          disabled: !this.state.isLogin,
          onClick: this.login.bind(this)
        }, void 0, this.state.isLogin ? "登录" : "登录中")), _ref5)))), _ref6, notification);
      }
    }, {
      key: 'render1',
      value: function render1() {
        var notification = this.state.notifications.message ? (0, _jsx3.default)(_Notification2.default, {
          obj: this.state.notifications
        }) : null;
        this.context.setTitle("登录");
        return (0, _jsx3.default)('div', {
          className: 'entryBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryHd'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'w1200 clearfix'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryHdLogo'
        }, void 0, _ref7), _ref8)), (0, _jsx3.default)('div', {
          className: 'entryBd'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryModel'
        }, void 0, _ref9, (0, _jsx3.default)('div', {
          className: 'entryFrom'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryItem ' + (this.state.uName ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox icon-username'
        }, void 0, _react2.default.createElement('input', { onInput: this.changeUserName.bind(this), className: 'entryInput', ref: 'username', type: 'text', placeholder: '\u7528\u6237\u540D\u6216\u90AE\u7BB1' })), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'userTip' },
          '\u7528\u6237\u540D\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryItem ' + (this.state.uPassword ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox icon-mima'
        }, void 0, _react2.default.createElement('input', { onInput: this.changePassword.bind(this), className: 'entryInput', ref: 'password', type: 'password', placeholder: '\u5BC6\u7801' })), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'passwordTip' },
          '\u5BC6\u7801\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary entryBtn',
          disabled: !this.state.isLogin,
          onClick: this.login.bind(this)
        }, void 0, this.state.isLogin ? "登录" : "登录中...")), _ref10))), _ref11, notification);
      }
    }]);
    return Login;
  }(_react2.default.Component);
  
  Login.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  exports.default = Login;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SignUp = __webpack_require__(201);
  
  var _SignUp2 = _interopRequireDefault(_SignUp);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_SignUp2.default, {});
  
  exports.default = {
    path: '/signUp',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _Notification = __webpack_require__(84);
  
  var _Notification2 = _interopRequireDefault(_Notification);
  
  var _uuid = __webpack_require__(202);
  
  var _uuid2 = _interopRequireDefault(_uuid);
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('a', {
    href: 'javascript:;',
    className: 'entryLogo'
  }, void 0, (0, _jsx3.default)('image', {
    src: '/logo.png'
  }));
  
  var _ref2 = (0, _jsx3.default)('div', {
    className: 'entryHdBtn'
  }, void 0, (0, _jsx3.default)('a', {
    href: '/signUp'
  }, void 0, '\u6CE8\u518C'), (0, _jsx3.default)('a', {
    href: '/login'
  }, void 0, '\u767B\u5F55'));
  
  var _ref3 = (0, _jsx3.default)('div', {
    className: 'entryModelBg'
  }, void 0, 'Make it simple   make it fast');
  
  var _ref4 = (0, _jsx3.default)('div', {
    className: 'title'
  }, void 0, '\u7528\u6237\u6CE8\u518C');
  
  var _ref5 = (0, _jsx3.default)('div', {
    className: 'entryFromFt'
  }, void 0, (0, _jsx3.default)('a', {
    href: '/login'
  }, void 0, '\u5DF2\u6709\u8D26\u6237   \u767B\u5F55'));
  
  var _ref6 = (0, _jsx3.default)('div', {
    className: 'entryBg'
  });
  
  var SignUp = function (_React$Component) {
    (0, _inherits3.default)(SignUp, _React$Component);
  
    function SignUp(props) {
      (0, _classCallCheck3.default)(this, SignUp);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (SignUp.__proto__ || (0, _getPrototypeOf2.default)(SignUp)).call(this, props));
  
      _this.state = {
        uName: false,
        uEmail: false,
        uPassword: false,
        uCode: false,
        isSignUp: true,
        notifications: { message: "" }
      };
      return _this;
    }
  
    (0, _createClass3.default)(SignUp, [{
      key: 'signUp',
      value: function signUp() {
        var uName = _reactDom2.default.findDOMNode(this.refs.username).value,
            userTip = _reactDom2.default.findDOMNode(this.refs.userTip),
            uEmail = _reactDom2.default.findDOMNode(this.refs.email).value,
            emailTip = _reactDom2.default.findDOMNode(this.refs.emailTip),
            uPassword = _reactDom2.default.findDOMNode(this.refs.password).value,
            passwordTip = _reactDom2.default.findDOMNode(this.refs.passwordTip),
            uCode = _reactDom2.default.findDOMNode(this.refs.code).value,
            codeTip = _reactDom2.default.findDOMNode(this.refs.codeTip),
            codeId = _reactDom2.default.findDOMNode(this.refs.codeImg).src,
            myInit = void 0,
            my = this;
        codeId = codeId.split("?")[1].split("=")[1];
        console.log(codeId);
        if (uName == "") {
          userTip.innerHTML = "用户名不能为空";
          this.setState({
            uName: true
          });
          return false;
        }
        if (uEmail == "") {
          emailTip.innerHTML = "邮箱不能为空";
          this.setState({
            uEmail: true
          });
          return false;
        }
        if (uPassword == "") {
          passwordTip.innerHTML = "密码不能为空";
          this.setState({
            uPassword: true
          });
          return false;
        }
        if (uCode == "") {
          codeTip.innerHTML = "验证码不能为空";
          this.setState({
            uCode: true
          });
          return false;
        }
        if (!this.state.uName && !this.state.uEmail && !this.state.uPassword) {
          my.setState({
            isSignUp: true
          });
          console.log("ok");
          var data = {
            user_name: uName,
            pass_word: uPassword,
            email: uEmail,
            code_str: uCode,
            code_id: codeId
          };
          console.log(data, "注册参数");
          myInit = {
            method: "POST",
            body: (0, _stringify2.default)(data)
          };
          (0, _isomorphicFetch2.default)(Const.FETCH_URL.USER + "/users", myInit).then(function (res) {
            if (res.ok) {
              return res.json().then(function (data) {
                my.setState({
                  isSignUp: true
                });
                console.log(data);
                if (data.status == 0) {
                  my.setState({
                    notifications: {
                      message: "注册成功",
                      level: "success"
                    }
                  });
                  setTimeout(function () {
                    my.setState({
                      notifications: {
                        message: "",
                        level: ""
                      }
                    });
                    window.location.href = "/login";
                  }, 2000);
                } else {
                  my.changeImageSrc();
                  my.setState({
                    notifications: {
                      message: "注册失败:" + data.msg,
                      level: "danger"
                    },
                    isSignUp: true
                  });
                  setTimeout(function () {
                    my.setState({
                      notifications: {
                        message: "",
                        level: ""
                      }
                    });
                  }, 5000);
                }
              });
            } else {
              my.setState({
                isSignUp: true
              });
              console.log("is xxx");
            }
          });
        }
      }
    }, {
      key: 'changeUserName',
      value: function changeUserName() {
        var uName = _reactDom2.default.findDOMNode(this.refs.username).value,
            userTip = _reactDom2.default.findDOMNode(this.refs.userTip),
            nameRegExp = /^[a-zA-Z]+[a-zA-Z0-9_]*$/;
        if (uName.length < 6 && uName != "") {
          userTip.innerHTML = "用户名必须6位以上";
          this.setState({
            uName: true
          });
          return false;
        }
        if (!nameRegExp.test(uName) && uName != "") {
          userTip.innerHTML = "字母数字下划线组合,必须字母开头";
          this.setState({
            uName: true
          });
          return false;
        } else {
          this.setState({
            uName: false
          });
        }
      }
    }, {
      key: 'changeEmail',
      value: function changeEmail() {
        var uEmail = _reactDom2.default.findDOMNode(this.refs.email).value,
            emailTip = _reactDom2.default.findDOMNode(this.refs.emailTip),
            emailRegExp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!emailRegExp.test(uEmail) && uEmail != "") {
          emailTip.innerHTML = "邮箱格式不正确";
          this.setState({
            uEmail: true
          });
          return false;
        } else {
          this.setState({
            uEmail: false
          });
        }
      }
    }, {
      key: 'changePassword',
      value: function changePassword() {
        var uPassword = _reactDom2.default.findDOMNode(this.refs.password).value,
            passwordTip = _reactDom2.default.findDOMNode(this.refs.passwordTip);
        if (uPassword.length < 6 && uPassword != "") {
          passwordTip.innerHTML = "密码必须6位以上";
          this.setState({
            uPassword: true
          });
        } else {
          this.setState({
            uPassword: false
          });
        }
      }
    }, {
      key: 'changeCode',
      value: function changeCode() {
        var uCode = _reactDom2.default.findDOMNode(this.refs.code).value,
            codeTip = _reactDom2.default.findDOMNode(this.refs.codeTip);
        if (uCode.length != 4 && uCode != "") {
          codeTip.innerHTML = "请输入4位验证码";
          this.setState({
            uCode: true
          });
        } else {
          this.setState({
            uCode: false
          });
        }
      }
    }, {
      key: 'changeImageSrc',
      value: function changeImageSrc() {
        var img = _reactDom2.default.findDOMNode(this.refs.codeImg);
        img.src = "http://verify-code.boxlinker.com/code?uuid=" + _uuid2.default.v1();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _reactDom2.default.findDOMNode(this.refs.codeImg).src = "http://verify-code.boxlinker.com/code?uuid=" + _uuid2.default.v1();
        var me = this;
        document.onkeydown = function (e) {
          if (e.keyCode == 13) {
            me.signUp();
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var notification = this.state.notifications.message ? (0, _jsx3.default)(_Notification2.default, {
          show: true,
          obj: this.state.notifications
        }) : (0, _jsx3.default)(_Notification2.default, {
          show: false,
          obj: this.state.notifications
        });
        this.context.setTitle("注册");
        return (0, _jsx3.default)('div', {
          className: 'entryBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryHd'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'w1200 clearfix'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryHdLogo'
        }, void 0, _ref), _ref2)), (0, _jsx3.default)('div', {
          className: 'entryBd signUp'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryModel'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'entryFrom'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'entryItemBox'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryItem ' + (this.state.uName ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox icon-username'
        }, void 0, _react2.default.createElement('input', { onChange: this.changeUserName.bind(this),
          className: 'entryInput', ref: 'username', type: 'text', placeholder: '\u7528\u6237\u540D' })), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'userTip' },
          '\u7528\u6237\u540D\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryItem ' + (this.state.uEmail ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox icon-email'
        }, void 0, _react2.default.createElement('input', { onChange: this.changeEmail.bind(this),
          className: 'entryInput', ref: 'email', type: 'text', placeholder: '\u90AE\u7BB1' })), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'emailTip' },
          '\u90AE\u7BB1\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryItem ' + (this.state.uPassword ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox icon-mima'
        }, void 0, _react2.default.createElement('input', { onInput: this.changePassword.bind(this),
          className: 'entryInput', ref: 'password', type: 'password', placeholder: '\u5BC6\u7801' })), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'passwordTip' },
          '\u5BC6\u7801\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryItem entryItemCode ' + (this.state.uCode ? "entryItemError" : "")
        }, void 0, (0, _jsx3.default)('div', {
          className: 'entryInputBox  icon-mima'
        }, void 0, _react2.default.createElement('input', { onInput: this.changeCode.bind(this),
          className: 'entryInput', ref: 'code', type: 'text', placeholder: '\u9A8C\u8BC1\u7801' }), _react2.default.createElement('img', { ref: 'codeImg', onClick: this.changeImageSrc.bind(this), src: '' }), (0, _jsx3.default)('span', {
          className: 'icon-refresh',
          onClick: this.changeImageSrc.bind(this)
        }, void 0, ' ')), (0, _jsx3.default)('div', {
          className: 'entryTip'
        }, void 0, _react2.default.createElement(
          'p',
          { ref: 'codeTip' },
          '\u9A8C\u8BC1\u7801\u9519\u8BEF'
        ))), (0, _jsx3.default)('div', {
          className: 'entryBtnBox'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary entryBtn ' + (!this.state.isSignUp ? "btn-loading" : ""),
          disabled: !this.state.isSignUp,
          onClick: this.signUp.bind(this)
        }, void 0, this.state.isSignUp ? "注册" : "注册中...")), _ref5)))), _ref6, notification);
      }
    }]);
    return SignUp;
  }(_react2.default.Component);
  
  SignUp.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  exports.default = SignUp;

/***/ },
/* 202 */
/***/ function(module, exports) {

  module.exports = require("uuid");

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _UserCenterContainer = __webpack_require__(204);
  
  var _UserCenterContainer2 = _interopRequireDefault(_UserCenterContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_UserCenterContainer2.default, {});
  
  exports.default = {
    path: '/user',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserCenter = __webpack_require__(205);
  
  var _UserCenter2 = _interopRequireDefault(_UserCenter);
  
  var _reactRedux = __webpack_require__(51);
  
  var _breadcumb = __webpack_require__(93);
  
  var _building = __webpack_require__(113);
  
  var _BuildingCreateSelector = __webpack_require__(146);
  
  var _users = __webpack_require__(212);
  
  var funUser = _interopRequireWildcard(_users);
  
  var _organize = __webpack_require__(76);
  
  var funOrganize = _interopRequireWildcard(_organize);
  
  var _organizeListSelector = __webpack_require__(83);
  
  var _organizeListSelector2 = _interopRequireDefault(_organizeListSelector);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var getGithubAuthURL = (0, _BuildingCreateSelector.makeGetGithubAuthURLSelector)();
    var getOrganizeList = (0, _organizeListSelector2.default)();
    return {
      githubAuthURL: getGithubAuthURL(state),
      organizeList: getOrganizeList(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      getGithubAuthURL: function getGithubAuthURL() {
        dispatch((0, _building.fetchGithubAuthURLAction)());
      },
      onRevisePassword: function onRevisePassword(passwordObj) {
        dispatch(funUser.fetchRevisePasswordAction(passwordObj));
      },
      createOrganize: function createOrganize(org_name) {
        dispatch(funOrganize.fetchCreateOrganize(org_name));
      },
      getOrganizeList: function getOrganizeList() {
        dispatch(funOrganize.fetchGetOrganizeListAction());
      },
      leaveOrganize: function leaveOrganize(data) {
        dispatch(funOrganize.fetchLeaveOrganize(data));
      },
      deleteOrganize: function deleteOrganize(data) {
        dispatch(funOrganize.fetchDeleteOrganize(data));
      }
    };
  };
  
  var UserCenterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_UserCenter2.default);
  
  exports.default = UserCenterContainer;

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _GetPersonalInfo = __webpack_require__(206);
  
  var _GetPersonalInfo2 = _interopRequireDefault(_GetPersonalInfo);
  
  var _GetMyAccount = __webpack_require__(207);
  
  var _GetMyAccount2 = _interopRequireDefault(_GetMyAccount);
  
  var _GetAccountManage = __webpack_require__(208);
  
  var _GetAccountManage2 = _interopRequireDefault(_GetAccountManage);
  
  var _GetCertificateMange = __webpack_require__(210);
  
  var _GetCertificateMange2 = _interopRequireDefault(_GetCertificateMange);
  
  var _GetOrganize = __webpack_require__(211);
  
  var _GetOrganize2 = _interopRequireDefault(_GetOrganize);
  
  var _constants = __webpack_require__(38);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '个人中心';
  
  var _ref = (0, _jsx3.default)(_reactBootstrap.Tab, {
    eventKey: 2,
    title: '\u6211\u7684\u8D26\u6237'
  }, void 0, (0, _jsx3.default)(_GetMyAccount2.default, {}));
  
  var _ref2 = (0, _jsx3.default)(_reactBootstrap.Tab, {
    eventKey: 4,
    title: '\u793C\u5238\u7BA1\u7406'
  }, void 0, (0, _jsx3.default)(_GetCertificateMange2.default, {}));
  
  var UserCenter = function (_Component) {
    (0, _inherits3.default)(UserCenter, _Component);
  
    function UserCenter() {
      (0, _classCallCheck3.default)(this, UserCenter);
      return (0, _possibleConstructorReturn3.default)(this, (UserCenter.__proto__ || (0, _getPrototypeOf2.default)(UserCenter)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(UserCenter, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.getGithubAuthURL();
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.USER_CONTAINER);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        this.context.setTitle(title);
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'userTab'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tabs, {
          defaultActiveKey: 5,
          id: 'userTabs'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 1,
          title: '\u4E2A\u4EBA\u4FE1\u606F'
        }, void 0, (0, _jsx3.default)(_GetPersonalInfo2.default, {
          onRevisePassword: function onRevisePassword(passwordObj) {
            return _this2.props.onRevisePassword(passwordObj);
          }
        })), _ref, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 3,
          title: '\u8D26\u6237\u7BA1\u7406'
        }, void 0, (0, _jsx3.default)(_GetAccountManage2.default, {
          githubAuthURL: this.props.githubAuthURL
        })), _ref2, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 5,
          title: '\u7EC4\u7BA1\u7406'
        }, void 0, (0, _jsx3.default)(_GetOrganize2.default, {
          createOrganize: function createOrganize(org_name) {
            _this2.props.createOrganize(org_name);
          },
          getOrganizeList: function getOrganizeList() {
            _this2.props.getOrganizeList();
          },
          organizeList: this.props.organizeList,
          leaveOrganize: function leaveOrganize(id) {
            return _this2.props.leaveOrganize(id);
          },
          deleteOrganize: function deleteOrganize(id) {
            return _this2.props.deleteOrganize(id);
          }
        })))));
      }
    }]);
    return UserCenter;
  }(_react.Component);
  
  UserCenter.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  exports.default = UserCenter;

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('div', {
    className: 'userItem'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u4E2A\u4EBA\u5934\u50CF',
    titleEnglish: '',
    titleInfo: 'PERSONAL HEAD'
  }), (0, _jsx3.default)('div', {
    className: 'userHead'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'userHeadBox'
  }, void 0, (0, _jsx3.default)('img', {})), (0, _jsx3.default)('div', {
    className: 'choose icon-operation'
  }, void 0, (0, _jsx3.default)('span', {}, void 0, '\u66F4\u6539\u5934\u50CF'))));
  
  var _ref2 = (0, _jsx3.default)('div', {
    className: 'userItem'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7ED1\u5B9A\u624B\u673A',
    titleEnglish: '',
    titleInfo: 'BINDING CELLPHONE'
  }), (0, _jsx3.default)('div', {
    className: 'userPhone'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'userInputItem'
  }, void 0, (0, _jsx3.default)('input', {
    type: 'text',
    className: 'form-control'
  }), (0, _jsx3.default)('i', {
    className: 'userTip'
  }, void 0, '\u7ED1\u5B9A\u624B\u673A\u53F7\u53EF\u63A5\u53D7\u7CFB\u7EDF\u91CD\u8981\u901A\u77E5')), (0, _jsx3.default)('div', {
    className: 'userInputItem'
  }, void 0, (0, _jsx3.default)('input', {
    type: 'text',
    className: 'form-control userInputLittle'
  }), (0, _jsx3.default)('button', {
    className: 'userButtonLittle'
  }, void 0, '\u77ED\u4FE1\u9A8C\u8BC1\u7801')), (0, _jsx3.default)('div', {
    className: 'userInputItem'
  }, void 0, (0, _jsx3.default)('button', {
    className: 'btn btn-warning'
  }, void 0, '\u7ED1\u5B9A'))));
  
  var _ref3 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u4FEE\u6539\u5BC6\u7801',
    titleEnglish: '',
    titleInfo: 'MODIFY PASSWORD'
  });
  
  var GetPersonalInfo = function (_Component) {
    (0, _inherits3.default)(GetPersonalInfo, _Component);
  
    function GetPersonalInfo(props) {
      (0, _classCallCheck3.default)(this, GetPersonalInfo);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (GetPersonalInfo.__proto__ || (0, _getPrototypeOf2.default)(GetPersonalInfo)).call(this, props));
  
      _this.state = {
        oldP: false,
        newP: false,
        newAgain: false,
        notifications: { message: "" }
      };
      return _this;
    }
  
    (0, _createClass3.default)(GetPersonalInfo, [{
      key: 'revisePassword',
      value: function revisePassword() {
        var old_p = _reactDom2.default.findDOMNode(this.refs.old_p),
            oldTip = _reactDom2.default.findDOMNode(this.refs.oldTip),
            new_p = _reactDom2.default.findDOMNode(this.refs.new_p),
            newTip = _reactDom2.default.findDOMNode(this.refs.newTip),
            new_p_again = _reactDom2.default.findDOMNode(this.refs.new_p_again),
            newTipAgain = _reactDom2.default.findDOMNode(this.refs.newTipAgain);
        if (old_p.value == "") {
          this.setState({
            oldP: true
          });
          oldTip.innerHTML = "原始密码不能为空";
          return false;
        }
        if (new_p.value == "") {
          this.setState({
            newP: true
          });
          newTip.innerHTML = "新密码不能为空";
          return false;
        }
        if (new_p_again.value == "") {
          this.setState({
            newAgain: true
          });
          newTipAgain.innerHTML = "确认新密码不能为空";
          return false;
        }
        if (new_p_again.value != new_p.value) {
          this.setState({
            newAgain: true
          });
          newTipAgain.innerHTML = "两次新密码不一致";
          return false;
        }
        var passwordObj = {
          old_p: old_p.value,
          new_p: new_p.value
        };
        console.log(passwordObj);
        this.props.onRevisePassword(passwordObj);
      }
    }, {
      key: 'changeOldPassword',
      value: function changeOldPassword() {
        var old_p = _reactDom2.default.findDOMNode(this.refs.old_p);
        if (old_p.value.length > 0) {
          this.setState({
            oldP: false
          });
        }
      }
    }, {
      key: 'changeNewPassword',
      value: function changeNewPassword() {
        var new_p = _reactDom2.default.findDOMNode(this.refs.new_p);
        var newTip = _reactDom2.default.findDOMNode(this.refs.newTip);
        if (new_p.value.length < 6 && new_p.value.length != "") {
          newTip.innerHTML = "密码不能少于6位";
          this.setState({
            newP: true
          });
        } else {
          this.setState({
            newP: false
          });
        }
      }
    }, {
      key: 'changeNewAgainPassword',
      value: function changeNewAgainPassword() {
        var new_p_again = _reactDom2.default.findDOMNode(this.refs.new_p_again);
        var newTipAgain = _reactDom2.default.findDOMNode(this.refs.newTipAgain);
        if (new_p_again.value.length < 6 && new_p_again.value.length != "") {
          newTipAgain.innerHTML = "密码不能少于6位";
          this.setState({
            newAgain: true
          });
        } else {
          this.setState({
            newAgain: false
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: 'userTabBox'
        }, void 0, _ref, _ref2, (0, _jsx3.default)('div', {
          className: 'userItem'
        }, void 0, _ref3, (0, _jsx3.default)('div', {
          className: 'userPhone'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'userInputItem ' + (this.state.oldP ? "userInputItemError" : "")
        }, void 0, _react2.default.createElement('input', { onChange: this.changeOldPassword.bind(this), type: 'password', className: 'form-control', ref: 'old_p', placeholder: '\u539F\u59CB\u5BC6\u7801' }), _react2.default.createElement(
          'i',
          { className: 'userTip', ref: 'oldTip' },
          ' '
        )), (0, _jsx3.default)('div', {
          className: 'userInputItem ' + (this.state.newP ? "userInputItemError" : "")
        }, void 0, _react2.default.createElement('input', { onChange: this.changeNewPassword.bind(this), type: 'password', className: 'form-control', ref: 'new_p', placeholder: '\u65B0\u5BC6\u7801' }), _react2.default.createElement(
          'i',
          { className: 'userTip', ref: 'newTip' },
          ' '
        )), (0, _jsx3.default)('div', {
          className: 'userInputItem ' + (this.state.newAgain ? "userInputItemError" : "")
        }, void 0, _react2.default.createElement('input', { onChange: this.changeNewAgainPassword.bind(this), type: 'password', className: 'form-control', ref: 'new_p_again', placeholder: '\u786E\u8BA4\u65B0\u5BC6\u7801' }), _react2.default.createElement(
          'i',
          { className: 'userTip', ref: 'newTipAgain' },
          ' '
        )), (0, _jsx3.default)('div', {
          className: 'userInputItem'
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-warning',
          onClick: this.revisePassword.bind(this)
        }, void 0, '\u786E\u5B9A')))));
      }
    }]);
    return GetPersonalInfo;
  }(_react.Component);
  
  exports.default = GetPersonalInfo;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('img', {
    className: 'mediaImg',
    src: '/slImgJx.png'
  });
  
  var _ref2 = (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
    className: 'tablePaddingLeft'
  }, void 0, (0, _jsx3.default)('span', {
    className: 'icon-right'
  })));
  
  var _ref3 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u670D\u52A1\u540D\u79F0'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u7C7B\u578B'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u65F6\u95F4'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u91D1\u989D'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u6263\u6B3E\u65B9\u5F0F'), (0, _jsx3.default)('th', {
    width: '10%'
  }, void 0, '\u662F\u5426\u5B8C\u6210'), (0, _jsx3.default)('th', {
    width: '15%'
  }, void 0, '\u5355\u53F7')));
  
  var _ref4 = (0, _jsx3.default)('div', {
    className: 'userItem accountBg'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'accountHd clearfix'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'left'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u8D26\u6237\u4F59\u989D',
    titleEnglish: '',
    titleInfo: 'ACCOUNT BALANCE'
  })), (0, _jsx3.default)('div', {
    className: 'right userHeadTip'
  }, void 0, '  \u5173\u6CE8\u5FAE\u4FE1\u516C\u4F17\u53F7\uFF0C\u5E73\u53F0\u514D\u8D39\u4E3A\u60A8\u63D0\u4F9B3\u4E2A\u6708\u7684\u8D26\u6237\u8BD5\u7528\u5956\u52B1\u3002 ')), (0, _jsx3.default)('div', {
    className: 'accountBd'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'accountItem'
  }, void 0, (0, _jsx3.default)('span', {
    className: 'aiName'
  }, void 0, '\u8D26\u6237\u4F59\u989D :'), (0, _jsx3.default)('span', {
    className: 'aiInfo'
  }, void 0, (0, _jsx3.default)('i', {}, void 0, '-1550'), ' \u5143')), (0, _jsx3.default)('div', {
    className: 'accountItem'
  }, void 0, (0, _jsx3.default)('span', {
    className: 'aiName'
  }, void 0, '\u652F\u4ED8\u91D1\u989D :'), (0, _jsx3.default)('span', {
    className: 'aiInfo'
  }, void 0, (0, _jsx3.default)('input', {
    type: 'number',
    className: 'form-control'
  }), ' \u5143')), (0, _jsx3.default)('div', {
    className: 'accountItem'
  }, void 0, (0, _jsx3.default)('span', {
    className: 'aiName'
  }, void 0, '\u652F\u4ED8\u65B9\u5F0F :'), (0, _jsx3.default)('span', {
    className: 'aiInfo'
  }, void 0, (0, _jsx3.default)('a', {
    href: 'javascript:;',
    className: 'accountPay accountPayZfb active'
  }, void 0, ' '), (0, _jsx3.default)('a', {
    href: 'javascript:;',
    className: 'accountPay accountPayWx'
  }, void 0, ' ')))), (0, _jsx3.default)('div', {
    className: 'accountFt clearfix'
  }, void 0, (0, _jsx3.default)('button', {
    className: 'btn btn-danger'
  }, void 0, '\u5145\u503C'), (0, _jsx3.default)('div', {
    className: 'accountFtTip right'
  }, void 0, (0, _jsx3.default)('p', {}, void 0, ' \u63D0\u793A\uFF1A\u7D2F\u8BA1\u5145\u503C\u91D1\u989D\u6EE1', (0, _jsx3.default)('span', {}, void 0, '\uFFE5200'), '\u540E\u53EF\u63D0\u4EA4\u5DE5\u5355\u7533\u8BF7\u53D1\u7968\u3002'), (0, _jsx3.default)('a', {
    href: 'javascript:;'
  }, void 0, ' '))));
  
  var _ref5 = (0, _jsx3.default)('div', {
    className: 'accountHd clearfix'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'left'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u5145\u503C\u8BB0\u5F55',
    titleEnglish: '',
    titleInfo: 'RECHARGE RECORD'
  })), (0, _jsx3.default)('div', {
    className: 'right userHeadTip'
  }, void 0, '\u63D0\u793A\uFF1A\u4EC5\u663E\u793A\u6700\u8FD15\u7B14\u4EA4\u6613\uFF0C\u5982\u9700\u4E86\u89E3\u5168\u90E8\u8BB0\u5F55\u8BF7\u63D0\u4EA4 \u5DE5\u5355\uFF0C\u6211\u4EEC\u4F1A\u572824\u5C0F\u65F6\u5185\u53D1\u9001\u60A8\u90AE\u7BB1'));
  
  var GetMyAccount = function (_Component) {
    (0, _inherits3.default)(GetMyAccount, _Component);
  
    function GetMyAccount() {
      (0, _classCallCheck3.default)(this, GetMyAccount);
      return (0, _possibleConstructorReturn3.default)(this, (GetMyAccount.__proto__ || (0, _getPrototypeOf2.default)(GetMyAccount)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetMyAccount, [{
      key: 'getTableBody',
      value: function getTableBody() {
        var data = [{ name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }];
        return data.map(function (item, i) {
          return (0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'tablePaddingLeft'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'mediaItem'
          }, void 0, _ref, (0, _jsx3.default)('span', {
            className: 'mediaTxt'
          }, void 0, item.name)))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'tablePaddingLeft'
          }, void 0, (0, _jsx3.default)('span', {
            className: 'color333'
          }, void 0, item.type))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'tablePaddingLeft'
          }, void 0, (0, _jsx3.default)('span', {
            className: 'color333'
          }, void 0, item.time))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'tablePaddingLeft'
          }, void 0, (0, _jsx3.default)('span', {
            className: 'color333'
          }, void 0, item.money))), (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'tablePaddingLeft'
          }, void 0, (0, _jsx3.default)('span', {
            className: 'color333'
          }, void 0, item.way))), _ref2, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'tablePaddingLeft'
          }, void 0, (0, _jsx3.default)('span', {
            className: 'color333'
          }, void 0, item.odd))));
        });
      }
    }, {
      key: 'getDemoTable',
      value: function getDemoTable() {
        return (0, _jsx3.default)('table', {
          className: 'table recordTable'
        }, void 0, _ref3, (0, _jsx3.default)('tbody', {}, void 0, this.getTableBody()));
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: 'userTabBox'
        }, void 0, _ref4, (0, _jsx3.default)('div', {
          className: 'userItem'
        }, void 0, _ref5, (0, _jsx3.default)('div', {
          className: 'userPayRecord'
        }, void 0, this.getDemoTable())));
      }
    }]);
    return GetMyAccount;
  }(_react.Component);
  
  exports.default = GetMyAccount;

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('div', {
    className: 'accountManageHd'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u8D26\u53F7\u7BA1\u7406',
    titleEnglish: '',
    titleInfo: 'ACCOUNT MANAGEMENT'
  }));
  
  var _ref2 = (0, _jsx3.default)('div', {
    className: 'ambInfo'
  }, void 0, (0, _jsx3.default)('h1', {}, void 0, 'Github'), (0, _jsx3.default)('p', {}, void 0, 'Github\u4E8E2008\u5E74\u4E0A\u7EBF\uFF0C\u7528\u4E8EGit\u4EE3\u7801\u4ED3\u5E93\u6258\u7BA1\u53CA\u57FA\u672C\u7684Web\u7BA1\u7406\u754C\u9762'));
  
  var GetAccountManage = function (_Component) {
    (0, _inherits3.default)(GetAccountManage, _Component);
  
    function GetAccountManage() {
      (0, _classCallCheck3.default)(this, GetAccountManage);
      return (0, _possibleConstructorReturn3.default)(this, (GetAccountManage.__proto__ || (0, _getPrototypeOf2.default)(GetAccountManage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetAccountManage, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'render',
      value: function render() {
        var user = this.context.store.getState().user_info;
        return (0, _jsx3.default)('div', {
          className: 'userTabBox'
        }, void 0, _ref, (0, _jsx3.default)('div', {
          className: 'accountManageItem'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'accountManageBox icon-github'
        }, void 0, (0, _jsx3.default)('img', {
          width: 60,
          height: 60,
          src: __webpack_require__(209),
          alt: 'img'
        }), _ref2), (0, _jsx3.default)('a', {
          href: user.github ? "javascript:;" : this.props.githubAuthURL,
          target: '_blank',
          className: 'btn btn-warning',
          disabled: user.github
        }, void 0, user.github ? "已绑定" : "绑定")));
      }
    }]);
    return GetAccountManage;
  }(_react.Component);
  
  GetAccountManage.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  exports.default = GetAccountManage;

/***/ },
/* 209 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmIzYTA5MS1mZTUwLTRkOGMtOGQ1NS1kYTcxMDUyYjdkMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Q0OTkxN0E2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Q0OTkxNzk2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphOThjNzgzOS1kYWE3LTQ3ZjgtODAzOS1jMzc0ZmIzYmI1ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTZiM2EwOTEtZmU1MC00ZDhjLThkNTUtZGE3MTA1MmI3ZDI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QujMrwAAEShJREFUeNoklwlwW9d1hu/b38PDvpAgQJAgARLcRdGUSEvULtoj2+NFdSUnTpzVcTqx04xqx0mbpO2kiVuntptmJq63xHXqZOptbMmSFduSbUqyJEoiKYukxJ0ECBD79vD2rVcpBjPA4A3uufec/57/O4hpmqV0/B8effTCx59u6qyP9odeeumTNR384blHBpyOyeNnTZIcR0sffHT1W4ObhvcMapJiwclaMpPJVSRNRRHU5rQ7vQ4Uw6UaTyCApdnrawlRqp5b2njjagYA8N+//nY00pktg46QVcccgc59LrcXEbnc8Zd+duTI83fu7fF1ugRO2dzT72moy01N5T+dcfaGUYJ5dfzK9pHub23biaPoeialKEYqkayVeBtDYhimKKqpqHarRdK0hXQhGvQVKrVkoex3EZdWMq9dSu24JfjDxw9fnY+7rZTL7saopgN3fw2vxC9m19MNTqs/4vIG/Y3WoKvBd+HdY34V7/nyqI+xrYpXHefTYa5DUqW15LpY4RDUxFFDR6RSVbNZGYCiMoryGgAIYiXxM7OLODAZhlYUent7c7bInbySvHd+ZaivV+P1pUwi6Eme+uhFVOdz8ZV0uM3vaw70tXSUeP4XTz5tqahbDo5aFGXuwuUC8Ox75MskyybOX+AW1tR4lspxUo4zaiaBAVM3EcS0kDRBIjRBRJvqBlsaw/UNGADrhY10gfvy7sFGAJ5//RyOoSiGRgMh3TBZYOJA1+eXkwDVtar8yceXfvXKyVd/eF9XX++1sfHZU+eGnvm322+7DVHNZGrl8/96JtrThKOYmi83IuhGhccU1QJQXpQMUwMGShKUrmk1iadxgiUJ3WSz1bIOtK+PRE+tZhYT61VJ3BJul2S8UitgdoUb//zqnYe2yaLy5vHxfS3uA9u2TF2crKXWAw8e3H7wXm49IdWKGGNdWV7sbg51bepBGYuVZZ1WhkIMRREFUTPhCTCcwDCSpHNlbmY9meNLmqoF3V5eUVVENCuSNejx+N0UgrtsjumlWXzq4sxXH7vXHWmcPTvT3ujc0xFJrG2oKEojwOv0M4ylqmqMhZVV9fPTn9A3GvA9u1OZtFLlDNUgEFORDRxDdAOKFyEIJFeqMCTZ4mkoCTXT1DYqJStFaSilySLCcQxtX9lI9kXavC4v9rdH7mno6ipXax4L2+WwuRiqwokkhlM4lcrFiXBbpD1qGubrL7z07u9O9fUGM+sJXhKZeq/FabfQsMigVIExYK1NeHBZVVYz+Y1yRZB5WHaWosuCkOE4VeFJigj1dUmiAEsTCTTj7tZIqVjEUSTg82iFWiVfZAN+XRIkgNgr3AdPHDm/d//yF5NHXzv72O3t/YEQ6rBYaLq8lkzmK1WoLHjbaJIgMVXXVU0Puj11bmeFl/LF7MR6AjNxv92FYchCtTB1ebFzT9rh8RQLhfnkGnbn7VsIgpSFmjCzRAiauzvCBv2Spoc6mm0EETQBNznJyNKj33/g7sMHm4f66ttaAUlpiqIgmIwhNENSJMKLoiqrqKEpKpSKhhgGTVlkycARE8Ogbk2X3ZZYq3j8lkA0oiuiZhg4AcMS+NhHl25h7aDOKxqIx+HAVTU3s2jqiD3S1tzVXqzkZ+fmv5iZRmi0nONKhYrLTmmqIfN8rVrDEAoBgKZp1kJGmkOqrH8yPaNpGrw+KGoYnGkYIBpsDPk20sl0LzA1HVCwlqzVfvbYybHPro5++6Az6AckUVpZk/Mc5ferLHl5ZpI1gc1AbR6vq96JaBoVwkmLlU/na/lSY7iJtjskHeqKhMXGCZwrVRauL9dZQqYqybDgQFyppSs8PLxc1VS3CjdhwMzDHOCVVOrK+FxbU9DrdaMGJlf4Klcp6qqZLlokoQ21dsTabQ47zlgFQ5dkmEu+LFXzZrlg0/JCDlM3+HyWL3FQaA4rwtV42dBaeygG6qCkLcxJmAYoDFTFmiIC1BCBYaAIZgAdV8s1imZjPhdAiclr10xSozHKFOW2UNBTH+YkaSG1Id24YUiVEi/UcAMD8gtH52/b4xndGRAFhQRouNUa9Pk9dvZGsjx9w8xw4kpGMDCxO2p74Js9mcVyKS78x0eL1wpqzFlHEaCGoYim4zhGEdTNjpOt5stimeJhreyM1b1eFj6cnJ1JljZyvIaAO/cH77urOdIYQAi/J/LBxfF4vSs8tDNULolOC7mWL7/69vyrxxLTmXyQZrd0s6Kkv300v2cHf3hfIBxETEMF1nBs5Et8Yc7jcpc5DLv/wLZEKtPAss3+BhS1tfR2lg25YqSTXO7SQj7SYh3Y5KUJ8Keja/EVnSaxwc6mgd27OuqRsxdmdIB5bfhSNv+jZy/++uhCkwv93v2h+w74RobqRnfW793m++J6cTXBbW53XpjKrOWLodaWs+fmq6kbg1v7sW8c2kdRVHo9TeMYT2rJYuLtd4/b3Wi2aO2N2h86NLBnODa8uakzavlwbP75E/PrMzNb+1qaWgZwkNN1yWZhjp9dfedk7rZea6QZpPLKK2+tvXAs+c6x+K097Df+uifLi4SAXFutLRWlicuTiysb49NpLrWMHb5jRBTltURW1KRz4+eOnVwM1wHWE6t3UQ9/5ZZ0rvrSq5++/valXC6bylS2trmurqBqcXZk9x4NYR1oNs8by0nOAdRCsbQmeI+Pb3AqCHg8eVE8fqGwvcXS0+1Px7mz1/Mp+ODm62Z3nYtz6NWJ6yJX23/Xrt6RW8PhWCQAbA6XnSEePNi/Fi888fOPf/v+0pmZytgEl82DxfnCoQMuymHkizWcdEEBw2zHImyxmPOF65/+yVfpv6z93cPDpjH28P07H3l6Sq1KdfV0rQbtGliJm0/rPM6HHv4men58Zmjb1q39PXKNJzHE0EG+rG7e1CCIwtQc9/3HHmp3AR2A/3z27zLmzMDQpqMf3hgaaIGgYwIMGBiK45WCWE7JX7q7jZNE6S+BP/t8BiDM3u0DHhcxey2FmoYsy/CXWBRaM+CqNZ+LQUdvHx7Z3itL0okT52ysDScQXQcBv/fUqUs7YA6a6q+XAFxuamIKCMX2WFMkGlZlQOGIoinQkSicNHVsqKO+lEhRGD8UjgzbwJWp1RC+5Ze/+sNTP95LGoZQ1opwCYpsibTCwKKq/en53+Iet4sr8haWcTkZHdUdrN3qtmq6EQwH7QQH8EB/nbUraP/s5Fjklf3tfR3P/fR+vjxblWBUFL4RE1jrbaFO9+p0wd28/J2/GTr/HrjdCc5M5+872BJwa7KNgF5VhgExxOW0w8/uZhds6thQW9Dp80F4mLh81emgOY4PBpzN4XqGtWWyie5I2NfUklwvNPgCkgmOfO/W/haHpOIGwsJeptZWUYyu8AJlpzXOSK0lXW4+ELYAxtg67G0J2SVRxK32bKL259mC1eVscLM3FuJtrcHl5QyumEi1UoVSW1xaGdlxEFp6YnnBzToZCzq9XL409flALOL37knEVx54sK3Fx2zwdk0vmpqAai5NQywkhgKMZMnoraH8SqGSr1mcdGPAouu4JnK4zUk6mhPp6/CgfLF8+sSZaKvf53VVNIB6nc5ildc0w+e08YJEUAxENBPBW4PhehvDS8r1hVk7XrxtS0PQZZWIKGRN3Cj6Gjpo2qKbKuQNj9MmiIpi6t5WT0trwGv30KTdQWnQMQ33LjVXmFrIw8CmJnX0Re6688B7H13ubWTQvk09xUIxXygCAmNZi83mMglHhSupuC0S3RoLNjT5PKipcYrNdA1DrMytX5tOaqlUSlf45sgITtIzN1YXZtKqZGqaCXEAwaAJcDhjlwMPbExOx698dv5mXDA6HNt/xx1vvvT7He30z556BFd1I76caGoM1bncOEb6fHar3Te/EI/FqvZAO2bxwJ1CGWGUy0BQsTRX5/ZxSu6t15+1Opyxvq6ZL64X5oUdo1GH08JVBBhA1wSCwPT60dXxi+b0sSzik7Ry/6buAwfvfvKHTw2GsSP//Jgi6/iZz85CRsRwXJA0nMS4qmS3Mpev5qPRKzEoIV+zKNJAl9VqRuHjqswRCBJrcA5/7ztLefvTv/ydgmFL08VYF+8P2FUrI9UkzCii3tGlqdna+f8N9bY/+9o83M09e3ufeeZFFoCHvjEKELxYKqK5dIWiGRxHaRJnaIuv3ldXb19YzS4tZBOrE4X4NQbwmgAdd0GXKgj0adNs69uvM73//uujm7od//LjBwd27fzFi9PH35jFFZ1mAG4NFEpGZfLjUHfk3ExlidNxxrGeLCQzhaE92xTUCk0dohq6ZXufqWhAN2xum6GbmqFbaIvX7ZpbE9IVZGXli6X5y4QpM7TVRGmAmq2x4XfOJP2Dh4zyxHe+Ntpky/30u92PPbb/hVPlt/44TaMKoN1cOm+lzMW08vLZFDyujTLm1m5+EUUDtYZNqSitjaFut5sXeRUKw0AU3Shm8jiJW20MRRKTE/Ga7klmUovL1ykILMD0uhumV6pPPvFPTz3U+veP37O8kri2lNVqyUfuDb/83MH1ijWfEWGRsY050QT/M5aWYIfG6KADTSzdTPjYhQtnzl3neVkVK2ilVGVIJpvJYChs4bCpKqogwDnFU+dQRfHDk1c1vGlmKT2zNGelGYrAT7x/4ruHO3/0xKPuxpGGxlhba4ygnYVydXePZddIQ65okpBVCvm3J8pzBQli2K1D/dlsZS3//9YEDmyv27Rl0IDUWC3XcAzLpDasrAUBaKksorpEYRBVdZfLms0VT5+asNgbEYsXko+hCk0BNhoJVjWfo64tV1h74913ltdzNGFNF4reAKjzOfJr1Tcvpc/HZRhm347BjfkbWfFmyD09AX79va//4Kcsou7r8sAJDnF57KU8x/OC3WqrVAWCpZ1OplqtwavR0uxfnrvx0Xt/ljUP7o7kaurmDo/LiW4kV9wO/NqS9oPfTFU5sa7JLRtoV2udVBT/8eXpC6mbLtXZ0UnIxUS+TDHYEw/vPX3thCW47+P3/1i7+FpFo+CojZIUo5sGSyA4jthsDgyT/A2W+GqKQSEfSvU+F2bwz/3imbv+6p7O3k6tJoZ8rYGAH5jS+lqunXV9PLaQzacxgOVW8899sFwW4RQKHI2Nm3tDk8tX+u/dva+z5aknvwnt6fTx58wrr7hamz65IuKGoVSLQq4gC4JB4qjTabs+NdcaiznczlopBwEYBbo/4Bdk6eXfvN7d27T9ttGq5njz/TehRFYWEtuHWjfS/BsnL/MAQCXhQW+TzPFl2ULBrd9oiHYX8vKt3U2og07nEuXEtV2x0IUsgHiJbh7saukItEU8Dhuxtr4RagpilJUr5D0eN4ITqqKSBMELIklZBoZbBXHjzyfe27xzp7eh8f23PnXXuVRD83mYvgAerSdiIx1BG41rBrTMdCqBAJlgPXql1FJPV4tFoSy09Awf+f38ic9T4UYPyrgCBCHfMdoFXX/s1BU4dPj8/rX4eqVYJBkGlhknSA3ecw1AlrezVkM1VQx7/F9/cujQ7tWFJZpG+apQlTWmvd2Cs7qqGghgCQxOU3Z3ncPOpHM5UcYEAcRXE32b+/1dO4uZTGv3KBrZPGqYFCQev68Osv6lMxOhQENLNFLOFVEThWhDEagiyoyNLOULLMHghPXi2HmA+Qf37BpfLXVu7mUpM6mBxkhLoM5pofFcVYUznwlAoVhVahWZYs9NTahCOpmKz61kvvKle3u7OtoGD6EWm3v/A487GzrrPe6vfOs+BI7rU9OmgcF/CjyPEdjG+sbAts37Dx4ONwSGRrYObR84/ck5AEo+rxveGLw+0H9LDBIVnFlIknK5WEGHcAMirR6OpvOZAkoQL756+uL5yzB/Fy9etvkaH/35O6zd938CDAB5qvlrJja8DwAAAABJRU5ErkJggg=="

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('div', {
    className: 'userTabBox'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'certificateMangeItem'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'accountHd clearfix'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'left'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u6211\u7684\u793C\u5238',
    titleEnglish: '',
    titleInfo: 'MY CERTIFICATE'
  })), (0, _jsx3.default)('div', {
    className: 'right userHeadTip redTip'
  }, void 0, '\u63D0\u793A\uFF1A\u793C\u5238\u5728\u6FC0\u6D3B\u540E\u624D\u53EF\u4F7F\u7528\u3002')), (0, _jsx3.default)('div', {
    className: 'userInputItem'
  }, void 0, (0, _jsx3.default)('input', {
    type: 'text',
    className: 'form-control',
    placeholder: '\u8BF7\u8F93\u5165\u793C\u5238\u516B\u4F4D\u7801'
  }), (0, _jsx3.default)('br', {}), (0, _jsx3.default)('button', {
    className: 'btn btn-danger'
  }, void 0, '\u6FC0\u6D3B'))));
  
  var GetCertificateMange = function (_Component) {
    (0, _inherits3.default)(GetCertificateMange, _Component);
  
    function GetCertificateMange() {
      (0, _classCallCheck3.default)(this, GetCertificateMange);
      return (0, _possibleConstructorReturn3.default)(this, (GetCertificateMange.__proto__ || (0, _getPrototypeOf2.default)(GetCertificateMange)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetCertificateMange, [{
      key: 'render',
      value: function render() {
        return _ref;
      }
    }]);
    return GetCertificateMange;
  }(_react.Component);
  
  exports.default = GetCertificateMange;

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends2 = __webpack_require__(37);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(112);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref2 = (0, _jsx3.default)('img', {
      className: 'mediaImg',
      src: '/slImgJx.png'
  });
  
  var _ref3 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
      width: '25%'
  }, void 0, '\u7EC4\u7EC7\u540D\u79F0'), (0, _jsx3.default)('th', {
      width: '25%'
  }, void 0, '\u7EC4\u7EC7\u7B80\u4ECB'), (0, _jsx3.default)('th', {
      width: '25%'
  }, void 0, '\u7EC4\u7EC7\u6743\u9650'), (0, _jsx3.default)('th', {
      width: '25%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref4 = (0, _jsx3.default)('div', {
      className: 'left'
  }, void 0, (0, _jsx3.default)(_HeadLine2.default, {
      title: '\u6211\u7684\u7EC4\u7EC7',
      titleEnglish: 'MY ORGANIZE',
      titleInfo: '\u6240\u6709\u6211\u52A0\u5165\u7684\u7EC4\u7EC7\u7684\u5217\u8868'
  }));
  
  var _ref5 = (0, _jsx3.default)('div', {
      className: 'hbPlus left'
  });
  
  var _ref6 = (0, _jsx3.default)('div', {
      className: 'hbPlusInfo left'
  }, void 0, (0, _jsx3.default)('p', {
      className: 'hbPName'
  }, void 0, '\u65B0\u5EFA\u7EC4\u7EC7'), (0, _jsx3.default)('p', {
      className: 'hbPInfo'
  }, void 0, 'Create Organize'));
  
  var GetOrganize = function (_Component) {
      (0, _inherits3.default)(GetOrganize, _Component);
  
      function GetOrganize() {
          (0, _classCallCheck3.default)(this, GetOrganize);
  
          var _this = (0, _possibleConstructorReturn3.default)(this, (GetOrganize.__proto__ || (0, _getPrototypeOf2.default)(GetOrganize)).call(this));
  
          _this.state = {
              orgData: {
                  orgId: "",
                  ketList: ""
              }
          };
          return _this;
      }
  
      (0, _createClass3.default)(GetOrganize, [{
          key: 'createOrganize',
          value: function createOrganize(org_name) {
              this.props.createOrganize(org_name);
              this.refs.createOrgModel.hide();
          }
      }, {
          key: 'leaveOrganize',
          value: function leaveOrganize(id) {
              this.setState({
                  orgData: {
                      orgId: id,
                      keyList: "orgList"
                  }
              });
              this.refs.confirmModalLeave.open();
          }
      }, {
          key: 'deleteOrganize',
          value: function deleteOrganize(id) {
              this.setState({
                  orgData: {
                      orgId: id,
                      keyList: "orgList"
                  }
              });
              this.refs.confirmModalDelete.open();
          }
      }, {
          key: 'getOrganizeBody',
          value: function getOrganizeBody() {
              var _this2 = this;
  
              var data = this.props.organizeList;
              var user_name = this.context.store.getState().user_info.user_name;
              if (data[0] == 1) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
                  colSpan: '5',
                  style: { textAlign: "center" }
              }, void 0, _ref));
              if (data.length == 1 && data[0].orga_name == user_name) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
                  colSpan: '5',
                  style: { textAlign: "center" }
              }, void 0, '\u6682\u65E0\u6570\u636E~'));
              var role = "";
              return data.map(function (item, i) {
                  if (item.orga_name == user_name) return false;
                  var opt = (0, _jsx3.default)('button', {
                      className: 'btn btn-danger',
                      onClick: _this2.leaveOrganize.bind(_this2, item.org_id)
                  }, void 0, '\u9000\u51FA\u7EC4\u7EC7');
                  switch (Number(item.role)) {
                      case 200:
                          role = "组织拥有者";
                          opt = (0, _jsx3.default)('button', {
                              className: 'btn btn-danger',
                              onClick: _this2.deleteOrganize.bind(_this2, item.org_id)
                          }, void 0, '\u89E3\u6563\u7EC4\u7EC7');
                          break;
                      case 210:
                          role = "管理员";
                          break;
                      case 400:
                          role = "成员";
                          break;
                      default:
                          role = "成员";
                  }
                  return (0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
                      className: 'mediaItem'
                  }, void 0, _ref2, (0, _jsx3.default)('span', {
                      className: 'mediaTxt'
                  }, void 0, item.orga_name))), (0, _jsx3.default)('td', {}, void 0, item.org_detail || "暂无简介"), (0, _jsx3.default)('td', {}, void 0, role), (0, _jsx3.default)('td', {}, void 0, opt));
              });
          }
      }, {
          key: 'getTableDemo',
          value: function getTableDemo() {
              return (0, _jsx3.default)('table', {
                  className: 'table table-hover table-bordered'
              }, void 0, _ref3, (0, _jsx3.default)('tbody', {}, void 0, this.getOrganizeBody()));
          }
      }, {
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.props.getOrganizeList();
          }
      }, {
          key: 'componentWillMount',
          value: function componentWillMount() {
              var is_user = this.context.store.getState().user_info.is_user;
              console.log(",,,.", is_user);
              if (is_user == 0) {
                  console.log("sss");
                  this.context.store.dispatch((0, _route.navigate)("/"));
              }
          }
      }, {
          key: 'render',
          value: function render() {
              var _this3 = this;
  
              return (0, _jsx3.default)('div', {
                  className: 'organize'
              }, void 0, (0, _jsx3.default)('div', {
                  className: 'organizeHd hbHd clearfix'
              }, void 0, _ref4, (0, _jsx3.default)('div', {
                  className: 'hbAdd right'
              }, void 0, (0, _jsx3.default)('div', {
                  className: 'hbAddBtn clearfix',
                  onClick: function onClick() {
                      _this3.refs.createOrgModel.open();
                  }
              }, void 0, _ref5, _ref6))), (0, _jsx3.default)('div', {
                  className: 'organizeBd sl-bd TableTextLeft'
              }, void 0, this.getTableDemo()), _react2.default.createElement(CreateOrganize, { onCreateOrganize: this.createOrganize.bind(this), ref: 'createOrgModel' }), _react2.default.createElement(_Confirm2.default, {
                  title: '\u8B66\u544A',
                  text: '\u60A8\u786E\u5B9A\u8981\u79BB\u5F00\u6B64\u7EC4\u7EC7\u5417?',
                  ref: 'confirmModalLeave',
                  func: function func() {
                      _this3.props.leaveOrganize(_this3.state.orgData);
                  }
              }), _react2.default.createElement(_Confirm2.default, {
                  title: '\u8B66\u544A',
                  text: '\u60A8\u786E\u5B9A\u8981\u89E3\u6563\u6B64\u7EC4\u7EC7\u5417?',
                  ref: 'confirmModalDelete',
                  func: function func() {
                      _this3.props.deleteOrganize(_this3.state.orgData);
                  }
              }));
          }
      }]);
      return GetOrganize;
  }(_react.Component);
  
  GetOrganize.contextTypes = {
      store: _react2.default.PropTypes.object
  };
  
  var _ref7 = (0, _jsx3.default)('span', {
      'aria-hidden': 'true'
  }, void 0, '\xD7');
  
  var _ref8 = (0, _jsx3.default)('h4', {
      className: 'modal-title',
      id: 'contained-modal-title-sm'
  }, void 0, '\u65B0\u5EFA\u7EC4\u7EC7');
  
  var _ref9 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, '\u7EC4\u7EC7\u540D\u79F0'));
  
  var _ref10 = (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('span', {}, void 0, ' '));
  
  var CreateOrganize = function (_Component2) {
      (0, _inherits3.default)(CreateOrganize, _Component2);
  
      function CreateOrganize(props) {
          (0, _classCallCheck3.default)(this, CreateOrganize);
  
          var _this4 = (0, _possibleConstructorReturn3.default)(this, (CreateOrganize.__proto__ || (0, _getPrototypeOf2.default)(CreateOrganize)).call(this, props));
  
          _this4.state = {
              show: false,
              orgName: false
          };
          return _this4;
      }
  
      (0, _createClass3.default)(CreateOrganize, [{
          key: 'open',
          value: function open() {
              this.setState({
                  show: true
              });
          }
      }, {
          key: 'hide',
          value: function hide() {
              this.setState({
                  show: false
              });
          }
      }, {
          key: 'createOrganize',
          value: function createOrganize() {
              var org_name = this.refs.org_name;
              var org_tip = this.refs.org_tip;
              if (!org_name.value) {
                  this.setState({
                      orgName: true
                  });
                  org_tip.innerHTML = "组织名称不能为空";
                  return false;
              }
              this.props.onCreateOrganize(org_name.value);
          }
      }, {
          key: 'organizeName',
          value: function organizeName() {
              var value = this.refs.org_name.value;
              var org_tip = this.refs.org_tip;
              if (value.length == 0) {
                  this.setState({
                      orgName: false
                  });
              } else if (value.length < 6) {
                  this.setState({
                      orgName: true
                  });
                  org_tip.innerHTML = "组织名称太短";
              } else if (!/^[a-z]{1}[a-z0-9_]{5,}$/.test(value)) {
                  this.setState({
                      orgName: true
                  });
                  org_tip.innerHTML = "组织名称格式不正确";
              } else {
                  this.setState({
                      orgName: false
                  });
              }
          }
      }, {
          key: 'render',
          value: function render() {
              return _react2.default.createElement(
                  _reactBootstrap.Modal,
                  (0, _extends3.default)({}, this.props, { show: this.state.show,
                      onHide: this.hide.bind(this),
                      bsSize: 'sm', 'aria-labelledby': 'contained-modal-title-sm' }),
                  (0, _jsx3.default)('div', {
                      className: 'modal-header'
                  }, void 0, (0, _jsx3.default)('button', {
                      type: 'button',
                      onClick: this.hide.bind(this),
                      className: 'close',
                      'aria-label': 'Close'
                  }, void 0, _ref7), _ref8),
                  (0, _jsx3.default)('div', {
                      className: this.state.orgName ? "modal-body has-error" : "modal-body"
                  }, void 0, (0, _jsx3.default)('div', {
                      className: 'modalItem'
                  }, void 0, _ref9, (0, _jsx3.default)('label', {}, void 0, _react2.default.createElement('input', { onInput: this.organizeName.bind(this),
                      className: 'form-control form-control-sm',
                      type: 'input', placeholder: '\u8BF7\u8F93\u5165\u540D\u79F0',
                      ref: 'org_name' }))), _react2.default.createElement(
                      'div',
                      { ref: 'org_tip', className: 'volumeTip' },
                      '\u7EC4\u7EC7\u540D\u79F0\u4E0D\u6B63\u786E'
                  ), (0, _jsx3.default)('div', {
                      className: 'modalItem modelItemLast'
                  }, void 0, _ref10, (0, _jsx3.default)('label', {}, void 0, (0, _jsx3.default)('button', {
                      className: 'btn btn-primary',
                      onClick: this.createOrganize.bind(this)
                  }, void 0, '\u521B\u5EFA\u7EC4\u7EC7'))))
              );
          }
      }]);
      return CreateOrganize;
  }(_react.Component);
  
  exports.default = GetOrganize;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(13);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.receiveUserInfo = receiveUserInfo;
  exports.fetchUserInfo = fetchUserInfo;
  exports.fetchRevisePasswordAction = fetchRevisePasswordAction;
  
  var _constants = __webpack_require__(38);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(77);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(78);
  
  var _route = __webpack_require__(58);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveUserInfo(data) {
    return {
      type: _constants.RECEIVE_USER_INFO,
      payload: data
    };
  }
  
  function fetchUserInfo(token) {
    var development = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  
    return function (dispatch) {
      var url = '' + (development ? _constants.FETCH_URL.USER_INFO : _constants.FETCH_URL.USER_INFO_INTERNAL);
      return (0, _isomorphicFetch2.default)(url, {
        method: 'GET',
        headers: {
          token: token
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.status == 0) {
          dispatch(receiveUserInfo(json.result));
        } else {
          console.error('fetch user info error', json);
        }
      }).catch(function (e) {
        console.error('fetch user info failed ', e);
      });
    };
  }
  
  function fetchRevisePasswordAction(passwordObj) {
    var myInit = {
      method: "POST",
      headers: { token: localStorage.getItem("_at") },
      body: (0, _stringify2.default)(passwordObj)
    };
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.REVISE_PASSWORD, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, ">>>>>修改密码");
        if (json.status == 0) {
          dispatch((0, _notification.receiveNotification)({ message: "修改成功", level: "success" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
            location.href = '/login';
          }, 3000);
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "修改失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      }).catch(function (e) {
        console.error('fetch user info failed ', e);
      });
    };
  }

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ReviseImageContainer = __webpack_require__(214);
  
  var _ReviseImageContainer2 = _interopRequireDefault(_ReviseImageContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/reviseImage/:uuid',
    action: function action(ctx, params) {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _jsx3.default)(_ReviseImageContainer2.default, {
                  uuid: params.uuid
                }));
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  // import CodeBuildList from './CodeBuildList'

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ReviseImage = __webpack_require__(215);
  
  var _ReviseImage2 = _interopRequireDefault(_ReviseImage);
  
  var _reactRedux = __webpack_require__(51);
  
  var _isBtnStateSelector = __webpack_require__(125);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  var _imageDetailSelector = __webpack_require__(123);
  
  var _imageDetailSelector2 = _interopRequireDefault(_imageDetailSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _imageDetail = __webpack_require__(122);
  
  var _reviseImage = __webpack_require__(124);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _imageDetailSelector2.default)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      imageDetail: selector(state),
      isBtnState: isBtnStateSelector(state)
    };
  }; /**
      * Created by zhangsai on 16/10/10.
      */
  
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      getImageDetail: function getImageDetail(id) {
        dispatch((0, _imageDetail.fetchImageDetailAction)(id));
      },
      onReviseImage: function onReviseImage(data) {
        dispatch((0, _reviseImage.fetchReviseImageAction)(data));
      }
    };
  };
  
  var ReviseImageContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ReviseImage2.default);
  
  exports.default = ReviseImageContainer;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _constants = __webpack_require__(38);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (IsPublicToggle.__proto__ || (0, _getPrototypeOf2.default)(IsPublicToggle)).call(this, props));
  
      _this.state = {
        is_public: _this.props.state
      };
      return _this;
    }
  
    (0, _createClass3.default)(IsPublicToggle, [{
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          is_public: !this.state.is_public
        });
        this.props.getToggle(this.state.is_public);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.is_public,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, '\u4FEE\u6539\u955C\u50CF');
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '\u955C\u50CF\u662F\u670D\u52A1\u8FD0\u884C\u7684\u6A21\u677F, \u6765\u6E90\u4E8E\u4EE3\u7801, \u57FA\u4E8E Dockerfile \u6784\u5EFA, \u9ED8\u8BA4\u76EE\u5F55\u5728\u6839\'/\'\u4E0B, \u6587\u4EF6\u540D Dockerfile .');
  
  var _ref3 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u540D\u79F0',
    titleEnglish: 'IMAGE NAME',
    titleInfo: '\u9ED8\u8BA4\u4F1A\u4E0E\u60A8\u4E0B\u65B9\u4EE3\u7801\u6E90\u7684\u9879\u76EE\u540D\u79F0\u76F8\u540C'
  });
  
  var _ref4 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u955C\u50CF\u7B80\u4ECB',
    titleEnglish: 'IMAGE SUMMARY',
    titleInfo: '\u7B80\u5355\u4ECB\u7ECD\u955C\u50CF\u7684\u4FE1\u606F'
  });
  
  var _ref5 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u8BE6\u7EC6\u63CF\u8FF0',
    titleEnglish: 'IMAGE DETAIL',
    titleInfo: '\u8BE6\u7EC6\u4ECB\u7ECD\u955C\u50CF\u7684\u4FE1\u606F'
  });
  
  var _ref6 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u662F\u5426\u516C\u5F00',
    titleEnglish: 'IS PUBLIC',
    titleInfo: '\u516C\u5F00\u540E\u90FD\u53EF\u4EE5\u8BBF\u95EE'
  });
  
  var ReviseImage = function (_React$Component) {
    (0, _inherits3.default)(ReviseImage, _React$Component);
  
    function ReviseImage() {
      (0, _classCallCheck3.default)(this, ReviseImage);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (ReviseImage.__proto__ || (0, _getPrototypeOf2.default)(ReviseImage)).call(this));
  
      _this2.state = {
        isImageName: false,
        isPublic: 1
      };
      return _this2;
    }
  
    (0, _createClass3.default)(ReviseImage, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.CREATE_IMAGE);
        this.props.getImageDetail(this.props.uuid);
      }
    }, {
      key: 'onImageNameChange',
      value: function onImageNameChange() {
        var imageName = _reactDom2.default.findDOMNode(this.refs.repository),
            imageTip = _reactDom2.default.findDOMNode(this.refs.image_name_tip),
            regExp = /^[a-z]+[a-z0-9_-]*$/;
        if (!regExp.test(imageName.value) && imageName.value != "") {
          this.setState({
            isImageName: true
          });
          imageTip.innerHTML = _constants.INPUT_TIP.image.Format;
        } else {
          this.setState({
            isImageName: false
          });
        }
      }
    }, {
      key: 'building',
      value: function building() {
        var repository = _reactDom2.default.findDOMNode(this.refs.repository).innerHTML,
            detail = _reactDom2.default.findDOMNode(this.refs.image_detail).value,
            short_description = _reactDom2.default.findDOMNode(this.refs.short_description).value,
            isPublic = String(this.state.isPublic);
        var data = {
          is_public: isPublic,
          short_description: short_description,
          detail: detail,
          repository: repository,
          is_code: "0",
          uuid: this.props.uuid
        };
        this.props.onReviseImage(data);
      }
    }, {
      key: 'getToggleValue',
      value: function getToggleValue(value) {
        var flag = !value ? 1 : 0; //1 true  0 false
        this.setState({
          isPublic: flag
        });
      }
    }, {
      key: 'getDate',
      value: function getDate() {
        var _this3 = this;
  
        var arr = [this.props.imageDetail];
        var my = this;
        var name = arr[0].repository || "";
        name = name.split("/")[1];
        var dataBox = arr.map(function (item, i) {
          return (0, _jsx3.default)('div', {
            className: 'acBox'
          }, new Date(item.creation_time).getTime(), _ref, _ref2, (0, _jsx3.default)('div', {
            className: 'assItem'
          }, void 0, _ref3, (0, _jsx3.default)('div', {
            className: 'assBox ' + (my.state.isImageName ? "has-error" : "")
          }, void 0, _react2.default.createElement(
            'span',
            { ref: 'repository' },
            name
          ))), (0, _jsx3.default)('div', {
            className: 'assItem'
          }, void 0, _ref4, (0, _jsx3.default)('div', {
            className: 'assBox'
          }, void 0, _react2.default.createElement('textarea', {
            placeholder: '\u955C\u50CF\u7B80\u4ECB',
            className: 'form-control',
            defaultValue: item.detail,
            ref: 'image_detail'
          }))), (0, _jsx3.default)('div', {
            className: 'assItem'
          }, void 0, _ref5, (0, _jsx3.default)('div', {
            className: 'assBox'
          }, void 0, _react2.default.createElement('textarea', {
            placeholder: '\u8BE6\u7EC6\u63CF\u8FF0',
            className: 'form-control',
            defaultValue: item.short_description,
            ref: 'short_description'
          }))), (0, _jsx3.default)('div', {
            className: 'assItem'
          }, void 0, _ref6, (0, _jsx3.default)('div', {
            className: 'assBox'
          }, void 0, (0, _jsx3.default)(IsPublicToggle, {
            state: item.is_public == 1,
            getToggle: my.getToggleValue.bind(_this3)
          }))), (0, _jsx3.default)('div', {
            className: 'assItem'
          }, void 0, (0, _jsx3.default)('div', {
            className: 'acBtn'
          }, void 0, (0, _jsx3.default)('button', {
            className: 'btn btn-primary',
            onClick: my.building.bind(_this3),
            disabled: !my.props.isBtnState.building
          }, void 0, my.props.isBtnState.building ? "修改" : "修改中..."))));
        });
        return dataBox;
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('修改镜像');
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, this.getDate());
      }
    }]);
    return ReviseImage;
  }(_react2.default.Component);
  
  ReviseImage.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object
  };
  exports.default = ReviseImage;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(3);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _OrganizeContainer = __webpack_require__(217);
  
  var _OrganizeContainer2 = _interopRequireDefault(_OrganizeContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_OrganizeContainer2.default, {});
  
  exports.default = {
    path: '/organize',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _ref);
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _Organize = __webpack_require__(218);
  
  var _Organize2 = _interopRequireDefault(_Organize);
  
  var _reactRedux = __webpack_require__(51);
  
  var _breadcumb = __webpack_require__(93);
  
  var _organize = __webpack_require__(76);
  
  var fun = _interopRequireWildcard(_organize);
  
  var _organizeDetailSelector = __webpack_require__(223);
  
  var _organizeDetailSelector2 = _interopRequireDefault(_organizeDetailSelector);
  
  var _organizeUserListSelector = __webpack_require__(224);
  
  var _organizeUserListSelector2 = _interopRequireDefault(_organizeUserListSelector);
  
  var _userListSelector = __webpack_require__(225);
  
  var _userListSelector2 = _interopRequireDefault(_userListSelector);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var getOrganizeDetail = (0, _organizeDetailSelector2.default)();
    var getOrganizeUserList = (0, _organizeUserListSelector2.default)();
    var getUserList = (0, _userListSelector2.default)();
    return {
      organizeDetail: getOrganizeDetail(state),
      organizeUserList: getOrganizeUserList(state),
      userList: getUserList(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      getOrganizeDetail: function getOrganizeDetail(id) {
        dispatch(fun.fetchGetOrganizeDetailAction(id));
      },
      setOrganizeDetail: function setOrganizeDetail(data) {
        dispatch(fun.fetchSetOrganizeDetailAction(data));
      },
      getOrganizeUserList: function getOrganizeUserList(id) {
        dispatch(fun.fetchGetOrganizeUserListAction(id));
      },
      getUserList: function getUserList(name) {
        dispatch(fun.fetchGetUserListAction(name));
      },
      inviteUser: function inviteUser(data) {
        dispatch(fun.fetchInviteUser(data));
      },
      changeUserRole: function changeUserRole(data) {
        dispatch(fun.fetchChangeUserRoleAction(data));
      },
      changeOrganizeOwner: function changeOrganizeOwner(data) {
        dispatch(fun.fetchChangeOrganizeOwnerAction(data));
      },
      deleteOrganize: function deleteOrganize(data) {
        dispatch(fun.fetchDeleteOrganize(data));
      },
      leaveOrganize: function leaveOrganize(data) {
        dispatch(fun.fetchLeaveOrganize(data));
      }
    };
  };
  
  var OrganizeContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Organize2.default);
  
  exports.default = OrganizeContainer;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _constants = __webpack_require__(38);
  
  var _GetOrgInfo = __webpack_require__(219);
  
  var _GetOrgInfo2 = _interopRequireDefault(_GetOrgInfo);
  
  var _GetOrgDeal = __webpack_require__(220);
  
  var _GetOrgDeal2 = _interopRequireDefault(_GetOrgDeal);
  
  var _GetOrgAdmin = __webpack_require__(221);
  
  var _GetOrgAdmin2 = _interopRequireDefault(_GetOrgAdmin);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '组织中心';
  
  var _ref = (0, _jsx3.default)(_reactBootstrap.Tab, {
    eventKey: 1,
    title: '\u8D26\u6237\u4FE1\u606F'
  }, void 0);
  
  var _ref2 = (0, _jsx3.default)(_reactBootstrap.Tab, {
    eventKey: 3,
    title: '\u4EA4\u6613\u8BB0\u5F55'
  }, void 0, (0, _jsx3.default)(_GetOrgDeal2.default, {}));
  
  var Organize = function (_Component) {
    (0, _inherits3.default)(Organize, _Component);
  
    function Organize() {
      (0, _classCallCheck3.default)(this, Organize);
      return (0, _possibleConstructorReturn3.default)(this, (Organize.__proto__ || (0, _getPrototypeOf2.default)(Organize)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Organize, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.ORGANIZE);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        this.context.setTitle(title);
        return (0, _jsx3.default)('div', {
          className: 'containerBgF'
        }, void 0, (0, _jsx3.default)('div', {
          className: 'userTab'
        }, void 0, (0, _jsx3.default)(_reactBootstrap.Tabs, {
          defaultActiveKey: 2,
          id: 'userTabs'
        }, void 0, _ref, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 2,
          title: '\u7EC4\u7EC7\u4FE1\u606F'
        }, void 0, (0, _jsx3.default)(_GetOrgInfo2.default, {
          getOrganizeDetail: function getOrganizeDetail(id) {
            _this2.props.getOrganizeDetail(id);
          },
          organizeDetail: this.props.organizeDetail,
          setOrganizeDetail: function setOrganizeDetail(data) {
            _this2.props.setOrganizeDetail(data);
          }
        })), _ref2, (0, _jsx3.default)(_reactBootstrap.Tab, {
          eventKey: 4,
          title: '\u7EC4\u7EC7\u7BA1\u7406'
        }, void 0, (0, _jsx3.default)(_GetOrgAdmin2.default, {
          organizeUserList: this.props.organizeUserList,
          getOrganizeUserList: function getOrganizeUserList(id) {
            _this2.props.getOrganizeUserList(id);
          },
          userList: this.props.userList,
          getUserList: function getUserList(name) {
            _this2.props.getUserList(name);
          },
          inviteUser: function inviteUser(data) {
            _this2.props.inviteUser(data);
          },
          changeUserRole: function changeUserRole(data) {
            _this2.props.changeUserRole(data);
          },
          changeOrganizeOwner: function changeOrganizeOwner(data) {
            _this2.props.changeOrganizeOwner(data);
          },
          deleteOrganize: function deleteOrganize(id, flag) {
            _this2.props.deleteOrganize(id, flag);
          },
          leaveOrganize: function leaveOrganize(data) {
            _this2.props.leaveOrganize(data);
          }
        })))));
      }
    }]);
    return Organize;
  }(_react.Component);
  
  Organize.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react2.default.PropTypes.object
  };
  exports.default = Organize;

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Toggle = __webpack_require__(118);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (IsPublicToggle.__proto__ || (0, _getPrototypeOf2.default)(IsPublicToggle)).call(this, props));
  
      _this.state = {
        is_public: _this.props.state
      };
      return _this;
    }
  
    (0, _createClass3.default)(IsPublicToggle, [{
      key: 'handClick',
      value: function handClick(component, value) {
        this.setState({
          is_public: !this.state.is_public
        });
        this.props.getToggle(this.state.is_public);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)(_Toggle2.default, {
          defaultChecked: this.state.is_public,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  var _ref = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref2 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7EC4\u7EC7\u5934\u50CF',
    titleEnglish: '',
    titleInfo: 'ORGANIZE HEAD'
  });
  
  var _ref3 = (0, _jsx3.default)('div', {
    className: 'userHead organizeItem'
  }, void 0, (0, _jsx3.default)('div', {
    className: 'userHeadBox'
  }, void 0, (0, _jsx3.default)('img', {})), (0, _jsx3.default)('div', {
    className: 'choose icon-operation'
  }, void 0, (0, _jsx3.default)('span', {}, void 0, '\u66F4\u6539\u5934\u50CF')));
  
  var _ref4 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7EC4\u7EC7\u63CF\u8FF0',
    titleEnglish: '',
    titleInfo: 'ORGANIZE '
  });
  
  var _ref5 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u662F\u5426\u516C\u5F00',
    titleEnglish: '',
    titleInfo: 'IS PUBLIC'
  });
  
  var GetOrgInfo = function (_Component2) {
    (0, _inherits3.default)(GetOrgInfo, _Component2);
  
    function GetOrgInfo(props) {
      (0, _classCallCheck3.default)(this, GetOrgInfo);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (GetOrgInfo.__proto__ || (0, _getPrototypeOf2.default)(GetOrgInfo)).call(this, props));
  
      _this2.state = {
        is_public: 0
      };
      return _this2;
    }
  
    (0, _createClass3.default)(GetOrgInfo, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var organizeId = this.context.store.getState().user_info.orga_uuid;
        this.props.getOrganizeDetail(organizeId);
      }
    }, {
      key: 'getToggleValue',
      value: function getToggleValue(value) {
        var flag = !value ? 1 : 0; //1 true  0 false
        this.setState({
          is_public: flag
        });
      }
    }, {
      key: 'setOrganizeDetail',
      value: function setOrganizeDetail() {
        var orga_id = this.context.store.getState().user_info.orga_uuid;
        var org_name = this.context.store.getState().user_info.user_orga;
        var data = {
          org_name: org_name,
          orga_id: orga_id,
          orga_detail: this.refs.orga_detail.value,
          is_public: this.state.is_public
        };
        console.log(data);
        this.props.setOrganizeDetail(data);
      }
    }, {
      key: 'render',
      value: function render() {
        var data = this.props.organizeDetail;
        if (data.creation_time == "") return (0, _jsx3.default)('div', {
          style: { textAlign: "center" }
        }, void 0, _ref);
        return (0, _jsx3.default)('div', {
          className: 'userTabBox'
        }, new Date(data.creation_time).getTime(), (0, _jsx3.default)('div', {
          className: 'userItem organizeBox'
        }, void 0, _ref2, _ref3, _ref4, (0, _jsx3.default)('div', {
          className: 'organizeItem'
        }, void 0, _react2.default.createElement('textarea', { type: 'text', className: 'form-control', ref: 'orga_detail', defaultValue: data.orga_detail })), _ref5, (0, _jsx3.default)('div', {
          className: 'organizeItem'
        }, void 0, (0, _jsx3.default)(IsPublicToggle, {
          state: data.is_public == 1,
          getToggle: this.getToggleValue.bind(this)
        })), (0, _jsx3.default)('div', {
          className: 'organizeItem organizeItemBtn '
        }, void 0, (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.setOrganizeDetail.bind(this)
        }, void 0, '\u4FDD\u5B58'))));
      }
    }]);
    return GetOrgInfo;
  }(_react.Component);
  
  GetOrgInfo.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  exports.default = GetOrgInfo;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(132);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('div', {
    className: 'userTabBox'
  }, void 0, '123');
  
  var GetOrgDeal = function (_Component) {
    (0, _inherits3.default)(GetOrgDeal, _Component);
  
    function GetOrgDeal(props) {
      (0, _classCallCheck3.default)(this, GetOrgDeal);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (GetOrgDeal.__proto__ || (0, _getPrototypeOf2.default)(GetOrgDeal)).call(this, props));
  
      _this.state = {};
      return _this;
    }
  
    (0, _createClass3.default)(GetOrgDeal, [{
      key: 'render',
      value: function render() {
        return _ref;
      }
    }]);
    return GetOrgDeal;
  }(_react.Component);
  
  exports.default = GetOrgDeal;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(10);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(129);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Loading = __webpack_require__(107);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _reactBootstrap = __webpack_require__(70);
  
  var _Confirm = __webpack_require__(112);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _route = __webpack_require__(58);
  
  var _notification = __webpack_require__(78);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Loading2.default, {});
  
  var _ref2 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '400'
  }, void 0, '\u7528\u6237');
  
  var _ref3 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '520'
  }, void 0, '\u7EC4\u7EC7\u521B\u5EFA\u8005');
  
  var _ref4 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '210'
  }, void 0, '\u7BA1\u7406\u5458');
  
  var _ref5 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '520'
  }, void 0, '\u7EC4\u7EC7\u521B\u5EFA\u8005');
  
  var _ref6 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '210'
  }, void 0, '\u7BA1\u7406\u5458');
  
  var _ref7 = (0, _jsx3.default)(_reactBootstrap.MenuItem, {
    eventKey: '520'
  }, void 0, '\u7EC4\u7EC7\u521B\u5EFA\u8005');
  
  var _ref8 = (0, _jsx3.default)('button', {
    className: 'btn btn-danger'
  }, void 0, '\u79BB\u5F00\u7EC4\u7EC7');
  
  var _ref9 = (0, _jsx3.default)('button', {
    className: 'btn btn-danger'
  }, void 0, '\u79FB\u9664\u7EC4\u7EC7');
  
  var _ref10 = (0, _jsx3.default)('img', {
    className: 'mediaImg',
    src: '/slImgJx.png'
  });
  
  var _ref11 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {
    width: '33%'
  }, void 0, '\u7528\u6237\u540D'), (0, _jsx3.default)('th', {
    width: '33%'
  }, void 0, '\u6743\u9650\u4FE1\u606F'), (0, _jsx3.default)('th', {
    width: '34%'
  }, void 0, '\u64CD\u4F5C')));
  
  var _ref12 = (0, _jsx3.default)('li', {}, void 0, '\u6682\u65E0\u6570\u636E');
  
  var _ref13 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u9080\u8BF7\u65B0\u6210\u5458',
    titleEnglish: 'INVITE USER',
    titleInfo: '\u9080\u8BF7\u65B0\u6210\u5458'
  });
  
  var _ref14 = (0, _jsx3.default)(_HeadLine2.default, {
    title: '\u7EC4\u7EC7\u6210\u5458',
    titleEnglish: 'ORGANIZE USER LIST',
    titleInfo: '\u7EC4\u7EC7\u6210\u5458\u5217\u8868'
  });
  
  var GetOrgAdmin = function (_Component) {
    (0, _inherits3.default)(GetOrgAdmin, _Component);
  
    function GetOrgAdmin(props) {
      (0, _classCallCheck3.default)(this, GetOrgAdmin);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (GetOrgAdmin.__proto__ || (0, _getPrototypeOf2.default)(GetOrgAdmin)).call(this, props));
  
      _this.state = {
        inviteBox: false,
        roleData: {},
        deleteData: {},
        leaveData: {}
      };
      return _this;
    }
  
    (0, _createClass3.default)(GetOrgAdmin, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var is_user = this.context.store.getState().user_info.is_user;
        if (is_user == 1) {
          this.context.store.dispatch((0, _route.navigate)("/"));
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var organizeId = this.context.store.getState().user_info.orga_uuid;
        this.props.getOrganizeUserList(organizeId);
      }
    }, {
      key: 'getOrganizeUserBody',
      value: function getOrganizeUserBody() {
        var _this2 = this;
  
        var user_name = this.context.store.getState().user_info.user_name;
        var orgRole = Number(this.context.store.getState().user_info.role_uuid);
        var data = this.props.organizeUserList;
        if (data[0] == 1) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '3',
          style: { textAlign: "center" }
        }, void 0, _ref));
        if (!data.length) return (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
          colSpan: '3',
          style: { textAlign: "center" }
        }, void 0, '\u6682\u65E0\u6570\u636E~'));
        return data.map(function (item, i) {
          var role = "";
          var buttonGroup = "";
          switch (Number(item.role)) {
            case 200:
              role = "组织创建者";
              buttonGroup = (0, _jsx3.default)('div', {
                className: 'roleBox'
              }, void 0, (0, _jsx3.default)('button', {
                disabled: orgRole != 200,
                onClick: _this2.onDeleteOrganize.bind(_this2),
                className: 'btn btn-danger'
              }, void 0, '\u89E3\u6563\u7EC4\u7EC7'));
              break;
            case 210:
              role = "管理员";
              buttonGroup = (0, _jsx3.default)('div', {
                className: 'roleBox'
              }, void 0, (0, _jsx3.default)(_reactBootstrap.DropdownButton, {
                onSelect: _this2.onChangeUserRole.bind(_this2, item.uid),
                bsStyle: "primary",
                disabled: orgRole != 200 && user_name != item.user_name,
                title: '更改权限',
                id: 'volumes-table-line-' + i
              }, void 0, _ref2, orgRole == 200 ? _ref3 : ""), user_name == item.user_name ? (0, _jsx3.default)('button', {
                className: 'btn btn-danger',
                onClick: _this2.onLeaveOrganize.bind(_this2)
              }, void 0, '\u79BB\u5F00\u7EC4\u7EC7') : (0, _jsx3.default)('button', {
                className: 'btn btn-danger',
                onClick: _this2.onDeleteUser.bind(_this2, item.uid),
                disabled: orgRole != 200
              }, void 0, '\u79FB\u9664\u7EC4\u7EC7'));
              break;
            case 400:
              role = "成员";
              buttonGroup = (0, _jsx3.default)('div', {
                className: 'roleBox'
              }, void 0, (0, _jsx3.default)(_reactBootstrap.DropdownButton, {
                onSelect: _this2.onChangeUserRole.bind(_this2, item.uid),
                bsStyle: "primary",
                disabled: orgRole != 200,
                title: '更改权限',
                id: 'volumes-table-line-' + i
              }, void 0, orgRole == 200 ? _ref4 : "", orgRole == 200 ? _ref5 : ""), user_name == item.user_name ? (0, _jsx3.default)('button', {
                className: 'btn btn-danger',
                onClick: _this2.onLeaveOrganize.bind(_this2)
              }, void 0, '\u79BB\u5F00\u7EC4\u7EC7') : (0, _jsx3.default)('button', {
                className: 'btn btn-danger',
                disabled: orgRole == 400,
                onClick: _this2.onDeleteUser.bind(_this2, item.uid)
              }, void 0, '\u79FB\u9664\u7EC4\u7EC7'));
              break;
            default:
              role = "成员";
              buttonGroup = (0, _jsx3.default)('div', {
                className: 'roleBox'
              }, void 0, (0, _jsx3.default)(_reactBootstrap.DropdownButton, {
                onSelect: _this2.onChangeUserRole.bind(_this2, item.uid),
                bsStyle: "primary",
                disabled: orgRole == 400 && user_name != item.user_name,
                title: '更改权限',
                id: 'volumes-table-line-' + i
              }, void 0, orgRole == 200 ? _ref6 : "", orgRole == 200 ? _ref7 : ""), user_name == item.user_name ? _ref8 : "", orgRole == 200 || orgRole == 210 ? _ref9 : "");
  
          }
          return (0, _jsx3.default)('tr', {}, i, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('div', {
            className: 'mediaItem'
          }, void 0, _ref10, (0, _jsx3.default)('span', {
            className: 'mediaTxt'
          }, void 0, item.user_name))), (0, _jsx3.default)('td', {}, void 0, role), (0, _jsx3.default)('td', {}, void 0, buttonGroup));
        });
      }
    }, {
      key: 'getTableDemo',
      value: function getTableDemo() {
        return (0, _jsx3.default)('table', {
          className: 'table table-hover table-bordered'
        }, void 0, _ref11, (0, _jsx3.default)('tbody', {}, void 0, this.getOrganizeUserBody()));
      }
    }, {
      key: 'getUserListFun',
      value: function getUserListFun(e) {
        var name = e.target.value;
        if (name.length >= 3) {
          this.setState({
            inviteBox: true
          });
          this.props.getUserList(name);
        }
      }
    }, {
      key: 'getUserListBody',
      value: function getUserListBody() {
        var userList = this.props.userList;
        var my = this;
        if (userList && userList.length) {
          var body = userList.map(function (item, i) {
            return (0, _jsx3.default)('li', {
              onClick: my.choseInviteName.bind(my, item.username)
            }, i, (0, _jsx3.default)('img', {
              width: 40,
              height: 40,
              src: item.logo || __webpack_require__(222)
            }), (0, _jsx3.default)('p', {}, void 0, item.username), (0, _jsx3.default)('p', {}, void 0, item.email));
          });
          return body;
        } else {
          return _ref12;
        }
      }
    }, {
      key: 'inviteInputBlur',
      value: function inviteInputBlur() {
        var my = this;
        setTimeout(function () {
          my.setState({
            inviteBox: false
          });
        }, 200);
      }
    }, {
      key: 'choseInviteName',
      value: function choseInviteName(name) {
        console.log(name);
        this.refs.username.value = name;
      }
    }, {
      key: 'onInviteUser',
      value: function onInviteUser() {
        var _this3 = this;
  
        var userList = this.props.userList;
        var userInfo = this.refs.username.value;
        var orga_id = this.context.store.getState().user_info.orga_uuid;
        var data = {};
        userList.map(function (item) {
          if (item.username == userInfo || item.email == userInfo) {
            data = {
              user_id: item.user_id,
              orga_id: orga_id
            };
          }
        });
        if (data.user_id) {
          this.props.inviteUser(data);
        } else {
          (function () {
            _this3.context.store.dispatch((0, _notification.receiveNotification)({ message: "没有找到此用户", level: "danger" }));
            var my = _this3;
            setTimeout(function () {
              my.context.store.dispatch((0, _notification.clearNotification)());
            }, 3000);
          })();
        }
      }
    }, {
      key: 'onChangeUserRole',
      value: function onChangeUserRole(user_uuid, key) {
        var orga_uuid = this.context.store.getState().user_info.orga_uuid;
        var data = {
          orga_uuid: orga_uuid,
          user_uuid: user_uuid,
          role_uuid: key,
          method: "PUT"
        };
        console.log(key);
        if (key == 520) {
          this.props.changeOrganizeOwner(data);
        } else {
          this.props.changeUserRole(data);
        }
      }
    }, {
      key: 'onDeleteUser',
      value: function onDeleteUser(user_uuid) {
        var orga_uuid = this.context.store.getState().user_info.orga_uuid;
        this.setState({
          roleData: {
            orga_uuid: orga_uuid,
            user_uuid: user_uuid,
            role_uuid: "",
            method: "DELETE"
          }
        });
        this.refs.confirmModal.open();
      }
    }, {
      key: 'onDeleteOrganize',
      value: function onDeleteOrganize() {
        var orga_uuid = this.context.store.getState().user_info.orga_uuid;
        this.setState({
          orgData: {
            orgId: orga_uuid,
            keyList: "userList"
          }
        });
        this.refs.confirmModalDelete.open();
      }
    }, {
      key: 'onLeaveOrganize',
      value: function onLeaveOrganize() {
        var orgId = this.context.store.getState().user_info.orga_uuid;
        this.setState({
          leaveData: {
            orgId: orgId,
            keyList: "userList"
          }
        });
        this.refs.confirmModalLeave.open();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;
  
        var role = this.context.store.getState().user_info.role_uuid;
        return (0, _jsx3.default)('div', {
          className: 'organize'
        }, void 0, role == 400 ? "" : (0, _jsx3.default)('div', {
          className: 'organizeHd'
        }, void 0, _ref13, (0, _jsx3.default)('div', {
          className: 'inviteUser'
        }, void 0, _react2.default.createElement('input', { type: 'text', className: 'form-control inviteUserInput',
          ref: 'username',
          onInput: this.getUserListFun.bind(this),
          onBlur: this.inviteInputBlur.bind(this)
        }), (0, _jsx3.default)('button', {
          className: 'btn btn-primary',
          onClick: this.onInviteUser.bind(this)
        }, void 0, '\u9080\u8BF7'), (0, _jsx3.default)('ul', {
          className: this.state.inviteBox ? "inviteShow" : "inviteHide"
        }, void 0, this.getUserListBody()))), (0, _jsx3.default)('div', {
          className: 'organizeBd sl-bd TableTextLeft'
        }, void 0, _ref14, (0, _jsx3.default)('div', {
          className: 'organizeUserTab'
        }, void 0, this.getTableDemo())), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u60A8\u786E\u5B9A\u8981\u79FB\u9664\u6B64\u7528\u6237\u5417?',
          ref: 'confirmModal',
          func: function func() {
            _this4.props.changeUserRole(_this4.state.roleData);
          }
        }), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u60A8\u786E\u5B9A\u8981\u79BB\u5F00\u6B64\u7EC4\u7EC7\u5417?',
          ref: 'confirmModalLeave',
          func: function func() {
            _this4.props.leaveOrganize(_this4.state.leaveData);
          }
        }), _react2.default.createElement(_Confirm2.default, {
          title: '\u8B66\u544A',
          text: '\u60A8\u786E\u5B9A\u8981\u89E3\u6563\u6B64\u7EC4\u7EC7\u5417?',
          ref: 'confirmModalDelete',
          func: function func() {
            _this4.props.deleteOrganize(_this4.state.orgData);
          }
        }));
      }
    }]);
    return GetOrgAdmin;
  }(_react.Component);
  
  GetOrgAdmin.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  exports.default = GetOrgAdmin;

/***/ },
/* 222 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmIzYTA5MS1mZTUwLTRkOGMtOGQ1NS1kYTcxMDUyYjdkMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Q0OTkxN0E2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Q0OTkxNzk2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphOThjNzgzOS1kYWE3LTQ3ZjgtODAzOS1jMzc0ZmIzYmI1ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTZiM2EwOTEtZmU1MC00ZDhjLThkNTUtZGE3MTA1MmI3ZDI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QujMrwAAEShJREFUeNoklwlwW9d1hu/b38PDvpAgQJAgARLcRdGUSEvULtoj2+NFdSUnTpzVcTqx04xqx0mbpO2kiVuntptmJq63xHXqZOptbMmSFduSbUqyJEoiKYukxJ0ECBD79vD2rVcpBjPA4A3uufec/57/O4hpmqV0/B8effTCx59u6qyP9odeeumTNR384blHBpyOyeNnTZIcR0sffHT1W4ObhvcMapJiwclaMpPJVSRNRRHU5rQ7vQ4Uw6UaTyCApdnrawlRqp5b2njjagYA8N+//nY00pktg46QVcccgc59LrcXEbnc8Zd+duTI83fu7fF1ugRO2dzT72moy01N5T+dcfaGUYJ5dfzK9pHub23biaPoeialKEYqkayVeBtDYhimKKqpqHarRdK0hXQhGvQVKrVkoex3EZdWMq9dSu24JfjDxw9fnY+7rZTL7saopgN3fw2vxC9m19MNTqs/4vIG/Y3WoKvBd+HdY34V7/nyqI+xrYpXHefTYa5DUqW15LpY4RDUxFFDR6RSVbNZGYCiMoryGgAIYiXxM7OLODAZhlYUent7c7bInbySvHd+ZaivV+P1pUwi6Eme+uhFVOdz8ZV0uM3vaw70tXSUeP4XTz5tqahbDo5aFGXuwuUC8Ox75MskyybOX+AW1tR4lspxUo4zaiaBAVM3EcS0kDRBIjRBRJvqBlsaw/UNGADrhY10gfvy7sFGAJ5//RyOoSiGRgMh3TBZYOJA1+eXkwDVtar8yceXfvXKyVd/eF9XX++1sfHZU+eGnvm322+7DVHNZGrl8/96JtrThKOYmi83IuhGhccU1QJQXpQMUwMGShKUrmk1iadxgiUJ3WSz1bIOtK+PRE+tZhYT61VJ3BJul2S8UitgdoUb//zqnYe2yaLy5vHxfS3uA9u2TF2crKXWAw8e3H7wXm49IdWKGGNdWV7sbg51bepBGYuVZZ1WhkIMRREFUTPhCTCcwDCSpHNlbmY9meNLmqoF3V5eUVVENCuSNejx+N0UgrtsjumlWXzq4sxXH7vXHWmcPTvT3ujc0xFJrG2oKEojwOv0M4ylqmqMhZVV9fPTn9A3GvA9u1OZtFLlDNUgEFORDRxDdAOKFyEIJFeqMCTZ4mkoCTXT1DYqJStFaSilySLCcQxtX9lI9kXavC4v9rdH7mno6ipXax4L2+WwuRiqwokkhlM4lcrFiXBbpD1qGubrL7z07u9O9fUGM+sJXhKZeq/FabfQsMigVIExYK1NeHBZVVYz+Y1yRZB5WHaWosuCkOE4VeFJigj1dUmiAEsTCTTj7tZIqVjEUSTg82iFWiVfZAN+XRIkgNgr3AdPHDm/d//yF5NHXzv72O3t/YEQ6rBYaLq8lkzmK1WoLHjbaJIgMVXXVU0Puj11bmeFl/LF7MR6AjNxv92FYchCtTB1ebFzT9rh8RQLhfnkGnbn7VsIgpSFmjCzRAiauzvCBv2Spoc6mm0EETQBNznJyNKj33/g7sMHm4f66ttaAUlpiqIgmIwhNENSJMKLoiqrqKEpKpSKhhgGTVlkycARE8Ogbk2X3ZZYq3j8lkA0oiuiZhg4AcMS+NhHl25h7aDOKxqIx+HAVTU3s2jqiD3S1tzVXqzkZ+fmv5iZRmi0nONKhYrLTmmqIfN8rVrDEAoBgKZp1kJGmkOqrH8yPaNpGrw+KGoYnGkYIBpsDPk20sl0LzA1HVCwlqzVfvbYybHPro5++6Az6AckUVpZk/Mc5ferLHl5ZpI1gc1AbR6vq96JaBoVwkmLlU/na/lSY7iJtjskHeqKhMXGCZwrVRauL9dZQqYqybDgQFyppSs8PLxc1VS3CjdhwMzDHOCVVOrK+FxbU9DrdaMGJlf4Klcp6qqZLlokoQ21dsTabQ47zlgFQ5dkmEu+LFXzZrlg0/JCDlM3+HyWL3FQaA4rwtV42dBaeygG6qCkLcxJmAYoDFTFmiIC1BCBYaAIZgAdV8s1imZjPhdAiclr10xSozHKFOW2UNBTH+YkaSG1Id24YUiVEi/UcAMD8gtH52/b4xndGRAFhQRouNUa9Pk9dvZGsjx9w8xw4kpGMDCxO2p74Js9mcVyKS78x0eL1wpqzFlHEaCGoYim4zhGEdTNjpOt5stimeJhreyM1b1eFj6cnJ1JljZyvIaAO/cH77urOdIYQAi/J/LBxfF4vSs8tDNULolOC7mWL7/69vyrxxLTmXyQZrd0s6Kkv300v2cHf3hfIBxETEMF1nBs5Et8Yc7jcpc5DLv/wLZEKtPAss3+BhS1tfR2lg25YqSTXO7SQj7SYh3Y5KUJ8Keja/EVnSaxwc6mgd27OuqRsxdmdIB5bfhSNv+jZy/++uhCkwv93v2h+w74RobqRnfW793m++J6cTXBbW53XpjKrOWLodaWs+fmq6kbg1v7sW8c2kdRVHo9TeMYT2rJYuLtd4/b3Wi2aO2N2h86NLBnODa8uakzavlwbP75E/PrMzNb+1qaWgZwkNN1yWZhjp9dfedk7rZea6QZpPLKK2+tvXAs+c6x+K097Df+uifLi4SAXFutLRWlicuTiysb49NpLrWMHb5jRBTltURW1KRz4+eOnVwM1wHWE6t3UQ9/5ZZ0rvrSq5++/valXC6bylS2trmurqBqcXZk9x4NYR1oNs8by0nOAdRCsbQmeI+Pb3AqCHg8eVE8fqGwvcXS0+1Px7mz1/Mp+ODm62Z3nYtz6NWJ6yJX23/Xrt6RW8PhWCQAbA6XnSEePNi/Fi888fOPf/v+0pmZytgEl82DxfnCoQMuymHkizWcdEEBw2zHImyxmPOF65/+yVfpv6z93cPDpjH28P07H3l6Sq1KdfV0rQbtGliJm0/rPM6HHv4men58Zmjb1q39PXKNJzHE0EG+rG7e1CCIwtQc9/3HHmp3AR2A/3z27zLmzMDQpqMf3hgaaIGgYwIMGBiK45WCWE7JX7q7jZNE6S+BP/t8BiDM3u0DHhcxey2FmoYsy/CXWBRaM+CqNZ+LQUdvHx7Z3itL0okT52ysDScQXQcBv/fUqUs7YA6a6q+XAFxuamIKCMX2WFMkGlZlQOGIoinQkSicNHVsqKO+lEhRGD8UjgzbwJWp1RC+5Ze/+sNTP95LGoZQ1opwCYpsibTCwKKq/en53+Iet4sr8haWcTkZHdUdrN3qtmq6EQwH7QQH8EB/nbUraP/s5Fjklf3tfR3P/fR+vjxblWBUFL4RE1jrbaFO9+p0wd28/J2/GTr/HrjdCc5M5+872BJwa7KNgF5VhgExxOW0w8/uZhds6thQW9Dp80F4mLh81emgOY4PBpzN4XqGtWWyie5I2NfUklwvNPgCkgmOfO/W/haHpOIGwsJeptZWUYyu8AJlpzXOSK0lXW4+ELYAxtg67G0J2SVRxK32bKL259mC1eVscLM3FuJtrcHl5QyumEi1UoVSW1xaGdlxEFp6YnnBzToZCzq9XL409flALOL37knEVx54sK3Fx2zwdk0vmpqAai5NQywkhgKMZMnoraH8SqGSr1mcdGPAouu4JnK4zUk6mhPp6/CgfLF8+sSZaKvf53VVNIB6nc5ildc0w+e08YJEUAxENBPBW4PhehvDS8r1hVk7XrxtS0PQZZWIKGRN3Cj6Gjpo2qKbKuQNj9MmiIpi6t5WT0trwGv30KTdQWnQMQ33LjVXmFrIw8CmJnX0Re6688B7H13ubWTQvk09xUIxXygCAmNZi83mMglHhSupuC0S3RoLNjT5PKipcYrNdA1DrMytX5tOaqlUSlf45sgITtIzN1YXZtKqZGqaCXEAwaAJcDhjlwMPbExOx698dv5mXDA6HNt/xx1vvvT7He30z556BFd1I76caGoM1bncOEb6fHar3Te/EI/FqvZAO2bxwJ1CGWGUy0BQsTRX5/ZxSu6t15+1Opyxvq6ZL64X5oUdo1GH08JVBBhA1wSCwPT60dXxi+b0sSzik7Ry/6buAwfvfvKHTw2GsSP//Jgi6/iZz85CRsRwXJA0nMS4qmS3Mpev5qPRKzEoIV+zKNJAl9VqRuHjqswRCBJrcA5/7ztLefvTv/ydgmFL08VYF+8P2FUrI9UkzCii3tGlqdna+f8N9bY/+9o83M09e3ufeeZFFoCHvjEKELxYKqK5dIWiGRxHaRJnaIuv3ldXb19YzS4tZBOrE4X4NQbwmgAdd0GXKgj0adNs69uvM73//uujm7od//LjBwd27fzFi9PH35jFFZ1mAG4NFEpGZfLjUHfk3ExlidNxxrGeLCQzhaE92xTUCk0dohq6ZXufqWhAN2xum6GbmqFbaIvX7ZpbE9IVZGXli6X5y4QpM7TVRGmAmq2x4XfOJP2Dh4zyxHe+Ntpky/30u92PPbb/hVPlt/44TaMKoN1cOm+lzMW08vLZFDyujTLm1m5+EUUDtYZNqSitjaFut5sXeRUKw0AU3Shm8jiJW20MRRKTE/Ga7klmUovL1ykILMD0uhumV6pPPvFPTz3U+veP37O8kri2lNVqyUfuDb/83MH1ijWfEWGRsY050QT/M5aWYIfG6KADTSzdTPjYhQtnzl3neVkVK2ilVGVIJpvJYChs4bCpKqogwDnFU+dQRfHDk1c1vGlmKT2zNGelGYrAT7x/4ruHO3/0xKPuxpGGxlhba4ygnYVydXePZddIQ65okpBVCvm3J8pzBQli2K1D/dlsZS3//9YEDmyv27Rl0IDUWC3XcAzLpDasrAUBaKksorpEYRBVdZfLms0VT5+asNgbEYsXko+hCk0BNhoJVjWfo64tV1h74913ltdzNGFNF4reAKjzOfJr1Tcvpc/HZRhm347BjfkbWfFmyD09AX79va//4Kcsou7r8sAJDnF57KU8x/OC3WqrVAWCpZ1OplqtwavR0uxfnrvx0Xt/ljUP7o7kaurmDo/LiW4kV9wO/NqS9oPfTFU5sa7JLRtoV2udVBT/8eXpC6mbLtXZ0UnIxUS+TDHYEw/vPX3thCW47+P3/1i7+FpFo+CojZIUo5sGSyA4jthsDgyT/A2W+GqKQSEfSvU+F2bwz/3imbv+6p7O3k6tJoZ8rYGAH5jS+lqunXV9PLaQzacxgOVW8899sFwW4RQKHI2Nm3tDk8tX+u/dva+z5aknvwnt6fTx58wrr7hamz65IuKGoVSLQq4gC4JB4qjTabs+NdcaiznczlopBwEYBbo/4Bdk6eXfvN7d27T9ttGq5njz/TehRFYWEtuHWjfS/BsnL/MAQCXhQW+TzPFl2ULBrd9oiHYX8vKt3U2og07nEuXEtV2x0IUsgHiJbh7saukItEU8Dhuxtr4RagpilJUr5D0eN4ITqqKSBMELIklZBoZbBXHjzyfe27xzp7eh8f23PnXXuVRD83mYvgAerSdiIx1BG41rBrTMdCqBAJlgPXql1FJPV4tFoSy09Awf+f38ic9T4UYPyrgCBCHfMdoFXX/s1BU4dPj8/rX4eqVYJBkGlhknSA3ecw1AlrezVkM1VQx7/F9/cujQ7tWFJZpG+apQlTWmvd2Cs7qqGghgCQxOU3Z3ncPOpHM5UcYEAcRXE32b+/1dO4uZTGv3KBrZPGqYFCQev68Osv6lMxOhQENLNFLOFVEThWhDEagiyoyNLOULLMHghPXi2HmA+Qf37BpfLXVu7mUpM6mBxkhLoM5pofFcVYUznwlAoVhVahWZYs9NTahCOpmKz61kvvKle3u7OtoGD6EWm3v/A487GzrrPe6vfOs+BI7rU9OmgcF/CjyPEdjG+sbAts37Dx4ONwSGRrYObR84/ck5AEo+rxveGLw+0H9LDBIVnFlIknK5WEGHcAMirR6OpvOZAkoQL756+uL5yzB/Fy9etvkaH/35O6zd938CDAB5qvlrJja8DwAAAABJRU5ErkJggg=="

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getOrganizeDetail
  var getOrganizeDetail = function getOrganizeDetail(state) {
    return state.organizeDetail;
  };
  
  var makeGetOrganizeDetail = function makeGetOrganizeDetail() {
    return (0, _reselect.createSelector)([getOrganizeDetail], function (organizeDetail) {
      return organizeDetail;
    });
  };
  
  exports.default = makeGetOrganizeDetail;

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  var getOrganizeUserList = function getOrganizeUserList(state) {
    return state.organizeUserList;
  };
  
  var makeGetOrganizeUserListSelector = function makeGetOrganizeUserListSelector() {
    return (0, _reselect.createSelector)([getOrganizeUserList], function (organizeUserList) {
      return organizeUserList;
    });
  };
  
  exports.default = makeGetOrganizeUserListSelector;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(63);
  
  //getUserList
  var getUserList = function getUserList(state) {
    return state.userList;
  };
  
  var makeGetUserListSelector = function makeGetUserListSelector() {
    return (0, _reselect.createSelector)([getUserList], function (userList) {
      return userList;
    });
  };
  
  exports.default = makeGetUserListSelector;

/***/ },
/* 226 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setRuntimeVariable = setRuntimeVariable;
  
  var _constants = __webpack_require__(38);
  
  function setRuntimeVariable(_ref) {
    var name = _ref.name,
        value = _ref.value;
  
    return {
      type: _constants.SET_RUNTIME_VARIABLE,
      payload: {
        name: name,
        value: value
      }
    };
  }

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map