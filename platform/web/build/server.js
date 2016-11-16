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
  
  var _typeof2 = __webpack_require__(1);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(4);
  
  var _path = __webpack_require__(5);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(6);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(7);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(8);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(10);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _Html = __webpack_require__(11);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _ErrorPage = __webpack_require__(13);
  
  var _ErrorPage2 = __webpack_require__(15);
  
  var _ErrorPage3 = _interopRequireDefault(_ErrorPage2);
  
  var _universalRouter = __webpack_require__(22);
  
  var _universalRouter2 = _interopRequireDefault(_universalRouter);
  
  var _prettyError = __webpack_require__(23);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _createHistory = __webpack_require__(24);
  
  var _createHistory2 = _interopRequireDefault(_createHistory);
  
  var _configureStore = __webpack_require__(28);
  
  var _configureStore2 = _interopRequireDefault(_configureStore);
  
  var _routes = __webpack_require__(43);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(227);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _runtime = __webpack_require__(228);
  
  var _users = __webpack_require__(212);
  
  var _toggleSidebar = __webpack_require__(58);
  
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
                        return store.dispatch((0, _users.fetchUserInfo)(token, ("development") == 'development'));
  
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
                            // setMeta: (key, value) => (data[key] = value),
                            pathname: req.path
                          },
                          render: function render(component) {
                            var status = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  
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
    var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(
      _Html2.default,
      {
        title: 'Internal Server Error',
        description: err.message,
        style: _ErrorPage3.default._getCss() // eslint-disable-line no-underscore-dangle
      },
      _server2.default.renderToString(_react2.default.createElement(_ErrorPage.ErrorPage, { error: err }))
    ));
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

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import { analytics } from '../config';
  
  function Html(_ref) {
    var title = _ref.title;
    var description = _ref.description;
    var bootstrapCss = _ref.bootstrapCss;
    var style = _ref.style;
    var script = _ref.script;
    var children = _ref.children;
    var state = _ref.state;
  
    return _react2.default.createElement(
      "html",
      { className: "no-js", lang: "" },
      _react2.default.createElement(
        "head",
        null,
        _react2.default.createElement("meta", { charSet: "utf-8" }),
        _react2.default.createElement("meta", { httpEquiv: "x-ua-compatible", content: "ie=edge" }),
        _react2.default.createElement(
          "title",
          null,
          title
        ),
        _react2.default.createElement("meta", { name: "description", content: description }),
        _react2.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        _react2.default.createElement("link", { rel: "apple-touch-icon", href: "apple-touch-icon.png" }),
        _react2.default.createElement("link", { rel: "stylesheet", href: "/icomoon/style.css" }),
        _react2.default.createElement("link", { rel: "stylesheet", href: bootstrapCss }),
        _react2.default.createElement("style", { id: "css", dangerouslySetInnerHTML: { __html: style } }),
        _react2.default.createElement("script", { id: "script" })
      ),
      _react2.default.createElement(
        "body",
        null,
        _react2.default.createElement("div", { id: "app", dangerouslySetInnerHTML: { __html: children } }),
        script && _react2.default.createElement("script", {
          id: "source",
          src: script,
          "data-initial-state": (0, _stringify2.default)(state)
        })
      )
    );
  }
  
  Html.propTypes = {
    title: _react.PropTypes.string.isRequired,
    description: _react.PropTypes.string.isRequired,
    style: _react.PropTypes.string.isRequired,
    script: _react.PropTypes.string,
    children: _react.PropTypes.string,
    state: _react.PropTypes.object.isRequired
  };
  
  exports.default = Html;

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ErrorPage = ErrorPage;
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
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
    } else if (true) {
      errorMessage = _react2.default.createElement(
        'pre',
        null,
        error.stack
      );
    }
  
    if (context.setTitle) {
      context.setTitle(title);
    }
  
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        title
      ),
      _react2.default.createElement(
        'p',
        null,
        content
      ),
      errorMessage
    );
  }
  
  ErrorPage.propTypes = { error: _react.PropTypes.object.isRequired };
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = ErrorPage;
  // export default withStyles(s)(ErrorPage);

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(16);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n", "", {"version":3,"sources":["/./routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;EACjB,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;;EAEE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(19);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(20);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(21);
  
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
/* 19 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(25);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(26);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(27);
  
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
/* 25 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = configureStore;
  
  var _redux = __webpack_require__(29);
  
  var _reduxThunk = __webpack_require__(30);
  
  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
  
  var _logger = __webpack_require__(31);
  
  var _logger2 = _interopRequireDefault(_logger);
  
  var _reducers = __webpack_require__(33);
  
  var _reducers2 = _interopRequireDefault(_reducers);
  
  var _createHelpers = __webpack_require__(38);
  
  var _createHelpers2 = _interopRequireDefault(_createHelpers);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function configureStore(initialState, helpersConfig) {
    var helpers = (0, _createHelpers2.default)(helpersConfig);
    var middleware = [_reduxThunk2.default.withExtraArgument(helpers)];
  
    var enhancer = void 0;
  
    if (true) {
      middleware.push((0, _logger2.default)());
  
      // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
      var devToolsExtension = function devToolsExtension(f) {
        return f;
      };
      if (false) {
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
/* 29 */
/***/ function(module, exports) {

  module.exports = require("redux");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("redux-thunk");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createLogger;
  
  var _util = __webpack_require__(32);
  
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
/* 32 */
/***/ function(module, exports) {

  module.exports = require("util");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(19);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _redux = __webpack_require__(29);
  
  var _runtime = __webpack_require__(34);
  
  var _runtime2 = _interopRequireDefault(_runtime);
  
  var _constants = __webpack_require__(37);
  
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? _constants.SIDEBAR_STATUS.OPEN : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.TOGGLE_SIDEBAR:
        return action.status;
      default:
        return state;
    }
  }
  
  function sidebarActive() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.SIDEBAR_ACTIVE:
        return action.payload;
      default:
        return state;
    }
  }
  
  function serviceList() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [1] : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? [1] : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_POD_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function serviceDetail() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? serviceData : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? { memory: {}, network: {}, cpu: {} } : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? [1] : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? { deploy: true, building: true, volume: true, autoStateUp: true, reviseBuilding: true,
      port: true, storage: true, env: true, command: true, pods: true, setOrg: true } : arguments[0];
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
      case Const.IS_BTN_STATE.setOrg:
        state.setOrg = action.payload;
        return (0, _assign2.default)({}, state);
      default:
        return state;
    }
  }
  
  function repos() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_REPO_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function isLoading() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.IS_LOADING:
        return action.payload;
      default:
        return state;
    }
  }
  
  function imageList() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [1] : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_IMAGE_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function imageDetail() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_IMAGE_DETAIL:
        return action.payload;
      default:
        return state;
    }
  }
  
  function user_info() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.RECEIVE_USER_INFO:
        return action.payload;
      default:
        return state;
    }
  }
  
  function breadcrumbList() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.BREADCRUMB_LIST:
        return action.payload;
      default:
        return state;
    }
  }
  
  function authUrl() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? { github: "", coding: "" } : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.GET_GITHUB_AUTH_URL:
        state.github = action.payload;
        return (0, _assign2.default)({}, state);
        break;
      case Const.GET_CODING_AUTH_URL:
        state.coding = action.payload;
        return (0, _assign2.default)({}, state);
        break;
      default:
        return state;
    }
  }
  
  function buildingImageList() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [1] : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_BUILDING_DETAIL:
        return action.payload;
      default:
        return state;
    }
  }
  
  function deployData() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? serviceData : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.RECEIVE_LOG:
        return [].concat(state).concat(action.payload);
      default:
        return state;
    }
  }
  
  function logs_xhr() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? [1] : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? { creation_time: "" } : arguments[0];
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
    var state = arguments.length <= 0 || arguments[0] === undefined ? [1] : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_ORGANIZE_USER_LIST:
        return action.payload;
        break;
      default:
        return state;
    }
  }
  function dashboard() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {
      cpu_b: "0%",
      cpu_limit: 0,
      cpu_usage: 0,
      memory_b: "0%",
      memory_limit: 0,
      memory_usage: 0,
      flag: 1
    } : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_DASHBOARD:
        return action.payload;
      default:
        return state;
    }
  }
  function userList() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_USER_LIST:
        return action.payload;
        break;
      default:
        return state;
    }
  }
  
  function balance() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case Const.GET_BALANCE:
        return action.payload;
      default:
        return state;
    }
  }
  
  var rootReducer = (0, _redux.combineReducers)({
    dashboard: dashboard,
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
    authUrl: authUrl,
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
    userList: userList,
    balance: balance
  });
  
  exports.default = rootReducer;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _defineProperty2 = __webpack_require__(35);
  
  var _defineProperty3 = _interopRequireDefault(_defineProperty2);
  
  var _extends3 = __webpack_require__(36);
  
  var _extends4 = _interopRequireDefault(_extends3);
  
  exports.default = runtime;
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function runtime() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.SET_RUNTIME_VARIABLE:
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, action.payload.name, action.payload.value));
      default:
        return state;
    }
  }

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 37 */
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
  var GET_DASHBOARD = exports.GET_DASHBOARD = 'GET_DASHBOARD';
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
  var GET_CODING_AUTH_URL = exports.GET_CODING_AUTH_URL = 'GET_CODING_AUTH_URL';
  var GET_BUILDING_IMAGE_LIST = exports.GET_BUILDING_IMAGE_LIST = "GET_BUILDING_IMAGE_LIST";
  var GET_BUILDING_DETAIL = exports.GET_BUILDING_DETAIL = 'GET_BUILDING_DETAIL';
  // userinfo
  var RECEIVE_USER_INFO = exports.RECEIVE_USER_INFO = "RECEIVE_USER_INFO";
  var GET_USER_LIST = exports.GET_USER_LIST = 'GET_USER_LIST';
  //user
  var GET_BALANCE = exports.GET_BALANCE = 'GET_BALANCE';
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
  
  var URL = true;
  
  if (URL) {
    URL = 'http://192.168.1.6:8080';
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
    USER_INFO_INTERNAL: 'http://auth:8080/user/userinfo',
    LOGS: 'http://logs.boxlinker.com/api/v1.0/logs/polling/labels',
    SVC_ENDPOINTS: function SVC_ENDPOINTS(name) {
      return 'http://ci-api.boxlinker.com/api/v1/endpoints/' + name;
    },
    IMAGE: URL + '/registry/image_repository',
    BUILDING_REVISE: URL + '/api/v1.0/repository/repositorybuilds',
    GET_SERVICE_MONITOR: 'http://monitor.boxlinker.com/api/v1/model/namespaces',
    DASHBOARD: 'http://controller.boxlinker.com/api/v1/broad',
  
    //new
    ORGANIZE: URL + '/api/v1.0/usercenter/orgs',
    TOKEN: URL + '/api/v1.0/usercenter/tokens',
    AUTH_URL: URL + '/api/v2.0/oauths/oauthurl'
  
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
  
  var CPU = exports.CPU = [{ x: 1, m: "50M" }];
  
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
    pods: 'PODS',
    setOrg: 'SET_ORG'
  };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  exports.default = createHelpers;
  
  var _fetch = __webpack_require__(39);
  
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
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(40);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(41);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(42);
  
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
/* 40 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _components = __webpack_require__(44);
  
  var _components2 = _interopRequireDefault(_components);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _dashboard = __webpack_require__(86);
  
  var _dashboard2 = _interopRequireDefault(_dashboard);
  
  var _imageCenter = __webpack_require__(102);
  
  var _imageCenter2 = _interopRequireDefault(_imageCenter);
  
  var _imageForPlatform = __webpack_require__(106);
  
  var _imageForPlatform2 = _interopRequireDefault(_imageForPlatform);
  
  var _imageForMy = __webpack_require__(110);
  
  var _imageForMy2 = _interopRequireDefault(_imageForMy);
  
  var _imageDetail = __webpack_require__(115);
  
  var _imageDetail2 = _interopRequireDefault(_imageDetail);
  
  var _createImage = __webpack_require__(127);
  
  var _createImage2 = _interopRequireDefault(_createImage);
  
  var _buildingDetail = __webpack_require__(135);
  
  var _buildingDetail2 = _interopRequireDefault(_buildingDetail);
  
  var _building = __webpack_require__(140);
  
  var _building2 = _interopRequireDefault(_building);
  
  var _buildingCreate = __webpack_require__(144);
  
  var _buildingCreate2 = _interopRequireDefault(_buildingCreate);
  
  var _error = __webpack_require__(148);
  
  var _error2 = _interopRequireDefault(_error);
  
  var _serviceList = __webpack_require__(149);
  
  var _serviceList2 = _interopRequireDefault(_serviceList);
  
  var _addService = __webpack_require__(152);
  
  var _addService2 = _interopRequireDefault(_addService);
  
  var _choseImage = __webpack_require__(160);
  
  var _choseImage2 = _interopRequireDefault(_choseImage);
  
  var _configContainer = __webpack_require__(165);
  
  var _configContainer2 = _interopRequireDefault(_configContainer);
  
  var _serviceDetail = __webpack_require__(175);
  
  var _serviceDetail2 = _interopRequireDefault(_serviceDetail);
  
  var _dataVolumeList = __webpack_require__(194);
  
  var _dataVolumeList2 = _interopRequireDefault(_dataVolumeList);
  
  var _login = __webpack_require__(199);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _signUp = __webpack_require__(201);
  
  var _signUp2 = _interopRequireDefault(_signUp);
  
  var _userCenter = __webpack_require__(204);
  
  var _userCenter2 = _interopRequireDefault(_userCenter);
  
  var _reviseImage = __webpack_require__(214);
  
  var _reviseImage2 = _interopRequireDefault(_reviseImage);
  
  var _organize = __webpack_require__(217);
  
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
  
      var next = _ref.next;
      var render = _ref.render;
      var context = _ref.context;
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
                return _context.abrupt('return', render(_react2.default.createElement(
                  _components2.default,
                  { context: context },
                  component
                )));
  
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRedux = __webpack_require__(50);
  
  var _AppContainer = __webpack_require__(51);
  
  var _AppContainer2 = _interopRequireDefault(_AppContainer);
  
  var _emptyFunction = __webpack_require__(85);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Root = function (_Component) {
    (0, _inherits3.default)(Root, _Component);
  
    function Root() {
      (0, _classCallCheck3.default)(this, Root);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Root).apply(this, arguments));
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
        return _react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(
            _AppContainer2.default,
            null,
            this.props.children
          )
        );
      }
    }]);
    return Root;
  }(_react.Component);
  
  Root.propTypes = {
    context: _react2.default.PropTypes.shape({
      createHref: _react2.default.PropTypes.func.isRequired,
      store: _react2.default.PropTypes.object.isRequired,
      insertCss: _react2.default.PropTypes.func,
      setTitle: _react2.default.PropTypes.func,
      setMeta: _react2.default.PropTypes.func,
      pathname: _react2.default.PropTypes.any
    }),
    children: _react2.default.PropTypes.element.isRequired,
    error: _react2.default.PropTypes.object
  };
  Root.childContextTypes = {
    createHref: _react2.default.PropTypes.func.isRequired,
    insertCss: _react2.default.PropTypes.func.isRequired,
    setTitle: _react2.default.PropTypes.func.isRequired,
    setMeta: _react2.default.PropTypes.func.isRequired,
    pathname: _react2.default.PropTypes.any
  };
  exports.default = Root;

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 46 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 49 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 50 */
/***/ function(module, exports) {

  module.exports = require("react-redux");

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(50);
  
  var _App = __webpack_require__(52);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _isSidebarOpenSelector = __webpack_require__(70);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _notificationsSelector = __webpack_require__(84);
  
  var _notificationsSelector2 = _interopRequireDefault(_notificationsSelector);
  
  var _notification = __webpack_require__(77);
  
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BreadcrumbContainer = __webpack_require__(53);
  
  var _BreadcrumbContainer2 = _interopRequireDefault(_BreadcrumbContainer);
  
  var _SidebarContainer = __webpack_require__(63);
  
  var _SidebarContainer2 = _interopRequireDefault(_SidebarContainer);
  
  var _HeaderContainer = __webpack_require__(72);
  
  var _HeaderContainer2 = _interopRequireDefault(_HeaderContainer);
  
  var _Notification = __webpack_require__(83);
  
  var _Notification2 = _interopRequireDefault(_Notification);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
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
        var notification = this.props.notifications.message ? _react2.default.createElement(_Notification2.default, { show: true, obj: this.props.notifications }) : _react2.default.createElement(_Notification2.default, { show: false, obj: this.props.notifications });
        return _react2.default.createElement(
          'div',
          { className: 'app effect aside-float aside-bright navbar-fixed mainnav-lg ' + (this.props.isSidebarOpen ? "" : "sidebar-close mainnav-sm"), id: 'container' },
          _react2.default.createElement(_HeaderContainer2.default, null),
          _react2.default.createElement(_SidebarContainer2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'containerPack' },
            _react2.default.createElement(
              'div',
              { className: 'containerInner' },
              _react2.default.createElement(_BreadcrumbContainer2.default, null),
              _react2.default.createElement(
                'div',
                { className: 'containerBody' },
                this.props.children
              )
            )
          ),
          notification
        );
      }
    }]);
    return App;
  }(_react.Component);
  
  App.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  App.propTypes = {
    isSidebarOpen: _react2.default.PropTypes.bool,
    notifications: _react2.default.PropTypes.object,
    onInit: _react2.default.PropTypes.func
  };
  exports.default = App;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(50);
  
  var _Breadcrumb = __webpack_require__(54);
  
  var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
  
  var _breadcrumbSelector = __webpack_require__(61);
  
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Breadcrumb = __webpack_require__(59);
  
  var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Breadcrumb = function (_Component) {
    (0, _inherits3.default)(Breadcrumb, _Component);
  
    function Breadcrumb() {
      (0, _classCallCheck3.default)(this, Breadcrumb);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Breadcrumb).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Breadcrumb, [{
      key: 'render',
      value: function render() {
        // console.log('breadcrumbList>>',this.props.breadcrumbList);
        var list = this.props.breadcrumbList,
            len = list.length;
        if (len <= 0) return _react2.default.createElement('ol', { className: _Breadcrumb2.default.root });
        if (len == 1) return _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'a',
            { className: _Breadcrumb2.default.selected },
            list[0].title
          )
        );
        var data = [];
        for (var i = 0; i < len - 1; i++) {
          var item = list[i];
          data.push(_react2.default.createElement(
            'li',
            { key: i },
            _react2.default.createElement(
              _Link2.default,
              { to: item.link },
              i == 0 ? _react2.default.createElement(
                'span',
                { className: 'icon-console', style: { marginRight: "5px" } },
                ' '
              ) : "",
              item.title
            )
          ));
          data.push(_react2.default.createElement(
            'li',
            { key: i + "1", className: _Breadcrumb2.default.split },
            '/'
          ));
        }
        data.push(_react2.default.createElement(
          'li',
          { key: len - 1 },
          _react2.default.createElement(
            'a',
            { className: _Breadcrumb2.default.selected },
            list[len - 1].title
          )
        ));
        return _react2.default.createElement(
          'ol',
          { className: _Breadcrumb2.default.root },
          data
        );
      }
    }]);
    return Breadcrumb;
  }(_react.Component);
  
  Breadcrumb.propTypes = {
    breadcrumbList: _react2.default.PropTypes.array
  };
  exports.default = (0, _withStyles2.default)(_Breadcrumb2.default)(Breadcrumb);

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(56);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRedux = __webpack_require__(50);
  
  var _route = __webpack_require__(57);
  
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
      var _Object$getPrototypeO;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Link)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
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
        var _props = this.props;
        var to = _props.to;
        var _ = _props.navigate;
        var props = (0, _objectWithoutProperties3.default)(_props, ['to', 'navigate']); // eslint-disable-line no-unused-vars
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: this.context.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    onClick: _react.PropTypes.func,
  
    // actions
    navigate: _react.PropTypes.func
  };
  Link.contextTypes = {
    createHref: _react.PropTypes.func.isRequired
  };
  
  
  var mapState = null;
  
  var mapDispatch = {
    navigate: _route.navigate
  };
  
  exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(Link);

/***/ },
/* 56 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.redirect = redirect;
  exports.navigate = navigate;
  
  var _toggleSidebar = __webpack_require__(58);
  
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toggleSidebarAction = toggleSidebarAction;
  exports.onChangeSidebarActiveAction = onChangeSidebarActiveAction;
  
  var _constants = __webpack_require__(37);
  
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(60);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Breadcrumb.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Breadcrumb.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, "\n.Breadcrumb_root_oz8{\n  background-color: #ffffff;\n  margin-bottom: 15px;\n  padding: 10px 20px;\n\n}\n.Breadcrumb_root_oz8>li{\n  display: inline-block;\n  margin-right: 10px;\n}\n.Breadcrumb_root_oz8>li>a{\n  color: #333;\n}\n.Breadcrumb_root_oz8>li>a>span{\n  color: #666;\n  font-size:15px;\n  font-weight:bold;\n  position: relative;\n  top:1px;\n}\n.Breadcrumb_root_oz8>li>a.Breadcrumb_selected_1Ed{\n  color: #a7a7a7;\n}\n.Breadcrumb_root_oz8>li>a.Breadcrumb_selected_1Ed:hover{\n  color: #a7a7a7;\n}\n\n", "", {"version":3,"sources":["/./components/Breadcrumb/Breadcrumb.css"],"names":[],"mappings":";AACA;EACE,0BAA0B;EAC1B,oBAAoB;EACpB,mBAAmB;;CAEpB;AACD;EACE,sBAAsB;EACtB,mBAAmB;CACpB;AACD;EACE,YAAY;CACb;AACD;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,QAAQ;CACT;AAED;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB","file":"Breadcrumb.css","sourcesContent":["\n.root{\n  background-color: #ffffff;\n  margin-bottom: 15px;\n  padding: 10px 20px;\n\n}\n.root>li{\n  display: inline-block;\n  margin-right: 10px;\n}\n.root>li>a{\n  color: #333;\n}\n.root>li>a>span{\n  color: #666;\n  font-size:15px;\n  font-weight:bold;\n  position: relative;\n  top:1px;\n}\n\n.root>li>a.selected{\n  color: #a7a7a7;\n}\n.root>li>a.selected:hover{\n  color: #a7a7a7;\n}\n\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Breadcrumb_root_oz8",
  	"selected": "Breadcrumb_selected_1Ed"
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 62 */
/***/ function(module, exports) {

  module.exports = require("reselect");

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(50);
  
  var _Sidebar = __webpack_require__(64);
  
  var _Sidebar2 = _interopRequireDefault(_Sidebar);
  
  var _isSidebarOpenSelector = __webpack_require__(70);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _sidebarActiveSelector = __webpack_require__(71);
  
  var _sidebarActiveSelector2 = _interopRequireDefault(_sidebarActiveSelector);
  
  var _toggleSidebar = __webpack_require__(58);
  
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _classnames = __webpack_require__(65);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Sidebar = __webpack_require__(66);
  
  var _Sidebar2 = _interopRequireDefault(_Sidebar);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _reactCookie = __webpack_require__(68);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _reactBootstrap = __webpack_require__(69);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function showIcon(className) {
    return _react2.default.createElement(
      'i',
      { className: (0, _classnames2.default)(_Sidebar2.default.listFA, className) },
      ' '
    );
  }
  
  var MenuListItem = function (_Component) {
    (0, _inherits3.default)(MenuListItem, _Component);
  
    function MenuListItem() {
      (0, _classCallCheck3.default)(this, MenuListItem);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MenuListItem).apply(this, arguments));
    }
  
    (0, _createClass3.default)(MenuListItem, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _Link2.default,
          { to: this.props.href, onClick: this.props.onClick },
          this.props.icon,
          this.props.children,
          this.props.rightIcon
        );
      }
    }]);
    return MenuListItem;
  }(_react.Component);
  
  MenuListItem.propTypes = {
    href: _react2.default.PropTypes.string.isRequired,
    icon: _react2.default.PropTypes.element.isRequired
  };
  
  var MenuList = function (_Component2) {
    (0, _inherits3.default)(MenuList, _Component2);
  
    function MenuList() {
      var _Object$getPrototypeO;
  
      (0, _classCallCheck3.default)(this, MenuList);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(MenuList)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  
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
        return _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            MenuListItem,
            {
              href: 'javascript:void(0)',
              icon: this.props.icon,
              rightIcon: _react2.default.createElement(
                'i',
                { className: 'arrow ' + (this.state.open ? "arrowOpen" : '') },
                ' '
              ),
              onClick: this.handleClick.bind(this)
            },
            this.props.title
          ),
          _react2.default.createElement(
            'div',
            { className: 'collapseItem ' + (this.state.open ? "" : "collapseItemHide") },
            this.props.children
          )
        );
      }
    }]);
    return MenuList;
  }(_react.Component);
  
  var ThinItem = function (_Component3) {
    (0, _inherits3.default)(ThinItem, _Component3);
  
    function ThinItem(props) {
      (0, _classCallCheck3.default)(this, ThinItem);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ThinItem).call(this, props));
  
      _this3.state = {
        tipShow: false
      };
      //menu-item
      return _this3;
    }
  
    (0, _createClass3.default)(ThinItem, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _Link2.default,
            { to: this.props.href, onClick: this.props.onClick,
              className: this.props.href == "javascript:;" && this.props.open ? "menu-item menuItemAction" : 'menu-item ' + this.props.className },
            this.props.icon
          ),
          _react2.default.createElement(
            'div',
            { className: 'thin-item-tip' },
            this.props.tip
          ),
          _react2.default.createElement(
            _reactBootstrap.Overlay,
            { placement: 'right' },
            _react2.default.createElement(
              _reactBootstrap.Tooltip,
              { id: 'overload-right' },
              'Tooltip overload!'
            )
          )
        );
      }
    }]);
    return ThinItem;
  }(_react.Component);
  
  ThinItem.propTypes = {
    icon: _react2.default.PropTypes.element.isRequired,
    tip: _react2.default.PropTypes.string.isRequired,
    href: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func,
    open: _react2.default.PropTypes.bool,
    isOpen: _react2.default.PropTypes.bool,
    className: _react2.default.PropTypes.string
  };
  
  var ThinList = function (_Component4) {
    (0, _inherits3.default)(ThinList, _Component4);
  
    function ThinList(props) {
      (0, _classCallCheck3.default)(this, ThinList);
  
      var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ThinList).call(this, props));
  
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
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(ThinItem, { href: this.props.href != "javascript:;" ? this.props.href : "javascript:;",
            open: this.state.collapse,
            isOpen: this.props.isOpen,
            onClick: this.handleClick.bind(this),
            icon: this.props.icon,
            tip: this.props.title,
            className: this.props.className
  
          }),
          _react2.default.createElement(
            _reactBootstrap.Collapse,
            { 'in': this.state.collapse },
            _react2.default.createElement(
              'div',
              null,
              this.props.children
            )
          )
        );
      }
    }]);
    return ThinList;
  }(_react.Component);
  
  ThinList.propTypes = {
    href: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func
  };
  
  var Sidebar = function (_Component5) {
    (0, _inherits3.default)(Sidebar, _Component5);
  
    function Sidebar() {
      (0, _classCallCheck3.default)(this, Sidebar);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Sidebar).apply(this, arguments));
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
      key: 'getList',
      value: function getList() {
        var open = this.props.isSidebarOpen;
        var is_user = this.context.store.getState().user_info.is_user;
        return open ? _react2.default.createElement(
          'div',
          { className: 'listPack' },
          _react2.default.createElement(
            'ul',
            { className: 'menuList list-group', id: 'mainnav-menu' },
            _react2.default.createElement(
              'li',
              { onClick: this.onChangeAction.bind(this, "/"),
                className: this.props.sidebarActive == "/" ? "subListAction" : "" },
              _react2.default.createElement(
                MenuListItem,
                { href: '/', icon: showIcon("icon-console") },
                '控制台'
              )
            ),
            _react2.default.createElement(
              MenuList,
              { title: '服务中心', icon: showIcon("icon-servicecenter") },
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/choseImage"),
                  className: this.props.sidebarActive == "/choseImage" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/choseImage', icon: showIcon("icon-New-service") },
                  '新建服务'
                )
              ),
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/serviceList"),
                  className: this.props.sidebarActive == "/serviceList" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/serviceList', icon: showIcon("icon-servicelist") },
                  '服务列表'
                )
              ),
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/volumes"),
                  className: this.props.sidebarActive == "/volumes" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/volumes', icon: showIcon("icon-storagemanag") },
                  '存储卷管理'
                )
              )
            ),
            _react2.default.createElement(
              MenuList,
              { title: '镜像中心', icon: showIcon("icon-mirrorceer") },
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/createImage"),
                  className: this.props.sidebarActive == "/createImage" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/createImage', icon: showIcon("icon-mirrorhouse") },
                  '新建镜像'
                )
              ),
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/imageForMy"),
                  className: this.props.sidebarActive == "/imageForMy" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/imageForMy', icon: showIcon("icon-mymirror") },
                  '我的镜像'
                )
              ),
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/imageForPlatform"),
                  className: this.props.sidebarActive == "/imageForPlatform" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/imageForPlatform', icon: showIcon("icon-formmirror") },
                  '平台镜像'
                )
              ),
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/building"),
                  className: this.props.sidebarActive == "/building" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/building', icon: showIcon("icon-codeconstruct") },
                  '代码构建'
                )
              )
            ),
            is_user == 1 ? _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/user"),
                  className: this.props.sidebarActive == "/user" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/user', icon: showIcon("icon-login") },
                  '用户中心'
                )
              )
            ) : _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'p',
                { onClick: this.onChangeAction.bind(this, "/organize"),
                  className: this.props.sidebarActive == "/organize" ? "subListAction" : "" },
                _react2.default.createElement(
                  MenuListItem,
                  { href: '/organize', icon: showIcon("icon-login") },
                  '组织中心'
                )
              )
            )
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'sidebar-menu-thin' },
          _react2.default.createElement(ThinList, {
            href: '/',
            title: '控制台',
            isOpen: false,
            icon: _react2.default.createElement(
              'i',
              { className: 'icon-console' },
              ' '
            ),
            onClick: this.onChangeAction.bind(this, "/"),
            className: this.props.sidebarActive == "/" ? "menuListAction" : ""
          }),
          _react2.default.createElement(
            ThinList,
            {
              href: 'javascript:;',
              title: '服务中心',
              isOpen: true,
              icon: _react2.default.createElement(
                'i',
                { className: 'icon-sanjiaoright' },
                ' '
              ),
              onClick: function onClick() {},
              className: ''
            },
            _react2.default.createElement(ThinItem, { href: '/choseImage', icon: _react2.default.createElement(
                'i',
                { className: 'icon-New-service' },
                ' '
              ), tip: '新建服务',
              onClick: this.onChangeAction.bind(this, "/choseImage"),
              className: this.props.sidebarActive == "/choseImage" ? "menuListAction" : ""
            }),
            _react2.default.createElement(ThinItem, { href: '/serviceList', icon: _react2.default.createElement(
                'i',
                { className: 'icon-servicelist' },
                ' '
              ), tip: '服务列表',
              onClick: this.onChangeAction.bind(this, "/serviceList"),
              className: this.props.sidebarActive == "/serviceList" ? "menuListAction" : ""
            }),
            _react2.default.createElement(ThinItem, { href: '/volumes', icon: _react2.default.createElement(
                'i',
                { className: 'icon-storagemanag' },
                ' '
              ), tip: '存储卷管理',
              onClick: this.onChangeAction.bind(this, "/volumes"),
              className: this.props.sidebarActive == "/volumes" ? "menuListAction" : ""
            })
          ),
          _react2.default.createElement(
            ThinList,
            {
              href: 'javascript:;',
              title: '镜像中心',
              isOpen: true,
              icon: _react2.default.createElement(
                'i',
                { className: 'icon-sanjiaoright' },
                ' '
              ),
              onClick: function onClick() {},
              className: ''
            },
            _react2.default.createElement(ThinItem, { href: '/imageForMy', icon: _react2.default.createElement(
                'i',
                { className: 'icon-mymirror' },
                ' '
              ), tip: '我的镜像',
              onClick: this.onChangeAction.bind(this, "/imageForMy"),
              className: this.props.sidebarActive == "/imageForMy" ? "menuListAction" : ""
            }),
            _react2.default.createElement(ThinItem, { href: '/imageForPlatform', icon: _react2.default.createElement(
                'i',
                { className: 'icon-formmirror' },
                ' '
              ), tip: '平台镜像',
              onClick: this.onChangeAction.bind(this, "/imageForPlatform"),
              className: this.props.sidebarActive == "/imageForPlatform" ? "menuListAction" : ""
            }),
            _react2.default.createElement(ThinItem, { href: '/building', icon: _react2.default.createElement(
                'i',
                { className: 'icon-codeconstruct' },
                ' '
              ), tip: '构建镜像',
              onClick: this.onChangeAction.bind(this, "/building"),
              className: this.props.sidebarActive == "/building" ? "menuListAction" : ""
            })
          ),
          is_user == 1 ? _react2.default.createElement(ThinList, {
            href: '/user',
            isOpen: false,
            title: '用户中心',
            icon: _react2.default.createElement(
              'i',
              { className: 'icon-login' },
              ' '
            ),
            onClick: this.onChangeAction.bind(this, "/user"),
            className: this.props.sidebarActive == "/user" ? "menuListAction" : ""
          }) : _react2.default.createElement(ThinList, {
            href: '/organize',
            isOpen: false,
            title: '组织中心',
            icon: _react2.default.createElement(
              'i',
              { className: 'icon-login' },
              ' '
            ),
            onClick: this.onChangeAction.bind(this, "/organize"),
            className: this.props.sidebarActive == "/organize" ? "menuListAction" : ""
          })
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'sidebar app-sidebar', id: 'mainnav' },
          this.getList()
        );
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
  Sidebar.propTypes = {
    isSidebarOpen: _react2.default.PropTypes.bool,
    sidebarActive: _react2.default.PropTypes.string,
    onChangeSidebarActive: _react2.default.PropTypes.func
  };
  exports.default = (0, _withStyles2.default)(_Sidebar2.default)(Sidebar);

/***/ },
/* 65 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(67);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Sidebar.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Sidebar.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, "\n.Sidebar_root_2SE {\n  position: fixed;\n  z-index:1;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 180px;\n  background-color: #21314b;\n}\n.Sidebar_listPack_3C3{\n  position: absolute;\n  top: 60px;\n  left: 0;\n  bottom:0;\n  right:0;\n  overflow: auto;\n}\n.Sidebar_menuList_Aik{\n  margin-top: 50px;\n  margin-left: 15px;\n}\n.Sidebar_toggler_3IY{\n  float: right;\n  padding: 2px;\n  -webkit-transition: all .3s ease;\n  -o-transition: all .3s ease;\n  transition: all .3s ease;\n  -webkit-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n       -o-transform: rotate(0deg);\n          transform: rotate(0deg);\n  display: block;\n  width: 14px;\n  height: 14px;\n  background-color: #444e5b;\n  margin-top: 2px;\n}\n.Sidebar_toggler_3IY:before{\n  content:\" \";\n  width: 2px;\n  height: 10px;\n  background-color: #fff;\n  left: 6px;\n  position: absolute;\n}\n.Sidebar_toggler_3IY:after{\n  content:\" \";\n  width: 10px;\n  height: 2px;\n  background-color: #fff;\n  top: 6px;\n  position: absolute;\n}\n.Sidebar_togglerOpen_203:before{\n  display: none;\n}\n/*.list li a:hover .toggler:after,.list li a:hover .toggler:before{*/\n/*background-color: #1ba4c6;*/\n/*}*/\n/*.list li a {*/\n/*display: block;*/\n/*padding: 15px 15px 15px 50px;*/\n/*transition:color ease .2s;*/\n/*}*/\n/*.list li a,.list li a:active,.list li a:visited{*/\n/*color: #fff;*/\n/*font-size:16px;*/\n/*}*/\n/*.list li a:hover{*/\n/*color: #09c8f4;*/\n/*}*/\n/*.list li:nth-child(2){*/\n/*font-size:0;*/\n/*}*/\n/*.listFA{*/\n/*float: left;*/\n/*width: 20px;*/\n/*height: 20px;*/\n/*font-size: 1.4em;*/\n/*margin-left: -30px;*/\n/*color:#999;*/\n/*transition:color ease .2s;*/\n/*}*/\n/*.list li a:hover .listFA{*/\n/*color:#1ba4c6;*/\n/*}*/\n/*.subList>li>a{*/\n/*padding-top: 8px;*/\n/*padding-bottom: 8px;*/\n/*}*/\n/*.subList>li>a,.subList>li>a:active,.subList>li>a:visited{*/\n/*color: #afafaf;*/\n/*font-size:14px;*/\n/*}*/\n/*.subList>li>a:hover{*/\n/*color: #09c8f4;*/\n/*}*/", "", {"version":3,"sources":["/./components/Sidebar/Sidebar.css"],"names":[],"mappings":";AACA;EACE,gBAAgB;EAChB,UAAU;EACV,QAAQ;EACR,OAAO;EACP,UAAU;EACV,aAAa;EACb,0BAA0B;CAC3B;AACD;EACE,mBAAmB;EACnB,UAAU;EACV,QAAQ;EACR,SAAS;EACT,QAAQ;EACR,eAAe;CAChB;AACD;EACE,iBAAiB;EACjB,kBAAkB;CACnB;AACD;EACE,aAAa;EACb,aAAa;EACb,iCAAyB;EAAzB,4BAAyB;EAAzB,yBAAyB;EACzB,gCAAwB;MAAxB,4BAAwB;OAAxB,2BAAwB;UAAxB,wBAAwB;EACxB,eAAe;EACf,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,uBAAuB;EACvB,UAAU;EACV,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,uBAAuB;EACvB,SAAS;EACT,mBAAmB;CACpB;AACD;EACE,cAAc;CACf;AACD,qEAAqE;AACnE,8BAA8B;AAChC,KAAK;AACL,gBAAgB;AACd,mBAAmB;AACnB,iCAAiC;AACjC,8BAA8B;AAChC,KAAK;AAEL,oDAAoD;AAClD,gBAAgB;AAChB,mBAAmB;AACrB,KAAK;AACL,qBAAqB;AAClB,mBAAmB;AACrB,KAAK;AACN,0BAA0B;AACxB,gBAAgB;AAClB,KAAK;AAEL,YAAY;AACV,gBAAgB;AAChB,gBAAgB;AAChB,iBAAiB;AACjB,qBAAqB;AACrB,uBAAuB;AACvB,eAAe;AACf,8BAA8B;AAChC,KAAK;AACL,6BAA6B;AAC3B,kBAAkB;AACpB,KAAK;AACL,kBAAkB;AACf,qBAAqB;AACrB,wBAAwB;AAE3B,KAAK;AAEL,6DAA6D;AAC3D,mBAAmB;AACnB,mBAAmB;AACrB,KAAK;AACL,wBAAwB;AACtB,mBAAmB;AACrB,KAAK","file":"Sidebar.css","sourcesContent":["\n.root {\n  position: fixed;\n  z-index:1;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 180px;\n  background-color: #21314b;\n}\n.listPack{\n  position: absolute;\n  top: 60px;\n  left: 0;\n  bottom:0;\n  right:0;\n  overflow: auto;\n}\n.menuList{\n  margin-top: 50px;\n  margin-left: 15px;\n}\n.toggler{\n  float: right;\n  padding: 2px;\n  transition: all .3s ease;\n  transform: rotate(0deg);\n  display: block;\n  width: 14px;\n  height: 14px;\n  background-color: #444e5b;\n  margin-top: 2px;\n}\n.toggler:before{\n  content:\" \";\n  width: 2px;\n  height: 10px;\n  background-color: #fff;\n  left: 6px;\n  position: absolute;\n}\n.toggler:after{\n  content:\" \";\n  width: 10px;\n  height: 2px;\n  background-color: #fff;\n  top: 6px;\n  position: absolute;\n}\n.togglerOpen:before{\n  display: none;\n}\n/*.list li a:hover .toggler:after,.list li a:hover .toggler:before{*/\n  /*background-color: #1ba4c6;*/\n/*}*/\n/*.list li a {*/\n  /*display: block;*/\n  /*padding: 15px 15px 15px 50px;*/\n  /*transition:color ease .2s;*/\n/*}*/\n\n/*.list li a,.list li a:active,.list li a:visited{*/\n  /*color: #fff;*/\n  /*font-size:16px;*/\n/*}*/\n/*.list li a:hover{*/\n   /*color: #09c8f4;*/\n /*}*/\n/*.list li:nth-child(2){*/\n  /*font-size:0;*/\n/*}*/\n\n/*.listFA{*/\n  /*float: left;*/\n  /*width: 20px;*/\n  /*height: 20px;*/\n  /*font-size: 1.4em;*/\n  /*margin-left: -30px;*/\n  /*color:#999;*/\n  /*transition:color ease .2s;*/\n/*}*/\n/*.list li a:hover .listFA{*/\n  /*color:#1ba4c6;*/\n/*}*/\n/*.subList>li>a{*/\n   /*padding-top: 8px;*/\n   /*padding-bottom: 8px;*/\n\n/*}*/\n\n/*.subList>li>a,.subList>li>a:active,.subList>li>a:visited{*/\n  /*color: #afafaf;*/\n  /*font-size:14px;*/\n/*}*/\n/*.subList>li>a:hover{*/\n  /*color: #09c8f4;*/\n/*}*/"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Sidebar_root_2SE",
  	"listPack": "Sidebar_listPack_3C3",
  	"menuList": "Sidebar_menuList_Aik",
  	"toggler": "Sidebar_toggler_3IY",
  	"togglerOpen": "Sidebar_togglerOpen_203"
  };

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("react-cookie");

/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap");

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(50);
  
  var _toggleSidebar = __webpack_require__(58);
  
  var _Header = __webpack_require__(73);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _organize = __webpack_require__(75);
  
  var funOrganize = _interopRequireWildcard(_organize);
  
  var _isSidebarOpenSelector = __webpack_require__(70);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _isLoadingSelector = __webpack_require__(81);
  
  var _isLoadingSelector2 = _interopRequireDefault(_isLoadingSelector);
  
  var _organizeListSelector = __webpack_require__(82);
  
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactLoading = __webpack_require__(74);
  
  var _reactLoading2 = _interopRequireDefault(_reactLoading);
  
  var _reactCookie = __webpack_require__(68);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _reactBootstrap = __webpack_require__(69);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Header = function (_Component) {
    (0, _inherits3.default)(Header, _Component);
  
    function Header() {
      (0, _classCallCheck3.default)(this, Header);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Header).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Header, [{
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
            _reactCookie2.default.remove('30589');
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
      key: 'onChangeSidebar',
      value: function onChangeSidebar() {
        this.props.onSidebarToggleClick(!this.props.isSidebarOpen);
        var exp = new Date();
        exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
        _reactCookie2.default.save('isSidebarOpen', !this.props.isSidebarOpen, { path: '/', expires: exp });
      }
    }, {
      key: 'handleClick',
      value: function handleClick(e) {
        if (e.target.innerText.trim() == "退出") {
          _reactCookie2.default.remove('_at');
          _reactCookie2.default.remove('30589');
          localStorage.removeItem('_at');
          localStorage.removeItem('sidebarActive');
          location.href = '/login';
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.getOrganizeList();
      }
    }, {
      key: 'getLogo',
      value: function getLogo() {
        var open = this.props.isSidebarOpen;
        return open ? _react2.default.createElement('img', { src: '/logo.png', alt: 'boxLinker', className: 'brand-icon' }) : _react2.default.createElement('img', { src: '/logo-small.png', alt: 'boxLinker', style: { width: "28px", height: "24px" }, className: 'brand-icon' });
      }
    }, {
      key: 'render',
      value: function render() {
        var username = this.context.store.getState().user_info.user_name;
        var is_user = this.context.store.getState().user_info.is_user;
        var user_orga = this.context.store.getState().user_info.user_orga;
        var menuItem = this.props.organizeList.map(function (item, i) {
          if (item.orga_name == username && is_user == 0) {
            return _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: i, key: i },
              _react2.default.createElement(
                'div',
                { className: 'headerOrgList' },
                _react2.default.createElement(
                  'p',
                  null,
                  item.orga_name
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  '切换到个人'
                )
              )
            );
          } else if (item.orga_name == user_orga) {} else {
            return _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: i, key: i },
              _react2.default.createElement(
                'div',
                { className: 'headerOrgList' },
                _react2.default.createElement(
                  'p',
                  null,
                  item.orga_name
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  '切换到该组织'
                )
              )
            );
          }
        });
        var dropdown = null;
        if (is_user == 0) {
          dropdown = user_orga ? _react2.default.createElement(
            _reactBootstrap.NavDropdown,
            { eventKey: 4, title: user_orga, id: 'header-nav-item-userinfo' },
            menuItem,
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: 4.1 },
              '退出'
            )
          ) : _react2.default.createElement(
            'button',
            { eventKey: 4.1, title: '退出', id: 'header-nav-item-que' },
            ' '
          );
        } else {
          dropdown = username ? _react2.default.createElement(
            _reactBootstrap.NavDropdown,
            { eventKey: 4, title: username, id: 'header-nav-item-userinfo' },
            menuItem,
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: 4.1 },
              '退出'
            )
          ) : _react2.default.createElement(
            'button',
            { eventKey: 4.1, title: '退出', id: 'header-nav-item-que' },
            ' '
          );
        }
        return _react2.default.createElement(
          'header',
          { id: 'navbar' },
          _react2.default.createElement(
            'div',
            { className: 'navbar-header logo' },
            _react2.default.createElement(
              'a',
              { href: 'index.html', className: 'navbar-brand' },
              this.getLogo()
            )
          ),
          _react2.default.createElement(
            'div',
            { id: 'navbar-container', className: 'boxed' },
            _react2.default.createElement(
              'div',
              { className: 'navbar-content clearfix' },
              _react2.default.createElement(
                'ul',
                { className: 'nav navbar-top-links pull-left' },
                _react2.default.createElement(
                  'li',
                  { className: 'tgl-menu-btn' },
                  _react2.default.createElement(
                    'a',
                    { className: 'mainnav-toggle', href: 'javascript:;',
                      onClick: this.onChangeSidebar.bind(this)
                    },
                    _react2.default.createElement(
                      'i',
                      { className: this.props.isSidebarOpen ? "icon-withdraw" : "icon-back", 'aria-hidden': 'true' },
                      ' '
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'ul',
                { className: 'nav navbar-top-links pull-right' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.Nav,
                    { onSelect: this.handleSelect.bind(this) },
                    dropdown
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: 'aside-toggle navbar-aside-icon' },
                    _react2.default.createElement(
                      'i',
                      { className: 'pci-ver-dots' },
                      ' '
                    )
                  )
                )
              )
            )
          )
        );
      }
    }, {
      key: 'render1',
      value: function render1() {
        return _react2.default.createElement(
          _reactBootstrap.Navbar,
          { fixedTop: true, className: 'app-navbar', onClick: this.handleClick.bind(this) },
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { onSelect: this.handleSelect.bind(this) },
            _react2.default.createElement(
              _reactBootstrap.NavItem,
              { eventKey: 1.1, href: 'javascript:void(0)' },
              _react2.default.createElement('i', { className: this.props.isSidebarOpen ? "icon-withdraw" : "icon-back", 'aria-hidden': 'true' })
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { pullRight: true, onSelect: this.handleSelect.bind(this), style: { marginRight: "0" } },
            _react2.default.createElement(
              _reactBootstrap.NavItem,
              { className: 'loading-animation' },
              this.props.isLoading ? _react2.default.createElement(_reactLoading2.default, { type: 'bubbles', color: '#fff', height: '50px', width: '50px' }) : null
            ),
            dropdown
          )
        );
      }
    }]);
    return Header;
  }(_react.Component);
  
  Header.propTypes = {
    isLoading: _react2.default.PropTypes.bool,
    isSidebarOpen: _react2.default.PropTypes.bool.isRequired,
    onSidebarToggleClick: _react2.default.PropTypes.func,
    organizeList: _react2.default.PropTypes.array,
    getOrganizeList: _react2.default.PropTypes.func,
    changeAccount: _react2.default.PropTypes.func
  };
  Header.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  exports.default = Header;

/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = require("react-loading");

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
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
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(77);
  
  var _reactCookie = __webpack_require__(68);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _route = __webpack_require__(57);
  
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
              dispatch((0, _notification.receiveNotification)({ message: "退出成功", level: "success" }));
              var exp = new Date();
              exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
              _reactCookie2.default.save('_at', json.result.token, { path: '/', expires: exp });
              localStorage.setItem("_at", json.result.token);
              location.href = '/';
              setTimeout(function () {
                dispatch((0, _notification.clearNotification)());
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
              dispatch((0, _notification.receiveNotification)({ message: "解散成功", level: "success" }));
              var exp = new Date();
              exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
              _reactCookie2.default.save('_at', json.result.token, { path: '/', expires: exp });
              localStorage.setItem("_at", json.result.token);
              location.href = '/';
              setTimeout(function () {
                dispatch((0, _notification.clearNotification)());
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
  
  function isLoading(state) {
    return {
      type: Const.IS_BTN_STATE.setOrg,
      payload: state
    };
  }
  
  function fetchSetOrganizeDetailAction(data) {
    var body = (0, _stringify2.default)({
      orga_detail: data.orga_detail,
      is_public: String(data.is_public)
    });
    console.log(body, "修改组织参数");
    var myInit = {
      method: "PUT",
      headers: { token: localStorage.getItem("_at") },
      body: body
    };
    var url = Const.FETCH_URL.ORGANIZE;
    return function (dispatch) {
      dispatch(isLoading(false));
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "修改组织返回值");
        dispatch(isLoading(true));
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
          dispatch((0, _notification.receiveNotification)({ message: "设置成功", level: "success" }));
          dispatch(fetchGetOrganizeUserListAction(data.orga_uuid));
          var exp = new Date();
          exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 7);
          _reactCookie2.default.save('_at', json.result.token, { path: '/', expires: exp });
          localStorage.setItem("_at", json.result.token);
          location.href = '/';
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

/***/ },
/* 76 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-fetch");

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.emit = exports.init = exports.clearNotification = exports.receiveNotification = undefined;
  
  var _constants = __webpack_require__(37);
  
  var _serviceDetail = __webpack_require__(78);
  
  var _socket = __webpack_require__(80);
  
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
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
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(79);
  
  var _notification = __webpack_require__(77);
  
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isLoadingAction = isLoadingAction;
  
  var _constants = __webpack_require__(37);
  
  var _route = __webpack_require__(57);
  
  function isLoadingAction(flag) {
    return {
      type: _constants.IS_LOADING,
      payload: flag
    };
  }

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = require("socket.io-client");

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _class = function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
    }
  
    (0, _createClass3.default)(_class, [{
      key: 'render',
      value: function render() {
        var text = this.props.obj.message;
        return _react2.default.createElement(
          _reactBootstrap.Alert,
          { bsStyle: this.props.obj.level || "success", className: !this.props.show ? "notification" : "notification notificationShow" },
          text
        );
      }
    }]);
    return _class;
  }(_react2.default.Component);
  
  _class.propTypes = {
    obj: _react2.default.PropTypes.object
  };
  exports.default = _class;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 85 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _DashboardContainer = __webpack_require__(87);
  
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
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_DashboardContainer2.default, null));
  
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _Dashboard = __webpack_require__(88);
  
  var _Dashboard2 = _interopRequireDefault(_Dashboard);
  
  var _reactRedux = __webpack_require__(50);
  
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
  
  var _dashboardSelector = __webpack_require__(100);
  
  var _dashboardSelector2 = _interopRequireDefault(_dashboardSelector);
  
  var _dashboard = __webpack_require__(101);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selectorServiceList = (0, _serviceListSelector2.default)();
    var selectorImage = (0, _imageListSelector2.default)();
    var selectorVolumesList = (0, _volumesListSelector2.default)();
    var selectorDashboard = (0, _dashboardSelector2.default)();
    return {
      serviceList: selectorServiceList(state),
      imageList: selectorImage(state),
      volumesList: selectorVolumesList(state),
      dashboard: selectorDashboard(state)
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
      },
      onDashboardLoad: function onDashboardLoad() {
        dispatch((0, _dashboard.fetchGetDashboardAction)());
      }
    };
  };
  
  var DashboardContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Dashboard2.default);
  
  exports.default = DashboardContainer;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Dashboard = __webpack_require__(89);
  
  var _Dashboard2 = _interopRequireDefault(_Dashboard);
  
  var _classnames = __webpack_require__(65);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _constants = __webpack_require__(37);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ReactHighcharts = __webpack_require__(92);
  
  var Panel1Box = function (_Component) {
    (0, _inherits3.default)(Panel1Box, _Component);
  
    function Panel1Box() {
      (0, _classCallCheck3.default)(this, Panel1Box);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Panel1Box).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Panel1Box, [{
      key: 'render',
      value: function render() {
        var url = this.props.url;
        return url ? _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_Dashboard2.default.p1Box, this.props.theme) },
          _react2.default.createElement(
            _Link2.default,
            { to: this.props.url },
            _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)(_Dashboard2.default.p1BoxLeft, "p1box_left") },
              _react2.default.createElement(
                'i',
                { className: (0, _classnames2.default)("bg_dis", this.props.className) },
                ' '
              ),
              _react2.default.createElement(
                'i',
                { className: (0, _classnames2.default)("bg_hover", 'icon-link') },
                ' '
              ),
              _react2.default.createElement(
                'span',
                { className: 'bg_hover bg_detail' },
                '查看详情'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Dashboard2.default.p1BoxRight },
            this.props.children
          )
        ) : _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_Dashboard2.default.p1Box, this.props.theme) },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_Dashboard2.default.p1BoxLeft, "p1box_left") },
            _react2.default.createElement(
              'i',
              { className: (0, _classnames2.default)("bg_dis", this.props.className) },
              ' '
            ),
            _react2.default.createElement(
              'i',
              { className: (0, _classnames2.default)("bg_hover", 'icon-link') },
              ' '
            ),
            _react2.default.createElement(
              'span',
              { className: 'bg_hover bg_detail' },
              '查看详情'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Dashboard2.default.p1BoxRight },
            this.props.children
          )
        );
      }
    }]);
    return Panel1Box;
  }(_react.Component);
  
  var ResourceDetail = function (_Component2) {
    (0, _inherits3.default)(ResourceDetail, _Component2);
  
    function ResourceDetail() {
      (0, _classCallCheck3.default)(this, ResourceDetail);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ResourceDetail).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ResourceDetail, [{
      key: 'render',
      value: function render() {
        var serviceLength = this.props.serviceList[0] == 1 ? 0 : this.props.serviceList.length;
        var imageLength = this.props.imageList[0] == 1 ? 0 : this.props.imageList.length;
        var volumesLength = this.props.volumesList[0] == 1 ? 0 : this.props.volumesList.length;
        return _react2.default.createElement(
          _reactBootstrap.Panel,
          { header: '资源详细' },
          _react2.default.createElement(
            'ul',
            { className: _Dashboard2.default.p1List },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _Link2.default,
                { to: '/serviceList' },
                _react2.default.createElement(
                  Panel1Box,
                  { theme: 'p1box_svc', className: 'icon-service' },
                  _react2.default.createElement(
                    'p',
                    { className: _Dashboard2.default.p1BoxRightTxt },
                    '服务',
                    _react2.default.createElement(
                      'i',
                      null,
                      'services'
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                      'i',
                      { className: _Dashboard2.default.p1BoxRightNum },
                      serviceLength
                    ),
                    '个'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _Link2.default,
                { to: '/imageForMy' },
                _react2.default.createElement(
                  Panel1Box,
                  { theme: 'p1box_image', className: 'icon-mirrorceer' },
                  _react2.default.createElement(
                    'p',
                    { className: _Dashboard2.default.p1BoxRightTxt },
                    '镜像',
                    _react2.default.createElement(
                      'i',
                      null,
                      'images'
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                      'i',
                      { className: _Dashboard2.default.p1BoxRightNum },
                      imageLength
                    ),
                    '个'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _Link2.default,
                { to: '/volumes' },
                _react2.default.createElement(
                  Panel1Box,
                  { theme: 'p1box_pro', className: 'icon-project' },
                  _react2.default.createElement(
                    'p',
                    { className: _Dashboard2.default.p1BoxRightTxt },
                    '数据卷',
                    _react2.default.createElement(
                      'i',
                      null,
                      'volumes'
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                      'i',
                      { className: _Dashboard2.default.p1BoxRightNum },
                      volumesLength
                    ),
                    '个'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                Panel1Box,
                { theme: 'p1box_new', className: 'icon-new', url: '/choseImage' },
                _react2.default.createElement(
                  _Link2.default,
                  { to: '/choseImage' },
                  _react2.default.createElement(
                    'p',
                    { className: _Dashboard2.default.p1BoxRightTxt },
                    '新建服务',
                    _react2.default.createElement(
                      'i',
                      { className: _Dashboard2.default.p1BoxNewSvcTip },
                      'new service'
                    )
                  )
                ),
                _react2.default.createElement(
                  'a',
                  { className: _Dashboard2.default.p1BoxDescTxt },
                  '什么是容器云服务?'
                )
              )
            )
          )
        );
      }
    }]);
    return ResourceDetail;
  }(_react.Component);
  
  // Highcharts.getOptions().plotOptions.pie.colors=["red","blue"]
  
  
  ResourceDetail.propTypes = {
    serviceList: _react2.default.PropTypes.array,
    imageList: _react2.default.PropTypes.array,
    volumesList: _react2.default.PropTypes.array
  };
  
  var Monitor = function (_Component3) {
    (0, _inherits3.default)(Monitor, _Component3);
  
    function Monitor() {
      (0, _classCallCheck3.default)(this, Monitor);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Monitor).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Monitor, [{
      key: 'render',
      value: function render() {
        var dashboard = this.props.dashboard;
        // if(dashboard.flag) return <div style = {{textAlign:"center"}}><Loading /></div>
        var cpu_b = Number(parseFloat(dashboard.cpu_b).toFixed(2));
        var userCpu_b = 100 - cpu_b;
        var memory_b = Number(parseFloat(dashboard.memory_b).toFixed(2));
        var userMemory_b = 100 - memory_b;
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
            data: [['used', userCpu_b], ['unUsed', cpu_b]],
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
            data: [['used', userMemory_b], ['unUsed', memory_b]],
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
        return _react2.default.createElement(
          _reactBootstrap.Panel,
          { header: '资源配额使用情况', className: _Dashboard2.default.monitor },
          _react2.default.createElement(
            'div',
            { className: _Dashboard2.default.resourceBox },
            _react2.default.createElement(
              'div',
              { className: _Dashboard2.default.resourceItem },
              _react2.default.createElement(
                'div',
                { className: _Dashboard2.default.resourceLeft },
                _react2.default.createElement(
                  'p',
                  null,
                  'CPU总剩余量',
                  _react2.default.createElement('br', null),
                  _react2.default.createElement(
                    'span',
                    null,
                    cpu_b,
                    '%'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.hcItem },
                  _react2.default.createElement(
                    ReactHighcharts,
                    { config: config1 },
                    ' '
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: _Dashboard2.default.resourceRight },
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.resourceHd },
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      null,
                      'CPU'
                    ),
                    '（核）使用情况'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.resourceBd },
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '总数量'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        dashboard.cpu_limit.toFixed(2)
                      ),
                      '核'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '已使用'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        dashboard.cpu_usage.toFixed(2)
                      ),
                      '核'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '剩余数'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        dashboard.cpu_limit.toFixed(2) - dashboard.cpu_usage.toFixed(2)
                      ),
                      '核'
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _Dashboard2.default.resourceItem },
              _react2.default.createElement(
                'div',
                { className: _Dashboard2.default.resourceLeft },
                _react2.default.createElement(
                  'p',
                  null,
                  '内存总剩余量',
                  _react2.default.createElement('br', null),
                  _react2.default.createElement(
                    'span',
                    null,
                    memory_b,
                    '%'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.hcItem },
                  _react2.default.createElement(
                    ReactHighcharts,
                    { config: config2 },
                    ' '
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: _Dashboard2.default.resourceRight },
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.resourceHd },
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      null,
                      '内存'
                    ),
                    '（MB）使用情况'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.resourceBd },
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '总数量'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        dashboard.memory_limit.toFixed(2)
                      ),
                      'MB'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '已使用'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        dashboard.memory_usage.toFixed(2)
                      ),
                      'MB'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '剩余数'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        dashboard.memory_limit.toFixed(2) - dashboard.memory_usage.toFixed(2)
                      ),
                      'MB'
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _Dashboard2.default.resourceItem },
              _react2.default.createElement(
                'div',
                { className: _Dashboard2.default.resourceLeft },
                _react2.default.createElement(
                  'p',
                  null,
                  '数据卷总剩余量',
                  _react2.default.createElement('br', null),
                  _react2.default.createElement(
                    'span',
                    null,
                    '70%'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.hcItem },
                  _react2.default.createElement(
                    ReactHighcharts,
                    { config: config3 },
                    ' '
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: _Dashboard2.default.resourceRight },
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.resourceHd },
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      null,
                      '数据卷'
                    ),
                    '（G）使用情况'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _Dashboard2.default.resourceBd },
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '总数量'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        '10'
                      ),
                      'G'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '已使用'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        '3'
                      ),
                      'G'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _Dashboard2.default.resourceInfo },
                    _react2.default.createElement(
                      'p',
                      null,
                      '剩余数'
                    ),
                    _react2.default.createElement(
                      'p',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        '7'
                      ),
                      'G'
                    )
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return Monitor;
  }(_react.Component);
  
  Monitor.propTypes = {
    dashboard: _react2.default.PropTypes.object
  };
  
  var AccountInfo = function (_Component4) {
    (0, _inherits3.default)(AccountInfo, _Component4);
  
    function AccountInfo() {
      (0, _classCallCheck3.default)(this, AccountInfo);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AccountInfo).apply(this, arguments));
    }
  
    (0, _createClass3.default)(AccountInfo, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _reactBootstrap.Panel,
          { header: '账户信息', className: _Dashboard2.default.accountInfo },
          _react2.default.createElement(
            'div',
            { className: _Dashboard2.default.accountInfoBody },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { className: _Dashboard2.default.accountInfoSubT },
                '账户余额'
              )
            ),
            _react2.default.createElement(
              'p',
              { className: _Dashboard2.default.accountInfoBalance },
              _react2.default.createElement(
                'span',
                { className: _Dashboard2.default.accountInfoMoney },
                '-123.07'
              ),
              '元',
              _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'primary' },
                '充值'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Dashboard2.default.accountInfoBody },
            _react2.default.createElement(
              'p',
              { className: _Dashboard2.default.accountInfoBusiness },
              '2016.8.19'
            ),
            _react2.default.createElement(
              'p',
              { style: { lineHeight: "34px" } },
              _react2.default.createElement(
                'span',
                { className: _Dashboard2.default.accountInfoSubT },
                '最近交易'
              ),
              _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'primary', className: 'pull-right' },
                '查看'
              )
            )
          )
        );
      }
    }]);
    return AccountInfo;
  }(_react.Component);
  
  var title = '控制台';
  
  var Dashboard = function (_Component5) {
    (0, _inherits3.default)(Dashboard, _Component5);
  
    function Dashboard() {
      (0, _classCallCheck3.default)(this, Dashboard);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Dashboard).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Dashboard, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.CONSOLE);
        this.props.onServiceListLoad();
        this.props.onImageListLoad();
        this.props.onVolumesListLoad();
        this.props.onDashboardLoad();
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle(title);
        var serviceList = this.props.serviceList;
        var imageList = this.props.imageList;
        var volumesList = this.props.volumesList;
        var data = this.props.dashboard;
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_Dashboard2.default.root, "containerPadding") },
          _react2.default.createElement(ResourceDetail, {
            serviceList: serviceList,
            imageList: imageList,
            volumesList: volumesList
          }),
          _react2.default.createElement(
            'div',
            { className: _Dashboard2.default.row },
            _react2.default.createElement(Monitor, { dashboard: data }),
            _react2.default.createElement(AccountInfo, null)
          )
        );
      }
    }]);
    return Dashboard;
  }(_react.Component);
  
  Dashboard.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  Dashboard.propTypes = {
    setBreadcrumb: _react2.default.PropTypes.func,
    serviceList: _react2.default.PropTypes.array,
    onServiceListLoad: _react2.default.PropTypes.func,
    imageList: _react2.default.PropTypes.array,
    onImageListLoad: _react2.default.PropTypes.func,
    volumesList: _react2.default.PropTypes.array,
    onVolumesListLoad: _react2.default.PropTypes.func,
    onDashboardLoad: _react2.default.PropTypes.func,
    dashboard: _react2.default.PropTypes.object
  };
  exports.default = (0, _withStyles2.default)(_Dashboard2.default)(Dashboard);

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(90);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Dashboard.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Dashboard.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, "\n.Dashboard_root_hHQ{}\n\n.Dashboard_p1List_3ar >li{\n  display: inline-block;\n  margin-right: 15px;\n}\n\n.Dashboard_p1Box__Nl{\n  display: inline-block;\n  background: #f3f4f9;\n  border-radius: .4em;\n  overflow: hidden;\n  border-width: 1px;\n  border-style: solid;\n  /*border: 1px solid #57c8f2;*/\n  cursor: pointer;\n}\n\n.Dashboard_p1BoxLeft_3KS{\n  float: left;\n  text-align: center;\n  /*background: #57c8f2;*/\n  padding: 30px 25px;\n  height: 115px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.Dashboard_p1BoxLeft_3KS > span{\n   display: block;\n   margin: 15px auto;\n   font-size: 40px;\n   color: white;\n }\n\n.Dashboard_p1BoxRight_1C5{\n  display: inline-block;\n  padding: 5px 20px;\n  height: 115px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.Dashboard_p1BoxRight_1C5>span{\n  color:#333;\n}\n\n.Dashboard_p1BoxRightNum_3iO{\n  font-style: normal;\n  font-size: 38px;\n  margin-right: 5px;\n}\n\n.Dashboard_p1BoxRightTxt_TzE{\n  margin: 15px 0 10px ;\n  font-size: 18px;\n  color:#333;\n}\n\n.Dashboard_p1BoxRightTxt_TzE>i{\n   font-size: 12px;\n   color: #b5b5b5;\n   margin-left: 5px;\n }\n\n.Dashboard_p1BoxDescTxt_1hx{\n  color: #b5b5b5;\n  font-style: italic;\n  display: inline-block;\n  margin-top: 10px;\n}\n\n.Dashboard_p1BoxNewSvcTip_2if{\n  display: block;\n  margin: 0 !important;\n}\n\n.Dashboard_row_3yW{\n  position: relative;\n}\n\n.Dashboard_accountInfo_2_K{\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 250px;\n}\n\n.Dashboard_accountInfoBody_2Jo{\n  border-bottom: 1px dashed #ccc;\n  padding: 15px;\n  margin: 0 -15px -15px;\n}\n\n.Dashboard_accountInfoBody_2Jo:first-child{\n  margin-top: -15px;\n}\n\n.Dashboard_accountInfoBody_2Jo:last-child{\n  border-bottom: 0;\n}\n\n.Dashboard_accountInfoSubT_3Lg{\n  color: #ccc;\n}\n\n.Dashboard_accountInfoBalance_1JR{\n  margin-top: 5px;\n}\n\n.Dashboard_accountInfoBusiness_eCG{\n  font-size: 16px;\n  margin: 20px 0 5px 0;\n}\n\n.Dashboard_accountInfoBalance_1JR>button{\n   float: right;\n   margin-top: 7px;\n }\n\n.Dashboard_accountInfoBalance_1JR:after{\n   clear: both;\n }\n\n.Dashboard_accountInfoMoney_1Bw{\n  font-size: 32px;\n  color: #fe6137;\n  margin-right: 5px;\n}\n\n.Dashboard_monitor_34J{\n  margin-right: 260px;\n}\n\n.Dashboard_chart_1O7{\n  width: 100%;\n  height: 300px;\n}\n\n.Dashboard_resourceBox_3MB{\n  padding:0 20px 30px 20px;\n  margin-top:-15px;\n}\n\n.Dashboard_resourceItem_2Iz{\n  position: relative;\n  border-bottom:1px solid #e8e8e8;\n  padding:15px 0;\n}\n\n.Dashboard_resourceItem_2Iz:last-child{\n  border:0;\n}\n\n.Dashboard_resourceItem_2Iz:nth-child(2) .Dashboard_resourceHd_1j1 p span{\n  color:#ff6c60;\n}\n\n.Dashboard_resourceItem_2Iz:nth-child(3) .Dashboard_resourceHd_1j1 p span{\n  color:#2ecc71;\n}\n\n.Dashboard_resourceItem_2Iz:nth-child(1) .Dashboard_resourceLeft_1pu>p>span{\n  color:#56c8f2;\n}\n\n.Dashboard_resourceItem_2Iz:nth-child(2) .Dashboard_resourceLeft_1pu>p>span{\n  color:#ff6c60;\n}\n\n.Dashboard_resourceItem_2Iz:nth-child(3) .Dashboard_resourceLeft_1pu>p>span{\n  color:#2ecc71;\n}\n\n.Dashboard_resourceLeft_1pu{\n  width:240px;\n  height:155px;\n  position: absolute;\n  top:10px;\n  left:0;\n  overflow:hidden;\n}\n\n.Dashboard_resourceLeft_1pu:after{\n  content:\"\";\n  display:inline-block;\n  width:1px;\n  background:#e8e8e8;\n  height:93px;\n  position: absolute;\n  right:0;\n  top:25px;\n}\n\n.Dashboard_resourceLeft_1pu>p{\n  position: absolute;\n  color:#333;\n  display: inline-block;\n  z-index:2;\n  top:75px;\n  left:24px;\n  text-align:center;\n  min-width:98px;\n}\n\n.Dashboard_resourceLeft_1pu>p>span{\n  font-size:20px;\n}\n\n.Dashboard_hcItem_1zh{\n  width:125px;\n  height:125px;\n  margin-top:20px;\n}\n\n.Dashboard_resourceRight_2EV{\n  margin-left:240px;\n  height:155px;\n  padding-left:70px;\n  padding-right:60px;\n}\n\n.Dashboard_resourceHd_1j1{\n  padding-bottom:10px;\n  border-bottom:1px solid #e8e8e8;\n}\n\n.Dashboard_resourceHd_1j1 p{\n  color:#666;\n  padding-top:7px;\n}\n\n.Dashboard_resourceHd_1j1 p span{\n  font-size:18px;\n  color:#56c8f2;\n}\n\n.Dashboard_resourceBd_1XI{\n}\n\n.Dashboard_resourceInfo_1vF{\n  width:35%;\n  display:inline-block;\n  position: relative;\n  padding-top:15px;\n  text-align: center;\n}\n\n.Dashboard_resourceInfo_1vF:after{\n  content: '';\n  width:1px;\n  height:58px;\n  position: absolute;\n  top:14px;\n  right:0;\n  background:#e8e8e8;\n}\n\n.Dashboard_resourceInfo_1vF:first-child{\n  text-align: left;\n  width:32%;\n}\n\n.Dashboard_resourceInfo_1vF:last-child{\n  width:30%;\n}\n\n.Dashboard_resourceInfo_1vF:last-child:after{\n  display:none;\n}\n\n.Dashboard_resourceInfo_1vF p{\n  color:#666;\n}\n\n.Dashboard_resourceInfo_1vF p:last-child{\n  color:#333;\n}\n\n.Dashboard_resourceInfo_1vF p span{\n  font-size:28px;\n}\n\n", "", {"version":3,"sources":["/./components/Dashboard/Dashboard.css"],"names":[],"mappings":";AACA,qBAAO;;AAEP;EACE,sBAAsB;EACtB,mBAAmB;CACpB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;EACpB,oBAAoB;EACpB,iBAAiB;EACjB,kBAAkB;EAClB,oBAAoB;EACpB,8BAA8B;EAC9B,gBAAgB;CACjB;;AAED;EACE,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;EACxB,mBAAmB;EACnB,cAAc;EACd,+BAAuB;UAAvB,uBAAuB;CACxB;;AACD;GACG,eAAe;GACf,kBAAkB;GAClB,gBAAgB;GAChB,aAAa;EACd;;AAEF;EACE,sBAAsB;EACtB,kBAAkB;EAClB,cAAc;EACd,+BAAuB;UAAvB,uBAAuB;CACxB;;AACD;EACE,WAAW;CACZ;;AACD;EACE,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;CACnB;;AACD;EACE,qBAAqB;EACrB,gBAAgB;EAChB,WAAW;CACZ;;AACD;GACG,gBAAgB;GAChB,eAAe;GACf,iBAAiB;EAClB;;AACF;EACE,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,iBAAiB;CAClB;;AACD;EACE,eAAe;EACf,qBAAqB;CACtB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,OAAO;EACP,SAAS;EACT,aAAa;CACd;;AACD;EACE,+BAA+B;EAC/B,cAAc;EACd,sBAAsB;CACvB;;AAED;EACE,kBAAkB;CACnB;;AACD;EACE,iBAAiB;CAClB;;AACD;EACE,YAAY;CACb;;AACD;EACE,gBAAgB;CACjB;;AACD;EACE,gBAAgB;EAChB,qBAAqB;CACtB;;AACD;GACG,aAAa;GACb,gBAAgB;EACjB;;AACF;GACG,YAAY;EACb;;AACF;EACE,gBAAgB;EAChB,eAAe;EACf,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,YAAY;EACZ,cAAc;CACf;;AACD;EACE,yBAAyB;EACzB,iBAAiB;CAClB;;AACD;EACE,mBAAmB;EACnB,gCAAgC;EAChC,eAAe;CAChB;;AACD;EACE,SAAS;CACV;;AACD;EACE,cAAc;CACf;;AACD;EACE,cAAc;CACf;;AACD;EACE,cAAc;CACf;;AACD;EACE,cAAc;CACf;;AACD;EACE,cAAc;CACf;;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,OAAO;EACP,gBAAgB;CACjB;;AACD;EACE,WAAW;EACX,qBAAqB;EACrB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;EACnB,QAAQ;EACR,SAAS;CACV;;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,sBAAsB;EACtB,UAAU;EACV,SAAS;EACT,UAAU;EACV,kBAAkB;EAClB,eAAe;CAChB;;AACD;EACE,eAAe;CAChB;;AACD;EACE,YAAY;EACZ,aAAa;EACb,gBAAgB;CACjB;;AACD;EACE,kBAAkB;EAClB,aAAa;EACb,kBAAkB;EAClB,mBAAmB;CACpB;;AACD;EACE,oBAAoB;EACpB,gCAAgC;CACjC;;AACD;EACE,WAAW;EACX,gBAAgB;CACjB;;AACD;EACE,eAAe;EACf,cAAc;CACf;;AACD;CACC;;AACD;EACE,UAAU;EACV,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,mBAAmB;CACpB;;AACD;EACE,YAAY;EACZ,UAAU;EACV,YAAY;EACZ,mBAAmB;EACnB,SAAS;EACT,QAAQ;EACR,mBAAmB;CACpB;;AACD;EACE,iBAAiB;EACjB,UAAU;CACX;;AACD;EACE,UAAU;CACX;;AACD;EACE,aAAa;CACd;;AACD;EACE,WAAW;CACZ;;AACD;EACE,WAAW;CACZ;;AACD;EACE,eAAe;CAChB","file":"Dashboard.css","sourcesContent":["\n.root{}\n\n.p1List >li{\n  display: inline-block;\n  margin-right: 15px;\n}\n\n.p1Box{\n  display: inline-block;\n  background: #f3f4f9;\n  border-radius: .4em;\n  overflow: hidden;\n  border-width: 1px;\n  border-style: solid;\n  /*border: 1px solid #57c8f2;*/\n  cursor: pointer;\n}\n\n.p1BoxLeft{\n  float: left;\n  text-align: center;\n  /*background: #57c8f2;*/\n  padding: 30px 25px;\n  height: 115px;\n  box-sizing: border-box;\n}\n.p1BoxLeft > span{\n   display: block;\n   margin: 15px auto;\n   font-size: 40px;\n   color: white;\n }\n\n.p1BoxRight{\n  display: inline-block;\n  padding: 5px 20px;\n  height: 115px;\n  box-sizing: border-box;\n}\n.p1BoxRight>span{\n  color:#333;\n}\n.p1BoxRightNum{\n  font-style: normal;\n  font-size: 38px;\n  margin-right: 5px;\n}\n.p1BoxRightTxt{\n  margin: 15px 0 10px ;\n  font-size: 18px;\n  color:#333;\n}\n.p1BoxRightTxt>i{\n   font-size: 12px;\n   color: #b5b5b5;\n   margin-left: 5px;\n }\n.p1BoxDescTxt{\n  color: #b5b5b5;\n  font-style: italic;\n  display: inline-block;\n  margin-top: 10px;\n}\n.p1BoxNewSvcTip{\n  display: block;\n  margin: 0 !important;\n}\n\n.row{\n  position: relative;\n}\n\n.accountInfo{\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 250px;\n}\n.accountInfoBody{\n  border-bottom: 1px dashed #ccc;\n  padding: 15px;\n  margin: 0 -15px -15px;\n}\n\n.accountInfoBody:first-child{\n  margin-top: -15px;\n}\n.accountInfoBody:last-child{\n  border-bottom: 0;\n}\n.accountInfoSubT{\n  color: #ccc;\n}\n.accountInfoBalance{\n  margin-top: 5px;\n}\n.accountInfoBusiness{\n  font-size: 16px;\n  margin: 20px 0 5px 0;\n}\n.accountInfoBalance>button{\n   float: right;\n   margin-top: 7px;\n }\n.accountInfoBalance:after{\n   clear: both;\n }\n.accountInfoMoney{\n  font-size: 32px;\n  color: #fe6137;\n  margin-right: 5px;\n}\n\n.monitor{\n  margin-right: 260px;\n}\n\n.chart{\n  width: 100%;\n  height: 300px;\n}\n.resourceBox{\n  padding:0 20px 30px 20px;\n  margin-top:-15px;\n}\n.resourceItem{\n  position: relative;\n  border-bottom:1px solid #e8e8e8;\n  padding:15px 0;\n}\n.resourceItem:last-child{\n  border:0;\n}\n.resourceItem:nth-child(2) .resourceHd p span{\n  color:#ff6c60;\n}\n.resourceItem:nth-child(3) .resourceHd p span{\n  color:#2ecc71;\n}\n.resourceItem:nth-child(1) .resourceLeft>p>span{\n  color:#56c8f2;\n}\n.resourceItem:nth-child(2) .resourceLeft>p>span{\n  color:#ff6c60;\n}\n.resourceItem:nth-child(3) .resourceLeft>p>span{\n  color:#2ecc71;\n}\n.resourceLeft{\n  width:240px;\n  height:155px;\n  position: absolute;\n  top:10px;\n  left:0;\n  overflow:hidden;\n}\n.resourceLeft:after{\n  content:\"\";\n  display:inline-block;\n  width:1px;\n  background:#e8e8e8;\n  height:93px;\n  position: absolute;\n  right:0;\n  top:25px;\n}\n.resourceLeft>p{\n  position: absolute;\n  color:#333;\n  display: inline-block;\n  z-index:2;\n  top:75px;\n  left:24px;\n  text-align:center;\n  min-width:98px;\n}\n.resourceLeft>p>span{\n  font-size:20px;\n}\n.hcItem{\n  width:125px;\n  height:125px;\n  margin-top:20px;\n}\n.resourceRight{\n  margin-left:240px;\n  height:155px;\n  padding-left:70px;\n  padding-right:60px;\n}\n.resourceHd{\n  padding-bottom:10px;\n  border-bottom:1px solid #e8e8e8;\n}\n.resourceHd p{\n  color:#666;\n  padding-top:7px;\n}\n.resourceHd p span{\n  font-size:18px;\n  color:#56c8f2;\n}\n.resourceBd{\n}\n.resourceInfo{\n  width:35%;\n  display:inline-block;\n  position: relative;\n  padding-top:15px;\n  text-align: center;\n}\n.resourceInfo:after{\n  content: '';\n  width:1px;\n  height:58px;\n  position: absolute;\n  top:14px;\n  right:0;\n  background:#e8e8e8;\n}\n.resourceInfo:first-child{\n  text-align: left;\n  width:32%;\n}\n.resourceInfo:last-child{\n  width:30%;\n}\n.resourceInfo:last-child:after{\n  display:none;\n}\n.resourceInfo p{\n  color:#666;\n}\n.resourceInfo p:last-child{\n  color:#333;\n}\n.resourceInfo p span{\n  font-size:28px;\n}\n\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Dashboard_root_hHQ",
  	"p1List": "Dashboard_p1List_3ar",
  	"p1Box": "Dashboard_p1Box__Nl",
  	"p1BoxLeft": "Dashboard_p1BoxLeft_3KS",
  	"p1BoxRight": "Dashboard_p1BoxRight_1C5",
  	"p1BoxRightNum": "Dashboard_p1BoxRightNum_3iO",
  	"p1BoxRightTxt": "Dashboard_p1BoxRightTxt_TzE",
  	"p1BoxDescTxt": "Dashboard_p1BoxDescTxt_1hx",
  	"p1BoxNewSvcTip": "Dashboard_p1BoxNewSvcTip_2if",
  	"row": "Dashboard_row_3yW",
  	"accountInfo": "Dashboard_accountInfo_2_K",
  	"accountInfoBody": "Dashboard_accountInfoBody_2Jo",
  	"accountInfoSubT": "Dashboard_accountInfoSubT_3Lg",
  	"accountInfoBalance": "Dashboard_accountInfoBalance_1JR",
  	"accountInfoBusiness": "Dashboard_accountInfoBusiness_eCG",
  	"accountInfoMoney": "Dashboard_accountInfoMoney_1Bw",
  	"monitor": "Dashboard_monitor_34J",
  	"chart": "Dashboard_chart_1O7",
  	"resourceBox": "Dashboard_resourceBox_3MB",
  	"resourceItem": "Dashboard_resourceItem_2Iz",
  	"resourceHd": "Dashboard_resourceHd_1j1",
  	"resourceLeft": "Dashboard_resourceLeft_1pu",
  	"hcItem": "Dashboard_hcItem_1zh",
  	"resourceRight": "Dashboard_resourceRight_2EV",
  	"resourceBd": "Dashboard_resourceBd_1XI",
  	"resourceInfo": "Dashboard_resourceInfo_1vF"
  };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Loading = function (_Component) {
    (0, _inherits3.default)(Loading, _Component);
  
    function Loading() {
      (0, _classCallCheck3.default)(this, Loading);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Loading).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Loading, [{
      key: "render",
      value: function render() {
        return _react2.default.createElement("div", { className: "listRefresh icon-refresh" });
      }
    }]);
    return Loading;
  }(_react.Component);
  
  exports.default = Loading;

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
  
  var _constants = __webpack_require__(37);
  
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
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchAllServicesAction = fetchAllServicesAction;
  exports.fetchDeleteServiceAction = fetchDeleteServiceAction;
  exports.fetchChangeStateAction = fetchChangeStateAction;
  exports.refreshServiceList = refreshServiceList;
  
  var _constants = __webpack_require__(37);
  
  var _header = __webpack_require__(79);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(77);
  
  var _serviceDetail = __webpack_require__(78);
  
  var _route = __webpack_require__(57);
  
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
          dispatch((0, _notification.receiveNotification)({ message: "获取列表失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(receiveServices([]));
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
  
  var _reselect = __webpack_require__(62);
  
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
  
  var _constants = __webpack_require__(37);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(79);
  
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
  
  var _reselect = __webpack_require__(62);
  
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
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.receiveVolumes = receiveVolumes;
  exports.refreshVolumeList = refreshVolumeList;
  exports.createVolume = createVolume;
  exports.scaleVolume = scaleVolume;
  exports.deleteVolume = deleteVolume;
  exports.fetchVolumesListAction = fetchVolumesListAction;
  
  var _constants = __webpack_require__(37);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(79);
  
  var _notification = __webpack_require__(77);
  
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
  
  function fetchVolumesListAction() {
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
          dispatch((0, _notification.receiveNotification)({ message: "获取列表失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
          dispatch(receiveVolumes([]));
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
  
  var _reselect = __webpack_require__(62);
  
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
  
  var _reselect = __webpack_require__(62);
  
  //getDashboard
  var getDashboardData = function getDashboardData(state) {
    return state.dashboard;
  };
  
  var makeGetDashboardData = function makeGetDashboardData() {
    return (0, _reselect.createSelector)([getDashboardData], function (dashboard) {
      return dashboard;
    });
  };
  
  exports.default = makeGetDashboardData;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fetchGetDashboardAction = fetchGetDashboardAction;
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(77);
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveDashboard(data) {
    return {
      type: Const.GET_DASHBOARD,
      payload: data
    };
  }
  
  function fetchGetDashboardAction() {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL.DASHBOARD;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "资源使用情况");
        if (json.status == 0) {
          dispatch(receiveDashboard(json.result));
        } else {
          dispatch((0, _notification.receiveNotification)({ message: "获取资源信息失败:" + json.msg, level: "danger" }));
          setTimeout(function () {
            dispatch((0, _notification.clearNotification)());
          }, 3000);
        }
      });
    };
  }

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageCenterContainer = __webpack_require__(103);
  
  var _ImageCenterContainer2 = _interopRequireDefault(_ImageCenterContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/imageCenter',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_ImageCenterContainer2.default, null));
  
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageCenter = __webpack_require__(104);
  
  var _ImageCenter2 = _interopRequireDefault(_ImageCenter);
  
  var _reactRedux = __webpack_require__(50);
  
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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ImageCenter = function (_React$Component) {
    (0, _inherits3.default)(ImageCenter, _React$Component);
  
    function ImageCenter() {
      (0, _classCallCheck3.default)(this, ImageCenter);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageCenter).apply(this, arguments));
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
          return _react2.default.createElement(
            'div',
            { className: 'imagesListItem', key: i },
            _react2.default.createElement(
              'div',
              { className: 'hd' },
              _react2.default.createElement(
                'div',
                { className: 'imagesListHd' },
                _react2.default.createElement(_reactBootstrap.Checkbox, { readOnly: true }),
                _react2.default.createElement('img', { width: 40, height: 40, src: __webpack_require__(105), alt: 'img' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'imagesListInfo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  '镜像名称'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:;' },
                    item
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'bd clearfix' },
              _react2.default.createElement(
                'span',
                { className: 'icon-collection' },
                '收藏'
              ),
              _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'primary', bsSize: 'small' },
                '部署'
              )
            )
          );
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
            return _react2.default.createElement(
              'div',
              { className: 'imagesListItem', key: i },
              _react2.default.createElement(
                'div',
                { className: 'hd' },
                _react2.default.createElement(
                  'div',
                  { className: 'imagesListHd' },
                  _react2.default.createElement('img', { width: 40, height: 40, src: __webpack_require__(105), alt: 'img' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'imagesListInfo' },
                  _react2.default.createElement(
                    'h1',
                    null,
                    '镜像名称'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: 'javascript:;' },
                      item
                    )
                  )
                )
              )
            );
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('镜像中心');
        var panelHd = _react2.default.createElement(
          'div',
          { className: 'clearfix imgHd' },
          _react2.default.createElement(
            'span',
            null,
            '镜像仓库'
          ),
          _react2.default.createElement(
            'a',
            { href: 'javascript:;' },
            '什么是容器镜像？'
          ),
          _react2.default.createElement(
            'div',
            { className: 'imgDropBox' },
            _react2.default.createElement(
              _reactBootstrap.DropdownButton,
              { bsSize: 'xs', title: '操作', id: 'dropDown', className: 'dropDownForOpt' },
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: '1' },
                '全选'
              ),
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: '2' },
                '删除'
              ),
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: '2' },
                '置顶'
              )
            )
          )
        );
        return _react2.default.createElement(
          'div',
          { className: 'images containerPadding' },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { className: 'image-left', header: panelHd },
            _react2.default.createElement(
              'div',
              { className: 'imagesListBox' },
              this.getImageList()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'image-right' },
            _react2.default.createElement(
              'div',
              { className: 'imageSearch' },
              _react2.default.createElement(
                'div',
                { className: 'search' },
                _react2.default.createElement('input', { type: 'text', placeholder: '搜索镜像', ref: 'searchInput', className: 'slSearchInp' }),
                _react2.default.createElement(
                  'a',
                  { type: 'button', className: 'slSearchBtn icon-select' },
                  ' '
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel,
              { className: 'imagesRankingList', header: '排行榜' },
              this.getImageTopTen(10)
            )
          )
        );
      }
    }]);
    return ImageCenter;
  }(_react2.default.Component);
  
  ImageCenter.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  ImageCenter.propTypes = {
    imageList: _react2.default.PropTypes.array,
    onImageList: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func
  };
  exports.default = ImageCenter;

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmIzYTA5MS1mZTUwLTRkOGMtOGQ1NS1kYTcxMDUyYjdkMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Q0OTkxN0E2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Q0OTkxNzk2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphOThjNzgzOS1kYWE3LTQ3ZjgtODAzOS1jMzc0ZmIzYmI1ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTZiM2EwOTEtZmU1MC00ZDhjLThkNTUtZGE3MTA1MmI3ZDI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QujMrwAAEShJREFUeNoklwlwW9d1hu/b38PDvpAgQJAgARLcRdGUSEvULtoj2+NFdSUnTpzVcTqx04xqx0mbpO2kiVuntptmJq63xHXqZOptbMmSFduSbUqyJEoiKYukxJ0ECBD79vD2rVcpBjPA4A3uufec/57/O4hpmqV0/B8effTCx59u6qyP9odeeumTNR384blHBpyOyeNnTZIcR0sffHT1W4ObhvcMapJiwclaMpPJVSRNRRHU5rQ7vQ4Uw6UaTyCApdnrawlRqp5b2njjagYA8N+//nY00pktg46QVcccgc59LrcXEbnc8Zd+duTI83fu7fF1ugRO2dzT72moy01N5T+dcfaGUYJ5dfzK9pHub23biaPoeialKEYqkayVeBtDYhimKKqpqHarRdK0hXQhGvQVKrVkoex3EZdWMq9dSu24JfjDxw9fnY+7rZTL7saopgN3fw2vxC9m19MNTqs/4vIG/Y3WoKvBd+HdY34V7/nyqI+xrYpXHefTYa5DUqW15LpY4RDUxFFDR6RSVbNZGYCiMoryGgAIYiXxM7OLODAZhlYUent7c7bInbySvHd+ZaivV+P1pUwi6Eme+uhFVOdz8ZV0uM3vaw70tXSUeP4XTz5tqahbDo5aFGXuwuUC8Ox75MskyybOX+AW1tR4lspxUo4zaiaBAVM3EcS0kDRBIjRBRJvqBlsaw/UNGADrhY10gfvy7sFGAJ5//RyOoSiGRgMh3TBZYOJA1+eXkwDVtar8yceXfvXKyVd/eF9XX++1sfHZU+eGnvm322+7DVHNZGrl8/96JtrThKOYmi83IuhGhccU1QJQXpQMUwMGShKUrmk1iadxgiUJ3WSz1bIOtK+PRE+tZhYT61VJ3BJul2S8UitgdoUb//zqnYe2yaLy5vHxfS3uA9u2TF2crKXWAw8e3H7wXm49IdWKGGNdWV7sbg51bepBGYuVZZ1WhkIMRREFUTPhCTCcwDCSpHNlbmY9meNLmqoF3V5eUVVENCuSNejx+N0UgrtsjumlWXzq4sxXH7vXHWmcPTvT3ujc0xFJrG2oKEojwOv0M4ylqmqMhZVV9fPTn9A3GvA9u1OZtFLlDNUgEFORDRxDdAOKFyEIJFeqMCTZ4mkoCTXT1DYqJStFaSilySLCcQxtX9lI9kXavC4v9rdH7mno6ipXax4L2+WwuRiqwokkhlM4lcrFiXBbpD1qGubrL7z07u9O9fUGM+sJXhKZeq/FabfQsMigVIExYK1NeHBZVVYz+Y1yRZB5WHaWosuCkOE4VeFJigj1dUmiAEsTCTTj7tZIqVjEUSTg82iFWiVfZAN+XRIkgNgr3AdPHDm/d//yF5NHXzv72O3t/YEQ6rBYaLq8lkzmK1WoLHjbaJIgMVXXVU0Puj11bmeFl/LF7MR6AjNxv92FYchCtTB1ebFzT9rh8RQLhfnkGnbn7VsIgpSFmjCzRAiauzvCBv2Spoc6mm0EETQBNznJyNKj33/g7sMHm4f66ttaAUlpiqIgmIwhNENSJMKLoiqrqKEpKpSKhhgGTVlkycARE8Ogbk2X3ZZYq3j8lkA0oiuiZhg4AcMS+NhHl25h7aDOKxqIx+HAVTU3s2jqiD3S1tzVXqzkZ+fmv5iZRmi0nONKhYrLTmmqIfN8rVrDEAoBgKZp1kJGmkOqrH8yPaNpGrw+KGoYnGkYIBpsDPk20sl0LzA1HVCwlqzVfvbYybHPro5++6Az6AckUVpZk/Mc5ferLHl5ZpI1gc1AbR6vq96JaBoVwkmLlU/na/lSY7iJtjskHeqKhMXGCZwrVRauL9dZQqYqybDgQFyppSs8PLxc1VS3CjdhwMzDHOCVVOrK+FxbU9DrdaMGJlf4Klcp6qqZLlokoQ21dsTabQ47zlgFQ5dkmEu+LFXzZrlg0/JCDlM3+HyWL3FQaA4rwtV42dBaeygG6qCkLcxJmAYoDFTFmiIC1BCBYaAIZgAdV8s1imZjPhdAiclr10xSozHKFOW2UNBTH+YkaSG1Id24YUiVEi/UcAMD8gtH52/b4xndGRAFhQRouNUa9Pk9dvZGsjx9w8xw4kpGMDCxO2p74Js9mcVyKS78x0eL1wpqzFlHEaCGoYim4zhGEdTNjpOt5stimeJhreyM1b1eFj6cnJ1JljZyvIaAO/cH77urOdIYQAi/J/LBxfF4vSs8tDNULolOC7mWL7/69vyrxxLTmXyQZrd0s6Kkv300v2cHf3hfIBxETEMF1nBs5Et8Yc7jcpc5DLv/wLZEKtPAss3+BhS1tfR2lg25YqSTXO7SQj7SYh3Y5KUJ8Keja/EVnSaxwc6mgd27OuqRsxdmdIB5bfhSNv+jZy/++uhCkwv93v2h+w74RobqRnfW793m++J6cTXBbW53XpjKrOWLodaWs+fmq6kbg1v7sW8c2kdRVHo9TeMYT2rJYuLtd4/b3Wi2aO2N2h86NLBnODa8uakzavlwbP75E/PrMzNb+1qaWgZwkNN1yWZhjp9dfedk7rZea6QZpPLKK2+tvXAs+c6x+K097Df+uifLi4SAXFutLRWlicuTiysb49NpLrWMHb5jRBTltURW1KRz4+eOnVwM1wHWE6t3UQ9/5ZZ0rvrSq5++/valXC6bylS2trmurqBqcXZk9x4NYR1oNs8by0nOAdRCsbQmeI+Pb3AqCHg8eVE8fqGwvcXS0+1Px7mz1/Mp+ODm62Z3nYtz6NWJ6yJX23/Xrt6RW8PhWCQAbA6XnSEePNi/Fi888fOPf/v+0pmZytgEl82DxfnCoQMuymHkizWcdEEBw2zHImyxmPOF65/+yVfpv6z93cPDpjH28P07H3l6Sq1KdfV0rQbtGliJm0/rPM6HHv4men58Zmjb1q39PXKNJzHE0EG+rG7e1CCIwtQc9/3HHmp3AR2A/3z27zLmzMDQpqMf3hgaaIGgYwIMGBiK45WCWE7JX7q7jZNE6S+BP/t8BiDM3u0DHhcxey2FmoYsy/CXWBRaM+CqNZ+LQUdvHx7Z3itL0okT52ysDScQXQcBv/fUqUs7YA6a6q+XAFxuamIKCMX2WFMkGlZlQOGIoinQkSicNHVsqKO+lEhRGD8UjgzbwJWp1RC+5Ze/+sNTP95LGoZQ1opwCYpsibTCwKKq/en53+Iet4sr8haWcTkZHdUdrN3qtmq6EQwH7QQH8EB/nbUraP/s5Fjklf3tfR3P/fR+vjxblWBUFL4RE1jrbaFO9+p0wd28/J2/GTr/HrjdCc5M5+872BJwa7KNgF5VhgExxOW0w8/uZhds6thQW9Dp80F4mLh81emgOY4PBpzN4XqGtWWyie5I2NfUklwvNPgCkgmOfO/W/haHpOIGwsJeptZWUYyu8AJlpzXOSK0lXW4+ELYAxtg67G0J2SVRxK32bKL259mC1eVscLM3FuJtrcHl5QyumEi1UoVSW1xaGdlxEFp6YnnBzToZCzq9XL409flALOL37knEVx54sK3Fx2zwdk0vmpqAai5NQywkhgKMZMnoraH8SqGSr1mcdGPAouu4JnK4zUk6mhPp6/CgfLF8+sSZaKvf53VVNIB6nc5ildc0w+e08YJEUAxENBPBW4PhehvDS8r1hVk7XrxtS0PQZZWIKGRN3Cj6Gjpo2qKbKuQNj9MmiIpi6t5WT0trwGv30KTdQWnQMQ33LjVXmFrIw8CmJnX0Re6688B7H13ubWTQvk09xUIxXygCAmNZi83mMglHhSupuC0S3RoLNjT5PKipcYrNdA1DrMytX5tOaqlUSlf45sgITtIzN1YXZtKqZGqaCXEAwaAJcDhjlwMPbExOx698dv5mXDA6HNt/xx1vvvT7He30z556BFd1I76caGoM1bncOEb6fHar3Te/EI/FqvZAO2bxwJ1CGWGUy0BQsTRX5/ZxSu6t15+1Opyxvq6ZL64X5oUdo1GH08JVBBhA1wSCwPT60dXxi+b0sSzik7Ry/6buAwfvfvKHTw2GsSP//Jgi6/iZz85CRsRwXJA0nMS4qmS3Mpev5qPRKzEoIV+zKNJAl9VqRuHjqswRCBJrcA5/7ztLefvTv/ydgmFL08VYF+8P2FUrI9UkzCii3tGlqdna+f8N9bY/+9o83M09e3ufeeZFFoCHvjEKELxYKqK5dIWiGRxHaRJnaIuv3ldXb19YzS4tZBOrE4X4NQbwmgAdd0GXKgj0adNs69uvM73//uujm7od//LjBwd27fzFi9PH35jFFZ1mAG4NFEpGZfLjUHfk3ExlidNxxrGeLCQzhaE92xTUCk0dohq6ZXufqWhAN2xum6GbmqFbaIvX7ZpbE9IVZGXli6X5y4QpM7TVRGmAmq2x4XfOJP2Dh4zyxHe+Ntpky/30u92PPbb/hVPlt/44TaMKoN1cOm+lzMW08vLZFDyujTLm1m5+EUUDtYZNqSitjaFut5sXeRUKw0AU3Shm8jiJW20MRRKTE/Ga7klmUovL1ykILMD0uhumV6pPPvFPTz3U+veP37O8kri2lNVqyUfuDb/83MH1ijWfEWGRsY050QT/M5aWYIfG6KADTSzdTPjYhQtnzl3neVkVK2ilVGVIJpvJYChs4bCpKqogwDnFU+dQRfHDk1c1vGlmKT2zNGelGYrAT7x/4ruHO3/0xKPuxpGGxlhba4ygnYVydXePZddIQ65okpBVCvm3J8pzBQli2K1D/dlsZS3//9YEDmyv27Rl0IDUWC3XcAzLpDasrAUBaKksorpEYRBVdZfLms0VT5+asNgbEYsXko+hCk0BNhoJVjWfo64tV1h74913ltdzNGFNF4reAKjzOfJr1Tcvpc/HZRhm347BjfkbWfFmyD09AX79va//4Kcsou7r8sAJDnF57KU8x/OC3WqrVAWCpZ1OplqtwavR0uxfnrvx0Xt/ljUP7o7kaurmDo/LiW4kV9wO/NqS9oPfTFU5sa7JLRtoV2udVBT/8eXpC6mbLtXZ0UnIxUS+TDHYEw/vPX3thCW47+P3/1i7+FpFo+CojZIUo5sGSyA4jthsDgyT/A2W+GqKQSEfSvU+F2bwz/3imbv+6p7O3k6tJoZ8rYGAH5jS+lqunXV9PLaQzacxgOVW8899sFwW4RQKHI2Nm3tDk8tX+u/dva+z5aknvwnt6fTx58wrr7hamz65IuKGoVSLQq4gC4JB4qjTabs+NdcaiznczlopBwEYBbo/4Bdk6eXfvN7d27T9ttGq5njz/TehRFYWEtuHWjfS/BsnL/MAQCXhQW+TzPFl2ULBrd9oiHYX8vKt3U2og07nEuXEtV2x0IUsgHiJbh7saukItEU8Dhuxtr4RagpilJUr5D0eN4ITqqKSBMELIklZBoZbBXHjzyfe27xzp7eh8f23PnXXuVRD83mYvgAerSdiIx1BG41rBrTMdCqBAJlgPXql1FJPV4tFoSy09Awf+f38ic9T4UYPyrgCBCHfMdoFXX/s1BU4dPj8/rX4eqVYJBkGlhknSA3ecw1AlrezVkM1VQx7/F9/cujQ7tWFJZpG+apQlTWmvd2Cs7qqGghgCQxOU3Z3ncPOpHM5UcYEAcRXE32b+/1dO4uZTGv3KBrZPGqYFCQev68Osv6lMxOhQENLNFLOFVEThWhDEagiyoyNLOULLMHghPXi2HmA+Qf37BpfLXVu7mUpM6mBxkhLoM5pofFcVYUznwlAoVhVahWZYs9NTahCOpmKz61kvvKle3u7OtoGD6EWm3v/A487GzrrPe6vfOs+BI7rU9OmgcF/CjyPEdjG+sbAts37Dx4ONwSGRrYObR84/ck5AEo+rxveGLw+0H9LDBIVnFlIknK5WEGHcAMirR6OpvOZAkoQL756+uL5yzB/Fy9etvkaH/35O6zd938CDAB5qvlrJja8DwAAAABJRU5ErkJggg=="

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageForPlatformContainer = __webpack_require__(107);
  
  var _ImageForPlatformContainer2 = _interopRequireDefault(_ImageForPlatformContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/imageForPlatform',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_ImageForPlatformContainer2.default, null));
  
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageForPlatform = __webpack_require__(108);
  
  var _ImageForPlatform2 = _interopRequireDefault(_ImageForPlatform);
  
  var _reactRedux = __webpack_require__(50);
  
  var _imageList = __webpack_require__(96);
  
  var _breadcumb = __webpack_require__(93);
  
  var _deployService = __webpack_require__(109);
  
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
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _constants = __webpack_require__(37);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ImageForPlatform = function (_React$Component) {
    (0, _inherits3.default)(ImageForPlatform, _React$Component);
  
    function ImageForPlatform() {
      (0, _classCallCheck3.default)(this, ImageForPlatform);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageForPlatform).apply(this, arguments));
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
        if (!data || !data.length) return _react2.default.createElement(
          'div',
          null,
          '暂无数据~'
        );
        if (data.length == 1 && data[0] == 1) return _react2.default.createElement(
          'div',
          { className: 'text-center' },
          _react2.default.createElement(_Loading2.default, null)
        );
        var body = [];
        data.map(function (item, i) {
          body.push(_react2.default.createElement(
            'div',
            { className: 'imagesListItem', key: i },
            _react2.default.createElement(
              'div',
              { className: 'hd' },
              _react2.default.createElement(
                'div',
                { className: 'imagesListHd' },
                _react2.default.createElement('img', { width: 40, height: 40, src: __webpack_require__(105), alt: 'img' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'imagesListInfo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  '镜像名称 : ',
                  _react2.default.createElement(
                    _Link2.default,
                    { to: '/imageDetail/' + item.uuid },
                    item.repository
                  )
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  '镜像简介 : ',
                  item.detail
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'bd clearfix' },
              _react2.default.createElement(
                'span',
                { className: 'icon-collection' },
                '收藏'
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/configContainer', className: 'btn btn-sm btn-primary',
                  onClick: _this2.deployImage.bind(_this2, item.repository, item.uuid) },
                '部署'
              )
            )
          ));
        });
        return body;
      }
    }, {
      key: 'getImageTopTen',
      value: function getImageTopTen(n) {
        var data = this.props.imageList;
        var body = [];
        data.map(function (item, i) {
          body.push(_react2.default.createElement(
            'div',
            { className: 'imagesListItem', key: i },
            _react2.default.createElement(
              'div',
              { className: 'hd' },
              _react2.default.createElement(
                'div',
                { className: 'imagesListHd' },
                _react2.default.createElement('img', { width: 40, height: 40, src: __webpack_require__(105), alt: 'img' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'imagesListInfo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  '镜像名称'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    _Link2.default,
                    { to: '/imageDetail/' + item.uuid },
                    item.repository
                  )
                )
              )
            )
          ));
        });
        return body.splice(0, n);
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('平台镜像');
        var panelHd = _react2.default.createElement(
          'div',
          { className: 'clearfix imgHd' },
          _react2.default.createElement(
            'span',
            null,
            '镜像仓库'
          ),
          _react2.default.createElement(
            'a',
            { href: 'javascript:;' },
            '什么是容器镜像？'
          ),
          _react2.default.createElement('div', { className: 'imgDropBox' })
        );
        return _react2.default.createElement(
          'div',
          { className: 'images containerPadding' },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { className: 'image-left', header: panelHd },
            _react2.default.createElement(
              'div',
              { className: 'imagesListBox' },
              this.getImageList()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'image-right' },
            _react2.default.createElement(
              'div',
              { className: 'imageSearch' },
              _react2.default.createElement(
                'div',
                { className: 'search' },
                _react2.default.createElement('input', { type: 'text', placeholder: '搜索镜像', ref: 'searchInput', className: 'slSearchInp' }),
                _react2.default.createElement(
                  'a',
                  { type: 'button', className: 'slSearchBtn icon-select' },
                  ' '
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel,
              { className: 'imagesRankingList', header: '排行榜' },
              this.getImageTopTen(10)
            )
          )
        );
      }
    }]);
    return ImageForPlatform;
  }(_react2.default.Component);
  
  ImageForPlatform.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  ImageForPlatform.propTypes = {
    imageList: _react2.default.PropTypes.array,
    onImageList: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    deployImageName: _react2.default.PropTypes.func
  };
  exports.default = ImageForPlatform;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
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
  
  var _constants = __webpack_require__(37);
  
  var _route = __webpack_require__(57);
  
  var _header = __webpack_require__(79);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(77);
  
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageForMyContainer = __webpack_require__(111);
  
  var _ImageForMyContainer2 = _interopRequireDefault(_ImageForMyContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/imageForMy',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_ImageForMyContainer2.default, null));
  
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageForMy = __webpack_require__(112);
  
  var _ImageForMy2 = _interopRequireDefault(_ImageForMy);
  
  var _reactRedux = __webpack_require__(50);
  
  var _imageList = __webpack_require__(96);
  
  var _imageListSelector = __webpack_require__(97);
  
  var _imageListSelector2 = _interopRequireDefault(_imageListSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _deployService = __webpack_require__(109);
  
  var _building = __webpack_require__(114);
  
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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _constants = __webpack_require__(37);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(113);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _route = __webpack_require__(57);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ImageForMy = function (_React$Component) {
    (0, _inherits3.default)(ImageForMy, _React$Component);
  
    function ImageForMy() {
      (0, _classCallCheck3.default)(this, ImageForMy);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageForMy).call(this));
  
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
        if (!data || !data.length) return _react2.default.createElement(
          'div',
          null,
          '暂无数据~'
        );
        if (data.length == 1 && data[0] == 1) return _react2.default.createElement(
          'div',
          { className: 'text-center' },
          _react2.default.createElement(_Loading2.default, null)
        );
        var body = [];
        data.map(function (item, i) {
          body.push(_react2.default.createElement(
            'div',
            { className: 'imagesListItem', key: i },
            _react2.default.createElement(
              'div',
              { className: 'hd' },
              _react2.default.createElement(
                'div',
                { className: 'imagesListHd' },
                _react2.default.createElement('img', { width: 40, height: 40, src: __webpack_require__(105), alt: 'img' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'imagesListInfo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  '镜像名称 : ',
                  _react2.default.createElement(
                    _Link2.default,
                    { to: '/imageDetail/' + item.uuid },
                    item.repository
                  )
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  '镜像简介 : ',
                  item.detail
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'bd clearfix' },
              _react2.default.createElement(
                'span',
                { className: 'icon-collection' },
                '收藏'
              ),
              _react2.default.createElement(
                _reactBootstrap.SplitButton,
                {
                  title: '部署',
                  bsStyle: 'primary',
                  bsSize: 'small',
                  onClick: _this2.deployImage.bind(_this2, item.repository, item.uuid),
                  onSelect: _this2.onSelectBtn.bind(_this2, item.repository, item.uuid),
                  id: 'deploy-' + i
                },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '1' },
                  '编辑'
                ),
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '2' },
                  '删除'
                )
              )
            )
          ));
        });
        return body;
      }
    }, {
      key: 'getImageTopTen',
      value: function getImageTopTen(n) {
        var data = this.props.imageList;
        var body = [];
        data.map(function (item, i) {
          body.push(_react2.default.createElement(
            'div',
            { className: 'imagesListItem', key: i },
            _react2.default.createElement(
              'div',
              { className: 'hd' },
              _react2.default.createElement(
                'div',
                { className: 'imagesListHd' },
                _react2.default.createElement('img', { width: 40, height: 40, src: __webpack_require__(105), alt: 'img' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'imagesListInfo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  '镜像名称'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    _Link2.default,
                    { to: '/imageDetail/' + item.uuid },
                    item.repository
                  )
                )
              )
            )
          ));
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
        var panelHd = _react2.default.createElement(
          'div',
          { className: 'clearfix imgHd' },
          _react2.default.createElement(
            'span',
            null,
            '镜像仓库'
          ),
          _react2.default.createElement(
            'a',
            { href: 'javascript:;' },
            '什么是容器镜像？'
          ),
          _react2.default.createElement('div', { className: 'imgDropBox' })
        );
        return _react2.default.createElement(
          'div',
          { className: 'images containerPadding' },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { className: 'image-left', header: panelHd },
            _react2.default.createElement(
              'div',
              { className: 'imagesListBox asTabs' },
              _react2.default.createElement(
                _reactBootstrap.Tabs,
                { defaultActiveKey: 1, onSelect: this.tabSelect.bind(this), id: 'asTabs' },
                _react2.default.createElement(
                  _reactBootstrap.Tab,
                  { eventKey: 1, title: '我的镜像' },
                  _react2.default.createElement(
                    'div',
                    { className: 'asTableBox TableTextLeft' },
                    this.getImageList()
                  )
                ),
                _react2.default.createElement(
                  _reactBootstrap.Tab,
                  { eventKey: 2, title: '我的收藏' },
                  _react2.default.createElement(
                    'div',
                    { className: 'asTableBox TableTextLeft' },
                    this.getImageList()
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'image-right' },
            _react2.default.createElement(
              'div',
              { className: 'imageSearch' },
              _react2.default.createElement(
                'div',
                { className: 'search' },
                _react2.default.createElement('input', { type: 'text', placeholder: '搜索镜像', ref: 'searchInput', className: 'slSearchInp' }),
                _react2.default.createElement(
                  'a',
                  { type: 'button', className: 'slSearchBtn icon-select' },
                  ' '
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Panel,
              { className: 'imagesRankingList', header: '排行榜' },
              this.getImageTopTen(10)
            )
          ),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '确定要删除此镜像吗?',
            func: function func() {
              _this3.props.onDeleteImage(_this3.state.delData);
            },
            ref: 'confirmModal'
          })
        );
      }
    }]);
    return ImageForMy;
  }(_react2.default.Component);
  
  ImageForMy.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object
  };
  ImageForMy.propTypes = {
    imageList: _react2.default.PropTypes.array,
    onImageList: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    goToConfigContainer: _react2.default.PropTypes.func,
    onDeleteImage: _react2.default.PropTypes.func
  };
  exports.default = ImageForMy;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Confirm = function (_Component) {
    (0, _inherits3.default)(Confirm, _Component);
  
    function Confirm(props) {
      (0, _classCallCheck3.default)(this, Confirm);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Confirm).call(this, props));
  
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
          _react2.default.createElement(
            "div",
            { className: "modal-header" },
            _react2.default.createElement(
              "button",
              { type: "button", onClick: this.hide.bind(this), className: "close", "aria-label": "Close" },
              _react2.default.createElement(
                "span",
                { "aria-hidden": "true" },
                "×"
              )
            ),
            _react2.default.createElement(
              "h4",
              { className: "modal-title", id: "contained-modal-title-sm" },
              this.props.title
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "modal-body" },
            _react2.default.createElement(
              "div",
              { className: "modalItem" },
              this.props.text
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "modal-footer" },
            _react2.default.createElement(
              "button",
              { className: "btn btn-default", onClick: this.hide.bind(this) },
              "取消"
            ),
            _react2.default.createElement(
              "button",
              { className: "btn btn-primary", onClick: this.isOk.bind(this) },
              "确定"
            )
          )
        );
      }
    }]);
    return Confirm;
  }(_react.Component);
  
  Confirm.propTypes = {
    func: _react2.default.PropTypes.func
  };
  exports.default = Confirm;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchGetAuthURLLAction = fetchGetAuthURLLAction;
  exports.fetchRepoListAction = fetchRepoListAction;
  exports.fetchBuildingImageListAction = fetchBuildingImageListAction;
  exports.fetchFastBuildingAction = fetchFastBuildingAction;
  exports.fetchBuildingAction = fetchBuildingAction;
  exports.refreshBuildingList = refreshBuildingList;
  exports.onDeleteImageAction = onDeleteImageAction;
  exports.fetchBuildDetail = fetchBuildDetail;
  exports.fetchReviseBuilding = fetchReviseBuilding;
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _header = __webpack_require__(79);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _route = __webpack_require__(57);
  
  var _notification = __webpack_require__(77);
  
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
  
  function receiveAuthURLAction(type, url) {
    var action_type = void 0;
    switch (type) {
      case "github":
        action_type = Const.GET_GITHUB_AUTH_URL;
        break;
      case "coding":
        action_type = Const.GET_CODING_AUTH_URL;
        break;
      default:
        action_type = Const.GET_GITHUB_AUTH_URL;
    }
    return {
      type: action_type,
      payload: url
    };
  }
  
  function fetchGetAuthURLLAction(data) {
    var body = (0, _stringify2.default)(data);
    console.log(body, "授权链接参数");
    return function (dispatch) {
      dispatch((0, _header.isLoadingAction)(true));
      return (0, _isomorphicFetch2.default)(_constants.FETCH_URL.AUTH_URL, {
        method: 'POST',
        headers: {
          token: localStorage.getItem('_at')
        },
        body: body
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json, "获取授权链接");
        if (json.status == 0) {
          switch (data.src_type) {
            case "github":
              dispatch(receiveAuthURLAction("github", json.result.msg));
              break;
            case "coding":
              dispatch(receiveAuthURLAction("coding", json.result.msg));
          }
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ImageDetailContainer = __webpack_require__(116);
  
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
                return _context.abrupt('return', _react2.default.createElement(_ImageDetailContainer2.default, { uuid: params.uuid }));
  
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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ImageDetail = __webpack_require__(117);
  
  var _ImageDetail2 = _interopRequireDefault(_ImageDetail);
  
  var _reactRedux = __webpack_require__(50);
  
  var _imageDetail = __webpack_require__(123);
  
  var _imageDetailSelector = __webpack_require__(124);
  
  var _imageDetailSelector2 = _interopRequireDefault(_imageDetailSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _deployService = __webpack_require__(109);
  
  var _building = __webpack_require__(114);
  
  var _reviseImage = __webpack_require__(125);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _constants = __webpack_require__(37);
  
  var _utils = __webpack_require__(118);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _Confirm = __webpack_require__(113);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _route = __webpack_require__(57);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '镜像详情';
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(IsPublicToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
          disabled: this.props.disabled,
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  IsPublicToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.bool
  };
  
  var ImageDetail = function (_Component2) {
    (0, _inherits3.default)(ImageDetail, _Component2);
  
    function ImageDetail(props) {
      (0, _classCallCheck3.default)(this, ImageDetail);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageDetail).call(this, props));
  
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
        if (!tags.length) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '3' },
            '暂无数据~'
          )
        );
        return tags.map(function (item, i) {
          return _react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              data.repository
            ),
            _react2.default.createElement(
              'td',
              null,
              item.tag
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                _reactBootstrap.SplitButton,
                {
                  onClick: _this3.deployImage.bind(_this3, data.repository),
                  bsStyle: 'primary', title: '部署', id: 'building-table-line-' + i },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '1', onClick: _this3.showModal.bind(_this3) },
                  '拉取'
                )
              )
            )
          );
        });
      }
    }, {
      key: 'getVersion',
      value: function getVersion() {
        return _react2.default.createElement(
          'div',
          { className: 'building-table' },
          _react2.default.createElement(
            'table',
            { className: 'table table-hover table-bordered' },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  { width: '33%' },
                  '镜像名称'
                ),
                _react2.default.createElement(
                  'th',
                  { width: '33%' },
                  '版本'
                ),
                _react2.default.createElement(
                  'th',
                  { width: '34%' },
                  '操作'
                )
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              this.getLines()
            )
          )
        );
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
        if (!data.repository) return _react2.default.createElement(
          'div',
          { className: 'text-center' },
          _react2.default.createElement(_Loading2.default, null)
        );
        var tag = data.image_tag ? ':' + data.image_tag : ":latest";
        var userName = this.context.store.getState().user_info.user_name;
        var isMy = userName == data.user_name;
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF containerPadding', key: data.is_public },
          _react2.default.createElement(
            'div',
            { className: 'sdHd' },
            _react2.default.createElement(
              'div',
              { className: 'sdImg' },
              _react2.default.createElement('img', null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'sdInfo' },
              _react2.default.createElement(
                'div',
                { className: 'sdTitle' },
                _react2.default.createElement(
                  'div',
                  { className: 'sdTitleItem' },
                  '镜像名称:',
                  _react2.default.createElement(
                    'span',
                    null,
                    data.repository
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'sdTitleItem' },
                  '最近部署时间:',
                  _react2.default.createElement(
                    'span',
                    { className: 'color999' },
                    (0, _utils.timeRange)(new Date(data.update_time))
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'sdTitleItem imageDetail_lastItem' },
                  _react2.default.createElement(
                    _reactBootstrap.SplitButton,
                    {
                      onClick: this.deployImage.bind(this, data.repository, data.uuid),
                      onSelect: this.selectImage.bind(this, data.repository, data.uuid),
                      bsStyle: 'primary', title: '部署最新版本', id: 'building-table-line' },
                    _react2.default.createElement(
                      _reactBootstrap.MenuItem,
                      { eventKey: '1' },
                      '编辑'
                    ),
                    _react2.default.createElement(
                      _reactBootstrap.MenuItem,
                      { eventKey: '2' },
                      '删除'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'sdPBox' },
                _react2.default.createElement(
                  'div',
                  { className: 'sdPItem' },
                  _react2.default.createElement(
                    'span',
                    { className: 'sdPItemName' },
                    '镜像地址:'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: 'http://index.boxlinker.com/' + data.repository,
                      target: '_blank', className: 'aLink' },
                    'http://index.boxlinker.com/' + data.repository
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'sdPItem' },
                  _react2.default.createElement(
                    'span',
                    { className: 'sdPItemName' },
                    '拉取命令:'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'aLink' },
                    'docker pull index.boxlinker.com/' + data.repository + tag
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'sdPItem' },
                  _react2.default.createElement(
                    'span',
                    { className: 'sdPItemName' },
                    '是否公开:'
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(IsPublicToggle, {
                      disabled: !this.props.isBtnState.building,
                      state: data.is_public == 1,
                      getToggle: this.getToggleValue.bind(this, data)
                    })
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'sdBd' },
            _react2.default.createElement(
              _reactBootstrap.Tabs,
              { defaultActiveKey: 1, id: 'sdTabs' },
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 1, title: '概览' },
                _react2.default.createElement(
                  'div',
                  { className: 'idTableBox' },
                  _react2.default.createElement(
                    'div',
                    { className: 'idOverview' },
                    data.detail
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 2, title: '版本' },
                _react2.default.createElement(
                  'div',
                  { className: 'idTableBox' },
                  this.getVersion(),
                  _react2.default.createElement(
                    _reactBootstrap.Modal,
                    (0, _extends3.default)({}, this.props, { show: this.state.show, onHide: this.hideModal.bind(this), bsSize: 'sm', 'aria-labelledby': 'contained-modal-title-sm' }),
                    _react2.default.createElement(
                      'div',
                      { className: 'modal-header' },
                      _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'close', 'aria-label': 'Close', onClick: this.hideModal.bind(this) },
                        _react2.default.createElement(
                          'span',
                          { 'aria-hidden': 'true' },
                          '×'
                        )
                      ),
                      _react2.default.createElement(
                        'h4',
                        { className: 'modal-title', id: 'contained-modal-title-sm' },
                        '拉取版本: latest扩容'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'modal-body' },
                      _react2.default.createElement(
                        'div',
                        { className: 'idModalBox' },
                        _react2.default.createElement(
                          'p',
                          { className: 'idModalFirst' },
                          '拉取命令:'
                        ),
                        _react2.default.createElement(_reactBootstrap.FormControl, {
                          type: 'text',
                          placeholder: ''
                        }),
                        _react2.default.createElement(
                          'p',
                          { className: 'idModalLast' },
                          '拉取镜像前请先登录: docker login daocloud.io'
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'idModalBtnBox' },
                          _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'primary' },
                            '复制'
                          ),
                          _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'default', onClick: this.hideModal.bind(this) },
                            '取消'
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '确定要删除此镜像吗?',
            func: function func() {
              _this4.props.onDeleteImage(_this4.state.delData);
            },
            ref: 'confirmModal'
          })
        );
      }
    }]);
    return ImageDetail;
  }(_react.Component);
  
  ImageDetail.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  ImageDetail.propTypes = {
    setBreadcrumb: _react2.default.PropTypes.func,
    imageDetail: _react2.default.PropTypes.object,
    getImageDetail: _react2.default.PropTypes.func,
    onDeleteImage: _react2.default.PropTypes.func,
    goToConfigContainer: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object,
    onReviseImage: _react2.default.PropTypes.func
  };
  exports.default = ImageDetail;

/***/ },
/* 118 */
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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _assign = __webpack_require__(19);
  
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
  
  var React = _interopRequire(__webpack_require__(9));
  
  var classNames = _interopRequire(__webpack_require__(65));
  
  var Check = _interopRequire(__webpack_require__(120));
  
  var X = _interopRequire(__webpack_require__(121));
  
  var PureRenderMixin = _interopRequire(__webpack_require__(122));
  
  module.exports = React.createClass({
    mixins: [PureRenderMixin],
  
    displayName: "Toggle",
  
    propTypes: {
      checked: React.PropTypes.bool,
      defaultChecked: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      name: React.PropTypes.string,
      value: React.PropTypes.string,
      id: React.PropTypes.string,
      "aria-labelledby": React.PropTypes.string,
      "aria-label": React.PropTypes.string
    },
  
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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function _interopRequire(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
  
  var React = _interopRequire(__webpack_require__(9));
  
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function _interopRequire(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
  
  var React = _interopRequire(__webpack_require__(9));
  
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
/* 122 */
/***/ function(module, exports) {

  module.exports = require("react-addons-pure-render-mixin");

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fetchImageDetailAction = fetchImageDetailAction;
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _header = __webpack_require__(79);
  
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchReviseImageAction = fetchReviseImageAction;
  
  var _constants = __webpack_require__(37);
  
  var _header = __webpack_require__(79);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(77);
  
  var _route = __webpack_require__(57);
  
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _CreateImageContainer = __webpack_require__(128);
  
  var _CreateImageContainer2 = _interopRequireDefault(_CreateImageContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/createImage',
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_CreateImageContainer2.default, null));
  
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _CreateImage = __webpack_require__(129);
  
  var _CreateImage2 = _interopRequireDefault(_CreateImage);
  
  var _reactRedux = __webpack_require__(50);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _createImage = __webpack_require__(134);
  
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
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(IsPublicToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  IsPublicToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.bool
  };
  
  var CreateImage = function (_React$Component) {
    (0, _inherits3.default)(CreateImage, _React$Component);
  
    function CreateImage() {
      (0, _classCallCheck3.default)(this, CreateImage);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CreateImage).call(this));
  
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
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'acBox' },
            _react2.default.createElement(
              'h1',
              null,
              '新建镜像'
            ),
            _react2.default.createElement(
              'p',
              null,
              '镜像是服务运行的模板, 来源于代码, 基于 Dockerfile 构建, 默认目录在根\'/\'下, 文件名 Dockerfile .'
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '镜像名称',
                titleEnglish: 'IMAGE NAME',
                titleInfo: '默认会与您下方代码源的项目名称相同'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox ' + (this.state.isImageName ? "has-error" : "") },
                _react2.default.createElement('input', {
                  type: 'text',
                  placeholder: '',
                  className: 'form-control',
                  ref: 'repository',
                  onChange: this.onImageNameChange.bind(this)
                }),
                _react2.default.createElement(
                  'span',
                  { className: 'inputTip', ref: 'image_name_tip' },
                  '镜像名称不能为空'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '镜像简介',
                titleEnglish: 'IMAGE SUMMARY',
                titleInfo: '简单介绍镜像的信息'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('textarea', {
                  placeholder: '镜像简介',
                  className: 'form-control',
                  defaultValue: '',
                  ref: 'image_detail'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '详细描述',
                titleEnglish: 'IMAGE DETAIL',
                titleInfo: '详细介绍镜像的信息'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('textarea', {
                  placeholder: '详细描述',
                  className: 'form-control',
                  defaultValue: '',
                  ref: 'short_description'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '是否公开',
                titleEnglish: 'IS PUBLIC',
                titleInfo: '公开后都可以访问'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement(IsPublicToggle, { state: true, getToggle: this.getToggleValue.bind(this) })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(
                'div',
                { className: 'acBtn' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary ' + (!this.props.isBtnState ? "btn-loading" : ""),
                    onClick: this.building.bind(this),
                    disabled: !this.props.isBtnState.building },
                  this.props.isBtnState.building ? "新建" : "新建中..."
                )
              )
            )
          )
        );
      }
    }]);
    return CreateImage;
  }(_react2.default.Component);
  
  CreateImage.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object,
    setBreadcrumb: _react2.default.PropTypes.func
  };
  CreateImage.propTypes = {
    isBtnState: _react2.default.PropTypes.object,
    onCreateImage: _react2.default.PropTypes.func
  };
  exports.default = CreateImage;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _HeadLine = __webpack_require__(131);
  
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
      return _react2.default.createElement(
        'div',
        { className: _HeadLine2.default.hlBox },
        _react2.default.createElement(
          'h1',
          { className: _HeadLine2.default.hlHd },
          _react2.default.createElement(
            'span',
            { className: _HeadLine2.default.hlFirstTitle },
            this.props.title
          ),
          _react2.default.createElement(
            'span',
            { className: _HeadLine2.default.hlSecondTitle },
            this.props.titleEnglish
          )
        ),
        _react2.default.createElement(
          'p',
          { className: _HeadLine2.default.hlPresent },
          this.props.titleInfo
        )
      );
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(132);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./HeadLine.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./HeadLine.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, ".HeadLine_hlBox_2bT{\n  height:40px;\n  padding-left:15px;\n  position: relative;\n}\n.HeadLine_hlBox_2bT:before{\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n  height:35px;\n  width:5px;\n  background:#2dafdf;\n  left:0;\n  top:2px;\n}\n.HeadLine_hlHd_2xx{\n  height:18px;\n  line-height:18px;\n}\n.HeadLine_hlHd_2xx span{\n  vertical-align: top;\n}\n.HeadLine_hlFirstTitle_1Gp{\n  font-size:16px;\n  color:#333;\n}\n.HeadLine_hlSecondTitle_2l6{\n  margin-left:10px;\n  font-size:12px;\n  color:#999;\n}\n.HeadLine_hlPresent_n_8{\n  margin-top:5px;\n  font-size:12px;\n  color:#666;\n}\n", "", {"version":3,"sources":["/./components/HeadLine/HeadLine.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,UAAU;EACV,mBAAmB;EACnB,OAAO;EACP,QAAQ;CACT;AACD;EACE,YAAY;EACZ,iBAAiB;CAClB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,WAAW;CACZ;AACD;EACE,iBAAiB;EACjB,eAAe;EACf,WAAW;CACZ;AACD;EACE,eAAe;EACf,eAAe;EACf,WAAW;CACZ","file":"HeadLine.css","sourcesContent":[".hlBox{\n  height:40px;\n  padding-left:15px;\n  position: relative;\n}\n.hlBox:before{\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n  height:35px;\n  width:5px;\n  background:#2dafdf;\n  left:0;\n  top:2px;\n}\n.hlHd{\n  height:18px;\n  line-height:18px;\n}\n.hlHd span{\n  vertical-align: top;\n}\n.hlFirstTitle{\n  font-size:16px;\n  color:#333;\n}\n.hlSecondTitle{\n  margin-left:10px;\n  font-size:12px;\n  color:#999;\n}\n.hlPresent{\n  margin-top:5px;\n  font-size:12px;\n  color:#666;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"hlBox": "HeadLine_hlBox_2bT",
  	"hlHd": "HeadLine_hlHd_2xx",
  	"hlFirstTitle": "HeadLine_hlFirstTitle_1Gp",
  	"hlSecondTitle": "HeadLine_hlSecondTitle_2l6",
  	"hlPresent": "HeadLine_hlPresent_n_8"
  };

/***/ },
/* 133 */
/***/ function(module, exports) {

  module.exports = require("react-dom");

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.fetchCreateImageAction = fetchCreateImageAction;
  
  var _constants = __webpack_require__(37);
  
  var _header = __webpack_require__(79);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(77);
  
  var _route = __webpack_require__(57);
  
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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BuildingDetailContainer = __webpack_require__(136);
  
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
                return _context.abrupt('return', _react2.default.createElement(_BuildingDetailContainer2.default, { projectId: params.id }));
  
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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _BuildingDetail = __webpack_require__(137);
  
  var _BuildingDetail2 = _interopRequireDefault(_BuildingDetail);
  
  var _reactRedux = __webpack_require__(50);
  
  var _breadcumb = __webpack_require__(93);
  
  var _building = __webpack_require__(114);
  
  var _buildingDetailSelector = __webpack_require__(139);
  
  var _buildingDetailSelector2 = _interopRequireDefault(_buildingDetailSelector);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _Logs = __webpack_require__(138);
  
  var _Logs2 = _interopRequireDefault(_Logs);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _constants = __webpack_require__(37);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsAutoBuildToggle = function (_Component) {
    (0, _inherits3.default)(IsAutoBuildToggle, _Component);
  
    function IsAutoBuildToggle(props) {
      (0, _classCallCheck3.default)(this, IsAutoBuildToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(IsAutoBuildToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsAutoBuildToggle;
  }(_react.Component);
  
  IsAutoBuildToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.bool
  };
  
  var BuildingDetail = function (_React$Component) {
    (0, _inherits3.default)(BuildingDetail, _React$Component);
  
    function BuildingDetail(props) {
      (0, _classCallCheck3.default)(this, BuildingDetail);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BuildingDetail).call(this, props));
  
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
          return _react2.default.createElement(
            'div',
            { className: 'baseSet', key: new Date(item.creation_time).getTime() },
            _react2.default.createElement(
              'div',
              { className: 'baseItem' },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { controlId: 'form' },
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 2 },
                  '镜像名称'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 5 },
                  _react2.default.createElement(
                    'p',
                    null,
                    item.repository
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'baseItem' },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { controlId: 'form' },
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 2 },
                  'Dockerfile位置'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 5 },
                  _react2.default.createElement('input', { className: 'form-control', type: 'text', ref: 'dockerfile_path', defaultValue: item.dockerfile_path })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'baseItem' },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { controlId: 'form' },
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 2 },
                  '默认代码分支'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 5 },
                  _react2.default.createElement('input', { className: 'form-control', type: 'text', ref: 'repo_branch', defaultValue: item.repo_branch })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'baseItem' },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { controlId: 'form' },
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 2 },
                  '自动构建'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 5 },
                  _react2.default.createElement(IsAutoBuildToggle, { state: item.auto_build == 1, getToggle: _this3.getToggleValue.bind(_this3) })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'baseItem' },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { controlId: 'form' },
                _react2.default.createElement(_reactBootstrap.Col, { sm: 2 }),
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { sm: 5 },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-primary ' + (!_this3.props.isBtnState.reviseBuilding ? "btn-loading" : ""),
                      onClick: _this3.onReviseBuilding.bind(_this3),
                      disabled: !_this3.props.isBtnState.reviseBuilding
                    },
                    '确认修改'
                  )
                )
              )
            )
          );
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
        return _react2.default.createElement(
          'div',
          { className: 'handleBox' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-danger', onClick: this.onDeleteBuilding.bind(this, this.props.projectId) },
            '删除项目'
          ),
          _react2.default.createElement(
            'p',
            null,
            '*删除项目将清除项目相关数据，请慎重选择！ '
          )
        );
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
          return _react2.default.createElement(
            'div',
            { style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          );
        }
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'cdBd' },
            _react2.default.createElement(
              'div',
              { className: 'cbCodeInfo' },
              _react2.default.createElement(
                _reactBootstrap.Media,
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'media-left' },
                  _react2.default.createElement('img', { width: 65, height: 65, src: '/avatar.png', alt: 'Image' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'media-body' },
                  _react2.default.createElement(
                    'div',
                    { className: 'media-heading' },
                    '镜像名称 :',
                    _react2.default.createElement(
                      'a',
                      { href: 'javascript:;', target: '_blank', className: 'aLink' },
                      'index.boxlinker.com/' + buildDetail.repository + ':' + buildDetail.image_tag
                    )
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-primary ' + (buildDetail.build_status == 2 ? "btn-loading" : ""),
                        disabled: buildDetail.build_status == 2,
                        onClick: this.fastBuilding.bind(this, uuid)
                      },
                      buildDetail.build_status == 2 ? "构建中" : "构建"
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'cbTabs' },
              _react2.default.createElement(
                _reactBootstrap.Tabs,
                { defaultActiveKey: 1, id: 'cbTabs' },
                _react2.default.createElement(
                  _reactBootstrap.Tab,
                  { eventKey: 1, title: '构建日志' },
                  _react2.default.createElement(
                    'div',
                    { className: 'asTableBox', style: { "paddingTop": "30px" } },
                    _react2.default.createElement(_Logs2.default, { logLabel: 'auto_build-' + username + '-' + this.props.projectId })
                  )
                ),
                _react2.default.createElement(
                  _reactBootstrap.Tab,
                  { eventKey: 2, title: '基本设置' },
                  _react2.default.createElement(
                    'div',
                    { className: 'asTableBox' },
                    this.baseSeting()
                  )
                ),
                _react2.default.createElement(
                  _reactBootstrap.Tab,
                  { eventKey: 3, title: '操作' },
                  _react2.default.createElement(
                    'div',
                    { className: 'asTableBox' },
                    this.handle()
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return BuildingDetail;
  }(_react2.default.Component);
  
  BuildingDetail.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object
  };
  BuildingDetail.propTypes = {
    projectId: _react2.default.PropTypes.string.isRequired,
    buildingDetail: _react2.default.PropTypes.object,
    getBuildingDetail: _react2.default.PropTypes.func,
    onFastBuilding: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    onDeleteImage: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object,
    reviseBuilding: _react2.default.PropTypes.func
  };
  exports.default = BuildingDetail;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _reactCookie = __webpack_require__(68);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _utils = __webpack_require__(118);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _class = function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).call(this));
  
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
          return _react2.default.createElement(
            'div',
            { key: i },
            (0, _utils.timeFormat)(item.log_time),
            ' ',
            item.log_info
          );
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
  
  _class.propTypes = {
    logLabel: _react2.default.PropTypes.string
  };
  exports.default = _class;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BuildingContainer = __webpack_require__(141);
  
  var _BuildingContainer2 = _interopRequireDefault(_BuildingContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/building',
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_BuildingContainer2.default, null));
  
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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _Building = __webpack_require__(142);
  
  var _Building2 = _interopRequireDefault(_Building);
  
  var _reactRedux = __webpack_require__(50);
  
  var _building = __webpack_require__(114);
  
  var _buildingImageListSelector = __webpack_require__(143);
  
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
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _classnames = __webpack_require__(65);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(113);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _utils = __webpack_require__(118);
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Building = function (_Component) {
    (0, _inherits3.default)(Building, _Component);
  
    function Building() {
      (0, _classCallCheck3.default)(this, Building);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Building).call(this));
  
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
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)("hbAdd", "left") },
          _react2.default.createElement(
            _Link2.default,
            { to: "/building/create", className: (0, _classnames2.default)("hbAddBtn", "clearfix") },
            _react2.default.createElement('div', { className: (0, _classnames2.default)("hbPlus", "left") }),
            _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)("hbPlusInfo", "left") },
              _react2.default.createElement(
                'p',
                { className: "hbPName" },
                '代码构建'
              ),
              _react2.default.createElement(
                'p',
                { className: "hbPInfo" },
                'Code Build'
              )
            )
          )
        );
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
          return _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'icon-console', style: style }),
            _name[1]
          );
        }
        return null;
      }
    }, {
      key: 'getLines',
      value: function getLines() {
        var _this2 = this;
  
        var data = this.props.buildingImageList;
        if (!data.length) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '6', style: { "textAlign": "center" } },
            '暂无数据~'
          )
        );
        if (data.length == 1 && data[0] == 1) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '6', style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        if (data.length == 1 && data[0] == 0) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '6', style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        var body = [];
        data.map(function (item, i) {
          var buildStatus = ["还未构建", "构建成功", "构建中", "构建失败"][item.build_status];
          var buildUserTime = buildStatus == "还未构建" ? "还未构建" : Math.floor(item.use_time) + "秒";
          var prevUserTime = buildStatus == "还未构建" ? "还未构建" : (0, _utils.timeRange)(new Date(item.last_build));
          body.push(_react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'mediaItem' },
                _react2.default.createElement(
                  _Link2.default,
                  { to: '/building/' + item.uuid },
                  _react2.default.createElement('img', { className: 'mediaImg', src: '/slImgJx.png' }),
                  _react2.default.createElement(
                    'span',
                    { className: 'mediaTxt' },
                    item.repository
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              item.src_url
            ),
            _react2.default.createElement(
              'td',
              null,
              buildStatus
            ),
            _react2.default.createElement(
              'td',
              null,
              buildUserTime
            ),
            _react2.default.createElement(
              'td',
              null,
              prevUserTime
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                _reactBootstrap.SplitButton,
                {
                  onClick: _this2.fastBuilding.bind(_this2, item.uuid),
                  onSelect: _this2.deleteLine.bind(_this2, item.repository),
                  bsStyle: 'primary', title: '构建', id: 'building-table-line-' + i },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '1' },
                  '删除'
                )
              )
            )
          ));
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
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF building-list' },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)("hbHd", "hbHdNoMb", "clearfix") },
            this.getAddBtn(),
            _react2.default.createElement(
              'div',
              { className: 'right slSearch' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default icon-refresh', onClick: this.refresh.bind(this), title: '刷新' },
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'building-table TableTextLeft' },
            _react2.default.createElement(
              'table',
              { className: 'table table-hover table-bordered' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    { width: '30%' },
                    '镜像名称'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '30%' },
                    '代码源'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '10%' },
                    '构建状态'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '10%' },
                    '上次构建用时'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '10%' },
                    '最近构建'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '10%' },
                    '操作'
                  )
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                this.getLines()
              )
            )
          ),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '确定要删除此镜像吗?',
            func: function func() {
              _this3.props.onDeleteImage(_this3.state.delData);
            },
            ref: 'confirmModal'
          })
        );
      }
    }]);
    return Building;
  }(_react.Component);
  
  Building.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  Building.propTypes = {
    buildingImageList: _react2.default.PropTypes.array,
    onImageList: _react2.default.PropTypes.func,
    onFastBuilding: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    onClearImageList: _react2.default.PropTypes.func,
    onDeleteImage: _react2.default.PropTypes.func
  };
  exports.default = Building;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BuildingCreateContainer = __webpack_require__(145);
  
  var _BuildingCreateContainer2 = _interopRequireDefault(_BuildingCreateContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/building/create',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_BuildingCreateContainer2.default, null));
  
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(50);
  
  var _BuildingCreate = __webpack_require__(146);
  
  var _BuildingCreate2 = _interopRequireDefault(_BuildingCreate);
  
  var _building = __webpack_require__(114);
  
  var _BuildingCreateSelector = __webpack_require__(147);
  
  var _BuildingCreateSelector2 = _interopRequireDefault(_BuildingCreateSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var selector = (0, _BuildingCreateSelector2.default)();
    var getAuthURL = (0, _BuildingCreateSelector.makeGetAuthURLSelector)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      repos: selector(state),
      authUrl: getAuthURL(state),
      isBtnState: isBtnStateSelector(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onReposLoad: function onReposLoad(key, refresh) {
        dispatch((0, _building.fetchRepoListAction)(key, refresh));
      },
      getAuthURL: function getAuthURL(data) {
        dispatch((0, _building.fetchGetAuthURLLAction)(data));
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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var DropdownToggle = _reactBootstrap.Dropdown.Toggle,
      DropdownMenu = _reactBootstrap.Dropdown.Menu;
  
  var CodeStore = {
    "Default": _react2.default.createElement(
      'span',
      null,
      '选择代码仓库'
    ),
    "Github": _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'i',
        { className: 'icon-github' },
        ' '
      ),
      _react2.default.createElement(
        'i',
        null,
        'Github'
      )
    ),
    "Coding": _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'i',
        { className: 'icon-refresh' },
        ' '
      ),
      _react2.default.createElement(
        'i',
        null,
        'Coding'
      )
    )
  };
  
  var BuildingCreate = function (_React$Component) {
    (0, _inherits3.default)(BuildingCreate, _React$Component);
  
    function BuildingCreate() {
      (0, _classCallCheck3.default)(this, BuildingCreate);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BuildingCreate).call(this));
  
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
        var git = this.context.store.getState().user_info.oauth.github;
        var cod = this.context.store.getState().user_info.oauth.coding;
        !git ? this.props.getAuthURL({ src_type: "github", redirect_url: window.location.href }) : null;
        !cod ? this.props.getAuthURL({ src_type: "coding", redirect_url: window.location.href }) : null;
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
      key: 'render1',
      value: function render1() {
        return _react2.default.createElement(
          'h1',
          null,
          '1111'
        );
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('代码构建');
        var user = this.context.store.getState().user_info;
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'acBox' },
            _react2.default.createElement(
              'h1',
              null,
              '代码构建'
            ),
            _react2.default.createElement(
              'p',
              null,
              '镜像是服务运行的模板, 来源于代码, 基于 Dockerfile 构建, 默认目录在根\'/\'下, 文件名 Dockerfile .'
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '镜像名称',
                titleEnglish: 'IMAGE NAME',
                titleInfo: '默认会与您下方代码源的项目名称相同'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox ' + (this.state.isImageName ? "has-error" : "") },
                _react2.default.createElement('input', {
                  type: 'text',
                  placeholder: '',
                  className: 'form-control',
                  ref: 'image_name',
                  onChange: this.onImageNameChange.bind(this)
                }),
                _react2.default.createElement(
                  'span',
                  { className: 'inputTip', ref: 'image_name_tip' },
                  '镜像名称不能为空'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '镜像标签',
                titleEnglish: 'IMAGE TAG',
                titleInfo: '默认为latest'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('input', {
                  type: 'text',
                  placeholder: '',
                  className: 'form-control',
                  ref: 'image_tag',
                  defaultValue: 'latest'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '代码源',
                titleEnglish: 'CODE SOURCES',
                titleInfo: '代码源的描述等'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                !user.oauth.github ? _react2.default.createElement(
                  'a',
                  { className: 'btn btn-primary', href: this.props.authUrl.github },
                  'Github 授权'
                ) : _react2.default.createElement(
                  _reactBootstrap.ButtonGroup,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.Dropdown,
                    { bsStyle: 'default', ref: 'repo_name',
                      onSelect: this.selectCodeStore.bind(this),
                      id: 'building-create-source-codestore' },
                    _react2.default.createElement(
                      DropdownToggle,
                      null,
                      CodeStore[this.state.codeStoreKey]
                    ),
                    _react2.default.createElement(
                      DropdownMenu,
                      null,
                      _react2.default.createElement(
                        _reactBootstrap.MenuItem,
                        { eventKey: 'Github' },
                        CodeStore["Github"]
                      ),
                      _react2.default.createElement(
                        _reactBootstrap.MenuItem,
                        { eventKey: 'Coding' },
                        CodeStore["Coding"]
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.DropdownButton,
                    { bsStyle: 'default', title: this.state.repoKey || "选择项目", onSelect: this.selectRepo.bind(this), id: 'building-create-source-repos' },
                    this.props.repos.length != 0 ? this.props.repos.map(function (item, i) {
                      return _react2.default.createElement(
                        _reactBootstrap.MenuItem,
                        { key: i, eventKey: item.repo_name },
                        item.repo_name
                      );
                    }) : _react2.default.createElement(
                      _reactBootstrap.MenuItem,
                      { key: 0, eventKey: 0 },
                      '加载中...'
                    )
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    { className: 'icon-refresh', onClick: this.selectCodeStore.bind(this, this.state.codeStoreKey, true) },
                    ' '
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'inputTip', ref: 'btn_group_tip' },
                  '代码仓库和项目名称不能为空'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '构建位置',
                titleEnglish: 'CONSTRUCTION POSITION',
                titleInfo: 'Dockerfile是指导镜像构建的描述文件，系统会根据您设置的构建目录查找Dockerfile并在该目录下执行镜像构建命令。'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox assBoxW100' },
                _react2.default.createElement(
                  'div',
                  { className: 'assPosition' },
                  _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: 'form' },
                    _react2.default.createElement(
                      _reactBootstrap.Col,
                      { sm: 2 },
                      '构建目录'
                    ),
                    _react2.default.createElement(
                      _reactBootstrap.Col,
                      { sm: 5 },
                      _react2.default.createElement('input', { className: 'form-control', defaultValue: '/', ref: 'dockerfile_name', type: 'text', placeholder: '/' })
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'assPosition' },
                  _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: 'form' },
                    _react2.default.createElement(
                      _reactBootstrap.Col,
                      { sm: 2 },
                      'Dockerfile 路径'
                    ),
                    _react2.default.createElement(
                      _reactBootstrap.Col,
                      { sm: 5 },
                      _react2.default.createElement('input', { className: 'form-control', defaultValue: 'Dockerfile', ref: 'dockerfile_path', type: 'text', placeholder: 'Dockerfile' })
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '是否自动构建',
                titleEnglish: 'AUTO BUILDING',
                titleInfo: '当代码仓库中的项目有 push 操作的时候, 该镜像也会同步自动重新构建'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement(_Toggle2.default, {
                  defaultChecked: this.state.isAutoBuilding == 1,
                  onChange: this.getToggleValue.bind(this)
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '是否公开',
                titleEnglish: 'IS PUBLIC',
                titleInfo: '是否对外开放您的镜像'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement(_Toggle2.default, {
                  defaultChecked: this.state.isPublic == 1,
                  onChange: this.changePublicToggleValue.bind(this)
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '镜像简介',
                titleEnglish: 'IMAGE SUMMARY',
                titleInfo: '简单介绍镜像的信息'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('textarea', {
                  placeholder: '镜像简介',
                  className: 'form-control',
                  defaultValue: '',
                  ref: 'detail'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '详细描述',
                titleEnglish: 'IMAGE DETAIL',
                titleInfo: '详细介绍镜像的信息'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('textarea', {
                  placeholder: '详细描述',
                  className: 'form-control',
                  defaultValue: '',
                  ref: 'short_description'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem assItemNoborder' },
              _react2.default.createElement(
                'div',
                { className: 'acBtn' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary ' + (!this.props.isBtnState.building ? "btn-loading" : ""),
                    onClick: this.building.bind(this),
                    disabled: !this.props.isBtnState.building },
                  this.props.isBtnState.building ? "开始构建" : "构建中..."
                )
              )
            )
          )
        );
      }
    }]);
    return BuildingCreate;
  }(_react2.default.Component);
  
  BuildingCreate.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object,
    setBreadcrumb: _react2.default.PropTypes.func
  };
  BuildingCreate.propTypes = {
    repos: _react2.default.PropTypes.array,
    authUrl: _react2.default.PropTypes.object,
    onReposLoad: _react2.default.PropTypes.func,
    getAuthUrl: _react2.default.PropTypes.func,
    onBuilding: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object
  };
  exports.default = BuildingCreate;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.makeGetAuthURLSelector = undefined;
  
  var _reselect = __webpack_require__(62);
  
  var getRepos = function getRepos(state) {
    return state.repos;
  };
  
  var authUrl = function authUrl(state) {
    return state.authUrl;
  };
  
  var makeGetReposSelector = function makeGetReposSelector() {
    return (0, _reselect.createSelector)([getRepos], function (repos) {
      return repos;
    });
  };
  
  var makeGetAuthURLSelector = exports.makeGetAuthURLSelector = function makeGetAuthURLSelector() {
    return (0, _reselect.createSelector)([authUrl], function (url) {
      return url;
    });
  };
  
  exports.default = makeGetReposSelector;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(52);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(13);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _reactRedux = __webpack_require__(50);
  
  var _ = __webpack_require__(43);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
    action: function action(_ref) {
      var render = _ref.render;
      var context = _ref.context;
      var error = _ref.error;
  
      return render(_react2.default.createElement(
        _reactRedux.Provider,
        { store: _.store },
        _react2.default.createElement(
          _App2.default,
          { context: context, error: error },
          _react2.default.createElement(_ErrorPage2.default, { error: error })
        )
      ), 500
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceListContainer = __webpack_require__(150);
  
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
  
  exports.default = {
  
    path: '/serviceList',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_ServiceListContainer2.default, null));
  
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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ServiceList = __webpack_require__(151);
  
  var _ServiceList2 = _interopRequireDefault(_ServiceList);
  
  var _reactRedux = __webpack_require__(50);
  
  var _services = __webpack_require__(94);
  
  var _serviceListSelector = __webpack_require__(95);
  
  var _serviceListSelector2 = _interopRequireDefault(_serviceListSelector);
  
  var _isLoadingSelector = __webpack_require__(81);
  
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
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(113);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _constants = __webpack_require__(37);
  
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
  
  var ServiceList = function (_Component) {
    (0, _inherits3.default)(ServiceList, _Component);
  
    function ServiceList() {
      (0, _classCallCheck3.default)(this, ServiceList);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ServiceList).call(this));
  
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
        if (!data.length) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '5', style: { "textAlign": "center" } },
            '暂无数据~'
          )
        );
        if (data.length == 1 && data[0] == 1) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '5', style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        if (data.length == 1 && data[0] == 0) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '5', style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        var body = [];
        data.map(function (item, i) {
          var serviceState = "";
          var option = "";
          switch (item.fservice_status.toLowerCase()) {
            case Const.SERVICE_STATE.Running:
              serviceState = "运行";
              option = _react2.default.createElement(
                _reactBootstrap.SplitButton,
                {
                  onClick: _this2.changeState.bind(_this2, item.fservice_name, "stop"),
                  onSelect: _this2.deleteService.bind(_this2, item.fservice_name),
                  bsStyle: "default",
                  title: '关闭', id: 'volumes-table-line-' + i },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '1' },
                  '删除'
                )
              );
              break;
            case Const.SERVICE_STATE.Stopping:
              serviceState = "停止";
              option = _react2.default.createElement(
                _reactBootstrap.SplitButton,
                {
                  onClick: _this2.changeState.bind(_this2, item.fservice_name, "start"),
                  onSelect: _this2.deleteService.bind(_this2, item.fservice_name),
                  bsStyle: "primary",
                  title: '启动', id: 'volumes-table-line-' + i },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '1' },
                  '删除'
                )
              );
              break;
            case Const.SERVICE_STATE.Pending:
              serviceState = "创建中";
              option = _react2.default.createElement(_reactBootstrap.SplitButton, {
                onClick: _this2.deleteService.bind(_this2, item.fservice_name),
                bsStyle: "danger",
                title: '删除', id: 'volumes-table-line-' + i });
              break;
            default:
              serviceState = "";
          }
          var domain = [];
          item.container.map(function (obj) {
            var url = obj.http_domain == null ? obj.tcp_domain : obj.http_domain;
            domain.push(url);
          });
          body.push(_react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'mediaItem' },
                _react2.default.createElement(
                  _Link2.default,
                  { to: '/serviceList/' + item.fservice_name + '/1' },
                  _react2.default.createElement('img', { className: 'mediaImg', src: '/slImgJx.png' }),
                  _react2.default.createElement(
                    'span',
                    { className: 'mediaTxt' },
                    item.fservice_name
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'span',
                { className: 'color333' },
                item.ltime
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                null,
                domain.map(function (url, j) {
                  return _react2.default.createElement(
                    'p',
                    { key: j },
                    _react2.default.createElement(
                      'a',
                      { href: 'http://' + url, target: '_blank', className: 'clLink' },
                      url
                    )
                  );
                })
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                {
                  className: 'mirror-state ' + (serviceState == "运行" ? "on" : "off") + ' tablePaddingLeft' },
                serviceState
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'btn-group' },
                option
              )
            )
          ));
        });
        return body;
      }
    }, {
      key: 'getDemoTable',
      value: function getDemoTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-hover table-bordered services-table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '服务名称'
              ),
              _react2.default.createElement(
                'th',
                { width: '10%' },
                '部署时间'
              ),
              _react2.default.createElement(
                'th',
                { width: '45%' },
                '域名'
              ),
              _react2.default.createElement(
                'th',
                { width: '10%' },
                '状态'
              ),
              _react2.default.createElement(
                'th',
                { width: '15%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            { ref: 'tableBody' },
            this.getTableBody()
          )
        );
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
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'hbHd clearfix' },
            _react2.default.createElement(
              'div',
              { className: 'hbAdd left' },
              _react2.default.createElement(
                _Link2.default,
                { to: '/choseImage' },
                _react2.default.createElement(
                  'div',
                  { className: 'hbAddBtn clearfix' },
                  _react2.default.createElement('div', { className: 'hbPlus left' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'hbPlusInfo left' },
                    _react2.default.createElement(
                      'p',
                      { className: 'hbPName' },
                      '新建服务'
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'hbPInfo' },
                      'Create Service'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: 'hbAddExplain' },
                '什么是容器云服务？'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'slSearch right' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default icon-refresh', onClick: this.refresh.bind(this), title: '刷新' },
                ' '
              ),
              _react2.default.createElement(
                'div',
                { className: 'search' },
                _react2.default.createElement('input', { type: 'text', placeholder: '搜索服务', ref: 'searchInput', className: "slSearchInp" }),
                _react2.default.createElement(
                  'a',
                  { type: 'button', className: 'slSearchBtn icon-select', onClick: this.searchService.bind(this) },
                  ' '
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'sl-bd TableTextLeft' },
            this.getDemoTable()
          ),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '您确定要删除此服务吗?',
            ref: 'confirmModal',
            func: function func() {
              _this3.props.onDeleteService(_this3.state.delData);
            }
          })
        );
      }
    }]);
    return ServiceList;
  }(_react.Component);
  
  ServiceList.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  ServiceList.propTypes = {
    serviceList: _react2.default.PropTypes.array,
    onServiceListLoad: _react2.default.PropTypes.func,
    onDeleteService: _react2.default.PropTypes.func,
    stepFunc: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    onChangeState: _react2.default.PropTypes.func,
    onClearServiceList: _react2.default.PropTypes.func,
    isLoading: _react2.default.PropTypes.bool
  };
  exports.default = ServiceList;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _DeployServiceContainer = __webpack_require__(153);
  
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
  
  exports.default = {
  
    path: '/addService',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_DeployServiceContainer2.default, null));
  
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _DeployService = __webpack_require__(154);
  
  var _DeployService2 = _interopRequireDefault(_DeployService);
  
  var _reactRedux = __webpack_require__(50);
  
  var _deployService = __webpack_require__(109);
  
  var _volumes = __webpack_require__(98);
  
  var _volumesListSelector = __webpack_require__(99);
  
  var _volumesListSelector2 = _interopRequireDefault(_volumesListSelector);
  
  var _deployDataSelector = __webpack_require__(159);
  
  var _deployDataSelector2 = _interopRequireDefault(_deployDataSelector);
  
  var _isSidebarOpenSelector = __webpack_require__(70);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(19);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceStep = __webpack_require__(155);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _constants = __webpack_require__(37);
  
  var _route = __webpack_require__(57);
  
  var _notification = __webpack_require__(77);
  
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
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AutoStartUpToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return AutoStartUpToggle;
  }(_react.Component);
  
  AutoStartUpToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    isState: _react2.default.PropTypes.bool
  };
  
  var AddService = function (_Component2) {
    (0, _inherits3.default)(AddService, _Component2);
  
    function AddService(props) {
      (0, _classCallCheck3.default)(this, AddService);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AddService).call(this, props));
  
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
          return _react2.default.createElement(
            'tr',
            { key: item.at },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'div',
                  { className: 'iaBox' },
                  _react2.default.createElement('input', { type: 'number', ref: 'container_port', onBlur: _this6.isPortRepeat.bind(_this6, i), className: 'form-control form-control-sm', defaultValue: item.container_port }),
                  _react2.default.createElement(
                    'span',
                    { className: 'iaOk icon-right', onClick: _this6.focusVal.bind(_this6, i) },
                    ' '
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'iaDel icon-delete', onClick: _this6.delVal.bind(_this6, i) },
                    ' '
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'protocol', selected: item.protocol },
                  _react2.default.createElement(
                    'option',
                    { value: 'TCP' },
                    'TCP'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'UDP' },
                    'UDP'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'access_mode', selected: item.access_mode },
                  _react2.default.createElement(
                    'option',
                    { value: 'HTTP' },
                    'HTTP'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'TCP' },
                    'TCP'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'no' },
                    '不可访问'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'access_scope', selected: item.access_scope },
                  _react2.default.createElement(
                    'option',
                    { value: 'outsisde' },
                    '外部范围'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'inside' },
                    '内部范围'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: 'delBtn', onClick: _this6.delPortTr.bind(_this6, item.at) },
                ' '
              )
            )
          );
        });
        return tr;
      }
    }, {
      key: 'getPortTable',
      value: function getPortTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-bordered' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '容器端口'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '协议'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '访问方式'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '访问范围'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            { ref: 'tab_container_body' },
            this.getPortTableBody()
          )
        );
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
            return _react2.default.createElement(
              'option',
              { key: i, value: item.disk_name },
              item.disk_name,
              ' '
            );
          } else {
            return;
          }
        });
        var data = [],
            sd = this.props.deployData;
        if (sd && sd.volume && sd.volume.length) data = this.props.deployData.volume;
        var tr = data.map(function (item, i) {
          return _react2.default.createElement(
            'tr',
            { key: item.at },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'volumn_name', defaultValue: item.disk_name,
                    onChange: _this7.isSaveRepeat.bind(_this7, i)
                  },
                  _react2.default.createElement(
                    'option',
                    { key: '-1', value: '-1' },
                    '请选择数据卷'
                  ),
                  options
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement('input', { type: 'text', defaultValue: item.disk_path, className: 'form-control',
                  onBlur: _this7.isPathValidata.bind(_this7), ref: 'container_path' })
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('input', { type: 'checkbox', defaultChecked: item.readonly == 1 }),
                  ' 是否只读'
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: 'delBtn', onClick: _this7.delSaveTr.bind(_this7, item.at) },
                ' '
              )
            )
          );
        });
  
        return tr;
      }
    }, {
      key: 'getSaveTable',
      value: function getSaveTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-bordered' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '数据卷名称'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '容器路径'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '是否只读'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            { ref: 'tab_storage_body' },
            this.getSaveTableBody()
          )
        );
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
          return _react2.default.createElement(
            'div',
            { key: item.at, className: 'astKeyItem' },
            _react2.default.createElement(
              'div',
              { className: 'astInp' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', onBlur: _this8.isEnvKey.bind(_this8, i), ref: 'env_key', placeholder: '键', defaultValue: item.env_key })
            ),
            _react2.default.createElement('div', { className: 'astLine' }),
            _react2.default.createElement(
              'div',
              { className: 'astInp' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', onBlur: _this8.isEnvValue.bind(_this8), ref: 'env_value', placeholder: '值', defaultValue: item.env_value })
            ),
            _react2.default.createElement(
              'div',
              { className: 'astDel' },
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: 'delBtn', onClick: _this8.delEnvironmentData.bind(_this8, item.at) },
                ' '
              )
            )
          );
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
        var volumeLength = n == 0 ? "暂时没有数据卷" : '目前有' + n + '个数据卷';
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'asTab' },
            _react2.default.createElement(_ServiceStep2.default, { dataActive: 'third' }),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '端口',
                titleEnglish: 'PORT',
                titleInfo: '容器端口会映射到主机端口上'
              }),
              _react2.default.createElement(
                'div',
                { className: 'astBox' },
                this.getPortTable()
              ),
              _react2.default.createElement(
                'div',
                { className: 'assBtnBox' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary', onClick: this.addPortTr.bind(this) },
                  '添加'
                ),
                _react2.default.createElement('span', { className: this.state.port ? "inputTip inputTipShow" : "inputTip", ref: 'portTip' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '存储设置',
                titleEnglish: 'SAVE SETTING',
                titleInfo: volumeLength
              }),
              _react2.default.createElement(
                'div',
                { className: 'astBox', ref: 'tab_save_box' },
                this.getSaveTable()
              ),
              _react2.default.createElement(
                'div',
                { className: 'assBtnBox' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary', onClick: this.addSaveTr.bind(this) },
                  '添加'
                ),
                _react2.default.createElement('span', { className: this.state.volume ? "inputTip inputTipShow" : "inputTip", ref: 'volumeTip' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '环境变量',
                titleEnglish: 'ENVIRONMENT VARIABLE',
                titleInfo: ''
              }),
              _react2.default.createElement(
                'div',
                { className: 'astBox', ref: 'tab_env_box' },
                this.getEnvironment()
              ),
              _react2.default.createElement(
                'div',
                { className: 'assBtnBox' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary', onClick: this.addEnvironmentData.bind(this) },
                  '添加'
                ),
                _react2.default.createElement('span', { className: this.state.env ? "inputTip inputTipShow" : "inputTip", ref: 'envTip' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '启动命令',
                titleEnglish: 'JRE',
                titleInfo: '启动命令解释说明 '
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('input', { className: 'form-control',
                  type: 'text',
                  ref: 'command',
                  placeholder: '如果输入，会覆盖镜像的默认启动命令'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem assItemNoborder' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '自动启动',
                titleEnglish: 'AUTO UPDATE SETTING',
                titleInfo: '自动启动设置'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement(AutoStartUpToggle, { isState: data.auto_startup == 1, getToggle: this.getIsStartUp.bind(this) })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'fixedBottom' },
              _react2.default.createElement(
                'div',
                { style: { "marginLeft": this.props.isSidebarOpen ? "209px" : "79px" } },
                _react2.default.createElement(
                  _Link2.default,
                  { className: 'btn btn-primary', to: '/configContainer', onClick: this.onChangeStep.bind(this) },
                  '上一步'
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary ' + (!this.props.isBtnState.deploy ? "btn-loading" : ""),
                    onClick: this.deployService.bind(this),
                    disabled: !this.props.isBtnState.deploy },
                  this.props.isBtnState.deploy ? "部署" : "部署中..."
                )
              )
            )
          )
        );
      }
    }]);
    return AddService;
  }(_react.Component);
  
  AddService.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  AddService.propTypes = {
    onDeployService: _react2.default.PropTypes.func,
    volumeList: _react2.default.PropTypes.array,
    onVolumeListLoad: _react2.default.PropTypes.func,
    deployData: _react2.default.PropTypes.object,
    onDeploySenior: _react2.default.PropTypes.func,
    onAddPort: _react2.default.PropTypes.func,
    onDelPort: _react2.default.PropTypes.func,
    onAddSave: _react2.default.PropTypes.func,
    onDelSave: _react2.default.PropTypes.func,
    onAddEnv: _react2.default.PropTypes.func,
    onDelEnv: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    isSidebarOpen: _react2.default.PropTypes.bool,
    isBtnState: _react2.default.PropTypes.object
  };
  exports.default = AddService;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ServiceStep = __webpack_require__(156);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _classnames = __webpack_require__(65);
  
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
  
      return _react2.default.createElement(
        'div',
        { className: _ServiceStep2.default.ssHd },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(activeFirst) },
          _react2.default.createElement('div', { className: (0, _classnames2.default)(_ServiceStep2.default.ssHdIcon, "icon-mirrorceer") }),
          _react2.default.createElement(
            'div',
            { className: _ServiceStep2.default.ssHdName },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                '1'
              ),
              '镜像来源'
            ),
            _react2.default.createElement(
              'p',
              null,
              'MIRRIR SOURCE'
            )
          ),
          _react2.default.createElement('div', { className: _ServiceStep2.default.ssActiveIcon })
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(activeSecond) },
          _react2.default.createElement('div', { className: (0, _classnames2.default)(_ServiceStep2.default.ssHdIcon, "icon-containerconfig") }),
          _react2.default.createElement(
            'div',
            { className: _ServiceStep2.default.ssHdName },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                '2'
              ),
              '容器配置'
            ),
            _react2.default.createElement(
              'p',
              null,
              'CONFIGURATION'
            )
          ),
          _react2.default.createElement('div', { className: _ServiceStep2.default.ssActiveIcon })
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(activeThird) },
          _react2.default.createElement('div', { className: (0, _classnames2.default)(_ServiceStep2.default.ssHdIcon, "icon-advancedset") }),
          _react2.default.createElement(
            'div',
            { className: _ServiceStep2.default.ssHdName },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                '3'
              ),
              '高级设置'
            ),
            _react2.default.createElement(
              'p',
              null,
              'ADVANCED SETUP'
            )
          ),
          _react2.default.createElement('div', { className: _ServiceStep2.default.ssActiveIcon })
        )
      );
    }
  });
  
  exports.default = (0, _withStyles2.default)(_ServiceStep2.default)(ServiceStep);

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(157);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ServiceStep.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ServiceStep.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, ".ServiceStep_ssHd_2b7{\n  height:80px;\n  border-bottom:1px solid #e0e0e0;\n  padding:25px 0 0 80px;\n}\n.ServiceStep_ssHdBox_pGl{\n  display:inline-block;\n  width:30%;\n  height:55px;\n  position: relative;\n}\n.ServiceStep_ssHdIcon_1W1{\n  width:45px;\n  height:43px;\n  display:inline-block;\n  position: relative;\n}\n.ServiceStep_ssHdIcon_1W1:before{\n  display:inline-block;\n  font-size:45px;\n  position: absolute;\n  color:#afafaf;\n}\n.ServiceStep_ssHdName_1W4{\n  display:inline-block;\n  margin-left:4px;\n  vertical-align: top;\n  margin-top:5px;\n}\n.ServiceStep_ssHdName_1W4 p{\n  color:#afafaf;\n  font-size:16px;\n  line-height:16px;\n}\n.ServiceStep_ssHdName_1W4 p:last-child{\n  font-size:10px;\n  margin-top:3px;\n}\n.ServiceStep_ssHdName_1W4 span{\n  display:inline-block;\n  font-size:20px;\n  position: relative;\n  top:2px;\n  margin-right:4px;\n}\n.ServiceStep_ssActiveIcon_jSI{\n  position: absolute;\n  height:20px;\n  width:160px;\n  background: url(" + __webpack_require__(158) + ") 0 -137px no-repeat;\n  top:53px;\n  left:-12px;\n  display: none;\n}\n.ServiceStep_ssHdBox_pGl.ServiceStep_ssActive_1cJ .ServiceStep_ssHdName_1W4 p{\n  color:#2dafdf;\n}\n.ServiceStep_ssHdFirst_1jI.ServiceStep_ssActive_1cJ .ServiceStep_ssHdIcon_1W1:before{\n  color:#2dafdf;\n}\n.ServiceStep_ssHdSecond_12T.ServiceStep_ssActive_1cJ .ServiceStep_ssHdIcon_1W1:before{\n  color:#2dafdf;\n}\n.ServiceStep_ssHdThird_3Pp.ServiceStep_ssActive_1cJ  .ServiceStep_ssHdIcon_1W1:before{\n  color:#2dafdf;\n}\n.ServiceStep_ssActive_1cJ .ServiceStep_ssActiveIcon_jSI{\n  display:block;\n}\n\n", "", {"version":3,"sources":["/./components/ServiceStep/ServiceStep.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,gCAAgC;EAChC,sBAAsB;CACvB;AACD;EACE,qBAAqB;EACrB,UAAU;EACV,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,WAAW;EACX,YAAY;EACZ,qBAAqB;EACrB,mBAAmB;CACpB;AACD;EACE,qBAAqB;EACrB,eAAe;EACf,mBAAmB;EACnB,cAAc;CACf;AACD;EACE,qBAAqB;EACrB,gBAAgB;EAChB,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,cAAc;EACd,eAAe;EACf,iBAAiB;CAClB;AACD;EACE,eAAe;EACf,eAAe;CAChB;AACD;EACE,qBAAqB;EACrB,eAAe;EACf,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;CAClB;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,6DAA4D;EAC5D,SAAS;EACT,WAAW;EACX,cAAc;CACf;AACD;EACE,cAAc;CACf;AACD;EACE,cAAc;CACf;AACD;EACE,cAAc;CACf;AACD;EACE,cAAc;CACf;AACD;EACE,cAAc;CACf","file":"ServiceStep.css","sourcesContent":[".ssHd{\n  height:80px;\n  border-bottom:1px solid #e0e0e0;\n  padding:25px 0 0 80px;\n}\n.ssHdBox{\n  display:inline-block;\n  width:30%;\n  height:55px;\n  position: relative;\n}\n.ssHdIcon{\n  width:45px;\n  height:43px;\n  display:inline-block;\n  position: relative;\n}\n.ssHdIcon:before{\n  display:inline-block;\n  font-size:45px;\n  position: absolute;\n  color:#afafaf;\n}\n.ssHdName{\n  display:inline-block;\n  margin-left:4px;\n  vertical-align: top;\n  margin-top:5px;\n}\n.ssHdName p{\n  color:#afafaf;\n  font-size:16px;\n  line-height:16px;\n}\n.ssHdName p:last-child{\n  font-size:10px;\n  margin-top:3px;\n}\n.ssHdName span{\n  display:inline-block;\n  font-size:20px;\n  position: relative;\n  top:2px;\n  margin-right:4px;\n}\n.ssActiveIcon{\n  position: absolute;\n  height:20px;\n  width:160px;\n  background: url(\"./serviceStepIcon.png\") 0 -137px no-repeat;\n  top:53px;\n  left:-12px;\n  display: none;\n}\n.ssHdBox.ssActive .ssHdName p{\n  color:#2dafdf;\n}\n.ssHdFirst.ssActive .ssHdIcon:before{\n  color:#2dafdf;\n}\n.ssHdSecond.ssActive .ssHdIcon:before{\n  color:#2dafdf;\n}\n.ssHdThird.ssActive  .ssHdIcon:before{\n  color:#2dafdf;\n}\n.ssActive .ssActiveIcon{\n  display:block;\n}\n\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"ssHd": "ServiceStep_ssHd_2b7",
  	"ssHdBox": "ServiceStep_ssHdBox_pGl",
  	"ssHdIcon": "ServiceStep_ssHdIcon_1W1",
  	"ssHdName": "ServiceStep_ssHdName_1W4",
  	"ssActiveIcon": "ServiceStep_ssActiveIcon_jSI",
  	"ssActive": "ServiceStep_ssActive_1cJ",
  	"ssHdFirst": "ServiceStep_ssHdFirst_1jI",
  	"ssHdSecond": "ServiceStep_ssHdSecond_12T",
  	"ssHdThird": "ServiceStep_ssHdThird_3Pp"
  };

/***/ },
/* 158 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACcCAYAAAD4d6D7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphMjM4ZTVhYy1lMzYyLTQwYjctOTQzMy00ZTQ5ZjBlNWNiZjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mjc1QzIwQUQ1NkNBMTFFNjhGRjdDNUQzQTNENEZENUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjc1QzIwQUM1NkNBMTFFNjhGRjdDNUQzQTNENEZENUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphMjM4ZTVhYy1lMzYyLTQwYjctOTQzMy00ZTQ5ZjBlNWNiZjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTIzOGU1YWMtZTM2Mi00MGI3LTk0MzMtNGU0OWYwZTVjYmYxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fMcl2gAAFK9JREFUeNrsXQmYVMURruUSUAQEREXx4oon3oJE0cQjmigSNWq8gLhGjSaCeCDxJoKCZ8SwGm/FaIwYc5h4ABEPPKKCGhCUQ+UQcEXOZVk2/e/7+9vex9vZmdk3s7P1ur6vvp3tee/1VPf/uqurqquL9n5unsREPzZ8jeHdDY83fIfhlfV96IwBu6R9bUlJSUHLUlxcLJ5qUpMYnnG84bcNv2D4UMOdDF9neB47sU0jag9NsqgH4HGG3zL8d8MHsexbDFr83N7wzYY/N3yl4a0KuB00yaIegOisNwz/0/AhLMP0dIPhXQ33NjzA8If8rqPh0YY/MzzUcKsCA54WWdQD8Bins/qw7DvDN7GzrueoUWn4ecP7GT7F8Ee8dlvD4ziKXGq4ZQPKrUkW9QD8oeFphv/ldNYqw6PYWdcaLo24D533rOF9DZ9heBbLtzN8l+G5hi8y3CKP8mqSRT0AjzL8muGXDB/GstWGb2FnjTT8TRp1bDL8lOE9DZ9j+FOWdzF8L//H8rB5DuXUJIt6APY3PNXwK4b7OZ01hp01wvCKLOpC5z3GzhvElSVoZ8MTDM9mebMY5dMki3oAHm54Mvlwlq0xfJvh3QxfZXh5DHVuNPyw4Z4cLRawHIB40PAnhs823LQedWiSRT0A9+IIMZUjhu2sseysKwwvy0Hd5YbvN9yD+tOXLO9u+FEq/Mdl+ExNsiQGgGOoI1l6ip013PDXefgNGwzfx866jgo/qJfhpzN8liZZEgPAFziVWDrJ8OWG2+Xxd7TgyHGJ4SKnfGKGz9EkS2IA+AfDexh+jm9sK44YMC0My7FpoQl1pDkS2NU6shxeiSMMX5Dh8zTJkqhFCBptoOG+hl9nWQfqTjAtnCHx+I1dgk70X+pIXVk2y/kd/8nyuZpkSZwZ5i2aK9Bw/3NMC08aftfwD2KoE77WVyXwQuzLssUcIfZ2Rq/6kiZZEgNAS2i4fQz/kg0KgjvqZTZ27yzq6mb4T4anGz6SZXB3jeR3JSH9LS7SJEsiANiZf9GAE2hagItqtTPdvCeB/atrGnXAXQUvAWxip1Exx2rxDq4W4QZby2vj9qlqkkU9APeg2WJRaGRAZ93EN3s8OxP3nUs959ZaVpkIWbqBOhlWhXBPwYPwOIGAaJLlztQI/QleiTvZ0fUhTbKoB2A36kUzDf+MZXDa/1pqhhstNXyx4e8Z/kuKVSb4VxJEilwr1bFzLxo+gCvFBc5zWxu+m+WtWe/nXDRsk8XUqEWWxADwP6GVoevjXBdxDzrop1zdTQutMjFCfGz4HgmiiUHvSGAc/pHhDyKet5b2OgQJTGZZK4JgQobyaJIlMQCcGyrbLc23FavM7xs+mTqRUI/q5nTu6RIEek5O43fsRnZpQYbyaJIlMQDEFHW5o8Pg7X2DU1OPNJ4xiSaIC6hzLeH0tidXinWZIexC4DHqT64NbXiG8miSJTEAxCpuHFdxt3KqKuJo8DFXfXUp0htpetjJ8I5U8DdkYEPrHZMNTZMsiVsFw46FDTdwnD/EVV4zrvrmhJTw2gj3VBSADU2TLImzAy40PFgCY+2LITMEXFkXSnaBlpnY0OIiTbIkBoDt+XcGV3twWb3Psu05Jc3ktJYOZWJD6xizfJpkUQ3AJlSU36DiPdZpwFdp8zpTqkPPe1Gxh7O/Ty3PzsSGBn3rj6wbppSj6ymTFlkSAcATJXDWP8sOaEG72SDnOijQE9lZw5y3vK+zyuzJsiLa4tK1oeF6eCKw7bEpzSH/5nP3y1AeTbIkBoCPOyYKdM6NtIHdVssq83bqOWOk2riLKQxh5whLR6TJkyEb2s9S2NBQJ7IO7Co1gzb7cPTKhDTJkhgAljgmArzBl9L21aqOVeZVEavMXxjen9dYGxr8sk/XYYaAPoYtkqc6ZQDEwxnKo0mWxADwcr7RU1jWjiMCDKjnSergTbvK7O2sMuHwv44jC5T88hT3t+OIgZGlmB2/iUAAIB7LUB5NsiRqEfIO7VgnSE1XFBoPkb517eiaSX2oF++7UapDnmpT6i/jahJZp1qz/G8SxO4NJiCyIU2yJM4M8w8JLPdDDH/FMrimYOF/JQ1FGhuyS+uo7yza4G6XzfdN/IQKfxykSZZE2QExbTzIaWckdSThqu89KuW7ZFFXlJ90tuR234QmWRIDQFdxHsXOu5urRmuWmB2yr6Wi2vykCJHHRvJ8+Ek1yZIYAFqCnQyBlXvStFBJvWcY9Z4ralllRvlJV3IkAhAQH5dvP6kmWRIDQHFsYGemscqszU96JzsSI9GaBpZbkyyJAWA6q8wZsrmf9AkJPAuXSTwJgeIkTbIkBoCpVpmY2lw/6YFcKc4v8HbQJEtiABi1yvyaZghEncCW9n4jagtNsjQaKqqs9Is2Tx6AnjwAPXnyAPTkAejJkwegJw9AT57yAMAYj2tFCBLsZwdLsMEHUcGvxfHgTI5snTRpUsHLM2DAAI88UhypahHahGMRpkiQGmNrCQy3CElC5Ej/RtYm2uRRC0Ac+IeMUgjuPNwpd8/hgJ91Mjv0qAJvC23yqAUgRgNsM8SBf4c55XBbwamPrKSIBn7H+e5wduw0dnQhkTZ51AIQznrEw8Fx727gRucdxzJ8h1XN36g7ncCOtHQYOxo61Z4NLLs2eVQDEFEh/2YnWIJCfrTTCVFkO9ceDG0JYeuIMGmoA5+1yaMegFC8bVqz16n/YBp6Oc377fSG6epNlu3IlWZDkDZ51ANwa+czdv3vk8Xb3prTnps5tKHyJmuTJ1GLkB0kCEmHAXGoVO+DTTXdXc7rx0n10QmFQtrkSYwZpjM7AB0xXDZP+NhGgpQXyCiF3CzbsrxQN+9ok0c9AC2hI25lx6CDcHz9NexIeA9sRils5sFhggcWeJtok6egKc4j5Tuxg24Jla+XIF/eaAkOcm7bSNpGmzzqARgmbAYv4XT1lYK20iaPagBiS+OxEqQ100Da5FGlA0bRF8o66wsPvoYF4I4x1uk+q0sDya1NHrUAhKUfLqoxMdS1uwT7bt2cylhtTpH8RZZok0ctAK2vEy6nfvWsAxu9H5Yg58qgCL0T7qtXCIxcRZZok0ctAG20B9KPhSNE8B1yoixK89nIoYJzc5Fz5Vyno2C6QO5mhDhNd67vR4DYaJQ4SJs8agGIFR7i3RB2dIjzvRshgkiQOzn1XMqGr41wPAGyg57tdBTS1CLRN7JK3cO6DpXNI0v6EDDTJfszNrTJoxqAyAZvk+9YshG/UREi69ng3dgBUfmP4exvys/zJUjgaBN9l4WutZElR0vNPRcH87vBGcqkTR71ABwZmpqgw/SXus/FLWMHdGeHLA19v5hgwLkdSOBY14mTLxMgR0l10Cfy8V2doUza5FEPwJ2d/3GEPfY9tMtQKUcHdwqVb8tndcvgWdvwnu85ZbtlKJM2eRK1CMHhftdzmrlRUse3IRbuGQm8BKdHPAtT1s8lOHUI6XBThax3kCDbKBz+v5Wa/tX6GMu1yZMYM0xbNtw8NmQH5zsk58Z5ah9KcCaafcY8iU7e2IQdOoMdvLfznXX4474RUh0oulpqbgKqL2mTRz0AXeV7BBsUTvjnJTjs5WTqM6DPqFj3lNTnYjRhB3/IDrexdwh5srF3q9iBmKYeyoG82uRp9JRuMIKNAnYJxxv8ToKzNjIJyiySzc/nXcmVKA58/iYPcmuTRz0AXcJxqDgTDccWVNSzfpxEdJcEZ3eUNlAbaJNHPQCxBfHbmOq/RILM8w1J2uRRpQNGUZzptAohNZc2edQD0JOnWAFYHtOz4AfdK6Zn4dDnE/i5LMN7tcmjHoBvxdC40Hvg9tq5ns/CuW1XSnAEqu2waRk+Q5s86gGIo6jmZ3EvMglcw8Y9U6rtaPOz/C0wZcDuht1m1o42l4p9JqRNHvUAhGtpDwmc+KszaNxZNF+4jYvzcnfl37lpPgt1w3EPY671s67m79mHZpJMSJs8iViE2PN00XgT61jNvcjG7cr/Ye2HURe+0edY9hz1p7pAgIBQeBJ+4KwiH5Eg4mQUf1c2pE2exKyCv+D0A9vY2ymUc5A9Ww0uK7ihwuFJZWz0HrwuCgSI2Wvm6G6o9zwJQp/iIG3yJMYMg8ZDJO+QWhrvTTb2kDQadzGv61vLAgHfn5Xi+zhImzzqAeiOCHjj4SMtpf6CEQURv+9nAYK+vB+K/grqXD246sy1EVebPCrInxPiyQPQkwegJ08egJ48AD158gD05AHoyZMHoKcEADCG41qx1xYhR6dKkB8P6Wv/LEEUSL025GRyTKulkpKSgpWnuLjYIy5E9U3Ri+SMUyRI8GMJ0SM45gARJP0lddKfQiNt8hQ81Tck/yGnsxAxcpVUR5DYBI6NibTJoxqAiBr5IT/fwhFiDP/aow2QIapXI2kLbfI0+ikYEcKI6jiCn2dwhLDpy9yUFOGRAedoXO1cN4ufEXOHrKIIzERsHNKmPS75iZPTJo9qAOItf0FqZoIayE443/BjUnO/xLLQ/cudzzbQ8xwJ0pq1dL5Dsp8rJMguOiuHcmqTR/UUjAb9q9NZCzlaIGvAFhJE+CKMaWyadYzl9Q/z2RV8nh15urG+ljmSUZs86gGIN7s7P2P1B1vIvhIEdCLYssjRg9axscNbDctYvs4ZgYp4fx8+bxeOFsL6zsmRjNrkUQ9Ae+jyLL7t1lKN9GJHstHnS7D7DIc+nyRBmluX1rN8O163kPcdKdVpyvDc25ypKleHPWuTR70OaKeOKKMrMkgdRB1pQxrP/87wfVTikTsv6oy1b0L15mIK1iSP+hHwI/5FUu2oo0i/SrOzXNpQS2cdyHrceuMmbfKoB+CD1HkwOj5P+1guqCf1qmasL1dGXm3yqAfgAgl2fUGnwXH2yC7fpY6Gx3bFlwy/y7+j6uhoPO9VCdJgVLK+BTmSUZs86gEIeoL6kZ1ulkdcAxPGeE41SHsLL8IB/DuC5eN5XZjwvHJncZDrnHra5FG7COlBk0JPxzQxOsIsgaQ7SD9hz11D42Nv7SKOMjBNNDd8oQSeA5xctDZk1hjDDsURBiMJEGQV+DRG+bTJo3YExBTyLzba04ZvcswPUW/zHU5nTaINDGaHM/h3F+pbwuvGRTzjccfccRPrnc3fsUM95dImj2oAIv5tikSf7IjGWxWhI13Az+iUgbL5gX/4/2Qq5aDzI3SoVXx+mPA7pkrqMz1SkTZ51AMQIUfdnJGgOxtrG44AYcIZGU05TV0ktWcAqOSUVc7rT4+45gynru6sX/h7rspSJm3yqAfgKfyMuLehEqQhKyVHRXXY0yfflLqPOl3E68Sxj7m0zqlrLuufxO9OzVImbfKoB6A1SUzPYIoDpRsZbK/rkOb1NqFPtnqTNnnUA/Cr0EhQF1lX044ZAmJFmtcf4ow22ZA2edQD8M/8DCX7dglCz9uTW0XcY/Ps9Unjrcb3fUP3udTKqWt31m9PHXomS5m0yaMegKOlOv3sZfz8DXlixD0oq6Bd7F6pzqUcpiLaxZrz+qcirnnSqWsu6xd+Hp2lTNrkUQ9ANFZ/CVxOYYLBtU2oDLatCfw8QIL0ttuHrtme5Sfx//ul2hNhqQ2fH6aX+Huy3QKpTR7V1MzRm46hbas3TQgwpiKkCGHmfwjdhzcb+yD6sdOO5+pwMTsL01kLXotjCYZF1P1zZ0q8VgKPwQcRHZutHqhJHrWUamP6JxK4lRawI8Puq5a0c/1CouMKceLkA4Z/E3HvFuwY7MNAePseUT8g5o3pDS6P35he+wgY9TZb3yne/I6yefwb3E4wzN5p+FzaxdpJcPAfFPRHUrz9HZ0RpRfry6UDX5s8qgG4M990u+fhSIkOvnR1qBFZTJF47mROcQ9wastFCJM2edQtQsI0mNMRppwTc6jDzObzN7K+wTmqR5s86gG4l2Pnejfi+y7OdJMutZDoINB3HXvaXjmSUZs86gFoQ4qiojd6soFnU19qU8fz2/C62bwvKqp4m1C9cZM2edQDcKqjTA+TasMsdo8h7BzeACxPYZRdKoGzvWXEinISvx/P6204/EF2BS7BkVi9QvXGTdrkUW+GQWNjp7/dzI09sDCiIhIYYUiVHAHcJD1YLa50/m/L1aOlWRwt0EnwIszkSGHTXMyRwA63PgdmmIKRx5th0p+CoUxbdxYatTc7q4wmCtjThqdZx3Befx6f3ZTPs501l/XlcgrWJI96M4x9w/EG22xSW0pg1XezSc13ru8UGjE6Op+tKeJRCSKVB7HD1kj+sklpk0c9AIWNeD85imaGTB2u7WxILdehs29oIFm1yaMegOnYvbCTDNsWr3ZWlPAgDOQ1L0vjSVOmTR71ABROP5iGdmcnDXS++4zfNybSJk+jXIRkQl9yhBhLHWoD/45leWNL6K1NnsI3w/hzQjx5AHryAPTkyQPQU/JWwftMmp9YBJ67Q5EMPairFBUV5aU+vOwLFy6UiUtEnlzsX/w4VsGNmh5dVFnlyM3bdGOA/o91bT34QlNwIlvjmfmr5OYPVggGv1H7d5ITdtoy53XeN+vbKm5i6hx9YCc5rsuWHoCVCVYCH5qzUu74uFSaG0SMO7iT9N+utQefB2B+6e5PSuWBT1dKy6ZF8vtDO8vBnVp68HkA5pdu/nCFPD1vlWzVvIlM6NtZ9m6/hQefB2D+CA0w4r1l8vcv1kj7LZrKA4d1lu5bt/Dg8wDMH1WYZrhs+jKZsmStdG7VTP7Yr7N03bK5B58HYP6orKJSLn5rqby9bH0V+ABCgLE+4BtjwHesB58HYLq0ZuMmKX59qcwsLauahjEdY1r24PMAzBt9u2GTDJm2ROZ8t6FqQYKFCRYoHnwegHmjZesrZNBrS2ThmvIq0wxMNDDVePB5AOaNvlyzUQaZkXDpuo1VRmoYq2G09uDzAMwbfbaqXAYbEJaWVVS56+C2czHowecBmHP6yCxIit9YKqvLN8lpu7aRa/btULUj3YPPAzBv9M7y9XLxm0tlfUWlDOnRVloY1HnweQDmlaYuWStD314m5ZuCJvPg8wDMO/3zyzVy9XvLqj578HkANgghlrBN8ybevRYD/V+AAQAbI/LsTYfpDAAAAABJRU5ErkJggg=="

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ChoseImageContainer = __webpack_require__(161);
  
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
  
  exports.default = {
  
    path: '/choseImage',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_ChoseImageContainer2.default, null));
  
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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ChoseImage = __webpack_require__(162);
  
  var _ChoseImage2 = _interopRequireDefault(_ChoseImage);
  
  var _reactRedux = __webpack_require__(50);
  
  var _deployService = __webpack_require__(109);
  
  var _imageList = __webpack_require__(96);
  
  var _imageListSelector = __webpack_require__(97);
  
  var _imageListSelector2 = _interopRequireDefault(_imageListSelector);
  
  var _deployDataSelector = __webpack_require__(159);
  
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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceStep = __webpack_require__(155);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Tabs = __webpack_require__(163);
  
  var _Tabs2 = _interopRequireDefault(_Tabs);
  
  var _Tab = __webpack_require__(164);
  
  var _Tab2 = _interopRequireDefault(_Tab);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _constants = __webpack_require__(37);
  
  var _utils = __webpack_require__(118);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '新建服务'; /**
                       * Created by zhangsai on 16/9/18.
                       */
  
  var ChooseImage = function (_Component) {
    (0, _inherits3.default)(ChooseImage, _Component);
  
    function ChooseImage() {
      (0, _classCallCheck3.default)(this, ChooseImage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ChooseImage).apply(this, arguments));
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
          return _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { colSpan: '5', style: { "textAlign": "center" } },
              '暂无数据~'
            )
          );
        }
        if (data.length == 1 && data[0] == 1) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '5', style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        var body = [];
        data.map(function (item, i) {
          body.push(_react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'mediaItem' },
                _react2.default.createElement(
                  _Link2.default,
                  { to: '/imageDetail/' + item.uuid },
                  _react2.default.createElement('img', { className: 'mediaImg', src: '/slImgJx.png' }),
                  _react2.default.createElement(
                    'span',
                    { className: 'mediaTxt' },
                    item.repository
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'span',
                { className: 'cl6' },
                (0, _utils.timeRange)(new Date(item.update_time))
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'span',
                { className: 'cl6' },
                'docker pull index.boxlinker.com/' + item.repository
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'span',
                { className: 'cl3' },
                item.short_description
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'button',
                { className: 'btn btn-sm btn-primary',
                  onClick: _this2.deployImage.bind(_this2, item.repository, item.uuid) },
                '部署'
              )
            )
          ));
        });
        return body;
      }
    }, {
      key: 'getDemoTable',
      value: function getDemoTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-hover table-bordered' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '镜像名称'
              ),
              _react2.default.createElement(
                'th',
                { width: '10%' },
                '最近更新'
              ),
              _react2.default.createElement(
                'th',
                { width: '35%' },
                '拉取命令'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '镜像描述'
              ),
              _react2.default.createElement(
                'th',
                { width: '10%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.getTableBody()
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle(title);
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'asTab' },
            _react2.default.createElement(_ServiceStep2.default, { dataActive: 'first' }),
            _react2.default.createElement(
              'div',
              { className: 'asHd clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'left' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '选择镜像',
                  titleEnglish: 'SELECT MIRROR',
                  titleInfo: '这里里汇聚了构建产生的所有容器云镜像'
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'right' },
                _react2.default.createElement(
                  'div',
                  { className: 'search' },
                  _react2.default.createElement('input', { type: 'text', placeholder: '搜索镜像', ref: 'searchInput', className: 'slSearchInp' }),
                  _react2.default.createElement(
                    'a',
                    { type: 'button', className: 'slSearchBtn icon-select' },
                    ' '
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'asTabs' },
              _react2.default.createElement(
                _Tabs2.default,
                { defaultActiveKey: 1, onSelect: this.tabSelect.bind(this), id: 'asTabs' },
                _react2.default.createElement(
                  _Tab2.default,
                  { eventKey: 1, title: '我的镜像' },
                  _react2.default.createElement(
                    'div',
                    { className: 'asTableBox TableTextLeft' },
                    this.getDemoTable()
                  )
                ),
                _react2.default.createElement(
                  _Tab2.default,
                  { eventKey: 3, title: '平台镜像' },
                  _react2.default.createElement(
                    'div',
                    { className: 'asTableBox TableTextLeft' },
                    this.getDemoTable()
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return ChooseImage;
  }(_react.Component);
  
  ChooseImage.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react2.default.PropTypes.object
  };
  ChooseImage.propTypes = {
    imageList: _react2.default.PropTypes.array,
    onImageListLoad: _react2.default.PropTypes.func,
    deployData: _react2.default.PropTypes.object,
    goToConfigContainer: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func
  };
  exports.default = ChooseImage;

/***/ },
/* 163 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap/lib/Tabs");

/***/ },
/* 164 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap/lib/Tab");

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ConfigContainer = __webpack_require__(166);
  
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
  
  exports.default = {
  
    path: '/configContainer',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_ConfigContainer2.default, null));
  
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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ConfigContainer = __webpack_require__(167);
  
  var _ConfigContainer2 = _interopRequireDefault(_ConfigContainer);
  
  var _reactRedux = __webpack_require__(50);
  
  var _deployService = __webpack_require__(109);
  
  var _deployDataSelector = __webpack_require__(159);
  
  var _deployDataSelector2 = _interopRequireDefault(_deployDataSelector);
  
  var _isSidebarOpenSelector = __webpack_require__(70);
  
  var _isSidebarOpenSelector2 = _interopRequireDefault(_isSidebarOpenSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _building = __webpack_require__(114);
  
  var _buildingDetailSelector = __webpack_require__(139);
  
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceStep = __webpack_require__(155);
  
  var _ServiceStep2 = _interopRequireDefault(_ServiceStep);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _ContainerBox = __webpack_require__(168);
  
  var _ContainerBox2 = _interopRequireDefault(_ContainerBox);
  
  var _reactInputRange = __webpack_require__(174);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _index = __webpack_require__(37);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _constants = __webpack_require__(37);
  
  var _route = __webpack_require__(57);
  
  var _notification = __webpack_require__(77);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '新建服务'; /**
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
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(InputRangesBox).call(this, props));
  
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
        return _react2.default.createElement(
          'div',
          { className: 'formField' },
          _react2.default.createElement(_reactInputRange2.default, {
            className: 'formField',
            maxValue: 10,
            minValue: 0,
            labelSuffix: '个',
            value: this.state.value,
            onChange: this.handleValueChange.bind(this)
          })
        );
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  InputRangesBox.propTypes = {
    getContianerNum: _react2.default.PropTypes.func,
    number: _react2.default.PropTypes.number
  
  };
  
  var UpdateStartToggle = function (_Component2) {
    (0, _inherits3.default)(UpdateStartToggle, _Component2);
  
    function UpdateStartToggle(props) {
      (0, _classCallCheck3.default)(this, UpdateStartToggle);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UpdateStartToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return UpdateStartToggle;
  }(_react.Component);
  
  UpdateStartToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.bool
  };
  
  var ConfigContainer = function (_Component3) {
    (0, _inherits3.default)(ConfigContainer, _Component3);
  
    function ConfigContainer() {
      (0, _classCallCheck3.default)(this, ConfigContainer);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ConfigContainer).call(this));
  
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
        // let my = this;
        // if(!my.props.deployData.image_id){
        //   my.context.store.dispatch(receiveNotification({message:"请先选择要部署的镜像",level:"danger"}));
        //   my.context.store.dispatch(navigate("/choseImage"));
        //   setTimeout(function(){
        //     my.context.store.dispatch(clearNotification())
        //   },3000);
        // }else{
        //   this.props.getBuildingDetail(this.props.deployData.image_id);
        // }
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
      key: 'aaa',
      value: function aaa(key, e) {
        this.refs.aaa.title = key;
        console.log(this.refs.aaa.props);
        this.refs.aaa.props.title = "qqqqqq";
        console.log(e.target.innerHTML);
      }
    }, {
      key: 'render',
      value: function render() {
        var ttt = "wwwww";
        this.context.setTitle(title);
        var data = this.props.deployData;
        var tags = this.props.buildingDetail.tags;
        var option = [];
        if (!tags || !tags.length) {
          option.push(_react2.default.createElement(
            'option',
            { key: 'latest', value: 'latest' },
            'latest'
          ));
        } else {
          tags.map(function (item, i) {
            option.push(_react2.default.createElement(
              'option',
              { value: item.tag, key: i },
              item.tag
            ));
          });
        }
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'asTab' },
            _react2.default.createElement(_ServiceStep2.default, { dataActive: 'second' }),
            _react2.default.createElement(
              'div',
              { className: 'assHd' },
              _react2.default.createElement(
                'div',
                { className: 'assItem' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '服务名称',
                  titleEnglish: 'SERVICE NAME',
                  titleInfo: '规则后定'
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'assBox ' + (this.state.isServiceName ? "has-error" : "") },
                  _react2.default.createElement('input', {
                    className: 'form-control',
                    ref: 'serviceName',
                    type: 'text',
                    placeholder: '',
                    defaultValue: data.service_name,
                    onChange: this.onServiceNameChange.bind(this)
                  }),
                  _react2.default.createElement(
                    'span',
                    { className: 'inputTip', ref: 'serviceNameTip' },
                    ' '
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'assItem' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '镜像名称',
                  titleEnglish: 'IMAGE NAME',
                  titleInfo: '描述'
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'assBox' },
                  _react2.default.createElement(
                    'p',
                    null,
                    data.image_name
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'assItem' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '镜像版本',
                  titleEnglish: 'MIRROR VERSION',
                  titleInfo: '更新于两个月前'
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'assBox' },
                  _react2.default.createElement(
                    'select',
                    { className: 'form-control', ref: 'imageVersion', defaultValue: data.image_version },
                    option
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.DropdownButton,
                    { title: ttt, id: '1', ref: 'aaa',
                      onSelect: this.aaa.bind(this)
                    },
                    _react2.default.createElement(
                      _reactBootstrap.MenuItem,
                      { eventKey: '1' },
                      'Dropdown link1'
                    ),
                    _react2.default.createElement(
                      _reactBootstrap.MenuItem,
                      { eventKey: '2' },
                      'Dropdown link2'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'assItem' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '容器配置',
                  titleEnglish: 'CONTAINER CONFIGURATION',
                  titleInfo: '规则后定'
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'assBox assBoxAuto' },
                  _react2.default.createElement(_ContainerBox2.default, { number: data.containerDeploy, getContainer: this.getContainer.bind(this) })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'assItem' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '容器个数',
                  titleEnglish: 'CONTAINER NUMBER',
                  titleInfo: '规则后定'
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'assBox formField' },
                  _react2.default.createElement(InputRangesBox, { number: data.pods_num, getContianerNum: this.getContainerNum.bind(this) })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'assItem assItemNoborder' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '自动更新设置',
                  titleEnglish: 'AUTO UPDATE SETTINGS',
                  titleInfo: '当镜像有更新时容器是否自动更新'
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'assBox' },
                  _react2.default.createElement(UpdateStartToggle, { state: data.policy == 1, getToggle: this.getToggleValue.bind(this) })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'fixedBottom' },
                _react2.default.createElement(
                  'div',
                  { style: { "marginLeft": this.props.isSidebarOpen ? "209px" : "79px" } },
                  _react2.default.createElement(
                    _Link2.default,
                    { className: 'btn btn-primary', to: '/choseImage' },
                    '上一步'
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-primary', onClick: this.onNextStep.bind(this) },
                    '下一步'
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return ConfigContainer;
  }(_react.Component);
  
  ConfigContainer.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react.PropTypes.object
  };
  ConfigContainer.propTypes = {
    deployData: _react2.default.PropTypes.object,
    deployContainer: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    onGoToService: _react2.default.PropTypes.func,
    isSidebarOpen: _react2.default.PropTypes.bool,
    buildingDetail: _react2.default.PropTypes.object,
    getBuildingDetail: _react2.default.PropTypes.func
  };
  exports.default = ConfigContainer;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContainerBox = __webpack_require__(169);
  
  var _ContainerBox2 = _interopRequireDefault(_ContainerBox);
  
  var _ContainerItem = __webpack_require__(171);
  
  var _ContainerItem2 = _interopRequireDefault(_ContainerItem);
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ContainerBox = function (_Component) {
    (0, _inherits3.default)(ContainerBox, _Component);
  
    function ContainerBox(props) {
      (0, _classCallCheck3.default)(this, ContainerBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ContainerBox).call(this, props));
  
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
        var data = _constants.CPU;
        var children = data.map(function (item, i) {
          return _react2.default.createElement(
            _ContainerItem2.default,
            { key: i, index: i, active: i == index, onClick: me.handleClick.bind(me, i) },
            _react2.default.createElement(
              'span',
              null,
              item.x
            ),
            _react2.default.createElement(
              'span',
              null,
              'x'
            ),
            _react2.default.createElement(
              'span',
              null,
              item.m,
              _react2.default.createElement(
                'span',
                null,
                '(公测)'
              )
            )
          );
        });
  
        return _react2.default.createElement(
          'div',
          null,
          children
        );
      }
    }]);
    return ContainerBox;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  ContainerBox.propTypes = {
    getContainer: _react2.default.PropTypes.func,
    number: _react2.default.PropTypes.number
  };
  exports.default = (0, _withStyles2.default)(_ContainerBox2.default)(ContainerBox);

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(170);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ContainerBox.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ContainerBox.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ContainerBox.css","sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContainerItem = __webpack_require__(172);
  
  var _ContainerItem2 = _interopRequireDefault(_ContainerItem);
  
  var _classnames = __webpack_require__(65);
  
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
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(style), onClick: this.handleClick },
        _react2.default.createElement(
          'p',
          { className: _ContainerItem2.default.csSize },
          sp1,
          _react2.default.createElement(
            'span',
            null,
            sp2
          )
        ),
        _react2.default.createElement(
          'p',
          { className: _ContainerItem2.default.csUnit },
          sp3
        )
      );
    }
  });
  
  exports.default = (0, _withStyles2.default)(_ContainerItem2.default)(ContainerItem);

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(173);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ContainerItem.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ContainerItem.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, ".ContainerItem_csItem_3Tt{\n  width:100px;\n  height:103px;\n  background:#f2f4f8;\n  border-radius:4px 4px 7px 7px;\n  border-top:3px solid #f2f4f8;\n  border-bottom:3px solid #d7c698;\n  display:inline-block;\n  margin-right:42px;\n  cursor:pointer;\n}\n.ContainerItem_csItem_3Tt:hover{\n  -webkit-box-shadow:0 3px 5px rgba(215,198,152,.35);\n          box-shadow:0 3px 5px rgba(215,198,152,.35);\n}\n.ContainerItem_csSize_1vC{\n  height:59px;\n  line-height:59px;\n  border-bottom:1px solid #ccc;\n  margin:0 22px;\n  text-align: center;\n  font-size:35px;\n}\n.ContainerItem_csSize_1vC span{\n  font-size:30px;\n}\n.ContainerItem_csUnit_3IG{\n  margin-top:10px;\n  text-align: center;\n  color:#666;\n}\n.ContainerItem_csItem_3Tt:nth-child(2){\n  border-bottom-color:#5eafce;\n}\n.ContainerItem_csItem_3Tt:nth-child(2):hover{\n  -webkit-box-shadow:0 3px 5px rgba(39,154,197,.35);\n          box-shadow:0 3px 5px rgba(39,154,197,.35);\n}\n.ContainerItem_csItem_3Tt:nth-child(3){\n  border-bottom-color:#a8ce6b;\n}\n.ContainerItem_csItem_3Tt:nth-child(3):hover{\n  -webkit-box-shadow:0 3px 5px rgba(130,165,75,.35);\n          box-shadow:0 3px 5px rgba(130,165,75,.35);\n}\n.ContainerItem_csItem_3Tt:nth-child(4){\n  border-bottom-color:#889bcb;\n}\n.ContainerItem_csItem_3Tt:nth-child(4):hover{\n  -webkit-box-shadow:0 3px 5px rgba(94,117,174,.35);\n          box-shadow:0 3px 5px rgba(94,117,174,.35);\n}\n.ContainerItem_csItem_3Tt:nth-child(5){\n  border-bottom-color:#ef6256;\n}\n.ContainerItem_csItem_3Tt:nth-child(5):hover{\n  -webkit-box-shadow:0 3px 5px rgba(168,91,85,.35);\n          box-shadow:0 3px 5px rgba(168,91,85,.35);\n}\n.ContainerItem_csActive_1e8{\n  background:#c8b88f;\n  border-top:3px solid #a4873e;\n  color:#fff;\n  border-bottom:0;\n}\n.ContainerItem_csActive_1e8 .ContainerItem_csUnit_3IG{\n  color:#fff;\n}\n.ContainerItem_csActive_1e8 .ContainerItem_csSize_1vC{\n  border-color:#fff;\n}\n.ContainerItem_csUnit_3IG span{\n  font-size:12px;\n}\n.ContainerItem_csItem_3Tt:nth-child(2).ContainerItem_csActive_1e8{\n  border-color:#439ec1;\n  background:#5eafce;\n}\n.ContainerItem_csItem_3Tt:nth-child(3).ContainerItem_csActive_1e8{\n  border-color:#80a643;\n  background:#a8ce6b;\n}\n.ContainerItem_csItem_3Tt:nth-child(4).ContainerItem_csActive_1e8{\n  border-color:#4666b7;\n  background:#889bcb;\n}\n.ContainerItem_csItem_3Tt:nth-child(5).ContainerItem_csActive_1e8{\n  border-color:#c34439;\n  background:#ef6256;\n}\n\n", "", {"version":3,"sources":["/./components/ContainerItem/ContainerItem.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,6BAA6B;EAC7B,gCAAgC;EAChC,qBAAqB;EACrB,kBAAkB;EAClB,eAAe;CAChB;AACD;EACE,mDAA2C;UAA3C,2CAA2C;CAC5C;AACD;EACE,YAAY;EACZ,iBAAiB;EACjB,6BAA6B;EAC7B,cAAc;EACd,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,WAAW;CACZ;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,kDAA0C;UAA1C,0CAA0C;CAC3C;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,kDAA0C;UAA1C,0CAA0C;CAC3C;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,kDAA0C;UAA1C,0CAA0C;CAC3C;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,iDAAyC;UAAzC,yCAAyC;CAC1C;AACD;EACE,mBAAmB;EACnB,6BAA6B;EAC7B,WAAW;EACX,gBAAgB;CACjB;AACD;EACE,WAAW;CACZ;AACD;EACE,kBAAkB;CACnB;AACD;EACE,eAAe;CAChB;AACD;EACE,qBAAqB;EACrB,mBAAmB;CACpB;AACD;EACE,qBAAqB;EACrB,mBAAmB;CACpB;AACD;EACE,qBAAqB;EACrB,mBAAmB;CACpB;AACD;EACE,qBAAqB;EACrB,mBAAmB;CACpB","file":"ContainerItem.css","sourcesContent":[".csItem{\n  width:100px;\n  height:103px;\n  background:#f2f4f8;\n  border-radius:4px 4px 7px 7px;\n  border-top:3px solid #f2f4f8;\n  border-bottom:3px solid #d7c698;\n  display:inline-block;\n  margin-right:42px;\n  cursor:pointer;\n}\n.csItem:hover{\n  box-shadow:0 3px 5px rgba(215,198,152,.35);\n}\n.csSize{\n  height:59px;\n  line-height:59px;\n  border-bottom:1px solid #ccc;\n  margin:0 22px;\n  text-align: center;\n  font-size:35px;\n}\n.csSize span{\n  font-size:30px;\n}\n.csUnit{\n  margin-top:10px;\n  text-align: center;\n  color:#666;\n}\n.csItem:nth-child(2){\n  border-bottom-color:#5eafce;\n}\n.csItem:nth-child(2):hover{\n  box-shadow:0 3px 5px rgba(39,154,197,.35);\n}\n.csItem:nth-child(3){\n  border-bottom-color:#a8ce6b;\n}\n.csItem:nth-child(3):hover{\n  box-shadow:0 3px 5px rgba(130,165,75,.35);\n}\n.csItem:nth-child(4){\n  border-bottom-color:#889bcb;\n}\n.csItem:nth-child(4):hover{\n  box-shadow:0 3px 5px rgba(94,117,174,.35);\n}\n.csItem:nth-child(5){\n  border-bottom-color:#ef6256;\n}\n.csItem:nth-child(5):hover{\n  box-shadow:0 3px 5px rgba(168,91,85,.35);\n}\n.csActive{\n  background:#c8b88f;\n  border-top:3px solid #a4873e;\n  color:#fff;\n  border-bottom:0;\n}\n.csActive .csUnit{\n  color:#fff;\n}\n.csActive .csSize{\n  border-color:#fff;\n}\n.csUnit span{\n  font-size:12px;\n}\n.csItem:nth-child(2).csActive{\n  border-color:#439ec1;\n  background:#5eafce;\n}\n.csItem:nth-child(3).csActive{\n  border-color:#80a643;\n  background:#a8ce6b;\n}\n.csItem:nth-child(4).csActive{\n  border-color:#4666b7;\n  background:#889bcb;\n}\n.csItem:nth-child(5).csActive{\n  border-color:#c34439;\n  background:#ef6256;\n}\n\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"csItem": "ContainerItem_csItem_3Tt",
  	"csSize": "ContainerItem_csSize_1vC",
  	"csUnit": "ContainerItem_csUnit_3IG",
  	"csActive": "ContainerItem_csActive_1e8"
  };

/***/ },
/* 174 */
/***/ function(module, exports) {

  module.exports = require("react-input-range");

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ServiceDeatilContainer = __webpack_require__(176);
  
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
                return _context.abrupt('return', _react2.default.createElement(_ServiceDeatilContainer2.default, { serviceName: params.serviceName, tabs: params.tabs }));
  
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
/* 176 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ServiceDetail = __webpack_require__(177);
  
  var _ServiceDetail2 = _interopRequireDefault(_ServiceDetail);
  
  var _reactRedux = __webpack_require__(50);
  
  var _serviceDetail = __webpack_require__(78);
  
  var actions = _interopRequireWildcard(_serviceDetail);
  
  var _services = __webpack_require__(94);
  
  var _volumes = __webpack_require__(98);
  
  var _serviceDetailSelector = __webpack_require__(189);
  
  var _serviceDetailSelector2 = _interopRequireDefault(_serviceDetailSelector);
  
  var _volumesListSelector = __webpack_require__(99);
  
  var _volumesListSelector2 = _interopRequireDefault(_volumesListSelector);
  
  var _logsSelector = __webpack_require__(190);
  
  var _logsSelector2 = _interopRequireDefault(_logsSelector);
  
  var _logs_shrSelector = __webpack_require__(191);
  
  var _logs_shrSelector2 = _interopRequireDefault(_logs_shrSelector);
  
  var _notificationsSelector = __webpack_require__(84);
  
  var _notificationsSelector2 = _interopRequireDefault(_notificationsSelector);
  
  var _podListSelector = __webpack_require__(192);
  
  var _podListSelector2 = _interopRequireDefault(_podListSelector);
  
  var _buildingDetailSelector = __webpack_require__(139);
  
  var _buildingDetailSelector2 = _interopRequireDefault(_buildingDetailSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  var _monitorDataSelector = __webpack_require__(193);
  
  var _monitorDataSelector2 = _interopRequireDefault(_monitorDataSelector);
  
  var _building = __webpack_require__(114);
  
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
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(14);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ServiceDetail = __webpack_require__(178);
  
  var _ServiceDetail2 = _interopRequireDefault(_ServiceDetail);
  
  var _Tabs = __webpack_require__(163);
  
  var _Tabs2 = _interopRequireDefault(_Tabs);
  
  var _Tab = __webpack_require__(164);
  
  var _Tab2 = _interopRequireDefault(_Tab);
  
  var _reactInputRange = __webpack_require__(174);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  var _GetDisposedTabs = __webpack_require__(180);
  
  var _GetDisposedTabs2 = _interopRequireDefault(_GetDisposedTabs);
  
  var _GetMonitorTabs = __webpack_require__(182);
  
  var _GetMonitorTabs2 = _interopRequireDefault(_GetMonitorTabs);
  
  var _GetReleaseTabs = __webpack_require__(184);
  
  var _GetReleaseTabs2 = _interopRequireDefault(_GetReleaseTabs);
  
  var _GetRealmNameTabs = __webpack_require__(186);
  
  var _GetRealmNameTabs2 = _interopRequireDefault(_GetRealmNameTabs);
  
  var _GetContainerTabs = __webpack_require__(187);
  
  var _GetContainerTabs2 = _interopRequireDefault(_GetContainerTabs);
  
  var _GetOptTabs = __webpack_require__(188);
  
  var _GetOptTabs2 = _interopRequireDefault(_GetOptTabs);
  
  var _Logs = __webpack_require__(138);
  
  var _Logs2 = _interopRequireDefault(_Logs);
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _Link = __webpack_require__(55);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _classnames = __webpack_require__(65);
  
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
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(InputRangesBox).call(this, props));
  
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
        return _react2.default.createElement(
          'div',
          { className: 'formField' },
          _react2.default.createElement(_reactInputRange2.default, {
            className: 'formField',
            maxValue: 10,
            minValue: 0,
            labelSuffix: '个',
            value: this.state.value || this.props.number,
            onChange: this.handleValueChange.bind(this)
          })
        );
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  InputRangesBox.propTypes = {
    number: _react2.default.PropTypes.number,
    getContianerNum: _react2.default.PropTypes.func
  };
  
  
  var title = '服务详情';
  
  var ServiceDetail = function (_Component2) {
    (0, _inherits3.default)(ServiceDetail, _Component2);
  
    function ServiceDetail(props) {
      (0, _classCallCheck3.default)(this, ServiceDetail);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ServiceDetail).call(this, props));
  
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
          return _react2.default.createElement(
            'div',
            { style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          );
        }
        var serviceState = data.fservice_status.toLowerCase();
        var serviceStateTxt = "";
        var domain = [];
        switch (serviceState) {
          case Const.SERVICE_STATE.Running:
            serviceStateTxt = _react2.default.createElement(
              'span',
              { className: 'text-success' },
              '运行'
            );
            break;
          case Const.SERVICE_STATE.Pending:
            serviceStateTxt = _react2.default.createElement(
              'span',
              { className: 'text-info' },
              '创建中'
            );
            break;
          case Const.SERVICE_STATE.Stopping:
            serviceStateTxt = _react2.default.createElement(
              'span',
              { className: 'text-danger' },
              '关闭'
            );
            break;
          default:
            serviceStateTxt = _react2.default.createElement(
              'span',
              { className: 'text-danger' },
              '运行失败'
            );
            break;
        }
        data.container.map(function (item) {
          var txt = item.http_domain == null ? item.tcp_domain : item.http_domain;
          domain.push(txt);
        });
        var tab = null;
        switch (Number(this.state.tabSelect)) {
          case 1:
            tab = _react2.default.createElement(_GetDisposedTabs2.default, {
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
            tab = this.props.podList.length == 0 ? _react2.default.createElement(
              'div',
              { className: 'assItem' },
              '该服务因没有启动，尚未占用资源，暂无容器实例。'
            ) : _react2.default.createElement(_GetMonitorTabs2.default, {
              serviceDetail: this.props.serviceDetail,
              podList: this.props.podList,
              getMonitorData: function getMonitorData(data) {
                return _this3.props.getMonitorData(data);
              },
              monitorData: this.props.monitorData
            });
            break;
          case 3:
            tab = _react2.default.createElement(
              'div',
              { className: 'log', style: { paddingBottom: "100px" } },
              _react2.default.createElement(_Logs2.default, { logLabel: data.logs_labels })
            );
            break;
          case 4:
            tab = _react2.default.createElement(_GetReleaseTabs2.default, {
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
            tab = _react2.default.createElement(_GetRealmNameTabs2.default, {
              serviceDetail: this.props.serviceDetail
            });
            break;
          case 6:
            tab = this.props.podList.length == 0 ? _react2.default.createElement(
              'div',
              { className: 'assItem' },
              '该服务因没有启动，尚未占用资源，暂无容器实例。'
            ) : _react2.default.createElement(_GetContainerTabs2.default, {
              podList: this.props.podList
            });
            break;
          case 7:
            tab = _react2.default.createElement(_GetOptTabs2.default, {
              serviceName: this.props.serviceName,
              onDeleteService: function onDeleteService(name) {
                _this3.props.onDeleteService(name);
              }
            });
            break;
  
        }
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF containerPadding' },
          _react2.default.createElement(
            'div',
            { className: _ServiceDetail2.default.sdHd },
            _react2.default.createElement(
              'div',
              { className: _ServiceDetail2.default.sdImg },
              _react2.default.createElement('img', null),
              _react2.default.createElement(
                'a',
                { href: 'javascript:;' },
                '置于首页'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _ServiceDetail2.default.sdInfo },
              _react2.default.createElement(
                'div',
                { className: _ServiceDetail2.default.sdTitle },
                _react2.default.createElement(
                  'div',
                  { className: _ServiceDetail2.default.sdTitleItem },
                  '服务名称:',
                  _react2.default.createElement(
                    'span',
                    null,
                    data.service_name
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _ServiceDetail2.default.sdTitleItem },
                  '部署时间:',
                  _react2.default.createElement(
                    'span',
                    { className: 'cl9' },
                    data.ltime
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _ServiceDetail2.default.sdTitleItem },
                  '状态:',
                  serviceStateTxt
                ),
                _react2.default.createElement(
                  'div',
                  { className: _ServiceDetail2.default.sdTitleItem },
                  _react2.default.createElement(
                    _Link2.default,
                    { to: "/", className: 'btn btn-default' },
                    '进入控制台'
                  ),
                  _react2.default.createElement(
                    'button',
                    {
                      onClick: this.changeState.bind(this, data.fservice_name, serviceState == Const.SERVICE_STATE.Running),
                      className: serviceState == Const.SERVICE_STATE.Running ? "btn btn-default" : "btn btn-primary", ref: 'startUpBtn',
                      disabled: serviceState == Const.SERVICE_STATE.Pending
                    },
                    serviceState == Const.SERVICE_STATE.Running ? "关闭" : "启动"
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: _ServiceDetail2.default.sdPBox },
                _react2.default.createElement(
                  'div',
                  { className: (0, _classnames2.default)(_ServiceDetail2.default.sdPItem, _ServiceDetail2.default.sdDomain) },
                  _react2.default.createElement(
                    'span',
                    { className: _ServiceDetail2.default.sdPItemName },
                    '域名:'
                  ),
                  domain.map(function (item, i) {
                    return _react2.default.createElement(
                      'a',
                      { key: i, href: 'http://' + item, target: '_blank', className: 'clLink' },
                      item
                    );
                  })
                ),
                _react2.default.createElement(
                  'div',
                  { className: _ServiceDetail2.default.sdPItem },
                  _react2.default.createElement(
                    'span',
                    { className: _ServiceDetail2.default.sdPItemName },
                    '所属镜像:'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: 'clLink' },
                    data.image_name
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _ServiceDetail2.default.sdPItem },
                  _react2.default.createElement(
                    'span',
                    { className: _ServiceDetail2.default.sdPItemName },
                    '容器个数:'
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: _ServiceDetail2.default.sdInputRanges },
                    _react2.default.createElement(InputRangesBox, { number: data.spec_replicas, getContianerNum: this.getContainerNum.bind(this) })
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default ' + (!this.props.isBtnState.pods ? "btn-loading" : ""),
                      disabled: !this.props.isBtnState.pods,
                      onClick: this.onSavePods.bind(this) },
                    '保存'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'sdDetail' },
            _react2.default.createElement(
              _Tabs2.default,
              { defaultActiveKey: Number(this.props.tabs), onSelect: this.tabSelect.bind(this), id: 'sdTabs' },
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 1, title: '配置' },
                this.state.tabSelect == 1 ? tab : null
              ),
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 2, title: '监控' },
                this.state.tabSelect == 2 ? tab : null
              ),
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 3, title: '日志' },
                this.state.tabSelect == 3 ? tab : null
              ),
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 4, title: '发布' },
                this.state.tabSelect == 4 ? tab : null
              ),
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 5, title: '域名' },
                this.state.tabSelect == 5 ? tab : null
              ),
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 6, title: '容器实例' },
                this.state.tabSelect == 6 ? tab : null
              ),
              _react2.default.createElement(
                _Tab2.default,
                { eventKey: 7, title: '操作' },
                this.state.tabSelect == 7 ? tab : null
              )
            )
          )
        );
      }
    }]);
    return ServiceDetail;
  }(_react.Component);
  
  ServiceDetail.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react2.default.PropTypes.object
  };
  ServiceDetail.propTypes = {
    serviceName: _react2.default.PropTypes.string,
    tabs: _react2.default.PropTypes.string,
    volumeList: _react2.default.PropTypes.array,
    serviceDetail: _react2.default.PropTypes.object,
    onSavePort: _react2.default.PropTypes.func,
    onSaveVolume: _react2.default.PropTypes.func,
    onSaveEnvironment: _react2.default.PropTypes.func,
    onServiceDetailLoad: _react2.default.PropTypes.func,
    onVolumeListLoad: _react2.default.PropTypes.func,
    onSaveContainerDeploy: _react2.default.PropTypes.func,
    onAddPort: _react2.default.PropTypes.func,
    onDelPort: _react2.default.PropTypes.func,
    onAddSave: _react2.default.PropTypes.func,
    onDelSave: _react2.default.PropTypes.func,
    onAddEnv: _react2.default.PropTypes.func,
    onDelEnv: _react2.default.PropTypes.func,
    notifications: _react2.default.PropTypes.object,
    serviceState: _react2.default.PropTypes.string,
    setBreadcrumb: _react2.default.PropTypes.func,
    loadEndpoints: _react2.default.PropTypes.func,
    onClearServiceDetail: _react2.default.PropTypes.func,
    onPodListLoad: _react2.default.PropTypes.func,
    podList: _react2.default.PropTypes.array,
    onChangeState: _react2.default.PropTypes.func,
    onAutoStateUp: _react2.default.PropTypes.func,
    onSaveCommand: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object,
    getMonitorData: _react2.default.PropTypes.func,
    monitorData: _react2.default.PropTypes.object,
    buildingDetail: _react2.default.PropTypes.object,
    getBuildingDetail: _react2.default.PropTypes.func,
    onChangeRelease: _react2.default.PropTypes.func,
    onDeleteService: _react2.default.PropTypes.func
  };
  exports.default = (0, _withStyles2.default)(_ServiceDetail2.default)(ServiceDetail);

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(179);
      var insertCss = __webpack_require__(18);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ServiceDetail.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ServiceDetail.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(17)();
  // imports
  
  
  // module
  exports.push([module.id, "/**/\n.ServiceDetail_assItem_1XR{\n  margin:35px 25px 0;\n  padding-bottom:35px;\n  border-bottom:1px solid #ececec;\n}\n.ServiceDetail_assBox_3Dp{\n  width:90%;\n  margin-top:25px;\n}\n.ServiceDetail_assBoxAuto_36z{\n  width:auto;\n}\n.ServiceDetail_assItem_1XR>button{\n  margin-right:50px;\n}\n.ServiceDetail_assItemNoborder_1RE{\n  border-bottom:0;\n\n}\n.ServiceDetail_assItemLast_37F{\n  margin-top:10px;\n}\n.ServiceDetail_asTabThird_3sz{\n\n}\n.ServiceDetail_astBox_2Tq{\n  margin-top:30px;\n}\n.ServiceDetail_astBox_2Tq table{\n  margin-bottom:0;\n}\n.ServiceDetail_astTdBox_1EQ{\n  padding:0 20px;\n}\n.ServiceDetail_astTdBox_1EQ>div{\n  margin:10px 0;\n}\n.ServiceDetail_assBtnBox_hR2{\n  margin-top:25px;\n}\n.ServiceDetail_assBtnBox_hR2 button{\n  margin-right:35px;\n}\n.ServiceDetail_astKeyItem_BqR{\n  margin-bottom:5px;\n}\n.ServiceDetail_astInp_2Cg{\n  display: inline-block;\n  width:42.5%;\n}\n.ServiceDetail_astDel_eZ8{\n  display:inline-block;\n  width:8%;\n  vertical-align: middle;\n  margin-left:2%;\n}\n.ServiceDetail_astLine_2f4{\n  display:inline-block;\n  margin:0 1%;\n  width:3%;\n  border-top:1px solid #999;\n  vertical-align: middle;\n}\n/**/\n.ServiceDetail_sdHd_2Te{\n  position: relative;\n  padding-top:30px;\n}\n.ServiceDetail_sdImg_2LN{\n  width:120px;\n  position: absolute;\n  text-align:center;\n}\n.ServiceDetail_sdImg_2LN img{\n  width:66px;\n  height: 66px;\n  border-radius:4px;\n}\n.ServiceDetail_sdImg_2LN a{\n  display:inline-block;\n  font-size:12px;\n  color:#333;\n  padding-left:18px;\n  margin-top:13px;\n  -webkit-transition:color .3s ease;\n  -o-transition:color .3s ease;\n  transition:color .3s ease;\n  position: relative;\n}\n.ServiceDetail_sdImg_2LN a:before{\n  font-family:\"icomoon\";\n  display: inline-block;\n  position: absolute;\n  content: \"\\E913\";\n  font-size:14px;\n  color:#767676;\n  left:0;\n  top:-2px;\n\n}\n.ServiceDetail_sdImg_2LN a:hover{\n  color:#09c8f4;\n}\n.ServiceDetail_sdImg_2LN a:hover{\n  text-decoration: none;\n}\n.ServiceDetail_sdImg_2LN a:focus{\n  text-decoration: none;\n}\n.ServiceDetail_sdInfo_1k6{\n  margin:-7px 20px 0 120px;\n}\n.ServiceDetail_sdTitle_3it{\n  border-bottom:1px solid #e8e8e8;\n  padding-bottom:20px;\n}\n.ServiceDetail_sdTitleItem_157{\n  display:inline-block;\n  text-align:center;\n  position: relative;\n  color:#333;\n}\n.ServiceDetail_sdTitleItem_157:after{\n  display: inline-block;\n  content:\" \";\n  height:15px;\n  width:1px;\n  background:#ced3dd;\n  vertical-align: middle;\n  position: absolute;\n  right:0;\n  top:4px;\n}\n.ServiceDetail_sdTitleItem_157:nth-child(4):after{\n  display:none;\n}\n.ServiceDetail_sdTitleItem_157:first-child{\n  width:26%;\n  text-align: left;\n  padding-left:10px;\n}\n.ServiceDetail_sdTitleItem_157:first-child span{\n  color:#24a8d9\n}\n.ServiceDetail_sdTitleItem_157:nth-child(2){\n  width:23%;\n}\n.ServiceDetail_sdTitleItem_157:nth-child(3){\n  width:21%;\n}\n.ServiceDetail_sdTitleItem_157:nth-child(4){\n  width:30%;\n  text-align: right;\n  padding-right:0;\n}\n.ServiceDetail_sdTitleItem_157 button{\n  margin-left:27px;\n}\n.ServiceDetail_sdTitleItem_157 span{\n  margin-left:10px;\n}\n.ServiceDetail_sdBd_2_I{\n  border-top:17px solid #f2f4f8;\n  padding-top:30px;\n  min-height:300px;\n}\n.ServiceDetail_sdPBox_3c9{\n  padding:24px 0 30px;\n}\n.ServiceDetail_sdPItem_1eG {\n  padding:10px 0;\n}\n.ServiceDetail_sdPItem_1eG:nth-child(3){\n  margin-top:20px;\n}\n.ServiceDetail_sdPItemName_1we{\n  display: inline-block;\n  width:70px;\n  text-align:right;\n  color:#333;\n  margin-right:10px;\n}\n.ServiceDetail_sdInputRanges_1W7{\n  display: inline-block;\n  width:33%;\n  height:23px;\n  vertical-align: middle;\n  margin-right:80px;\n}\n.ServiceDetail_sdBd_2_I>div>ul>li>a:after{\n  font-family:\"icomoon\";\n  color:#999;\n  content: \"\\E918\";\n  display: inline-block;\n  position: absolute;\n  top: 12px;\n  left: 16px;\n  font-size:18px;\n}\n.ServiceDetail_sdBd_2_I>div>ul>li:nth-child(1)>a:after{\n  content: \"\\E918\";\n}\n.ServiceDetail_sdBd_2_I>div>ul>li:nth-child(2)>a:after{\n  content: \"\\E911\";\n}\n.ServiceDetail_sdBd_2_I>div>ul>li:nth-child(3)>a:after{\n  content: \"\\E917\";\n}\n.ServiceDetail_sdBd_2_I>div>ul>li:nth-child(4)>a:after{\n  content: \"\\E90D\";\n}\n.ServiceDetail_sdBd_2_I>div>ul>li:nth-child(5)>a:after{\n  content: \"\\E914\";\n}\n.ServiceDetail_sdBd_2_I>div>ul>li:nth-child(6)>a:after{\n  content: \"\\E915\";\n}\n.ServiceDetail_sdBd_2_I>div>ul>li:nth-child(7)>a:after{\n  content: \"\\E91C\";\n}\n.ServiceDetail_sdLastBtn_2Ud{\n  margin-top:30px;\n}\n.ServiceDetail_sdDomain_Rcb input{\n  border-radius:0;\n  border:0;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  background:transparent;\n  border-bottom:1px solid #b6b6b6;\n  font-size:12px;\n  outline:none;\n}\n.ServiceDetail_btnChoose_3HE{\n  margin:-10px 0 15px 15px;\n\n}\n/***\n  容器配置\n***/\n.ServiceDetail_containerItem_15z{\n  width:100px;\n  height:103px;\n  border:1px solid #f2f4f8;\n  background:#f2f4f8;\n  border-radius:4px 4px 7px 7px;\n  border-bottom:3px solid #d7c698;\n  display:inline-block;\n  margin-right:42px;\n  cursor:pointer;\n}\n.ServiceDetail_containerItem_15z:hover{\n  -webkit-box-shadow:0 3px 5px rgba(215,198,152,.35);\n          box-shadow:0 3px 5px rgba(215,198,152,.35);\n}\n.ServiceDetail_containerSize_36O{\n  height:59px;\n  line-height:59px;\n  border-bottom:1px solid #ccc;\n  margin:0 22px;\n  text-align: center;\n  font-size:35px;\n}\n.ServiceDetail_containerSize_36O span{\n  font-size:30px;\n}\n.ServiceDetail_containerUnit_OET{\n  margin-top:10px;\n  text-align: center;\n  color:#666;\n}\n.ServiceDetail_containerActive_2D0{\n  background:#ebebea;\n  border:1px solid #c8b88f;\n  border-top:3px solid #c8b88f;\n}\n.ServiceDetail_containerItem2_3c-{\n  border-color:#5eafce;\n}\n.ServiceDetail_containerItem2_3c-:hover{\n  -webkit-box-shadow:0 3px 5px rgba(39,154,197,.35);\n          box-shadow:0 3px 5px rgba(39,154,197,.35);\n}\n.ServiceDetail_containerItem3_3do{\n  border-color:#a8ce6b;\n}\n.ServiceDetail_containerItem3_3do:hover{\n  -webkit-box-shadow:0 3px 5px rgba(130,165,75,.35);\n          box-shadow:0 3px 5px rgba(130,165,75,.35);\n}\n.ServiceDetail_containerItem4_3MR{\n  border-color:#889bcb;\n}\n.ServiceDetail_containerItem4_3MR:hover{\n  -webkit-box-shadow:0 3px 5px rgba(94,117,174,.35);\n          box-shadow:0 3px 5px rgba(94,117,174,.35);\n}\n.ServiceDetail_containerItem5_mAb{\n  border-color:#ef6256;\n}\n.ServiceDetail_containerItem5_mAb:hover{\n  -webkit-box-shadow:0 3px 5px rgba(168,91,85,.35);\n          box-shadow:0 3px 5px rgba(168,91,85,.35);\n}\n.ServiceDetail_chooseContainer_2qk{\n  display:inline-block;\n  color:#1da1d2;\n  position: relative;\n  vertical-align: bottom;\n  margin-bottom:3px;\n  padding-left:20px;\n  cursor:pointer;\n}\n.ServiceDetail_chooseContainer_2qk:before{\n  position: absolute;\n  font-size:18px;\n  left:-3px;\n  top:-1px;\n}\n.ServiceDetail_modalItem_2P1{\n  padding:20px 0 0 30px;\n  vertical-align: top;\n}\n.ServiceDetail_modalItem_2P1>div>div{\n  margin-bottom:27px;\n  margin-right:40px;\n}\n.ServiceDetail_modalBtn_sel{\n  text-align: center;\n  padding-bottom:20px;\n}\n.ServiceDetail_modalBtn_sel button{\n  padding:5px 15px;\n}\n.ServiceDetail_modalBtn_sel button:last-child{\n  margin-left:60px;\n}\n.ServiceDetail_handleBox_1-8{\n  padding:46px 0 40px 32px;\n}\n.ServiceDetail_handleBox_1-8 button{\n  width:350px;\n  -webkit-box-shadow:none;\n          box-shadow:none;\n  background:#fff;\n  color:#cc0000;\n  border:1px solid #cc0000;\n  height:37px;\n}\n.ServiceDetail_handleBox_1-8 button:active,.ServiceDetail_handleBox_1-8 button:focus{\n  background:#bf0a0a;\n  border-color:#bf0a0a;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.ServiceDetail_handleBox_1-8 button:active:focus{\n  background:#bf0a0a;\n  border-color:#bf0a0a;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.ServiceDetail_handleBox_1-8 p{\n  font-size:12px;\n  color:#cc0000;\n  margin:13px 6px;\n}\n.ServiceDetail_sdDomain_Rcb a{\n  margin-right:10px;\n}\n\n\n", "", {"version":3,"sources":["/./components/ServiceDeatil/ServiceDetail.css"],"names":[],"mappings":"AAAA,IAAI;AACJ;EACE,mBAAmB;EACnB,oBAAoB;EACpB,gCAAgC;CACjC;AACD;EACE,UAAU;EACV,gBAAgB;CACjB;AACD;EACE,WAAW;CACZ;AACD;EACE,kBAAkB;CACnB;AACD;EACE,gBAAgB;;CAEjB;AACD;EACE,gBAAgB;CACjB;AACD;;CAEC;AACD;EACE,gBAAgB;CACjB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,eAAe;CAChB;AACD;EACE,cAAc;CACf;AACD;EACE,gBAAgB;CACjB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,sBAAsB;EACtB,YAAY;CACb;AACD;EACE,qBAAqB;EACrB,SAAS;EACT,uBAAuB;EACvB,eAAe;CAChB;AACD;EACE,qBAAqB;EACrB,YAAY;EACZ,SAAS;EACT,0BAA0B;EAC1B,uBAAuB;CACxB;AAED,IAAI;AACJ;EACE,mBAAmB;EACnB,iBAAiB;CAClB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,WAAW;EACX,aAAa;EACb,kBAAkB;CACnB;AACD;EACE,qBAAqB;EACrB,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,gBAAgB;EAChB,kCAA0B;EAA1B,6BAA0B;EAA1B,0BAA0B;EAC1B,mBAAmB;CACpB;AACD;EACE,sBAAsB;EACtB,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,cAAc;EACd,OAAO;EACP,SAAS;;CAEV;AACD;EACE,cAAc;CACf;AACD;EACE,sBAAsB;CACvB;AACD;EACE,sBAAsB;CACvB;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,gCAAgC;EAChC,oBAAoB;CACrB;AACD;EACE,qBAAqB;EACrB,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;CACZ;AACD;EACE,sBAAsB;EACtB,YAAY;EACZ,YAAY;EACZ,UAAU;EACV,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,QAAQ;EACR,QAAQ;CACT;AACD;EACE,aAAa;CACd;AACD;EACE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;CACnB;AACD;EACE,aAAa;CACd;AACD;EACE,UAAU;CACX;AACD;EACE,UAAU;CACX;AACD;EACE,UAAU;EACV,kBAAkB;EAClB,gBAAgB;CACjB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,8BAA8B;EAC9B,iBAAiB;EACjB,iBAAiB;CAClB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,eAAe;CAChB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,sBAAsB;EACtB,WAAW;EACX,iBAAiB;EACjB,WAAW;EACX,kBAAkB;CACnB;AACD;EACE,sBAAsB;EACtB,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,kBAAkB;CACnB;AACD;EACE,sBAAsB;EACtB,WAAW;EACX,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB;EACnB,UAAU;EACV,WAAW;EACX,eAAe;CAChB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,SAAS;EACT,wBAAgB;UAAhB,gBAAgB;EAChB,uBAAuB;EACvB,gCAAgC;EAChC,eAAe;EACf,aAAa;CACd;AACD;EACE,yBAAyB;;CAE1B;AAED;;IAEI;AACJ;EACE,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,8BAA8B;EAC9B,gCAAgC;EAChC,qBAAqB;EACrB,kBAAkB;EAClB,eAAe;CAChB;AACD;EACE,mDAA2C;UAA3C,2CAA2C;CAC5C;AACD;EACE,YAAY;EACZ,iBAAiB;EACjB,6BAA6B;EAC7B,cAAc;EACd,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,WAAW;CACZ;AAED;EACE,mBAAmB;EACnB,yBAAyB;EACzB,6BAA6B;CAC9B;AACD;EACE,qBAAqB;CACtB;AACD;EACE,kDAA0C;UAA1C,0CAA0C;CAC3C;AACD;EACE,qBAAqB;CACtB;AACD;EACE,kDAA0C;UAA1C,0CAA0C;CAC3C;AACD;EACE,qBAAqB;CACtB;AACD;EACE,kDAA0C;UAA1C,0CAA0C;CAC3C;AACD;EACE,qBAAqB;CACtB;AACD;EACE,iDAAyC;UAAzC,yCAAyC;CAC1C;AACD;EACE,qBAAqB;EACrB,cAAc;EACd,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;CAChB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,UAAU;EACV,SAAS;CACV;AACD;EACE,sBAAsB;EACtB,oBAAoB;CACrB;AACD;EACE,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,YAAY;EACZ,wBAAgB;UAAhB,gBAAgB;EAChB,gBAAgB;EAChB,cAAc;EACd,yBAAyB;EACzB,YAAY;CACb;AACD;EACE,mBAAmB;EACnB,qBAAqB;EACrB,yBAAiB;UAAjB,iBAAiB;CAClB;AACD;EACE,mBAAmB;EACnB,qBAAqB;EACrB,yBAAiB;UAAjB,iBAAiB;CAClB;AACD;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;CACjB;AACD;EACE,kBAAkB;CACnB","file":"ServiceDetail.css","sourcesContent":["/**/\n.assItem{\n  margin:35px 25px 0;\n  padding-bottom:35px;\n  border-bottom:1px solid #ececec;\n}\n.assBox{\n  width:90%;\n  margin-top:25px;\n}\n.assBoxAuto{\n  width:auto;\n}\n.assItem>button{\n  margin-right:50px;\n}\n.assItemNoborder{\n  border-bottom:0;\n\n}\n.assItemLast{\n  margin-top:10px;\n}\n.asTabThird{\n\n}\n.astBox{\n  margin-top:30px;\n}\n.astBox table{\n  margin-bottom:0;\n}\n.astTdBox{\n  padding:0 20px;\n}\n.astTdBox>div{\n  margin:10px 0;\n}\n.assBtnBox{\n  margin-top:25px;\n}\n.assBtnBox button{\n  margin-right:35px;\n}\n.astKeyItem{\n  margin-bottom:5px;\n}\n.astInp{\n  display: inline-block;\n  width:42.5%;\n}\n.astDel{\n  display:inline-block;\n  width:8%;\n  vertical-align: middle;\n  margin-left:2%;\n}\n.astLine{\n  display:inline-block;\n  margin:0 1%;\n  width:3%;\n  border-top:1px solid #999;\n  vertical-align: middle;\n}\n\n/**/\n.sdHd{\n  position: relative;\n  padding-top:30px;\n}\n.sdImg{\n  width:120px;\n  position: absolute;\n  text-align:center;\n}\n.sdImg img{\n  width:66px;\n  height: 66px;\n  border-radius:4px;\n}\n.sdImg a{\n  display:inline-block;\n  font-size:12px;\n  color:#333;\n  padding-left:18px;\n  margin-top:13px;\n  transition:color .3s ease;\n  position: relative;\n}\n.sdImg a:before{\n  font-family:\"icomoon\";\n  display: inline-block;\n  position: absolute;\n  content: \"\\e913\";\n  font-size:14px;\n  color:#767676;\n  left:0;\n  top:-2px;\n\n}\n.sdImg a:hover{\n  color:#09c8f4;\n}\n.sdImg a:hover{\n  text-decoration: none;\n}\n.sdImg a:focus{\n  text-decoration: none;\n}\n.sdInfo{\n  margin:-7px 20px 0 120px;\n}\n.sdTitle{\n  border-bottom:1px solid #e8e8e8;\n  padding-bottom:20px;\n}\n.sdTitleItem{\n  display:inline-block;\n  text-align:center;\n  position: relative;\n  color:#333;\n}\n.sdTitleItem:after{\n  display: inline-block;\n  content:\" \";\n  height:15px;\n  width:1px;\n  background:#ced3dd;\n  vertical-align: middle;\n  position: absolute;\n  right:0;\n  top:4px;\n}\n.sdTitleItem:nth-child(4):after{\n  display:none;\n}\n.sdTitleItem:first-child{\n  width:26%;\n  text-align: left;\n  padding-left:10px;\n}\n.sdTitleItem:first-child span{\n  color:#24a8d9\n}\n.sdTitleItem:nth-child(2){\n  width:23%;\n}\n.sdTitleItem:nth-child(3){\n  width:21%;\n}\n.sdTitleItem:nth-child(4){\n  width:30%;\n  text-align: right;\n  padding-right:0;\n}\n.sdTitleItem button{\n  margin-left:27px;\n}\n.sdTitleItem span{\n  margin-left:10px;\n}\n.sdBd{\n  border-top:17px solid #f2f4f8;\n  padding-top:30px;\n  min-height:300px;\n}\n.sdPBox{\n  padding:24px 0 30px;\n}\n.sdPItem {\n  padding:10px 0;\n}\n.sdPItem:nth-child(3){\n  margin-top:20px;\n}\n.sdPItemName{\n  display: inline-block;\n  width:70px;\n  text-align:right;\n  color:#333;\n  margin-right:10px;\n}\n.sdInputRanges{\n  display: inline-block;\n  width:33%;\n  height:23px;\n  vertical-align: middle;\n  margin-right:80px;\n}\n.sdBd>div>ul>li>a:after{\n  font-family:\"icomoon\";\n  color:#999;\n  content: \"\\e918\";\n  display: inline-block;\n  position: absolute;\n  top: 12px;\n  left: 16px;\n  font-size:18px;\n}\n.sdBd>div>ul>li:nth-child(1)>a:after{\n  content: \"\\e918\";\n}\n.sdBd>div>ul>li:nth-child(2)>a:after{\n  content: \"\\e911\";\n}\n.sdBd>div>ul>li:nth-child(3)>a:after{\n  content: \"\\e917\";\n}\n.sdBd>div>ul>li:nth-child(4)>a:after{\n  content: \"\\e90d\";\n}\n.sdBd>div>ul>li:nth-child(5)>a:after{\n  content: \"\\e914\";\n}\n.sdBd>div>ul>li:nth-child(6)>a:after{\n  content: \"\\e915\";\n}\n.sdBd>div>ul>li:nth-child(7)>a:after{\n  content: \"\\e91c\";\n}\n.sdLastBtn{\n  margin-top:30px;\n}\n.sdDomain input{\n  border-radius:0;\n  border:0;\n  box-shadow:none;\n  background:transparent;\n  border-bottom:1px solid #b6b6b6;\n  font-size:12px;\n  outline:none;\n}\n.btnChoose{\n  margin:-10px 0 15px 15px;\n\n}\n\n/***\n  容器配置\n***/\n.containerItem{\n  width:100px;\n  height:103px;\n  border:1px solid #f2f4f8;\n  background:#f2f4f8;\n  border-radius:4px 4px 7px 7px;\n  border-bottom:3px solid #d7c698;\n  display:inline-block;\n  margin-right:42px;\n  cursor:pointer;\n}\n.containerItem:hover{\n  box-shadow:0 3px 5px rgba(215,198,152,.35);\n}\n.containerSize{\n  height:59px;\n  line-height:59px;\n  border-bottom:1px solid #ccc;\n  margin:0 22px;\n  text-align: center;\n  font-size:35px;\n}\n.containerSize span{\n  font-size:30px;\n}\n.containerUnit{\n  margin-top:10px;\n  text-align: center;\n  color:#666;\n}\n\n.containerActive{\n  background:#ebebea;\n  border:1px solid #c8b88f;\n  border-top:3px solid #c8b88f;\n}\n.containerItem2{\n  border-color:#5eafce;\n}\n.containerItem2:hover{\n  box-shadow:0 3px 5px rgba(39,154,197,.35);\n}\n.containerItem3{\n  border-color:#a8ce6b;\n}\n.containerItem3:hover{\n  box-shadow:0 3px 5px rgba(130,165,75,.35);\n}\n.containerItem4{\n  border-color:#889bcb;\n}\n.containerItem4:hover{\n  box-shadow:0 3px 5px rgba(94,117,174,.35);\n}\n.containerItem5{\n  border-color:#ef6256;\n}\n.containerItem5:hover{\n  box-shadow:0 3px 5px rgba(168,91,85,.35);\n}\n.chooseContainer{\n  display:inline-block;\n  color:#1da1d2;\n  position: relative;\n  vertical-align: bottom;\n  margin-bottom:3px;\n  padding-left:20px;\n  cursor:pointer;\n}\n.chooseContainer:before{\n  position: absolute;\n  font-size:18px;\n  left:-3px;\n  top:-1px;\n}\n.modalItem{\n  padding:20px 0 0 30px;\n  vertical-align: top;\n}\n.modalItem>div>div{\n  margin-bottom:27px;\n  margin-right:40px;\n}\n.modalBtn{\n  text-align: center;\n  padding-bottom:20px;\n}\n.modalBtn button{\n  padding:5px 15px;\n}\n.modalBtn button:last-child{\n  margin-left:60px;\n}\n.handleBox{\n  padding:46px 0 40px 32px;\n}\n.handleBox button{\n  width:350px;\n  box-shadow:none;\n  background:#fff;\n  color:#cc0000;\n  border:1px solid #cc0000;\n  height:37px;\n}\n.handleBox button:active,.handleBox button:focus{\n  background:#bf0a0a;\n  border-color:#bf0a0a;\n  box-shadow: none;\n}\n.handleBox button:active:focus{\n  background:#bf0a0a;\n  border-color:#bf0a0a;\n  box-shadow: none;\n}\n.handleBox p{\n  font-size:12px;\n  color:#cc0000;\n  margin:13px 6px;\n}\n.sdDomain a{\n  margin-right:10px;\n}\n\n\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"assItem": "ServiceDetail_assItem_1XR",
  	"assBox": "ServiceDetail_assBox_3Dp",
  	"assBoxAuto": "ServiceDetail_assBoxAuto_36z",
  	"assItemNoborder": "ServiceDetail_assItemNoborder_1RE",
  	"assItemLast": "ServiceDetail_assItemLast_37F",
  	"asTabThird": "ServiceDetail_asTabThird_3sz",
  	"astBox": "ServiceDetail_astBox_2Tq",
  	"astTdBox": "ServiceDetail_astTdBox_1EQ",
  	"assBtnBox": "ServiceDetail_assBtnBox_hR2",
  	"astKeyItem": "ServiceDetail_astKeyItem_BqR",
  	"astInp": "ServiceDetail_astInp_2Cg",
  	"astDel": "ServiceDetail_astDel_eZ8",
  	"astLine": "ServiceDetail_astLine_2f4",
  	"sdHd": "ServiceDetail_sdHd_2Te",
  	"sdImg": "ServiceDetail_sdImg_2LN",
  	"sdInfo": "ServiceDetail_sdInfo_1k6",
  	"sdTitle": "ServiceDetail_sdTitle_3it",
  	"sdTitleItem": "ServiceDetail_sdTitleItem_157",
  	"sdBd": "ServiceDetail_sdBd_2_I",
  	"sdPBox": "ServiceDetail_sdPBox_3c9",
  	"sdPItem": "ServiceDetail_sdPItem_1eG",
  	"sdPItemName": "ServiceDetail_sdPItemName_1we",
  	"sdInputRanges": "ServiceDetail_sdInputRanges_1W7",
  	"sdLastBtn": "ServiceDetail_sdLastBtn_2Ud",
  	"sdDomain": "ServiceDetail_sdDomain_Rcb",
  	"btnChoose": "ServiceDetail_btnChoose_3HE",
  	"containerItem": "ServiceDetail_containerItem_15z",
  	"containerSize": "ServiceDetail_containerSize_36O",
  	"containerUnit": "ServiceDetail_containerUnit_OET",
  	"containerActive": "ServiceDetail_containerActive_2D0",
  	"containerItem2": "ServiceDetail_containerItem2_3c-",
  	"containerItem3": "ServiceDetail_containerItem3_3do",
  	"containerItem4": "ServiceDetail_containerItem4_3MR",
  	"containerItem5": "ServiceDetail_containerItem5_mAb",
  	"chooseContainer": "ServiceDetail_chooseContainer_2qk",
  	"modalItem": "ServiceDetail_modalItem_2P1",
  	"modalBtn": "ServiceDetail_modalBtn_sel",
  	"handleBox": "ServiceDetail_handleBox_1-8"
  };

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _ContainerBox = __webpack_require__(168);
  
  var _ContainerBox2 = _interopRequireDefault(_ContainerBox);
  
  var _ContainerItem = __webpack_require__(171);
  
  var _ContainerItem2 = _interopRequireDefault(_ContainerItem);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _lib = __webpack_require__(181);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(37);
  
  var _deployService = __webpack_require__(109);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var AutoStartUpToggle = function (_Component) {
    (0, _inherits3.default)(AutoStartUpToggle, _Component);
  
    function AutoStartUpToggle(props) {
      (0, _classCallCheck3.default)(this, AutoStartUpToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AutoStartUpToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
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
  
  
  AutoStartUpToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    isState: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool
  };
  
  var ChooseContainerBtn = function (_Component2) {
    (0, _inherits3.default)(ChooseContainerBtn, _Component2);
  
    function ChooseContainerBtn(props) {
      (0, _classCallCheck3.default)(this, ChooseContainerBtn);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ChooseContainerBtn).call(this, props));
  
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
        return _react2.default.createElement(
          'div',
          { className: 'chooseContainer icon-operation', onClick: this.showModal.bind(this) },
          _react2.default.createElement(
            'span',
            null,
            '更改'
          ),
          _react2.default.createElement(
            _lib.Modal,
            (0, _extends3.default)({}, this.props, { show: this.state.show, onHide: this.hideModal.bind(this), bsSize: 'sm',
              'aria-labelledby': 'contained-modal-title-sm' }),
            _react2.default.createElement(
              'div',
              { className: 'modal-header' },
              _react2.default.createElement(
                'button',
                { type: 'button', onClick: this.hideModal.bind(this), className: 'close', 'aria-label': 'Close' },
                _react2.default.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '×'
                )
              ),
              _react2.default.createElement(
                'h4',
                { className: 'modal-title', id: 'contained-modal-title-sm' },
                '容器配置'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-body' },
              _react2.default.createElement(
                'div',
                { className: 'modalItem' },
                _react2.default.createElement(_ContainerBox2.default, {
                  getContainer: this.getContainer.bind(this)
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'modalBtn' },
                _react2.default.createElement(
                  _lib.Button,
                  { bsStyle: 'primary', onClick: this.saveContainerDeploy.bind(this) },
                  '保存'
                ),
                _react2.default.createElement(
                  _lib.Button,
                  { bsStyle: 'default', onClick: this.hideModal.bind(this) },
                  '取消'
                )
              )
            )
          )
        );
      }
    }]);
    return ChooseContainerBtn;
  }(_react.Component);
  
  ChooseContainerBtn.propTypes = {
    onSaveContainerDeploy: _react2.default.PropTypes.func,
    serviceName: _react2.default.PropTypes.string
  };
  
  var GetDisposedTabs = function (_Component3) {
    (0, _inherits3.default)(GetDisposedTabs, _Component3);
  
    function GetDisposedTabs(props) {
      (0, _classCallCheck3.default)(this, GetDisposedTabs);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetDisposedTabs).call(this, props));
  
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
          return _react2.default.createElement(
            'tr',
            { key: item.at },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'div',
                  { className: "iaBox" },
                  _react2.default.createElement('input', { type: 'number', ref: 'container_port', onBlur: _this7.isPortRepeat.bind(_this7, i), className: 'form-control form-control-sm', defaultValue: item.container_port }),
                  _react2.default.createElement(
                    'span',
                    { className: 'iaOk icon-right', onClick: _this7.focusVal.bind(_this7, i) },
                    ' '
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'iaDel icon-delete', onClick: _this7.delVal.bind(_this7, i) },
                    ' '
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'protocol', defaultValue: item.protocol },
                  _react2.default.createElement(
                    'option',
                    { value: 'TCP' },
                    'TCP'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'UDP' },
                    'UDP'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'access_mode', defaultValue: item.access_mode },
                  _react2.default.createElement(
                    'option',
                    { value: 'HTTP' },
                    'HTTP'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'TCP' },
                    'TCP'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'no' },
                    '不可访问'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'access_scope', defaultValue: item.access_scope },
                  _react2.default.createElement(
                    'option',
                    { value: 'outsisde' },
                    '外部范围'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'inside' },
                    '内部范围'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: 'delBtn', onClick: _this7.delPortTr.bind(_this7, item.at) },
                ' '
              )
            )
          );
        });
        return tr;
      }
    }, {
      key: 'getPortTable',
      value: function getPortTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-bordered' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '容器端口'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '协议'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '访问方式'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '访问范围'
              ),
              _react2.default.createElement(
                'th',
                { width: '20%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            { ref: 'tab_container_body' },
            this.getPortTableBody()
          )
        );
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
              return _react2.default.createElement(
                'option',
                { key: i, value: obj.disk_name },
                obj.disk_name,
                ' '
              );
            } else {
              return false;
            }
          });
          return _react2.default.createElement(
            'tr',
            { key: item.at },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', ref: 'volumnName', defaultValue: item.disk_name,
                    onChange: _this8.isSaveRepeat.bind(_this8, i)
                  },
                  _react2.default.createElement(
                    'option',
                    { value: '-1' },
                    '请选择数据卷'
                  ),
                  options
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: 'container_path', defaultValue: item.disk_path,
                  onBlur: _this8.isPathValidata.bind(_this8)
                })
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'astTdBox' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('input', { type: 'checkbox', defaultChecked: item.readonly == "True" }),
                  ' 是否只读'
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: 'delBtn', onClick: _this8.delSaveTr.bind(_this8, item.at) },
                ' '
              )
            )
          );
        });
  
        return tr;
      }
    }, {
      key: 'getSaveTable',
      value: function getSaveTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-bordered' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '数据卷名称'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '容器路径'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '是否只读'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            { ref: 'tab_storage_body' },
            this.getSaveTableBody()
          )
        );
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
        var data = {
          serviceName: this.props.serviceDetail.fservice_name,
          volume: save
        };
        console.log(data);
        if (!this.state.volume) {
          this.props.onSaveVolume(data);
        }
      }
    }, {
      key: 'getEnvironment',
      value: function getEnvironment() {
        var _this9 = this;
  
        var data = [],
            sd = this.props.serviceDetail;
        if (sd && sd.env && sd.env.length) data = this.props.serviceDetail.env;
        var keyBox = data.map(function (item, i) {
          return _react2.default.createElement(
            'div',
            { key: item.at, className: 'astKeyItem' },
            _react2.default.createElement(
              'div',
              { className: 'astInp' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', onBlur: _this9.isEnvKeyRepeat.bind(_this9, i), placeholder: '键', defaultValue: item.env_key })
            ),
            _react2.default.createElement('div', { className: 'astLine' }),
            _react2.default.createElement(
              'div',
              { className: 'astInp' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', onBlur: _this9.isEnvValue.bind(_this9), placeholder: '值', defaultValue: item.env_value })
            ),
            _react2.default.createElement(
              'div',
              { className: 'astDel' },
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: 'delBtn', onClick: _this9.delEnvironmentData.bind(_this9, item.at) },
                ' '
              )
            )
          );
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
          return _react2.default.createElement(
            'div',
            { className: style, key: i },
            _react2.default.createElement(
              _ContainerItem2.default,
              { key: i, classNumber: i, active: true },
              _react2.default.createElement(
                'span',
                null,
                item.x
              ),
              _react2.default.createElement(
                'span',
                null,
                'x'
              ),
              _react2.default.createElement(
                'span',
                null,
                item.m,
                _react2.default.createElement(
                  'span',
                  null,
                  '(公测)'
                )
              )
            )
          );
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
        var data = this.props.serviceDetail;
        var n = 0;
        this.props.volumeList.map(function (item) {
          if (item.disk_status == "unused") {
            n++;
          }
        });
        var volumeLength = n == 0 ? "暂时没有数据卷" : '目前有' + n + '个数据卷';
        return _react2.default.createElement(
          'div',
          { className: 'asTabThird' },
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '端口',
              titleEnglish: 'PORT',
              titleInfo: '容器端口会映射到主机端口上'
            }),
            _react2.default.createElement(
              'div',
              { className: 'astBox' },
              this.getPortTable()
            ),
            _react2.default.createElement(
              'div',
              { className: 'assBtnBox' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary',
                  onClick: this.addPortTr.bind(this)
                },
                '添加'
              ),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default ' + (!this.props.isBtnState.port ? "btn-loading" : ""),
                  disabled: !this.props.isBtnState.port,
                  onClick: this.savePort.bind(this) },
                '保存'
              ),
              _react2.default.createElement('span', { className: this.state.port ? "inputTip inputTipShow" : "inputTip", ref: 'portTip' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '存储设置',
              titleEnglish: 'SAVE SETTING',
              titleInfo: volumeLength
            }),
            _react2.default.createElement(
              'div',
              { className: 'astBox', ref: 'tab_save_box' },
              this.getSaveTable()
            ),
            _react2.default.createElement(
              'div',
              { className: 'assBtnBox' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: this.addSaveTr.bind(this) },
                '添加'
              ),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default ' + (!this.props.isBtnState.storage ? "btn-loading" : ""),
                  disabled: !this.props.isBtnState.storage,
                  onClick: this.saveStorage.bind(this)
                },
                '保存'
              ),
              _react2.default.createElement('span', { className: this.state.volume ? "inputTip inputTipShow" : "inputTip", ref: 'volumeTip' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '环境变量',
              titleEnglish: 'ENVIRONMENT VARIABLE',
              titleInfo: ''
            }),
            _react2.default.createElement(
              'div',
              { className: 'astBox', ref: 'tab_env_box' },
              this.getEnvironment()
            ),
            _react2.default.createElement(
              'div',
              { className: 'assBtnBox' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: this.addEnvironmentData.bind(this) },
                '添加'
              ),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default ' + (!this.props.isBtnState.env ? "btn-loading" : ""),
                  disabled: !this.props.isBtnState.env,
                  onClick: this.saveEnvironment.bind(this)
                },
                '保存'
              ),
              _react2.default.createElement('span', { className: this.state.env ? "inputTip inputTipShow" : "inputTip", ref: 'envTip' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '容器配置',
              titleEnglish: 'CONTAINER CONFIGURATION',
              titleInfo: '容器配置说明'
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              this.getContainerBox(data.containerDeploy)
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '启动命令',
              titleEnglish: 'JRE',
              titleInfo: '启动命令解释说明 '
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              _react2.default.createElement('input', { className: 'form-control',
                type: 'text',
                placeholder: '',
                ref: 'command',
                defaultValue: data.command
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'assBtnBox' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default ' + (!this.props.isBtnState.command ? "btn-loading" : ""),
                  disabled: !this.props.isBtnState.command,
                  onClick: this.saveCommand.bind(this)
                },
                '保存'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem assItemNoborder' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '自动启动',
              titleEnglish: 'AUTO UPDATE SETTING',
              titleInfo: '自动启动设置'
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              _react2.default.createElement(AutoStartUpToggle, { disabled: !this.props.isBtnState.autoStateUp,
                isState: data.auto_startup == 1,
                getToggle: this.getIsStartUp.bind(this) })
            )
          )
        );
      }
    }]);
    return GetDisposedTabs;
  }(_react.Component);
  
  GetDisposedTabs.contextTypes = {
    store: _react.PropTypes.object
  };
  GetDisposedTabs.propTypes = {
    serviceDetail: _react2.default.PropTypes.object,
    onServiceDetailLoad: _react2.default.PropTypes.func,
    onSavePort: _react2.default.PropTypes.func,
    onSaveVolume: _react2.default.PropTypes.func,
    onSaveEnvironment: _react2.default.PropTypes.func,
    getServiceFun: _react2.default.PropTypes.func,
    volumeList: _react2.default.PropTypes.array,
    onSaveContainerDeploy: _react2.default.PropTypes.func,
    onAddPort: _react2.default.PropTypes.func,
    onDelPort: _react2.default.PropTypes.func,
    onAddSave: _react2.default.PropTypes.func,
    onDelSave: _react2.default.PropTypes.func,
    onAddEnv: _react2.default.PropTypes.func,
    onDelEnv: _react2.default.PropTypes.func,
    onSaveCommand: _react2.default.PropTypes.func,
    onAutoStateUp: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object
  };
  exports.default = GetDisposedTabs;

/***/ },
/* 181 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap/lib");

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Monitor = __webpack_require__(183);
  
  var _Monitor2 = _interopRequireDefault(_Monitor);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by zhangsai on 16/9/2.
   */
  var GetMonitorTabs = function (_Component) {
    (0, _inherits3.default)(GetMonitorTabs, _Component);
  
    function GetMonitorTabs(props) {
      (0, _classCallCheck3.default)(this, GetMonitorTabs);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetMonitorTabs).call(this, props));
  
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
        if (!this.state.pod_name || !this.props.serviceDetail) return _react2.default.createElement(
          'div',
          { className: 'text-center' },
          _react2.default.createElement(
            _Loading2.default,
            null,
            ' '
          )
        );
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
          return _react2.default.createElement(
            'option',
            { value: item.pod_name, key: i },
            item.pod_name
          );
        });
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'choosePods' },
            _react2.default.createElement(
              'label',
              null,
              '请选择容器实例:'
            ),
            _react2.default.createElement(
              'select',
              { className: 'form-control', onChange: this.changePods.bind(this) },
              option
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: 'CPU监控',
              titleEnglish: 'CPU MONITOR',
              titleInfo: '24小时'
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              _react2.default.createElement(_Monitor2.default, {
                ref: 'cpu',
                payload: cpu,
                color: ["#7ed9fc"],
                legend: false,
                divisor: limits_cpu,
                valueSuffix: '%'
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '内存监控',
              titleEnglish: 'MEMORY MONITOR',
              titleInfo: '24小时'
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              _react2.default.createElement(_Monitor2.default, {
                ref: 'memory',
                payload: memory,
                color: ["#b7e769"],
                legend: false,
                divisor: '1000000',
                valueSuffix: 'M'
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '网络监控',
              titleEnglish: 'NETWORK MONITOR',
              titleInfo: '24小时'
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              _react2.default.createElement(_Monitor2.default, {
                ref: 'network',
                payload: network,
                color: ["#f7a397", "#b7e769"],
                legend: true,
                divisor: '1000',
                valueSuffix: 'kBps'
              })
            )
          )
        );
      }
    }]);
    return GetMonitorTabs;
  }(_react.Component);
  
  GetMonitorTabs.contextTypes = {
    store: _react.PropTypes.object
  };
  GetMonitorTabs.propTypes = {
    serviceDetail: _react2.default.PropTypes.object,
    podList: _react2.default.PropTypes.array,
    getMonitorData: _react2.default.PropTypes.func,
    monitorData: _react2.default.PropTypes.object
  };
  exports.default = GetMonitorTabs;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _utils = __webpack_require__(118);
  
  var _header = __webpack_require__(79);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var BtnGroup = function (_Component) {
    (0, _inherits3.default)(BtnGroup, _Component);
  
    function BtnGroup(props) {
      (0, _classCallCheck3.default)(this, BtnGroup);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BtnGroup).call(this, props));
  
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
          return _react2.default.createElement(
            'button',
            { key: i, className: 'btn btn-default btn-xs ' + (_this2.state.active == i ? "btn-primary" : ""),
              onClick: _this2.handelSelect.bind(_this2, i)
            },
            item
          );
        });
        return _react2.default.createElement(
          'div',
          { className: 'btnGroup' },
          html
        );
      }
    }]);
    return BtnGroup;
  }(_react.Component);
  
  BtnGroup.propTypes = {
    prop: _react2.default.PropTypes.array,
    type: _react2.default.PropTypes.string,
    onSelect: _react2.default.PropTypes.func,
    activeKey: _react2.default.PropTypes.number
  };
  
  
  var ReactHighcharts = __webpack_require__(92);
  
  var _class = function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);
  
    function _class(props) {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).call(this, props));
  
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
        this.context.store.dispatch((0, _header.isLoadingAction)(true));
        var url = Const.FETCH_URL.GET_SERVICE_MONITOR + "/" + data.userName + "/pods/" + data.pod_name + "/metrics/" + data.type + "?time_long=" + time_long;
        (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
          return response.json();
        }).then(function (json) {
          console.log(json, data.type);
          my.context.store.dispatch((0, _header.isLoadingAction)(false));
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
        return _react2.default.createElement(
          'div',
          { className: 'assBox' },
          _react2.default.createElement(
            'div',
            { className: 'btnChoose' },
            _react2.default.createElement(BtnGroup, {
              activeKey: 0,
              prop: ["1小时", "6小时", "1天"],
              type: 'memory',
              onSelect: this.changeTime.bind(this)
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'monitorBox' },
            !this.state.data.xAxis.length ? "监控信息传输中,请稍后再试" : _react2.default.createElement(ReactHighcharts, { config: config })
          )
        );
      }
    }]);
    return _class;
  }(_react2.default.Component);
  
  _class.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  _class.propTypes = {
    payload: _react2.default.PropTypes.object,
    color: _react2.default.PropTypes.array,
    legend: _react2.default.PropTypes.bool,
    valueSuffix: _react2.default.PropTypes.string
  };
  exports.default = _class;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactToggle = __webpack_require__(185);
  
  var _reactToggle2 = _interopRequireDefault(_reactToggle);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by zhangsai on 16/9/2.
   */
  var UpdateStartToggle = function (_Component) {
    (0, _inherits3.default)(UpdateStartToggle, _Component);
  
    function UpdateStartToggle(props) {
      (0, _classCallCheck3.default)(this, UpdateStartToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UpdateStartToggle).call(this, props));
  
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
        return _react2.default.createElement(_reactToggle2.default, {
          defaultChecked: this.state.autoStart,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return UpdateStartToggle;
  }(_react.Component);
  
  UpdateStartToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.bool
  };
  
  var GetReleaseTabs = function (_Component2) {
    (0, _inherits3.default)(GetReleaseTabs, _Component2);
  
    function GetReleaseTabs(props) {
      (0, _classCallCheck3.default)(this, GetReleaseTabs);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetReleaseTabs).call(this, props));
  
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
          option.push(_react2.default.createElement(
            'option',
            { key: 'latest', value: 'latest' },
            'latest'
          ));
        } else {
          tags.map(function (item, i) {
            option.push(_react2.default.createElement(
              'option',
              { value: item.tag, key: i },
              item.tag
            ));
          });
        }
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '自动发布',
              titleEnglish: 'AUTOMATIC SENDING',
              titleInfo: '当镜像有更新时容器是否自动更新,开启自动更新时会覆盖手动选择的版本'
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              _react2.default.createElement(UpdateStartToggle, { state: this.state.isUpdate == 1, getToggle: this.getToggleValue.bind(this) })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '手动发布',
              titleEnglish: 'MANUAL RELEASE',
              titleInfo: '将服务更新到指定的镜像版本'
            }),
            _react2.default.createElement(
              'div',
              { className: 'assBox' },
              _react2.default.createElement(
                'select',
                { className: 'form-control', ref: 'imageVersion', defaultValue: data.image_version },
                option
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assBox sdLastBtn' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary ' + (!this.props.isBtnState.deploy ? "btn-loading" : ""),
                  disabled: !this.props.isBtnState.deploy,
                  onClick: this.changeRelease.bind(this) },
                '更新发布'
              )
            )
          )
        );
      }
    }]);
    return GetReleaseTabs;
  }(_react.Component);
  
  GetReleaseTabs.propTypes = {
    serviceName: _react2.default.PropTypes.string,
    serviceDetail: _react2.default.PropTypes.object,
    buildingDetail: _react2.default.PropTypes.object,
    getBuildingDetail: _react2.default.PropTypes.func,
    onChangeRelease: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object
  };
  exports.default = GetReleaseTabs;

/***/ },
/* 185 */
/***/ function(module, exports) {

  module.exports = require("react-toggle");

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by zhangsai on 16/9/2.
   */
  var GetRealmNameTabs = function (_Component) {
    (0, _inherits3.default)(GetRealmNameTabs, _Component);
  
    function GetRealmNameTabs() {
      (0, _classCallCheck3.default)(this, GetRealmNameTabs);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetRealmNameTabs).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetRealmNameTabs, [{
      key: 'getRealmNameTableBody',
      value: function getRealmNameTableBody() {
        return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'div',
              { className: 'astTdBox sdDomain' },
              _react2.default.createElement('input', { type: 'text', placeholder: '请输入新域名' })
            )
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('div', { className: 'astTdBox' })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'div',
              { className: 'astTdBox' },
              _react2.default.createElement(
                'span',
                { className: 'color999' },
                '是'
              )
            )
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'button',
              { className: 'btn btn-primary' },
              '添加'
            )
          )
        );
      }
    }, {
      key: 'getRealmNameTable',
      value: function getRealmNameTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-hover table-bordered' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '自有域名'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                'CNAME地址'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '域名验证'
              ),
              _react2.default.createElement(
                'th',
                { width: '25%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.getRealmNameTableBody()
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '绑定自有域名',
              titleEnglish: 'BIND OWN DOMAIN',
              titleInfo: '域名绑定说明'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'assItem' },
            this.getRealmNameTable()
          )
        );
      }
    }]);
    return GetRealmNameTabs;
  }(_react.Component);
  
  exports.default = GetRealmNameTabs;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetContainerTabs = function (_React$Component) {
    (0, _inherits3.default)(GetContainerTabs, _React$Component);
  
    function GetContainerTabs() {
      (0, _classCallCheck3.default)(this, GetContainerTabs);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetContainerTabs).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetContainerTabs, [{
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "getTableLine",
      value: function getTableLine() {
        var podList = this.props.podList;
        if (!podList || !podList.length) return _react2.default.createElement(
          "tr",
          null,
          _react2.default.createElement(
            "td",
            { colSpan: "4" },
            "暂无数据~"
          )
        );
        var body = [];
        podList.map(function (item, i) {
          var n = item.containers.length;
          var port = item.containers.map(function (obj, j) {
            var d = n == j + 1 ? "" : ",";
            return obj.container_port + "/" + obj.access_mode + d;
          });
          body.push(_react2.default.createElement(
            "tr",
            { key: i },
            _react2.default.createElement(
              "td",
              null,
              item.pod_name
            ),
            _react2.default.createElement(
              "td",
              null,
              item.pod_ip
            ),
            _react2.default.createElement(
              "td",
              null,
              port
            ),
            _react2.default.createElement(
              "td",
              null,
              _react2.default.createElement(
                "div",
                {
                  className: "mirror-state " + (item.pod_phase == "Running" ? "on" : "off") + " tablePaddingLeft" },
                item.pod_phase == "Running" ? '运行中' : '已停止'
              )
            )
          ));
        });
        return body;
      }
    }, {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          "div",
          { style: { padding: "15px" } },
          _react2.default.createElement(
            "table",
            { className: "table table-hover table-bordered volumes-table" },
            _react2.default.createElement(
              "thead",
              null,
              _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                  "th",
                  null,
                  "名称"
                ),
                _react2.default.createElement(
                  "th",
                  null,
                  "IP"
                ),
                _react2.default.createElement(
                  "th",
                  null,
                  "端口"
                ),
                _react2.default.createElement(
                  "th",
                  null,
                  "状态"
                )
              )
            ),
            _react2.default.createElement(
              "tbody",
              null,
              this.getTableLine()
            )
          )
        );
      }
    }]);
    return GetContainerTabs;
  }(_react2.default.Component);
  
  GetContainerTabs.propTypes = {
    podList: _react2.default.PropTypes.array
  };
  exports.default = GetContainerTabs;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetOptTabs = function (_Component) {
      (0, _inherits3.default)(GetOptTabs, _Component);
  
      function GetOptTabs() {
          (0, _classCallCheck3.default)(this, GetOptTabs);
          return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetOptTabs).apply(this, arguments));
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
              return _react2.default.createElement(
                  "div",
                  { className: "handleBox" },
                  _react2.default.createElement(
                      "button",
                      { className: "btn btn-danger", onClick: this.deleteService.bind(this) },
                      "删除应用"
                  ),
                  _react2.default.createElement(
                      "p",
                      null,
                      "*删除应用将清除该应用的所有数据，且该操作不能被恢复，请慎重选择！ "
                  )
              );
          }
      }]);
      return GetOptTabs;
  }(_react.Component); /**
                        * Created by zhangsai on 16/9/2.
                        */
  
  
  GetOptTabs.propTypes = {
      onDeleteService: _react2.default.PropTypes.func
  };
  exports.default = GetOptTabs;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 190 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _VolumeListContainer = __webpack_require__(195);
  
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
  
  exports.default = {
  
    path: '/volumes',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_VolumeListContainer2.default, null));
  
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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reactRedux = __webpack_require__(50);
  
  var _VolumeList = __webpack_require__(196);
  
  var _VolumeList2 = _interopRequireDefault(_VolumeList);
  
  var _volumes = __webpack_require__(98);
  
  var _breadcumb = __webpack_require__(93);
  
  var _volumesListSelector = __webpack_require__(99);
  
  var _volumesListSelector2 = _interopRequireDefault(_volumesListSelector);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
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
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(65);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _VolumeCreateModal = __webpack_require__(197);
  
  var _VolumeCreateModal2 = _interopRequireDefault(_VolumeCreateModal);
  
  var _VolumeScaleModal = __webpack_require__(198);
  
  var _VolumeScaleModal2 = _interopRequireDefault(_VolumeScaleModal);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _constants = __webpack_require__(37);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(113);
  
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
  
  var VolumeList = function (_Component) {
    (0, _inherits3.default)(VolumeList, _Component);
  
    function VolumeList() {
      (0, _classCallCheck3.default)(this, VolumeList);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(VolumeList).call(this));
  
      _this.state = {
        diskName: ""
      };
      return _this;
    }
  
    (0, _createClass3.default)(VolumeList, [{
      key: 'getCreateBtn',
      value: function getCreateBtn() {
        var _this2 = this;
  
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)("hbAddBtn", "clearfix"), onClick: function onClick() {
              _this2.refs.createModal.open();
            } },
          _react2.default.createElement('div', { className: (0, _classnames2.default)("hbPlus", "left") }),
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)("hbPlusInfo", "left") },
            _react2.default.createElement(
              'p',
              { className: "hbPName" },
              '创建存储卷'
            ),
            _react2.default.createElement(
              'p',
              { className: "hbPInfo" },
              'Create a volume'
            )
          )
        );
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
        if (!data.length) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '6', style: { "textAlign": "center" } },
            '暂无数据~'
          )
        );
        if (data.length == 1 && data[0] == 1) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '6', style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        if (data.length == 1 && data[0] == 0) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '6', style: { "textAlign": "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        var body = [];
        data.map(function (item, i) {
          body.push(_react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'mediaItem' },
                _react2.default.createElement('img', { className: 'mediaImg', src: '/slImgJx.png' }),
                _react2.default.createElement(
                  'span',
                  { className: 'mediaTxt' },
                  item.disk_name
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'span',
                { className: 'cl3' },
                item.create_time
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              item.fs_type
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                {
                  className: (0, _classnames2.default)("mirror-state", item.disk_status == "unused" ? "off" : "on") },
                item.disk_status == "unused" ? '未使用' : '使用中'
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'span',
                { className: 'cl3' },
                _this3.getDiskSize(item.disk_size)
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'btn-group' },
                _react2.default.createElement(
                  _reactBootstrap.SplitButton,
                  {
                    onClick: function onClick() {
                      _this3.refs.scaleModal.open(item);
                    },
                    onSelect: _this3.deleteLine.bind(_this3, item.disk_name),
                    bsStyle: 'primary', title: '扩容', id: 'volumes-table-line-' + i },
                  _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { eventKey: '1' },
                    '删除'
                  )
                )
              )
            )
          ));
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
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)("hbHd", "clearfix") },
            _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)("hbAdd", "left") },
              this.getCreateBtn(),
              _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: "hbAddExplain" },
                '什么是存储卷？'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'right slSearch' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default icon-refresh', onClick: this.refresh.bind(this), title: '刷新' },
                ' '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'TableTextLeft', style: { padding: "15px" } },
            _react2.default.createElement(
              'table',
              { className: 'table table-hover table-bordered volumes-table' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    { width: '20%' },
                    '存储卷名称'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '20%' },
                    '创建时间'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '15%' },
                    '存储格式'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '15%' },
                    '状态'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '15%' },
                    '容量'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '15%' },
                    '操作'
                  )
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                this.getTableLine()
              )
            )
          ),
          _react2.default.createElement(_VolumeScaleModal2.default, { ref: 'scaleModal', onSave: this.scaleVolume.bind(this) }),
          _react2.default.createElement(_VolumeCreateModal2.default, { ref: 'createModal', isBtnState: this.props.isBtnState, onVolumeCreate: this.createVolume.bind(this) }),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '您确定要删除此数据卷吗?',
            ref: 'confirmModal',
            func: function func() {
              _this4.props.onVolumeDelete(_this4.state.diskName);
            }
          })
        );
      }
    }]);
    return VolumeList;
  }(_react.Component);
  
  VolumeList.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  VolumeList.propTypes = {
    onVolumeDelete: _react2.default.PropTypes.func,
    onVolumeCreate: _react2.default.PropTypes.func,
    onVolumeScale: _react2.default.PropTypes.func,
    onVolumesListLoad: _react2.default.PropTypes.func,
    setBreadcrumb: _react2.default.PropTypes.func,
    volumesList: _react2.default.PropTypes.array,
    onClearVolumesList: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object
  };
  exports.default = VolumeList;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactInputRange = __webpack_require__(174);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var InputRangesBox = function (_Component) {
    (0, _inherits3.default)(InputRangesBox, _Component);
  
    //input滑块
    function InputRangesBox(props) {
      (0, _classCallCheck3.default)(this, InputRangesBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(InputRangesBox).call(this, props));
  
      _this.state = {
        value: 2
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
        return _react2.default.createElement(
          'div',
          { className: 'formField' },
          _react2.default.createElement(_reactInputRange2.default, {
            className: 'formField',
            maxValue: 2,
            minValue: 1,
            step: 1,
            labelPrefix: '',
            labelSuffix: 'G',
            value: this.state.value,
            onChange: this.handleValueChange.bind(this)
          })
        );
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  var _class = function (_Component2) {
    (0, _inherits3.default)(_class, _Component2);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).call(this));
  
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
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', onClick: this.hide.bind(this), className: 'close', 'aria-label': 'Close' },
              _react2.default.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '×'
              )
            ),
            _react2.default.createElement(
              'h4',
              { className: 'modal-title', id: 'contained-modal-title-sm' },
              '创建存储卷'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            _react2.default.createElement(
              'div',
              { className: 'modalItem' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '名称'
                )
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', { onChange: this.changeName.bind(this), className: 'form-control form-control-sm', type: 'input', placeholder: '请输入名称', ref: 'disk_name' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modalItem' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '大小'
                )
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'modelInputRange' },
                  _react2.default.createElement(InputRangesBox, { ref: 'disk_size' }),
                  _react2.default.createElement(
                    'span',
                    null,
                    '充值用户可以创建更大存储卷'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modalItem' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '格式'
                )
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'select',
                  { ref: 'fs_type', className: 'form-control' },
                  _react2.default.createElement(
                    'option',
                    { value: 'xfs' },
                    'xfs'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'ext4' },
                    'ext4'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: this.state.isName ? "volumeTip volumeTipShow" : "volumeTip" },
              '数据卷名称格式不正确'
            ),
            _react2.default.createElement(
              'div',
              { className: 'modalItem modelItemLast' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  ' '
                )
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { bsStyle: 'primary',
                    disabled: !this.props.isBtnState.volume,
                    onClick: this.createVolume.bind(this) },
                  '创建存储卷'
                )
              )
            )
          )
        );
      }
    }]);
    return _class;
  }(_react.Component);
  
  _class.propTypes = {
    onVolumeCreate: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object
  };
  exports.default = _class;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactInputRange = __webpack_require__(174);
  
  var _reactInputRange2 = _interopRequireDefault(_reactInputRange);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var InputRangesBox = function (_Component) {
    (0, _inherits3.default)(InputRangesBox, _Component);
  
    function InputRangesBox(props) {
      (0, _classCallCheck3.default)(this, InputRangesBox);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(InputRangesBox).call(this, props));
  
      _this.state = {
        value: 2
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
        return _react2.default.createElement(
          'div',
          { className: 'formField' },
          _react2.default.createElement(_reactInputRange2.default, {
            className: 'formField',
            maxValue: 2,
            minValue: 1,
            step: 1,
            labelPrefix: '',
            labelSuffix: 'G',
            value: this.state.value,
            onChange: this.handleValueChange.bind(this)
          })
        );
      }
    }]);
    return InputRangesBox;
  }(_react.Component);
  
  InputRangesBox.propTypes = {
    value: _react2.default.PropTypes.number
  };
  
  var _class = function (_Component2) {
    (0, _inherits3.default)(_class, _Component2);
  
    function _class() {
      (0, _classCallCheck3.default)(this, _class);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).call(this));
  
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
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', onClick: this.hide.bind(this), className: 'close', 'aria-label': 'Close' },
              _react2.default.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '×'
              )
            ),
            _react2.default.createElement(
              'h4',
              { className: 'modal-title', id: 'contained-modal-title-sm' },
              '扩容'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            _react2.default.createElement(
              'div',
              { className: 'modalItem dilatationModalItem' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '大小'
                )
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'div',
                  { className: 'modelInputRange' },
                  _react2.default.createElement(InputRangesBox, { ref: 'diskSize', value: this.state.data.disk_size / 1024 << 0 }),
                  _react2.default.createElement(
                    'span',
                    null,
                    '充值用户可以创建更大存储卷'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'modalItem modelItemLast dilatationModalItem' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  ' '
                )
              ),
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary', onClick: this.save.bind(this) },
                  '保存'
                )
              )
            )
          )
        );
      }
    }]);
    return _class;
  }(_react.Component);
  
  _class.propTypes = {
    onSave: _react2.default.PropTypes.func
  };
  exports.default = _class;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(200);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, null));
  
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
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactCookie = __webpack_require__(68);
  
  var _reactCookie2 = _interopRequireDefault(_reactCookie);
  
  var _constants = __webpack_require__(37);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Notification = __webpack_require__(83);
  
  var _Notification2 = _interopRequireDefault(_Notification);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Login = function (_React$Component) {
    (0, _inherits3.default)(Login, _React$Component);
  
    function Login(props) {
      (0, _classCallCheck3.default)(this, Login);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Login).call(this, props));
  
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
        var notification = this.state.notifications.message ? _react2.default.createElement(_Notification2.default, { show: true, obj: this.state.notifications }) : _react2.default.createElement(_Notification2.default, { show: false, obj: this.state.notifications });
        this.context.setTitle("登录");
        return _react2.default.createElement(
          'div',
          { className: 'entryBox' },
          _react2.default.createElement(
            'div',
            { className: 'entryHd' },
            _react2.default.createElement(
              'div',
              { className: 'w1200 clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'entryHdLogo' },
                _react2.default.createElement(
                  'a',
                  { href: 'javascript:;', className: 'entryLogo' },
                  _react2.default.createElement('image', { src: '/logo.png' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'entryHdBtn' },
                _react2.default.createElement(
                  'a',
                  { href: '/signUp' },
                  '注册'
                ),
                _react2.default.createElement(
                  'a',
                  { href: '/login' },
                  '登录'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'entryBd' },
            _react2.default.createElement(
              'div',
              { className: 'entryModel' },
              _react2.default.createElement(
                'div',
                { className: 'entryModelBg' },
                'Make it simple   make it fast'
              ),
              _react2.default.createElement(
                'div',
                { className: 'entryFrom' },
                _react2.default.createElement(
                  'div',
                  { className: 'title' },
                  '用户登录'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'entryItemBox' },
                  _react2.default.createElement(
                    'div',
                    { className: 'entryItem ' + (this.state.uName ? "entryItemError" : "") },
                    _react2.default.createElement(
                      'div',
                      { className: 'entryInputBox icon-username' },
                      _react2.default.createElement('input', { onInput: this.changeUserName.bind(this), className: 'entryInput', ref: 'username', type: 'text', placeholder: '用户名或邮箱' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'entryTip' },
                      _react2.default.createElement(
                        'p',
                        { ref: 'userTip' },
                        '用户名错误'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryItem ' + (this.state.uPassword ? "entryItemError" : "") },
                    _react2.default.createElement(
                      'div',
                      { className: 'entryInputBox icon-mima' },
                      _react2.default.createElement('input', { onInput: this.changePassword.bind(this), className: 'entryInput', ref: 'password', type: 'password', placeholder: '密码' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'entryTip' },
                      _react2.default.createElement(
                        'p',
                        { ref: 'passwordTip' },
                        '密码错误'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryBtnBox' },
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-primary entryBtn ' + (!this.state.isLogin ? "btn-loading" : ""),
                        disabled: !this.state.isLogin,
                        onClick: this.login.bind(this) },
                      this.state.isLogin ? "登录" : "登录中"
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryFromFt' },
                    _react2.default.createElement(
                      'a',
                      { href: '/signUp' },
                      '立即注册'
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'javascript:;' },
                      '忘记密码'
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement('div', { className: 'entryBg' }),
          notification
        );
      }
    }, {
      key: 'render1',
      value: function render1() {
        var notification = this.state.notifications.message ? _react2.default.createElement(_Notification2.default, { obj: this.state.notifications }) : null;
        this.context.setTitle("登录");
        return _react2.default.createElement(
          'div',
          { className: 'entryBox' },
          _react2.default.createElement(
            'div',
            { className: 'entryHd' },
            _react2.default.createElement(
              'div',
              { className: 'w1200 clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'entryHdLogo' },
                _react2.default.createElement(
                  'a',
                  { href: 'javascript:;', className: 'entryLogo' },
                  _react2.default.createElement('image', { src: '/logo.png' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'entryHdBtn' },
                _react2.default.createElement(
                  'a',
                  { href: '/signUp' },
                  '注册'
                ),
                _react2.default.createElement(
                  'a',
                  { href: '/login' },
                  '登录'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'entryBd' },
            _react2.default.createElement(
              'div',
              { className: 'entryModel' },
              _react2.default.createElement(
                'div',
                { className: 'title' },
                '用户登录'
              ),
              _react2.default.createElement(
                'div',
                { className: 'entryFrom' },
                _react2.default.createElement(
                  'div',
                  { className: 'entryItem ' + (this.state.uName ? "entryItemError" : "") },
                  _react2.default.createElement(
                    'div',
                    { className: 'entryInputBox icon-username' },
                    _react2.default.createElement('input', { onInput: this.changeUserName.bind(this), className: 'entryInput', ref: 'username', type: 'text', placeholder: '用户名或邮箱' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryTip' },
                    _react2.default.createElement(
                      'p',
                      { ref: 'userTip' },
                      '用户名错误'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'entryItem ' + (this.state.uPassword ? "entryItemError" : "") },
                  _react2.default.createElement(
                    'div',
                    { className: 'entryInputBox icon-mima' },
                    _react2.default.createElement('input', { onInput: this.changePassword.bind(this), className: 'entryInput', ref: 'password', type: 'password', placeholder: '密码' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryTip' },
                    _react2.default.createElement(
                      'p',
                      { ref: 'passwordTip' },
                      '密码错误'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'entryBtnBox' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-primary entryBtn', disabled: !this.state.isLogin,
                      onClick: this.login.bind(this) },
                    this.state.isLogin ? "登录" : "登录中..."
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'entryFromFt' },
                  '没有账户? ',
                  _react2.default.createElement(
                    'a',
                    { href: '/signUp' },
                    '注册'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:;' },
                    '忘记密码'
                  )
                )
              )
            )
          ),
          _react2.default.createElement('div', { className: 'entryBg' }),
          notification
        );
      }
    }]);
    return Login;
  }(_react2.default.Component);
  
  Login.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  exports.default = Login;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SignUp = __webpack_require__(202);
  
  var _SignUp2 = _interopRequireDefault(_SignUp);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/signUp',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_SignUp2.default, null));
  
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
/* 202 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _Notification = __webpack_require__(83);
  
  var _Notification2 = _interopRequireDefault(_Notification);
  
  var _uuid = __webpack_require__(203);
  
  var _uuid2 = _interopRequireDefault(_uuid);
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var SignUp = function (_React$Component) {
    (0, _inherits3.default)(SignUp, _React$Component);
  
    function SignUp(props) {
      (0, _classCallCheck3.default)(this, SignUp);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SignUp).call(this, props));
  
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
        var notification = this.state.notifications.message ? _react2.default.createElement(_Notification2.default, { show: true, obj: this.state.notifications }) : _react2.default.createElement(_Notification2.default, { show: false, obj: this.state.notifications });
        this.context.setTitle("注册");
        return _react2.default.createElement(
          'div',
          { className: 'entryBox' },
          _react2.default.createElement(
            'div',
            { className: 'entryHd' },
            _react2.default.createElement(
              'div',
              { className: 'w1200 clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'entryHdLogo' },
                _react2.default.createElement(
                  'a',
                  { href: 'javascript:;', className: 'entryLogo' },
                  _react2.default.createElement('image', { src: '/logo.png' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'entryHdBtn' },
                _react2.default.createElement(
                  'a',
                  { href: '/signUp' },
                  '注册'
                ),
                _react2.default.createElement(
                  'a',
                  { href: '/login' },
                  '登录'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'entryBd signUp' },
            _react2.default.createElement(
              'div',
              { className: 'entryModel' },
              _react2.default.createElement(
                'div',
                { className: 'entryModelBg' },
                'Make it simple   make it fast'
              ),
              _react2.default.createElement(
                'div',
                { className: 'entryFrom' },
                _react2.default.createElement(
                  'div',
                  { className: 'title' },
                  '用户注册'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'entryItemBox' },
                  _react2.default.createElement(
                    'div',
                    { className: 'entryItem ' + (this.state.uName ? "entryItemError" : "") },
                    _react2.default.createElement(
                      'div',
                      { className: 'entryInputBox icon-username' },
                      _react2.default.createElement('input', { onChange: this.changeUserName.bind(this),
                        className: 'entryInput', ref: 'username', type: 'text', placeholder: '用户名' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'entryTip' },
                      _react2.default.createElement(
                        'p',
                        { ref: 'userTip' },
                        '用户名错误'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryItem ' + (this.state.uEmail ? "entryItemError" : "") },
                    _react2.default.createElement(
                      'div',
                      { className: 'entryInputBox icon-email' },
                      _react2.default.createElement('input', { onChange: this.changeEmail.bind(this),
                        className: 'entryInput', ref: 'email', type: 'text', placeholder: '邮箱' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'entryTip' },
                      _react2.default.createElement(
                        'p',
                        { ref: 'emailTip' },
                        '邮箱错误'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryItem ' + (this.state.uPassword ? "entryItemError" : "") },
                    _react2.default.createElement(
                      'div',
                      { className: 'entryInputBox icon-mima' },
                      _react2.default.createElement('input', { onInput: this.changePassword.bind(this),
                        className: 'entryInput', ref: 'password', type: 'password', placeholder: '密码' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'entryTip' },
                      _react2.default.createElement(
                        'p',
                        { ref: 'passwordTip' },
                        '密码错误'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryItem entryItemCode ' + (this.state.uCode ? "entryItemError" : "") },
                    _react2.default.createElement(
                      'div',
                      { className: 'entryInputBox  icon-mima' },
                      _react2.default.createElement('input', { onInput: this.changeCode.bind(this),
                        className: 'entryInput', ref: 'code', type: 'text', placeholder: '验证码' }),
                      _react2.default.createElement('img', { ref: 'codeImg', onClick: this.changeImageSrc.bind(this), src: '' }),
                      _react2.default.createElement(
                        'span',
                        { className: 'icon-refresh', onClick: this.changeImageSrc.bind(this) },
                        ' '
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'entryTip' },
                      _react2.default.createElement(
                        'p',
                        { ref: 'codeTip' },
                        '验证码错误'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryBtnBox' },
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-primary entryBtn ' + (!this.state.isSignUp ? "btn-loading" : ""),
                        disabled: !this.state.isSignUp,
                        onClick: this.signUp.bind(this) },
                      this.state.isSignUp ? "注册" : "注册中..."
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'entryFromFt' },
                    _react2.default.createElement(
                      'a',
                      { href: '/login' },
                      '已有账户   登录'
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement('div', { className: 'entryBg' }),
          notification
        );
      }
    }]);
    return SignUp;
  }(_react2.default.Component);
  
  SignUp.contextTypes = {
    setTitle: _react2.default.PropTypes.func
  };
  exports.default = SignUp;

/***/ },
/* 203 */
/***/ function(module, exports) {

  module.exports = require("uuid");

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _UserCenterContainer = __webpack_require__(205);
  
  var _UserCenterContainer2 = _interopRequireDefault(_UserCenterContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/user',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_UserCenterContainer2.default, null));
  
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
/* 205 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserCenter = __webpack_require__(206);
  
  var _UserCenter2 = _interopRequireDefault(_UserCenter);
  
  var _reactRedux = __webpack_require__(50);
  
  var _breadcumb = __webpack_require__(93);
  
  var _building = __webpack_require__(114);
  
  var _BuildingCreateSelector = __webpack_require__(147);
  
  var _users = __webpack_require__(212);
  
  var funUser = _interopRequireWildcard(_users);
  
  var _organize = __webpack_require__(75);
  
  var funOrganize = _interopRequireWildcard(_organize);
  
  var _organizeListSelector = __webpack_require__(82);
  
  var _organizeListSelector2 = _interopRequireDefault(_organizeListSelector);
  
  var _balanceSelector = __webpack_require__(213);
  
  var _balanceSelector2 = _interopRequireDefault(_balanceSelector);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var getAuthURL = (0, _BuildingCreateSelector.makeGetAuthURLSelector)();
    var getOrganizeList = (0, _organizeListSelector2.default)();
    var getBalance = (0, _balanceSelector2.default)();
    return {
      authUrl: getAuthURL(state),
      organizeList: getOrganizeList(state),
      balance: getBalance(state)
    };
  };
  
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setBreadcrumb: function setBreadcrumb() {
        dispatch(_breadcumb.setBreadcrumbAction.apply(undefined, arguments));
      },
      getAuthURL: function getAuthURL(data) {
        dispatch((0, _building.fetchGetAuthURLLAction)(data));
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
      },
      getBalance: function getBalance() {
        dispatch(funUser.fetchGetBalanceAction());
      }
    };
  };
  
  var UserCenterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_UserCenter2.default);
  
  exports.default = UserCenterContainer;

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _GetPersonalInfo = __webpack_require__(207);
  
  var _GetPersonalInfo2 = _interopRequireDefault(_GetPersonalInfo);
  
  var _GetMyAccount = __webpack_require__(208);
  
  var _GetMyAccount2 = _interopRequireDefault(_GetMyAccount);
  
  var _GetAccountManage = __webpack_require__(209);
  
  var _GetAccountManage2 = _interopRequireDefault(_GetAccountManage);
  
  var _GetCertificateMange = __webpack_require__(210);
  
  var _GetCertificateMange2 = _interopRequireDefault(_GetCertificateMange);
  
  var _GetOrganize = __webpack_require__(211);
  
  var _GetOrganize2 = _interopRequireDefault(_GetOrganize);
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '个人中心';
  
  var UserCenter = function (_Component) {
    (0, _inherits3.default)(UserCenter, _Component);
  
    function UserCenter() {
      (0, _classCallCheck3.default)(this, UserCenter);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UserCenter).apply(this, arguments));
    }
  
    (0, _createClass3.default)(UserCenter, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setBreadcrumb(_constants.BREADCRUMB.CONSOLE, _constants.BREADCRUMB.USER_CONTAINER);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        this.context.setTitle(title);
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'userTab' },
            _react2.default.createElement(
              _reactBootstrap.Tabs,
              { defaultActiveKey: 3, id: 'userTabs' },
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 1, title: '个人信息' },
                _react2.default.createElement(_GetPersonalInfo2.default, {
                  onRevisePassword: function onRevisePassword(passwordObj) {
                    return _this2.props.onRevisePassword(passwordObj);
                  }
                })
              ),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 2, title: '我的账户' },
                _react2.default.createElement(_GetMyAccount2.default, {
                  balance: this.props.balance,
                  getBalance: function getBalance() {
                    _this2.props.getBalance();
                  }
                })
              ),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 3, title: '账户管理' },
                _react2.default.createElement(_GetAccountManage2.default, {
                  authUrl: this.props.authUrl,
                  getAuthURL: function getAuthURL(data) {
                    _this2.props.getAuthURL(data);
                  }
                })
              ),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 4, title: '礼券管理' },
                _react2.default.createElement(_GetCertificateMange2.default, null)
              ),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 5, title: '组管理' },
                _react2.default.createElement(_GetOrganize2.default, {
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
                })
              )
            )
          )
        );
      }
    }]);
    return UserCenter;
  }(_react.Component);
  
  UserCenter.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  UserCenter.propTypes = {
    setBreadcrumb: _react2.default.PropTypes.func,
    authUrl: _react2.default.PropTypes.object,
    getAuthURL: _react2.default.PropTypes.func,
    onRevisePassword: _react2.default.PropTypes.func,
    createOrganize: _react2.default.PropTypes.func,
    organizeList: _react2.default.PropTypes.array,
    getOrganizeList: _react2.default.PropTypes.func,
    leaveOrganize: _react2.default.PropTypes.func,
    deleteOrganize: _react2.default.PropTypes.func,
    balance: _react2.default.PropTypes.number,
    getBalance: _react2.default.PropTypes.func
  };
  exports.default = UserCenter;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetPersonalInfo = function (_Component) {
    (0, _inherits3.default)(GetPersonalInfo, _Component);
  
    function GetPersonalInfo(props) {
      (0, _classCallCheck3.default)(this, GetPersonalInfo);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetPersonalInfo).call(this, props));
  
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
        return _react2.default.createElement(
          'div',
          { className: 'userTabBox' },
          _react2.default.createElement(
            'div',
            { className: 'userItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '个人头像',
              titleEnglish: '',
              titleInfo: 'PERSONAL HEAD'
            }),
            _react2.default.createElement(
              'div',
              { className: 'userHead' },
              _react2.default.createElement(
                'div',
                { className: 'userHeadBox' },
                _react2.default.createElement('img', null)
              ),
              _react2.default.createElement(
                'div',
                { className: 'choose icon-operation' },
                _react2.default.createElement(
                  'span',
                  null,
                  '更改头像'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'userItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '绑定手机',
              titleEnglish: '',
              titleInfo: 'BINDING CELLPHONE'
            }),
            _react2.default.createElement(
              'div',
              { className: 'userPhone' },
              _react2.default.createElement(
                'div',
                { className: 'userInputItem' },
                _react2.default.createElement('input', { type: 'text', className: 'form-control' }),
                _react2.default.createElement(
                  'i',
                  { className: 'userTip' },
                  '绑定手机号可接受系统重要通知'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'userInputItem' },
                _react2.default.createElement('input', { type: 'text', className: 'form-control userInputLittle' }),
                _react2.default.createElement(
                  'button',
                  { className: 'userButtonLittle' },
                  '短信验证码'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'userInputItem' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-warning' },
                  '绑定'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'userItem' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '修改密码',
              titleEnglish: '',
              titleInfo: 'MODIFY PASSWORD'
            }),
            _react2.default.createElement(
              'div',
              { className: 'userPhone' },
              _react2.default.createElement(
                'div',
                { className: 'userInputItem ' + (this.state.oldP ? "userInputItemError" : "") },
                _react2.default.createElement('input', { onChange: this.changeOldPassword.bind(this), type: 'password', className: 'form-control', ref: 'old_p', placeholder: '原始密码' }),
                _react2.default.createElement(
                  'i',
                  { className: 'userTip', ref: 'oldTip' },
                  ' '
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'userInputItem ' + (this.state.newP ? "userInputItemError" : "") },
                _react2.default.createElement('input', { onChange: this.changeNewPassword.bind(this), type: 'password', className: 'form-control', ref: 'new_p', placeholder: '新密码' }),
                _react2.default.createElement(
                  'i',
                  { className: 'userTip', ref: 'newTip' },
                  ' '
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'userInputItem ' + (this.state.newAgain ? "userInputItemError" : "") },
                _react2.default.createElement('input', { onChange: this.changeNewAgainPassword.bind(this), type: 'password', className: 'form-control', ref: 'new_p_again', placeholder: '确认新密码' }),
                _react2.default.createElement(
                  'i',
                  { className: 'userTip', ref: 'newTipAgain' },
                  ' '
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'userInputItem' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-warning', onClick: this.revisePassword.bind(this) },
                  '确定'
                )
              )
            )
          )
        );
      }
    }]);
    return GetPersonalInfo;
  }(_react.Component);
  
  GetPersonalInfo.propTypes = {
    onRevisePassword: _react2.default.PropTypes.func
  };
  exports.default = GetPersonalInfo;

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetMyAccount = function (_Component) {
    (0, _inherits3.default)(GetMyAccount, _Component);
  
    function GetMyAccount() {
      (0, _classCallCheck3.default)(this, GetMyAccount);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetMyAccount).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetMyAccount, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'getTableBody',
      value: function getTableBody() {
        var data = [{ name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }, { name: "服务名称", type: "数据卷扩容", time: "20160223", money: "200.00", way: "支付宝", pay: "已完成", odd: "123543" }];
        return data.map(function (item, i) {
          return _react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'tablePaddingLeft' },
                _react2.default.createElement(
                  'div',
                  { className: 'mediaItem' },
                  _react2.default.createElement('img', { className: 'mediaImg', src: '/slImgJx.png' }),
                  _react2.default.createElement(
                    'span',
                    { className: 'mediaTxt' },
                    item.name
                  )
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'tablePaddingLeft' },
                _react2.default.createElement(
                  'span',
                  { className: 'color333' },
                  item.type
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'tablePaddingLeft' },
                _react2.default.createElement(
                  'span',
                  { className: 'color333' },
                  item.time
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'tablePaddingLeft' },
                _react2.default.createElement(
                  'span',
                  { className: 'color333' },
                  item.money
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'tablePaddingLeft' },
                _react2.default.createElement(
                  'span',
                  { className: 'color333' },
                  item.way
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'tablePaddingLeft' },
                _react2.default.createElement('span', { className: 'icon-right' })
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'tablePaddingLeft' },
                _react2.default.createElement(
                  'span',
                  { className: 'color333' },
                  item.odd
                )
              )
            )
          );
        });
      }
    }, {
      key: 'getDemoTable',
      value: function getDemoTable() {
        return _react2.default.createElement(
          'table',
          { className: 'table recordTable' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '15%' },
                '服务名称'
              ),
              _react2.default.createElement(
                'th',
                { width: '15%' },
                '类型'
              ),
              _react2.default.createElement(
                'th',
                { width: '15%' },
                '时间'
              ),
              _react2.default.createElement(
                'th',
                { width: '15%' },
                '金额'
              ),
              _react2.default.createElement(
                'th',
                { width: '15%' },
                '扣款方式'
              ),
              _react2.default.createElement(
                'th',
                { width: '10%' },
                '是否完成'
              ),
              _react2.default.createElement(
                'th',
                { width: '15%' },
                '单号'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.getTableBody()
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'userTabBox' },
          _react2.default.createElement(
            'div',
            { className: 'userItem accountBg' },
            _react2.default.createElement(
              'div',
              { className: 'accountHd clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'left' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '账户余额',
                  titleEnglish: '',
                  titleInfo: 'ACCOUNT BALANCE'
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'right userHeadTip' },
                '  关注微信公众号，平台免费为您提供3个月的账户试用奖励。 '
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'accountBd' },
              _react2.default.createElement(
                'div',
                { className: 'accountItem' },
                _react2.default.createElement(
                  'span',
                  { className: 'aiName' },
                  '账户余额 :'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'aiInfo' },
                  _react2.default.createElement(
                    'i',
                    null,
                    '-1550'
                  ),
                  ' 元'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'accountItem' },
                _react2.default.createElement(
                  'span',
                  { className: 'aiName' },
                  '支付金额 :'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'aiInfo' },
                  _react2.default.createElement('input', { type: 'number', className: 'form-control' }),
                  ' 元'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'accountItem' },
                _react2.default.createElement(
                  'span',
                  { className: 'aiName' },
                  '支付方式 :'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'aiInfo' },
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: 'accountPay accountPayZfb active' },
                    ' '
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: 'accountPay accountPayWx' },
                    ' '
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'accountFt clearfix' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-danger' },
                '充值'
              ),
              _react2.default.createElement(
                'div',
                { className: 'accountFtTip right' },
                _react2.default.createElement(
                  'p',
                  null,
                  ' 提示：累计充值金额满',
                  _react2.default.createElement(
                    'span',
                    null,
                    '￥200'
                  ),
                  '后可提交工单申请发票。'
                ),
                _react2.default.createElement(
                  'a',
                  { href: 'javascript:;' },
                  ' '
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'userItem' },
            _react2.default.createElement(
              'div',
              { className: 'accountHd clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'left' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '充值记录',
                  titleEnglish: '',
                  titleInfo: 'RECHARGE RECORD'
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'right userHeadTip' },
                '提示：仅显示最近5笔交易，如需了解全部记录请提交 工单，我们会在24小时内发送您邮箱'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'userPayRecord' },
              this.getDemoTable()
            )
          )
        );
      }
    }]);
    return GetMyAccount;
  }(_react.Component);
  
  GetMyAccount.propTypes = {
    balance: _react2.default.PropTypes.number,
    getBalance: _react2.default.PropTypes.func
  };
  exports.default = GetMyAccount;

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetAccountManage = function (_Component) {
    (0, _inherits3.default)(GetAccountManage, _Component);
  
    function GetAccountManage() {
      (0, _classCallCheck3.default)(this, GetAccountManage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetAccountManage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetAccountManage, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var git = this.context.store.getState().user_info.oauth.github;
        var cod = this.context.store.getState().user_info.oauth.coding;
        !git ? this.props.getAuthURL({ src_type: "github", redirect_url: window.location.href }) : null;
        !cod ? this.props.getAuthURL({ src_type: "coding", redirect_url: window.location.href }) : null;
      }
    }, {
      key: 'render',
      value: function render() {
        var user = this.context.store.getState().user_info;
        return _react2.default.createElement(
          'div',
          { className: 'userTabBox' },
          _react2.default.createElement(
            'div',
            { className: 'accountManageHd' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '账号管理',
              titleEnglish: '',
              titleInfo: 'ACCOUNT MANAGEMENT'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'accountManageItem' },
            _react2.default.createElement(
              'div',
              { className: 'accountManageBox icon-github' },
              _react2.default.createElement(
                'div',
                { className: 'ambInfo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'Github'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'Github于2008年上线，用于Git代码仓库托管及基本的Web管理界面'
                )
              )
            ),
            _react2.default.createElement(
              'a',
              { href: user.oauth.github ? "javascript:;" : this.props.authUrl.github, target: '_blank',
                className: 'btn btn-warning' },
              user.oauth.github ? "已绑定" : "绑定"
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'accountManageItem' },
            _react2.default.createElement(
              'div',
              { className: 'accountManageBox icon-github' },
              _react2.default.createElement(
                'div',
                { className: 'ambInfo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'Coding'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'Coding.net 为软件开发者提供基于云计算技术的软件开发平台，包括项目管理，代码托管，运行空间和质量控制等等。'
                )
              )
            ),
            _react2.default.createElement(
              'a',
              { href: user.oauth.coding ? "javascript:;" : this.props.authUrl.coding, target: '_blank',
                className: 'btn ' + (user.oauth.coding ? "btn-default" : "btn-warning") },
              user.oauth.coding ? "解除绑定" : "绑定"
            )
          )
        );
      }
    }]);
    return GetAccountManage;
  }(_react.Component);
  
  GetAccountManage.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  GetAccountManage.propTypes = {
    authUrl: _react2.default.PropTypes.object,
    getAuthURL: _react2.default.PropTypes.func
  };
  exports.default = GetAccountManage;

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetCertificateMange = function (_Component) {
    (0, _inherits3.default)(GetCertificateMange, _Component);
  
    function GetCertificateMange() {
      (0, _classCallCheck3.default)(this, GetCertificateMange);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetCertificateMange).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GetCertificateMange, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'userTabBox' },
          _react2.default.createElement(
            'div',
            { className: 'certificateMangeItem' },
            _react2.default.createElement(
              'div',
              { className: 'accountHd clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'left' },
                _react2.default.createElement(_HeadLine2.default, {
                  title: '我的礼券',
                  titleEnglish: '',
                  titleInfo: 'MY CERTIFICATE'
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'right userHeadTip redTip' },
                '提示：礼券在激活后才可使用。'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'userInputItem' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: '请输入礼券八位码' }),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-danger' },
                '激活'
              )
            )
          )
        );
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
  
  var _extends2 = __webpack_require__(36);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _Confirm = __webpack_require__(113);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _route = __webpack_require__(57);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetOrganize = function (_Component) {
      (0, _inherits3.default)(GetOrganize, _Component);
  
      function GetOrganize() {
          (0, _classCallCheck3.default)(this, GetOrganize);
  
          var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetOrganize).call(this));
  
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
              if (data[0] == 1) return _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                      'td',
                      { colSpan: '5', style: { textAlign: "center" } },
                      _react2.default.createElement(_Loading2.default, null)
                  )
              );
              if (data.length == 1 && data[0].orga_name == user_name) return _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                      'td',
                      { colSpan: '5', style: { textAlign: "center" } },
                      '暂无数据~'
                  )
              );
              if (data.length == 0) return _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                      'td',
                      { colSpan: '5', style: { textAlign: "center" } },
                      '暂无数据~'
                  )
              );
              var role = "";
              return data.map(function (item, i) {
                  if (item.orga_name == user_name) return false;
                  var opt = _react2.default.createElement(
                      'button',
                      { className: 'btn btn-danger', onClick: _this2.leaveOrganize.bind(_this2, item.org_id) },
                      '退出组织'
                  );
                  switch (Number(item.role)) {
                      case 200:
                          role = "组织拥有者";
                          opt = _react2.default.createElement(
                              'button',
                              { className: 'btn btn-danger', onClick: _this2.deleteOrganize.bind(_this2, item.org_id) },
                              '解散组织'
                          );
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
                  return _react2.default.createElement(
                      'tr',
                      { key: i },
                      _react2.default.createElement(
                          'td',
                          null,
                          _react2.default.createElement(
                              'div',
                              { className: 'mediaItem' },
                              _react2.default.createElement('img', { className: 'mediaImg', src: '/slImgJx.png' }),
                              _react2.default.createElement(
                                  'span',
                                  { className: 'mediaTxt' },
                                  item.orga_name
                              )
                          )
                      ),
                      _react2.default.createElement(
                          'td',
                          null,
                          item.org_detail || "暂无简介"
                      ),
                      _react2.default.createElement(
                          'td',
                          null,
                          role
                      ),
                      _react2.default.createElement(
                          'td',
                          null,
                          opt
                      )
                  );
              });
          }
      }, {
          key: 'getTableDemo',
          value: function getTableDemo() {
              return _react2.default.createElement(
                  'table',
                  { className: 'table table-hover table-bordered' },
                  _react2.default.createElement(
                      'thead',
                      null,
                      _react2.default.createElement(
                          'tr',
                          null,
                          _react2.default.createElement(
                              'th',
                              { width: '25%' },
                              '组织名称'
                          ),
                          _react2.default.createElement(
                              'th',
                              { width: '25%' },
                              '组织简介'
                          ),
                          _react2.default.createElement(
                              'th',
                              { width: '25%' },
                              '组织权限'
                          ),
                          _react2.default.createElement(
                              'th',
                              { width: '25%' },
                              '操作'
                          )
                      )
                  ),
                  _react2.default.createElement(
                      'tbody',
                      null,
                      this.getOrganizeBody()
                  )
              );
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
              if (is_user == 0) {
                  this.context.store.dispatch((0, _route.navigate)("/"));
              }
          }
      }, {
          key: 'render',
          value: function render() {
              var _this3 = this;
  
              return _react2.default.createElement(
                  'div',
                  { className: 'organize' },
                  _react2.default.createElement(
                      'div',
                      { className: 'organizeHd hbHd clearfix' },
                      _react2.default.createElement(
                          'div',
                          { className: 'left' },
                          _react2.default.createElement(_HeadLine2.default, {
                              title: '我的组织',
                              titleEnglish: 'MY ORGANIZE',
                              titleInfo: '所有我加入的组织的列表'
                          })
                      ),
                      _react2.default.createElement(
                          'div',
                          { className: 'hbAdd right' },
                          _react2.default.createElement(
                              'div',
                              { className: 'hbAddBtn clearfix', onClick: function onClick() {
                                      _this3.refs.createOrgModel.open();
                                  } },
                              _react2.default.createElement('div', { className: 'hbPlus left' }),
                              _react2.default.createElement(
                                  'div',
                                  { className: 'hbPlusInfo left' },
                                  _react2.default.createElement(
                                      'p',
                                      { className: 'hbPName' },
                                      '新建组织'
                                  ),
                                  _react2.default.createElement(
                                      'p',
                                      { className: 'hbPInfo' },
                                      'Create Organize'
                                  )
                              )
                          )
                      )
                  ),
                  _react2.default.createElement(
                      'div',
                      { className: 'organizeBd sl-bd TableTextLeft' },
                      this.getTableDemo()
                  ),
                  _react2.default.createElement(CreateOrganize, { onCreateOrganize: this.createOrganize.bind(this), ref: 'createOrgModel' }),
                  _react2.default.createElement(_Confirm2.default, {
                      title: '警告',
                      text: '您确定要离开此组织吗?',
                      ref: 'confirmModalLeave',
                      func: function func() {
                          _this3.props.leaveOrganize(_this3.state.orgData);
                      }
                  }),
                  _react2.default.createElement(_Confirm2.default, {
                      title: '警告',
                      text: '您确定要解散此组织吗?',
                      ref: 'confirmModalDelete',
                      func: function func() {
                          _this3.props.deleteOrganize(_this3.state.orgData);
                      }
                  })
              );
          }
      }]);
      return GetOrganize;
  }(_react.Component);
  
  GetOrganize.contextTypes = {
      store: _react2.default.PropTypes.object
  };
  GetOrganize.propTypes = {
      createOrganize: _react2.default.PropTypes.func,
      organizeList: _react2.default.PropTypes.array,
      getOrganizeList: _react2.default.PropTypes.func,
      leaveOrganize: _react2.default.PropTypes.func,
      deleteOrganize: _react2.default.PropTypes.func
  };
  
  var CreateOrganize = function (_Component2) {
      (0, _inherits3.default)(CreateOrganize, _Component2);
  
      function CreateOrganize(props) {
          (0, _classCallCheck3.default)(this, CreateOrganize);
  
          var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CreateOrganize).call(this, props));
  
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
              if (!this.state.orgName) {
                  this.props.onCreateOrganize(org_name.value);
              }
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
                  return false;
              } else if (value.length < 6) {
                  this.setState({
                      orgName: true
                  });
                  org_tip.innerHTML = "组织名称太短";
                  return false;
              } else if (!/^[a-z]{1}[a-z0-9_]{5,}$/.test(value)) {
                  this.setState({
                      orgName: true
                  });
                  org_tip.innerHTML = "组织名称格式不正确";
                  return false;
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
                  _react2.default.createElement(
                      'div',
                      { className: 'modal-header' },
                      _react2.default.createElement(
                          'button',
                          { type: 'button', onClick: this.hide.bind(this), className: 'close', 'aria-label': 'Close' },
                          _react2.default.createElement(
                              'span',
                              { 'aria-hidden': 'true' },
                              '×'
                          )
                      ),
                      _react2.default.createElement(
                          'h4',
                          { className: 'modal-title', id: 'contained-modal-title-sm' },
                          '新建组织'
                      )
                  ),
                  _react2.default.createElement(
                      'div',
                      { className: this.state.orgName ? "modal-body has-error" : "modal-body" },
                      _react2.default.createElement(
                          'div',
                          { className: 'modalItem' },
                          _react2.default.createElement(
                              'label',
                              null,
                              _react2.default.createElement(
                                  'span',
                                  null,
                                  '组织名称'
                              )
                          ),
                          _react2.default.createElement(
                              'label',
                              null,
                              _react2.default.createElement('input', { onInput: this.organizeName.bind(this),
                                  className: 'form-control form-control-sm',
                                  type: 'input', placeholder: '请输入名称',
                                  ref: 'org_name' })
                          )
                      ),
                      _react2.default.createElement(
                          'div',
                          { ref: 'org_tip', className: 'volumeTip' },
                          '组织名称不正确'
                      ),
                      _react2.default.createElement(
                          'div',
                          { className: 'modalItem modelItemLast' },
                          _react2.default.createElement(
                              'label',
                              null,
                              _react2.default.createElement(
                                  'span',
                                  null,
                                  this.state.orgName,
                                  ' '
                              )
                          ),
                          _react2.default.createElement(
                              'label',
                              null,
                              _react2.default.createElement(
                                  'button',
                                  { className: 'btn btn-primary',
                                      onClick: this.createOrganize.bind(this) },
                                  '创建组织'
                              )
                          )
                      )
                  )
              );
          }
      }]);
      return CreateOrganize;
  }(_react.Component);
  
  CreateOrganize.propTypes = {
      onCreateOrganize: _react2.default.PropTypes.func
  };
  exports.default = GetOrganize;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(12);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.receiveUserInfo = receiveUserInfo;
  exports.fetchUserInfo = fetchUserInfo;
  exports.fetchRevisePasswordAction = fetchRevisePasswordAction;
  exports.fetchGetBalanceAction = fetchGetBalanceAction;
  
  var _constants = __webpack_require__(37);
  
  var Const = _interopRequireWildcard(_constants);
  
  var _isomorphicFetch = __webpack_require__(76);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  var _notification = __webpack_require__(77);
  
  var _route = __webpack_require__(57);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function receiveUserInfo(data) {
    return {
      type: _constants.RECEIVE_USER_INFO,
      payload: data
    };
  }
  
  function fetchUserInfo(token) {
    var development = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  
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
  
  function receiveBalance(data) {
    return {
      type: Const.GET_BALANCE,
      payload: data
    };
  }
  function fetchGetBalanceAction() {
    var myInit = {
      method: "GET",
      headers: { token: localStorage.getItem("_at") }
    };
    var url = Const.FETCH_URL;
    return function (dispatch) {
      return (0, _isomorphicFetch2.default)(url, myInit).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status == 0) {
          dispatch(receiveBalance(json.result));
        } else {}
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
  
  var _reselect = __webpack_require__(62);
  
  //getBalance
  var getBalance = function getBalance(state) {
    return state.balance;
  };
  
  var makeGetBalance = function makeGetBalance() {
    return (0, _reselect.createSelector)([getBalance], function (balance) {
      return balance;
    });
  };
  
  exports.default = makeGetBalance;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ReviseImageContainer = __webpack_require__(215);
  
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
                return _context.abrupt('return', _react2.default.createElement(_ReviseImageContainer2.default, { uuid: params.uuid }));
  
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
/* 215 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _ReviseImage = __webpack_require__(216);
  
  var _ReviseImage2 = _interopRequireDefault(_ReviseImage);
  
  var _reactRedux = __webpack_require__(50);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  var _imageDetailSelector = __webpack_require__(124);
  
  var _imageDetailSelector2 = _interopRequireDefault(_imageDetailSelector);
  
  var _breadcumb = __webpack_require__(93);
  
  var _imageDetail = __webpack_require__(123);
  
  var _reviseImage = __webpack_require__(125);
  
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
/* 216 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _constants = __webpack_require__(37);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(IsPublicToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
          defaultChecked: this.state.is_public,
          onChange: this.handClick.bind(this)
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  IsPublicToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.bool
  };
  
  var ReviseImage = function (_React$Component) {
    (0, _inherits3.default)(ReviseImage, _React$Component);
  
    function ReviseImage() {
      (0, _classCallCheck3.default)(this, ReviseImage);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReviseImage).call(this));
  
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
          return _react2.default.createElement(
            'div',
            { className: 'acBox', key: new Date(item.creation_time).getTime() },
            _react2.default.createElement(
              'h1',
              null,
              '修改镜像'
            ),
            _react2.default.createElement(
              'p',
              null,
              '镜像是服务运行的模板, 来源于代码, 基于 Dockerfile 构建, 默认目录在根\'/\'下, 文件名 Dockerfile .'
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '镜像名称',
                titleEnglish: 'IMAGE NAME',
                titleInfo: '默认会与您下方代码源的项目名称相同'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox ' + (my.state.isImageName ? "has-error" : "") },
                _react2.default.createElement(
                  'span',
                  { ref: 'repository' },
                  name
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '镜像简介',
                titleEnglish: 'IMAGE SUMMARY',
                titleInfo: '简单介绍镜像的信息'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('textarea', {
                  placeholder: '镜像简介',
                  className: 'form-control',
                  defaultValue: item.detail,
                  ref: 'image_detail'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '详细描述',
                titleEnglish: 'IMAGE DETAIL',
                titleInfo: '详细介绍镜像的信息'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement('textarea', {
                  placeholder: '详细描述',
                  className: 'form-control',
                  defaultValue: item.short_description,
                  ref: 'short_description'
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(_HeadLine2.default, {
                title: '是否公开',
                titleEnglish: 'IS PUBLIC',
                titleInfo: '公开后都可以访问'
              }),
              _react2.default.createElement(
                'div',
                { className: 'assBox' },
                _react2.default.createElement(IsPublicToggle, { state: item.is_public == 1, getToggle: my.getToggleValue.bind(_this3) })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'assItem' },
              _react2.default.createElement(
                'div',
                { className: 'acBtn' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary',
                    onClick: my.building.bind(_this3),
                    disabled: !my.props.isBtnState.building },
                  my.props.isBtnState.building ? "修改" : "修改中..."
                )
              )
            )
          );
        });
        return dataBox;
      }
    }, {
      key: 'render',
      value: function render() {
        this.context.setTitle('修改镜像');
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          this.getDate()
        );
      }
    }]);
    return ReviseImage;
  }(_react2.default.Component);
  
  ReviseImage.contextTypes = {
    setTitle: _react2.default.PropTypes.func,
    store: _react2.default.PropTypes.object
  };
  ReviseImage.propTypes = {
    uuid: _react2.default.PropTypes.string,
    setBreadcrumb: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object,
    imageDetail: _react2.default.PropTypes.object,
    getImageDetail: _react2.default.PropTypes.func,
    onReviseImage: _react2.default.PropTypes.func
  };
  exports.default = ReviseImage;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _OrganizeContainer = __webpack_require__(218);
  
  var _OrganizeContainer2 = _interopRequireDefault(_OrganizeContainer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/organize',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_OrganizeContainer2.default, null));
  
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
/* 218 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _Organize = __webpack_require__(219);
  
  var _Organize2 = _interopRequireDefault(_Organize);
  
  var _reactRedux = __webpack_require__(50);
  
  var _breadcumb = __webpack_require__(93);
  
  var _organize = __webpack_require__(75);
  
  var fun = _interopRequireWildcard(_organize);
  
  var _organizeDetailSelector = __webpack_require__(224);
  
  var _organizeDetailSelector2 = _interopRequireDefault(_organizeDetailSelector);
  
  var _organizeUserListSelector = __webpack_require__(225);
  
  var _organizeUserListSelector2 = _interopRequireDefault(_organizeUserListSelector);
  
  var _userListSelector = __webpack_require__(226);
  
  var _userListSelector2 = _interopRequireDefault(_userListSelector);
  
  var _isBtnStateSelector = __webpack_require__(126);
  
  var _isBtnStateSelector2 = _interopRequireDefault(_isBtnStateSelector);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mapStateToProps = function mapStateToProps(state) {
    var getOrganizeDetail = (0, _organizeDetailSelector2.default)();
    var getOrganizeUserList = (0, _organizeUserListSelector2.default)();
    var getUserList = (0, _userListSelector2.default)();
    var isBtnStateSelector = (0, _isBtnStateSelector2.default)();
    return {
      organizeDetail: getOrganizeDetail(state),
      organizeUserList: getOrganizeUserList(state),
      userList: getUserList(state),
      isBtnState: isBtnStateSelector(state)
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
/* 219 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _constants = __webpack_require__(37);
  
  var _GetOrgInfo = __webpack_require__(220);
  
  var _GetOrgInfo2 = _interopRequireDefault(_GetOrgInfo);
  
  var _GetOrgDeal = __webpack_require__(221);
  
  var _GetOrgDeal2 = _interopRequireDefault(_GetOrgDeal);
  
  var _GetOrgAdmin = __webpack_require__(222);
  
  var _GetOrgAdmin2 = _interopRequireDefault(_GetOrgAdmin);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = '组织中心';
  
  var Organize = function (_Component) {
    (0, _inherits3.default)(Organize, _Component);
  
    function Organize() {
      (0, _classCallCheck3.default)(this, Organize);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Organize).apply(this, arguments));
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
        return _react2.default.createElement(
          'div',
          { className: 'containerBgF' },
          _react2.default.createElement(
            'div',
            { className: 'userTab' },
            _react2.default.createElement(
              _reactBootstrap.Tabs,
              { defaultActiveKey: 4, id: 'userTabs' },
              _react2.default.createElement(_reactBootstrap.Tab, { eventKey: 1, title: '账户信息' }),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 2, title: '组织信息' },
                _react2.default.createElement(_GetOrgInfo2.default, {
                  getOrganizeDetail: function getOrganizeDetail(id) {
                    _this2.props.getOrganizeDetail(id);
                  },
                  organizeDetail: this.props.organizeDetail,
                  setOrganizeDetail: function setOrganizeDetail(data) {
                    _this2.props.setOrganizeDetail(data);
                  },
                  isBtnState: this.props.isBtnState
                })
              ),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 3, title: '交易记录' },
                _react2.default.createElement(_GetOrgDeal2.default, null)
              ),
              _react2.default.createElement(
                _reactBootstrap.Tab,
                { eventKey: 4, title: '组织管理' },
                _react2.default.createElement(_GetOrgAdmin2.default, {
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
                })
              )
            )
          )
        );
      }
    }]);
    return Organize;
  }(_react.Component);
  
  Organize.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    store: _react2.default.PropTypes.object
  };
  Organize.propTypes = {
    isBtnState: _react2.default.PropTypes.object,
    setBreadcrumb: _react2.default.PropTypes.func,
    getOrganizeDetail: _react2.default.PropTypes.func,
    organizeDetail: _react2.default.PropTypes.object,
    setOrganizeDetail: _react2.default.PropTypes.func,
    organizeUserList: _react2.default.PropTypes.array,
    getOrganizeUserList: _react2.default.PropTypes.func,
    userList: _react2.default.PropTypes.array,
    getUserList: _react2.default.PropTypes.func,
    inviteUser: _react2.default.PropTypes.func,
    changeOrganizeOwner: _react2.default.PropTypes.func,
    deleteOrganize: _react2.default.PropTypes.func,
    leaveOrganize: _react2.default.PropTypes.func
  };
  exports.default = Organize;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Toggle = __webpack_require__(119);
  
  var _Toggle2 = _interopRequireDefault(_Toggle);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var IsPublicToggle = function (_Component) {
    (0, _inherits3.default)(IsPublicToggle, _Component);
  
    function IsPublicToggle(props) {
      (0, _classCallCheck3.default)(this, IsPublicToggle);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(IsPublicToggle).call(this, props));
  
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
        return _react2.default.createElement(_Toggle2.default, {
          defaultChecked: this.state.is_public,
          onChange: this.handClick.bind(this),
          disabled: this.props.disabled
        });
      }
    }]);
    return IsPublicToggle;
  }(_react.Component);
  
  IsPublicToggle.propTypes = {
    getToggle: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool
  };
  
  var GetOrgInfo = function (_Component2) {
    (0, _inherits3.default)(GetOrgInfo, _Component2);
  
    function GetOrgInfo(props) {
      (0, _classCallCheck3.default)(this, GetOrgInfo);
  
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetOrgInfo).call(this, props));
  
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
        var data = {
          orga_detail: this.refs.orga_detail.value,
          is_public: this.state.is_public
        };
        this.props.setOrganizeDetail(data);
      }
    }, {
      key: 'render',
      value: function render() {
        var data = this.props.organizeDetail;
        var role_uuid = this.context.store.getState().user_info.role_uuid;
        var role = role_uuid == 200;
        if (data.creation_time == "") return _react2.default.createElement(
          'div',
          { style: { textAlign: "center" } },
          _react2.default.createElement(_Loading2.default, null)
        );
        return _react2.default.createElement(
          'div',
          { className: 'userTabBox', key: new Date(data.creation_time).getTime() },
          _react2.default.createElement(
            'div',
            { className: 'userItem organizeBox' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '组织头像',
              titleEnglish: '',
              titleInfo: 'ORGANIZE HEAD'
            }),
            _react2.default.createElement(
              'div',
              { className: 'userHead organizeItem' },
              _react2.default.createElement(
                'div',
                { className: 'userHeadBox' },
                _react2.default.createElement('img', null)
              ),
              _react2.default.createElement(
                'div',
                { className: 'choose icon-operation' },
                _react2.default.createElement(
                  'span',
                  null,
                  '更改头像'
                )
              )
            ),
            _react2.default.createElement(_HeadLine2.default, {
              title: '组织描述',
              titleEnglish: '',
              titleInfo: 'ORGANIZE '
            }),
            _react2.default.createElement(
              'div',
              { className: 'organizeItem' },
              role ? _react2.default.createElement('textarea', { type: 'text', className: 'form-control', ref: 'orga_detail', defaultValue: data.orga_detail }) : _react2.default.createElement(
                'p',
                null,
                data.orga_detail
              )
            ),
            _react2.default.createElement(_HeadLine2.default, {
              title: '是否公开',
              titleEnglish: '',
              titleInfo: 'IS PUBLIC'
            }),
            _react2.default.createElement(
              'div',
              { className: 'organizeItem' },
              _react2.default.createElement(IsPublicToggle, {
                state: data.is_public == 1,
                getToggle: this.getToggleValue.bind(this),
                disabled: !role
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'organizeItem organizeItemBtn ' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary ' + (!this.props.isBtnState.setOrg ? "btn-loading" : ""),
                  disabled: !this.props.isBtnState.setOrg,
                  onClick: this.setOrganizeDetail.bind(this) },
                this.props.isBtnState.setOrg ? "保存" : "保存中..."
              )
            )
          )
        );
      }
    }]);
    return GetOrgInfo;
  }(_react.Component);
  
  GetOrgInfo.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  GetOrgInfo.propTypes = {
    getOrganizeDetail: _react2.default.PropTypes.func,
    organizeDetail: _react2.default.PropTypes.object,
    setOrganizeDetail: _react2.default.PropTypes.func,
    isBtnState: _react2.default.PropTypes.object
  };
  exports.default = GetOrgInfo;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _reactDom = __webpack_require__(133);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetOrgDeal = function (_Component) {
    (0, _inherits3.default)(GetOrgDeal, _Component);
  
    function GetOrgDeal(props) {
      (0, _classCallCheck3.default)(this, GetOrgDeal);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetOrgDeal).call(this, props));
  
      _this.state = {};
      return _this;
    }
  
    (0, _createClass3.default)(GetOrgDeal, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'userTabBox' },
          '123'
        );
      }
    }]);
    return GetOrgDeal;
  }(_react.Component);
  
  GetOrgDeal.propTypes = {};
  exports.default = GetOrgDeal;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(9);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeadLine = __webpack_require__(130);
  
  var _HeadLine2 = _interopRequireDefault(_HeadLine);
  
  var _Loading = __webpack_require__(91);
  
  var _Loading2 = _interopRequireDefault(_Loading);
  
  var _reactBootstrap = __webpack_require__(69);
  
  var _Confirm = __webpack_require__(113);
  
  var _Confirm2 = _interopRequireDefault(_Confirm);
  
  var _route = __webpack_require__(57);
  
  var _notification = __webpack_require__(77);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GetOrgAdmin = function (_Component) {
    (0, _inherits3.default)(GetOrgAdmin, _Component);
  
    function GetOrgAdmin(props) {
      (0, _classCallCheck3.default)(this, GetOrgAdmin);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GetOrgAdmin).call(this, props));
  
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
        if (data[0] == 1) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '3', style: { textAlign: "center" } },
            _react2.default.createElement(_Loading2.default, null)
          )
        );
        if (!data.length) return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: '3', style: { textAlign: "center" } },
            '暂无数据~'
          )
        );
        return data.map(function (item, i) {
          var role = "";
          var buttonGroup = "";
          switch (Number(item.role)) {
            case 200:
              role = "组织创建者";
              buttonGroup = _react2.default.createElement(
                'div',
                { className: 'roleBox' },
                _react2.default.createElement(
                  'button',
                  { disabled: orgRole != 200,
                    onClick: _this2.onDeleteOrganize.bind(_this2),
                    className: 'btn btn-danger' },
                  '解散组织'
                )
              );
              break;
            case 210:
              role = "管理员";
              buttonGroup = _react2.default.createElement(
                'div',
                { className: 'roleBox' },
                _react2.default.createElement(
                  _reactBootstrap.DropdownButton,
                  {
                    onSelect: _this2.onChangeUserRole.bind(_this2, item.uid),
                    bsStyle: "primary",
                    disabled: orgRole != 200 && user_name != item.user_name,
                    title: '更改权限', id: 'volumes-table-line-' + i },
                  _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { eventKey: '400' },
                    '用户'
                  ),
                  orgRole == 200 ? _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { eventKey: '520' },
                    '组织创建者'
                  ) : ""
                ),
                user_name == item.user_name ? _react2.default.createElement(
                  'button',
                  { className: 'btn btn-danger',
                    onClick: _this2.onLeaveOrganize.bind(_this2)
                  },
                  '离开组织'
                ) : _react2.default.createElement(
                  'button',
                  { className: 'btn btn-danger',
                    onClick: _this2.onDeleteUser.bind(_this2, item.uid),
                    disabled: orgRole != 200 },
                  '移除组织'
                )
              );
              break;
            case 400:
              role = "成员";
              buttonGroup = _react2.default.createElement(
                'div',
                { className: 'roleBox' },
                _react2.default.createElement(
                  _reactBootstrap.DropdownButton,
                  {
                    onSelect: _this2.onChangeUserRole.bind(_this2, item.uid),
                    bsStyle: "primary",
                    disabled: orgRole != 200,
                    title: '更改权限', id: 'volumes-table-line-' + i },
                  orgRole == 200 ? _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { eventKey: '210' },
                    '管理员'
                  ) : "",
                  orgRole == 200 ? _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { eventKey: '520' },
                    '组织创建者'
                  ) : ""
                ),
                user_name == item.user_name ? _react2.default.createElement(
                  'button',
                  { className: 'btn btn-danger',
                    onClick: _this2.onLeaveOrganize.bind(_this2)
                  },
                  '离开组织'
                ) : _react2.default.createElement(
                  'button',
                  { className: 'btn btn-danger',
                    disabled: orgRole == 400,
                    onClick: _this2.onDeleteUser.bind(_this2, item.uid)
                  },
                  '移除组织'
                )
              );
              break;
            default:
              role = "成员";
              buttonGroup = _react2.default.createElement(
                'div',
                { className: 'roleBox' },
                _react2.default.createElement(
                  _reactBootstrap.DropdownButton,
                  {
                    onSelect: _this2.onChangeUserRole.bind(_this2, item.uid),
                    bsStyle: "primary",
                    disabled: orgRole == 400 && user_name != item.user_name,
                    title: '更改权限', id: 'volumes-table-line-' + i },
                  orgRole == 200 ? _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { eventKey: '210' },
                    '管理员'
                  ) : "",
                  orgRole == 200 ? _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { eventKey: '520' },
                    '组织创建者'
                  ) : ""
                ),
                user_name == item.user_name ? _react2.default.createElement(
                  'button',
                  { className: 'btn btn-danger' },
                  '离开组织'
                ) : "",
                orgRole == 200 || orgRole == 210 ? _react2.default.createElement(
                  'button',
                  { className: 'btn btn-danger' },
                  '移除组织'
                ) : ""
              );
  
          }
          return _react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'mediaItem' },
                _react2.default.createElement('img', { className: 'mediaImg', src: '/slImgJx.png' }),
                _react2.default.createElement(
                  'span',
                  { className: 'mediaTxt' },
                  item.user_name
                )
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              role
            ),
            _react2.default.createElement(
              'td',
              null,
              buttonGroup
            )
          );
        });
      }
    }, {
      key: 'getTableDemo',
      value: function getTableDemo() {
        return _react2.default.createElement(
          'table',
          { className: 'table table-hover table-bordered' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { width: '33%' },
                '用户名'
              ),
              _react2.default.createElement(
                'th',
                { width: '33%' },
                '权限信息'
              ),
              _react2.default.createElement(
                'th',
                { width: '34%' },
                '操作'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.getOrganizeUserBody()
          )
        );
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
            return _react2.default.createElement(
              'li',
              { key: i, onClick: my.choseInviteName.bind(my, item.username) },
              _react2.default.createElement('img', { width: 40, height: 40, src: item.logo || __webpack_require__(223) }),
              _react2.default.createElement(
                'p',
                null,
                item.username
              ),
              _react2.default.createElement(
                'p',
                null,
                item.email
              )
            );
          });
          return body;
        } else {
          return _react2.default.createElement(
            'li',
            null,
            '暂无数据'
          );
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
        return _react2.default.createElement(
          'div',
          { className: 'organize' },
          role == 400 ? "" : _react2.default.createElement(
            'div',
            { className: 'organizeHd' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '邀请新成员',
              titleEnglish: 'INVITE USER',
              titleInfo: '邀请新成员'
            }),
            _react2.default.createElement(
              'div',
              { className: 'inviteUser' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control inviteUserInput',
                ref: 'username',
                onInput: this.getUserListFun.bind(this),
                onBlur: this.inviteInputBlur.bind(this)
              }),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: this.onInviteUser.bind(this) },
                '邀请'
              ),
              _react2.default.createElement(
                'ul',
                { className: this.state.inviteBox ? "inviteShow" : "inviteHide" },
                this.getUserListBody()
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'organizeBd sl-bd TableTextLeft' },
            _react2.default.createElement(_HeadLine2.default, {
              title: '组织成员',
              titleEnglish: 'ORGANIZE USER LIST',
              titleInfo: '组织成员列表'
            }),
            _react2.default.createElement(
              'div',
              { className: 'organizeUserTab' },
              this.getTableDemo()
            )
          ),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '您确定要移除此用户吗?',
            ref: 'confirmModal',
            func: function func() {
              _this4.props.changeUserRole(_this4.state.roleData);
            }
          }),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '您确定要离开此组织吗?',
            ref: 'confirmModalLeave',
            func: function func() {
              _this4.props.leaveOrganize(_this4.state.leaveData);
            }
          }),
          _react2.default.createElement(_Confirm2.default, {
            title: '警告',
            text: '您确定要解散此组织吗?',
            ref: 'confirmModalDelete',
            func: function func() {
              _this4.props.deleteOrganize(_this4.state.orgData);
            }
          })
        );
      }
    }]);
    return GetOrgAdmin;
  }(_react.Component);
  
  GetOrgAdmin.contextTypes = {
    store: _react2.default.PropTypes.object
  };
  GetOrgAdmin.propTypes = {
    organizeUserList: _react2.default.PropTypes.array,
    getOrganizeUserList: _react2.default.PropTypes.func,
    getUserList: _react2.default.PropTypes.func,
    userList: _react2.default.PropTypes.array,
    inviteUser: _react2.default.PropTypes.func,
    changeUserRole: _react2.default.PropTypes.func,
    changeOrganizeOwner: _react2.default.PropTypes.func,
    deleteOrganize: _react2.default.PropTypes.func,
    leaveOrganize: _react2.default.PropTypes.func
  };
  exports.default = GetOrgAdmin;

/***/ },
/* 223 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmIzYTA5MS1mZTUwLTRkOGMtOGQ1NS1kYTcxMDUyYjdkMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Q0OTkxN0E2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Q0OTkxNzk2MUJGMTFFNjgzMDY5NTdCRUNBRDNEOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphOThjNzgzOS1kYWE3LTQ3ZjgtODAzOS1jMzc0ZmIzYmI1ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTZiM2EwOTEtZmU1MC00ZDhjLThkNTUtZGE3MTA1MmI3ZDI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QujMrwAAEShJREFUeNoklwlwW9d1hu/b38PDvpAgQJAgARLcRdGUSEvULtoj2+NFdSUnTpzVcTqx04xqx0mbpO2kiVuntptmJq63xHXqZOptbMmSFduSbUqyJEoiKYukxJ0ECBD79vD2rVcpBjPA4A3uufec/57/O4hpmqV0/B8effTCx59u6qyP9odeeumTNR384blHBpyOyeNnTZIcR0sffHT1W4ObhvcMapJiwclaMpPJVSRNRRHU5rQ7vQ4Uw6UaTyCApdnrawlRqp5b2njjagYA8N+//nY00pktg46QVcccgc59LrcXEbnc8Zd+duTI83fu7fF1ugRO2dzT72moy01N5T+dcfaGUYJ5dfzK9pHub23biaPoeialKEYqkayVeBtDYhimKKqpqHarRdK0hXQhGvQVKrVkoex3EZdWMq9dSu24JfjDxw9fnY+7rZTL7saopgN3fw2vxC9m19MNTqs/4vIG/Y3WoKvBd+HdY34V7/nyqI+xrYpXHefTYa5DUqW15LpY4RDUxFFDR6RSVbNZGYCiMoryGgAIYiXxM7OLODAZhlYUent7c7bInbySvHd+ZaivV+P1pUwi6Eme+uhFVOdz8ZV0uM3vaw70tXSUeP4XTz5tqahbDo5aFGXuwuUC8Ox75MskyybOX+AW1tR4lspxUo4zaiaBAVM3EcS0kDRBIjRBRJvqBlsaw/UNGADrhY10gfvy7sFGAJ5//RyOoSiGRgMh3TBZYOJA1+eXkwDVtar8yceXfvXKyVd/eF9XX++1sfHZU+eGnvm322+7DVHNZGrl8/96JtrThKOYmi83IuhGhccU1QJQXpQMUwMGShKUrmk1iadxgiUJ3WSz1bIOtK+PRE+tZhYT61VJ3BJul2S8UitgdoUb//zqnYe2yaLy5vHxfS3uA9u2TF2crKXWAw8e3H7wXm49IdWKGGNdWV7sbg51bepBGYuVZZ1WhkIMRREFUTPhCTCcwDCSpHNlbmY9meNLmqoF3V5eUVVENCuSNejx+N0UgrtsjumlWXzq4sxXH7vXHWmcPTvT3ujc0xFJrG2oKEojwOv0M4ylqmqMhZVV9fPTn9A3GvA9u1OZtFLlDNUgEFORDRxDdAOKFyEIJFeqMCTZ4mkoCTXT1DYqJStFaSilySLCcQxtX9lI9kXavC4v9rdH7mno6ipXax4L2+WwuRiqwokkhlM4lcrFiXBbpD1qGubrL7z07u9O9fUGM+sJXhKZeq/FabfQsMigVIExYK1NeHBZVVYz+Y1yRZB5WHaWosuCkOE4VeFJigj1dUmiAEsTCTTj7tZIqVjEUSTg82iFWiVfZAN+XRIkgNgr3AdPHDm/d//yF5NHXzv72O3t/YEQ6rBYaLq8lkzmK1WoLHjbaJIgMVXXVU0Puj11bmeFl/LF7MR6AjNxv92FYchCtTB1ebFzT9rh8RQLhfnkGnbn7VsIgpSFmjCzRAiauzvCBv2Spoc6mm0EETQBNznJyNKj33/g7sMHm4f66ttaAUlpiqIgmIwhNENSJMKLoiqrqKEpKpSKhhgGTVlkycARE8Ogbk2X3ZZYq3j8lkA0oiuiZhg4AcMS+NhHl25h7aDOKxqIx+HAVTU3s2jqiD3S1tzVXqzkZ+fmv5iZRmi0nONKhYrLTmmqIfN8rVrDEAoBgKZp1kJGmkOqrH8yPaNpGrw+KGoYnGkYIBpsDPk20sl0LzA1HVCwlqzVfvbYybHPro5++6Az6AckUVpZk/Mc5ferLHl5ZpI1gc1AbR6vq96JaBoVwkmLlU/na/lSY7iJtjskHeqKhMXGCZwrVRauL9dZQqYqybDgQFyppSs8PLxc1VS3CjdhwMzDHOCVVOrK+FxbU9DrdaMGJlf4Klcp6qqZLlokoQ21dsTabQ47zlgFQ5dkmEu+LFXzZrlg0/JCDlM3+HyWL3FQaA4rwtV42dBaeygG6qCkLcxJmAYoDFTFmiIC1BCBYaAIZgAdV8s1imZjPhdAiclr10xSozHKFOW2UNBTH+YkaSG1Id24YUiVEi/UcAMD8gtH52/b4xndGRAFhQRouNUa9Pk9dvZGsjx9w8xw4kpGMDCxO2p74Js9mcVyKS78x0eL1wpqzFlHEaCGoYim4zhGEdTNjpOt5stimeJhreyM1b1eFj6cnJ1JljZyvIaAO/cH77urOdIYQAi/J/LBxfF4vSs8tDNULolOC7mWL7/69vyrxxLTmXyQZrd0s6Kkv300v2cHf3hfIBxETEMF1nBs5Et8Yc7jcpc5DLv/wLZEKtPAss3+BhS1tfR2lg25YqSTXO7SQj7SYh3Y5KUJ8Keja/EVnSaxwc6mgd27OuqRsxdmdIB5bfhSNv+jZy/++uhCkwv93v2h+w74RobqRnfW793m++J6cTXBbW53XpjKrOWLodaWs+fmq6kbg1v7sW8c2kdRVHo9TeMYT2rJYuLtd4/b3Wi2aO2N2h86NLBnODa8uakzavlwbP75E/PrMzNb+1qaWgZwkNN1yWZhjp9dfedk7rZea6QZpPLKK2+tvXAs+c6x+K097Df+uifLi4SAXFutLRWlicuTiysb49NpLrWMHb5jRBTltURW1KRz4+eOnVwM1wHWE6t3UQ9/5ZZ0rvrSq5++/valXC6bylS2trmurqBqcXZk9x4NYR1oNs8by0nOAdRCsbQmeI+Pb3AqCHg8eVE8fqGwvcXS0+1Px7mz1/Mp+ODm62Z3nYtz6NWJ6yJX23/Xrt6RW8PhWCQAbA6XnSEePNi/Fi888fOPf/v+0pmZytgEl82DxfnCoQMuymHkizWcdEEBw2zHImyxmPOF65/+yVfpv6z93cPDpjH28P07H3l6Sq1KdfV0rQbtGliJm0/rPM6HHv4men58Zmjb1q39PXKNJzHE0EG+rG7e1CCIwtQc9/3HHmp3AR2A/3z27zLmzMDQpqMf3hgaaIGgYwIMGBiK45WCWE7JX7q7jZNE6S+BP/t8BiDM3u0DHhcxey2FmoYsy/CXWBRaM+CqNZ+LQUdvHx7Z3itL0okT52ysDScQXQcBv/fUqUs7YA6a6q+XAFxuamIKCMX2WFMkGlZlQOGIoinQkSicNHVsqKO+lEhRGD8UjgzbwJWp1RC+5Ze/+sNTP95LGoZQ1opwCYpsibTCwKKq/en53+Iet4sr8haWcTkZHdUdrN3qtmq6EQwH7QQH8EB/nbUraP/s5Fjklf3tfR3P/fR+vjxblWBUFL4RE1jrbaFO9+p0wd28/J2/GTr/HrjdCc5M5+872BJwa7KNgF5VhgExxOW0w8/uZhds6thQW9Dp80F4mLh81emgOY4PBpzN4XqGtWWyie5I2NfUklwvNPgCkgmOfO/W/haHpOIGwsJeptZWUYyu8AJlpzXOSK0lXW4+ELYAxtg67G0J2SVRxK32bKL259mC1eVscLM3FuJtrcHl5QyumEi1UoVSW1xaGdlxEFp6YnnBzToZCzq9XL409flALOL37knEVx54sK3Fx2zwdk0vmpqAai5NQywkhgKMZMnoraH8SqGSr1mcdGPAouu4JnK4zUk6mhPp6/CgfLF8+sSZaKvf53VVNIB6nc5ildc0w+e08YJEUAxENBPBW4PhehvDS8r1hVk7XrxtS0PQZZWIKGRN3Cj6Gjpo2qKbKuQNj9MmiIpi6t5WT0trwGv30KTdQWnQMQ33LjVXmFrIw8CmJnX0Re6688B7H13ubWTQvk09xUIxXygCAmNZi83mMglHhSupuC0S3RoLNjT5PKipcYrNdA1DrMytX5tOaqlUSlf45sgITtIzN1YXZtKqZGqaCXEAwaAJcDhjlwMPbExOx698dv5mXDA6HNt/xx1vvvT7He30z556BFd1I76caGoM1bncOEb6fHar3Te/EI/FqvZAO2bxwJ1CGWGUy0BQsTRX5/ZxSu6t15+1Opyxvq6ZL64X5oUdo1GH08JVBBhA1wSCwPT60dXxi+b0sSzik7Ry/6buAwfvfvKHTw2GsSP//Jgi6/iZz85CRsRwXJA0nMS4qmS3Mpev5qPRKzEoIV+zKNJAl9VqRuHjqswRCBJrcA5/7ztLefvTv/ydgmFL08VYF+8P2FUrI9UkzCii3tGlqdna+f8N9bY/+9o83M09e3ufeeZFFoCHvjEKELxYKqK5dIWiGRxHaRJnaIuv3ldXb19YzS4tZBOrE4X4NQbwmgAdd0GXKgj0adNs69uvM73//uujm7od//LjBwd27fzFi9PH35jFFZ1mAG4NFEpGZfLjUHfk3ExlidNxxrGeLCQzhaE92xTUCk0dohq6ZXufqWhAN2xum6GbmqFbaIvX7ZpbE9IVZGXli6X5y4QpM7TVRGmAmq2x4XfOJP2Dh4zyxHe+Ntpky/30u92PPbb/hVPlt/44TaMKoN1cOm+lzMW08vLZFDyujTLm1m5+EUUDtYZNqSitjaFut5sXeRUKw0AU3Shm8jiJW20MRRKTE/Ga7klmUovL1ykILMD0uhumV6pPPvFPTz3U+veP37O8kri2lNVqyUfuDb/83MH1ijWfEWGRsY050QT/M5aWYIfG6KADTSzdTPjYhQtnzl3neVkVK2ilVGVIJpvJYChs4bCpKqogwDnFU+dQRfHDk1c1vGlmKT2zNGelGYrAT7x/4ruHO3/0xKPuxpGGxlhba4ygnYVydXePZddIQ65okpBVCvm3J8pzBQli2K1D/dlsZS3//9YEDmyv27Rl0IDUWC3XcAzLpDasrAUBaKksorpEYRBVdZfLms0VT5+asNgbEYsXko+hCk0BNhoJVjWfo64tV1h74913ltdzNGFNF4reAKjzOfJr1Tcvpc/HZRhm347BjfkbWfFmyD09AX79va//4Kcsou7r8sAJDnF57KU8x/OC3WqrVAWCpZ1OplqtwavR0uxfnrvx0Xt/ljUP7o7kaurmDo/LiW4kV9wO/NqS9oPfTFU5sa7JLRtoV2udVBT/8eXpC6mbLtXZ0UnIxUS+TDHYEw/vPX3thCW47+P3/1i7+FpFo+CojZIUo5sGSyA4jthsDgyT/A2W+GqKQSEfSvU+F2bwz/3imbv+6p7O3k6tJoZ8rYGAH5jS+lqunXV9PLaQzacxgOVW8899sFwW4RQKHI2Nm3tDk8tX+u/dva+z5aknvwnt6fTx58wrr7hamz65IuKGoVSLQq4gC4JB4qjTabs+NdcaiznczlopBwEYBbo/4Bdk6eXfvN7d27T9ttGq5njz/TehRFYWEtuHWjfS/BsnL/MAQCXhQW+TzPFl2ULBrd9oiHYX8vKt3U2og07nEuXEtV2x0IUsgHiJbh7saukItEU8Dhuxtr4RagpilJUr5D0eN4ITqqKSBMELIklZBoZbBXHjzyfe27xzp7eh8f23PnXXuVRD83mYvgAerSdiIx1BG41rBrTMdCqBAJlgPXql1FJPV4tFoSy09Awf+f38ic9T4UYPyrgCBCHfMdoFXX/s1BU4dPj8/rX4eqVYJBkGlhknSA3ecw1AlrezVkM1VQx7/F9/cujQ7tWFJZpG+apQlTWmvd2Cs7qqGghgCQxOU3Z3ncPOpHM5UcYEAcRXE32b+/1dO4uZTGv3KBrZPGqYFCQev68Osv6lMxOhQENLNFLOFVEThWhDEagiyoyNLOULLMHghPXi2HmA+Qf37BpfLXVu7mUpM6mBxkhLoM5pofFcVYUznwlAoVhVahWZYs9NTahCOpmKz61kvvKle3u7OtoGD6EWm3v/A487GzrrPe6vfOs+BI7rU9OmgcF/CjyPEdjG+sbAts37Dx4ONwSGRrYObR84/ck5AEo+rxveGLw+0H9LDBIVnFlIknK5WEGHcAMirR6OpvOZAkoQL756+uL5yzB/Fy9etvkaH/35O6zd938CDAB5qvlrJja8DwAAAABJRU5ErkJggg=="

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 225 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 226 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _reselect = __webpack_require__(62);
  
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
/* 227 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setRuntimeVariable = setRuntimeVariable;
  
  var _constants = __webpack_require__(37);
  
  function setRuntimeVariable(_ref) {
    var name = _ref.name;
    var value = _ref.value;
  
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