import {DNA} from "./dna";
import {Cell} from "./cell"
// import {CellType} from "./celltypes"
import {Dirt} from "./dirt";
import {Fluids} from "./fluids";

export class Automata {
    static GRID_DIMENSION_X = 100;
    static GRID_DIMENSION_Y = 100;
    static CELL_SCALE = 2;

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

        for (var i = 50; i < Automata.GRID_DIMENSION_Y; i ++){
            for (var j = 0; j < Automata.GRID_DIMENSION_X; j ++){
                if(typeof this.grid[i][j] === "undefined"){
                    var fluids = new Fluids();
                    fluids.vector[0] = 200 * Math.random();
                    this.grid[i][j] = new Dirt(fluids);
                }
            }
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

                if (cost.vector.length != 4)
                    console.log("dafuq");


                let canAfford = true;
                for (var i = 0; i < cost.vector.length; i++){
                    if(!this.plant[i].fluids.vector[i] >= cost.vector[i]){
                        canAfford = false;
                        break;
                    }
                }

                /*
                if (!canAfford)
                    continue;

                this.subtractFluids(this.plant[i].fluids, cost);

                */


                if(gI < 0 || gI >= Automata.GRID_DIMENSION_Y || gJ < 0 || gJ >= Automata.GRID_DIMENSION_X ){
                    // console.log("cannot make cell at " + gJ + ", " + gI);
                    continue;
                }



                if(typeof this.grid[gI][gJ] === "undefined"){
                    // console.log("cell is not taken")
                    let newFluids = this.splitFluids(this.plant[i]);
                    var nCell = new Cell(gJ, gI, newFluids, action.parameters.type, this.dna);
                    this.plant.push(nCell);
                    this.grid[gI][gJ] = nCell;
                }
                else if (this.grid[gI][gJ] instanceof Dirt){
                    let newFluids = this.grid[gI][gJ].fluids;
                    var nCell = new Cell(gJ, gI, newFluids, action.parameters.type, this.dna);
                    this.plant.push(nCell);
                    this.grid[gI][gJ] = nCell;
                }
                else{
                    // console.log("cell is already taken at " + gJ + ", " + gI)
                }

            }

        }

        //this.updatePlan();
        this.fluidUpdate();
        this.signalsUpdate();


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
        // let SPREAD_COEFF = 0.1;
        // for (var i = 0; i < this.plant.length; i++) {
        //     var cell = this.plant[i];
        //     var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        //     for (var i = 0; i < neighbs.length; ++i) {
        //         var dx = cell.x + neighbs[i][0];
        //         var dy = cell.x + neighbs[i][1];
        //         if (dx < 0 || dy < 0 || dx >= Automata.GRID_DIMENSION_X || dy >= Automata.GRID_DIMENSION_Y)
        //             continue;
        //         var neighb = this.grid[dy][dx];
        //         if (neighb instanceof Cell) {
        //             var nsignals = neighb.signals.vector;
        //             for (var i = 0; i < nsignals.length; ++i) {
        //                 nsignals += SPREAD_COEFF * cell.signals.vector[i];
        //             }
        //         }
        //     }
        // }
    }

    fluidUpdate(){
        var dFluids = new Array(Automata.GRID_DIMENSION_Y);
        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            dFluids[i] = new Array(Automata.GRID_DIMENSION_X);
        }


        for (var i = 0; i < this.plant.length; i ++){
            let cell = this.plant[i];
            if(cell.type === "l"){
                let numAir = this.countAirNeighbors(cell.y, cell.x);
                dFluids[cell.y][cell.x] = new Fluids(0);
                let dGlucose = Math.min(cell.fluids.vector[Fluids.WATER], 50 * numAir);
                dFluids[cell.y][cell.x].vector[Fluids.WATER] = -dGlucose;
                dFluids[cell.y][cell.x].vector[Fluids.GLUCOSE] = dGlucose;
            }
        }

        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            for (var j = 0; j < Automata.GRID_DIMENSION_X; j ++){
                if (typeof this.grid[i][j] === "undefined")
                    continue;
                let cur = this.grid[i][j];
                let neighborA = null;
                let neighborB = null;
                if(i < Automata.GRID_DIMENSION_Y -1)
                    neighborA = this.grid[i + 1][j];
                if(j < Automata.GRID_DIMENSION_X -1)
                    neighborB = this.grid[i][j+1];

                let flowRatio = 0.1;

                if(neighborA){
                    if(neighborA instanceof Cell && cur instanceof Cell){
                        flowRatio = 1
                    }
                    if(!dFluids[i][j]){
                        dFluids[i][j] = new Fluids(0);
                    }
                    if(!dFluids[i+1][j]){
                        dFluids[i + 1][j] = new Fluids(0);
                    }
                    let waterDiff = cur.fluids.vector[0] - neighborA.fluids.vector[0];
                    let waterChange = Math.max(Math.min(flowRatio * waterDiff, cur.fluids.vector[Fluids.WATER] +
                        dFluids[i][j].vector[Fluids.WATER]),
                        -(neighborA.fluids.vector[Fluids.WATER] + dFluids[i+1][j].vector[Fluids.WATER])
                    );



                    dFluids[i][j].vector[0] -= waterChange;
                    dFluids[i + 1][j].vector[0] += waterChange;

                }
                if (neighborB) {
                    if (neighborB instanceof Cell && cur instanceof Cell) {
                        flowRatio = 0.25
                    }
                    if (!dFluids[i][j]) {
                        dFluids[i][j] = new Fluids(0);
                    }
                    if (!dFluids[i][j+1]) {
                        dFluids[i][j+1] = new Fluids(0);
                    }
                    let waterDiff = cur.fluids.vector[0] - neighborB.fluids.vector[0];
                    let waterChange = Math.max(Math.min(flowRatio * waterDiff, cur.fluids.vector[Fluids.WATER] +
                        dFluids[i][j].vector[Fluids.WATER]),
                        -(neighborB.fluids.vector[Fluids.WATER] + dFluids[i][j+1].vector[Fluids.WATER])
                    );
                    dFluids[i][j].vector[0] -= waterChange;
                    dFluids[i][j+1].vector[0] += waterChange;

                }
            }
        }

        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            for (var j = 0; j < Automata.GRID_DIMENSION_X; j ++ ){
                if(dFluids[i][j]){
                    //console.log("Change fluid by " + dFluids[i][j][0])
                    this.applyFluidChange(this.grid[i][j].fluids, dFluids[i][j]);
                }
            }
        }


    }

    applyFluidChange(fluid, dFluid){
        for (var i = 0; i < dFluid.vector.length;  i ++ ){
            fluid.vector[i] += dFluid.vector[i];
        }
    }

    countAirNeighbors(i , j){
        let count = 0;
        if(i < Automata.GRID_DIMENSION_Y - 1 && ! this.grid[i+1][j]){
            count++;
        }
        if (i > 0 && !this.grid[i - 1][j]) {
            count++;
        }
        if (j < Automata.GRID_DIMENSION_X -1 && !this.grid[i][j+1]) {
            count++;
        }
        if (j > 0 && !this.grid[i + 1][j-1]) {
            count++;
        }
        return count;
    }





    draw() {

        let scale = 10;
        //console.log("draw");
        this.canvasCtx.fillStyle = "#7EC0DD";
        this.canvasCtx.fillRect(0,0, Automata.GRID_DIMENSION_X* scale, scale* Automata.GRID_DIMENSION_Y)
        this.canvasCtx.fillRect(0, 0, 100, 100);

        // this.canvasCtx.fillStyle = "#FFF000";
        // this.canvasCtx.fillRect(70, 70, 10, 10);

        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            for (var j = 0; j < Automata.GRID_DIMENSION_X; j ++){
                var cell = this.grid[i][j];
                if(typeof cell != "undefined"){
                    let waterContent = Math.max(Math.min(Math.round(cell.fluids.vector[0]),255),0);
                    if (cell instanceof Cell) {
                        if (this.viewStyle === 'water') {
                            let colorString = "#" + "0064" + this.getColorHex(waterContent);
                            this.canvasCtx.fillStyle = colorString;
                        }
                        else if(this.viewStyle === 'glucose'){
                            let colorString = "#" + this.getColorHex(Math.min(255,Math.ceil(cell.fluids.vector[Fluids.GLUCOSE]))) + "0000";
                            this.canvasCtx.fillStyle = colorString;
                        }
                        else if (this.viewStyle === 'auxin') {
                            let colorString = "#" + "0000" + this.getColorHex(Math.min(255,Math.ceil(cell.signals.vector[0])));
                        }
                        else{
                            this.canvasCtx.fillStyle = cell.dna.cellTypes[cell.type].color;

                        }
                        this.canvasCtx.fillRect(Math.floor(scale * j), Math.floor(scale * i), scale, scale);

                        //console.log("Drawing plant cell");
                        // this.canvasCtx.putImageData(this.cellRectangles[cell.type], scale * j, scale * i);
                    }
                    else if(cell instanceof Dirt){
                        let colorString = "#" + "6400" +this.getColorHex(waterContent);

                        this.canvasCtx.fillStyle = colorString;
                        this.canvasCtx.fillRect(scale*j, scale*i, scale, scale);
                    }
                }

            }
        }

        /*
        this.canvasCtx.fillStyle = "#00FF00";
        for (var i = 0; i < Automata.GRID_DIMENSION_X; i ++){
            this.canvasCtx.fillRect(scale * i, scale * (Automata.GRID_DIMENSION_Y-1), scale, scale);
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