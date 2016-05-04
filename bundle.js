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
	var evolution_1 = __webpack_require__(10);
	var angle_1 = __webpack_require__(9);
	document.addEventListener("DOMContentLoaded", function (event) {
	    var drawCanvas = document.getElementById("draw");
	    // var sim = new Simulation(drawCanvas);
	    // sim.startSimulation();
	    var sim = new evolution_1.Evolution(drawCanvas);
	    var best = sim.doEvolution(0);
	    window['toggleSimulation'] = sim.toggleSimulation.bind(sim);
	    window['resetSimulation'] = function () {
	        sim.setupSimulation(null); //.bind(sim);
	        sim.startSimulation();
	    };
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
	        this.automata.draw();
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
	    Simulation.prototype.setupSimulation = function (dna) {
	        if (!dna) {
	            dna = new dna_1.DNA();
	        }
	        this.showStatusString('Resetting...');
	        var view = this.automata.viewStyle;
	        this.stopSimulation();
	        this.automata = null;
	        this.automata = new automata_1.Automata('prototype', this.drawCanvas);
	        this.automata.plantSeed(dna);
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
	var action_1 = __webpack_require__(7);
	var angle_1 = __webpack_require__(9);
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
	        //console.log("tick");
	        // if (this.plant.length)
	        //     console.log('cell fluids', this.plant[0].fluids.vector);
	        // Calc actions on this frame
	        var actions = new Array(this.plant.length);
	        var cell;
	        for (var i = 0; i < this.plant.length; i++) {
	            cell = this.plant[i];
	            actions[i] = cell.chooseAction();
	        }
	        // Apply actions on this frame
	        for (var i = 0; i < actions.length; i++) {
	            if (!actions[i])
	                continue;
	            var action = actions[i];
	            if (action instanceof action_1.DivideAction) {
	                // console.log("cell wants to grow...")
	                var daction = action;
	                // calculate direction of this action
	                var neighborUp = this.fluidsArray[cell.row - 1][cell.col];
	                var neighborRight = this.fluidsArray[cell.row][cell.col + 1];
	                var neighborDown = this.fluidsArray[cell.row + 1][cell.col];
	                var neighborLeft = this.fluidsArray[cell.row][cell.col - 1];
	                var angle = daction.getActionDirection(neighborUp, neighborRight, neighborDown, neighborLeft);
	                var direction = angle_1.Angle.sampleDirection(angle);
	                var drow = angle_1.Angle.directionDeltaRow(direction);
	                var dcol = angle_1.Angle.directionDeltaCol(direction);
	                var gI = this.plant[i].row + drow;
	                var gJ = this.plant[i].col + dcol;
	                var cost = cell.type.cost;
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
	                    this.subtractFluids(cell.fluids, cost);
	                    var newFluids = this.splitFluids(cell.fluids);
	                    var nCell = new cell_1.Cell(this.dna, cell.type, newFluids, gI, gJ);
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
	            var cell_2 = this.plant[i];
	            if (cell_2.type.isLeaf) {
	                var numAir = this.countAirNeighbors(cell_2.row, cell_2.col);
	                var dGlucose = Math.min(cell_2.fluids.vector[fluids_1.Fluids.WATER] / 4, 100 * numAir);
	                // convert water to glucose
	                fluidsDiff[cell_2.row][cell_2.col][fluids_1.Fluids.WATER] -= dGlucose;
	                fluidsDiff[cell_2.row][cell_2.col][fluids_1.Fluids.GLUCOSE] += REACTION_FACTOR * dGlucose;
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
	        // console.log(fluidsDiff);
	        var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
	        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                for (var i = 0; i < neighbs.length; ++i) {
	                    var neighbRow = row + neighbs[i][0];
	                    var neighbCol = col + neighbs[i][1];
	                    if (!this.isPositionOnGrid(neighbRow, neighbCol)) {
	                        continue;
	                    }
	                    var flowRate = 0.02;
	                    // air to air is very fast
	                    if (this.isAirNotCell(row, col) && this.isAirNotCell(neighbRow, neighbCol)) {
	                        flowRate = 0.2;
	                    }
	                    var neighbFluids = this.fluidsArray[neighbRow][neighbCol].vector;
	                    var fluids = this.fluidsArray[row][col].vector;
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
	                var fluids = this.fluidsArray[row][col].vector;
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
	        // cell is dead and cell is air cell
	        if (!this.isPositionOnGrid(row, col))
	            return false;
	        return row < 50 && !this.cellArray[row][col];
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
	                    var cell_3 = this.cellArray[row][col];
	                    if (cell_3) {
	                        this.canvasCtx.fillStyle = "#" + "0000" + this.getColorHex(Math.min(255, Math.ceil(255 * fluids[fluids_1.Fluids.SIGNALS_START].vector[0])));
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#000000";
	                    }
	                }
	                else {
	                    var cell_4 = this.cellArray[row][col];
	                    if (cell_4) {
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
	        // console.log('choosing action, ', actions[bestIndex]);
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
	    Utils.getBoundedRandom = function (bound) {
	        return 2 * bound * Math.random() - bound;
	    };
	    Utils.crossProduct = function (arr1, arr2) {
	        var sum = 0;
	        var length = Math.min(arr1.length, arr2.length);
	        for (var i = 0; i < length; ++i) {
	            sum += arr1[i] * arr2[i];
	        }
	        return sum;
	    };
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
	var celltypes_1 = __webpack_require__(11);
	var DNA = (function () {
	    function DNA() {
	        window['dna'] = this;
	        this.actions = [
	            // new DivideAction({ fluidGradient: [0,0,-1,0,0,0], gravityGradient: 2 }),
	            new action_1.DivideAction({ fluidGradient: [0, 0, 0, 0, 0, 0], gravityGradient: 2 }),
	            new action_1.DivideAction({ fluidGradient: [0, 0, 0, 0, 0, 0], gravityGradient: -2 }),
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
	    DNA.prototype.clone = function () {
	        var serial = DNASerializer.serialize(this);
	        return DNASerializer.deserialize(serial);
	    };
	    DNA.prototype.copyAndMutate = function (amount) {
	        if (amount === void 0) { amount = 1; }
	        var dna = this.clone();
	        // mutate actions
	        for (var i = 0; i < dna.actions.length; ++i) {
	            var action = dna.actions[i];
	            action.mutate(amount);
	        }
	        // mutate type controllers
	        for (var i = 0; i < dna.cellTypes.length; ++i) {
	            var type = dna.cellTypes[i];
	            for (var j = 0; j < type.actionPerceptrons; ++j) {
	                var p = type.actionPerceptrons[j];
	                p.perturb(amount);
	            }
	        }
	        return new DNA();
	    };
	    DNA.prototype.plantSeed = function (grid) {
	        var waterInitial = 1.75 * automata_1.Automata.MATERIAL_WATER_WATER_MEAN;
	        var glucoseInitial = 20; // 4.0;
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
	    /*
	    Serialization is necessary to store the results of evolution so they can be played back, saved
	    */
	    DNA.prototype.serialize = function () {
	        var actionsSerial = new Array(this.actions.length);
	        for (var i = 0; i < this.actions.length; ++i) {
	            actionsSerial[i] = action_1.ActionSerializer.serialize(this.actions[i]);
	        }
	        return JSON.stringify({
	            cellTypes: this.cellTypes,
	            actions: actionsSerial
	        });
	    };
	    DNA.N_CELL_TYPES = 5;
	    DNA.COLOR_HEX_ARRAY = ["#ededbe", "#8F8F6E", "#6E6E8F", "#8F6E7F", "#80C4A1"];
	    return DNA;
	}());
	exports.DNA = DNA;
	var DNASerializer = (function () {
	    function DNASerializer() {
	    }
	    DNASerializer.serialize = function (dna) {
	        return "";
	    };
	    DNASerializer.deserialize = function (serialized) {
	        var d = new DNA();
	        var o = JSON.parse(serialized);
	        var actionsSerial = o.actions;
	        var actions = new Array(actionsSerial.length);
	        for (var i = 0; i < actionsSerial.length; ++i) {
	            actions[i] = action_1.ActionSerializer.deserialize(actionsSerial[i]);
	        }
	        var cellTypesSerial = o.cellTypes;
	        var cellTypes = new Array(cellTypesSerial.length);
	        for (var i = 0; i < cellTypes.length; ++i) {
	            cellTypes[i] = celltypes_1.CellTypeSerializer.deserialize(cellTypesSerial[i]);
	        }
	        d.cellTypes = cellTypes;
	        d.actions = actions;
	        return d;
	    };
	    return DNASerializer;
	}());


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var utils_1 = __webpack_require__(5);
	var ActionSerializer = (function () {
	    function ActionSerializer() {
	    }
	    ActionSerializer.serialize = function (action) {
	        var cls;
	        if (action.constructor == DivideAction) {
	            cls = "DivideAction";
	        }
	        else if (action.constructor == PumpAction) {
	            cls = "PumpAction";
	        }
	        else if (action.constructor == ReactAction) {
	            cls = "ReactAction";
	        }
	        else if (action.constructor == SpecializeAction) {
	            cls = "SpecializeAction";
	        }
	        else {
	            throw new TypeError("Did not recognize the specified action type");
	        }
	        var obj = {
	            class: cls
	        };
	        if (action instanceof DirectionalAction) {
	            obj['fluidGradient'] = action.fluidGradient;
	            obj['gravityGradient'] = action.gravityGradient;
	            obj['sunGradient'] = action.sunGradient;
	        }
	        else if (action instanceof ReactAction) {
	            obj['reaction'] = action.reaction;
	        }
	        else if (action instanceof SpecializeAction) {
	            obj['toType'] = action.toType;
	        }
	        return JSON.stringify(obj);
	    };
	    ActionSerializer.deserialize = function (jsonAction) {
	        var obj = JSON.parse(jsonAction);
	        switch (obj.class) {
	            case "DivideAction":
	                return new DivideAction(obj);
	            case "PumpAction":
	                return new PumpAction(obj);
	            case "ReactAction":
	                return new ReactAction(obj);
	            case "SpecializeAction":
	                return new SpecializeAction(obj);
	            default:
	                throw new TypeError("Bad jsonAction");
	        }
	    };
	    return ActionSerializer;
	}());
	exports.ActionSerializer = ActionSerializer;
	var DirectionalAction = (function () {
	    function DirectionalAction(args) {
	        this.fluidGradient = args['fluidGradient'];
	        this.gravityGradient = args['gravityGradient'];
	        this.sunGradient = args['sunGradient'];
	    }
	    DirectionalAction.prototype.getActionDirection = function (upFluids, rightFluids, downFluids, leftFluids) {
	        var upContribution = utils_1.Utils.crossProduct(upFluids, this.fluidGradient);
	        var rightContribution = utils_1.Utils.crossProduct(rightFluids, this.fluidGradient);
	        var downContribution = utils_1.Utils.crossProduct(downFluids, this.fluidGradient);
	        var leftContribution = utils_1.Utils.crossProduct(leftFluids, this.fluidGradient);
	        if (this.gravityGradient) {
	            downContribution += this.gravityGradient;
	        }
	        var direction = Math.atan2(upContribution - downContribution, rightContribution - leftContribution);
	        console.log('calculated action direction is ', direction, upContribution, downContribution);
	        return direction;
	    };
	    /*
	    Calculate the angle that this action points to
	    */
	    DirectionalAction.prototype.getGradientToFluids = function () {
	    };
	    DirectionalAction.prototype.mutate = function (amount) {
	        if (amount === void 0) { amount = 1; }
	        for (var i = 0; i < this.fluidGradient.length; ++i) {
	            var r = utils_1.Utils.getBoundedRandom(amount);
	            this.fluidGradient[i] += r;
	        }
	        if (typeof this.gravityGradient != 'undefined')
	            this.gravityGradient += utils_1.Utils.getBoundedRandom(amount);
	        if (typeof this.sunGradient != 'undefined')
	            this.sunGradient += utils_1.Utils.getBoundedRandom(amount);
	    };
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
	    ReactAction.prototype.mutate = function (amount) {
	        if (amount === void 0) { amount = 1; }
	    };
	    return ReactAction;
	}());
	exports.ReactAction = ReactAction;
	var SpecializeAction = (function () {
	    function SpecializeAction(args) {
	        this.toType = args['toType'];
	    }
	    SpecializeAction.prototype.mutate = function (amount) {
	        if (amount === void 0) { amount = 1; }
	    };
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
	    Angle.directionDeltaRow = function (direction) {
	        if (direction == Direction.up) {
	            return -1;
	        }
	        else if (direction == Direction.down) {
	            return 1;
	        }
	        return 0;
	    };
	    Angle.directionDeltaCol = function (direction) {
	        if (direction == Direction.left) {
	            return -1;
	        }
	        else if (direction == Direction.right) {
	            return 1;
	        }
	        return 0;
	    };
	    /*
	    Return a random Direction enum based on the angle.
	    sampleDirection(0) returns Direction.RIGHT.
	    sampleDirection(Math.PI/4) is a 50-50 chance UP or RIGHT.
	    */
	    Angle.sampleDirection = function (angle) {
	        angle = Angle.canonical(angle);
	        if (angle == Angle.RIGHT)
	            return Direction.right;
	        if (angle == Angle.UP)
	            return Direction.up;
	        if (angle == Angle.LEFT)
	            return Direction.left;
	        if (angle == Angle.DOWN)
	            return Direction.down;
	        // d1, d2 specify the quadrant
	        var d1, d2;
	        if (angle > Angle.RIGHT && angle < Angle.UP) {
	            d1 = Direction.right;
	            d2 = Direction.up;
	        }
	        else if (angle > Angle.UP && angle < Angle.LEFT) {
	            d1 = Direction.up;
	            d2 = Direction.left;
	        }
	        else if (angle > Angle.LEFT && angle < Angle.DOWN) {
	            d1 = Direction.left;
	            d2 = Direction.down;
	        }
	        else {
	            d1 = Direction.down;
	            d2 = Direction.right;
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
	var Direction;
	(function (Direction) {
	    Direction[Direction["right"] = 0] = "right";
	    Direction[Direction["up"] = 1] = "up";
	    Direction[Direction["left"] = 2] = "left";
	    Direction[Direction["down"] = 3] = "down";
	})(Direction || (Direction = {}));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var dna_1 = __webpack_require__(6);
	var simulation_1 = __webpack_require__(1);
	var Evolution = (function (_super) {
	    __extends(Evolution, _super);
	    function Evolution(drawCanvas) {
	        _super.call(this, drawCanvas);
	        this.generation = 0;
	    }
	    Evolution.prototype.doEvolution = function (ngenerations, seed) {
	        if (ngenerations === void 0) { ngenerations = 4; }
	        if (!seed) {
	            seed = new dna_1.DNA();
	        }
	        // this.FRAME_DELAY = 20;
	        // for (var i = 0; i < length; ++i) {
	        //     var mutated = seed.copyAndMutate();
	        //     this.runForNTicks(5);
	        //     // code...
	        // }
	        // this.setupSimulation(mutated);
	        // return seed;
	        var best = seed;
	        // for (var i = 0; i < ngenerations; ++i) {
	        best = this.runGenerationSelectBest(10, best, 4);
	        // }
	        return best;
	    };
	    Evolution.prototype.runGenerationSelectBest = function (nchildren, seed, growtime) {
	        // grow the seed for growtime iterations, then eval its fitness
	        if (growtime === void 0) { growtime = 40; }
	        // generate random children
	        var children = new Array(nchildren);
	        // make n copies of the dna
	        for (var i = 0; i < nchildren; ++i) {
	            children[i] = seed.copyAndMutate();
	        }
	        // evaluate each one's fitness
	        var fitness = new Array(nchildren);
	        var i = 0;
	        var self = this;
	        window.setInterval(function () {
	            // this function will return immediately and then run grow on all children
	            self.runGenerationSelectBestHelper(nchildren, seed, growtime, children, fitness, i);
	            self.generation++;
	            self.updateStatus();
	            i++;
	        }, this.FRAME_DELAY);
	        window['fitness'] = fitness;
	        window['children'] = children;
	        return null;
	    };
	    Evolution.prototype.updateStatus = function () {
	        var status;
	        if (this.isSimulationRunning)
	            status = 'Simulation running. ';
	        else
	            status = 'Simulation stopped. ';
	        if (!this.drawEnabled)
	            status += '(Draw disabled.) ';
	        status += "Generation " + this.generation + ". ";
	        this.showStatusString(status);
	    };
	    /* Recursive function */
	    Evolution.prototype.runGenerationSelectBestHelper = function (nchildren, seed, growtime, children, fitness, child_index) {
	        if (growtime === void 0) { growtime = 40; }
	        this.setupSimulation(children[child_index]);
	        this.runForNTicks(growtime);
	        fitness[child_index] = this.evalFitness(this.automata.plant);
	        // Recursive call on the next animation frame
	        // if (child_index + 1 < nchildren) {
	        //     var self = this;
	        //     requestAnimationFrame(function() {
	        //         self.runGenerationSelectBestHelper(nchildren, seed, growtime, children, fitness, child_index + 1);
	        //     })
	        // }
	    };
	    Evolution.prototype.evalFitness = function (plant) {
	        return plant.length;
	    };
	    return Evolution;
	}(simulation_1.Simulation));
	exports.Evolution = Evolution;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var CellTypeSerializer = (function () {
	    function CellTypeSerializer() {
	    }
	    CellTypeSerializer.serialize = function (celltype) {
	        return "";
	    };
	    CellTypeSerializer.deserialize = function (serial) {
	        return {};
	    };
	    return CellTypeSerializer;
	}());
	exports.CellTypeSerializer = CellTypeSerializer;
	var CellType = (function () {
	    function CellType() {
	    }
	    CellType.type_up = 0;
	    CellType.type_right = 1;
	    CellType.type_rest = 2;
	    return CellType;
	}());
	exports.CellType = CellType;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map