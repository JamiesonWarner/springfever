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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var simulation_1 = __webpack_require__(1);
	var angle_1 = __webpack_require__(9);
	document.addEventListener("DOMContentLoaded", function (event) {
	    var drawCanvas = document.getElementById("draw");
	    var sim = new simulation_1.Simulation(drawCanvas);
	    sim.startSimulation();
	    // sim.doEvolution();
	    window['toggleSimulation'] = sim.toggleSimulation.bind(sim);
	    window['resetSimulation'] = sim.resetSimulation.bind(sim);
	    window['toggleDraw'] = sim.toggleDraw.bind(sim);
	    window['viewStyle'] = sim.viewStyle.bind(sim);
	    // sim.runForNTicks(100);
	    // DEBUG //
	    window['automata'] = sim.automata;
	    window['simulation'] = sim;
	    window['Angle'] = angle_1.Angle;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	app.ts
	*/
	"use strict";
	var automata_1 = __webpack_require__(2);
	var dna_1 = __webpack_require__(6);
	var Simulation = (function () {
	    function Simulation(drawCanvas) {
	        this.FRAME_DELAY = 1000;
	        this.drawCanvas = drawCanvas;
	        this.drawEnabled = true;
	        this.automata = new automata_1.Automata('prototype', drawCanvas);
	        this.automata.plantSeed(new dna_1.DNA());
	    }
	    Simulation.prototype.runForNTicks = function (N) {
	        // run sim for N ticks
	        for (var n = 0; n < N; ++n) {
	            this.automata.update();
	        }
	        this.automata.draw();
	    };
	    Simulation.prototype.startSimulation = function () {
	        this.isSimulationRunning = true;
	        this.updateStatus();
	        var self = this;
	        this.updateInterval = window.setInterval(function () {
	            try {
	                self.automata.update();
	            }
	            catch (e) {
	                console.warn("Automata error! Stopping simulation...");
	                self.stopSimulation();
	                throw e;
	            }
	            if (self.drawEnabled) {
	                self.automata.draw();
	            }
	        }, this.FRAME_DELAY);
	    };
	    Simulation.prototype.stopSimulation = function () {
	        this.showStatusString('Simulation stopped.');
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
	        this.showStatusString('Resetting...');
	        var view = this.automata.viewStyle;
	        this.stopSimulation();
	        this.automata = null;
	        this.automata = new automata_1.Automata('prototype', this.drawCanvas);
	        this.automata.viewStyle = view;
	    };
	    Simulation.prototype.toggleDraw = function () {
	        this.drawEnabled = !this.drawEnabled;
	        this.updateStatus();
	    };
	    Simulation.prototype.viewStyle = function (style) {
	        console.log('viewstyle', style);
	        this.automata.viewStyle = style;
	        this.automata.draw();
	    };
	    Simulation.prototype.updateStatus = function () {
	        var status;
	        if (this.isSimulationRunning)
	            status = 'Simulation running. ';
	        else
	            status = 'Simulation stopped. ';
	        if (!this.drawEnabled)
	            status += '(Draw disabled.) ';
	        this.showStatusString(status);
	    };
	    Simulation.prototype.showStatusString = function (status) {
	        document.getElementById("status").innerHTML = status;
	    };
	    return Simulation;
	}());
	exports.Simulation = Simulation;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(4);
	/*
	TODO turn Automata into systems model.
	Automata is a place for shared state.
	Automata just stores stuff like the fluidsArray, and its state is transformed by Systems.
	*/
	var Automata = (function () {
	    function Automata(runString, drawCanvas) {
	        this.canvas = drawCanvas;
	        this.canvas.setAttribute('width', Automata.GRID_N_COLUMNS * Automata.CELL_SCALE_PIXELS);
	        this.canvas.setAttribute('height', Automata.GRID_N_ROWS * Automata.CELL_SCALE_PIXELS);
	        this.canvasCtx = this.canvas.getContext("2d");
	        this.fluidsArray = new Array(Automata.GRID_N_ROWS);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            this.fluidsArray[row] = new Array(Automata.GRID_N_COLUMNS);
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                // create fluid for each location in the fluids array
	                var water;
	                if (this.isDirtCell(row, col))
	                    water = Math.random() * 2 * Automata.MATERIAL_DIRT_WATER_MEAN;
	                else
	                    water = Math.random() * 2 * Automata.MATERIAL_AIR_WATER_MEAN;
	                this.fluidsArray[row][col] = new fluids_1.Fluids(water, 0);
	            }
	        }
	        this.cellArray = new Array(Automata.GRID_N_ROWS);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            this.cellArray[row] = new Array(Automata.GRID_N_COLUMNS);
	        }
	        var self = this;
	        drawCanvas.addEventListener("mousemove", function (event) {
	            self.showInfo(event.offsetX, event.offsetY);
	        });
	    }
	    Automata.prototype.plantSeed = function (seed) {
	        // remove all existing plants and add the specified seed
	        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                this.cellArray[row][col] = undefined;
	            }
	        }
	        this.plant = seed.plantSeed(this.cellArray);
	        this.dna = seed;
	    };
	    Automata.prototype.isAirCell = function (row, col) {
	        return row < 50;
	    };
	    Automata.prototype.isDirtCell = function (row, col) {
	        return row >= 50;
	    };
	    Automata.prototype.printGridFluids = function () {
	        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                console.log(this.fluidsArray[row][col].vector);
	            }
	        }
	    };
	    Automata.prototype.validateFluidsArray = function () {
	        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                var f = this.fluidsArray[row][col].vector;
	                if (typeof f === 'undefined')
	                    console.log('row,col are: ', row, col);
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
	        var row = Math.floor(ty);
	        var col = Math.floor(tx);
	        var fluids = this.fluidsArray[row][col];
	        document.getElementById('bar-water').style.width = fluids.vector[fluids_1.Fluids.WATER] + 'px';
	        document.getElementById('bar-glucose').style.width = fluids.vector[fluids_1.Fluids.GLUCOSE] + 'px';
	        document.getElementById('bar-auxin').style.width = (40 * fluids.vector[fluids_1.Fluids.AUXIN]) + 'px';
	    };
	    Automata.prototype.update = function () {
	        if (this.plant.length)
	            console.log('cell fluids', this.plant[0].fluids.vector);
	        //console.log("tick");
	        // Calc actions on this frame
	        var actions = new Array(this.plant.length);
	        for (var i = 0; i < this.plant.length; i++) {
	            var cell = this.plant[i];
	            cell.update();
	            actions[i] = cell.chooseAction();
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
	                if (!(this.cellArray[gI][gJ])) {
	                    // console.log("growing new cell...")
	                    this.subtractFluids(this.plant[i].fluids, cost);
	                    var newFluids = this.splitFluids(this.plant[i].fluids);
	                    var nCell = new cell_1.Cell(this.dna, action.parameters.type, newFluids, gI, gJ);
	                    this.plant.push(nCell);
	                    this.cellArray[gI][gJ] = nCell;
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
	        var MIN_WATER = 0.1 * Automata.MATERIAL_WATER_WATER_MEAN;
	        var MIN_GLUCOSE = 0.001;
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
	            // console.log('Killing cell at: ', cell.row, cell.col);
	            var index = this.plant.indexOf(cell);
	            this.plant.splice(index, 1);
	            // this.fluidsArray[cell.row][cell.col] = cell.fluids;
	            this.cellArray[cell.row][cell.col] = undefined;
	        }
	    };
	    Automata.prototype.subtractFluids = function (a, b) {
	        for (var i = 0; i < a.vector.length; i++) {
	            a.vector[i] -= b.vector[i];
	        }
	    };
	    Automata.prototype.splitFluids = function (fluids) {
	        var newFluids = new fluids_1.Fluids();
	        for (var i = 0; i < fluids.vector.length; i++) {
	            fluids.vector[i] /= 2;
	            newFluids.vector[i] = fluids.vector[i];
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
	                var neighbFluids = this.fluidsArray[nrow][ncol];
	                if (neighbFluids instanceof cell_1.Cell) {
	                    var nsignals = neighbFluids.vector;
	                    for (var k = fluids_1.Fluids.SIGNALS_START; k < fluids_1.Fluids.N_FLUIDS; k++) {
	                        if (cell.fluids[k] < nsignals[k])
	                            continue;
	                        var amount = SPREAD_COEFF * cell.fluids.vector[k];
	                        nsignals[k] += amount;
	                        cell.fluids.vector[k] -= amount;
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
	            if (cell.type.isLeaf) {
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
	                    if (this.isAirNotCell(row, col) && this.isAirNotCell(neighbRow, neighbCol)) {
	                        flowRate = 0.2;
	                    }
	                    var neighbFluids = this.fluidsArray[neighbRow][neighbCol];
	                    var fluids = this.fluidsArray[row][col];
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
	        this.validateFluidsArray();
	        // Apply fluidsDiff to fluids
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; col++) {
	                var fluids = this.fluidsArray[row][col];
	                var fluidDiff = fluidsDiff[row][col];
	                for (var i = 0; i < fluids_1.Fluids.N_FLUIDS; ++i) {
	                    fluids[i] += fluidDiff[i];
	                }
	            }
	        }
	    };
	    Automata.prototype.isPositionOnGrid = function (row, col) {
	        return row >= 0 && col >= 0 &&
	            row < Automata.GRID_N_ROWS && col < Automata.GRID_N_COLUMNS;
	    };
	    Automata.prototype.isAirNotCell = function (row, col) {
	        if (!this.isPositionOnGrid(row, col))
	            return false;
	        // return
	        return row < 50 && !(this.fluidsArray[row][col] instanceof cell_1.Cell);
	    };
	    Automata.prototype.countAirNeighbors = function (row, col) {
	        var n = (this.isAirNotCell(row - 1, col) ? 1 : 0) +
	            (this.isAirNotCell(row + 1, col) ? 1 : 0) +
	            (this.isAirNotCell(row, col - 1) ? 1 : 0) +
	            (this.isAirNotCell(row, col + 1) ? 1 : 0);
	        return n;
	    };
	    Automata.prototype.draw = function () {
	        if (this.validateFluidsArray()) {
	            console.log('error in fluids, skipping draw');
	            return;
	        }
	        var scale = Automata.CELL_SCALE_PIXELS;
	        this.canvasCtx.lineWidth = 3;
	        this.canvasCtx.fillStyle = "#7EC0DD";
	        this.canvasCtx.fillRect(0, 0, Automata.GRID_N_COLUMNS * scale, scale * Automata.GRID_N_ROWS);
	        this.canvasCtx.fillRect(0, 0, 100, 100);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; col++) {
	                var fluids = this.fluidsArray[row][col].vector;
	                var waterContent = Math.max(Math.min(Math.round(fluids[fluids_1.Fluids.WATER]), 255), 0);
	                if (this.viewStyle === 'water') {
	                    var waterConcentration = fluids[fluids_1.Fluids.WATER] / (2 * Automata.MATERIAL_DIRT_WATER_MEAN);
	                    var waterColor = Math.max(Math.min(Math.round(255 * waterConcentration), 255), 0);
	                    var colorString = "#" + "0064" + this.getColorHex(waterColor);
	                    this.canvasCtx.fillStyle = colorString;
	                }
	                else if (this.viewStyle === 'glucose') {
	                    if (this.cellArray[row][col]) {
	                        this.canvasCtx.fillStyle = "#" + this.getColorHex(Math.min(255, Math.ceil(fluids[fluids_1.Fluids.GLUCOSE]))) + "0000";
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#000000";
	                    }
	                }
	                else if (this.viewStyle === 'auxin') {
	                    var cell_2 = this.cellArray[row][col];
	                    if (cell_2) {
	                        this.canvasCtx.fillStyle = "#" + "0000" + this.getColorHex(Math.min(255, Math.ceil(255 * fluids[fluids_1.Fluids.SIGNALS_START].vector[0])));
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#000000";
	                    }
	                }
	                else {
	                    var cell_3 = this.cellArray[row][col];
	                    if (cell_3) {
	                        this.canvasCtx.fillStyle = this.cellArray[row][col].type.color;
	                    }
	                    else if (row >= 50) {
	                        var cval = Math.ceil(waterContent / 4);
	                        // console.log(waterContent);
	                        this.canvasCtx.fillStyle = "#3311" + this.getColorHex(cval);
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
	                    var cell = this.cellArray[row][col];
	                    if (cell) {
	                        for (var i = 0; i < neighbs.length; ++i) {
	                            var nrow = row + neighbs[i][0];
	                            var ncol = col + neighbs[i][1];
	                            if (this.isPositionOnGrid(nrow, ncol) && !this.cellArray[nrow][ncol]) {
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
	    Automata.MATERIAL_WATER_WATER_MEAN = 1.0; // used to estimate turgidity. Wolfram Alpha: mass of 1cm^3 water
	    Automata.MATERIAL_DIRT_WATER_MEAN = 0.21; // Wolfram Alpha: mass of 1 cm^3 moist soil - Wolfram Alpha: mass of 1cm^3 dry soil;
	    Automata.MATERIAL_AIR_WATER_MEAN = 1.519e-5; // Wolfram Alpha: mass of water vapor in 1 cubic centimer air;
	    return Automata;
	}());
	exports.Automata = Automata;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(5);
	/*
	Cell is a fleighweight object for the Grid. Systems.
	Plus they also have context for fitting into the Grid.
	It can also be thought of as a DNA controller.
	*/
	var Cell = (function () {
	    function Cell(dna, type, fluids, row, col) {
	        this.row = row;
	        this.col = col;
	        this.fluids = fluids;
	        if (typeof type === 'number') {
	            this.type = dna.cellTypes[type];
	        }
	        else {
	            this.type = type;
	        }
	        this.dna = dna;
	    }
	    Cell.prototype.updateSignals = function () {
	        // multiply by matrix
	        // var newSignals = new Array(Fluids.N_SIGNALS);
	        // for (var i = 0; i < newSignals.length; ++i) {
	        //     newSignals[i] = 0;
	        // }
	        // var mtx = this.type.signalMatrix;
	        // for (var i = 0; i < newSignals.length; i++) {
	        //     for (var j = 0; j < Fluids.N_SIGNALS; j++) { // first SIGNALS columns of matrix...
	        //         newSignals[i] += this.fluids.vector[j+Fluids.SIGNALS_START] * mtx[i][j];
	        //     }
	        //     for (j = 0; j < this.fluids.vector.length; ++j) {
	        //         newSignals[i] += this.fluids.vector[j] * mtx[i][j+this.signals.vector.length];
	        //     }
	        // }
	        // var vec = this.dna.cellTypes[this.type].signalB;
	        // // console.log('signals', newSignals, 'mtx', mtx, 'vec', vec);
	        // for (var i = 0; i < vec.length; i++) {
	        //     newSignals[i] += vec[i];
	        // }
	        // for (var i = 0; i < newSignals.length; i++) {
	        //     this.signals.vector[i] = Math.max(0, Math.min(1, newSignals[i]));
	        // }
	    };
	    Cell.prototype.update = function () {
	    };
	    Cell.prototype.getActionPotential = function (action) {
	        return 0;
	    };
	    Cell.prototype.chooseAction = function () {
	        // var signals = this.signals,
	        //     cellType = this.type;
	        // var perceptron = this.type.
	        // Calculate which actions have high potential values
	        var actions = this.dna.actions;
	        var potentials = new Array(actions.length);
	        for (var i = 0; i < actions.length; ++i) {
	            potentials[i] = this.type.actionPerceptrons[i].activate(this.fluids.vector)[0]; // this.getActionPotential(actions[i]);
	        }
	        var bestIndex = utils_1.Utils.argmax(potentials);
	        return actions[bestIndex];
	        // for (var i = 0; i < activators.length; ++i) {
	        //     activators[i] = this.activatorFunction(this.distanceToActivator(signals, actions[i].activator));
	        // }
	        // // console.log('activators', activators, 'actions', actions);
	        // return this.weightedChoose(actions, activators);
	    };
	    return Cell;
	}());
	exports.Cell = Cell;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var automata_1 = __webpack_require__(2);
	var Fluids = (function () {
	    function Fluids(water, glucose) {
	        if (water === void 0) { water = automata_1.Automata.MATERIAL_WATER_WATER_MEAN; }
	        if (glucose === void 0) { glucose = 0; }
	        this.vector = new Array(Fluids.N_FLUIDS);
	        for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
	            this.vector[i] = 0;
	        }
	        this.vector[Fluids.WATER] = water;
	        this.vector[Fluids.GLUCOSE] = glucose;
	    }
	    Fluids.prototype.sumFluids = function () {
	        var s = 0;
	        for (var i = 0; i < this.vector.length; ++i) {
	            s += this.vector[i];
	        }
	        return s;
	    };
	    Fluids.prototype.getPressureInArea = function (area) {
	        return this.sumFluids() / area;
	    };
	    /*
	    Goal:  q
	    */
	    /*
	    Returns the quantity of a given fluid, which is the amount of a substance per unit volume.
	    divided by the total fluid.
	
	    */
	    /*
	
	    */
	    Fluids.prototype.getFluidConcentration = function (fluidId, area) {
	    };
	    /*
	    Diffusive flux is rate of flow per unit area. Positive value means outward flow.
	
	    Fick's law of diffusion: J = -D (d phi)/(d x)
	    J is diffusive flux
	    D is diffusion coefficient
	    phi is amount of
	    x is position
	    */
	    Fluids.prototype.getDiffusiveFlux = function (toFluid, area1, area2) { };
	    Fluids.WATER = 0;
	    Fluids.GLUCOSE = 1;
	    Fluids.AUXIN = 2;
	    Fluids.SIGNALS_START = 2;
	    Fluids.N_SIGNALS = 4;
	    Fluids.N_FLUIDS = 2 + Fluids.N_SIGNALS;
	    return Fluids;
	}());
	exports.Fluids = Fluids;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var Utils = (function () {
	    function Utils() {
	    }
	    Utils.l2norm = function (arr) {
	        var n = 0;
	        for (var i = 0; i < arr.length; ++i) {
	            n += arr[i] * arr[i];
	        }
	        return Math.sqrt(n);
	    };
	    Utils.l1norm = function (arr) {
	        var n = 0;
	        for (var i = 0; i < arr.length; ++i) {
	            n += arr[i];
	        }
	        return n;
	    };
	    Utils.distanceToPlane = function (fluids, activator) {
	        var normW = Utils.l2norm(activator.w);
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
	    Utils.activatorFunction = function (v) {
	        return 1 / (1 + Math.exp(-v));
	    };
	    Utils.argmax = function (arr) {
	        if (!arr.length)
	            return undefined;
	        var max = arr[0];
	        var argmax = 0;
	        for (var i = 1; i < arr.length; ++i) {
	            if (arr[i] > max) {
	                argmax = i;
	                max = arr[i];
	            }
	        }
	        return argmax;
	    };
	    return Utils;
	}());
	exports.Utils = Utils;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(4);
	var automata_1 = __webpack_require__(2);
	var action_1 = __webpack_require__(7);
	var perceptron_1 = __webpack_require__(8);
	var DNA = (function () {
	    function DNA() {
	        window['dna'] = this;
	        this.actions = [
	            new action_1.DivideAction({ fluidGradient: [0, 0, -1, 0, 0, 0] }),
	            new action_1.PumpAction({ fluidGradient: [-1, 0, 0.1, 0, 0, 0] }),
	            new action_1.ReactAction({ reaction: [-0.2, 0.8, 0.1, 0, 0, 0] }),
	            new action_1.ReactAction({ reaction: [0, 0, 0.1, 0, 0, 0] }),
	            new action_1.ReactAction({ reaction: [0, 0, 0, 0.1, 0, 0] }),
	            new action_1.ReactAction({ reaction: [0, 0, 0, 0, 0.1, 0] }),
	            new action_1.ReactAction({ reaction: [0, 0, 0, 0, 0, 0.1] }),
	            new action_1.ReactAction({ reaction: [0, 0, 0, -0.1, 0, 0] }),
	            new action_1.ReactAction({ reaction: [0, 0, 0, 0, -0.1, 0] }),
	            new action_1.ReactAction({ reaction: [0, 0, 0, 0, 0, -0.1] }),
	            new action_1.SpecializeAction({ toType: 0 }),
	            new action_1.SpecializeAction({ toType: 1 })
	        ];
	        // cell types
	        this.cellTypes = new Array(DNA.N_CELL_TYPES);
	        for (var i = 0; i < DNA.N_CELL_TYPES; ++i) {
	            var actionPerceptrons = [];
	            for (var j = 0; j < this.actions.length; ++j) {
	                actionPerceptrons[j] = new perceptron_1.Perceptron(fluids_1.Fluids.N_FLUIDS, 8, 1);
	            }
	            this.cellTypes[i] = {
	                color: DNA.COLOR_HEX_ARRAY[i % DNA.COLOR_HEX_ARRAY.length],
	                isLeaf: i == 1,
	                cost: new fluids_1.Fluids(0.2, 0.2),
	                actionPerceptrons: actionPerceptrons
	            };
	        }
	    }
	    DNA.prototype.copyAndMutate = function () {
	        return new DNA();
	    };
	    DNA.prototype.plantSeed = function (grid) {
	        var waterInitial = 1.75 * automata_1.Automata.MATERIAL_WATER_WATER_MEAN;
	        var glucoseInitial = 4.0;
	        var rowCenter = Math.floor(automata_1.Automata.GRID_N_ROWS / 2), colCenter = Math.floor(automata_1.Automata.GRID_N_COLUMNS / 2), row1 = rowCenter + 2, row2 = rowCenter + 3, col1 = colCenter, col2 = colCenter;
	        var c1 = new cell_1.Cell(this, 0, new fluids_1.Fluids(waterInitial, glucoseInitial), row1, col1), c2 = new cell_1.Cell(this, 1, new fluids_1.Fluids(waterInitial, glucoseInitial), row2, col2);
	        var seed = [c1, c2];
	        grid[c1.row][c1.col] = c1;
	        grid[c2.row][c2.col] = c2;
	        return seed;
	    };
	    /*
	  In nature, the gene controls the transcription product, and .
	  
	  
	  Inputs of a cell:
	  - Fluids
	  - Fluids gradient...
	  
	  Actions of a cell:
	  
	  DNA is a list of potential actions:
	  - Reproduce (directional), direction specified as vector multiplier of fluids
	  - Pump fluids (directional), direction specified as vector multiplier of fluids
	  - Reactions
	  - Specialize
	  
	  CellType is the controller of DNA and determines when gene products are made.
	  Each cell type is also a 2 layer neural net, which takes as input the fluid vector.
	  Each cell type has a list of potential actions, which may be paramaterized by neighbor states.
	  Transitions between cell types can be modeled as a markov chain, though some states are unreachable once left.
	    */
	    /*
	    For every action, celltypes has a neural net
	    */
	    // cellTypes = [
	    //   {
	    //     cost: new Fluids(0.2, 0.2),
	    //     /*
	    //     (N_SIGNALS) x (N_SIGNALS+N_FLUIDS)
	    //     */
	    //     signalMatrix: [
	    //       [1,0,0,0,0.2,0.2], // auxin production depends on resources
	    //       [0,1,1,1,0,0], // new apical contender (force apical)
	    //       [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
	    //       [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
	    //     ],
	    //     signalB: [-0.3,-0.5,0.05,-0.05],
	    //     signalInit: [0,0,0,1],
	    //     color: "#ededbe",
	    //     actions: [
	    //       {
	    //         name: 'demote',
	    //         activator: {
	    //           w: [0,10,0,0],
	    //           b: 0
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'up',
	    //             type: 0
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 60,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 0
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 1
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'left',
	    //             type: 1
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'nothing',
	    //         activator: {
	    //           w: [-2, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       }
	    //     ]
	    //   },
	    //   {
	    //     cost: new Fluids(0, 0.2),
	    //     signalMatrix: [
	    //       [0.8,0,0,0,0,0], // auxin production depends on resources
	    //       [0,1,0,0,0,0], // new apical contender (force apical)
	    //       [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
	    //       [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
	    //     ],
	    //     signalB: [0.05,-0.5,0.05,0.05],
	    //     signalInit: [0,0,0,0],
	    //     color: "#8F8F6E",
	    //     isLeaf: true,
	    //     actions: [
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 1
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'left',
	    //             type: 1
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 4
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 4,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'left',
	    //             type: 4
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'nothing',
	    //         activator: {
	    //           w: [-2, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       }
	    //     ]
	    //   },
	    //   {
	    //     cost: new Fluids(0, 0.2),
	    //     signalMatrix: [
	    //       [0.8,0,0,0,0,0], // auxin production depends on resources
	    //       [0,1,0,0,0,0], // new apical contender (force apical)
	    //       [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
	    //       [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
	    //     ],
	    //     signalB: [0.05,-0.5,0.05,0.05],
	    //     signalInit: [0,0,0,0],
	    //     color: "#6E6E8F",
	    //     actions: [
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'down',
	    //             type: 2
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 2
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 3
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'left',
	    //             type: 3
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'nothing',
	    //         activator: {
	    //           w: [-2, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       }
	    //     ]
	    //   },
	    //   {
	    //     cost: new Fluids(0, 0.2),
	    //     signalMatrix: [
	    //       [0.8,0,0,0,0,0], // auxin production depends on resources
	    //       [0,1,0,0,0,0], // new apical contender (force apical)
	    //       [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
	    //       [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
	    //     ],
	    //     signalB: [0.05,-0.5,0.05,0.05],
	    //     signalInit: [0,0,0,0],
	    //     color: "#8F6E7F",
	    //     actions: [
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 3
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'left',
	    //             type: 3
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'nothing',
	    //         activator: {
	    //           w: [-2, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       }
	    //     ]
	    //   },
	    //   { // leafs
	    //     cost: new Fluids(0, 0.4),
	    //     signalMatrix: [
	    //       [0.8,0,0,0,0,0], // auxin production depends on resources
	    //       [0,1,0,0,0,0], // new apical contender (force apical)
	    //       [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
	    //       [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
	    //     ],
	    //     signalB: [0.05,-0.5,0.05,0.05],
	    //     signalInit: [0,0,0,0],
	    //     color: "#80C4A1",
	    //     actions: [
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'right',
	    //             type: 4
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'grow',
	    //         parameters: {
	    //             direction: 'left',
	    //             type: 4
	    //         },
	    //         activator: {
	    //           w: [20, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       },
	    //       {
	    //         name: 'nothing',
	    //         activator: {
	    //           w: [-2, 0, 0, 0],
	    //           b: 2,
	    //         }
	    //       }
	    //     ]
	    //   }
	    // ]
	    DNA.prototype.serialize = function () {
	        return {
	            cellTypes: this.cellTypes
	        };
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
	        var actions = cellType.actions;
	        var activators = new Array(actions.length);
	        for (var i = 0; i < activators.length; ++i) {
	            activators[i] = this.activatorFunction(this.distanceToActivator(signals, actions[i].activator));
	        }
	        // console.log('activators', activators, 'actions', actions);
	        return this.weightedChoose(actions, activators);
	    };
	    DNA.N_CELL_TYPES = 2;
	    DNA.COLOR_HEX_ARRAY = ["#ededbe", "#8F8F6E", "#6E6E8F", "#8F6E7F", "#80C4A1"];
	    return DNA;
	}());
	exports.DNA = DNA;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var DirectionalAction = (function () {
	    function DirectionalAction(args) {
	        this.fluidGradient = args['fluidGradient'];
	    }
	    return DirectionalAction;
	}());
	exports.DirectionalAction = DirectionalAction;
	var DivideAction = (function (_super) {
	    __extends(DivideAction, _super);
	    function DivideAction(args) {
	        _super.call(this, args);
	    }
	    return DivideAction;
	}(DirectionalAction));
	exports.DivideAction = DivideAction;
	var PumpAction = (function (_super) {
	    __extends(PumpAction, _super);
	    function PumpAction(args) {
	        _super.call(this, args);
	    }
	    return PumpAction;
	}(DirectionalAction));
	exports.PumpAction = PumpAction;
	var ReactAction = (function () {
	    function ReactAction(args) {
	        this.reaction = args['reaction'];
	    }
	    return ReactAction;
	}());
	exports.ReactAction = ReactAction;
	var SpecializeAction = (function () {
	    function SpecializeAction(args) {
	        this.toType = args['toType'];
	    }
	    return SpecializeAction;
	}());
	exports.SpecializeAction = SpecializeAction;


/***/ },
/* 8 */
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
	        if (amount === void 0) { amount = 1.0; }
	        // perturb every weight by ~amount
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
	// export class Perceptron {
	//     // perceptron is a list of layers.
	//     // each layer is a list of nodes, each node (k+1) weight values, where k is the # nodes in the previous layer
	//     // layers array will have #layers - 1 values because the input layer has no weights
	//     // [
	//     //     [[0,0],[0,0]], // hidden 1
	//     //     [[0,0,0]]  // output
	//     // ]
	//     weights: Array<Array<Array<number>>>;
	//     nlayers: Array<number>; // array of the # nodes in each layer, INCLUDING the input layer.
	//     netValues: Array<Array<number>>;
	//     constructor(...args: number[]) {
	//         var nlayers = args.length;
	//         this.weights = new Array(nlayers-1);
	//         for (var i = 1; i < nlayers; ++i) {
	//             var nnodes = args[i],
	//                 prevNodes = args[i - 1];
	//             this.weights[i-1] = new Array(nnodes);
	//             for (var j = 0; j < nnodes; ++j) {
	//                 this.weights[i-1][j] = new Array(prevNodes + 1); // input + constant
	//                 for (var k = 0; k < prevNodes + 1; ++k) {
	//                     this.weights[i-1][j][k] = 0;
	//                 }
	//             }
	//         }
	//         this.netValues = new Array(nlayers - 1);
	//         for (var i = 1; i < nlayers; ++i) {
	//             this.netValues[i-1] = new Array(args[i]);
	//         }
	//     }
	//     clone(): Perceptron {
	//         // assume weight equivilancy
	//         var p = new (Function.prototype.bind.apply(Perceptron, this.nlayers));
	//         for (var i = 0; i < this.weights.length; ++i) {
	//             for (var j = 0; j < this.weights[i].length; ++j) {
	//                 for (var k = 0; k < this.weights[i][j].length; ++k) {
	//                     p.weights[i][j][k] = this.weights[i][j][k];
	//                 }
	//             }
	//         }
	//         return p;
	//     }
	//     perturb(amount: number = 1.0) {
	//         // perturb every weight by ~amount
	//         for (var i = 0; i < this.weights.length; ++i) {
	//             for (var j = 0; j < this.weights[i].length; ++j) {
	//                 for (var k = 0; k < this.weights[i][j].length; ++k) {
	//                     this.weights[i][j][k] += 2 * Math.random() * amount - amount;
	//                 }
	//             }
	//         }
	//     }
	//     net(input: Array<number>): number {
	//         // var mtx = this.type.signalMatrix;
	//         // for (var i = 0; i < newSignals.length; i++) {
	//         //     for (var j = 0; j < Fluids.N_SIGNALS; j++) { // first SIGNALS columns of matrix...
	//         //         newSignals[i] += this.fluids.vector[j+Fluids.SIGNALS_START] * mtx[i][j];
	//         //     }
	//         //     for (j = 0; j < this.fluids.vector.length; ++j) {
	//         //         newSignals[i] += this.fluids.vector[j] * mtx[i][j+this.signals.vector.length];
	//         //     }
	//         // }
	//         // iterate through each layer of weights
	//         var inlayer = input;
	//         var outlayer;
	//         for (var i = 0; i < this.netValues.length; ++i) {
	//             outlayer = this.netValues[i];
	//             var layerWeights = this.weights[i];
	//             for (var j = 0; j < layerWeights.length; ++j) {
	//                 // weights for the node
	//                 var weights = layerWeights[j];
	//                 var sum = weights[0];
	//                 for (var k = 0; k < inlayer.length; ++k) {
	//                     sum += inlayer[k] * weights[k+1];
	//                 }
	//                 outlayer[j] = sum; // VectorUtils.activatorFunction(sum);
	//             }
	//             inlayer = this.netValues[i];
	//         }
	//         console.log('computing net funciton', this.netValues, this.weights, outlayer);
	//         return outlayer.slice();
	//     }
	// }


/***/ },
/* 9 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map