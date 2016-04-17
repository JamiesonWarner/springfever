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
	    document.getElementById("draw").addEventListener("click", function (event) {
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
	    Automata.prototype.showInfo = function (x, y) {
	        console.log('INFO SHOW', x, y);
	        var tx = x / 10;
	        var ty = y / 10;
	        // document.getElementById('bar-water').setAttribute('width', )
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
	                if (cost.vector.length > 2) {
	                    console.log("dafuq");
	                }
	                var canAfford = true;
	                for (var j = 0; j < cost.vector.length; j++) {
	                    if (!(this.plant[i].fluids.vector[j] >= cost.vector[j])) {
	                        canAfford = false;
	                        break;
	                    }
	                }
	                if (!canAfford)
	                    continue;
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
	                    this.subtractFluids(this.plant[i].fluids, cost);
	                }
	                else if (this.grid[gI][gJ] instanceof dirt_1.Dirt) {
	                    var newFluids = this.grid[gI][gJ].fluids;
	                    var nCell = new cell_1.Cell(gJ, gI, newFluids, action.parameters.type, this.dna);
	                    this.plant.push(nCell);
	                    this.grid[gI][gJ] = nCell;
	                    this.subtractFluids(this.plant[i].fluids, cost);
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
	        var SPREAD_COEFF = 0.1;
	        for (var i = 0; i < this.plant.length; i++) {
	            var cell = this.plant[i];
	            var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
	            for (var j = 0; j < neighbs.length; j++) {
	                var dx = cell.x + neighbs[j][0];
	                var dy = cell.y + neighbs[j][1];
	                if (dx < 0 || dy < 0 || dx >= Automata.GRID_DIMENSION_X || dy >= Automata.GRID_DIMENSION_Y)
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
	        var shuffleX = new Array(Automata.GRID_DIMENSION_X);
	        var shuffleY = new Array(Automata.GRID_DIMENSION_Y);
	        for (var i = 0; i < shuffleX.length; i++) {
	            shuffleX[i] = i;
	        }
	        for (var i = 0; i < shuffleY.length; i++) {
	            shuffleY[i] = i;
	        }
	        shuffleY = this.shuffle(shuffleY);
	        for (var _i = 0; _i < Automata.GRID_DIMENSION_Y; _i++) {
	            shuffleX = this.shuffle(shuffleX);
	            for (var _j = 0; _j < Automata.GRID_DIMENSION_X; _j++) {
	                i = shuffleY[_i];
	                j = shuffleX[_j];
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
	                        flowRatio = 0.5;
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
	                    dFluids[i][j].vector[fluids_1.Fluids.WATER] -= waterChange;
	                    dFluids[i + 1][j].vector[fluids_1.Fluids.WATER] += waterChange;
	                    if (neighborA instanceof cell_1.Cell && cur instanceof cell_1.Cell) {
	                        var glucoseDiff = cur.fluids.vector[fluids_1.Fluids.GLUCOSE] - neighborA.fluids.vector[fluids_1.Fluids.GLUCOSE];
	                        var glucoseChange = Math.max(Math.min(flowRatio * glucoseDiff, cur.fluids.vector[fluids_1.Fluids.GLUCOSE] +
	                            dFluids[i][j].vector[fluids_1.Fluids.GLUCOSE]), -(neighborA.fluids.vector[fluids_1.Fluids.GLUCOSE] + dFluids[i + 1][j].vector[fluids_1.Fluids.GLUCOSE]));
	                        if (glucoseChange > 10) {
	                            glucoseChange = 10;
	                        }
	                        else if (glucoseChange < -10) {
	                            glucoseChange = -10;
	                        }
	                        dFluids[i][j].vector[fluids_1.Fluids.GLUCOSE] -= glucoseChange;
	                        dFluids[i + 1][j].vector[fluids_1.Fluids.GLUCOSE] += glucoseChange;
	                    }
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
	                    if (neighborB instanceof cell_1.Cell && cur instanceof cell_1.Cell) {
	                        var glucoseDiff = cur.fluids.vector[fluids_1.Fluids.GLUCOSE] - neighborB.fluids.vector[fluids_1.Fluids.GLUCOSE];
	                        var glucoseChange = Math.max(Math.min(flowRatio * glucoseDiff, cur.fluids.vector[fluids_1.Fluids.GLUCOSE] +
	                            dFluids[i][j].vector[fluids_1.Fluids.GLUCOSE]), -(neighborB.fluids.vector[fluids_1.Fluids.GLUCOSE] + dFluids[i][j + 1].vector[fluids_1.Fluids.GLUCOSE]));
	                        if (glucoseChange > 10) {
	                            glucoseChange = 10;
	                        }
	                        else if (glucoseChange < -10) {
	                            glucoseChange = -10;
	                        }
	                        dFluids[i][j].vector[fluids_1.Fluids.GLUCOSE] -= glucoseChange;
	                        dFluids[i][j + 1].vector[fluids_1.Fluids.GLUCOSE] += glucoseChange;
	                    }
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
	    Automata.prototype.calculateDiffusion = function (i, j, dFluids, flowRatioFluid, flowDirectionPref, diffuseToDirt) {
	        obj = this.grid[i][j];
	        middle = obj.fluids;
	        left = new fluids_1.Fluids(fluids.vector[0], fluids.vector[1]);
	        right = new fluids_1.Fluids(fluids.vector[0], fluids.vector[1]);
	        up = new fluids_1.Fluids(fluids.vector[0], fluids.vector[1]);
	        down = new fluids_1.Fluids(fluids.vector[0], fluids.vector[1]);
	        if (i > 0) {
	            up = this.grid[i - 1][j].fluids;
	            if (!dFluids[i - 1][j]) {
	                dFluids[i - 1][j] = new fluids_1.Fluids;
	            }
	        }
	        if (i < Automata.GRID_DIMENSION_Y - 1) {
	            down = this.grid[i + 1][j].fluids;
	            if (!dFluids[i + 1][j]) {
	                dFluids[i + 1][j] = new fluids_1.Fluids;
	            }
	        }
	        if (j > 0) {
	            left = this.grid[i][j - 1].fluids;
	            if (!dFluids[i][j - 1]) {
	                dFluids[i][j - 1] = new fluids_1.Fluids;
	            }
	        }
	        if (j < Automata.GRID_DIMENSION_X - 1) {
	            right = this.grid[i][j + 1].fluids;
	            if (!dFluids[i][j + 1]) {
	                dFluids[i][j + 1] = new fluids_1.Fluids;
	            }
	        }
	        for (var f = 0; f < obj.fluids.vector.length; f++) {
	            var min = 999;
	            var dUp = Math.max(0, up.vector[f] - middle.vector[f]);
	            if (this.grid[i - 1][j] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dUp = 0;
	            }
	            var dDown = Math.max(0, down.vector[f] - middle.vector[f]);
	            if (this.grid[i + 1][j] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dDown = 0;
	            }
	            var dLeft = Math.max(0, left.vector[f] - middle.vector[f]);
	            if (this.grid[i][j - 1] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dLeft = 0;
	            }
	            var dRight = Math.max(0, right.vector[f] - middle.vector[f]);
	            if (this.grid[i - 1][j] instanceof dirt_1.Dirt && !diffuseToDirt[f]) {
	                dUp = 0;
	            }
	            var total = dUp + dDown + dLeft + dRight;
	            var giveAway = Math.min(flowRatioFluid[f] * obj.fluids[f], 0.5 * min);
	            if (i > 0) {
	                dFluids[i - 1][j].vector[f] += (dUp / total) * giveAway;
	            }
	            if (i < Automata.GRID_DIMENSION_Y - 1) {
	                dFluids[i + 1][j].vector[f] += (dDown / total) * giveAway;
	            }
	            if (j > 0) {
	                dFluids[i][j - 1].vector[f] += (dLeft / total) * giveAway;
	            }
	            if (j < Automata.GRID_DIMENSION_X - 1) {
	                dFluids[i][j + 1].vector[f] += (dRight / total) * giveAway;
	            }
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
	                            var colorString = "#" + "0000" + this.getColorHex(Math.min(255, Math.ceil(255 * cell.signals.vector[0])));
	                            this.canvasCtx.fillStyle = colorString;
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
	    DNA.prototype.getSeed = function () {
	        var seed = [];
	        seed.push(new cell_1.Cell(50, 50, new fluids_1.Fluids(100, 1000), 'a1', this));
	        seed.push(new cell_1.Cell(50, 51, new fluids_1.Fluids(100, 1000), 'b1', this));
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
	var N_FLUIDS = 2;
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