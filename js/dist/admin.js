/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/NoticePage.js":
/*!*********************************!*\
  !*** ./src/admin/NoticePage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoticePage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "C:\\Users\\thats\\AppData\\Local\\Yarn\\Berry\\cache\\@babel-runtime-npm-7.25.6-6725f0979a-10c0.zip\\node_modules\\@babel\\runtime\\helpers\\esm\\inheritsLoose.js");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Switch */ "flarum/common/components/Switch");
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_4__);





var NoticePage = /*#__PURE__*/function (_ExtensionPage) {
  function NoticePage() {
    return _ExtensionPage.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(NoticePage, _ExtensionPage);
  var _proto = NoticePage.prototype;
  _proto.getKey = function getKey(key) {
    return "flarum-lang-chinese-simplified." + key;
  };
  _proto.oninit = function oninit(vnode) {
    _ExtensionPage.prototype.oninit.call(this, vnode);
    this.settings[this.getKey('use_google_fonts')] = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default()(app.data.settings[this.getKey('use_google_fonts')] === '1');
  };
  _proto.content = function content() {
    return m("div", {
      className: "zh-Hans ExtensionPage-settings"
    }, m("div", {
      className: "container Form"
    }, m("div", {
      className: "section Notice-Page"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, m("i", {
      "class": "fas fa-info-circle"
    }), " \u63D0\u793A"), m("p", null, "\u60A8\u5DF2\u5F00\u542F\u4E2D\u6587\u8BED\u8A00\u5305\uFF0C\u5982\u9700\u4F7F\u4E2D\u6587\u4F5C\u4E3A Flarum \u7684\u9ED8\u8BA4\u8BED\u8A00\uFF0C\u8BF7\u524D\u5F80", m((flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_2___default()), {
      href: app.route('basics')
    }, "\u300C\u5E38\u89C4\u300D"), "\u9875\u9762\u8BBE\u7F6E\u3002")), m("div", {
      className: "Form-group"
    }, m("label", null, m("i", {
      "class": "fas fa-language"
    }), " \u8D21\u732E"), m("p", null, "\u5982\u679C\u60A8\u5BF9\u7FFB\u8BD1\u6709\u66F4\u597D\u7684\u5EFA\u8BAE\u6216\u7EA0\u9519\uFF0C\u6B22\u8FCE\u5230 ", m("a", {
      href: "https://weblate.rob006.net/languages/zh_Hans/flarum/",
      target: "_blank"
    }, "\u7FFB\u8BD1\u5E73\u53F0 ", m("i", {
      "class": "fas fa-external-link-alt"
    })), " \u63D0\u4EA4\u60A8\u7684\u5B9D\u8D35\u610F\u89C1\u3002"))), m("hr", null), m("div", {
      className: "section"
    }, m("h3", null, "\u9AD8\u7EA7\u8BBE\u7F6E"), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_4___default()), {
      state: this.settings[this.getKey('use_google_fonts')](),
      onchange: this.settings[this.getKey('use_google_fonts')]
    }, "\u4F18\u5316\u5B57\u4F53"), m("div", {
      className: "helpText"
    }, "\u4F7F\u7528\u8C37\u6B4C Noto Sans SC \u5B57\u4F53\u5207\u7247\uFF0C\u5728\u517C\u987E\u52A0\u8F7D\u901F\u5EA6\u7684\u540C\u65F6\uFF0C\u4F18\u5316", m("b", null, "\u975E\u79FB\u52A8\u8BBE\u5907"), "\u4E0A\u7684\u6587\u5B57\u5C55\u793A\u6548\u679C\u3002")), m("div", {
      className: "Form-group"
    }, this.submitButton()))));
  };
  return NoticePage;
}((flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NoticePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NoticePage */ "./src/admin/NoticePage.js");


flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('flarum-lang/chinese-simplified', function (app) {
  // Register extension settings page
  app.extensionData["for"]('flarum-lang-chinese-simplified').registerPage(_NoticePage__WEBPACK_IMPORTED_MODULE_1__["default"]);
});

/***/ }),

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/admin/components/ExtensionPage":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['admin/components/ExtensionPage']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/ExtensionPage'];

/***/ }),

/***/ "flarum/common/components/Link":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Link']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Link'];

/***/ }),

/***/ "flarum/common/components/Switch":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Switch']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Switch'];

/***/ }),

/***/ "flarum/common/utils/Stream":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/utils/Stream']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/Stream'];

/***/ }),

/***/ "C:\\Users\\thats\\AppData\\Local\\Yarn\\Berry\\cache\\@babel-runtime-npm-7.25.6-6725f0979a-10c0.zip\\node_modules\\@babel\\runtime\\helpers\\esm\\inheritsLoose.js":
/*!************************************************************************************************************************************************************!*\
  !*** C:\Users\thats\AppData\Local\Yarn\Berry\cache\@babel-runtime-npm-7.25.6-6725f0979a-10c0.zip\node_modules\@babel\runtime\helpers\esm\inheritsLoose.js ***!
  \************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "C:\\Users\\thats\\AppData\\Local\\Yarn\\Berry\\cache\\@babel-runtime-npm-7.25.6-6725f0979a-10c0.zip\\node_modules\\@babel\\runtime\\helpers\\esm\\setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "C:\\Users\\thats\\AppData\\Local\\Yarn\\Berry\\cache\\@babel-runtime-npm-7.25.6-6725f0979a-10c0.zip\\node_modules\\@babel\\runtime\\helpers\\esm\\setPrototypeOf.js":
/*!*************************************************************************************************************************************************************!*\
  !*** C:\Users\thats\AppData\Local\Yarn\Berry\cache\@babel-runtime-npm-7.25.6-6725f0979a-10c0.zip\node_modules\@babel\runtime\helpers\esm\setPrototypeOf.js ***!
  \*************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map