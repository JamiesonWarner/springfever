/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Fluids = /** @class */ (function () {
    function Fluids() {
        var vec = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vec[_i] = arguments[_i];
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Utils = /** @class */ (function () {
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cell_1 = __webpack_require__(3);
var fluids_1 = __webpack_require__(0);
var action_1 = __webpack_require__(4);
var angle_1 = __webpack_require__(5);
/*
TODO turn Automata into systems model.
Automata is a place for shared state.
Automata just stores stuff like the fluidsArray, and its state is transformed by Systems.
*/
var Automata = /** @class */ (function () {
    function Automata(runString, drawCanvas) {
        this.systems = new Array();
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
                // Uncomment line to make a random amount of starting water
                // water = Math.random() * 2 * Automata.MATERIAL_AIR_WATER_MEAN;
                this.fluidsArray[row][col] = new fluids_1.Fluids(water, 0);
            }
        }
        this.cellArray = new Array(Automata.GRID_N_ROWS);
        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
            this.cellArray[row] = new Array(Automata.GRID_N_COLUMNS);
            // for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
            //   this.cellArray[row][col] == undefined;
            // }
        }
        var self = this;
        drawCanvas.addEventListener("mousemove", function (event) {
            self.showInfo(event.offsetX, event.offsetY);
        });
    }
    Automata.prototype.makeCellsAtCoordinates = function (cellArray, fluidsArray) {
        // compute initial fluid vectors
        var waterInitial = 20; // 1.75 * Automata.MATERIAL_WATER_WATER_MEAN;
        var glucoseInitial = 20; // 4.0;
        var fluids;
        // reference coordinates
        var rowCenterOfGrid = Math.floor(Automata.GRID_N_ROWS / 2), colCenterOfGrid = Math.floor(Automata.GRID_N_COLUMNS / 2), 
        // plant to create
        plant = [], cell, 
        // iterate.
        rowStart = rowCenterOfGrid + 2, rowEnd = rowCenterOfGrid + 10, rowMid = Math.floor((rowStart + rowEnd) / 2), colStart = colCenterOfGrid - 2, colEnd = colCenterOfGrid + 2, colMid = Math.floor((colStart + colEnd) / 2);
        for (var row = rowStart; row < rowMid; ++row) {
            for (var col = colStart; col < colEnd; ++col) {
                if (col == colMid)
                    continue;
                fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
                cell = new cell_1.Cell(this, this.dna.cellTypes[2], fluids, row, col, cellArray);
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
                cell = new cell_1.Cell(this, this.dna.cellTypes[3], fluids, row, col, cellArray); // different type is only change
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
            cell = new cell_1.Cell(this, this.dna.cellTypes[0], fluids, row, col, cellArray);
            fluidsArray[row][col] = fluids;
            cellArray[row][col] = cell;
            plant.push(cell);
        }
        for (var row = rowMid; row < rowEnd; ++row) {
            var col = colMid;
            fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
            cell = new cell_1.Cell(this, this.dna.cellTypes[1], fluids, row, col, cellArray);
            fluidsArray[row][col] = fluids;
            cellArray[row][col] = cell;
            plant.push(cell);
        }
        return plant;
    };
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
        //   console.log('cell fluids', this.plant[0].fluids.vector);
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
            // if (actions[i]) {
            //   console.log(actions[i]);
            // }
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
                // console.log('cell killed due to lack of glucose');
            }
            if (cell.fluids.vector[fluids_1.Fluids.WATER] < MIN_WATER) {
                // console.log('cell killed due to lack of water');
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
    // used to estimate turgidity. Wolfram Alpha: mass of 1cm^3 water
    Automata.MATERIAL_WATER_WATER_MEAN = 1.0;
    // Wolfram Alpha: mass of 1 cm^3 moist soil - Wolfram Alpha: mass of 1cm^3 dry soil;
    Automata.MATERIAL_DIRT_WATER_MEAN = 0.21;
    // Wolfram Alpha: mass of water vapor in 1 cubic centimer air;
    Automata.MATERIAL_AIR_WATER_MEAN = 1.519e-5;
    return Automata;
}());
exports.Automata = Automata;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var fluids_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(1);
/*
Cell is a fleighweight object for the Grid. Systems.
Plus they also have context for fitting into the Grid.
It can also be thought of as a DNA controller.
*/
var Cell = /** @class */ (function () {
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = __webpack_require__(1);
var ActionSerializer = /** @class */ (function () {
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
            "class": cls
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
        switch (obj["class"]) {
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
var DirectionalAction = /** @class */ (function () {
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
var DivideAction = /** @class */ (function (_super) {
    __extends(DivideAction, _super);
    function DivideAction(args) {
        return _super.call(this, args) || this;
    }
    return DivideAction;
}(DirectionalAction));
exports.DivideAction = DivideAction;
var PumpAction = /** @class */ (function (_super) {
    __extends(PumpAction, _super);
    function PumpAction(args) {
        var _this = _super.call(this, args) || this;
        _this.fluids = args['fluids'] || [];
        return _this;
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
var ReactAction = /** @class */ (function () {
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
var SpecializeAction = /** @class */ (function () {
    function SpecializeAction(args) {
        this.toType = args['toType'];
    }
    SpecializeAction.prototype.mutate = function (amount) {
        if (amount === void 0) { amount = 1; }
    };
    return SpecializeAction;
}());
exports.SpecializeAction = SpecializeAction;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/*
Radian-based angles.
*/
var Angle = /** @class */ (function () {
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cell_1 = __webpack_require__(3);
var fluids_1 = __webpack_require__(0);
var automata_1 = __webpack_require__(2);
var action_1 = __webpack_require__(4);
var perceptron_1 = __webpack_require__(9);
var celltypes_1 = __webpack_require__(10);
/**
 * A lightweight DNA object to search over.
 * Plantrpg is searching for the maximum of fitness over the set of all possible DNA.
 *
*/
var DNA = /** @class */ (function () {
    function DNA() {
        this.NEW_CELL_COST = new fluids_1.Fluids(0.2, 0.2);
        window['dna'] = this;
        this.actions = [
            // new DivideAction({ fluidGradient: [0,0,-1,0,0,0], gravityGradient: 2 }),
            // new DivideAction({ fluidGradient: [0,0,0,0,0,0], gravityGradient: 2 }),
            new action_1.PumpAction({ fluidGradient: [0, 0, 0, 0, 0, 0], fluids: [1, 0, 0, 0, 0, 0] }),
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
                cost: this.NEW_CELL_COST,
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
var DNASerializer = /** @class */ (function () {
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
app.js
The view provider layer!
This calls:
(simulationStart) when
*/
exports.__esModule = true;
var simulation_1 = __webpack_require__(8);
var angle_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(1);
var dna_1 = __webpack_require__(6);
document.addEventListener("DOMContentLoaded", function (event) {
    var drawCanvas = document.getElementById("draw");
    var sim = new simulation_1.Simulation(drawCanvas);
    // var sim = new Evolution(drawCanvas);
    sim.run();
    var simOn = sim.isSimulationRunning;
    window['toggleSimulation'] = function () {
        if (simOn) {
            sim.pause();
        }
        else {
            sim.run();
        }
        simOn = !simOn;
    };
    window['resetSimulation'] = function () {
        console.log("=== Resetting simulation ===");
        sim.reset();
    };
    window['toggleDraw'] = sim.toggleDraw.bind(sim);
    window['drawStyle'] = sim.drawStyle.bind(sim);
    // sim.runForNTicks(100);
    // DEBUG //
    // window['automata'] = sim.automata;
    window['simulation'] = sim;
    window['Angle'] = angle_1.Angle;
    window['Utils'] = utils_1.Utils;
    window['DNASerializer'] = dna_1.DNASerializer;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
app.ts
*/
exports.__esModule = true;
var automata_1 = __webpack_require__(2);
var dna_1 = __webpack_require__(6);
var Simulation = /** @class */ (function () {
    function Simulation(drawCanvas) {
        this.FRAME_DELAY = 80;
        this.tick = 0;
        this.drawCanvas = drawCanvas;
        this.drawEnabled = true;
        // this.dna = DNASerializer.deserialize(MY_PLANT); // to load DNA from a file
        // this.dna = new DNA();
        this.reset();
    }
    Simulation.prototype.reset = function (dna) {
        this.showStatusString('Resetting...');
        this.tick = 0;
        if (!dna) {
            dna = new dna_1.DNA();
            dna.mutate(10);
        }
        var viewTemp = this.automata && this.automata.drawStyle;
        this.automata = new automata_1.Automata('prototype', this.drawCanvas);
        this.automata.plantSeed(dna);
        if (viewTemp)
            this.automata.drawStyle = viewTemp;
        window['fitness'] = this.fitness = [];
        // if (this.isSimulationRunning) {
        //     this.updatePlantForever();
        // }
    };
    Simulation.prototype.run = function () {
        if (this.isSimulationRunning) {
            throw new TypeError("Simulation is already running");
        }
        if (this.drawEnabled) {
            this.automata.draw();
        }
        this.isSimulationRunning = true;
        this.updateStatus();
        this.updatePlantForever();
    };
    // weird self-calling function
    Simulation.prototype.updatePlantForever = function () {
        if (!this.isSimulationRunning) {
            return;
        }
        try {
            this.fitness[this.tick] = this.evalFitness(this.automata.plant);
            this.automata.update();
        }
        catch (e) {
            console.warn("Automata error! Stopping simulation...");
            this.pause();
            throw e;
        }
        if (this.drawEnabled) {
            try {
                this.automata.draw();
            }
            catch (e) {
                console.warn("Draw error! Stopping simulation...");
                this.pause();
                throw e;
            }
        }
        this.tick++;
        this.updateStatus();
        window.setTimeout(this.updatePlantForever.bind(this), this.FRAME_DELAY);
    };
    Simulation.prototype.evalFitness = function (plant) {
        var tfluids = 0;
        for (var i = 0; i < plant.length; ++i) {
            var cell = plant[i];
            tfluids += cell.sumFluids();
        }
        return tfluids;
    };
    Simulation.prototype.runForNTicks = function (N) {
        // run sim for N ticks
        for (var n = 0; n < N; ++n) {
            this.automata.update();
        }
        this.automata.draw();
    };
    Simulation.prototype.pause = function () {
        if (!this.isSimulationRunning) {
            throw new TypeError("Simulation is already paused");
        }
        window.clearTimeout(this.updateInterval);
        this.isSimulationRunning = false;
        this.showStatusString('Simulation stopped.');
    };
    Simulation.prototype.toggleSimulation = function () {
        if (this.isSimulationRunning)
            this.pause();
        else
            this.run();
    };
    Simulation.prototype.toggleDraw = function () {
        this.drawEnabled = !this.drawEnabled;
        this.updateStatus();
    };
    Simulation.prototype.drawStyle = function (style) {
        console.log('drawStyle', style);
        this.automata.drawStyle = style;
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
        status += "Tick " + this.tick;
        if (this.midUpdate)
            status += "*";
        this.showStatusString(status);
    };
    Simulation.prototype.showStatusString = function (status) {
        document.getElementById("status").innerHTML = status;
    };
    return Simulation;
}());
exports.Simulation = Simulation;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/*

*/
var Perceptron = /** @class */ (function (_super) {
    __extends(Perceptron, _super);
    function Perceptron() {
        var nnodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nnodes[_i] = arguments[_i];
        }
        return _super.apply(this, nnodes) || this;
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var fluids_1 = __webpack_require__(0);
var CellTypeSerializer = /** @class */ (function () {
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
var CellType = /** @class */ (function () {
    function CellType() {
    }
    CellType.type_up = 0;
    CellType.type_right = 1;
    CellType.type_rest = 2;
    return CellType;
}());
exports.CellType = CellType;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDlkNWEyOTk1Y2EyYzEyMjBkMDMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ZsdWlkcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2F1dG9tYXRhLnRzIiwid2VicGFjazovLy8uL2FwcC9jZWxsLnRzIiwid2VicGFjazovLy8uL2FwcC9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FuZ2xlLnRzIiwid2VicGFjazovLy8uL2FwcC9kbmEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvc2ltdWxhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcGVyY2VwdHJvbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2VsbHR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzNEQTtJQVdJO1FBQVksYUFBTTthQUFOLFVBQU0sRUFBTixxQkFBTSxFQUFOLElBQU07WUFBTix3QkFBTTs7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENB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R0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7NEJBQ3hDLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQztnQ0FDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQ0FDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQ0FDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUM5RCxDQUFDO2dDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7b0NBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEtBQUssR0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQ0FDOUQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29DQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUMxRCxDQUFDO2dDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29DQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLEtBQUssR0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQ0FDbEUsQ0FBQztnQ0FDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUMx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QyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELElBQUksaUJBQWlCLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1FBQzlDLElBQUksV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDaEQsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztRQUNwQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDO0FBakNZLGdEQUFrQjtBQW1DL0I7SUFBQTtJQUlBLENBQUM7SUFIVSxnQkFBTyxHQUFHLENBQUMsQ0FBQztJQUNaLG1CQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ2Ysa0JBQVMsR0FBRyxDQUFDLENBQUM7SUFDekIsZUFBQztDQUFBO0FBSlksNEJBQVEiLCJmaWxlIjoiLi9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwOWQ1YTI5OTVjYTJjMTIyMGQwMyIsImltcG9ydCB7QXV0b21hdGF9IGZyb20gXCIuL2F1dG9tYXRhXCI7XG5cbmV4cG9ydCBjbGFzcyBGbHVpZHMge1xuICAgIHN0YXRpYyBXQVRFUiA9IDA7XG4gICAgc3RhdGljIEdMVUNPU0UgPSAxO1xuICAgIHN0YXRpYyBBVVhJTiA9IDI7XG5cbiAgICBzdGF0aWMgU0lHTkFMU19TVEFSVCA9IDI7XG4gICAgc3RhdGljIE5fU0lHTkFMUyA9IDQ7XG4gICAgc3RhdGljIE5fRkxVSURTID0gMiArIEZsdWlkcy5OX1NJR05BTFM7XG5cbiAgICB2ZWN0b3I7XG5cbiAgICBjb25zdHJ1Y3RvciguLi52ZWMpIHtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgQXJyYXkoRmx1aWRzLk5fRkxVSURTKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBGbHVpZHMuTl9GTFVJRFM7ICsraSkge1xuICAgICAgICAgICAgdGhpcy52ZWN0b3JbaV0gPSB2ZWNbaV0gfHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldFByZXNzdXJlSW5BcmVhKGFyZWE6IG51bWJlcik6IG51bWJlciB7XG4gICAgLy8gICAgIHJldHVybiB0aGlzLnN1bUZsdWlkcygpIC8gYXJlYTtcbiAgICAvLyB9XG5cblxuXG4gICAgLypcbiAgICBHb2FsOiAgcVxuICAgICovXG5cbiAgICAvKlxuICAgIFJldHVybnMgdGhlIHF1YW50aXR5IG9mIGEgZ2l2ZW4gZmx1aWQsIHdoaWNoIGlzIHRoZSBhbW91bnQgb2YgYSBzdWJzdGFuY2UgcGVyIHVuaXQgdm9sdW1lLlxuICAgIGRpdmlkZWQgYnkgdGhlIHRvdGFsIGZsdWlkLlxuXG4gICAgKi9cblxuICAgIC8qXG5cbiAgICAqL1xuICAgIGdldEZsdWlkQ29uY2VudHJhdGlvbihmbHVpZElkLCBhcmVhKSB7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgIERpZmZ1c2l2ZSBmbHV4IGlzIHJhdGUgb2YgZmxvdyBwZXIgdW5pdCBhcmVhLiBQb3NpdGl2ZSB2YWx1ZSBtZWFucyBvdXR3YXJkIGZsb3cuXG5cbiAgICBGaWNrJ3MgbGF3IG9mIGRpZmZ1c2lvbjogSiA9IC1EIChkIHBoaSkvKGQgeClcbiAgICBKIGlzIGRpZmZ1c2l2ZSBmbHV4XG4gICAgRCBpcyBkaWZmdXNpb24gY29lZmZpY2llbnRcbiAgICBwaGkgaXMgYW1vdW50IG9mXG4gICAgeCBpcyBwb3NpdGlvblxuICAgICovXG4gICAgZ2V0RGlmZnVzaXZlRmx1eCh0b0ZsdWlkLCBhcmVhMSwgYXJlYTIpe31cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2ZsdWlkcy50cyIsImV4cG9ydCBjbGFzcyBVdGlscyB7XG5cbiAgLypcbiAgUmV0dXJucyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAtYm91bmQgYW5kIGJvdW5kXG4gICovXG4gIHN0YXRpYyBnZXRCb3VuZGVkUmFuZG9tKGJvdW5kKSB7XG4gICAgcmV0dXJuIDIgKiBib3VuZCAqIE1hdGgucmFuZG9tKCkgLSBib3VuZDtcbiAgfVxuXG4gIHN0YXRpYyBjcm9zc1Byb2R1Y3QoYXJyMSwgYXJyMikge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIHZhciBsZW5ndGggPSBNYXRoLm1pbihhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgIHN1bSArPSBhcnIxW2ldICogYXJyMltpXTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbiAgfVxuXG4gIHN0YXRpYyBsMm5vcm0oYXJyKSB7XG4gICAgICB2YXIgbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIG4gKz0gYXJyW2ldICogYXJyW2ldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hdGguc3FydChuKTtcbiAgfVxuXG4gIHN0YXRpYyBsMW5vcm0oYXJyKSB7XG4gICAgdmFyIG4gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICBuICs9IGFycltpXTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG4gIH1cblxuXG4gIHN0YXRpYyBkaXN0YW5jZVRvUGxhbmUoZmx1aWRzLCBhY3RpdmF0b3IpIHtcbiAgICB2YXIgbm9ybVcgPSBVdGlscy5sMm5vcm0oYWN0aXZhdG9yLncpO1xuXG4gICAgdmFyIGQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZCArPSBmbHVpZHNbaV0gKiBhY3RpdmF0b3JbaV07XG4gICAgfVxuICAgIGQgKz0gYWN0aXZhdG9yLmI7XG4gICAgcmV0dXJuIGQgLyBub3JtVztcbiAgfVxuXG4gIC8qXG4gIFNpZ21vaWQgYWN0aXZhdG9yLlxuICBSZXR1cm5zIHZhbHVlIGZyb20gMCB0byAxIGdpdmVuIGYgZnJvbSAtaW5mIHRvIGluZi5cbiAgKi9cbiAgc3RhdGljIGFjdGl2YXRvckZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiAxIC8gKDEgKyBNYXRoLmV4cCgtdikpO1xuICB9XG5cbiAgc3RhdGljIGFyZ21heChhcnI6IEFycmF5PG51bWJlcj4pIHtcbiAgICBpZiAoIWFyci5sZW5ndGgpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgdmFyIG1heCA9IGFyclswXTtcbiAgICB2YXIgYXJnbWF4ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGFycltpXSA+IG1heCkge1xuICAgICAgICBhcmdtYXggPSBpO1xuICAgICAgICBtYXggPSBhcnJbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ21heDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3V0aWxzLnRzIiwiaW1wb3J0IHtETkF9IGZyb20gXCIuL2RuYVwiO1xuaW1wb3J0IHtDZWxsfSBmcm9tIFwiLi9jZWxsXCJcbmltcG9ydCB7RGlydH0gZnJvbSBcIi4vZGlydFwiO1xuaW1wb3J0IHtGbHVpZHN9IGZyb20gXCIuL2ZsdWlkc1wiO1xuaW1wb3J0IHtJU3lzdGVtfSBmcm9tIFwiLi9zeXN0ZW1cIjtcbmltcG9ydCB7SUFjdGlvbiwgRGl2aWRlQWN0aW9uLCBSZWFjdEFjdGlvbiwgU3BlY2lhbGl6ZUFjdGlvbiwgUHVtcEFjdGlvbn0gZnJvbSBcIi4vYWN0aW9uXCI7XG5pbXBvcnQge0FuZ2xlfSBmcm9tIFwiLi9hbmdsZVwiO1xuXG4vKlxuVE9ETyB0dXJuIEF1dG9tYXRhIGludG8gc3lzdGVtcyBtb2RlbC5cbkF1dG9tYXRhIGlzIGEgcGxhY2UgZm9yIHNoYXJlZCBzdGF0ZS5cbkF1dG9tYXRhIGp1c3Qgc3RvcmVzIHN0dWZmIGxpa2UgdGhlIGZsdWlkc0FycmF5LCBhbmQgaXRzIHN0YXRlIGlzIHRyYW5zZm9ybWVkIGJ5IFN5c3RlbXMuXG4qL1xuZXhwb3J0IGNsYXNzIEF1dG9tYXRhIHtcbiAgc3RhdGljIEdSSURfTl9DT0xVTU5TID0gMTIwO1xuICBzdGF0aWMgR1JJRF9OX1JPV1MgPSAxMDA7XG4gIHN0YXRpYyBDRUxMX1NDQUxFX1BJWEVMUyA9IDg7XG5cbiAgLy8gdXNlZCB0byBlc3RpbWF0ZSB0dXJnaWRpdHkuIFdvbGZyYW0gQWxwaGE6IG1hc3Mgb2YgMWNtXjMgd2F0ZXJcbiAgc3RhdGljIE1BVEVSSUFMX1dBVEVSX1dBVEVSX01FQU4gPSAxLjA7XG4gIC8vIFdvbGZyYW0gQWxwaGE6IG1hc3Mgb2YgMSBjbV4zIG1vaXN0IHNvaWwgLSBXb2xmcmFtIEFscGhhOiBtYXNzIG9mIDFjbV4zIGRyeSBzb2lsO1xuICBzdGF0aWMgTUFURVJJQUxfRElSVF9XQVRFUl9NRUFOID0gMC4yMTtcbiAgLy8gV29sZnJhbSBBbHBoYTogbWFzcyBvZiB3YXRlciB2YXBvciBpbiAxIGN1YmljIGNlbnRpbWVyIGFpcjtcbiAgc3RhdGljIE1BVEVSSUFMX0FJUl9XQVRFUl9NRUFOID0gMS41MTllLTU7XG5cbiAgY2FudmFzO1xuICBjYW52YXNDdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgZmx1aWRzQXJyYXk6IEFycmF5PEFycmF5PEZsdWlkcz4+O1xuICBjZWxsQXJyYXk6IEFycmF5PEFycmF5PENlbGw+PjsgLy8gdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vIGNlbGxcbiAgcGxhbnQ6IEFycmF5PENlbGw+O1xuICBkbmE7XG5cbiAgZHJhd1N0eWxlOiBzdHJpbmc7XG5cbiAgc3lzdGVtczogQXJyYXk8SVN5c3RlbT47XG5cbiAgY29uc3RydWN0b3IocnVuU3RyaW5nOiBTdHJpbmcsIGRyYXdDYW52YXM6IEVsZW1lbnQpIHtcbiAgICB0aGlzLnN5c3RlbXMgPSBuZXcgQXJyYXkoKTtcblxuICAgIHRoaXMuY2FudmFzID0gZHJhd0NhbnZhcztcbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgKiBBdXRvbWF0YS5DRUxMX1NDQUxFX1BJWEVMUyk7XG4gICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBBdXRvbWF0YS5HUklEX05fUk9XUyAqIEF1dG9tYXRhLkNFTExfU0NBTEVfUElYRUxTKTtcbiAgICB0aGlzLmNhbnZhc0N0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIHRoaXMuZmx1aWRzQXJyYXkgPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX1JPV1MpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3crKykge1xuICAgICAgdGhpcy5mbHVpZHNBcnJheVtyb3ddID0gbmV3IEFycmF5KEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TKTtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuXG4gICAgLy8gY3JlYXRlIGZsdWlkIGZvciBlYWNoIGxvY2F0aW9uIGluIHRoZSBmbHVpZHMgYXJyYXlcbiAgICB2YXIgd2F0ZXI7XG4gICAgaWYgKHRoaXMuaXNEaXJ0Q2VsbChyb3csIGNvbCkpXG4gICAgICB3YXRlciA9IEF1dG9tYXRhLk1BVEVSSUFMX0RJUlRfV0FURVJfTUVBTlxuICAgIC8vIFVuY29tbWVudCBsaW5lIHRvIG1ha2UgYSByYW5kb20gYW1vdW50IG9mIHN0YXJ0aW5nIHdhdGVyXG4gICAgLy8gd2F0ZXIgPSBNYXRoLnJhbmRvbSgpICogMiAqIEF1dG9tYXRhLk1BVEVSSUFMX0RJUlRfV0FURVJfTUVBTjtcbiAgICBlbHNlXG4gICAgICB3YXRlciA9IEF1dG9tYXRhLk1BVEVSSUFMX0FJUl9XQVRFUl9NRUFOXG4gICAgLy8gVW5jb21tZW50IGxpbmUgdG8gbWFrZSBhIHJhbmRvbSBhbW91bnQgb2Ygc3RhcnRpbmcgd2F0ZXJcbiAgICAvLyB3YXRlciA9IE1hdGgucmFuZG9tKCkgKiAyICogQXV0b21hdGEuTUFURVJJQUxfQUlSX1dBVEVSX01FQU47XG4gICAgdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBuZXcgRmx1aWRzKHdhdGVyLCAwKTtcbiAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jZWxsQXJyYXkgPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX1JPV1MpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3crKykge1xuICAgICAgdGhpcy5jZWxsQXJyYXlbcm93XSA9IG5ldyBBcnJheShBdXRvbWF0YS5HUklEX05fQ09MVU1OUyk7XG4gICAgLy8gZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG4gICAgLy8gICB0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF0gPT0gdW5kZWZpbmVkO1xuICAgIC8vIH1cbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZHJhd0NhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICBzZWxmLnNob3dJbmZvKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgIH0pXG4gIH1cblxuICBtYWtlQ2VsbHNBdENvb3JkaW5hdGVzICAoY2VsbEFycmF5OiBBcnJheTxBcnJheTxDZWxsPj4sIGZsdWlkc0FycmF5OiBBcnJheTxBcnJheTxGbHVpZHM+Pikge1xuICAgIC8vIGNvbXB1dGUgaW5pdGlhbCBmbHVpZCB2ZWN0b3JzXG4gICAgdmFyIHdhdGVySW5pdGlhbCA9IDIwOyAvLyAxLjc1ICogQXV0b21hdGEuTUFURVJJQUxfV0FURVJfV0FURVJfTUVBTjtcbiAgICB2YXIgZ2x1Y29zZUluaXRpYWwgPSAyMDsgLy8gNC4wO1xuICAgIHZhciBmbHVpZHM6IEZsdWlkcztcblxuICAgIC8vIHJlZmVyZW5jZSBjb29yZGluYXRlc1xuICAgIHZhciByb3dDZW50ZXJPZkdyaWQgPSBNYXRoLmZsb29yKEF1dG9tYXRhLkdSSURfTl9ST1dTIC8gMiksXG4gICAgICAgIGNvbENlbnRlck9mR3JpZCA9IE1hdGguZmxvb3IoQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgLyAyKSxcblxuICAgIC8vIHBsYW50IHRvIGNyZWF0ZVxuICAgICAgICBwbGFudDogQXJyYXk8Q2VsbD4gPSBbXSxcbiAgICAgICAgY2VsbDogQ2VsbCxcblxuICAgIC8vIGl0ZXJhdGUuXG4gICAgICAgIHJvd1N0YXJ0OiBudW1iZXIgPSByb3dDZW50ZXJPZkdyaWQgKyAyLFxuICAgICAgICByb3dFbmQ6IG51bWJlciA9IHJvd0NlbnRlck9mR3JpZCArIDEwLFxuICAgICAgICByb3dNaWQ6IG51bWJlciA9IE1hdGguZmxvb3IoKHJvd1N0YXJ0ICsgcm93RW5kKSAvIDIpLFxuICAgICAgICBjb2xTdGFydDogbnVtYmVyID0gY29sQ2VudGVyT2ZHcmlkIC0gMixcbiAgICAgICAgY29sRW5kOiBudW1iZXIgPSBjb2xDZW50ZXJPZkdyaWQgKyAyLFxuICAgICAgICBjb2xNaWQ6IG51bWJlciA9IE1hdGguZmxvb3IoKGNvbFN0YXJ0ICsgY29sRW5kKSAvIDIpO1xuICAgIGZvciAodmFyIHJvdyA9IHJvd1N0YXJ0OyByb3cgPCByb3dNaWQ7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSBjb2xTdGFydDsgY29sIDwgY29sRW5kOyArK2NvbCkge1xuICAgICAgICBpZiAoY29sID09IGNvbE1pZCkgY29udGludWU7XG4gICAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICAgIGNlbGwgPSBuZXcgQ2VsbCh0aGlzLCB0aGlzLmRuYS5jZWxsVHlwZXNbMl0sIGZsdWlkcywgcm93LCBjb2wsIGNlbGxBcnJheSk7XG4gICAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgICAgY2VsbEFycmF5W3Jvd11bY29sXSA9IGNlbGw7XG4gICAgICAgIHBsYW50LnB1c2goY2VsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciByb3cgPSByb3dNaWQ7IHJvdyA8IHJvd0VuZDsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IGNvbFN0YXJ0OyBjb2wgPCBjb2xFbmQ7ICsrY29sKSB7XG4gICAgICAgIGlmIChjb2wgPT0gY29sTWlkKSBjb250aW51ZTtcbiAgICAgICAgZmx1aWRzID0gbmV3IEZsdWlkcyh3YXRlckluaXRpYWwsIGdsdWNvc2VJbml0aWFsKTtcbiAgICAgICAgY2VsbCA9IG5ldyBDZWxsKHRoaXMsIHRoaXMuZG5hLmNlbGxUeXBlc1szXSwgZmx1aWRzLCByb3csIGNvbCwgY2VsbEFycmF5KTsgLy8gZGlmZmVyZW50IHR5cGUgaXMgb25seSBjaGFuZ2VcbiAgICAgICAgZmx1aWRzQXJyYXlbcm93XVtjb2xdID0gZmx1aWRzO1xuICAgICAgICBjZWxsQXJyYXlbcm93XVtjb2xdID0gY2VsbDtcbiAgICAgICAgcGxhbnQucHVzaChjZWxsKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBjZW50ZXIgY29sdW1uXG4gICAgLy8gbWVyaXN0ZW1zXG4gICAgZm9yICh2YXIgcm93ID0gcm93U3RhcnQ7IHJvdyA8IHJvd01pZDsgKytyb3cpIHtcbiAgICAgIHZhciBjb2wgPSBjb2xNaWQ7XG4gICAgICBmbHVpZHMgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpO1xuICAgICAgY2VsbCA9IG5ldyBDZWxsKHRoaXMsIHRoaXMuZG5hLmNlbGxUeXBlc1swXSwgZmx1aWRzLCByb3csIGNvbCwgY2VsbEFycmF5KTtcbiAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgcGxhbnQucHVzaChjZWxsKVxuICAgIH1cblxuICAgIGZvciAodmFyIHJvdyA9IHJvd01pZDsgcm93IDwgcm93RW5kOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgdGhpcy5kbmEuY2VsbFR5cGVzWzFdLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpO1xuICAgICAgZmx1aWRzQXJyYXlbcm93XVtjb2xdID0gZmx1aWRzO1xuICAgICAgY2VsbEFycmF5W3Jvd11bY29sXSA9IGNlbGw7XG4gICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgfVxuXG5cbiAgICByZXR1cm4gcGxhbnQ7XG4gIH1cblxuICBwbGFudFNlZWQoc2VlZDpETkEpIHtcbiAgICAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIHBsYW50cyBhbmQgYWRkIHRoZSBzcGVjaWZpZWQgc2VlZFxuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyArK3Jvdykge1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG4gICAgICAgIHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wbGFudCA9IHNlZWQucGxhbnRTZWVkKHRoaXMuY2VsbEFycmF5LCB0aGlzLmZsdWlkc0FycmF5KTtcbiAgICB0aGlzLmRuYSA9IHNlZWQ7XG4gIH1cblxuICBpc0FpckNlbGwocm93LGNvbCkge1xuICAgIHJldHVybiByb3cgPCA1MDtcbiAgfVxuICBpc0RpcnRDZWxsKHJvdyxjb2wpIHtcbiAgICByZXR1cm4gcm93ID49IDUwO1xuICB9XG5cbiAgcHJpbnRHcmlkRmx1aWRzKCkge1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyArK3Jvdykge1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmx1aWRzQXJyYXlbcm93XVtjb2xdLnZlY3Rvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVGbHVpZHNBcnJheSgpIHtcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBBdXRvbWF0YS5HUklEX05fUk9XUzsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmx1aWRzQXJyYXlbcm93XVtjb2xdLnZlY3RvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBmID09PSAndW5kZWZpbmVkJykgY29uc29sZS5sb2coJ3Jvdyxjb2wgYXJlOiAnLCByb3csIGNvbCk7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZi5sZW5ndGg7ICsraykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZltrXSAhPT0gJ251bWJlcicgfHwgaXNOYU4oZltrXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3I6IEludmFsaWQgZmx1aWQgdmVjdG9yIGF0OiAnICsgcm93KycsICcrY29sKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZba10gPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnV2FybmluZzogTmVnYXRpdmUgZmx1aWRzIGF0OiAnLCByb3csIGNvbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvd0luZm8oeCx5KSB7XG4gICAgdmFyIHR4ID0geCAvIEF1dG9tYXRhLkNFTExfU0NBTEVfUElYRUxTO1xuICAgIHZhciB0eSA9IHkgLyBBdXRvbWF0YS5DRUxMX1NDQUxFX1BJWEVMUztcbiAgICB2YXIgcm93ID0gTWF0aC5mbG9vcih0eSk7XG4gICAgdmFyIGNvbCA9IE1hdGguZmxvb3IodHgpXG4gICAgdmFyIGZsdWlkcyA9IHRoaXMuZmx1aWRzQXJyYXlbcm93XVtjb2xdO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXItd2F0ZXInKS5zdHlsZS53aWR0aCA9IGZsdWlkcy52ZWN0b3JbRmx1aWRzLldBVEVSXSArICdweCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhci1nbHVjb3NlJykuc3R5bGUud2lkdGggPSBmbHVpZHMudmVjdG9yW0ZsdWlkcy5HTFVDT1NFXSArICdweCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhci1hdXhpbicpLnN0eWxlLndpZHRoID0gKDQwKmZsdWlkcy52ZWN0b3JbRmx1aWRzLkFVWElOXSkgKyAncHgnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0LXdhdGVyJykuaW5uZXJIVE1MID0gXCJcIiArIGZsdWlkcy52ZWN0b3JbRmx1aWRzLldBVEVSXTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dC1nbHVjb3NlJykuaW5uZXJIVE1MID0gXCJcIiArIGZsdWlkcy52ZWN0b3JbRmx1aWRzLkdMVUNPU0VdO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0LWF1eGluJykuaW5uZXJIVE1MID0gXCJcIiArIGZsdWlkcy52ZWN0b3JbRmx1aWRzLkFVWElOXTtcblxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIC8vY29uc29sZS5sb2coXCJ0aWNrXCIpO1xuICAgIC8vIGlmICh0aGlzLnBsYW50Lmxlbmd0aClcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdjZWxsIGZsdWlkcycsIHRoaXMucGxhbnRbMF0uZmx1aWRzLnZlY3Rvcik7XG5cblxuICAgIHRoaXMuZG9DZWxsQWN0aW9ucygpO1xuICAgIHRoaXMuZG9QYXNzaXZlRmxvd0FuZFBob3Rvc3ludGhlc2lzKCk7XG4gICAgdGhpcy5kb0NlbGxNZXRhYm9saXNtKCk7XG4gICAgdGhpcy5jZWxsRGVhdGgoKTtcblxuICAgIC8vIHRoaXMuc2lnbmFsc1VwZGF0ZSgpO1xuICB9XG5cbiAgZG9DZWxsQWN0aW9ucygpIHtcbiAgICAvLyBDYWxjIGFjdGlvbnMgb24gdGhpcyBmcmFtZVxuICAgIHZhciBhY3Rpb25zID0gbmV3IEFycmF5KHRoaXMucGxhbnQubGVuZ3RoKTtcbiAgICB2YXIgY2VsbDogQ2VsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNlbGwgPSB0aGlzLnBsYW50W2ldO1xuICAgICAgYWN0aW9uc1tpXSA9IGNlbGwuY2hvb3NlQWN0aW9uKCk7XG4gICAgLy8gaWYgKGFjdGlvbnNbaV0pIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKGFjdGlvbnNbaV0pO1xuICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBBcHBseSBhY3Rpb25zIG9uIHRoaXMgZnJhbWVcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghYWN0aW9uc1tpXSkge1xuICAgICAgICBjb250aW51ZTsgLy8gY2VsbCBjaG9zZSB0byBkbyBub3RoaW5nXG4gICAgICB9XG4gICAgICB2YXIgYWN0aW9uID0gYWN0aW9uc1tpXTtcbiAgICAgIHZhciBjZWxsID0gdGhpcy5wbGFudFtpXTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGlvbik7XG4gICAgICBpZihhY3Rpb24gaW5zdGFuY2VvZiBEaXZpZGVBY3Rpb24pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjZWxsIHdhbnRzIHRvIGdyb3cuLi5cIilcbiAgICAgICAgdmFyIGRhY3Rpb246IERpdmlkZUFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgZGlyZWN0aW9uIG9mIHRoaXMgYWN0aW9uXG5cbiAgICAgICAgdmFyIG5laWdoYm9yVXAgPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93IC0gMV1bY2VsbC5jb2xdO1xuICAgICAgICB2YXIgbmVpZ2hib3JSaWdodCA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3ddW2NlbGwuY29sICsgMV07XG4gICAgICAgIHZhciBuZWlnaGJvckRvd24gPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93ICsgMV1bY2VsbC5jb2xdO1xuICAgICAgICB2YXIgbmVpZ2hib3JMZWZ0ID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvd11bY2VsbC5jb2wgLSAxXTtcbiAgICAgICAgdmFyIGFuZ2xlOiBudW1iZXIgPSBkYWN0aW9uLmdldEFjdGlvbkRpcmVjdGlvbihuZWlnaGJvclVwLCBuZWlnaGJvclJpZ2h0LCBuZWlnaGJvckRvd24sIG5laWdoYm9yTGVmdCk7XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IEFuZ2xlLnNhbXBsZURpcmVjdGlvbihhbmdsZSk7XG4gICAgICAgIHZhciBkcm93ID0gQW5nbGUuZGlyZWN0aW9uRGVsdGFSb3coZGlyZWN0aW9uKTtcbiAgICAgICAgdmFyIGRjb2wgPSBBbmdsZS5kaXJlY3Rpb25EZWx0YUNvbChkaXJlY3Rpb24pO1xuXG4gICAgICAgIHZhciBnSSA9IHRoaXMucGxhbnRbaV0ucm93ICsgZHJvdztcbiAgICAgICAgdmFyIGdKID0gdGhpcy5wbGFudFtpXS5jb2wgKyBkY29sO1xuXG4gICAgICAgIHZhciBjb3N0ID0gY2VsbC50eXBlLmNvc3Q7XG5cbiAgICAgICAgdmFyIGNhbkFmZm9yZCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29zdC52ZWN0b3IubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZih0aGlzLnBsYW50W2ldLmZsdWlkcy52ZWN0b3Jbal0gPCBjb3N0LnZlY3RvcltqXSkge1xuICAgICAgICAgICAgY2FuQWZmb3JkID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5BZmZvcmQpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNlbGwgY2FuJ3QgYWZmb3JkLi4uXCIpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihnSSA8IDAgfHwgZ0kgPj0gQXV0b21hdGEuR1JJRF9OX1JPV1MgfHwgZ0ogPCAwIHx8IGdKID49IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TICl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjYW5ub3QgbWFrZSBjZWxsIGF0IFwiICsgZ0ogKyBcIiwgXCIgKyBnSSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jZWxsQXJyYXlbZ0ldW2dKXSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2VsbCBhbHJlYWR5IGV4aXN0cyBhdCBcIiArIGdKICsgXCIsIFwiICsgZ0kpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnN1YnRyYWN0Rmx1aWRzKGNlbGwuZmx1aWRzLCBjb3N0KTtcbiAgICAgICAgdmFyIG5ld0ZsdWlkcyA9IHRoaXMuc3BsaXRGbHVpZHMoY2VsbC5mbHVpZHMpO1xuICAgICAgICB2YXIgbkNlbGwgPSBuZXcgQ2VsbCh0aGlzLmRuYSwgY2VsbC50eXBlLCBuZXdGbHVpZHMsIGdJLCBnSiwgdGhpcy5jZWxsQXJyYXkpO1xuICAgICAgICB0aGlzLnBsYW50LnB1c2gobkNlbGwpO1xuICAgICAgICB0aGlzLmZsdWlkc0FycmF5W2dJXVtnSl0gPSBuZXdGbHVpZHM7XG4gICAgICAgIHRoaXMuY2VsbEFycmF5W2dJXVtnSl0gPSBuQ2VsbDtcbiAgICAgIH1cblxuICAgICAgLy8gZWxzZSBpZiAoYWN0aW9uIGluc3RhbmNlb2YgUmVhY3RBY3Rpb24pIHtcbiAgICAgIC8vICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgLy8gICAgIC8vIGNvZGUuLi5cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBTcGVjaWFsaXplQWN0aW9uKSB7XG4gICAgICAgIHZhciBzYWN0aW9uOiBTcGVjaWFsaXplQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICBjZWxsLnNldFR5cGUoc2FjdGlvbi50b1R5cGUpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBQdW1wQWN0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwdW1waW5nLi4uLicpO1xuICAgICAgICB2YXIgcGFjdGlvbjogUHVtcEFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgdmFyIG5laWdoYm9yVXAgPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93IC0gMV1bY2VsbC5jb2xdO1xuICAgICAgICB2YXIgbmVpZ2hib3JSaWdodCA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3ddW2NlbGwuY29sICsgMV07XG4gICAgICAgIHZhciBuZWlnaGJvckRvd24gPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93ICsgMV1bY2VsbC5jb2xdO1xuICAgICAgICB2YXIgbmVpZ2hib3JMZWZ0ID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvd11bY2VsbC5jb2wgLSAxXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2EnKTtcbiAgICAgICAgdmFyIGFuZ2xlOiBudW1iZXIgPSBwYWN0aW9uLmdldEFjdGlvbkRpcmVjdGlvbihuZWlnaGJvclVwLCBuZWlnaGJvclJpZ2h0LCBuZWlnaGJvckRvd24sIG5laWdoYm9yTGVmdCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdiJyk7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBBbmdsZS5zYW1wbGVEaXJlY3Rpb24oYW5nbGUpO1xuICAgICAgICB2YXIgZHJvdyA9IEFuZ2xlLmRpcmVjdGlvbkRlbHRhUm93KGRpcmVjdGlvbik7XG4gICAgICAgIHZhciBkY29sID0gQW5nbGUuZGlyZWN0aW9uRGVsdGFDb2woZGlyZWN0aW9uKTtcbiAgICAgICAgdmFyIGdJID0gdGhpcy5wbGFudFtpXS5yb3cgKyBkcm93O1xuICAgICAgICB2YXIgZ0ogPSB0aGlzLnBsYW50W2ldLmNvbCArIGRjb2w7XG4gICAgICAgIGlmKGdJIDwgMCB8fCBnSSA+PSBBdXRvbWF0YS5HUklEX05fUk9XUyB8fCBnSiA8IDAgfHwgZ0ogPj0gQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnYycpO1xuICAgICAgICB2YXIgdGFyZ2V0Rmx1aWRWZWMgPSB0aGlzLmZsdWlkc0FycmF5W2dJXVtnSl0udmVjdG9yO1xuICAgICAgICB2YXIgZmx1aWRWZWMgPSBjZWxsLmZsdWlkcy52ZWN0b3I7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGFjdGlvbi5mbHVpZHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgLy8gbW92ZSBkIGZsdWlkcyBmcm9tIGZsdWlkVmVjIHRvIHRhcmdldEZsdWlkVmVjXG4gICAgICAgIC8vIGlmIGQgaXMgbmVnYXRpdmUgdGhlbiB0aGlzIGlzIFwicHVsbGluZ1wiIGZsdWlkc1xuICAgICAgICB2YXIgZCA9IHBhY3Rpb24uZmx1aWRzW2pdO1xuICAgICAgICAvLyBsZXQgdGhlIHBsYW50IFwiY2hlYXRcIjogb25seSBwdW1wICpmcm9tKiBlbnZpcm9ubWVudCwgKnRvKiBvdGhlciBwbGFudCBjZWxsc1xuICAgICAgICBpZiAodGhpcy5jZWxsQXJyYXlbZ0ldW2dKXSkge1xuICAgICAgICAgIGQgPSBNYXRoLmFicyhkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkID0gLU1hdGguYWJzKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9uJ3QgcHVtcCB0byBuZWdhdGl2ZSBmbHVpZHNcbiAgICAgICAgaWYgKGQgPiAwKSB7XG4gICAgICAgICAgZCA9IE1hdGgubWluKGQsIGZsdWlkVmVjW2pdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkID0gTWF0aC5tYXgoZCwgLXRhcmdldEZsdWlkVmVjW2pdKTtcbiAgICAgICAgfVxuICAgICAgICBmbHVpZFZlY1tqXSAtPSBkO1xuICAgICAgICB0YXJnZXRGbHVpZFZlY1tqXSArPSBkO1xuICAgICAgICB9XG4gICAgICB9XG4gIH1cbiAgfVxuXG4gIC8qXG4gIEtpbGwgYWxsIGNlbGxzIHdobyBkb24ndCBoYXZlIGVub3VnaCByZXNvdXJjZXMgdG8gbGl2ZVxuICAqL1xuICBjZWxsRGVhdGgoKSB7XG4gICAgbGV0IE1JTl9XQVRFUiA9IDAuMSAqIEF1dG9tYXRhLk1BVEVSSUFMX1dBVEVSX1dBVEVSX01FQU47XG4gICAgbGV0IE1JTl9HTFVDT1NFID0gMC4wMDE7XG4gICAgbGV0IHRvS2lsbCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudC5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGNlbGwgPSB0aGlzLnBsYW50W2ldO1xuICAgICAgaWYgKCFjZWxsLmZsdWlkcykgY29udGludWU7XG4gICAgICBpZiAoY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5HTFVDT1NFXSA8IE1JTl9HTFVDT1NFIHx8XG4gICAgICAgIGNlbGwuZmx1aWRzLnZlY3RvcltGbHVpZHMuV0FURVJdIDwgTUlOX1dBVEVSKSB7XG4gIC8vIGtpbGwgY2VsbFxuICB0b0tpbGwucHVzaChjZWxsKTtcbiAgfVxuICBpZiAoY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5HTFVDT1NFXSA8IE1JTl9HTFVDT1NFKSB7XG4gIC8vIGNvbnNvbGUubG9nKCdjZWxsIGtpbGxlZCBkdWUgdG8gbGFjayBvZiBnbHVjb3NlJyk7XG4gIH1cbiAgaWYgKGNlbGwuZmx1aWRzLnZlY3RvcltGbHVpZHMuV0FURVJdIDwgTUlOX1dBVEVSKSB7XG4gIC8vIGNvbnNvbGUubG9nKCdjZWxsIGtpbGxlZCBkdWUgdG8gbGFjayBvZiB3YXRlcicpO1xuICB9XG5cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9LaWxsLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNlbGw6IENlbGwgPSB0b0tpbGxbaV07XG4gIC8vIGNvbnNvbGUubG9nKCdLaWxsaW5nIGNlbGwgYXQ6ICcsIGNlbGwucm93LCBjZWxsLmNvbCk7XG4gIHZhciBpbmRleCA9IHRoaXMucGxhbnQuaW5kZXhPZihjZWxsKTtcbiAgdGhpcy5wbGFudC5zcGxpY2UoaW5kZXgsIDEpO1xuICAvLyB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93XVtjZWxsLmNvbF0gPSBjZWxsLmZsdWlkcztcbiAgdGhpcy5jZWxsQXJyYXlbY2VsbC5yb3ddW2NlbGwuY29sXSA9IHVuZGVmaW5lZDtcbiAgfVxuICB9XG5cbiAgc3VidHJhY3RGbHVpZHMoYSwgYil7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLnZlY3Rvci5sZW5ndGg7IGkgKyspe1xuICAgICAgYS52ZWN0b3JbaV0gLT0gYi52ZWN0b3JbaV07XG4gICAgfVxuICB9XG5cbiAgc3BsaXRGbHVpZHMoZmx1aWRzKXtcbiAgICBsZXQgbmV3Rmx1aWRzID0gbmV3IEZsdWlkcygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmx1aWRzLnZlY3Rvci5sZW5ndGg7IGkgKyspe1xuICAgICAgZmx1aWRzLnZlY3RvcltpXSAvPSAyO1xuICAgICAgbmV3Rmx1aWRzLnZlY3RvcltpXSA9IGZsdWlkcy52ZWN0b3JbaV07XG4gICAgfVxuICAgIHJldHVybiBuZXdGbHVpZHM7XG4gIH1cblxuICBzaWduYWxzVXBkYXRlKCkge1xuICAgIC8vIFVwZGF0ZSBlYWNoIGNlbGwncyBpbmRpdmlkdWFsIHNpZ25hbCBsZXZlbHNcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudC5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGNlbGwgPSB0aGlzLnBsYW50W2ldO1xuICAgICAgY2VsbC51cGRhdGVTaWduYWxzKCk7XG4gICAgfVxuXG4gICAgLy8gU2VuZCBzaWduYWxzIHRvIG5laWdoYm9yc1xuICAgIGxldCBTUFJFQURfQ09FRkYgPSAwLjE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICB2YXIgbmVpZ2hicyA9IFtbLTEsIDBdLCBbMSwgMF0sIFswLCAxXSwgWzAsIC0xXV07XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5laWdoYnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIG5yb3cgPSBjZWxsLmNvbCArIG5laWdoYnNbal1bMF07XG4gICAgICAgIHZhciBuY29sID0gY2VsbC5yb3cgKyBuZWlnaGJzW2pdWzFdO1xuICAgICAgICBpZiAobmNvbCA8IDAgfHwgbnJvdyA8IDAgfHwgbmNvbCA+PSBBdXRvbWF0YS5HUklEX05fQ09MVU1OUyB8fCBucm93ID49IEF1dG9tYXRhLkdSSURfTl9ST1dTKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB2YXIgbmVpZ2hiRmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtucm93XVtuY29sXTtcbiAgICAgICAgaWYgKG5laWdoYkZsdWlkcyBpbnN0YW5jZW9mIENlbGwpIHtcbiAgICAgICAgICB2YXIgbnNpZ25hbHMgPSBuZWlnaGJGbHVpZHMudmVjdG9yO1xuICAgICAgICAgIGZvciAodmFyIGsgPSBGbHVpZHMuU0lHTkFMU19TVEFSVDsgayA8IEZsdWlkcy5OX0ZMVUlEUzsgaysrKSB7XG4gICAgICAgICAgICBpZiAoY2VsbC5mbHVpZHNba10gPCBuc2lnbmFsc1trXSlcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBsZXQgYW1vdW50ID0gU1BSRUFEX0NPRUZGICogY2VsbC5mbHVpZHMudmVjdG9yW2tdO1xuICAgICAgICAgICAgbnNpZ25hbHNba10gKz0gYW1vdW50O1xuICAgICAgICAgICAgY2VsbC5mbHVpZHMudmVjdG9yW2tdIC09IGFtb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkb0NlbGxNZXRhYm9saXNtKCkge1xuICAgIC8vIHJlc3BpcmF0aW9uLiB0aGlzIGlzIG5lZWRlZCBmb3IgbWV0YWJvbGlzbVxuICAgIHZhciBSRVNQSVJBVElPTl9BTU9VTlQgPSAwLjAxO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudC5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGNlbGwgPSB0aGlzLnBsYW50W2ldO1xuICAgICAgY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl0gLT0gUkVTUElSQVRJT05fQU1PVU5UO1xuICAgICAgY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5HTFVDT1NFXSAtPSBSRVNQSVJBVElPTl9BTU9VTlQ7XG4gICAgfVxuICB9XG5cbiAgZG9QYXNzaXZlRmxvd0FuZFBob3Rvc3ludGhlc2lzKCkge1xuICAgIC8vIEluaXRpYWxpemUgZmx1aWRzRGlmZiB0byAwJ3NcbiAgICB2YXIgZmx1aWRzRGlmZiA9IG5ldyBBcnJheShBdXRvbWF0YS5HUklEX05fUk9XUyk7XG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7IHJvdysrKSB7XG4gICAgICBmbHVpZHNEaWZmW3Jvd10gPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMpO1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG4gICAgICAgIGZsdWlkc0RpZmZbcm93XVtjb2xdID0gbmV3IEFycmF5KEZsdWlkcy5OX0ZMVUlEUyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRmx1aWRzLk5fRkxVSURTOyArK2kpIHtcbiAgICAgICAgICBmbHVpZHNEaWZmW3Jvd11bY29sXVtpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwaG90b3N5bnRoZXNpcy4gVE9ETyB0aGlzIHdpbGwgYmUgYW4gYWN0aW9uXG4gICAgdmFyIFJFQUNUSU9OX0ZBQ1RPUiA9IDEwOyAvLyBleHBlbmQgMSB3YXRlciB0byBnZXQgNCBnbHVjb3NlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICBpZiAoY2VsbC50eXBlLmlzTGVhZikge1xuICAgICAgICBsZXQgbnVtQWlyID0gdGhpcy5jb3VudEFpck5laWdoYm9ycyhjZWxsLnJvdywgY2VsbC5jb2wpO1xuICAgICAgICBsZXQgZEdsdWNvc2UgPSBNYXRoLm1pbihjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLldBVEVSXS80LCAxMDAgKiBudW1BaXIpO1xuICAgICAgICAvLyBjb252ZXJ0IHdhdGVyIHRvIGdsdWNvc2VcbiAgICAgICAgZmx1aWRzRGlmZltjZWxsLnJvd11bY2VsbC5jb2xdW0ZsdWlkcy5XQVRFUl0gLT0gZEdsdWNvc2U7XG4gICAgICAgIGZsdWlkc0RpZmZbY2VsbC5yb3ddW2NlbGwuY29sXVtGbHVpZHMuR0xVQ09TRV0gKz0gUkVBQ1RJT05fRkFDVE9SKmRHbHVjb3NlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBhc3NpdmUgdHJhbnNwb3J0IC8gZGlmZnVzaW9uLiBHaXZlIG51dHJpZW50cyB0byBuZWlnaGJvcnMuXG4gICAgLy8gY29uc29sZS5sb2coZmx1aWRzRGlmZik7XG4gICAgdmFyIG5laWdoYnMgPSBbWy0xLCAwXSwgWzEsIDBdLCBbMCwgMV0sIFswLCAtMV1dO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyArK3Jvdykge1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hicy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIHZhciBuZWlnaGJSb3cgPSByb3cgKyBuZWlnaGJzW2ldWzBdO1xuICAgICAgICAgIHZhciBuZWlnaGJDb2wgPSBjb2wgKyBuZWlnaGJzW2ldWzFdO1xuICAgICAgICAgIGlmICghdGhpcy5pc1Bvc2l0aW9uT25HcmlkKG5laWdoYlJvdywgbmVpZ2hiQ29sKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGZsb3dSYXRlID0gMC4xO1xuICAgICAgICAgIC8vIGFpciB0byBhaXIgaXMgdmVyeSBmYXN0XG4gICAgICAgICAgaWYgKHRoaXMuaXNBaXJOb3RDZWxsKHJvdyxjb2wpICYmIHRoaXMuaXNBaXJOb3RDZWxsKG5laWdoYlJvdyxuZWlnaGJDb2wpKSB7XG4gICAgICAgICAgICBmbG93UmF0ZSA9IDAuMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBkaXNhYmxlIHBhc3NpdmUgZmxvdyBmcm9tIC8gdG8gY2VsbHNcbiAgICAgICAgICBpZiAodGhpcy5jZWxsQXJyYXlbcm93XVtjb2xdIHx8IHRoaXMuY2VsbEFycmF5W25laWdoYlJvd11bbmVpZ2hiQ29sXSkge1xuICAgICAgICAgIC8vIGZsb3dSYXRlID0gMC4wMVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBuZWlnaGJGbHVpZHMgPSB0aGlzLmZsdWlkc0FycmF5W25laWdoYlJvd11bbmVpZ2hiQ29sXS52ZWN0b3I7XG4gICAgICAgICAgdmFyIGZsdWlkcyA9IHRoaXMuZmx1aWRzQXJyYXlbcm93XVtjb2xdLnZlY3RvcjtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IEZsdWlkcy5OX0ZMVUlEUzsgKytqKSB7XG4gICAgICAgICAgICBpZiAoZmx1aWRzW2pdID4gbmVpZ2hiRmx1aWRzW2pdKSB7XG4gICAgICAgICAgICAgIHZhciBkaWZmID0gZmxvd1JhdGUgKiAoZmx1aWRzW2pdIC0gbmVpZ2hiRmx1aWRzW2pdKTtcbiAgICAgICAgICAgICAgZmx1aWRzRGlmZltyb3ddW2NvbF1bal0gLT0gZGlmZjtcbiAgICAgICAgICAgICAgZmx1aWRzRGlmZltuZWlnaGJSb3ddW25laWdoYkNvbF1bal0gKz0gZGlmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0aGlzLnZhbGlkYXRlRmx1aWRzQXJyYXkoKTtcblxuICAgIC8vIEFwcGx5IGZsdWlkc0RpZmYgdG8gZmx1aWRzXG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7IHJvdyArKyl7XG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUzsgY29sICsrICl7XG4gICAgICAgIHZhciBmbHVpZHMgPSB0aGlzLmZsdWlkc0FycmF5W3Jvd11bY29sXS52ZWN0b3I7XG4gICAgICAgIHZhciBmbHVpZERpZmYgPSBmbHVpZHNEaWZmW3Jvd11bY29sXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBGbHVpZHMuTl9GTFVJRFM7ICsraSkge1xuICAgICAgICAgIGZsdWlkc1tpXSArPSBmbHVpZERpZmZbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc1Bvc2l0aW9uT25HcmlkKHJvdywgY29sKSB7XG4gICAgcmV0dXJuIHJvdyA+PSAwICYmIGNvbCA+PSAwICYmXG4gICAgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1MgJiYgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7XG4gIH1cblxuICBpc0Fpck5vdENlbGwocm93LCBjb2wpIHtcbiAgLy8gY2VsbCBpcyBkZWFkIGFuZCBjZWxsIGlzIGFpciBjZWxsXG4gIGlmICghdGhpcy5pc1Bvc2l0aW9uT25HcmlkKHJvdywgY29sKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gcm93IDwgNTAgJiYgIXRoaXMuY2VsbEFycmF5W3Jvd11bY29sXTtcbiAgfVxuXG4gIGNvdW50QWlyTmVpZ2hib3JzKHJvdywgY29sKXtcbiAgICB2YXIgbiA9ICh0aGlzLmlzQWlyTm90Q2VsbChyb3cgLSAxLCBjb2wpPzE6MCkgK1xuICAgICh0aGlzLmlzQWlyTm90Q2VsbChyb3cgKyAxLCBjb2wpPzE6MCkgK1xuICAgICh0aGlzLmlzQWlyTm90Q2VsbChyb3csIGNvbCAtIDEpPzE6MCkgK1xuICAgICh0aGlzLmlzQWlyTm90Q2VsbChyb3csIGNvbCArIDEpPzE6MCk7XG4gICAgcmV0dXJuIG47XG4gIH1cblxuICBkcmF3KCkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRmx1aWRzQXJyYXkoKSkge1xuICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGluIGZsdWlkcywgc2tpcHBpbmcgZHJhdycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzY2FsZSA9IEF1dG9tYXRhLkNFTExfU0NBTEVfUElYRUxTO1xuICAgIHRoaXMuY2FudmFzQ3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjN0VDMEREXCI7XG4gICAgdGhpcy5jYW52YXNDdHguZmlsbFJlY3QoMCwwLCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUyAqIHNjYWxlLCBzY2FsZSAqIEF1dG9tYXRhLkdSSURfTl9ST1dTKVxuICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxSZWN0KDAsIDAsIDEwMCwgMTAwKTtcblxuXG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7IHJvdyArKyl7XG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUzsgY29sICsrKXtcbiAgICAgICAgdmFyIGZsdWlkcyA9IHRoaXMuZmx1aWRzQXJyYXlbcm93XVtjb2xdLnZlY3RvcjtcbiAgICAgICAgdmFyIHdhdGVyQ29udGVudCA9IE1hdGgubWF4KE1hdGgubWluKE1hdGgucm91bmQoZmx1aWRzW0ZsdWlkcy5XQVRFUl0pLDI1NSksMCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhd1N0eWxlID09PSAnd2F0ZXInKSB7XG4gICAgICAgICAgdmFyIHdhdGVyQ29uY2VudHJhdGlvbiA9IGZsdWlkc1tGbHVpZHMuV0FURVJdIC8gKDIgKiBBdXRvbWF0YS5NQVRFUklBTF9ESVJUX1dBVEVSX01FQU4pO1xuICAgICAgICAgIHZhciB3YXRlckNvbG9yID0gTWF0aC5tYXgoTWF0aC5taW4oTWF0aC5yb3VuZCgyNTUqd2F0ZXJDb25jZW50cmF0aW9uKSwyNTUpLDApO1xuICAgICAgICAgIHZhciBjb2xvclN0cmluZyA9IFwiI1wiICsgXCIwMDY0XCIgKyB0aGlzLmdldENvbG9ySGV4KHdhdGVyQ29sb3IpO1xuICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IGNvbG9yU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5kcmF3U3R5bGUgPT09ICdnbHVjb3NlJyl7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjXCIgKyB0aGlzLmdldENvbG9ySGV4KE1hdGgubWluKDI1NSxNYXRoLmNlaWwoZmx1aWRzW0ZsdWlkcy5HTFVDT1NFXSkpKSArIFwiMDAwMFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRyYXdTdHlsZSA9PT0gJ2F1eGluJykge1xuICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5jZWxsQXJyYXlbcm93XVtjb2xdO1xuICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSBcIiNcIiArIFwiMDAwMFwiICsgdGhpcy5nZXRDb2xvckhleChNYXRoLm1pbigyNTUsTWF0aC5jZWlsKDI1NSpmbHVpZHNbRmx1aWRzLlNJR05BTFNfU1RBUlRdKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXTtcbiAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gY2VsbC50eXBlLmNvbG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmKHJvdyA+PSA1MCl7XG4gICAgICAgICAgICB2YXIgY3ZhbCA9IE1hdGguY2VpbCh3YXRlckNvbnRlbnQvNCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHdhdGVyQ29udGVudCk7XG4gICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzMzMTFcIiArIHRoaXMuZ2V0Q29sb3JIZXgoY3ZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjN0VDMEREXCI7XG4gICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsUmVjdChNYXRoLmZsb29yKHNjYWxlICogY29sKSwgTWF0aC5mbG9vcihzY2FsZSAqIHJvdyksIHNjYWxlLCBzY2FsZSk7XG5cbiAgICAgICAgLy8gZHJhdyBncmVlbiBvdXRsaW5lIGFyb3VuZCB0aGUgcGxhbnRcbiAgICAgICAgaWYgKHRoaXMuZHJhd1N0eWxlID09ICd3YXRlcicgfHwgdGhpcy5kcmF3U3R5bGUgPT0gJ2dsdWNvc2UnIHx8IHRoaXMuZHJhd1N0eWxlID09ICdhdXhpbicpIHtcbiAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5zdHJva2VTdHlsZSA9IFwiIzAwOTkwMFwiO1xuICAgICAgICAgIHZhciBuZWlnaGJzID0gW1stMSwgMF0sIFsxLCAwXSwgWzAsIDFdLCBbMCwgLTFdXTtcblxuICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5jZWxsQXJyYXlbcm93XVtjb2xdO1xuICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgdmFyIG5yb3cgPSByb3cgKyBuZWlnaGJzW2ldWzBdO1xuICAgICAgICAgICAgICB2YXIgbmNvbCA9IGNvbCArIG5laWdoYnNbaV1bMV07XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzUG9zaXRpb25PbkdyaWQobnJvdyxuY29sKSAmJiAhdGhpcy5jZWxsQXJyYXlbbnJvd11bbmNvbF0gKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgaWYgKG5laWdoYnNbaV1bMF0gPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4Lm1vdmVUbyhzY2FsZSpjb2wgKyAwLjUsIHNjYWxlKnJvdyArIDAuNSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5saW5lVG8oc2NhbGUqKGNvbCsxKSArIDAuNSwgc2NhbGUqcm93ICsgMC41KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5laWdoYnNbaV1bMF0gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubW92ZVRvKHNjYWxlKihjb2wrMSkgKyAwLjUsIHNjYWxlKihyb3crMSkgKyAwLjUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubGluZVRvKHNjYWxlKmNvbCArIDAuNSwgc2NhbGUqKHJvdysxKSArIDAuNSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZWlnaGJzW2ldWzFdID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oc2NhbGUqY29sICsgMC41LCBzY2FsZSoocm93KzEpICsgMC41KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmxpbmVUbyhzY2FsZSpjb2wgKyAwLjUsIHNjYWxlKnJvdyArIDAuNSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZWlnaGJzW2ldWzFdID09IDEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4Lm1vdmVUbyhzY2FsZSooY29sKzEpICsgMC41LCBzY2FsZSpyb3cgKyAwLjUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubGluZVRvKHNjYWxlKihjb2wrMSkgKyAwLjUsIHNjYWxlKihyb3crMSkgKyAwLjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbG9ySGV4KGJ5dGUpe1xuICAgIGxldCBjb2xvclN0cmluZyA9IFwiXCI7XG4gICAgaWYgKGJ5dGUgPCAxNikge1xuICAgICAgY29sb3JTdHJpbmcgKz0gXCIwXCIgKyBieXRlLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb2xvclN0cmluZyArPSBieXRlLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yU3RyaW5nO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYXV0b21hdGEudHMiLCJpbXBvcnQge0ZsdWlkc30gZnJvbSBcIi4vZmx1aWRzXCI7XG5pbXBvcnQge0lBY3Rpb259IGZyb20gXCIuL2FjdGlvblwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuLypcbkNlbGwgaXMgYSBmbGVpZ2h3ZWlnaHQgb2JqZWN0IGZvciB0aGUgR3JpZC4gU3lzdGVtcy5cblBsdXMgdGhleSBhbHNvIGhhdmUgY29udGV4dCBmb3IgZml0dGluZyBpbnRvIHRoZSBHcmlkLlxuSXQgY2FuIGFsc28gYmUgdGhvdWdodCBvZiBhcyBhIEROQSBjb250cm9sbGVyLlxuKi9cblxuZXhwb3J0IGNsYXNzIENlbGwge1xuXG4gICAgLy8gZ3JpZDogQXJyYXk8QXJyYXk8T2JqZWN0Pj47XG5cbiAgICBmbHVpZHM6IEZsdWlkcztcbiAgICByb3c7XG4gICAgY29sO1xuICAgIHR5cGU7IC8vIGNvcmVzcG9uZHMgdG8gdHlwZXMgaW4gRE5BXG4gICAgZG5hO1xuICAgIGFuZ2xlO1xuICAgIHNpZ25hbHM7XG4gICAgY2VsbEFycmF5OiBBcnJheTxBcnJheTxDZWxsPj47XG5cbiAgICBjb25zdHJ1Y3RvcihkbmEsdHlwZSxmbHVpZHMscm93LGNvbCwgY2VsbEFycmF5KSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5mbHVpZHMgPSBmbHVpZHM7XG4gICAgICAgIHRoaXMuZG5hID0gZG5hO1xuICAgICAgICB0aGlzLnNldFR5cGUodHlwZSk7XG4gICAgICAgIHRoaXMuY2VsbEFycmF5ID0gY2VsbEFycmF5O1xuICAgIH1cblxuICAgIHN1bUZsdWlkcygpOiBudW1iZXIge1xuICAgICAgICAvLyBPbmx5IHN1bSBcImFjdHVhbFwiIGZsdWlkcywgbm90IGhvcm1vbmVzLlxuICAgICAgICB2YXIgZ2x1Y29zZVdlaWdodCA9IDEuNTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmx1aWRzLnZlY3RvcltGbHVpZHMuV0FURVJdICsgZ2x1Y29zZVdlaWdodCAqIHRoaXMuZmx1aWRzLnZlY3RvcltGbHVpZHMuR0xVQ09TRV07XG4gICAgfVxuXG4gICAgLypcbiAgICBQYXNzIGVpdGhlciBhIGxpdGVyYWwgdHlwZSBvYmplY3Qgb3IgYSBudW1lcmljYWwgdHlwZSBpbmRleCByZWZlcmVuY2luZyBkbmEgdHlwZSBkZWZpbml0aW9uc1xuICAgICovXG4gICAgc2V0VHlwZSh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZG5hLmNlbGxUeXBlc1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTaWduYWxzKCkge1xuICAgICAgICAvLyBtdWx0aXBseSBieSBtYXRyaXhcbiAgICAgICAgLy8gdmFyIG5ld1NpZ25hbHMgPSBuZXcgQXJyYXkoRmx1aWRzLk5fU0lHTkFMUyk7XG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3U2lnbmFscy5sZW5ndGg7ICsraSkge1xuICAgICAgICAvLyAgICAgbmV3U2lnbmFsc1tpXSA9IDA7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB2YXIgbXR4ID0gdGhpcy50eXBlLnNpZ25hbE1hdHJpeDtcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdTaWduYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICBmb3IgKHZhciBqID0gMDsgaiA8IEZsdWlkcy5OX1NJR05BTFM7IGorKykgeyAvLyBmaXJzdCBTSUdOQUxTIGNvbHVtbnMgb2YgbWF0cml4Li4uXG4gICAgICAgIC8vICAgICAgICAgbmV3U2lnbmFsc1tpXSArPSB0aGlzLmZsdWlkcy52ZWN0b3JbaitGbHVpZHMuU0lHTkFMU19TVEFSVF0gKiBtdHhbaV1bal07XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5mbHVpZHMudmVjdG9yLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIC8vICAgICAgICAgbmV3U2lnbmFsc1tpXSArPSB0aGlzLmZsdWlkcy52ZWN0b3Jbal0gKiBtdHhbaV1bait0aGlzLnNpZ25hbHMudmVjdG9yLmxlbmd0aF07XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB2YXIgdmVjID0gdGhpcy5kbmEuY2VsbFR5cGVzW3RoaXMudHlwZV0uc2lnbmFsQjtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ3NpZ25hbHMnLCBuZXdTaWduYWxzLCAnbXR4JywgbXR4LCAndmVjJywgdmVjKTtcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCB2ZWMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgIG5ld1NpZ25hbHNbaV0gKz0gdmVjW2ldO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdTaWduYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnNpZ25hbHMudmVjdG9yW2ldID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgbmV3U2lnbmFsc1tpXSkpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZ2V0QWN0aW9uUG90ZW50aWFsKGFjdGlvbjogSUFjdGlvbik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNob29zZUFjdGlvbigpOklBY3Rpb24ge1xuICAgICAgICAvLyB2YXIgc2lnbmFscyA9IHRoaXMuc2lnbmFscyxcbiAgICAgICAgLy8gICAgIGNlbGxUeXBlID0gdGhpcy50eXBlO1xuXG4gICAgICAgIC8vIHZhciBwZXJjZXB0cm9uID0gdGhpcy50eXBlLlxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBhY3Rpb25zIGhhdmUgaGlnaCBwb3RlbnRpYWwgdmFsdWVzXG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5kbmEuYWN0aW9ucztcbiAgICAgICAgdmFyIHBvdGVudGlhbHMgPSBuZXcgQXJyYXkoYWN0aW9ucy5sZW5ndGgpO1xuICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLmZsdWlkcy52ZWN0b3IuY29uY2F0KFtcbiAgICAgICAgICAgICEhdGhpcy5jZWxsQXJyYXlbdGhpcy5yb3ctMV1bdGhpcy5jb2xdLFxuICAgICAgICAgICAgISF0aGlzLmNlbGxBcnJheVt0aGlzLnJvdysxXVt0aGlzLmNvbF0sXG4gICAgICAgICAgICAhIXRoaXMuY2VsbEFycmF5W3RoaXMucm93XVt0aGlzLmNvbC0xXSxcbiAgICAgICAgICAgICEhdGhpcy5jZWxsQXJyYXlbdGhpcy5yb3ddW3RoaXMuY29sKzFdXG4gICAgICAgIF0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHBvdGVudGlhbHNbaV0gPSB0aGlzLnR5cGUuYWN0aW9uUGVyY2VwdHJvbnNbaV0uYWN0aXZhdGUoaW5wdXQpWzBdOyAvLyB0aGlzLmdldEFjdGlvblBvdGVudGlhbChhY3Rpb25zW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiZXN0SW5kZXg6IG51bWJlciA9IFV0aWxzLmFyZ21heChwb3RlbnRpYWxzKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hvb3NpbmcgYWN0aW9uLCAnLCBhY3Rpb25zW2Jlc3RJbmRleF0pO1xuICAgICAgICBpZiAocG90ZW50aWFsc1tiZXN0SW5kZXhdIDwgMC41KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gXCJlbXB0eVwiIGFjdGlvblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zW2Jlc3RJbmRleF07XG5cblxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGl2YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy8gICAgIGFjdGl2YXRvcnNbaV0gPSB0aGlzLmFjdGl2YXRvckZ1bmN0aW9uKHRoaXMuZGlzdGFuY2VUb0FjdGl2YXRvcihzaWduYWxzLCBhY3Rpb25zW2ldLmFjdGl2YXRvcikpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdhY3RpdmF0b3JzJywgYWN0aXZhdG9ycywgJ2FjdGlvbnMnLCBhY3Rpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMud2VpZ2h0ZWRDaG9vc2UoYWN0aW9ucywgYWN0aXZhdG9ycyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NlbGwudHMiLCJpbXBvcnQge0FuZ2xlfSBmcm9tIFwiLi9hbmdsZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uIHtcbiAgICAvKlxuICAgIE1vZGlmeSB0aGUgcGFyYW1ldGVycyBvZiB0aGUgYWN0aW9uIGJ5IGEgZ2l2ZW4gYW1vdW50XG4gICAgKi9cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIpO1xufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uU2VyaWFsaXplciB7XG4gICAgc3RhdGljIHNlcmlhbGl6ZShhY3Rpb246IElBY3Rpb24pOiBzdHJpbmcge1xuICAgICAgICB2YXIgY2xzO1xuICAgICAgICBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IERpdmlkZUFjdGlvbikge1xuICAgICAgICAgICAgY2xzID0gXCJEaXZpZGVBY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24uY29uc3RydWN0b3IgPT0gUHVtcEFjdGlvbikge1xuICAgICAgICAgICAgY2xzID0gXCJQdW1wQWN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IFJlYWN0QWN0aW9uKSB7XG4gICAgICAgICAgICBjbHMgPSBcIlJlYWN0QWN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IFNwZWNpYWxpemVBY3Rpb24pIHtcbiAgICAgICAgICAgIGNscyA9IFwiU3BlY2lhbGl6ZUFjdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRpZCBub3QgcmVjb2duaXplIHRoZSBzcGVjaWZpZWQgYWN0aW9uIHR5cGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgY2xhc3M6IGNsc1xuICAgICAgICB9O1xuICAgICAgICBpZiAoYWN0aW9uIGluc3RhbmNlb2YgRGlyZWN0aW9uYWxBY3Rpb24pIHtcbiAgICAgICAgICAgIG9ialsnZmx1aWRHcmFkaWVudCddID0gYWN0aW9uLmZsdWlkR3JhZGllbnQ7XG4gICAgICAgICAgICBvYmpbJ2dyYXZpdHlHcmFkaWVudCddID0gYWN0aW9uLmdyYXZpdHlHcmFkaWVudDtcbiAgICAgICAgICAgIG9ialsnc3VuR3JhZGllbnQnXSA9IGFjdGlvbi5zdW5HcmFkaWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBSZWFjdEFjdGlvbikge1xuICAgICAgICAgICAgb2JqWydyZWFjdGlvbiddID0gYWN0aW9uLnJlYWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFNwZWNpYWxpemVBY3Rpb24pIHtcbiAgICAgICAgICAgIG9ialsndG9UeXBlJ10gPSBhY3Rpb24udG9UeXBlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFB1bXBBY3Rpb24pIHtcbiAgICAgICAgICAgIG9ialsnZmx1aWRzJ10gPSBhY3Rpb24uZmx1aWRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGpzb25BY3Rpb24pOiBJQWN0aW9uIHtcbiAgICAgICAgdmFyIG9iaiA9IGpzb25BY3Rpb247XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKGpzb25BY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbHVyZSB0byBwYXJzZSBhY3Rpb246ICcsIGpzb25BY3Rpb24pO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9iai5jbGFzcykge1xuICAgICAgICAgICAgY2FzZSBcIkRpdmlkZUFjdGlvblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGl2aWRlQWN0aW9uKG9iaik7XG4gICAgICAgICAgICBjYXNlIFwiUHVtcEFjdGlvblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHVtcEFjdGlvbihvYmopO1xuICAgICAgICAgICAgY2FzZSBcIlJlYWN0QWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFjdEFjdGlvbihvYmopO1xuICAgICAgICAgICAgY2FzZSBcIlNwZWNpYWxpemVBY3Rpb25cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNwZWNpYWxpemVBY3Rpb24ob2JqKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqLCB0eXBlb2Ygb2JqKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmFkIGpzb25BY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25hbEFjdGlvbiBpbXBsZW1lbnRzIElBY3Rpb24ge1xuICAgIGZsdWlkR3JhZGllbnQ6IEFycmF5PG51bWJlcj47IC8vIG1vcnBob2dlbiBncmFkaWVudFxuICAgIGdyYXZpdHlHcmFkaWVudDogbnVtYmVyOyAvLyBncmF2aXRyb3Bpc21cbiAgICBzdW5HcmFkaWVudDogbnVtYmVyOyAvL1xuXG4gICAgY29uc3RydWN0b3IoYXJncyl7XG4gICAgICAgIHRoaXMuZmx1aWRHcmFkaWVudCA9IGFyZ3NbJ2ZsdWlkR3JhZGllbnQnXTtcbiAgICAgICAgdGhpcy5ncmF2aXR5R3JhZGllbnQgPSBhcmdzWydncmF2aXR5R3JhZGllbnQnXTtcbiAgICAgICAgdGhpcy5zdW5HcmFkaWVudCA9IGFyZ3NbJ3N1bkdyYWRpZW50J107XG4gICAgfVxuXG4gICAgZ2V0QWN0aW9uRGlyZWN0aW9uKHVwRmx1aWRzLCByaWdodEZsdWlkcywgZG93bkZsdWlkcywgbGVmdEZsdWlkcyk6IG51bWJlciB7XG4gICAgICAgIHZhciB1cENvbnRyaWJ1dGlvbiA9IFV0aWxzLmNyb3NzUHJvZHVjdCh1cEZsdWlkcywgdGhpcy5mbHVpZEdyYWRpZW50KTtcbiAgICAgICAgdmFyIHJpZ2h0Q29udHJpYnV0aW9uID0gVXRpbHMuY3Jvc3NQcm9kdWN0KHJpZ2h0Rmx1aWRzLCB0aGlzLmZsdWlkR3JhZGllbnQpO1xuICAgICAgICB2YXIgZG93bkNvbnRyaWJ1dGlvbiA9IFV0aWxzLmNyb3NzUHJvZHVjdChkb3duRmx1aWRzLCB0aGlzLmZsdWlkR3JhZGllbnQpO1xuICAgICAgICB2YXIgbGVmdENvbnRyaWJ1dGlvbiA9IFV0aWxzLmNyb3NzUHJvZHVjdChsZWZ0Rmx1aWRzLCB0aGlzLmZsdWlkR3JhZGllbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmdyYXZpdHlHcmFkaWVudCkge1xuICAgICAgICAgICAgZG93bkNvbnRyaWJ1dGlvbiArPSB0aGlzLmdyYXZpdHlHcmFkaWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBNYXRoLmF0YW4yKHVwQ29udHJpYnV0aW9uIC0gZG93bkNvbnRyaWJ1dGlvbiwgcmlnaHRDb250cmlidXRpb24gLSBsZWZ0Q29udHJpYnV0aW9uKTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIC8qXG4gICAgQ2FsY3VsYXRlIHRoZSBhbmdsZSB0aGF0IHRoaXMgYWN0aW9uIHBvaW50cyB0b1xuICAgICovXG4gICAgZ2V0R3JhZGllbnRUb0ZsdWlkcygpIHtcblxuICAgIH1cblxuICAgIG11dGF0ZShhbW91bnQ6IG51bWJlciA9IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZsdWlkR3JhZGllbnQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByID0gVXRpbHMuZ2V0Qm91bmRlZFJhbmRvbShhbW91bnQpO1xuICAgICAgICAgICAgdGhpcy5mbHVpZEdyYWRpZW50W2ldICs9IHI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmdyYXZpdHlHcmFkaWVudCAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eUdyYWRpZW50ICs9IFV0aWxzLmdldEJvdW5kZWRSYW5kb20oYW1vdW50KTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1bkdyYWRpZW50ICE9ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgdGhpcy5zdW5HcmFkaWVudCArPSBVdGlscy5nZXRCb3VuZGVkUmFuZG9tKGFtb3VudCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGl2aWRlQWN0aW9uIGV4dGVuZHMgRGlyZWN0aW9uYWxBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3Mpe1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQdW1wQWN0aW9uIGV4dGVuZHMgRGlyZWN0aW9uYWxBY3Rpb24ge1xuICAgIGZsdWlkczogQXJyYXk8bnVtYmVyPjtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3Mpe1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICAgICAgdGhpcy5mbHVpZHMgPSBhcmdzWydmbHVpZHMnXSB8fCBbXTtcbiAgICB9XG5cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHN1cGVyLm11dGF0ZShhbW91bnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmx1aWRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgciA9IFV0aWxzLmdldEJvdW5kZWRSYW5kb20oYW1vdW50KTtcbiAgICAgICAgICAgIHRoaXMuZmx1aWRzW2ldICs9IHI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWFjdEFjdGlvbiBpbXBsZW1lbnRzIElBY3Rpb24ge1xuICAgIHJlYWN0aW9uOiBBcnJheTxudW1iZXI+OyAvLyBmbHVpZCB2ZWNcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3Mpe1xuICAgICAgICB0aGlzLnJlYWN0aW9uID0gYXJnc1sncmVhY3Rpb24nXTtcbiAgICB9XG5cbiAgICAvLyBtdXRhdGluZyBhIHJlYWN0IGFjdGlvbiBzaG91bGQgbm90IGNoYW5nZSB0aGUgcmVhZ2VudHMgLyBwcm9kdWN0c1xuICAgIG11dGF0ZShhbW91bnQ6IG51bWJlciA9IDEpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTcGVjaWFsaXplQWN0aW9uIGltcGxlbWVudHMgSUFjdGlvbiB7XG4gICAgdG9UeXBlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzKXtcbiAgICAgICAgdGhpcy50b1R5cGUgPSBhcmdzWyd0b1R5cGUnXTtcbiAgICB9XG5cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG5cbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hY3Rpb24udHMiLCIvKlxuUmFkaWFuLWJhc2VkIGFuZ2xlcy5cbiovXG5leHBvcnQgY2xhc3MgQW5nbGUge1xuICAgIHN0YXRpYyBSSUdIVDogbnVtYmVyID0gMDtcbiAgICBzdGF0aWMgVVA6IG51bWJlciA9IE1hdGguUEkgLyAyO1xuICAgIHN0YXRpYyBMRUZUOiBudW1iZXIgPSBNYXRoLlBJO1xuICAgIHN0YXRpYyBET1dOOiBudW1iZXIgPSAzKk1hdGguUEkgLyAyO1xuXG4gICAgc3RhdGljIGRpcmVjdGlvbkRlbHRhUm93KGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gRGlyZWN0aW9uLnVwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09IERpcmVjdGlvbi5kb3duKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc3RhdGljIGRpcmVjdGlvbkRlbHRhQ29sKGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gRGlyZWN0aW9uLmxlZnQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRGlyZWN0aW9uLnJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvKlxuICAgIFJldHVybiBhIHJhbmRvbSBEaXJlY3Rpb24gZW51bSBiYXNlZCBvbiB0aGUgYW5nbGUuXG4gICAgc2FtcGxlRGlyZWN0aW9uKDApIHJldHVybnMgRGlyZWN0aW9uLlJJR0hULlxuICAgIHNhbXBsZURpcmVjdGlvbihNYXRoLlBJLzQpIGlzIGEgNTAtNTAgY2hhbmNlIFVQIG9yIFJJR0hULlxuICAgICovXG4gICAgc3RhdGljIHNhbXBsZURpcmVjdGlvbihhbmdsZTpudW1iZXIpIHtcbiAgICAgICAgYW5nbGUgPSBBbmdsZS5jYW5vbmljYWwoYW5nbGUpO1xuICAgICAgICBpZiAoYW5nbGUgPT0gQW5nbGUuUklHSFQpIHJldHVybiBEaXJlY3Rpb24ucmlnaHQ7XG4gICAgICAgIGlmIChhbmdsZSA9PSBBbmdsZS5VUCkgcmV0dXJuIERpcmVjdGlvbi51cDtcbiAgICAgICAgaWYgKGFuZ2xlID09IEFuZ2xlLkxFRlQpIHJldHVybiBEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgaWYgKGFuZ2xlID09IEFuZ2xlLkRPV04pIHJldHVybiBEaXJlY3Rpb24uZG93bjtcblxuICAgICAgICAvLyBkMSwgZDIgc3BlY2lmeSB0aGUgcXVhZHJhbnRcbiAgICAgICAgdmFyIGQxLCBkMjtcbiAgICAgICAgaWYgKGFuZ2xlPkFuZ2xlLlJJR0hUICYmIGFuZ2xlPEFuZ2xlLlVQKSB7XG4gICAgICAgICAgICBkMSA9IERpcmVjdGlvbi5yaWdodDtcbiAgICAgICAgICAgIGQyID0gRGlyZWN0aW9uLnVwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlPkFuZ2xlLlVQICYmIGFuZ2xlPEFuZ2xlLkxFRlQpIHtcbiAgICAgICAgICAgIGQxID0gRGlyZWN0aW9uLnVwO1xuICAgICAgICAgICAgZDIgPSBEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbmdsZT5BbmdsZS5MRUZUICYmIGFuZ2xlPEFuZ2xlLkRPV04pIHtcbiAgICAgICAgICAgIGQxID0gRGlyZWN0aW9uLmxlZnQ7XG4gICAgICAgICAgICBkMiA9IERpcmVjdGlvbi5kb3duO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZDEgPSBEaXJlY3Rpb24uZG93bjtcbiAgICAgICAgICAgIGQyID0gRGlyZWN0aW9uLnJpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBhbmdsZSBpcyBwb2ludGluZyB0b3dhcmQgZDFcbiAgICAgICAgYW5nbGUgPSBhbmdsZSAlIChNYXRoLlBJIC8gMik7XG4gICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgICAgICBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgY29zLyhzaW4rY29zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGQxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGQyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogUmV0dXJucyBhbmdsZSBiZXR3ZWVuIDAgYW5kIDIgUEkgKi9cbiAgICBzdGF0aWMgY2Fub25pY2FsKGFuZ2xlOm51bWJlcikge1xuICAgICAgICBhbmdsZSA9IGFuZ2xlICUgKDIgKiBNYXRoLlBJKTtcbiAgICAgICAgaWYgKGFuZ2xlIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlICsgMipNYXRoLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmdsZTtcbiAgICB9XG5cbiAgICAvKlxuICAgIENvbXB1dGVzIGFuZ2xlIG9mIHRoZSBnaXZlbiAoeCx5KSB2ZWN0b3JcbiAgICAqL1xuICAgIHN0YXRpYyB2ZWN0b3JBbmdsZSh4Om51bWJlciwgeTpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCk7XG4gICAgfVxuXG4gICAgLy8gc3RhdGljIGdyYWRpZW50KClcbn1cblxuLypcbkNhcmRpbmFsIGRpcmVjdGlvbiBlbnVtc1xuKi9cblxuZW51bSBEaXJlY3Rpb24ge1xuICAgIHJpZ2h0LFxuICAgIHVwLFxuICAgIGxlZnQsXG4gICAgZG93blxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FuZ2xlLnRzIiwiaW1wb3J0IHtDZWxsfSBmcm9tIFwiLi9jZWxsXCI7XG5pbXBvcnQge0ZsdWlkc30gZnJvbSBcIi4vZmx1aWRzXCI7XG5pbXBvcnQge0dyaWR9IGZyb20gXCIuL2dyaWRcIjtcbmltcG9ydCB7QXV0b21hdGF9IGZyb20gXCIuL2F1dG9tYXRhXCI7XG5pbXBvcnQge0lBY3Rpb24sIERpdmlkZUFjdGlvbiwgUHVtcEFjdGlvbiwgUmVhY3RBY3Rpb24sIFNwZWNpYWxpemVBY3Rpb24sIEFjdGlvblNlcmlhbGl6ZXJ9IGZyb20gXCIuL2FjdGlvblwiO1xuaW1wb3J0IHtQZXJjZXB0cm9ufSBmcm9tIFwiLi9wZXJjZXB0cm9uXCI7XG5pbXBvcnQge0NlbGxUeXBlU2VyaWFsaXplcn0gZnJvbSBcIi4vY2VsbHR5cGVzXCI7XG5cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IEROQSBvYmplY3QgdG8gc2VhcmNoIG92ZXIuXG4gKiBQbGFudHJwZyBpcyBzZWFyY2hpbmcgZm9yIHRoZSBtYXhpbXVtIG9mIGZpdG5lc3Mgb3ZlciB0aGUgc2V0IG9mIGFsbCBwb3NzaWJsZSBETkEuXG4gKlxuKi9cbmV4cG9ydCBjbGFzcyBETkEge1xuICBzdGF0aWMgTl9DRUxMX1RZUEVTOiBudW1iZXIgPSA1O1xuICBzdGF0aWMgQ09MT1JfSEVYX0FSUkFZID0gW1wiI2VkZWRiZVwiLCBcIiM4RjhGNkVcIiwgXCIjNkU2RThGXCIsIFwiIzhGNkU3RlwiLCBcIiM4MEM0QTFcIl07XG5cbiAgTkVXX0NFTExfQ09TVCA9IG5ldyBGbHVpZHMoMC4yLCAwLjIpO1xuXG4gIGFjdGlvbnM6IEFycmF5PElBY3Rpb24+O1xuICBjZWxsVHlwZXM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgd2luZG93WydkbmEnXSA9IHRoaXM7XG5cbiAgICB0aGlzLmFjdGlvbnMgPSBbXG4gICAgICAvLyBuZXcgRGl2aWRlQWN0aW9uKHsgZmx1aWRHcmFkaWVudDogWzAsMCwtMSwwLDAsMF0sIGdyYXZpdHlHcmFkaWVudDogMiB9KSxcbiAgICAgIC8vIG5ldyBEaXZpZGVBY3Rpb24oeyBmbHVpZEdyYWRpZW50OiBbMCwwLDAsMCwwLDBdLCBncmF2aXR5R3JhZGllbnQ6IDIgfSksXG4gICAgICBuZXcgUHVtcEFjdGlvbih7IGZsdWlkR3JhZGllbnQ6IFswLDAsMCwwLDAsMF0sIGZsdWlkczogWzEsMCwwLDAsMCwwXSB9KSxcbiAgICAgIC8vIG5ldyBSZWFjdEFjdGlvbih7IHJlYWN0aW9uOiBbLTAuMiwwLjgsMC4xLDAsMCwwXSB9KSwgLy9waG90b3N5bnRoXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLjEsMCwwLDBdIH0pLCAvLyBmcmVlIGF1eGluXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLDAuMSwwLDBdIH0pLCAvLyBmcmVlIG1pc2MgaG9ybW9uZXNcbiAgICAgIC8vIG5ldyBSZWFjdEFjdGlvbih7IHJlYWN0aW9uOiBbMCwwLDAsMCwwLjEsMF0gfSksIC8vIGZyZWUgbWlzYyBob3Jtb25lc1xuICAgICAgLy8gbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IFswLDAsMCwwLDAsMC4xXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLC0wLjEsMCwwXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLDAsLTAuMSwwXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLDAsMCwtMC4xXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgU3BlY2lhbGl6ZUFjdGlvbih7IHRvVHlwZTogMCB9KSxcbiAgICAgIC8vIG5ldyBTcGVjaWFsaXplQWN0aW9uKHsgdG9UeXBlOiAxIH0pLFxuICAgICAgLy8gbmV3IFNwZWNpYWxpemVBY3Rpb24oeyB0b1R5cGU6IDIgfSksXG4gICAgICAvLyBuZXcgU3BlY2lhbGl6ZUFjdGlvbih7IHRvVHlwZTogMyB9KSxcbiAgICAgIC8vIG5ldyBTcGVjaWFsaXplQWN0aW9uKHsgdG9UeXBlOiA0IH0pXG4gICAgXTtcblxuICAgIC8vIGNlbGwgdHlwZXNcbiAgICB0aGlzLmNlbGxUeXBlcyA9IG5ldyBBcnJheShETkEuTl9DRUxMX1RZUEVTKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEROQS5OX0NFTExfVFlQRVM7ICsraSkge1xuICAgICAgdmFyIGFjdGlvblBlcmNlcHRyb25zID0gW107XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7ICsraikge1xuICAgICAgICBhY3Rpb25QZXJjZXB0cm9uc1tqXSA9IG5ldyBQZXJjZXB0cm9uKEZsdWlkcy5OX0ZMVUlEUyArIDQsIDgsIDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5jZWxsVHlwZXNbaV0gPSB7XG4gICAgICAgIGNvbG9yOiBETkEuQ09MT1JfSEVYX0FSUkFZW2klRE5BLkNPTE9SX0hFWF9BUlJBWS5sZW5ndGhdLFxuICAgICAgICBpc0xlYWY6IGk9PTQsXG4gICAgICAgIGNvc3Q6IHRoaXMuTkVXX0NFTExfQ09TVCxcbiAgICAgICAgYWN0aW9uUGVyY2VwdHJvbnM6IGFjdGlvblBlcmNlcHRyb25zXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKCk6IEROQSB7XG4gICAgdmFyIHNlcmlhbCA9IEROQVNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMpO1xuICAgIHJldHVybiBETkFTZXJpYWxpemVyLmRlc2VyaWFsaXplKHNlcmlhbCk7XG4gIH1cblxuICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgLy8gbXV0YXRlIGFjdGlvbnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uc1tpXTtcbiAgICAgIGFjdGlvbi5tdXRhdGUoYW1vdW50KTtcbiAgICB9XG5cbiAgICAvLyBtdXRhdGUgdHlwZSBjb250cm9sbGVyc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jZWxsVHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB0eXBlID0gdGhpcy5jZWxsVHlwZXNbaV07XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHR5cGUuYWN0aW9uUGVyY2VwdHJvbnM7ICsraikge1xuICAgICAgICB2YXIgcCA9IHR5cGUuYWN0aW9uUGVyY2VwdHJvbnNbal07XG4gICAgICAgIHAucGVydHVyYihhbW91bnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYW50U2VlZChjZWxsQXJyYXk6IEFycmF5PEFycmF5PENlbGw+PiwgZmx1aWRzQXJyYXk6IEFycmF5PEFycmF5PEZsdWlkcz4+KSB7XG4gICAgLy8gY29tcHV0ZSBpbml0aWFsIGZsdWlkIHZlY3RvcnNcbiAgICB2YXIgd2F0ZXJJbml0aWFsID0gMjA7IC8vIDEuNzUgKiBBdXRvbWF0YS5NQVRFUklBTF9XQVRFUl9XQVRFUl9NRUFOO1xuICAgIHZhciBnbHVjb3NlSW5pdGlhbCA9IDIwOyAvLyA0LjA7XG4gICAgdmFyIGZsdWlkczEgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpLFxuICAgICAgICBmbHVpZHMyID0gbmV3IEZsdWlkcyh3YXRlckluaXRpYWwsIGdsdWNvc2VJbml0aWFsKSxcbiAgICAgICAgZmx1aWRzOiBGbHVpZHM7XG5cbiAgICAvLyByZWZlcmVuY2UgY29vcmRpbmF0ZXNcbiAgICB2YXIgcm93Q2VudGVyT2ZHcmlkID0gTWF0aC5mbG9vcihBdXRvbWF0YS5HUklEX05fUk9XUyAvIDIpLFxuICAgICAgICBjb2xDZW50ZXJPZkdyaWQgPSBNYXRoLmZsb29yKEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TIC8gMiksXG5cbiAgICAvLyBwbGFudCB0byBjcmVhdGVcbiAgICAgICAgcGxhbnQ6IEFycmF5PENlbGw+ID0gW10sXG4gICAgICAgIGNlbGw6IENlbGwsXG5cbiAgICAvLyBpdGVyYXRlLlxuICAgICAgICByb3dTdGFydDogbnVtYmVyID0gcm93Q2VudGVyT2ZHcmlkICsgMixcbiAgICAgICAgcm93RW5kOiBudW1iZXIgPSByb3dDZW50ZXJPZkdyaWQgKyAxMCxcbiAgICAgICAgcm93TWlkOiBudW1iZXIgPSBNYXRoLmZsb29yKChyb3dTdGFydCArIHJvd0VuZCkgLyAyKSxcbiAgICAgICAgY29sU3RhcnQ6IG51bWJlciA9IGNvbENlbnRlck9mR3JpZCAtIDIsXG4gICAgICAgIGNvbEVuZDogbnVtYmVyID0gY29sQ2VudGVyT2ZHcmlkICsgMixcbiAgICAgICAgY29sTWlkOiBudW1iZXIgPSBNYXRoLmZsb29yKChjb2xTdGFydCArIGNvbEVuZCkgLyAyKTtcbiAgICBmb3IgKHZhciByb3cgPSByb3dTdGFydDsgcm93IDwgcm93TWlkOyArK3Jvdykge1xuICAgICAgZm9yICh2YXIgY29sID0gY29sU3RhcnQ7IGNvbCA8IGNvbEVuZDsgKytjb2wpIHtcbiAgICAgICAgaWYgKGNvbCA9PSBjb2xNaWQpIGNvbnRpbnVlO1xuICAgICAgICBmbHVpZHMgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpO1xuICAgICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgdGhpcy5jZWxsVHlwZXNbMl0sIGZsdWlkcywgcm93LCBjb2wsIGNlbGxBcnJheSk7XG4gICAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgICAgY2VsbEFycmF5W3Jvd11bY29sXSA9IGNlbGw7XG4gICAgICAgIHBsYW50LnB1c2goY2VsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciByb3cgPSByb3dNaWQ7IHJvdyA8IHJvd0VuZDsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IGNvbFN0YXJ0OyBjb2wgPCBjb2xFbmQ7ICsrY29sKSB7XG4gICAgICAgIGlmIChjb2wgPT0gY29sTWlkKSBjb250aW51ZTtcbiAgICAgICAgZmx1aWRzID0gbmV3IEZsdWlkcyh3YXRlckluaXRpYWwsIGdsdWNvc2VJbml0aWFsKTtcbiAgICAgICAgY2VsbCA9IG5ldyBDZWxsKHRoaXMsIHRoaXMuY2VsbFR5cGVzWzNdLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpOyAvLyBkaWZmZXJlbnQgdHlwZSBpcyBvbmx5IGNoYW5nZVxuICAgICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGNlbnRlciBjb2x1bW5cbiAgICAvLyBtZXJpc3RlbXNcbiAgICBmb3IgKHZhciByb3cgPSByb3dTdGFydDsgcm93IDwgcm93TWlkOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgdGhpcy5jZWxsVHlwZXNbMF0sIGZsdWlkcywgcm93LCBjb2wsIGNlbGxBcnJheSk7XG4gICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICBjZWxsQXJyYXlbcm93XVtjb2xdID0gY2VsbDtcbiAgICAgIHBsYW50LnB1c2goY2VsbClcbiAgICB9XG5cbiAgICBmb3IgKHZhciByb3cgPSByb3dNaWQ7IHJvdyA8IHJvd0VuZDsgKytyb3cpIHtcbiAgICAgIHZhciBjb2wgPSBjb2xNaWQ7XG4gICAgICBmbHVpZHMgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpO1xuICAgICAgY2VsbCA9IG5ldyBDZWxsKHRoaXMsIHRoaXMuY2VsbFR5cGVzWzFdLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpO1xuICAgICAgZmx1aWRzQXJyYXlbcm93XVtjb2xdID0gZmx1aWRzO1xuICAgICAgY2VsbEFycmF5W3Jvd11bY29sXSA9IGNlbGw7XG4gICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgfVxuXG5cbiAgICByZXR1cm4gcGxhbnQ7XG4gIH1cblxuXG5cbiAgLypcbkluIG5hdHVyZSwgdGhlIGdlbmUgY29udHJvbHMgdGhlIHRyYW5zY3JpcHRpb24gcHJvZHVjdCwgYW5kIC5cblxuXG5JbnB1dHMgb2YgYSBjZWxsOlxuLSBGbHVpZHNcbi0gRmx1aWRzIGdyYWRpZW50Li4uXG5cbkFjdGlvbnMgb2YgYSBjZWxsOlxuXG5ETkEgaXMgYSBsaXN0IG9mIHBvdGVudGlhbCBhY3Rpb25zOlxuLSBSZXByb2R1Y2UgKGRpcmVjdGlvbmFsKSwgZGlyZWN0aW9uIHNwZWNpZmllZCBhcyB2ZWN0b3IgbXVsdGlwbGllciBvZiBmbHVpZHNcbi0gUHVtcCBmbHVpZHMgKGRpcmVjdGlvbmFsKSwgZGlyZWN0aW9uIHNwZWNpZmllZCBhcyB2ZWN0b3IgbXVsdGlwbGllciBvZiBmbHVpZHNcbi0gUmVhY3Rpb25zXG4tIFNwZWNpYWxpemVcblxuQ2VsbFR5cGUgaXMgdGhlIGNvbnRyb2xsZXIgb2YgRE5BIGFuZCBkZXRlcm1pbmVzIHdoZW4gZ2VuZSBwcm9kdWN0cyBhcmUgbWFkZS5cbkVhY2ggY2VsbCB0eXBlIGlzIGFsc28gYSAyIGxheWVyIG5ldXJhbCBuZXQsIHdoaWNoIHRha2VzIGFzIGlucHV0IHRoZSBmbHVpZCB2ZWN0b3IuXG5FYWNoIGNlbGwgdHlwZSBoYXMgYSBsaXN0IG9mIHBvdGVudGlhbCBhY3Rpb25zLCB3aGljaCBtYXkgYmUgcGFyYW1hdGVyaXplZCBieSBuZWlnaGJvciBzdGF0ZXMuXG5UcmFuc2l0aW9ucyBiZXR3ZWVuIGNlbGwgdHlwZXMgY2FuIGJlIG1vZGVsZWQgYXMgYSBtYXJrb3YgY2hhaW4sIHRob3VnaCBzb21lIHN0YXRlcyBhcmUgdW5yZWFjaGFibGUgb25jZSBsZWZ0LlxuICAqL1xuXG4gIC8qXG4gIEZvciBldmVyeSBhY3Rpb24sIGNlbGx0eXBlcyBoYXMgYSBuZXVyYWwgbmV0XG4gICovXG5cbn1cblxuLypcblNlcmlhbGl6YXRpb24gaXMgbmVjZXNzYXJ5IHRvIHN0b3JlIHRoZSByZXN1bHRzIG9mIGV2b2x1dGlvbiBzbyB0aGV5IGNhbiBiZSBwbGF5ZWQgYmFjaywgc2F2ZWRcbiovXG5leHBvcnQgY2xhc3MgRE5BU2VyaWFsaXplciB7XG4gIHN0YXRpYyBzZXJpYWxpemUoZG5hOiBETkEpOiBzdHJpbmcge1xuICAgIHZhciBhY3Rpb25zU2VyaWFsID0gbmV3IEFycmF5KGRuYS5hY3Rpb25zLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkbmEuYWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgYWN0aW9uc1NlcmlhbFtpXSA9IEFjdGlvblNlcmlhbGl6ZXIuc2VyaWFsaXplKGRuYS5hY3Rpb25zW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgY2VsbFR5cGVzU2VyaWFsID0gbmV3IEFycmF5KGRuYS5jZWxsVHlwZXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRuYS5jZWxsVHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2VsbFR5cGVzU2VyaWFsW2ldID0gQ2VsbFR5cGVTZXJpYWxpemVyLnNlcmlhbGl6ZShkbmEuY2VsbFR5cGVzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY2VsbFR5cGVzOiBjZWxsVHlwZXNTZXJpYWwsXG4gICAgICBhY3Rpb25zOiBhY3Rpb25zU2VyaWFsXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVzZXJpYWxpemUoc2VyaWFsaXplZDogc3RyaW5nKTogRE5BIHtcbiAgICB2YXIgZCA9IG5ldyBETkEoKTtcbiAgICB2YXIgbyA9IEpTT04ucGFyc2Uoc2VyaWFsaXplZCk7XG5cbiAgICB2YXIgYWN0aW9uc1NlcmlhbCA9IG8uYWN0aW9ucztcbiAgICB2YXIgYWN0aW9ucyA9IG5ldyBBcnJheShhY3Rpb25zU2VyaWFsLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3Rpb25zU2VyaWFsLmxlbmd0aDsgKytpKSB7XG4gICAgICBhY3Rpb25zW2ldID0gQWN0aW9uU2VyaWFsaXplci5kZXNlcmlhbGl6ZShhY3Rpb25zU2VyaWFsW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgY2VsbFR5cGVzU2VyaWFsID0gby5jZWxsVHlwZXM7XG4gICAgdmFyIGNlbGxUeXBlcyA9IG5ldyBBcnJheShjZWxsVHlwZXNTZXJpYWwubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxUeXBlcy5sZW5ndGg7ICsraSkge1xuICAgICAgY2VsbFR5cGVzW2ldID0gQ2VsbFR5cGVTZXJpYWxpemVyLmRlc2VyaWFsaXplKGNlbGxUeXBlc1NlcmlhbFtpXSk7XG4gICAgfVxuXG4gICAgZC5jZWxsVHlwZXMgPSBjZWxsVHlwZXM7XG4gICAgZC5hY3Rpb25zID0gYWN0aW9ucztcbiAgICByZXR1cm4gZDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RuYS50cyIsIi8qXG5hcHAuanNcblRoZSB2aWV3IHByb3ZpZGVyIGxheWVyIVxuVGhpcyBjYWxsczpcbihzaW11bGF0aW9uU3RhcnQpIHdoZW5cbiovXG5cbmltcG9ydCB7U2ltdWxhdGlvbn0gZnJvbSBcIi4vc2ltdWxhdGlvblwiO1xuaW1wb3J0IHtFdm9sdXRpb259IGZyb20gXCIuL2V2b2x1dGlvblwiO1xuaW1wb3J0IHtBbmdsZX0gZnJvbSBcIi4vYW5nbGVcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge0ROQVNlcmlhbGl6ZXJ9IGZyb20gXCIuL2RuYVwiO1xuaW1wb3J0IHtJVmlld1NpbXVsYXRpb259IGZyb20gXCIuL3NpbXVsYXRpb25cIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZHJhd0NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJhd1wiKTtcblxuICAgIHZhciBzaW06IElWaWV3U2ltdWxhdGlvbiA9IG5ldyBTaW11bGF0aW9uKGRyYXdDYW52YXMpO1xuICAgIC8vIHZhciBzaW0gPSBuZXcgRXZvbHV0aW9uKGRyYXdDYW52YXMpO1xuXG4gICAgc2ltLnJ1bigpO1xuXG4gICAgdmFyIHNpbU9uID0gc2ltLmlzU2ltdWxhdGlvblJ1bm5pbmc7XG5cbiAgICB3aW5kb3dbJ3RvZ2dsZVNpbXVsYXRpb24nXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2ltT24pIHtcbiAgICAgICAgICAgIHNpbS5wYXVzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2ltLnJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHNpbU9uID0gIXNpbU9uO1xuICAgIH1cbiAgICB3aW5kb3dbJ3Jlc2V0U2ltdWxhdGlvbiddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09IFJlc2V0dGluZyBzaW11bGF0aW9uID09PVwiKTtcbiAgICAgICAgc2ltLnJlc2V0KCk7XG4gICAgfVxuICAgIHdpbmRvd1sndG9nZ2xlRHJhdyddID0gc2ltLnRvZ2dsZURyYXcuYmluZChzaW0pO1xuICAgIHdpbmRvd1snZHJhd1N0eWxlJ10gPSBzaW0uZHJhd1N0eWxlLmJpbmQoc2ltKTtcblxuICAgIC8vIHNpbS5ydW5Gb3JOVGlja3MoMTAwKTtcblxuICAgIC8vIERFQlVHIC8vXG4gICAgLy8gd2luZG93WydhdXRvbWF0YSddID0gc2ltLmF1dG9tYXRhO1xuICAgIHdpbmRvd1snc2ltdWxhdGlvbiddID0gc2ltO1xuICAgIHdpbmRvd1snQW5nbGUnXSA9IEFuZ2xlO1xuICAgIHdpbmRvd1snVXRpbHMnXSA9IFV0aWxzO1xuICAgIHdpbmRvd1snRE5BU2VyaWFsaXplciddID0gRE5BU2VyaWFsaXplcjtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FwcC50cyIsIi8qXG5hcHAudHNcbiovXG5cbmltcG9ydCB7QXV0b21hdGF9IGZyb20gXCIuL2F1dG9tYXRhXCI7XG5pbXBvcnQge0ROQSwgRE5BU2VyaWFsaXplcn0gZnJvbSBcIi4vZG5hXCI7XG5pbXBvcnQge0NlbGx9IGZyb20gXCIuL2NlbGxcIjtcbmltcG9ydCB7TVlfUExBTlR9IGZyb20gXCIuL215cGxhbnRcIjtcblxuLy8gaW50ZXJmYWNlIGZvciB2aWV3IGxheWVyXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3U2ltdWxhdGlvbiB7XG4gICAgLy8gY29uc3RydWN0b3IoZHJhd0NhbnZhczogRWxlbWVudCk6IHZvaWQ7XG4gICAgcmVzZXQoKTogdm9pZDsgLy8gc2V0IHN0YXRlIHRvIGluaXRpYWxcbiAgICBwYXVzZSgpOiB2b2lkOyAvLyBwYXVzZSBleGVjdXRpb25cbiAgICBydW4oKTogdm9pZDsgLy9cbiAgICBpc1NpbXVsYXRpb25SdW5uaW5nO1xuICAgIHRvZ2dsZURyYXc7XG4gICAgZHJhd1N0eWxlO1xuXG4gICAgLy8gc2V0RHJhd0VuYWJsZWQoKVxuICAgIC8vIHNldERyYXdEaXNhYmxlZCgpXG59XG5cbmV4cG9ydCBjbGFzcyBTaW11bGF0aW9uIGltcGxlbWVudHMgSVZpZXdTaW11bGF0aW9uIHtcbiAgICBGUkFNRV9ERUxBWTogbnVtYmVyID0gODA7XG5cbiAgICBhdXRvbWF0YTogQXV0b21hdGE7XG4gICAgZHJhd0VuYWJsZWQ6IGJvb2xlYW47XG4gICAgZHJhd0NhbnZhczogRWxlbWVudDtcblxuICAgIC8vIGEgcmVmZXJlbmNlIHRvIHRoZSBkbmEgdXNlZCB0byBtYWtlIHRoZSBhdXRvbWF0YVxuICAgIGRuYTogRE5BO1xuXG4gICAgLy8gZmxhZ3MgZm9yIHNob3dpbmcgc3RhdHVzXG4gICAgaXNTaW11bGF0aW9uUnVubmluZzogYm9vbGVhbjtcbiAgICBtaWRVcGRhdGU6IGJvb2xlYW47XG5cbiAgICB0aWNrID0gMDtcbiAgICB1cGRhdGVJbnRlcnZhbDogbnVtYmVyO1xuXG4gICAgZml0bmVzczogQXJyYXk8bnVtYmVyPjtcblxuICAgIGNvbnN0cnVjdG9yKGRyYXdDYW52YXM6IEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5kcmF3Q2FudmFzID0gZHJhd0NhbnZhcztcbiAgICAgICAgdGhpcy5kcmF3RW5hYmxlZCA9IHRydWU7XG5cblxuICAgICAgICAvLyB0aGlzLmRuYSA9IEROQVNlcmlhbGl6ZXIuZGVzZXJpYWxpemUoTVlfUExBTlQpOyAvLyB0byBsb2FkIEROQSBmcm9tIGEgZmlsZVxuICAgICAgICAvLyB0aGlzLmRuYSA9IG5ldyBETkEoKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuXG4gICAgcmVzZXQoZG5hPzogRE5BKSB7XG4gICAgICAgIHRoaXMuc2hvd1N0YXR1c1N0cmluZygnUmVzZXR0aW5nLi4uJyk7XG4gICAgICAgIHRoaXMudGljayA9IDA7XG4gICAgICAgIGlmICghZG5hKSB7XG4gICAgICAgICAgICBkbmEgPSBuZXcgRE5BKCk7XG4gICAgICAgICAgICBkbmEubXV0YXRlKDEwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmlld1RlbXAgPSB0aGlzLmF1dG9tYXRhICYmIHRoaXMuYXV0b21hdGEuZHJhd1N0eWxlO1xuICAgICAgICB0aGlzLmF1dG9tYXRhID0gbmV3IEF1dG9tYXRhKCdwcm90b3R5cGUnLCB0aGlzLmRyYXdDYW52YXMpO1xuICAgICAgICB0aGlzLmF1dG9tYXRhLnBsYW50U2VlZChkbmEpO1xuICAgICAgICBpZiAodmlld1RlbXApXG4gICAgICAgICAgICB0aGlzLmF1dG9tYXRhLmRyYXdTdHlsZSA9IHZpZXdUZW1wO1xuXG4gICAgICAgIHdpbmRvd1snZml0bmVzcyddID0gdGhpcy5maXRuZXNzID0gW107XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuaXNTaW11bGF0aW9uUnVubmluZykge1xuICAgICAgICAvLyAgICAgdGhpcy51cGRhdGVQbGFudEZvcmV2ZXIoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgcnVuKCkge1xuICAgICAgICBpZiAodGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU2ltdWxhdGlvbiBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhd0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b21hdGEuZHJhdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVQbGFudEZvcmV2ZXIoKTtcbiAgICB9XG5cbiAgICAvLyB3ZWlyZCBzZWxmLWNhbGxpbmcgZnVuY3Rpb25cbiAgICB1cGRhdGVQbGFudEZvcmV2ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5maXRuZXNzW3RoaXMudGlja10gPSB0aGlzLmV2YWxGaXRuZXNzKHRoaXMuYXV0b21hdGEucGxhbnQpO1xuICAgICAgICAgICAgdGhpcy5hdXRvbWF0YS51cGRhdGUoKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBdXRvbWF0YSBlcnJvciEgU3RvcHBpbmcgc2ltdWxhdGlvbi4uLlwiKTtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmF3RW5hYmxlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9tYXRhLmRyYXcoKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkRyYXcgZXJyb3IhIFN0b3BwaW5nIHNpbXVsYXRpb24uLi5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpY2sgKys7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMudXBkYXRlUGxhbnRGb3JldmVyLmJpbmQodGhpcyksIHRoaXMuRlJBTUVfREVMQVkpO1xuICAgIH1cblxuICAgIGV2YWxGaXRuZXNzKHBsYW50OiBBcnJheTxDZWxsPik6IG51bWJlciB7XG4gICAgICAgIHZhciB0Zmx1aWRzID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFudC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNlbGw6IENlbGwgPSBwbGFudFtpXTtcbiAgICAgICAgICAgIHRmbHVpZHMgKz0gY2VsbC5zdW1GbHVpZHMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGZsdWlkcztcbiAgICB9XG5cbiAgICBydW5Gb3JOVGlja3MoTikge1xuICAgICAgICAvLyBydW4gc2ltIGZvciBOIHRpY2tzXG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgTjsgKytuKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9tYXRhLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXV0b21hdGEuZHJhdygpO1xuICAgIH1cblxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU2ltdWxhdGlvbiBpcyBhbHJlYWR5IHBhdXNlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudXBkYXRlSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLmlzU2ltdWxhdGlvblJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzU3RyaW5nKCdTaW11bGF0aW9uIHN0b3BwZWQuJyk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2ltdWxhdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTaW11bGF0aW9uUnVubmluZylcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICB9XG5cbiAgICB0b2dnbGVEcmF3KCkge1xuICAgICAgICB0aGlzLmRyYXdFbmFibGVkID0gIXRoaXMuZHJhd0VuYWJsZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKCk7XG4gICAgfVxuXG4gICAgZHJhd1N0eWxlKHN0eWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkcmF3U3R5bGUnLCBzdHlsZSk7XG4gICAgICAgIHRoaXMuYXV0b21hdGEuZHJhd1N0eWxlID0gc3R5bGU7XG4gICAgICAgIHRoaXMuYXV0b21hdGEuZHJhdygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXR1cygpIHtcbiAgICAgICAgdmFyIHN0YXR1cztcbiAgICAgICAgaWYgKHRoaXMuaXNTaW11bGF0aW9uUnVubmluZylcbiAgICAgICAgICAgIHN0YXR1cyA9ICdTaW11bGF0aW9uIHJ1bm5pbmcuICc7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0YXR1cyA9ICdTaW11bGF0aW9uIHN0b3BwZWQuICc7XG4gICAgICAgIGlmICghdGhpcy5kcmF3RW5hYmxlZClcbiAgICAgICAgICAgIHN0YXR1cyArPSAnKERyYXcgZGlzYWJsZWQuKSAnO1xuICAgICAgICBzdGF0dXMgKz0gXCJUaWNrIFwiICsgdGhpcy50aWNrO1xuICAgICAgICBpZiAodGhpcy5taWRVcGRhdGUpIHN0YXR1cyArPSBcIipcIjtcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzU3RyaW5nKHN0YXR1cyk7XG4gICAgfVxuXG4gICAgc2hvd1N0YXR1c1N0cmluZyhzdGF0dXMpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNcIikuaW5uZXJIVE1MID0gc3RhdHVzO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zaW11bGF0aW9uLnRzIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG5TeW5hcHRpYyBsaWJzXG4qL1xuZGVjbGFyZSBtb2R1bGUgQXJjaGl0ZWN0IHtcbiAgICBjbGFzcyBQZXJjZXB0cm9uIHtcbiAgICAgICAgY29uc3RydWN0b3IoLi4ubm5vZGVzKVxuICAgICAgICB0cmFpbmVyO1xuICAgICAgICBsYXllcnM7XG4gICAgICAgIGFjdGl2YXRlKC4uLmlucHV0KTtcbiAgICB9XG59XG5cbmRlY2xhcmUgY2xhc3MgTmV1cm9uIHtcbiAgICBiaWFzOiBudW1iZXJcbn1cblxuZGVjbGFyZSBjbGFzcyBDb25uZWN0aW9uIHtcbiAgICB3ZWlnaHQ6IG51bWJlclxufVxuXG5cbi8qXG5cbiovXG5leHBvcnQgY2xhc3MgUGVyY2VwdHJvbiBleHRlbmRzIEFyY2hpdGVjdC5QZXJjZXB0cm9uIHtcbiAgICBjb25zdHJ1Y3RvciguLi5ubm9kZXMpIHtcbiAgICAgICAgc3VwZXIoLi4ubm5vZGVzKTtcbiAgICB9XG5cbiAgICBwZXJ0dXJiKGFtb3VudDogbnVtYmVyID0gMS4wKSB7XG4gICAgICAgIC8vIHBlcnR1cmIgZXZlcnkgd2VpZ2h0IGJ5IH5hbW91bnRcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggbGF5ZXJzIGNvbm5lY3Rpb25zXG4gICAgICAgIHZhciBjb25uZWN0aW9uczogQXJyYXk8Q29ubmVjdGlvbj4gPSB0aGlzLmxheWVycy5pbnB1dC5jb25uZWN0ZWRUb1swXS5saXN0XG4gICAgICAgIC5jb25jYXQoY29ubmVjdGlvbnMgPSB0aGlzLmxheWVycy5oaWRkZW5bMF0uY29ubmVjdGVkVG9bMF0ubGlzdCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29ubmVjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gY29ubmVjdGlvbnNbaV07XG4gICAgICAgICAgICBjb25uZWN0aW9uLndlaWdodCArPSAyICogTWF0aC5yYW5kb20oKSAqIGFtb3VudCAtIGFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBuZXVyb25zXG4gICAgICAgIHZhciBuZXVyb25zOiBBcnJheTxOZXVyb24+ID0gdGhpcy5sYXllcnMuaW5wdXQubGlzdFxuICAgICAgICAuY29uY2F0KHRoaXMubGF5ZXJzLmhpZGRlblswXS5saXN0KVxuICAgICAgICAuY29uY2F0KHRoaXMubGF5ZXJzLm91dHB1dC5saXN0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXVyb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBuZXVyb25zW2ldLmJpYXMgKz0gMiAqIE1hdGgucmFuZG9tKCkgKiBhbW91bnQgLSBhbW91bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2VpZ2h0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAvLyAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLndlaWdodHNbaV0ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMud2VpZ2h0c1tpXVtqXS5sZW5ndGg7ICsraykge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLndlaWdodHNbaV1bal1ba10gKz0gMiAqIE1hdGgucmFuZG9tKCkgKiBhbW91bnQgLSBhbW91bnQ7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3BlcmNlcHRyb24udHMiLCJpbXBvcnQge0ZsdWlkc30gZnJvbSBcIi4vZmx1aWRzXCI7XG5cbmRlY2xhcmUgY2xhc3MgTmV0d29yayB7XG4gICAgc3RhdGljIGZyb21KU09OKGpzb246IHN0cmluZylcbn1cblxuZXhwb3J0IGNsYXNzIENlbGxUeXBlU2VyaWFsaXplciB7XG4gICAgc3RhdGljIHNlcmlhbGl6ZShjZWxsdHlwZTogT2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgdmFyIHBlcmNlcHRyb25zID0gY2VsbHR5cGVbJ2FjdGlvblBlcmNlcHRyb25zJ107XG4gICAgICAgIHZhciBwZXJjZXB0cm9uc1NlcmlhbCA9IG5ldyBBcnJheShwZXJjZXB0cm9ucy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBlcmNlcHRyb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBwZXJjZXB0cm9uc1NlcmlhbFtpXSA9IHBlcmNlcHRyb25zW2ldLnRvSlNPTigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGNvbG9yOiBjZWxsdHlwZVsnY29sb3InXSxcbiAgICAgICAgICAgIGlzTGVhZjogY2VsbHR5cGVbJ2lzTGVhZiddLFxuICAgICAgICAgICAgY29zdDogY2VsbHR5cGVbJ2Nvc3QnXS52ZWN0b3IsXG4gICAgICAgICAgICBhY3Rpb25QZXJjZXB0cm9uczogcGVyY2VwdHJvbnNTZXJpYWxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKHNlcmlhbCk6IE9iamVjdCB7XG4gICAgICAgIHZhciBvYmogPSBzZXJpYWw7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VyaWFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgb2JqID0gSlNPTi5wYXJzZShzZXJpYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBlcmNlcHRyb25zU2VyaWFsID0gb2JqLmFjdGlvblBlcmNlcHRyb25zO1xuICAgICAgICB2YXIgcGVyY2VwdHJvbnMgPSBuZXcgQXJyYXkocGVyY2VwdHJvbnNTZXJpYWwubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJjZXB0cm9uc1NlcmlhbC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcGVyY2VwdHJvbnNbaV0gPSBOZXR3b3JrLmZyb21KU09OKHBlcmNlcHRyb25zU2VyaWFsW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iai5hY3Rpb25QZXJjZXB0cm9ucyA9IHBlcmNlcHRyb25zO1xuICAgICAgICBvYmouY29zdCA9IG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoRmx1aWRzLCBvYmouY29zdCkpO1xuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2VsbFR5cGUge1xuICAgIHN0YXRpYyB0eXBlX3VwID0gMDtcbiAgICBzdGF0aWMgdHlwZV9yaWdodCA9IDE7XG4gICAgc3RhdGljIHR5cGVfcmVzdCA9IDI7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NlbGx0eXBlcy50cyJdLCJzb3VyY2VSb290IjoiIn0=