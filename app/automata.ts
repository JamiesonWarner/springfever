import {DNA} from "./dna";
import {Cell} from "./cell"
import {Dirt} from "./dirt";
import {Fluids} from "./fluids";
import {ISystem} from "./system";

/*
TODO turn Automata into systems model.
Automata just stores stuff like the fluidsArray, and its state is transformed by Systems.
*/
export class Automata {
    static GRID_N_COLUMNS = 120;
    static GRID_N_ROWS = 100;
    static CELL_SCALE_PIXELS = 8;

    canvas;
    canvasCtx: CanvasRenderingContext2D;
    fluidsArray: Array<Array<Fluids>>;
    cellArray: Array<Array<Cell>>; // undefined if there is no cell
    plant: Array<Cell>;
    dna;
    drawWater = false;

    viewStyle: string;

    systems: Array<ISystem>;

    constructor(runString: String, drawCanvas: Element) {
        var dna = new DNA();
        this.dna = dna;

        this.canvas = drawCanvas;
        this.canvas.setAttribute('width', Automata.GRID_N_COLUMNS * Automata.CELL_SCALE_PIXELS);
        this.canvas.setAttribute('height', Automata.GRID_N_ROWS * Automata.CELL_SCALE_PIXELS);
        this.canvasCtx = this.canvas.getContext("2d");

        this.fluidsArray = new Array(Automata.GRID_N_ROWS);
        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
            this.fluidsArray[row] = new Array(Automata.GRID_N_COLUMNS);
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                var water = this.isAirCell(row, col) ? 100 * Math.random() : 500 * Math.random();
                this.fluidsArray[row][col] = new Fluids(water, 0);
            }
        }

        this.cellArray = new Array(Automata.GRID_N_ROWS);
        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
            this.cellArray[row] = new Array(Automata.GRID_N_COLUMNS);
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                var water = this.isAirCell(row, col) ? 100 * Math.random() : 500 * Math.random();
                this.cellArray[row][col] = undefined;
            }
        }


        this.plant = dna.plantSeed(this.cellArray);

        var self = this;
        drawCanvas.addEventListener("mousemove", function(event: MouseEvent) {
            self.showInfo(event.offsetX, event.offsetY);
        })

    }

    printGridFluids() {
        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                console.log(this.fluidsArray[row][col].vector);
            }
        }
    }

    validateFluidsArray() {
        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                var f = this.fluidsArray[row][col].vector;
                if (typeof f === 'undefined') console.log('row,col are: ', row, col);
                for (var k = 0; k < f.length; ++k) {
                    if (typeof f[k] !== 'number' || isNaN(f[k])) {
                        throw new Error('Error: Invalid fluid vector at: ' + row+', '+col);
                    }
                    if (f[k] < 0) {
                        console.log('Warning: Negative fluids at: ', row, col);
                        return;
                    }
                }
            }
        }
    }

    showInfo(x,y) {
        var tx = x / 10;
        var ty = y / 10;
        var row = Math.floor(ty);
        var col = Math.floor(tx)
        var fluids = this.fluidsArray[row][col];
        document.getElementById('bar-water').style.width = fluids.vector[Fluids.WATER] + 'px';
        document.getElementById('bar-glucose').style.width = fluids.vector[Fluids.GLUCOSE] + 'px';
        document.getElementById('bar-auxin').style.width = (40*fluids.vector[Fluids.AUXIN]) + 'px';
    }

    update() {
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
            if (!actions[i]) continue;
            let action = actions[i];
            if(action.name === "grow"){
                // console.log("cell wants to grow...")
                var drow = 0;
                var dcol = 0;
                if(action.parameters.direction === "up"){
                    drow = -1;
                }
                else if(action.parameters.direction === "down"){
                    drow = 1;
                }
                else if(action.parameters.direction === "right"){
                    dcol = 1;
                }
                else if(action.parameters.direction === "left"){
                    dcol = -1;
                }
                var gI = this.plant[i].row + drow;
                var gJ = this.plant[i].col + dcol;

                let cost = this.dna.cellTypes[action.parameters.type].cost;

                let canAfford = true;

                for (var j = 0; j < cost.vector.length; j++){
                    if(!(this.plant[i].fluids.vector[j] >= cost.vector[j])){
                        canAfford = false;
                        break;
                    }
                }

                if (!canAfford) {
                    // console.log("cell can't afford...")
                    continue;
                }

                if(gI < 0 || gI >= Automata.GRID_N_ROWS || gJ < 0 || gJ >= Automata.GRID_N_COLUMNS ){
                    // console.log("cannot make cell at " + gJ + ", " + gI);
                    continue;
                }

                if(! (this.cellArray[gI][gJ])){
                    // console.log("growing new cell...")
                    this.subtractFluids(this.plant[i].fluids, cost);
                    let newFluids = this.splitFluids(this.plant[i]);
                    var nCell = new Cell(this.dna, action.parameters.type, newFluids, gI, gJ);
                    this.plant.push(nCell);
                    this.cellArray[gI][gJ] = nCell;
                }

            }

        }

        this.fluidUpdate();
        this.signalsUpdate();
        this.cellDeath();
    }

    /*
    Kill all cells who don't have enough resources to live
    */
    cellDeath() {
        let MIN_WATER = 10;
        let MIN_GLUCOSE = 10;
        let toKill = [];
        for (var i = 0; i < this.plant.length; ++i) {
            var cell = this.plant[i];
            if (!cell.fluids) continue;
            if (cell.fluids.vector[Fluids.GLUCOSE] < MIN_GLUCOSE ||
                cell.fluids.vector[Fluids.WATER] < MIN_WATER) {
                // kill cell
                toKill.push(cell);
            }
        }

        for (var i = 0; i < toKill.length; ++i) {
            var cell: Cell = toKill[i];
            // console.log('Killing cell at: ', cell.row, cell.col);
            var index = this.plant.indexOf(cell);
            this.plant.splice(index, 1);
            // this.fluidsArray[cell.row][cell.col] = cell.fluids;
            this.cellArray[cell.row][cell.col] = undefined;
        }
    }

    subtractFluids(a, b){
        for (var i = 0; i < a.vector.length; i ++){
            a.vector[i] -= b.vector[i];
        }
    }

    splitFluids(cell){
        let newFluids = new Fluids(0);
        for (var i = 0; i < cell.fluids.vector.length; i ++){
            cell.fluids.vector[i] /= 2;
            newFluids.vector[i] = cell.fluids.vector[i];
        }
        return newFluids;
    }

    signalsUpdate() {
        // Update each cell's individual signal levels

        for (var i = 0; i < this.plant.length; ++i) {
            var cell = this.plant[i];
            cell.updateSignals();
        }

        // Send signals to neighbors
        let SPREAD_COEFF = 0.1;
        for (var i = 0; i < this.plant.length; i++) {
            var cell = this.plant[i];
            var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
            for (var j = 0; j < neighbs.length; j++) {
                var nrow = cell.col + neighbs[j][0];
                var ncol = cell.row + neighbs[j][1];
                if (ncol < 0 || nrow < 0 || ncol >= Automata.GRID_N_COLUMNS || nrow >= Automata.GRID_N_ROWS)
                    continue;
                var neighbFluids = this.fluidsArray[nrow][ncol];
                if (neighbFluids instanceof Cell) {
                    var nsignals = neighbFluids.vector;
                    for (var k = Fluids.SIGNALS_START; k < Fluids.N_FLUIDS; k++) {
                        if (cell.fluids[k] < nsignals[k])
                            continue;
                        let amount = SPREAD_COEFF * cell.fluids.vector[k];
                        nsignals[k] += amount;
                        cell.fluids.vector[k] -= amount;
                    }
                }
            }
        }
    }

    fluidUpdate() {
        // Initialize fluidsDiff to 0's
        var fluidsDiff = new Array(Automata.GRID_N_ROWS);
        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
            fluidsDiff[row] = new Array(Automata.GRID_N_COLUMNS);
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                fluidsDiff[row][col] = new Array(Fluids.N_FLUIDS);
                for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
                    fluidsDiff[row][col][i] = 0;
                }
            }
        }

        // photosynthesis. TODO this will be an action
        var REACTION_FACTOR = 10; // expend 1 water to get 4 glucose
        for (var i = 0; i < this.plant.length; i++) {
            let cell = this.plant[i];
            if (cell.type.isLeaf) {
                let numAir = this.countAirNeighbors(cell.row, cell.col);
                let dGlucose = Math.min(cell.fluids.vector[Fluids.WATER]/4, 100 * numAir);
                // convert water to glucose
                fluidsDiff[cell.row][cell.col][Fluids.WATER] -= dGlucose;
                fluidsDiff[cell.row][cell.col][Fluids.GLUCOSE] += REACTION_FACTOR*dGlucose;
            }
        }

        // respiration. this is needed for stuff
        var RESPIRATION_AMOUNT = 0.1;
        for (var i = 0; i < this.plant.length; ++i) {
            let cell = this.plant[i];
            cell.fluids.vector[Fluids.WATER] -= RESPIRATION_AMOUNT;
            cell.fluids.vector[Fluids.GLUCOSE] -= RESPIRATION_AMOUNT;
        }


        // Passive transport / diffusion. Give nutrients to neighbors.
        var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                for (var i = 0; i < neighbs.length; ++i) {
                    let neighbRow = row + neighbs[i][0];
                    let neighbCol = col + neighbs[i][1];
                    if (neighbRow < 0
                        || neighbCol < 0
                        || neighbRow >= Automata.GRID_N_ROWS
                        || neighbCol >= Automata.GRID_N_COLUMNS) {
                        continue;
                    }

                    let flowRate = 0.02;
                    // air to air is very fast
                    if (this.isAirCell(row,col) && this.isAirCell(neighbRow,neighbCol)) {
                        flowRate = 0.2;
                    }

                    let neighbFluids = this.fluidsArray[neighbRow][neighbCol];
                    let fluids = this.fluidsArray[row][col];
                    for (var j = 0; j < Fluids.N_FLUIDS; ++j) {
                        if (fluids[j] > neighbFluids[j]) {
                            let diff = flowRate * (fluids[j] - neighbFluids[j]);
                            fluidsDiff[row][col][j] -= diff;
                            fluidsDiff[neighbRow][neighbCol][j] += diff;
                        }
                    }
                }
            }
        }

        this.validateFluidsArray();

        // Apply fluidsDiff to fluids
        for (var row = 0; row < Automata.GRID_N_ROWS; row ++){
            for (var col = 0; col < Automata.GRID_N_COLUMNS; col ++ ){
                let fluids = this.fluidsArray[row][col];
                let fluidDiff = fluidsDiff[row][col];
                for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
                    fluids[i] += fluidDiff[i];
                }
            }
        }
    }

    isPositionOnGrid(row, col) {
        return row >= 0 && col >= 0 &&
            row < Automata.GRID_N_ROWS && col < Automata.GRID_N_COLUMNS;
    }

    isAirCell(row, col) {
        if (!this.isPositionOnGrid(row, col)) return false;
        return row < 50 && !(this.fluidsArray[row][col] instanceof Cell);
    }

    countAirNeighbors(row, col){
        var n = (this.isAirCell(row - 1, col)?1:0) +
                (this.isAirCell(row + 1, col)?1:0) +
                (this.isAirCell(row, col - 1)?1:0) +
                (this.isAirCell(row, col + 1)?1:0);
        return n;
    }

    draw() {
        if (this.validateFluidsArray()) {
            console.log('error in fluids, skipping draw');
            return;
        }

        let scale = Automata.CELL_SCALE_PIXELS;
        this.canvasCtx.lineWidth = 3;
        this.canvasCtx.fillStyle = "#7EC0DD";
        this.canvasCtx.fillRect(0,0, Automata.GRID_N_COLUMNS* scale, scale* Automata.GRID_N_ROWS)
        this.canvasCtx.fillRect(0, 0, 100, 100);


        for (var row = 0; row < Automata.GRID_N_ROWS; row ++){
            for (var col = 0; col < Automata.GRID_N_COLUMNS; col ++){
                var fluids = this.fluidsArray[row][col].vector;
                let waterContent = Math.max(Math.min(Math.round(fluids[Fluids.WATER]),255),0);

                if (this.viewStyle === 'water') {
                    let colorString = "#" + "0064" + this.getColorHex(waterContent);
                    this.canvasCtx.fillStyle = colorString;
                }
                else if(this.viewStyle === 'glucose'){
                    if (this.cellArray[row][col]) {
                        this.canvasCtx.fillStyle = "#" + this.getColorHex(Math.min(255,Math.ceil(fluids[Fluids.GLUCOSE]))) + "0000";
                    }
                    else {
                        this.canvasCtx.fillStyle = "#000000";
                    }
                }
                else if (this.viewStyle === 'auxin') {
                    let cell = this.cellArray[row][col];
                    if (cell) {
                        this.canvasCtx.fillStyle = "#" + "0000" + this.getColorHex(Math.min(255,Math.ceil(255*fluids[Fluids.SIGNALS_START].vector[0])));
                    }
                    else {
                        this.canvasCtx.fillStyle = "#000000";
                    }
                }
                else {
                    let cell = this.cellArray[row][col];
                    if (cell) {
                        this.canvasCtx.fillStyle = this.cellArray[row][col].type.color;
                    }
                    else if(row >= 50){
                        var cval = Math.ceil(waterContent/4);
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
                            if (this.isPositionOnGrid(nrow,ncol) && !this.cellArray[nrow][ncol] ) {
                                this.canvasCtx.beginPath();
                                if (neighbs[i][0] == -1) {
                                    this.canvasCtx.moveTo(scale*col + 0.5, scale*row + 0.5);
                                    this.canvasCtx.lineTo(scale*(col+1) + 0.5, scale*row + 0.5);
                                } else if (neighbs[i][0] == 1) {
                                    this.canvasCtx.moveTo(scale*(col+1) + 0.5, scale*(row+1) + 0.5);
                                    this.canvasCtx.lineTo(scale*col + 0.5, scale*(row+1) + 0.5);
                                } else if (neighbs[i][1] == -1) {
                                    this.canvasCtx.moveTo(scale*col + 0.5, scale*(row+1) + 0.5);
                                    this.canvasCtx.lineTo(scale*col + 0.5, scale*row + 0.5);
                                } else if (neighbs[i][1] == 1) {
                                    this.canvasCtx.moveTo(scale*(col+1) + 0.5, scale*row + 0.5);
                                    this.canvasCtx.lineTo(scale*(col+1) + 0.5, scale*(row+1) + 0.5);
                                }
                                this.canvasCtx.stroke();
                            }
                        }
                    }
                }
            }
        }
    }

    getColorHex(byte){
        let colorString = "";
        if (byte < 16) {
            colorString += "0" + byte.toString(16);
        }
        else {
            colorString += byte.toString(16);
        }
        return colorString;
    }
}