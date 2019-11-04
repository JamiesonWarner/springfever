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
    Fluids.N_FLUIDS = 3 + Fluids.N_SIGNALS;
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
                cell = new cell_1.Cell(this, fluids, row, col, cellArray);
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
                cell = new cell_1.Cell(this, fluids, row, col, cellArray); // different type is only change
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
            cell = new cell_1.Cell(this, fluids, row, col, cellArray);
            fluidsArray[row][col] = fluids;
            cellArray[row][col] = cell;
            plant.push(cell);
        }
        for (var row = rowMid; row < rowEnd; ++row) {
            var col = colMid;
            fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
            cell = new cell_1.Cell(this, fluids, row, col, cellArray);
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
                var cost = cell.dna.NEW_CELL_COST;
                var canAfford = true;
                for (var j = 0; j < cost.vector.length; j++) {
                    if (this.plant[i].fluids.vector[j] < cost.vector[j]) {
                        canAfford = false;
                        break;
                    }
                }
                if (!canAfford) {
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
                var nCell = new cell_1.Cell(this.dna, newFluids, gI, gJ, this.cellArray);
                this.plant.push(nCell);
                this.fluidsArray[gI][gJ] = newFluids;
                this.cellArray[gI][gJ] = nCell;
            }
            else if (action instanceof action_1.ReactAction) {
                for (var i = 0; i < this.plant.length; i++) {
                    var cell_2 = this.plant[i];
                    // let dGlucose = Math.min(cell.fluids.vector[Fluids.WATER]/4, 100 * numAir);
                    // convert water to glucose
                    this.addFluids(cell_2.fluids, action.reaction);
                    // fluidsDiff[cell.row][cell.col][Fluids.WATER] -= dGlucose;
                    // fluidsDiff[cell.row][cell.col][Fluids.GLUCOSE] += REACTION_FACTOR*dGlucose;
                }
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
    Automata.prototype.addFluids = function (a, b) {
        for (var i = 0; i < a.vector.length; i++) {
            a.vector[i] += b.vector[i];
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
            if (true) {
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
                        this.canvasCtx.fillStyle = interpColors([COLOR_WATER, COLOR_CHLOROPLAST], [waterContent / 50, cell.getChloroplastLevels() / 10]);
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
    function Cell(dna, fluids, row, col, cellArray) {
        this.row = row;
        this.col = col;
        this.fluids = fluids;
        this.dna = dna;
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
            potentials[i] = this.dna.actionPerceptrons[i].activate(input)[0]; // this.getActionPotential(actions[i]);
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
/**
 * A lightweight DNA object to search over.
 * Plantrpg is searching for the maximum of fitness over the set of all possible DNA.
 *
*/
var DNA = /** @class */ (function () {
    function DNA() {
        window['dna'] = this;
        this.actions = [
            // new DivideAction({ fluidGradient: [0,0,-1,0,0,0], gravityGradient: 2 }),
            // new DivideAction({ fluidGradient: [0,0,0,0,0,0], gravityGradient: 2 }),
            new action_1.PumpAction({ fluidGradient: [0, 0, 0, 0, 0, 0], fluids: [1, 0, 0, 0, 0, 0] }),
            new action_1.ReactAction({ reaction: new fluids_1.Fluids(-2, -2, 1) }),
        ];
        // cell types
        var actionPerceptrons = [];
        for (var j = 0; j < this.actions.length; ++j) {
            actionPerceptrons[j] = new perceptron_1.Perceptron(fluids_1.Fluids.N_FLUIDS + 4, 8, 1);
        }
        this.actionPerceptrons = actionPerceptrons;
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
        for (var _i = 0, _a = this.actionPerceptrons; _i < _a.length; _i++) {
            var p = _a[_i];
            p.perturb(amount);
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
                cell = new cell_1.Cell(this, fluids, row, col, cellArray);
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
                cell = new cell_1.Cell(this, fluids, row, col, cellArray); // different type is only change
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
            cell = new cell_1.Cell(this, fluids, row, col, cellArray);
            fluidsArray[row][col] = fluids;
            cellArray[row][col] = cell;
            plant.push(cell);
        }
        for (var row = rowMid; row < rowEnd; ++row) {
            var col = colMid;
            fluids = new fluids_1.Fluids(waterInitial, glucoseInitial);
            cell = new cell_1.Cell(this, fluids, row, col, cellArray);
            fluidsArray[row][col] = fluids;
            cellArray[row][col] = cell;
            plant.push(cell);
        }
        return plant;
    };
    DNA.N_CELL_TYPES = 5;
    DNA.COLOR_HEX_ARRAY = ["#ededbe", "#8F8F6E", "#6E6E8F", "#8F6E7F", "#80C4A1"];
    DNA.NEW_CELL_COST = new fluids_1.Fluids(0.2, 0.2);
    return DNA;
}());
exports.DNA = DNA;
/*
Serialization is necessary to store the results of evolution so they can be played back, saved
*/
var DNASerializer = /** @class */ (function () {
    function DNASerializer() {
    }
    DNASerializer.serialize = function (celltype) {
        // var perceptrons = celltype['actionPerceptrons'];
        // var perceptronsSerial = new Array(perceptrons.length);
        // for (var i = 0; i < perceptrons.length; ++i) {
        //     perceptronsSerial[i] = perceptrons[i].toJSON();
        // }
        // return JSON.stringify({
        //     color: celltype['color'],
        //     isLeaf: celltype['isLeaf'],
        //     cost: celltype['cost'].vector,
        //     actionPerceptrons: perceptronsSerial
        // });
        return null;
    };
    DNASerializer.deserialize = function (serialized) {
        // var obj: DNA;
        // if (typeof serialized === 'string') {
        //     obj = JSON.parse(serialized);
        // }
        // var perceptronsSerial = obj.actionPerceptrons;
        // var perceptrons = new Array(perceptronsSerial.length);
        // for (var i = 0; i < perceptronsSerial.length; ++i) {
        //     perceptrons[i] = Network.fromJSON(perceptronsSerial[i]);
        // }
        // obj.actionPerceptrons = perceptrons;
        // return obj;
        return null;
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
            this.showStatusString(e);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjNhYWZmMTVkNDliMWE5YmM3OTIiLCJ3ZWJwYWNrOi8vLy4vYXBwL2ZsdWlkcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2F1dG9tYXRhLnRzIiwid2VicGFjazovLy8uL2FwcC9jZWxsLnRzIiwid2VicGFjazovLy8uL2FwcC9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FuZ2xlLnRzIiwid2VicGFjazovLy8uL2FwcC9kbmEudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvc2ltdWxhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcGVyY2VwdHJvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREE7SUFZSTtRQUFZLGFBQU07YUFBTixVQUFNLEVBQU4scUJBQU0sRUFBTixJQUFNO1lBQU4sd0JBQU07O1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLHNDQUFzQztJQUN0QyxJQUFJO0lBSUo7O01BRUU7SUFFRjs7OztNQUlFO0lBRUY7O01BRUU7SUFDRixzQ0FBcUIsR0FBckIsVUFBc0IsT0FBTyxFQUFFLElBQUk7SUFFbkMsQ0FBQztJQUVEOzs7Ozs7OztNQVFFO0lBQ0YsaUNBQWdCLEdBQWhCLFVBQWlCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFFLENBQUM7SUFsRGxDLFlBQUssR0FBRyxDQUFDLENBQUM7SUFDVixjQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ1osbUJBQVksR0FBRyxDQUFDLENBQUM7SUFDakIsWUFBSyxHQUFHLENBQUMsQ0FBQztJQUVWLG9CQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLGdCQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsZUFBUSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBNEMzQyxhQUFDO0NBQUE7QUFwRFksd0JBQU07Ozs7Ozs7Ozs7QUNGbkI7SUFBQTtJQXFFQSxDQUFDO0lBbkVDOztNQUVFO0lBQ0ssc0JBQWdCLEdBQXZCLFVBQXdCLEtBQUs7UUFDM0IsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBRU0sa0JBQVksR0FBbkIsVUFBb0IsSUFBSSxFQUFFLElBQUk7UUFDNUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ2hDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLFlBQU0sR0FBYixVQUFjLEdBQUc7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLFlBQU0sR0FBYixVQUFjLEdBQUc7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBR00scUJBQWUsR0FBdEIsVUFBdUIsTUFBTSxFQUFFLFNBQVM7UUFDdEMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUM5QixDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7TUFHRTtJQUNLLHVCQUFpQixHQUF4QixVQUF5QixDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLFlBQU0sR0FBYixVQUFjLEdBQWtCO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFbkIsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNYLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDO0FBckVZLHNCQUFLOzs7Ozs7Ozs7O0FDQ2xCLG9DQUEyQjtBQUUzQixzQ0FBZ0M7QUFFaEMsc0NBQXdFO0FBQ3hFLHFDQUE4QjtBQUU5QixhQUFhLElBQUk7SUFDZixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDZCxXQUFXLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO1FBQ0osV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELHNCQUFzQixNQUFNLEVBQUUsT0FBTztJQUNuQzs7TUFFRTtJQUNGLG1CQUFtQjtJQUNuQixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFDLENBQUMsRUFBRSxJQUFJLEdBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDaEMsSUFBSSxvQkFBb0IsR0FBRyxHQUFHO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDakIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakUsb0JBQW9CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVELENBQUM7UUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ3JDLENBQUM7SUFFRCw4QkFBOEI7SUFDOUIsSUFBSSxVQUFVLEdBQUcsR0FBRztJQUNwQixHQUFHLENBQUMsQ0FBaUIsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1FBQXZCLElBQU0sTUFBTTtRQUNmLFVBQVUsSUFBSSxNQUFNO0tBQ3JCO0lBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLFVBQVUsQ0FBQztJQUM5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBQyxVQUFVLENBQUM7SUFDOUMsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQ7Ozs7RUFJRTtBQUNGO0lBdUJFLGtCQUFZLFNBQWlCLEVBQUUsVUFBbUI7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0QsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBRTNELHFEQUFxRDtnQkFDckQsSUFBSSxLQUFLLENBQUM7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzVCLEtBQUssR0FBRyxRQUFRLENBQUMsd0JBQXdCO2dCQUczQyxJQUFJO29CQUNGLEtBQUssR0FBRyxRQUFRLENBQUMsdUJBQXVCO2dCQUMxQywyREFBMkQ7Z0JBQzNELGdFQUFnRTtnQkFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGVBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQztRQUNELENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzRCw0REFBNEQ7WUFDNUQsMkNBQTJDO1lBQzNDLElBQUk7UUFDSixDQUFDO1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBUyxLQUFpQjtZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx5Q0FBc0IsR0FBdEIsVUFBeUIsU0FBNkIsRUFBRSxXQUFpQztRQUN2RixnQ0FBZ0M7UUFDaEMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMsNkNBQTZDO1FBQ3BFLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87UUFDaEMsSUFBSSxNQUFjLENBQUM7UUFFbkIsd0JBQXdCO1FBQ3hCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFDdEQsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFFN0Qsa0JBQWtCO1FBQ2QsS0FBSyxHQUFnQixFQUFFLEVBQ3ZCLElBQVU7UUFFZCxXQUFXO1FBQ1AsUUFBUSxHQUFXLGVBQWUsR0FBRyxDQUFDLEVBQ3RDLE1BQU0sR0FBVyxlQUFlLEdBQUcsRUFBRSxFQUNyQyxNQUFNLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDcEQsUUFBUSxHQUFXLGVBQWUsR0FBRyxDQUFDLEVBQ3RDLE1BQU0sR0FBVyxlQUFlLEdBQUcsQ0FBQyxFQUNwQyxNQUFNLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxRQUFRLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLFFBQVEsRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQzdDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUM7b0JBQUMsUUFBUSxDQUFDO2dCQUM1QixNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRCxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUMvQixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNsQixDQUFDO1FBQ0gsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDM0MsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsUUFBUSxFQUFFLEdBQUcsR0FBRyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDN0MsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQztvQkFBQyxRQUFRLENBQUM7Z0JBQzVCLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2xELElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0M7Z0JBQ3BGLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQy9CLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLFlBQVk7UUFDWixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxRQUFRLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNqQixNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUMvQixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQzNDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNqQixNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUMvQixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xCLENBQUM7UUFHRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVSxJQUFRO1FBQ2hCLHdEQUF3RDtRQUN4RCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNwRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVSxHQUFHLEVBQUMsR0FBRztRQUNmLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDRCw2QkFBVSxHQUFWLFVBQVcsR0FBRyxFQUFDLEdBQUc7UUFDaEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNwRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELHNDQUFtQixHQUFuQjtRQUNFLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxHQUFHLEdBQUcsR0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JFLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3ZELE1BQU0sQ0FBQztvQkFDVCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCwyQkFBUSxHQUFSLFVBQVMsQ0FBQyxFQUFDLENBQUM7UUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ3hDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN4QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdEYsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMxRixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDM0YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25GLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckYsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDRSxzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLDZEQUE2RDtRQUc3RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLHdCQUF3QjtJQUMxQixDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUNFLDZCQUE2QjtRQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksSUFBVSxDQUFDO1FBQ2YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsb0JBQW9CO1lBQ3BCLDZCQUE2QjtZQUM3QixJQUFJO1FBQ0osQ0FBQztRQUVELDhCQUE4QjtRQUM5QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLFFBQVEsQ0FBQyxDQUFDLDJCQUEyQjtZQUN2QyxDQUFDO1lBQ0QsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsdUJBQXVCO1lBQ3ZCLEVBQUUsRUFBQyxNQUFNLFlBQVkscUJBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLHVDQUF1QztnQkFDdkMsSUFBSSxPQUFPLEdBQWlCLE1BQU0sQ0FBQztnQkFFbkMscUNBQXFDO2dCQUVyQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLEtBQUssR0FBVyxPQUFPLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBRXRHLElBQUksU0FBUyxHQUFHLGFBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLElBQUksSUFBSSxHQUFHLGFBQUssQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxJQUFJLEdBQUcsYUFBSyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUU5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ2xDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFFbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7Z0JBRWxDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM1QyxFQUFFLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRCxTQUFTLEdBQUcsS0FBSyxDQUFDO3dCQUNsQixLQUFLLENBQUM7b0JBQ1IsQ0FBQztnQkFDSCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZixRQUFRLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxFQUFFLEVBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksUUFBUSxDQUFDLFdBQVcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsY0FBZSxDQUFDLEVBQUM7b0JBQ25GLHdEQUF3RDtvQkFDeEQsUUFBUSxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLDJEQUEyRDtvQkFDM0QsUUFBUSxDQUFDO2dCQUNYLENBQUM7Z0JBR0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDakMsQ0FBQztZQUdELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksb0JBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDM0MsSUFBSSxNQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsNkVBQTZFO29CQUM3RSwyQkFBMkI7b0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO29CQUM1Qyw0REFBNEQ7b0JBQzVELDhFQUE4RTtnQkFDaEYsQ0FBQztZQUNILENBQUM7WUFHRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLG1CQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLE9BQU8sR0FBZSxNQUFNLENBQUM7Z0JBQ2pDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELG9CQUFvQjtnQkFDcEIsSUFBSSxLQUFLLEdBQVcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN0RyxvQkFBb0I7Z0JBQ3BCLElBQUksU0FBUyxHQUFHLGFBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLElBQUksSUFBSSxHQUFHLGFBQUssQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxJQUFJLEdBQUcsYUFBSyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ2xDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDbEMsRUFBRSxFQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksUUFBUSxDQUFDLGNBQWUsQ0FBQyxFQUFDO29CQUNuRixRQUFRLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxvQkFBb0I7Z0JBQ3BCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNyRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNqRCxnREFBZ0Q7b0JBQ2hELGlEQUFpRDtvQkFDakQsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsOEVBQThFO29CQUM5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsQ0FBQztvQkFFRCxnQ0FBZ0M7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDSixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsQ0FBQztvQkFDRCxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNqQixjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0gsQ0FBQztRQUNMLENBQUM7SUFDRCxDQUFDO0lBRUQ7O01BRUU7SUFDRiw0QkFBUyxHQUFUO1FBQ0UsSUFBSSxTQUFTLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQztRQUN6RCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFBQyxRQUFRLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVc7Z0JBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxZQUFZO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxxREFBcUQ7WUFDckQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxtREFBbUQ7WUFDbkQsQ0FBQztRQUVELENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2QyxJQUFJLElBQUksR0FBUyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0Isd0RBQXdEO1lBQ3hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixzREFBc0Q7WUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUMvQyxDQUFDO0lBQ0QsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxDQUFDLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRUQsNEJBQVMsR0FBVCxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxNQUFNO1FBQ2hCLElBQUksU0FBUyxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUNFLDhDQUE4QztRQUU5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVELDRCQUE0QjtRQUM1QixJQUFJLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDdkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxjQUFjLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUM7b0JBQzFGLFFBQVEsQ0FBQztnQkFDWCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxZQUFZLFlBQVksV0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztvQkFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsZUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsUUFBUSxDQUFDO3dCQUNYLElBQUksTUFBTSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO29CQUNsQyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEI7UUFDRSw2Q0FBNkM7UUFDN0MsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLGtCQUFrQixDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxrQkFBa0IsQ0FBQztRQUMzRCxDQUFDO0lBQ0gsQ0FBQztJQUVELGlEQUE4QixHQUE5QjtRQUVFLCtCQUErQjtRQUMvQixJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDcEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDdkQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLGVBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3pDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELDhDQUE4QztRQUM5QyxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQyxrQ0FBa0M7UUFDNUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQzFFLDJCQUEyQjtnQkFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQztnQkFDekQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsR0FBQyxRQUFRLENBQUM7WUFDN0UsQ0FBQztRQUNILENBQUM7UUFFRCw4REFBOEQ7UUFDOUQsMkJBQTJCO1FBQzNCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDcEQsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUN4QyxJQUFJLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqRCxRQUFRLENBQUM7b0JBQ1gsQ0FBQztvQkFFRCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBQ25CLDBCQUEwQjtvQkFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6RSxRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUNqQixDQUFDO29CQUVELHVDQUF1QztvQkFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkUsa0JBQWtCO3dCQUNsQixRQUFRLENBQUM7b0JBQ1QsQ0FBQztvQkFFRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDakUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQy9DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUN6QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEMsSUFBSSxJQUFJLEdBQUcsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDOzRCQUNoQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO3dCQUM5QyxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsOEJBQThCO1FBRTlCLDZCQUE2QjtRQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFHLEVBQUMsQ0FBQztZQUNwRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFHLEVBQUUsQ0FBQztnQkFDeEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQy9DLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBRyxFQUFFLEdBQUc7UUFDdkIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDM0IsR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDOUQsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxHQUFHLEVBQUUsR0FBRztRQUNyQixvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNuRCxNQUFNLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixHQUFHLEVBQUUsR0FBRztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDO1lBQzdDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx1QkFBSSxHQUFKO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBTSxpQkFBaUIsR0FBRyxHQUFHO1FBRTdCLHdCQUF3QjtRQUN4QixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLCtDQUErQztRQUMvQyw4RkFBOEY7UUFDOUYsMkNBQTJDO1FBRzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUcsRUFBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUcsRUFBQyxDQUFDO2dCQUN2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDL0MsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQy9CLElBQUksa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDeEYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFDLGtCQUFrQixDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlFLElBQUksV0FBVyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxFQUFDO29CQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUNqRyxDQUFDO29CQUNELElBQUksQ0FBQyxDQUFDO3dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDdkMsQ0FBQztnQkFDSCxDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0csQ0FBQztvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQ3ZDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDSiwwQ0FBMEM7b0JBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1QsOENBQThDO3dCQUM5QyxJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUM7d0JBQzlCLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO3dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQ3JDLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLEVBQ2hDLENBQUMsWUFBWSxHQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FDakQ7b0JBQ0osQ0FBQztvQkFDRCxJQUFJLENBQUMsRUFBRSxFQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBQzt3QkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JDLDZCQUE2Qjt3QkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQsQ0FBQztvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQ3ZDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXhGLHNDQUFzQztnQkFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMxRixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7b0JBQ3ZDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWpELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7NEJBQ3hDLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQztnQ0FDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQ0FDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQ0FDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUM5RCxDQUFDO2dDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEdBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7b0NBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEtBQUssR0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQ0FDOUQsQ0FBQztnQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMs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QUMsSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFFL0MsOEJBQThCO1FBQzlCLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNYLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssR0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUNyQixFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQUssR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQyxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNsQixFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNwQixFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNwQixFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN6QixDQUFDO1FBRUQscURBQXFEO1FBQ3JELEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQ3JCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtB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QVMsQ0FBQyxVQUFVLEdBZ0NuRDtBQWhDWSxnQ0FBVSIsImZpbGUiOiIuL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYzYWFmZjE1ZDQ5YjFhOWJjNzkyIiwiaW1wb3J0IHtBdXRvbWF0YX0gZnJvbSBcIi4vYXV0b21hdGFcIjtcblxuZXhwb3J0IGNsYXNzIEZsdWlkcyB7XG4gICAgc3RhdGljIFdBVEVSID0gMDtcbiAgICBzdGF0aWMgR0xVQ09TRSA9IDE7XG4gICAgc3RhdGljIENITE9ST1BMQVNUUyA9IDI7XG4gICAgc3RhdGljIEFVWElOID0gMztcblxuICAgIHN0YXRpYyBTSUdOQUxTX1NUQVJUID0gMztcbiAgICBzdGF0aWMgTl9TSUdOQUxTID0gNDtcbiAgICBzdGF0aWMgTl9GTFVJRFMgPSAzICsgRmx1aWRzLk5fU0lHTkFMUztcblxuICAgIHZlY3RvcjtcblxuICAgIGNvbnN0cnVjdG9yKC4uLnZlYykge1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBBcnJheShGbHVpZHMuTl9GTFVJRFMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEZsdWlkcy5OX0ZMVUlEUzsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLnZlY3RvcltpXSA9IHZlY1tpXSB8fCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0UHJlc3N1cmVJbkFyZWEoYXJlYTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuc3VtRmx1aWRzKCkgLyBhcmVhO1xuICAgIC8vIH1cblxuXG5cbiAgICAvKlxuICAgIEdvYWw6ICBxXG4gICAgKi9cblxuICAgIC8qXG4gICAgUmV0dXJucyB0aGUgcXVhbnRpdHkgb2YgYSBnaXZlbiBmbHVpZCwgd2hpY2ggaXMgdGhlIGFtb3VudCBvZiBhIHN1YnN0YW5jZSBwZXIgdW5pdCB2b2x1bWUuXG4gICAgZGl2aWRlZCBieSB0aGUgdG90YWwgZmx1aWQuXG5cbiAgICAqL1xuXG4gICAgLypcblxuICAgICovXG4gICAgZ2V0Rmx1aWRDb25jZW50cmF0aW9uKGZsdWlkSWQsIGFyZWEpIHtcblxuICAgIH1cblxuICAgIC8qXG4gICAgRGlmZnVzaXZlIGZsdXggaXMgcmF0ZSBvZiBmbG93IHBlciB1bml0IGFyZWEuIFBvc2l0aXZlIHZhbHVlIG1lYW5zIG91dHdhcmQgZmxvdy5cblxuICAgIEZpY2sncyBsYXcgb2YgZGlmZnVzaW9uOiBKID0gLUQgKGQgcGhpKS8oZCB4KVxuICAgIEogaXMgZGlmZnVzaXZlIGZsdXhcbiAgICBEIGlzIGRpZmZ1c2lvbiBjb2VmZmljaWVudFxuICAgIHBoaSBpcyBhbW91bnQgb2ZcbiAgICB4IGlzIHBvc2l0aW9uXG4gICAgKi9cbiAgICBnZXREaWZmdXNpdmVGbHV4KHRvRmx1aWQsIGFyZWExLCBhcmVhMil7fVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZmx1aWRzLnRzIiwiZXhwb3J0IGNsYXNzIFV0aWxzIHtcblxuICAvKlxuICBSZXR1cm5zIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIC1ib3VuZCBhbmQgYm91bmRcbiAgKi9cbiAgc3RhdGljIGdldEJvdW5kZWRSYW5kb20oYm91bmQpIHtcbiAgICByZXR1cm4gMiAqIGJvdW5kICogTWF0aC5yYW5kb20oKSAtIGJvdW5kO1xuICB9XG5cbiAgc3RhdGljIGNyb3NzUHJvZHVjdChhcnIxLCBhcnIyKSB7XG4gICAgdmFyIHN1bSA9IDA7XG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGFycjEubGVuZ3RoLCBhcnIyLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgc3VtICs9IGFycjFbaV0gKiBhcnIyW2ldO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xuICB9XG5cbiAgc3RhdGljIGwybm9ybShhcnIpIHtcbiAgICAgIHZhciBuID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgbiArPSBhcnJbaV0gKiBhcnJbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KG4pO1xuICB9XG5cbiAgc3RhdGljIGwxbm9ybShhcnIpIHtcbiAgICB2YXIgbiA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgIG4gKz0gYXJyW2ldO1xuICAgIH1cbiAgICByZXR1cm4gbjtcbiAgfVxuXG5cbiAgc3RhdGljIGRpc3RhbmNlVG9QbGFuZShmbHVpZHMsIGFjdGl2YXRvcikge1xuICAgIHZhciBub3JtVyA9IFV0aWxzLmwybm9ybShhY3RpdmF0b3Iudyk7XG5cbiAgICB2YXIgZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICBkICs9IGZsdWlkc1tpXSAqIGFjdGl2YXRvcltpXTtcbiAgICB9XG4gICAgZCArPSBhY3RpdmF0b3IuYjtcbiAgICByZXR1cm4gZCAvIG5vcm1XO1xuICB9XG5cbiAgLypcbiAgU2lnbW9pZCBhY3RpdmF0b3IuXG4gIFJldHVybnMgdmFsdWUgZnJvbSAwIHRvIDEgZ2l2ZW4gZiBmcm9tIC1pbmYgdG8gaW5mLlxuICAqL1xuICBzdGF0aWMgYWN0aXZhdG9yRnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIDEgLyAoMSArIE1hdGguZXhwKC12KSk7XG4gIH1cblxuICBzdGF0aWMgYXJnbWF4KGFycjogQXJyYXk8bnVtYmVyPikge1xuICAgIGlmICghYXJyLmxlbmd0aClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICB2YXIgbWF4ID0gYXJyWzBdO1xuICAgIHZhciBhcmdtYXggPSAwO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoYXJyW2ldID4gbWF4KSB7XG4gICAgICAgIGFyZ21heCA9IGk7XG4gICAgICAgIG1heCA9IGFycltpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJnbWF4O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvdXRpbHMudHMiLCJpbXBvcnQge0ROQX0gZnJvbSBcIi4vZG5hXCI7XG5pbXBvcnQge0NlbGx9IGZyb20gXCIuL2NlbGxcIlxuaW1wb3J0IHtEaXJ0fSBmcm9tIFwiLi9kaXJ0XCI7XG5pbXBvcnQge0ZsdWlkc30gZnJvbSBcIi4vZmx1aWRzXCI7XG5pbXBvcnQge0lTeXN0ZW19IGZyb20gXCIuL3N5c3RlbVwiO1xuaW1wb3J0IHtJQWN0aW9uLCBEaXZpZGVBY3Rpb24sIFJlYWN0QWN0aW9uLCBQdW1wQWN0aW9ufSBmcm9tIFwiLi9hY3Rpb25cIjtcbmltcG9ydCB7QW5nbGV9IGZyb20gXCIuL2FuZ2xlXCI7XG5cbmZ1bmN0aW9uIGhleChieXRlKXtcbiAgbGV0IGNvbG9yU3RyaW5nID0gXCJcIjtcbiAgaWYgKGJ5dGUgPCAxNikge1xuICAgIGNvbG9yU3RyaW5nICs9IFwiMFwiICsgYnl0ZS50b1N0cmluZygxNik7XG4gIH1cbiAgZWxzZSB7XG4gICAgY29sb3JTdHJpbmcgKz0gYnl0ZS50b1N0cmluZygxNik7XG4gIH1cbiAgcmV0dXJuIGNvbG9yU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBpbnRlcnBDb2xvcnMoY29sb3JzLCB3ZWlnaHRzKSB7XG4gIC8qY29sb3JzIC0gYSBsaXN0IG9mIHN0cmluZyBoZXggcmVwcmVzZW50YXRpb25zLCBlLmcuLCAjMGY1ZTljXG4gIHdlaWdodHMgLSBhIGxpc3Qgb2YgdmFsdWVzIGZyb20gMCB0byAxXG4gICovXG4gIC8vIENyZWF0ZSB0aGUgY29sb3JcbiAgdmFyIGNoYW5uZWxzID0gW11cbiAgZm9yICh2YXIgY2hhbj0wOyBjaGFuPDM7IGNoYW4rKykge1xuICAgIHZhciB3ZWlnaHRlZFN1bUluQ2hhbm5lbCA9IDAuMFxuICAgIGZvciAodmFyIGk9MDsgaTxjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb2xvciA9IGNvbG9yc1tpXSxcbiAgICAgICAgICB3ZWlnaHQgPSB3ZWlnaHRzW2ldXG4gICAgICBsZXQgY2hhbm5lbEFtb3VudCA9IHBhcnNlSW50KGNvbG9yLnNsaWNlKDErMipjaGFuLCAzKzIqY2hhbiksIDE2KVxuICAgICAgd2VpZ2h0ZWRTdW1JbkNoYW5uZWwgKz0gTWF0aC5yb3VuZChjaGFubmVsQW1vdW50ICogd2VpZ2h0KVxuICAgIH1cbiAgICBjaGFubmVscy5wdXNoKHdlaWdodGVkU3VtSW5DaGFubmVsKVxuICB9XG5cbiAgLy8gQWRkIGEgd2hpdGUgZmlsbCBiYWNrZ3JvdW5kXG4gIGxldCBzdW1XZWlnaHRzID0gMC4wXG4gIGZvciAoY29uc3Qgd2VpZ2h0IG9mIHdlaWdodHMpIHtcbiAgICBzdW1XZWlnaHRzICs9IHdlaWdodFxuICB9XG4gIGxldCBmaWxsQW1vdW50ID0gTWF0aC5tYXgoMCwgMS4wIC0gc3VtV2VpZ2h0cylcbiAgZm9yICh2YXIgY2hhbj0wOyBjaGFuPDM7IGNoYW4rKykge1xuICAgIGNoYW5uZWxzW2NoYW5dICs9IE1hdGguZmxvb3IoMjU1KmZpbGxBbW91bnQpXG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBjb2xvciB0byBhIGhleCBjb2RlXG4gIHJldHVybiBcIiNcIiArIGhleChjaGFubmVsc1swXSkgKyBoZXgoY2hhbm5lbHNbMV0pICsgaGV4KGNoYW5uZWxzWzJdKVxufVxuXG4vKlxuVE9ETyB0dXJuIEF1dG9tYXRhIGludG8gc3lzdGVtcyBtb2RlbC5cbkF1dG9tYXRhIGlzIGEgcGxhY2UgZm9yIHNoYXJlZCBzdGF0ZS5cbkF1dG9tYXRhIGp1c3Qgc3RvcmVzIHN0dWZmIGxpa2UgdGhlIGZsdWlkc0FycmF5LCBhbmQgaXRzIHN0YXRlIGlzIHRyYW5zZm9ybWVkIGJ5IFN5c3RlbXMuXG4qL1xuZXhwb3J0IGNsYXNzIEF1dG9tYXRhIHtcbiAgc3RhdGljIEdSSURfTl9DT0xVTU5TID0gMTIwO1xuICBzdGF0aWMgR1JJRF9OX1JPV1MgPSAxMDA7XG4gIHN0YXRpYyBDRUxMX1NDQUxFX1BJWEVMUyA9IDg7XG5cbiAgLy8gdXNlZCB0byBlc3RpbWF0ZSB0dXJnaWRpdHkuIFdvbGZyYW0gQWxwaGE6IG1hc3Mgb2YgMWNtXjMgd2F0ZXJcbiAgc3RhdGljIE1BVEVSSUFMX1dBVEVSX1dBVEVSX01FQU4gPSAxLjA7XG4gIC8vIFdvbGZyYW0gQWxwaGE6IG1hc3Mgb2YgMSBjbV4zIG1vaXN0IHNvaWwgLSBXb2xmcmFtIEFscGhhOiBtYXNzIG9mIDFjbV4zIGRyeSBzb2lsO1xuICBzdGF0aWMgTUFURVJJQUxfRElSVF9XQVRFUl9NRUFOID0gMC4yMTtcbiAgLy8gV29sZnJhbSBBbHBoYTogbWFzcyBvZiB3YXRlciB2YXBvciBpbiAxIGN1YmljIGNlbnRpbWVyIGFpcjtcbiAgc3RhdGljIE1BVEVSSUFMX0FJUl9XQVRFUl9NRUFOID0gMS41MTllLTU7XG5cbiAgY2FudmFzO1xuICBjYW52YXNDdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgZmx1aWRzQXJyYXk6IEFycmF5PEFycmF5PEZsdWlkcz4+O1xuICBjZWxsQXJyYXk6IEFycmF5PEFycmF5PENlbGw+PjsgLy8gdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vIGNlbGxcbiAgcGxhbnQ6IEFycmF5PENlbGw+O1xuICBkbmE7XG5cbiAgZHJhd1N0eWxlOiBzdHJpbmc7XG5cbiAgc3lzdGVtczogQXJyYXk8SVN5c3RlbT47XG5cbiAgY29uc3RydWN0b3IocnVuU3RyaW5nOiBTdHJpbmcsIGRyYXdDYW52YXM6IEVsZW1lbnQpIHtcbiAgICB0aGlzLnN5c3RlbXMgPSBuZXcgQXJyYXkoKTtcblxuICAgIHRoaXMuY2FudmFzID0gZHJhd0NhbnZhcztcbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgKiBBdXRvbWF0YS5DRUxMX1NDQUxFX1BJWEVMUyk7XG4gICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBBdXRvbWF0YS5HUklEX05fUk9XUyAqIEF1dG9tYXRhLkNFTExfU0NBTEVfUElYRUxTKTtcbiAgICB0aGlzLmNhbnZhc0N0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIHRoaXMuZmx1aWRzQXJyYXkgPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX1JPV1MpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3crKykge1xuICAgICAgdGhpcy5mbHVpZHNBcnJheVtyb3ddID0gbmV3IEFycmF5KEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TKTtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuXG4gICAgLy8gY3JlYXRlIGZsdWlkIGZvciBlYWNoIGxvY2F0aW9uIGluIHRoZSBmbHVpZHMgYXJyYXlcbiAgICB2YXIgd2F0ZXI7XG4gICAgaWYgKHRoaXMuaXNEaXJ0Q2VsbChyb3csIGNvbCkpXG4gICAgICB3YXRlciA9IEF1dG9tYXRhLk1BVEVSSUFMX0RJUlRfV0FURVJfTUVBTlxuICAgIC8vIFVuY29tbWVudCBsaW5lIHRvIG1ha2UgYSByYW5kb20gYW1vdW50IG9mIHN0YXJ0aW5nIHdhdGVyXG4gICAgLy8gd2F0ZXIgPSBNYXRoLnJhbmRvbSgpICogMiAqIEF1dG9tYXRhLk1BVEVSSUFMX0RJUlRfV0FURVJfTUVBTjtcbiAgICBlbHNlXG4gICAgICB3YXRlciA9IEF1dG9tYXRhLk1BVEVSSUFMX0FJUl9XQVRFUl9NRUFOXG4gICAgLy8gVW5jb21tZW50IGxpbmUgdG8gbWFrZSBhIHJhbmRvbSBhbW91bnQgb2Ygc3RhcnRpbmcgd2F0ZXJcbiAgICAvLyB3YXRlciA9IE1hdGgucmFuZG9tKCkgKiAyICogQXV0b21hdGEuTUFURVJJQUxfQUlSX1dBVEVSX01FQU47XG4gICAgdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBuZXcgRmx1aWRzKHdhdGVyLCAwKTtcbiAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jZWxsQXJyYXkgPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX1JPV1MpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3crKykge1xuICAgICAgdGhpcy5jZWxsQXJyYXlbcm93XSA9IG5ldyBBcnJheShBdXRvbWF0YS5HUklEX05fQ09MVU1OUyk7XG4gICAgLy8gZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7ICsrY29sKSB7XG4gICAgLy8gICB0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF0gPT0gdW5kZWZpbmVkO1xuICAgIC8vIH1cbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZHJhd0NhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICBzZWxmLnNob3dJbmZvKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgIH0pXG4gIH1cblxuICBtYWtlQ2VsbHNBdENvb3JkaW5hdGVzICAoY2VsbEFycmF5OiBBcnJheTxBcnJheTxDZWxsPj4sIGZsdWlkc0FycmF5OiBBcnJheTxBcnJheTxGbHVpZHM+Pikge1xuICAgIC8vIGNvbXB1dGUgaW5pdGlhbCBmbHVpZCB2ZWN0b3JzXG4gICAgdmFyIHdhdGVySW5pdGlhbCA9IDIwOyAvLyAxLjc1ICogQXV0b21hdGEuTUFURVJJQUxfV0FURVJfV0FURVJfTUVBTjtcbiAgICB2YXIgZ2x1Y29zZUluaXRpYWwgPSAyMDsgLy8gNC4wO1xuICAgIHZhciBmbHVpZHM6IEZsdWlkcztcblxuICAgIC8vIHJlZmVyZW5jZSBjb29yZGluYXRlc1xuICAgIHZhciByb3dDZW50ZXJPZkdyaWQgPSBNYXRoLmZsb29yKEF1dG9tYXRhLkdSSURfTl9ST1dTIC8gMiksXG4gICAgICAgIGNvbENlbnRlck9mR3JpZCA9IE1hdGguZmxvb3IoQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgLyAyKSxcblxuICAgIC8vIHBsYW50IHRvIGNyZWF0ZVxuICAgICAgICBwbGFudDogQXJyYXk8Q2VsbD4gPSBbXSxcbiAgICAgICAgY2VsbDogQ2VsbCxcblxuICAgIC8vIGl0ZXJhdGUuXG4gICAgICAgIHJvd1N0YXJ0OiBudW1iZXIgPSByb3dDZW50ZXJPZkdyaWQgKyAyLFxuICAgICAgICByb3dFbmQ6IG51bWJlciA9IHJvd0NlbnRlck9mR3JpZCArIDEwLFxuICAgICAgICByb3dNaWQ6IG51bWJlciA9IE1hdGguZmxvb3IoKHJvd1N0YXJ0ICsgcm93RW5kKSAvIDIpLFxuICAgICAgICBjb2xTdGFydDogbnVtYmVyID0gY29sQ2VudGVyT2ZHcmlkIC0gMixcbiAgICAgICAgY29sRW5kOiBudW1iZXIgPSBjb2xDZW50ZXJPZkdyaWQgKyAyLFxuICAgICAgICBjb2xNaWQ6IG51bWJlciA9IE1hdGguZmxvb3IoKGNvbFN0YXJ0ICsgY29sRW5kKSAvIDIpO1xuICAgIGZvciAodmFyIHJvdyA9IHJvd1N0YXJ0OyByb3cgPCByb3dNaWQ7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSBjb2xTdGFydDsgY29sIDwgY29sRW5kOyArK2NvbCkge1xuICAgICAgICBpZiAoY29sID09IGNvbE1pZCkgY29udGludWU7XG4gICAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICAgIGNlbGwgPSBuZXcgQ2VsbCh0aGlzLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpO1xuICAgICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcm93ID0gcm93TWlkOyByb3cgPCByb3dFbmQ7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSBjb2xTdGFydDsgY29sIDwgY29sRW5kOyArK2NvbCkge1xuICAgICAgICBpZiAoY29sID09IGNvbE1pZCkgY29udGludWU7XG4gICAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICAgIGNlbGwgPSBuZXcgQ2VsbCh0aGlzLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpOyAvLyBkaWZmZXJlbnQgdHlwZSBpcyBvbmx5IGNoYW5nZVxuICAgICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGNlbnRlciBjb2x1bW5cbiAgICAvLyBtZXJpc3RlbXNcbiAgICBmb3IgKHZhciByb3cgPSByb3dTdGFydDsgcm93IDwgcm93TWlkOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgZmx1aWRzLCByb3csIGNvbCwgY2VsbEFycmF5KTtcbiAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgcGxhbnQucHVzaChjZWxsKVxuICAgIH1cblxuICAgIGZvciAodmFyIHJvdyA9IHJvd01pZDsgcm93IDwgcm93RW5kOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgZmx1aWRzLCByb3csIGNvbCwgY2VsbEFycmF5KTtcbiAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgcGxhbnQucHVzaChjZWxsKVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHBsYW50O1xuICB9XG5cbiAgcGxhbnRTZWVkKHNlZWQ6RE5BKSB7XG4gICAgLy8gcmVtb3ZlIGFsbCBleGlzdGluZyBwbGFudHMgYW5kIGFkZCB0aGUgc3BlY2lmaWVkIHNlZWRcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBBdXRvbWF0YS5HUklEX05fUk9XUzsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuICAgICAgICB0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGxhbnQgPSBzZWVkLnBsYW50U2VlZCh0aGlzLmNlbGxBcnJheSwgdGhpcy5mbHVpZHNBcnJheSk7XG4gICAgdGhpcy5kbmEgPSBzZWVkO1xuICB9XG5cbiAgaXNBaXJDZWxsKHJvdyxjb2wpIHtcbiAgICByZXR1cm4gcm93IDwgNTA7XG4gIH1cbiAgaXNEaXJ0Q2VsbChyb3csY29sKSB7XG4gICAgcmV0dXJuIHJvdyA+PSA1MDtcbiAgfVxuXG4gIHByaW50R3JpZEZsdWlkcygpIHtcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBBdXRvbWF0YS5HUklEX05fUk9XUzsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZsdWlkc0FycmF5W3Jvd11bY29sXS52ZWN0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRmx1aWRzQXJyYXkoKSB7XG4gICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgQXV0b21hdGEuR1JJRF9OX1JPV1M7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBBdXRvbWF0YS5HUklEX05fQ09MVU1OUzsgKytjb2wpIHtcbiAgICAgICAgdmFyIGYgPSB0aGlzLmZsdWlkc0FycmF5W3Jvd11bY29sXS52ZWN0b3I7XG4gICAgICAgIGlmICh0eXBlb2YgZiA9PT0gJ3VuZGVmaW5lZCcpIGNvbnNvbGUubG9nKCdyb3csY29sIGFyZTogJywgcm93LCBjb2wpO1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGYubGVuZ3RoOyArK2spIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGZba10gIT09ICdudW1iZXInIHx8IGlzTmFOKGZba10pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yOiBJbnZhbGlkIGZsdWlkIHZlY3RvciBhdDogJyArIHJvdysnLCAnK2NvbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmW2tdIDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dhcm5pbmc6IE5lZ2F0aXZlIGZsdWlkcyBhdDogJywgcm93LCBjb2wpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNob3dJbmZvKHgseSkge1xuICAgIHZhciB0eCA9IHggLyBBdXRvbWF0YS5DRUxMX1NDQUxFX1BJWEVMUztcbiAgICB2YXIgdHkgPSB5IC8gQXV0b21hdGEuQ0VMTF9TQ0FMRV9QSVhFTFM7XG4gICAgdmFyIHJvdyA9IE1hdGguZmxvb3IodHkpO1xuICAgIHZhciBjb2wgPSBNYXRoLmZsb29yKHR4KVxuICAgIHZhciBmbHVpZHMgPSB0aGlzLmZsdWlkc0FycmF5W3Jvd11bY29sXTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFyLXdhdGVyJykuc3R5bGUud2lkdGggPSBmbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl0gKyAncHgnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXItZ2x1Y29zZScpLnN0eWxlLndpZHRoID0gZmx1aWRzLnZlY3RvcltGbHVpZHMuR0xVQ09TRV0gKyAncHgnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXItYXV4aW4nKS5zdHlsZS53aWR0aCA9ICg0MCpmbHVpZHMudmVjdG9yW0ZsdWlkcy5BVVhJTl0pICsgJ3B4JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dC13YXRlcicpLmlubmVySFRNTCA9IFwiXCIgKyBmbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQtZ2x1Y29zZScpLmlubmVySFRNTCA9IFwiXCIgKyBmbHVpZHMudmVjdG9yW0ZsdWlkcy5HTFVDT1NFXTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dC1hdXhpbicpLmlubmVySFRNTCA9IFwiXCIgKyBmbHVpZHMudmVjdG9yW0ZsdWlkcy5BVVhJTl07XG5cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwidGlja1wiKTtcbiAgICAvLyBpZiAodGhpcy5wbGFudC5sZW5ndGgpXG4gICAgLy8gICBjb25zb2xlLmxvZygnY2VsbCBmbHVpZHMnLCB0aGlzLnBsYW50WzBdLmZsdWlkcy52ZWN0b3IpO1xuXG5cbiAgICB0aGlzLmRvQ2VsbEFjdGlvbnMoKTtcbiAgICB0aGlzLmRvUGFzc2l2ZUZsb3dBbmRQaG90b3N5bnRoZXNpcygpO1xuICAgIHRoaXMuZG9DZWxsTWV0YWJvbGlzbSgpO1xuICAgIHRoaXMuY2VsbERlYXRoKCk7XG5cbiAgICAvLyB0aGlzLnNpZ25hbHNVcGRhdGUoKTtcbiAgfVxuXG4gIGRvQ2VsbEFjdGlvbnMoKSB7XG4gICAgLy8gQ2FsYyBhY3Rpb25zIG9uIHRoaXMgZnJhbWVcbiAgICB2YXIgYWN0aW9ucyA9IG5ldyBBcnJheSh0aGlzLnBsYW50Lmxlbmd0aCk7XG4gICAgdmFyIGNlbGw6IENlbGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjZWxsID0gdGhpcy5wbGFudFtpXTtcbiAgICAgIGFjdGlvbnNbaV0gPSBjZWxsLmNob29zZUFjdGlvbigpO1xuICAgIC8vIGlmIChhY3Rpb25zW2ldKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhhY3Rpb25zW2ldKTtcbiAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgYWN0aW9ucyBvbiB0aGlzIGZyYW1lXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWFjdGlvbnNbaV0pIHtcbiAgICAgICAgY29udGludWU7IC8vIGNlbGwgY2hvc2UgdG8gZG8gbm90aGluZ1xuICAgICAgfVxuICAgICAgdmFyIGFjdGlvbiA9IGFjdGlvbnNbaV07XG4gICAgICB2YXIgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICAvLyBjb25zb2xlLmxvZyhhY3Rpb24pO1xuICAgICAgaWYoYWN0aW9uIGluc3RhbmNlb2YgRGl2aWRlQWN0aW9uKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2VsbCB3YW50cyB0byBncm93Li4uXCIpXG4gICAgICAgIHZhciBkYWN0aW9uOiBEaXZpZGVBY3Rpb24gPSBhY3Rpb247XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIGRpcmVjdGlvbiBvZiB0aGlzIGFjdGlvblxuXG4gICAgICAgIHZhciBuZWlnaGJvclVwID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvdyAtIDFdW2NlbGwuY29sXTtcbiAgICAgICAgdmFyIG5laWdoYm9yUmlnaHQgPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93XVtjZWxsLmNvbCArIDFdO1xuICAgICAgICB2YXIgbmVpZ2hib3JEb3duID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvdyArIDFdW2NlbGwuY29sXTtcbiAgICAgICAgdmFyIG5laWdoYm9yTGVmdCA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3ddW2NlbGwuY29sIC0gMV07XG4gICAgICAgIHZhciBhbmdsZTogbnVtYmVyID0gZGFjdGlvbi5nZXRBY3Rpb25EaXJlY3Rpb24obmVpZ2hib3JVcCwgbmVpZ2hib3JSaWdodCwgbmVpZ2hib3JEb3duLCBuZWlnaGJvckxlZnQpO1xuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBBbmdsZS5zYW1wbGVEaXJlY3Rpb24oYW5nbGUpO1xuICAgICAgICB2YXIgZHJvdyA9IEFuZ2xlLmRpcmVjdGlvbkRlbHRhUm93KGRpcmVjdGlvbik7XG4gICAgICAgIHZhciBkY29sID0gQW5nbGUuZGlyZWN0aW9uRGVsdGFDb2woZGlyZWN0aW9uKTtcblxuICAgICAgICB2YXIgZ0kgPSB0aGlzLnBsYW50W2ldLnJvdyArIGRyb3c7XG4gICAgICAgIHZhciBnSiA9IHRoaXMucGxhbnRbaV0uY29sICsgZGNvbDtcblxuICAgICAgICB2YXIgY29zdCA9IGNlbGwuZG5hLk5FV19DRUxMX0NPU1Q7XG5cbiAgICAgICAgdmFyIGNhbkFmZm9yZCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29zdC52ZWN0b3IubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZih0aGlzLnBsYW50W2ldLmZsdWlkcy52ZWN0b3Jbal0gPCBjb3N0LnZlY3RvcltqXSkge1xuICAgICAgICAgICAgY2FuQWZmb3JkID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5BZmZvcmQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGdJIDwgMCB8fCBnSSA+PSBBdXRvbWF0YS5HUklEX05fUk9XUyB8fCBnSiA8IDAgfHwgZ0ogPj0gQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbm5vdCBtYWtlIGNlbGwgYXQgXCIgKyBnSiArIFwiLCBcIiArIGdJKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNlbGxBcnJheVtnSV1bZ0pdKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjZWxsIGFscmVhZHkgZXhpc3RzIGF0IFwiICsgZ0ogKyBcIiwgXCIgKyBnSSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuc3VidHJhY3RGbHVpZHMoY2VsbC5mbHVpZHMsIGNvc3QpO1xuICAgICAgICB2YXIgbmV3Rmx1aWRzID0gdGhpcy5zcGxpdEZsdWlkcyhjZWxsLmZsdWlkcyk7XG4gICAgICAgIHZhciBuQ2VsbCA9IG5ldyBDZWxsKHRoaXMuZG5hLCBuZXdGbHVpZHMsIGdJLCBnSiwgdGhpcy5jZWxsQXJyYXkpO1xuICAgICAgICB0aGlzLnBsYW50LnB1c2gobkNlbGwpO1xuICAgICAgICB0aGlzLmZsdWlkc0FycmF5W2dJXVtnSl0gPSBuZXdGbHVpZHM7XG4gICAgICAgIHRoaXMuY2VsbEFycmF5W2dJXVtnSl0gPSBuQ2VsbDtcbiAgICAgIH1cblxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBSZWFjdEFjdGlvbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICAgICAgLy8gbGV0IGRHbHVjb3NlID0gTWF0aC5taW4oY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl0vNCwgMTAwICogbnVtQWlyKTtcbiAgICAgICAgICAvLyBjb252ZXJ0IHdhdGVyIHRvIGdsdWNvc2VcbiAgICAgICAgICB0aGlzLmFkZEZsdWlkcyhjZWxsLmZsdWlkcywgYWN0aW9uLnJlYWN0aW9uKVxuICAgICAgICAgIC8vIGZsdWlkc0RpZmZbY2VsbC5yb3ddW2NlbGwuY29sXVtGbHVpZHMuV0FURVJdIC09IGRHbHVjb3NlO1xuICAgICAgICAgIC8vIGZsdWlkc0RpZmZbY2VsbC5yb3ddW2NlbGwuY29sXVtGbHVpZHMuR0xVQ09TRV0gKz0gUkVBQ1RJT05fRkFDVE9SKmRHbHVjb3NlO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uIGluc3RhbmNlb2YgUHVtcEFjdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZygncHVtcGluZy4uLi4nKTtcbiAgICAgICAgdmFyIHBhY3Rpb246IFB1bXBBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHZhciBuZWlnaGJvclVwID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvdyAtIDFdW2NlbGwuY29sXTtcbiAgICAgICAgdmFyIG5laWdoYm9yUmlnaHQgPSB0aGlzLmZsdWlkc0FycmF5W2NlbGwucm93XVtjZWxsLmNvbCArIDFdO1xuICAgICAgICB2YXIgbmVpZ2hib3JEb3duID0gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvdyArIDFdW2NlbGwuY29sXTtcbiAgICAgICAgdmFyIG5laWdoYm9yTGVmdCA9IHRoaXMuZmx1aWRzQXJyYXlbY2VsbC5yb3ddW2NlbGwuY29sIC0gMV07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdhJyk7XG4gICAgICAgIHZhciBhbmdsZTogbnVtYmVyID0gcGFjdGlvbi5nZXRBY3Rpb25EaXJlY3Rpb24obmVpZ2hib3JVcCwgbmVpZ2hib3JSaWdodCwgbmVpZ2hib3JEb3duLCBuZWlnaGJvckxlZnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYicpO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gQW5nbGUuc2FtcGxlRGlyZWN0aW9uKGFuZ2xlKTtcbiAgICAgICAgdmFyIGRyb3cgPSBBbmdsZS5kaXJlY3Rpb25EZWx0YVJvdyhkaXJlY3Rpb24pO1xuICAgICAgICB2YXIgZGNvbCA9IEFuZ2xlLmRpcmVjdGlvbkRlbHRhQ29sKGRpcmVjdGlvbik7XG4gICAgICAgIHZhciBnSSA9IHRoaXMucGxhbnRbaV0ucm93ICsgZHJvdztcbiAgICAgICAgdmFyIGdKID0gdGhpcy5wbGFudFtpXS5jb2wgKyBkY29sO1xuICAgICAgICBpZihnSSA8IDAgfHwgZ0kgPj0gQXV0b21hdGEuR1JJRF9OX1JPV1MgfHwgZ0ogPCAwIHx8IGdKID49IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TICl7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2MnKTtcbiAgICAgICAgdmFyIHRhcmdldEZsdWlkVmVjID0gdGhpcy5mbHVpZHNBcnJheVtnSV1bZ0pdLnZlY3RvcjtcbiAgICAgICAgdmFyIGZsdWlkVmVjID0gY2VsbC5mbHVpZHMudmVjdG9yO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhY3Rpb24uZmx1aWRzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIC8vIG1vdmUgZCBmbHVpZHMgZnJvbSBmbHVpZFZlYyB0byB0YXJnZXRGbHVpZFZlY1xuICAgICAgICAvLyBpZiBkIGlzIG5lZ2F0aXZlIHRoZW4gdGhpcyBpcyBcInB1bGxpbmdcIiBmbHVpZHNcbiAgICAgICAgdmFyIGQgPSBwYWN0aW9uLmZsdWlkc1tqXTtcbiAgICAgICAgLy8gbGV0IHRoZSBwbGFudCBcImNoZWF0XCI6IG9ubHkgcHVtcCAqZnJvbSogZW52aXJvbm1lbnQsICp0byogb3RoZXIgcGxhbnQgY2VsbHNcbiAgICAgICAgaWYgKHRoaXMuY2VsbEFycmF5W2dJXVtnSl0pIHtcbiAgICAgICAgICBkID0gTWF0aC5hYnMoZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZCA9IC1NYXRoLmFicyhkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvbid0IHB1bXAgdG8gbmVnYXRpdmUgZmx1aWRzXG4gICAgICAgIGlmIChkID4gMCkge1xuICAgICAgICAgIGQgPSBNYXRoLm1pbihkLCBmbHVpZFZlY1tqXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZCA9IE1hdGgubWF4KGQsIC10YXJnZXRGbHVpZFZlY1tqXSk7XG4gICAgICAgIH1cbiAgICAgICAgZmx1aWRWZWNbal0gLT0gZDtcbiAgICAgICAgdGFyZ2V0Rmx1aWRWZWNbal0gKz0gZDtcbiAgICAgICAgfVxuICAgICAgfVxuICB9XG4gIH1cblxuICAvKlxuICBLaWxsIGFsbCBjZWxscyB3aG8gZG9uJ3QgaGF2ZSBlbm91Z2ggcmVzb3VyY2VzIHRvIGxpdmVcbiAgKi9cbiAgY2VsbERlYXRoKCkge1xuICAgIGxldCBNSU5fV0FURVIgPSAwLjEgKiBBdXRvbWF0YS5NQVRFUklBTF9XQVRFUl9XQVRFUl9NRUFOO1xuICAgIGxldCBNSU5fR0xVQ09TRSA9IDAuMDAxO1xuICAgIGxldCB0b0tpbGwgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnQubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBjZWxsID0gdGhpcy5wbGFudFtpXTtcbiAgICAgIGlmICghY2VsbC5mbHVpZHMpIGNvbnRpbnVlO1xuICAgICAgaWYgKGNlbGwuZmx1aWRzLnZlY3RvcltGbHVpZHMuR0xVQ09TRV0gPCBNSU5fR0xVQ09TRSB8fFxuICAgICAgICBjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLldBVEVSXSA8IE1JTl9XQVRFUikge1xuICAvLyBraWxsIGNlbGxcbiAgdG9LaWxsLnB1c2goY2VsbCk7XG4gIH1cbiAgaWYgKGNlbGwuZmx1aWRzLnZlY3RvcltGbHVpZHMuR0xVQ09TRV0gPCBNSU5fR0xVQ09TRSkge1xuICAvLyBjb25zb2xlLmxvZygnY2VsbCBraWxsZWQgZHVlIHRvIGxhY2sgb2YgZ2x1Y29zZScpO1xuICB9XG4gIGlmIChjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLldBVEVSXSA8IE1JTl9XQVRFUikge1xuICAvLyBjb25zb2xlLmxvZygnY2VsbCBraWxsZWQgZHVlIHRvIGxhY2sgb2Ygd2F0ZXInKTtcbiAgfVxuXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRvS2lsbC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjZWxsOiBDZWxsID0gdG9LaWxsW2ldO1xuICAvLyBjb25zb2xlLmxvZygnS2lsbGluZyBjZWxsIGF0OiAnLCBjZWxsLnJvdywgY2VsbC5jb2wpO1xuICB2YXIgaW5kZXggPSB0aGlzLnBsYW50LmluZGV4T2YoY2VsbCk7XG4gIHRoaXMucGxhbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgLy8gdGhpcy5mbHVpZHNBcnJheVtjZWxsLnJvd11bY2VsbC5jb2xdID0gY2VsbC5mbHVpZHM7XG4gIHRoaXMuY2VsbEFycmF5W2NlbGwucm93XVtjZWxsLmNvbF0gPSB1bmRlZmluZWQ7XG4gIH1cbiAgfVxuXG4gIHN1YnRyYWN0Rmx1aWRzKGEsIGIpe1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS52ZWN0b3IubGVuZ3RoOyBpICsrKXtcbiAgICAgIGEudmVjdG9yW2ldIC09IGIudmVjdG9yW2ldO1xuICAgIH1cbiAgfVxuXG4gIGFkZEZsdWlkcyhhLCBiKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEudmVjdG9yLmxlbmd0aDsgaSArKyl7XG4gICAgICBhLnZlY3RvcltpXSArPSBiLnZlY3RvcltpXTtcbiAgICB9XG4gIH1cblxuICBzcGxpdEZsdWlkcyhmbHVpZHMpe1xuICAgIGxldCBuZXdGbHVpZHMgPSBuZXcgRmx1aWRzKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbHVpZHMudmVjdG9yLmxlbmd0aDsgaSArKyl7XG4gICAgICBmbHVpZHMudmVjdG9yW2ldIC89IDI7XG4gICAgICBuZXdGbHVpZHMudmVjdG9yW2ldID0gZmx1aWRzLnZlY3RvcltpXTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0ZsdWlkcztcbiAgfVxuXG4gIHNpZ25hbHNVcGRhdGUoKSB7XG4gICAgLy8gVXBkYXRlIGVhY2ggY2VsbCdzIGluZGl2aWR1YWwgc2lnbmFsIGxldmVsc1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICBjZWxsLnVwZGF0ZVNpZ25hbHMoKTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHNpZ25hbHMgdG8gbmVpZ2hib3JzXG4gICAgbGV0IFNQUkVBRF9DT0VGRiA9IDAuMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjZWxsID0gdGhpcy5wbGFudFtpXTtcbiAgICAgIHZhciBuZWlnaGJzID0gW1stMSwgMF0sIFsxLCAwXSwgWzAsIDFdLCBbMCwgLTFdXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmVpZ2hicy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgbnJvdyA9IGNlbGwuY29sICsgbmVpZ2hic1tqXVswXTtcbiAgICAgICAgdmFyIG5jb2wgPSBjZWxsLnJvdyArIG5laWdoYnNbal1bMV07XG4gICAgICAgIGlmIChuY29sIDwgMCB8fCBucm93IDwgMCB8fCBuY29sID49IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TIHx8IG5yb3cgPj0gQXV0b21hdGEuR1JJRF9OX1JPV1MpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIHZhciBuZWlnaGJGbHVpZHMgPSB0aGlzLmZsdWlkc0FycmF5W25yb3ddW25jb2xdO1xuICAgICAgICBpZiAobmVpZ2hiRmx1aWRzIGluc3RhbmNlb2YgQ2VsbCkge1xuICAgICAgICAgIHZhciBuc2lnbmFscyA9IG5laWdoYkZsdWlkcy52ZWN0b3I7XG4gICAgICAgICAgZm9yICh2YXIgayA9IEZsdWlkcy5TSUdOQUxTX1NUQVJUOyBrIDwgRmx1aWRzLk5fRkxVSURTOyBrKyspIHtcbiAgICAgICAgICAgIGlmIChjZWxsLmZsdWlkc1trXSA8IG5zaWduYWxzW2tdKVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBhbW91bnQgPSBTUFJFQURfQ09FRkYgKiBjZWxsLmZsdWlkcy52ZWN0b3Jba107XG4gICAgICAgICAgICBuc2lnbmFsc1trXSArPSBhbW91bnQ7XG4gICAgICAgICAgICBjZWxsLmZsdWlkcy52ZWN0b3Jba10gLT0gYW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRvQ2VsbE1ldGFib2xpc20oKSB7XG4gICAgLy8gcmVzcGlyYXRpb24uIHRoaXMgaXMgbmVlZGVkIGZvciBtZXRhYm9saXNtXG4gICAgdmFyIFJFU1BJUkFUSU9OX0FNT1VOVCA9IDAuMDE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgY2VsbCA9IHRoaXMucGxhbnRbaV07XG4gICAgICBjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLldBVEVSXSAtPSBSRVNQSVJBVElPTl9BTU9VTlQ7XG4gICAgICBjZWxsLmZsdWlkcy52ZWN0b3JbRmx1aWRzLkdMVUNPU0VdIC09IFJFU1BJUkFUSU9OX0FNT1VOVDtcbiAgICB9XG4gIH1cblxuICBkb1Bhc3NpdmVGbG93QW5kUGhvdG9zeW50aGVzaXMoKSB7XG5cbiAgICAvLyBJbml0aWFsaXplIGZsdWlkc0RpZmYgdG8gMCdzXG4gICAgdmFyIGZsdWlkc0RpZmYgPSBuZXcgQXJyYXkoQXV0b21hdGEuR1JJRF9OX1JPV1MpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3crKykge1xuICAgICAgZmx1aWRzRGlmZltyb3ddID0gbmV3IEFycmF5KEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TKTtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuICAgICAgICBmbHVpZHNEaWZmW3Jvd11bY29sXSA9IG5ldyBBcnJheShGbHVpZHMuTl9GTFVJRFMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEZsdWlkcy5OX0ZMVUlEUzsgKytpKSB7XG4gICAgICAgICAgZmx1aWRzRGlmZltyb3ddW2NvbF1baV0gPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGhvdG9zeW50aGVzaXMuIFRPRE8gdGhpcyB3aWxsIGJlIGFuIGFjdGlvblxuICAgIHZhciBSRUFDVElPTl9GQUNUT1IgPSAxMDsgLy8gZXhwZW5kIDEgd2F0ZXIgdG8gZ2V0IDQgZ2x1Y29zZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNlbGwgPSB0aGlzLnBsYW50W2ldO1xuICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgbGV0IG51bUFpciA9IHRoaXMuY291bnRBaXJOZWlnaGJvcnMoY2VsbC5yb3csIGNlbGwuY29sKTtcbiAgICAgICAgbGV0IGRHbHVjb3NlID0gTWF0aC5taW4oY2VsbC5mbHVpZHMudmVjdG9yW0ZsdWlkcy5XQVRFUl0vNCwgMTAwICogbnVtQWlyKTtcbiAgICAgICAgLy8gY29udmVydCB3YXRlciB0byBnbHVjb3NlXG4gICAgICAgIGZsdWlkc0RpZmZbY2VsbC5yb3ddW2NlbGwuY29sXVtGbHVpZHMuV0FURVJdIC09IGRHbHVjb3NlO1xuICAgICAgICBmbHVpZHNEaWZmW2NlbGwucm93XVtjZWxsLmNvbF1bRmx1aWRzLkdMVUNPU0VdICs9IFJFQUNUSU9OX0ZBQ1RPUipkR2x1Y29zZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQYXNzaXZlIHRyYW5zcG9ydCAvIGRpZmZ1c2lvbi4gR2l2ZSBudXRyaWVudHMgdG8gbmVpZ2hib3JzLlxuICAgIC8vIGNvbnNvbGUubG9nKGZsdWlkc0RpZmYpO1xuICAgIHZhciBuZWlnaGJzID0gW1stMSwgMF0sIFsxLCAwXSwgWzAsIDFdLCBbMCwgLTFdXTtcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBBdXRvbWF0YS5HUklEX05fUk9XUzsgKytyb3cpIHtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyArK2NvbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICB2YXIgbmVpZ2hiUm93ID0gcm93ICsgbmVpZ2hic1tpXVswXTtcbiAgICAgICAgICB2YXIgbmVpZ2hiQ29sID0gY29sICsgbmVpZ2hic1tpXVsxXTtcbiAgICAgICAgICBpZiAoIXRoaXMuaXNQb3NpdGlvbk9uR3JpZChuZWlnaGJSb3csIG5laWdoYkNvbCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBmbG93UmF0ZSA9IDAuMTtcbiAgICAgICAgICAvLyBhaXIgdG8gYWlyIGlzIHZlcnkgZmFzdFxuICAgICAgICAgIGlmICh0aGlzLmlzQWlyTm90Q2VsbChyb3csY29sKSAmJiB0aGlzLmlzQWlyTm90Q2VsbChuZWlnaGJSb3csbmVpZ2hiQ29sKSkge1xuICAgICAgICAgICAgZmxvd1JhdGUgPSAwLjI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZGlzYWJsZSBwYXNzaXZlIGZsb3cgZnJvbSAvIHRvIGNlbGxzXG4gICAgICAgICAgaWYgKHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXSB8fCB0aGlzLmNlbGxBcnJheVtuZWlnaGJSb3ddW25laWdoYkNvbF0pIHtcbiAgICAgICAgICAvLyBmbG93UmF0ZSA9IDAuMDFcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmVpZ2hiRmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtuZWlnaGJSb3ddW25laWdoYkNvbF0udmVjdG9yO1xuICAgICAgICAgIHZhciBmbHVpZHMgPSB0aGlzLmZsdWlkc0FycmF5W3Jvd11bY29sXS52ZWN0b3I7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBGbHVpZHMuTl9GTFVJRFM7ICsraikge1xuICAgICAgICAgICAgaWYgKGZsdWlkc1tqXSA+IG5laWdoYkZsdWlkc1tqXSkge1xuICAgICAgICAgICAgICB2YXIgZGlmZiA9IGZsb3dSYXRlICogKGZsdWlkc1tqXSAtIG5laWdoYkZsdWlkc1tqXSk7XG4gICAgICAgICAgICAgIGZsdWlkc0RpZmZbcm93XVtjb2xdW2pdIC09IGRpZmY7XG4gICAgICAgICAgICAgIGZsdWlkc0RpZmZbbmVpZ2hiUm93XVtuZWlnaGJDb2xdW2pdICs9IGRpZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhpcy52YWxpZGF0ZUZsdWlkc0FycmF5KCk7XG5cbiAgICAvLyBBcHBseSBmbHVpZHNEaWZmIHRvIGZsdWlkc1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTOyByb3cgKyspe1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgQXV0b21hdGEuR1JJRF9OX0NPTFVNTlM7IGNvbCArKyApe1xuICAgICAgICB2YXIgZmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0udmVjdG9yO1xuICAgICAgICB2YXIgZmx1aWREaWZmID0gZmx1aWRzRGlmZltyb3ddW2NvbF07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRmx1aWRzLk5fRkxVSURTOyArK2kpIHtcbiAgICAgICAgICBmbHVpZHNbaV0gKz0gZmx1aWREaWZmW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNQb3NpdGlvbk9uR3JpZChyb3csIGNvbCkge1xuICAgIHJldHVybiByb3cgPj0gMCAmJiBjb2wgPj0gMCAmJlxuICAgIHJvdyA8IEF1dG9tYXRhLkdSSURfTl9ST1dTICYmIGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TO1xuICB9XG5cbiAgaXNBaXJOb3RDZWxsKHJvdywgY29sKSB7XG4gIC8vIGNlbGwgaXMgZGVhZCBhbmQgY2VsbCBpcyBhaXIgY2VsbFxuICBpZiAoIXRoaXMuaXNQb3NpdGlvbk9uR3JpZChyb3csIGNvbCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHJvdyA8IDUwICYmICF0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF07XG4gIH1cblxuICBjb3VudEFpck5laWdoYm9ycyhyb3csIGNvbCl7XG4gICAgdmFyIG4gPSAodGhpcy5pc0Fpck5vdENlbGwocm93IC0gMSwgY29sKT8xOjApICtcbiAgICAodGhpcy5pc0Fpck5vdENlbGwocm93ICsgMSwgY29sKT8xOjApICtcbiAgICAodGhpcy5pc0Fpck5vdENlbGwocm93LCBjb2wgLSAxKT8xOjApICtcbiAgICAodGhpcy5pc0Fpck5vdENlbGwocm93LCBjb2wgKyAxKT8xOjApO1xuICAgIHJldHVybiBuO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUZsdWlkc0FycmF5KCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBpbiBmbHVpZHMsIHNraXBwaW5nIGRyYXcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBDSExPUk9QTEFTVF9DT0xPUiA9IFwiI1wiXG5cbiAgICAvLyBCYWNrZ3JvdW5kIGZpbGwgY29sb3JcbiAgICBsZXQgc2NhbGUgPSBBdXRvbWF0YS5DRUxMX1NDQUxFX1BJWEVMUztcbiAgICB0aGlzLmNhbnZhc0N0eC5saW5lV2lkdGggPSAzO1xuICAgIC8vIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzdFQzBERFwiOyAvLyBza3lcbiAgICAvLyB0aGlzLmNhbnZhc0N0eC5maWxsUmVjdCgwLDAsIEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TICogc2NhbGUsIHNjYWxlICogQXV0b21hdGEuR1JJRF9OX1JPV1MpXG4gICAgLy8gdGhpcy5jYW52YXNDdHguZmlsbFJlY3QoMCwgMCwgMTAwLCAxMDApO1xuXG5cbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBBdXRvbWF0YS5HUklEX05fUk9XUzsgcm93ICsrKXtcbiAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IEF1dG9tYXRhLkdSSURfTl9DT0xVTU5TOyBjb2wgKyspe1xuICAgICAgICB2YXIgZmx1aWRzID0gdGhpcy5mbHVpZHNBcnJheVtyb3ddW2NvbF0udmVjdG9yO1xuICAgICAgICB2YXIgd2F0ZXJDb250ZW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKGZsdWlkc1tGbHVpZHMuV0FURVJdKSkpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyYXdTdHlsZSA9PT0gJ3dhdGVyJykge1xuICAgICAgICAgIHZhciB3YXRlckNvbmNlbnRyYXRpb24gPSBmbHVpZHNbRmx1aWRzLldBVEVSXSAvICgyICogQXV0b21hdGEuTUFURVJJQUxfRElSVF9XQVRFUl9NRUFOKTtcbiAgICAgICAgICB2YXIgd2F0ZXJDb2xvciA9IE1hdGgubWF4KE1hdGgubWluKE1hdGgucm91bmQoMjU1KndhdGVyQ29uY2VudHJhdGlvbiksMjU1KSwwKTtcbiAgICAgICAgICB2YXIgY29sb3JTdHJpbmcgPSBcIiNcIiArIFwiMDA2NFwiICsgaGV4KHdhdGVyQ29sb3IpO1xuICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IGNvbG9yU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5kcmF3U3R5bGUgPT09ICdnbHVjb3NlJyl7XG4gICAgICAgICAgaWYgKHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjXCIgKyBoZXgoTWF0aC5taW4oMjU1LE1hdGguY2VpbChmbHVpZHNbRmx1aWRzLkdMVUNPU0VdKSkpICsgXCIwMDAwXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZHJhd1N0eWxlID09PSAnYXV4aW4nKSB7XG4gICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF07XG4gICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiI1wiICsgXCIwMDAwXCIgKyBoZXgoTWF0aC5taW4oMjU1LE1hdGguY2VpbCgyNTUqZmx1aWRzW0ZsdWlkcy5TSUdOQUxTX1NUQVJUXSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCBkcmF3IHN0eWxlIGlzIHRvIHNob3cgY2hlbWljYWxzXG4gICAgICAgICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxBcnJheVtyb3ddW2NvbF07XG4gICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IGNlbGwudHlwZS5jb2xvcjtcbiAgICAgICAgICAgIGNvbnN0IENPTE9SX1dBVEVSID0gXCIjMGY1ZTljXCI7XG4gICAgICAgICAgICBjb25zdCBDT0xPUl9DSExPUk9QTEFTVCA9IFwiIzI1NTIzYlwiO1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFN0eWxlID0gaW50ZXJwQ29sb3JzKFxuICAgICAgICAgICAgICBbQ09MT1JfV0FURVIsIENPTE9SX0NITE9ST1BMQVNUXSxcbiAgICAgICAgICAgICAgW3dhdGVyQ29udGVudC81MCwgY2VsbC5nZXRDaGxvcm9wbGFzdExldmVscygpLzEwXVxuICAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZihyb3cgPj0gNTApe1xuICAgICAgICAgICAgdmFyIGN2YWwgPSBNYXRoLmNlaWwod2F0ZXJDb250ZW50LzQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cod2F0ZXJDb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmZpbGxTdHlsZSA9IFwiIzMzMTFcIiArIGhleChjdmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSBcIiM3RUMwRERcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFJlY3QoTWF0aC5mbG9vcihzY2FsZSAqIGNvbCksIE1hdGguZmxvb3Ioc2NhbGUgKiByb3cpLCBzY2FsZSwgc2NhbGUpO1xuXG4gICAgICAgIC8vIGRyYXcgZ3JlZW4gb3V0bGluZSBhcm91bmQgdGhlIHBsYW50XG4gICAgICAgIGlmICh0aGlzLmRyYXdTdHlsZSA9PSAnd2F0ZXInIHx8IHRoaXMuZHJhd1N0eWxlID09ICdnbHVjb3NlJyB8fCB0aGlzLmRyYXdTdHlsZSA9PSAnYXV4aW4nKSB7XG4gICAgICAgICAgdGhpcy5jYW52YXNDdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDk5MDBcIjtcbiAgICAgICAgICB2YXIgbmVpZ2hicyA9IFtbLTEsIDBdLCBbMSwgMF0sIFswLCAxXSwgWzAsIC0xXV07XG5cbiAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbEFycmF5W3Jvd11bY29sXTtcbiAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgIHZhciBucm93ID0gcm93ICsgbmVpZ2hic1tpXVswXTtcbiAgICAgICAgICAgICAgdmFyIG5jb2wgPSBjb2wgKyBuZWlnaGJzW2ldWzFdO1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc1Bvc2l0aW9uT25HcmlkKG5yb3csbmNvbCkgJiYgIXRoaXMuY2VsbEFycmF5W25yb3ddW25jb2xdICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGlmIChuZWlnaGJzW2ldWzBdID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oc2NhbGUqY29sICsgMC41LCBzY2FsZSpyb3cgKyAwLjUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubGluZVRvKHNjYWxlKihjb2wrMSkgKyAwLjUsIHNjYWxlKnJvdyArIDAuNSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZWlnaGJzW2ldWzBdID09IDEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4Lm1vdmVUbyhzY2FsZSooY29sKzEpICsgMC41LCBzY2FsZSoocm93KzEpICsgMC41KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmxpbmVUbyhzY2FsZSpjb2wgKyAwLjUsIHNjYWxlKihyb3crMSkgKyAwLjUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmVpZ2hic1tpXVsxXSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubW92ZVRvKHNjYWxlKmNvbCArIDAuNSwgc2NhbGUqKHJvdysxKSArIDAuNSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5saW5lVG8oc2NhbGUqY29sICsgMC41LCBzY2FsZSpyb3cgKyAwLjUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmVpZ2hic1tpXVsxXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oc2NhbGUqKGNvbCsxKSArIDAuNSwgc2NhbGUqcm93ICsgMC41KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmxpbmVUbyhzY2FsZSooY29sKzEpICsgMC41LCBzY2FsZSoocm93KzEpICsgMC41KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9hdXRvbWF0YS50cyIsImltcG9ydCB7Rmx1aWRzfSBmcm9tIFwiLi9mbHVpZHNcIjtcbmltcG9ydCB7SUFjdGlvbn0gZnJvbSBcIi4vYWN0aW9uXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKlxuQSBDZWxsIGlzIGEgc3RhdGVmdWwgZGVjaXNpb24tbWFrZXIuIENlbGxzIGFyZSB0aGUgbGl2aW5nIHVuaXRzIG9mIHRoZSBncmlkLlxuQ2VsbCBpcyBhIGZsZWlnaHdlaWdodCBvYmplY3QgZm9yIHRoZSBHcmlkLiBTeXN0ZW1zLlxuUGx1cyB0aGV5IGFsc28gaGF2ZSBjb250ZXh0IGZvciBmaXR0aW5nIGludG8gdGhlIEdyaWQuXG5JdCBjYW4gYWxzbyBiZSB0aG91Z2h0IG9mIGFzIGEgRE5BIGNvbnRyb2xsZXIuXG4qL1xuXG5leHBvcnQgY2xhc3MgQ2VsbCB7XG5cbiAgICAvLyBncmlkOiBBcnJheTxBcnJheTxPYmplY3Q+PjtcblxuICAgIGZsdWlkczogRmx1aWRzO1xuICAgIHJvdztcbiAgICBjb2w7XG4gICAgZG5hO1xuICAgIGFuZ2xlO1xuICAgIHNpZ25hbHM7XG4gICAgY2VsbEFycmF5OiBBcnJheTxBcnJheTxDZWxsPj47IC8vIGNlbGxBcnJheVtyb3ddW2NvbF0gaXMgZWl0aGVyIG51bGwgb3IgYSBDZWxsIG9iamVjdFxuXG4gICAgY29uc3RydWN0b3IoZG5hLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpIHtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuY29sID0gY29sO1xuICAgICAgICB0aGlzLmZsdWlkcyA9IGZsdWlkcztcbiAgICAgICAgdGhpcy5kbmEgPSBkbmE7XG4gICAgICAgIHRoaXMuY2VsbEFycmF5ID0gY2VsbEFycmF5O1xuICAgIH1cblxuICAgIGdldENobG9yb3BsYXN0TGV2ZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mbHVpZHMudmVjdG9yW0ZsdWlkcy5DSExPUk9QTEFTVFNdO1xuICAgIH1cblxuICAgIHN1bUZsdWlkcygpOiBudW1iZXIge1xuICAgICAgICAvLyBPbmx5IHN1bSBcImFjdHVhbFwiIGZsdWlkcywgbm90IGhvcm1vbmVzLlxuICAgICAgICB2YXIgZ2x1Y29zZVdlaWdodCA9IDEuNTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmx1aWRzLnZlY3RvcltGbHVpZHMuV0FURVJdICsgZ2x1Y29zZVdlaWdodCAqIHRoaXMuZmx1aWRzLnZlY3RvcltGbHVpZHMuR0xVQ09TRV07XG4gICAgfVxuXG4gICAgdXBkYXRlU2lnbmFscygpIHtcbiAgICAgICAgLy8gbXVsdGlwbHkgYnkgbWF0cml4XG4gICAgICAgIC8vIHZhciBuZXdTaWduYWxzID0gbmV3IEFycmF5KEZsdWlkcy5OX1NJR05BTFMpO1xuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IG5ld1NpZ25hbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy8gICAgIG5ld1NpZ25hbHNbaV0gPSAwO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gdmFyIG10eCA9IHRoaXMudHlwZS5zaWduYWxNYXRyaXg7XG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3U2lnbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBGbHVpZHMuTl9TSUdOQUxTOyBqKyspIHsgLy8gZmlyc3QgU0lHTkFMUyBjb2x1bW5zIG9mIG1hdHJpeC4uLlxuICAgICAgICAvLyAgICAgICAgIG5ld1NpZ25hbHNbaV0gKz0gdGhpcy5mbHVpZHMudmVjdG9yW2orRmx1aWRzLlNJR05BTFNfU1RBUlRdICogbXR4W2ldW2pdO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgZm9yIChqID0gMDsgaiA8IHRoaXMuZmx1aWRzLnZlY3Rvci5sZW5ndGg7ICsraikge1xuICAgICAgICAvLyAgICAgICAgIG5ld1NpZ25hbHNbaV0gKz0gdGhpcy5mbHVpZHMudmVjdG9yW2pdICogbXR4W2ldW2ordGhpcy5zaWduYWxzLnZlY3Rvci5sZW5ndGhdO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gdmFyIHZlYyA9IHRoaXMuZG5hLmNlbGxUeXBlc1t0aGlzLnR5cGVdLnNpZ25hbEI7XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdzaWduYWxzJywgbmV3U2lnbmFscywgJ210eCcsIG10eCwgJ3ZlYycsIHZlYyk7XG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgdmVjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICBuZXdTaWduYWxzW2ldICs9IHZlY1tpXTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3U2lnbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgdGhpcy5zaWduYWxzLnZlY3RvcltpXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIG5ld1NpZ25hbHNbaV0pKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGdldEFjdGlvblBvdGVudGlhbChhY3Rpb246IElBY3Rpb24pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjaG9vc2VBY3Rpb24oKTpJQWN0aW9uIHtcbiAgICAgICAgLy8gdmFyIHNpZ25hbHMgPSB0aGlzLnNpZ25hbHMsXG4gICAgICAgIC8vICAgICBjZWxsVHlwZSA9IHRoaXMudHlwZTtcblxuICAgICAgICAvLyB2YXIgcGVyY2VwdHJvbiA9IHRoaXMudHlwZS5cblxuICAgICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggYWN0aW9ucyBoYXZlIGhpZ2ggcG90ZW50aWFsIHZhbHVlc1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuZG5hLmFjdGlvbnM7XG4gICAgICAgIHZhciBwb3RlbnRpYWxzID0gbmV3IEFycmF5KGFjdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5mbHVpZHMudmVjdG9yLmNvbmNhdChbXG4gICAgICAgICAgICAhIXRoaXMuY2VsbEFycmF5W3RoaXMucm93LTFdW3RoaXMuY29sXSxcbiAgICAgICAgICAgICEhdGhpcy5jZWxsQXJyYXlbdGhpcy5yb3crMV1bdGhpcy5jb2xdLFxuICAgICAgICAgICAgISF0aGlzLmNlbGxBcnJheVt0aGlzLnJvd11bdGhpcy5jb2wtMV0sXG4gICAgICAgICAgICAhIXRoaXMuY2VsbEFycmF5W3RoaXMucm93XVt0aGlzLmNvbCsxXVxuICAgICAgICBdKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBwb3RlbnRpYWxzW2ldID0gdGhpcy5kbmEuYWN0aW9uUGVyY2VwdHJvbnNbaV0uYWN0aXZhdGUoaW5wdXQpWzBdOyAvLyB0aGlzLmdldEFjdGlvblBvdGVudGlhbChhY3Rpb25zW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiZXN0SW5kZXg6IG51bWJlciA9IFV0aWxzLmFyZ21heChwb3RlbnRpYWxzKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hvb3NpbmcgYWN0aW9uLCAnLCBhY3Rpb25zW2Jlc3RJbmRleF0pO1xuICAgICAgICBpZiAocG90ZW50aWFsc1tiZXN0SW5kZXhdIDwgMC41KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gXCJlbXB0eVwiIGFjdGlvblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zW2Jlc3RJbmRleF07XG5cblxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGl2YXRvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy8gICAgIGFjdGl2YXRvcnNbaV0gPSB0aGlzLmFjdGl2YXRvckZ1bmN0aW9uKHRoaXMuZGlzdGFuY2VUb0FjdGl2YXRvcihzaWduYWxzLCBhY3Rpb25zW2ldLmFjdGl2YXRvcikpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKCdhY3RpdmF0b3JzJywgYWN0aXZhdG9ycywgJ2FjdGlvbnMnLCBhY3Rpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMud2VpZ2h0ZWRDaG9vc2UoYWN0aW9ucywgYWN0aXZhdG9ycyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NlbGwudHMiLCJpbXBvcnQge0FuZ2xlfSBmcm9tIFwiLi9hbmdsZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uIHtcbiAgICAvKlxuICAgIE1vZGlmeSB0aGUgcGFyYW1ldGVycyBvZiB0aGUgYWN0aW9uIGJ5IGEgZ2l2ZW4gYW1vdW50XG4gICAgKi9cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIpO1xufVxuXG5leHBvcnQgY2xhc3MgQWN0aW9uU2VyaWFsaXplciB7XG4gICAgc3RhdGljIHNlcmlhbGl6ZShhY3Rpb246IElBY3Rpb24pOiBzdHJpbmcge1xuICAgICAgICB2YXIgY2xzO1xuICAgICAgICBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IERpdmlkZUFjdGlvbikge1xuICAgICAgICAgICAgY2xzID0gXCJEaXZpZGVBY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24uY29uc3RydWN0b3IgPT0gUHVtcEFjdGlvbikge1xuICAgICAgICAgICAgY2xzID0gXCJQdW1wQWN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmNvbnN0cnVjdG9yID09IFJlYWN0QWN0aW9uKSB7XG4gICAgICAgICAgICBjbHMgPSBcIlJlYWN0QWN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGlkIG5vdCByZWNvZ25pemUgdGhlIHNwZWNpZmllZCBhY3Rpb24gdHlwZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICBjbGFzczogY2xzXG4gICAgICAgIH07XG4gICAgICAgIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBEaXJlY3Rpb25hbEFjdGlvbikge1xuICAgICAgICAgICAgb2JqWydmbHVpZEdyYWRpZW50J10gPSBhY3Rpb24uZmx1aWRHcmFkaWVudDtcbiAgICAgICAgICAgIG9ialsnZ3Jhdml0eUdyYWRpZW50J10gPSBhY3Rpb24uZ3Jhdml0eUdyYWRpZW50O1xuICAgICAgICAgICAgb2JqWydzdW5HcmFkaWVudCddID0gYWN0aW9uLnN1bkdyYWRpZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIFJlYWN0QWN0aW9uKSB7XG4gICAgICAgICAgICBvYmpbJ3JlYWN0aW9uJ10gPSBhY3Rpb24ucmVhY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uIGluc3RhbmNlb2YgUHVtcEFjdGlvbikge1xuICAgICAgICAgICAgb2JqWydmbHVpZHMnXSA9IGFjdGlvbi5mbHVpZHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iailcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVzZXJpYWxpemUoanNvbkFjdGlvbik6IElBY3Rpb24ge1xuICAgICAgICB2YXIgb2JqID0ganNvbkFjdGlvbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IEpTT04ucGFyc2UoanNvbkFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsdXJlIHRvIHBhcnNlIGFjdGlvbjogJywganNvbkFjdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAob2JqLmNsYXNzKSB7XG4gICAgICAgICAgICBjYXNlIFwiRGl2aWRlQWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEaXZpZGVBY3Rpb24ob2JqKTtcbiAgICAgICAgICAgIGNhc2UgXCJQdW1wQWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQdW1wQWN0aW9uKG9iaik7XG4gICAgICAgICAgICBjYXNlIFwiUmVhY3RBY3Rpb25cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlYWN0QWN0aW9uKG9iaik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iaiwgdHlwZW9mIG9iaik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkJhZCBqc29uQWN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGlyZWN0aW9uYWxBY3Rpb24gaW1wbGVtZW50cyBJQWN0aW9uIHtcbiAgICBmbHVpZEdyYWRpZW50OiBBcnJheTxudW1iZXI+OyAvLyBtb3JwaG9nZW4gZ3JhZGllbnRcbiAgICBncmF2aXR5R3JhZGllbnQ6IG51bWJlcjsgLy8gZ3Jhdml0cm9waXNtXG4gICAgc3VuR3JhZGllbnQ6IG51bWJlcjsgLy9cblxuICAgIGNvbnN0cnVjdG9yKGFyZ3Mpe1xuICAgICAgICB0aGlzLmZsdWlkR3JhZGllbnQgPSBhcmdzWydmbHVpZEdyYWRpZW50J107XG4gICAgICAgIHRoaXMuZ3Jhdml0eUdyYWRpZW50ID0gYXJnc1snZ3Jhdml0eUdyYWRpZW50J107XG4gICAgICAgIHRoaXMuc3VuR3JhZGllbnQgPSBhcmdzWydzdW5HcmFkaWVudCddO1xuICAgIH1cblxuICAgIGdldEFjdGlvbkRpcmVjdGlvbih1cEZsdWlkcywgcmlnaHRGbHVpZHMsIGRvd25GbHVpZHMsIGxlZnRGbHVpZHMpOiBudW1iZXIge1xuICAgICAgICB2YXIgdXBDb250cmlidXRpb24gPSBVdGlscy5jcm9zc1Byb2R1Y3QodXBGbHVpZHMsIHRoaXMuZmx1aWRHcmFkaWVudCk7XG4gICAgICAgIHZhciByaWdodENvbnRyaWJ1dGlvbiA9IFV0aWxzLmNyb3NzUHJvZHVjdChyaWdodEZsdWlkcywgdGhpcy5mbHVpZEdyYWRpZW50KTtcbiAgICAgICAgdmFyIGRvd25Db250cmlidXRpb24gPSBVdGlscy5jcm9zc1Byb2R1Y3QoZG93bkZsdWlkcywgdGhpcy5mbHVpZEdyYWRpZW50KTtcbiAgICAgICAgdmFyIGxlZnRDb250cmlidXRpb24gPSBVdGlscy5jcm9zc1Byb2R1Y3QobGVmdEZsdWlkcywgdGhpcy5mbHVpZEdyYWRpZW50KTtcblxuICAgICAgICBpZiAodGhpcy5ncmF2aXR5R3JhZGllbnQpIHtcbiAgICAgICAgICAgIGRvd25Db250cmlidXRpb24gKz0gdGhpcy5ncmF2aXR5R3JhZGllbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gTWF0aC5hdGFuMih1cENvbnRyaWJ1dGlvbiAtIGRvd25Db250cmlidXRpb24sIHJpZ2h0Q29udHJpYnV0aW9uIC0gbGVmdENvbnRyaWJ1dGlvbik7XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICAvKlxuICAgIENhbGN1bGF0ZSB0aGUgYW5nbGUgdGhhdCB0aGlzIGFjdGlvbiBwb2ludHMgdG9cbiAgICAqL1xuICAgIGdldEdyYWRpZW50VG9GbHVpZHMoKSB7XG5cbiAgICB9XG5cbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5mbHVpZEdyYWRpZW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgciA9IFV0aWxzLmdldEJvdW5kZWRSYW5kb20oYW1vdW50KTtcbiAgICAgICAgICAgIHRoaXMuZmx1aWRHcmFkaWVudFtpXSArPSByO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ncmF2aXR5R3JhZGllbnQgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB0aGlzLmdyYXZpdHlHcmFkaWVudCArPSBVdGlscy5nZXRCb3VuZGVkUmFuZG9tKGFtb3VudCk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zdW5HcmFkaWVudCAhPSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRoaXMuc3VuR3JhZGllbnQgKz0gVXRpbHMuZ2V0Qm91bmRlZFJhbmRvbShhbW91bnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERpdmlkZUFjdGlvbiBleHRlbmRzIERpcmVjdGlvbmFsQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKXtcbiAgICAgICAgc3VwZXIoYXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHVtcEFjdGlvbiBleHRlbmRzIERpcmVjdGlvbmFsQWN0aW9uIHtcbiAgICBmbHVpZHM6IEFycmF5PG51bWJlcj47XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzKXtcbiAgICAgICAgc3VwZXIoYXJncyk7XG4gICAgICAgIHRoaXMuZmx1aWRzID0gYXJnc1snZmx1aWRzJ10gfHwgW107XG4gICAgfVxuXG4gICAgbXV0YXRlKGFtb3VudDogbnVtYmVyID0gMSkge1xuICAgICAgICBzdXBlci5tdXRhdGUoYW1vdW50KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZsdWlkcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIHIgPSBVdGlscy5nZXRCb3VuZGVkUmFuZG9tKGFtb3VudCk7XG4gICAgICAgICAgICB0aGlzLmZsdWlkc1tpXSArPSByO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVhY3RBY3Rpb24gaW1wbGVtZW50cyBJQWN0aW9uIHtcbiAgICByZWFjdGlvbjogQXJyYXk8bnVtYmVyPjsgLy8gZmx1aWQgdmVjXG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzKXtcbiAgICAgICAgdGhpcy5yZWFjdGlvbiA9IGFyZ3NbJ3JlYWN0aW9uJ107XG4gICAgfVxuXG4gICAgLy8gbXV0YXRpbmcgYSByZWFjdCBhY3Rpb24gc2hvdWxkIG5vdCBjaGFuZ2UgdGhlIHJlYWdlbnRzIC8gcHJvZHVjdHNcbiAgICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FjdGlvbi50cyIsIi8qXG5SYWRpYW4tYmFzZWQgYW5nbGVzLlxuKi9cbmV4cG9ydCBjbGFzcyBBbmdsZSB7XG4gICAgc3RhdGljIFJJR0hUOiBudW1iZXIgPSAwO1xuICAgIHN0YXRpYyBVUDogbnVtYmVyID0gTWF0aC5QSSAvIDI7XG4gICAgc3RhdGljIExFRlQ6IG51bWJlciA9IE1hdGguUEk7XG4gICAgc3RhdGljIERPV046IG51bWJlciA9IDMqTWF0aC5QSSAvIDI7XG5cbiAgICBzdGF0aWMgZGlyZWN0aW9uRGVsdGFSb3coZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSBEaXJlY3Rpb24udXApIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRGlyZWN0aW9uLmRvd24pIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBzdGF0aWMgZGlyZWN0aW9uRGVsdGFDb2woZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSBEaXJlY3Rpb24ubGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBEaXJlY3Rpb24ucmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8qXG4gICAgUmV0dXJuIGEgcmFuZG9tIERpcmVjdGlvbiBlbnVtIGJhc2VkIG9uIHRoZSBhbmdsZS5cbiAgICBzYW1wbGVEaXJlY3Rpb24oMCkgcmV0dXJucyBEaXJlY3Rpb24uUklHSFQuXG4gICAgc2FtcGxlRGlyZWN0aW9uKE1hdGguUEkvNCkgaXMgYSA1MC01MCBjaGFuY2UgVVAgb3IgUklHSFQuXG4gICAgKi9cbiAgICBzdGF0aWMgc2FtcGxlRGlyZWN0aW9uKGFuZ2xlOm51bWJlcikge1xuICAgICAgICBhbmdsZSA9IEFuZ2xlLmNhbm9uaWNhbChhbmdsZSk7XG4gICAgICAgIGlmIChhbmdsZSA9PSBBbmdsZS5SSUdIVCkgcmV0dXJuIERpcmVjdGlvbi5yaWdodDtcbiAgICAgICAgaWYgKGFuZ2xlID09IEFuZ2xlLlVQKSByZXR1cm4gRGlyZWN0aW9uLnVwO1xuICAgICAgICBpZiAoYW5nbGUgPT0gQW5nbGUuTEVGVCkgcmV0dXJuIERpcmVjdGlvbi5sZWZ0O1xuICAgICAgICBpZiAoYW5nbGUgPT0gQW5nbGUuRE9XTikgcmV0dXJuIERpcmVjdGlvbi5kb3duO1xuXG4gICAgICAgIC8vIGQxLCBkMiBzcGVjaWZ5IHRoZSBxdWFkcmFudFxuICAgICAgICB2YXIgZDEsIGQyO1xuICAgICAgICBpZiAoYW5nbGU+QW5nbGUuUklHSFQgJiYgYW5nbGU8QW5nbGUuVVApIHtcbiAgICAgICAgICAgIGQxID0gRGlyZWN0aW9uLnJpZ2h0O1xuICAgICAgICAgICAgZDIgPSBEaXJlY3Rpb24udXA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYW5nbGU+QW5nbGUuVVAgJiYgYW5nbGU8QW5nbGUuTEVGVCkge1xuICAgICAgICAgICAgZDEgPSBEaXJlY3Rpb24udXA7XG4gICAgICAgICAgICBkMiA9IERpcmVjdGlvbi5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlPkFuZ2xlLkxFRlQgJiYgYW5nbGU8QW5nbGUuRE9XTikge1xuICAgICAgICAgICAgZDEgPSBEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgICAgIGQyID0gRGlyZWN0aW9uLmRvd247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkMSA9IERpcmVjdGlvbi5kb3duO1xuICAgICAgICAgICAgZDIgPSBEaXJlY3Rpb24ucmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXRlcm1pbmUgaG93IG11Y2ggdGhlIGFuZ2xlIGlzIHBvaW50aW5nIHRvd2FyZCBkMVxuICAgICAgICBhbmdsZSA9IGFuZ2xlICUgKE1hdGguUEkgLyAyKTtcbiAgICAgICAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgICAgIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCBjb3MvKHNpbitjb3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gZDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZDI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBSZXR1cm5zIGFuZ2xlIGJldHdlZW4gMCBhbmQgMiBQSSAqL1xuICAgIHN0YXRpYyBjYW5vbmljYWwoYW5nbGU6bnVtYmVyKSB7XG4gICAgICAgIGFuZ2xlID0gYW5nbGUgJSAoMiAqIE1hdGguUEkpO1xuICAgICAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5nbGUgKyAyKk1hdGguUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgIH1cblxuICAgIC8qXG4gICAgQ29tcHV0ZXMgYW5nbGUgb2YgdGhlIGdpdmVuICh4LHkpIHZlY3RvclxuICAgICovXG4gICAgc3RhdGljIHZlY3RvckFuZ2xlKHg6bnVtYmVyLCB5Om51bWJlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KTtcbiAgICB9XG5cbiAgICAvLyBzdGF0aWMgZ3JhZGllbnQoKVxufVxuXG4vKlxuQ2FyZGluYWwgZGlyZWN0aW9uIGVudW1zXG4qL1xuXG5lbnVtIERpcmVjdGlvbiB7XG4gICAgcmlnaHQsXG4gICAgdXAsXG4gICAgbGVmdCxcbiAgICBkb3duXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYW5nbGUudHMiLCJpbXBvcnQge0NlbGx9IGZyb20gXCIuL2NlbGxcIjtcbmltcG9ydCB7Rmx1aWRzfSBmcm9tIFwiLi9mbHVpZHNcIjtcbmltcG9ydCB7R3JpZH0gZnJvbSBcIi4vZ3JpZFwiO1xuaW1wb3J0IHtBdXRvbWF0YX0gZnJvbSBcIi4vYXV0b21hdGFcIjtcbmltcG9ydCB7SUFjdGlvbiwgRGl2aWRlQWN0aW9uLCBQdW1wQWN0aW9uLCBSZWFjdEFjdGlvbiwgQWN0aW9uU2VyaWFsaXplcn0gZnJvbSBcIi4vYWN0aW9uXCI7XG5pbXBvcnQge1BlcmNlcHRyb259IGZyb20gXCIuL3BlcmNlcHRyb25cIjtcblxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgRE5BIG9iamVjdCB0byBzZWFyY2ggb3Zlci5cbiAqIFBsYW50cnBnIGlzIHNlYXJjaGluZyBmb3IgdGhlIG1heGltdW0gb2YgZml0bmVzcyBvdmVyIHRoZSBzZXQgb2YgYWxsIHBvc3NpYmxlIEROQS5cbiAqXG4qL1xuZXhwb3J0IGNsYXNzIEROQSB7XG4gIHN0YXRpYyBOX0NFTExfVFlQRVM6IG51bWJlciA9IDU7XG4gIHN0YXRpYyBDT0xPUl9IRVhfQVJSQVkgPSBbXCIjZWRlZGJlXCIsIFwiIzhGOEY2RVwiLCBcIiM2RTZFOEZcIiwgXCIjOEY2RTdGXCIsIFwiIzgwQzRBMVwiXTtcblxuICBzdGF0aWMgTkVXX0NFTExfQ09TVCA9IG5ldyBGbHVpZHMoMC4yLCAwLjIpO1xuXG4gIGFjdGlvbnM6IEFycmF5PElBY3Rpb24+O1xuICBhY3Rpb25QZXJjZXB0cm9ucztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB3aW5kb3dbJ2RuYSddID0gdGhpcztcblxuICAgIHRoaXMuYWN0aW9ucyA9IFtcbiAgICAgIC8vIG5ldyBEaXZpZGVBY3Rpb24oeyBmbHVpZEdyYWRpZW50OiBbMCwwLC0xLDAsMCwwXSwgZ3Jhdml0eUdyYWRpZW50OiAyIH0pLFxuICAgICAgLy8gbmV3IERpdmlkZUFjdGlvbih7IGZsdWlkR3JhZGllbnQ6IFswLDAsMCwwLDAsMF0sIGdyYXZpdHlHcmFkaWVudDogMiB9KSxcbiAgICAgIG5ldyBQdW1wQWN0aW9uKHsgZmx1aWRHcmFkaWVudDogWzAsMCwwLDAsMCwwXSwgZmx1aWRzOiBbMSwwLDAsMCwwLDBdIH0pLFxuICAgICAgbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IG5ldyBGbHVpZHMoLTIsLTIsIDEpIH0pLCAvL21ha2UgY2hsb3JvcGxhc3RzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWy0wLjIsMC44LDAuMSwwLDAsMF0gfSksIC8vcGhvdG9zeW50aFxuICAgICAgLy8gbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IFswLDAsMC4xLDAsMCwwXSB9KSwgLy8gZnJlZSBhdXhpblxuICAgICAgLy8gbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IFswLDAsMCwwLjEsMCwwXSB9KSwgLy8gZnJlZSBtaXNjIGhvcm1vbmVzXG4gICAgICAvLyBuZXcgUmVhY3RBY3Rpb24oeyByZWFjdGlvbjogWzAsMCwwLDAsMC4xLDBdIH0pLCAvLyBmcmVlIG1pc2MgaG9ybW9uZXNcbiAgICAgIC8vIG5ldyBSZWFjdEFjdGlvbih7IHJlYWN0aW9uOiBbMCwwLDAsMCwwLDAuMV0gfSksIC8vIGZyZWUgbWlzYyBob3Jtb25lc1xuICAgICAgLy8gbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IFswLDAsMCwtMC4xLDAsMF0gfSksIC8vIGZyZWUgbWlzYyBob3Jtb25lc1xuICAgICAgLy8gbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IFswLDAsMCwwLC0wLjEsMF0gfSksIC8vIGZyZWUgbWlzYyBob3Jtb25lc1xuICAgICAgLy8gbmV3IFJlYWN0QWN0aW9uKHsgcmVhY3Rpb246IFswLDAsMCwwLDAsLTAuMV0gfSksIC8vIGZyZWUgbWlzYyBob3Jtb25lc1xuICAgIF07XG5cbiAgICAvLyBjZWxsIHR5cGVzXG4gICAgdmFyIGFjdGlvblBlcmNlcHRyb25zID0gW107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmFjdGlvbnMubGVuZ3RoOyArK2opIHtcbiAgICAgIGFjdGlvblBlcmNlcHRyb25zW2pdID0gbmV3IFBlcmNlcHRyb24oRmx1aWRzLk5fRkxVSURTICsgNCwgOCwgMSk7XG4gICAgfVxuICAgIHRoaXMuYWN0aW9uUGVyY2VwdHJvbnMgPSBhY3Rpb25QZXJjZXB0cm9ucztcbiAgfVxuXG4gIGNsb25lKCk6IEROQSB7XG4gICAgdmFyIHNlcmlhbCA9IEROQVNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMpO1xuICAgIHJldHVybiBETkFTZXJpYWxpemVyLmRlc2VyaWFsaXplKHNlcmlhbCk7XG4gIH1cblxuICBtdXRhdGUoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgLy8gbXV0YXRlIGFjdGlvbnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uc1tpXTtcbiAgICAgIGFjdGlvbi5tdXRhdGUoYW1vdW50KTtcbiAgICB9XG5cbiAgICAvLyBtdXRhdGUgdHlwZSBjb250cm9sbGVyc1xuICAgIGZvciAodmFyIHAgb2YgdGhpcy5hY3Rpb25QZXJjZXB0cm9ucykge1xuICAgICAgcC5wZXJ0dXJiKGFtb3VudCk7XG4gICAgfVxuICB9XG5cbiAgcGxhbnRTZWVkKGNlbGxBcnJheTogQXJyYXk8QXJyYXk8Q2VsbD4+LCBmbHVpZHNBcnJheTogQXJyYXk8QXJyYXk8Rmx1aWRzPj4pIHtcbiAgICAvLyBjb21wdXRlIGluaXRpYWwgZmx1aWQgdmVjdG9yc1xuICAgIHZhciB3YXRlckluaXRpYWwgPSAyMDsgLy8gMS43NSAqIEF1dG9tYXRhLk1BVEVSSUFMX1dBVEVSX1dBVEVSX01FQU47XG4gICAgdmFyIGdsdWNvc2VJbml0aWFsID0gMjA7IC8vIDQuMDtcbiAgICB2YXIgZmx1aWRzMSA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCksXG4gICAgICAgIGZsdWlkczIgPSBuZXcgRmx1aWRzKHdhdGVySW5pdGlhbCwgZ2x1Y29zZUluaXRpYWwpLFxuICAgICAgICBmbHVpZHM6IEZsdWlkcztcblxuICAgIC8vIHJlZmVyZW5jZSBjb29yZGluYXRlc1xuICAgIHZhciByb3dDZW50ZXJPZkdyaWQgPSBNYXRoLmZsb29yKEF1dG9tYXRhLkdSSURfTl9ST1dTIC8gMiksXG4gICAgICAgIGNvbENlbnRlck9mR3JpZCA9IE1hdGguZmxvb3IoQXV0b21hdGEuR1JJRF9OX0NPTFVNTlMgLyAyKSxcblxuICAgIC8vIHBsYW50IHRvIGNyZWF0ZVxuICAgICAgICBwbGFudDogQXJyYXk8Q2VsbD4gPSBbXSxcbiAgICAgICAgY2VsbDogQ2VsbCxcblxuICAgIC8vIGl0ZXJhdGUuXG4gICAgICAgIHJvd1N0YXJ0OiBudW1iZXIgPSByb3dDZW50ZXJPZkdyaWQgKyAyLFxuICAgICAgICByb3dFbmQ6IG51bWJlciA9IHJvd0NlbnRlck9mR3JpZCArIDEwLFxuICAgICAgICByb3dNaWQ6IG51bWJlciA9IE1hdGguZmxvb3IoKHJvd1N0YXJ0ICsgcm93RW5kKSAvIDIpLFxuICAgICAgICBjb2xTdGFydDogbnVtYmVyID0gY29sQ2VudGVyT2ZHcmlkIC0gMixcbiAgICAgICAgY29sRW5kOiBudW1iZXIgPSBjb2xDZW50ZXJPZkdyaWQgKyAyLFxuICAgICAgICBjb2xNaWQ6IG51bWJlciA9IE1hdGguZmxvb3IoKGNvbFN0YXJ0ICsgY29sRW5kKSAvIDIpO1xuICAgIGZvciAodmFyIHJvdyA9IHJvd1N0YXJ0OyByb3cgPCByb3dNaWQ7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSBjb2xTdGFydDsgY29sIDwgY29sRW5kOyArK2NvbCkge1xuICAgICAgICBpZiAoY29sID09IGNvbE1pZCkgY29udGludWU7XG4gICAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICAgIGNlbGwgPSBuZXcgQ2VsbCh0aGlzLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpO1xuICAgICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcm93ID0gcm93TWlkOyByb3cgPCByb3dFbmQ7ICsrcm93KSB7XG4gICAgICBmb3IgKHZhciBjb2wgPSBjb2xTdGFydDsgY29sIDwgY29sRW5kOyArK2NvbCkge1xuICAgICAgICBpZiAoY29sID09IGNvbE1pZCkgY29udGludWU7XG4gICAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICAgIGNlbGwgPSBuZXcgQ2VsbCh0aGlzLCBmbHVpZHMsIHJvdywgY29sLCBjZWxsQXJyYXkpOyAvLyBkaWZmZXJlbnQgdHlwZSBpcyBvbmx5IGNoYW5nZVxuICAgICAgICBmbHVpZHNBcnJheVtyb3ddW2NvbF0gPSBmbHVpZHM7XG4gICAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgICBwbGFudC5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGNlbnRlciBjb2x1bW5cbiAgICAvLyBtZXJpc3RlbXNcbiAgICBmb3IgKHZhciByb3cgPSByb3dTdGFydDsgcm93IDwgcm93TWlkOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgZmx1aWRzLCByb3csIGNvbCwgY2VsbEFycmF5KTtcbiAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgcGxhbnQucHVzaChjZWxsKVxuICAgIH1cblxuICAgIGZvciAodmFyIHJvdyA9IHJvd01pZDsgcm93IDwgcm93RW5kOyArK3Jvdykge1xuICAgICAgdmFyIGNvbCA9IGNvbE1pZDtcbiAgICAgIGZsdWlkcyA9IG5ldyBGbHVpZHMod2F0ZXJJbml0aWFsLCBnbHVjb3NlSW5pdGlhbCk7XG4gICAgICBjZWxsID0gbmV3IENlbGwodGhpcywgZmx1aWRzLCByb3csIGNvbCwgY2VsbEFycmF5KTtcbiAgICAgIGZsdWlkc0FycmF5W3Jvd11bY29sXSA9IGZsdWlkcztcbiAgICAgIGNlbGxBcnJheVtyb3ddW2NvbF0gPSBjZWxsO1xuICAgICAgcGxhbnQucHVzaChjZWxsKVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHBsYW50O1xuICB9XG5cblxuXG4gIC8qXG5JbiBuYXR1cmUsIHRoZSBnZW5lIGNvbnRyb2xzIHRoZSB0cmFuc2NyaXB0aW9uIHByb2R1Y3QsIGFuZCAuXG5cblxuSW5wdXRzIG9mIGEgY2VsbDpcbi0gRmx1aWRzXG4tIEZsdWlkcyBncmFkaWVudC4uLlxuXG5BY3Rpb25zIG9mIGEgY2VsbDpcblxuRE5BIGlzIGEgbGlzdCBvZiBwb3RlbnRpYWwgYWN0aW9uczpcbi0gUmVwcm9kdWNlIChkaXJlY3Rpb25hbCksIGRpcmVjdGlvbiBzcGVjaWZpZWQgYXMgdmVjdG9yIG11bHRpcGxpZXIgb2YgZmx1aWRzXG4tIFB1bXAgZmx1aWRzIChkaXJlY3Rpb25hbCksIGRpcmVjdGlvbiBzcGVjaWZpZWQgYXMgdmVjdG9yIG11bHRpcGxpZXIgb2YgZmx1aWRzXG4tIFJlYWN0aW9uc1xuLSBTcGVjaWFsaXplXG5cbkNlbGxUeXBlIGlzIHRoZSBjb250cm9sbGVyIG9mIEROQSBhbmQgZGV0ZXJtaW5lcyB3aGVuIGdlbmUgcHJvZHVjdHMgYXJlIG1hZGUuXG5FYWNoIGNlbGwgdHlwZSBpcyBhbHNvIGEgMiBsYXllciBuZXVyYWwgbmV0LCB3aGljaCB0YWtlcyBhcyBpbnB1dCB0aGUgZmx1aWQgdmVjdG9yLlxuRWFjaCBjZWxsIHR5cGUgaGFzIGEgbGlzdCBvZiBwb3RlbnRpYWwgYWN0aW9ucywgd2hpY2ggbWF5IGJlIHBhcmFtYXRlcml6ZWQgYnkgbmVpZ2hib3Igc3RhdGVzLlxuVHJhbnNpdGlvbnMgYmV0d2VlbiBjZWxsIHR5cGVzIGNhbiBiZSBtb2RlbGVkIGFzIGEgbWFya292IGNoYWluLCB0aG91Z2ggc29tZSBzdGF0ZXMgYXJlIHVucmVhY2hhYmxlIG9uY2UgbGVmdC5cbiAgKi9cblxuICAvKlxuICBGb3IgZXZlcnkgYWN0aW9uLCBjZWxsdHlwZXMgaGFzIGEgbmV1cmFsIG5ldFxuICAqL1xuXG59XG5cbi8qXG5TZXJpYWxpemF0aW9uIGlzIG5lY2Vzc2FyeSB0byBzdG9yZSB0aGUgcmVzdWx0cyBvZiBldm9sdXRpb24gc28gdGhleSBjYW4gYmUgcGxheWVkIGJhY2ssIHNhdmVkXG4qL1xuZXhwb3J0IGNsYXNzIEROQVNlcmlhbGl6ZXIge1xuICBzdGF0aWMgc2VyaWFsaXplKGNlbGx0eXBlOiBPYmplY3QpOiBzdHJpbmcge1xuICAgICAgLy8gdmFyIHBlcmNlcHRyb25zID0gY2VsbHR5cGVbJ2FjdGlvblBlcmNlcHRyb25zJ107XG4gICAgICAvLyB2YXIgcGVyY2VwdHJvbnNTZXJpYWwgPSBuZXcgQXJyYXkocGVyY2VwdHJvbnMubGVuZ3RoKTtcbiAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcGVyY2VwdHJvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIC8vICAgICBwZXJjZXB0cm9uc1NlcmlhbFtpXSA9IHBlcmNlcHRyb25zW2ldLnRvSlNPTigpO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgLy8gICAgIGNvbG9yOiBjZWxsdHlwZVsnY29sb3InXSxcbiAgICAgIC8vICAgICBpc0xlYWY6IGNlbGx0eXBlWydpc0xlYWYnXSxcbiAgICAgIC8vICAgICBjb3N0OiBjZWxsdHlwZVsnY29zdCddLnZlY3RvcixcbiAgICAgIC8vICAgICBhY3Rpb25QZXJjZXB0cm9uczogcGVyY2VwdHJvbnNTZXJpYWxcbiAgICAgIC8vIH0pO1xuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgZGVzZXJpYWxpemUoc2VyaWFsaXplZDogc3RyaW5nKTogRE5BIHtcbiAgICAgIC8vIHZhciBvYmo6IEROQTtcbiAgICAgIC8vIGlmICh0eXBlb2Ygc2VyaWFsaXplZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vICAgICBvYmogPSBKU09OLnBhcnNlKHNlcmlhbGl6ZWQpO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyB2YXIgcGVyY2VwdHJvbnNTZXJpYWwgPSBvYmouYWN0aW9uUGVyY2VwdHJvbnM7XG4gICAgICAvLyB2YXIgcGVyY2VwdHJvbnMgPSBuZXcgQXJyYXkocGVyY2VwdHJvbnNTZXJpYWwubGVuZ3RoKTtcbiAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcGVyY2VwdHJvbnNTZXJpYWwubGVuZ3RoOyArK2kpIHtcbiAgICAgIC8vICAgICBwZXJjZXB0cm9uc1tpXSA9IE5ldHdvcmsuZnJvbUpTT04ocGVyY2VwdHJvbnNTZXJpYWxbaV0pO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyBvYmouYWN0aW9uUGVyY2VwdHJvbnMgPSBwZXJjZXB0cm9ucztcblxuICAgICAgLy8gcmV0dXJuIG9iajtcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvZG5hLnRzIiwiLypcbmFwcC5qc1xuVGhlIHZpZXcgcHJvdmlkZXIgbGF5ZXIhXG5UaGlzIGNhbGxzOlxuKHNpbXVsYXRpb25TdGFydCkgd2hlblxuKi9cblxuaW1wb3J0IHtTaW11bGF0aW9ufSBmcm9tIFwiLi9zaW11bGF0aW9uXCI7XG5pbXBvcnQge0V2b2x1dGlvbn0gZnJvbSBcIi4vZXZvbHV0aW9uXCI7XG5pbXBvcnQge0FuZ2xlfSBmcm9tIFwiLi9hbmdsZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7RE5BU2VyaWFsaXplcn0gZnJvbSBcIi4vZG5hXCI7XG5pbXBvcnQge0lWaWV3U2ltdWxhdGlvbn0gZnJvbSBcIi4vc2ltdWxhdGlvblwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBkcmF3Q2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcmF3XCIpO1xuXG4gICAgdmFyIHNpbTogSVZpZXdTaW11bGF0aW9uID0gbmV3IFNpbXVsYXRpb24oZHJhd0NhbnZhcyk7XG4gICAgLy8gdmFyIHNpbSA9IG5ldyBFdm9sdXRpb24oZHJhd0NhbnZhcyk7XG5cbiAgICBzaW0ucnVuKCk7XG5cbiAgICB2YXIgc2ltT24gPSBzaW0uaXNTaW11bGF0aW9uUnVubmluZztcblxuICAgIHdpbmRvd1sndG9nZ2xlU2ltdWxhdGlvbiddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzaW1Pbikge1xuICAgICAgICAgICAgc2ltLnBhdXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaW0ucnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2ltT24gPSAhc2ltT247XG4gICAgfVxuICAgIHdpbmRvd1sncmVzZXRTaW11bGF0aW9uJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT0gUmVzZXR0aW5nIHNpbXVsYXRpb24gPT09XCIpO1xuICAgICAgICBzaW0ucmVzZXQoKTtcbiAgICB9XG4gICAgd2luZG93Wyd0b2dnbGVEcmF3J10gPSBzaW0udG9nZ2xlRHJhdy5iaW5kKHNpbSk7XG4gICAgd2luZG93WydkcmF3U3R5bGUnXSA9IHNpbS5kcmF3U3R5bGUuYmluZChzaW0pO1xuXG4gICAgLy8gc2ltLnJ1bkZvck5UaWNrcygxMDApO1xuXG4gICAgLy8gREVCVUcgLy9cbiAgICAvLyB3aW5kb3dbJ2F1dG9tYXRhJ10gPSBzaW0uYXV0b21hdGE7XG4gICAgd2luZG93WydzaW11bGF0aW9uJ10gPSBzaW07XG4gICAgd2luZG93WydBbmdsZSddID0gQW5nbGU7XG4gICAgd2luZG93WydVdGlscyddID0gVXRpbHM7XG4gICAgd2luZG93WydETkFTZXJpYWxpemVyJ10gPSBETkFTZXJpYWxpemVyO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYXBwLnRzIiwiLypcbmFwcC50c1xuKi9cblxuaW1wb3J0IHtBdXRvbWF0YX0gZnJvbSBcIi4vYXV0b21hdGFcIjtcbmltcG9ydCB7RE5BLCBETkFTZXJpYWxpemVyfSBmcm9tIFwiLi9kbmFcIjtcbmltcG9ydCB7Q2VsbH0gZnJvbSBcIi4vY2VsbFwiO1xuaW1wb3J0IHtNWV9QTEFOVH0gZnJvbSBcIi4vbXlwbGFudFwiO1xuXG4vLyBpbnRlcmZhY2UgZm9yIHZpZXcgbGF5ZXJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdTaW11bGF0aW9uIHtcbiAgICAvLyBjb25zdHJ1Y3RvcihkcmF3Q2FudmFzOiBFbGVtZW50KTogdm9pZDtcbiAgICByZXNldCgpOiB2b2lkOyAvLyBzZXQgc3RhdGUgdG8gaW5pdGlhbFxuICAgIHBhdXNlKCk6IHZvaWQ7IC8vIHBhdXNlIGV4ZWN1dGlvblxuICAgIHJ1bigpOiB2b2lkOyAvL1xuICAgIGlzU2ltdWxhdGlvblJ1bm5pbmc7XG4gICAgdG9nZ2xlRHJhdztcbiAgICBkcmF3U3R5bGU7XG5cbiAgICAvLyBzZXREcmF3RW5hYmxlZCgpXG4gICAgLy8gc2V0RHJhd0Rpc2FibGVkKClcbn1cblxuZXhwb3J0IGNsYXNzIFNpbXVsYXRpb24gaW1wbGVtZW50cyBJVmlld1NpbXVsYXRpb24ge1xuICAgIEZSQU1FX0RFTEFZOiBudW1iZXIgPSA4MDtcblxuICAgIGF1dG9tYXRhOiBBdXRvbWF0YTtcbiAgICBkcmF3RW5hYmxlZDogYm9vbGVhbjtcbiAgICBkcmF3Q2FudmFzOiBFbGVtZW50O1xuXG4gICAgLy8gYSByZWZlcmVuY2UgdG8gdGhlIGRuYSB1c2VkIHRvIG1ha2UgdGhlIGF1dG9tYXRhXG4gICAgZG5hOiBETkE7XG5cbiAgICAvLyBmbGFncyBmb3Igc2hvd2luZyBzdGF0dXNcbiAgICBpc1NpbXVsYXRpb25SdW5uaW5nOiBib29sZWFuO1xuICAgIG1pZFVwZGF0ZTogYm9vbGVhbjtcblxuICAgIHRpY2sgPSAwO1xuICAgIHVwZGF0ZUludGVydmFsOiBudW1iZXI7XG5cbiAgICBmaXRuZXNzOiBBcnJheTxudW1iZXI+O1xuXG4gICAgY29uc3RydWN0b3IoZHJhd0NhbnZhczogRWxlbWVudCkge1xuICAgICAgICB0aGlzLmRyYXdDYW52YXMgPSBkcmF3Q2FudmFzO1xuICAgICAgICB0aGlzLmRyYXdFbmFibGVkID0gdHJ1ZTtcblxuXG4gICAgICAgIC8vIHRoaXMuZG5hID0gRE5BU2VyaWFsaXplci5kZXNlcmlhbGl6ZShNWV9QTEFOVCk7IC8vIHRvIGxvYWQgRE5BIGZyb20gYSBmaWxlXG4gICAgICAgIC8vIHRoaXMuZG5hID0gbmV3IEROQSgpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG5cbiAgICByZXNldChkbmE/OiBETkEpIHtcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzU3RyaW5nKCdSZXNldHRpbmcuLi4nKTtcbiAgICAgICAgdGhpcy50aWNrID0gMDtcbiAgICAgICAgaWYgKCFkbmEpIHtcbiAgICAgICAgICAgIGRuYSA9IG5ldyBETkEoKTtcbiAgICAgICAgICAgIGRuYS5tdXRhdGUoMTApO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2aWV3VGVtcCA9IHRoaXMuYXV0b21hdGEgJiYgdGhpcy5hdXRvbWF0YS5kcmF3U3R5bGU7XG4gICAgICAgIHRoaXMuYXV0b21hdGEgPSBuZXcgQXV0b21hdGEoJ3Byb3RvdHlwZScsIHRoaXMuZHJhd0NhbnZhcyk7XG4gICAgICAgIHRoaXMuYXV0b21hdGEucGxhbnRTZWVkKGRuYSk7XG4gICAgICAgIGlmICh2aWV3VGVtcClcbiAgICAgICAgICAgIHRoaXMuYXV0b21hdGEuZHJhd1N0eWxlID0gdmlld1RlbXA7XG5cbiAgICAgICAgd2luZG93WydmaXRuZXNzJ10gPSB0aGlzLmZpdG5lc3MgPSBbXTtcblxuICAgICAgICAvLyBpZiAodGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnVwZGF0ZVBsYW50Rm9yZXZlcigpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICBydW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2ltdWxhdGlvblJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTaW11bGF0aW9uIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kcmF3RW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvbWF0YS5kcmF3KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzU2ltdWxhdGlvblJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVBsYW50Rm9yZXZlcigpO1xuICAgIH1cblxuICAgIC8vIHdlaXJkIHNlbGYtY2FsbGluZyBmdW5jdGlvblxuICAgIHVwZGF0ZVBsYW50Rm9yZXZlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2ltdWxhdGlvblJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmZpdG5lc3NbdGhpcy50aWNrXSA9IHRoaXMuZXZhbEZpdG5lc3ModGhpcy5hdXRvbWF0YS5wbGFudCk7XG4gICAgICAgICAgICB0aGlzLmF1dG9tYXRhLnVwZGF0ZSgpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkF1dG9tYXRhIGVycm9yISBTdG9wcGluZyBzaW11bGF0aW9uLi4uXCIpO1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5zaG93U3RhdHVzU3RyaW5nKGUpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYXdFbmFibGVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b21hdGEuZHJhdygpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRHJhdyBlcnJvciEgU3RvcHBpbmcgc2ltdWxhdGlvbi4uLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGljayArKztcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy51cGRhdGVQbGFudEZvcmV2ZXIuYmluZCh0aGlzKSwgdGhpcy5GUkFNRV9ERUxBWSk7XG4gICAgfVxuXG4gICAgZXZhbEZpdG5lc3MocGxhbnQ6IEFycmF5PENlbGw+KTogbnVtYmVyIHtcbiAgICAgICAgdmFyIHRmbHVpZHMgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2VsbDogQ2VsbCA9IHBsYW50W2ldO1xuICAgICAgICAgICAgdGZsdWlkcyArPSBjZWxsLnN1bUZsdWlkcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0Zmx1aWRzO1xuICAgIH1cblxuICAgIHJ1bkZvck5UaWNrcyhOKSB7XG4gICAgICAgIC8vIHJ1biBzaW0gZm9yIE4gdGlja3NcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBOOyArK24pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b21hdGEudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdXRvbWF0YS5kcmF3KCk7XG4gICAgfVxuXG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2ltdWxhdGlvblJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTaW11bGF0aW9uIGlzIGFscmVhZHkgcGF1c2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuaXNTaW11bGF0aW9uUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dTdGF0dXNTdHJpbmcoJ1NpbXVsYXRpb24gc3RvcHBlZC4nKTtcbiAgICB9XG5cbiAgICB0b2dnbGVTaW11bGF0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKVxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnJ1bigpO1xuICAgIH1cblxuICAgIHRvZ2dsZURyYXcoKSB7XG4gICAgICAgIHRoaXMuZHJhd0VuYWJsZWQgPSAhdGhpcy5kcmF3RW5hYmxlZDtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICB9XG5cbiAgICBkcmF3U3R5bGUoc3R5bGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RyYXdTdHlsZScsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5hdXRvbWF0YS5kcmF3U3R5bGUgPSBzdHlsZTtcbiAgICAgICAgdGhpcy5hdXRvbWF0YS5kcmF3KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU3RhdHVzKCkge1xuICAgICAgICB2YXIgc3RhdHVzO1xuICAgICAgICBpZiAodGhpcy5pc1NpbXVsYXRpb25SdW5uaW5nKVxuICAgICAgICAgICAgc3RhdHVzID0gJ1NpbXVsYXRpb24gcnVubmluZy4gJztcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RhdHVzID0gJ1NpbXVsYXRpb24gc3RvcHBlZC4gJztcbiAgICAgICAgaWYgKCF0aGlzLmRyYXdFbmFibGVkKVxuICAgICAgICAgICAgc3RhdHVzICs9ICcoRHJhdyBkaXNhYmxlZC4pICc7XG4gICAgICAgIHN0YXR1cyArPSBcIlRpY2sgXCIgKyB0aGlzLnRpY2s7XG4gICAgICAgIGlmICh0aGlzLm1pZFVwZGF0ZSkgc3RhdHVzICs9IFwiKlwiO1xuICAgICAgICB0aGlzLnNob3dTdGF0dXNTdHJpbmcoc3RhdHVzKTtcbiAgICB9XG5cbiAgICBzaG93U3RhdHVzU3RyaW5nKHN0YXR1cykge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c1wiKS5pbm5lckhUTUwgPSBzdGF0dXM7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NpbXVsYXRpb24udHMiLCJpbXBvcnQge1V0aWxzfSBmcm9tIFwiLi91dGlsc1wiO1xuXG4vKipcblN5bmFwdGljIGxpYnNcbiovXG5kZWNsYXJlIG1vZHVsZSBBcmNoaXRlY3Qge1xuICAgIGNsYXNzIFBlcmNlcHRyb24ge1xuICAgICAgICBjb25zdHJ1Y3RvciguLi5ubm9kZXMpXG4gICAgICAgIHRyYWluZXI7XG4gICAgICAgIGxheWVycztcbiAgICAgICAgYWN0aXZhdGUoLi4uaW5wdXQpO1xuICAgIH1cbn1cblxuZGVjbGFyZSBjbGFzcyBOZXVyb24ge1xuICAgIGJpYXM6IG51bWJlclxufVxuXG5kZWNsYXJlIGNsYXNzIENvbm5lY3Rpb24ge1xuICAgIHdlaWdodDogbnVtYmVyXG59XG5cblxuLypcblxuKi9cbmV4cG9ydCBjbGFzcyBQZXJjZXB0cm9uIGV4dGVuZHMgQXJjaGl0ZWN0LlBlcmNlcHRyb24ge1xuICAgIGNvbnN0cnVjdG9yKC4uLm5ub2Rlcykge1xuICAgICAgICBzdXBlciguLi5ubm9kZXMpO1xuICAgIH1cblxuICAgIHBlcnR1cmIoYW1vdW50OiBudW1iZXIgPSAxLjApIHtcbiAgICAgICAgLy8gcGVydHVyYiBldmVyeSB3ZWlnaHQgYnkgfmFtb3VudFxuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBsYXllcnMgY29ubmVjdGlvbnNcbiAgICAgICAgdmFyIGNvbm5lY3Rpb25zOiBBcnJheTxDb25uZWN0aW9uPiA9IHRoaXMubGF5ZXJzLmlucHV0LmNvbm5lY3RlZFRvWzBdLmxpc3RcbiAgICAgICAgLmNvbmNhdChjb25uZWN0aW9ucyA9IHRoaXMubGF5ZXJzLmhpZGRlblswXS5jb25uZWN0ZWRUb1swXS5saXN0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25uZWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSBjb25uZWN0aW9uc1tpXTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ud2VpZ2h0ICs9IDIgKiBNYXRoLnJhbmRvbSgpICogYW1vdW50IC0gYW1vdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIG5ldXJvbnNcbiAgICAgICAgdmFyIG5ldXJvbnM6IEFycmF5PE5ldXJvbj4gPSB0aGlzLmxheWVycy5pbnB1dC5saXN0XG4gICAgICAgIC5jb25jYXQodGhpcy5sYXllcnMuaGlkZGVuWzBdLmxpc3QpXG4gICAgICAgIC5jb25jYXQodGhpcy5sYXllcnMub3V0cHV0Lmxpc3QpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ldXJvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIG5ldXJvbnNbaV0uYmlhcyArPSAyICogTWF0aC5yYW5kb20oKSAqIGFtb3VudCAtIGFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy53ZWlnaHRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMud2VpZ2h0c1tpXS5sZW5ndGg7ICsraikge1xuICAgICAgICAvLyAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy53ZWlnaHRzW2ldW2pdLmxlbmd0aDsgKytrKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMud2VpZ2h0c1tpXVtqXVtrXSArPSAyICogTWF0aC5yYW5kb20oKSAqIGFtb3VudCAtIGFtb3VudDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvcGVyY2VwdHJvbi50cyJdLCJzb3VyY2VSb290IjoiIn0=