import {DNA} from "./dna";
import {Cell} from "./cell"
// import {CellType} from "./celltypes"
import {Dirt} from "./dirt";
import {Fluids} from "./fluids";

export class Automata {
    static GRID_N_COLUMNS = 100;
    static GRID_N_ROWS = 100;
    static CELL_SCALE_PIXELS = 10;

    canvas;
    canvasCtx: CanvasRenderingContext2D;
    grid;
    plant;
    updatePlan;
    dna;
    drawWater = false;

    viewStyle: string;

    constructor(runString: String) {
        var dna = new DNA();
        this.dna = dna;

        this.canvas = document.getElementById("draw");
        this.canvasCtx = this.canvas.getContext("2d");

        this.grid = new Array(Automata.GRID_N_ROWS);
        for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
            this.grid[row] = new Array(Automata.GRID_N_COLUMNS);
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                this.grid[row][col] = new Fluids(500*Math.random(), 0);
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

    printGridFluids() {
        for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
            for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
                console.log(this.grid[row][col].vector || this.grid[row][col].fluids.vector);
            }
        }
    }

    validateGridFluids() {
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
    }

    showInfo(x,y) {
        var tx = x / 10;
        var ty = y / 10;
        var obj = this.grid[Math.floor(ty)][Math.floor(tx)];
        if (obj instanceof Cell) {
            document.getElementById('bar-water').style.width = obj.fluids.vector[0] + 'px';
            document.getElementById('bar-glucose').style.width = obj.fluids.vector[1] + 'px';
            document.getElementById('bar-auxin').style.width = (40*obj.signals.vector[0]) + 'px';
        }
        else {
            document.getElementById('bar-water').style.width = obj.vector[0] + 'px';
            document.getElementById('bar-glucose').style.width = obj.vector[1] + 'px';
            document.getElementById('bar-auxin').style.width = 0 + 'px';
        }
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
                var dx = 0;
                var dy = 0;
                if(action.parameters.direction === "up"){
                    dy = -1;
                }
                else if(action.parameters.direction === "down"){
                    dy = 1;
                }
                else if(action.parameters.direction === "right"){
                    dx = 1;
                }
                else if(action.parameters.direction === "left"){
                    dx = -1;
                }
                var gI = this.plant[i].y + dy;
                var gJ = this.plant[i].x + dx;


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

                if(! (this.grid[gI][gJ] instanceof Cell)){
                    // console.log("growing new cell...")
                    let newFluids = this.splitFluids(this.plant[i]);
                    var nCell = new Cell(this.dna, action.parameters.type, newFluids, this.grid, gJ, gI);
                    this.plant.push(nCell);
                    this.grid[gI][gJ] = nCell;
                    this.subtractFluids(this.plant[i].fluids, cost);
                }

            }

        }

        this.fluidUpdate();
        this.signalsUpdate();
        // this.cellDeath();
    }

    /*
    Kill all cells who don't have enough resources to live
    */
    cellDeath() {
        let MIN_WATER = 1;
        let MIN_GLUCOSE = 1;
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
            var cell = toKill[i];
            console.log('killing cell, ', cell);
            var index = this.plant.indexOf(cell);
            // this.plant.splice(index, 1);
            this.grid[cell.y][cell.x] = cell.fluids;
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
                var dx = cell.x + neighbs[j][0];
                var dy = cell.y + neighbs[j][1];
                if (dx < 0 || dy < 0 || dx >= Automata.GRID_N_COLUMNS || dy >= Automata.GRID_N_ROWS)
                    continue;
                var neighb = this.grid[dy][dx];
                if (neighb instanceof Cell) {
                    var nsignals = neighb.signals.vector;
                    for (var k = 0; k < nsignals.length; k++) {
                        if (cell.signals[k] < nsignals[k])
                            continue;
                        let amount = SPREAD_COEFF * cell.signals.vector[k];
                        nsignals[k] += amount;
                        cell.signals.vector[k] -= amount;
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

        if (typeof this['foo'] === 'undefined')
            this['foo'] = 0;
        console.log(this['foo']);
        this['foo']++;


        // photosynthesis. TODO this will be an action
        for (var i = 0; i < this.plant.length; i++) {
            let cell = this.plant[i];
            if (cell.type === "l") {
                let numAir = this.countAirNeighbors(cell.y, cell.x);
                console.log(typeof numAir);
                let dGlucose = Math.min(cell.fluids.vector[Fluids.WATER] / 4, 20 * numAir);
                // convert water to glucose
                fluidsDiff[cell.y][cell.x][Fluids.WATER] = -dGlucose;
                fluidsDiff[cell.y][cell.x][Fluids.GLUCOSE] = dGlucose;
            }
        }



        // Passive transport. Give nutrients to neighbors.
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

                    let obj = this.grid[row][col];
                    let neighbFluids = this.grid[neighbRow][neighbCol];
                    if (typeof neighbFluids === 'undefined') {
                        console.log('neighbFluids is undefined at ', neighbRow, neighbCol);
                    }
                    let fluids = obj instanceof Cell ? obj.fluids.vector : obj.vector;
                    neighbFluids = neighbFluids instanceof Cell ? neighbFluids.fluids.vector : neighbFluids.vector;
                    for (var j = 0; j < Fluids.N_FLUIDS; ++j) {
                        if (fluids[j] > neighbFluids[j]) {
                            let diff = 0.2 * (fluids[j] - neighbFluids[j]);
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
        for (var row = 0; row < Automata.GRID_N_ROWS; row ++){
            for (var col = 0; col < Automata.GRID_N_COLUMNS; col ++ ){
                let obj = this.grid[row][col];
                let fluids = obj instanceof Cell ? obj.fluids.vector : obj.vector;
                let fluidDiff = fluidsDiff[row][col];
                for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
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



    }



    calculateDiffusion(i,j, dFluids, flowRatioFluid, flowDirectionPref, diffuseToDirt){
        let obj = this.grid[i][j];

        let middle = obj.fluids;

        let left = new Fluids(middle.vector[0],middle.vector[1]);
        let right = new Fluids(middle.vector[0], middle.vector[1]);
        let up = new Fluids(middle.vector[0], middle.vector[1]);
        let down = new Fluids(middle.vector[0], middle.vector[1]);

        if(!dFluids[i][j]){
            dFluids[i][j] = new Fluids(0,0);
        }

        if(i > 0 && this.grid[i-1][j]){
            up = this.grid[i - 1][j].fluids;
            if (!dFluids[i - 1][j]) {
                dFluids[i - 1][j] = new Fluids
            }
        }
        if (i < Automata.GRID_N_ROWS - 1 && this.grid[i + 1][j]) {
            down = this.grid[i + 1][j].fluids;
            if (!dFluids[i +1][j]) {
                dFluids[i +1][j] = new Fluids
            }
        }
        if (j > 0 && this.grid[i][j -1]) {
            left = this.grid[i][j - 1].fluids;
            if (!dFluids[i][j-1]) {
                dFluids[i][j-1] = new Fluids
            }
        }
        if (j < Automata.GRID_N_COLUMNS - 1 && this.grid[i][j+1]) {
            right = this.grid[i][j + 1].fluids;
            if (!dFluids[i][j + 1]) {
                dFluids[i][j + 1] = new Fluids
            }
        }

        for (var f = 0; f < obj.fluids.vector.length; f ++){
            let min = 999;

            let dUp = Math.max(0,up.vector[f] - middle.vector[f]);
            if (this.grid[i - 1] && this.grid[i - 1][j] && this.grid[i - 1][j] instanceof Dirt && !diffuseToDirt[f]) {
                dUp = 0;
            }
            else{
                min = Math.min(dUp, min);
            }

            let dDown = Math.max(0, down.vector[f] - middle.vector[f]);
            if (this.grid[i + 1] && this.grid[i + 1][j] && this.grid[i + 1][j] instanceof Dirt && !diffuseToDirt[f]) {
                dDown = 0;
            }
            else{
                min = Math.min(dDown, min);
            }
            let dLeft = Math.max(0, left.vector[f] - middle.vector[f]);
            if (this.grid[i][j - 1] instanceof Dirt && !diffuseToDirt[f]) {
                dLeft = 0;
            }
            else{
                min = Math.min(dLeft, min);
            }
            let dRight = Math.max(0, right.vector[f] - middle.vector[f]);
            if (this.grid[i][j+1] && this.grid[i - 1][j]  instanceof Dirt && !diffuseToDirt[f]) {
                dRight = 0;
            }
            else{
                min = Math.min(dUp, min);
            }




            let total = dUp + dDown + dLeft + dRight;
            if(total <= 0){
                return;
            }

            let giveAway = Math.min(flowRatioFluid[f] * obj.fluids[f], 0.5 * min);

            if (i > 0 && this.grid[i - 1][j]) {
                dFluids[i - 1][j].vector[f] += (dUp / total) * giveAway;
            }
            if (i < Automata.GRID_N_ROWS - 1 && this.grid[i + 1][j]) {
                dFluids[i + 1][j].vector[f] += (dDown / total) * giveAway;
            }
            if (j > 0 && this.grid[i][j-1]) {
                dFluids[i][j-1].vector[f] += (dLeft / total) * giveAway;
            }
            if (j < Automata.GRID_N_COLUMNS - 1 && this.grid[i][j+1]) {
                dFluids[i][j + 1].vector[f] += (dRight / total) * giveAway;
            }

            dFluids[i][j].vector[f] -= giveAway

        }

    }

    shuffle(array) {
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
    }

    applyFluidChange(fluid, dFluid){
        for (var i = 0; i < dFluid.length;  i ++ ){
            fluid[i] += dFluid[i];
        }
    }

    countAirNeighbors(i , j){
        let count = 0;
        if(i < Automata.GRID_N_ROWS - 1 && ! this.grid[i+1][j]){
            count++;
        }
        if (i > 0 && !this.grid[i - 1][j]) {
            count++;
        }
        if (j < Automata.GRID_N_COLUMNS -1 && !this.grid[i][j+1]) {
            count++;
        }
        if (j > 0 && !this.grid[i + 1][j-1]) {
            count++;
        }
        return count;
    }





    draw() {

        let scale = Automata.CELL_SCALE_PIXELS;
        this.canvasCtx.fillStyle = "#7EC0DD";
        this.canvasCtx.fillRect(0,0, Automata.GRID_N_COLUMNS* scale, scale* Automata.GRID_N_ROWS)
        this.canvasCtx.fillRect(0, 0, 100, 100);

        // this.canvasCtx.fillStyle = "#FFF000";
        // this.canvasCtx.fillRect(70, 70, 10, 10);

        for (var row = 0; row < Automata.GRID_N_ROWS; row ++){
            for (var col = 0; col < Automata.GRID_N_COLUMNS; col ++){
                let obj = this.grid[row][col];
                let fluids = obj instanceof Cell ? obj.fluids.vector : obj.vector;
                let waterContent = Math.max(Math.min(Math.round(fluids[Fluids.WATER]),255),0);
                if (obj instanceof Cell) {
                    if (this.viewStyle === 'water') {
                        let colorString = "#" + "0064" + this.getColorHex(waterContent);
                        this.canvasCtx.fillStyle = colorString;
                    }
                    else if(this.viewStyle === 'glucose'){
                        let colorString = "#" + this.getColorHex(Math.min(255,Math.ceil(fluids[Fluids.GLUCOSE]))) + "0000";
                        this.canvasCtx.fillStyle = colorString;
                    }
                    else if (this.viewStyle === 'auxin') {
                        let colorString = "#" + "0000" + this.getColorHex(Math.min(255,Math.ceil(255*obj.signals.vector[0])));
                        this.canvasCtx.fillStyle = colorString;
                    }
                    else{
                        this.canvasCtx.fillStyle = obj.dna.cellTypes[obj.type].color;

                    }
                    this.canvasCtx.fillRect(Math.floor(scale * col), Math.floor(scale * row), scale, scale);

                }
                else if(row >= 50){
                    let colorString = "#" + "6400" +this.getColorHex(waterContent);
                    this.canvasCtx.fillStyle = colorString;
                    this.canvasCtx.fillRect(scale*col, scale*row, scale, scale);
                }

            }
        }

        /*
        this.canvasCtx.fillStyle = "#00FF00";
        for (var i = 0; i < Automata.GRID_N_COLUMNS; i ++){
            this.canvasCtx.fillRect(scale * i, scale * (Automata.GRID_N_ROWS-1), scale, scale);
        }*/

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