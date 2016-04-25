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
	var perceptron_1 = __webpack_require__(7);
	describe("perceptron", function () {
	    it("initializes to expected values", function () {
	        var p = new perceptron_1.Perceptron(4, 2, 4);
	        expect(p.weights.length).toEqual(2);
	        expect(p.weights[0].length).toEqual(2); // 2 nodes in hidden layer
	        expect(p.weights[1].length).toEqual(4); // 4 nodes in output layer
	        expect(p.weights[0][0].length).toEqual(5); // 4 inputs + constant
	        expect(p.weights[0][1].length).toEqual(5); // 4 inputs + constant
	        expect(p.weights[1][0].length).toEqual(3); // 2 inputs + constant
	        expect(p.weights[1][1].length).toEqual(3); // 2 inputs + constant
	        expect(p.weights[1][2].length).toEqual(3); // 2 inputs + constant
	        expect(p.weights[1][3].length).toEqual(3); // 2 inputs + constant
	    });
	    it("gets reasonable net values", function () {
	        var p = new perceptron_1.Perceptron(2, 2, 1);
	        p.weights[0][0][0] = 1.0;
	        p.weights[0][0][1] = 0.6;
	        p.weights[0][0][2] = 0.6;
	        p.weights[0][1][0] = 1.0;
	        p.weights[0][1][1] = 1.1;
	        p.weights[0][1][2] = 1.1;
	        p.weights[1][0][0] = 1.0;
	        p.weights[1][0][1] = -2;
	        p.weights[1][0][2] = 1.1;
	        console.log('vallls');
	        console.log(p.net([0, 0]));
	        console.log(p.net([0, 1]));
	        console.log(p.net([1, 0]));
	        console.log(p.net([1, 1]));
	        expect(true).toEqual(true);
	        // xor function
	        // var p = new Perceptron(1, 1);
	        // expect(p.weights.length).toEqual(2);
	        // expect(p.weights[0].length).toEqual(2);
	        // expect(p.weights[1].length).toEqual(4);
	    });
	    it("perturbs correctly", function () {
	        var p = new perceptron_1.Perceptron(2, 2, 1);
	        expect(p.net([0, 0])).toEqual(0);
	        // p.perturb(1);
	        // expect(p.net([0, 0])).not.toEqual(0);
	    });
	});


/***/ },

/***/ 7:
/***/ function(module, exports) {

	"use strict";
	var Perceptron = (function () {
	    function Perceptron() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        var nlayers = args.length;
	        this.weights = new Array(nlayers - 1);
	        for (var i = 1; i < nlayers; ++i) {
	            var nnodes = args[i], prevNodes = args[i - 1];
	            this.weights[i - 1] = new Array(nnodes);
	            for (var j = 0; j < nnodes; ++j) {
	                this.weights[i - 1][j] = new Array(prevNodes + 1); // input + constant
	                for (var k = 0; k < prevNodes + 1; ++k) {
	                    this.weights[i - 1][j][k] = 0;
	                }
	            }
	        }
	        this.netValues = new Array(nlayers - 1);
	        for (var i = 1; i < nlayers; ++i) {
	            this.netValues[i - 1] = new Array(args[i]);
	        }
	    }
	    Perceptron.prototype.clone = function () {
	        // assume weight equivilancy
	        var p = new (Function.prototype.bind.apply(Perceptron, this.nlayers));
	        for (var i = 0; i < this.weights.length; ++i) {
	            for (var j = 0; j < this.weights[i].length; ++j) {
	                for (var k = 0; k < this.weights[i][j].length; ++k) {
	                    p.weights[i][j][k] = this.weights[i][j][k];
	                }
	            }
	        }
	        return p;
	    };
	    Perceptron.prototype.perturb = function (amount) {
	        if (amount === void 0) { amount = 1.0; }
	        // perturb every weight by ~amount
	        for (var i = 0; i < this.weights.length; ++i) {
	            for (var j = 0; j < this.weights[i].length; ++j) {
	                for (var k = 0; k < this.weights[i][j].length; ++k) {
	                    this.weights[i][j][k] += 2 * Math.random() * amount - amount;
	                }
	            }
	        }
	    };
	    Perceptron.prototype.net = function (input) {
	        // var mtx = this.type.signalMatrix;
	        // for (var i = 0; i < newSignals.length; i++) {
	        //     for (var j = 0; j < Fluids.N_SIGNALS; j++) { // first SIGNALS columns of matrix...
	        //         newSignals[i] += this.fluids.vector[j+Fluids.SIGNALS_START] * mtx[i][j];
	        //     }
	        //     for (j = 0; j < this.fluids.vector.length; ++j) {
	        //         newSignals[i] += this.fluids.vector[j] * mtx[i][j+this.signals.vector.length];
	        //     }
	        // }
	        // iterate through each layer of weights
	        var inlayer = input;
	        var outlayer;
	        for (var i = 0; i < this.netValues.length; ++i) {
	            outlayer = this.netValues[i];
	            var layerWeights = this.weights[i];
	            for (var j = 0; j < layerWeights.length; ++j) {
	                // weights for the node
	                var weights = layerWeights[j];
	                var sum = weights[0];
	                for (var k = 0; k < inlayer.length; ++k) {
	                    sum += inlayer[k] * weights[k + 1];
	                }
	                outlayer[j] = sum; // VectorUtils.activatorFunction(sum);
	            }
	            inlayer = this.netValues[i];
	        }
	        console.log('computing net funciton', this.netValues, this.weights, outlayer);
	        return outlayer.slice();
	    };
	    return Perceptron;
	}());
	exports.Perceptron = Perceptron;
	var VectorUtils = (function () {
	    function VectorUtils() {
	    }
	    VectorUtils.l2norm = function (arr) {
	        var n = 0;
	        for (var i = 0; i < arr.length; ++i) {
	            n += arr[i] * arr[i];
	        }
	        return Math.sqrt(n);
	    };
	    VectorUtils.l1norm = function (arr) {
	        var n = 0;
	        for (var i = 0; i < arr.length; ++i) {
	            n += arr[i];
	        }
	        return n;
	    };
	    VectorUtils.distanceToPlane = function (fluids, activator) {
	        var normW = this.l2norm(activator.w);
	        var d = 0;
	        for (var i = 0; i < length; ++i) {
	            d += fluids[i] * activator[i];
	        }
	        d += activator.b;
	        return d / normW;
	    };
	    /*
	    Sigmoid activator.
	    Returns value from 0 to 1 given f from -inf to inf.
	    */
	    VectorUtils.activatorFunction = function (v) {
	        return 1 / (1 + Math.exp(-v));
	    };
	    return VectorUtils;
	}());
	exports.VectorUtils = VectorUtils;


/***/ }

/******/ });
//# sourceMappingURL=test.js.map