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

        let waterCount = 0;

        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            for (var j = 0; j < Automata.GRID_DIMENSION_X; j ++){
                if(this.grid[i][j]){
                    waterCount += this.grid[i][j].fluids.vector[0];
                }
            }
        }
        //console.log("Total Water count " + waterCount);

    }

    splitFluids(cell){
        let newFluids = new Fluids(0);
        for (var i = 0; i < cell.fluids.vector.length; i ++){
            cell.fluids.vector[i] /= 2;
            newFluids.vector[i] = cell.fluids.vector[i];
        }
        return newFluids;
    }

    fluidUpdate(){
        var dFluids = new Array(Automata.GRID_DIMENSION_Y);
        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            dFluids[i] = new Array(Automata.GRID_DIMENSION_X);
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
                        flowRatio = 0.25
                    }
                    if(!dFluids[i][j]){
                        dFluids[i][j] = new Fluids(0);
                    }
                    if(!dFluids[i+1][j]){
                        dFluids[i + 1][j] = new Fluids(0);
                    }
                    let waterDiff = cur.fluids.vector[0] - neighborA.fluids.vector[0];
                    let waterChange = flowRatio * waterDiff;

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
                    let waterChange = flowRatio * waterDiff;

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
                            let colorString = "#" + "0064";
                            if(waterContent < 16){
                                colorString += "0" + waterContent.toString(16);
                            }
                            else{
                                colorString += waterContent.toString(16);
                            }

                            this.canvasCtx.fillStyle = colorString;
                        }
                        else{
                            this.canvasCtx.fillStyle = cell.dna.cellTypes[cell.type].color;

                        }
                        this.canvasCtx.fillRect(Math.floor(scale * j), Math.floor(scale * i), scale, scale);

                        //console.log("Drawing plant cell");
                        // this.canvasCtx.putImageData(this.cellRectangles[cell.type], scale * j, scale * i);
                    }
                    else if(cell instanceof Dirt){
                        let colorString = "#" + "6400";
                        if (waterContent < 16) {
                            colorString += "0" + waterContent.toString(16);
                        }
                        else {
                            colorString += waterContent.toString(16);
                        }
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
}