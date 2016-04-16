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
	var updateInterval;
	var automata;
	document.addEventListener('DOMContentLoaded', function () {
	    automata = new automata_1.Automata("prototype");
	    window['automata'] = automata;
	    updateInterval = window.setInterval(function () {
	        automata.update();
	        automata.draw();
	    }, 1000);
	    // window.setInterval(function() {
	    // }, 100);
	});
	window['stopSimulation'] = function () {
	    window.clearInterval(updateInterval);
	};
	window['viewStyle'] = function (style) {
	    console.log('viewstyle', style);
	    automata.viewStyle = style;
	    automata.draw();
	};


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
	        this.drawWater = false;
	        var dna = new dna_1.DNA();
	        this.dna = dna;
	        this.plant = dna.getSeed();
	        console.log('foo');
	        this.canvas = document.getElementById("draw");
	        this.canvasCtx = this.canvas.getContext("2d");
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
	                    fluids.vector[0] = 200 * Math.random();
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
	                if (typeof this.grid[gI][gJ] === "undefined") {
	                    // console.log("cell is not taken")
	                    var newFluids = this.splitFluids(this.plant[i]);
	                    var nCell = new cell_1.Cell(gJ, gI, newFluids, action.parameters.type, this.dna);
	                    this.plant.push(nCell);
	                    this.grid[gI][gJ] = nCell;
	                }
	                else if (this.grid[gI][gJ] instanceof dirt_1.Dirt) {
	                    var newFluids = this.grid[gI][gJ].fluids;
	                    var nCell = new cell_1.Cell(gJ, gI, newFluids, action.parameters.type, this.dna);
	                    this.plant.push(nCell);
	                    this.grid[gI][gJ] = nCell;
	                }
	                else {
	                }
	            }
	        }
	        //this.updatePlan();
	        this.fluidUpdate();
	        var waterCount = 0;
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            for (var j = 0; j < Automata.GRID_DIMENSION_X; j++) {
	                if (this.grid[i][j]) {
	                    waterCount += this.grid[i][j].fluids.vector[0];
	                }
	            }
	        }
	        //console.log("Total Water count " + waterCount);
	    };
	    Automata.prototype.splitFluids = function (cell) {
	        var newFluids = new fluids_1.Fluids(0);
	        for (var i = 0; i < cell.fluids.vector.length; i++) {
	            cell.fluids.vector[i] /= 2;
	            newFluids.vector[i] = cell.fluids.vector[i];
	        }
	        return newFluids;
	    };
	    Automata.prototype.fluidUpdate = function () {
	        var dFluids = new Array(Automata.GRID_DIMENSION_Y);
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            dFluids[i] = new Array(Automata.GRID_DIMENSION_X);
	        }
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            for (var j = 0; j < Automata.GRID_DIMENSION_X; j++) {
	                if (typeof this.grid[i][j] === "undefined")
	                    continue;
	                var cur = this.grid[i][j];
	                var neighborA = null;
	                var neighborB = null;
	                if (i < Automata.GRID_DIMENSION_Y - 1)
	                    neighborA = this.grid[i + 1][j];
	                if (j < Automata.GRID_DIMENSION_X - 1)
	                    neighborB = this.grid[i][j + 1];
	                var flowRatio = 0.1;
	                if (neighborA) {
	                    if (neighborA instanceof cell_1.Cell && cur instanceof cell_1.Cell) {
	                        flowRatio = 0.25;
	                    }
	                    if (!dFluids[i][j]) {
	                        dFluids[i][j] = new fluids_1.Fluids(0);
	                    }
	                    if (!dFluids[i + 1][j]) {
	                        dFluids[i + 1][j] = new fluids_1.Fluids(0);
	                    }
	                    var waterDiff = cur.fluids.vector[0] - neighborA.fluids.vector[0];
	                    var waterChange = flowRatio * waterDiff;
	                    dFluids[i][j].vector[0] -= waterChange;
	                    dFluids[i + 1][j].vector[0] += waterChange;
	                }
	                if (neighborB) {
	                    if (neighborB instanceof cell_1.Cell && cur instanceof cell_1.Cell) {
	                        flowRatio = 0.25;
	                    }
	                    if (!dFluids[i][j]) {
	                        dFluids[i][j] = new fluids_1.Fluids(0);
	                    }
	                    if (!dFluids[i][j + 1]) {
	                        dFluids[i][j + 1] = new fluids_1.Fluids(0);
	                    }
	                    var waterDiff = cur.fluids.vector[0] - neighborB.fluids.vector[0];
	                    var waterChange = flowRatio * waterDiff;
	                    dFluids[i][j].vector[0] -= waterChange;
	                    dFluids[i][j + 1].vector[0] += waterChange;
	                }
	            }
	        }
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            for (var j = 0; j < Automata.GRID_DIMENSION_X; j++) {
	                if (dFluids[i][j]) {
	                    //console.log("Change fluid by " + dFluids[i][j][0])
	                    this.applyFluidChange(this.grid[i][j].fluids, dFluids[i][j]);
	                }
	            }
	        }
	    };
	    Automata.prototype.applyFluidChange = function (fluid, dFluid) {
	        for (var i = 0; i < dFluid.vector.length; i++) {
	            fluid.vector[i] += dFluid.vector[i];
	        }
	    };
	    Automata.prototype.draw = function () {
	        var scale = 10;
	        //console.log("draw");
	        this.canvasCtx.fillStyle = "#7EC0DD";
	        this.canvasCtx.fillRect(0, 0, Automata.GRID_DIMENSION_X * scale, scale * Automata.GRID_DIMENSION_Y);
	        this.canvasCtx.fillRect(0, 0, 100, 100);
	        // this.canvasCtx.fillStyle = "#FFF000";
	        // this.canvasCtx.fillRect(70, 70, 10, 10);
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            for (var j = 0; j < Automata.GRID_DIMENSION_X; j++) {
	                var cell = this.grid[i][j];
	                if (typeof cell != "undefined") {
	                    var waterContent = Math.max(Math.min(Math.round(cell.fluids.vector[0]), 255), 0);
	                    if (cell instanceof cell_1.Cell) {
	                        if (this.viewStyle === 'water') {
	                            var colorString = "#" + "0064";
	                            if (waterContent < 16) {
	                                colorString += "0" + waterContent.toString(16);
	                            }
	                            else {
	                                colorString += waterContent.toString(16);
	                            }
	                            this.canvasCtx.fillStyle = colorString;
	                        }
	                        else {
	                            this.canvasCtx.fillStyle = cell.dna.cellTypes[cell.type].color;
	                        }
	                        this.canvasCtx.fillRect(Math.floor(scale * j), Math.floor(scale * i), scale, scale);
	                    }
	                    else if (cell instanceof dirt_1.Dirt) {
	                        var colorString = "#" + "6400";
	                        if (waterContent < 16) {
	                            colorString += "0" + waterContent.toString(16);
	                        }
	                        else {
	                            colorString += waterContent.toString(16);
	                        }
	                        this.canvasCtx.fillStyle = colorString;
	                        this.canvasCtx.fillRect(scale * j, scale * i, scale, scale);
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
	        /*
	        (N_SIGNALS) x (N_SIGNALS+N_FLUIDS)
	        */
	        this.signalMatrix = [
	            [],
	            [0, 1],
	            [0, 0, 0, 0, 0, 0],
	            [0, 0, 0, 0, 0, 0],
	        ];
	        this.signalB = [-0.25, -0.25, -0.25, -0.25];
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
	                            b: 2
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
	    DNA.prototype.l1norm = function (arr) {
	        var n = 0;
	        for (var i = 0; i < arr.length; ++i) {
	            n += arr[i];
	        }
	        return n;
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
	        var norm = this.l1norm(weights);
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
	        // console.log('activators', activators, 'actions', actions);
	        return this.weightedChoose(actions, activators);
	    };
	    return DNA;
	}());
	exports.DNA = DNA;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var signals_1 = __webpack_require__(7);
	var Cell = (function () {
	    function Cell(x, y, fluids, type, dna) {
	        this.x = x;
	        this.y = y;
	        this.fluids = fluids;
	        this.type = type;
	        this.dna = dna;
	        this.signals = new signals_1.Signals();
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
	var N_FLUIDS = 4;
	var Fluids = (function () {
	    function Fluids(water) {
	        if (water === void 0) { water = 100; }
	        this.vector = new Array(N_FLUIDS);
	        this.vector[0] = water;
	        //this.vector[1] = 100;
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var N_SIGNALS = 4;
	var Signals = (function () {
	    function Signals() {
	        this.vector = new Array(N_SIGNALS);
	        for (var i = 0; i < N_SIGNALS; ++i) {
	            this.vector[i] = 0;
	        }
	    }
	    return Signals;
	}());
	exports.Signals = Signals;


/***/ }
/******/ ]);