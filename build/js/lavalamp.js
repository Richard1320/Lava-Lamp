/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lavalamp.class.ts":
/*!*******************************!*\
  !*** ./src/lavalamp.class.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Lava Lamp
 * http://lavalamp.magicmediamuse.com/
 *
 * Author
 * Richard Hung
 * http://www.magicmediamuse.com/
 *
 * Version
 * 2.0.0
 *
 * Copyright (c) 2021 Richard Hung.
 *
 * License
 * Lava Lamp by Richard Hung is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License.
 * http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Lavalamp = /** @class */ (function () {
    /**
     * Initialize lavalamp plugin on DOM.
     * Assign values to plugin variables.
     * Create lavalamp object div element and bind all applicable event listeners.
     *
     * @param wrapper HTML element of the direct parent wrapper
     * @param customSettings
     */
    function Lavalamp(wrapper, customSettings) {
        var _this = this;
        var defaultSettings = {
            easing: 'ease',
            duration: 700,
            margins: false,
            setOnClick: false,
            initActiveQuery: '.active',
            enableHover: true,
            delayOn: 0,
            delayOff: 0,
            enableFocus: false,
            deepFocus: false,
        };
        this.settings = __assign(__assign({}, defaultSettings), customSettings);
        // Initialize classes and declare properties
        this.wrapper = wrapper;
        this.wrapper.classList.add("lavalamp");
        for (var i = 0; i < this.wrapper.children.length; i++) {
            this.wrapper.children[i].classList.add("lavalamp__item");
        }
        this.children = wrapper.querySelectorAll(".lavalamp__item");
        this.activeElement = wrapper.querySelector(this.settings.initActiveQuery);
        // Create lavalamp object
        this.lavalampObject = document.createElement('div');
        this.lavalampObject.classList.add("lavalamp__object");
        this.lavalampObject.style.transitionDuration = this.settings.duration / 1000 + "s";
        this.wrapper.prepend(this.lavalampObject);
        // Bind hover events
        if (this.settings.enableHover) {
            this.children.forEach(function (element) {
                element.addEventListener("mouseenter", _this.mouseEnter.bind(_this));
                element.addEventListener("mouseleave", _this.mouseLeave.bind(_this));
            });
        }
        // Bind focus events
        if (this.settings.deepFocus) {
            this.wrapper.querySelectorAll("*").forEach(function (element) {
                element.addEventListener("focusin", _this.focusIn.bind(_this));
                element.addEventListener("focusout", _this.focusOut.bind(_this));
            });
        }
        else if (this.settings.enableFocus) {
            this.children.forEach(function (element) {
                element.addEventListener("focusin", _this.focusIn.bind(_this));
                element.addEventListener("focusout", _this.focusOut.bind(_this));
            });
        }
        // Bind set on click event
        if (this.settings.setOnClick) {
            this.children.forEach(function (element) {
                element.addEventListener("mousedown", _this.setOnClick.bind(_this));
            });
        }
        // Initial reposition of lavalamp element
        window.addEventListener('DOMContentLoaded', function () {
            _this.reposition(_this.activeElement);
        });
    }
    /**
     * Event that gets triggered on mousedown when `setOnClick` option is true
     */
    Lavalamp.prototype.setOnClick = function (e) {
        this.activeElement = e.target;
        this.reposition(e.target);
    };
    /**
     * Event that gets triggered on mouseenter when `enableHover` option is true
     */
    Lavalamp.prototype.mouseEnter = function (e) {
        var _this = this;
        this.isHovered = true;
        setTimeout(function () {
            // If element is still being hovered and is not focused
            if (_this.isHovered && !_this.isFocused) {
                _this.reposition(e.target);
            }
        }, this.settings.delayOn);
    };
    /**
     * Event that gets triggered on mouseLeave when `enableHover` option is true
     */
    Lavalamp.prototype.mouseLeave = function () {
        var _this = this;
        this.isHovered = false;
        setTimeout(function () {
            // If element is not being hovered and is not focused
            if (!_this.isHovered && !_this.isFocused) {
                _this.reposition(_this.activeElement);
            }
        }, this.settings.delayOff);
    };
    /**
     * Event that gets triggered on focusIn when `enableFocus` or `deepFocus` option is true
     */
    Lavalamp.prototype.focusIn = function (e) {
        var _this = this;
        this.isFocused = true;
        var lavalampItem = e.target;
        // If deep focus, get closest lavalamp item
        if (!lavalampItem.classList.contains("lavalamp__item")) {
            lavalampItem = lavalampItem.closest(".lavalamp__item");
        }
        setTimeout(function () {
            _this.reposition(lavalampItem);
        }, this.settings.delayOn);
    };
    /**
     * Event that gets triggered on focusOut when `enableFocus` or `deepFocus` option is true
     */
    Lavalamp.prototype.focusOut = function () {
        var _this = this;
        this.isFocused = false;
        setTimeout(function () {
            _this.reposition(_this.activeElement);
        }, this.settings.delayOff);
    };
    /**
     * Main function that calculates width / height as well as the top / left position of current active element.
     * Also sets the lavalamp object to specified size and position.
     *
     * @param target HTML element that the lavalamp object should reposition to
     */
    Lavalamp.prototype.reposition = function (target) {
        var _this = this;
        var style = window.getComputedStyle(target);
        var marginTop = parseFloat(style.marginLeft) || 0;
        var marginLeft = parseFloat(style.marginLeft) || 0;
        var marginRight = parseFloat(style.marginRight) || 0;
        var marginBottom = parseFloat(style.marginBottom) || 0;
        var width = target.offsetWidth;
        var height = target.offsetHeight;
        var offsetTop = target.offsetTop;
        var offsetLeft = target.offsetLeft;
        // Add margins to calculations
        if (this.settings.margins) {
            offsetLeft = offsetLeft - marginLeft;
            offsetTop = offsetTop - marginTop;
            width = width + marginLeft + marginRight;
            height = height + marginTop + marginBottom;
        }
        this.isAnimating = true;
        this.lavalampObject.style.width = width + "px";
        this.lavalampObject.style.height = height + "px";
        this.lavalampObject.style.transform = "translate(" + offsetLeft + "px," + offsetTop + "px)";
        setTimeout(function () {
            _this.isAnimating = false;
        }, this.settings.duration);
    };
    return Lavalamp;
}());
// @ts-ignore
window.Lavalamp = Lavalamp;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/lavalamp.class.ts");
/******/ })()
;
//# sourceMappingURL=lavalamp.js.map