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
	document.addEventListener('DOMContentLoaded', function () {
	    var automata = new automata_1.Automata("prototype");
	    window['automata'] = automata;
	    window.setInterval(function () {
	        automata.update();
	        automata.draw();
	    }, 1000);
	    // window.setInterval(function() {
	    // }, 100);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dna_1 = __webpack_require__(2);
	var cell_1 = __webpack_require__(3);
	// import {CellType} from "./celltypes"
	var dirt_1 = __webpack_require__(6);
	var fluids_1 = __webpack_require__(4);
	var Automata = (function () {
	    function Automata(runString) {
	        var dna = new dna_1.DNA();
	        this.dna = dna;
	        this.plant = dna.getSeed();
	        console.log('foo');
	        this.canvas = document.getElementById("draw");
	        this.canvasCtx = this.canvas.getContext("2d");
	        // this.canvasCtx.
	        // Make rectangles for every cell type in dna to make drawing fast
	        var cellTypes = Object.keys(dna.cellTypes);
	        this.cellRectangles = {};
	        for (var i = 0; i < cellTypes.length; ++i) {
	            var ct = cellTypes[i];
	            var color = dna.cellTypes[ct].color;
	            var ctx = this.canvasCtx;
	            if (!color)
	                console.error('Color is not defined for cell type ' + ct);
	            ctx.fillStyle = color;
	            ctx.fillRect(0, 0, 10, 10);
	            this.cellRectangles[ct] = ctx.getImageData(4, 4, Automata.CELL_SCALE, Automata.CELL_SCALE);
	            ctx.clearRect(0, 0, 10, 10);
	        }
	        this.grid = new Array(Automata.GRID_DIMENSION_X);
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            this.grid[i] = new Array(Automata.GRID_DIMENSION_X);
	        }
	        for (var i = 0; i < this.plant.length; i++) {
	            this.grid[this.plant[i].y][this.plant[i].x] = this.plant[i];
	        }
	        for (var i = 50; i < Automata.GRID_DIMENSION_Y; i++) {
	            for (var j = 0; j < Automata.GRID_DIMENSION_X; j++) {
	                if (typeof this.grid[i][j] === "undefined") {
	                    var fluids = new fluids_1.Fluids();
	                    fluids.vector[0] = 200;
	                    this.grid[i][j] = new dirt_1.Dirt(fluids);
	                }
	            }
	        }
	    }
	    Automata.prototype.update = function () {
	        //console.log("tick");
	        // Calc actions on this frame
	        var actions = new Array(this.plant.length);
	        for (var i = 0; i < this.plant.length; i++) {
	            var cell = this.plant[i];
	            cell.update();
	            actions[i] = cell.getAction();
	        }
	        // Apply actions on this frame
	        for (var i = 0; i < actions.length; i++) {
	            if (!actions[i])
	                continue;
	            var action = actions[i];
	            if (action.name === "grow") {
	                var dx = 0;
	                var dy = 0;
	                if (action.parameters.direction === "up") {
	                    dy = -1;
	                }
	                else if (action.parameters.direction === "down") {
	                    dy = 1;
	                }
	                else if (action.parameters.direction === "right") {
	                    dx = 1;
	                }
	                else if (action.parameters.direction === "left") {
	                    dx = -1;
	                }
	                var gI = this.plant[i].y + dy;
	                var gJ = this.plant[i].x + dx;
	                if (gI < 0 || gI >= Automata.GRID_DIMENSION_Y || gJ < 0 || gJ >= Automata.GRID_DIMENSION_X) {
	                    // console.log("cannot make cell at " + gJ + ", " + gI);
	                    continue;
	                }
	                if (typeof this.grid[gI][gJ] === "undefined" || this.grid[gI][gJ] instanceof dirt_1.Dirt) {
	                    // console.log("cell is not taken")
	                    var nCell = new cell_1.Cell(gJ, gI, null, action.parameters.type, this.dna);
	                    this.plant.push(nCell);
	                    this.grid[gI][gJ] = nCell;
	                }
	                else {
	                }
	            }
	        }
	        //this.updatePlan();
	    };
	    Automata.prototype.fluidUpdate = function () {
	        var dFluids = new Array(Automata.GRID_DIMENSION_Y);
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            dFluids[i] = new Array(Automata.GRID_DIMENSION_X);
	        }
	    };
	    Automata.prototype.draw = function () {
	        var scale = 1;
	        //console.log("draw");
	        this.canvasCtx.fillStyle = "#715DF9";
	        this.canvasCtx.fillRect(0, 0, Automata.GRID_DIMENSION_X * scale, scale * Automata.GRID_DIMENSION_Y);
	        this.canvasCtx.fillRect(0, 0, 100, 100);
	        // this.canvasCtx.fillStyle = "#FFF000";
	        // this.canvasCtx.fillRect(70, 70, 10, 10);
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            for (var j = 0; j < Automata.GRID_DIMENSION_X; j++) {
	                var cell = this.grid[i][j];
	                if (typeof cell != "undefined") {
	                    if (cell instanceof cell_1.Cell) {
	                        //console.log("Drawing plant cell");
	                        this.canvasCtx.fillStyle = cell.dna.cellTypes[cell.type].color;
	                        // this.canvasCtx.fillRect(scale * (j), scale * (i), scale, scale);
	                        this.canvasCtx.putImageData(this.cellRectangles[cell.type], scale * j, scale * i);
	                    }
	                    else if (cell instanceof dirt_1.Dirt) {
	                        this.canvasCtx.fillStyle = "#A87F0F";
	                        this.canvasCtx.fillRect(scale * (j), scale * (i), scale, scale);
	                    }
	                }
	            }
	        }
	        /*
	        this.canvasCtx.fillStyle = "#00FF00";
	        for (var i = 0; i < Automata.GRID_DIMENSION_X; i ++){
	            this.canvasCtx.fillRect(scale * i, scale * (Automata.GRID_DIMENSION_Y-1), scale, scale);
	        }*/
	    };
	    Automata.GRID_DIMENSION_X = 100;
	    Automata.GRID_DIMENSION_Y = 100;
	    Automata.CELL_SCALE = 2;
	    return Automata;
	}());
	exports.Automata = Automata;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(4);
	var DNA = (function () {
	    function DNA() {
	        this.cellTypes = {
	            'a1': {
	                color: "#ededbe",
	                actions: [
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'up',
	                            type: 'a1'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'a1'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: -20
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'a2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'left',
	                            type: 'a2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'a2': {
	                color: "#8F8F6E",
	                actions: [
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'a2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'left',
	                            type: 'a2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'b1': {
	                color: "#6E6E8F",
	                actions: [
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'down',
	                            type: 'b1'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'b1'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'b2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'left',
	                            type: 'b2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'b2': {
	                color: "#8F6E7F",
	                actions: [
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'b2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'left',
	                            type: 'b2'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'l': {
	                color: "#80C4A1",
	                actions: [
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'l'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'left',
	                            type: 'l'
	                        },
	                        activator: {
	                            w: [2, 2],
	                            b: 2
	                        }
	                    }
	                ]
	            }
	        };
	        window['dna'] = this;
	    }
	    DNA.prototype.getSeed = function () {
	        var seed = [];
	        seed.push(new cell_1.Cell(50, 50, new fluids_1.Fluids(), 'a1', this));
	        seed.push(new cell_1.Cell(50, 51, new fluids_1.Fluids(), 'b1', this));
	        return seed;
	    };
	    DNA.prototype.l2norm = function (arr) {
	        var n = 0;
	        for (var i = 0; i < arr.length; ++i) {
	            n += arr[i] * arr[i];
	        }
	        return Math.sqrt(n);
	    };
	    DNA.prototype.distanceToActivator = function (fluids, activator) {
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
	    DNA.prototype.activatorFunction = function (v) {
	        return 1 / (1 + Math.exp(-v));
	    };
	    DNA.prototype.weightedChoose = function (values, weights) {
	        var norm = this.l2norm(weights);
	        var rand = Math.random();
	        var prob = 0;
	        for (var i = 0; i < values.length; ++i) {
	            var w = weights[i] / norm;
	            prob += w;
	            if (rand <= prob) {
	                return values[i];
	            }
	        }
	    };
	    DNA.prototype.chooseAction = function (fluids, cellType) {
	        var actions = this.cellTypes[cellType].actions;
	        var activators = new Array(actions.length);
	        for (var i = 0; i < activators.length; ++i) {
	            activators[i] = this.activatorFunction(this.distanceToActivator(fluids, actions[i].activator));
	        }
	        return this.weightedChoose(actions, activators);
	    };
	    return DNA;
	}());
	exports.DNA = DNA;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Cell = (function () {
	    function Cell(x, y, fluids, type, dna) {
	        this.x = x;
	        this.y = y;
	        this.fluids = fluids;
	        this.type = type;
	        this.dna = dna;
	    }
	    Cell.prototype.update = function () {
	    };
	    /*
	    returns -
	        {
	            type: 'grow'
	            parameters: {
	                'up', 'right', 'down', 'left'
	            }
	        }

	    */
	    Cell.prototype.getAction = function () {
	        // if (Math.random() > 0.5) {
	        //     return {
	        //         name: 'grow',
	        //         parameters: {
	        //             direction: 'up',
	        //             type: 'a1'
	        //         }
	        //     }
	        // }
	        // else if (Math.random() > 0.5) {
	        //     return {
	        //         name: 'grow',
	        //         parameters: {
	        //             direction: 'right',
	        //             type: 'a2'
	        //         }
	        //     }
	        // }
	        // return {
	        //     name: 'grow',
	        //     parameters: {
	        //         direction: 'left',
	        //         type: 'a2'
	        //     }
	        // }
	        return this.dna.chooseAction(this.fluids, this.type);
	    };
	    return Cell;
	}());
	exports.Cell = Cell;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var N_FLUIDS = 2;
	var Fluids = (function () {
	    function Fluids(water) {
	        if (water === void 0) { water = 100; }
	        this.vector = new Array(N_FLUIDS);
	        for (var i = 0; i < N_FLUIDS; ++i) {
	            this.vector[i] = water;
	        }
	    }
	    return Fluids;
	}());
	exports.Fluids = Fluids;


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var Dirt = (function () {
	    function Dirt(fluids) {
	        this.fluids = fluids;
	    }
	    return Dirt;
	}());
	exports.Dirt = Dirt;


/***/ }
/******/ ]);