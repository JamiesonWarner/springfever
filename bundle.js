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
	var simulation_1 = __webpack_require__(8);
	var angle_1 = __webpack_require__(7);
	document.addEventListener("DOMContentLoaded", function (event) {
	    var drawCanvas = document.getElementById("draw");
	    var sim = new simulation_1.Simulation(drawCanvas);
	    window['toggleSimulation'] = sim.toggleSimulation.bind(sim);
	    window['resetSimulation'] = sim.resetSimulation.bind(sim);
	    window['toggleDraw'] = sim.toggleDraw.bind(sim);
	    window['viewStyle'] = sim.viewStyle.bind(sim);
	    // DEBUG //
	    window['automata'] = sim.automata;
	    window['Angle'] = angle_1.Angle;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dna_1 = __webpack_require__(2);
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(5);
	var Automata = (function () {
	    function Automata(runString, drawCanvas) {
	        this.drawWater = false;
	        var dna = new dna_1.DNA();
	        this.dna = dna;
	        this.canvas = drawCanvas;
	        this.canvas.setAttribute('width', Automata.GRID_N_COLUMNS * Automata.CELL_SCALE_PIXELS);
	        this.canvas.setAttribute('height', Automata.GRID_N_ROWS * Automata.CELL_SCALE_PIXELS);
	        this.canvasCtx = this.canvas.getContext("2d");
	        this.grid = new Array(Automata.GRID_N_ROWS);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            this.grid[row] = new Array(Automata.GRID_N_COLUMNS);
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                var water = this.isAirCell(row, col) ? 100 * Math.random() : 500 * Math.random();
	                this.grid[row][col] = new fluids_1.Fluids(water, 0);
	            }
	        }
	        this.plant = dna.plantSeed(this.grid);
	        var self = this;
	        drawCanvas.addEventListener("mousemove", function (event) {
	            self.showInfo(event.offsetX, event.offsetY);
	        });
	    }
	    Automata.prototype.printGridFluids = function () {
	        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                console.log(this.grid[row][col].vector || this.grid[row][col].fluids.vector);
	            }
	        }
	    };
	    Automata.prototype.validateGridFluids = function () {
	        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                var f = this.grid[row][col].vector || this.grid[row][col].fluids.vector;
	                for (var k = 0; k < f.length; ++k) {
	                    if (typeof f[k] !== 'number' || isNaN(f[k])) {
	                        throw new Error('Error: Invalid fluid vector at: ' + row + ', ' + col);
	                    }
	                    if (f[k] < 0) {
	                        console.log('Warning: Negative fluids at: ', row, col);
	                        return;
	                    }
	                }
	            }
	        }
	    };
	    Automata.prototype.showInfo = function (x, y) {
	        var tx = x / 10;
	        var ty = y / 10;
	        var obj = this.grid[Math.floor(ty)][Math.floor(tx)];
	        if (obj instanceof cell_1.Cell) {
	            document.getElementById('bar-water').style.width = obj.fluids.vector[0] + 'px';
	            document.getElementById('bar-glucose').style.width = obj.fluids.vector[1] + 'px';
	            document.getElementById('bar-auxin').style.width = (40 * obj.signals.vector[0]) + 'px';
	        }
	        else {
	            document.getElementById('bar-water').style.width = obj.vector[0] + 'px';
	            document.getElementById('bar-glucose').style.width = obj.vector[1] + 'px';
	            document.getElementById('bar-auxin').style.width = 0 + 'px';
	        }
	    };
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
	                // console.log("cell wants to grow...")
	                var drow = 0;
	                var dcol = 0;
	                if (action.parameters.direction === "up") {
	                    drow = -1;
	                }
	                else if (action.parameters.direction === "down") {
	                    drow = 1;
	                }
	                else if (action.parameters.direction === "right") {
	                    dcol = 1;
	                }
	                else if (action.parameters.direction === "left") {
	                    dcol = -1;
	                }
	                var gI = this.plant[i].row + drow;
	                var gJ = this.plant[i].col + dcol;
	                var cost = this.dna.cellTypes[action.parameters.type].cost;
	                var canAfford = true;
	                for (var j = 0; j < cost.vector.length; j++) {
	                    if (!(this.plant[i].fluids.vector[j] >= cost.vector[j])) {
	                        canAfford = false;
	                        break;
	                    }
	                }
	                if (!canAfford) {
	                    // console.log("cell can't afford...")
	                    continue;
	                }
	                if (gI < 0 || gI >= Automata.GRID_N_ROWS || gJ < 0 || gJ >= Automata.GRID_N_COLUMNS) {
	                    // console.log("cannot make cell at " + gJ + ", " + gI);
	                    continue;
	                }
	                if (!(this.grid[gI][gJ] instanceof cell_1.Cell)) {
	                    // console.log("growing new cell...")
	                    var newFluids = this.splitFluids(this.plant[i]);
	                    var nCell = new cell_1.Cell(this.dna, action.parameters.type, newFluids, this.grid, gI, gJ);
	                    this.plant.push(nCell);
	                    this.grid[gI][gJ] = nCell;
	                    this.subtractFluids(this.plant[i].fluids, cost);
	                }
	            }
	        }
	        this.fluidUpdate();
	        this.signalsUpdate();
	        this.cellDeath();
	    };
	    /*
	    Kill all cells who don't have enough resources to live
	    */
	    Automata.prototype.cellDeath = function () {
	        var MIN_WATER = 10;
	        var MIN_GLUCOSE = 10;
	        var toKill = [];
	        for (var i = 0; i < this.plant.length; ++i) {
	            var cell = this.plant[i];
	            if (!cell.fluids)
	                continue;
	            if (cell.fluids.vector[fluids_1.Fluids.GLUCOSE] < MIN_GLUCOSE ||
	                cell.fluids.vector[fluids_1.Fluids.WATER] < MIN_WATER) {
	                // kill cell
	                toKill.push(cell);
	            }
	        }
	        for (var i = 0; i < toKill.length; ++i) {
	            var cell = toKill[i];
	            console.log('Killing cell at: ', cell.row, cell.col);
	            var index = this.plant.indexOf(cell);
	            this.plant.splice(index, 1);
	            this.grid[cell.row][cell.col] = cell.fluids;
	        }
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
	        var SPREAD_COEFF = 0.1;
	        for (var i = 0; i < this.plant.length; i++) {
	            var cell = this.plant[i];
	            var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
	            for (var j = 0; j < neighbs.length; j++) {
	                var nrow = cell.col + neighbs[j][0];
	                var ncol = cell.row + neighbs[j][1];
	                if (ncol < 0 || nrow < 0 || ncol >= Automata.GRID_N_COLUMNS || nrow >= Automata.GRID_N_ROWS)
	                    continue;
	                var neighb = this.grid[nrow][ncol];
	                if (neighb instanceof cell_1.Cell) {
	                    var nsignals = neighb.signals.vector;
	                    for (var k = 0; k < nsignals.length; k++) {
	                        if (cell.signals[k] < nsignals[k])
	                            continue;
	                        var amount = SPREAD_COEFF * cell.signals.vector[k];
	                        nsignals[k] += amount;
	                        cell.signals.vector[k] -= amount;
	                    }
	                }
	            }
	        }
	    };
	    Automata.prototype.fluidUpdate = function () {
	        // Initialize fluidsDiff to 0's
	        var fluidsDiff = new Array(Automata.GRID_N_ROWS);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            fluidsDiff[row] = new Array(Automata.GRID_N_COLUMNS);
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                fluidsDiff[row][col] = new Array(fluids_1.Fluids.N_FLUIDS);
	                for (var i = 0; i < fluids_1.Fluids.N_FLUIDS; ++i) {
	                    fluidsDiff[row][col][i] = 0;
	                }
	            }
	        }
	        // photosynthesis. TODO this will be an action
	        var REACTION_FACTOR = 10; // expend 1 water to get 4 glucose
	        for (var i = 0; i < this.plant.length; i++) {
	            var cell = this.plant[i];
	            if (cell.type === "l") {
	                var numAir = this.countAirNeighbors(cell.row, cell.col);
	                var dGlucose = Math.min(cell.fluids.vector[fluids_1.Fluids.WATER] / 4, 100 * numAir);
	                // convert water to glucose
	                fluidsDiff[cell.row][cell.col][fluids_1.Fluids.WATER] -= dGlucose;
	                fluidsDiff[cell.row][cell.col][fluids_1.Fluids.GLUCOSE] += REACTION_FACTOR * dGlucose;
	            }
	        }
	        // respiration. this is needed for stuff
	        var RESPIRATION_AMOUNT = 0.1;
	        for (var i = 0; i < this.plant.length; ++i) {
	            var cell = this.plant[i];
	            cell.fluids.vector[fluids_1.Fluids.WATER] -= RESPIRATION_AMOUNT;
	            cell.fluids.vector[fluids_1.Fluids.GLUCOSE] -= RESPIRATION_AMOUNT;
	        }
	        // Passive transport / diffusion. Give nutrients to neighbors.
	        var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
	        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                for (var i = 0; i < neighbs.length; ++i) {
	                    var neighbRow = row + neighbs[i][0];
	                    var neighbCol = col + neighbs[i][1];
	                    if (neighbRow < 0
	                        || neighbCol < 0
	                        || neighbRow >= Automata.GRID_N_ROWS
	                        || neighbCol >= Automata.GRID_N_COLUMNS) {
	                        continue;
	                    }
	                    var flowRate = 0.02;
	                    // air to air is very fast
	                    if (this.isAirCell(row, col) && this.isAirCell(neighbRow, neighbCol)) {
	                        flowRate = 0.2;
	                    }
	                    var obj = this.grid[row][col];
	                    var neighbFluids = this.grid[neighbRow][neighbCol];
	                    var fluids = obj instanceof cell_1.Cell ? obj.fluids.vector : obj.vector;
	                    neighbFluids = neighbFluids instanceof cell_1.Cell ? neighbFluids.fluids.vector : neighbFluids.vector;
	                    for (var j = 0; j < fluids_1.Fluids.N_FLUIDS; ++j) {
	                        if (fluids[j] > neighbFluids[j]) {
	                            var diff = flowRate * (fluids[j] - neighbFluids[j]);
	                            fluidsDiff[row][col][j] -= diff;
	                            fluidsDiff[neighbRow][neighbCol][j] += diff;
	                        }
	                    }
	                }
	            }
	        }
	        this.validateGridFluids();
	        // Apply fluidsDiff to fluids
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; col++) {
	                var obj = this.grid[row][col];
	                var fluids = obj instanceof cell_1.Cell ? obj.fluids.vector : obj.vector;
	                var fluidDiff = fluidsDiff[row][col];
	                for (var i = 0; i < fluids_1.Fluids.N_FLUIDS; ++i) {
	                    fluids[i] += fluidDiff[i];
	                }
	            }
	        }
	    };
	    Automata.prototype.isCellInGrid = function (row, col) {
	        return row >= 0 && col >= 0 &&
	            row < Automata.GRID_N_ROWS && col < Automata.GRID_N_COLUMNS;
	    };
	    Automata.prototype.isAirCell = function (row, col) {
	        if (!this.isCellInGrid(row, col))
	            return false;
	        return row < 50 && !(this.grid[row][col] instanceof cell_1.Cell);
	    };
	    Automata.prototype.countAirNeighbors = function (row, col) {
	        var n = (this.isAirCell(row - 1, col) ? 1 : 0) +
	            (this.isAirCell(row + 1, col) ? 1 : 0) +
	            (this.isAirCell(row, col - 1) ? 1 : 0) +
	            (this.isAirCell(row, col + 1) ? 1 : 0);
	        return n;
	    };
	    /*
	    Returns fluid vector (actual array) at row,col
	    */
	    Automata.prototype.fluidsAt = function (row, col) {
	        var obj = this.grid[row][col];
	        if (obj instanceof cell_1.Cell) {
	            return obj.fluids.vector;
	        }
	        return obj.vector;
	    };
	    Automata.prototype.draw = function () {
	        var scale = Automata.CELL_SCALE_PIXELS;
	        this.canvasCtx.lineWidth = 3;
	        this.canvasCtx.fillStyle = "#7EC0DD";
	        this.canvasCtx.fillRect(0, 0, Automata.GRID_N_COLUMNS * scale, scale * Automata.GRID_N_ROWS);
	        this.canvasCtx.fillRect(0, 0, 100, 100);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; col++) {
	                var obj = this.grid[row][col];
	                var fluids = this.fluidsAt(row, col);
	                var waterContent = Math.max(Math.min(Math.round(fluids[fluids_1.Fluids.WATER]), 255), 0);
	                if (this.viewStyle === 'water') {
	                    var colorString = "#" + "0064" + this.getColorHex(waterContent);
	                    this.canvasCtx.fillStyle = colorString;
	                }
	                else if (this.viewStyle === 'glucose') {
	                    if (obj instanceof cell_1.Cell) {
	                        this.canvasCtx.fillStyle = "#" + this.getColorHex(Math.min(255, Math.ceil(fluids[fluids_1.Fluids.GLUCOSE]))) + "0000";
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#000000";
	                    }
	                }
	                else if (this.viewStyle === 'auxin') {
	                    if (obj instanceof cell_1.Cell) {
	                        this.canvasCtx.fillStyle = "#" + "0000" + this.getColorHex(Math.min(255, Math.ceil(255 * obj.signals.vector[0])));
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#000000";
	                    }
	                }
	                else {
	                    if (obj instanceof cell_1.Cell) {
	                        this.canvasCtx.fillStyle = obj.dna.cellTypes[obj.type].color;
	                    }
	                    else if (row >= 50) {
	                        var val = Math.floor(Math.max(0, Math.min(500, waterContent) / 4));
	                        this.canvasCtx.fillStyle = "#3311" + this.getColorHex(val);
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#7EC0DD";
	                    }
	                }
	                this.canvasCtx.fillRect(Math.floor(scale * col), Math.floor(scale * row), scale, scale);
	                // draw green outline around the plant
	                if (this.viewStyle == 'water' || this.viewStyle == 'glucose' || this.viewStyle == 'auxin') {
	                    this.canvasCtx.strokeStyle = "#009900";
	                    var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
	                    if (obj instanceof cell_1.Cell) {
	                        for (var i = 0; i < neighbs.length; ++i) {
	                            var nrow = obj.row + neighbs[i][0];
	                            var ncol = obj.col + neighbs[i][1];
	                            if (this.isCellInGrid(nrow, ncol) && !(this.grid[nrow][ncol] instanceof cell_1.Cell)) {
	                                this.canvasCtx.beginPath();
	                                if (neighbs[i][0] == -1) {
	                                    this.canvasCtx.moveTo(scale * col + 0.5, scale * row + 0.5);
	                                    this.canvasCtx.lineTo(scale * (col + 1) + 0.5, scale * row + 0.5);
	                                }
	                                else if (neighbs[i][0] == 1) {
	                                    this.canvasCtx.moveTo(scale * (col + 1) + 0.5, scale * (row + 1) + 0.5);
	                                    this.canvasCtx.lineTo(scale * col + 0.5, scale * (row + 1) + 0.5);
	                                }
	                                else if (neighbs[i][1] == -1) {
	                                    this.canvasCtx.moveTo(scale * col + 0.5, scale * (row + 1) + 0.5);
	                                    this.canvasCtx.lineTo(scale * col + 0.5, scale * row + 0.5);
	                                }
	                                else if (neighbs[i][1] == 1) {
	                                    this.canvasCtx.moveTo(scale * (col + 1) + 0.5, scale * row + 0.5);
	                                    this.canvasCtx.lineTo(scale * (col + 1) + 0.5, scale * (row + 1) + 0.5);
	                                }
	                                this.canvasCtx.stroke();
	                            }
	                        }
	                    }
	                }
	            }
	        }
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
	    Automata.GRID_N_COLUMNS = 120;
	    Automata.GRID_N_ROWS = 100;
	    Automata.CELL_SCALE_PIXELS = 8;
	    return Automata;
	}());
	exports.Automata = Automata;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(5);
	var automata_1 = __webpack_require__(1);
	var DNA = (function () {
	    function DNA() {
	        this.cellTypes = {
	            'a1': {
	                cost: new fluids_1.Fluids(0, 20),
	                /*
	                (N_SIGNALS) x (N_SIGNALS+N_FLUIDS)
	                */
	                signalMatrix: [
	                    [1, 0, 0, 0, 0.2, 0.2],
	                    [0, 1, 1, 1, 0, 0],
	                    [0, 0, 1, 0, 0, 0],
	                    [0, 0, 0, 1, 0, 0],
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
	                            w: [20, 0, 0, 0],
	                            b: 60
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'a1'
	                        },
	                        activator: {
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'nothing',
	                        activator: {
	                            w: [-2, 0, 0, 0],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'a2': {
	                cost: new fluids_1.Fluids(0, 20),
	                signalMatrix: [
	                    [0.8, 0, 0, 0, 0, 0],
	                    [0, 1, 0, 0, 0, 0],
	                    [0, 0, 1, 0, 0, 0],
	                    [0, 0, 0, 1, 0, 0],
	                ],
	                signalB: [0.05, -0.5, 0.05, 0.05],
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
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'right',
	                            type: 'l'
	                        },
	                        activator: {
	                            w: [20, 0, 0, 0],
	                            b: 4
	                        }
	                    },
	                    {
	                        name: 'grow',
	                        parameters: {
	                            direction: 'left',
	                            type: 'l'
	                        },
	                        activator: {
	                            w: [20, 0, 0, 0],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'nothing',
	                        activator: {
	                            w: [-2, 0, 0, 0],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'b1': {
	                cost: new fluids_1.Fluids(0, 20),
	                signalMatrix: [
	                    [0.8, 0, 0, 0, 0, 0],
	                    [0, 1, 0, 0, 0, 0],
	                    [0, 0, 1, 0, 0, 0],
	                    [0, 0, 0, 1, 0, 0],
	                ],
	                signalB: [0.05, -0.5, 0.05, 0.05],
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
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'nothing',
	                        activator: {
	                            w: [-2, 0, 0, 0],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'b2': {
	                cost: new fluids_1.Fluids(0, 20),
	                signalMatrix: [
	                    [0.8, 0, 0, 0, 0, 0],
	                    [0, 1, 0, 0, 0, 0],
	                    [0, 0, 1, 0, 0, 0],
	                    [0, 0, 0, 1, 0, 0],
	                ],
	                signalB: [0.05, -0.5, 0.05, 0.05],
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
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'nothing',
	                        activator: {
	                            w: [-2, 0, 0, 0],
	                            b: 2
	                        }
	                    }
	                ]
	            },
	            'l': {
	                cost: new fluids_1.Fluids(0, 30),
	                signalMatrix: [
	                    [0.8, 0, 0, 0, 0, 0],
	                    [0, 1, 0, 0, 0, 0],
	                    [0, 0, 1, 0, 0, 0],
	                    [0, 0, 0, 1, 0, 0],
	                ],
	                signalB: [0.05, -0.5, 0.05, 0.05],
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
	                            w: [20, 0, 0, 0],
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
	                            w: [20, 0, 0, 0],
	                            b: 2
	                        }
	                    },
	                    {
	                        name: 'nothing',
	                        activator: {
	                            w: [-2, 0, 0, 0],
	                            b: 2
	                        }
	                    }
	                ]
	            }
	        };
	        window['dna'] = this;
	    }
	    DNA.prototype.plantSeed = function (grid) {
	        var c1 = new cell_1.Cell(this, 'a1', new fluids_1.Fluids(1000, 1000), grid, automata_1.Automata.GRID_N_ROWS / 2, automata_1.Automata.GRID_N_COLUMNS / 2), c2 = new cell_1.Cell(this, 'b1', new fluids_1.Fluids(1000, 1000), grid, automata_1.Automata.GRID_N_ROWS / 2 + 1, automata_1.Automata.GRID_N_COLUMNS / 2);
	        var seed = [c1, c2];
	        grid[c1.row][c1.col] = c1;
	        grid[c2.row][c2.col] = c2;
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
	    DNA.prototype.chooseAction = function (signals, cellType) {
	        var actions = this.cellTypes[cellType].actions;
	        var activators = new Array(actions.length);
	        for (var i = 0; i < activators.length; ++i) {
	            activators[i] = this.activatorFunction(this.distanceToActivator(signals, actions[i].activator));
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
	var signals_1 = __webpack_require__(4);
	var Cell = (function () {
	    function Cell(dna, type, fluids, grid, row, col) {
	        this.grid = grid;
	        this.row = row;
	        this.col = col;
	        this.fluids = fluids;
	        this.type = type;
	        this.dna = dna;
	        this.signals = new signals_1.Signals(dna.cellTypes[type].signalInit);
	    }
	    Cell.prototype.updateSignals = function () {
	        // multiply by matrix
	        var newSignals = new Array(this.signals.vector.length);
	        for (var i = 0; i < newSignals.length; ++i) {
	            newSignals[i] = 0;
	        }
	        var mtx = this.dna.cellTypes[this.type].signalMatrix;
	        for (var i = 0; i < newSignals.length; i++) {
	            for (var j = 0; j < this.signals.vector.length; j++) {
	                newSignals[i] += this.signals.vector[j] * mtx[i][j];
	            }
	            for (j = 0; j < this.fluids.vector.length; ++j) {
	                newSignals[i] += this.fluids.vector[j] * mtx[i][j + this.signals.vector.length];
	            }
	        }
	        var vec = this.dna.cellTypes[this.type].signalB;
	        // console.log('signals', newSignals, 'mtx', mtx, 'vec', vec);
	        for (var i = 0; i < vec.length; i++) {
	            newSignals[i] += vec[i];
	        }
	        for (var i = 0; i < newSignals.length; i++) {
	            this.signals.vector[i] = Math.max(0, Math.min(1, newSignals[i]));
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
	        return this.dna.chooseAction(this.signals, this.type);
	    };
	    return Cell;
	}());
	exports.Cell = Cell;


/***/ },
/* 4 */
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var N_FLUIDS = 2;
	var Fluids = (function () {
	    function Fluids(water, glucose) {
	        if (water === void 0) { water = 100; }
	        if (glucose === void 0) { glucose = 0; }
	        this.vector = new Array(Fluids.N_FLUIDS);
	        this.vector[Fluids.WATER] = water;
	        this.vector[Fluids.GLUCOSE] = glucose;
	    }
	    Fluids.N_FLUIDS = 2;
	    Fluids.WATER = 0;
	    Fluids.GLUCOSE = 1;
	    return Fluids;
	}());
	exports.Fluids = Fluids;


/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	"use strict";
	/*
	Radian-based angles.
	*/
	var Angle = (function () {
	    function Angle() {
	    }
	    /*
	    Return a random Direction enum based on the angle.
	    sampleDirection(0) returns Direction.RIGHT.
	    sampleDirection(Math.PI/4) is a 50-50 chance UP or RIGHT.
	    */
	    Angle.sampleDirection = function (angle) {
	        angle = Angle.canonical(angle);
	        if (angle == Angle.RIGHT)
	            return Directions.RIGHT;
	        if (angle == Angle.UP)
	            return Directions.UP;
	        if (angle == Angle.LEFT)
	            return Directions.LEFT;
	        if (angle == Angle.DOWN)
	            return Directions.DOWN;
	        // d1, d2 specify the quadrant
	        var d1, d2;
	        if (angle > Angle.RIGHT && angle < Angle.UP) {
	            d1 = Directions.RIGHT;
	            d2 = Directions.UP;
	        }
	        else if (angle > Angle.UP && angle < Angle.LEFT) {
	            d1 = Directions.UP;
	            d2 = Directions.LEFT;
	        }
	        else if (angle > Angle.LEFT && angle < Angle.DOWN) {
	            d1 = Directions.LEFT;
	            d2 = Directions.DOWN;
	        }
	        else {
	            d1 = Directions.DOWN;
	            d2 = Directions.RIGHT;
	        }
	        // determine how much the angle is pointing toward d1
	        angle = angle % (Math.PI / 2);
	        var sin = Math.sin(angle), cos = Math.cos(angle);
	        if (Math.random() < cos / (sin + cos)) {
	            return d1;
	        }
	        else {
	            return d2;
	        }
	    };
	    /* Returns angle between 0 and 2 PI */
	    Angle.canonical = function (angle) {
	        angle = angle % (2 * Math.PI);
	        if (angle < 0) {
	            return angle + 2 * Math.PI;
	        }
	        return angle;
	    };
	    /*
	    Computes angle of the given (x,y) vector
	    */
	    Angle.vectorAngle = function (x, y) {
	        return Math.atan2(y, x);
	    };
	    Angle.RIGHT = 0;
	    Angle.UP = Math.PI / 2;
	    Angle.LEFT = Math.PI;
	    Angle.DOWN = 3 * Math.PI / 2;
	    return Angle;
	}());
	exports.Angle = Angle;
	/*
	Cardinal direction enums
	*/
	var Directions = (function () {
	    function Directions() {
	    }
	    Directions.RIGHT = 0;
	    Directions.UP = 1;
	    Directions.LEFT = 2;
	    Directions.DOWN = 3;
	    return Directions;
	}());
	exports.Directions = Directions;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	app.ts
	*/
	"use strict";
	var automata_1 = __webpack_require__(1);
	var Simulation = (function () {
	    function Simulation(drawCanvas) {
	        this.FRAME_DELAY = 100;
	        this.drawCanvas = drawCanvas;
	        this.drawEnabled = true;
	        this.automata = new automata_1.Automata('prototype', drawCanvas);
	        this.startSimulation();
	    }
	    Simulation.prototype.startSimulation = function () {
	        var self = this;
	        this.updateInterval = window.setInterval(function () {
	            try {
	                self.automata.update();
	            }
	            catch (e) {
	                console.error("Automata error! Stopping simulation...");
	                self.stopSimulation();
	                throw e;
	            }
	            if (self.drawEnabled) {
	                self.automata.draw();
	            }
	        }, this.FRAME_DELAY);
	        this.isSimulationRunning = true;
	    };
	    Simulation.prototype.stopSimulation = function () {
	        window.clearInterval(this.updateInterval);
	        this.isSimulationRunning = false;
	    };
	    Simulation.prototype.toggleSimulation = function () {
	        if (this.isSimulationRunning)
	            this.stopSimulation();
	        else
	            this.startSimulation();
	    };
	    Simulation.prototype.resetSimulation = function () {
	        this.stopSimulation();
	        this.automata = null;
	        this.automata = new automata_1.Automata('prototype', this.drawCanvas);
	        this.startSimulation();
	    };
	    Simulation.prototype.toggleDraw = function () {
	        this.drawEnabled = !this.drawEnabled;
	    };
	    Simulation.prototype.viewStyle = function (style) {
	        console.log('viewstyle', style);
	        this.automata.viewStyle = style;
	        this.automata.draw();
	    };
	    return Simulation;
	}());
	exports.Simulation = Simulation;


/***/ }
/******/ ]);