export class Automata {
    canvas;
    grid;

    constructor() {
        console.log('foo');
        let GRID_DIMENSION = 100;
        this.canvas = document.getElementById("draw");
        this.grid = new Array(GRID_DIMENSION);
        for (var i = 0; i < GRID_DIMENSION; i++) {
            this.grid[i] = new Array(GRID_DIMENSION);
        }

        //var plant = new
    }

    update() {

    }

    draw() {

    }
}