/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/NoticePage.tsx"
/*!**********************************!*\
  !*** ./src/admin/NoticePage.tsx ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoticePage)
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Form */ "flarum/common/components/Form");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4__);





class NoticePage extends (flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default()) {
  content() {
    return m("div", {
      className: "zh-Hans ExtensionPage-settings"
    }, m("div", {
      className: "container"
    }, m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "section Notice-Page"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default()), {
      name: "fas fa-info-circle"
    }), " \u63D0\u793A"), m("p", null, "\u4F60\u5DF2\u542F\u7528\u4E2D\u6587\u8BED\u8A00\u5305\uFF0C\u5982\u9700\u4F7F\u4E2D\u6587\u4F5C\u4E3A Flarum \u7684\u9ED8\u8BA4\u8BED\u8A00\uFF0C\u8BF7\u524D\u5F80", m((flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4___default()), {
      href: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().route('basics')
    }, "\u300C\u5E38\u89C4\u300D"), "\u9875\u9762\u8BBE\u7F6E\u3002")), m("div", {
      className: "Form-group"
    }, m("label", null, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default()), {
      name: "fas fa-language"
    }), " \u8D21\u732E"), m("p", null, "\u5982\u679C\u60A8\u5BF9\u7FFB\u8BD1\u6709\u66F4\u597D\u7684\u5EFA\u8BAE\u6216\u7EA0\u9519\uFF0C\u6B22\u8FCE\u5230", m((flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_4___default()), {
      href: "https://weblate.rob006.net/languages/zh_Hans/flarum2/",
      external: true,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "\u7FFB\u8BD1\u5E73\u53F0"), "\u63D0\u4EA4\u60A8\u7684\u5B9D\u8D35\u610F\u89C1\u3002"))), m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "section",
      label: "\u9AD8\u7EA7\u8BBE\u7F6E"
    }, this.buildSettingComponent({
      setting: 'flarum-lang-chinese-simplified.use_google_fonts',
      type: 'boolean',
      label: '优化字体',
      help: '使用语言包随附的 Noto Sans SC 字体切片，在兼顾加载速度的同时，优化非移动设备上的文字展示效果。保存后刷新页面生效。'
    }), m("div", {
      className: "Form-group Form-controls"
    }, this.submitButton()))));
  }
}

/***/ },

/***/ "./src/admin/index.ts"
/*!****************************!*\
  !*** ./src/admin/index.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _NoticePage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NoticePage */ "./src/admin/NoticePage.tsx");





flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('flarum-lang-chinese-simplified', app => {
  // Register extension settings page
  app.registry.for('flarum-lang-chinese-simplified').registerPage(_NoticePage__WEBPACK_IMPORTED_MODULE_4__["default"]);
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__.extend)((flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'infoItems', function (items) {
    items.add('flarum-lang-chinese-simplified-extensions-hub', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2___default().component({
      href: `https://discuss.flarum.org.cn/extensions/${this.extension.name}`,
      icon: 'fas fa-puzzle-piece',
      external: true,
      target: '_blank',
      rel: 'noopener noreferrer'
    }, '扩展中心'), Math.min(0, ...Object.values(items.toObject()).map(item => item.priority)) - 1);
  });
});

/***/ },

/***/ "flarum/admin/app"
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/app')" ***!
  \******************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/app');

/***/ },

/***/ "flarum/admin/components/ExtensionPage"
/*!***************************************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/components/ExtensionPage')" ***!
  \***************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/components/ExtensionPage');

/***/ },

/***/ "flarum/common/components/Form"
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Form')" ***!
  \*******************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Form');

/***/ },

/***/ "flarum/common/components/Icon"
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Icon')" ***!
  \*******************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Icon');

/***/ },

/***/ "flarum/common/components/Link"
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Link')" ***!
  \*******************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Link');

/***/ },

/***/ "flarum/common/components/LinkButton"
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/LinkButton')" ***!
  \*************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/LinkButton');

/***/ },

/***/ "flarum/common/extend"
/*!**********************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extend')" ***!
  \**********************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/extend');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		flarum.reg._webpack_runtimes["flarum-lang-chinese-simplified"] ||= __webpack_require__;// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map