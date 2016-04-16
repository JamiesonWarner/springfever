
var N_FLUIDS = 4;

export class Fluids {
    vector;
    constructor(water = 100) {
        this.vector = new Array(N_FLUIDS);
        this.vector[0] = water;
        //this.vector[1] = 100;
    }
}
