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
	                var cost = this.dna.cellTypes[action.parameters.type].cost;
	                if (cost.vector.length != 4)
	                    console.log("dafuq");
	                var canAfford = true;
	                for (var i = 0; i < cost.vector.length; i++) {
	                    if (!this.plant[i].fluids.vector[i] >= cost.vector[i]) {
	                        canAfford = false;
	                        break;
	                    }
	                }
	                /*
	                if (!canAfford)
	                    continue;

	                this.subtractFluids(this.plant[i].fluids, cost);

	                */
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
	        this.signalsUpdate();
	    };
	    Automata.prototype.subtractFluids = function (a, b) {
	        for (var i = 0; i < a.vector.length; i++) {
	            a.vector[i] -= b.vector[i];
	        }
	    };
	    Automata.prototype.splitFluids = function (cell) {
	        var newFluids = new fluids_1.Fluids(0);
	        for (var i = 0; i < cell.fluids.vector.length; i++) {
	            cell.fluids.vector[i] /= 2;
	            newFluids.vector[i] = cell.fluids.vector[i];
	        }
	        return newFluids;
	    };
	    Automata.prototype.signalsUpdate = function () {
	        // Update each cell's individual signal levels
	        for (var i = 0; i < this.plant.length; ++i) {
	            var cell = this.plant[i];
	            cell.updateSignals();
	        }
	        // Send signals to neighbors
	        // let SPREAD_COEFF = 0.1;
	        // for (var i = 0; i < this.plant.length; i++) {
	        //     var cell = this.plant[i];
	        //     var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
	        //     for (var i = 0; i < neighbs.length; ++i) {
	        //         var dx = cell.x + neighbs[i][0];
	        //         var dy = cell.x + neighbs[i][1];
	        //         if (dx < 0 || dy < 0 || dx >= Automata.GRID_DIMENSION_X || dy >= Automata.GRID_DIMENSION_Y)
	        //             continue;
	        //         var neighb = this.grid[dy][dx];
	        //         if (neighb instanceof Cell) {
	        //             var nsignals = neighb.signals.vector;
	        //             for (var i = 0; i < nsignals.length; ++i) {
	        //                 nsignals += SPREAD_COEFF * cell.signals.vector[i];
	        //             }
	        //         }
	        //     }
	        // }
	    };
	    Automata.prototype.fluidUpdate = function () {
	        var dFluids = new Array(Automata.GRID_DIMENSION_Y);
	        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i++) {
	            dFluids[i] = new Array(Automata.GRID_DIMENSION_X);
	        }
	        for (var i = 0; i < this.plant.length; i++) {
	            var cell = this.plant[i];
	            if (cell.type === "l") {
	                var numAir = this.countAirNeighbors(cell.y, cell.x);
	                dFluids[cell.y][cell.x] = new fluids_1.Fluids(0);
	                var dGlucose = Math.min(cell.fluids.vector[fluids_1.Fluids.WATER], 50 * numAir);
	                dFluids[cell.y][cell.x].vector[fluids_1.Fluids.WATER] = -dGlucose;
	                dFluids[cell.y][cell.x].vector[fluids_1.Fluids.GLUCOSE] = dGlucose;
	            }
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
	                        flowRatio = 1;
	                    }
	                    if (!dFluids[i][j]) {
	                        dFluids[i][j] = new fluids_1.Fluids(0);
	                    }
	                    if (!dFluids[i + 1][j]) {
	                        dFluids[i + 1][j] = new fluids_1.Fluids(0);
	                    }
	                    var waterDiff = cur.fluids.vector[0] - neighborA.fluids.vector[0];
	                    var waterChange = Math.max(Math.min(flowRatio * waterDiff, cur.fluids.vector[fluids_1.Fluids.WATER] +
	                        dFluids[i][j].vector[fluids_1.Fluids.WATER]), -(neighborA.fluids.vector[fluids_1.Fluids.WATER] + dFluids[i + 1][j].vector[fluids_1.Fluids.WATER]));
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
	                    var waterChange = Math.max(Math.min(flowRatio * waterDiff, cur.fluids.vector[fluids_1.Fluids.WATER] +
	                        dFluids[i][j].vector[fluids_1.Fluids.WATER]), -(neighborB.fluids.vector[fluids_1.Fluids.WATER] + dFluids[i][j + 1].vector[fluids_1.Fluids.WATER]));
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
	    Automata.prototype.countAirNeighbors = function (i, j) {
	        var count = 0;
	        if (i < Automata.GRID_DIMENSION_Y - 1 && !this.grid[i + 1][j]) {
	            count++;
	        }
	        if (i > 0 && !this.grid[i - 1][j]) {
	            count++;
	        }
	        if (j < Automata.GRID_DIMENSION_X - 1 && !this.grid[i][j + 1]) {
	            count++;
	        }
	        if (j > 0 && !this.grid[i + 1][j - 1]) {
	            count++;
	        }
	        return count;
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
	                            var colorString = "#" + "0064" + this.getColorHex(waterContent);
	                            this.canvasCtx.fillStyle = colorString;
	                        }
	                        else if (this.viewStyle === 'glucose') {
	                            var colorString = "#" + this.getColorHex(Math.min(255, Math.ceil(cell.fluids.vector[fluids_1.Fluids.GLUCOSE]))) + "0000";
	                            this.canvasCtx.fillStyle = colorString;
	                        }
	                        else if (this.viewStyle === 'auxin') {
	                            var colorString = "#" + "0000" + this.getColorHex(Math.min(255, Math.ceil(cell.signals.vector[0])));
	                        }
	                        else {
	                            this.canvasCtx.fillStyle = cell.dna.cellTypes[cell.type].color;
	                        }
	                        this.canvasCtx.fillRect(Math.floor(scale * j), Math.floor(scale * i), scale, scale);
	                    }
	                    else if (cell instanceof dirt_1.Dirt) {
	                        var colorString = "#" + "6400" + this.getColorHex(waterContent);
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
	    Automata.prototype.getColorHex = function (byte) {
	        var colorString = "";
	        if (byte < 16) {
	            colorString += "0" + byte.toString(16);
	        }
	        else {
	            colorString += byte.toString(16);
	        }
	        return colorString;
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
	                cost: new fluids_1.Fluids(0, 50),
	                /*
	                (N_SIGNALS) x (N_SIGNALS+N_FLUIDS)
	                */
	                signalMatrix: [
	                    [0, 0, 0.2, 0.2],
	                    [0, 0, 1, 1, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                ],
	                signalB: [-0.3, -0.5, 0.05, -0.05],
	                signalInit: [0, 0, 0, 1],
	                color: "#ededbe",
	                actions: [
	                    {
	                        name: 'demote',
	                        activator: {
	                            w: [0, 10, 0, 0],
	                            b: 0
	                        }
	                    },
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
	                cost: new fluids_1.Fluids(0, 20),
	                signalMatrix: [
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                ],
	                signalB: [-0.05, -0.5, -0.05, -0.05],
	                signalInit: [0, 0, 0, 0],
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
	                cost: new fluids_1.Fluids(0, 40),
	                signalMatrix: [
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                ],
	                signalB: [-0.05, -0.5, -0.05, -0.05],
	                signalInit: [0, 0, 0, 0],
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
	                cost: new fluids_1.Fluids(0, 20),
	                signalMatrix: [
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                ],
	                signalB: [-0.05, -0.5, -0.05, -0.05],
	                signalInit: [0, 0, 0, 0],
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
	                cost: new fluids_1.Fluids(0, 80),
	                signalMatrix: [
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                    [0, 0, 0, 0, 0, 0],
	                ],
	                signalB: [-0.05, -0.5, -0.05, -0.05],
	                signalInit: [0, 0, 0, 0],
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
	        this.signals = new signals_1.Signals(dna.cellTypes[type].signalInit);
	    }
	    Cell.prototype.updateSignals = function () {
	        // multiply by matrix
	        var newSignals = new Array(this.signals.vector.length);
	        var mtx = this.dna.cellTypes[this.type].signalMatrix;
	        for (var i = 0; i < newSignals.length; i++) {
	            for (var j = 0; j < this.signals.vector.length; j++) {
	                newSignals[i] += this.signals.vector[j] * mtx[i][j];
	            }
	            for (j = 0; j < this.fluids.vector.length; ++j) {
	                newSignals[j] += this.fluids.vector[j] * mtx[i][j + this.signals.vector.length];
	            }
	        }
	        var vec = this.dna.cellTypes[this.type].signalB;
	        for (var i = 0; i < vec.length; i++) {
	            newSignals[i] += vec[i];
	        }
	        for (var i = 0; i < newSignals.length; i++) {
	            this.signals.vector[i] = newSignals[i];
	        }
	    };
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
	    function Fluids(water, glucose) {
	        if (water === void 0) { water = 100; }
	        if (glucose === void 0) { glucose = 0; }
	        this.vector = new Array(N_FLUIDS);
	        this.vector[Fluids.WATER] = water;
	        this.vector[Fluids.GLUCOSE] = glucose;
	    }
	    Fluids.WATER = 0;
	    Fluids.GLUCOSE = 1;
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
	    function Signals(start) {
	        this.vector = new Array(N_SIGNALS);
	        if (start) {
	            for (var i = 0; i < N_SIGNALS; i++) {
	                this.vector[i] = start[i];
	            }
	        }
	        else {
	            for (var i = 0; i < N_SIGNALS; i++) {
	                this.vector[i] = 0;
	            }
	        }
	    }
	    return Signals;
	}());
	exports.Signals = Signals;


/***/ }
/******/ ]);