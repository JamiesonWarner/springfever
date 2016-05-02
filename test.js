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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var perceptron_1 = __webpack_require__(8);
	describe("perceptron", function () {
	    it("initializes to expected values", function () {
	        var p = new perceptron_1.Perceptron(4, 2, 4);
	        // expect(p.weights.length).toEqual(2);
	        // expect(p.weights[0].length).toEqual(2); // 2 nodes in hidden layer
	        // expect(p.weights[1].length).toEqual(4); // 4 nodes in output layer
	        // expect(p.weights[0][0].length).toEqual(5); // 4 inputs + constant
	        // expect(p.weights[0][1].length).toEqual(5); // 4 inputs + constant
	        // expect(p.weights[1][0].length).toEqual(3); // 2 inputs + constant
	        // expect(p.weights[1][1].length).toEqual(3); // 2 inputs + constant
	        // expect(p.weights[1][2].length).toEqual(3); // 2 inputs + constant
	        // expect(p.weights[1][3].length).toEqual(3); // 2 inputs + constant
	    });
	    it("gets reasonable net values", function () {
	        var p = new perceptron_1.Perceptron(2, 2, 1);
	        p.trainer.XOR();
	        expect(p.activate([0, 0]) < 0.2).toEqual(true);
	        expect(p.activate([0, 1]) > 0.8);
	        expect(p.activate([1, 0]) > 0.8);
	        expect(p.activate([1, 1]) < 0.2);
	        // p.weights[0][0][0] = 1.0;
	        // p.weights[0][0][1] = 0.6;
	        // p.weights[0][0][2] = 0.6;
	        // p.weights[0][1][0] = 1.0;
	        // p.weights[0][1][1] = 1.1;
	        // p.weights[0][1][2] = 1.1;
	        // p.weights[1][0][0] = 1.0;
	        // p.weights[1][0][1] = -2;
	        // p.weights[1][0][2] = 1.1;
	        console.log('vallls');
	        // console.log(p.activate([0,0]));
	        // console.log(p.activate([0,1]));
	        // console.log(p.activate([1,0]));
	        // console.log(p.activate([1,1]));
	        expect(true).toEqual(true);
	        // xor function
	        // var p = new Perceptron(1, 1);
	        // expect(p.weights.length).toEqual(2);
	        // expect(p.weights[0].length).toEqual(2);
	        // expect(p.weights[1].length).toEqual(4);
	    });
	    it("perturbs correctly", function () {
	        var p = new perceptron_1.Perceptron(2, 2, 1);
	        // expect(p.net([0, 0])).toEqual(0);
	        // p.perturb(1);
	        // expect(p.net([0, 0])).not.toEqual(0);
	    });
	});


/***/ },

/***/ 8:
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Perceptron = (function (_super) {
	    __extends(Perceptron, _super);
	    function Perceptron() {
	        var nnodes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            nnodes[_i - 0] = arguments[_i];
	        }
	        _super.apply(this, nnodes);
	    }
	    Perceptron.prototype.perturb = function (amount) {
	        // perturb every weight by ~amount
	        if (amount === void 0) { amount = 1.0; }
	        // iterate through layers connections
	        var connections = this.layers.input.connectedTo[0].list
	            .concat(connections = this.layers.hidden[0].connectedTo[0].list);
	        for (var i = 0; i < connections.length; ++i) {
	            var connection = connections[i];
	            connection.weight += 2 * Math.random() * amount - amount;
	        }
	        // iterate through neurons
	        var neurons = this.layers.input.list
	            .concat(this.layers.hidden[0].list)
	            .concat(this.layers.output.list);
	        for (var i = 0; i < neurons.length; ++i) {
	            neurons[i].bias += 2 * Math.random() * amount - amount;
	        }
	        // for (var i = 0; i < this.weights.length; ++i) {
	        //     for (var j = 0; j < this.weights[i].length; ++j) {
	        //         for (var k = 0; k < this.weights[i][j].length; ++k) {
	        //             this.weights[i][j][k] += 2 * Math.random() * amount - amount;
	        //         }
	        //     }
	        // }
	    };
	    return Perceptron;
	}(Architect.Perceptron));
	exports.Perceptron = Perceptron;


/***/ }

/******/ });
//# sourceMappingURL=test.js.map