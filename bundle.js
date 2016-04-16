/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	console.log('HELLO WORLD!');
	var automata_1 = __webpack_require__(1);
	var automata = new automata_1.Automata();
	window.setInterval(function () {
	    automata.update();
	}, 1000);
	window.setInterval(function () {
	    automata.draw();
	}, 100);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Automata = (function () {
	    function Automata() {
	        console.log('foo');
	        var GRID_DIMENSION = 100;
	        this.canvas = document.getElementById("draw");
	        this.grid = new Array(GRID_DIMENSION);
	        for (var i = 0; i < GRID_DIMENSION; i++) {
	            this.grid[i] = new Array(GRID_DIMENSION);
	        }
	        //var plant = new
	    }
	    Automata.prototype.update = function () {
	    };
	    Automata.prototype.draw = function () {
	    };
	    return Automata;
	}());
	exports.Automata = Automata;


/***/ }
/******/ ]);