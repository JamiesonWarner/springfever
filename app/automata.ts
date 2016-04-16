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
    cellRectangles;

    constructor(runString: String) {
        var dna = new DNA();
        this.dna = dna;
        this.plant = dna.getSeed();


        console.log('foo');
        this.canvas = document.getElementById("draw");
        this.canvasCtx = this.canvas.getContext("2d");
        // this.canvasCtx.

        // Make rectangles for every cell type in dna to make drawing fast
        var cellTypes = Object.keys(dna.cellTypes);
        this.cellRectangles = {};
        for (var i = 0; i < cellTypes.length; ++i) {
            let ct = cellTypes[i];
            let color = dna.cellTypes[ct].color;
            let ctx = this.canvasCtx;
            if (!color)
                console.error('Color is not defined for cell type ' + ct);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 10, 10);
            this.cellRectangles[ct] = ctx.getImageData(4, 4, Automata.CELL_SCALE, Automata.CELL_SCALE);
            ctx.clearRect(0, 0, 10, 10);
        }


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
                    fluids.vector[0] = 200;
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


                if(typeof this.grid[gI][gJ] === "undefined" || this.grid[gI][gJ] instanceof Dirt){
                    // console.log("cell is not taken")
                    var nCell = new Cell(gJ, gI, null, action.parameters.type, this.dna);
                    this.plant.push(nCell);
                    this.grid[gI][gJ] = nCell;
                }
                else{
                    // console.log("cell is already taken at " + gJ + ", " + gI)
                }

            }

        }

        //this.updatePlan();
    }

    fluidUpdate(){
        var dFluids = new Array(Automata.GRID_DIMENSION_Y);
        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            dFluids[i] = new Array(Automata.GRID_DIMENSION_X);
        }


    }



    draw() {

        let scale = 1;
        //console.log("draw");
        this.canvasCtx.fillStyle = "#715DF9";
        this.canvasCtx.fillRect(0,0, Automata.GRID_DIMENSION_X* scale, scale* Automata.GRID_DIMENSION_Y)
        this.canvasCtx.fillRect(0, 0, 100, 100);

        // this.canvasCtx.fillStyle = "#FFF000";
        // this.canvasCtx.fillRect(70, 70, 10, 10);

        for (var i = 0; i < Automata.GRID_DIMENSION_Y; i ++){
            for (var j = 0; j < Automata.GRID_DIMENSION_X; j ++){
                var cell = this.grid[i][j];
                if(typeof cell != "undefined"){
                    if (cell instanceof Cell) {
                        //console.log("Drawing plant cell");
                        this.canvasCtx.fillStyle = cell.dna.cellTypes[cell.type].color;
                        // this.canvasCtx.fillRect(scale * (j), scale * (i), scale, scale);
                        this.canvasCtx.putImageData(this.cellRectangles[cell.type], scale * j, scale * i);
                    }
                    else if(cell instanceof Dirt){
                        this.canvasCtx.fillStyle = "#A87F0F";
                        this.canvasCtx.fillRect(scale * (j), scale * (i), scale, scale);
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