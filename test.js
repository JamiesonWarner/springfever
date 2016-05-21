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
	var perceptron_1 = __webpack_require__(9);
	var dna_1 = __webpack_require__(8);
	describe("");
	describe("dnaSerializer", function () {
	    it("works", function () {
	        var dna = new dna_1.DNA();
	        dna.mutate(1);
	        var val = dna.cellTypes[0].actionPerceptrons[0].activate([1, 2, 3, 4, 5, 6]);
	        var dna2 = dna.clone();
	        var val2 = dna2.cellTypes[0].actionPerceptrons[0].activate([1, 2, 3, 4, 5, 6]);
	        console.log(val, val2);
	        expect(val).toEqual(val2);
	        expect(dna).not.toEqual(dna2);
	    });
	});
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
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(4);
	var action_1 = __webpack_require__(6);
	var angle_1 = __webpack_require__(7);
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
	                    water = Automata.MATERIAL_DIRT_WATER_MEAN;
	                else
	                    water = Automata.MATERIAL_AIR_WATER_MEAN;
	                // Uncomment to make a random amount of starting water
	                // water = Math.random() * 2 * Automata.MATERIAL_AIR_WATER_MEAN;
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
	        this.plant = seed.plantSeed(this.cellArray, this.fluidsArray);
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
	        var tx = x / Automata.CELL_SCALE_PIXELS;
	        var ty = y / Automata.CELL_SCALE_PIXELS;
	        var row = Math.floor(ty);
	        var col = Math.floor(tx);
	        var fluids = this.fluidsArray[row][col];
	        document.getElementById('bar-water').style.width = fluids.vector[fluids_1.Fluids.WATER] + 'px';
	        document.getElementById('bar-glucose').style.width = fluids.vector[fluids_1.Fluids.GLUCOSE] + 'px';
	        document.getElementById('bar-auxin').style.width = (40 * fluids.vector[fluids_1.Fluids.AUXIN]) + 'px';
	        document.getElementById('text-water').innerHTML = "" + fluids.vector[fluids_1.Fluids.WATER];
	        document.getElementById('text-glucose').innerHTML = "" + fluids.vector[fluids_1.Fluids.GLUCOSE];
	        document.getElementById('text-auxin').innerHTML = "" + fluids.vector[fluids_1.Fluids.AUXIN];
	    };
	    Automata.prototype.update = function () {
	        //console.log("tick");
	        // if (this.plant.length)
	        //     console.log('cell fluids', this.plant[0].fluids.vector);
	        this.doCellActions();
	        this.doPassiveFlowAndPhotosynthesis();
	        this.doCellMetabolism();
	        this.cellDeath();
	        // this.signalsUpdate();
	    };
	    Automata.prototype.doCellActions = function () {
	        // Calc actions on this frame
	        var actions = new Array(this.plant.length);
	        var cell;
	        for (var i = 0; i < this.plant.length; i++) {
	            cell = this.plant[i];
	            actions[i] = cell.chooseAction();
	        }
	        // Apply actions on this frame
	        for (var i = 0; i < actions.length; i++) {
	            if (!actions[i]) {
	                continue; // cell chose to do nothing
	            }
	            var action = actions[i];
	            var cell = this.plant[i];
	            // console.log(action);
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
	                    if (this.plant[i].fluids.vector[j] < cost.vector[j]) {
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
	                if (this.cellArray[gI][gJ]) {
	                    // console.log("cell already exists at " + gJ + ", " + gI);
	                    continue;
	                }
	                this.subtractFluids(cell.fluids, cost);
	                var newFluids = this.splitFluids(cell.fluids);
	                var nCell = new cell_1.Cell(this.dna, cell.type, newFluids, gI, gJ, this.cellArray);
	                this.plant.push(nCell);
	                this.fluidsArray[gI][gJ] = newFluids;
	                this.cellArray[gI][gJ] = nCell;
	            }
	            else if (action instanceof action_1.SpecializeAction) {
	                var saction = action;
	                cell.setType(saction.toType);
	            }
	            else if (action instanceof action_1.PumpAction) {
	                console.log('pumping....');
	                var paction = action;
	                var neighborUp = this.fluidsArray[cell.row - 1][cell.col];
	                var neighborRight = this.fluidsArray[cell.row][cell.col + 1];
	                var neighborDown = this.fluidsArray[cell.row + 1][cell.col];
	                var neighborLeft = this.fluidsArray[cell.row][cell.col - 1];
	                // console.log('a');
	                var angle = paction.getActionDirection(neighborUp, neighborRight, neighborDown, neighborLeft);
	                // console.log('b');
	                var direction = angle_1.Angle.sampleDirection(angle);
	                var drow = angle_1.Angle.directionDeltaRow(direction);
	                var dcol = angle_1.Angle.directionDeltaCol(direction);
	                var gI = this.plant[i].row + drow;
	                var gJ = this.plant[i].col + dcol;
	                if (gI < 0 || gI >= Automata.GRID_N_ROWS || gJ < 0 || gJ >= Automata.GRID_N_COLUMNS) {
	                    continue;
	                }
	                // console.log('c');
	                var targetFluidVec = this.fluidsArray[gI][gJ].vector;
	                var fluidVec = cell.fluids.vector;
	                for (var j = 0; j < paction.fluids.length; ++j) {
	                    // move d fluids from fluidVec to targetFluidVec
	                    // if d is negative then this is "pulling" fluids
	                    var d = paction.fluids[j];
	                    // let the plant "cheat": only pump *from* environment, *to* other plant cells
	                    if (this.cellArray[gI][gJ]) {
	                        d = Math.abs(d);
	                    }
	                    else {
	                        d = -Math.abs(d);
	                    }
	                    // don't pump to negative fluids
	                    if (d > 0) {
	                        d = Math.min(d, fluidVec[j]);
	                    }
	                    else {
	                        d = Math.max(d, -targetFluidVec[j]);
	                    }
	                    fluidVec[j] -= d;
	                    targetFluidVec[j] += d;
	                }
	            }
	        }
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
	            if (cell.fluids.vector[fluids_1.Fluids.GLUCOSE] < MIN_GLUCOSE) {
	            }
	            if (cell.fluids.vector[fluids_1.Fluids.WATER] < MIN_WATER) {
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
	    Automata.prototype.doCellMetabolism = function () {
	        // respiration. this is needed for metabolism
	        var RESPIRATION_AMOUNT = 0.01;
	        for (var i = 0; i < this.plant.length; ++i) {
	            var cell = this.plant[i];
	            cell.fluids.vector[fluids_1.Fluids.WATER] -= RESPIRATION_AMOUNT;
	            cell.fluids.vector[fluids_1.Fluids.GLUCOSE] -= RESPIRATION_AMOUNT;
	        }
	    };
	    Automata.prototype.doPassiveFlowAndPhotosynthesis = function () {
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
	                    var flowRate = 0.1;
	                    // air to air is very fast
	                    if (this.isAirNotCell(row, col) && this.isAirNotCell(neighbRow, neighbCol)) {
	                        flowRate = 0.2;
	                    }
	                    // disable passive flow from / to cells
	                    if (this.cellArray[row][col] || this.cellArray[neighbRow][neighbCol]) {
	                        // flowRate = 0.01
	                        continue;
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
	        // this.validateFluidsArray();
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
	                if (this.drawStyle === 'water') {
	                    var waterConcentration = fluids[fluids_1.Fluids.WATER] / (2 * Automata.MATERIAL_DIRT_WATER_MEAN);
	                    var waterColor = Math.max(Math.min(Math.round(255 * waterConcentration), 255), 0);
	                    var colorString = "#" + "0064" + this.getColorHex(waterColor);
	                    this.canvasCtx.fillStyle = colorString;
	                }
	                else if (this.drawStyle === 'glucose') {
	                    if (this.cellArray[row][col]) {
	                        this.canvasCtx.fillStyle = "#" + this.getColorHex(Math.min(255, Math.ceil(fluids[fluids_1.Fluids.GLUCOSE]))) + "0000";
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#000000";
	                    }
	                }
	                else if (this.drawStyle === 'auxin') {
	                    var cell = this.cellArray[row][col];
	                    if (cell) {
	                        this.canvasCtx.fillStyle = "#" + "0000" + this.getColorHex(Math.min(255, Math.ceil(255 * fluids[fluids_1.Fluids.SIGNALS_START])));
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = "#000000";
	                    }
	                }
	                else {
	                    var cell = this.cellArray[row][col];
	                    if (cell) {
	                        this.canvasCtx.fillStyle = cell.type.color;
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
	                if (this.drawStyle == 'water' || this.drawStyle == 'glucose' || this.drawStyle == 'auxin') {
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
	var fluids_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(5);
	/*
	Cell is a fleighweight object for the Grid. Systems.
	Plus they also have context for fitting into the Grid.
	It can also be thought of as a DNA controller.
	*/
	var Cell = (function () {
	    function Cell(dna, type, fluids, row, col, cellArray) {
	        this.row = row;
	        this.col = col;
	        this.fluids = fluids;
	        this.dna = dna;
	        this.setType(type);
	        this.cellArray = cellArray;
	    }
	    Cell.prototype.sumFluids = function () {
	        // Only sum "actual" fluids, not hormones.
	        var glucoseWeight = 1.5;
	        return this.fluids.vector[fluids_1.Fluids.WATER] + glucoseWeight * this.fluids.vector[fluids_1.Fluids.GLUCOSE];
	    };
	    /*
	    Pass either a literal type object or a numerical type index referencing dna type definitions
	    */
	    Cell.prototype.setType = function (type) {
	        if (typeof type === 'number') {
	            this.type = this.dna.cellTypes[type];
	        }
	        else {
	            this.type = type;
	        }
	    };
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
	        var input = this.fluids.vector.concat([
	            !!this.cellArray[this.row - 1][this.col],
	            !!this.cellArray[this.row + 1][this.col],
	            !!this.cellArray[this.row][this.col - 1],
	            !!this.cellArray[this.row][this.col + 1]
	        ]);
	        for (var i = 0; i < actions.length; ++i) {
	            potentials[i] = this.type.actionPerceptrons[i].activate(input)[0]; // this.getActionPotential(actions[i]);
	        }
	        var bestIndex = utils_1.Utils.argmax(potentials);
	        // console.log('choosing action, ', actions[bestIndex]);
	        if (potentials[bestIndex] < 0.5) {
	            return null; // "empty" action
	        }
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
/***/ function(module, exports) {

	"use strict";
	var Fluids = (function () {
	    function Fluids() {
	        var vec = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            vec[_i - 0] = arguments[_i];
	        }
	        this.vector = new Array(Fluids.N_FLUIDS);
	        for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
	            this.vector[i] = vec[i] || 0;
	        }
	    }
	    // getPressureInArea(area: number): number {
	    //     return this.sumFluids() / area;
	    // }
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
	    /*
	    Returns a random number between -bound and bound
	    */
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
	        else if (action instanceof PumpAction) {
	            obj['fluids'] = action.fluids;
	        }
	        return JSON.stringify(obj);
	    };
	    ActionSerializer.deserialize = function (jsonAction) {
	        var obj = jsonAction;
	        try {
	            if (typeof obj === 'string') {
	                obj = JSON.parse(jsonAction);
	            }
	        }
	        catch (e) {
	            console.log('Failure to parse action: ', jsonAction);
	            throw e;
	        }
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
	                console.log(obj, typeof obj);
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
	        this.fluids = args['fluids'] || [];
	    }
	    PumpAction.prototype.mutate = function (amount) {
	        if (amount === void 0) { amount = 1; }
	        _super.prototype.mutate.call(this, amount);
	        for (var i = 0; i < this.fluids.length; ++i) {
	            var r = utils_1.Utils.getBoundedRandom(amount);
	            this.fluids[i] += r;
	        }
	    };
	    return PumpAction;
	}(DirectionalAction));
	exports.PumpAction = PumpAction;
	var ReactAction = (function () {
	    function ReactAction(args) {
	        this.reaction = args['reaction'];
	    }
	    // mutating a react action should not change the reagents / products
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(4);
	var automata_1 = __webpack_require__(2);
	var action_1 = __webpack_require__(6);
	var perceptron_1 = __webpack_require__(9);
	var celltypes_1 = __webpack_require__(10);
	var DNA = (function () {
	    function DNA() {
	        window['dna'] = this;
	        this.actions = [
	            new action_1.DivideAction({ fluidGradient: [0, 0, -1, 0, 0, 0], gravityGradient: 2 }),
	            new action_1.DivideAction({ fluidGradient: [0, 0, 0, 0, 0, 0], gravityGradient: 2 }),
	            new action_1.PumpAction({ fluidGradient: [0, 0, 0, 0, 0, 0], fluids: [1, 0, 0, 0, 0, 0] }),
	            // new ReactAction({ reaction: [-0.2,0.8,0.1,0,0,0] }), //photosynth
	            // new ReactAction({ reaction: [0,0,0.1,0,0,0] }), // free auxin
	            // new ReactAction({ reaction: [0,0,0,0.1,0,0] }), // free misc hormones
	            // new ReactAction({ reaction: [0,0,0,0,0.1,0] }), // free misc hormones
	            // new ReactAction({ reaction: [0,0,0,0,0,0.1] }), // free misc hormones
	            // new ReactAction({ reaction: [0,0,0,-0.1,0,0] }), // free misc hormones
	            // new ReactAction({ reaction: [0,0,0,0,-0.1,0] }), // free misc hormones
	            // new ReactAction({ reaction: [0,0,0,0,0,-0.1] }), // free misc hormones
	            new action_1.SpecializeAction({ toType: 0 }),
	            new action_1.SpecializeAction({ toType: 1 }),
	            new action_1.SpecializeAction({ toType: 2 }),
	            new action_1.SpecializeAction({ toType: 3 }),
	            new action_1.SpecializeAction({ toType: 4 })
	        ];
	        // cell types
	        this.cellTypes = new Array(DNA.N_CELL_TYPES);
	        for (var i = 0; i < DNA.N_CELL_TYPES; ++i) {
	            var actionPerceptrons = [];
	            for (var j = 0; j < this.actions.length; ++j) {
	                actionPerceptrons[j] = new perceptron_1.Perceptron(fluids_1.Fluids.N_FLUIDS + 4, 8, 1);
	            }
	            this.cellTypes[i] = {
	                color: DNA.COLOR_HEX_ARRAY[i % DNA.COLOR_HEX_ARRAY.length],
	                isLeaf: i == 4,
	                cost: new fluids_1.Fluids(0.2, 0.2),
	                actionPerceptrons: actionPerceptrons
	            };
	        }
	    }
	    DNA.prototype.clone = function () {
	        var serial = DNASerializer.serialize(this);
	        return DNASerializer.deserialize(serial);
	    };
	    DNA.prototype.mutate = function (amount) {
	        if (amount === void 0) { amount = 1; }
	        // mutate actions
	        for (var i = 0; i < this.actions.length; ++i) {
	            var action = this.actions[i];
	            action.mutate(amount);
	        }
	        // mutate type controllers
	        for (var i = 0; i < this.cellTypes.length; ++i) {
	            var type = this.cellTypes[i];
	            for (var j = 0; j < type.actionPerceptrons; ++j) {
	                var p = type.actionPerceptrons[j];
	                p.perturb(amount);
	            }
	        }
	    };
	    DNA.prototype.plantSeed = function (cellArray, fluidsArray) {
	        // compute initial fluid vectors
	        var waterInitial = 20; // 1.75 * Automata.MATERIAL_WATER_WATER_MEAN;
	        var glucoseInitial = 20; // 4.0;
	        var fluids1 = new fluids_1.Fluids(waterInitial, glucoseInitial), fluids2 = new fluids_1.Fluids(waterInitial, glucoseInitial), fluids;
	        // reference coordinates
	        var rowCenterOfGrid = Math.floor(automata_1.Automata.GRID_N_ROWS / 2), colCenterOfGrid = Math.floor(automata_1.Automata.GRID_N_COLUMNS / 2), 
	        // plant to create
	        plant = [], cell, 
	        // iterate.
	        rowStart = rowCenterOfGrid + 2, rowEnd = rowCenterOfGrid + 10, rowMid = Math.floor((rowStart + rowEnd) / 2), colStart = colCenterOfGrid - 2, colEnd = colCenterOfGrid + 2, colMid = Math.floor((colStart + colEnd) / 2);
	        for (var row = rowStart; row < rowMid; ++row) {
	            for (var col = colStart; col < colEnd; ++col) {
	                if (col == colMid)
	                    continue;
	                fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
	                cell = new cell_1.Cell(this, this.cellTypes[2], fluids, row, col, cellArray);
	                fluidsArray[row][col] = fluids;
	                cellArray[row][col] = cell;
	                plant.push(cell);
	            }
	        }
	        for (var row = rowMid; row < rowEnd; ++row) {
	            for (var col = colStart; col < colEnd; ++col) {
	                if (col == colMid)
	                    continue;
	                fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
	                cell = new cell_1.Cell(this, this.cellTypes[3], fluids, row, col, cellArray); // different type is only change
	                fluidsArray[row][col] = fluids;
	                cellArray[row][col] = cell;
	                plant.push(cell);
	            }
	        }
	        // create center column
	        // meristems
	        for (var row = rowStart; row < rowMid; ++row) {
	            var col = colMid;
	            fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
	            cell = new cell_1.Cell(this, this.cellTypes[0], fluids, row, col, cellArray);
	            fluidsArray[row][col] = fluids;
	            cellArray[row][col] = cell;
	            plant.push(cell);
	        }
	        for (var row = rowMid; row < rowEnd; ++row) {
	            var col = colMid;
	            fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
	            cell = new cell_1.Cell(this, this.cellTypes[1], fluids, row, col, cellArray);
	            fluidsArray[row][col] = fluids;
	            cellArray[row][col] = cell;
	            plant.push(cell);
	        }
	        return plant;
	    };
	    DNA.N_CELL_TYPES = 5;
	    DNA.COLOR_HEX_ARRAY = ["#ededbe", "#8F8F6E", "#6E6E8F", "#8F6E7F", "#80C4A1"];
	    return DNA;
	}());
	exports.DNA = DNA;
	/*
	Serialization is necessary to store the results of evolution so they can be played back, saved
	*/
	var DNASerializer = (function () {
	    function DNASerializer() {
	    }
	    DNASerializer.serialize = function (dna) {
	        var actionsSerial = new Array(dna.actions.length);
	        for (var i = 0; i < dna.actions.length; ++i) {
	            actionsSerial[i] = action_1.ActionSerializer.serialize(dna.actions[i]);
	        }
	        var cellTypesSerial = new Array(dna.cellTypes.length);
	        for (var i = 0; i < dna.cellTypes.length; ++i) {
	            cellTypesSerial[i] = celltypes_1.CellTypeSerializer.serialize(dna.cellTypes[i]);
	        }
	        return JSON.stringify({
	            cellTypes: cellTypesSerial,
	            actions: actionsSerial
	        });
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
	exports.DNASerializer = DNASerializer;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/*
	
	*/
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fluids_1 = __webpack_require__(4);
	var CellTypeSerializer = (function () {
	    function CellTypeSerializer() {
	    }
	    CellTypeSerializer.serialize = function (celltype) {
	        var perceptrons = celltype['actionPerceptrons'];
	        var perceptronsSerial = new Array(perceptrons.length);
	        for (var i = 0; i < perceptrons.length; ++i) {
	            perceptronsSerial[i] = perceptrons[i].toJSON();
	        }
	        return JSON.stringify({
	            color: celltype['color'],
	            isLeaf: celltype['isLeaf'],
	            cost: celltype['cost'].vector,
	            actionPerceptrons: perceptronsSerial
	        });
	    };
	    CellTypeSerializer.deserialize = function (serial) {
	        var obj = serial;
	        if (typeof serial === 'string') {
	            obj = JSON.parse(serial);
	        }
	        var perceptronsSerial = obj.actionPerceptrons;
	        var perceptrons = new Array(perceptronsSerial.length);
	        for (var i = 0; i < perceptronsSerial.length; ++i) {
	            perceptrons[i] = Network.fromJSON(perceptronsSerial[i]);
	        }
	        obj.actionPerceptrons = perceptrons;
	        obj.cost = new (Function.prototype.bind.apply(fluids_1.Fluids, obj.cost));
	        return obj;
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
//# sourceMappingURL=test.js.map