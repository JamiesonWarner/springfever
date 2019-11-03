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
    Fluids.CHLOROPLASTS = 2;
    Fluids.AUXIN = 3;
    Fluids.SIGNALS_START = 3;
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
function hex(byte) {
    var colorString = "";
    if (byte < 16) {
        colorString += "0" + byte.toString(16);
    }
    else {
        colorString += byte.toString(16);
    }
    return colorString;
}
function interpColors(colors, weights) {
    /*colors - a list of string hex representations, e.g., #0f5e9c
    weights - a list of values from 0 to 1
    */
    // Create the color
    var channels = [];
    for (var chan = 0; chan < 3; chan++) {
        var weightedSumInChannel = 0.0;
        for (var i = 0; i < colors.length; i++) {
            var color = colors[i], weight = weights[i];
            var channelAmount = parseInt(color.slice(1 + 2 * chan, 3 + 2 * chan), 16);
            weightedSumInChannel += Math.round(channelAmount * weight);
        }
        channels.push(weightedSumInChannel);
    }
    // Add a white fill background
    var sumWeights = 0.0;
    for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
        var weight = weights_1[_i];
        sumWeights += weight;
    }
    var fillAmount = Math.max(0, 1.0 - sumWeights);
    for (var chan = 0; chan < 3; chan++) {
        channels[chan] += Math.floor(255 * fillAmount);
    }
    // Convert the color to a hex code
    return "#" + hex(channels[0]) + hex(channels[1]) + hex(channels[2]);
}
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
        var CHLOROPLAST_COLOR = "#";
        // Background fill color
        var scale = Automata.CELL_SCALE_PIXELS;
        this.canvasCtx.lineWidth = 3;
        // this.canvasCtx.fillStyle = "#7EC0DD"; // sky
        // this.canvasCtx.fillRect(0,0, Automata.GRID_N_COLUMNS * scale, scale * Automata.GRID_N_ROWS)
        // this.canvasCtx.fillRect(0, 0, 100, 100);
        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
            for (var col = 0; col < Automata.GRID_N_COLUMNS; col++) {
                var fluids = this.fluidsArray[row][col].vector;
                var waterContent = Math.max(0, Math.min(255, Math.round(fluids[fluids_1.Fluids.WATER])));
                if (this.drawStyle === 'water') {
                    var waterConcentration = fluids[fluids_1.Fluids.WATER] / (2 * Automata.MATERIAL_DIRT_WATER_MEAN);
                    var waterColor = Math.max(Math.min(Math.round(255 * waterConcentration), 255), 0);
                    var colorString = "#" + "0064" + hex(waterColor);
                    this.canvasCtx.fillStyle = colorString;
                }
                else if (this.drawStyle === 'glucose') {
                    if (this.cellArray[row][col]) {
                        this.canvasCtx.fillStyle = "#" + hex(Math.min(255, Math.ceil(fluids[fluids_1.Fluids.GLUCOSE]))) + "0000";
                    }
                    else {
                        this.canvasCtx.fillStyle = "#000000";
                    }
                }
                else if (this.drawStyle === 'auxin') {
                    var cell = this.cellArray[row][col];
                    if (cell) {
                        this.canvasCtx.fillStyle = "#" + "0000" + hex(Math.min(255, Math.ceil(255 * fluids[fluids_1.Fluids.SIGNALS_START])));
                    }
                    else {
                        this.canvasCtx.fillStyle = "#000000";
                    }
                }
                else {
                    // Default draw style is to show chemicals
                    var cell = this.cellArray[row][col];
                    if (cell) {
                        // this.canvasCtx.fillStyle = cell.type.color;
                        var COLOR_WATER = "#0f5e9c";
                        var COLOR_CHLOROPLAST = "#25523b";
                        this.canvasCtx.fillStyle = interpColors([COLOR_WATER, COLOR_CHLOROPLAST], [waterContent / 50, cell.getChloroplastLevels() / 50]);
                    }
                    else if (row >= 50) {
                        var cval = Math.ceil(waterContent / 4);
                        // console.log(waterContent);
                        this.canvasCtx.fillStyle = "#3311" + hex(cval);
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
A Cell is a stateful decision-maker. Cells are the living units of the grid.
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
    Cell.prototype.getChloroplastLevels = function () {
        return this.fluids.vector[fluids_1.Fluids.CHLOROPLASTS];
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGNlM2FhMjk5YWQzNzg1NWE5NDYiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ZsdWlkcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2F1dG9tYXRhLnRzIiwid2VicGFjazovLy8uL2FwcC9jZWxsLnRzIiwid2VicGFjazovLy8uL2FwcC9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FuZ2xlLnRzIiwid2VicGFjazovLy8uL2FwcC9kbmEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvc2ltdWxhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcGVyY2VwdHJvbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2VsbHR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzNEQTtJQVlJO1FBQVksYUFBTTthQUFOLFVBQU0sRUFBTixxQkFBTSxFQUFOLElBQU07WUFBTix3QkFBTTs7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENB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M0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQ0FDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUM5RCxDQUFDO2dDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7b0NBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEtBQUssR0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQ0FDOUQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxD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Qy9CO0lBQUE7SUFJQSxDQUFDO0lBSFUsZ0JBQU8sR0FBRyxDQUFDLENBQUM7SUFDWixtQkFBVSxHQUFHLENBQUMsQ0FBQztJQUNmLGtCQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLGVBQUM7Q0FBQTtBQUpZLDRCQUFRIiwiZmlsZSI6Ii4vYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGNlM2FhMjk5YWQzNzg1NWE5NDYiLCJpbXBvcnQge0F1dG9tYXRhfSBmcm9tIFwiLi9hdXRvbWF0YVwiO1xuXG5leHBvcnQgY2xhc3MgRmx1aWRzIHtcbiAgICBzdGF0aWMgV0FURVIgPSAwO1xuICAgIHN0YXRpYyBHTFVDT1NFID0gMTtcbiAgICBzdGF0aWMgQ0hMT1JPUExBU1RTID0gMjtcbiAgICBzdGF0aWMgQVVYSU4gPSAzO1xuXG4gICAgc3RhdGljIFNJR05BTFNfU1RBUlQgPSAzO1xuICAgIHN0YXRpYyBOX1NJR05BTFMgPSA0O1xuICAgIHN0YXRpYyBOX0ZMVUlEUyA9IDIgKyBGbHVpZHMuTl9TSUdOQUxTO1xuXG4gICAgdmVjdG9yO1xuXG4gICAgY29uc3RydWN0b3IoLi4udmVjKSB7XG4gICAgICAgIHRoaXMudmVjdG9yID0gbmV3IEFycmF5KEZsdWlkcy5OX0ZMVUlEUyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRmx1aWRzLk5fRkxVSURTOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yW2ldID0gdmVjW2ldIHx8IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXRQcmVzc3VyZUluQXJlYShhcmVhOiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5zdW1GbHVpZHMoKSAvIGFyZWE7XG4gICAgLy8gfVxuXG5cblxuICAgIC8qXG4gICAgR29hbDogIHFcbiAgICAqL1xuXG4gICAgLypcbiAgICBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBhIGdpdmVuIGZsdWlkLCB3aGljaCBpcyB0aGUgYW1vdW50IG9mIGEgc3Vic3RhbmNlIHBlciB1bml0IHZvbHVtZS5cbiAgICBkaXZpZGVkIGJ5IHRoZSB0b3RhbCBmbHVpZC5cblxuICAgICovXG5cbiAgICAvKlxuXG4gICAgKi9cbiAgICBnZXRGbHVpZENvbmNlbnRyYXRpb24oZmx1aWRJZCwgYXJlYSkge1xuXG4gICAgfVxuXG4gICAgLypcbiAgICBEaWZmdXNpdmUgZmx1eCBpcyByYXRlIG9mIGZsb3cgcGVyIHVuaXQgYXJlYS4gUG9zaXRpdmUgdmFsdWUgbWVhbnMgb3V0d2FyZCBmbG93LlxuXG4gICAgRmljaydzIGxhdyBvZiBkaWZmdXNpb246IEogPSAtRCAoZCBwaGkpLyhkIHgpXG4gICAgSiBpcyBkaWZmdXNpdmUgZmx1eFxuICAgIEQgaXMgZGlmZnVzaW9uIGNvZWZmaWNpZW50XG4gICAgcGhpIGlzIGFtb3VudCBvZlxuICAgIHggaXMgcG9zaXRpb25cbiAgICAqL1xuICAgIGdldERpZmZ1c2l2ZUZsdXgodG9GbHVpZCwgYXJlYTEsIGFyZWEyKXt9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9mbHVpZHMudHMiLCJleHBvcnQgY2xhc3MgVXRpbHMge1xuXG4gIC8qXG4gIFJldHVybnMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gLWJvdW5kIGFuZCBib3VuZFxuICAqL1xuICBzdGF0aWMgZ2V0Qm91bmRlZFJhbmRvbShib3VuZCkge1xuICAgIHJldHVybiAyICogYm91bmQgKiBNYXRoLnJhbmRvbSgpIC0gYm91bmQ7XG4gIH1cblxuICBzdGF0aWMgY3Jvc3NQcm9kdWN0KGFycjEsIGFycjIpIHtcbiAgICB2YXIgc3VtID0gMDtcbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oYXJyMS5sZW5ndGgsIGFycjIubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICBzdW0gKz0gYXJyMVtpXSAqIGFycjJbaV07XG4gICAgfVxuICAgIHJldHVybiBzdW07XG4gIH1cblxuICBzdGF0aWMgbDJub3JtKGFycikge1xuICAgICAgdmFyIG4gPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBuICs9IGFycltpXSAqIGFycltpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLnNxcnQobik7XG4gIH1cblxuICBzdGF0aWMgbDFub3JtKGFycikge1xuICAgIHZhciBuID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgICAgbiArPSBhcnJbaV07XG4gICAgfVxuICAgIHJldHVybiBuO1xuICB9XG5cblxuICBzdGF0aWMgZGlzdGFuY2VUb1BsYW5lKGZsdWlkcywgYWN0aXZhdG9yKSB7XG4gICAgdmFyIG5vcm1XID0gVXRpbHMubDJub3JtKGFjdGl2YXRvci53KTtcblxuICAgIHZhciBkID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgIGQgKz0gZmx1aWRzW2ldICogYWN0aXZhdG9yW2ldO1xuICAgIH1cbiAgICBkICs9IGFjdGl2YXRvci5iO1xuICAgIHJldHVybiBkIC8gbm9ybVc7XG4gIH1cblxuICAvKlxuICBTaWdtb2lkIGFjdGl2YXRvci5cbiAgUmV0dXJucyB2YWx1ZSBmcm9tIDAgdG8gMSBnaXZlbiBmIGZyb20gLWluZiB0byBpbmYuXG4gICovXG4gIHN0YXRpYyBhY3RpdmF0b3JGdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gMSAvICgxICsgTWF0aC5leHAoLXYpKTtcbiAgfVxuXG4gIHN0YXRpYyBhcmdtYXgoYXJyOiBBcnJheTxudW1iZXI+KSB7XG4gICAgaWYgKCFhcnIubGVuZ3RoKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIHZhciBtYXggPSBhcnJbMF07XG4gICAgdmFyIGFyZ21heCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChhcnJbaV0gPiBtYXgpIHtcbiAgICAgICAgYXJnbWF4ID0gaTtcbiAgICAgICAgbWF4ID0gYXJyW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcmdtYXg7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC91dGlscy50cyIsImltcG9ydCB7RE5BfSBmcm9tIFwiLi9kbmFcIjtcbmltcG9ydCB7Q2VsbH0gZnJvbSBcIi4vY2VsbFwiXG5pbXBvcnQge0RpcnR9IGZyb20gXCIuL2RpcnRcIjtcbmltcG9ydCB7Rmx1aWRzfSBmcm9tIFwiLi9mbHVpZHNcIjtcbmltcG9ydCB7SVN5c3RlbX0gZnJvbSBcIi4vc3lzdGVtXCI7XG5pbXBvcnQge0lBY3Rpb24sIERpdmlkZUFjdGlvbiwgUmVhY3RBY3Rpb24sIFNwZWNpYWxpemVBY3Rpb24sIFB1bXBBY3Rpb259IGZyb20gXCIuL2FjdGlvblwiO1xuaW1wb3J0IHtBbmdsZX0gZnJvbSBcIi4vYW5nbGVcIjtcblxuZnVuY3Rpb24gaGV4KGJ5dGUpe1xuICBsZXQgY29sb3JTdHJpbmcgPSBcIlwiO1xuICBpZiAoYnl0ZSA8IDE2KSB7XG4gICAgY29sb3JTdHJpbmcgKz0gXCIwXCIgKyBieXRlLnRvU3RyaW5nKDE2KTtcbiAgfVxuICBlbHNlIHtcbiAgICBjb2xvclN0cmluZyArPSBieXRlLnRvU3RyaW5nKDE2KTtcbiAgfVxuICByZXR1cm4gY29sb3JTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGludGVycENvbG9ycyhjb2xvcnMsIHdlaWdodHMpIHtcbiAgLypjb2xvcnMgLSBhIGxpc3Qgb2Ygc3RyaW5nIGhleCByZXByZXNlbnRhdGlvbnMsIGUuZy4sICMwZjVlOWNcbiAgd2VpZ2h0cyAtIGEgbGlzdCBvZiB2YWx1ZXMgZnJvbSAwIHRvIDFcbiAgKi9cbiAgLy8gQ3JlYXRlIHRoZSBjb2xvclxuICB2YXIgY2hhbm5lbHMgPSBbXVxuICBmb3IgKHZhciBjaGFuPTA7IGNoYW48MzsgY2hhbisrKSB7XG4gICAgdmFyIHdlaWdodGVkU3VtSW5DaGFubmVsID0gMC4wXG4gICAgZm9yICh2YXIgaT0wOyBpPGNvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvbG9yID0gY29sb3JzW2ldLFxuICAgICAgICAgIHdlaWdodCA9IHdlaWdodHNbaV1cbiAgICAgIGxldCBjaGFubmVsQW1vdW50ID0gcGFyc2VJbnQoY29sb3Iuc2xpY2UoMSsyKmNoYW4sIDMrMipjaGFuKSwgMTYpXG4gICAgICB3ZWlnaHRlZFN1bUluQ2hhbm5lbCArPSBNYXRoLnJvdW5kKGNoYW5uZWxBbW91bnQgKiB3ZWlnaHQpXG4gICAgfVxuICAgIGNoYW5uZWxzLnB1c2god2VpZ2h0ZWRTdW1JbkNoYW5uZWwpXG4gIH1cblxuICAvLyBBZGQgYSB3aGl0ZSBmaWxsIGJhY2tncm91bmRcbiAgbGV0IHN1bVdlaWdodHMgPSAwLjBcbiAgZm9yIChjb25zdCB3ZWlnaHQgb2Ygd2VpZ2h0cykge1xuICAgIHN1bVdlaWdodHMgKz0gd2VpZ2h0XG4gIH1cbiAgbGV0IGZpbGxBbW91bnQgPSBNYXRoLm1heCgwLCAxLjAgLSBzdW1XZWlnaHRzKVxuICBmb3IgKHZhciBjaGFuPTA7IGNoYW48MzsgY2hhbisrKSB7XG4gICAgY2hhbm5lbHNbY2hhbl0gKz0gTWF0aC5mbG9vcigyNTUqZmlsbEFtb3VudClcbiAgfVxuXG4gIC8vIENvbnZlcnQgdGhlIGNvbG9yIHRvIGEgaGV4IGNvZGVcbiAgcmV0dXJuIFwiI1wiICsgaGV4KGNoYW5uZWxzWzBdKSArIGhleChjaGFubmVsc1sxXSkgKyBoZXgoY2hhbm5lbHNbMl0pXG59XG5cbi8qXG5UT0RPIHR1cm4gQXV0b21hdGEgaW50byBzeXN0ZW1zIG1vZGVsLlxuQXV0b21hdGEgaXMgYSBwbGFjZSBmb3Igc2hhcmVkIHN0YXRlLlxuQXV0b21hdGEganVzdCBzdG9yZXMgc3R1ZmYgbGlrZSB0aGUgZmx1aWRzQXJyYXksIGFuZCBpdHMgc3RhdGUgaXMgdHJhbnNmb3JtZWQgYnkgU3lzdGVtcy5cbiovXG5leHBvcnQgY2xhc3MgQXV0b21hdGEge1xuICBzdGF0aWMgR1JJRF9OX0NPTFVNTlMgPSAxMjA7XG4gIHN0YXRpYyBHUklEX05fUk9XUyA9IDEwMDtcbiAgc3RhdGljIENFTExfU0NBTEVfUElYRUxTID0gODtcblxuICAvLyB1c2VkIHRvIGVzdGltYXRlIHR1cmdpZGl0eS4gV29sZnJhbSBBbHBoYTogbWFzcyBvZiAxY21eMyB3YXRlclxuICBzdGF0aWMgTUFURVJJQUxfV0FURVJfV0FURVJfTUVBTiA9IDEuMDtcbiAgLy8gV29sZnJhbSBBbHBoYTogbWFzcyBvZiAxIGNtXjMgbW9pc3Qgc29pbCAtIFdvbGZyYW0gQWxwaGE6IG1hc3Mgb2YgMWNtXjMgZHJ5IHNvaWw7XG4gIHN0YXRpYyBNQVRFUklBTF9ESVJUX1dBVEVSX01FQU4gPSAwLjIxO1xuICAvLyBXb2xmcmFtIEFscGhhOiBtYXNzIG9mIHdhdGVyIHZhcG9yIGluIDEgY3ViaWMgY2VudGltZXIgYWlyO1xuICBzdGF0aWMgTUFURVJJQUxfQUlSX1dBVEVSX01FQU4gPSAxLjUxOWUtNTtcblxuICBjYW52YXM7XG4gIGNhbnZhc0N0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBmbHVpZHNBcnJheTogQXJyYXk8QXJyYXk8Rmx1aWRzPj47XG4gIGNlbGxBcnJheTogQXJyYXk8QXJyYXk8Q2VsbD4+OyAvLyB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm8gY2VsbFxuICBwbGFudDogQXJyYXk8Q2VsbD47XG4gIGRuYTtcblxuICBkcmF3U3R5bGU6IHN0cmluZztcblxuICBzeXN0ZW1zOiBBcnJheTxJU3lzdGVtPjtcblxuICBjb25zdHJ1Y3RvcihydW5TdHJpbmc6IFN0cmluZywgZHJhd0NhbnZhczogRWxlbWVudCkge1xuICAgIHRoaXMuc3lzdGVtcyA9IG5ldyBBcnJheSgpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBkcmF3Q2FudmFzO1xuICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUyAqIEF1dG9tYXRhLkNFTExfU0NBTEVfUElYRUxTKTtcbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIEF1dG9tYXRhLkdSSURfTl9ST1dTICogQXV0b21hdGEuQ0VMTF9TQ0FMRV9QSVhFTFMpO1xuICAgIHRoaXMuY2FudmFzQ3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgdGhpcy5mbHVpZHNBcnJheSA9IG5ldyBBcnJheShBdXRvbWF0YS5HUklEX05fUk9XUyk7XG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7IHJvdysrKSB7XG4gICAgICB0aGlzLmZsdWlkc0FycmF5W3Jvd10gPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMpO1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG5cbiAgICAvLyBjcmVhdGUgZmx1aWQgZm9yIGVhY2ggbG9jYXRpb24gaW4gdGhlIGZsdWlkcyBhcnJheVxuICAgIHZhciB3YXRlcjtcbiAgICBpZiAodGhpcy5pc0RpcnRDZWxsKHJvdywgY29sKSlcbiAgICAgIHdhdGVyID0gQXV0b21hdGEuTUFURVJJQUxfRElSVF9XQVRFUl9NRUFOXG4gICAgLy8gVW5jb21tZW50IGxpbmUgdG8gbWFrZSBhIHJhbmRvbSBhbW91bnQgb2Ygc3RhcnRpbmcgd2F0ZXJcbiAgICAvLyB3YXRlciA9IE1hdGgucmFuZG9tKCkgKiAyICogQXV0b21hdGEuTUFURVJJQUxfRElSVF9XQVRFUl9NRUFOO1xuICAgIGVsc2VcbiAgICAgIHdhdGVyID0gQXV0b21hdGEuTUFURVJJQUxfQUlSX1dBVEVSX01FQU5cbiAgICAvLyBVbmNvbW1lbnQgbGluZSB0byBtYWtlIGEgcmFuZG9tIGFtb3VudCBvZiBzdGFydGluZyB3YXRlclxuICAgIC8vIHdhdGVyID0gTWF0aC5yYW5kb20oKSAqIDIgKiBBdXRvbWF0YS5NQVRFUklBTF9BSVJfV0FURVJfTUVBTjtcbiAgICB0aGlzLmZsdWlkc0FycmF5W3Jvd11bY29sXSA9IG5ldyBGbHVpZHMod2F0ZXIsIDApO1xuICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNlbGxBcnJheSA9IG5ldyBBcnJheShBdXRvbWF0YS5HUklEX05fUk9XUyk7XG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7IHJvdysrKSB7XG4gICAgICB0aGlzLmNlbGxBcnJheVtyb3ddID0gbmV3IEFycmF5KEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TKTtcbiAgICAvLyBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUzsgKytjb2wpIHtcbiAgICAvLyAgIHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXSA9PSB1bmRlZmluZWQ7XG4gICAgLy8gfVxuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBkcmF3Q2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgIHNlbGYuc2hvd0luZm8oZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSk7XG4gICAgfSlcbiAgfVxuXG4gIG1ha2VDZWxsc0F0Q29vcmRpbmF0ZXMgIChjZWxsQXJyYXk6IEFycmF5PEFycmF5PENlbGw+PiwgZmx1aWRzQXJyYXk6IEFycmF5PEFycmF5PEZsdWlkcz4+KSB7XG4gICAgLy8gY29tcHV0ZSBpbml0aWFsIGZsdWlkIHZlY3RvcnNcbiAgICB2YXIgd2F0ZXJJbml0aWFsID0gMjA7IC8vIDEuNzUgKiBBdXRvbWF0YS5NQVRFUklBTF9XQVRFUl9XQVRFUl9NRUFOO1xuICAgIHZhciBnbHVjb3NlSW5pdGlhbCA9IDIwOyAvLyA0LjA7XG4gICAgdmFyIGZsdWlkczogRmx1aWRzO1xuXG4gICAgLy8gcmVmZXJlbmNlIGNvb3JkaW5hdGVzXG4gICAgdmFyIHJvd0NlbnRlck9mR3JpZCA9IE1hdGguZmxvb3IoQXV0b21hdGEuR1JJRF9OX1JPV1MgLyAyKSxcbiAgICAgICAgY29sQ2VudGVyT2ZHcmlkID0gTWF0aC5mbG9vcihBdXRvbWF0YS5HUklEX05fQ09MVU1OUyAvIDIpLFxuXG4gICAgLy8gcGxhbnQgdG8gY3JlYXRlXG4gICAgICAgIHBsYW50OiBBcnJheTxDZWxsPiA9IFtdLFxuICAgICAgICBjZWxsOiBDZWxsLFxuXG4gICAgLy8gaXRlcmF0ZS5cbiAgICAgICAgcm93U3RhcnQ6IG51bWJlciA9IHJvd0NlbnRlck9mR3JpZCArIDIsXG4gICAgICAgIHJvd0VuZDogbnVtYmVyID0gcm93Q2VudGVyT2ZHcmlkICsgMTAsXG4gICAgICAgIHJvd01pZDogbnVtYmVyID0gTWF0aC5mbG9vcigocm93U3RhcnQgKyByb3dFbmQpIC8gMiksXG4gICAgICAgIGNvbFN0YXJ0OiBudW1iZXIgPSBjb2xDZW50ZXJPZkdyaWQgLSAyLFxuICAgICAgICBjb2xFbmQ6IG51bWJlciA9IGNvbENlbnRlck9mR3JpZCArIDIsXG4gICAgICAgIGNvbE1pZDogbnVtYmVyID0gTWF0aC5mbG9vcigoY29sU3RhcnQgKyBjb2xFbmQpIC8gMik7XG4gICAgZm9yICh2YXIgcm93ID0gcm93U3RhcnQ7IHJvdyA8IHJvd01pZDsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IGNvbFN0YXJ0OyBjb2wgPCBjb2xFbmQ7ICsrY29sKSB7XG4gICAgICAgIGlmIChjb2wgPT0gY29sTWlkKSBjb250aW51ZTtcbiAgICAgICAgZmx1aWRzID0gbmV3IEZsdWlkcyh3YXRlckluaXRpYWwsIGdsdWNvc2VJbml0aWFsKTtcbiAgICAgICAgY2VsbCA9IG5ldyBDZWxsKHRoaXMsIHRoaXMuZG5hLmNlbGxUeXBlc1syXSwgZmx1aWRzLCByb3csIGNvbCwgY2VsbEFycmF5KTtcbiAgICAgICAgZmx1aWRzQXJyYXlbcm93XVtjb2xdID0gZmx1aWRzO1xuICAgICAgICBjZWxsQXJyYXlbcm93XVtjb2xdID0gY2VsbDtcbiAgICAgICAgcGxhbnQucHVzaChjZWxsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIHJvdyA9IHJvd01pZDsgcm93IDwgcm93RW5kOyArK3Jvdykge1xuICAgICAgZm9yICh2YXIgY29sID0gY29sU3RhcnQ7IGNvbCA8IGNvbEVuZDsgKytjb2wpIHtcbiAgICAgICAgaWYgKGNvbCA9PSBjb2xNaWQpIGNvbnRpbnVlO1xuICAgICAgICBmbHVpZHMgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpO1xuICAgICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgdGhpcy5kbmEuY2VsbFR5cGVzWzNdLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpOyAvLyBkaWZmZXJlbnQgdHlwZSBpcyBvbmx5IGNoYW5nZVxuICAgICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGNlbnRlciBjb2x1bW5cbiAgICAvLyBtZXJpc3RlbXNcbiAgICBmb3IgKHZhciByb3cgPSByb3dTdGFydDsgcm93IDwgcm93TWlkOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgdGhpcy5kbmEuY2VsbFR5cGVzWzBdLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpO1xuICAgICAgZmx1aWRzQXJyYXlbcm93XVtjb2xdID0gZmx1aWRzO1xuICAgICAgY2VsbEFycmF5W3Jvd11bY29sXSA9IGNlbGw7XG4gICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgcm93ID0gcm93TWlkOyByb3cgPCByb3dFbmQ7ICsrcm93KSB7XG4gICAgICB2YXIgY29sID0gY29sTWlkO1xuICAgICAgZmx1aWRzID0gbmV3IEZsdWlkcyh3YXRlckluaXRpYWwsIGdsdWNvc2VJbml0aWFsKTtcbiAgICAgIGNlbGwgPSBuZXcgQ2VsbCh0aGlzLCB0aGlzLmRuYS5jZWxsVHlwZXNbMV0sIGZsdWlkcywgcm93LCBjb2wsIGNlbGxBcnJheSk7XG4gICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICBjZWxsQXJyYXlbcm93XVtjb2xdID0gY2VsbDtcbiAgICAgIHBsYW50LnB1c2goY2VsbClcbiAgICB9XG5cblxuICAgIHJldHVybiBwbGFudDtcbiAgfVxuXG4gIHBsYW50U2VlZChzZWVkOkROQSkge1xuICAgIC8vIHJlbW92ZSBhbGwgZXhpc3RpbmcgcGxhbnRzIGFuZCBhZGQgdGhlIHNwZWNpZmllZCBzZWVkXG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUzsgKytjb2wpIHtcbiAgICAgICAgdGhpcy5jZWxsQXJyYXlbcm93XVtjb2xdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBsYW50ID0gc2VlZC5wbGFudFNlZWQodGhpcy5jZWxsQXJyYXksIHRoaXMuZmx1aWRzQXJyYXkpO1xuICAgIHRoaXMuZG5hID0gc2VlZDtcbiAgfVxuXG4gIGlzQWlyQ2VsbChyb3csY29sKSB7XG4gICAgcmV0dXJuIHJvdyA8IDUwO1xuICB9XG4gIGlzRGlydENlbGwocm93LGNvbCkge1xuICAgIHJldHVybiByb3cgPj0gNTA7XG4gIH1cblxuICBwcmludEdyaWRGbHVpZHMoKSB7XG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUzsgKytjb2wpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0udmVjdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUZsdWlkc0FycmF5KCkge1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyArK3Jvdykge1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG4gICAgICAgIHZhciBmID0gdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0udmVjdG9yO1xuICAgICAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKSBjb25zb2xlLmxvZygncm93LGNvbCBhcmU6ICcsIHJvdywgY29sKTtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBmLmxlbmd0aDsgKytrKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmW2tdICE9PSAnbnVtYmVyJyB8fCBpc05hTihmW2tdKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvcjogSW52YWxpZCBmbHVpZCB2ZWN0b3IgYXQ6ICcgKyByb3crJywgJytjb2wpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZltrXSA8IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXYXJuaW5nOiBOZWdhdGl2ZSBmbHVpZHMgYXQ6ICcsIHJvdywgY29sKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzaG93SW5mbyh4LHkpIHtcbiAgICB2YXIgdHggPSB4IC8gQXV0b21hdGEuQ0VMTF9TQ0FMRV9QSVhFTFM7XG4gICAgdmFyIHR5ID0geSAvIEF1dG9tYXRhLkNFTExfU0NBTEVfUElYRUxTO1xuICAgIHZhciByb3cgPSBNYXRoLmZsb29yKHR5KTtcbiAgICB2YXIgY29sID0gTWF0aC5mbG9vcih0eClcbiAgICB2YXIgZmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhci13YXRlcicpLnN0eWxlLndpZHRoID0gZmx1aWRzLnZlY3RvcltGbHVpZHMuV0FURVJdICsgJ3B4JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFyLWdsdWNvc2UnKS5zdHlsZS53aWR0aCA9IGZsdWlkcy52ZWN0b3JbRmx1aWRzLkdMVUNPU0VdICsgJ3B4JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFyLWF1eGluJykuc3R5bGUud2lkdGggPSAoNDAqZmx1aWRzLnZlY3RvcltGbHVpZHMuQVVYSU5dKSArICdweCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQtd2F0ZXInKS5pbm5lckhUTUwgPSBcIlwiICsgZmx1aWRzLnZlY3RvcltGbHVpZHMuV0FURVJdO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0LWdsdWNvc2UnKS5pbm5lckhUTUwgPSBcIlwiICsgZmx1aWRzLnZlY3RvcltGbHVpZHMuR0xVQ09TRV07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQtYXV4aW4nKS5pbm5lckhUTUwgPSBcIlwiICsgZmx1aWRzLnZlY3RvcltGbHVpZHMuQVVYSU5dO1xuXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcInRpY2tcIik7XG4gICAgLy8gaWYgKHRoaXMucGxhbnQubGVuZ3RoKVxuICAgIC8vICAgY29uc29sZS5sb2coJ2NlbGwgZmx1aWRzJywgdGhpcy5wbGFudFswXS5mbHVpZHMudmVjdG9yKTtcblxuXG4gICAgdGhpcy5kb0NlbGxBY3Rpb25zKCk7XG4gICAgdGhpcy5kb1Bhc3NpdmVGbG93QW5kUGhvdG9zeW50aGVzaXMoKTtcbiAgICB0aGlzLmRvQ2VsbE1ldGFib2xpc20oKTtcbiAgICB0aGlzLmNlbGxEZWF0aCgpO1xuXG4gICAgLy8gdGhpcy5zaWduYWxzVXBkYXRlKCk7XG4gIH1cblxuICBkb0NlbGxBY3Rpb25zKCkge1xuICAgIC8vIENhbGMgYWN0aW9ucyBvbiB0aGlzIGZyYW1lXG4gICAgdmFyIGFjdGlvbnMgPSBuZXcgQXJyYXkodGhpcy5wbGFudC5sZW5ndGgpO1xuICAgIHZhciBjZWxsOiBDZWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudC5sZW5ndGg7IGkrKykge1xuICAgICAgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICBhY3Rpb25zW2ldID0gY2VsbC5jaG9vc2VBY3Rpb24oKTtcbiAgICAvLyBpZiAoYWN0aW9uc1tpXSkge1xuICAgIC8vICAgY29uc29sZS5sb2coYWN0aW9uc1tpXSk7XG4gICAgLy8gfVxuICAgIH1cblxuICAgIC8vIEFwcGx5IGFjdGlvbnMgb24gdGhpcyBmcmFtZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFhY3Rpb25zW2ldKSB7XG4gICAgICAgIGNvbnRpbnVlOyAvLyBjZWxsIGNob3NlIHRvIGRvIG5vdGhpbmdcbiAgICAgIH1cbiAgICAgIHZhciBhY3Rpb24gPSBhY3Rpb25zW2ldO1xuICAgICAgdmFyIGNlbGwgPSB0aGlzLnBsYW50W2ldO1xuICAgICAgLy8gY29uc29sZS5sb2coYWN0aW9uKTtcbiAgICAgIGlmKGFjdGlvbiBpbnN0YW5jZW9mIERpdmlkZUFjdGlvbikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNlbGwgd2FudHMgdG8gZ3Jvdy4uLlwiKVxuICAgICAgICB2YXIgZGFjdGlvbjogRGl2aWRlQWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBkaXJlY3Rpb24gb2YgdGhpcyBhY3Rpb25cblxuICAgICAgICB2YXIgbmVpZ2hib3JVcCA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3cgLSAxXVtjZWxsLmNvbF07XG4gICAgICAgIHZhciBuZWlnaGJvclJpZ2h0ID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvd11bY2VsbC5jb2wgKyAxXTtcbiAgICAgICAgdmFyIG5laWdoYm9yRG93biA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3cgKyAxXVtjZWxsLmNvbF07XG4gICAgICAgIHZhciBuZWlnaGJvckxlZnQgPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93XVtjZWxsLmNvbCAtIDFdO1xuICAgICAgICB2YXIgYW5nbGU6IG51bWJlciA9IGRhY3Rpb24uZ2V0QWN0aW9uRGlyZWN0aW9uKG5laWdoYm9yVXAsIG5laWdoYm9yUmlnaHQsIG5laWdoYm9yRG93biwgbmVpZ2hib3JMZWZ0KTtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gQW5nbGUuc2FtcGxlRGlyZWN0aW9uKGFuZ2xlKTtcbiAgICAgICAgdmFyIGRyb3cgPSBBbmdsZS5kaXJlY3Rpb25EZWx0YVJvdyhkaXJlY3Rpb24pO1xuICAgICAgICB2YXIgZGNvbCA9IEFuZ2xlLmRpcmVjdGlvbkRlbHRhQ29sKGRpcmVjdGlvbik7XG5cbiAgICAgICAgdmFyIGdJID0gdGhpcy5wbGFudFtpXS5yb3cgKyBkcm93O1xuICAgICAgICB2YXIgZ0ogPSB0aGlzLnBsYW50W2ldLmNvbCArIGRjb2w7XG5cbiAgICAgICAgdmFyIGNvc3QgPSBjZWxsLnR5cGUuY29zdDtcblxuICAgICAgICB2YXIgY2FuQWZmb3JkID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb3N0LnZlY3Rvci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKHRoaXMucGxhbnRbaV0uZmx1aWRzLnZlY3RvcltqXSA8IGNvc3QudmVjdG9yW2pdKSB7XG4gICAgICAgICAgICBjYW5BZmZvcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbkFmZm9yZCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2VsbCBjYW4ndCBhZmZvcmQuLi5cIilcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGdJIDwgMCB8fCBnSSA+PSBBdXRvbWF0YS5HUklEX05fUk9XUyB8fCBnSiA8IDAgfHwgZ0ogPj0gQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbm5vdCBtYWtlIGNlbGwgYXQgXCIgKyBnSiArIFwiLCBcIiArIGdJKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNlbGxBcnJheVtnSV1bZ0pdKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjZWxsIGFscmVhZHkgZXhpc3RzIGF0IFwiICsgZ0ogKyBcIiwgXCIgKyBnSSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuc3VidHJhY3RGbHVpZHMoY2VsbC5mbHVpZHMsIGNvc3QpO1xuICAgICAgICB2YXIgbmV3Rmx1aWRzID0gdGhpcy5zcGxpdEZsdWlkcyhjZWxsLmZsdWlkcyk7XG4gICAgICAgIHZhciBuQ2VsbCA9IG5ldyBDZWxsKHRoaXMuZG5hLCBjZWxsLnR5cGUsIG5ld0ZsdWlkcywgZ0ksIGdKLCB0aGlzLmNlbGxBcnJheSk7XG4gICAgICAgIHRoaXMucGxhbnQucHVzaChuQ2VsbCk7XG4gICAgICAgIHRoaXMuZmx1aWRzQXJyYXlbZ0ldW2dKXSA9IG5ld0ZsdWlkcztcbiAgICAgICAgdGhpcy5jZWxsQXJyYXlbZ0ldW2dKXSA9IG5DZWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBlbHNlIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBSZWFjdEFjdGlvbikge1xuICAgICAgLy8gICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAvLyAgICAgLy8gY29kZS4uLlxuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFNwZWNpYWxpemVBY3Rpb24pIHtcbiAgICAgICAgdmFyIHNhY3Rpb246IFNwZWNpYWxpemVBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIGNlbGwuc2V0VHlwZShzYWN0aW9uLnRvVHlwZSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFB1bXBBY3Rpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3B1bXBpbmcuLi4uJyk7XG4gICAgICAgIHZhciBwYWN0aW9uOiBQdW1wQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB2YXIgbmVpZ2hib3JVcCA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3cgLSAxXVtjZWxsLmNvbF07XG4gICAgICAgIHZhciBuZWlnaGJvclJpZ2h0ID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvd11bY2VsbC5jb2wgKyAxXTtcbiAgICAgICAgdmFyIG5laWdoYm9yRG93biA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3cgKyAxXVtjZWxsLmNvbF07XG4gICAgICAgIHZhciBuZWlnaGJvckxlZnQgPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93XVtjZWxsLmNvbCAtIDFdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYScpO1xuICAgICAgICB2YXIgYW5nbGU6IG51bWJlciA9IHBhY3Rpb24uZ2V0QWN0aW9uRGlyZWN0aW9uKG5laWdoYm9yVXAsIG5laWdoYm9yUmlnaHQsIG5laWdoYm9yRG93biwgbmVpZ2hib3JMZWZ0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2InKTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IEFuZ2xlLnNhbXBsZURpcmVjdGlvbihhbmdsZSk7XG4gICAgICAgIHZhciBkcm93ID0gQW5nbGUuZGlyZWN0aW9uRGVsdGFSb3coZGlyZWN0aW9uKTtcbiAgICAgICAgdmFyIGRjb2wgPSBBbmdsZS5kaXJlY3Rpb25EZWx0YUNvbChkaXJlY3Rpb24pO1xuICAgICAgICB2YXIgZ0kgPSB0aGlzLnBsYW50W2ldLnJvdyArIGRyb3c7XG4gICAgICAgIHZhciBnSiA9IHRoaXMucGxhbnRbaV0uY29sICsgZGNvbDtcbiAgICAgICAgaWYoZ0kgPCAwIHx8IGdJID49IEF1dG9tYXRhLkdSSURfTl9ST1dTIHx8IGdKIDwgMCB8fCBnSiA+PSBBdXRvbWF0YS5HUklEX05fQ09MVU1OUyApe1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjJyk7XG4gICAgICAgIHZhciB0YXJnZXRGbHVpZFZlYyA9IHRoaXMuZmx1aWRzQXJyYXlbZ0ldW2dKXS52ZWN0b3I7XG4gICAgICAgIHZhciBmbHVpZFZlYyA9IGNlbGwuZmx1aWRzLnZlY3RvcjtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYWN0aW9uLmZsdWlkcy5sZW5ndGg7ICsraikge1xuICAgICAgICAvLyBtb3ZlIGQgZmx1aWRzIGZyb20gZmx1aWRWZWMgdG8gdGFyZ2V0Rmx1aWRWZWNcbiAgICAgICAgLy8gaWYgZCBpcyBuZWdhdGl2ZSB0aGVuIHRoaXMgaXMgXCJwdWxsaW5nXCIgZmx1aWRzXG4gICAgICAgIHZhciBkID0gcGFjdGlvbi5mbHVpZHNbal07XG4gICAgICAgIC8vIGxldCB0aGUgcGxhbnQgXCJjaGVhdFwiOiBvbmx5IHB1bXAgKmZyb20qIGVudmlyb25tZW50LCAqdG8qIG90aGVyIHBsYW50IGNlbGxzXG4gICAgICAgIGlmICh0aGlzLmNlbGxBcnJheVtnSV1bZ0pdKSB7XG4gICAgICAgICAgZCA9IE1hdGguYWJzKGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGQgPSAtTWF0aC5hYnMoZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb24ndCBwdW1wIHRvIG5lZ2F0aXZlIGZsdWlkc1xuICAgICAgICBpZiAoZCA+IDApIHtcbiAgICAgICAgICBkID0gTWF0aC5taW4oZCwgZmx1aWRWZWNbal0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGQgPSBNYXRoLm1heChkLCAtdGFyZ2V0Rmx1aWRWZWNbal0pO1xuICAgICAgICB9XG4gICAgICAgIGZsdWlkVmVjW2pdIC09IGQ7XG4gICAgICAgIHRhcmdldEZsdWlkVmVjW2pdICs9IGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgfVxuICB9XG5cbiAgLypcbiAgS2lsbCBhbGwgY2VsbHMgd2hvIGRvbid0IGhhdmUgZW5vdWdoIHJlc291cmNlcyB0byBsaXZlXG4gICovXG4gIGNlbGxEZWF0aCgpIHtcbiAgICBsZXQgTUlOX1dBVEVSID0gMC4xICogQXV0b21hdGEuTUFURVJJQUxfV0FURVJfV0FURVJfTUVBTjtcbiAgICBsZXQgTUlOX0dMVUNPU0UgPSAwLjAwMTtcbiAgICBsZXQgdG9LaWxsID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICBpZiAoIWNlbGwuZmx1aWRzKSBjb250aW51ZTtcbiAgICAgIGlmIChjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLkdMVUNPU0VdIDwgTUlOX0dMVUNPU0UgfHxcbiAgICAgICAgY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl0gPCBNSU5fV0FURVIpIHtcbiAgLy8ga2lsbCBjZWxsXG4gIHRvS2lsbC5wdXNoKGNlbGwpO1xuICB9XG4gIGlmIChjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLkdMVUNPU0VdIDwgTUlOX0dMVUNPU0UpIHtcbiAgLy8gY29uc29sZS5sb2coJ2NlbGwga2lsbGVkIGR1ZSB0byBsYWNrIG9mIGdsdWNvc2UnKTtcbiAgfVxuICBpZiAoY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl0gPCBNSU5fV0FURVIpIHtcbiAgLy8gY29uc29sZS5sb2coJ2NlbGwga2lsbGVkIGR1ZSB0byBsYWNrIG9mIHdhdGVyJyk7XG4gIH1cblxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b0tpbGwubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY2VsbDogQ2VsbCA9IHRvS2lsbFtpXTtcbiAgLy8gY29uc29sZS5sb2coJ0tpbGxpbmcgY2VsbCBhdDogJywgY2VsbC5yb3csIGNlbGwuY29sKTtcbiAgdmFyIGluZGV4ID0gdGhpcy5wbGFudC5pbmRleE9mKGNlbGwpO1xuICB0aGlzLnBsYW50LnNwbGljZShpbmRleCwgMSk7XG4gIC8vIHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3ddW2NlbGwuY29sXSA9IGNlbGwuZmx1aWRzO1xuICB0aGlzLmNlbGxBcnJheVtjZWxsLnJvd11bY2VsbC5jb2xdID0gdW5kZWZpbmVkO1xuICB9XG4gIH1cblxuICBzdWJ0cmFjdEZsdWlkcyhhLCBiKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEudmVjdG9yLmxlbmd0aDsgaSArKyl7XG4gICAgICBhLnZlY3RvcltpXSAtPSBiLnZlY3RvcltpXTtcbiAgICB9XG4gIH1cblxuICBzcGxpdEZsdWlkcyhmbHVpZHMpe1xuICAgIGxldCBuZXdGbHVpZHMgPSBuZXcgRmx1aWRzKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbHVpZHMudmVjdG9yLmxlbmd0aDsgaSArKyl7XG4gICAgICBmbHVpZHMudmVjdG9yW2ldIC89IDI7XG4gICAgICBuZXdGbHVpZHMudmVjdG9yW2ldID0gZmx1aWRzLnZlY3RvcltpXTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0ZsdWlkcztcbiAgfVxuXG4gIHNpZ25hbHNVcGRhdGUoKSB7XG4gICAgLy8gVXBkYXRlIGVhY2ggY2VsbCdzIGluZGl2aWR1YWwgc2lnbmFsIGxldmVsc1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICBjZWxsLnVwZGF0ZVNpZ25hbHMoKTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHNpZ25hbHMgdG8gbmVpZ2hib3JzXG4gICAgbGV0IFNQUkVBRF9DT0VGRiA9IDAuMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjZWxsID0gdGhpcy5wbGFudFtpXTtcbiAgICAgIHZhciBuZWlnaGJzID0gW1stMSwgMF0sIFsxLCAwXSwgWzAsIDFdLCBbMCwgLTFdXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmVpZ2hicy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgbnJvdyA9IGNlbGwuY29sICsgbmVpZ2hic1tqXVswXTtcbiAgICAgICAgdmFyIG5jb2wgPSBjZWxsLnJvdyArIG5laWdoYnNbal1bMV07XG4gICAgICAgIGlmIChuY29sIDwgMCB8fCBucm93IDwgMCB8fCBuY29sID49IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TIHx8IG5yb3cgPj0gQXV0b21hdGEuR1JJRF9OX1JPV1MpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIHZhciBuZWlnaGJGbHVpZHMgPSB0aGlzLmZsdWlkc0FycmF5W25yb3ddW25jb2xdO1xuICAgICAgICBpZiAobmVpZ2hiRmx1aWRzIGluc3RhbmNlb2YgQ2VsbCkge1xuICAgICAgICAgIHZhciBuc2lnbmFscyA9IG5laWdoYkZsdWlkcy52ZWN0b3I7XG4gICAgICAgICAgZm9yICh2YXIgayA9IEZsdWlkcy5TSUdOQUxTX1NUQVJUOyBrIDwgRmx1aWRzLk5fRkxVSURTOyBrKyspIHtcbiAgICAgICAgICAgIGlmIChjZWxsLmZsdWlkc1trXSA8IG5zaWduYWxzW2tdKVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBhbW91bnQgPSBTUFJFQURfQ09FRkYgKiBjZWxsLmZsdWlkcy52ZWN0b3Jba107XG4gICAgICAgICAgICBuc2lnbmFsc1trXSArPSBhbW91bnQ7XG4gICAgICAgICAgICBjZWxsLmZsdWlkcy52ZWN0b3Jba10gLT0gYW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRvQ2VsbE1ldGFib2xpc20oKSB7XG4gICAgLy8gcmVzcGlyYXRpb24uIHRoaXMgaXMgbmVlZGVkIGZvciBtZXRhYm9saXNtXG4gICAgdmFyIFJFU1BJUkFUSU9OX0FNT1VOVCA9IDAuMDE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICBjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLldBVEVSXSAtPSBSRVNQSVJBVElPTl9BTU9VTlQ7XG4gICAgICBjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLkdMVUNPU0VdIC09IFJFU1BJUkFUSU9OX0FNT1VOVDtcbiAgICB9XG4gIH1cblxuICBkb1Bhc3NpdmVGbG93QW5kUGhvdG9zeW50aGVzaXMoKSB7XG5cbiAgICAvLyBJbml0aWFsaXplIGZsdWlkc0RpZmYgdG8gMCdzXG4gICAgdmFyIGZsdWlkc0RpZmYgPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX1JPV1MpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3crKykge1xuICAgICAgZmx1aWRzRGlmZltyb3ddID0gbmV3IEFycmF5KEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TKTtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuICAgICAgICBmbHVpZHNEaWZmW3Jvd11bY29sXSA9IG5ldyBBcnJheShGbHVpZHMuTl9GTFVJRFMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEZsdWlkcy5OX0ZMVUlEUzsgKytpKSB7XG4gICAgICAgICAgZmx1aWRzRGlmZltyb3ddW2NvbF1baV0gPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGhvdG9zeW50aGVzaXMuIFRPRE8gdGhpcyB3aWxsIGJlIGFuIGFjdGlvblxuICAgIHZhciBSRUFDVElPTl9GQUNUT1IgPSAxMDsgLy8gZXhwZW5kIDEgd2F0ZXIgdG8gZ2V0IDQgZ2x1Y29zZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNlbGwgPSB0aGlzLnBsYW50W2ldO1xuICAgICAgaWYgKGNlbGwudHlwZS5pc0xlYWYpIHtcbiAgICAgICAgbGV0IG51bUFpciA9IHRoaXMuY291bnRBaXJOZWlnaGJvcnMoY2VsbC5yb3csIGNlbGwuY29sKTtcbiAgICAgICAgbGV0IGRHbHVjb3NlID0gTWF0aC5taW4oY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl0vNCwgMTAwICogbnVtQWlyKTtcbiAgICAgICAgLy8gY29udmVydCB3YXRlciB0byBnbHVjb3NlXG4gICAgICAgIGZsdWlkc0RpZmZbY2VsbC5yb3ddW2NlbGwuY29sXVtGbHVpZHMuV0FURVJdIC09IGRHbHVjb3NlO1xuICAgICAgICBmbHVpZHNEaWZmW2NlbGwucm93XVtjZWxsLmNvbF1bRmx1aWRzLkdMVUNPU0VdICs9IFJFQUNUSU9OX0ZBQ1RPUipkR2x1Y29zZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQYXNzaXZlIHRyYW5zcG9ydCAvIGRpZmZ1c2lvbi4gR2l2ZSBudXRyaWVudHMgdG8gbmVpZ2hib3JzLlxuICAgIC8vIGNvbnNvbGUubG9nKGZsdWlkc0RpZmYpO1xuICAgIHZhciBuZWlnaGJzID0gW1stMSwgMF0sIFsxLCAwXSwgWzAsIDFdLCBbMCwgLTFdXTtcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBBdXRvbWF0YS5HUklEX05fUk9XUzsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICB2YXIgbmVpZ2hiUm93ID0gcm93ICsgbmVpZ2hic1tpXVswXTtcbiAgICAgICAgICB2YXIgbmVpZ2hiQ29sID0gY29sICsgbmVpZ2hic1tpXVsxXTtcbiAgICAgICAgICBpZiAoIXRoaXMuaXNQb3NpdGlvbk9uR3JpZChuZWlnaGJSb3csIG5laWdoYkNvbCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBmbG93UmF0ZSA9IDAuMTtcbiAgICAgICAgICAvLyBhaXIgdG8gYWlyIGlzIHZlcnkgZmFzdFxuICAgICAgICAgIGlmICh0aGlzLmlzQWlyTm90Q2VsbChyb3csY29sKSAmJiB0aGlzLmlzQWlyTm90Q2VsbChuZWlnaGJSb3csbmVpZ2hiQ29sKSkge1xuICAgICAgICAgICAgZmxvd1JhdGUgPSAwLjI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZGlzYWJsZSBwYXNzaXZlIGZsb3cgZnJvbSAvIHRvIGNlbGxzXG4gICAgICAgICAgaWYgKHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXSB8fCB0aGlzLmNlbGxBcnJheVtuZWlnaGJSb3ddW25laWdoYkNvbF0pIHtcbiAgICAgICAgICAvLyBmbG93UmF0ZSA9IDAuMDFcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmVpZ2hiRmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtuZWlnaGJSb3ddW25laWdoYkNvbF0udmVjdG9yO1xuICAgICAgICAgIHZhciBmbHVpZHMgPSB0aGlzLmZsdWlkc0FycmF5W3Jvd11bY29sXS52ZWN0b3I7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBGbHVpZHMuTl9GTFVJRFM7ICsraikge1xuICAgICAgICAgICAgaWYgKGZsdWlkc1tqXSA+IG5laWdoYkZsdWlkc1tqXSkge1xuICAgICAgICAgICAgICB2YXIgZGlmZiA9IGZsb3dSYXRlICogKGZsdWlkc1tqXSAtIG5laWdoYkZsdWlkc1tqXSk7XG4gICAgICAgICAgICAgIGZsdWlkc0RpZmZbcm93XVtjb2xdW2pdIC09IGRpZmY7XG4gICAgICAgICAgICAgIGZsdWlkc0RpZmZbbmVpZ2hiUm93XVtuZWlnaGJDb2xdW2pdICs9IGRpZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhpcy52YWxpZGF0ZUZsdWlkc0FycmF5KCk7XG5cbiAgICAvLyBBcHBseSBmbHVpZHNEaWZmIHRvIGZsdWlkc1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3cgKyspe1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7IGNvbCArKyApe1xuICAgICAgICB2YXIgZmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0udmVjdG9yO1xuICAgICAgICB2YXIgZmx1aWREaWZmID0gZmx1aWRzRGlmZltyb3ddW2NvbF07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRmx1aWRzLk5fRkxVSURTOyArK2kpIHtcbiAgICAgICAgICBmbHVpZHNbaV0gKz0gZmx1aWREaWZmW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNQb3NpdGlvbk9uR3JpZChyb3csIGNvbCkge1xuICAgIHJldHVybiByb3cgPj0gMCAmJiBjb2wgPj0gMCAmJlxuICAgIHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTICYmIGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TO1xuICB9XG5cbiAgaXNBaXJOb3RDZWxsKHJvdywgY29sKSB7XG4gIC8vIGNlbGwgaXMgZGVhZCBhbmQgY2VsbCBpcyBhaXIgY2VsbFxuICBpZiAoIXRoaXMuaXNQb3NpdGlvbk9uR3JpZChyb3csIGNvbCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHJvdyA8IDUwICYmICF0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF07XG4gIH1cblxuICBjb3VudEFpck5laWdoYm9ycyhyb3csIGNvbCl7XG4gICAgdmFyIG4gPSAodGhpcy5pc0Fpck5vdENlbGwocm93IC0gMSwgY29sKT8xOjApICtcbiAgICAodGhpcy5pc0Fpck5vdENlbGwocm93ICsgMSwgY29sKT8xOjApICtcbiAgICAodGhpcy5pc0Fpck5vdENlbGwocm93LCBjb2wgLSAxKT8xOjApICtcbiAgICAodGhpcy5pc0Fpck5vdENlbGwocm93LCBjb2wgKyAxKT8xOjApO1xuICAgIHJldHVybiBuO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUZsdWlkc0FycmF5KCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBpbiBmbHVpZHMsIHNraXBwaW5nIGRyYXcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBDSExPUk9QTEFTVF9DT0xPUiA9IFwiI1wiXG5cbiAgICAvLyBCYWNrZ3JvdW5kIGZpbGwgY29sb3JcbiAgICBsZXQgc2NhbGUgPSBBdXRvbWF0YS5DRUxMX1NDQUxFX1BJWEVMUztcbiAgICB0aGlzLmNhbnZhc0N0eC5saW5lV2lkdGggPSAzO1xuICAgIC8vIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzdFQzBERFwiOyAvLyBza3lcbiAgICAvLyB0aGlzLmNhbnZhc0N0eC5maWxsUmVjdCgwLDAsIEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TICogc2NhbGUsIHNjYWxlICogQXV0b21hdGEuR1JJRF9OX1JPV1MpXG4gICAgLy8gdGhpcy5jYW52YXNDdHguZmlsbFJlY3QoMCwgMCwgMTAwLCAxMDApO1xuXG5cbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBBdXRvbWF0YS5HUklEX05fUk9XUzsgcm93ICsrKXtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyBjb2wgKyspe1xuICAgICAgICB2YXIgZmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0udmVjdG9yO1xuICAgICAgICB2YXIgd2F0ZXJDb250ZW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKGZsdWlkc1tGbHVpZHMuV0FURVJdKSkpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyYXdTdHlsZSA9PT0gJ3dhdGVyJykge1xuICAgICAgICAgIHZhciB3YXRlckNvbmNlbnRyYXRpb24gPSBmbHVpZHNbRmx1aWRzLldBVEVSXSAvICgyICogQXV0b21hdGEuTUFURVJJQUxfRElSVF9XQVRFUl9NRUFOKTtcbiAgICAgICAgICB2YXIgd2F0ZXJDb2xvciA9IE1hdGgubWF4KE1hdGgubWluKE1hdGgucm91bmQoMjU1KndhdGVyQ29uY2VudHJhdGlvbiksMjU1KSwwKTtcbiAgICAgICAgICB2YXIgY29sb3JTdHJpbmcgPSBcIiNcIiArIFwiMDA2NFwiICsgaGV4KHdhdGVyQ29sb3IpO1xuICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IGNvbG9yU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5kcmF3U3R5bGUgPT09ICdnbHVjb3NlJyl7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjXCIgKyBoZXgoTWF0aC5taW4oMjU1LE1hdGguY2VpbChmbHVpZHNbRmx1aWRzLkdMVUNPU0VdKSkpICsgXCIwMDAwXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZHJhd1N0eWxlID09PSAnYXV4aW4nKSB7XG4gICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF07XG4gICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiI1wiICsgXCIwMDAwXCIgKyBoZXgoTWF0aC5taW4oMjU1LE1hdGguY2VpbCgyNTUqZmx1aWRzW0ZsdWlkcy5TSUdOQUxTX1NUQVJUXSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCBkcmF3IHN0eWxlIGlzIHRvIHNob3cgY2hlbWljYWxzXG4gICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF07XG4gICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IGNlbGwudHlwZS5jb2xvcjtcbiAgICAgICAgICAgIGNvbnN0IENPTE9SX1dBVEVSID0gXCIjMGY1ZTljXCI7XG4gICAgICAgICAgICBjb25zdCBDT0xPUl9DSExPUk9QTEFTVCA9IFwiIzI1NTIzYlwiO1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gaW50ZXJwQ29sb3JzKFxuICAgICAgICAgICAgICBbQ09MT1JfV0FURVIsIENPTE9SX0NITE9ST1BMQVNUXSxcbiAgICAgICAgICAgICAgW3dhdGVyQ29udGVudC81MCwgY2VsbC5nZXRDaGxvcm9wbGFzdExldmVscygpLzUwXVxuICAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZihyb3cgPj0gNTApe1xuICAgICAgICAgICAgdmFyIGN2YWwgPSBNYXRoLmNlaWwod2F0ZXJDb250ZW50LzQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cod2F0ZXJDb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzMzMTFcIiArIGhleChjdmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSBcIiM3RUMwRERcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFJlY3QoTWF0aC5mbG9vcihzY2FsZSAqIGNvbCksIE1hdGguZmxvb3Ioc2NhbGUgKiByb3cpLCBzY2FsZSwgc2NhbGUpO1xuXG4gICAgICAgIC8vIGRyYXcgZ3JlZW4gb3V0bGluZSBhcm91bmQgdGhlIHBsYW50XG4gICAgICAgIGlmICh0aGlzLmRyYXdTdHlsZSA9PSAnd2F0ZXInIHx8IHRoaXMuZHJhd1N0eWxlID09ICdnbHVjb3NlJyB8fCB0aGlzLmRyYXdTdHlsZSA9PSAnYXV4aW4nKSB7XG4gICAgICAgICAgdGhpcy5jYW52YXNDdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDk5MDBcIjtcbiAgICAgICAgICB2YXIgbmVpZ2hicyA9IFtbLTEsIDBdLCBbMSwgMF0sIFswLCAxXSwgWzAsIC0xXV07XG5cbiAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXTtcbiAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgIHZhciBucm93ID0gcm93ICsgbmVpZ2hic1tpXVswXTtcbiAgICAgICAgICAgICAgdmFyIG5jb2wgPSBjb2wgKyBuZWlnaGJzW2ldWzFdO1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc1Bvc2l0aW9uT25HcmlkKG5yb3csbmNvbCkgJiYgIXRoaXMuY2VsbEFycmF5W25yb3ddW25jb2xdICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGlmIChuZWlnaGJzW2ldWzBdID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oc2NhbGUqY29sICsgMC41LCBzY2FsZSpyb3cgKyAwLjUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubGluZVRvKHNjYWxlKihjb2wrMSkgKyAwLjUsIHNjYWxlKnJvdyArIDAuNSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZWlnaGJzW2ldWzBdID09IDEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4Lm1vdmVUbyhzY2FsZSooY29sKzEpICsgMC41LCBzY2FsZSoocm93KzEpICsgMC41KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmxpbmVUbyhzY2FsZSpjb2wgKyAwLjUsIHNjYWxlKihyb3crMSkgKyAwLjUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmVpZ2hic1tpXVsxXSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubW92ZVRvKHNjYWxlKmNvbCArIDAuNSwgc2NhbGUqKHJvdysxKSArIDAuNSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5saW5lVG8oc2NhbGUqY29sICsgMC41LCBzY2FsZSpyb3cgKyAwLjUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmVpZ2hic1tpXVsxXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oc2NhbGUqKGNvbCsxKSArIDAuNSwgc2NhbGUqcm93ICsgMC41KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmxpbmVUbyhzY2FsZSooY29sKzEpICsgMC41LCBzY2FsZSoocm93KzEpICsgMC41KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hdXRvbWF0YS50cyIsImltcG9ydCB7Rmx1aWRzfSBmcm9tIFwiLi9mbHVpZHNcIjtcbmltcG9ydCB7SUFjdGlvbn0gZnJvbSBcIi4vYWN0aW9uXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKlxuQSBDZWxsIGlzIGEgc3RhdGVmdWwgZGVjaXNpb24tbWFrZXIuIENlbGxzIGFyZSB0aGUgbGl2aW5nIHVuaXRzIG9mIHRoZSBncmlkLlxuQ2VsbCBpcyBhIGZsZWlnaHdlaWdodCBvYmplY3QgZm9yIHRoZSBHcmlkLiBTeXN0ZW1zLlxuUGx1cyB0aGV5IGFsc28gaGF2ZSBjb250ZXh0IGZvciBmaXR0aW5nIGludG8gdGhlIEdyaWQuXG5JdCBjYW4gYWxzbyBiZSB0aG91Z2h0IG9mIGFzIGEgRE5BIGNvbnRyb2xsZXIuXG4qL1xuXG5leHBvcnQgY2xhc3MgQ2VsbCB7XG5cbiAgICAvLyBncmlkOiBBcnJheTxBcnJheTxPYmplY3Q+PjtcblxuICAgIGZsdWlkczogRmx1aWRzO1xuICAgIHJvdztcbiAgICBjb2w7XG4gICAgdHlwZTsgLy8gY29yZXNwb25kcyB0byB0eXBlcyBpbiBETkFcbiAgICBkbmE7XG4gICAgYW5nbGU7XG4gICAgc2lnbmFscztcbiAgICBjZWxsQXJyYXk6IEFycmF5PEFycmF5PENlbGw+PjsgLy8gY2VsbEFycmF5W3Jvd11bY29sXSBpcyBlaXRoZXIgbnVsbCBvciBhIENlbGwgb2JqZWN0XG5cbiAgICBjb25zdHJ1Y3RvcihkbmEsdHlwZSxmbHVpZHMscm93LGNvbCwgY2VsbEFycmF5KSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5mbHVpZHMgPSBmbHVpZHM7XG4gICAgICAgIHRoaXMuZG5hID0gZG5hO1xuICAgICAgICB0aGlzLnNldFR5cGUodHlwZSk7XG4gICAgICAgIHRoaXMuY2VsbEFycmF5ID0gY2VsbEFycmF5O1xuICAgIH1cblxuICAgIGdldENobG9yb3BsYXN0TGV2ZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mbHVpZHMudmVjdG9yW0ZsdWlkcy5DSExPUk9QTEFTVFNdO1xuICAgIH1cblxuICAgIHN1bUZsdWlkcygpOiBudW1iZXIge1xuICAgICAgICAvLyBPbmx5IHN1bSBcImFjdHVhbFwiIGZsdWlkcywgbm90IGhvcm1vbmVzLlxuICAgICAgICB2YXIgZ2x1Y29zZVdlaWdodCA9IDEuNTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmx1aWRzLnZlY3RvcltGbHVpZHMuV0FURVJdICsgZ2x1Y29zZVdlaWdodCAqIHRoaXMuZmx1aWRzLnZlY3RvcltGbHVpZHMuR0xVQ09TRV07XG4gICAgfVxuXG4gICAgLypcbiAgICBQYXNzIGVpdGhlciBhIGxpdGVyYWwgdHlwZSBvYmplY3Qgb3IgYSBudW1lcmljYWwgdHlwZSBpbmRleCByZWZlcmVuY2luZyBkbmEgdHlwZSBkZWZpbml0aW9uc1xuICAgICovXG4gICAgc2V0VHlwZSh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZG5hLmNlbGxUeXBlc1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTaWduYWxzKCkge1xuICAgICAgICAvLyBtdWx0aXBseSBieSBtYXRyaXhcbiAgICAgICAgLy8gdmFyIG5ld1NpZ25hbHMgPSBuZXcgQXJyYXkoRmx1aWRzLk5fU0lHTkFMUyk7XG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3U2lnbmFscy5sZW5ndGg7ICsraSkge1xuICAgICAgICAvLyAgICAgbmV3U2lnbmFsc1tpXSA9IDA7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB2YXIgbXR4ID0gdGhpcy50eXBlLnNpZ25hbE1hdHJpeDtcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdTaWduYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICBmb3IgKHZhciBqID0gMDsgaiA8IEZsdWlkcy5OX1NJR05BTFM7IGorKykgeyAvLyBmaXJzdCBTSUdOQUxTIGNvbHVtbnMgb2YgbWF0cml4Li4uXG4gICAgICAgIC8vICAgICAgICAgbmV3U2lnbmFsc1tpXSArPSB0aGlzLmZsdWlkcy52ZWN0b3JbaitGbHVpZHMuU0lHTkFMU19TVEFSVF0gKiBtdHhbaV1bal07XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5mbHVpZHMudmVjdG9yLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIC8vICAgICAgICAgbmV3U2lnbmFsc1tpXSArPSB0aGlzLmZsdWlkcy52ZWN0b3Jbal0gKiBtdHhbaV1bait0aGlzLnNpZ25hbHMudmVjdG9yLmxlbmd0aF07XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB2YXIgdmVjID0gdGhpcy5kbmEuY2VsbFR5cGVzW3RoaXMudHlwZV0uc2lnbmFsQjtcbiAgICAgICAgLy8gLy8gY29uc29sZS5sb2coJ3NpZ25hbHMnLCBuZXdTaWduYWxzLCAnbXR4JywgbXR4LCAndmVjJywgdmVjKTtcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCB2ZWMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgIG5ld1NpZ25hbHNbaV0gKz0gdmVjW2ldO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdTaWduYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnNpZ25hbHMudmVjdG9yW2ldID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgbmV3U2lnbmFsc1tpXSkpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZ2V0QWN0aW9uUG90ZW50aWFsKGFjdGlvbjogSUFjdGlvbik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNob29zZUFjdGlvbigpOklBY3Rpb24ge1xuICAgICAgICAvLyB2YXIgc2lnbmFscyA9IHRoaXMuc2lnbmFscyxcbiAgICAgICAgLy8gICAgIGNlbGxUeXBlID0gdGhpcy50eXBlO1xuXG4gICAgICAgIC8vIHZhciBwZXJjZXB0cm9uID0gdGhpcy50eXBlLlxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBhY3Rpb25zIGhhdmUgaGlnaCBwb3RlbnRpYWwgdmFsdWVzXG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5kbmEuYWN0aW9ucztcbiAgICAgICAgdmFyIHBvdGVudGlhbHMgPSBuZXcgQXJyYXkoYWN0aW9ucy5sZW5ndGgpO1xuICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLmZsdWlkcy52ZWN0b3IuY29uY2F0KFtcbiAgICAgICAgICAgICEhdGhpcy5jZWxsQXJyYXlbdGhpcy5yb3ctMV1bdGhpcy5jb2xdLFxuICAgICAgICAgICAgISF0aGlzLmNlbGxBcnJheVt0aGlzLnJvdysxXVt0aGlzLmNvbF0sXG4gICAgICAgICAgICAhIXRoaXMuY2VsbEFycmF5W3RoaXMucm93XVt0aGlzLmNvbC0xXSxcbiAgICAgICAgICAgICEhdGhpcy5jZWxsQXJyYXlbdGhpcy5yb3ddW3RoaXMuY29sKzFdXG4gICAgICAgIF0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHBvdGVudGlhbHNbaV0gPSB0aGlzLnR5cGUuYWN0aW9uUGVyY2VwdHJvbnNbaV0uYWN0aXZhdGUoaW5wdXQpWzBdOyAvLyB0aGlzLmdldEFjdGlvblBvdGVudGlhbChhY3Rpb25zW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiZXN0SW5kZXg6IG51bWJlciA9IFV0aWxzLmFyZ21heChwb3RlbnRpYWxzKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hvb3NpbmcgYWN0aW9uLCAnLCBhY3Rpb25zW2Jlc3RJbmRleF0pO1xuICAgICAgICBpZiAocG90ZW50aWFsc1tiZXN0SW5kZXhdIDwgMC41KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gXCJlbXB0eVwiIGFjdGlvblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zW2Jlc3RJbmRleF07XG5cblxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGl2YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy8gICAgIGFjdGl2YXRvcnNbaV0gPSB0aGlzLmFjdGl2YXRvckZ1bmN0aW9uKHRoaXMuZGlzdGFuY2VUb0FjdGl2YXRvcihzaWduYWxzLCBhY3Rpb25zW2ldLmFjdGl2YXRvcikpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdhY3RpdmF0b3JzJywgYWN0aXZhdG9ycywgJ2FjdGlvbnMnLCBhY3Rpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMud2VpZ2h0ZWRDaG9vc2UoYWN0aW9ucywgYWN0aXZhdG9ycyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NlbGwudHMiLCJpbXBvcnQge0FuZ2xlfSBmcm9tIFwiLi9hbmdsZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uIHtcbiAgICAvKlxuICAgIE1vZGlmeSB0aGUgcGFyYW1ldGVycyBvZiB0aGUgYWN0aW9uIGJ5IGEgZ2l2ZW4gYW1vdW50XG4gICAgKi9cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIpO1xufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uU2VyaWFsaXplciB7XG4gICAgc3RhdGljIHNlcmlhbGl6ZShhY3Rpb246IElBY3Rpb24pOiBzdHJpbmcge1xuICAgICAgICB2YXIgY2xzO1xuICAgICAgICBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IERpdmlkZUFjdGlvbikge1xuICAgICAgICAgICAgY2xzID0gXCJEaXZpZGVBY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24uY29uc3RydWN0b3IgPT0gUHVtcEFjdGlvbikge1xuICAgICAgICAgICAgY2xzID0gXCJQdW1wQWN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IFJlYWN0QWN0aW9uKSB7XG4gICAgICAgICAgICBjbHMgPSBcIlJlYWN0QWN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IFNwZWNpYWxpemVBY3Rpb24pIHtcbiAgICAgICAgICAgIGNscyA9IFwiU3BlY2lhbGl6ZUFjdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRpZCBub3QgcmVjb2duaXplIHRoZSBzcGVjaWZpZWQgYWN0aW9uIHR5cGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgY2xhc3M6IGNsc1xuICAgICAgICB9O1xuICAgICAgICBpZiAoYWN0aW9uIGluc3RhbmNlb2YgRGlyZWN0aW9uYWxBY3Rpb24pIHtcbiAgICAgICAgICAgIG9ialsnZmx1aWRHcmFkaWVudCddID0gYWN0aW9uLmZsdWlkR3JhZGllbnQ7XG4gICAgICAgICAgICBvYmpbJ2dyYXZpdHlHcmFkaWVudCddID0gYWN0aW9uLmdyYXZpdHlHcmFkaWVudDtcbiAgICAgICAgICAgIG9ialsnc3VuR3JhZGllbnQnXSA9IGFjdGlvbi5zdW5HcmFkaWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBSZWFjdEFjdGlvbikge1xuICAgICAgICAgICAgb2JqWydyZWFjdGlvbiddID0gYWN0aW9uLnJlYWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFNwZWNpYWxpemVBY3Rpb24pIHtcbiAgICAgICAgICAgIG9ialsndG9UeXBlJ10gPSBhY3Rpb24udG9UeXBlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFB1bXBBY3Rpb24pIHtcbiAgICAgICAgICAgIG9ialsnZmx1aWRzJ10gPSBhY3Rpb24uZmx1aWRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGpzb25BY3Rpb24pOiBJQWN0aW9uIHtcbiAgICAgICAgdmFyIG9iaiA9IGpzb25BY3Rpb247XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKGpzb25BY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbHVyZSB0byBwYXJzZSBhY3Rpb246ICcsIGpzb25BY3Rpb24pO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9iai5jbGFzcykge1xuICAgICAgICAgICAgY2FzZSBcIkRpdmlkZUFjdGlvblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGl2aWRlQWN0aW9uKG9iaik7XG4gICAgICAgICAgICBjYXNlIFwiUHVtcEFjdGlvblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHVtcEFjdGlvbihvYmopO1xuICAgICAgICAgICAgY2FzZSBcIlJlYWN0QWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFjdEFjdGlvbihvYmopO1xuICAgICAgICAgICAgY2FzZSBcIlNwZWNpYWxpemVBY3Rpb25cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNwZWNpYWxpemVBY3Rpb24ob2JqKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqLCB0eXBlb2Ygb2JqKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmFkIGpzb25BY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25hbEFjdGlvbiBpbXBsZW1lbnRzIElBY3Rpb24ge1xuICAgIGZsdWlkR3JhZGllbnQ6IEFycmF5PG51bWJlcj47IC8vIG1vcnBob2dlbiBncmFkaWVudFxuICAgIGdyYXZpdHlHcmFkaWVudDogbnVtYmVyOyAvLyBncmF2aXRyb3Bpc21cbiAgICBzdW5HcmFkaWVudDogbnVtYmVyOyAvL1xuXG4gICAgY29uc3RydWN0b3IoYXJncyl7XG4gICAgICAgIHRoaXMuZmx1aWRHcmFkaWVudCA9IGFyZ3NbJ2ZsdWlkR3JhZGllbnQnXTtcbiAgICAgICAgdGhpcy5ncmF2aXR5R3JhZGllbnQgPSBhcmdzWydncmF2aXR5R3JhZGllbnQnXTtcbiAgICAgICAgdGhpcy5zdW5HcmFkaWVudCA9IGFyZ3NbJ3N1bkdyYWRpZW50J107XG4gICAgfVxuXG4gICAgZ2V0QWN0aW9uRGlyZWN0aW9uKHVwRmx1aWRzLCByaWdodEZsdWlkcywgZG93bkZsdWlkcywgbGVmdEZsdWlkcyk6IG51bWJlciB7XG4gICAgICAgIHZhciB1cENvbnRyaWJ1dGlvbiA9IFV0aWxzLmNyb3NzUHJvZHVjdCh1cEZsdWlkcywgdGhpcy5mbHVpZEdyYWRpZW50KTtcbiAgICAgICAgdmFyIHJpZ2h0Q29udHJpYnV0aW9uID0gVXRpbHMuY3Jvc3NQcm9kdWN0KHJpZ2h0Rmx1aWRzLCB0aGlzLmZsdWlkR3JhZGllbnQpO1xuICAgICAgICB2YXIgZG93bkNvbnRyaWJ1dGlvbiA9IFV0aWxzLmNyb3NzUHJvZHVjdChkb3duRmx1aWRzLCB0aGlzLmZsdWlkR3JhZGllbnQpO1xuICAgICAgICB2YXIgbGVmdENvbnRyaWJ1dGlvbiA9IFV0aWxzLmNyb3NzUHJvZHVjdChsZWZ0Rmx1aWRzLCB0aGlzLmZsdWlkR3JhZGllbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmdyYXZpdHlHcmFkaWVudCkge1xuICAgICAgICAgICAgZG93bkNvbnRyaWJ1dGlvbiArPSB0aGlzLmdyYXZpdHlHcmFkaWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBNYXRoLmF0YW4yKHVwQ29udHJpYnV0aW9uIC0gZG93bkNvbnRyaWJ1dGlvbiwgcmlnaHRDb250cmlidXRpb24gLSBsZWZ0Q29udHJpYnV0aW9uKTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIC8qXG4gICAgQ2FsY3VsYXRlIHRoZSBhbmdsZSB0aGF0IHRoaXMgYWN0aW9uIHBvaW50cyB0b1xuICAgICovXG4gICAgZ2V0R3JhZGllbnRUb0ZsdWlkcygpIHtcblxuICAgIH1cblxuICAgIG11dGF0ZShhbW91bnQ6IG51bWJlciA9IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZsdWlkR3JhZGllbnQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByID0gVXRpbHMuZ2V0Qm91bmRlZFJhbmRvbShhbW91bnQpO1xuICAgICAgICAgICAgdGhpcy5mbHVpZEdyYWRpZW50W2ldICs9IHI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmdyYXZpdHlHcmFkaWVudCAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eUdyYWRpZW50ICs9IFV0aWxzLmdldEJvdW5kZWRSYW5kb20oYW1vdW50KTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1bkdyYWRpZW50ICE9ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgdGhpcy5zdW5HcmFkaWVudCArPSBVdGlscy5nZXRCb3VuZGVkUmFuZG9tKGFtb3VudCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGl2aWRlQWN0aW9uIGV4dGVuZHMgRGlyZWN0aW9uYWxBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3Mpe1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQdW1wQWN0aW9uIGV4dGVuZHMgRGlyZWN0aW9uYWxBY3Rpb24ge1xuICAgIGZsdWlkczogQXJyYXk8bnVtYmVyPjtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3Mpe1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICAgICAgdGhpcy5mbHVpZHMgPSBhcmdzWydmbHVpZHMnXSB8fCBbXTtcbiAgICB9XG5cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHN1cGVyLm11dGF0ZShhbW91bnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmx1aWRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgciA9IFV0aWxzLmdldEJvdW5kZWRSYW5kb20oYW1vdW50KTtcbiAgICAgICAgICAgIHRoaXMuZmx1aWRzW2ldICs9IHI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWFjdEFjdGlvbiBpbXBsZW1lbnRzIElBY3Rpb24ge1xuICAgIHJlYWN0aW9uOiBBcnJheTxudW1iZXI+OyAvLyBmbHVpZCB2ZWNcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3Mpe1xuICAgICAgICB0aGlzLnJlYWN0aW9uID0gYXJnc1sncmVhY3Rpb24nXTtcbiAgICB9XG5cbiAgICAvLyBtdXRhdGluZyBhIHJlYWN0IGFjdGlvbiBzaG91bGQgbm90IGNoYW5nZSB0aGUgcmVhZ2VudHMgLyBwcm9kdWN0c1xuICAgIG11dGF0ZShhbW91bnQ6IG51bWJlciA9IDEpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTcGVjaWFsaXplQWN0aW9uIGltcGxlbWVudHMgSUFjdGlvbiB7XG4gICAgdG9UeXBlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzKXtcbiAgICAgICAgdGhpcy50b1R5cGUgPSBhcmdzWyd0b1R5cGUnXTtcbiAgICB9XG5cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG5cbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hY3Rpb24udHMiLCIvKlxuUmFkaWFuLWJhc2VkIGFuZ2xlcy5cbiovXG5leHBvcnQgY2xhc3MgQW5nbGUge1xuICAgIHN0YXRpYyBSSUdIVDogbnVtYmVyID0gMDtcbiAgICBzdGF0aWMgVVA6IG51bWJlciA9IE1hdGguUEkgLyAyO1xuICAgIHN0YXRpYyBMRUZUOiBudW1iZXIgPSBNYXRoLlBJO1xuICAgIHN0YXRpYyBET1dOOiBudW1iZXIgPSAzKk1hdGguUEkgLyAyO1xuXG4gICAgc3RhdGljIGRpcmVjdGlvbkRlbHRhUm93KGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gRGlyZWN0aW9uLnVwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09IERpcmVjdGlvbi5kb3duKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc3RhdGljIGRpcmVjdGlvbkRlbHRhQ29sKGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gRGlyZWN0aW9uLmxlZnQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRGlyZWN0aW9uLnJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvKlxuICAgIFJldHVybiBhIHJhbmRvbSBEaXJlY3Rpb24gZW51bSBiYXNlZCBvbiB0aGUgYW5nbGUuXG4gICAgc2FtcGxlRGlyZWN0aW9uKDApIHJldHVybnMgRGlyZWN0aW9uLlJJR0hULlxuICAgIHNhbXBsZURpcmVjdGlvbihNYXRoLlBJLzQpIGlzIGEgNTAtNTAgY2hhbmNlIFVQIG9yIFJJR0hULlxuICAgICovXG4gICAgc3RhdGljIHNhbXBsZURpcmVjdGlvbihhbmdsZTpudW1iZXIpIHtcbiAgICAgICAgYW5nbGUgPSBBbmdsZS5jYW5vbmljYWwoYW5nbGUpO1xuICAgICAgICBpZiAoYW5nbGUgPT0gQW5nbGUuUklHSFQpIHJldHVybiBEaXJlY3Rpb24ucmlnaHQ7XG4gICAgICAgIGlmIChhbmdsZSA9PSBBbmdsZS5VUCkgcmV0dXJuIERpcmVjdGlvbi51cDtcbiAgICAgICAgaWYgKGFuZ2xlID09IEFuZ2xlLkxFRlQpIHJldHVybiBEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgaWYgKGFuZ2xlID09IEFuZ2xlLkRPV04pIHJldHVybiBEaXJlY3Rpb24uZG93bjtcblxuICAgICAgICAvLyBkMSwgZDIgc3BlY2lmeSB0aGUgcXVhZHJhbnRcbiAgICAgICAgdmFyIGQxLCBkMjtcbiAgICAgICAgaWYgKGFuZ2xlPkFuZ2xlLlJJR0hUICYmIGFuZ2xlPEFuZ2xlLlVQKSB7XG4gICAgICAgICAgICBkMSA9IERpcmVjdGlvbi5yaWdodDtcbiAgICAgICAgICAgIGQyID0gRGlyZWN0aW9uLnVwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlPkFuZ2xlLlVQICYmIGFuZ2xlPEFuZ2xlLkxFRlQpIHtcbiAgICAgICAgICAgIGQxID0gRGlyZWN0aW9uLnVwO1xuICAgICAgICAgICAgZDIgPSBEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbmdsZT5BbmdsZS5MRUZUICYmIGFuZ2xlPEFuZ2xlLkRPV04pIHtcbiAgICAgICAgICAgIGQxID0gRGlyZWN0aW9uLmxlZnQ7XG4gICAgICAgICAgICBkMiA9IERpcmVjdGlvbi5kb3duO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZDEgPSBEaXJlY3Rpb24uZG93bjtcbiAgICAgICAgICAgIGQyID0gRGlyZWN0aW9uLnJpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBhbmdsZSBpcyBwb2ludGluZyB0b3dhcmQgZDFcbiAgICAgICAgYW5nbGUgPSBhbmdsZSAlIChNYXRoLlBJIC8gMik7XG4gICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgICAgICBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgY29zLyhzaW4rY29zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGQxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGQyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogUmV0dXJucyBhbmdsZSBiZXR3ZWVuIDAgYW5kIDIgUEkgKi9cbiAgICBzdGF0aWMgY2Fub25pY2FsKGFuZ2xlOm51bWJlcikge1xuICAgICAgICBhbmdsZSA9IGFuZ2xlICUgKDIgKiBNYXRoLlBJKTtcbiAgICAgICAgaWYgKGFuZ2xlIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlICsgMipNYXRoLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmdsZTtcbiAgICB9XG5cbiAgICAvKlxuICAgIENvbXB1dGVzIGFuZ2xlIG9mIHRoZSBnaXZlbiAoeCx5KSB2ZWN0b3JcbiAgICAqL1xuICAgIHN0YXRpYyB2ZWN0b3JBbmdsZSh4Om51bWJlciwgeTpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCk7XG4gICAgfVxuXG4gICAgLy8gc3RhdGljIGdyYWRpZW50KClcbn1cblxuLypcbkNhcmRpbmFsIGRpcmVjdGlvbiBlbnVtc1xuKi9cblxuZW51bSBEaXJlY3Rpb24ge1xuICAgIHJpZ2h0LFxuICAgIHVwLFxuICAgIGxlZnQsXG4gICAgZG93blxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FuZ2xlLnRzIiwiaW1wb3J0IHtDZWxsfSBmcm9tIFwiLi9jZWxsXCI7XG5pbXBvcnQge0ZsdWlkc30gZnJvbSBcIi4vZmx1aWRzXCI7XG5pbXBvcnQge0dyaWR9IGZyb20gXCIuL2dyaWRcIjtcbmltcG9ydCB7QXV0b21hdGF9IGZyb20gXCIuL2F1dG9tYXRhXCI7XG5pbXBvcnQge0lBY3Rpb24sIERpdmlkZUFjdGlvbiwgUHVtcEFjdGlvbiwgUmVhY3RBY3Rpb24sIFNwZWNpYWxpemVBY3Rpb24sIEFjdGlvblNlcmlhbGl6ZXJ9IGZyb20gXCIuL2FjdGlvblwiO1xuaW1wb3J0IHtQZXJjZXB0cm9ufSBmcm9tIFwiLi9wZXJjZXB0cm9uXCI7XG5pbXBvcnQge0NlbGxUeXBlU2VyaWFsaXplcn0gZnJvbSBcIi4vY2VsbHR5cGVzXCI7XG5cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IEROQSBvYmplY3QgdG8gc2VhcmNoIG92ZXIuXG4gKiBQbGFudHJwZyBpcyBzZWFyY2hpbmcgZm9yIHRoZSBtYXhpbXVtIG9mIGZpdG5lc3Mgb3ZlciB0aGUgc2V0IG9mIGFsbCBwb3NzaWJsZSBETkEuXG4gKlxuKi9cbmV4cG9ydCBjbGFzcyBETkEge1xuICBzdGF0aWMgTl9DRUxMX1RZUEVTOiBudW1iZXIgPSA1O1xuICBzdGF0aWMgQ09MT1JfSEVYX0FSUkFZID0gW1wiI2VkZWRiZVwiLCBcIiM4RjhGNkVcIiwgXCIjNkU2RThGXCIsIFwiIzhGNkU3RlwiLCBcIiM4MEM0QTFcIl07XG5cbiAgTkVXX0NFTExfQ09TVCA9IG5ldyBGbHVpZHMoMC4yLCAwLjIpO1xuXG4gIGFjdGlvbnM6IEFycmF5PElBY3Rpb24+O1xuICBjZWxsVHlwZXM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgd2luZG93WydkbmEnXSA9IHRoaXM7XG5cbiAgICB0aGlzLmFjdGlvbnMgPSBbXG4gICAgICAvLyBuZXcgRGl2aWRlQWN0aW9uKHsgZmx1aWRHcmFkaWVudDogWzAsMCwtMSwwLDAsMF0sIGdyYXZpdHlHcmFkaWVudDogMiB9KSxcbiAgICAgIC8vIG5ldyBEaXZpZGVBY3Rpb24oeyBmbHVpZEdyYWRpZW50OiBbMCwwLDAsMCwwLDBdLCBncmF2aXR5R3JhZGllbnQ6IDIgfSksXG4gICAgICBuZXcgUHVtcEFjdGlvbih7IGZsdWlkR3JhZGllbnQ6IFswLDAsMCwwLDAsMF0sIGZsdWlkczogWzEsMCwwLDAsMCwwXSB9KSxcbiAgICAgIC8vIG5ldyBSZWFjdEFjdGlvbih7IHJlYWN0aW9uOiBbLTAuMiwwLjgsMC4xLDAsMCwwXSB9KSwgLy9waG90b3N5bnRoXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLjEsMCwwLDBdIH0pLCAvLyBmcmVlIGF1eGluXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLDAuMSwwLDBdIH0pLCAvLyBmcmVlIG1pc2MgaG9ybW9uZXNcbiAgICAgIC8vIG5ldyBSZWFjdEFjdGlvbih7IHJlYWN0aW9uOiBbMCwwLDAsMCwwLjEsMF0gfSksIC8vIGZyZWUgbWlzYyBob3Jtb25lc1xuICAgICAgLy8gbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IFswLDAsMCwwLDAsMC4xXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLC0wLjEsMCwwXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLDAsLTAuMSwwXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLDAsMCwtMC4xXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgU3BlY2lhbGl6ZUFjdGlvbih7IHRvVHlwZTogMCB9KSxcbiAgICAgIC8vIG5ldyBTcGVjaWFsaXplQWN0aW9uKHsgdG9UeXBlOiAxIH0pLFxuICAgICAgLy8gbmV3IFNwZWNpYWxpemVBY3Rpb24oeyB0b1R5cGU6IDIgfSksXG4gICAgICAvLyBuZXcgU3BlY2lhbGl6ZUFjdGlvbih7IHRvVHlwZTogMyB9KSxcbiAgICAgIC8vIG5ldyBTcGVjaWFsaXplQWN0aW9uKHsgdG9UeXBlOiA0IH0pXG4gICAgXTtcblxuICAgIC8vIGNlbGwgdHlwZXNcbiAgICB0aGlzLmNlbGxUeXBlcyA9IG5ldyBBcnJheShETkEuTl9DRUxMX1RZUEVTKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEROQS5OX0NFTExfVFlQRVM7ICsraSkge1xuICAgICAgdmFyIGFjdGlvblBlcmNlcHRyb25zID0gW107XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7ICsraikge1xuICAgICAgICBhY3Rpb25QZXJjZXB0cm9uc1tqXSA9IG5ldyBQZXJjZXB0cm9uKEZsdWlkcy5OX0ZMVUlEUyArIDQsIDgsIDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5jZWxsVHlwZXNbaV0gPSB7XG4gICAgICAgIGNvbG9yOiBETkEuQ09MT1JfSEVYX0FSUkFZW2klRE5BLkNPTE9SX0hFWF9BUlJBWS5sZW5ndGhdLFxuICAgICAgICBpc0xlYWY6IGk9PTQsXG4gICAgICAgIGNvc3Q6IHRoaXMuTkVXX0NFTExfQ09TVCxcbiAgICAgICAgYWN0aW9uUGVyY2VwdHJvbnM6IGFjdGlvblBlcmNlcHRyb25zXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKCk6IEROQSB7XG4gICAgdmFyIHNlcmlhbCA9IEROQVNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMpO1xuICAgIHJldHVybiBETkFTZXJpYWxpemVyLmRlc2VyaWFsaXplKHNlcmlhbCk7XG4gIH1cblxuICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgLy8gbXV0YXRlIGFjdGlvbnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uc1tpXTtcbiAgICAgIGFjdGlvbi5tdXRhdGUoYW1vdW50KTtcbiAgICB9XG5cbiAgICAvLyBtdXRhdGUgdHlwZSBjb250cm9sbGVyc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jZWxsVHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB0eXBlID0gdGhpcy5jZWxsVHlwZXNbaV07XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHR5cGUuYWN0aW9uUGVyY2VwdHJvbnM7ICsraikge1xuICAgICAgICB2YXIgcCA9IHR5cGUuYWN0aW9uUGVyY2VwdHJvbnNbal07XG4gICAgICAgIHAucGVydHVyYihhbW91bnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYW50U2VlZChjZWxsQXJyYXk6IEFycmF5PEFycmF5PENlbGw+PiwgZmx1aWRzQXJyYXk6IEFycmF5PEFycmF5PEZsdWlkcz4+KSB7XG4gICAgLy8gY29tcHV0ZSBpbml0aWFsIGZsdWlkIHZlY3RvcnNcbiAgICB2YXIgd2F0ZXJJbml0aWFsID0gMjA7IC8vIDEuNzUgKiBBdXRvbWF0YS5NQVRFUklBTF9XQVRFUl9XQVRFUl9NRUFOO1xuICAgIHZhciBnbHVjb3NlSW5pdGlhbCA9IDIwOyAvLyA0LjA7XG4gICAgdmFyIGZsdWlkczEgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpLFxuICAgICAgICBmbHVpZHMyID0gbmV3IEZsdWlkcyh3YXRlckluaXRpYWwsIGdsdWNvc2VJbml0aWFsKSxcbiAgICAgICAgZmx1aWRzOiBGbHVpZHM7XG5cbiAgICAvLyByZWZlcmVuY2UgY29vcmRpbmF0ZXNcbiAgICB2YXIgcm93Q2VudGVyT2ZHcmlkID0gTWF0aC5mbG9vcihBdXRvbWF0YS5HUklEX05fUk9XUyAvIDIpLFxuICAgICAgICBjb2xDZW50ZXJPZkdyaWQgPSBNYXRoLmZsb29yKEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TIC8gMiksXG5cbiAgICAvLyBwbGFudCB0byBjcmVhdGVcbiAgICAgICAgcGxhbnQ6IEFycmF5PENlbGw+ID0gW10sXG4gICAgICAgIGNlbGw6IENlbGwsXG5cbiAgICAvLyBpdGVyYXRlLlxuICAgICAgICByb3dTdGFydDogbnVtYmVyID0gcm93Q2VudGVyT2ZHcmlkICsgMixcbiAgICAgICAgcm93RW5kOiBudW1iZXIgPSByb3dDZW50ZXJPZkdyaWQgKyAxMCxcbiAgICAgICAgcm93TWlkOiBudW1iZXIgPSBNYXRoLmZsb29yKChyb3dTdGFydCArIHJvd0VuZCkgLyAyKSxcbiAgICAgICAgY29sU3RhcnQ6IG51bWJlciA9IGNvbENlbnRlck9mR3JpZCAtIDIsXG4gICAgICAgIGNvbEVuZDogbnVtYmVyID0gY29sQ2VudGVyT2ZHcmlkICsgMixcbiAgICAgICAgY29sTWlkOiBudW1iZXIgPSBNYXRoLmZsb29yKChjb2xTdGFydCArIGNvbEVuZCkgLyAyKTtcbiAgICBmb3IgKHZhciByb3cgPSByb3dTdGFydDsgcm93IDwgcm93TWlkOyArK3Jvdykge1xuICAgICAgZm9yICh2YXIgY29sID0gY29sU3RhcnQ7IGNvbCA8IGNvbEVuZDsgKytjb2wpIHtcbiAgICAgICAgaWYgKGNvbCA9PSBjb2xNaWQpIGNvbnRpbnVlO1xuICAgICAgICBmbHVpZHMgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpO1xuICAgICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgdGhpcy5jZWxsVHlwZXNbMl0sIGZsdWlkcywgcm93LCBjb2wsIGNlbGxBcnJheSk7XG4gICAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgICAgY2VsbEFycmF5W3Jvd11bY29sXSA9IGNlbGw7XG4gICAgICAgIHBsYW50LnB1c2goY2VsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciByb3cgPSByb3dNaWQ7IHJvdyA8IHJvd0VuZDsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IGNvbFN0YXJ0OyBjb2wgPCBjb2xFbmQ7ICsrY29sKSB7XG4gICAgICAgIGlmIChjb2wgPT0gY29sTWlkKSBjb250aW51ZTtcbiAgICAgICAgZmx1aWRzID0gbmV3IEZsdWlkcyh3YXRlckluaXRpYWwsIGdsdWNvc2VJbml0aWFsKTtcbiAgICAgICAgY2VsbCA9IG5ldyBDZWxsKHRoaXMsIHRoaXMuY2VsbFR5cGVzWzNdLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpOyAvLyBkaWZmZXJlbnQgdHlwZSBpcyBvbmx5IGNoYW5nZVxuICAgICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGNlbnRlciBjb2x1bW5cbiAgICAvLyBtZXJpc3RlbXNcbiAgICBmb3IgKHZhciByb3cgPSByb3dTdGFydDsgcm93IDwgcm93TWlkOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgdGhpcy5jZWxsVHlwZXNbMF0sIGZsdWlkcywgcm93LCBjb2wsIGNlbGxBcnJheSk7XG4gICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICBjZWxsQXJyYXlbcm93XVtjb2xdID0gY2VsbDtcbiAgICAgIHBsYW50LnB1c2goY2VsbClcbiAgICB9XG5cbiAgICBmb3IgKHZhciByb3cgPSByb3dNaWQ7IHJvdyA8IHJvd0VuZDsgKytyb3cpIHtcbiAgICAgIHZhciBjb2wgPSBjb2xNaWQ7XG4gICAgICBmbHVpZHMgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpO1xuICAgICAgY2VsbCA9IG5ldyBDZWxsKHRoaXMsIHRoaXMuY2VsbFR5cGVzWzFdLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpO1xuICAgICAgZmx1aWRzQXJyYXlbcm93XVtjb2xdID0gZmx1aWRzO1xuICAgICAgY2VsbEFycmF5W3Jvd11bY29sXSA9IGNlbGw7XG4gICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgfVxuXG5cbiAgICByZXR1cm4gcGxhbnQ7XG4gIH1cblxuXG5cbiAgLypcbkluIG5hdHVyZSwgdGhlIGdlbmUgY29udHJvbHMgdGhlIHRyYW5zY3JpcHRpb24gcHJvZHVjdCwgYW5kIC5cblxuXG5JbnB1dHMgb2YgYSBjZWxsOlxuLSBGbHVpZHNcbi0gRmx1aWRzIGdyYWRpZW50Li4uXG5cbkFjdGlvbnMgb2YgYSBjZWxsOlxuXG5ETkEgaXMgYSBsaXN0IG9mIHBvdGVudGlhbCBhY3Rpb25zOlxuLSBSZXByb2R1Y2UgKGRpcmVjdGlvbmFsKSwgZGlyZWN0aW9uIHNwZWNpZmllZCBhcyB2ZWN0b3IgbXVsdGlwbGllciBvZiBmbHVpZHNcbi0gUHVtcCBmbHVpZHMgKGRpcmVjdGlvbmFsKSwgZGlyZWN0aW9uIHNwZWNpZmllZCBhcyB2ZWN0b3IgbXVsdGlwbGllciBvZiBmbHVpZHNcbi0gUmVhY3Rpb25zXG4tIFNwZWNpYWxpemVcblxuQ2VsbFR5cGUgaXMgdGhlIGNvbnRyb2xsZXIgb2YgRE5BIGFuZCBkZXRlcm1pbmVzIHdoZW4gZ2VuZSBwcm9kdWN0cyBhcmUgbWFkZS5cbkVhY2ggY2VsbCB0eXBlIGlzIGFsc28gYSAyIGxheWVyIG5ldXJhbCBuZXQsIHdoaWNoIHRha2VzIGFzIGlucHV0IHRoZSBmbHVpZCB2ZWN0b3IuXG5FYWNoIGNlbGwgdHlwZSBoYXMgYSBsaXN0IG9mIHBvdGVudGlhbCBhY3Rpb25zLCB3aGljaCBtYXkgYmUgcGFyYW1hdGVyaXplZCBieSBuZWlnaGJvciBzdGF0ZXMuXG5UcmFuc2l0aW9ucyBiZXR3ZWVuIGNlbGwgdHlwZXMgY2FuIGJlIG1vZGVsZWQgYXMgYSBtYXJrb3YgY2hhaW4sIHRob3VnaCBzb21lIHN0YXRlcyBhcmUgdW5yZWFjaGFibGUgb25jZSBsZWZ0LlxuICAqL1xuXG4gIC8qXG4gIEZvciBldmVyeSBhY3Rpb24sIGNlbGx0eXBlcyBoYXMgYSBuZXVyYWwgbmV0XG4gICovXG5cbn1cblxuLypcblNlcmlhbGl6YXRpb24gaXMgbmVjZXNzYXJ5IHRvIHN0b3JlIHRoZSByZXN1bHRzIG9mIGV2b2x1dGlvbiBzbyB0aGV5IGNhbiBiZSBwbGF5ZWQgYmFjaywgc2F2ZWRcbiovXG5leHBvcnQgY2xhc3MgRE5BU2VyaWFsaXplciB7XG4gIHN0YXRpYyBzZXJpYWxpemUoZG5hOiBETkEpOiBzdHJpbmcge1xuICAgIHZhciBhY3Rpb25zU2VyaWFsID0gbmV3IEFycmF5KGRuYS5hY3Rpb25zLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkbmEuYWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgYWN0aW9uc1NlcmlhbFtpXSA9IEFjdGlvblNlcmlhbGl6ZXIuc2VyaWFsaXplKGRuYS5hY3Rpb25zW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgY2VsbFR5cGVzU2VyaWFsID0gbmV3IEFycmF5KGRuYS5jZWxsVHlwZXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRuYS5jZWxsVHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2VsbFR5cGVzU2VyaWFsW2ldID0gQ2VsbFR5cGVTZXJpYWxpemVyLnNlcmlhbGl6ZShkbmEuY2VsbFR5cGVzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY2VsbFR5cGVzOiBjZWxsVHlwZXNTZXJpYWwsXG4gICAgICBhY3Rpb25zOiBhY3Rpb25zU2VyaWFsXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVzZXJpYWxpemUoc2VyaWFsaXplZDogc3RyaW5nKTogRE5BIHtcbiAgICB2YXIgZCA9IG5ldyBETkEoKTtcbiAgICB2YXIgbyA9IEpTT04ucGFyc2Uoc2VyaWFsaXplZCk7XG5cbiAgICB2YXIgYWN0aW9uc1NlcmlhbCA9IG8uYWN0aW9ucztcbiAgICB2YXIgYWN0aW9ucyA9IG5ldyBBcnJheShhY3Rpb25zU2VyaWFsLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3Rpb25zU2VyaWFsLmxlbmd0aDsgKytpKSB7XG4gICAgICBhY3Rpb25zW2ldID0gQWN0aW9uU2VyaWFsaXplci5kZXNlcmlhbGl6ZShhY3Rpb25zU2VyaWFsW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgY2VsbFR5cGVzU2VyaWFsID0gby5jZWxsVHlwZXM7XG4gICAgdmFyIGNlbGxUeXBlcyA9IG5ldyBBcnJheShjZWxsVHlwZXNTZXJpYWwubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxUeXBlcy5sZW5ndGg7ICsraSkge1xuICAgICAgY2VsbFR5cGVzW2ldID0gQ2VsbFR5cGVTZXJpYWxpemVyLmRlc2VyaWFsaXplKGNlbGxUeXBlc1NlcmlhbFtpXSk7XG4gICAgfVxuXG4gICAgZC5jZWxsVHlwZXMgPSBjZWxsVHlwZXM7XG4gICAgZC5hY3Rpb25zID0gYWN0aW9ucztcbiAgICByZXR1cm4gZDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2RuYS50cyIsIi8qXG5hcHAuanNcblRoZSB2aWV3IHByb3ZpZGVyIGxheWVyIVxuVGhpcyBjYWxsczpcbihzaW11bGF0aW9uU3RhcnQpIHdoZW5cbiovXG5cbmltcG9ydCB7U2ltdWxhdGlvbn0gZnJvbSBcIi4vc2ltdWxhdGlvblwiO1xuaW1wb3J0IHtFdm9sdXRpb259IGZyb20gXCIuL2V2b2x1dGlvblwiO1xuaW1wb3J0IHtBbmdsZX0gZnJvbSBcIi4vYW5nbGVcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge0ROQVNlcmlhbGl6ZXJ9IGZyb20gXCIuL2RuYVwiO1xuaW1wb3J0IHtJVmlld1NpbXVsYXRpb259IGZyb20gXCIuL3NpbXVsYXRpb25cIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZHJhd0NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJhd1wiKTtcblxuICAgIHZhciBzaW06IElWaWV3U2ltdWxhdGlvbiA9IG5ldyBTaW11bGF0aW9uKGRyYXdDYW52YXMpO1xuICAgIC8vIHZhciBzaW0gPSBuZXcgRXZvbHV0aW9uKGRyYXdDYW52YXMpO1xuXG4gICAgc2ltLnJ1bigpO1xuXG4gICAgdmFyIHNpbU9uID0gc2ltLmlzU2ltdWxhdGlvblJ1bm5pbmc7XG5cbiAgICB3aW5kb3dbJ3RvZ2dsZVNpbXVsYXRpb24nXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2ltT24pIHtcbiAgICAgICAgICAgIHNpbS5wYXVzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2ltLnJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHNpbU9uID0gIXNpbU9uO1xuICAgIH1cbiAgICB3aW5kb3dbJ3Jlc2V0U2ltdWxhdGlvbiddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09IFJlc2V0dGluZyBzaW11bGF0aW9uID09PVwiKTtcbiAgICAgICAgc2ltLnJlc2V0KCk7XG4gICAgfVxuICAgIHdpbmRvd1sndG9nZ2xlRHJhdyddID0gc2ltLnRvZ2dsZURyYXcuYmluZChzaW0pO1xuICAgIHdpbmRvd1snZHJhd1N0eWxlJ10gPSBzaW0uZHJhd1N0eWxlLmJpbmQoc2ltKTtcblxuICAgIC8vIHNpbS5ydW5Gb3JOVGlja3MoMTAwKTtcblxuICAgIC8vIERFQlVHIC8vXG4gICAgLy8gd2luZG93WydhdXRvbWF0YSddID0gc2ltLmF1dG9tYXRhO1xuICAgIHdpbmRvd1snc2ltdWxhdGlvbiddID0gc2ltO1xuICAgIHdpbmRvd1snQW5nbGUnXSA9IEFuZ2xlO1xuICAgIHdpbmRvd1snVXRpbHMnXSA9IFV0aWxzO1xuICAgIHdpbmRvd1snRE5BU2VyaWFsaXplciddID0gRE5BU2VyaWFsaXplcjtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FwcC50cyIsIi8qXG5hcHAudHNcbiovXG5cbmltcG9ydCB7QXV0b21hdGF9IGZyb20gXCIuL2F1dG9tYXRhXCI7XG5pbXBvcnQge0ROQSwgRE5BU2VyaWFsaXplcn0gZnJvbSBcIi4vZG5hXCI7XG5pbXBvcnQge0NlbGx9IGZyb20gXCIuL2NlbGxcIjtcbmltcG9ydCB7TVlfUExBTlR9IGZyb20gXCIuL215cGxhbnRcIjtcblxuLy8gaW50ZXJmYWNlIGZvciB2aWV3IGxheWVyXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3U2ltdWxhdGlvbiB7XG4gICAgLy8gY29uc3RydWN0b3IoZHJhd0NhbnZhczogRWxlbWVudCk6IHZvaWQ7XG4gICAgcmVzZXQoKTogdm9pZDsgLy8gc2V0IHN0YXRlIHRvIGluaXRpYWxcbiAgICBwYXVzZSgpOiB2b2lkOyAvLyBwYXVzZSBleGVjdXRpb25cbiAgICBydW4oKTogdm9pZDsgLy9cbiAgICBpc1NpbXVsYXRpb25SdW5uaW5nO1xuICAgIHRvZ2dsZURyYXc7XG4gICAgZHJhd1N0eWxlO1xuXG4gICAgLy8gc2V0RHJhd0VuYWJsZWQoKVxuICAgIC8vIHNldERyYXdEaXNhYmxlZCgpXG59XG5cbmV4cG9ydCBjbGFzcyBTaW11bGF0aW9uIGltcGxlbWVudHMgSVZpZXdTaW11bGF0aW9uIHtcbiAgICBGUkFNRV9ERUxBWTogbnVtYmVyID0gODA7XG5cbiAgICBhdXRvbWF0YTogQXV0b21hdGE7XG4gICAgZHJhd0VuYWJsZWQ6IGJvb2xlYW47XG4gICAgZHJhd0NhbnZhczogRWxlbWVudDtcblxuICAgIC8vIGEgcmVmZXJlbmNlIHRvIHRoZSBkbmEgdXNlZCB0byBtYWtlIHRoZSBhdXRvbWF0YVxuICAgIGRuYTogRE5BO1xuXG4gICAgLy8gZmxhZ3MgZm9yIHNob3dpbmcgc3RhdHVzXG4gICAgaXNTaW11bGF0aW9uUnVubmluZzogYm9vbGVhbjtcbiAgICBtaWRVcGRhdGU6IGJvb2xlYW47XG5cbiAgICB0aWNrID0gMDtcbiAgICB1cGRhdGVJbnRlcnZhbDogbnVtYmVyO1xuXG4gICAgZml0bmVzczogQXJyYXk8bnVtYmVyPjtcblxuICAgIGNvbnN0cnVjdG9yKGRyYXdDYW52YXM6IEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5kcmF3Q2FudmFzID0gZHJhd0NhbnZhcztcbiAgICAgICAgdGhpcy5kcmF3RW5hYmxlZCA9IHRydWU7XG5cblxuICAgICAgICAvLyB0aGlzLmRuYSA9IEROQVNlcmlhbGl6ZXIuZGVzZXJpYWxpemUoTVlfUExBTlQpOyAvLyB0byBsb2FkIEROQSBmcm9tIGEgZmlsZVxuICAgICAgICAvLyB0aGlzLmRuYSA9IG5ldyBETkEoKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuXG4gICAgcmVzZXQoZG5hPzogRE5BKSB7XG4gICAgICAgIHRoaXMuc2hvd1N0YXR1c1N0cmluZygnUmVzZXR0aW5nLi4uJyk7XG4gICAgICAgIHRoaXMudGljayA9IDA7XG4gICAgICAgIGlmICghZG5hKSB7XG4gICAgICAgICAgICBkbmEgPSBuZXcgRE5BKCk7XG4gICAgICAgICAgICBkbmEubXV0YXRlKDEwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmlld1RlbXAgPSB0aGlzLmF1dG9tYXRhICYmIHRoaXMuYXV0b21hdGEuZHJhd1N0eWxlO1xuICAgICAgICB0aGlzLmF1dG9tYXRhID0gbmV3IEF1dG9tYXRhKCdwcm90b3R5cGUnLCB0aGlzLmRyYXdDYW52YXMpO1xuICAgICAgICB0aGlzLmF1dG9tYXRhLnBsYW50U2VlZChkbmEpO1xuICAgICAgICBpZiAodmlld1RlbXApXG4gICAgICAgICAgICB0aGlzLmF1dG9tYXRhLmRyYXdTdHlsZSA9IHZpZXdUZW1wO1xuXG4gICAgICAgIHdpbmRvd1snZml0bmVzcyddID0gdGhpcy5maXRuZXNzID0gW107XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuaXNTaW11bGF0aW9uUnVubmluZykge1xuICAgICAgICAvLyAgICAgdGhpcy51cGRhdGVQbGFudEZvcmV2ZXIoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgcnVuKCkge1xuICAgICAgICBpZiAodGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU2ltdWxhdGlvbiBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhd0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b21hdGEuZHJhdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVQbGFudEZvcmV2ZXIoKTtcbiAgICB9XG5cbiAgICAvLyB3ZWlyZCBzZWxmLWNhbGxpbmcgZnVuY3Rpb25cbiAgICB1cGRhdGVQbGFudEZvcmV2ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5maXRuZXNzW3RoaXMudGlja10gPSB0aGlzLmV2YWxGaXRuZXNzKHRoaXMuYXV0b21hdGEucGxhbnQpO1xuICAgICAgICAgICAgdGhpcy5hdXRvbWF0YS51cGRhdGUoKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBdXRvbWF0YSBlcnJvciEgU3RvcHBpbmcgc2ltdWxhdGlvbi4uLlwiKTtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmF3RW5hYmxlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9tYXRhLmRyYXcoKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkRyYXcgZXJyb3IhIFN0b3BwaW5nIHNpbXVsYXRpb24uLi5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpY2sgKys7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMudXBkYXRlUGxhbnRGb3JldmVyLmJpbmQodGhpcyksIHRoaXMuRlJBTUVfREVMQVkpO1xuICAgIH1cblxuICAgIGV2YWxGaXRuZXNzKHBsYW50OiBBcnJheTxDZWxsPik6IG51bWJlciB7XG4gICAgICAgIHZhciB0Zmx1aWRzID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFudC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNlbGw6IENlbGwgPSBwbGFudFtpXTtcbiAgICAgICAgICAgIHRmbHVpZHMgKz0gY2VsbC5zdW1GbHVpZHMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGZsdWlkcztcbiAgICB9XG5cbiAgICBydW5Gb3JOVGlja3MoTikge1xuICAgICAgICAvLyBydW4gc2ltIGZvciBOIHRpY2tzXG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgTjsgKytuKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9tYXRhLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXV0b21hdGEuZHJhdygpO1xuICAgIH1cblxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU2ltdWxhdGlvbiBpcyBhbHJlYWR5IHBhdXNlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudXBkYXRlSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLmlzU2ltdWxhdGlvblJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzU3RyaW5nKCdTaW11bGF0aW9uIHN0b3BwZWQuJyk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2ltdWxhdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTaW11bGF0aW9uUnVubmluZylcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICB9XG5cbiAgICB0b2dnbGVEcmF3KCkge1xuICAgICAgICB0aGlzLmRyYXdFbmFibGVkID0gIXRoaXMuZHJhd0VuYWJsZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKCk7XG4gICAgfVxuXG4gICAgZHJhd1N0eWxlKHN0eWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkcmF3U3R5bGUnLCBzdHlsZSk7XG4gICAgICAgIHRoaXMuYXV0b21hdGEuZHJhd1N0eWxlID0gc3R5bGU7XG4gICAgICAgIHRoaXMuYXV0b21hdGEuZHJhdygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXR1cygpIHtcbiAgICAgICAgdmFyIHN0YXR1cztcbiAgICAgICAgaWYgKHRoaXMuaXNTaW11bGF0aW9uUnVubmluZylcbiAgICAgICAgICAgIHN0YXR1cyA9ICdTaW11bGF0aW9uIHJ1bm5pbmcuICc7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0YXR1cyA9ICdTaW11bGF0aW9uIHN0b3BwZWQuICc7XG4gICAgICAgIGlmICghdGhpcy5kcmF3RW5hYmxlZClcbiAgICAgICAgICAgIHN0YXR1cyArPSAnKERyYXcgZGlzYWJsZWQuKSAnO1xuICAgICAgICBzdGF0dXMgKz0gXCJUaWNrIFwiICsgdGhpcy50aWNrO1xuICAgICAgICBpZiAodGhpcy5taWRVcGRhdGUpIHN0YXR1cyArPSBcIipcIjtcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzU3RyaW5nKHN0YXR1cyk7XG4gICAgfVxuXG4gICAgc2hvd1N0YXR1c1N0cmluZyhzdGF0dXMpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNcIikuaW5uZXJIVE1MID0gc3RhdHVzO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zaW11bGF0aW9uLnRzIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG5TeW5hcHRpYyBsaWJzXG4qL1xuZGVjbGFyZSBtb2R1bGUgQXJjaGl0ZWN0IHtcbiAgICBjbGFzcyBQZXJjZXB0cm9uIHtcbiAgICAgICAgY29uc3RydWN0b3IoLi4ubm5vZGVzKVxuICAgICAgICB0cmFpbmVyO1xuICAgICAgICBsYXllcnM7XG4gICAgICAgIGFjdGl2YXRlKC4uLmlucHV0KTtcbiAgICB9XG59XG5cbmRlY2xhcmUgY2xhc3MgTmV1cm9uIHtcbiAgICBiaWFzOiBudW1iZXJcbn1cblxuZGVjbGFyZSBjbGFzcyBDb25uZWN0aW9uIHtcbiAgICB3ZWlnaHQ6IG51bWJlclxufVxuXG5cbi8qXG5cbiovXG5leHBvcnQgY2xhc3MgUGVyY2VwdHJvbiBleHRlbmRzIEFyY2hpdGVjdC5QZXJjZXB0cm9uIHtcbiAgICBjb25zdHJ1Y3RvciguLi5ubm9kZXMpIHtcbiAgICAgICAgc3VwZXIoLi4ubm5vZGVzKTtcbiAgICB9XG5cbiAgICBwZXJ0dXJiKGFtb3VudDogbnVtYmVyID0gMS4wKSB7XG4gICAgICAgIC8vIHBlcnR1cmIgZXZlcnkgd2VpZ2h0IGJ5IH5hbW91bnRcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggbGF5ZXJzIGNvbm5lY3Rpb25zXG4gICAgICAgIHZhciBjb25uZWN0aW9uczogQXJyYXk8Q29ubmVjdGlvbj4gPSB0aGlzLmxheWVycy5pbnB1dC5jb25uZWN0ZWRUb1swXS5saXN0XG4gICAgICAgIC5jb25jYXQoY29ubmVjdGlvbnMgPSB0aGlzLmxheWVycy5oaWRkZW5bMF0uY29ubmVjdGVkVG9bMF0ubGlzdCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29ubmVjdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gY29ubmVjdGlvbnNbaV07XG4gICAgICAgICAgICBjb25uZWN0aW9uLndlaWdodCArPSAyICogTWF0aC5yYW5kb20oKSAqIGFtb3VudCAtIGFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBuZXVyb25zXG4gICAgICAgIHZhciBuZXVyb25zOiBBcnJheTxOZXVyb24+ID0gdGhpcy5sYXllcnMuaW5wdXQubGlzdFxuICAgICAgICAuY29uY2F0KHRoaXMubGF5ZXJzLmhpZGRlblswXS5saXN0KVxuICAgICAgICAuY29uY2F0KHRoaXMubGF5ZXJzLm91dHB1dC5saXN0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXVyb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBuZXVyb25zW2ldLmJpYXMgKz0gMiAqIE1hdGgucmFuZG9tKCkgKiBhbW91bnQgLSBhbW91bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2VpZ2h0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAvLyAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLndlaWdodHNbaV0ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMud2VpZ2h0c1tpXVtqXS5sZW5ndGg7ICsraykge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLndlaWdodHNbaV1bal1ba10gKz0gMiAqIE1hdGgucmFuZG9tKCkgKiBhbW91bnQgLSBhbW91bnQ7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3BlcmNlcHRyb24udHMiLCJpbXBvcnQge0ZsdWlkc30gZnJvbSBcIi4vZmx1aWRzXCI7XG5cbmRlY2xhcmUgY2xhc3MgTmV0d29yayB7XG4gICAgc3RhdGljIGZyb21KU09OKGpzb246IHN0cmluZylcbn1cblxuZXhwb3J0IGNsYXNzIENlbGxUeXBlU2VyaWFsaXplciB7XG4gICAgc3RhdGljIHNlcmlhbGl6ZShjZWxsdHlwZTogT2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgdmFyIHBlcmNlcHRyb25zID0gY2VsbHR5cGVbJ2FjdGlvblBlcmNlcHRyb25zJ107XG4gICAgICAgIHZhciBwZXJjZXB0cm9uc1NlcmlhbCA9IG5ldyBBcnJheShwZXJjZXB0cm9ucy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBlcmNlcHRyb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBwZXJjZXB0cm9uc1NlcmlhbFtpXSA9IHBlcmNlcHRyb25zW2ldLnRvSlNPTigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGNvbG9yOiBjZWxsdHlwZVsnY29sb3InXSxcbiAgICAgICAgICAgIGlzTGVhZjogY2VsbHR5cGVbJ2lzTGVhZiddLFxuICAgICAgICAgICAgY29zdDogY2VsbHR5cGVbJ2Nvc3QnXS52ZWN0b3IsXG4gICAgICAgICAgICBhY3Rpb25QZXJjZXB0cm9uczogcGVyY2VwdHJvbnNTZXJpYWxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKHNlcmlhbCk6IE9iamVjdCB7XG4gICAgICAgIHZhciBvYmogPSBzZXJpYWw7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VyaWFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgb2JqID0gSlNPTi5wYXJzZShzZXJpYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBlcmNlcHRyb25zU2VyaWFsID0gb2JqLmFjdGlvblBlcmNlcHRyb25zO1xuICAgICAgICB2YXIgcGVyY2VwdHJvbnMgPSBuZXcgQXJyYXkocGVyY2VwdHJvbnNTZXJpYWwubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJjZXB0cm9uc1NlcmlhbC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcGVyY2VwdHJvbnNbaV0gPSBOZXR3b3JrLmZyb21KU09OKHBlcmNlcHRyb25zU2VyaWFsW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iai5hY3Rpb25QZXJjZXB0cm9ucyA9IHBlcmNlcHRyb25zO1xuICAgICAgICBvYmouY29zdCA9IG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoRmx1aWRzLCBvYmouY29zdCkpO1xuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2VsbFR5cGUge1xuICAgIHN0YXRpYyB0eXBlX3VwID0gMDtcbiAgICBzdGF0aWMgdHlwZV9yaWdodCA9IDE7XG4gICAgc3RhdGljIHR5cGVfcmVzdCA9IDI7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NlbGx0eXBlcy50cyJdLCJzb3VyY2VSb290IjoiIn0=