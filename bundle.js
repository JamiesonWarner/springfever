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
	var angle_1 = __webpack_require__(7);
	window['Angle'] = angle_1.Angle;
	var updateInterval;
	var automata;
	document.addEventListener('DOMContentLoaded', function () {
	    automata = new automata_1.Automata("prototype");
	    window['automata'] = automata;
	    updateInterval = window.setInterval(function () {
	        automata.update();
	        automata.draw();
	    }, 100);
	    document.getElementById("draw").addEventListener("mousemove", function (event) {
	        automata.showInfo(event.offsetX, event.offsetY);
	    });
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
	var fluids_1 = __webpack_require__(5);
	var Automata = (function () {
	    function Automata(runString) {
	        this.drawWater = false;
	        var dna = new dna_1.DNA();
	        this.dna = dna;
	        this.canvas = document.getElementById("draw");
	        this.canvasCtx = this.canvas.getContext("2d");
	        this.grid = new Array(Automata.GRID_N_ROWS);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            this.grid[row] = new Array(Automata.GRID_N_COLUMNS);
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
	                this.grid[row][col] = new fluids_1.Fluids(500 * Math.random(), 0);
	            }
	        }
	        this.plant = dna.plantSeed(this.grid);
	        console.log(this.grid[50][50]);
	        // for (var i = 0; i < this.plant.length; i++) {
	        //     this.grid[this.plant[i].y][this.plant[i].x] = this.plant[i];
	        // }
	        // for (var i = 50; i < Automata.GRID_N_ROWS; i ++){
	        //     for (var j = 0; j < Automata.GRID_N_COLUMNS; j ++){
	        //         if(typeof this.grid[i][j] === "undefined"){
	        //             var fluids = new Fluids();
	        //             fluids.vector[0] = 500 * Math.random();
	        //             this.grid[i][j] = new Dirt(fluids);
	        //         }
	        //     }
	        // }
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
	                        console.log('INVALID FLUID VECTOR:', row, col);
	                        return;
	                    }
	                    if (f[k] < 0) {
	                        console.log('NEGATIVE FLUIDS: ', row, col);
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
	                    var nCell = new cell_1.Cell(this.dna, action.parameters.type, newFluids, this.grid, gJ, gI);
	                    this.plant.push(nCell);
	                    this.grid[gI][gJ] = nCell;
	                    this.subtractFluids(this.plant[i].fluids, cost);
	                }
	            }
	        }
	        this.fluidUpdate();
	        this.signalsUpdate();
	        // this.cellDeath();
	    };
	    /*
	    Kill all cells who don't have enough resources to live
	    */
	    Automata.prototype.cellDeath = function () {
	        var MIN_WATER = 1;
	        var MIN_GLUCOSE = 1;
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
	            console.log('killing cell, ', cell);
	            var index = this.plant.indexOf(cell);
	            // this.plant.splice(index, 1);
	            this.grid[cell.y][cell.x] = cell.fluids;
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
	                var dx = cell.x + neighbs[j][0];
	                var dy = cell.y + neighbs[j][1];
	                if (dx < 0 || dy < 0 || dx >= Automata.GRID_N_COLUMNS || dy >= Automata.GRID_N_ROWS)
	                    continue;
	                var neighb = this.grid[dy][dx];
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
	        if (typeof this['foo'] === 'undefined')
	            this['foo'] = 0;
	        console.log(this['foo']);
	        this['foo']++;
	        // photosynthesis. TODO this will be an action
	        for (var i = 0; i < this.plant.length; i++) {
	            var cell = this.plant[i];
	            if (cell.type === "l") {
	                var numAir = this.countAirNeighbors(cell.y, cell.x);
	                console.log(typeof numAir);
	                var dGlucose = Math.min(cell.fluids.vector[fluids_1.Fluids.WATER] / 4, 20 * numAir);
	                // convert water to glucose
	                fluidsDiff[cell.y][cell.x][fluids_1.Fluids.WATER] = -dGlucose;
	                fluidsDiff[cell.y][cell.x][fluids_1.Fluids.GLUCOSE] = dGlucose;
	            }
	        }
	        // Passive transport. Give nutrients to neighbors.
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
	                    var obj = this.grid[row][col];
	                    var neighbFluids = this.grid[neighbRow][neighbCol];
	                    if (typeof neighbFluids === 'undefined') {
	                        console.log('neighbFluids is undefined at ', neighbRow, neighbCol);
	                    }
	                    var fluids = obj instanceof cell_1.Cell ? obj.fluids.vector : obj.vector;
	                    neighbFluids = neighbFluids instanceof cell_1.Cell ? neighbFluids.fluids.vector : neighbFluids.vector;
	                    for (var j = 0; j < fluids_1.Fluids.N_FLUIDS; ++j) {
	                        if (fluids[j] > neighbFluids[j]) {
	                            var diff = 0.2 * (fluids[j] - neighbFluids[j]);
	                            fluidsDiff[row][col][j] -= diff;
	                            fluidsDiff[neighbRow][neighbCol][j] += diff;
	                        }
	                    }
	                }
	            }
	        }
	        this.validateGridFluids();
	        console.log(fluidsDiff[0][0]);
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
	        // let shuffleX = new Array(Automata.GRID_N_COLUMNS);
	        // let shuffleY = new Array(Automata.GRID_N_ROWS);
	        // for (var i = 0; i < shuffleX.length; i ++){
	        //     shuffleX[i] = i;
	        // }
	        // for (var i = 0; i < shuffleY.length; i ++ ){
	        //     shuffleY[i] = i;
	        // }
	        // shuffleY = this.shuffle(shuffleY);
	        // for (var _i = 0; _i < Automata.GRID_N_ROWS; _i ++){
	        //     shuffleX = this.shuffle(shuffleX);
	        //     for (var _j = 0; _j < Automata.GRID_N_COLUMNS; _j ++){
	        //         i = shuffleY[_i];
	        //         j = shuffleX[_j];
	        //         if (typeof this.grid[i][j] === "undefined")
	        //             continue;
	        //         //this.calculateDiffusion(i, j, fluidsDiff, [0.2, 0.2], [], [true, false]);
	        //         let cur = this.grid[i][j];
	        //         let neighborA = null;
	        //         let neighborB = null;
	        //         if(i < Automata.GRID_N_ROWS -1)
	        //             neighborA = this.grid[i + 1][j];
	        //         if(j < Automata.GRID_N_COLUMNS -1)
	        //             neighborB = this.grid[i][j+1];
	        //         let flowRatio = 0.1;
	        //         if(neighborA){
	        //             if(neighborA instanceof Cell && cur instanceof Cell){
	        //                 flowRatio = 0.5
	        //             }
	        //             if(!fluidsDiff[i][j]){
	        //                 fluidsDiff[i][j] = new Fluids(0);
	        //             }
	        //             if(!fluidsDiff[i+1][j]){
	        //                 fluidsDiff[i + 1][j] = new Fluids(0);
	        //             }
	        //             let waterDiff = cur.fluids.vector[0] - neighborA.fluids.vector[0];
	        //             let waterChange = Math.max(Math.min(flowRatio * waterDiff, cur.fluids.vector[Fluids.WATER] +
	        //                 fluidsDiff[i][j].vector[Fluids.WATER]),
	        //                 -(neighborA.fluids.vector[Fluids.WATER] + fluidsDiff[i+1][j].vector[Fluids.WATER])
	        //             );
	        //             fluidsDiff[i][j].vector[Fluids.WATER] -= waterChange;
	        //             fluidsDiff[i + 1][j].vector[Fluids.WATER] += waterChange;
	        //             if(neighborA instanceof Cell && cur instanceof Cell){
	        //                 let glucoseDiff = cur.fluids.vector[Fluids.GLUCOSE] - neighborA.fluids.vector[Fluids.GLUCOSE];
	        //                 let glucoseChange = Math.max(Math.min(flowRatio * glucoseDiff, cur.fluids.vector[Fluids.GLUCOSE] +
	        //                     fluidsDiff[i][j].vector[Fluids.GLUCOSE]),
	        //                     -(neighborA.fluids.vector[Fluids.GLUCOSE] + fluidsDiff[i + 1][j].vector[Fluids.GLUCOSE])
	        //                 );
	        //                 if(glucoseChange > 10){
	        //                     glucoseChange = 10;
	        //                 }
	        //                 else if(glucoseChange < -10){
	        //                     glucoseChange = -10;
	        //                 }
	        //                 fluidsDiff[i][j].vector[Fluids.GLUCOSE] -= glucoseChange;
	        //                 fluidsDiff[i + 1][j].vector[Fluids.GLUCOSE] += glucoseChange;
	        //             }
	        //         }
	        //         if (neighborB) {
	        //             if (neighborB instanceof Cell && cur instanceof Cell) {
	        //                 flowRatio = 0.25
	        //             }
	        //             if (!fluidsDiff[i][j]) {
	        //                 fluidsDiff[i][j] = new Fluids(0);
	        //             }
	        //             if (!fluidsDiff[i][j+1]) {
	        //                 fluidsDiff[i][j+1] = new Fluids(0);
	        //             }
	        //             let waterDiff = cur.fluids.vector[0] - neighborB.fluids.vector[0];
	        //             let waterChange = Math.max(Math.min(flowRatio * waterDiff, cur.fluids.vector[Fluids.WATER] +
	        //                 fluidsDiff[i][j].vector[Fluids.WATER]),
	        //                 -(neighborB.fluids.vector[Fluids.WATER] + fluidsDiff[i][j+1].vector[Fluids.WATER])
	        //             );
	        //             fluidsDiff[i][j].vector[0] -= waterChange;
	        //             fluidsDiff[i][j+1].vector[0] += waterChange;
	        //             if (neighborB instanceof Cell && cur instanceof Cell) {
	        //                 let glucoseDiff = cur.fluids.vector[Fluids.GLUCOSE] - neighborB.fluids.vector[Fluids.GLUCOSE];
	        //                 let glucoseChange = Math.max(Math.min(flowRatio * glucoseDiff, cur.fluids.vector[Fluids.GLUCOSE] +
	        //                     fluidsDiff[i][j].vector[Fluids.GLUCOSE]),
	        //                     -(neighborB.fluids.vector[Fluids.GLUCOSE] + fluidsDiff[i][j + 1].vector[Fluids.GLUCOSE])
	        //                 );
	        //                 if (glucoseChange > 10) {
	        //                     glucoseChange = 10;
	        //                 }
	        //                 else if (glucoseChange < -10) {
	        //                     glucoseChange = -10;
	        //                 }
	        //                 fluidsDiff[i][j].vector[Fluids.GLUCOSE] -= glucoseChange;
	        //                 fluidsDiff[i][j + 1].vector[Fluids.GLUCOSE] += glucoseChange;
	        //             }
	        //         }
	        //     }
	        // }
	    };
	    Automata.prototype.calculateDiffusion = function (i, j, dFluids, flowRatioFluid, flowDirectionPref, diffuseToDirt) {
	        var obj = this.grid[i][j];
	        var middle = obj.fluids;
	        var left = new fluids_1.Fluids(middle.vector[0], middle.vector[1]);
	        var right = new fluids_1.Fluids(middle.vector[0], middle.vector[1]);
	        var up = new fluids_1.Fluids(middle.vector[0], middle.vector[1]);
	        var down = new fluids_1.Fluids(middle.vector[0], middle.vector[1]);
	        if (!dFluids[i][j]) {
	            dFluids[i][j] = new fluids_1.Fluids(0, 0);
	        }
	        if (i > 0 && this.grid[i - 1][j]) {
	            up = this.grid[i - 1][j].fluids;
	            if (!dFluids[i - 1][j]) {
	                dFluids[i - 1][j] = new fluids_1.Fluids;
	            }
	        }
	        if (i < Automata.GRID_N_ROWS - 1 && this.grid[i + 1][j]) {
	            down = this.grid[i + 1][j].fluids;
	            if (!dFluids[i + 1][j]) {
	                dFluids[i + 1][j] = new fluids_1.Fluids;
	            }
	        }
	        if (j > 0 && this.grid[i][j - 1]) {
	            left = this.grid[i][j - 1].fluids;
	            if (!dFluids[i][j - 1]) {
	                dFluids[i][j - 1] = new fluids_1.Fluids;
	            }
	        }
	        if (j < Automata.GRID_N_COLUMNS - 1 && this.grid[i][j + 1]) {
	            right = this.grid[i][j + 1].fluids;
	            if (!dFluids[i][j + 1]) {
	                dFluids[i][j + 1] = new fluids_1.Fluids;
	            }
	        }
	        for (var f = 0; f < obj.fluids.vector.length; f++) {
	            var min = 999;
	            var dUp = Math.max(0, up.vector[f] - middle.vector[f]);
	            if (this.grid[i - 1] && this.grid[i - 1][j] && this.grid[i - 1][j] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dUp = 0;
	            }
	            else {
	                min = Math.min(dUp, min);
	            }
	            var dDown = Math.max(0, down.vector[f] - middle.vector[f]);
	            if (this.grid[i + 1] && this.grid[i + 1][j] && this.grid[i + 1][j] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dDown = 0;
	            }
	            else {
	                min = Math.min(dDown, min);
	            }
	            var dLeft = Math.max(0, left.vector[f] - middle.vector[f]);
	            if (this.grid[i][j - 1] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dLeft = 0;
	            }
	            else {
	                min = Math.min(dLeft, min);
	            }
	            var dRight = Math.max(0, right.vector[f] - middle.vector[f]);
	            if (this.grid[i][j + 1] && this.grid[i - 1][j] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dRight = 0;
	            }
	            else {
	                min = Math.min(dUp, min);
	            }
	            var total = dUp + dDown + dLeft + dRight;
	            if (total <= 0) {
	                return;
	            }
	            var giveAway = Math.min(flowRatioFluid[f] * obj.fluids[f], 0.5 * min);
	            if (i > 0 && this.grid[i - 1][j]) {
	                dFluids[i - 1][j].vector[f] += (dUp / total) * giveAway;
	            }
	            if (i < Automata.GRID_N_ROWS - 1 && this.grid[i + 1][j]) {
	                dFluids[i + 1][j].vector[f] += (dDown / total) * giveAway;
	            }
	            if (j > 0 && this.grid[i][j - 1]) {
	                dFluids[i][j - 1].vector[f] += (dLeft / total) * giveAway;
	            }
	            if (j < Automata.GRID_N_COLUMNS - 1 && this.grid[i][j + 1]) {
	                dFluids[i][j + 1].vector[f] += (dRight / total) * giveAway;
	            }
	            dFluids[i][j].vector[f] -= giveAway;
	        }
	    };
	    Automata.prototype.shuffle = function (array) {
	        var currentIndex = array.length, temporaryValue, randomIndex;
	        // While there remain elements to shuffle...
	        while (0 !== currentIndex) {
	            // Pick a remaining element...
	            randomIndex = Math.floor(Math.random() * currentIndex);
	            currentIndex -= 1;
	            // And swap it with the current element.
	            temporaryValue = array[currentIndex];
	            array[currentIndex] = array[randomIndex];
	            array[randomIndex] = temporaryValue;
	        }
	        return array;
	    };
	    Automata.prototype.applyFluidChange = function (fluid, dFluid) {
	        for (var i = 0; i < dFluid.length; i++) {
	            fluid[i] += dFluid[i];
	        }
	    };
	    Automata.prototype.countAirNeighbors = function (i, j) {
	        var count = 0;
	        if (i < Automata.GRID_N_ROWS - 1 && !this.grid[i + 1][j]) {
	            count++;
	        }
	        if (i > 0 && !this.grid[i - 1][j]) {
	            count++;
	        }
	        if (j < Automata.GRID_N_COLUMNS - 1 && !this.grid[i][j + 1]) {
	            count++;
	        }
	        if (j > 0 && !this.grid[i + 1][j - 1]) {
	            count++;
	        }
	        return count;
	    };
	    Automata.prototype.draw = function () {
	        var scale = Automata.CELL_SCALE_PIXELS;
	        this.canvasCtx.fillStyle = "#7EC0DD";
	        this.canvasCtx.fillRect(0, 0, Automata.GRID_N_COLUMNS * scale, scale * Automata.GRID_N_ROWS);
	        this.canvasCtx.fillRect(0, 0, 100, 100);
	        // this.canvasCtx.fillStyle = "#FFF000";
	        // this.canvasCtx.fillRect(70, 70, 10, 10);
	        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
	            for (var col = 0; col < Automata.GRID_N_COLUMNS; col++) {
	                var obj = this.grid[row][col];
	                var fluids = obj instanceof cell_1.Cell ? obj.fluids.vector : obj.vector;
	                var waterContent = Math.max(Math.min(Math.round(fluids[fluids_1.Fluids.WATER]), 255), 0);
	                if (obj instanceof cell_1.Cell) {
	                    if (this.viewStyle === 'water') {
	                        var colorString = "#" + "0064" + this.getColorHex(waterContent);
	                        this.canvasCtx.fillStyle = colorString;
	                    }
	                    else if (this.viewStyle === 'glucose') {
	                        var colorString = "#" + this.getColorHex(Math.min(255, Math.ceil(fluids[fluids_1.Fluids.GLUCOSE]))) + "0000";
	                        this.canvasCtx.fillStyle = colorString;
	                    }
	                    else if (this.viewStyle === 'auxin') {
	                        var colorString = "#" + "0000" + this.getColorHex(Math.min(255, Math.ceil(255 * obj.signals.vector[0])));
	                        this.canvasCtx.fillStyle = colorString;
	                    }
	                    else {
	                        this.canvasCtx.fillStyle = obj.dna.cellTypes[obj.type].color;
	                    }
	                    this.canvasCtx.fillRect(Math.floor(scale * col), Math.floor(scale * row), scale, scale);
	                }
	                else if (row >= 50) {
	                    var colorString = "#" + "6400" + this.getColorHex(waterContent);
	                    this.canvasCtx.fillStyle = colorString;
	                    this.canvasCtx.fillRect(scale * col, scale * row, scale, scale);
	                }
	            }
	        }
	        /*
	        this.canvasCtx.fillStyle = "#00FF00";
	        for (var i = 0; i < Automata.GRID_N_COLUMNS; i ++){
	            this.canvasCtx.fillRect(scale * i, scale * (Automata.GRID_N_ROWS-1), scale, scale);
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
	    Automata.GRID_N_COLUMNS = 100;
	    Automata.GRID_N_ROWS = 100;
	    Automata.CELL_SCALE_PIXELS = 10;
	    return Automata;
	}());
	exports.Automata = Automata;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var fluids_1 = __webpack_require__(5);
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
	        var c1 = new cell_1.Cell(this, 'a1', new fluids_1.Fluids(100, 10000), grid, 50, 50), c2 = new cell_1.Cell(this, 'b1', new fluids_1.Fluids(100, 10000), grid, 50, 51);
	        var seed = [c1, c2];
	        grid[50][50] = c1;
	        grid[51][50] = c2;
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
	    function Cell(dna, type, fluids, grid, x, y) {
	        this.grid = grid;
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